import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Leaf, Sun, Droplets, Wind, AlertTriangle, Palette } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function PhotosynthesisPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Navigation & Header */}
        <div>
          <Link
            href="/biology"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-6 ${
              kh ? "font-khmer" : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Biology Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលជីវវិទ្យា")}
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border-2 border-emerald-400/60 text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
              <Leaf className="w-8 h-8" />
            </div>
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black text-white ${kh ? "font-khmer leading-snug" : "font-display"}`}>
                {t("Photosynthesis & The Leaf Factory", "រស្មីសំយោគ និងរោងចក្រស្លឹក")}
              </h1>
              <p className={`text-slate-400 text-lg mt-2 ${kh ? "font-khmer" : ""}`}>
                {t("How plants turn sunlight, air, and water into the sugar that powers life on Earth.", "របៀបដែលរុក្ខជាតិបំប្លែងពន្លឺព្រះអាទិត្យ ខ្យល់ និងទឹកទៅជាជាតិស្ករដែលផ្តល់ថាមពលដល់ជីវិតនៅលើផែនដី។")}
              </p>
            </div>
          </div>
        </div>

        {/* Concept Explanation & The Formula */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold text-emerald-400 ${kh ? "font-khmer" : ""}`}>
                {t("Putting Together By Light", "ការដាក់បញ្ចូលគ្នាដោយពន្លឺ")}
              </h2>
              
              <div className="space-y-4">
                <p className={`text-slate-300 text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "The word photosynthesis comes from Greek: 'photo' meaning light, and 'synthesis' meaning putting together. It is the process plants use to make their own food.",
                    "ពាក្យរស្មីសំយោគមកពីភាសាក្រិច៖ 'photo' មានន័យថាពន្លឺ និង 'synthesis' មានន័យថាការដាក់បញ្ចូលគ្នា។ វាគឺជាដំណើរការដែលរុក្ខជាតិប្រើដើម្បីបង្កើតអាហារផ្ទាល់ខ្លួន។"
                  )}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-white font-bold text-lg mb-1">{t("Chloroplasts", "ក្លរ៉ូប្លាស")}</h3>
                    <p className={`text-slate-400 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {t("The microscopic 'solar panels' inside plant cells where the reaction happens.", "'ផ្ទាំងសូឡា' មីក្រូទស្សន៍នៅក្នុងកោសិការុក្ខជាតិដែលប្រតិកម្មកើតឡើង។")}
                    </p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h3 className="text-white font-bold text-lg mb-1">{t("Chlorophyll", "ក្លរ៉ូហ្វីល")}</h3>
                    <p className={`text-slate-400 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {t("The green pigment that absorbs light energy to power the factory.", "សារធាតុពណ៌បៃតងដែលស្រូបយកថាមពលពន្លឺដើម្បីផ្តល់ថាមពលដល់រោងចក្រ។")}
                    </p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 sm:col-span-2">
                    <h3 className="text-white font-bold text-lg mb-1">{t("Stomata", "ស្តូម៉ាត")}</h3>
                    <p className={`text-slate-400 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {t("Tiny mouths on the bottom of the leaf that breathe in Carbon Dioxide and breathe out Oxygen.", "មាត់តូចៗនៅផ្នែកខាងក្រោមនៃស្លឹកដែលដកដង្ហើមចូលកាបូនឌីអុកស៊ីត និងដកដង្ហើមចេញអុកស៊ីសែន។")}
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-4">
                  <p className={`text-emerald-300 text-sm italic ${kh ? "font-khmer leading-loose" : ""}`}>
                    {t(
                      "Historical Fact: In 1779, Jan Ingenhousz discovered that plants only produce oxygen when exposed to light, proving that sunlight is the engine of the process.",
                      "ការពិតប្រវត្តិសាស្ត្រ៖ ក្នុងឆ្នាំ ១៧៧៩ Jan Ingenhousz បានរកឃើញថារុក្ខជាតិបង្កើតអុកស៊ីសែនតែនៅពេលដែលវាត្រូវពន្លឺ ដោយបញ្ជាក់ថាពន្លឺព្រះអាទិត្យគឺជាម៉ាស៊ីននៃដំណើរការនេះ។"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className={`text-2xl font-bold text-emerald-400 ${kh ? "font-khmer" : ""}`}>
                {t("The Chemical Equation", "សមីការគីមី")}
              </h2>
              
              <div className="bg-slate-950 rounded-xl p-6 md:p-8 border border-slate-800 flex flex-col justify-center items-center text-center shadow-inner h-full">
                <div className="text-2xl sm:text-[3vw] lg:text-[2.5vw] text-white overflow-x-auto w-full py-4 px-2">
                  <BlockMath math="6CO_2 + 6H_2O \rightarrow C_6H_{12}O_6 + 6O_2" />
                </div>
                
                {/* Labels */}
                <div className={`mt-6 w-full flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold ${kh ? "font-khmer" : ""}`}>
                  <span className="text-slate-400 px-3 py-1.5 bg-slate-900 rounded-lg whitespace-nowrap">
                    {t("Carbon Dioxide", "កាបូនឌីអុកស៊ីត")}
                  </span>
                  <span className="text-slate-500">+</span>
                  <span className="text-cyan-400 px-3 py-1.5 bg-cyan-950/50 rounded-lg whitespace-nowrap">
                    {t("Water", "ទឹក")}
                  </span>
                  <span className="text-emerald-400 mx-2">→</span>
                  <span className="text-amber-400 px-3 py-1.5 bg-amber-950/50 rounded-lg whitespace-nowrap">
                    {t("Glucose", "គ្លុយកូស")}
                  </span>
                  <span className="text-slate-500">+</span>
                  <span className="text-sky-400 px-3 py-1.5 bg-sky-950/50 rounded-lg whitespace-nowrap">
                    {t("Oxygen", "អុកស៊ីសែន")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive 'Leaf Factory' Simulator */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
              {t("The Leaf Factory Simulator", "ម៉ាស៊ីនក្លែងធ្វើរោងចក្រស្លឹក")}
            </h2>
          </div>

          <LeafFactorySimulator t={t} kh={kh} />
        </section>

        {/* Interactive 'Light Spectrum & Autumn' Visualizer */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <Palette className="w-6 h-6 text-amber-400" />
            <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
              {t("Light Spectrum & Autumn Colors", "វិសាលគមពន្លឺ និងពណ៌សរទរដូវ")}
            </h2>
          </div>

          <LightSpectrumVisualizer t={t} kh={kh} />
        </section>

      </div>
    </div>
  );
}

// ── Leaf Factory Simulator Component ──────────────────────────────────────────
function LeafFactorySimulator({ t, kh }: { t: any, kh: boolean }) {
  const [sunlight, setSunlight] = useState(80);
  const [water, setWater] = useState(80);
  const [co2, setCo2] = useState(80);

  const isHalted = sunlight === 0 || water === 0 || co2 === 0;
  const isOptimal = sunlight > 70 && water > 70 && co2 > 70;

  // Derive animation speeds/intensities
  const rate = isHalted ? 0 : Math.min(sunlight, water, co2) / 100;
  const animDuration = isHalted ? "0s" : `${3 - 2 * rate}s`; // Faster when rate is higher

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      
      {/* Controls */}
      <div className="space-y-8 flex flex-col justify-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-amber-400" />
            <label className={`text-sm font-bold text-slate-300 ${kh ? "font-khmer" : ""}`}>
              {t("Sunlight Intensity (%)", "អាំងតង់ស៊ីតេពន្លឺព្រះអាទិត្យ (%)")}
            </label>
            <span className="ml-auto text-lg font-mono text-white">{sunlight}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sunlight}
            onChange={(e) => setSunlight(Number(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-cyan-400" />
            <label className={`text-sm font-bold text-slate-300 ${kh ? "font-khmer" : ""}`}>
              {t("Water Supply (%)", "ការផ្គត់ផ្គង់ទឹក (%)")}
            </label>
            <span className="ml-auto text-lg font-mono text-white">{water}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={water}
            onChange={(e) => setWater(Number(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-5 h-5 text-slate-400" />
            <label className={`text-sm font-bold text-slate-300 ${kh ? "font-khmer" : ""}`}>
              {t("Carbon Dioxide (%)", "កាបូនឌីអុកស៊ីត (%)")}
            </label>
            <span className="ml-auto text-lg font-mono text-white">{co2}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={co2}
            onChange={(e) => setCo2(Number(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
          />
        </div>

        {isHalted && (
          <div className="bg-rose-500/10 border border-rose-500/50 rounded-xl p-4 flex items-start gap-3 mt-4">
            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className={`text-rose-400 font-bold ${kh ? "font-khmer" : ""}`}>
                {t("Reaction Stopped: Missing Resource", "ប្រតិកម្មបានបញ្ឈប់៖ ខ្វះធនធាន")}
              </h4>
              <p className={`text-sm text-rose-300 mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Photosynthesis requires all three ingredients. If any ingredient is missing, the plant cannot produce glucose.",
                  "រស្មីសំយោគត្រូវការសារធាតុផ្សំទាំងបី។ ប្រសិនបើសារធាតុផ្សំណាមួយបាត់បង់ រុក្ខជាតិមិនអាចផលិតគ្លុយកូសបានទេ។"
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Visualizer */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex items-center justify-center relative overflow-hidden min-h-[400px]">
        {/* SVG Leaf Cross Section logic */}
        <svg viewBox="0 0 400 300" className="w-full h-full max-w-[500px]">
          <defs>
            {/* Sun Rays */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
            
            {/* Animations */}
            <style>
              {`
                @keyframes floatIn {
                  0% { transform: translate(-20px, 20px); opacity: 0; }
                  50% { opacity: 1; }
                  100% { transform: translate(10px, -10px); opacity: 0; }
                }
                @keyframes floatOut {
                  0% { transform: translate(-10px, 10px); opacity: 0; }
                  50% { opacity: 1; }
                  100% { transform: translate(30px, -30px); opacity: 0; }
                }
                @keyframes bubbleUp {
                  0% { transform: translateY(0px) scale(0.5); opacity: 0; }
                  20% { opacity: 1; }
                  100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
                }
                .anim-sun { animation: floatIn ${animDuration} linear infinite; }
                .anim-water { animation: floatIn ${animDuration} linear infinite reverse; }
                .anim-co2 { animation: floatIn ${animDuration} linear infinite; }
                .anim-glucose { animation: floatOut ${animDuration} linear infinite; }
                .anim-oxygen { animation: floatOut ${animDuration} linear infinite reverse; }
              `}
            </style>
          </defs>

          {/* Sun */}
          <circle cx="50" cy="50" r={sunlight / 2} fill="url(#sunGlow)" />
          <circle cx="50" cy="50" r="15" fill="#fbbf24" />

          {/* Leaf Graphic (Simplified cross-section/shape) */}
          <path 
            d="M 150 250 C 150 150, 100 100, 200 80 C 300 100, 350 200, 200 280 C 180 270, 160 260, 150 250 Z" 
            fill={isHalted ? "#3f6212" : "#22c55e"} 
            stroke="#166534" 
            strokeWidth="4" 
            style={{ transition: "fill 1s ease" }}
          />
          {/* Veins */}
          <path d="M 200 280 L 200 80" stroke="#166534" strokeWidth="3" fill="none" />
          <path d="M 200 200 L 250 150" stroke="#166534" strokeWidth="2" fill="none" />
          <path d="M 200 220 L 150 160" stroke="#166534" strokeWidth="2" fill="none" />
          <path d="M 200 140 L 260 110" stroke="#166534" strokeWidth="2" fill="none" />

          {/* Inputs */}
          {!isHalted && (
            <g>
              {/* Sunlight arrows hitting leaf */}
              <g className="anim-sun text-amber-400" transform="translate(80, 70)">
                <path d="M0,0 L20,20" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="5" y="-5" fill="currentColor" fontSize="12" fontWeight="bold">Sunlight</text>
              </g>

              {/* CO2 entering stomata */}
              <g className="anim-co2 text-slate-300" transform="translate(100, 220)">
                <path d="M0,20 L30,-10" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
                <text x="-20" y="30" fill="currentColor" fontSize="12" fontWeight="bold">CO₂</text>
              </g>

              {/* Water entering via veins */}
              <g className="anim-water text-cyan-400" transform="translate(180, 290)">
                <path d="M0,20 L10,-20" stroke="currentColor" strokeWidth="3" />
                <text x="-15" y="35" fill="currentColor" fontSize="12" fontWeight="bold">H₂O</text>
              </g>

              {/* Outputs */}
              {/* Glucose */}
              <g className="anim-glucose text-amber-300" transform="translate(250, 180)">
                <circle cx="20" cy="0" r="10" fill="currentColor" />
                <text x="35" y="4" fill="currentColor" fontSize="12" fontWeight="bold">Glucose</text>
              </g>

              {/* Oxygen escaping */}
              <g className="anim-oxygen text-sky-400" transform="translate(270, 120)">
                <text x="25" y="5" fill="currentColor" fontSize="12" fontWeight="bold">O₂</text>
              </g>

              {/* Extra Bubbles if optimal (Pondweed effect) */}
              {isOptimal && (
                <>
                  <circle cx="290" cy="110" r="4" fill="#38bdf8" style={{ animation: "bubbleUp 1.5s linear infinite" }} />
                  <circle cx="270" cy="90" r="5" fill="#38bdf8" style={{ animation: "bubbleUp 1.8s linear infinite 0.5s" }} />
                  <circle cx="310" cy="130" r="3" fill="#38bdf8" style={{ animation: "bubbleUp 1.2s linear infinite 0.2s" }} />
                  <circle cx="300" cy="80" r="6" fill="#38bdf8" style={{ animation: "bubbleUp 2s linear infinite 0.8s" }} />
                  <circle cx="280" cy="140" r="4" fill="#38bdf8" style={{ animation: "bubbleUp 1.4s linear infinite 0.4s" }} />
                </>
              )}
            </g>
          )}

          {/* Plant "Status" Text inside leaf */}
          <text x="200" y="160" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle" style={{ opacity: isHalted ? 0.3 : 1 }}>
            {isHalted ? "Zzz..." : "Working..."}
          </text>
        </svg>

        {isOptimal && !isHalted && (
          <div className="absolute top-4 right-4 bg-sky-900/50 text-sky-300 px-3 py-1.5 rounded-full text-xs font-bold border border-sky-500/30 shadow-lg animate-pulse">
            {t("Maximum Output! (O₂ Bubbles)", "ទិន្នផលអតិបរមា! (ពពុះអុកស៊ីសែន)")}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Light Spectrum & Autumn Visualizer ─────────────────────────────────────────
function LightSpectrumVisualizer({ t, kh }: { t: any, kh: boolean }) {
  const [hue, setHue] = useState(0); // 0 to 360
  const [autumnMode, setAutumnMode] = useState(false);

  // Map hue to visible colors roughly
  // Red ~0/360, Orange ~30, Yellow ~60, Green ~120, Blue ~240, Violet ~280
  
  let lightType = "";
  let action = "";
  let actionColor = "";

  if (hue < 20 || hue > 330) {
    lightType = t("Red Light", "ពន្លឺពណ៌ក្រហម");
    action = t("Absorbed for Energy", "ស្រូបយកសម្រាប់ថាមពល");
    actionColor = "text-rose-400";
  } else if (hue < 45) {
    lightType = t("Orange Light", "ពន្លឺពណ៌ទឹកក្រូច");
    action = t("Absorbed slightly", "ស្រូបយកបន្តិចបន្តួច");
    actionColor = "text-orange-400";
  } else if (hue < 80) {
    lightType = t("Yellow Light", "ពន្លឺពណ៌លឿង");
    action = t("Mostly Reflected", "ឆ្លុះបញ្ចាំងភាគច្រើន");
    actionColor = "text-yellow-400";
  } else if (hue < 160) {
    lightType = t("Green Light", "ពន្លឺពណ៌បៃតង");
    action = t("Reflected (Why leaves look green!)", "ឆ្លុះបញ្ចាំង (ហេតុអ្វីបានជាស្លឹកមានពណ៌បៃតង!)");
    actionColor = "text-emerald-400";
  } else if (hue < 260) {
    lightType = t("Blue Light", "ពន្លឺពណ៌ខៀវ");
    action = t("Absorbed for Energy", "ស្រូបយកសម្រាប់ថាមពល");
    actionColor = "text-blue-400";
  } else {
    lightType = t("Violet Light", "ពន្លឺពណ៌ស្វាយ");
    action = t("Absorbed for Energy", "ស្រូបយកសម្រាប់ថាមពល");
    actionColor = "text-purple-400";
  }

  // Leaf color logic based on Autumn Mode
  // If Autumn: fade out chlorophyll (green) to reveal carotenoids (yellow/orange/red)
  const leafFill = autumnMode ? "#ea580c" : "#22c55e"; // orange-600 vs green-500

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-8 flex flex-col justify-center">
        
        <div>
          <label className={`text-sm font-bold text-slate-300 block mb-4 ${kh ? "font-khmer" : ""}`}>
            {t("Light Spectrum (Wavelength)", "វិសាលគមពន្លឺ (រលកពន្លឺ)")}
          </label>
          {/* Custom colorful slider track */}
          <div className="relative w-full h-4 rounded-full" style={{ background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet, red)" }}>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {/* Custom thumb */}
            <div 
              className="absolute top-1/2 -mt-3 w-6 h-6 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
              style={{ 
                left: `calc(${(hue / 360) * 100}% - 12px)`,
                backgroundColor: `hsl(${hue}, 100%, 50%)`
              }}
            />
          </div>
        </div>

        <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 shadow-inner text-center">
          <div className={`text-xl font-bold mb-2`} style={{ color: `hsl(${hue}, 100%, 60%)` }}>
            {lightType}
          </div>
          <div className={`text-lg font-black uppercase tracking-wide ${actionColor} ${kh ? "font-khmer normal-case" : ""}`}>
            {action}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`text-white font-bold mb-1 ${kh ? "font-khmer" : ""}`}>
                {t("Autumn Mode", "របៀបសរទរដូវ")}
              </h4>
              <p className={`text-xs text-slate-400 max-w-[250px] ${kh ? "font-khmer leading-loose" : ""}`}>
                {t("Fade the Chlorophyll (green) to reveal the hidden Carotenoids (yellow/orange).", "ធ្វើឱ្យក្លរ៉ូហ្វីល (ពណ៌បៃតង) រសាត់ទៅ ដើម្បីបង្ហាញការ៉ូទីណូអ៊ីត (លឿង/ទឹកក្រូច) ដែលលាក់ទុក។")}
              </p>
            </div>
            {/* Toggle Switch */}
            <button
              onClick={() => setAutumnMode(!autumnMode)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                autumnMode ? "bg-orange-500" : "bg-slate-700"
              }`}
            >
              <span className="sr-only">Toggle Autumn Mode</span>
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  autumnMode ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

      </div>

      <div className="bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-8 relative min-h-[300px]">
        {/* Light Beam shining on leaf */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen transition-colors duration-200"
          style={{ background: `linear-gradient(135deg, hsl(${hue}, 100%, 50%) 0%, transparent 60%)` }}
        />
        
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-[250px] drop-shadow-2xl z-10">
          {/* Detailed Leaf SVG */}
          <path 
            d="M100,10 C100,10 20,80 20,130 C20,180 80,180 100,190 C120,180 180,180 180,130 C180,80 100,10 100,10 Z" 
            fill={leafFill}
            stroke={autumnMode ? "#9a3412" : "#166534"}
            strokeWidth="4"
            style={{ transition: "fill 2s ease, stroke 2s ease" }}
          />
          {/* Veins */}
          <path d="M100,190 L100,20" stroke={autumnMode ? "#c2410c" : "#15803d"} strokeWidth="4" strokeLinecap="round" style={{ transition: "stroke 2s ease" }} />
          <path d="M100,140 L60,100 M100,110 L140,70 M100,160 L130,130 M100,80 L70,50" stroke={autumnMode ? "#c2410c" : "#15803d"} strokeWidth="3" strokeLinecap="round" style={{ transition: "stroke 2s ease" }} />
        </svg>

        {autumnMode && (
          <div className="absolute bottom-4 left-4 bg-orange-950/80 border border-orange-500/30 text-orange-300 px-4 py-2 rounded-xl text-sm max-w-[200px] backdrop-blur-sm shadow-xl animate-in fade-in zoom-in duration-500">
            <strong>{t("Chlorophyll is gone!", "ក្លរ៉ូហ្វីលបានបាត់ទៅហើយ!")}</strong><br/>
            {t("Now you can see the red/orange pigments that were there all along.", "ឥឡូវនេះអ្នកអាចឃើញពណ៌ក្រហម/ទឹកក្រូចដែលមាននៅទីនោះរហូតមក។")}
          </div>
        )}
      </div>
    </div>
  );
}
