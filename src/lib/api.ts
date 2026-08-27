const API_BASE = import.meta.env["VITE_API_URL"] || "http://127.0.0.1:5000/api";

async function request(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const response = await fetch(`${API_BASE}${path}`, { cache: "no-store", ...options, headers });
  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message || "Request failed");
  }
  return payload;
}

export const storeApi = {
  async products(params?: Record<string, string | number | undefined>) {
    const query = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== "") query.set(key, String(value));
    });
    return request(`/store/products${query.toString() ? `?${query}` : ""}`);
  },
  async product(slug: string) {
    return request(`/store/products/${slug}`);
  },
  async categories() {
    return request("/store/categories");
  },
  async blogs() {
    return request("/store/blogs");
  },
  async blog(slug: string) {
    return request(`/store/blogs/${encodeURIComponent(slug)}`);
  },
  async createOrder(data: unknown) {
    return request("/store/orders", { method: "POST", body: JSON.stringify(data) });
  },
  async trackOrder(data: unknown) {
    return request("/store/order-tracking", { method: "POST", body: JSON.stringify(data) });
  },
  async contact(data: unknown) {
    return request("/store/contact-enquiries", { method: "POST", body: JSON.stringify(data) });
  },
  async bulkOrder(data: unknown) {
    return request("/store/bulk-orders", { method: "POST", body: JSON.stringify(data) });
  },
};
