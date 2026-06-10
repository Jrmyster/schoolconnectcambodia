import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CloudRain, Shield, Orbit, ArrowUp, Thermometer, Info } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Icons ─────────────────────────────────────────────────────────────────
const MeteorIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 3L10 14" />
    <path d="M21 3l-4 1-1 4 5-5z" />
    <path d="M14 8l-2 2" />
    <path d="M10 12l-2 2" />
    <path d="M6 16l-2 2" />
  </svg>
);

const AuroraIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 12c4 0 6-4 10-4s6 4 10 4" />
    <path d="M2 16c4 0 6-4 10-4s6 4 10 4" />
    <path d="M2 8c4 0 6-4 10-4s6 4 10 4" />
  </svg>
);

// ── Atmospheric Brackets ──────────────────────────────────────────────────
const LAYERS = [
  { min: 0, max: 16, nameEn: "Troposphere", nameKh: "ស្រទាប់ត្រូតូស្វ៊ែរ", descEn: "Contains all weather systems.", descKh: "មានប្រព័ន្ធអាកាសធាតុទាំងអស់។", icon: CloudRain, tempEn: "15°C to -50°C", bgClass: "bg-sky-500" },
  { min: 16, max: 50, nameEn: "Stratosphere", nameKh: "ស្រទាប់ស្ត្រាតូស្វ៊ែរ", descEn: "Contains the Ozone Layer. Temperature increases with altitude.", descKh: "មានស្រទាប់អូហ្សូន។ សីតុណ្ហភាពកើនឡើងតាមកម្ពស់។", icon: Shield, tempEn: "-50°C to -15°C", bgClass: "bg-blue-700" },
  { min: 50, max: 80, nameEn: "Mesosphere", nameKh: "ស្រទាប់មេសូស្វ៊ែរ", descEn: "Meteors burn up here. Coldest layer.", descKh: "ផ្កាយព្រះគ្រោះឆេះនៅទីនេះ។ ស្រទាប់ដែលត្រជាក់បំផុត។", icon: MeteorIcon, tempEn: "-15°C to -85°C", bgClass: "bg-indigo-900" },
  { min: 80, max: 600, nameEn: "Thermosphere", nameKh: "ស្រទាប់ទែម៉ូស្វ៊ែរ", descEn: "Auroras form here. Extremely hot.", descKh: "ពន្លឺអូរ៉ូរ៉ាកើតឡើងនៅទីនេះ។ ក្តៅខ្លាំងណាស់។", icon: AuroraIcon, tempEn: "up to 1,500°C", bgClass: "bg-violet-950" },
  { min: 600, max: 10000, nameEn: "Exosphere", nameKh: "ស្រទាប់អិចសូស្វ៊ែរ", descEn: "Merges with solar wind. Satellites orbit here.", descKh: "រួមបញ្ចូលគ្នាជាមួយខ្យល់ព្រះអាទិត្យ។ ផ្កាយរណបគោចរនៅទីនេះ។", icon: Orbit, tempEn: "Varies wildly", bgClass: "bg-slate-950" }
];

// Helper to find layer by altitude
const getLayer = (alt: number) => {
  return LAYERS.find(l => alt >= l.min && alt <= l.max) || LAYERS[LAYERS.length - 1];
};

// ── Main Page Component ────────────────────────────────────────────────────
export default function AtmosphericSciencePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 sm:py-12 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Navigation & Header */}
        <div>
          <Link
            href="/geology"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-6 ${
              kh ? "font-khmer" : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Geology Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលភូគព្ភវិទ្យា")}
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/60 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <CloudRain className="w-8 h-8" />
            </div>
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black text-white ${kh ? "font-khmer leading-snug" : "font-display"}`}>
                {t("Atmospheric Science", "វិទ្យាសាស្ត្របរិយាកាស")}
              </h1>
              <p className={`text-slate-400 text-lg mt-2 ${kh ? "font-khmer" : ""}`}>
                {t("Explore the layers of the sky and the ozone time machine.", "ស្វែងយល់ពីស្រទាប់មេឃ និងម៉ាស៊ីនពេលវេលាអូហ្សូន។")}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive 'Atmospheric Elevator' */}
        <AtmosphericElevator t={t} kh={kh} />

        {/* Interactive 'Ozone Hole Time Machine' */}
        <OzoneHoleTimeMachine t={t} kh={kh} />

      </div>
    </div>
  );
}

// ── Atmospheric Elevator Component ──────────────────────────────────────────
function AtmosphericElevator({ t, kh }: { t: any, kh: boolean }) {
  // We use a non-linear scale for the slider: 0 to 100
  const [sliderVal, setSliderVal] = useState(0);

  // Map 0-100 to altitude 0-10000 exponentially so lower layers take up more slider space
  // Equation: altitude = (val/100)^3 * 10000
  // Or simpler piecewise mapping:
  // 0-20: 0-16km
  // 20-40: 16-50km
  // 40-60: 50-80km
  // 60-80: 80-600km
  // 80-100: 600-10000km
  
  const getAltitudeFromSlider = (val: number) => {
    if (val <= 20) return (val / 20) * 16;
    if (val <= 40) return 16 + ((val - 20) / 20) * (50 - 16);
    if (val <= 60) return 50 + ((val - 40) / 20) * (80 - 50);
    if (val <= 80) return 80 + ((val - 60) / 20) * (600 - 80);
    return 600 + ((val - 80) / 20) * (10000 - 600);
  };

  const altitude = getAltitudeFromSlider(sliderVal);
  const currentLayer = getLayer(altitude);
  const Icon = currentLayer.icon;

  return (
    <section className={`rounded-3xl border-2 border-slate-800 shadow-2xl relative overflow-hidden transition-colors duration-1000 ${currentLayer.bgClass}`}>
      {/* Background Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="relative p-6 md:p-10 flex flex-col lg:flex-row gap-10 items-center min-h-[500px]">
        
        {/* Slider Controls */}
        <div className="w-full lg:w-1/3 flex flex-col items-center bg-slate-900/60 p-8 rounded-3xl backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-2 mb-6 text-cyan-300">
            <ArrowUp className="w-6 h-6" />
            <h2 className={`text-2xl font-bold ${kh ? "font-khmer" : ""}`}>
              {t("Atmospheric Elevator", "ជណ្តើរយន្តបរិយាកាស")}
            </h2>
          </div>
          
          <div className="h-64 sm:h-80 w-full flex gap-8 items-center justify-center">
            {/* Vertical Slider */}
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="h-full w-4 appearance-none rounded-full bg-slate-800 border-2 border-slate-700 outline-none cursor-pointer"
              style={{ writingMode: "vertical-lr", direction: "rtl" }}
              aria-label="Altitude"
            />
            <div className="flex flex-col h-full justify-between py-2 text-cyan-200/50 font-mono text-sm font-bold">
              <span>10k km</span>
              <span>600 km</span>
              <span>80 km</span>
              <span>50 km</span>
              <span>16 km</span>
              <span>0 km</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className={`text-slate-400 font-bold uppercase tracking-widest text-sm mb-1 ${kh ? "font-khmer tracking-normal text-base" : ""}`}>
              {t("Current Altitude", "កម្ពស់បច្ចុប្បន្ន")}
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-cyan-300">
              {altitude < 100 ? altitude.toFixed(1) : Math.round(altitude).toLocaleString()} <span className="text-2xl text-cyan-300/50">km</span>
            </div>
          </div>
        </div>

        {/* Visual Readout */}
        <div className="w-full lg:w-2/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700" key={currentLayer.nameEn}>
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center text-white mb-8 shadow-2xl">
              <Icon className="w-12 h-12 sm:w-16 sm:h-16" />
            </div>

            <h3 className={`text-5xl sm:text-[6vw] lg:text-7xl font-black text-white mb-6 drop-shadow-xl ${kh ? "font-khmer leading-snug" : "font-display"}`}>
              {kh ? currentLayer.nameKh : currentLayer.nameEn}
            </h3>

            <p className={`text-xl sm:text-[2vw] lg:text-3xl text-white/90 font-medium leading-relaxed max-w-2xl mb-8 drop-shadow-md ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? currentLayer.descKh : currentLayer.descEn}
            </p>

            <div className={`inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl text-white font-bold text-lg sm:text-[1.5vw] lg:text-xl shadow-lg ${kh ? "font-khmer" : ""}`}>
              <Thermometer className="w-6 h-6 text-orange-400" />
              <span>{currentLayer.tempEn}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// ── Ozone Hole Component ───────────────────────────────────────────────────
function OzoneHoleTimeMachine({ t, kh }: { t: any, kh: boolean }) {
  const years = [1979, 1989, 1999, 2009, 2019];
  const [yearIndex, setYearIndex] = useState(0);
  const currentYear = years[yearIndex];

  // Map year to hole size (relative radius scale 0 to 1)
  // 1979: small, 1989: huge, 1999: very huge, 2009: large but shrinking, 2019: smaller
  const holeSizes: Record<number, number> = {
    1979: 0.2,
    1989: 0.8,
    1999: 1.0,
    2009: 0.7,
    2019: 0.4
  };

  const scale = holeSizes[currentYear];

  return (
    <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl mt-12">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-6 h-6 text-purple-400" />
        <h2 className={`text-2xl sm:text-3xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
          {t("Ozone Hole Time Machine", "ម៉ាស៊ីនពេលវេលាប្រហោងអូហ្សូន")}
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Timeline Slider */}
        <div className="space-y-8">
          <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800">
            <label className={`block text-lg font-bold text-slate-300 mb-6 ${kh ? "font-khmer" : ""}`}>
              {t("Select Year", "ជ្រើសរើសឆ្នាំ")}: <span className="text-purple-400 text-3xl font-black font-mono ml-2">{currentYear}</span>
            </label>
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={yearIndex}
              onChange={(e) => setYearIndex(Number(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              aria-label="Timeline Year"
            />
            <div className="flex justify-between mt-4 text-slate-500 font-mono font-bold text-xs sm:text-sm">
              {years.map(y => (
                <span key={y} className={y === currentYear ? "text-purple-400" : ""}>{y}</span>
              ))}
            </div>
          </div>

          <div className={`bg-purple-950/20 p-6 sm:p-8 rounded-2xl border border-purple-500/30 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <h3 className="text-purple-400 font-bold text-xl sm:text-[1.5vw] mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              {t("The UV Shield", "ខែលការពារកាំរស្មី UV")}
            </h3>
            <p className="text-slate-300 text-lg sm:text-[1.2vw]">
              {t(
                "Ozone (O₃) shields the Earth from harmful UV radiation. In the 1980s, CFC chemicals caused a massive hole over Antarctica. Thanks to a global ban, the layer is slowly regenerating.",
                "អូហ្សូន (O₃) ការពារផែនដីពីកាំរស្មី UV ដែលមានគ្រោះថ្នាក់។ នៅទសវត្សរ៍ឆ្នាំ 1980 សារធាតុគីមី CFC បានបណ្តាលឱ្យមានប្រហោងដ៏ធំមួយនៅតំបន់អង់តាក់ទិក។ ដោយសារតែការហាមឃាត់ទូទាំងពិភពលោក ស្រទាប់នេះកំពុងបង្កើតឡើងវិញយឺតៗ។"
              )}
            </p>
          </div>
        </div>

        {/* Visualizer output */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative w-64 h-64 sm:w-[35vw] sm:h-[35vw] max-w-[400px] max-h-[400px] rounded-full border-4 border-slate-700 bg-sky-600 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
            
            {/* Simplified Antarctica graphic */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 opacity-80" fill="white">
                <path d="M50 15 C 60 15, 75 25, 80 40 C 85 55, 70 80, 50 85 C 30 80, 15 65, 20 40 C 25 20, 40 15, 50 15 Z" />
              </svg>
            </div>
            
            {/* Ozone Hole (Purple/Dark Blue overlay) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-multiply">
              <div 
                className="rounded-full bg-fuchsia-900 blur-xl transition-all duration-1000 ease-in-out"
                style={{
                  width: `${scale * 100}%`,
                  height: `${scale * 100}%`,
                  opacity: 0.8 + (scale * 0.2) // slightly darker when larger
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-multiply">
              <div 
                className="rounded-full bg-blue-950 blur-2xl transition-all duration-1000 ease-in-out"
                style={{
                  width: `${scale * 120}%`,
                  height: `${scale * 120}%`,
                  opacity: 0.6
                }}
              />
            </div>
            
          </div>
          <div className={`mt-6 text-slate-400 font-bold uppercase tracking-widest text-sm ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Antarctic View (Top-Down)", "ទិដ្ឋភាពអង់តាក់ទិក (មើលពីលើ)")}
          </div>
        </div>

      </div>
    </section>
  );
}
