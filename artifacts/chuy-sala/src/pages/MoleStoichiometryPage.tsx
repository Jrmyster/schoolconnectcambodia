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
  CheckSquare,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import "katex/dist/katex.min.css";

// Type for the active conversion pathway selected on the Mole Map
type ConversionPath =
  | "mass_to_moles"
  | "moles_to_mass"
  | "moles_to_particles"
  | "particles_to_moles"
  | "volume_to_moles"
  | "moles_to_volume"
  | null;

export default function MoleStoichiometryPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // State to track selected flowchart conversion arrow
  const [selectedPath, setSelectedPath] = useState<ConversionPath>("mass_to_moles");
  
  // Golden Rules state
  const [rulesChecked, setRulesChecked] = useState<{ rule1: boolean; rule2: boolean }>({
    rule1: false,
    rule2: false,
  });

  const toggleRule = (ruleKey: "rule1" | "rule2") => {
    setRulesChecked((prev) => ({ ...prev, [ruleKey]: !prev[ruleKey] }));
  };

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
              {t("The Mole Concept & Stoichiometry", "គំនិតម៉ូល និងស្តូគីយូម៉ែត្រ")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block font-mono">
            <span>CHEM-MOLE-STOICH</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content Layout */}
      <main className="flex-grow w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-8">
        
        {/* Top Split Layout: Flowchart visualizer (left) and Path explanations & Checklist (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. Interactive 'Mole Map' Visualizer Flowchart (Col Span 7) */}
          <section className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase block mb-1">
                {t("INTERACTIVE MOLE MAP", "ផែនទីគំនិតម៉ូលអន្តរកម្ម")}
              </span>
              <h2
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.3rem, 2.5vw)" }}
              >
                {t("The Stoichiometric Highway", "បណ្តាញបំលែងរូបមន្តស្តូគីយូម៉ែត្រ")}
              </h2>
              <p className={`text-slate-400 text-xs mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Click the connecting arrows in the flowchart below to reveal the specific conversion formulas and chemical calculations.",
                  "ចុចលើសញ្ញាព្រួញតភ្ជាប់ក្នុងគំនូសបំព្រួញខាងក្រោម ដើម្បីបង្ហាញរូបមន្តបំលែង និងរបៀបគណនាគីមីជាក់លាក់។"
                )}
              </p>
            </div>

            {/* SVG Visualizer Container */}
            <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-850 p-4 flex items-center justify-center min-h-[380px] sm:min-h-[420px] relative overflow-hidden">
              <svg viewBox="0 0 600 420" className="w-full max-w-[550px] h-auto select-none">
                
                {/* SVG definitions for arrowhead shapes */}
                <defs>
                  <marker id="arrow-indigo" markerWidth="8" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
                  </marker>
                  <marker id="arrow-highlight" markerWidth="8" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#4f46e5" />
                  </marker>
                  <filter id="glow-moles">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* ── Outer Node 1: MASS (w) (x=120, y=90) ── */}
                <g>
                  <rect x="30" y="55" width="140" height="70" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                  <text x="100" y="85" fill="#e2e8f0" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    {t("MASS (w)", "ម៉ាស់ (w)")}
                  </text>
                  <text x="100" y="105" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    {t("grams (g)", "ក្រាម (g)")}
                  </text>
                </g>

                {/* ── Outer Node 2: PARTICLES (N) (x=470, y=90) ── */}
                <g>
                  <rect x="430" y="55" width="140" height="70" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                  <text x="500" y="85" fill="#e2e8f0" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    {t("PARTICLES (N)", "ភាគល្អិត (N)")}
                  </text>
                  <text x="500" y="105" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    {t("atoms / molecules", "អាតូម / ម៉ូលេគុល")}
                  </text>
                </g>

                {/* ── Outer Node 3: VOLUME OF GAS AT STP (V) (x=300, y=340) ── */}
                <g>
                  <rect x="200" y="305" width="200" height="70" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                  <text x="300" y="335" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    {t("GAS VOLUME AT STP (V)", "មាឌឧស្ម័ននៅ STP (V)")}
                  </text>
                  <text x="300" y="355" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    {t("Liters (L) / dm³", "លីត្រ (L) / dm³")}
                  </text>
                </g>

                {/* ── Center Node: MOLES (n) (x=300, y=200) ── */}
                <g filter="url(#glow-moles)">
                  <circle cx="300" cy="190" r="48" fill="#1e1b4b" stroke="#818cf8" strokeWidth="3" />
                  <text x="300" y="185" fill="#818cf8" fontSize="15" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">
                    {t("MOLES", "ម៉ូល")}
                  </text>
                  <text x="300" y="205" fill="#e0e7ff" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    (n)
                  </text>
                </g>

                {/* ── Conversion Arrows (Clickable Zones) ── */}

                {/* A. MASS <-> MOLES Pathway */}
                {/* 1. Mass -> Moles (Divide by M) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedPath("mass_to_moles")}
                >
                  <path
                    d="M 160,115 L 240,155"
                    fill="none"
                    stroke={selectedPath === "mass_to_moles" ? "#818cf8" : "#475569"}
                    strokeWidth={selectedPath === "mass_to_moles" ? "3.5" : "2"}
                    markerEnd="url(#arrow-indigo)"
                  />
                  <rect
                    x="180"
                    y="112"
                    width="42"
                    height="20"
                    rx="4"
                    fill={selectedPath === "mass_to_moles" ? "#818cf8" : "#1e293b"}
                    stroke={selectedPath === "mass_to_moles" ? "#818cf8" : "#475569"}
                    strokeWidth="1"
                  />
                  <text
                    x="201"
                    y="125"
                    fill={selectedPath === "mass_to_moles" ? "#0f172a" : "#94a3b8"}
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    ÷ M
                  </text>
                </g>

                {/* 2. Moles -> Mass (Multiply by M) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedPath("moles_to_mass")}
                >
                  <path
                    d="M 235,170 L 155,130"
                    fill="none"
                    stroke={selectedPath === "moles_to_mass" ? "#818cf8" : "#475569"}
                    strokeWidth={selectedPath === "moles_to_mass" ? "3.5" : "2"}
                    markerEnd="url(#arrow-indigo)"
                  />
                  <rect
                    x="175"
                    y="142"
                    width="42"
                    height="20"
                    rx="4"
                    fill={selectedPath === "moles_to_mass" ? "#818cf8" : "#1e293b"}
                    stroke={selectedPath === "moles_to_mass" ? "#818cf8" : "#475569"}
                    strokeWidth="1"
                  />
                  <text
                    x="196"
                    y="155"
                    fill={selectedPath === "moles_to_mass" ? "#0f172a" : "#94a3b8"}
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    × M
                  </text>
                </g>

                {/* B. MOLES <-> PARTICLES Pathway */}
                {/* 1. Moles -> Particles (Multiply by NA) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedPath("moles_to_particles")}
                >
                  <path
                    d="M 360,155 L 440,115"
                    fill="none"
                    stroke={selectedPath === "moles_to_particles" ? "#818cf8" : "#475569"}
                    strokeWidth={selectedPath === "moles_to_particles" ? "3.5" : "2"}
                    markerEnd="url(#arrow-indigo)"
                  />
                  <rect
                    x="378"
                    y="112"
                    width="46"
                    height="20"
                    rx="4"
                    fill={selectedPath === "moles_to_particles" ? "#818cf8" : "#1e293b"}
                    stroke={selectedPath === "moles_to_particles" ? "#818cf8" : "#475569"}
                    strokeWidth="1"
                  />
                  <text
                    x="401"
                    y="125"
                    fill={selectedPath === "moles_to_particles" ? "#0f172a" : "#94a3b8"}
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    × N_A
                  </text>
                </g>

                {/* 2. Particles -> Moles (Divide by NA) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedPath("particles_to_moles")}
                >
                  <path
                    d="M 445,130 L 365,170"
                    fill="none"
                    stroke={selectedPath === "particles_to_moles" ? "#818cf8" : "#475569"}
                    strokeWidth={selectedPath === "particles_to_moles" ? "3.5" : "2"}
                    markerEnd="url(#arrow-indigo)"
                  />
                  <rect
                    x="382"
                    y="142"
                    width="46"
                    height="20"
                    rx="4"
                    fill={selectedPath === "particles_to_moles" ? "#818cf8" : "#1e293b"}
                    stroke={selectedPath === "particles_to_moles" ? "#818cf8" : "#475569"}
                    strokeWidth="1"
                  />
                  <text
                    x="405"
                    y="155"
                    fill={selectedPath === "particles_to_moles" ? "#0f172a" : "#94a3b8"}
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    ÷ N_A
                  </text>
                </g>

                {/* C. VOLUME <-> MOLES Pathway */}
                {/* 1. Volume -> Moles (Divide by 22.4) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedPath("volume_to_moles")}
                >
                  <path
                    d="M 283,300 L 283,248"
                    fill="none"
                    stroke={selectedPath === "volume_to_moles" ? "#818cf8" : "#475569"}
                    strokeWidth={selectedPath === "volume_to_moles" ? "3.5" : "2"}
                    markerEnd="url(#arrow-indigo)"
                  />
                  <rect
                    x="235"
                    y="262"
                    width="42"
                    height="20"
                    rx="4"
                    fill={selectedPath === "volume_to_moles" ? "#818cf8" : "#1e293b"}
                    stroke={selectedPath === "volume_to_moles" ? "#818cf8" : "#475569"}
                    strokeWidth="1"
                  />
                  <text
                    x="256"
                    y="275"
                    fill={selectedPath === "volume_to_moles" ? "#0f172a" : "#94a3b8"}
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    ÷ 22.4
                  </text>
                </g>

                {/* 2. Moles -> Volume (Multiply by 22.4) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setSelectedPath("moles_to_volume")}
                >
                  <path
                    d="M 317,248 L 317,300"
                    fill="none"
                    stroke={selectedPath === "moles_to_volume" ? "#818cf8" : "#475569"}
                    strokeWidth={selectedPath === "moles_to_volume" ? "3.5" : "2"}
                    markerEnd="url(#arrow-indigo)"
                  />
                  <rect
                    x="323"
                    y="262"
                    width="42"
                    height="20"
                    rx="4"
                    fill={selectedPath === "moles_to_volume" ? "#818cf8" : "#1e293b"}
                    stroke={selectedPath === "moles_to_volume" ? "#818cf8" : "#475569"}
                    strokeWidth="1"
                  />
                  <text
                    x="344"
                    y="275"
                    fill={selectedPath === "moles_to_volume" ? "#0f172a" : "#94a3b8"}
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    × 22.4
                  </text>
                </g>

              </svg>
            </div>
          </section>

          {/* 2. Conversion Formula Detail & Checklist (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Conversion Detail Card */}
            <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl flex-grow flex flex-col gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase block mb-1">
                  {t("CONVERSION MATHEMATICS", "រូបមន្តសម្រាប់គណនាបំលែង")}
                </span>
                <h3 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.1rem, 2.2vw)" }}>
                  {t("Conversion Pathway Detail", "ព័ត៌មានលម្អិតនៃរបៀបបំលែង")}
                </h3>
              </div>

              {/* Dynamic pathway data renderer */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 flex-grow flex flex-col gap-4">
                {selectedPath === "mass_to_moles" && (
                  <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <span className="text-xs font-bold text-indigo-400 font-mono">MASS → MOLES (ម៉ាស់ → ម៉ូល)</span>
                    <div className="bg-slate-900/60 p-3.5 rounded-xl text-center border border-slate-800 font-bold">
                      <BlockMath math={String.raw`n = \dfrac{w}{M}`} />
                    </div>
                    <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Rule: Divide the given mass in grams (w) by the substance's Molar Mass (M) in g/mol. Molar mass is obtained from the periodic table atomic values.",
                        "របៀបគណនា៖ ចែកម៉ាស់ជាក្រាម (w) នឹងម៉ាស់ម៉ូលនៃសារធាតុ (M) គិតជា g/mol។ ម៉ាស់ម៉ូលត្រូវបានរកឃើញដោយបូកម៉ាស់អាតូមពីតារាងខួប។"
                      )}
                    </p>
                    <div className="border-t border-slate-900 pt-3">
                      <span className="text-[10px] text-indigo-300 font-mono uppercase block mb-1">Example (ឧទាហរណ៍)៖</span>
                      <p className={`text-xs text-slate-300 leading-snug ${isKh ? "font-khmer leading-loose" : ""}`}>
                        {t(
                          "Calculate moles in 36.0 g of Water (H₂O). (M = 18.0 g/mol)",
                          "គណនាម៉ូលទឹក H₂O ក្នុងម៉ាស់ ៣៦.០ ក្រាម។ (M = ១៨.០ g/mol)"
                        )}
                      </p>
                      <div className="text-xs font-mono text-indigo-400 font-bold mt-1.5">
                        <InlineMath math={String.raw`n = \frac{36.0\,\text{g}}{18.0\,\text{g/mol}} = 2.0\,\text{mol}`} />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPath === "moles_to_mass" && (
                  <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <span className="text-xs font-bold text-indigo-400 font-mono">MOLES → MASS (ម៉ូល → ម៉ាស់)</span>
                    <div className="bg-slate-900/60 p-3.5 rounded-xl text-center border border-slate-800 font-bold">
                      <BlockMath math={String.raw`w = n \cdot M`} />
                    </div>
                    <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Rule: Multiply the amount of substance in moles (n) by its Molar Mass (M) in g/mol to obtain the final weight in grams.",
                        "របៀបគណនា៖ គុណចំនួនម៉ូលនៃសារធាតុ (n) នឹងម៉ាស់ម៉ូលរបស់វា (M) គិតជា g/mol ដើម្បីទទួលបានម៉ាស់ជាក្រាម។"
                      )}
                    </p>
                    <div className="border-t border-slate-900 pt-3">
                      <span className="text-[10px] text-indigo-300 font-mono uppercase block mb-1">Example (ឧទាហរណ៍)៖</span>
                      <p className={`text-xs text-slate-300 leading-snug ${isKh ? "font-khmer leading-loose" : ""}`}>
                        {t(
                          "What is the mass of 0.50 mol of Carbon Dioxide (CO₂)? (M = 44.0 g/mol)",
                          "តើម៉ាស់សរុបនៃសូលុយស្យុង CO₂ ចំនួន ០.៥០ ម៉ូល ស្មើនឹងប៉ុន្មានក្រាម? (M = ៤៤.០ g/mol)"
                        )}
                      </p>
                      <div className="text-xs font-mono text-indigo-400 font-bold mt-1.5">
                        <InlineMath math={String.raw`w = 0.50\,\text{mol} \cdot 44.0\,\text{g/mol} = 22.0\,\text{g}`} />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPath === "moles_to_particles" && (
                  <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <span className="text-xs font-bold text-indigo-400 font-mono">MOLES → PARTICLES (ម៉ូល → ភាគល្អិត)</span>
                    <div className="bg-slate-900/60 p-3.5 rounded-xl text-center border border-slate-800 font-bold">
                      <BlockMath math={String.raw`N = n \cdot N_A`} />
                    </div>
                    <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Rule: Multiply moles (n) by Avogadro's constant (N_A = 6.022 × 10²³) to count individual atoms, ions, or molecules.",
                        "របៀបគណនា៖ គុណចំនួនម៉ូល (n) នឹងចំនួនអាវ៉ូកាដ្រូ (N_A = ៦.០២២ × ១០²³) ដើម្បីរកចំនួនអាតូម អ៊ីយ៉ុង ឬម៉ូលេគុលដាច់ដោយឡែក។"
                      )}
                    </p>
                    <div className="border-t border-slate-900 pt-3">
                      <span className="text-[10px] text-indigo-300 font-mono uppercase block mb-1">Example (ឧទាហរណ៍)៖</span>
                      <p className={`text-xs text-slate-300 leading-snug ${isKh ? "font-khmer leading-loose" : ""}`}>
                        {t(
                          "Calculate molecules in 3.0 mol of Oxygen gas (O₂).",
                          "គណនាចំនួនម៉ូលេគុលនៅក្នុងឧស្ម័នអុកស៊ីសែន (O₂) ចំនួន ៣.០ ម៉ូល។"
                        )}
                      </p>
                      <div className="text-xs font-mono text-indigo-400 font-bold mt-1.5">
                        <InlineMath math={String.raw`N = 3.0 \cdot (6.022 \times 10^{23}) = 1.807 \times 10^{24}\,\text{molecules}`} />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPath === "particles_to_moles" && (
                  <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <span className="text-xs font-bold text-indigo-400 font-mono">PARTICLES → MOLES (ភាគល្អិត → ម៉ូល)</span>
                    <div className="bg-slate-900/60 p-3.5 rounded-xl text-center border border-slate-800 font-bold">
                      <BlockMath math={String.raw`n = \dfrac{N}{N_A}`} />
                    </div>
                    <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Rule: Divide the total count of particles (N) by Avogadro's constant (6.022 × 10²³) to group them into chemical moles.",
                        "របៀបគណនា៖ ចែកចំនួនភាគល្អិតសរុប (N) នឹងចំនួនថេរអាវ៉ូកាដ្រូ (៦.០២២ × ១០²³) ដើម្បីប្តូរទៅជាចំនួនម៉ូលគីមី។"
                      )}
                    </p>
                    <div className="border-t border-slate-900 pt-3">
                      <span className="text-[10px] text-indigo-300 font-mono uppercase block mb-1">Example (ឧទាហរណ៍)៖</span>
                      <p className={`text-xs text-slate-300 leading-snug ${isKh ? "font-khmer leading-loose" : ""}`}>
                        {t(
                          "Find moles in 1.204 × 10²⁴ atoms of Helium (He).",
                          "រកចំនួនម៉ូលនៅក្នុងអាតូមអេល្យូម (He) ចំនួន ១.២០៤ × ១០²⁴ អាតូម។"
                        )}
                      </p>
                      <div className="text-xs font-mono text-indigo-400 font-bold mt-1.5">
                        <InlineMath math={String.raw`n = \frac{1.204 \times 10^{24}}{6.022 \times 10^{23}} = 2.0\,\text{mol}`} />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPath === "volume_to_moles" && (
                  <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <span className="text-xs font-bold text-indigo-400 font-mono">GAS VOLUME → MOLES (មាឌឧស្ម័ន → ម៉ូល)</span>
                    <div className="bg-slate-900/60 p-3.5 rounded-xl text-center border border-slate-800 font-bold">
                      <BlockMath math={String.raw`n = \dfrac{V\,\text{(at STP)}}{22.4\,\text{L/mol}}`} />
                    </div>
                    <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Rule: For any ideal gas at standard temperature and pressure (STP), divide the volume in Liters (V) by the molar volume 22.4 L/mol.",
                        "របៀបគណនា៖ សម្រាប់ឧស្ម័នល្អឥតខ្ចោះនៅលក្ខខណ្ឌស្តង់ដារ (STP) ចែកមាឌគិតជាលីត្រ (V) នឹងមាឌម៉ូល ២២.៤ L/mol។"
                      )}
                    </p>
                    <div className="border-t border-slate-900 pt-3">
                      <span className="text-[10px] text-indigo-300 font-mono uppercase block mb-1">Example (ឧទាហរណ៍)៖</span>
                      <p className={`text-xs text-slate-300 leading-snug ${isKh ? "font-khmer leading-loose" : ""}`}>
                        {t(
                          "Calculate moles in 11.2 Liters of Nitrogen gas (N₂) at STP.",
                          "គណនាម៉ូលនៅក្នុងឧស្ម័នអាសូត (N₂) ចំនួន ១១.២ លីត្រ នៅលក្ខខណ្ឌ STP។"
                        )}
                      </p>
                      <div className="text-xs font-mono text-indigo-400 font-bold mt-1.5">
                        <InlineMath math={String.raw`n = \frac{11.2\,\text{L}}{22.4\,\text{L/mol}} = 0.50\,\text{mol}`} />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPath === "moles_to_volume" && (
                  <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <span className="text-xs font-bold text-indigo-400 font-mono">MOLES → GAS VOLUME (ម៉ូល → មាឌឧស្ម័ន)</span>
                    <div className="bg-slate-900/60 p-3.5 rounded-xl text-center border border-slate-800 font-bold">
                      <BlockMath math={String.raw`V = n \cdot 22.4\,\text{L/mol}`} />
                    </div>
                    <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Rule: Multiply the amount of gas in moles (n) by the STP molar volume (22.4 L/mol) to get the gas volume in Liters.",
                        "របៀបគណនា៖ គុណចំនួនម៉ូលនៃឧស្ម័ន (n) នឹងមាឌម៉ូលនៅលក្ខខណ្ឌ STP (២២.៤ L/mol) ដើម្បីទទួលបានមាឌគិតជាលីត្រ។"
                      )}
                    </p>
                    <div className="border-t border-slate-900 pt-3">
                      <span className="text-[10px] text-indigo-300 font-mono uppercase block mb-1">Example (ឧទាហរណ៍)៖</span>
                      <p className={`text-xs text-slate-300 leading-snug ${isKh ? "font-khmer leading-loose" : ""}`}>
                        {t(
                          "What is the volume of 1.50 mol of Helium (He) gas at STP?",
                          "តើឧស្ម័នអេល្យូម (He) ចំនួន ១.៥០ ម៉ូល មានមាឌប៉ុន្មានលីត្រ នៅលក្ខខណ្ឌ STP?"
                        )}
                      </p>
                      <div className="text-xs font-mono text-indigo-400 font-bold mt-1.5">
                        <InlineMath math={String.raw`V = 1.50\,\text{mol} \cdot 22.4\,\text{L/mol} = 33.6\,\text{L}`} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Checklist Memory Tips: Golden Rules */}
            <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-indigo-400" />
                <h3 className={`font-bold text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.1rem, 2vw)" }}>
                  {t("Golden Rules of Stoichiometry", "ច្បាប់មាសនៃស្តូគីយូម៉ែត្រ")}
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                
                {/* Rule 1 Checkbox */}
                <div
                  onClick={() => toggleRule("rule1")}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    rulesChecked.rule1
                      ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-300"
                      : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-950/80"
                  }`}
                >
                  <div className={`w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center ${
                    rulesChecked.rule1 ? "bg-indigo-500 border-indigo-500 text-slate-950" : "border-slate-600"
                  }`}>
                    {rulesChecked.rule1 && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-slate-200">
                      {t("1. Balance the Equation First", "១. សម្រួលសមីការឱ្យមានតុល្យភាពជាមុន")}
                    </span>
                    <p className={`text-[10px] leading-relaxed text-slate-500 ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Chemical ratios represent moles. If the equation coefficients are wrong, all subsequent calculations fail.",
                        "ផលធៀបគីមីតំណាងឱ្យម៉ូល។ ប្រសិនបើមេគុណសមីការខុស ការគណនាបន្ទាប់ទាំងអស់នឹងត្រូវខុសដែរ។"
                      )}
                    </p>
                  </div>
                </div>

                {/* Rule 2 Checkbox */}
                <div
                  onClick={() => toggleRule("rule2")}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    rulesChecked.rule2
                      ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-300"
                      : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-950/80"
                  }`}
                >
                  <div className={`w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center ${
                    rulesChecked.rule2 ? "bg-indigo-500 border-indigo-500 text-slate-950" : "border-slate-600"
                  }`}>
                    {rulesChecked.rule2 && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-slate-200">
                      {t("2. Convert to Moles Immediately", "២. បំលែងទៅជាម៉ូលជាមុនសិន")}
                    </span>
                    <p className={`text-[10px] leading-relaxed text-slate-500 ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        "Never compare grams to grams or liters to liters directly. Convert your given value to moles first, then use molar ratios.",
                        "កុំប្រៀបធៀបក្រាមទៅក្រាម ឬលីត្រទៅលីត្រដោយផ្ទាល់។ ត្រូវបំលែងតម្លៃដែលផ្តល់ឱ្យទៅជាម៉ូលជាមុនសិន ទើបប្រើផលធៀបម៉ូល។"
                      )}
                    </p>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </div>

        {/* Bottom Panel Layout: Formula Dashboard (left) and Constants Sidebar (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          
          {/* 3. The Formula Dashboard (Col Span 8) */}
          <section className="lg:col-span-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <h3 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.2rem, 2.2vw)" }}>
                {t("Stoichiometry Formula Dashboard", "តារាងរូបមន្តស្តូគីយូម៉ែត្រ")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Basic Relations */}
              <div className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col gap-3">
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase block border-b border-slate-850 pb-2">
                  {t("Basic Molar Relations", "ទំនាក់ទំនងម៉ូលមូលដ្ឋាន")}
                </span>
                <div className="bg-slate-900/60 p-4 rounded-xl text-center border border-slate-800 text-indigo-300 font-bold overflow-x-auto">
                  <BlockMath math={String.raw`n = \dfrac{w}{M} \quad \text{and} \quad n = \dfrac{N}{N_A}`} />
                </div>
                <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Links mass in grams (w) and chemical particles count (N) to the mole (n) using molar mass (M) and Avogadro's constant (NA).",
                    "ភ្ជាប់ទំនាក់ទំនងរវាងម៉ាស់ជាក្រាម (w) និងចំនួនភាគល្អិតគីមី (N) ទៅនឹងម៉ូល (n) ដោយប្រើម៉ាស់ម៉ូល (M) និងថេរអាវ៉ូកាដ្រូ (NA)។"
                  )}
                </p>
              </div>

              {/* Card 2: Gas Formulas & STP */}
              <div className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col gap-3">
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase block border-b border-slate-850 pb-2">
                  {t("Ideal Gases & STP Volumetry", "ច្បាប់ឧស្ម័ន និងមាឌនៅ STP")}
                </span>
                <div className="bg-slate-900/60 p-4 rounded-xl text-center border border-slate-800 text-indigo-300 font-bold overflow-x-auto">
                  <BlockMath math={String.raw`PV = nRT \quad \text{and} \quad n = \dfrac{V_{\text{STP}}}{22.4\,\text{L}}`} />
                </div>
                <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Calculates behavior under differing states using pressure (P), volume (V), temperature (T), and gas constant (R). STP assumes molar volume is 22.4 L/mol.",
                    "គណនាឥរិយាបថឧស្ម័នក្រោមលក្ខខណ្ឌប្រែប្រួលដោយប្រើសម្ពាធ (P) មាឌ (V) សីតុណ្ហភាព (T) និងថេរឧស្ម័ន (R)។ លក្ខខណ្ឌ STP កំណត់មាឌម៉ូលស្មើ ២២.៤ L/mol។"
                  )}
                </p>
              </div>

              {/* Card 3: Solution Concentrations */}
              <div className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col gap-3">
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase block border-b border-slate-850 pb-2">
                  {t("Liquid Solution Concentration", "កំហាប់សូលុយស្យុងរាវ")}
                </span>
                <div className="bg-slate-900/60 p-4 rounded-xl text-center border border-slate-800 text-indigo-300 font-bold overflow-x-auto">
                  <BlockMath math={String.raw`M = \dfrac{n_{\text{solute}}}{V_{\text{soln (L)}}} \quad \text{and} \quad m = \dfrac{n_{\text{solute}}}{\text{Mass}_{\text{solvent (kg)}}}`} />
                </div>
                <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Molarity (M) defines moles per Liter of solution. Molality (m) defines moles per kilogram of pure solvent. Molarity is temperature dependent.",
                    "កំហាប់ម៉ូលឡា (M) កំណត់ម៉ូលក្នុងមួយលីត្រសូលុយស្យុង។ កំហាប់ម៉ូលឡាល់ (m) កំណត់ម៉ូលក្នុងមួយគីឡូក្រាមនៃសារធាតុរំលាយ។ M អាចប្រែប្រួលតាមសីតុណ្ហភាព។"
                  )}
                </p>
              </div>

              {/* Card 4: Reactions and Yield */}
              <div className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col gap-3">
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase block border-b border-slate-850 pb-2">
                  {t("Reaction Efficiency & Yield", "ទិន្នផល និងប្រសិទ្ធភាពប្រតិកម្ម")}
                </span>
                <div className="bg-slate-900/60 p-4 rounded-xl text-center border border-slate-800 text-indigo-300 font-bold overflow-x-auto">
                  <BlockMath math={String.raw`\text{Percent Yield} = \left( \dfrac{\text{Actual Yield}}{\text{Theoretical Yield}} \right) \times 100\%`} />
                </div>
                <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Evaluates synthesis efficiency. Theoretical yield is the calculated maximum from stoichiometry limits; actual yield is measured in lab.",
                    "វាស់ស្ទង់ប្រសិទ្ធភាពនៃការសំយោគគីមី។ ទិន្នផលទ្រឹស្តីគឺកម្រិតអតិបរមាគណនាតាមស្តូគីយូម៉ែត្រ ខណៈទិន្នផលជាក់ស្តែងវាស់បានពីការពិសោធន៍ផ្ទាល់។"
                  )}
                </p>
              </div>

            </div>
          </section>

          {/* 4. Constants Sidebar (Col Span 4) */}
          <section className="lg:col-span-4 bg-indigo-950/20 border border-indigo-500/20 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <TrendingUp className="w-5 h-5 shrink-0" />
              <h3 className={`font-bold ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.1rem, 2vw)" }}>
                {t("Physical Constants Reference", "តារាងតម្លៃថេររូបវិទ្យា")}
              </h3>
            </div>
            
            <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "These values are fundamental constants required across chemical equations and mole stoichiometry calculations.",
                "តម្លៃទាំងនេះគឺជាតម្លៃថេរជាសារវន្តដែលត្រូវការចាំបាច់ក្នុងការដោះស្រាយសមីការគីមី និងការគណនាស្តូគីយូម៉ែត្រ។"
              )}
            </p>

            <div className="flex flex-col gap-4 mt-2">
              
              {/* Avogadro Constant Card */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-indigo-900/30">
                <span className="text-[10px] text-indigo-300 font-mono block mb-1">AVOGADRO'S NUMBER (ចំនួនអាវ៉ូកាដ្រូ)</span>
                <div className="text-sm font-bold text-white font-mono">
                  <InlineMath math={String.raw`N_A = 6.022 \times 10^{23} \text{ mol}^{-1}`} />
                </div>
                <p className={`text-[10px] text-slate-500 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t("Represents the total particles contained in exactly 1 mole of substance.", "តំណាងឱ្យភាគល្អិតសរុបដែលមាននៅក្នុងសារធាតុពិតប្រាកដ ១ ម៉ូល។")}
                </p>
              </div>

              {/* Universal Gas Constant Card */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-indigo-900/30">
                <span className="text-[10px] text-indigo-300 font-mono block mb-1">UNIVERSAL GAS CONSTANT (ថេរឧស្ម័នសកល)</span>
                <div className="text-sm font-bold text-white font-mono">
                  <InlineMath math={String.raw`R = 0.0821 \text{ L}\cdot\text{atm}\cdot\text{mol}^{-1}\cdot\text{K}^{-1}`} />
                </div>
                <p className={`text-[10px] text-slate-500 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t("Use this calibrated constant when gas volume is Liters and pressure is Atmospheres.", "ប្រើប្រាស់តម្លៃថេរនេះនៅពេលមាឌគិតជាលីត្រ និងសម្ពាធគិតជាបរិយាកាស (atm)។")}
                </p>
              </div>

              {/* STP Conditions Card */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-indigo-900/30">
                <span className="text-[10px] text-indigo-300 font-mono block mb-1">STP CONDITIONS (លក្ខខណ្ឌស្តង់ដារ STP)</span>
                <div className="text-xs font-bold text-white flex flex-col gap-1 mt-1 font-mono">
                  <div>• Temperature (សីតុណ្ហភាព): <InlineMath math="0^\circ\text{C} \quad (273.15\,\text{K})" /></div>
                  <div>• Pressure (សម្ពាធ): <InlineMath math="1\,\text{atm} \quad (101.3\,\text{kPa})" /></div>
                </div>
                <p className={`text-[10px] text-slate-500 mt-1.5 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t("Standard Temperature and Pressure conditions defined for gas comparison.", "លក្ខខណ្ឌសីតុណ្ហភាព និងសម្ពាធស្តង់ដារដែលត្រូវបានកំណត់សម្រាប់ការប្រៀបធៀបឧស្ម័ន។")}
                </p>
              </div>

            </div>
          </section>

        </div>

      </main>
    </div>
  );
}
