import { Link } from "wouter";
import {
  ArrowLeft,
  Droplets,
  Droplet,
  ShieldCheck,
  MoveDown,
  Split,
  Cctv,
  CloudRain,
  Biohazard,
  AlertTriangle,
  Sparkles,
  Cylinder,
  Cookie,
  Waves,
  Cog,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  TECH-PLB-01 · Sewers & Plumbing: The Invisible City
//                ប្រព័ន្ធលូ និងទុយោទឹក៖ ទីក្រុងដែលមើលមិនឃើញ
//
//  Four strictly-bilingual cards in a 2×2 grid:
//   1. The P-Trap Miracle           — toxic methane + the U-bend water seal
//   2. The Gravity Engine           — 1–2 % slope, no electricity
//   3. Flood Control vs. Waste      — sanitary vs storm sewers
//   4. Cleaning the Underground     — CCTV robots + the Fatberg phenomenon
//
//  Aesthetic: subterranean — slate greys, clean water blues, and industrial
//  pipe accents (rivets, hatched soil, cyan flow indicators).
// ════════════════════════════════════════════════════════════════════════════

export function PlumbingSewersPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-100 overflow-hidden">
      <UndergroundBg />

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

      {/* Hero */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-cyan-400/60 text-cyan-200 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-md flex-wrap backdrop-blur-sm">
          <Droplets className="w-3.5 h-3.5" />
          <span>Technology · Civil Engineering</span>
          <span className="opacity-50">·</span>
          <span className="font-khmer normal-case">បច្ចេកវិទ្យា · វិស្វកម្មសំណង់</span>
          <span className="font-mono opacity-60">· TECH-PLB-01</span>
        </div>

        <h1
          data-testid="page-title"
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-2 leading-tight text-white"
        >
          Sewers & Plumbing:{" "}
          <span className="text-cyan-300">The Invisible City</span>
        </h1>
        <h2 className="font-khmer font-bold text-xl sm:text-3xl lg:text-4xl mb-5 leading-loose text-slate-200">
          ប្រព័ន្ធលូ និងទុយោទឹក៖{" "}
          <span className="text-cyan-300">ទីក្រុងដែលមើលមិនឃើញ</span>
        </h2>

        <div className="space-y-2 max-w-3xl">
          <p className="text-slate-200 text-base leading-relaxed">
            Beneath every street there is a <strong>second city</strong> made of pipes — quietly carrying clean water in, dirty water out, and rainstorms away. It runs almost entirely on <strong>physics</strong>, not motors.
          </p>
          <p className="text-slate-200 text-base font-khmer leading-loose">
            នៅ​ក្រោម​ផ្លូវ​នី​មួយ​ៗ មាន <strong>ទី​ក្រុង​ទី​ពីរ</strong> ដែល​ធ្វើ​ពី​ទុយោ — ដឹក​ទឹក​ស្អាត​ចូល បញ្ចេញ​ទឹក​កខ្វក់ និង​សម្អាត​ព្យុះ​ភ្លៀង​ចេញ​ដោយ​ស្ងៀម​ស្ងាត់។ វា​ដំណើរ​ការ​ស្ទើរ​តែ​ទាំង​ស្រុង​ដោយ <strong>រូប​វិទ្យា</strong> មិន​មែន​ដោយ​ម៉ូទ័រ​ទេ។
          </p>
        </div>
      </header>

      {/* Four cards */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PTrapCard />
          <GravityEngineCard />
          <FloodVsWasteCard />
          <CleaningUndergroundCard />
        </div>
      </section>

      {/* Closing — bilingual */}
      <footer className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="inline-block rounded-2xl border border-cyan-400/60 bg-slate-900/60 backdrop-blur-sm px-6 py-4 text-slate-100 shadow-lg max-w-2xl">
          <p className="font-serif italic">
            “The greatness of a city is measured not by its skyline — but by what flows quietly beneath its feet.”
          </p>
          <p className="font-khmer not-italic leading-loose text-slate-200 mt-1">
            «ភាព​អស្ចារ្យ​នៃ​ទី​ក្រុង​មួយ មិន​ត្រូវ​បាន​វាស់​វែង​ដោយ​អគារ​ខ្ពស់​ៗ​នោះ​ទេ — ប៉ុន្តែ​ដោយ​អ្វី​ដែល​ហូរ​ស្ងាត់​នៅ​ក្រោម​ជើង​របស់​វា។»
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PlumbingSewersPage;

// ════════════════════════════════════════════════════════════════════════════
//  Background — subterranean: slate steel + soil layer + faint pipe grid
// ════════════════════════════════════════════════════════════════════════════

function UndergroundBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0c1320 0%, #0f1a2e 30%, #0e2236 60%, #0c1a2a 100%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="plb-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22d3ee" strokeWidth="0.4" opacity="0.10" />
          </pattern>
          <pattern id="plb-coarse" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#22d3ee" strokeWidth="0.6" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plb-fine)" />
        <rect width="100%" height="100%" fill="url(#plb-coarse)" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Bilingual helpers
// ════════════════════════════════════════════════════════════════════════════

function BilingualBlock({ en, kh }: { en: React.ReactNode; kh: React.ReactNode }) {
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
      <span className="font-khmer normal-case tracking-normal text-[0.7rem]">{kh}</span>
    </div>
  );
}

function PipeCard({
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
  Icon: typeof Droplets;
  testId: string;
  paper?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      data-testid={testId}
      className="relative rounded-3xl border-2 border-cyan-400/40 shadow-2xl overflow-hidden flex flex-col text-slate-900"
      style={{ background: paper }}
    >
      {/* Steel header w/ rivets */}
      <header
        className="relative px-5 pt-5 pb-3 border-b-2 border-cyan-400/70"
        style={{
          background:
            "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        }}
      >
        {/* rivet row */}
        <div className="absolute top-1.5 left-3 right-3 flex justify-between" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500/70 border border-slate-400/40" />
          ))}
        </div>
        <div className="flex items-start gap-3 pt-2">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-300 border-2 border-cyan-200 text-slate-900 flex items-center justify-center shadow-md">
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-200/90 mb-0.5 flex flex-wrap gap-x-2">
              <span>Card · {cardNo}</span>
              <span className="opacity-50">/</span>
              <span>{topicEn}</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-90">{topicKh}</span>
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

      {/* Body — drafting paper w/ faint grid */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1 relative">
        <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id={`paper-${testId}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0c4a6e" strokeWidth="0.3" opacity="0.18" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#paper-${testId})`} />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col gap-4 flex-1">{children}</div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 — The P-Trap Miracle
// ════════════════════════════════════════════════════════════════════════════

function PTrapCard() {
  return (
    <PipeCard
      cardNo="01"
      topicEn="Water Seal"
      topicKh="ឧបករណ៍បិទដោយទឹក"
      titleEn="The P-Trap Miracle"
      titleKh="អព្ភូតហេតុនៃបំពង់រាងអក្សរ U"
      Icon={ShieldCheck}
      testId="card-p-trap"
      paper="#f0f9ff"
    >
      {/* The problem */}
      <div className="rounded-xl border-2 border-rose-700 bg-rose-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Biohazard className="w-5 h-5 text-rose-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-rose-900">The Problem</div>
            <div className="font-khmer text-base text-rose-900 leading-loose">បញ្ហា</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              Sewers are full of <strong>toxic, explosive, and terrible-smelling methane gas</strong>. So why doesn't that gas come up through our <strong>toilets</strong> and <strong>sinks</strong>?
            </>
          }
          kh={
            <>
              ប្រព័ន្ធ​លូ​ពេញ​ទៅ​ដោយ <strong>ឧស្ម័ន​មេតាន​ដែល​មាន​ជាតិ​ពុល ផ្ទុះ​បាន និង​មាន​ក្លិន​ស្អុយ​ខ្លាំង</strong>។ ដូច្នេះ ហេតុ​អ្វី​បាន​ជា​ឧស្ម័ន​នោះ​មិន​ហួត​ឡើង​មក​តាម <strong>បង្គន់</strong> និង <strong>ទឹក​លាង​មុខ​ដៃ</strong> របស់​យើង?
            </>
          }
        />
      </div>

      {/* P-Trap diagram */}
      <PTrapDiagram />

      {/* The solution */}
      <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <ShieldCheck className="w-5 h-5 text-emerald-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-emerald-900">The Solution · The P-Trap</div>
            <div className="font-khmer text-base text-emerald-900 leading-loose">ដំណោះស្រាយ · បំពង់ U</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              Every drain has a <strong>curved pipe</strong> underneath it (the <strong>P-Trap</strong> or <strong>U-bend</strong>). After water drains, a small pool of <strong>clean water gets trapped</strong> in the curve.
            </>
          }
          kh={
            <>
              ប្រឡាយ​ទឹក​នី​មួយ​ៗ​មាន <strong>បំពង់​កោង</strong> នៅ​ក្រោម (បំពង់ <strong>P-Trap</strong> ឬ​បំពង់​រាង <strong>អក្សរ U</strong>)។ ក្រោយ​ពេល​ទឹក​ហូរ​អស់ ទឹក​ស្អាត​បន្តិច <strong>ត្រូវ​បាន​ជាប់​ឃុំ</strong> នៅ​ក្នុង​ផ្នែក​កោង​នោះ។
            </>
          }
        />
      </div>

      <BilingualBlock
        en={
          <>
            That tiny puddle acts as an <strong>impenetrable physical shield</strong>, completely <strong>blocking the invisible sewer gas</strong> from entering the house.
          </>
        }
        kh={
          <>
            ទឹក​បន្តិច​បន្តួច​នោះ​ដើរ​តួ​ជា <strong>ខែល​រូប​សាស្ត្រ​ដែល​ជ្រាប​មិន​ចូល</strong> ដោយ <strong>បាំង​ឧស្ម័ន​លូ​ដែល​មើល​មិន​ឃើញ</strong> ទាំង​ស្រុង​មិន​ឲ្យ​ចូល​ផ្ទះ​បាន។
          </>
        }
      />
    </PipeCard>
  );
}

// SVG: a sink with a P-Trap, showing the trapped water seal blocking gas
function PTrapDiagram() {
  return (
    <div
      className="relative w-full h-44 rounded-lg border-2 border-cyan-300 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 176" className="w-full h-full">
        {/* Sink basin */}
        <path
          d="M 60 14 L 200 14 L 195 36 L 65 36 Z"
          fill="#cbd5e1"
          stroke="#334155"
          strokeWidth="1.2"
        />
        {/* Tap */}
        <rect x="118" y="2" width="6" height="14" fill="#475569" />
        <rect x="116" y="0" width="14" height="4" fill="#475569" />
        <text x="220" y="20" fontSize="8" fontWeight="bold" fill="#334155">SINK</text>
        <text x="220" y="32" fontSize="7" fill="#334155" fontFamily="Khmer OS, Hanuman, sans-serif">ស៊ីង</text>

        {/* Drain stem */}
        <rect x="124" y="36" width="14" height="40" fill="#94a3b8" stroke="#334155" strokeWidth="1" />

        {/* P-Trap (U-bend) */}
        <path
          d="M 124 76 L 124 110 Q 124 130 144 130 L 188 130 Q 208 130 208 110 L 208 96 L 222 96 L 222 76"
          fill="none"
          stroke="#475569"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Inner pipe wall (lighter) */}
        <path
          d="M 124 76 L 124 110 Q 124 130 144 130 L 188 130 Q 208 130 208 110 L 208 96 L 222 96 L 222 76"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Trapped water inside the U */}
        <path
          d="M 124 110 Q 124 130 144 130 L 188 130 Q 208 130 208 110 L 208 116 Q 208 136 188 136 L 144 136 Q 124 136 124 116 Z"
          fill="#0ea5e9"
          opacity="0.85"
        />
        {/* Water surface ripple */}
        <path d="M 124 110 Q 132 108 140 110 T 156 110 T 172 110 T 188 110 T 208 110" stroke="#0369a1" strokeWidth="0.8" fill="none" opacity="0.7" />

        {/* Label for water seal */}
        <text x="166" y="148" fontSize="8" fontWeight="bold" fill="#0369a1" textAnchor="middle">WATER SEAL</text>
        <text x="166" y="158" fontSize="7" fill="#0369a1" textAnchor="middle" fontFamily="Khmer OS, Hanuman, sans-serif">បាំងដោយទឹក</text>

        {/* Sewer pipe to right */}
        <rect x="222" y="68" width="78" height="14" fill="#475569" />
        <rect x="222" y="70" width="78" height="10" fill="#1e293b" />
        <text x="240" y="64" fontSize="8" fontWeight="bold" fill="#334155">TO SEWER · ទៅលូ</text>

        {/* Methane gas arrows from sewer trying to enter, blocked by water */}
        {[260, 280].map((x, i) => (
          <g key={i}>
            <text x={x - 4} y={62} fontSize="10" fill="#84cc16" fontWeight="bold">☁</text>
            <line x1={x} y1={68} x2={x} y2={56} stroke="#84cc16" strokeWidth="1.4" markerEnd="url(#arr-up-gas)" />
          </g>
        ))}
        {/* Big BLOCKED stamp */}
        <g transform="translate(232, 96)">
          <rect x="-2" y="-10" width="60" height="14" fill="#fee2e2" stroke="#b91c1c" strokeWidth="1.2" rx="2" />
          <text x="28" y="0" fontSize="8" fontWeight="bold" fill="#991b1b" textAnchor="middle">BLOCKED ✕</text>
          <text x="28" y="20" fontSize="7" fill="#991b1b" textAnchor="middle" fontFamily="Khmer OS, Hanuman, sans-serif">ត្រូវបានបាំង</text>
        </g>

        {/* Methane label */}
        <text x="6" y="14" fontSize="8" fontWeight="bold" fill="#65a30d">METHANE · មេតាន</text>

        <defs>
          <marker id="arr-up-gas" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,10 L5,0 L10,10 Z" fill="#84cc16" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 — The Gravity Engine
// ════════════════════════════════════════════════════════════════════════════

function GravityEngineCard() {
  return (
    <PipeCard
      cardNo="02"
      topicEn="No Motors Needed"
      topicKh="មិនត្រូវការម៉ូទ័រ"
      titleEn="The Gravity Engine"
      titleKh="ម៉ាស៊ីនទំនាញផែនដី"
      Icon={MoveDown}
      testId="card-gravity"
      paper="#fbf7ed"
    >
      <BilingualBlock
        en={
          <>
            Most sewer systems use <strong>no electricity</strong> and <strong>no motors</strong> to move waste. They rely <strong>entirely on gravity</strong>.
          </>
        }
        kh={
          <>
            ប្រព័ន្ធ​លូ​ភាគ​ច្រើន <strong>មិន​ប្រើ​អគ្គិសនី</strong> និង <strong>មិន​ប្រើ​ម៉ូទ័រ</strong> ដើម្បី​បញ្ជូន​កាក​សំណល់​ឡើយ។ វា​ពឹង​ផ្អែក <strong>ទាំង​ស្រុង​លើ​ទំនាញ​ផែនដី</strong>។
          </>
        }
      />

      {/* The Goldilocks slope */}
      <div className="rounded-xl border-2 border-amber-500 bg-amber-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Cog className="w-5 h-5 text-amber-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-amber-900">The Engineer's Slope</div>
            <div className="font-khmer text-base text-amber-900 leading-loose">ជម្រាល​សម្រាប់​វិស្វករ</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              Engineers build pipes at a <strong>very specific gentle slope</strong> — about <strong>1 to 2 percent</strong>.
            </>
          }
          kh={
            <>
              វិស្វករ​សង់​ទុយោ​ដោយ​មាន <strong>ជម្រាល​ដ៏​ទន់​ភ្លន់​ច្បាស់​លាស់</strong> — ប្រហែល <strong>១ ទៅ ២ ភាគ​រយ</strong>។
            </>
          }
        />
        <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-white border-2 border-amber-500 px-3 py-1.5">
          <span className="font-display font-extrabold text-2xl text-amber-700 leading-none">1–2 %</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-amber-900">Slope</span>
          <span className="font-khmer text-[10px] text-amber-900">ជម្រាល</span>
        </div>
      </div>

      {/* Three-state slope diagram */}
      <SlopeDiagram />

      {/* Goldilocks trio */}
      <div className="grid grid-cols-3 gap-2">
        <SlopeTile
          tone="rose"
          icon="🟦"
          headerEn="Too Flat"
          headerKh="ផ្ទាំងពេក"
          en={
            <>
              Waste <strong>stops moving</strong>.
            </>
          }
          kh={
            <>
              កាក​សំណល់ <strong>ឈប់​ផ្លាស់ទី</strong>។
            </>
          }
        />
        <SlopeTile
          tone="emerald"
          icon="✅"
          headerEn="Just Right"
          headerKh="ត្រឹមត្រូវ"
          en={
            <>
              Water <strong>and</strong> solids flow together.
            </>
          }
          kh={
            <>
              ទឹក <strong>និង</strong> កាក​សំណល់​ហូរ​ជាមួយ​គ្នា។
            </>
          }
        />
        <SlopeTile
          tone="rose"
          icon="⚠"
          headerEn="Too Steep"
          headerKh="ចោតពេក"
          en={
            <>
              Water <strong>races away</strong>, leaving solids <strong>behind</strong>.
            </>
          }
          kh={
            <>
              ទឹក <strong>រត់​ឆ្ងាយ​អស់</strong> ទុក​កាក​សំណល់ <strong>នៅ​ក្រោយ</strong>។
            </>
          }
        />
      </div>
    </PipeCard>
  );
}

function SlopeTile({
  tone,
  icon,
  headerEn,
  headerKh,
  en,
  kh,
}: {
  tone: "rose" | "emerald";
  icon: string;
  headerEn: string;
  headerKh: string;
  en: React.ReactNode;
  kh: React.ReactNode;
}) {
  const cls =
    tone === "rose"
      ? "border-rose-500 bg-rose-50 text-rose-900"
      : "border-emerald-600 bg-emerald-50 text-emerald-900";
  return (
    <div className={`rounded-lg border-2 ${cls} p-2 flex flex-col gap-1`}>
      <div className="text-lg leading-none">{icon}</div>
      <div className="font-bold text-xs leading-tight">{headerEn}</div>
      <div className="font-khmer text-xs leading-loose">{headerKh}</div>
      <div className="text-[11px] leading-snug text-slate-700">{en}</div>
      <div className="text-[11px] font-khmer leading-loose text-slate-700">{kh}</div>
    </div>
  );
}

// SVG: three pipes at different slopes — too flat, just right, too steep
function SlopeDiagram() {
  return (
    <div
      className="relative w-full h-36 rounded-lg border-2 border-slate-300 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 144" className="w-full h-full">
        {/* THREE rows: too flat / just right / too steep */}
        {[
          { y: 26, slope: 0, label: "0 %", colour: "#dc2626", flow: false },
          { y: 70, slope: 8, label: "1–2 %", colour: "#16a34a", flow: true },
          { y: 116, slope: 28, label: "10 %", colour: "#dc2626", flow: false },
        ].map((row, i) => {
          const x1 = 60;
          const x2 = 280;
          const y1 = row.y;
          const y2 = row.y + row.slope;
          return (
            <g key={i}>
              {/* Pipe outer */}
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="14" strokeLinecap="round" />
              {/* Pipe inner */}
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth="9" strokeLinecap="round" />
              {/* Water (a thin band) */}
              <line x1={x1 + 4} y1={y1 + 1} x2={x2 - 4} y2={y2 + 1} stroke="#0ea5e9" strokeWidth="3" opacity="0.8" />
              {/* Solid waste markers */}
              {row.slope === 0 && (
                <>
                  <circle cx="120" cy={y1} r="3" fill="#92400e" />
                  <circle cx="170" cy={y1} r="3" fill="#92400e" />
                  <circle cx="220" cy={y1} r="3" fill="#92400e" />
                </>
              )}
              {row.slope > 20 && (
                <>
                  <circle cx="80" cy={y1 + 4} r="3" fill="#92400e" />
                  <circle cx="100" cy={y1 + 6} r="3" fill="#92400e" />
                </>
              )}
              {row.slope > 0 && row.slope <= 10 && (
                <>
                  <circle cx="180" cy={y1 + 5} r="3" fill="#92400e" />
                  <circle cx="220" cy={y1 + 7} r="3" fill="#92400e" />
                </>
              )}
              {/* Slope label */}
              <text x="6" y={y1 + 4} fontSize="10" fontWeight="bold" fill={row.colour} fontFamily="ui-monospace, monospace">
                {row.label}
              </text>
              {/* Status label */}
              {row.flow ? (
                <text x={x2 + 4} y={y2 + 4} fontSize="9" fontWeight="bold" fill="#15803d">FLOW · ហូរ →</text>
              ) : (
                <text x={x2 + 4} y={y2 + 4} fontSize="9" fontWeight="bold" fill="#dc2626">FAIL · បរាជ័យ ✕</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 — Flood Control vs. Waste
// ════════════════════════════════════════════════════════════════════════════

function FloodVsWasteCard() {
  return (
    <PipeCard
      cardNo="03"
      topicEn="Two Networks"
      topicKh="ប្រព័ន្ធពីរ"
      titleEn="Flood Control vs. Waste"
      titleKh="ការគ្រប់គ្រងទឹកជំនន់ ទល់នឹង កាកសំណល់"
      Icon={Split}
      testId="card-flood-vs-waste"
      paper="#f8fafc"
    >
      <BilingualBlock
        en={
          <>
            Modern cities run <strong>two completely separate</strong> underground networks.
          </>
        }
        kh={
          <>
            ទី​ក្រុង​ទំនើប​ដំណើរ​ការ​បណ្ដាញ​ក្រោម​ដី​ <strong>ពីរ​ដាច់​ដោយ​ឡែក​ពី​គ្នា</strong>។
          </>
        }
      />

      <SewerNetworkDiagram />

      {/* Sanitary sewer */}
      <div className="rounded-xl border-2 border-rose-600 bg-rose-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Biohazard className="w-5 h-5 text-rose-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-rose-900">Sanitary Sewers</div>
            <div className="font-khmer text-base text-rose-900 leading-loose">លូកាកសំណល់</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              Carry <strong>human waste</strong> from toilets and sinks to a <strong>treatment plant</strong> where it is cleaned before going back to nature.
            </>
          }
          kh={
            <>
              ដឹក​នាំ <strong>កាក​សំណល់​មនុស្ស</strong> ពី​បង្គន់ និង​ស៊ីង​ទៅ​កាន់ <strong>រោង​ចក្រ​សម្អាត​ទឹក​កខ្វក់</strong> ដែល​នៅ​ទី​នោះ​វា​ត្រូវ​បាន​សម្អាត​មុន​ពេល​បញ្ជូន​ត្រឡប់​ទៅ​ធម្មជាតិ​វិញ។
            </>
          }
        />
      </div>

      {/* Storm drain */}
      <div className="rounded-xl border-2 border-blue-600 bg-blue-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <CloudRain className="w-5 h-5 text-blue-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-blue-900">Storm Drains</div>
            <div className="font-khmer text-base text-blue-900 leading-loose">លូទឹកភ្លៀង</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              Carry <strong>rainwater</strong> from the streets <strong>directly</strong> to a river or the ocean — usually <strong>without treatment</strong>.
            </>
          }
          kh={
            <>
              ដឹក <strong>ទឹក​ភ្លៀង</strong> ពី​ផ្លូវ​ទៅ​ <strong>ដោយ​ផ្ទាល់</strong> កាន់​ទន្លេ ឬ​មហា​សមុទ្រ — ជា​ធម្មតា <strong>ដោយ​មិន​ឆ្លង​កាត់​ការ​សម្អាត</strong>។
            </>
          }
        />
      </div>

      <div className="rounded-md bg-amber-50 border-l-4 border-l-amber-500 border border-amber-200 p-2.5 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-700" aria-hidden="true" />
        <span>
          <strong>Why keep them separate?</strong> If they were combined, a heavy <strong>monsoon rain</strong> would overflow the treatment plant and flood the streets with <strong>raw sewage</strong>.
          <br />
          <span className="font-khmer leading-loose">
            <strong>ហេតុ​អ្វី​ត្រូវ​បំបែក​វា ?</strong> បើ​វា​ត្រូវ​បាន​បញ្ចូល​គ្នា ភ្លៀង <strong>រដូវ​វស្សា​ខ្លាំង</strong> នឹង​ហូរ​លើស​សមត្ថភាព​រោង​ចក្រ​សម្អាត ហើយ​ធ្វើ​ឲ្យ​ផ្លូវ​ត្រូវ​លិច​ដោយ <strong>ទឹក​លូ​មិន​ទាន់​សម្អាត</strong>។
          </span>
        </span>
      </div>
    </PipeCard>
  );
}

// SVG: side-by-side parallel pipes — one to treatment plant, one to river
function SewerNetworkDiagram() {
  return (
    <div
      className="relative w-full h-44 rounded-lg border-2 border-slate-300 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 176" className="w-full h-full">
        {/* House */}
        <g transform="translate(20, 40)">
          <polygon points="20,0 0,18 40,18" fill="#92400e" />
          <rect x="4" y="18" width="32" height="22" fill="#fbbf24" stroke="#92400e" strokeWidth="0.8" />
          <rect x="14" y="26" width="12" height="14" fill="#78350f" />
          <text x="20" y="52" fontSize="7" fontWeight="bold" fill="#334155" textAnchor="middle">HOUSE</text>
          <text x="20" y="60" fontSize="7" fill="#334155" textAnchor="middle" fontFamily="Khmer OS, Hanuman, sans-serif">ផ្ទះ</text>
        </g>

        {/* Storm drain grate (street level) */}
        <g transform="translate(80, 50)">
          <rect x="0" y="0" width="22" height="3" fill="#475569" />
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={i} x1={3 + i * 4} y1="0" x2={3 + i * 4} y2="3" stroke="#0f172a" strokeWidth="0.6" />
          ))}
          <text x="11" y="14" fontSize="6" fontWeight="bold" fill="#334155" textAnchor="middle">STORM DRAIN</text>
          <text x="11" y="22" fontSize="6" fill="#334155" textAnchor="middle" fontFamily="Khmer OS, Hanuman, sans-serif">លូទឹកភ្លៀង</text>
        </g>

        {/* Underground pipes */}
        {/* Sanitary (top - rose) */}
        <line x1="20" y1="92" x2="240" y2="92" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
        <line x1="20" y1="92" x2="240" y2="92" stroke="#fda4af" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
        {/* drop from house */}
        <line x1="40" y1="80" x2="40" y2="92" stroke="#475569" strokeWidth="6" />
        <text x="22" y="86" fontSize="7" fontWeight="bold" fill="#9f1239">SANITARY · កាកសំណល់</text>

        {/* Storm (bottom - blue) */}
        <line x1="80" y1="124" x2="240" y2="124" stroke="#475569" strokeWidth="12" strokeLinecap="round" />
        <line x1="80" y1="124" x2="240" y2="124" stroke="#7dd3fc" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
        <line x1="91" y1="58" x2="91" y2="124" stroke="#475569" strokeWidth="6" />
        <text x="100" y="118" fontSize="7" fontWeight="bold" fill="#1d4ed8">STORM · ទឹកភ្លៀង</text>

        {/* Treatment plant on right */}
        <g transform="translate(244, 76)">
          <rect x="0" y="0" width="56" height="32" fill="#cbd5e1" stroke="#334155" strokeWidth="1" />
          <rect x="6" y="6" width="14" height="20" fill="#0ea5e9" />
          <rect x="22" y="6" width="14" height="20" fill="#0ea5e9" />
          <rect x="38" y="6" width="14" height="20" fill="#0ea5e9" />
          <text x="28" y="44" fontSize="7" fontWeight="bold" fill="#334155" textAnchor="middle">TREATMENT</text>
          <text x="28" y="52" fontSize="7" fill="#334155" textAnchor="middle" fontFamily="Khmer OS, Hanuman, sans-serif">សម្អាត</text>
        </g>

        {/* River on far right */}
        <g transform="translate(244, 116)">
          <rect x="0" y="0" width="56" height="22" fill="#bae6fd" />
          <path d="M 0 8 Q 14 5 28 8 T 56 8" stroke="#0284c7" strokeWidth="0.8" fill="none" />
          <path d="M 0 14 Q 14 11 28 14 T 56 14" stroke="#0284c7" strokeWidth="0.8" fill="none" />
          <text x="28" y="36" fontSize="7" fontWeight="bold" fill="#0c4a6e" textAnchor="middle">RIVER</text>
          <text x="28" y="44" fontSize="7" fill="#0c4a6e" textAnchor="middle" fontFamily="Khmer OS, Hanuman, sans-serif">ទន្លេ</text>
        </g>

        {/* Hatched soil — top dirt layer */}
        <line x1="0" y1="68" x2="320" y2="68" stroke="#78350f" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="2" y="76" fontSize="6" fill="#78350f" fontFamily="ui-monospace, monospace">SURFACE · ផ្ទៃដី</text>

        <defs>
          <marker id="arr-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 Z" fill="#0f172a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 4 — Cleaning the Underground
// ════════════════════════════════════════════════════════════════════════════

function CleaningUndergroundCard() {
  return (
    <PipeCard
      cardNo="04"
      topicEn="Maintenance & Failure"
      topicKh="ការថែទាំ និងការបរាជ័យ"
      titleEn="Cleaning the Underground"
      titleKh="ការសម្អាតក្រោមដី"
      Icon={Cctv}
      testId="card-cleaning-underground"
      paper="#fef2f2"
    >
      <BilingualBlock
        en={
          <>
            How do cities <strong>maintain</strong> these massive networks of pipes that humans <strong>can't fit inside</strong>?
          </>
        }
        kh={
          <>
            តើ​ទី​ក្រុង <strong>ថែ​ទាំ</strong> បណ្ដាញ​ទុយោ​ដ៏​ធំ​ដែល​មនុស្ស <strong>មិន​អាច​ចូល​បាន</strong> ដោយ​របៀប​ណា ?
          </>
        }
      />

      {/* Pipe inspection robot */}
      <div className="rounded-xl border-2 border-cyan-600 bg-cyan-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Cctv className="w-5 h-5 text-cyan-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-cyan-900">CCTV Pipe Robots</div>
            <div className="font-khmer text-base text-cyan-900 leading-loose">រ៉ូបូត​មាន​កាមេរ៉ា​ត្រួត​ពិនិត្យ​ទុយោ</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              Engineers send in <strong>high-tech remote-controlled robots</strong> with <strong>cameras</strong> to crawl through the pipes and inspect for <strong>cracks</strong>, <strong>leaks</strong>, and <strong>blockages</strong>.
            </>
          }
          kh={
            <>
              វិស្វករ​បញ្ជូន​ <strong>រ៉ូបូត​បច្ចេក​វិទ្យា​ខ្ពស់​បញ្ជា​ពី​ចម្ងាយ</strong> ដែល​មាន <strong>កាមេរ៉ា</strong> ឲ្យ​វា​វារ​តាម​ទុយោ​ដើម្បី​ត្រួត​ពិនិត្យ​រក <strong>ប្រេះ</strong> <strong>កន្លែង​លេច</strong> និង <strong>ការ​ស្ទះ</strong>។
            </>
          }
        />
        <PipeRobotDiagram />
      </div>

      {/* Fatberg */}
      <div className="rounded-xl border-2 border-rose-700 bg-rose-100 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Cookie className="w-5 h-5 text-rose-800" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-rose-900">The Fatberg Phenomenon</div>
            <div className="font-khmer text-base text-rose-900 leading-loose">បាតុភូត Fatberg (កំពូលខ្លាញ់)</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              A <strong>“Fatberg”</strong> is a <strong>massive, rock-hard blockage</strong> caused when people pour <strong>cooking oil</strong> down the sink and flush <strong>wet wipes</strong> down the toilet.
            </>
          }
          kh={
            <>
              <strong>«Fatberg»</strong> គឺ​ជា <strong>ការ​ស្ទះ​ដ៏​ធំ​មហិមា​រឹង​ដូច​ថ្ម</strong> ដែល​បង្ក​ឡើង​ដោយ​មនុស្ស​ចាក់ <strong>ប្រេង​ចម្អិន​អាហារ</strong> ចូល​ក្នុង​ស៊ីង និង​ច្រូច​ <strong>ក្រដាស់​ជូត​សើម</strong> ក្នុង​បង្គន់។
            </>
          }
        />
        <FatbergDiagram />
      </div>

      <div className="rounded-md border-l-4 border-l-emerald-600 bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-700" aria-hidden="true" />
        <span>
          <strong>The fix:</strong> crews destroy fatbergs with <strong>high-pressure water jets</strong>. The biggest one in London weighed <strong>130 tonnes</strong> — heavier than 11 city buses.
          <br />
          <span className="font-khmer leading-loose">
            <strong>ដំណោះស្រាយ ៖</strong> ក្រុម​ការ​ងារ​បំផ្លាញ Fatberg ដោយ​ <strong>បាញ់​ទឹក​សម្ពាធ​ខ្ពស់</strong>។ ដុំ​ធំ​ជាង​គេ​នៅ​ទី​ក្រុង​ឡុង​ដ៍​មាន​ទម្ងន់ <strong>១៣០ តោន</strong> — ធ្ងន់​ជាង​រថយន្ត​ក្រុង ១១ គ្រឿង។
          </span>
        </span>
      </div>
    </PipeCard>
  );
}

// SVG: a CCTV robot crawling inside a pipe
function PipeRobotDiagram() {
  return (
    <div
      className="mt-2 relative w-full h-28 rounded-md bg-white border border-cyan-300 overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 112" className="w-full h-full">
        {/* Pipe — outer & inner */}
        <line x1="10" y1="56" x2="310" y2="56" stroke="#475569" strokeWidth="56" strokeLinecap="round" />
        <line x1="10" y1="56" x2="310" y2="56" stroke="#cbd5e1" strokeWidth="40" strokeLinecap="round" />

        {/* Robot body */}
        <g transform="translate(140, 60)">
          {/* chassis */}
          <rect x="0" y="-8" width="40" height="16" rx="3" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
          {/* wheels */}
          <circle cx="6" cy="10" r="4" fill="#0f172a" />
          <circle cx="20" cy="10" r="4" fill="#0f172a" />
          <circle cx="34" cy="10" r="4" fill="#0f172a" />
          {/* camera lens */}
          <circle cx="38" cy="-2" r="3" fill="#0ea5e9" stroke="#0c4a6e" strokeWidth="0.8" />
          {/* light cone */}
          <polygon points="40,-2 64,-12 64,8" fill="#fef08a" opacity="0.7" />
          {/* tether cable */}
          <path d="M 0 0 Q -40 -10 -100 4" stroke="#0f172a" strokeWidth="1.4" fill="none" />
          <text x="-100" y="-2" fontSize="7" fontWeight="bold" fill="#0f172a">CABLE</text>
          <text x="-100" y="20" fontSize="7" fill="#0f172a" fontFamily="Khmer OS, Hanuman, sans-serif">ខ្សែ</text>
        </g>

        {/* Crack found */}
        <line x1="240" y1="34" x2="252" y2="46" stroke="#dc2626" strokeWidth="1.6" />
        <line x1="246" y1="32" x2="256" y2="40" stroke="#dc2626" strokeWidth="1.2" />
        <text x="248" y="26" fontSize="7" fontWeight="bold" fill="#dc2626" textAnchor="middle">CRACK</text>
        <text x="248" y="92" fontSize="7" fill="#dc2626" textAnchor="middle" fontFamily="Khmer OS, Hanuman, sans-serif">ប្រេះ</text>

        {/* Labels */}
        <text x="6" y="14" fontSize="8" fontWeight="bold" fill="#0f172a">CCTV ROBOT · រ៉ូបូតកាមេរ៉ា</text>
      </svg>
    </div>
  );
}

// SVG: a fatberg blocking a pipe + high-pressure water jet
function FatbergDiagram() {
  return (
    <div
      className="mt-2 relative w-full h-28 rounded-md bg-white border border-rose-300 overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 112" className="w-full h-full">
        {/* Pipe */}
        <line x1="10" y1="56" x2="310" y2="56" stroke="#475569" strokeWidth="56" strokeLinecap="round" />
        <line x1="10" y1="56" x2="310" y2="56" stroke="#cbd5e1" strokeWidth="40" strokeLinecap="round" />

        {/* Fatberg blob */}
        <g transform="translate(180, 56)">
          <ellipse cx="0" cy="0" rx="40" ry="18" fill="#facc15" stroke="#78350f" strokeWidth="1.4" />
          <ellipse cx="-12" cy="-4" rx="14" ry="8" fill="#fde047" opacity="0.8" />
          <ellipse cx="14" cy="3" rx="10" ry="6" fill="#a16207" opacity="0.6" />
          <text x="0" y="3" fontSize="9" fontWeight="bold" fill="#78350f" textAnchor="middle">FATBERG</text>
          <text x="0" y="34" fontSize="7" fill="#78350f" textAnchor="middle" fontFamily="Khmer OS, Hanuman, sans-serif">កំពូលខ្លាញ់</text>
        </g>

        {/* High-pressure water jet from the left */}
        <g>
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={20 + i * 12}
              y1={50 + (i % 2 === 0 ? -2 : 2)}
              x2={36 + i * 12}
              y2={50 + (i % 2 === 0 ? -1 : 3)}
              stroke="#0ea5e9"
              strokeWidth="1.8"
            />
          ))}
          <text x="6" y="14" fontSize="8" fontWeight="bold" fill="#0c4a6e">WATER JET · បាញ់ទឹកសម្ពាធខ្ពស់</text>
        </g>
      </svg>
    </div>
  );
}
