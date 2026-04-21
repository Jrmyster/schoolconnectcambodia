import { Link } from "wouter";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import {
  ArrowLeft,
  ArrowRight,
  CloudRain,
  Crosshair,
  Eye,
  History,
  Info,
  Plane,
  Radar as RadarIcon,
  Radio,
  Ruler,
  Satellite,
  Shield,
  Sparkles,
  Timer,
  RadioTower,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  TECH-04 · Radar: Seeing with Radio Waves
//            រ៉ាដា៖ ការមើលឃើញដោយរលកវិទ្យុ
//
//  1. What is RADAR?            · acronym + radio waves (not sound, not lasers)
//  2. Mathematics of an Echo    · d = c·t / 2 (LaTeX) + animated ping
//  3. A Tool Born in the Dark   · WW2 history
//  4. Modern Uses               · Air-traffic control + Meteorology
//
//  Aesthetic: Aviation — dark navy backgrounds, glowing radar-screen greens,
//             monospace high-tech typography.
// ════════════════════════════════════════════════════════════════════════════

const SCREEN     = "#39ff14";   // CRT radar green
const SCREEN_DIM = "#16a34a";
const SCREEN_DEEP = "#14532d";

const NIGHT      = "#020617";   // deep navy
const NIGHT_2    = "#0b1220";
const PANEL      = "#0f172a";

const AMBER      = "#f59e0b";   // warning amber
const RED        = "#ef4444";   // alert red
const SKY        = "#38bdf8";   // sky blue
const WHITE_DIM  = "#cbd5e1";

const FRAME: React.CSSProperties = {
  backgroundColor: NIGHT,
  backgroundImage:
    `radial-gradient(circle at 10% 0%, rgba(57, 255, 20, 0.06), transparent 45%),` +
    `radial-gradient(circle at 90% 100%, rgba(56, 189, 248, 0.05), transparent 50%),` +
    `linear-gradient(180deg, ${NIGHT} 0%, ${NIGHT_2} 100%)`,
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
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-black rounded-full px-3 py-1"
        style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}88` }}
      >
        SEC-{spec}
      </span>
      <Icon className="w-5 h-5" style={{ color: accent, filter: `drop-shadow(0 0 4px ${accent}cc)` }} />
      <h2
        className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
        style={{ color: "#e2e8f0" }}
      >
        {k ? kh : en}
      </h2>
      <div
        className="flex-1 border-t border-dashed"
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
      className="relative rounded-3xl p-5 sm:p-6 border-2 overflow-hidden flex flex-col"
      style={{
        backgroundColor: PANEL,
        borderColor: `${accent}55`,
        boxShadow: glow
          ? `0 0 0 1px ${accent}22 inset, 0 0 30px -6px ${accent}55`
          : `0 6px 18px -10px rgba(0,0,0,0.6)`,
      }}
      data-testid={`concept-card-${enName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: `${accent}1a`,
            border: `1px solid ${accent}55`,
            boxShadow: `inset 0 0 12px ${accent}22`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: accent, filter: `drop-shadow(0 0 4px ${accent}aa)` }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`}
            style={{ color: "#f1f5f9" }}
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
            className={`text-[10px] px-2 py-1 rounded-full text-black ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
            style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}88` }}
          >
            {k ? badge.kh : badge.en}
          </span>
        ) : null}
      </div>

      {enBody && khBody ? (
        <p
          className={`text-sm sm:text-[15px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: WHITE_DIM }}
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
        style={{ color: "#f1f5f9" }}
      >
        {k ? khTitle : enTitle}
      </h4>
      <p
        className={`text-xs sm:text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: WHITE_DIM }}
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
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
      style={{
        color,
        borderColor: `${color}88`,
        backgroundColor: `${color}11`,
        boxShadow: `0 0 10px ${color}33`,
      }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
      />
      {k ? kh : en}
    </span>
  );
}

// ─── Animated radar scope (hero + section 1) ───────────────────────────────

function RadarScope({ size = 220 }: { size?: number }) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="scopeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#0a3d12" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={SCREEN} stopOpacity="0.7" />
            <stop offset="100%" stopColor={SCREEN} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer bezel */}
        <circle cx="100" cy="100" r="98" fill="#020617" stroke="#1e293b" strokeWidth="2" />
        {/* Scope face */}
        <circle cx="100" cy="100" r="92" fill="url(#scopeGlow)" />
        {/* Range rings */}
        {[20, 40, 60, 80].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={SCREEN_DIM} strokeWidth="0.5" opacity="0.55" />
        ))}
        {/* Cross-hair */}
        <line x1="100" y1="8"   x2="100" y2="192" stroke={SCREEN_DIM} strokeWidth="0.5" opacity="0.55" />
        <line x1="8"   y1="100" x2="192" y2="100" stroke={SCREEN_DIM} strokeWidth="0.5" opacity="0.55" />

        {/* Sweep arm — rotating */}
        <g style={{ transformOrigin: "100px 100px", animation: "radarSweep 3.6s linear infinite" }}>
          <path d="M100,100 L100,12 A88,88 0 0,1 188,100 Z" fill="url(#sweepGrad)" />
          <line x1="100" y1="100" x2="100" y2="12" stroke={SCREEN} strokeWidth="1.2" />
        </g>

        {/* Blips */}
        <g>
          <circle cx="135" cy="55" r="2.5" fill={SCREEN} style={{ animation: "blipPulse 2s ease-in-out infinite" }}>
          </circle>
          <circle cx="60"  cy="78" r="2.2" fill={SCREEN} style={{ animation: "blipPulse 2.4s ease-in-out infinite" }}>
          </circle>
          <circle cx="145" cy="135" r="2.4" fill={SCREEN} style={{ animation: "blipPulse 1.8s ease-in-out infinite" }}>
          </circle>
        </g>

        {/* Center dot */}
        <circle cx="100" cy="100" r="1.8" fill={SCREEN} />
      </svg>

      <style>{`
        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes blipPulse {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function RadarPage() {
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
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${k ? "font-khmer" : ""}`}
            style={{ color: SCREEN_DIM }}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* Hero */}
        <header
          className="relative rounded-[2rem] p-6 sm:p-9 mb-10 overflow-hidden border-2"
          style={{
            borderColor: `${SCREEN}55`,
            backgroundImage: `
              radial-gradient(circle at 80% 50%, rgba(57, 255, 20, 0.10), transparent 55%),
              linear-gradient(135deg, ${NIGHT} 0%, ${NIGHT_2} 100%)
            `,
            boxShadow: `0 0 40px -10px ${SCREEN}33, inset 0 0 0 1px ${SCREEN}11`,
          }}
        >
          <div className="relative flex flex-col lg:flex-row items-start gap-6">
            <div className="flex-1 min-w-0">
              <div
                className={`flex items-center gap-2 text-xs mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}
                style={{ color: SCREEN }}
              >
                <span>{t("Technology", "បច្ចេកវិទ្យា")}</span>
                <span>·</span>
                <span>TECH-04</span>
              </div>
              <h1
                className={`text-3xl sm:text-4xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
                style={{ color: "#f1f5f9" }}
                data-testid="page-title"
              >
                {t(
                  "Radar: Seeing with Radio Waves",
                  "រ៉ាដា៖ ការមើលឃើញដោយរលកវិទ្យុ"
                )}
              </h1>
              <p
                className={`mt-3 text-sm sm:text-base max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
                style={{ color: WHITE_DIM }}
              >
                {t(
                  "Your eyes only see one tiny slice of all the energy that flies through the air around you. Radar uses an invisible slice — radio waves — to see things you cannot: an aircraft 200 kilometres away, a thunderstorm hidden behind hills, a ship in fog at midnight. It is one of the great quiet inventions of the 20th century.",
                  "ភ្នែករបស់អ្នកមើលឃើញតែមួយផ្នែកតូចបំផុតនៃថាមពលទាំងអស់ដែលហោះកាត់ខ្យល់ជុំវិញអ្នក។ រ៉ាដា ប្រើផ្នែកមួយដែលមើលមិនឃើញ — រលកវិទ្យុ — ដើម្បីមើលឃើញរបស់ដែលអ្នកមើលមិនឃើញ ៖ យន្តហោះមួយឆ្ងាយ ២០០ គីឡូម៉ែត្រ ខ្យល់ព្យុះមួយដែលលាក់នៅពីក្រោយភ្នំ កប៉ាល់មួយក្នុងអ័ព្ទនៅពាក់កណ្តាលអធ្រាត្រ។ វាគឺជាការច្នៃប្រឌិតស្ងៀមដ៏អស្ចារ្យមួយនៃសតវត្សទី ២០។"
                )}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <HeroChip color={SCREEN} k={k} en="Radio waves"   kh="រលកវិទ្យុ" />
                <HeroChip color={SKY}    k={k} en="Echo timing"   kh="ម៉ោងនៃអេកូ" />
                <HeroChip color={AMBER}  k={k} en="Aviation"      kh="អាកាសចរណ៍" />
                <HeroChip color={RED}    k={k} en="Storm tracking" kh="តាមដានព្យុះ" />
              </div>
            </div>

            <div className="flex-shrink-0 self-center">
              <RadarScope size={200} />
            </div>
          </div>
        </header>

        <SectionWhatIs   k={k} t={t} />
        <SectionEcho     k={k} t={t} />
        <SectionHistory  k={k} t={t} />
        <SectionUses     k={k} t={t} />

        {/* Closing */}
        <div
          className="mt-12 rounded-3xl border-2 p-5 sm:p-6 flex items-start gap-3"
          style={{
            borderColor: `${SCREEN}55`,
            backgroundColor: PANEL,
            boxShadow: `inset 0 0 30px ${SCREEN}11`,
          }}
          data-testid="closing-note"
        >
          <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: SCREEN }} />
          <p className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: "#f1f5f9" }}>
            <strong className={k ? "" : "font-bold"}>
              {t("The big idea: ", "គំនិតធំ ៖ ")}
            </strong>
            {t(
              "Radar is the same trick a bat uses in a dark cave — shout, listen for the echo, measure the time, calculate the distance — except humans shout in invisible radio instead of sound, and our ears are giant metal dishes. The next time a passenger jet flies over your village in the rainy season, remember: someone in a dark room in Phnom Penh airport is watching it as a tiny green dot, and the only thing telling them where it is, is an echo.",
              "រ៉ាដាគឺជាល្បិចដូចគ្នានឹងសត្វប្រចៀវប្រើនៅក្នុងរូងងងឹត — ស្រែក ស្តាប់អេកូ វាស់ពេលវេលា គណនាចម្ងាយ — លើកលែងតែមនុស្សស្រែកជារលកវិទ្យុមើលមិនឃើញ ជំនួសឲ្យសំឡេង ហើយត្រចៀករបស់យើងគឺចានដែកយក្ស។ លើកក្រោយដែលយន្តហោះអ្នកដំណើរហោះកាត់ភូមិអ្នកក្នុងរដូវវស្សា ចូរចងចាំ ៖ មាននរណាម្នាក់នៅក្នុងបន្ទប់ងងឹតនៅអាកាសយានដ្ឋានភ្នំពេញ កំពុងមើលវាជាចំណុចបៃតងតូច ហើយរបស់តែមួយដែលប្រាប់គាត់ថាវានៅឯណា គឺជាអេកូមួយ។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-black text-sm font-bold transition-opacity hover:opacity-90 ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: SCREEN, boxShadow: `0 0 20px ${SCREEN}66` }}
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
//  Section 01 — What is RADAR?
// ════════════════════════════════════════════════════════════════════════════

function SectionWhatIs({ k, t }: { k: boolean; t: T }) {
  // RADAR acronym tiles
  const letters = [
    { L: "RA", en: "Radio",     kh: "រលកវិទ្យុ" },
    { L: "D",  en: "Detection", kh: "ការរកឃើញ" },
    { L: "A",  en: "And",       kh: "និង" },
    { L: "R",  en: "Ranging",   kh: "ការវាស់ចម្ងាយ" },
  ];

  return (
    <section className="mb-12" data-testid="section-what-is">
      <SectionHeader
        spec="01"
        en="What is RADAR?"
        kh="តើអ្វីទៅជារ៉ាដា?"
        k={k}
        Icon={RadarIcon}
        accent={SCREEN}
      />

      <ConceptCard
        k={k}
        Icon={Radio}
        enName="An invisible torch beam"
        khName="ចំណុចភ្លឺមើលមិនឃើញ"
        enTag="not sound · not lasers · radio waves"
        khTag="មិនមែនសំឡេង · មិនមែនឡាស៊ែរ · រលកវិទ្យុ"
        enBody="The word RADAR is not really a word — it is an acronym. It stands for RAdio Detection And Ranging. The name tells you exactly what it does: it uses radio waves to detect that an object is out there, and to measure the range — the distance — to that object. It does not bounce sound waves like a bat or a dolphin. It does not shoot a thin beam of light like a laser rangefinder. It bathes the sky with invisible radio (or microwave) energy and listens for the faint reflection that comes back."
        khBody="ពាក្យ RADAR មិនមែនជាពាក្យពិតប្រាកដទេ — វាគឺជាអក្សរកាត់។ វាតំណាងឲ្យ RAdio Detection And Ranging។ ឈ្មោះប្រាប់អ្នកច្បាស់ពីអ្វីដែលវាធ្វើ ៖ វាប្រើ រលកវិទ្យុ ដើម្បី រកឃើញ ថាមានវត្ថុមួយនៅខាងក្រៅ ហើយដើម្បី វាស់ចម្ងាយ — ចម្ងាយ — ទៅកាន់វត្ថុនោះ។ វាមិនបញ្ជូនរលកសំឡេងដូចសត្វប្រចៀវ ឬដុលហ្វាំងទេ។ វាមិនបាញ់ធ្នូពន្លឺស្តើងដូចឧបករណ៍ឡាស៊ែរវាស់ចម្ងាយទេ។ វាងូតផ្ទៃមេឃដោយថាមពលវិទ្យុ (ឬមីក្រូវ) មើលមិនឃើញ ហើយស្តាប់ការឆ្លុះត្រឡប់មកវិញដ៏ស្រាល។"
        accent={SCREEN}
        glow
        badge={{ en: "Acronym", kh: "អក្សរកាត់" }}
      >
        {/* Acronym tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4" data-testid="acronym-tiles">
          {letters.map((row, i) => (
            <div
              key={i}
              className="rounded-xl border p-3 text-center"
              style={{
                backgroundColor: `${SCREEN}0d`,
                borderColor: `${SCREEN}55`,
                boxShadow: `inset 0 0 12px ${SCREEN}1a`,
              }}
            >
              <div
                className="text-2xl font-extrabold font-mono mb-1"
                style={{ color: SCREEN, textShadow: `0 0 8px ${SCREEN}88` }}
              >
                {row.L}
              </div>
              <div
                className={`text-[11px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
                style={{ color: WHITE_DIM }}
              >
                {k ? row.kh : row.en}
              </div>
            </div>
          ))}
        </div>

        {/* What it is NOT — three crossed cards */}
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { en: "NOT sound waves",  kh: "មិនមែនរលកសំឡេង",  enWho: "(that's sonar / a bat)",   khWho: "(នោះគឺ sonar / សត្វប្រចៀវ)" },
            { en: "NOT laser light",  kh: "មិនមែនពន្លឺឡាស៊ែរ", enWho: "(that's lidar)",            khWho: "(នោះគឺ lidar)" },
            { en: "YES radio waves",  kh: "បាទ រលកវិទ្យុ",   enWho: "(invisible · long range)",  khWho: "(មើលមិនឃើញ · ចម្ងាយឆ្ងាយ)" },
          ].map((item, i) => {
            const positive = i === 2;
            const c = positive ? SCREEN : RED;
            return (
              <div
                key={i}
                className="rounded-xl border p-3"
                style={{
                  borderColor: `${c}55`,
                  backgroundColor: `${c}0d`,
                }}
              >
                <div
                  className={`text-sm font-bold ${k ? "font-khmer" : ""}`}
                  style={{ color: c }}
                >
                  {k ? item.kh : item.en}
                </div>
                <div
                  className={`text-[11px] mt-1 ${k ? "font-khmer" : ""}`}
                  style={{ color: WHITE_DIM }}
                >
                  {k ? item.khWho : item.enWho}
                </div>
              </div>
            );
          })}
        </div>
      </ConceptCard>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — Mathematics of an Echo
// ════════════════════════════════════════════════════════════════════════════

function SectionEcho({ k, t }: { k: boolean; t: T }) {
  // Live ping calculator: pick a few example echo times
  const examples = [
    { t_us: 100,   enWhat: "A drone close by",     khWhat: "ដ្រូនជិតខាង" },
    { t_us: 670,   enWhat: "An airliner overhead", khWhat: "យន្តហោះអ្នកដំណើរនៅពីលើ" },
    { t_us: 2000,  enWhat: "A storm cell",         khWhat: "ខ្យល់ព្យុះមួយ" },
  ];
  // d = c·t / 2  → with c = 3·10^8 m/s and t in microseconds (10^-6 s)
  // d_meters = 3e8 * (t_us * 1e-6) / 2 = 150 * t_us
  const distM = (us: number) => 150 * us;

  return (
    <section className="mb-12" data-testid="section-echo">
      <SectionHeader
        spec="02"
        en="How It Works · The Mathematics of an Echo"
        kh="របៀបវាដំណើរការ · គណិតវិទ្យានៃអេកូ"
        k={k}
        Icon={Waves}
        accent={SKY}
      />

      <div className="grid lg:grid-cols-2 gap-5">
        {/* The mechanism */}
        <ConceptCard
          k={k}
          Icon={RadioTower}
          enName="Ping. Listen. Time it."
          khName="ផ្ញើ។ ស្តាប់។ វាស់ពេល។"
          enTag="three steps · billions of times per second"
          khTag="បីជំហាន · រាប់ពាន់លានដងក្នុងមួយវិនាទី"
          enBody="A radar dish does the same thing as a person shouting into a canyon: it sends out a short burst of energy and then immediately stops talking and starts listening. The burst is a pulse of radio waves that travels outward at the speed of light. If it hits nothing, nothing comes back. But if it strikes an aircraft, a raindrop, a ship, or a mountain, a tiny fraction of that energy bounces back to the dish. The dish notes the exact instant the echo arrives. From that single time measurement, the radar can calculate exactly how far away the object is."
          khBody="ចានរ៉ាដាធ្វើដូចគ្នានឹងមនុស្សស្រែកចូលក្នុងអន្លង់ ៖ វាបញ្ជូនថាមពលខ្លីៗមួយ ហើយឈប់និយាយភ្លាមៗ និងចាប់ផ្តើមស្តាប់។ ការបញ្ចេញគឺជាជីពចរនៃរលកវិទ្យុ ដែលធ្វើដំណើរទៅខាងក្រៅក្នុងល្បឿនពន្លឺ។ ប្រសិនបើវាមិនត្រូវអ្វី គ្មានអ្វីត្រឡប់មកវិញ។ ប៉ុន្តែប្រសិនបើវាប៉ះយន្តហោះ ដំណក់ភ្លៀង កប៉ាល់ ឬភ្នំ ផ្នែកតូចមួយនៃថាមពលនោះត្រឡប់មកចានវិញ។ ចានកត់ចំណាំពេលប៉ាន់ស្មានដែលអេកូមកដល់។ ពីការវាស់ពេលវេលាតែមួយនោះ រ៉ាដាអាចគណនាបានថាវត្ថុនៅឆ្ងាយប៉ុន្មាន។"
          accent={SKY}
          glow
        >
          {/* Step diagram: dish → pulse → target → echo → dish */}
          <div
            className="rounded-2xl border-2 p-3"
            style={{
              backgroundColor: NIGHT_2,
              borderColor: `${SKY}55`,
            }}
            data-testid="ping-diagram"
          >
            <svg viewBox="0 0 360 130" className="w-full h-32" aria-hidden="true">
              {/* sky band */}
              <rect x="0" y="0" width="360" height="130" fill="#020617" />
              {/* range marks */}
              {[0, 90, 180, 270, 360].map((x) => (
                <line key={x} x1={x} y1="125" x2={x} y2="118" stroke={SCREEN_DIM} strokeWidth="0.6" />
              ))}
              <line x1="0" y1="125" x2="360" y2="125" stroke={SCREEN_DIM} strokeWidth="0.6" />

              {/* dish on the left */}
              <g>
                <path d="M20,90 Q10,65 20,40 L26,40 Q22,65 26,90 Z" fill={SCREEN_DIM} stroke={SCREEN} strokeWidth="1" />
                <line x1="22" y1="90" x2="22" y2="120" stroke={SCREEN_DIM} strokeWidth="2" />
                <line x1="14" y1="120" x2="30" y2="120" stroke={SCREEN_DIM} strokeWidth="2" />
              </g>

              {/* outgoing pulse (animated) */}
              <g style={{ animation: "pulseOut 3s ease-in-out infinite" }}>
                <path d="M28,55 q40,-10 60,0" stroke={SCREEN} strokeWidth="2" fill="none" />
                <path d="M28,65 q40,-10 60,0" stroke={SCREEN} strokeWidth="2" fill="none" opacity="0.7" />
                <path d="M28,75 q40,-10 60,0" stroke={SCREEN} strokeWidth="2" fill="none" opacity="0.4" />
              </g>

              {/* aircraft target */}
              <g transform="translate(295,55)">
                <path d="M-22,0 L20,0 L24,4 L20,4 L0,12 L-4,4 L-22,4 Z" fill={AMBER} />
                <circle cx="-6" cy="2" r="2" fill="#000" />
              </g>

              {/* returning echo (animated, dashed) */}
              <g style={{ animation: "echoIn 3s ease-in-out infinite" }}>
                <path d="M280,68 q-90,18 -250,4" stroke={AMBER} strokeWidth="1.4" fill="none" strokeDasharray="4 3" />
                <polygon points="38,71 30,68 30,76" fill={AMBER} />
              </g>

              {/* labels */}
              <text x="46" y="28" fontSize="10" fill={SCREEN} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? "១ · ផ្ញើ" : "1 · PING"}
              </text>
              <text x="240" y="28" fontSize="10" fill={AMBER} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? "២ · ឆ្លុះ" : "2 · BOUNCE"}
              </text>
              <text x="46" y="105" fontSize="10" fill={AMBER} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? "៣ · វិលត្រឡប់ → វាស់ពេល" : "3 · RETURN → MEASURE TIME"}
              </text>
            </svg>

            <style>{`
              @keyframes pulseOut {
                0%, 100% { transform: translateX(0); opacity: 1; }
                40%      { transform: translateX(200px); opacity: 0; }
                41%      { opacity: 0; }
              }
              @keyframes echoIn {
                0%, 49%  { opacity: 0; }
                50%      { opacity: 1; }
                100%     { opacity: 0; }
              }
            `}</style>
          </div>
        </ConceptCard>

        {/* The formula + live calculator */}
        <ConceptCard
          k={k}
          Icon={Ruler}
          enName="The distance formula"
          khName="រូបមន្តចម្ងាយ"
          enTag="speed of light × half the round-trip time"
          khTag="ល្បឿនពន្លឺ × ពាក់កណ្តាលនៃពេលទៅមក"
          enBody="The radar measures one number — the time t between sending the pulse and hearing the echo. Radio waves travel at the speed of light, c, which is 300,000,000 metres per second. So in time t, the wave travelled a total distance of c × t. But that distance is the round-trip — out and back. The actual distance to the target is half of that. From a single time measurement and a high-school equation, the radar knows where you are."
          khBody="រ៉ាដាវាស់លេខមួយ — ពេលវេលា t រវាងការផ្ញើជីពចរ និងការឮអេកូ។ រលកវិទ្យុធ្វើដំណើរក្នុងល្បឿនពន្លឺ c ដែលគឺ ៣០០,០០០,០០០ ម៉ែត្រក្នុងមួយវិនាទី។ ដូច្នេះក្នុងពេល t រលកបានធ្វើដំណើរចម្ងាយសរុប c × t។ ប៉ុន្តែចម្ងាយនោះគឺជា ការទៅមក — ទៅខាងក្រៅ និងត្រឡប់មកវិញ។ ចម្ងាយពិតប្រាកដទៅគោលដៅ គឺពាក់កណ្តាលនៃនោះ។ ពីការវាស់ពេលវេលាតែមួយ និងសមីការវិទ្យាល័យមួយ រ៉ាដាដឹងថាអ្នកនៅឯណា។"
          accent={SCREEN}
          glow
          badge={{ en: "Master equation", kh: "សមីការមេ" }}
        >
          {/* Formula block */}
          <div
            className="rounded-2xl p-4 mb-3 border"
            style={{
              backgroundColor: `${SCREEN}0d`,
              borderColor: `${SCREEN}55`,
              boxShadow: `inset 0 0 20px ${SCREEN}1a`,
            }}
            data-testid="distance-formula"
          >
            <div
              className={`text-[10px] mb-2 flex items-center gap-1.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
              style={{ color: SCREEN }}
            >
              <Ruler className="w-3.5 h-3.5" />
              {t("Distance from a single echo", "ចម្ងាយពីអេកូតែមួយ")}
            </div>
            <div className="overflow-x-auto" style={{ color: SCREEN }}>
              <BlockMath math={String.raw`d \;=\; \dfrac{c \times t}{2}`} />
            </div>
            <div className="grid sm:grid-cols-3 gap-2 mt-3 text-[11px]">
              {[
                { sym: "d", enWhat: "distance to the target", khWhat: "ចម្ងាយទៅគោលដៅ" },
                { sym: "c", enWhat: "speed of light · 3·10⁸ m/s", khWhat: "ល្បឿនពន្លឺ · ៣·១០⁸ ម/វិ" },
                { sym: "t", enWhat: "echo round-trip time", khWhat: "ពេលទៅមករបស់អេកូ" },
              ].map((v, i) => (
                <div
                  key={i}
                  className="rounded-lg p-2 border"
                  style={{
                    backgroundColor: NIGHT_2,
                    borderColor: `${SCREEN}33`,
                  }}
                >
                  <div className="font-mono font-extrabold text-base" style={{ color: SCREEN }}>
                    <InlineMath math={v.sym} />
                  </div>
                  <div className={`mt-0.5 ${k ? "font-khmer" : ""}`} style={{ color: WHITE_DIM }}>
                    {k ? v.khWhat : v.enWhat}
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`mt-3 text-[11px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: WHITE_DIM }}
            >
              {t(
                "We divide by 2 because the radio wave had to travel there and back — we only want the one-way distance.",
                "យើងចែកនឹង ២ ព្រោះរលកវិទ្យុត្រូវធ្វើដំណើរទៅ និងត្រឡប់ — យើងចង់បានតែចម្ងាយទិសតែមួយប៉ុណ្ណោះ។"
              )}
            </div>
          </div>

          {/* Worked examples */}
          <div
            className="rounded-2xl p-4 border"
            style={{
              backgroundColor: NIGHT_2,
              borderColor: `${SKY}44`,
            }}
            data-testid="echo-examples"
          >
            <div
              className={`text-[10px] mb-2 flex items-center gap-1.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
              style={{ color: SKY }}
            >
              <Timer className="w-3.5 h-3.5" />
              {t("Worked examples", "ឧទាហរណ៍គណនា")}
            </div>
            <div className="space-y-2">
              {examples.map((ex, i) => {
                const d_km = distM(ex.t_us) / 1000;
                return (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-2 items-center text-[11px] rounded-lg p-2 border"
                    style={{ backgroundColor: PANEL, borderColor: `${SKY}33` }}
                    data-testid={`echo-example-${i}`}
                  >
                    <div className={`col-span-4 ${k ? "font-khmer" : ""}`} style={{ color: WHITE_DIM }}>
                      {k ? ex.khWhat : ex.enWhat}
                    </div>
                    <div className="col-span-3 font-mono" style={{ color: SKY }}>
                      t = {ex.t_us} µs
                    </div>
                    <div className="col-span-1 text-center" style={{ color: WHITE_DIM }}>→</div>
                    <div className="col-span-4 font-mono font-bold" style={{ color: SCREEN }}>
                      d = {d_km.toLocaleString()} km
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ConceptCard>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — A Tool Born in the Dark (WW2 history)
// ════════════════════════════════════════════════════════════════════════════

function SectionHistory({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-history">
      <SectionHeader
        spec="03"
        en="A Tool Born in the Dark"
        kh="ឧបករណ៍ដែលបង្កើតឡើងក្នុងភាពងងឹត"
        k={k}
        Icon={History}
        accent={AMBER}
      />

      <ConceptCard
        k={k}
        Icon={Shield}
        enName="The 1930s · racing the clock to war"
        khName="ទសវត្ស ១៩៣០ · ប្រណាំងពេលវេលាទៅសង្គ្រាម"
        enTag="theory: 1880s · practical radar: late 1930s"
        khTag="ទ្រឹស្តី ៖ ទសវត្ស ១៨៨០ · រ៉ាដាជាក់ស្តែង ៖ ចុងទសវត្ស ១៩៣០"
        enBody="The pure physics behind radar — that radio waves bounce off metal — was understood by Heinrich Hertz back in the 1880s. But for almost fifty years, nobody built it into a useful machine. That changed in the late 1930s, in the years just before the Second World War, when several countries — Britain, Germany, the United States, Japan — secretly raced each other to turn the idea into a working defence system. Britain's Chain Home network, switched on in 1938, was the first national radar early-warning system: a string of 100-metre-tall steel masts along the coast that could detect a German bomber approaching from across the English Channel while it was still over France. For the first time in history, defenders could 'see' their attackers in pitch darkness, in fog, behind clouds — at a distance no human eye could ever match. Many historians believe the war would have looked completely different without it."
        khBody="រូបវិទ្យាសុទ្ធពីក្រោយរ៉ាដា — ថារលកវិទ្យុឆ្លុះចេញពីដែក — ត្រូវបានយល់ដោយ Heinrich Hertz តាំងពីទសវត្ស ១៨៨០។ ប៉ុន្តែសម្រាប់ស្ទើរតែ ៥០ ឆ្នាំ គ្មាននរណាម្នាក់សាងសង់វាជាម៉ាស៊ីនមានប្រយោជន៍ទេ។ វាបានផ្លាស់ប្តូរនៅចុងទសវត្ស ១៩៣០ ក្នុងឆ្នាំមុនសង្គ្រាមលោកលើកទីពីរ នៅពេលប្រទេសជាច្រើន — ចក្រភពអង់គ្លេស អាល្លឺម៉ង់ សហរដ្ឋអាមេរិក ជប៉ុន — បានប្រណាំងគ្នាដោយសម្ងាត់ ដើម្បីបង្វែរគំនិតនេះទៅជាប្រព័ន្ធការពារដំណើរការ។ បណ្តាញ Chain Home របស់អង់គ្លេស ដែលបានបើកដំណើរការក្នុងឆ្នាំ ១៩៣៨ គឺជាប្រព័ន្ធព្រមានរ៉ាដាជាតិលើកដំបូង ៖ ខ្សែបង្គោលដែកខ្ពស់ ១០០ ម៉ែត្រតាមឆ្នេរ ដែលអាចរកឃើញយន្តហោះទម្លាក់គ្រាប់បែកអាល្លឺម៉ង់ដែលមកជិតពីក្រៅឆ្លងសមុទ្រអង់គ្លេស ខណៈពេលដែលវានៅលើបារាំង។ ជាលើកដំបូងក្នុងប្រវត្តិសាស្ត្រ អ្នកការពារអាច 'មើលឃើញ' អ្នកវាយប្រហាររបស់ខ្លួនក្នុងភាពងងឹតស្អុប ក្នុងអ័ព្ទ ខាងក្រោយពពក — នៅចម្ងាយដែលភ្នែកមនុស្សមិនអាចប្រៀបបានឡើយ។ អ្នកប្រវត្តិវិទូជាច្រើនជឿថា សង្គ្រាមនឹងមើលទៅខុសគ្នាទាំងស្រុងបើគ្មានវា។"
        accent={AMBER}
        glow
        badge={{ en: "1938 · Chain Home", kh: "១៩៣៨ · Chain Home" }}
      >
        {/* Mini timeline */}
        <div className="grid sm:grid-cols-4 gap-3" data-testid="history-timeline">
          {[
            { year: "1886", enWhat: "Hertz proves radio waves bounce off metal.",       khWhat: "Hertz បង្ហាញថារលកវិទ្យុឆ្លុះចេញពីដែក។" },
            { year: "1904", enWhat: "First patent for using radio echoes to detect ships.", khWhat: "ប៉ាតង់ដំបូងសម្រាប់ប្រើអេកូវិទ្យុរកឃើញកប៉ាល់។" },
            { year: "1935", enWhat: "Watson-Watt builds a working aircraft-detection demo.", khWhat: "Watson-Watt សាងសង់ការសាកល្បងរកឃើញយន្តហោះ។" },
            { year: "1938", enWhat: "Britain's Chain Home network goes live along the coast.", khWhat: "បណ្តាញ Chain Home របស់អង់គ្លេសបើកដំណើរការតាមឆ្នេរ។" },
          ].map((row, i) => (
            <div
              key={i}
              className="rounded-xl border p-3"
              style={{
                backgroundColor: `${AMBER}0d`,
                borderColor: `${AMBER}55`,
              }}
            >
              <div className="font-mono font-extrabold text-base mb-1" style={{ color: AMBER }}>
                {row.year}
              </div>
              <div className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: WHITE_DIM }}>
                {k ? row.khWhat : row.enWhat}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Callout
            k={k}
            Icon={Eye}
            labelEn="Why it changed history"
            labelKh="ហេតុអ្វីវាបានផ្លាស់ប្តូរប្រវត្តិសាស្ត្រ"
            enTitle="A defender who can see in the dark always wins."
            khTitle="អ្នកការពារដែលអាចមើលឃើញក្នុងភាពងងឹត តែងតែឈ្នះ។"
            enBody="During the Battle of Britain in 1940, German bombers had to fly across the Channel to attack. With radar, British commanders could see the bombers forming up over France, scramble fighter planes early, and meet them in the air with the perfect interception angle. Without radar, the defenders would have been waiting on the ground, looking up at empty sky until it was already too late."
            khBody="ក្នុងសមរភូមិចក្រភពអង់គ្លេសក្នុងឆ្នាំ ១៩៤០ យន្តហោះទម្លាក់គ្រាប់បែកអាល្លឺម៉ង់ត្រូវហោះកាត់សមុទ្រអង់គ្លេសដើម្បីវាយប្រហារ។ ជាមួយរ៉ាដា មេបញ្ជាការអង់គ្លេសអាចមើលឃើញយន្តហោះទម្លាក់គ្រាប់បែកប្រមូលផ្តុំលើបារាំង ឲ្យយន្តហោះប្រយុទ្ធហោះឡើងលឿន ហើយជួបពួកវានៅលើអាកាសក្នុងមុំស្ទាក់ចាប់ល្អឥតខ្ចោះ។ បើគ្មានរ៉ាដា អ្នកការពារនឹងចាំនៅលើដី សម្លឹងមើលមេឃទទេរហូតដល់វាយឺតពេកហើយ។"
            accent={AMBER}
          />
        </div>
      </ConceptCard>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 04 — Modern Uses
// ════════════════════════════════════════════════════════════════════════════

function SectionUses({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-2" data-testid="section-uses">
      <SectionHeader
        spec="04"
        en="Modern Uses"
        kh="ការប្រើប្រាស់ក្នុងសម័យទំនើប"
        k={k}
        Icon={Satellite}
        accent={SKY}
      />

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Air traffic control */}
        <ConceptCard
          k={k}
          Icon={Plane}
          enName="Air Traffic Control"
          khName="ការគ្រប់គ្រងចរាចរអាកាស"
          enTag="Phnom Penh International · 24 hours a day"
          khTag="អាកាសយានដ្ឋានអន្តរជាតិភ្នំពេញ · ២៤ ម៉ោងក្នុងមួយថ្ងៃ"
          enBody="At any given moment over Cambodia there can be a few dozen aircraft in the sky at once: international airliners climbing out of Phnom Penh, smaller planes hopping to Siem Reap, cargo flights heading north to Laos, jets crossing high overhead between Bangkok and Singapore. Each one is just a tiny green dot on a controller's radar screen. The controller, sitting in a dark room in the airport tower, watches the dots move and uses radio to tell each pilot what altitude to climb to, when to turn, and how far to stay from the next aircraft. The minimum allowed gap between two airliners is usually about 5 nautical miles horizontally and 1,000 feet vertically. Radar is the only way humans can see and enforce that invisible grid in the sky."
          khBody="នៅគ្រាណាមួយលើកម្ពុជា អាចមានយន្តហោះរាប់សិបគ្រឿងនៅលើមេឃក្នុងពេលតែមួយ ៖ យន្តហោះអ្នកដំណើរអន្តរជាតិឡើងពីភ្នំពេញ យន្តហោះតូចៗហោះទៅសៀមរាប យន្តហោះដឹកទំនិញហោះទៅខាងជើងទៅឡាវ យន្តហោះជើត (jet) ឆ្លងកាត់ខ្ពស់រវាងបាងកក និងសិង្ហបុរី។ មួយៗ គឺគ្រាន់តែចំណុចបៃតងតូចមួយលើអេក្រង់រ៉ាដារបស់អ្នកគ្រប់គ្រង។ អ្នកគ្រប់គ្រងនោះ អង្គុយក្នុងបន្ទប់ងងឹតក្នុងប៉មអាកាសយានដ្ឋាន មើលចំណុចផ្លាស់ទី និងប្រើវិទ្យុដើម្បីប្រាប់ពោះអាកាសនីមួយៗ ថាត្រូវឡើងកម្ពស់ប៉ុន្មាន ពេលណាត្រូវបត់ និងរក្សាចម្ងាយប៉ុន្មានពីយន្តហោះបន្ទាប់។ ចន្លោះអប្បបរមាដែលអនុញ្ញាតរវាងយន្តហោះអ្នកដំណើរពីរ ជាធម្មតាគឺប្រហែល ៥ ម៉ាយល៍សមុទ្រ ផ្ដេក និង ១,០០០ ហ្វីត បញ្ឈរ។ រ៉ាដាគឺជាមធ្យោបាយតែមួយដែលមនុស្សអាចមើលឃើញ និងអនុវត្តក្រឡាចត្រង្គមើលមិនឃើញនោះនៅលើមេឃ។"
          accent={SKY}
          glow
          badge={{ en: "24 / 7", kh: "២៤ / ៧" }}
        >
          {/* ATC scope mini */}
          <div
            className="rounded-2xl p-3 border-2 flex items-center gap-3"
            style={{
              backgroundColor: NIGHT_2,
              borderColor: `${SKY}44`,
            }}
            data-testid="atc-scope"
          >
            <div className="flex-shrink-0">
              <RadarScope size={120} />
            </div>
            <div className="flex-1 min-w-0 text-[11px] font-mono" style={{ color: SCREEN }}>
              <div style={{ color: SKY }} className={k ? "font-khmer" : ""}>
                {k ? "ការតាមដានសេវាអាកាសចរណ៍" : "TRACKED FLIGHTS · LIVE"}
              </div>
              <div className="mt-2 space-y-1">
                <div>K6 102 · 320° · 32,000 ft</div>
                <div>VN 815 · 285° · 36,000 ft</div>
                <div>SQ 156 · 095° · 41,000 ft</div>
                <div style={{ color: WHITE_DIM }} className={k ? "font-khmer" : ""}>
                  {k ? "។។។ +៤១ ផ្សេងទៀត" : "... +41 more"}
                </div>
              </div>
            </div>
          </div>
        </ConceptCard>

        {/* Meteorology */}
        <ConceptCard
          k={k}
          Icon={CloudRain}
          enName="Meteorology · Watching Storms"
          khName="ឧតុនិយម · ការមើលព្យុះ"
          enTag="bouncing radio off raindrops"
          khTag="ការឆ្លុះវិទ្យុចេញពីដំណក់ភ្លៀង"
          enBody="A second great use of radar in Cambodia is watching the weather. A weather radar sends out radio pulses just like an air-traffic radar, but instead of looking for hard metal aircraft it is looking for soft squishy targets: raindrops, hail, wet snow. Each drop reflects a tiny bit of energy back to the antenna. The denser the rain, the stronger the echo. By colouring the strength of the echoes on a map — green for light rain, yellow for heavy rain, red for dangerous storms — meteorologists can track a developing monsoon cell while it is still 100 kilometres away from a village, and warn farmers and pilots before it hits."
          khBody="ការប្រើប្រាស់ដ៏សំខាន់ទីពីរនៃរ៉ាដាក្នុងកម្ពុជា គឺការមើលអាកាសធាតុ។ រ៉ាដាអាកាសធាតុ ផ្ញើជីពចរវិទ្យុដូចរ៉ាដាចរាចរអាកាសដែរ ប៉ុន្តែជំនួសឲ្យការស្វែងរកយន្តហោះដែករឹង វាស្វែងរកគោលដៅទន់ៗ ៖ ដំណក់ភ្លៀង ព្រឹល និងព្រិលសើម។ ដំណក់នីមួយៗឆ្លុះថាមពលតូចមួយត្រឡប់មកអង់តែន។ ភ្លៀងកាន់តែក្រាស់ អេកូកាន់តែខ្លាំង។ ដោយដាក់ពណ៌កម្លាំងនៃអេកូលើផែនទី — បៃតងសម្រាប់ភ្លៀងស្រាល លឿងសម្រាប់ភ្លៀងធំ និងក្រហមសម្រាប់ព្យុះគ្រោះថ្នាក់ — អ្នកឧតុនិយមអាចតាមដានកោសិកាខ្យល់មូសុង ខណៈវានៅឆ្ងាយ ១០០ គីឡូម៉ែត្រពីភូមិមួយ ហើយព្រមានកសិករ និងពោះអាកាសមុនវាមកដល់។"
          accent={RED}
          glow
          badge={{ en: "Storm watch", kh: "ឃ្លាំមើលព្យុះ" }}
        >
          {/* Weather radar map mock */}
          <div
            className="rounded-2xl p-3 border-2"
            style={{
              backgroundColor: NIGHT_2,
              borderColor: `${RED}44`,
            }}
            data-testid="weather-radar"
          >
            <svg viewBox="0 0 320 160" className="w-full h-36" aria-hidden="true">
              {/* land background */}
              <rect x="0" y="0" width="320" height="160" fill="#0b1f12" />
              {/* grid */}
              {[40, 80, 120].map((y) => (
                <line key={y} x1="0" y1={y} x2="320" y2={y} stroke={SCREEN_DIM} strokeWidth="0.3" opacity="0.5" />
              ))}
              {[80, 160, 240].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="160" stroke={SCREEN_DIM} strokeWidth="0.3" opacity="0.5" />
              ))}

              {/* Storm cell — layered intensity */}
              <ellipse cx="200" cy="80" rx="60" ry="35" fill="#16a34a" opacity="0.55" />
              <ellipse cx="200" cy="80" rx="42" ry="24" fill="#facc15" opacity="0.7" />
              <ellipse cx="200" cy="80" rx="22" ry="14" fill="#ef4444" opacity="0.85" />
              <ellipse cx="200" cy="80" rx="9"  ry="6"  fill="#7f1d1d" />

              {/* Smaller cell */}
              <ellipse cx="80" cy="115" rx="28" ry="14" fill="#16a34a" opacity="0.55" />
              <ellipse cx="80" cy="115" rx="14" ry="7"  fill="#facc15" opacity="0.75" />

              {/* Village marker (Phnom Penh) */}
              <g transform="translate(115,60)">
                <circle r="3.5" fill={SKY} />
                <text x="6" y="3" fontSize="9" fill={SKY} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                  {k ? "ភ្នំពេញ" : "PHNOM PENH"}
                </text>
              </g>

              {/* Movement arrow */}
              <line x1="240" y1="80" x2="155" y2="65" stroke={RED} strokeWidth="1.5" strokeDasharray="4 3" />
              <polygon points="155,65 162,62 162,68" fill={RED} />
              <text x="170" y="50" fontSize="9" fill={RED} fontFamily={k ? "Hanuman, serif" : "monospace"}>
                {k ? "ផ្លាស់ ៤០ គម/ម៉" : "MOVING · 40 km/h"}
              </text>
            </svg>

            {/* legend */}
            <div className="mt-2 flex items-center gap-3 text-[10px]" style={{ color: WHITE_DIM }}>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: "#16a34a" }} />
                <span className={k ? "font-khmer" : ""}>{k ? "ស្រាល" : "Light"}</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: "#facc15" }} />
                <span className={k ? "font-khmer" : ""}>{k ? "ធំ" : "Heavy"}</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: "#ef4444" }} />
                <span className={k ? "font-khmer" : ""}>{k ? "គ្រោះថ្នាក់" : "Dangerous"}</span>
              </span>
            </div>
          </div>
        </ConceptCard>
      </div>

      <div className="mt-5 grid sm:grid-cols-3 gap-3">
        {[
          { Icon: Crosshair, en: "Police speed guns",   kh: "កាំភ្លើងវាស់ល្បឿនប៉ូលីស",   enB: "A handheld radar bounces a wave off your car and measures the frequency shift to read your speed.", khB: "រ៉ាដាដៃឆ្លុះរលកមួយចេញពីឡាន និងវាស់ការផ្លាស់ប្តូរប្រេកង់ដើម្បីអានល្បឿនរបស់អ្នក។" },
          { Icon: Wind,      en: "Self-driving cars",   kh: "ឡានបើកបរដោយខ្លួនឯង",        enB: "Modern cars use small radar units in the bumpers to spot pedestrians and other cars in fog or heavy rain.", khB: "ឡានទំនើបប្រើឯកតារ៉ាដាតូចៗក្នុងឧបករណ៍ការពារដើម្បីមើលឃើញថ្មើរជើង និងឡានដទៃក្នុងអ័ព្ទ ឬភ្លៀងធំ។" },
          { Icon: Zap,       en: "Mapping the planets", kh: "ការគូសផែនទីភពនានា",         enB: "NASA radars on Magellan saw through Venus's permanent cloud cover to map every mountain on its surface.", khB: "រ៉ាដារបស់ NASA លើ Magellan មើលកាត់ពពកអចិន្ត្រៃយ៍របស់ផ្កាយព្រឹក្ស ដើម្បីគូសផែនទីភ្នំនីមួយៗលើផ្ទៃរបស់វា។" },
        ].map((u, i) => {
          const Icon = u.Icon;
          return (
            <div
              key={i}
              className="rounded-xl p-3 border"
              style={{
                backgroundColor: PANEL,
                borderColor: `${SCREEN}33`,
              }}
              data-testid={`extra-use-${i}`}
            >
              <Icon className="w-5 h-5 mb-2" style={{ color: SCREEN }} />
              <div className={`text-sm font-bold mb-1 ${k ? "font-khmer" : ""}`} style={{ color: "#f1f5f9" }}>
                {k ? u.kh : u.en}
              </div>
              <div className={`text-[11px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: WHITE_DIM }}>
                {k ? u.khB : u.enB}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <Callout
          k={k}
          Icon={Info}
          labelEn="Worth knowing"
          labelKh="គួរដឹង"
          enTitle="Stealth aircraft are stealthy because of radar."
          khTitle="យន្តហោះស្តេលថ៍ ស្ងាត់ដោយសារ​ រ៉ាដា។"
          enBody="A 'stealth' jet is not invisible to your eye — only to radar. Its surface is shaped at sharp angles and coated in special materials so that incoming radio waves bounce off in random directions instead of straight back to the dish. The result: even though the plane is physically there, the operator's screen shows no echo."
          khBody="យន្តហោះ 'ស្តេលថ៍' មិនមើលមិនឃើញដោយភ្នែករបស់អ្នកទេ — តែចំពោះរ៉ាដាប៉ុណ្ណោះ។ ផ្ទៃរបស់វាត្រូវបានចម្លាក់ជាមុំស្រួច និងស្រោបដោយសម្ភារៈពិសេស ដើម្បីឲ្យរលកវិទ្យុដែលចូលមកឆ្លុះចេញក្នុងទិសដៅចៃដន្យ ជំនួសឲ្យត្រឡប់ត្រង់ៗមកចានវិញ។ លទ្ធផល ៖ ទោះបីយន្តហោះនៅទីនោះជាក់ស្តែង អេក្រង់របស់អ្នកប្រតិបត្តិការមិនបង្ហាញអេកូទេ។"
          accent={AMBER}
        />
      </div>
    </section>
  );
}
