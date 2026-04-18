import { useState, useMemo } from "react";
import { Sprout, Play, RotateCcw } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type Moth = { id: number; color: "light" | "dark"; x: number; y: number };

const NUM_MOTHS = 30;
let _id = 1;
const nextId = () => _id++;

function randomMoths(): Moth[] {
  const arr: Moth[] = [];
  for (let i = 0; i < NUM_MOTHS; i++) {
    arr.push({
      id: nextId(),
      color: i < NUM_MOTHS / 2 ? "light" : "dark",
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
    });
  }
  return arr;
}

export function NaturalSelectionSim() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [pollution, setPollution] = useState(20);
  const [moths, setMoths] = useState<Moth[]>(randomMoths);
  const [gen, setGen] = useState(0);
  const [history, setHistory] = useState<{ gen: number; light: number; dark: number }[]>([
    { gen: 0, light: NUM_MOTHS / 2, dark: NUM_MOTHS / 2 },
  ]);

  const stats = useMemo(() => ({
    light: moths.filter(m => m.color === "light").length,
    dark: moths.filter(m => m.color === "dark").length,
    total: moths.length,
  }), [moths]);

  function runGeneration() {
    const darkness = pollution / 100;
    const survivors = moths.filter(m => {
      const visibility = m.color === "light" ? darkness : 1 - darkness;
      const survival = 1 - 0.7 * visibility;
      return Math.random() < survival;
    });
    if (survivors.length === 0) {
      setMoths([]);
      const next = gen + 1;
      setGen(next);
      setHistory(h => [...h, { gen: next, light: 0, dark: 0 }].slice(-12));
      return;
    }
    const next: Moth[] = [];
    let i = 0;
    while (next.length < NUM_MOTHS) {
      const parent = survivors[i % survivors.length];
      next.push({
        id: nextId(),
        color: parent.color,
        x: Math.random() * 90 + 5,
        y: Math.random() * 80 + 10,
      });
      i++;
    }
    setMoths(next);
    const nextGen = gen + 1;
    setGen(nextGen);
    const light = next.filter(m => m.color === "light").length;
    const dark = next.filter(m => m.color === "dark").length;
    setHistory(h => [...h, { gen: nextGen, light, dark }].slice(-12));
  }

  function reset() {
    setMoths(randomMoths());
    setGen(0);
    setHistory([{ gen: 0, light: NUM_MOTHS / 2, dark: NUM_MOTHS / 2 }]);
  }

  const darkness = pollution / 100;
  const barkColor = `rgb(${Math.round(230 - 180 * darkness)}, ${Math.round(210 - 165 * darkness)}, ${Math.round(180 - 145 * darkness)})`;

  return (
    <div className="rounded-2xl bg-white border border-emerald-200/70 shadow-sm overflow-hidden">
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-stone-100 to-emerald-50 border-b border-emerald-200/70">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-700/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Sprout className="w-3.5 h-3.5" />
          <span>{kh ? "ការជ្រើសរើសធម្មជាតិ" : "Natural Selection in action"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-stone-900 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "សត្វស្លាបក្រហោមដើមឈើ" : "The Peppered Moth"}
        </h3>
        <p className={`mt-1 text-sm text-stone-600 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "នៅអង់គ្លេសសតវត្សទី១៩ សត្វស្លាបពណ៌ស្រាលលាក់ខ្លួនបានល្អនៅលើដើមឈើស្អាត។ នៅពេលរោងចក្រធ្វើឱ្យដើមឈើខ្មៅដោយផ្សែង — សត្វស្លាបពណ៌ខ្មៅភ្លាមៗមានគុណសម្បត្តិ ហើយការជ្រើសរើសធម្មជាតិបានចូលដំណើរការ។"
            : "In 19th-century England, light-coloured moths blended in on clean tree bark. When factories darkened the trees with soot, dark moths suddenly had the advantage — and natural selection took over."}
        </p>
      </div>

      <div className="p-5 sm:p-7 grid lg:grid-cols-[1.3fr,1fr] gap-6">
        <div>
          <div className="rounded-xl overflow-hidden border-2 border-stone-300 relative" style={{ background: barkColor, height: 300 }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true">
              {Array.from({ length: 25 }).map((_, i) => (
                <path key={i} d={`M${i * 4 + (i % 3)},0 Q${i * 4 + 2},50 ${i * 4},100`} stroke="rgba(0,0,0,0.25)" strokeWidth="0.3" fill="none" />
              ))}
            </svg>
            {moths.map(m => (
              <div
                key={m.id}
                className="absolute transition-all duration-500"
                style={{
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  width: 14,
                  height: 10,
                  background: m.color === "light" ? "#f5f0e0" : "#1c1917",
                  border: `1px solid ${m.color === "light" ? "#a8a29e" : "#0c0a09"}`,
                  borderRadius: "60%",
                  transform: "translate(-50%,-50%)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
                title={m.color === "light" ? (kh ? "ស្លាបស្រាល" : "Light moth") : (kh ? "ស្លាបខ្មៅ" : "Dark moth")}
              />
            ))}
          </div>

          <div className="mt-4">
            <div className={`flex items-center justify-between text-xs text-stone-700 mb-1 ${kh ? "font-khmer" : ""}`}>
              <span>{kh ? "កម្រិតផ្សែង (ភាពខ្មៅនៃដើមឈើ)" : "Soot pollution (bark darkness)"}</span>
              <span className="font-bold">{pollution}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={pollution}
              onChange={(e) => setPollution(Number(e.target.value))}
              className="w-full accent-emerald-700"
              aria-label={kh ? "កម្រិតផ្សែង" : "Pollution level"}
            />
            <div className={`flex justify-between text-[10px] text-stone-500 mt-0.5 ${kh ? "font-khmer text-xs" : ""}`}>
              <span>{kh ? "ដើមឈើស្អាត" : "Clean trees"}</span>
              <span>{kh ? "ពេញដោយផ្សែង" : "Heavily polluted"}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={runGeneration}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition shadow ${kh ? "font-khmer" : ""}`}>
              <Play className="w-4 h-4" /> {kh ? "បង្កើតជំនាន់បន្ទាប់" : "Run next generation"}
            </button>
            <button onClick={reset}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-100 text-stone-700 text-sm font-medium hover:bg-stone-200 transition border border-stone-300 ${kh ? "font-khmer" : ""}`}>
              <RotateCcw className="w-4 h-4" /> {kh ? "ចាប់ផ្តើមឡើងវិញ" : "Reset"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-lime-50 border border-emerald-200 p-4">
            <div className={`text-[11px] font-mono uppercase tracking-widest text-emerald-700/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {kh ? "ជំនាន់" : "Generation"}
            </div>
            <div className="text-3xl font-bold text-emerald-950">{gen}</div>
          </div>

          <div className="space-y-2">
            <PopBar label={kh ? "សត្វស្លាបស្រាល" : "Light moths"} count={stats.light} total={NUM_MOTHS} color="#f5f0e0" textOnBar="#1c1917" />
            <PopBar label={kh ? "សត្វស្លាបខ្មៅ" : "Dark moths"} count={stats.dark} total={NUM_MOTHS} color="#1c1917" textOnBar="#f5f0e0" />
          </div>

          {history.length > 1 && (
            <div className="rounded-xl bg-white border border-stone-200 p-3">
              <div className={`text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? "ប្រវត្តិចំនួនប្រជាសាស្ត្រ" : "Population history"}
              </div>
              <svg viewBox={`0 0 ${Math.max(history.length, 2) * 18} 60`} className="w-full h-16">
                {(["light", "dark"] as const).map(c => {
                  const d = history
                    .map((h, i) => `${i === 0 ? "M" : "L"}${i * 18 + 9},${60 - (h[c] / NUM_MOTHS) * 55 - 2}`)
                    .join(" ");
                  return <path key={c} d={d} stroke={c === "light" ? "#a8a29e" : "#1c1917"} strokeWidth="2" fill="none" strokeLinejoin="round" />;
                })}
              </svg>
              <div className={`text-[10px] text-stone-500 flex justify-between ${kh ? "font-khmer text-xs" : ""}`}>
                <span>{kh ? "ជំនាន់" : "Gen"} 0</span>
                <span>{kh ? "ជំនាន់" : "Gen"} {gen}</span>
              </div>
            </div>
          )}

          <div className={`text-xs text-stone-600 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            <strong>{kh ? "សាកល្បង៖" : "Try this:"}</strong>{" "}
            {kh
              ? "កំណត់កម្រិតផ្សែងទៅ ៩០% ហើយចុច 'បង្កើតជំនាន់បន្ទាប់' ច្រើនដង។ រួចបន្ថយត្រឡប់មក ០% ហើយមើលថាតើពណ៌ណាត្រឡប់មកវិញ។"
              : "Set pollution to 90% and click 'Run next generation' a few times. Then drop it back to 0% and watch the opposite happen."}
          </div>
        </div>
      </div>
    </div>
  );
}

function PopBar({ label, count, total, color, textOnBar = "white" }: { label: string; count: number; total: number; color: string; textOnBar?: string }) {
  const pct = (count / total) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs text-stone-700 mb-1">
        <span>{label}</span>
        <span className="font-bold">{count}/{total}</span>
      </div>
      <div className="h-5 rounded-full overflow-hidden bg-stone-100 border border-stone-200 relative">
        <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
        {pct > 12 && (
          <span className="absolute inset-0 flex items-center justify-end pr-2 text-[10px] font-bold" style={{ color: textOnBar }}>
            {pct.toFixed(0)}%
          </span>
        )}
      </div>
    </div>
  );
}
