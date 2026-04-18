import { Link, useRoute } from "wouter";
import {
  Atom,
  Rocket,
  Magnet,
  Flame,
  Radio,
  ArrowRight,
  ArrowLeft,
  Compass,
  Ruler,
  Weight,
  Clock,
  Calculator,
  BookOpen,
  Info,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { InlineMath } from "react-katex";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type PhysicsModule = {
  slug: string;
  number: string;
  code: string; // engineering "spec sheet" code, e.g. "M-01"
  titleEn: string;
  titleKh: string;
  blurbEn: string;
  blurbKh: string;
  topicsEn: string[];
  topicsKh: string[];
  icon: React.ComponentType<{ className?: string }>;
  accent: {
    border: string;
    chipBorder: string;
    chipText: string;
    iconBg: string;
    title: string;
    code: string;
    glow: string;
  };
};

export const PHYSICS_MODULES: PhysicsModule[] = [
  {
    slug: "motion",
    number: "01",
    code: "M-01",
    titleEn: "Motion & Kinematics",
    titleKh: "ចលនា និងគីនេម៉ាទិច",
    blurbEn: "Learn how and why things move through space and time.",
    blurbKh: "រៀនពីរបៀប និងហេតុដែលវត្ថុមានចលនាឆ្លងកាត់លំហ និងពេលវេលា។",
    topicsEn: ["Speed", "Velocity", "Acceleration", "Trajectory"],
    topicsKh: ["ល្បឿន", "ល្បឿនវ៉ិចទ័រ", "សំទុះ", "គន្លងចលនា"],
    icon: Rocket,
    accent: {
      border: "border-cyan-300",
      chipBorder: "border-cyan-300/80",
      chipText: "text-cyan-800",
      iconBg: "bg-cyan-600",
      title: "text-cyan-900",
      code: "text-cyan-700",
      glow: "shadow-cyan-200/40",
    },
  },
  {
    slug: "forces",
    number: "02",
    code: "M-02",
    titleEn: "Forces & Newton's Laws",
    titleKh: "កម្លាំង និងច្បាប់ញូតុន",
    blurbEn:
      "Discover the invisible pushes and pulls that hold our world together.",
    blurbKh:
      "ស្វែងយល់ពីការរុញ និងការទាញដែលមើលមិនឃើញ ដែលរក្សាពិភពលោករបស់យើងឱ្យនៅជាមួយគ្នា។",
    topicsEn: ["Gravity", "Friction", "Inertia", "Action / Reaction"],
    topicsKh: ["ទំនាញ", "កកិត", "និយាមភាព", "សកម្មភាព / ប្រតិកម្ម"],
    icon: Magnet,
    accent: {
      border: "border-rose-300",
      chipBorder: "border-rose-300/80",
      chipText: "text-rose-800",
      iconBg: "bg-rose-600",
      title: "text-rose-900",
      code: "text-rose-700",
      glow: "shadow-rose-200/40",
    },
  },
  {
    slug: "energy",
    number: "03",
    code: "M-03",
    titleEn: "Energy & Thermodynamics",
    titleKh: "ថាមពល និងទែម៉ូឌីណាមិច",
    blurbEn:
      "Understand how energy is never lost, only transformed from one type to another.",
    blurbKh:
      "យល់ពីរបៀបដែលថាមពលមិនបាត់បង់ឡើយ គ្រាន់តែបំលែងពីប្រភេទមួយទៅប្រភេទមួយទៀត។",
    topicsEn: [
      "Kinetic Energy",
      "Potential Energy",
      "Heat Transfer",
      "Conservation of Energy",
    ],
    topicsKh: [
      "ថាមពលចលនា",
      "ថាមពលប៉ូតង់ស្យែល",
      "ការបញ្ជូនកម្តៅ",
      "ការអភិរក្សថាមពល",
    ],
    icon: Flame,
    accent: {
      border: "border-amber-300",
      chipBorder: "border-amber-300/80",
      chipText: "text-amber-800",
      iconBg: "bg-amber-600",
      title: "text-amber-900",
      code: "text-amber-700",
      glow: "shadow-amber-200/40",
    },
  },
  {
    slug: "waves",
    number: "04",
    code: "M-04",
    titleEn: "Waves, Sound & Light",
    titleKh: "រលក សំឡេង និងពន្លឺ",
    blurbEn:
      "Explore how energy travels through the air and the vacuum of space.",
    blurbKh:
      "ស្វែងយល់ពីរបៀបដែលថាមពលធ្វើដំណើរកាត់ខ្យល់ និងខ្យល់ទំនេរក្នុងលំហ។",
    topicsEn: [
      "Frequencies",
      "Optics",
      "Lenses",
      "Electromagnetic Spectrum",
    ],
    topicsKh: [
      "ប្រេកង់",
      "អុបទិក",
      "កែវ",
      "វិសាលគមអេឡិចត្រូម៉ាញេទិច",
    ],
    icon: Radio,
    accent: {
      border: "border-indigo-300",
      chipBorder: "border-indigo-300/80",
      chipText: "text-indigo-800",
      iconBg: "bg-indigo-600",
      title: "text-indigo-900",
      code: "text-indigo-700",
      glow: "shadow-indigo-200/40",
    },
  },
];

// Inline SVG blueprint grid — used as background image via data URI.
// Subtle indigo/cyan lines on transparent background.
const BLUEPRINT_BG: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  backgroundImage:
    "linear-gradient(rgba(14, 116, 144, 0.07) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.07) 1px, transparent 1px), " +
    "linear-gradient(rgba(14, 116, 144, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
  backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

export function PhysicsHubPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={BLUEPRINT_BG}>
      <div className="max-w-6xl mx-auto">
        {/* ── Hero — dark blueprint header card ─────────────────── */}
        <header
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 sm:px-10 py-9 sm:py-12 mb-10 shadow-lg"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56, 189, 248, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(56, 189, 248, 0.10) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          {/* corner spec marks */}
          <CornerMarks />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/60 text-cyan-300 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Atom className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>

            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300/80 mb-2 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Science Hub", "មជ្ឈមណ្ឌលវិទ្យាសាស្ត្រ")}</span>
                <span className="opacity-50">/</span>
                <span>{t("Physics", "រូបវិទ្យា")}</span>
              </div>

              <h1
                className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t("Physics Hub", "មជ្ឈមណ្ឌលរូបវិទ្យា")}
              </h1>

              <p
                className={`mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "Discover the fundamental rules of the universe, from moving objects to the nature of light.",
                  "ស្វែងយល់ពីច្បាប់មូលដ្ឋាននៃសកលលោក ចាប់ពីវត្ថុមានចលនា រហូតដល់ធម្មជាតិនៃពន្លឺ។",
                )}
              </p>

              {/* spec line */}
              <div
                className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-slate-400 ${
                  kh ? "font-khmer text-xs" : ""
                }`}
              >
                <span>{t("MODULES: 04", "មុខវិជ្ជា៖ ០៤")}</span>
                <span className="opacity-40">|</span>
                <span>{t("LANG: EN / ខ្មែរ", "ភាសា៖ EN / ខ្មែរ")}</span>
                <span className="opacity-40">|</span>
                <span>{t("LEVEL: SECONDARY", "កម្រិត៖ មធ្យមសិក្សា")}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Physics Toolkit (Converter + Constants) ──────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start">
          <PhysicsUnitConverter t={t} kh={kh} />
          <PhysicsConstantsTable t={t} kh={kh} />
        </div>

        {/* ── Module grid ───────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mt-10">
          {PHYSICS_MODULES.map((m) => (
            <ModuleCard key={m.slug} module={m} kh={kh} t={t} />
          ))}
        </div>

        {/* ── Footer ───────────────────────────────────────────── */}
        <p
          className={`mt-10 text-center text-xs sm:text-sm text-muted-foreground ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "Pick any module to begin. New to physics? Module 1 (Motion) is the natural starting point.",
            "ជ្រើសរើសមុខវិជ្ជាណាមួយដើម្បីចាប់ផ្តើម។ ទើបនឹងស្គាល់រូបវិទ្យា? មុខវិជ្ជាទី ១ (ចលនា) គឺជាចំណុចចាប់ផ្តើមធម្មជាតិ។",
          )}
        </p>
      </div>
    </div>
  );
}

// ── Module card with blueprint styling ────────────────────────────────────
function ModuleCard({
  module: m,
  kh,
  t,
}: {
  module: PhysicsModule;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const Icon = m.icon;
  return (
    <Link
      href={`/physics/${m.slug}`}
      className={`group relative block rounded-2xl border-2 ${m.accent.border} shadow-sm hover:shadow-lg ${m.accent.glow} hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current overflow-hidden`}
      style={CARD_BG}
    >
      <CornerMarks subtle />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start gap-4 mb-3">
          <div
            className={`w-12 h-12 rounded-xl ${m.accent.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${m.accent.code}`}
              >
                {m.code}
              </span>
              <span className="text-slate-300">·</span>
              <span
                className={`text-[10px] font-bold tracking-widest uppercase ${m.accent.title} opacity-70 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t(`Module ${m.number}`, `មុខវិជ្ជា ${m.number}`)}
              </span>
            </div>
            <h2
              className={`text-lg sm:text-xl font-bold ${m.accent.title} leading-tight ${
                kh ? "font-khmer" : ""
              }`}
            >
              {kh ? m.titleKh : m.titleEn}
            </h2>
          </div>
        </div>

        <p
          className={`text-sm text-foreground/80 leading-relaxed mb-4 ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {kh ? m.blurbKh : m.blurbEn}
        </p>

        <div className="border-t border-dashed border-slate-200 pt-3 mb-4">
          <div
            className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Content focus", "មាតិកាសំខាន់")}
          </div>
          <ul className="flex flex-wrap gap-1.5" aria-label={kh ? "ប្រធានបទ" : "Topics"}>
            {(kh ? m.topicsKh : m.topicsEn).map((topic, i) => (
              <li
                key={i}
                className={`inline-block text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded border ${m.accent.chipBorder} ${m.accent.chipText} bg-white/60 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 text-sm font-bold ${m.accent.title} group-hover:gap-2 transition-all ${
            kh ? "font-khmer" : ""
          }`}
        >
          {t("Open module", "បើកមុខវិជ្ជា")}
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

// Decorative corner brackets — give the cards an "engineering drawing" feel
function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-slate-300/70" : "border-cyan-400/60";
  const size = subtle ? "w-3 h-3" : "w-4 h-4";
  return (
    <>
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 left-2 ${size} border-t-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 right-2 ${size} border-t-2 border-r-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 ${size} border-b-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 ${size} border-b-2 border-r-2 ${stroke}`} />
    </>
  );
}

// ── Placeholder module page (shared by all 4 module slugs) ────────────────
// Keeps card links functional and bilingual until the full lessons ship.
export function PhysicsModulePlaceholder() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [, params] = useRoute<{ slug: string }>("/physics/:slug");
  const slug = params?.slug ?? "";
  const m = PHYSICS_MODULES.find((x) => x.slug === slug);

  if (!m) {
    return (
      <div className="min-h-screen py-12 px-4" style={BLUEPRINT_BG}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            {t("Module not found", "រកមិនឃើញមុខវិជ្ជា")}
          </h1>
          <Link
            href="/physics"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-900"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = m.icon;

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={BLUEPRINT_BG}>
      <div className="max-w-3xl mx-auto">
        <Link
          href="/physics"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
        </Link>

        <div
          className={`relative rounded-3xl border-2 ${m.accent.border} p-6 sm:p-8 shadow-sm overflow-hidden`}
          style={CARD_BG}
        >
          <CornerMarks subtle />
          <div className="relative">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl ${m.accent.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${m.accent.code}`}>
                  {m.code}
                </span>
                <h1 className={`font-display text-2xl sm:text-3xl font-bold ${m.accent.title} leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
                  {kh ? m.titleKh : m.titleEn}
                </h1>
              </div>
            </div>

            <p className={`text-base text-foreground/80 leading-relaxed mb-6 ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? m.blurbKh : m.blurbEn}
            </p>

            <div className="border-t border-dashed border-slate-200 pt-4 mb-6">
              <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("You'll learn", "អ្នកនឹងរៀន")}
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {(kh ? m.topicsKh : m.topicsEn).map((topic, i) => (
                  <li
                    key={i}
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded border ${m.accent.chipBorder} ${m.accent.chipText} bg-white/60 ${kh ? "font-khmer" : ""}`}
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-slate-50 border border-dashed border-slate-300 px-4 py-3">
              <p className={`text-sm text-slate-700 ${kh ? "font-khmer leading-loose" : ""}`}>
                <strong className="font-mono text-[10px] tracking-widest uppercase text-slate-500 mr-2">
                  {t("STATUS", "ស្ថានភាព")}
                </strong>
                {t(
                  "Detailed lessons for this module are launching soon.",
                  "មេរៀនលម្អិតសម្រាប់មុខវិជ្ជានេះនឹងចាប់ផ្តើមក្នុងពេលឆាប់ៗនេះ។",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Physics Unit Converter ─────────────────────────────────────────── */
type ConvT = (en: string, kh: string) => string;

type UnitDef = {
  key: string;
  symbol: string;
  nameEn: string;
  nameKh: string;
  /** Multiplier to convert this unit → category base unit. */
  toBase: number;
  /** Imperial / non-metric — only shown when "Practical Units" is on. */
  practical?: boolean;
};

type Category = {
  key: "distance" | "mass" | "time";
  labelEn: string;
  labelKh: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: { bar: string; chip: string; ring: string; text: string };
  units: UnitDef[];
};

const CATEGORIES: Category[] = [
  {
    key: "distance",
    labelEn: "Distance",
    labelKh: "ចម្ងាយ",
    icon: Ruler,
    accent: {
      bar: "bg-cyan-600",
      chip: "bg-cyan-100 text-cyan-900 border-cyan-300",
      ring: "ring-cyan-400",
      text: "text-cyan-700",
    },
    units: [
      { key: "mm", symbol: "mm", nameEn: "Millimeter", nameKh: "មិល្លីម៉ែត្រ", toBase: 0.001 },
      { key: "cm", symbol: "cm", nameEn: "Centimeter", nameKh: "សង់ទីម៉ែត្រ", toBase: 0.01 },
      { key: "m",  symbol: "m",  nameEn: "Meter",      nameKh: "ម៉ែត្រ",       toBase: 1 },
      { key: "km", symbol: "km", nameEn: "Kilometer",  nameKh: "គីឡូម៉ែត្រ",   toBase: 1000 },
      { key: "in", symbol: "in", nameEn: "Inch",       nameKh: "អ៊ីញ",         toBase: 0.0254, practical: true },
    ],
  },
  {
    key: "mass",
    labelEn: "Mass",
    labelKh: "ម៉ាស់",
    icon: Weight,
    accent: {
      bar: "bg-rose-600",
      chip: "bg-rose-100 text-rose-900 border-rose-300",
      ring: "ring-rose-400",
      text: "text-rose-700",
    },
    units: [
      { key: "mg", symbol: "mg", nameEn: "Milligram", nameKh: "មិល្លីក្រាម", toBase: 0.000001 },
      { key: "g",  symbol: "g",  nameEn: "Gram",      nameKh: "ក្រាម",        toBase: 0.001 },
      { key: "kg", symbol: "kg", nameEn: "Kilogram",  nameKh: "គីឡូក្រាម",    toBase: 1 },
      { key: "lb", symbol: "lb", nameEn: "Pound",     nameKh: "ផោន",          toBase: 0.45359237, practical: true },
    ],
  },
  {
    key: "time",
    labelEn: "Time",
    labelKh: "ពេលវេលា",
    icon: Clock,
    accent: {
      bar: "bg-amber-600",
      chip: "bg-amber-100 text-amber-900 border-amber-300",
      ring: "ring-amber-400",
      text: "text-amber-700",
    },
    units: [
      { key: "s",   symbol: "s",   nameEn: "Second", nameKh: "វិនាទី",  toBase: 1 },
      { key: "min", symbol: "min", nameEn: "Minute", nameKh: "នាទី",    toBase: 60 },
      { key: "h",   symbol: "h",   nameEn: "Hour",   nameKh: "ម៉ោង",    toBase: 3600 },
    ],
  },
];

/** Format a number with scientific notation for very large/small values. */
function formatValue(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e6 || abs < 1e-3) {
    // Scientific notation: 4 significant digits
    const [mantissa, exp] = n.toExponential(4).split("e");
    const m = parseFloat(mantissa).toString(); // strip trailing zeros
    return `${m}e${parseInt(exp, 10)}`;
  }
  // Plain format with up to 6 significant digits, no trailing zeros
  const s = n.toPrecision(8);
  const num = parseFloat(s);
  return num.toString();
}

function PhysicsUnitConverter({ t, kh }: { t: ConvT; kh: boolean }) {
  const [activeKey, setActiveKey] = useState<Category["key"]>("distance");
  const [practicalOn, setPracticalOn] = useState(false);
  /** Per-category source state: { unitKey, rawValue } so the typed text stays exact */
  const [source, setSource] = useState<
    Record<Category["key"], { unitKey: string; raw: string }>
  >({
    distance: { unitKey: "m", raw: "1" },
    mass: { unitKey: "kg", raw: "1" },
    time: { unitKey: "s", raw: "1" },
  });

  const active = CATEGORIES.find((c) => c.key === activeKey)!;
  // Visible units depend on the Practical toggle.
  const visibleUnits = useMemo(
    () => active.units.filter((u) => !u.practical || practicalOn),
    [active.units, practicalOn],
  );
  const hasPractical = active.units.some((u) => u.practical);

  // If the user turned the toggle OFF while a practical unit was the source,
  // persist a fallback to the category's base unit (toBase === 1) and convert
  // the value so numeric intent is preserved (e.g. 12 in → 0.3048 m).
  useEffect(() => {
    const rawSrc = source[activeKey];
    const rawSrcUnit = active.units.find((u) => u.key === rawSrc.unitKey);
    if (!rawSrcUnit || (rawSrcUnit.practical && !practicalOn)) {
      const fallback =
        visibleUnits.find((u) => u.toBase === 1) ?? visibleUnits[0];
      const n = parseFloat(rawSrc.raw);
      const converted =
        rawSrcUnit && isFinite(n) && !isNaN(n)
          ? formatValue(n * rawSrcUnit.toBase) // base unit ⇒ divide by 1
          : "1";
      setSource((prev) => ({
        ...prev,
        [activeKey]: { unitKey: fallback.key, raw: converted },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practicalOn, activeKey]);

  const src = source[activeKey];
  const srcUnit =
    active.units.find((u) => u.key === src.unitKey) ??
    visibleUnits.find((u) => u.toBase === 1) ??
    visibleUnits[0];

  // Compute the base value (e.g. meters / kilograms / seconds) from the source.
  const baseValue = useMemo(() => {
    const n = parseFloat(src.raw);
    if (!isFinite(n) || isNaN(n)) return null;
    return n * srcUnit.toBase;
  }, [src.raw, srcUnit.toBase]);

  const handleChange = (unitKey: string, raw: string) => {
    setSource((prev) => ({ ...prev, [activeKey]: { unitKey, raw } }));
  };

  return (
    <section
      aria-label={t("Physics Unit Converter", "ឧបករណ៍បំប្លែងឯកតារូបវិទ្យា")}
      className="mt-8 rounded-3xl border-2 border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b-2 border-slate-200 bg-gradient-to-br from-slate-50 via-white to-cyan-50/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div
              className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-slate-700 ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {t("Physics Toolkit", "ឧបករណ៍រូបវិទ្យា")}
            </div>
            <h2
              className={`text-base sm:text-lg font-bold text-slate-900 leading-tight ${
                kh ? "font-khmer leading-relaxed" : "font-display"
              }`}
            >
              {t("Physics Unit Converter", "ឧបករណ៍បំប្លែងឯកតារូបវិទ្យា")}
            </h2>
            <p
              className={`text-xs sm:text-sm text-slate-600 leading-snug mt-0.5 ${
                kh ? "font-khmer leading-relaxed" : ""
              }`}
            >
              {t(
                "Type any value — every other unit updates instantly.",
                "វាយតម្លៃណាមួយ — ឯកតាផ្សេងៗទាំងអស់នឹងធ្វើបច្ចុប្បន្នភាពភ្លាមៗ។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Practical Units toggle */}
      <div className="px-4 sm:px-6 py-3 border-b border-slate-200 bg-white flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div
            className={`text-xs sm:text-sm font-semibold text-slate-900 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t("Practical Units", "ឯកតាអនុវត្តជាក់ស្តែង")}
          </div>
          <div
            className={`text-[10px] sm:text-[11px] text-slate-500 leading-snug ${
              kh ? "font-khmer leading-relaxed text-[11px] sm:text-xs" : ""
            }`}
          >
            {practicalOn
              ? t(
                  "Imperial units (inch, pound) shown alongside metric.",
                  "បង្ហាញឯកតាអង់គ្លេស (អ៊ីញ ផោន) រួមជាមួយឯកតាម៉ែត្រ។",
                )
              : t(
                  "Scientific Mode — metric units only.",
                  "របៀបវិទ្យាសាស្ត្រ — តែឯកតាម៉ែត្រប៉ុណ្ណោះ។",
                )}
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={practicalOn}
          aria-label={t("Practical Units", "ឯកតាអនុវត្តជាក់ស្តែង")}
          onClick={() => setPracticalOn((v) => !v)}
          disabled={!hasPractical}
          className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 ${
            !hasPractical
              ? "bg-slate-200 opacity-50 cursor-not-allowed"
              : practicalOn
              ? "bg-amber-500"
              : "bg-slate-300"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
              practicalOn ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label={t("Conversion category", "ប្រភេទនៃការបំប្លែង")}
        className="flex gap-1 sm:gap-2 px-3 sm:px-5 pt-3 sm:pt-4 border-b border-slate-200 bg-slate-50/60"
      >
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          const isActive = c.key === activeKey;
          return (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveKey(c.key)}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-b-2 ${
                isActive
                  ? `${c.accent.bar} text-white border-transparent shadow-sm`
                  : "bg-white/60 text-slate-700 border-transparent hover:bg-white"
              } ${kh ? "font-khmer" : ""}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{t(c.labelEn, c.labelKh)}</span>
            </button>
          );
        })}
      </div>

      {/* Inputs (vertical stack for mobile-first) */}
      <div className="p-4 sm:p-6 space-y-3">
        {visibleUnits.map((u) => {
          const isSource = u.key === src.unitKey;
          // For source, show the user's raw text exactly; for others, derived value
          const display = isSource
            ? src.raw
            : baseValue === null
            ? ""
            : formatValue(baseValue / u.toBase);

          return (
            <label
              key={u.key}
              htmlFor={`conv-${active.key}-${u.key}`}
              className={`group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 rounded-2xl border-2 px-3 sm:px-4 py-3 transition-all cursor-text ${
                isSource
                  ? `${active.accent.chip} ring-2 ${active.accent.ring} shadow-sm`
                  : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Unit name */}
              <div className="flex items-center gap-2 sm:w-44 sm:flex-shrink-0">
                <span
                  className={`inline-flex items-center justify-center min-w-[2.75rem] h-8 px-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono font-bold text-sm shadow-sm relative`}
                >
                  {u.symbol}
                  {u.practical && (
                    <span
                      aria-hidden="true"
                      title="Imperial"
                      className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center min-w-[1rem] h-4 px-1 rounded-full bg-amber-500 text-white text-[9px] font-bold leading-none"
                    >
                      lb/in
                    </span>
                  )}
                </span>
                <div className="min-w-0">
                  <div
                    className={`text-sm font-semibold leading-tight ${
                      isSource ? "" : "text-slate-800"
                    } ${kh ? "font-khmer" : ""}`}
                  >
                    {t(u.nameEn, u.nameKh)}
                  </div>
                  <div
                    className={`text-[10px] uppercase tracking-wider opacity-70 ${
                      kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
                    }`}
                  >
                    {kh ? u.nameEn : u.nameKh}
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="flex-1">
                <input
                  id={`conv-${active.key}-${u.key}`}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={display}
                  onChange={(e) => handleChange(u.key, e.target.value)}
                  onFocus={(e) => {
                    if (!isSource) {
                      // Promote this unit to the source on focus
                      handleChange(u.key, display);
                    }
                    e.currentTarget.select();
                  }}
                  placeholder="0"
                  aria-label={t(
                    `Value in ${u.nameEn}`,
                    `តម្លៃជា${u.nameKh}`,
                  )}
                  className={`w-full bg-white rounded-xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 text-right font-mono text-base sm:text-lg font-semibold text-slate-900 outline-none transition-colors ${
                    isSource
                      ? `border-current ${active.accent.text}`
                      : "border-slate-200 focus:border-slate-400"
                  }`}
                />
              </div>
            </label>
          );
        })}

        {baseValue === null && src.raw.trim() !== "" && (
          <p
            className={`text-xs text-rose-600 ${
              kh ? "font-khmer leading-relaxed" : ""
            }`}
          >
            {t(
              "Please enter a valid number.",
              "សូមបញ្ចូលលេខត្រឹមត្រូវ។",
            )}
          </p>
        )}

        <p
          className={`pt-1 text-[11px] text-slate-500 leading-snug ${
            kh ? "font-khmer leading-relaxed text-xs" : ""
          }`}
        >
          {t(
            "Very large or very small numbers are shown in scientific notation (e.g. 1e3 = 1 × 10³).",
            "លេខធំ ឬតូចខ្លាំង នឹងបង្ហាញក្នុងសញ្ញាណវិទ្យាសាស្ត្រ (ឧ. 1e3 = 1 × 10³)។",
          )}
        </p>

        {/* Bilingual context note */}
        <div className="mt-2 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50/70 px-3 py-2.5">
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p
            className={`text-[11px] sm:text-xs text-amber-900 leading-snug ${
              kh ? "font-khmer leading-relaxed" : ""
            }`}
          >
            <span className="font-semibold">
              {t("Note:", "សម្គាល់៖")}
            </span>{" "}
            {t(
              "Cambodia uses the Metric system for science, but Imperial units are often found in markets and electronics.",
              "ប្រទេសកម្ពុជាប្រើប្រាស់ប្រព័ន្ធម៉ែត្រសម្រាប់វិទ្យាសាស្ត្រ ប៉ុន្តែឯកតាអង់គ្លេសត្រូវបានរកឃើញជាញឹកញាប់នៅក្នុងទីផ្សារ និងឧបករណ៍អេឡិចត្រូនិក។",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Common Physics Constants (reference manual) ────────────────────── */
type ConstT = (en: string, kh: string) => string;

type PhysicsConstant = {
  key: string;
  nameEn: string;
  nameKh: string;
  /** KaTeX symbol */
  symbolTex: string;
  /** KaTeX value (number, possibly with scientific notation) */
  valueTex: string;
  /** KaTeX unit */
  unitTex: string;
  /** Plain-text fallback for screen readers / hover */
  descEn: string;
  descKh: string;
};

const PHYSICS_CONSTANTS: PhysicsConstant[] = [
  {
    key: "c",
    nameEn: "Speed of Light",
    nameKh: "ល្បឿនពន្លឺ",
    symbolTex: "c",
    valueTex: "299{,}792{,}458",
    unitTex: "\\text{m/s}",
    descEn: "How fast light travels through empty space — the universe's speed limit.",
    descKh: "ល្បឿននៃពន្លឺឆ្លងកាត់លំហអវកាសទទេ — ល្បឿនកំពូលនៃសកលលោក។",
  },
  {
    key: "g",
    nameEn: "Acceleration of Gravity",
    nameKh: "សន្ទុះទំនាញផែនដី",
    symbolTex: "g",
    valueTex: "9.81",
    unitTex: "\\text{m/s}^2",
    descEn: "The rate at which objects fall on Earth.",
    descKh: "អត្រាដែលវត្ថុធ្លាក់លើផែនដី។",
  },
  {
    key: "G",
    nameEn: "Universal Gravitational Constant",
    nameKh: "ថេរទំនាញសកល",
    symbolTex: "G",
    valueTex: "6.674 \\times 10^{-11}",
    unitTex: "\\text{N·m}^2/\\text{kg}^2",
    descEn: "How strongly any two masses attract each other across space.",
    descKh: "កម្លាំងទាក់ទាញរវាងម៉ាស់ពីរណាមួយឆ្លងកាត់លំហ។",
  },
  {
    key: "h",
    nameEn: "Planck's Constant",
    nameKh: "ថេរផ្លង់",
    symbolTex: "h",
    valueTex: "6.626 \\times 10^{-34}",
    unitTex: "\\text{J·s}",
    descEn: "The smallest 'packet' of energy — the heart of quantum physics.",
    descKh: "កញ្ចប់ថាមពលតូចបំផុត — ខ្លឹមសារនៃរូបវិទ្យាក្វាន់ទុំ។",
  },
  {
    key: "e",
    nameEn: "Elementary Charge",
    nameKh: "បន្ទុកអគ្គិសនីមូលដ្ឋាន",
    symbolTex: "e",
    valueTex: "1.602 \\times 10^{-19}",
    unitTex: "\\text{C}",
    descEn: "The electric charge carried by a single proton (or electron).",
    descKh: "បន្ទុកអគ្គិសនីដែលផ្ទុកដោយប្រូតុង (ឬអេឡិចត្រុង) មួយ។",
  },
];

function PhysicsConstantsTable({ t, kh }: { t: ConstT; kh: boolean }) {
  return (
    <section
      aria-label={t("Common Physics Constants", "ថេររូបវិទ្យាទូទៅ")}
      className="rounded-3xl border-2 border-slate-300 bg-[radial-gradient(circle_at_top_right,_rgba(148,163,184,0.10),transparent_60%)] bg-slate-50 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 sm:py-5 border-b-2 border-slate-300 bg-gradient-to-br from-slate-100 via-slate-50 to-stone-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-stone-800 text-amber-100 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div
              className={`text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-stone-700 ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {t("Reference Manual", "សៀវភៅយោង")}
            </div>
            <h2
              className={`text-base sm:text-lg font-bold text-stone-900 leading-tight ${
                kh ? "font-khmer leading-relaxed" : "font-display"
              }`}
            >
              {t("Common Physics Constants", "ថេររូបវិទ្យាទូទៅ")}
            </h2>
          </div>
          <div
            className={`hidden sm:flex items-center gap-1 text-[10px] font-mono text-stone-500 ${
              kh ? "font-khmer text-xs" : ""
            }`}
            aria-hidden="true"
          >
            <Info className="w-3 h-3" />
            <span>{t("Hover for details", "ផ្លាស់ទីលើដើម្បីមើលព័ត៌មាន")}</span>
          </div>
        </div>
      </div>

      {/* Table — desktop */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-stone-100/70 border-b-2 border-stone-300">
              <th
                scope="col"
                className={`text-left text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-stone-700 px-4 py-2.5 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Constant", "ឈ្មោះថេរ")}
              </th>
              <th
                scope="col"
                className={`text-center text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-stone-700 px-3 py-2.5 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Symbol", "និមិត្តសញ្ញា")}
              </th>
              <th
                scope="col"
                className={`text-right text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-stone-700 px-4 py-2.5 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Value", "តម្លៃ")}
              </th>
              <th
                scope="col"
                className={`text-left text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-stone-700 px-4 py-2.5 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Unit", "ឯកតា")}
              </th>
            </tr>
          </thead>
          <tbody>
            {PHYSICS_CONSTANTS.map((c, idx) => (
              <tr
                key={c.key}
                className={`border-b border-stone-200 last:border-0 transition-colors hover:bg-amber-50/60 ${
                  idx % 2 === 0 ? "bg-white/40" : "bg-stone-50/40"
                }`}
              >
                <td className="px-4 py-3 align-middle">
                  <span
                    tabIndex={0}
                    title={t(c.descEn, c.descKh)}
                    aria-label={`${t(c.nameEn, c.nameKh)}. ${t(c.descEn, c.descKh)}`}
                    className={`group relative inline-flex items-center gap-1.5 cursor-help underline decoration-dotted decoration-stone-400 underline-offset-4 text-sm font-semibold text-stone-900 outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded ${
                      kh ? "font-khmer" : ""
                    }`}
                  >
                    {t(c.nameEn, c.nameKh)}
                    <Info
                      className="w-3 h-3 text-stone-400 group-hover:text-stone-600"
                      aria-hidden="true"
                    />
                    {/* Tooltip */}
                    <span
                      role="tooltip"
                      className={`pointer-events-none absolute left-0 top-full mt-1 z-30 w-64 max-w-[16rem] rounded-lg bg-stone-900 text-white text-[11px] leading-relaxed px-3 py-2 shadow-xl opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus:opacity-100 group-focus:visible group-focus:translate-y-0 transition-all ${
                        kh ? "font-khmer leading-relaxed" : ""
                      }`}
                    >
                      <span className="block font-semibold mb-0.5">
                        {t(c.nameEn, c.nameKh)}
                      </span>
                      <span className="block opacity-90">
                        {t(c.descEn, c.descKh)}
                      </span>
                    </span>
                  </span>
                  <div
                    className={`text-[10px] uppercase tracking-wider text-stone-500 mt-0.5 ${
                      kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
                    }`}
                  >
                    {kh ? c.nameEn : c.nameKh}
                  </div>
                </td>
                <td className="px-3 py-3 text-center align-middle">
                  <span className="inline-block min-w-[2rem]">
                    <InlineMath math={c.symbolTex} />
                  </span>
                </td>
                <td className="px-4 py-3 text-right align-middle font-mono text-sm text-stone-900 whitespace-nowrap">
                  <InlineMath math={c.valueTex} />
                </td>
                <td className="px-4 py-3 align-middle text-sm text-stone-700 whitespace-nowrap">
                  <InlineMath math={c.unitTex} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile — stacked cards */}
      <ul className="sm:hidden divide-y divide-stone-200">
        {PHYSICS_CONSTANTS.map((c) => (
          <li key={c.key} className="px-4 py-3">
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <span
                tabIndex={0}
                title={t(c.descEn, c.descKh)}
                className={`text-sm font-semibold text-stone-900 underline decoration-dotted decoration-stone-400 underline-offset-4 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t(c.nameEn, c.nameKh)}
              </span>
              <span className="text-base font-mono text-stone-700 flex-shrink-0">
                <InlineMath math={c.symbolTex} />
              </span>
            </div>
            <div
              className={`text-[10px] uppercase tracking-wider text-stone-500 mb-2 ${
                kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
              }`}
            >
              {kh ? c.nameEn : c.nameKh}
            </div>
            <div className="flex items-baseline gap-2 font-mono text-sm">
              <span className="text-stone-900">
                <InlineMath math={c.valueTex} />
              </span>
              <span className="text-stone-600">
                <InlineMath math={c.unitTex} />
              </span>
            </div>
            <p
              className={`mt-1.5 text-[11px] text-stone-600 leading-snug ${
                kh ? "font-khmer leading-relaxed text-xs" : ""
              }`}
            >
              {t(c.descEn, c.descKh)}
            </p>
          </li>
        ))}
      </ul>

      {/* Footnote */}
      <div className="px-5 sm:px-6 py-3 border-t border-stone-200 bg-stone-50/80">
        <p
          className={`text-[10px] sm:text-[11px] text-stone-500 leading-snug ${
            kh ? "font-khmer leading-relaxed text-[11px] sm:text-xs" : ""
          }`}
        >
          {t(
            "Source: CODATA recommended values. Hover or tap a name to learn what it means.",
            "ប្រភព៖ តម្លៃណែនាំរបស់ CODATA។ ផ្លាស់ទីលើ ឬប៉ះឈ្មោះ ដើម្បីយល់ពីអត្ថន័យ។",
          )}
        </p>
      </div>
    </section>
  );
}
