import { useId } from "react";
import {
  Droplets, Heart, Activity, AlertTriangle, AlertOctagon, Zap,
  CupSoda, Beaker, ShieldCheck, Brain, Wind, Sun, Info,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
 * Dehydration: The Silent Threat
 *   ការខ្វះជាតិទឹក៖ ការគំរាមកំហែងដោយស្ងៀមស្ងាត់
 *
 * Strictly bilingual self-contained widget. Three sections:
 *   1. The Biology of Water Loss — body 60% water, blood thickens
 *   2. The Stages of Dehydration — Mild / Moderate / Severe warning cards
 *   3. Prevention & Rehydration — electrolytes + frugal ORS recipe
 *
 * Aesthetic: Survival/Medical — dry earth browns transitioning to refreshing
 * water blues, with high-contrast alert yellows/reds for severe symptoms.
 * ══════════════════════════════════════════════════════════════════════════ */

/* ── Color palette ─────────────────────────────────────────────────────── */
const EARTH = "#a16207";       // amber-700 (dry earth)
const EARTH_LIGHT = "#fde68a"; // amber-200
const WATER = "#0284c7";       // sky-600 (refreshing water)
const WATER_LIGHT = "#bae6fd"; // sky-200
const ALERT_RED = "#dc2626";   // red-600

/* ──────────────────────────────────────────────────────────────────────── */
/* Bilingual helpers                                                        */
/* ──────────────────────────────────────────────────────────────────────── */

/** Stacked bilingual block — English line on top, Khmer mirror below. */
function Bili({
  en, kh, primaryClass = "", secondaryClass = "",
}: { en: string; kh: string; primaryClass?: string; secondaryClass?: string }) {
  return (
    <span className="inline-flex flex-col leading-tight">
      <span className={primaryClass}>{en}</span>
      <span className={`${secondaryClass || "text-xs italic text-slate-500"} font-khmer not-italic leading-loose`}>
        {kh}
      </span>
    </span>
  );
}

/** Inline bilingual — `English · ខ្មែរ`. */
function BiliInline({ en, kh, className = "" }: { en: string; kh: string; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0 ${className}`}>
      <span>{en}</span>
      <span aria-hidden className="opacity-50">·</span>
      <span className="font-khmer">{kh}</span>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Top-level widget
 * ══════════════════════════════════════════════════════════════════════════ */

export function DehydrationModule() {
  return (
    <section
      data-testid="dehydration-module"
      aria-label="Dehydration: The Silent Threat / ការខ្វះជាតិទឹក៖ ការគំរាមកំហែងដោយស្ងៀមស្ងាត់"
      className="relative mt-10 rounded-3xl shadow-xl overflow-hidden border-4 border-amber-700/60"
      style={{
        background:
          "linear-gradient(180deg, #fef3c7 0%, #fde68a 18%, #fef3c7 30%, #e0f2fe 65%, #bae6fd 100%)",
      }}
    >
      <DryToWaterBackdrop />

      <div className="relative px-5 sm:px-8 py-8 sm:py-10">
        <DehydrationHeader />

        {/* Section 1 — Biology */}
        <BiologySection />

        {/* Section 2 — Stages */}
        <StagesSection />

        {/* Section 3 — Prevention & Rehydration */}
        <PreventionSection />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Backdrop — subtle cracked-earth grid up top fading into water ripples
 * ══════════════════════════════════════════════════════════════════════════ */
function DryToWaterBackdrop() {
  const id = useId();
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <svg width="100%" height="100%">
        <defs>
          <pattern id={`crack-${id}`} width="60" height="52" patternUnits="userSpaceOnUse">
            <path
              d="M0,26 L20,18 L34,32 L60,22 M30,0 L24,20 L40,38 L34,52"
              stroke={EARTH}
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
          </pattern>
          <pattern id={`ripple-${id}`} width="80" height="40" patternUnits="userSpaceOnUse">
            <path d="M0,20 Q20,10 40,20 T80,20" stroke={WATER} strokeWidth="1" fill="none" opacity="0.35" />
            <path d="M0,32 Q20,22 40,32 T80,32" stroke={WATER} strokeWidth="1" fill="none" opacity="0.25" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="40%" fill={`url(#crack-${id})`} opacity="0.5" />
        <rect x="0" y="60%" width="100%" height="40%" fill={`url(#ripple-${id})`} opacity="0.7" />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Module header
 * ══════════════════════════════════════════════════════════════════════════ */
function DehydrationHeader() {
  return (
    <header className="mb-8">
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-14 h-14 rounded-2xl text-white shadow-lg flex items-center justify-center ring-2 ring-amber-300"
          style={{ background: `linear-gradient(135deg, ${EARTH} 0%, ${WATER} 100%)` }}
        >
          <Droplets className="w-7 h-7" strokeWidth={2.2} aria-hidden />
        </div>
        <div className="min-w-0">
          {/* Bilingual eyebrow */}
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-800 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span>Survival · Medical Briefing</span>
            <span aria-hidden className="opacity-50">·</span>
            <span className="font-khmer normal-case tracking-normal text-xs">
              ការរស់រាន · សេចក្តីប្រឹក្សាវេជ្ជសាស្ត្រ
            </span>
          </div>
          {/* Bilingual title */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mt-1">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(90deg, ${EARTH} 0%, ${WATER} 100%)` }}
            >
              Dehydration: The Silent Threat
            </span>
          </h2>
          <p className="font-khmer text-lg sm:text-xl text-amber-900/90 leading-loose mt-1">
            ការខ្វះជាតិទឹក៖ ការគំរាមកំហែងដោយស្ងៀមស្ងាត់
          </p>
          {/* Bilingual subtitle */}
          <div className="mt-3 text-sm sm:text-base text-slate-800 max-w-3xl">
            <p>
              You can survive weeks without food but only days without water.
              Learn how the body loses fluid, the warning signs to never ignore,
              and a frugal recipe that has saved millions of lives.
            </p>
            <p className="font-khmer text-base leading-loose text-slate-700 mt-1">
              អ្នកអាចរស់បានរាប់សប្តាហ៍ដោយគ្មានអាហារ ប៉ុន្តែបានត្រឹមរាប់ថ្ងៃប៉ុណ្ណោះដោយគ្មានទឹក ។
              មកស្វែងយល់ពីរបៀបដែលរាងកាយបាត់បង់ជាតិទឹក សញ្ញាព្រមានដែលមិនត្រូវមើលរំលង
              និងរូបមន្តសន្សំសំចៃមួយដែលបានសង្គ្រោះជីវិតរាប់លាននាក់ ។
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 1 — The Biology of Water Loss
 * ══════════════════════════════════════════════════════════════════════════ */

function BiologySection() {
  const losses: { Icon: React.ComponentType<{ className?: string }>; en: string; kh: string }[] = [
    { Icon: Droplets, en: "Sweating", kh: "ការបែកញើស" },
    { Icon: Wind,     en: "Breathing", kh: "ការដកដង្ហើម" },
    { Icon: Activity, en: "Bathroom (urine)", kh: "ការបន្ទោបង់ (នោម)" },
  ];
  return (
    <article
      data-testid="section-biology"
      className="rounded-2xl border-2 border-amber-700/50 bg-white/85 backdrop-blur p-5 sm:p-6 shadow-md"
    >
      <header className="flex items-start gap-3 mb-4">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-xl text-white flex items-center justify-center font-display font-extrabold shadow-md"
          style={{ background: EARTH }}
        >
          1
        </div>
        <Bili
          en="The Biology of Water Loss"
          kh="ជីវវិទ្យានៃការបាត់បង់ជាតិទឹក"
          primaryClass="font-display text-xl sm:text-2xl font-bold text-amber-950"
          secondaryClass="text-sm text-amber-800/80 italic"
        />
      </header>

      <div className="grid md:grid-cols-[auto_1fr] gap-5 items-start">
        {/* Body-water visual — silhouette filled 60% with water */}
        <BodyWaterDiagram />

        <div>
          {/* Bilingual fact */}
          <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50/80 px-4 py-3 mb-4">
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              The human body is roughly{" "}
              <strong className="text-sky-700">60% water</strong>. Every minute
              of every day we leak it out through{" "}
              <strong>sweating</strong>, <strong>breathing</strong>, and{" "}
              <strong>using the bathroom</strong>.
            </p>
            <p className="font-khmer text-base leading-loose text-slate-700 mt-1">
              រាងកាយមនុស្សមានជាតិទឹកប្រហែល <strong className="text-sky-700">៦០%</strong> ។
              រាល់នាទីនៃរាល់ថ្ងៃ យើងបាត់បង់វាតាមរយៈ
              <strong>ការបែកញើស</strong> <strong>ការដកដង្ហើម</strong> និង
              <strong>ការបន្ទោបង់</strong> ។
            </p>
          </div>

          {/* Three loss vectors */}
          <ul className="grid grid-cols-3 gap-2 mb-4" data-testid="loss-vectors">
            {losses.map((l) => (
              <li
                key={l.en}
                className="rounded-xl border-2 border-amber-300 bg-amber-50 px-2 py-2 flex flex-col items-center text-center shadow-sm"
              >
                <l.Icon className="w-5 h-5 text-amber-700 mb-1" aria-hidden />
                <span className="text-xs font-bold text-amber-900 leading-tight">{l.en}</span>
                <span className="font-khmer text-xs text-amber-800 leading-loose">{l.kh}</span>
              </li>
            ))}
          </ul>

          {/* Blood-thickens consequence */}
          <div className="rounded-xl border-2 border-rose-300 bg-rose-50/80 px-4 py-3 flex items-start gap-3">
            <Heart className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" aria-hidden />
            <div className="text-sm sm:text-base leading-relaxed text-slate-800">
              <p>
                If we don't replace it, the blood literally becomes{" "}
                <strong className="text-rose-700">thicker</strong>, forcing the
                heart to work <strong className="text-rose-700">much harder</strong>{" "}
                to pump it through every vein.
              </p>
              <p className="font-khmer text-base leading-loose text-slate-700 mt-1">
                ប្រសិនបើយើងមិនបំពេញវាវិញទេ ឈាមប្រែជា<strong className="text-rose-700">កាន់តែក្រាស់</strong>
                តាមការពិត ដែលបង្ខំឱ្យបេះដូងធ្វើការ
                <strong className="text-rose-700">លំបាកជាងមុនច្រើន</strong>
                ដើម្បីបូមវាឆ្លងកាត់សរសៃឈាមនីមួយៗ ។
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Simple silhouette filled to 60% with water — visual anchor for the fact. */
function BodyWaterDiagram() {
  return (
    <figure
      className="flex flex-col items-center"
      role="img"
      aria-label="Body silhouette showing 60% water content / រូបរាងកាយបង្ហាញជាតិទឹក ៦០%"
    >
      <svg viewBox="0 0 120 200" className="w-32 h-52" aria-hidden>
        <defs>
          <clipPath id="body-clip">
            {/* Head + body silhouette */}
            <circle cx="60" cy="28" r="20" />
            <path d="M30,55 Q60,45 90,55 L92,150 Q60,160 28,150 Z" />
            <rect x="36" y="148" width="22" height="52" rx="8" />
            <rect x="62" y="148" width="22" height="52" rx="8" />
          </clipPath>
        </defs>
        {/* Outline */}
        <g fill="none" stroke="#78350f" strokeWidth="2.5">
          <circle cx="60" cy="28" r="20" />
          <path d="M30,55 Q60,45 90,55 L92,150 Q60,160 28,150 Z" />
          <rect x="36" y="148" width="22" height="52" rx="8" />
          <rect x="62" y="148" width="22" height="52" rx="8" />
        </g>
        {/* Dry-earth fill (top 40%) */}
        <rect x="0" y="0" width="120" height="80" fill={EARTH_LIGHT} clipPath="url(#body-clip)" />
        {/* Water fill (bottom 60%) */}
        <rect x="0" y="80" width="120" height="120" fill={WATER_LIGHT} clipPath="url(#body-clip)" />
        {/* Wave at the water line */}
        <path
          d="M0,80 Q15,74 30,80 T60,80 T90,80 T120,80"
          stroke={WATER}
          strokeWidth="2"
          fill="none"
          clipPath="url(#body-clip)"
        />
        {/* 60% label */}
        <text x="60" y="125" textAnchor="middle" fontSize="22" fontWeight="800" fill="#075985">
          60%
        </text>
      </svg>
      <figcaption className="mt-1 text-center text-[11px] text-slate-700 leading-tight">
        <div>You are 60% water</div>
        <div className="font-khmer text-xs leading-loose">អ្នកមានទឹក ៦០%</div>
      </figcaption>
    </figure>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 2 — The Stages of Dehydration
 * ══════════════════════════════════════════════════════════════════════════ */

type StageSpec = {
  testid: string;
  num: 1 | 2 | 3;
  Icon: React.ComponentType<{ className?: string }>;
  labelEn: string;
  labelKh: string;
  emergency?: boolean;
  symptoms: { en: string; kh: string; key?: boolean }[];
  noteEn?: string;
  noteKh?: string;
  // Tailwind classes for the card tone
  cardClass: string;
  headerClass: string;
  badgeClass: string;
  numColor: string;
};

const STAGES: StageSpec[] = [
  {
    testid: "stage-mild",
    num: 1,
    Icon: AlertTriangle,
    labelEn: "Mild",
    labelKh: "កម្រិតស្រាល",
    symptoms: [
      { en: "Dry mouth", kh: "មាត់ស្ងួត" },
      { en: "Headache", kh: "ឈឺក្បាល" },
      { en: "Slight fatigue", kh: "អស់កម្លាំងបន្តិច" },
      { en: "Dark yellow urine", kh: "ទឹកនោមពណ៌លឿងចាស់", key: true },
    ],
    noteEn: "Urine color is the most accurate physical map of your hydration!",
    noteKh: "ពណ៌ទឹកនោមគឺជាផែនទីរូបវន្តដែលត្រឹមត្រូវបំផុតនៃជាតិទឹករបស់អ្នក !",
    cardClass: "border-yellow-400 bg-yellow-50",
    headerClass: "bg-yellow-300 text-yellow-950",
    badgeClass: "bg-yellow-200 text-yellow-900 border-yellow-400",
    numColor: "#ca8a04", // yellow-600
  },
  {
    testid: "stage-moderate",
    num: 2,
    Icon: AlertOctagon,
    labelEn: "Moderate",
    labelKh: "កម្រិតមធ្យម",
    symptoms: [
      { en: "Extreme thirst", kh: "ស្រេកទឹកខ្លាំង" },
      { en: "Dizziness when standing up fast", kh: "វិលមុខពេលក្រោកឈរលឿន", key: true },
      { en: "Muscle cramps", kh: "ការរួញសាច់ដុំ" },
      { en: "Rapid heart rate", kh: "ចង្វាក់បេះដូងលឿន" },
    ],
    noteEn: "Dizziness happens because blood volume has dropped — there is less liquid for the heart to push.",
    noteKh: "ការវិលមុខកើតឡើងព្រោះបរិមាណឈាមបានធ្លាក់ចុះ — មានសារធាតុរាវតិចជាងមុនសម្រាប់បេះដូងបូម ។",
    cardClass: "border-orange-500 bg-orange-50",
    headerClass: "bg-orange-500 text-white",
    badgeClass: "bg-orange-200 text-orange-900 border-orange-500",
    numColor: "#ea580c", // orange-600
  },
  {
    testid: "stage-severe",
    num: 3,
    Icon: AlertOctagon,
    labelEn: "Severe — Medical Emergency",
    labelKh: "កម្រិតធ្ងន់ធ្ងរ — អាសន្នវេជ្ជសាស្ត្រ",
    emergency: true,
    symptoms: [
      { en: "Confusion", kh: "ការច្រឡំស្មារតី" },
      { en: "Fainting", kh: "ការសន្លប់" },
      { en: "Skin stops sweating", kh: "ស្បែកឈប់បែកញើស", key: true },
    ],
    noteEn: "If someone is in the hot sun and their skin is completely dry and hot, the body has run out of coolant — they are approaching a lethal heatstroke. Get medical help immediately.",
    noteKh: "ប្រសិនបើនរណាម្នាក់នៅក្រោមកម្ដៅព្រះអាទិត្យហើយស្បែករបស់គេស្ងួត និងក្តៅទាំងស្រុង រាងកាយរបស់គេបានអស់ពីសារធាតុបញ្ចុះកម្ដៅ — គេខិតជិតទៅរកគ្រោះថ្នាក់ខូចមុខងារដោយកម្ដៅ ដែលអាចស្លាប់បាន ។ សូមហៅជំនួយវេជ្ជសាស្ត្រភ្លាមៗ ។",
    cardClass: "border-red-700 bg-red-50",
    headerClass: "bg-red-700 text-white",
    badgeClass: "bg-red-200 text-red-900 border-red-600",
    numColor: ALERT_RED,
  },
];

function StagesSection() {
  return (
    <article
      data-testid="section-stages"
      className="mt-8 rounded-2xl border-2 border-amber-700/50 bg-white/85 backdrop-blur p-5 sm:p-6 shadow-md"
    >
      <header className="flex items-start gap-3 mb-4">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-xl text-white flex items-center justify-center font-display font-extrabold shadow-md"
          style={{ background: EARTH }}
        >
          2
        </div>
        <Bili
          en="The Stages of Dehydration"
          kh="ដំណាក់កាលនៃការខ្វះជាតិទឹក"
          primaryClass="font-display text-xl sm:text-2xl font-bold text-amber-950"
          secondaryClass="text-sm text-amber-800/80 italic"
        />
      </header>

      <p className="text-sm sm:text-base text-slate-700 mb-4 leading-relaxed">
        Watch the body for these clear signs — every stage is louder than the last.
      </p>
      <p className="font-khmer text-base text-slate-600 leading-loose -mt-3 mb-5">
        សូមឃ្លាំមើលរាងកាយរកសញ្ញាច្បាស់លាស់ទាំងនេះ — ដំណាក់កាលនីមួយៗឮខ្លាំងជាងមុន ។
      </p>

      <div className="grid md:grid-cols-3 gap-4" data-testid="stages-grid">
        {STAGES.map((s) => (
          <StageCard key={s.testid} stage={s} />
        ))}
      </div>
    </article>
  );
}

function StageCard({ stage }: { stage: StageSpec }) {
  const { Icon } = stage;
  return (
    <div
      data-testid={stage.testid}
      className={`rounded-2xl border-2 ${stage.cardClass} shadow-sm overflow-hidden flex flex-col`}
    >
      {/* Header band */}
      <div className={`px-4 py-2.5 ${stage.headerClass} flex items-center gap-2`}>
        <span
          className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-sm font-extrabold shadow-sm"
          style={{ color: stage.numColor }}
        >
          {stage.num}
        </span>
        <Icon className="w-5 h-5 flex-shrink-0" aria-hidden />
        <div className="leading-tight min-w-0">
          <div className="font-display font-extrabold text-sm sm:text-base">
            <BiliInline en={`Stage ${stage.num} — ${stage.labelEn}`} kh={`ដំណាក់កាលទី ${stage.num} — ${stage.labelKh}`} />
          </div>
        </div>
      </div>

      {/* Symptom list */}
      <ul className="px-4 py-3 space-y-2" data-testid={`${stage.testid}-symptoms`}>
        {stage.symptoms.map((sym, i) => (
          <li
            key={i}
            className={`flex items-start gap-2 text-sm leading-snug ${
              sym.key ? "rounded-md px-2 py-1.5 -mx-1 ring-2 ring-offset-1 ring-current" : ""
            }`}
            style={sym.key ? { color: stage.numColor } : undefined}
          >
            <span
              aria-hidden
              className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: stage.numColor }}
            />
            <span className="flex-1 text-slate-800">
              <span className={sym.key ? "font-bold" : ""}>{sym.en}</span>
              <span className="font-khmer text-sm leading-loose text-slate-700 block">{sym.kh}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Footer note */}
      {stage.noteEn && (
        <div
          className={`mt-auto px-4 py-2.5 border-t-2 text-xs sm:text-sm leading-relaxed ${
            stage.emergency ? "bg-red-700 text-white border-red-800" : "bg-white/70 border-amber-200 text-slate-700"
          }`}
        >
          <div className="flex items-start gap-2">
            {stage.emergency ? (
              <Zap className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden />
            ) : (
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-700" aria-hidden />
            )}
            <div>
              <p>{stage.noteEn}</p>
              <p className="font-khmer text-sm leading-loose mt-0.5">{stage.noteKh}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 3 — Prevention & Rehydration
 * ══════════════════════════════════════════════════════════════════════════ */

function PreventionSection() {
  return (
    <article
      data-testid="section-prevention"
      className="mt-8 rounded-2xl border-2 border-sky-600/60 bg-white/90 backdrop-blur p-5 sm:p-6 shadow-md"
    >
      <header className="flex items-start gap-3 mb-4">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-xl text-white flex items-center justify-center font-display font-extrabold shadow-md"
          style={{ background: WATER }}
        >
          3
        </div>
        <Bili
          en="Prevention & Rehydration"
          kh="ការការពារ និងការបំពេញជាតិទឹក"
          primaryClass="font-display text-xl sm:text-2xl font-bold text-sky-900"
          secondaryClass="text-sm text-sky-700/80 italic"
        />
      </header>

      {/* Lead — water alone is not always enough */}
      <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50/80 px-4 py-3 mb-5">
        <div className="flex items-start gap-3">
          <CupSoda className="w-5 h-5 text-sky-700 flex-shrink-0 mt-0.5" aria-hidden />
          <div className="text-sm sm:text-base leading-relaxed text-slate-800">
            <p>
              Just drinking <strong>pure water</strong> is{" "}
              <strong className="text-rose-700">not always enough</strong> if
              you've been sweating heavily — sweat carries away salts your body
              urgently needs back.
            </p>
            <p className="font-khmer text-base leading-loose text-slate-700 mt-1">
              ការផឹក<strong>ទឹកសុទ្ធ</strong>តែឯង
              <strong className="text-rose-700">មិនតែងតែគ្រប់គ្រាន់ទេ</strong>
              ប្រសិនបើអ្នកបានបែកញើសច្រើន — ញើសយកអំបិលចេញពីខ្លួន ដែលរាងកាយត្រូវការវាមកវិញជាបន្ទាន់ ។
            </p>
          </div>
        </div>
      </div>

      {/* Electrolytes concept */}
      <div className="rounded-xl border-2 border-sky-300 bg-gradient-to-br from-sky-50 to-cyan-50 p-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow">
            <Zap className="w-5 h-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <Bili
              en="Electrolytes — the Body's Electrical Wires"
              kh="អេឡិចត្រូលីត — ខ្សែភ្លើងនៃរាងកាយ"
              primaryClass="font-display text-lg font-extrabold text-sky-900"
              secondaryClass="text-sm text-sky-700/80 italic"
            />
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed mt-2">
              <strong>Salt</strong> (sodium) and <strong>potassium</strong> are
              the "electrical wires" of the body — they carry the signals that
              fire your muscles and your brain. When you sweat them out, you
              must put them back.
            </p>
            <p className="font-khmer text-base leading-loose text-slate-700 mt-1">
              <strong>អំបិល</strong>(សូដ្យូម) និង<strong>ប៉ូតាស្យូម</strong>គឺជា
              "ខ្សែភ្លើង"នៃរាងកាយ — ពួកវាដឹកសញ្ញាដែលធ្វើឱ្យសាច់ដុំ និងខួរក្បាលរបស់អ្នកដំណើរការ ។
              ពេលអ្នកបែកញើសវាចេញ អ្នកត្រូវដាក់វាចូលមកវិញ ។
            </p>
          </div>
        </div>
      </div>

      {/* ORS frugal recipe card */}
      <ORSRecipeCard />

      {/* Reassurance */}
      <div className="mt-5 rounded-xl border-2 border-emerald-300 bg-emerald-50/80 px-4 py-3 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" aria-hidden />
        <div className="text-sm sm:text-base leading-relaxed text-slate-800">
          <p>
            This simple ORS formula has saved <strong>tens of millions of lives</strong>{" "}
            worldwide — especially children with diarrhoea. It is one of the
            most powerful health discoveries of the 20<sup>th</sup> century.
          </p>
          <p className="font-khmer text-base leading-loose text-slate-700 mt-1">
            រូបមន្ត ORS ដ៏សាមញ្ញនេះបានសង្គ្រោះ<strong>ជីវិតរាប់សិបលាននាក់</strong>នៅទូទាំងពិភពលោក —
            ជាពិសេសកុមារដែលរាករូស ។ វាជារបកគំហើញសុខភាពដ៏មានឥទ្ធិពលបំផុតមួយនៃសតវត្សរ៍ទី ២០ ។
          </p>
        </div>
      </div>
    </article>
  );
}

/** Frugal Oral Rehydration Salts — visual recipe card. */
function ORSRecipeCard() {
  return (
    <div
      data-testid="ors-recipe"
      className="relative rounded-2xl border-4 border-sky-600 bg-white p-5 shadow-lg overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
        style={{ background: WATER }}
      />
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md">
            <Beaker className="w-6 h-6" aria-hidden />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-700">
              <BiliInline en="Survival Recipe · ORS" kh="រូបមន្តរស់រាន · ORS" />
            </div>
            <h4 className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
              Oral Rehydration Salts
            </h4>
            <p className="font-khmer text-base text-slate-700 leading-loose">
              អំបិលបំពេញជាតិទឹកតាមមាត់
            </p>
          </div>
        </div>

        {/* The 3 ingredients */}
        <ol
          className="grid sm:grid-cols-3 gap-3 mt-4"
          data-testid="ors-ingredients"
        >
          <Ingredient
            num="1"
            Icon={Droplets}
            color={WATER}
            qtyEn="1 liter"
            qtyKh="១ លីត្រ"
            ingEn="Clean water"
            ingKh="ទឹកស្អាត"
          />
          <Ingredient
            num="2"
            Icon={CupSoda}
            color="#b45309"
            qtyEn="6 level teaspoons"
            qtyKh="៦ ស្លាបព្រាកាហ្វេរាប"
            ingEn="Sugar"
            ingKh="ស្ករស"
          />
          <Ingredient
            num="3"
            Icon={Zap}
            color="#0f172a"
            qtyEn="½ level teaspoon"
            qtyKh="១/២ ស្លាបព្រាកាហ្វេរាប"
            ingEn="Salt"
            ingKh="អំបិល"
          />
        </ol>

        {/* Mixing instruction */}
        <div className="mt-4 rounded-xl border-2 border-dashed border-sky-300 bg-sky-50/70 px-4 py-3 text-sm leading-relaxed text-slate-800">
          <p>
            <strong className="text-sky-700">Mix well</strong> until the sugar
            and salt fully dissolve. Sip slowly over the next few hours — never
            gulp it all at once. Make a fresh batch every 24 hours.
          </p>
          <p className="font-khmer text-base leading-loose text-slate-700 mt-1">
            <strong className="text-sky-700">លាយឱ្យល្អ</strong>រហូតទាល់តែស្ករ និងអំបិលរលាយទាំងស្រុង ។
            ស្រូបយឺតៗក្នុងរយៈពេលប៉ុន្មានម៉ោងបន្ទាប់ — កុំផឹកអស់ភ្លាមៗឡើយ ។ ត្រូវលាយថ្មីរៀងរាល់ ២៤ ម៉ោងម្តង ។
          </p>
        </div>

        {/* Safety footnote */}
        <div className="mt-3 flex items-start gap-2 text-xs sm:text-sm text-slate-600">
          <Brain className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" aria-hidden />
          <p className="leading-relaxed">
            <span>Use exact measurements — too much salt is dangerous.</span>
            <span aria-hidden className="opacity-50 mx-1.5">·</span>
            <span className="font-khmer">ប្រើបរិមាណឱ្យត្រឹមត្រូវ — អំបិលច្រើនពេកគ្រោះថ្នាក់ ។</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Ingredient({
  num, Icon, color, qtyEn, qtyKh, ingEn, ingKh,
}: {
  num: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  qtyEn: string; qtyKh: string;
  ingEn: string; ingKh: string;
}) {
  return (
    <li className="rounded-xl border-2 border-slate-200 bg-white shadow-sm p-3 flex flex-col items-center text-center">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-extrabold shadow"
          style={{ background: color }}
        >
          {num}
        </span>
        <Icon className="w-5 h-5" style={{ color }} aria-hidden />
      </div>
      <div className="font-display font-extrabold text-base text-slate-900 leading-tight">{qtyEn}</div>
      <div className="font-khmer text-sm text-slate-600 leading-loose">{qtyKh}</div>
      <div className="mt-1 text-sm font-bold" style={{ color }}>{ingEn}</div>
      <div className="font-khmer text-sm leading-loose" style={{ color }}>{ingKh}</div>
    </li>
  );
}

/* Suppress unused-import warnings for icons reserved for future use. */
void Sun;
