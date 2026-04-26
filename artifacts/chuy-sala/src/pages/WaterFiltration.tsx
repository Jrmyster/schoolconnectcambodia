import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Droplet,
  Droplets,
  Filter,
  Layers,
  Mountain,
  Atom,
  Shield,
  ShieldCheck,
  Beaker,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Play,
  Trash2,
  GripVertical,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  M-TECH-WATER · Water Filtration: Engineering Clean Water
//                  ការចម្រោះទឹក៖ វិស្វកម្មទឹកស្អាត
//
//  Sub-module under /technology.
//
//  Three cards + an interactive simulator:
//    1. Physical Filtration  — sand & gravel mechanical barrier
//    2. Adsorption           — activated carbon traps molecules
//    3. Reverse Osmosis      — pressure + semi-permeable membrane
//
//    Sim: drag/tap "Sand", "Carbon", "RO Membrane" into a vertical
//         filter column, click "Test Water" to evaluate the stack.
//
//  Aesthetic: deep river blues, charcoal greys, pure whites.
// ════════════════════════════════════════════════════════════════════════════

// ── Palette ──────────────────────────────────────────────────────────────────
const RIVER_DEEP = "#082f49";       // sky-950
const RIVER = "#0c4a6e";            // sky-900
const RIVER_MID = "#075985";        // sky-800
const RIVER_BRIGHT = "#0ea5e9";     // sky-500
const WATER = "#38bdf8";            // sky-400
const WATER_LIGHT = "#7dd3fc";      // sky-300
const WATER_PALE = "#e0f2fe";       // sky-100

const CHARCOAL_DEEP = "#0b1220";
const CHARCOAL = "#1f2937";         // gray-800
const CHARCOAL_MID = "#374151";     // gray-700
const SLATE_LIGHT = "#cbd5e1";      // slate-300
const SLATE_MID = "#64748b";        // slate-500

const SAND_TONE = "#f4d58d";        // warm sand
const CARBON_TONE = "#1f2937";      // dark carbon
const MEMBRANE_TONE = "#a5f3fc";    // cool cyan
const SUCCESS = "#34d399";          // emerald-400
const WARNING = "#fbbf24";          // amber-400
const ERROR = "#fb7185";            // rose-400

const RIPPLE_LINE = "rgba(56, 189, 248, 0.16)";

const PAGE_BG: React.CSSProperties = {
  background:
    `radial-gradient(900px 500px at 90% -10%, rgba(14, 165, 233, 0.20), transparent 70%), ` +
    `radial-gradient(800px 500px at 0% 110%, rgba(8, 47, 73, 0.55), transparent 70%), ` +
    `linear-gradient(180deg, ${CHARCOAL_DEEP} 0%, #0a1626 60%, ${CHARCOAL_DEEP} 100%)`,
};

const RIPPLE_PANEL: React.CSSProperties = {
  backgroundColor: "#0a1322",
  backgroundImage:
    `linear-gradient(${RIPPLE_LINE} 1px, transparent 1px), ` +
    `linear-gradient(90deg, ${RIPPLE_LINE} 1px, transparent 1px)`,
  backgroundSize: "28px 28px, 28px 28px",
};

// ── Tiny helpers ─────────────────────────────────────────────────────────────
function Pill({
  icon: Icon,
  text,
  kh,
  color = WATER,
}: {
  icon: LucideIcon;
  text: string;
  kh: boolean;
  color?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
      style={{
        background: `${color}1F`,
        border: `1px solid ${color}55`,
        color,
      }}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {text}
    </div>
  );
}

function CardHeader({
  num,
  enTitle,
  khTitle,
  icon: Icon,
  accent,
  kh,
}: {
  num: string;
  enTitle: string;
  khTitle: string;
  icon: LucideIcon;
  accent: string;
  kh: boolean;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div
        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${accent}33, ${accent}11)`,
          border: `1px solid ${accent}66`,
          boxShadow: `0 0 22px ${accent}33, inset 0 0 12px ${accent}22`,
        }}
      >
        <Icon className="w-7 h-7" style={{ color: accent }} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-[11px] font-bold tracking-[0.2em] uppercase mb-1"
          style={{ color: accent }}
        >
          Card {num}
        </div>
        <h2 className={`font-display font-bold text-2xl sm:text-3xl text-white leading-tight ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? khTitle : enTitle}
        </h2>
        <p
          className={`text-sm mt-1 ${kh ? "font-display" : "font-khmer"}`}
          style={{ color: SLATE_LIGHT }}
        >
          {kh ? enTitle : khTitle}
        </p>
      </div>
    </div>
  );
}

function FactCallout({
  enLabel,
  khLabel,
  enText,
  khText,
  icon: Icon,
  accent,
  kh,
}: {
  enLabel: string;
  khLabel: string;
  enText: string;
  khText: string;
  icon: LucideIcon;
  accent: string;
  kh: boolean;
}) {
  return (
    <div
      className="rounded-xl p-4 sm:p-5"
      style={{
        background: `linear-gradient(180deg, ${accent}1A, ${accent}08)`,
        border: `1px solid ${accent}55`,
      }}
    >
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <Icon className="w-4 h-4" style={{ color: accent }} aria-hidden="true" />
        <div
          className={`text-[11px] font-bold tracking-widest uppercase ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
          style={{ color: accent }}
        >
          {kh ? khLabel : enLabel}
        </div>
        <span
          className={`text-[11px] font-medium tracking-wide ${kh ? "" : "font-khmer text-xs"}`}
          style={{ color: SLATE_MID }}
        >
          · {kh ? enLabel : khLabel}
        </span>
      </div>
      <p className={`text-base leading-relaxed text-white ${kh ? "font-khmer leading-loose" : ""}`}>
        {kh ? khText : enText}
      </p>
      <p
        className={`text-sm leading-relaxed mt-2 ${kh ? "" : "font-khmer leading-loose"}`}
        style={{ color: SLATE_LIGHT }}
      >
        {kh ? enText : khText}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Filter Stacking Simulator
// ════════════════════════════════════════════════════════════════════════════

type LayerId = "sand" | "carbon" | "ro";

interface LayerSpec {
  id: LayerId;
  enName: string;
  khName: string;
  enShort: string;
  khShort: string;
  icon: LucideIcon;
  fill: string;
  border: string;
  text: string;
}

const LAYERS: LayerSpec[] = [
  {
    id: "sand",
    enName: "Sand Layer",
    khName: "ស្រទាប់ខ្សាច់",
    enShort: "Sand",
    khShort: "ខ្សាច់",
    icon: Mountain,
    fill: SAND_TONE,
    border: "#d4a14a",
    text: CHARCOAL_DEEP,
  },
  {
    id: "carbon",
    enName: "Carbon Layer",
    khName: "ស្រទាប់កាបូន",
    enShort: "Carbon",
    khShort: "កាបូន",
    icon: Atom,
    fill: CARBON_TONE,
    border: "#4b5563",
    text: "#ffffff",
  },
  {
    id: "ro",
    enName: "RO Membrane",
    khName: "ភ្នាស RO",
    enShort: "RO",
    khShort: "RO",
    icon: Shield,
    fill: MEMBRANE_TONE,
    border: "#22d3ee",
    text: CHARCOAL_DEEP,
  },
];

const CORRECT_ORDER: LayerId[] = ["sand", "carbon", "ro"];

type ResultLevel = "raw" | "partial" | "advanced" | "complete" | "wrong";

interface SimResult {
  level: ResultLevel;
  enText: string;
  khText: string;
  color: string;
  icon: LucideIcon;
}

function evaluateStack(stack: LayerId[]): SimResult {
  if (stack.length === 0) {
    return {
      level: "raw",
      enText: "Raw Water: Needs Treatment.",
      khText: "ទឹកឆៅ៖ ត្រូវការការដោះស្រាយ។",
      color: ERROR,
      icon: AlertTriangle,
    };
  }

  // Compare to the prefix of CORRECT_ORDER
  const isCorrectPrefix = stack.every((id, i) => CORRECT_ORDER[i] === id);

  if (!isCorrectPrefix) {
    return {
      level: "wrong",
      enText: "Wrong order. The correct flow is Sand → Carbon → RO Membrane (top to bottom).",
      khText: "លំដាប់​មិន​ត្រឹម​ត្រូវ។ លំហូរ​ត្រឹមត្រូវ​គឺ ខ្សាច់ → កាបូន → ភ្នាស RO (ពី​លើ​ទៅ​ក្រោម)។",
      color: WARNING,
      icon: AlertTriangle,
    };
  }

  if (stack.length === 1) {
    // Sand only
    return {
      level: "partial",
      enText: "Partial Filtration: Micro-particles remain.",
      khText: "ការ​ចម្រោះ​ផ្នែក​ខ្លះ៖ ភាគ​ល្អិត​មីក្រូ​នៅ​សល់។",
      color: WARNING,
      icon: Filter,
    };
  }

  if (stack.length === 2) {
    // Sand + Carbon
    return {
      level: "advanced",
      enText: "Advanced Filtration: Microorganisms remain.",
      khText: "ការ​ចម្រោះ​កម្រិត​ខ្ពស់៖ មីក្រូ​សារពាង្គកាយ​នៅ​សល់។",
      color: WATER,
      icon: Beaker,
    };
  }

  // length === 3 and matches order
  return {
    level: "complete",
    enText: "Complete Filtration: Pure H₂O achieved.",
    khText: "ការ​ចម្រោះ​ពេញ​លេញ៖ ទឹក H₂O បរិសុទ្ធ​សម្រេច​បាន។",
    color: SUCCESS,
    icon: ShieldCheck,
  };
}

function FilterStackingSim({ kh }: { kh: boolean }) {
  const [stack, setStack] = useState<LayerId[]>([]);
  const [tested, setTested] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const result = useMemo(() => evaluateStack(stack), [stack]);

  const addLayer = (id: LayerId) => {
    if (stack.length >= 3) return;
    setStack((s) => [...s, id]);
    setTested(false);
  };

  const removeAt = (index: number) => {
    setStack((s) => s.filter((_, i) => i !== index));
    setTested(false);
  };

  const reset = () => {
    setStack([]);
    setTested(false);
  };

  const handleDragStart = (e: React.DragEvent, id: LayerId) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    if (!dragOver) setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const id = e.dataTransfer.getData("text/plain") as LayerId;
    if (id === "sand" || id === "carbon" || id === "ro") {
      addLayer(id);
    }
  };

  return (
    <article
      className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
      style={{
        ...RIPPLE_PANEL,
        border: `1px solid ${WATER}55`,
        boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${WATER}22 inset`,
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${WATER}33, ${WATER}11)`,
            border: `1px solid ${WATER}66`,
            boxShadow: `0 0 22px ${WATER}33, inset 0 0 12px ${WATER}22`,
          }}
        >
          <Layers className="w-7 h-7" style={{ color: WATER }} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: WATER }}>
            {kh ? "សិក្ខាសាលា" : "Lab"}
          </div>
          <h2 className={`font-display font-bold text-2xl sm:text-3xl text-white leading-tight ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? "ឧបករណ៍​សាក​ល្បង​ការ​តម្រៀប​តម្រង" : "Filter Stacking Simulator"}
          </h2>
          <p className={`text-sm mt-1 ${kh ? "font-display" : "font-khmer"}`} style={{ color: SLATE_LIGHT }}>
            {kh ? "Filter Stacking Simulator" : "ឧបករណ៍​សាក​ល្បង​ការ​តម្រៀប​តម្រង"}
          </p>
        </div>
      </div>

      <p className={`text-base leading-relaxed text-white/90 mb-6 ${kh ? "font-khmer leading-loose" : ""}`}>
        {kh
          ? "អូស (ឬ​ចុច) ស្រទាប់​នីមួយៗ​ចូល​ក្នុង​ជួរ​តម្រង។ ទឹក​ហូរ​ពី​លើ​ទៅ​ក្រោម។ បន្ទាប់​មក​ចុច «សាក​ល្បង​ទឹក» ដើម្បី​មើល​អ្វី​ដែល​ចេញ​មក។"
          : "Drag (or tap) each layer into the filter column. Water flows from top to bottom. Then click \"Test Water\" to see what comes out."}
      </p>
      <p className={`text-sm leading-relaxed mb-6 ${kh ? "" : "font-khmer leading-loose"}`} style={{ color: SLATE_LIGHT }}>
        {kh
          ? "Drag (or tap) each layer into the filter column. Water flows from top to bottom. Then click \"Test Water\" to see what comes out."
          : "អូស (ឬ​ចុច) ស្រទាប់​នីមួយៗ​ចូល​ក្នុង​ជួរ​តម្រង។ ទឹក​ហូរ​ពី​លើ​ទៅ​ក្រោម។ បន្ទាប់​មក​ចុច «សាក​ល្បង​ទឹក» ដើម្បី​មើល​អ្វី​ដែល​ចេញ​មក។"}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* ── LEFT: Available layers + controls ──────────────────── */}
        <div className="space-y-5">
          <div>
            <div
              className={`text-[11px] font-bold tracking-widest uppercase mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              style={{ color: WATER_LIGHT }}
            >
              {kh ? "ស្រទាប់​ដែល​មាន" : "Available Layers"}
              <span className={`ml-2 font-medium tracking-wide ${kh ? "" : "font-khmer text-xs"}`} style={{ color: SLATE_MID }}>
                · {kh ? "Available Layers" : "ស្រទាប់​ដែល​មាន"}
              </span>
            </div>

            <div className="space-y-3">
              {LAYERS.map((layer) => {
                const Icon = layer.icon;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    draggable
                    onDragStart={(e) => handleDragStart(e, layer.id)}
                    onClick={() => addLayer(layer.id)}
                    disabled={stack.length >= 3}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-grab active:cursor-grabbing text-left`}
                    style={{
                      background: `linear-gradient(135deg, ${layer.fill}, ${layer.fill}DD)`,
                      border: `2px solid ${layer.border}`,
                      color: layer.text,
                      boxShadow: `0 4px 16px ${layer.border}33`,
                    }}
                    data-testid={`button-add-${layer.id}`}
                    aria-label={`Add ${layer.enName} to filter column`}
                  >
                    <GripVertical className="w-4 h-4 opacity-50 flex-shrink-0" aria-hidden="true" />
                    <Icon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <div className={`font-display font-bold text-base ${kh ? "font-khmer" : ""}`}>
                        {kh ? layer.khName : layer.enName}
                      </div>
                      <div className={`text-xs opacity-70 ${kh ? "" : "font-khmer"}`}>
                        {kh ? layer.enName : layer.khName}
                      </div>
                    </div>
                    <Plus className="w-5 h-5 opacity-60 flex-shrink-0" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => setTested(true)}
              aria-label={kh ? "សាក​ល្បង​ទឹក​ឆ្លង​កាត់​ប្រព័ន្ធ​ចម្រោះ" : "Test water through filter stack"}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-display font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${kh ? "font-khmer" : ""}`}
              style={{
                background: `linear-gradient(135deg, ${RIVER_BRIGHT}, ${WATER})`,
                color: "#ffffff",
                boxShadow: `0 4px 16px ${RIVER_BRIGHT}55`,
              }}
              data-testid="button-test-water"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              {kh ? "សាក​ល្បង​ទឹក" : "Test Water"}
            </button>

            <button
              type="button"
              onClick={reset}
              disabled={stack.length === 0 && !tested}
              aria-label={kh ? "សម្អាត​ប្រព័ន្ធ​ចម្រោះ​ឱ្យ​ទទេ" : "Reset filter column to empty"}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${kh ? "font-khmer" : ""}`}
              style={{
                background: "transparent",
                color: SLATE_LIGHT,
                border: `1px solid ${SLATE_MID}`,
              }}
              data-testid="button-reset-stack"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              {kh ? "កំណត់​ឡើង​វិញ" : "Reset"}
            </button>
          </div>
        </div>

        {/* ── RIGHT: Filter column ──────────────────────────────── */}
        <div>
          <div
            className={`text-[11px] font-bold tracking-widest uppercase mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            style={{ color: WATER_LIGHT }}
          >
            {kh ? "ជួរ​តម្រង" : "Filter Column"}
            <span className={`ml-2 font-medium tracking-wide ${kh ? "" : "font-khmer text-xs"}`} style={{ color: SLATE_MID }}>
              · {kh ? "Filter Column" : "ជួរ​តម្រង"}
            </span>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="rounded-2xl p-4 transition-all"
            style={{
              background: dragOver
                ? `linear-gradient(180deg, ${WATER}22, ${RIVER_MID}55)`
                : `linear-gradient(180deg, ${RIVER_DEEP}, ${CHARCOAL})`,
              border: `2px dashed ${dragOver ? WATER : SLATE_MID}`,
              minHeight: 320,
            }}
            data-testid="dropzone-filter-column"
          >
            {/* Water inlet */}
            <div className="flex items-center justify-center gap-2 mb-3 pb-2"
              style={{ borderBottom: `1px dashed ${WATER}55` }}
            >
              <Droplets className="w-4 h-4" style={{ color: WATER }} aria-hidden="true" />
              <span className={`text-[10px] font-bold tracking-widest uppercase ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
                style={{ color: WATER_LIGHT }}
              >
                {kh ? "ទឹក​ឆៅ​ចូល" : "Raw Water In"}
              </span>
            </div>

            {/* Stack contents */}
            {stack.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Droplet className="w-10 h-10 mb-3 opacity-40" style={{ color: WATER }} aria-hidden="true" />
                <p className={`text-sm font-medium ${kh ? "font-khmer leading-loose" : ""}`} style={{ color: SLATE_LIGHT }}>
                  {kh ? "ជួរ​ទទេ — អូស​ស្រទាប់​មក​ទីនេះ" : "Empty column — drag layers here"}
                </p>
                <p className={`text-xs mt-1 ${kh ? "" : "font-khmer leading-loose"}`} style={{ color: SLATE_MID }}>
                  {kh ? "Empty column — drag layers here" : "ជួរ​ទទេ — អូស​ស្រទាប់​មក​ទីនេះ"}
                </p>
              </div>
            ) : (
              <div className="space-y-2 py-2">
                {stack.map((id, i) => {
                  const layer = LAYERS.find((l) => l.id === id)!;
                  const Icon = layer.icon;
                  return (
                    <button
                      key={`${id}-${i}`}
                      type="button"
                      onClick={() => removeAt(i)}
                      className="w-full flex items-center gap-3 rounded-lg px-4 py-4 transition-all hover:opacity-80 active:scale-[0.99] text-left"
                      style={{
                        background: `linear-gradient(135deg, ${layer.fill}, ${layer.fill}DD)`,
                        border: `2px solid ${layer.border}`,
                        color: layer.text,
                        boxShadow: `0 2px 8px ${layer.border}44`,
                      }}
                      data-testid={`stack-layer-${i}`}
                      aria-label={`Remove ${layer.enName} from column`}
                    >
                      <Icon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <div className={`font-display font-bold text-base ${kh ? "font-khmer" : ""}`}>
                          {kh ? layer.khName : layer.enName}
                        </div>
                        <div className={`text-xs opacity-70 ${kh ? "" : "font-khmer"}`}>
                          {kh ? `ស្រទាប់​លេខ ${i + 1}` : `Layer ${i + 1} of ${stack.length}`}
                        </div>
                      </div>
                      <Trash2 className="w-4 h-4 opacity-60 flex-shrink-0" aria-hidden="true" />
                    </button>
                  );
                })}

                {/* Empty slots */}
                {Array.from({ length: 3 - stack.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="rounded-lg px-4 py-3 text-center"
                    style={{
                      border: `1px dashed ${SLATE_MID}55`,
                      color: SLATE_MID,
                    }}
                  >
                    <span className={`text-xs ${kh ? "font-khmer" : ""}`}>
                      {kh ? "កន្លែង​ទំនេរ" : "empty slot"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Water outlet */}
            <div className="flex items-center justify-center gap-2 mt-3 pt-2"
              style={{ borderTop: `1px dashed ${WATER}55` }}
            >
              <Droplets className="w-4 h-4" style={{ color: tested && result.level === "complete" ? SUCCESS : WATER }} aria-hidden="true" />
              <span className={`text-[10px] font-bold tracking-widest uppercase ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
                style={{ color: tested && result.level === "complete" ? SUCCESS : WATER_LIGHT }}
              >
                {kh ? "ទឹក​ចេញ" : "Water Out"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Result panel ───────────────────────────────────────── */}
      <div className="mt-6">
        <div
          className="rounded-xl p-5 transition-all"
          style={{
            background: tested
              ? `linear-gradient(135deg, ${result.color}22, ${result.color}08)`
              : `linear-gradient(135deg, ${SLATE_MID}11, ${SLATE_MID}05)`,
            border: tested
              ? `1px solid ${result.color}66`
              : `1px solid ${SLATE_MID}44`,
            boxShadow: tested ? `0 0 24px ${result.color}22` : "none",
          }}
          data-testid="sim-result"
          role="status"
          aria-live="polite"
        >
          {tested ? (
            <div className="flex items-start gap-3">
              <result.icon
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                style={{ color: result.color }}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <div
                  className={`text-[11px] font-bold tracking-widest uppercase mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
                  style={{ color: result.color }}
                >
                  {kh ? "លទ្ធផល" : "Result"}
                </div>
                <p
                  className={`text-base font-semibold text-white ${kh ? "font-khmer leading-loose" : ""}`}
                  data-testid="sim-result-primary"
                >
                  {kh ? result.khText : result.enText}
                </p>
                <p
                  className={`text-sm mt-1 ${kh ? "" : "font-khmer leading-loose"}`}
                  style={{ color: SLATE_LIGHT }}
                  data-testid="sim-result-secondary"
                >
                  {kh ? result.enText : result.khText}
                </p>
                {result.level === "complete" && (
                  <div className="flex items-center gap-2 mt-3">
                    <Sparkles className="w-4 h-4" style={{ color: SUCCESS }} aria-hidden="true" />
                    <span className={`text-sm font-bold ${kh ? "font-khmer" : ""}`} style={{ color: SUCCESS }}>
                      {kh ? "ល្អ​ឥត​ខ្ចោះ! · Perfect!" : "Perfect! · ល្អ​ឥត​ខ្ចោះ!"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <FlaskConical className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: SLATE_LIGHT }} aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <p className={`text-sm ${kh ? "font-khmer leading-loose" : ""}`} style={{ color: SLATE_LIGHT }}>
                  {kh
                    ? "ចុច «សាក​ល្បង​ទឹក» ដើម្បី​មើល​លទ្ធផល។"
                    : "Click \"Test Water\" to see the result."}
                </p>
                <p className={`text-xs opacity-70 ${kh ? "" : "font-khmer leading-loose"}`} style={{ color: SLATE_MID }}>
                  {kh
                    ? "Click \"Test Water\" to see the result."
                    : "ចុច «សាក​ល្បង​ទឹក» ដើម្បី​មើល​លទ្ធផល។"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function WaterFiltration() {
  const { language } = useLanguageStore();
  const k = language === "kh";
  const t = (en: string, kh: string) => (k ? kh : en);

  return (
    <div className="min-h-screen text-slate-100" style={PAGE_BG}>
      {/* ── Top: back link ─────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-medium hover:underline ${k ? "font-khmer" : ""}`}
          style={{ color: WATER }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t("Back to Home", "ត្រឡប់ទំព័រដើម")}
        </Link>
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <Pill
          icon={Droplet}
          text={t(
            "Technology · Water Filtration",
            "បច្ចេកវិទ្យា · ការចម្រោះទឹក",
          )}
          kh={k}
          color={WATER}
        />

        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mt-5 mb-3 leading-tight text-white ${k ? "font-khmer leading-loose" : ""}`}
        >
          {k ? (
            <>
              ការចម្រោះទឹក៖{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${WATER}, ${WATER_LIGHT}, ${WATER_PALE})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                វិស្វកម្មទឹកស្អាត
              </span>
            </>
          ) : (
            <>
              Water Filtration:{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${WATER}, ${WATER_LIGHT}, ${WATER_PALE})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Engineering Clean Water
              </span>
            </>
          )}
        </h1>

        {/* Muted secondary title in opposite language */}
        <div
          className={`text-base sm:text-lg mb-4 ${k ? "font-display" : "font-khmer leading-loose"}`}
          style={{ color: SLATE_MID }}
        >
          {k
            ? "Water Filtration: Engineering Clean Water"
            : "ការចម្រោះទឹក៖ វិស្វកម្មទឹកស្អាត"}
        </div>

        <p
          className={`text-lg sm:text-xl leading-relaxed max-w-3xl ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: SLATE_LIGHT }}
        >
          {t(
            "Three engineered stages — physical, chemical, and molecular — turn cloudy river water into safe drinking water. Read how each stage works, then build your own filter stack in the simulator below.",
            "ដំណាក់​កាល​វិស្វកម្ម​បី — រូបវន្ត គីមី និង​ម៉ូលេគុល — បំ​ប្លែង​ទឹក​ទន្លេ​ដែល​មាន​ល្បាប់​ឱ្យ​ទៅ​ជា​ទឹក​ផឹក​សុវត្ថិភាព។ អាន​អំពី​ដំណាក់​កាល​នី​មួយៗ​ដំណើរការ​យ៉ាង​ដូច​ម្ដេច រួច​សាង​សង់​ជួរ​តម្រង​ផ្ទាល់​ខ្លួន​នៅ​ក្នុង​ឧបករណ៍​សាក​ល្បង​ខាង​ក្រោម។",
          )}
        </p>

        <p
          className={`text-sm sm:text-base leading-relaxed max-w-3xl mt-2 ${k ? "" : "font-khmer leading-loose"}`}
          style={{ color: SLATE_MID }}
        >
          {k
            ? "Three engineered stages — physical, chemical, and molecular — turn cloudy river water into safe drinking water. Read how each stage works, then build your own filter stack in the simulator below."
            : "ដំណាក់​កាល​វិស្វកម្ម​បី — រូបវន្ត គីមី និង​ម៉ូលេគុល — បំ​ប្លែង​ទឹក​ទន្លេ​ដែល​មាន​ល្បាប់​ឱ្យ​ទៅ​ជា​ទឹក​ផឹក​សុវត្ថិភាព។ អាន​អំពី​ដំណាក់​កាល​នី​មួយៗ​ដំណើរការ​យ៉ាង​ដូច​ម្ដេច រួច​សាង​សង់​ជួរ​តម្រង​ផ្ទាល់​ខ្លួន​នៅ​ក្នុង​ឧបករណ៍​សាក​ល្បង​ខាង​ក្រោម។"}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          <Pill icon={Mountain} text={t("Sand", "ខ្សាច់")} kh={k} color={SAND_TONE} />
          <Pill icon={Atom} text={t("Carbon", "កាបូន")} kh={k} color={WATER_LIGHT} />
          <Pill icon={Shield} text={t("RO Membrane", "ភ្នាស RO")} kh={k} color="#22d3ee" />
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* CARD 1 · Physical Filtration                                        */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <article
          className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            ...RIPPLE_PANEL,
            border: `1px solid ${SAND_TONE}55`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${SAND_TONE}22 inset`,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(closest-side, ${SAND_TONE}33, transparent 70%)`,
              opacity: 0.7,
            }}
          />

          <div className="relative">
            <CardHeader
              num="01"
              enTitle="Physical Filtration"
              khTitle="ការចម្រោះរូបវន្ត"
              icon={Mountain}
              accent={SAND_TONE}
              kh={k}
            />

            <p className={`text-lg leading-relaxed text-white/95 mb-6 ${k ? "font-khmer leading-loose" : ""}`}>
              {t(
                "The very first stage of cleaning river or well water is the simplest one: pour the water through a thick bed of sand and gravel. Gravity does the work. The coarse stones at the bottom catch big debris, while the fine sand on top traps everything smaller.",
                "ដំណាក់​កាល​ដំបូង​បង្អស់​នៃ​ការ​សម្អាត​ទឹក​ទន្លេ ឬ​ទឹក​អណ្ដូង គឺ​សាមញ្ញ​បំផុត៖ ចាក់​ទឹក​ឆ្លង​កាត់​ជា​ស្រទាប់​ខ្សាច់ និង​ក្រួស​ដ៏​ក្រាស់​មួយ។ ទំនាញ​ផែនដី​ធ្វើការ​នេះ។ ដុំ​ថ្ម​គគ្រើម​នៅ​បាត​ចាប់​សំរាម​ធំៗ ខណៈ​ខ្សាច់​ល្អិត​នៅ​ខាង​លើ​ចាប់​អ្វី​គ្រប់​យ៉ាង​ដែល​តូច​ជាង។",
              )}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <FactCallout
                enLabel="How It Works"
                khLabel="របៀប​ដំណើរការ"
                enText="The grains of sand pack tightly together with tiny gaps between them. Suspended solids — silt, mud, leaves, organic matter — are physically too large to fit through those gaps and get caught on the way down."
                khText="គ្រាប់​ខ្សាច់​ជាប់​ជិត​គ្នា​យ៉ាង​ស្អិត ដោយ​មាន​ចន្លោះ​តូចៗ​នៅ​ចន្លោះ​ពួក​វា។ ភាគ​ល្អិត​អណ្ដែត — ល្បាប់ ភក់ ស្លឹក​ឈើ សារ​ធាតុ​សរីរាង្គ — មាន​ទំហំ​ធំ​ពេក​ដើម្បី​ឆ្លង​កាត់​ចន្លោះ​ទាំង​នោះ ហើយ​ត្រូវ​បាន​ចាប់​នៅ​លើ​ផ្លូវ​ចុះ​ក្រោម។"
                icon={Filter}
                accent={SAND_TONE}
                kh={k}
              />
              <FactCallout
                enLabel="What It Catches"
                khLabel="អ្វី​ដែល​វា​ចាប់"
                enText="Mud, silt, sand, leaves, fine clay, dead insects, and most visible cloudiness. After this stage the water already looks dramatically clearer — but it is not yet safe to drink."
                khText="ភក់ ល្បាប់ ខ្សាច់ ស្លឹក​ឈើ ដី​ឥដ្ឋ​ល្អិត សត្វ​ល្អិត​ស្លាប់ និង​ភាគ​ច្រើន​នៃ​ភាព​ល្បក់​ដែល​មើល​ឃើញ។ បន្ទាប់​ពី​ដំណាក់​កាល​នេះ ទឹក​មើល​ទៅ​ថ្លា​ច្រើន​រួច​ហើយ — ប៉ុន្តែ​វា​នៅ​មិន​ទាន់​មាន​សុវត្ថិភាព​ផឹក​នៅ​ឡើយ​ទេ។"
                icon={Mountain}
                accent={WATER_LIGHT}
                kh={k}
              />
            </div>
          </div>
        </article>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* CARD 2 · Adsorption                                                 */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <article
          className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            ...RIPPLE_PANEL,
            border: `1px solid ${CHARCOAL_MID}AA`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${CHARCOAL_MID}55 inset`,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(closest-side, ${CHARCOAL_MID}88, transparent 70%)`,
              opacity: 0.6,
            }}
          />

          <div className="relative">
            <CardHeader
              num="02"
              enTitle="Adsorption (Activated Carbon)"
              khTitle="ការស្រូបយក (កាបូន​សកម្ម)"
              icon={Atom}
              accent={WATER_LIGHT}
              kh={k}
            />

            <p className={`text-lg leading-relaxed text-white/95 mb-6 ${k ? "font-khmer leading-loose" : ""}`}>
              {t(
                "After the sand stage, the water is clear but it can still smell, taste off, or carry chemicals washed in from farms. To fix this we use activated carbon — charcoal that has been roasted and steam-treated to riddle every grain with a maze of microscopic pores. A single gram of activated carbon has the surface area of a tennis court.",
                "បន្ទាប់​ពី​ដំណាក់​កាល​ខ្សាច់ ទឹក​ថ្លា​ហើយ​ប៉ុន្តែ​វា​នៅ​អាច​មាន​ក្លិន ឬ​មាន​រស​ជាតិ​ចំ​លែក ឬ​ផ្ទុក​សារ​ធាតុ​គីមី​ដែល​ហូរ​ចូល​ពី​ចំការ។ ដើម្បី​ដោះ​ស្រាយ​បញ្ហា​នេះ យើង​ប្រើ​កាបូន​សកម្ម — ធ្យូង​ដែល​ត្រូវ​បាន​អាំង និង​ដោះ​ស្រាយ​ជាមួយ​ចំហាយ​ទឹក ដើម្បី​ឱ្យ​គ្រាប់​នី​មួយៗ​ពោរ​ពេញ​ដោយ​រន្ធ​មីក្រូទស្សន៍​យ៉ាង​ច្រើន។ កាបូន​សកម្ម​មួយ​ក្រាម​មាន​ផ្ទៃ​ប៉ុន​នឹង​ទីលាន​បាល់​បោះ។",
              )}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <FactCallout
                enLabel="Adsorption ≠ Absorption"
                khLabel="ស្រូប​យក ≠ ស្រូប​ចូល"
                enText="The carbon doesn't soak the chemicals into itself like a sponge. Molecules of chlorine, pesticide, and odor compounds drift past, get attracted by weak chemical forces, and stick to the surface of the carbon. That sticking is called adsorption."
                khText="កាបូន​មិន​ស្រូប​សារ​ធាតុ​គីមី​ចូល​ខ្លួន​វា​ដូច​អេប៉ុង​ទេ។ ម៉ូលេគុល​នៃ​ក្លរ ថ្នាំ​សម្លាប់​សត្វ​ល្អិត និង​សារ​ធាតុ​មាន​ក្លិន ហើរ​កាត់ ត្រូវ​បាន​ទាញ​ដោយ​កម្លាំង​គីមី​ខ្សោយ ហើយ​ជាប់​នឹង​ផ្ទៃ​កាបូន។ ការ​ជាប់​នោះ​ត្រូវ​បាន​ហៅ​ថា​ការ​ស្រូប​យក (adsorption)។"
                icon={Atom}
                accent={WATER_LIGHT}
                kh={k}
              />
              <FactCallout
                enLabel="What It Removes"
                khLabel="អ្វី​ដែល​វា​ដក​ចេញ"
                enText="Chlorine taste, agricultural runoff, pesticides, organic odor compounds, and many industrial solvents. The water now smells fresh — but viruses and dissolved salts are still passing through."
                khText="រសជាតិ​ក្លរ ការ​ហូរ​ចេញ​ពី​កសិកម្ម ថ្នាំ​សម្លាប់​សត្វ​ល្អិត សារ​ធាតុ​មាន​ក្លិន​សរីរាង្គ និង​សារ​ធាតុ​រំលាយ​ឧស្សាហកម្ម​ជា​ច្រើន។ ឥឡូវ​នេះ​ទឹក​មាន​ក្លិន​ស្រស់ — ប៉ុន្តែ​មេរោគ និង​អំបិល​រលាយ​នៅ​តែ​ឆ្លង​កាត់។"
                icon={Sparkles}
                accent={SAND_TONE}
                kh={k}
              />
            </div>

            <div
              className="flex items-start gap-3 rounded-lg p-4"
              style={{
                background: `${WATER_LIGHT}10`,
                border: `1px solid ${WATER_LIGHT}44`,
              }}
            >
              <Beaker className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: WATER_LIGHT }} aria-hidden="true" />
              <p className={`text-sm leading-relaxed text-white/90 ${k ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Almost every household water filter you can buy — pitcher filters, faucet attachments, fridge filters — relies on activated carbon as its core ingredient.",
                  "តម្រង​ទឹក​សម្រាប់​គ្រួសារ​ស្ទើរ​តែ​ទាំង​អស់​ដែល​អ្នក​អាច​ទិញ — តម្រង​ដប កាក់​ដាក់​នឹង​ទុយោ​ទឹក តម្រង​ទូ​ត្រជាក់ — សុទ្ធ​តែ​ពឹង​ផ្អែក​លើ​កាបូន​សកម្ម​ជា​សារ​ធាតុ​សំខាន់​របស់​វា។",
                )}
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* CARD 3 · Reverse Osmosis                                            */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <article
          className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            ...RIPPLE_PANEL,
            border: `1px solid #22d3ee66`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px #22d3ee33 inset, 0 0 60px ${WATER}22`,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(closest-side, rgba(34, 211, 238, 0.18), transparent 70%)`,
            }}
          />

          <div className="relative">
            <CardHeader
              num="03"
              enTitle="Reverse Osmosis"
              khTitle="អូស្មូសច្រាស"
              icon={Shield}
              accent="#22d3ee"
              kh={k}
            />

            <p className={`text-lg leading-relaxed text-white/95 mb-6 ${k ? "font-khmer leading-loose" : ""}`}>
              {t(
                "The final stage uses a sheet of plastic film with holes so small you cannot see them with any optical microscope — about 0.0001 micrometres across. That is just barely wider than a single H₂O molecule, and far narrower than any bacterium, virus, salt ion, or heavy-metal atom.",
                "ដំណាក់​កាល​ចុង​ក្រោយ​ប្រើ​សន្លឹក​ភ្នាស​ប្លាស្ទិក​មួយ ដែល​មាន​រន្ធ​តូច​បំផុត​ដែល​អ្នក​មិន​អាច​មើល​ឃើញ​ដោយ​មីក្រូទស្សន៍​ពន្លឺ​ណា​មួយ​ឡើយ — ប្រមាណ ០.០០០១ មីក្រូម៉ែត្រ។ វា​គ្រាន់​តែ​ធំ​ជាង​ម៉ូលេគុល H₂O តែ​មួយ​បន្តិច ហើយ​តូច​ជាង​បាក់តេរី មេរោគ អ៊ីយ៉ុង​អំបិល ឬ​អាតូម​លោហៈ​ធ្ងន់​ច្រើន។",
              )}
            </p>

            <div
              className="rounded-xl p-5 sm:p-6 mb-6"
              style={{
                background: `linear-gradient(180deg, ${WATER}12, transparent)`,
                border: `1px solid ${WATER}44`,
              }}
            >
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Sparkles className="w-4 h-4" style={{ color: WATER_LIGHT }} aria-hidden="true" />
                <div
                  className={`text-[11px] font-bold tracking-widest uppercase ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
                  style={{ color: WATER_LIGHT }}
                >
                  {t("How It Works", "របៀប​ដំណើរការ")}
                </div>
                <span
                  className={`text-[11px] font-medium tracking-wide ${k ? "" : "font-khmer text-xs"}`}
                  style={{ color: SLATE_MID }}
                >
                  · {k ? "How It Works" : "របៀប​ដំណើរការ"}
                </span>
              </div>
              <div className="mb-4" />

              <p className={`text-base leading-relaxed text-white/95 mb-4 ${k ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Normally, if you put salty water on one side of a membrane and pure water on the other, water naturally drifts toward the salty side to balance things out — that's osmosis. Reverse osmosis flips the process: a pump squeezes the dirty water at high pressure (often 8–15 atmospheres) so that pure H₂O molecules are forced backwards through the membrane, leaving every contaminant trapped behind.",
                  "ជា​ធម្មតា​ប្រសិន​បើ​អ្នក​ដាក់​ទឹក​ប្រៃ​នៅ​ខាង​មួយ​នៃ​ភ្នាស និង​ទឹក​បរិសុទ្ធ​នៅ​ខាង​ម្ខាង​ទៀត ទឹក​នឹង​ហូរ​ទៅ​ខាង​ប្រៃ​ដើម្បី​តុល្យភាព — នោះ​ជា​អូស្មូស (osmosis)។ អូស្មូសច្រាស​ត្រឡប់​ដំណើរការ​នេះ​វិញ៖ ស្នប់​សង្កត់​ទឹក​កខ្វក់​ដោយ​សម្ពាធ​ខ្ពស់ (ជា​ធម្មតា ៨–១៥ បរិយាកាស) ដូច្នេះ​ម៉ូលេគុល H₂O បរិសុទ្ធ​ត្រូវ​បាន​បង្ខំ​ត្រឡប់​ក្រោយ​ឆ្លង​កាត់​ភ្នាស ដោយ​ទុក​សារ​ធាតុ​បំពុល​នី​មួយៗ​នៅ​ខាង​ក្រោយ។",
                )}
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <div
                  className="rounded-lg p-3 text-center"
                  style={{ background: `${WATER}11`, border: `1px solid ${WATER}44` }}
                >
                  <div className="font-display font-bold text-2xl" style={{ color: WATER_LIGHT }}>
                    0.0001
                  </div>
                  <div className={`text-xs mt-1 ${k ? "font-khmer" : ""}`} style={{ color: SLATE_LIGHT }}>
                    {k ? "មីក្រូម៉ែត្រ · micrometres" : "micrometres · មីក្រូម៉ែត្រ"}
                  </div>
                </div>
                <div
                  className="rounded-lg p-3 text-center"
                  style={{ background: `${SUCCESS}11`, border: `1px solid ${SUCCESS}44` }}
                >
                  <div className="font-display font-bold text-2xl" style={{ color: SUCCESS }}>
                    H₂O
                  </div>
                  <div className={`text-xs mt-1 ${k ? "font-khmer" : ""}`} style={{ color: SLATE_LIGHT }}>
                    {k ? "ឆ្លង​កាត់ · passes through" : "passes through · ឆ្លង​កាត់"}
                  </div>
                </div>
                <div
                  className="rounded-lg p-3 text-center"
                  style={{ background: `${ERROR}11`, border: `1px solid ${ERROR}44` }}
                >
                  <div className="font-display font-bold text-2xl" style={{ color: ERROR }}>
                    ✕
                  </div>
                  <div className={`text-xs mt-1 ${k ? "font-khmer" : ""}`} style={{ color: SLATE_LIGHT }}>
                    {k ? "មេរោគ · បាក់តេរី · អំបិល" : "viruses · bacteria · salts"}
                  </div>
                </div>
              </div>
            </div>

            <FactCallout
              enLabel="The Result"
              khLabel="លទ្ធផល"
              enText="Water that comes out of an RO system is approximately 99.9% pure H₂O — clean enough for hospitals, laboratories, and the bottled water you buy at the store. The trapped impurities — bacteria, viruses, salts, lead, arsenic — are flushed away as a separate waste stream."
              khText="ទឹក​ដែល​ចេញ​ពី​ប្រព័ន្ធ RO គឺ​ប្រហែល ៩៩.៩% ជា H₂O បរិសុទ្ធ — ស្អាត​ល្មម​សម្រាប់​មន្ទីរ​ពេទ្យ មន្ទីរ​ពិសោធន៍ និង​ទឹក​ដប​ដែល​អ្នក​ទិញ​នៅ​ហាង។ សារ​ធាតុ​បំពុល​ដែល​ត្រូវ​បាន​ចាប់ — បាក់តេរី មេរោគ អំបិល សំណ អាសេនិច — ត្រូវ​បាន​បញ្ចេញ​ជា​ខ្សែ​សំណល់​ដាច់​ដោយ​ឡែក។"
              icon={CheckCircle2}
              accent={SUCCESS}
              kh={k}
            />
          </div>
        </article>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SIMULATOR                                                           */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <FilterStackingSim kh={k} />
      </section>
    </div>
  );
}
