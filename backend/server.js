import path from "path";
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

assertEnv();

const app = express();
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
app.use("/uploads", express.static(path.resolve(process.cwd(), env.uploadDir)));

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

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Utkarsh Organic backend running on http://localhost:${env.port}`);
});
