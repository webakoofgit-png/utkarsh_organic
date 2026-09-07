import { spawnSync } from "child_process";

const shouldRun = process.env.NODE_ENV === "production" && process.env.SKIP_DB_SETUP !== "true";

if (!shouldRun) {
  console.log("Skipping production database setup.");
  process.exit(0);
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const commands = [
  ["--prefix", "backend", "run", "migrate"],
  ["--prefix", "backend", "run", "seed"],
];

for (const args of commands) {
  const result = spawnSync(npmCommand, args, {
    env: process.env,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}
