import { type ComponentType } from "react";
import { Link } from "wouter";
import {
  Clock,
  Hourglass,
  Cog,
  Zap,
  Atom,
  Globe,
  Compass,
  ArrowLeft,
  Sparkles,
  History,
  Sun,
  Activity,
  Gauge,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  TECH-XX · Horology: The Scientific Study of Time
//          ហោរាសាស្ត្រ៖ ការសិក្សាវិទ្យាសាស្ត្រនៃការវាស់វែងពេលវេលា
//
//  1. The History of Measurement     · sundial → mechanical → quartz → atomic
//  2. Mechanical Horology            · 4 parts of a movement
//  3. Time & Physics                 · relativity + prime meridian
//
//  Aesthetic: Chronometer — deep watch-dial blue, brushed silver, gold accents,
//             precise geometric lines.
// ════════════════════════════════════════════════════════════════════════════

// Palette
const DIAL_DEEP = "#050d1a";
const DIAL = "#0a1828";
const DIAL_2 = "#0f243d";
const DIAL_3 = "#162a44";
const STEEL = "#94a3b8";
const STEEL_LIGHT = "#cbd5e1";
const STEEL_DARK = "#475569";
const GOLD = "#fbbf24";
const COPPER = "#fb923c";
const IVORY = "#fef9c3";

const PAGE_STYLE: React.CSSProperties = {
  backgroundImage:
    `radial-gradient(circle at 18% 10%, rgba(148, 163, 184, 0.07), transparent 45%),` +
    `radial-gradient(circle at 82% 88%, rgba(251, 191, 36, 0.05), transparent 50%),` +
    `linear-gradient(180deg, ${DIAL_DEEP} 0%, ${DIAL} 60%, ${DIAL_DEEP} 100%)`,
};

export default function HorologyPage() {
  const language = useLanguageStore((s) => s.language);
  const isKh = language === "kh";

  return (
    <div className="horology-page min-h-screen text-slate-100" style={PAGE_STYLE}>
      {/* Decorative tick-mark border */}
      <div className="relative">
        {/* Top brushed-steel hairline */}
        <div
          aria-hidden
          className="h-px w-full"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(203,213,225,0.4), transparent)",
          }}
        />

        <Hero isKh={isKh} />
        <HistorySection isKh={isKh} />
        <MechanicalSection isKh={isKh} />
        <PhysicsSection isKh={isKh} />
        <ClosingStrip isKh={isKh} />
      </div>

      <style>{`
        @keyframes horology-second {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes horology-tick {
          0%   { transform: rotate(-12deg); }
          25%  { transform: rotate(12deg); }
          50%  { transform: rotate(-12deg); }
          75%  { transform: rotate(12deg); }
          100% { transform: rotate(-12deg); }
        }
        @keyframes horology-balance {
          0%   { transform: rotate(-25deg); }
          50%  { transform: rotate(25deg); }
          100% { transform: rotate(-25deg); }
        }
        @keyframes horology-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes horology-spin-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="horology-"],
          svg [style*="animation"],
          svg g[style*="animation"] {
            animation: none !important;
          }
          /* Catch-all for inline-styled animated SVG groups on this page */
          .horology-page svg * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  HERO
// ════════════════════════════════════════════════════════════════════════════

function Hero({ isKh }: { isKh: boolean }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to home"}</span>
      </Link>

      {/* Tech badge */}
      <div className="flex items-center justify-center mb-5">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-mono tracking-[0.25em] uppercase shadow-sm"
          style={{
            color: GOLD,
            borderColor: "rgba(251,191,36,0.4)",
            background: "rgba(251,191,36,0.06)",
          }}
        >
          <Hourglass className="w-3.5 h-3.5" />
          Horology · ហោរាសាស្ត្រ
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-3 ${
              isKh ? "font-khmer leading-loose" : ""
            }`}
          >
            {isKh ? (
              <>
                <span className="text-white">ហោរាសាស្ត្រ៖</span>{" "}
                <span style={{ color: GOLD }}>
                  ការសិក្សាវិទ្យាសាស្ត្រនៃការវាស់វែងពេលវេលា
                </span>
              </>
            ) : (
              <>
                <span className="text-white">Horology:</span>{" "}
                <span style={{ color: GOLD }}>
                  The Scientific Study of Time
                </span>
              </>
            )}
          </h1>

          <p
            className={`text-slate-300/90 text-base sm:text-lg max-w-2xl leading-relaxed mb-5 ${
              isKh ? "font-khmer leading-loose" : ""
            }`}
          >
            {isKh
              ? "ពេលវេលាគឺជាសារធាតុដែលមើលមិនឃើញ — ប៉ុន្តែមនុស្សជាតិបានអភិវឌ្ឍឧបករណ៍ដើម្បីទាក់ចាប់វាក្នុងរយៈពេលជាង ៥,០០០ ឆ្នាំ ចាប់ពីស្រមោលលើដី រហូតដល់ការរំញ័ររបស់អាតូម។"
              : "Time is an invisible substance — yet for over 5,000 years humanity has built ever more precise instruments to capture it, from a shadow on the ground to the vibration of a single atom."}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Pill icon={Sun} label="Sundial · សន្ទស្សន៍ថ្ងៃ" />
            <Pill icon={Cog} label="Escapement · ម៉ាស៊ីនបញ្ចេញ" />
            <Pill icon={Zap} label="Quartz · កែវកាវ" />
            <Pill icon={Atom} label="Atomic · អាតូម" />
          </div>
        </div>

        {/* Animated dial */}
        <div className="flex justify-center lg:justify-end">
          <DialFace size={240} />
        </div>
      </div>
    </section>
  );
}

function Pill({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] text-slate-200"
      style={{
        borderColor: "rgba(148,163,184,0.3)",
        background: "rgba(148,163,184,0.06)",
      }}
    >
      <Icon className="w-3.5 h-3.5" style={{ color: GOLD }} />
      <span>{label}</span>
    </span>
  );
}

function DialFace({ size = 240 }: { size?: number }) {
  const r = size / 2;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-hidden="true"
      className="drop-shadow-2xl"
    >
      <defs>
        <radialGradient id="hor-bezel" cx="0.3" cy="0.3" r="0.9">
          <stop offset="0" stopColor={STEEL_LIGHT} />
          <stop offset="0.5" stopColor={STEEL_DARK} />
          <stop offset="1" stopColor="#1e293b" />
        </radialGradient>
        <radialGradient id="hor-dial" cx="0.5" cy="0.45" r="0.7">
          <stop offset="0" stopColor={DIAL_3} />
          <stop offset="1" stopColor={DIAL_DEEP} />
        </radialGradient>
      </defs>

      {/* Outer bezel */}
      <circle cx={r} cy={r} r={r - 2} fill="url(#hor-bezel)" />
      {/* Inner dial face */}
      <circle cx={r} cy={r} r={r - 14} fill="url(#hor-dial)" />
      {/* Inner hairline */}
      <circle
        cx={r}
        cy={r}
        r={r - 14}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.6"
        opacity="0.5"
      />

      {/* Hour ticks (60 minute ticks + 12 hour marks) */}
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i * 6 * Math.PI) / 180;
        const isHour = i % 5 === 0;
        const isCardinal = i % 15 === 0;
        const inner = r - (isHour ? 30 : 22);
        const outer = r - 18;
        const x1 = r + Math.sin(a) * inner;
        const y1 = r - Math.cos(a) * inner;
        const x2 = r + Math.sin(a) * outer;
        const y2 = r - Math.cos(a) * outer;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isHour ? GOLD : STEEL}
            strokeWidth={isCardinal ? 2.5 : isHour ? 1.6 : 0.8}
            opacity={isHour ? 0.95 : 0.55}
            strokeLinecap="round"
          />
        );
      })}

      {/* Roman numerals at cardinal positions */}
      {[
        { n: "XII", a: 0 },
        { n: "III", a: 90 },
        { n: "VI", a: 180 },
        { n: "IX", a: 270 },
      ].map(({ n, a }) => {
        const ar = (a * Math.PI) / 180;
        const dist = r - 42;
        const x = r + Math.sin(ar) * dist;
        const y = r - Math.cos(ar) * dist + 4;
        return (
          <text
            key={n}
            x={x}
            y={y}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={IVORY}
            style={{ fontFamily: "Georgia, serif" }}
          >
            {n}
          </text>
        );
      })}

      {/* Sub-dial (small seconds at 6 o'clock) */}
      <g transform={`translate(${r} ${r + 28})`}>
        <circle r="22" fill={DIAL_DEEP} stroke={STEEL_DARK} strokeWidth="0.8" />
        <text
          y="-8"
          textAnchor="middle"
          fontSize="6"
          fill={STEEL}
          letterSpacing="1"
        >
          SECONDS
        </text>
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-15"
          stroke={GOLD}
          strokeWidth="0.8"
          strokeLinecap="round"
          style={{
            transformOrigin: "0 0",
            animation: "horology-second 60s linear infinite",
          }}
        />
        <circle r="1.5" fill={GOLD} />
      </g>

      {/* Hour hand (frozen at ~10:10 — the classic watch-ad time) */}
      <g
        transform={`rotate(-60 ${r} ${r})`}
        style={{ transformOrigin: `${r}px ${r}px` }}
      >
        <rect
          x={r - 2}
          y={r - 50}
          width="4"
          height="50"
          rx="1.5"
          fill={STEEL_LIGHT}
        />
      </g>
      {/* Minute hand */}
      <g
        transform={`rotate(60 ${r} ${r})`}
        style={{ transformOrigin: `${r}px ${r}px` }}
      >
        <rect
          x={r - 1.5}
          y={r - 75}
          width="3"
          height="75"
          rx="1"
          fill={STEEL_LIGHT}
        />
      </g>
      {/* Center pin */}
      <circle cx={r} cy={r} r="5" fill={GOLD} />
      <circle cx={r} cy={r} r="1.5" fill={DIAL_DEEP} />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable Section header (matches the chronometer aesthetic)
// ════════════════════════════════════════════════════════════════════════════

function SectionHeader({
  spec,
  en,
  kh,
  isKh,
  Icon,
}: {
  spec: string;
  en: string;
  kh: string;
  isKh: boolean;
  Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center border"
          style={{
            background: "rgba(251,191,36,0.1)",
            borderColor: "rgba(251,191,36,0.45)",
          }}
        >
          <Icon className="w-4 h-4" style={{ color: GOLD }} />
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase"
          style={{ color: GOLD }}
        >
          {spec}
        </span>
        <div
          className="h-px flex-1"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(251,191,36,0.4), transparent)",
          }}
        />
      </div>
      <h2
        className={`text-2xl sm:text-3xl font-display font-bold text-white leading-tight ${
          isKh ? "font-khmer leading-loose" : ""
        }`}
      >
        {isKh ? kh : en}
      </h2>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-400 mt-1">
        <span className="uppercase tracking-[0.18em] font-bold">{en}</span>
        <span className="opacity-60">·</span>
        <span className="font-khmer text-sm">{kh}</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 1 — History of Measurement (timeline)
// ════════════════════════════════════════════════════════════════════════════

function HistorySection({ isKh }: { isKh: boolean }) {
  const items: HistoryItem[] = [
    {
      id: "sundial",
      eraEn: "c. 1500 BCE",
      eraKh: "ប្រ.ស.ម. ១៥០០",
      titleEn: "Sundials & Water Clocks",
      titleKh: "នាឡិកាស្រមោល និងនាឡិកាទឹក",
      tagEn: "Nature-driven",
      tagKh: "ដោយធម្មជាតិ",
      bodyEn:
        "Ancient civilisations used the sun and water to track intervals. A vertical gnomon cast a shadow that swept across a marked stone — when the shadow reached a notch, an hour had passed. At night, water dripped at a steady rate from one vessel to another, with marked levels acting as the clock face.",
      bodyKh:
        "អរិយធម៌បុរាណប្រើព្រះអាទិត្យ និងទឹក ដើម្បីតាមដានចន្លោះពេល។ ឈើបញ្ឈរបោះស្រមោលឆ្លងកាត់ថ្មដែលមានសញ្ញា — នៅពេលស្រមោលឈានដល់ស្នាមឆ្លាក់ ម៉ោងមួយបានកន្លងផុតទៅ។ នៅពេលយប់ ទឹកស្រក់ដោយល្បឿនថេរពីភាជន៍មួយទៅភាជន៍មួយទៀត ដោយកម្រិតដែលបានសម្គាល់ជាមុខនាឡិកា។",
      Icon: Sun,
      accent: COPPER,
      visual: <SundialGlyph />,
    },
    {
      id: "escapement",
      eraEn: "c. 1300 CE",
      eraKh: "គ.ស. ១៣០០",
      titleEn: "Mechanical Escapements",
      titleKh: "ម៉ាស៊ីនបញ្ចេញមេកានិច",
      tagEn: "Gears & Springs",
      tagKh: "ស្ពឺ និងស្ព្រីង",
      bodyEn:
        "Medieval European clockmakers invented the escapement: a tiny wheel with teeth that 'escape' one at a time, regulated by a swinging weight or coiled spring. Energy stored in the spring is released in equal, ticking pulses — the first machines that truly counted time, not just measured it.",
      bodyKh:
        "ជាងធ្វើនាឡិកាអឺរ៉ុបសម័យកណ្តាលបានបង្កើតម៉ាស៊ីនបញ្ចេញ៖ កង់តូចមួយដែលមានធ្មេញ «បញ្ចេញ» ម្តងមួយ ដោយត្រួតពិនិត្យដោយទម្ងន់ងើបទៅមកឬដោយស្ព្រីងរុំ។ ថាមពលដែលរក្សាទុកក្នុងស្ព្រីងត្រូវបានបញ្ចេញជាជីពចរស្មើគ្នាៗ — ម៉ាស៊ីនទីមួយដែលរាប់ពេលវេលាពិតៗ មិនត្រឹមតែវាស់វា។",
      Icon: Cog,
      accent: GOLD,
      visual: <EscapementGlyph />,
    },
    {
      id: "quartz",
      eraEn: "1969",
      eraKh: "ឆ្នាំ ១៩៦៩",
      titleEn: "Quartz Oscillation",
      titleKh: "ការរំញ័រកែវកាវ",
      tagEn: "Crystal vibration",
      tagKh: "ការរំញ័រគ្រីស្តាល់",
      bodyEn:
        "Apply a tiny voltage to a quartz crystal cut in the shape of a tuning fork and it vibrates at exactly 32,768 times per second. Divide that signal by powers of two and you get one perfect tick per second — accurate, cheap, battery-powered, and inside almost every wristwatch made today.",
      bodyKh:
        "ប្រើវ៉ុលតិចតួចលើគ្រីស្តាល់កែវកាវដែលកាត់ជាទម្រង់សម,ឯកអុក វារំញ័រនៅ ៣២,៧៦៨ ដងក្នុងមួយវិនាទីយ៉ាងជាក់លាក់។ ចែកសញ្ញានោះដោយចំនួនពីរ ហើយអ្នកនឹងទទួលបានចង្វាក់មួយក្នុងមួយវិនាទី — ជាក់លាក់ ថោក ដំណើរការដោយថ្ម និងមាននៅក្នុងនាឡិកាដៃស្ទើរតែគ្រប់ប្រភេទដែលផលិតសព្វថ្ងៃនេះ។",
      Icon: Zap,
      accent: "#22d3ee",
      visual: <QuartzGlyph />,
    },
    {
      id: "atomic",
      eraEn: "1955 →",
      eraKh: "ឆ្នាំ ១៩៥៥ →",
      titleEn: "Atomic Clocks",
      titleKh: "នាឡិកាអាតូម",
      tagEn: "GPS depends on this",
      tagKh: "GPS ពឹងផ្អែកលើនេះ",
      bodyEn:
        "An atomic clock counts the 9,192,631,770 microwave vibrations a caesium atom makes every second. The result is so precise it would lose only one second over 100 million years. Every GPS satellite carries one — and your phone's location depends on comparing signals from four of them at once.",
      bodyKh:
        "នាឡិកាអាតូមរាប់ការរំញ័រមីក្រូវេវ ៩,១៩២,៦៣១,៧៧០ ដងដែលអាតូមសេស៊ូមធ្វើក្នុងមួយវិនាទី។ លទ្ធផលគឺជាក់លាក់ខ្លាំងណាស់ វានឹងបាត់បង់តែមួយវិនាទីប៉ុណ្ណោះក្នុងរយៈពេល ១០០ លានឆ្នាំ។ ផ្កាយរណប GPS គ្រប់ៗមួយដឹកវាមួយ — ហើយទីតាំងទូរស័ព្ទរបស់អ្នក ពឹងផ្អែកលើការប្រៀបធៀបសញ្ញាពីបួននៃវានៅពេលតែមួយ។",
      Icon: Atom,
      accent: "#a78bfa",
      visual: <AtomicGlyph />,
    },
  ];

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      data-testid="history-of-measurement"
    >
      <SectionHeader
        spec="01 · TIMELINE"
        en="The History of Measurement"
        kh="ប្រវត្តិនៃការវាស់វែង"
        isKh={isKh}
        Icon={History}
      />

      <p
        className={`text-slate-300/85 text-sm max-w-3xl mb-8 ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh
          ? "ក្នុងរយៈពេល ៣,៥០០ ឆ្នាំ វិធីសាស្ត្ររបស់យើងក្នុងការវាស់ពេលវេលាបានឆ្លងកាត់ការផ្លាស់ប្តូរធំៗបួន — ពីធម្មជាតិ ទៅមេកានិច ទៅអេឡិចត្រូនិក ទៅអាតូម។"
          : "Across 3,500 years our methods of measuring time have passed through four great revolutions — from nature, to mechanics, to electronics, to atoms."}
      </p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical thread (decorative — kept outside <ol> for valid list semantics) */}
        <div
          aria-hidden
          className="absolute left-[18px] top-2 bottom-2 w-px pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(251,191,36,0.5), rgba(148,163,184,0.2), rgba(251,191,36,0.3))",
          }}
        />

        <ol className="relative space-y-5">
          {items.map((item) => (
            <HistoryCard key={item.id} item={item} isKh={isKh} />
          ))}
        </ol>
      </div>
    </section>
  );
}

type HistoryItem = {
  id: string;
  eraEn: string;
  eraKh: string;
  titleEn: string;
  titleKh: string;
  tagEn: string;
  tagKh: string;
  bodyEn: string;
  bodyKh: string;
  Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  visual: React.ReactNode;
};

function HistoryCard({ item, isKh }: { item: HistoryItem; isKh: boolean }) {
  const { Icon } = item;
  return (
    <li
      className="relative pl-12"
      data-testid={`history-${item.id}`}
    >
      {/* Node */}
      <div
        className="absolute left-0 top-2 w-9 h-9 rounded-full border-2 flex items-center justify-center z-10 shadow-lg"
        style={{
          background: DIAL_DEEP,
          borderColor: item.accent,
          boxShadow: `0 0 18px ${item.accent}33`,
        }}
      >
        <Icon className="w-4 h-4" style={{ color: item.accent }} />
      </div>

      <article
        className="rounded-2xl border overflow-hidden"
        style={{
          borderColor: "rgba(148,163,184,0.25)",
          background: `linear-gradient(180deg, ${DIAL_2}cc, ${DIAL}f0)`,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_180px]">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="font-mono text-[10px] tracking-[0.18em] uppercase font-bold"
                style={{ color: item.accent }}
              >
                {item.eraEn}
              </span>
              <span className="opacity-60 text-slate-500">·</span>
              <span
                className="font-khmer text-xs"
                style={{ color: item.accent }}
              >
                {item.eraKh}
              </span>
            </div>

            <h3
              className={`font-display font-bold text-white text-lg leading-snug mb-1 ${
                isKh ? "font-khmer leading-loose" : ""
              }`}
            >
              {isKh ? item.titleKh : item.titleEn}
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-400 mb-3">
              <span className="uppercase tracking-[0.18em] font-bold">
                {item.titleEn}
              </span>
              <span className="opacity-60">·</span>
              <span className="font-khmer text-xs">{item.titleKh}</span>
            </div>

            <p
              className={`text-slate-200/90 text-sm mb-3 ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {isKh ? item.bodyKh : item.bodyEn}
            </p>

            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px]"
              style={{
                color: item.accent,
                borderColor: `${item.accent}66`,
                background: `${item.accent}10`,
              }}
            >
              <span className="uppercase tracking-[0.15em] font-bold">
                {item.tagEn}
              </span>
              <span className="opacity-60">·</span>
              <span className="font-khmer text-xs">{item.tagKh}</span>
            </span>
          </div>

          {/* Visual */}
          <div
            className="hidden md:flex items-center justify-center p-3 border-l"
            style={{ borderColor: "rgba(148,163,184,0.18)" }}
          >
            {item.visual}
          </div>
        </div>
      </article>
    </li>
  );
}

// ─── Tiny glyphs for the timeline ──────────────────────────────────────────

function SundialGlyph() {
  return (
    <svg
      viewBox="0 0 140 110"
      className="w-full h-auto"
      aria-hidden="true"
    >
      {/* Ground */}
      <ellipse cx="70" cy="92" rx="56" ry="6" fill={DIAL_3} opacity="0.7" />
      {/* Stone base */}
      <path
        d="M 30 92 L 110 92 L 102 86 L 38 86 Z"
        fill={STEEL_DARK}
        opacity="0.7"
      />
      {/* Hour ticks on the dial */}
      {[150, 165, 180, 195, 210, 225, 240, 255].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        const x1 = 70 + Math.cos(a) * 38;
        const y1 = 86 + Math.sin(a) * 38;
        const x2 = 70 + Math.cos(a) * 32;
        const y2 = 86 + Math.sin(a) * 32;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={GOLD}
            strokeWidth={i === 4 ? 2 : 1}
            opacity="0.8"
          />
        );
      })}
      {/* Gnomon (vertical pin) */}
      <polygon points="68,86 72,86 70,32" fill={GOLD} />
      {/* Cast shadow */}
      <polygon points="70,86 90,86 70,40" fill={DIAL_DEEP} opacity="0.55" />
      {/* Sun */}
      <circle cx="22" cy="22" r="9" fill={COPPER} />
      <circle cx="22" cy="22" r="9" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
        const a = (d * Math.PI) / 180;
        return (
          <line
            key={d}
            x1={22 + Math.cos(a) * 12}
            y1={22 + Math.sin(a) * 12}
            x2={22 + Math.cos(a) * 17}
            y2={22 + Math.sin(a) * 17}
            stroke={COPPER}
            strokeWidth="1.2"
          />
        );
      })}
    </svg>
  );
}

function EscapementGlyph() {
  return (
    <svg viewBox="0 0 140 110" className="w-full h-auto" aria-hidden="true">
      {/* Mainspring barrel (left) */}
      <circle cx="32" cy="55" r="20" fill={DIAL_3} stroke={GOLD} strokeWidth="1" />
      <g style={{ transformOrigin: "32px 55px", animation: "horology-spin 8s linear infinite" }}>
        <path
          d="M 32 55 m -14 0 a 14 14 0 0 1 28 0 a 11 11 0 0 1 -22 0 a 8 8 0 0 1 16 0 a 5 5 0 0 1 -10 0"
          fill="none"
          stroke={GOLD}
          strokeWidth="1.2"
        />
        <circle cx="32" cy="55" r="2" fill={GOLD} />
      </g>

      {/* Linking shaft */}
      <line x1="52" y1="55" x2="68" y2="55" stroke={STEEL} strokeWidth="1" opacity="0.5" />

      {/* Escape wheel (centre) */}
      <g style={{ transformOrigin: "82px 55px", animation: "horology-spin 4s linear infinite" }}>
        <g>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            const x = 82 + Math.cos(a) * 18;
            const y = 55 + Math.sin(a) * 18;
            const x2 = 82 + Math.cos(a + 0.18) * 13;
            const y2 = 55 + Math.sin(a + 0.18) * 13;
            return (
              <polygon
                key={i}
                points={`${x},${y} ${x2},${y2} ${82 + Math.cos(a) * 11},${55 + Math.sin(a) * 11}`}
                fill={STEEL_LIGHT}
                stroke={STEEL_DARK}
                strokeWidth="0.4"
              />
            );
          })}
          <circle cx="82" cy="55" r="3" fill={GOLD} />
        </g>
      </g>

      {/* Pallet fork (top) */}
      <g
        style={{
          transformOrigin: "82px 28px",
          animation: "horology-tick 2s ease-in-out infinite",
        }}
      >
        <line x1="82" y1="28" x2="82" y2="40" stroke={STEEL_LIGHT} strokeWidth="2" strokeLinecap="round" />
        <polygon points="76,38 88,38 82,46" fill={STEEL_LIGHT} />
        <circle cx="82" cy="28" r="2" fill={GOLD} />
      </g>

      {/* Pendulum (bottom) */}
      <line x1="82" y1="55" x2="120" y2="98" stroke={STEEL} strokeWidth="0.8" opacity="0.5" />
      <g style={{ transformOrigin: "82px 28px", animation: "horology-tick 2s ease-in-out infinite" }}>
        <line x1="82" y1="55" x2="82" y2="95" stroke={STEEL_LIGHT} strokeWidth="1.2" />
        <circle cx="82" cy="100" r="6" fill={GOLD} />
      </g>
    </svg>
  );
}

function QuartzGlyph() {
  return (
    <svg viewBox="0 0 140 110" className="w-full h-auto" aria-hidden="true">
      {/* Outer can */}
      <rect x="34" y="12" width="72" height="84" rx="36" fill={STEEL_DARK} stroke={STEEL_LIGHT} strokeWidth="1" />
      <rect x="40" y="20" width="60" height="68" rx="30" fill={DIAL_DEEP} />

      {/* Tuning fork shape */}
      <g stroke="#22d3ee" strokeWidth="2.2" fill="none" strokeLinecap="round">
        <line x1="56" y1="34" x2="56" y2="68" />
        <line x1="84" y1="34" x2="84" y2="68" />
        <path d="M 56 34 Q 70 20 84 34" />
        <line x1="70" y1="68" x2="70" y2="84" />
        <path d="M 56 68 Q 70 76 84 68" />
      </g>

      {/* Vibration glow */}
      <g opacity="0.85">
        <line x1="50" y1="40" x2="48" y2="42" stroke="#22d3ee" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="90" y1="40" x2="92" y2="42" stroke="#22d3ee" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="50" y1="60" x2="46" y2="60" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="90" y1="60" x2="94" y2="60" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Pins */}
      <line x1="64" y1="96" x2="64" y2="106" stroke={STEEL_LIGHT} strokeWidth="2" />
      <line x1="76" y1="96" x2="76" y2="106" stroke={STEEL_LIGHT} strokeWidth="2" />

      {/* Frequency caption */}
      <text x="70" y="103" textAnchor="middle" fontSize="6" fill="#22d3ee" letterSpacing="1">
        32,768 Hz
      </text>
    </svg>
  );
}

function AtomicGlyph() {
  return (
    <svg viewBox="0 0 140 110" className="w-full h-auto" aria-hidden="true">
      {/* Outer field */}
      <circle cx="70" cy="55" r="45" fill="none" stroke={STEEL_DARK} strokeWidth="0.6" opacity="0.5" />

      {/* Three orbits with rotating electrons */}
      {[0, 60, 120].map((rot, i) => (
        <g
          key={i}
          transform={`rotate(${rot} 70 55)`}
          style={{
            transformOrigin: "70px 55px",
            animation: `${i % 2 === 0 ? "horology-spin" : "horology-spin-rev"} ${4 + i}s linear infinite`,
          }}
        >
          <ellipse
            cx="70"
            cy="55"
            rx="34"
            ry="13"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="0.9"
            opacity="0.8"
          />
          <circle cx="104" cy="55" r="2.6" fill="#a78bfa" />
        </g>
      ))}

      {/* Nucleus */}
      <circle cx="70" cy="55" r="7" fill="#a78bfa" />
      <circle cx="70" cy="55" r="7" fill="none" stroke={IVORY} strokeWidth="0.6" opacity="0.6" />
      <text x="70" y="58" textAnchor="middle" fontSize="7" fontWeight="700" fill={DIAL_DEEP}>
        Cs
      </text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 2 — Mechanical Horology (4 parts of a movement)
// ════════════════════════════════════════════════════════════════════════════

function MechanicalSection({ isKh }: { isKh: boolean }) {
  const parts: MechPart[] = [
    {
      id: "mainspring",
      number: "01",
      role: "Power Source",
      roleKh: "ប្រភពថាមពល",
      titleEn: "The Mainspring",
      titleKh: "ស្ព្រីងមេ",
      summaryEn: "Stored energy",
      summaryKh: "ថាមពលរក្សាទុក",
      bodyEn:
        "A long, flat coil of hardened steel inside a small barrel. When you wind your watch, you twist the spring tighter. As it slowly unwinds it releases the energy that drives the entire movement — an hour or so of winding can power the watch for two days.",
      bodyKh:
        "ស្ព្រីងដែករឹងវែងរុំក្នុងធុងតូចមួយ។ នៅពេលអ្នករុំនាឡិការបស់អ្នក អ្នករុំស្ព្រីងឱ្យតឹង។ ពេលវាលឿនលេចចេញ វាបញ្ចេញថាមពលដែលជំរុញម៉ាស៊ីនទាំងមូល — ការរុំមួយម៉ោងអាចផ្គត់ផ្គង់ថាមពលឱ្យនាឡិកាបានពីរថ្ងៃ។",
      Icon: Activity,
      accent: COPPER,
    },
    {
      id: "gear-train",
      number: "02",
      role: "Transmission",
      roleKh: "ការបញ្ជូន",
      titleEn: "The Gear Train",
      titleKh: "ខ្សែស្ពឺ",
      summaryEn: "Moves the energy",
      summaryKh: "ផ្ទេរថាមពល",
      bodyEn:
        "A precise chain of toothed wheels — typically four — that carries energy from the mainspring to the escapement. Each wheel turns at a different ratio so one shaft rotates the second hand once per minute, another the minute hand once per hour, and another the hour hand once per twelve hours.",
      bodyKh:
        "ខ្សែស្ពឺមានធ្មេញត្រឹមត្រូវ — ជាធម្មតាបួន — ដែលដឹកថាមពលពីស្ព្រីងមេទៅម៉ាស៊ីនបញ្ចេញ។ ស្ពឺនីមួយៗបង្វិលក្នុងសមាមាត្រខុសគ្នា ដូច្នេះស៊ីឡាំងមួយបង្វិលដៃវិនាទីម្តងក្នុងមួយនាទី មួយទៀតបង្វិលដៃនាទីម្តងក្នុងមួយម៉ោង ហើយមួយទៀតបង្វិលដៃម៉ោងម្តងក្នុងដប់ពីរម៉ោង។",
      Icon: Cog,
      accent: GOLD,
    },
    {
      id: "escapement",
      number: "03",
      role: "Escapement",
      roleKh: "ម៉ាស៊ីនបញ្ចេញ",
      titleEn: "The Heartbeat",
      titleKh: "ចង្វាក់បេះដូង",
      summaryEn: "Releases energy in equal parts",
      summaryKh: "បញ្ចេញថាមពលជាផ្នែកស្មើគ្នា",
      bodyEn:
        "A tiny gatekeeper. The escape wheel wants to spin freely under the spring's force, but a forked lever called the pallet fork blocks it — letting one tooth slip past with every swing of the balance wheel. That 'tick-tock' you hear is energy escaping in tiny, equal pulses — the regulator that turns raw force into reliable time.",
      bodyKh:
        "អ្នកការពារតូចមួយ។ កង់បញ្ចេញចង់បង្វិលដោយសេរីក្រោមកម្លាំងស្ព្រីង ប៉ុន្តែឆ្នុះមានសម,ដែលហៅថាឆ្នុះប៉ាឡែត ទប់វា — ឱ្យធ្មេញមួយរអិលឆ្លងកាត់ជាមួយការងើបនីមួយៗនៃកង់តុល្យភាព។ សំឡេង «ចង្វាក់» ដែលអ្នកឮនោះ គឺថាមពលកំពុងបញ្ចេញជាជីពចរតូចៗស្មើគ្នា — ឧបករណ៍គ្រប់គ្រងដែលបំប្លែងកម្លាំងឆៅទៅជាពេលវេលាដែលអាចទុកចិត្តបាន។",
      Icon: Zap,
      accent: "#22d3ee",
    },
    {
      id: "balance",
      number: "04",
      role: "Oscillator",
      roleKh: "ឧបករណ៍រំញ័រ",
      titleEn: "The Balance Wheel",
      titleKh: "កង់តុល្យភាព",
      summaryEn: "Swings to keep rhythm",
      summaryKh: "ងើបទៅមកដើម្បីរក្សាចង្វាក់",
      bodyEn:
        "A finely weighted wheel attached to a thin spiral spring (the hairspring). It swings back and forth at a fixed rate — typically four to ten times per second — and that swing is what the escapement counts. The regularity of the balance wheel is the soul of the watch's accuracy.",
      bodyKh:
        "កង់ដែលមានទម្ងន់ជាក់លាក់ភ្ជាប់នឹងស្ព្រីងស្ពៃរ៉ាល់ស្តើង (ហ្សែនស្ព្រីង)។ វាងើបទៅមកក្នុងល្បឿនថេរ — ជាធម្មតាបួនទៅដប់ដងក្នុងមួយវិនាទី — ហើយការងើបនោះគឺជាអ្វីដែលម៉ាស៊ីនបញ្ចេញរាប់។ ភាពទៀងទាត់នៃកង់តុល្យភាពគឺជាព្រលឹងនៃភាពជាក់លាក់របស់នាឡិកា។",
      Icon: Gauge,
      accent: "#a78bfa",
    },
  ];

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      data-testid="mechanical-horology"
    >
      <SectionHeader
        spec="02 · MOVEMENT"
        en="Mechanical Horology"
        kh="ហោរាសាស្ត្រមេកានិច"
        isKh={isKh}
        Icon={Cog}
      />

      <p
        className={`text-slate-300/85 text-sm max-w-3xl mb-6 ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh
          ? "ម៉ាស៊ីននាឡិកាមេកានិចមានផ្នែកសំខាន់បួន ដែលធ្វើការជាមួយគ្នាដើម្បីបំប្លែងថាមពលរក្សាទុក ទៅជាជីពចរស្មើគ្នាៗ។"
          : "A mechanical watch movement has four key parts working together — turning stored energy into evenly spaced pulses we call seconds."}
      </p>

      {/* Movement diagram */}
      <div
        className="rounded-2xl border p-5 mb-5"
        style={{
          borderColor: "rgba(251,191,36,0.25)",
          background: `linear-gradient(180deg, ${DIAL_2}cc, ${DIAL}f0)`,
        }}
      >
        <MovementDiagram />
        <p
          className={`text-center text-slate-400 text-xs mt-3 ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh
            ? "ថាមពលហូរពីឆ្វេងទៅស្តាំ៖ ស្ព្រីងមេ → ខ្សែស្ពឺ → ម៉ាស៊ីនបញ្ចេញ → កង់តុល្យភាព"
            : "Energy flows left to right: Mainspring → Gear Train → Escapement → Balance Wheel"}
        </p>
      </div>

      {/* 4-part grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {parts.map((p) => (
          <MechCard key={p.id} part={p} isKh={isKh} />
        ))}
      </div>
    </section>
  );
}

type MechPart = {
  id: string;
  number: string;
  role: string;
  roleKh: string;
  titleEn: string;
  titleKh: string;
  summaryEn: string;
  summaryKh: string;
  bodyEn: string;
  bodyKh: string;
  Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
};

function MechCard({ part, isKh }: { part: MechPart; isKh: boolean }) {
  const { Icon } = part;
  return (
    <article
      className="rounded-2xl border p-4 flex flex-col"
      style={{
        borderColor: `${part.accent}55`,
        background: `linear-gradient(180deg, ${DIAL_2}99, ${DIAL_DEEP}cc)`,
      }}
      data-testid={`mech-${part.id}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="font-mono text-[10px] tracking-[0.2em] font-bold"
          style={{ color: part.accent }}
        >
          {part.number}
        </span>
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center"
          style={{
            background: `${part.accent}1f`,
            border: `1px solid ${part.accent}66`,
          }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: part.accent }} />
        </div>
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0 text-[10px]">
          <span
            className="uppercase tracking-[0.18em] font-bold"
            style={{ color: part.accent }}
          >
            {part.role}
          </span>
          <span className="opacity-60" style={{ color: part.accent }}>·</span>
          <span className="font-khmer text-xs" style={{ color: part.accent }}>
            {part.roleKh}
          </span>
        </div>
      </div>

      <h4
        className={`font-display font-bold text-white text-base mb-0.5 ${
          isKh ? "font-khmer leading-loose" : ""
        }`}
      >
        {isKh ? part.titleKh : part.titleEn}
      </h4>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-[11px] text-slate-400 mb-2">
        <span className="uppercase tracking-[0.18em] font-bold">
          {part.titleEn}
        </span>
        <span className="opacity-60">·</span>
        <span className="font-khmer text-xs">{part.titleKh}</span>
      </div>

      <p
        className={`text-slate-200/85 text-xs mb-2 flex-1 ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? part.bodyKh : part.bodyEn}
      </p>

      <div
        className="rounded-md px-2.5 py-1 text-[10px] flex items-center gap-1.5 self-start"
        style={{ background: `${part.accent}15`, color: part.accent }}
      >
        <Sparkles className="w-3 h-3" />
        <span className="uppercase tracking-[0.15em] font-bold">
          {part.summaryEn}
        </span>
        <span className="opacity-60">·</span>
        <span className="font-khmer text-xs">{part.summaryKh}</span>
      </div>
    </article>
  );
}

function MovementDiagram() {
  return (
    <svg viewBox="0 0 600 180" className="w-full h-auto" aria-hidden="true">
      {/* Faint baseline */}
      <line
        x1="40"
        y1="100"
        x2="560"
        y2="100"
        stroke={STEEL_DARK}
        strokeWidth="0.5"
        strokeDasharray="3 4"
        opacity="0.5"
      />

      {/* MAINSPRING — left */}
      <g transform="translate(80 100)">
        <circle r="38" fill={DIAL_3} stroke={COPPER} strokeWidth="1.4" />
        <g style={{ transformOrigin: "0 0", animation: "horology-spin 12s linear infinite" }}>
          <path
            d="M 0 0 m -28 0 a 28 28 0 0 1 56 0 a 22 22 0 0 1 -44 0 a 17 17 0 0 1 34 0 a 12 12 0 0 1 -24 0 a 7 7 0 0 1 14 0"
            fill="none"
            stroke={COPPER}
            strokeWidth="1.5"
          />
          <circle r="3" fill={COPPER} />
        </g>
        <text y="55" textAnchor="middle" fontSize="9" fill={COPPER} fontWeight="700" letterSpacing="2">
          MAINSPRING
        </text>
        <text y="68" textAnchor="middle" fontSize="9" fill={COPPER} className="font-khmer">
          ស្ព្រីងមេ
        </text>
      </g>

      {/* arrow → */}
      <g transform="translate(140 100)">
        <line x1="0" y1="0" x2="40" y2="0" stroke={STEEL} strokeWidth="1" />
        <polygon points="40,0 34,-4 34,4" fill={STEEL} />
      </g>

      {/* GEAR TRAIN — three meshing gears */}
      <g transform="translate(220 100)">
        <Gear cx={0} cy={0} r={22} teeth={14} fill={DIAL_3} stroke={GOLD} dur={6} />
        <Gear cx={36} cy={-18} r={14} teeth={10} fill={DIAL_3} stroke={GOLD} dur={4} reverse />
        <Gear cx={36} cy={18} r={14} teeth={10} fill={DIAL_3} stroke={GOLD} dur={4} reverse />
        <text y="55" textAnchor="middle" fontSize="9" fill={GOLD} fontWeight="700" letterSpacing="2">
          GEAR TRAIN
        </text>
        <text y="68" textAnchor="middle" fontSize="9" fill={GOLD} className="font-khmer">
          ខ្សែស្ពឺ
        </text>
      </g>

      {/* arrow → */}
      <g transform="translate(290 100)">
        <line x1="0" y1="0" x2="40" y2="0" stroke={STEEL} strokeWidth="1" />
        <polygon points="40,0 34,-4 34,4" fill={STEEL} />
      </g>

      {/* ESCAPEMENT */}
      <g transform="translate(380 100)">
        {/* escape wheel */}
        <g style={{ transformOrigin: "0 0", animation: "horology-spin 5s linear infinite" }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            const x = Math.cos(a) * 22;
            const y = Math.sin(a) * 22;
            const x2 = Math.cos(a + 0.18) * 16;
            const y2 = Math.sin(a + 0.18) * 16;
            return (
              <polygon
                key={i}
                points={`${x},${y} ${x2},${y2} ${Math.cos(a) * 13},${Math.sin(a) * 13}`}
                fill={STEEL_LIGHT}
                stroke={STEEL_DARK}
                strokeWidth="0.4"
              />
            );
          })}
          <circle r="3" fill="#22d3ee" />
        </g>
        {/* pallet fork */}
        <g
          transform="translate(0 -38)"
          style={{
            transformOrigin: "0 0",
            animation: "horology-tick 1s ease-in-out infinite",
          }}
        >
          <line x1="0" y1="0" x2="0" y2="14" stroke={STEEL_LIGHT} strokeWidth="2" strokeLinecap="round" />
          <polygon points="-6,12 6,12 0,20" fill={STEEL_LIGHT} />
          <circle r="2" fill="#22d3ee" />
        </g>
        <text y="55" textAnchor="middle" fontSize="9" fill="#22d3ee" fontWeight="700" letterSpacing="2">
          ESCAPEMENT
        </text>
        <text y="68" textAnchor="middle" fontSize="9" fill="#22d3ee" className="font-khmer">
          ម៉ាស៊ីនបញ្ចេញ
        </text>
      </g>

      {/* arrow → */}
      <g transform="translate(420 100)">
        <line x1="0" y1="0" x2="40" y2="0" stroke={STEEL} strokeWidth="1" />
        <polygon points="40,0 34,-4 34,4" fill={STEEL} />
      </g>

      {/* BALANCE WHEEL */}
      <g transform="translate(510 100)">
        <g
          style={{
            transformOrigin: "0 0",
            animation: "horology-balance 1.2s ease-in-out infinite",
          }}
        >
          <circle r="28" fill="none" stroke="#a78bfa" strokeWidth="2" />
          <line x1="-28" y1="0" x2="28" y2="0" stroke="#a78bfa" strokeWidth="2" />
          <line x1="0" y1="-28" x2="0" y2="28" stroke="#a78bfa" strokeWidth="2" />
          {/* hairspring spiral */}
          <path
            d="M 0 0 m 0 -4 a 4 4 0 1 1 -3 -2.5 a 7 7 0 1 1 -1 -8 a 10 10 0 1 1 5 -10"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="0.8"
            opacity="0.85"
          />
          <circle r="3" fill="#a78bfa" />
        </g>
        <text y="55" textAnchor="middle" fontSize="9" fill="#a78bfa" fontWeight="700" letterSpacing="2">
          BALANCE
        </text>
        <text y="68" textAnchor="middle" fontSize="9" fill="#a78bfa" className="font-khmer">
          កង់តុល្យភាព
        </text>
      </g>
    </svg>
  );
}

function Gear({
  cx,
  cy,
  r,
  teeth,
  fill,
  stroke,
  dur,
  reverse = false,
}: {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  fill: string;
  stroke: string;
  dur: number;
  reverse?: boolean;
}) {
  const toothH = 4;
  const points: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i * Math.PI) / teeth;
    const rad = i % 2 === 0 ? r + toothH : r;
    points.push(`${Math.cos(a) * rad},${Math.sin(a) * rad}`);
  }
  return (
    <g
      transform={`translate(${cx} ${cy})`}
      style={{
        transformOrigin: `${cx}px ${cy}px`,
        animation: `${reverse ? "horology-spin-rev" : "horology-spin"} ${dur}s linear infinite`,
      }}
    >
      <polygon points={points.join(" ")} fill={fill} stroke={stroke} strokeWidth="1" />
      <circle r={r * 0.45} fill="none" stroke={stroke} strokeWidth="0.6" opacity="0.6" />
      <circle r="2" fill={stroke} />
    </g>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 3 — Time & Physics
// ════════════════════════════════════════════════════════════════════════════

function PhysicsSection({ isKh }: { isKh: boolean }) {
  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      data-testid="time-and-physics"
    >
      <SectionHeader
        spec="03 · UNIVERSE"
        en="Time & Physics"
        kh="ពេលវេលា និងរូបវិទ្យា"
        isKh={isKh}
        Icon={Sparkles}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Relativity card */}
        <article
          className="rounded-2xl border overflow-hidden"
          style={{
            borderColor: "rgba(167,139,250,0.35)",
            background: `linear-gradient(180deg, ${DIAL_2}cc, ${DIAL_DEEP}f0)`,
          }}
          data-testid="physics-relativity"
        >
          <div className="px-5 pt-5 pb-3 flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(167,139,250,0.12)",
                border: "1px solid rgba(167,139,250,0.45)",
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "#a78bfa" }} />
            </div>
            <div>
              <h3
                className={`font-display font-bold text-white text-lg ${
                  isKh ? "font-khmer leading-loose" : ""
                }`}
              >
                {isKh ? "ទ្រឹស្តីទាក់ទង" : "Relativity"}
              </h3>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-[11px] text-slate-400">
                <span className="uppercase tracking-[0.18em] font-bold">
                  Relativity
                </span>
                <span className="opacity-60">·</span>
                <span className="font-khmer text-xs">ទ្រឹស្តីទាក់ទង</span>
              </div>
            </div>
          </div>

          <div className="px-5 pb-3">
            <RelativityGlyph />
          </div>

          <div className="px-5 pb-5 space-y-3">
            <p
              className={`text-slate-200/90 text-sm ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {isKh
                ? "ពេលវេលាមិនមែនជាសារធាតុដាច់ខាតទេ — វាអាចផ្លាស់ប្តូរបាន។ ក្នុងឆ្នាំ ១៩០៥ និង ១៩១៥ លោក Albert Einstein បានបង្ហាញថា ពេលវេលាដំណើរការ យឺត ៗ សម្រាប់នាឡិកាមួយដែលធ្វើដំណើរលឿន ឬសម្រាប់នាឡិកាមួយដែលនៅកន្លែងដែលទំនាញខ្លាំង។"
                : "Time is not absolute — it can change. In 1905 and 1915, Albert Einstein showed that time runs slower for a clock that is moving fast, or for a clock sitting where gravity is stronger."}
            </p>
            <p
              className={`text-slate-200/90 text-sm ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {isKh
                ? "ផ្កាយរណប GPS ត្រូវបន្ថែមការកែតម្រូវប្រហែល ៣៨ មីក្រូវិនាទីក្នុងមួយថ្ងៃ ព្រោះវាធ្វើដំណើរលឿន និងស្ថិតនៅក្នុងទំនាញខ្សោយជាងផ្ទៃផែនដី។ បើមិនអញ្ចឹងទេ ទីតាំង GPS របស់អ្នកនឹងខុសប្រហែល ១០ គីឡូម៉ែត្រក្នុងមួយថ្ងៃ។"
                : "GPS satellites need a daily correction of about 38 microseconds because they move fast and sit in weaker gravity than Earth's surface. Without that correction, your GPS location would drift by about 10 km every single day."}
            </p>
          </div>
        </article>

        {/* Prime Meridian card */}
        <article
          className="rounded-2xl border overflow-hidden"
          style={{
            borderColor: "rgba(251,191,36,0.35)",
            background: `linear-gradient(180deg, ${DIAL_2}cc, ${DIAL_DEEP}f0)`,
          }}
          data-testid="physics-prime-meridian"
        >
          <div className="px-5 pt-5 pb-3 flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: "rgba(251,191,36,0.12)",
                border: "1px solid rgba(251,191,36,0.45)",
              }}
            >
              <Globe className="w-4 h-4" style={{ color: GOLD }} />
            </div>
            <div>
              <h3
                className={`font-display font-bold text-white text-lg ${
                  isKh ? "font-khmer leading-loose" : ""
                }`}
              >
                {isKh ? "មេរីដៀនដើម" : "The Prime Meridian"}
              </h3>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-[11px] text-slate-400">
                <span className="uppercase tracking-[0.18em] font-bold">
                  Prime Meridian
                </span>
                <span className="opacity-60">·</span>
                <span className="font-khmer text-xs">មេរីដៀនដើម</span>
              </div>
            </div>
          </div>

          <div className="px-5 pb-3">
            <MeridianGlyph />
          </div>

          <div className="px-5 pb-5 space-y-3">
            <p
              className={`text-slate-200/90 text-sm ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {isKh
                ? "ផែនដីបង្វិលម្តងគ្រប់ ២៤ ម៉ោង ដូច្នេះថ្ងៃត្រង់ប្រហែលមកដល់ពេលផ្សេងគ្នានៅទីកន្លែងផ្សេងគ្នា។ ក្នុងឆ្នាំ ១៨៨៤ ប្រទេស ២៥ បានយល់ស្របថា 0° លុងហ្ស៊ីទុដនឹងឆ្លងកាត់ Greenwich ប្រទេសអង់គ្លេស។"
                : "The Earth turns once every 24 hours, so noon arrives at different moments in different places. In 1884, twenty-five nations agreed that 0° longitude — the Prime Meridian — would pass through the Royal Observatory at Greenwich, England."}
            </p>
            <p
              className={`text-slate-200/90 text-sm ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {isKh
                ? "ផែនដីត្រូវបានបែងចែកជា ២៤ តំបន់ម៉ោង។ កម្ពុជាស្ថិតនៅ UTC+7 — មុន Greenwich ៧ ម៉ោង។ នៅពេលដែលនៅភ្នំពេញម៉ោងព្រឹក វានៅ Greenwich ម៉ោងពាក់កណ្តាលអាធ្រាត្រ។"
                : "Earth is divided into 24 time zones. Cambodia sits at UTC+7 — seven hours ahead of Greenwich. When it's morning in Phnom Penh, it's the middle of the night in London."}
            </p>
            <div
              className="rounded-md px-3 py-2 flex items-center gap-2"
              style={{
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.3)",
              }}
            >
              <Compass className="w-4 h-4 shrink-0" style={{ color: GOLD }} />
              <p
                className={`text-xs ${isKh ? "font-khmer leading-loose" : ""}`}
                style={{ color: IVORY }}
              >
                {isKh
                  ? "កម្ពុជា៖ UTC+7 · មុន Greenwich ៧ ម៉ោង"
                  : "Cambodia: UTC+7 · Seven hours ahead of Greenwich"}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function RelativityGlyph() {
  return (
    <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden="true">
      {/* Two clocks: stationary vs fast */}
      {/* Stationary */}
      <g transform="translate(70 65)">
        <circle r="34" fill={DIAL_DEEP} stroke={STEEL_LIGHT} strokeWidth="1.2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={Math.sin(a) * 28}
              y1={-Math.cos(a) * 28}
              x2={Math.sin(a) * 32}
              y2={-Math.cos(a) * 32}
              stroke={STEEL}
              strokeWidth="0.8"
            />
          );
        })}
        <line x1="0" y1="0" x2="0" y2="-22" stroke={STEEL_LIGHT} strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="0" x2="14" y2="-8" stroke={STEEL_LIGHT} strokeWidth="1.5" strokeLinecap="round" />
        <circle r="2" fill={GOLD} />
        <text y="55" textAnchor="middle" fontSize="9" fill={STEEL_LIGHT} fontWeight="700">
          AT REST · សម្រាក
        </text>
      </g>

      {/* Arrow */}
      <g transform="translate(150 65)">
        <line x1="0" y1="0" x2="20" y2="0" stroke={STEEL} strokeWidth="0.8" strokeDasharray="3 2" />
        <text y="-6" textAnchor="middle" fontSize="8" fill="#a78bfa" letterSpacing="1">
          GRAVITY · SPEED
        </text>
      </g>

      {/* Fast/strong gravity — same dial face but slower hand */}
      <g transform="translate(240 65)">
        <circle r="34" fill={DIAL_DEEP} stroke="#a78bfa" strokeWidth="1.2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={Math.sin(a) * 28}
              y1={-Math.cos(a) * 28}
              x2={Math.sin(a) * 32}
              y2={-Math.cos(a) * 32}
              stroke="#a78bfa"
              strokeWidth="0.8"
            />
          );
        })}
        {/* Hand pointing slightly behind */}
        <line x1="0" y1="0" x2="-6" y2="-22" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="0" x2="8" y2="-12" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
        <circle r="2" fill="#a78bfa" />
        {/* Glow ring suggesting gravity well */}
        <circle r="40" fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 3" />
        <text y="55" textAnchor="middle" fontSize="9" fill="#a78bfa" fontWeight="700">
          SLOWER · យឺតជាង
        </text>
      </g>
    </svg>
  );
}

function MeridianGlyph() {
  return (
    <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden="true">
      {/* Earth */}
      <circle cx="160" cy="65" r="55" fill={DIAL_3} stroke={STEEL_LIGHT} strokeWidth="1" />
      {/* Latitude lines */}
      {[-30, 0, 30].map((lat) => (
        <ellipse
          key={lat}
          cx="160"
          cy="65"
          rx="55"
          ry={55 * Math.cos((lat * Math.PI) / 180) * 0.3}
          fill="none"
          stroke={STEEL_DARK}
          strokeWidth="0.6"
          transform={`translate(0 ${lat * 0.7})`}
        />
      ))}
      {/* Longitude lines */}
      {[0, 30, 60, 90, 120, 150].map((lon) => (
        <ellipse
          key={lon}
          cx="160"
          cy="65"
          rx={55 * Math.abs(Math.sin((lon * Math.PI) / 180)) || 0.5}
          ry="55"
          fill="none"
          stroke={STEEL_DARK}
          strokeWidth="0.6"
          opacity="0.7"
        />
      ))}

      {/* Prime meridian (highlight) */}
      <line x1="160" y1="10" x2="160" y2="120" stroke={GOLD} strokeWidth="2" />

      {/* Greenwich pin */}
      <g transform="translate(160 32)">
        <circle r="3" fill={GOLD} />
        <circle r="6" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.6" />
        <text x="10" y="3" fontSize="9" fill={GOLD} fontWeight="700">
          0° · Greenwich
        </text>
      </g>

      {/* Cambodia pin */}
      <g transform="translate(195 70)">
        <circle r="3" fill={COPPER} />
        <text x="8" y="3" fontSize="9" fill={COPPER} fontWeight="700">
          UTC+7 · កម្ពុជា
        </text>
      </g>

      {/* Caption */}
      <text
        x="160"
        y="128"
        textAnchor="middle"
        fontSize="8"
        fill={STEEL}
        letterSpacing="1.5"
      >
        24 TIME ZONES · ២៤ តំបន់ម៉ោង
      </text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  CLOSING STRIP
// ════════════════════════════════════════════════════════════════════════════

function ClosingStrip({ isKh }: { isKh: boolean }) {
  return (
    <div
      className="border-t mt-8"
      style={{
        borderColor: "rgba(251,191,36,0.15)",
        background: "rgba(251,191,36,0.04)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <Clock
          className="w-8 h-8 mx-auto mb-3"
          style={{ color: GOLD, opacity: 0.7 }}
        />
        <p
          className={`text-slate-200/90 text-sm max-w-xl mx-auto ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "រាល់ពេលដែលអ្នកមើលនាឡិកាដៃ ឬគ្រាន់តែឆែកទូរស័ព្ទ — អ្នកកំពុងពឹងផ្អែកលើ ៥,០០០ ឆ្នាំនៃបញ្ញារបស់មនុស្សជាតិ ពីស្រមោលលើដី រហូតដល់ការរំញ័រនៅខាងក្នុងអាតូម។"
            : "Every time you check a wristwatch — or just glance at your phone — you are leaning on 5,000 years of human ingenuity, from a shadow on the ground to vibrations inside an atom."}
        </p>
      </div>
    </div>
  );
}
