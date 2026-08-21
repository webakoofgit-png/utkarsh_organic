import { BLOG_POSTS } from "@/lib/products";

export type BlogPost = (typeof BLOG_POSTS)[number];

function formatDate(value?: string) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function normalizeBlog(raw: any): BlogPost {
  const body = Array.isArray(raw.body)
    ? raw.body
    : String(raw.fullContent || "")
        .split(/\n{2,}/)
        .map((item) => item.trim())
        .filter(Boolean);

  return {
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt || raw.shortDescription || "",
    date: formatDate(raw.date || raw.publishedDate),
    read: raw.read || raw.readTime || "",
    body,
  };
}
