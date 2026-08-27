const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";
const ACCESS_KEY = "utkarsh-admin-access";
const REFRESH_KEY = "utkarsh-admin-refresh";

type RequestOptions = RequestInit & { form?: boolean };

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export async function apiRequest(path: string, options: RequestOptions = {}) {
  const headers = new Headers(options.headers);
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (!options.form && options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  const response = await fetch(`${API_BASE}${path}`, { cache: "no-store", ...options, headers });
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();
  if (!response.ok || (isJson && payload.success === false)) {
    throw new Error(isJson ? payload.message : payload || "API request failed");
  }
  return payload;
}

export const authApi = {
  async login(email: string, password: string) {
    const res = await apiRequest("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    setTokens(res.data.accessToken, res.data.refreshToken);
    return res.data.admin;
  },
  async profile() {
    const res = await apiRequest("/auth/profile");
    return res.data;
  },
  async logout() {
    const refreshToken = getRefreshToken();
    try {
      await apiRequest("/auth/logout", { method: "POST", body: JSON.stringify({ refreshToken }) });
    } finally {
      clearTokens();
    }
  },
};

export const adminApi = {
  async dashboard() {
    return (await apiRequest("/admin/dashboard")).data;
  },
  async list(resource: string, params?: Record<string, any>) {
    const query = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
    });
    const res = await apiRequest(`/admin/${resource}${query.toString() ? `?${query}` : ""}`);
    return res;
  },
  async get(resource: string, id: string | number) {
    return (await apiRequest(`/admin/${resource}/${id}`)).data;
  },
  async create(resource: string, data: any) {
    return (await apiRequest(`/admin/${resource}`, { method: "POST", body: JSON.stringify(data) })).data;
  },
  async update(resource: string, id: string | number, data: any) {
    return (await apiRequest(`/admin/${resource}/${id}`, { method: "PUT", body: JSON.stringify(data) })).data;
  },
  async remove(resource: string, id: string | number) {
    return apiRequest(`/admin/${resource}/${id}`, { method: "DELETE" });
  },
  async bulk(resource: string, data: any) {
    return apiRequest(`/admin/${resource}/bulk`, { method: "POST", body: JSON.stringify(data) });
  },
  async duplicate(resource: string, id: string | number) {
    return (await apiRequest(`/admin/${resource}/${id}/duplicate`, { method: "POST" })).data;
  },
  async orderStatus(id: string | number, status: string, note?: string) {
    return (await apiRequest(`/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status, note }) })).data;
  },
  async shipment(id: string | number, data: any) {
    return (await apiRequest(`/admin/orders/${id}/shipment`, { method: "PUT", body: JSON.stringify(data) })).data;
  },
  async settings(data?: any) {
    if (data) return (await apiRequest("/admin/settings", { method: "PUT", body: JSON.stringify(data) })).data;
    return (await apiRequest("/admin/settings")).data;
  },
};
