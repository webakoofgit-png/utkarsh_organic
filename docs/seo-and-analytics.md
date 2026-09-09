# SEO and Google Analytics

The canonical domain is `https://www.utkarshorgfarm.in`, taken from the existing company information. Set `SITE_ORIGIN` in `shared/seo.js` if the production domain changes, then run `npm run seo:generate` and rebuild. Keep `COMPANY_INFO.website`, `CLIENT_ORIGIN` and hosting redirects consistent with that domain.

## What is implemented

- Google tag `G-Y8YZHL2VT5` loads once in the storefront HTML. The separate admin app does not include analytics.
- Titles, descriptions, canonical URLs, Open Graph and Twitter metadata are specific to each public route. The Node server supplies these in the initial HTML, including live product and article metadata. React updates them on navigation.
- Organization, WebSite, Product, BlogPosting and breadcrumb JSON-LD use the corresponding page content. Product availability and prices use catalog values; no sample ratings are advertised in structured data.
- `/sitemap.xml` on the Node server includes public pages, active products and published articles. Product/article modification dates come from the database. New catalog records appear without a rebuild, with up to five minutes of HTTP caching.
- `/robots.txt` references the canonical sitemap and excludes API crawling. Account, cart, checkout, tracking and admin pages use `noindex`. They remain crawlable so search engines can read that directive; robots.txt is not access control.
- `/shop` permanently redirects to `/products`, and `/index.html` redirects to `/`. Unknown routes and missing products/articles return HTTP 404. A temporary database failure returns 503 rather than a misleading 404.
- Below-the-fold product/gallery images load lazily; the main product image loads eagerly.
- The server allows Google Analytics and the existing checkout integration in its Content Security Policy. Inline scripts use a per-response nonce.

## Build and hosting

`npm run seo:generate` refreshes the checked-in homepage metadata, `public/robots.txt` and the static-page fallback sitemap. It also runs before `npm run dev` and `npm run build`.

Deploy using the existing Node/Express backend (`npm start`) with the frontend and admin build outputs. A static-only host will serve the fallback sitemap with public static pages and cannot provide the database-driven sitemap, per-route initial metadata or HTTP status handling. Page content still renders in React; the changes do not add full server rendering of the page body.

Configure the hosting provider to redirect HTTP and alternative hostnames to the HTTPS canonical domain. Configure `CLIENT_ORIGIN` and `ADMIN_ORIGIN` for the deployed site.

## Google account setup after deployment

1. In GA4, open Admin → Data streams → the web stream for `G-Y8YZHL2VT5` → Enhanced measurement → Page views → advanced settings. Enable **Page loads** and **Page changes based on browser history events**. The app uses React Router's History API. Do not add a second manual page-view tag.
2. Visit the live site and confirm page views in GA4 Realtime/DebugView. Check navigation between the homepage, products and an individual product. Local browser checks intercept Google's script to avoid adding test traffic to the real property; they verify integration, not receipt in GA4.
3. Verify the domain in Google Search Console and submit `https://www.utkarshorgfarm.in/sitemap.xml`. Inspect the homepage and a product URL, and validate a product with Google's Rich Results Test.
4. Measure mobile Core Web Vitals after deployment. Large existing images and the background video still warrant compression/format optimization; no performance score or ranking is guaranteed.

## Checks and references

Run `npm run test:seo` for canonical URLs, indexing rules, structured data, escaping and generated-file checks. TypeScript, frontend/admin builds and HTTP/browser integration should also pass before release.

- [Google: single-page application measurement](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)
- [Google: Content Security Policy](https://developers.google.com/tag-platform/security/guides/csp)
- [Google: sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
