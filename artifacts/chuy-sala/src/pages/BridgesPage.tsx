import { Link } from "wouter";
import {
  ArrowLeft,
  Construction,
  Landmark,
  Cable,
  Trophy,
  AlertTriangle,
  Wind,
  Mountain,
  Train,
  Anchor,
  Activity,
  Sparkles,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  TECH-BRG-01 · Bridges: Defying Gravity
//                ស្ពាន៖ ការប្រឆាំងនឹងទំនាញផែនដី
//
//  Four strictly-bilingual cards (BOTH EN + KH always rendered):
//   1. The Ancient Arch          — Compression / Romans / Angkor + arch SVG
//   2. Modern Steel & Cables     — Tension / Cable-stayed (Tsubasa) +
//                                   Suspension SVGs
//   3. The Global Giants         — Danyang–Kunshan (164 km) + Millau (343 m)
//   4. When Bridges Fail         — Tacoma Narrows + Resonance + 64 km/h wind
//
//  Aesthetic: structural/blueprint — slate steels, concrete greys, and sky
//  blues, with a faint cyan blueprint grid in the background.
// ════════════════════════════════════════════════════════════════════════════

export function BridgesPage() {
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
          <span>Technology · Civil Engineering</span>
          <span className="opacity-50">·</span>
          <span className="font-khmer normal-case">បច្ចេកវិទ្យា · វិស្វកម្មសំណង់</span>
          <span className="font-mono opacity-60">· TECH-BRG-01</span>
        </div>

        <h1
          data-testid="page-title"
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-2 leading-tight text-white"
        >
          Bridges:{" "}
          <span className="text-cyan-300">Defying Gravity</span>
        </h1>
        <h2 className="font-khmer font-bold text-xl sm:text-3xl lg:text-4xl mb-5 leading-loose text-slate-200">
          ស្ពាន៖{" "}
          <span className="text-cyan-300">ការប្រឆាំងនឹងទំនាញផែនដី</span>
        </h2>

        <div className="space-y-2 max-w-3xl">
          <p className="text-slate-200 text-base leading-relaxed">
            For 2,000 years, humans have used clever physics — squeezing stone, pulling steel, and shaping curves — to throw a road across a river or a valley.
          </p>
          <p className="text-slate-200 text-base font-khmer leading-loose">
            អស់រយៈពេល ២,០០០ ឆ្នាំមកហើយ មនុស្សជាតិបានប្រើរូបវិទ្យាដ៏ឆ្លាតវៃ — ដោយសង្កត់ថ្ម ទាញដែក និងបង្កើតរូបរាងកោង — ដើម្បីបោះផ្លូវឆ្លងកាត់ទន្លេ ឬជ្រលងភ្នំ។
          </p>
        </div>
      </header>

      {/* Four cards */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AncientArchCard />
          <ModernCablesCard />
          <GlobalGiantsCard />
          <BridgeFailuresCard />
        </div>
      </section>

      {/* Closing — bilingual */}
      <footer className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="inline-block rounded-2xl border border-cyan-400/60 bg-slate-900/60 backdrop-blur-sm px-6 py-4 text-slate-100 shadow-lg">
          <p className="font-serif italic">
            “Every bridge is a frozen argument with gravity — and gravity always loses, until it doesn't.”
          </p>
          <p className="font-khmer not-italic leading-loose text-slate-200 mt-1">
            «ស្ពាន​នីមួយៗ​គឺ​ជា​ការ​តស៊ូ​ដ៏​អសកម្ម​ជាមួយ​នឹង​ទំនាញ​ផែនដី — ហើយ​ទំនាញ​ផែនដី​តែង​តែ​ចាញ់ រហូត​ដល់​ពេល​វា​ឈ្នះ។»
          </p>
        </div>
      </footer>
    </div>
  );
}

export default BridgesPage;

// ════════════════════════════════════════════════════════════════════════════
//  Background — slate steel with a faint cyan blueprint grid
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
      {/* Blueprint grid */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="bp-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22d3ee" strokeWidth="0.4" opacity="0.10" />
          </pattern>
          <pattern id="bp-coarse" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#22d3ee" strokeWidth="0.6" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-fine)" />
        <rect width="100%" height="100%" fill="url(#bp-coarse)" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Bilingual helpers — always render BOTH languages
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

// Shared card shell — drafting-paper body w/ steel-blue header
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
  Icon: typeof Landmark;
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
      {/* Steel header */}
      <header
        className="px-5 pt-5 pb-3 border-b-2 border-cyan-400/70"
        style={{
          background:
            "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        }}
      >
        <div className="flex items-start gap-3">
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

      {/* Body — drafting paper */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1 relative">
        {/* faint blueprint grid on body */}
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

// Force chip — shared visual for COMPRESSION / TENSION callouts
function ForceChip({
  kind,
  en,
  kh,
}: {
  kind: "compression" | "tension";
  en: string;
  kh: string;
}) {
  const isComp = kind === "compression";
  const cls = isComp
    ? "bg-rose-100 border-rose-500 text-rose-900"
    : "bg-emerald-100 border-emerald-600 text-emerald-900";
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-md border-2 ${cls} px-2 py-1`}>
      <span className="font-display font-extrabold text-base leading-none">
        {isComp ? "→ ←" : "← →"}
      </span>
      <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
        {en}
      </span>
      <span className="font-khmer text-[11px] font-bold leading-loose">· {kh}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 — The Ancient Arch
// ════════════════════════════════════════════════════════════════════════════

function AncientArchCard() {
  return (
    <BlueprintCard
      cardNo="01"
      topicEn="Compression"
      topicKh="កម្លាំងសង្កត់"
      titleEn="The Ancient Arch"
      titleKh="ស្ពានរាងធ្នូសម័យបុរាណ"
      Icon={Landmark}
      testId="card-ancient-arch"
      paper="#fbf7ed"
    >
      <BilingualBlock
        en={
          <>
            Ancient builders — like the <strong>Romans</strong> or the builders of <strong>Angkor</strong> — used <strong>stone</strong>.
          </>
        }
        kh={
          <>
            អ្នកសង់សម័យបុរាណ — ដូចជា <strong>ជនជាតិរ៉ូម៉ាំង</strong> ឬ​អ្នក​សង់​អង្គរ — បានប្រើ <strong>ថ្ម</strong>។
          </>
        }
      />

      {/* Force callout */}
      <div className="rounded-xl border-2 border-rose-500 bg-rose-50 p-3">
        <SubLabel en="The Key Force" kh="កម្លាំងសំខាន់" />
        <BilingualBlock
          en={
            <>
              Stone is <strong>incredibly strong</strong> when <strong>squeezed</strong> (Compression) — but <strong>weak</strong> when <strong>pulled apart</strong>.
            </>
          }
          kh={
            <>
              ថ្ម​មាន​ភាព​ធន់​ <strong>ខ្លាំង​ក្លា</strong> ពេល​ត្រូវ​បាន <strong>សង្កត់</strong> (កម្លាំង​សង្កត់) — ប៉ុន្តែ​ <strong>ខ្សោយ</strong> ពេល​ត្រូវ​បាន <strong>ទាញ​ឲ្យ​បែក​ដាច់</strong>។
            </>
          }
        />
        <div className="mt-2">
          <ForceChip kind="compression" en="Compression" kh="កម្លាំងសង្កត់" />
        </div>
      </div>

      {/* Arch diagram */}
      <ArchDiagram />

      <BilingualBlock
        en={
          <>
            An <strong>arch</strong> takes all the <strong>weight</strong> on top of the bridge and pushes it <strong>down and outward</strong> into the ground.
          </>
        }
        kh={
          <>
            <strong>ធ្នូ</strong> ទទួល​យក​ <strong>ទម្ងន់​ទាំងអស់</strong> នៅ​ពី​លើ​ស្ពាន ហើយ​រុញ​វា <strong>ចុះ​ក្រោម និង​ចេញ​ក្រៅ</strong> ទៅ​ក្នុង​ដី។
          </>
        }
      />

      <div className="rounded-md bg-amber-50 border-l-4 border-l-amber-500 border border-amber-200 p-2.5 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
        <Mountain className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-700" aria-hidden="true" />
        <span>
          <strong>Local example:</strong> the corbelled stone arches of <strong>Angkor Wat</strong> have stood for over <strong>900 years</strong>.
          <br />
          <span className="font-khmer leading-loose">
            <strong>ឧទាហរណ៍ក្នុងស្រុក ៖</strong> ធ្នូ​ថ្ម​សង់​បន្ត​ៗ​នៃ <strong>ប្រាសាទ​អង្គរវត្ត</strong> បាន​ឈរ​អស់​រយៈ​ពេល​ជាង <strong>៩០០ ឆ្នាំ</strong>។
          </span>
        </span>
      </div>
    </BlueprintCard>
  );
}

// SVG: stone arch with downward weight + outward thrust arrows
function ArchDiagram() {
  return (
    <div
      className="relative w-full h-44 rounded-lg border-2 border-slate-300 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 176" className="w-full h-full">
        {/* Ground */}
        <rect x="0" y="146" width="320" height="30" fill="#92400e" />
        <line x1="0" y1="146" x2="320" y2="146" stroke="#451a03" strokeWidth="1" />
        {/* Hatched ground */}
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={i}
            x1={i * 20}
            y1="176"
            x2={i * 20 + 14}
            y2="146"
            stroke="#451a03"
            strokeWidth="0.6"
            opacity="0.5"
          />
        ))}

        {/* Road deck on top of arch */}
        <rect x="40" y="32" width="240" height="14" fill="#cbd5e1" stroke="#334155" strokeWidth="1" />
        <line x1="40" y1="39" x2="280" y2="39" stroke="#0f172a" strokeWidth="0.6" strokeDasharray="6 4" />

        {/* Arch — voussoir blocks */}
        {(() => {
          const cx = 160;
          const cy = 146;
          const rOuter = 70;
          const rInner = 56;
          const blocks = 11;
          const tiles = [];
          for (let i = 0; i < blocks; i++) {
            const a1 = Math.PI - (i / blocks) * Math.PI;
            const a2 = Math.PI - ((i + 1) / blocks) * Math.PI;
            const x1o = cx + rOuter * Math.cos(a1);
            const y1o = cy - rOuter * Math.sin(a1);
            const x2o = cx + rOuter * Math.cos(a2);
            const y2o = cy - rOuter * Math.sin(a2);
            const x1i = cx + rInner * Math.cos(a1);
            const y1i = cy - rInner * Math.sin(a1);
            const x2i = cx + rInner * Math.cos(a2);
            const y2i = cy - rInner * Math.sin(a2);
            const isKey = i === Math.floor(blocks / 2);
            tiles.push(
              <polygon
                key={i}
                points={`${x1o},${y1o} ${x2o},${y2o} ${x2i},${y2i} ${x1i},${y1i}`}
                fill={isKey ? "#f59e0b" : "#94a3b8"}
                stroke="#334155"
                strokeWidth="0.8"
              />,
            );
          }
          return <g>{tiles}</g>;
        })()}

        {/* Keystone label */}
        <text x="160" y="78" fontSize="8" fontWeight="bold" fill="#78350f" textAnchor="middle">
          KEYSTONE
        </text>
        <text x="160" y="86" fontSize="7" fill="#78350f" textAnchor="middle" fontFamily="Khmer OS, Hanuman, sans-serif">
          ថ្មក្បាលធ្នូ
        </text>

        {/* Downward weight arrows on top */}
        {[80, 130, 180, 230].map((x) => (
          <g key={x}>
            <line x1={x} y1="6" x2={x} y2="28" stroke="#dc2626" strokeWidth="1.6" markerEnd="url(#arr-down-red)" />
          </g>
        ))}
        <text x="20" y="14" fontSize="8" fontWeight="bold" fill="#dc2626">WEIGHT · ទម្ងន់</text>

        {/* Outward thrust at base */}
        <line x1="80" y1="142" x2="40" y2="158" stroke="#16a34a" strokeWidth="1.6" markerEnd="url(#arr-out-green)" />
        <line x1="240" y1="142" x2="280" y2="158" stroke="#16a34a" strokeWidth="1.6" markerEnd="url(#arr-out-green)" />
        <text x="14" y="170" fontSize="8" fontWeight="bold" fill="#15803d">THRUST · សម្ពាធ</text>
        <text x="244" y="170" fontSize="8" fontWeight="bold" fill="#15803d">THRUST · សម្ពាធ</text>

        <defs>
          <marker id="arr-down-red" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L5,10 L10,0 Z" fill="#dc2626" />
          </marker>
          <marker id="arr-out-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 Z" fill="#16a34a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 — Modern Steel & Cables
// ════════════════════════════════════════════════════════════════════════════

function ModernCablesCard() {
  return (
    <BlueprintCard
      cardNo="02"
      topicEn="Tension"
      topicKh="កម្លាំងទាញ"
      titleEn="Modern Steel & Cables"
      titleKh="ដែក និងខ្សែកាបទំនើប"
      Icon={Cable}
      testId="card-modern-cables"
      paper="#f0f9ff"
    >
      <BilingualBlock
        en={
          <>
            Modern bridges use <strong>steel cables</strong>, which are <strong>incredibly strong</strong> when <strong>pulled</strong>.
          </>
        }
        kh={
          <>
            ស្ពាន​ទំនើប​ប្រើ <strong>ខ្សែ​កាប​ដែក</strong> ដែល​មាន​ភាព <strong>ធន់​ខ្លាំង</strong> ពេល​ត្រូវ​បាន <strong>ទាញ</strong>។
          </>
        }
      />

      <div>
        <ForceChip kind="tension" en="Tension" kh="កម្លាំងទាញ" />
      </div>

      {/* Cable-stayed sub-block */}
      <div className="rounded-xl border-2 border-blue-600 bg-blue-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Cable className="w-5 h-5 text-blue-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-blue-900">Cable-Stayed</div>
            <div className="font-khmer text-base text-blue-900 leading-loose">ស្ពានខ្សែកាបអុបទិក</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              Cables run <strong>directly</strong> from a <strong>tall tower</strong> down to the <strong>road deck</strong>.
            </>
          }
          kh={
            <>
              ខ្សែ​កាប​រត់ <strong>ដោយ​ផ្ទាល់</strong> ពី <strong>ប៉ម​ខ្ពស់</strong> ចុះ​មក <strong>ផ្ទៃ​ផ្លូវ</strong>។
            </>
          }
        />
        <CableStayedDiagram />
        <div className="mt-2 rounded-md bg-white border-l-4 border-l-amber-500 border border-amber-200 p-2.5 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
          <Anchor className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-700" aria-hidden="true" />
          <span>
            <strong>Local example:</strong> the <strong>Tsubasa Bridge</strong> crossing the <strong>Mekong River</strong> is a massive cable-stayed bridge!
            <br />
            <span className="font-khmer leading-loose">
              <strong>ឧទាហរណ៍ក្នុងស្រុក ៖</strong> <strong>ស្ពាន​អ្នក​លឿង</strong> ដែល​ឆ្លង​កាត់ <strong>ទន្លេ​មេគង្គ</strong> គឺ​ជា​ស្ពាន​ខ្សែ​កាប​អុបទិក​ដ៏​ធំ​មហិមា!
            </span>
          </span>
        </div>
      </div>

      {/* Suspension sub-block */}
      <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Activity className="w-5 h-5 text-emerald-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-emerald-900">Suspension</div>
            <div className="font-khmer text-base text-emerald-900 leading-loose">ស្ពានព្យួរ</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              A <strong>massive main cable</strong> is <strong>draped</strong> between two towers, and <strong>smaller cables hang down</strong> to hold the road.
            </>
          }
          kh={
            <>
              <strong>ខ្សែ​កាប​មេ​យក្ស</strong> ត្រូវ​បាន <strong>បង់</strong> រវាង​ប៉ម​ពីរ ហើយ <strong>ខ្សែ​កាប​តូច​ៗ​ព្យួរ​ចុះ​មក</strong> ដើម្បី​ទប់​ផ្លូវ។
            </>
          }
        />
        <SuspensionDiagram />
      </div>
    </BlueprintCard>
  );
}

// SVG: cable-stayed bridge — tower with diagonal cables to deck
function CableStayedDiagram() {
  return (
    <div
      className="mt-2 relative w-full h-32 rounded-md bg-white border border-blue-300 overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 128" className="w-full h-full">
        {/* Water */}
        <rect x="0" y="100" width="320" height="28" fill="#bae6fd" />
        {/* Wave lines */}
        <path d="M 0 110 Q 16 106 32 110 T 64 110 T 96 110 T 128 110 T 160 110 T 192 110 T 224 110 T 256 110 T 288 110 T 320 110" stroke="#0284c7" strokeWidth="0.8" fill="none" opacity="0.7" />
        {/* Road deck */}
        <rect x="20" y="92" width="280" height="8" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
        <line x1="20" y1="96" x2="300" y2="96" stroke="#facc15" strokeWidth="0.6" strokeDasharray="6 4" />
        {/* Pylon / tower */}
        <rect x="155" y="14" width="10" height="86" fill="#0f172a" />
        <polygon points="160,4 154,18 166,18" fill="#0f172a" />
        {/* Stay cables — diagonals on both sides */}
        {[30, 60, 90, 120, 200, 230, 260, 290].map((x, i) => {
          const isLeft = x < 160;
          return (
            <line
              key={i}
              x1="160"
              y1="22"
              x2={x}
              y2="92"
              stroke={isLeft ? "#1d4ed8" : "#0891b2"}
              strokeWidth="1.2"
            />
          );
        })}
        {/* Tension arrows */}
        <text x="6" y="14" fontSize="8" fontWeight="bold" fill="#15803d">← TENSION ទាញ →</text>
        {/* Tower label */}
        <text x="170" y="14" fontSize="8" fontWeight="bold" fill="#0f172a">TOWER · ប៉ម</text>
      </svg>
    </div>
  );
}

// SVG: suspension bridge — two towers, draped main cable, vertical hangers
function SuspensionDiagram() {
  return (
    <div
      className="mt-2 relative w-full h-32 rounded-md bg-white border border-emerald-300 overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 128" className="w-full h-full">
        {/* Water */}
        <rect x="0" y="100" width="320" height="28" fill="#bae6fd" />
        <path d="M 0 110 Q 16 106 32 110 T 64 110 T 96 110 T 128 110 T 160 110 T 192 110 T 224 110 T 256 110 T 288 110 T 320 110" stroke="#0284c7" strokeWidth="0.8" fill="none" opacity="0.7" />
        {/* Road deck */}
        <rect x="20" y="92" width="280" height="8" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
        <line x1="20" y1="96" x2="300" y2="96" stroke="#facc15" strokeWidth="0.6" strokeDasharray="6 4" />
        {/* Two towers */}
        <rect x="78" y="14" width="8" height="86" fill="#0f172a" />
        <rect x="234" y="14" width="8" height="86" fill="#0f172a" />
        {/* Main cable — quadratic curve draped between towers */}
        <path d="M 20 88 Q 82 14 160 70 Q 238 14 300 88" stroke="#16a34a" strokeWidth="2.2" fill="none" />
        {/* Hangers — short verticals */}
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 26 + i * 19.5;
          // Compute y on the main cable approximation
          let y;
          if (x < 160) {
            const t = (x - 20) / (160 - 20);
            y = 88 + (70 - 88) * t * t + 2 * t * (1 - t) * (14 - 88);
            y = (1 - t) * (1 - t) * 88 + 2 * (1 - t) * t * 14 + t * t * 70;
          } else {
            const t = (x - 160) / (300 - 160);
            y = (1 - t) * (1 - t) * 70 + 2 * (1 - t) * t * 14 + t * t * 88;
          }
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x}
              y2="92"
              stroke="#047857"
              strokeWidth="0.7"
            />
          );
        })}
        {/* Labels */}
        <text x="120" y="14" fontSize="8" fontWeight="bold" fill="#047857">MAIN CABLE · ខ្សែកាបមេ</text>
        <text x="6" y="106" fontSize="7" fontWeight="bold" fill="#0f172a">ANCHOR · យុថ្កា</text>
        <text x="252" y="106" fontSize="7" fontWeight="bold" fill="#0f172a">ANCHOR · យុថ្កា</text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 — The Global Giants
// ════════════════════════════════════════════════════════════════════════════

function GlobalGiantsCard() {
  return (
    <BlueprintCard
      cardNo="03"
      topicEn="World Records"
      topicKh="កំណត់ត្រាពិភពលោក"
      titleEn="The Global Giants"
      titleKh="ស្ពានយក្សលើពិភពលោក"
      Icon={Trophy}
      testId="card-global-giants"
      paper="#f8fafc"
    >
      <BilingualBlock
        en={<>Two extremes of <strong>human engineering</strong>.</>}
        kh={<>ចំណុច​ខ្លាំង​ពីរ​នៃ <strong>វិស្វកម្ម​មនុស្ស</strong>។</>}
      />

      {/* Longest */}
      <div className="rounded-xl border-2 border-amber-500 bg-amber-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Train className="w-5 h-5 text-amber-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-amber-900">Longest Bridge</div>
            <div className="font-khmer text-base text-amber-900 leading-loose">ស្ពានវែងជាងគេ</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              The <strong>Danyang–Kunshan Grand Bridge</strong> in China — an astonishing <strong>164 kilometers</strong> long, carrying <strong>high-speed trains</strong> over water and rice paddies.
            </>
          }
          kh={
            <>
              <strong>ស្ពាន​ដាន់​យ៉ាង–គុនសាន</strong> នៅ​ប្រទេស​ចិន — វែង​គួរ​ឲ្យ​អស្ចារ្យ​ដល់​ទៅ <strong>១៦៤ គីឡូម៉ែត្រ</strong> ដឹក <strong>រថភ្លើង​ល្បឿន​លឿន</strong> ឆ្លង​កាត់​ផ្ទៃ​ទឹក និង​វាល​ស្រែ។
            </>
          }
        />
        <div className="mt-2 grid grid-cols-2 gap-2">
          <StatTile
            value="164 km"
            labelEn="Length"
            labelKh="ប្រវែង"
            colour="bg-amber-200 border-amber-500 text-amber-900"
          />
          <StatTile
            value="🇨🇳"
            labelEn="China"
            labelKh="ចិន"
            colour="bg-white border-amber-400 text-slate-900"
          />
        </div>
        {/* Length scale visual */}
        <div className="mt-2">
          <SubLabel en="For scale: 164 km is roughly Phnom Penh → Sihanoukville" kh="សម្រាប់​ប្រៀប​ធៀប ៖ ១៦៤ គម គឺ​ប្រហែល ភ្នំពេញ → សីហនុ" />
          <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 border border-amber-700" />
        </div>
      </div>

      {/* Tallest */}
      <div className="rounded-xl border-2 border-blue-600 bg-blue-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Mountain className="w-5 h-5 text-blue-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-blue-900">Tallest Bridge</div>
            <div className="font-khmer text-base text-blue-900 leading-loose">ស្ពានខ្ពស់ជាងគេ</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              The <strong>Millau Viaduct</strong> in <strong>France</strong>. Its highest tower is <strong>343 meters</strong> tall — <strong>taller than the Eiffel Tower!</strong>
            </>
          }
          kh={
            <>
              <strong>ស្ពាន​មីយ៉ូ</strong> នៅ​ប្រទេស <strong>បារាំង</strong>។ ប៉ម​ខ្ពស់​បំផុត​មាន​កម្ពស់ <strong>៣៤៣ ម៉ែត្រ</strong> — <strong>ខ្ពស់​ជាង​ប៉ម​អេហ្វែល!</strong>
            </>
          }
        />

        {/* Visual height comparison */}
        <HeightComparisonDiagram />
      </div>
    </BlueprintCard>
  );
}

function StatTile({
  value,
  labelEn,
  labelKh,
  colour,
}: {
  value: string;
  labelEn: string;
  labelKh: string;
  colour: string;
}) {
  return (
    <div className={`rounded-lg border-2 ${colour} p-2 text-center`}>
      <div className="font-display font-extrabold text-xl leading-none">{value}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest mt-0.5">{labelEn}</div>
      <div className="text-[10px] font-khmer leading-loose">{labelKh}</div>
    </div>
  );
}

// SVG: Eiffel vs Millau height comparison bars
function HeightComparisonDiagram() {
  return (
    <div
      className="mt-2 relative w-full h-32 rounded-md bg-white border border-blue-300 overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 128" className="w-full h-full">
        {/* Ground line */}
        <line x1="0" y1="118" x2="320" y2="118" stroke="#0f172a" strokeWidth="1" />
        {/* Eiffel — 330 m → bar height proportionally smaller */}
        <g transform="translate(80, 0)">
          <polygon points="-12,118 12,118 4,40 -4,40" fill="#94a3b8" stroke="#334155" strokeWidth="0.8" />
          <line x1="-12" y1="92" x2="12" y2="92" stroke="#334155" strokeWidth="0.6" />
          <line x1="-10" y1="70" x2="10" y2="70" stroke="#334155" strokeWidth="0.6" />
          <text x="0" y="36" fontSize="9" fontWeight="bold" fill="#475569" textAnchor="middle">330 m</text>
          <text x="0" y="128" fontSize="8" fontWeight="bold" fill="#475569" textAnchor="middle">Eiffel</text>
        </g>
        {/* Millau — 343 m, slightly taller */}
        <g transform="translate(220, 0)">
          <line x1="0" y1="118" x2="0" y2="34" stroke="#1e3a8a" strokeWidth="3" />
          {/* cables */}
          <line x1="0" y1="40" x2="-30" y2="98" stroke="#1d4ed8" strokeWidth="0.8" />
          <line x1="0" y1="40" x2="30" y2="98" stroke="#1d4ed8" strokeWidth="0.8" />
          <line x1="0" y1="50" x2="-22" y2="98" stroke="#1d4ed8" strokeWidth="0.8" />
          <line x1="0" y1="50" x2="22" y2="98" stroke="#1d4ed8" strokeWidth="0.8" />
          {/* deck */}
          <rect x="-40" y="98" width="80" height="4" fill="#475569" />
          <text x="0" y="30" fontSize="9" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">343 m</text>
          <text x="0" y="128" fontSize="8" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">Millau</text>
        </g>
        {/* Difference annotation */}
        <line x1="92" y1="40" x2="208" y2="34" stroke="#dc2626" strokeWidth="0.8" strokeDasharray="3 2" />
        <text x="160" y="20" fontSize="8" fontWeight="bold" fill="#dc2626" textAnchor="middle">+13 m</text>
        <text x="160" y="118" fontSize="8" fontWeight="bold" fill="#475569" textAnchor="middle">↑ TALLER · ខ្ពស់ជាង ↑</text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 4 — When Bridges Fail (Tacoma + Resonance)
// ════════════════════════════════════════════════════════════════════════════

function BridgeFailuresCard() {
  return (
    <BlueprintCard
      cardNo="04"
      topicEn="Resonance & Failure"
      topicKh="រ៉េសូណង់ និងការបាក់ស្រុត"
      titleEn="When Bridges Fail"
      titleKh="នៅពេលស្ពានបាក់ស្រុត"
      Icon={AlertTriangle}
      testId="card-failures"
      paper="#fef2f2"
    >
      {/* Disaster header */}
      <div className="rounded-xl border-2 border-rose-700 bg-rose-100 p-3">
        <SubLabel en="Tacoma Narrows Disaster · 1940" kh="គ្រោះមហន្តរាយ Tacoma Narrows · ឆ្នាំ ១៩៤០" />
        <BilingualBlock
          en={
            <>
              In <strong>1940</strong>, a bridge in the <strong>United States</strong> was built <strong>without proper aerodynamics</strong>.
            </>
          }
          kh={
            <>
              នៅ​ឆ្នាំ <strong>១៩៤០</strong> ស្ពាន​មួយ​នៅ <strong>សហរដ្ឋ​អាមេរិក</strong> ត្រូវ​បាន​សង់ <strong>ដោយ​គ្មាន​អាកាស​ប្លឺឌីណាមិច​ត្រឹម​ត្រូវ</strong>។
          </>
          }
        />
      </div>

      {/* Resonance concept */}
      <div className="rounded-xl border-2 border-amber-500 bg-amber-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Activity className="w-5 h-5 text-amber-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-amber-900">The Concept · Resonance</div>
            <div className="font-khmer text-base text-amber-900 leading-loose">គំនិត · រ៉េសូណង់</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              Every object has a <strong>natural frequency</strong> — the rhythm at which it loves to vibrate. If a force pushes at <em>exactly</em> that rhythm, the vibration grows <strong>bigger and bigger</strong>.
            </>
          }
          kh={
            <>
              វត្ថុ​នី​មួយ​ៗ​មាន <strong>ប្រេកង់​ធម្មជាតិ</strong> — ចង្វាក់​ដែល​វា​ចូល​ចិត្ត​រំញ័រ។ ប្រសិនបើ​កម្លាំង​មួយ​រុញ​នៅ <em>ត្រឹម</em> ចង្វាក់​នោះ ការ​រំញ័រ​នឹង​កើន​ឡើង <strong>កាន់​តែ​ធំ និង​កាន់​តែ​ធំ</strong>។
            </>
          }
        />
        <ResonanceWaveDiagram />
      </div>

      {/* The wind story */}
      <div className="rounded-xl border-2 border-rose-600 bg-white p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Wind className="w-5 h-5 text-rose-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-rose-900">The Killer Wind</div>
            <div className="font-khmer text-base text-rose-900 leading-loose">ខ្យល់​ដែល​សម្លាប់</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              A steady <strong>64 km/h</strong> wind hit the bridge at its <strong>exact natural frequency</strong> — causing the solid steel to <strong>twist and ripple like a wet noodle</strong> until it <strong>tore itself apart</strong>.
            </>
          }
          kh={
            <>
              ខ្យល់​ដែល​បក់​ជា​បន្ត​ល្បឿន <strong>៦៤ គម/ម៉ោង</strong> បាន​បះ​ស្ពាន​នៅ​ត្រឹម <strong>ប្រេកង់​ធម្មជាតិ​ពិត​ប្រាកដ​របស់​វា</strong> — ធ្វើ​ឲ្យ​ដែក​រឹង​មាំ <strong>ងាក​ងេក និង​រលោក​ដូច​មី​សើម</strong> រហូត​ដល់​វា <strong>ដាច់​ខ្លួន​ឯង</strong>។
            </>
          }
        />

        <div className="mt-2 grid grid-cols-3 gap-2">
          <StatTile
            value="64"
            labelEn="km/h wind"
            labelKh="គម/ម៉ោង"
            colour="bg-rose-100 border-rose-500 text-rose-900"
          />
          <StatTile
            value="1940"
            labelEn="Year"
            labelKh="ឆ្នាំ"
            colour="bg-rose-100 border-rose-500 text-rose-900"
          />
          <StatTile
            value="🇺🇸"
            labelEn="USA"
            labelKh="សហរដ្ឋអាមេរិក"
            colour="bg-rose-100 border-rose-500 text-rose-900"
          />
        </div>
      </div>

      {/* Lesson */}
      <div className="rounded-md border-l-4 border-l-emerald-600 bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-slate-800 leading-relaxed flex items-start gap-2">
        <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-700" aria-hidden="true" />
        <span>
          <strong>The lesson:</strong> modern bridges now use <strong>wind-tunnel tests</strong> and <strong>aerodynamic decks</strong> so the wind cannot find their natural frequency.
          <br />
          <span className="font-khmer leading-loose">
            <strong>មេរៀន ៖</strong> ស្ពាន​ទំនើប​ឥឡូវ​នេះ​ប្រើ <strong>ការ​សាក​ល្បង​ផ្លូវ​ខ្យល់</strong> និង <strong>ផ្ទៃ​ផ្លូវ​ផ្លុំ​ខ្យល់</strong> ដើម្បី​កុំ​ឲ្យ​ខ្យល់​អាច​រក​ឃើញ​ប្រេកង់​ធម្មជាតិ​របស់​វា​បាន។
          </span>
        </span>
      </div>
    </BlueprintCard>
  );
}

// SVG: a sine wave growing in amplitude (resonance build-up)
function ResonanceWaveDiagram() {
  const points: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = (i / 100) * 300 + 10;
    const amp = 4 + (i / 100) * 22;
    const y = 38 + amp * Math.sin((i / 100) * Math.PI * 6);
    points.push(`${x},${y}`);
  }
  return (
    <div
      className="mt-2 relative w-full h-20 rounded-md bg-white border border-amber-300 overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 80" className="w-full h-full">
        <line x1="10" y1="38" x2="310" y2="38" stroke="#94a3b8" strokeWidth="0.6" strokeDasharray="3 3" />
        <polyline points={points.join(" ")} fill="none" stroke="#dc2626" strokeWidth="1.6" />
        <text x="14" y="14" fontSize="8" fontWeight="bold" fill="#92400e">SMALL · តូច</text>
        <text x="240" y="14" fontSize="8" fontWeight="bold" fill="#dc2626">→ HUGE · ធំ​មហិមា</text>
        <text x="14" y="74" fontSize="7" fill="#475569" fontFamily="ui-monospace, monospace">amplitude grows · ទំហំរំញ័រកើនឡើង</text>
      </svg>
    </div>
  );
}
