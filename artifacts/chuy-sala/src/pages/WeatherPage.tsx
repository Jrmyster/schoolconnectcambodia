import { useMemo, useState } from "react";
import {
  CloudRain,
  Wind,
  Zap,
  Tornado,
  Thermometer,
  Sun,
  Flame,
  CloudLightning,
  Sparkles,
  Waves,
  Cloud,
  Activity,
  Droplets,
  Sprout,
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
  AlertTriangle,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Weather & Atmospheric Science  •  អាកាសធាតុ និងវិទ្យាសាស្ត្របរិយាកាស
//
//  Self-contained bilingual page (under the Science dropdown, after
//  Oceanography). Four interactive tools, each with its own topical
//  background palette:
//
//   1. Greenhouse Effect & Climate Change — sun rays, IR escape, CO2 trap,
//      "Increase CO2" slider that warms a glowing Earth.
//   2. Fronts & Wind — High→Low pressure flow + cold/warm front collision
//      lifting warm air into a rain cloud.
//   3. Storm Lab — charge separation in a cloud, lightning to ground, an
//      explanation of thunder, plus the rarely-seen red sprite above the
//      cloud tops.
//   4. Extreme Weather — Hurricane (heat engine over warm ocean) and
//      Tornado (rotating column from a thunderstorm) explained side by side.
//
//  Animations are scoped under the `wx-*` keyframe namespace and respect
//  prefers-reduced-motion.
// ════════════════════════════════════════════════════════════════════════════

export default function WeatherPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div
      className="min-h-screen relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(180deg, #0c1a2e 0%, #0a1525 50%, #050a14 100%)",
      }}
    >
      <div className="relative z-10">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <header>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 text-center">
            <div className="inline-flex items-center gap-2 border border-sky-300/25 bg-sky-400/8 rounded-full px-5 py-2 mb-6 text-sm font-semibold text-sky-200/85 backdrop-blur-sm">
              <CloudRain className="w-4 h-4" />
              {isKh ? "វិទ្យាសាស្ត្របរិយាកាស" : "Atmospheric Science"}
            </div>

            <h1
              className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight ${
                isKh ? "font-khmer leading-loose" : ""
              }`}
            >
              {isKh ? (
                <>
                  អាកាសធាតុ និងវិទ្យាសាស្ត្រ
                  <span className="text-sky-300">បរិយាកាស</span>
                </>
              ) : (
                <>
                  Weather &{" "}
                  <span className="text-sky-300">Atmospheric Science</span>
                </>
              )}
            </h1>
            <p
              className={`text-white/55 max-w-2xl mx-auto leading-relaxed ${
                isKh ? "font-khmer text-base leading-loose" : "text-base"
              }`}
            >
              {isKh
                ? "ខ្យល់ ភ្លៀង រន្ទះ ខ្យល់ព្យុះ និងខ្យល់ព្យុះក្រឡុក — ទាំងអស់នេះគឺជាសាច់រឿងតែមួយអំពីពន្លឺថ្ងៃ ទឹក និងការផ្លាស់ប្ដូរសីតុណ្ហភាព។ មកនិយាយអំពីរបៀបដែលផែនដីដកដង្ហើម។"
                : "Wind, rain, lightning, hurricanes, tornadoes — they are all one big story about sunlight, water, and changes in temperature. Let's look at how the planet breathes."}
            </p>
          </div>
        </header>

        {/* ── Tool 1: Greenhouse Effect ──────────────────────────── */}
        <Section
          icon={<Thermometer className="w-3.5 h-3.5" />}
          en="Greenhouse Effect & Climate Change"
          kh="ឥទ្ធិពលផ្ទះកញ្ចក់ និងការប្រែប្រួលអាកាសធាតុ"
          descEn="Without greenhouse gases the Earth would be a frozen rock. With too much of them, it overheats. Slide the CO₂ control and see what changes."
          descKh="បើគ្មានឧស្ម័នផ្ទះកញ្ចក់ផែនដីនឹងជាដុំថ្មទឹកកក។ បើមានច្រើនពេក វាក្ដៅជ្រុល។ ផ្លាស់ប្ដូរបរិមាណ CO₂ ហើយមើលអ្វីដែលផ្លាស់ប្ដូរ។"
          isKh={isKh}
          bgClass="from-sky-950/40 via-sky-900/10 to-orange-950/20"
        >
          <GreenhouseEffectSim isKh={isKh} />
        </Section>

        {/* ── Tool 1b: The Ocean's Pulse — El Niño & La Niña ────── */}
        <Section
          icon={<Activity className="w-3.5 h-3.5" />}
          en="The Ocean's Pulse: El Niño & La Niña"
          kh="ចង្វាក់បេះដូងមហាសមុទ្រ៖ អែលនីណូ និងឡានីណា"
          descEn="Half a world away, deep in the Pacific Ocean, a slow giant breathes in and out every few years. When it inhales, Cambodia's fields dry up. When it exhales, our rivers overflow. The whole story is wind, warm water, and the long arm of the Pacific reaching across to us."
          descKh="នៅឆ្ងាយពាក់កណ្ដាលផែនដី នៅបាតមហាសមុទ្រប៉ាស៊ីហ្វិក យក្សយឺតមួយដកដង្ហើមចេញចូលរៀងរាល់ពីរបីឆ្នាំម្ដង។ ពេលវាស្រូបចូល ស្រែចម្ការកម្ពុជាស្ងួត។ ពេលវាដកចេញ ទន្លេយើងហៀរលើច។ សាច់រឿងទាំងមូល គឺខ្យល់ ទឹកក្ដៅ និងដៃវែងនៃមហាសមុទ្រប៉ាស៊ីហ្វិកដែលឈោងមកដល់យើង។"
          isKh={isKh}
          bgClass="from-sky-950/40 via-slate-900/30 to-rose-950/20"
        >
          <OceansPulseENSO isKh={isKh} />
        </Section>

        {/* ── Tool 2: Fronts & Wind ──────────────────────────────── */}
        <Section
          icon={<Wind className="w-3.5 h-3.5" />}
          en="Wind, Pressure & Weather Fronts"
          kh="ខ្យល់ សម្ពាធ និងផ្ទៃខ្យល់"
          descEn="The atmosphere is always trying to balance itself. Air rushes from cold heavy regions toward warm light regions — that rushing air is what we call wind. When two giant air masses crash into each other, we get fronts, clouds, and rain."
          descKh="បរិយាកាសតែងតែព្យាយាមសមតុល្យខ្លួនឯង។ ខ្យល់ហូរពីតំបន់ត្រជាក់និងធ្ងន់ ទៅតំបន់ក្ដៅនិងស្រាល — ខ្យល់ហូរនោះហើយដែលយើងហៅថាខ្យល់។ ពេលផ្ទៃខ្យល់ធំៗប៉ះគ្នា យើងបានផ្ទៃខ្យល់ ពពក និងភ្លៀង។"
          isKh={isKh}
          bgClass="from-sky-700/25 via-sky-600/10 to-sky-900/30"
        >
          <FrontsAndWind isKh={isKh} />
        </Section>

        {/* ── Tool 3: Storm Lab ───────────────────────────────────── */}
        <Section
          icon={<Zap className="w-3.5 h-3.5" />}
          en="The Storm Lab: Thunder, Lightning & Sprites"
          kh="មន្ទីរពិសោធន៍ខ្យល់ព្យុះ៖ រន្ទះ ផ្គរ និង Sprites"
          descEn="Inside a thundercloud, billions of ice crystals rub against each other and build up huge static charges. When the difference is too big to hold, lightning fires — and the air it cuts through explodes into a sound we call thunder."
          descKh="នៅខាងក្នុងពពករន្ទះ គ្រាប់ទឹកកករាប់ពាន់លានគ្រាប់កកិតគ្នា ហើយបង្កើតបាននូវបន្ទុកស្តាទិចដ៏ធំ។ ពេលផលដាច់គ្នាខ្លាំងពេក រន្ទះបាញ់ — ហើយខ្យល់ដែលវាកាត់ផ្ទុះជាសំឡេងដែលយើងហៅថាផ្គរ។"
          isKh={isKh}
          bgClass="from-slate-900/60 via-indigo-950/40 to-slate-900/60"
        >
          <StormLab isKh={isKh} />
        </Section>

        {/* ── Tool 4: Extreme Weather ────────────────────────────── */}
        <Section
          icon={<Tornado className="w-3.5 h-3.5" />}
          en="Extreme Weather: Hurricanes & Tornadoes"
          kh="អាកាសធាតុធ្ងន់ធ្ងរ៖ ខ្យល់ព្យុះធំ និងខ្យល់ព្យុះក្រឡុក"
          descEn="When a small storm gets the right ingredients — heat, water, spin — it can grow into something much, much bigger. These are the two giants."
          descKh="ពេលខ្យល់ព្យុះតូចមួយរកធាតុផ្សំត្រឹមត្រូវ — កំដៅ ទឹក និងការវិល — វាអាចលូតលាស់ទៅជាអ្វីមួយធំៗ។ នេះគឺជាយក្សពីរ។"
          isKh={isKh}
          bgClass="from-slate-900/50 via-rose-950/30 to-slate-950/60"
        >
          <ExtremeWeather isKh={isKh} />
        </Section>

        {/* ── Closing strip ───────────────────────────────────────── */}
        <div className="border-t border-white/10 bg-white/3 mt-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
            <Cloud className="w-8 h-8 text-sky-300/60 mx-auto mb-3" />
            <p
              className={`text-white/45 text-sm max-w-md mx-auto ${
                isKh ? "font-khmer leading-loose" : ""
              }`}
            >
              {isKh
                ? "កម្ពុជាមានរដូវវស្សា ខ្យល់មូសុង និងខ្យល់ព្យុះត្រូពិច។ ការយល់ដឹងពីបរិយាកាសរបស់យើង គឺជាជំហានទីមួយក្នុងការការពារស្រែ ភូមិ និងគ្រួសាររបស់អ្នក។"
                : "Cambodia has monsoon seasons, tropical storms, and a changing climate. Understanding our atmosphere is the first step to protecting our fields, our villages, and our families."}
            </p>
          </div>
        </div>
      </div>

      {/* Scoped CSS keyframes — all prefixed `wx-` */}
      <style>{`
        @keyframes wx-sun-ray {
          0%   { offset-distance: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes wx-ir-escape {
          0%   { offset-distance: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes wx-ir-bounce {
          0%   { offset-distance: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes wx-wind-flow {
          0%   { transform: translateX(-30px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(220px); opacity: 0; }
        }
        @keyframes wx-rain-drop {
          0%   { transform: translateY(-10px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(60px); opacity: 0; }
        }
        @keyframes wx-cloud-rise {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        @keyframes wx-charge-jiggle {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(2px, -1px); }
          50%      { transform: translate(-1px, 2px); }
          75%      { transform: translate(1px, 1px); }
        }
        @keyframes wx-lightning-flash {
          0%, 92%, 100% { opacity: 0; }
          93%, 94%      { opacity: 1; }
          95%           { opacity: 0.2; }
          96%, 97%      { opacity: 1; }
        }
        @keyframes wx-bg-flash {
          0%, 92%, 100% { opacity: 0; }
          93%, 95%      { opacity: 0.18; }
        }
        @keyframes wx-sprite-pulse {
          0%, 80%, 100% { opacity: 0; transform: scale(0.7); }
          90%, 95%      { opacity: 0.95; transform: scale(1); }
        }
        @keyframes wx-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes wx-tornado-sway {
          0%, 100% { transform: skewX(-3deg); }
          50%      { transform: skewX(3deg); }
        }

        .wx-sun-ray-1   { offset-path: path('M 60 30 L 240 250'); animation: wx-sun-ray 3.2s linear infinite; }
        .wx-sun-ray-2   { offset-path: path('M 130 30 L 280 250'); animation: wx-sun-ray 3.2s linear infinite; }
        .wx-sun-ray-3   { offset-path: path('M 200 30 L 320 250'); animation: wx-sun-ray 3.2s linear infinite; }
        .wx-ir-escape   { offset-path: path('M 270 250 L 380 30'); animation: wx-ir-escape 3.0s linear infinite; }
        .wx-ir-bounce-1 { offset-path: path('M 290 250 Q 340 180 300 220 Q 260 250 285 250'); animation: wx-ir-bounce 2.6s linear infinite; }
        .wx-ir-bounce-2 { offset-path: path('M 320 250 Q 380 170 340 215 Q 305 250 320 250'); animation: wx-ir-bounce 2.6s linear infinite; }

        .wx-wind-arrow  { animation: wx-wind-flow 2.8s linear infinite; }
        .wx-rain-drop   { animation: wx-rain-drop 1.4s linear infinite; }
        .wx-cloud-rise  { animation: wx-cloud-rise 4s ease-in-out infinite; }
        .wx-charge-jiggle{animation: wx-charge-jiggle 0.8s steps(2) infinite; }
        .wx-lightning   { animation: wx-lightning-flash 4.5s linear infinite; }
        .wx-bg-flash    { animation: wx-bg-flash 4.5s linear infinite; }
        .wx-sprite      { animation: wx-sprite-pulse 4.5s linear infinite; }
        .wx-spin-slow   { animation: wx-spin 14s linear infinite; transform-origin: center; }
        .wx-spin-fast   { animation: wx-spin 2.4s linear infinite; transform-origin: center; }
        .wx-tornado-sway{ animation: wx-tornado-sway 1.6s ease-in-out infinite; transform-origin: top; }

        .wx-range {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 6px; border-radius: 9999px; outline: none;
          background: linear-gradient(90deg, #1e3a8a, #ea580c);
        }
        .wx-range::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 20px; height: 20px; border-radius: 50%;
          background: #fef3c7; border: 2px solid #f97316;
          box-shadow: 0 0 8px rgba(249,115,22,0.8); cursor: pointer;
        }
        .wx-range::-moz-range-thumb {
          width: 20px; height: 20px; border-radius: 50%;
          background: #fef3c7; border: 2px solid #f97316;
          box-shadow: 0 0 8px rgba(249,115,22,0.8); cursor: pointer;
        }
        .wx-range:focus-visible {
          box-shadow: 0 0 0 3px rgba(249,115,22,0.45);
        }

        @media (prefers-reduced-motion: reduce) {
          .wx-sun-ray-1, .wx-sun-ray-2, .wx-sun-ray-3,
          .wx-ir-escape, .wx-ir-bounce-1, .wx-ir-bounce-2,
          .wx-wind-arrow, .wx-rain-drop, .wx-cloud-rise,
          .wx-charge-jiggle, .wx-lightning, .wx-bg-flash, .wx-sprite,
          .wx-spin-slow, .wx-spin-fast, .wx-tornado-sway { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper — each tool gets its own topical background
// ════════════════════════════════════════════════════════════════════════════

function Section({
  icon,
  en,
  kh,
  descEn,
  descKh,
  isKh,
  bgClass,
  children,
}: {
  icon: React.ReactNode;
  en: string;
  kh: string;
  descEn: string;
  descKh: string;
  isKh: boolean;
  bgClass: string;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-lg bg-sky-400/12 border border-sky-400/30 flex items-center justify-center text-sky-300">
          {icon}
        </div>
        <span
          className={`text-xs font-bold tracking-widest text-sky-300 uppercase ${
            isKh ? "font-khmer tracking-normal" : ""
          }`}
        >
          {isKh ? kh : en}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-sky-400/30 to-transparent" />
      </div>

      <p
        className={`text-white/55 text-sm mb-5 max-w-3xl ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? descKh : descEn}
      </p>

      <div
        className={`relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br ${bgClass}`}
      >
        {children}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 1: Greenhouse Effect Simulator
// ════════════════════════════════════════════════════════════════════════════

const CO2_LEVELS = [280, 350, 420, 550, 700]; // ppm — pre-industrial → future
const CO2_TEMP_DELTA = [-0.5, 0, 1.1, 2.2, 3.6]; // °C anomaly above 1900

function GreenhouseEffectSim({ isKh }: { isKh: boolean }) {
  const [level, setLevel] = useState(2); // ~420 ppm = today
  const ppm = CO2_LEVELS[level];
  const dT = CO2_TEMP_DELTA[level];
  const moleculeCount = 4 + level * 4; // 4 → 20 molecules
  const earthGlow = level / 4; // 0..1

  const earthFill = useMemo(() => {
    // Cool blue-green at low levels → angry red-orange at high levels
    const r = Math.round(60 + 195 * earthGlow);
    const g = Math.round(120 - 80 * earthGlow);
    const b = Math.round(160 - 140 * earthGlow);
    return `rgb(${r}, ${g}, ${b})`;
  }, [earthGlow]);

  // Place molecules pseudo-randomly across the atmosphere band
  const molecules = useMemo(() => {
    const items: { x: number; y: number; kind: "CO2" | "CH4" }[] = [];
    let seed = 1;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < moleculeCount; i++) {
      items.push({
        x: 60 + rand() * 360,
        y: 60 + rand() * 130,
        kind: rand() > 0.7 ? "CH4" : "CO2",
      });
    }
    return items;
  }, [moleculeCount]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] gap-0">
      {/* Diagram */}
      <div className="p-4">
        <svg viewBox="0 0 460 290" className="w-full h-auto" role="img"
          aria-label={isKh ? "ផ្ទាំងរូបឥទ្ធិពលផ្ទះកញ្ចក់" : "Greenhouse effect diagram"}>
          <defs>
            <radialGradient id="wx-sun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#fef08a" />
              <stop offset="1" stopColor="#facc15" />
            </radialGradient>
            <linearGradient id="wx-atmo" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#0c4a6e" stopOpacity="0.3" />
              <stop offset="1" stopColor="#0c4a6e" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Atmosphere band */}
          <rect x="40" y="50" width="380" height="200" fill="url(#wx-atmo)" rx="12" />
          {/* Top of atmosphere line */}
          <line x1="40" y1="50" x2="420" y2="50" stroke="#7dd3fc" strokeDasharray="4 4" opacity="0.6" />
          <text x="50" y="44" fill="#bae6fd" fontSize="9" fontFamily="monospace">
            {isKh ? "ដែនបរិយាកាស" : "Top of atmosphere"}
          </text>

          {/* Sun */}
          <circle cx="80" cy="22" r="14" fill="url(#wx-sun)" />
          <text x="80" y="14" fill="#fde047" fontSize="9" fontFamily="monospace" textAnchor="middle">
            {isKh ? "ព្រះអាទិត្យ" : "Sun"}
          </text>

          {/* Sunlight ray paths (visible dashed lines) */}
          <path d="M 60 30 L 240 250"  stroke="#fde68a" strokeWidth="1" strokeDasharray="3 3" opacity="0.45" />
          <path d="M 130 30 L 280 250" stroke="#fde68a" strokeWidth="1" strokeDasharray="3 3" opacity="0.45" />
          <path d="M 200 30 L 320 250" stroke="#fde68a" strokeWidth="1" strokeDasharray="3 3" opacity="0.45" />

          {/* Animated photons riding the rays */}
          {[0, 1.0, 2.0].map((d, i) => (
            <circle key={`r${i}`} r="3" fill="#fde047" className={`wx-sun-ray-${(i % 3) + 1}`} style={{ animationDelay: `${d}s` }} />
          ))}

          {/* IR escape ray (only some heat escapes — visibility shrinks as CO2 rises) */}
          <path d="M 270 250 L 380 30" stroke="#f87171" strokeWidth="1" strokeDasharray="2 4"
                opacity={Math.max(0.15, 0.7 - earthGlow * 0.55)} />
          <circle r="2.5" fill="#f87171" className="wx-ir-escape"
                  style={{ opacity: Math.max(0.2, 1 - earthGlow * 0.7) }} />
          <text x="385" y="40" fill="#fca5a5" fontSize="8" fontFamily="monospace">
            {isKh ? "កំដៅរត់ចេញ" : "Heat escapes"}
          </text>

          {/* Trapped IR bouncing back (gets stronger as CO2 rises) */}
          <path d="M 290 250 Q 340 180 300 220 Q 260 250 285 250" stroke="#f97316" strokeWidth="1"
                strokeDasharray="2 4" opacity={0.25 + earthGlow * 0.55} />
          <path d="M 320 250 Q 380 170 340 215 Q 305 250 320 250" stroke="#f97316" strokeWidth="1"
                strokeDasharray="2 4" opacity={0.25 + earthGlow * 0.55} />
          <circle r="2.5" fill="#f97316" className="wx-ir-bounce-1" style={{ opacity: 0.3 + earthGlow * 0.7 }} />
          <circle r="2.5" fill="#f97316" className="wx-ir-bounce-2" style={{ opacity: 0.3 + earthGlow * 0.7, animationDelay: "1.3s" }} />

          {/* Greenhouse molecules — count grows with the slider */}
          {molecules.map((m, i) => (
            <g key={i} transform={`translate(${m.x} ${m.y})`}>
              {m.kind === "CO2" ? (
                <>
                  <circle r="6" fill="#475569" />
                  <circle cx="-9" cy="0" r="4" fill="#dc2626" />
                  <circle cx="9" cy="0" r="4" fill="#dc2626" />
                  <text x="0" y="14" fill="#fecaca" fontSize="7" textAnchor="middle" fontFamily="monospace">CO₂</text>
                </>
              ) : (
                <>
                  <circle r="5" fill="#0f766e" />
                  <circle cx="-7" cy="-2" r="2.5" fill="#bae6fd" />
                  <circle cx="7" cy="-2" r="2.5" fill="#bae6fd" />
                  <circle cx="0" cy="6" r="2.5" fill="#bae6fd" />
                  <circle cx="0" cy="-7" r="2.5" fill="#bae6fd" />
                  <text x="0" y="16" fill="#a7f3d0" fontSize="7" textAnchor="middle" fontFamily="monospace">CH₄</text>
                </>
              )}
            </g>
          ))}

          {/* Earth surface */}
          <ellipse cx="230" cy="252" rx="180" ry="14" fill={earthFill}
            style={{ filter: `drop-shadow(0 0 ${6 + earthGlow * 18}px rgba(249,115,22,${0.3 + earthGlow * 0.55}))` }} />
          {/* A small mountain + tree silhouette to make it feel like Earth */}
          <polygon points="120,250 150,225 180,250" fill="#1e293b" opacity="0.65" />
          <polygon points="190,250 220,210 250,250" fill="#0f172a" opacity="0.65" />
          <polygon points="260,250 285,228 310,250" fill="#1e293b" opacity="0.65" />
          {/* a tiny pine tree */}
          <polygon points="335,250 342,238 349,250" fill="#0a0a0a" />
          <rect x="340" y="248" width="4" height="4" fill="#0a0a0a" />
        </svg>
      </div>

      {/* Side controls */}
      <div className="p-6 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/30">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="wx-co2" className={`text-sm font-semibold text-white/85 flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              {isKh ? "បរិមាណ CO₂" : "Increase CO₂"}
            </label>
            <span className="text-orange-300 font-mono text-sm font-bold">{ppm} ppm</span>
          </div>
          <input
            id="wx-co2" type="range" min={0} max={4} step={1}
            value={level} onChange={(e) => setLevel(Number(e.target.value))}
            className="wx-range"
            aria-valuetext={`${ppm} ppm`}
            data-testid="greenhouse-co2-slider"
          />
          <div className="flex justify-between mt-1 text-[9px] font-mono text-white/40">
            {CO2_LEVELS.map((v) => <span key={v}>{v}</span>)}
          </div>
          <div className="flex justify-between mt-0.5 text-[9px] text-white/40">
            <span>{isKh ? "១៩០០" : "1900"}</span>
            <span>{isKh ? "បច្ចុប្បន្ន" : "today"}</span>
            <span>{isKh ? "អនាគត" : "future"}</span>
          </div>
        </div>

        <div
          aria-live="polite"
          className="rounded-2xl border border-white/10 bg-black/40 p-4"
          data-testid="greenhouse-readout"
        >
          <h4 className={`font-display font-bold text-white text-sm mb-2 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
            <Thermometer className={`w-4 h-4 ${dT >= 2 ? "text-rose-400" : dT >= 1 ? "text-orange-400" : "text-sky-300"}`} />
            {isKh ? "សីតុណ្ហភាពផែនដី" : "Earth's Temperature"}
            <span className={`ml-auto font-mono text-base ${dT >= 2 ? "text-rose-300" : dT >= 1 ? "text-orange-300" : "text-sky-300"}`}>
              {dT >= 0 ? "+" : ""}{dT.toFixed(1)} °C
            </span>
          </h4>
          <p className={`text-white/70 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {level <= 1
              ? (isKh
                  ? "បរិយាកាសមានសុខភាពល្អ។ ឧស្ម័នផ្ទះកញ្ចក់រក្សាសីតុណ្ហភាពឱ្យសមរម្យសម្រាប់ជីវិត។"
                  : "Healthy atmosphere. Greenhouse gases keep the planet warm enough for life.")
              : level === 2
                ? (isKh
                    ? "កម្រិតបច្ចុប្បន្ន។ យើងបានផ្ទុះ CO₂ ច្រើនជាងធម្មតារួចហើយ — ផែនដីកាន់តែក្ដៅឡើង។"
                    : "Today's level. We've added more CO₂ than nature can clear — the planet is already warming.")
                : (isKh
                    ? "កម្ដៅជាប់នៅក្នុង។ ភ្នំទឹកកករលាយ កម្រិតសមុទ្រឡើង រដូវវស្សាខុសប្លែកពីធម្មតា ហើយខ្យល់ព្យុះកាន់តែខ្លាំង។"
                    : "Heat is trapped inside. Glaciers melt, sea levels rise, monsoons shift, and storms grow stronger.")}
          </p>
        </div>

        <div className="rounded-xl bg-orange-500/8 border border-orange-300/25 p-3">
          <p className={`text-orange-100/85 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "🌍 ឧស្ម័នផ្ទះកញ្ចក់ដូចជាភួយ៖ បន្តិចបន្តួចគឺល្អ ច្រើនពេកធ្វើឱ្យអ្នកចេះញើស។"
              : "🌍 Greenhouse gases are like a blanket: a little is good, too much makes you sweat."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 2: Wind & Fronts
// ════════════════════════════════════════════════════════════════════════════

function FrontsAndWind({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* WIND: H → L */}
      <div className="p-5 border-b md:border-b-0 md:border-r border-white/10">
        <h4 className={`font-display font-bold text-white text-sm mb-3 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
          <Wind className="w-4 h-4 text-sky-300" />
          {isKh ? "របៀបដែលខ្យល់កើតឡើង" : "How Wind is Born"}
        </h4>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4 mb-3">
          <svg viewBox="0 0 260 130" className="w-full h-auto" role="img"
            aria-label={isKh ? "សម្ពាធខ្ពស់ទៅសម្ពាធទាប" : "High to low pressure flow"}>
            {/* High pressure column */}
            <rect x="10" y="20" width="60" height="100" rx="6" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="40" y="14" textAnchor="middle" fill="#bae6fd" fontSize="10" fontWeight="bold">H</text>
            <text x="40" y="65" textAnchor="middle" fill="#bae6fd" fontSize="8" fontFamily="monospace">{isKh ? "ខ្ពស់" : "HIGH"}</text>
            <text x="40" y="80" textAnchor="middle" fill="#bae6fd" fontSize="7">{isKh ? "ត្រជាក់" : "Cold"}</text>
            <text x="40" y="92" textAnchor="middle" fill="#bae6fd" fontSize="7">{isKh ? "ធ្ងន់" : "Heavy"}</text>

            {/* Low pressure column */}
            <rect x="190" y="20" width="60" height="100" rx="6" fill="#7c2d12" stroke="#fdba74" strokeWidth="1.5" />
            <text x="220" y="14" textAnchor="middle" fill="#fed7aa" fontSize="10" fontWeight="bold">L</text>
            <text x="220" y="65" textAnchor="middle" fill="#fed7aa" fontSize="8" fontFamily="monospace">{isKh ? "ទាប" : "LOW"}</text>
            <text x="220" y="80" textAnchor="middle" fill="#fed7aa" fontSize="7">{isKh ? "ក្ដៅ" : "Warm"}</text>
            <text x="220" y="92" textAnchor="middle" fill="#fed7aa" fontSize="7">{isKh ? "ស្រាល" : "Light"}</text>

            {/* Wind arrows H → L */}
            {[35, 60, 85].map((y, i) => (
              <g key={i} className="wx-wind-arrow" style={{ animationDelay: `${i * 0.6}s` }}>
                <line x1="0" y1={y} x2="34" y2={y} stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#wx-arrow)" />
              </g>
            ))}
            <defs>
              <marker id="wx-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#7dd3fc" />
              </marker>
            </defs>

            <text x="130" y="118" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="monospace">
              {isKh ? "ខ្យល់ = ការហូរនៃខ្យល់" : "Wind = air on the move"}
            </text>
          </svg>
        </div>
        <p className={`text-white/70 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ខ្យល់ត្រជាក់ធ្ងន់ជាង ដូច្នេះវាបន្ទាបចុះ ហើយបង្កើតសម្ពាធខ្ពស់។ ខ្យល់ក្ដៅស្រាលជាង វាឡើងលើ ហើយបន្សល់នូវសម្ពាធទាបនៅខាងក្រោម។ ខ្យល់ហូរពីខ្ពស់ទៅទាប — ហើយយើងគ្រាន់តែហៅវាថា «ខ្យល់»។"
            : "Cold air is heavier, so it settles down and creates high pressure. Warm air is lighter, so it rises and leaves low pressure behind. Air rushes from high to low — and we just call that movement \"wind\"."}
        </p>
      </div>

      {/* FRONTS: cold wedge under warm */}
      <div className="p-5">
        <h4 className={`font-display font-bold text-white text-sm mb-3 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
          <CloudRain className="w-4 h-4 text-sky-300" />
          {isKh ? "ផ្ទៃខ្យល់ត្រជាក់ប៉ះផ្ទៃខ្យល់ក្ដៅ" : "When Cold Meets Warm"}
        </h4>

        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-sky-500/15 to-sky-900/10 p-4 mb-3">
          <svg viewBox="0 0 260 160" className="w-full h-auto" role="img"
            aria-label={isKh ? "ផ្ទៃខ្យល់ត្រជាក់ និងផ្ទៃខ្យល់ក្ដៅ" : "Cold and warm front collision"}>

            {/* Sky background */}
            <rect x="0" y="0" width="260" height="120" fill="#0c4a6e" opacity="0.25" />
            {/* Ground */}
            <rect x="0" y="120" width="260" height="40" fill="#1c1917" />

            {/* Cold air wedge (blue, comes from the left, slides UNDER) */}
            <polygon points="0,40 0,120 170,120 100,80 60,60" fill="#1e3a8a" opacity="0.78" />
            <text x="35" y="105" fill="#bae6fd" fontSize="9" fontFamily="monospace">
              {isKh ? "ខ្យល់ត្រជាក់" : "Cold air"}
            </text>
            <text x="35" y="116" fill="#bae6fd" fontSize="7">{isKh ? "(ធ្ងន់)" : "(heavy)"}</text>

            {/* Warm air being lifted up (red, escapes upwards) */}
            <polygon points="100,80 60,60 0,40 0,0 260,0 260,120 170,120" fill="#dc2626" opacity="0.32" />
            <text x="180" y="40" fill="#fca5a5" fontSize="9" fontFamily="monospace">
              {isKh ? "ខ្យល់ក្ដៅឡើងលើ" : "Warm air rises"}
            </text>

            {/* Cloud forming where warm air rises */}
            <g className="wx-cloud-rise">
              <ellipse cx="120" cy="55" rx="36" ry="14" fill="#e2e8f0" />
              <ellipse cx="100" cy="50" rx="20" ry="12" fill="#cbd5e1" />
              <ellipse cx="140" cy="50" rx="22" ry="13" fill="#cbd5e1" />
              <ellipse cx="120" cy="46" rx="22" ry="11" fill="#f1f5f9" />
            </g>

            {/* Rain falling from the cloud */}
            {[100, 110, 120, 130, 140].map((x, i) => (
              <g key={i}>
                <line x1={x} y1="68" x2={x - 2} y2="78" stroke="#7dd3fc" strokeWidth="1.6" className="wx-rain-drop"
                  style={{ animationDelay: `${i * 0.18}s`, animationDuration: "1.4s" }} />
              </g>
            ))}

            {/* Cold front symbol — blue triangles (meteorological convention) */}
            <line x1="0" y1="155" x2="170" y2="155" stroke="#1e3a8a" strokeWidth="2" />
            {[10, 50, 90, 130].map((x, i) => (
              <polygon key={i} points={`${x},155 ${x + 10},155 ${x + 5},147`} fill="#1e3a8a" />
            ))}

            {/* Sun on the warm side */}
            <circle cx="225" cy="20" r="9" fill="#facc15" opacity="0.85" />
          </svg>
        </div>
        <p className={`text-white/70 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ផ្ទៃខ្យល់ត្រជាក់ជារូបរាងឆ្នូតរុញចូលក្រោមផ្ទៃខ្យល់ក្ដៅ ដោយបង្ខំឱ្យវាឡើងលើ។ ពេលខ្យល់ក្ដៅឡើងវាត្រជាក់ ចំហាយទឹកក្នុងវាប្រែទៅជាដំណក់ — បានជាពពកនិងភ្លៀង។"
            : "The cold front pushes in like a wedge under the warm air, forcing it upward. As warm air rises, it cools down, the water vapour inside it condenses into droplets — and that gives us clouds and rain."}
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 3: Storm Lab
// ════════════════════════════════════════════════════════════════════════════

function StormLab({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-0">
      {/* The storm scene */}
      <div className="relative p-4 bg-gradient-to-b from-slate-950 via-indigo-950/60 to-slate-950">
        {/* Background flash */}
        <div className="absolute inset-0 bg-white wx-bg-flash pointer-events-none" aria-hidden />

        <svg viewBox="0 0 400 280" className="w-full h-auto relative" role="img"
          aria-label={isKh ? "រន្ទះ ផ្គរ និង Sprite" : "Lightning, thunder, and sprite"}>
          <defs>
            <linearGradient id="wx-cloud-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#475569" />
              <stop offset="1" stopColor="#1e293b" />
            </linearGradient>
            <radialGradient id="wx-sprite-grad" cx="0.5" cy="0" r="1">
              <stop offset="0" stopColor="#fb7185" stopOpacity="0.95" />
              <stop offset="0.6" stopColor="#dc2626" stopOpacity="0.6" />
              <stop offset="1" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* SPRITE — rare red discharge above the cloud, flashes once per cycle */}
          <g className="wx-sprite" style={{ transformOrigin: "200px 30px" }}>
            <ellipse cx="200" cy="30" rx="36" ry="22" fill="url(#wx-sprite-grad)" />
            {/* tendrils */}
            <line x1="200" y1="42" x2="190" y2="60" stroke="#fb7185" strokeWidth="2" opacity="0.85" />
            <line x1="200" y1="42" x2="210" y2="60" stroke="#fb7185" strokeWidth="2" opacity="0.85" />
            <line x1="200" y1="42" x2="200" y2="62" stroke="#fb7185" strokeWidth="2" opacity="0.85" />
            <text x="240" y="32" fill="#fb7185" fontSize="9" fontFamily="monospace">SPRITE</text>
          </g>

          {/* ── Cloud body ───────────────────────────────────────── */}
          <g>
            <ellipse cx="200" cy="115" rx="120" ry="38" fill="url(#wx-cloud-grad)" />
            <ellipse cx="150" cy="105" rx="55" ry="30" fill="#334155" />
            <ellipse cx="250" cy="105" rx="55" ry="30" fill="#334155" />
            <ellipse cx="200" cy="92" rx="45" ry="25" fill="#475569" />
          </g>

          {/* + charges (top of cloud) */}
          {[
            { x: 150, y: 90 },
            { x: 180, y: 82 },
            { x: 220, y: 80 },
            { x: 250, y: 92 },
            { x: 200, y: 98 },
          ].map((p, i) => (
            <g key={`p${i}`} className="wx-charge-jiggle" style={{ animationDelay: `${i * 0.1}s`, transformOrigin: `${p.x}px ${p.y}px` }}>
              <circle cx={p.x} cy={p.y} r="6" fill="#fde047" stroke="#facc15" strokeWidth="1" />
              <text x={p.x} y={p.y + 3} textAnchor="middle" fill="#7c2d12" fontSize="9" fontWeight="bold">+</text>
            </g>
          ))}

          {/* − charges (bottom of cloud) */}
          {[
            { x: 140, y: 138 },
            { x: 175, y: 142 },
            { x: 210, y: 142 },
            { x: 245, y: 140 },
          ].map((p, i) => (
            <g key={`n${i}`} className="wx-charge-jiggle" style={{ animationDelay: `${0.05 + i * 0.12}s`, transformOrigin: `${p.x}px ${p.y}px` }}>
              <circle cx={p.x} cy={p.y} r="6" fill="#7dd3fc" stroke="#0ea5e9" strokeWidth="1" />
              <text x={p.x} y={p.y + 3.5} textAnchor="middle" fill="#0c4a6e" fontSize="11" fontWeight="bold">−</text>
            </g>
          ))}

          {/* Tiny ice crystals rubbing inside the cloud */}
          {[
            { x: 165, y: 110 }, { x: 200, y: 105 }, { x: 235, y: 110 },
            { x: 180, y: 120 }, { x: 220, y: 122 },
          ].map((p, i) => (
            <polygon key={`ice${i}`} points={`${p.x},${p.y - 3} ${p.x + 3},${p.y} ${p.x},${p.y + 3} ${p.x - 3},${p.y}`}
              fill="#e0f2fe" opacity="0.65" className="wx-charge-jiggle"
              style={{ animationDelay: `${i * 0.07}s`, transformOrigin: `${p.x}px ${p.y}px` }} />
          ))}

          {/* LIGHTNING bolt to ground */}
          <g className="wx-lightning">
            <polyline
              points="200,148 195,170 210,175 200,200 215,205 205,235"
              fill="none" stroke="#fef08a" strokeWidth="3" strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(254,240,138,0.95))" }}
            />
          </g>

          {/* Thunder waves spreading from the lightning ground point */}
          <g className="wx-lightning" style={{ animationDelay: "0.05s" }}>
            <circle cx="205" cy="240" r="18" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.7" />
            <circle cx="205" cy="240" r="32" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.45" />
            <circle cx="205" cy="240" r="48" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.25" />
          </g>

          {/* Ground */}
          <rect x="0" y="240" width="400" height="40" fill="#0a0a0a" />
          {/* A small house */}
          <g transform="translate(80 220)">
            <polygon points="0,20 12,8 24,20" fill="#7c2d12" />
            <rect x="2" y="20" width="20" height="14" fill="#a16207" />
            <rect x="9" y="26" width="6" height="8" fill="#1c1917" />
          </g>
          {/* A tree */}
          <g transform="translate(330 220)">
            <rect x="6" y="18" width="3" height="14" fill="#451a03" />
            <circle cx="7.5" cy="14" r="9" fill="#166534" />
          </g>
        </svg>
      </div>

      {/* Side cards */}
      <div className="p-6 flex flex-col gap-3 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/40">
        <Mini
          icon={<Zap className="w-4 h-4 text-yellow-300" />}
          titleEn="Lightning"
          titleKh="រន្ទះ"
          bodyEn="Inside the cloud, ice crystals smash into each other and steal each other's electrons. Positive charges pile up at the top, negatives at the bottom. When the gap is too big to hold, an enormous spark fires."
          bodyKh="នៅខាងក្នុងពពក គ្រាប់ទឹកកកប៉ះគ្នា ហើយដណ្ដើមអេឡិចត្រុងពីគ្នា។ បន្ទុកវិជ្ជមានកកកុញនៅខាងលើ បន្ទុកអវិជ្ជមាននៅខាងក្រោម។ ពេលគម្លាតធំពេក រន្ទះដ៏ធំបាញ់។"
          isKh={isKh}
          tone="amber"
        />
        <Mini
          icon={<CloudLightning className="w-4 h-4 text-sky-300" />}
          titleEn="Thunder"
          titleKh="ផ្គរ"
          bodyEn="The lightning bolt heats the air around it to ~30,000°C in a single moment — five times hotter than the surface of the Sun. The air explodes outward, and that shockwave is the BOOM you hear."
          bodyKh="រន្ទះបង្កើតកំដៅជុំវិញខ្លួនវាដល់ ៣០,០០០°C ក្នុងមួយវិនាទី — ក្ដៅជាងផ្ទៃព្រះអាទិត្យ៥ដង។ ខ្យល់ផ្ទុះចេញ ហើយរលកសំឡេងនោះហើយ គឺជាសំឡេង BOOM ដែលអ្នកឮ។"
          isKh={isKh}
          tone="sky"
        />
        <Mini
          icon={<Sparkles className="w-4 h-4 text-rose-300" />}
          titleEn="Sprites"
          titleKh="Sprites (រន្ទះក្រហម)"
          bodyEn="Far above thunderstorms — 50 to 90 km up, near the edge of space — quick red flashes called sprites can leap upward into the upper atmosphere. They're rare and most people never see one."
          bodyKh="នៅខ្ពស់ណាស់ពីលើខ្យល់ព្យុះ — ៥០ ដល់ ៩០ គីឡូម៉ែត្រ ជិតគែមលំហ — មានពន្លឺក្រហមលឿនៗហៅថា Sprites ដែលលោតឡើងលើ។ វាកម្រ ហើយមនុស្សភាគច្រើនមិនធ្លាប់ឃើញវាទេ។"
          isKh={isKh}
          tone="rose"
        />
      </div>
    </div>
  );
}

function Mini({
  icon, titleEn, titleKh, bodyEn, bodyKh, isKh, tone,
}: {
  icon: React.ReactNode; titleEn: string; titleKh: string;
  bodyEn: string; bodyKh: string; isKh: boolean;
  tone: "amber" | "sky" | "rose";
}) {
  const toneCls =
    tone === "amber" ? "border-amber-300/30 bg-amber-500/8"
    : tone === "sky" ? "border-sky-300/30 bg-sky-500/8"
    : "border-rose-300/30 bg-rose-500/8";
  return (
    <div className={`rounded-2xl border ${toneCls} p-3.5`}>
      <h5 className={`font-display font-bold text-white text-sm mb-1.5 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
        {icon}
        {isKh ? titleKh : titleEn}
      </h5>
      <p className={`text-white/75 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 4: Extreme Weather — Hurricane + Tornado
// ════════════════════════════════════════════════════════════════════════════

function ExtremeWeather({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* Hurricane */}
      <div className="p-5 border-b md:border-b-0 md:border-r border-white/10">
        <h4 className={`font-display font-bold text-white text-sm mb-3 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
          <Waves className="w-4 h-4 text-sky-300" />
          {isKh ? "ខ្យល់ព្យុះធំ (Typhoon)" : "Hurricane (Typhoon)"}
        </h4>

        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-sky-900/40 to-blue-950/60 p-4 mb-3 aspect-square overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full" role="img"
            aria-label={isKh ? "ទិដ្ឋភាពពីលើនៃខ្យល់ព្យុះធំ" : "Top-down view of a hurricane"}>
            <defs>
              <radialGradient id="wx-hur-grad" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#0c4a6e" stopOpacity="0" />
                <stop offset="0.5" stopColor="#475569" stopOpacity="0.85" />
                <stop offset="1" stopColor="#1e293b" stopOpacity="0.5" />
              </radialGradient>
            </defs>

            {/* Warm ocean below */}
            <rect x="0" y="0" width="200" height="200" fill="#0c4a6e" opacity="0.45" />

            {/* Spinning spiral arms */}
            <g className="wx-spin-slow" style={{ transformOrigin: "100px 100px" }}>
              <circle cx="100" cy="100" r="80" fill="url(#wx-hur-grad)" />
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <path
                  key={a}
                  d="M 100 100 q 30 -10 55 -45 q 8 -12 18 -10"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.55"
                  transform={`rotate(${a} 100 100)`}
                />
              ))}
            </g>

            {/* Eye */}
            <circle cx="100" cy="100" r="14" fill="#0c4a6e" />
            <circle cx="100" cy="100" r="14" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <text x="100" y="103" textAnchor="middle" fill="#e2e8f0" fontSize="7" fontFamily="monospace">
              {isKh ? "ភ្នែក" : "EYE"}
            </text>

            {/* Heat-engine indicator */}
            <text x="10" y="190" fill="#fbbf24" fontSize="8" fontFamily="monospace">
              {isKh ? "🔥 ទឹកសមុទ្រក្ដៅ = ឥន្ធនៈ" : "🔥 Warm sea = fuel"}
            </text>
          </svg>
        </div>
        <p className={`text-white/70 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ខ្យល់ព្យុះធំគឺជាម៉ាស៊ីនកំដៅយក្ស។ វាស្រូបយកថាមពលពីទឹកសមុទ្រក្ដៅ ហើយប្រែវាទៅជាខ្យល់បង្វិលដ៏ខ្លាំង។ វាអាចមានទំហំធំជាងប្រទេសកម្ពុជា ហើយ «ភ្នែក» នៅកណ្តាលគឺស្ងាត់ជាងគេ។"
            : "A hurricane is a giant heat engine. It sucks energy out of warm ocean water and turns it into spinning, screaming wind. It can be wider than Cambodia, and the calmest place is the \"eye\" right at its centre."}
        </p>
        <div className="mt-2 rounded-lg bg-sky-500/10 border border-sky-300/25 px-3 py-2">
          <p className={`text-sky-100/85 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "🌊 នៅអាស៊ីខាងកើត គេហៅខ្យល់ព្យុះនេះថា «Typhoon»។ កម្ពុជារងផលប៉ះពាល់ភាគច្រើនពីខ្យល់ខ្លាំង និងភ្លៀងធ្ងន់របស់វាដែលឆ្លងកាត់វៀតណាម។"
              : "🌊 In East Asia we call them \"typhoons\". Cambodia mostly feels their leftover wind and heavy rain after they cross Vietnam."}
          </p>
        </div>
      </div>

      {/* Tornado */}
      <div className="p-5">
        <h4 className={`font-display font-bold text-white text-sm mb-3 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
          <Tornado className="w-4 h-4 text-rose-300" />
          {isKh ? "ខ្យល់ព្យុះក្រឡុក (Tornado)" : "Tornado"}
        </h4>

        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-700/50 to-emerald-950/40 p-4 mb-3 aspect-square overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full" role="img"
            aria-label={isKh ? "ខ្យល់ព្យុះក្រឡុក" : "Tornado funnel"}>
            {/* Storm cloud at top */}
            <ellipse cx="100" cy="35" rx="80" ry="22" fill="#334155" />
            <ellipse cx="60"  cy="30" rx="40" ry="20" fill="#475569" />
            <ellipse cx="140" cy="30" rx="40" ry="20" fill="#475569" />

            {/* Funnel that sways */}
            <g className="wx-tornado-sway">
              <path d="M 80 50 Q 70 100 60 150 L 110 170 Q 130 110 120 50 Z"
                fill="#64748b" opacity="0.85" />
              {/* Spin lines on the funnel */}
              <path d="M 84 70 Q 100 75 116 70" stroke="#e2e8f0" strokeWidth="1.5" fill="none" opacity="0.7" />
              <path d="M 80 95 Q 100 100 120 95" stroke="#e2e8f0" strokeWidth="1.5" fill="none" opacity="0.7" />
              <path d="M 76 120 Q 100 125 124 120" stroke="#e2e8f0" strokeWidth="1.5" fill="none" opacity="0.7" />
              <path d="M 70 145 Q 100 152 130 145" stroke="#e2e8f0" strokeWidth="1.5" fill="none" opacity="0.7" />
            </g>

            {/* Debris cloud at the base */}
            <ellipse cx="90" cy="172" rx="40" ry="6" fill="#78350f" opacity="0.7" />

            {/* Ground */}
            <rect x="0" y="175" width="200" height="25" fill="#14532d" />
            {/* a little fence post */}
            <rect x="160" y="165" width="2" height="14" fill="#1c1917" />
            <line x1="155" y1="170" x2="170" y2="170" stroke="#1c1917" strokeWidth="1" />
          </svg>
        </div>
        <p className={`text-white/70 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ខ្យល់ព្យុះក្រឡុកគឺជាសសរខ្យល់វិលរង្វិលដ៏ខ្លាំង តូចជាងខ្យល់ព្យុះធំច្រើន ប៉ុន្តែលឿនជាង។ វាកើតពីខ្យល់ព្យុះរន្ទះធំៗ ពេលមានខ្យល់ត្រជាក់នៅខាងលើ ខ្យល់ក្ដៅសើមនៅខាងក្រោម និងខ្យល់ពីផ្នែកផ្សេងគ្នាបង្វិលគ្នាឱ្យកើតការវិល។"
            : "A tornado is a violent rotating column of air, much smaller than a hurricane but much faster. It is born from giant thunderstorms when cold air sits over warm humid air and crosswinds twist them into a spin."}
        </p>
        <div className="mt-2 rounded-lg bg-rose-500/10 border border-rose-300/25 px-3 py-2">
          <p className={`text-rose-100/85 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "💨 ខ្យល់នៅខាងក្នុងអាចលឿនជិត ៥០០ គីឡូម៉ែត្រ/ម៉ោង — លឿនជាងឡានប្រណាំងលើផ្លូវហាយវេច្រើនដង។"
              : "💨 Wind inside can spin close to 500 km/h — several times faster than a race car on a highway."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 1b: The Ocean's Pulse — El Niño & La Niña (ENSO)
//  Three explanatory cards: Normal Engine, El Niño (drought), La Niña (flood),
//  plus a Cambodia-impact footer. No simulation — pure didactic schematic.
// ════════════════════════════════════════════════════════════════════════════

function OceansPulseENSO({ isKh }: { isKh: boolean }) {
  return (
    <div className="p-4 sm:p-6 lg:p-7" data-testid="enso-module">
      {/* Three-card grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ── Card 1: The Normal Engine ───────────────────────────── */}
        <ENSOPhaseCard
          isKh={isKh}
          testId="enso-card-normal"
          phaseLabelEn="Phase · Normal"
          phaseLabelKh="ដំណាក់កាល · ធម្មតា"
          titleEn="The Normal Engine"
          titleKh="ម៉ាស៊ីនអាកាសធាតុធម្មតា"
          accent="sky"
          diagram={<ENSODiagram phase="normal" isKh={isKh} />}
          subBlocks={[
            {
              labelEn: "The Trade Winds",
              labelKh: "ខ្យល់ពាណិជ្ជកម្ម",
              icon: <Wind className="w-3.5 h-3.5" aria-hidden="true" />,
              en: "Normally, strong steady winds called the Trade Winds blow across the Pacific Ocean from South America toward Asia. They never stop, year after year, like a slow river of air.",
              kh: "ជាធម្មតា ខ្យល់ខ្លាំង និងនឹងនរហៅថា ខ្យល់ពាណិជ្ជកម្ម (Trade Winds) បក់ឆ្លងកាត់មហាសមុទ្រប៉ាស៊ីហ្វិក ពីអាមេរិកខាងត្បូងទៅអាស៊ី។ វាមិនឈប់ឡើយ ឆ្នាំហើយឆ្នាំ ដូចជាទន្លេខ្យល់យឺតៗមួយ។",
            },
            {
              labelEn: "The Warm Pool",
              labelKh: "អាងទឹកក្ដៅ",
              icon: <Waves className="w-3.5 h-3.5" aria-hidden="true" />,
              en: "These winds act like a giant broom, slowly pushing the warm surface water of the Pacific toward Southeast Asia. That warm water evaporates into the sky and becomes the heavy, reliable monsoon rains that Cambodia depends on for its rice.",
              kh: "ខ្យល់ទាំងនេះធ្វើដូចអំបោសយក្ស រុញទឹកក្ដៅនៅផ្ទៃខាងលើនៃប៉ាស៊ីហ្វិកយ៉ាងយឺតៗមកអាស៊ីអាគ្នេយ៍។ ទឹកក្ដៅនោះហួតឡើងលើមេឃ ហើយក្លាយជាភ្លៀងមូសុងធ្ងន់ៗ និងទុកចិត្តបាន ដែលកម្ពុជាពឹងផ្អែកសម្រាប់ស្រូវ។",
            },
          ]}
        />

        {/* ── Card 2: El Niño — Drought ───────────────────────────── */}
        <ENSOPhaseCard
          isKh={isKh}
          testId="enso-card-elnino"
          phaseLabelEn="Phase · El Niño"
          phaseLabelKh="ដំណាក់កាល · អែលនីណូ"
          titleEn="El Niño — The Drought Bringer"
          titleKh="អែលនីណូ៖ គ្រោះរាំងស្ងួត"
          accent="amber"
          diagram={<ENSODiagram phase="elnino" isKh={isKh} />}
          subBlocks={[
            {
              labelEn: "The Wind Fails",
              labelKh: "ខ្យល់ចុះខ្សោយ",
              icon: <Wind className="w-3.5 h-3.5" aria-hidden="true" />,
              en: "Every few years, for reasons we still do not fully understand, the Trade Winds suddenly weaken — or stop entirely. The sky's giant broom is put down, and the great push of warm water toward Asia stops.",
              kh: "រៀងរាល់ពីរបីឆ្នាំម្ដង សម្រាប់ហេតុផលដែលយើងនៅមិនទាន់យល់ច្បាស់ ខ្យល់ពាណិជ្ជកម្មចុះខ្សោយភ្លាមៗ — ឬឈប់បក់ទាំងស្រុង។ អំបោសយក្សលើមេឃត្រូវបានដាក់ចុះ ហើយការរុញទឹកក្ដៅធំៗមកអាស៊ីត្រូវបញ្ឈប់។",
            },
            {
              labelEn: "The Slosh Back",
              labelKh: "ការច្រាសត្រឡប់",
              icon: <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />,
              en: "Without the wind holding it back, all that warm water — which had been piled up against Asia for years — slowly sloshes backward across the Pacific toward South America. The storm clouds that lived above it slowly drift away with the water.",
              kh: "ដោយគ្មានខ្យល់ទប់វាទេ ទឹកក្ដៅទាំងអស់នោះ — ដែលបានកកកុញនៅជាប់នឹងអាស៊ីអស់រយៈពេលជាច្រើនឆ្នាំ — ច្រាសត្រឡប់ឆ្លងកាត់មហាសមុទ្រប៉ាស៊ីហ្វិកយ៉ាងយឺតៗ ទៅអាមេរិកខាងត្បូងវិញ។ ពពករន្ទះដែលរស់នៅខាងលើវា ក៏រសាត់ចេញតាមទឹកនោះដែរ។",
            },
            {
              labelEn: "The Impact on Cambodia",
              labelKh: "ឥទ្ធិពលលើកម្ពុជា",
              icon: <Sun className="w-3.5 h-3.5" aria-hidden="true" />,
              en: "Because the warm water and the rain clouds have moved away from us, Southeast Asia is left dry and exposed. We get severe heatwaves, devastating droughts, failing rice crops, and a Tonle Sap that does not rise the way it should — fewer fish, less water for everyone.",
              kh: "ដោយសារទឹកក្ដៅ និងពពកភ្លៀងបានរសាត់ចេញពីយើង អាស៊ីអាគ្នេយ៍ត្រូវនៅសល់ស្ងួត និងគ្មានការការពារ។ យើងទទួលបានរលកកម្ដៅធ្ងន់ធ្ងរ គ្រោះរាំងស្ងួតបំផ្លិចបំផ្លាញ ស្រូវខូច និងទន្លេសាបដែលមិនកើនឡើងតាមរបៀបដែលគួរ — មានត្រីតិច និងទឹកតិចសម្រាប់មនុស្សគ្រប់គ្នា។",
            },
          ]}
        />

        {/* ── Card 3: La Niña — Flood ──────────────────────────── */}
        <ENSOPhaseCard
          isKh={isKh}
          testId="enso-card-lanina"
          phaseLabelEn="Phase · La Niña"
          phaseLabelKh="ដំណាក់កាល · ឡានីណា"
          titleEn="La Niña — The Flood Bringer"
          titleKh="ឡានីណា៖ ទឹកជំនន់"
          accent="indigo"
          diagram={<ENSODiagram phase="lanina" isKh={isKh} />}
          subBlocks={[
            {
              labelEn: "The Overdrive",
              labelKh: "ខ្យល់បក់ខ្លាំងជ្រុល",
              icon: <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />,
              en: "Sometimes the exact opposite happens. The Trade Winds become hyper-aggressive — much stronger than usual. The giant broom sweeps faster, and the warm water is pushed against Asia with extra force.",
              kh: "ពេលខ្លះ រឿងផ្ទុយពិតប្រាកដកើតឡើង។ ខ្យល់ពាណិជ្ជកម្មក្លាយជាគំហុកខ្លាំងក្លា — ខ្លាំងជាងធម្មតាច្រើន។ អំបោសយក្សអូសបោសលឿនជាង ហើយទឹកក្ដៅត្រូវបានរុញមកជាប់នឹងអាស៊ីដោយកម្លាំងបន្ថែម។",
            },
            {
              labelEn: "The Impact on Cambodia",
              labelKh: "ឥទ្ធិពលលើកម្ពុជា",
              icon: <CloudRain className="w-3.5 h-3.5" aria-hidden="true" />,
              en: "All that extra warm water supercharges the evaporation engine. The result is extreme, prolonged monsoon rains, widespread flooding, swollen rivers, and more typhoons spinning out of the sea — homes, roads, and rice paddies all in the water.",
              kh: "ទឹកក្ដៅបន្ថែមទាំងអស់នោះបង្កើនការហួតយ៉ាងខ្លាំងពេក។ លទ្ធផលគឺ ភ្លៀងមូសុងធ្ងន់ និងយូរអង្វែង ទឹកជំនន់រាលដាល ទន្លេហៀរលើច និងខ្យល់ព្យុះត្រូពិច (តៃហ្វុង) កើនឡើងពីសមុទ្រ — ផ្ទះ ផ្លូវ និងស្រែស្រូវ ទាំងអស់ក្នុងទឹក។",
            },
          ]}
        />
      </div>

      {/* Cambodia · Why this matters footer */}
      <div
        className="mt-6 rounded-2xl border border-sky-300/20 bg-gradient-to-r from-sky-950/50 via-slate-900/50 to-rose-950/30 p-4"
        data-testid="enso-cambodia-impact"
      >
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <AlertTriangle
            className="w-4 h-4 text-amber-300/90 flex-shrink-0"
            aria-hidden="true"
          />
          <div
            className={`text-[11px] font-mono uppercase tracking-widest text-amber-200/90 ${
              isKh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {isKh
              ? "សារៈសំខាន់សម្រាប់កម្ពុជា"
              : "Why this matters for Cambodia"}
          </div>
        </div>
        <p
          className={`text-white/75 text-sm ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ស្រែ ទន្លេសាប និងគ្រួសារកសិករនៅកម្ពុជា មិនត្រឹមតែអាស្រ័យលើភ្លៀងនៅទីនេះទេ។ ពួកគេអាស្រ័យលើខ្យល់នៅលើមហាសមុទ្រឆ្ងាយរាប់ពាន់គីឡូម៉ែត្រ។ ការយល់ដឹងពីអែលនីណូ និងឡានីណា គឺជាជំហានដំបូងសម្រាប់ការត្រៀមខ្លួន — ការសន្សំទឹក ការជ្រើសរើសពូជស្រូវ និងការការពារភូមិនៅពេលដែលឆ្នាំបន្ទាប់នាំមកនូវភាពតានតឹង។"
            : "Cambodian rice fields, the Tonle Sap, and farming families do not depend only on the rain that falls here. They depend on winds blowing over an ocean thousands of kilometres away. Understanding El Niño and La Niña is the first step toward preparation — saving water, choosing rice varieties, and protecting villages when the next year brings stress."}
        </p>
      </div>
    </div>
  );
}

// ── ENSO Phase Card ────────────────────────────────────────────────────────

type ENSOAccent = "sky" | "amber" | "indigo";

const ENSO_ACCENT: Record<
  ENSOAccent,
  { border: string; chip: string; chipText: string; title: string; subLabel: string }
> = {
  sky: {
    border: "border-sky-300/25",
    chip: "bg-sky-400/12 border-sky-300/30",
    chipText: "text-sky-200",
    title: "text-sky-100",
    subLabel: "text-sky-300/90",
  },
  amber: {
    border: "border-amber-300/25",
    chip: "bg-amber-400/12 border-amber-300/30",
    chipText: "text-amber-200",
    title: "text-amber-100",
    subLabel: "text-amber-300/90",
  },
  indigo: {
    border: "border-indigo-300/25",
    chip: "bg-indigo-400/12 border-indigo-300/30",
    chipText: "text-indigo-200",
    title: "text-indigo-100",
    subLabel: "text-indigo-300/90",
  },
};

function ENSOPhaseCard({
  isKh,
  testId,
  phaseLabelEn,
  phaseLabelKh,
  titleEn,
  titleKh,
  accent,
  diagram,
  subBlocks,
}: {
  isKh: boolean;
  testId: string;
  phaseLabelEn: string;
  phaseLabelKh: string;
  titleEn: string;
  titleKh: string;
  accent: ENSOAccent;
  diagram: React.ReactNode;
  subBlocks: {
    labelEn: string;
    labelKh: string;
    icon: React.ReactNode;
    en: string;
    kh: string;
  }[];
}) {
  const a = ENSO_ACCENT[accent];
  return (
    <div
      className={`rounded-2xl border ${a.border} bg-slate-950/50 backdrop-blur-sm overflow-hidden flex flex-col`}
      data-testid={testId}
    >
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase ${a.chip} ${a.chipText} ${
              isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
            }`}
          >
            {isKh ? phaseLabelKh : phaseLabelEn}
          </span>
        </div>
        <h3
          className={`text-lg sm:text-xl font-bold leading-tight ${a.title} ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? titleKh : titleEn}
        </h3>
      </div>

      {/* Pacific schematic strip */}
      <div className="px-4">{diagram}</div>

      {/* Sub-blocks */}
      <div className="p-4 pt-3 space-y-3 flex-1">
        {subBlocks.map((sb, i) => (
          <div key={i}>
            <div
              className={`flex items-center gap-1.5 mb-1 text-[11px] font-mono uppercase tracking-widest ${a.subLabel} ${
                isKh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              <span aria-hidden="true">{sb.icon}</span>
              <span>{isKh ? sb.labelKh : sb.labelEn}</span>
            </div>
            <p
              className={`text-white/75 text-sm ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {isKh ? sb.kh : sb.en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ENSO schematic diagram ────────────────────────────────────────────────
//  Tiny didactic strip: [Asia/Cambodia] — Pacific Ocean — [South America]
//  Arrows depict the wind / warm-water direction for each phase.

function ENSODiagram({
  phase,
  isKh,
}: {
  phase: "normal" | "elnino" | "lanina";
  isKh: boolean;
}) {
  const oceanGradient =
    phase === "elnino"
      ? "linear-gradient(90deg, #422006 0%, #78350f 30%, #1e3a8a 70%, #1e40af 100%)"
      : phase === "lanina"
      ? "linear-gradient(90deg, #1e3a8a 0%, #1e40af 25%, #1e3a8a 60%, #312e81 100%)"
      : "linear-gradient(90deg, #1e3a8a 0%, #1e40af 30%, #1d4ed8 60%, #1e3a8a 100%)";

  // Asia weather (left side): rainy normal, drought El Niño, flood La Niña
  const asia =
    phase === "normal" ? (
      <div className="flex items-center gap-1">
        <CloudRain className="w-4 h-4 text-sky-200" aria-hidden="true" />
        <Sprout className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
      </div>
    ) : phase === "elnino" ? (
      <div className="flex items-center gap-1">
        <Sun className="w-4 h-4 text-amber-300" aria-hidden="true" />
        <Flame className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
      </div>
    ) : (
      <div className="flex items-center gap-1">
        <CloudRain className="w-4 h-4 text-indigo-200" aria-hidden="true" />
        <Droplets className="w-3.5 h-3.5 text-sky-300" aria-hidden="true" />
      </div>
    );

  // South America weather (right side)
  const samer =
    phase === "normal" ? (
      <Sun className="w-4 h-4 text-amber-200/70" aria-hidden="true" />
    ) : phase === "elnino" ? (
      <CloudRain className="w-4 h-4 text-sky-200" aria-hidden="true" />
    ) : (
      <Sun className="w-4 h-4 text-amber-300" aria-hidden="true" />
    );

  // Centre arrow group
  const arrows = (() => {
    if (phase === "normal") {
      return (
        <div
          className="flex items-center gap-0.5 text-sky-200"
          aria-label={isKh ? "ខ្យល់ពាណិជ្ជកម្មបក់ទៅអាស៊ី" : "Trade Winds blow toward Asia"}
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
      );
    }
    if (phase === "elnino") {
      return (
        <div
          className="flex items-center gap-0.5 text-amber-300/90"
          aria-label={isKh ? "ខ្យល់ខ្សោយ ទឹកក្ដៅច្រាសត្រឡប់" : "Winds weak, warm water sloshes back"}
        >
          <ArrowLeftRight className="w-4 h-4" aria-hidden="true" />
        </div>
      );
    }
    return (
      <div
        className="flex items-center gap-0.5 text-indigo-200"
        aria-label={isKh ? "ខ្យល់ខ្លាំងជាងធម្មតា" : "Trade Winds in overdrive"}
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
      </div>
    );
  })();

  return (
    <div
      className="rounded-xl border border-white/10 overflow-hidden"
      style={{ background: oceanGradient }}
      data-testid={`enso-diagram-${phase}`}
    >
      <div className="grid grid-cols-3 items-center px-3 py-2 gap-2">
        {/* Asia / Cambodia */}
        <div className="flex flex-col items-start gap-1">
          {asia}
          <div
            className={`text-[10px] font-mono uppercase tracking-widest text-white/80 ${
              isKh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            {isKh ? "អាស៊ី · កម្ពុជា" : "Asia · KH"}
          </div>
        </div>
        {/* Pacific arrows */}
        <div className="flex flex-col items-center gap-1">
          {arrows}
          <div
            className={`text-[10px] font-mono uppercase tracking-widest text-white/65 ${
              isKh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            {isKh ? "ប៉ាស៊ីហ្វិក" : "Pacific"}
          </div>
        </div>
        {/* South America */}
        <div className="flex flex-col items-end gap-1">
          {samer}
          <div
            className={`text-[10px] font-mono uppercase tracking-widest text-white/80 ${
              isKh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            {isKh ? "អាមេរិកខាងត្បូង" : "S. America"}
          </div>
        </div>
      </div>
    </div>
  );
}
