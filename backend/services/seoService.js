import fs from "node:fs";
import { Product, Blog } from "../models/index.js";
import { getPageSeo, normalizePath, renderSeoHead, renderSitemap, renderRobots } from "../../shared/seo.js";

export { renderRobots };

export async function getSitemap() {
  const [products, blogs] = await Promise.all([
    Product.findAll({ where: { status: "Active" }, attributes: ["slug", "updatedAt"], raw: true }),
    Blog.findAll({ where: { status: "Published" }, attributes: ["slug", "updatedAt"], raw: true }),
  ]);
  return renderSitemap([
    ...products.map(item => ({ path: `/product/${encodeURIComponent(item.slug)}`, updatedAt: item.updatedAt })),
    ...blogs.map(item => ({ path: `/blog/${encodeURIComponent(item.slug)}`, updatedAt: item.updatedAt })),
  ]);
}

export async function serveStorePage(req, res, indexPath) {
  const pathname = normalizePath(req.path);
  let product;
  let blog;
  const productMatch = pathname.match(/^\/product\/([^/]+)$/);
  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  try {
    if (productMatch) product = await Product.findOne({ where: { slug: decodeURIComponent(productMatch[1]), status: "Active" }, raw: true });
    if (blogMatch) blog = await Blog.findOne({ where: { slug: decodeURIComponent(blogMatch[1]), status: "Published" }, raw: true });
  } catch (error) {
    if (!(error instanceof URIError)) throw error;
  }
  const seo = getPageSeo(pathname, { product, blog });
  const html = fs.readFileSync(indexPath, "utf8")
    .replace(/<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/, () => `<!-- SEO_START -->\n${renderSeoHead(seo)}\n<!-- SEO_END -->`)
    .replace(/<script\b/g, `<script nonce="${res.locals.cspNonce}"`);
  if (seo.noindex) res.set("X-Robots-Tag", "noindex, follow");
  res.set("Cache-Control", "no-cache");
  return res.status(seo.status).type("html").send(html);
}
