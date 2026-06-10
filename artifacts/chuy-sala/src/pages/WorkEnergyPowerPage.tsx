import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, Zap, Box, ArrowRight, Play, RefreshCw, AlertTriangle, ChevronsDown, Activity } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function WorkEnergyPowerPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Navigation & Header */}
        <div>
          <Link
            href="/physics"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-6 ${
              kh ? "font-khmer" : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-400/60 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black text-white ${kh ? "font-khmer leading-snug" : "font-display"}`}>
                {t("Work, Energy & Power", "កម្មន្ត ថាមពល និងអនុភាព")}
              </h1>
              <p className={`text-slate-400 text-lg mt-2 ${kh ? "font-khmer" : ""}`}>
                {t("Understanding how the universe moves and transforms.", "ការយល់ដឹងពីរបៀបដែលសកលលោកផ្លាស់ទីនិងផ្លាស់ប្តូរ។")}
              </p>
            </div>
          </div>
        </div>

        {/* Concept Breakdown & Formula Library */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold text-amber-400 ${kh ? "font-khmer" : ""}`}>
                {t("The Core Concepts", "គោលគំនិតសំខាន់ៗ")}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{t("Work (W)", "កម្មន្ត (W)")}</h3>
                  <p className={`text-slate-400 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                    {t(
                      "Work is done when a force causes an object to move in the direction of the force.",
                      "កម្មន្តកើតឡើងនៅពេលកម្លាំងបណ្តាលឱ្យវត្ថុផ្លាស់ទីក្នុងទិសដៅនៃកម្លាំង។"
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{t("Kinetic Energy (K)", "ថាមពលស៊ីនេទិច (K)")}</h3>
                  <p className={`text-slate-400 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                    {t(
                      "The energy an object possesses due to its motion. Faster or heavier objects have more kinetic energy.",
                      "ថាមពលដែលវត្ថុមានដោយសារចលនារបស់វា។ វត្ថុលឿនជាងឬធ្ងន់ជាងមានថាមពលស៊ីនេទិចច្រើនជាង។"
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{t("Potential Energy (U)", "ថាមពលប៉ូតង់ស្យែល (U)")}</h3>
                  <p className={`text-slate-400 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                    {t(
                      "Stored energy based on an object's position or state, such as its height against gravity.",
                      "ថាមពលដែលស្តុកទុកដោយផ្អែកលើទីតាំងឬស្ថានភាពរបស់វត្ថុ ដូចជាកម្ពស់របស់វាប្រឆាំងនឹងទំនាញផែនដី។"
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{t("Power (P)", "អនុភាព (P)")}</h3>
                  <p className={`text-slate-400 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                    {t(
                      "The rate at which work is done or energy is transferred over time.",
                      "អត្រាដែលកម្មន្តត្រូវបានធ្វើឡើង ឬថាមពលត្រូវបានផ្ទេរតាមពេលវេលា។"
                    )}
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className={`text-sm font-bold text-slate-300 uppercase tracking-widest mb-3 ${kh ? "font-khmer normal-case" : ""}`}>
                  {t("Key Units", "ឯកតាសំខាន់ៗ")}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-amber-300"><span className="font-bold text-white mr-2">Joules (J)</span>{t("Energy / Work", "ថាមពល / កម្មន្ត")}</div>
                  <div className="text-amber-300"><span className="font-bold text-white mr-2">Watts (W)</span>{t("Power", "អនុភាព")}</div>
                  <div className="text-amber-300"><span className="font-bold text-white mr-2">Newtons (N)</span>{t("Force", "កម្លាំង")}</div>
                  <div className="text-amber-300"><span className="font-bold text-white mr-2">Meters (m)</span>{t("Distance", "ចម្ងាយ")}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className={`text-2xl font-bold text-amber-400 ${kh ? "font-khmer" : ""}`}>
                {t("The Formulas", "រូបមន្ត")}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col justify-center text-center">
                  <div className="text-xs font-mono uppercase text-slate-500 mb-2">{t("Work", "កម្មន្ត")}</div>
                  <div className="text-2xl md:text-[2vw] text-white">
                    <BlockMath math="W = Fs \cos\theta" />
                  </div>
                </div>
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col justify-center text-center">
                  <div className="text-xs font-mono uppercase text-slate-500 mb-2">{t("Power", "អនុភាព")}</div>
                  <div className="text-2xl md:text-[2vw] text-white">
                    <BlockMath math="P = \frac{W}{t}" />
                  </div>
                </div>
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col justify-center text-center">
                  <div className="text-xs font-mono uppercase text-slate-500 mb-2">{t("Kinetic Energy", "ថាមពលស៊ីនេទិច")}</div>
                  <div className="text-2xl md:text-[2vw] text-white">
                    <BlockMath math="K = \frac{1}{2}mv^2" />
                  </div>
                </div>
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col justify-center text-center">
                  <div className="text-xs font-mono uppercase text-slate-500 mb-2">{t("Potential Energy", "ថាមពលប៉ូតង់ស្យែល")}</div>
                  <div className="text-2xl md:text-[2vw] text-white">
                    <BlockMath math="U = mgh" />
                  </div>
                </div>
                <div className="sm:col-span-2 bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col justify-center text-center">
                  <div className="text-xs font-mono uppercase text-slate-500 mb-2">{t("Conservation of Energy", "ការអភិរក្សថាមពល")}</div>
                  <div className="text-2xl md:text-[2vw] text-amber-300">
                    <BlockMath math="E = K + U = \text{constant}" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work & Power Simulator */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-6 h-6 text-cyan-400" />
            <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
              {t("Work & Power Simulator", "ម៉ាស៊ីនក្លែងធ្វើកម្មន្ត និងអនុភាព")}
            </h2>
          </div>

          <WorkPowerSimulator t={t} kh={kh} />
        </section>

        {/* Conservation of Energy Drop Zone */}
        <section className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <ChevronsDown className="w-6 h-6 text-rose-400" />
            <h2 className={`text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}>
              {t("Conservation of Energy Drop Zone", "តំបន់ទម្លាក់អភិរក្សថាមពល")}
            </h2>
          </div>

          <EnergyDropZone t={t} kh={kh} />
        </section>

      </div>
    </div>
  );
}

// ── Work & Power Simulator Component ──────────────────────────────────────────
function WorkPowerSimulator({ t, kh }: { t: any, kh: boolean }) {
  const [force, setForce] = useState(50);
  const [disp, setDisp] = useState(10);
  const [angle, setAngle] = useState(0);
  const [time, setTime] = useState(5);

  // Math
  const angleRad = (angle * Math.PI) / 180;
  let work = force * disp * Math.cos(angleRad);
  // Due to floating point precision, cos(90) might not be exactly 0
  if (Math.abs(work) < 1e-10) work = 0;
  
  const power = time > 0 ? work / time : 0;
  const zeroWork = Math.abs(work) === 0 && force > 0 && disp > 0;

  // Visualizer Math
  // Box is at center, Arrow points from box center
  const arrowLength = 100;
  const endX = Math.cos(angleRad) * arrowLength;
  const endY = -Math.sin(angleRad) * arrowLength; // Negative because SVG Y goes down

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <SliderControl label={t("Force (N)", "កម្លាំង (N)")} value={force} setValue={setForce} min={0} max={200} step={1} />
        <SliderControl label={t("Displacement (m)", "បម្លាស់ទី (m)")} value={disp} setValue={setDisp} min={0} max={50} step={1} />
        <SliderControl label={t("Angle (°)", "មុំ (°)")} value={angle} setValue={setAngle} min={0} max={180} step={1} />
        <SliderControl label={t("Time (s)", "ពេលវេលា (s)")} value={time} setValue={setTime} min={1} max={20} step={1} />
        
        {zeroWork && (
          <div className="bg-rose-500/10 border border-rose-500/50 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-rose-400 font-bold">{t("Zero Work Alert!", "ការព្រមានកម្មន្តសូន្យ!")}</h4>
              <p className={`text-sm text-rose-300 mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Because the force is applied at 90°, it is perpendicular to the motion. Therefore, NO work is done in the direction of movement.",
                  "ដោយសារកម្លាំងត្រូវបានអនុវត្តនៅមុំ 90° វាមានរាងកែងទៅនឹងចលនា។ ដូច្នេះ គ្មានកម្មន្តត្រូវបានធ្វើក្នុងទិសដៅនៃចលនាទេ។"
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {/* Massive Outputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 text-center shadow-inner flex flex-col justify-center">
            <div className={`text-sm font-mono uppercase text-slate-500 mb-2 ${kh ? "font-khmer normal-case" : ""}`}>
              {t("Work Done", "កម្មន្តសរុប")}
            </div>
            <div className="text-[5vw] sm:text-[4vw] lg:text-[3vw] font-black text-cyan-400 leading-none truncate" title={work.toFixed(1)}>
              {work.toFixed(1)} <span className="text-xl text-cyan-700">J</span>
            </div>
          </div>
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 text-center shadow-inner flex flex-col justify-center">
            <div className={`text-sm font-mono uppercase text-slate-500 mb-2 ${kh ? "font-khmer normal-case" : ""}`}>
              {t("Power", "អនុភាព")}
            </div>
            <div className="text-[5vw] sm:text-[4vw] lg:text-[3vw] font-black text-amber-400 leading-none truncate" title={power.toFixed(1)}>
              {power.toFixed(1)} <span className="text-xl text-amber-700">W</span>
            </div>
          </div>
        </div>

        {/* SVG Visualization */}
        <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-8 relative overflow-hidden min-h-[300px]">
          <svg width="100%" height="100%" viewBox="-150 -150 300 200" className="overflow-visible">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#22d3ee" />
              </marker>
            </defs>

            {/* Ground Line */}
            <line x1="-150" y1="50" x2="150" y2="50" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
            <text x="140" y="70" fill="#64748b" fontSize="12" textAnchor="end" className="font-mono">
              {t("Displacement", "បម្លាស់ទី")} →
            </text>

            {/* The Block */}
            <rect x="-40" y="-30" width="80" height="80" fill="#0f172a" stroke="#475569" strokeWidth="3" rx="8" />
            
            {/* The Force Vector */}
            <g transform="translate(0, 10)">
              {/* Force arrow */}
              <line 
                x1="0" 
                y1="0" 
                x2={endX} 
                y2={endY} 
                stroke="#22d3ee" 
                strokeWidth="4" 
                markerEnd="url(#arrowhead)"
                strokeLinecap="round"
              />
              {/* Force text label */}
              {force > 0 && (
                <text 
                  x={endX + (Math.cos(angleRad) * 15)} 
                  y={endY - (Math.sin(angleRad) * 15)} 
                  fill="#22d3ee" 
                  fontSize="14" 
                  fontWeight="bold"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {force} N
                </text>
              )}
              {/* Angle arc */}
              {angle > 0 && angle < 180 && (
                <path 
                  d={`M 40 0 A 40 40 0 0 0 ${Math.cos(angleRad) * 40} ${-Math.sin(angleRad) * 40}`} 
                  fill="none" 
                  stroke="#fbbf24" 
                  strokeWidth="2" 
                />
              )}
              {angle > 0 && angle < 180 && (
                <text 
                  x={Math.cos(angleRad / 2) * 55} 
                  y={-Math.sin(angleRad / 2) * 55} 
                  fill="#fbbf24" 
                  fontSize="12"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {angle}°
                </text>
              )}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Conservation of Energy Drop Zone Component ─────────────────────────────────
function EnergyDropZone({ t, kh }: { t: any, kh: boolean }) {
  const [mass, setMass] = useState(5); // kg
  const [startHeight, setStartHeight] = useState(20); // m
  
  const [isDropping, setIsDropping] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(20);
  const [velocity, setVelocity] = useState(0);

  const g = 9.81; // m/s^2 gravity
  
  // Energies
  const totalEnergy = mass * g * startHeight;
  const pe = mass * g * currentHeight;
  const ke = totalEnergy - pe; // Conservation of energy

  // Animation logic
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    
    // time to hit ground = sqrt(2h/g)
    const tFall = Math.sqrt((2 * startHeight) / g);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // seconds
      
      if (elapsed >= tFall) {
        // Hit the ground
        setCurrentHeight(0);
        setVelocity(g * tFall);
        setIsDropping(false);
        return;
      }
      
      // h = h0 - 0.5 * g * t^2
      const h = startHeight - 0.5 * g * elapsed * elapsed;
      // v = g * t
      const v = g * elapsed;
      
      setCurrentHeight(h);
      setVelocity(v);
      animationFrameId = requestAnimationFrame(animate);
    };

    if (isDropping) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isDropping, startHeight, g]);

  const handleDrop = () => {
    setCurrentHeight(startHeight);
    setVelocity(0);
    setIsDropping(true);
  };

  const handleReset = () => {
    setIsDropping(false);
    setCurrentHeight(startHeight);
    setVelocity(0);
  };

  // Re-sync current height when starting height changes
  useEffect(() => {
    if (!isDropping) {
      setCurrentHeight(startHeight);
      setVelocity(0);
    }
  }, [startHeight, isDropping]);

  return (
    <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
      
      {/* Controls */}
      <div className="space-y-8 flex flex-col justify-center">
        <SliderControl label={t("Mass (kg)", "ម៉ាស់ (kg)")} value={mass} setValue={setMass} min={1} max={50} step={1} disabled={isDropping} />
        <SliderControl label={t("Starting Height (m)", "កម្ពស់ចាប់ផ្ដើម (m)")} value={startHeight} setValue={setStartHeight} min={5} max={100} step={1} disabled={isDropping} />
        
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <div className={`text-xs font-mono uppercase text-slate-500 mb-1 ${kh ? "font-khmer" : ""}`}>
            {t("Total Energy", "ថាមពលសរុប")}
          </div>
          <div className="text-3xl font-black text-white">{totalEnergy.toFixed(0)} J</div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleDrop}
            disabled={isDropping || currentHeight === 0}
            className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            {t("Drop Object", "ទម្លាក់វត្ថុ")}
          </button>
          <button
            onClick={handleReset}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 px-4 rounded-xl flex items-center justify-center transition"
            title={t("Reset", "កំណត់ឡើងវិញ")}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Visualizer & Charts */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-inner flex flex-col md:flex-row gap-8 min-h-[400px]">
        
        {/* Drop Animation Area */}
        <div className="flex-1 relative border-r border-slate-800 pr-8 min-h-[300px] flex justify-center">
          {/* Height Scale */}
          <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between items-end pr-2 text-[10px] font-mono text-slate-500 border-r border-slate-800">
            <span>{startHeight}m</span>
            <span>{Math.round(startHeight / 2)}m</span>
            <span>0m</span>
          </div>

          {/* The Falling Object */}
          <div className="absolute top-0 bottom-8 w-16 mx-auto left-12 right-0">
            <div 
              className="absolute w-12 h-12 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)] transform -translate-x-1/2 left-1/2 flex items-center justify-center text-white font-bold text-xs"
              style={{
                // Map currentHeight (0 to startHeight) to bottom % (0% to 100%)
                bottom: `${(currentHeight / startHeight) * 100}%`,
                // Shift down half its height so center aligns with ground at 0
                marginBottom: '-24px'
              }}
            >
              {mass}kg
            </div>
          </div>

          {/* Ground Line */}
          <div className="absolute bottom-8 left-0 right-0 border-b-4 border-slate-700"></div>
          <div className="absolute bottom-2 left-0 right-0 text-center text-xs font-mono text-slate-500">
            v = {velocity.toFixed(1)} m/s
          </div>
        </div>

        {/* Dynamic Energy Bar Charts */}
        <div className="flex-1 flex flex-col justify-end gap-6 pt-8 pb-8">
          
          {/* PE Bar */}
          <div className="flex items-end gap-4 h-full">
            <div className="flex flex-col items-center flex-1 h-full justify-end">
              <div className="text-emerald-400 font-bold mb-2 text-xl" style={{ fontSize: "max(1rem, 2vw)" }}>
                {pe.toFixed(0)}<span className="text-sm">J</span>
              </div>
              <div className="w-full bg-slate-900 rounded-t-xl overflow-hidden relative h-[250px]">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-emerald-500 transition-all duration-75"
                  style={{ height: `${(pe / totalEnergy) * 100}%` }}
                ></div>
              </div>
              <div className="mt-3 text-sm font-bold text-slate-400 text-center">
                {t("Potential (U)", "ប៉ូតង់ស្យែល (U)")}
              </div>
            </div>
            
            {/* KE Bar */}
            <div className="flex flex-col items-center flex-1 h-full justify-end">
              <div className="text-cyan-400 font-bold mb-2 text-xl" style={{ fontSize: "max(1rem, 2vw)" }}>
                {ke.toFixed(0)}<span className="text-sm">J</span>
              </div>
              <div className="w-full bg-slate-900 rounded-t-xl overflow-hidden relative h-[250px]">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-cyan-500 transition-all duration-75"
                  style={{ height: `${(ke / totalEnergy) * 100}%` }}
                ></div>
              </div>
              <div className="mt-3 text-sm font-bold text-slate-400 text-center">
                {t("Kinetic (K)", "ស៊ីនេទិច (K)")}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

// ── Helper UI Components ───────────────────────────────────────────────────────
function SliderControl({ label, value, setValue, min, max, step, disabled = false }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-bold text-slate-300">{label}</label>
        <span className="text-lg font-mono text-white">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}
