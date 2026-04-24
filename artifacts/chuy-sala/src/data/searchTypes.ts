import type { ComponentType } from "react";

/**
 * Shape of a single global-search entry.
 *
 * Used by both the manually-curated master index (`searchIndex.ts`)
 * and any auto-discovered co-located metadata file (`*.search.ts`).
 */
export type SearchEntry = {
  id: string;
  /** Route path. May optionally include a `#hash` for in-page anchors. */
  href: string;
  icon: ComponentType<{ className?: string }>;
  titleEn: string;
  titleKh: string;
  categoryEn: string;
  categoryKh: string;
  descEn: string;
  descKh: string;
  /** English synonyms / alternate phrasings */
  keywordsEn: string[];
  /** Khmer synonyms */
  keywordsKh: string[];
  /** "page" for top-level pages, "module" for in-page sections (deep links). */
  type?: "page" | "module";
};
