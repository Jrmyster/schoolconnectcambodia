import React, { useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguageStore } from "@/store/use-language";
import { Magnet, AlertTriangle, ShieldAlert, Zap, User } from "lucide-react";

export function ElectricalMagneticFieldSection() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  // State for the sliders
  const [current, setCurrent] = useState<number>(1000);
  const [distance, setDistance] = useState<number>(2.0);

  // Calculate B field in Microteslas (μT)
  // Formula: B = (μ0 * I) / (2 * π * r)
  // μ0 = 4π * 10^-7 T·m/A
  // B = (2 * 10^-7 * I) / r  [in Teslas]
  // B(μT) = (0.2 * I) / r
  const bField = (0.2 * current) / distance;
  const isDanger = bField > 500;

  // Number of rings to draw based on field strength
  const numRings = Math.min(10, Math.max(1, Math.floor(bField / 100)));

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* ── Header & Concept ─────────────────────────────────────────────────── */}
      <div className="mb-10 text-center">
        <span
          className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-violet-700 mb-4 px-3 py-1 bg-violet-100 rounded-full ${
            kh ? "font-khmer normal-case tracking-normal text-sm" : ""
          }`}
        >
          <Magnet className="w-4 h-4" />
          {kh ? "ច្បាប់ Biot-Savart និងដែនម៉ាញេទិក" : "Biot-Savart Law & Magnetic Fields"}
        </span>
        <h2
          className={`text-3xl sm:text-5xl md:text-[4vw] font-black text-slate-900 leading-tight mb-6 ${
            kh ? "font-khmer" : "font-display"
          }`}
        >
          {kh ? "ចរន្តបង្កើតដែនម៉ាញេទិក" : "Currents Create Magnetic Fields"}
        </h2>
        <p
          className={`text-lg md:text-[1.5vw] text-slate-600 max-w-4xl mx-auto leading-relaxed ${
            kh ? "font-khmer" : ""
          }`}
        >
          {kh
            ? "ច្បាប់ Biot-Savart បង្ហាញថាខ្សែដែលផ្ទុកចរន្តអគ្គិសនីបង្កើតដែនម៉ាញេទិកដែលមើលមិនឃើញជុំវិញវា។ កាលណាចរន្តកាន់តែធំ ដែនម៉ាញេទិកកាន់តែខ្លាំង។"
            : "The Biot-Savart Law reveals that any wire carrying electrical current automatically generates an invisible magnetic field around it. The higher the current, the stronger the field."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* ── Safety Connection ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-violet-200 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3
              className={`text-2xl font-bold text-slate-800 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {kh ? "ទំនាក់ទំនងផ្នែកសុវត្ថិភាព" : "The Safety Connection"}
            </h3>
          </div>
          <p
            className={`text-base md:text-[1.2vw] text-slate-600 leading-relaxed mb-4 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {kh
              ? "នៅក្នុងវិស័យឧស្សាហកម្ម ខ្សែភ្លើងធំៗផ្ទុកចរន្តខ្ពស់រាប់ពាន់អំពែ ដែលបង្កើតដែនម៉ាញេទិកដ៏ធំសម្បើម។ ដែនទាំងនេះអាចបង្កើតចរន្តអគ្គិសនីដែលមិនចង់បាននៅក្នុងលោហៈនៅក្បែរៗ ប៉ះពាល់ដល់ឧបករណ៍វេជ្ជសាស្ត្រដូចជាឧបករណ៍ជំនួយបេះដូង (pacemakers) និងថែមទាំងអាចបណ្តាលឲ្យមានការឆាបឆេះខ្លាំង (arc flashes)។"
              : "In industrial settings, massive cables carry thousands of amps, creating enormous magnetic fields. These fields can induce unwanted dangerous currents in nearby metals, interfere with life-saving medical devices like pacemakers, or contribute to deadly arc flashes."}
          </p>
        </div>

        {/* ── The Formula ────────────────────────────────────────────────────── */}
        <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-md p-8 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <BlockMath math="B = \frac{\mu_0 I}{2\pi r}" />
          </div>
          <h3
            className={`text-xl font-bold text-violet-300 mb-4 z-10 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {kh ? "រូបមន្តសម្រាប់ខ្សែត្រង់វែង" : "Formula for a Long, Straight Wire"}
          </h3>
          <div className="text-3xl md:text-[3vw] font-bold text-center my-6 z-10 bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
            <BlockMath math="B = \frac{\mu_0 I}{2\pi r}" />
          </div>
          
          <ul className={`text-sm md:text-[1.1vw] space-y-2 z-10 text-slate-300 ${kh ? "font-khmer" : ""}`}>
            <li>
              <span className="text-violet-300 font-bold"><InlineMath math="B" /></span> = {kh ? "កម្លាំងដែនម៉ាញេទិក (គិតជាតេស្លា)" : "Magnetic Field Strength (Teslas)"}
            </li>
            <li>
              <span className="text-violet-300 font-bold"><InlineMath math="\mu_0" /></span> = {kh ? "ភាពជ្រាបម៉ាញេទិកនៃលំហ (ថេរ)" : "Permeability of Free Space (constant)"}
            </li>
            <li>
              <span className="text-violet-300 font-bold"><InlineMath math="I" /></span> = {kh ? "ចរន្តអគ្គិសនី (គិតជាអំពែ)" : "Electrical Current (Amperes)"}
            </li>
            <li>
              <span className="text-violet-300 font-bold"><InlineMath math="r" /></span> = {kh ? "ចម្ងាយពីខ្សែភ្លើង (គិតជាម៉ែត្រ)" : "Distance from the wire (Meters)"}
            </li>
          </ul>
        </div>
      </div>

      {/* ── Interactive 'Magnetic Danger Zone' Visualizer ────────────────────── */}
      <div className="bg-slate-950 rounded-[3rem] border border-slate-800 shadow-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h3
            className={`text-3xl md:text-[3vw] font-black text-white ${
              kh ? "font-khmer" : "font-display"
            }`}
          >
            {kh ? "ឧបករណ៍ក្លែងធ្វើតំបន់គ្រោះថ្នាក់ម៉ាញេទិក" : "Magnetic Danger Zone Simulator"}
          </h3>
          <p className={`text-slate-400 mt-2 text-lg md:text-[1.5vw] ${kh ? "font-khmer" : ""}`}>
            {kh ? "គ្រប់គ្រងថាមពល និងចម្ងាយដើម្បីមើលឥទ្ធិពលនៃដែនម៉ាញេទិកផ្ទាល់។" : "Control the power and distance to see the magnetic field's effect in real-time."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Controls */}
          <div className="space-y-10 bg-slate-900 p-8 rounded-3xl border border-slate-700">
            {/* Current Slider */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className={`text-xl md:text-[1.5vw] font-bold text-violet-300 ${kh ? "font-khmer" : ""}`}>
                  <InlineMath math="I" /> = {kh ? "ចរន្តអគ្គិសនី" : "Current (Amps)"}
                </label>
                <span className="text-2xl md:text-[2vw] font-mono font-bold text-white bg-slate-800 px-4 py-1 rounded-xl">
                  {current.toLocaleString()} A
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={current}
                onChange={(e) => setCurrent(Number(e.target.value))}
                className="w-full h-8 md:h-[3vh] bg-slate-800 rounded-full appearance-none cursor-pointer accent-violet-500 hover:accent-violet-400"
              />
            </div>

            {/* Distance Slider */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className={`text-xl md:text-[1.5vw] font-bold text-sky-300 ${kh ? "font-khmer" : ""}`}>
                  <InlineMath math="r" /> = {kh ? "ចម្ងាយពីខ្សែ" : "Distance (Meters)"}
                </label>
                <span className="text-2xl md:text-[2vw] font-mono font-bold text-white bg-slate-800 px-4 py-1 rounded-xl">
                  {distance.toFixed(1)} m
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-8 md:h-[3vh] bg-slate-800 rounded-full appearance-none cursor-pointer accent-sky-500 hover:accent-sky-400"
              />
            </div>
            
            {/* Real-time Calculation Result */}
            <div className="pt-6 border-t border-slate-700 text-center">
              <div className={`text-lg md:text-[1.2vw] text-slate-400 mb-2 ${kh ? "font-khmer" : ""}`}>
                {kh ? "កម្លាំងដែនម៉ាញេទិក B" : "Magnetic Field Strength (B)"}
              </div>
              <div className={`text-5xl md:text-[4vw] font-black font-mono transition-colors duration-300 ${isDanger ? 'text-red-500' : 'text-emerald-400'}`}>
                {bField.toFixed(1)} <span className="text-3xl md:text-[2.5vw]">μT</span>
              </div>
            </div>
          </div>

          {/* Visual Output */}
          <div className="relative flex flex-col items-center justify-center min-h-[400px] bg-black/50 rounded-3xl border border-slate-800 overflow-hidden py-10">
            {/* Danger Overlay */}
            <div className={`absolute top-6 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 ${isDanger ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-3 bg-red-600/90 text-white px-6 py-3 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse">
                <AlertTriangle className="w-8 h-8 md:w-[3vw] md:h-[3vw]" />
                <span className={`text-xl md:text-[1.8vw] font-black tracking-wide uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
                  {kh ? "គ្រោះថ្នាក់៖ ការរំខានអេឡិចត្រូម៉ាញេទិកខ្ពស់" : "DANGER: High Electromagnetic Interference"}
                </span>
              </div>
            </div>

            {/* Visualizer SVG */}
            <div className="relative w-[300px] h-[300px] md:w-[25vw] md:h-[25vw] flex items-center justify-center">
              <svg viewBox="-150 -150 300 300" className="w-full h-full absolute inset-0 z-0">
                {/* Magnetic Field Rings */}
                {Array.from({ length: 15 }).map((_, idx) => {
                  const radius = (idx + 1) * 20;
                  // Only show rings if the field is strong enough
                  const opacity = bField > 0 ? Math.max(0, 1 - (radius / (bField * 0.5 + 50))) : 0;
                  // Color shifts from green to red based on field strength
                  const isRed = bField > 200 + idx * 50;
                  const color = isRed ? "#ef4444" : "#10b981";
                  const strokeWidth = 1 + (bField / 500) * (15 - idx) * 0.1;

                  return (
                    <circle
                      key={idx}
                      cx="0"
                      cy="0"
                      r={radius}
                      fill="none"
                      stroke={color}
                      strokeWidth={strokeWidth}
                      strokeDasharray="10 10"
                      opacity={opacity}
                      className="transition-all duration-300 ease-out"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 0 0"
                        to={current > 0 ? "360 0 0" : "0 0 0"}
                        dur={`${Math.max(1, 10 - current / 1000)}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                })}
                {/* Central Wire */}
                <circle cx="0" cy="0" r="10" fill="#f59e0b" />
                <circle cx="0" cy="0" r="6" fill="#fbbf24" />
                {current > 0 && (
                  <text x="0" y="3" fontSize="10" fill="black" textAnchor="middle" fontWeight="bold">
                    ×
                  </text>
                )}
              </svg>

              {/* Person / Sensor */}
              <div 
                className="absolute z-10 flex flex-col items-center transition-all duration-300 ease-out"
                style={{ 
                  transform: `translateX(${Math.max(15, Math.min(130, distance * 15))}px)`,
                }}
              >
                <div className={`p-2 rounded-full shadow-lg ${isDanger ? 'bg-red-500' : 'bg-sky-500'} transition-colors duration-300`}>
                  <User className="w-6 h-6 md:w-[2vw] md:h-[2vw] text-white" />
                </div>
                <div className={`text-xs md:text-[1vw] font-bold mt-2 px-2 py-1 rounded bg-slate-800/80 border ${isDanger ? 'border-red-500 text-red-300' : 'border-slate-600 text-slate-300'}`}>
                  {distance.toFixed(1)}m
                </div>
              </div>
            </div>
            
            <div className={`mt-8 text-center text-slate-400 text-sm md:text-[1.2vw] ${kh ? "font-khmer" : ""}`}>
              {kh ? "ទិដ្ឋភាពពីលើខ្សែបញ្ឈរ (សញ្ញា 'x' បង្ហាញពីចរន្តដែលហូរចូលទៅក្នុងអេក្រង់)" : "Top-down view of a vertical wire (the 'x' indicates current flowing into the screen)"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
