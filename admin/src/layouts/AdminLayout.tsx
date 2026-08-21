import {
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Contact,
  FileText,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ReceiptIndianRupee,
  Settings,
  Shield,
  ShoppingCart,
  Tags,
  Users,
  Warehouse,
  X,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const groups = [
  {
    label: "Overview",
    items: [{ to: "/", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Catalog",
    items: [
      { to: "/products", label: "Products", icon: Package },
      { to: "/categories", label: "Categories", icon: Tags },
      { to: "/reviews", label: "Reviews", icon: Bell },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/inventory", label: "Stock", icon: Warehouse },
      { to: "/inventory-history", label: "Stock History", icon: Boxes },
      { to: "/orders", label: "All Orders", icon: ShoppingCart },
      { to: "/returns", label: "Returns", icon: ClipboardList },
      { to: "/refunds", label: "Refunds", icon: ReceiptIndianRupee },
      { to: "/customers", label: "Customers", icon: Users },
    ],
  },
  {
    label: "Growth",
    items: [
      { to: "/coupons", label: "Coupons", icon: Tags },
      { to: "/bulk-orders", label: "Bulk Orders", icon: Boxes },
      { to: "/blogs", label: "Blog Posts", icon: BookOpen },
      { to: "/blog-categories", label: "Blog Categories", icon: FileText },
      { to: "/contact-enquiries", label: "Enquiries", icon: Contact },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/reports", label: "Reports", icon: BarChart3 },
      { to: "/media", label: "Media Library", icon: Image },
      { to: "/settings", label: "Settings", icon: Settings },
      { to: "/admin-users", label: "Admin Users", icon: Shield },
      { to: "/roles", label: "Roles", icon: Shield },
      { to: "/activity-logs", label: "Activity Logs", icon: ClipboardList },
    ],
  },
];

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={`app-shell ${collapsed ? "collapsed" : ""}`}>
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <span className="brand-mark">U</span>
          {!collapsed && (
            <div>
              <strong>UTKARSH</strong>
              <span>Organic Admin</span>
            </div>
          )}
          <button className="btn ghost icon-only mobile-menu" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-section">
          {groups.map((group) => (
            <div key={group.label}>
              {!collapsed && <div className="sidebar-label">{group.label}</div>}
              {group.items.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} end={to === "/"} className="nav-link" onClick={() => setMobileOpen(false)}>
                  <Icon />
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="toolbar-group">
            <button className="btn ghost icon-only mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={18} />
            </button>
            <button className="btn ghost icon-only" onClick={() => setCollapsed((value) => !value)} aria-label="Collapse sidebar">
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            <div>
              <strong>Operations Control</strong>
              <p className="muted" style={{ fontSize: 12 }}>Products, inventory, orders, content, and reports</p>
            </div>
          </div>

          <div className="toolbar-group">
            <NavLink to="/notifications" className="btn ghost icon-only" aria-label="Notifications">
              <Bell size={18} />
            </NavLink>
            <div style={{ textAlign: "right" }}>
              <strong style={{ fontSize: 13 }}>{admin?.name}</strong>
              <p className="muted" style={{ fontSize: 12 }}>{admin?.email}</p>
            </div>
            <button className="btn ghost icon-only" onClick={handleLogout} aria-label="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
}
