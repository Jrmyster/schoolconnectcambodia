import React, { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Activity,
  BookOpen,
  Info,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Layers,
  Award,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import "katex/dist/katex.min.css";

// Element definitions for the interactive valence table
interface ElementData {
  symbol: string;
  valence: number;
  type: "metal" | "metalloid" | "nonmetal";
  nameEn: string;
  nameKh: string;
  col: number;
  row: number;
  config: string;
  empty?: boolean;
  span?: number;
}

const gridElements: ElementData[] = [
  // Period 1
  { symbol: "H", valence: 1, type: "nonmetal", nameEn: "Hydrogen", nameKh: "អ៊ីដ្រូសែន", col: 1, row: 1, config: "1s¹" },
  { symbol: "", valence: 0, type: "nonmetal", nameEn: "", nameKh: "", col: 2, row: 1, config: "", empty: true, span: 6 },
  { symbol: "He", valence: 2, type: "nonmetal", nameEn: "Helium", nameKh: "អេល្យូម", col: 8, row: 1, config: "1s² (duet)" },
  // Period 2
  { symbol: "Li", valence: 1, type: "metal", nameEn: "Lithium", nameKh: "លីចូម", col: 1, row: 2, config: "[He] 2s¹" },
  { symbol: "Be", valence: 2, type: "metal", nameEn: "Beryllium", nameKh: "បេរីល្យូម", col: 2, row: 2, config: "[He] 2s²" },
  { symbol: "B", valence: 3, type: "metalloid", nameEn: "Boron", nameKh: "បូរ", col: 3, row: 2, config: "[He] 2s² 2p¹" },
  { symbol: "C", valence: 4, type: "nonmetal", nameEn: "Carbon", nameKh: "កាបូន", col: 4, row: 2, config: "[He] 2s² 2p²" },
  { symbol: "N", valence: 5, type: "nonmetal", nameEn: "Nitrogen", nameKh: "អាសូត", col: 5, row: 2, config: "[He] 2s² 2p³" },
  { symbol: "O", valence: 6, type: "nonmetal", nameEn: "Oxygen", nameKh: "អុកស៊ីសែន", col: 6, row: 2, config: "[He] 2s² 2p⁴" },
  { symbol: "F", valence: 7, type: "nonmetal", nameEn: "Fluorine", nameKh: "ហ្វ្លុយអ័រ", col: 7, row: 2, config: "[He] 2s² 2p⁵" },
  { symbol: "Ne", valence: 8, type: "nonmetal", nameEn: "Neon", nameKh: "ណេអុង", col: 8, row: 2, config: "[He] 2s² 2p⁶" },
  // Period 3
  { symbol: "Na", valence: 1, type: "metal", nameEn: "Sodium", nameKh: "សូដ្យូម", col: 1, row: 3, config: "[Ne] 3s¹" },
  { symbol: "Mg", valence: 2, type: "metal", nameEn: "Magnesium", nameKh: "ម៉ាញេស្យូម", col: 2, row: 3, config: "[Ne] 3s²" },
  { symbol: "Al", valence: 3, type: "metal", nameEn: "Aluminum", nameKh: "អាលុយមីញ៉ូម", col: 3, row: 3, config: "[Ne] 3s² 3p¹" },
  { symbol: "Si", valence: 4, type: "metalloid", nameEn: "Silicon", nameKh: "ស៊ីលីកូន", col: 4, row: 3, config: "[Ne] 3s² 3p²" },
  { symbol: "P", valence: 5, type: "nonmetal", nameEn: "Phosphorus", nameKh: "ផូស្វ័រ", col: 5, row: 3, config: "[Ne] 3s² 3p³" },
  { symbol: "S", valence: 6, type: "nonmetal", nameEn: "Sulfur", nameKh: "ស្ពាន់ធ័រ", col: 6, row: 3, config: "[Ne] 3s² 3p⁴" },
  { symbol: "Cl", valence: 7, type: "nonmetal", nameEn: "Chlorine", nameKh: "ក្លរ", col: 7, row: 3, config: "[Ne] 3s² 3p⁵" },
  { symbol: "Ar", valence: 8, type: "nonmetal", nameEn: "Argon", nameKh: "អាហ្គុង", col: 8, row: 3, config: "[Ne] 3s² 3p⁶" },
  // Period 4 (Main group only)
  { symbol: "K", valence: 1, type: "metal", nameEn: "Potassium", nameKh: "ប៉ូតាស្យូម", col: 1, row: 4, config: "[Ar] 4s¹" },
  { symbol: "Ca", valence: 2, type: "metal", nameEn: "Calcium", nameKh: "កាល់ស្យូម", col: 2, row: 4, config: "[Ar] 4s²" },
  { symbol: "", valence: 0, type: "metal", nameEn: "", nameKh: "", col: 3, row: 4, config: "", empty: true, span: 6 },
];

export default function LewisStructuresPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Active hover element in the valence table
  const [activeElement, setActiveElement] = useState<ElementData | null>(gridElements[3]); // default Carbon

  // Stepper state
  const [stepperExample, setStepperExample] = useState<"ccl4" | "no3">("ccl4");
  const [currentStep, setCurrentStep] = useState<number>(1);

  const totalSteps = stepperExample === "ccl4" ? 3 : 4;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetStepper = () => {
    setCurrentStep(1);
  };

  // Helper to render Lewis Dots inside the Valence Table cells
  const renderValenceDots = (valence: number, symbol: string) => {
    const dots: { x: string; y: string; style?: React.CSSProperties }[] = [];

    // Helper positions in percent coordinates around a 100x100 box
    const center = 50;
    const offset = 38;

    // Standard positioning order: Top, Bottom, Left, Right
    // 1 dot: Right
    // 2 dots: Right, Left (He: Top pair)
    // 3 dots: Top, Right, Left
    // 4 dots: Top, Bottom, Left, Right
    // 5 dots: Top pair, Bottom, Left, Right
    // 6 dots: Top pair, Bottom pair, Left, Right
    // 7 dots: Top pair, Bottom pair, Left pair, Right
    // 8 dots: Top pair, Bottom pair, Left pair, Right pair

    const topSingle = { x: `${center}%`, y: "15%" };
    const topPair1  = { x: `${center - 8}%`, y: "15%" };
    const topPair2  = { x: `${center + 8}%`, y: "15%" };

    const bottomSingle = { x: `${center}%`, y: "85%" };
    const bottomPair1  = { x: `${center - 8}%`, y: "85%" };
    const bottomPair2  = { x: `${center + 8}%`, y: "85%" };

    const leftSingle = { x: "15%", y: `${center}%` };
    const leftPair1  = { x: "15%", y: `${center - 8}%` };
    const leftPair2  = { x: "15%", y: `${center + 8}%` };

    const rightSingle = { x: "85%", y: `${center}%` };
    const rightPair1  = { x: "85%", y: `${center - 8}%` };
    const rightPair2  = { x: "85%", y: `${center + 8}%` };

    if (valence === 1) {
      dots.push(rightSingle);
    } else if (valence === 2) {
      if (symbol === "He") {
        dots.push(topPair1, topPair2);
      } else {
        dots.push(rightSingle, leftSingle);
      }
    } else if (valence === 3) {
      dots.push(topSingle, rightSingle, leftSingle);
    } else if (valence === 4) {
      dots.push(topSingle, bottomSingle, leftSingle, rightSingle);
    } else if (valence === 5) {
      dots.push(topPair1, topPair2, bottomSingle, leftSingle, rightSingle);
    } else if (valence === 6) {
      dots.push(topPair1, topPair2, bottomPair1, bottomPair2, leftSingle, rightSingle);
    } else if (valence === 7) {
      dots.push(topPair1, topPair2, bottomPair1, bottomPair2, leftPair1, leftPair2, rightSingle);
    } else if (valence === 8) {
      dots.push(topPair1, topPair2, bottomPair1, bottomPair2, leftPair1, leftPair2, rightPair1, rightPair2);
    }

    return (
      <>
        {dots.map((dot, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-yellow-400 border border-yellow-300 drop-shadow-[0_0_4px_#facc15]"
            style={{
              left: dot.x,
              top: dot.y,
              width: "0.8vw",
              height: "0.8vw",
              minWidth: "6px",
              minHeight: "6px",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </>
    );
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
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-indigo-300 to-indigo-500 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Lewis Structures & Valence Electrons", "ទម្រង់លុយអុីស និងអេឡិចត្រុងវ៉ាឡង់")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block font-mono">
            <span>CHEM-LEWIS-DOTS</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content Layout */}
      <main className="flex-grow w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-8">

        {/* SECTION 1: Interactive Valence Table */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold text-yellow-400 font-mono tracking-widest uppercase block mb-1">
              {t("INTERACTIVE PERIODIC TABLE VISUALIZER", "តារាងខួបនៃធាតុគីមីអន្តរកម្ម")}
            </span>
            <h2
              className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
              style={{ fontSize: "max(1.3rem, 2.5vw)" }}
            >
              {t("Valence Electron Dot Periodic Table", "តារាងខួបបង្ហាញអេឡិចត្រុងវ៉ាឡង់ជាចំណុច")}
            </h2>
            <p className={`text-slate-400 text-xs mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Hover or tap on any main group element to view its valence electron arrangement, classification, and electron configuration.",
                "ដាក់កៅស៊័រលើ ឬប៉ះធាតុគីមីណាមួយ ដើម្បីមើលការរៀបចំអេឡិចត្រុងវ៉ាឡង់ ចំណាត់ថ្នាក់ និងកម្រងអេឡិចត្រុងរបស់វា។"
              )}
            </p>
          </div>

          {/* Grid Layout Container */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* The Periodic Table (Col Span 8) */}
            <div className="xl:col-span-8 overflow-x-auto pb-4">
              <div className="min-w-[650px] flex flex-col gap-4">
                
                {/* Column Headers: Groups I to VIII */}
                <div className="grid grid-cols-8 gap-2 text-center text-[10px] font-mono font-bold text-slate-500">
                  <div>Group I (1)</div>
                  <div>Group II (2)</div>
                  <div>Group III (13)</div>
                  <div>Group IV (14)</div>
                  <div>Group V (15)</div>
                  <div>Group VI (16)</div>
                  <div>Group VII (17)</div>
                  <div>Group VIII (18)</div>
                </div>

                {/* The 4-period grid */}
                <div className="grid grid-cols-8 gap-2">
                  {gridElements.map((el, idx) => {
                    if (el.empty) {
                      return (
                        <div
                          key={`empty-${idx}`}
                          className={`col-span-1`}
                          style={{ gridColumn: `span ${el.span}` }}
                        />
                      );
                    }

                    const isSelected = activeElement?.symbol === el.symbol;
                    
                    // Style by element type
                    let borderClass = "";
                    let bgClass = "";
                    let textClass = "";
                    
                    if (el.type === "metal") {
                      bgClass = "bg-sky-950/20";
                      borderClass = isSelected ? "border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]" : "border-sky-500/20";
                      textClass = "text-sky-400";
                    } else if (el.type === "metalloid") {
                      bgClass = "bg-emerald-950/20";
                      borderClass = isSelected ? "border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]" : "border-emerald-500/20";
                      textClass = "text-emerald-400";
                    } else {
                      bgClass = "bg-yellow-950/10";
                      borderClass = isSelected ? "border-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.4)]" : "border-yellow-500/20";
                      textClass = "text-yellow-400";
                    }

                    return (
                      <div
                        key={el.symbol}
                        className={`w-full aspect-square rounded-2xl border flex items-center justify-center relative cursor-pointer transition-all duration-300 ${bgClass} ${borderClass} hover:scale-105`}
                        onMouseEnter={() => setActiveElement(el)}
                        onClick={() => setActiveElement(el)}
                      >
                        {/* Period indicator for the first column */}
                        {el.col === 1 && (
                          <span className="absolute left-2 top-2 text-[9px] font-mono text-slate-600">
                            P{el.row}
                          </span>
                        )}

                        {/* Element Symbol */}
                        <span className={`text-[2vw] sm:text-[1.8vw] font-black ${textClass}`}>
                          {el.symbol}
                        </span>

                        {/* Valence Electron Dots */}
                        {renderValenceDots(el.valence, el.symbol)}
                      </div>
                    );
                  })}
                </div>

                {/* Classification Legend */}
                <div className="flex items-center gap-6 mt-4 text-xs font-semibold px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-sky-500/30 bg-sky-950/20" />
                    <span className="text-sky-400">{t("Metals", "លោហៈ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-emerald-500/30 bg-emerald-950/20" />
                    <span className="text-emerald-400">{t("Metalloids", "អលោហៈ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-yellow-500/30 bg-yellow-950/10" />
                    <span className="text-yellow-400">{t("Nonmetals", "លោហៈធាតុ")}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Element Detail Panel (Col Span 4) */}
            <div className="xl:col-span-4 w-full">
              {activeElement ? (
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 flex flex-col gap-4 shadow-inner">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        {t("Selected Element", "ធាតុគីមីដែលបានជ្រើសរើស")}
                      </span>
                      <h3 className={`text-white font-bold text-xl ${isKh ? "font-khmer mt-0.5" : ""}`}>
                        {isKh ? activeElement.nameKh : activeElement.nameEn}
                      </h3>
                    </div>
                    <span className="text-[2.5rem] font-black text-slate-700 select-none">
                      {activeElement.symbol}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block mb-0.5">{t("Classification", "ចំណាត់ថ្នាក់")}</span>
                      <span className={`font-bold uppercase ${
                        activeElement.type === "metal" ? "text-sky-400" :
                        activeElement.type === "metalloid" ? "text-emerald-400" : "text-yellow-400"
                      }`}>
                        {activeElement.type === "metal" ? t("Metal", "លោហៈ") :
                         activeElement.type === "metalloid" ? t("Metalloid", "អលោហៈ") : t("Nonmetal", "លោហៈធាតុ")}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block mb-0.5">{t("Valence Electrons", "អេឡិចត្រុងវ៉ាឡង់")}</span>
                      <span className="font-bold text-yellow-400 text-sm">
                        {activeElement.valence} {t("electrons", "អេឡិចត្រុង")}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block mb-0.5">{t("Group / Period", "ក្រុម / ខួប")}</span>
                      <span className="font-mono text-white">
                        Group {activeElement.col} / Period {activeElement.row}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block mb-0.5">{t("Configuration", "កម្រងអេឡិចត្រុង")}</span>
                      <span className="font-mono text-indigo-400">
                        {activeElement.config}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850 mt-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      {t("Lewis Dot Diagram Rule", "វិធានទម្រង់លុយអុីសចំនុច")}
                    </span>
                    <p className={`text-[11px] text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {t(
                        `Under the octet/duet rule, ${activeElement.nameEn} has ${activeElement.valence} electron(s) in its outer shell. It forms chemical bonds to complete its valence shell to 8 (or 2 for Hydrogen/Helium).`,
                        `យោងទៅតាមវិធានអដ្ឋធាតុ ធាតុ ${activeElement.nameKh} មានអេឡិចត្រុង ${activeElement.valence} នៅក្នុងស្រទាប់ក្រៅបង្អស់របស់វា។ វាបង្កើតចំណងគីមីដើម្បីបំពេញស្រទាប់វ៉ាឡង់ឱ្យគ្រប់ ៨ (ឬ ២ សម្រាប់អ៊ីដ្រូសែន/អេល្យូម)។`
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 text-center text-slate-500">
                  {t("Hover over an element in the grid.", "ដាក់កៅស៊័រលើធាតុគីមីណាមួយក្នុងតារាង។")}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* SECTION 2: 'How to Draw' Interactive Stepper */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-yellow-400 font-mono tracking-widest uppercase block mb-1">
                {t("INTERACTIVE TUTORIAL", "មេរៀនអន្តរកម្មមួយជំហានម្តងៗ")}
              </span>
              <h2
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.3rem, 2.5vw)" }}
              >
                {t("How to Draw Lewis Structures", "របៀបគូរទម្រង់លុយអុីស")}
              </h2>
            </div>

            {/* Selector Toggles between CCl4 and NO3- */}
            <div className="flex gap-2 self-start sm:self-auto bg-slate-950 p-1.5 rounded-xl border border-slate-850">
              <button
                onClick={() => {
                  setStepperExample("ccl4");
                  resetStepper();
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  stepperExample === "ccl4"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Carbon Tetrachloride (CCl₄)
              </button>
              <button
                onClick={() => {
                  setStepperExample("no3");
                  resetStepper();
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  stepperExample === "no3"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Nitrate Ion (NO₃⁻)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visualizer Canvas (Col Span 7) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-850 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden">
              <span className="absolute top-4 left-4 bg-slate-900 border border-slate-800 text-[10px] font-mono text-indigo-400 px-2 py-0.5 rounded-md">
                {t(`Step ${currentStep} of ${totalSteps}`, `ជំហានទី ${currentStep} នៃ ${totalSteps}`)}
              </span>

              {/* 2D SVG Visual Canvas */}
              <svg viewBox="0 0 500 350" className="w-full max-w-[460px] h-auto select-none">
                <style>{`
                  .bond-line {
                    stroke: #6366f1;
                    stroke-width: 3.5px;
                    stroke-linecap: round;
                    animation: draw-line 0.6s ease-out forwards;
                  }
                  .double-bond {
                    stroke: #6366f1;
                    stroke-width: 2.5px;
                    stroke-linecap: round;
                  }
                  .atom-text {
                    fill: #f8fafc;
                    font-size: 26px;
                    font-weight: 900;
                    font-family: sans-serif;
                    text-anchor: middle;
                    dominant-baseline: middle;
                  }
                  .lone-dot {
                    fill: #facc15;
                    stroke: #eab308;
                    stroke-width: 0.5px;
                    r: 4.5px;
                    animation: fade-in-dots 0.4s ease-out forwards;
                  }
                  @keyframes draw-line {
                    from { stroke-dasharray: 80; stroke-dashoffset: 80; }
                    to { stroke-dasharray: 80; stroke-dashoffset: 0; }
                  }
                  @keyframes fade-in-dots {
                    from { opacity: 0; transform: scale(0.2); }
                    to { opacity: 1; transform: scale(1); }
                  }
                `}</style>

                {/* Render Carbon Tetrachloride (CCl4) SVG */}
                {stepperExample === "ccl4" && (
                  <g>
                    {/* Skeleton lines (Step 2 and 3) */}
                    {currentStep >= 2 && (
                      <g>
                        <line x1="250" y1="175" x2="250" y2="105" className="bond-line" />
                        <line x1="250" y1="175" x2="250" y2="245" className="bond-line" />
                        <line x1="250" y1="175" x2="180" y2="175" className="bond-line" />
                        <line x1="250" y1="175" x2="320" y2="175" className="bond-line" />
                      </g>
                    )}

                    {/* Central Atom C */}
                    <text x="250" y="177" className="atom-text" fill="#6366f1">C</text>

                    {/* Outer Atoms Cl */}
                    <text x="250" y="70" className="atom-text">Cl</text>
                    <text x="250" y="280" className="atom-text">Cl</text>
                    <text x="140" y="177" className="atom-text">Cl</text>
                    <text x="360" y="177" className="atom-text">Cl</text>

                    {/* Outside Octet Dots (Step 3) */}
                    {currentStep >= 3 && (
                      <g>
                        {/* Top Cl dots */}
                        <circle cx="236" cy="62" className="lone-dot" />
                        <circle cx="236" cy="72" className="lone-dot" />
                        <circle cx="264" cy="62" className="lone-dot" />
                        <circle cx="264" cy="72" className="lone-dot" />
                        <circle cx="245" cy="51" className="lone-dot" />
                        <circle cx="255" cy="51" className="lone-dot" />

                        {/* Bottom Cl dots */}
                        <circle cx="236" cy="278" className="lone-dot" />
                        <circle cx="236" cy="288" className="lone-dot" />
                        <circle cx="264" cy="278" className="lone-dot" />
                        <circle cx="264" cy="288" className="lone-dot" />
                        <circle cx="245" cy="299" className="lone-dot" />
                        <circle cx="255" cy="299" className="lone-dot" />

                        {/* Left Cl dots */}
                        <circle cx="135" cy="162" className="lone-dot" />
                        <circle cx="145" cy="162" className="lone-dot" />
                        <circle cx="135" cy="192" className="lone-dot" />
                        <circle cx="145" cy="192" className="lone-dot" />
                        <circle cx="124" cy="172" className="lone-dot" />
                        <circle cx="124" cy="182" className="lone-dot" />

                        {/* Right Cl dots */}
                        <circle cx="355" cy="162" className="lone-dot" />
                        <circle cx="365" cy="162" className="lone-dot" />
                        <circle cx="355" cy="192" className="lone-dot" />
                        <circle cx="365" cy="192" className="lone-dot" />
                        <circle cx="376" cy="172" className="lone-dot" />
                        <circle cx="376" cy="182" className="lone-dot" />
                      </g>
                    )}
                  </g>
                )}

                {/* Render Nitrate Ion (NO3-) SVG */}
                {stepperExample === "no3" && (
                  <g>
                    {/* Bonds */}
                    {currentStep === 2 && (
                      <g>
                        <line x1="250" y1="180" x2="250" y2="120" className="bond-line" />
                        <line x1="250" y1="180" x2="185" y2="225" className="bond-line" />
                        <line x1="250" y1="180" x2="315" y2="225" className="bond-line" />
                      </g>
                    )}

                    {currentStep === 3 && (
                      <g>
                        <line x1="250" y1="180" x2="250" y2="120" className="bond-line" />
                        <line x1="250" y1="180" x2="185" y2="225" className="bond-line" />
                        <line x1="250" y1="180" x2="315" y2="225" className="bond-line" />
                      </g>
                    )}

                    {/* Double bond formed on Top Oxygen in Step 4 */}
                    {currentStep === 4 && (
                      <g>
                        <line x1="246" y1="180" x2="246" y2="115" className="double-bond" />
                        <line x1="254" y1="180" x2="254" y2="115" className="double-bond" />
                        <line x1="250" y1="180" x2="185" y2="225" className="bond-line" />
                        <line x1="250" y1="180" x2="315" y2="225" className="bond-line" />
                      </g>
                    )}

                    {/* Central Atom N */}
                    <text x="250" y="182" className="atom-text" fill="#a5b4fc">N</text>

                    {/* Outer Atoms O */}
                    <text x="250" y="85" className="atom-text">O</text>
                    <text x="155" y="242" className="atom-text">O</text>
                    <text x="345" y="242" className="atom-text">O</text>

                    {/* Oxygen Octet dots (Step 3 & 4) */}
                    {currentStep === 3 && (
                      <g>
                        {/* Top O dots (all 6) */}
                        <circle cx="236" cy="78" className="lone-dot" />
                        <circle cx="236" cy="88" className="lone-dot" />
                        <circle cx="264" cy="78" className="lone-dot" />
                        <circle cx="264" cy="88" className="lone-dot" />
                        <circle cx="245" cy="67" className="lone-dot" />
                        <circle cx="255" cy="67" className="lone-dot" />
                      </g>
                    )}

                    {currentStep === 4 && (
                      <g>
                        {/* Top O dots (only 4 left, two turned into double bond) */}
                        <circle cx="264" cy="78" className="lone-dot" />
                        <circle cx="264" cy="88" className="lone-dot" />
                        <circle cx="245" cy="67" className="lone-dot" />
                        <circle cx="255" cy="67" className="lone-dot" />
                      </g>
                    )}

                    {/* Bottom-left and Bottom-right Oxygen dots (Step 3 & 4) */}
                    {currentStep >= 3 && (
                      <g>
                        {/* Bottom-left O dots (6) */}
                        <circle cx="140" cy="235" className="lone-dot" />
                        <circle cx="140" cy="245" className="lone-dot" />
                        <circle cx="150" cy="256" className="lone-dot" />
                        <circle cx="160" cy="256" className="lone-dot" />
                        <circle cx="146" cy="226" className="lone-dot" />
                        <circle cx="156" cy="226" className="lone-dot" />

                        {/* Bottom-right O dots (6) */}
                        <circle cx="360" cy="235" className="lone-dot" />
                        <circle cx="360" cy="245" className="lone-dot" />
                        <circle cx="340" cy="256" className="lone-dot" />
                        <circle cx="350" cy="256" className="lone-dot" />
                        <circle cx="334" cy="226" className="lone-dot" />
                        <circle cx="344" cy="226" className="lone-dot" />
                      </g>
                    )}

                    {/* Brackets and superscript charge (Step 4 only) */}
                    {currentStep === 4 && (
                      <g>
                        {/* Left bracket */}
                        <path d="M 110,40 L 90,40 L 90,290 L 110,290" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                        {/* Right bracket */}
                        <path d="M 390,40 L 410,40 L 410,290 L 390,290" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                        {/* Negative sign */}
                        <text x="425" y="55" fill="#f8fafc" fontSize="24" fontWeight="bold">-</text>
                      </g>
                    )}
                  </g>
                )}
              </svg>
            </div>

            {/* Stepper Description and Controls (Col Span 5) */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between">
              
              {/* Stepper details */}
              <div className="flex flex-col gap-4">
                
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">
                  {stepperExample === "ccl4" ? "Carbon Tetrachloride (CCl₄)" : "Nitrate Ion (NO₃⁻)"}
                </span>

                {/* Dynamic explanations */}
                {stepperExample === "ccl4" && (
                  <div className="flex flex-col gap-3">
                    {currentStep === 1 && (
                      <div className="animate-in fade-in duration-200">
                        <h4 className={`text-white font-bold text-sm ${isKh ? "font-khmer" : ""}`}>
                          {t("Step 1: Find total valence electrons", "ជំហានទី ១៖ ស្វែងរកអេឡិចត្រុងវ៉ាឡង់សរុប")}
                        </h4>
                        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-indigo-300 font-mono font-bold text-center mt-2">
                          <InlineMath math={String.raw`C\,(4) + 4 \times Cl\,(7) = 32\,\text{e}^-`} />
                        </div>
                        <p className={`text-xs text-slate-400 mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                          {t(
                            "Identify Carbon as the central atom because it is less electronegative than Chlorine and has a higher bonding capacity (needs 4 bonds). Place Chlorine atoms around it.",
                            "កំណត់យកកាបូនជាអាតូមកណ្តាល ព្រោះវាមានអេឡិចត្រុងសកម្មទាបជាងក្លរ និងមានលទ្ធភាពបង្កើតចំណងខ្ពស់ជាង (ត្រូវការ ៤ ចំណង)។ រៀបចំអាតូមក្លរនៅជុំវិញវា។"
                          )}
                        </p>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="animate-in fade-in duration-200">
                        <h4 className={`text-white font-bold text-sm ${isKh ? "font-khmer" : ""}`}>
                          {t("Step 2: Draw single skeleton bonds", "ជំហានទី ២៖ គូរចំណងទោលតភ្ជាប់គ្រោង")}
                        </h4>
                        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-indigo-300 font-mono font-bold text-center mt-2">
                          <InlineMath math={String.raw`32\,\text{e}^- - 8\,\text{e}^-\text{ (4 bonds)} = 24\,\text{e}^-\;\text{left}`} />
                        </div>
                        <p className={`text-xs text-slate-400 mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                          {t(
                            "Draw a single covalent bond (representing 2 shared electrons) between Carbon and each Chlorine atom. This consumes 8 electrons in total.",
                            "គូរចំណងកូវ៉ាឡង់ទោល (តំណាងឱ្យអេឡិចត្រុង ២ នាក់ដែលចែករំលែកគ្នា) រវាងកាបូន និងអាតូមក្លរនីមួយៗ។ ជំហាននេះប្រើប្រាស់អស់ ៨ អេឡិចត្រុង។"
                          )}
                        </p>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="animate-in fade-in duration-200">
                        <h4 className={`text-white font-bold text-sm ${isKh ? "font-khmer" : ""}`}>
                          {t("Step 3: Complete octets on outside atoms", "ជំហានទី ៣៖ បំពេញក្បួនអដ្ឋធាតុលើអាតូមក្រៅ")}
                        </h4>
                        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-indigo-300 font-mono font-bold text-center mt-2">
                          <InlineMath math={String.raw`24\,\text{e}^- - 24\,\text{e}^-\text{ (lone pairs)} = 0\,\text{e}^-`} />
                        </div>
                        <p className={`text-xs text-slate-400 mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                          {t(
                            "Distribute the remaining 24 electrons as lone pairs (6 on each Chlorine) to satisfy their octets. Carbon already has 8 valence electrons from its 4 bonds, completing all octets.",
                            "បែងចែក ២៤ អេឡិចត្រុងដែលនៅសល់ជាគូអេឡិចត្រុងសេរី (៦ លើក្លរនីមួយៗ) ដើម្បីឱ្យពួកវាគ្រប់អដ្ឋធាតុ។ កាបូនមាន ៨ អេឡិចត្រុងរួចជាស្រេចពីចំណងទាំង ៤ របស់វា ដូច្នេះអដ្ឋធាតុទាំងអស់ត្រូវបានបំពេញ។"
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {stepperExample === "no3" && (
                  <div className="flex flex-col gap-3">
                    {currentStep === 1 && (
                      <div className="animate-in fade-in duration-200">
                        <h4 className={`text-white font-bold text-sm ${isKh ? "font-khmer" : ""}`}>
                          {t("Step 1: Calculate total valence & select center", "ជំហានទី ១៖ គណនាវ៉ាឡង់សរុប និងជ្រើសរើសអាតូមកណ្តាល")}
                        </h4>
                        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-indigo-300 font-mono font-bold text-center mt-2">
                          <InlineMath math={String.raw`N(5) + 3\times O(6) + 1(\text{charge}) = 24\,\text{e}^-`} />
                        </div>
                        <p className={`text-xs text-slate-400 mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                          {t(
                            "Add the valence electrons of Nitrogen (5) and Oxygen (3 x 6 = 18). Add 1 electron for the overall 1- negative charge. Nitrogen goes in the center.",
                            "បូកអេឡិចត្រុងវ៉ាឡង់នៃអាសូត (៥) និងអុកស៊ីសែន (៣ x ៦ = ១៨)។ បន្ថែម ១ អេឡិចត្រុងទៀតសម្រាប់បន្ទុកអវិជ្ជមាន ១-។ អាសូតស្ថិតនៅកណ្តាល។"
                          )}
                        </p>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="animate-in fade-in duration-200">
                        <h4 className={`text-white font-bold text-sm ${isKh ? "font-khmer" : ""}`}>
                          {t("Step 2: Draw single covalent bonds", "ជំហានទី ២៖ គូរចំណងកូវ៉ាឡង់ទោល")}
                        </h4>
                        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-indigo-300 font-mono font-bold text-center mt-2">
                          <InlineMath math={String.raw`24\,\text{e}^- - 6\,\text{e}^-\text{ (3 bonds)} = 18\,\text{e}^-\;\text{left}`} />
                        </div>
                        <p className={`text-xs text-slate-400 mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                          {t(
                            "Connect Nitrogen to the three Oxygen atoms using single bonds. This uses 6 electrons, leaving 18.",
                            "ភ្ជាប់អាសូតទៅនឹងអាតូមអុកស៊ីសែនទាំងបីដោយប្រើចំណងទោល។ ជំហាននេះប្រើអស់ ៦ អេឡិចត្រុង និងនៅសល់ ១៨។"
                          )}
                        </p>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="animate-in fade-in duration-200">
                        <h4 className={`text-white font-bold text-sm ${isKh ? "font-khmer" : ""}`}>
                          {t("Step 3: Complete octets on outside Oxygens", "ជំហានទី ៣៖ បំពេញអដ្ឋធាតុលើអុកស៊ីសែនខាងក្រៅ")}
                        </h4>
                        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-indigo-300 font-mono font-bold text-center mt-2">
                          <InlineMath math={String.raw`18\,\text{e}^- - 18\,\text{e}^-\text{ (lone pairs)} = 0\,\text{e}^-`} />
                        </div>
                        <p className={`text-xs text-slate-400 mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                          {t(
                            "Add the remaining 18 electrons to the outer Oxygen atoms (6 each, forming 3 lone pairs per Oxygen) to satisfy their octet rules. Note that Nitrogen is still electron deficient with only 6 valence electrons.",
                            "ដាក់ ១៨ អេឡិចត្រុងដែលនៅសល់លើអាតូមអុកស៊ីសែនខាងក្រៅ (៦ លើមួយៗ បង្កើតបាន ៣ គូសេរី) ដើម្បីបំពេញវិធានអដ្ឋធាតុ។ សង្កេតឃើញថាអាសូតនៅខ្វះអេឡិចត្រុងនៅឡើយ (មានតែ ៦)។"
                          )}
                        </p>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="animate-in fade-in duration-200">
                        <h4 className={`text-white font-bold text-sm ${isKh ? "font-khmer" : ""}`}>
                          {t("Step 4: Form multiple bonds for center atom", "ជំហានទី ៤៖ បង្កើតចំណងពហុសម្របសម្រួលសម្រាប់អាតូមកណ្តាល")}
                        </h4>
                        <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-indigo-300 text-xs font-semibold leading-relaxed mt-2">
                          {t(
                            "Shift one lone pair from an Oxygen atom to form a double bond. Enclose the structure in brackets and add a 1- charge superscript.",
                            "បម្លែងគូអេឡិចត្រុងសេរីមួយគូពីអុកស៊ីសែនឱ្យទៅជាចំណងទ្វេ។ ដាក់ទម្រង់ទាំងមូលក្នុងរបាំងឃ្នាប រួចបន្ថែមបន្ទុក ១- នៅខាងស្តាំខាងលើ។"
                          )}
                        </div>
                        <p className={`text-xs text-slate-400 mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                          {t(
                            "Moving a lone pair to form a N=O double bond satisfies the octet on Nitrogen (now sharing 8 electrons) and keeps all Oxygens complete. Brackets represent that the negative charge belongs to the entire ion.",
                            "ការរំកិលគូសេរីដើម្បីបង្កើតចំណងទ្វេ N=O ជួយឱ្យអាសូតគ្រប់អដ្ឋធាតុ (មាន ៨ អេឡិចត្រុង) និងរក្សាអុកស៊ីសែនឱ្យគ្រប់ដដែល។ របាំងឃ្នាបបញ្ជាក់ថាបន្ទុកអវិជ្ជមានជារបស់អ៊ីយ៉ុងទាំងមូល។"
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Controls */}
              <div className="flex justify-between items-center border-t border-slate-850 pt-4 mt-6">
                <button
                  onClick={resetStepper}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t("Reset", "សារដើម")}</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={currentStep === totalSteps}
                    className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 3: Bond Types & Terminology Grid */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h3 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.2rem, 2.2vw)" }}>
              {t("Covalent Bond Types & Shared Electrons", "ប្រភេទចំណងកូវ៉ាឡង់ និងការចែករំលែកអេឡិចត្រុង")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Single Bond */}
            <div className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase block border-b border-slate-850 pb-2">
                  {t("Single Bond", "ចំណងទោល")}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Example: Water (H₂O)</span>
              </div>
              
              {/* SVG Single Bond Structure */}
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-850/80 flex items-center justify-center min-h-[140px]">
                <svg viewBox="0 0 240 140" className="w-full max-w-[200px] h-auto select-none">
                  {/* Oxygen (Center) */}
                  <text x="120" y="55" fill="#f43f5e" fontSize="24" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">O</text>
                  
                  {/* Hydrogens */}
                  <text x="60" y="105" fill="#38bdf8" fontSize="20" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">H</text>
                  <text x="180" y="105" fill="#38bdf8" fontSize="20" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">H</text>

                  {/* Single bond lines */}
                  <line x1="105" y1="65" x2="75" y2="92" stroke="#6366f1" strokeWidth="2.5" />
                  <line x1="135" y1="65" x2="165" y2="92" stroke="#6366f1" strokeWidth="2.5" />

                  {/* Lone pairs on Oxygen */}
                  <circle cx="106" cy="30" r="3" fill="#facc15" />
                  <circle cx="116" cy="27" r="3" fill="#facc15" />

                  <circle cx="134" cy="30" r="3" fill="#facc15" />
                  <circle cx="124" cy="27" r="3" fill="#facc15" />

                  {/* Labels and pointers */}
                  <text x="120" y="12" fill="#facc15" fontSize="8" fontFamily="monospace" textAnchor="middle">{t("Lone Pairs", "គូសេរី")}</text>
                  <text x="120" y="82" fill="#6366f1" fontSize="8" fontFamily="monospace" textAnchor="middle">{t("Single Bonds", "ចំណងទោល")}</text>
                </svg>
              </div>

              <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "A single covalent bond is formed by sharing one pair (2 electrons) between two atoms. Water has two single O-H bonds and two lone pairs.",
                  "ចំណងកូវ៉ាឡង់ទោលកើតឡើងពីការចែករំលែកអេឡិចត្រុងមួយគូ (២ គ្រាប់) រវាងអាតូមពីរ។ ទឹកមានចំណងទោល O-H ចំនួនពីរ និងគូសេរីចំនួនពីរគូ។"
                )}
              </p>
            </div>

            {/* Card 2: Double Bond */}
            <div className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase block border-b border-slate-850 pb-2">
                  {t("Double Bond", "ចំណងទ្វេ")}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Example: Carbon Dioxide (CO₂)</span>
              </div>
              
              {/* SVG Double Bond Structure */}
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-850/80 flex items-center justify-center min-h-[140px]">
                <svg viewBox="0 0 240 140" className="w-full max-w-[200px] h-auto select-none">
                  {/* Atoms */}
                  <text x="50" y="70" fill="#f43f5e" fontSize="24" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">O</text>
                  <text x="120" y="70" fill="#6366f1" fontSize="24" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">C</text>
                  <text x="190" y="70" fill="#f43f5e" fontSize="24" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">O</text>

                  {/* Double bond lines */}
                  <line x1="72" y1="65" x2="98" y2="65" stroke="#6366f1" strokeWidth="2" />
                  <line x1="72" y1="75" x2="98" y2="75" stroke="#6366f1" strokeWidth="2" />

                  <line x1="142" y1="65" x2="168" y2="65" stroke="#6366f1" strokeWidth="2" />
                  <line x1="142" y1="75" x2="168" y2="75" stroke="#6366f1" strokeWidth="2" />

                  {/* Lone pairs on Oxygen */}
                  <circle cx="34" cy="55" r="3" fill="#facc15" />
                  <circle cx="34" cy="65" r="3" fill="#facc15" />
                  <circle cx="34" cy="75" r="3" fill="#facc15" />
                  <circle cx="34" cy="85" r="3" fill="#facc15" />

                  <circle cx="206" cy="55" r="3" fill="#facc15" />
                  <circle cx="206" cy="65" r="3" fill="#facc15" />
                  <circle cx="206" cy="75" r="3" fill="#facc15" />
                  <circle cx="206" cy="85" r="3" fill="#facc15" />

                  <text x="120" y="112" fill="#6366f1" fontSize="8" fontFamily="monospace" textAnchor="middle">{t("2 Double Bonds", "ចំណងទ្វេ ២")}</text>
                </svg>
              </div>

              <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "A double covalent bond is formed by sharing two pairs (4 electrons) between two atoms. Carbon Dioxide shares 4 electrons with each Oxygen.",
                  "ចំណងកូវ៉ាឡង់ទ្វេកើតឡើងពីការចែករំលែកអេឡិចត្រុងពីរគូ (៤ គ្រាប់) រវាងអាតូមពីរ។ កាបូនឌីអុកស៊ីតចែករំលែកអេឡិចត្រុង ៤ ជាមួយអុកស៊ីសែននីមួយៗ។"
                )}
              </p>
            </div>

            {/* Card 3: Triple Bond */}
            <div className="bg-slate-950/70 border border-slate-850 p-5 rounded-2xl flex flex-col gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase block border-b border-slate-850 pb-2">
                  {t("Triple Bond", "ចំណងត្រី")}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Example: Nitrogen Gas (N₂)</span>
              </div>
              
              {/* SVG Triple Bond Structure */}
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-850/80 flex items-center justify-center min-h-[140px]">
                <svg viewBox="0 0 240 140" className="w-full max-w-[200px] h-auto select-none">
                  {/* Nitrogen Atoms */}
                  <text x="70" y="70" fill="#a5b4fc" fontSize="26" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">N</text>
                  <text x="170" y="70" fill="#a5b4fc" fontSize="26" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">N</text>

                  {/* Triple bond lines */}
                  <line x1="95" y1="60" x2="145" y2="60" stroke="#6366f1" strokeWidth="2" />
                  <line x1="95" y1="70" x2="145" y2="70" stroke="#6366f1" strokeWidth="2" />
                  <line x1="95" y1="80" x2="145" y2="80" stroke="#6366f1" strokeWidth="2" />

                  {/* Lone pairs on outer sides */}
                  <circle cx="45" cy="65" r="3" fill="#facc15" />
                  <circle cx="45" cy="75" r="3" fill="#facc15" />

                  <circle cx="195" cy="65" r="3" fill="#facc15" />
                  <circle cx="195" cy="75" r="3" fill="#facc15" />

                  <text x="120" y="112" fill="#6366f1" fontSize="8" fontFamily="monospace" textAnchor="middle">{t("Triple Bond (6 e⁻)", "ចំណងត្រី (៦ អេឡិចត្រុង)")}</text>
                </svg>
              </div>

              <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "A triple covalent bond is formed by sharing three pairs (6 electrons) between two atoms. Nitrogen gas forms a very strong N≡N triple bond.",
                  "ចំណងកូវ៉ាឡង់ត្រីកើតឡើងពីការចែករំលែកអេឡិចត្រុងបីគូ (៦ គ្រាប់) រវាងអាតូមពីរ។ ឧស្ម័នអាសូតបង្កើតចំណងត្រី N≡N ដ៏រឹងមាំបំផុត។"
                )}
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 4: History & Theory Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          
          {/* Gilbert N. Lewis Profile (Col Span 5) */}
          <section className="lg:col-span-5 bg-indigo-950/20 border border-indigo-500/20 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                GN
              </div>
              <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block">
                  {t("HISTORICAL PROFILE", "ប្រវត្តិរូបសង្ខេប")}
                </span>
                <h4 className="text-white font-bold text-base leading-tight">
                  Gilbert N. Lewis (1875 - 1946)
                </h4>
              </div>
            </div>

            <span className="text-xs font-bold text-indigo-300 font-mono italic">
              {t("The Father of the Lewis Structure", "បិតានៃទម្រង់លុយអុីសចំនុច")}
            </span>

            <p className={`text-xs text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "American physical chemist Gilbert Newton Lewis revolutionized chemical bonding theory. In his landmark 1916 paper, 'The Atom and the Molecule', he proposed that atoms form covalent bonds by sharing pairs of electrons. He introduced the cubical atom model, the octet rule, and the electron-dot diagrams we use today.",
                "គីមីវិទូជនជាតិអាមេរិក លោក Gilbert Newton Lewis បានធ្វើបដិវត្តន៍ទ្រឹស្តីសម្ព័ន្ធគីមី។ នៅក្នុង مقالة ល្បីរបស់លោកក្នុងឆ្នាំ ១៩១៦ 'អាតូម និងម៉ូលេគុល' លោកបានស្នើថាអាតូមបង្កើតចំណងកូវ៉ាឡង់ដោយចែករំលែកគូអេឡិចត្រុង។ លោកបានណែនាំគំរូអាតូមគូប វិធានអដ្ឋធាតុ និងគំនូសបំព្រួញអេឡិចត្រុងចំនុចដែលយើងប្រើសព្វថ្ងៃ។"
              )}
            </p>

            <div className="bg-slate-950/50 p-3 rounded-lg border border-indigo-900/30 text-[10px] text-indigo-400/90 font-mono">
              ★ {t("Nominated for Nobel Prize 41 times but never won.", "ត្រូវបានគេស្នើឈ្មោះសម្រាប់រង្វាន់ណូបែលចំនួន ៤១ ដង ប៉ុន្តែមិនដែលបានទទួល។")}
            </div>
          </section>

          {/* Quick Quiz & Memory Rules (Col Span 7) */}
          <section className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <h3 className={`font-black text-white ${isKh ? "font-khmer" : ""}`} style={{ fontSize: "max(1.1rem, 2vw)" }}>
                {t("Valence Rules Summary", "សេចក្តីសង្ខេបវិធានវ៉ាឡង់")}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col gap-2">
                <span className="text-xs font-bold text-yellow-400 block border-b border-slate-900 pb-1.5">
                  {t("The Octet Rule", "វិធានអដ្ឋធាតុ (Octet Rule)")}
                </span>
                <p className={`text-[11px] text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Main group atoms share or transfer electrons to achieve 8 valence electrons, matching stable noble gases configuration (s²p⁶).",
                    "អាតូមក្រុមសំខាន់ៗចែករំលែក ឬផ្ទេរអេឡិចត្រុង ដើម្បីសម្រេចបានអេឡិចត្រុងវ៉ាឡង់ ៨ ដូចជាការរៀបចំរបស់ឧស្ម័នកម្រដែលមានលំនឹង (s²p⁶)។"
                  )}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col gap-2">
                <span className="text-xs font-bold text-sky-400 block border-b border-slate-900 pb-1.5">
                  {t("The Duet Rule", "វិធានឌុយអែត (Duet Rule)")}
                </span>
                <p className={`text-[11px] text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Light elements like Hydrogen and Helium seek only 2 valence electrons to fill their single 1s energy level shell.",
                    "ធាតុស្រាលៗដូចជាអ៊ីដ្រូសែន និងអេល្យូម ត្រូវការអេឡិចត្រុងតែ ២ គ្រាប់ប៉ុណ្ណោះ ដើម្បីបំពេញស្រទាប់ថាមពល ១s តែមួយរបស់ពួកវា។"
                  )}
                </p>
              </div>

            </div>

            <div className="bg-indigo-950/15 p-4 rounded-xl border border-indigo-900/20 text-xs mt-2">
              <span className="font-bold text-indigo-300 block mb-1">
                {t("Exception: Expanded Octets", "ករណីលើកលែង៖ អដ្ឋធាតុពង្រីក")}
              </span>
              <p className={`text-slate-400 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Elements in Period 3 and below (like Sulfur in SF₆ or Phosphorus in PCl₅) can expand their valence shell to hold 10 or 12 electrons by utilizing empty d-orbitals.",
                  "ធាតុគីមីនៅក្នុងខួបទី ៣ ឬក្រោមនេះ (ដូចជាស្ពាន់ធ័រក្នុង SF₆ ឬផូស្វ័រក្នុង PCl₅) អាចពង្រីកស្រទាប់វ៉ាឡង់របស់វាឱ្យផ្ទុកបាន ១០ ឬ ១២ អេឡិចត្រុង ដោយប្រើប្រាស់គន្លងរង d ទំនេរ។"
                )}
              </p>
            </div>

          </section>

        </div>

      </main>
    </div>
  );
}
