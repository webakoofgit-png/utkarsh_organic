import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAuth } from "@/context/AuthContext";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ResourcePage } from "@/pages/ResourcePage";
import { resourceDefinitions } from "@/utils/resources";
import { OrdersPage } from "@/pages/OrdersPage";
import { SettingsPage } from "@/pages/SettingsPage";

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
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {Object.entries(resourceDefinitions)
          .map(([path, definition]) => (
            <Route key={path} path={`/${path}`} element={<ResourcePage definition={definition} />} />
          ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
