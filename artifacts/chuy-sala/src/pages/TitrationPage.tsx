import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  FlaskConical,
  Activity,
  Sparkles,
  RotateCcw,
  BookOpen,
  Info,
  Sliders,
  Play,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import "katex/dist/katex.min.css";

export default function TitrationPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // State variables for the titration simulator
  const [volumeAdded, setVolumeAdded] = useState<number>(0);
  const [flowRate, setFlowRate] = useState<number>(0); // drops per second (0 to 10)
  const [isIndicatorOn, setIsIndicatorOn] = useState<boolean>(false);
  const [endpointVolume, setEndpointVolume] = useState<number>(() => {
    // Generate a randomized endpoint volume between 18.00 and 24.00 mL (with 2 decimal precision)
    return Math.round((18 + Math.random() * 6) * 100) / 100;
  });
  const [singleDropActive, setSingleDropActive] = useState<boolean>(false);
  const [isConcentrationRevealed, setIsConcentrationRevealed] = useState<boolean>(false);

  // Constants
  const acidVolume = 25.0; // 25.0 mL of HCl
  const baseConc = 0.100; // 0.100 M NaOH

  // Calculated Acid Concentration
  // C_acid = (C_base * V_base) / V_acid
  const calculatedAcidConc = (baseConc * endpointVolume) / acidVolume;

  // Visual coordinates calculations for SVG
  const liquidY = 550 - (volumeAdded / 50) * 50; // liquid rises as volume is added
  // Slope of left wall: from x=150 (y=580) to x=225 (y=490)
  // x_L = 225 - (5/6) * (y - 490)
  const xl = 225 - (5 / 6) * (liquidY - 490);
  const xr = 275 + (5 / 6) * (liquidY - 490);

  // Liquid color logic based on added volume and indicator status
  let flaskLiquidColor = "rgba(56, 189, 248, 0.12)"; // colorless
  let flaskLiquidGlow = "";
  let statusText = t(
    "Solution is acidic. Phenolphthalein is colorless.",
    "សូលុយស្យុងជាអាស៊ីត។ ភេណុលផាឡេអ៊ីនគ្មានពណ៌។"
  );
  let statusColorClass = "text-slate-400";

  if (isIndicatorOn) {
    if (volumeAdded >= endpointVolume && volumeAdded <= endpointVolume + 0.5) {
      flaskLiquidColor = "rgba(236, 72, 153, 0.85)"; // bright pink
      flaskLiquidGlow = "drop-shadow-[0_0_15px_#ec4899]";
      statusText = t(
        `Neutralization endpoint reached at ${volumeAdded} mL! Solution turned light pink.`,
        `ដល់ចំណុចសមមូលទីត្រាស់ត្រឹម ${volumeAdded} mL! សូលុយស្យុងប្រែជាពណ៌ផ្កាឈូកស្រាល។`
      );
      statusColorClass = "text-pink-400 font-bold animate-pulse";
    } else if (volumeAdded > endpointVolume + 0.5) {
      flaskLiquidColor = "rgba(134, 25, 143, 0.95)"; // deep magenta
      flaskLiquidGlow = "drop-shadow-[0_0_10px_#86198f]";
      statusText = t(
        `OVERSHOT! Volume is ${volumeAdded} mL. Solution turned a deep, dark magenta.`,
        `លើសចំណុចសមមូលហើយ! មាឌបន្ថែមគឺ ${volumeAdded} mL។ សូលុយស្យុងប្រែជាពណ៌ក្រហមក្រម៉ៅ (ម៉ាជេនតា)។`
      );
      statusColorClass = "text-purple-400 font-bold";
    } else if (volumeAdded >= endpointVolume - 0.2 && volumeAdded < endpointVolume) {
      flaskLiquidColor = "rgba(236, 72, 153, 0.35)"; // faint transient pink
      statusText = t(
        "Faint pink color appears temporarily near the endpoint.",
        "ពណ៌ផ្កាឈូកស្រាលលេចឡើងជាបណ្តោះអាសន្ននៅជិតចំណុចសមមូល។"
      );
      statusColorClass = "text-pink-300/80";
    }
  } else {
    statusText = t(
      "No indicator added. The solution remains colorless.",
      "មិនទាន់បានបន្ថែមសូចនាករគីមីទេ។ សូលុយស្យុងនៅតែគ្មានពណ៌ដដែល។"
    );
  }

  // Refill / Reset simulator
  const handleReset = () => {
    setVolumeAdded(0);
    setFlowRate(0);
    setSingleDropActive(false);
    setIsConcentrationRevealed(false);
    // Randomize endpoint volume on reset
    setEndpointVolume(Math.round((18 + Math.random() * 6) * 100) / 100);
  };

  // Automated flow rate logic
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (flowRate > 0) {
      // 1 drop = 0.05 mL
      // interval ticks every 100ms
      // volume per tick = (flowRate * 0.05) / 10
      const volPerTick = (flowRate * 0.05) / 10;

      interval = setInterval(() => {
        setVolumeAdded((prev) => {
          const next = Math.min(prev + volPerTick, 50.00);
          if (next >= 50.00) {
            setFlowRate(0); // stop flow when empty
          }
          return Math.round(next * 100) / 100;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [flowRate]);

  // Handle single drop addition
  const handleSingleDrop = () => {
    if (volumeAdded >= 50.00) return;
    setVolumeAdded((prev) => Math.min(Math.round((prev + 0.05) * 100) / 100, 50.00));
    setSingleDropActive(true);
  };

  // Reset single drop animation after completion
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (singleDropActive) {
      timer = setTimeout(() => setSingleDropActive(false), 250);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [singleDropActive]);

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background radial matrix glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-[#050b18] to-black pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/chemistry"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>
              {t("Back to Chemistry Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា")}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-pink-400 animate-pulse" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-pink-500 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Titrations (Volumetric Analysis)", "ទីត្រាស់ (ការវិភាគមាឌ)")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block font-mono">
            <span>CHEM-VOL-ANALYSIS</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content Layout */}
      <main className="flex-grow w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-8">
        
        {/* 1. The 'Real-World Science' Standout Panel */}
        <section className="bg-slate-900/60 border-l-4 border-pink-500 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-pink-400" />
            <h2
              className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
              style={{ fontSize: "max(1.5rem, 3.2vw)" }}
            >
              {t("Why Titrations Matter", "ហេតុអ្វីបានជាទីត្រាស់មានសារៈសំខាន់?")}
            </h2>
          </div>
          <p
            className={`text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}
            style={{ fontSize: "max(1rem, 1.8vw)" }}
          >
            {t(
              "Titrations are analytical chemistry techniques used to calculate the exact unknown concentration of a dissolved substance (analyte). By adding a reactant with a perfectly calibrated concentration (titrant) until the chemical reaction is exactly complete, scientists can decipher chemical composition with extreme precision.",
              "ទីត្រាស់គឺជាវិធីសាស្ត្រវិភាគគីមីគណនាស្វែងរកកំហាប់ពិតប្រាកដនៃសារធាតុរលាយដែលមិនស្គាល់ (សារធាតុវិភាគ)។ តាមរយៈការបន្ថែមសារធាតុគីមីដែលមានកំហាប់ដឹងច្បាស់លាស់ (សារធាតុទីត្រាស់) រហូតដល់ប្រតិកម្មគីមីត្រូវបានបញ្ចប់ទាំងស្រុង អ្នកវិទ្យាសាស្ត្រអាចគណនាភាពផ្សំគីមីបានយ៉ាងត្រឹមត្រូវបំផុត។"
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-2">
              <h3 className={`font-bold text-pink-400 ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1rem, 1.6vw)" }}>
                {t("Industrial Quality Control", "ការគ្រប់គ្រងគុណភាពផលិតផល")}
              </h3>
              <p className={`text-slate-400 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Used to monitor levels of acidity in food manufacturing, ensuring carbonated beverages, milk products, and household soaps maintain safe and standard pH ranges.",
                  "ប្រើសម្រាប់ត្រួតពិនិត្យកម្រិតអាស៊ីតក្នុងការផលិតអាហារ ធានាថាភេសជ្ជៈកាបូណាត ផលិតផលទឹកដោះគោ និងសាប៊ូប្រើប្រាស់ក្នុងផ្ទះរក្សាកម្រិត pH ស្តង់ដារមានសុវត្ថិភាព។"
                )}
              </p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-2">
              <h3 className={`font-bold text-pink-400 ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1rem, 1.6vw)" }}>
                {t("Pharmaceutical Impurities", "ការវិភាគភាពមិនបរិសុទ្ធក្នុងឱសថ")}
              </h3>
              <p className={`text-slate-400 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Critical for analyzing active drug ingredients to confirm exact dosage purity and verify that no toxic synthesis sub-products contaminate medication.",
                  "សំខាន់សម្រាប់វិភាគសារធាតុសកម្មក្នុងថ្នាំពេទ្យ ដើម្បីបញ្ជាក់ពីភាពបរិសុទ្ធនៃកម្រិតថ្នាំ និងធានាថាមិនមានសារធាតុពុលបន្ទាប់បន្សំមកលាយឡំនោះទេ។"
                )}
              </p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col gap-2">
              <h3 className={`font-bold text-pink-400 ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1rem, 1.6vw)" }}>
                {t("Environmental Water Testing", "ការធ្វើតេស្តទឹកបរិស្ថាន")}
              </h3>
              <p className={`text-slate-400 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Assesses acidic rain, monitors agricultural run-offs, and measures dissolved chemical and metal concentration in local drinking reservoirs.",
                  "វាស់ស្ទង់ទឹកភ្លៀងអាស៊ីត តាមដានកាកសំណល់គីមីកសិកម្ម និងវាស់កំហាប់សារធាតុរ៉ែ ឬលោហៈរលាយនៅក្នុងអាងស្តុកទឹកផឹកក្នុងស្រុក។"
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Outer Split Container: Visualizer and Calculations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 2. Interactive Virtual Titration (Visualizer Page Left) - Col Span 7 */}
          <section className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-pink-400 font-mono tracking-widest uppercase block mb-1">
                {t("INTERACTIVE VIRTUAL LAB", "ពិសោធន៍បន្ទប់មន្ទីរពិសោធន៍និម្មិត")}
              </span>
              <h2
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.3rem, 2.5vw)" }}
              >
                {t("Acid-Base Titration Visualizer", "ឧបករណ៍បង្ហាញលទ្ធផលទីត្រាស់អាស៊ីត-បាស")}
              </h2>
            </div>

            {/* Experiment Description Prompt & Toggle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-900">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  {t("Analyte Solution (In Flask)", "សារធាតុវិភាគ (ក្នុងកែវកោណ)")}
                </span>
                <span className={`text-xs font-bold text-sky-400 ${isKh ? "font-khmer" : ""}`}>
                  {t("25.0 mL of HCl (Hydrochloric Acid) of Unknown Concentration", "សូលុយស្យុង HCl ២៥.០ mL មិនស្គាល់កំហាប់")}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  {t("Titrant Standard Solution (In Burette)", "សារធាតុទីត្រាស់ស្តង់ដារ (ក្នុងប៊ុយរ៉ែត)")}
                </span>
                <span className={`text-xs font-bold text-amber-400 ${isKh ? "font-khmer" : ""}`}>
                  {t("0.100 M NaOH (Sodium Hydroxide)", "សូលុយស្យុង NaOH ០.១០០ M")}
                </span>
              </div>
            </div>

            {/* The SVG Visualizer Panel */}
            <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-850 p-4 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
              <svg viewBox="0 0 500 600" className="w-full max-w-[420px] h-auto select-none">
                
                {/* Grid Lines for projector reference */}
                <defs>
                  <pattern id="simgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(244,63,94,0.03)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="500" height="600" fill="url(#simgrid)" />

                {/* ── Stand / Clamps ── */}
                <rect x="100" y="50" width="8" height="540" fill="#475569" rx="2" /> {/* Vertical Stand Pole */}
                <rect x="40" y="580" width="160" height="12" fill="#334155" rx="3" /> {/* Base of Stand */}
                {/* Burette Holder Clamps */}
                <rect x="108" y="120" width="134" height="6" fill="#64748b" />
                <rect x="108" y="280" width="134" height="6" fill="#64748b" />
                <circle cx="242" cy="123" r="6" fill="#475569" />
                <circle cx="242" cy="283" r="6" fill="#475569" />

                {/* ── Burette Body ── */}
                {/* Burette Column Tube */}
                <rect x="238" y="40" width="24" height="370" fill="none" stroke="#64748b" strokeWidth="2.5" />
                
                {/* Liquid Inside Burette */}
                {(() => {
                  const buretteLiquidHeight = Math.max(0, 340 - (volumeAdded / 50) * 340);
                  const buretteLiquidY = 60 + (volumeAdded / 50) * 340;
                  return (
                    <rect
                      x="240"
                      y={buretteLiquidY}
                      width="20"
                      height={buretteLiquidHeight}
                      fill="rgba(56, 189, 248, 0.35)"
                      rx="1"
                    />
                  );
                })()}

                {/* Burette Markings (0 mL to 50 mL, readings read downwards) */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const yPos = 60 + i * 34; // 60 to 400
                  const ml = i * 5;
                  return (
                    <g key={i}>
                      <line x1="238" y1={yPos} x2="246" y2={yPos} stroke="#94a3b8" strokeWidth="1.5" />
                      <line x1="256" y1={yPos} x2="262" y2={yPos} stroke="#94a3b8" strokeWidth="1.5" />
                      <text x="270" y={yPos + 3} fill="#64748b" fontSize="8" fontWeight="bold" fontFamily="monospace">
                        {ml}
                      </text>
                    </g>
                  );
                })}

                {/* Stopcock Valve Structure (y=410) */}
                <path d="M 235,410 L 265,410 L 256,428 L 244,428 Z" fill="#64748b" stroke="#475569" strokeWidth="1" />
                
                {/* Nozzle / Tip */}
                <path d="M 246,428 L 254,428 L 251,455 L 249,455 Z" fill="#64748b" />

                {/* Stopcock Rotating Dial (Valve knob) */}
                <g
                  style={{
                    transform: `rotate(${flowRate > 0 ? 90 : 0}deg)`,
                    transformOrigin: "250px 419px",
                    transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/* Rotating Dial Shape */}
                  <rect x="238" y="415" width="24" height="8" rx="2" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
                  <line x1="250" y1="411" x2="250" y2="427" stroke="#fff" strokeWidth="1.5" />
                </g>

                {/* ── Drop Animations ── */}
                {/* Continuous Flowing Drops */}
                {flowRate > 0 && (
                  <circle cx="250" cy="458" r="3" fill="#38bdf8" opacity="0.85">
                    <animate
                      attributeName="cy"
                      from="458"
                      to="515"
                      dur={`${Math.max(0.08, 0.9 / flowRate)}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Single Released Drop */}
                {singleDropActive && (
                  <circle cx="250" cy="458" r="3.5" fill="#38bdf8">
                    <animate
                      attributeName="cy"
                      from="458"
                      to="515"
                      dur="0.25s"
                      fill="freeze"
                    />
                  </circle>
                )}

                {/* ── Conical Flask (y=490 to y=580) ── */}
                {/* Flask Liquid */}
                <polygon
                  points={`${xl},${liquidY} ${xr},${liquidY} 343,576 157,576`}
                  fill={flaskLiquidColor}
                  className={`${flaskLiquidGlow} transition-colors duration-200`}
                />
                
                {/* Flask Glass Outline */}
                {/* neck: x=225 to x=275 at y=490 */}
                {/* base corners: x=150 (left), x=350 (right) at y=580 */}
                <polygon
                  points="225,490 275,490 350,580 150,580"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                {/* Flask Lip */}
                <ellipse cx="250" cy="490" rx="27" ry="4" fill="none" stroke="#94a3b8" strokeWidth="3" />
                {/* Flask Volume Graduations */}
                <line x1="195" y1="535" x2="215" y2="535" stroke="#475569" strokeWidth="1.5" />
                <text x="220" y="538" fill="#475569" fontSize="8" fontWeight="bold" fontFamily="sans-serif">50 mL</text>
                
                <line x1="175" y1="555" x2="200" y2="555" stroke="#475569" strokeWidth="1.5" />
                <text x="205" y="558" fill="#475569" fontSize="8" fontWeight="bold" fontFamily="sans-serif">25 mL</text>

                <text x="250" y="570" fill="rgba(255,255,255,0.12)" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  HCl + Indicator
                </text>
              </svg>

              {/* Digital Titration Status HUD */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-slate-800/80 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3 backdrop-blur-md">
                <div className="flex flex-col gap-0.5 text-center sm:text-left">
                  <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                    {t("TITRATION STATUS", "ស្ថានភាពទីត្រាស់")}
                  </span>
                  <span className={`text-xs ${statusColorClass} ${isKh ? "font-khmer" : ""}`}>
                    {statusText}
                  </span>
                </div>
                <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg font-mono text-center shrink-0">
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider">
                    {t("VOLUME ADDED", "មាឌបានបន្ថែម")}
                  </span>
                  <span className="text-xl font-black text-pink-400">
                    {volumeAdded.toFixed(2)} mL
                  </span>
                </div>
              </div>
            </div>

            {/* Virtual Lab Controllers */}
            <div className="flex flex-col gap-6">
              
              {/* Controls Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Release Drop Controller */}
                <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                      {t("Fine Volumetric Control", "ការគ្រប់គ្រងមាឌលម្អិត")}
                    </span>
                    <p className={`text-[10px] text-slate-500 leading-normal ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t("Release a single precise drop of NaOH standard titrant to carefully approach endpoint.", "បញ្ចេញសារធាតុទីត្រាស់ NaOH មួយតំណក់ច្បាស់លាស់ ដើម្បីខិតជិតចំណុចបញ្ចប់ដោយប្រុងប្រយ័ត្ន។")}
                    </p>
                  </div>
                  <button
                    onClick={handleSingleDrop}
                    disabled={volumeAdded >= 50.00 || flowRate > 0}
                    className="w-full py-3 bg-sky-600/10 border border-sky-500/40 text-sky-400 hover:bg-sky-600/25 disabled:bg-slate-950 disabled:text-slate-700 disabled:border-slate-900 disabled:cursor-not-allowed rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Play className="w-3.5 h-3.5 rotate-90" />
                    <span className={isKh ? "font-khmer" : ""}>{t("Release Drop (0.05 mL)", "បញ្ចេញមួយតំណក់ (០.០៥ mL)")}</span>
                  </button>
                </div>

                {/* 2. Flow Rate Slider Controller */}
                <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                        {t("Burette Stopcock Flow", "ល្បឿនលំហូរក្បាលវ៉ានប៊ុយរ៉ែត")}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-pink-400 bg-pink-950/40 px-1.5 py-0.5 rounded">
                        {flowRate} {t("drops/s", "តំណក់/វិ")}
                      </span>
                    </div>
                    <p className={`text-[10px] text-slate-500 leading-normal ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t("Adjust the burette valve. Open wider for fast flow, close tightly to stop.", "សារ៉េក្បាលវ៉ានប៊ុយរ៉ែត។ បើកកាន់តែធំលំហូរកាន់តែលឿន បិទដើម្បីបញ្ឈប់លំហូរ។")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sliders className="w-4 h-4 text-slate-500 shrink-0" />
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={flowRate}
                      disabled={volumeAdded >= 50.00}
                      onChange={(e) => setFlowRate(Number(e.target.value))}
                      className="w-full accent-pink-500 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* 3. Indicator Toggle Controller */}
                <div className="bg-slate-950/50 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                      {t("Chemical Indicator Switch", "ប៊ូតុងបន្ថែមសូចនាករគីមី")}
                    </span>
                    <p className={`text-[10px] text-slate-500 leading-normal ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t("Toggle the addition of Phenolphthalein indicator inside the HCl conical flask.", "បន្ថែម ឬដកចេញសូចនាករគីមី Phenolphthalein នៅក្នុងកែវកោណ HCl។")}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsIndicatorOn((prev) => !prev)}
                    className={`w-full py-3 border rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-2 hover:scale-[1.02] ${
                      isIndicatorOn
                        ? "bg-pink-500/10 border-pink-500/40 text-pink-400"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850"
                    }`}
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span className={isKh ? "font-khmer" : ""}>
                      {isIndicatorOn ? t("Indicator: ON", "សូចនាករ៖ បន្ថែមរួច") : t("Indicator: OFF", "សូចនាករ៖ គ្មាន")}
                    </span>
                  </button>
                </div>
              </div>

              {/* Reset, Math Challenge & Show Answer */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-850">
                <div className="flex flex-col gap-1 text-center sm:text-left">
                  <span className={`text-xs font-bold text-slate-200 ${isKh ? "font-khmer" : ""}`}>
                    {t("Challenge: Calculate the Acid Concentration", "ល្បែងគណនា៖ ស្វែងរកកំហាប់អាស៊ីត HCl")}
                  </span>
                  <span className={`text-[11px] text-slate-500 leading-snug ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {t(
                      "Using the Titre volume where the solution turns light pink, calculate the unknown concentration of HCl using the formula on the right.",
                      "ដោយប្រើមាឌសូលុយស្យុងប្រើប្រាស់ (Titre) ដែលប្រែជាពណ៌ផ្កាឈូកស្រាល គណនាកំហាប់ HCl មិនស្គាល់ដោយប្រើរូបមន្តនៅខាងស្តាំ។"
                    )}
                  </span>
                </div>

                <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
                  <button
                    onClick={() => setIsConcentrationRevealed((prev) => !prev)}
                    disabled={volumeAdded === 0}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
                  >
                    <span className={isKh ? "font-khmer" : ""}>
                      {isConcentrationRevealed ? t("Hide Answer", "លាក់ចម្លើយ") : t("Show Answer", "បង្ហាញចម្លើយ")}
                    </span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className={isKh ? "font-khmer" : ""}>{t("Reset", "ពិសោធន៍ឡើងវិញ")}</span>
                  </button>
                </div>
              </div>

              {/* Revealed Answer Box */}
              {isConcentrationRevealed && (
                <div className="bg-pink-950/20 border border-pink-500/30 p-4 rounded-xl text-center animate-in fade-in duration-200">
                  <span className="text-[10px] text-pink-400 font-mono tracking-widest block uppercase mb-1">
                    {t("REVEALED CALCULATION", "លទ្ធផលគណនាពិតប្រាកដ")}
                  </span>
                  <div className="flex flex-col gap-1 items-center">
                    <span className={`text-xs text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                      {t(
                        `Neutralization Volume (Endpoint): ${endpointVolume} mL`,
                        `មាឌសូលុយស្យុងបន្សាបបាសអស់ (Endpoint)៖ ${endpointVolume} mL`
                      )}
                    </span>
                    <span className="text-lg font-black text-white font-mono">
                      C_HCl = {calculatedAcidConc.toFixed(5)} M
                    </span>
                    <span className={`text-[10px] text-slate-500 italic max-w-md ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        `Calculated as: C_HCl = (0.100 M * ${endpointVolume} mL) / 25.0 mL`,
                        `គណនាតាមរូបមន្ត៖ C_HCl = (០.១០០ M * ${endpointVolume} mL) / ២៥.០ mL`
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Right Column: Math & Apparatus Grid (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* 3. The Math & Formulas (LaTeX Panel) */}
            <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-pink-400" />
                <h3
                  className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                  style={{ fontSize: "max(1.2rem, 2.2vw)" }}
                >
                  {t("Volumetric Calculations", "រូបមន្ត និងការគណនាមាឌ")}
                </h3>
              </div>

              <div className="flex flex-col gap-4 text-slate-300 text-sm">
                
                {/* Basic Neutralization Formula */}
                <div className="border-b border-slate-800 pb-4">
                  <p className={`mb-3 ${isKh ? "font-khmer leading-loose text-xs" : ""}`}>
                    {t(
                      "For a 1:1 neutralization reaction (such as HCl and NaOH):",
                      "សម្រាប់ប្រតិកម្មបន្សាបរវាងអាស៊ីតខ្លាំង និងបាសខ្លាំងសមាមាត្រម៉ូល ១:១ (ដូចជា HCl និង NaOH)៖"
                    )}
                  </p>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 text-center text-pink-400 font-bold overflow-x-auto">
                    <BlockMath math={String.raw`C_1V_1 = C_2V_2`} />
                  </div>
                  <div className={`grid grid-cols-2 gap-2 mt-3 text-xs text-slate-400 ${isKh ? "font-khmer leading-loose" : ""}`}>
                    <div>
                      <span className="font-mono text-pink-400 font-bold">C₁: </span>
                      {t("Conc. of acid (mol/L or M)", "កំហាប់ម៉ូលអាស៊ីត (M)")}
                    </div>
                    <div>
                      <span className="font-mono text-pink-400 font-bold">V₁: </span>
                      {t("Volume of acid (mL or L)", "មាឌសូលុយស្យុងអាស៊ីត (mL)")}
                    </div>
                    <div>
                      <span className="font-mono text-pink-400 font-bold">C₂: </span>
                      {t("Conc. of base (mol/L or M)", "កំហាប់ម៉ូលបាស (M)")}
                    </div>
                    <div>
                      <span className="font-mono text-pink-400 font-bold">V₂: </span>
                      {t("Volume of base (mL or L)", "មាឌសូលុយស្យុងបាស (mL)")}
                    </div>
                  </div>
                </div>

                {/* Moles Formula */}
                <div className="border-b border-slate-800 pb-4">
                  <p className={`mb-3 ${isKh ? "font-khmer leading-loose text-xs" : ""}`}>
                    {t(
                      "To calculate the amount of chemical substance in moles (n):",
                      "ដើម្បីគណនាម៉ូលនៃសារធាតុគីមីរលាយ (n)៖"
                    )}
                  </p>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 text-center text-pink-400 font-bold overflow-x-auto">
                    <BlockMath math={String.raw`n = C \cdot V`} />
                  </div>
                  <p className={`text-xs text-slate-400 mt-2 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {t(
                      "Where n = amount of substance in moles (mol), C = concentration (mol/dm³), and V = volume expressed in decimeters cubed (dm³).",
                      "ដែល n = ម៉ូលនៃសារធាតុរលាយ (mol), C = កំហាប់ម៉ូល (mol/dm³ ឬ M) និង V = មាឌគិតជាដេស៊ីម៉ែត្រគូប (dm³)។"
                    )}
                  </p>
                </div>

                {/* Unit Conversion Warning */}
                <div className="rounded-2xl bg-pink-950/20 border border-pink-500/30 p-5 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-wider">
                    <Info className="w-4 h-4 shrink-0" />
                    <span className={isKh ? "font-khmer" : ""}>{t("Unit Conversion Warning!", "ការព្រមានអំពីការប្តូរឯកតាមាឌ!")}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {t(
                      "Volume measured by laboratory equipment (pipettes, burettes) is recorded in centimeters cubed (cm³) or milliliters (mL). In stoichiometric equations, you must convert to decimeters cubed (dm³ or Liters) by dividing by 1000:",
                      "មាឌដែលវាស់បានដោយឧបករណ៍ពិសោធន៍ (ពីប៉ែត, ប៊ុយរ៉ែត) ជាទូទៅគិតជាសង់ទីម៉ែត្រគូប (cm³) ឬមីលីលីត្រ (mL)។ ក្នុងការគណនាគីមី អ្នកត្រូវប្តូរវាទៅជាដេស៊ីម៉ែត្រគូប (dm³ ឬលីត្រ) ដោយចែកនឹង ១០០០៖"
                    )}
                  </p>
                  <div className="bg-slate-950 p-3 rounded-xl text-center text-xs font-mono font-bold text-pink-300 overflow-x-auto">
                    <BlockMath math={String.raw`1000 \, \text{cm}^3 = 1 \, \text{dm}^3`} />
                    <BlockMath math={String.raw`V(\text{dm}^3) = \frac{V(\text{cm}^3)}{1000}`} />
                  </div>
                </div>

              </div>
            </section>

            {/* 4. Toolkit & Terminology Grid */}
            <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-pink-400" />
                <h3
                  className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                  style={{ fontSize: "max(1.2rem, 2.2vw)" }}
                >
                  {t("Toolkit & Lab Terminology", "ឧបករណ៍ និងវាក្យសព្ទបន្ទប់ពិសោធន៍")}
                </h3>
              </div>

              {/* Apparatus Definitions List */}
              <div className="flex flex-col gap-4">
                <h4 className={`text-xs font-bold text-slate-400 uppercase tracking-widest ${isKh ? "font-khmer" : ""}`}>
                  {t("Apparatus Description", "ឧបករណ៍ពិសោធន៍")}
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl">
                    <span className="text-xs font-bold text-pink-400 block mb-1">Burette</span>
                    <p className={`text-xs text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "A long graduated vertical glass tube with a stopcock valve at the bottom, used to deliver varying, precisely measured amounts of liquid titrant.",
                        "ប៊ុយរ៉ែត៖ បំពង់កែវវាស់វែងវែងបញ្ឈរដែលមានក្បាលវ៉ានបិទបើកនៅខាងក្រោម ប្រើសម្រាប់វាស់មាឌសូលុយស្យុងលំហូរបានច្បាស់លាស់។"
                      )}
                    </p>
                  </div>
                  <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl">
                    <span className="text-xs font-bold text-pink-400 block mb-1">Pipette</span>
                    <p className={`text-xs text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "A laboratory instrument designed to draw, hold, and transfer a single, exact volume of solution (commonly 25.0 mL) with highly certified accuracy.",
                        "ពីប៉ែត៖ ឧបករណ៍ពិសោធន៍គីមីប្រើសម្រាប់ស្រូប និងផ្ទេរមាឌសូលុយស្យុងគីមីកម្រិតមាឌជាក់លាក់មួយ (ជាទូទៅ ២៥.០ mL) ប្រកបដោយភាពហ្មត់ចត់ខ្ពស់។"
                      )}
                    </p>
                  </div>
                  <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl">
                    <span className="text-xs font-bold text-pink-400 block mb-1">Conical Flask</span>
                    <p className={`text-xs text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "A cone-shaped flask (Erlenmeyer) with a flat base and cylindrical neck. Its narrow neck allows chemistry students to swirl reactants vigorously without danger of spilling.",
                        "កែវកោណ៖ កែវមន្ទីរពិសោធន៍បាតស្មើ រាងកោណ និងកចង្អៀត។ ទម្រង់កចង្អៀតរបស់វាជួយឱ្យសិស្សងាយស្រួលក្រឡុកល្បាយដោយមិនខ្លាចកំពប់។"
                      )}
                    </p>
                  </div>
                  <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl">
                    <span className="text-xs font-bold text-pink-400 block mb-1">pH Indicator</span>
                    <p className={`text-xs text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "A chemical added to detect the endpoint. For strong acid-strong base titrations, Phenolphthalein is standard—it turns pink exactly as pH transitions from acidic to alkaline.",
                        "សូចនាករ pH៖ សារធាតុគីមីបន្ថែមដើម្បីបញ្ជាក់ចំណុចបញ្ចប់។ Phenolphthalein ត្រូវបានប្រើជាសកល ដែលវាគ្មានពណ៌ក្នុងអាស៊ីត ហើយប្រែជាផ្កាឈូកក្នុងបាស។"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chemical Terms Definitions */}
              <div className="flex flex-col gap-4 mt-2">
                <h4 className={`text-xs font-bold text-slate-400 uppercase tracking-widest ${isKh ? "font-khmer" : ""}`}>
                  {t("Key Terminology", "វាក្យសព្ទគន្លឹះ")}
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl">
                    <span className="text-xs font-bold text-pink-400 block mb-1">Titre Value</span>
                    <p className={`text-xs text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "The precise net volume of standard solution delivered from the burette to achieve a full chemical neutralization during the titration run.",
                        "មាឌប្រើប្រាស់៖ មាឌសរុបពិតប្រាកដនៃសូលុយស្យុងស្តង់ដារដែលហូរចេញពីប៊ុយរ៉ែត ដើម្បីសម្រេចបានប្រតិកម្មបន្សាបទាំងស្រុង។"
                      )}
                    </p>
                  </div>
                  <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl">
                    <span className="text-xs font-bold text-pink-400 block mb-1">Endpoint</span>
                    <p className={`text-xs text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "The exact stage in a titration where the physical indicator shifts color, indicating chemical neutralization is complete. Ideally, this matches the equivalence point.",
                        "ចំណុចបញ្ចប់៖ ចំណុចពិតប្រាកដដែលសូចនាករគីមីប្រែពណ៌ បង្ហាញថាប្រតិកម្មបន្សាបរួចរាល់។ ជាទូទៅ វាត្រូវនឹងចំណុចសមមូល។"
                      )}
                    </p>
                  </div>
                  <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-xl">
                    <span className="text-xs font-bold text-pink-400 block mb-1">Standard Solution</span>
                    <p className={`text-xs text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "A chemical solution containing a highly verified, precise concentration of solute, used to gauge the concentration of other unknown solutions.",
                        "សូលុយស្យុងស្តង់ដារ៖ សូលុយស្យុងដែលគេស្គាល់កំហាប់ច្បាស់លាស់ និងត្រឹមត្រូវបំផុត ដើម្បីយកទៅវាស់ស្ទង់រកកំហាប់សូលុយស្យុងដទៃទៀត។"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Common Laboratory Errors */}
              <div className="flex flex-col gap-4 mt-2">
                <h4 className={`text-xs font-bold text-slate-400 uppercase tracking-widest ${isKh ? "font-khmer" : ""}`}>
                  {t("Common Lab Errors & Precautions", "កំហុសបច្ចេកទេសទូទៅ និងការប្រុងប្រយ័ត្ន")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-rose-950/10 border border-rose-500/20 p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-xs font-bold text-rose-400">{t("Parallax Error", "កំហុសប៉ារ៉ាឡាក់ (មុំអាន)")}</span>
                    <p className={`text-[11px] text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Reading the burette scale at an angle leads to false measurements. Always keep your eyes perfectly horizontal to the liquid's meniscus bottom.",
                        "ការអានរង្វាស់ប៊ុយរ៉ែតពីមុំខ្ពស់ ឬទាបបណ្តាលឱ្យទិន្នន័យខុស។ ត្រូវសម្លឹងមើលឱ្យកម្រិតភ្នែកស្របនឹងបាតកោង (meniscus) នៃវត្ថុរាវជានិច្ច។"
                      )}
                    </p>
                  </div>
                  <div className="bg-rose-950/10 border border-rose-500/20 p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-xs font-bold text-rose-400">{t("Trapped Air Bubbles", "ពពុះខ្យល់ក្នុងក្បាលប៊ុយរ៉ែត")}</span>
                    <p className={`text-[11px] text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Air trapped in the nozzle under the valve will escape during the titration, counting as volume added when it was just air. Purge bubbles before starting.",
                        "ខ្យល់ដែលកកស្ទះនៅក្បាលខាងក្រោមនឹងរត់ចេញពេលបើកវ៉ាន ដែលធ្វើឱ្យមាឌអានបានច្រើនជាងមាឌរាវពិត។ ត្រូវបង្ហូរដេញពពុះខ្យល់ចេញមុនធ្វើពិសោធន៍។"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

      </main>
    </div>
  );
}
