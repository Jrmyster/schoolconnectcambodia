import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Atom, Info, Sliders, Play, Layers } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function HilbertSpacePage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Bloch Sphere State
  // theta: 0 to Math.PI (polar angle)
  // phi: 0 to 2*Math.PI (azimuthal angle)
  const [theta, setTheta] = useState<number>(Math.PI / 4); // default 45 degrees
  const [phi, setPhi] = useState<number>(0);

  // Math Calculations
  const cosThetaHalf = Math.cos(theta / 2);
  const sinThetaHalf = Math.sin(theta / 2);
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);

  const probUp = Math.pow(cosThetaHalf, 2);
  const probDown = Math.pow(sinThetaHalf, 2);

  // Bloch sphere SVG coordinate mapping
  // Sphere radius 100
  const r = 100;
  // Convert spherical (theta, phi) to 2D projection
  // We'll project 3D to 2D (isometric-ish)
  // X axis goes right/down, Y axis goes right/up, Z axis goes up
  // Actually, standard Bloch: Z is up, X is front, Y is right.
  // 3D coordinates:
  const x3d = r * Math.sin(theta) * Math.cos(phi);
  const y3d = r * Math.sin(theta) * Math.sin(phi);
  const z3d = r * Math.cos(theta);

  // Simple orthographic projection for visualization
  const px = x3d - y3d * 0.5; // X-axis projection
  const py = -z3d + y3d * 0.2; // Z is vertical, Y adds a slight tilt

  // Formatting phase for Math equation display
  let phiText = "";
  if (phi > 0) {
    if (Math.abs(phi - Math.PI) < 0.01) phiText = "\\pi";
    else if (Math.abs(phi - 2 * Math.PI) < 0.01) phiText = "2\\pi";
    else phiText = phi.toFixed(2);
  }

  // Formatting coefficient
  const signCos = cosThetaHalf >= 0 ? "" : "-";
  const signSin = sinThetaHalf >= 0 ? "+" : "-";

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background Matrix Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050b18] to-black pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20 font-sans">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/physics"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>
              {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Atom className="w-5 h-5 text-indigo-400 animate-pulse" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-500 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Hilbert Space & Quantum States", "លំហហ៊ីលប៊ឺត និងស្ថានភាពកង់ទិច")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block font-mono">
            <span>PHYSICS-QUANTUM-MATH</span>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-8">
        {/* Massive Header Title */}
        <div className="text-center mt-6 mb-4">
          <h1
            className={`font-black text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] ${isKh ? "font-khmer" : ""}`}
            style={{ fontSize: "max(2.5rem, 5vw)" }}
          >
            {t("The Invisible Arena", "ទីលានដែលមើលមិនឃើញ")}
          </h1>
          <p className={`text-indigo-300 mt-2 font-mono ${isKh ? "font-khmer leading-loose" : ""}`} style={{ fontSize: "max(0.9rem, 1.2vw)" }}>
            {t("Where Quantum States Live & Evolve", "កន្លែងដែលស្ថានភាពកង់ទិចរស់នៅ និងវិវឌ្ឍ")}
          </p>
        </div>

        {/* Top Content Row: The Analogy & Axioms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Concept Explanation Box */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <Info className="w-6 h-6 text-indigo-400" />
              <h2 className={`text-2xl font-bold text-white ${isKh ? "font-khmer" : ""}`}>
                {t("What is Hilbert Space?", "តើអ្វីទៅជាលំហហ៊ីលប៊ឺត?")}
              </h2>
            </div>
            
            <p className={`text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : "text-lg"}`}>
              {t(
                "Imagine an invisible mathematical arena with an infinite number of dimensions. In classical physics, an object's state is simply its position and speed (like coordinates on a map). In quantum mechanics, an object's state is an entire wave of possibilities, represented as an abstract vector.",
                "ស្រមៃមើលទីលានគណិតវិទ្យាដែលមើលមិនឃើញដែលមានវិមាត្ររាប់មិនអស់។ ក្នុងរូបវិទ្យាក្លាសិក ស្ថានភាពរបស់វត្ថុមួយគ្រាន់តែជាទីតាំងនិងល្បឿនរបស់វាប៉ុណ្ណោះ (ដូចជាកូអរដោនេលើផែនទី)។ ក្នុងមេកានិចកង់ទិច ស្ថានភាពរបស់វត្ថុគឺជាលទ្ធភាពរលកទាំងមូល ដែលតំណាងដោយវ៉ិចទ័រអរូបី។"
              )}
            </p>
            <p className={`text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : "text-md"}`}>
              {t(
                "Hilbert Space is this massive arena. The state of a quantum particle is a single point (a vector) moving through this space over time.",
                "លំហហ៊ីលប៊ឺត គឺជាទីលានដ៏ធំនេះ។ ស្ថានភាពនៃភាគល្អិតកង់ទិចគឺជាចំណុចមួយ (វ៉ិចទ័រមួយ) ដែលធ្វើចលនាកាត់លំហនេះតាមពេលវេលា។"
              )}
            </p>

            {/* Schrodinger connection */}
            <div className="mt-4 bg-indigo-950/40 border border-indigo-500/20 rounded-2xl p-6 text-center shadow-inner">
              <h3 className={`text-sm text-indigo-300 font-bold uppercase tracking-widest mb-4 ${isKh ? "font-khmer" : ""}`}>
                {t("The Schrödinger Equation", "សមីការស្រូឌីងហ្គឺរ")}
              </h3>
              <div className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] overflow-x-auto pb-2" style={{ fontSize: "max(1.5rem, 2.5vw)" }}>
                <BlockMath math={String.raw`i\hbar\frac{\partial}{\partial t}|\psi(t)\rangle = \hat{H}|\psi(t)\rangle`} />
              </div>
              <p className={`text-xs text-slate-400 mt-4 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "This equation describes exactly how the state vector |ψ⟩ moves through Hilbert space as time (t) ticks forward, driven by the Hamiltonian energy operator (Ĥ).",
                  "សមីការនេះរៀបរាប់យ៉ាងច្បាស់អំពីរបៀបដែលវ៉ិចទ័រស្ថានភាព |ψ⟩ ផ្លាស់ទីឆ្លងកាត់លំហហ៊ីលប៊ឺត នៅពេលដែលពេលវេលា (t) ដើរទៅមុខ ដោយរុញច្រានដោយកម្លាំងថាមពលហាមីលតូនីញៀន (Ĥ)។"
                )}
              </p>
            </div>
          </div>

          {/* Axioms Box */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-2">
              <Layers className="w-6 h-6 text-indigo-400" />
              <h2 className={`text-2xl font-bold text-white ${isKh ? "font-khmer" : ""}`}>
                {t("The 5 Rules of the Arena", "វិធានទាំង ៥ នៃទីលាន")}
              </h2>
            </div>
            
            {/* Axiom list */}
            <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: "400px" }}>
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850">
                <h4 className="text-indigo-300 font-bold font-mono">1. Vector Addition</h4>
                <p className={`text-slate-400 text-sm mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "You can add two states together to create a new valid state. This is the mathematical basis for Quantum Superposition.",
                    "អ្នកអាចបូកស្ថានភាពពីរចូលគ្នាដើម្បីបង្កើតស្ថានភាពថ្មីមួយទៀតដែលត្រឹមត្រូវ។ នេះជាមូលដ្ឋានគណិតវិទ្យាសម្រាប់ Quantum Superposition។"
                  )}
                </p>
              </div>

              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850">
                <h4 className="text-indigo-300 font-bold font-mono">2. Scalar Multiplication</h4>
                <p className={`text-slate-400 text-sm mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "You can stretch or shrink a vector using complex numbers (numbers with real and imaginary parts).",
                    "អ្នកអាចពង្រីក ឬបង្រួមវ៉ិចទ័រដោយប្រើចំនួនកុំផ្លិច (ចំនួនដែលមានផ្នែកពិតនិងនិម្មិត)។"
                  )}
                </p>
              </div>

              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850">
                <h4 className="text-indigo-300 font-bold font-mono">3. Inner Product</h4>
                <p className={`text-slate-400 text-sm mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "A way to multiply two vectors to get a number. It measures how much two states overlap, allowing us to calculate probabilities: P = |⟨φ|ψ⟩|²",
                    "វិធីគុណវ៉ិចទ័រពីរដើម្បីទទួលបានលេខមួយ។ វាវាស់ថាតើស្ថានភាពពីរត្រួតស៊ីគ្នាប៉ុនណា ដែលអនុញ្ញាតឱ្យយើងគណនាប្រូបាប៊ីលីតេ៖ P = |⟨φ|ψ⟩|²"
                  )}
                </p>
              </div>

              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850">
                <h4 className="text-indigo-300 font-bold font-mono">4. Normalization</h4>
                <p className={`text-slate-400 text-sm mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "The total probability of all possible outcomes must exactly equal 100% (or 1). Every valid state vector has a length of 1.",
                    "ប្រូបាប៊ីលីតេសរុបនៃលទ្ធផលដែលអាចកើតមានទាំងអស់ត្រូវតែស្មើ ១០០% (ឬ ១) គត់។ រាល់វ៉ិចទ័រស្ថានភាពត្រឹមត្រូវមានប្រវែង ១។"
                  )}
                </p>
              </div>

              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850">
                <h4 className="text-indigo-300 font-bold font-mono">5. Completeness</h4>
                <p className={`text-slate-400 text-sm mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "There are no 'holes' in the space. Sequences of vectors that get closer together will always converge to a valid state inside the space.",
                    "គ្មាន 'ប្រហោង' នៅក្នុងលំហទេ។ លំដាប់នៃវ៉ិចទ័រដែលខិតជិតគ្នា នឹងតែងតែរួបរួមទៅជាស្ថានភាពត្រឹមត្រូវនៅក្នុងលំហជានិច្ច។"
                  )}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Visualizer: Bloch Sphere Simulator */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6 w-full mt-4">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase mb-2 bg-indigo-950/50 px-3 py-1 rounded-full">
              {t("INTERACTIVE SIMULATOR", "កម្មវិធីត្រាប់តាមអន្តរកម្ម")}
            </span>
            <h2 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.8rem, 3.5vw)" }}>
              {t("Quantum Spin-½ & The Bloch Sphere", "កង់ទិច Spin-½ និងស្វ៊ែរ Bloch")}
            </h2>
            <p className={`text-slate-400 mt-2 max-w-2xl ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "A qubit lives in a 2-dimensional complex Hilbert space. Because normal vectors must sum to a total probability of 1, we can map every possible state to the surface of a 3D sphere: The Bloch Sphere.",
                "Qubit រស់នៅក្នុងលំហហ៊ីលប៊ឺតកុំផ្លិច ២ វិមាត្រ។ ដោយសារវ៉ិចទ័រត្រូវមានផលបូកប្រូបាប៊ីលីតេសរុបស្មើ ១ យើងអាចគូរស្ថានភាពដែលអាចមានទាំងអស់ទៅលើផ្ទៃស្វ៊ែរ ៣ វិមាត្រ៖ ស្វ៊ែរ Bloch។"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* Visual Bloch Sphere SVG & Probabilities (Col Span 5) */}
            <div className="lg:col-span-5 bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center">
              <h3 className="text-slate-300 font-bold font-mono text-sm mb-6 uppercase tracking-widest">
                {t("State Vector Projector", "ឧបករណ៍បញ្ចាំងវ៉ិចទ័រស្ថានភាព")}
              </h3>
              
              {/* SVG Bloch Sphere Graphic */}
              <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center mb-6">
                <svg viewBox="-150 -150 300 300" className="w-full h-full overflow-visible">
                  {/* Sphere Outline */}
                  <circle cx="0" cy="0" r="100" fill="rgba(15,23,42,0.5)" stroke="#334155" strokeWidth="2" />
                  
                  {/* Equator */}
                  <ellipse cx="0" cy="0" rx="100" ry="30" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
                  
                  {/* Z Axis (Up/Down) */}
                  <line x1="0" y1="-120" x2="0" y2="120" stroke="#64748b" strokeWidth="1" />
                  <text x="0" y="-130" fill="#cbd5e1" fontSize="14" textAnchor="middle" fontWeight="bold">|↑⟩</text>
                  <text x="0" y="140" fill="#cbd5e1" fontSize="14" textAnchor="middle" fontWeight="bold">|↓⟩</text>
                  
                  {/* X Axis (Front/Back) */}
                  <line x1="-80" y1="40" x2="80" y2="-40" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="-95" y="50" fill="#94a3b8" fontSize="12" textAnchor="middle">|+⟩</text>

                  {/* Y Axis (Left/Right) */}
                  <line x1="-120" y1="0" x2="120" y2="0" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="135" y="5" fill="#94a3b8" fontSize="12" textAnchor="middle">|i⟩</text>
                  
                  {/* Dynamic State Vector */}
                  <line x1="0" y1="0" x2={px} y2={py} stroke="#6366f1" strokeWidth="4" />
                  <circle cx={px} cy={py} r="6" fill="#818cf8" className="drop-shadow-[0_0_10px_#818cf8]" />
                  
                  {/* Vector Label */}
                  <text x={px + 10} y={py - 10} fill="#ffffff" fontSize="16" fontWeight="bold">|ψ⟩</text>
                </svg>
              </div>

              {/* Dynamic Probabilities Bar */}
              <div className="w-full flex flex-col gap-2 mt-auto">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>P(|↑⟩) = {(probUp * 100).toFixed(1)}%</span>
                  <span>P(|↓⟩) = {(probDown * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-800">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-100 ease-linear" 
                    style={{ width: `${probUp * 100}%` }}
                  />
                  <div 
                    className="h-full bg-rose-500 transition-all duration-100 ease-linear" 
                    style={{ width: `${probDown * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-center text-slate-500 mt-1 uppercase tracking-widest font-mono">
                  {t("Total Probability = 1.0 (Normalization)", "ប្រូបាប៊ីលីតេសរុប = ១.០ (Normalization)")}
                </span>
              </div>
            </div>

            {/* Math Engine & Sliders (Col Span 7) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              {/* Massive Math Output */}
              <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-6 md:p-8 flex items-center justify-center min-h-[200px] overflow-x-auto overflow-y-hidden text-center shadow-inner">
                <div className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" style={{ fontSize: "max(1.5rem, 3.5vw)" }}>
                  <BlockMath 
                    math={String.raw`|\psi\rangle = \cos\frac{\theta}{2}|{\uparrow}\rangle + e^{i\phi}\sin\frac{\theta}{2}|{\downarrow}\rangle`} 
                  />
                  <div className="mt-8 text-indigo-200" style={{ fontSize: "max(1.2rem, 2.5vw)" }}>
                    <BlockMath 
                      math={String.raw`|\psi\rangle = ${cosThetaHalf.toFixed(2)}|{\uparrow}\rangle ${signSin} e^{${phiText ? "i" + phiText : "0"}}${Math.abs(sinThetaHalf).toFixed(2)}|{\downarrow}\rangle`} 
                    />
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col gap-8">
                
                {/* Theta Slider */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <label className={`text-slate-300 font-bold ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1rem, 1.2vw)" }}>
                      {t("Polar Angle θ (Theta)", "មុំប៉ូល θ (ថីតា)")}
                    </label>
                    <span className="text-indigo-400 font-mono font-bold bg-indigo-900/40 px-3 py-1 rounded-lg text-lg">
                      {(theta * (180 / Math.PI)).toFixed(0)}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={Math.PI}
                    step={Math.PI / 180}
                    value={theta}
                    onChange={(e) => setTheta(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800 h-3 rounded-lg appearance-none cursor-pointer hover:accent-indigo-400 transition-colors"
                  />
                  <p className={`text-xs text-slate-500 ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {t(
                      "Controls the mix between Spin-Up |↑⟩ and Spin-Down |↓⟩. At 0°, it's 100% Up. At 180°, it's 100% Down.",
                      "គ្រប់គ្រងភាគរយរវាង Spin-Up |↑⟩ និង Spin-Down |↓⟩។ នៅមុំ 0° គឺ Up ១០០%។ នៅមុំ 180° គឺ Down ១០០%។"
                    )}
                  </p>
                </div>

                {/* Phi Slider */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <label className={`text-slate-300 font-bold ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1rem, 1.2vw)" }}>
                      {t("Azimuthal Angle / Phase φ (Phi)", "មុំអាហ្ស៊ីមុត / ផាស φ (ហ្វី)")}
                    </label>
                    <span className="text-rose-400 font-mono font-bold bg-rose-900/40 px-3 py-1 rounded-lg text-lg">
                      {(phi * (180 / Math.PI)).toFixed(0)}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={2 * Math.PI}
                    step={Math.PI / 180}
                    value={phi}
                    onChange={(e) => setPhi(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 bg-slate-800 h-3 rounded-lg appearance-none cursor-pointer hover:accent-rose-400 transition-colors"
                  />
                  <p className={`text-xs text-slate-500 ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {t(
                      "Controls the complex phase (e^iφ). This doesn't change the probability of measuring Up/Down, but dictates how this state interferes with others.",
                      "គ្រប់គ្រងផាសកុំផ្លិច (e^iφ)។ វាមិនផ្លាស់ប្តូរប្រូបាប៊ីលីតេនៃការវាស់ Up/Down ទេ ប៉ុន្តែកំណត់ពីរបៀបដែលស្ថានភាពនេះជ្រៀតជ្រែកជាមួយស្ថានភាពផ្សេងទៀត។"
                    )}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
