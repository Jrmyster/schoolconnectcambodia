import React, { useEffect, useState } from "react";
import { type ComponentType } from "react";
import { Link } from "wouter";
import {
  Ship,
  Anchor,
  Container,
  Waves,
  ArrowLeft,
  Ruler,
  Droplets,
  Map,
  AlertTriangle,
  Navigation,
  Globe2,
  Scale,
  Compass,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// Detect the user's OS-level "reduce motion" preference so we can disable
// SVG SMIL animations (CSS animations are already gated via media query).
function usePrefersReducedMotion() {
  // Lazy initial value reads matchMedia synchronously on first render so that
  // SMIL animations never flash on for users who have reduced motion enabled.
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

// ════════════════════════════════════════════════════════════════════════════
//  TECH-XX · Maritime Tech: Shipping & Buoyancy
//  Aesthetic: Industrial port — deep ocean blues, steel greys, cargo accents
// ════════════════════════════════════════════════════════════════════════════

// Palette
const ABYSS = "#040b14";          // deepest background
const DEEP_OCEAN = "#0a1830";     // panel background
const MARINE = "#0f2440";         // card background
const NAVY = "#15355c";           // mid-blue accent
const STEEL = "#94a3b8";          // secondary text
const STEEL_LIGHT = "#cbd5e1";    // primary muted text
const STEEL_DARK = "#475569";
const HULL_GREY = "#3a4452";      // ship hull
const RUST = "#7c2d12";           // weathered hull line
const CARGO_ORANGE = "#f97316";   // primary cargo accent
const CARGO_RED = "#ef4444";      // secondary cargo accent
const SAFETY_YELLOW = "#facc15";  // plimsoll line / hazard
const FOAM = "#7dd3fc";           // sea foam highlight
const TEAL = "#14b8a6";           // shipping lane
const IVORY = "#f5f5f4";

const PAGE_STYLE: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(1100px 600px at 8% -8%, rgba(20,184,166,0.10), transparent 60%), " +
    "radial-gradient(900px 500px at 92% 12%, rgba(249,115,22,0.08), transparent 60%), " +
    "linear-gradient(180deg, #040b14 0%, #0a1830 60%, #040b14 100%)",
  backgroundColor: ABYSS,
};

// ════════════════════════════════════════════════════════════════════════════
//  ROOT
// ════════════════════════════════════════════════════════════════════════════

export default function MaritimeTechPage() {
  const language = useLanguageStore((s) => s.language);
  const isKh = language === "kh";
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="maritime-page min-h-screen text-slate-100" style={PAGE_STYLE}>
      {/* Top hairline — water surface */}
      <div
        aria-hidden
        className="h-[2px] w-full"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, ${FOAM}, ${TEAL}, ${FOAM}, transparent)`,
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

        <Hero isKh={isKh} reducedMotion={reducedMotion} />

        <div className="mt-16 space-y-16">
          <BuoyancySection isKh={isKh} />
          <MegaShipsSection isKh={isKh} />
          <ShippingLanesSection isKh={isKh} />
          <ClosingStrip isKh={isKh} />
        </div>
      </main>

      <style>{`
        @keyframes maritime-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        @keyframes maritime-wave {
          0%   { transform: translateX(-12px); }
          100% { transform: translateX(0); }
        }
        @keyframes maritime-pulse {
          0%, 100% { opacity: 1;   filter: drop-shadow(0 0 2px currentColor); }
          50%      { opacity: 0.6; filter: drop-shadow(0 0 8px currentColor); }
        }
        @keyframes maritime-flow {
          from { stroke-dashoffset: 0;   }
          to   { stroke-dashoffset: -32; }
        }
        @keyframes maritime-bubble {
          0%   { transform: translateY(0)   scale(0.4); opacity: 0;   }
          30%  { opacity: 0.8;                                           }
          100% { transform: translateY(-22px) scale(1);   opacity: 0;   }
        }
        @media (prefers-reduced-motion: reduce) {
          .maritime-page svg *, .maritime-page [style*="animation"] {
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

function Hero({ isKh, reducedMotion }: { isKh: boolean; reducedMotion: boolean }) {
  return (
    <section className="grid items-center gap-10 lg:grid-cols-[1.4fr,1fr]">
      <div>
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold tracking-[0.18em]"
          style={{
            borderColor: `${TEAL}66`,
            backgroundColor: `${TEAL}14`,
            color: TEAL,
          }}
        >
          <Ship size={13} />
          <span>MARITIME TECH</span>
          <span style={{ color: STEEL }}>·</span>
          <span style={{ color: STEEL_LIGHT }}>បច្ចេកវិទ្យាសមុទ្រ</span>
        </div>

        <h1
          className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl"
          style={{ color: IVORY }}
        >
          {isKh ? (
            <>
              បច្ចេកវិទ្យាសមុទ្រ៖{" "}
              <span style={{ color: CARGO_ORANGE }}>
                ការដឹកជញ្ជូន និងការអណ្តែត
              </span>
            </>
          ) : (
            <>
              Maritime Tech:{" "}
              <span style={{ color: CARGO_ORANGE }}>
                Shipping &amp; Buoyancy
              </span>
            </>
          )}
        </h1>

        <p
          className="mt-4 max-w-xl text-[15px] leading-relaxed"
          style={{ color: STEEL_LIGHT }}
        >
          {isKh
            ? "ហេតុអ្វីបានជាកប៉ាល់ដែកអាចអណ្តែតលើទឹក? តើអ្វីទៅជាបន្ទាត់កំណត់ទម្ងន់ Plimsoll? ហើយតើពាណិជ្ជកម្មពិភពលោក ៩០% ឆ្លងកាត់មហាវិថីមើលមិនឃើញដោយរបៀបណា? ការសិក្សាបីផ្នែកអំពីរូបវិទ្យានៃការអណ្តែត ការរចនាកប៉ាល់យក្ស និងផ្លូវមហាសមុទ្រដែលផ្តល់អាហារដល់ពិភពលោកទាំងមូល។"
            : "Why does a steel ship float when a steel nail sinks? What is the Plimsoll Line? And how do 90% of all global goods cross invisible highways drawn on the ocean? Three sections on the physics of buoyancy, the engineering of mega-ships, and the salt-water motorways that feed the world."}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Pill icon={Anchor} label="Buoyancy" labelKh="ការអណ្តែត" color={FOAM} />
          <Pill icon={Container} label="Cargo" labelKh="ទំនិញ" color={CARGO_ORANGE} />
          <Pill icon={Ruler} label="Plimsoll" labelKh="បន្ទាត់ Plimsoll" color={SAFETY_YELLOW} />
          <Pill icon={Map} label="Lanes" labelKh="ផ្លូវ" color={TEAL} />
          <Pill icon={Globe2} label="Trade" labelKh="ពាណិជ្ជកម្ម" color={CARGO_RED} />
        </div>
      </div>

      {/* Right: Container ship illustration on water */}
      <div className="flex justify-center lg:justify-end">
        <ContainerShipHero reducedMotion={reducedMotion} />
      </div>
    </section>
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

function ContainerShipHero({ reducedMotion }: { reducedMotion: boolean }) {
  // A fully-loaded container ship gently bobbing in dark water with a
  // sun glint above the horizon.
  const containers = [
    { x: 70, y: 138, color: CARGO_ORANGE },
    { x: 110, y: 138, color: CARGO_RED },
    { x: 150, y: 138, color: "#0ea5e9" },
    { x: 190, y: 138, color: CARGO_ORANGE },
    { x: 230, y: 138, color: SAFETY_YELLOW },
    { x: 90, y: 122, color: CARGO_RED },
    { x: 130, y: 122, color: CARGO_ORANGE },
    { x: 170, y: 122, color: "#0ea5e9" },
    { x: 210, y: 122, color: SAFETY_YELLOW },
    { x: 110, y: 106, color: CARGO_ORANGE },
    { x: 150, y: 106, color: CARGO_RED },
    { x: 190, y: 106, color: "#0ea5e9" },
  ];
  return (
    <svg
      viewBox="0 0 320 320"
      className="h-[260px] w-[260px] sm:h-[300px] sm:w-[300px]"
      aria-hidden
    >
      <defs>
        <linearGradient id="seaSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="60%" stopColor="#0a1830" />
          <stop offset="100%" stopColor="#040b14" />
        </linearGradient>
        <linearGradient id="seaWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e2747" />
          <stop offset="100%" stopColor="#04101f" />
        </linearGradient>
        <radialGradient id="sunGlint" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={SAFETY_YELLOW} stopOpacity="0.9" />
          <stop offset="100%" stopColor={SAFETY_YELLOW} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Frame */}
      <rect x="10" y="10" width="300" height="300" rx="14" fill="url(#seaSky)" stroke="#1f2330" strokeWidth="1" />

      {/* Sun glint on the horizon */}
      <circle cx="245" cy="170" r="22" fill="url(#sunGlint)" />

      {/* Water */}
      <rect x="10" y="200" width="300" height="110" fill="url(#seaWater)" />

      {/* Distant horizon hairline */}
      <line x1="10" y1="200" x2="310" y2="200" stroke={FOAM} strokeWidth="0.5" opacity="0.5" />

      {/* Animated wave layers */}
      {[212, 228, 248, 272, 296].map((y, i) => (
        <path
          key={y}
          d={`M-20,${y} q15,-4 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0`}
          fill="none"
          stroke={FOAM}
          strokeWidth="0.6"
          opacity={0.45 - i * 0.07}
          style={{ animation: `maritime-wave ${5 + i}s linear infinite` }}
        />
      ))}

      {/* Ship body — bobs gently */}
      <g style={{ animation: "maritime-bob 5s ease-in-out infinite" }}>
        {/* Hull */}
        <path
          d="M50,180 L260,180 L240,210 L70,210 Z"
          fill={HULL_GREY}
          stroke={STEEL_DARK}
          strokeWidth="1"
        />
        {/* Deck plate */}
        <rect x="50" y="170" width="210" height="12" fill={STEEL_DARK} stroke={STEEL} strokeWidth="0.5" />
        {/* Plimsoll mark on the hull (the famous load line) */}
        <circle cx="65" cy="195" r="5" fill="none" stroke={SAFETY_YELLOW} strokeWidth="1.4" />
        <line x1="55" y1="195" x2="75" y2="195" stroke={SAFETY_YELLOW} strokeWidth="1.4" />
        <text x="80" y="198" fontFamily="ui-monospace, monospace" fontSize="6" fill={SAFETY_YELLOW}>
          PLIMSOLL
        </text>
        {/* Rust streak */}
        <line x1="240" y1="180" x2="232" y2="208" stroke={RUST} strokeWidth="1" opacity="0.6" />

        {/* Containers */}
        {containers.map((c, i) => (
          <g key={i}>
            <rect
              x={c.x}
              y={c.y}
              width="34"
              height="14"
              rx="1"
              fill={c.color}
              stroke="#000"
              strokeWidth="0.4"
              opacity="0.95"
            />
            {/* corrugation lines */}
            <line x1={c.x + 4} y1={c.y + 2} x2={c.x + 4} y2={c.y + 12} stroke="#000" strokeWidth="0.3" opacity="0.4" />
            <line x1={c.x + 12} y1={c.y + 2} x2={c.x + 12} y2={c.y + 12} stroke="#000" strokeWidth="0.3" opacity="0.4" />
            <line x1={c.x + 22} y1={c.y + 2} x2={c.x + 22} y2={c.y + 12} stroke="#000" strokeWidth="0.3" opacity="0.4" />
            <line x1={c.x + 30} y1={c.y + 2} x2={c.x + 30} y2={c.y + 12} stroke="#000" strokeWidth="0.3" opacity="0.4" />
          </g>
        ))}

        {/* Bridge (superstructure) */}
        <rect x="48" y="148" width="22" height="22" fill={STEEL_LIGHT} stroke={STEEL_DARK} strokeWidth="0.6" />
        <rect x="51" y="151" width="6" height="4" fill="#0ea5e9" opacity="0.8" />
        <rect x="60" y="151" width="6" height="4" fill="#0ea5e9" opacity="0.8" />
        <rect x="51" y="158" width="6" height="4" fill="#0ea5e9" opacity="0.6" />
        <rect x="60" y="158" width="6" height="4" fill="#0ea5e9" opacity="0.6" />

        {/* Smokestack */}
        <rect x="35" y="138" width="10" height="32" fill={HULL_GREY} stroke={STEEL_DARK} strokeWidth="0.5" />
        <rect x="36" y="136" width="8" height="3" fill={CARGO_RED} />
        <rect x="36" y="142" width="8" height="2" fill={IVORY} />
      </g>

      {/* Foam at the bow */}
      <g style={{ animation: "maritime-pulse 3s ease-in-out infinite", color: FOAM }}>
        <ellipse cx="270" cy="207" rx="14" ry="2.5" fill={FOAM} opacity="0.5" />
        <ellipse cx="280" cy="212" rx="10" ry="1.8" fill={FOAM} opacity="0.4" />
      </g>

      {/* Bubbles rising — gated on prefers-reduced-motion */}
      {reducedMotion ? (
        <g fill={FOAM} opacity="0.45">
          <circle cx="120" cy="235" r="2" />
          <circle cx="180" cy="250" r="1.5" />
          <circle cx="220" cy="245" r="1.8" />
        </g>
      ) : (
        <g fill={FOAM} opacity="0.6">
          <circle cx="120" cy="240" r="2">
            <animate attributeName="cy" values="250;220" dur="3.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.6;0" dur="3.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="180" cy="260" r="1.5">
            <animate attributeName="cy" values="270;235" dur="4.1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.6;0" dur="4.1s" repeatCount="indefinite" />
          </circle>
          <circle cx="220" cy="250" r="1.8">
            <animate attributeName="cy" values="265;225" dur="3.7s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.6;0" dur="3.7s" repeatCount="indefinite" />
          </circle>
        </g>
      )}

      {/* HUD */}
      <text x="22" y="32" fontFamily="ui-monospace, monospace" fontSize="9" fill={TEAL}>
        ◢ M/V CHUY-SALA · 20,000 TEU
      </text>
      <text x="298" y="32" fontFamily="ui-monospace, monospace" fontSize="9" fill={CARGO_ORANGE} textAnchor="end">
        ● UNDERWAY
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
          <span className="font-mono text-xs font-bold tracking-[0.2em]" style={{ color: accent }}>
            {number}
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: STEEL_LIGHT }}>
            {kicker}
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: STEEL }}>
            {kickerKh}
          </span>
        </div>
      </div>

      <h2 className="text-3xl font-black tracking-tight sm:text-4xl" style={{ color: IVORY }}>
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

      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed" style={{ color: STEEL_LIGHT }}>
        {isKh ? introKh : intro}
      </p>

      <div className="mt-7">{children}</div>
    </section>
  );
}

function Card({
  children,
  accent,
  testId,
}: {
  children: React.ReactNode;
  accent: string;
  testId?: string;
}) {
  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      data-testid={testId}
      style={{
        borderColor: `${accent}33`,
        backgroundColor: MARINE,
        boxShadow: `0 0 0 1px ${accent}10 inset, 0 4px 24px rgba(0,0,0,0.35)`,
      }}
    >
      {children}
    </div>
  );
}

function CardHeading({
  icon: Icon,
  titleEn,
  titleKh,
  accent,
}: {
  icon: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  titleEn: string;
  titleKh: string;
  accent: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <Icon size={18} style={{ color: accent }} />
      <div>
        <div className="text-base font-bold" style={{ color: IVORY }}>
          {titleEn}
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: STEEL }}>
          {titleKh}
        </div>
      </div>
    </div>
  );
}

function Bilingual({
  en,
  kh,
  isKh,
}: {
  en: string;
  kh: string;
  isKh: boolean;
}) {
  return (
    <p className="text-[14px] leading-relaxed" style={{ color: STEEL_LIGHT }}>
      {isKh ? kh : en}
    </p>
  );
}

function KeyTerm({
  en,
  kh,
  color,
}: {
  en: string;
  kh: string;
  color: string;
}) {
  return (
    <span
      className="mr-1 inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
      style={{
        borderColor: `${color}55`,
        backgroundColor: `${color}12`,
        color,
      }}
    >
      {en}
      <span style={{ color: `${color}88` }}>·</span>
      <span style={{ color: STEEL_LIGHT }}>{kh}</span>
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 1 · THE PHYSICS OF FLOATING
// ════════════════════════════════════════════════════════════════════════════

function BuoyancySection({ isKh }: { isKh: boolean }) {
  return (
    <SectionShell
      kicker="THE PHYSICS OF FLOATING"
      kickerKh="រូបវិទ្យានៃការអណ្តែត"
      number="01"
      icon={Anchor}
      titleEn="Why Things Float"
      titleKh="ហេតុអ្វីវត្ថុអណ្តែត"
      isKh={isKh}
      intro="Drop a marble in a bucket and it sinks. Drop a steel battleship in the ocean — many tens of thousands of tonnes of metal — and it floats. The difference is not the material, it is the shape. Two ideas explain everything: Archimedes' Principle, and average density."
      introKh="ទម្លាក់សំបុកដំបងក្នុងធុង វាលង់។ ទម្លាក់នាវាដែករាប់ម៉ឺនតោនទៅក្នុងមហាសមុទ្រ វាអណ្តែត។ ភាពខុសគ្នាមិនមែននៅសម្ភារៈទេ — គឺនៅរូបរាង។ មានគំនិតពីរដែលពន្យល់អស់ទាំងអស់៖ គោលការណ៍ Archimedes និងដង់ស៊ីតេមធ្យម។"
      testId="section-buoyancy"
      accent={FOAM}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {/* Card A — Archimedes' Principle */}
        <Card accent={FOAM} testId="card-archimedes">
          <CardHeading
            icon={Droplets}
            titleEn="Archimedes' Principle"
            titleKh="គោលការណ៍ Archimedes"
            accent={FOAM}
          />
          <div className="mb-3">
            <KeyTerm en="Buoyancy" kh="ការអណ្តែត" color={FOAM} />
            <KeyTerm en="Displacement" kh="ការរុញចេញ" color={TEAL} />
          </div>
          <Bilingual
            isKh={isKh}
            en="When you put any object in water, it pushes some water out of the way. The water pushes back up with a force equal to the weight of the water that was pushed aside. This upward push is buoyancy. If the buoyancy force is bigger than the object's weight, the object floats. If smaller, it sinks."
            kh="ពេលអ្នកដាក់វត្ថុណាមួយក្នុងទឹក វារុញទឹកមួយចំនួនចេញ។ ទឹករុញត្រឡប់ឡើងវិញដោយកម្លាំងស្មើនឹងទម្ងន់ទឹកដែលត្រូវបានរុញចេញ។ កម្លាំងរុញឡើងលើនេះគឺជាការអណ្តែត (កម្លាំងរុញច្រានពីក្រោម)។ បើកម្លាំងនេះធំជាងទម្ងន់វត្ថុ វត្ថុនោះអណ្តែត។ បើតូចជាង វាលង់។"
          />

          <div className="mt-4">
            <ArchimedesDiagram isKh={isKh} />
          </div>

          <div
            className="mt-4 rounded-lg border-l-2 p-3 text-[12px] leading-relaxed"
            style={{
              borderColor: FOAM,
              backgroundColor: `${FOAM}08`,
              color: STEEL_LIGHT,
            }}
          >
            <strong style={{ color: FOAM }}>{isKh ? "ឧទាហរណ៍ " : "Example "}</strong>
            {isKh
              ? "កប៉ាល់ដែលមានទម្ងន់ ៥០,០០០ តោនត្រូវរុញទឹកស្មើ ៥០,០០០ តោនចេញ ដើម្បីអាចអណ្តែត។ វារុញទឹកនោះចេញតាមរូបរាងដែកធំទូលាយរបស់វា។"
              : "A 50,000-tonne ship must displace 50,000 tonnes of water to float. Its wide steel hull pushes that much water out of the way."}
          </div>
        </Card>

        {/* Card B — The Steel Paradox */}
        <Card accent={CARGO_ORANGE} testId="card-steel-paradox">
          <CardHeading
            icon={Scale}
            titleEn="The Steel Paradox"
            titleKh="ភាពផ្ទុយគ្នានៃដែក"
            accent={CARGO_ORANGE}
          />
          <div className="mb-3">
            <KeyTerm en="Average Density" kh="ដង់ស៊ីតេមធ្យម" color={CARGO_ORANGE} />
            <KeyTerm en="Hollow Hull" kh="សំបកកប៉ាល់ប្រហោង" color={SAFETY_YELLOW} />
          </div>
          <Bilingual
            isKh={isKh}
            en="A steel nail sinks instantly. So why doesn't a steel ship — millions of times heavier — also sink? Because a ship is not a solid block of steel. It is a thin steel shell wrapped around an enormous volume of air. Density is mass divided by volume. The huge inner volume of air drags the ship's average density down below water's density (1.0 g/cm³), and so it floats."
            kh="ដែកគោលលង់ភ្លាមៗ។ ដូច្នេះហេតុអ្វីបានជាកប៉ាល់ដែក — ដែលធ្ងន់ជាងរាប់លានដង — មិនលង់ដែរ? ព្រោះកប៉ាល់មិនមែនជាដុំដែកតាន់។ វាគឺជាសំបកដែកស្ដើងព័ទ្ធជុំវិញខ្យល់រាប់ពាន់ម៉ែត្រគូប។ ដង់ស៊ីតេ = ម៉ាស / មាឌ។ មាឌខ្យល់ដ៏ធំនៅខាងក្នុងធ្វើឱ្យដង់ស៊ីតេមធ្យមនៃកប៉ាល់ទាបជាងដង់ស៊ីតេទឹក (១.០ g/cm³) ហេតុដូច្នេះវាអណ្តែត។"
          />

          <div className="mt-4">
            <NailVsShipDiagram isKh={isKh} />
          </div>

          <div
            className="mt-4 rounded-lg border-l-2 p-3 text-[12px] leading-relaxed"
            style={{
              borderColor: CARGO_ORANGE,
              backgroundColor: `${CARGO_ORANGE}08`,
              color: STEEL_LIGHT,
            }}
          >
            <strong style={{ color: CARGO_ORANGE }}>
              {isKh ? "ការសាកល្បង " : "Test it "}
            </strong>
            {isKh
              ? "ស្រាយក្រដាសបន្ទះក្នុងទឹក — វាលង់។ បត់ដូចគ្នានោះជារាងទូក — វាអណ្តែត។ សម្ភារៈដូចគ្នា រូបរាងផ្សេងគ្នា លទ្ធផលផ្សេងគ្នា។"
              : "Crumple aluminium foil into a tight ball — it sinks. Re-fold it as a boat — it floats. Same metal, different shape, different result."}
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}

function ArchimedesDiagram({ isKh }: { isKh: boolean }) {
  return (
    <svg viewBox="0 0 320 150" className="w-full" aria-hidden>
      {/* Beaker */}
      <rect x="40" y="20" width="160" height="110" rx="4" fill="none" stroke={STEEL_LIGHT} strokeWidth="1.2" />
      {/* Water level */}
      <rect x="40" y="60" width="160" height="70" fill={NAVY} opacity="0.7" />
      <line x1="40" y1="60" x2="200" y2="60" stroke={FOAM} strokeWidth="0.6" />
      {/* Submerged block */}
      <rect x="100" y="70" width="40" height="40" fill={CARGO_ORANGE} stroke="#000" strokeWidth="0.4" />
      {/* Up arrow (buoyancy force) */}
      <line x1="120" y1="125" x2="120" y2="80" stroke={FOAM} strokeWidth="2" markerEnd="url(#arr-up)" />
      <text x="125" y="98" fontFamily="ui-monospace, monospace" fontSize="9" fill={FOAM}>
        Buoyancy
      </text>
      <text x="125" y="108" fontFamily="ui-monospace, monospace" fontSize="8" fill={STEEL_LIGHT}>
        ការអណ្តែត
      </text>
      {/* Down arrow (weight) */}
      <line x1="160" y1="55" x2="160" y2="100" stroke={CARGO_RED} strokeWidth="2" markerEnd="url(#arr-down)" />
      <text x="165" y="76" fontFamily="ui-monospace, monospace" fontSize="9" fill={CARGO_RED}>
        Weight
      </text>
      <text x="165" y="86" fontFamily="ui-monospace, monospace" fontSize="8" fill={STEEL_LIGHT}>
        ទម្ងន់
      </text>
      {/* Displaced water spill into right cup */}
      <path
        d="M200,80 q12,-10 24,4 l0,40 l-24,0 Z"
        fill={NAVY}
        opacity="0.7"
        stroke={STEEL_LIGHT}
        strokeWidth="1"
      />
      <text x="225" y="76" fontFamily="ui-monospace, monospace" fontSize="9" fill={FOAM}>
        Displaced water
      </text>
      <text x="225" y="86" fontFamily="ui-monospace, monospace" fontSize="8" fill={STEEL_LIGHT}>
        ទឹកត្រូវរុញចេញ
      </text>
      {/* Title */}
      <text x="40" y="14" fontFamily="ui-monospace, monospace" fontSize="9" fill={FOAM}>
        {isKh ? "គោលការណ៍ Archimedes · ARCHIMEDES" : "ARCHIMEDES · គោលការណ៍ Archimedes"}
      </text>

      <defs>
        <marker id="arr-up" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto">
          <path d="M0,6 L3,0 L6,6 Z" fill={FOAM} />
        </marker>
        <marker id="arr-down" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
          <path d="M0,0 L3,6 L6,0 Z" fill={CARGO_RED} />
        </marker>
      </defs>
    </svg>
  );
}

function NailVsShipDiagram({ isKh }: { isKh: boolean }) {
  return (
    <svg viewBox="0 0 320 150" className="w-full" aria-hidden>
      {/* Water */}
      <rect x="0" y="80" width="320" height="70" fill={NAVY} opacity="0.7" />
      <line x1="0" y1="80" x2="320" y2="80" stroke={FOAM} strokeWidth="0.6" />

      {/* Left side — nail sinking */}
      <text x="60" y="22" fontFamily="ui-monospace, monospace" fontSize="10" fill={STEEL_LIGHT} textAnchor="middle">
        {isKh ? "ដែកគោល · NAIL" : "STEEL NAIL · ដែកគោល"}
      </text>
      <text x="60" y="36" fontFamily="ui-monospace, monospace" fontSize="9" fill={CARGO_RED} textAnchor="middle">
        ρ = 7.8 g/cm³
      </text>
      <line x1="60" y1="100" x2="60" y2="135" stroke={STEEL_LIGHT} strokeWidth="3" />
      <polygon points="56,135 64,135 60,140" fill={STEEL_LIGHT} />
      <line x1="60" y1="105" x2="60" y2="115" stroke={CARGO_RED} strokeWidth="2" markerEnd="url(#arr-sink)" />
      <text x="74" y="120" fontFamily="ui-monospace, monospace" fontSize="9" fill={CARGO_RED}>
        SINKS
      </text>
      <text x="74" y="130" fontFamily="ui-monospace, monospace" fontSize="8" fill={STEEL_LIGHT}>
        លង់
      </text>

      {/* Right side — ship floating */}
      <text x="220" y="22" fontFamily="ui-monospace, monospace" fontSize="10" fill={STEEL_LIGHT} textAnchor="middle">
        {isKh ? "កប៉ាល់ · SHIP" : "STEEL SHIP · កប៉ាល់ដែក"}
      </text>
      <text x="220" y="36" fontFamily="ui-monospace, monospace" fontSize="9" fill={FOAM} textAnchor="middle">
        ρ_avg ≈ 0.4 g/cm³
      </text>
      {/* Ship hull */}
      <path d="M170,75 L270,75 L255,95 L185,95 Z" fill={HULL_GREY} stroke={STEEL_DARK} strokeWidth="0.6" />
      {/* Containers on top */}
      <rect x="180" y="65" width="20" height="10" fill={CARGO_ORANGE} />
      <rect x="205" y="65" width="20" height="10" fill={CARGO_RED} />
      <rect x="230" y="65" width="20" height="10" fill={SAFETY_YELLOW} />
      {/* Air-filled cavity inside */}
      <text x="220" y="88" fontFamily="ui-monospace, monospace" fontSize="6" fill={IVORY} textAnchor="middle">
        AIR · ខ្យល់
      </text>
      {/* Buoyancy arrow */}
      <line x1="220" y1="115" x2="220" y2="98" stroke={FOAM} strokeWidth="2" markerEnd="url(#arr-up2)" />
      <text x="232" y="112" fontFamily="ui-monospace, monospace" fontSize="9" fill={FOAM}>
        FLOATS
      </text>
      <text x="232" y="122" fontFamily="ui-monospace, monospace" fontSize="8" fill={STEEL_LIGHT}>
        អណ្តែត
      </text>

      <defs>
        <marker id="arr-sink" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
          <path d="M0,0 L3,6 L6,0 Z" fill={CARGO_RED} />
        </marker>
        <marker id="arr-up2" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto">
          <path d="M0,6 L3,0 L6,6 Z" fill={FOAM} />
        </marker>
      </defs>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 2 · ENGINEERING MEGA-SHIPS
// ════════════════════════════════════════════════════════════════════════════

function MegaShipsSection({ isKh }: { isKh: boolean }) {
  return (
    <SectionShell
      kicker="ENGINEERING MEGA-SHIPS"
      kickerKh="ការរចនាកប៉ាល់យក្ស"
      number="02"
      icon={Container}
      titleEn="The Scale of a Modern Container Ship"
      titleKh="ខ្នាតនៃកប៉ាល់ដឹកកុងតឺន័រ"
      isKh={isKh}
      intro="Modern container ships are some of the largest moving objects ever built by humans. The biggest are longer than three football fields end-to-end, taller than 24-storey buildings, and can carry over 24,000 standard shipping containers — enough to fill a freight train more than 100 km long if you parked them bumper to bumper."
      introKh="កប៉ាល់ដឹកកុងតឺន័រសម័យថ្មីគឺជាវត្ថុដែលផ្លាស់ទីដ៏ធំបំផុតមួយដែលមនុស្សធ្លាប់សាងសង់។ កប៉ាល់ធំបំផុតវែងជាងទីលានបាល់ទាត់ ៣ បន្ត ខ្ពស់ជាងអគារ ២៤ ជាន់ ហើយអាចដឹកកុងតឺន័រស្តង់ដារជាង ២៤,០០០ — គ្រប់គ្រាន់បំពេញរថភ្លើងដឹកទំនិញដែលវែងជាង ១០០ គីឡូម៉ែត្របើដាក់តគ្នា។"
      testId="section-mega-ships"
      accent={CARGO_ORANGE}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {/* Card A — Scale */}
        <Card accent={CARGO_ORANGE} testId="card-scale">
          <CardHeading
            icon={Ruler}
            titleEn="Three Football Fields Long"
            titleKh="វែងដូចទីលានបាល់ទាត់ ៣ បន្ត"
            accent={CARGO_ORANGE}
          />
          <Bilingual
            isKh={isKh}
            en="The 'Ever Ace' class of container ships measures 400 m long, 62 m wide, and stacks containers 10 high above deck (and 11 deep below). Each ship can carry over 24,000 TEU — Twenty-foot Equivalent Units, the standard size of a shipping container. A single ship's cargo can fill the cargo holds of about 100 Boeing 747 freighters."
            kh="កប៉ាល់ប្រភេទ 'Ever Ace' មានប្រវែង ៤០០ ម៉ែត្រ ទទឹង ៦២ ម៉ែត្រ ហើយដាក់កុងតឺន័រគរ ១០ ស្រទាប់លើផ្ទៃកប៉ាល់ (និង ១១ ស្រទាប់នៅខាងក្រោម)។ កប៉ាល់នីមួយៗអាចដឹក TEU ជាង ២៤,០០០ — TEU គឺជាខ្នាតស្តង់ដារនៃកុងតឺន័រដឹកជញ្ជូន។ ទំនិញនៅលើកប៉ាល់តែមួយអាចបំពេញកប៉ាល់ដឹកទំនិញ Boeing 747 ចំនួន ១០០ គ្រឿង។"
          />

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat value="400 m" label={isKh ? "ប្រវែង" : "Length"} sub={isKh ? "ទីលានបាល់ ៣បន្ត" : "≈ 3 football fields"} accent={CARGO_ORANGE} />
            <Stat value="24K" label={isKh ? "កុងតឺន័រ" : "Containers"} sub={isKh ? "TEU" : "TEU max"} accent={CARGO_RED} />
            <Stat value="220K" label={isKh ? "ទម្ងន់" : "Tonnes"} sub={isKh ? "ផ្ទុកអស់" : "fully laden"} accent={SAFETY_YELLOW} />
          </div>

          <div className="mt-5">
            <ScaleComparisonDiagram isKh={isKh} />
          </div>
        </Card>

        {/* Card B — Plimsoll Line */}
        <Card accent={SAFETY_YELLOW} testId="card-plimsoll">
          <CardHeading
            icon={Scale}
            titleEn="The Plimsoll Line"
            titleKh="បន្ទាត់ Plimsoll (បន្ទាត់កំណត់ទម្ងន់)"
            accent={SAFETY_YELLOW}
          />
          <div className="mb-3">
            <KeyTerm en="Load Line" kh="បន្ទាត់ផ្ទុក" color={SAFETY_YELLOW} />
            <KeyTerm en="Salinity" kh="ភាពប្រៃ" color={FOAM} />
            <KeyTerm en="Temperature" kh="សីតុណ្ហភាព" color={CARGO_RED} />
          </div>
          <Bilingual
            isKh={isKh}
            en="The Plimsoll Line — a small painted circle and ladder of horizontal stripes on the side of every ocean-going ship — tells the captain exactly how heavily she can be loaded before she becomes dangerous to sail. It was invented in the 1870s by Samuel Plimsoll, a British politician who was horrified that overloaded 'coffin ships' were sinking with their crews."
            kh="បន្ទាត់ Plimsoll — រង្វង់តូចមួយ និងជណ្ដើរបន្ទាត់ផ្ដេកដែលលាបនៅផ្នែកខាងលើនៃកប៉ាល់ឆ្លងសមុទ្រគ្រប់គ្រឿង — ប្រាប់នាយកនាវាយ៉ាងជាក់លាក់ថា កប៉ាល់អាចផ្ទុកធ្ងន់ប៉ុណ្ណាមុនពេលក្លាយជាគ្រោះថ្នាក់។ វាត្រូវបានបង្កើតឡើងក្នុងទសវត្សរ៍ ១៨៧០ ដោយ Samuel Plimsoll អ្នកនយោបាយអង់គ្លេសដែលភ័យព្រួយចំពោះ 'កប៉ាល់មឈូស' ដែលផ្ទុកធ្ងន់ហួសហើយលង់ជាមួយនាវិក។"
          />

          <div className="mt-4">
            <PlimsollDiagram isKh={isKh} />
          </div>

          <div
            className="mt-4 rounded-lg border-l-2 p-3 text-[12px] leading-relaxed"
            style={{
              borderColor: SAFETY_YELLOW,
              backgroundColor: `${SAFETY_YELLOW}08`,
              color: STEEL_LIGHT,
            }}
          >
            <strong style={{ color: SAFETY_YELLOW }}>
              {isKh ? "ហេតុអ្វីបន្ទាត់ច្រើន? " : "Why so many lines? "}
            </strong>
            {isKh
              ? "ទឹកសាបស្រាលជាងទឹកសមុទ្រ ដូច្នេះកប៉ាល់លង់ជ្រៅជាងនៅក្នុងទន្លេ។ ទឹកក្ដៅស្រាលជាងទឹកត្រជាក់។ បន្ទាត់នីមួយៗ (TF, F, T, S, W, WNA) កំណត់ទម្ងន់ផ្ទុកអតិបរមាសម្រាប់លក្ខខណ្ឌមួយ — ទឹកសាបត្រូពិច ទឹកសាប ទឹកសមុទ្រត្រូពិច ទឹកសមុទ្ររដូវក្ដៅ ទឹកសមុទ្ររដូវរងារ និងរដូវរងារនៅអាត្លង់ទិកខាងជើង។"
              : "Fresh water is less dense than salt water, so a ship sits deeper in a river than at sea. Warm water is less dense than cold. Each line (TF, F, T, S, W, WNA) sets the maximum load for one condition — Tropical Fresh, Fresh, Tropical seawater, Summer seawater, Winter, and Winter North Atlantic."}
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}

function Stat({
  value,
  label,
  sub,
  accent,
}: {
  value: string;
  label: string;
  sub: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-lg border p-2.5"
      style={{
        borderColor: `${accent}33`,
        backgroundColor: `${accent}0f`,
      }}
    >
      <div className="text-2xl font-black" style={{ color: accent }}>
        {value}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: STEEL_LIGHT }}>
        {label}
      </div>
      <div className="text-[10px]" style={{ color: STEEL }}>
        {sub}
      </div>
    </div>
  );
}

function ScaleComparisonDiagram({ isKh }: { isKh: boolean }) {
  return (
    <svg viewBox="0 0 320 90" className="w-full" aria-hidden>
      {/* Container ship silhouette */}
      <g>
        <path d="M10,55 L290,55 L275,72 L25,72 Z" fill={HULL_GREY} stroke={STEEL_DARK} strokeWidth="0.6" />
        <rect x="10" y="35" width="280" height="20" fill={STEEL_DARK} />
        {/* container blocks */}
        {[15, 35, 55, 75, 95, 115, 135, 155, 175, 195, 215, 235, 255].map((x, i) => (
          <rect
            key={x}
            x={x}
            y={28}
            width={18}
            height={8}
            fill={[CARGO_ORANGE, CARGO_RED, "#0ea5e9", SAFETY_YELLOW][i % 4]}
            opacity="0.95"
          />
        ))}
        {/* superstructure */}
        <rect x="8" y="20" width="14" height="15" fill={IVORY} opacity="0.85" />
        <rect x="6" y="14" width="6" height="14" fill={HULL_GREY} />
      </g>

      {/* Football field reference */}
      <line x1="10" y1="80" x2="290" y2="80" stroke={SAFETY_YELLOW} strokeWidth="1" strokeDasharray="3,3" />
      <text x="150" y="88" fontFamily="ui-monospace, monospace" fontSize="8" fill={SAFETY_YELLOW} textAnchor="middle">
        {isKh ? "≈ ៤០០ ម៉ែត្រ · ទីលានបាល់ ៣ បន្ត" : "≈ 400 m · 3 football fields end-to-end"}
      </text>

      {/* Tiny human for scale */}
      <circle cx="298" cy="68" r="1.2" fill={IVORY} />
      <line x1="298" y1="69" x2="298" y2="73" stroke={IVORY} strokeWidth="0.6" />
      <text x="305" y="72" fontFamily="ui-monospace, monospace" fontSize="6" fill={STEEL_LIGHT}>
        1 m
      </text>

      {/* Top label */}
      <text x="10" y="10" fontFamily="ui-monospace, monospace" fontSize="9" fill={CARGO_ORANGE}>
        SCALE · ខ្នាត
      </text>
    </svg>
  );
}

function PlimsollDiagram({ isKh }: { isKh: boolean }) {
  // Each line corresponds to a different water condition.
  const lines = [
    { code: "TF",  labelKh: "ទឹកសាបត្រូពិច",          color: FOAM,         y: 50,  en: "Tropical Fresh" },
    { code: "F",   labelKh: "ទឹកសាប",                  color: FOAM,         y: 60,  en: "Fresh water" },
    { code: "T",   labelKh: "ទឹកសមុទ្រត្រូពិច",        color: SAFETY_YELLOW, y: 70,  en: "Tropical seawater" },
    { code: "S",   labelKh: "ទឹកសមុទ្ររដូវក្ដៅ",       color: SAFETY_YELLOW, y: 80,  en: "Summer seawater" },
    { code: "W",   labelKh: "ទឹកសមុទ្ររដូវរងារ",      color: STEEL_LIGHT,   y: 90,  en: "Winter seawater" },
    { code: "WNA", labelKh: "រដូវរងារ អាត្លង់ទិកខាងជើង", color: STEEL_LIGHT, y: 100, en: "Winter N. Atlantic" },
  ];
  return (
    <svg viewBox="0 0 320 130" className="w-full" aria-hidden>
      {/* Hull plate */}
      <rect x="10" y="20" width="180" height="100" fill={HULL_GREY} stroke={STEEL_DARK} strokeWidth="0.5" />
      {/* Rivets */}
      {[18, 35, 52, 69, 86].map((y) => (
        <g key={y}>
          <circle cx="18" cy={y + 8} r="1.2" fill={STEEL_DARK} />
          <circle cx="182" cy={y + 8} r="1.2" fill={STEEL_DARK} />
        </g>
      ))}

      {/* Plimsoll disc */}
      <circle cx="55" cy="80" r="14" fill="none" stroke={SAFETY_YELLOW} strokeWidth="2.5" />
      <line x1="38" y1="80" x2="72" y2="80" stroke={SAFETY_YELLOW} strokeWidth="2.5" />
      <text x="49" y="76" fontFamily="ui-monospace, monospace" fontSize="6" fill={SAFETY_YELLOW}>
        L
      </text>
      <text x="58" y="76" fontFamily="ui-monospace, monospace" fontSize="6" fill={SAFETY_YELLOW}>
        R
      </text>

      {/* Load-line ladder to the right */}
      {lines.map((l) => (
        <g key={l.code}>
          <line x1="100" y1={l.y} x2="140" y2={l.y} stroke={l.color} strokeWidth="2" />
          <text x="145" y={l.y + 3} fontFamily="ui-monospace, monospace" fontSize="9" fill={l.color}>
            {l.code}
          </text>
        </g>
      ))}

      {/* Water level (current position — between S and W) */}
      <rect x="10" y="85" width="180" height="35" fill={NAVY} opacity="0.55" />
      <line x1="10" y1="85" x2="190" y2="85" stroke={FOAM} strokeWidth="0.6" />

      {/* Side legend — strict bilingual EN + KH on every row */}
      <g transform="translate(200,20)">
        {lines.map((l, i) => (
          <g key={l.code} transform={`translate(0,${i * 16})`}>
            <rect width="6" height="6" y="3" fill={l.color} />
            <text x="10" y="8" fontFamily="ui-monospace, monospace" fontSize="7" fill={STEEL_LIGHT}>
              {l.code}
            </text>
            <text x="32" y="8" fontFamily="ui-monospace, monospace" fontSize="7" fill={STEEL_LIGHT}>
              {l.en}
            </text>
            <text x="32" y="14" fontFamily="ui-monospace, monospace" fontSize="6.5" fill={STEEL}>
              {l.labelKh}
            </text>
          </g>
        ))}
      </g>

      {/* Title */}
      <text x="10" y="14" fontFamily="ui-monospace, monospace" fontSize="9" fill={SAFETY_YELLOW}>
        PLIMSOLL · បន្ទាត់ផ្ទុក
      </text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 3 · THE INVISIBLE HIGHWAYS
// ════════════════════════════════════════════════════════════════════════════

function ShippingLanesSection({ isKh }: { isKh: boolean }) {
  return (
    <SectionShell
      kicker="THE INVISIBLE HIGHWAYS"
      kickerKh="មហាវិថីមើលមិនឃើញ"
      number="03"
      icon={Map}
      titleEn="Shipping Lanes & Global Chokepoints"
      titleKh="ផ្លូវនាវាចរ និងចំណុចច្របាច់ពិភពលោក"
      isKh={isKh}
      intro="Ships do not just wander the open ocean. They follow strict, predetermined routes called shipping lanes — the salt-water equivalent of motorway lanes. Some lanes squeeze through narrow straits and canals known as chokepoints. About 90% of every physical thing traded between countries — your phone, your school's textbooks, the fuel in motorbikes — passes through these few invisible lines."
      introKh="កប៉ាល់មិនដើរលេងតាមមហាសមុទ្រដូចចង់ទេ។ ពួកវាដើរតាមផ្លូវកំណត់យ៉ាងតឹងរ៉ឹងហៅថា 'ផ្លូវនាវាចរ' — ស្មើនឹងផ្លូវល្បឿនលឿននៅលើទឹក។ ផ្លូវខ្លះច្របាច់ឆ្លងកាត់ច្រកសមុទ្រតូចៗ និងព្រែកជីកដែលហៅថា 'ចំណុចច្របាច់'។ ប្រហែល ៩០% នៃរបស់របរដែលជួញដូររវាងប្រទេស — ទូរស័ព្ទរបស់អ្នក សៀវភៅសិក្សា ប្រេងម៉ូតូ — ឆ្លងកាត់បន្ទាត់មើលមិនឃើញតិចតួចទាំងនេះ។"
      testId="section-shipping-lanes"
      accent={TEAL}
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr,1fr]">
        {/* Card A — Lanes (the world map) */}
        <Card accent={TEAL} testId="card-lanes">
          <CardHeading
            icon={Navigation}
            titleEn="Shipping Lanes"
            titleKh="ផ្លូវនាវាចរ"
            accent={TEAL}
          />
          <Bilingual
            isKh={isKh}
            en="A shipping lane is a recommended path agreed by the International Maritime Organization. Ships stay inside it for three reasons: to save fuel by riding favourable currents, to avoid storms and shallow water, and to keep predictable distances from other ships so collisions are rare. Like motorways, busy lanes are often divided into one-way 'traffic separation schemes' — outbound ships on one side, inbound on the other."
            kh="ផ្លូវនាវាចរគឺជាផ្លូវដែលត្រូវបានណែនាំ និងព្រមព្រៀងដោយអង្គការសមុទ្រអន្តរជាតិ (IMO)។ កប៉ាល់ស្នាក់នៅខាងក្នុងវាដោយហេតុផលបី៖ សន្សំសំចៃប្រេងដោយជិះតាមចរន្តទឹកអំណោយផល ជៀសវាងព្យុះ និងទឹករាក់ និងរក្សាគម្លាតដែលមានការព្យាករណ៍ពីកប៉ាល់ផ្សេងទៀតដើម្បីកាត់បន្ថយការប៉ះទង្គិច។"
          />

          <div className="mt-4">
            <WorldShippingMap isKh={isKh} />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <Stat value="90%" label={isKh ? "ពាណិជ្ជកម្ម" : "World trade"} sub={isKh ? "ដឹកដោយសមុទ្រ" : "by sea"} accent={TEAL} />
            <Stat value="50K+" label={isKh ? "កប៉ាល់" : "Cargo ships"} sub={isKh ? "សកម្មបច្ចុប្បន្ន" : "active today"} accent={CARGO_ORANGE} />
            <Stat value="11B" label={isKh ? "តោន/ឆ្នាំ" : "Tonnes/yr"} sub={isKh ? "ដឹកជញ្ជូន" : "moved by sea"} accent={SAFETY_YELLOW} />
          </div>
        </Card>

        {/* Card B — Chokepoints */}
        <Card accent={CARGO_RED} testId="card-chokepoints">
          <CardHeading
            icon={AlertTriangle}
            titleEn="Three Critical Chokepoints"
            titleKh="ចំណុចច្របាច់សំខាន់ៗបី"
            accent={CARGO_RED}
          />
          <Bilingual
            isKh={isKh}
            en="A chokepoint is a narrow stretch of water that ships must pass through because there is no good alternative. If a chokepoint closes — by accident, war, or weather — global trade slows or stops within days. Three chokepoints carry the lion's share of world trade."
            kh="ចំណុចច្របាច់គឺជាផ្នែកសមុទ្រតូចមួយដែលកប៉ាល់ត្រូវឆ្លងកាត់ ព្រោះគ្មានជម្រើសល្អផ្សេងទៀត។ បើចំណុចច្របាច់បិទ — ដោយគ្រោះថ្នាក់ សង្គ្រាម ឬអាកាសធាតុ — ពាណិជ្ជកម្មពិភពលោកនឹងថយចុះ ឬផ្អាកក្នុងរយៈពេលពីរបីថ្ងៃ។ ចំណុចច្របាច់បីកាន់ផ្នែកធំបំផុតនៃពាណិជ្ជកម្មពិភពលោក។"
          />

          <div className="mt-4 space-y-2.5">
            <Chokepoint
              isKh={isKh}
              name="Strait of Malacca"
              nameKh="ច្រកម៉ាឡាកា"
              regionEn="Singapore · Malaysia · Indonesia"
              regionKh="សិង្ហបុរី · ម៉ាឡេស៊ី · ឥណ្ឌូនេស៊ី"
              statEn="≈ 30% of world trade"
              statKh="≈ ៣០% នៃពាណិជ្ជកម្មពិភពលោក"
              noteEn="Right here in Southeast Asia. The 800 km link between the Indian Ocean and the South China Sea. Narrows to just 2.8 km wide at one point."
              noteKh="នៅជិតយើងនេះក្នុងអាស៊ីអាគ្នេយ៍។ ចម្ងាយ ៨០០ គីឡូម៉ែត្រភ្ជាប់មហាសមុទ្រឥណ្ឌា និងសមុទ្រចិនខាងត្បូង។ ច្របាច់ដល់ត្រឹម ២.៨ គីឡូម៉ែត្រនៅចំណុចមួយ។"
              accent={CARGO_RED}
              isLocal
            />
            <Chokepoint
              isKh={isKh}
              name="Suez Canal"
              nameKh="ព្រែកជីកស៊ុយអេស"
              regionEn="Egypt"
              regionKh="អេហ្ស៊ីប"
              statEn="≈ 12% of world trade"
              statKh="≈ ១២% នៃពាណិជ្ជកម្មពិភពលោក"
              noteEn="A 193 km man-made canal that cuts straight through Egypt, connecting the Mediterranean to the Red Sea. Without it, ships from Asia to Europe would have to sail all the way around Africa."
              noteKh="ព្រែកជីកដែលកាត់ត្រង់តាមអេហ្ស៊ីបវែង ១៩៣ គីឡូម៉ែត្រ ភ្ជាប់សមុទ្រមេឌីទែរ៉ានេទៅសមុទ្រក្រហម។ បើគ្មានវា កប៉ាល់ពីអាស៊ីទៅអឺរ៉ុបត្រូវដើរជុំវិញទ្វីបអាហ្វ្រិក។"
              accent={CARGO_ORANGE}
            />
            <Chokepoint
              isKh={isKh}
              name="Panama Canal"
              nameKh="ព្រែកជីកប៉ាណាម៉ា"
              regionEn="Panama"
              regionKh="ប៉ាណាម៉ា"
              statEn="≈ 5% of world trade"
              statKh="≈ ៥% នៃពាណិជ្ជកម្មពិភពលោក"
              noteEn="An 82 km canal that uses three giant lock-chambers to lift ships 26 m up over the mountains of Central America, joining the Atlantic and the Pacific. Saves a 13,000 km detour around South America."
              noteKh="ព្រែកជីកប្រវែង ៨២ គីឡូម៉ែត្រដែលប្រើបន្ទប់ស្ថានីយ៍ទឹក ៣ ដើម្បីលើកកប៉ាល់ឡើង ២៦ ម៉ែត្រឆ្លងកាត់ភ្នំនៃអាមេរិចកណ្ដាល ភ្ជាប់មហាសមុទ្រអាត្លង់ទិក និងប៉ាស៊ីហ្វិក។ សន្សំការវាងជុំ ១៣,០០០ គីឡូម៉ែត្រជុំវិញអាមេរិចខាងត្បូង។"
              accent={SAFETY_YELLOW}
            />
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}

function Chokepoint({
  isKh,
  name,
  nameKh,
  regionEn,
  regionKh,
  statEn,
  statKh,
  noteEn,
  noteKh,
  accent,
  isLocal = false,
}: {
  isKh: boolean;
  name: string;
  nameKh: string;
  regionEn: string;
  regionKh: string;
  statEn: string;
  statKh: string;
  noteEn: string;
  noteKh: string;
  accent: string;
  isLocal?: boolean;
}) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{
        borderColor: `${accent}55`,
        backgroundColor: `${accent}10`,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Compass size={14} style={{ color: accent }} />
          <div>
            <div className="text-sm font-bold" style={{ color: IVORY }}>
              {name}
              {isLocal && (
                <span
                  className="ml-2 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em]"
                  style={{ backgroundColor: accent, color: ABYSS }}
                >
                  {isKh ? "ជិតខ្មែរ" : "Near Cambodia"}
                </span>
              )}
            </div>
            <div className="text-[10px] uppercase tracking-[0.12em]" style={{ color: STEEL }}>
              {nameKh} · {isKh ? regionKh : regionEn}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-xs font-black" style={{ color: accent }}>
            {isKh ? statKh : statEn}
          </div>
        </div>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed" style={{ color: STEEL_LIGHT }}>
        {isKh ? noteKh : noteEn}
      </p>
    </div>
  );
}

function WorldShippingMap({ isKh }: { isKh: boolean }) {
  // Stylised Mercator-ish blob map with three glowing chokepoints +
  // animated dashed lanes flowing between them.
  return (
    <svg viewBox="0 0 320 170" className="w-full" aria-hidden>
      <defs>
        <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1830" />
          <stop offset="100%" stopColor="#040b14" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="170" rx="8" fill="url(#mapBg)" />

      {/* Stylised continents (very rough silhouettes) */}
      <g fill={STEEL_DARK} opacity="0.85" stroke={STEEL} strokeWidth="0.4">
        {/* Americas */}
        <path d="M22,30 q12,-8 24,4 q6,18 -4,32 q-2,18 -8,30 q-10,12 -12,30 q-2,12 8,18 q-4,16 -16,18 q-12,-2 -10,-26 q-2,-22 4,-46 q2,-22 6,-40 q2,-12 8,-20 Z" />
        {/* Europe / Africa */}
        <path d="M120,28 q22,-6 36,2 q12,8 4,18 q-4,14 8,18 q4,14 -2,30 q-2,20 -10,30 q-6,18 -16,22 q-14,4 -20,-10 q-10,-22 -8,-44 q0,-28 8,-66 Z" />
        {/* Asia + Australia */}
        <path d="M180,30 q40,-8 80,8 q24,12 28,28 q-2,18 -22,18 q-18,4 -28,18 q-12,12 -32,10 q-22,-2 -28,-22 q-6,-22 2,-60 Z" />
        <ellipse cx="270" cy="130" rx="24" ry="10" />
      </g>

      {/* Shipping lanes */}
      <g
        fill="none"
        stroke={TEAL}
        strokeWidth="1.4"
        strokeDasharray="4,4"
        opacity="0.85"
        style={{ animation: "maritime-flow 1.5s linear infinite" }}
      >
        {/* Asia → Suez → Europe */}
        <path d="M250,80 q-30,-12 -70,-8 q-30,4 -54,-2" />
        {/* Suez → Asia */}
        <path d="M154,72 q24,-6 48,4" />
        {/* Atlantic → Panama → Pacific */}
        <path d="M58,90 q4,18 28,28 q24,8 50,2" />
      </g>

      {/* Chokepoint markers */}
      <Chokemark x={245} y={92} label="Malacca" labelKh="ម៉ាឡាកា" color={CARGO_RED} />
      <Chokemark x={154} y={72} label="Suez" labelKh="ស៊ុយអេស" color={CARGO_ORANGE} />
      <Chokemark x={58} y={102} label="Panama" labelKh="ប៉ាណាម៉ា" color={SAFETY_YELLOW} />

      {/* Cambodia pin */}
      <g>
        <circle cx="245" cy="80" r="3" fill={CARGO_RED} stroke={IVORY} strokeWidth="0.6" />
        <text x="252" y="78" fontFamily="ui-monospace, monospace" fontSize="7" fill={IVORY}>
          {isKh ? "កម្ពុជា" : "Cambodia"}
        </text>
      </g>

      {/* Title */}
      <text x="10" y="14" fontFamily="ui-monospace, monospace" fontSize="9" fill={TEAL}>
        ◢ {isKh ? "ផែនទីពាណិជ្ជកម្មសមុទ្រ" : "GLOBAL SHIPPING MAP"}
      </text>
    </svg>
  );
}

function Chokemark({
  x,
  y,
  label,
  labelKh,
  color,
}: {
  x: number;
  y: number;
  label: string;
  labelKh: string;
  color: string;
}) {
  return (
    <g style={{ animation: "maritime-pulse 2.8s ease-in-out infinite", color }}>
      <circle cx={x} cy={y} r="6" fill="none" stroke={color} strokeWidth="1.4" />
      <circle cx={x} cy={y} r="2.4" fill={color} />
      <text x={x} y={y + 18} fontFamily="ui-monospace, monospace" fontSize="8" fill={color} textAnchor="middle">
        {label}
      </text>
      <text x={x} y={y + 28} fontFamily="ui-monospace, monospace" fontSize="7" fill={STEEL_LIGHT} textAnchor="middle">
        {labelKh}
      </text>
    </g>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  CLOSING STRIP
// ════════════════════════════════════════════════════════════════════════════

function ClosingStrip({ isKh }: { isKh: boolean }) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border p-6 sm:p-8"
      style={{
        borderColor: `${TEAL}33`,
        backgroundImage: `linear-gradient(135deg, ${DEEP_OCEAN} 0%, ${MARINE} 100%)`,
      }}
      data-testid="closing-strip"
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: TEAL }}>
            {isKh ? "សង្ខេប · SUMMARY" : "SUMMARY · សង្ខេប"}
          </div>
          <h3 className="mt-2 text-xl font-black sm:text-2xl" style={{ color: IVORY }}>
            {isKh
              ? "ដែកអណ្តែតបាន។ ផ្លូវសមុទ្រពិត។ ពាណិជ្ជកម្មពិភពលោកជិះលើទឹក។"
              : "Steel can float. Sea-roads are real. The world's economy rides on water."}
          </h3>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed" style={{ color: STEEL_LIGHT }}>
            {isKh
              ? "ពីគោលការណ៍ Archimedes ដែលធ្វើឱ្យដែកអណ្តែត ដល់បន្ទាត់ Plimsoll ដែលរក្សាសុវត្ថិភាពនាវិក ដល់ច្រកម៉ាឡាកាដែលនៅជិតយើង — ការដឹកជញ្ជូនសមុទ្រគឺជាបេះដូងស្ងាត់នៃសេដ្ឋកិច្ចសកល។"
              : "From Archimedes' principle that lets steel float, to the Plimsoll Line that keeps crews safe, to the Strait of Malacca on Cambodia's doorstep — maritime shipping is the silent heart of the global economy."}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-1">
          <Ship size={42} style={{ color: CARGO_ORANGE }} />
          <Waves size={18} style={{ color: FOAM }} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <FactBubble icon={Anchor} en="Buoyancy" kh="ការអណ្តែត" color={FOAM} />
        <FactBubble icon={Container} en="Mega-ships" kh="កប៉ាល់យក្ស" color={CARGO_ORANGE} />
        <FactBubble icon={Ruler} en="Plimsoll Line" kh="បន្ទាត់ Plimsoll" color={SAFETY_YELLOW} />
        <FactBubble icon={Globe2} en="Chokepoints" kh="ចំណុចច្របាច់" color={CARGO_RED} />
      </div>
    </section>
  );
}

function FactBubble({
  icon: Icon,
  en,
  kh,
  color,
}: {
  icon: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  en: string;
  kh: string;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg border px-3 py-2"
      style={{
        borderColor: `${color}55`,
        backgroundColor: `${color}10`,
      }}
    >
      <Icon size={16} style={{ color }} />
      <div>
        <div className="text-xs font-bold" style={{ color: IVORY }}>
          {en}
        </div>
        <div className="text-[10px]" style={{ color: STEEL }}>
          {kh}
        </div>
      </div>
    </div>
  );
}
