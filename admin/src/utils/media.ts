const API_BASE = import.meta.env["VITE_API_URL"] || "http://localhost:5000/api";
const STOREFRONT_ORIGIN = import.meta.env["VITE_STOREFRONT_URL"] || "http://127.0.0.1:5173";

function originFrom(url: string) {
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

export function resolveImageUrl(value?: string | null) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^(https?:|data:|blob:)/i.test(raw)) return raw;

  const apiOrigin = originFrom(API_BASE);
  const storefrontOrigin = STOREFRONT_ORIGIN.replace(/\/$/, "");
  const normalized = raw.replace(/^\//, "");

  if (normalized.startsWith("uploads/")) return `${apiOrigin}/${normalized}`;
  if (normalized.startsWith("src/") || normalized.startsWith("assets/")) {
    return `${storefrontOrigin}/${normalized}`;
  }

  return apiOrigin ? `${apiOrigin}/${normalized}` : raw;
}
