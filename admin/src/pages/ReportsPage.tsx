import { FormEvent, useEffect, useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/services/api";
import { compact, inr } from "@/utils/format";

const types = ["sales", "product", "inventory", "customer"];

export function ReportsPage() {
  const [type, setType] = useState("sales");
  const [filters, setFilters] = useState({ from: "", to: "" });
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setData(await adminApi.report(type, filters));
    } catch (error: any) {
      toast.error(error.message || "Report failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [type]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    load();
  };

  const exportCsv = async () => {
    try {
      const blob = await adminApi.exportReport(type, filters);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-report.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast.error(error.message || "CSV export failed");
    }
  };

  const rows = data?.rows || [];
  const summary = data?.summary || {};

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Reports</p>
          <h1>Business Reports</h1>
          <p className="muted" style={{ marginTop: 8 }}>Sales, product, inventory, and customer reporting with export.</p>
        </div>
        <button className="btn" onClick={exportCsv}><Download size={17} /> Export CSV</button>
      </div>

      <section className="panel">
        <div className="tabs">
          {types.map((item) => (
            <button key={item} className={`tab ${type === item ? "active" : ""}`} onClick={() => setType(item)}>
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
        <form className="toolbar" onSubmit={submit}>
          <div className="toolbar-group">
            <input className="input" type="date" value={filters.from} onChange={(event) => setFilters((current) => ({ ...current, from: event.target.value }))} />
            <input className="input" type="date" value={filters.to} onChange={(event) => setFilters((current) => ({ ...current, to: event.target.value }))} />
            <button className="btn ghost"><RefreshCw size={16} /> Apply</button>
          </div>
        </form>

        {Object.keys(summary).length > 0 && (
          <div className="grid-stats" style={{ marginBottom: 18 }}>
            {Object.entries(summary).filter(([, value]) => typeof value !== "object").map(([key, value]) => (
              <div className="stat-card" key={key}>
                <strong>{String(key).toLowerCase().includes("sales") || String(key).toLowerCase().includes("tax") || String(key).toLowerCase().includes("shipping") || String(key).toLowerCase().includes("refund") || String(key).toLowerCase().includes("value") ? inr(value as any) : compact(value)}</strong>
                <span>{key.replace(/([A-Z])/g, " $1")}</span>
              </div>
            ))}
          </div>
        )}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {Object.keys(rows[0] || { empty: "" }).slice(0, 8).map((key) => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="empty">Loading report...</td></tr>
              ) : rows.length ? (
                rows.map((row: any, index: number) => (
                  <tr key={row.id || index}>
                    {Object.keys(rows[0]).slice(0, 8).map((key) => <td key={key}>{compact(row[key])}</td>)}
                  </tr>
                ))
              ) : (
                <tr><td className="empty">No report rows found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
