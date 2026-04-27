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
  Gauge,
  Cylinder,
  Truck,
  Disc3,
  Droplets,
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

      {/* ─── Steel-pipe divider into the Hydraulics mega-section ─── */}
      <HydraulicsSection />

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


// ════════════════════════════════════════════════════════════════════════════
//  TECH-PMP-02 · Hydraulics: The Power of Liquid
//                អ៊ីដ្រូលីក៖ ថាមពលនៃអង្គធាតុរាវ
//
//  Heavy industrial-engineering aesthetic — caution-yellow, steel grey, and
//  hydraulic-fluid blue. Three strictly bilingual cards arranged below a
//  steel-pipe "system divider" that visually breaks fluid dynamics from the
//  fluid-power chapter.
//
//   1. The Golden Rule of Hydraulics — incompressibility + Pascal's Principle
//   2. How the Pump Works            — flow vs. pressure + cylinder/piston
//   3. Real-World Muscle             — excavators, tractors, and car brakes
// ════════════════════════════════════════════════════════════════════════════

function HydraulicsSection() {
  return (
    <section
      data-testid="section-hydraulics"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
    >
      {/* ─── Visual divider — flanged steel pipe with hazard tape ─── */}
      <SteelPipeDivider />

      {/* ─── Bilingual section header ─── */}
      <header className="mt-8 mb-8">
        <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-yellow-400/80 text-yellow-200 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-md flex-wrap backdrop-blur-sm">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Industrial Engineering · Fluid Power</span>
          <span className="opacity-50">·</span>
          <span className="font-khmer normal-case">
            វិស្វកម្មឧស្សាហកម្ម · ថាមពលអង្គធាតុរាវ
          </span>
          <span className="font-mono opacity-60">· TECH-PMP-02</span>
        </div>

        <h2
          data-testid="hydraulics-title"
          className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-2 leading-tight text-white"
        >
          Hydraulics:{" "}
          <span className="text-yellow-300">The Power of Liquid</span>
        </h2>
        <h3 className="font-khmer font-bold text-xl sm:text-2xl lg:text-3xl mb-5 leading-loose text-slate-200">
          អ៊ីដ្រូលីក៖{" "}
          <span className="text-yellow-300">ថាមពលនៃអង្គធាតុរាវ</span>
        </h3>

        <div className="space-y-2 max-w-3xl">
          <p className="text-slate-200 text-base leading-relaxed">
            Pumps move water — but the same liquid, trapped in a sealed steel
            pipe, can also <strong>lift a 40-tonne excavator bucket</strong> or
            <strong> stop a speeding car</strong>. This is{" "}
            <em>fluid power</em>: turning gentle pushes into massive,
            controllable force.
          </p>
          <p className="text-slate-200 text-base font-khmer leading-loose">
            ម៉ាស៊ីនបូមផ្លាស់ទីទឹក — ប៉ុន្តែ​អង្គធាតុរាវ​ដដែល ដែល​ត្រូវ​ឃុំ​នៅ​ក្នុង​បំពង់​ដែក​បិទ​ជិត ក៏​អាច <strong>លើកផ្លិតម៉ាស៊ីនជីក (អេក្សកាវ៉ាទ័រ) ទម្ងន់ ៤០ តោន</strong> ឬ <strong>បញ្ឈប់​រថយន្ត​ដែល​បើក​លឿន</strong> ​បាន​ដែរ​។ នេះ​ជា <em>ថាមពល​អង្គធាតុរាវ</em> ៖ ការ​បំប្លែង​ការ​រុញ​ដោយ​ថ្នមៗ ​ឱ្យ​ទៅ​ជា​កម្លាំង​ដ៏​ធំ ​សម្បើម​ដែល​អាច​គ្រប់គ្រង​បាន​។
          </p>
        </div>
      </header>

      {/* ─── Three industrial cards ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GoldenRuleCard />
        <HydraulicPumpCard />
        <HydraulicMuscleCard />
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Steel-pipe divider with bolted flanges and hazard chevron tape
// ════════════════════════════════════════════════════════════════════════════

function SteelPipeDivider() {
  return (
    <div
      data-testid="steel-pipe-divider"
      className="relative w-full my-4"
      aria-hidden="true"
    >
      <svg viewBox="0 0 1200 110" className="w-full h-20 sm:h-24">
        <defs>
          {/* Brushed-steel pipe gradient */}
          <linearGradient id="pipe-steel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="35%" stopColor="#e2e8f0" />
            <stop offset="55%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="flange-steel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          {/* Black/yellow caution chevron pattern (rotated 45°) */}
          <pattern
            id="hazard-tape"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="10" height="20" fill="#facc15" />
            <rect x="10" width="10" height="20" fill="#0f172a" />
          </pattern>
        </defs>

        {/* Left flange */}
        <rect x="20" y="20" width="22" height="70" rx="3" fill="url(#flange-steel)" stroke="#1e293b" strokeWidth="1.2" />
        {/* Bolts on left flange */}
        {[30, 45, 60, 75].map((cy) => (
          <circle key={`bL-${cy}`} cx="31" cy={cy} r="3" fill="#1e293b" stroke="#94a3b8" strokeWidth="0.6" />
        ))}

        {/* Main pipe body */}
        <rect x="42" y="32" width="1116" height="46" fill="url(#pipe-steel)" stroke="#1e293b" strokeWidth="1.2" />
        {/* Top reflective highlight */}
        <rect x="42" y="34" width="1116" height="4" fill="#ffffff" opacity="0.35" />
        {/* Bottom shadow line */}
        <rect x="42" y="73" width="1116" height="3" fill="#0f172a" opacity="0.45" />

        {/* Right flange */}
        <rect x="1158" y="20" width="22" height="70" rx="3" fill="url(#flange-steel)" stroke="#1e293b" strokeWidth="1.2" />
        {[30, 45, 60, 75].map((cy) => (
          <circle key={`bR-${cy}`} cx="1169" cy={cy} r="3" fill="#1e293b" stroke="#94a3b8" strokeWidth="0.6" />
        ))}

        {/* Hazard tape band wrapping the pipe — left */}
        <rect x="180" y="32" width="60" height="46" fill="url(#hazard-tape)" stroke="#0f172a" strokeWidth="0.8" />
        {/* Hazard tape band — right */}
        <rect x="960" y="32" width="60" height="46" fill="url(#hazard-tape)" stroke="#0f172a" strokeWidth="0.8" />

        {/* Stencil plate riveted to the centre */}
        <rect x="420" y="26" width="360" height="58" rx="4" fill="#facc15" stroke="#1e293b" strokeWidth="1.5" />
        {/* Rivets on the plate corners */}
        {[
          [428, 34], [772, 34], [428, 76], [772, 76],
        ].map(([cx, cy]) => (
          <circle key={`r-${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="#1e293b" />
        ))}
        <text
          x="600"
          y="50"
          textAnchor="middle"
          fontSize="15"
          fontWeight="900"
          fill="#0f172a"
          fontFamily="ui-monospace, monospace"
          letterSpacing="2"
        >
          HYDRAULIC SYSTEM
        </text>
        <text
          x="600"
          y="72"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ប្រព័ន្ធអ៊ីដ្រូលីក
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 — The Golden Rule of Hydraulics
//           (Incompressibility + Pascal's Principle)
// ════════════════════════════════════════════════════════════════════════════

function GoldenRuleCard() {
  return (
    <BlueprintCard
      cardNo="04"
      topicEn="Fluid Power · Principle"
      topicKh="ថាមពលអង្គធាតុរាវ · គោលការណ៍"
      titleEn="The Golden Rule of Hydraulics"
      titleKh="ច្បាប់មាសនៃអ៊ីដ្រូលីក"
      Icon={Gauge}
      testId="card-golden-rule"
      paper="#fefce8"
    >
      <BilingualBlock
        en={
          <>
            Hydraulics works because of one stubborn fact about liquids:
            unlike air, you{" "}
            <strong>cannot squash a liquid into a smaller space</strong>.
            Push on it in one place and the pressure has to go{" "}
            <strong>everywhere else</strong> — instantly, and with the{" "}
            <strong>same pressure throughout the fluid</strong>.
          </>
        }
        kh={
          <>
            អ៊ីដ្រូលីក​ដំណើរការ​បាន​ដោយសារ​អង្គហេតុ​មួយ​ដ៏​រឹង​ច្បាស់​អំពី​អង្គធាតុ​រាវ ៖ ខុស​ពី​ខ្យល់ អ្នក <strong>មិន​អាច​បង្រួម​អង្គធាតុ​រាវ​ឱ្យ​នៅ​ក្នុង​លំហ​តូច​ជាង​មុន​បាន​ឡើយ</strong>។ រុញ​វា​នៅ​កន្លែង​មួយ សម្ពាធ​នោះ​ត្រូវ​តែ​បញ្ជូន​ទៅ​ <strong>គ្រប់​ទីកន្លែង​ផ្សេងៗ​ទៀត</strong> — ភ្លាមៗ ហើយ​ដោយ <strong>សម្ពាធ​ដូច​គ្នា​ពេញ​អង្គធាតុ​រាវ</strong>។
          </>
        }
      />

      {/* Concept chip */}
      <div className="rounded-xl border-2 border-yellow-500 bg-yellow-50 p-3">
        <SubLabel en="The Principle" kh="គោលការណ៍" />
        <div className="font-bold text-yellow-950 text-base leading-snug">
          Pascal's Principle
        </div>
        <div className="font-khmer font-bold text-yellow-950 leading-loose">
          គោលការណ៍ប៉ាស្កាល់
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <KeyTermChip
            en="Incompressibility"
            kh="ភាពមិនអាចបង្រួមបាន"
            tone="amber"
          />
          <KeyTermChip
            en="Pressure"
            kh="សម្ពាធ"
            tone="blue"
          />
        </div>
      </div>

      {/* Pascal U-tube diagram */}
      <PascalDiagram />

      <div className="rounded-lg border-2 border-sky-500 bg-sky-50 p-3">
        <SubLabel en="In one sentence" kh="ក្នុងប្រយោគមួយ" />
        <BilingualBlock
          en={
            <>
              <strong>“Pressure applied anywhere</strong> in a confined,
              incompressible fluid is transmitted{" "}
              <strong>equally and in every direction</strong> throughout the
              fluid.” That is{" "}
              <strong>why a small push on one side</strong> of the pipe can
              produce a <strong>massive lift on the other</strong>.
            </>
          }
          kh={
            <>
              <strong>«សម្ពាធ​ដែល​ដាក់​នៅ​កន្លែង​ណា​ក៏​ដោយ</strong> នៅ​ក្នុង​អង្គធាតុ​រាវ​ដែល​បិទ​ជិត ហើយ​មិន​អាច​បង្រួម​បាន ត្រូវ​បាន​បញ្ជូន​ <strong>ស្មើ​គ្នា ហើយ​គ្រប់​ទិស​ដៅ</strong> ពេញ​អង្គធាតុ​រាវ​នោះ​។» នោះ​ហើយ​ជា <strong>មូលហេតុ​ដែល​ការ​រុញ​តូច​មួយ​ខាង​ម្ខាង</strong> នៃ​បំពង់ ​អាច​ផលិត <strong>ការ​លើក​ដ៏​ធំ​សម្បើម​នៅ​ខាង​ម្ខាង​ទៀត</strong> បាន​។
            </>
          }
        />
      </div>

      <div className="rounded-md bg-yellow-50 border-l-4 border-l-yellow-500 border border-yellow-200 p-2.5 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
        <AlertTriangle
          className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-700"
          aria-hidden="true"
        />
        <span>
          <strong>Why it matters:</strong> a liquid can't compress, so it
          behaves like a <strong>solid steel rod that can bend around
          corners</strong>. Every drop of force you put in comes out the other
          end — that's the foundation of every hydraulic machine.
          <br />
          <span className="font-khmer leading-loose">
            <strong>ហេតុ​អ្វី​បាន​ជា​សំខាន់ ៖</strong> អង្គធាតុ​រាវ​មិន​អាច​បង្រួម​បាន ដូច្នេះ​វា​មាន​ឥរិយាបទ​ដូច​ជា <strong>ដំបង​ដែក​រឹង​ដែល​អាច​បត់​ជុំ​វិញ​ជ្រុង​បាន</strong>។ កម្លាំង​គ្រប់​តំណក់​ដែល​អ្នក​ដាក់​ចូល ​ត្រូវ​ចេញ​មក​នៅ​ចុង​ម្ខាង​ទៀត — នោះ​ជា​មូលដ្ឋាន​នៃ​ម៉ាស៊ីន​អ៊ីដ្រូលីក​គ្រប់​ប្រភេទ​។
          </span>
        </span>
      </div>
    </BlueprintCard>
  );
}

// SVG: asymmetric U-tube. NARROW left arm (small piston, small area) →
// equal pressure transmitted through the fluid → WIDE right arm (large
// piston, ≈ 2.5× the left area) produces a proportionally larger force.
// This is Pascal's area-based force amplification: F2 = F1 × (A2 / A1).
// Visible widths: 40 px (left) vs 98 px (right) ≈ 2.45× → label "≈ 2.5 N ↑".
function PascalDiagram() {
  return (
    <div
      className="relative w-full h-44 rounded-lg border-2 border-slate-300 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 176" className="w-full h-full">
        {/* Title */}
        <text x="6" y="12" fontSize="9" fill="#0f172a" fontWeight="bold">
          Pascal's Principle · សម្ពាធស្មើគ្នាគ្រប់ទិស
        </text>

        {/*
          Asymmetric U-tube: narrow left arm (cylinder area = small),
          wide right arm (cylinder area ≈ 2.5× the left). Same pressure
          on both sides → ~2.5× force on the larger piston.
        */}
        <path
          d="M 50 50 L 50 140 Q 50 156 66 156 L 282 156 Q 298 156 298 140 L 298 36 L 200 36 L 200 122 L 90 122 L 90 50 Z"
          fill="#dbeafe"
          stroke="#1e293b"
          strokeWidth="1.6"
        />

        {/* Hydraulic fluid (blue) — fills the tube up to the piston bases */}
        <path
          d="M 52 70 L 52 138 Q 52 154 68 154 L 280 154 Q 296 154 296 138 L 296 56 L 202 56 L 202 124 L 88 124 L 88 70 Z"
          fill="#1e3a8a"
          opacity="0.55"
        />

        {/* Equal-pressure arrows radiating in the centre of the bend */}
        <g stroke="#facc15" strokeWidth="1.4" fill="none" strokeLinecap="round">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="150"
              y1="140"
              x2={150 + 16 * Math.cos((deg * Math.PI) / 180)}
              y2={140 + 16 * Math.sin((deg * Math.PI) / 180)}
            />
          ))}
        </g>
        <text x="118" y="172" fontSize="7" fill="#92400e" fontWeight="bold">
          equal pressure · សម្ពាធស្មើគ្នា
        </text>

        {/* SMALL piston on the narrow left arm (≈40 wide → small area) */}
        <rect x="50" y="56" width="40" height="14" fill="#475569" stroke="#0f172a" strokeWidth="1" />
        <rect x="66" y="32" width="8" height="24" fill="#0f172a" />
        {/* Force-down arrow on the small piston */}
        <g stroke="#dc2626" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="70" y1="14" x2="70" y2="32" />
          <path d="M 64 26 L 70 34 L 76 26" />
        </g>
        <text x="22" y="22" fontSize="9" fill="#dc2626" fontWeight="bold">
          1 N ↓
        </text>
        <text x="50" y="86" fontSize="7" fill="#0f172a" fontWeight="bold">
          small area
        </text>
        <text
          x="50"
          y="94"
          fontSize="6.5"
          fill="#0f172a"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ផ្ទៃតូច
        </text>

        {/* LARGE piston on the wide right arm (≈98 wide → ~2.5× area) */}
        <rect x="200" y="42" width="98" height="14" fill="#475569" stroke="#0f172a" strokeWidth="1" />
        <rect x="245" y="20" width="8" height="22" fill="#0f172a" />
        {/* Force-up arrow on the large piston (lifts the load) */}
        <g stroke="#16a34a" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="249" y1="6" x2="249" y2="20" />
          <path d="M 243 12 L 249 6 L 255 12" />
        </g>
        <text x="259" y="16" fontSize="9" fill="#15803d" fontWeight="bold">
          ≈ 2.5 N ↑
        </text>
        <text x="206" y="72" fontSize="7" fill="#0f172a" fontWeight="bold">
          big area · larger force
        </text>
        <text
          x="206"
          y="80"
          fontSize="6.5"
          fill="#0f172a"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ផ្ទៃធំ · កម្លាំងធំ
        </text>

        {/* Footnote: F = P × A explanation */}
        <text x="6" y="140" fontSize="6.5" fill="#475569" fontFamily="ui-monospace, monospace">
          F = P × A
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 — How the Pump Works (flow vs. pressure + cylinder/piston)
// ════════════════════════════════════════════════════════════════════════════

function HydraulicPumpCard() {
  return (
    <BlueprintCard
      cardNo="05"
      topicEn="Fluid Power · Mechanism"
      topicKh="ថាមពលអង្គធាតុរាវ · យន្តការ"
      titleEn="How the Pump Works"
      titleKh="របៀបដែលម៉ាស៊ីនបូមដំណើរការ"
      Icon={Cylinder}
      testId="card-hydraulic-pump"
      paper="#f1f5f9"
    >
      <BilingualBlock
        en={
          <>
            Here is the surprise that catches every new mechanic:{" "}
            <strong>
              a hydraulic pump does not create pressure
            </strong>{" "}
            — it creates <strong>flow</strong>. It just keeps shoving
            hydraulic fluid into the system. <strong>Pressure</strong> only
            shows up when that flow <strong>hits resistance</strong> — like
            trying to lift a heavy rock.
          </>
        }
        kh={
          <>
            ​នេះ​ជា​ការ​ឆ្ងល់​ដែល​ចាប់​ជើង​ជាង​ថ្មី​គ្រប់​នាក់ ៖ <strong>ម៉ាស៊ីន​បូម​អ៊ីដ្រូលីក​មិន​បង្កើត​សម្ពាធ​ទេ</strong> — វា​បង្កើត <strong>លំហូរ</strong>។ វា​គ្រាន់​តែ​បន្ត​រុញ​អង្គធាតុ​រាវ​អ៊ីដ្រូលីក​ចូល​ក្នុង​ប្រព័ន្ធ។ <strong>សម្ពាធ</strong> លេច​ឡើង​លុះ​តែ​លំហូរ​នោះ <strong>ប៉ះ​នឹង​ការ​ទប់​ទល់</strong> — ដូច​ជា​ការ​ព្យាយាម​លើក​ដុំ​ថ្ម​ដ៏​ធ្ងន់​ជា​ដើម​។
          </>
        }
      />

      {/* The Cylinder */}
      <div className="rounded-xl border-2 border-slate-500 bg-slate-100 p-3">
        <SubLabel en="The Workhorse Part" kh="ផ្នែកធ្វើការ" />
        <div className="font-bold text-slate-900 text-base leading-snug">
          The Cylinder &amp; Piston
        </div>
        <div className="font-khmer font-bold text-slate-900 leading-loose">
          ស៊ីឡាំង និង ភី​ស្តុង
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <KeyTermChip en="Flow" kh="លំហូរ" tone="blue" />
          <KeyTermChip en="Pressure" kh="សម្ពាធ" tone="red" />
          <KeyTermChip en="Piston" kh="ភី​ស្តុង" tone="slate" />
        </div>
      </div>

      <HydraulicCylinderDiagram />

      <div className="rounded-lg border-2 border-sky-500 bg-sky-50 p-3">
        <SubLabel en="The chain of events" kh="ខ្សែសង្វាក់ដំណើរការ" />
        <BilingualBlock
          en={
            <>
              The pump shoves fluid into a strong{" "}
              <strong>steel cylinder</strong>. Inside that cylinder sits a{" "}
              <strong>metal rod called a piston</strong>. As more fluid is
              forced in behind it, the piston has nowhere to go but{" "}
              <strong>outward</strong> — and it does the heavy lifting on the
              outside world.
            </>
          }
          kh={
            <>
              ម៉ាស៊ីន​បូម​រុញ​អង្គធាតុ​រាវ​ចូល​ក្នុង <strong>ស៊ីឡាំង​ដែក​ដ៏​រឹង</strong> មួយ​។ ​ខាង​ក្នុង​ស៊ីឡាំង​នោះ​មាន <strong>ដំបង​ដែក​មួយ​ឈ្មោះ​ថា​ភី​ស្តុង</strong>។ ពេល​អង្គធាតុ​រាវ​ត្រូវ​បាន​បង្ខំ​ឱ្យ​ចូល​ខាង​ក្រោយ​វា​កាន់​តែ​ច្រើន ភី​ស្តុង​គ្មាន​ផ្លូវ​ទៅ​ណា​ក្រៅ​ពី​ <strong>រុញ​ចេញ​ទៅ​ខាង​ក្រៅ</strong> — ហើយ​វា​ធ្វើ​ការ​លើក​ដ៏​ធ្ងន់​នៅ​ពិភព​ខាង​ក្រៅ​។
            </>
          }
        />
      </div>

      <div className="rounded-md bg-blue-50 border-l-4 border-l-blue-500 border border-blue-200 p-2.5 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
        <Droplets
          className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-700"
          aria-hidden="true"
        />
        <span>
          <strong>Flow vs. Pressure — the key insight:</strong> a pump set
          loose with no load (no resistance) builds{" "}
          <em>almost zero pressure</em> — fluid just sprays out freely. Block
          that flow and the same pump can build hundreds of bar of pressure
          almost instantly. <strong>Resistance creates pressure.</strong>
          <br />
          <span className="font-khmer leading-loose">
            <strong>លំហូរ​ឬ​សម្ពាធ — គន្លឹះ​សំខាន់ ៖</strong> ម៉ាស៊ីន​បូម​ដែល​គ្មាន​បន្ទុក (គ្មាន​ការ​ទប់​ទល់) បង្កើត​ <em>សម្ពាធ​ស្ទើរ​តែ​សូន្យ</em> — អង្គធាតុ​រាវ​គ្រាន់​តែ​ហូរ​ចេញ​ដោយ​សេរី។ បិទ​ផ្លូវ​លំហូរ​នោះ ម៉ាស៊ីន​ដដែល​អាច​បង្កើត​សម្ពាធ​រាប់​រយ​បារ​ភ្លាម​បាន​។ <strong>ការ​ទប់​ទល់​បង្កើត​សម្ពាធ​។</strong>
          </span>
        </span>
      </div>
    </BlueprintCard>
  );
}

// SVG: cross-section of a hydraulic cylinder. Pump → fluid line → cylinder
// with piston pushing rod outward to lift a weight.
function HydraulicCylinderDiagram() {
  return (
    <div
      className="relative w-full h-44 rounded-lg border-2 border-slate-300 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 176" className="w-full h-full">
        {/* Title */}
        <text x="6" y="14" fontSize="9" fill="#0f172a" fontWeight="bold">
          Cylinder cross-section · ស៊ីឡាំង
        </text>

        {/* Pump on the left */}
        <rect x="6" y="100" width="40" height="40" rx="4" fill="#475569" stroke="#0f172a" strokeWidth="1.2" />
        <circle cx="26" cy="120" r="8" fill="#facc15" stroke="#0f172a" strokeWidth="0.8" />
        <text x="6" y="156" fontSize="7" fill="#0f172a" fontWeight="bold">
          PUMP
        </text>
        <text
          x="6"
          y="166"
          fontSize="6.5"
          fill="#0f172a"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ម៉ាស៊ីនបូម
        </text>

        {/* Hydraulic fluid line from pump to cylinder */}
        <path
          d="M 46 120 L 80 120 L 80 88 L 110 88"
          stroke="#1e3a8a"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 46 120 L 80 120 L 80 88 L 110 88"
          stroke="#3b82f6"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <text x="48" y="112" fontSize="7" fill="#1e3a8a" fontWeight="bold">
          flow → លំហូរ
        </text>

        {/* Cylinder body */}
        <rect x="110" y="68" width="120" height="40" rx="3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.4" />
        {/* Cylinder shadow + highlight */}
        <rect x="110" y="70" width="120" height="3" fill="#ffffff" opacity="0.6" />
        <rect x="110" y="103" width="120" height="3" fill="#0f172a" opacity="0.4" />
        {/* Fluid inside (left chamber) */}
        <rect x="112" y="70" width="60" height="36" fill="#1e3a8a" opacity="0.55" />
        {/* Piston head */}
        <rect x="170" y="68" width="12" height="40" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
        {/* Piston rod extending out the right end */}
        <rect x="182" y="82" width="80" height="12" fill="#94a3b8" stroke="#0f172a" strokeWidth="1" />
        {/* Rod end-cap */}
        <rect x="262" y="78" width="6" height="20" fill="#0f172a" />

        {/* Label: cylinder + piston */}
        <text x="115" y="62" fontSize="7" fill="#0f172a" fontWeight="bold">
          Steel cylinder
        </text>
        <text
          x="115"
          y="124"
          fontSize="6.5"
          fill="#0f172a"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ស៊ីឡាំងដែក
        </text>
        <text x="172" y="62" fontSize="7" fill="#0f172a" fontWeight="bold">
          Piston
        </text>
        <text
          x="172"
          y="124"
          fontSize="6.5"
          fill="#0f172a"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ភី​ស្តុង
        </text>

        {/* Push-out arrow */}
        <g stroke="#16a34a" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="270" y1="88" x2="298" y2="88" />
          <path d="M 292 82 L 300 88 L 292 94" />
        </g>
        <text x="270" y="74" fontSize="8" fill="#15803d" fontWeight="bold">
          push
        </text>
        <text
          x="270"
          y="106"
          fontSize="6.5"
          fill="#15803d"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          រុញចេញ
        </text>

        {/* Heavy load on right (rock) */}
        <ellipse cx="304" cy="140" rx="14" ry="6" fill="#0f172a" opacity="0.3" />
        <path
          d="M 290 138 Q 296 122 304 124 Q 314 122 318 138 Z"
          fill="#78350f"
          stroke="#0f172a"
          strokeWidth="1"
        />
        <text x="270" y="160" fontSize="7" fill="#0f172a" fontWeight="bold">
          heavy load
        </text>
        <text
          x="270"
          y="170"
          fontSize="6.5"
          fill="#0f172a"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          បន្ទុកធ្ងន់
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 — Real-World Muscle (excavators / tractors + car brakes)
// ════════════════════════════════════════════════════════════════════════════

function HydraulicMuscleCard() {
  return (
    <BlueprintCard
      cardNo="06"
      topicEn="Fluid Power · In the Wild"
      topicKh="ថាមពលអង្គធាតុរាវ · ក្នុងជីវិតពិត"
      titleEn="Real-World Muscle"
      titleKh="កម្លាំងក្នុងពិភពពិត"
      Icon={Truck}
      testId="card-hydraulic-muscle"
      paper="#fef9c3"
    >
      <BilingualBlock
        en={
          <>
            Once you understand the cylinder, you start seeing it{" "}
            <strong>everywhere</strong> — at the rice-field edge, at the
            construction site, and underneath your own feet on the brake
            pedal.
          </>
        }
        kh={
          <>
            ​ពេល​អ្នក​យល់​ពី​ស៊ីឡាំង​មួយ អ្នក​នឹង​ឃើញ​វា <strong>គ្រប់​ទីកន្លែង</strong> — នៅ​ឆ្នេរ​ស្រែ នៅ​ការដ្ឋាន​សំណង់ និង​នៅ​ខាង​ក្រោម​ជើង​អ្នក​នៅ​លើ​ប្រដាប់​ហ្វ្រាំង​។
          </>
        }
      />

      {/* Use-case 1: Heavy machinery */}
      <div className="rounded-xl border-2 border-yellow-500 bg-yellow-50 p-3">
        <div className="flex items-start gap-2 mb-1">
          <Construction className="w-5 h-5 text-yellow-700 flex-shrink-0" aria-hidden="true" />
          <SubLabel en="Heavy Machinery" kh="ម៉ាស៊ីនធុនធ្ងន់" />
        </div>
        <BilingualBlock
          en={
            <>
              The <strong>excavators</strong> and <strong>tractors</strong>{" "}
              you see digging Cambodian rice paddies do not lift dirt with
              ropes or gears — they rely <strong>entirely on hydraulic
              fluid</strong>. Watch the boom: every silver tube along the arm
              is a cylinder full of oil under pressure.
            </>
          }
          kh={
            <>
              ​<strong>ម៉ាស៊ីនជីក (អេក្សកាវ៉ាទ័រ)</strong> និង <strong>ត្រាក់​ទ័រ</strong> ​ដែល​អ្នក​ឃើញ​កំពុង​ជីក​ស្រែ​នៅ​កម្ពុជា មិន​លើក​ដី​ដោយ​ខ្សែ ​ឬ​ស្ពឺ​ដែក​ទេ — ពួកវា​ពឹង​ផ្អែក​ <strong>ទាំងស្រុង​លើ​អង្គធាតុ​រាវ​អ៊ីដ្រូលីក</strong>។ មើល​ដៃ​ម៉ាស៊ីន ៖ បំពង់​ប្រាក់​នីមួយៗ​នៅ​លើ​ដៃ ​គឺ​ជា​ស៊ីឡាំង​ពោរ​ពេញ​ដោយ​ប្រេង​ដែល​ស្ថិត​ក្រោម​សម្ពាធ​។
            </>
          }
        />
        <ExcavatorDiagram />
      </div>

      {/* Use-case 2: Car brakes */}
      <div className="rounded-xl border-2 border-red-500 bg-red-50 p-3">
        <div className="flex items-start gap-2 mb-1">
          <Disc3 className="w-5 h-5 text-red-700 flex-shrink-0" aria-hidden="true" />
          <SubLabel en="Car Brakes" kh="ហ្វ្រាំងរថយន្ត" />
        </div>
        <BilingualBlock
          en={
            <>
              When you <strong>step on a car's brake pedal</strong>, your foot
              is not directly grabbing the wheel. You are pushing fluid
              through a <strong>tiny tube</strong>. That fluid travels to the
              wheels and squeezes the <strong>brake pads against the
              spinning disc</strong>, slowing the car down.
            </>
          }
          kh={
            <>
              ​ពេល​អ្នក <strong>ជាន់​ប្រដាប់​ហ្វ្រាំង​រថយន្ត</strong> ជើង​អ្នក​មិន​បាន​ចាប់​កង់​ដោយ​ផ្ទាល់​ទេ​។ អ្នក​កំពុង​រុញ​អង្គធាតុ​រាវ​តាម​ <strong>បំពង់​តូច​មួយ</strong>។ អង្គធាតុ​រាវ​នោះ​ធ្វើ​ដំណើរ​ទៅ​ដល់​កង់ ហើយ​ច្របាច់ <strong>ភ្នាក់​ហ្វ្រាំង​ទៅ​នឹង​ឌីស​ដែល​កំពុង​វិល</strong> ​ដើម្បី​បន្ថយ​ល្បឿន​រថយន្ត​។
            </>
          }
        />
        <BrakeDiagram />
      </div>

      <div className="rounded-md bg-amber-50 border-l-4 border-l-amber-500 border border-amber-200 p-2.5 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
        <Wrench
          className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-700"
          aria-hidden="true"
        />
        <span>
          <strong>The takeaway:</strong> from the 40-tonne digger to the foot
          pedal in a Camry, the trick is the same — a small movement on one
          end pushes incompressible fluid through a sealed tube, and that
          fluid does enormous work at the other end. That's hydraulics.
          <br />
          <span className="font-khmer leading-loose">
            <strong>ខ្លឹមសារ​សំខាន់ ៖</strong> ​ចាប់​ពី​ម៉ាស៊ីន​ជីក​ទម្ងន់ ៤០ តោន​ ​រហូត​ដល់​ឆ្នុក​ហ្វ្រាំង​នៅ​ក្នុង​រថយន្ត គន្លឹះ​គឺ​ដូច​គ្នា ៖ ចលនា​តូច​មួយ​នៅ​ខាង​ម្ខាង​រុញ​អង្គធាតុ​រាវ​ដែល​មិន​អាច​បង្រួម​បាន​តាម​បំពង់​បិទ​ជិត ហើយ​អង្គធាតុ​រាវ​នោះ​ធ្វើ​ការងារ​ដ៏​ធំ​សម្បើម​នៅ​ខាង​ម្ខាង​ទៀត​។ នោះ​ជា​អ៊ីដ្រូលីក​។
          </span>
        </span>
      </div>
    </BlueprintCard>
  );
}

// SVG: stylised excavator silhouette — boom, stick, and bucket — with the
// three hydraulic cylinders highlighted in caution yellow.
function ExcavatorDiagram() {
  return (
    <div
      className="relative w-full h-36 mt-2 rounded-lg border-2 border-slate-300 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 144" className="w-full h-full">
        <text x="6" y="12" fontSize="8" fill="#0f172a" fontWeight="bold">
          Excavator · ម៉ាស៊ីនជីក (អេក្សកាវ៉ាទ័រ)
        </text>

        {/* Ground line */}
        <line x1="0" y1="124" x2="320" y2="124" stroke="#a16207" strokeWidth="1.5" />
        <rect x="0" y="124" width="320" height="20" fill="#fde68a" opacity="0.5" />

        {/* Tracks */}
        <rect x="20" y="108" width="78" height="14" rx="6" fill="#0f172a" />
        <circle cx="32" cy="115" r="5" fill="#facc15" stroke="#0f172a" strokeWidth="0.8" />
        <circle cx="86" cy="115" r="5" fill="#facc15" stroke="#0f172a" strokeWidth="0.8" />

        {/* Cab body */}
        <path
          d="M 30 108 L 30 78 L 50 60 L 90 60 L 100 78 L 100 108 Z"
          fill="#facc15"
          stroke="#0f172a"
          strokeWidth="1.4"
        />
        {/* Cab window */}
        <rect x="56" y="68" width="30" height="20" fill="#bae6fd" stroke="#0f172a" strokeWidth="0.8" />

        {/* Boom (upper arm) */}
        <line x1="100" y1="80" x2="190" y2="42" stroke="#facc15" strokeWidth="14" strokeLinecap="round" />
        <line x1="100" y1="80" x2="190" y2="42" stroke="#0f172a" strokeWidth="1.4" fill="none" strokeLinecap="round" />

        {/* Stick (forearm) */}
        <line x1="190" y1="42" x2="240" y2="92" stroke="#facc15" strokeWidth="12" strokeLinecap="round" />
        <line x1="190" y1="42" x2="240" y2="92" stroke="#0f172a" strokeWidth="1.4" fill="none" strokeLinecap="round" />

        {/* Bucket */}
        <path
          d="M 232 88 L 248 110 L 280 110 L 286 96 Z"
          fill="#475569"
          stroke="#0f172a"
          strokeWidth="1.4"
        />
        {/* Bucket teeth */}
        <path d="M 250 110 L 252 116 L 256 110 L 258 116 L 262 110 L 264 116 L 268 110 L 270 116 L 274 110 Z" fill="#0f172a" />

        {/* Hydraulic cylinder #1 — boom lift (between cab and boom) */}
        <g>
          <line x1="86" y1="92" x2="148" y2="56" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
          <line x1="86" y1="92" x2="148" y2="56" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" />
          {/* Highlight ring */}
          <circle cx="118" cy="74" r="5.5" fill="none" stroke="#dc2626" strokeWidth="1.4" strokeDasharray="2 1.5" />
        </g>
        {/* Hydraulic cylinder #2 — stick (between boom and stick) */}
        <g>
          <line x1="170" y1="38" x2="218" y2="68" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <line x1="170" y1="38" x2="218" y2="68" stroke="#facc15" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="194" cy="53" r="5" fill="none" stroke="#dc2626" strokeWidth="1.4" strokeDasharray="2 1.5" />
        </g>
        {/* Hydraulic cylinder #3 — bucket curl */}
        <g>
          <line x1="222" y1="66" x2="252" y2="92" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <line x1="222" y1="66" x2="252" y2="92" stroke="#facc15" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="237" cy="79" r="5" fill="none" stroke="#dc2626" strokeWidth="1.4" strokeDasharray="2 1.5" />
        </g>

        {/* Callout */}
        <line x1="118" y1="74" x2="160" y2="14" stroke="#dc2626" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        <text x="160" y="14" fontSize="7" fill="#b91c1c" fontWeight="bold">
          hydraulic cylinders · ស៊ីឡាំងអ៊ីដ្រូលីក
        </text>
      </svg>
    </div>
  );
}

// SVG: foot on brake pedal → tiny tube of brake fluid → caliper squeezing
// brake pads against a spinning disc.
function BrakeDiagram() {
  return (
    <div
      className="relative w-full h-36 mt-2 rounded-lg border-2 border-slate-300 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 144" className="w-full h-full">
        <text x="6" y="12" fontSize="8" fill="#0f172a" fontWeight="bold">
          Brake circuit · សៀគ្វីហ្វ្រាំង
        </text>

        {/* Floor */}
        <line x1="0" y1="128" x2="120" y2="128" stroke="#475569" strokeWidth="1.4" />

        {/* Brake pedal (lever) */}
        <line x1="22" y1="128" x2="44" y2="80" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <rect x="36" y="74" width="20" height="10" rx="2" fill="#0f172a" />
        {/* Pedal pivot */}
        <circle cx="22" cy="128" r="3" fill="#facc15" stroke="#0f172a" strokeWidth="0.8" />

        {/* Foot pressing on the pedal */}
        <path
          d="M 30 56 Q 38 50 56 52 Q 70 54 70 70 Q 70 78 58 80 L 36 80 Z"
          fill="#fbbf24"
          stroke="#0f172a"
          strokeWidth="1.2"
        />
        {/* Force-down arrow */}
        <g stroke="#dc2626" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="48" y1="32" x2="48" y2="50" />
          <path d="M 42 44 L 48 52 L 54 44" />
        </g>
        <text x="6" y="40" fontSize="8" fill="#b91c1c" fontWeight="bold">
          push
        </text>
        <text
          x="6"
          y="50"
          fontSize="6.5"
          fill="#b91c1c"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ជាន់
        </text>

        {/* Master cylinder */}
        <rect x="60" y="100" width="30" height="14" rx="2" fill="#475569" stroke="#0f172a" strokeWidth="1" />
        <text x="60" y="123" fontSize="6.5" fill="#0f172a" fontWeight="bold">
          master cyl.
        </text>
        <text
          x="60"
          y="131"
          fontSize="5.5"
          fill="#0f172a"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ស៊ីឡាំងមេ
        </text>

        {/* Tiny brake-fluid tube — bridge to the wheel */}
        <path
          d="M 90 107 L 160 107 L 160 80 L 220 80"
          stroke="#1e3a8a"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 90 107 L 160 107 L 160 80 L 220 80"
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <text x="98" y="100" fontSize="7" fill="#1e3a8a" fontWeight="bold">
          brake fluid
        </text>
        <text
          x="98"
          y="120"
          fontSize="6.5"
          fill="#1e3a8a"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ប្រេងហ្វ្រាំង
        </text>

        {/* Brake disc (rotor) */}
        <circle cx="260" cy="80" r="32" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.4" />
        <circle cx="260" cy="80" r="22" fill="#94a3b8" stroke="#0f172a" strokeWidth="0.8" />
        <circle cx="260" cy="80" r="6" fill="#0f172a" />
        {/* Spin arrow */}
        <g stroke="#0f172a" strokeWidth="1.2" fill="none" strokeLinecap="round">
          <path d="M 260 50 A 30 30 0 0 1 286 70" />
          <path d="M 282 66 L 286 70 L 282 75" />
        </g>

        {/* Caliper squeezing the disc */}
        <rect x="220" y="72" width="14" height="16" fill="#dc2626" stroke="#0f172a" strokeWidth="1" />
        <rect x="286" y="72" width="14" height="16" fill="#dc2626" stroke="#0f172a" strokeWidth="1" />
        {/* Squeeze arrows */}
        <g stroke="#dc2626" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="234" y1="80" x2="248" y2="80" />
          <path d="M 244 76 L 250 80 L 244 84" />
          <line x1="286" y1="80" x2="272" y2="80" />
          <path d="M 276 76 L 270 80 L 276 84" />
        </g>

        <text x="218" y="118" fontSize="7" fill="#b91c1c" fontWeight="bold">
          pads squeeze rotor
        </text>
        <text
          x="218"
          y="128"
          fontSize="6.5"
          fill="#b91c1c"
          fontFamily="Hanuman, 'Noto Sans Khmer', serif"
        >
          ភ្នាក់ច្របាច់ឌីស
        </text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Small bilingual key-term chip used throughout the hydraulics cards
// ════════════════════════════════════════════════════════════════════════════

function KeyTermChip({
  en,
  kh,
  tone,
}: {
  en: string;
  kh: string;
  tone: "amber" | "blue" | "red" | "slate";
}) {
  const cls =
    tone === "amber"
      ? "bg-amber-100 border-amber-500 text-amber-900"
      : tone === "blue"
        ? "bg-sky-100 border-sky-600 text-sky-900"
        : tone === "red"
          ? "bg-red-100 border-red-500 text-red-900"
          : "bg-slate-200 border-slate-500 text-slate-900";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border-2 ${cls} px-2 py-0.5`}
    >
      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider">
        {en}
      </span>
      <span className="opacity-50">·</span>
      <span className="font-khmer text-[10.5px] font-bold leading-loose">
        {kh}
      </span>
    </span>
  );
}
