import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authApi, clearTokens, getAccessToken } from "@/services/api";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  roles?: { slug: string; name: string }[];
  permissions?: string[];
};

type AuthContextValue = {
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!getAccessToken()) {
        setLoading(false);
        return;
      }
      try {
        const profile = await authApi.profile();
        if (mounted) setAdmin(profile);
      } catch {
        clearTokens();
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      admin,
      loading,
      login: async (email, password) => {
        const user = await authApi.login(email, password);
        setAdmin(user);
      },
      logout: async () => {
        await authApi.logout();
        setAdmin(null);
      },
      hasPermission: (permission) => {
        if (!admin) return false;
        if (admin.roles?.some((role) => role.slug === "super-admin")) return true;
        return Boolean(admin.permissions?.includes(permission) || admin.permissions?.includes("*"));
      },
    }),
    [admin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
