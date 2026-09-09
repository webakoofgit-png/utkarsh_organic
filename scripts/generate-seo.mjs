import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { getPageSeo, renderSeoHead, renderRobots, renderSitemap } from "../shared/seo.js";

const root = new URL("../", import.meta.url);
const indexPath = new URL("index.html", root);
const html = fs.readFileSync(indexPath, "utf8");
if (!html.includes("<!-- SEO_START -->")) throw new Error("SEO markers missing from index.html");
fs.writeFileSync(indexPath, html.replace(/<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/, `<!-- SEO_START -->\n    ${renderSeoHead(getPageSeo("/"))}\n    <!-- SEO_END -->`));
fs.writeFileSync(new URL("public/robots.txt", root), renderRobots());
fs.writeFileSync(new URL("public/sitemap.xml", root), renderSitemap());
console.log(`Generated SEO metadata, robots.txt and static-page sitemap in ${fileURLToPath(root)}. Production sitemap also includes live catalog entries.`);
