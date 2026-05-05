import { Link } from "wouter";
import { ArrowLeft, Sigma, Layers, Grid, BookOpen, Zap } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  INTRODUCTION TO TENSORS
 *  សេចក្ដីណែនាំអំពីតង់ស័រ
 *
 *  Aesthetic: deep academic slate with indigo/violet accents.
 *  Bilingual EN / KH. Three sections:
 *    1. What is a Tensor? — Vector / Matrix / 3-Tensor definition cards + SVGs
 *    2. Visualizing Tensors — Stress cube with full σᵢⱼ annotation
 *    3. Notation & Concepts — Derivative product rule, commutator,
 *                             tensor product ⊗, rank table, K-theory note
 * ══════════════════════════════════════════════════════════════════════════ */

const BG        = "#07080f";
const PANEL     = "#0e1020";
const PANEL2    = "#131526";
const BORDER    = "rgba(139,92,246,0.25)";
const VIOLET    = "#8b5cf6";
const INDIGO    = "#6366f1";
const LAVENDER  = "#a78bfa";
const ROSE      = "#f43f5e";
const TEAL      = "#2dd4bf";
const GOLD      = "#fbbf24";
const TEXT      = "#e2e0f5";
const DIM       = "#94a3b8";
const MUTED     = "#475569";

const glow = (c: string, s = 8) =>
  `0 0 ${s}px ${c}60, 0 0 ${s * 2}px ${c}30`;

/* ─── tiny helpers ─────────────────────────────────────────────────────────── */
function Sub({ children }: { children: React.ReactNode }) {
  return <sub style={{ fontSize: "0.65em", lineHeight: 0 }}>{children}</sub>;
}
function Sup({ children }: { children: React.ReactNode }) {
  return <sup style={{ fontSize: "0.65em", lineHeight: 0 }}>{children}</sup>;
}
function MathBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-3 px-5 py-3 rounded-xl text-center font-mono text-lg leading-relaxed overflow-x-auto"
      style={{ background: PANEL2, border: `1px solid ${BORDER}`, color: LAVENDER }}
    >
      {children}
    </div>
  );
}
function SectionHeader({
  icon: Icon,
  num,
  en,
  kh,
  accent,
  isKh,
}: {
  icon: React.ElementType;
  num: string;
  en: string;
  kh: string;
  accent: string;
  isKh: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}18`, border: `1px solid ${accent}50` }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <div>
        <div
          className="text-[10px] font-mono uppercase tracking-[0.2em] mb-0.5"
          style={{ color: accent }}
        >
          Section {num}
        </div>
        <h2
          className={`font-bold text-xl ${isKh ? "font-khmer" : ""}`}
          style={{ color: TEXT }}
        >
          {isKh ? kh : en}
        </h2>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 *  SECTION 1 — SVG diagrams
 * ════════════════════════════════════════════════════════════════════════ */

function VectorDiagram() {
  const rows = ["v₁", "v₂", "v₃", "v₄"];
  return (
    <svg viewBox="0 0 140 160" className="w-full max-w-[140px] mx-auto block">
      {/* bracket left */}
      <path d="M 44 18 L 36 18 L 36 142 L 44 142" fill="none" stroke={VIOLET} strokeWidth="2.2" strokeLinecap="round" />
      {/* bracket right */}
      <path d="M 96 18 L 104 18 L 104 142 L 96 142" fill="none" stroke={VIOLET} strokeWidth="2.2" strokeLinecap="round" />
      {/* rows */}
      {rows.map((label, i) => (
        <g key={i}>
          <rect x="44" y={22 + i * 30} width="52" height="22"
            rx="4" fill={`${VIOLET}18`} stroke={`${VIOLET}50`} strokeWidth="1" />
          <text x="70" y={37 + i * 30} textAnchor="middle"
            fontFamily="monospace" fontSize="12" fill={LAVENDER}>{label}</text>
        </g>
      ))}
      <text x="70" y="155" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill={DIM}>1 × 4 vector</text>
    </svg>
  );
}

function MatrixDiagram() {
  const cells = [
    ["m₁₁","m₁₂","m₁₃"],
    ["m₂₁","m₂₂","m₂₃"],
    ["m₃₁","m₃₂","m₃₃"],
  ];
  return (
    <svg viewBox="0 0 180 165" className="w-full max-w-[180px] mx-auto block">
      <path d="M 24 16 L 16 16 L 16 144 L 24 144" fill="none" stroke={INDIGO} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 156 16 L 164 16 L 164 144 L 156 144" fill="none" stroke={INDIGO} strokeWidth="2.2" strokeLinecap="round" />
      {cells.map((row, ri) =>
        row.map((label, ci) => (
          <g key={`${ri}-${ci}`}>
            <rect x={24 + ci * 44} y={18 + ri * 42} width="40" height="36"
              rx="4" fill={`${INDIGO}15`} stroke={`${INDIGO}45`} strokeWidth="1" />
            <text x={44 + ci * 44} y={40 + ri * 42}
              textAnchor="middle" fontFamily="monospace" fontSize="10" fill={LAVENDER}>{label}</text>
          </g>
        ))
      )}
      <text x="90" y="160" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill={DIM}>3 × 3 matrix</text>
    </svg>
  );
}

function TensorCubeDiagram() {
  /* isometric cube, 3 visible faces labelled with t_{ijk} */
  const W = 180, H = 160;
  const cx = 90, cy = 72;
  const dx = 52, dy = 26, dz = 60;

  const top    = `${cx},${cy - dz} ${cx + dx},${cy - dz + dy} ${cx},${cy} ${cx - dx},${cy - dz + dy}`;
  const left   = `${cx - dx},${cy - dz + dy} ${cx},${cy} ${cx},${cy + dz} ${cx - dx},${cy + dy}`;
  const right  = `${cx},${cy} ${cx + dx},${cy - dz + dy} ${cx + dx},${cy + dy} ${cx},${cy + dz}`;

  return (
    <svg viewBox={`0 0 ${W} ${H + 12}`} className="w-full max-w-[180px] mx-auto block">
      <polygon points={top}   fill={`${TEAL}20`} stroke={TEAL}   strokeWidth="1.5" />
      <polygon points={left}  fill={`${TEAL}12`} stroke={TEAL}   strokeWidth="1.5" />
      <polygon points={right} fill={`${TEAL}18`} stroke={TEAL}   strokeWidth="1.5" />

      {/* depth guide lines */}
      <line x1={cx - dx} y1={cy + dy} x2={cx + dx} y2={cy + dy} stroke={`${TEAL}60`} strokeWidth="1" strokeDasharray="3 2" />

      {/* face labels */}
      <text x={cx - 2}      y={cy - dz + 18} textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill={TEAL}>t₁ⱼₖ</text>
      <text x={cx - dx + 14} y={cy + 12}     textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill={TEAL}>tᵢ₁ₖ</text>
      <text x={cx + dx - 14} y={cy + 12}     textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill={TEAL}>tᵢⱼ₁</text>

      {/* dimension arrows */}
      <text x="8"  y={cy + 8}       fontFamily="sans-serif" fontSize="8" fill={DIM}>i</text>
      <text x={cx - dx - 4} y={H - 8} fontFamily="sans-serif" fontSize="8" fill={DIM}>j</text>
      <text x={cx + dx + 4} y={H - 8} fontFamily="sans-serif" fontSize="8" fill={DIM}>k</text>

      <text x={cx} y={H + 8} textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill={DIM}>n × n × n cube</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 *  SECTION 2 — Stress Cube
 * ════════════════════════════════════════════════════════════════════════ */

function StressCubeDiagram() {
  const W = 420, H = 370;

  /* cube geometry — isometric projection */
  const cx = 210, cy = 170;
  const a = 90, b = 44, d = 100; // half-widths and depth

  /* 8 vertices */
  const V = {
    A: [cx - a, cy + b],           // front-left-bottom
    B: [cx + a, cy + b],           // front-right-bottom
    C: [cx + a, cy - b],           // front-right-top
    D: [cx - a, cy - b],           // front-left-top
    E: [cx - a + d, cy + b - d],   // back-right-bottom (iso-shift)
    F: [cx + a + d, cy + b - d],
    G: [cx + a + d, cy - b - d],
    H: [cx - a + d, cy - b - d],
  };

  const face = (pts: number[][], fill: string, stroke: string) =>
    <polygon
      points={pts.map(([x, y]) => `${x},${y}`).join(" ")}
      fill={fill}
      stroke={stroke}
      strokeWidth="1.6"
    />;

  /* stress component arrow helpers */
  function Arrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    const ux = dx / len, uy = dy / len;
    const hx = x2 - ux * 9, hy = y2 - uy * 9;
    const px = -uy * 4, py = ux * 4;
    return (
      <g>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.8" />
        <polygon
          points={`${x2},${y2} ${hx + px},${hy + py} ${hx - px},${hy - py}`}
          fill={color}
        />
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[420px] mx-auto block" role="img" aria-label="Stress tensor cube showing σ components">
      <defs>
        <filter id="glow-v">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── cube faces ─────────────────────────────────────────────── */}
      {face([V.A, V.B, V.C, V.D], `${INDIGO}22`, `${INDIGO}80`)}     {/* front */}
      {face([V.B, V.F, V.G, V.C], `${INDIGO}18`, `${INDIGO}70`)}     {/* right */}
      {face([V.D, V.C, V.G, V.H], `${INDIGO}28`, `${INDIGO}80`)}     {/* top */}

      {/* ── Normal stress arrows (outward) ─────────────────────────── */}
      {/* σ₁₁ — right face, x-direction */}
      <Arrow x1={V.B[0] + 30} y1={(V.B[1] + V.G[1]) / 2} x2={V.B[0] + 68} y2={(V.B[1] + V.G[1]) / 2 - 4} color={GOLD} />
      <text x={V.B[0] + 72} y={(V.B[1] + V.G[1]) / 2 + 2} fontFamily="serif" fontSize="13" fill={GOLD}>σ<tspan dy="4" fontSize="10">11</tspan></text>

      {/* σ₂₂ — bottom face, y-direction */}
      <Arrow x1={(V.A[0] + V.B[0]) / 2} y1={V.A[1] + 16} x2={(V.A[0] + V.B[0]) / 2} y2={V.A[1] + 52} color={GOLD} />
      <text x={(V.A[0] + V.B[0]) / 2 - 6} y={V.A[1] + 66} fontFamily="serif" fontSize="13" fill={GOLD}>σ<tspan dy="4" fontSize="10">22</tspan></text>

      {/* σ₃₃ — back, z-direction (dashed — hidden face) */}
      <line x1={V.H[0] - 12} y1={V.H[1] - 12} x2={V.H[0] - 38} y2={V.H[1] - 38} stroke={GOLD} strokeWidth="1.4" strokeDasharray="4 2" />
      <text x={V.H[0] - 50} y={V.H[1] - 42} fontFamily="serif" fontSize="13" fill={GOLD}>σ<tspan dy="4" fontSize="10">33</tspan></text>

      {/* ── Shear stress arrows ─────────────────────────────────────── */}
      {/* σ₁₂ — front face, vertical on right edge */}
      <Arrow x1={V.C[0] + 12} y1={V.C[1] + 22} x2={V.C[0] + 12} y2={V.C[1] + 56} color={ROSE} />
      <text x={V.C[0] + 16} y={V.C[1] + 72} fontFamily="serif" fontSize="13" fill={ROSE}>σ<tspan dy="4" fontSize="10">12</tspan></text>

      {/* σ₂₁ — front face, horizontal on top edge */}
      <Arrow x1={V.D[0] + 30} y1={V.D[1] - 12} x2={V.D[0] + 72} y2={V.D[1] - 12} color={ROSE} />
      <text x={V.D[0] + 76} y={V.D[1] - 8} fontFamily="serif" fontSize="13" fill={ROSE}>σ<tspan dy="4" fontSize="10">21</tspan></text>

      {/* σ₁₃ — right face, z-shear */}
      <Arrow x1={V.G[0] - 12} y1={V.G[1] + 20} x2={V.G[0] - 32} y2={V.G[1] + 42} color={TEAL} />
      <text x={V.G[0] - 42} y={V.G[1] + 54} fontFamily="serif" fontSize="13" fill={TEAL}>σ<tspan dy="4" fontSize="10">13</tspan></text>

      {/* ── Traction vectors T^(e1) T^(e2) T^(e3) ─────────────────── */}
      {/* T^(e1) — on right face */}
      <Arrow x1={V.F[0] - 20} y1={V.F[1] + 30} x2={V.F[0] + 20} y2={V.F[1] + 12} color={VIOLET} />
      <text x={V.F[0] + 22} y={V.F[1] + 16} fontFamily="serif" fontSize="12" fill={VIOLET} filter="url(#glow-v)">
        T<tspan dy="-5" fontSize="9">(e1)</tspan>
      </text>

      {/* T^(e2) — on top face */}
      <Arrow x1={(V.D[0] + V.H[0]) / 2} y1={(V.D[1] + V.H[1]) / 2 - 8} x2={(V.D[0] + V.H[0]) / 2 - 10} y2={(V.D[1] + V.H[1]) / 2 - 38} color={VIOLET} />
      <text x={(V.D[0] + V.H[0]) / 2 - 16} y={(V.D[1] + V.H[1]) / 2 - 42} fontFamily="serif" fontSize="12" fill={VIOLET} filter="url(#glow-v)">
        T<tspan dy="-5" fontSize="9">(e2)</tspan>
      </text>

      {/* T^(e3) — on front face */}
      <Arrow x1={(V.A[0] + V.D[0]) / 2 - 18} y1={(V.A[1] + V.D[1]) / 2} x2={(V.A[0] + V.D[0]) / 2 - 52} y2={(V.A[1] + V.D[1]) / 2 + 8} color={VIOLET} />
      <text x={(V.A[0] + V.D[0]) / 2 - 66} y={(V.A[1] + V.D[1]) / 2 + 12} fontFamily="serif" fontSize="12" fill={VIOLET} filter="url(#glow-v)">
        T<tspan dy="-5" fontSize="9">(e3)</tspan>
      </text>

      {/* ── Axis labels ─────────────────────────────────────────────── */}
      {/* e₁ axis → right */}
      <Arrow x1={cx - 30} y1={H - 30} x2={cx + 24} y2={H - 30} color={DIM} />
      <text x={cx + 28} y={H - 26} fontFamily="serif" fontSize="11" fill={DIM}>e₁</text>
      {/* e₂ axis ↑ */}
      <Arrow x1={cx - 30} y1={H - 30} x2={cx - 30} y2={H - 66} color={DIM} />
      <text x={cx - 26} y={H - 70} fontFamily="serif" fontSize="11" fill={DIM}>e₂</text>
      {/* e₃ axis ↗ (depth) */}
      <Arrow x1={cx - 30} y1={H - 30} x2={cx - 30 + 28} y2={H - 30 - 20} color={DIM} />
      <text x={cx + 4} y={H - 52} fontFamily="serif" fontSize="11" fill={DIM}>e₃</text>

      {/* ── Legend ──────────────────────────────────────────────────── */}
      <rect x="6" y="6" width="116" height="72" rx="6" fill={PANEL2} stroke={BORDER} strokeWidth="1" />
      <circle cx="18" cy="22" r="4" fill={GOLD} />
      <text x="26" y="26" fontFamily="sans-serif" fontSize="10" fill={GOLD}>σᵢᵢ  Normal stress</text>
      <circle cx="18" cy="38" r="4" fill={ROSE} />
      <text x="26" y="42" fontFamily="sans-serif" fontSize="10" fill={ROSE}>σᵢⱼ  Shear stress</text>
      <circle cx="18" cy="54" r="4" fill={VIOLET} />
      <text x="26" y="58" fontFamily="sans-serif" fontSize="10" fill={VIOLET}>T⁽ᵉⁱ⁾ Traction vector</text>
      <text x="18" y="72" fontFamily="sans-serif" fontSize="9" fill={MUTED}>i ≠ j for shear</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 *  SECTION 3 — Notation diagrams
 * ════════════════════════════════════════════════════════════════════════ */

function ProductRuleDiagram() {
  return (
    <svg viewBox="0 0 340 110" className="w-full max-w-[340px] mx-auto block my-2">
      {/* LHS */}
      <text x="10" y="52" fontFamily="serif" fontSize="16" fill={LAVENDER}>d</text>
      <line x1="10" y1="56" x2="38" y2="56" stroke={LAVENDER} strokeWidth="1.4" />
      <text x="12" y="72" fontFamily="serif" fontSize="16" fill={LAVENDER}>dx</text>
      <text x="42" y="58" fontFamily="serif" fontSize="16" fill={TEXT}>(f · g)</text>

      <text x="104" y="58" fontFamily="sans-serif" fontSize="15" fill={DIM}>=</text>

      {/* first term — f' */}
      <text x="122" y="42" fontFamily="serif" fontSize="16" fill={TEAL}>df</text>
      <line x1="122" y1="46" x2="142" y2="46" stroke={TEAL} strokeWidth="1.4" />
      <text x="122" y="62" fontFamily="serif" fontSize="16" fill={TEAL}>dx</text>
      <text x="146" y="58" fontFamily="serif" fontSize="16" fill={TEXT}>· g</text>

      <text x="180" y="58" fontFamily="sans-serif" fontSize="14" fill={DIM}>+</text>

      {/* second term — g' */}
      <text x="196" y="42" fontFamily="serif" fontSize="16" fill={ROSE}>dg</text>
      <line x1="196" y1="46" x2="216" y2="46" stroke={ROSE} strokeWidth="1.4" />
      <text x="196" y="62" fontFamily="serif" fontSize="16" fill={ROSE}>dx</text>
      <text x="220" y="58" fontFamily="serif" fontSize="16" fill={TEXT}>· f</text>

      {/* bracket annotations */}
      <text x="122" y="90" fontFamily="sans-serif" fontSize="9" fill={TEAL}>derivative of f</text>
      <text x="196" y="90" fontFamily="sans-serif" fontSize="9" fill={ROSE}>derivative of g</text>

      {/* Leibniz extended */}
      <text x="10" y="105" fontFamily="sans-serif" fontSize="9" fill={MUTED}>Leibniz rule — extends to tensor fields: ∇(T⊗S) = (∇T)⊗S + T⊗(∇S)</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 *  RANK TABLE
 * ════════════════════════════════════════════════════════════════════════ */
const RANK_ROWS = [
  { rank: 0, name: "Scalar",       nameKh: "ស្កាឡ",      shape: "— (single number)",  example: "Temperature T",       exKh: "សីតុណ្ហភាព T",       color: GOLD },
  { rank: 1, name: "Vector",       nameKh: "វ៉ិចទ័រ",    shape: "n",                  example: "Force Fᵢ, velocity uᵢ", exKh: "កម្លាំង Fᵢ,ល្បឿន uᵢ", color: VIOLET },
  { rank: 2, name: "Matrix",       nameKh: "ម៉ាទ្រីស",   shape: "n × n",              example: "Stress σᵢⱼ",           exKh: "ស្ត្រេស σᵢⱼ",          color: INDIGO },
  { rank: 3, name: "3-Tensor",     nameKh: "តង់ស័រ-3",   shape: "n × n × n",          example: "Piezoelectric dᵢⱼₖ",   exKh: "ភីហ្សូឡិចទ្រីក dᵢⱼₖ", color: TEAL },
  { rank: 4, name: "4-Tensor",     nameKh: "តង់ស័រ-4",   shape: "n × n × n × n",      example: "Elasticity Cᵢⱼₖₗ",     exKh: "ស្ថេរភាព Cᵢⱼₖₗ",       color: ROSE },
];

/* ══════════════════════════════════════════════════════════════════════════
 *  MAIN PAGE
 * ════════════════════════════════════════════════════════════════════════ */

export default function TensorsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = (en: string, kh: string) => isKh ? kh : en;

  return (
    <div className="min-h-screen relative" style={{ background: BG, color: TEXT }}>

      {/* ── Grid background ──────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tensor-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke={VIOLET} strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tensor-grid)" />
        </svg>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 55%)"
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">

        {/* Back link */}
        <Link
          href="/mathematics"
          className="inline-flex items-center gap-2 text-sm font-mono mb-10 hover:opacity-80 transition-opacity"
          style={{ color: LAVENDER, textShadow: glow(VIOLET, 4) }}
          data-testid="link-back-mathematics"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Mathematics", "ត្រឡប់ទៅគណិតវិទ្យា")}
        </Link>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <header className="mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-5"
            style={{ border: `1px solid ${VIOLET}`, color: VIOLET, boxShadow: glow(VIOLET, 4) }}
          >
            <Sigma className="w-3.5 h-3.5" />
            {t("Advanced Mathematics", "គណិតវិទ្យាកម្រិតខ្ពស់")}
          </div>

          <h1
            className={`font-display font-black leading-tight mb-4 ${isKh ? "font-khmer text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"}`}
            style={{ color: TEXT, textShadow: glow(VIOLET, 6) }}
          >
            {t("Introduction to Tensors", "សេចក្ដីណែនាំអំពីតង់ស័រ")}
          </h1>

          <p
            className={`max-w-2xl text-base leading-relaxed ${isKh ? "font-khmer" : ""}`}
            style={{ color: DIM }}
          >
            {t(
              "Tensors generalise scalars, vectors, and matrices into a unified language. They power General Relativity, fluid mechanics, machine learning, and quantum field theory — anywhere a physical or mathematical quantity must transform consistently under a change of coordinates.",
              "តង់ស័រធ្វើឱ្យស្កាឡ វ៉ិចទ័រ និងម៉ាទ្រីសក្លាយជាភាសាតែមួយ។ វាជំរុញទ្រឹស្ដីសម្ព័ន្ធទូទៅ មេកានិចទឹក ការរៀនម៉ាស៊ីន និងទ្រឹស្ដីវាលគ្វ៉ុន — គ្រប់ទីកន្លែងដែលបរិមាណរូបវន្តត្រូវតែប្ដូររូបមន្ដឱ្យស្រប។"
            )}
          </p>
        </header>

        {/* ════════════════════════════════════════════════════════════
         *  SECTION 1 — WHAT IS A TENSOR?
         * ══════════════════════════════════════════════════════════ */}
        <section className="mb-16" aria-labelledby="sec1-heading">
          <SectionHeader
            icon={Layers} num="01"
            en="What is a Tensor?"
            kh="តង់ស័រជាអ្វី?"
            accent={VIOLET} isKh={isKh}
          />
          <div id="sec1-heading" className="sr-only">{t("What is a Tensor?","តង់ស័រជាអ្វី?")}</div>

          <p className={`mb-6 leading-relaxed ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
            {t(
              "A tensor is a multi-dimensional array of numbers that obeys specific transformation rules when you change the coordinate system. Rank (order) tells you how many indices are needed to specify a single component.",
              "តង់ស័រគឺជាអារ៉េចំនួនច្រើនវិមាត្រ ដែលគោរពតាមក្បួនបំប្លែងជាក់លាក់ពេលប្ដូរប្រព័ន្ធកូអរដោណេ។ ឋានៈ (លំដាប់) ប្រាប់ថាត្រូវការឈ្នាប់ប៉ុន្មានដើម្បីបញ្ជាក់ធាតុតែមួយ។"
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Vector card */}
            <article
              className="rounded-2xl overflow-hidden"
              style={{ background: PANEL, border: `1px solid ${VIOLET}40` }}
            >
              <div className="px-5 pt-4 pb-2 flex items-center gap-2"
                style={{ borderBottom: `1px solid ${VIOLET}25` }}>
                <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                  style={{ background: `${VIOLET}25`, color: VIOLET }}>1</div>
                <h3 className="font-bold text-base" style={{ color: TEXT }}>
                  {t("Vector", "វ៉ិចទ័រ")}
                </h3>
                <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded"
                  style={{ background: `${VIOLET}20`, color: LAVENDER }}>Rank 1</span>
              </div>
              <div className="px-5 pt-4 pb-3">
                <p className={`text-sm mb-4 ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
                  {t(
                    "A ordered list of numbers — one index needed. A 1-D array with magnitude and direction.",
                    "បញ្ជីចំនួនដែលមានលំដាប់ — ត្រូវការឈ្នាប់មួយ។ អារ៉េ 1-D ដែលមានទំហំ និងទិសដៅ។"
                  )}
                </p>
                <VectorDiagram />
                <div className="mt-3 text-center font-mono text-xs" style={{ color: LAVENDER }}>
                  v<Sub>i</Sub> = [v₁, v₂, v₃, v₄]
                </div>
              </div>
            </article>

            {/* Matrix card */}
            <article
              className="rounded-2xl overflow-hidden"
              style={{ background: PANEL, border: `1px solid ${INDIGO}40` }}
            >
              <div className="px-5 pt-4 pb-2 flex items-center gap-2"
                style={{ borderBottom: `1px solid ${INDIGO}25` }}>
                <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                  style={{ background: `${INDIGO}25`, color: INDIGO }}>2</div>
                <h3 className="font-bold text-base" style={{ color: TEXT }}>
                  {t("Matrix", "ម៉ាទ្រីស")}
                </h3>
                <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded"
                  style={{ background: `${INDIGO}20`, color: LAVENDER }}>Rank 2</span>
              </div>
              <div className="px-5 pt-4 pb-3">
                <p className={`text-sm mb-4 ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
                  {t(
                    "A rectangular grid of numbers — two indices (row i, column j). Linear transformations live here.",
                    "ក្រឡាចំនួនជាបន្ទាត់ — ឈ្នាប់ពីរ (ជួរ i, ជួរឈរ j)។ ការបំប្លែងលីនេអ៊ែររស់នៅទីនេះ។"
                  )}
                </p>
                <MatrixDiagram />
                <div className="mt-3 text-center font-mono text-xs" style={{ color: LAVENDER }}>
                  M<Sub>ij</Sub> = m<Sub>ij</Sub>
                </div>
              </div>
            </article>

            {/* 3-Tensor card */}
            <article
              className="rounded-2xl overflow-hidden"
              style={{ background: PANEL, border: `1px solid ${TEAL}40` }}
            >
              <div className="px-5 pt-4 pb-2 flex items-center gap-2"
                style={{ borderBottom: `1px solid ${TEAL}25` }}>
                <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                  style={{ background: `${TEAL}25`, color: TEAL }}>3</div>
                <h3 className="font-bold text-base" style={{ color: TEXT }}>
                  {t("3-Tensor", "តង់ស័រ-3")}
                </h3>
                <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded"
                  style={{ background: `${TEAL}20`, color: TEAL }}>Rank 3</span>
              </div>
              <div className="px-5 pt-4 pb-3">
                <p className={`text-sm mb-4 ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
                  {t(
                    "A cube of numbers — three indices (i, j, k). A stack of matrices, one for each depth slice.",
                    "គូបចំនួន — ឈ្នាប់បី (i, j, k)។ ជង់ម៉ាទ្រីស មួយសម្រាប់ប្រឡោះជម្រៅនីមួយៗ។"
                  )}
                </p>
                <TensorCubeDiagram />
                <div className="mt-3 text-center font-mono text-xs" style={{ color: TEAL }}>
                  T<Sub>ijk</Sub> = t<Sub>ijk</Sub>
                </div>
              </div>
            </article>
          </div>

          {/* Quick definition box */}
          <div className="mt-6 rounded-xl p-5" style={{ background: PANEL, border: `1px solid ${VIOLET}30` }}>
            <p className={`text-sm leading-relaxed ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
              <span className="font-semibold" style={{ color: LAVENDER }}>
                {t("Formal definition:", "និយមន័យផ្លូវការ:")}
              </span>
              {" "}
              {t(
                "A tensor of rank (p, q) is a multilinear map that takes p covectors and q vectors as input and produces a scalar — or equivalently, an object with p upper (contravariant) and q lower (covariant) indices that transform as T′ᵢⱼ = ΛᵢₖΛʲₗ Tₖₗ under a change of basis Λ.",
                "តង់ស័រឋានៈ (p, q) គឺជាប្រតិបត្តិការ multilinear ដែលទទួល covector p និង vector q ហើយផ្ដល់ scalar — ឬដោយស្មើ, វត្ថុដែលមានឈ្នាប់ p ខាងលើ (contravariant) និង q ខាងក្រោម (covariant) ដែលបំប្លែងជា T′ᵢⱼ = ΛᵢₖΛʲₗ Tₖₗ នៅពេលប្ដូរមូលដ្ឋាន Λ។"
              )}
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
         *  SECTION 2 — VISUALIZING TENSORS: STRESS CUBE
         * ══════════════════════════════════════════════════════════ */}
        <section className="mb-16" aria-labelledby="sec2-heading">
          <SectionHeader
            icon={Grid} num="02"
            en="Visualizing Tensors — The Stress Cube"
            kh="ការមើលឃើញតង់ស័រ — គូបស្ត្រេស"
            accent={INDIGO} isKh={isKh}
          />
          <div id="sec2-heading" className="sr-only">{t("Visualizing Tensors","ការមើលឃើញតង់ស័រ")}</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Diagram */}
            <div className="rounded-2xl p-4 sm:p-6" style={{ background: PANEL, border: `1px solid ${INDIGO}35` }}>
              <StressCubeDiagram />
            </div>

            {/* Annotations */}
            <div className="space-y-4">
              <p className={`text-sm leading-relaxed ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
                {t(
                  "The Cauchy stress tensor σᵢⱼ is the canonical rank-2 tensor example in mechanics. At every point inside a body, nine numbers describe how internal forces act across three perpendicular planes.",
                  "តង់ស័រស្ត្រេស Cauchy σᵢⱼ គឺជាឧទាហរណ៍តង់ស័រឋានៈ-2 ស្ដង់ដារក្នុងមេកានិច។ នៅគ្រប់ចំណុចក្នុងខ្លួនរឹង ចំនួន 9 ពណ៌នាអំពីកម្លាំងផ្ទៃក្នុងតាមបន្ទាក់ 3 ជ្រុងស្ថិតឆ្លងគ្នា។"
                )}
              </p>

              {/* Component legend */}
              <div className="space-y-3">
                {[
                  {
                    label: "σ₁₁, σ₂₂, σ₃₃",
                    color: GOLD,
                    en: "Normal stresses — act perpendicular to the face (tension +, compression −). The diagonal of the 3 × 3 stress matrix.",
                    kh: "ស្ត្រេសធម្មតា — ដំណើរការ perpendicular ចំពោះមុខ (ទាញ +, ច + −)។ អ័ក្សខ្ទេចនៃម៉ាទ្រីស 3×3។",
                  },
                  {
                    label: "σ₁₂, σ₂₁, σ₁₃ …",
                    color: ROSE,
                    en: "Shear stresses — act parallel to the face. σᵢⱼ means acting on the i-face in the j-direction. Symmetry: σᵢⱼ = σⱼᵢ (6 independent values).",
                    kh: "ស្ត្រេសសើរ — ដំណើរការ parallel ចំពោះមុខ។ σᵢⱼ មានន័យថាដំណើរការលើ i-face ក្នុងទិស j។ ស៊ីមេទ្រី: σᵢⱼ = σⱼᵢ (តម្លៃឯករាជ្យ 6)។",
                  },
                  {
                    label: "T⁽ᵉ¹⁾, T⁽ᵉ²⁾, T⁽ᵉ³⁾",
                    color: VIOLET,
                    en: "Traction vectors — the resultant force per unit area on each face. They are obtained from the tensor by contraction: Tⱼ⁽ᵉⁱ⁾ = σᵢⱼ (Cauchy's relation).",
                    kh: "វ៉ិចទ័រទ្រា — កម្លាំងប្រព័ន្ធក្នុងក្រឡារង្វាស់នីមួយៗ។ ទទួលពីតង់ស័រដោយការ contraction: Tⱼ⁽ᵉⁱ⁾ = σᵢⱼ (ទំនាក់ Cauchy)។",
                  },
                ].map(({ label, color, en, kh }) => (
                  <div key={label} className="rounded-xl p-4" style={{ background: PANEL2, border: `1px solid ${color}30` }}>
                    <div className="font-mono font-bold text-sm mb-1.5" style={{ color }}>{label}</div>
                    <p className={`text-xs leading-relaxed ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
                      {isKh ? kh : en}
                    </p>
                  </div>
                ))}
              </div>

              {/* The stress tensor written out */}
              <div className="rounded-xl p-4 overflow-x-auto" style={{ background: PANEL2, border: `1px solid ${BORDER}` }}>
                <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: MUTED }}>
                  {t("The full 3×3 stress tensor", "តង់ស័រស្ត្រេស 3×3 ពេញ")}
                </p>
                <pre className="font-mono text-xs leading-relaxed" style={{ color: LAVENDER }}>
{`      ⎡ σ₁₁  σ₁₂  σ₁₃ ⎤
σᵢⱼ = ⎢ σ₂₁  σ₂₂  σ₂₃ ⎥
      ⎣ σ₃₁  σ₃₂  σ₃₃ ⎦`}
                </pre>
                <p className={`mt-2 text-[11px] ${isKh ? "font-khmer" : ""}`} style={{ color: MUTED }}>
                  {t("Symmetric: σᵢⱼ = σⱼᵢ (angular momentum conservation)", "ស៊ីមេទ្រី: σᵢⱼ = σⱼᵢ (ការអភិរក្សដ្ដេគ)")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
         *  SECTION 3 — NOTATION & CONCEPTS
         * ══════════════════════════════════════════════════════════ */}
        <section className="mb-16" aria-labelledby="sec3-heading">
          <SectionHeader
            icon={BookOpen} num="03"
            en="Tensor Notation & Key Concepts"
            kh="ký hiệu ត្ ន់ស័រ & គំនិតសំខាន់"
            accent={TEAL} isKh={isKh}
          />
          <div id="sec3-heading" className="sr-only">{t("Tensor Notation & Key Concepts","ký hiệu ត្ ន់ស័រ & គំនិតសំខាន់")}</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Product Rule ──────────────────────────────────── */}
            <div className="rounded-2xl p-5" style={{ background: PANEL, border: `1px solid ${TEAL}30` }}>
              <h3 className={`font-bold text-sm mb-1 ${isKh ? "font-khmer" : ""}`} style={{ color: TEAL }}>
                {t("Product (Leibniz) Rule", "ច្បាប់ Leibniz (ផ្លែ)")}
              </h3>
              <p className={`text-xs mb-3 ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
                {t(
                  "Differentiation distributes over products — and extends naturally to tensor fields and covariant derivatives.",
                  "ភាពខុសគ្នា ចែករំលែកលើផ្លែ — ហើយបន្ថែមទៅ tensor fields និង covariant derivatives ដោយធម្មជាតិ។"
                )}
              </p>
              <ProductRuleDiagram />
              <MathBlock>
                ∇<Sub>k</Sub>(T<Sub>ij</Sub> S<Sup>kl</Sup>) = (∇<Sub>k</Sub>T<Sub>ij</Sub>)S<Sup>kl</Sup> + T<Sub>ij</Sub>(∇<Sub>k</Sub>S<Sup>kl</Sup>)
              </MathBlock>
              <p className={`text-[11px] ${isKh ? "font-khmer" : ""}`} style={{ color: MUTED }}>
                {t("Covariant derivative of a tensor product obeys Leibniz exactly.",
                   "ដេរីវេ covariant នៃ tensor product គោរព Leibniz ដោយពិតប្រាកដ។")}
              </p>
            </div>

            {/* ── Commutator ────────────────────────────────────── */}
            <div className="rounded-2xl p-5" style={{ background: PANEL, border: `1px solid ${ROSE}30` }}>
              <h3 className={`font-bold text-sm mb-1 ${isKh ? "font-khmer" : ""}`} style={{ color: ROSE }}>
                {t("Commutator Relation", "ទំនាក់ Commutator")}
              </h3>
              <p className={`text-xs mb-3 ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
                {t(
                  "The commutator measures how much two operations fail to commute. Critical in quantum mechanics and Lie algebras.",
                  "Commutator វាស់ល្ហៀបប្រតិបត្តិការពីរបរាជ័យ commute ប្រើណ មានសារៈសំខាន់ក្នុងមេកានិចគ្វ៉ុន និង algebras Lie។"
                )}
              </p>
              <MathBlock>[ x, y ] = xy − yx</MathBlock>
              <div className="space-y-2 mt-3">
                {[
                  {
                    formula: "[x̂, p̂] = iℏ",
                    en: "Position & momentum operators — the foundation of the Heisenberg uncertainty principle.",
                    kh: "ប្រតិបត្តិការទីតាំង & ម៉ូម៉ង់ — មូលដ្ឋាននៃគោលការណ៍ Heisenberg។",
                  },
                  {
                    formula: "[Lᵢ, Lⱼ] = iℏ εᵢⱼₖ Lₖ",
                    en: "Angular momentum commutator — εᵢⱼₖ is the Levi-Civita rank-3 tensor.",
                    kh: "Commutator ដ្ដេ — εᵢⱼₖ ជាតង់ស័រ Levi-Civita ឋានៈ-3។",
                  },
                ].map(({ formula, en, kh }) => (
                  <div key={formula} className="rounded-lg px-4 py-3" style={{ background: PANEL2, border: `1px solid ${ROSE}20` }}>
                    <div className="font-mono text-sm mb-1" style={{ color: LAVENDER }}>{formula}</div>
                    <p className={`text-[11px] ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>{isKh ? kh : en}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Tensor Product ────────────────────────────────── */}
            <div className="rounded-2xl p-5" style={{ background: PANEL, border: `1px solid ${VIOLET}30` }}>
              <h3 className={`font-bold text-sm mb-1 ${isKh ? "font-khmer" : ""}`} style={{ color: VIOLET }}>
                {t("Tensor Product  ⊗", "ផ្លែតង់ស័រ  ⊗")}
              </h3>
              <p className={`text-xs mb-3 ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
                {t(
                  "The tensor product ⊗ combines two tensors into a higher-rank tensor — every combination of components.",
                  "ផ្លែ ⊗ រួមបញ្ចូលតង់ស័រពីរទៅជាតង់ស័រឋានៈខ្ពស់ — ការរួមបញ្ចូលគ្រប់ធាតុ។"
                )}
              </p>
              <MathBlock>
                (u ⊗ v)<Sub>ij</Sub> = u<Sub>i</Sub> v<Sub>j</Sub>
              </MathBlock>
              <div className="space-y-2">
                {[
                  {
                    formula: "rank(A ⊗ B) = rank(A) + rank(B)",
                    en: "Ranks add: vector ⊗ vector = rank-2 tensor (a matrix).",
                    kh: "ឋានៈបូករួម: vector ⊗ vector = តង់ស័រឋានៈ-2 (ម៉ាទ្រីស)។",
                  },
                  {
                    formula: "ℝ³ ⊗ ℝ³ ≅ Mat₃(ℝ)",
                    en: "The tensor product of two 3-D vector spaces is the space of 3×3 matrices.",
                    kh: "ផ្លែតង់ស័រ spaces vector 3-D ពីរ = space ម៉ាទ្រីស 3×3។",
                  },
                  {
                    formula: "A ⊗ B ≠ B ⊗ A  (in general)",
                    en: "Non-commutative in general — order matters for the index layout.",
                    kh: "Non-commutative ជាទូទៅ — លំដាប់ចំណាំសំខាន់ចំពោះការរៀបចំ index។",
                  },
                ].map(({ formula, en, kh }) => (
                  <div key={formula} className="rounded-lg px-4 py-3" style={{ background: PANEL2, border: `1px solid ${VIOLET}20` }}>
                    <div className="font-mono text-sm mb-1" style={{ color: LAVENDER }}>{formula}</div>
                    <p className={`text-[11px] ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>{isKh ? kh : en}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── K-Theory / Grothendieck ───────────────────────── */}
            <div className="rounded-2xl p-5" style={{ background: PANEL, border: `1px solid ${GOLD}30` }}>
              <h3 className={`font-bold text-sm mb-1 ${isKh ? "font-khmer" : ""}`} style={{ color: GOLD }}>
                {t("Algebraic K-Theory & K*(F)", "ទ្រឹស្ដី K-Theory & K*(F)")}
              </h3>
              <p className={`text-xs mb-3 ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
                {t(
                  "Algebraic K-theory measures how far a ring deviates from having unique factorisation — using tensor products to build its graded ring structure.",
                  "K-theory algebraic វាស់ល្ហៀង ring ចេញពីការ factorisation តែមួយ — ប្រើ tensor products ដើម្បីបង្កើតរចនាសម្ព័ន្ធ graded ring។"
                )}
              </p>
              <MathBlock>K<Sub>*</Sub>(F) = ⊕<Sub>n≥0</Sub> K<Sub>n</Sub>(F)</MathBlock>
              <div className="space-y-2">
                {[
                  {
                    formula: "K₀(F) ≅ ℤ",
                    en: "The Grothendieck group of projective modules — counts 'sizes' of vector bundles.",
                    kh: "ក្រុម Grothendieck នៃ projective modules — រាប់ 'ទំហំ' vector bundles។",
                  },
                  {
                    formula: "K*(F) ring structure via ⊗",
                    en: "Tensor product of modules gives K*(F) its multiplication — turning it into a graded ring.",
                    kh: "ផ្លែ tensor នៃ modules ផ្ដល់ K*(F) ការគុណ — ប្ដូរវាទៅ graded ring។",
                  },
                  {
                    formula: "Milnor K: KₙM(F) = F*/F*⊗ⁿ",
                    en: "Milnor K-theory — built purely from the multiplicative group F* via iterated tensor products.",
                    kh: "K-theory Milnor — បង្កើតពី F* តែប៉ុណ្ណោះ តាម iterated tensor products។",
                  },
                ].map(({ formula, en, kh }) => (
                  <div key={formula} className="rounded-lg px-4 py-3" style={{ background: PANEL2, border: `1px solid ${GOLD}20` }}>
                    <div className="font-mono text-sm mb-1" style={{ color: GOLD }}>{formula}</div>
                    <p className={`text-[11px] ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>{isKh ? kh : en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
         *  RANK TABLE
         * ══════════════════════════════════════════════════════════ */}
        <section className="mb-14" aria-labelledby="rank-table-heading">
          <div className="flex items-center gap-3 mb-5">
            <Zap className="w-5 h-5" style={{ color: VIOLET }} />
            <h2
              id="rank-table-heading"
              className={`font-bold text-lg ${isKh ? "font-khmer" : ""}`}
              style={{ color: TEXT }}
            >
              {t("Tensor Rank Quick Reference", "ការយោងរហ័ស ឋានៈតង់ស័រ")}
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: PANEL2 }}>
                  {[
                    t("Rank","ឋានៈ"),
                    t("Name","ឈ្មោះ"),
                    t("Shape","ទំរង់"),
                    t("Physical Example","ឧទាហរណ៍រូបវន្ត"),
                  ].map(h => (
                    <th key={h} className={`text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest ${isKh ? "font-khmer text-xs normal-case tracking-normal" : ""}`}
                      style={{ color: DIM, borderBottom: `1px solid ${BORDER}` }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RANK_ROWS.map((row, idx) => (
                  <tr key={row.rank}
                    style={{ background: idx % 2 === 0 ? PANEL : PANEL2, borderBottom: `1px solid ${BORDER}` }}>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold font-mono"
                        style={{ background: `${row.color}22`, color: row.color }}>
                        {row.rank}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-semibold ${isKh ? "font-khmer" : ""}`} style={{ color: row.color }}>
                      {isKh ? row.nameKh : row.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: DIM }}>
                      {row.shape}
                    </td>
                    <td className={`px-4 py-3 text-xs ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
                      {isKh ? row.exKh : row.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Index Notation primer ─────────────────────────────── */}
        <section className="mb-14">
          <div className="rounded-2xl p-6" style={{ background: PANEL, border: `1px solid ${INDIGO}30` }}>
            <h3 className={`font-bold text-base mb-4 ${isKh ? "font-khmer" : ""}`} style={{ color: LAVENDER }}>
              {t("Einstein Summation Convention", "ច្បាប់សរ Einstein")}
            </h3>
            <p className={`text-sm mb-4 leading-relaxed ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>
              {t(
                "When an index appears twice in a single term — once up, once down — it is summed over all values. This is the most compact notation in all of mathematical physics.",
                "ពេល index លេចឡើងពីរដង ក្នុង term តែមួយ — ម្ដងខាងលើ ម្ដងខាងក្រោម — វាត្រូវបូកគ្រប់តម្លៃ។ នេះជាký hiệu ខ្លីបំផុតក្នុងរូបវិទ្យាគណិតសាស្ត្រ។"
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { formula: "y = Aᵢʲ xⱼ", en: "Matrix-vector product (sum over j)", kh: "ផ្លែម៉ាទ្រីស-vector (បូក j)" },
                { formula: "tr(A) = Aⁱᵢ",  en: "Trace = sum of diagonal elements", kh: "Trace = បូក diagonal" },
                { formula: "δᵢⱼ",           en: "Kronecker delta: 1 if i=j, else 0", kh: "delta Kronecker: 1  បើ i=j, បើមិន 0" },
                { formula: "εᵢⱼₖ",          en: "Levi-Civita: +1 even, −1 odd permutation", kh: "Levi-Civita: +1 even, −1 odd" },
              ].map(({ formula, en, kh }) => (
                <div key={formula} className="rounded-lg px-4 py-3" style={{ background: PANEL2, border: `1px solid ${INDIGO}20` }}>
                  <div className="font-mono text-sm mb-1" style={{ color: LAVENDER }}>{formula}</div>
                  <p className={`text-[11px] ${isKh ? "font-khmer" : ""}`} style={{ color: DIM }}>{isKh ? kh : en}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer nav ────────────────────────────────────────── */}
        <footer className="pt-6 flex justify-between items-center" style={{ borderTop: `1px solid ${BORDER}` }}>
          <Link
            href="/mathematics/advanced"
            className={`inline-flex items-center gap-2 text-sm hover:opacity-80 transition-opacity ${isKh ? "font-khmer" : ""}`}
            style={{ color: DIM }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Calculus III & Linear Algebra", "Calculus III និងពីជគណិតលីនេអ៊ែរ")}
          </Link>
          <span className="text-[10px] font-mono" style={{ color: MUTED }}>
            Mathematics · Tensors
          </span>
        </footer>

      </div>
    </div>
  );
}
