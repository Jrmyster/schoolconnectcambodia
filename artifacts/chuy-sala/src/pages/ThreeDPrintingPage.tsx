import React, { useState } from "react";
import { type ComponentType } from "react";
import { Link } from "wouter";
import {
  Box,
  Printer,
  Layers,
  ArrowLeft,
  Sparkles,
  Wrench,
  HeartPulse,
  Home,
  Car,
  Cpu,
  FileCode,
  Flame,
  PlusSquare,
  Plus,
  Play,
  Scissors,
  Cuboid,
  Construction,
  Atom,
  Hexagon,
  Globe2,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { trackEvent } from "@/lib/analytics";

// ════════════════════════════════════════════════════════════════════════════
//  TECH-XX · 3D Printing: Manufacturing the Future
//  Aesthetic: Maker-space — carbon-fiber blacks, neon wireframes, concrete greys
// ════════════════════════════════════════════════════════════════════════════

// Palette
const CARBON = "#08090c";
const CARBON_2 = "#0d0f14";
const CARBON_3 = "#14171f";
const CONCRETE = "#3a3d45";
const CONCRETE_LIGHT = "#5a5e68";
const STEEL = "#94a3b8";
const STEEL_LIGHT = "#cbd5e1";
const NEON_CYAN = "#22d3ee";
const NEON_GREEN = "#4ade80";
const NEON_MAGENTA = "#ec4899";
const NEON_AMBER = "#fbbf24";
const IVORY = "#f5f5f4";

// ── Atomically-Precise-Manufacturing palette (deep-tech / void) ──────
const VOID = "#020410";          // near-black with a hint of indigo
const VOID_2 = "#0a0518";        // slightly raised void
const NEON_VIOLET = "#a855f7";   // primary glow
const NEON_INDIGO = "#6366f1";   // mid accent
const NEON_ELECTRIC = "#3b82f6"; // electric blue
const NEON_PURPLE_LIGHT = "#c084fc"; // highlight

const PAGE_STYLE: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(1100px 600px at 12% -8%, rgba(34,211,238,0.10), transparent 60%), " +
    "radial-gradient(900px 500px at 88% 12%, rgba(236,72,153,0.08), transparent 60%), " +
    "linear-gradient(180deg, #08090c 0%, #0d0f14 60%, #08090c 100%)",
  // Subtle carbon-fibre weave via a layered conic gradient is too heavy; use a
  // crisp stipple via background-size on a neutral layer instead.
  backgroundColor: CARBON,
};

// ════════════════════════════════════════════════════════════════════════════
//  ROOT
// ════════════════════════════════════════════════════════════════════════════

export default function ThreeDPrintingPage() {
  const language = useLanguageStore((s) => s.language);
  const isKh = language === "kh";

  return (
    <div
      className="threed-page min-h-screen text-slate-100"
      style={PAGE_STYLE}
    >
      {/* Top neon hairline */}
      <div
        aria-hidden
        className="h-[2px] w-full"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, ${NEON_CYAN}, ${NEON_MAGENTA}, ${NEON_CYAN}, transparent)`,
          opacity: 0.6,
        }}
      />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-cyan-300"
        >
          <ArrowLeft size={14} />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to home"}
        </Link>

        <Hero isKh={isKh} />

        <div className="mt-16 space-y-16">
          <HowItWorksSection isKh={isKh} />
          <SmallScaleSection isKh={isKh} />
          <MassiveScaleSection isKh={isKh} />
          <ClosingStrip isKh={isKh} />
          <APMSection isKh={isKh} />
        </div>
      </main>

      <style>{`
        @keyframes maker-print {
          0%   { transform: scaleY(0); transform-origin: bottom; }
          100% { transform: scaleY(1); transform-origin: bottom; }
        }
        @keyframes maker-pulse {
          0%, 100% { filter: drop-shadow(0 0 2px currentColor); opacity: 1; }
          50%      { filter: drop-shadow(0 0 8px currentColor); opacity: 0.7; }
        }
        @keyframes maker-extrude {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(2px); }
        }
        @keyframes maker-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes maker-traverse {
          0%   { transform: translateX(-58px); }
          50%  { transform: translateX(58px); }
          100% { transform: translateX(-58px); }
        }
        @keyframes maker-flicker {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.55; }
        }
        @keyframes maker-rise {
          from { transform: translateY(8px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }

        /* ── APM (Atomically Precise Manufacturing) animations ───── */
        @keyframes apm-border-pulse {
          0%, 100% {
            box-shadow:
              0 0 0 1px rgba(168,85,247,0.30),
              0 0 22px rgba(168,85,247,0.18),
              inset 0 0 22px rgba(99,102,241,0.06);
            border-color: rgba(168,85,247,0.45);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(59,130,246,0.40),
              0 0 38px rgba(59,130,246,0.28),
              inset 0 0 32px rgba(168,85,247,0.10);
            border-color: rgba(59,130,246,0.60);
          }
        }
        @keyframes apm-helix-flow {
          0%   { stroke-dashoffset: 0;   opacity: 0.85; }
          50%  { opacity: 1; }
          100% { stroke-dashoffset: -160; opacity: 0.85; }
        }
        @keyframes apm-grid-pulse {
          0%, 100% { opacity: 0.18; }
          50%      { opacity: 0.45; }
        }
        @keyframes apm-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes apm-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .threed-page svg *, .threed-page [style*="animation"] {
            animation: none !important;
          }
          .apm-card { animation: none !important; }
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
    <section className="grid items-center gap-10 lg:grid-cols-[1.4fr,1fr]">
      <div>
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold tracking-[0.18em]"
          style={{
            borderColor: `${NEON_CYAN}66`,
            backgroundColor: `${NEON_CYAN}14`,
            color: NEON_CYAN,
          }}
        >
          <Box size={13} />
          <span>3D PRINTING</span>
          <span style={{ color: STEEL }}>·</span>
          <span style={{ color: STEEL_LIGHT }}>ការបោះពុម្ពត្រីមាត្រ</span>
        </div>

        <h1
          className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl"
          style={{ color: IVORY }}
        >
          {isKh ? (
            <>
              ការបោះពុម្ពត្រីមាត្រ៖{" "}
              <span style={{ color: NEON_CYAN }}>
                ការផលិតសម្រាប់អនាគត
              </span>
            </>
          ) : (
            <>
              3D Printing:{" "}
              <span style={{ color: NEON_CYAN }}>
                Manufacturing the Future
              </span>
            </>
          )}
        </h1>

        <p
          className="mt-4 max-w-xl text-[15px] leading-relaxed"
          style={{ color: STEEL_LIGHT }}
        >
          {isKh
            ? "ផ្នែកមួយនៃរោងចក្ររបស់ថ្ងៃស្អែកនឹងសម្របខ្លួនទៅនឹងផ្ទះរបស់អ្នក — ឧបករណ៍មួយធ្វើពីភាគរយនៃលោហៈរលាយ ឬកុងក្រែតរាវ ដែលត្រូវបានបង្កើតឡើងជាស្រទាប់ៗ ដោយផ្ដើមចេញពីគំរូទ្រឹស្តីលើអេក្រង់ ទៅជាវត្ថុរូបវ័ន្ត។"
            : "A piece of tomorrow's factory will fit on your desk — a single machine that takes a digital model on a screen and turns it into a physical object, layer by molten layer. From custom wrenches to entire houses, additive manufacturing is rewriting how things are made."}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Pill icon={Layers} label="Additive" labelKh="ការបន្ថែម" color={NEON_CYAN} />
          <Pill icon={Wrench} label="Tools" labelKh="ឧបករណ៍" color={NEON_GREEN} />
          <Pill icon={HeartPulse} label="Medicine" labelKh="វេជ្ជសាស្ត្រ" color={NEON_MAGENTA} />
          <Pill icon={Home} label="Houses" labelKh="ផ្ទះ" color={NEON_AMBER} />
          <Pill icon={Car} label="Cars" labelKh="ឡាន" color={STEEL_LIGHT} />
        </div>
      </div>

      {/* Right: Animated print-bed graphic + Start Print button.
          The button bumps `printRunId`, which forces PrintBedHero to
          remount and replay the layered build-up animation from frame 0. */}
      <HeroPrinterPanel isKh={isKh} />
    </section>
  );
}

function HeroPrinterPanel({ isKh }: { isKh: boolean }) {
  // `printRunId` doubles as a React key — incrementing it forces
  // PrintBedHero to unmount + remount, restarting its CSS keyframes from 0.
  const [printRunId, setPrintRunId] = useState(0);

  const handleStartPrint = () => {
    setPrintRunId((n) => n + 1);
    // GA4 event so we can count how often students replay the demo.
    trackEvent({
      category: "Engagement",
      action: "start_print",
      label: "3d-printing-demo",
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 lg:items-end">
      {/* `key` makes React treat each click as a fresh component, which
          replays the animation deterministically across browsers. */}
      <PrintBedHero key={printRunId} />

      <button
        type="button"
        onClick={handleStartPrint}
        data-testid="start-print-button"
        className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-all hover:scale-[1.03] active:scale-95"
        style={{
          borderColor: `${NEON_CYAN}66`,
          backgroundColor: `${NEON_CYAN}14`,
          color: NEON_CYAN,
        }}
      >
        <Play size={13} fill="currentColor" />
        <span>{isKh ? "ចាប់ផ្ដើមការបោះពុម្ព" : "Start Print"}</span>
      </button>
    </div>
  );
}

function Pill({
  icon: Icon,
  label,
  labelKh,
  color,
}: {
  icon: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  label: string;
  labelKh: string;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
      style={{
        borderColor: `${color}55`,
        backgroundColor: `${color}10`,
        color: STEEL_LIGHT,
      }}
    >
      <Icon size={12} style={{ color }} />
      <span>{label}</span>
      <span style={{ color: STEEL }}>·</span>
      <span style={{ color: STEEL_LIGHT }}>{labelKh}</span>
    </span>
  );
}

function PrintBedHero() {
  // A neon wireframe cube being "printed" — 5 horizontal layers stacking
  // upward with a moving extruder above.
  return (
    <svg
      viewBox="0 0 320 320"
      className="h-[260px] w-[260px] sm:h-[300px] sm:w-[300px]"
      aria-hidden
    >
      {/* Carbon-fibre back panel */}
      <defs>
        <linearGradient id="carbonBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#11141b" />
          <stop offset="100%" stopColor="#08090c" />
        </linearGradient>
        <linearGradient id="layerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={NEON_CYAN} stopOpacity="0.85" />
          <stop offset="100%" stopColor={NEON_CYAN} stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="nozzleGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={NEON_AMBER} stopOpacity="0.9" />
          <stop offset="100%" stopColor={NEON_AMBER} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="10" y="10" width="300" height="300" rx="14" fill="url(#carbonBg)" stroke="#1f2330" strokeWidth="1" />

      {/* Print bed (concrete grey) */}
      <rect
        x="60"
        y="240"
        width="200"
        height="14"
        rx="2"
        fill={CONCRETE}
        stroke={CONCRETE_LIGHT}
        strokeWidth="1"
      />
      {/* Bed grid lines */}
      {[80, 110, 140, 170, 200, 230].map((x) => (
        <line key={x} x1={x} y1="241" x2={x} y2="253" stroke={CONCRETE_LIGHT} strokeWidth="0.5" opacity="0.5" />
      ))}

      {/* Printed cube — 5 stacked layers with delayed entrance */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 235 - (i + 1) * 22;
          return (
            <rect
              key={i}
              x="100"
              y={y}
              width="120"
              height="20"
              rx="1.5"
              fill="url(#layerGrad)"
              stroke={NEON_CYAN}
              strokeWidth="1"
              style={{
                transformOrigin: `160px ${y + 20}px`,
                animation: `maker-print 0.7s ease-out ${0.3 + i * 0.5}s both, maker-flicker 4s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          );
        })}
      </g>

      {/* Wireframe edges of cube */}
      <g stroke={NEON_CYAN} strokeWidth="0.6" fill="none" opacity="0.7">
        <path d="M100,140 L100,240 L220,240 L220,140 Z" />
        <path d="M100,140 L120,120 L240,120 L220,140" />
        <path d="M220,240 L240,220 L240,120" />
        <line x1="100" y1="140" x2="120" y2="120" />
      </g>

      {/* Gantry rail */}
      <line x1="40" y1="80" x2="280" y2="80" stroke={CONCRETE_LIGHT} strokeWidth="3" />
      <circle cx="40" cy="80" r="5" fill={CONCRETE} stroke={STEEL_LIGHT} />
      <circle cx="280" cy="80" r="5" fill={CONCRETE} stroke={STEEL_LIGHT} />

      {/* Extruder head — traverses left-right above the cube */}
      <g style={{ animation: "maker-traverse 4s ease-in-out infinite" }}>
        {/* Extruder body */}
        <rect x="148" y="62" width="24" height="36" rx="3" fill={CARBON_3} stroke={STEEL} strokeWidth="1" />
        {/* Nozzle */}
        <path d="M 152,98 L 168,98 L 162,114 L 158,114 Z" fill={CONCRETE_LIGHT} stroke={STEEL_LIGHT} strokeWidth="0.8" />
        {/* Nozzle hot glow */}
        <circle cx="160" cy="116" r="6" fill="url(#nozzleGlow)" />
        {/* Filament strand from nozzle to top of latest layer */}
        <line
          x1="160"
          y1="118"
          x2="160"
          y2="130"
          stroke={NEON_AMBER}
          strokeWidth="1.5"
          style={{ animation: "maker-pulse 1.2s ease-in-out infinite", color: NEON_AMBER }}
        />
      </g>

      {/* Filament spool (top-left corner) */}
      <g transform="translate(50,40)">
        <circle r="14" fill="none" stroke={CONCRETE_LIGHT} strokeWidth="2" />
        <circle
          r="9"
          fill="none"
          stroke={NEON_AMBER}
          strokeWidth="3"
          style={{ animation: "maker-spin 6s linear infinite", transformOrigin: "0px 0px" }}
        />
        <circle r="2" fill={STEEL_LIGHT} />
      </g>

      {/* Status LEDs */}
      <g transform="translate(265,30)">
        <circle r="3" fill={NEON_GREEN} style={{ animation: "maker-pulse 1.6s ease-in-out infinite", color: NEON_GREEN }} />
        <circle cy="10" r="3" fill={NEON_CYAN} opacity="0.5" />
      </g>

      {/* Caption strip */}
      <rect x="10" y="280" width="300" height="22" fill={CARBON_2} />
      <text x="22" y="295" fontFamily="ui-monospace, monospace" fontSize="9" fill={NEON_CYAN}>
        LAYER 5/5
      </text>
      <text x="160" y="295" fontFamily="ui-monospace, monospace" fontSize="9" fill={STEEL_LIGHT} textAnchor="middle">
        PLA · 215°C
      </text>
      <text x="298" y="295" fontFamily="ui-monospace, monospace" fontSize="9" fill={NEON_GREEN} textAnchor="end">
        ● PRINTING
      </text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION HELPERS
// ════════════════════════════════════════════════════════════════════════════

function SectionShell({
  kicker,
  kickerKh,
  number,
  icon: Icon,
  titleEn,
  titleKh,
  isKh,
  intro,
  introKh,
  testId,
  accent,
  children,
}: {
  kicker: string;
  kickerKh: string;
  number: string;
  icon: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  titleEn: string;
  titleKh: string;
  isKh: boolean;
  intro: string;
  introKh: string;
  testId: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section data-testid={testId}>
      {/* Section header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="grid h-9 w-9 place-items-center rounded-lg border"
          style={{
            borderColor: `${accent}55`,
            backgroundColor: `${accent}14`,
            color: accent,
          }}
        >
          <Icon size={16} style={{ color: accent }} />
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className="font-mono text-xs font-bold tracking-[0.2em]"
            style={{ color: accent }}
          >
            {number}
          </span>
          <span className="text-slate-500">·</span>
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: STEEL_LIGHT }}
          >
            {kicker}
          </span>
          <span className="text-slate-500">·</span>
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: STEEL }}
          >
            {kickerKh}
          </span>
        </div>
      </div>

      <h2
        className="text-3xl font-black tracking-tight sm:text-4xl"
        style={{ color: IVORY }}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      <div
        className="mt-1.5 flex flex-wrap items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: STEEL }}
      >
        <span>{titleEn}</span>
        <span>·</span>
        <span style={{ color: STEEL_LIGHT }}>{titleKh}</span>
      </div>

      <p
        className="mt-4 max-w-3xl text-[15px] leading-relaxed"
        style={{ color: STEEL_LIGHT }}
      >
        {isKh ? introKh : intro}
      </p>

      <div className="mt-7">{children}</div>
    </section>
  );
}

function Tag({ label, labelKh, color }: { label: string; labelKh: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
      style={{
        borderColor: `${color}55`,
        backgroundColor: `${color}12`,
        color,
      }}
    >
      {label}
      <span style={{ color: `${color}88` }}>·</span>
      <span style={{ color: STEEL_LIGHT }}>{labelKh}</span>
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 1 · HOW IT WORKS — ADDITIVE MANUFACTURING
// ════════════════════════════════════════════════════════════════════════════

function HowItWorksSection({ isKh }: { isKh: boolean }) {
  return (
    <SectionShell
      kicker="HOW IT WORKS"
      kickerKh="របៀបដែលវាដំណើរការ"
      number="01"
      icon={Layers}
      titleEn="Additive Manufacturing"
      titleKh="ការផលិតបន្ថែម"
      isKh={isKh}
      intro="Traditional manufacturing is subtractive — you start with a block of wood, metal, or stone and cut material away until the shape appears. 3D printing flips this on its head: you start with nothing and add material one thin layer at a time."
      introKh="ការផលិតបែបបុរាណគឺ 'ការដក' — អ្នកចាប់ផ្ដើមជាមួយដុំឈើ ដែក ឬថ្ម ហើយកាត់សំណល់ចេញរហូតរូបរាងលេចឡើង។ ការបោះពុម្ព 3D ត្រឡប់សត្តានេះ៖ អ្នកចាប់ផ្ដើមដោយគ្មានអ្វី ហើយបន្ថែមសម្ភារៈជាស្រទាប់ស្ដើងម្ដងមួយ។"
      testId="how-it-works"
      accent={NEON_CYAN}
    >
      {/* Subtractive vs Additive comparison */}
      <div
        className="grid gap-4 md:grid-cols-2"
        data-testid="subtractive-vs-additive"
      >
        <ApproachCard
          isKh={isKh}
          kind="subtractive"
          title="Subtractive Manufacturing"
          titleKh="ការផលិតដោយដក"
          summary="Start with a block. Carve, cut, drill, and grind material away until only the desired shape remains. Wastes the leftover material."
          summaryKh="ចាប់ផ្ដើមជាមួយដុំ។ ឆ្លាក់ កាត់ ចោះ និងកិនសម្ភារៈចេញរហូតទាល់តែទុកតែរូបរាងដែលចង់បាន។ ខ្ជះខ្ជាយសម្ភារៈដែលនៅសល់។"
          examplesEn={["Carving wood", "Lathe-turning metal", "CNC milling"]}
          examplesKh={["ការឆ្លាក់ឈើ", "ការខួងលោហៈ", "ការកាត់ CNC"]}
          color={CONCRETE_LIGHT}
        />
        <ApproachCard
          isKh={isKh}
          kind="additive"
          title="Additive Manufacturing"
          titleKh="ការផលិតដោយបន្ថែម"
          summary="Start with nothing. Build the object up layer by layer from a digital file. Almost no waste — you only deposit material where it is needed."
          summaryKh="ចាប់ផ្ដើមដោយគ្មានអ្វី។ បង្កើតវត្ថុឡើងជាស្រទាប់ៗ ពីឯកសារឌីជីថល។ ស្ទើរតែគ្មានសំណល់ — អ្នកដាក់សម្ភារៈតែនៅកន្លែងដែលត្រូវការ។"
          examplesEn={["FDM filament", "Resin (SLA)", "Metal powder"]}
          examplesKh={["FDM ខ្សែសំយោគ", "ដំណក់ស្នាម (SLA)", "ម្សៅលោហៈ"]}
          color={NEON_CYAN}
        />
      </div>

      {/* Mechanism flow diagram */}
      <div
        className="mt-6 rounded-2xl border p-5 sm:p-7"
        style={{
          borderColor: `${NEON_CYAN}33`,
          backgroundColor: CARBON_2,
        }}
        data-testid="how-it-works-mechanism"
      >
        <div
          className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: STEEL }}
        >
          {isKh ? "យន្តការ · MECHANISM" : "Mechanism · យន្តការ"}
        </div>

        <div className="grid items-center gap-3 sm:grid-cols-[1fr,auto,1fr,auto,1fr,auto,1fr]">
          <Step
            icon={FileCode}
            color={NEON_CYAN}
            label="Digital 3D Model"
            labelKh="គំរូ 3D ឌីជីថល"
            sub="A computer file (.stl / .obj) describing every face of the object."
            subKh="ឯកសារកុំព្យូទ័រ (.stl / .obj) ពិពណ៌នាគ្រប់ផ្ទៃនៃវត្ថុ។"
          />
          <Arrow />
          <Step
            icon={Cpu}
            color={NEON_GREEN}
            label="Slicer Software"
            labelKh="កម្មវិធីកាត់ស្រទាប់"
            sub="Slices the model into hundreds of thin horizontal layers, then writes G-code instructions."
            subKh="កាត់គំរូជាស្រទាប់ផ្ដេកស្ដើងៗរាប់រយ ហើយសរសេរសេចក្ដីបង្គាប់ G-code។"
          />
          <Arrow />
          <Step
            icon={Flame}
            color={NEON_AMBER}
            label="Heated Nozzle"
            labelKh="ច្រមុះក្ដៅ"
            sub="A spool of plastic filament melts at ~200°C and is squeezed through a tiny hot nozzle."
            subKh="ខ្សែប្លាស្ទិករលាយនៅ ~200°C ហើយត្រូវច្របាច់ឆ្លងកាត់ច្រមុះតូចក្ដៅ។"
          />
          <Arrow />
          <Step
            icon={Cuboid}
            color={NEON_MAGENTA}
            label="Layered Object"
            labelKh="វត្ថុរាងស្រទាប់"
            sub="The nozzle draws the object flat layer by flat layer, climbing upward until the part is complete."
            subKh="ច្រមុះគូររូបវត្ថុជាស្រទាប់ផ្ដេកម្ដងមួយៗ ឡើងលើរហូតបញ្ចប់។"
          />
        </div>

        <div
          className="mt-5 flex flex-wrap items-center justify-center gap-2 border-t pt-4"
          style={{ borderColor: `${CONCRETE}55` }}
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: STEEL }}
          >
            {isKh ? "សម្ភារៈទូទៅ · COMMON MATERIALS" : "Common Materials · សម្ភារៈទូទៅ"}
          </span>
          <span style={{ color: CONCRETE_LIGHT }}>·</span>
          <Tag label="PLA" labelKh="ប្លាស្ទិក PLA" color={NEON_CYAN} />
          <Tag label="ABS" labelKh="ABS" color={NEON_GREEN} />
          <Tag label="Resin" labelKh="ដំណក់ស្នាម" color={NEON_MAGENTA} />
          <Tag label="Concrete" labelKh="កុងក្រែត" color={CONCRETE_LIGHT} />
          <Tag label="Titanium powder" labelKh="ម្សៅទីតានីយ៉ូម" color={NEON_AMBER} />
        </div>
      </div>
    </SectionShell>
  );
}

function ApproachCard({
  isKh,
  kind,
  title,
  titleKh,
  summary,
  summaryKh,
  examplesEn,
  examplesKh,
  color,
}: {
  isKh: boolean;
  kind: "subtractive" | "additive";
  title: string;
  titleKh: string;
  summary: string;
  summaryKh: string;
  examplesEn: string[];
  examplesKh: string[];
  color: string;
}) {
  const isAdditive = kind === "additive";
  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-5"
      style={{
        borderColor: `${color}40`,
        backgroundColor: CARBON_2,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="grid h-10 w-10 place-items-center rounded-lg border"
          style={{
            borderColor: `${color}66`,
            backgroundColor: `${color}14`,
          }}
        >
          {isAdditive ? (
            <Plus size={18} style={{ color }} />
          ) : (
            <Scissors size={18} style={{ color }} />
          )}
        </div>
        <div>
          <div className="text-[15px] font-bold" style={{ color: IVORY }}>
            {isKh ? titleKh : title}
          </div>
          <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: STEEL }}>
            {title} · <span style={{ color: STEEL_LIGHT }}>{titleKh}</span>
          </div>
        </div>
      </div>

      {/* Mini visualization */}
      <div className="my-4 flex items-center justify-center">
        {isAdditive ? <AdditiveMini color={color} /> : <SubtractiveMini color={color} />}
      </div>

      <p
        className="text-[13.5px] leading-relaxed"
        style={{ color: STEEL_LIGHT }}
      >
        {summary}
      </p>
      <p
        className="mt-1.5 text-[12.5px] leading-relaxed"
        style={{ color: STEEL }}
      >
        {summaryKh}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {examplesEn.map((ex, i) => (
          <Tag key={ex} label={ex} labelKh={examplesKh[i] ?? ex} color={color} />
        ))}
      </div>
    </div>
  );
}

function SubtractiveMini({ color }: { color: string }) {
  // A solid block with chips flying away — represents carving
  return (
    <svg viewBox="0 0 160 80" width="160" height="80" aria-hidden>
      <rect x="40" y="20" width="80" height="40" rx="2" fill={CONCRETE} stroke={color} strokeWidth="1" />
      {/* Chiseled corner */}
      <polygon points="120,20 120,42 100,20" fill={CARBON_2} stroke={color} strokeWidth="1" />
      {/* Falling chips */}
      <g fill={color} opacity="0.7">
        <rect x="124" y="50" width="3" height="3" transform="rotate(20 125 51)" />
        <rect x="132" y="62" width="4" height="4" transform="rotate(45 134 64)" />
        <rect x="118" y="68" width="3" height="3" transform="rotate(-10 119 69)" />
      </g>
      {/* Chisel */}
      <g transform="translate(122,8)">
        <rect x="0" y="0" width="3" height="14" fill={STEEL_LIGHT} />
        <polygon points="-2,14 5,14 1.5,20" fill={STEEL_LIGHT} />
      </g>
    </svg>
  );
}

function AdditiveMini({ color }: { color: string }) {
  // 4 stacked layers building upward
  return (
    <svg viewBox="0 0 160 80" width="160" height="80" aria-hidden>
      {/* Base bed */}
      <rect x="30" y="64" width="100" height="4" fill={CONCRETE} />
      {[0, 1, 2, 3].map((i) => {
        const y = 60 - (i + 1) * 9;
        return (
          <rect
            key={i}
            x="50"
            y={y}
            width="60"
            height="8"
            fill={`${color}cc`}
            stroke={color}
            strokeWidth="0.8"
            style={{
              transformOrigin: `80px ${y + 8}px`,
              animation: `maker-print 0.6s ease-out ${i * 0.4}s both`,
            }}
          />
        );
      })}
      {/* Nozzle */}
      <g transform="translate(74,10)">
        <rect width="12" height="10" rx="1" fill={CARBON_3} stroke={STEEL_LIGHT} strokeWidth="0.6" />
        <polygon points="2,10 10,10 6,18 6,18" fill={STEEL_LIGHT} />
        <line x1="6" y1="18" x2="6" y2="22" stroke={NEON_AMBER} strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function Step({
  icon: Icon,
  color,
  label,
  labelKh,
  sub,
  subKh,
}: {
  icon: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color: string;
  label: string;
  labelKh: string;
  sub: string;
  subKh: string;
}) {
  return (
    <div
      className="rounded-xl border p-3"
      style={{
        borderColor: `${color}40`,
        backgroundColor: CARBON_3,
      }}
    >
      <div className="flex items-center gap-2">
        <Icon size={16} style={{ color }} />
        <span className="text-[13px] font-bold" style={{ color: IVORY }}>
          {label}
        </span>
      </div>
      <div className="mt-0.5 text-[11px] font-semibold" style={{ color: STEEL }}>
        {labelKh}
      </div>
      <p className="mt-2 text-[12px] leading-snug" style={{ color: STEEL_LIGHT }}>
        {sub}
      </p>
      <p className="mt-1 text-[11.5px] leading-snug" style={{ color: STEEL }}>
        {subKh}
      </p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center text-cyan-400/60">
      <svg viewBox="0 0 24 12" width="24" height="12" aria-hidden>
        <path d="M0 6 L20 6 M14 1 L20 6 L14 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 2 · PRINTING THE SMALL — TOOLS & MEDICINE
// ════════════════════════════════════════════════════════════════════════════

function SmallScaleSection({ isKh }: { isKh: boolean }) {
  return (
    <SectionShell
      kicker="THE SMALL"
      kickerKh="ខ្នាតតូច"
      number="02"
      icon={Wrench}
      titleEn="Tools & Medicine"
      titleKh="ឧបករណ៍ និងវេជ្ជសាស្ត្រ"
      isKh={isKh}
      intro="Desktop-sized 3D printers are already changing two very different industries. Mechanics print spare parts that no factory still makes, and doctors print medical devices shaped to one specific patient's body."
      introKh="ម៉ាស៊ីនបោះពុម្ព 3D ខ្នាតតុធ្វើការផ្លាស់ប្ដូរឧស្សាហកម្មពីរផ្សេងគ្នារួចហើយ។ មេកានិកបោះពុម្ពគ្រឿងបន្លាស់ដែលរោងចក្រលែងផលិត ហើយវេជ្ជបណ្ឌិតបោះពុម្ពឧបករណ៍វេជ្ជសាស្ត្រដែលសម​តូ​​ចទៅនឹងរាងកាយរបស់អ្នកជំងឺម្នាក់ៗ។"
      testId="printing-the-small"
      accent={NEON_GREEN}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <SmallScaleCard
          isKh={isKh}
          icon={Wrench}
          color={NEON_GREEN}
          number="01"
          kicker="AUTOMOTIVE & HARDWARE"
          kickerKh="រថយន្ត និងគ្រឿងបន្លាស់"
          title="Custom Spare Parts"
          titleKh="គ្រឿងបន្លាស់តាមតម្រូវការ"
          body="Mechanics no longer have to wait weeks for a discontinued bolt or a rare gear. They draw the part on a computer (or scan an old broken one), and the printer builds a working replacement overnight. This is keeping classic cars, vintage motorcycles, and old factory machines alive long after their original manufacturers have shut down."
          bodyKh="មេកានិកលែងត្រូវរង់ចាំរយៈពេលជាសប្ដាហ៍សម្រាប់ខ្ចៅឬកង់ស្ព្រែងដ៏កម្រ។ ពួកគេគូររូបនៅលើកុំព្យូទ័រ (ឬស្កេនគ្រឿងចាស់ដែលខូច) ហើយម៉ាស៊ីនបោះពុម្ពបង្កើតគ្រឿងជំនួសដែលដំណើរការបានក្នុងមួយយប់។ វាកំពុងរក្សារថយន្តចាស់ ម៉ូតូចាស់ និងម៉ាស៊ីនរោងចក្រចាស់ឲ្យនៅរស់រវើក​ បន្ទាប់ពីក្រុមហ៊ុនផលិតដើមបានបិទរួចហើយ។"
          examplesEn={["Custom wrenches", "Replacement gears", "Discontinued bolts", "Tooling jigs"]}
          examplesKh={["ឧបករណ៍កំសាន្ត", "កង់ស្ព្រែង", "ខ្ចៅរលត់", "ឧបករណ៍កាត់"]}
          glyph={<HardwareGlyph />}
        />
        <SmallScaleCard
          isKh={isKh}
          icon={HeartPulse}
          color={NEON_MAGENTA}
          number="02"
          kicker="MEDICAL TOOLS"
          kickerKh="ឧបករណ៍វេជ្ជសាស្ត្រ"
          title="Patient-Specific Devices"
          titleKh="ឧបករណ៍សម្រាប់អ្នកជំងឺជាក់លាក់"
          body="Doctors in remote provinces can scan a patient's hand and print a finger splint that fits perfectly. Open-source designs let any clinic print a working stethoscope for a few dollars. Children with missing limbs can receive low-cost prosthetic arms — and grow into a new, larger one each year as cheaply as a new pair of shoes."
          bodyKh="វេជ្ជបណ្ឌិតនៅខេត្តឆ្ងាយៗអាចស្កេនដៃរបស់អ្នកជំងឺ ហើយបោះពុម្ពឧបករណ៍ដាក់ម្រាមដៃសម។ គំនូសប្លង់ប្រភពបើកចំហអាចឲ្យមន្ទីរសុខាភិបាលបោះពុម្ព stethoscope ដែលដំណើរការបានដោយចំណាយតែប៉ុន្មានដុល្លារ។ កុមារដែលគ្មានអវយវៈអាចទទួលបានដៃសិប្បនិម្មិតដែលមានតម្លៃថោក — ហើយអាចទទួលបានគ្រឿងថ្មីធំជាងមុនក្នុងមួយឆ្នាំ ដោយចំណាយប្រាក់ស្មើនឹងទិញស្បែកជើងថ្មីមួយគូ។"
          examplesEn={["Finger splints", "Stethoscopes", "Custom prosthetics", "Surgical guides"]}
          examplesKh={["ឧបករណ៍ដាក់ម្រាមដៃ", "Stethoscope", "ដៃសិប្បនិម្មិត", "មគ្គុទ្ទេសក៍វះកាត់"]}
          glyph={<MedicalGlyph />}
        />
      </div>
    </SectionShell>
  );
}

function SmallScaleCard({
  isKh,
  icon: Icon,
  color,
  number,
  kicker,
  kickerKh,
  title,
  titleKh,
  body,
  bodyKh,
  examplesEn,
  examplesKh,
  glyph,
}: {
  isKh: boolean;
  icon: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color: string;
  number: string;
  kicker: string;
  kickerKh: string;
  title: string;
  titleKh: string;
  body: string;
  bodyKh: string;
  examplesEn: string[];
  examplesKh: string[];
  glyph: React.ReactNode;
}) {
  const testId =
    kicker === "AUTOMOTIVE & HARDWARE" ? "small-automotive" : "small-medical";
  return (
    <div
      data-testid={testId}
      className="relative overflow-hidden rounded-2xl border p-5"
      style={{
        borderColor: `${color}40`,
        backgroundColor: CARBON_2,
      }}
    >
      {/* Top kicker */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="font-mono text-[11px] font-bold tracking-[0.2em]"
          style={{ color }}
        >
          {number}
        </span>
        <div className="flex items-center gap-2">
          <Icon size={14} style={{ color }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: STEEL_LIGHT }}>
            {kicker}
          </span>
          <span style={{ color: STEEL }}>·</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: STEEL }}>
            {kickerKh}
          </span>
        </div>
      </div>

      {/* Glyph */}
      <div className="my-4 flex items-center justify-center">{glyph}</div>

      <h3 className="text-lg font-bold leading-tight" style={{ color: IVORY }}>
        {isKh ? titleKh : title}
      </h3>
      <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: STEEL }}>
        {title} · <span style={{ color: STEEL_LIGHT }}>{titleKh}</span>
      </div>

      <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: STEEL_LIGHT }}>
        {body}
      </p>
      <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: STEEL }}>
        {bodyKh}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {examplesEn.map((ex, i) => (
          <Tag key={ex} label={ex} labelKh={examplesKh[i] ?? ex} color={color} />
        ))}
      </div>
    </div>
  );
}

function HardwareGlyph() {
  // A wrench + gear arrangement
  return (
    <svg viewBox="0 0 140 100" width="140" height="100" aria-hidden>
      {/* Layered platform */}
      <rect x="10" y="78" width="120" height="4" fill={CONCRETE} />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="40"
          y={75 - (i + 1) * 5}
          width="60"
          height="4"
          fill={`${NEON_GREEN}aa`}
          stroke={NEON_GREEN}
          strokeWidth="0.5"
          style={{
            transformOrigin: `70px ${75 - i * 5}px`,
            animation: `maker-print 0.6s ease-out ${0.2 + i * 0.4}s both`,
          }}
        />
      ))}
      {/* Wrench */}
      <g transform="translate(20,20) rotate(-25)" style={{ animation: "maker-flicker 5s ease-in-out infinite" }}>
        <rect x="0" y="2" width="34" height="6" fill={STEEL_LIGHT} />
        <path d="M -2,-3 L 8,-3 L 11,5 L 8,13 L -2,13 L -2,5 Z" fill={STEEL_LIGHT} />
        <circle cx="3" cy="5" r="2.5" fill={CARBON_2} />
        <path d="M32,-1 L42,5 L32,11 Z" fill={STEEL_LIGHT} />
      </g>
      {/* Gear */}
      <g transform="translate(102,28)" style={{ animation: "maker-spin 6s linear infinite", transformOrigin: "0px 0px" }}>
        <g fill={NEON_GREEN}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect key={deg} x="-2" y="-13" width="4" height="6" transform={`rotate(${deg})`} />
          ))}
        </g>
        <circle r="9" fill={NEON_GREEN} stroke={CARBON} strokeWidth="1.5" />
        <circle r="3" fill={CARBON} />
      </g>
    </svg>
  );
}

function MedicalGlyph() {
  // A printed splint shape with a medical cross + heart pulse line
  return (
    <svg viewBox="0 0 140 100" width="140" height="100" aria-hidden>
      {/* Layered platform */}
      <rect x="10" y="78" width="120" height="4" fill={CONCRETE} />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="35"
          y={75 - (i + 1) * 5}
          width="70"
          height="4"
          fill={`${NEON_MAGENTA}aa`}
          stroke={NEON_MAGENTA}
          strokeWidth="0.5"
          style={{
            transformOrigin: `70px ${75 - i * 5}px`,
            animation: `maker-print 0.6s ease-out ${0.2 + i * 0.4}s both`,
          }}
        />
      ))}
      {/* Medical cross */}
      <g transform="translate(38,22)">
        <rect x="0" y="0" width="22" height="22" rx="4" fill={NEON_MAGENTA} />
        <rect x="9" y="3" width="4" height="16" fill={IVORY} />
        <rect x="3" y="9" width="16" height="4" fill={IVORY} />
      </g>
      {/* Heartbeat line */}
      <path
        d="M 70,30 L 80,30 L 84,18 L 90,42 L 96,30 L 130,30"
        fill="none"
        stroke={NEON_MAGENTA}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: "maker-pulse 1.6s ease-in-out infinite", color: NEON_MAGENTA }}
      />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 3 · PRINTING THE MASSIVE — HOUSES & CARS
// ════════════════════════════════════════════════════════════════════════════

function MassiveScaleSection({ isKh }: { isKh: boolean }) {
  return (
    <SectionShell
      kicker="THE MASSIVE"
      kickerKh="ខ្នាតធំ"
      number="03"
      icon={Construction}
      titleEn="Houses & Cars"
      titleKh="ផ្ទះ និងឡាន"
      isKh={isKh}
      intro="Scale the print bed up by a factor of a thousand and the same idea builds entire buildings and vehicles. The plastic spool becomes a tank of concrete or a powder bed of titanium. The desktop nozzle becomes a robotic crane the size of a house."
      introKh="ពង្រីកគ្រែបោះពុម្ពឲ្យធំជាងមុនមួយពាន់ដង ហើយគំនិតដដែលនេះបង្កើតអាគារនិងយានយន្តទាំងមូល។ ដីខ្សែប្លាស្ទិកក្លាយជាធុងកុងក្រែត ឬគ្រែម្សៅទីតានីយ៉ូម។ ច្រមុះតុក្លាយជាដ៏ឧប្ករណ៍ក្រេនរ៉ូបូតធំស្មើនឹងផ្ទះមួយ។"
      testId="printing-the-massive"
      accent={NEON_AMBER}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <MassiveCard
          isKh={isKh}
          icon={Home}
          color={NEON_AMBER}
          number="01"
          kicker="ARCHITECTURE"
          kickerKh="ស្ថាបត្យកម្ម"
          title="Concrete-Printed Houses"
          titleKh="ផ្ទះបោះពុម្ពកុងក្រែត"
          headlineEn="Walls in 24 hours"
          headlineKh="ជញ្ជាំងក្នុង ២៤ ម៉ោង"
          body="Instead of a plastic nozzle the size of a pencil, a giant gantry crane carries a hose squeezing thick concrete. Working from a digital floor plan, the crane traces the outline of every wall and lays the concrete bead by bead, layer by layer. A complete two-bedroom house can be raised in less than 24 hours, at a fraction of the cost of conventional brick-by-brick construction. This is being deployed for low-cost housing, disaster relief, and even bases planned for the Moon."
          bodyKh="ជំនួសច្រមុះប្លាស្ទិកខ្នាតតូច គឺមានដ៏ឧប្ករណ៍ក្រេនយក្សកាន់ទុយោច្របាច់កុងក្រែតក្រាស់។ ដោយធ្វើការតាមផែនទីជាន់ឌីជីថល ក្រេនគូររូបជញ្ជាំងគ្រប់បន្ទាត់ ហើយដាក់កុងក្រែតមួយបន្ទាត់ៗ ជាស្រទាប់ៗ។ ផ្ទះពេញលេញពីរបន្ទប់គេងអាចសាងសង់បានក្នុងរយៈពេលតិចជាង ២៤ ម៉ោង ក្នុងតម្លៃតិចជាងការសាងសង់បែបឥដ្ឋធម្មតា។ វាកំពុងត្រូវបានប្រើសម្រាប់លំនៅឋានតម្លៃថោក សង្គ្រោះគ្រោះមហន្តរាយ និងសូម្បីតែមូលដ្ឋាននៅលើព្រះច័ន្ទផងដែរ។"
          examplesEn={["Robotic gantry", "Concrete extruder", "Disaster relief", "Lunar bases"]}
          examplesKh={["ដ៏ឧប្ករណ៍ក្រេន", "ច្រមុះកុងក្រែត", "សង្គ្រោះមហន្តរាយ", "មូលដ្ឋានព្រះច័ន្ទ"]}
          glyph={<HouseGlyph />}
        />
        <MassiveCard
          isKh={isKh}
          icon={Car}
          color={NEON_CYAN}
          number="02"
          kicker="MOBILITY"
          kickerKh="ការដឹកជញ្ជូន"
          title="Printed Car Chassis"
          titleKh="ស៊ុមរថយន្តបោះពុម្ព"
          headlineEn="Lighter, faster, fewer parts"
          headlineKh="ស្រាល លឿន គ្រឿងតិច"
          body="Companies are now printing entire car chassis from aluminium and titanium powder, fusing it together with a laser. A traditional car chassis has hundreds of welded pieces; a printed one is a single object with internal lattice structures that are impossible to make any other way. The result is a vehicle that is lighter, stronger, more aerodynamic, and faster to assemble than anything stamped from sheet metal."
          bodyKh="ក្រុមហ៊ុនកំពុងបោះពុម្ពស៊ុមរថយន្តពេញលេញពីម្សៅអាលុយមីញ៉ូម និងទីតានីយ៉ូម ដោយផ្សាជាមួយឡាស៊ែរ។ ស៊ុមរថយន្តបែបបុរាណមានគ្រឿងផ្សារាប់រយ ប៉ុន្តែស៊ុមបោះពុម្ពគឺជាវត្ថុតែមួយដែលមានរចនាសម្ព័ន្ធ lattice ខាងក្នុងដែលមិនអាចផលិតបានដោយវិធីផ្សេង។ លទ្ធផល គឺយានយន្តដែលស្រាល ខ្លាំង មាន aerodynamic ប្រសើរ និងសាងសង់លឿនជាងអ្វីៗដែលផ្សារពីសន្លឹកលោហៈ។"
          examplesEn={["Laser sintering", "Titanium powder", "Lattice structures", "EV prototypes"]}
          examplesKh={["ផ្សារឡាស៊ែរ", "ម្សៅទីតានីយ៉ូម", "រចនាសម្ព័ន្ធ lattice", "គំរូ EV"]}
          glyph={<CarGlyph />}
        />
      </div>
    </SectionShell>
  );
}

function MassiveCard({
  isKh,
  icon: Icon,
  color,
  number,
  kicker,
  kickerKh,
  title,
  titleKh,
  headlineEn,
  headlineKh,
  body,
  bodyKh,
  examplesEn,
  examplesKh,
  glyph,
}: {
  isKh: boolean;
  icon: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color: string;
  number: string;
  kicker: string;
  kickerKh: string;
  title: string;
  titleKh: string;
  headlineEn: string;
  headlineKh: string;
  body: string;
  bodyKh: string;
  examplesEn: string[];
  examplesKh: string[];
  glyph: React.ReactNode;
}) {
  const testId = kicker === "ARCHITECTURE" ? "massive-houses" : "massive-cars";
  return (
    <div
      data-testid={testId}
      className="relative overflow-hidden rounded-2xl border p-5"
      style={{
        borderColor: `${color}40`,
        backgroundColor: CARBON_2,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="font-mono text-[11px] font-bold tracking-[0.2em]"
          style={{ color }}
        >
          {number}
        </span>
        <div className="flex items-center gap-2">
          <Icon size={14} style={{ color }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: STEEL_LIGHT }}>
            {kicker}
          </span>
          <span style={{ color: STEEL }}>·</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: STEEL }}>
            {kickerKh}
          </span>
        </div>
      </div>

      <div className="my-4 flex items-center justify-center">{glyph}</div>

      <h3 className="text-lg font-bold leading-tight" style={{ color: IVORY }}>
        {isKh ? titleKh : title}
      </h3>
      <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: STEEL }}>
        {title} · <span style={{ color: STEEL_LIGHT }}>{titleKh}</span>
      </div>

      {/* Pinned headline */}
      <div
        className="mt-3 inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-[11px] font-bold"
        style={{
          borderColor: `${color}66`,
          backgroundColor: `${color}10`,
          color,
        }}
      >
        <Sparkles size={12} />
        <span>{headlineEn}</span>
        <span style={{ color: `${color}99` }}>·</span>
        <span style={{ color: STEEL_LIGHT }}>{headlineKh}</span>
      </div>

      <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: STEEL_LIGHT }}>
        {body}
      </p>
      <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: STEEL }}>
        {bodyKh}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {examplesEn.map((ex, i) => (
          <Tag key={ex} label={ex} labelKh={examplesKh[i] ?? ex} color={color} />
        ))}
      </div>
    </div>
  );
}

function HouseGlyph() {
  // A small house being printed with a giant gantry overhead
  return (
    <svg viewBox="0 0 180 110" width="180" height="110" aria-hidden>
      {/* Ground */}
      <rect x="0" y="100" width="180" height="6" fill={CONCRETE} />

      {/* Gantry rails */}
      <line x1="10" y1="14" x2="170" y2="14" stroke={CONCRETE_LIGHT} strokeWidth="2" />
      <line x1="10" y1="10" x2="10" y2="100" stroke={CONCRETE_LIGHT} strokeWidth="2" />
      <line x1="170" y1="10" x2="170" y2="100" stroke={CONCRETE_LIGHT} strokeWidth="2" />

      {/* Travelling head */}
      <g style={{ animation: "maker-traverse 5s ease-in-out infinite" }}>
        <rect x="76" y="6" width="28" height="14" rx="2" fill={CARBON_3} stroke={STEEL_LIGHT} strokeWidth="0.8" />
        <line x1="90" y1="20" x2="90" y2="42" stroke={STEEL} strokeWidth="2" />
        <path d="M 86,42 L 94,42 L 92,52 L 88,52 Z" fill={CONCRETE_LIGHT} stroke={STEEL_LIGHT} strokeWidth="0.6" />
        <line x1="90" y1="52" x2="90" y2="58" stroke={NEON_AMBER} strokeWidth="2" />
      </g>

      {/* Walls being printed (concrete beads as horizontal stripes) */}
      <g>
        {/* House outline */}
        <path d="M 50,100 L 50,60 L 90,40 L 130,60 L 130,100" fill="none" stroke={CONCRETE_LIGHT} strokeWidth="0.6" strokeDasharray="3 2" />
        {/* Filled wall layers */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const y = 96 - i * 6;
          return (
            <rect
              key={i}
              x="50"
              y={y}
              width="80"
              height="4"
              fill={`${NEON_AMBER}cc`}
              stroke={NEON_AMBER}
              strokeWidth="0.5"
              style={{
                transformOrigin: `90px ${y + 4}px`,
                animation: `maker-print 0.6s ease-out ${0.2 + i * 0.3}s both`,
              }}
            />
          );
        })}
        {/* Door */}
        <rect x="82" y="80" width="16" height="20" fill={CARBON_2} stroke={NEON_AMBER} strokeWidth="0.5" />
      </g>

      {/* "24h" label */}
      <g transform="translate(140,80)">
        <rect x="-2" y="-9" width="34" height="14" rx="2" fill={CARBON} stroke={NEON_AMBER} />
        <text x="15" y="1" fontFamily="ui-monospace, monospace" fontSize="9" fill={NEON_AMBER} textAnchor="middle">
          24 H
        </text>
      </g>
    </svg>
  );
}

function CarGlyph() {
  // A car silhouette with internal lattice
  return (
    <svg viewBox="0 0 180 100" width="180" height="100" aria-hidden>
      {/* Ground */}
      <rect x="0" y="80" width="180" height="3" fill={CONCRETE} />

      {/* Car body silhouette */}
      <path
        d="M 22,72 L 32,52 L 70,42 L 110,42 L 142,56 L 158,72 Z"
        fill="none"
        stroke={NEON_CYAN}
        strokeWidth="1.4"
      />
      {/* Lattice infill */}
      <g stroke={NEON_CYAN} strokeWidth="0.5" opacity="0.55">
        <line x1="32" y1="52" x2="158" y2="72" />
        <line x1="70" y1="42" x2="22" y2="72" />
        <line x1="110" y1="42" x2="158" y2="72" />
        <line x1="70" y1="42" x2="142" y2="56" />
        <line x1="110" y1="42" x2="32" y2="52" />
        <line x1="32" y1="60" x2="158" y2="60" />
        <line x1="50" y1="42" x2="50" y2="72" />
        <line x1="92" y1="42" x2="92" y2="72" />
        <line x1="128" y1="46" x2="128" y2="72" />
      </g>
      {/* Windows */}
      <path d="M 40,52 L 70,46 L 90,46 L 90,58 L 38,58 Z" fill={CARBON} opacity="0.6" />
      <path d="M 92,46 L 108,46 L 130,56 L 92,58 Z" fill={CARBON} opacity="0.6" />

      {/* Wheels */}
      <g>
        <circle cx="50" cy="78" r="9" fill={CARBON_3} stroke={STEEL_LIGHT} strokeWidth="1.2" />
        <circle cx="130" cy="78" r="9" fill={CARBON_3} stroke={STEEL_LIGHT} strokeWidth="1.2" />
        <circle cx="50" cy="78" r="3" fill={NEON_CYAN} />
        <circle cx="130" cy="78" r="3" fill={NEON_CYAN} />
      </g>

      {/* Laser sintering beam */}
      <line
        x1="90"
        y1="6"
        x2="90"
        y2="38"
        stroke={NEON_CYAN}
        strokeWidth="1.5"
        style={{ animation: "maker-pulse 1.4s ease-in-out infinite", color: NEON_CYAN }}
      />
      <circle
        cx="90"
        cy="6"
        r="2.5"
        fill={NEON_CYAN}
        style={{ animation: "maker-pulse 1.4s ease-in-out infinite", color: NEON_CYAN }}
      />

      {/* "1 PART" label */}
      <g transform="translate(8,12)">
        <rect x="0" y="0" width="44" height="14" rx="2" fill={CARBON} stroke={NEON_CYAN} />
        <text x="22" y="10" fontFamily="ui-monospace, monospace" fontSize="9" fill={NEON_CYAN} textAnchor="middle">
          1 PART
        </text>
      </g>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  CLOSING STRIP
// ════════════════════════════════════════════════════════════════════════════

function ClosingStrip({ isKh }: { isKh: boolean }) {
  return (
    <section
      className="rounded-2xl border p-6 sm:p-8"
      style={{
        borderColor: `${NEON_CYAN}33`,
        backgroundImage: `linear-gradient(135deg, ${CARBON_2}, ${CARBON_3})`,
      }}
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Printer size={22} style={{ color: NEON_CYAN }} />
          <div
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: STEEL }}
          >
            <span style={{ color: NEON_CYAN }}>The Big Picture</span>
            <span className="mx-2" style={{ color: STEEL }}>·</span>
            <span style={{ color: STEEL_LIGHT }}>រូបភាពធំ</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Pill icon={PlusSquare} label="Layer by layer" labelKh="ស្រទាប់ម្ដងមួយ" color={NEON_CYAN} />
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed" style={{ color: STEEL_LIGHT }}>
        {isKh
          ? "ពីច្រមុះក្ដៅខ្នាតតុ ដែលបោះពុម្ពក្រងម្រាមដៃរបស់កុមារ ទៅដ៏ឧប្ករណ៍ក្រេនយក្សដែលច្របាច់ផ្ទះកុងក្រែតក្នុង ២៤ ម៉ោង — គំនិតគឺដូចគ្នា៖ ចាប់ផ្ដើមដោយឯកសារឌីជីថល បន្ថែមសម្ភារៈតែនៅកន្លែងដែលត្រូវការ ហើយបង្កើតវត្ថុរូបវ័ន្តជាស្រទាប់ម្ដងមួយ។ វាគឺជារោងចក្រនៅលើតុរបស់អ្នក។"
          : "From a desktop nozzle printing a child's prosthetic finger to a city-block-sized crane squeezing out a concrete house in 24 hours — the idea is the same: start with a digital file, deposit material only where it is needed, and build a physical object one layer at a time. It is a factory on your desk."}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Tag label="Subtractive → Additive" labelKh="ដក → បន្ថែម" color={NEON_CYAN} />
        <Tag label="Less waste" labelKh="សំណល់តិច" color={NEON_GREEN} />
        <Tag label="Mass customisation" labelKh="ការកែសម្រួលច្រើន" color={NEON_MAGENTA} />
        <Tag label="On-demand spare parts" labelKh="គ្រឿងបន្លាស់តាមតម្រូវការ" color={NEON_AMBER} />
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  APM · ATOMICALLY PRECISE MANUFACTURING (the speculative future)
//
//  A visually distinct "deep-tech" coda that pivots from real-world 3D
//  printing into a speculative-future zone. Dark void backgrounds, pulsing
//  violet/electric-blue borders, and a DNA-helix-into-digital-grid divider.
// ════════════════════════════════════════════════════════════════════════════

function APMSection({ isKh }: { isKh: boolean }) {
  return (
    <section
      aria-labelledby="apm-title"
      className="relative -mx-2 sm:-mx-4 rounded-3xl px-3 py-10 sm:px-6 sm:py-14"
      style={{
        backgroundImage:
          `radial-gradient(900px 500px at 18% -10%, rgba(168,85,247,0.18), transparent 60%),` +
          ` radial-gradient(800px 480px at 88% 110%, rgba(59,130,246,0.16), transparent 60%),` +
          ` linear-gradient(180deg, ${VOID} 0%, ${VOID_2} 60%, ${VOID} 100%)`,
        boxShadow:
          "inset 0 0 80px rgba(99,102,241,0.10), inset 0 0 0 1px rgba(168,85,247,0.18)",
      }}
    >
      {/* DNA-helix → digital-grid divider */}
      <HelixGridDivider />

      {/* Eyebrow + title */}
      <header className="mt-8 text-center">
        <div
          className="mx-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{
            borderColor: `${NEON_VIOLET}55`,
            backgroundColor: `${NEON_VIOLET}14`,
            color: NEON_PURPLE_LIGHT,
          }}
        >
          <Sparkles size={12} />
          <span>SPECULATIVE FUTURE</span>
          <span style={{ color: STEEL }}>·</span>
          <span style={{ color: STEEL_LIGHT }}>អនាគតស្ម័ន</span>
        </div>

        <h2
          id="apm-title"
          className="mt-5 px-2 text-3xl font-black leading-tight tracking-tight sm:text-4xl"
          style={{ color: IVORY }}
        >
          {isKh ? (
            <>
              ព្រំដែនចុងក្រោយ៖{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${NEON_VIOLET}, ${NEON_ELECTRIC})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ការផលិតដោយភាពជាក់លាក់កម្រិតអាតូម
              </span>
            </>
          ) : (
            <>
              The Ultimate Frontier:{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${NEON_VIOLET}, ${NEON_ELECTRIC})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Atomically Precise Manufacturing
              </span>
            </>
          )}
        </h2>
        <p
          className="mx-auto mt-4 max-w-2xl px-3 text-[15px] leading-relaxed"
          style={{ color: STEEL_LIGHT }}
        >
          {isKh
            ? "បើ​ការ​បោះពុម្ព ៣ វិមាត្រ​សព្វថ្ងៃ​បន្ថែម​សម្ភារៈ​ស្រទាប់​ម្ដង​មួយ ឱ្យ​ច្រឡំ​នឹង​អនាគត​ដែល​ម៉ាស៊ីន​បន្ថែម​សម្ភារៈ ​អាតូម​ម្ដង​មួយ។ នេះ​មិន​មែន​ជា​ការ​បោះពុម្ព​ទៀត​ទេ — នេះ​ជា​ការ​សាងសង់​សម្ភារៈ​ដោយ​ផ្ទាល់​ពី​អង្គធាតុ​មុខ​បង្អស់​នៃ​ធម្មជាតិ។"
            : "If today's 3D printing adds material one layer at a time, imagine a future where machines add material one atom at a time. This is no longer printing — it is building matter directly from nature's smallest pieces."}
        </p>
      </header>

      {/* Three cards */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <APMCard
          number="01"
          icon={Atom}
          accent={NEON_VIOLET}
          accentDelay="0s"
          isKh={isKh}
          eyebrowEn="The Nano-Builder"
          eyebrowKh="អ្នកសាងសង់ណាណូ"
          bodyEn="Instead of squirting hot plastic from a nozzle, imagine a microscopic robot arm equipped with tweezers so small they can pick up individual atoms and snap them together — like Lego bricks, but a billion times smaller."
          bodyKh="ជំនួសឱ្យការច្រួលប្លាស្ទិចក្ដៅពីច្រមុះ ស្រមៃមើលដៃរ៉ូបូតមីក្រូទស្សន៍ដែលមានដង្កៀបតូចណាស់រហូតអាចចាប់អាតូមនីមួយៗ ហើយតស៊ូវ៉ាបញ្ចូលគ្នា — ដូចគ្នានឹងឡេហ្គោ ប៉ុន្តែតូចជាងមួយពាន់លានដង។"
          tags={[
            { en: "Atom by atom", kh: "អាតូមម្ដងមួយ" },
            { en: "Nano-tweezers", kh: "ដង្កៀបណាណូ" },
            { en: "Picometer precision", kh: "ភាពជាក់លាក់ពីកូម៉ែត្រ" },
          ]}
        >
          <NanoBuilderGlyph />
        </APMCard>

        <APMCard
          isKh={isKh}
          number="02"
          icon={Hexagon}
          accent={NEON_INDIGO}
          accentDelay="1.3s"
          eyebrowEn="Mechanosynthesis"
          eyebrowKh="ការសំយោគមេកានិច"
          bodyEn="APM is just chemistry controlled by machines. Instead of mixing chemicals in a liquid and hoping the atoms bump into each other correctly, a machine forces the atoms together in the exact right spot — building perfect materials like flawless diamond crystals or super-strong carbon nanotubes."
          bodyKh="APM គឺគ្រាន់តែជាគីមីវិទ្យាដែលត្រូវបានគ្រប់គ្រងដោយម៉ាស៊ីន។ ជំនួសឱ្យការលាយគីមីក្នុងសារធាតុរាវ ហើយសង្ឃឹមថាអាតូមនឹងប៉ះគ្នាត្រឹមត្រូវ ម៉ាស៊ីនបង្ខំអាតូមឱ្យជួបគ្នាក្នុងទីតាំងពិតប្រាកដ — សាងសង់សម្ភារៈឥតខ្ចោះដូចជាពេជ្រគ្រីស្តាល់ ឬបំពង់ណាណូកាបោនរឹងមាំ។"
          tags={[
            { en: "Diamond crystal", kh: "គ្រីស្តាល់ពេជ្រ" },
            { en: "Carbon nanotubes", kh: "បំពង់ណាណូកាបោន" },
            { en: "Forced reactions", kh: "ប្រតិកម្មបង្ខំ" },
          ]}
        >
          <MechanoSynthGlyph isKh={isKh} />
        </APMCard>

        <APMCard
          isKh={isKh}
          number="03"
          icon={Globe2}
          accent={NEON_ELECTRIC}
          accentDelay="2.6s"
          eyebrowEn="The End of Scarcity"
          eyebrowKh="ទីបញ្ចប់នៃភាពខ្វះខាត"
          bodyEn="If a machine can rearrange atoms, it can turn dirt, air, and sunlight into medicine, computer chips, or food. This technology could theoretically end poverty by making physical goods as cheap and easy to copy as digital files."
          bodyKh="បើម៉ាស៊ីនមួយអាចរៀបចំអាតូមឡើងវិញ វាអាចប្រែដី ខ្យល់ និងពន្លឺថ្ងៃ ទៅជាឱសថ បន្ទះកុំព្យូទ័រ ឬអាហារ។ បច្ចេកវិទ្យានេះអាចបញ្ចប់ភាពក្រីក្រតាមទ្រឹស្តី ដោយធ្វើឱ្យទំនិញរូបវ័ន្តមានតម្លៃថោក ហើយងាយចម្លងដូចឯកសារឌីជីថល។"
          tags={[
            { en: "Post-scarcity", kh: "ក្រោយភាពខ្វះខាត" },
            { en: "Universal manufacturing", kh: "ផលិតកម្មសកល" },
            { en: "Atom-level copying", kh: "ការចម្លងកម្រិតអាតូម" },
          ]}
        >
          <ScarcityGlyph isKh={isKh} />
        </APMCard>
      </div>

      {/* Footer caveat */}
      <p
        className="mx-auto mt-10 max-w-3xl px-4 text-center text-[12px] italic leading-relaxed"
        style={{ color: `${STEEL}` }}
      >
        {isKh
          ? "ចំណាំ៖ APM គឺនៅតែជាការស្រាវជ្រាវវិទ្យាសាស្រ្ត — រឿងស្រដៀងនឹងការហោះហើរក្នុងឆ្នាំ ១៩០០ — ប៉ុន្តែគោលការណ៍គឺបានបង្ហាញហើយ នៅក្នុងម៉ូលេគុលមួយចំនួនរួចហើយ។"
          : "Note: APM is still active research — the way flight was in 1900 — but the principle has already been demonstrated for a handful of molecules in the laboratory."}
      </p>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  HELIX → DIGITAL-GRID DIVIDER
//  Two intertwined sine-wave strands (DNA) on the left smoothly transitioning
//  into a stipple-grid pattern on the right.
// ────────────────────────────────────────────────────────────────────────────

function HelixGridDivider() {
  // Two strands, each one a sine wave 180° out of phase.
  const W = 800;
  const H = 80;
  const strand = (phase: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= W; x += 4) {
      const t = (x / W) * Math.PI * 6 + phase;
      // Strand fades out as it crosses into the grid zone (right half).
      const y = H / 2 + Math.sin(t) * 22;
      pts.push(`${x},${y.toFixed(2)}`);
    }
    return pts.join(" ");
  };

  // Connecting "rungs" between the two strands — only on the left half.
  const rungs: number[] = [];
  for (let x = 20; x < W * 0.55; x += 28) rungs.push(x);

  // Grid dots on the right half.
  const dots: { x: number; y: number; o: number }[] = [];
  for (let gx = W * 0.45; gx <= W; gx += 22) {
    for (let gy = 12; gy <= H - 12; gy += 14) {
      // Fade in from left to right.
      const o = Math.min(1, (gx - W * 0.45) / (W * 0.55));
      dots.push({ x: gx, y: gy, o });
    }
  }

  return (
    <div
      className="relative mx-auto w-full overflow-hidden"
      style={{ maxWidth: 880 }}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        style={{ height: 80 }}
      >
        <defs>
          {/* Strand A: violet glow */}
          <linearGradient id="strandA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={NEON_VIOLET} stopOpacity="0.9" />
            <stop offset="55%" stopColor={NEON_INDIGO} stopOpacity="0.8" />
            <stop offset="100%" stopColor={NEON_ELECTRIC} stopOpacity="0" />
          </linearGradient>
          {/* Strand B: electric-blue glow */}
          <linearGradient id="strandB" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={NEON_PURPLE_LIGHT} stopOpacity="0.85" />
            <stop offset="55%" stopColor={NEON_ELECTRIC} stopOpacity="0.75" />
            <stop offset="100%" stopColor={NEON_ELECTRIC} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rungGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={NEON_VIOLET} stopOpacity="0.7" />
            <stop offset="100%" stopColor={NEON_ELECTRIC} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Strand A (sin) */}
        <polyline
          points={strand(0)}
          fill="none"
          stroke="url(#strandA)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="160 0"
          style={{
            animation: "apm-helix-flow 6s linear infinite",
            filter: `drop-shadow(0 0 4px ${NEON_VIOLET}88)`,
          }}
        />
        {/* Strand B (sin shifted by π) */}
        <polyline
          points={strand(Math.PI)}
          fill="none"
          stroke="url(#strandB)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="160 0"
          style={{
            animation: "apm-helix-flow 6s linear infinite reverse",
            filter: `drop-shadow(0 0 4px ${NEON_ELECTRIC}88)`,
          }}
        />

        {/* Rungs (DNA base-pairs) */}
        {rungs.map((x) => {
          const t = (x / W) * Math.PI * 6;
          const y1 = H / 2 + Math.sin(t) * 22;
          const y2 = H / 2 + Math.sin(t + Math.PI) * 22;
          return (
            <line
              key={x}
              x1={x}
              x2={x}
              y1={y1}
              y2={y2}
              stroke="url(#rungGrad)"
              strokeWidth="0.9"
              opacity="0.7"
            />
          );
        })}

        {/* Digital grid (right half) */}
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r="1.1"
            fill={NEON_ELECTRIC}
            opacity={d.o * 0.7}
            style={{
              animation: `apm-grid-pulse 3s ease-in-out ${(i * 0.05) % 2}s infinite`,
            }}
          />
        ))}

        {/* Faint vertical grid lines on the right */}
        {Array.from({ length: 6 }).map((_, i) => {
          const x = W * 0.55 + i * (W * 0.45) / 6;
          return (
            <line
              key={`v-${i}`}
              x1={x}
              x2={x}
              y1="6"
              y2={H - 6}
              stroke={NEON_ELECTRIC}
              strokeWidth="0.4"
              opacity={0.18 + i * 0.04}
            />
          );
        })}
      </svg>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  APMCard — generic card shell with pulsing border + corner numeral
// ────────────────────────────────────────────────────────────────────────────

function APMCard({
  isKh,
  number,
  icon: Icon,
  accent,
  accentDelay,
  eyebrowEn,
  eyebrowKh,
  bodyEn,
  bodyKh,
  tags,
  children,
}: {
  isKh: boolean;
  number: string;
  icon: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  accent: string;
  accentDelay: string;
  eyebrowEn: string;
  eyebrowKh: string;
  bodyEn: string;
  bodyKh: string;
  tags: { en: string; kh: string }[];
  children: React.ReactNode;
}) {
  return (
    <article
      className="apm-card relative flex flex-col overflow-hidden rounded-2xl border-2 p-6 sm:p-7"
      style={{
        borderColor: `${accent}66`,
        backgroundImage: `linear-gradient(135deg, ${VOID}, ${VOID_2})`,
        animation: `apm-border-pulse 4.5s ease-in-out ${accentDelay} infinite`,
      }}
    >
      {/* Corner numeral */}
      <span
        aria-hidden
        className="absolute right-4 top-3 select-none font-mono text-[44px] font-black leading-none"
        style={{ color: `${accent}26` }}
      >
        {number}
      </span>

      {/* Header row */}
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${accent}33, ${accent}10)`,
            border: `1px solid ${accent}55`,
            boxShadow: `0 0 14px ${accent}33`,
          }}
        >
          <Icon size={18} style={{ color: accent }} />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: STEEL }}
          >
            <span style={{ color: accent }}>{eyebrowEn}</span>
          </div>
          <div
            className="mt-0.5 text-[11px] font-semibold leading-tight"
            style={{ color: STEEL_LIGHT }}
          >
            {eyebrowKh}
          </div>
        </div>
      </div>

      {/* Glyph */}
      <div className="my-5 flex flex-1 items-center justify-center">
        {children}
      </div>

      {/* Body copy */}
      <p
        className="text-[14px] leading-relaxed"
        style={{ color: STEEL_LIGHT }}
      >
        {isKh ? bodyKh : bodyEn}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((t, i) => (
          <Tag key={i} label={t.en} labelKh={t.kh} color={accent} />
        ))}
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  GLYPHS
// ────────────────────────────────────────────────────────────────────────────

function NanoBuilderGlyph() {
  // Robot-arm tweezers placing one atom into a Lego-like grid of placed atoms.
  return (
    <svg viewBox="0 0 200 130" width="200" height="130" aria-hidden>
      {/* Backing grid (dot stipple) */}
      <g opacity="0.18">
        {Array.from({ length: 8 }).map((_, gx) =>
          Array.from({ length: 5 }).map((_, gy) => (
            <circle
              key={`${gx}-${gy}`}
              cx={20 + gx * 22}
              cy={20 + gy * 18}
              r="0.7"
              fill={NEON_VIOLET}
            />
          )),
        )}
      </g>

      {/* Robot arm — base + jointed segments + tweezers, swaying gently */}
      <g style={{ animation: "maker-extrude 2.2s ease-in-out infinite" }}>
        {/* Base */}
        <rect x="14" y="12" width="14" height="6" rx="1" fill={VOID_2} stroke={NEON_VIOLET} strokeWidth="0.8" />
        {/* Upper arm */}
        <line x1="21" y1="18" x2="60" y2="44" stroke={NEON_VIOLET} strokeWidth="2" strokeLinecap="round" />
        <circle cx="60" cy="44" r="2.5" fill={VOID_2} stroke={NEON_PURPLE_LIGHT} strokeWidth="1" />
        {/* Lower arm */}
        <line x1="60" y1="44" x2="92" y2="62" stroke={NEON_INDIGO} strokeWidth="1.6" strokeLinecap="round" />
        {/* Tweezer head */}
        <g transform="translate(92,62)">
          <line x1="0" y1="0" x2="6" y2="10" stroke={NEON_PURPLE_LIGHT} strokeWidth="1.2" />
          <line x1="0" y1="0" x2="-6" y2="10" stroke={NEON_PURPLE_LIGHT} strokeWidth="1.2" />
          {/* The atom being held */}
          <g transform="translate(0,16)" style={{ animation: "apm-orbit 4s linear infinite", transformOrigin: "0 0" }}>
            <ellipse cx="0" cy="0" rx="6" ry="2" fill="none" stroke={NEON_VIOLET} strokeWidth="0.6" opacity="0.7" />
            <ellipse cx="0" cy="0" rx="2" ry="6" fill="none" stroke={NEON_ELECTRIC} strokeWidth="0.6" opacity="0.7" />
          </g>
          <circle
            cx="0"
            cy="16"
            r="3.2"
            fill={NEON_PURPLE_LIGHT}
            stroke={IVORY}
            strokeWidth="0.5"
            style={{ filter: `drop-shadow(0 0 4px ${NEON_VIOLET})` }}
          />
        </g>
      </g>

      {/* Lego-brick lattice of already-placed atoms (3 rows × 5 cols) */}
      <g transform="translate(40,90)">
        {Array.from({ length: 3 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => {
            // Leave one slot empty — that's where the tweezers will deliver.
            const isTarget = row === 0 && col === 4;
            const cx = col * 22 + 8;
            const cy = -row * 16;
            if (isTarget) {
              // Empty placeholder slot, dashed outline
              return (
                <circle
                  key={`s-${row}-${col}`}
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill="none"
                  stroke={NEON_PURPLE_LIGHT}
                  strokeWidth="0.7"
                  strokeDasharray="2 2"
                  opacity="0.65"
                />
              );
            }
            return (
              <g key={`s-${row}-${col}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="5"
                  fill={`${NEON_INDIGO}aa`}
                  stroke={NEON_INDIGO}
                  strokeWidth="0.7"
                />
                {/* tiny stud highlight */}
                <circle cx={cx - 1.2} cy={cy - 1.2} r="1.1" fill={NEON_PURPLE_LIGHT} opacity="0.7" />
              </g>
            );
          }),
        )}
      </g>
    </svg>
  );
}

function MechanoSynthGlyph({ isKh }: { isKh: boolean }) {
  // Atoms snapping into a hexagonal carbon lattice with force-vector arrows.
  // Honeycomb of 7 hexagons (1 center + 6 neighbours), one of which is
  // mid-snap with directional arrows.
  const hex = (cx: number, cy: number, r: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
    }
    return pts.join(" ");
  };

  // Centres of the honeycomb cells.
  const R = 14;
  const dx = R * Math.sqrt(3);
  const cx = 100;
  const cy = 65;
  const cells = [
    { x: cx, y: cy, snapping: false }, // centre
    { x: cx, y: cy - 2 * R, snapping: false }, // top
    { x: cx + dx, y: cy - R, snapping: false }, // top-right
    { x: cx + dx, y: cy + R, snapping: false }, // bottom-right
    { x: cx, y: cy + 2 * R, snapping: false }, // bottom
    { x: cx - dx, y: cy + R, snapping: true }, // bottom-left → animated snap
    { x: cx - dx, y: cy - R, snapping: false }, // top-left
  ];

  return (
    <svg viewBox="0 0 200 130" width="200" height="130" aria-hidden>
      {/* Background grid */}
      <g opacity="0.14">
        {Array.from({ length: 9 }).map((_, gx) =>
          Array.from({ length: 6 }).map((_, gy) => (
            <circle
              key={`bg-${gx}-${gy}`}
              cx={10 + gx * 22}
              cy={10 + gy * 22}
              r="0.7"
              fill={NEON_INDIGO}
            />
          )),
        )}
      </g>

      {/* Hex bonds */}
      {cells.map((c, i) =>
        c.snapping ? null : (
          <polygon
            key={`hex-${i}`}
            points={hex(c.x, c.y, R)}
            fill="none"
            stroke={NEON_INDIGO}
            strokeWidth="0.9"
            opacity="0.55"
          />
        ),
      )}

      {/* Atoms */}
      {cells.map((c, i) =>
        c.snapping ? null : (
          <circle
            key={`atom-${i}`}
            cx={c.x}
            cy={c.y}
            r="3.6"
            fill={`${NEON_INDIGO}cc`}
            stroke={NEON_PURPLE_LIGHT}
            strokeWidth="0.7"
          />
        ),
      )}

      {/* The snapping atom (offset, with force arrows) */}
      {(() => {
        const target = cells.find((c) => c.snapping)!;
        // Animated atom that hovers slightly above target
        return (
          <g style={{ animation: "maker-extrude 1.6s ease-in-out infinite" }}>
            {/* Force-vector arrows pointing inward toward the snap site */}
            <g stroke={NEON_VIOLET} strokeWidth="1" fill="none" opacity="0.85">
              <line x1={target.x - 18} y1={target.y - 14} x2={target.x - 5} y2={target.y - 4} />
              <polygon points={`${target.x - 5},${target.y - 4} ${target.x - 9},${target.y - 5} ${target.x - 7.5},${target.y - 1.5}`} fill={NEON_VIOLET} stroke="none" />
              <line x1={target.x - 18} y1={target.y + 14} x2={target.x - 5} y2={target.y + 4} />
              <polygon points={`${target.x - 5},${target.y + 4} ${target.x - 9},${target.y + 5} ${target.x - 7.5},${target.y + 1.5}`} fill={NEON_VIOLET} stroke="none" />
            </g>
            {/* Outline of where it will snap to */}
            <polygon
              points={hex(target.x, target.y, R)}
              fill="none"
              stroke={NEON_PURPLE_LIGHT}
              strokeWidth="0.7"
              strokeDasharray="2 2"
              opacity="0.7"
            />
            {/* The atom mid-snap, glowing */}
            <circle
              cx={target.x}
              cy={target.y}
              r="3.8"
              fill={NEON_PURPLE_LIGHT}
              stroke={IVORY}
              strokeWidth="0.6"
              style={{ filter: `drop-shadow(0 0 5px ${NEON_VIOLET})` }}
            />
          </g>
        );
      })()}

      {/* Label */}
      <g transform="translate(100,118)">
        <text
          x="0"
          y="0"
          fontFamily={isKh ? "ui-sans-serif, sans-serif" : "ui-monospace, monospace"}
          fontSize="8"
          fill={NEON_PURPLE_LIGHT}
          textAnchor="middle"
          opacity="0.9"
        >
          {isKh ? "ស្ទ្រាប់ពេជ្រ C₆" : "C₆ DIAMOND LATTICE"}
        </text>
      </g>
    </svg>
  );
}

function ScarcityGlyph({ isKh }: { isKh: boolean }) {
  // Bilingual labels for the inputs and outputs columns.
  const L = {
    dirt: isKh ? "ដី" : "dirt",
    air: isKh ? "ខ្យល់" : "air",
    sun: isKh ? "ថ្ងៃ" : "sun",
    medicine: isKh ? "ឱសថ" : "medicine",
    chip: isKh ? "បន្ទះ" : "chip",
    food: isKh ? "អាហារ" : "food",
  };
  // Inputs (dirt, air, sun) → APM box → Outputs (pill, chip, bread).
  return (
    <svg viewBox="0 0 220 130" width="220" height="130" aria-hidden>
      {/* Background grid */}
      <g opacity="0.16">
        {Array.from({ length: 10 }).map((_, gx) =>
          Array.from({ length: 5 }).map((_, gy) => (
            <circle
              key={`bg-${gx}-${gy}`}
              cx={12 + gx * 22}
              cy={14 + gy * 22}
              r="0.7"
              fill={NEON_ELECTRIC}
            />
          )),
        )}
      </g>

      {/* INPUTS column ─────────────────────────── */}
      <g transform="translate(20,30)">
        {/* Dirt — small mound */}
        <g>
          <path
            d="M 0,18 Q 8,4 16,18 Z"
            fill={`${NEON_ELECTRIC}55`}
            stroke={NEON_ELECTRIC}
            strokeWidth="0.7"
          />
          <text x="8" y="32" fontFamily="ui-sans-serif, sans-serif" fontSize="6" fill={STEEL_LIGHT} textAnchor="middle">
            {L.dirt}
          </text>
        </g>
        {/* Air — wavy lines */}
        <g transform="translate(0,42)">
          <path d="M 0,4 q 4,-4 8,0 t 8,0" fill="none" stroke={NEON_ELECTRIC} strokeWidth="1" />
          <path d="M 0,10 q 4,-4 8,0 t 8,0" fill="none" stroke={NEON_ELECTRIC} strokeWidth="1" />
          <text x="8" y="22" fontFamily="ui-sans-serif, sans-serif" fontSize="6" fill={STEEL_LIGHT} textAnchor="middle">
            {L.air}
          </text>
        </g>
        {/* Sun — circle with rays (recoloured to electric-blue glow to match
            the deep-tech palette; no amber here.) */}
        <g transform="translate(0,72)">
          <circle
            cx="8"
            cy="8"
            r="5"
            fill={NEON_PURPLE_LIGHT}
            opacity="0.9"
            style={{ filter: `drop-shadow(0 0 4px ${NEON_ELECTRIC})` }}
          />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const x1 = 8 + Math.cos(a) * 7.5;
            const y1 = 8 + Math.sin(a) * 7.5;
            const x2 = 8 + Math.cos(a) * 10.5;
            const y2 = 8 + Math.sin(a) * 10.5;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={NEON_ELECTRIC} strokeWidth="0.8" />;
          })}
          <text x="8" y="22" fontFamily="ui-sans-serif, sans-serif" fontSize="6" fill={STEEL_LIGHT} textAnchor="middle">
            {L.sun}
          </text>
        </g>
      </g>

      {/* Flow arrows IN → APM box ─────────────── */}
      {[36, 78, 108].map((y, i) => (
        <g key={`in-${i}`} stroke={NEON_VIOLET} strokeWidth="0.8" opacity="0.75">
          <line x1="48" y1={y} x2="86" y2={y} strokeDasharray="2 2" />
          <polygon
            points={`86,${y} 81,${y - 2.5} 81,${y + 2.5}`}
            fill={NEON_VIOLET}
            stroke="none"
          />
        </g>
      ))}

      {/* APM CENTRE BOX — octagon-ish ─────────── */}
      <g transform="translate(110,40)">
        {(() => {
          // 8-sided octagon
          const r = 26;
          const pts: string[] = [];
          for (let i = 0; i < 8; i++) {
            const a = (Math.PI / 4) * i + Math.PI / 8;
            pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
          }
          return (
            <>
              <polygon
                points={pts.join(" ")}
                fill={`${NEON_VIOLET}1c`}
                stroke={NEON_VIOLET}
                strokeWidth="1.1"
                style={{
                  filter: `drop-shadow(0 0 8px ${NEON_VIOLET}88)`,
                }}
              />
              {/* Inner spinning core */}
              <g style={{ animation: "apm-orbit 6s linear infinite", transformOrigin: "0 0" }}>
                <polygon
                  points={pts.map((p) => p.split(",").map((n) => (parseFloat(n) * 0.5).toFixed(2)).join(",")).join(" ")}
                  fill="none"
                  stroke={NEON_PURPLE_LIGHT}
                  strokeWidth="0.8"
                  opacity="0.85"
                />
              </g>
              <circle cx="0" cy="0" r="3" fill={NEON_PURPLE_LIGHT} style={{ filter: `drop-shadow(0 0 4px ${NEON_VIOLET})` }} />
              <text x="0" y="40" fontFamily="ui-monospace, monospace" fontSize="7" fill={NEON_PURPLE_LIGHT} textAnchor="middle" opacity="0.9">
                APM
              </text>
            </>
          );
        })()}
      </g>

      {/* Flow arrows APM box → OUT ──────────── */}
      {[36, 78, 108].map((y, i) => (
        <g key={`out-${i}`} stroke={NEON_ELECTRIC} strokeWidth="0.8" opacity="0.85">
          <line x1="146" y1={y} x2="184" y2={y} strokeDasharray="2 2" />
          <polygon
            points={`184,${y} 179,${y - 2.5} 179,${y + 2.5}`}
            fill={NEON_ELECTRIC}
            stroke="none"
          />
        </g>
      ))}

      {/* OUTPUTS column ─────────────────────────── */}
      <g transform="translate(190,30)">
        {/* Pill */}
        <g>
          <rect x="-3" y="2" width="20" height="10" rx="5" fill={`${NEON_VIOLET}66`} stroke={NEON_PURPLE_LIGHT} strokeWidth="0.7" />
          <line x1="7" y1="2" x2="7" y2="12" stroke={NEON_PURPLE_LIGHT} strokeWidth="0.7" />
          <text x="7" y="24" fontFamily="ui-sans-serif, sans-serif" fontSize="6" fill={STEEL_LIGHT} textAnchor="middle">
            {L.medicine}
          </text>
        </g>
        {/* Chip */}
        <g transform="translate(0,42)">
          <rect x="-1" y="3" width="16" height="10" fill={VOID_2} stroke={NEON_ELECTRIC} strokeWidth="0.7" />
          {[3, 8, 13].map((px) => (
            <line key={`u-${px}`} x1={px} y1="3" x2={px} y2="0" stroke={NEON_ELECTRIC} strokeWidth="0.6" />
          ))}
          {[3, 8, 13].map((px) => (
            <line key={`d-${px}`} x1={px} y1="13" x2={px} y2="16" stroke={NEON_ELECTRIC} strokeWidth="0.6" />
          ))}
          <circle cx="7" cy="8" r="1.4" fill={NEON_ELECTRIC} />
          <text x="7" y="24" fontFamily="ui-sans-serif, sans-serif" fontSize="6" fill={STEEL_LIGHT} textAnchor="middle">
            {L.chip}
          </text>
        </g>
        {/* Bread / wheat — recoloured to indigo to match the deep-tech palette. */}
        <g transform="translate(0,72)">
          <ellipse cx="7" cy="9" rx="9" ry="5" fill={`${NEON_INDIGO}55`} stroke={NEON_INDIGO} strokeWidth="0.7" />
          <line x1="2" y1="8" x2="12" y2="8" stroke={NEON_PURPLE_LIGHT} strokeWidth="0.5" opacity="0.7" />
          <line x1="3" y1="11" x2="11" y2="11" stroke={NEON_PURPLE_LIGHT} strokeWidth="0.5" opacity="0.6" />
          <text x="7" y="22" fontFamily="ui-sans-serif, sans-serif" fontSize="6" fill={STEEL_LIGHT} textAnchor="middle">
            {L.food}
          </text>
        </g>
      </g>
    </svg>
  );
}
