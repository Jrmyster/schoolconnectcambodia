/**
 * learning-progress.ts
 *
 * Lightweight client-side tracker for the Student Dashboard.
 *
 * Stores two things in localStorage:
 *
 *   1. The last meaningful module the student visited (for the
 *      "Quick Resume" button on the dashboard).
 *
 *   2. A set of *unique* curriculum-page paths visited per category,
 *      from which we compute a completion percentage for each
 *      curriculum hub on the dashboard.
 *
 * Why client-side and not the server?
 *   - The user only asked for a personal dashboard, not for a graded
 *     LMS. Server-side progress tracking would require schema +
 *     migration + endpoints; that is out of scope. Client-side is
 *     the right grain for "did I look at this page yet?".
 */

export type CategoryKey = "science" | "technology" | "math" | "english";

export interface CategoryMeta {
  key: CategoryKey;
  labelEn: string;
  labelKh: string;
  /** Number of unique pages that = 100% completion. */
  target: number;
  /** Tailwind gradient classes for the progress bar fill. */
  gradient: string;
  /** Tailwind text color for the percent number. */
  accent: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    key: "science",
    labelEn: "Science & Nature",
    labelKh: "វិទ្យាសាស្ត្រ និងធម្មជាតិ",
    target: 18,
    gradient: "from-emerald-400 to-emerald-600",
    accent: "text-emerald-700",
  },
  {
    key: "technology",
    labelEn: "Technology & Engineering",
    labelKh: "បច្ចេកវិទ្យា និងវិស្វកម្ម",
    target: 14,
    gradient: "from-sky-400 to-sky-600",
    accent: "text-sky-700",
  },
  {
    key: "math",
    labelEn: "Mathematics & Logic",
    labelKh: "គណិតវិទ្យា និងតក្កវិទ្យា",
    target: 8,
    gradient: "from-indigo-400 to-indigo-600",
    accent: "text-indigo-700",
  },
  {
    key: "english",
    labelEn: "English & Communication",
    labelKh: "ភាសាអង់គ្លេស និងការទំនាក់ទំនង",
    target: 8,
    gradient: "from-teal-400 to-teal-600",
    accent: "text-teal-700",
  },
];

interface CategoryRule {
  key: CategoryKey;
  prefixes: string[];
}

/**
 * Maps URL prefixes onto categories. Order matters: the first matching
 * rule wins, so put more specific prefixes ahead of broader ones.
 */
const CATEGORY_RULES: CategoryRule[] = [
  {
    key: "math",
    prefixes: ["/mathematics", "/quantum-limit", "/music-theory"],
  },
  {
    key: "english",
    prefixes: [
      "/english-writing",
      "/exam-prep",
      "/spelling-forge",
      "/reading-list",
      "/study-center/languages",
      "/study-center/linguistics",
      "/philosophy/language",
    ],
  },
  {
    key: "technology",
    prefixes: [
      "/technology",
      "/robotics",
      "/aviation",
      "/hvac",
      "/magnets",
      "/electrical-safety",
      "/video-games",
      "/cinematography",
      "/physics/bicycle",
      "/science/electromagnetism",
    ],
  },
  {
    key: "science",
    prefixes: [
      "/science",
      "/biology",
      "/geology",
      "/oceanography",
      "/weather",
      "/space",
      "/sanctuary",
      "/cambodia",
      "/fossil-fuels",
      "/study-center/wildlife-explorer",
      "/study-center/dinosaur-extinction",
      "/study-center/africa",
      "/study-center/europe",
      "/study-center/united-states",
      "/study-center/global-conflicts",
      "/study-center/competition-cooperation",
      "/study-center/authority-conformity",
      "/study-center/behaviorism",
      "/world-history",
      "/study-center/history",
      "/pathway-to-medicine",
      "/human-engine",
      "/well-being",
      "/global-cities",
      "/sexual-health",
    ],
  },
];

/**
 * Paths the dashboard considers "not a learning module". We never
 * record these as the last-visited module and we never count them
 * toward progress.
 */
const EXCLUDED_PREFIXES = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/dashboard",
  "/profile",
  "/admin",
  "/school-inbox",
  "/submit-need",
  "/submit-story",
  "/charities",
  "/needs",
  "/projects",
  "/impact",
  "/map",
  "/api",
];

const LAST_KEY = "chuy-sala:last-module:v1";
const VISITS_KEY = "chuy-sala:visited-pages:v1";

export interface LastModule {
  path: string;
  titleEn: string;
  titleKh: string;
  visitedAt: number;
}

interface VisitsByCategory {
  science: string[];
  technology: string[];
  math: string[];
  english: string[];
}

function emptyVisits(): VisitsByCategory {
  return { science: [], technology: [], math: [], english: [] };
}

export function categoryFor(path: string): CategoryKey | null {
  for (const rule of CATEGORY_RULES) {
    if (rule.prefixes.some((p) => path === p || path.startsWith(p + "/") || path.startsWith(p + "?") || path === p)) {
      return rule.key;
    }
  }
  return null;
}

export function isExcluded(path: string): boolean {
  if (path === "/" ) return true;
  return EXCLUDED_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}

function readVisits(): VisitsByCategory {
  if (typeof window === "undefined") return emptyVisits();
  try {
    const raw = window.localStorage.getItem(VISITS_KEY);
    if (!raw) return emptyVisits();
    const parsed = JSON.parse(raw) as Partial<VisitsByCategory>;
    return {
      science: Array.isArray(parsed.science) ? parsed.science : [],
      technology: Array.isArray(parsed.technology) ? parsed.technology : [],
      math: Array.isArray(parsed.math) ? parsed.math : [],
      english: Array.isArray(parsed.english) ? parsed.english : [],
    };
  } catch {
    return emptyVisits();
  }
}

function writeVisits(v: VisitsByCategory) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(VISITS_KEY, JSON.stringify(v));
  } catch {
    /* localStorage unavailable — silently ignore */
  }
}

export function recordVisit(path: string, titleEn: string, titleKh: string) {
  if (typeof window === "undefined") return;
  if (isExcluded(path)) return;

  // 1. Save as the last module so Quick Resume can find it.
  const last: LastModule = {
    path,
    titleEn: titleEn || path,
    titleKh: titleKh || titleEn || path,
    visitedAt: Date.now(),
  };
  try {
    window.localStorage.setItem(LAST_KEY, JSON.stringify(last));
  } catch {
    /* ignore */
  }

  // 2. If it falls in a known curriculum hub, add it (uniquely) to
  //    the visited set for that category so progress can advance.
  const cat = categoryFor(path);
  if (!cat) return;
  const visits = readVisits();
  if (!visits[cat].includes(path)) {
    visits[cat] = [...visits[cat], path].slice(-100);
    writeVisits(visits);
    // Tell the dashboard (if mounted) to recompute live.
    window.dispatchEvent(new CustomEvent("chuy-sala:progress-updated"));
  }
}

export function getLastModule(): LastModule | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LastModule;
  } catch {
    return null;
  }
}

export function getProgress(): Record<CategoryKey, number> {
  const visits = readVisits();
  const out: Record<CategoryKey, number> = {
    science: 0,
    technology: 0,
    math: 0,
    english: 0,
  };
  for (const meta of CATEGORIES) {
    const count = visits[meta.key].length;
    out[meta.key] = Math.min(100, Math.round((count / meta.target) * 100));
  }
  return out;
}
