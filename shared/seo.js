export const SITE_ORIGIN = "https://www.utkarshorgfarm.in";
export const SITE_NAME = "Utkarsh Organic Farm";

export const PUBLIC_PAGES = {
  "/": ["Dehydrated Vegetables & Organic Powders", "Shop dehydrated vegetables, organic powders and spice powders from Utkarsh Organic Farm, Satara. Explore products and request bulk supply across India."],
  "/products": ["Shop Dehydrated Vegetables & Powders", "Browse onion, garlic, moringa, beetroot and other vegetable powders, dried flakes and spices. Choose pack sizes or enquire about bulk orders."],
  "/about": ["About Our Farm in Satara", "Meet Utkarsh Organic Farm in Satara, Maharashtra. Learn about our farm, ingredient processing and dehydrated vegetable and powder supply."],
  "/why-organic": ["Our Ingredients & Processing", "Learn how Utkarsh Organic Farm grows and processes vegetables into dehydrated ingredients and powders for home and commercial kitchens."],
  "/bulk-orders": ["Bulk Dehydrated Ingredients & Wholesale Enquiries", "Request a quote for bulk dehydrated vegetables, organic powders and spices. We supply restaurants, food processors and wholesale buyers across India."],
  "/gallery": ["Farm & Product Gallery", "Explore photos from Utkarsh Organic Farm, our vegetable processing and our range of dehydrated ingredients, powders and packaged products."],
  "/recipes": ["Recipes with Vegetable Powders & Dried Ingredients", "Find cooking ideas using onion powder, moringa, vegetable flakes and other Utkarsh Organic Farm ingredients for everyday meals."],
  "/blog": ["Farm Journal & Ingredient Guides", "Read Utkarsh Organic Farm's guides to dehydrated vegetables, organic powders, ingredient storage and cooking with farm products."],
  "/contact": ["Contact Our Satara Farm", "Contact Utkarsh Organic Farm in Satara, Maharashtra for product details, order support and bulk supply enquiries. Call +91 7507379018."],
  "/cancellation-policy": ["Cancellation & Refund Policy", "Read the cancellation, return and refund policy for orders placed with Utkarsh Organic Farm, including how to contact order support."],
  "/privacy-policy": ["Privacy Policy", "Learn how Utkarsh Organic Farm handles customer information, order details, website analytics, cookies and privacy requests."],
  "/terms-conditions": ["Terms & Conditions", "Read the terms for shopping with Utkarsh Organic Farm, including product information, orders, payments, delivery and customer responsibilities."],
};

const PRIVATE_PAGES = {
  "/cart": "Shopping Cart", "/checkout": "Checkout", "/login": "Sign In",
  "/register": "Create Account", "/account": "My Account", "/track-order": "Track Order",
};

export function absoluteUrl(value = "/") {
  try {
    const url = new URL(value, SITE_ORIGIN);
    return ["https:", "http:"].includes(url.protocol) ? url.href : `${SITE_ORIGIN}/logo.png`;
  } catch { return `${SITE_ORIGIN}/logo.png`; }
}

export function normalizePath(value) {
  const path = value.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  return path === "/shop" ? "/products" : path;
}

function plainText(value) {
  return String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function getPageSeo(pathname, { product, blog } = {}) {
  const path = normalizePath(pathname);
  const entry = PUBLIC_PAGES[path];
  const isAdmin = /^\/admin(?:\/|$)/.test(path);
  const privateTitle = PRIVATE_PAGES[path] || (isAdmin ? "Admin Panel" : undefined);
  const exists = Boolean(entry || privateTitle || product || blog);
  const title = product?.name || blog?.title || entry?.[0] || privateTitle || "Page Not Found";
  const description = plainText(product?.short || product?.shortDescription || product?.description || product?.fullDescription || blog?.excerpt || blog?.shortDescription || entry?.[1] || `${title} at ${SITE_NAME}.`).slice(0, 160);
  const url = absoluteUrl(path);
  const image = absoluteUrl(product?.image || product?.mainImage || blog?.featuredImage || "/logo.png");
  const noindex = !exists || Boolean(privateTitle);
  const structuredData = [];

  if (path === "/") {
    structuredData.push({
      "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_ORIGIN}/#organization`,
      name: SITE_NAME, url: absoluteUrl("/"), logo: absoluteUrl("/logo.png"),
      telephone: "+91 7507379018", email: "PrafullChorage143@gmail.com",
      address: { "@type": "PostalAddress", streetAddress: "D-31 Near By Atharva Foundry, MIDC", addressLocality: "Satara", addressRegion: "Maharashtra", postalCode: "412803", addressCountry: "IN" },
      sameAs: ["https://www.instagram.com/utkarshorgfarm/", "https://www.facebook.com/utkarshorgfarm/"],
    }, { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website`, name: SITE_NAME, url: absoluteUrl("/") });
  }
  if (product) {
    const price = Number(product.basePrice ?? (product.salePrice || product.regularPrice));
    const inStock = product.inStock ?? (product.status === "Active" && Number(product.stockQuantity) > 0);
    structuredData.push({
      "@context": "https://schema.org", "@type": "Product", "@id": `${url}#product`,
      name: product.name, description, image: [image], sku: product.sku,
      brand: { "@type": "Brand", name: SITE_NAME },
      ...(price > 0 ? { offers: { "@type": "Offer", url, priceCurrency: "INR", price, itemCondition: "https://schema.org/NewCondition", availability: `https://schema.org/${inStock ? "InStock" : "OutOfStock"}` } } : {}),
    });
  }
  if (blog) {
    structuredData.push({
      "@context": "https://schema.org", "@type": "BlogPosting", headline: blog.title,
      description, image: [image], mainEntityOfPage: url,
      publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") } },
    });
  }
  if (!noindex && path !== "/") {
    const crumbs = [{ name: "Home", item: absoluteUrl("/") }];
    if (product) crumbs.push({ name: "Products", item: absoluteUrl("/products") });
    if (blog) crumbs.push({ name: "Farm Journal", item: absoluteUrl("/blog") });
    crumbs.push({ name: title, item: url });
    structuredData.push({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, ...crumb })) });
  }
  return { title: `${title} | ${SITE_NAME}`, description, url, image, type: blog ? "article" : "website", noindex, status: exists ? 200 : 404, structuredData };
}

export function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]);
}

export function renderSeoHead(seo) {
  const meta = (attribute, name, content) => `<meta data-seo ${attribute}="${name}" content="${escapeXml(content)}" />`;
  return [
    `<title data-seo>${escapeXml(seo.title)}</title>`,
    meta("name", "description", seo.description),
    meta("name", "robots", seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"),
    `<link data-seo rel="canonical" href="${escapeXml(seo.url)}" />`,
    meta("property", "og:type", seo.type), meta("property", "og:site_name", SITE_NAME),
    meta("property", "og:locale", "en_IN"), meta("property", "og:title", seo.title),
    meta("property", "og:description", seo.description), meta("property", "og:url", seo.url),
    meta("property", "og:image", seo.image), meta("property", "og:image:alt", seo.title),
    meta("name", "twitter:card", "summary_large_image"), meta("name", "twitter:title", seo.title),
    meta("name", "twitter:description", seo.description), meta("name", "twitter:image", seo.image),
    `<script data-seo type="application/ld+json">${JSON.stringify(seo.structuredData).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

export function renderSitemap(items = []) {
  const urls = new Map(Object.keys(PUBLIC_PAGES).map(path => [absoluteUrl(path), null]));
  for (const item of items) urls.set(absoluteUrl(item.path), item.updatedAt || null);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls].map(([url, updated]) => {
    const date = updated ? new Date(updated) : null;
    const lastmod = date && !Number.isNaN(date.getTime()) ? `<lastmod>${date.toISOString()}</lastmod>` : "";
    return `  <url><loc>${escapeXml(url)}</loc>${lastmod}</url>`;
  }).join("\n")}\n</urlset>\n`;
}

export function renderRobots() {
  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}
