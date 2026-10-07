// Additive migrations only. DATABASE_URL is read from the host's secret environment.
import { createRequire } from "node:module";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
const require = createRequire(new URL("../lib/db/package.json", import.meta.url));
const { Client } = require("pg");
if (!process.env.DATABASE_URL || !process.env.EXPECTED_DATABASE_NAME) throw new Error("Set DATABASE_URL and EXPECTED_DATABASE_NAME for the isolated target database.");
const client = new Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 10000 });
try {
  await client.connect();
  const { rows: [identity] } = await client.query("SELECT current_database() AS name");
  if (identity.name !== process.env.EXPECTED_DATABASE_NAME) throw new Error("Target database name does not match EXPECTED_DATABASE_NAME.");
  await client.query("BEGIN");
  await client.query("SELECT pg_advisory_xact_lock(73422101)");
  if (process.argv.includes("--init-empty")) {
    const tables = await client.query("SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE' LIMIT 1");
    if (tables.rowCount) throw new Error("--init-empty requires an empty public schema. Restore existing records before running normal migrations.");
    await client.query(await readFile(new URL("./schema.sql", import.meta.url), "utf8"));
  }
  await client.query("CREATE TABLE IF NOT EXISTS deployment_migrations (name text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())");
  for (const name of (await readdir(new URL("./migrations/", import.meta.url))).filter(n => n.endsWith(".sql")).sort()) {
    const sql = await readFile(new URL("./migrations/" + name, import.meta.url), "utf8");
    const checksum = createHash("sha256").update(sql).digest("hex");
    const existing = await client.query("SELECT checksum FROM deployment_migrations WHERE name=$1", [name]);
    if (existing.rowCount) {
      if (existing.rows[0].checksum !== checksum) throw new Error("Applied migration changed: " + name);
      continue;
    }
    await client.query(sql);
    await client.query("INSERT INTO deployment_migrations (name,checksum) VALUES ($1,$2)", [name,checksum]);
    console.log("Applied", name);
  }
  await client.query("COMMIT");
  console.log("Database migrations and connectivity check passed.");
} catch (error) {
  await client.query("ROLLBACK").catch(() => {});
  // Avoid logging connection strings or server details.
  console.error("Migration failed:", error.code || error.message?.replace(/postgres(?:ql)?:\/\/\S+/g, "[redacted]"));
  process.exitCode = 1;
} finally { await client.end(); }
