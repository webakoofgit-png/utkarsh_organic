import path from "path";
import fs from "fs";
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

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
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
  app.use(express.static(frontendDist));
  app.get(/^\/(?!api|uploads|admin)(?:.*)?$/, (_req, res) => res.sendFile(frontendIndex));
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Utkarsh Organic backend running on http://localhost:${env.port}`);
});
