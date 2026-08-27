import { FormEvent, useEffect, useMemo, useState } from "react";
import { Copy, Edit3, Plus, RefreshCw, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { ImageThumb } from "@/components/ImageThumb";
import { adminApi } from "@/services/api";
import type { FieldDefinition, ResourceDefinition } from "@/utils/resources";
import { compact, formatDate, inr, statusClass } from "@/utils/format";

function getValue(row: any, key: string) {
  return key.split(".").reduce((acc, part) => acc?.[part], row);
}

function displayValue(row: any, column: any) {
  const value = getValue(row, column.key);
  if (column.type === "image") {
    return <ImageThumb src={value} alt={row.name || row.title || ""} />;
  }
  if (column.type === "money") return inr(value);
  if (column.type === "status") return <span className={statusClass(value)}>{compact(value)}</span>;
  if (column.type === "date") return formatDate(value);
  if (column.type === "bool") return value ? "Yes" : "No";
  return compact(value);
}

function initialValue(field: FieldDefinition, record: any) {
  if (!record) return field.type === "checkbox" ? false : field.type === "select" ? field.options?.[0] || "" : "";
  if (field.name === "galleryImages") return (record.images || []).map((image: any) => image.url).join("\n");
  if (field.name === "category") return record.category?.slug || "";
  const value = record[field.name];
  if (Array.isArray(value)) return value.join("\n");
  if (field.type === "date" && value) return String(value).slice(0, 10);
  if (field.type === "checkbox") return Boolean(value);
  return value ?? "";
}

function ResourceForm({
  definition,
  record,
  onClose,
  onSaved,
}: {
  definition: ResourceDefinition;
  record: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const tabs = useMemo<string[]>(() => Array.from(new Set(definition.fields.map((field) => field.tab || "Details"))), [definition.fields]);
  const [activeTab, setActiveTab] = useState(tabs[0] || "Details");
  const [values, setValues] = useState<Record<string, any>>(() =>
    Object.fromEntries(definition.fields.map((field) => [field.name, initialValue(field, record)]))
  );
  const [busy, setBusy] = useState(false);

  const setField = (field: FieldDefinition, value: any) => {
    setValues((current) => ({ ...current, [field.name]: field.type === "checkbox" ? Boolean(value) : value }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      const payload = definition.transform ? definition.transform(values) : values;
      if (record?.id) await adminApi.update(definition.resource, record.id, payload);
      else await adminApi.create(definition.resource, payload);
      toast.success(record?.id ? "Record updated successfully" : "Record created successfully");
      onSaved();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={submit}>
        <div className="modal-head">
          <div>
            <p className="eyebrow">{definition.eyebrow}</p>
            <h2>{record?.id ? "Edit" : "Add"} {definition.title}</h2>
          </div>
          <button type="button" className="btn ghost icon-only" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          {tabs.length > 1 && (
            <div className="tabs">
              {tabs.map((tab) => (
                <button type="button" key={tab} className={`tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              ))}
            </div>
          )}
          <div className="form-grid">
            {definition.fields
              .filter((field) => (field.tab || "Details") === activeTab)
              .map((field) => (
                <div key={field.name} className={`field ${field.full || field.type === "textarea" ? "full" : ""}`}>
                  <label>{field.label}{field.required ? " *" : ""}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      className="textarea"
                      value={values[field.name] || ""}
                      onChange={(event) => setField(field, event.target.value)}
                      required={field.required}
                    />
                  ) : field.type === "select" ? (
                    <select className="select" value={values[field.name] || ""} onChange={(event) => setField(field, event.target.value)}>
                      {(field.options || []).map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <input type="checkbox" checked={Boolean(values[field.name])} onChange={(event) => setField(field, event.target.checked)} />
                      Enabled
                    </label>
                  ) : (
                    <input
                      className="input"
                      type={field.type || "text"}
                      value={values[field.name] || ""}
                      onChange={(event) => setField(field, event.target.value)}
                      required={field.required}
                    />
                  )}
                  {field.hint && <p className="muted" style={{ fontSize: 11, marginTop: 4 }}>{field.hint}</p>}
                </div>
              ))}
          </div>
        </div>
        <div className="modal-foot">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" disabled={busy}>{busy ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
}

export function ResourcePage({ definition }: { definition: ResourceDefinition }) {
  const Icon = definition.icon;
  const [rows, setRows] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [query, setQuery] = useState({ search: "", status: "", page: 1 });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const canEdit = definition.fields.length > 0;
  const canDelete = canEdit && !["orders", "payments"].includes(definition.resource);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminApi.list(definition.resource, { ...query, limit: 20 });
      setRows(res.data || []);
      setPagination(res.pagination || { page: 1, totalPages: 1, total: 0 });
    } catch (error: any) {
      toast.error(error.message || "Could not load records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [definition.resource, query.page, query.status]);

  const applySearch = (event: FormEvent) => {
    event.preventDefault();
    setQuery((current) => ({ ...current, page: 1 }));
    load();
  };

  const openForm = (record: any = null) => {
    setEditing(record);
    setFormOpen(true);
  };

  const remove = async (row: any) => {
    if (!confirm(`Delete ${row.name || row.title || row.code || "this record"}?`)) return;
    try {
      await adminApi.remove(definition.resource, row.id);
      toast.success("Record deleted");
      load();
    } catch (error: any) {
      toast.error(error.message || "Delete failed");
    }
  };

  const bulkDelete = async () => {
    if (!selected.length) return toast.info("Select records first");
    if (!confirm(`Delete ${selected.length} selected record(s)?`)) return;
    try {
      await adminApi.bulk(definition.resource, { action: "delete", ids: selected });
      setSelected([]);
      toast.success("Bulk delete complete");
      load();
    } catch (error: any) {
      toast.error(error.message || "Bulk action failed");
    }
  };

  const duplicate = async (row: any) => {
    try {
      await adminApi.duplicate(definition.resource, row.id);
      toast.success("Product duplicated");
      load();
    } catch (error: any) {
      toast.error(error.message || "Duplicate failed");
    }
  };

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">{definition.eyebrow}</p>
          <h1>{definition.title}</h1>
          <p className="muted" style={{ marginTop: 8 }}>{definition.description}</p>
        </div>
        {canEdit && (
          <button className="btn" onClick={() => openForm()}>
            <Plus size={17} /> Add
          </button>
        )}
      </div>

      <section className="table-card panel">
        <div className="toolbar">
          <form className="toolbar-group" onSubmit={applySearch}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: 11, color: "var(--muted)" }} />
              <input className="input search" style={{ paddingLeft: 36 }} placeholder="Search" value={query.search} onChange={(event) => setQuery((current) => ({ ...current, search: event.target.value }))} />
            </div>
            {definition.statusOptions && (
              <select className="select" value={query.status} onChange={(event) => setQuery((current) => ({ ...current, status: event.target.value, page: 1 }))}>
                <option value="">All statuses</option>
                {definition.statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            )}
            <button className="btn ghost"><Search size={16} /> Search</button>
          </form>
          <div className="toolbar-group">
            <button className="btn ghost" onClick={load}><RefreshCw size={16} /> Refresh</button>
            {canDelete && <button className="btn ghost danger" onClick={bulkDelete}><Trash2 size={16} /> Bulk Delete</button>}
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={(event) => setSelected(event.target.checked ? rows.map((row) => row.id) : [])}
                  />
                </th>
                {definition.columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={definition.columns.length + 2} className="empty">Loading records...</td></tr>
              ) : rows.length ? (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id)}
                        onChange={(event) =>
                          setSelected((current) => event.target.checked ? [...current, row.id] : current.filter((id) => id !== row.id))
                        }
                      />
                    </td>
                    {definition.columns.map((column) => (
                      <td key={column.key}>{displayValue(row, column)}</td>
                    ))}
                    <td>
                      <div className="row-actions">
                        {definition.resource === "products" && <button className="btn ghost icon-only" onClick={() => duplicate(row)} title="Duplicate"><Copy size={16} /></button>}
                        {canEdit && <button className="btn ghost icon-only" onClick={() => openForm(row)} title="Edit"><Edit3 size={16} /></button>}
                        {canDelete && (
                          <button className="btn ghost icon-only" onClick={() => remove(row)} title="Delete"><Trash2 size={16} /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={definition.columns.length + 2} className="empty"><Icon size={30} /><p style={{ marginTop: 8 }}>No records found.</p></td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="toolbar" style={{ marginTop: 14, marginBottom: 0 }}>
          <span className="muted" style={{ fontSize: 13 }}>{pagination.total} records</span>
          <div className="toolbar-group">
            <button className="btn ghost" disabled={query.page <= 1} onClick={() => setQuery((current) => ({ ...current, page: Math.max(1, current.page - 1) }))}>Previous</button>
            <span className="muted" style={{ fontSize: 13 }}>Page {pagination.page} of {pagination.totalPages}</span>
            <button className="btn ghost" disabled={query.page >= pagination.totalPages} onClick={() => setQuery((current) => ({ ...current, page: current.page + 1 }))}>Next</button>
          </div>
        </div>
      </section>

      {formOpen && canEdit && <ResourceForm definition={definition} record={editing} onClose={() => setFormOpen(false)} onSaved={load} />}
    </main>
  );
}
