import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Calculator,
  Divide,
  Minus,
  Plus,
  RotateCw,
  Sparkles,
  Star,
  Volume2,
  X as XIcon,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * MATH MAGIC: NUMBERS & TABLES
 * វេទមន្តគណិតវិទ្យា៖ លេខ និងតារាង
 *
 * Audience: Cambodian primary-school ESL learners (ages ~6–11).
 * Pattern: Reuses the established kids aesthetic — pastel cards, big
 *          rounded cells, big readable digits, bilingual text, and the
 *          shared Web-Speech speakText() helper for English audio.
 *
 * Sections:
 *   1. Building Blocks  — Addition (blue) + Subtraction (red)
 *      Two compact 10×10 fact tables. Tap a cell to hear it spoken.
 *      Header row/col uses ⭐ icons to make the quantity visible for
 *      pre-readers.
 *   2. Fast Track       — Multiplication (green) + Division (purple)
 *      One 10×10 grid with hover-row/column highlight in bright yellow,
 *      enlarged answer in the focused cell, and a Mode-Toggle button
 *      that flips it between × and ÷ facts.
 * ────────────────────────────────────────────────────────────────────── */

const NUMBERS = Array.from({ length: 10 }, (_, i) => i + 1);

/** Returns up to 5 stars; for >5 returns a "Nx ⭐" compact form. */
function StarBadge({ n, color }: { n: number; color: string }) {
  if (n <= 5) {
    return (
      <span
        className="inline-flex gap-0.5"
        aria-hidden="true"
        data-testid={`star-badge-${n}`}
      >
        {Array.from({ length: n }).map((_, i) => (
          <Star
            key={i}
            className={`w-2.5 h-2.5 ${color}`}
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${color}`}
      aria-hidden="true"
      data-testid={`star-badge-${n}`}
    >
      {n}× <Star className="w-2.5 h-2.5" fill="currentColor" strokeWidth={0} />
    </span>
  );
}

export default function KidsMath() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  // Cancel any in-flight speech if the user navigates away.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function speak(text: string) {
    speakText(text, "en-US");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-rose-50 to-violet-50 pb-16">
      {/* ── Back link ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{kh ? "ត្រឡប់ទំព័រដើម" : "Back to Home"}</span>
          <span className={`text-slate-400 ${kh ? "" : "font-khmer"}`}>
            · {kh ? "Back to Home" : "ត្រឡប់ទំព័រដើម"}
          </span>
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-violet-300 px-4 py-1.5 text-xs sm:text-sm font-bold text-violet-700 shadow-sm">
          <Calculator className="w-4 h-4" aria-hidden="true" />
          <span>{kh ? "សម្រាប់កុមារ · វេទមន្តគណិតវិទ្យា" : "FOR KIDS · MATH MAGIC"}</span>
        </div>

        <h1
          className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-900"
          data-testid="page-title"
        >
          {kh ? (
            <span className="font-khmer leading-snug">វេទមន្តគណិតវិទ្យា៖ លេខ និងតារាង</span>
          ) : (
            <>
              Math{" "}
              <span className="bg-gradient-to-r from-sky-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
                Magic
              </span>
              : Numbers &amp; Tables
            </>
          )}
        </h1>

        {/* Muted opposite-language echo so both languages are always present. */}
        <p
          className={`mt-2 text-base sm:text-lg text-slate-500 ${kh ? "" : "font-khmer leading-loose"}`}
        >
          {kh ? "Math Magic: Numbers & Tables" : "វេទមន្តគណិតវិទ្យា៖ លេខ និងតារាង"}
        </p>

        <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-700">
          {kh
            ? "ប៉ះលេខណាមួយ ឬសមីការដើម្បីស្ដាប់វាជាភាសាអង់គ្លេស! រៀនវិធីបូក វិធីដក វិធីគុណ និងវិធីចែក — ទាំងអស់ក្នុងកន្លែងតែមួយ។"
            : "Tap any number or equation to hear it in English! Learn addition, subtraction, multiplication, and division — all in one place."}
        </p>
        <p
          className={`mt-2 max-w-2xl text-sm text-slate-500 ${kh ? "" : "font-khmer leading-loose"}`}
        >
          {kh
            ? "Tap any number or equation to hear it in English!"
            : "ប៉ះលេខណាមួយ ឬសមីការដើម្បីស្ដាប់វាជាភាសាអង់គ្លេស!"}
        </p>
      </header>

      {/* ── Section 1: Building Blocks ──────────────────────────────── */}
      <section
        id="building-blocks"
        className="max-w-6xl mx-auto px-4 sm:px-6 mt-12"
        data-testid="section-building-blocks"
      >
        <SectionHeading
          eyebrowEn="01 · Building Blocks"
          eyebrowKh="០១ · មូលដ្ឋានគ្រឹះ"
          titleEn="Building Blocks: Addition & Subtraction"
          titleKh="មូលដ្ឋានគ្រឹះ៖ វិធីបូក និងដក"
          accent="sky"
        />

        <ConceptCallout
          en="Addition is putting things together! Subtraction is taking things away!"
          kh="វិធីបូកគឺការដាក់របស់ចូលគ្នា! វិធីដកគឺការយករបស់ចេញ!"
          accent="sky"
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FactTable
            kind="add"
            kh={kh}
            speak={speak}
          />
          <FactTable
            kind="sub"
            kh={kh}
            speak={speak}
          />
        </div>
      </section>

      {/* ── Section 2: Fast Track ───────────────────────────────────── */}
      <section
        id="fast-track"
        className="max-w-6xl mx-auto px-4 sm:px-6 mt-14"
        data-testid="section-fast-track"
      >
        <SectionHeading
          eyebrowEn="02 · Fast Track"
          eyebrowKh="០២ · ផ្លូវកាត់"
          titleEn="Fast Track: Multiplication & Division"
          titleKh="ផ្លូវកាត់៖ វិធីគុណ និងចែក"
          accent="emerald"
        />

        <ConceptCallout
          en="Multiplication is just fast addition! Division is sharing equally!"
          kh="វិធីគុណគ្រាន់តែជាការបូកយ៉ាងលឿន! វិធីចែកគឺជាការចែករំលែកស្មើៗគ្នា!"
          accent="emerald"
        />

        <div className="mt-6">
          <BigGrid kh={kh} speak={speak} />
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Layout helpers                                                        */
/* ────────────────────────────────────────────────────────────────────── */

function SectionHeading({
  eyebrowEn,
  eyebrowKh,
  titleEn,
  titleKh,
  accent,
}: {
  eyebrowEn: string;
  eyebrowKh: string;
  titleEn: string;
  titleKh: string;
  accent: "sky" | "emerald";
}) {
  const eyebrowColor = accent === "sky" ? "text-sky-700" : "text-emerald-700";
  return (
    <div className="mb-3">
      <div
        className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase ${eyebrowColor}`}
      >
        <Sparkles className="w-3 h-3" aria-hidden="true" />
        <span>{eyebrowEn}</span>
        <span className="font-khmer normal-case tracking-normal text-slate-400">
          · {eyebrowKh}
        </span>
      </div>
      <h2 className="mt-1 font-display font-black text-2xl sm:text-3xl text-slate-900">
        {titleEn}
      </h2>
      <p className="mt-0.5 font-khmer text-base sm:text-lg text-slate-600 leading-loose">
        {titleKh}
      </p>
    </div>
  );
}

function ConceptCallout({
  en,
  kh,
  accent,
}: {
  en: string;
  kh: string;
  accent: "sky" | "emerald";
}) {
  const palette =
    accent === "sky"
      ? "bg-sky-50 border-sky-200 text-sky-900"
      : "bg-emerald-50 border-emerald-200 text-emerald-900";
  return (
    <div
      className={`mt-3 rounded-2xl border-2 ${palette} p-4 sm:p-5 shadow-sm`}
      data-testid={`concept-${accent}`}
    >
      <p className="font-display font-bold text-base sm:text-lg leading-relaxed">
        {en}
      </p>
      <p className="mt-1 font-khmer text-sm sm:text-base leading-loose opacity-90">
        {kh}
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Section 1 — Addition & Subtraction fact tables (10×10)                */
/* ────────────────────────────────────────────────────────────────────── */

type FactKind = "add" | "sub";

const FACT_PALETTES: Record<
  FactKind,
  {
    headerBg: string;
    cardBorder: string;
    headerCellBg: string;
    headerCellText: string;
    starColor: string;
    cellHover: string;
    cellRing: string;
    operatorChip: string;
    titleEn: string;
    titleKh: string;
    operatorChar: string;
    operatorWord: string; // for TTS
  }
> = {
  add: {
    headerBg: "from-sky-500 to-sky-600",
    cardBorder: "border-sky-300",
    headerCellBg: "bg-sky-100",
    headerCellText: "text-sky-900",
    starColor: "text-sky-500",
    cellHover: "hover:bg-sky-100",
    cellRing: "focus-visible:ring-sky-300",
    operatorChip: "bg-sky-600 text-white",
    titleEn: "Addition Table",
    titleKh: "តារាងវិធីបូក",
    operatorChar: "+",
    operatorWord: "plus",
  },
  sub: {
    headerBg: "from-rose-500 to-rose-600",
    cardBorder: "border-rose-300",
    headerCellBg: "bg-rose-100",
    headerCellText: "text-rose-900",
    starColor: "text-rose-500",
    cellHover: "hover:bg-rose-100",
    cellRing: "focus-visible:ring-rose-300",
    operatorChip: "bg-rose-600 text-white",
    titleEn: "Subtraction Table",
    titleKh: "តារាងវិធីដក",
    operatorChar: "−",
    operatorWord: "minus",
  },
};

function FactTable({
  kind,
  kh,
  speak,
}: {
  kind: FactKind;
  kh: boolean;
  speak: (text: string) => void;
}) {
  const p = FACT_PALETTES[kind];

  /**
   * Returns { value, spokenA, spokenB } for the cell.
   * - Addition: a + b, in row/col order.
   * - Subtraction: |a − b|. We always speak the LARGER number first so the
   *   spoken phrase remains true ("5 minus 2 equals 3"), and no negative
   *   numbers are ever shown to young learners.
   */
  function compute(
    a: number,
    b: number
  ): { value: number; spokenA: number; spokenB: number } {
    if (kind === "add") return { value: a + b, spokenA: a, spokenB: b };
    const big = Math.max(a, b);
    const small = Math.min(a, b);
    return { value: big - small, spokenA: big, spokenB: small };
  }

  return (
    <div
      className={`bg-white rounded-2xl border-2 ${p.cardBorder} shadow-sm overflow-hidden`}
      data-testid={`table-${kind}`}
    >
      {/* Card header */}
      <div className={`bg-gradient-to-r ${p.headerBg} px-4 py-3 flex items-center gap-3`}>
        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
          {kind === "add" ? (
            <Plus className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <Minus className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-black text-lg sm:text-xl text-white">
            {p.titleEn}
          </h3>
          <p className="font-khmer text-xs sm:text-sm text-white/90 leading-tight">
            {p.titleKh}
          </p>
        </div>
        <span
          className={`hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg ${p.operatorChip} font-display font-black text-xl shadow-sm`}
          aria-hidden="true"
        >
          {p.operatorChar}
        </span>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-sm sm:text-base"
          aria-label={
            kh
              ? `${p.titleKh} ១ ដល់ ១០`
              : `${p.titleEn} from 1 to 10`
          }
        >
          <thead>
            <tr>
              <th
                className={`sticky left-0 z-10 ${p.headerCellBg} ${p.headerCellText} font-display font-black p-2 text-center`}
                aria-label={kh ? "ប្រតិបត្តិការ" : "Operation"}
              >
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${p.operatorChip} text-base`}>
                  {p.operatorChar}
                </span>
              </th>
              {NUMBERS.map((b) => (
                <th
                  key={b}
                  className={`${p.headerCellBg} ${p.headerCellText} font-display font-black p-1.5 text-center min-w-[2.4rem]`}
                  scope="col"
                >
                  <div className="flex flex-col items-center gap-0.5 leading-tight">
                    <span>{b}</span>
                    <StarBadge n={b} color={p.starColor} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {NUMBERS.map((a) => (
              <tr key={a}>
                <th
                  scope="row"
                  className={`sticky left-0 z-10 ${p.headerCellBg} ${p.headerCellText} font-display font-black p-1.5 text-center min-w-[2.4rem]`}
                >
                  <div className="flex flex-col items-center gap-0.5 leading-tight">
                    <span>{a}</span>
                    <StarBadge n={a} color={p.starColor} />
                  </div>
                </th>
                {NUMBERS.map((b) => {
                  const { value, spokenA, spokenB } = compute(a, b);
                  const ariaLabel = `${spokenA} ${p.operatorWord} ${spokenB} equals ${value}`;
                  return (
                    <td key={b} className="border border-slate-100 p-0">
                      <button
                        type="button"
                        onClick={() => speak(ariaLabel)}
                        aria-label={ariaLabel}
                        data-testid={`cell-${kind}-${a}-${b}`}
                        className={`w-full min-h-[2.2rem] sm:min-h-[2.6rem] px-1 py-1 font-mono font-bold text-slate-800 ${p.cellHover} active:scale-95 transition-all focus:outline-none focus-visible:ring-2 ${p.cellRing}`}
                      >
                        {value}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Helper line */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs text-slate-600">
        <span className="font-bold">{kh ? "ប៉ះក្រឡា" : "Tap a cell"}</span>
        <span className={`ml-1 ${kh ? "" : "font-khmer"} text-slate-500`}>
          · {kh ? "Tap a cell to hear it" : "ដើម្បីស្ដាប់សមីការជាភាសាអង់គ្លេស"}
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Section 2 — Big 10×10 grid for Multiplication / Division              */
/* ────────────────────────────────────────────────────────────────────── */

type Mode = "mult" | "div";

const MODE_PALETTES: Record<
  Mode,
  {
    headerBg: string;
    cardBorder: string;
    headerCellBg: string;
    headerCellText: string;
    starColor: string;
    operatorChip: string;
    operatorChar: string;
    operatorWord: string;
    titleEn: string;
    titleKh: string;
    cellRing: string;
    activeCellBg: string;
    activeRowColBg: string;
    cellNormalBg: string;
  }
> = {
  mult: {
    headerBg: "from-emerald-500 to-emerald-600",
    cardBorder: "border-emerald-300",
    headerCellBg: "bg-emerald-100",
    headerCellText: "text-emerald-900",
    starColor: "text-emerald-500",
    operatorChip: "bg-emerald-600 text-white",
    operatorChar: "×",
    operatorWord: "times",
    titleEn: "Multiplication Grid",
    titleKh: "តារាងវិធីគុណ",
    cellRing: "focus-visible:ring-emerald-300",
    activeCellBg: "bg-yellow-300 ring-2 ring-yellow-500",
    activeRowColBg: "bg-yellow-100",
    cellNormalBg: "bg-white hover:bg-emerald-50",
  },
  div: {
    headerBg: "from-violet-500 to-violet-600",
    cardBorder: "border-violet-300",
    headerCellBg: "bg-violet-100",
    headerCellText: "text-violet-900",
    starColor: "text-violet-500",
    operatorChip: "bg-violet-600 text-white",
    operatorChar: "÷",
    operatorWord: "divided by",
    titleEn: "Division Grid",
    titleKh: "តារាងវិធីចែក",
    cellRing: "focus-visible:ring-violet-300",
    activeCellBg: "bg-yellow-300 ring-2 ring-yellow-500",
    activeRowColBg: "bg-yellow-100",
    cellNormalBg: "bg-white hover:bg-violet-50",
  },
};

function BigGrid({
  kh,
  speak,
}: {
  kh: boolean;
  speak: (text: string) => void;
}) {
  const [mode, setMode] = useState<Mode>("mult");
  const [active, setActive] = useState<{ r: number; c: number } | null>(null);
  const p = MODE_PALETTES[mode];

  // For division: cell (r, c) shows r ÷ c, rounded to 2 decimal places when
  // the result is not a whole number (e.g. 3 ÷ 2 → 1.5, 10 ÷ 3 → 3.33).
  const fmtDiv = (r: number, c: number) => {
    const raw = r / c;
    return Number.isInteger(raw) ? `${raw}` : parseFloat(raw.toFixed(2)).toString();
  };

  const cellLabel = useMemo(
    () => (r: number, c: number) => {
      if (mode === "mult") return `${r * c}`;
      return fmtDiv(r, c);
    },
    [mode]
  );

  const cellAria = (r: number, c: number) => {
    if (mode === "mult") return `${r} times ${c} equals ${r * c}`;
    return `${r} divided by ${c} equals ${fmtDiv(r, c)}`;
  };

  function handleSelect(r: number, c: number) {
    setActive({ r, c });
    speak(cellAria(r, c));
  }

  return (
    <div
      className={`bg-white rounded-2xl border-2 ${p.cardBorder} shadow-sm overflow-hidden`}
      data-testid="grid-card"
    >
      {/* Card header w/ mode toggle */}
      <div className={`bg-gradient-to-r ${p.headerBg} px-4 py-3 flex items-center gap-3 flex-wrap`}>
        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
          {mode === "mult" ? (
            <XIcon className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <Divide className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-black text-lg sm:text-xl text-white">
            {p.titleEn}
          </h3>
          <p className="font-khmer text-xs sm:text-sm text-white/90 leading-tight">
            {p.titleKh}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setMode((m) => (m === "mult" ? "div" : "mult"));
            setActive(null);
          }}
          data-testid="btn-mode-toggle"
          aria-label={
            mode === "mult"
              ? "Switch to division · ប្ដូរទៅវិធីចែក"
              : "Switch to multiplication · ប្ដូរទៅវិធីគុណ"
          }
          className="inline-flex items-center gap-2 bg-white/95 hover:bg-white text-slate-800 font-bold text-sm px-3 py-2 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
        >
          <RotateCw className="w-4 h-4" aria-hidden="true" />
          <span>
            {mode === "mult"
              ? (kh ? "បង្ហាញ ÷" : "Show ÷")
              : (kh ? "បង្ហាញ ×" : "Show ×")}
          </span>
          <span
            className={`text-[11px] opacity-70 ${kh ? "" : "font-khmer"}`}
            aria-hidden="true"
          >
            ·{" "}
            {mode === "mult"
              ? (kh ? "Show ÷" : "បង្ហាញ ÷")
              : (kh ? "Show ×" : "បង្ហាញ ×")}
          </span>
        </button>
      </div>

      {/* Scrollable grid */}
      <div
        className="overflow-x-auto"
        onMouseLeave={() => setActive(null)}
        data-testid={mode === "mult" ? "grid-multiplication" : "grid-division"}
      >
        <table
          className="border-collapse text-sm sm:text-base mx-auto"
          aria-label={
            kh
              ? `${p.titleKh} ១០ គុណ ១០`
              : `${p.titleEn} 10 by 10`
          }
          data-testid={mode === "mult" ? "grid-multiplication-table" : "grid-division-table"}
        >
          <thead>
            <tr>
              <th
                className={`${p.headerCellBg} ${p.headerCellText} font-display font-black p-2 text-center w-10`}
                aria-hidden="true"
              >
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${p.operatorChip} text-base`}>
                  {p.operatorChar}
                </span>
              </th>
              {NUMBERS.map((c) => {
                const isActive = active?.c === c;
                return (
                  <th
                    key={c}
                    className={`${isActive ? "bg-yellow-200" : p.headerCellBg} ${p.headerCellText} font-display font-black p-1.5 text-center min-w-[2.6rem] transition-colors`}
                    scope="col"
                  >
                    <div className="flex flex-col items-center gap-0.5 leading-tight">
                      <span className={isActive ? "text-yellow-900 text-lg" : ""}>{c}</span>
                      <StarBadge n={c} color={p.starColor} />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {NUMBERS.map((r) => {
              const rowActive = active?.r === r;
              return (
                <tr key={r}>
                  <th
                    scope="row"
                    className={`${rowActive ? "bg-yellow-200" : p.headerCellBg} ${p.headerCellText} font-display font-black p-1.5 text-center min-w-[2.6rem] transition-colors`}
                  >
                    <div className="flex flex-col items-center gap-0.5 leading-tight">
                      <span className={rowActive ? "text-yellow-900 text-lg" : ""}>{r}</span>
                      <StarBadge n={r} color={p.starColor} />
                    </div>
                  </th>
                  {NUMBERS.map((c) => {
                    const isActiveCell = active?.r === r && active?.c === c;
                    const isHighlightLine =
                      !isActiveCell &&
                      (active?.r === r || active?.c === c);
                    const cls = isActiveCell
                      ? p.activeCellBg
                      : isHighlightLine
                        ? p.activeRowColBg
                        : p.cellNormalBg;
                    return (
                      <td key={c} className="border border-slate-100 p-0">
                        <button
                          type="button"
                          onMouseEnter={() => setActive({ r, c })}
                          onFocus={() => setActive({ r, c })}
                          onClick={() => handleSelect(r, c)}
                          aria-label={cellAria(r, c)}
                          data-testid={`cell-${mode}-${r}-${c}`}
                          className={`w-full min-h-[2.4rem] sm:min-h-[2.8rem] px-1 py-1 font-mono font-bold text-slate-800 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 ${p.cellRing} ${cls} ${isActiveCell ? "text-2xl sm:text-3xl text-yellow-900" : ""}`}
                        >
                          {cellLabel(r, c)}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Live equation read-out */}
      <div
        className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap"
        data-testid="grid-readout"
      >
        <div className="font-mono font-black text-base sm:text-lg text-slate-800 min-h-[1.75rem]">
          {active ? (
            <>
              {mode === "mult"
                ? `${active.r} × ${active.c} = ${active.r * active.c}`
                : `${active.r * active.c} ÷ ${active.c} = ${active.r}`}
            </>
          ) : (
            <span className="text-slate-400 font-sans font-normal text-sm">
              {kh
                ? "ប៉ះ ឬដាក់ម៉ៅលើក្រឡាមួយដើម្បីមើលសមីការ"
                : "Tap or hover a cell to see the equation"}
              <span className={`ml-1 ${kh ? "" : "font-khmer"} text-slate-300`}>
                ·{" "}
                {kh
                  ? "Tap or hover a cell to see the equation"
                  : "ប៉ះ ឬដាក់ម៉ៅលើក្រឡាមួយដើម្បីមើលសមីការ"}
              </span>
            </span>
          )}
        </div>
        {active && (
          <button
            type="button"
            onClick={() => speak(cellAria(active.r, active.c))}
            data-testid="btn-speak-readout"
            aria-label={kh ? "ស្ដាប់សមីការ" : "Hear the equation"}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold text-white shadow-md hover:shadow-lg active:scale-95 transition-all focus:outline-none focus-visible:ring-4 ${
              mode === "mult" ? "bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-300" : "bg-violet-600 hover:bg-violet-700 focus-visible:ring-violet-300"
            }`}
          >
            <Volume2 className="w-4 h-4" aria-hidden="true" />
            <span>{kh ? "ស្ដាប់" : "Play"}</span>
            <span className={`text-[11px] opacity-80 ${kh ? "" : "font-khmer"}`}>
              · {kh ? "Play" : "ស្ដាប់"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
