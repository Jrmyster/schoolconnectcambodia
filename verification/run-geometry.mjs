import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import path from "node:path";
const require = createRequire(
  path.resolve("artifacts/api-server/package.json"),
);
await require("esbuild").build({
  entryPoints: ["verification/geometry.test.ts"],
  outfile: "verification/.tmp/geometry.cjs",
  bundle: true,
  platform: "node",
  format: "cjs",
  jsx: "automatic",
  define: { "import.meta.env.BASE_URL": '"/"' },
  alias: { "@": path.resolve("artifacts/chuy-sala/src") },
});
execFileSync(process.execPath, ["verification/.tmp/geometry.cjs"], {
  stdio: "inherit",
});
