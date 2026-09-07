import path from "path";
import { fileURLToPath } from "url";
import { env } from "../config/env.js";

export const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const projectRoot = path.resolve(backendRoot, "..");
export const uploadRoot = path.isAbsolute(env.uploadDir)
  ? env.uploadDir
  : path.resolve(backendRoot, env.uploadDir);
