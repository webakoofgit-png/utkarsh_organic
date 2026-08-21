import { FormEvent, useEffect, useState } from "react";
import { PackageCheck, RefreshCw, Search, Truck, X } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/services/api";
import { formatDate, inr, statusClass } from "@/utils/format";
import { orderStatusOptions } from "@/utils/resources";

export function OrdersPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [query, setQuery] = useState({ search: "", status: "", paymentStatus: "", page: 1 });
  const [selected, setSelected] = useState<any | null>(null);
  const [shipment, setShipment] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminApi.list("orders", { ...query, limit: 20 });
      setRows(res.data || []);
    } catch (error: any) {
      toast.error(error.message || "Orders failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [query.status, query.paymentStatus, query.page]);

  const changeStatus = async (order: any, status: string) => {
    if (["Cancelled", "Refunded", "Returned"].includes(status) && !confirm(`Change ${order.orderNumber} to ${status}?`)) return;
    try {
      const updated = await adminApi.orderStatus(order.id, status, `Changed from admin panel to ${status}`);
      toast.success(`Order status changed to ${status}`);
      setSelected(updated);
      load();
    } catch (error: any) {
      toast.error(error.message || "Status update failed");
    }
  };

  const saveShipment = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const saved = await adminApi.shipment(selected.id, shipment);
      toast.success("Shipment updated");
      setSelected((current: any) => ({ ...current, shipments: [saved] }));
    } catch (error: any) {
      toast.error(error.message || "Shipment update failed");
    }
  };

  const openOrder = async (order: any) => {
    const full = await adminApi.get("orders", order.id);
    setSelected(full);
    setShipment(full.shipments?.[0] || {});
  };

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Orders</p>
          <h1>Order Management</h1>
          <p className="muted" style={{ marginTop: 8 }}>Confirm, process, pack, ship, track, cancel, return, and refund orders.</p>
        </div>
        <button className="btn" onClick={load}><RefreshCw size={17} /> Refresh</button>
      </div>

      <section className="panel">
        <div className="toolbar">
          <form className="toolbar-group" onSubmit={(event) => { event.preventDefault(); load(); }}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: 11, color: "var(--muted)" }} />
              <input className="input search" style={{ paddingLeft: 36 }} placeholder="Order ID, name, mobile, email" value={query.search} onChange={(event) => setQuery((current) => ({ ...current, search: event.target.value }))} />
            </div>
            <select className="select" value={query.status} onChange={(event) => setQuery((current) => ({ ...current, status: event.target.value, page: 1 }))}>
              <option value="">All order statuses</option>
              {orderStatusOptions.map((status) => <option key={status}>{status}</option>)}
            </select>
            <select className="select" value={query.paymentStatus} onChange={(event) => setQuery((current) => ({ ...current, paymentStatus: event.target.value, page: 1 }))}>
              <option value="">All payment statuses</option>
              {["Pending", "Pending Verification", "Paid", "Failed", "Refunded", "Partially Refunded"].map((status) => <option key={status}>{status}</option>)}
            </select>
            <button className="btn ghost">Search</button>
          </form>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Tracking</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} className="empty">Loading orders...</td></tr>
              ) : rows.length ? (
                rows.map((order) => (
                  <tr key={order.id}>
                    <td><button className="btn ghost" onClick={() => openOrder(order)}>{order.orderNumber}</button></td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{order.customerName}</td>
                    <td>{order.customerPhone}</td>
                    <td>{inr(order.grandTotal)}</td>
                    <td><span className={statusClass(order.paymentStatus)}>{order.paymentStatus}</span></td>
                    <td>
                      <select className="select" value={order.orderStatus} onChange={(event) => changeStatus(order, event.target.value)}>
                        {orderStatusOptions.map((status) => <option key={status}>{status}</option>)}
                      </select>
                    </td>
                    <td>{order.trackingStatus}</td>
                    <td><button className="btn ghost" onClick={() => openOrder(order)}>Details</button></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={9} className="empty"><PackageCheck size={28} /><p>No orders found.</p></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-head">
              <div>
                <p className="eyebrow">Order Details</p>
                <h2>{selected.orderNumber}</h2>
              </div>
              <button className="btn ghost icon-only" onClick={() => setSelected(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <section className="split">
                <div>
                  <div className="form-card" style={{ padding: 18 }}>
                    <h3>Customer Information</h3>
                    <p style={{ marginTop: 10 }}><strong>{selected.customerName}</strong></p>
                    <p className="muted">{selected.customerEmail || "-"} · {selected.customerPhone}</p>
                    <p className="muted" style={{ marginTop: 8 }}>{selected.shippingAddress?.line1}, {selected.shippingAddress?.city}, {selected.shippingAddress?.state} {selected.shippingAddress?.pincode}</p>
                  </div>

                  <div className="form-card" style={{ padding: 18, marginTop: 14 }}>
                    <h3>Products</h3>
                    <div className="table-wrap" style={{ marginTop: 10 }}>
                      <table>
                        <thead>
                          <tr><th>Product</th><th>SKU</th><th>Qty</th><th>Unit</th><th>Total</th></tr>
                        </thead>
                        <tbody>
                          {(selected.items || []).map((item: any) => (
                            <tr key={item.id}>
                              <td>{item.productName}<br /><span className="muted">{item.variantName}</span></td>
                              <td>{item.sku}</td>
                              <td>{item.quantity}</td>
                              <td>{inr(item.unitPrice)}</td>
                              <td>{inr(item.total)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="form-card" style={{ padding: 18, marginTop: 14 }}>
                    <h3>Order Timeline</h3>
                    <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                      {(selected.history || []).map((event: any) => (
                        <div key={event.id} style={{ display: "flex", gap: 10 }}>
                          <span className="brand-mark" style={{ width: 34, height: 34 }}><Truck size={16} /></span>
                          <div>
                            <strong style={{ fontSize: 13 }}>{event.status}</strong>
                            <p className="muted" style={{ fontSize: 12 }}>{formatDate(event.changedAt || event.createdAt)} · {event.note || "-"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <aside>
                  <div className="form-card" style={{ padding: 18 }}>
                    <h3>Order Summary</h3>
                    {[
                      ["Subtotal", selected.subtotal],
                      ["Discount", selected.discount],
                      ["Tax", selected.tax],
                      ["Shipping", selected.shipping],
                      ["Grand Total", selected.grandTotal],
                    ].map(([label, value]) => (
                      <p key={label as string} style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                        <span className="muted">{label}</span><strong>{inr(value as any)}</strong>
                      </p>
                    ))}
                  </div>

                  <form className="form-card" style={{ padding: 18, marginTop: 14 }} onSubmit={saveShipment}>
                    <h3>Shipment</h3>
                    {[
                      ["courierCompany", "Courier Company"],
                      ["trackingNumber", "AWB / Tracking Number"],
                      ["trackingUrl", "Tracking URL"],
                      ["dispatchDate", "Dispatch Date"],
                      ["expectedDeliveryDate", "Expected Delivery Date"],
                      ["deliveryStatus", "Delivery Status"],
                    ].map(([key, label]) => (
                      <div className="field" style={{ marginTop: 12 }} key={key}>
                        <label>{label}</label>
                        <input
                          className="input"
                          type={key.toLowerCase().includes("date") ? "date" : "text"}
                          value={shipment?.[key] ? String(shipment[key]).slice(0, 10) : ""}
                          onChange={(event) => setShipment((current: any) => ({ ...current, [key]: event.target.value }))}
                        />
                      </div>
                    ))}
                    <div className="field" style={{ marginTop: 12 }}>
                      <label>Notes</label>
                      <textarea className="textarea" value={shipment.notes || ""} onChange={(event) => setShipment((current: any) => ({ ...current, notes: event.target.value }))} />
                    </div>
                    <button className="btn" style={{ width: "100%", marginTop: 14 }}>Save Shipment</button>
                  </form>
                </aside>
              </section>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
