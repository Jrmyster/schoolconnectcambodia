import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  AlertTriangle,
  Clock,
  Compass,
  Droplets,
  Fish,
  Globe2,
  Info,
  Layers,
  Mountain,
  Rocket,
  Ruler,
  Sparkles,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  GEO-02 · Geological Wonders: The Earth's Sculptures
//          អច្ឆរិយភូមិសាស្ត្រ៖ ចម្លាក់របស់ផែនដី
//
//  1. The Power of Erosion    · Grand Canyon (slow) + Niagara Falls (violent)
//  2. Tectonic Extremes       · Mariana Trench (subduction)
//  3. The Living Geography    · Great Barrier Reef (built by life)
//
//  Aesthetic: Planet Earth — deep ocean blues, sandstone oranges, lush greens.
// ════════════════════════════════════════════════════════════════════════════

const OCEAN_DEEP = "#0c4a6e";    // ocean blue (subduction)
const OCEAN      = "#0284c7";
const OCEAN_LIGHT = "#bae6fd";

const SAND_DEEP  = "#9a3412";    // canyon orange
const SAND       = "#ea580c";
const SAND_LIGHT = "#fed7aa";

const REEF       = "#0d9488";    // teal — coral / reef
const REEF_LIGHT = "#99f6e4";

const LEAF       = "#15803d";    // living green
const LEAF_LIGHT = "#bbf7d0";

const SUN        = "#d97706";    // accent
const ROSE       = "#be123c";    // alarm

const CREAM = "#fefce8";
const PARCH = "#fff7ed";
const INK   = "#0f172a";

const FRAME: React.CSSProperties = {
  backgroundColor: CREAM,
  backgroundImage:
    `radial-gradient(circle at 12% 18%, rgba(2, 132, 199, 0.07), transparent 45%),` +
    `radial-gradient(circle at 88% 82%, rgba(234, 88, 12, 0.07), transparent 50%),` +
    `linear-gradient(${PARCH}, ${CREAM})`,
};

type T = (en: string, kh: string) => string;

// ─── Section header ────────────────────────────────────────────────────────

function SectionHeader({
  spec,
  en,
  kh,
  k,
  Icon,
  accent,
}: {
  spec: string;
  en: string;
  kh: string;
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 flex-wrap">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded-full px-3 py-1 shadow-sm"
        style={{ backgroundColor: accent }}
      >
        SEC-{spec}
      </span>
      <Icon className="w-5 h-5" style={{ color: accent }} />
      <h2
        className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
        style={{ color: INK }}
      >
        {k ? kh : en}
      </h2>
      <div
        className="flex-1 border-t-2 border-dotted"
        style={{ borderColor: `${accent}55` }}
      />
    </div>
  );
}

// ─── Concept card ──────────────────────────────────────────────────────────

type ConceptCardProps = {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enName: string;
  khName: string;
  enTag: string;
  khTag: string;
  enBody?: string;
  khBody?: string;
  accent: string;
  glow?: boolean;
  badge?: { en: string; kh: string };
  children?: React.ReactNode;
};

function ConceptCard({
  k,
  Icon,
  enName,
  khName,
  enTag,
  khTag,
  enBody,
  khBody,
  accent,
  glow = false,
  badge,
  children,
}: ConceptCardProps) {
  return (
    <div
      className="relative rounded-3xl p-5 sm:p-6 bg-white border-2 overflow-hidden flex flex-col"
      style={{
        borderColor: `${accent}55`,
        boxShadow: glow
          ? `0 0 0 1px ${accent}22 inset, 0 12px 30px -16px ${accent}66`
          : "0 6px 18px -12px rgba(15, 23, 42, 0.18)",
      }}
      data-testid={`concept-card-${enName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: `${accent}14`,
            border: `1px solid ${accent}44`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`}
            style={{ color: INK }}
          >
            {k ? khName : enName}
          </h3>
          <div
            className={`text-[11px] mt-0.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
            style={{ color: accent }}
          >
            {k ? khTag : enTag}
          </div>
        </div>
        {badge ? (
          <span
            className={`text-[10px] px-2 py-1 rounded-full text-white ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
            style={{ backgroundColor: accent }}
          >
            {k ? badge.kh : badge.en}
          </span>
        ) : null}
      </div>

      {enBody && khBody ? (
        <p
          className={`text-sm sm:text-[15px] text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {k ? khBody : enBody}
        </p>
      ) : null}

      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

// ─── Pull-out callout ──────────────────────────────────────────────────────

function Callout({
  k,
  Icon,
  labelEn,
  labelKh,
  enTitle,
  khTitle,
  enBody,
  khBody,
  accent,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  labelEn: string;
  labelKh: string;
  enTitle: string;
  khTitle: string;
  enBody: string;
  khBody: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 border-l-4 border"
      style={{
        backgroundColor: `${accent}10`,
        borderLeftColor: accent,
        borderColor: `${accent}33`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="w-4 h-4" style={{ color: accent }} />
        <span
          className={`text-[10px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
          style={{ color: accent }}
        >
          {k ? labelKh : labelEn}
        </span>
      </div>
      <h4
        className={`font-bold text-sm sm:text-base mb-1 ${k ? "font-khmer" : ""}`}
        style={{ color: INK }}
      >
        {k ? khTitle : enTitle}
      </h4>
      <p
        className={`text-xs sm:text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {k ? khBody : enBody}
      </p>
    </div>
  );
}

// ─── Hero chip ─────────────────────────────────────────────────────────────

function HeroChip({
  color,
  k,
  en,
  kh,
}: {
  color: string;
  k: boolean;
  en: string;
  kh: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border bg-white/85 backdrop-blur-sm ${k ? "font-khmer" : ""}`}
      style={{ color, borderColor: `${color}88` }}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {k ? kh : en}
    </span>
  );
}

// ─── Decorative SVG: planet curvature hero ─────────────────────────────────

function PlanetSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 220"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {/* deep ocean curve */}
      <path
        d="M0,180 Q200,140 400,150 T800,160 L800,220 L0,220 Z"
        fill="rgba(12, 74, 110, 0.55)"
      />
      {/* shallows */}
      <path
        d="M0,200 Q200,170 400,178 T800,185 L800,220 L0,220 Z"
        fill="rgba(2, 132, 199, 0.55)"
      />
      {/* canyon profile (right side) */}
      <path
        d="M520,120 L545,100 L560,140 L580,108 L605,150 L630,118 L660,155 L685,124 L720,158 L745,130 L780,162 L800,138 L800,220 L520,220 Z"
        fill="rgba(234, 88, 12, 0.45)"
      />
      {/* sun */}
      <circle cx="115" cy="55" r="30" fill="rgba(254, 240, 138, 0.85)" />
      <circle cx="115" cy="55" r="20" fill="rgba(253, 224, 71, 0.95)" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function GeologicalWondersPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={FRAME}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors ${k ? "font-khmer" : ""}`}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* Hero */}
        <header
          className="relative rounded-[2rem] p-6 sm:p-9 mb-10 overflow-hidden shadow-xl border"
          style={{
            borderColor: `${OCEAN}55`,
            backgroundImage: `linear-gradient(180deg, #e0f2fe 0%, #bae6fd 45%, #fed7aa 100%)`,
          }}
        >
          <PlanetSilhouette className="absolute bottom-0 left-0 w-full h-32 sm:h-40 opacity-90 pointer-events-none" />

          <div className="relative flex items-start gap-4">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border bg-white/85 backdrop-blur-sm"
              style={{ borderColor: `${OCEAN}66` }}
            >
              <Globe2 className="w-8 h-8" style={{ color: OCEAN_DEEP }} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`flex items-center gap-2 text-xs mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}
                style={{ color: OCEAN_DEEP }}
              >
                <span>{t("Earth Science", "វិទ្យាសាស្ត្រផែនដី")}</span>
                <span>·</span>
                <span>GEO-02</span>
              </div>
              <h1
                className={`text-3xl sm:text-4xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
                style={{ color: INK }}
                data-testid="page-title"
              >
                {t(
                  "Geological Wonders: The Earth's Sculptures",
                  "អច្ឆរិយភូមិសាស្ត្រ៖ ចម្លាក់របស់ផែនដី"
                )}
              </h1>
              <p
                className={`mt-3 text-sm sm:text-base text-slate-700 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              >
                {t(
                  "The Earth is the largest sculptor that has ever existed. With nothing but water, wind, time, and the slow drift of continents, it has carved canyons deeper than skyscrapers are tall, dropped trenches deeper than mountains are high, and even let living creatures build a structure visible from space. These are not accidents. They are the planet's patient, billion-year-old artworks.",
                  "ផែនដីគឺជាជាងចម្លាក់ដ៏ធំជាងគេបំផុតដែលធ្លាប់មាន។ ដោយគ្មានអ្វីក្រៅពីទឹក ខ្យល់ ពេលវេលា និងចលនាយឺតៗរបស់ទ្វីប វាបានឆ្លាក់អន្លង់ដែលជ្រៅជាងអាគារខ្ពស់ៗ ទម្លាក់រណ្តៅដែលជ្រៅជាងភ្នំខ្ពស់ និងសូម្បីតែអនុញ្ញាតឲ្យសត្វមានជីវិតសាងសង់សំណង់មួយដែលអាចមើលឃើញពីលំហ។ ទាំងនេះមិនមែនជាគ្រោះថ្នាក់ទេ។ ពួកវាគឺជាស្នាដៃសិល្បៈអត់ធ្មត់ដែលមានអាយុរាប់ពាន់លានឆ្នាំរបស់ភពនេះ។"
                )}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <HeroChip color={SAND_DEEP} k={k} en="Erosion"          kh="ការសឹកសំណឹក" />
                <HeroChip color={OCEAN}     k={k} en="Subduction"       kh="ការមុជផ្ទាំងសិលា" />
                <HeroChip color={REEF}      k={k} en="Living geography" kh="ភូមិសាស្ត្រមានជីវិត" />
                <HeroChip color={SUN}       k={k} en="Deep time"        kh="ពេលវេលាជ្រាលជ្រៅ" />
              </div>
            </div>
          </div>
        </header>

        <SectionErosion       k={k} t={t} />
        <SectionTectonic      k={k} t={t} />
        <SectionLivingReef    k={k} t={t} />

        {/* Closing */}
        <div
          className="mt-12 rounded-3xl border-2 p-5 sm:p-6 flex items-start gap-3 shadow"
          style={{
            borderColor: `${OCEAN}66`,
            backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${OCEAN_LIGHT}cc 100%)`,
          }}
          data-testid="closing-note"
        >
          <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: OCEAN_DEEP }} />
          <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong className={k ? "" : "font-bold"}>
              {t("The big idea: ", "គំនិតធំ ៖ ")}
            </strong>
            {t(
              "Earth's most spectacular landmarks were not built in a single dramatic moment. The Grand Canyon is six million years of one quiet river. The Mariana Trench is two continental plates leaning on each other forever. The Great Barrier Reef is uncountable tiny lives stacked on the skeletons of their ancestors. Patience, on a planetary scale, is more powerful than any explosion.",
              "ស្នាដៃភូមិសាស្ត្រដ៏អស្ចារ្យបំផុតរបស់ផែនដី មិនត្រូវបានសាងសង់ឡើងក្នុងពេលតែមួយដ៏អស្ចារ្យទេ។ មហាអន្លង់ធំ គឺជាទន្លេស្ងៀមមួយរយៈពេល ៦ លានឆ្នាំ។ អន្លង់ម៉ារីយ៉ាណា គឺជាផ្ទាំងសិលាទ្វីបពីរ ដែលផ្អែកលើគ្នាជារៀងរហូត។ ថ្មប៉ប្រះទឹកផ្កាថ្មដ៏អស្ចារ្យ គឺជាជីវិតតូចៗរាប់មិនអស់ ដែលជង់លើគ្រោងឆ្អឹងនៃដូនតារបស់វា។ ការអត់ធ្មត់ ក្នុងកម្រិតផ្កាយមួយ មានអំណាចជាងការផ្ទុះណាមួយ។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold shadow hover:opacity-90 transition-opacity ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: OCEAN_DEEP }}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — The Power of Erosion
// ════════════════════════════════════════════════════════════════════════════

function SectionErosion({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-erosion">
      <SectionHeader
        spec="01"
        en="The Power of Erosion"
        kh="ថាមពលនៃការសឹកសំណឹក"
        k={k}
        Icon={Droplets}
        accent={SAND_DEEP}
      />

      <p className={`text-sm text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "Erosion is the planet's slowest, most stubborn artist. It works in two opposite styles: the patient sculptor — water, wind, and ice that carve a single grain of stone away each day for millions of years — and the violent demolisher, where sudden, massive force tears the landscape apart in chunks.",
          "ការសឹកសំណឹក គឺជាសិល្បករដ៏យឺត និងមុតមាំបំផុតរបស់ភពនេះ។ វាដំណើរការក្នុងរូបមន្តផ្ទុយគ្នាពីរ ៖ ជាងចម្លាក់ដ៏អត់ធ្មត់ — ទឹក ខ្យល់ និងទឹកកក ដែលឆ្លាក់គ្រាប់ថ្មមួយចេញរាល់ថ្ងៃ អស់រយៈពេលរាប់លានឆ្នាំ — និងជាងវាយបំផ្លាញដ៏ឃោរឃៅ ដែលកម្លាំងធំៗ ភ្លាមៗ ហែកដីទាំងមូលជាដុំៗ។"
        )}
      </p>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Grand Canyon */}
        <ConceptCard
          k={k}
          Icon={Mountain}
          enName="The Grand Canyon"
          khName="មហាអន្លង់ធំ"
          enTag="patient sculptor · 6 million years"
          khTag="ជាងចម្លាក់អត់ធ្មត់ · ៦ លានឆ្នាំ"
          enBody="In the dry desert of Arizona, in the United States, the Earth opens up into a wound 1,800 metres deep, 29 kilometres wide, and 446 kilometres long. The Grand Canyon was not blasted out by an earthquake. It was not opened by a volcano. It was carved, grain by grain of sand, by a single river — the Colorado — over the last six million years. Look down into it and you are looking through a stack of compressed Earth-history: the fresh red rock at the rim is around 270 million years old, and by the time your eye reaches the river at the bottom, you are staring at black stone that crystallised nearly two billion years ago. The Grand Canyon is not really a hole. It is a vertical timeline."
          khBody="នៅវាលខ្សាច់ស្ងួតនៃរដ្ឋអារីហ្សូណា សហរដ្ឋអាមេរិក ផែនដីបើកចំហជារបួសមួយជ្រៅ ១,៨០០ ម៉ែត្រ ទទឹង ២៩ គីឡូម៉ែត្រ និងវែង ៤៤៦ គីឡូម៉ែត្រ។ មហាអន្លង់ធំ មិនត្រូវបានផ្ទុះចេញដោយរញ្ជួយដីទេ។ វាមិនត្រូវបានបើកដោយភ្នំភ្លើងទេ។ វាត្រូវបានឆ្លាក់ ខ្សាច់មួយគ្រាប់ៗ ដោយទន្លេតែមួយ — ទន្លេខូឡូរ៉ាដូ — ក្នុងរយៈពេល ៦ លានឆ្នាំចុងក្រោយ។ មើលចុះទៅខាងក្នុងរបស់វា អ្នកកំពុងមើលកាត់ការជង់នៃប្រវត្តិសាស្ត្រផែនដីបង្ហាប់ ៖ ថ្មក្រហមថ្មីៗនៅគែម មានអាយុប្រហែល ២៧០ លានឆ្នាំ ហើយនៅពេលភ្នែករបស់អ្នកទៅដល់ទន្លេនៅបាត អ្នកកំពុងសម្លឹងថ្មខ្មៅ ដែលបានកក់ជាគ្រីស្តាល់ស្ទើរតែ ២ ពាន់លានឆ្នាំមុន។ មហាអន្លង់ធំ មិនមែនជារន្ធទេ។ វាគឺជាបន្ទាត់ពេលវេលាបញ្ឈរ។"
          accent={SAND_DEEP}
          glow
          badge={{ en: "1,800 m deep", kh: "ជ្រៅ ១,៨០០ ម៉ែត្រ" }}
        >
          {/* Vertical timeline diagram: rim → bottom */}
          <div
            className="rounded-2xl border-2 p-4"
            style={{ borderColor: `${SAND_DEEP}33`, backgroundColor: `${SAND_LIGHT}66` }}
            data-testid="canyon-timeline"
          >
            <div
              className={`text-[10px] mb-3 flex items-center gap-1.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
              style={{ color: SAND_DEEP }}
            >
              <Clock className="w-3.5 h-3.5" />
              {t("A vertical timeline of Earth", "បន្ទាត់ពេលវេលាបញ្ឈរនៃផែនដី")}
            </div>

            {[
              { depth: "0 m",      kdepth: "០ ម",          age: "270 mya",  kage: "២៧០ លានឆ្នាំ", enWhat: "Rim · pale red sandstone", khWhat: "គែម · ថ្មខ្សាច់ក្រហមស្រាល", color: "#fed7aa" },
              { depth: "−600 m",   kdepth: "−៦០០ ម",       age: "525 mya",  kage: "៥២៥ លានឆ្នាំ", enWhat: "Layered limestone — old sea floors", khWhat: "កំបោរស្រទាប់ — បាតសមុទ្រចាស់", color: "#fdba74" },
              { depth: "−1,200 m", kdepth: "−១,២០០ ម",     age: "1.2 bya",  kage: "១.២ ពាន់លានឆ្នាំ", enWhat: "Crumbling shale — ancient mud", khWhat: "ស្ហែលដែលបែក — ភក់បុរាណ", color: "#c2410c" },
              { depth: "−1,800 m", kdepth: "−១,៨០០ ម",     age: "1.84 bya", kage: "១.៨៤ ពាន់លានឆ្នាំ", enWhat: "Vishnu Schist — black, near-original Earth crust", khWhat: "ស្ហីសវីសណូ — ខ្មៅ ជិតស្បែកដើមនៃផែនដី", color: "#451a03" },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 mb-2 last:mb-0" data-testid={`canyon-layer-${i}`}>
                <div className="flex flex-col items-end w-20 flex-shrink-0">
                  <span className={`text-xs font-bold ${k ? "font-khmer" : "font-mono"}`} style={{ color: INK }}>
                    {k ? row.kdepth : row.depth}
                  </span>
                  <span className={`text-[10px] ${k ? "font-khmer" : "font-mono"}`} style={{ color: SAND_DEEP }}>
                    {k ? row.kage : row.age}
                  </span>
                </div>
                <div
                  className="flex-1 h-9 rounded-md border flex items-center px-3"
                  style={{ backgroundColor: row.color, borderColor: `${SAND_DEEP}33` }}
                >
                  <span
                    className={`text-xs ${row.color === "#451a03" ? "text-white" : "text-slate-900"} ${k ? "font-khmer" : ""}`}
                  >
                    {k ? row.khWhat : row.enWhat}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-1 mt-3 text-xs text-slate-700">
              <ArrowDown className="w-3.5 h-3.5" style={{ color: SAND_DEEP }} />
              <span className={k ? "font-khmer" : ""}>
                {t("Older with depth — almost 2 billion years from rim to river.", "ចាស់ជាងតាមជម្រៅ — ស្ទើរតែ ២ ពាន់លានឆ្នាំពីគែមដល់ទន្លេ។")}
              </span>
            </div>
          </div>
        </ConceptCard>

        {/* Niagara Falls */}
        <ConceptCard
          k={k}
          Icon={Waves}
          enName="Niagara Falls"
          khName="ទឹកធ្លាក់ណាយអាហ្គារ៉ា"
          enTag="violent demolisher · the cliff retreats"
          khTag="ជាងវាយបំផ្លាញ · ច្រាំងថយក្រោយ"
          enBody="If the Grand Canyon shows you erosion in slow motion, Niagara Falls shows it in fast-forward. Here, on the border between Canada and the United States, an entire river — about 3,160 tonnes of water every second — drops 51 metres straight down off the edge of a cliff. The kinetic energy at the base is staggering. The water does not just polish the rock; it physically smashes it. The soft shale layer underneath the hard limestone cap is constantly being scoured out, until eventually the unsupported limestone snaps off in giant slabs and crashes into the river below. The waterfall is, very slowly, eating itself backwards: the cliff edge has retreated about 11 kilometres upstream since the last Ice Age, and is still moving roughly 30 cm every year."
          khBody="ប្រសិនបើ មហាអន្លង់ធំ បង្ហាញអ្នកនូវការសឹកសំណឹកក្នុងចលនាយឺត ទឹកធ្លាក់ណាយអាហ្គារ៉ា បង្ហាញអ្នកក្នុងចលនាលឿន។ នៅទីនេះ លើព្រំដែនរវាងកាណាដា និងសហរដ្ឋអាមេរិក ទន្លេទាំងមូល — ទឹកប្រហែល ៣,១៦០ តោន រាល់វិនាទី — ធ្លាក់ ៥១ ម៉ែត្របញ្ឈរចេញពីគែមច្រាំង។ ថាមពលចលនានៅបាត គឺគួរឲ្យភ្ញាក់ផ្អើល។ ទឹកមិនត្រឹមតែ លាបថ្ម ទេ ៖ វាបុកបំបែកវាជាក់ស្តែង។ ស្រទាប់ស្ហែលទន់នៅពីក្រោមការគ្របកំបោររឹង ត្រូវបានកោសចេញជានិច្ច រហូតដល់កំបោរដែលគ្មានជម្រកខូចជាផ្ទាំងធំៗ និងធ្លាក់ចូលក្នុងទន្លេខាងក្រោម។ ទឹកធ្លាក់ កំពុងស៊ីខ្លួនឯងថយក្រោយយ៉ាងយឺតៗ ៖ គែមច្រាំងបានថយក្រោយប្រហែល ១១ គីឡូម៉ែត្រឡើងលើ ចាប់តាំងពីយុគទឹកកកចុងក្រោយ ហើយនៅតែផ្លាស់ប្តូរប្រហែល ៣០ សង់ទីម៉ែត្ររាល់ឆ្នាំ។"
          accent={OCEAN}
          glow
          badge={{ en: "Cliff retreats ~30 cm / year", kh: "ច្រាំងថយ ~៣០ សម / ឆ្នាំ" }}
        >
          {/* Side-profile waterfall retreat diagram */}
          <div
            className="rounded-2xl border-2 p-4"
            style={{ borderColor: `${OCEAN}33`, backgroundColor: `${OCEAN_LIGHT}55` }}
            data-testid="niagara-diagram"
          >
            <div
              className={`text-[10px] mb-3 flex items-center gap-1.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
              style={{ color: OCEAN_DEEP }}
            >
              <Zap className="w-3.5 h-3.5" />
              {t("How a waterfall walks upstream", "របៀបដែលទឹកធ្លាក់ដើរឡើងលើ")}
            </div>

            <div className="space-y-2">
              {[
                {
                  Icon: Droplets,
                  enT: "1 · Hammer",
                  khT: "១ · ញញួរ",
                  enB: "3,160 tonnes/second hits the rock at the bottom — pure kinetic shock.",
                  khB: "៣,១៦០ តោន/វិនាទី បុកថ្មនៅបាត — ការវាយបុកថាមពលសុទ្ធ។",
                },
                {
                  Icon: Layers,
                  enT: "2 · Scour",
                  khT: "២ · កោស",
                  enB: "Soft shale layer beneath the hard limestone is washed out — leaving an empty shelf.",
                  khB: "ស្រទាប់ស្ហែលទន់ខាងក្រោមកំបោររឹង ត្រូវបានលាង — បន្សល់ទុកធ្នើទទេ។",
                },
                {
                  Icon: AlertTriangle,
                  enT: "3 · Collapse",
                  khT: "៣ · ដួលរលំ",
                  enB: "Unsupported limestone cracks and crashes down. The cliff edge moves upstream.",
                  khB: "កំបោរដែលគ្មានជម្រកប្រេះ និងធ្លាក់ចុះ។ គែមច្រាំងផ្លាស់ឡើងលើ។",
                },
              ].map((step, i) => {
                const Icon = step.Icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg p-2 bg-white border"
                    style={{ borderColor: `${OCEAN}44` }}
                    data-testid={`niagara-step-${i}`}
                  >
                    <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: OCEAN }} />
                    <div className="min-w-0">
                      <div className={`text-xs font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                        {k ? step.khT : step.enT}
                      </div>
                      <div className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                        {k ? step.khB : step.enB}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-1 mt-3 text-xs text-slate-700">
              <ArrowUp className="w-3.5 h-3.5" style={{ color: OCEAN_DEEP }} />
              <span className={k ? "font-khmer" : ""}>
                {t("11 km upstream since the last Ice Age — and counting.", "១១ គីឡូម៉ែត្រ ឡើងលើ ចាប់តាំងពីយុគទឹកកកចុងក្រោយ — ហើយនៅតែបន្ត។")}
              </span>
            </div>
          </div>
        </ConceptCard>
      </div>

      <div className="mt-5">
        <Callout
          k={k}
          Icon={Info}
          labelEn="Two speeds, one process"
          labelKh="ល្បឿនពីរ ដំណើរការតែមួយ"
          enTitle="Slow water carves; fast water demolishes."
          khTitle="ទឹកយឺតឆ្លាក់ ៖ ទឹកលឿនបំផ្លាញ។"
          enBody="The Colorado River and the Niagara River are doing the exact same job — moving rock from high places to low places — but at completely different speeds and temperaments. Erosion is the patient mechanism that takes every mountain on Earth and, over enough time, returns it to the sea as sand."
          khBody="ទន្លេខូឡូរ៉ាដូ និងទន្លេណាយអាហ្គារ៉ា កំពុងធ្វើការងារដូចគ្នាបេះបិទ — ផ្លាស់ទីថ្មពីកន្លែងខ្ពស់ទៅកន្លែងទាប — ប៉ុន្តែក្នុងល្បឿន និងអារម្មណ៍ខុសគ្នាទាំងស្រុង។ ការសឹកសំណឹក គឺជាយន្តការអត់ធ្មត់ ដែលយកភ្នំនីមួយៗនៅលើផែនដី ហើយនៅពេលគ្រប់គ្រាន់ ប្រគល់វាត្រឡប់ទៅសមុទ្រវិញជាខ្សាច់។"
          accent={SAND_DEEP}
        />
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — Tectonic Extremes
// ════════════════════════════════════════════════════════════════════════════

function SectionTectonic({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-tectonic">
      <SectionHeader
        spec="02"
        en="Tectonic Extremes"
        kh="ភាពខ្លាំងនៃចលនាផ្ទាំងសិលា"
        k={k}
        Icon={Layers}
        accent={OCEAN_DEEP}
      />

      <ConceptCard
        k={k}
        Icon={Compass}
        enName="The Mariana Trench"
        khName="អន្លង់ម៉ារីយ៉ាណា"
        enTag="subduction zone · the deepest place on Earth"
        khTag="តំបន់ការមុជផ្ទាំងសិលា · កន្លែងជ្រៅបំផុតលើផែនដី"
        enBody="Earth's outer shell is not one solid piece. It is broken into a dozen huge rafts of rock — tectonic plates — that drift slowly across the molten mantle below, at about the speed your fingernails grow. When two of these plates push into each other, something has to give. In the western Pacific Ocean, the heavy oceanic Pacific Plate is being shoved underneath the lighter Mariana Plate, in a process called subduction. As it bends downward into the molten interior of the Earth, it pulls the sea floor with it, gouging out a long, narrow scar in the ocean: the Mariana Trench. At its lowest point — the Challenger Deep — the floor is nearly 11 kilometres below sea level. If you could pluck Mount Everest, the highest mountain on Earth, and drop it in, the summit would still be more than 2 kilometres underwater."
        khBody="សំបករខាងក្រៅរបស់ផែនដី មិនមែនជាដុំរឹងតែមួយទេ។ វាបែកជាក្តារធំៗរាប់សិបនៃថ្ម — ផ្ទាំងសិលាតិចតូនិច — ដែលអណ្តែតយឺតៗកាត់លើស្រទាប់រលាយខាងក្រោម ក្នុងល្បឿនប្រហែលនឹងក្រចកដៃរបស់អ្នកដុះ។ នៅពេលផ្ទាំងពីរនៃផ្ទាំងទាំងនេះច្របាច់ទៅវិញទៅមក របស់អ្វីមួយត្រូវចុះញ៉ម។ នៅមហាសមុទ្រប៉ាស៊ីហ្វិកខាងលិច ផ្ទាំងសមុទ្រប៉ាស៊ីហ្វិកដ៏ធ្ងន់ ត្រូវបានរុញចូលទៅក្រោមផ្ទាំងម៉ារីយ៉ាណាស្រាល ក្នុងដំណើរការមួយហៅថា ការមុជផ្ទាំងសិលា។ នៅពេលវាកោងចុះទៅក្នុងផ្នែកខាងក្នុងរលាយរបស់ផែនដី វាទាញបាតសមុទ្រជាមួយវា ឆ្លាក់ស្នាមរបួសវែង និងតូចចង្អៀតក្នុងមហាសមុទ្រ ៖ អន្លង់ម៉ារីយ៉ាណា។ នៅចំណុចទាបបំផុតរបស់វា — ចាលឡិនជើរ ឌីព (Challenger Deep) — បាតស្ថិតនៅជិត ១១ គីឡូម៉ែត្រ ខាងក្រោមកម្រិតសមុទ្រ។ ប្រសិនបើអ្នកអាចបេះភ្នំអេវើរេស ភ្នំខ្ពស់បំផុតលើផែនដី ហើយទម្លាក់វាចូលទៅ កំពូលនឹងនៅតែស្ថិតនៅជាង ២ គីឡូម៉ែត្រ ក្រោមទឹក។"
        accent={OCEAN_DEEP}
        glow
        badge={{ en: "≈ 11 km deep", kh: "≈ ១១ គម ជ្រៅ" }}
      >
        {/* Subduction cross-section */}
        <div
          className="rounded-2xl border-2 p-4"
          style={{ borderColor: `${OCEAN_DEEP}33`, backgroundColor: `${OCEAN_LIGHT}44` }}
          data-testid="subduction-diagram"
        >
          <div
            className={`text-[10px] mb-3 flex items-center gap-1.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
            style={{ color: OCEAN_DEEP }}
          >
            <Layers className="w-3.5 h-3.5" />
            {t("Subduction in cross-section", "ការមុជផ្ទាំងសិលា ក្នុងផ្ទាំងកាត់")}
          </div>

          <svg viewBox="0 0 400 220" className="w-full h-44" aria-hidden="true">
            {/* Sky */}
            <rect x="0" y="0" width="400" height="60" fill="#bae6fd" />
            {/* Ocean */}
            <rect x="0" y="60" width="400" height="80" fill="#0284c7" opacity="0.65" />
            {/* Right plate (Mariana, lighter) */}
            <path d="M200,140 L400,140 L400,170 L200,170 Z" fill="#fed7aa" stroke="#9a3412" strokeWidth="1.5" />
            {/* Left plate (Pacific, heavier) — bending down */}
            <path d="M0,140 L200,140 Q210,160 240,200 L260,210 L260,220 L0,220 Z" fill="#0c4a6e" stroke="#082f49" strokeWidth="1.5" />
            {/* Trench arrow */}
            <line x1="200" y1="80" x2="200" y2="135" stroke="#be123c" strokeWidth="2" strokeDasharray="3 2" />
            <polygon points="195,128 205,128 200,138" fill="#be123c" />
            {/* Plate motion arrows */}
            <line x1="40" y1="125" x2="120" y2="125" stroke="#082f49" strokeWidth="2" />
            <polygon points="120,121 120,129 128,125" fill="#082f49" />
            <line x1="360" y1="125" x2="280" y2="125" stroke="#9a3412" strokeWidth="2" />
            <polygon points="280,121 280,129 272,125" fill="#9a3412" />
            {/* Labels */}
            <text x="60" y="115" fontSize={k ? 11 : 10} fill="#082f49" fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "ផ្ទាំងប៉ាស៊ីហ្វិក" : "PACIFIC PLATE"}
            </text>
            <text x="270" y="158" fontSize={k ? 11 : 10} fill="#9a3412" fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "ផ្ទាំងម៉ារីយ៉ាណា" : "MARIANA PLATE"}
            </text>
            <text x="160" y="78" fontSize={k ? 11 : 10} fill="#be123c" fontFamily={k ? "Hanuman, serif" : "monospace"} fontWeight="bold">
              {k ? "អន្លង់" : "TRENCH"}
            </text>
            <text x="20" y="55" fontSize={k ? 10 : 9} fill="#0c4a6e" fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "មហាសមុទ្រប៉ាស៊ីហ្វិក" : "PACIFIC OCEAN"}
            </text>
          </svg>

          <p className={`mt-3 text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The heavy Pacific Plate dives under the lighter Mariana Plate, opening a long deep gash in the sea floor where they meet.",
              "ផ្ទាំងប៉ាស៊ីហ្វិកដ៏ធ្ងន់ មុជចូលក្រោមផ្ទាំងម៉ារីយ៉ាណាស្រាល បើករបួសវែង និងជ្រៅក្នុងបាតសមុទ្រនៅកន្លែងដែលពួកវាជួបគ្នា។"
            )}
          </p>
        </div>

        {/* Scale comparison: Everest vs Challenger Deep */}
        <div
          className="mt-3 rounded-2xl border-2 p-4"
          style={{ borderColor: `${OCEAN_DEEP}33`, backgroundColor: "white" }}
          data-testid="everest-vs-trench"
        >
          <div
            className={`text-[10px] mb-3 flex items-center gap-1.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
            style={{ color: OCEAN_DEEP }}
          >
            <Ruler className="w-3.5 h-3.5" />
            {t("Drop Everest into the trench", "ទម្លាក់ភ្នំអេវើរេសចូលអន្លង់")}
          </div>

          <svg viewBox="0 0 400 200" className="w-full h-40" aria-hidden="true">
            {/* sea level */}
            <line x1="0" y1="40" x2="400" y2="40" stroke="#0284c7" strokeWidth="1.5" />
            <text x="6" y="36" fontSize={k ? 10 : 9} fill="#0284c7" fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "កម្រិតសមុទ្រ · ០ ម" : "SEA LEVEL · 0 m"}
            </text>

            {/* water column */}
            <rect x="0" y="40" width="400" height="160" fill="#bae6fd" opacity="0.5" />

            {/* Everest triangle, base at trench bottom (y=190), apex 8,848m up = mapped */}
            {/* trench depth ~10,994 m → use scale 0.0145 px/m → 159 px tall */}
            {/* Everest 8,848 m → ~128 px tall, sitting on bottom at y=190, top at y=62 */}
            <polygon points="160,190 240,190 200,62" fill="#9a3412" stroke="#451a03" strokeWidth="1.5" />
            <line x1="160" y1="190" x2="240" y2="190" stroke="#082f49" strokeWidth="2" />
            <text x="170" y="55" fontSize={k ? 10 : 9} fill="#9a3412" fontFamily={k ? "Hanuman, serif" : "monospace"} fontWeight="bold">
              {k ? "អេវើរេស" : "EVEREST"}
            </text>
            <text x="166" y="68" fontSize={k ? 9 : 8} fill="#9a3412" fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "៨,៨៤៨ ម" : "8,848 m"}
            </text>

            {/* still ~2 km of water above the summit */}
            <line x1="200" y1="40" x2="200" y2="62" stroke="#be123c" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="208" y="55" fontSize={k ? 10 : 9} fill="#be123c" fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "+២,១៤៦ ម ទឹក" : "+2,146 m water"}
            </text>

            {/* trench floor */}
            <line x1="0" y1="190" x2="400" y2="190" stroke="#082f49" strokeWidth="2" />
            <text x="6" y="186" fontSize={k ? 10 : 9} fill="#082f49" fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "ចាលឡិនជើរ ឌីព · −១០,៩៩៤ ម" : "CHALLENGER DEEP · −10,994 m"}
            </text>
          </svg>

          <p className={`mt-3 text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Even with Everest standing on the floor of the Challenger Deep, more than 2 kilometres of dark, freezing water would still be sitting on top of its summit.",
              "ទោះបីភ្នំអេវើរេសឈរលើបាតនៃ ចាលឡិនជើរ ឌីព ក៏ដោយ ទឹកងងឹត និងត្រជាក់លើសពី ២ គីឡូម៉ែត្រ នឹងនៅតែស្ថិតលើកំពូលរបស់វា។"
            )}
          </p>
        </div>

        <div className="mt-3">
          <Callout
            k={k}
            Icon={Rocket}
            labelEn="Mind-bender"
            labelKh="គំនិតគួរឲ្យភ្ញាក់ផ្អើល"
            enTitle="More humans have walked on the Moon than visited the bottom of the trench."
            khTitle="មនុស្សដែលបានដើរលើព្រះច័ន្ទ មានច្រើនជាងមនុស្សដែលបានទៅបាតអន្លង់។"
            enBody="The pressure at the Challenger Deep is more than 1,000 times the pressure at sea level — like balancing 50 jumbo jets on your fingertip. As of today, only a small handful of people have ever made it down, while a dozen astronauts have walked on the Moon."
            khBody="សម្ពាធនៅ ចាលឡិនជើរ ឌីព លើសពី ១,០០០ ដងនៃសម្ពាធកម្រិតសមុទ្រ — ដូចជាការតុល្យភាពយន្តហោះយក្ស ៥០ គ្រឿងលើចុងម្រាមដៃរបស់អ្នក។ គិតមកដល់ថ្ងៃនេះ មានមនុស្សតែបន្តិចបន្តួចប៉ុណ្ណោះដែលបានចុះទៅដល់ ខណៈដែលអវកាសយានិករាប់សិបនាក់បានដើរលើព្រះច័ន្ទ។"
            accent={OCEAN_DEEP}
          />
        </div>
      </ConceptCard>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — The Living Geography
// ════════════════════════════════════════════════════════════════════════════

function SectionLivingReef({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-2" data-testid="section-living-reef">
      <SectionHeader
        spec="03"
        en="The Living Geography"
        kh="ភូមិសាស្ត្រមានជីវិត"
        k={k}
        Icon={Fish}
        accent={REEF}
      />

      <ConceptCard
        k={k}
        Icon={Fish}
        enName="The Great Barrier Reef"
        khName="ថ្មប៉ប្រះទឹកផ្កាថ្មដ៏អស្ចារ្យ"
        enTag="built by life · visible from space"
        khTag="សាងសង់ដោយជីវិត · មើលឃើញពីលំហ"
        enBody="Most of the Earth's huge geographic features were carved by lifeless forces — wind, water, heat. The Great Barrier Reef, off the north-eastern coast of Australia, is the strange and wonderful exception. It is 2,300 kilometres long, made up of nearly 3,000 individual reefs, and it is large enough to be clearly visible from astronauts in orbit. And yet it was not built by tectonics or by erosion. It was built, one tiny skeleton at a time, by living creatures. A coral polyp is a soft animal smaller than your fingernail, related to jellyfish. Each polyp pulls dissolved calcium and carbonate out of the seawater and uses it to build a hard cup of limestone around its own body. When the polyp dies, the limestone cup remains, and a new polyp grows on top of the old one. Repeat this for thousands of years and billions of generations, and you get an underwater mountain range made entirely of stacked corpses — a city built by its own dead, still bursting with new life."
        khBody="លក្ខណៈភូមិសាស្ត្រធំៗបំផុតរបស់ផែនដី ត្រូវបានឆ្លាក់ដោយកម្លាំងគ្មានជីវិត — ខ្យល់ ទឹក កំដៅ។ ថ្មប៉ប្រះទឹកផ្កាថ្មដ៏អស្ចារ្យ នៅក្រៅឆ្នេរខាងជើងឦសានរបស់អូស្ត្រាលី គឺជាករណីលើកលែងដ៏ចម្លែក និងអស្ចារ្យ។ វាមានប្រវែង ២,៣០០ គីឡូម៉ែត្រ បង្កើតឡើងពីថ្មប៉ប្រះទឹកដាច់ដោយឡែកពីគ្នាស្ទើរតែ ៣,០០០ ហើយវាធំល្មមអាចមើលឃើញច្បាស់ដោយអវកាសយានិកក្នុងគន្លង។ ហើយប៉ុន្តែ វាមិនត្រូវបានសាងសង់ដោយតិចតូនិច ឬដោយការសឹកសំណឹកនោះទេ។ វាត្រូវបានសាងសង់ គ្រោងឆ្អឹងតូចមួយ ៗ ដោយសត្វមានជីវិត។ ប៉ូលីបផ្កាថ្ម គឺជាសត្វទន់តូចជាងក្រចកដៃរបស់អ្នក ដែលជាសាច់ញាតិនឹងផ្កាសមុទ្រ។ ប៉ូលីបនីមួយៗទាញកាល់ស្យូម និងកាបូណាតរលាយចេញពីទឹកសមុទ្រ ហើយប្រើវាដើម្បីសាងសង់ពែងកំបោររឹងមួយជុំវិញរាងកាយរបស់ខ្លួន។ នៅពេលប៉ូលីបស្លាប់ ពែងកំបោរនៅសល់ ហើយប៉ូលីបថ្មីដុះនៅលើពែងចាស់។ ធ្វើឡើងវិញរយៈពេលរាប់ពាន់ឆ្នាំ និងជំនាន់រាប់ពាន់លាន អ្នកនឹងទទួលបានជួរភ្នំក្រោមទឹក ដែលធ្វើឡើងទាំងស្រុងពីសាកសពជង់គ្នា — ទីក្រុងមួយដែលសាងសង់ដោយសាកសពរបស់ខ្លួនឯង នៅតែបញ្ចេញជីវិតថ្មី។"
        accent={REEF}
        glow
        badge={{ en: "2,300 km long", kh: "វែង ២,៣០០ គម" }}
      >
        {/* Stats strip */}
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            { k1: "៣,០០០", k2: "ថ្មប៉ប្រះទឹក", e1: "3,000",  e2: "individual reefs",       color: REEF },
            { k1: "២,៣០០", k2: "គីឡូម៉ែត្រ",   e1: "2,300",  e2: "kilometres long",         color: OCEAN },
            { k1: "៩០០+",  k2: "កោះ",          e1: "900+",   e2: "islands inside it",       color: SUN  },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-3 flex flex-col items-start"
              style={{ borderColor: `${s.color}55` }}
              data-testid={`reef-stat-${i}`}
            >
              <div className="text-2xl font-extrabold leading-tight" style={{ color: s.color }}>
                <span className={k ? "font-khmer" : ""}>{k ? s.k1 : s.e1}</span>
              </div>
              <div className={`text-xs text-slate-700 ${k ? "font-khmer" : ""}`}>
                {k ? s.k2 : s.e2}
              </div>
            </div>
          ))}
        </div>

        {/* How a polyp builds rock */}
        <div
          className="rounded-2xl border-2 p-4"
          style={{ borderColor: `${REEF}33`, backgroundColor: `${REEF_LIGHT}55` }}
          data-testid="polyp-process"
        >
          <div
            className={`text-[10px] mb-3 flex items-center gap-1.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
            style={{ color: REEF }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t("How a soft animal builds a mountain", "របៀបដែលសត្វទន់សាងសង់ភ្នំ")}
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                Icon: Waves,
                en: "1 · Borrow",
                kh: "១ · ខ្ចី",
                enBody: "A tiny coral polyp pulls dissolved calcium and carbonate out of the seawater around it.",
                khBody: "ប៉ូលីបផ្កាថ្មតូចមួយ ទាញកាល់ស្យូម និងកាបូណាតរលាយចេញពីទឹកសមុទ្រជុំវិញវា។",
              },
              {
                Icon: Layers,
                en: "2 · Build",
                kh: "២ · សាងសង់",
                enBody: "It locks them into a hard cup of limestone (CaCO\u2083) wrapped around its own soft body.",
                khBody: "វាចាក់សោពួកវាចូលក្នុងពែងកំបោររឹង (CaCO\u2083) រុំជុំវិញរាងកាយទន់របស់ខ្លួន។",
              },
              {
                Icon: ArrowUp,
                en: "3 · Stack",
                kh: "៣ · ជង់",
                enBody: "When it dies, the cup remains. A new polyp grows on top — and 10,000 years later, an island.",
                khBody: "នៅពេលវាស្លាប់ ពែងនៅសល់។ ប៉ូលីបថ្មីដុះនៅពីលើ — ហើយ ១០,០០០ ឆ្នាំក្រោយ កោះមួយ។",
              },
            ].map((step, i) => {
              const Icon = step.Icon;
              return (
                <div
                  key={i}
                  className="rounded-xl bg-white border p-3"
                  style={{ borderColor: `${REEF}55` }}
                  data-testid={`polyp-step-${i}`}
                >
                  <Icon className="w-5 h-5 mb-2" style={{ color: REEF }} />
                  <div className={`text-sm font-bold mb-1 ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                    {k ? step.kh : step.en}
                  </div>
                  <div className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                    {k ? step.khBody : step.enBody}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <Callout
            k={k}
            Icon={Wind}
            labelEn="Worth knowing"
            labelKh="គួរដឹង"
            enTitle="A reef is a partnership."
            khTitle="ថ្មប៉ប្រះទឹក គឺជាភាពជាដៃគូ។"
            enBody="The vibrant colours of a healthy reef are not the polyps themselves but tiny algae living inside their tissues. The algae photosynthesise and feed sugar to the coral; in return the coral gives the algae a safe home. When the water gets too hot, the coral evicts its algae and turns ghost-white — this is what scientists call coral bleaching."
            khBody="ពណ៌ភ្លឺនៃថ្មប៉ប្រះទឹកដែលមានសុខភាពល្អ មិនមែនជាប៉ូលីបខ្លួនឯងទេ ប៉ុន្តែជាសារាយតូចៗដែលរស់ក្នុងជាលិការបស់ពួកវា។ សារាយធ្វើរស្មីសំយោគ និងផ្តល់ស្ករដល់ផ្កាថ្ម ៖ ជាថ្នូរ ផ្កាថ្មផ្តល់ផ្ទះសុវត្ថិភាពដល់សារាយ។ នៅពេលទឹកក្តៅពេក ផ្កាថ្មបណ្តេញសារាយរបស់វា ហើយប្រែទៅជាស ដូចខ្មោច — នេះគឺជាអ្វីដែលអ្នកវិទ្យាសាស្ត្រហៅថា ការសំប្រឡែកនៃផ្កាថ្ម។"
            accent={LEAF}
          />
          <Callout
            k={k}
            Icon={AlertTriangle}
            labelEn="Why this matters"
            labelKh="ហេតុអ្វីវាសំខាន់"
            enTitle="The reef is fragile in a way the canyon is not."
            khTitle="ថ្មប៉ប្រះទឹក ផុយស្រួយ មិនដូចមហាអន្លង់ធំទេ។"
            enBody="A canyon is dead rock and it does not care if the climate changes. A reef is alive, and even small rises in ocean temperature or acidity can kill the coral builders faster than they can grow back. Earth's only living landmark is also its most vulnerable one."
            khBody="មហាអន្លង់ធំ គឺជាថ្មស្លាប់ ហើយវាមិនខ្វល់ទេបើអាកាសធាតុផ្លាស់ប្តូរ។ ថ្មប៉ប្រះទឹក គឺមានជីវិត ហើយសូម្បីតែការកើនកម្រិតសីតុណ្ហភាពសមុទ្រ ឬកម្រិតអាស៊ីតតិចតួច ក៏អាចសម្លាប់អ្នកសាងសង់ផ្កាថ្មលឿនជាងពួកវាអាចដុះត្រឡប់មកវិញ។ ស្នាដៃភូមិសាស្ត្រមានជីវិតតែមួយរបស់ផែនដី ក៏ជាស្នាដៃដែលងាយរងគ្រោះបំផុតផងដែរ។"
            accent={ROSE}
          />
        </div>
      </ConceptCard>
    </section>
  );
}
