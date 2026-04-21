import { Link } from "wouter";
import {
  Wrench,
  ArrowLeft,
  ArrowRight,
  Compass,
  Lightbulb,
  Ruler,
  Weight,
} from "lucide-react";
import { useState } from "react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  M-05 · The Six Simple Machines — ម៉ាស៊ីនងាយទាំងប្រាំមួយ
//
//    1. Golden Rule of Mechanics — Work = Force × Distance, force↔distance trade
//    2. The Six Machines — lever, ramp, wheel & axle, wedge, screw, pulley
//
//  Aesthetic: blueprint / engineering — drafting paper, cyan grid, corner
//  marks, monospace spec codes, geometric SVG line drawings.
//  All headings + concepts strictly bilingual (English + Khmer).
// ════════════════════════════════════════════════════════════════════════════

const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  backgroundImage:
    "linear-gradient(rgba(14, 116, 144, 0.08) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.08) 1px, transparent 1px), " +
    "linear-gradient(rgba(14, 116, 144, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
  backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-emerald-300/70" : "border-cyan-400/60";
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

export function SimpleMachinesPage() {
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

        {/* Hero */}
        <header
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 sm:px-10 py-8 sm:py-10 mb-8 shadow-lg"
          style={{
            backgroundImage:
              "linear-gradient(rgba(110, 231, 183, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(110, 231, 183, 0.10) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border-2 border-emerald-400/60 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <Wrench className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Physics", "រូបវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span className="text-emerald-200">M-05</span>
              </div>
              <h1
                data-testid="page-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t(
                  "The Six Simple Machines: Multiplying Force",
                  "ម៉ាស៊ីនងាយទាំងប្រាំមួយ៖ ការបង្កើនកម្លាំង"
                )}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "For 5,000 years, every wall, well and water buffalo cart in Cambodia has used these same six tools. They don't make work easier — they let you trade a small force across a long distance for a big force across a short one.",
                  "អស់រយៈពេល ៥.០០០ ឆ្នាំមកហើយ ជញ្ជាំង អណ្ដូងទឹក និងរទេះក្របីគ្រប់គ្រឿងនៅកម្ពុជា សុទ្ធតែប្រើឧបករណ៍ប្រាំមួយដូចគ្នានេះ។ វាមិនធ្វើឱ្យកិច្ចការងាយជាងទេ — វាអនុញ្ញាតឱ្យអ្នកប្ដូរកម្លាំងតិចលើចម្ងាយវែង ទៅជាកម្លាំងធំលើចម្ងាយខ្លី។"
                )}
              </p>
            </div>
          </div>
        </header>

        {/* ── Section 1: Golden Rule ──────────────────────────────── */}
        <GoldenRuleSection kh={kh} t={t} />

        {/* ── Section 2: The Six Machines ─────────────────────────── */}
        <SixMachinesSection kh={kh} t={t} />

        {/* Footer back link */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/physics"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold shadow hover:bg-slate-800 transition-colors ${kh ? "font-khmer" : ""}`}
          >
            {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1: Golden Rule of Mechanics
// ════════════════════════════════════════════════════════════════════════════

function GoldenRuleSection({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  // Slider — lever arm length multiplier 1× to 8×
  const [arm, setArm] = useState<number>(4);
  // load is 80 kg; effort = 80 / arm
  const load = 80;
  const effort = load / arm;
  const liftDistance = 0.2; // metres
  const pushDistance = liftDistance * arm; // conservation of work

  return (
    <section className="mb-10" data-testid="golden-rule-section">
      <SectionHeader
        spec="01"
        en="The Golden Rule of Mechanics"
        kh="ច្បាប់មាសនៃមេកានិច"
        kh_={kh}
      />

      <div
        className="relative rounded-2xl border-2 border-cyan-300 p-5 sm:p-7 shadow-sm"
        style={CARD_BG}
        data-testid="golden-rule-card"
      >
        <CornerMarks subtle />

        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-6 items-start">
          <div>
            <p className={`text-foreground text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "You cannot magically do less Work. Lifting a 80 kg motorbike 20 cm off the ground costs the same amount of Work no matter what tool you use.",
                "អ្នកមិនអាចធ្វើ ‘កិច្ចការ’ តិចជាងបានដោយវេទមន្តទេ។ ការលើកម៉ូតូ ៨០ គីឡូក្រាមឱ្យឡើងពីដី ២០ សង់ទីម៉ែត្រ ត្រូវការ ‘កិច្ចការ’ ដូចគ្នា មិនថាអ្នកប្រើឧបករណ៍អ្វីទេ។"
              )}
            </p>
            <p className={`text-foreground text-sm sm:text-base mb-5 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "But a simple machine lets you spread that work over a longer distance — so the force you push with at any moment becomes much smaller. That is called ",
                "ប៉ុន្តែ ‘ម៉ាស៊ីនងាយ’ អនុញ្ញាតឱ្យអ្នកពង្រីក ‘កិច្ចការ’ នោះលើចម្ងាយវែងជាង — ដូច្នេះកម្លាំងដែលអ្នករុញនៅពេលណាមួយ ក្លាយជាតូចជាងច្រើន។ វាហៅថា "
              )}
              <strong className={`text-cyan-800 ${kh ? "font-khmer" : ""}`}>
                {t("Mechanical Advantage", "ការបង្កើនកម្លាំងតាមមេកានិច")}
              </strong>
              .
            </p>

            {/* Formula card */}
            <div className="rounded-xl border-2 border-dashed border-cyan-400/70 bg-cyan-50/60 p-4 mb-5" data-testid="work-formula">
              <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("THE GOLDEN EQUATION", "សមីការមាស")}
              </div>
              <div className={`text-center text-base sm:text-lg text-slate-900 ${kh ? "font-khmer leading-snug" : "font-mono"}`}>
                <span className="text-rose-700">{t("Work", "កិច្ចការ")}</span> ={" "}
                <span className="text-amber-700">{t("Force", "កម្លាំង")}</span> ×{" "}
                <span className="text-cyan-700">{t("Distance", "ចម្ងាយ")}</span>
              </div>
              <div className={`mt-2 text-center text-xs text-slate-600 ${kh ? "font-khmer" : "font-mono uppercase tracking-widest"}`}>
                {t(
                  "Work stays the same · Force × Distance is a trade",
                  "កិច្ចការ​ថេរ · កម្លាំង × ចម្ងាយ ជាការ​ប្ដូរ​"
                )}
              </div>
            </div>

            {/* Lightbulb tip */}
            <div className="flex items-start gap-3 rounded-lg bg-amber-50 border-l-4 border-amber-400 p-3">
              <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className={`text-sm text-amber-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                <strong>{t("Trade-off: ", "ការប្ដូរ ៖ ")}</strong>
                {t(
                  "Less force, but you have to push for longer. More force, less distance. You cannot beat the equation.",
                  "កម្លាំងតិច ប៉ុន្តែអ្នកត្រូវរុញវែងជាង។ កម្លាំងច្រើន ចម្ងាយតិច។ អ្នកមិនអាចយកឈ្នះសមីការនេះបានទេ។"
                )}
              </p>
            </div>
          </div>

          {/* Right: interactive lever calculator */}
          <div className="rounded-xl bg-slate-900 p-5 text-slate-100" data-testid="ma-calculator">
            <div className={`text-[10px] font-mono uppercase tracking-widest text-emerald-300/80 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("LIVE EXAMPLE · 80 KG MOTORBIKE", "ឧទាហរណ៍ផ្ទាល់ · ម៉ូតូ ៨០ គក")}
            </div>

            {/* Schematic SVG of a lever lifting the load */}
            <svg
              viewBox="0 0 360 130"
              className="w-full h-auto mb-4"
              role="img"
              aria-label={t(
                `Lever schematic: 80 kg load on the short side, ${arm} times longer effort arm on the right.`,
                `គំនូរឃ្នាស់៖ បន្ទុក ៨០ គីឡូក្រាមនៅផ្នែកខ្លី ដៃកម្លាំងវែងជាង ${arm} ដង នៅខាងស្ដាំ។`
              )}
            >
              <title>{t("Lever calculator schematic", "គំនូរម៉ាស៊ីនគណនាឃ្នាស់")}</title>
              {/* fulcrum */}
              <polygon points="120,100 100,125 140,125" fill="#94a3b8" />
              {/* lever bar — angle depends on arm */}
              <g transform={`translate(120,100) rotate(${-(arm * 1.5)})`}>
                <line x1={-30} y1="0" x2={Math.min(arm * 30, 220)} y2="0" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
                {/* effort hand */}
                <circle cx={Math.min(arm * 30, 220)} cy="0" r="6" fill="#10b981" />
                {/* load */}
                <rect x={-46} y={-22} width="22" height="22" fill="#f43f5e" />
              </g>
              {/* labels */}
              <text x="40" y="118" fill="#94a3b8" fontSize="10" fontFamily="monospace">{kh ? "បន្ទុក" : "load"}</text>
              <text x={Math.min(150 + arm * 30, 320)} y="118" fill="#94a3b8" fontSize="10" fontFamily="monospace">{kh ? "កម្លាំង" : "effort"}</text>
              <text x="120" y="135" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">{kh ? "ទ្រ" : "fulcrum"}</text>
            </svg>

            {/* Slider: effort arm length */}
            <label className={`block text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Effort arm length", "ប្រវែងដៃកម្លាំង")} ·{" "}
              <span className="text-emerald-300 font-bold">{arm.toFixed(0)}×</span>
            </label>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={arm}
              onChange={(e) => setArm(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
              data-testid="arm-slider"
              aria-label={t("effort arm multiplier", "មេគុណប្រវែងដៃកម្លាំង")}
            />

            {/* readouts */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Stat
                label={t("Force you push with", "កម្លាំងដែលអ្នករុញ")}
                value={`${effort.toFixed(1)} kg`}
                color="text-amber-300"
                kh={kh}
                testid="force-readout"
              />
              <Stat
                label={t("Distance you push", "ចម្ងាយដែលអ្នករុញ")}
                value={`${(pushDistance * 100).toFixed(0)} cm`}
                color="text-cyan-300"
                kh={kh}
                testid="distance-readout"
              />
            </div>
            <div className="mt-3 rounded-md bg-slate-800/70 border border-slate-700 p-3 text-center" data-testid="work-readout">
              <div className={`text-[10px] font-mono uppercase tracking-widest text-rose-300/80 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Total Work (always the same)", "កិច្ចការសរុប (តែងតែដូចគ្នា)")}
              </div>
              <div className="text-rose-200 font-mono text-base font-bold">
                {effort.toFixed(1)} kg × {(pushDistance * 100).toFixed(0)} cm = {(effort * pushDistance * 100).toFixed(0)} kg·cm
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  color,
  kh,
  testid,
}: {
  label: string;
  value: string;
  color: string;
  kh: boolean;
  testid?: string;
}) {
  return (
    <div className="rounded-md bg-slate-800/70 border border-slate-700 p-3" data-testid={testid}>
      <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {label}
      </div>
      <div className={`font-mono text-lg font-bold ${color}`}>{value}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2: The Six Machines
// ════════════════════════════════════════════════════════════════════════════

type Machine = {
  id: string;
  number: string;
  nameEn: string;
  nameKh: string;
  defEn: string;
  defKh: string;
  exampleEn: string;
  exampleKh: string;
  diagram: React.ComponentType<{ kh: boolean }>;
  accent: string; // tailwind border colour class
  textAccent: string;
};

function SixMachinesSection({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const machines: Machine[] = [
    {
      id: "lever",
      number: "01",
      nameEn: "Lever",
      nameKh: "ឃ្នាស់",
      defEn: "A stiff bar resting on a pivot point called a fulcrum.",
      defKh: "របារងឹង សំណល់លើចំណុចបង្វិល ដែលហៅថា ‘ចំណុចទ្រ’។",
      exampleEn: "Using a long bamboo pole to lift a heavy rock from the rice field.",
      exampleKh: "ប្រើបង្គោលឫស្សីវែង ដើម្បីលើកថ្មធ្ងន់ចេញពីស្រែ។",
      diagram: LeverDiagram,
      accent: "border-rose-300",
      textAccent: "text-rose-800",
    },
    {
      id: "inclined-plane",
      number: "02",
      nameEn: "Inclined Plane",
      nameKh: "ប្លង់ទេរ",
      defEn: "A flat supporting surface tilted at an angle to make lifting easier.",
      defKh: "ផ្ទៃរាបស្មើ ដែលគេទេរនៅមុំមួយ ដើម្បីសម្រួលការលើក។",
      exampleEn: "Pushing a motorbike up a wooden ramp into a truck instead of lifting it straight up.",
      exampleKh: "រុញម៉ូតូឡើងលើជម្រាលឈើចូលក្នុងឡានដឹកទំនិញ ជំនួសឱ្យការលើកផ្ទាល់ឡើងលើ។",
      diagram: InclinedPlaneDiagram,
      accent: "border-amber-300",
      textAccent: "text-amber-800",
    },
    {
      id: "wheel-and-axle",
      number: "03",
      nameEn: "Wheel and Axle",
      nameKh: "កង់ និងអ័ក្ស",
      defEn: "A larger wheel rigidly connected to a smaller cylinder (axle); turning the wheel multiplies your force.",
      defKh: "កង់ធំតភ្ជាប់យ៉ាងតឹងទៅស៊ីឡាំងតូច (អ័ក្ស) ; ការបង្វិលកង់បង្កើនកម្លាំងរបស់អ្នក។",
      exampleEn: "A traditional water-well crank — a long handle turns a small drum that winds the rope.",
      exampleKh: "ដៃចង្កូតអណ្ដូងទឹកបុរាណ — ដៃវែងបង្វិលស្គរតូច ដែលរុំខ្សែ។",
      diagram: WheelAxleDiagram,
      accent: "border-cyan-300",
      textAccent: "text-cyan-800",
    },
    {
      id: "wedge",
      number: "04",
      nameEn: "Wedge",
      nameKh: "កំណល់",
      defEn: "Two inclined planes joined back-to-back, used to split, cut, or lift objects apart.",
      defKh: "ប្លង់ទេរពីរ ភ្ជាប់ខ្នងនឹងខ្នង ប្រើសម្រាប់ពុះ កាត់ ឬញែកវត្ថុ។",
      exampleEn: "An axe head splitting a log of firewood — a small downward push becomes a huge sideways force.",
      exampleKh: "មុខពូថៅពុះដុំឧស — ការរុញចុះក្រោមតិច ក្លាយជាកម្លាំងផ្នែកចំហៀងធំ។",
      diagram: WedgeDiagram,
      accent: "border-violet-300",
      textAccent: "text-violet-800",
    },
    {
      id: "screw",
      number: "05",
      nameEn: "Screw",
      nameKh: "ខ្ចៅ",
      defEn: "An inclined plane wrapped around a cylinder; turning it converts rotation into a strong straight-line force.",
      defKh: "ប្លង់ទេរ រុំជុំវិញស៊ីឡាំង ; ការបង្វិលបំលែងចលនារង្វិល ទៅជាកម្លាំងបន្ទាត់ត្រង់ខ្លាំង។",
      exampleEn: "A water bottle cap or a wood screw biting into a plank — many turns become a tight grip.",
      exampleKh: "គម្របដបទឹក ឬខ្ចៅចូលក្នុងក្ដារឈើ — ការបង្វិលច្រើនដង ក្លាយជាការចាប់តឹង។",
      diagram: ScrewDiagram,
      accent: "border-emerald-300",
      textAccent: "text-emerald-800",
    },
    {
      id: "pulley",
      number: "06",
      nameEn: "Pulley",
      nameKh: "រ៉ក",
      defEn: "A wheel with a grooved rim that holds a rope; lets you pull down to lift things up.",
      defKh: "កង់មួយដែលមានគែមជា ‘គ្រឡុក’ សម្រាប់ដាក់ខ្សែ ; អនុញ្ញាតឱ្យអ្នកទាញចុះក្រោម ដើម្បីលើករបស់ឡើងលើ។",
      exampleEn: "Hoisting a flag up a flagpole, or workers lifting bricks to a second-floor construction site.",
      exampleKh: "ទាញទង់ជាតិឡើងលើបង្គោលទង់ ឬកម្មករលើកឥដ្ឋឡើងជាន់ទីពីរនៃការសាងសង់។",
      diagram: PulleyDiagram,
      accent: "border-indigo-300",
      textAccent: "text-indigo-800",
    },
  ];

  return (
    <section data-testid="six-machines-section">
      <SectionHeader
        spec="02"
        en="The Six Machines"
        kh="ម៉ាស៊ីនទាំងប្រាំមួយ"
        kh_={kh}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        {machines.map((m) => (
          <article
            key={m.id}
            data-testid={`machine-${m.id}`}
            className={`relative rounded-2xl border-2 ${m.accent} p-5 shadow-sm hover:shadow-md transition-shadow`}
            style={CARD_BG}
          >
            <CornerMarks subtle />

            {/* Header line: spec code + machine name */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase ${m.textAccent}`}>
                M-05.{m.number}
              </span>
              <span className="text-slate-300">·</span>
              <span className={`text-[10px] font-bold tracking-widest uppercase opacity-70 ${m.textAccent} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t(`Machine ${m.number}`, `ម៉ាស៊ីនទី ${m.number}`)}
              </span>
            </div>

            <h3 className={`text-xl font-bold ${m.textAccent} mb-3 ${kh ? "font-khmer" : ""}`}>
              {kh ? m.nameKh : m.nameEn}
              <span className={`ml-2 text-xs font-mono opacity-50 ${kh ? "hidden" : ""}`}>
                ({m.nameKh})
              </span>
            </h3>

            {/* Diagram */}
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3 mb-4" data-testid={`diagram-${m.id}`}>
              <m.diagram kh={kh} />
            </div>

            {/* Definition */}
            <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {kh ? m.defKh : m.defEn}
            </p>

            {/* Example */}
            <div className="border-t border-dashed border-slate-200 pt-3">
              <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Everyday example", "ឧទាហរណ៍ប្រចាំថ្ងៃ")}
              </div>
              <p className={`text-sm text-slate-700 italic ${kh ? "font-khmer not-italic leading-loose" : ""}`}>
                {kh ? m.exampleKh : m.exampleEn}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Closing line */}
      <div className="mt-8 rounded-xl border-2 border-slate-300 bg-white p-5 flex items-start gap-3" style={CARD_BG} data-testid="closing-note">
        <Weight className="w-6 h-6 text-slate-700 flex-shrink-0" />
        <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <strong>{t("Look around: ", "មើលជុំវិញ ៖ ")}</strong>
          {t(
            "every complex machine — a bicycle, a car engine, an excavator, a sewing machine — is just a careful combination of these six. Master the six, and you can read any machine.",
            "ម៉ាស៊ីនស្មុគស្មាញគ្រប់យ៉ាង — កង់ ម៉ាស៊ីនឡាន ឡានកាយដី ម៉ាស៊ីនដេរ — សុទ្ធតែជាការលាយបញ្ចូលគ្នាដ៏ឧស្សាហ៍នៃប្រាំមួយនេះ។ ស្ទាត់ជំនាញប្រាំមួយនេះ នោះអ្នកអាចអានម៉ាស៊ីនណាក៏បាន។"
          )}
        </p>
      </div>
    </section>
  );
}

// ── Shared helpers ────────────────────────────────────────────────────────

function SectionHeader({
  spec,
  en,
  kh,
  kh_,
}: {
  spec: string;
  en: string;
  kh: string;
  kh_: boolean;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-emerald-700 bg-emerald-50 border border-emerald-300 rounded px-2 py-0.5">
        SEC-{spec}
      </span>
      <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 ${kh_ ? "font-khmer" : ""}`}>
        {kh_ ? kh : en}
      </h2>
      <Ruler className="w-4 h-4 text-slate-400 ml-1" />
      <div className="flex-1 border-t border-dashed border-slate-300" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Six SVG line-drawing diagrams — blueprint style
// ════════════════════════════════════════════════════════════════════════════

const STROKE = "#0f172a"; // slate-900
const ACCENT = "#0e7490"; // cyan-700

function LeverDiagram({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 240 110" className="w-full h-auto" role="img" aria-label={kh ? "គំនូរឃ្នាស់" : "Lever diagram"}>
      {/* ground */}
      <line x1="10" y1="100" x2="230" y2="100" stroke={STROKE} strokeWidth="1.5" />
      {/* fulcrum triangle */}
      <polygon points="100,80 80,100 120,100" fill="none" stroke={STROKE} strokeWidth="2" />
      {/* lever bar (slightly tilted) */}
      <line x1="20" y1="62" x2="210" y2="78" stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" />
      {/* load (rock) */}
      <circle cx="30" cy="55" r="11" fill="none" stroke={STROKE} strokeWidth="1.8" />
      <text x="30" y="58" fontSize="9" textAnchor="middle" fill={STROKE} fontFamily="monospace">L</text>
      {/* effort arrow */}
      <line x1="200" y1="55" x2="200" y2="76" stroke="#10b981" strokeWidth="2.5" />
      <polygon points="200,76 196,69 204,69" fill="#10b981" />
      <text x="200" y="48" fontSize="9" textAnchor="middle" fill={STROKE} fontFamily="monospace">E</text>
      {/* fulcrum label */}
      <text x="100" y="108" fontSize="8" textAnchor="middle" fill="#64748b" fontFamily="monospace">{kh ? "ចំណុចទ្រ" : "fulcrum"}</text>
    </svg>
  );
}

function InclinedPlaneDiagram({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 240 110" className="w-full h-auto" role="img" aria-label={kh ? "គំនូរប្លង់ទេរ" : "Inclined plane diagram"}>
      <line x1="10" y1="100" x2="230" y2="100" stroke={STROKE} strokeWidth="1.5" />
      {/* triangle ramp */}
      <polygon points="40,100 210,100 210,40" fill="none" stroke={ACCENT} strokeWidth="2.5" />
      {/* box being pushed up */}
      <rect x="80" y="65" width="22" height="22" fill="none" stroke={STROKE} strokeWidth="2" transform="rotate(-19.5 91 76)" />
      {/* force arrow up the slope */}
      <line x1="60" y1="92" x2="80" y2="73" stroke="#10b981" strokeWidth="2.5" />
      <polygon points="80,73 73,73 75,80" fill="#10b981" />
      {/* angle marker */}
      <path d="M 60 100 A 20 20 0 0 0 70 92" fill="none" stroke="#94a3b8" strokeWidth="1" />
      <text x="74" y="96" fontSize="9" fill="#64748b" fontFamily="monospace">θ</text>
      {/* labels */}
      <text x="120" y="58" fontSize="8" fill="#64748b" fontFamily="monospace" transform="rotate(-19.5 120 58)">{kh ? "ជម្រាល" : "ramp"}</text>
    </svg>
  );
}

function WheelAxleDiagram({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 240 110" className="w-full h-auto" role="img" aria-label={kh ? "គំនូរកង់ និងអ័ក្ស" : "Wheel and axle diagram"}>
      <line x1="10" y1="100" x2="230" y2="100" stroke={STROKE} strokeWidth="1.5" />
      {/* large wheel */}
      <circle cx="120" cy="55" r="38" fill="none" stroke={ACCENT} strokeWidth="2.5" />
      <circle cx="120" cy="55" r="28" fill="none" stroke={ACCENT} strokeWidth="0.8" strokeDasharray="3 3" />
      {/* small axle */}
      <circle cx="120" cy="55" r="9" fill="none" stroke={STROKE} strokeWidth="2" />
      <circle cx="120" cy="55" r="2" fill={STROKE} />
      {/* spokes */}
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const rad = (a * Math.PI) / 180;
        const x1 = 120 + Math.cos(rad) * 9;
        const y1 = 55 + Math.sin(rad) * 9;
        const x2 = 120 + Math.cos(rad) * 38;
        const y2 = 55 + Math.sin(rad) * 38;
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE} strokeWidth="1" />;
      })}
      {/* handle (long arm) */}
      <line x1="120" y1="55" x2="195" y2="22" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      <circle cx="195" cy="22" r="4" fill="#10b981" />
      {/* rope from axle */}
      <line x1="120" y1="64" x2="120" y2="100" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2 2" />
      <rect x="113" y="100" width="14" height="8" fill="none" stroke={STROKE} strokeWidth="1.2" />
      {/* labels */}
      <text x="56" y="55" fontSize="8" textAnchor="middle" fill="#64748b" fontFamily="monospace">{kh ? "កង់" : "wheel"}</text>
      <text x="146" y="80" fontSize="8" fill="#64748b" fontFamily="monospace">{kh ? "អ័ក្ស" : "axle"}</text>
    </svg>
  );
}

function WedgeDiagram({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 240 110" className="w-full h-auto" role="img" aria-label={kh ? "គំនូរកំណល់" : "Wedge diagram"}>
      <line x1="10" y1="100" x2="230" y2="100" stroke={STROKE} strokeWidth="1.5" />
      {/* log being split */}
      <ellipse cx="80" cy="80" rx="36" ry="14" fill="none" stroke={STROKE} strokeWidth="1.5" />
      <ellipse cx="160" cy="80" rx="36" ry="14" fill="none" stroke={STROKE} strokeWidth="1.5" />
      {/* wedge (axe head) — two triangles back to back */}
      <polygon points="120,15 110,75 130,75" fill="none" stroke={ACCENT} strokeWidth="2.5" />
      <line x1="120" y1="15" x2="120" y2="75" stroke={ACCENT} strokeWidth="0.7" strokeDasharray="2 2" />
      {/* downward force arrow */}
      <line x1="120" y1="2" x2="120" y2="14" stroke="#10b981" strokeWidth="2.5" />
      <polygon points="120,14 116,7 124,7" fill="#10b981" />
      {/* sideways force arrows */}
      <line x1="105" y1="60" x2="80" y2="60" stroke="#f43f5e" strokeWidth="2" />
      <polygon points="80,60 86,57 86,63" fill="#f43f5e" />
      <line x1="135" y1="60" x2="160" y2="60" stroke="#f43f5e" strokeWidth="2" />
      <polygon points="160,60 154,57 154,63" fill="#f43f5e" />
    </svg>
  );
}

function ScrewDiagram({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 240 110" className="w-full h-auto" role="img" aria-label={kh ? "គំនូរខ្ចៅ" : "Screw diagram"}>
      <line x1="10" y1="100" x2="230" y2="100" stroke={STROKE} strokeWidth="1.5" />
      {/* screw head (top) — flat slot */}
      <ellipse cx="120" cy="20" rx="34" ry="6" fill="none" stroke={STROKE} strokeWidth="1.8" />
      <line x1="100" y1="20" x2="140" y2="20" stroke={STROKE} strokeWidth="1.5" />
      {/* shaft sides */}
      <line x1="86" y1="20" x2="100" y2="92" stroke={ACCENT} strokeWidth="2" />
      <line x1="154" y1="20" x2="140" y2="92" stroke={ACCENT} strokeWidth="2" />
      {/* threads — diagonal lines simulating helix */}
      {Array.from({ length: 8 }).map((_, i) => {
        const y = 28 + i * 8;
        const xL = 87 + i * 1.6;
        const xR = 153 - i * 1.6;
        return (
          <line key={i} x1={xL} y1={y} x2={xR} y2={y + 4} stroke={ACCENT} strokeWidth="1.2" />
        );
      })}
      {/* tip */}
      <polygon points="100,92 140,92 120,108" fill="none" stroke={ACCENT} strokeWidth="2" />
      {/* rotation arrow at top */}
      <path d="M 160 16 a 14 14 0 1 1 -2 -8" fill="none" stroke="#10b981" strokeWidth="1.8" />
      <polygon points="158,8 165,12 156,14" fill="#10b981" />
      <text x="184" y="20" fontSize="9" fill="#64748b" fontFamily="monospace">{kh ? "បង្វិល" : "turn"}</text>
    </svg>
  );
}

function PulleyDiagram({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 240 110" className="w-full h-auto" role="img" aria-label={kh ? "គំនូររ៉ក" : "Pulley diagram"}>
      <line x1="10" y1="100" x2="230" y2="100" stroke={STROKE} strokeWidth="1.5" />
      {/* support beam */}
      <line x1="40" y1="14" x2="200" y2="14" stroke={STROKE} strokeWidth="2" />
      {/* hook */}
      <line x1="120" y1="14" x2="120" y2="22" stroke={STROKE} strokeWidth="1.5" />
      {/* pulley wheel */}
      <circle cx="120" cy="34" r="14" fill="none" stroke={ACCENT} strokeWidth="2.5" />
      <circle cx="120" cy="34" r="2" fill={STROKE} />
      {/* groove hint */}
      <circle cx="120" cy="34" r="11" fill="none" stroke={ACCENT} strokeWidth="0.8" strokeDasharray="2 2" />
      {/* rope: down left side to load, up right side to hand */}
      <line x1="106" y1="34" x2="106" y2="80" stroke="#64748b" strokeWidth="1.6" />
      <line x1="134" y1="34" x2="134" y2="92" stroke="#64748b" strokeWidth="1.6" />
      {/* load (box) */}
      <rect x="92" y="80" width="28" height="18" fill="none" stroke={STROKE} strokeWidth="2" />
      <text x="106" y="93" fontSize="9" textAnchor="middle" fill={STROKE} fontFamily="monospace">L</text>
      {/* hand pulling down */}
      <circle cx="134" cy="92" r="5" fill="#10b981" />
      <line x1="138" y1="86" x2="148" y2="78" stroke="#10b981" strokeWidth="2" />
      <polygon points="148,78 141,80 144,73" fill="#10b981" />
      <text x="158" y="80" fontSize="9" fill="#64748b" fontFamily="monospace">pull ↓</text>
      {/* result label */}
      <line x1="100" y1="78" x2="92" y2="70" stroke="#f43f5e" strokeWidth="2" />
      <polygon points="92,70 99,72 96,79" fill="#f43f5e" />
      <text x="74" y="68" fontSize="9" fill="#64748b" fontFamily="monospace">lift ↑</text>
    </svg>
  );
}
