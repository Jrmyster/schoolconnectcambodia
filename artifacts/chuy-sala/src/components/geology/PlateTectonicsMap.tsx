import { useState } from "react";
import { Globe2, MousePointerClick, Mountain, Flame, Activity, X } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type BoundaryType = "convergent" | "divergent" | "transform";

type Boundary = {
  id: string;
  nameEn: string;
  nameKh: string;
  type: BoundaryType;
  /** Polyline points "x1,y1 x2,y2 …" on a 1000×500 equirectangular viewBox. */
  points: string;
  resultEn: string;
  resultKh: string;
  exampleEn: string;
  exampleKh: string;
};

type Plate = {
  id: string;
  nameEn: string;
  nameKh: string;
  /** SVG polygon points. */
  points: string;
  /** Label position. */
  lx: number;
  ly: number;
  /** Earth-tone fill. */
  fill: string;
  highlight?: boolean;
};

/* ── Simplified equirectangular world (1000×500) ─────────────────────── */
/* Continent silhouettes are deliberately stylized — this is a teaching   */
/* diagram, not a survey map.                                              */

const PLATES: Plate[] = [
  // North American
  { id: "na", nameEn: "North American", nameKh: "ប្លាកអាមេរិកខាងជើង",
    points: "60,80 250,60 320,150 290,260 200,290 90,260 50,180", lx: 175, ly: 175, fill: "#a98060" },
  // South American
  { id: "sa", nameEn: "South American", nameKh: "ប្លាកអាមេរិកខាងត្បូង",
    points: "260,290 360,290 380,400 320,470 270,460 250,360", lx: 310, ly: 380, fill: "#b8895d" },
  // Eurasian
  { id: "eu", nameEn: "Eurasian", nameKh: "ប្លាកអឺរ៉ាស៊ី",
    points: "350,80 820,80 830,200 720,235 600,220 500,210 400,200 350,170", lx: 580, ly: 145, fill: "#9a7553" },
  // African
  { id: "af", nameEn: "African", nameKh: "ប្លាកអាហ្វ្រិក",
    points: "400,210 560,210 600,310 580,400 480,420 420,360 400,290", lx: 490, ly: 320, fill: "#c19872" },
  // Arabian
  { id: "ar", nameEn: "Arabian", nameKh: "ប្លាកអារ៉ាប់",
    points: "560,210 620,210 625,265 575,260", lx: 590, ly: 240, fill: "#d4a878" },
  // Indian
  { id: "in", nameEn: "Indian", nameKh: "ប្លាកឥណ្ឌា",
    points: "620,225 695,225 700,310 640,310", lx: 660, ly: 275, fill: "#cf9a6a" },
  // Sunda — HIGHLIGHTED (Cambodia sits here)
  { id: "sunda", nameEn: "Sunda", nameKh: "ផ្លាកស៊ុនដា",
    points: "700,225 790,225 795,300 720,310 695,275", lx: 745, ly: 270, fill: "#7c9a6e", highlight: true },
  // Philippine
  { id: "ph", nameEn: "Philippine", nameKh: "ប្លាកហ្វីលីពីន",
    points: "795,200 830,200 835,275 800,275", lx: 815, ly: 240, fill: "#a37b54" },
  // Australian
  { id: "au", nameEn: "Australian", nameKh: "ប្លាកអូស្ត្រាលី",
    points: "720,310 850,310 870,400 820,430 730,420 700,360", lx: 790, ly: 380, fill: "#c8a070" },
  // Pacific (left half wraps to right edge)
  { id: "pa", nameEn: "Pacific", nameKh: "ប្លាកប៉ាស៊ីហ្វិក",
    points: "830,140 1000,140 1000,360 870,355 850,290 835,200", lx: 920, ly: 250, fill: "#8b7355" },
  // Pacific (right wrap on left edge of map)
  { id: "pa2", nameEn: "Pacific", nameKh: "ប្លាកប៉ាស៊ីហ្វិក",
    points: "0,180 50,180 60,290 0,310", lx: 25, ly: 245, fill: "#8b7355" },
  // Nazca
  { id: "nz", nameEn: "Nazca", nameKh: "ប្លាកណាស្កា",
    points: "200,280 250,280 250,410 200,400", lx: 225, ly: 345, fill: "#a37950" },
  // Cocos
  { id: "co", nameEn: "Cocos", nameKh: "ប្លាកកូកូស",
    points: "180,250 230,250 235,290 185,290", lx: 207, ly: 272, fill: "#b88c64" },
  // Caribbean
  { id: "ca", nameEn: "Caribbean", nameKh: "ប្លាកការ៉ាប៊ីន",
    points: "230,235 290,235 295,265 235,265", lx: 262, ly: 252, fill: "#bd9670" },
  // Antarctic — band along the bottom
  { id: "an", nameEn: "Antarctic", nameKh: "ប្លាកអង់តាក់ទិក",
    points: "0,440 1000,440 1000,500 0,500", lx: 500, ly: 475, fill: "#7d6a55" },
];

const BOUNDARIES: Boundary[] = [
  // Convergent boundaries
  { id: "andes", nameEn: "Nazca–South American (Andes)", nameKh: "ណាស្កា–អាមេរិកខាងត្បូង (អង់ដេស)",
    type: "convergent", points: "250,290 252,330 252,370 254,410",
    resultEn: "Mountains & volcanoes", resultKh: "ភ្នំ និងភ្នំភ្លើង",
    exampleEn: "The Andes Mountains form here — South America's longest mountain range.",
    exampleKh: "ភ្នំអង់ដេសបានកើតឡើងនៅទីនេះ — ជួរភ្នំវែងបំផុតនៅអាមេរិកខាងត្បូង។" },
  { id: "himalaya", nameEn: "Indian–Eurasian (Himalayas)", nameKh: "ឥណ្ឌា–អឺរ៉ាស៊ី (ហិមាល័យ)",
    type: "convergent", points: "620,225 660,222 700,225",
    resultEn: "Tallest mountains on Earth", resultKh: "ភ្នំខ្ពស់បំផុតនៅលើផែនដី",
    exampleEn: "India is still pushing into Asia — the Himalayas (and Mount Everest) keep growing about 5 mm per year.",
    exampleKh: "ឥណ្ឌាកំពុងបន្តរុញចូលអាស៊ី — ហិមាល័យ (និងភ្នំអេវឺរេស) កំពុងកើនកម្ពស់ប្រហែល ៥ មីលីម៉ែត្រក្នុងមួយឆ្នាំ។" },
  { id: "sunda-trench", nameEn: "Sunda Trench (Indo–Sunda)", nameKh: "ដុនរណ្ដៅស៊ុនដា (ឥណ្ឌូ–ស៊ុនដា)",
    type: "convergent", points: "695,310 730,315 770,318 795,310",
    resultEn: "Deep trench, volcanic islands", resultKh: "រណ្ដៅជ្រៅ និងកោះភ្នំភ្លើង",
    exampleEn: "Where the Indo-Australian Plate dives under the Sunda Plate — this is what created Sumatra and Java's volcanoes (and the 2004 tsunami).",
    exampleKh: "ជាកន្លែងដែលប្លាកឥណ្ឌូ-អូស្ត្រាលីចូលក្រោមផ្លាកស៊ុនដា — នេះជាអ្វីដែលបានបង្កើតភ្នំភ្លើងនៅស៊ូម៉ាត្រា និងជ្វា (និងស៊ូណាមីឆ្នាំ ២០០៤)។" },
  { id: "mariana", nameEn: "Mariana (Pacific–Philippine)", nameKh: "ម៉ារីយ៉ាណា (ប៉ាស៊ីហ្វិក–ហ្វីលីពីន)",
    type: "convergent", points: "830,210 832,240 835,275",
    resultEn: "World's deepest ocean trench", resultKh: "រណ្ដៅសមុទ្រជ្រៅបំផុតលើពិភពលោក",
    exampleEn: "The Mariana Trench reaches almost 11 km deep — deeper than Mount Everest is tall.",
    exampleKh: "រណ្ដៅម៉ារីយ៉ាណាជ្រៅជិត ១១ គីឡូម៉ែត្រ — ជ្រៅជាងភ្នំអេវឺរេសខ្ពស់។" },
  { id: "aleutian", nameEn: "Aleutian (Pacific–North American)", nameKh: "អាលេអ៊ូស្យាន (ប៉ាស៊ីហ្វិក–អាមេរិកខាងជើង)",
    type: "convergent", points: "60,150 130,140 200,140 270,145",
    resultEn: "Volcanic island arc", resultKh: "ជួរកោះភ្នំភ្លើង",
    exampleEn: "The Pacific Plate dives under Alaska, creating a chain of active volcanoes.",
    exampleKh: "ប្លាកប៉ាស៊ីហ្វិកចូលក្រោមអាឡាស្កា បង្កើតជួរនៃភ្នំភ្លើងសកម្ម។" },

  // Divergent boundaries
  { id: "mar-n", nameEn: "Mid-Atlantic Ridge (North)", nameKh: "ជួរកណ្ដាលអាត្លង់ទិក (ខាងជើង)",
    type: "divergent", points: "320,80 325,140 322,200 325,260",
    resultEn: "New seafloor + island volcanoes", resultKh: "បាតសមុទ្រថ្មី + ភ្នំភ្លើងកោះ",
    exampleEn: "North America and Europe drift apart by ~2.5 cm per year. This is what built Iceland.",
    exampleKh: "អាមេរិកខាងជើង និងអឺរ៉ុបបែកចេញពីគ្នាប្រហែល ២,៥ សង់ទីម៉ែត្រក្នុងមួយឆ្នាំ។ នេះជាអ្វីដែលបានបង្កើតឆ្នេអ៊ីស្លង់។" },
  { id: "mar-s", nameEn: "Mid-Atlantic Ridge (South)", nameKh: "ជួរកណ្ដាលអាត្លង់ទិក (ខាងត្បូង)",
    type: "divergent", points: "385,290 395,330 405,380 415,420",
    resultEn: "New seafloor", resultKh: "បាតសមុទ្រថ្មី",
    exampleEn: "South America and Africa keep separating — they were one continent (Pangea) about 200 million years ago.",
    exampleKh: "អាមេរិកខាងត្បូង និងអាហ្វ្រិកនៅតែបន្តញែកចេញពីគ្នា — ពួកវាធ្លាប់ជាទ្វីបតែមួយ (បាងជា) ប្រហែល ២០០ លានឆ្នាំមុន។" },
  { id: "east-african-rift", nameEn: "East African Rift", nameKh: "ច្រាំងបាក់អាហ្វ្រិកខាងកើត",
    type: "divergent", points: "540,260 547,310 553,360 558,400",
    resultEn: "Rift valleys & lakes", resultKh: "ជ្រលងបាក់ និងបឹង",
    exampleEn: "Africa is slowly splitting in two. In ~10 million years, a new ocean will form here.",
    exampleKh: "អាហ្វ្រិកកំពុងបែកចេញជាពីរយ៉ាងយឺត។ ក្នុងរយៈពេលប្រហែល ១០ លានឆ្នាំ មហាសមុទ្រថ្មីនឹងកើតឡើងនៅទីនេះ។" },

  // Transform boundaries
  { id: "san-andreas", nameEn: "San Andreas Fault", nameKh: "ច្រាំងបាក់សាន់អាន់ឌ្រេស",
    type: "transform", points: "85,225 100,240 115,255 130,270",
    resultEn: "Earthquakes (no mountains/volcanoes)", resultKh: "រញ្ជួយដី (គ្មានភ្នំ ឬភ្នំភ្លើង)",
    exampleEn: "The Pacific and North American plates slide past each other in California — causing famous earthquakes like the 1906 San Francisco quake.",
    exampleKh: "ប្លាកប៉ាស៊ីហ្វិក និងអាមេរិកខាងជើងរអិលកាត់គ្នានៅរដ្ឋកាលីហ្វ័រនី — បង្កឱ្យមានរញ្ជួយដីដ៏ល្បីដូចជាការរញ្ជួយដីសានហ្វ្រាន់ស៊ីស្កូ ឆ្នាំ ១៩០៦។" },
  { id: "anatolian", nameEn: "North Anatolian Fault", nameKh: "ច្រាំងបាក់អាណាតូលីខាងជើង",
    type: "transform", points: "555,205 580,208 605,210",
    resultEn: "Earthquakes across Turkey", resultKh: "រញ្ជួយដីឆ្លងកាត់ទួរគី",
    exampleEn: "A long sliding boundary that produced the devastating 2023 Turkey–Syria earthquake.",
    exampleKh: "ច្រាំងបាក់រអិលដ៏វែងមួយ ដែលបានបង្កឱ្យមានរញ្ជួយដីដ៏អាក្រក់នៅទួរគី–ស៊ីរី ឆ្នាំ ២០២៣។" },
];

const TYPE_META: Record<BoundaryType, { en: string; kh: string; color: string; bg: string; text: string; border: string; icon: typeof Mountain }> = {
  convergent: { en: "Convergent", kh: "ទង្គិចគ្នា", color: "#dc2626", bg: "bg-red-50", text: "text-red-900", border: "border-red-200", icon: Mountain },
  divergent:  { en: "Divergent",  kh: "បែកចេញពីគ្នា", color: "#0284c7", bg: "bg-sky-50", text: "text-sky-900", border: "border-sky-200", icon: Flame },
  transform:  { en: "Transform",  kh: "រអិលទង្គិចគ្នា", color: "#ca8a04", bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200", icon: Activity },
};

export function PlateTectonicsMap() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [selected, setSelected] = useState<Boundary | null>(null);
  const [filter, setFilter] = useState<"all" | BoundaryType>("all");

  const visible = filter === "all" ? BOUNDARIES : BOUNDARIES.filter((b) => b.type === filter);

  return (
    <div className="rounded-3xl bg-white border-2 border-stone-300 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100 border-b-2 border-stone-300">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-stone-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Globe2 className="w-3.5 h-3.5" />
          <span>{kh ? "ឧបករណ៍ភូគព្ភវិទ្យា" : "Geology Tool"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-stone-900 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "ផែនទីប្លាកធរណីសាស្ត្រ" : "Interactive Plate Tectonics Map"}
          {kh && <span className="ml-2 text-sm text-stone-600 font-sans font-normal">(Plate Tectonics)</span>}
        </h3>
        <p className={`mt-1 text-sm text-stone-700 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "ចុចលើបន្ទាត់ព្រំដែនណាមួយ ដើម្បីមើលប្រភេទចលនា និងអ្វីដែលវាបង្កើត។"
            : "Click any boundary line to see the type of plate movement and what it creates."}
        </p>
      </div>

      {/* Filters */}
      <div className="px-4 sm:px-6 py-3 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-stone-600 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
          <MousePointerClick className="w-3.5 h-3.5" />
          {kh ? "តម្រងព្រំដែន" : "Filter Boundaries"}
        </span>
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")} kh={kh} label={kh ? "ទាំងអស់" : "All"} dot="#57534e" />
        <FilterPill active={filter === "convergent"} onClick={() => setFilter("convergent")} kh={kh} label={kh ? "ទង្គិចគ្នា" : "Convergent"} dot={TYPE_META.convergent.color} />
        <FilterPill active={filter === "divergent"} onClick={() => setFilter("divergent")} kh={kh} label={kh ? "បែកចេញពីគ្នា" : "Divergent"} dot={TYPE_META.divergent.color} />
        <FilterPill active={filter === "transform"} onClick={() => setFilter("transform")} kh={kh} label={kh ? "រអិល" : "Transform"} dot={TYPE_META.transform.color} />
      </div>

      {/* Map */}
      <div className="p-3 sm:p-5 bg-gradient-to-b from-slate-100 to-stone-100">
        <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
          <svg viewBox="0 0 1000 500" className="block w-full min-w-[640px] h-auto rounded-xl border-2 border-stone-300 bg-[#a8c0d6]" role="img" aria-label="World map of tectonic plates">
            {/* Faint graticule */}
            <defs>
              <pattern id="grat" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M50 0 L0 0 0 50" fill="none" stroke="#7c9bb6" strokeWidth="0.4" />
              </pattern>
              <filter id="boundary-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.6" />
              </filter>
            </defs>
            <rect width="1000" height="500" fill="url(#grat)" />

            {/* Plate polygons */}
            {PLATES.map((p) => (
              <g key={p.id}>
                <polygon
                  points={p.points}
                  fill={p.fill}
                  stroke={p.highlight ? "#15803d" : "#5c4a36"}
                  strokeWidth={p.highlight ? 2.6 : 0.6}
                  strokeOpacity={0.55}
                  opacity={0.92}
                />
                <text x={p.lx} y={p.ly} textAnchor="middle" fontSize={kh ? 10 : 11} fontWeight={600}
                      fill="#3f2a16" pointerEvents="none"
                      style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-sans-serif, system-ui" }}>
                  {kh ? p.nameKh : p.nameEn}
                </text>
              </g>
            ))}

            {/* Cambodia marker on Sunda plate */}
            <g pointerEvents="none">
              <circle cx={742} cy={258} r={6} fill="#dc2626" stroke="#fff" strokeWidth={2} />
              <circle cx={742} cy={258} r={11} fill="none" stroke="#dc2626" strokeWidth={1.4} opacity={0.6}>
                <animate attributeName="r" values="6;14;6" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <text x={742} y={245} textAnchor="middle" fontSize={10} fontWeight={700} fill="#7f1d1d"
                    style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 3 }}>
                {kh ? "កម្ពុជា" : "Cambodia"}
              </text>
            </g>

            {/* Boundary polylines */}
            {visible.map((b) => {
              const meta = TYPE_META[b.type];
              const isSel = selected?.id === b.id;
              const dash =
                b.type === "transform" ? "8 4" :
                b.type === "divergent" ? "4 4" :
                undefined;
              return (
                <g key={b.id} className="cursor-pointer" onClick={() => setSelected(b)}>
                  {/* Wide invisible click target */}
                  <polyline points={b.points} fill="none" stroke="transparent" strokeWidth={16} strokeLinecap="round" />
                  {isSel && (
                    <polyline points={b.points} fill="none" stroke={meta.color} strokeWidth={9} strokeLinecap="round" strokeOpacity={0.25} filter="url(#boundary-glow)" />
                  )}
                  <polyline
                    points={b.points}
                    fill="none"
                    stroke={meta.color}
                    strokeWidth={isSel ? 4 : 3}
                    strokeLinecap="round"
                    strokeDasharray={dash}
                    opacity={0.95}
                  >
                    <title>{(kh ? b.nameKh : b.nameEn) + " — " + (kh ? meta.kh : meta.en)}</title>
                  </polyline>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs">
          {(["convergent", "divergent", "transform"] as BoundaryType[]).map((t) => {
            const meta = TYPE_META[t];
            const Icon = meta.icon;
            return (
              <span key={t} className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border ${meta.bg} ${meta.text} ${meta.border} ${kh ? "font-khmer" : ""}`}>
                <span className="w-3 h-1 rounded-full" style={{
                  backgroundColor: meta.color,
                  backgroundImage: t === "transform" ? `repeating-linear-gradient(90deg, ${meta.color} 0 4px, transparent 4px 6px)` :
                                   t === "divergent" ? `repeating-linear-gradient(90deg, ${meta.color} 0 3px, transparent 3px 5px)` : undefined,
                }} />
                <Icon className="w-3 h-3" />
                <span>{kh ? meta.kh : meta.en}</span>
              </span>
            );
          })}
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border bg-emerald-50 text-emerald-900 border-emerald-200 ${kh ? "font-khmer" : ""}`}>
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            {kh ? "កម្ពុជាស្ថិតលើផ្លាកស៊ុនដា" : "Cambodia sits on the Sunda Plate"}
          </span>
        </div>
      </div>

      {/* Detail panel */}
      <div className="border-t-2 border-stone-200 bg-white">
        {selected ? (
          <BoundaryDetail boundary={selected} kh={kh} onClose={() => setSelected(null)} />
        ) : (
          <div className={`p-5 text-center text-sm text-stone-500 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "↑ ចុចបន្ទាត់ព្រំដែនណាមួយខាងលើ ដើម្បីមើលប្រភេទចលនា និងអនីមេសិនពន្យល់។"
              : "↑ Click any colored boundary line above to see its type and an animation of what it creates."}
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function FilterPill({ active, onClick, label, dot, kh }: { active: boolean; onClick: () => void; label: string; dot: string; kh: boolean }) {
  return (
    <button type="button" onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border-2 transition ${
        active ? "bg-stone-800 text-white border-stone-800" : "bg-white text-stone-700 border-stone-300 hover:border-stone-500"
      } ${kh ? "font-khmer" : ""}`}>
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dot }} />
      {label}
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function BoundaryDetail({ boundary, kh, onClose }: { boundary: Boundary; kh: boolean; onClose: () => void }) {
  const meta = TYPE_META[boundary.type];
  const Icon = meta.icon;
  return (
    <div className={`p-5 sm:p-6 ${meta.bg} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center" style={{ color: meta.color }}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`text-[10px] font-mono uppercase tracking-widest opacity-70 ${meta.text} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? `ព្រំដែនប្រភេទ ${meta.kh}` : `${meta.en} Boundary`}
          </div>
          <h4 className={`font-display font-bold text-lg ${meta.text} ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh ? boundary.nameKh : boundary.nameEn}
          </h4>
        </div>
        <button onClick={onClose} className="text-stone-500 hover:text-stone-800 p-1" aria-label={kh ? "បិទ" : "Close"}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Animation */}
        <div className="rounded-xl border-2 border-white bg-gradient-to-b from-sky-100 to-stone-200 overflow-hidden">
          <BoundaryAnimation type={boundary.type} />
          <div className={`px-3 py-2 bg-white/70 text-center text-xs font-bold ${meta.text} ${kh ? "font-khmer" : ""}`}>
            {kh ? "ចលនា៖ " : "Movement: "}{kh ? meta.kh : meta.en}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <div className={`rounded-xl border-2 ${meta.border} bg-white p-3`}>
            <div className={`text-[10px] font-mono uppercase tracking-widest ${meta.text} opacity-70 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {kh ? "បង្កើត" : "Creates"}
            </div>
            <div className={`font-bold text-sm text-stone-900 ${kh ? "font-khmer" : ""}`}>
              {kh ? boundary.resultKh : boundary.resultEn}
            </div>
          </div>
          <p className={`text-sm text-stone-800 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? boundary.exampleKh : boundary.exampleEn}
          </p>
          {kh && (
            <p className="text-[11px] italic text-stone-500">{boundary.exampleEn}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Per-type SVG mini animations (CSS-driven, mobile-friendly)            */
/* ────────────────────────────────────────────────────────────────────── */

function BoundaryAnimation({ type }: { type: BoundaryType }) {
  return (
    <div className="relative h-44 sm:h-48">
      <style>{`
        @keyframes plate-push-l { 0%,100% { transform: translateX(0); } 50% { transform: translateX(8px); } }
        @keyframes plate-push-r { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-8px); } }
        @keyframes plate-pull-l { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-10px); } }
        @keyframes plate-pull-r { 0%,100% { transform: translateX(0); } 50% { transform: translateX(10px); } }
        @keyframes plate-slide-up { 0%,100% { transform: translateX(0); } 50% { transform: translateX(12px); } }
        @keyframes plate-slide-dn { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-12px); } }
        @keyframes mountain-rise { 0% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } 100% { transform: scaleY(0.4); } }
        @keyframes magma-glow { 0%,100% { opacity: 0.6; transform: scaleY(0.7); } 50% { opacity: 1; transform: scaleY(1.1); } }
        @keyframes lava-erupt { 0%,100% { transform: translateY(2px) scale(0.6); opacity: 0; } 50% { transform: translateY(-12px) scale(1); opacity: 1; } }
        @keyframes shake { 0%,100% { transform: translate(0,0); } 20% { transform: translate(-1px,1px); } 40% { transform: translate(1px,-1px); } 60% { transform: translate(-1px,-1px); } 80% { transform: translate(1px,1px); } }
        .anim-shake { animation: shake 0.5s linear infinite; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      <svg viewBox="0 0 320 160" className="absolute inset-0 w-full h-full">
        {/* sky */}
        <rect width="320" height="100" fill="url(#sky-grad)" />
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#cfe6f5" />
            <stop offset="100%" stopColor="#f0e0c8" />
          </linearGradient>
          <linearGradient id="magma-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#fde047" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>

        {type === "convergent" && (
          <>
            {/* Rising mountain that grows then settles */}
            <g style={{ transformOrigin: "160px 100px", animation: "mountain-rise 3s ease-in-out infinite" }}>
              <polygon points="120,100 160,40 200,100" fill="#78350f" stroke="#451a03" strokeWidth="1.2" />
              <polygon points="140,100 160,55 180,100" fill="#a16207" />
              <polygon points="155,55 160,40 165,55 162,52 158,52" fill="#fafaf9" />
            </g>
            {/* Plates pushing in */}
            <g style={{ animation: "plate-push-l 3s ease-in-out infinite" }}>
              <rect x="0"   y="100" width="160" height="60" fill="#8b6f47" stroke="#5c4423" strokeWidth="1" />
              <text x="40" y="138" fontSize="11" fontWeight="700" fill="#fef3c7">→</text>
            </g>
            <g style={{ animation: "plate-push-r 3s ease-in-out infinite" }}>
              <rect x="160" y="100" width="160" height="60" fill="#a47a52" stroke="#5c4423" strokeWidth="1" />
              <text x="270" y="138" fontSize="11" fontWeight="700" fill="#fef3c7">←</text>
            </g>
            {/* Volcano puff */}
            <g style={{ transformOrigin: "160px 50px", animation: "lava-erupt 3s ease-in-out infinite" }}>
              <circle cx="160" cy="40" r="4" fill="#f97316" />
              <circle cx="155" cy="32" r="3" fill="#fb923c" opacity="0.8" />
              <circle cx="166" cy="30" r="2.4" fill="#fdba74" opacity="0.8" />
            </g>
          </>
        )}

        {type === "divergent" && (
          <>
            {/* Magma rising in the gap */}
            <g style={{ transformOrigin: "160px 130px", animation: "magma-glow 2.4s ease-in-out infinite" }}>
              <polygon points="140,100 180,100 175,160 145,160" fill="url(#magma-grad)" />
            </g>
            {/* Plates separating */}
            <g style={{ animation: "plate-pull-l 2.4s ease-in-out infinite" }}>
              <rect x="0"   y="100" width="150" height="60" fill="#8b6f47" stroke="#5c4423" strokeWidth="1" />
              <text x="35" y="138" fontSize="11" fontWeight="700" fill="#fef3c7">←</text>
            </g>
            <g style={{ animation: "plate-pull-r 2.4s ease-in-out infinite" }}>
              <rect x="170" y="100" width="150" height="60" fill="#a47a52" stroke="#5c4423" strokeWidth="1" />
              <text x="275" y="138" fontSize="11" fontWeight="700" fill="#fef3c7">→</text>
            </g>
            {/* Steam plumes */}
            <circle cx="155" cy="92" r="3" fill="#e7e5e4" opacity="0.7" />
            <circle cx="165" cy="86" r="2.5" fill="#e7e5e4" opacity="0.6" />
            <circle cx="160" cy="78" r="2" fill="#e7e5e4" opacity="0.5" />
          </>
        )}

        {type === "transform" && (
          <>
            {/* Two plates sliding past each other horizontally */}
            <g style={{ animation: "plate-slide-up 2s ease-in-out infinite" }}>
              <rect x="-20" y="100" width="180" height="30" fill="#8b6f47" stroke="#5c4423" strokeWidth="1" />
              <text x="40" y="120" fontSize="11" fontWeight="700" fill="#fef3c7">→</text>
            </g>
            <g style={{ animation: "plate-slide-dn 2s ease-in-out infinite" }}>
              <rect x="160" y="130" width="180" height="30" fill="#a47a52" stroke="#5c4423" strokeWidth="1" />
              <text x="260" y="150" fontSize="11" fontWeight="700" fill="#fef3c7">←</text>
            </g>
            {/* Fault line */}
            <line x1="0" y1="130" x2="320" y2="130" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="6 4" />
            {/* Earthquake shake markers */}
            <g className="anim-shake">
              <polygon points="155,90 162,80 165,92 172,82 175,95" fill="none" stroke="#dc2626" strokeWidth="1.6" />
              <text x="180" y="78" fontSize="13" fontWeight="700" fill="#dc2626">!</text>
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
