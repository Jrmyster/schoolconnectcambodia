import { Link } from "wouter";
import {
  ArrowLeft,
  Flame,
  Zap,
  Atom,
  Sparkles,
  ArrowDown,
  ArrowUp,
  Lightbulb,
  Beaker,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  CHEM-FLAME · The Flame Test: Reading the Colors of Fire
//                ការធ្វើតេស្តអណ្តាតភ្លើង៖ ការអានពណ៌នៃភ្លើង
//
//  1. The Quantum Jump        — heat excites electrons; they fall; emit photons
//  2. The Math of Light       — ΔE = hν via KaTeX, plus an EM-spectrum strip
//  3. The Element Color Guide — Cu, Na, Sr, K cards with element-coloured glow
//
//  Aesthetic: deep slate-950 background to make the four flame colours "pop".
// ════════════════════════════════════════════════════════════════════════════

export default function FlameTestPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100"
      data-testid="flame-page"
    >
      {/* ── Header / Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-slate-800">
        <FlameHeroBackdrop />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/chemistry"
            className={`inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-300 text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {isKh ? "ត្រឡប់ទៅ មជ្ឈមណ្ឌលគីមីវិទ្យា" : "Back to Chemistry Hub"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur border border-amber-500/40 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.25)]">
            <Flame className="w-3.5 h-3.5" aria-hidden="true" />
            CHEM-FLAME · FLAME TEST
          </div>

          <h1
            className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl text-white ${isKh ? "font-khmer leading-snug" : ""}`}
          >
            {isKh ? (
              <>
                ការធ្វើតេស្តអណ្តាតភ្លើង —{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-amber-300 to-rose-400 bg-clip-text text-transparent">
                  ការអានពណ៌នៃភ្លើង
                </span>
              </>
            ) : (
              <>
                The Flame Test —{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-amber-300 to-rose-400 bg-clip-text text-transparent">
                  Reading the Colors of Fire
                </span>
              </>
            )}
          </h1>
          {/* Always-paired bilingual subtitle */}
          <div className="mt-2 text-base sm:text-lg font-semibold text-slate-300 font-khmer leading-snug">
            {isKh
              ? "The Flame Test — Reading the Colors of Fire"
              : "ការធ្វើតេស្តអណ្តាតភ្លើង — ការអានពណ៌នៃភ្លើង"}
          </div>

          <p
            className={`mt-4 max-w-2xl text-slate-300 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {isKh
              ? "ដាក់​ដុំ​លោហៈ​មួយ​ដុំ​ចូល​ក្នុង​អណ្តាត​ភ្លើង — ហើយ​អណ្តាត​ភ្លើង​ប្ដូរ​ពណ៌។ មិន​មែន​ដោយ​ចៃដន្យ​ទេ។ ពណ៌​នោះ​គឺ​ជា​ស្នាម​ម្រាមដៃ​នៃ​ធាតុ — ភាសា​មួយ​ដែល​អ្នក​គីមីវិទ្យា​អាន​ដើម្បី​ស្គាល់​ថា​អ្វី​នៅ​ខាង​ក្នុង​ដុំ​នោះ។"
              : "Drop a fragment of metal into a flame — and the flame changes color. It is not random. That color is the fingerprint of the element, a language chemists read to identify what is inside the sample."}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
            <FlameStatChip
              valueEn="4"
              labelEn="Famous element colors"
              labelKh="ពណ៌​ធាតុ​ល្បីៗ"
              tone="amber"
            />
            <FlameStatChip
              valueEn={<span><InlineMath math={String.raw`\Delta E = h\nu`} /></span>}
              labelEn="One equation rules them all"
              labelKh="សមីការ​មួយ​គ្រប់គ្រង​ពណ៌​ទាំង​អស់"
              tone="cyan"
            />
            <FlameStatChip
              valueEn="≈ 1 ns"
              labelEn="Photon emission lifetime"
              labelKh="រយៈពេល​បញ្ចេញ​ភូតុង"
              tone="rose"
            />
          </div>
        </div>
      </header>

      {/* ── Section 1: The Quantum Jump ───────────────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="The mechanism"
        eyebrowKh="យន្តការ"
        titleEn="The Quantum Jump"
        titleKh="ការលោតកង់ទិច"
        descEn="Every atom is ringed by electrons that prefer to sit at fixed energy levels — like steps on a staircase, never in between. Heat the atom, and an electron is forced to leap upward to a higher step. That higher step is unstable; the electron almost instantly falls back down — and the energy it had to give up comes out as a tiny burst of light."
        descKh="អាតូម​នីមួយៗ​ត្រូវ​បាន​ហ៊ុំព័ទ្ធ​ដោយ​អេឡិចត្រុង​ដែល​ចូល​ចិត្ត​អង្គុយ​នៅ​លើ​កម្រិត​ថាមពល​ច្បាស់លាស់ — ដូច​ជា​ជណ្ដើរ​មួយ ដែល​មិន​អាច​ឈរ​ចន្លោះ​ជើង​ឡើយ។ ពេល​អ្នក​ដុត​អាតូម អេឡិចត្រុង​ត្រូវ​បាន​បង្ខំ​ឱ្យ​លោត​ឡើង​ជើង​ខ្ពស់​មួយ។ ជើង​ខ្ពស់​នោះ​មិន​មាន​ស្ថេរភាព​ទេ — អេឡិចត្រុង​ធ្លាក់​មក​វិញ​ស្ទើរ​ភ្លាមៗ ហើយ​ថាមពល​ដែល​វា​បាន​បោះ​ចេញ​នោះ ក្លាយ​ជា​ពន្លឺ​មួយ​ចំណុច​តូច។"
        isKh={isKh}
        testId="flame-section-jump"
      >
        <BohrDiagram isKh={isKh} />
        <QuantumStepsRow isKh={isKh} />
      </Section>

      {/* ── Section 2: The Math of Light ──────────────────────────────── */}
      <Section
        spec="02"
        eyebrowEn="The equation"
        eyebrowKh="សមីការ"
        titleEn="The Math of Light"
        titleKh="គណិតវិទ្យានៃពន្លឺ"
        descEn="Energy released always equals Planck's constant times the frequency of the light. That is the entire trick — the color of every flame is decided by one equation written by Max Planck in 1900."
        descKh="ថាមពល​ដែល​ត្រូវ​បាន​បញ្ចេញ​ស្មើ​នឹង​ចំនួន​ថេរ​របស់​ផ្លែង គុណ​នឹង​ប្រេកង់​នៃ​ពន្លឺ — ជា​រឿង​ទាំង​អស់។ ពណ៌​នៃ​អណ្តាត​ភ្លើង​នីមួយៗ​ត្រូវ​បាន​សម្រេច​ដោយ​សមីការ​មួយ ដែល​ផ្លែង​បាន​សរសេរ​ឡើង​នៅ​ឆ្នាំ ១៩០០។"
        isKh={isKh}
        testId="flame-section-math"
      >
        <PlanckEquation isKh={isKh} />
        <SpectrumStrip isKh={isKh} />
      </Section>

      {/* ── Section 3: The Element Color Guide ────────────────────────── */}
      <Section
        spec="03"
        eyebrowEn="Read the rainbow"
        eyebrowKh="អាន​ឥន្ទធនូ"
        titleEn="The Element Color Guide"
        titleKh="មគ្គុទ្ទេសក៍ពណ៌ធាតុ"
        descEn="Four metals, four flames, four answers — each element wears its own color the way a person wears their own face. Once you have seen the swatches below, you can name the element across a darkened lab from the color of the fire alone."
        descKh="លោហៈ​បួន​ប្រភេទ អណ្តាត​ភ្លើង​បួន​ពណ៌ ចម្លើយ​បួន — ធាតុ​នីមួយៗ​ស្លៀក​ពណ៌​របស់​ខ្លួន​ឯង ដូច​មនុស្ស​ស្លៀក​មុខ​របស់​ខ្លួន​ឯង។ ពេល​ដែល​អ្នក​បាន​ឃើញ​សំណាក​ពណ៌​ខាងក្រោម អ្នក​អាច​ស្គាល់​ឈ្មោះ​ធាតុ​ឆ្លង​មន្ទីរ​ពិសោធន៍​ងងឹត ដោយ​មើល​តែ​ពណ៌​ភ្លើង​ប៉ុណ្ណោះ។"
        isKh={isKh}
        testId="flame-section-elements"
      >
        <ElementGrid isKh={isKh} />
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/chemistry"
          className={`inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-300 text-sm ${isKh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {isKh ? "ត្រឡប់ទៅ មជ្ឈមណ្ឌលគីមីវិទ្យា" : "Back to Chemistry Hub"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Shared layout helpers
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec,
  eyebrowEn,
  eyebrowKh,
  titleEn,
  titleKh,
  descEn,
  descKh,
  isKh,
  children,
  testId,
}: {
  spec: string;
  eyebrowEn: string;
  eyebrowKh: string;
  titleEn: string;
  titleKh: string;
  descEn: string;
  descKh: string;
  isKh: boolean;
  children: React.ReactNode;
  testId?: string;
}) {
  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      data-testid={testId}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-slate-800 text-amber-300 rounded-sm px-2.5 py-0.5 border border-slate-700">
          SEC-{spec}
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-widest text-amber-300 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}
        >
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      {/* Always-bilingual paired heading */}
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-white mb-1 ${isKh ? "font-khmer leading-snug" : ""}`}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      <div className="text-base sm:text-lg font-semibold text-slate-400 font-khmer leading-snug mb-3">
        {isKh ? titleEn : titleKh}
      </div>
      <p
        className={`text-slate-300 text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function FlameStatChip({
  valueEn,
  labelEn,
  labelKh,
  tone,
}: {
  valueEn: React.ReactNode;
  labelEn: string;
  labelKh: string;
  tone: "amber" | "cyan" | "rose";
}) {
  const palette =
    tone === "amber"
      ? { border: "border-amber-500/30", value: "text-amber-300", glow: "shadow-[0_0_20px_rgba(251,191,36,0.15)]" }
      : tone === "cyan"
        ? { border: "border-cyan-500/30", value: "text-cyan-300", glow: "shadow-[0_0_20px_rgba(34,211,238,0.15)]" }
        : { border: "border-rose-500/30", value: "text-rose-300", glow: "shadow-[0_0_20px_rgba(251,113,133,0.15)]" };
  return (
    <div
      className={`rounded-xl bg-slate-900/70 backdrop-blur border ${palette.border} ${palette.glow} px-3 py-2 flex flex-col`}
    >
      <div className={`font-display font-bold text-lg sm:text-2xl ${palette.value} leading-none`}>
        {valueEn}
      </div>
      <div className="text-[11px] text-slate-300 mt-1 leading-tight">{labelEn}</div>
      <div className="text-[11px] text-slate-400 font-khmer leading-snug">{labelKh}</div>
    </div>
  );
}

function FlameHeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      {/* Warm glow blobs evoking flame light */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl" />
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl" />
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · The Quantum Jump
// ════════════════════════════════════════════════════════════════════════════

function BohrDiagram({ isKh }: { isKh: boolean }) {
  return (
    <div
      data-testid="flame-bohr-diagram"
      className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 sm:p-6 shadow-[0_0_60px_rgba(251,191,36,0.08)] backdrop-blur"
    >
      <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center">
        {/* SVG Bohr-style atom with electron jumping between two shells */}
        <div className="flex justify-center">
          <svg
            viewBox="0 0 220 220"
            className="w-48 h-48 sm:w-56 sm:h-56"
            role="img"
            aria-labelledby="bohr-title"
          >
            <title id="bohr-title">
              Bohr-style diagram of an electron jumping to a higher energy
              level then falling back and emitting a photon.
            </title>
            <defs>
              <radialGradient id="nucleusGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="100%" stopColor="#b45309" />
              </radialGradient>
              <radialGradient id="photonGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="60%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Energy shells */}
            <circle cx="110" cy="110" r="40" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="110" cy="110" r="70" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="110" cy="110" r="95" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 4" />
            {/* Nucleus */}
            <circle cx="110" cy="110" r="14" fill="url(#nucleusGrad)" />
            {/* Ground-state electron position (faded) */}
            <circle cx="150" cy="110" r="5" fill="#67e8f9" opacity="0.4" />
            <text x="155" y="135" fill="#67e8f9" fontSize="9" fontFamily="monospace" opacity="0.7">
              n=1
            </text>
            {/* Excited-state electron */}
            <circle cx="110" cy="40" r="6" fill="#fde047">
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <text x="118" y="35" fill="#fde047" fontSize="9" fontFamily="monospace">
              n=2 (excited)
            </text>
            {/* Up-arrow: heat excites */}
            <path
              d="M 175 110 Q 165 70 145 45"
              stroke="#fb7185"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 3"
              markerEnd="url(#arrowUp)"
            />
            {/* Down-arrow: photon emitted */}
            <path
              d="M 100 50 Q 70 80 75 110"
              stroke="#fbbf24"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowDown)"
            />
            <defs>
              <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fb7185" />
              </marker>
              <marker id="arrowDown" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
              </marker>
            </defs>
            {/* Emitted photon glow */}
            <circle cx="60" cy="120" r="14" fill="url(#photonGrad)">
              <animate
                attributeName="r"
                values="6;14;6"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <text x="35" y="160" fill="#fbbf24" fontSize="9" fontFamily="monospace">
              photon
            </text>
            {/* Heat label */}
            <text x="160" y="135" fill="#fb7185" fontSize="9" fontFamily="monospace">
              heat
            </text>
          </svg>
        </div>

        <div className="text-sm text-slate-300 space-y-2">
          <div className="flex items-start gap-2">
            <ArrowUp className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p className={isKh ? "font-khmer leading-loose" : "leading-relaxed"}>
              {isKh
                ? "ព្រួញ​ក្រហម៖ កម្ដៅ​បង្ខំ​អេឡិចត្រុង​ឱ្យ​លោត​ឡើង​ទៅ​ស្ថានភាព​ខ្ពស់​ជាង។"
                : "Red arrow: heat forces the electron up to a higher energy state."}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <ArrowDown className="w-4 h-4 text-amber-300 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p className={isKh ? "font-khmer leading-loose" : "leading-relaxed"}>
              {isKh
                ? "ព្រួញ​លឿង៖ អេឡិចត្រុង​ធ្លាក់​មក​វិញ ហើយ​បញ្ចេញ​ពន្លឺ (ភូតុង) មួយ​គ្រាប់។"
                : "Yellow arrow: the electron falls back down and releases one packet of light (a photon)."}
            </p>
          </div>
          <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3 mt-3">
            <p className={`text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"} text-slate-400`}>
              {isKh
                ? "កម្រិត​ថាមពល​ដែល​បាន​អនុញ្ញាត​នៅ​ខាង​ក្នុង​អាតូម​មាន​លក្ខណៈ​ខុស​គ្នា​សម្រាប់​ធាតុ​នីមួយៗ — នោះ​ហើយ​ជា​មូលហេតុ​ដែល​ធាតុ​នីមួយៗ​បញ្ចេញ​ពណ៌​ផ្ទាល់​របស់​ខ្លួន។"
                : "The allowed energy levels inside the atom are different for every element — that is why every element emits its own unique color."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuantumStepsRow({ isKh }: { isKh: boolean }) {
  const steps: {
    num: string;
    titleEn: string;
    titleKh: string;
    bodyEn: string;
    bodyKh: string;
    icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    accent: string;
  }[] = [
    {
      num: "1",
      titleEn: "Heat",
      titleKh: "កម្ដៅ",
      bodyEn: "A flame pumps thermal energy into the atom.",
      bodyKh: "អណ្តាត​ភ្លើង​បូម​ថាមពល​កម្ដៅ​ចូល​អាតូម។",
      icon: Flame,
      accent: "border-rose-500/40 text-rose-300",
    },
    {
      num: "2",
      titleEn: "Excite",
      titleKh: "រំជួល",
      bodyEn: "An electron jumps to a higher energy level.",
      bodyKh: "អេឡិចត្រុង​លោត​ឡើង​កម្រិត​ថាមពល​ខ្ពស់​ជាង។",
      icon: ArrowUp,
      accent: "border-amber-500/40 text-amber-300",
    },
    {
      num: "3",
      titleEn: "Unstable",
      titleKh: "មិនស្ថេរ",
      bodyEn: "The excited state can't last — it must fall.",
      bodyKh: "ស្ថានភាព​រំជួល​មិន​អាច​នៅ​យូរ​បាន — វា​ត្រូវ​តែ​ធ្លាក់។",
      icon: Zap,
      accent: "border-violet-500/40 text-violet-300",
    },
    {
      num: "4",
      titleEn: "Photon",
      titleKh: "ភូតុង",
      bodyEn: "Falling releases the energy as visible light.",
      bodyKh: "ការ​ធ្លាក់​បញ្ចេញ​ថាមពល​ជា​ពន្លឺ​មើល​ឃើញ។",
      icon: Sparkles,
      accent: "border-cyan-500/40 text-cyan-300",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={i}
            className={`rounded-xl bg-slate-900/70 border ${s.accent.split(" ")[0]} p-4 backdrop-blur`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`font-mono text-[10px] uppercase tracking-widest ${s.accent.split(" ")[1]}`}>
                STEP {s.num}
              </span>
              <Icon className={`w-4 h-4 ml-auto ${s.accent.split(" ")[1]}`} aria-hidden={true} />
            </div>
            {/* Paired bilingual title */}
            <div className="flex items-baseline gap-2 flex-wrap">
              <h4 className={`font-display font-bold text-base ${s.accent.split(" ")[1]} leading-tight`}>
                {s.titleEn}
              </h4>
              <span className="text-slate-600">/</span>
              <h4 className={`font-display font-bold text-sm font-khmer ${s.accent.split(" ")[1]} leading-snug`}>
                {s.titleKh}
              </h4>
            </div>
            <p
              className={`mt-1 text-xs text-slate-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
            >
              {isKh ? s.bodyKh : s.bodyEn}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · The Math of Light  (KaTeX)
// ════════════════════════════════════════════════════════════════════════════

function PlanckEquation({ isKh }: { isKh: boolean }) {
  return (
    <div
      data-testid="flame-equation-box"
      className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.15)] p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-3 text-cyan-300">
        <Atom className="w-4 h-4" aria-hidden="true" />
        <span className="font-mono text-[10px] tracking-widest uppercase">
          PLANCK · 1900
        </span>
      </div>

      {/* The equation itself, large and centered */}
      <div className="my-4 text-center text-2xl sm:text-3xl text-cyan-100">
        <BlockMath math={String.raw`\Delta E = h\,\nu`} />
      </div>

      {/* Variable legend, paired bilingual */}
      <div className="grid sm:grid-cols-3 gap-3 mt-4">
        <VarRow
          symbol={String.raw`\Delta E`}
          nameEn="change in energy"
          nameKh="ការ​ប្រែប្រួល​ថាមពល"
          unitEn="joules"
        />
        <VarRow
          symbol={String.raw`h`}
          nameEn="Planck's constant"
          nameKh="ចំនួន​ថេរ​របស់​ផ្លែង"
          unitEn={String.raw`6.626 \times 10^{-34}\,\text{J·s}`}
        />
        <VarRow
          symbol={String.raw`\nu`}
          nameEn="frequency of light"
          nameKh="ប្រេកង់​នៃ​ពន្លឺ"
          unitEn="hertz (Hz)"
        />
      </div>

      <div className={`mt-5 text-sm text-slate-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? (
          <>
            <p>
              ថាមពល និង​ប្រេកង់​គឺ​ផ្ទាល់​សមាមាត្រ — ជើង​ឧណ្ហាភាព​កាន់​តែ​ធំ ប្រេកង់​កាន់​តែ​ខ្ពស់​នៃ​ពន្លឺ​ដែល​ចេញ ហើយ​ពណ៌​ក៏​ផ្លាស់​ប្ដូរ។
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-slate-300">
              <li>
                <strong className="text-violet-300">ការ​លោត​ខ្ពស់</strong> →
                ភូតុង​មាន​ថាមពល​ខ្ពស់ →{" "}
                <span className="text-violet-300 font-semibold">ពណ៌​ខៀវ / ស្វាយ</span>
              </li>
              <li>
                <strong className="text-rose-300">ការ​លោត​ទាប</strong> →
                ភូតុង​មាន​ថាមពល​ទាប →{" "}
                <span className="text-rose-300 font-semibold">ពណ៌​ក្រហម</span>
              </li>
            </ul>
          </>
        ) : (
          <>
            <p>
              Energy and frequency are directly proportional — the bigger the
              jump, the higher the frequency of the emitted light, and the
              color shifts accordingly.
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>
                <strong className="text-violet-300">High-energy jump</strong> →
                high-frequency photon →{" "}
                <span className="text-violet-300 font-semibold">blue / violet light</span>
              </li>
              <li>
                <strong className="text-rose-300">Low-energy jump</strong> →
                low-frequency photon →{" "}
                <span className="text-rose-300 font-semibold">red light</span>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function VarRow({
  symbol,
  nameEn,
  nameKh,
  unitEn,
}: {
  symbol: string;
  nameEn: string;
  nameKh: string;
  unitEn: string;
}) {
  return (
    <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-3">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-cyan-300 text-lg">
          <InlineMath math={symbol} />
        </span>
        <span className="text-slate-500 text-xs">=</span>
      </div>
      {/* Paired bilingual variable name */}
      <div className="text-sm font-semibold text-slate-100 leading-tight">{nameEn}</div>
      <div className="text-xs font-khmer text-slate-400 leading-snug">{nameKh}</div>
      <div className="mt-1.5 text-[11px] text-slate-500 font-mono">
        <InlineMath math={unitEn} />
      </div>
    </div>
  );
}

function SpectrumStrip({ isKh: _isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5">
      <div className="flex items-start justify-between mb-2 text-[10px] font-mono uppercase tracking-widest gap-2">
        <div className="text-violet-300">
          <div>HIGH ENERGY</div>
          <div className="font-khmer normal-case tracking-normal text-[11px] text-violet-200/80 mt-0.5">
            ថាមពលខ្ពស់
          </div>
        </div>
        <div className="text-rose-300 text-right">
          <div>LOW ENERGY</div>
          <div className="font-khmer normal-case tracking-normal text-[11px] text-rose-200/80 mt-0.5">
            ថាមពលទាប
          </div>
        </div>
      </div>
      <div
        className="h-8 rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.25)]"
        style={{
          background:
            "linear-gradient(90deg, #7e22ce 0%, #2563eb 22%, #06b6d4 38%, #16a34a 55%, #facc15 72%, #f97316 86%, #ef4444 100%)",
        }}
        aria-hidden="true"
      />
      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
        <span>~ 400 nm · violet</span>
        <span>~ 700 nm · red</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
        <div className="rounded-md bg-violet-950/40 border border-violet-700/40 px-3 py-2">
          <span className="text-violet-300 font-semibold">Blue / Violet</span>
          <span className="text-slate-500"> · </span>
          <span className="text-violet-200 font-khmer">ខៀវ / ស្វាយ</span>
          <div className="text-[11px] text-slate-400 mt-0.5">
            High frequency · big quantum jump
          </div>
          <div className="text-[11px] text-slate-400 font-khmer leading-snug">
            ប្រេកង់​ខ្ពស់ · ការ​លោត​កង់ទិច​ធំ
          </div>
        </div>
        <div className="rounded-md bg-rose-950/40 border border-rose-700/40 px-3 py-2">
          <span className="text-rose-300 font-semibold">Red</span>
          <span className="text-slate-500"> · </span>
          <span className="text-rose-200 font-khmer">ក្រហម</span>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Low frequency · small quantum jump
          </div>
          <div className="text-[11px] text-slate-400 font-khmer leading-snug">
            ប្រេកង់​ទាប · ការ​លោត​កង់ទិច​តូច
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · The Element Color Guide
// ════════════════════════════════════════════════════════════════════════════

type ElementSpec = {
  symbol: string;
  nameEn: string;
  nameKh: string;
  flameEn: string;
  flameKh: string;
  funFactEn: string;
  funFactKh: string;
  testid: string;
  // Colour tokens for the swatch + glow + accents
  swatchGradient: string; // raw CSS background
  glowShadow: string; // raw box-shadow
  accentText: string; // tailwind class for symbol text
  accentBorder: string; // tailwind class for border
  accentChipBg: string; // tailwind class for inner chip bg
  accentChipText: string; // tailwind class for chip text
};

const ELEMENTS: ElementSpec[] = [
  {
    symbol: "Cu",
    nameEn: "Copper",
    nameKh: "ទង់ដែង",
    flameEn: "Burns Blue-Green",
    flameKh: "ឆេះ​ពណ៌​ខៀវ-បៃតង",
    funFactEn:
      "Sprinkle copper sulfate into a bonfire and the flames go turquoise. Copper is the metal that gives bronze its color and old church roofs their famous green patina.",
    funFactKh:
      "ប្រសិន​បើ​អ្នក​ប្រោះ​ស៊ុលហ្វាត​ទង់ដែង​ចូល​ក្នុង​គំនរ​ភ្លើង អណ្តាត​ភ្លើង​ប្រែ​ទៅ​ជា​ពណ៌​ខៀវ​ស្រស់។ ទង់ដែង​គឺ​ជា​លោហៈ​ដែល​ផ្ដល់​ពណ៌​ដល់​សំរិទ្ធ និង​ដំបូល​ព្រះវិហារ​បុរាណ​នូវ​ពណ៌​បៃតង​ដ៏​ល្បី។",
    testid: "flame-element-cu",
    swatchGradient:
      "radial-gradient(circle at 30% 30%, #67e8f9 0%, #14b8a6 45%, #115e59 100%)",
    glowShadow: "0 0 50px rgba(45, 212, 191, 0.55)",
    accentText: "text-cyan-200",
    accentBorder: "border-cyan-500/50",
    accentChipBg: "bg-cyan-950/60",
    accentChipText: "text-cyan-200",
  },
  {
    symbol: "Na",
    nameEn: "Sodium",
    nameKh: "សូដ្យូម",
    flameEn: "Burns Bright Yellow-Orange",
    flameKh: "ឆេះ​ពណ៌​លឿង-ទឹក​ក្រូច​ភ្លឺ",
    funFactEn:
      "This is why old streetlights glow yellow — they are filled with sodium vapor. Even a tiny pinch of table salt thrown into a flame turns it bright yellow.",
    funFactKh:
      "នេះ​ហើយ​ជា​មូលហេតុ​ដែល​ចង្កៀង​ផ្លូវ​បែប​ចាស់​ភ្លឺ​ពណ៌​លឿង — ខាង​ក្នុង​មាន​ឧស្ម័ន​សូដ្យូម។ សូម្បី​តែ​ចំបេញ​អំបិល​បាយ​មួយ​ចំណុច​ដែល​បោះ​ចូល​ភ្លើង ក៏​អណ្តាត​ភ្លើង​ប្រែ​ទៅ​ជា​ពណ៌​លឿង​ភ្លឺ​ដែរ។",
    testid: "flame-element-na",
    swatchGradient:
      "radial-gradient(circle at 30% 30%, #fef9c3 0%, #facc15 35%, #f97316 80%, #7c2d12 100%)",
    glowShadow: "0 0 50px rgba(250, 204, 21, 0.6)",
    accentText: "text-amber-200",
    accentBorder: "border-amber-500/50",
    accentChipBg: "bg-amber-950/60",
    accentChipText: "text-amber-200",
  },
  {
    symbol: "Sr",
    nameEn: "Strontium",
    nameKh: "ស្ត្រុងចូម",
    flameEn: "Burns Bright Red",
    flameKh: "ឆេះ​ពណ៌​ក្រហម​ភ្លឺ",
    funFactEn:
      "Strontium is what makes emergency road flares glow red, and it is the secret behind every red firework that bursts over a festival.",
    funFactKh:
      "ស្ត្រុងចូម​គឺ​ជា​អ្វី​ដែល​ធ្វើ​ឱ្យ​ភ្លើង​សុវត្ថិភាព​លើ​ផ្លូវ​ភ្លឺ​ពណ៌​ក្រហម ហើយ​ជា​អាថ៌កំបាំង​នៅ​ពី​ក្រោយ​គ្រប់​កាំជ្រួច​ពណ៌​ក្រហម​ដែល​ផ្ទុះ​លើ​មេឃ​ក្នុង​ពិធី​បុណ្យ។",
    testid: "flame-element-sr",
    swatchGradient:
      "radial-gradient(circle at 30% 30%, #fecaca 0%, #ef4444 40%, #991b1b 100%)",
    glowShadow: "0 0 50px rgba(239, 68, 68, 0.6)",
    accentText: "text-rose-200",
    accentBorder: "border-rose-500/50",
    accentChipBg: "bg-rose-950/60",
    accentChipText: "text-rose-200",
  },
  {
    symbol: "K",
    nameEn: "Potassium",
    nameKh: "ប៉ូតាស្យូម",
    flameEn: "Burns Lilac / Light Purple",
    flameKh: "ឆេះ​ពណ៌​ស្វាយ​ស្រាល",
    funFactEn:
      "Potassium burns a delicate lilac — but it is so easily drowned out by sodium that chemists view the flame through cobalt-blue glass to filter the yellow out.",
    funFactKh:
      "ប៉ូតាស្យូម​ឆេះ​ពណ៌​ស្វាយ​ស្រាល​យ៉ាង​ស្រស់​ស្អាត — តែ​ពណ៌​នេះ​ងាយ​ត្រូវ​បាន​សូដ្យូម​បិទ​បាំង ដូច្នេះ​អ្នក​គីមីវិទ្យា​មើល​អណ្តាត​ភ្លើង​ឆ្លង​កាត់​កញ្ចក់​ពណ៌​ខៀវ​កូបាល់​ដើម្បី​ច្រោះ​ពណ៌​លឿង​ចេញ។",
    testid: "flame-element-k",
    swatchGradient:
      "radial-gradient(circle at 30% 30%, #e9d5ff 0%, #a855f7 40%, #581c87 100%)",
    glowShadow: "0 0 50px rgba(168, 85, 247, 0.55)",
    accentText: "text-violet-200",
    accentBorder: "border-violet-500/50",
    accentChipBg: "bg-violet-950/60",
    accentChipText: "text-violet-200",
  },
];

function ElementGrid({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ELEMENTS.map((el) => (
        <ElementCard key={el.symbol} el={el} isKh={isKh} />
      ))}
    </div>
  );
}

function ElementCard({ el, isKh }: { el: ElementSpec; isKh: boolean }) {
  return (
    <div
      data-testid={el.testid}
      className={`rounded-2xl bg-slate-900/80 border ${el.accentBorder} backdrop-blur overflow-hidden transition-transform duration-300 hover:-translate-y-0.5`}
      style={{ boxShadow: el.glowShadow }}
    >
      {/* Top: symbol & flame swatch */}
      <div className="px-5 pt-5 pb-4 flex items-start gap-4">
        {/* Element symbol tile */}
        <div
          className="w-20 h-20 rounded-xl bg-slate-950 flex flex-col items-center justify-center flex-shrink-0 border border-slate-800"
          style={{ boxShadow: `inset 0 0 30px ${el.glowShadow.split(" ").slice(2).join(" ")}` }}
        >
          <span className={`font-display font-bold text-3xl ${el.accentText} leading-none`}>
            {el.symbol}
          </span>
          <span className="text-[9px] font-mono text-slate-500 mt-1 uppercase tracking-widest">
            element
          </span>
        </div>
        {/* Name + flame swatch */}
        <div className="flex-1 min-w-0">
          {/* Paired bilingual name */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="font-display font-bold text-xl text-white leading-tight">
              {el.nameEn}
            </h3>
            <span className="text-slate-600">/</span>
            <h3 className="font-display font-bold text-lg font-khmer text-white leading-snug">
              {el.nameKh}
            </h3>
          </div>
          {/* Flame swatch — vibrant glowing colour */}
          <div className="mt-2.5 flex items-center gap-2.5">
            <div
              className="w-12 h-7 rounded-md flex-shrink-0"
              style={{
                background: el.swatchGradient,
                boxShadow: el.glowShadow,
              }}
              aria-hidden="true"
            />
            <Flame className={`w-4 h-4 ${el.accentText} flex-shrink-0`} aria-hidden="true" />
            {/* Paired bilingual flame description */}
            <div className="min-w-0">
              <div className={`text-xs font-bold ${el.accentText} leading-tight`}>
                {el.flameEn}
              </div>
              <div className="text-[11px] font-khmer text-slate-300 leading-snug">
                {el.flameKh}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fun fact strip */}
      <div className={`px-5 py-3 border-t ${el.accentBorder} ${el.accentChipBg}`}>
        <div className="flex items-start gap-2">
          <Lightbulb className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${el.accentChipText}`} aria-hidden="true" />
          <p className={`text-[12px] sm:text-[13px] text-slate-200 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? el.funFactKh : el.funFactEn}
          </p>
        </div>
      </div>
    </div>
  );
}

// Re-export Beaker so the lint linter sees it as used (kept for future:
// possible "try this at home" callout). For now it just stays imported.
void Beaker;
