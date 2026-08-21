import { FormEvent, useEffect, useState } from "react";
import { Edit3, RefreshCw, Search, Warehouse, X } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/services/api";
import { formatDate, statusClass } from "@/utils/format";

export function InventoryPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [query, setQuery] = useState({ search: "", status: "", page: 1 });
  const [loading, setLoading] = useState(true);
  const [adjusting, setAdjusting] = useState<any | null>(null);
  const [form, setForm] = useState({ mode: "add", quantity: 0, reason: "" });

  const load = async () => {
    setLoading(true);
    try {
      const [inventory, history] = await Promise.all([
        adminApi.list("inventory", { ...query, limit: 20 }),
        adminApi.list("inventory/transactions", { limit: 8 }),
      ]);
      setRows(inventory.data || []);
      setTransactions(history.data || []);
    } catch (error: any) {
      toast.error(error.message || "Inventory failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [query.status, query.page]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await adminApi.adjustInventory(adjusting.id, form);
      toast.success("Stock adjusted successfully");
      setAdjusting(null);
      setForm({ mode: "add", quantity: 0, reason: "" });
      load();
    } catch (error: any) {
      toast.error(error.message || "Stock adjustment failed");
    }
  };

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Stock Control</h1>
          <p className="muted" style={{ marginTop: 8 }}>Available, reserved, sold, low stock, and out-of-stock products.</p>
        </div>
        <button className="btn" onClick={load}><RefreshCw size={17} /> Refresh</button>
      </div>

      <section className="split">
        <div className="panel">
          <div className="toolbar">
            <form className="toolbar-group" onSubmit={(event) => { event.preventDefault(); load(); }}>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: 11, color: "var(--muted)" }} />
                <input className="input search" style={{ paddingLeft: 36 }} placeholder="Search stock" value={query.search} onChange={(event) => setQuery((current) => ({ ...current, search: event.target.value }))} />
              </div>
              <select className="select" value={query.status} onChange={(event) => setQuery((current) => ({ ...current, status: event.target.value, page: 1 }))}>
                <option value="">All statuses</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
              <button className="btn ghost">Search</button>
            </form>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Available</th>
                  <th>Reserved</th>
                  <th>Sold</th>
                  <th>Minimum</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={9} className="empty">Loading stock...</td></tr>
                ) : rows.length ? (
                  rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.product?.name || "-"}</td>
                      <td>{row.variant?.sku || row.product?.sku || "-"}</td>
                      <td>{row.availableStock}</td>
                      <td>{row.reservedStock}</td>
                      <td>{row.soldQuantity}</td>
                      <td>{row.minimumStock}</td>
                      <td><span className={statusClass(row.status)}>{row.status}</span></td>
                      <td>{formatDate(row.lastUpdated)}</td>
                      <td><button className="btn ghost icon-only" onClick={() => setAdjusting(row)}><Edit3 size={16} /></button></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={9} className="empty"><Warehouse size={28} /><p>No inventory rows found.</p></td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="panel">
          <h2>Recent Stock History</h2>
          <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
            {transactions.map((tx) => (
              <div key={tx.id} style={{ borderBottom: "1px solid var(--line)", paddingBottom: 12 }}>
                <strong style={{ display: "block", fontSize: 13 }}>{tx.product?.name || "Product"} · {tx.transactionType}</strong>
                <p className="muted" style={{ fontSize: 12 }}>{tx.changedQuantity > 0 ? "+" : ""}{tx.changedQuantity} stock, now {tx.newQuantity}</p>
                <p className="muted" style={{ fontSize: 11 }}>{formatDate(tx.createdAt)} · {tx.reason || "-"}</p>
              </div>
            ))}
            {!transactions.length && <p className="muted">No stock movement yet.</p>}
          </div>
        </aside>
      </section>

      {adjusting && (
        <div className="modal-backdrop">
          <form className="modal" style={{ width: "min(520px, 100%)" }} onSubmit={submit}>
            <div className="modal-head">
              <div>
                <p className="eyebrow">Stock</p>
                <h2>Adjust Stock</h2>
              </div>
              <button type="button" className="btn ghost icon-only" onClick={() => setAdjusting(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p><strong>{adjusting.product?.name}</strong></p>
              <p className="muted" style={{ marginTop: 4 }}>Current available stock: {adjusting.availableStock}</p>
              <div className="form-grid" style={{ marginTop: 18 }}>
                <div className="field">
                  <label>Mode</label>
                  <select className="select" value={form.mode} onChange={(event) => setForm((current) => ({ ...current, mode: event.target.value }))}>
                    <option value="add">Add stock</option>
                    <option value="reduce">Reduce stock</option>
                    <option value="set">Set exact stock</option>
                    <option value="damage">Damaged stock</option>
                    <option value="return">Returned stock</option>
                    <option value="correction">Manual correction</option>
                  </select>
                </div>
                <div className="field">
                  <label>Quantity</label>
                  <input className="input" type="number" min="0" value={form.quantity} onChange={(event) => setForm((current) => ({ ...current, quantity: Number(event.target.value) }))} />
                </div>
                <div className="field full">
                  <label>Reason</label>
                  <textarea className="textarea" value={form.reason} onChange={(event) => setForm((current) => ({ ...current, reason: event.target.value }))} />
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button type="button" className="btn ghost" onClick={() => setAdjusting(null)}>Cancel</button>
              <button className="btn">Save Adjustment</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
