import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Rocket,
  MoveRight,
  Gauge,
  Compass,
  TrendingUp,
  TrendingDown,
  Minus,
  Bike,
  Sliders,
  Sigma,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Shared blueprint surface (matches PhysicsHubPage aesthetic) ───────────
const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  backgroundImage:
    "linear-gradient(rgba(14, 116, 144, 0.07) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.07) 1px, transparent 1px), " +
    "linear-gradient(rgba(14, 116, 144, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};
const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-slate-300/70" : "border-cyan-400/60";
  const size = subtle ? "w-3 h-3" : "w-4 h-4";
  return (
    <>
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 left-2 ${size} border-t-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 right-2 ${size} border-t-2 border-r-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 ${size} border-b-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 ${size} border-b-2 border-r-2 ${stroke}`} />
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────
export function PhysicsMotionPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/physics"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
        </Link>

        {/* ── Header ────────────────────────────────────────────── */}
        <header
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 sm:px-10 py-8 sm:py-10 mb-8 shadow-lg"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56, 189, 248, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(56, 189, 248, 0.10) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/60 text-cyan-300 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Physics Hub", "មជ្ឈមណ្ឌលរូបវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span className="text-cyan-200">M-01</span>
              </div>
              <h1
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t("Module 1: Motion & Kinematics", "ម៉ូឌុលទី១៖ ចលនា និងគីនេម៉ាទិច")}
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {t(
                  "Learn how and why things move through space and time — from a moto on the highway to a dropped mango.",
                  "រៀនពីរបៀប និងហេតុដែលវត្ថុមានចលនាឆ្លងកាត់លំហ និងពេលវេលា — ពីម៉ូតូលើផ្លូវធំ រហូតដល់ស្វាយធ្លាក់ពីដើម។",
                )}
              </p>
            </div>
          </div>
        </header>

        {/* ── 1. The Big Three definitions ─────────────────────── */}
        <SectionTitle
          en="The 'Big Three' definitions"
          kh="និយមន័យសំខាន់ៗទាំងបី"
          numberLabel="01"
          icon={Sigma}
        />
        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 mb-10">
          <ComparisonCard
            kh={kh}
            t={t}
            titleEn="Distance vs. Displacement"
            titleKh="ចម្ងាយ និងការផ្លាស់ទី"
            leftLabelEn="Distance"
            leftLabelKh="ចម្ងាយ"
            leftDescEn="The total ground covered along the path you actually took."
            leftDescKh="ដីសរុបដែលអ្នកធ្វើដំណើរកាត់តាមផ្លូវដែលអ្នកបានទៅ។"
            rightLabelEn="Displacement"
            rightLabelKh="ការផ្លាស់ទី"
            rightDescEn="The straight-line distance from your starting point to your finish."
            rightDescKh="ចម្ងាយជាបន្ទាត់ត្រង់ ពីចំណុចចាប់ផ្តើមទៅចំណុចបញ្ចប់។"
            tipEn="Walk 100 m around a 50 m running track, end where you began: distance = 100 m, displacement = 0."
            tipKh="ដើរ ១០០ ម៉ែត្រ ជុំវិញរង្វង់រត់ ៥០ ម៉ែត្រ បញ្ចប់ត្រង់កន្លែងចាប់ផ្តើម៖ ចម្ងាយ = ១០០ ម៉ែត្រ ការផ្លាស់ទី = ០។"
            visual={<DistanceDisplacementVisual />}
          />
          <ComparisonCard
            kh={kh}
            t={t}
            titleEn="Speed vs. Velocity"
            titleKh="ល្បឿន និងល្បឿនវ៉ិចទ័រ"
            leftLabelEn="Speed"
            leftLabelKh="ល្បឿន"
            leftDescEn="Just how fast you are going — a single number."
            leftDescKh="គ្រាន់តែប្រាប់ថាអ្នកទៅលឿនប៉ុនណា — តួលេខតែមួយ។"
            rightLabelEn="Velocity"
            rightLabelKh="ល្បឿនវ៉ិចទ័រ"
            rightDescEn="Speed plus a specific direction (e.g. 60 km/h heading north)."
            rightDescKh="ល្បឿនបូកនឹងទិសដៅជាក់លាក់ (ឧ. ៦០ គ.ម/ម៉ោង ឆ្ពោះទៅទិសខាងជើង)។"
            tipEn="Two motos at 50 km/h have the same speed, but if one heads east and the other west, their velocities are different."
            tipKh="ម៉ូតូពីរនៅ ៥០ គ.ម/ម៉ោង មានល្បឿនដូចគ្នា ប៉ុន្តែប្រសិនបើមួយឆ្ពោះទិសខាងកើត និងមួយទៀតទិសខាងលិច ល្បឿនវ៉ិចទ័ររបស់វាខុសគ្នា។"
            visual={<SpeedVelocityVisual />}
          />
          <ComparisonCard
            kh={kh}
            t={t}
            titleEn="Acceleration"
            titleKh="សំទុះ"
            single
            singleLabelEn="Any change in velocity"
            singleLabelKh="ការប្រែប្រួលណាមួយនៃល្បឿនវ៉ិចទ័រ"
            singleDescEn="Speeding up, slowing down, or simply turning a corner — all of these are acceleration."
            singleDescKh="ការបង្កើនល្បឿន ការបន្ថយល្បឿន ឬគ្រាន់តែបត់ជ្រុង — ទាំងអស់នេះជាសំទុះ។"
            tipEn="When a moto pulls away from a red light, it accelerates. When the brakes are pressed, it also accelerates (in the negative direction)."
            tipKh="នៅពេលម៉ូតូចាប់ផ្តើមចេញពីភ្លើងក្រហម វាមានសំទុះ។ នៅពេលចុចហ្វ្រាំង វាក៏មានសំទុះដែរ (ក្នុងទិសដៅអវិជ្ជមាន)។"
            visual={<AccelerationVisual />}
          />
        </div>

        {/* ── 2. Interactive Velocity-Time Graph ───────────────── */}
        <SectionTitle
          en="Interactive: Velocity–Time graph"
          kh="អន្តរកម្ម៖ ក្រាហ្វល្បឿន–ពេលវេលា"
          numberLabel="02"
          icon={Sliders}
        />
        <VelocityTimeSimulator />

        {/* ── 3. Kinematic Formulas ────────────────────────────── */}
        <SectionTitle
          en="The kinematic formulas"
          kh="រូបមន្តគីនេម៉ាទិច"
          numberLabel="03"
          icon={Gauge}
        />
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-10">
          <FormulaCard
            kh={kh}
            t={t}
            symbol="v"
            titleEn="Average Velocity"
            titleKh="ល្បឿនមធ្យម"
            numerEn="Δd"
            denomEn="Δt"
            descEn="Velocity equals the change in displacement divided by the change in time."
            descKh="ល្បឿនវ៉ិចទ័រស្មើនឹងការប្រែប្រួលនៃការផ្លាស់ទី ចែកនឹងការប្រែប្រួលនៃពេលវេលា។"
            unitEn="metres per second (m/s)"
            unitKh="ម៉ែត្រក្នុងមួយវិនាទី (m/s)"
          />
          <FormulaCard
            kh={kh}
            t={t}
            symbol="a"
            titleEn="Average Acceleration"
            titleKh="សំទុះមធ្យម"
            numerEn="Δv"
            denomEn="Δt"
            descEn="Acceleration equals the change in velocity divided by the change in time."
            descKh="សំទុះស្មើនឹងការប្រែប្រួលនៃល្បឿនវ៉ិចទ័រ ចែកនឹងការប្រែប្រួលនៃពេលវេលា។"
            unitEn="metres per second² (m/s²)"
            unitKh="ម៉ែត្រក្នុងមួយវិនាទី² (m/s²)"
          />
        </div>

        {/* ── 4. Real-world example: the moto ──────────────────── */}
        <SectionTitle
          en="Real world: the moto from Kampong Chhnang"
          kh="ពិភពពិត៖ ម៉ូតូពីកំពង់ឆ្នាំង"
          numberLabel="04"
          icon={Bike}
        />
        <MotoExample />

        {/* Next */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/physics/forces"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold shadow hover:bg-slate-800 transition-colors"
          >
            <span>{t("Next: Forces & Newton's Laws", "បន្ទាប់៖ កម្លាំង និងច្បាប់ញូតុន")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Section title bar ─────────────────────────────────────────────────────
function SectionTitle({
  en,
  kh,
  numberLabel,
  icon: Icon,
}: {
  en: string;
  kh: string;
  numberLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-cyan-700 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {language === "kh" ? `ផ្នែក ${numberLabel}` : `Section ${numberLabel}`}
        </div>
        <h2 className={`text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-tight ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h2>
      </div>
    </div>
  );
}

// ── Comparison card (Distance/Displacement, Speed/Velocity, Acceleration) ─
function ComparisonCard({
  kh,
  t,
  titleEn,
  titleKh,
  leftLabelEn,
  leftLabelKh,
  leftDescEn,
  leftDescKh,
  rightLabelEn,
  rightLabelKh,
  rightDescEn,
  rightDescKh,
  single,
  singleLabelEn,
  singleLabelKh,
  singleDescEn,
  singleDescKh,
  tipEn,
  tipKh,
  visual,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
  titleEn: string;
  titleKh: string;
  leftLabelEn?: string;
  leftLabelKh?: string;
  leftDescEn?: string;
  leftDescKh?: string;
  rightLabelEn?: string;
  rightLabelKh?: string;
  rightDescEn?: string;
  rightDescKh?: string;
  single?: boolean;
  singleLabelEn?: string;
  singleLabelKh?: string;
  singleDescEn?: string;
  singleDescKh?: string;
  tipEn: string;
  tipKh: string;
  visual: React.ReactNode;
}) {
  return (
    <article className="relative rounded-2xl border-2 border-cyan-300 shadow-sm overflow-hidden flex flex-col" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-4 sm:p-5 flex-1 flex flex-col">
        <h3 className={`text-base sm:text-lg font-bold text-cyan-900 mb-3 ${kh ? "font-khmer" : ""}`}>
          {kh ? titleKh : titleEn}
        </h3>

        <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 mb-3 flex items-center justify-center min-h-[110px]">
          {visual}
        </div>

        {single ? (
          <div className="space-y-1.5 mb-3">
            <div className={`text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
              {kh ? singleLabelKh : singleLabelEn}
            </div>
            <p className={`text-sm text-foreground/80 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? singleDescKh : singleDescEn}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5 mb-3">
            <DefRow label={kh ? leftLabelKh! : leftLabelEn!} desc={kh ? leftDescKh! : leftDescEn!} kh={kh} tone="left" />
            <DefRow label={kh ? rightLabelKh! : rightLabelEn!} desc={kh ? rightDescKh! : rightDescEn!} kh={kh} tone="right" />
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-dashed border-slate-200">
          <p className={`text-xs text-slate-600 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            <span className={`font-mono font-bold text-[10px] uppercase tracking-widest text-slate-500 mr-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Tip", "គន្លឹះ")}
            </span>
            {kh ? tipKh : tipEn}
          </p>
        </div>
      </div>
    </article>
  );
}

function DefRow({ label, desc, kh, tone }: { label: string; desc: string; kh: boolean; tone: "left" | "right" }) {
  const accent = tone === "left" ? "text-rose-700 border-rose-300" : "text-cyan-700 border-cyan-300";
  return (
    <div>
      <span className={`inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${accent} mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {label}
      </span>
      <p className={`text-sm text-foreground/80 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
        {desc}
      </p>
    </div>
  );
}

// ── Visuals (compact SVG illustrations) ───────────────────────────────────
function DistanceDisplacementVisual() {
  // Curved path = distance, straight arrow = displacement
  return (
    <svg viewBox="0 0 220 90" className="w-full h-20" aria-hidden="true">
      <path d="M 20 70 Q 60 10, 110 50 T 200 30" stroke="#fb7185" strokeWidth="2.5" fill="none" strokeDasharray="4 3" />
      <line x1="20" y1="70" x2="200" y2="30" stroke="#0891b2" strokeWidth="2.5" markerEnd="url(#arr-cyan)" />
      <defs>
        <marker id="arr-cyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#0891b2" />
        </marker>
      </defs>
      <circle cx="20" cy="70" r="3.5" fill="#0f172a" />
      <circle cx="200" cy="30" r="3.5" fill="#0f172a" />
      <text x="20" y="86" fontSize="9" fill="#475569" fontFamily="monospace">START</text>
      <text x="170" y="20" fontSize="9" fill="#475569" fontFamily="monospace">END</text>
    </svg>
  );
}

function SpeedVelocityVisual() {
  return (
    <svg viewBox="0 0 220 90" className="w-full h-20" aria-hidden="true">
      {/* Speedometer-like arc */}
      <path d="M 30 70 A 35 35 0 0 1 100 70" stroke="#cbd5e1" strokeWidth="3" fill="none" />
      <line x1="65" y1="70" x2="50" y2="42" stroke="#0891b2" strokeWidth="2.5" />
      <circle cx="65" cy="70" r="3" fill="#0f172a" />
      <text x="40" y="86" fontSize="9" fill="#475569" fontFamily="monospace">SPEED</text>

      {/* Arrow with direction */}
      <line x1="130" y1="50" x2="200" y2="50" stroke="#0891b2" strokeWidth="3" markerEnd="url(#arr-vel)" />
      <text x="138" y="40" fontSize="9" fill="#475569" fontFamily="monospace">VELOCITY →</text>
      <defs>
        <marker id="arr-vel" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#0891b2" />
        </marker>
      </defs>
    </svg>
  );
}

function AccelerationVisual() {
  // 3 dots that get progressively further apart (speeding up)
  return (
    <svg viewBox="0 0 220 90" className="w-full h-20" aria-hidden="true">
      <line x1="10" y1="50" x2="210" y2="50" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 2" />
      {[20, 50, 95, 155, 205].map((x, i) => (
        <circle key={i} cx={x} cy="50" r={3 + i * 0.4} fill="#0891b2" opacity={0.5 + i * 0.1} />
      ))}
      <line x1="20" y1="30" x2="205" y2="30" stroke="#0891b2" strokeWidth="2" markerEnd="url(#arr-acc)" />
      <text x="80" y="22" fontSize="9" fill="#475569" fontFamily="monospace">FASTER →</text>
      <defs>
        <marker id="arr-acc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#0891b2" />
        </marker>
      </defs>
    </svg>
  );
}

// ── Velocity-Time Simulator ───────────────────────────────────────────────
function VelocityTimeSimulator() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [acceleration, setAcceleration] = useState(2); // m/s²
  const [v0, setV0] = useState(10); // initial velocity m/s

  const T = 10; // simulate 0 to 10s
  const samples = 51;

  // Compute v(t) samples
  const points = useMemo(() => {
    const arr: { time: number; v: number }[] = [];
    for (let i = 0; i < samples; i++) {
      const time = (i / (samples - 1)) * T;
      arr.push({ time, v: v0 + acceleration * time });
    }
    return arr;
  }, [acceleration, v0]);

  const finalV = v0 + acceleration * T;

  // SVG plot dimensions
  const W = 600;
  const H = 320;
  const padL = 56;
  const padR = 24;
  const padT = 24;
  const padB = 44;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  // Y axis: -50..+50 m/s
  const yMin = -50;
  const yMax = 50;
  const xMin = 0;
  const xMax = T;

  const xScale = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
  const yScale = (y: number) =>
    padT + (1 - (y - yMin) / (yMax - yMin)) * plotH;

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.time).toFixed(2)} ${yScale(p.v).toFixed(2)}`)
    .join(" ");

  // Y gridlines every 25 m/s
  const yTicks = [-50, -25, 0, 25, 50];
  // X gridlines every 2s
  const xTicks = [0, 2, 4, 6, 8, 10];

  let trend: "up" | "flat" | "down" = "flat";
  if (acceleration > 0.05) trend = "up";
  else if (acceleration < -0.05) trend = "down";

  const lineColor =
    trend === "up" ? "#0891b2" : trend === "down" ? "#e11d48" : "#64748b";
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendLabelEn = trend === "up" ? "Speeding up" : trend === "down" ? "Slowing down" : "Constant velocity";
  const trendLabelKh = trend === "up" ? "បង្កើនល្បឿន" : trend === "down" ? "បន្ថយល្បឿន" : "ល្បឿនថេរ";

  return (
    <section className="relative rounded-2xl border-2 border-cyan-300 shadow-sm overflow-hidden mb-10" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-4 sm:p-6">
        {/* Top status bar */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${trend === "up" ? "bg-cyan-100 text-cyan-800" : trend === "down" ? "bg-rose-100 text-rose-800" : "bg-slate-100 text-slate-700"}`}>
              <TrendIcon className="w-3.5 h-3.5" />
              <span className={kh ? "font-khmer" : ""}>{kh ? trendLabelKh : trendLabelEn}</span>
            </span>
          </div>
          <Stat labelEn="Initial velocity (v₀)" labelKh="ល្បឿនដំបូង (v₀)" value={`${v0} m/s`} kh={kh} />
          <Stat labelEn="Acceleration (a)" labelKh="សំទុះ (a)" value={`${acceleration.toFixed(1)} m/s²`} kh={kh} />
          <Stat labelEn="v at t = 10s" labelKh="v នៅ t = ១០ វិ." value={`${finalV.toFixed(1)} m/s`} kh={kh} />
        </div>

        {/* Graph */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-2 sm:p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={kh ? "ក្រាហ្វល្បឿន-ពេលវេលា" : "Velocity-time graph"}>
            {/* Grid */}
            {yTicks.map((y) => (
              <line key={`gy-${y}`} x1={padL} x2={W - padR} y1={yScale(y)} y2={yScale(y)} stroke={y === 0 ? "#94a3b8" : "#e2e8f0"} strokeWidth={y === 0 ? 1.5 : 1} />
            ))}
            {xTicks.map((x) => (
              <line key={`gx-${x}`} x1={xScale(x)} x2={xScale(x)} y1={padT} y2={H - padB} stroke="#e2e8f0" strokeWidth={1} />
            ))}

            {/* Axes */}
            <line x1={padL} x2={padL} y1={padT} y2={H - padB} stroke="#0f172a" strokeWidth={1.5} />
            <line x1={padL} x2={W - padR} y1={H - padB} y2={H - padB} stroke="#0f172a" strokeWidth={1.5} />

            {/* Y tick labels */}
            {yTicks.map((y) => (
              <text key={`yl-${y}`} x={padL - 8} y={yScale(y) + 4} fontSize="11" fill="#475569" textAnchor="end" fontFamily="monospace">
                {y}
              </text>
            ))}
            {/* X tick labels */}
            {xTicks.map((x) => (
              <text key={`xl-${x}`} x={xScale(x)} y={H - padB + 16} fontSize="11" fill="#475569" textAnchor="middle" fontFamily="monospace">
                {x}
              </text>
            ))}

            {/* Axis labels */}
            <text x={padL - 44} y={padT + plotH / 2} fontSize="12" fill="#0f172a" fontFamily="monospace" transform={`rotate(-90 ${padL - 44} ${padT + plotH / 2})`} textAnchor="middle">
              {kh ? "v (ម/វិ.)" : "v (m/s)"}
            </text>
            <text x={padL + plotW / 2} y={H - 8} fontSize="12" fill="#0f172a" fontFamily="monospace" textAnchor="middle">
              {kh ? "ពេល t (វិ.)" : "time t (s)"}
            </text>

            {/* The velocity line */}
            <path d={path} stroke={lineColor} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            {/* Endpoint dot */}
            <circle cx={xScale(T)} cy={yScale(finalV)} r={5} fill={lineColor} stroke="#fff" strokeWidth={2} />
            <circle cx={xScale(0)} cy={yScale(v0)} r={4} fill={lineColor} stroke="#fff" strokeWidth={2} />
          </svg>
        </div>

        {/* Sliders */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-5">
          <SliderControl
            id="sim-acc"
            labelEn="Acceleration (a)"
            labelKh="សំទុះ (a)"
            min={-5}
            max={5}
            step={0.5}
            value={acceleration}
            onChange={setAcceleration}
            unit="m/s²"
            kh={kh}
          />
          <SliderControl
            id="sim-v0"
            labelEn="Initial velocity (v₀)"
            labelKh="ល្បឿនដំបូង (v₀)"
            min={0}
            max={30}
            step={1}
            value={v0}
            onChange={setV0}
            unit="m/s"
            kh={kh}
          />
        </div>

        <p className={`mt-4 text-xs sm:text-sm text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}>
          <span className={`font-mono font-bold text-[10px] uppercase tracking-widest text-slate-500 mr-1.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Read the graph", "អានក្រាហ្វ")}
          </span>
          {t(
            "Positive acceleration tilts the line up, negative tilts it down, zero keeps it flat. The slope of the line is the acceleration.",
            "សំទុះវិជ្ជមានធ្វើឱ្យបន្ទាត់លូនឡើង សំទុះអវិជ្ជមានធ្វើឱ្យបន្ទាត់លូនចុះ ហើយសូន្យធ្វើឱ្យបន្ទាត់ផ្ទៃ។ ជម្រាលនៃបន្ទាត់គឺជាសំទុះ។",
          )}
        </p>
      </div>
    </section>
  );
}

function Stat({ labelEn, labelKh, value, kh }: { labelEn: string; labelKh: string; value: string; kh: boolean }) {
  return (
    <div>
      <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? labelKh : labelEn}
      </div>
      <div className="font-mono text-sm sm:text-base font-bold text-slate-900">{value}</div>
    </div>
  );
}

function SliderControl({
  id,
  labelEn,
  labelKh,
  min,
  max,
  step,
  value,
  onChange,
  unit,
  kh,
}: {
  id: string;
  labelEn: string;
  labelKh: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
  unit: string;
  kh: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className={`flex items-center justify-between mb-1.5 ${kh ? "font-khmer" : ""}`}>
        <span className="text-sm font-bold text-slate-800">{kh ? labelKh : labelEn}</span>
        <span className="font-mono text-sm font-bold text-cyan-700">
          {value.toFixed(step < 1 ? 1 : 0)} {unit}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-cyan-600 cursor-pointer"
      />
      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

// ── Formula Card ──────────────────────────────────────────────────────────
function FormulaCard({
  kh,
  t,
  symbol,
  titleEn,
  titleKh,
  numerEn,
  denomEn,
  descEn,
  descKh,
  unitEn,
  unitKh,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
  symbol: string;
  titleEn: string;
  titleKh: string;
  numerEn: string;
  denomEn: string;
  descEn: string;
  descKh: string;
  unitEn: string;
  unitKh: string;
}) {
  return (
    <article className="relative rounded-2xl border-2 border-cyan-300 shadow-sm overflow-hidden" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6">
        <div className={`text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-cyan-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? titleKh : titleEn}
        </div>

        {/* Equation: symbol = numerator / denominator (rendered as a stacked fraction) */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-4 select-none" aria-label={`${symbol} equals ${numerEn} over ${denomEn}`}>
          <span className="font-serif italic text-3xl sm:text-4xl font-bold text-slate-900">{symbol}</span>
          <span className="font-serif text-2xl sm:text-3xl text-slate-700">=</span>
          <span className="inline-flex flex-col items-center leading-none">
            <span className="font-serif italic text-xl sm:text-2xl font-bold text-cyan-800 px-3 pb-1 border-b-2 border-slate-700">
              {numerEn}
            </span>
            <span className="font-serif italic text-xl sm:text-2xl font-bold text-cyan-800 px-3 pt-1">
              {denomEn}
            </span>
          </span>
        </div>

        <p className={`text-sm text-foreground/80 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? descKh : descEn}
        </p>

        <div className="border-t border-dashed border-slate-200 pt-2.5">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Units", "ឯកតា")}
          </div>
          <div className={`text-sm font-semibold text-slate-800 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? unitKh : unitEn}
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Real-world example: motorbike ─────────────────────────────────────────
function MotoExample() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  // Numbers chosen to be realistic and arithmetic-friendly
  const distanceKm = 90;
  const timeHours = 1.5;
  const velocityKmh = distanceKm / timeHours; // 60.0 km/h

  return (
    <section className="relative rounded-2xl border-2 border-cyan-300 shadow-sm overflow-hidden" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6">
        {/* Scenario */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Bike className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-base sm:text-lg font-bold text-cyan-900 ${kh ? "font-khmer" : ""}`}>
              {t(
                "Calculating the velocity of a moto from Kampong Chhnang to Phnom Penh",
                "គណនាល្បឿនរបស់ម៉ូតូពីកំពង់ឆ្នាំងទៅភ្នំពេញ",
              )}
            </h3>
            <p className={`text-sm text-foreground/80 mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "A driver leaves Kampong Chhnang and arrives in Phnom Penh, heading south-east on National Road 5.",
                "អ្នកបើកបរចាកចេញពីកំពង់ឆ្នាំង ហើយមកដល់ភ្នំពេញ ឆ្ពោះទៅទិសអាគ្នេយ៍តាមផ្លូវជាតិលេខ ៥។",
              )}
            </p>
          </div>
        </div>

        {/* Route diagram */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 sm:p-4 mb-5">
          <svg viewBox="0 0 560 110" className="w-full h-auto" aria-hidden="true">
            <line x1="50" y1="55" x2="510" y2="55" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" />
            {/* Stop A */}
            <circle cx="50" cy="55" r="9" fill="#0891b2" stroke="#fff" strokeWidth="2" />
            <text x="50" y="35" fontSize="11" fill="#0f172a" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A</text>
            <text x="50" y="85" fontSize="10" fill="#475569" fontFamily="monospace" textAnchor="middle">{kh ? "កំពង់ឆ្នាំង" : "Kampong Chhnang"}</text>
            {/* Stop B */}
            <circle cx="510" cy="55" r="9" fill="#0891b2" stroke="#fff" strokeWidth="2" />
            <text x="510" y="35" fontSize="11" fill="#0f172a" fontFamily="monospace" textAnchor="middle" fontWeight="bold">B</text>
            <text x="510" y="85" fontSize="10" fill="#475569" fontFamily="monospace" textAnchor="middle">{kh ? "ភ្នំពេញ" : "Phnom Penh"}</text>
            {/* Distance label */}
            <text x="280" y="48" fontSize="11" fill="#0f172a" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              Δd = {distanceKm} km
            </text>
            {/* Direction arrow */}
            <line x1="60" y1="55" x2="500" y2="55" stroke="#0891b2" strokeWidth="2" markerEnd="url(#moto-arrow)" />
            <defs>
              <marker id="moto-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#0891b2" />
              </marker>
            </defs>
            {/* moto icon-ish */}
            <text x="280" y="68" fontSize="18" textAnchor="middle">🛵</text>
          </svg>
        </div>

        {/* Givens */}
        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          <Given labelEn="Distance (Δd)" labelKh="ចម្ងាយ (Δd)" value={`${distanceKm} km`} kh={kh} />
          <Given labelEn="Time (Δt)" labelKh="ពេលវេលា (Δt)" value={`${timeHours} h`} kh={kh} />
          <Given labelEn="Direction" labelKh="ទិសដៅ" value={kh ? "អាគ្នេយ៍" : "South-East"} kh={kh} />
        </div>

        {/* Working */}
        <div className="rounded-xl bg-slate-900 text-slate-100 p-4 sm:p-5 font-mono text-sm sm:text-base shadow-inner">
          <div className={`text-[10px] uppercase tracking-widest text-cyan-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Step-by-step", "ជំហានម្តងមួយៗ")}
          </div>
          <div className="space-y-1.5">
            <div>
              <span className="text-slate-400">{t("// formula", "// រូបមន្ត")}</span>
            </div>
            <div>v = Δd / Δt</div>
            <div className="mt-2">
              <span className="text-slate-400">{t("// substitute", "// ជំនួសតម្លៃ")}</span>
            </div>
            <div>v = {distanceKm} km / {timeHours} h</div>
            <div className="mt-2">
              <span className="text-slate-400">{t("// result", "// លទ្ធផល")}</span>
            </div>
            <div className="text-cyan-300 text-base sm:text-lg font-bold">
              v = {velocityKmh.toFixed(1)} km/h{" "}
              <span className="text-slate-400 font-normal">
                ({kh ? "ឆ្ពោះទៅអាគ្នេយ៍" : "south-east"})
              </span>
            </div>
          </div>
        </div>

        <p className={`mt-4 text-xs sm:text-sm text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}>
          <span className={`inline-flex items-center gap-1 font-mono font-bold text-[10px] uppercase tracking-widest text-slate-500 mr-1.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            <MoveRight className="w-3 h-3" />
            {t("Note", "កំណត់")}
          </span>
          {t(
            "Because we included a direction (south-east), this is a velocity, not just a speed. If we said only '60 km/h', that would be the speed.",
            "ដោយសារយើងបានបញ្ចូលទិសដៅ (អាគ្នេយ៍) នេះគឺជាល្បឿនវ៉ិចទ័រ មិនមែនគ្រាន់តែជាល្បឿនទេ។ ប្រសិនបើយើងនិយាយត្រឹមតែ '៦០ គ.ម/ម៉ោង' នោះវានឹងជាល្បឿនធម្មតា។",
          )}
        </p>
      </div>
    </section>
  );
}

function Given({ labelEn, labelKh, value, kh }: { labelEn: string; labelKh: string; value: string; kh: boolean }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
      <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? labelKh : labelEn}
      </div>
      <div className="font-mono text-base font-bold text-slate-900">{value}</div>
    </div>
  );
}
