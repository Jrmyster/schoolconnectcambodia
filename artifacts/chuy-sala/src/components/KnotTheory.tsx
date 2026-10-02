import { KnotDiagram } from "@/components/diagrams/LearningDiagrams";
import { useState } from "react";

import { useLanguageStore } from "@/store/use-language";
import { Anchor, RefreshCw } from "lucide-react";

// -------------------------------------------------------------
// INITIALIZATIONS
// -------------------------------------------------------------

// -------------------------------------------------------------
// ROPE PHYSICS COMPONENT
// -------------------------------------------------------------

export default function KnotTheory() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  const [knotType, setKnotType] = useState<"unknot" | "trefoil">("unknot");
  const [resetKey, setResetKey] = useState(0); // to force re-mount and reset

  const loadUnknot = () => {
    setKnotType("unknot");
    setResetKey((prev) => prev + 1);
  };

  const loadTrefoil = () => {
    setKnotType("trefoil");
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row gap-6 mb-8">
        {/* Left Side: Context & Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 flex flex-col h-full">
            <h3
              className={`text-xl font-bold text-slate-800 mb-3 ${isKh ? "font-khmer" : ""}`}
            >
              {isKh ? "ការសិក្សាអំពីចំណង (Knot Theory)" : "Knot Theory"}
            </h3>
            <p
              className={`text-sm text-slate-700 leading-relaxed mb-6 flex-grow ${isKh ? "font-khmer" : ""}`}
            >
              {isKh
                ? "ចំណង Trefoil (Trefoil Knot) មិនអាចបន្ធូរចេញទៅជារង្វង់ធម្មតាបានទេដោយមិនកាត់វា ខុសពី Unknot (រង្វង់ធម្មតា) ដែលគ្រាន់តែមើលទៅរញ៉េរញ៉ៃ។ សាកល្បងអូសខ្សែដើម្បីស្រាយវា!"
                : "A Trefoil Knot is mathematically knotted and cannot be untangled into a plain circle without cutting it, unlike the tangled Unknot. Rotate the diagram to inspect the crossings."}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={loadUnknot}
                className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold transition-all shadow-sm ${
                  knotType === "unknot"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                } ${isKh ? "font-khmer" : ""}`}
              >
                <RefreshCw
                  className={`w-4 h-4 ${knotType === "unknot" ? "text-emerald-100" : "text-slate-400"}`}
                />
                {isKh ? "ផ្ទុក Unknot (អាចស្រាយបាន)" : "Load Unknot (Tangled)"}
              </button>

              <button
                onClick={loadTrefoil}
                className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold transition-all shadow-sm ${
                  knotType === "trefoil"
                    ? "bg-rose-600 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                } ${isKh ? "font-khmer" : ""}`}
              >
                <Anchor
                  className={`w-4 h-4 ${knotType === "trefoil" ? "text-rose-100" : "text-slate-400"}`}
                />
                {isKh ? "ផ្ទុក Trefoil (មិនអាចស្រាយបាន)" : "Load Trefoil Knot"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: interactive SVG projection */}
        <div className="w-full lg:w-2/3 h-[450px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-inner border-[4px] border-slate-800 touch-none">
          <KnotDiagram kind={knotType} key={resetKey} />

          <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
            <div
              className={`bg-slate-800/60 backdrop-blur-md border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold ${isKh ? "font-khmer" : ""}`}
            >
              {isKh
                ? "អូសដើម្បីពិនិត្យចំណុចប្រសព្វ"
                : "Drag to inspect the crossings"}
            </div>
            {knotType === "trefoil" && (
              <div
                className={`bg-rose-500/20 backdrop-blur-md border border-rose-500 text-rose-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                {isKh ? "មិនអាចស្រាយបានទេ" : "Mathematically Knotted"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
