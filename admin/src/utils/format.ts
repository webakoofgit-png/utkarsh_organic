export function inr(value: number | string | null | undefined) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function statusClass(status = "") {
  const s = status.toLowerCase();
  if (["active", "paid", "delivered", "published", "approved", "resolved", "converted", "in stock"].includes(s)) return "status success";
  if (["pending", "processing", "new", "requested", "draft", "scheduled", "low stock"].includes(s)) return "status warning";
  if (["cancelled", "failed", "rejected", "inactive", "archived", "out of stock"].includes(s)) return "status danger";
  return "status neutral";
}

export function compact(value: any) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return Array.isArray(value) ? value.join(", ") : JSON.stringify(value);
  return String(value);
}
