import { useMemo, useState } from "react";
import {
  FlaskConical,
  Search,
  Beaker,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Info,
  X,
  Zap,
  Hourglass,
  TestTube,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import {
  REACTIONS,
  REACTION_CATEGORIES,
  reactionSearchBlob,
  type Reaction,
  type ReactionCategory,
} from "@/data/organicReactionsData";

/* ══════════════════════════════════════════════════════════════════════════
 * Synthesis Engine — main module
 * "ម៉ាស៊ីនសំយោគ៖ ផ្លូវប្រតិកម្មសរីរាង្គ"
 *
 * Clinical chemistry aesthetic: crisp white panels, slate borders, molecular
 * blues. Five sub-pieces:
 *
 *   1. Laboratory Console — synthesis predictor (start + reagent → product).
 *   2. Category tabs (All / Aromatics / Enolates / Alkenes / Carbonyls).
 *   3. Universal search bar (cross-category when active).
 *   4. Filtered list of reaction cards.
 *   5. Per-category Special-Rule Callouts (directing groups, Markovnikov,
 *      kinetic vs thermodynamic).
 * ══════════════════════════════════════════════════════════════════════════ */

type TabId = "all" | ReactionCategory;

const ACCENT: Record<
  string,
  { chip: string; chipActive: string; ring: string; dot: string; soft: string }
> = {
  indigo:  { chip: "border-indigo-300 text-indigo-700",   chipActive: "bg-indigo-600 text-white border-indigo-700",   ring: "ring-indigo-200",   dot: "bg-indigo-500",   soft: "bg-indigo-50/60" },
  amber:   { chip: "border-amber-300 text-amber-800",     chipActive: "bg-amber-500 text-white border-amber-600",     ring: "ring-amber-200",    dot: "bg-amber-500",    soft: "bg-amber-50/70"  },
  emerald: { chip: "border-emerald-300 text-emerald-700", chipActive: "bg-emerald-600 text-white border-emerald-700", ring: "ring-emerald-200",  dot: "bg-emerald-500",  soft: "bg-emerald-50/70"},
  sky:     { chip: "border-sky-300 text-sky-700",         chipActive: "bg-sky-600 text-white border-sky-700",         ring: "ring-sky-200",      dot: "bg-sky-500",      soft: "bg-sky-50/70"    },
  slate:   { chip: "border-slate-300 text-slate-700",     chipActive: "bg-slate-700 text-white border-slate-800",     ring: "ring-slate-200",    dot: "bg-slate-500",    soft: "bg-slate-50"     },
};

function accentForCategory(cat: ReactionCategory) {
  const c = REACTION_CATEGORIES.find((x) => x.id === cat);
  return ACCENT[c?.accent ?? "slate"];
}

export function SynthesisEngineModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [tab, setTab] = useState<TabId>("all");
  const [query, setQuery] = useState("");

  // Pre-compute search blobs once per render.
  const blobs = useMemo(
    () => REACTIONS.map((r) => ({ r, blob: reactionSearchBlob(r) })),
    [],
  );

  // Normalize query the same way reactionSearchBlob normalizes the data,
  // so a search for "H2O" matches "H₂O" and "O+" matches "O⁺".
  const QUERY_MAP: Record<string, string> = {
    "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
    "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
    "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
    "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
    "⁺": "+", "⁻": "-", "·": " ", "→": " ", "Δ": " ",
  };
  const normalizedQuery = query
    .replace(/[₀-₉⁰-⁹⁺⁻·→Δ]/g, (c) => QUERY_MAP[c] ?? c)
    .toLowerCase()
    .trim();

  // Filter logic: search overrides category filter (cross-category).
  const filtered: Reaction[] = useMemo(() => {
    if (normalizedQuery) {
      return blobs
        .filter(({ blob }) =>
          normalizedQuery
            .split(/\s+/)
            .every((token) => blob.includes(token)),
        )
        .map(({ r }) => r);
    }
    if (tab === "all") return REACTIONS;
    return REACTIONS.filter((r) => r.category === tab);
  }, [tab, normalizedQuery, blobs]);

  return (
    <section
      data-testid="synthesis-engine"
      className="rounded-3xl border-4 border-sky-200 bg-white/90 backdrop-blur shadow-md p-5 sm:p-8 mb-8"
      aria-labelledby="synthesis-engine-heading"
    >
      {/* ── Section header ──────────────────────────────────────── */}
      <div className="mb-6">
        <div
          className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-sky-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
        >
          <FlaskConical className="w-3.5 h-3.5" aria-hidden />
          {t("Section 6 · Reference Engine", "ផ្នែកទី ៦ · ម៉ាស៊ីនយោង")}
        </div>
        <h2
          id="synthesis-engine-heading"
          className={`font-display text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 ${kh ? "font-khmer leading-snug" : ""}`}
        >
          <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
            {t("The Synthesis Engine", "ម៉ាស៊ីនសំយោគ")}
          </span>
        </h2>
        <p
          className={`text-sm sm:text-base text-slate-700 max-w-3xl ${kh ? "font-khmer text-base sm:text-lg leading-loose" : ""}`}
        >
          {t(
            "Organic Reaction Pathways — a searchable directory of reactions across four categories. Pick a starting material and a reagent in the Laboratory Console to predict a product, browse all reactions by category, or search by anything (a reagent, a product, or a mechanism name).",
            "ផ្លូវប្រតិកម្មសរីរាង្គ — បញ្ជីប្រតិកម្មអាចស្វែងរកបាន ឆ្លងកាត់ ៤ ប្រភេទ។ ជ្រើសសារធាតុចាប់ផ្តើម និងសារធាតុដំណើរការក្នុងកុងសូលមន្ទីរពិសោធ ដើម្បីព្យាករផលិតផល មើលប្រតិកម្មទាំងអស់តាមប្រភេទ ឬស្វែងរកតាមអ្វីក៏បាន (សារធាតុដំណើរការ ផលិតផល ឬឈ្មោះយន្តការ)។",
          )}
        </p>
      </div>

      {/* ── 1. Laboratory Console (synthesis predictor) ─────────── */}
      <LaboratoryConsole kh={kh} t={t} />

      {/* ── 2. Category tabs ────────────────────────────────────── */}
      <div
        className="mt-8 mb-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label={t("Reaction categories", "ប្រភេទប្រតិកម្ម")}
      >
        {(["all", ...REACTION_CATEGORIES.map((c) => c.id)] as TabId[]).map(
          (id) => {
            const meta =
              id === "all"
                ? {
                    labelEn: "All",
                    labelKh: "ទាំងអស់",
                    accent: "slate" as const,
                  }
                : REACTION_CATEGORIES.find((c) => c.id === id)!;
            const acc = ACCENT[meta.accent];
            const active = tab === id;
            const count =
              id === "all"
                ? REACTIONS.length
                : REACTIONS.filter((r) => r.category === id).length;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                data-testid={`syn-tab-${id}`}
                onClick={() => setTab(id)}
                className={`px-3 sm:px-4 py-2 rounded-xl border-2 text-sm sm:text-base font-bold transition active:scale-95 ${
                  active
                    ? `${acc.chipActive} shadow-md`
                    : `bg-white ${acc.chip} hover:shadow`
                }`}
              >
                <span className={kh ? "font-khmer" : ""}>
                  {kh ? meta.labelKh : meta.labelEn}
                </span>
                <span
                  className={`ml-2 inline-block min-w-[1.5em] text-center text-[10px] font-mono px-1.5 py-0.5 rounded-full ${active ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  {count}
                </span>
              </button>
            );
          },
        )}
      </div>

      {/* ── 3. Universal search bar ─────────────────────────────── */}
      <div className="relative mb-4">
        <label htmlFor="syn-search" className="sr-only">
          {t("Search reactions", "ស្វែងរកប្រតិកម្ម")}
        </label>
        <div className="relative flex items-center">
          <Search
            className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none"
            aria-hidden
          />
          <input
            id="syn-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-testid="syn-search-input"
            placeholder={t(
              "Search any reagent, product, or mechanism — e.g. KMnO4, BH3, Sandmeyer…",
              "ស្វែងរកសារធាតុដំណើរការ ផលិតផល ឬយន្តការ — ឧ. KMnO4, BH3, Sandmeyer…",
            )}
            className={`w-full pl-9 pr-9 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 ${kh ? "font-khmer text-base" : "text-sm sm:text-base"}`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              data-testid="syn-search-clear"
              aria-label={t("Clear search", "សម្អាតការស្វែងរក")}
              className="absolute right-2 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" aria-hidden />
            </button>
          )}
        </div>
        <div
          className={`mt-1.5 text-xs text-slate-500 ${kh ? "font-khmer text-sm" : ""}`}
        >
          {normalizedQuery ? (
            <span data-testid="syn-search-status">
              {t(
                `${filtered.length} match${filtered.length === 1 ? "" : "es"} across all categories`,
                `ផ្គូផ្គង ${filtered.length} ឆ្លងកាត់ប្រភេទទាំងអស់`,
              )}
            </span>
          ) : (
            <span>
              {t(
                "Tip: search ignores subscripts/superscripts — KMnO4 finds KMnO₄.",
                "ព័ត៌មានជំនួយ៖ ការស្វែងរកមិនមើល subscript/superscript — KMnO4 រកឃើញ KMnO₄។",
              )}
            </span>
          )}
        </div>
      </div>

      {/* ── 4. Per-category special-rule callouts ───────────────── */}
      {!normalizedQuery && tab !== "all" && (
        <RuleCallouts category={tab} kh={kh} t={t} />
      )}

      {/* ── 5. Reaction list ────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-4" data-testid="syn-reaction-list">
        {filtered.length === 0 ? (
          <div className="sm:col-span-2 rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center text-slate-500">
            <Search
              className="w-6 h-6 mx-auto mb-2 text-slate-400"
              aria-hidden
            />
            <p className={kh ? "font-khmer text-base" : "text-sm sm:text-base"}>
              {t(
                "No reactions match — try a shorter or different query.",
                "គ្មានប្រតិកម្មផ្គូផ្គងទេ — សូមសាកល្បងពាក្យខ្លី ឬផ្សេង។",
              )}
            </p>
          </div>
        ) : (
          filtered.map((r) => <ReactionCard key={r.id} r={r} kh={kh} t={t} />)
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Sub-component: Reaction card  ([Start] + [Reagent] → [Product])
 * ══════════════════════════════════════════════════════════════════════════ */

function ReactionCard({
  r,
  kh,
  t,
}: {
  r: Reaction;
  kh: boolean;
  t: (en: string, khh: string) => string;
}) {
  const acc = accentForCategory(r.category);
  const cat = REACTION_CATEGORIES.find((c) => c.id === r.category)!;
  return (
    <article
      data-testid={`syn-reaction-${r.id}`}
      className="rounded-2xl border-2 border-slate-200 bg-white hover:shadow-md hover:border-sky-300 transition shadow-sm overflow-hidden"
    >
      {/* Top stripe with category */}
      <div
        className={`flex items-center justify-between px-4 py-2 border-b border-slate-200 ${acc.soft}`}
      >
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
          <span className={`w-2 h-2 rounded-full ${acc.dot}`} aria-hidden />
          <span
            className={`text-slate-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
          >
            {kh ? cat.labelKh : cat.labelEn}
          </span>
        </div>
        <span
          className={`text-[10px] font-bold text-slate-600 ${kh ? "font-khmer text-xs" : "uppercase tracking-wider"}`}
        >
          {kh ? r.reactionTypeKh : r.reactionType}
        </span>
      </div>

      {/* Equation row: Start  +  Reagent  →  Product */}
      <div className="px-4 py-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-display">
          <span
            className={`font-extrabold text-slate-900 ${kh ? "font-khmer text-base" : "text-base sm:text-lg"}`}
          >
            {kh ? r.startMoleculeKh : r.startMolecule}
          </span>
          <span className="text-slate-400 font-bold">+</span>
          <span
            className="font-mono text-sm sm:text-base px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-800"
            data-testid={`syn-reagent-${r.id}`}
          >
            {r.reagent}
          </span>
          <ArrowRight
            className="w-5 h-5 text-sky-600 flex-shrink-0"
            aria-hidden
          />
          <span
            className={`font-extrabold text-sky-700 ${kh ? "font-khmer text-base" : "text-base sm:text-lg"}`}
          >
            {kh ? r.endMoleculeKh : r.endMolecule}
          </span>
        </div>

        {/* Conditions row */}
        <div
          className={`mt-2 text-xs sm:text-sm text-slate-600 flex items-start gap-1.5 ${kh ? "font-khmer text-sm sm:text-base leading-loose" : ""}`}
        >
          <Beaker
            className="w-3.5 h-3.5 mt-0.5 text-slate-400 flex-shrink-0"
            aria-hidden
          />
          <span>
            <span className="font-semibold text-slate-700">
              {t("Conditions:", "លក្ខខណ្ឌ៖")}
            </span>{" "}
            {kh ? r.conditionsKh : r.conditions}
          </span>
        </div>

        {/* Notes */}
        <p
          className={`mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-l-2 border-sky-200 pl-3 ${kh ? "font-khmer text-sm sm:text-base leading-loose" : ""}`}
        >
          {kh ? r.notesKh : r.notes}
        </p>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Sub-component: Special-rule callouts (per category)
 * ══════════════════════════════════════════════════════════════════════════ */

function RuleCallouts({
  category,
  kh,
  t,
}: {
  category: ReactionCategory;
  kh: boolean;
  t: (en: string, khh: string) => string;
}) {
  if (category === "aromatic") {
    return (
      <div
        data-testid="syn-rule-aromatic"
        className="mb-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 p-5"
      >
        <div
          className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-indigo-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
        >
          <Info className="w-4 h-4" aria-hidden />
          {t(
            "Major Rule · Directing Effects on Benzene",
            "ច្បាប់សំខាន់ · ផលដឹកនាំលើបេនហ្សែន",
          )}
        </div>
        <h3
          className={`font-display text-lg sm:text-xl font-extrabold text-indigo-900 mb-3 ${kh ? "font-khmer" : ""}`}
        >
          {t(
            "Activating (ortho/para) vs. Deactivating (meta) Groups",
            "ក្រុមធ្វើឱ្យសកម្ម (ortho/para) ទល់នឹង ក្រុមបន្ថយសកម្មភាព (meta)",
          )}
        </h3>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border-2 border-emerald-300 bg-white p-4">
            <div
              className={`text-[10px] font-mono uppercase tracking-widest text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            >
              {t("Activating · Ortho/Para directors", "សកម្ម · ដឹកនាំ ortho/para")}
            </div>
            <p
              className={`text-sm text-slate-700 mb-2 ${kh ? "font-khmer text-base leading-loose" : ""}`}
            >
              {t(
                "Donate electrons into the ring (resonance or induction). Speed up the next EAS reaction and steer the new group to ortho or para positions.",
                "ផ្តល់អេឡិចត្រុងចូលទៅក្នុងរង្វង់ (រ៉េសូណង់ ឬ ការនាំចូល)។ ពន្លឿនប្រតិកម្ម EAS បន្ទាប់ និងដឹកនាំក្រុមថ្មីទៅទីតាំង ortho ឬ para។",
              )}
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {[
                { f: "–OH", note: "" },
                { f: "–OR", note: "" },
                { f: "–NH₂", note: "" },
                { f: "–NHR", note: "" },
                { f: "–NR₂", note: "" },
                {
                  f: "–CH₃",
                  note: t("(alkyl)", "(អាល់គីល)"),
                },
              ].map((g) => (
                <span
                  key={g.f}
                  className={`px-2 py-0.5 rounded bg-emerald-100 border border-emerald-200 text-emerald-800 ${kh && g.note ? "font-khmer" : ""}`}
                >
                  {g.f}
                  {g.note ? ` ${g.note}` : ""}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border-2 border-rose-300 bg-white p-4">
            <div
              className={`text-[10px] font-mono uppercase tracking-widest text-rose-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            >
              {t("Deactivating · Meta directors", "មិនសកម្ម · ដឹកនាំ meta")}
            </div>
            <p
              className={`text-sm text-slate-700 mb-2 ${kh ? "font-khmer text-base leading-loose" : ""}`}
            >
              {t(
                "Pull electrons out of the ring. Slow down the next EAS reaction and steer the new group to the meta position (across the ring).",
                "ទាញអេឡិចត្រុងចេញពីរង្វង់។ បន្ថយប្រតិកម្ម EAS បន្ទាប់ និងដឹកនាំក្រុមថ្មីទៅទីតាំង meta (ផ្ទុយរង្វង់)។",
              )}
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {["–NO₂", "–CN", "–COOH", "–COR", "–SO₃H", "–CF₃", "–N⁺R₃"].map(
                (g) => (
                  <span
                    key={g}
                    className="px-2 py-0.5 rounded bg-rose-100 border border-rose-200 text-rose-800"
                  >
                    {g}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
        <p
          className={`mt-3 text-xs text-slate-600 italic ${kh ? "font-khmer text-sm leading-loose" : ""}`}
        >
          {t(
            "Halogens (–F, –Cl, –Br, –I) are the exception: they deactivate the ring but still direct ortho/para.",
            "ហាឡូហ្សែន (–F, –Cl, –Br, –I) ជាករណីលើកលែង៖ ពួកវាបន្ថយភាពសកម្មនៃរង្វង់ ប៉ុន្តែនៅតែដឹកនាំ ortho/para។",
          )}
        </p>
      </div>
    );
  }

  if (category === "alkene") {
    return (
      <div
        data-testid="syn-rule-alkene"
        className="mb-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-5"
      >
        <div
          className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
        >
          <Info className="w-4 h-4" aria-hidden />
          {t(
            "Major Rule · Regioselectivity",
            "ច្បាប់សំខាន់ · ភាពលំអៀងតាមតំបន់",
          )}
        </div>
        <h3
          className={`font-display text-lg sm:text-xl font-extrabold text-emerald-900 mb-3 ${kh ? "font-khmer" : ""}`}
        >
          {t(
            "Markovnikov vs. Anti-Markovnikov",
            "ម៉ាកូវនីកូវ ទល់នឹង ប្រឆាំងម៉ាកូវនីកូវ",
          )}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border-2 border-emerald-300 bg-white p-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 mb-1">
              {t("Markovnikov", "ម៉ាកូវនីកូវ")}
            </div>
            <p
              className={`text-sm text-slate-700 ${kh ? "font-khmer text-base leading-loose" : ""}`}
            >
              {t(
                "OH (or X) lands on the more-substituted carbon. The proton (or H) takes the less-substituted carbon. Driven by carbocation stability — the most-stable carbocation forms, then is captured.",
                "OH (ឬ X) ធ្លាក់លើកាបូនមានជំនួសច្រើន។ ប្រូតុង (ឬ H) ទៅកាបូនមានជំនួសតិច។ បណ្តាលដោយស្ថិរភាពកាបូកាទីយ៉ុង — កាបូកាទីយ៉ុងស្ថិតស្ថេរបំផុតបង្កើត រួចត្រូវចាប់។",
              )}
            </p>
            <div className="mt-2 text-xs font-mono text-slate-700">
              {t("Reagents:", "សារធាតុដំណើរការ៖")} H₃O⁺, HX, H₂O/H⁺
            </div>
          </div>

          <div className="rounded-xl border-2 border-sky-300 bg-white p-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-sky-700 mb-1">
              {t("Anti-Markovnikov", "ប្រឆាំងម៉ាកូវនីកូវ")}
            </div>
            <p
              className={`text-sm text-slate-700 ${kh ? "font-khmer text-base leading-loose" : ""}`}
            >
              {t(
                "OH (or H) lands on the less-substituted carbon. Driven by sterics (hydroboration) or by radical stability (HBr + ROOR), not by carbocations.",
                "OH (ឬ H) ធ្លាក់លើកាបូនមានជំនួសតិច។ បណ្តាលដោយ sterics (hydroboration) ឬ ស្ថិរភាព radical (HBr + ROOR) មិនមែនដោយ carbocations ទេ។",
              )}
            </p>
            <div
              className={`mt-2 text-xs text-slate-700 ${kh ? "font-khmer text-sm leading-loose" : "font-mono"}`}
            >
              {t("Reagents:", "សារធាតុដំណើរការ៖")}{" "}
              <span className="font-mono">BH₃</span>{" "}
              <span className={kh ? "font-khmer" : ""}>{t("then", "បន្ទាប់មក")}</span>{" "}
              <span className="font-mono">H₂O₂/OH⁻</span>;{" "}
              <span className="font-mono">HBr + ROOR</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (category === "enolate") {
    return (
      <div
        data-testid="syn-rule-enolate"
        className="mb-5 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-5"
      >
        <div
          className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
        >
          <Info className="w-4 h-4" aria-hidden />
          {t("Major Rule · Enolate Selectivity", "ច្បាប់សំខាន់ · ការជ្រើសរើសអេណូឡាត")}
        </div>
        <h3
          className={`font-display text-lg sm:text-xl font-extrabold text-amber-900 mb-3 ${kh ? "font-khmer" : ""}`}
        >
          {t(
            "Kinetic vs. Thermodynamic Control",
            "ការគ្រប់គ្រងស៊ីណេទិច ទល់នឹង ធើម៉ូឌីណាមិច",
          )}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border-2 border-sky-300 bg-white p-4">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-sky-700 mb-1">
              <Zap className="w-3.5 h-3.5" aria-hidden />
              {t("Kinetic Enolate", "អេណូឡាតស៊ីណេទិច")}
            </div>
            <p
              className={`text-sm text-slate-700 ${kh ? "font-khmer text-base leading-loose" : ""}`}
            >
              {t(
                "Formed fastest. Bulky base (LDA) at very low temperature (–78 °C) grabs the most accessible α-H — on the less-substituted carbon. Trapped before equilibrium.",
                "បង្កើតលឿនបំផុត។ បាសធំ (LDA) នៅសីតុណ្ហភាពទាបបំផុត (–78 °C) ចាប់ α-H ដែលងាយប៉ះបំផុត — នៅលើកាបូនមានជំនួសតិច។ ចាប់ជាប់មុនសមតុល្យ។",
              )}
            </p>
            <div
              className={`mt-2 text-xs text-slate-700 ${kh ? "font-khmer text-sm leading-loose" : "font-mono"}`}
            >
              {t("Conditions:", "លក្ខខណ្ឌ៖")}{" "}
              <span className="font-mono">LDA / THF / –78 °C</span>
            </div>
          </div>

          <div className="rounded-xl border-2 border-rose-300 bg-white p-4">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-rose-700 mb-1">
              <Hourglass className="w-3.5 h-3.5" aria-hidden />
              {t("Thermodynamic Enolate", "អេណូឡាតធើម៉ូឌីណាមិច")}
            </div>
            <p
              className={`text-sm text-slate-700 ${kh ? "font-khmer text-base leading-loose" : ""}`}
            >
              {t(
                "Most stable. At room temperature equilibrium reaches the more-substituted (more-conjugated, more-stable) enolate — the one with the alkyl substituents giving hyperconjugative support.",
                "ស្ថិតស្ថេរបំផុត។ នៅសីតុណ្ហភាពបន្ទប់ សមតុល្យឈានដល់អេណូឡាតមានជំនួសច្រើន (ស្ថិតស្ថេរជាង) — ជាមួយក្រុម alkyl ផ្តល់ការគាំទ្រ hyperconjugation។",
              )}
            </p>
            <div className="mt-2 text-xs font-mono text-slate-700">
              {t("Conditions:", "លក្ខខណ្ឌ៖")} LDA / THF / room temp
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Carbonyl: no required callout per spec — return nothing.
  return null;
}

/* ══════════════════════════════════════════════════════════════════════════
 * Sub-component: Laboratory Console (interactive synthesis predictor)
 * ══════════════════════════════════════════════════════════════════════════ */

function LaboratoryConsole({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, khh: string) => string;
}) {
  // Build the unique starting-material list directly from the data.
  const startingMaterials = useMemo(() => {
    const seen = new Set<string>();
    const list: { en: string; kh: string }[] = [];
    for (const r of REACTIONS) {
      if (!seen.has(r.startMolecule)) {
        seen.add(r.startMolecule);
        list.push({ en: r.startMolecule, kh: r.startMoleculeKh });
      }
    }
    return list;
  }, []);

  const [start, setStart] = useState<string>("");
  const [reagent, setReagent] = useState<string>("");
  const [predicted, setPredicted] = useState<Reaction | null>(null);
  const [predictedQuery, setPredictedQuery] = useState<{
    start: string;
    reagent: string;
  } | null>(null);

  // Reagents available for the chosen starting material.
  const availableReagents = useMemo(() => {
    if (!start) return [];
    return REACTIONS.filter((r) => r.startMolecule === start).map(
      (r) => r.reagent,
    );
  }, [start]);

  function handleStartChange(v: string) {
    setStart(v);
    setReagent(""); // reset reagent when starting material changes
    setPredicted(null);
    setPredictedQuery(null);
  }

  function handleSynthesize() {
    if (!start || !reagent) return;
    const match = REACTIONS.find(
      (r) => r.startMolecule === start && r.reagent === reagent,
    );
    setPredicted(match ?? null);
    setPredictedQuery({ start, reagent });
  }

  return (
    <div
      data-testid="syn-lab-console"
      className="rounded-2xl border-2 border-sky-300 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5 sm:p-6 shadow-inner"
    >
      <div
        className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-sky-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
      >
        <TestTube className="w-4 h-4" aria-hidden />
        {t("Laboratory Console", "កុងសូលមន្ទីរពិសោធ")}
      </div>
      <h3
        className={`font-display text-xl sm:text-2xl font-extrabold text-slate-900 mb-1 ${kh ? "font-khmer" : ""}`}
      >
        {t("Predict a Synthesis", "ព្យាករសំយោគមួយ")}
      </h3>
      <p
        className={`text-xs sm:text-sm text-slate-600 mb-4 ${kh ? "font-khmer text-sm sm:text-base leading-loose" : ""}`}
      >
        {t(
          "Pick a starting material, then a reagent — the engine will tell you the product and what mechanism just ran.",
          "ជ្រើសសារធាតុចាប់ផ្តើម បន្ទាប់មកសារធាតុដំណើរការ — ម៉ាស៊ីននឹងប្រាប់ផលិតផល និងយន្តការដែលកំពុងដំណើរការ។",
        )}
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        {/* Dropdown A */}
        <div>
          <label
            htmlFor="syn-start"
            className={`block text-xs font-bold text-slate-700 mb-1 ${kh ? "font-khmer text-sm" : "uppercase tracking-wider"}`}
          >
            {t("A · Starting Material", "A · សារធាតុចាប់ផ្តើម")}
          </label>
          <select
            id="syn-start"
            value={start}
            onChange={(e) => handleStartChange(e.target.value)}
            data-testid="syn-select-start"
            className={`w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 ${kh ? "font-khmer text-base" : "text-sm sm:text-base"}`}
          >
            <option value="">
              {t("— Select starting material —", "— ជ្រើសសារធាតុចាប់ផ្តើម —")}
            </option>
            {startingMaterials.map((s) => (
              <option key={s.en} value={s.en}>
                {kh ? s.kh : s.en}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown B */}
        <div>
          <label
            htmlFor="syn-reagent"
            className={`block text-xs font-bold text-slate-700 mb-1 ${kh ? "font-khmer text-sm" : "uppercase tracking-wider"}`}
          >
            {t("B · Reagent", "B · សារធាតុដំណើរការ")}
          </label>
          <select
            id="syn-reagent"
            value={reagent}
            onChange={(e) => setReagent(e.target.value)}
            disabled={!start}
            data-testid="syn-select-reagent"
            className={`w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${kh ? "font-khmer text-base" : "text-sm sm:text-base"}`}
          >
            <option value="">
              {!start
                ? t("— Pick a starting material first —", "— ជ្រើសសារធាតុចាប់ផ្តើមមុនសិន —")
                : t("— Select reagent —", "— ជ្រើសសារធាតុដំណើរការ —")}
            </option>
            {availableReagents.map((rg) => (
              <option key={rg} value={rg}>
                {rg}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSynthesize}
        disabled={!start || !reagent}
        data-testid="syn-button-synthesize"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold shadow-md hover:from-sky-700 hover:to-indigo-700 active:scale-95 transition disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed disabled:shadow-none"
      >
        <Sparkles className="w-4 h-4" aria-hidden />
        <span className={kh ? "font-khmer text-base" : ""}>
          {t("Synthesize", "សំយោគ")}
        </span>
        <ChevronRight className="w-4 h-4" aria-hidden />
      </button>

      {/* Result card */}
      {predictedQuery && (
        <div
          data-testid="syn-result-card"
          className={`mt-4 rounded-2xl border-2 p-4 ${predicted ? "border-emerald-300 bg-emerald-50/80" : "border-rose-300 bg-rose-50/80"}`}
          role="status"
          aria-live="polite"
        >
          {predicted ? (
            <>
              <div
                className={`text-[10px] font-mono uppercase tracking-widest text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                {t("Predicted Product", "ផលិតផលដែលព្យាករ")}
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 font-display">
                <span
                  className={`font-extrabold text-slate-900 ${kh ? "font-khmer text-base" : "text-base sm:text-lg"}`}
                >
                  {kh ? predicted.startMoleculeKh : predicted.startMolecule}
                </span>
                <span className="text-slate-400 font-bold">+</span>
                <span className="font-mono text-sm sm:text-base px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800">
                  {predicted.reagent}
                </span>
                <ArrowRight
                  className="w-5 h-5 text-emerald-600 flex-shrink-0"
                  aria-hidden
                />
                <span
                  className={`font-extrabold text-emerald-700 ${kh ? "font-khmer text-base" : "text-base sm:text-lg"}`}
                  data-testid="syn-result-product"
                >
                  {kh ? predicted.endMoleculeKh : predicted.endMolecule}
                </span>
              </div>
              <p
                className={`text-sm text-slate-700 ${kh ? "font-khmer text-base leading-loose" : "leading-relaxed"}`}
              >
                <span className="font-bold text-slate-900">
                  {kh ? predicted.reactionTypeKh : predicted.reactionType}
                </span>{" "}
                — {kh ? predicted.notesKh : predicted.notes}
              </p>
            </>
          ) : (
            <>
              <div
                className={`text-[10px] font-mono uppercase tracking-widest text-rose-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                {t("No Reaction Found", "រកមិនឃើញប្រតិកម្ម")}
              </div>
              <p
                className={`text-sm text-slate-700 ${kh ? "font-khmer text-base leading-loose" : "leading-relaxed"}`}
              >
                {t(
                  "This combination isn't in the engine yet. Try a different reagent for this starting material — every option in the dropdown corresponds to a real reaction below.",
                  "ការផ្សំនេះមិនទាន់មាននៅក្នុងម៉ាស៊ីនទេ។ សាកល្បងសារធាតុដំណើរការផ្សេងសម្រាប់សារធាតុចាប់ផ្តើមនេះ — ជម្រើសនីមួយៗក្នុងបញ្ជីត្រូវនឹងប្រតិកម្មពិតខាងក្រោម។",
                )}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
