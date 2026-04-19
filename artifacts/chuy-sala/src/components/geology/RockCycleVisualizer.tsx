import { useState } from "react";
import { RefreshCw, Flame, Droplets, Mountain, Sparkles, Play, Pause } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type RockId = "igneous" | "sedimentary" | "metamorphic";
type StageId = "cooling" | "weathering" | "compaction" | "heat-pressure" | "melting";

type Stage = {
  id: StageId;
  nameEn: string;
  nameKh: string;
  from: RockId | "magma";
  to: RockId | "magma";
  agentEn: string;
  agentKh: string;
  descEn: string;
  descKh: string;
  /** Approximate time scale shown below the description */
  timeEn: string;
  timeKh: string;
  iconColor: string;
};

const STAGES: Stage[] = [
  {
    id: "cooling",
    nameEn: "Cooling & Solidification",
    nameKh: "ការត្រជាក់ និងការរឹងជាប់",
    from: "magma", to: "igneous",
    agentEn: "Heat loss", agentKh: "បាត់បង់កំដៅ",
    descEn: "Hot molten magma cools — either deep inside the Earth (slowly, forming granite) or on the surface as lava (quickly, forming basalt). The result is igneous rock.",
    descKh: "ម៉ាកម៉ាដែលក្ដៅរំលាយត្រជាក់ — ឬនៅជ្រៅខាងក្នុងផែនដី (យឺតៗ បង្កើតថ្មក្រានីត) ឬនៅលើផ្ទៃជាឡាវ៉ា (លឿន បង្កើតថ្មបាសាល់)។ លទ្ធផលគឺថ្មម៉ាម៉ា។",
    timeEn: "Days → millions of years", timeKh: "ថ្ងៃ → លានឆ្នាំ",
    iconColor: "#dc2626",
  },
  {
    id: "weathering",
    nameEn: "Weathering & Erosion",
    nameKh: "ការខូចបាក់ និងការសំណក់",
    from: "igneous", to: "sedimentary",
    agentEn: "Wind, water, ice", agentKh: "ខ្យល់ ទឹក ទឹកកក",
    descEn: "Wind, rain, rivers, and temperature changes break rock into tiny pieces (sediments). Rivers like the Mekong carry these pieces and drop them in layers.",
    descKh: "ខ្យល់ ភ្លៀង ទន្លេ និងការប្រែប្រួលសីតុណ្ហភាព បំបែកថ្មទៅជាបំណែកតូចៗ (កករ)។ ទន្លេដូចជាមេគង្គ ដឹកជញ្ជូនបំណែកទាំងនេះ ហើយដាក់វាជាស្រទាប់។",
    timeEn: "Thousands → millions of years", timeKh: "ពាន់ → លានឆ្នាំ",
    iconColor: "#0ea5e9",
  },
  {
    id: "compaction",
    nameEn: "Compaction & Cementation",
    nameKh: "ការបង្ហាប់ និងការចងភ្ជាប់",
    from: "sedimentary", to: "sedimentary",
    agentEn: "Weight, time, minerals", agentKh: "ទម្ងន់ ពេលវេលា សារធាតុរ៉ែ",
    descEn: "Layers of sediment pile up. Their weight squeezes the lower layers, and minerals act like glue, turning loose sand and mud into solid sedimentary rock (sandstone, limestone).",
    descKh: "ស្រទាប់នៃកករកើនពូនឡើង។ ទម្ងន់របស់ពួកវាបង្ហាប់ស្រទាប់ខាងក្រោម ហើយសារធាតុរ៉ែដើរតួជាស្អិត ប្រែខ្សាច់ និងភក់រលាយជាថ្មកករដ៏រឹង (ថ្មខ្សាច់ ថ្មកំបោរ)។",
    timeEn: "Millions of years", timeKh: "លានឆ្នាំ",
    iconColor: "#a16207",
  },
  {
    id: "heat-pressure",
    nameEn: "Heat & Pressure",
    nameKh: "កំដៅ និងសម្ពាធ",
    from: "sedimentary", to: "metamorphic",
    agentEn: "Deep burial, heat", agentKh: "ការកប់ជ្រៅ កំដៅ",
    descEn: "When rock is buried deep underground, intense heat and pressure (without melting) re-arrange the minerals — turning limestone into marble, or shale into slate. This is metamorphic rock.",
    descKh: "នៅពេលដែលថ្មត្រូវបានកប់ជ្រៅក្រោមដី កំដៅខ្លាំង និងសម្ពាធ (ដោយមិនរលាយ) រៀបចំសារធាតុរ៉ែឡើងវិញ — ប្រែថ្មកំបោរទៅជាម៉ាប និងឆ្នេទៅជាក្រួស។ នេះគឺថ្មកាឡៃ។",
    timeEn: "Millions of years", timeKh: "លានឆ្នាំ",
    iconColor: "#7c3aed",
  },
  {
    id: "melting",
    nameEn: "Melting",
    nameKh: "ការរលាយ",
    from: "metamorphic", to: "magma",
    agentEn: "Extreme heat", agentKh: "កំដៅខ្លាំងបំផុត",
    descEn: "Pushed even deeper, rock finally melts back into magma. The cycle starts again. This is why Earth's crust is constantly being recycled.",
    descKh: "បើរុញកាន់តែជ្រៅ ថ្មនឹងរលាយត្រឡប់ទៅជាម៉ាកម៉ាវិញ។ វដ្ដនេះចាប់ផ្ដើមឡើងវិញ។ នេះជាហេតុផលដែលសំបកផែនដីត្រូវបានកែច្នៃឡើងវិញជានិច្ច។",
    timeEn: "Millions of years", timeKh: "លានឆ្នាំ",
    iconColor: "#ea580c",
  },
];

const ROCK_META: Record<RockId, { en: string; kh: string; nameEn: string; nameKh: string; color: string; ring: string; chip: string; descEn: string; descKh: string; examples: string[] }> = {
  igneous: {
    en: "Igneous", kh: "ថ្មម៉ាម៉ា",
    nameEn: "Igneous", nameKh: "ថ្មម៉ាម៉ា (Igneous)",
    color: "#7f1d1d", ring: "ring-red-400", chip: "bg-red-100 border-red-300 text-red-900",
    descEn: "Born from cooled magma or lava.", descKh: "កើតពីការត្រជាក់នៃម៉ាម៉ា ឬឡាវ៉ា។",
    examples: ["Granite", "Basalt", "Obsidian"],
  },
  sedimentary: {
    en: "Sedimentary", kh: "ថ្មកករ",
    nameEn: "Sedimentary", nameKh: "ថ្មកករ (Sedimentary)",
    color: "#78350f", ring: "ring-amber-400", chip: "bg-amber-100 border-amber-300 text-amber-900",
    descEn: "Layers of sediment, pressed together over time.", descKh: "ស្រទាប់កករ ដែលត្រូវបង្ហាប់រួមគ្នាតាមពេលវេលា។",
    examples: ["Sandstone", "Limestone", "Shale"],
  },
  metamorphic: {
    en: "Metamorphic", kh: "ថ្មកាឡៃ",
    nameEn: "Metamorphic", nameKh: "ថ្មកាឡៃ (Metamorphic)",
    color: "#581c87", ring: "ring-purple-400", chip: "bg-purple-100 border-purple-300 text-purple-900",
    descEn: "Transformed by heat and pressure (without melting).", descKh: "ប្រែប្រួលដោយកំដៅ និងសម្ពាធ (ដោយមិនរលាយ)។",
    examples: ["Marble", "Slate", "Gneiss"],
  },
};

export function RockCycleVisualizer() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [stageIdx, setStageIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Auto-advance when playing
  useState(() => {
    if (!playing) return;
    const t = setInterval(() => setStageIdx((i) => (i + 1) % STAGES.length), 4500);
    return () => clearInterval(t);
  });

  const stage = STAGES[stageIdx];
  const involved: Set<string> = new Set([stage.from, stage.to]);

  function play() { setPlaying(true); const id = setInterval(() => setStageIdx((i) => (i + 1) % STAGES.length), 4500); setTimeout(() => clearInterval(id), 60000); }
  function pause() { setPlaying(false); }

  return (
    <div className="rounded-3xl bg-white border-2 border-stone-300 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-orange-100 via-amber-50 to-stone-100 border-b-2 border-stone-300">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-stone-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{kh ? "ភូគព្ភវិទ្យា" : "Geology"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-stone-900 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "វដ្ដថ្មទាំងបី" : "The Rock Cycle"}
          {kh && <span className="ml-2 text-sm text-stone-600 font-sans font-normal">(Rock Cycle)</span>}
        </h3>
        <p className={`mt-1 text-sm text-stone-700 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "ថ្មទាំងបីប្រភេទផ្លាស់ប្ដូរពីប្រភេទមួយទៅប្រភេទមួយទៀត តាមរយៈកំដៅ សម្ពាធ និងការសំណក់ — នៅលើរយៈពេលរាប់លានឆ្នាំ។"
            : "The three rock types transform into one another through heat, pressure, and weathering — over millions of years."}
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-0">
        {/* Diagram */}
        <div className="p-4 sm:p-6 bg-gradient-to-b from-stone-50 to-amber-50/40">
          <CycleDiagram stage={stage} involved={involved} kh={kh} />

          {/* Stage selector */}
          <div className="mt-5">
            <div className={`text-[10px] font-mono uppercase tracking-widest text-stone-600 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {kh ? "ដំណាក់កាលនៃវដ្ដ" : "Cycle Stages"}
            </div>
            <div className="flex flex-wrap gap-2">
              {STAGES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setStageIdx(i); setPlaying(false); }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg border-2 transition ${
                    stageIdx === i
                      ? "bg-stone-800 text-white border-stone-800 shadow-sm"
                      : "bg-white text-stone-700 border-stone-300 hover:border-stone-500"
                  } ${kh ? "font-khmer" : ""}`}
                >
                  <span className="w-5 h-5 rounded-full text-[10px] font-mono flex items-center justify-center"
                        style={{ backgroundColor: stageIdx === i ? "#fff" : s.iconColor, color: stageIdx === i ? "#1c1917" : "#fff" }}>
                    {i + 1}
                  </span>
                  {kh ? s.nameKh : s.nameEn}
                </button>
              ))}
              <button
                onClick={() => playing ? pause() : play()}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg border-2 transition ${
                  playing ? "bg-emerald-600 text-white border-emerald-700" : "bg-white text-stone-700 border-stone-300 hover:border-stone-500"
                } ${kh ? "font-khmer" : ""}`}
              >
                {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {playing ? (kh ? "ឈប់" : "Pause") : (kh ? "ដើរស្វ័យប្រវត្តិ" : "Auto-play")}
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={STAGES.length - 1}
                value={stageIdx}
                onChange={(e) => { setStageIdx(Number(e.target.value)); setPlaying(false); }}
                className="flex-1 accent-stone-700"
                aria-label={kh ? "កម្រិតវដ្ដ" : "Cycle stage"}
              />
              <span className={`text-xs font-mono text-stone-600 ${kh ? "font-khmer" : ""}`}>
                {kh ? `${stageIdx + 1}/${STAGES.length}` : `Step ${stageIdx + 1}/${STAGES.length}`}
              </span>
            </div>
          </div>
        </div>

        {/* Stage detail panel */}
        <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-stone-300 bg-white p-5 sm:p-6">
          <StageDetail stage={stage} kh={kh} />
        </div>
      </div>

      {/* Rock-type legend */}
      <div className="border-t-2 border-stone-200 bg-stone-50 px-5 sm:px-7 py-4">
        <div className={`text-[10px] font-mono uppercase tracking-widest text-stone-600 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? "ប្រភេទថ្មទាំងបី" : "The Three Rock Types"}
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {(["igneous", "sedimentary", "metamorphic"] as RockId[]).map((r) => {
            const meta = ROCK_META[r];
            return (
              <div key={r} className={`rounded-xl border-2 p-3 ${meta.chip}`}>
                <div className={`font-bold text-sm ${kh ? "font-khmer" : ""}`}>
                  {kh ? meta.nameKh : meta.nameEn}
                </div>
                <p className={`text-xs mt-1 opacity-90 ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
                  {kh ? meta.descKh : meta.descEn}
                </p>
                <div className={`mt-1.5 text-[11px] font-mono opacity-75 ${kh ? "font-khmer text-xs" : ""}`}>
                  {kh ? "ឧ. " : "e.g. "}{meta.examples.join(", ")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function CycleDiagram({ stage, involved, kh }: { stage: Stage; involved: Set<string>; kh: boolean }) {
  // Triangle layout: Igneous (top), Sedimentary (bottom-left), Metamorphic (bottom-right), Magma (center)
  const positions: Record<RockId | "magma", { x: number; y: number }> = {
    igneous:     { x: 250, y: 65 },
    sedimentary: { x: 75,  y: 290 },
    metamorphic: { x: 425, y: 290 },
    magma:       { x: 250, y: 200 },
  };

  // Arrows for each stage (from → to). Bezier control points hand-tuned.
  const arrows: { stageId: StageId; d: string; from: keyof typeof positions; to: keyof typeof positions }[] = [
    { stageId: "cooling",       from: "magma",       to: "igneous",     d: "M 250 180 Q 220 130 235 95" },
    { stageId: "weathering",    from: "igneous",     to: "sedimentary", d: "M 220 95 Q 110 140 90 270" },
    { stageId: "compaction",    from: "sedimentary", to: "sedimentary", d: "M 50 285 Q 20 320 60 320" }, // self loop
    { stageId: "heat-pressure", from: "sedimentary", to: "metamorphic", d: "M 130 305 Q 250 340 380 305" },
    { stageId: "melting",       from: "metamorphic", to: "magma",       d: "M 410 270 Q 350 230 285 210" },
  ];

  return (
    <div className="relative">
      <svg viewBox="0 0 500 360" className="w-full h-auto">
        <defs>
          <marker id="arrow-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ea580c" />
          </marker>
          <marker id="arrow-idle" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#a8a29e" />
          </marker>
          <radialGradient id="magma-rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>
          <style>{`
            @keyframes pulse-ring { 0%,100% { opacity: 0.9; r: 56; } 50% { opacity: 1; r: 60; } }
            @keyframes flow-dash  { to { stroke-dashoffset: -24; } }
            .arrow-active { animation: flow-dash 1s linear infinite; }
            @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
          `}</style>
        </defs>

        {/* Arrows */}
        {arrows.map((a) => {
          const isActive = a.stageId === stage.id;
          return (
            <g key={a.stageId}>
              <path
                d={a.d}
                fill="none"
                stroke={isActive ? "#ea580c" : "#d6d3d1"}
                strokeWidth={isActive ? 3.5 : 2}
                strokeDasharray={isActive ? "8 4" : undefined}
                className={isActive ? "arrow-active" : ""}
                markerEnd={`url(#${isActive ? "arrow-active" : "arrow-idle"})`}
                opacity={isActive ? 1 : 0.55}
              />
            </g>
          );
        })}

        {/* Magma core */}
        <g>
          <circle cx={positions.magma.x} cy={positions.magma.y} r={involved.has("magma") ? 60 : 52}
                  fill="url(#magma-rg)" stroke="#7f1d1d" strokeWidth={2}
                  style={{ animation: involved.has("magma") ? "pulse-ring 1.6s ease-in-out infinite" : undefined }} />
          <text x={positions.magma.x} y={positions.magma.y - 4} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fef3c7"
                style={{ paintOrder: "stroke", stroke: "#7f1d1d", strokeWidth: 3 }}>
            {kh ? "ម៉ាម៉ា" : "Magma"}
          </text>
          <text x={positions.magma.x} y={positions.magma.y + 12} textAnchor="middle" fontSize="9" fontWeight="600" fill="#fef3c7" opacity="0.9">
            {kh ? "(ថ្មរលាយ)" : "(molten rock)"}
          </text>
        </g>

        {/* Three rock-type nodes */}
        <RockNode {...positions.igneous}     id="igneous"     active={involved.has("igneous")}     kh={kh} />
        <RockNode {...positions.sedimentary} id="sedimentary" active={involved.has("sedimentary")} kh={kh} />
        <RockNode {...positions.metamorphic} id="metamorphic" active={involved.has("metamorphic")} kh={kh} />

        {/* Active stage arrow label */}
        <ArrowLabel stage={stage} kh={kh} />
      </svg>
    </div>
  );
}

function RockNode({ x, y, id, active, kh }: { x: number; y: number; id: RockId; active: boolean; kh: boolean }) {
  const meta = ROCK_META[id];
  const r = active ? 58 : 52;
  return (
    <g style={{ transition: "transform 0.4s ease" }}>
      {active && (
        <circle cx={x} cy={y} r={r + 8} fill="none" stroke={meta.color} strokeWidth={2} strokeDasharray="3 3" opacity={0.6} />
      )}
      <circle cx={x} cy={y} r={r} fill="#fef7ec" stroke={meta.color} strokeWidth={active ? 3.5 : 2.4} />
      {/* Rock texture pattern */}
      <RockTexture cx={x} cy={y} r={r - 8} id={id} />
      <text x={x} y={y + r + 18} textAnchor="middle" fontSize="13" fontWeight="800" fill={meta.color}
            style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-sans-serif" }}>
        {kh ? meta.kh : meta.nameEn}
      </text>
      {!kh && (
        <text x={x} y={y + r + 31} textAnchor="middle" fontSize="9" fontWeight="500" fill={meta.color} opacity="0.7"
              style={{ fontFamily: "'Khmer OS', sans-serif" }}>
          {meta.kh}
        </text>
      )}
    </g>
  );
}

function RockTexture({ cx, cy, r, id }: { cx: number; cy: number; r: number; id: RockId }) {
  // Stylized texture for each rock type. Crisp, decorative, identifiable.
  if (id === "igneous") {
    // Crystal-like polygons (granite)
    return (
      <g clipPath={`circle(${r}px at ${cx}px ${cy}px)`}>
        {[
          [-12, -12], [10, -8], [-6, 6], [14, 10], [-14, 12], [4, -2],
        ].map(([dx, dy], i) => (
          <polygon
            key={i}
            points={`${cx + dx - 6},${cy + dy} ${cx + dx + 5},${cy + dy - 5} ${cx + dx + 7},${cy + dy + 4} ${cx + dx - 3},${cy + dy + 6}`}
            fill={["#7c2d12", "#a16207", "#404040", "#78350f"][i % 4]}
            opacity={0.85}
          />
        ))}
      </g>
    );
  }
  if (id === "sedimentary") {
    // Horizontal stripes
    return (
      <g clipPath={`circle(${r}px at ${cx}px ${cy}px)`}>
        {[-18, -10, -2, 6, 14].map((dy, i) => (
          <rect key={i} x={cx - r} y={cy + dy} width={r * 2} height={5}
                fill={["#fbbf24", "#d97706", "#92400e", "#78350f", "#fde68a"][i]} opacity={0.85} />
        ))}
      </g>
    );
  }
  // metamorphic: wavy bands
  return (
    <g clipPath={`circle(${r}px at ${cx}px ${cy}px)`}>
      {[-14, -6, 2, 10].map((dy, i) => (
        <path key={i}
              d={`M ${cx - r} ${cy + dy} Q ${cx} ${cy + dy + 8} ${cx + r} ${cy + dy}`}
              fill="none" stroke={["#7c3aed", "#5b21b6", "#4c1d95", "#a78bfa"][i]} strokeWidth="3" opacity="0.85" />
      ))}
    </g>
  );
}

function ArrowLabel({ stage, kh }: { stage: Stage; kh: boolean }) {
  // Position label near middle of active arrow. We approximate per-stage hardcoded positions.
  const pos: Record<StageId, { x: number; y: number }> = {
    cooling:        { x: 218, y: 130 },
    weathering:     { x: 130, y: 200 },
    compaction:     { x: 35,  y: 333 },
    "heat-pressure":{ x: 250, y: 348 },
    melting:        { x: 360, y: 230 },
  };
  const p = pos[stage.id];
  const label = kh ? stage.nameKh : stage.nameEn;
  return (
    <g style={{ transition: "all 0.3s ease" }}>
      <rect x={p.x - 60} y={p.y - 11} width={120} height={22} rx={11}
            fill="#fff" stroke="#ea580c" strokeWidth={1.5} />
      <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#9a3412"
            style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-sans-serif" }}>
        {label}
      </text>
    </g>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function StageDetail({ stage, kh }: { stage: Stage; kh: boolean }) {
  const stageIcon =
    stage.id === "cooling" ? <Flame className="w-5 h-5" /> :
    stage.id === "weathering" ? <Droplets className="w-5 h-5" /> :
    stage.id === "compaction" ? <Mountain className="w-5 h-5" /> :
    stage.id === "heat-pressure" ? <Sparkles className="w-5 h-5" /> :
    <Flame className="w-5 h-5" />;
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: stage.iconColor }}>
          {stageIcon}
        </div>
        <div className="min-w-0">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-stone-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "ដំណាក់កាល" : "Stage"}
          </div>
          <h4 className={`font-display font-bold text-base text-stone-900 leading-snug ${kh ? "font-khmer leading-tight" : ""}`}>
            {kh ? stage.nameKh : stage.nameEn}
          </h4>
        </div>
      </div>

      <div className={`rounded-lg bg-stone-50 border border-stone-200 p-3 text-xs ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
        <div className={`text-[10px] font-mono uppercase tracking-widest text-stone-500 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? "កត្តាជំរុញ" : "Driving Force"}
        </div>
        <div className="font-bold text-stone-800">{kh ? stage.agentKh : stage.agentEn}</div>
      </div>

      <p className={`text-sm text-stone-800 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
        {kh ? stage.descKh : stage.descEn}
      </p>
      {kh && (
        <p className="text-xs italic text-stone-500">{stage.descEn}</p>
      )}

      <div className={`text-[11px] font-mono text-stone-500 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-stone-100 ${kh ? "font-khmer text-xs" : ""}`}>
        ⏱ {kh ? stage.timeKh : stage.timeEn}
      </div>
    </div>
  );
}
