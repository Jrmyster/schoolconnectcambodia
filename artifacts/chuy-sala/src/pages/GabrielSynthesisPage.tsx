import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Hexagon, HelpCircle, Activity, ChevronRight, ChevronLeft, RotateCcw, BookOpen, User } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

export default function GabrielSynthesisPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  const [step, setStep] = useState<number>(1);

  const translate = (en: string, kh: string) => (isKh ? kh : en);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background space elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/science" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>{t("Back to Science Hub", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}</span>
          </Link>

          <div className="flex items-center gap-2">
            <Hexagon className="w-5 h-5 text-cyan-400" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-400 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Gabriel Synthesis", "សំយោគ Gabriel")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block">
            <span>ORG-CHEM-201</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-grow w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Reaction Stepper Visualizer (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-6">
            
            {/* Visualizer Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-1">
                  {t("REACTION MECHANISM STEPPER", "យន្តការប្រតិកម្មគីមីជំហានម្តងៗ")}
                </span>
                <h2 className={`text-xl sm:text-2xl font-black text-white ${isKh ? "font-khmer" : ""}`}>
                  {step === 1 && t("Step 1: Deprotonation of Phthalimide", "ជំហានទី ១៖ ការដកប្រូតុងនៃភីតាលីមីត")}
                  {step === 2 && t("Step 2: nucleophilic SN2 Alkylation", "ជំហានទី ២៖ អាល់គីលកម្ម SN2 ញុយក្លេអូភីល")}
                  {step === 3 && t("Step 3: Attack by Hydrazine", "ជំហានទី ៣៖ ការវាយប្រហារដោយអ៊ីដ្រាស៊ីន")}
                  {step === 4 && t("Step 4: Ring Cleavage & Amine Release", "ជំហានទី ៤៖ ការផ្តាច់រង្វង់ និងការបញ្ចេញអាមីន")}
                </h2>
              </div>
              <span className="font-mono text-cyan-400 text-sm font-bold bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                {step} / 4
              </span>
            </div>

            {/* SVG Interactive Reaction Stage */}
            <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-850 p-4 flex items-center justify-center min-h-[360px] sm:min-h-[400px] relative overflow-hidden">
              
              {/* Stepper Vector Stage */}
              <svg viewBox="0 0 680 360" className="w-full h-auto select-none">
                {/* Arrowhead definition for electron pushing arrows */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                  </marker>
                  <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                  </marker>
                </defs>

                {/* ── STEP 1: Deprotonation ─────────────────────────────────── */}
                {step === 1 && (
                  <g className="transition-all duration-500">
                    {/* Phthalimide Benzene Ring */}
                    <polygon points="70,140 70,200 120,230 170,200 170,140 120,110" fill="none" stroke="#64748b" strokeWidth="2.5" />
                    {/* Fused double bonds inside Benzene */}
                    <line x1="80" y1="145" x2="80" y2="195" stroke="#475569" strokeWidth="2.5" />
                    <line x1="160" y1="145" x2="130" y2="125" stroke="#475569" strokeWidth="2.5" />
                    <line x1="160" y1="195" x2="130" y2="215" stroke="#475569" strokeWidth="2.5" />

                    {/* Fused 5-membered Imide Ring */}
                    <line x1="170" y1="140" x2="220" y2="150" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="170" y1="200" x2="220" y2="190" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="220" y1="150" x2="245" y2="170" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="220" y1="190" x2="245" y2="170" stroke="#64748b" strokeWidth="2.5" />

                    {/* Carbonyl Oxygens (C=O) */}
                    {/* Top Carbonyl */}
                    <line x1="216" y1="152" x2="245" y2="120" stroke="#ef4444" strokeWidth="2.5" />
                    <line x1="223" y1="146" x2="252" y2="114" stroke="#ef4444" strokeWidth="2.5" />
                    <text x="254" y="112" fill="#ef4444" fontSize="18" fontWeight="bold" fontFamily="sans-serif">O</text>
                    {/* Bottom Carbonyl */}
                    <line x1="216" y1="188" x2="245" y2="220" stroke="#ef4444" strokeWidth="2.5" />
                    <line x1="223" y1="194" x2="252" y2="226" stroke="#ef4444" strokeWidth="2.5" />
                    <text x="254" y="238" fill="#ef4444" fontSize="18" fontWeight="bold" fontFamily="sans-serif">O</text>

                    {/* Nitrogen & Hydrogen */}
                    <text x="245" y="176" fill="#3b82f6" fontSize="18" fontWeight="bold" fontFamily="sans-serif">N</text>
                    <line x1="262" y1="170" x2="295" y2="170" stroke="#cbd5e1" strokeWidth="2" />
                    <text x="300" y="176" fill="#cbd5e1" fontSize="18" fontWeight="bold" fontFamily="sans-serif">H</text>

                    {/* KOH Base */}
                    {/* Potassium Cation */}
                    <text x="440" y="140" fill="#a855f7" fontSize="18" fontWeight="bold" fontFamily="sans-serif">K⁺</text>
                    
                    {/* Hydroxide Anion (OH⁻) */}
                    <text x="430" y="200" fill="#ef4444" fontSize="18" fontWeight="bold" fontFamily="sans-serif">O</text>
                    <line x1="448" y1="194" x2="466" y2="194" stroke="#cbd5e1" strokeWidth="2" />
                    <text x="470" y="200" fill="#cbd5e1" fontSize="18" fontWeight="bold" fontFamily="sans-serif">H</text>
                    
                    {/* Negative charge on oxygen */}
                    <circle cx="422" cy="190" r="7" fill="none" stroke="#ef4444" strokeWidth="1" />
                    <line x1="418" y1="190" x2="426" y2="190" stroke="#ef4444" strokeWidth="1.5" />
                    
                    {/* Electron pushing arrows */}
                    {/* OH⁻ attacks H */}
                    <path d="M 425,185 C 380,160 340,155 315,165" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 1" markerEnd="url(#arrowhead)" />
                    {/* N-H bond pair shifts to Nitrogen */}
                    <path d="M 280,165 C 272,150 262,152 258,160" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 1" markerEnd="url(#arrowhead)" />

                    {/* Label */}
                    <text x="120" y="275" fill="#94a3b8" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Phthalimide</text>
                    <text x="450" y="275" fill="#94a3b8" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Potassium Hydroxide (KOH)</text>
                  </g>
                )}

                {/* ── STEP 2: SN2 Alkylation ────────────────────────────────── */}
                {step === 2 && (
                  <g className="transition-all duration-500">
                    {/* Potassium Phthalimide Anion */}
                    <polygon points="70,140 70,200 120,230 170,200 170,140 120,110" fill="none" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="80" y1="145" x2="80" y2="195" stroke="#475569" strokeWidth="2.5" />
                    <line x1="160" y1="145" x2="130" y2="125" stroke="#475569" strokeWidth="2.5" />
                    <line x1="160" y1="195" x2="130" y2="215" stroke="#475569" strokeWidth="2.5" />
                    <line x1="170" y1="140" x2="220" y2="150" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="170" y1="200" x2="220" y2="190" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="220" y1="150" x2="245" y2="170" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="220" y1="190" x2="245" y2="170" stroke="#64748b" strokeWidth="2.5" />
                    
                    {/* Carbonyl Oxygens */}
                    <line x1="216" y1="152" x2="245" y2="120" stroke="#ef4444" strokeWidth="2.5" />
                    <line x1="223" y1="146" x2="252" y2="114" stroke="#ef4444" strokeWidth="2.5" />
                    <text x="254" y="112" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>
                    <line x1="216" y1="188" x2="245" y2="220" stroke="#ef4444" strokeWidth="2.5" />
                    <line x1="223" y1="194" x2="252" y2="226" stroke="#ef4444" strokeWidth="2.5" />
                    <text x="254" y="238" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                    {/* Nitrogen Anion */}
                    <text x="245" y="176" fill="#3b82f6" fontSize="18" fontWeight="bold">N</text>
                    {/* Negative charge on nitrogen */}
                    <circle cx="265" cy="156" r="7" fill="none" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="261" y1="156" x2="269" y2="156" stroke="#3b82f6" strokeWidth="1.5" />
                    
                    {/* K⁺ Counter-ion */}
                    <text x="280" y="145" fill="#a855f7" fontSize="13" fontWeight="bold">K⁺</text>

                    {/* Alkyl Halide (R-X, e.g. R-Br) */}
                    <text x="440" y="176" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>
                    <line x1="460" y1="170" x2="505" y2="170" stroke="#10b981" strokeWidth="2.5" />
                    <text x="515" y="176" fill="#10b981" fontSize="18" fontWeight="bold">X</text>

                    {/* Electron pushing arrows */}
                    {/* Nitrogen attacks R */}
                    <path d="M 260,172 C 300,195 380,200 425,178" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 1" markerEnd="url(#arrowhead)" />
                    {/* R-X bond breaks, leaving group departs */}
                    <path d="M 480,165 C 490,150 510,150 520,160" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 1" markerEnd="url(#arrowhead)" />

                    {/* Water byproduct from step 1 */}
                    <g opacity="0.4">
                      <text x="560" y="90" fill="#ef4444" fontSize="14" fontWeight="bold">O</text>
                      <line x1="572" y1="84" x2="585" y2="76" stroke="#cbd5e1" strokeWidth="1.5" />
                      <text x="588" y="76" fill="#cbd5e1" fontSize="12" fontWeight="bold">H</text>
                      <line x1="572" y1="92" x2="585" y2="100" stroke="#cbd5e1" strokeWidth="1.5" />
                      <text x="588" y="104" fill="#cbd5e1" fontSize="12" fontWeight="bold">H</text>
                      <text x="562" y="115" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">H₂O</text>
                    </g>

                    {/* Labels */}
                    <text x="120" y="275" fill="#94a3b8" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Potassium Phthalimide</text>
                    <text x="480" y="275" fill="#94a3b8" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Primary Alkyl Halide</text>
                  </g>
                )}

                {/* ── STEP 3: Ing-Manske Hydrazine Attack ────────────────────── */}
                {step === 3 && (
                  <g className="transition-all duration-500">
                    {/* N-Alkylphthalimide */}
                    <polygon points="70,140 70,200 120,230 170,200 170,140 120,110" fill="none" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="80" y1="145" x2="80" y2="195" stroke="#475569" strokeWidth="2.5" />
                    <line x1="160" y1="145" x2="130" y2="125" stroke="#475569" strokeWidth="2.5" />
                    <line x1="160" y1="195" x2="130" y2="215" stroke="#475569" strokeWidth="2.5" />
                    
                    <line x1="170" y1="140" x2="220" y2="150" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="170" y1="200" x2="220" y2="190" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="220" y1="150" x2="245" y2="170" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="220" y1="190" x2="245" y2="170" stroke="#64748b" strokeWidth="2.5" />
                    
                    {/* Carbonyl Oxygens */}
                    <line x1="216" y1="152" x2="245" y2="120" stroke="#ef4444" strokeWidth="2.5" />
                    <line x1="223" y1="146" x2="252" y2="114" stroke="#ef4444" strokeWidth="2.5" />
                    <text x="254" y="112" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>
                    <line x1="216" y1="188" x2="245" y2="220" stroke="#ef4444" strokeWidth="2.5" />
                    <line x1="223" y1="194" x2="252" y2="226" stroke="#ef4444" strokeWidth="2.5" />
                    <text x="254" y="238" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                    {/* Nitrogen bonded to R */}
                    <text x="245" y="176" fill="#3b82f6" fontSize="18" fontWeight="bold">N</text>
                    <line x1="262" y1="170" x2="290" y2="170" stroke="#f59e0b" strokeWidth="2.5" />
                    <text x="295" y="176" fill="#f59e0b" fontSize="20" fontWeight="bold">R</text>

                    {/* Hydrazine Molecule (NH2-NH2) entering */}
                    <text x="440" y="145" fill="#3b82f6" fontSize="16" fontWeight="bold">H₂N</text>
                    <line x1="475" y1="140" x2="505" y2="140" stroke="#cbd5e1" strokeWidth="2" />
                    <text x="510" y="145" fill="#3b82f6" fontSize="16" fontWeight="bold">NH₂</text>

                    {/* Heat delta symbol */}
                    <text x="480" y="90" fill="#ea580c" fontSize="18" fontWeight="bold">Δ</text>
                    <text x="475" y="105" fill="#ea580c" fontSize="10" fontFamily="sans-serif">HEAT</text>

                    {/* Electron pushing arrows */}
                    {/* Hydrazine nitrogen attacks carbonyl carbon */}
                    <path d="M 440,135 C 380,110 290,105 235,142" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 1" markerEnd="url(#arrowhead)" />
                    {/* Carbonyl double bond opens to oxygen */}
                    <path d="M 235,135 C 235,122 245,115 250,118" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 1" markerEnd="url(#arrowhead)" />

                    {/* Halide salt byproduct KX from step 2 */}
                    <g opacity="0.4">
                      <text x="580" y="210" fill="#a855f7" fontSize="15" fontWeight="bold">K⁺</text>
                      <text x="610" y="210" fill="#10b981" fontSize="15" fontWeight="bold">X⁻</text>
                    </g>

                    {/* Labels */}
                    <text x="120" y="275" fill="#94a3b8" fontSize="12" fontFamily="sans-serif" textAnchor="middle">N-Alkylphthalimide</text>
                    <text x="485" y="275" fill="#94a3b8" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Hydrazine (NH₂NH₂)</text>
                  </g>
                )}

                {/* ── STEP 4: Cleavage & Amine Release ───────────────────────── */}
                {step === 4 && (
                  <g className="transition-all duration-500">
                    {/* Fused Benzene Ring of Phthalhydrazide */}
                    <polygon points="70,140 70,200 120,230 170,200 170,140 120,110" fill="none" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="80" y1="145" x2="80" y2="195" stroke="#475569" strokeWidth="2.5" />
                    <line x1="160" y1="145" x2="130" y2="125" stroke="#475569" strokeWidth="2.5" />
                    <line x1="160" y1="195" x2="130" y2="215" stroke="#475569" strokeWidth="2.5" />

                    {/* Phthalhydrazide 6-membered ring byproduct */}
                    <line x1="170" y1="140" x2="220" y2="130" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="170" y1="200" x2="220" y2="210" stroke="#64748b" strokeWidth="2.5" />
                    
                    <line x1="220" y1="130" x2="250" y2="150" stroke="#64748b" strokeWidth="2.5" />
                    <line x1="220" y1="210" x2="250" y2="190" stroke="#64748b" strokeWidth="2.5" />
                    
                    <line x1="250" y1="150" x2="250" y2="190" stroke="#3b82f6" strokeWidth="2.5" />

                    {/* Byproduct Carbonyl Oxygens */}
                    <line x1="224" y1="132" x2="242" y2="98" stroke="#ef4444" strokeWidth="2" />
                    <line x1="217" y1="128" x2="235" y2="94" stroke="#ef4444" strokeWidth="2" />
                    <text x="238" y="92" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                    <line x1="224" y1="208" x2="242" y2="242" stroke="#ef4444" strokeWidth="2" />
                    <line x1="217" y1="212" x2="235" y2="246" stroke="#ef4444" strokeWidth="2" />
                    <text x="238" y="258" fill="#ef4444" fontSize="18" fontWeight="bold">O</text>

                    {/* Phthalhydrazide Nitrogens (NH-NH) */}
                    <text x="245" y="152" fill="#3b82f6" fontSize="16" fontWeight="bold">NH</text>
                    <text x="245" y="200" fill="#3b82f6" fontSize="16" fontWeight="bold">NH</text>

                    {/* Pure Primary Amine Product Released (R-NH2) */}
                    <g className="animate-[bounce_3s_infinite]">
                      <text x="440" y="176" fill="#f59e0b" fontSize="22" fontWeight="bold">R</text>
                      <line x1="460" y1="170" x2="488" y2="170" stroke="#cbd5e1" strokeWidth="2.5" />
                      <text x="495" y="176" fill="#3b82f6" fontSize="18" fontWeight="bold">NH₂</text>
                      
                      {/* Decorative success glowing border box */}
                      <rect x="420" y="130" x2="560" y2="210" width="135" height="70" rx="10" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                      <text x="487" y="145" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">PRIMARY AMINE</text>
                    </g>

                    {/* Labels */}
                    <text x="160" y="295" fill="#94a3b8" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Phthalhydrazide (Byproduct)</text>
                    <text x="490" y="295" fill="#10b981" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Pure Primary Amine (Product)</text>
                  </g>
                )}

              </svg>

              {/* Progress Tracker Overlay */}
              <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl backdrop-blur-md">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className={`text-[10px] font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                  {step === 1 && t("REAGENT MIX: PHTHALIMIDE + KOH", "ល្បាយប្រតិកម្ម៖ ភីតាលីមីត + KOH")}
                  {step === 2 && t("NUCLEOPHILIC ATTACK (SN2)", "ការវាយប្រហារញុយក្លេអូភីល (SN2)")}
                  {step === 3 && t("ING-MANSKE DEAVAGE ACTIVE", "យន្តការកាត់ផ្តាច់រង្វង់សកម្ម")}
                  {step === 4 && t("SYNTHESIS SUCCESS: AMINE ISOLATED", "សំយោគជោគជ័យ៖ ទទួលបានអាមីន")}
                </span>
              </div>

            </div>

            {/* Step Summary description card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-cyan-400 font-mono tracking-widest uppercase">
                {t("CHEMISTRY DETAIL & DESCRIPTION", "ពណ៌នាជំហានគីមីវិទ្យា")}
              </span>
              <p className={`text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose text-sm" : "text-sm"}`}>
                {step === 1 && translate(
                  "Potassium hydroxide (KOH) acts as a strong base to deprotonate the weakly acidic N-H proton of phthalimide. This produces potassium phthalimide and water. The resulting resonance-stabilized phthalimide anion is a powerful nucleophile ready for alkylation.",
                  "ប៉ូតាស្យូមអ៊ីដ្រុកស៊ីត (KOH) ដើរតួជាបាសខ្លាំងដើម្បីដកប្រូតុង N-H ដែលជាអាស៊ីតខ្សោយរបស់ភីតាលីមីត។ ដំណើរការនេះបង្កើតបានជាប៉ូតាស្យូមភីតាលីមីត និងទឹក។ អាញ៉ុងភីតាលីមីតដែលទទួលបានមានលំនឹងរ៉េសូណង់ និងជាញុយក្លេអូភីលដ៏ខ្លាំងសម្រាប់អាល់គីលកម្ម។"
                )}
                {step === 2 && translate(
                  "The potassium phthalimide anion attacks the primary alkyl halide (R-X) via an SN2 backside nucleophilic substitution. The nucleophilic nitrogen bonds to the alkyl carbon, displacing the halogen leaving group (X⁻) to produce N-alkylphthalimide.",
                  "អាញ៉ុងប៉ូតាស្យូមភីតាលីមីត វាយប្រហារលើអាល់គីលអាឡូសែនលំដាប់ទី១ (R-X) តាមរយៈការជំនួសញុយក្លេអូភីល SN2 ពីខាងក្រោយ។ អាសូតញុយក្លេអូភីលបង្កើតសម្ព័ន្ធជាមួយកាបូនអាល់គីល ដោយច្រានហាលូសែន (X⁻) ចេញ បង្កើតបានជា N-អាល់គីលភីតាលីមីត។"
                )}
                {step === 3 && translate(
                  "Hydrazine (NH₂NH₂) is added to the N-alkylphthalimide and heated (the Ing-Manske procedure). One nucleophilic NH₂ nitrogen attacks a carbonyl carbon of the imide, breaking the C-N ring bond and opening the 5-membered ring.",
                  "អ៊ីដ្រាស៊ីន (NH₂NH₂) ត្រូវបានបន្ថែមទៅក្នុង N-អាល់គីលភីតាលីមីត រួចដុតកម្ដៅ (វិធីសាស្ត្រ Ing-Manske)។ អាសូត NH₂ ញុយក្លេអូភីលមួយ វាយប្រហារកាបូនការបូនីលនៃអ៊ីមីត ដោយផ្តាច់សម្ព័ន្ធ C-N និងបើកខ្សែរង្វង់ ៥ ជ្រុង។"
                )}
                {step === 4 && translate(
                  "The second amine group of hydrazine attacks the second carbonyl carbon. This intramolecular cyclization forms the highly stable 6-membered phthalhydrazide ring and cleaves the nitrogen-alkyl bond, releasing the pure primary amine (R-NH₂) product free of secondary/tertiary contamination.",
                  "ក្រុមអាមីនទីពីររបស់អ៊ីដ្រាស៊ីន វាយប្រហារកាបូនការបូនីលទីពីរ។ ការបិទរង្វង់ក្នុងម៉ូលេគុលនេះ បង្កើតបានជារង្វង់ ៦ ជ្រុងភីតាលអ៊ីដ្រាស៊ីតដ៏មានស្ថេរភាព និងផ្តាច់សម្ព័ន្ធអាសូត-អាល់គីល ដោយបញ្ចេញអាមីនលំដាប់ទី១ បរិសុទ្ធ (R-NH₂) ដោយគ្មានការលាយឡំអាមីនលំដាប់ខ្ពស់ឡើយ។"
                )}
              </p>
            </div>

            {/* Stepper Buttons Controls */}
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-950 border border-slate-800 hover:border-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-1.5 text-slate-300 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t("Previous Step", "ជំហានមុន")}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-slate-700 hover:text-white text-slate-400 transition-all"
                title={t("Reset Reaction", "កំណត់ឡើងវិញ")}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                disabled={step === 4}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:border-cyan-500/60 hover:text-cyan-300 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-1.5"
              >
                <span>{t("Next Step", "ជំហានបន្ទាប់")}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Educational Reference Cards & Biography (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Card 1: Core Purpose */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <BookOpen className="w-5 h-5" />
              </span>
              <h3
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.2rem, 2.0vw)" }}
              >
                {t("The Core Purpose", "គោលបំណងចម្បង")}
              </h3>
            </div>
            
            <p
              className={`text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose text-sm" : "text-sm"}`}
              style={{ fontSize: "max(0.92rem, 1.5vw)" }}
            >
              {t(
                "The primary purpose of the Gabriel synthesis is the synthesis of pure primary aliphatic alkyl amines (R-NH₂). It uses phthalimide as a protected nitrogen template, avoiding traditional synthesis issues and yielding clean organic compounds.",
                "គោលបំណងចម្បងនៃសំយោគ Gabriel គឺការរៀបចំសំយោគអាមីនលំដាប់ទី១ អាលីផាទិច (R-NH₂) ឲ្យបានបរិសុទ្ធ។ វាប្រើប្រាស់ភីតាលីមីតជាទម្រង់គំរូអាសូតការពារ ដើម្បីជៀសវាងបញ្ហានៃការសំយោគតាមវិធីសាស្ត្របុរាណ និងផ្តល់នូវសមាសធាតុសរីរាង្គស្អាតល្អ។"
              )}
            </p>
          </div>

          {/* Card 2: Over-alkylation Prevention */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <HelpCircle className="w-5 h-5" />
              </span>
              <h3
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.2rem, 2.0vw)" }}
              >
                {t("Why It is Necessary", "ហេតុអ្វីវាចាំបាច់")}
              </h3>
            </div>

            {/* Alert highlights */}
            <div className="bg-gradient-to-r from-emerald-950/40 to-slate-950/50 border-l-4 border-emerald-500 p-4 rounded-r-2xl">
              <span className="text-[10px] font-bold text-emerald-400 font-mono tracking-widest uppercase block mb-1">
                {t("THE OVER-ALKYLATION PROBLEM", "បញ្ហានៃអាល់គីលកម្មហួសកម្រិត")}
              </span>
              <span className={`font-sans font-bold text-white leading-relaxed block ${isKh ? "font-khmer text-xs leading-loose" : "text-xs"}`}>
                {t(
                  "NH₃ + R-X → R-NH₂ (nucleophile) → attacks more R-X → R₂NH → R₃N → R₄N⁺ (complex mixture)",
                  "NH₃ + R-X → R-NH₂ (ញុយក្លេអូភីល) → បន្តវាយប្រហារ R-X → R₂NH → R₃N → R₄N⁺ (ល្បាយស្មុគស្មាញ)"
                )}
              </span>
            </div>

            <p
              className={`text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose text-sm" : "text-sm"}`}
              style={{ fontSize: "max(0.92rem, 1.5vw)" }}
            >
              {t(
                "Direct alkylation of ammonia results in over-alkylation because primary amines are actually more nucleophilic than ammonia itself. The Gabriel synthesis bypasses this completely: the nitrogen atom of phthalimide is attached to two electron-withdrawing carbonyls, rendering it unable to undergo a second alkylation. This guarantees a strictly mono-alkylated product.",
                "អាល់គីលកម្មផ្ទាល់នៃអាម៉ូញាក់ បង្កឲ្យមានអាល់គីលកម្មហួសកម្រិត ព្រោះអាមីនលំដាប់ទី១ គឺជាញុយក្លេអូភីលខ្លាំងជាងអាម៉ូញាក់ទៅទៀត។ សំយោគ Gabriel ជៀសវាងបញ្ហានេះទាំងស្រុង៖ អាតូមអាសូតរបស់ភីតាលីមីតភ្ជាប់ទៅនឹងក្រុមការបូនីលបឺតអេឡិចត្រុងពីរ ដែលធ្វើឲ្យវាមិនអាចធ្វើអាល់គីលកម្មលើកទីពីរបានឡើយ។ នេះធានាថានឹងទទួលបានតែផលិតផលម៉ូណូអាល់គីលកម្មប៉ុណ្ណោះ។"
              )}
            </p>
          </div>

          {/* Card 3: Scientist Spotlight */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <User className="w-5 h-5" />
              </span>
              <h3
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.2rem, 2.0vw)" }}
              >
                {t("Scientist Spotlight", "ប្រវត្តិអ្នកវិទ្យាសាស្ត្រ")}
              </h3>
            </div>

            <div className="flex items-start gap-4">
              {/* Monogram profile placeholder */}
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-serif text-lg font-bold shrink-0 shadow-inner">
                SG
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm sm:text-base">Siegfried Gabriel</span>
                <span className="text-[10px] text-slate-500 font-mono font-semibold">1856 – 1938 | GERMAN CHEMIST</span>
              </div>
            </div>

            <p
              className={`text-slate-400 leading-relaxed border-t border-slate-800/85 pt-3 ${
                isKh ? "font-khmer leading-loose text-sm" : "text-sm"
              }`}
              style={{ fontSize: "max(0.92rem, 1.5vw)" }}
            >
              {t(
                "Siegfried Gabriel was an eminent German chemist who discovered this reaction in 1887. He studied under Hofmann and worked at the University of Berlin, contributing extensively to heterocyclic nitrogen chemistry and the synthesis of early amino acids.",
                "Siegfried Gabriel គឺជាអ្នកគីមីវិទ្យាជនជាតិអាល្លឺម៉ង់ដ៏ឆ្នើមម្នាក់ ដែលបានរកឃើញប្រតិកម្មនេះនៅក្នុងឆ្នាំ ១៨៨៧។ លោកបានសិក្សាក្រោមការណែនាំរបស់ Hofmann និងធ្វើការនៅសាកលវិទ្យាល័យប៊ែរឡាំង ដោយរួមចំណែកយ៉ាងច្រើនដល់គីមីវិទ្យានៃសមាសធាតុអាសូត និងការសំយោគអាស៊ីតអាមីនដំបូងៗ។"
              )}
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
