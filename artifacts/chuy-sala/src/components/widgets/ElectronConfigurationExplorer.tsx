import React, { useState } from "react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { ELEMENTS, CATEGORY_META, type Element } from "./periodic-data";
import { Layers, Eye, EyeOff, Info } from "lucide-react";

const NOBLE_GAS_CORES: Record<string, string> = {
  "[He]": "1s²",
  "[Ne]": "1s² 2s² 2p⁶",
  "[Ar]": "1s² 2s² 2p⁶ 3s² 3p⁶",
  "[Kr]": "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶",
  "[Xe]": "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶ 5s² 4d¹⁰ 5p⁶",
};

// Converts string with unicode superscripts like "1s²" into React elements with <sup> tags
function renderConfigWithSuperscripts(configStr: string) {
  const superscriptMap: Record<string, string> = {
    "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
    "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
  };
  
  const result: React.ReactNode[] = [];
  let currentText = "";
  let currentSuper = "";
  let inSuper = false;

  for (let i = 0; i < configStr.length; i++) {
    const char = configStr[i];
    if (superscriptMap[char] !== undefined) {
      if (!inSuper) {
        if (currentText) result.push(<React.Fragment key={`t-${i}`}>{currentText}</React.Fragment>);
        currentText = "";
        inSuper = true;
      }
      currentSuper += superscriptMap[char];
    } else {
      if (inSuper) {
        result.push(<sup key={`s-${i}`} className="text-[0.6em] font-bold text-indigo-400">{currentSuper}</sup>);
        currentSuper = "";
        inSuper = false;
      }
      currentText += char;
    }
  }

  if (currentText) result.push(<React.Fragment key="t-end">{currentText}</React.Fragment>);
  if (currentSuper) result.push(<sup key="s-end" className="text-[0.6em] font-bold text-indigo-400">{currentSuper}</sup>);

  return result;
}

export function ElectronConfigurationExplorer() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // First 60 elements (Hydrogen to Neodymium)
  const elements = ELEMENTS.slice(0, 60);

  // Default selection: Carbon (z=6)
  const [selectedZ, setSelectedZ] = useState<number>(6);
  const [decodeCore, setDecodeCore] = useState<boolean>(false);

  const selectedElement = elements.find((e) => e.z === selectedZ) || elements[0];

  // Logic to decode the noble gas core if enabled
  let displayConfig = selectedElement.config;
  let hasCore = false;
  
  const coreMatch = displayConfig.match(/^(\[[A-Z][a-z]?\])/);
  if (coreMatch) {
    hasCore = true;
    if (decodeCore) {
      const coreSymbol = coreMatch[1];
      if (NOBLE_GAS_CORES[coreSymbol]) {
        displayConfig = displayConfig.replace(coreSymbol, NOBLE_GAS_CORES[coreSymbol]);
      }
    }
  }

  return (
    <div className="rounded-3xl bg-[#050b18] border border-slate-800 shadow-xl overflow-hidden mt-8 mb-12">
      {/* Header & Concept Explanation */}
      <div className="px-6 py-8 md:px-10 md:py-10 bg-slate-900/50 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Layers className="w-64 h-64 text-indigo-300" />
        </div>
        
        <div className="relative z-10 flex items-center gap-3 text-indigo-400 mb-3">
          <Layers className="w-6 h-6" />
          <h2 className={`text-xl font-bold uppercase tracking-widest ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {t("Electron Configuration Explorer", "កម្មវិធីរុករកការរៀបចំអេឡិចត្រុង")}
          </h2>
        </div>
        
        <h3 className={`text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)] ${isKh ? "font-khmer leading-snug" : ""}`}>
          {t("The Quantum Address", "អាសយដ្ឋានកង់ទិច")}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-300">
          <div className="space-y-4">
            <p className={`leading-relaxed text-lg ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Electron configuration is the 'address' of electrons in an atom. Instead of flying randomly, electrons live in specific shells and orbitals around the nucleus.",
                "ការរៀបចំអេឡិចត្រុងគឺជា 'អាសយដ្ឋាន' របស់អេឡិចត្រុងក្នុងអាតូម។ ជំនួសឱ្យការហោះហើរដោយគ្មានសណ្តាប់ធ្នាប់ អេឡិចត្រុងរស់នៅក្នុងសំបកនិងគន្លងជាក់លាក់ជុំវិញស្នូល។"
              )}
            </p>
            <p className={`leading-relaxed text-slate-400 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "We use shorthand notation with a Noble Gas (like [Ar]) to represent the inner, stable electrons, so we can focus on the outer valence electrons that actually cause chemical reactions.",
                "យើងប្រើការសរសេរកាត់ជាមួយឧស្ម័នអភិជន (ដូចជា [Ar]) ដើម្បីតំណាងឱ្យអេឡិចត្រុងខាងក្នុងដែលស្ថិតស្ថេរ ដូច្នេះយើងអាចផ្តោតលើអេឡិចត្រុងខាងក្រៅដែលបង្កឱ្យមានប្រតិកម្មគីមី។"
              )}
            </p>
          </div>
          
          {/* Blocks Definition */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <span className="text-rose-400 font-bold font-mono text-xl block mb-1">s-block</span>
              <span className={`text-sm text-slate-400 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t("Spherical orbitals. Holds 2 electrons.", "គន្លងរាងស្វ៊ែរ។ ផ្ទុកអេឡិចត្រុង ២។")}
              </span>
            </div>
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <span className="text-amber-400 font-bold font-mono text-xl block mb-1">p-block</span>
              <span className={`text-sm text-slate-400 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t("Dumbbell shape. Holds 6 electrons.", "រាងដុំដែកលើក។ ផ្ទុកអេឡិចត្រុង ៦។")}
              </span>
            </div>
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <span className="text-sky-400 font-bold font-mono text-xl block mb-1">d-block</span>
              <span className={`text-sm text-slate-400 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t("Complex shape. Holds 10 electrons.", "រាងស្មុគស្មាញ។ ផ្ទុកអេឡិចត្រុង ១០។")}
              </span>
            </div>
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <span className="text-purple-400 font-bold font-mono text-xl block mb-1">f-block</span>
              <span className={`text-sm text-slate-400 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t("Highly complex. Holds 14 electrons.", "រាងស្មុគស្មាញខ្លាំង។ ផ្ទុកអេឡិចត្រុង ១៤។")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Area */}
      <div className="p-6 md:p-10 flex flex-col xl:flex-row gap-10 bg-[#0a1122]">
        
        {/* Left: Element Selection Grid (1-60) */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h4 className={`text-lg font-bold text-slate-200 ${isKh ? "font-khmer" : ""}`}>
              {t("Select Element (1-60)", "ជ្រើសរើសធាតុ (១-៦០)")}
            </h4>
            <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">
              Z = 1 → 60
            </span>
          </div>
          
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2 pb-2">
            {elements.map((el) => {
              const isSelected = el.z === selectedZ;
              const meta = CATEGORY_META[el.category];
              
              // We'll map the element category to a simpler dark-theme friendly border/bg
              let catColors = "border-slate-700 bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white";
              if (meta.family === "metal") catColors = "border-sky-900/50 bg-sky-950/30 text-sky-400 hover:bg-sky-900/80 hover:text-sky-100";
              if (meta.family === "nonmetal") catColors = "border-emerald-900/50 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/80 hover:text-emerald-100";
              if (meta.family === "metalloid") catColors = "border-amber-900/50 bg-amber-950/30 text-amber-400 hover:bg-amber-900/80 hover:text-amber-100";

              if (isSelected) {
                catColors = "border-indigo-500 bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)] scale-105 z-10";
              }

              return (
                <button
                  key={el.z}
                  onClick={() => setSelectedZ(el.z)}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200 ${catColors}`}
                >
                  <span className="absolute top-1 left-1.5 text-[9px] font-mono opacity-60 leading-none">{el.z}</span>
                  <span className="font-bold text-lg sm:text-xl leading-none mt-2">{el.symbol}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Output Visualization */}
        <div className="flex-1 flex flex-col bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-inner relative">
          
          <div className="flex justify-between items-start mb-8 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-3xl font-black text-indigo-300">
                {selectedElement.symbol}
              </div>
              <div>
                <h2 className={`text-2xl font-bold text-white ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? selectedElement.nameKh : selectedElement.nameEn}
                </h2>
                <div className={`text-slate-400 text-sm mt-1 ${isKh ? "font-khmer" : "font-mono"}`}>
                  Z = {selectedElement.z} • {isKh ? CATEGORY_META[selectedElement.category].kh : CATEGORY_META[selectedElement.category].en}
                </div>
              </div>
            </div>
            
            {hasCore && (
              <button
                onClick={() => setDecodeCore(!decodeCore)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  decodeCore 
                    ? "bg-indigo-500 text-white shadow-md" 
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                } ${isKh ? "font-khmer" : ""}`}
              >
                {decodeCore ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {decodeCore 
                  ? t("Hide Core", "លាក់ស្នូល") 
                  : t("Decode Noble Gas", "បកប្រែឧស្ម័នអភិជន")}
              </button>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center items-center py-6">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
              {t("Electron Configuration", "ការរៀបចំអេឡិចត្រុង")}
            </span>
            
            {/* Massive Typography Output */}
            <div 
              className="font-mono font-bold text-white tracking-wider text-center drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
              style={{ fontSize: "max(2rem, 3vw)", lineHeight: "1.2" }}
            >
              {renderConfigWithSuperscripts(displayConfig)}
            </div>
            
            {hasCore && decodeCore && (
              <div className={`mt-8 text-xs text-indigo-300 bg-indigo-900/30 px-4 py-2 rounded-lg border border-indigo-500/20 flex items-center gap-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
                <Info className="w-4 h-4" />
                {t(
                  "The inner noble gas core has been fully expanded to reveal all inner shell electrons.",
                  "ស្នូលឧស្ម័នអភិជនខាងក្នុងត្រូវបានពង្រីកពេញលេញដើម្បីបង្ហាញអេឡិចត្រុងសំបកខាងក្នុងទាំងអស់។"
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
