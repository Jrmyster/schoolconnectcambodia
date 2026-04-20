import { useMemo, useState } from "react";
import {
  Atom,
  Zap,
  Ruler,
  Timer,
  Infinity as InfIcon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  The Quantum Limit: Max Planck's Discovery
//  ដែនកំណត់កង់ទិច៖ ការរកឃើញរបស់ Max Planck
//
//  Self-contained bilingual page (Science > Chemistry, after "Real World").
//  Three interactive tools with a "subatomic" neon-on-black aesthetic:
//
//   1. Planck's Constant (E = hν): a Light Beam simulator. The user picks a
//      colour (frequency) and watches the photon "packets" along the beam
//      grow brighter and more energetic as the frequency rises.
//   2. The Planck Length: a Zoom-into-reality stepper from a Human all the
//      way down to the Planck length (1.616 × 10⁻³⁵ m), where physics as
//      we know it stops working.
//   3. The Planck Time: 5.39 × 10⁻⁴⁴ s — the time light needs to travel
//      one Planck length, with a comparison to the age of the universe.
//
//  Math is rendered with styled HTML (italic variables, monospace numbers).
//  All keyframes scoped under `qx-*` and gated by prefers-reduced-motion.
// ════════════════════════════════════════════════════════════════════════════

export default function QuantumLimitPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div
      className="min-h-screen relative overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(ellipse at top, #0b0220 0%, #050010 50%, #000000 100%)",
      }}
    >
      {/* Faint scanline overlay for the "subatomic CRT" feel */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #67e8f9 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="relative z-10">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <header>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 text-center">
            <div className="inline-flex items-center gap-2 border border-fuchsia-400/30 bg-fuchsia-500/10 rounded-full px-5 py-2 mb-6 text-sm font-semibold text-fuchsia-200 backdrop-blur-sm">
              <Atom className="w-4 h-4" />
              {isKh ? "រូបវិទ្យាកង់ទិច" : "Quantum Physics"}
            </div>

            <h1
              className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight qx-glitch-title ${
                isKh ? "font-khmer leading-loose" : ""
              }`}
              data-text={isKh ? "ដែនកំណត់កង់ទិច" : "The Quantum Limit"}
            >
              {isKh ? (
                <>
                  ដែនកំណត់កង់ទិច៖
                  <br />
                  <span className="text-cyan-300">
                    ការរកឃើញរបស់ Max Planck
                  </span>
                </>
              ) : (
                <>
                  The Quantum Limit:
                  <br />
                  <span className="text-cyan-300">
                    Max Planck's Discovery
                  </span>
                </>
              )}
            </h1>
            <p
              className={`text-white/60 max-w-2xl mx-auto leading-relaxed ${
                isKh ? "font-khmer text-base leading-loose" : "text-base"
              }`}
            >
              {isKh
                ? "នៅឆ្នាំ ១៩០០ លោក Max Planck បានរកឃើញថាថាមពលមិនមែនដូចទឹកដែលហូរបន្ត — ផ្ទុយទៅវិញ វាមកជា «កញ្ចប់» តូចៗ។ ការរកឃើញនេះបានបើកទ្វារទៅរូបវិទ្យាកង់ទិច និងបានផ្លាស់ប្ដូរការយល់ដឹងរបស់យើងពីរូបវិទ្យាជារៀងរហូត។"
                : "In 1900, Max Planck discovered that energy doesn't flow like water — it comes in tiny \"packets\". That single insight opened the door to quantum physics and changed our understanding of reality forever."}
            </p>

            {/* Hero formula — neon framed */}
            <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-cyan-400/40 bg-cyan-500/10 backdrop-blur-sm shadow-[0_0_24px_rgba(34,211,238,0.25)]">
              <MathExpr>E = hν</MathExpr>
              <span className="text-white/40 text-xs font-mono">
                {isKh ? "ថាមពល = កង់ទិច" : "Energy = Quantized"}
              </span>
            </div>
          </div>
        </header>

        {/* ── Tool 1: E = hν Light Beam ────────────────────────────── */}
        <Section
          icon={<Zap className="w-3.5 h-3.5" />}
          en="Planck's Constant: The Energy Packet"
          kh="ថេរ Planck៖ កញ្ចប់ថាមពល"
          descEn="Light is not a smooth flowing river — it travels as tiny indivisible bullets called photons or quanta. Each photon carries an exact amount of energy that depends on the colour (frequency) of the light."
          descKh="ពន្លឺមិនមែនជាទន្លេហូររលូននោះទេ — វាធ្វើដំណើរជាគ្រាប់តូចៗមិនអាចបែងចែកបានទៀតហៅថាហ្វូតុង ឬក៏ Quanta។ ហ្វូតុងនីមួយៗកាន់ថាមពលដ៏ច្បាស់លាស់មួយ ដែលអាស្រ័យលើពណ៌ (ហ្វ្រេកង់) នៃពន្លឺ។"
          isKh={isKh}
          accent="cyan"
        >
          <LightBeamSimulator isKh={isKh} />
        </Section>

        {/* ── Tool 2: Planck Length zoom ───────────────────────────── */}
        <Section
          icon={<Ruler className="w-3.5 h-3.5" />}
          en="The Planck Length: The Smallest Pixel"
          kh="ប្រវែង Planck៖ ភីកសែលតូចបំផុត"
          descEn="How small can something be before it stops making sense? Zoom from a human, down through cells, atoms, quarks, all the way to the Planck length — the smallest distance that has any meaning in physics."
          descKh="តើអ្វីមួយអាចតូចប៉ុនណាទៀត មុនពេលវាឈប់មានន័យ? ពង្រីកពីមនុស្ស ឆ្លងកាត់កោសិកា អាតូម កូកត៌(quarks) រហូតដល់ប្រវែង Planck — ចម្ងាយតូចបំផុតដែលមានន័យក្នុងរូបវិទ្យា។"
          isKh={isKh}
          accent="fuchsia"
        >
          <PlanckLengthZoom isKh={isKh} />
        </Section>

        {/* ── Tool 3: Planck Time ──────────────────────────────────── */}
        <Section
          icon={<Timer className="w-3.5 h-3.5" />}
          en="The Planck Time: The Quickest Moment"
          kh="ពេលវេលា Planck៖ ភ្លាមៗបំផុត"
          descEn="If the Planck length is the smallest possible distance, then the Planck time is the smallest possible moment — the time it takes light to cross one Planck length."
          descKh="ប្រសិនបើប្រវែង Planck គឺជាចម្ងាយតូចបំផុត នោះពេលវេលា Planck គឺជាពេលខ្លីបំផុត — ពេលដែលពន្លឺត្រូវការដើម្បីឆ្លងកាត់ប្រវែង Planck មួយ។"
          isKh={isKh}
          accent="violet"
        >
          <PlanckTimePanel isKh={isKh} />
        </Section>

        {/* ── Closing strip ───────────────────────────────────────── */}
        <div className="border-t border-white/10 bg-white/[0.02] mt-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
            <InfIcon className="w-8 h-8 text-cyan-300/60 mx-auto mb-3" />
            <p
              className={`text-white/50 text-sm max-w-xl mx-auto ${
                isKh ? "font-khmer leading-loose" : ""
              }`}
            >
              {isKh
                ? "«ការរកឃើញតូចមួយអាចផ្លាស់ប្ដូរអ្វីៗគ្រប់យ៉ាង។» — សូម្បីតែបញ្ហាដ៏តូចបំផុត ក៏អាចបង្កើតវិទ្យាសាស្ត្រដ៏ធំបំផុតដែរ។"
                : "\"A small discovery can change everything.\" — Even the smallest question can open up the largest science."}
            </p>
          </div>
        </div>
      </div>

      {/* Scoped styles — all keyframes prefixed `qx-` */}
      <style>{`
        /* Glitchy title shadow */
        .qx-glitch-title {
          text-shadow:
            0 0 24px rgba(103, 232, 249, 0.18),
            0 0 1px rgba(232, 121, 249, 0.55);
        }

        @keyframes qx-photon-travel {
          0%   { transform: translateX(-20px); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateX(380px); opacity: 0; }
        }
        @keyframes qx-wave-shift {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -80; }
        }
        @keyframes qx-foam {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25%      { transform: translate(-2px, 1px) scale(1.05); opacity: 0.85; }
          50%      { transform: translate(2px, -1px) scale(0.95); opacity: 0.5; }
          75%      { transform: translate(-1px, -2px) scale(1.08); opacity: 0.75; }
        }
        @keyframes qx-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.06); }
        }
        @keyframes qx-glitch {
          0%, 100% { transform: translate(0, 0); }
          20%      { transform: translate(-1px, 1px); }
          40%      { transform: translate(1px, -1px); }
          60%      { transform: translate(-1px, -1px); }
          80%      { transform: translate(1px, 1px); }
        }

        .qx-photon       { animation: qx-photon-travel 2.4s linear infinite; }
        .qx-wave         { stroke-dasharray: 4 4; animation: qx-wave-shift 1.6s linear infinite; }
        .qx-foam-dot     { animation: qx-foam 1.2s ease-in-out infinite; }
        .qx-pulse        { animation: qx-pulse 2.5s ease-in-out infinite; }
        .qx-glitch       { animation: qx-glitch 0.4s steps(2) infinite; }

        @media (prefers-reduced-motion: reduce) {
          .qx-photon, .qx-wave, .qx-foam-dot, .qx-pulse, .qx-glitch {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Inline math helper — italic variables, monospace numbers, neon look
// ════════════════════════════════════════════════════════════════════════════

function MathExpr({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono italic text-cyan-200 text-base sm:text-lg"
      style={{ fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}
    >
      {children}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper
// ════════════════════════════════════════════════════════════════════════════

function Section({
  icon, en, kh, descEn, descKh, isKh, accent, children,
}: {
  icon: React.ReactNode;
  en: string; kh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  accent: "cyan" | "fuchsia" | "violet";
  children: React.ReactNode;
}) {
  const accentMap = {
    cyan:    { dot: "text-cyan-300",    chipBg: "bg-cyan-500/10",    chipBd: "border-cyan-400/30",    panelBd: "border-cyan-400/15",    glow: "shadow-[0_0_28px_rgba(34,211,238,0.10)]" },
    fuchsia: { dot: "text-fuchsia-300", chipBg: "bg-fuchsia-500/10", chipBd: "border-fuchsia-400/30", panelBd: "border-fuchsia-400/15", glow: "shadow-[0_0_28px_rgba(232,121,249,0.10)]" },
    violet:  { dot: "text-violet-300",  chipBg: "bg-violet-500/10",  chipBd: "border-violet-400/30",  panelBd: "border-violet-400/15",  glow: "shadow-[0_0_28px_rgba(167,139,250,0.10)]" },
  }[accent];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-7 h-7 rounded-lg ${accentMap.chipBg} border ${accentMap.chipBd} flex items-center justify-center ${accentMap.dot}`}>
          {icon}
        </div>
        <span className={`text-xs font-bold tracking-widest uppercase ${accentMap.dot} ${isKh ? "font-khmer tracking-normal" : ""}`}>
          {isKh ? kh : en}
        </span>
        <div className={`h-px flex-1 bg-gradient-to-r ${accent === "cyan" ? "from-cyan-400/30" : accent === "fuchsia" ? "from-fuchsia-400/30" : "from-violet-400/30"} to-transparent`} />
      </div>

      <p className={`text-white/60 text-sm mb-5 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>

      <div className={`relative rounded-3xl overflow-hidden border ${accentMap.panelBd} bg-black/40 backdrop-blur-sm ${accentMap.glow}`}>
        {children}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 1: Light Beam Simulator (E = hν)
// ════════════════════════════════════════════════════════════════════════════

// Six visible-spectrum colours, ordered by ascending frequency (THz)
const COLORS = [
  { id: 0, name: { en: "Red",    kh: "ក្រហម"     }, freqTHz: 430, color: "#ef4444", wavelength: 700 },
  { id: 1, name: { en: "Orange", kh: "ទឹកក្រូច"  }, freqTHz: 490, color: "#f97316", wavelength: 612 },
  { id: 2, name: { en: "Yellow", kh: "លឿង"       }, freqTHz: 540, color: "#facc15", wavelength: 555 },
  { id: 3, name: { en: "Green",  kh: "បៃតង"      }, freqTHz: 580, color: "#22c55e", wavelength: 517 },
  { id: 4, name: { en: "Blue",   kh: "ខៀវ"       }, freqTHz: 650, color: "#3b82f6", wavelength: 461 },
  { id: 5, name: { en: "Violet", kh: "ស្វាយ"     }, freqTHz: 750, color: "#a855f7", wavelength: 400 },
] as const;

const PLANCK_J_S    = 6.626e-34;            // J·s
const PLANCK_EV_S   = 4.136e-15;            // eV·s

function LightBeamSimulator({ isKh }: { isKh: boolean }) {
  const [idx, setIdx] = useState(2); // start on yellow
  const c = COLORS[idx];
  const freqHz = c.freqTHz * 1e12;

  // Energy in joules and electron-volts
  const energyJ  = PLANCK_J_S  * freqHz;
  const energyEV = PLANCK_EV_S * freqHz;

  // Visual scaling: photon size & wave frequency scale with frequency
  const norm = (c.freqTHz - 430) / (750 - 430); // 0..1
  const photonSize = 6 + norm * 14;             // 6..20 px
  const waveCycles = 3 + Math.round(norm * 9);  // tighter wave at higher freq

  // Build the wavy beam path
  const wavePath = useMemo(() => {
    const w = 380, h = 80;
    const amp = 12;
    const cycleW = w / waveCycles;
    let d = `M 0 ${h / 2}`;
    for (let i = 0; i < waveCycles; i++) {
      const x1 = i * cycleW + cycleW * 0.25;
      const y1 = h / 2 - amp;
      const x2 = i * cycleW + cycleW * 0.75;
      const y2 = h / 2 + amp;
      const x3 = (i + 1) * cycleW;
      d += ` C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${h / 2}`;
    }
    return d;
  }, [waveCycles]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] gap-0">
      {/* Beam visualisation */}
      <div className="p-5">
        <div className="rounded-2xl border border-white/10 bg-black/60 p-4 mb-4 overflow-hidden">
          <svg viewBox="0 0 380 110" className="w-full h-auto" role="img"
            aria-label={isKh ? "ធ្នឹមពន្លឺ និងហ្វូតុង" : "Light beam with photon packets"}>
            {/* Wave */}
            <path
              d={wavePath}
              fill="none"
              stroke={c.color}
              strokeWidth="2"
              className="qx-wave"
              opacity="0.85"
              style={{ filter: `drop-shadow(0 0 6px ${c.color})` }}
            />
            {/* Photon packets riding along the beam */}
            {[0, 0.5, 1.0, 1.5].map((delay, i) => (
              <circle
                key={i}
                cx="0"
                cy="40"
                r={photonSize / 2}
                fill={c.color}
                className="qx-photon"
                style={{
                  animationDelay: `${delay}s`,
                  filter: `drop-shadow(0 0 ${4 + norm * 12}px ${c.color})`,
                }}
              />
            ))}

            {/* Source label */}
            <text x="0" y="100" fill="#67e8f9" fontSize="9" fontFamily="monospace">{isKh ? "ប្រភព" : "Source"}</text>
            <text x="345" y="100" fill="#67e8f9" fontSize="9" fontFamily="monospace">{isKh ? "ឧបករណ៍" : "Detector"}</text>
          </svg>
        </div>

        {/* Formula card */}
        <div className="rounded-xl border border-cyan-400/25 bg-cyan-500/5 p-4 text-center">
          <div className="mb-2 text-white/50 text-xs uppercase tracking-widest font-bold">
            {isKh ? "រូបមន្តរបស់ Planck" : "Planck's Formula"}
          </div>
          <div className="text-2xl sm:text-3xl">
            <MathExpr>E</MathExpr>
            <span className="text-white/70 mx-2">=</span>
            <MathExpr>h</MathExpr>
            <span className="text-white/70 mx-1">·</span>
            <MathExpr>ν</MathExpr>
          </div>
          <div className={`mt-3 text-white/55 text-xs ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? <>ថាមពល <MathExpr>E</MathExpr> នៃហ្វូតុងស្មើនឹងថេរ Planck <MathExpr>h</MathExpr> គុណនឹងហ្វ្រេកង់ <MathExpr>ν</MathExpr> (nu)។</>
              : <>The energy <MathExpr>E</MathExpr> of one photon equals Planck's constant <MathExpr>h</MathExpr> times its frequency <MathExpr>ν</MathExpr> (nu).</>}
          </div>
        </div>
      </div>

      {/* Controls + readout */}
      <div className="p-6 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/50">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="qx-color" className={`text-sm font-semibold text-white/85 flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: c.color }} />
              {isKh ? "ពណ៌ពន្លឺ" : "Light colour"}
            </label>
            <span className="font-mono text-sm font-bold" style={{ color: c.color }}>
              {isKh ? c.name.kh : c.name.en}
            </span>
          </div>
          <input
            id="qx-color"
            type="range"
            min={0}
            max={5}
            step={1}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            style={{
              background: "linear-gradient(90deg, #ef4444, #f97316, #facc15, #22c55e, #3b82f6, #a855f7)",
            }}
            aria-valuetext={`${isKh ? c.name.kh : c.name.en}, ${c.freqTHz} terahertz`}
            data-testid="planck-color-slider"
          />
          <div className="flex justify-between mt-1 text-[9px] font-mono text-white/40">
            {COLORS.map((co) => <span key={co.id} style={{ color: co.color, opacity: 0.7 }}>●</span>)}
          </div>
        </div>

        {/* Readout */}
        <div
          aria-live="polite"
          className="rounded-2xl border border-white/10 bg-black/60 p-4 space-y-2.5"
          data-testid="planck-energy-readout"
        >
          <Row label={isKh ? "ហ្វ្រេកង់ (ν)" : "Frequency (ν)"} value={`${c.freqTHz} THz`} mono />
          <Row label={isKh ? "ប្រវែងរលក (λ)" : "Wavelength (λ)"} value={`${c.wavelength} nm`} mono />
          <Row label={isKh ? "ថេរ Planck (h)" : "Planck constant (h)"} value="6.626×10⁻³⁴ J·s" mono small />
          <div className="border-t border-white/10 pt-2.5">
            <Row
              label={isKh ? "ថាមពលហ្វូតុង (E)" : "Photon energy (E)"}
              value={`${energyEV.toFixed(2)} eV`}
              mono
              accent
            />
            <div className="text-[10px] text-white/40 font-mono text-right mt-0.5">
              {energyJ.toExponential(2)} J
            </div>
          </div>
        </div>

        {/* Insight card */}
        <div className="rounded-xl border border-fuchsia-400/25 bg-fuchsia-500/5 p-3">
          <p className={`text-fuchsia-100/85 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "💡 ពន្លឺស្វាយមានហ្វូតុងថាមពលខ្ពស់ជាងពន្លឺក្រហម។ នេះហើយជាមូលហេតុដែលពន្លឺ UV ដុតស្បែក ប៉ុន្តែពន្លឺពណ៌ក្រហមមិនដុតទេ — ទោះបីជាអ្នកបើកវាគ្រប់ថ្ងៃក៏ដោយ។"
              : "💡 Violet photons carry more energy than red ones. That's why UV light burns your skin but red light doesn't — even if you leave it on all day."}
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({
  label, value, mono, small, accent,
}: {
  label: string; value: string;
  mono?: boolean; small?: boolean; accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={`text-white/55 ${small ? "text-[10px]" : "text-xs"}`}>{label}</span>
      <span className={`${mono ? "font-mono" : ""} ${small ? "text-[10px]" : "text-sm"} ${accent ? "text-cyan-300 font-bold text-base" : "text-white/85"}`}>
        {value}
      </span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 2: Planck Length Zoom
// ════════════════════════════════════════════════════════════════════════════

const ZOOM_STOPS = [
  {
    id: "human",
    nameEn: "Human",
    nameKh: "មនុស្ស",
    sizeStr: "1.7 m",
    sizeExp: "10⁰ m",
    descEn: "A high-school student. The world we can see and touch every day.",
    descKh: "សិស្សវិទ្យាល័យម្នាក់។ ពិភពលោកដែលយើងអាចមើលឃើញ និងប៉ះបាននៅថ្ងៃនីមួយៗ។",
  },
  {
    id: "cell",
    nameEn: "Living Cell",
    nameKh: "កោសិកា",
    sizeStr: "10⁻⁵ m",
    sizeExp: "0.00001 m",
    descEn: "A single human cell. Around 100,000 of them would fit on the dot of an 'i'.",
    descKh: "កោសិកាមនុស្សតែមួយ។ ប្រហែល ១០០,០០០ កោសិកាអាចដាក់នៅលើសញ្ញាចំណុចនៃអក្សរ «i»។",
  },
  {
    id: "atom",
    nameEn: "Atom",
    nameKh: "អាតូម",
    sizeStr: "10⁻¹⁰ m",
    sizeExp: "0.0000000001 m",
    descEn: "An atom — a tiny solar system with electrons whirling around a nucleus.",
    descKh: "អាតូម — ប្រព័ន្ធព្រះអាទិត្យតូចមួយ ដែលអេឡិចត្រុងវិលជុំវិញនុយក្លេអ៊ីស។",
  },
  {
    id: "quark",
    nameEn: "Quark",
    nameKh: "កូកត៌ (Quark)",
    sizeStr: "<10⁻¹⁸ m",
    sizeExp: "0.000…001 m",
    descEn: "A quark — one of the smallest building blocks we have ever measured. Three of them make up a single proton.",
    descKh: "កូកត៌ — អង្គធាតុតូចបំផុតមួយដែលយើងធ្លាប់វាស់បាន។ ៣ កូកត៌បង្កើតបានប្រូតុង ១។",
  },
  {
    id: "planck",
    nameEn: "Planck Length",
    nameKh: "ប្រវែង Planck",
    sizeStr: "1.616 × 10⁻³⁵ m",
    sizeExp: "0.00…01 m  (35 zeros)",
    descEn: "The smallest distance that has any meaning in physics. Below this, the laws of physics as we know them simply stop working — space and time themselves become foam-like and uncertain.",
    descKh: "ចម្ងាយតូចបំផុតដែលមានន័យក្នុងរូបវិទ្យា។ ខាងក្រោមនេះ ច្បាប់រូបវិទ្យាដែលយើងស្គាល់ឈប់ដំណើរការ — លំហ និងពេលវេលាខ្លួនឯងក្លាយជារូបរាងពពុះមិនច្បាស់លាស់។",
  },
] as const;

function PlanckLengthZoom({ isKh }: { isKh: boolean }) {
  const [step, setStep] = useState(0);
  const stop = ZOOM_STOPS[step];

  const go = (delta: number) =>
    setStep((s) => Math.min(ZOOM_STOPS.length - 1, Math.max(0, s + delta)));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] gap-0">
      {/* Visualization */}
      <div className="p-5">
        <div className="rounded-2xl border border-fuchsia-400/20 bg-black/60 aspect-[4/3] flex items-center justify-center relative overflow-hidden">
          <ZoomVisual stopId={stop.id} />

          {/* Scale tag */}
          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-fuchsia-300/85 bg-black/60 border border-fuchsia-400/30 rounded px-2 py-1">
            {stop.sizeStr}
          </div>
        </div>

        {/* Stepper controls */}
        <div className="flex items-center justify-between gap-3 mt-4">
          <button
            onClick={() => go(-1)}
            disabled={step === 0}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/15 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-fuchsia-300/60"
            aria-label={isKh ? "ថយក្រោយ" : "Zoom out"}
            data-testid="zoom-prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Progress dots — stepper, not tabs */}
          <ol className="flex items-center gap-2 flex-1 justify-center list-none m-0 p-0" aria-label={isKh ? "កម្រិតពង្រីក" : "Zoom levels"}>
            {ZOOM_STOPS.map((s, i) => (
              <li key={s.id} className="contents">
              <button
                type="button"
                aria-current={step === i ? "step" : undefined}
                aria-label={`${isKh ? "កម្រិត" : "Step"} ${i + 1}: ${isKh ? s.nameKh : s.nameEn}`}
                onClick={() => setStep(i)}
                className={`group flex flex-col items-center gap-1 ${i === step ? "" : "opacity-50 hover:opacity-90"} transition-opacity focus-visible:outline-none`}
              >
                <span
                  className={`block rounded-full transition-all ${
                    i === step
                      ? "w-3 h-3 bg-fuchsia-300 shadow-[0_0_8px_rgba(232,121,249,0.7)]"
                      : "w-2 h-2 bg-white/30"
                  }`}
                />
                <span className={`text-[9px] font-mono uppercase tracking-wide ${i === step ? "text-fuchsia-200" : "text-white/40"} hidden sm:block`}>
                  {s.id}
                </span>
              </button>
              </li>
            ))}
          </ol>

          <button
            onClick={() => go(1)}
            disabled={step === ZOOM_STOPS.length - 1}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/15 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-fuchsia-300/60"
            aria-label={isKh ? "ពង្រីកបន្ត" : "Zoom in"}
            data-testid="zoom-next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info panel */}
      <div className="p-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/50">
        <div aria-live="polite">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
            {isKh ? `កម្រិត ${step + 1} / ${ZOOM_STOPS.length}` : `Step ${step + 1} of ${ZOOM_STOPS.length}`}
          </div>
          <h4 className={`font-display font-bold text-2xl mb-1 ${stop.id === "planck" ? "text-fuchsia-300 qx-glitch" : "text-white"} ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? stop.nameKh : stop.nameEn}
          </h4>
          <div className="font-mono text-fuchsia-300 text-lg mb-3">{stop.sizeStr}</div>

          <p className={`text-white/70 text-sm mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? stop.descKh : stop.descEn}
          </p>

          {stop.id === "planck" && (
            <div className="rounded-xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-violet-500/10 p-3.5">
              <p className={`text-fuchsia-100 text-xs font-bold mb-1 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "⚛️ ដែនកំណត់នៃចំណេះដឹង" : "⚛️ The edge of physics"}
              </p>
              <p className={`text-fuchsia-100/85 text-[11px] ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "ប្រវែង Planck តូចជាងប្រូតុង ១០²⁰ ដង។ វាគឺជា «ភីកសែល» នៃលំហ — តូចជាងនេះ លំហខ្លួនឯងបាត់បង់អត្ថន័យ។"
                  : "The Planck length is 10²⁰ times smaller than a proton. It is the \"pixel\" of space itself — go any smaller and space loses its meaning."}
              </p>
            </div>
          )}
        </div>

        {/* Scale ladder */}
        <div className="mt-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
            {isKh ? "មាត្រដ្ឋាន" : "Scale ladder"}
          </div>
          <ol className="space-y-1.5">
            {ZOOM_STOPS.map((s, i) => (
              <li
                key={s.id}
                className={`flex items-center justify-between text-xs transition-colors ${
                  i === step
                    ? "text-fuchsia-200 font-bold"
                    : i < step
                      ? "text-white/40 line-through"
                      : "text-white/55"
                } ${isKh ? "font-khmer" : ""}`}
              >
                <span>{i + 1}. {isKh ? s.nameKh : s.nameEn}</span>
                <span className="font-mono text-[10px] text-white/45">{s.sizeStr}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function ZoomVisual({ stopId }: { stopId: string }) {
  switch (stopId) {
    case "human":
      return (
        <svg viewBox="0 0 200 200" className="w-1/2 h-1/2" role="img" aria-label="Human silhouette">
          {/* Stylised human */}
          <circle cx="100" cy="55" r="14" fill="#67e8f9" />
          <rect x="92" y="68" width="16" height="50" rx="4" fill="#67e8f9" />
          <line x1="100" y1="78" x2="80" y2="100" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" />
          <line x1="100" y1="78" x2="120" y2="100" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" />
          <line x1="96" y1="116" x2="88" y2="160" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" />
          <line x1="104" y1="116" x2="112" y2="160" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" />
          <line x1="40" y1="180" x2="160" y2="180" stroke="#67e8f9" strokeWidth="1" opacity="0.4" />
        </svg>
      );
    case "cell":
      return (
        <svg viewBox="0 0 200 200" className="w-3/4 h-3/4" role="img" aria-label="Living cell">
          <ellipse cx="100" cy="100" rx="80" ry="60" fill="#0e7490" opacity="0.35" stroke="#67e8f9" strokeWidth="1.5" />
          <circle cx="105" cy="95" r="22" fill="#0891b2" opacity="0.7" />
          <circle cx="105" cy="95" r="6" fill="#67e8f9" />
          {/* Mitochondria-like blobs */}
          <ellipse cx="60" cy="120" rx="12" ry="6" fill="#22d3ee" opacity="0.7" transform="rotate(-30 60 120)" />
          <ellipse cx="150" cy="80" rx="10" ry="5" fill="#22d3ee" opacity="0.7" transform="rotate(40 150 80)" />
          <ellipse cx="140" cy="130" rx="11" ry="5" fill="#22d3ee" opacity="0.7" transform="rotate(15 140 130)" />
          <ellipse cx="55" cy="80" rx="9" ry="4" fill="#22d3ee" opacity="0.6" />
        </svg>
      );
    case "atom":
      return (
        <svg viewBox="0 0 200 200" className="w-3/4 h-3/4" role="img" aria-label="Atom">
          {/* Nucleus */}
          <circle cx="100" cy="100" r="14" fill="#a855f7" className="qx-pulse"
            style={{ filter: "drop-shadow(0 0 10px rgba(168,85,247,0.85))", transformOrigin: "100px 100px" }} />
          {/* Three orbits */}
          {[0, 60, 120].map((rot) => (
            <g key={rot} transform={`rotate(${rot} 100 100)`}>
              <ellipse cx="100" cy="100" rx="70" ry="22" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.4" />
              <circle cx="170" cy="100" r="4" fill="#67e8f9"
                style={{ filter: "drop-shadow(0 0 6px rgba(103,232,249,0.95))" }} />
            </g>
          ))}
        </svg>
      );
    case "quark":
      return (
        <svg viewBox="0 0 200 200" className="w-3/4 h-3/4" role="img" aria-label="Quark">
          {/* Proton-like grouping */}
          <circle cx="80"  cy="115" r="22" fill="#ef4444" opacity="0.35" />
          <circle cx="120" cy="115" r="22" fill="#22c55e" opacity="0.35" />
          <circle cx="100" cy="80"  r="22" fill="#3b82f6" opacity="0.35" />
          {/* Quark cores */}
          <circle cx="80"  cy="115" r="6" fill="#ef4444" className="qx-pulse" style={{ transformOrigin: "80px 115px", filter: "drop-shadow(0 0 6px rgba(239,68,68,0.9))" }} />
          <circle cx="120" cy="115" r="6" fill="#22c55e" className="qx-pulse" style={{ transformOrigin: "120px 115px", animationDelay: "0.6s", filter: "drop-shadow(0 0 6px rgba(34,197,94,0.9))" }} />
          <circle cx="100" cy="80"  r="6" fill="#3b82f6" className="qx-pulse" style={{ transformOrigin: "100px 80px",  animationDelay: "1.2s", filter: "drop-shadow(0 0 6px rgba(59,130,246,0.9))" }} />
          {/* Gluon "springs" between quarks */}
          <path d="M 86 110 Q 100 100 114 110"  stroke="#facc15" strokeWidth="1.2" fill="none" opacity="0.7" />
          <path d="M 84 112 Q 92 96 100 86"     stroke="#facc15" strokeWidth="1.2" fill="none" opacity="0.7" />
          <path d="M 116 112 Q 108 96 100 86"   stroke="#facc15" strokeWidth="1.2" fill="none" opacity="0.7" />
          <text x="100" y="170" fill="#67e8f9" fontSize="10" textAnchor="middle" fontFamily="monospace">proton = 3 quarks</text>
        </svg>
      );
    case "planck":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full" role="img" aria-label="Planck-scale quantum foam">
          {/* Quantum foam — random small circles that wobble */}
          {Array.from({ length: 28 }).map((_, i) => {
            const seed = (i * 9301 + 49297) % 233280 / 233280;
            const seed2 = ((i * 7) * 9301 + 49297) % 233280 / 233280;
            const cx = 30 + seed * 140;
            const cy = 30 + seed2 * 140;
            const r = 4 + seed * 12;
            const colors = ["#a855f7", "#67e8f9", "#e879f9", "#f472b6"];
            const color = colors[i % colors.length];
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={color}
                strokeWidth="1"
                opacity="0.55"
                className="qx-foam-dot"
                style={{
                  animationDelay: `${(seed * 1.2).toFixed(2)}s`,
                  transformOrigin: `${cx}px ${cy}px`,
                  filter: `drop-shadow(0 0 4px ${color})`,
                }}
              />
            );
          })}
          <text x="100" y="105" textAnchor="middle" fill="#e879f9" fontSize="11" fontFamily="monospace" className="qx-glitch" style={{ transformOrigin: "100px 105px" }}>
            QUANTUM FOAM
          </text>
          <text x="100" y="120" textAnchor="middle" fill="#a855f7" fontSize="8" fontFamily="monospace" opacity="0.7">
            physics breaks down
          </text>
        </svg>
      );
    default:
      return null;
  }
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 3: Planck Time
// ════════════════════════════════════════════════════════════════════════════

function PlanckTimePanel({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* The number */}
      <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
        <div className="text-[10px] font-mono uppercase tracking-widest text-violet-300 mb-2">
          {isKh ? "ពេលវេលា Planck" : "Planck Time"}
        </div>
        <div className="font-mono font-bold text-3xl sm:text-4xl text-violet-200 mb-1 break-all">
          5.39 × 10⁻⁴⁴
          <span className="text-violet-400/70 text-2xl ml-2">s</span>
        </div>
        <div className="text-white/45 text-xs font-mono mb-5">
          = 0.000…000539 {isKh ? "វិនាទី" : "seconds"}
          <span className="ml-1 text-white/30">(43 zeros)</span>
        </div>

        <div className="rounded-xl border border-violet-400/25 bg-violet-500/5 p-4 space-y-2.5">
          <p className={`text-white/85 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ពេលវេលា Planck គឺជារយៈពេលដែលពន្លឺត្រូវការដើម្បីឆ្លងកាត់ប្រវែង Planck មួយ — ហើយដោយសារពន្លឺមានល្បឿនលឿនបំផុតក្នុងចក្រវាឡ វាគឺជាពេលខ្លីបំផុតដែលអាចកើតមាន។"
              : "The Planck time is how long light takes to cross one Planck length — and because nothing in the universe travels faster than light, this is the shortest possible moment that can exist."}
          </p>
          <p className={`text-violet-200/80 text-xs italic ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? <>«តើ​អ្វី​ៗ​អាច​កើត​ឡើង​លឿន​ប៉ុណ្ណា?» ចម្លើយ​របស់ Planck គឺ៖ <MathExpr>tₚ ≈ 5.39 × 10⁻⁴⁴ s</MathExpr>។</>
              : <>"How fast can anything happen?" Planck's answer: <MathExpr>tₚ ≈ 5.39 × 10⁻⁴⁴ s</MathExpr>.</>}
          </p>
        </div>
      </div>

      {/* The mind-blowing comparison */}
      <div className="p-6 lg:p-8 flex flex-col justify-center">
        <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-3">
          {isKh ? "ការប្រៀបធៀប" : "Mind-blowing comparison"}
        </div>

        <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-5 space-y-4">
          <Compare
            n="10⁴⁴"
            labelEn="Planck times in just one second"
            labelKh="ពេល Planck ក្នុងតែ ១ វិនាទី"
            isKh={isKh}
            color="text-cyan-300"
          />
          <div className="h-px bg-white/10" />
          <Compare
            n="10¹⁷"
            labelEn="Seconds since the Big Bang (~13.8 billion years)"
            labelKh="វិនាទីចាប់តាំងពីបិ៊កបាំង (~១៣.៨ ពាន់លានឆ្នាំ)"
            isKh={isKh}
            color="text-violet-300"
          />
        </div>

        <div className="mt-4 rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/8 p-4">
          <div className={`text-fuchsia-200 text-sm font-bold mb-1 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "🤯 គិតមើលទៅ…" : "🤯 Think about that…"}
          </div>
          <p className={`text-fuchsia-100/85 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ក្នុងតែ ១ វិនាទីប៉ុណ្ណោះ មានពេល Planck ច្រើនជាងវិនាទីដែលកន្លងទៅចាប់តាំងពីបិ៊កបាំង (~១៣.៨ ពាន់លានឆ្នាំ) ប្រហែលមួយលានលានលានដង (~១០²⁷ ដង)។"
              : "In just one second there are about 10²⁷ times more Planck times than there are seconds in the entire 13.8-billion-year history of the universe — that's a billion billion billion times more."}
          </p>
        </div>
      </div>
    </div>
  );
}

function Compare({
  n, labelEn, labelKh, isKh, color,
}: {
  n: string; labelEn: string; labelKh: string; isKh: boolean; color: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <div className={`font-mono font-bold text-2xl sm:text-3xl ${color}`} style={{ filter: `drop-shadow(0 0 8px currentColor)` }}>
        {n}
      </div>
      <div className={`text-white/70 text-xs flex-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? labelKh : labelEn}
      </div>
    </div>
  );
}
