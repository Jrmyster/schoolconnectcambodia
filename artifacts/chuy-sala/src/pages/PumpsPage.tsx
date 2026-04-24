import { Link } from "wouter";
import {
  ArrowLeft,
  Construction,
  Wind,
  Fan,
  History,
  Wrench,
  Zap,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  TECH-PMP-01 · Pumps: Defying Gravity
//                ម៉ាស៊ីនបូមទឹក៖ ការប្រឆាំងនឹងទំនាញផែនដី
//
//  Three strictly-bilingual cards (BOTH EN + KH always rendered):
//   1. The Ancient Screw          — Archimedes Screw (2,000+ years, Greece)
//   2. Hand Pumps & The Vacuum    — Positive displacement + atmospheric push
//   3. Modern Centrifugal Pumps   — Spinning impeller + centrifugal force
//
//  Aesthetic: industrial fluid-dynamics — slate-steel + deep water blue +
//  cyan blueprint grid + brass (amber) accents — consistent with the
//  BridgesPage and PlumbingSewersPage structural-engineering pages.
//
//  Cross-link: this is the "Pumps & Water Mechanics" lesson referenced from
//  the Panama Canal card on /geography/latin-america.
// ════════════════════════════════════════════════════════════════════════════

export function PumpsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-100 overflow-hidden">
      <BlueprintBg />

      {/* Back link */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-200 hover:text-white transition-colors ${isKh ? "font-khmer" : ""}`}
          data-testid="back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>

      {/* Hero — strictly bilingual */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-cyan-400/60 text-cyan-200 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-md flex-wrap backdrop-blur-sm">
          <Construction className="w-3.5 h-3.5" />
          <span>Technology · Fluid Dynamics</span>
          <span className="opacity-50">·</span>
          <span className="font-khmer normal-case">បច្ចេកវិទ្យា · ឌីណាមិកអង្គធាតុរាវ</span>
          <span className="font-mono opacity-60">· TECH-PMP-01</span>
        </div>

        <h1
          data-testid="page-title"
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-2 leading-tight text-white"
        >
          Pumps:{" "}
          <span className="text-cyan-300">Defying Gravity</span>
        </h1>
        <h2 className="font-khmer font-bold text-xl sm:text-3xl lg:text-4xl mb-5 leading-loose text-slate-200">
          ម៉ាស៊ីនបូមទឹក៖{" "}
          <span className="text-cyan-300">ការប្រឆាំងនឹងទំនាញផែនដី</span>
        </h2>

        <div className="space-y-2 max-w-3xl">
          <p className="text-slate-200 text-base leading-relaxed">
            For 2,000 years, humans have invented clever machines to push water{" "}
            <strong>uphill</strong> — against the very pull of the planet. Three
            inventions, three completely different tricks: the spiral, the
            vacuum, and the spinner.
          </p>
          <p className="text-slate-200 text-base font-khmer leading-loose">
            អស់រយៈពេល ២,០០០ ឆ្នាំមកហើយ មនុស្សជាតិបានបង្កើតម៉ាស៊ីនដ៏ឆ្លាតវៃដើម្បីរុញទឹក <strong>ឡើងលើ</strong> — ប្រឆាំងនឹងការទាញរបស់ភពផែនដី។ ការបង្កើតបី បច្ចេកទេសខុសគ្នាបី ៖ វីសរង្វេល សុញ្ញកាស និងអ្នកវិលមូល។
          </p>
        </div>
      </header>

      {/* Three cards */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AncientScrewCard />
          <HandPumpVacuumCard />
          <CentrifugalPumpCard />
        </div>
      </section>

      {/* Closing — bilingual */}
      <footer className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="inline-block rounded-2xl border border-cyan-400/60 bg-slate-900/60 backdrop-blur-sm px-6 py-4 text-slate-100 shadow-lg">
          <p className="font-serif italic">
            “Whoever first made water flow uphill rewrote what was possible — and every village, every city, every farm has lived inside that invention ever since.”
          </p>
          <p className="font-khmer not-italic leading-loose text-slate-200 mt-1">
            «អ្នកណាដែលធ្វើឱ្យទឹកហូរឡើងលើបានដំបូងបានកែសម្រួលនូវអ្វីដែលអាចធ្វើទៅបាន — ហើយរាល់ភូមិ រាល់ទីក្រុង រាល់កសិដ្ឋាន បានរស់នៅខាងក្នុងការបង្កើតនោះតាំងពីពេលនោះមក។»
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PumpsPage;

// ════════════════════════════════════════════════════════════════════════════
//  Background — slate steel with a faint cyan blueprint grid (matches Bridges)
// ════════════════════════════════════════════════════════════════════════════

function BlueprintBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0c1320 0%, #0f1a2e 35%, #11253f 70%, #0f1a2e 100%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="bp-fine-pumps" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22d3ee" strokeWidth="0.4" opacity="0.10" />
          </pattern>
          <pattern id="bp-coarse-pumps" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#22d3ee" strokeWidth="0.6" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-fine-pumps)" />
        <rect width="100%" height="100%" fill="url(#bp-coarse-pumps)" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Bilingual helpers — always render BOTH languages (local to this file)
// ════════════════════════════════════════════════════════════════════════════

function BilingualBlock({
  en,
  kh,
}: {
  en: React.ReactNode;
  kh: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm leading-relaxed text-slate-700">{en}</p>
      <p className="text-sm font-khmer leading-loose text-slate-700">{kh}</p>
    </div>
  );
}

function SubLabel({ en, kh }: { en: string; kh: string }) {
  return (
    <div className="text-[11px] font-mono uppercase tracking-widest mb-1 flex flex-wrap gap-x-2 text-slate-500">
      <span>{en}</span>
      <span className="font-khmer normal-case tracking-normal text-[0.7rem]">
        {kh}
      </span>
    </div>
  );
}

// Pump-type chip — visual classifier (Positive Displacement / Centrifugal / Manual)
function PumpTypeChip({
  kind,
  en,
  kh,
}: {
  kind: "manual" | "displacement" | "centrifugal";
  en: string;
  kh: string;
}) {
  const cls =
    kind === "manual"
      ? "bg-amber-100 border-amber-500 text-amber-900"
      : kind === "displacement"
        ? "bg-sky-100 border-sky-600 text-sky-900"
        : "bg-emerald-100 border-emerald-600 text-emerald-900";
  const glyph = kind === "manual" ? "↻" : kind === "displacement" ? "⇡" : "⟲";
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md border-2 ${cls} px-2 py-1`}
    >
      <span className="font-display font-extrabold text-base leading-none">
        {glyph}
      </span>
      <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
        {en}
      </span>
      <span className="font-khmer text-[11px] font-bold leading-loose">
        · {kh}
      </span>
    </div>
  );
}

// Shared card shell — drafting-paper body w/ steel-blue header + brass border
function BlueprintCard({
  cardNo,
  topicEn,
  topicKh,
  titleEn,
  titleKh,
  Icon,
  testId,
  paper = "#f8fafc",
  children,
}: {
  cardNo: string;
  topicEn: string;
  topicKh: string;
  titleEn: string;
  titleKh: string;
  Icon: LucideIcon;
  testId: string;
  paper?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      data-testid={testId}
      className="relative rounded-3xl border-2 border-amber-400/50 shadow-2xl overflow-hidden flex flex-col text-slate-900"
      style={{ background: paper }}
    >
      {/* Steel header with brass-rimmed icon medallion */}
      <header
        className="px-5 pt-5 pb-3 border-b-2 border-cyan-400/70"
        style={{
          background:
            "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-300 border-2 border-amber-200 text-slate-900 flex items-center justify-center shadow-md">
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-200/90 mb-0.5 flex flex-wrap gap-x-2">
              <span>Card · {cardNo}</span>
              <span className="opacity-50">/</span>
              <span>{topicEn}</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-90">
                {topicKh}
              </span>
            </div>
            <h3 className="font-bold text-lg text-white leading-tight">
              <span className="block">{titleEn}</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-cyan-100">
                {titleKh}
              </span>
            </h3>
          </div>
        </div>
      </header>

      {/* Body — drafting paper with faint blueprint grid */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1 relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          aria-hidden="true"
        >
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern
                id={`paper-${testId}`}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#0c4a6e"
                  strokeWidth="0.3"
                  opacity="0.18"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#paper-${testId})`} />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col gap-4 flex-1">
          {children}
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 — The Ancient Screw (Archimedes Screw, ancient Greece, 2,000+ yrs)
// ════════════════════════════════════════════════════════════════════════════

function AncientScrewCard() {
  return (
    <BlueprintCard
      cardNo="01"
      topicEn="Ancient Engineering"
      topicKh="វិស្វកម្មបុរាណ"
      titleEn="The Ancient Screw"
      titleKh="វីសសម័យបុរាណ"
      Icon={History}
      testId="card-ancient-screw"
      paper="#fbf7ed"
    >
      <BilingualBlock
        en={
          <>
            Over <strong>2,000 years ago</strong>, in{" "}
            <strong>ancient Greece</strong>, an inventor named{" "}
            <strong>Archimedes</strong> solved a hard problem:{" "}
            <em>how do you lift water out of the ground without electricity?</em>
          </>
        }
        kh={
          <>
            ជាង <strong>២,០០០ ឆ្នាំមុន</strong> នៅ​ <strong>ប្រទេស​ក្រិច​បុរាណ</strong> អ្នក​បង្កើត​ម្នាក់​ឈ្មោះ <strong>អាគីម៉ែត</strong> បាន​ដោះស្រាយ​បញ្ហា​មួយ​ដ៏​លំបាក ៖ <em>តើ​អ្នក​លើក​ទឹក​ចេញ​ពី​ដី​ដោយ​គ្មាន​អគ្គិសនី​យ៉ាង​ណា ?</em>
          </>
        }
      />

      {/* Type chip + name */}
      <div className="rounded-xl border-2 border-amber-500 bg-amber-50 p-3">
        <SubLabel en="The Invention" kh="ការបង្កើត" />
        <div className="font-bold text-amber-950 text-base leading-snug">
          The Archimedes Screw
        </div>
        <div className="font-khmer font-bold text-amber-950 leading-loose">
          វីសអាគីម៉ែត
        </div>
        <div className="mt-2">
          <PumpTypeChip
            kind="manual"
            en="Hand-Powered"
            kh="ដំណើរការដោយដៃ"
          />
        </div>
      </div>

      {/* Diagram */}
      <ArchimedesScrewDiagram />

      <div className="rounded-lg border-2 border-sky-500 bg-sky-50 p-3">
        <SubLabel en="How it Works" kh="របៀបដំណើរការ" />
        <BilingualBlock
          en={
            <>
              It is simply a massive <strong>screw inside a hollow pipe</strong>.
              When the bottom is placed in water and you{" "}
              <strong>turn the handle</strong>, the water gets{" "}
              <strong>trapped in the threads</strong> of the screw and is{" "}
              <strong>physically carried up</strong> to the top — one pocket of
              water per turn.
            </>
          }
          kh={
            <>
              វា​គ្រាន់​តែ​ជា <strong>វីស​ដ៏​ធំ​នៅ​ខាង​ក្នុង​ទុយោ​ប្រហោង</strong>។ ពេល​ដាក់​ផ្នែក​ខាង​ក្រោម​ចូល​ក្នុង​ទឹក ហើយ​អ្នក <strong>បង្វិល​ដៃ​ចាប់</strong> ទឹក​នឹង​ត្រូវ​បាន <strong>ចាប់​ឃុំ​នៅ​ក្នុង​ខ្សែ​វីស</strong> ហើយ <strong>ត្រូវ​បាន​ដឹក​ឡើង​ខាង​លើ</strong> ដោយ​ផ្ទាល់ — ទឹក​មួយ​ហោប៉ៅ​ក្នុង​មួយ​បង្វិល។
            </>
          }
        />
      </div>

      <div className="rounded-md bg-emerald-50 border-l-4 border-l-emerald-500 border border-emerald-200 p-2.5 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
        <Wrench
          className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-700"
          aria-hidden="true"
        />
        <span>
          <strong>Frugal & Timeless:</strong> Archimedes' design is the ultimate
          piece of frugal engineering — no fuel, no motor, no electricity. It
          is <strong>still used today</strong> all over the world to move
          water, grain, and even sewage.
          <br />
          <span className="font-khmer leading-loose">
            <strong>សន្សំសំចៃ និងគ្មានពេលវេលា ៖</strong> ការ​រចនា​របស់​អាគីម៉ែត​គឺ​ជា​ស្នាដៃ​វិស្វកម្ម​សន្សំ​សំចៃ​ដ៏​ឧត្តម — គ្មាន​ឥន្ធនៈ គ្មាន​ម៉ូទ័រ គ្មាន​អគ្គិសនី។ វា​នៅ <strong>ត្រូវ​បាន​ប្រើ​សព្វ​ថ្ងៃ</strong> ពេញ​ពិភពលោក​ដើម្បី​ផ្លាស់​ទី​ទឹក គ្រាប់​ធញ្ញជាតិ និង​សូម្បី​តែ​លូ​សំណល់។
          </span>
        </span>
      </div>
    </BlueprintCard>
  );
}

// SVG: diagonal cylinder containing a helical screw, water pockets, handle
function ArchimedesScrewDiagram() {
  return (
    <div
      className="relative w-full h-44 rounded-lg border-2 border-slate-300 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 176" className="w-full h-full">
        {/* Lower water source */}
        <rect x="0" y="135" width="120" height="41" fill="#0ea5e9" />
        <line
          x1="0"
          y1="135"
          x2="120"
          y2="135"
          stroke="#0c4a6e"
          strokeWidth="1"
        />
        {/* Upper destination trough */}
        <rect x="240" y="20" width="80" height="30" fill="#0ea5e9" />
        <line
          x1="240"
          y1="50"
          x2="320"
          y2="50"
          stroke="#0c4a6e"
          strokeWidth="1"
        />
        <text x="248" y="42" fontSize="8" fill="#0c4a6e" fontWeight="bold">
          Trough
        </text>
        <text
          x="248"
          y="48"
          fontSize="6.5"
          fill="#0c4a6e"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ស្លាប​ទ្រ
        </text>

        {/* The diagonal pipe — outer cylinder */}
        <g transform="translate(70 145) rotate(-40)">
          <rect
            x="0"
            y="-22"
            width="200"
            height="44"
            rx="6"
            fill="#fde68a"
            stroke="#92400e"
            strokeWidth="1.5"
          />
          {/* Internal helix (sine waves to suggest 3D screw threads) */}
          <g stroke="#92400e" strokeWidth="1.4" fill="none">
            {Array.from({ length: 9 }).map((_, i) => {
              const x = 10 + i * 22;
              return (
                <path
                  key={`up-${i}`}
                  d={`M ${x} -18 Q ${x + 11} 0 ${x + 22} -18`}
                />
              );
            })}
            {Array.from({ length: 9 }).map((_, i) => {
              const x = 10 + i * 22;
              return (
                <path
                  key={`dn-${i}`}
                  d={`M ${x} 18 Q ${x + 11} 0 ${x + 22} 18`}
                />
              );
            })}
            {/* Central axle */}
            <line x1="0" y1="0" x2="200" y2="0" strokeWidth="2" stroke="#78350f" />
          </g>
          {/* Water pockets — small blue blobs trapped between threads */}
          <g fill="#38bdf8" stroke="#0369a1" strokeWidth="0.6">
            <ellipse cx="35" cy="6" rx="6" ry="3" />
            <ellipse cx="78" cy="6" rx="6" ry="3" />
            <ellipse cx="121" cy="6" rx="6" ry="3" />
            <ellipse cx="164" cy="6" rx="6" ry="3" />
          </g>
        </g>

        {/* Handle on the upper end */}
        <g
          stroke="#451a03"
          strokeWidth="2.5"
          fill="#92400e"
          strokeLinecap="round"
        >
          <line x1="220" y1="18" x2="245" y2="5" />
          <circle cx="248" cy="3" r="4" />
        </g>
        <text x="225" y="68" fontSize="8" fill="#451a03" fontWeight="bold">
          turn ↻
        </text>
        <text
          x="225"
          y="76"
          fontSize="6.5"
          fill="#451a03"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          បង្វិល
        </text>

        {/* "Water rises" arrow alongside the pipe */}
        <g
          stroke="#0369a1"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M50 145 Q120 110 230 50" />
          <path d="M226 48 L233 49 L231 56" />
        </g>
        <text x="120" y="100" fontSize="9" fill="#0369a1" fontWeight="bold">
          water rises
        </text>
        <text
          x="120"
          y="110"
          fontSize="7.5"
          fill="#0369a1"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ទឹក​ឡើង​លើ
        </text>

        {/* Source label */}
        <text x="6" y="158" fontSize="9" fill="#082f49" fontWeight="bold">
          River / Well
        </text>
        <text
          x="6"
          y="170"
          fontSize="7.5"
          fill="#082f49"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ទន្លេ / អណ្តូង
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 — Hand Pumps & The Vacuum (positive displacement, atmospheric push)
// ════════════════════════════════════════════════════════════════════════════

function HandPumpVacuumCard() {
  return (
    <BlueprintCard
      cardNo="02"
      topicEn="Positive Displacement"
      topicKh="ការផ្លាស់ទីដ៏វិជ្ជមាន"
      titleEn="Hand Pumps & The Vacuum"
      titleKh="ស្នប់ដៃ និងសុញ្ញកាស"
      Icon={Wind}
      testId="card-hand-pump-vacuum"
      paper="#f8fafc"
    >
      <BilingualBlock
        en={
          <>
            Walk into almost any village in Cambodia and you will see one: a{" "}
            <strong>hand pump</strong> over a well. Push the lever down, water
            comes out the spout. But the trick is{" "}
            <em>not what you think</em>.
          </>
        }
        kh={
          <>
            ចូលទៅភូមិណាមួយស្ទើរតែទាំងអស់នៅកម្ពុជា អ្នកនឹងឃើញវា ៖ <strong>ស្នប់ដៃ</strong> លើអណ្តូងទឹក។ រុញដងភ្ជាប់ចុះក្រោម ទឹកចេញពីបំពង់។ ប៉ុន្តែល្បិច​នេះ <em>មិន​មែន​ដូច​ដែល​អ្នក​គិត​ទេ</em>។
          </>
        }
      />

      <div className="rounded-xl border-2 border-sky-500 bg-sky-50 p-3">
        <SubLabel
          en="The Type"
          kh="ប្រភេទ"
        />
        <div className="font-bold text-sky-950 text-base leading-snug">
          Positive Displacement Pump
        </div>
        <div className="font-khmer font-bold text-sky-950 leading-loose">
          ស្នប់​ផ្លាស់​ទី​ដោយ​ទំហំ
        </div>
        <div className="mt-2">
          <PumpTypeChip
            kind="displacement"
            en="Vacuum-Driven"
            kh="ដំណើរការដោយសុញ្ញកាស"
          />
        </div>
      </div>

      <HandPumpVacuumDiagram />

      <div className="rounded-lg border-2 border-amber-500 bg-amber-50 p-3">
        <SubLabel en="The Real Science" kh="វិទ្យាសាស្ត្រពិត" />
        <BilingualBlock
          en={
            <>
              When you push the handle <strong>down</strong>, a{" "}
              <strong>piston pulls up</strong> inside the pipe. This{" "}
              <strong>removes the air</strong>, creating an{" "}
              <strong>empty vacuum</strong>. Now the heavy{" "}
              <strong>atmosphere outside</strong> the pipe pushes down on the
              well water — and that pressure literally{" "}
              <strong>forces the water up</strong> into the empty space inside
              the pipe!
            </>
          }
          kh={
            <>
              ពេល​អ្នក​រុញ​ដង​ភ្ជាប់ <strong>ចុះ​ក្រោម</strong> ​<strong>ភី​ស្តុង​ត្រូវ​បាន​ទាញ​ឡើង​លើ</strong> នៅ​ក្នុង​ទុយោ។ វា <strong>ដក​ខ្យល់​ចេញ</strong> បង្កើត​បាន <strong>សុញ្ញកាស​ទទេ</strong>។ ឥឡូវ <strong>បរិយាកាស​ដ៏​ធ្ងន់​នៅ​ខាង​ក្រៅ</strong> ទុយោ​សង្កត់​ចុះ​លើ​ទឹក​អណ្តូង — ហើយ​សម្ពាធ​នោះ <strong>ច្រាន​ទឹក​ឡើង​លើ</strong> ចូល​ក្នុង​ចន្លោះ​ទទេ​ខាង​ក្នុង​ទុយោ !
            </>
          }
        />
      </div>

      <div className="rounded-md bg-rose-50 border-l-4 border-l-rose-500 border border-rose-200 p-2.5 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
        <AlertTriangle
          className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-700"
          aria-hidden="true"
        />
        <span>
          <strong>The Counter-Intuitive Truth:</strong> You aren't{" "}
          <em>pulling</em> the water up. The atmosphere is{" "}
          <strong>pushing</strong> it up. (This is also why a hand pump cannot
          lift water more than about <strong>10 metres</strong> — that's the
          maximum the atmosphere can push.)
          <br />
          <span className="font-khmer leading-loose">
            <strong>ការ​ពិត​ផ្ទុយ​ពី​ការ​គិត ៖</strong> អ្នក <em>មិន​បាន​ទាញ</em> ទឹក​ឡើង​លើ​ទេ។ បរិយាកាស​កំពុង <strong>ច្រាន</strong> វា​ឡើង​លើ។ (នេះ​ក៏​ជា​មូល​ហេតុ​ដែល​ស្នប់​ដៃ​មិន​អាច​លើក​ទឹក​បាន​លើស​ពី​ប្រហែល <strong>១០ ម៉ែត្រ</strong> ដែរ — នោះ​ជា​អតិបរមា​ដែល​បរិយាកាស​អាច​ច្រាន​បាន។)
          </span>
        </span>
      </div>
    </BlueprintCard>
  );
}

// SVG: cross-section of well + pipe + piston + atmospheric pressure arrows
function HandPumpVacuumDiagram() {
  return (
    <div
      className="relative w-full h-52 rounded-lg border-2 border-slate-300 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 208" className="w-full h-full">
        {/* Sky / atmosphere band */}
        <rect x="0" y="0" width="320" height="48" fill="#e0f2fe" />
        {/* Atmospheric pressure arrows pushing DOWN on the well water surface */}
        <g
          stroke="#0369a1"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {[20, 60, 100, 220, 260, 300].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={6} x2={x} y2={32} />
              <path d={`M ${x - 4} ${28} L ${x} ${34} L ${x + 4} ${28}`} />
            </g>
          ))}
        </g>
        <text x="118" y="20" fontSize="9" fill="#082f49" fontWeight="bold">
          Atmospheric pressure pushes DOWN
        </text>
        <text
          x="118"
          y="30"
          fontSize="7.5"
          fill="#082f49"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          សម្ពាធ​បរិយាកាស​សង្កត់​ចុះ
        </text>

        {/* Ground line */}
        <rect x="0" y="48" width="320" height="6" fill="#92400e" />
        {/* Underground well water */}
        <rect x="0" y="54" width="320" height="154" fill="#075985" />
        {/* Water surface ripples around the pipe */}
        <line x1="0" y1="60" x2="135" y2="60" stroke="#7dd3fc" strokeWidth="1.2" />
        <line x1="185" y1="60" x2="320" y2="60" stroke="#7dd3fc" strokeWidth="1.2" />

        {/* The vertical pipe (cross-section, outlined) */}
        <rect
          x="135"
          y="20"
          width="50"
          height="180"
          fill="#fef3c7"
          stroke="#92400e"
          strokeWidth="1.5"
        />
        {/* Piston near the top of the pipe */}
        <rect
          x="138"
          y="60"
          width="44"
          height="10"
          fill="#475569"
          stroke="#0f172a"
          strokeWidth="1"
        />
        {/* Piston rod going up out of the top */}
        <rect
          x="156"
          y="0"
          width="8"
          height="60"
          fill="#475569"
          stroke="#0f172a"
          strokeWidth="0.8"
        />
        {/* Vacuum (empty space) below the piston */}
        <text x="143" y="100" fontSize="9" fill="#1e293b" fontWeight="bold">
          VACUUM
        </text>
        <text
          x="143"
          y="110"
          fontSize="7.5"
          fill="#1e293b"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          សុញ្ញកាស
        </text>

        {/* Water column being PUSHED up inside the pipe */}
        <rect x="138" y="140" width="44" height="60" fill="#38bdf8" />
        <g
          stroke="#0c4a6e"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="160" y1="180" x2="160" y2="135" />
          <path d="M 154 142 L 160 134 L 166 142" />
        </g>
        <text x="190" y="150" fontSize="9" fill="#0c4a6e" fontWeight="bold">
          ↑ water forced up
        </text>
        <text
          x="190"
          y="160"
          fontSize="7.5"
          fill="#0c4a6e"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ទឹក​ត្រូវ​បាន​រុញ​ឡើង
        </text>

        {/* Outside-pipe pressure arrows (right side, pushing water down on well surface) */}
        <g
          stroke="#0369a1"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="240" y1="40" x2="240" y2="56" />
          <path d="M 236 52 L 240 58 L 244 52" />
        </g>

        {/* Labels */}
        <text x="6" y="78" fontSize="8" fill="#cffafe" fontWeight="bold">
          Well water
        </text>
        <text
          x="6"
          y="88"
          fontSize="7"
          fill="#cffafe"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ទឹក​អណ្តូង
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 — Modern Centrifugal Pumps (motorized, impeller, centrifugal force)
// ════════════════════════════════════════════════════════════════════════════

function CentrifugalPumpCard() {
  return (
    <BlueprintCard
      cardNo="03"
      topicEn="Modern Engineering"
      topicKh="វិស្វកម្មទំនើប"
      titleEn="Modern Centrifugal Pumps"
      titleKh="ម៉ាស៊ីនបូមទឹកប្រើកម្លាំងចោល"
      Icon={Fan}
      testId="card-centrifugal-pump"
      paper="#f8fafc"
    >
      <BilingualBlock
        en={
          <>
            The noisy, motorized pumps you hear running in modern{" "}
            <strong>rice fields</strong> and <strong>city water systems</strong>{" "}
            are not screws or pistons — they are{" "}
            <strong>spinners</strong>.
          </>
        }
        kh={
          <>
            ម៉ាស៊ីន​បូម​ទឹក​ដែល​ឮ​សំឡេង​ខ្លាំង ដើរ​ដោយ​ម៉ូទ័រ​ដែល​អ្នក​ឮ​នៅ​ក្នុង <strong>ស្រែ​នាំ​ស្រូវ</strong> និង <strong>ប្រព័ន្ធ​ទឹក​ក្នុង​ទីក្រុង</strong> ​សព្វ​ថ្ងៃ — មិន​មែន​វីស ឬ​ភី​ស្តុង​ទេ ពួក​វា​គឺ​ជា <strong>អ្នក​វិល​មូល</strong>។
          </>
        }
      />

      <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-3">
        <SubLabel en="The Type" kh="ប្រភេទ" />
        <div className="font-bold text-emerald-950 text-base leading-snug">
          Centrifugal Pump
        </div>
        <div className="font-khmer font-bold text-emerald-950 leading-loose">
          ម៉ាស៊ីន​បូម​ប្រើ​កម្លាំង​ចោល
        </div>
        <div className="mt-2">
          <PumpTypeChip
            kind="centrifugal"
            en="Motor-Driven"
            kh="ដំណើរការដោយម៉ូទ័រ"
          />
        </div>
      </div>

      <CentrifugalPumpDiagram />

      <div className="rounded-lg border-2 border-sky-500 bg-sky-50 p-3">
        <SubLabel en="How it Works" kh="របៀបដំណើរការ" />
        <BilingualBlock
          en={
            <>
              Inside the metal casing is a spinning fan called an{" "}
              <strong>“Impeller”</strong>. It spins{" "}
              <strong>incredibly fast</strong> — grabbing the water and{" "}
              <strong>throwing it outward</strong> against the walls of the
              casing using <strong>centrifugal force</strong>. That massive
              outward pressure violently <strong>forces the water up</strong>{" "}
              and out of the exit pipe.
            </>
          }
          kh={
            <>
              ​ខាង​ក្នុង​ស្រោម​ដែក​មាន​កង្ហារ​វិល​មួយ​ហៅ​ថា <strong>«អ៊ំផេលឺ»</strong>។ វា​វិល <strong>លឿន​មិន​ធម្មតា</strong> — ចាប់​ទឹក​ហើយ <strong>ច្រាន​វា​ចេញ​ក្រៅ</strong> ទៅ​ប៉ះ​ជញ្ជាំង​ស្រោម​ដោយ​ប្រើ <strong>កម្លាំង​ចោល</strong>។ សម្ពាធ​ខាង​ក្រៅ​ដ៏​ធំ​សម្បើម​នោះ <strong>បង្ខំ​ទឹក​ឡើង​លើ</strong> ដោយ​ហិង្សា ហើយ​ចេញ​តាម​បំពង់​ចេញ។
            </>
          }
        />
      </div>

      <div className="rounded-md bg-cyan-50 border-l-4 border-l-cyan-500 border border-cyan-200 p-2.5 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
        <Zap
          className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-700"
          aria-hidden="true"
        />
        <span>
          <strong>Where you'll see it:</strong> giant rice-field irrigation
          pumps, the booster pumps in city water-towers, the pump behind every
          fire-truck hose, and even the little pump inside a washing machine
          and a car's radiator. Centrifugal pumps move{" "}
          <strong>more water, faster, than any other design</strong>.
          <br />
          <span className="font-khmer leading-loose">
            <strong>កន្លែង​ដែល​អ្នក​នឹង​ឃើញ​វា ៖</strong> ​ម៉ាស៊ីន​បូម​ស្រោច​ស្រែ​ដ៏​ធំ ស្នប់​បង្កើន​សម្ពាធ​ក្នុង​អគារ​ប្រាសាទ​ទឹក​ទីក្រុង ស្នប់​ពី​ក្រោយ​ទុយោ​រថ​ពន្លត់​អគ្គិភ័យ និង​សូម្បី​តែ​ស្នប់​តូច​នៅ​ក្នុង​ម៉ាស៊ីន​បោក​គក់ និង​រ៉ាដ្យាទ័រ​រថយន្ត។ ម៉ាស៊ីន​បូម​កម្លាំង​ចោល​ផ្លាស់​ទី​ <strong>ទឹក​បាន​ច្រើន​ជាង​ លឿន​ជាង ការ​រចនា​ផ្សេង​ទៀត​ទាំងអស់</strong>។
          </span>
        </span>
      </div>
    </BlueprintCard>
  );
}

// SVG: top-down view of centrifugal pump casing with curved impeller blades
function CentrifugalPumpDiagram() {
  return (
    <div
      className="relative w-full h-44 rounded-lg border-2 border-slate-300 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 176" className="w-full h-full">
        {/* Outer volute (snail-shell) casing */}
        <path
          d="M 60 88 A 78 78 0 1 1 138 166 L 280 166 L 280 130 L 200 130 A 42 42 0 1 0 60 88 Z"
          fill="#cbd5e1"
          stroke="#0f172a"
          strokeWidth="1.5"
        />
        {/* Inlet (eye of the impeller) — water arrives from the back */}
        <circle cx="138" cy="88" r="14" fill="#1e293b" />
        <text x="120" y="38" fontSize="8" fill="#0c4a6e" fontWeight="bold">
          Water in (eye)
        </text>
        <text
          x="120"
          y="48"
          fontSize="7"
          fill="#0c4a6e"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ទឹក​ចូល
        </text>
        {/* Inlet arrow */}
        <g
          stroke="#0c4a6e"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="138" y1="55" x2="138" y2="78" />
          <path d="M 132 72 L 138 80 L 144 72" />
        </g>

        {/* Impeller — six curved (backward-swept) blades */}
        <g
          fill="#fbbf24"
          stroke="#92400e"
          strokeWidth="1.2"
          transform="translate(138 88)"
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              transform={`rotate(${deg})`}
              d="M 0 -2 Q 18 -10 32 -2 Q 18 2 0 2 Z"
            />
          ))}
          {/* Hub */}
          <circle cx="0" cy="0" r="6" fill="#78350f" />
        </g>

        {/* Spin direction indicator */}
        <g
          stroke="#92400e"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M 96 88 A 42 42 0 0 1 138 46" />
          <path d="M 134 42 L 138 46 L 134 51" />
        </g>
        <text x="64" y="72" fontSize="8" fill="#92400e" fontWeight="bold">
          spin ↻
        </text>
        <text
          x="64"
          y="80"
          fontSize="7"
          fill="#92400e"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          វិល
        </text>

        {/* Outward water spiral (centrifugal throw) */}
        <g
          stroke="#0ea5e9"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        >
          <path d="M 138 70 Q 200 70 220 110 Q 230 140 270 145" />
          <path d="M 264 142 L 272 145 L 268 152" strokeLinejoin="round" />
        </g>

        {/* Exit pipe to the right */}
        <text x="200" y="124" fontSize="9" fill="#0c4a6e" fontWeight="bold">
          High-pressure exit →
        </text>
        <text
          x="200"
          y="158"
          fontSize="7.5"
          fill="#0c4a6e"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ច្រក​ចេញ​សម្ពាធ​ខ្ពស់ →
        </text>

        {/* Title */}
        <text x="6" y="14" fontSize="9" fill="#0f172a" fontWeight="bold">
          Top-down view · Impeller
        </text>
        <text
          x="6"
          y="24"
          fontSize="7.5"
          fill="#0f172a"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ទិដ្ឋភាព​ពី​លើ · អ៊ំផេលឺ
        </text>
      </svg>
    </div>
  );
}

