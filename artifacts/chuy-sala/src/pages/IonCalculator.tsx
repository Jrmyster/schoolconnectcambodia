import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Beaker,
  Lightbulb,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Oxidation State & Ion Calculator
//  ម៉ាស៊ីនគិតលេខស្ថានភាពអុកស៊ីតកម្ម និងអ៊ីយ៉ុង
//
//  Aesthetic: clean laboratory whites, proton reds, and electron blues.
//  Two-column layout — Control Panel (left) + Visual Atom Display (right).
//  All copy strictly bilingual EN / KH.
// ════════════════════════════════════════════════════════════════════════════

interface ElementData {
  z: number;
  symbol: string;
  nameEn: string;
  nameKh: string;
}

// First 20 elements of the periodic table (H → Ca).
const ELEMENTS: ElementData[] = [
  // Khmer transliterations match the project's canonical periodic-data.ts.
  { z: 1,  symbol: "H",  nameEn: "Hydrogen",   nameKh: "អ៊ីដ្រូសែន" },
  { z: 2,  symbol: "He", nameEn: "Helium",     nameKh: "អេលីយ៉ូម" },
  { z: 3,  symbol: "Li", nameEn: "Lithium",    nameKh: "លីចូម" },
  { z: 4,  symbol: "Be", nameEn: "Beryllium",  nameKh: "ប៊ែរីលីយ៉ូម" },
  { z: 5,  symbol: "B",  nameEn: "Boron",      nameKh: "បូរ៉ុង" },
  { z: 6,  symbol: "C",  nameEn: "Carbon",     nameKh: "កាបូន" },
  { z: 7,  symbol: "N",  nameEn: "Nitrogen",   nameKh: "អាសូត" },
  { z: 8,  symbol: "O",  nameEn: "Oxygen",     nameKh: "អុកស៊ីសែន" },
  { z: 9,  symbol: "F",  nameEn: "Fluorine",   nameKh: "ហ្វ្លុយអូរ" },
  { z: 10, symbol: "Ne", nameEn: "Neon",       nameKh: "នេអុង" },
  { z: 11, symbol: "Na", nameEn: "Sodium",     nameKh: "សូដ្យូម" },
  { z: 12, symbol: "Mg", nameEn: "Magnesium",  nameKh: "ម៉ាញ៉េស្យូម" },
  { z: 13, symbol: "Al", nameEn: "Aluminum",   nameKh: "អាលុយមីញ៉ូម" },
  { z: 14, symbol: "Si", nameEn: "Silicon",    nameKh: "ស៊ីលីស្យូម" },
  { z: 15, symbol: "P",  nameEn: "Phosphorus", nameKh: "ផូស្វ័រ" },
  { z: 16, symbol: "S",  nameEn: "Sulfur",     nameKh: "ស្ពាន់ធ័រ" },
  { z: 17, symbol: "Cl", nameEn: "Chlorine",   nameKh: "ក្លរ" },
  { z: 18, symbol: "Ar", nameEn: "Argon",      nameKh: "អាហ្គន" },
  { z: 19, symbol: "K",  nameEn: "Potassium",  nameKh: "ប៉ូតាស្យូម" },
  { z: 20, symbol: "Ca", nameEn: "Calcium",    nameKh: "កាល់ស្យូម" },
];

// Standard Bohr shell capacities used in school chemistry: 2, 8, 8, 18, 18 …
// Distributes `count` electrons across shells; the outermost shell may be
// partially filled (e.g. Carbon = [2, 4], Sodium = [2, 8, 1]).
function distributeShells(count: number): number[] {
  const caps = [2, 8, 8, 18, 18, 32];
  const shells: number[] = [];
  let remaining = Math.max(0, count);
  for (const cap of caps) {
    if (remaining <= 0) break;
    const fill = Math.min(remaining, cap);
    shells.push(fill);
    remaining -= fill;
  }
  return shells;
}

export function IonCalculator() {
  const { language } = useLanguageStore();
  const kh = language === "kh"; // Used only for SVG aria-label localisation.

  const [z, setZ] = useState<number>(6); // Carbon — a familiar default.
  const element = useMemo(
    () => ELEMENTS.find((el) => el.z === z) ?? ELEMENTS[0],
    [z]
  );

  // Electrons start at the neutral count for the selected element.
  const [electrons, setElectrons] = useState<number>(element.z);

  // Reset electrons to the neutral count whenever the element changes.
  useEffect(() => {
    setElectrons(element.z);
  }, [element.z]);

  // Animation pulse — incremented every time the user adds or removes an
  // electron so we can replay a one-shot SVG animation by remount.
  const [pulse, setPulse] = useState<{ type: "add" | "remove"; id: number } | null>(null);

  // Auto-clear the pulse after the animation finishes so we don't leak nodes.
  useEffect(() => {
    if (!pulse) return;
    const timer = window.setTimeout(() => setPulse(null), 650);
    return () => window.clearTimeout(timer);
  }, [pulse]);

  // Sensible bounds: clamp anion side to outer-shell + 4, cation side to 0.
  // (Real ions for these elements never need more than ~+/-4 of charge.)
  const MIN_E = 0;
  const MAX_E = element.z + 4;
  const atMax = electrons >= MAX_E;
  const atMin = electrons <= MIN_E;

  // Handlers compute the bound check OUTSIDE the state updater so we don't
  // run side effects (setPulse) inside another setState's reducer — that would
  // double-fire under React StrictMode in development.
  const addElectron = () => {
    if (atMax) return;
    setElectrons((e) => Math.min(MAX_E, e + 1));
    setPulse({ type: "add", id: performance.now() });
  };
  const removeElectron = () => {
    if (atMin) return;
    setElectrons((e) => Math.max(MIN_E, e - 1));
    setPulse({ type: "remove", id: performance.now() });
  };
  const resetElectrons = () => {
    setElectrons(element.z);
    setPulse(null);
  };

  const charge = element.z - electrons;

  return (
    <div
      className="min-h-screen py-8 sm:py-10 px-4 sm:px-6"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back link — bilingual stacked inline */}
        <Link
          href="/chemistry"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-5"
          aria-label="Back to Chemistry Hub / ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Chemistry Hub</span>
          <span className="text-slate-300">·</span>
          <span className="font-khmer leading-loose">ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា</span>
        </Link>

        {/* Hero */}
        <header
          className="relative overflow-hidden rounded-3xl bg-white border-2 border-slate-200 px-6 sm:px-8 py-6 sm:py-8 mb-8 shadow-sm"
          data-testid="ion-calculator-hero"
        >
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-700 flex items-center justify-center flex-shrink-0">
              <Atom className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 mb-2">
                <Beaker className="w-3.5 h-3.5" />
                <span>CHEMISTRY</span>
                <span className="text-slate-300">·</span>
                <span className="font-khmer normal-case tracking-normal text-slate-600">
                  គីមីវិទ្យា
                </span>
                <span className="opacity-50">/</span>
                <span className="text-rose-700">ION-CALC</span>
              </div>
              <h1
                data-testid="page-title"
                className="text-2xl sm:text-3xl font-bold leading-tight text-slate-900"
              >
                Oxidation State &amp; Ion Calculator
              </h1>
              <h2 className="font-khmer text-base sm:text-lg font-bold leading-snug text-slate-700 mt-1">
                ម៉ាស៊ីនគិតលេខស្ថានភាពអុកស៊ីតកម្ម និងអ៊ីយ៉ុង
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Pick an element, then add or remove electrons. The atom flips
                from <strong className="text-rose-700">neutral</strong> to a{" "}
                <strong className="text-rose-700">cation (+)</strong> or{" "}
                <strong className="text-blue-700">anion (−)</strong> in real time.
              </p>
              <p className="mt-1.5 text-sm sm:text-base text-slate-600 font-khmer leading-loose">
                ជ្រើសរើសធាតុមួយ បន្ទាប់មកបន្ថែម​ឬ​ដក​អេឡិចត្រុង។ អាតូមនឹងផ្លាស់ប្តូរពី <strong className="text-rose-700">អព្យាក្រឹត</strong> ទៅជា <strong className="text-rose-700">កាទីយ៉ុង (+)</strong> ឬ <strong className="text-blue-700">អានីយ៉ុង (−)</strong> ភ្លាមៗ។
              </p>
            </div>
          </div>
        </header>

        {/* Main two-column layout */}
        <div className="grid lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] gap-6">
          {/* ── Control Panel ── */}
          <ControlPanel
            element={element}
            electrons={electrons}
            onSelectZ={setZ}
            onAdd={addElectron}
            onRemove={removeElectron}
            onReset={resetElectrons}
            atMax={atMax}
            atMin={atMin}
          />

          {/* ── Visual + Math ── */}
          <div className="space-y-5">
            <VisualAtomDisplay
              element={element}
              electrons={electrons}
              pulse={pulse}
              kh={kh}
            />
            <ChargeReadout
              protons={element.z}
              electrons={electrons}
              charge={charge}
              symbol={element.symbol}
            />
            <TeachingNote />
          </div>
        </div>

        {/* Footer link — bilingual stacked inline */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/chemistry"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold shadow hover:bg-slate-800 transition-colors"
            aria-label="Back to Chemistry Hub / ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា"
          >
            <span>Back to Chemistry Hub</span>
            <span className="opacity-50">·</span>
            <span className="font-khmer leading-loose">ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  Control Panel — element picker, P+/e- counts, electron buttons
// ────────────────────────────────────────────────────────────────────────────

function ControlPanel({
  element,
  electrons,
  onSelectZ,
  onAdd,
  onRemove,
  onReset,
  atMax,
  atMin,
}: {
  element: ElementData;
  electrons: number;
  onSelectZ: (z: number) => void;
  onAdd: () => void;
  onRemove: () => void;
  onReset: () => void;
  atMax: boolean;
  atMin: boolean;
}) {
  return (
    <aside
      data-testid="control-panel"
      className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm h-fit"
    >
      {/* Panel header — bilingual */}
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500 bg-slate-100 border border-slate-200 rounded px-2 py-0.5">
          PANEL
        </span>
      </div>
      <h3 className="text-base font-bold text-slate-900 leading-tight">
        Control Panel
      </h3>
      <h4 className="text-sm font-bold text-slate-600 font-khmer leading-snug mb-4">
        ផ្ទាំងគ្រប់គ្រង
      </h4>

      {/* Element selector */}
      <label
        htmlFor="ion-element-select"
        className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
      >
        Element
      </label>
      <label
        htmlFor="ion-element-select"
        className="block text-xs font-semibold text-slate-500 font-khmer leading-loose mb-1.5"
      >
        ធាតុ
      </label>
      <select
        id="ion-element-select"
        data-testid="element-selector"
        value={element.z}
        onChange={(e) => onSelectZ(parseInt(e.target.value, 10))}
        className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-300 bg-slate-50 text-sm font-semibold text-slate-900 focus:outline-none focus:border-rose-400 focus:bg-white transition-colors"
      >
        {ELEMENTS.map((el) => (
          <option key={el.z} value={el.z}>
            {el.z}. {el.symbol} — {el.nameEn} / {el.nameKh}
          </option>
        ))}
      </select>

      {/* Selected-element summary card */}
      <div
        className="mt-4 rounded-xl border-2 border-slate-200 bg-slate-50 p-3"
        data-testid="element-summary"
      >
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-lg bg-white border-2 border-slate-300 flex flex-col items-center justify-center shadow-sm">
            <span className="text-[10px] font-mono text-slate-500 leading-none">
              {element.z}
            </span>
            <span className="text-2xl font-extrabold text-slate-900 leading-none mt-0.5">
              {element.symbol}
            </span>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-900 leading-tight truncate">
              {element.nameEn}
            </div>
            <div className="text-xs font-bold text-slate-600 font-khmer leading-snug truncate">
              {element.nameKh}
            </div>
          </div>
        </div>
      </div>

      {/* P+ / e- count read-out */}
      <div className="mt-4 grid grid-cols-2 gap-2" data-testid="pe-counts">
        <div className="rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-2.5 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rose-700">
            P⁺ · Protons
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-rose-700/80 font-khmer normal-case tracking-normal">
            ប្រូតុង
          </div>
          <div
            data-testid="proton-count"
            className="mt-1 text-2xl font-extrabold text-rose-700 font-mono"
          >
            {element.z}
          </div>
        </div>
        <div className="rounded-xl border-2 border-blue-300 bg-blue-50 px-3 py-2.5 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-blue-700">
            e⁻ · Electrons
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-blue-700/80 font-khmer normal-case tracking-normal">
            អេឡិចត្រុង
          </div>
          <div
            data-testid="electron-count"
            className="mt-1 text-2xl font-extrabold text-blue-700 font-mono"
          >
            {electrons}
          </div>
        </div>
      </div>

      {/* Electron control buttons */}
      <div className="mt-5 space-y-2">
        <button
          type="button"
          onClick={onAdd}
          disabled={atMax}
          data-testid="btn-add-electron"
          className="group w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-blue-500 bg-blue-500 text-white font-bold py-2.5 px-4 shadow-sm hover:bg-blue-600 hover:border-blue-600 active:scale-[0.98] disabled:bg-slate-300 disabled:border-slate-300 disabled:cursor-not-allowed transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add Electron (−)</span>
          <span className="text-sm font-khmer leading-loose">
            · បន្ថែមអេឡិចត្រុង
          </span>
        </button>
        <button
          type="button"
          onClick={onRemove}
          disabled={atMin}
          data-testid="btn-remove-electron"
          className="group w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-rose-500 bg-rose-500 text-white font-bold py-2.5 px-4 shadow-sm hover:bg-rose-600 hover:border-rose-600 active:scale-[0.98] disabled:bg-slate-300 disabled:border-slate-300 disabled:cursor-not-allowed transition-all"
        >
          <Minus className="w-4 h-4" />
          <span className="text-sm">Remove Electron (+)</span>
          <span className="text-sm font-khmer leading-loose">
            · ដកអេឡិចត្រុង
          </span>
        </button>
        <button
          type="button"
          onClick={onReset}
          data-testid="btn-reset"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white text-slate-700 font-semibold py-2 px-4 hover:bg-slate-100 active:scale-[0.98] transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-xs">Reset to Neutral</span>
          <span className="text-xs font-khmer leading-loose">
            · កំណត់ឡើងវិញ
          </span>
        </button>
      </div>
    </aside>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  Visual Atom Display — nucleus + orbiting electrons + add/remove pulse
// ────────────────────────────────────────────────────────────────────────────

const SIZE = 360;
const CENTER = SIZE / 2;
const NUCLEUS_R = 30;
const FIRST_SHELL_R = 56;
const SHELL_GAP = 26;

function VisualAtomDisplay({
  element,
  electrons,
  pulse,
  kh,
}: {
  element: ElementData;
  electrons: number;
  pulse: { type: "add" | "remove"; id: number } | null;
  kh: boolean;
}) {
  const shells = useMemo(() => distributeShells(electrons), [electrons]);

  // Compute orbit radii, compressing if necessary so the largest fits.
  const radii = useMemo(() => {
    if (shells.length === 0) return [];
    const naive = shells.map((_, i) => FIRST_SHELL_R + i * SHELL_GAP);
    const maxR = SIZE / 2 - 18;
    const last = naive[naive.length - 1];
    if (last <= maxR) return naive;
    const scale = (maxR - FIRST_SHELL_R) /
      Math.max(1, FIRST_SHELL_R + (shells.length - 1) * SHELL_GAP - FIRST_SHELL_R);
    return shells.map((_, i) => FIRST_SHELL_R + i * SHELL_GAP * scale);
  }, [shells]);

  const outerR = radii[radii.length - 1] ?? FIRST_SHELL_R;

  return (
    <div
      className="relative rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm"
      data-testid="atom-display"
    >
      {/* Scoped keyframes */}
      <style>{`
        @keyframes ion-orbit-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes ion-orbit-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes ion-pulse-nucleus { 0%, 100% { opacity: 1; } 50% { opacity: 0.85; } }
        @keyframes ion-fly-in {
          0%   { transform: translate(220px, -220px) scale(1.6); opacity: 0; }
          25%  { opacity: 1; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes ion-fly-out {
          0%   { transform: translate(0, 0) scale(1); opacity: 1; }
          75%  { opacity: 1; }
          100% { transform: translate(260px, 220px) scale(1.6); opacity: 0; }
        }
        .ion-orbit { transform-origin: center; }
        .ion-nucleus { animation: ion-pulse-nucleus 2.6s ease-in-out infinite; transform-origin: center; }
        .ion-particle-in { animation: ion-fly-in 0.6s cubic-bezier(.22,.95,.4,1) forwards; }
        .ion-particle-out { animation: ion-fly-out 0.6s cubic-bezier(.55,.05,.78,.26) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .ion-orbit, .ion-nucleus, .ion-particle-in, .ion-particle-out { animation: none !important; }
        }
      `}</style>

      {/* Header strip */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500 bg-slate-100 border border-slate-200 rounded px-2 py-0.5">
            ATOM
          </span>
          <h3 className="text-sm font-bold text-slate-900">Visual Atom Display</h3>
          <span className="text-slate-300">·</span>
          <h4 className="text-sm font-bold text-slate-700 font-khmer">
            ការបង្ហាញអាតូមផ្ទាល់
          </h4>
        </div>
        <span
          data-testid="atom-shell-count"
          className="text-[10px] font-mono text-slate-500"
          title="Electrons per shell · អេឡិចត្រុងក្នុងស្រទាប់នីមួយៗ"
        >
          {shells.length === 0 ? "0 e⁻" : `${shells.join(",")} e⁻`}
        </span>
      </div>

      {/* SVG visual */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full max-w-md h-auto"
          role="img"
          aria-label={
            kh
              ? `អាតូមរបស់ ${element.nameKh} ដែលមានប្រូតុង ${element.z} និងអេឡិចត្រុង ${electrons}`
              : `Atom of ${element.nameEn} with ${element.z} protons and ${electrons} electrons`
          }
        >
          <defs>
            <radialGradient id="ion-nucleus-grad" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#fecaca" />
              <stop offset="55%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
            <radialGradient id="ion-electron-grad" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="55%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
            <filter id="ion-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ion-glow-lg" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Faint background grid */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`gv-${i}`}
              x1={i * (SIZE / 7)}
              y1="0"
              x2={i * (SIZE / 7)}
              y2={SIZE}
              stroke="#e2e8f0"
              strokeWidth="0.6"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`gh-${i}`}
              x1="0"
              y1={i * (SIZE / 7)}
              x2={SIZE}
              y2={i * (SIZE / 7)}
              stroke="#e2e8f0"
              strokeWidth="0.6"
            />
          ))}

          {/* Orbit circles */}
          {radii.map((r, i) => (
            <circle
              key={`orbit-${i}`}
              cx={CENTER}
              cy={CENTER}
              r={r}
              fill="none"
              stroke="#94a3b8"
              strokeOpacity={0.45}
              strokeWidth={0.9}
              strokeDasharray="3 4"
            />
          ))}

          {/* Rotating shell groups with electrons */}
          {radii.map((r, i) => {
            const count = shells[i];
            const dur = 5 + i * 2;
            const direction = i % 2 === 0 ? "ion-orbit-cw" : "ion-orbit-ccw";
            const phase = (i * 23) % 360;
            return (
              <g
                key={`shell-${i}`}
                className="ion-orbit"
                style={{
                  animation: `${direction} ${dur}s linear infinite`,
                  transformOrigin: `${CENTER}px ${CENTER}px`,
                }}
              >
                {Array.from({ length: count }).map((_, k) => {
                  const angle = (360 / count) * k + phase;
                  const rad = (angle * Math.PI) / 180;
                  const ex = CENTER + r * Math.cos(rad);
                  const ey = CENTER + r * Math.sin(rad);
                  return (
                    <g key={k} filter="url(#ion-glow)">
                      <circle
                        cx={ex}
                        cy={ey}
                        r={5}
                        fill="url(#ion-electron-grad)"
                      />
                      <circle
                        cx={ex - 1}
                        cy={ey - 1}
                        r={1.4}
                        fill="#ffffff"
                        opacity={0.85}
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Nucleus */}
          <g className="ion-nucleus" style={{ transformOrigin: `${CENTER}px ${CENTER}px` }} filter="url(#ion-glow-lg)">
            <circle
              cx={CENTER}
              cy={CENTER}
              r={NUCLEUS_R}
              fill="url(#ion-nucleus-grad)"
            />
            <circle
              cx={CENTER - 8}
              cy={CENTER - 8}
              r={6}
              fill="#fecaca"
              opacity={0.7}
            />
          </g>
          <text
            x={CENTER}
            y={CENTER - 1}
            textAnchor="middle"
            fontSize={12}
            fontWeight={800}
            fill="#ffffff"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            {element.z}p⁺
          </text>
          <text
            x={CENTER}
            y={CENTER + 12}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill="#fef2f2"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            {element.symbol}
          </text>

          {/* Pulse particle — temporary electron flying in or out */}
          {pulse && (
            <g
              key={pulse.id}
              className={pulse.type === "add" ? "ion-particle-in" : "ion-particle-out"}
              style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
              filter="url(#ion-glow)"
            >
              <circle
                cx={CENTER + outerR * 0.96}
                cy={CENTER}
                r={6}
                fill="url(#ion-electron-grad)"
                opacity={0.95}
              />
              <text
                x={CENTER + outerR * 0.96}
                y={CENTER + 3}
                textAnchor="middle"
                fontSize={9}
                fontWeight={800}
                fill="#ffffff"
                fontFamily="ui-monospace, monospace"
              >
                e⁻
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Shell legend */}
      {shells.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
          {shells.map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800"
            >
              <span className="font-bold text-blue-700">
                {["K", "L", "M", "N", "O"][i] ?? `n${i + 1}`}
              </span>
              <span className="text-slate-400">·</span>
              <span>{c} e⁻</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  Charge Read-out (the math engine)
// ────────────────────────────────────────────────────────────────────────────

function ChargeReadout({
  protons,
  electrons,
  charge,
  symbol,
}: {
  protons: number;
  electrons: number;
  charge: number;
  symbol: string;
}) {
  const isNeutral = charge === 0;
  const isCation = charge > 0;
  // const isAnion = charge < 0;

  // Colour scheme: grey neutral / red cation / blue anion.
  const palette = isNeutral
    ? {
        border: "border-slate-300",
        bg: "bg-slate-50",
        chipBg: "bg-slate-200",
        chipText: "text-slate-700",
        chargeText: "text-slate-700",
        labelEn: "Neutral Atom",
        labelKh: "អាតូមអព្យាក្រឹត",
        sign: "0",
        notation: `${symbol}`,
      }
    : isCation
    ? {
        border: "border-rose-300",
        bg: "bg-rose-50",
        chipBg: "bg-rose-200",
        chipText: "text-rose-800",
        chargeText: "text-rose-700",
        labelEn: `Cation (+${charge})`,
        labelKh: `កាទីយ៉ុង (+${charge})`,
        sign: `+${charge}`,
        notation: `${symbol}^${charge === 1 ? "+" : `${charge}+`}`,
      }
    : {
        border: "border-blue-300",
        bg: "bg-blue-50",
        chipBg: "bg-blue-200",
        chipText: "text-blue-800",
        chargeText: "text-blue-700",
        labelEn: `Anion (${charge})`,
        labelKh: `អានីយ៉ុង (${charge})`,
        sign: `${charge}`,
        notation: `${symbol}^${charge === -1 ? "−" : `${Math.abs(charge)}−`}`,
      };

  return (
    <div
      data-testid="charge-readout"
      className={`relative rounded-2xl border-2 ${palette.border} ${palette.bg} p-5 shadow-sm`}
    >
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500 bg-white border border-slate-200 rounded px-2 py-0.5">
            CHARGE
          </span>
          <h3 className="text-sm font-bold text-slate-900">Math Engine</h3>
          <span className="text-slate-300">·</span>
          <h4 className="text-sm font-bold text-slate-700 font-khmer">
            ម៉ាស៊ីនគណនា
          </h4>
        </div>
        <span
          data-testid="ion-notation"
          className="font-mono text-sm font-bold text-slate-800"
        >
          {palette.notation}
        </span>
      </div>

      {/* The formula — universal math symbols, then bilingual caption */}
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 mb-3 overflow-x-auto">
        <div className="text-center font-mono text-base sm:text-lg text-slate-800">
          <span data-testid="charge-formula">
            Charge ={" "}
            <span className="text-rose-700 font-bold">N<sub>p⁺</sub>({protons})</span>{" "}
            −{" "}
            <span className="text-blue-700 font-bold">N<sub>e⁻</sub>({electrons})</span>{" "}
            ={" "}
            <span
              data-testid="charge-value"
              className={`font-extrabold ${palette.chargeText}`}
            >
              {palette.sign}
            </span>
          </span>
        </div>
        <div className="mt-1.5 text-center text-[11px] sm:text-xs text-slate-500 font-khmer leading-loose">
          បន្ទុក = ប្រូតុង ({protons}) − អេឡិចត្រុង ({electrons}) = {palette.sign}
        </div>
      </div>

      {/* Bilingual label */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span
          data-testid="charge-label-en"
          className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${palette.chipBg} ${palette.chipText}`}
        >
          {palette.labelEn}
        </span>
        <span
          data-testid="charge-label-kh"
          className={`inline-block px-3 py-1 rounded-full text-sm font-bold font-khmer leading-loose ${palette.chipBg} ${palette.chipText}`}
        >
          {palette.labelKh}
        </span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  Teaching note — "When you lose a negative electron, you become positive!"
// ────────────────────────────────────────────────────────────────────────────

function TeachingNote() {
  return (
    <div
      data-testid="teaching-note"
      className="relative rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 flex items-start gap-3"
    >
      <Lightbulb className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-amber-900 leading-relaxed">
          <strong>Key idea: </strong>
          When you <em>lose</em> a negative electron, you become <strong className="text-rose-700">positive</strong>!
          And when you <em>gain</em> a negative electron, you become <strong className="text-blue-700">negative</strong>.
        </p>
        <p className="text-sm text-amber-900 font-khmer leading-loose mt-1.5">
          <strong>គំនិតគន្លឹះ ៖ </strong>
          នៅពេលអ្នក<em>បាត់បង់</em>អេឡិចត្រុងអវិជ្ជមាន អ្នកក្លាយជា<strong className="text-rose-700">វិជ្ជមាន</strong>!
          ហើយនៅពេលអ្នក<em>ទទួលបាន</em>អេឡិចត្រុងអវិជ្ជមានមួយ អ្នកក្លាយជា<strong className="text-blue-700">អវិជ្ជមាន</strong>។
        </p>
        {/* Memory hint — bilingual stacked so both languages are always visible */}
        <p className="mt-2 text-[11px] text-amber-700 italic">
          Memory trick: the proton count never changes — only the electron count does.
        </p>
        <p className="text-[11px] text-amber-700 font-khmer leading-loose">
          ល្បិចចងចាំ ៖ ចំនួនប្រូតុងមិនផ្លាស់ប្តូរឡើយ — មានតែអេឡិចត្រុងប៉ុណ្ណោះដែលផ្លាស់ប្តូរ។
        </p>
      </div>
    </div>
  );
}
