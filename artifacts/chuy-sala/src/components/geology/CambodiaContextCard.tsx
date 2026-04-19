import { ShieldCheck, MapPin, Flame } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

export function CambodiaContextCard() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-amber-50 shadow-sm overflow-hidden">
      {/* Header strip */}
      <div className="px-5 sm:px-7 py-4 bg-emerald-700 text-white flex items-start gap-3">
        <ShieldCheck className="w-7 h-7 flex-shrink-0 mt-0.5" />
        <div className="min-w-0">
          <div className={`text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-100 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "បរិបទកម្ពុជា" : "Cambodia Context"}
          </div>
          <h3 className={`font-display text-lg sm:text-xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh
              ? "ហេតុអ្វីបានជាកម្ពុជាមានសុវត្ថិភាពពីរញ្ជួយដី និងភ្នំភ្លើងធំៗ?"
              : "Why is Cambodia safe from major earthquakes and volcanoes?"}
          </h3>
          {kh && (
            <p className="mt-0.5 text-xs text-emerald-100/80">
              Why is Cambodia safe from major earthquakes and volcanoes?
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-0">
        {/* Mini map of Sunda Plate + Ring of Fire */}
        <div className="bg-gradient-to-br from-stone-50 to-amber-100 p-4 border-b md:border-b-0 md:border-r-2 border-emerald-200">
          <SundaPlateMap kh={kh} />
        </div>

        {/* Explanation */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className={`text-sm sm:text-base text-stone-800 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}>
            {kh ? (
              <>
                កម្ពុជាស្ថិតនៅកណ្ដាល{" "}
                <span className="font-bold text-emerald-800 bg-emerald-100 px-1.5 rounded">ផ្លាកស៊ុនដា (Sunda Plate)</span>
                {" "}— ដែលជាតំបន់ស្ងប់ស្ងាត់ ឆ្ងាយពីព្រំដែនប្លាកដ៏ច្របូកច្របល់នៃ "
                <span className="font-bold text-red-700">«រង្វង់ភ្លើង» (Ring of Fire)</span>{" "}
                នៃមហាសមុទ្រប៉ាស៊ីហ្វិក។ មានន័យថា ដី ផ្ទាល់ក្រោមជើងរបស់យើងមិនកំពុងធ្លាក់ មិនកំពុងបែក ឬមិនកំពុងរអិលកាត់ប្លាកមួយទៀតឡើយ។
              </>
            ) : (
              <>
                Cambodia sits in the middle of the{" "}
                <span className="font-bold text-emerald-800 bg-emerald-100 px-1.5 rounded">Sunda Plate</span>
                {" "}— a large, calm interior region, far from the chaotic plate boundaries of the{" "}
                <span className="font-bold text-red-700">"Ring of Fire"</span>{" "}
                that surrounds the Pacific Ocean. That means the ground under our feet isn't being pulled apart, crashed together, or sliding past another plate.
              </>
            )}
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            <FactCard
              kh={kh}
              icon={<MapPin className="w-4 h-4" />}
              labelEn="Plate"
              labelKh="ប្លាក"
              valueEn="Sunda"
              valueKh="ស៊ុនដា"
              tone="emerald"
            />
            <FactCard
              kh={kh}
              icon={<span className="text-xs font-mono">~700 km</span>}
              labelEn="To nearest boundary"
              labelKh="ដល់ព្រំដែនជិតបំផុត"
              valueEn="Sunda Trench (SW of Sumatra)"
              valueKh="ដុនរណ្ដៅស៊ុនដា (និរតីស៊ូម៉ាត្រា)"
              tone="amber"
            />
            <FactCard
              kh={kh}
              icon={<Flame className="w-4 h-4" />}
              labelEn="Active volcanoes"
              labelKh="ភ្នំភ្លើងសកម្ម"
              valueEn="Zero in Cambodia"
              valueKh="សូន្យនៅកម្ពុជា"
              tone="slate"
            />
          </div>

          <div className={`rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs sm:text-sm text-amber-900 ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
            <span className="font-bold">{kh ? "សម្គាល់៖ " : "Note: "}</span>
            {kh
              ? "កម្ពុជាអាចមានរញ្ជួយដីតូចៗម្ដងម្កាល ប៉ុន្តែគ្មានភ្នំភ្លើងសកម្ម និងគ្មានហានិភ័យដ៏ធំ — អរគុណដល់ផ្លាកស៊ុនដាដែលនៅស្ងប់!"
              : "Cambodia can feel small earthquakes from time to time, but has no active volcanoes and very low risk of large quakes — thanks to the calm Sunda Plate beneath us!"}
          </div>
        </div>
      </div>
    </div>
  );
}

function FactCard({
  icon, labelEn, labelKh, valueEn, valueKh, kh, tone,
}: {
  icon: React.ReactNode;
  labelEn: string; labelKh: string;
  valueEn: string; valueKh: string;
  kh: boolean;
  tone: "emerald" | "amber" | "slate";
}) {
  const tones = {
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
    amber:   "bg-amber-50 border-amber-200 text-amber-900",
    slate:   "bg-slate-100 border-slate-300 text-slate-800",
  }[tone];
  return (
    <div className={`rounded-xl border-2 p-3 ${tones}`}>
      <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest opacity-70 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        <span className="opacity-80">{icon}</span>
        {kh ? labelKh : labelEn}
      </div>
      <div className={`mt-1 font-bold text-sm leading-snug ${kh ? "font-khmer" : ""}`}>
        {kh ? valueKh : valueEn}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Mini regional map: Sunda Plate centered, Ring of Fire arcs around    */
/* ────────────────────────────────────────────────────────────────────── */

function SundaPlateMap({ kh }: { kh: boolean }) {
  return (
    <div>
      <div className={`text-[10px] font-mono uppercase tracking-widest text-stone-600 mb-2 text-center ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? "តំបន់អាស៊ីអាគ្នេយ៍" : "Southeast Asia"}
      </div>
      <svg viewBox="0 0 240 220" className="w-full h-auto">
        {/* Ocean background */}
        <rect width="240" height="220" fill="#a8c0d6" rx="10" />

        {/* Ring of Fire arcs (red) */}
        <path d="M 30 30 Q 10 110 30 200" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="2 4" opacity="0.7" />
        <path d="M 210 30 Q 230 110 210 200" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="2 4" opacity="0.7" />
        <text x="14" y="115" fontSize="8" fontWeight="700" fill="#7f1d1d"
              transform="rotate(-90 14 115)" style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 2 }}>
          {kh ? "រង្វង់ភ្លើង" : "Ring of Fire"}
        </text>
        <text x="226" y="115" fontSize="8" fontWeight="700" fill="#7f1d1d"
              transform="rotate(90 226 115)" style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 2 }}>
          {kh ? "រង្វង់ភ្លើង" : "Ring of Fire"}
        </text>

        {/* Sunda Plate (large, green, central) */}
        <polygon points="60,55 180,55 195,140 170,180 80,180 50,140"
                 fill="#86efac" stroke="#15803d" strokeWidth="2.4" opacity="0.85" />
        <text x="120" y="100" textAnchor="middle" fontSize="13" fontWeight="800" fill="#14532d"
              style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-sans-serif" }}>
          {kh ? "ផ្លាកស៊ុនដា" : "Sunda Plate"}
        </text>
        <text x="120" y="115" textAnchor="middle" fontSize="9" fill="#166534"
              style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-sans-serif" }}>
          {kh ? "(តំបន់ស្ថិរភាព)" : "(stable interior)"}
        </text>

        {/* Sunda Trench dashed line at bottom-left edge */}
        <path d="M 80 180 Q 65 195 60 210" fill="none" stroke="#dc2626" strokeWidth="2.5" />
        <text x="40" y="208" fontSize="7.5" fontWeight="700" fill="#7f1d1d"
              style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 2 }}>
          {kh ? "ដុនរណ្ដៅស៊ុនដា" : "Sunda Trench"}
        </text>

        {/* Cambodia marker */}
        <g>
          <circle cx={123} cy={88} r={5} fill="#dc2626" stroke="#fff" strokeWidth={1.8} />
          <circle cx={123} cy={88} r={9} fill="none" stroke="#dc2626" strokeWidth={1.2} opacity={0.6}>
            <animate attributeName="r" values="5;12;5" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text x={132} y={92} fontSize={9.5} fontWeight={800} fill="#7f1d1d"
                style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 2.5, fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-sans-serif" }}>
            {kh ? "កម្ពុជា" : "Cambodia"}
          </text>
        </g>

        {/* Volcanoes around the edges (Java/Sumatra/Philippines) */}
        {[
          [70, 195], [95, 200], [120, 205], [185, 90], [195, 60], [205, 165],
        ].map(([x, y], i) => (
          <g key={i}>
            <polygon points={`${x},${y} ${x - 4},${y + 6} ${x + 4},${y + 6}`} fill="#7c2d12" />
            <circle cx={x} cy={y - 1} r={1.5} fill="#fb923c" />
          </g>
        ))}
      </svg>
      <div className={`mt-2 text-[10px] text-center text-stone-600 ${kh ? "font-khmer leading-loose text-xs" : ""}`}>
        {kh
          ? "កម្ពុជា (•) ស្ថិតនៅលើផ្លាកដ៏ស្ងប់ — ភ្នំភ្លើង (▲) និងព្រំដែនគ្រោះថ្នាក់នៅឆ្ងាយ។"
          : "Cambodia (•) sits on a calm plate — volcanoes (▲) and dangerous boundaries are far away."}
      </div>
    </div>
  );
}
