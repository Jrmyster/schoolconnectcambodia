import { useState } from "react";
import { Microscope, Leaf, PawPrint, Info } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type OrganelleId =
  | "membrane" | "wall" | "nucleus" | "mito" | "chloroplast"
  | "vacuole" | "er" | "golgi" | "ribosome" | "lysosome";

const ORGANELLES: Record<OrganelleId, {
  label: { en: string; kh: string };
  fn:    { en: string; kh: string };
  in:    Array<"plant" | "animal">;
  color: string;
}> = {
  membrane:    { label: { en: "Cell Membrane", kh: "ភ្នាសកោសិកា" },
                 fn: { en: "Outer boundary that controls what enters and leaves the cell.",
                       kh: "ព្រំដែនខាងក្រៅដែលគ្រប់គ្រងអ្វីដែលចូល និងចេញពីកោសិកា។" },
                 in: ["plant","animal"], color: "#0e7490" },
  wall:        { label: { en: "Cell Wall", kh: "ជញ្ជាំងកោសិកា" },
                 fn: { en: "Stiff outer layer made of cellulose — gives plants their shape and strength.",
                       kh: "ស្រទាប់ខាងក្រៅរឹងធ្វើពីសែលុយឡូស — ផ្តល់រូបរាង និងភាពរឹងមាំដល់រុក្ខជាតិ។" },
                 in: ["plant"], color: "#65a30d" },
  nucleus:     { label: { en: "Nucleus", kh: "នុយក្លេអ៊ែ" },
                 fn: { en: "Control center — holds the DNA, the cell's instruction manual.",
                       kh: "មជ្ឈមណ្ឌលត្រួតពិនិត្យ — ផ្ទុក DNA ដែលជាសៀវភៅណែនាំរបស់កោសិកា។" },
                 in: ["plant","animal"], color: "#7c3aed" },
  mito:        { label: { en: "Mitochondria", kh: "មីតូកុនឌ្រី" },
                 fn: { en: "Powerhouses — turn sugar and oxygen into usable energy (ATP).",
                       kh: "ប្រភពថាមពល — ប្រែស្ករ និងអុកស៊ីហ្សែនទៅជាថាមពលប្រើប្រាស់បាន (ATP)។" },
                 in: ["plant","animal"], color: "#dc2626" },
  chloroplast: { label: { en: "Chloroplasts", kh: "ក្លរ៉ូផ្លាស្ត" },
                 fn: { en: "Capture sunlight and make sugar by photosynthesis (plants only).",
                       kh: "ចាប់ពន្លឺព្រះអាទិត្យ ហើយផលិតស្ករដោយរស្មីសំយោគ (តែក្នុងរុក្ខជាតិប៉ុណ្ណោះ)។" },
                 in: ["plant"], color: "#16a34a" },
  vacuole:     { label: { en: "Vacuole", kh: "វ៉ាគួល" },
                 fn: { en: "Storage sac for water and nutrients — very large in plant cells.",
                       kh: "ថង់ផ្ទុកទឹក និងសារធាតុចិញ្ចឹម — ធំខ្លាំងក្នុងកោសិការុក្ខជាតិ។" },
                 in: ["plant","animal"], color: "#0ea5e9" },
  er:          { label: { en: "Endoplasmic Reticulum", kh: "បណ្តាញ ER" },
                 fn: { en: "Folded network of tubes that builds proteins and lipids.",
                       kh: "បណ្តាញបំពង់ដែលផលិតប្រូតេអ៊ីន និងលីពីត។" },
                 in: ["plant","animal"], color: "#f59e0b" },
  golgi:       { label: { en: "Golgi Apparatus", kh: "ឧបករណ៍ហ្គោលជី" },
                 fn: { en: "Packages proteins and ships them to the right place.",
                       kh: "វេចខ្ចប់ប្រូតេអ៊ីន ហើយដឹកជញ្ជូនទៅកន្លែងត្រឹមត្រូវ។" },
                 in: ["plant","animal"], color: "#f97316" },
  ribosome:    { label: { en: "Ribosomes", kh: "រីបូសូម" },
                 fn: { en: "Tiny factories that read RNA and assemble proteins.",
                       kh: "រោងចក្រតូចៗដែលអាន RNA ហើយផ្គុំប្រូតេអ៊ីន។" },
                 in: ["plant","animal"], color: "#a855f7" },
  lysosome:    { label: { en: "Lysosomes", kh: "លីសូសូម" },
                 fn: { en: "Recycling centers — break down old or unwanted parts (mostly in animal cells).",
                       kh: "មជ្ឈមណ្ឌលកែច្នៃ — បំបែកផ្នែកចាស់ ឬមិនត្រូវការ (ភាគច្រើនក្នុងកោសិកាសត្វ)។" },
                 in: ["animal"], color: "#ef4444" },
};

type Part = {
  id: OrganelleId;
  shape: "ellipse" | "rect" | "circle";
  cx?: number; cy?: number; rx?: number; ry?: number; r?: number;
  x?: number; y?: number; w?: number; h?: number; rr?: number;
  rot?: number;
};

const ANIMAL_PARTS: Part[] = [
  { id: "nucleus",   shape: "ellipse", cx: 320, cy: 195, rx: 70, ry: 52 },
  { id: "mito",      shape: "ellipse", cx: 140, cy: 130, rx: 28, ry: 14, rot: -15 },
  { id: "mito",      shape: "ellipse", cx: 470, cy: 290, rx: 28, ry: 14, rot: 18 },
  { id: "mito",      shape: "ellipse", cx: 195, cy: 295, rx: 26, ry: 13, rot: 8 },
  { id: "er",        shape: "ellipse", cx: 230, cy: 220, rx: 60, ry: 22 },
  { id: "golgi",     shape: "ellipse", cx: 430, cy: 140, rx: 44, ry: 10 },
  { id: "vacuole",   shape: "circle",  cx: 130, cy: 240, r: 16 },
  { id: "lysosome",  shape: "circle",  cx: 385, cy: 295, r: 13 },
  { id: "lysosome",  shape: "circle",  cx: 240, cy: 110, r: 11 },
  { id: "ribosome",  shape: "circle",  cx: 260, cy: 145, r: 4 },
  { id: "ribosome",  shape: "circle",  cx: 280, cy: 250, r: 4 },
  { id: "ribosome",  shape: "circle",  cx: 380, cy: 240, r: 4 },
  { id: "ribosome",  shape: "circle",  cx: 175, cy: 180, r: 4 },
  { id: "ribosome",  shape: "circle",  cx: 410, cy: 195, r: 4 },
];

const PLANT_PARTS: Part[] = [
  { id: "wall",        shape: "rect",    x: 30,  y: 40,  w: 540, h: 320, rr: 28 },
  { id: "membrane",    shape: "rect",    x: 50,  y: 60,  w: 500, h: 280, rr: 22 },
  { id: "vacuole",     shape: "rect",    x: 165, y: 115, w: 270, h: 170, rr: 60 },
  { id: "nucleus",     shape: "ellipse", cx: 100, cy: 200, rx: 42, ry: 36 },
  { id: "chloroplast", shape: "ellipse", cx: 220, cy: 88,  rx: 22, ry: 12, rot: -10 },
  { id: "chloroplast", shape: "ellipse", cx: 320, cy: 84,  rx: 22, ry: 12, rot: 5 },
  { id: "chloroplast", shape: "ellipse", cx: 410, cy: 90,  rx: 22, ry: 12, rot: 14 },
  { id: "chloroplast", shape: "ellipse", cx: 510, cy: 150, rx: 22, ry: 12, rot: 70 },
  { id: "chloroplast", shape: "ellipse", cx: 510, cy: 240, rx: 22, ry: 12, rot: 110 },
  { id: "chloroplast", shape: "ellipse", cx: 410, cy: 312, rx: 22, ry: 12, rot: -10 },
  { id: "chloroplast", shape: "ellipse", cx: 300, cy: 318, rx: 22, ry: 12, rot: 0 },
  { id: "chloroplast", shape: "ellipse", cx: 200, cy: 312, rx: 22, ry: 12, rot: 8 },
  { id: "mito",        shape: "ellipse", cx: 100, cy: 90,  rx: 20, ry: 10, rot: -10 },
  { id: "mito",        shape: "ellipse", cx: 105, cy: 312, rx: 20, ry: 10, rot: 12 },
  { id: "golgi",       shape: "ellipse", cx: 510, cy: 88,  rx: 28, ry: 8 },
  { id: "ribosome",    shape: "circle",  cx: 130, cy: 150, r: 3 },
  { id: "ribosome",    shape: "circle",  cx: 130, cy: 260, r: 3 },
  { id: "ribosome",    shape: "circle",  cx: 510, cy: 312, r: 3 },
];

export function CellExplorer() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [type, setType] = useState<"plant" | "animal">("animal");
  const [active, setActive] = useState<OrganelleId | null>(null);

  const parts = type === "animal" ? ANIMAL_PARTS : PLANT_PARTS;
  const activeMeta = active ? ORGANELLES[active] : null;

  return (
    <div className="rounded-2xl bg-white border border-emerald-200/70 shadow-sm overflow-hidden">
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-emerald-50 via-lime-50 to-white border-b border-emerald-200/70">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-700/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              <Microscope className="w-3.5 h-3.5" />
              <span>{kh ? "ឧបករណ៍រុករកកោសិកា" : "Cell Explorer"}</span>
            </div>
            <h3 className={`font-display text-xl sm:text-2xl font-bold text-emerald-950 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
              {kh ? "កោសិការុក្ខជាតិ ប្រៀបធៀបនឹងកោសិកាសត្វ" : "Plant Cell vs. Animal Cell"}
            </h3>
            <p className={`mt-1 text-sm text-stone-600 ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? "ចុចលើផ្នែកនីមួយៗ ដើម្បីរៀនពីមុខងាររបស់វា។" : "Tap any part of the cell to learn what it does."}
            </p>
          </div>
          <div role="tablist" className="inline-flex p-1 bg-emerald-100 rounded-full" aria-label={kh ? "ប្រភេទកោសិកា" : "Cell type"}>
            {(["animal", "plant"] as const).map((tt) => (
              <button
                key={tt}
                role="tab"
                aria-selected={type === tt}
                onClick={() => { setType(tt); setActive(null); }}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  type === tt ? "bg-white shadow text-emerald-900" : "text-emerald-800/70 hover:text-emerald-900"
                } ${kh ? "font-khmer" : ""}`}
              >
                {tt === "animal" ? <PawPrint className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
                {kh ? (tt === "animal" ? "សត្វ" : "រុក្ខជាតិ") : (tt === "animal" ? "Animal" : "Plant")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr,1fr] gap-0">
        <div className="p-4 sm:p-6 bg-gradient-to-br from-stone-50 to-emerald-50/40">
          <svg viewBox="0 0 600 400" className="w-full h-auto" role="img" aria-label={kh ? `ដ្យាក្រាមកោសិកា${type === "animal" ? "សត្វ" : "រុក្ខជាតិ"}` : `${type} cell diagram`}>
            {type === "animal" && (
              <ellipse cx={300} cy={200} rx={270} ry={160} fill="#ecfccb" />
            )}
            {parts.map((p, i) => {
              const o = ORGANELLES[p.id];
              const isActive = active === p.id;
              const transform = p.rot ? `rotate(${p.rot} ${p.cx} ${p.cy})` : undefined;
              const handlers = {
                onMouseEnter: () => setActive(p.id),
                onClick: () => setActive(p.id),
                style: { cursor: "pointer", transition: "all 0.15s" },
                tabIndex: 0,
                onKeyDown: (e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(p.id); }
                },
                role: "button",
                "aria-label": kh ? o.label.kh : o.label.en,
              };
              if (p.shape === "ellipse") {
                return (
                  <ellipse
                    key={i}
                    cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry}
                    fill={o.color + (isActive ? "" : "cc")}
                    stroke={isActive ? o.color : "rgba(0,0,0,0.18)"}
                    strokeWidth={isActive ? 3 : 1}
                    transform={transform}
                    {...handlers}
                  />
                );
              }
              if (p.shape === "circle") {
                return (
                  <circle
                    key={i}
                    cx={p.cx} cy={p.cy} r={p.r}
                    fill={o.color + (isActive ? "" : "cc")}
                    stroke={isActive ? o.color : "rgba(0,0,0,0.18)"}
                    strokeWidth={isActive ? 2 : 1}
                    {...handlers}
                  />
                );
              }
              // rect (wall, membrane, vacuole)
              const fillRect =
                p.id === "wall"     ? "#dcfce7" :
                p.id === "membrane" ? "transparent" :
                p.id === "vacuole"  ? "#bae6fd" :
                                      o.color + "cc";
              return (
                <rect
                  key={i}
                  x={p.x} y={p.y} width={p.w} height={p.h} rx={p.rr} ry={p.rr}
                  fill={fillRect}
                  stroke={isActive ? o.color : (p.id === "wall" ? "#65a30d" : p.id === "membrane" ? "#0e7490" : "rgba(0,0,0,0.18)")}
                  strokeWidth={p.id === "wall" ? 5 : p.id === "membrane" ? 2 : isActive ? 3 : 1}
                  strokeDasharray={p.id === "membrane" ? "5 3" : undefined}
                  {...handlers}
                />
              );
            })}
            {type === "animal" && (
              <ellipse
                cx={300} cy={200} rx={270} ry={160}
                fill="none" stroke={ORGANELLES.membrane.color} strokeWidth={3}
                strokeDasharray="6 4"
                onMouseEnter={() => setActive("membrane")}
                onClick={() => setActive("membrane")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive("membrane"); }
                }}
                role="button"
                tabIndex={0}
                style={{ cursor: "pointer" }}
                aria-label={kh ? ORGANELLES.membrane.label.kh : ORGANELLES.membrane.label.en}
              />
            )}
            {active && activeMeta && (
              <text x={300} y={388} textAnchor="middle" fontSize={13} fontWeight={600} fill="#064e3b">
                {kh ? activeMeta.label.kh : activeMeta.label.en}
              </text>
            )}
          </svg>
        </div>

        <div className="p-5 sm:p-6 border-t lg:border-t-0 lg:border-l border-emerald-200/70 bg-white">
          {!active ? (
            <div className="text-sm text-stone-600 flex items-start gap-2">
              <Info className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <p className={kh ? "font-khmer leading-loose" : ""}>
                {kh ? "ចុចលើផ្នែកណាមួយនៃកោសិកា ដើម្បីរៀនពីមុខងាររបស់វា ឬជ្រើសរើសពីបញ្ជីខាងក្រោម។" : "Click any part of the cell to learn what it does. Or pick one from the list below."}
              </p>
            </div>
          ) : activeMeta && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: activeMeta.color }} />
                <h4 className={`font-bold text-emerald-950 text-lg ${kh ? "font-khmer" : ""}`}>{kh ? activeMeta.label.kh : activeMeta.label.en}</h4>
              </div>
              <p className={`text-sm text-stone-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {kh ? activeMeta.fn.kh : activeMeta.fn.en}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {activeMeta.in.includes("animal") && (
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 ${kh ? "font-khmer" : ""}`}>
                    <PawPrint className="w-3 h-3" /> {kh ? "ក្នុងកោសិកាសត្វ" : "In animal cells"}
                  </span>
                )}
                {activeMeta.in.includes("plant") && (
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-lime-50 text-lime-800 border border-lime-200 ${kh ? "font-khmer" : ""}`}>
                    <Leaf className="w-3 h-3" /> {kh ? "ក្នុងកោសិការុក្ខជាតិ" : "In plant cells"}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="mt-5 pt-5 border-t border-stone-200">
            <div className={`text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {kh ? "ផ្នែកនៃកោសិកានេះ" : "Parts of this cell"}
            </div>
            <div className="grid grid-cols-2 gap-1">
              {(Object.keys(ORGANELLES) as OrganelleId[])
                .filter(id => ORGANELLES[id].in.includes(type))
                .map(id => {
                  const o = ORGANELLES[id];
                  return (
                    <button
                      key={id}
                      onClick={() => setActive(id)}
                      className={`text-left text-xs px-2 py-1.5 rounded flex items-center gap-1.5 transition ${
                        active === id ? "bg-emerald-100 text-emerald-900 font-medium" : "hover:bg-stone-100 text-stone-700"
                      } ${kh ? "font-khmer" : ""}`}
                    >
                      <span className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: o.color }} />
                      <span className="truncate">{kh ? o.label.kh : o.label.en}</span>
                    </button>
                  );
                })
              }
            </div>
          </div>
          <div className={`mt-5 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 ${kh ? "font-khmer leading-loose" : ""}`}>
            <div className="font-bold mb-1">{kh ? "ភាពខុសគ្នាសំខាន់" : "Key differences"}</div>
            {kh ? (
              <ul className="list-disc list-inside space-y-0.5">
                <li>រុក្ខជាតិមាន <strong>ជញ្ជាំងកោសិកា</strong>, <strong>ក្លរ៉ូផ្លាស្ត</strong> និង <strong>វ៉ាគួលធំ</strong> — សត្វមិនមានទេ។</li>
                <li>សត្វមាន <strong>លីសូសូម</strong> — រុក្ខជាតិកម្រមាន។</li>
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-0.5">
                <li>Plant cells have a <strong>cell wall</strong>, <strong>chloroplasts</strong> and one <strong>large vacuole</strong> — animal cells don't.</li>
                <li>Animal cells have <strong>lysosomes</strong> — plant cells rarely do.</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
