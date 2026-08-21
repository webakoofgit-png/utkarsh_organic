import fs from "fs";
import path from "path";
import multer from "multer";
import { env } from "../config/env.js";
import { AppError } from "../utils/errors.js";

const uploadRoot = path.resolve(process.cwd(), env.uploadDir);
fs.mkdirSync(uploadRoot, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadRoot),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    cb(null, `${Date.now()}-${safeBase || "upload"}${ext}`);
  },
});

const allowedMime = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];

export const upload = multer({
  storage,
  limits: { fileSize: env.maxUploadMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedMime.includes(file.mimetype) || !allowedExt.includes(ext)) {
      cb(new AppError("Only image uploads are allowed", 422));
      return;
    }
    cb(null, true);
  },
});

export function publicUploadUrl(req, filename) {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
}
