import path from "path";
import fs from "fs";
import { randomBytes } from "node:crypto";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { assertEnv, env } from "./config/env.js";
import { sequelize } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import storeRoutes from "./routes/store.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { projectRoot, uploadRoot } from "./utils/paths.js";
import { getSitemap, renderRobots, serveStorePage } from "./services/seoService.js";
import { asyncHandler } from "./utils/asyncHandler.js";

assertEnv();

const app = express();
const frontendDist = path.join(projectRoot, "dist");
const adminDist = path.join(frontendDist, "admin");
const frontendIndex = path.join(frontendDist, "index.html");
const adminIndex = path.join(adminDist, "index.html");
const sourceAssetsDir = path.join(projectRoot, "src", "assets");
const origins = [
  env.clientOrigin,
  env.adminOrigin,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5175",
  "http://127.0.0.1:5175",
  "http://localhost:5176",
  "http://127.0.0.1:5176",
].filter(Boolean);

app.use((_req, res, next) => {
  res.locals.cspNonce = randomBytes(18).toString("base64");
  next();
});
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      scriptSrc: ["'self'", (_req, res) => `'nonce-${res.locals.cspNonce}'`, "https://www.googletagmanager.com", "https://checkout.razorpay.com"],
      connectSrc: ["'self'", "https://*.google-analytics.com", "https://*.analytics.google.com", "https://www.googletagmanager.com", "https://*.razorpay.com"],
      imgSrc: ["'self'", "data:", "https:"],
      frameSrc: ["'self'", "https://*.razorpay.com"],
      ...(env.nodeEnv === "development" ? { upgradeInsecureRequests: null } : {}),
    },
  },
}));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || origins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));
app.get("/robots.txt", (_req, res) => res.type("text/plain").send(renderRobots()));
app.get("/sitemap.xml", asyncHandler(async (_req, res) => {
  res.set("Cache-Control", "public, max-age=300").type("application/xml").send(await getSitemap());
}));
app.get(["/shop", "/shop/"], (_req, res) => res.redirect(301, "/products"));
app.get("/index.html", (_req, res) => res.redirect(301, "/"));
app.use("/admin", (_req, res, next) => {
  res.set("X-Robots-Tag", "noindex, nofollow");
  next();
});
app.use("/uploads", express.static(uploadRoot));
if (fs.existsSync(sourceAssetsDir)) {
  app.use("/src/assets", express.static(sourceAssetsDir));
}

app.use(
  "/api/auth",
  rateLimit({ windowMs: 15 * 60 * 1000, max: 60, standardHeaders: true, legacyHeaders: false }),
  authRoutes
);
app.use("/api/admin", adminRoutes);
app.use("/api/store", storeRoutes);

app.get("/api/health", async (_req, res) => {
  await sequelize.authenticate();
  res.json({ success: true, message: "Utkarsh Organic backend is healthy" });
});

if (fs.existsSync(adminIndex)) {
  app.get(/^\/admin\/panel(?:\/(.*))?$/, (req, res) => {
    const tail = req.params[0] ? `/${req.params[0]}` : "/";
    res.redirect(301, `/admin${tail}`);
  });
  app.use("/admin", express.static(adminDist));
  app.get(/^\/admin(?:\/.*)?$/, (_req, res) => res.sendFile(adminIndex));
}

if (fs.existsSync(frontendIndex)) {
  app.use(express.static(frontendDist, { index: false }));
  app.get(/^\/(?!api(?:\/|$)|uploads(?:\/|$)|admin(?:\/|$))(?:.*)?$/, asyncHandler(async (req, res) => {
    try {
      return await serveStorePage(req, res, frontendIndex);
    } catch (error) {
      console.error("Could not load page metadata:", error.message);
      return res.status(503).set("Retry-After", "60").type("text/plain").send("This page is temporarily unavailable. Please try again shortly.");
    }
  }));
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Utkarsh Organic backend running on http://localhost:${env.port}`);
});
