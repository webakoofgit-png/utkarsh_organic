import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { SITE_ORIGIN, PUBLIC_PAGES, getPageSeo, renderSeoHead, renderSitemap, renderRobots } from "../shared/seo.js";

test("public pages have unique titles, descriptions and clean canonical URLs", () => {
  const titles = new Set();
  for (const path of Object.keys(PUBLIC_PAGES)) {
    const seo = getPageSeo(`${path}?utm_source=test#section`);
    assert.equal(seo.status, 200);
    assert.equal(seo.noindex, false);
    assert.equal(seo.url, `${SITE_ORIGIN}${path}`);
    assert.ok(seo.description.length > 70);
    assert.ok(!titles.has(seo.title));
    titles.add(seo.title);
  }
  assert.equal(getPageSeo("/shop/").url, `${SITE_ORIGIN}/products`);
});

test("private and missing pages are excluded from indexing", () => {
  for (const path of ["/cart", "/checkout", "/account", "/login", "/register", "/track-order", "/admin", "/admin/orders"]) {
    assert.equal(getPageSeo(path).noindex, true);
    assert.equal(getPageSeo(path).status, 200);
  }
  for (const path of ["/missing", "/product/missing", "/blog/missing"]) {
    assert.equal(getPageSeo(path).noindex, true);
    assert.equal(getPageSeo(path).status, 404);
  }
});

test("product schema uses actual stock and price without invented ratings", () => {
  const seo = getPageSeo("/product/test", { product: { name: "Test", sku: "TEST", short: "A product", image: "/uploads/test.png", basePrice: 125, inStock: false } });
  const product = seo.structuredData.find(item => item["@type"] === "Product");
  assert.equal(product.offers.price, 125);
  assert.equal(product.offers.availability, "https://schema.org/OutOfStock");
  assert.equal(product.offers.url, `${SITE_ORIGIN}/product/test`);
  assert.deepEqual(product.image, [`${SITE_ORIGIN}/uploads/test.png`]);
  assert.equal(product.aggregateRating, undefined);
});

test("metadata escapes catalog content and cannot close a JSON-LD script", () => {
  const attack = '</script><script>alert("x")</script>';
  const seo = getPageSeo("/product/test", { product: { name: attack, description: 'Quote " & <test>', basePrice: 1 } });
  const head = renderSeoHead(seo);
  assert.equal(head.includes(attack), false);
  assert.equal((head.match(/<script\b/g) || []).length, 1);
  assert.equal((head.match(/<\/script>/g) || []).length, 1);
  const json = head.match(/type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  assert.equal(JSON.parse(json)[0].name, attack);
});

test("sitemap uses canonical public URLs and real modification dates", () => {
  const xml = renderSitemap([{ path: "/product/one", updatedAt: "2026-08-01T12:00:00Z" }, { path: "/product/one" }, { path: "/blog/a&b", updatedAt: "invalid" }]);
  assert.equal((xml.match(/<loc>.*\/product\/one<\/loc>/g) || []).length, 1);
  assert.ok(xml.includes("/blog/a&amp;b"));
  assert.ok(!xml.includes("Invalid Date"));
  for (const path of ["/cart", "/account", "/admin", "/checkout", "/shop"]) assert.ok(!xml.includes(`<loc>${SITE_ORIGIN}${path}</loc>`));
  assert.ok(renderSitemap([{ path: "/product/one", updatedAt: "2026-08-01T12:00:00Z" }]).includes("<lastmod>2026-08-01T12:00:00.000Z</lastmod>"));
  assert.ok(renderRobots().includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`));
  // Pages with noindex must remain crawlable so search engines can read the directive.
  assert.ok(!renderRobots().includes("Disallow: /account"));
});

test("generated files are synchronized and contain one GA4 installation", () => {
  const root = new URL("../", import.meta.url);
  assert.equal(fs.readFileSync(new URL("public/sitemap.xml", root), "utf8"), renderSitemap());
  assert.equal(fs.readFileSync(new URL("public/robots.txt", root), "utf8"), renderRobots());
  const html = fs.readFileSync(new URL("index.html", root), "utf8");
  assert.equal((html.match(/gtag\('config', 'G-Y8YZHL2VT5'\)/g) || []).length, 1);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(!html.includes("vercel.app"));
});
