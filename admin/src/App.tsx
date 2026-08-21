import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAuth } from "@/context/AuthContext";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ResourcePage } from "@/pages/ResourcePage";
import { resourceDefinitions } from "@/utils/resources";
import { InventoryPage } from "@/pages/InventoryPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { ReportsPage } from "@/pages/ReportsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { MediaPage } from "@/pages/MediaPage";

function Protected() {
  const { admin, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="page">Loading admin session...</div>;
  if (!admin) return <Navigate to="/login" state={{ from: location }} replace />;
  return <AdminLayout />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Protected />}>
        <Route index element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory-history" element={<ResourcePage definition={resourceDefinitions["inventory-transactions"]} />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {Object.entries(resourceDefinitions)
          .filter(([key]) => !["inventory-transactions", "media"].includes(key))
          .map(([path, definition]) => (
            <Route key={path} path={`/${path}`} element={<ResourcePage definition={definition} />} />
          ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
