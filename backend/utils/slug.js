export function slugify(value = "") {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function inr(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;
}
