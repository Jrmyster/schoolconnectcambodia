import { useMemo, useState } from "react";
import { BookOpen, Search, X } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import {
  FUNCTIONAL_GROUPS,
  FUNCTIONAL_GROUP_CATEGORIES,
  type FGCategory,
  type FunctionalGroup,
} from "@/data/functionalGroupsData";

/* ══════════════════════════════════════════════════════════════════════════
 * The Molecular Alphabet — Functional Groups
 * អក្ខរក្រមម៉ូលេគុល៖ ក្រុមនាទី
 *
 * Reference-guide aesthetic — crisp whites, molecular blues, light borders.
 * Cheat-sheet density: small Element Cards in a responsive CSS grid,
 * grouped by category (Hydrocarbons / Heteroatoms / Carbonyls / Nitrogen).
 * ══════════════════════════════════════════════════════════════════════════ */

/* Color palette ──────────────────────────────────────────────────────── */
const R_COLOR = "#64748b";        // slate-500 — generic R group
const C_BOND = "#0f172a";         // slate-900 — plain C-C bond
const HIGHLIGHT = "#2563eb";      // blue-600 — functional-group bond highlight
const O_COLOR = "#dc2626";        // red-600 — oxygen (CPK)
const N_COLOR = "#1d4ed8";        // blue-700 — nitrogen (CPK)
const X_COLOR = "#16a34a";        // green-600 — halogen (CPK)
const ACCENT_BORDER = "#bfdbfe";  // blue-200 — light reference-guide border

export function FunctionalGroupGallery() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FUNCTIONAL_GROUPS;
    return FUNCTIONAL_GROUPS.filter((g) => {
      const en = g.enName.toLowerCase();
      const kh_ = g.khName.toLowerCase();
      const f = g.formula.toLowerCase();
      const sx = (g.suffix || "").toLowerCase();
      const px = (g.prefix || "").toLowerCase();
      return en.includes(q) || kh_.includes(q) || f.includes(q) || sx.includes(q) || px.includes(q);
    });
  }, [query]);

  return (
    <section
      className="mt-12 mb-12 relative"
      aria-labelledby="fg-gallery-heading"
      data-testid="functional-group-gallery"
    >
      {/* Section header ─────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 mb-2">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-blue-700" aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-[11px] font-mono uppercase tracking-[0.25em] text-blue-700 mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
          >
            {t("Quick reference · cheat sheet", "ឯកសារយោងរហ័ស · សន្លឹកសង្ខេប")}
          </div>
          <h2
            id="fg-gallery-heading"
            className={`font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
          >
            {kh
              ? "អក្ខរក្រមម៉ូលេគុល៖ ក្រុមនាទី"
              : "The Molecular Alphabet: Functional Groups"}
          </h2>
        </div>
      </div>
      <p
        className={`text-sm text-slate-700 max-w-3xl mb-5 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {t(
          "Once you can recognise these 15 patterns at a glance, you can read almost any organic molecule like a sentence — the R groups are the words, the functional group is the verb that tells you what it does.",
          "នៅពេលអ្នកអាចស្គាល់រូបរាង ១៥ នេះបានភ្លាមៗ អ្នកអាចអានម៉ូលេគុលសរីរាង្គស្ទើរតែទាំងអស់បានដូចជាឃ្លាមួយ — ក្រុម R គឺជាពាក្យ ហើយក្រុមនាទីគឺជាកិរិយាស័ព្ទ ដែលប្រាប់អ្នកថាវាធ្វើអ្វី។",
        )}
      </p>

      {/* Legend + search ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-3 text-[11px] sm:text-xs font-mono">
          <Legend swatch={R_COLOR} en="R group" kh="ក្រុម R" kh_={kh} />
          <Legend swatch={HIGHLIGHT} en="Functional group" kh="ក្រុមនាទី" kh_={kh} />
          <Legend swatch={O_COLOR} en="O (oxygen)" kh="O (អុកស៊ីសែន)" kh_={kh} />
          <Legend swatch={N_COLOR} en="N (nitrogen)" kh="N (នីត្រូសែន)" kh_={kh} />
          <Legend swatch={X_COLOR} en="X (halogen)" kh="X (ហាឡូសែន)" kh_={kh} />
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={kh ? "ស្វែងរក… (ឧ. -ol, alkene)" : "Search… (e.g. -ol, alkene)"}
            className={`pl-8 pr-7 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 w-[220px] sm:w-[260px] focus:outline-none focus:ring-2 focus:ring-blue-300 ${kh ? "font-khmer" : ""}`}
            data-testid="input-fg-search"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-slate-100"
              aria-label={kh ? "សម្អាត" : "Clear"}
              data-testid="button-fg-search-clear"
            >
              <X className="w-3 h-3 text-slate-500" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Categories ─────────────────────────────────────────────────── */}
      <div className="space-y-5">
        {FUNCTIONAL_GROUP_CATEGORIES.map((cat) => {
          const items = filtered.filter((g) => g.category === cat.id);
          if (items.length === 0) return null;
          return (
            <CategoryBlock
              key={cat.id}
              cat={cat}
              items={items}
              kh={kh}
            />
          );
        })}

        {filtered.length === 0 ? (
          <div
            className={`text-center text-sm text-slate-500 py-8 border border-dashed border-slate-300 rounded-xl ${kh ? "font-khmer" : ""}`}
          >
            {t("No functional groups match your search.", "គ្មានក្រុមនាទីណាត្រូវនឹងការស្វែងរករបស់អ្នកទេ។")}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Sub-components
 * ─────────────────────────────────────────────────────────────────────── */

function Legend({
  swatch,
  en,
  kh,
  kh_,
}: {
  swatch: string;
  en: string;
  kh: string;
  kh_: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${kh_ ? "font-khmer" : ""}`}>
      <span
        aria-hidden
        className="inline-block w-3 h-3 rounded-sm border border-slate-300"
        style={{ backgroundColor: swatch }}
      />
      <span className="text-slate-600">{kh_ ? kh : en}</span>
    </span>
  );
}

function CategoryBlock({
  cat,
  items,
  kh,
}: {
  cat: (typeof FUNCTIONAL_GROUP_CATEGORIES)[number];
  items: FunctionalGroup[];
  kh: boolean;
}) {
  return (
    <div
      className="rounded-2xl border bg-white/80 backdrop-blur-sm p-3 sm:p-4 shadow-sm"
      style={{ borderColor: ACCENT_BORDER }}
      data-testid={`fg-category-${cat.id}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3 px-1">
        <h3
          className={`font-bold text-base sm:text-lg text-slate-900 ${kh ? "font-khmer" : ""}`}
        >
          {kh ? cat.khName : cat.enName}
        </h3>
        <span
          className={`text-xs text-slate-500 ${kh ? "font-khmer leading-loose" : ""}`}
        >
          {kh ? cat.khHint : cat.enHint}
        </span>
        <span className="ml-auto text-[10px] font-mono text-blue-700/80">
          {items.length}
          <span className={`text-slate-400 ml-1 ${kh ? "font-khmer" : ""}`}>
            {kh ? (items.length === 1 ? "ក្រុម" : "ក្រុម") : items.length === 1 ? "group" : "groups"}
          </span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {items.map((g) => (
          <ElementCard key={g.id} g={g} kh={kh} />
        ))}
      </div>
    </div>
  );
}

function ElementCard({ g, kh }: { g: FunctionalGroup; kh: boolean }) {
  return (
    <div
      className="rounded-xl border bg-white p-2.5 sm:p-3 hover:shadow-md hover:border-blue-300 transition-all flex flex-col"
      style={{ borderColor: ACCENT_BORDER }}
      data-testid={`fg-card-${g.id}`}
    >
      {/* Name + suffix */}
      <div className="flex items-baseline justify-between gap-1.5 mb-1.5">
        <h4
          className={`font-bold text-[13px] sm:text-sm text-slate-900 leading-tight ${kh ? "font-khmer" : ""}`}
        >
          {kh ? g.khName : g.enName}
        </h4>
        {g.suffix ? (
          <span
            className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded"
            title={kh ? "បច្ច័យ" : "suffix"}
          >
            {g.suffix}
          </span>
        ) : g.prefix ? (
          <span
            className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded"
            title={kh ? "បុព្វបទ" : "prefix"}
          >
            {g.prefix}
          </span>
        ) : null}
      </div>

      {/* Structural formula */}
      <div className="flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100 py-2 mb-2 min-h-[64px]">
        <FormulaSVG id={g.id} />
      </div>

      {/* Text formula + example */}
      <div
        className="text-center text-[11px] font-mono text-slate-600 mb-1 break-words"
        aria-label={`Formula: ${g.formula}`}
      >
        {g.formula}
      </div>
      <div
        className={`text-center text-[10px] sm:text-[11px] text-slate-500 leading-snug mt-auto ${kh ? "font-khmer leading-loose" : ""}`}
      >
        <span className="font-semibold text-slate-600">{kh ? "ឧ៖ " : "e.g. "}</span>
        {kh ? g.khExample : g.enExample}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Structural formula SVGs
 *
 * Canvas: 140 × 56, baseline at y = 32. R groups in slate-grey, the
 * functional-group bonds and heteroatoms are highlighted per CPK.
 * ════════════════════════════════════════════════════════════════════════ */

function FormulaSVG({ id }: { id: FunctionalGroup["id"] }) {
  switch (id) {
    case "alkane":         return <SvgAlkane />;
    case "alkene":         return <SvgAlkene />;
    case "alkyne":         return <SvgAlkyne />;
    case "aromatic":       return <SvgAromatic />;
    case "alcohol":        return <SvgAlcohol />;
    case "ether":          return <SvgEther />;
    case "amine":          return <SvgAmine />;
    case "haloalkane":     return <SvgHaloalkane />;
    case "aldehyde":       return <SvgAldehyde />;
    case "ketone":         return <SvgKetone />;
    case "carboxylic-acid":return <SvgCarboxylicAcid />;
    case "ester":          return <SvgEster />;
    case "amide":          return <SvgAmide />;
    case "acyl-chloride":  return <SvgAcylChloride />;
    case "nitrile":        return <SvgNitrile />;
    default:               return null;
  }
}

/* Reusable atom-label component */
function Atom({
  x,
  y,
  text,
  color = R_COLOR,
  size = 14,
  bold = true,
  sub,
}: {
  x: number;
  y: number;
  text: string;
  color?: string;
  size?: number;
  bold?: boolean;
  sub?: string;
}) {
  return (
    <g>
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontWeight={bold ? 700 : 500}
        fill={color}
      >
        {text}
        {sub ? (
          <tspan baselineShift="sub" fontSize={size * 0.7}>
            {sub}
          </tspan>
        ) : null}
      </text>
    </g>
  );
}

const SvgWrapperProps = {
  viewBox: "0 0 140 56",
  className: "w-full h-12 sm:h-14",
  xmlns: "http://www.w3.org/2000/svg",
} as const;

/* ── Hydrocarbons ──────────────────────────────────────────────────── */

function SvgAlkane() {
  // R—R'  (single bond, no double-bond emphasis)
  return (
    <svg {...SvgWrapperProps} aria-label="R single-bond R prime">
      <Atom x={20} y={28} text="R" color={R_COLOR} />
      <line x1={32} y1={28} x2={108} y2={28} stroke={C_BOND} strokeWidth={2} strokeLinecap="round" />
      <Atom x={120} y={28} text="R'" color={R_COLOR} />
    </svg>
  );
}

function SvgAlkene() {
  // R—CH=CH—R' represented as R = R' with highlighted double bond
  return (
    <svg {...SvgWrapperProps} aria-label="R double-bond R prime">
      <Atom x={20} y={28} text="R" color={R_COLOR} />
      <line x1={32} y1={24} x2={108} y2={24} stroke={HIGHLIGHT} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={32} y1={32} x2={108} y2={32} stroke={HIGHLIGHT} strokeWidth={2.5} strokeLinecap="round" />
      <Atom x={120} y={28} text="R'" color={R_COLOR} />
    </svg>
  );
}

function SvgAlkyne() {
  // R—C≡C—R' represented with three parallel lines
  return (
    <svg {...SvgWrapperProps} aria-label="R triple-bond R prime">
      <Atom x={20} y={28} text="R" color={R_COLOR} />
      <line x1={32} y1={22} x2={108} y2={22} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <line x1={32} y1={28} x2={108} y2={28} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <line x1={32} y1={34} x2={108} y2={34} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={120} y={28} text="R'" color={R_COLOR} />
    </svg>
  );
}

function SvgAromatic() {
  // Benzene hexagon with internal circle, R substituent
  const cx = 80, cy = 28, r = 16;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  const poly = pts.map((p) => p.join(",")).join(" ");
  return (
    <svg {...SvgWrapperProps} aria-label="Benzene ring with R substituent">
      <Atom x={20} y={28} text="R" color={R_COLOR} />
      <line x1={32} y1={28} x2={pts[3][0]} y2={pts[3][1]} stroke={C_BOND} strokeWidth={2} strokeLinecap="round" />
      <polygon points={poly} fill="none" stroke={HIGHLIGHT} strokeWidth={2} strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke={HIGHLIGHT} strokeWidth={1.5} />
    </svg>
  );
}

/* ── Heteroatoms ──────────────────────────────────────────────────── */

function SvgAlcohol() {
  // R—O—H  (O red, H slate; both bonds within the FG highlighted)
  return (
    <svg {...SvgWrapperProps} aria-label="R bonded to O H">
      <Atom x={20} y={28} text="R" color={R_COLOR} />
      <line x1={32} y1={28} x2={68} y2={28} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={80} y={28} text="O" color={O_COLOR} size={15} />
      <line x1={92} y1={28} x2={108} y2={28} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={118} y={28} text="H" color="#334155" size={13} />
    </svg>
  );
}

function SvgEther() {
  // R—O—R' (both C–O bonds highlighted; R groups remain grey)
  return (
    <svg {...SvgWrapperProps} aria-label="R bonded to O bonded to R prime">
      <Atom x={18} y={28} text="R" color={R_COLOR} />
      <line x1={30} y1={28} x2={62} y2={28} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={74} y={28} text="O" color={O_COLOR} size={15} />
      <line x1={86} y1={28} x2={114} y2={28} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={124} y={28} text="R'" color={R_COLOR} />
    </svg>
  );
}

function SvgAmine() {
  // R—N(H)(H)  (R–N bond highlighted, plus the two N–H bonds)
  return (
    <svg {...SvgWrapperProps} aria-label="R bonded to N H 2">
      <Atom x={20} y={28} text="R" color={R_COLOR} />
      <line x1={32} y1={28} x2={68} y2={28} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={80} y={28} text="N" color={N_COLOR} size={15} />
      {/* Two H bonds branching out */}
      <line x1={88} y1={22} x2={104} y2={12} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <line x1={88} y1={34} x2={104} y2={44} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={114} y={10} text="H" color="#334155" size={12} />
      <Atom x={114} y={46} text="H" color="#334155" size={12} />
    </svg>
  );
}

function SvgHaloalkane() {
  // R—X
  return (
    <svg {...SvgWrapperProps} aria-label="R bonded to X halogen">
      <Atom x={28} y={28} text="R" color={R_COLOR} />
      <line x1={40} y1={28} x2={96} y2={28} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={108} y={28} text="X" color={X_COLOR} size={15} />
    </svg>
  );
}

/* ── Carbonyls (C=O family) ───────────────────────────────────────── */

/** Reusable: draw the central carbonyl C with =O hanging up. */
function CarbonylCenter({ x, label = "C" }: { x: number; label?: string }) {
  return (
    <g>
      {/* C=O double bond going up (two parallel vertical lines) */}
      <line x1={x - 3} y1={28} x2={x - 3} y2={10} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <line x1={x + 3} y1={28} x2={x + 3} y2={10} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={x} y={6} text="O" color={O_COLOR} size={13} />
      <Atom x={x} y={32} text={label} color={HIGHLIGHT} size={13} />
    </g>
  );
}

function SvgAldehyde() {
  // R—C(=O)—H
  return (
    <svg {...SvgWrapperProps} aria-label="R carbonyl H">
      <Atom x={20} y={32} text="R" color={R_COLOR} />
      <line x1={32} y1={32} x2={62} y2={32} stroke={C_BOND} strokeWidth={2} strokeLinecap="round" />
      <CarbonylCenter x={74} />
      <line x1={86} y1={32} x2={108} y2={32} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={118} y={32} text="H" color="#334155" size={13} />
    </svg>
  );
}

function SvgKetone() {
  // R—C(=O)—R'
  return (
    <svg {...SvgWrapperProps} aria-label="R carbonyl R prime">
      <Atom x={20} y={32} text="R" color={R_COLOR} />
      <line x1={32} y1={32} x2={62} y2={32} stroke={C_BOND} strokeWidth={2} strokeLinecap="round" />
      <CarbonylCenter x={74} />
      <line x1={86} y1={32} x2={108} y2={32} stroke={C_BOND} strokeWidth={2} strokeLinecap="round" />
      <Atom x={120} y={32} text="R'" color={R_COLOR} />
    </svg>
  );
}

function SvgCarboxylicAcid() {
  // R—C(=O)—O—H
  return (
    <svg {...SvgWrapperProps} aria-label="R carboxylic acid O H">
      <Atom x={14} y={32} text="R" color={R_COLOR} />
      <line x1={26} y1={32} x2={56} y2={32} stroke={C_BOND} strokeWidth={2} strokeLinecap="round" />
      <CarbonylCenter x={68} />
      <line x1={80} y1={32} x2={94} y2={32} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={104} y={32} text="O" color={O_COLOR} size={13} />
      <line x1={114} y1={32} x2={124} y2={32} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={132} y={32} text="H" color="#334155" size={12} />
    </svg>
  );
}

function SvgEster() {
  // R—C(=O)—O—R'
  return (
    <svg {...SvgWrapperProps} aria-label="R ester O R prime">
      <Atom x={14} y={32} text="R" color={R_COLOR} />
      <line x1={26} y1={32} x2={56} y2={32} stroke={C_BOND} strokeWidth={2} strokeLinecap="round" />
      <CarbonylCenter x={68} />
      <line x1={80} y1={32} x2={94} y2={32} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={104} y={32} text="O" color={O_COLOR} size={13} />
      <line x1={114} y1={32} x2={124} y2={32} stroke={C_BOND} strokeWidth={2} strokeLinecap="round" />
      <Atom x={132} y={32} text="R'" color={R_COLOR} size={11} />
    </svg>
  );
}

function SvgAmide() {
  // R—C(=O)—N(H)(H)
  return (
    <svg {...SvgWrapperProps} aria-label="R amide N H 2">
      <Atom x={14} y={32} text="R" color={R_COLOR} />
      <line x1={26} y1={32} x2={56} y2={32} stroke={C_BOND} strokeWidth={2} strokeLinecap="round" />
      <CarbonylCenter x={68} />
      <line x1={80} y1={32} x2={94} y2={32} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={104} y={32} text="N" color={N_COLOR} size={13} />
      <line x1={112} y1={28} x2={124} y2={20} stroke={HIGHLIGHT} strokeWidth={2} strokeLinecap="round" />
      <line x1={112} y1={36} x2={124} y2={44} stroke={HIGHLIGHT} strokeWidth={2} strokeLinecap="round" />
      <Atom x={132} y={18} text="H" color="#334155" size={11} />
      <Atom x={132} y={46} text="H" color="#334155" size={11} />
    </svg>
  );
}

function SvgAcylChloride() {
  // R—C(=O)—Cl
  return (
    <svg {...SvgWrapperProps} aria-label="R acyl chloride">
      <Atom x={20} y={32} text="R" color={R_COLOR} />
      <line x1={32} y1={32} x2={62} y2={32} stroke={C_BOND} strokeWidth={2} strokeLinecap="round" />
      <CarbonylCenter x={74} />
      <line x1={86} y1={32} x2={104} y2={32} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={116} y={32} text="Cl" color={X_COLOR} size={14} />
    </svg>
  );
}

/* ── Nitrogen-based ───────────────────────────────────────────────── */

function SvgNitrile() {
  // R—C≡N
  return (
    <svg {...SvgWrapperProps} aria-label="R triple-bond N nitrile">
      <Atom x={20} y={28} text="R" color={R_COLOR} />
      <line x1={32} y1={28} x2={62} y2={28} stroke={C_BOND} strokeWidth={2} strokeLinecap="round" />
      <Atom x={72} y={28} text="C" color={HIGHLIGHT} size={13} />
      <line x1={82} y1={22} x2={108} y2={22} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <line x1={82} y1={28} x2={108} y2={28} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <line x1={82} y1={34} x2={108} y2={34} stroke={HIGHLIGHT} strokeWidth={2.2} strokeLinecap="round" />
      <Atom x={118} y={28} text="N" color={N_COLOR} size={14} />
    </svg>
  );
}

export default FunctionalGroupGallery;
