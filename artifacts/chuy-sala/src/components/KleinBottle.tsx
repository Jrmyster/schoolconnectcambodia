import { KleinDiagram } from "@/components/diagrams/LearningDiagrams";
import { useState } from "react";

import { useLanguageStore } from "@/store/use-language";
import { Activity } from "lucide-react";

/*
  Custom implementation of ParametricGeometry to avoid external imports.
  u and v will range from 0 to 1, then mapped to 0 to 2PI in the function.
*/

// Figure-8 Klein Bottle parametric function

export default function KleinBottle() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  const [isTracing, setIsTracing] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row gap-6 mb-8">
        {/* Left Side: Context & Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100 flex flex-col justify-center h-full">
            <h3
              className={`text-xl font-bold text-slate-800 mb-3 ${isKh ? "font-khmer" : ""}`}
            >
              {isKh ? "ផ្ទៃមិនអាចកំណត់ទិសដៅបាន" : "A Non-Orientable Surface"}
            </h3>
            <p
              className={`text-sm text-slate-700 leading-relaxed mb-6 ${isKh ? "font-khmer" : ""}`}
            >
              {isKh
                ? 'ដប Klein គឺជារូបរាងប្លែកដែល "ខាងក្នុង" និង "ខាងក្រៅ" គឺជាផ្ទៃតែមួយ។ ប្រសិនបើអ្នកដើរតាមបណ្តោយផ្ទៃរបស់វា អ្នកនឹងត្រឡប់មកកន្លែងដើមវិញ ប៉ុន្តែស្ថិតនៅម្ខាងទៀតនៃផ្ទៃនោះ ដោយមិនចាំបាច់ឆ្លងកាត់គែមឡើយ!'
                : 'The Klein Bottle is a 3D manifold where the "inside" and "outside" are the exact same surface. If you travel along it, you will eventually return to your starting point, but flipped upside down, without ever crossing an edge!'}
            </p>

            <button
              onClick={() => setIsTracing(!isTracing)}
              className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold transition-all shadow-sm ${
                isTracing
                  ? "bg-amber-100 text-amber-700 border-2 border-amber-300 hover:bg-amber-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md"
              } ${isKh ? "font-khmer" : ""}`}
            >
              <Activity
                className={`w-5 h-5 ${isTracing ? "animate-pulse" : ""}`}
              />
              {isTracing
                ? isKh
                  ? "បញ្ឈប់ការបញ្ចាំង"
                  : "Stop Tracing"
                : isKh
                  ? "បញ្ចាំងផ្ទៃ"
                  : "Trace Surface"}
            </button>
          </div>
        </div>

        {/* Right Side: interactive SVG projection */}
        <div className="w-full lg:w-2/3 h-[400px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-inner border-[4px] border-slate-800">
          <KleinDiagram tracing={isTracing} />
          {isTracing && (
            <div className="absolute top-4 left-4 bg-amber-500/20 backdrop-blur-md border border-amber-400 text-amber-100 px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {isKh
                ? "កំពុងតាមដានផ្ទៃ (u, v)..."
                : "Tracing coordinates (u, v)..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
