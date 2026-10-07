import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
const root = process.cwd();
const require = createRequire(
  path.join(root, "artifacts/api-server/package.json"),
);
const { build } = require("esbuild");
await mkdir("verification/.tmp", { recursive: true });
const env = {
  ...process.env,
  NODE_ENV: "test",
  R2_ENDPOINT: "https://storage.test.invalid",
  R2_BUCKET: "isolated-test",
  R2_ACCESS_KEY_ID: "test-only",
  R2_SECRET_ACCESS_KEY: "test-only",
  DATABASE_URL: "postgresql://unused:unused@127.0.0.1:1/unused",
  SESSION_SECRET: "isolated-test-session-secret",
  AI_INTEGRATIONS_OPENAI_API_KEY: "test-only",
  AI_INTEGRATIONS_OPENAI_BASE_URL: "http://127.0.0.1:1",
  AI_INTEGRATIONS_GEMINI_API_KEY: "test-only",
  AI_INTEGRATIONS_GEMINI_BASE_URL: "http://127.0.0.1:1",
};
const sql = execFileSync(
  "pnpm",
  ["exec", "drizzle-kit", "export", "--config=drizzle.config.ts"],
  { cwd: path.join(root, "lib/db"), env, encoding: "utf8" },
);
await writeFile("verification/.tmp/schema.sql", sql);
await build({
  entryPoints: ["verification/api.test.ts"],
  outfile: "verification/.tmp/api-test.cjs",
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node22",
  external: ["@electric-sql/pglite"],
  plugins: [
    {
      name: "isolated-database",
      setup(build) {
        build.onResolve({ filter: /^@workspace\/db$/ }, () => ({
          path: path.join(root, "verification/test-db.ts"),
        }));
      },
    },
  ],
});
execFileSync(process.execPath, ["verification/.tmp/api-test.cjs"], {
  cwd: root,
  env,
  stdio: "inherit",
});
