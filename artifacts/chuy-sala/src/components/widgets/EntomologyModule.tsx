import { useId } from "react";
import {
  Bug, Search, Triangle, Users, Heart, Droplets, Skull,
  AlertTriangle, Leaf, Sparkles, Activity, Soup, Shirt, Fish,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
 * Entomology: The Micro-Engineers of Cambodia
 *   បាណកសាស្ត្រ៖ វិស្វករខ្នាតតូចនៃប្រទេសកម្ពុជា
 *
 * Strictly bilingual self-contained widget. Three sections:
 *   1. The Anatomy of an Insect — strict 3-2-6-2 biology rule + Tarantula trap
 *   2. The Local Engineers — Weaver Ants, Silkworm, Giant Water Bug
 *   3. The Survival Science — Mosquito as deadliest animal + aquatic life cycle
 *
 * Aesthetic: Jungle Macrophotography — leaf greens, soil browns, with
 * magnifying-glass framing and a leaf-pattern backdrop.
 * ══════════════════════════════════════════════════════════════════════════ */

/* ── Color palette ─────────────────────────────────────────────────────── */
const LEAF_DARK = "#15803d";       // green-700
const LEAF_MID = "#22c55e";        // green-500
const LEAF_LIGHT = "#86efac";      // green-300
const SOIL_DARK = "#78350f";       // amber-900
const SOIL_MID = "#b45309";        // amber-700
const SOIL_LIGHT = "#fde68a";      // amber-200
const ALERT_RED = "#b91c1c";       // red-700

/* ──────────────────────────────────────────────────────────────────────── */
/* Bilingual helpers                                                        */
/* ──────────────────────────────────────────────────────────────────────── */
function Bili({
  en, kh, primaryClass = "", secondaryClass = "",
}: { en: string; kh: string; primaryClass?: string; secondaryClass?: string }) {
  return (
    <span className="inline-flex flex-col leading-tight">
      <span className={primaryClass}>{en}</span>
      <span className={`${secondaryClass || "text-xs italic text-emerald-700/80"} font-khmer not-italic leading-loose`}>
        {kh}
      </span>
    </span>
  );
}

function BiliInline({
  en, kh, className = "",
}: { en: React.ReactNode; kh: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0 ${className}`}>
      <span>{en}</span>
      <span aria-hidden className="opacity-50">·</span>
      <span className="font-khmer">{kh}</span>
    </span>
  );
}

function BiliPara({
  en, kh, className = "", khmerClass = "",
}: { en: React.ReactNode; kh: React.ReactNode; className?: string; khmerClass?: string }) {
  return (
    <>
      <p className={className}>{en}</p>
      <p className={`font-khmer leading-loose mt-1 ${khmerClass}`}>{kh}</p>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Top-level widget
 * ══════════════════════════════════════════════════════════════════════════ */
export function EntomologyModule() {
  return (
    <section
      data-testid="entomology-module"
      aria-label="Entomology: The Micro-Engineers of Cambodia / បាណកសាស្ត្រ៖ វិស្វករខ្នាតតូចនៃប្រទេសកម្ពុជា"
      className="relative mt-12 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-800/50"
      style={{
        background:
          "linear-gradient(180deg, #052e16 0%, #14532d 30%, #166534 60%, #422006 100%)",
      }}
    >
      <LeafBackdrop />

      <div className="relative px-5 sm:px-8 py-8 sm:py-10">
        <EntomologyHeader />

        <AnatomySection />
        <LocalEngineersSection />
        <SurvivalScienceSection />

        {/* Closing */}
        <div className="mt-8 rounded-2xl border-2 border-amber-300/40 bg-emerald-950/60 backdrop-blur p-5 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" aria-hidden />
          <BiliPara
            en={
              <>
                <strong className="text-amber-200">The micro-engineers all around you</strong>{" "}
                run our forests, our rice fields, and our economy. Watch them
                with respect — they were here long before us, and they have
                much to teach.
              </>
            }
            kh={
              <>
                <strong className="text-amber-200">វិស្វករខ្នាតតូចនៅជុំវិញខ្លួនអ្នក</strong>
                គ្រប់គ្រងព្រៃឈើ វាលស្រែ និងសេដ្ឋកិច្ចរបស់យើង ។
                សូមឃ្លាំមើលពួកវាដោយការគោរព — ពួកវានៅទីនេះតាំងពីយូរមកហើយមុនពេលយើង ហើយពួកវាមានអ្វីច្រើនដើម្បីបង្រៀនយើង ។
              </>
            }
            className="text-sm sm:text-base text-emerald-50 leading-relaxed"
            khmerClass="text-base text-emerald-100/90"
          />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Decorative leaf backdrop
 * ══════════════════════════════════════════════════════════════════════════ */
function LeafBackdrop() {
  const id = useId();
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600">
        <defs>
          <pattern id={`leaf-${id}`} width="120" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M20 70 q15 -40 40 -10 q-15 40 -40 10 z"
              fill={LEAF_MID}
              opacity="0.18"
              stroke={LEAF_DARK}
              strokeWidth="0.6"
            />
            <path
              d="M75 30 q15 -30 35 -5 q-15 30 -35 5 z"
              fill={LEAF_LIGHT}
              opacity="0.12"
              stroke={LEAF_DARK}
              strokeWidth="0.6"
            />
          </pattern>
          <radialGradient id={`spot-${id}`} cx="80%" cy="20%" r="45%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="800" height="600" fill={`url(#leaf-${id})`} />
        <rect x="0" y="0" width="800" height="600" fill={`url(#spot-${id})`} />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Header
 * ══════════════════════════════════════════════════════════════════════════ */
function EntomologyHeader() {
  return (
    <header className="mb-8">
      <div className="flex items-start gap-3">
        {/* Magnifying-glass framed bug icon */}
        <div className="relative flex-shrink-0">
          <div
            className="w-16 h-16 rounded-full border-4 shadow-lg flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.95)", borderColor: SOIL_MID }}
          >
            <Bug className="w-8 h-8" style={{ color: LEAF_DARK }} aria-hidden />
          </div>
          <span
            aria-hidden
            className="absolute"
            style={{
              right: -10, bottom: -8, width: 26, height: 8, borderRadius: 4,
              background: SOIL_MID, transform: "rotate(35deg)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
            }}
          />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-300/85 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span>Science · Entomology</span>
            <span aria-hidden className="opacity-50">·</span>
            <span className="font-khmer normal-case tracking-normal text-xs">
              វិទ្យាសាស្ត្រ · បាណកសាស្ត្រ
            </span>
          </div>
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mt-1 text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #fde68a 0%, #86efac 100%)" }}
          >
            Entomology: The Micro-Engineers of Cambodia
          </h2>
          <p className="font-khmer text-lg sm:text-xl text-amber-100/95 leading-loose mt-1">
            បាណកសាស្ត្រ៖ វិស្វករខ្នាតតូចនៃប្រទេសកម្ពុជា
          </p>

          <div className="mt-3 max-w-3xl text-sm sm:text-base text-emerald-50/90">
            <p>
              Look closer at any leaf, any rice paddy, any forest floor — you
              will find tiny architects, weavers, and engineers running an
              empire we barely notice. This is the science of insects.
            </p>
            <p className="font-khmer text-base leading-loose text-emerald-100/85 mt-1">
              សូមមើលឱ្យជិតលើស្លឹកឈើណាមួយ វាលស្រែណាមួយ ឬដីក្នុងព្រៃណាមួយ —
              អ្នកនឹងឃើញស្ថាបត្យករ អ្នកត្បាញ និងវិស្វករតូចៗ
              ដែលគ្រប់គ្រងចក្រភពដ៏មួយដែលយើងស្ទើរតែមិនបានកត់សម្គាល់ ។ នេះជាវិទ្យាសាស្ត្រនៃសត្វល្អិត ។
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 1 — The Anatomy of an Insect
 * ══════════════════════════════════════════════════════════════════════════ */
function AnatomySection() {
  return (
    <article
      data-testid="section-anatomy"
      className="rounded-2xl border-2 border-emerald-300/40 bg-emerald-50/95 backdrop-blur p-5 sm:p-6 shadow-md"
    >
      <SectionHeader
        n={1}
        en="The Anatomy of an Insect"
        kh="រូបសាស្ត្រនៃសត្វល្អិត"
        Icon={Search}
      />

      <BiliPara
        en={
          <>
            Not every little crawling creature is an insect. Biology has a
            <strong> strict rule</strong>: to earn the name{" "}
            <em>insect</em>, an animal must have:
          </>
        }
        kh={
          <>
            មិនមែនរាល់សត្វលូនតូចៗគ្រប់ប្រភេទសុទ្ធតែជាសត្វល្អិតទេ ។
            ជីវវិទ្យាមាន<strong>ច្បាប់តឹងរ៉ឹង</strong>ៈ ដើម្បីទទួលបានឈ្មោះ
            <em>សត្វល្អិត</em> សត្វមួយត្រូវមានៈ
          </>
        }
        className="text-sm sm:text-base text-slate-800 leading-relaxed mb-4"
        khmerClass="text-base text-slate-700"
      />

      {/* Anatomy diagram + rule cards side by side */}
      <div className="grid md:grid-cols-[auto_1fr] gap-5 items-start">
        <InsectDiagram />

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" data-testid="anatomy-rules">
          <RuleCard num="3" en="Body Parts" kh="ផ្នែករាងកាយ" detailEn="Head, Thorax, Abdomen" detailKh="ក្បាល ទ្រូង ពោះ" Icon={Triangle} color={LEAF_DARK} />
          <RuleCard num="6" en="Legs" kh="ជើង" detailEn="Always exactly six" detailKh="ប្រាំមួយជានិច្ច" Icon={Activity} color={SOIL_MID} />
          <RuleCard num="2" en="Antennae" kh="សរសៃរំញ័រ" detailEn="Usually a pair" detailKh="ជាគូ" Icon={Sparkles} color="#0e7490" />
        </ul>
      </div>

      {/* The Spider Trap warning box */}
      <div
        data-testid="spider-trap"
        className="mt-5 rounded-2xl border-l-[6px] shadow-md overflow-hidden"
        style={{ borderLeftColor: ALERT_RED, background: "#fef2f2" }}
      >
        <div className="px-4 py-2.5 flex items-center gap-2 text-white font-bold" style={{ background: ALERT_RED }}>
          <AlertTriangle className="w-5 h-5 flex-shrink-0" aria-hidden />
          <BiliInline
            en="Warning: The Spider Trap!"
            kh="ការព្រមាន ៖ អន្ទាក់ពីសត្វពីងពាង!"
            className="text-sm sm:text-base"
          />
        </div>
        <div className="px-4 py-4 grid sm:grid-cols-[auto_1fr] gap-4 items-start">
          <ArachnidIcon />
          <div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              The famous Cambodian Tarantula{" "}
              <BiliInline en={<strong>"A-ping"</strong>} kh={<strong className="font-khmer">អាពីង</strong>} />{" "}
              is <strong className="text-rose-700">NOT</strong> an insect. It
              breaks the rules with{" "}
              <strong className="text-rose-700">8 legs</strong> and only{" "}
              <strong className="text-rose-700">2 body parts</strong>. That
              makes it an <em>Arachnid</em>, not an insect.
            </p>
            <p className="font-khmer text-base text-slate-700 leading-loose mt-1.5">
              សត្វរ៉ូងបាសល្បីឈ្មោះរបស់កម្ពុជា <strong>អាពីង</strong>{" "}
              <strong className="text-rose-700">មិនមែន</strong>ជាសត្វល្អិតទេ ។
              វាបំបែកច្បាប់ដោយមាន<strong className="text-rose-700">ជើង ៨</strong>
              និងមាន<strong className="text-rose-700">ផ្នែករាងកាយតែ ២</strong>ប៉ុណ្ណោះ ។
              ដូច្នេះវាជាសត្វ <em>Arachnid</em> (ត្រកូលពីងពាង) មិនមែនជាសត្វល្អិតឡើយ ។
            </p>

            {/* Comparison row */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50 p-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-700">
                  Insect · សត្វល្អិត
                </div>
                <div className="text-sm font-bold text-emerald-900">6 legs · 3 parts</div>
                <div className="font-khmer text-xs text-emerald-800 leading-loose">
                  ៦ ជើង · ៣ ផ្នែក
                </div>
              </div>
              <div className="rounded-lg border-2 border-rose-300 bg-rose-50 p-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-rose-700">
                  Arachnid · ត្រកូលពីងពាង
                </div>
                <div className="text-sm font-bold text-rose-900">8 legs · 2 parts</div>
                <div className="font-khmer text-xs text-rose-800 leading-loose">
                  ៨ ជើង · ២ ផ្នែក
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function RuleCard({
  num, en, kh, detailEn, detailKh, Icon, color,
}: {
  num: string; en: string; kh: string; detailEn: string; detailKh: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; color: string;
}) {
  return (
    <li
      className="rounded-xl border-2 bg-white p-3 flex flex-col items-center text-center shadow-sm"
      style={{ borderColor: color + "55" }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-1.5"
        style={{ background: color + "15" }}
      >
        <span className="font-display font-extrabold text-2xl" style={{ color }}>{num}</span>
      </div>
      <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
        <Icon className="w-4 h-4" style={{ color }} aria-hidden />
        <span>{en}</span>
      </div>
      <div className="font-khmer text-sm text-slate-700 leading-loose">{kh}</div>
      <div className="text-[11px] text-slate-600 mt-1 leading-tight">{detailEn}</div>
      <div className="font-khmer text-xs text-slate-600 leading-loose">{detailKh}</div>
    </li>
  );
}

/** Stylised top-down insect — three body parts, six legs, two antennae. */
function InsectDiagram() {
  return (
    <figure
      role="img"
      aria-label="Insect anatomy diagram showing 3 body parts, 6 legs and 2 antennae / រូបភាពរូបសាស្ត្រសត្វល្អិតបង្ហាញផ្នែករាងកាយ ៣ ជើង ៦ និងសរសៃរំញ័រ ២"
      className="flex flex-col items-center"
    >
      <svg viewBox="0 0 220 240" className="w-44 h-52" aria-hidden>
        {/* Magnifying-glass frame */}
        <circle cx="110" cy="120" r="105" fill="#fff7ed" stroke={SOIL_MID} strokeWidth="4" />
        <line x1="186" y1="196" x2="218" y2="232" stroke={SOIL_DARK} strokeWidth="9" strokeLinecap="round" />

        {/* Antennae */}
        <path d="M95,40 Q88,18 80,8" stroke={LEAF_DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M125,40 Q132,18 140,8" stroke={LEAF_DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="80" cy="8" r="3" fill={LEAF_DARK} />
        <circle cx="140" cy="8" r="3" fill={LEAF_DARK} />

        {/* Head */}
        <ellipse cx="110" cy="55" rx="22" ry="18" fill={LEAF_DARK} />
        <circle cx="100" cy="50" r="3" fill="#fff" />
        <circle cx="120" cy="50" r="3" fill="#fff" />
        {/* Thorax */}
        <ellipse cx="110" cy="100" rx="28" ry="22" fill={LEAF_MID} />
        {/* Abdomen */}
        <ellipse cx="110" cy="160" rx="32" ry="38" fill={SOIL_MID} />
        <path d="M82,150 Q110,142 138,150" stroke={SOIL_DARK} strokeWidth="1.2" fill="none" />
        <path d="M82,165 Q110,158 138,165" stroke={SOIL_DARK} strokeWidth="1.2" fill="none" />
        <path d="M82,180 Q110,174 138,180" stroke={SOIL_DARK} strokeWidth="1.2" fill="none" />

        {/* Six legs (all attached to thorax) */}
        {[
          { x1: 82, y1: 95,  x2: 30, y2: 75 },
          { x1: 82, y1: 105, x2: 22, y2: 110 },
          { x1: 82, y1: 115, x2: 28, y2: 145 },
          { x1: 138, y1: 95,  x2: 190, y2: 75 },
          { x1: 138, y1: 105, x2: 198, y2: 110 },
          { x1: 138, y1: 115, x2: 192, y2: 145 },
        ].map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={LEAF_DARK} strokeWidth="3" strokeLinecap="round" />
        ))}

        {/* Body-part labels */}
        <text x="155" y="58" fontSize="10" fontWeight="700" fill={LEAF_DARK}>Head · ក្បាល</text>
        <text x="155" y="103" fontSize="10" fontWeight="700" fill={LEAF_DARK}>Thorax · ទ្រូង</text>
        <text x="155" y="163" fontSize="10" fontWeight="700" fill={SOIL_DARK}>Abdomen · ពោះ</text>
      </svg>
      <figcaption className="text-center text-[11px] text-slate-700 leading-tight mt-1">
        <div>3 parts · 6 legs · 2 antennae</div>
        <div className="font-khmer text-xs text-slate-700 leading-loose">
          ៣ ផ្នែក · ៦ ជើង · ២ សរសៃរំញ័រ
        </div>
      </figcaption>
    </figure>
  );
}

/** Tiny tarantula silhouette for the warning box. */
function ArachnidIcon() {
  return (
    <figure
      role="img"
      aria-label="Tarantula has 8 legs and 2 body parts / អាពីងមានជើង ៨ និងផ្នែករាងកាយ ២"
      className="flex flex-col items-center"
    >
      <svg viewBox="0 0 140 110" className="w-28 h-24" aria-hidden>
        {/* Cephalothorax (front body) */}
        <ellipse cx="70" cy="55" rx="22" ry="20" fill="#1c1917" />
        {/* Abdomen (back body) */}
        <ellipse cx="70" cy="86" rx="20" ry="18" fill="#292524" />
        {/* Eyes */}
        <circle cx="64" cy="48" r="2" fill="#fbbf24" />
        <circle cx="76" cy="48" r="2" fill="#fbbf24" />
        {/* 8 legs (4 each side) */}
        {[
          { x1: 50, y1: 45, x2: 8,  y2: 22 },
          { x1: 50, y1: 52, x2: 4,  y2: 50 },
          { x1: 50, y1: 60, x2: 6,  y2: 78 },
          { x1: 50, y1: 68, x2: 12, y2: 102 },
          { x1: 90, y1: 45, x2: 132, y2: 22 },
          { x1: 90, y1: 52, x2: 136, y2: 50 },
          { x1: 90, y1: 60, x2: 134, y2: 78 },
          { x1: 90, y1: 68, x2: 128, y2: 102 },
        ].map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
        ))}
      </svg>
      <figcaption className="text-center text-[11px] font-bold text-rose-800 leading-tight">
        <div>A-ping · អាពីង</div>
        <div className="font-khmer text-xs leading-loose text-rose-700">8 legs · ៨ ជើង</div>
      </figcaption>
    </figure>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 2 — The Local Engineers
 * ══════════════════════════════════════════════════════════════════════════ */
function LocalEngineersSection() {
  return (
    <article
      data-testid="section-engineers"
      className="mt-8 rounded-2xl border-2 border-amber-300/40 bg-amber-50/95 backdrop-blur p-5 sm:p-6 shadow-md"
    >
      <SectionHeader
        n={2}
        en="The Local Engineers"
        kh="វិស្វករក្នុងតំបន់"
        Icon={Leaf}
      />

      <BiliPara
        en="Three Cambodian insects that engineer the world around them — through teamwork, through silk, and through brute hunting power."
        kh="សត្វល្អិតកម្ពុជាបីប្រភេទដែលរៀបចំពិភពលោកជុំវិញខ្លួន — តាមរយៈការធ្វើការងារជាក្រុម តាមរយៈសូត្រ និងតាមរយៈអំណាចបរបាញ់ដ៏ខ្លាំង ។"
        className="text-sm sm:text-base text-slate-700 leading-relaxed mb-5"
        khmerClass="text-base text-slate-700"
      />

      <div className="grid md:grid-cols-3 gap-4" data-testid="engineers-grid">
        {/* Card 1 — Weaver Ants */}
        <EngineerCard
          testid="engineer-weaver-ants"
          tone="emerald"
          Icon={Users}
          en="Weaver Ants"
          kh="អង្ក្រង (Angkrong)"
          tagEn="Master Builders · Teamwork"
          tagKh="ស្ថាបនិកជំនាញ · ការងារជាក្រុម"
          bodyEn={
            <>
              Hundreds of workers grip the edges of two leaves and pull them
              together. Then they pick up their own{" "}
              <strong>silk-spinning larvae</strong> and use them like{" "}
              <strong>living glue guns</strong>, weaving leaf to leaf to build
              entire <strong>treetop cities</strong>.
            </>
          }
          bodyKh={
            <>
              កម្មកររាប់រយក្បាលចាប់គែមស្លឹកពីរ ហើយទាញវាមកជិតគ្នា ។ បន្ទាប់មកពួកវាលើក
              <strong>ដង្កូវខ្ទើលសូត្ររបស់ពួកវាផ្ទាល់</strong> ហើយប្រើពួកវាដូច
              <strong>កាំភ្លើងបាញ់កាវរស់</strong> ត្បាញស្លឹកមួយទៅស្លឹកមួយទៀត
              ដើម្បីសាងសង់<strong>ទីក្រុងលើដើមឈើ</strong>ទាំងមូល ។
            </>
          }
          factIcon={Soup}
          factEn="Khmer kitchens love them — their tangy eggs flavour traditional sour soup (សម្លម្ជូរ)."
          factKh="ផ្ទះបាយខ្មែរស្រឡាញ់ពួកវា — ពងជូររបស់ពួកវាផ្តល់រសជាតិដល់សម្លម្ជូរប្រពៃណី ។"
        />

        {/* Card 2 — Silkworm */}
        <EngineerCard
          testid="engineer-silkworm"
          tone="amber"
          Icon={Heart}
          en="The Silkworm"
          kh="ដង្កូវនាង (Dongkov Neang)"
          tagEn="Complete Metamorphosis · Economy"
          tagKh="ការប្រែប្រួលរូបពេញលេញ · សេដ្ឋកិច្ច"
          bodyEn={
            <>
              The silkworm performs <strong>Complete Metamorphosis</strong>:
              <em> egg → caterpillar → cocoon → moth</em>. It eats only
              mulberry leaves, then spins a single silk thread{" "}
              <strong>up to 1 km long</strong> around itself.
            </>
          }
          bodyKh={
            <>
              ដង្កូវនាងធ្វើ<strong>ការប្រែប្រួលរូបពេញលេញ</strong>ៈ
              <em> ពង → ដង្កូវ → ស្រោម → មេអំបៅ</em> ។
              វាស៊ីតែស្លឹកមន ហើយខ្ទើលសូត្រខ្សែតែមួយ
              <strong>មានប្រវែងរហូតដល់ ១ គីឡូម៉ែត្រ</strong>ជុំវិញខ្លួនវា ។
            </>
          }
          factIcon={Shirt}
          factEn="An economic powerhouse: those threads become Cambodia's traditional Khmer silk weaving (សូត្រខ្មែរ)."
          factKh="អំណាចសេដ្ឋកិច្ច ៖ ខ្សែសូត្រទាំងនោះក្លាយជាការត្បាញសូត្រខ្មែរប្រពៃណីរបស់កម្ពុជា ។"
        />

        {/* Card 3 — Giant Water Bug */}
        <EngineerCard
          testid="engineer-water-bug"
          tone="slate"
          Icon={Droplets}
          en="Giant Water Bug"
          kh="ម៉ាដា (Mang Da)"
          tagEn="Apex Micro-Predator · Rice Fields"
          tagKh="សត្វមហារបរបាញ់ខ្នាតតូច · វាលស្រែ"
          bodyEn={
            <>
              An <strong>apex micro-predator</strong> of the rice paddies. Its
              raptor-like front legs ambush prey — including{" "}
              <strong>small fish and even frogs</strong> many times its own
              size — which it then liquefies with powerful saliva.
            </>
          }
          bodyKh={
            <>
              <strong>សត្វមហារបរបាញ់ខ្នាតតូច</strong>នៃវាលស្រែ ។
              ជើងមុខដូចសត្វខ្លាឃ្មុំរបស់វាស្ទាក់ចាប់សត្វជាចំណី — រួមទាំង
              <strong>ត្រីតូច និងសូម្បីតែកង្កែប</strong>ដែលធំជាងវាច្រើនដង — រួចហើយវារំលាយវាដោយទឹកមាត់ដ៏មានឥទ្ធិពល ។
            </>
          }
          factIcon={Fish}
          factEn="Despite its size, it can hunt prey several times its own body length."
          factKh="ទោះបីជាមានទំហំតូច វាអាចបរបាញ់សត្វធំជាងខ្លួនវាច្រើនដង ។"
        />
      </div>
    </article>
  );
}

const ENGINEER_TONE: Record<
  "emerald" | "amber" | "slate",
  { card: string; band: string; tag: string; fact: string }
> = {
  emerald: {
    card: "border-emerald-400 bg-white",
    band: "bg-emerald-700 text-white",
    tag:  "bg-emerald-100 text-emerald-900 border-emerald-300",
    fact: "border-emerald-300 bg-emerald-50/70",
  },
  amber: {
    card: "border-amber-500 bg-white",
    band: "bg-amber-700 text-white",
    tag:  "bg-amber-100 text-amber-900 border-amber-300",
    fact: "border-amber-300 bg-amber-50/70",
  },
  slate: {
    card: "border-slate-500 bg-white",
    band: "bg-slate-700 text-white",
    tag:  "bg-slate-100 text-slate-900 border-slate-300",
    fact: "border-sky-300 bg-sky-50/70",
  },
};

function EngineerCard({
  testid, tone, Icon, en, kh, tagEn, tagKh, bodyEn, bodyKh, factIcon: FactIcon, factEn, factKh,
}: {
  testid: string;
  tone: "emerald" | "amber" | "slate";
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  en: string; kh: string;
  tagEn: string; tagKh: string;
  bodyEn: React.ReactNode; bodyKh: React.ReactNode;
  factIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  factEn: string; factKh: string;
}) {
  const t = ENGINEER_TONE[tone];
  return (
    <div
      data-testid={testid}
      className={`rounded-2xl border-2 shadow-sm overflow-hidden flex flex-col ${t.card}`}
    >
      {/* Header band */}
      <div className={`px-4 py-2.5 flex items-center gap-2 ${t.band}`}>
        <Icon className="w-5 h-5 flex-shrink-0" aria-hidden />
        <div className="font-display font-extrabold text-sm sm:text-base leading-tight">
          <BiliInline en={en} kh={kh} />
        </div>
      </div>

      {/* Tag pill */}
      <div className="px-4 pt-3">
        <span className={`inline-block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider rounded-full border px-2 py-0.5 ${t.tag}`}>
          <BiliInline en={tagEn} kh={tagKh} />
        </span>
      </div>

      {/* Body */}
      <div className="px-4 pt-2 pb-3 text-sm leading-relaxed text-slate-800">
        <p>{bodyEn}</p>
        <p className="font-khmer text-base text-slate-700 leading-loose mt-1">{bodyKh}</p>
      </div>

      {/* Cultural / fun fact footer */}
      <div className={`mt-auto border-t-2 px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${t.fact}`}>
        <div className="flex items-start gap-2">
          <FactIcon className="w-4 h-4 text-slate-700 flex-shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="text-slate-800">{factEn}</p>
            <p className="font-khmer text-sm text-slate-700 leading-loose mt-0.5">{factKh}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 3 — The Survival Science (Mosquito)
 * ══════════════════════════════════════════════════════════════════════════ */
function SurvivalScienceSection() {
  return (
    <article
      data-testid="section-survival-science"
      className="mt-8 rounded-2xl border-2 border-rose-300/50 bg-white/95 backdrop-blur p-5 sm:p-6 shadow-md"
    >
      <SectionHeader
        n={3}
        en="The Survival Science"
        kh="វិទ្យាសាស្ត្រនៃការរស់រានមានជីវិត"
        Icon={Skull}
      />

      <div className="grid md:grid-cols-[auto_1fr] gap-5 items-start">
        <MosquitoIcon />

        <div>
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-rose-700">
            <BiliInline en="Case Study · The Mosquito" kh="ករណីសិក្សា · មូស (Moos)" />
          </div>

          {/* Deadliest claim */}
          <div className="mt-2 rounded-xl border-l-[6px] border-rose-700 bg-rose-50 px-4 py-3">
            <div className="flex items-start gap-2 mb-1">
              <Skull className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" aria-hidden />
              <p className="text-base sm:text-lg font-extrabold text-rose-900 leading-tight">
                <BiliInline
                  en="The deadliest animal on Earth."
                  kh="សត្វដែលមានគ្រោះថ្នាក់បំផុតលើផែនដី ។"
                />
              </p>
            </div>
            <BiliPara
              en={
                <>
                  Not lions or tigers — the mosquito kills more people than
                  any other animal. It acts as a{" "}
                  <strong>"dirty needle"</strong>, transmitting{" "}
                  <strong>Dengue Fever</strong> and <strong>Malaria</strong>{" "}
                  from one person's blood directly into another's.
                </>
              }
              kh={
                <>
                  មិនមែនសត្វសិង្ហ ឬខ្លាទេ — មូសសម្លាប់មនុស្សច្រើនជាងសត្វណាមួយផ្សេងទៀត ។
                  វាដើរតួនាទីដូច<strong>"ម្ជុលកខ្វក់"</strong> ដែលផ្ទេរ<strong>គ្រុនឈាម</strong>
                  និង<strong>គ្រុនចាញ់</strong>ពីឈាមមនុស្សម្នាក់ចូលទៅក្នុងឈាមមនុស្សម្នាក់ទៀតផ្ទាល់ ។
                </>
              }
              className="text-sm sm:text-base text-slate-800 leading-relaxed"
              khmerClass="text-base text-slate-700"
            />
          </div>

          {/* Life cycle */}
          <h4 className="mt-5 font-display font-extrabold text-slate-900">
            <BiliInline
              en="Life Cycle: Half Their Life Lives in Water"
              kh="វដ្តជីវិត ៖ ពាក់កណ្តាលនៃជីវិតរស់នៅក្នុងទឹក"
              className="text-base sm:text-lg"
            />
          </h4>
          <ol className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2" data-testid="life-cycle">
            <CycleStep
              n={1}
              labelEn="Egg"
              labelKh="ពង"
              descEn="Laid on still water"
              descKh="ដាក់នៅលើទឹកស្ងួត"
              aquatic
            />
            <CycleStep
              n={2}
              labelEn="Larva"
              labelKh="ដង្កូវ"
              descEn="Wriggles underwater"
              descKh="ងឿនក្នុងទឹក"
              aquatic
            />
            <CycleStep
              n={3}
              labelEn="Pupa"
              labelKh="គ្រាប់ដង្កូវ"
              descEn="Floats, transforms"
              descKh="អណ្តែត ប្រែប្រួល"
              aquatic
            />
            <CycleStep
              n={4}
              labelEn="Adult"
              labelKh="មូសពេញវ័យ"
              descEn="Flies, bites, repeats"
              descKh="ហើរ ខាំ ធ្វើឡើងវិញ"
            />
          </ol>

          <div className="mt-4 rounded-xl border-2 border-sky-300 bg-sky-50/70 px-4 py-3 text-sm leading-relaxed text-slate-800">
            <BiliPara
              en={
                <>
                  Mosquitoes are <strong>aquatic creatures for the first half
                  of their lives</strong> — they grow in still, standing water.
                  The simplest, most powerful prevention is therefore obvious:{" "}
                  <strong>empty every bucket, jar, tyre, and pot</strong> near
                  your home.
                </>
              }
              kh={
                <>
                  មូសជា<strong>សត្វរស់ក្នុងទឹកសម្រាប់ពាក់កណ្តាលដំបូងនៃជីវិតរបស់វា</strong> —
                  ពួកវាលូតលាស់ក្នុងទឹកស្ងួត ។ ដូច្នេះ
                  ការការពារដ៏សាមញ្ញ និងមានឥទ្ធិពលបំផុតគឺច្បាស់លាស់ ៖
                  <strong>ចាក់ទឹកចេញពីដូ ពាង កង់ និងឆ្នាំងគ្រប់ប្រភេទ</strong>នៅជិតផ្ទះរបស់អ្នក ។
                </>
              }
              className="text-sm sm:text-base text-slate-800 leading-relaxed"
              khmerClass="text-base text-slate-700"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function CycleStep({
  n, labelEn, labelKh, descEn, descKh, aquatic = false,
}: {
  n: number; labelEn: string; labelKh: string;
  descEn: string; descKh: string; aquatic?: boolean;
}) {
  return (
    <li
      className={`relative rounded-xl border-2 p-3 text-center shadow-sm ${
        aquatic ? "border-sky-400 bg-sky-50" : "border-amber-400 bg-amber-50"
      }`}
    >
      <span
        className={`absolute -top-2 left-2 inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-extrabold shadow ${
          aquatic ? "bg-sky-600" : "bg-amber-600"
        }`}
      >
        {n}
      </span>
      <div className="font-bold text-sm text-slate-900">{labelEn}</div>
      <div className="font-khmer text-sm text-slate-700 leading-loose">{labelKh}</div>
      <div className="text-[11px] text-slate-600 mt-1 leading-tight">{descEn}</div>
      <div className="font-khmer text-xs text-slate-600 leading-loose">{descKh}</div>
      {aquatic && (
        <span
          className="absolute -top-2 right-2 inline-flex items-center gap-1 rounded-full bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 shadow"
          title="Aquatic / រស់ក្នុងទឹក"
        >
          <Droplets className="w-2.5 h-2.5" aria-hidden />
          <span>Aquatic</span>
          <span aria-hidden className="opacity-70">·</span>
          <span className="font-khmer leading-loose">រស់ក្នុងទឹក</span>
        </span>
      )}
    </li>
  );
}

/** Tiny mosquito illustration. */
function MosquitoIcon() {
  return (
    <figure
      role="img"
      aria-label="Mosquito illustration / រូបភាពមូស"
      className="flex flex-col items-center"
    >
      <svg viewBox="0 0 160 130" className="w-32 h-28" aria-hidden>
        <circle cx="80" cy="80" r="60" fill="#fef2f2" stroke="#fecaca" strokeWidth="2" />
        {/* Wings */}
        <ellipse cx="50" cy="55" rx="22" ry="9" fill="#cbd5e1" opacity="0.85" transform="rotate(-25 50 55)" />
        <ellipse cx="110" cy="55" rx="22" ry="9" fill="#cbd5e1" opacity="0.85" transform="rotate(25 110 55)" />
        {/* Body */}
        <ellipse cx="80" cy="80" rx="9" ry="22" fill="#1c1917" />
        {/* Head */}
        <circle cx="80" cy="55" r="7" fill="#1c1917" />
        {/* Proboscis (the "needle") */}
        <line x1="80" y1="55" x2="80" y2="22" stroke={ALERT_RED} strokeWidth="2.2" strokeLinecap="round" />
        {/* Drop of blood at the tip */}
        <circle cx="80" cy="22" r="3" fill={ALERT_RED} />
        {/* Six legs */}
        {[
          { x1: 75, y1: 70, x2: 50, y2: 50 },
          { x1: 75, y1: 82, x2: 40, y2: 95 },
          { x1: 75, y1: 95, x2: 50, y2: 120 },
          { x1: 85, y1: 70, x2: 110, y2: 50 },
          { x1: 85, y1: 82, x2: 120, y2: 95 },
          { x1: 85, y1: 95, x2: 110, y2: 120 },
        ].map((l, i) => (
          <line key={i} {...l} stroke="#1c1917" strokeWidth="1.6" strokeLinecap="round" />
        ))}
      </svg>
      <figcaption className="text-center text-[11px] font-bold text-rose-900 leading-tight">
        <div>Mosquito</div>
        <div className="font-khmer text-xs leading-loose">មូស</div>
      </figcaption>
    </figure>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Shared section header
 * ══════════════════════════════════════════════════════════════════════════ */
function SectionHeader({
  n, en, kh, Icon,
}: {
  n: number; en: string; kh: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <header className="flex items-start gap-3 mb-4">
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl text-white flex items-center justify-center font-display font-extrabold shadow-md"
        style={{ background: `linear-gradient(135deg, ${LEAF_DARK} 0%, ${SOIL_MID} 100%)` }}
      >
        <span className="text-base">{n}</span>
      </div>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Icon className="w-5 h-5 flex-shrink-0" style={{ color: LEAF_DARK }} aria-hidden />
        <Bili
          en={en}
          kh={kh}
          primaryClass="font-display text-lg sm:text-xl font-bold text-emerald-950"
          secondaryClass="text-xs sm:text-sm text-emerald-800/80 italic"
        />
      </div>
    </header>
  );
}

/* Suppress unused-import lint warnings for icons reserved for future use. */
void SOIL_LIGHT;
