/**
 * Auto-discovered global-search entries.
 *
 * ── How to add a new entry ─────────────────────────────────────────────
 * Create a file *next to your page or component* named `<PageName>.search.ts`
 * (the suffix `.search.ts` is what the discovery glob matches on).
 *
 * Example — `src/pages/MyCoolPage.search.ts`:
 *
 *   import { Sparkles } from "lucide-react";
 *   import type { SearchEntry } from "@/data/searchTypes";
 *
 *   export const searchMeta: SearchEntry = {
 *     id: "my-cool-page",
 *     href: "/my-cool-page",
 *     icon: Sparkles,
 *     titleEn: "My Cool Page",
 *     titleKh: "ទំព័រដ៏ពេញនិយមរបស់ខ្ញុំ",
 *     categoryEn: "Study Center",
 *     categoryKh: "មជ្ឈមណ្ឌលសិក្សា",
 *     descEn: "What this page is about, in one sentence.",
 *     descKh: "អ្វីដែលទំព័រនេះនិយាយអំពី ក្នុងមួយប្រយោគ។",
 *     keywordsEn: ["cool", "alternate", "phrasings"],
 *     keywordsKh: ["ដ៏ពេញនិយម", "ពាក្យសំខាន់ផ្សេងៗ"],
 *   };
 *
 * That's it — the entry appears in the global search on the next dev
 * reload (and in the next production build) with zero edits to any
 * central file.
 *
 * ── How it works ────────────────────────────────────────────────────────
 * Vite's `import.meta.glob` is statically analysed at build time. With
 * `eager: true, import: "searchMeta"` it generates direct imports of
 * just the named export from each matching file, so:
 *   • lazy-loaded page components are *not* eagerly evaluated
 *     (the `*.search.ts` files are tiny side-effect-free siblings)
 *   • HMR works for free in dev
 *   • no codegen step, no AST parsing, no extra dependency
 */
import type { SearchEntry } from "./searchTypes";

const modules = import.meta.glob<SearchEntry>(
  "/src/**/*.search.ts",
  { eager: true, import: "searchMeta" },
);

export const AUTO_SEARCH_ENTRIES: SearchEntry[] = Object.values(modules);
