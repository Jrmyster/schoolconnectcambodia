import { useState, useMemo } from "react";
import { Dna } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type Geno = "RR" | "Rr" | "rr";

const GENOS: { id: Geno; en: string; kh: string; alleles: ["R" | "r", "R" | "r"] }[] = [
  { id: "RR", en: "Pure Red (RR)",   kh: "ក្រហមសុទ្ធ (RR)", alleles: ["R", "R"] },
  { id: "Rr", en: "Mixed (Rr)",      kh: "ផ្សំ (Rr)",        alleles: ["R", "r"] },
  { id: "rr", en: "Pure White (rr)", kh: "សសុទ្ធ (rr)",      alleles: ["r", "r"] },
];

function pheno(a: "R" | "r", b: "R" | "r"): "red" | "white" {
  return a === "R" || b === "R" ? "red" : "white";
}

export function PunnettSquare() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [p1, setP1] = useState<Geno>("Rr");
  const [p2, setP2] = useState<Geno>("Rr");

  const a1 = GENOS.find(g => g.id === p1)!.alleles;
  const a2 = GENOS.find(g => g.id === p2)!.alleles;

  const grid = useMemo(() => {
    const cells: { row: number; col: number; alleles: ["R"|"r","R"|"r"]; pheno: "red" | "white" }[] = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const a = a1[i], b = a2[j];
        const sorted: ["R"|"r","R"|"r"] = (a === "r" && b === "R") ? [b, a] : [a, b];
        cells.push({ row: i, col: j, alleles: sorted, pheno: pheno(a, b) });
      }
    }
    return cells;
  }, [a1, a2]);

  const reds = grid.filter(c => c.pheno === "red").length;
  const whites = grid.filter(c => c.pheno === "white").length;

  return (
    <div className="rounded-2xl bg-white border border-emerald-200/70 shadow-sm overflow-hidden">
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-rose-50 via-pink-50 to-white border-b border-emerald-200/70">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-rose-700/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Dna className="w-3.5 h-3.5" />
          <span>{kh ? "ឧបករណ៍គណនា Punnett Square" : "Punnett Square Calculator"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-stone-900 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "បន្សំពូជផ្កាក្រហម × ផ្កាស" : "Cross-breed Red × White Flowers"}
        </h3>
        <p className={`mt-1 text-sm text-stone-600 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "R = ហ្សែនក្រហម (មានឥទ្ធិពលលើស)។ r = ហ្សែនស (ទន់ខ្សោយ)។ ផ្កាមួយមានហ្សែនពីរ — មួយពីឪ និងមួយពីម្តាយ។"
            : "R = red allele (dominant). r = white allele (recessive). Each flower carries two alleles — one from each parent."}
        </p>
      </div>

      <div className="p-5 sm:p-7 grid lg:grid-cols-[1fr,1.2fr] gap-6">
        <div className="space-y-4">
          {[
            { label: kh ? "ដើមឪ" : "Parent 1", val: p1, set: setP1 },
            { label: kh ? "ដើមម្តាយ" : "Parent 2", val: p2, set: setP2 },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <div className={`text-xs font-medium text-stone-700 mb-1.5 ${kh ? "font-khmer" : ""}`}>{label}</div>
              <div className="flex flex-wrap gap-2">
                {GENOS.map(g => (
                  <button
                    key={g.id}
                    onClick={() => set(g.id)}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition border ${
                      val === g.id ? "bg-rose-600 text-white border-rose-700 shadow" : "bg-white text-stone-700 border-stone-200 hover:border-rose-300"
                    } ${kh ? "font-khmer" : ""}`}
                    aria-pressed={val === g.id}
                  >
                    <FlowerIcon
                      color={g.id === "RR" ? "#dc2626" : g.id === "rr" ? "#fafafa" : "#fb7185"}
                      stroke={val === g.id ? "white" : "#888"}
                    />
                    {kh ? g.kh : g.en}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-stone-200">
            <div className={`text-xs font-medium text-stone-500 uppercase tracking-wider mb-2 ${kh ? "font-khmer normal-case" : ""}`}>
              {kh ? "លទ្ធផលដែលរំពឹងទុក" : "Expected results"}
            </div>
            <div className="space-y-1.5">
              <ResultBar label={kh ? "ផ្កាក្រហម" : "Red flowers"} count={reds} color="#dc2626" textOnBar="white" />
              <ResultBar label={kh ? "ផ្កាស" : "White flowers"} count={whites} color="#e2e8f0" textOnBar="#334155" />
            </div>
            <div className={`mt-3 text-xs text-stone-600 ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? `សមាមាត្រ៖ ${reds}៖${whites} (ក្រហម៖ស)` : `Ratio: ${reds}:${whites} (red : white)`}
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-[auto,1fr,1fr] gap-1.5">
            <div></div>
            {a2.map((al, i) => (
              <div key={i} className="text-center text-sm font-bold text-stone-700 pb-1">{al}</div>
            ))}
            {a1.map((al, i) => (
              <div key={`row${i}`} className="contents">
                <div className="flex items-center justify-end pr-2 text-sm font-bold text-stone-700">{al}</div>
                {a2.map((_, j) => {
                  const cell = grid.find(c => c.row === i && c.col === j)!;
                  const isRed = cell.pheno === "red";
                  return (
                    <div
                      key={j}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 shadow-sm border-2 ${
                        isRed
                          ? "bg-gradient-to-br from-rose-500 to-red-700 border-red-800 text-white"
                          : "bg-gradient-to-br from-white to-slate-100 border-slate-300 text-slate-700"
                      }`}
                    >
                      <FlowerIcon color={isRed ? "#fecaca" : "#f8fafc"} stroke={isRed ? "white" : "#94a3b8"} large />
                      <span className="text-sm font-bold">{cell.alleles.join("")}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <p className={`mt-3 text-xs text-stone-500 text-center ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "កោសិកានីមួយៗបង្ហាញកូនមួយដែលអាចកើតមាន ដោយមានហ្សែនមួយពីដើមឪ និងមួយពីដើមម្តាយ។"
              : "Each cell shows one possible offspring, with one allele from each parent."}
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultBar({ label, count, color, textOnBar = "white" }: { label: string; count: number; color: string; textOnBar?: string }) {
  const pct = (count / 4) * 100;
  return (
    <div className="text-xs">
      <div className="flex justify-between mb-0.5"><span>{label}</span><span className="font-bold">{count}/4 ({pct.toFixed(0)}%)</span></div>
      <div className="h-3 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color, color: textOnBar }} />
      </div>
    </div>
  );
}

function FlowerIcon({ color, stroke = "white", large = false }: { color: string; stroke?: string; large?: boolean }) {
  const s = large ? 28 : 18;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {[0, 72, 144, 216, 288].map(a => (
        <ellipse key={a} cx={12} cy={5} rx={3.2} ry={4.5} fill={color} stroke={stroke} strokeWidth={1} transform={`rotate(${a} 12 12)`} />
      ))}
      <circle cx={12} cy={12} r={2.4} fill="#fbbf24" stroke={stroke} strokeWidth={1} />
    </svg>
  );
}
