import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCatalog } from "@/lib/catalog";
import { getPageSeo, renderSeoHead, type PageSeo } from "../../../shared/seo.js";

export function usePageSeo(seo: PageSeo | null) {
  const head = seo ? renderSeoHead(seo) : null;
  useLayoutEffect(() => {
    if (head === null) return;
    document.head.querySelectorAll("[data-seo]").forEach(node => node.remove());
    const template = document.createElement("template");
    template.innerHTML = head;
    document.head.append(template.content);
  }, [head]);
}

export function RouteSeo() {
  const { pathname } = useLocation();
  const { getProductBySlug, loading } = useCatalog();
  const match = pathname.match(/^\/product\/([^/]+)\/?$/);
  let slug = match?.[1] || "";
  try { slug = decodeURIComponent(slug); } catch { /* Invalid slugs use the not-found metadata. */ }
  const product = match ? getProductBySlug(slug) : undefined;
  // Article metadata is supplied by the article page after its content loads.
  const skip = /^\/blog\/[^/]+\/?$/.test(pathname) || (match && loading);
  usePageSeo(skip ? null : getPageSeo(pathname, { product }));
  return null;
}
