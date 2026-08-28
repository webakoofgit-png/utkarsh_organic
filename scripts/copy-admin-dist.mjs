import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "admin", "dist");
const target = path.join(root, "dist", "admin", "panel");

if (!fs.existsSync(source)) {
  throw new Error("Admin build output not found. Run npm run admin:build first.");
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.cpSync(source, target, { recursive: true });

console.log(`Copied admin build to ${path.relative(root, target)}`);
