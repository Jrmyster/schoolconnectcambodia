import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const directory = "dist/public",
  raw = await readFile(`${directory}/.vite/manifest.json`, "utf8"),
  manifest = JSON.parse(raw),
  assets = new Set(),
  visited = new Set();
function collect(key) {
  if (visited.has(key)) return;
  visited.add(key);
  const entry = manifest[key];
  if (!entry) return;
  assets.add(entry.file);
  for (const file of [...(entry.css || []), ...(entry.assets || [])])
    assets.add(file);
  for (const imported of entry.imports || []) collect(imported);
}
for (const [key, entry] of Object.entries(manifest))
  if (
    entry.isEntry ||
    /\/pages\/(Home|EnglishWritingPage|FinLitIntroPage|ExamPrepPage|WorldHistoryPage)\.tsx$/.test(
      key,
    )
  )
    collect(key);
assets.add("textures/earth-blue-marble.jpg");
for (const weight of [400,500,600,700]) assets.add(`fonts/kantumruy-pro-${weight}.woff`);
let sw = await readFile(`${directory}/sw.js`, "utf8");
sw =
  `const BUILD_ASSETS=${JSON.stringify([...assets])};\n` +
  sw
    .replace(
      "const PRECACHE_URLS = [",
      "const PRECACHE_URLS = [...BUILD_ASSETS,",
    )
    .replace(
      'const VERSION = "v5"',
      `const VERSION = "v5-${createHash("sha256").update(raw).update(sw).digest("hex").slice(0, 12)}"`,
    );
await writeFile(`${directory}/sw.js`, sw);
console.log(
  `Prepared ${assets.size} offline shell and beginner-module assets.`,
);
