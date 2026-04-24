import { Link } from "wouter";
import {
  ArrowLeft,
  Compass,
  Globe2,
  Ruler,
  Slice,
  Clock,
  ScrollText,
  Anchor,
  Sun,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  STC-COORD-01 · Latitude & Longitude: The Invisible Grid
//                 រយៈទទឹង និងរយៈបណ្តោយ៖ ក្រឡាចត្រង្គដែលមើលមិនឃើញ
//
//  Three strictly-bilingual cards (BOTH EN + KH always rendered):
//   1. Latitude — The Ladder    (parchment/sepia, parallel lines + Equator)
//   2. Longitude — The Slices   (parchment/teal, orange-slice meridians)
//   3. History & The Clock      (deep navy, Eratosthenes + Harrison's clock)
//
//  Aesthetic: maritime / old-map — deep ocean navy + parchment white +
//  brass / gold accent lines, evoking an antique chart.
// ════════════════════════════════════════════════════════════════════════════

export function CoordinatesPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-100 overflow-hidden">
      <MapBg />

      {/* Back link */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-amber-100/90 hover:text-white transition-colors ${isKh ? "font-khmer" : ""}`}
          data-testid="back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>

      {/* Hero — strictly bilingual */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div className="inline-flex items-center gap-2 bg-slate-900/60 border border-amber-300/60 text-amber-200 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-md flex-wrap backdrop-blur-sm">
          <Compass className="w-3.5 h-3.5" />
          <span>Study Center · Geography & Navigation</span>
          <span className="opacity-50">·</span>
          <span className="font-khmer normal-case">មជ្ឈមណ្ឌលសិក្សា · ភូមិសាស្ត្រ និង ការនាំផ្លូវ</span>
          <span className="font-mono opacity-60">· STC-COORD-01</span>
        </div>

        <h1
          data-testid="page-title"
          className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-2 leading-tight text-white"
        >
          Latitude &amp; Longitude:{" "}
          <span className="text-amber-300">The Invisible Grid</span>
        </h1>
        <h2 className="font-khmer font-bold text-xl sm:text-3xl lg:text-4xl mb-5 leading-loose text-amber-100/95">
          រយៈទទឹង និងរយៈបណ្តោយ៖{" "}
          <span className="text-amber-300">ក្រឡាចត្រង្គដែលមើលមិនឃើញ</span>
        </h2>

        <div className="space-y-2 max-w-3xl">
          <p className="text-slate-200 text-base leading-relaxed">
            Humans drew an invisible grid over the entire planet — two sets of lines that let any sailor, pilot, or phone find any spot on Earth with just two numbers.
          </p>
          <p className="text-slate-200 text-base font-khmer leading-loose">
            មនុស្សបានគូរក្រឡាចត្រង្គដែលមើលមិនឃើញលើភពផែនដីទាំងមូល — ខ្សែពីរប្រភេទដែលអនុញ្ញាតឲ្យនាវិក អ្នកបើកយន្តហោះ ឬទូរស័ព្ទណាមួយ ស្វែងរកចំណុចណាមួយលើផែនដី ដោយប្រើតែលេខពីរប៉ុណ្ណោះ។
          </p>
        </div>
      </header>

      {/* Three cards */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LatitudeCard />
          <LongitudeCard />
          <HistoryClockCard />
        </div>
      </section>

      {/* Closing — bilingual */}
      <footer className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="inline-block rounded-2xl border border-amber-300/60 bg-slate-900/60 backdrop-blur-sm px-6 py-4 text-slate-100 shadow-lg">
          <p className="font-serif italic">
            “Two numbers — and the whole world becomes findable.”
          </p>
          <p className="font-khmer not-italic leading-loose text-slate-200 mt-1">
            «លេខពីរ — ហើយពិភពលោកទាំងមូលក្លាយជាអាចស្វែងរកបាន។»
          </p>
        </div>
      </footer>
    </div>
  );
}

export default CoordinatesPage;

// ════════════════════════════════════════════════════════════════════════════
//  Background — deep ocean navy with faint parchment-grid overlay
// ════════════════════════════════════════════════════════════════════════════

function MapBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0c1e3a 0%, #0c2a52 35%, #0a3a6b 70%, #0c2a52 100%)",
        }}
      />
      {/* Faint parchment-coloured grid lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#fde68a" strokeWidth="0.4" opacity="0.10" />
          </pattern>
          <pattern id="map-dots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="#fde68a" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
        <rect width="100%" height="100%" fill="url(#map-dots)" />
      </svg>
      {/* Vignette compass rose suggestion top-right */}
      <svg
        className="absolute -top-6 right-6 w-72 opacity-[0.08]"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="#fde68a" strokeWidth="0.6" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#fde68a" strokeWidth="0.4" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1="50"
            y1="50"
            x2={50 + 46 * Math.cos(((a - 90) * Math.PI) / 180)}
            y2={50 + 46 * Math.sin(((a - 90) * Math.PI) / 180)}
            stroke="#fde68a"
            strokeWidth="0.5"
          />
        ))}
        <polygon points="50,4 46,50 50,46 54,50" fill="#fde68a" />
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
      <p className="text-sm leading-relaxed text-slate-800">{en}</p>
      <p className="text-sm font-khmer leading-loose text-slate-800">{kh}</p>
    </div>
  );
}

function SubLabel({ en, kh, dark = false }: { en: string; kh: string; dark?: boolean }) {
  return (
    <div
      className={`text-[11px] font-mono uppercase tracking-widest mb-1 flex flex-wrap gap-x-2 ${
        dark ? "text-amber-200/85" : "text-slate-500"
      }`}
    >
      <span>{en}</span>
      <span className="font-khmer normal-case tracking-normal text-[0.7rem]">{kh}</span>
    </div>
  );
}

// Shared card shell — parchment body w/ navy header + brass underline
function ChartCard({
  cardNo,
  topicEn,
  topicKh,
  titleEn,
  titleKh,
  Icon,
  testId,
  parchment = "#fdf6e3",
  children,
}: {
  cardNo: string;
  topicEn: string;
  topicKh: string;
  titleEn: string;
  titleKh: string;
  Icon: typeof Ruler;
  testId: string;
  parchment?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      data-testid={testId}
      className="relative rounded-3xl border-2 border-amber-300/70 shadow-2xl overflow-hidden flex flex-col text-slate-900"
      style={{ background: parchment }}
    >
      {/* Navy header */}
      <header
        className="px-5 pt-5 pb-3 border-b-2 border-amber-300/80"
        style={{
          background:
            "linear-gradient(135deg, #0c1e3a 0%, #0a3a6b 100%)",
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-300 border-2 border-amber-200 text-slate-900 flex items-center justify-center shadow-md">
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-200/90 mb-0.5 flex flex-wrap gap-x-2">
              <span>Card · {cardNo}</span>
              <span className="opacity-50">/</span>
              <span>{topicEn}</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-90">{topicKh}</span>
            </div>
            <h3 className="font-bold text-lg text-white leading-tight">
              <span className="block">{titleEn}</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-amber-100">
                {titleKh}
              </span>
            </h3>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1">{children}</div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 — Latitude: The Ladder
// ════════════════════════════════════════════════════════════════════════════

function LatitudeCard() {
  return (
    <ChartCard
      cardNo="01"
      topicEn="Latitude"
      topicKh="រយៈទទឹង"
      titleEn="Latitude — The Ladder"
      titleKh="រយៈទទឹង — ជណ្ដើរ"
      Icon={Ruler}
      testId="card-latitude"
      parchment="#fdf6e3"
    >
      <BilingualBlock
        en={
          <>
            <strong>Latitude</strong> lines run <strong>flat across the Earth</strong>, parallel to the Equator.
          </>
        }
        kh={
          <>
            ខ្សែ <strong>រយៈទទឹង</strong> រត់ <strong>ផ្ដេកឆ្លងកាត់ផែនដី</strong> ស្របទៅនឹងខ្សែអេក្វាទ័រ។
          </>
        }
      />

      {/* Latitude ladder visual */}
      <LatitudeDiagram />

      {/* The Equator */}
      <div className="rounded-xl border-2 border-amber-600 bg-amber-100/70 p-3">
        <SubLabel en="The Equator · 0°" kh="ខ្សែអេក្វាទ័រ · ០°" />
        <BilingualBlock
          en={
            <>
              The <strong>Equator</strong> is the exact <strong>middle belt</strong> of the Earth — defined as <strong>0°</strong>.
            </>
          }
          kh={
            <>
              <strong>ខ្សែអេក្វាទ័រ</strong> គឺជា <strong>ខ្សែក្រវ៉ាត់កណ្តាល</strong> ត្រឹមត្រូវនៃផែនដី — កំណត់ថា <strong>០°</strong>។
            </>
          }
        />
      </div>

      {/* Up / Down explanation */}
      <div className="grid grid-cols-1 gap-2">
        <PoleRow
          dir="up"
          en={
            <>
              Climb <strong>up</strong> the ladder toward the <strong>North Pole</strong> → numbers go up to <strong>90°N</strong>.
            </>
          }
          kh={
            <>
              ឡើង <strong>ឡើងលើ</strong> តាមជណ្ដើរទៅកាន់ <strong>ប៉ូលខាងជើង</strong> → លេខឡើងដល់ <strong>៩០°N</strong>។
            </>
          }
          chip="90° N"
          chipClass="bg-blue-700 text-blue-50"
        />
        <PoleRow
          dir="down"
          en={
            <>
              Climb <strong>down</strong> toward the <strong>South Pole</strong> → numbers go to <strong>90°S</strong>.
            </>
          }
          kh={
            <>
              ចុះ <strong>ចុះក្រោម</strong> ទៅកាន់ <strong>ប៉ូលខាងត្បូង</strong> → លេខទៅដល់ <strong>៩០°S</strong>។
            </>
          }
          chip="90° S"
          chipClass="bg-cyan-700 text-cyan-50"
        />
      </div>
    </ChartCard>
  );
}

function PoleRow({
  dir,
  en,
  kh,
  chip,
  chipClass,
}: {
  dir: "up" | "down";
  en: React.ReactNode;
  kh: React.ReactNode;
  chip: string;
  chipClass: string;
}) {
  return (
    <div className="rounded-lg bg-white border border-amber-300 p-2.5 flex items-start gap-2.5">
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-md ${chipClass} font-display font-extrabold flex flex-col items-center justify-center text-[11px] leading-tight shadow`}
      >
        <span className="text-base">{dir === "up" ? "▲" : "▼"}</span>
        <span>{chip}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-relaxed text-slate-800">{en}</p>
        <p className="text-sm font-khmer leading-loose text-slate-800 mt-0.5">{kh}</p>
      </div>
    </div>
  );
}

// Latitude ladder: globe profile with 5 horizontal parallels
function LatitudeDiagram() {
  return (
    <div
      className="relative w-full h-44 rounded-lg border-2 border-amber-400 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 160" className="w-full h-full">
        {/* Globe outline */}
        <circle cx="120" cy="80" r="64" fill="#dbeafe" stroke="#0c1e3a" strokeWidth="1.5" />
        {/* Latitude parallels — chord lines clipped to circle */}
        {[
          { y: 32, label: "+60°", color: "#1e40af" },
          { y: 56, label: "+30°", color: "#1e40af" },
          { y: 80, label: "0°  EQUATOR", color: "#b45309", weight: 2 },
          { y: 104, label: "−30°", color: "#0e7490" },
          { y: 128, label: "−60°", color: "#0e7490" },
        ].map((l) => {
          const dy = l.y - 80;
          const halfW = Math.sqrt(Math.max(0, 64 * 64 - dy * dy));
          return (
            <g key={l.y}>
              <line
                x1={120 - halfW}
                y1={l.y}
                x2={120 + halfW}
                y2={l.y}
                stroke={l.color}
                strokeWidth={l.weight ?? 1.2}
                strokeDasharray={l.label.includes("EQUATOR") ? "" : "3 2"}
              />
            </g>
          );
        })}
        {/* North/South pole markers */}
        <circle cx="120" cy="16" r="3" fill="#1e3a8a" />
        <circle cx="120" cy="144" r="3" fill="#0e7490" />
        <text x="124" y="14" fontSize="8" fontWeight="bold" fill="#1e3a8a">N · 90°</text>
        <text x="124" y="153" fontSize="8" fontWeight="bold" fill="#0e7490">S · 90°</text>
        {/* Equator label */}
        <text x="186" y="84" fontSize="9" fontWeight="bold" fill="#b45309">0° EQUATOR</text>
        <text x="186" y="93" fontSize="8" fill="#b45309" fontFamily="Khmer OS, Hanuman, sans-serif">អេក្វាទ័រ</text>
        {/* Side labels */}
        <text x="22" y="36" fontSize="8" fill="#1e40af">+60° N</text>
        <text x="22" y="60" fontSize="8" fill="#1e40af">+30° N</text>
        <text x="22" y="108" fontSize="8" fill="#0e7490">−30° S</text>
        <text x="22" y="132" fontSize="8" fill="#0e7490">−60° S</text>
        {/* Direction arrows */}
        <line x1="200" y1="30" x2="200" y2="14" stroke="#1e3a8a" strokeWidth="1.5" markerEnd="url(#arr-up)" />
        <line x1="200" y1="130" x2="200" y2="146" stroke="#0e7490" strokeWidth="1.5" markerEnd="url(#arr-down)" />
        <defs>
          <marker id="arr-up" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,10 L5,0 L10,10 Z" fill="#1e3a8a" />
          </marker>
          <marker id="arr-down" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L5,10 L10,0 Z" fill="#0e7490" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 — Longitude: The Slices
// ════════════════════════════════════════════════════════════════════════════

function LongitudeCard() {
  return (
    <ChartCard
      cardNo="02"
      topicEn="Longitude"
      topicKh="រយៈបណ្តោយ"
      titleEn="Longitude — The Slices"
      titleKh="រយៈបណ្តោយ — ចំណិត"
      Icon={Slice}
      testId="card-longitude"
      parchment="#f0f9f4"
    >
      <BilingualBlock
        en={
          <>
            <strong>Longitude</strong> lines run <strong>up and down</strong>, slicing the Earth from pole to pole — like the segments of an orange.
          </>
        }
        kh={
          <>
            ខ្សែ <strong>រយៈបណ្តោយ</strong> រត់ <strong>ឡើងលើ និងចុះក្រោម</strong> កាត់ផែនដីពីប៉ូលមួយទៅប៉ូលមួយ — ដូចចំណិតក្រូចឆ្មារ។
          </>
        }
      />

      {/* Longitude orange-slice visual */}
      <LongitudeDiagram />

      {/* Prime Meridian */}
      <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 p-3">
        <SubLabel en="The Prime Meridian · 0°" kh="ខ្សែមេដ្យានទីសូន្យ · ០°" />
        <BilingualBlock
          en={
            <>
              The starting point is the <strong>Prime Meridian</strong> — an invisible line humans <em>decided</em> to draw straight through <strong>Greenwich, England</strong>, defined as <strong>0°</strong>.
            </>
          }
          kh={
            <>
              ចំណុចចាប់ផ្ដើមគឺ <strong>ខ្សែមេដ្យានទីសូន្យ</strong> — ខ្សែដែលមើលមិនឃើញដែលមនុស្ស <em>បាន​សម្រេច</em> ឲ្យ​គូ​ត្រង់​ឆ្លង​កាត់ <strong>ក្រុងហ្គ្រីនវិច ប្រទេសអង់គ្លេស</strong> កំណត់ថា <strong>០°</strong>។
            </>
          }
        />
      </div>

      {/* East / West — stack on mobile so descriptions stay readable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <DirectionTile
          dir="W"
          chipClass="bg-rose-700 text-rose-50"
          en={<>Measure how far <strong>West</strong> you are.</>}
          kh={<>វាស់ពីថាអ្នកនៅខាង <strong>លិច</strong> ប៉ុន្មាន។</>}
          maxEn="up to 180°W"
          maxKh="រហូតដល់ ១៨០°W"
        />
        <DirectionTile
          dir="E"
          chipClass="bg-blue-700 text-blue-50"
          en={<>Measure how far <strong>East</strong> you are.</>}
          kh={<>វាស់ពីថាអ្នកនៅខាង <strong>កើត</strong> ប៉ុន្មាន។</>}
          maxEn="up to 180°E"
          maxKh="រហូតដល់ ១៨០°E"
        />
      </div>
    </ChartCard>
  );
}

function DirectionTile({
  dir,
  en,
  kh,
  chipClass,
  maxEn,
  maxKh,
}: {
  dir: "E" | "W";
  en: React.ReactNode;
  kh: React.ReactNode;
  chipClass: string;
  maxEn: string;
  maxKh: string;
}) {
  return (
    <div className="rounded-lg bg-white border border-emerald-300 p-2.5">
      <div className="flex items-center gap-2 mb-1">
        <div
          className={`w-9 h-9 rounded-md ${chipClass} font-display font-extrabold flex items-center justify-center shadow`}
        >
          {dir === "W" ? "◀" : "▶"}
        </div>
        <div className="font-bold text-slate-900 text-base">
          {dir === "W" ? "West" : "East"}
          <span className="font-khmer text-base block leading-loose">{dir === "W" ? "លិច" : "កើត"}</span>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-slate-800">{en}</p>
      <p className="text-sm font-khmer leading-loose text-slate-800">{kh}</p>
      <p className="text-[11px] text-slate-500 mt-1">{maxEn}</p>
      <p className="text-[11px] text-slate-500 font-khmer leading-loose">{maxKh}</p>
    </div>
  );
}

// Longitude visual: top-down view of globe with meridian slices
function LongitudeDiagram() {
  return (
    <div
      className="relative w-full h-44 rounded-lg border-2 border-emerald-400 bg-white overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 160" className="w-full h-full">
        {/* Globe (top-down) */}
        <circle cx="120" cy="80" r="64" fill="#dbeafe" stroke="#0c1e3a" strokeWidth="1.5" />
        {/* Meridian slices — vertical ellipses suggesting longitude lines */}
        {[8, 24, 40, 56].map((rx, i) => (
          <ellipse
            key={i}
            cx="120"
            cy="80"
            rx={rx}
            ry="64"
            fill="none"
            stroke="#0e7490"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
        ))}
        {/* Prime Meridian — bold vertical line through center */}
        <line x1="120" y1="16" x2="120" y2="144" stroke="#047857" strokeWidth="2.5" />
        <text x="125" y="14" fontSize="9" fontWeight="bold" fill="#047857">0° PRIME</text>
        <text x="125" y="22" fontSize="7" fill="#047857" fontFamily="Khmer OS, Hanuman, sans-serif">មេដ្យានទីសូន្យ</text>
        {/* Greenwich pin */}
        <circle cx="120" cy="46" r="3" fill="#047857" />
        <text x="124" y="49" fontSize="7" fontWeight="bold" fill="#047857">GREENWICH</text>
        {/* Pole markers */}
        <circle cx="120" cy="16" r="3" fill="#1e3a8a" />
        <circle cx="120" cy="144" r="3" fill="#0e7490" />
        <text x="106" y="14" fontSize="7" fontWeight="bold" fill="#1e3a8a">N</text>
        <text x="106" y="153" fontSize="7" fontWeight="bold" fill="#0e7490">S</text>
        {/* East / West arrows */}
        <line x1="60" y1="80" x2="42" y2="80" stroke="#be123c" strokeWidth="1.8" markerEnd="url(#arr-w)" />
        <line x1="180" y1="80" x2="198" y2="80" stroke="#1d4ed8" strokeWidth="1.8" markerEnd="url(#arr-e)" />
        <text x="14" y="84" fontSize="9" fontWeight="bold" fill="#be123c">W · លិច</text>
        <text x="200" y="84" fontSize="9" fontWeight="bold" fill="#1d4ed8">E · កើត</text>
        <defs>
          <marker id="arr-w" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M10,0 L0,5 L10,10 Z" fill="#be123c" />
          </marker>
          <marker id="arr-e" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#1d4ed8" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 — The History & The Clock Problem
// ════════════════════════════════════════════════════════════════════════════

function HistoryClockCard() {
  return (
    <ChartCard
      cardNo="03"
      topicEn="History"
      topicKh="ប្រវត្តិសាស្ត្រ"
      titleEn="The History & The Clock Problem"
      titleKh="ប្រវត្តិសាស្ត្រ និងបញ្ហានាឡិកា"
      Icon={Clock}
      testId="card-history"
      parchment="#fbf3df"
    >
      {/* The Origin */}
      <div className="rounded-xl border-2 border-amber-600 bg-amber-100/70 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <ScrollText className="w-5 h-5 text-amber-800" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-amber-900">The Origin</div>
            <div className="font-khmer text-base text-amber-900 leading-loose">ប្រភពដើម</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              The Greek mathematician <strong>Eratosthenes</strong> invented the grid system over <strong>2,200 years ago</strong>.
            </>
          }
          kh={
            <>
              គណិតវិទូ​ក្រិក <strong>អេរ៉ាតូស្ថែន</strong> បាន​បង្កើត​ប្រព័ន្ធ​ក្រឡា​ចត្រង្គ​នេះ​អស់​ជាង <strong>២,២០០ ឆ្នាំ​មក​ហើយ</strong>។
            </>
          }
        />
        <div className="mt-2 rounded-md bg-white border border-amber-300 p-2 flex items-start gap-2.5">
          <Sun className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-700" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-800 leading-snug">
              Calculating <strong>latitude</strong> (North/South) was <strong>easy</strong> — sailors just measured the height of the <strong>sun</strong> or the <strong>North Star</strong>.
            </p>
            <p className="text-sm text-slate-800 font-khmer leading-loose mt-1">
              ការ​គណនា <strong>រយៈទទឹង</strong> (ខាង​ជើង/ខាង​ត្បូង) គឺ <strong>ងាយ​ស្រួល</strong> — នាវិក​គ្រាន់​តែ​វាស់​កម្ពស់​នៃ <strong>ព្រះអាទិត្យ</strong> ឬ <strong>ផ្កាយខាងជើង</strong>។
            </p>
          </div>
        </div>
      </div>

      {/* The Longitude Problem */}
      <div className="rounded-xl border-2 border-rose-600 bg-rose-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Anchor className="w-5 h-5 text-rose-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-rose-900">The Longitude Problem</div>
            <div className="font-khmer text-base text-rose-900 leading-loose">បញ្ហារយៈបណ្តោយ</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              Calculating <strong>East/West</strong> was <strong>nearly impossible</strong> at sea — because the Earth is constantly <strong>spinning</strong>.
            </>
          }
          kh={
            <>
              ការ​គណនា <strong>ខាង​កើត/ខាង​លិច</strong> គឺ <strong>ស្ទើរ​តែ​មិន​អាច​ធ្វើ​ទៅ​បាន</strong> នៅ​លើ​សមុទ្រ — ព្រោះ​ផែនដី​កំពុង​តែ <strong>បង្វិល</strong> ជា​និច្ច។
            </>
          }
        />
        <div className="mt-2 rounded-md bg-white border-l-4 border-l-rose-500 border border-rose-200 p-2">
          <p className="text-sm font-bold text-slate-900 leading-snug">
            To know your longitude, you must know <em>exactly</em> what time it is back at the Prime Meridian.
          </p>
          <p className="text-sm font-bold text-slate-900 font-khmer leading-loose mt-1">
            ដើម្បី​ដឹង​រយៈ​បណ្តោយ​របស់​អ្នក អ្នក​ត្រូវ​ដឹង​ម៉ោង <em>ត្រឹម​ត្រូវ</em> នៅ​ឯ​ខ្សែ​មេដ្យាន​ទី​សូន្យ។
          </p>
        </div>
      </div>

      {/* The Solution */}
      <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <Clock className="w-5 h-5 text-emerald-700" aria-hidden="true" />
          <div className="leading-tight">
            <div className="font-bold text-base text-emerald-900">The Solution · 1700s</div>
            <div className="font-khmer text-base text-emerald-900 leading-loose">ដំណោះស្រាយ · សតវត្សរ៍ទី ១៨</div>
          </div>
        </div>
        <BilingualBlock
          en={
            <>
              In the <strong>1700s</strong>, a clockmaker named <strong>John Harrison</strong> invented the <strong>Marine Chronometer</strong> — a clock that could keep <em>perfect</em> time on a rocking ship.
            </>
          }
          kh={
            <>
              នៅ​សតវត្សរ៍​ទី <strong>១៨</strong> ជាង​ធ្វើ​នាឡិកា​ម្នាក់​ឈ្មោះ <strong>ចន ហារីសុន</strong> បាន​បង្កើត <strong>នាឡិកា​សមុទ្រ</strong> — នាឡិកា​ដែល​អាច​រក្សា​ម៉ោង <em>ពិត​ប្រាកដ</em> នៅ​លើ​នាវា​ដែល​រង្គើរ។
            </>
          }
        />

        {/* 15° per hour visual */}
        <ClockGearDiagram />

        <div className="mt-2 rounded-md border-l-4 border-l-emerald-600 bg-white border border-emerald-200 p-2">
          <p className="text-sm font-bold text-slate-900 leading-snug">
            The Earth spins <strong className="text-emerald-700">15° every hour</strong>. Knowing the exact time finally let humans <strong>map the world!</strong>
          </p>
          <p className="text-sm font-bold text-slate-900 font-khmer leading-loose mt-1">
            ផែនដី​បង្វិល <strong className="text-emerald-700">១៥° ក្នុង​មួយ​ម៉ោង</strong>។ ការ​ដឹង​ម៉ោង​ពិត​ប្រាកដ​បាន​អនុញ្ញាត​ឲ្យ​មនុស្ស​ជាតិ <strong>គូរ​ផែនទី​ពិភពលោក​បាន​ជា​ស្ថាពរ!</strong>
          </p>
        </div>
      </div>
    </ChartCard>
  );
}

// 24h clock face with 15° wedges per hour
function ClockGearDiagram() {
  return (
    <div
      className="mt-2 relative w-full h-32 rounded-md bg-white border border-emerald-300 overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 128" className="w-full h-full">
        {/* Clock face */}
        <circle cx="60" cy="64" r="44" fill="#fdf6e3" stroke="#0c1e3a" strokeWidth="1.5" />
        {/* 24 wedge ticks (every 15°) */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 - 90) * (Math.PI / 180);
          const x1 = 60 + 36 * Math.cos(a);
          const y1 = 64 + 36 * Math.sin(a);
          const x2 = 60 + 44 * Math.cos(a);
          const y2 = 64 + 44 * Math.sin(a);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 6 === 0 ? "#b45309" : "#475569"}
              strokeWidth={i % 6 === 0 ? 1.4 : 0.8}
            />
          );
        })}
        {/* Highlighted 1-hour wedge (15°) */}
        <path
          d="M 60 64 L 60 20 A 44 44 0 0 1 71.4 21.5 Z"
          fill="#10b981"
          opacity="0.45"
          stroke="#047857"
          strokeWidth="1.2"
        />
        {/* Center hands */}
        <line x1="60" y1="64" x2="60" y2="32" stroke="#0c1e3a" strokeWidth="2" />
        <line x1="60" y1="64" x2="78" y2="48" stroke="#0c1e3a" strokeWidth="1.5" />
        <circle cx="60" cy="64" r="3" fill="#0c1e3a" />
        {/* 15° label */}
        <text x="58" y="14" fontSize="10" fontWeight="bold" fill="#047857">15°</text>

        {/* Equation block on the right */}
        <g transform="translate(120, 30)">
          <rect x="0" y="0" width="112" height="68" rx="6" fill="#ecfdf5" stroke="#047857" strokeWidth="1" />
          <text x="56" y="18" fontSize="11" fontWeight="bold" fill="#064e3b" textAnchor="middle">
            1 hour = 15°
          </text>
          <text x="56" y="32" fontSize="9" fill="#064e3b" textAnchor="middle" fontFamily="Khmer OS, Hanuman, sans-serif">
            ១ ម៉ោង = ១៥°
          </text>
          <line x1="10" y1="40" x2="102" y2="40" stroke="#047857" strokeWidth="0.6" opacity="0.5" />
          <text x="56" y="54" fontSize="11" fontWeight="bold" fill="#064e3b" textAnchor="middle">
            24 h × 15° = 360°
          </text>
          <text x="56" y="64" fontSize="8" fill="#064e3b" textAnchor="middle" fontFamily="Khmer OS, Hanuman, sans-serif">
            ២៤ ម៉ោង × ១៥° = ៣៦០°
          </text>
        </g>

        {/* Globe-spinning hint icon */}
        <g transform="translate(8, 100)">
          <Globe2Mark />
        </g>
      </svg>
    </div>
  );
}

function Globe2Mark() {
  return (
    <g>
      <circle cx="8" cy="8" r="7" fill="none" stroke="#0c1e3a" strokeWidth="1" />
      <ellipse cx="8" cy="8" rx="3" ry="7" fill="none" stroke="#0c1e3a" strokeWidth="0.7" />
      <line x1="1" y1="8" x2="15" y2="8" stroke="#0c1e3a" strokeWidth="0.7" />
      <text x="20" y="11" fontSize="8" fontWeight="bold" fill="#0c1e3a">Earth spins · ផែនដីបង្វិល</text>
    </g>
  );
}
