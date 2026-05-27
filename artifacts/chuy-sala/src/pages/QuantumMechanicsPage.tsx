import React, { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Atom,
  HelpCircle,
  Activity,
  Sparkles,
  BookOpen,
  Info,
  Sliders,
  Layers,
  Award,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import "katex/dist/katex.min.css";

export default function QuantumMechanicsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Sliders state for Bohr model calculations
  const [atomicNumberZ, setAtomicNumberZ] = useState<number>(1); // Z (1 to 6)
  const [quantumNumberN, setQuantumNumberN] = useState<number>(1); // n (1 to 5)

  // Elements definitions matching atomic number Z
  const elementSymbols: Record<number, { symbol: string; nameEn: string; nameKh: string }> = {
    1: { symbol: "H", nameEn: "Hydrogen", nameKh: "អ៊ីដ្រូសែន" },
    2: { symbol: "He", nameEn: "Helium", nameKh: "អេល្យូម" },
    3: { symbol: "Li", nameEn: "Lithium", nameKh: "លីចូម" },
    4: { symbol: "Be", nameEn: "Beryllium", nameKh: "បេរីល្យូម" },
    5: { symbol: "B", nameEn: "Boron", nameKh: "បូរ" },
    6: { symbol: "C", nameEn: "Carbon", nameKh: "កាបូន" },
  };

  // Perform live calculations based on state Z and n
  // Bohr Radius r_n = 0.529 * n^2 / Z
  const calculatedRadius = (0.529 * (quantumNumberN * quantumNumberN)) / atomicNumberZ;
  // Bohr Energy E_n = -13.6 * Z^2 / n^2
  const calculatedEnergy = (-13.6 * (atomicNumberZ * atomicNumberZ)) / (quantumNumberN * quantumNumberN);

  const selectedElement = elementSymbols[atomicNumberZ] || elementSymbols[1];

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background radial matrix glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20 font-sans">
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
            <Atom className="w-5 h-5 text-indigo-400 animate-spin-slow" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-500 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Atomic Structure & Quantum Mechanics", "រចនាសម្ព័ន្ធអាតូម និងមេកានិចកង់ទិច")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block font-mono">
            <span>CHEM-QUANTUM-PHYSICS</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content Layout */}
      <main className="flex-grow w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-8">
        
        {/* Top Section: Bohr Visualizer (left) and live calculations + controls (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. Interactive Bohr Model (Col Span 7) */}
          <section className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase block mb-1">
                {t("INTERACTIVE BOHR MODEL", "គំរូអាតូមប៊័រអន្តរកម្ម")}
              </span>
              <h2
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.3rem, 2.5vw)" }}
              >
                {t("Bohr Electron Orbit Visualizer", "ឧបករណ៍ពិសោធន៍គន្លងអេឡិចត្រុង Bohr")}
              </h2>
              <p className={`text-slate-400 text-xs mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Adjust the sliders below to modify the nuclear charge (Z) and the active electron shell (n) to watch the electron jump shells and recalculate radius and energy.",
                  "សារ៉េបាររំកិលខាងក្រោម ដើម្បីកែប្រែបន្ទុកស្នូលអាតូម (Z) និងស្រទាប់អេឡិចត្រុងសកម្ម (n) ដើម្បីមើលអេឡិចត្រុងលោតផ្លោះស្រទាប់ និងគណនាកាំគន្លង រួមទាំងកម្រិតថាមពលឡើងវិញ។"
                )}
              </p>
            </div>

            {/* SVG Visualizer Container */}
            <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-850 p-4 flex items-center justify-center min-h-[380px] sm:min-h-[420px] relative overflow-hidden">
              <svg viewBox="0 0 400 400" className="w-full max-w-[360px] h-auto select-none">
                
                {/* Embed style block for continuous CSS rotation animation */}
                <style>{`
                  @keyframes orbit-rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  .electron-orbit-spin {
                    animation: orbit-rotate 7s linear infinite;
                    transform-origin: 200px 200px;
                  }
                `}</style>

                {/* Grid reference backgrounds */}
                <defs>
                  <pattern id="bohrgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(99,102,241,0.03)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#bohrgrid)" />

                {/* ── Orbits (Dashed Concentric Circles) ── */}
                {Array.from({ length: 5 }).map((_, idx) => {
                  const currentOrbitN = idx + 1;
                  const orbitRadius = currentOrbitN * 32; // Scaling factor
                  const isActive = currentOrbitN === quantumNumberN;

                  return (
                    <g key={idx}>
                      <circle
                        cx="200"
                        cy="200"
                        r={orbitRadius}
                        fill="none"
                        stroke={isActive ? "#6366f1" : "#334155"}
                        strokeWidth={isActive ? "2.5" : "1"}
                        strokeDasharray={isActive ? "none" : "4 4"}
                        className="transition-all duration-300"
                      />
                      {/* Orbit shell number label */}
                      <text
                        x="200"
                        y={200 - orbitRadius - 4}
                        fill={isActive ? "#818cf8" : "#475569"}
                        fontSize="8"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        n={currentOrbitN}
                      </text>
                    </g>
                  );
                })}

                {/* ── Nucleus (Center) ── */}
                <circle
                  cx="200"
                  cy="200"
                  r="18"
                  fill="#ef4444"
                  className="drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                />
                <text
                  x="200"
                  y="204"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="black"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  +{atomicNumberZ}
                </text>

                {/* ── Active Orbiting Electron ── */}
                <g className="electron-orbit-spin">
                  <circle
                    cx="200"
                    cy={200 - quantumNumberN * 32}
                    r="7.5"
                    fill="#38bdf8"
                    className="drop-shadow-[0_0_12px_#38bdf8]"
                  />
                  <text
                    x="200"
                    y={200 - quantumNumberN * 32 + 3}
                    fill="#000000"
                    fontSize="8"
                    fontWeight="black"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    e⁻
                  </text>
                </g>

                {/* Legend indicator labels */}
                <g transform="translate(10, 360)">
                  <circle cx="10" cy="10" r="5" fill="#ef4444" />
                  <text x="22" y="14" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">
                    {t(`Nucleus (Z = ${atomicNumberZ})`, `ស្នូលអាតូម (Z = ${atomicNumberZ})`)}
                  </text>
                  <circle cx="100" cy="10" r="5" fill="#38bdf8" />
                  <text x="112" y="14" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">
                    {t("Electron (e⁻)", "អេឡិចត្រុង (e⁻)")}
                  </text>
                </g>
              </svg>
            </div>
          </section>

          {/* 2. Bohr Controls & Math Calculations Panel (Col Span 5) */}
          <section className="lg:col-span-5 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase block mb-1">
                {t("MODEL CONTROLS & MATH", "ការគ្រប់គ្រង និងការគណនាគំរូ")}
              </span>
              <h3 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.1rem, 2.2vw)" }}>
                {t("Bohr Quantum Calculations", "រូបមន្តនិងតម្លៃគណនា Bohr")}
              </h3>
            </div>

            {/* Sliders Control Panel */}
            <div className="flex flex-col gap-5 bg-slate-950 p-5 rounded-2xl border border-slate-850">
              
              {/* Slider 1: Atomic Number Z */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                    {t("Atomic Number / Nuclear Charge (Z)", "លេខអាតូម / បន្ទុកស្នូលអាតូម (Z)")}
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded">
                    Z = {atomicNumberZ} ({selectedElement.symbol})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Sliders className="w-4 h-4 text-slate-500 shrink-0" />
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={atomicNumberZ}
                    onChange={(e) => setAtomicNumberZ(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <span className={`text-[10px] text-slate-500 block ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    `Selected Element: ${selectedElement.nameEn} (Z = ${atomicNumberZ})`,
                    `ធាតុគីមីជ្រើសរើស៖ ${selectedElement.nameKh} (Z = ${atomicNumberZ})`
                  )}
                </span>
              </div>

              {/* Slider 2: Quantum Number n */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                    {t("Principal Quantum Number (n)", "លេខកង់ទិចចម្បង (n)")}
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded">
                    n = {quantumNumberN}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-slate-500 shrink-0" />
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={quantumNumberN}
                    onChange={(e) => setQuantumNumberN(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <span className={`text-[10px] text-slate-500 block ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    `Defines electron orbit shell radius. Higher n means larger distance from nucleus.`,
                    `កំណត់កាំគន្លងស្រទាប់អេឡិចត្រុង។ n កាន់តែធំ អេឡិចត្រុងកាន់តែនៅឆ្ងាយពីស្នូល។`
                  )}
                </span>
              </div>

            </div>

            {/* Live Calculations Dashboard */}
            <div className="flex flex-col gap-4 flex-grow">
              <span className={`text-[10px] text-slate-400 font-mono uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                {t("BOHR DYNAMIC CALCULATIONS", "លទ្ធផលគណនា Bohr ផ្ទាល់")}
              </span>
              
              <div className="grid grid-cols-1 gap-4">
                
                {/* Radius Calculation Card */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-850 flex flex-col gap-2">
                  <span className="text-[10px] text-indigo-300 font-mono block uppercase">BOHR ORBIT RADIUS (កាំគន្លង Bohr)</span>
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-850 text-center font-bold text-sm text-indigo-400 overflow-x-auto">
                    <BlockMath math={String.raw`r_n = 0.529 \cdot \frac{n^2}{Z} \;\text{\AA}`} />
                    <div className="mt-2 text-white text-base">
                      <InlineMath math={String.raw`r_{${quantumNumberN}} = 0.529 \cdot \frac{${quantumNumberN}^2}{${atomicNumberZ}} = ${calculatedRadius.toFixed(4)}\;\text{\AA}`} />
                    </div>
                  </div>
                </div>

                {/* Energy Calculation Card */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-850 flex flex-col gap-2">
                  <span className="text-[10px] text-indigo-300 font-mono block uppercase">ELECTRON ENERGY LEVEL (កម្រិតថាមពលអេឡិចត្រុង)</span>
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-850 text-center font-bold text-sm text-indigo-400 overflow-x-auto">
                    <BlockMath math={String.raw`E_n = -13.6 \cdot \frac{Z^2}{n^2} \;\text{eV}`} />
                    <div className="mt-2 text-white text-base">
                      <InlineMath math={String.raw`E_{${quantumNumberN}} = -13.6 \cdot \frac{${atomicNumberZ}^2}{${quantumNumberN}^2} = ${calculatedEnergy.toFixed(2)}\;\text{eV}`} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>

        {/* Middle Section: Formula Grid and Constants Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          
          {/* 3. The Quantum Mechanics Formula Grid (Col Span 8) */}
          <section className="lg:col-span-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <h3 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.2rem, 2.2vw)" }}>
                {t("Quantum Mechanics Formula Grid", "តារាងរូបមន្តមេកានិចកង់ទិច")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Wave-Particle Duality */}
              <div className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col gap-3">
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase block border-b border-slate-850 pb-2">
                  {t("Wave-Particle Duality", "ទ្វេភាពរលក-ភាគល្អិត")}
                </span>
                <div className="bg-slate-900/60 p-3.5 rounded-xl text-center border border-slate-800 text-indigo-300 font-bold overflow-x-auto flex flex-col gap-2">
                  <BlockMath math={String.raw`\lambda = \dfrac{h}{p}`} />
                  <BlockMath math={String.raw`\Delta x \Delta p \;\ge\; \dfrac{h}{4\pi}`} />
                </div>
                <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "de Broglie relation links particles momentum (p) to wavelength (λ). Heisenberg state limits knowing exact position (x) and momentum (p) together.",
                    "ទំនាក់ទំនង de Broglie ភ្ជាប់សន្ទុះភាគល្អិត (p) ទៅនឹងប្រវែងរលក (λ)។ គោលការណ៍ Uncertainty ហៃសិនបឺគកំណត់លក្ខខណ្ឌមិនអាចដឹងទីតាំង (x) និងសន្ទុះ (p) ច្បាស់លាស់ជាមួយគ្នា។"
                  )}
                </p>
              </div>

              {/* Card 2: Spectroscopy & Rydberg */}
              <div className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col gap-3">
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase block border-b border-slate-850 pb-2">
                  {t("Spectroscopy & Rydberg", "វិសាលគមវិទ្យា និងរីដប៊ឺគ")}
                </span>
                <div className="bg-slate-900/60 p-3.5 rounded-xl text-center border border-slate-800 text-indigo-300 font-bold overflow-x-auto">
                  <BlockMath math={String.raw`\dfrac{1}{\lambda} = R Z^2 \left[ \dfrac{1}{n_1^2} - \dfrac{1}{n_2^2} \right]`} />
                </div>
                <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Rydberg formula calculates energy wavelengths emitted during transitions between energy levels (n₁ and n₂) for hydrogen-like elements.",
                    "រូបមន្ត Rydberg គណនាប្រវែងរលកថាមពលពន្លឺដែលបញ្ចេញអំឡុងពេលអេឡិចត្រុងលោតប្តូរស្រទាប់ (n₁ និង n₂) សម្រាប់ធាតុស្រដៀងអ៊ីដ្រូសែន។"
                  )}
                </p>
              </div>

              {/* Card 3: Atomic Number & Effective Charge */}
              <div className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col gap-3">
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase block border-b border-slate-850 pb-2">
                  {t("Basic Relations & Shielding", "ទំនាក់ទំនងមូលដ្ឋាន និងបន្ទុកស្នូល")}
                </span>
                <div className="bg-slate-900/60 p-3.5 rounded-xl text-center border border-slate-800 text-indigo-300 font-bold overflow-x-auto flex flex-col gap-2">
                  <BlockMath math={String.raw`A = Z + N`} />
                  <BlockMath math={String.raw`Z_{\text{eff}} = Z - \sigma \quad \text{(Slater's Rule)}`} />
                </div>
                <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Zeff is the net positive charge felt by valence electrons. Core electrons screen/shield (σ) them from the full nuclear charge Z.",
                    "Zeff គឺជាបន្ទុកវិជ្ជមានពិតដែលរងឥទ្ធិពលលើអេឡិចត្រុងក្រៅ។ អេឡិចត្រុងស្រទាប់ក្នុងជួយរារាំង/បិទបាំង (σ) ពីបន្ទុកស្នូលសរុប Z។"
                  )}
                </p>
              </div>

              {/* Card 4: Kinetic Speed */}
              <div className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col gap-3">
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase block border-b border-slate-850 pb-2">
                  {t("Gas Kinetics & Speed", "ចលនសាស្ត្រឧស្ម័ន និងល្បឿន")}
                </span>
                <div className="bg-slate-900/60 p-3.5 rounded-xl text-center border border-slate-800 text-indigo-300 font-bold overflow-x-auto">
                  <BlockMath math={String.raw`v_{\text{rms}} = \sqrt{\dfrac{3kT}{m}}`} />
                </div>
                <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Calculates root-mean-square kinetic speed of gas particles based on temperature (T), particle mass (m), and Boltzmann constant (k).",
                    "គណនាល្បឿនមធ្យមកំដៅ (v_rms) នៃភាគល្អិតឧស្ម័ន ផ្អែកលើសីតុណ្ហភាព (T) ម៉ាស់ភាគល្អិត (m) និងថេរលីមីត Boltzmann (k)។"
                  )}
                </p>
              </div>

            </div>
          </section>

          {/* 4. Constants Sidebar (Col Span 4) */}
          <section className="lg:col-span-4 bg-indigo-950/20 border border-indigo-500/20 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Activity className="w-5 h-5 shrink-0" />
              <h3 className={`font-bold ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.1rem, 2vw)" }}>
                {t("Physical Constants Reference", "តារាងតម្លៃថេររូបវិទ្យា")}
              </h3>
            </div>
            
            <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Essential physical constants referenced across chemistry calculations and quantum structural equations.",
                "តម្លៃថេររូបវិទ្យាជាសារវន្តដែលប្រើប្រាស់ក្នុងការគណនាគីមី និងសមីការទាក់ទងនឹងមេកានិចកង់ទិច។"
              )}
            </p>

            <div className="flex flex-col gap-3 mt-2 text-xs">
              
              {/* Planck Constant */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-indigo-900/30">
                <span className="text-[10px] text-indigo-300 font-mono block mb-1">PLANCK'S CONSTANT (ថេរផ្លង់)</span>
                <div className="font-bold text-white font-mono">
                  <InlineMath math={String.raw`h = 6.626 \times 10^{-34} \text{ J}\cdot\text{s}`} />
                </div>
              </div>

              {/* Elementary Charge */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-indigo-900/30">
                <span className="text-[10px] text-indigo-300 font-mono block mb-1">ELEMENTARY CHARGE (បន្ទុកបឋម)</span>
                <div className="font-bold text-white font-mono">
                  <InlineMath math={String.raw`e = 1.602 \times 10^{-19} \text{ C}`} />
                </div>
              </div>

              {/* Electron Mass */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-indigo-900/30">
                <span className="text-[10px] text-indigo-300 font-mono block mb-1">REST ELECTRON MASS (ម៉ាស់អេឡិចត្រុង)</span>
                <div className="font-bold text-white font-mono">
                  <InlineMath math={String.raw`m_e = 9.109 \times 10^{-31} \text{ kg}`} />
                </div>
              </div>

              {/* Bohr Radius */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-indigo-900/30">
                <span className="text-[10px] text-indigo-300 font-mono block mb-1">BOHR RADIUS (កាំប៊័រទី១)</span>
                <div className="font-bold text-white font-mono">
                  <InlineMath math={String.raw`a_0 = 0.529 \text{ \AA} \quad (5.292 \times 10^{-11} \text{ m})`} />
                </div>
              </div>

              {/* Rydberg Constant */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-indigo-900/30">
                <span className="text-[10px] text-indigo-300 font-mono block mb-1">RYDBERG CONSTANT (ថេររីដប៊ឺគ)</span>
                <div className="font-bold text-white font-mono">
                  <InlineMath math={String.raw`R_\infty = 1.097 \times 10^{7} \text{ m}^{-1}`} />
                </div>
              </div>

              {/* Boltzmann Constant */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-indigo-900/30">
                <span className="text-[10px] text-indigo-300 font-mono block mb-1">BOLTZMANN CONSTANT (ថេរបុលស្មាន)</span>
                <div className="font-bold text-white font-mono">
                  <InlineMath math={String.raw`k = 1.381 \times 10^{-23} \text{ J}\cdot\text{K}^{-1}`} />
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* Bottom Section: Electron Configuration Table & Quantum Numbers definitions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          
          {/* Left Block: Quantum Numbers Definitions Table (Col Span 7) */}
          <section className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <h3 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.2rem, 2.2vw)" }}>
                {t("The Four Quantum Numbers & Subshells", "លេខកង់ទិចទាំងបួន និងស្រទាប់រង")}
              </h3>
            </div>

            {/* Quantum Numbers Description Table */}
            <div className="overflow-x-auto bg-slate-950 rounded-2xl border border-slate-850">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
                    <th className="p-4 font-bold">{t("Name & Symbol", "ឈ្មោះ និងនិមិត្តសញ្ញា")}</th>
                    <th className="p-4 font-bold">{t("Allowed Values", "តម្លៃអនុញ្ញាត")}</th>
                    <th className="p-4 font-bold">{t("Physical Meaning", "អត្ថន័យរូបវិទ្យា")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-slate-300">
                  <tr>
                    <td className="p-4 font-bold text-indigo-300">
                      {t("Principal (n)", "ចម្បង (n)")}
                    </td>
                    <td className="p-4 font-mono">1, 2, 3, 4, ...</td>
                    <td className={`p-4 ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t("Orbit size and electron shell energy level.", "ទំហំស្រទាប់ និងកម្រិតថាមពលសរុបនៃស្រទាប់អេឡិចត្រុង។")}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-indigo-300">
                      {t("Angular Momentum (l)", "គន្លងរង / អរតូកូណាល់ (l)")}
                    </td>
                    <td className="p-4 font-mono">0 to n - 1 (s, p, d, f)</td>
                    <td className={`p-4 ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t("Shape of the orbital subshell (s=0, p=1, d=2, f=3).", "រាងធរណីមាត្រនៃស្រទាប់រង (s=0, p=1, d=2, f=3)។")}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-indigo-300">
                      {t("Magnetic (m_l)", "ម៉ាញេទិច (m_l)")}
                    </td>
                    <td className="p-4 font-mono">-l to +l</td>
                    <td className={`p-4 ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t("Spatial orientation of the orbital in space.", "ទិសដៅតម្រង់របស់គន្លងរងនៅក្នុងលំហបីវិមាត្រ។")}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-indigo-300">
                      {t("Spin (m_s)", "ស្ពីន (m_s)")}
                    </td>
                    <td className="p-4 font-mono">+1/2, -1/2</td>
                    <td className={`p-4 ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t("Spin orientation of the electron (clockwise/counter-clockwise).", "ទិសដៅបង្វិលខ្លួនឯងរបស់អេឡិចត្រុង (ស្រប/ច្រាសទ្រនិចនាឡិកា)។")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Subshell Capacities Block */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
              <span className="text-[10px] text-slate-500 font-mono block uppercase mb-2">
                {t("SUBSHELL ELECTRON CAPACITIES", "ចំណុះអេឡិចត្រុងអតិបរមានៃស្រទាប់រង")}
              </span>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 font-mono">s subshell (l=0)</span>
                  <span className="block text-lg font-black text-white font-mono mt-1">2 e⁻</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 font-mono">p subshell (l=1)</span>
                  <span className="block text-lg font-black text-white font-mono mt-1">6 e⁻</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 font-mono">d subshell (l=2)</span>
                  <span className="block text-lg font-black text-white font-mono mt-1">10 e⁻</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 font-mono">f subshell (l=3)</span>
                  <span className="block text-lg font-black text-white font-mono mt-1">14 e⁻</span>
                </div>
              </div>
            </div>
          </section>

          {/* Right Block: Golden Rules of Electron Configuration (Col Span 5) */}
          <section className="lg:col-span-5 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <h3 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.2rem, 2.2vw)" }}>
                {t("Golden Rules of Electron Filling", "វិធានមាសនៃការបំពេញអេឡិចត្រុង")}
              </h3>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              
              {/* Aufbau Principle */}
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 flex flex-col gap-1.5">
                <span className="text-xs font-bold text-indigo-300">
                  {t("1. Aufbau Principle (គោលការណ៍ Aufbau)", "១. គោលការណ៍ Aufbau (Aufbau Principle)")}
                </span>
                <p className={`text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Electrons must fill the lowest available energy subshells first (e.g., 1s → 2s → 2p → 3s) before transitioning to higher subshells.",
                    "អេឡិចត្រុងត្រូវបំពេញក្នុងស្រទាប់រងដែលមានកម្រិតថាមពលទាបបំផុតជាមុនសិន (ឧ. 1s → 2s → 2p → 3s) មុននឹងបន្តទៅបំពេញស្រទាប់ខ្ពស់ៗ។"
                  )}
                </p>
              </div>

              {/* Pauli Exclusion Principle */}
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 flex flex-col gap-1.5">
                <span className="text-xs font-bold text-indigo-300">
                  {t("2. Pauli Exclusion Principle (គោលការណ៍ផូលី)", "២. គោលការណ៍ផូលី (Pauli Exclusion Principle)")}
                </span>
                <p className={`text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "An orbital can hold at most two electrons, and they must have opposite spin states (opposite magnetic spin orientations, +1/2 and -1/2).",
                    "គន្លងរងនីមួយៗអាចផ្ទុកអេឡិចត្រុងបានអតិបរមាតែពីរនាក់ប៉ុណ្ណោះ ហើយពួកគេត្រូវមានស្ពីនបង្វិលខ្លួនផ្ទុយគ្នា (+១/២ និង -១/២)។"
                  )}
                </p>
              </div>

              {/* Hund's Rule */}
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850 flex flex-col gap-1.5">
                <span className="text-xs font-bold text-indigo-300">
                  {t("3. Hund's Rule of Maximum Multiplicity (វិធានហ៊ុន)", "៣. វិធានហ៊ុន (Hund's Rule)")}
                </span>
                <p className={`text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "For degenerate orbitals (orbitals with the same energy, like p or d), electrons occupy them singly first with parallel spins before pairing up.",
                    "សម្រាប់គន្លងដែលមានកម្រិតថាមពលស្មើគ្នា (ដូចជាស្រទាប់រង p ឬ d) អេឡិចត្រុងត្រូវបំពេញម្តងមួយៗជាមុនសិន មុននឹងផ្គូផ្គងជាគូ។"
                  )}
                </p>
              </div>

            </div>
          </section>

        </div>

      </main>
    </div>
  );
}
