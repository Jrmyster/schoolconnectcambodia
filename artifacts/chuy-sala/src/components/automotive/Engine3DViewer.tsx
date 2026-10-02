import { EngineDiagram } from "@/components/diagrams/LearningDiagrams";

import { useState } from "react";

// ────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// 3D scene wrapper
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────────────
// Public component
// ────────────────────────────────────────────────────────────────────────────
export default function Engine3DViewer({ kh: _kh }: { kh: boolean }) {
  // _kh is accepted for API parity with sibling diagram components, but the
  // viewer's UI strings are intentionally bilingual (EN / KH) regardless of
  // toggle state — matching the user's "strictly bilingual" requirement.
  void _kh;

  const [rpm, setRpm] = useState(35);

  const displayedRpm = Math.round(rpm * 60); // 0..6000 RPM scale
  const isOff = rpm === 0;

  return (
    <div
      className="rounded-lg bg-black/70 border border-orange-500/40 overflow-hidden"
      data-testid="engine-3d-viewer"
    >
      {/* Header bar — bilingual */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-gradient-to-r from-orange-950/40 via-zinc-950 to-zinc-950 border-b border-orange-500/30">
        <div className="text-[10px] font-mono uppercase tracking-widest text-orange-300">
          Inline-4 Engine · Live diagram
          <span className="font-khmer normal-case tracking-normal text-xs text-orange-200/90 ml-2">
            / ម៉ាស៊ីន ៤ ស៊ីឡាំង (3D)
          </span>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
          Adjust throttle or the cycle slider
          <span className="font-khmer normal-case tracking-normal text-xs text-slate-300 ml-2">
            / កែតម្រូវល្បឿន ឬគ្រាប់រំកិលវដ្ត
          </span>
        </div>
      </div>

      {/* Interactive SVG engine diagram */}
      <div className="h-[340px] sm:h-[400px] bg-gradient-to-b from-stone-950 via-black to-black">
        <EngineDiagram rpm={rpm} />
      </div>

      {/* Throttle controls — strictly bilingual */}
      <div className="px-4 py-4 bg-gradient-to-b from-zinc-950 to-black border-t border-orange-500/30">
        <div className="flex items-center justify-between mb-2 gap-3">
          <label
            htmlFor="engine-throttle"
            className="text-xs font-mono uppercase tracking-widest text-orange-300"
          >
            Throttle{" "}
            <span className="font-khmer normal-case tracking-normal text-sm text-orange-200">
              / ល្បឿនម៉ាស៊ីន
            </span>{" "}
            <span className="text-amber-200">(RPM)</span>
          </label>
          <span
            className="text-orange-200 tabular-nums font-bold text-sm font-mono whitespace-nowrap"
            data-testid="engine-rpm-readout"
          >
            {isOff ? (
              <>
                OFF{" "}
                <span className="font-khmer text-orange-300/90 ml-1">
                  / ឈប់
                </span>
              </>
            ) : (
              `${displayedRpm.toLocaleString()} rpm`
            )}
          </span>
        </div>

        <input
          id="engine-throttle"
          type="range"
          min={0}
          max={100}
          step={1}
          value={rpm}
          onChange={(e) => setRpm(Number(e.target.value))}
          data-testid="engine-throttle-slider"
          aria-label="Throttle / ល្បឿនម៉ាស៊ីន (RPM)"
          className="w-full h-2 cursor-pointer appearance-none rounded-full bg-zinc-800 accent-orange-500"
          style={{
            backgroundImage: `linear-gradient(to right, #ff8c00 0%, #ff8c00 ${rpm}%, #27272a ${rpm}%, #27272a 100%)`,
          }}
        />

        <div className="mt-2 flex justify-between text-[10px] font-mono uppercase tracking-widest text-slate-400">
          <span>
            Off{" "}
            <span className="font-khmer normal-case text-xs text-slate-300">
              / ឈប់
            </span>
          </span>
          <span>
            Idle{" "}
            <span className="font-khmer normal-case text-xs text-slate-300">
              / ដើរទំនេរ
            </span>
          </span>
          <span>
            Cruise{" "}
            <span className="font-khmer normal-case text-xs text-slate-300">
              / បើកធម្មតា
            </span>
          </span>
          <span className="text-orange-300">
            Redline{" "}
            <span className="font-khmer normal-case text-xs text-orange-200">
              / ខ្លាំងបំផុត
            </span>
          </span>
        </div>

        <p className="mt-3 text-[11px] text-slate-300 leading-relaxed">
          Cylinders fire in{" "}
          <strong className="text-orange-300">1 → 3 → 4 → 2</strong> order, just
          like a real inline-4. Watch the orange flash light up at the top of
          each cylinder — that's the "Power" stroke firing.
        </p>
        <p className="mt-1 font-khmer text-[12px] text-slate-300 leading-loose">
          ស៊ីឡាំងបាញ់តាមលំដាប់{" "}
          <strong className="text-orange-300">១ → ៣ → ៤ → ២</strong>{" "}
          ដូចម៉ាស៊ីនពិត។ មើលពន្លឺពណ៌ទឹកក្រូចភ្លឺឡើងនៅខាងលើស៊ីឡាំងនីមួយៗ —
          នោះគឺជាជំហាន 'ផ្ទុះ' (Power)។
        </p>
      </div>
    </div>
  );
}
