import {
  Satellite, SatelliteDish, Smartphone, MapPin, Radar, Globe2,
  Mountain, Crosshair, Radio, Zap, Clock, Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface RuleStep {
  count: 1 | 2 | 3 | 4;
  /** Plain numeral, language-neutral. */
  numeral: string;
  /** Khmer numeral, e.g. ១, ២, ៣, ៤. */
  khNumeral: string;
  titleEn: string;
  titleKh: string;
  resultEn: string;
  resultKh: string;
  bodyEn: string;
  bodyKh: string;
  Icon: LucideIcon;
  /**
   * Locked-in colour progression: weak signal (1 sat) → strong 3D fix (4 sats).
   * Tailwind class fragments only (compose to keep purge-safe).
   */
  tone: {
    badge: string;   // count badge gradient + text
    border: string;  // card border
    glow: string;    // outer shadow
    chip: string;    // result pill
    iconTile: string;
  };
}

const RULE_STEPS: RuleStep[] = [
  {
    count: 1,
    numeral: "1",
    khNumeral: "១",
    titleEn: "1 Satellite",
    titleKh: "ផ្កាយរណប ១",
    resultEn: "Somewhere on a giant sphere",
    resultKh: "នៅកន្លែងណាមួយលើស្វ៊ែរយក្ស",
    bodyEn:
      "From the time the signal took to arrive, your phone knows your distance from the satellite. That places you anywhere on a huge invisible ball of that radius around it.",
    bodyKh:
      "ពីពេលវេលាដែលសញ្ញាមកដល់ ទូរស័ព្ទរបស់អ្នកដឹងចម្ងាយរបស់អ្នកពីផ្កាយរណប។ វាដាក់អ្នកនៅកន្លែងណាមួយលើបាល់អរូបីដ៏ធំមួយដែលមានកាំចម្ងាយនោះជុំវិញវា។",
    Icon: Globe2,
    tone: {
      badge: "from-slate-600 to-slate-800 text-slate-100",
      border: "border-slate-500/40",
      glow: "shadow-[0_0_18px_-10px_rgba(148,163,184,0.5)]",
      chip: "bg-slate-700/40 border-slate-500/40 text-slate-100",
      iconTile: "bg-slate-700/40 border-slate-500/40 text-slate-200",
    },
  },
  {
    count: 2,
    numeral: "2",
    khNumeral: "២",
    titleEn: "2 Satellites",
    titleKh: "ផ្កាយរណប ២",
    resultEn: "An intersecting circle",
    resultKh: "រង្វង់ប្រសព្វគ្នា",
    bodyEn:
      "Two spheres overlap along a circle. You're now somewhere on that ring — much closer, but not yet a single point.",
    bodyKh:
      "ស្វ៊ែរពីរត្រួតលើគ្នាតាមបន្ទាត់រង្វង់មួយ។ ឥឡូវនេះអ្នកនៅកន្លែងណាមួយលើរង្វង់នោះ — ជិតជាងមុនច្រើន ប៉ុន្តែមិនទាន់ជាចំណុចតែមួយនៅឡើយទេ។",
    Icon: Crosshair,
    tone: {
      badge: "from-sky-700 to-blue-800 text-sky-100",
      border: "border-sky-500/40",
      glow: "shadow-[0_0_22px_-10px_rgba(56,189,248,0.55)]",
      chip: "bg-sky-900/40 border-sky-500/40 text-sky-100",
      iconTile: "bg-sky-900/40 border-sky-500/50 text-sky-200",
    },
  },
  {
    count: 3,
    numeral: "3",
    khNumeral: "៣",
    titleEn: "3 Satellites",
    titleKh: "ផ្កាយរណប ៣",
    resultEn: "Exact Latitude & Longitude (2D)",
    resultKh: "រយៈទទឹង និងរយៈបណ្តោយជាក់លាក់ (2D)",
    bodyEn:
      "A third sphere narrows the ring down to two possible points — and one of them is out in space, so the phone picks the one on the ground. You now have a 2-D fix.",
    bodyKh:
      "ស្វ៊ែរទីបីបង្រួមរង្វង់ឱ្យមកត្រឹមចំណុចពីរដែលអាចមាន — ហើយចំណុចមួយក្នុងចំណុចទាំងពីរនៅក្នុងអវកាស ដូច្នេះទូរស័ព្ទជ្រើសរើសចំណុចមួយដែលនៅលើដី។ ឥឡូវនេះអ្នកមានទីតាំង 2-D មួយ។",
    Icon: MapPin,
    tone: {
      badge: "from-emerald-500 to-teal-600 text-white",
      border: "border-emerald-400/50",
      glow: "shadow-[0_0_28px_-10px_rgba(52,211,153,0.65)]",
      chip: "bg-emerald-900/40 border-emerald-400/40 text-emerald-100",
      iconTile: "bg-emerald-900/40 border-emerald-400/50 text-emerald-200",
    },
  },
  {
    count: 4,
    numeral: "4",
    khNumeral: "៤",
    titleEn: "4 Satellites",
    titleKh: "ផ្កាយរណប ៤",
    resultEn: "Adds Altitude — full 3D fix",
    resultKh: "បន្ថែមកម្ពស់ — ទីតាំង 3D ពេញលេញ",
    bodyEn:
      "A fourth satellite adds altitude (កម្ពស់). Your phone now knows exactly how high up a mountain or which floor of a building you are standing on.",
    bodyKh:
      "ផ្កាយរណបទីបួនបន្ថែមកម្ពស់ (Altitude)។ ឥឡូវនេះទូរស័ព្ទរបស់អ្នកដឹងច្បាស់ថា អ្នកនៅខ្ពស់ប៉ុនណាលើភ្នំ ឬនៅជាន់ណានៃអគារ។",
    Icon: Mountain,
    tone: {
      badge: "from-cyan-400 via-emerald-400 to-blue-500 text-white",
      border: "border-emerald-300/60",
      glow: "shadow-[0_0_36px_-6px_rgba(74,222,128,0.7)]",
      chip: "bg-emerald-500/15 border-emerald-300/60 text-emerald-100",
      iconTile: "bg-emerald-500/15 border-emerald-300/60 text-emerald-100",
    },
  },
];

/* ──────────────────────────────────────────────────────────────────────────────
 *  GpsSpaceAgeSection
 *
 *  Three-part educational block on GPS, attached to the bottom of the
 *  /study-center/coordinates page. Aesthetic: deep-space black, orbital
 *  curves, glowing satellite-green/blue text — visually distinct from the
 *  parchment / maritime cards above it.
 *
 *  All headings, technical terms, and physics concepts are strictly bilingual
 *  (English on top, Khmer underneath, both always visible).
 * ────────────────────────────────────────────────────────────────────────────── */
export function GpsSpaceAgeSection() {
  return (
    <section
      id="gps"
      data-testid="gps-section"
      aria-labelledby="gps-section-title"
      className="relative overflow-hidden rounded-3xl border border-emerald-300/30 scroll-mt-24"
    >
      {/* Local CSS — orbital sweep, satellite blink, signal pulse, twinkle */}
      <style>{`
        @keyframes gps-orbit { to { transform: rotate(360deg); } }
        .gps-orbit-slow { animation: gps-orbit 36s linear infinite; transform-origin: center; }
        .gps-orbit-med  { animation: gps-orbit 24s linear infinite reverse; transform-origin: center; }
        .gps-orbit-fast { animation: gps-orbit 18s linear infinite; transform-origin: center; }

        @keyframes gps-blink {
          0%, 100% { opacity: 0.9; }
          50%      { opacity: 0.35; }
        }
        .gps-blink { animation: gps-blink 2.4s ease-in-out infinite; }

        @keyframes gps-pulse {
          0%   { transform: scale(0.6); opacity: 0.85; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .gps-pulse   { animation: gps-pulse 2.6s ease-out infinite; transform-origin: center; }
        .gps-pulse-2 { animation-delay: 0.85s; }
        .gps-pulse-3 { animation-delay: 1.7s; }

        @keyframes gps-twinkle {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 1; }
        }
        .gps-twinkle { animation: gps-twinkle 3.2s ease-in-out infinite; }

        @keyframes gps-flow { to { stroke-dashoffset: -36; } }
        .gps-flow {
          stroke-dasharray: 6 6;
          animation: gps-flow 1.6s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .gps-orbit-slow, .gps-orbit-med, .gps-orbit-fast,
          .gps-blink, .gps-pulse, .gps-twinkle, .gps-flow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Deep-space backdrop ------------------------------------------------ */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {/* Black-to-deep-blue gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #0c1432 0%, #050817 50%, #000000 100%)",
          }}
        />
        {/* Orbital grid lines (concentric large circles) */}
        <svg viewBox="0 0 800 800" className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="gps-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(74,222,128,0.20)" />
              <stop offset="55%" stopColor="rgba(56,189,248,0.10)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0.0)" />
            </radialGradient>
          </defs>
          <rect width="800" height="800" fill="url(#gps-fade)" />
          {[120, 200, 280, 360, 440, 520, 600].map((r) => (
            <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="rgba(74,222,128,0.18)" strokeWidth="1" />
          ))}
          {/* Crossing meridian arcs */}
          {[20, 60, 100, 140].map((rot) => (
            <ellipse
              key={rot}
              cx="400"
              cy="400"
              rx="540"
              ry="180"
              fill="none"
              stroke="rgba(56,189,248,0.18)"
              strokeWidth="1"
              transform={`rotate(${rot} 400 400)`}
            />
          ))}
        </svg>
        {/* Twinkling stars */}
        {[
          { left: "8%",  top: "12%" },
          { left: "18%", top: "78%" },
          { left: "30%", top: "22%" },
          { left: "47%", top: "8%"  },
          { left: "62%", top: "70%" },
          { left: "75%", top: "18%" },
          { left: "88%", top: "55%" },
          { left: "92%", top: "82%" },
          { left: "12%", top: "45%" },
          { left: "55%", top: "40%" },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white gps-twinkle"
            style={{ ...s, animationDelay: `${(i * 0.4) % 3}s` }}
          />
        ))}
      </div>

      <div className="relative px-5 sm:px-8 py-10 sm:py-14 space-y-8">

        {/* Header — paired bilingual ----------------------------------- */}
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-300 mb-4">
            <Satellite className="w-3.5 h-3.5 gps-blink" aria-hidden="true" />
            <span>Modern Application</span>
            <span className="opacity-50">·</span>
            <span className="font-khmer normal-case tracking-normal text-xs text-emerald-200/95">
              ការអនុវត្តសម័យទំនើប
            </span>
          </div>

          <h2
            id="gps-section-title"
            data-testid="gps-title"
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-white"
          >
            <span className="block">
              GPS:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-sky-300 to-emerald-200 drop-shadow-[0_0_16px_rgba(74,222,128,0.45)]">
                The Space-Age Map
              </span>
            </span>
            <span className="block font-khmer text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-100 mt-2 leading-relaxed">
              ប្រព័ន្ធ GPS៖{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-sky-300 to-emerald-200">
                ផែនទីសម័យអវកាស
              </span>
            </span>
          </h2>

          <p className="mt-4 text-slate-200 leading-relaxed text-base">
            The whole grid you just learned about — latitude, longitude, the prime meridian — comes alive in your pocket because of a network of spinning satellites and a clever piece of physics.
          </p>
          <p className="mt-2 text-slate-200 font-khmer leading-loose text-base">
            ក្រឡាចត្រង្គដែលអ្នកទើបតែបានរៀន — រយៈទទឹង រយៈបណ្ដោយ និងបន្ទាត់មេឌៀនមេ — ក្លាយជាមានជីវិតនៅក្នុងហោប៉ៅរបស់អ្នក ដោយសារបណ្តាញផ្កាយរណបវិលជុំ និងវិធានរូបវិទ្យាដ៏ប៉ិនប្រសប់មួយ។
          </p>
        </header>

        {/* ============================================================ */}
        {/*  PART 1 — The Invisible Constellation                        */}
        {/* ============================================================ */}
        <article
          aria-labelledby="gps-constellation-title"
          data-testid="gps-constellation"
          className="rounded-2xl border border-emerald-400/25 bg-slate-950/60 backdrop-blur-sm overflow-hidden"
        >
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-0">
            {/* Copy side */}
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300/85 mb-2">
                <span>Part 1</span>
                <span className="opacity-50">·</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-emerald-200/85">ផ្នែកទី ១</span>
              </div>
              <h3
                id="gps-constellation-title"
                className="font-display text-xl sm:text-2xl font-bold text-white leading-tight"
              >
                <span className="block">The Invisible Constellation</span>
                <span className="block font-khmer text-base sm:text-lg font-bold text-emerald-200 mt-1 leading-relaxed">
                  បណ្តាញផ្កាយរណបអរូបី
                </span>
              </h3>

              {/* Definition card */}
              <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300 mb-1.5">
                  <Target className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Definition</span>
                  <span className="opacity-50">·</span>
                  <span className="font-khmer normal-case tracking-normal text-xs text-emerald-200">និយមន័យ</span>
                </div>
                <p className="text-sm sm:text-base text-emerald-50 leading-relaxed">
                  <strong className="text-emerald-300">GPS</strong> stands for <em>Global Positioning System</em> — a free, worldwide service that lets any device on Earth figure out exactly where it is.
                </p>
                <p className="mt-1.5 text-sm sm:text-base text-emerald-100/90 font-khmer leading-loose">
                  <strong className="text-emerald-300">GPS</strong> ជាអក្សរកាត់នៃ <em>Global Positioning System</em> ឬ <em>ប្រព័ន្ធកំណត់ទីតាំងសកល</em> — សេវាកម្មឥតគិតថ្លៃជុំវិញពិភពលោក ដែលអនុញ្ញាតឱ្យឧបករណ៍ណាមួយលើផែនដីដឹងច្បាស់ថា វានៅឯណា។
                </p>
              </div>

              {/* Stats grid */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-sky-400/30 bg-sky-500/5 p-3">
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.2em] text-sky-300 mb-1">
                    <Satellite className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Satellites</span>
                    <span className="opacity-50">·</span>
                    <span className="font-khmer normal-case tracking-normal text-[11px] text-sky-200/95">ផ្កាយរណប</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-white leading-none">30+</div>
                  <div className="text-[11px] text-sky-200/80 mt-1">
                    in orbit, broadcasting non-stop
                  </div>
                  <div className="text-[11px] font-khmer text-sky-200/80 leading-relaxed">
                    ផ្កាយរណបជាង ៣០ កំពុងវិលជុំ ផ្សាយសញ្ញាមិនឈប់
                  </div>
                </div>
                <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/5 p-3">
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-300 mb-1">
                    <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Orbital speed</span>
                    <span className="opacity-50">·</span>
                    <span className="font-khmer normal-case tracking-normal text-[11px] text-emerald-200/95">ល្បឿនគន្លង</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-white leading-none">14,000<span className="text-base text-emerald-200/80 ml-1">km/h</span></div>
                  <div className="text-[11px] text-emerald-200/80 mt-1">
                    each satellite, racing around Earth
                  </div>
                  <div className="text-[11px] font-khmer text-emerald-200/80 leading-relaxed">
                    ផ្កាយរណបនីមួយៗ វិលជុំផែនដី ១៤ ០០០ គ.ម/ម៉ោង
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed">
                Each satellite constantly broadcasts two things: the <strong className="text-emerald-300">exact time</strong> from an atomic clock and its <strong className="text-emerald-300">exact position</strong> in space.
              </p>
              <p className="mt-1.5 text-sm sm:text-base text-slate-200 font-khmer leading-loose">
                ផ្កាយរណបនីមួយៗផ្សាយរឿងពីរជានិច្ច៖ <strong className="text-emerald-300">ពេលវេលាជាក់លាក់</strong> ពីនាឡិកាអាតូម និង <strong className="text-emerald-300">ទីតាំងជាក់លាក់</strong> របស់វានៅក្នុងអវកាស។
              </p>
            </div>

            {/* Diagram side — Earth + 4 orbiting satellite icons */}
            <div className="relative bg-gradient-to-br from-slate-950 to-black border-t lg:border-t-0 lg:border-l border-emerald-400/20 min-h-[260px] flex items-center justify-center p-6">
              <div className="relative w-full max-w-[280px] aspect-square">
                {/* Earth in center */}
                <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-sky-500 to-emerald-500 border-2 border-cyan-300/60 shadow-[0_0_40px_-4px_rgba(56,189,248,0.7)] flex items-center justify-center">
                  <Globe2 className="w-10 h-10 text-white/95" aria-hidden="true" />
                </div>

                {/* Orbit rings (decoration) */}
                <div aria-hidden="true" className="absolute inset-0 rounded-full border border-emerald-400/25" />
                <div aria-hidden="true" className="absolute inset-4 rounded-full border border-sky-400/20" />

                {/* Orbit groups (rotate); satellite counter-rotates so its icon stays upright. */}
                {[
                  { ring: "gps-orbit-slow", angle: 0,   tone: "text-emerald-300" },
                  { ring: "gps-orbit-med",  angle: 90,  tone: "text-sky-300" },
                  { ring: "gps-orbit-slow", angle: 180, tone: "text-emerald-300" },
                  { ring: "gps-orbit-fast", angle: 270, tone: "text-cyan-300" },
                ].map((o, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 ${o.ring}`}
                    style={{ transform: `rotate(${o.angle}deg)` }}
                    aria-hidden="true"
                  >
                    {/* Satellite chip parked at the ring edge (top) */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-1 flex items-center justify-center">
                      <div className={`w-9 h-9 rounded-lg bg-slate-900/80 border border-current ${o.tone} flex items-center justify-center shadow-[0_0_18px_-4px_currentColor]`}>
                        <Satellite className="w-5 h-5 gps-blink" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-300/80">
                <span>Constellation · </span>
                <span className="font-khmer normal-case tracking-normal text-[11px] text-emerald-200/80">
                  បណ្តាញផ្កាយរណប
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* ============================================================ */}
        {/*  PART 2 — How Your Phone Knows Where You Are                 */}
        {/* ============================================================ */}
        <article
          aria-labelledby="gps-trilateration-title"
          data-testid="gps-trilateration"
          className="rounded-2xl border border-sky-400/25 bg-slate-950/60 backdrop-blur-sm overflow-hidden"
        >
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-0">
            {/* Diagram side — phone listening, radar pulses */}
            <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-black border-b lg:border-b-0 lg:border-r border-sky-400/20 min-h-[280px] flex items-center justify-center p-6 order-2 lg:order-1">
              <div className="relative w-full max-w-[260px] flex flex-col items-center">
                {/* Satellite at top */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-slate-900/80 border-2 border-emerald-400/60 text-emerald-200 flex items-center justify-center shadow-[0_0_22px_-6px_rgba(74,222,128,0.7)]">
                    <SatelliteDish className="w-7 h-7 gps-blink" aria-hidden="true" />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-300/80 mt-1.5 text-center">
                    Satellite
                  </div>
                  <div className="text-[10px] font-khmer text-emerald-200/80 text-center">ផ្កាយរណប</div>
                </div>

                {/* Signal beam connecting satellite → phone */}
                <svg viewBox="0 0 200 120" className="w-full max-w-[220px] h-20 -my-1" aria-hidden="true">
                  <line
                    x1="100" y1="6" x2="100" y2="114"
                    stroke="rgba(74,222,128,0.7)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="gps-flow"
                  />
                  <text x="108" y="64" fontSize="10" fill="rgba(167,243,208,0.9)" fontFamily="ui-monospace, monospace">
                    Δt · ms
                  </text>
                </svg>

                {/* Phone with location pin + radar pulses */}
                <div className="relative">
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-slate-800 border-2 border-sky-300/70 text-sky-100 flex items-center justify-center shadow-[0_0_24px_-6px_rgba(56,189,248,0.7)]">
                    <Smartphone className="w-8 h-8" aria-hidden="true" />
                    <MapPin className="absolute -top-1 -right-1 w-5 h-5 text-emerald-300 fill-emerald-400/30" aria-hidden="true" />
                  </div>
                  {/* Radar receive pulses */}
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`absolute inset-0 rounded-2xl border-2 border-sky-300/60 gps-pulse ${i === 1 ? "gps-pulse-2" : i === 2 ? "gps-pulse-3" : ""}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-sky-300/80 mt-3 text-center">
                  Phone (listening only)
                </div>
                <div className="text-[10px] font-khmer text-sky-200/80 text-center">ទូរស័ព្ទ (ស្តាប់តែប៉ុណ្ណោះ)</div>
              </div>
            </div>

            {/* Copy side */}
            <div className="p-5 sm:p-7 order-1 lg:order-2">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-sky-300/85 mb-2">
                <span>Part 2</span>
                <span className="opacity-50">·</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-sky-200/85">ផ្នែកទី ២</span>
              </div>
              <h3
                id="gps-trilateration-title"
                className="font-display text-xl sm:text-2xl font-bold text-white leading-tight"
              >
                <span className="block">How Your Phone Knows Where You Are</span>
                <span className="block font-khmer text-base sm:text-lg font-bold text-sky-200 mt-1 leading-relaxed">
                  តើទូរស័ព្ទដឹងទីតាំងរបស់អ្នកយ៉ាងដូចម្តេច?
                </span>
              </h3>

              {/* Term highlight: Trilateration */}
              <div className="mt-4 rounded-xl border border-sky-400/35 bg-gradient-to-br from-sky-500/10 to-emerald-500/5 p-4">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-sky-300 mb-1.5">
                  <Radar className="w-3.5 h-3.5 gps-blink" aria-hidden="true" />
                  <span>The core idea</span>
                  <span className="opacity-50">·</span>
                  <span className="font-khmer normal-case tracking-normal text-xs text-sky-200">គំនិតស្នូល</span>
                </div>
                <div className="font-display text-lg sm:text-xl font-bold text-white">
                  Trilateration
                </div>
                <div className="font-khmer text-base sm:text-lg font-bold text-sky-100 leading-relaxed">
                  ការវាស់ចម្ងាយត្រីកោណ
                </div>
                <p className="mt-2 text-sm text-sky-50/95 leading-relaxed">
                  Locating something by measuring its distance from three (or more) known points in space.
                </p>
                <p className="mt-1 text-sm text-sky-100/90 font-khmer leading-loose">
                  ការកំណត់ទីតាំងរបស់វត្ថុមួយ ដោយវាស់ចម្ងាយរបស់វាពីចំណុចដែលដឹងស្រាប់ចំនួនបី (ឬច្រើនជាង) នៅក្នុងអវកាស។
                </p>
              </div>

              {/* Two key insight rows */}
              <ul className="mt-4 space-y-3 list-none p-0">
                <li className="flex gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-300/50 text-sky-200 flex items-center justify-center" aria-hidden="true">
                    <Radio className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-white leading-snug">
                      Your phone does <strong className="text-sky-300">NOT</strong> send a signal up into space — it only <em>listens</em> for signals coming down from the satellites.
                    </p>
                    <p className="text-sm sm:text-base text-slate-200 font-khmer leading-loose mt-0.5">
                      ទូរស័ព្ទរបស់អ្នក <strong className="text-sky-300">មិន</strong> បញ្ជូនសញ្ញាឡើងទៅអវកាសទេ — វាគ្រាន់តែ <em>ស្តាប់</em> សញ្ញាដែលធ្លាក់ចុះមកពីផ្កាយរណបប៉ុណ្ណោះ។
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-300/50 text-emerald-200 flex items-center justify-center" aria-hidden="true">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-white leading-snug">
                      Radio waves travel at the <strong className="text-emerald-300">speed of light</strong>. By measuring exactly how many <strong className="text-emerald-300">milliseconds</strong> a signal took to arrive, the phone calculates its distance from that satellite.
                    </p>
                    <p className="text-sm sm:text-base text-slate-200 font-khmer leading-loose mt-0.5">
                      រលកវិទ្យុធ្វើដំណើរក្នុង <strong className="text-emerald-300">ល្បឿនពន្លឺ</strong>។ ដោយការវាស់ចំនួន <strong className="text-emerald-300">មិល្លីវិនាទី</strong> ច្បាស់លាស់ ដែលសញ្ញាបានចំណាយដើម្បីមកដល់ ទូរស័ព្ទគណនាចម្ងាយរបស់វាពីផ្កាយរណបនោះ។
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </article>

        {/* ============================================================ */}
        {/*  PART 3 — The Rule of Four                                   */}
        {/* ============================================================ */}
        <article
          aria-labelledby="gps-rule-of-four-title"
          data-testid="gps-rule-of-four"
          className="rounded-2xl border-2 border-emerald-400/40 bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-950 p-5 sm:p-7"
        >
          <header className="flex items-start gap-3 mb-5">
            <div
              className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 via-sky-400 to-emerald-300 text-slate-950 flex items-center justify-center shadow-[0_0_24px_-4px_rgba(74,222,128,0.7)]"
              aria-hidden="true"
            >
              <Crosshair className="w-5 h-5" strokeWidth={2.6} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300/85">
                <span>Part 3 · Highlighted block</span>
                <span className="opacity-50">·</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-emerald-200/85">ផ្នែកទី ៣ · ប្លុករំលេច</span>
              </div>
              <h3
                id="gps-rule-of-four-title"
                className="mt-0.5 font-display text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight"
              >
                <span className="block">The Rule of Four</span>
                <span className="block font-khmer text-base sm:text-lg md:text-xl font-bold text-emerald-200 mt-1 leading-relaxed">
                  ច្បាប់នៃផ្កាយរណប ៤
                </span>
              </h3>
            </div>
          </header>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-5 max-w-3xl">
            How many satellites does your phone need to lock on to? Each one tightens the answer.
          </p>
          <p className="text-sm sm:text-base text-slate-200 font-khmer leading-loose mb-5 max-w-3xl">
            តើទូរស័ព្ទរបស់អ្នកត្រូវការផ្កាយរណបប៉ុន្មានដើម្បីភ្ជាប់? ផ្កាយរណបនីមួយៗធ្វើឱ្យចម្លើយកាន់តែជិតគោលដៅ។
          </p>

          {/* 4-step ladder */}
          <ol
            data-testid="gps-rule-list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none p-0"
          >
            {RULE_STEPS.map((s) => (
              <li key={s.count} data-testid={`gps-rule-${s.count}`}>
                <div className={`relative h-full rounded-2xl border-2 ${s.tone.border} bg-slate-950/80 ${s.tone.glow} p-4 flex flex-col`}>
                  {/* Badge row */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.tone.badge} font-display text-xl font-extrabold shadow-md flex items-center justify-center`}
                      aria-label={`${s.count} satellite${s.count > 1 ? "s" : ""}`}
                    >
                      {s.numeral}
                    </div>
                    <div className={`shrink-0 w-9 h-9 rounded-lg border ${s.tone.iconTile} flex items-center justify-center`} aria-hidden="true">
                      <s.Icon className="w-4 h-4" strokeWidth={2.4} />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-sm sm:text-base font-bold text-white leading-tight">
                    {s.titleEn}
                  </h4>
                  <p className="font-khmer text-sm font-bold text-emerald-200 leading-relaxed">
                    {s.titleKh} <span className="opacity-70">({s.khNumeral})</span>
                  </p>

                  {/* Result chip */}
                  <div className={`mt-2 inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full border text-[11px] font-bold ${s.tone.chip}`}>
                    <span>=</span>
                    <span>{s.resultEn}</span>
                  </div>
                  <div className="mt-1 text-[11px] font-khmer text-emerald-100/85 leading-relaxed">
                    = {s.resultKh}
                  </div>

                  {/* Body */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {s.bodyEn}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-300 font-khmer leading-loose">
                    {s.bodyKh}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Closing pull-quote */}
          <div className="mt-6 rounded-xl border border-emerald-300/40 bg-emerald-500/10 px-4 py-3 text-center">
            <p className="font-display italic text-emerald-100">
              “Three satellites tell you where on Earth — four tell you how high above it.”
            </p>
            <p className="font-khmer text-emerald-100/95 leading-loose mt-1">
              «ផ្កាយរណបបីប្រាប់អ្នកថា អ្នកនៅទីណាលើផែនដី — បួនប្រាប់ថា អ្នកនៅខ្ពស់ប៉ុនណាលើវា។»
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
