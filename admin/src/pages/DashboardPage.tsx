import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Boxes, FilePlus2, PackagePlus, ReceiptIndianRupee, ShoppingCart, Users, Warehouse } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { adminApi } from "@/services/api";
import { formatDate, inr, statusClass } from "@/utils/format";

const colors = ["#176b3a", "#11b76a", "#d99a17", "#0d4325", "#c84235", "#6e7d73"];

export function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .dashboard()
      .then(setData)
      .catch((error) => toast.error(error.message || "Dashboard failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats || {};
  const cards = [
    ["Total Sales", inr(stats.totalSales), ReceiptIndianRupee],
    ["Today's Sales", inr(stats.todaySales), BarChart3],
    ["Monthly Revenue", inr(stats.monthlyRevenue), BarChart3],
    ["Total Orders", stats.totalOrders || 0, ShoppingCart],
    ["Pending Orders", stats.pendingOrders || 0, ShoppingCart],
    ["Processing Orders", stats.processingOrders || 0, Boxes],
    ["Shipped Orders", stats.shippedOrders || 0, Warehouse],
    ["Delivered Orders", stats.deliveredOrders || 0, ShoppingCart],
    ["Total Customers", stats.totalCustomers || 0, Users],
    ["Total Products", stats.totalProducts || 0, PackagePlus],
    ["Low Stock", stats.lowStockProducts || 0, Warehouse],
    ["Out of Stock", stats.outOfStockProducts || 0, Warehouse],
  ];

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Utkarsh Organic Control Room</h1>
          <p className="muted" style={{ marginTop: 8 }}>Sales, orders, products, inventory, and fulfilment at a glance.</p>
        </div>
        <div className="toolbar-group">
          <Link className="btn" to="/products"><PackagePlus size={17} /> Add Product</Link>
          <Link className="btn ghost" to="/orders"><ShoppingCart size={17} /> Create Order</Link>
        </div>
      </div>

      {loading ? (
        <section className="panel">Loading dashboard...</section>
      ) : (
        <>
          <section className="grid-stats">
            {cards.map(([label, value, Icon]: any) => (
              <div className="stat-card" key={label}>
                <span className="icon"><Icon size={19} /></span>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </section>

          <div className="quick-actions">
            <Link className="btn ghost" to="/inventory"><Warehouse size={16} /> Add Stock</Link>
            <Link className="btn ghost" to="/coupons"><ReceiptIndianRupee size={16} /> Create Coupon</Link>
            <Link className="btn ghost" to="/blogs"><FilePlus2 size={16} /> Add Blog</Link>
          </div>

          <section className="content-grid">
            <div className="panel">
              <h2>Revenue Overview</h2>
              <div style={{ width: "100%", height: 320, marginTop: 18 }}>
                <ResponsiveContainer>
                  <BarChart data={data?.revenueSeries || []}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(value: any) => inr(value)} />
                    <Bar dataKey="revenue" fill="#176b3a" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="panel">
              <h2>Order Status</h2>
              <div style={{ width: "100%", height: 320, marginTop: 18 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={data?.orderStatus || []} dataKey="count" nameKey="status" outerRadius={105} label>
                      {(data?.orderStatus || []).map((_entry: any, index: number) => <Cell key={index} fill={colors[index % colors.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="content-grid">
            <div className="panel">
              <h2>Recent Orders</h2>
              <div className="table-wrap" style={{ marginTop: 12 }}>
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data?.recentOrders || []).map((order: any) => (
                      <tr key={order.id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.customerName}</td>
                        <td>{inr(order.grandTotal)}</td>
                        <td><span className={statusClass(order.orderStatus)}>{order.orderStatus}</span></td>
                        <td>{formatDate(order.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel">
              <h2>Top Selling Products</h2>
              <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                {(data?.topSellingProducts || []).map((product: any) => (
                  <div key={product.productId || product.productName} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <img className="image-thumb" src={product.image} alt="" />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <strong style={{ display: "block", fontSize: 13 }}>{product.productName}</strong>
                      <span className="muted" style={{ fontSize: 12 }}>{product.unitsSold || 0} units</span>
                    </div>
                    <strong>{inr(product.revenue)}</strong>
                  </div>
                ))}
                {!(data?.topSellingProducts || []).length && <p className="muted">No sales yet.</p>}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
