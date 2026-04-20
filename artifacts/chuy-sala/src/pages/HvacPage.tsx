import { useState } from "react";
import {
  Thermometer,
  Snowflake,
  Flame,
  Wind,
  Zap,
  RefreshCw,
  Info,
  Users,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  HVAC: Managing Our Environment
//  ការគ្រប់គ្រងសីតុណ្ហភាព និងខ្យល់ចេញចូល
//
//  Standalone bilingual page (Technology dropdown).
//  Three interactive tools, dual-tone "ice blue / fire orange" aesthetic:
//
//   1. The Refrigeration Cycle: 4-stage closed loop with animated refrigerant
//      changing colour (cold blue / hot red) as it phase-changes around the
//      compressor → condenser → expansion valve → evaporator path.
//   2. How Heaters Work: a glowing resistive coil with animated electrons
//      colliding with atoms to release heat, plus a Heat-Pump explainer that
//      shows the refrigeration cycle "running in reverse."
//   3. The Science of Ventilation: a classroom with stick figures, "stale" CO₂
//      bubbles drifting out one vent and "fresh" O₂ flowing in another, with
//      curved fan-airflow streamers across the room.
//
//  All keyframes scoped under `hv-*` and gated by prefers-reduced-motion.
// ════════════════════════════════════════════════════════════════════════════

export default function HvacPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div
      className="min-h-screen relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(180deg, #0c1220 0%, #0b1428 50%, #0a0f1f 100%)",
      }}
    >
      {/* Faint air-flow streamers across the page background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]" aria-hidden>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M -10 20 Q 30 5 60 25 T 110 30" stroke="#67e8f9" fill="none" strokeWidth="0.4" />
          <path d="M -10 50 Q 40 35 70 55 T 110 60" stroke="#fb923c" fill="none" strokeWidth="0.4" />
          <path d="M -10 80 Q 30 65 60 85 T 110 90" stroke="#67e8f9" fill="none" strokeWidth="0.4" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6 text-sm font-semibold backdrop-blur-sm border"
            style={{
              borderColor: "rgba(103,232,249,0.3)",
              background:
                "linear-gradient(90deg, rgba(34,211,238,0.12), rgba(251,146,60,0.12))",
            }}
          >
            <Snowflake className="w-4 h-4 text-cyan-300" />
            <span className="text-white/85">{isKh ? "បច្ចេកវិទ្យា HVAC" : "HVAC Technology"}</span>
            <Flame className="w-4 h-4 text-orange-300" />
          </div>

          <h1 className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? (
              <>
                <span className="text-cyan-300">ការគ្រប់គ្រង</span>
                <br />
                សីតុណ្ហភាព និងខ្យល់ចេញចូល
              </>
            ) : (
              <>
                <span className="text-cyan-300">HVAC</span>
                <span className="text-white/90">: </span>
                <br />
                <span className="text-orange-300">Managing Our Environment</span>
              </>
            )}
          </h1>
          <p className={`text-white/65 max-w-2xl mx-auto ${isKh ? "font-khmer text-base leading-loose" : "text-base leading-relaxed"}`}>
            {isKh
              ? "Heating, Ventilation, and Air Conditioning — បច្ចេកវិទ្យាដែលធ្វើឲ្យបន្ទប់រៀន ផ្ទះ និងមន្ទីរពេទ្យរបស់យើងមានសុខភាពល្អ និងស្រួលរស់នៅ។"
              : "Heating, Ventilation, and Air Conditioning — the technology that keeps our classrooms, homes, and hospitals healthy and comfortable to live in."}
          </p>

          {/* Cold-vs-Heat tooltip card */}
          <div className="mt-6 inline-flex items-start gap-3 max-w-md text-left rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3">
            <Info className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
            <div>
              <div className={`text-xs font-bold text-cyan-200 mb-0.5 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "គន្លឹះវិទ្យាសាស្ត្រ" : "Science Insight"}
              </div>
              <div className={`text-white/75 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "«ត្រជាក់» គឺមិនមែនជារបស់ដាច់ដោយឡែកទេ — វាគ្រាន់តែជា «កង្វះកំដៅ» ប៉ុណ្ណោះ។ យើងមិនបន្ថែម​ភាព​ត្រជាក់​ចូលក្នុង​បន្ទប់​នោះទេ — យើង​យក​កំដៅ​ចេញ​ពី​បន្ទប់​វិញ។"
                  : '"Cold" is not a thing on its own — it is just the absence of heat. We don\'t add cold to a room — we move heat out of it.'}
              </div>
            </div>
          </div>
        </header>

        {/* ── Tool 1: Refrigeration Cycle ──────────────────────────── */}
        <Section
          icon={<Snowflake className="w-3.5 h-3.5" />}
          en="How an Air Conditioner Works"
          kh="របៀបដែលម៉ាស៊ីនត្រជាក់ដំណើរការ"
          subEn="The Refrigeration Cycle"
          subKh="វដ្តរបស់ការធ្វើឲ្យត្រជាក់"
          descEn="An air conditioner does not create cold — it picks up heat from inside the room and dumps it outside. A special fluid called the refrigerant carries that heat in a never-ending loop, changing between liquid and gas at the right moments."
          descKh="ម៉ាស៊ីនត្រជាក់មិនបង្កើតភាពត្រជាក់ទេ — វារើសយកកំដៅពីខាងក្នុងបន្ទប់ ហើយយកទៅបោះចោលនៅខាងក្រៅ។ វត្ថុរាវពិសេសមួយឈ្មោះថា «រូបធាតុត្រជាក់» (refrigerant) ផ្ទុកកំដៅនោះក្នុងវដ្តមិនចេះចប់ ប្ដូររវាងរាវ និងឧស្ម័នតាមពេលដ៏ត្រឹមត្រូវ។"
          isKh={isKh}
          tone="cool"
        >
          <RefrigerationCycle isKh={isKh} />
        </Section>

        {/* ── Tool 2: Heaters ──────────────────────────────────────── */}
        <Section
          icon={<Flame className="w-3.5 h-3.5" />}
          en="How Heaters Work"
          kh="របៀបដែលឧបករណ៍កំដៅដំណើរការ"
          descEn="There are two main ways we warm a room: forcing electricity through a metal that fights back, or running an air conditioner backwards to pull heat in from outside."
          descKh="មានវិធីសំខាន់ពីរយ៉ាង​ដើម្បីកំដៅបន្ទប់៖ បង្ខំ​អគ្គិសនី​ឲ្យឆ្លងកាត់​លោហៈ​មួយ​ដែល​ទប់ស្កាត់​វា ឬ​ដំណើរការ​ម៉ាស៊ីន​ត្រជាក់​បញ្ច្រាស់​ដើម្បី​ទាញ​យក​កំដៅ​ពី​ខាង​ក្រៅ​ចូល​ខាង​ក្នុង។"
          isKh={isKh}
          tone="warm"
        >
          <HeatersPanel isKh={isKh} />
        </Section>

        {/* ── Tool 3: Ventilation ──────────────────────────────────── */}
        <Section
          icon={<Wind className="w-3.5 h-3.5" />}
          en="The Science of Ventilation"
          kh="វិទ្យាសាស្ត្រនៃការបញ្ចេញខ្យល់"
          descEn="Even a perfectly cooled or heated room becomes unhealthy if the same air is breathed over and over. Ventilation removes stale CO₂-rich air and brings in fresh oxygen."
          descKh="សូម្បីតែបន្ទប់ដែលធ្វើឲ្យត្រជាក់ ឬកំដៅយ៉ាងល្អបំផុត ក៏អាចក្លាយជាមិនមានសុខភាពដែរ ប្រសិនបើខ្យល់ដដែលៗត្រូវបាន​ដកដង្ហើម​ចូលចេញ។ ការបញ្ចេញ​ខ្យល់​ដក CO₂ ដែល​ស្រូប​យកខ្ពស់​ចេញ ហើយ​នាំ​អុកស៊ីហ្សែន​ស្រស់​ចូល។"
          isKh={isKh}
          tone="cool"
        >
          <VentilationRoom isKh={isKh} />
        </Section>

        {/* ── Closing strip ───────────────────────────────────────── */}
        <div className="border-t border-white/10 bg-white/[0.02] mt-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <Snowflake className="w-5 h-5 text-cyan-300" />
              <Wind className="w-5 h-5 text-white/60" />
              <Flame className="w-5 h-5 text-orange-300" />
            </div>
            <p className={`text-white/55 text-sm max-w-xl mx-auto ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "បន្ទប់រៀនល្អមួយត្រូវការមិនមែនត្រឹមតែសៀវភៅទេ — តែក៏ត្រូវការខ្យល់ស្អាត សីតុណ្ហភាព​សម​ល្មម និង​ការបញ្ចេញ​ខ្យល់​ល្អដែរ។"
                : "A great classroom needs more than just books — it needs clean air, the right temperature, and good ventilation."}
            </p>
          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        @keyframes hv-cycle {
          0%   { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        @keyframes hv-glow {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        @keyframes hv-electron {
          0%   { transform: translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(220px); opacity: 0; }
        }
        @keyframes hv-rise {
          0%   { transform: translateY(0); opacity: 0; }
          15%  { opacity: 0.85; }
          100% { transform: translateY(-110px); opacity: 0; }
        }
        @keyframes hv-drift-in {
          0%   { transform: translateX(0); opacity: 0; }
          15%  { opacity: 0.85; }
          100% { transform: translateX(180px); opacity: 0; }
        }
        @keyframes hv-fan {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes hv-airflow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
        }

        .hv-glow      { animation: hv-glow 2s ease-in-out infinite; }
        .hv-electron  { animation: hv-electron 1.6s linear infinite; }
        .hv-rise      { animation: hv-rise 4s ease-out infinite; }
        .hv-drift-in  { animation: hv-drift-in 4s ease-out infinite; }
        .hv-fan       { animation: hv-fan 3s linear infinite; transform-origin: center; transform-box: fill-box; }
        .hv-airflow   { stroke-dasharray: 6 4; animation: hv-airflow 1.8s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hv-glow, .hv-electron, .hv-rise, .hv-drift-in, .hv-fan, .hv-airflow,
          .hv-refrig-dot {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper — dual-tone aware
// ════════════════════════════════════════════════════════════════════════════

function Section({
  icon, en, kh, subEn, subKh, descEn, descKh, isKh, tone, children,
}: {
  icon: React.ReactNode;
  en: string; kh: string;
  subEn?: string; subKh?: string;
  descEn: string; descKh: string;
  isKh: boolean;
  tone: "cool" | "warm";
  children: React.ReactNode;
}) {
  const cool = tone === "cool";
  const accent = cool ? "cyan" : "orange";
  const palette = cool
    ? {
        chip: "text-cyan-300 bg-cyan-500/10 border-cyan-400/30",
        bd:   "border-cyan-400/15",
        bgGrad: "linear-gradient(135deg, rgba(6,182,212,0.07), rgba(15,23,42,0.5))",
        line: "from-cyan-400/40",
      }
    : {
        chip: "text-orange-300 bg-orange-500/10 border-orange-400/30",
        bd:   "border-orange-400/15",
        bgGrad: "linear-gradient(135deg, rgba(251,146,60,0.07), rgba(28,18,8,0.5))",
        line: "from-orange-400/40",
      };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${palette.chip}`}>
          {icon}
        </div>
        <div className="flex flex-col">
          <span className={`text-xs font-bold tracking-widest uppercase ${cool ? "text-cyan-300" : "text-orange-300"} ${isKh ? "font-khmer tracking-normal" : ""}`}>
            {isKh ? kh : en}
          </span>
          {(subEn || subKh) && (
            <span className={`text-[10px] text-white/45 font-mono ${isKh ? "font-khmer" : ""}`}>
              {isKh ? subKh : subEn}
            </span>
          )}
        </div>
        <div className={`h-px flex-1 bg-gradient-to-r ${palette.line} to-transparent`} />
      </div>

      <p className={`text-white/65 text-sm mb-5 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>

      <div className={`relative rounded-3xl overflow-hidden border ${palette.bd} backdrop-blur-sm`} style={{ background: palette.bgGrad }}>
        {children}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 1: Refrigeration Cycle
// ════════════════════════════════════════════════════════════════════════════

type Stage = "compressor" | "condenser" | "expansion" | "evaporator";

const STAGE_INFO: Record<Stage, { en: string; kh: string; titleEn: string; titleKh: string }> = {
  compressor: {
    titleEn: "1. Compressor",
    titleKh: "១. កំប៉ាន់សង្កត់",
    en: "Squeezes the cool refrigerant gas hard, packing its molecules tightly together. Squeezing a gas heats it up — it leaves here as a HOT high-pressure gas.",
    kh: "សង្កត់ឧស្ម័នត្រជាក់ខ្លាំងៗ បង្ហាប់ម៉ូលេគុលចូលគ្នាជិត។ ការសង្កត់ឧស្ម័នធ្វើឲ្យវាក្ដៅ — វាចេញពីទីនេះជាឧស្ម័នក្ដៅសម្ពាធខ្ពស់។",
  },
  condenser: {
    titleEn: "2. Condenser (outside)",
    titleKh: "២. ឧបករណ៍បំប្លែងជារាវ (ខាងក្រៅ)",
    en: "Outdoor coils with a fan. The hot gas releases its heat into the outside air and turns into a warm LIQUID. (This is the warm air you feel from the outdoor unit.)",
    kh: "បំពង់នៅខាងក្រៅជាមួយដង្ហូរ។ ឧស្ម័នក្ដៅបញ្ចេញកំដៅទៅខ្យល់ខាងក្រៅ ហើយប្រែជារាវក្ដៅ។ (នេះហើយជាខ្យល់ក្ដៅដែលអ្នកមាន​អារម្មណ៍​នៅ​ឯ​ឯកតា​ខាងក្រៅ។)",
  },
  expansion: {
    titleEn: "3. Expansion Valve",
    titleKh: "៣. សន្ទះពង្រីក",
    en: "A tiny pinhole the liquid is forced through. On the other side it suddenly has lots of room — letting a liquid expand cools it down hard. It exits as a COLD low-pressure mist.",
    kh: "ប្រហោងតូចមួយ​ដែល​បង្ខំ​រាវ​ឲ្យ​ឆ្លង​កាត់។ នៅ​ម្ខាង​ទៀត វា​មាន​លំហ​ច្រើន​ភ្លាមៗ — ការ​ឲ្យ​រាវ​ពង្រីក​ធ្វើ​ឲ្យ​វា​ត្រជាក់​ខ្លាំង។ វា​ចេញ​ជា​អ័ព្ទ​ត្រជាក់​សម្ពាធ​ទាប។",
  },
  evaporator: {
    titleEn: "4. Evaporator (inside)",
    titleKh: "៤. ឧបករណ៍ហួត (ខាងក្នុង)",
    en: "Indoor coils with a fan. The cold mist absorbs heat from your room as it boils into a gas. Your room loses heat — that's why it feels colder. Then back to the compressor.",
    kh: "បំពង់នៅខាងក្នុងជាមួយដង្ហូរ។ អ័ព្ទត្រជាក់ស្រូបយកកំដៅពីបន្ទប់របស់អ្នកនៅពេលវាពុះក្លាយជាឧស្ម័ន។ បន្ទប់របស់អ្នកបាត់បង់កំដៅ — នោះហើយជាមូលហេតុដែលវាមានអារម្មណ៍ត្រជាក់ជាង។ បន្ទាប់មកត្រឡប់ទៅកំប៉ាន់សង្កត់វិញ។",
  },
};

function RefrigerationCycle({ isKh }: { isKh: boolean }) {
  const [hover, setHover] = useState<Stage | null>(null);
  const active = hover ?? "compressor";

  // Loop path through the 4 corners (square loop)
  // Top-left = Compressor (80,60), TR = Condenser (320,60),
  // BR = Expansion (320,220), BL = Evaporator (80,220)
  const loopPath = "M 80 60 L 320 60 L 320 220 L 80 220 Z";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] gap-0">
      {/* SVG diagram */}
      <div className="p-5">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 overflow-hidden">
          <svg viewBox="0 0 400 280" className="w-full h-auto"
            aria-label={isKh ? "ដ្យាក្រាមវដ្តរបស់ការធ្វើឲ្យត្រជាក់ — រុករកដំណាក់កាលនីមួយៗ" : "Refrigeration cycle diagram — explore each stage"}>
            <defs>
              <linearGradient id="hv-pipe-hot" x1="0" x2="1">
                <stop offset="0%"  stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <linearGradient id="hv-pipe-cool" x1="0" x2="1">
                <stop offset="0%"  stopColor="#a855f7" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
              <linearGradient id="hv-pipe-cold" x1="0" x2="1">
                <stop offset="0%"  stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
              <linearGradient id="hv-pipe-warming" x1="0" x2="1">
                <stop offset="0%"  stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>

            {/* Inside / Outside bands */}
            <rect x="0"   y="0"   width="200" height="280" fill="#0e7490" opacity="0.05" />
            <rect x="200" y="0"   width="200" height="280" fill="#7c2d12" opacity="0.05" />
            <line x1="200" y1="0" x2="200" y2="280" stroke="#ffffff" strokeOpacity="0.12" strokeDasharray="3 4" />
            <text x="100" y="16" textAnchor="middle" fill="#67e8f9" fontSize="10" fontFamily="monospace" opacity="0.65">
              {isKh ? "ខាងក្នុង (បន្ទប់)" : "INSIDE (room)"}
            </text>
            <text x="300" y="16" textAnchor="middle" fill="#fb923c" fontSize="10" fontFamily="monospace" opacity="0.65">
              {isKh ? "ខាងក្រៅ" : "OUTSIDE"}
            </text>

            {/* Pipes — colour-graded around the loop */}
            {/* top: compressor → condenser (hot gas) */}
            <line x1="80"  y1="60"  x2="320" y2="60"  stroke="url(#hv-pipe-hot)"     strokeWidth="4" strokeLinecap="round" />
            {/* right: condenser → expansion (warm liquid → cooling) */}
            <line x1="320" y1="60"  x2="320" y2="220" stroke="url(#hv-pipe-cool)"    strokeWidth="4" strokeLinecap="round" />
            {/* bottom: expansion → evaporator (cold mist) */}
            <line x1="320" y1="220" x2="80"  y2="220" stroke="url(#hv-pipe-cold)"    strokeWidth="4" strokeLinecap="round" />
            {/* left: evaporator → compressor (warming gas) */}
            <line x1="80"  y1="220" x2="80"  y2="60"  stroke="url(#hv-pipe-warming)" strokeWidth="4" strokeLinecap="round" />

            {/* Direction arrows */}
            <Arrow x={195} y={60} dir="right" />
            <Arrow x={320} y={140} dir="down" />
            <Arrow x={205} y={220} dir="left" />
            <Arrow x={80}  y={140} dir="up" />

            {/* 4 stage nodes */}
            <Node id="compressor" cx={80}  cy={60}  isKh={isKh} activeId={active} onHover={setHover} color="#ef4444" labelEn="COMPRESSOR" labelKh="កំប៉ាន់សង្កត់" iconKind="gear" />
            <Node id="condenser"  cx={320} cy={60}  isKh={isKh} activeId={active} onHover={setHover} color="#fb923c" labelEn="CONDENSER"  labelKh="បំប្លែងជារាវ" iconKind="coil-hot" />
            <Node id="expansion"  cx={320} cy={220} isKh={isKh} activeId={active} onHover={setHover} color="#a855f7" labelEn="EXPANSION VALVE" labelKh="សន្ទះពង្រីក" iconKind="valve" />
            <Node id="evaporator" cx={80}  cy={220} isKh={isKh} activeId={active} onHover={setHover} color="#22d3ee" labelEn="EVAPORATOR" labelKh="ឧបករណ៍ហួត" iconKind="coil-cold" />

            {/* Heat-out symbol at condenser */}
            <text x="350" y="55" fontSize="14">🌡️</text>
            <path d="M 340 75 q 5 -8 0 -16" stroke="#fb923c" fill="none" strokeWidth="1.2" className="hv-airflow" />
            <path d="M 350 75 q 5 -8 0 -16" stroke="#fb923c" fill="none" strokeWidth="1.2" className="hv-airflow" />
            <path d="M 360 75 q 5 -8 0 -16" stroke="#fb923c" fill="none" strokeWidth="1.2" className="hv-airflow" />
            <text x="355" y="92" fontSize="7" fill="#fb923c" textAnchor="middle">{isKh ? "កំដៅចេញ" : "heat out"}</text>

            {/* Heat-in symbol at evaporator */}
            <text x="35" y="225" fontSize="14">❄️</text>
            <path d="M 30 215 q 5 -8 0 -16" stroke="#67e8f9" fill="none" strokeWidth="1.2" className="hv-airflow" />
            <path d="M 40 215 q 5 -8 0 -16" stroke="#67e8f9" fill="none" strokeWidth="1.2" className="hv-airflow" />
            <path d="M 50 215 q 5 -8 0 -16" stroke="#67e8f9" fill="none" strokeWidth="1.2" className="hv-airflow" />
            <text x="42" y="252" fontSize="7" fill="#67e8f9" textAnchor="middle">{isKh ? "កំដៅពីបន្ទប់" : "heat from room"}</text>

            {/* 4 animated refrigerant dots traveling around the loop */}
            {[0, 0.25, 0.5, 0.75].map((delay, i) => (
              <circle
                key={i}
                r="5"
                fill="#facc15"
                className="hv-refrig-dot"
                style={{
                  offsetPath: `path('${loopPath}')`,
                  offsetRotate: "auto",
                  animation: `hv-cycle 8s linear infinite`,
                  animationDelay: `-${delay * 8}s`,
                  filter: "drop-shadow(0 0 4px rgba(250,204,21,0.9))",
                } as React.CSSProperties}
              />
            ))}

            {/* Refrigerant phase labels */}
            <text x="200" y="50" fill="#ef4444" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
              {isKh ? "ឧស្ម័នក្ដៅ" : "HOT GAS"}
            </text>
            <text x="200" y="240" fill="#22d3ee" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
              {isKh ? "អ័ព្ទត្រជាក់" : "COLD MIST"}
            </text>
          </svg>
        </div>

        {/* Refrigerant legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-white/65">
          <LegendDot color="#facc15" label={isKh ? "រូបធាតុត្រជាក់" : "Refrigerant"} />
          <LegendDot color="#ef4444" label={isKh ? "ឧស្ម័នក្ដៅ" : "Hot gas"} />
          <LegendDot color="#a855f7" label={isKh ? "រាវក្ដៅ" : "Warm liquid"} />
          <LegendDot color="#22d3ee" label={isKh ? "ត្រជាក់" : "Cold mist"} />
        </div>
      </div>

      {/* Side panel: stage details */}
      <div className="p-5 lg:border-l border-t lg:border-t-0 border-white/10 bg-black/40">
        <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-2">
          {isKh ? "ដំណាក់កាល" : "Stage"}
        </div>

        <div aria-live="polite">
          <h4 className={`font-display font-bold text-lg text-white mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? STAGE_INFO[active].titleKh : STAGE_INFO[active].titleEn}
          </h4>
          <p className={`text-white/70 text-sm mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? STAGE_INFO[active].kh : STAGE_INFO[active].en}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-[11px]">
          <div className={`text-white/55 mb-1.5 font-bold ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ចុចលើដំណាក់កាលនីមួយៗ៖" : "Click any stage:"}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {(Object.keys(STAGE_INFO) as Stage[]).map((id) => (
              <button
                key={id}
                onClick={() => setHover(id)}
                onMouseEnter={() => setHover(id)}
                aria-pressed={active === id}
                className={`text-left px-2 py-1.5 rounded border text-[10px] transition-colors focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${
                  active === id
                    ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-100"
                    : "border-white/15 bg-white/5 text-white/65 hover:bg-white/10"
                } ${isKh ? "font-khmer" : ""}`}
              >
                {isKh ? STAGE_INFO[id].titleKh : STAGE_INFO[id].titleEn}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-cyan-400/25 bg-cyan-500/5 p-3">
          <p className={`text-cyan-100/85 text-[11px] ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "❄️ ចំណាំ៖ យើងមិនបង្កើតភាពត្រជាក់ទេ — យើង​ផ្លាស់ទី​កំដៅ​ពី​ខាង​ក្នុង​ទៅ​ខាង​ក្រៅ។ ដូច​ការ​ដួសទឹក​ចេញ​ពី​ធុង​មួយ​ទៅ​ធុង​មួយ​ទៀត។"
              : "❄️ Remember: we don't make cold — we move heat from inside to outside. Like scooping water from one bucket into another."}
          </p>
        </div>
      </div>
    </div>
  );
}

function Arrow({ x, y, dir }: { x: number; y: number; dir: "up" | "down" | "left" | "right" }) {
  const rotation = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <polygon points="-5,-5 5,0 -5,5" fill="#facc15" opacity="0.85" />
    </g>
  );
}

function Node({
  id, cx, cy, color, labelEn, labelKh, iconKind, isKh, activeId, onHover,
}: {
  id: Stage; cx: number; cy: number; color: string;
  labelEn: string; labelKh: string;
  iconKind: "gear" | "coil-hot" | "coil-cold" | "valve";
  isKh: boolean; activeId: Stage; onHover: (s: Stage) => void;
}) {
  const isActive = activeId === id;
  const activate = () => onHover(id);
  return (
    <g
      onMouseEnter={activate}
      onFocus={activate}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={isKh ? labelKh : labelEn}
      aria-pressed={isActive}
      style={{ cursor: "pointer", outline: "none" }}
    >
      <circle
        cx={cx} cy={cy} r="22"
        fill="rgba(0,0,0,0.6)"
        stroke={color}
        strokeWidth={isActive ? 3 : 1.5}
        opacity={isActive ? 1 : 0.85}
        style={{ filter: `drop-shadow(0 0 ${isActive ? 10 : 4}px ${color})` }}
      />
      {/* Icon glyphs */}
      {iconKind === "gear" && (
        <g transform={`translate(${cx - 8} ${cy - 8})`}>
          <circle cx="8" cy="8" r="4" fill="none" stroke={color} strokeWidth="1.5" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a} x1="8" y1="2" x2="8" y2="0" transform={`rotate(${a} 8 8)`} stroke={color} strokeWidth="1.5" />
          ))}
        </g>
      )}
      {iconKind === "coil-hot" && (
        <path d={`M ${cx - 10} ${cy - 4} q 5 -8 10 0 q 5 8 10 0`} fill="none" stroke={color} strokeWidth="1.5" />
      )}
      {iconKind === "coil-cold" && (
        <path d={`M ${cx - 10} ${cy - 4} q 5 -8 10 0 q 5 8 10 0`} fill="none" stroke={color} strokeWidth="1.5" />
      )}
      {iconKind === "valve" && (
        <g transform={`translate(${cx} ${cy})`}>
          <polygon points="-7,-6 0,0 -7,6" fill={color} />
          <polygon points="7,-6 0,0 7,6"   fill={color} />
        </g>
      )}
      <text x={cx} y={cy + 38} textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace" fontWeight="bold">
        {isKh ? labelKh : labelEn}
      </text>
    </g>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      <span>{label}</span>
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 2: Heaters (Resistive + Heat Pump)
// ════════════════════════════════════════════════════════════════════════════

function HeatersPanel({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Resistive Heating */}
      <div className="p-5 lg:border-r border-b lg:border-b-0 border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-orange-300" />
          <h4 className={`font-display font-bold text-base text-white ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? "កំដៅដោយការទប់ស្កាត់" : "Resistive Heating"}
          </h4>
          <span className="text-[10px] font-mono text-white/45 ml-auto">
            {isKh ? "ឧ. ភ្លើងភ្នែកមាន់" : "e.g. toaster, electric heater"}
          </span>
        </div>

        <div className="rounded-2xl border border-orange-400/20 bg-black/40 p-4 mb-4">
          <svg viewBox="0 0 280 130" className="w-full h-auto" role="img"
            aria-label={isKh ? "កំដៅដោយការទប់ស្កាត់" : "Resistive heating diagram"}>
            <defs>
              <radialGradient id="hv-coil-glow">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="1" />
                <stop offset="60%" stopColor="#ef4444" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Wires + battery */}
            <line x1="20" y1="65" x2="60" y2="65" stroke="#67e8f9" strokeWidth="2" />
            <line x1="220" y1="65" x2="260" y2="65" stroke="#67e8f9" strokeWidth="2" />
            <rect x="14" y="55" width="6" height="20" fill="#67e8f9" />
            <rect x="260" y="55" width="6" height="20" fill="#67e8f9" />
            <text x="17" y="50" fontSize="8" fill="#67e8f9" textAnchor="middle">+</text>
            <text x="263" y="50" fontSize="8" fill="#67e8f9" textAnchor="middle">−</text>

            {/* Glow halo behind coil */}
            <ellipse cx="140" cy="65" rx="90" ry="35" fill="url(#hv-coil-glow)" className="hv-glow" />

            {/* Resistive coil — wavy resistor */}
            <path d="M 60 65 q 8 -15 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0"
              fill="none" stroke="#ef4444" strokeWidth="3"
              style={{ filter: "drop-shadow(0 0 6px #fb923c)" }} />

            {/* Atoms (obstacles in the resistive material) */}
            {[80, 110, 140, 170, 200].map((x) => (
              <circle key={x} cx={x} cy="65" r="3" fill="#7c2d12" stroke="#fb923c" strokeWidth="0.8" opacity="0.85" />
            ))}

            {/* Animated electrons "colliding" with atoms */}
            {[0, 0.4, 0.8, 1.2].map((d, i) => (
              <circle
                key={i}
                cx="20" cy="65" r="3"
                fill="#67e8f9"
                className="hv-electron"
                style={{ animationDelay: `${d}s`, filter: "drop-shadow(0 0 4px #67e8f9)" }}
              />
            ))}

            {/* Heat radiating off */}
            <text x="100" y="32" fontSize="10">🔥</text>
            <text x="170" y="32" fontSize="10">🔥</text>
            <text x="135" y="115" fontSize="9" fill="#fb923c" textAnchor="middle" fontFamily="monospace">
              {isKh ? "ភាព​ទប់ស្កាត់ ➜ កំដៅ" : "resistance → heat"}
            </text>
          </svg>
        </div>

        <p className={`text-white/70 text-sm mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "អគ្គិសនីត្រូវបានបង្ខំ​ឲ្យ​ឆ្លងកាត់​លោហៈ​ទប់ស្កាត់​ខ្ពស់​មួយ (ដូចជា nichrome)។ អេឡិចត្រុង​ប៉ះ​អាតូម​ខ្លាំងៗ​ដូច​មនុស្ស​ច្រើន​នាក់​ប្រញាប់​ឆ្លង​កាត់​ច្រក​តូច — ការ​កកិត​នោះ​បង្កើត​ជា​កំដៅ និង​ពន្លឺ។"
            : "Electricity is forced through a high-resistance metal (like nichrome). Electrons crash into the atoms hard, like a crowd of people pushing through a narrow doorway — that friction creates both heat and light."}
        </p>

        <div className="rounded-xl border border-orange-400/25 bg-orange-500/5 p-3 text-[11px]">
          <p className={`text-orange-100/85 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "🍞 នេះហើយជា​មូលហេតុ​ដែល​ភ្នែក​មាន់​ភ្លើង​ភ្លឺ​ក្រហម — សូម្បីតែ​អំពូល​ឆ្នេរ​ចាស់ៗ ក៏​ប្រើ​គោលការណ៍​ដូចគ្នា​ដែរ។"
              : "🍞 That red glow inside a toaster — and inside an old-fashioned light bulb — is exactly the same physics."}
          </p>
        </div>
      </div>

      {/* Heat Pump */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="w-4 h-4 text-cyan-300" />
          <h4 className={`font-display font-bold text-base text-white ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? "ម៉ាស៊ីនបូមកំដៅ (Heat Pump)" : "Heat Pump"}
          </h4>
          <span className="text-[10px] font-mono text-white/45 ml-auto">
            {isKh ? "ម៉ាស៊ីនត្រជាក់បញ្ច្រាស់" : "AC, but reversed"}
          </span>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-black/40 p-4 mb-4">
          <svg viewBox="0 0 280 130" className="w-full h-auto" role="img"
            aria-label={isKh ? "ដ្យាក្រាមម៉ាស៊ីនបូមកំដៅ" : "Heat pump diagram"}>
            {/* Outside / Inside split */}
            <rect x="0"   y="0" width="140" height="130" fill="#0e7490" opacity="0.08" />
            <rect x="140" y="0" width="140" height="130" fill="#7c2d12" opacity="0.08" />
            <line x1="140" y1="0" x2="140" y2="130" stroke="#ffffff" strokeOpacity="0.15" strokeDasharray="3 4" />
            <text x="70"  y="14" textAnchor="middle" fontSize="9" fill="#67e8f9" fontFamily="monospace">{isKh ? "ខាងក្រៅ (ត្រជាក់)" : "OUTSIDE (cold)"}</text>
            <text x="210" y="14" textAnchor="middle" fontSize="9" fill="#fb923c" fontFamily="monospace">{isKh ? "ខាងក្នុង (ក្ដៅ)" : "INSIDE (warm)"}</text>

            {/* Houses */}
            <path d="M 30 100 L 50 80 L 70 100 Z" fill="#67e8f9" opacity="0.3" />
            <rect x="35" y="100" width="30" height="20" fill="#67e8f9" opacity="0.3" />
            <path d="M 210 100 L 230 80 L 250 100 Z" fill="#fb923c" opacity="0.4" />
            <rect x="215" y="100" width="30" height="20" fill="#fb923c" opacity="0.4" />

            {/* Heat being pumped from cold outside → warm inside */}
            <path d="M 80 65 Q 140 35 200 65" stroke="#fb923c" strokeWidth="2.5" fill="none" className="hv-airflow"
              style={{ filter: "drop-shadow(0 0 4px #fb923c)" }} />
            <polygon points="195,60 205,65 195,70" fill="#fb923c" />
            <text x="140" y="32" textAnchor="middle" fontSize="9" fill="#fb923c" fontFamily="monospace" fontWeight="bold">
              {isKh ? "កំដៅ ➜ ចូល" : "HEAT IN ➜"}
            </text>

            {/* Snowflakes outside */}
            <text x="20" y="50"  fontSize="10" opacity="0.7">❄</text>
            <text x="100" y="40" fontSize="10" opacity="0.7">❄</text>
            <text x="55" y="65"  fontSize="10" opacity="0.7">❄</text>

            {/* Comfort emoji inside */}
            <text x="220" y="55" fontSize="12">🔥</text>
          </svg>
        </div>

        <p className={`text-white/70 text-sm mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "Heat pump គឺគ្រាន់តែជា​ម៉ាស៊ីន​ត្រជាក់​ដែល​ដំណើរការ​បញ្ច្រាស់​ប៉ុណ្ណោះ! ជំនួស​ឲ្យការ​បម្លាស់​ទី​កំដៅ​ពី​ខាង​ក្នុង​ទៅ​ខាង​ក្រៅ វា​បម្លាស់​ទី​កំដៅ​ពី​ខាង​ក្រៅ​ត្រជាក់​ចូល​ក្នុង​ផ្ទះ​អ្នក។"
            : "A heat pump is just an air conditioner running backwards! Instead of moving heat from inside to outside, it pulls heat from the cold outside air into your house."}
        </p>

        <div className="rounded-xl border border-cyan-400/25 bg-cyan-500/5 p-3 text-[11px]">
          <p className={`text-cyan-100/85 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "♻️ ដោយសារ​វា​«​ផ្លាស់ទី​»​កំដៅ​ជំនួស​ឲ្យ​«​ការ​បង្កើត​»​វា Heat pump អាច​ចំណាយ​ថាមពល​តិច​ជាង​ឧបករណ៍​កំដៅ​ធម្មតា ៣–៤ ដង — ដែល​ល្អ​សម្រាប់​បរិស្ថាន។"
              : "♻️ Because it moves heat instead of creating it, a heat pump can use 3–4 times less electricity than a regular heater — much better for the planet."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 3: Ventilation
// ════════════════════════════════════════════════════════════════════════════

function VentilationRoom({ isKh }: { isKh: boolean }) {
  const [vent, setVent] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] gap-0">
      <div className="p-5">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/50 to-slate-950/70 p-4 overflow-hidden">
          <svg viewBox="0 0 400 240" className="w-full h-auto" role="img"
            aria-label={isKh ? "បន្ទប់រៀនជាមួយការបញ្ចេញខ្យល់" : "Classroom with ventilation"}>
            {/* Room walls */}
            <rect x="20" y="20" width="360" height="200" fill="none" stroke="#67e8f9" strokeWidth="1.5" opacity="0.45" />

            {/* Stale-air vent (top-right) */}
            <rect x="320" y="14" width="40" height="14" fill="#7c2d12" opacity="0.6" />
            <line x1="324" y1="20" x2="356" y2="20" stroke="#fb923c" strokeWidth="1" opacity="0.7" />
            <text x="340" y="11" textAnchor="middle" fontSize="7" fill="#fb923c" fontFamily="monospace">
              {isKh ? "ខ្យល់ចេញ" : "EXHAUST"}
            </text>

            {/* Fresh-air vent (top-left) */}
            <rect x="40" y="14" width="40" height="14" fill="#0e7490" opacity="0.7" />
            <line x1="44" y1="20" x2="76" y2="20" stroke="#67e8f9" strokeWidth="1" opacity="0.7" />
            <text x="60" y="11" textAnchor="middle" fontSize="7" fill="#67e8f9" fontFamily="monospace">
              {isKh ? "ខ្យល់ចូល" : "FRESH"}
            </text>

            {/* Ceiling fan with rotating blades */}
            <circle cx="200" cy="35" r="3" fill="#67e8f9" />
            {vent && (
              <g className="hv-fan" style={{ transformOrigin: "200px 35px" }}>
                <ellipse cx="180" cy="35" rx="18" ry="3" fill="#67e8f9" opacity="0.7" />
                <ellipse cx="220" cy="35" rx="18" ry="3" fill="#67e8f9" opacity="0.7" />
              </g>
            )}

            {/* Curved fan-airflow streamers across the room */}
            {vent && (
              <>
                <path d="M 200 45 Q 280 80 340 130"  stroke="#67e8f9" strokeWidth="1.2" fill="none" className="hv-airflow" opacity="0.6" />
                <path d="M 200 45 Q 120 80 60 130"   stroke="#67e8f9" strokeWidth="1.2" fill="none" className="hv-airflow" opacity="0.6" />
                <path d="M 200 45 Q 200 100 200 160" stroke="#67e8f9" strokeWidth="1.2" fill="none" className="hv-airflow" opacity="0.6" />
              </>
            )}

            {/* People (4 stick figures at desks) */}
            {[80, 160, 240, 320].map((x, i) => (
              <Person key={i} x={x} stale={!vent} />
            ))}
            {/* Desks */}
            {[80, 160, 240, 320].map((x) => (
              <rect key={`desk-${x}`} x={x - 18} y="200" width="36" height="6" fill="#475569" />
            ))}

            {/* CO2 bubbles rising from each person, drifting toward exhaust */}
            {vent && [80, 160, 240, 320].map((x, i) => (
              <g key={`co2-${x}`}>
                <circle cx={x} cy="170" r="4" fill="none" stroke="#fb923c" strokeWidth="1"
                  className="hv-rise" style={{ animationDelay: `${i * 0.6}s` }} />
                <text x={x} y="173" textAnchor="middle" fontSize="5" fill="#fb923c"
                  className="hv-rise" style={{ animationDelay: `${i * 0.6}s` }}>
                  CO₂
                </text>
              </g>
            ))}
            {/* CO₂ buildup if vent OFF — orange tinted overlay */}
            {!vent && (
              <>
                <rect x="22" y="22" width="356" height="196" fill="#fb923c" opacity="0.15" />
                {[80, 160, 240, 320].map((x, i) => (
                  <g key={`stale-${x}`}>
                    {[0, 1, 2].map((j) => (
                      <text key={j} x={x + (j - 1) * 8} y={155 - j * 12} textAnchor="middle" fontSize="6" fill="#fb923c" opacity="0.8">CO₂</text>
                    ))}
                  </g>
                ))}
                <text x="200" y="50" textAnchor="middle" fontSize="11" fill="#fb923c" fontFamily="monospace" fontWeight="bold">
                  ⚠ {isKh ? "ខ្យល់ឆ្អេតៗ" : "STALE AIR"}
                </text>
              </>
            )}

            {/* Fresh O2 drifting in from the left vent */}
            {vent && [0, 1, 2].map((i) => (
              <g key={`o2-${i}`}>
                <circle cx="80" cy={50 + i * 15} r="3.5" fill="none" stroke="#67e8f9" strokeWidth="1"
                  className="hv-drift-in" style={{ animationDelay: `${i * 1}s` }} />
                <text x="80" y={53 + i * 15} fontSize="5" fill="#67e8f9" textAnchor="middle"
                  className="hv-drift-in" style={{ animationDelay: `${i * 1}s` }}>
                  O₂
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Toggle */}
        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={() => setVent((v) => !v)}
            className={`px-4 py-2 rounded-full border text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${
              vent
                ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/25"
                : "border-orange-400/50 bg-orange-500/15 text-orange-100 hover:bg-orange-500/25"
            } ${isKh ? "font-khmer" : ""}`}
            aria-pressed={vent}
            data-testid="ventilation-toggle"
          >
            {vent
              ? (isKh ? "ការបញ្ចេញខ្យល់៖ បើក — បិទដើម្បីមើលអ្វីកើតឡើង" : "Ventilation: ON — turn off to see what happens")
              : (isKh ? "ការបញ្ចេញខ្យល់៖ បិទ — បើកវិញ" : "Ventilation: OFF — turn back on")}
          </button>
        </div>
      </div>

      {/* Side panel */}
      <div className="p-5 lg:border-l border-t lg:border-t-0 border-white/10 bg-black/40">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-cyan-300" />
          <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">
            {isKh ? "ហេតុអ្វីបញ្ចេញខ្យល់សំខាន់?" : "Why ventilation matters"}
          </div>
        </div>

        <p className={`text-white/75 text-sm mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "នៅពេលយើងដកដង្ហើម យើងស្រូបអុកស៊ីហ្សែន (O₂) ហើយបញ្ចេញកាបូនឌីអុកស៊ីត (CO₂)។ ក្នុងបន្ទប់រៀនបិទជិត CO₂ កាន់តែកើនឡើង — ហើយរាងកាយ និងខួរក្បាល​របស់​យើង​ចាប់ផ្ដើម​យឺតៗ។"
            : "When we breathe, we take in oxygen (O₂) and breathe out carbon dioxide (CO₂). In a closed classroom, CO₂ builds up — and our bodies and brains start to slow down."}
        </p>

        <div className="space-y-2.5 text-[11px]">
          <FactRow icon="🧠" labelEn="Concentration drops" labelKh="ការផ្ដោតអារម្មណ៍ធ្លាក់ចុះ"
            valueEn="above ~1000 ppm CO₂" valueKh="ខ្ពស់ជាង ~១០០០ ppm CO₂" isKh={isKh} />
          <FactRow icon="😴" labelEn="Drowsiness, headaches" labelKh="ងងុយដេក ឈឺក្បាល"
            valueEn="above ~1500 ppm CO₂" valueKh="ខ្ពស់ជាង ~១៥០០ ppm CO₂" isKh={isKh} />
          <FactRow icon="🦠" labelEn="Disease spreads faster" labelKh="ជំងឺឆ្លងលឿនជាង"
            valueEn="in stale, recycled air" valueKh="ក្នុងខ្យល់ឆ្អេត ប្រើឡើងវិញ" isKh={isKh} />
        </div>

        <div className="mt-4 rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 p-3">
          <p className={`text-cyan-100/85 text-[11px] ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "✅ ការ​បើក​បង្អួច​មួយ​ភ្លាមៗ​រាល់​មួយ​ម៉ោង — សូម្បីតែ​នៅ​ក្នុង​ថ្ងៃ​ក្ដៅ — ក៏​អាច​បន្ថយ CO₂ យ៉ាង​ច្រើន និង​ជួយ​ឲ្យ​សិស្ស​មាន​ការ​រៀន​សូត្រ​ល្អ​ជាង។"
              : "✅ Opening a window for a few minutes every hour — even on a hot day — drops CO₂ dramatically and helps students learn better."}
          </p>
        </div>
      </div>
    </div>
  );
}

function Person({ x, stale }: { x: number; stale: boolean }) {
  const skin = stale ? "#fb923c" : "#67e8f9";
  return (
    <g opacity={stale ? 0.6 : 1}>
      <circle cx={x} cy="178" r="6" fill={skin} />
      <rect x={x - 5} y="184" width="10" height="14" fill={skin} />
    </g>
  );
}

function FactRow({
  icon, labelEn, labelKh, valueEn, valueKh, isKh,
}: {
  icon: string; labelEn: string; labelKh: string;
  valueEn: string; valueKh: string; isKh: boolean;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-white/5 border border-white/10 px-2.5 py-2">
      <span className="text-base leading-none">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className={`text-white/85 font-bold ${isKh ? "font-khmer" : ""}`}>
          {isKh ? labelKh : labelEn}
        </div>
        <div className={`text-white/50 ${isKh ? "font-khmer" : "font-mono"} text-[10px]`}>
          {isKh ? valueKh : valueEn}
        </div>
      </div>
    </div>
  );
}

