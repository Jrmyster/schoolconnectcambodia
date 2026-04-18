import { useMemo } from "react";
import type { Element } from "./periodic-data";

const SHELL_NAMES = ["K", "L", "M", "N", "O", "P", "Q"];

/**
 * Distribute electrons across shells using the simplified school Bohr rule:
 *   Inner shell capacities: 2, 8, 8, 18, 18, 32 (the version taught in
 *   Cambodian secondary chemistry).
 *   The outermost shell gets whatever electrons remain.
 *
 * We treat lanthanides as period 6 and actinides as period 7 for the
 * visualization (the data file places them in display rows 9/10 only
 * for grid layout).
 */
function bohrShells(el: Element): number[] {
  const z = el.z;
  let period = el.period;
  if (el.category === "lanthanide") period = 6;
  if (el.category === "actinide")   period = 7;

  if (z === 1) return [1];
  if (z === 2) return [2];

  const innerCaps = [2, 8, 8, 18, 18, 32];
  const shells: number[] = [];
  let remaining = z;
  for (let i = 0; i < period - 1; i++) {
    const fill = Math.min(remaining, innerCaps[i] ?? 32);
    shells.push(fill);
    remaining -= fill;
  }
  if (remaining > 0) shells.push(remaining);
  return shells;
}

function neutronCount(el: Element): number {
  const cleaned = el.mass.replace(/[()]/g, "");
  const m = parseFloat(cleaned);
  if (Number.isNaN(m)) return el.z;
  return Math.max(0, Math.round(m) - el.z);
}

export function BohrModel({ element, kh }: { element: Element; kh: boolean }) {
  const shells = useMemo(() => bohrShells(element), [element]);
  const neutrons = useMemo(() => neutronCount(element), [element]);

  // SVG sizing: square with a viewBox we can scale.
  // We reserve the right edge for shell labels.
  const SIZE = 320;
  const CENTER = SIZE / 2;
  const NUCLEUS_R = 22;
  const SHELL_GAP = 18;
  const FIRST_SHELL_R = 38;

  // Compute orbit radii and clamp so the largest shell fits inside the canvas.
  const maxShellCount = shells.length;
  const labelGutter = 22; // room for the K/L/M label on the right
  const maxR = (SIZE - labelGutter * 2) / 2 - 6;
  let radii = shells.map((_, i) => FIRST_SHELL_R + i * SHELL_GAP);
  const overshoot = (radii[maxShellCount - 1] ?? 0) - maxR;
  if (overshoot > 0) {
    // Compress radii uniformly so everything fits.
    const scale = (maxR - FIRST_SHELL_R) / Math.max(1, FIRST_SHELL_R + (maxShellCount - 1) * SHELL_GAP - FIRST_SHELL_R);
    radii = shells.map((_, i) => FIRST_SHELL_R + i * SHELL_GAP * scale);
  }

  return (
    <div className="rounded-2xl overflow-hidden border-2 border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 shadow-inner">
      {/* Scoped keyframes — defined once per modal instance */}
      <style>{`
        @keyframes bohr-spin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes bohr-spin-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes bohr-pulse    { 0%, 100% { opacity: 0.95; } 50% { opacity: 0.65; } }
        .bohr-shell { transform-box: fill-box; transform-origin: center; }
        .bohr-nucleus { animation: bohr-pulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bohr-shell, .bohr-nucleus { animation: none !important; }
        }
      `}</style>

      <div className="relative">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="block w-full h-auto max-h-[360px] mx-auto"
          role="img"
          aria-label={
            kh
              ? `ម៉ូដែលអាតូមប័ររបស់ ${element.nameKh}: អេឡិចត្រុង ${shells.join(", ")}`
              : `Bohr model of ${element.nameEn}: electron shells ${shells.join(", ")}`
          }
        >
          {/* Filters: glow */}
          <defs>
            <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#1e1b4b" stopOpacity="0.85" />
              <stop offset="60%"  stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nucleus-grad" cx="40%" cy="40%" r="60%">
              <stop offset="0%"  stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
            <radialGradient id="electron-grad" cx="40%" cy="40%" r="60%">
              <stop offset="0%"  stopColor="#ffffff" />
              <stop offset="40%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0891b2" />
            </radialGradient>
            <filter id="glow-sm" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-lg" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Subtle background glow */}
          <circle cx={CENTER} cy={CENTER} r={SIZE / 2} fill="url(#bg-glow)" />

          {/* Star-like dots (decorative) */}
          {[...Array(28)].map((_, i) => {
            const seed = (i * 9301 + 49297) % 233280;
            const r = (seed / 233280);
            const r2 = ((seed * 1103) % 233280) / 233280;
            const x = 6 + r * (SIZE - 12);
            const y = 6 + r2 * (SIZE - 12);
            // Avoid drawing on the orbits area
            const dx = x - CENTER, dy = y - CENTER;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (radii[radii.length - 1] ?? 0) + 14) return null;
            return (
              <circle key={i} cx={x} cy={y} r={0.7} fill="#a5b4fc" opacity={0.45} />
            );
          })}

          {/* Orbit circles */}
          {radii.map((r, i) => (
            <circle
              key={`orbit-${i}`}
              cx={CENTER}
              cy={CENTER}
              r={r}
              fill="none"
              stroke="#22d3ee"
              strokeOpacity={0.35}
              strokeWidth={0.8}
              strokeDasharray="2 3"
            />
          ))}

          {/* Shell labels (static — drawn outside rotating groups so they don't spin) */}
          {radii.map((r, i) => (
            <g key={`lbl-${i}`} transform={`translate(${CENTER + r}, ${CENTER})`}>
              <rect x={2} y={-9} width={26} height={18} rx={4} fill="#0f172a" stroke="#22d3ee" strokeOpacity={0.5} strokeWidth={0.6} />
              <text
                x={15}
                y={3}
                textAnchor="middle"
                fontSize={10}
                fontWeight={700}
                fill="#67e8f9"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                {SHELL_NAMES[i] ?? `n${i + 1}`}
              </text>
            </g>
          ))}

          {/* Rotating shell groups with electrons */}
          {radii.map((r, i) => {
            const count = shells[i];
            const dur = 4 + i * 2; // 4s, 6s, 8s, 10s, ...
            const direction = i % 2 === 0 ? "bohr-spin-cw" : "bohr-spin-ccw";
            const phase = (i * 17) % 360; // stagger initial positions
            return (
              <g
                key={`shell-${i}`}
                className="bohr-shell"
                style={{
                  animation: `${direction} ${dur}s linear infinite`,
                  transformOrigin: `${CENTER}px ${CENTER}px`,
                }}
              >
                {[...Array(count)].map((_, k) => {
                  const angle = (360 / count) * k + phase;
                  const rad = (angle * Math.PI) / 180;
                  const ex = CENTER + r * Math.cos(rad);
                  const ey = CENTER + r * Math.sin(rad);
                  return (
                    <g key={k} filter="url(#glow-sm)">
                      <circle cx={ex} cy={ey} r={3.6} fill="url(#electron-grad)" />
                      <circle cx={ex - 0.8} cy={ey - 0.8} r={1.1} fill="#ffffff" opacity={0.9} />
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Nucleus */}
          <g className="bohr-nucleus" filter="url(#glow-lg)">
            <circle cx={CENTER} cy={CENTER} r={NUCLEUS_R} fill="url(#nucleus-grad)" />
            <circle cx={CENTER - 6} cy={CENTER - 6} r={4} fill="#fffbeb" opacity={0.6} />
          </g>
          {/* Nucleus labels */}
          <text
            x={CENTER}
            y={CENTER - 2}
            textAnchor="middle"
            fontSize={9.5}
            fontWeight={800}
            fill="#7c2d12"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            {element.z}p⁺
          </text>
          <text
            x={CENTER}
            y={CENTER + 9}
            textAnchor="middle"
            fontSize={9.5}
            fontWeight={800}
            fill="#7c2d12"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            {neutrons}n⁰
          </text>
        </svg>

        {/* Floating corner badge */}
        <div className={`absolute top-2 left-2 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-slate-950/70 border border-cyan-500/30 rounded px-2 py-1 ${kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {kh ? "ម៉ូដែលអាតូមប័រ" : "Bohr Model"}
        </div>
      </div>

      {/* Shell count read-out */}
      <div className="px-4 pt-3 pb-1 flex flex-wrap gap-1.5 justify-center">
        {shells.map((count, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 border border-cyan-500/40 text-cyan-200"
          >
            <span className="font-bold text-cyan-300">{SHELL_NAMES[i] ?? `n${i + 1}`}</span>
            <span className="text-slate-400">·</span>
            <span>{count} e⁻</span>
          </span>
        ))}
      </div>

      {/* Bilingual explanation */}
      <div className="px-4 pb-4 pt-2 text-center">
        <p className={`text-xs sm:text-sm text-cyan-100/90 leading-relaxed ${kh ? "font-khmer text-sm leading-loose" : ""}`}>
          {kh
            ? "អេឡិចត្រុងក្នុងស្រទាប់ក្រៅបង្អស់ កំណត់ពីរបៀបដែលធាតុនេះមានប្រតិកម្មជាមួយធាតុផ្សេងទៀត។"
            : "Electrons in the outer shell determine how this element reacts with others."}
        </p>
        {kh && (
          <p className="mt-1 text-[11px] italic text-cyan-200/50">
            Electrons in the outer shell determine how this element reacts with others.
          </p>
        )}
      </div>
    </div>
  );
}
