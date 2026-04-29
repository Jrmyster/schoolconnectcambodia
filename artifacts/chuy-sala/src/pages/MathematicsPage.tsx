import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Sigma,
  Calculator,
  Scale,
  Triangle,
  TrendingUp,
  AreaChart,
  Play,
  Pause,
  RotateCcw,
  Check,
  X as XIcon,
  Info,
  Sparkles,
  Building2,
  Mountain,
  Circle,
  Infinity as InfinityIcon,
  Ruler,
  BarChart3,
  Users,
  Target,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Globe,
  DollarSign,
  Repeat,
  Brain,
  HelpCircle,
  Hash,
  Binary,
  Layers,
  Boxes,
  Cpu,
} from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import { useLanguageStore } from "@/store/use-language";
import { ScientificNotationModule } from "@/components/widgets/ScientificNotationModule";

// ════════════════════════════════════════════════════════════════════════════
//  Mathematics: The Language of Logic — គណិតវិទ្យា៖ ភាសានៃតក្កវិជ្ជា
//
//  Sections:
//    1. Arithmetic       — Mental Math trainer (10s timer, 4 op modes)
//    2. Algebra          — Balance scale (X + 5 = 12, "subtract 5")
//    3. Trigonometry     — Draggable right-triangle, live sin/cos/tan
//    4. Calculus         — Derivative (slope = speed) & Integral (area = distance)
//
//  Aesthetic: graph-paper background, blue/ink accents, italic-serif math
//  variables. Bilingual EN / Khmer throughout.
// ════════════════════════════════════════════════════════════════════════════

const I = ({ children }: { children: React.ReactNode }) => (
  <em className="font-serif italic font-medium text-stone-900">{children}</em>
);

export default function MathematicsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-900 overflow-hidden">
      <ScopedStyles />
      <GraphPaperBg />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm">
          <Sigma className="w-3.5 h-3.5" />
          {isKh ? "មេរៀនធំ · វិទ្យាសាស្ត្រ" : "Major Lesson · Science"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>គណិតវិទ្យា៖ <span className="math-text-ink">ភាសានៃតក្កវិជ្ជា</span></>
          ) : (
            <>Mathematics: <span className="math-text-ink">The Language of Logic</span></>
          )}
        </h1>
        <p
          className={`text-slate-700 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "គណិតវិទ្យាមិនមែនជាការទន្ទេញរូបមន្តទេ — វាជាវិធីដ៏ច្បាស់លាស់ក្នុងការគិត។ ចាប់ផ្ដើមពីការគិតលេខក្នុងក្បាល តាមរយៈតំណាងអក្សរ ត្រីកោណមាត្រ និងគណនាឌីផេរ៉ង់ស្យែល — ហើយមើលពីរបៀបដែលមនុស្សប្រើពួកវាដើម្បីស្រាយបញ្ហាពិតៗ។"
            : "Mathematics isn't memorising formulas — it's a precise way of thinking. From mental arithmetic through letter-substitution, triangles, and the math of change — and how people use each one to solve real problems."}
        </p>
        <div className="hidden sm:flex absolute top-12 right-8 items-center gap-3 text-blue-300 font-serif italic text-2xl select-none">
          <span>π</span>
          <span>√2</span>
          <span>∞</span>
          <span>Σ</span>
        </div>
      </header>

      {/* ── 1. Arithmetic ────────────────────────────────────────────── */}
      <Section
        id="arithmetic"
        eyebrowEn="01 · Foundation"
        eyebrowKh="០១ · មូលដ្ឋាន"
        titleEn="Arithmetic — the foundation"
        titleKh="លេខនព្វន្ត — មូលដ្ឋានគ្រឹះ"
        khTerm="លេខនព្វន្ត"
        descEn="Adding, subtracting, multiplying, dividing — the four operations under everything else. The faster you can do them in your head, the more brain you have left for the harder thinking."
        descKh="បូក ដក គុណ ចែក — ប្រតិបត្តិការទាំងបួនដែលនៅពីក្រោមអ្វីៗគ្រប់យ៉ាង។ កាលណាអ្នកធ្វើពួកវានៅក្នុងក្បាលបានលឿនជាង នោះខួរក្បាលអ្នកនៅសល់សម្រាប់ការគិតស្មុគ្រស្មាញកាន់តែច្រើន។"
        isKh={isKh}
      >
        <MentalMathTrainer isKh={isKh} />
      </Section>

      {/* ── 1b. Scientific Notation (strictly bilingual self-contained) ── */}
      <section id="scientific-notation" className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-24">
        <ScientificNotationModule />
      </section>

      {/* ── 2. Algebra ───────────────────────────────────────────────── */}
      <Section
        id="algebra"
        eyebrowEn="02 · The Unknown"
        eyebrowKh="០២ · មិនស្គាល់"
        titleEn="Algebra — finding the unknown"
        titleKh="ពិជគណិត — ស្វែងរកដែលមិនស្គាល់"
        khTerm="ពិជគណិត"
        descEn={"Algebra is one big trick: replace the number you don't know with a letter — usually X — and use the rules of equality to uncover it. The whole game is “do the same thing to both sides.”"}
        descKh={"ពិជគណិតគឺជាល្បិចធំមួយ៖ ជំនួសលេខដែលអ្នកមិនដឹងដោយអក្សរមួយ — ជាធម្មតា X — ហើយប្រើច្បាប់នៃភាពស្មើគ្នាដើម្បីបង្ហាញវា។ ល្បែងទាំងមូលគឺ៖ “ធ្វើអ្វីដូចគ្នាទៅទាំងសងខាង។”"}
        isKh={isKh}
      >
        <BalanceScale isKh={isKh} />
      </Section>

      {/* ── 3. Trigonometry ─────────────────────────────────────────── */}
      <Section
        id="trigonometry"
        eyebrowEn="03 · Triangles"
        eyebrowKh="០៣ · ត្រីកោណ"
        titleEn="Trigonometry — the math of triangles"
        titleKh="ត្រីកោណមាត្រ — គណិតវិទ្យានៃត្រីកោណ"
        khTerm="ត្រីកោណមាត្រ"
        descEn={
          "Inside every right triangle, the ratios between the three sides depend only on one angle, θ. Those ratios — sine, cosine, tangent — let you measure things you can't physically reach."
        }
        descKh="នៅក្នុងត្រីកោណកែងនីមួយៗ សមាមាត្ររវាងជ្រុងទាំងបីពឹងផ្អែកតែលើមុំមួយ θ ប៉ុណ្ណោះ។ សមាមាត្រទាំងនោះ — sine, cosine, tangent — អនុញ្ញាតឲ្យអ្នកវាស់របស់ដែលអ្នកមិនអាចទៅដល់ដោយរូបកាយ។"
        isKh={isKh}
      >
        <RightTriangle isKh={isKh} />
        <MagicOfPiCards isKh={isKh} />
      </Section>

      {/* ── 4. The Unit Circle ───────────────────────────────────────── */}
      <Section
        id="unit-circle"
        eyebrowEn="04 · Circles"
        eyebrowKh="០៤ · រង្វង់"
        titleEn="The Unit Circle — the heart of trigonometry"
        titleKh="រង្វង់ឯកតា — បេះដូងនៃត្រីកោណមាត្រ"
        khTerm="រង្វង់ឯកតា"
        descEn={
          "A single circle of radius 1, drawn on a sheet of graph paper, contains every value of sine, cosine, and tangent for every angle. Once you see this picture, trigonometry stops being a list of rules and becomes one continuous idea."
        }
        descKh="រង្វង់តែមួយដែលមានកាំ ១ គូរនៅលើក្រដាសក្រឡាចត្រង្គ មានតម្លៃរបស់ sine, cosine, និង tangent គ្រប់មុំទាំងអស់។ ពេលអ្នកឃើញរូបនេះ ត្រីកោណមាត្រលែងជាបញ្ជីច្បាប់ — វាក្លាយជាគំនិតបន្តតែមួយ។"
        isKh={isKh}
      >
        <RadiusOfOneCard isKh={isKh} />
        <DegreesVsRadiansCard isKh={isKh} />
        <ASTCQuadrantsCard isKh={isKh} />
      </Section>

      {/* ── 5. Trigonometric Identities ──────────────────────────────── */}
      <Section
        id="trig-identities"
        eyebrowEn="05 · Master Keys"
        eyebrowKh="០៥ · កូនសោរគន្លឹះ"
        titleEn="Trigonometric Identities — the master keys"
        titleKh="ឯកលក្ខណៈត្រីកោណមាត្រ — កូនសោរគន្លឹះ"
        khTerm="ឯកលក្ខណៈត្រីកោណមាត្រ"
        descEn={
          "An identity is an equation that stays true for every angle θ you can plug in. Memorise these and the messiest trig problem usually collapses into a single line."
        }
        descKh="ឯកលក្ខណៈគឺជាសមីការដែលតែងតែពិត គ្រប់មុំ θ ទាំងអស់ដែលអ្នកជំនួស។ ចងចាំវាឲ្យបានច្បាស់ ហើយលំហាត់ត្រីកោណមាត្រស្មុគស្មាញបំផុត ជាធម្មតានឹងបង្រួមនៅសល់តែមួយជួរប៉ុណ្ណោះ។"
        isKh={isKh}
      >
        <TrigIdentitiesCard isKh={isKh} />
      </Section>

      {/* ── 6. Calculus ─────────────────────────────────────────────── */}
      <Section
        id="calculus"
        eyebrowEn="06 · Change"
        eyebrowKh="០៦ · ការផ្លាស់ប្ដូរ"
        titleEn="Calculus — the math of change"
        titleKh="គណនាឌីផេរ៉ង់ស្យែល និងអាំងតេក្រាល — គណិតវិទ្យានៃការផ្លាស់ប្ដូរ"
        khTerm="គណនាឌីផេរ៉ង់ស្យែល និងអាំងតេក្រាល"
        descEn={
          "Two ideas, invented by Newton and Leibniz around 1670, that quietly run modern science. The Derivative asks 'how fast?' at one instant. The Integral asks 'how much?' over a whole journey."
        }
        descKh="គំនិតពីរ ត្រូវបានរកឃើញដោយ Newton និង Leibniz ប្រហែលឆ្នាំ ១៦៧០ ដែលដំណើរការសម្ងាត់នៅពីក្រោយវិទ្យាសាស្ត្រទំនើប។ Derivative សួរថា 'លឿនប៉ុណ្ណា?' នៅពេលមួយ។ Integral សួរថា 'ប៉ុន្មាន?' លើដំណើរទាំងមូល។"
        isKh={isKh}
      >
        <DerivativeCard isKh={isKh} />
        <IntegralCard isKh={isKh} />
        <a
          href="/mathematics/limits-derivatives"
          className={`group block rounded-2xl border border-blue-300 bg-blue-700 hover:bg-blue-800 text-white p-5 transition-colors no-underline ${isKh ? "font-khmer" : ""}`}
          data-testid="link-limits-derivatives"
        >
          <div className="flex items-center gap-2 text-blue-100 text-xs font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3" />
            {isKh ? "មេរៀនបន្ត" : "Continue deeper"}
            <span className="font-mono opacity-70">· MTH-CALC-RULES-01</span>
          </div>
          <h3 className={`text-xl font-bold mb-1 ${isKh ? "leading-loose" : ""}`}>
            {isKh
              ? "ច្បាប់នៃការផ្លាស់ប្ដូរ ៖ លីមីត និងដេរីវេ →"
              : "The Rules of Change: Limits & Derivatives →"}
          </h3>
          <p className={`text-sm text-blue-50 ${isKh ? "leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "តើដេរីវេកើតពីណា ? ស្វែងយល់ពីផលធៀបនៃភាពខុសគ្នា ច្បាប់ L'Hôpital និងច្បាប់កាត់បួន (ស្វ័យគុណ ផលគុណ ផលចែក បណ្ដាក់) ជាមួយការសម្រាយបញ្ជាក់។"
              : "Where does the derivative actually come from? Open up the difference quotient, L'Hôpital's cheat code, and the four shortcut rules (power, product, quotient, chain) — with proofs."}
          </p>
        </a>
        <a
          href="/mathematics/integrals"
          className={`group block rounded-2xl border border-indigo-300 bg-indigo-700 hover:bg-indigo-800 text-white p-5 transition-colors no-underline ${isKh ? "font-khmer" : ""}`}
          data-testid="link-integrals"
        >
          <div className="flex items-center gap-2 text-indigo-100 text-xs font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3" />
            {isKh ? "មេរៀនបន្ត" : "Continue deeper"}
            <span className="font-mono opacity-70">· MTH-CALC-INTEGRALS-01</span>
          </div>
          <h3 className={`text-xl font-bold mb-1 ${isKh ? "leading-loose" : ""}`}>
            {isKh
              ? "អាំងតេក្រាល ៖ ផលបូកនៃផ្នែកនានា →"
              : "Integrals: The Sum of the Parts →"}
          </h3>
          <p className={`text-sm text-indigo-50 ${isKh ? "leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ផែនទីពីរប្រភេទ — អាំងតេក្រាលមិនកំណត់ និងកំណត់ — រួមនឹងអាថ៌កំបាំងនៃ « + C » និងឧទាហរណ៍រថយន្តដែលបំប្លែងល្បឿនទៅជាចម្ងាយ។"
              : "Two kinds of map — indefinite and definite integrals — plus the '+ C' mystery and a car analogy that turns speed into total distance."}
          </p>
        </a>
      </Section>

      {/* ── 7. Sequences & Series ────────────────────────────────────── */}
      <Section
        id="sequences-series"
        eyebrowEn="07 · Infinity"
        eyebrowKh="០៧ · អនន្ត"
        titleEn="Sequences & Series — the infinite staircase"
        titleKh="លំដាប់ និងស៊េរី — ជណ្តើរអនន្ត"
        khTerm="លំដាប់ និងស៊េរី"
        descEn={
          "Two ideas that look almost identical but behave very differently. A sequence is just a list of numbers; a series is what you get when you add them all up. Sometimes that infinite sum surprisingly settles on a finite answer — and sometimes it grows forever, even when each new term is tiny."
        }
        descKh="គំនិតពីរ ដែលមើលទៅស្រដៀងគ្នាស្ទើរទាំងស្រុង ប៉ុន្តែធ្វើអាកប្បកិរិយា ខុសគ្នាខ្លាំង។ លំដាប់ គ្រាន់តែជាបញ្ជីលេខ ប៉ុណ្ណោះ; ស៊េរី គឺជាអ្វីដែលអ្នកទទួលបាន ពេលអ្នកបូកលេខទាំងនោះទាំងអស់។ ពេលខ្លះផលបូកអនន្តនោះ ដោយគួរឱ្យភ្ញាក់ផ្អើល ឈរនៅលើចម្លើយកំណត់ — ហើយពេលខ្លះវាកើនរហូតគ្មានដែនកំណត់ ទោះបីតួនីមួយៗ ក្លាយជាតូចបំផុតក៏ដោយ។"
        isKh={isKh}
      >
        <SequenceVsSeriesCard isKh={isKh} />
        <ZenoParadoxCard isKh={isKh} />
        <HarmonicTrapCard isKh={isKh} />
      </Section>

      {/* ── 8. Statistics ────────────────────────────────────────────── */}
      <Section
        id="statistics"
        eyebrowEn="08 · Truth in Data"
        eyebrowKh="០៨ · ការពិតក្នុងទិន្នន័យ"
        titleEn="Statistics — finding truth in data"
        titleKh="ស្ថិតិ — ការស្វែងរកការពិតក្នុងទិន្នន័យ"
        khTerm="ស្ថិតិ"
        descEn={
          "Statistics is the art of squeezing a story out of a pile of numbers — what is normal, how spread out things are, and whether a result is real or just a lucky accident. It is the language scientists, doctors, and economists all share when they argue about evidence."
        }
        descKh="ស្ថិតិគឺជាសិល្បៈនៃការច្របាច់រឿងមួយចេញពីគំនរលេខ — អ្វីដែលធម្មតា លាតសន្ធឹងប៉ុណ្ណា និងថាតើលទ្ធផលមួយពិត ឬគ្រាន់តែជាគ្រោះល្អដោយចៃដន្យ។ វាគឺជាភាសាដែលអ្នកវិទ្យាសាស្ត្រ វេជ្ជបណ្ឌិត និងអ្នកសេដ្ឋកិច្ច ប្រើរួមគ្នា ពេលពួកគេឈ្លោះគ្នាពីភ័ស្តុតាង។"
        isKh={isKh}
      >
        <FindingTheMiddleCard isKh={isKh} />
        <StandardDeviationCard isKh={isKh} />
        <PValueCard isKh={isKh} />
      </Section>

      {/* ── Beyond the Curriculum · The Architecture of Numbers ─────── */}
      <ArchitectureOfNumbersSection isKh={isKh} />

      {/* ── Beyond the Curriculum · The Unsolved Frontier ────────────── */}
      <ErdosFrontierSection isKh={isKh} />

      {/* ── Closing ──────────────────────────────────────────────────── */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-slate-600 text-sm italic">
        <span className={isKh ? "font-khmer not-italic" : "font-serif"}>
          {isKh
            ? "“គណិតវិទ្យាគឺជាភាសាដែលព្រះបានសរសេរសកលលោក។” — Galileo Galilei"
            : "“Mathematics is the language with which God wrote the universe.” — Galileo Galilei"}
        </span>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper, paper card, graph-paper background
// ════════════════════════════════════════════════════════════════════════════

function Section({
  id, eyebrowEn, eyebrowKh, titleEn, titleKh, khTerm, descEn, descKh, isKh, children,
}: {
  id?: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  khTerm?: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
      <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-700 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        <Sparkles className="w-3 h-3" />
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : (
          <>
            {titleEn}
            {khTerm && <span className="ml-2 font-khmer text-base font-normal text-slate-500">({khTerm})</span>}
          </>
        )}
      </h2>
      <p className={`text-slate-700 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function PaperCard({
  children,
  className = "",
  ...rest
}: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-200/70 shadow-[0_2px_24px_-12px_rgba(30,64,175,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

function GraphPaperBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eff6ff 60%, #e0ecfb 100%)" }} />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="math-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.55" />
          </pattern>
          <pattern id="math-grid-bold" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#math-grid-fine)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#93c5fd" strokeWidth="0.9" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#math-grid-bold)" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1. Mental Math Trainer
// ════════════════════════════════════════════════════════════════════════════

type Op = "+" | "−" | "×" | "÷";

type Problem = { a: number; b: number; op: Op; answer: number };

function genProblem(op: Op): Problem {
  const r = (n: number) => Math.floor(Math.random() * n) + 1;
  switch (op) {
    case "+": {
      const a = r(50) + 10, b = r(50) + 10;
      return { a, b, op, answer: a + b };
    }
    case "−": {
      const big = r(80) + 20, small = r(big - 5);
      return { a: big, b: small, op, answer: big - small };
    }
    case "×": {
      const a = r(11) + 1, b = r(11) + 1;
      return { a, b, op, answer: a * b };
    }
    case "÷": {
      const b = r(11) + 1, q = r(11) + 1;
      return { a: b * q, b, op, answer: q };
    }
  }
}

const ROUND_SECS = 10;

function MentalMathTrainer({ isKh }: { isKh: boolean }) {
  const [op, setOp] = useState<Op | "mix">("mix");
  const [problem, setProblem] = useState<Problem | null>(null);
  const [input, setInput] = useState("");
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECS);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [feedback, setFeedback] = useState<"ok" | "miss" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pickOp = (): Op => {
    if (op !== "mix") return op;
    const opts: Op[] = ["+", "−", "×", "÷"];
    return opts[Math.floor(Math.random() * opts.length)];
  };

  const newProblem = useCallback(() => {
    setProblem(genProblem(pickOp()));
    setInput("");
    setTimeLeft(ROUND_SECS);
    setFeedback(null);
    requestAnimationFrame(() => inputRef.current?.focus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [op]);

  // Start round
  const startRound = () => {
    setScore({ correct: 0, wrong: 0 });
    setRunning(true);
    newProblem();
  };

  const stopRound = () => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    resolvedRef.current = true;
    setRunning(false);
    setProblem(null);
    setTimeLeft(ROUND_SECS);
    setFeedback(null);
  };

  // Per-problem "resolved" guard: ensures we only score / advance ONCE per
  // problem, even if the timer expires the same tick the user hits Enter.
  const resolvedRef = useRef(false);
  const advanceTimerRef = useRef<number | null>(null);

  // Reset the guard whenever a new problem appears.
  useEffect(() => {
    resolvedRef.current = false;
  }, [problem]);

  // Timer
  useEffect(() => {
    if (!running || !problem) return;
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) {
          // Time-out — only count it if the user hasn't already submitted.
          if (!resolvedRef.current) {
            resolvedRef.current = true;
            window.clearInterval(id);
            setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
            setFeedback("miss");
            advanceTimerRef.current = window.setTimeout(newProblem, 450);
          }
          return 0;
        }
        return +(t - 0.1).toFixed(1);
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [running, problem, newProblem]);

  // Always clean up any pending advance-timer on unmount or when stopping.
  useEffect(() => () => {
    if (advanceTimerRef.current !== null) window.clearTimeout(advanceTimerRef.current);
  }, []);

  const submit = () => {
    if (!problem || resolvedRef.current) return;
    const v = parseInt(input, 10);
    if (Number.isNaN(v)) return;
    resolvedRef.current = true;
    if (v === problem.answer) {
      setScore((s) => ({ ...s, correct: s.correct + 1 }));
      setFeedback("ok");
    } else {
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
      setFeedback("miss");
    }
    advanceTimerRef.current = window.setTimeout(newProblem, 450);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  const total = score.correct + score.wrong;
  const accuracy = total > 0 ? Math.round((score.correct / total) * 100) : 0;
  const timerPct = (timeLeft / ROUND_SECS) * 100;

  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center flex-shrink-0">
          <Calculator className="w-5 h-5 text-blue-700" />
        </div>
        <div className="flex-1">
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Trainer គណិតក្នុងក្បាល" : "Mental math trainer"}
          </h3>
          <p className={`text-sm text-slate-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "អ្នកមាន ១០ វិនាទីក្នុងបញ្ហានីមួយៗ។ វាយចម្លើយ ហើយចុច Enter។"
              : "You have 10 seconds per problem. Type the answer and press Enter."}
          </p>
        </div>
      </div>

      {/* Operation selector */}
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Operation mode">
        {(["mix", "+", "−", "×", "÷"] as const).map((o) => {
          const isActive = op === o;
          const labelEn = o === "mix" ? "Mix" : o;
          const labelKh = o === "mix" ? "ច្រឡំ" : o;
          return (
            <button
              key={o}
              onClick={() => { if (!running) setOp(o); }}
              aria-pressed={isActive}
              disabled={running}
              className={`px-3 py-1.5 rounded-full text-sm font-bold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                isActive
                  ? "bg-blue-700 border-blue-800 text-white"
                  : "bg-white border-blue-200 text-slate-600 hover:bg-blue-50"
              } ${isKh ? "font-khmer" : "font-mono"}`}
            >
              {isKh ? labelKh : labelEn}
            </button>
          );
        })}
      </div>

      {/* Main play area */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
        <div className={`rounded-xl border-2 ${
          feedback === "ok" ? "border-emerald-400 bg-emerald-50"
            : feedback === "miss" ? "border-rose-400 bg-rose-50"
            : "border-blue-200 bg-white"
        } p-6 transition-colors min-h-[180px] flex flex-col items-center justify-center text-center`}>
          {!running ? (
            <>
              <p className={`text-slate-600 mb-4 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "រួចហើយ?" : "Ready to start?"}
              </p>
              <button
                onClick={startRound}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Play className="w-4 h-4 fill-white" />
                {isKh ? "ចាប់ផ្ដើម" : "Start round"}
              </button>
            </>
          ) : problem ? (
            <>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 tabular-nums mb-3 select-none">
                {problem.a} <span className="text-blue-700">{problem.op}</span> {problem.b} <span className="text-slate-400">=</span> ?
              </div>
              <input
                ref={inputRef}
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                aria-label="Your answer"
                className="w-32 text-center font-mono text-2xl font-bold py-2 rounded-lg border-2 border-blue-300 focus:border-blue-700 focus:outline-none bg-white"
                autoFocus
              />
              <div className="mt-2 text-xs text-slate-500">
                {feedback === "ok" && (
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold"><Check className="w-3 h-3" /> {isKh ? "ត្រឹមត្រូវ!" : "Correct!"}</span>
                )}
                {feedback === "miss" && (
                  <span className="inline-flex items-center gap-1 text-rose-700 font-bold"><XIcon className="w-3 h-3" /> {isKh ? "ខុស — ចម្លើយ" : "Wrong — answer was"} <span className="font-mono">{problem.answer}</span></span>
                )}
              </div>
            </>
          ) : null}
        </div>

        {/* Stats panel */}
        <div className="space-y-3">
          {/* Timer */}
          <div className="bg-white rounded-xl border border-blue-200 p-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              <span className={isKh ? "font-khmer tracking-normal normal-case" : ""}>{isKh ? "ពេលវេលា" : "Time left"}</span>
              <span className="font-mono tabular-nums text-slate-900">{timeLeft.toFixed(1)}s</span>
            </div>
            <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-100 ${
                  timeLeft > 5 ? "bg-emerald-500" : timeLeft > 2 ? "bg-amber-500" : "bg-rose-500"
                }`}
                style={{ width: `${timerPct}%` }}
              />
            </div>
          </div>
          {/* Score */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat label={isKh ? "ត្រូវ" : "Right"} value={score.correct} colour="emerald" isKh={isKh} />
            <Stat label={isKh ? "ខុស" : "Wrong"} value={score.wrong} colour="rose" isKh={isKh} />
            <Stat label={isKh ? "ភាពត្រឹមត្រូវ" : "Accuracy"} value={`${accuracy}%`} colour="blue" isKh={isKh} />
          </div>
          {running && (
            <button
              onClick={stopRound}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-bold transition-colors"
            >
              <Pause className="w-3.5 h-3.5" /> {isKh ? "ឈប់" : "Stop round"}
            </button>
          )}
        </div>
      </div>
    </PaperCard>
  );
}

function Stat({ label, value, colour, isKh }: { label: string; value: number | string; colour: "emerald" | "rose" | "blue"; isKh: boolean }) {
  const cls =
    colour === "emerald" ? "bg-emerald-50 border-emerald-200 text-emerald-800"
    : colour === "rose"  ? "bg-rose-50 border-rose-200 text-rose-800"
    :                       "bg-blue-50 border-blue-200 text-blue-800";
  return (
    <div className={`rounded-lg border p-2 ${cls}`}>
      <div className="font-mono font-bold text-lg tabular-nums">{value}</div>
      <div className={`text-[10px] uppercase tracking-wider font-bold opacity-80 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>{label}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. Algebra — Balance Scale (dynamic problem generator)
// ════════════════════════════════════════════════════════════════════════════

type AlgebraProblem = {
  id: number;
  xValue: number;
  leftConstant: number;
  rightTotal: number;
};

const ALGEBRA_PROBLEMS: AlgebraProblem[] = [
  { id: 1,  xValue: 7, leftConstant: 5, rightTotal: 12 },
  { id: 2,  xValue: 7, leftConstant: 3, rightTotal: 10 },
  { id: 3,  xValue: 8, leftConstant: 7, rightTotal: 15 },
  { id: 4,  xValue: 6, leftConstant: 2, rightTotal: 8  },
  { id: 5,  xValue: 8, leftConstant: 6, rightTotal: 14 },
  { id: 6,  xValue: 7, leftConstant: 4, rightTotal: 11 },
  { id: 7,  xValue: 8, leftConstant: 1, rightTotal: 9  },
  { id: 8,  xValue: 8, leftConstant: 8, rightTotal: 16 },
  { id: 9,  xValue: 4, leftConstant: 9, rightTotal: 13 },
  { id: 10, xValue: 5, leftConstant: 5, rightTotal: 10 },
];

function pickRandomProblem(excludeId?: number): AlgebraProblem {
  const pool =
    excludeId == null
      ? ALGEBRA_PROBLEMS
      : ALGEBRA_PROBLEMS.filter((p) => p.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
}

function BalanceScale({ isKh }: { isKh: boolean }) {
  // Seed with the first problem so SSR/initial render has data; useEffect
  // picks a random one on mount per the requested behavior.
  const [currentProblem, setCurrentProblem] = useState<AlgebraProblem>(
    ALGEBRA_PROBLEMS[0],
  );
  // step: 0 = initial state, 1 = subtracted leftConstant from both sides
  const [step, setStep] = useState<0 | 1>(0);

  useEffect(() => {
    setCurrentProblem(pickRandomProblem());
    setStep(0);
  }, []);

  const { xValue, leftConstant, rightTotal } = currentProblem;
  const subtracted = step >= 1 ? leftConstant : 0;
  const leftAdded = leftConstant - subtracted;
  const rightVal = rightTotal - subtracted;
  const solvedX = step >= 1 ? xValue : null;

  const reset = () => setStep(0);
  const subtractConstant = () => setStep(1);
  const nextProblem = () => {
    setCurrentProblem((prev) => pickRandomProblem(prev.id));
    setStep(0);
  };

  // Tilt: heavier side dips. Left "weight" = xValue + leftAdded; right = rightVal.
  // After subtracting leftConstant, both sides equal xValue → balanced.
  const leftWeight = xValue + leftAdded;
  const rightWeight = rightVal;
  const tilt = Math.max(-8, Math.min(8, (leftWeight - rightWeight) * 1.6));

  // Dot wrap configs scale to the largest expected counts (leftConstant ≤ 9,
  // rightTotal ≤ 16) so dots never overflow the pan area.
  const LEFT_COLS = 5;
  const RIGHT_COLS = 6;

  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center flex-shrink-0">
          <Scale className="w-5 h-5 text-blue-700" />
        </div>
        <div className="flex-1">
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ជញ្ជីងតុល្យភាព — រកតម្លៃ X" : "Balance scale — find X"}
          </h3>
          <p
            className={`text-sm text-slate-600 mt-1 ${
              isKh ? "font-khmer leading-loose" : ""
            }`}
            data-testid="balance-instructions"
          >
            {isKh ? (
              <>
                គោលដៅរបស់យើង៖ <I>X</I> +{" "}
                <span className="font-mono not-italic">{leftConstant}</span> ={" "}
                <span className="font-mono not-italic">{rightTotal}</span> ។
                ដើម្បីញែក <I>X</I> យើងត្រូវលុបបង់ "+ {leftConstant}" — ហើយវិធីត្រឹមត្រូវតែមួយគត់គឺ៖
                ដក <span className="font-mono not-italic">{leftConstant}</span> ចេញពី{" "}
                <strong>ទាំងសងខាង</strong>។
              </>
            ) : (
              <>
                Our goal: <I>X</I> +{" "}
                <span className="font-mono not-italic">{leftConstant}</span> ={" "}
                <span className="font-mono not-italic">{rightTotal}</span>. To isolate{" "}
                <I>X</I> we need to remove the "+ {leftConstant}" — and the only fair move
                is: subtract <span className="font-mono not-italic">{leftConstant}</span>{" "}
                from <strong>both sides</strong>.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Equation display */}
      <div
        className="bg-blue-50/60 rounded-xl border border-blue-200 p-4 mb-4 text-center font-serif text-2xl sm:text-3xl"
        data-testid="balance-equation"
      >
        <span className="text-slate-900">
          <I>X</I>{" "}
          {leftAdded > 0 && (
            <>
              + <span className="tabular-nums">{leftAdded}</span>
            </>
          )}
        </span>
        <span className="mx-3 text-blue-700 font-bold">=</span>
        <span className="tabular-nums text-slate-900">{rightVal}</span>
        {solvedX !== null && (
          <div className="mt-3 text-xl">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-600 text-white font-bold font-serif">
              <I>X</I> ={" "}
              <span className="font-mono not-italic" data-testid="balance-solved-x">
                {solvedX}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Scale SVG */}
      <div className="bg-white rounded-xl border border-blue-200 p-4">
        <svg
          viewBox="0 0 540 280"
          className="w-full h-auto block"
          aria-label={
            isKh
              ? `ជញ្ជីងតុល្យភាពបង្ហាញសមីការ X + ${leftConstant} = ${rightTotal}`
              : `Balance scale showing the equation X + ${leftConstant} = ${rightTotal}`
          }
        >
          {/* Pillar */}
          <rect x="262" y="120" width="16" height="120" rx="2" fill="#475569" />
          <rect x="220" y="240" width="100" height="14" rx="3" fill="#334155" />

          {/* Beam — rotates around the centre */}
          <g
            style={{
              transform: `rotate(${tilt}deg)`,
              transformOrigin: "270px 120px",
              transition: "transform 600ms cubic-bezier(.4,.1,.2,1)",
            }}
          >
            <rect x="60" y="113" width="420" height="14" rx="3" fill="#64748b" />
            <circle cx="270" cy="120" r="9" fill="#1e293b" />

            {/* Left pan ropes */}
            <line x1="110" y1="120" x2="110" y2="160" stroke="#475569" strokeWidth="1.5" />
            {/* Left pan */}
            <Pan
              x={110}
              y={185}
              colour="#3b82f6"
              labelTopX={
                <span>
                  <I>X</I>
                  {leftAdded > 0 && (
                    <>
                      {" "}
                      + <span className="font-mono not-italic">{leftAdded}</span>
                    </>
                  )}
                </span>
              }
            >
              {/* X box */}
              <rect x={-32} y={-22} width={26} height={26} rx={3} fill="#1d4ed8" />
              <text
                x={-19}
                y={-3}
                fontSize="16"
                fontWeight="700"
                fill="#fff"
                textAnchor="middle"
                fontFamily="serif"
                fontStyle="italic"
              >
                X
              </text>
              {/* leftAdded weights — exactly leftAdded dots */}
              <g data-testid="left-pan-dots">
                {Array.from({ length: leftAdded }).map((_, i) => (
                  <circle
                    key={i}
                    cx={6 + (i % LEFT_COLS) * 8}
                    cy={-7 - Math.floor(i / LEFT_COLS) * 8}
                    r={3.2}
                    fill="#475569"
                  />
                ))}
              </g>
            </Pan>

            {/* Right pan ropes */}
            <line x1="430" y1="120" x2="430" y2="160" stroke="#475569" strokeWidth="1.5" />
            {/* Right pan */}
            <Pan
              x={430}
              y={185}
              colour="#10b981"
              labelTopX={<span className="font-mono not-italic">{rightVal}</span>}
            >
              {/* rightVal weights — exactly rightVal dots */}
              <g data-testid="right-pan-dots">
                {Array.from({ length: rightVal }).map((_, i) => (
                  <circle
                    key={i}
                    cx={-22 + (i % RIGHT_COLS) * 8}
                    cy={-6 - Math.floor(i / RIGHT_COLS) * 8}
                    r={3.2}
                    fill="#0f766e"
                  />
                ))}
              </g>
            </Pan>
          </g>
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-600 mt-2">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-blue-700" /> {isKh ? <>ប្រអប់ <I>X</I></> : <><I>X</I> box</>}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> {isKh ? "តម្លៃ +1" : "+1 weight"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" /> {isKh ? "តម្លៃ +1 (ស្ដាំ)" : "+1 weight (right)"}
          </span>
        </div>
      </div>

      {/* Controls — primary actions */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={subtractConstant}
          disabled={step >= 1}
          data-testid="balance-subtract"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm shadow-sm transition-colors"
        >
          <span className="font-mono">−{leftConstant}</span>{" "}
          {isKh ? "ពីទាំងសងខាង" : "from both sides"}
        </button>
        <button
          onClick={reset}
          data-testid="balance-reset"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-bold transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> {isKh ? "ចាប់ផ្ដើមឡើងវិញ" : "Reset"}
        </button>
      </div>

      {/* Secondary action — pull a different problem from the bank */}
      <button
        onClick={nextProblem}
        data-testid="balance-next-problem"
        className={`mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-900 text-sm font-bold transition-colors ${
          isKh ? "font-khmer" : ""
        }`}
        aria-label={
          isKh ? "បង្ហាញលំហាត់ថ្មី" : "Show a new randomly-selected algebra problem"
        }
      >
        <Sparkles className="w-4 h-4" />
        {isKh ? "លំហាត់បន្ទាប់" : "Next Problem"}
        <span className={`text-xs opacity-80 font-normal ${isKh ? "" : "font-khmer"}`}>
          {isKh ? "(Next Problem)" : "(លំហាត់បន្ទាប់)"}
        </span>
      </button>

      {/* Caption */}
      <div
        className={`mt-4 flex items-start gap-2 text-sm text-slate-700 ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        <Info className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
        <span>
          {step === 0
            ? isKh
              ? (
                <>
                  ជញ្ជីងមានតុល្យភាព — ទាំងសងខាង "ធ្ងន់"{" "}
                  <span className="font-mono not-italic">{rightTotal}</span> ប៉ុន្តែយើងមិនទាន់ដឹងថា <I>X</I>{" "}
                  ស្មើនឹងប៉ុន្មាននៅពេលនៅម្នាក់ឯងទេ។
                </>
              )
              : (
                <>
                  The scale starts level — both sides "weigh"{" "}
                  <span className="font-mono not-italic">{rightTotal}</span>. But we don't
                  yet know what <I>X</I> is on its own.
                </>
              )
            : isKh
              ? (
                <>
                  បន្ទាប់ពីដក <span className="font-mono not-italic">{leftConstant}</span>{" "}
                  ចេញពីទាំងសងខាង សមីការក្លាយជា <I>X</I> ={" "}
                  <span className="font-mono not-italic">{xValue}</span> ។ <I>X</I>{" "}
                  ត្រូវបាន<strong>ញែក</strong>។ យើងបានដោះស្រាយ!
                </>
              )
              : (
                <>
                  After subtracting <span className="font-mono not-italic">{leftConstant}</span>{" "}
                  from both sides, the equation becomes <I>X</I> ={" "}
                  <span className="font-mono not-italic">{xValue}</span>. <I>X</I> is now{" "}
                  <strong>isolated</strong>. We've solved it!
                </>
              )}
        </span>
      </div>
    </PaperCard>
  );
}

function Pan({ x, y, colour, labelTopX, children }: {
  x: number; y: number; colour: string; labelTopX: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Pan body */}
      <path d={`M -50 0 Q 0 30 50 0 L 40 5 Q 0 30 -40 5 Z`} fill={colour} opacity="0.85" />
      <line x1={-50} x2={50} y1={0} y2={0} stroke={colour} strokeWidth="2" />
      {/* Contents */}
      {children}
      {/* Label below */}
      <foreignObject x={-60} y={32} width={120} height={28}>
        <div className="text-center font-serif text-base text-slate-900">{labelTopX}</div>
      </foreignObject>
    </g>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. Trigonometry — Right Triangle (drag the top corner)
// ════════════════════════════════════════════════════════════════════════════

function RightTriangle({ isKh }: { isKh: boolean }) {
  // SVG canvas: 480 × 320. Right angle at bottom-left (60, 280). Adjacent runs to (380, 280).
  // The user drags the top vertex up/down to change height (and thus angle).
  const ORIGIN = { x: 60, y: 280 };
  const ADJACENT = 320; // px length of horizontal leg
  const MIN_H = 30, MAX_H = 240;

  const [height, setHeight] = useState(180);

  const top = { x: ORIGIN.x, y: ORIGIN.y - height };
  const right = { x: ORIGIN.x + ADJACENT, y: ORIGIN.y };

  // angle θ at the bottom-right (between horizontal and hypotenuse)
  const opp = height;          // opposite to θ
  const adj = ADJACENT;        // adjacent to θ
  const hyp = Math.sqrt(opp * opp + adj * adj);
  const thetaRad = Math.atan2(opp, adj);
  const thetaDeg = (thetaRad * 180) / Math.PI;

  const sin = Math.sin(thetaRad);
  const cos = Math.cos(thetaRad);
  const tan = Math.tan(thetaRad);

  // Drag state (top vertex)
  const svgRef = useRef<SVGSVGElement>(null);

  const updateFromClient = useCallback((clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = 0;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const local = pt.matrixTransform(ctm.inverse());
    const newH = ORIGIN.y - local.y;
    setHeight(Math.max(MIN_H, Math.min(MAX_H, newH)));
  }, [ORIGIN.y]);

  const onPointerDown = (e: React.PointerEvent<SVGCircleElement>) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const move = (ev: PointerEvent) => updateFromClient(ev.clientY);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center flex-shrink-0">
          <Triangle className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ត្រីកោណកែងអន្តរកម្ម — អូសកំពូលដើម្បីផ្លាស់ប្ដូរមុំ θ" : "Interactive right triangle — drag the corner to change θ"}
          </h3>
          <p className={`text-sm text-slate-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ជ្រុងបី៖ Opposite (កំពស់), Adjacent (បាត), Hypotenuse (ជ្រុងជម្រាល)។ ខណៈពេលអ្នកអូស តម្លៃ sin / cos / tan ប្រែប្រួលផងដែរ។"
              : "Three sides: Opposite (height), Adjacent (base), Hypotenuse (slope). As you drag, sin / cos / tan update live."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
        {/* SVG triangle */}
        <div className="bg-white rounded-xl border border-blue-200 p-4">
          <svg
            ref={svgRef}
            viewBox="0 0 480 320"
            className="w-full h-auto block touch-none select-none"
            aria-label={`Right triangle with theta of ${thetaDeg.toFixed(1)} degrees`}
          >
            {/* Inner grid */}
            <defs>
              <pattern id="trig-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dbeafe" strokeWidth="0.7" />
              </pattern>
            </defs>
            <rect width="480" height="320" fill="url(#trig-grid)" />

            {/* Triangle fill */}
            <polygon
              points={`${ORIGIN.x},${ORIGIN.y} ${right.x},${right.y} ${top.x},${top.y}`}
              fill="rgba(59,130,246,0.10)"
            />

            {/* Right angle marker (square at origin) */}
            <rect x={ORIGIN.x} y={ORIGIN.y - 14} width={14} height={14} fill="none" stroke="#1e40af" strokeWidth="1.5" />

            {/* Angle θ arc at right vertex */}
            <path
              d={describeArc(right.x, right.y, 32, 180, 180 + thetaDeg)}
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
            />
            <text
              x={right.x - 50}
              y={right.y - 12}
              fontSize="16"
              fill="#dc2626"
              fontFamily="serif"
              fontStyle="italic"
              fontWeight="700"
            >
              θ
            </text>

            {/* Sides */}
            <line x1={ORIGIN.x} y1={ORIGIN.y} x2={right.x} y2={right.y} stroke="#1e40af" strokeWidth="3" />
            <line x1={ORIGIN.x} y1={ORIGIN.y} x2={top.x} y2={top.y} stroke="#1e40af" strokeWidth="3" />
            <line x1={top.x} y1={top.y} x2={right.x} y2={right.y} stroke="#1e40af" strokeWidth="3" />

            {/* Side labels */}
            <text x={(ORIGIN.x + right.x) / 2} y={ORIGIN.y + 22} fontSize="13" fill="#0f172a" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              Adjacent · {adj.toFixed(0)}
            </text>
            <text
              x={ORIGIN.x - 10}
              y={(ORIGIN.y + top.y) / 2}
              fontSize="13" fill="#0f172a" fontFamily="serif" fontStyle="italic"
              textAnchor="middle"
              transform={`rotate(-90 ${ORIGIN.x - 10} ${(ORIGIN.y + top.y) / 2})`}
            >
              Opposite · {opp.toFixed(0)}
            </text>
            <text
              x={(top.x + right.x) / 2 + 12}
              y={(top.y + right.y) / 2 - 6}
              fontSize="13" fill="#0f172a" fontFamily="serif" fontStyle="italic"
              transform={`rotate(${-thetaDeg} ${(top.x + right.x) / 2 + 12} ${(top.y + right.y) / 2 - 6})`}
            >
              Hypotenuse · {hyp.toFixed(0)}
            </text>

            {/* Drag handle (top vertex) */}
            <circle
              cx={top.x}
              cy={top.y}
              r={11}
              fill="#3b82f6"
              stroke="#fff"
              strokeWidth="2.5"
              cursor="ns-resize"
              onPointerDown={onPointerDown}
              role="slider"
              tabIndex={0}
              aria-label="Triangle angle theta"
              aria-valuemin={Math.round((Math.atan2(MIN_H, ADJACENT) * 180) / Math.PI)}
              aria-valuemax={Math.round((Math.atan2(MAX_H, ADJACENT) * 180) / Math.PI)}
              aria-valuenow={Math.round(thetaDeg)}
              aria-valuetext={`${thetaDeg.toFixed(1)} degrees`}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp")   setHeight((h) => Math.min(MAX_H, h + 10));
                if (e.key === "ArrowDown") setHeight((h) => Math.max(MIN_H, h - 10));
              }}
            />
            {/* "drag" hint */}
            <text x={top.x + 18} y={top.y + 4} fontSize="11" fill="#64748b" fontStyle="italic">
              ← drag
            </text>
          </svg>
        </div>

        {/* Live values */}
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-blue-200 p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
              {isKh ? "មុំ" : "Angle"} <I>θ</I>
            </div>
            <div className="font-serif text-3xl font-bold text-rose-600 tabular-nums">{thetaDeg.toFixed(1)}°</div>
          </div>
          <RatioRow label="sin" value={sin} formula={<>opp / hyp</>} />
          <RatioRow label="cos" value={cos} formula={<>adj / hyp</>} />
          <RatioRow label="tan" value={tan} formula={<>opp / adj</>} />
        </div>
      </div>

      {/* Real-world examples */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <RealWorldCard
          icon={Building2}
          titleEn="Measure a building"
          titleKh="វាស់អគារ"
          isKh={isKh}
          bodyEn={
            <>Stand a known distance away. Measure the angle θ from your eyes up to the roof. Then <strong>height ≈ distance × tan(θ)</strong>. No ladder needed.</>
          }
          bodyKh={
            <>ឈរនៅចម្ងាយដែលអ្នកដឹង។ វាស់មុំ θ ពីភ្នែកអ្នកឡើងទៅកំពូលដំបូល។ បន្ទាប់មក <strong>កំពស់ ≈ ចម្ងាយ × tan(θ)</strong>។ មិនចាំបាច់ប្រើជណ្ដើរទេ។</>
          }
        />
        <RealWorldCard
          icon={Mountain}
          titleEn="Measure a mountain"
          titleKh="វាស់ភ្នំ"
          isKh={isKh}
          bodyEn={
            <>The first survey of Mount Everest in 1856 used exactly this method — six trigonometric stations, a few angles, careful arithmetic, and they got the height to within 9 metres of today's number.</>
          }
          bodyKh={
            <>ការវាស់ស្ទង់ភ្នំ Everest ជាលើកដំបូងនៅឆ្នាំ ១៨៥៦ បានប្រើវិធីនេះច្បាស់ៗ — ស្ថានីយ៍ត្រីកោណមាត្រ ៦, មុំពីរបី, និងការគណនាដោយយកចិត្តទុកដាក់។ ពួកគេបានទទួលកំពស់ខុសគ្នាតែ ៩ ម៉ែត្រពីលេខបច្ចុប្បន្ន។</>
          }
        />
      </div>
    </PaperCard>
  );
}

// SVG arc helper for the θ marker
function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end = polarToCartesian(cx, cy, r, startDeg);
  const large = endDeg - startDeg <= 180 ? 0 : 1;
  return ["M", start.x, start.y, "A", r, r, 0, large, 0, end.x, end.y].join(" ");
}

function RatioRow({ label, value, formula }: { label: string; value: number; formula: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-blue-200 p-3 flex items-center gap-3">
      <div className="font-serif italic text-xl font-bold text-blue-700 w-12">{label}<span className="not-italic text-slate-500"> θ</span></div>
      <div className="flex-1 text-xs text-slate-500 font-serif italic">{formula}</div>
      <div className="font-mono font-bold text-lg tabular-nums text-slate-900 w-20 text-right">{value.toFixed(3)}</div>
    </div>
  );
}

function RealWorldCard({
  icon: Icon, titleEn, titleKh, bodyEn, bodyKh, isKh,
}: {
  icon: typeof Building2;
  titleEn: string; titleKh: string;
  bodyEn: React.ReactNode; bodyKh: React.ReactNode;
  isKh: boolean;
}) {
  return (
    <div className="bg-blue-50/70 rounded-xl border border-blue-200 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-blue-700" />
        <div className={`font-display font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? titleKh : titleEn}
        </div>
      </div>
      <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3b. The Magic of Pi & Circles (3 cards: definition, irrationality, 2π)
// ════════════════════════════════════════════════════════════════════════════

function MagicOfPiCards({ isKh }: { isKh: boolean }) {
  return (
    <PaperCard className="p-5 sm:p-6 mt-6" data-testid="pi-and-circles-card">
      {/* Section header */}
      <header className="mb-5 pb-4 border-b border-blue-100">
        <div
          className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-blue-700 mb-1 ${
            isKh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          <Circle className="w-3.5 h-3.5" />
          {isKh ? "ផ្នែកបន្ថែម · រង្វង់" : "Bonus · Circles"}
        </div>
        <h3
          className={`font-display font-bold text-slate-900 text-xl sm:text-2xl leading-snug ${
            isKh ? "font-khmer" : ""
          }`}
        >
          {isKh
            ? "មន្តអាគមនៃ ផៃ និងរង្វង់"
            : "The Magic of Pi & Circles"}
        </h3>
        <p
          className={`mt-2 text-sm sm:text-base text-slate-600 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ត្រីកោណពន្យល់ពីមុំ។ រង្វង់ពន្យល់ពីការបង្វិល។ ហើយលេខតូចមួយ — π — ដែលពន្យល់ពីរង្វង់ទាំងមូលនៅក្នុងសកលលោក។"
            : "Triangles explain angles. Circles explain rotation. And one tiny number — π — explains every circle in the universe."}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* ── Card 1: What is Pi? ─────────────────────────────────── */}
        <article className="bg-blue-50/70 rounded-xl border border-blue-200 p-4 sm:p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold text-sm">1</span>
            <Ruler className="w-4 h-4 text-blue-700" />
            <div
              className={`text-[10px] font-mono uppercase tracking-[0.2em] text-blue-700 ${
                isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
              }`}
            >
              {isKh ? "និយមន័យ" : "Definition"}
            </div>
          </div>
          <h4
            className={`font-display font-bold text-slate-900 text-base sm:text-lg mb-2 ${
              isKh ? "font-khmer" : ""
            }`}
          >
            {isKh ? "តើ ផៃ ជាអ្វី?" : "What is Pi?"}
          </h4>

          <p
            className={`text-sm text-slate-700 mb-3 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh ? (
              <>
                <InlineMath math={String.raw`\pi`} /> គឺគ្រាន់តែជាសមាមាត្រមួយ។ ប្រសិនបើអ្នកយក
                អង្កត់ផ្ចិត (ទទឹង) របស់រង្វង់<strong>ណាមួយ</strong>នៅក្នុងសកលលោក ហើយរុំវាជុំវិញគែមខាងក្រៅ (បរិមាត្រ) វានឹងសមដាក់ច្បាស់ៗ <strong>៣ ដង</strong> បូកនិងបំណែកតូចមួយទៀត។
              </>
            ) : (
              <>
                <InlineMath math={String.raw`\pi`} /> is just a ratio. If you take the
                diameter (width) of <strong>any</strong> circle in the universe
                and wrap it around the outside edge (circumference), it will
                always fit exactly <strong>3 times</strong> &hellip; plus a tiny
                little extra piece.
              </>
            )}
          </p>

          <p
            className={`text-sm text-slate-700 mb-3 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh ? "សមាមាត្រនោះគឺពិតប្រាកដ៖" : "That ratio is exactly:"}{" "}
            <span className="font-mono font-bold text-blue-700">3.14159…</span>
          </p>

          <div className="rounded-lg bg-white border border-blue-200 px-4 py-4 text-center mt-auto">
            <BlockMath math={String.raw`C = \pi\, d`} />
            <div
              className={`mt-1 text-[11px] text-slate-500 ${
                isKh ? "font-khmer text-xs" : ""
              }`}
            >
              {isKh
                ? "បរិមាត្រ = ផៃ × អង្កត់ផ្ចិត"
                : "circumference = π × diameter"}
            </div>
          </div>
        </article>

        {/* ── Card 2: The Never-Ending Number ─────────────────────── */}
        <article className="bg-blue-50/70 rounded-xl border border-blue-200 p-4 sm:p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold text-sm">2</span>
            <InfinityIcon className="w-4 h-4 text-blue-700" />
            <div
              className={`text-[10px] font-mono uppercase tracking-[0.2em] text-blue-700 ${
                isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
              }`}
            >
              {isKh ? "អនន្ត" : "Infinity"}
            </div>
          </div>
          <h4
            className={`font-display font-bold text-slate-900 text-base sm:text-lg mb-2 ${
              isKh ? "font-khmer" : ""
            }`}
          >
            {isKh ? "ចំនួនអសនិទាន — លេខគ្មានទីបញ្ចប់" : "The Never-Ending Number"}
          </h4>

          <p
            className={`text-sm text-slate-700 mb-3 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh ? (
              <>
                <InlineMath math={String.raw`\pi`} /> គឺជា <strong>ចំនួនអសនិទាន</strong>។ វាមិនអាចសរសេរជាប្រភាគធម្មតាដ៏ល្អឥតខ្ចោះណាមួយឡើយ។ ខ្ទង់ទសភាគរបស់វាបន្តរហូតដល់អនន្តភាព ដោយមិនដែលធ្វើម្តងទៀតនូវលំនាំណាមួយឡើយ។
              </>
            ) : (
              <>
                <InlineMath math={String.raw`\pi`} /> is an{" "}
                <strong>irrational number</strong>. It cannot be written as a
                perfect simple fraction. The decimal points go on forever to
                infinity without ever repeating a pattern.
              </>
            )}
          </p>

          {/* Decimal-tape visualization */}
          <div className="rounded-lg bg-white border border-blue-200 p-3 mb-3 overflow-hidden">
            <div
              className={`text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-1 ${
                isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
              }`}
            >
              {isKh ? "៥០ ខ្ទង់ដំបូង" : "First 50 digits"}
            </div>
            <p className="font-mono text-xs sm:text-sm text-slate-800 leading-relaxed break-all">
              3.14159265358979323846264338327950288419716939937510
              <span className="text-slate-400">…</span>
            </p>
          </div>

          <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 mt-auto">
            <div
              className={`flex items-start gap-2 text-sm text-amber-900 ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <span className="font-bold">
                  {isKh ? "ការពិតគួរឱ្យភ្ញាក់ផ្អើល៖ " : "Mind-blowing fact: "}
                </span>
                {isKh
                  ? "កុំព្យូទ័រខ្លាំងបានគណនា π ដល់រាប់ពាន់ពាន់លានខ្ទង់ — ហើយយើងនៅតែមិនទាន់រកឃើញចុងបញ្ចប់ទេ!"
                  : "Supercomputers have calculated π to trillions of digits — and we still haven't found the end!"}
              </p>
            </div>
          </div>
        </article>

        {/* ── Card 3: Why is a Circle 2π? ─────────────────────────── */}
        <article className="bg-blue-50/70 rounded-xl border border-blue-200 p-4 sm:p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold text-sm">3</span>
            <Circle className="w-4 h-4 text-blue-700" />
            <div
              className={`text-[10px] font-mono uppercase tracking-[0.2em] text-blue-700 ${
                isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""
              }`}
            >
              {isKh ? "រ៉ាដ្យង់" : "Radians"}
            </div>
          </div>
          <h4
            className={`font-display font-bold text-slate-900 text-base sm:text-lg mb-2 ${
              isKh ? "font-khmer" : ""
            }`}
          >
            {isKh ? (
              <>ហេតុអ្វីរង្វង់ស្មើនឹង <InlineMath math={String.raw`2\pi`} /> ?</>
            ) : (
              <>Why is a circle <InlineMath math={String.raw`2\pi`} /> ?</>
            )}
          </h4>

          <p
            className={`text-sm text-slate-700 mb-3 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh ? (
              <>
                ជំនួសឱ្យការវាស់ដោយប្រើអង្កត់ផ្ចិត គណិតវិទូចូលចិត្តប្រើ <strong>កាំ</strong> (កន្លះទទឹង) ព្រោះវាភ្ជាប់ចំណុចកណ្តាលទៅគែម។
              </>
            ) : (
              <>
                Instead of measuring with the diameter, mathematicians prefer
                using the <strong>radius</strong> (half the width) because it
                connects the center to the edge.
              </>
            )}
          </p>

          <p
            className={`text-sm text-slate-700 mb-3 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh ? (
              <>
                ប្រសិនបើអ្នកយកកាំ ហើយរុំវាជុំវិញខាងក្រៅ វាសមដាក់ច្បាស់ៗ{" "}
                <InlineMath math={String.raw`2\pi`} /> ដង (ប្រហែល <span className="font-mono">៦.២៨</span> ដង)។ នេះហើយជាមូលហេតុដែលការផ្លាស់ទីពេញរង្វង់មួយស្មើនឹង <InlineMath math={String.raw`2\pi`} /> រ៉ាដ្យង់។
              </>
            ) : (
              <>
                If you take the radius and wrap it around the outside, it fits
                exactly <InlineMath math={String.raw`2\pi`} /> times (about{" "}
                <span className="font-mono">6.28</span> times). This is why
                moving in a full circle is <InlineMath math={String.raw`2\pi`} /> radians.
              </>
            )}
          </p>

          {/* Mini SVG: radius wrapping a circle */}
          <div className="rounded-lg bg-white border border-blue-200 p-3 mb-3 not-prose">
            <svg viewBox="0 0 200 120" className="w-full h-auto" role="img" aria-label={isKh ? "កាំរុំជុំវិញរង្វង់ ២π ដង" : "Radius wraps the circle 2π times"}>
              <circle cx="70" cy="60" r="40" fill="none" stroke="#1d4ed8" strokeWidth="2" />
              {/* radius line */}
              <line x1="70" y1="60" x2="110" y2="60" stroke="#1d4ed8" strokeWidth="2.5" />
              <text x="80" y="55" fontFamily="serif" fontStyle="italic" fontSize="11" fill="#1d4ed8">r</text>
              <circle cx="70" cy="60" r="2.5" fill="#1d4ed8" />
              {/* arrow + label */}
              <path d="M 125 60 L 150 60" stroke="#475569" strokeWidth="1.5" markerEnd="url(#piarr)" />
              <defs>
                <marker id="piarr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                </marker>
              </defs>
              <text x="155" y="58" fontFamily="serif" fontSize="13" fill="#0f172a">
                ≈ 6.28 ×
              </text>
              <text x="155" y="76" fontFamily="serif" fontStyle="italic" fontSize="11" fill="#475569">
                {isKh ? "រុំជុំវិញ" : "around"}
              </text>
            </svg>
          </div>

          <div className="rounded-lg bg-white border border-blue-200 px-4 py-4 text-center mt-auto">
            <BlockMath math={String.raw`C = 2\pi\, r`} />
            <div
              className={`mt-1 text-[11px] text-slate-500 ${
                isKh ? "font-khmer text-xs" : ""
              }`}
            >
              {isKh
                ? "បរិមាត្រ = ២ × ផៃ × កាំ"
                : "circumference = 2 × π × radius"}
            </div>
          </div>
        </article>
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4a. Calculus — Derivatives (slope = instantaneous speed)
// ════════════════════════════════════════════════════════════════════════════

const CAR_T_MAX = 10;          // seconds simulated
const CAR_ACCEL = 1.4;         // m/s² (chosen for nice numbers)
// distance d(t) = 0.5 * a * t²  →  speed = a * t

function DerivativeCard({ isKh }: { isKh: boolean }) {
  const [t, setT] = useState(4); // seconds — slider position

  const distance = 0.5 * CAR_ACCEL * t * t;
  const speed = CAR_ACCEL * t;

  // Plot dimensions
  const W = 480, H = 240;
  const PAD_L = 50, PAD_R = 16, PAD_T = 16, PAD_B = 36;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;

  // Max distance: 0.5 * a * 100 = 70 m
  const MAX_D = 0.5 * CAR_ACCEL * CAR_T_MAX * CAR_T_MAX;

  const xOf = (sec: number) => PAD_L + (sec / CAR_T_MAX) * plotW;
  const yOf = (d: number) => PAD_T + (1 - d / MAX_D) * plotH;

  // Curve path
  const curve = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const tt = (i / 100) * CAR_T_MAX;
      const dd = 0.5 * CAR_ACCEL * tt * tt;
      pts.push(`${i === 0 ? "M" : "L"} ${xOf(tt).toFixed(2)} ${yOf(dd).toFixed(2)}`);
    }
    return pts.join(" ");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tangent line at t — drawn as a short segment of the actual tangent
  //   y = distance + speed * (t' - t)
  // evaluated at t' = t ± dt. (Two points on the tangent line itself, not on
  // the curve, so it really IS the tangent, not a secant approximation.)
  const tx = xOf(t), ty = yOf(distance);
  const dt = 1.2;
  const t1 = Math.max(0, t - dt), t2 = Math.min(CAR_T_MAX, t + dt);
  const x1 = xOf(t1), y1 = yOf(distance + speed * (t1 - t));
  const x2 = xOf(t2), y2 = yOf(distance + speed * (t2 - t));

  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Derivative — ជម្រាល = ល្បឿនភ្លាមៗ" : "Derivative — slope = instantaneous speed"}
          </h3>
          <p className={`text-sm text-slate-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? (
              <>ឡានចេញដំណើរពីផ្ទះ ហើយធ្វើការបង្កើនល្បឿនយ៉ាងថេរ។ ក្រាហ្វិកបង្ហាញ <I>ចម្ងាយ</I> ធៀបនឹង <I>ពេលវេលា</I>។ ជម្រាលនៅចំណុចនីមួយៗ — ហោយកំពុងតែកើនឡើង — គឺជា <strong>ល្បឿនភ្លាមៗ</strong> នាពេលនោះ។</>
            ) : (
              <>A car leaves home and accelerates steadily. The graph shows <I>distance</I> vs <I>time</I>. The slope at any point — getting steeper — is the <strong>instantaneous speed</strong> at that moment.</>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
        <div className="bg-white rounded-xl border border-blue-200 p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
            <defs>
              <pattern id="calc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dbeafe" strokeWidth="0.7" />
              </pattern>
            </defs>
            <rect x={PAD_L} y={PAD_T} width={plotW} height={plotH} fill="url(#calc-grid)" />

            {/* Axes */}
            <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + plotH} stroke="#0f172a" strokeWidth="1.4" />
            <line x1={PAD_L} y1={PAD_T + plotH} x2={PAD_L + plotW} y2={PAD_T + plotH} stroke="#0f172a" strokeWidth="1.4" />

            {/* Axis labels */}
            <text x={PAD_L + plotW / 2} y={H - 10} textAnchor="middle" fontSize="11" fill="#475569" fontFamily="serif" fontStyle="italic">
              time (s)
            </text>
            <text x={14} y={PAD_T + plotH / 2} fontSize="11" fill="#475569" fontFamily="serif" fontStyle="italic" transform={`rotate(-90 14 ${PAD_T + plotH / 2})`} textAnchor="middle">
              distance (m)
            </text>

            {/* Tick marks */}
            {[0, 2, 4, 6, 8, 10].map((tk) => (
              <g key={`tx-${tk}`}>
                <line x1={xOf(tk)} y1={PAD_T + plotH} x2={xOf(tk)} y2={PAD_T + plotH + 4} stroke="#64748b" />
                <text x={xOf(tk)} y={PAD_T + plotH + 16} fontSize="10" fill="#64748b" textAnchor="middle">{tk}</text>
              </g>
            ))}
            {[0, 20, 40, 60].map((dk) => (
              <g key={`dy-${dk}`}>
                <line x1={PAD_L - 4} y1={yOf(dk)} x2={PAD_L} y2={yOf(dk)} stroke="#64748b" />
                <text x={PAD_L - 7} y={yOf(dk) + 3} fontSize="10" fill="#64748b" textAnchor="end">{dk}</text>
              </g>
            ))}

            {/* Distance curve */}
            <path d={curve} fill="none" stroke="#1d4ed8" strokeWidth="2.5" />

            {/* Tangent line */}
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 3" />

            {/* Tangent slope label box */}
            <g transform={`translate(${tx + 14} ${ty - 30})`}>
              <rect x={-2} y={-12} width={92} height={20} rx={4} fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <text x={3} y={3} fontSize="11" fill="#991b1b" fontFamily="serif" fontStyle="italic" fontWeight="700">
                slope = {speed.toFixed(2)} m/s
              </text>
            </g>

            {/* Point on curve */}
            <circle cx={tx} cy={ty} r={6} fill="#dc2626" stroke="#fff" strokeWidth="2" />
          </svg>
        </div>

        <div className="space-y-3">
          <CalcStat label={isKh ? "ពេលវេលា" : "Time"} value={`${t.toFixed(1)} s`} colour="slate" />
          <CalcStat label={isKh ? "ចម្ងាយ" : "Distance"} value={`${distance.toFixed(1)} m`} colour="blue" />
          <CalcStat label={isKh ? "ល្បឿនភ្លាមៗ (ជម្រាល)" : "Speed (slope)"} value={`${speed.toFixed(2)} m/s`} colour="rose" />
          <div>
            <label className={`text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
              {isKh ? "ផ្លាស់ទីពេលវេលា" : "Move time"}
            </label>
            <input
              type="range"
              min={0.5} max={CAR_T_MAX} step={0.1}
              value={t}
              onChange={(e) => setT(parseFloat(e.target.value))}
              className="w-full accent-rose-600"
              aria-label="Time"
            />
          </div>
          <div className={`text-xs text-slate-600 italic font-serif p-2 bg-blue-50/60 rounded-lg border border-blue-200 ${isKh ? "font-khmer not-italic" : ""}`}>
            <I>d</I>(<I>t</I>) = ½ · <I>a</I> · <I>t</I><sup>2</sup> &nbsp;→&nbsp; <I>d</I> ′(<I>t</I>) = <I>a</I> · <I>t</I>
          </div>
        </div>
      </div>
    </PaperCard>
  );
}

function CalcStat({ label, value, colour }: { label: string; value: string; colour: "slate" | "blue" | "rose" }) {
  const cls = colour === "blue" ? "bg-blue-50 border-blue-200 text-blue-800"
    : colour === "rose" ? "bg-rose-50 border-rose-200 text-rose-800"
    : "bg-slate-50 border-slate-200 text-slate-800";
  return (
    <div className={`rounded-lg border p-3 ${cls}`}>
      <div className="text-[10px] uppercase tracking-wider font-bold opacity-80">{label}</div>
      <div className="font-mono font-bold text-xl tabular-nums">{value}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4b. Calculus — Integrals (area under curve = total distance)
// ════════════════════════════════════════════════════════════════════════════

function IntegralCard({ isKh }: { isKh: boolean }) {
  const [t, setT] = useState(6);

  const W = 480, H = 240;
  const PAD_L = 50, PAD_R = 16, PAD_T = 16, PAD_B = 36;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const MAX_V = CAR_ACCEL * CAR_T_MAX; // top speed in window (14 m/s)

  const xOf = (sec: number) => PAD_L + (sec / CAR_T_MAX) * plotW;
  const yOf = (v: number) => PAD_T + (1 - v / MAX_V) * plotH;

  // Speed line v(t) = a*t — straight line from (0,0) to (T, a*T)
  const speedAtT = CAR_ACCEL * t;
  const totalDistance = 0.5 * CAR_ACCEL * t * t; // ∫₀ᵗ a·s ds

  // Filled area under v(t) from 0 to t — a triangle
  const areaPath = `
    M ${xOf(0)} ${yOf(0)}
    L ${xOf(t)} ${yOf(0)}
    L ${xOf(t)} ${yOf(speedAtT)}
    Z
  `;

  // Speed-line full extent
  const lineX1 = xOf(0), lineY1 = yOf(0);
  const lineX2 = xOf(CAR_T_MAX), lineY2 = yOf(MAX_V);

  return (
    <PaperCard className="p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center flex-shrink-0">
          <AreaChart className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Integral — តំបន់ក្រោមខ្សែ = ចម្ងាយសរុប" : "Integral — area under the curve = total distance"}
          </h3>
          <p className={`text-sm text-slate-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? (
              <>បច្ចុប្បន្ននេះគ្រាហ្វិកបង្ហាញ <I>ល្បឿន</I> ធៀបនឹង <I>ពេលវេលា</I>។ ផ្ទៃនៃតំបន់ខៀវ — ល្បឿន × ពេលវេលា — គឺជា <strong>ចម្ងាយដែលឡានបានធ្វើដំណើរ</strong>។</>
            ) : (
              <>The graph now shows <I>speed</I> vs <I>time</I>. The blue area — speed × time — is the <strong>total distance the car has travelled</strong>.</>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
        <div className="bg-white rounded-xl border border-blue-200 p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
            <rect x={PAD_L} y={PAD_T} width={plotW} height={plotH} fill="url(#calc-grid)" />

            {/* Axes */}
            <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + plotH} stroke="#0f172a" strokeWidth="1.4" />
            <line x1={PAD_L} y1={PAD_T + plotH} x2={PAD_L + plotW} y2={PAD_T + plotH} stroke="#0f172a" strokeWidth="1.4" />

            <text x={PAD_L + plotW / 2} y={H - 10} textAnchor="middle" fontSize="11" fill="#475569" fontFamily="serif" fontStyle="italic">
              time (s)
            </text>
            <text x={14} y={PAD_T + plotH / 2} fontSize="11" fill="#475569" fontFamily="serif" fontStyle="italic" transform={`rotate(-90 14 ${PAD_T + plotH / 2})`} textAnchor="middle">
              speed (m/s)
            </text>

            {[0, 2, 4, 6, 8, 10].map((tk) => (
              <g key={`tx-${tk}`}>
                <line x1={xOf(tk)} y1={PAD_T + plotH} x2={xOf(tk)} y2={PAD_T + plotH + 4} stroke="#64748b" />
                <text x={xOf(tk)} y={PAD_T + plotH + 16} fontSize="10" fill="#64748b" textAnchor="middle">{tk}</text>
              </g>
            ))}
            {[0, 4, 8, 12].map((vk) => (
              <g key={`dy-${vk}`}>
                <line x1={PAD_L - 4} y1={yOf(vk)} x2={PAD_L} y2={yOf(vk)} stroke="#64748b" />
                <text x={PAD_L - 7} y={yOf(vk) + 3} fontSize="10" fill="#64748b" textAnchor="end">{vk}</text>
              </g>
            ))}

            {/* Filled area under curve up to t */}
            <path d={areaPath} fill="rgba(29,78,216,0.25)" stroke="none" />
            {/* Hatch lines for "area" feel */}
            <pattern id="int-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#1d4ed8" strokeWidth="0.7" opacity="0.4" />
            </pattern>
            <path d={areaPath} fill="url(#int-hatch)" />

            {/* Speed line */}
            <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} stroke="#1d4ed8" strokeWidth="2.5" />

            {/* Vertical drop at t */}
            <line x1={xOf(t)} y1={yOf(speedAtT)} x2={xOf(t)} y2={yOf(0)} stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx={xOf(t)} cy={yOf(speedAtT)} r={5.5} fill="#1d4ed8" stroke="#fff" strokeWidth="2" />

            {/* Area label */}
            <g transform={`translate(${xOf(t / 2) - 22} ${yOf(speedAtT / 2) - 6})`}>
              <rect x={-4} y={-12} width={64} height={20} rx={4} fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1" />
              <text x={28} y={3} fontSize="11" fill="#1e3a8a" fontFamily="serif" fontStyle="italic" fontWeight="700" textAnchor="middle">
                area = {totalDistance.toFixed(1)} m
              </text>
            </g>
          </svg>
        </div>

        <div className="space-y-3">
          <CalcStat label={isKh ? "ពេលវេលាបច្ចុប្បន្ន" : "Current time"} value={`${t.toFixed(1)} s`} colour="slate" />
          <CalcStat label={isKh ? "ល្បឿន ឥឡូវ" : "Speed now"} value={`${speedAtT.toFixed(2)} m/s`} colour="rose" />
          <CalcStat label={isKh ? "ចម្ងាយសរុប = ផ្ទៃ" : "Total distance = area"} value={`${totalDistance.toFixed(1)} m`} colour="blue" />
          <div>
            <label className={`text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
              {isKh ? "ផ្លាស់ទីពេលវេលា" : "Move time"}
            </label>
            <input
              type="range"
              min={0.5} max={CAR_T_MAX} step={0.1}
              value={t}
              onChange={(e) => setT(parseFloat(e.target.value))}
              className="w-full accent-blue-600"
              aria-label="Time"
            />
          </div>
          <div className={`text-xs text-slate-600 italic font-serif p-2 bg-blue-50/60 rounded-lg border border-blue-200 ${isKh ? "font-khmer not-italic" : ""}`}>
            ∫<sub>0</sub><sup><I>t</I></sup> <I>a</I> · <I>s</I> &nbsp;<I>ds</I> = ½ · <I>a</I> · <I>t</I><sup>2</sup>
          </div>
        </div>
      </div>

      <div className={`mt-4 flex items-start gap-2 text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <Info className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
        <span>
          {isKh
            ? "ចំណាំ៖ derivative នៃចម្ងាយផ្ដល់ឲ្យអ្នកនូវល្បឿន ; integral នៃល្បឿនផ្ដល់ឲ្យអ្នកនូវចម្ងាយ។ វាគឺជា Fundamental Theorem of Calculus — ប្រតិបត្តិការទាំងពីរគឺជាមុខងារត្រឡប់នៃគ្នាទៅវិញទៅមក។"
            : "Notice: the derivative of distance gives you speed; the integral of speed gives you distance back. That's the Fundamental Theorem of Calculus — the two operations are inverses of each other."}
        </span>
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5a. Sequences vs Series — the difference
// ════════════════════════════════════════════════════════════════════════════

function Frac({ n, d }: { n: React.ReactNode; d: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center align-middle leading-none mx-0.5 font-serif">
      <span className="text-[0.78em] px-1">{n}</span>
      <span className="border-t border-current w-full" />
      <span className="text-[0.78em] px-1">{d}</span>
    </span>
  );
}

function SequenceVsSeriesCard({ isKh }: { isKh: boolean }) {
  return (
    <PaperCard className="p-5 sm:p-6" data-testid="sequence-vs-series">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center flex-shrink-0">
          <Sigma className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "លំដាប់ និងស៊េរី — តើខុសគ្នាដូចម្ដេច?" : "Sequence vs Series — what's the difference?"}
          </h3>
          <p className={`text-sm text-slate-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ដូចគ្នានឹងលេខទាំងនោះ — ប៉ុន្តែសញ្ញារវាងពួកវា ផ្លាស់ប្តូរអ្វីៗគ្រប់យ៉ាង។ សញ្ញាក្បៀស (,) ផ្ដល់ឱ្យអ្នកនូវ លំដាប់។ សញ្ញាបូក (+) ផ្ដល់ឱ្យអ្នកនូវ ស៊េរី។"
              : "Same numbers — but the symbols between them change everything. Commas (,) give you a sequence. Plus signs (+) give you a series."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sequence */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5" data-testid="sequence-panel">
          <div className={`text-[10px] uppercase tracking-widest font-bold text-blue-700 mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
            {isKh ? "លំដាប់" : "Sequence · លំដាប់"}
          </div>
          <div className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "បញ្ជីលេខ ដែលបំបែកដោយសញ្ញាក្បៀស ហើយធ្វើតាមច្បាប់មួយ។"
              : "A comma-separated list of numbers that follows a rule."}
          </div>
          <div className="rounded-lg bg-white border border-blue-200 px-4 py-4 text-center font-serif text-xl text-slate-900">
            1<span className="text-blue-700 font-bold">,</span>{" "}
            <Frac n="1" d="2" /><span className="text-blue-700 font-bold">,</span>{" "}
            <Frac n="1" d="4" /><span className="text-blue-700 font-bold">,</span>{" "}
            <Frac n="1" d="8" /><span className="text-blue-700 font-bold">,</span>{" "}
            <span className="italic text-slate-600">…</span>
          </div>
          <div className={`mt-3 text-xs text-slate-600 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? (
              <>ច្បាប់៖ តួនីមួយៗគឺ <I>a</I><sub>n</sub> = <Frac n="1" d={<>2<sup>n−1</sup></>} /> — ពាក់កណ្ដាលនៃតួមុន។</>
            ) : (
              <>Rule: each term is <I>a</I><sub>n</sub> = <Frac n="1" d={<>2<sup>n−1</sup></>} /> — half of the one before.</>
            )}
          </div>
        </div>

        {/* Series */}
        <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5" data-testid="series-panel">
          <div className={`text-[10px] uppercase tracking-widest font-bold text-rose-700 mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
            {isKh ? "ស៊េរី" : "Series · ស៊េរី"}
          </div>
          <div className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "អ្វីដែលកើតឡើង ពេលអ្នកបូកលេខទាំងអស់ ក្នុងបញ្ជីរួមគ្នា។"
              : "What happens when you add all the numbers in the list together."}
          </div>
          <div className="rounded-lg bg-white border border-rose-200 px-4 py-4 text-center font-serif text-xl text-slate-900">
            1<span className="text-rose-700 font-bold"> + </span>
            <Frac n="1" d="2" /><span className="text-rose-700 font-bold"> + </span>
            <Frac n="1" d="4" /><span className="text-rose-700 font-bold"> + </span>
            <Frac n="1" d="8" /><span className="text-rose-700 font-bold"> + </span>
            <span className="italic text-slate-600">…</span>
          </div>
          <div className={`mt-3 text-xs text-slate-600 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? (
              <>សរសេរក្នុងសញ្ញា Σ៖ <span className="font-serif italic text-base text-stone-900">∑<sub>n=0</sub><sup>∞</sup> <Frac n="1" d={<>2<sup>n</sup></>} /></span> — សួរសំណួរ៖ តើផលបូកនេះ មានចម្លើយកំណត់ដែរឬទេ?</>
            ) : (
              <>Written with sigma: <span className="font-serif italic text-base text-stone-900">∑<sub>n=0</sub><sup>∞</sup> <Frac n="1" d={<>2<sup>n</sup></>} /></span> — asks: does this sum settle on a finite answer?</>
            )}
          </div>
        </div>
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5b. Zeno's Paradox — convergent geometric series
// ════════════════════════════════════════════════════════════════════════════

function ZenoParadoxCard({ isKh }: { isKh: boolean }) {
  const [steps, setSteps] = useState(4);
  const partial = 1 - Math.pow(0.5, steps);

  // Walk to the wall: each step is half of the remaining distance.
  const W = 480, H = 150;
  const padX = 30;
  const wallX = W - padX;
  const startX = padX;
  const length = wallX - startX;
  // Person stands at startX + length * partial
  const personX = startX + length * partial;

  return (
    <PaperCard className="p-5 sm:p-6" data-testid="zeno-paradox">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-emerald-700" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ទ្រឹស្ដីកាលវិភាគអនន្តរបស់ Zeno — ការរួម" : "Zeno's Paradox — convergence"}
          </h3>
          <p className={`text-sm text-slate-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? (
              <>តើអ្នកអាចបូកលេខអនន្តចំនួន ដើម្បីទទួលបានចម្លើយកំណត់ បានដោយរបៀបណា? ស្រមៃថា អ្នកដើរទៅជញ្ជាំង។ ដំបូង អ្នកដើរកន្លះផ្លូវ (<Frac n="1" d="2" />)។ បន្ទាប់មក កន្លះនៃផ្លូវដែលនៅសល់ (<Frac n="1" d="4" />)។ បន្ទាប់មក កន្លះម្ដងទៀត (<Frac n="1" d="8" />)។ អ្នកនឹងធ្វើការបោះជំហានចំនួនអនន្ត — ប៉ុន្តែ អ្នកនឹងមិនដើរលើសពីផ្លូវសរុប (<I>1</I>) ឡើយ។</>
            ) : (
              <>How can you add infinitely many numbers and still get a finite total? Imagine walking toward a wall. First you walk half the distance (<Frac n="1" d="2" />). Then half of what remains (<Frac n="1" d="4" />). Then half again (<Frac n="1" d="8" />). You take infinitely many steps — but you never walk further than the total distance (<I>1</I>).</>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
        {/* Walking-toward-wall visual */}
        <div className="bg-white rounded-xl border border-blue-200 p-3" data-testid="zeno-walk">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
            {/* Ground */}
            <line x1={startX - 6} y1="105" x2={wallX + 6} y2="105" stroke="#0f172a" strokeWidth="1.5" />

            {/* Wall */}
            <rect x={wallX} y="40" width="14" height="65" fill="#475569" />
            <text x={wallX + 7} y="125" textAnchor="middle" fontSize="10" fill="#475569" fontStyle="italic" fontFamily="serif">
              <tspan className={isKh ? "font-khmer" : "italic"}>{isKh ? "ជញ្ជាំង" : "wall"}</tspan>
            </text>

            {/* Distance bracket */}
            <line x1={startX} y1="20" x2={wallX} y2="20" stroke="#94a3b8" strokeWidth="1" />
            <line x1={startX} y1="14" x2={startX} y2="26" stroke="#94a3b8" strokeWidth="1" />
            <line x1={wallX}  y1="14" x2={wallX}  y2="26" stroke="#94a3b8" strokeWidth="1" />
            <text x={(startX + wallX) / 2} y="13" textAnchor="middle" fontSize="11" fill="#475569" fontStyle="italic" fontFamily="serif">
              <tspan className={isKh ? "font-khmer" : "italic"}>{isKh ? "ចម្ងាយ = ១" : "distance = 1"}</tspan>
            </text>

            {/* Each step bracket */}
            {Array.from({ length: Math.min(steps, 6) }).map((_, i) => {
              const startFrac = 1 - Math.pow(0.5, i);
              const endFrac   = 1 - Math.pow(0.5, i + 1);
              const x1 = startX + length * startFrac;
              const x2 = startX + length * endFrac;
              const colors = ["#1d4ed8", "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#0891b2"];
              const c = colors[i % colors.length];
              const y = 138;
              return (
                <g key={i}>
                  <line x1={x1} y1={y} x2={x2} y2={y} stroke={c} strokeWidth="2.5" />
                  <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} stroke={c} strokeWidth="2.5" />
                  <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} stroke={c} strokeWidth="2.5" />
                </g>
              );
            })}

            {/* Person — small stick figure */}
            <g transform={`translate(${personX} 105)`} style={{ transition: "transform 350ms ease-out" }}>
              <circle cx="0" cy="-30" r="6" fill="#0f172a" />
              <line x1="0" y1="-24" x2="0" y2="-8" stroke="#0f172a" strokeWidth="2" />
              <line x1="0" y1="-18" x2="-7" y2="-12" stroke="#0f172a" strokeWidth="2" />
              <line x1="0" y1="-18" x2="7"  y2="-12" stroke="#0f172a" strokeWidth="2" />
              <line x1="0" y1="-8"  x2="-5" y2="0"   stroke="#0f172a" strokeWidth="2" />
              <line x1="0" y1="-8"  x2="5"  y2="0"   stroke="#0f172a" strokeWidth="2" />
            </g>

            {/* Position marker */}
            <line x1={personX} y1="40" x2={personX} y2="105" stroke="#dc2626" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Stats + slider */}
        <div className="space-y-3">
          <CalcStat label={isKh ? "ចំនួនជំហាន" : "Steps taken"} value={`${steps}`} colour="slate" />
          <CalcStat
            label={isKh ? "ផលបូករហូតមកដល់" : "Sum so far"}
            value={partial.toFixed(steps >= 6 ? 6 : 4)}
            colour="blue"
          />
          <CalcStat
            label={isKh ? "ដែនកំណត់ (n→∞)" : "Limit (n→∞)"}
            value="1"
            colour="rose"
          />

          <div>
            <label className={`text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
              {isKh ? "បន្ថែមជំហាន" : "Add more steps"}
            </label>
            <input
              type="range"
              min={1} max={20} step={1}
              value={steps}
              onChange={(e) => setSteps(parseInt(e.target.value, 10))}
              className="w-full accent-rose-600"
              aria-label="Number of steps"
              data-testid="zeno-steps-slider"
            />
          </div>

          <div className="text-xs text-slate-700 italic font-serif p-3 bg-emerald-50/60 rounded-lg border border-emerald-200" data-testid="zeno-formula">
            <div className="text-center text-base mb-1">
              ∑<sub>n=1</sub><sup>∞</sup> <Frac n="1" d={<>2<sup>n</sup></>} /> = 1
            </div>
            <div className={`text-[11px] text-slate-600 not-italic text-center ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? "ផលបូករបស់ស៊េរី រួមមកជិតលេខ ១ ប៉ុន្តែមិនលើសពីវា" : "the sum converges toward 1 but never overshoots it"}
            </div>
          </div>
        </div>
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5c. Harmonic Series — divergence trap
// ════════════════════════════════════════════════════════════════════════════

function HarmonicTrapCard({ isKh }: { isKh: boolean }) {
  const [terms, setTerms] = useState(10);

  const partial = useMemo(() => {
    let s = 0;
    for (let k = 1; k <= terms; k++) s += 1 / k;
    return s;
  }, [terms]);

  // For a feel of "how long to reach 10/20/100", show milestones
  const MILESTONES = [
    { sum: 4,   terms: 31,                en: "to reach 4",   kh: "ដើម្បីឱ្យបាន ៤" },
    { sum: 10,  terms: 12_367,            en: "to reach 10",  kh: "ដើម្បីឱ្យបាន ១០" },
    { sum: 20,  terms: 272_400_600,       en: "to reach 20",  kh: "ដើម្បីឱ្យបាន ២០" },
    { sum: 100, terms: 1.5e43,            en: "to reach 100", kh: "ដើម្បីឱ្យបាន ១០០" },
  ];

  const fmt = (n: number) =>
    n >= 1e6 ? n.toExponential(1).replace("e+", " × 10^").replace("^0", "^") : n.toLocaleString();

  return (
    <PaperCard className="p-5 sm:p-6" data-testid="harmonic-trap">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
          <Mountain className="w-5 h-5 text-amber-700" />
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ស៊េរីអាម៉ូនិក — អន្ទាក់នៃអនន្ត" : "The Harmonic Series — the trap of infinity"}
          </h3>
          <p className={`text-sm text-slate-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? (
              <>មើលទៅស្រដៀងនឹងស៊េរីរបស់ Zeno ខ្លាំង — តួនីមួយៗ ក្លាយជាតូចជាងមុន។ ប៉ុន្តែលេខទាំងនេះ មិនតូចចុះ លឿនល្មមនោះទេ។ ស៊េរីនេះ ព្រែក ទៅអនន្ត — ផលបូករបស់វា កើនឡើងគ្មានដែនកំណត់ ទោះបីយឺតយ៉ាងណាក៏ដោយ។</>
            ) : (
              <>Looks a lot like Zeno's series — each term is smaller than the last. But these numbers don't shrink fast enough. This series <em className="font-serif">diverges</em> to infinity — its sum grows without limit, however slowly.</>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
        {/* Sigma + first terms */}
        <div className="bg-white rounded-xl border border-amber-200 p-5" data-testid="harmonic-formula">
          <div className="text-center font-serif text-2xl text-slate-900 mb-3">
            ∑<sub>n=1</sub><sup>∞</sup> <Frac n="1" d="n" />{" "}
            <span className="text-slate-500">=</span> 1
            <span className="text-amber-700 font-bold"> + </span>
            <Frac n="1" d="2" /><span className="text-amber-700 font-bold"> + </span>
            <Frac n="1" d="3" /><span className="text-amber-700 font-bold"> + </span>
            <Frac n="1" d="4" /><span className="text-amber-700 font-bold"> + </span>
            <Frac n="1" d="5" /><span className="text-amber-700 font-bold"> + </span>
            <span className="italic text-slate-600">…</span>{" "}
            <span className="text-rose-600">→ ∞</span>
          </div>

          <div className={`mt-4 text-xs text-slate-600 italic font-serif text-center ${isKh ? "font-khmer not-italic leading-loose" : ""}`}>
            {isKh
              ? "តួនីមួយៗតូចជាងមុន — ប៉ុន្តែផលបូកនៅតែបន្តកើនឡើង រហូតគ្មានទីបញ្ចប់។"
              : "Each term is smaller than the last — but the sum keeps creeping upward, forever."}
          </div>

          {/* Milestone table */}
          <div className="mt-4 rounded-lg border border-amber-200 overflow-x-auto">
            <table className="w-full text-xs min-w-[320px]">
              <thead className="bg-amber-50">
                <tr>
                  <th className={`text-left px-3 py-2 font-bold text-amber-900 ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? "ដើម្បីឱ្យផលបូក…" : "To reach a sum of…"}
                  </th>
                  <th className={`text-right px-3 py-2 font-bold text-amber-900 ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? "តួដែលត្រូវការ" : "terms needed"}
                  </th>
                </tr>
              </thead>
              <tbody className="font-serif">
                {MILESTONES.map((m) => (
                  <tr key={m.sum} className="border-t border-amber-100">
                    <td className="px-3 py-1.5 text-slate-700">{m.sum}</td>
                    <td className="px-3 py-1.5 text-right tabular-nums text-slate-900 font-bold">{fmt(m.terms)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={`bg-amber-50/60 px-3 py-2 text-[11px] text-amber-900 italic ${isKh ? "font-khmer not-italic leading-loose" : ""}`}>
              {isKh
                ? "ចំណាំ៖ ដើម្បីឱ្យផលបូកកើនពី ៩៩ ទៅ ១០០ អ្នកត្រូវការតួរាប់លានពាន់លានដង បន្ថែមទៀត — ប៉ុន្តែវាបន្តទៅ ជានិច្ច។"
                : "Note: going from a sum of 99 to 100 takes more terms than there are atoms in many galaxies — but it always gets there."}
            </div>
          </div>
        </div>

        {/* Live partial sum */}
        <div className="space-y-3">
          <CalcStat label={isKh ? "ចំនួនតួ (n)" : "Number of terms (n)"} value={`${terms}`} colour="slate" />
          <CalcStat
            label={isKh ? "ផលបូកផ្នែក H_n" : "Partial sum H_n"}
            value={partial.toFixed(4)}
            colour="rose"
          />
          <div>
            <label className={`text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
              {isKh ? "បន្ថែមតួ" : "Add more terms"}
            </label>
            <input
              type="range"
              min={1} max={1000} step={1}
              value={terms}
              onChange={(e) => setTerms(parseInt(e.target.value, 10))}
              className="w-full accent-rose-600"
              aria-label="Number of terms"
              data-testid="harmonic-terms-slider"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>1</span><span>500</span><span>1000</span>
            </div>
          </div>
          <div className={`text-xs text-slate-700 p-3 bg-rose-50/60 rounded-lg border border-rose-200 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ជម្រុញរហូត ១០០០ តួ — ផលបូកនៅតែស្ថិតក្នុងចន្លោះតែជា ៧.៥ ប៉ុណ្ណោះ! ការព្រែករបស់វា យឺតមែន ប៉ុន្តែមានពិត។"
              : "Push it all the way to 1000 terms — the sum is still only about 7.5! Its divergence is achingly slow, but absolutely real."}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50/40 p-4" data-testid="convergence-vs-divergence">
        <div className={`text-xs uppercase font-bold tracking-widest text-blue-800 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          {isKh ? "ការរួម ប្រឆាំងនឹង ការព្រែក" : "Convergence vs Divergence"}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <div className={`font-bold text-emerald-800 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ការរួម" : "Convergence — ការរួម"}
            </div>
            <div className={`text-slate-700 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "ផលបូកគឺឈរនៅលើលេខកំណត់មួយ។ ឧ. Zeno → 1។"
                : "The sum settles on a finite number. e.g. Zeno → 1."}
            </div>
          </div>
          <div>
            <div className={`font-bold text-rose-800 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ការព្រែក" : "Divergence — ការព្រែក"}
            </div>
            <div className={`text-slate-700 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "ផលបូកកើនឡើងគ្មានដែនកំណត់។ ឧ. ហាម៉ូនិក → ∞។"
                : "The sum grows without limit. e.g. Harmonic → ∞."}
            </div>
          </div>
        </div>
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4. Unit Circle — drafting-paper aesthetic
// ════════════════════════════════════════════════════════════════════════════

/* Drafting-paper background reusable for unit-circle cards */
function DraftingPaperBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="draft-grid-sm" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#bfdbfe" strokeWidth="0.6" />
          </pattern>
          <pattern id="draft-grid-lg" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="url(#draft-grid-sm)" />
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60a5fa" strokeWidth="0.9" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#draft-grid-lg)" />
      </svg>
    </div>
  );
}

/* ── Card 1: The Radius of One ─────────────────────────────────────────── */
function RadiusOfOneCard({ isKh }: { isKh: boolean }) {
  const [angle, setAngle] = useState<number>(50); // degrees
  const [showExtended, setShowExtended] = useState<boolean>(false);
  const rad = (angle * Math.PI) / 180;
  const cosV = Math.cos(rad);
  const sinV = Math.sin(rad);

  // Drag handle
  const svgRef = useRef<SVGSVGElement | null>(null);
  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svgRef.current.getScreenCTM();
    if (!ctm) return;
    const p = pt.matrixTransform(ctm.inverse());
    const dx = p.x - 200;
    const dy = -(p.y - 200);
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (deg < 0) deg += 360;
    setAngle(deg);
  };

  // SVG pixel coords
  const cx = 200;
  const cy = 200;
  const R = 140;
  const px = cx + R * cosV;
  const py = cy - R * sinV;

  // ── Extended trig functions (tan, sec, cot, csc) ──
  // Geometry uses unit-circle coordinates (1 = R px). The SVG viewBox is 400×400
  // with the origin at (cx, cy), so the visible half-width in unit coords is
  // MAX_U = 200/140 ≈ 1.4286 — we cap any extended drawing to this box so
  // near-vertical/horizontal angles never shoot off-canvas.
  const EPS = 1e-3;
  const MAX_U = 200 / R;
  const tanDefined = Math.abs(cosV) > EPS;
  const cotDefined = Math.abs(sinV) > EPS;
  const tanV = tanDefined ? sinV / cosV : null;
  const secV = tanDefined ? 1 / cosV : null;
  const cotV = cotDefined ? cosV / sinV : null;
  const cscV = cotDefined ? 1 / sinV : null;
  const toX = (u: number) => cx + R * u;
  const toY = (u: number) => cy - R * u;
  // Cap a unit-coord point to the visible box (preserves direction from origin).
  const capToBox = (ux: number, uy: number): [number, number] => {
    const ax = Math.abs(ux);
    const ay = Math.abs(uy);
    const maxA = Math.max(ax, ay);
    if (maxA <= MAX_U || maxA === 0) return [ux, uy];
    const k = MAX_U / maxA;
    return [ux * k, uy * k];
  };
  // Cap a 1-D coord (for the tan/cot segments which run parallel to an axis).
  const cap1 = (v: number): number => Math.max(-MAX_U, Math.min(MAX_U, v));

  const fmt = (v: number | null): string =>
    v === null
      ? (isKh ? "មិនកំណត់" : "Undefined")
      : v.toFixed(3);

  return (
    <PaperCard className="p-5 sm:p-6 mb-6 relative overflow-hidden" data-testid="radius-of-one">
      <DraftingPaperBg />
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-800 font-bold font-serif italic">
          r=1
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "កាំស្មើនឹង ១ — អាថ៌កំបាំងសំខាន់" : "The Radius of One — the core secret"}
          </h3>
          <p className={`text-sm text-slate-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ពាក្យ \"ឯកតា\" ក្នុង \"រង្វង់ឯកតា\" មានន័យត្រឹមតែមួយ៖ កាំគឺពិតប្រាកដ ១។"
              : "The word “Unit” in “Unit Circle” means one thing only: the radius is exactly 1."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-start">
        {/* Drafting drawing */}
        <div className="rounded-xl border-2 border-slate-900/15 bg-white/80 backdrop-blur-sm p-3" data-testid="unit-circle-svg-wrap">
          <svg
            ref={svgRef}
            viewBox="0 0 400 400"
            className="w-full h-auto cursor-pointer touch-none select-none"
            onPointerDown={handlePointer}
            onPointerMove={(e) => {
              if (e.buttons === 1) handlePointer(e);
            }}
            data-testid="unit-circle-svg"
          >
            {/* graph paper grid */}
            <defs>
              <pattern id="uc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dbeafe" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#uc-grid)" />
            {/* axes */}
            <line x1="0" y1={cy} x2="400" y2={cy} stroke="#0f172a" strokeWidth="1.5" />
            <line x1={cx} y1="0" x2={cx} y2="400" stroke="#0f172a" strokeWidth="1.5" />
            {/* tick labels */}
            <text x={cx + R + 8} y={cy - 6} fontSize="11" fill="#0f172a" fontFamily="serif" fontStyle="italic">x</text>
            <text x={cx + 6} y={cy - R - 4} fontSize="11" fill="#0f172a" fontFamily="serif" fontStyle="italic">y</text>
            <text x={cx + R - 4} y={cy + 14} fontSize="10" fill="#475569" fontFamily="serif">1</text>
            <text x={cx - R - 12} y={cy + 14} fontSize="10" fill="#475569" fontFamily="serif">−1</text>
            <text x={cx + 4} y={cy - R + 12} fontSize="10" fill="#475569" fontFamily="serif">1</text>
            <text x={cx + 4} y={cy + R - 2} fontSize="10" fill="#475569" fontFamily="serif">−1</text>
            {/* the unit circle */}
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#0f172a" strokeWidth="2" />
            {/* dropped lines (cos along x, sin along y) */}
            <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#dc2626" strokeWidth="2.5" />
            <line x1={px} y1={cy} x2={px} y2={py} stroke="#16a34a" strokeWidth="2.5" />
            {/* radius */}
            <line x1={cx} y1={cy} x2={px} y2={py} stroke="#1e3a8a" strokeWidth="2" />

            {/* ── Extended trig construction (toggle) ────────────────────── */}
            {showExtended && (
              <g data-testid="uc-extended-group">
                {/* Vertical tangent guide line at x = 1 (touches circle at (1,0)) */}
                <line
                  x1={toX(1)}
                  y1={toY(MAX_U)}
                  x2={toX(1)}
                  y2={toY(-MAX_U)}
                  stroke="#92400e"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={0.5}
                />
                {/* Horizontal cotangent guide line at y = 1 (touches circle at (0,1)) */}
                <line
                  x1={toX(-MAX_U)}
                  y1={toY(1)}
                  x2={toX(MAX_U)}
                  y2={toY(1)}
                  stroke="#0d9488"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity={0.5}
                />

                {/* Secant ray: from origin through point, capped to (1, tan θ) or box edge */}
                {tanDefined && (() => {
                  const [ex, ey] = capToBox(1, tanV!);
                  return (
                    <line
                      x1={cx}
                      y1={cy}
                      x2={toX(ex)}
                      y2={toY(ey)}
                      stroke="#6366f1"
                      strokeWidth="2"
                      data-testid="uc-sec-ray"
                    />
                  );
                })()}
                {/* Tangent segment: vertical from (1,0) up/down to (1, tan θ), capped */}
                {tanDefined && (
                  <line
                    x1={toX(1)}
                    y1={toY(0)}
                    x2={toX(1)}
                    y2={toY(cap1(tanV!))}
                    stroke="#92400e"
                    strokeWidth="3"
                    data-testid="uc-tan-seg"
                  />
                )}

                {/* Cosecant ray: from origin through point, capped to (cot θ, 1) or box edge */}
                {cotDefined && (() => {
                  const [ex, ey] = capToBox(cotV!, 1);
                  return (
                    <line
                      x1={cx}
                      y1={cy}
                      x2={toX(ex)}
                      y2={toY(ey)}
                      stroke="#db2777"
                      strokeWidth="2"
                      data-testid="uc-csc-ray"
                    />
                  );
                })()}
                {/* Cotangent segment: horizontal from (0,1) to (cot θ, 1), capped */}
                {cotDefined && (
                  <line
                    x1={toX(0)}
                    y1={toY(1)}
                    x2={toX(cap1(cotV!))}
                    y2={toY(1)}
                    stroke="#0d9488"
                    strokeWidth="3"
                    data-testid="uc-cot-seg"
                  />
                )}

                {/* Small labels (only when value fits comfortably on-canvas) */}
                {tanDefined && Math.abs(tanV!) < MAX_U && (
                  <text
                    x={toX(1) + 6}
                    y={toY(tanV! / 2) + 4}
                    fontSize="11"
                    fontStyle="italic"
                    fontFamily="serif"
                    fill="#92400e"
                  >
                    tan θ
                  </text>
                )}
                {cotDefined && Math.abs(cotV!) < MAX_U && (
                  <text
                    x={toX(cotV! / 2)}
                    y={toY(1) - 6}
                    textAnchor="middle"
                    fontSize="11"
                    fontStyle="italic"
                    fontFamily="serif"
                    fill="#0d9488"
                  >
                    cot θ
                  </text>
                )}
              </g>
            )}

            {/* arc for theta */}
            <path
              d={`M ${cx + 28} ${cy} A 28 28 0 ${angle > 180 ? 1 : 0} 0 ${cx + 28 * cosV} ${cy - 28 * sinV}`}
              fill="none"
              stroke="#7c3aed"
              strokeWidth="1.5"
            />
            <text x={cx + 36 * Math.cos(rad / 2)} y={cy - 36 * Math.sin(rad / 2) + 4} fontSize="13" fontStyle="italic" fontFamily="serif" fill="#7c3aed">
              θ
            </text>
            {/* point */}
            <circle cx={px} cy={py} r="7" fill="white" stroke="#1e3a8a" strokeWidth="2" />
            <circle cx={px} cy={py} r="3.5" fill="#1e3a8a" />
            {/* point label */}
            <text
              x={px + (cosV >= 0 ? 12 : -12)}
              y={py + (sinV >= 0 ? -10 : 18)}
              textAnchor={cosV >= 0 ? "start" : "end"}
              fontSize="12"
              fontFamily="serif"
              fontStyle="italic"
              fill="#1e3a8a"
            >
              ({cosV.toFixed(2)}, {sinV.toFixed(2)})
            </text>
            {/* axis labels for cos/sin */}
            <text x={(cx + px) / 2} y={cy + 16} textAnchor="middle" fontSize="11" fontStyle="italic" fontFamily="serif" fill="#dc2626">
              cos θ
            </text>
            <text x={px + (cosV >= 0 ? 6 : -6)} y={(cy + py) / 2 + 4} textAnchor={cosV >= 0 ? "start" : "end"} fontSize="11" fontStyle="italic" fontFamily="serif" fill="#16a34a">
              sin θ
            </text>
          </svg>
        </div>

        {/* Sidebar: stats + slider */}
        <div className="lg:w-64 space-y-3">
          <div className="rounded-xl border-2 border-blue-300 bg-blue-50/70 p-4 text-center">
            <div className={`text-[10px] uppercase tracking-widest font-bold text-blue-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "មុំ θ" : "angle  θ"}
            </div>
            <div className="font-serif italic text-2xl text-slate-900" data-testid="uc-angle-display">
              {Math.round(angle)}°
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
              {(rad).toFixed(3)} rad
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value, 10))}
            className="w-full accent-blue-700"
            data-testid="uc-angle-slider"
          />
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border-2 border-rose-300 bg-rose-50/70 p-3 text-center">
              <div className="text-[10px] uppercase tracking-widest font-bold text-rose-700">cos θ</div>
              <div className="font-serif italic text-xl text-slate-900" data-testid="uc-cos">{cosV.toFixed(3)}</div>
            </div>
            <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/70 p-3 text-center">
              <div className="text-[10px] uppercase tracking-widest font-bold text-emerald-700">sin θ</div>
              <div className="font-serif italic text-xl text-slate-900" data-testid="uc-sin">{sinV.toFixed(3)}</div>
            </div>
          </div>

          {/* ── Toggle: show extended trig lines ────────────────────────── */}
          <label
            className="flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white/70 px-3 py-2 cursor-pointer select-none hover:bg-white"
            data-testid="uc-extended-toggle-label"
          >
            <input
              type="checkbox"
              checked={showExtended}
              onChange={(e) => setShowExtended(e.target.checked)}
              className="w-4 h-4 accent-slate-700"
              data-testid="uc-extended-toggle"
            />
            <span className={`text-xs text-slate-700 ${isKh ? "font-khmer leading-snug" : ""}`}>
              {isKh ? "បង្ហាញបន្ទាត់បន្ថែម" : "Show extended lines"}
            </span>
          </label>

          {/* ── 2×2 grid: tan / sec / cot / csc ─────────────────────────── */}
          <div className="grid grid-cols-2 gap-2" data-testid="uc-extended-cards">
            <div className="rounded-lg border-2 border-amber-300 bg-amber-50/70 p-3 text-center">
              <div className={`text-[10px] uppercase tracking-widest font-bold text-amber-800 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {isKh ? "តង់សង់ θ" : "tan θ"}
              </div>
              <div
                className={`font-serif italic text-lg text-slate-900 ${
                  tanV === null ? "text-[13px] not-italic font-sans text-amber-800" : ""
                } ${isKh && tanV === null ? "font-khmer" : ""}`}
                data-testid="uc-tan"
              >
                {fmt(tanV)}
              </div>
            </div>
            <div className="rounded-lg border-2 border-indigo-300 bg-indigo-50/70 p-3 text-center">
              <div className={`text-[10px] uppercase tracking-widest font-bold text-indigo-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {isKh ? "សេកង់ θ" : "sec θ"}
              </div>
              <div
                className={`font-serif italic text-lg text-slate-900 ${
                  secV === null ? "text-[13px] not-italic font-sans text-indigo-700" : ""
                } ${isKh && secV === null ? "font-khmer" : ""}`}
                data-testid="uc-sec"
              >
                {fmt(secV)}
              </div>
            </div>
            <div className="rounded-lg border-2 border-teal-300 bg-teal-50/70 p-3 text-center">
              <div className={`text-[10px] uppercase tracking-widest font-bold text-teal-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {isKh ? "កូតង់សង់ θ" : "cot θ"}
              </div>
              <div
                className={`font-serif italic text-lg text-slate-900 ${
                  cotV === null ? "text-[13px] not-italic font-sans text-teal-700" : ""
                } ${isKh && cotV === null ? "font-khmer" : ""}`}
                data-testid="uc-cot"
              >
                {fmt(cotV)}
              </div>
            </div>
            <div className="rounded-lg border-2 border-pink-300 bg-pink-50/70 p-3 text-center">
              <div className={`text-[10px] uppercase tracking-widest font-bold text-pink-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {isKh ? "កូសេកង់ θ" : "csc θ"}
              </div>
              <div
                className={`font-serif italic text-lg text-slate-900 ${
                  cscV === null ? "text-[13px] not-italic font-sans text-pink-700" : ""
                } ${isKh && cscV === null ? "font-khmer" : ""}`}
                data-testid="uc-csc"
              >
                {fmt(cscV)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-5 rounded-xl border-l-4 border-blue-700 bg-white/80 p-4 ${isKh ? "font-khmer leading-loose" : ""}`} data-testid="uc-core-secret">
        <div className={`text-[10px] uppercase tracking-widest font-bold text-blue-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "អាថ៌កំបាំងសំខាន់" : "The core secret"}
        </div>
        <div className="text-slate-800">
          {isKh
            ? "នៅលើរង្វង់ឯកតា កូអរដោនេនៃចំណុចនីមួយៗ គឺគ្រាន់តែជាអនុគមន៍ត្រីកោណមាត្រ៖"
            : "On the unit circle, every point's coordinates are just the trigonometric functions:"}
          <div className="text-center mt-2 font-serif italic text-lg sm:text-xl text-slate-900">
            (x, y) = (cos θ, sin θ)
          </div>
        </div>
      </div>
    </PaperCard>
  );
}

/* ── Card 2: Degrees vs Radians ────────────────────────────────────────── */
function DegreesVsRadiansCard({ isKh }: { isKh: boolean }) {
  const [unit, setUnit] = useState<"deg" | "rad">("deg");
  // Single source of truth: angle stored in degrees. Radians derived.
  const [deg, setDeg] = useState<number>(90);
  const rad = (deg * Math.PI) / 180;

  // wedge sweep from positive x axis
  const cx = 130, cy = 130, R = 100;
  const endX = cx + R * Math.cos(-rad);
  const endY = cy + R * Math.sin(-rad);
  const largeArc = deg > 180 ? 1 : 0;
  const wedgePath = `M ${cx} ${cy} L ${cx + R} ${cy} A ${R} ${R} 0 ${largeArc} 0 ${endX} ${endY} Z`;

  const reference = [
    { d: 0, r: "0", fr: "0" },
    { d: 30, r: "π/6", fr: "π / 6" },
    { d: 45, r: "π/4", fr: "π / 4" },
    { d: 60, r: "π/3", fr: "π / 3" },
    { d: 90, r: "π/2", fr: "π / 2" },
    { d: 180, r: "π", fr: "π" },
    { d: 270, r: "3π/2", fr: "3π / 2" },
    { d: 360, r: "2π", fr: "2π" },
  ];

  return (
    <PaperCard className="p-5 sm:p-6 mb-6 relative overflow-hidden" data-testid="degrees-vs-radians">
      <DraftingPaperBg />
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-violet-100 border-2 border-violet-300 flex items-center justify-center text-violet-800 font-serif italic font-bold">
          π
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ដឺក្រេ និងរ៉ាដ្យង់ — វិធីពីរយ៉ាងវាស់ការបង្វិល" : "Degrees vs Radians — two ways to measure rotation"}
          </h3>
        </div>
      </div>

      {/* Two-column intro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="rounded-xl border-2 border-amber-300 bg-amber-50/60 p-4" data-testid="degrees-explainer">
          <div className={`text-[10px] uppercase tracking-widest font-bold text-amber-800 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ដឺក្រេ" : "Degrees"}
          </div>
          <div className="text-center font-serif italic text-2xl text-slate-900 mb-2">360°</div>
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ចែករង្វង់ជា ៣៦០ ផ្នែកតូចៗ។ លេខនេះបានមកពីប្រតិទិនសុរិយគតិបុរាណ — ប្រហែលជាចំនួនថ្ងៃក្នុងមួយឆ្នាំ។"
              : "Slice the circle into 360 small pieces. The number comes from ancient solar calendars — roughly the number of days in a year."}
          </p>
        </div>
        <div className="rounded-xl border-2 border-violet-300 bg-violet-50/60 p-4" data-testid="radians-explainer">
          <div className={`text-[10px] uppercase tracking-widest font-bold text-violet-800 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "រ៉ាដ្យង់" : "Radians"}
          </div>
          <div className="text-center font-serif italic text-2xl text-slate-900 mb-2">2π</div>
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "វិធីវាស់ \"ធម្មជាតិ\" ជាង ផ្អែកលើប្រវែងកាំ រុំជុំវិញគែម។ កាំដែលរុំជុំវិញរង្វង់ទាំងមូល គឺ 2π ដង — ដូច្នេះរង្វង់ពេញ = 2π រ៉ាដ្យង់។"
              : "A more “natural” measurement, based on the length of the radius wrapped around the edge. The radius wraps around the full circle 2π times — so a full circle = 2π radians."}
          </p>
        </div>
      </div>

      {/* Live converter */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 items-start">
        {/* Wedge SVG */}
        <div className="rounded-xl border-2 border-slate-900/15 bg-white/80 p-3" data-testid="rad-wedge-wrap">
          <svg viewBox="0 0 260 260" className="w-full max-w-[260px] h-auto">
            <defs>
              <pattern id="dr-grid" width="13" height="13" patternUnits="userSpaceOnUse">
                <path d="M 13 0 L 0 0 0 13" fill="none" stroke="#dbeafe" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="260" height="260" fill="url(#dr-grid)" />
            <line x1="0" y1={cy} x2="260" y2={cy} stroke="#0f172a" strokeWidth="1.2" />
            <line x1={cx} y1="0" x2={cx} y2="260" stroke="#0f172a" strokeWidth="1.2" />
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#0f172a" strokeWidth="2" />
            <path d={wedgePath} fill="rgba(124,58,237,0.18)" stroke="#7c3aed" strokeWidth="1.5" />
            <line x1={cx} y1={cy} x2={endX} y2={endY} stroke="#1e3a8a" strokeWidth="2" />
            <text x={cx + 8} y={cy - 8} fontSize="12" fill="#7c3aed" fontFamily="serif" fontStyle="italic">
              θ
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          {/* Unit toggle */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-wider text-slate-500 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ឯកតា៖" : "Unit:"}
            </span>
            <button
              onClick={() => setUnit("deg")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                unit === "deg" ? "bg-amber-600 text-white shadow" : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              } ${isKh ? "font-khmer" : ""}`}
              data-testid="unit-toggle-deg"
            >
              {isKh ? "ដឺក្រេ" : "Degrees"}
            </button>
            <button
              onClick={() => setUnit("rad")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                unit === "rad" ? "bg-violet-600 text-white shadow" : "bg-violet-50 text-violet-800 hover:bg-violet-100"
              } ${isKh ? "font-khmer" : ""}`}
              data-testid="unit-toggle-rad"
            >
              {isKh ? "រ៉ាដ្យង់" : "Radians"}
            </button>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={0}
            max={360}
            value={Math.round(deg)}
            onChange={(e) => setDeg(parseInt(e.target.value, 10))}
            className="w-full accent-violet-700"
            data-testid="dr-angle-slider"
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border-2 border-amber-300 bg-amber-50/70 p-3 text-center">
              <div className="text-[10px] uppercase tracking-widest font-bold text-amber-800">degrees</div>
              <div className="font-serif italic text-xl text-slate-900" data-testid="dr-deg-out">{Math.round(deg)}°</div>
            </div>
            <div className="rounded-lg border-2 border-violet-300 bg-violet-50/70 p-3 text-center">
              <div className="text-[10px] uppercase tracking-widest font-bold text-violet-800">radians</div>
              <div className="font-serif italic text-xl text-slate-900" data-testid="dr-rad-out">{rad.toFixed(3)}</div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700 font-serif italic text-center">
            {Math.round(deg)}° × π / 180 = {rad.toFixed(3)} rad
          </div>
        </div>
      </div>

      {/* Reference table */}
      <div className="mt-5 rounded-xl border-2 border-slate-900/10 bg-white/80 overflow-hidden" data-testid="dr-reference-table">
        <div className={`px-4 py-2 bg-slate-100 border-b border-slate-200 text-[10px] uppercase tracking-widest font-bold text-slate-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "មុំសំខាន់ៗ" : "Common angles"}
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 text-center text-xs">
          {reference.map((r) => (
            <div key={r.d} className="border-r border-b border-slate-200 last:border-r-0 py-2 px-1">
              <div className="font-serif italic text-slate-900">{r.d}°</div>
              <div className="text-slate-500 font-serif italic">{r.fr}</div>
            </div>
          ))}
        </div>
      </div>
    </PaperCard>
  );
}

/* ── Card 3: ASTC Quadrants ────────────────────────────────────────────── */
function ASTCQuadrantsCard({ isKh }: { isKh: boolean }) {
  type QuadKey = "I" | "II" | "III" | "IV";
  const [hoverQ, setHoverQ] = useState<QuadKey | null>(null);

  const quads: {
    key: QuadKey;
    letter: string;
    posEn: string;
    posKh: string;
    explainEn: string;
    explainKh: string;
    range: string;
    color: string;
  }[] = [
    {
      key: "I",
      letter: "A",
      posEn: "All",
      posKh: "ទាំងអស់",
      explainEn: "sin, cos, tan all positive",
      explainKh: "sin, cos, tan វិជ្ជមានទាំងអស់",
      range: "0° – 90°",
      color: "emerald",
    },
    {
      key: "II",
      letter: "S",
      posEn: "Sine",
      posKh: "Sine",
      explainEn: "only sin positive  ·  cos, tan negative",
      explainKh: "តែ sin វិជ្ជមាន  ·  cos, tan អវិជ្ជមាន",
      range: "90° – 180°",
      color: "amber",
    },
    {
      key: "III",
      letter: "T",
      posEn: "Tangent",
      posKh: "Tangent",
      explainEn: "only tan positive  ·  sin, cos negative",
      explainKh: "តែ tan វិជ្ជមាន  ·  sin, cos អវិជ្ជមាន",
      range: "180° – 270°",
      color: "rose",
    },
    {
      key: "IV",
      letter: "C",
      posEn: "Cosine",
      posKh: "Cosine",
      explainEn: "only cos positive  ·  sin, tan negative",
      explainKh: "តែ cos វិជ្ជមាន  ·  sin, tan អវិជ្ជមាន",
      range: "270° – 360°",
      color: "sky",
    },
  ];

  const colorMap: Record<string, { border: string; bg: string; text: string; ring: string }> = {
    emerald: { border: "border-emerald-400", bg: "bg-emerald-50", text: "text-emerald-800", ring: "ring-emerald-400" },
    amber:   { border: "border-amber-400",   bg: "bg-amber-50",   text: "text-amber-800",   ring: "ring-amber-400" },
    rose:    { border: "border-rose-400",    bg: "bg-rose-50",    text: "text-rose-800",    ring: "ring-rose-400" },
    sky:     { border: "border-sky-400",     bg: "bg-sky-50",     text: "text-sky-800",     ring: "ring-sky-400" },
  };

  // Quadrant SVG positions (top row II,I  /  bottom row III,IV)
  const cx = 200, cy = 200, R = 150;

  return (
    <PaperCard className="p-5 sm:p-6 relative overflow-hidden" data-testid="astc-quadrants">
      <DraftingPaperBg />
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-800 font-serif font-bold">
          ASTC
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ច្បាប់ ASTC — ច្បាប់ក្វាដ្រង់ទាំងបួន" : "The ASTC Rule — where each function is positive"}
          </h3>
          <p className={`text-sm text-slate-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ដើម្បីចាំងាយ៖ All Students Take Calculus — A · S · T · C — ចាប់ផ្តើមពីក្វាដ្រង់ទី ១ បន្តច្រាសទ្រនិចនាឡិកា។"
              : "A mnemonic to remember: All Students Take Calculus — A · S · T · C — starting in Quadrant I and going counter-clockwise."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-5 items-start">
        {/* Drafting-paper SVG */}
        <div className="rounded-xl border-2 border-slate-900/15 bg-white/80 p-3" data-testid="astc-svg-wrap">
          <svg viewBox="0 0 400 400" className="w-full max-w-[400px] h-auto">
            <defs>
              <pattern id="astc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dbeafe" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#astc-grid)" />
            {/* axes */}
            <line x1="0" y1={cy} x2="400" y2={cy} stroke="#0f172a" strokeWidth="1.5" />
            <line x1={cx} y1="0" x2={cx} y2="400" stroke="#0f172a" strokeWidth="1.5" />
            {/* circle */}
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#0f172a" strokeWidth="2" />
            {/* quadrant fills (clipped to circle) */}
            {quads.map((q) => {
              const isI = q.key === "I", isII = q.key === "II", isIII = q.key === "III";
              const x1 = isI || isIV(q.key) ? cx : cx - R;
              const y1 = isI || isII ? cy - R : cy;
              const w = R, h = R;
              const fillMap: Record<string, string> = {
                emerald: "rgba(16,185,129,0.10)",
                amber:   "rgba(245,158,11,0.10)",
                rose:    "rgba(244,63,94,0.10)",
                sky:     "rgba(14,165,233,0.10)",
              };
              const isHover = hoverQ === q.key;
              return (
                <g key={q.key}>
                  <rect
                    x={x1}
                    y={y1}
                    width={w}
                    height={h}
                    fill={fillMap[q.color]}
                    opacity={isHover ? 1 : 0.6}
                    style={{ transition: "opacity 0.2s" }}
                    onMouseEnter={() => setHoverQ(q.key)}
                    onMouseLeave={() => setHoverQ(null)}
                    data-testid={`astc-quad-${q.key}`}
                  />
                </g>
              );
            })}
            {/* big letters */}
            {quads.map((q) => {
              const lx = q.key === "I" || q.key === "IV" ? cx + R / 2 : cx - R / 2;
              const ly = q.key === "I" || q.key === "II" ? cy - R / 2 : cy + R / 2;
              const fillMap: Record<string, string> = {
                emerald: "#047857",
                amber:   "#b45309",
                rose:    "#be123c",
                sky:     "#0369a1",
              };
              return (
                <g key={q.key} pointerEvents="none">
                  <text x={lx} y={ly + 16} textAnchor="middle" fontSize="56" fontFamily="serif" fontWeight="bold" fill={fillMap[q.color]} opacity={hoverQ === null || hoverQ === q.key ? 1 : 0.35}>
                    {q.letter}
                  </text>
                  <text x={lx} y={ly + 36} textAnchor="middle" fontSize="11" fontFamily="serif" fontStyle="italic" fill="#475569" opacity={hoverQ === null || hoverQ === q.key ? 1 : 0.35}>
                    Q{q.key}
                  </text>
                </g>
              );
            })}
            {/* axis labels */}
            <text x={395} y={cy - 6} textAnchor="end" fontSize="11" fontStyle="italic" fontFamily="serif" fill="#0f172a">+x</text>
            <text x={5} y={cy - 6} fontSize="11" fontStyle="italic" fontFamily="serif" fill="#0f172a">−x</text>
            <text x={cx + 6} y={12} fontSize="11" fontStyle="italic" fontFamily="serif" fill="#0f172a">+y</text>
            <text x={cx + 6} y={395} fontSize="11" fontStyle="italic" fontFamily="serif" fill="#0f172a">−y</text>
            {/* angle markers */}
            <text x={cx + R + 4} y={cy + 14} fontSize="10" fill="#475569" fontFamily="serif">0°</text>
            <text x={cx + 4} y={cy - R - 4} fontSize="10" fill="#475569" fontFamily="serif">90°</text>
            <text x={cx - R - 14} y={cy + 14} fontSize="10" fill="#475569" fontFamily="serif">180°</text>
            <text x={cx + 4} y={cy + R + 14} fontSize="10" fill="#475569" fontFamily="serif">270°</text>
          </svg>
        </div>

        {/* Quadrant cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quads.map((q) => {
            const c = colorMap[q.color];
            const isHover = hoverQ === q.key;
            return (
              <div
                key={q.key}
                onMouseEnter={() => setHoverQ(q.key)}
                onMouseLeave={() => setHoverQ(null)}
                className={`rounded-xl border-2 ${c.border} ${c.bg} p-3 transition ${
                  isHover ? `ring-2 ${c.ring} shadow-md` : ""
                }`}
                data-testid={`astc-card-${q.key}`}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <div className="flex items-baseline gap-2">
                    <span className={`font-serif font-bold text-2xl ${c.text}`}>{q.letter}</span>
                    <span className="font-serif italic text-slate-700 text-sm">Q{q.key}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">{q.range}</span>
                </div>
                <div className={`font-bold text-sm ${c.text} ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? q.posKh : q.posEn}
                </div>
                <div className={`text-xs text-slate-700 mt-0.5 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh ? q.explainKh : q.explainEn}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`mt-5 rounded-xl border-l-4 border-emerald-700 bg-white/80 p-4 text-sm text-slate-800 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh
          ? "ហេតុអ្វីសំខាន់៖ កូអរដោនេនៃចំណុចលើរង្វង់ឯកតា គឺ (cos θ, sin θ)។ ពេលមុំ θ ផ្លាស់ប្ដូរក្វាដ្រង់ x ឬ y ក្លាយជាអវិជ្ជមាន — ដូច្នេះ cos ឬ sin ក៏ក្លាយជាអវិជ្ជមាន។ ASTC គឺគ្រាន់តែជារូបភាពនៃក្បួននោះ។"
          : "Why it matters: a point on the unit circle is (cos θ, sin θ). When the angle moves into a different quadrant, x or y becomes negative — so cos or sin becomes negative too. ASTC is just a picture of that rule."}
      </div>
    </PaperCard>
  );
}

function isIV(k: "I" | "II" | "III" | "IV") { return k === "IV"; }

// ════════════════════════════════════════════════════════════════════════════
//  5. Trigonometric Identities — formula-sheet aesthetic
// ════════════════════════════════════════════════════════════════════════════

/**
 * IdentityGroup — a single grouped panel of related formulas.
 * Each tint maps to a soft, paper-like highlight so the four families can be
 * visually scanned at a glance without overpowering the page.
 */
function IdentityGroup({
  labelEn,
  labelKh,
  badge,
  tint,
  formulas,
  isKh,
}: {
  labelEn: string;
  labelKh: string;
  badge: string;
  tint: "sky" | "emerald" | "amber" | "violet";
  formulas: string[];
  isKh: boolean;
}) {
  const tintMap: Record<typeof tint, { border: string; bg: string; chipBg: string; chipText: string; chipBorder: string }> = {
    sky:     { border: "border-sky-200",     bg: "bg-sky-50/70",     chipBg: "bg-sky-100",     chipText: "text-sky-800",     chipBorder: "border-sky-300" },
    emerald: { border: "border-emerald-200", bg: "bg-emerald-50/70", chipBg: "bg-emerald-100", chipText: "text-emerald-800", chipBorder: "border-emerald-300" },
    amber:   { border: "border-amber-200",   bg: "bg-amber-50/70",   chipBg: "bg-amber-100",   chipText: "text-amber-800",   chipBorder: "border-amber-300" },
    violet:  { border: "border-violet-200",  bg: "bg-violet-50/70",  chipBg: "bg-violet-100",  chipText: "text-violet-800",  chipBorder: "border-violet-300" },
  };
  const c = tintMap[tint];
  return (
    <div
      className={`rounded-xl border-2 ${c.border} ${c.bg} p-4 sm:p-5`}
      data-testid={`identity-group-${tint}`}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`inline-flex items-center justify-center min-w-7 h-7 px-2 rounded-md ${c.chipBg} border ${c.chipBorder} ${c.chipText} font-serif italic font-bold text-sm`}>
          {badge}
        </span>
        <h4 className={`font-display font-bold text-base sm:text-lg text-slate-900 ${isKh ? "font-khmer leading-snug" : ""}`}>
          {isKh ? labelKh : labelEn}
        </h4>
      </div>
      <div className="space-y-2">
        {formulas.map((f, i) => (
          <div
            key={i}
            className="rounded-lg bg-white/80 border border-slate-200 px-3 py-3 overflow-x-auto text-center"
          >
            <BlockMath math={f} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TrigIdentitiesCard({ isKh }: { isKh: boolean }) {
  return (
    <PaperCard className="p-5 sm:p-6" data-testid="trig-identities-card">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-11 h-11 shrink-0 rounded-lg bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-800 font-serif italic font-bold text-lg">
          ≡
        </div>
        <div>
          <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? "តើអ្វីទៅជាឯកលក្ខណៈ?" : "What is an identity?"}
          </h3>
          <p className={`text-sm text-slate-700 mt-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ឯកលក្ខណៈគឺជាសមីការដែលតែងតែពិត គ្រប់មុំ θ ទាំងអស់ដែលអ្នកជំនួស។ វាគឺជាឧបករណ៍ដែលប្រើដើម្បីកាត់បន្ថយលំហាត់គណិតស្មុគស្មាញ ឲ្យក្លាយជាទម្រង់សាមញ្ញ។"
              : "An identity is an equation that is always true, no matter what angle θ you plug into it. It is a tool used to simplify messy math problems."}
          </p>
        </div>
      </div>

      {/* ── Section heading: Core ──────────────────────────────────────── */}
      <div className={`mt-2 mb-3 text-[11px] uppercase tracking-widest font-bold text-blue-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
        {isKh ? "ឯកលក្ខណៈគោល" : "The core identities"}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IdentityGroup
          isKh={isKh}
          tint="sky"
          badge="1/x"
          labelEn="Reciprocal Identities"
          labelKh="ឯកលក្ខណៈចម្រាស"
          formulas={[
            String.raw`\csc \theta = \frac{1}{\sin \theta}`,
            String.raw`\sec \theta = \frac{1}{\cos \theta}`,
            String.raw`\cot \theta = \frac{1}{\tan \theta}`,
          ]}
        />
        <IdentityGroup
          isKh={isKh}
          tint="emerald"
          badge="÷"
          labelEn="Quotient Identities"
          labelKh="ឯកលក្ខណៈផលធៀប"
          formulas={[
            String.raw`\tan \theta = \frac{\sin \theta}{\cos \theta}`,
            String.raw`\cot \theta = \frac{\cos \theta}{\sin \theta}`,
          ]}
        />
        <div className="md:col-span-2">
          <IdentityGroup
            isKh={isKh}
            tint="amber"
            badge="△"
            labelEn="Pythagorean Identities"
            labelKh="ឯកលក្ខណៈពីតាក័រ"
            formulas={[
              String.raw`\sin^2 \theta + \cos^2 \theta = 1`,
              String.raw`1 + \tan^2 \theta = \sec^2 \theta`,
              String.raw`1 + \cot^2 \theta = \csc^2 \theta`,
            ]}
          />
        </div>
      </div>

      {/* ── Section heading: Double Angle ─────────────────────────────── */}
      <div className={`mt-6 mb-3 text-[11px] uppercase tracking-widest font-bold text-violet-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
        {isKh ? "ឯកលក្ខណៈមុំឌុប" : "Double-angle identities"}
        <span className={`ml-2 normal-case tracking-normal text-slate-500 font-normal italic ${isKh ? "font-khmer not-italic" : ""}`}>
          {isKh ? "(ត្រៀមសម្រាប់ថ្នាក់ទី ១២ — Calculus)" : "(12th-grade calculus prep)"}
        </span>
      </div>

      <IdentityGroup
        isKh={isKh}
        tint="violet"
        badge="2θ"
        labelEn="Double-Angle Identities"
        labelKh="ឯកលក្ខណៈមុំឌុប"
        formulas={[
          String.raw`\sin(2\theta) = 2\sin\theta\cos\theta`,
          String.raw`\cos(2\theta) = \cos^2\theta - \sin^2\theta`,
        ]}
      />

      {/* ── Footer note ────────────────────────────────────────────────── */}
      <div className={`mt-5 rounded-xl border-l-4 border-blue-700 bg-white/80 p-4 text-sm text-slate-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <span className={`block text-[10px] uppercase tracking-widest font-bold text-blue-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "របៀបប្រើ" : "How to use"}
        </span>
        {isKh ? (
          <>
            ពេលអ្នកជួបកន្សោមដូចជា <InlineMath math={String.raw`\frac{\sin\theta}{\cos\theta}`} /> ចូរជំនួសវាដោយ <InlineMath math={String.raw`\tan\theta`} />។ ពេលអ្នកឃើញ <InlineMath math={String.raw`1 - \sin^2\theta`} /> ចូរជំនួសវាដោយ <InlineMath math={String.raw`\cos^2\theta`} />។ កូនសោរទាំងនេះបង្រួមការងាររបស់អ្នកឲ្យឆាប់រហ័សជាងមុនច្រើនដង។
          </>
        ) : (
          <>
            Whenever you see something like <InlineMath math={String.raw`\frac{\sin\theta}{\cos\theta}`} />, replace it with <InlineMath math={String.raw`\tan\theta`} />. Whenever you spot <InlineMath math={String.raw`1 - \sin^2\theta`} />, swap it for <InlineMath math={String.raw`\cos^2\theta`} />. These keys collapse pages of work into a few lines.
          </>
        )}
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Scoped styles
// ════════════════════════════════════════════════════════════════════════════

function ScopedStyles() {
  return (
    <style>{`
      .math-text-ink {
        background: linear-gradient(180deg, #1d4ed8 0%, #1e3a8a 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    `}</style>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  8. Statistics — Finding the Middle / Spread / P-Value
// ════════════════════════════════════════════════════════════════════════════

function StatChip({ label, value, color = "blue" }: { label: string; value: string; color?: "blue" | "amber" | "rose" | "emerald" }) {
  const colors = {
    blue:    { bg: "bg-blue-50",    bd: "border-blue-300",    tx: "text-blue-700" },
    amber:   { bg: "bg-amber-50",   bd: "border-amber-300",   tx: "text-amber-700" },
    rose:    { bg: "bg-rose-50",    bd: "border-rose-300",    tx: "text-rose-700" },
    emerald: { bg: "bg-emerald-50", bd: "border-emerald-300", tx: "text-emerald-700" },
  }[color];
  return (
    <div className={`inline-flex items-baseline gap-1.5 rounded-md border px-2 py-1 text-xs font-mono ${colors.bg} ${colors.bd} ${colors.tx}`}>
      <span className="opacity-70">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

// ─── Section 1: Finding the Middle ─────────────────────────────────────────

function FindingTheMiddleCard({ isKh }: { isKh: boolean }) {
  // Worked example: heights of 7 students (cm)
  const heights = [142, 148, 150, 152, 152, 158, 165];
  const sorted = [...heights].sort((a, b) => a - b);
  const N = heights.length;
  const sum = heights.reduce((a, b) => a + b, 0);
  const mean = sum / N;
  const median = sorted[Math.floor(N / 2)];
  const mode = 152; // appears twice

  return (
    <PaperCard className="p-5 sm:p-6" data-testid="stats-middle">
      <div className="flex items-center gap-2 mb-2 text-blue-700 text-xs font-bold uppercase tracking-widest">
        <Target className="w-3.5 h-3.5" />
        <span className={isKh ? "font-khmer normal-case tracking-normal" : ""}>
          {isKh ? "មេរៀនរង ៨.១" : "Sub-lesson 8.1"}
        </span>
      </div>
      <h3 className={`font-display font-bold text-xl sm:text-2xl text-slate-900 mb-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? "ការស្វែងរកចំណុចកណ្តាល" : "Finding the Middle"}
        {!isKh && <span className="ml-2 font-khmer text-sm font-normal text-slate-500">(ការស្វែងរកចំណុចកណ្តាល)</span>}
      </h3>
      <p className={`text-sm text-slate-700 mb-5 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "នៅពេលអ្នកមានគំនរលេខមួយ សំណួរទីមួយគឺតែងតែ ៖ « តើលេខមួយណាជាតំណាងពួកគេទាំងអស់? » ស្ថិតិមានបី «M» ដើម្បីឆ្លើយ ៖ Mean, Median, Mode។"
          : "When you have a pile of numbers, the first question is always: \"which one number stands in for them all?\" Statistics has three different M's that answer this — Mean, Median, and Mode."}
      </p>

      {/* Worked dataset strip */}
      <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50/40 p-3">
        <div className={`text-[11px] font-bold uppercase tracking-widest text-blue-700 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "សំណាក ៖ កំពស់សិស្ស ៧ នាក់ (សម)" : "Sample · 7 students' heights (cm)"}
        </div>
        <div className="flex flex-wrap gap-2">
          {sorted.map((h, i) => (
            <span
              key={i}
              className={`inline-flex items-center justify-center w-12 h-12 rounded-lg font-mono font-bold text-sm ${
                h === mode ? "bg-rose-100 border-2 border-rose-400 text-rose-800" : "bg-white border border-blue-300 text-blue-900"
              }`}
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* MEAN */}
        <div className="rounded-xl border border-blue-300 bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-600 text-white font-bold text-sm">M</span>
            <h4 className={`font-bold text-lg text-slate-900 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "មធ្យមនព្វន្ធ" : "Mean"}
            </h4>
          </div>
          <div className={`text-[11px] font-mono uppercase tracking-widest text-blue-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "« លេខចែករំលែក »" : "the \"sharing\" number"}
          </div>
          <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "បូកអ្វីៗទាំងអស់ ហើយចែកស្មើៗគ្នា — ដូចជាប្រសិនបើមនុស្សគ្រប់គ្នាឲ្យកំពស់របស់ខ្លួនទៅគំនរ ហើយចែកវិញឲ្យស្មើៗគ្នា។"
              : "Add everything up and divide it evenly — as if everyone threw their height into a pile and shared it back out equally."}
          </p>
          <div className="rounded-md bg-blue-50 border border-blue-200 p-2 text-center">
            <BlockMath math="\mu = \frac{\sum x_i}{N}" />
          </div>
          <div className="mt-3 text-xs text-slate-700 space-y-1">
            <div className={isKh ? "font-khmer leading-loose" : ""}>
              <strong>{isKh ? "គណនា ៖ " : "Compute: "}</strong>
              <span className="font-mono">({sum}) ÷ {N} = <strong className="text-blue-800">{mean.toFixed(2)} cm</strong></span>
            </div>
          </div>
        </div>

        {/* MEDIAN */}
        <div className="rounded-xl border border-emerald-300 bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-emerald-600 text-white font-bold text-sm">M</span>
            <h4 className={`font-bold text-lg text-slate-900 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ម៉េដ្យាន" : "Median"}
            </h4>
          </div>
          <div className={`text-[11px] font-mono uppercase tracking-widest text-emerald-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "« លេខតម្រៀបជួរ »" : "the \"line-up\" number"}
          </div>
          <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "តម្រៀបមនុស្សគ្រប់គ្នាពីទាបទៅខ្ពស់ ហើយជ្រើសរើសអ្នកដែលឈរនៅកណ្តាលច្បាស់។ មិនរងឥទ្ធិពលដោយលេខខ្លាំងនៅចុងទាំងសងខាងឡើយ។"
              : "Put everyone in order from shortest to tallest, and pick the person standing exactly in the middle. Extreme values at either end can't pull it around."}
          </p>
          <div className="rounded-md bg-emerald-50 border border-emerald-200 p-2 text-center text-xs font-mono">
            {sorted.map((h, i) => (
              <span
                key={i}
                className={`inline-block mx-0.5 px-1.5 py-0.5 rounded ${
                  i === Math.floor(N / 2) ? "bg-emerald-600 text-white font-bold" : "text-emerald-900"
                }`}
              >
                {h}
              </span>
            ))}
          </div>
          <div className="mt-3 text-xs text-slate-700">
            <strong>{isKh ? "មនុស្សកណ្តាល ៖ " : "Middle person: "}</strong>
            <span className="font-mono"><strong className="text-emerald-800">{median} cm</strong></span>
          </div>
        </div>

        {/* MODE */}
        <div className="rounded-xl border border-rose-300 bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-rose-600 text-white font-bold text-sm">M</span>
            <h4 className={`font-bold text-lg text-slate-900 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ម៉ូដ" : "Mode"}
            </h4>
          </div>
          <div className={`text-[11px] font-mono uppercase tracking-widest text-rose-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "« លេខពេញនិយម »" : "the \"popular\" number"}
          </div>
          <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "តម្លៃដែលលេចឡើងច្រើនជាងគេ។ មានប្រយោជន៍សម្រាប់របស់ដែលមិនមែនជាលេខផងដែរ — ដូចជា « ពណ៌ដែលគេលក់ដាច់បំផុត » ឬ « ទំហំស្បែកជើងពេញនិយមបំផុត »។"
              : "The value that shows up the most often. Useful for non-numbers too — \"the most common shirt size,\" \"the bestselling colour.\""}
          </p>
          <div className="rounded-md bg-rose-50 border border-rose-200 p-2 text-center">
            <span className="font-mono text-sm">
              152 <strong className="text-rose-700">×2</strong> &nbsp; · &nbsp;
              <span className="opacity-60">others ×1</span>
            </span>
          </div>
          <div className="mt-3 text-xs text-slate-700">
            <strong>{isKh ? "តម្លៃពេញនិយម ៖ " : "Most common: "}</strong>
            <span className="font-mono"><strong className="text-rose-800">{mode} cm</strong></span>
          </div>
        </div>
      </div>
    </PaperCard>
  );
}

// ─── Section 2: Standard Deviation ─────────────────────────────────────────

function StandardDeviationCard({ isKh }: { isKh: boolean }) {
  const A = [70, 70, 70];
  const B = [100, 40, 70];
  const meanA = A.reduce((a, b) => a + b, 0) / A.length;
  const meanB = B.reduce((a, b) => a + b, 0) / B.length;
  const sdA = Math.sqrt(A.reduce((s, x) => s + (x - meanA) ** 2, 0) / A.length);
  const sdB = Math.sqrt(B.reduce((s, x) => s + (x - meanB) ** 2, 0) / B.length);

  function ScoreBar({
    scores, mean, sd, label, color,
  }: { scores: number[]; mean: number; sd: number; label: string; color: "emerald" | "rose" }) {
    const tone = color === "emerald"
      ? { bd: "border-emerald-300", bg: "bg-emerald-50", chip: "bg-emerald-600", text: "text-emerald-800", soft: "bg-emerald-100" }
      : { bd: "border-rose-300",    bg: "bg-rose-50",    chip: "bg-rose-600",    text: "text-rose-800",    soft: "bg-rose-100" };
    return (
      <div className={`rounded-xl border ${tone.bd} ${tone.bg} p-4`}>
        <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
          <h5 className={`font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>{label}</h5>
          <span className={`text-[11px] font-mono uppercase tracking-widest ${tone.text}`}>
            μ = {mean.toFixed(0)} · σ = {sd.toFixed(1)}
          </span>
        </div>

        {/* number axis 0-100 */}
        <div className="relative h-14 mb-2">
          <div className="absolute inset-x-0 bottom-3 h-px bg-slate-300" />
          {[0, 25, 50, 75, 100].map((t) => (
            <div key={t} className="absolute bottom-2 -translate-x-1/2 text-[9px] font-mono text-slate-500" style={{ left: `${t}%` }}>
              <div className="w-px h-2 bg-slate-300 mx-auto mb-0.5" />
              {t}
            </div>
          ))}
          {/* mean marker */}
          <div className="absolute top-0 bottom-3 w-px bg-slate-700/40" style={{ left: `${mean}%` }}>
            <div className="absolute -top-0 -translate-x-1/2 text-[9px] font-mono text-slate-700 whitespace-nowrap">μ</div>
          </div>
          {/* score dots */}
          {scores.map((s, i) => (
            <div
              key={i}
              className={`absolute top-5 -translate-x-1/2 w-6 h-6 rounded-full ${tone.chip} text-white text-[10px] font-mono font-bold flex items-center justify-center shadow`}
              style={{ left: `${s}%` }}
              title={`${s}%`}
            >
              {s}
            </div>
          ))}
        </div>

        <div className={`text-xs text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {color === "emerald"
            ? (isKh
                ? "ពិន្ទុទាំងបីចង់ឋិតនៅជិតមធ្យម → គម្លាតស្តង់ដារតូច → សិស្សដែលមានស្ថេរភាព។"
                : "All three scores cluster tightly around the mean → low standard deviation → a consistent student.")
            : (isKh
                ? "ពិន្ទុទាំងបីលោតទៅឆ្ងាយពីមធ្យម → គម្លាតស្តង់ដារធំ → លទ្ធផលច្របូកច្របល់។"
                : "Scores leap far away from the mean → high standard deviation → chaotic, unpredictable performance.")}
        </div>
      </div>
    );
  }

  return (
    <PaperCard className="p-5 sm:p-6" data-testid="stats-spread">
      <div className="flex items-center gap-2 mb-2 text-blue-700 text-xs font-bold uppercase tracking-widest">
        <BarChart3 className="w-3.5 h-3.5" />
        <span className={isKh ? "font-khmer normal-case tracking-normal" : ""}>
          {isKh ? "មេរៀនរង ៨.២" : "Sub-lesson 8.2"}
        </span>
      </div>
      <h3 className={`font-display font-bold text-xl sm:text-2xl text-slate-900 mb-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? "គម្លាតស្តង់ដារ" : "Standard Deviation"}
        {!isKh && <span className="ml-2 font-khmer text-sm font-normal text-slate-500">(គម្លាតស្តង់ដារ)</span>}
      </h3>
      <p className={`text-sm text-slate-700 mb-5 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "មធ្យម ប្រាប់អ្នកពីមជ្ឈមណ្ឌល។ គម្លាតស្តង់ដារ ប្រាប់អ្នកពី «កម្រិតលាតសន្ធឹង» — តើភាគច្រើននៃពិន្ទុ ឋិតនៅជិត ឬឆ្ងាយ ពីមធ្យម។"
          : "The mean tells you the centre. Standard deviation tells you the spread — how far away most of the data points usually sit from that centre."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <ScoreBar
          scores={A}
          mean={meanA}
          sd={sdA}
          label={isKh ? "សិស្ស A ៖ [70, 70, 70]" : "Student A · [70, 70, 70]"}
          color="emerald"
        />
        <ScoreBar
          scores={B}
          mean={meanB}
          sd={sdB}
          label={isKh ? "សិស្ស B ៖ [100, 40, 70]" : "Student B · [100, 40, 70]"}
          color="rose"
        />
      </div>

      <div className="rounded-xl border border-amber-300 bg-amber-50/60 p-4 mb-5">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-700 flex-shrink-0" />
          <p className={`text-sm text-slate-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong>{isKh ? "មេរៀនធំ ៖ " : "The big lesson: "}</strong>
            {isKh
              ? "សិស្សទាំងពីរមានមធ្យមដូចគ្នា ៧០% — ប៉ុន្តែដំណើររបស់ពួកគេខុសគ្នាទាំងស្រុង។ មធ្យមតែឯងអាចបោកអ្នកបាន។ គម្លាតស្តង់ដារទើបបង្ហាញរឿងពិត។"
              : "Both students have the exact same mean of 70%, yet their journeys are completely different. The mean alone can lie to you. Standard deviation tells you the rest of the story."}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-blue-300 bg-white p-4">
        <div className={`text-[11px] font-bold uppercase tracking-widest text-blue-700 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "រូបមន្តផ្លូវការ" : "The formal equation"}
        </div>
        <div className="text-center">
          <BlockMath math="\sigma = \sqrt{\frac{\sum (x_i - \mu)^2}{N}}" />
        </div>
        <p className={`text-xs sm:text-sm text-slate-700 mt-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? (
            <>
              មើលបែបនេះ ៖ សម្រាប់សិស្ស A គម្លាតពីមធ្យមគឺ <span className="font-mono">[0, 0, 0]</span> → <InlineMath math="\sigma = 0" />។
              សម្រាប់សិស្ស B គឺ <span className="font-mono">[+30, −30, 0]</span> → <InlineMath math="\sigma \approx 24.5" />។
              តួ <InlineMath math="(x_i - \mu)^2" /> គ្រាន់តែសួរថា «តើលេខនេះឋិតឆ្ងាយពីមធ្យមប៉ុណ្ណា?» — ហើយការដក root មកវិញ យកវាត្រឡប់ទៅឯកតាដើម។
            </>
          ) : (
            <>
              Read it like this: for Student A the gaps from the mean are <span className="font-mono">[0, 0, 0]</span> → <InlineMath math="\sigma = 0" />.
              For Student B they are <span className="font-mono">[+30, −30, 0]</span> → <InlineMath math="\sigma \approx 24.5" />.
              The <InlineMath math="(x_i - \mu)^2" /> piece is just asking "how far is this point from the average?" — and the square root brings the answer back into the original units.
            </>
          )}
        </p>
      </div>
    </PaperCard>
  );
}

// ─── Section 3: P-Value ────────────────────────────────────────────────────

function PValueCard({ isKh }: { isKh: boolean }) {
  return (
    <PaperCard className="p-5 sm:p-6" data-testid="stats-pvalue">
      <div className="flex items-center gap-2 mb-2 text-blue-700 text-xs font-bold uppercase tracking-widest">
        <FlaskConical className="w-3.5 h-3.5" />
        <span className={isKh ? "font-khmer normal-case tracking-normal" : ""}>
          {isKh ? "មេរៀនរង ៨.៣" : "Sub-lesson 8.3"}
        </span>
      </div>
      <h3 className={`font-display font-bold text-xl sm:text-2xl text-slate-900 mb-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? "តម្លៃ P-Value — ការសាកល្បងភាពចៃដន្យ" : "The P-Value — the \"Fluke Test\""}
        {!isKh && <span className="ml-2 font-khmer text-sm font-normal text-slate-500">(តម្លៃ P-Value)</span>}
      </h3>
      <p className={`text-sm text-slate-700 mb-5 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "ឧបមាថា អ្នកវិទ្យាសាស្ត្រសាកល្បងថ្នាំថ្មីមួយ ហើយអ្នកជំងឺមានអារម្មណ៍ប្រសើរឡើង។ មុនពេលប្រកាសជោគជ័យ ពួកគេត្រូវឆ្លើយសំណួរមួយ ៖ « តើថ្នាំពិតជាដំណើរការមែន ឬក៏គ្រាន់តែជាគ្រោះល្អមួយ ? » នោះហើយជាការងាររបស់ p-value។"
          : "Imagine scientists test a new medicine and patients feel better. Before celebrating, they must answer one question: did the medicine actually work, or was this just a lucky coincidence? That is exactly the job of the p-value."}
      </p>

      {/* Two-result split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* p < 0.05 — REAL */}
        <div className="rounded-xl border-2 border-emerald-400 bg-emerald-50/70 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <span className="font-mono text-emerald-800 font-bold">
              <InlineMath math="p < 0.05" />
            </span>
            <span className={`text-xs uppercase tracking-widest font-bold text-emerald-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ពិត" : "Real"}
            </span>
          </div>
          <p className={`text-sm text-slate-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "មានឱកាសតិចជាង ៥% ដែលលទ្ធផលនេះកើតឡើងដោយចៃដន្យសុទ្ធសាធ។ យើងហៅវាថា « មានសារៈសំខាន់តាមស្ថិតិ » — ទិន្នន័យហាក់ដូចជាពិត។"
              : "There is less than a 5% chance this result happened by pure luck. We call this 'statistically significant' — the data looks real."}
          </p>
        </div>

        {/* p >= 0.05 — FLUKE */}
        <div className="rounded-xl border-2 border-rose-300 bg-rose-50/60 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-rose-700" />
            <span className="font-mono text-rose-800 font-bold">
              <InlineMath math="p \geq 0.05" />
            </span>
            <span className={`text-xs uppercase tracking-widest font-bold text-rose-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ប្រហែលជាគ្រោះល្អ" : "Could be a fluke"}
            </span>
          </div>
          <p className={`text-sm text-slate-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ឱកាសសម្រាប់ការចៃដន្យធំពេក។ យើងមិនអាចសន្និដ្ឋានថាថ្នាំដំណើរការទេ — ត្រូវការការសាកល្បងបន្ថែម ដោយប្រើគំរូកាន់តែធំ។"
              : "Too much room for coincidence. We cannot conclude the medicine works — more trials with bigger samples are needed."}
          </p>
        </div>
      </div>

      {/* The 5% bar visualization */}
      <div className="rounded-xl border border-blue-300 bg-white p-4 mb-5">
        <div className={`text-[11px] font-bold uppercase tracking-widest text-blue-700 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "តើ ៥% មានន័យដូចម្តេច ?" : "What does 5% look like?"}
        </div>
        <div className="relative h-7 rounded-md overflow-hidden border border-slate-300 bg-slate-100">
          <div className="absolute inset-y-0 left-0 bg-emerald-400" style={{ width: "95%" }} />
          <div className="absolute inset-y-0 right-0 bg-rose-500" style={{ width: "5%" }} />
          <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] font-mono font-bold text-white">
            <span>{isKh ? "៩៥% — ពិតប្រាកដ" : "95% — confident it's real"}</span>
            <span>{isKh ? "៥%" : "5%"}</span>
          </div>
        </div>
        <p className={`text-xs text-slate-600 mt-2 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "បន្ទាត់ក្រហមតូចគឺជាគ្រោះល្អ ៖ ប្រសិនបើអ្នកពិសោធន៍ ២០ ដង តាមរយៈការចៃដន្យសុទ្ធសាធ មានតែមួយដងប៉ុណ្ណោះ ដែលអាចបង្ហាញលទ្ធផលបោកបញ្ឆោតបែបនេះ។"
            : "The thin red sliver is the fluke: out of every 20 random experiments, only 1 would produce a misleading result this strong by chance alone."}
        </p>
      </div>

      <div className="rounded-xl border border-amber-300 bg-amber-50/60 p-4">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 mt-0.5 text-amber-700 flex-shrink-0" />
          <p className={`text-sm text-slate-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong>{isKh ? "ការប្រើពិតៗ ៖ " : "In real life: "}</strong>
            {isKh
              ? "FDA នៅអាមេរិក EMA នៅអឺរ៉ុប និងស្ទើរគ្រប់ទស្សនាវដ្តីវិទ្យាសាស្ត្ររបស់ពិភពលោក ទាមទារ p < 0.05 មុននឹងព្រមជឿថ្នាំ ការព្យាបាល ឬការរកឃើញវិទ្យាសាស្ត្រមួយ។"
              : "The FDA in America, the EMA in Europe, and almost every scientific journal in the world require p < 0.05 before they will believe a drug, a treatment, or a discovery."}
          </p>
        </div>
      </div>
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Beyond the Curriculum · The Unsolved Frontier — Erdős Problems
//                          ព្រំដែនមិនទាន់ដោះស្រាយ — បញ្ហាអ៊ែរដូស
//
//  Aesthetic: "Academic Chalkboard" — deep slate/charcoal panel that
//  visually separates from the light graph-paper math sections above.
//  Crisp white "chalk" body + chalk-yellow accents. Strictly bilingual
//  (paired EN+KH) for every heading, rule, and core concept.
// ════════════════════════════════════════════════════════════════════════════

function ErdosFrontierSection({ isKh }: { isKh: boolean }) {
  return (
    <section
      id="erdos-frontier"
      data-testid="erdos-section"
      aria-labelledby="erdos-frontier-heading"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24"
    >
      <FrontierDivider isKh={isKh} />

      <div className="mt-6 rounded-3xl bg-slate-900 border-2 border-yellow-300/30 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.55)] overflow-hidden chalkboard-surface">
        {/* Chalk dust gradient top */}
        <div
          className="h-2"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(253,224,71,0.5), transparent)",
          }}
          aria-hidden
        />

        <div className="p-5 sm:p-8 space-y-6">
          {/* Bilingual section header */}
          <header className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-300 text-slate-900 flex items-center justify-center shadow-[0_0_22px_rgba(253,224,71,0.45)]">
              <Brain className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-yellow-200 mb-1">
                <span>Beyond the Curriculum</span>
                <span className="ml-2 font-khmer normal-case tracking-normal text-[11px] text-yellow-100/90">
                  · លើសពីកម្មវិធីសិក្សា
                </span>
              </div>
              <h2
                id="erdos-frontier-heading"
                className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight"
              >
                <span className="block">The Unsolved Frontier — Erdős Problems</span>
                <span className="block font-khmer text-xl sm:text-2xl text-yellow-200 font-bold mt-1 leading-relaxed">
                  ព្រំដែនមិនទាន់ដោះស្រាយ — បញ្ហាអ៊ែរដូស
                </span>
              </h2>
            </div>
          </header>

          {/* Three sub-cards */}
          <WanderingGeniusCard />
          <BountySystemCard />
          <CollatzCard />
        </div>
      </div>
    </section>
  );
}

/* ── Visual divider between standard math and the frontier section ──── */
function FrontierDivider({ isKh: _isKh }: { isKh: boolean }) {
  return (
    <div data-testid="erdos-divider" className="relative">
      {/* Horizontal rule with center label */}
      <div className="relative flex items-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-slate-400" />
        <div className="px-4 flex items-center gap-2 text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Frontier · ព្រំដែន
          </span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 to-slate-400" />
      </div>

      {/* Bilingual intro */}
      <div className="mt-6 max-w-3xl mx-auto text-center">
        <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-serif italic">
          “Mathematics is not finished. There are problems simple enough for a
          child to understand, but impossible for the greatest minds to solve.”
        </p>
        <p className="font-khmer text-base text-slate-700 leading-loose mt-3">
          “គណិតវិទ្យាមិនទាន់បញ្ចប់ទេ។ មានបញ្ហាខ្លះងាយស្រួលរហូតក្មេងអាចយល់បាន ប៉ុន្តែមិនអាចដោះស្រាយបានសូម្បីតែដោយអ្នកប្រាជ្ញដ៏អស្ចារ្យបំផុត។”
        </p>
      </div>
    </div>
  );
}

/* ── Sub 1 · The Wandering Genius (Paul Erdős) ───────────────────────── */
function WanderingGeniusCard() {
  return (
    <article
      data-testid="erdos-wandering-genius"
      className="rounded-2xl bg-slate-950/60 border-2 border-yellow-300/40 p-5 sm:p-6 shadow-[0_0_24px_rgba(253,224,71,0.08)]"
    >
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-yellow-300 text-slate-900 flex items-center justify-center">
          <Briefcase className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-yellow-300">
              Section 01 · The Mathematician
            </span>
            <span className="font-khmer text-[11px] text-yellow-200">
              ផ្នែក ០១ · គណិតវិទូ
            </span>
          </div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-snug">
            <span className="block">The Wandering Genius</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-yellow-200 mt-1 leading-relaxed">
              ទេពកោសល្យវង្វេង (Paul Erdős)
            </span>
          </h3>
        </div>
      </header>

      <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
        <strong className="text-yellow-200">Paul Erdős</strong> (1913 – 1996)
        was a Hungarian mathematician unlike any other. He owned almost
        nothing. No house. No car. No real bank account. He{" "}
        <strong className="text-yellow-200">travelled the world with one
        suitcase</strong>, knocking on the doors of other mathematicians,
        sleeping on their couches for a few weeks, and solving puzzles
        together — then moving on to the next country.
      </p>
      <p className="font-khmer text-slate-200 leading-loose mt-3 border-t border-yellow-300/20 pt-3">
        <strong className="text-yellow-200">Paul Erdős</strong> (១៩១៣ – ១៩៩៦) គឺជាគណិតវិទូហុងគ្រី ដែលគ្មាននរណាដូចគេ។ គាត់ស្ទើរតែគ្មានទ្រព្យសម្បត្តិ។ គ្មានផ្ទះ។ គ្មានឡាន។ គ្មានគណនីធនាគារពិតប្រាកដ។ គាត់{" "}
        <strong className="text-yellow-200">ធ្វើដំណើរជុំវិញពិភពលោកជាមួយវ៉ាលីតែមួយ</strong>{" "}
        គោះទ្វារផ្ទះគណិតវិទូផ្សេងទៀត ដេកនៅសាឡុងរបស់ពួកគេពីរបីសប្តាហ៍ ហើយដោះស្រាយល្បែងផ្គុំរូបជាមួយគ្នា — រួចបន្ទាប់មកបន្តទៅប្រទេសបន្ទាប់។
      </p>

      {/* Quick stats strip */}
      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        <ChalkStat
          icon={Globe}
          valueEn="25+"
          labelEn="countries lived in"
          labelKh="ប្រទេសដែលរស់នៅ"
        />
        <ChalkStat
          icon={Sigma}
          valueEn="~1,500"
          labelEn="papers published"
          labelKh="ឯកសារបោះពុម្ពផ្សាយ"
        />
        <ChalkStat
          icon={Users}
          valueEn="~500"
          labelEn="co-authors"
          labelKh="អ្នកនិពន្ធរួម"
        />
      </div>

      <p className="text-slate-300 text-xs sm:text-sm italic mt-4 leading-relaxed">
        “A mathematician is a machine for turning coffee into theorems.”
        <span className="not-italic text-slate-400"> — attributed to Erdős</span>
      </p>
      <p className="font-khmer text-slate-300 text-xs sm:text-sm leading-loose mt-1">
        “គណិតវិទូគឺជាម៉ាស៊ីនមួយ ដែលបំប្លែងកាហ្វេទៅជាទ្រឹស្តីបទ។”
        <span className="text-slate-400"> — សំដីភ្ជាប់ឈ្មោះ Erdős</span>
      </p>
    </article>
  );
}

/* ── Sub 2 · The Bounty System ───────────────────────────────────────── */
function BountySystemCard() {
  const bounties: { amount: string; tierEn: string; tierKh: string; descEn: string; descKh: string }[] = [
    {
      amount: "$25",
      tierEn: "Small puzzle",
      tierKh: "ល្បែងផ្គុំរូបតូច",
      descEn: "A clean, contained question that should fall to a clever new approach.",
      descKh: "សំណួរច្បាស់លាស់ មួយដែលគួរដោះស្រាយបានដោយវិធីសាស្ត្រថ្មីដ៏ឆ្លាតវៃ។",
    },
    {
      amount: "$100 – $500",
      tierEn: "Hard problem",
      tierKh: "បញ្ហាពិបាក",
      descEn: "Resistant to the standard tricks. Requires real new mathematics.",
      descKh: "ប្រឆាំងនឹងវិធីធម្មតា។ ត្រូវការគណិតវិទ្យាថ្មីៗពិតប្រាកដ។",
    },
    {
      amount: "$10,000",
      tierEn: "Seemingly impossible",
      tierKh: "ហាក់ដូចជាមិនអាចទៅរួច",
      descEn: "“Mathematics may not be ready for such problems.” — still open.",
      descKh: "“គណិតវិទ្យាប្រហែលជាមិនទាន់រួចរាល់សម្រាប់បញ្ហាបែបនេះ។” — នៅតែបើកចំហ។",
    },
  ];

  return (
    <article
      data-testid="erdos-bounty-system"
      className="rounded-2xl bg-slate-950/60 border-2 border-yellow-300/40 p-5 sm:p-6 shadow-[0_0_24px_rgba(253,224,71,0.08)]"
    >
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-yellow-300 text-slate-900 flex items-center justify-center">
          <DollarSign className="w-5 h-5" strokeWidth={3} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-yellow-300">
              Section 02 · The Method
            </span>
            <span className="font-khmer text-[11px] text-yellow-200">
              ផ្នែក ០២ · វិធីសាស្ត្រ
            </span>
          </div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-snug">
            <span className="block">The Bounty System</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-yellow-200 mt-1 leading-relaxed">
              ប្រព័ន្ធប្រាក់រង្វាន់
            </span>
          </h3>
        </div>
      </header>

      <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
        Erdős had a famous habit. Whenever he hit a problem he could not crack,
        he <strong className="text-yellow-200">put a cash prize on it</strong>.
        He paid the bounty out of his own pocket — often hundreds or thousands
        of dollars — to whoever first wrote a complete proof. Many of these
        bounties{" "}
        <strong className="text-yellow-200">are still active and unpaid today</strong>,
        kept alive after his death by his colleagues.
      </p>
      <p className="font-khmer text-slate-200 leading-loose mt-3 border-t border-yellow-300/20 pt-3">
        Erdős មានទម្លាប់ដ៏ល្បីមួយ។ នៅពេលណាដែលគាត់ជួបបញ្ហាដែលគាត់មិនអាចដោះស្រាយបាន គាត់{" "}
        <strong className="text-yellow-200">ដាក់ប្រាក់រង្វាន់ឱ្យវា</strong>។ គាត់បង់ប្រាក់រង្វាន់ពីហោប៉ៅរបស់គាត់ផ្ទាល់ — ជារឿយៗ រាប់រយ ឬរាប់ពាន់ដុល្លារ — ដល់នរណាដែលសរសេរសេចក្ដីបង្ហាញពេញលេញដំបូង។ ប្រាក់រង្វាន់ទាំងនេះច្រើន{" "}
        <strong className="text-yellow-200">នៅតែសកម្ម និងមិនទាន់បានបង់រហូតមកដល់ថ្ងៃនេះ</strong>{" "}
        ដែលត្រូវបានបន្តរក្សាបន្ទាប់ពីគាត់ស្លាប់ដោយសហការីរបស់គាត់។
      </p>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        {bounties.map((b) => (
          <BountyTier
            key={b.amount}
            amount={b.amount}
            tierEn={b.tierEn}
            tierKh={b.tierKh}
            descEn={b.descEn}
            descKh={b.descKh}
          />
        ))}
      </div>
    </article>
  );
}

function BountyTier({
  amount,
  tierEn,
  tierKh,
  descEn,
  descKh,
}: {
  amount: string;
  tierEn: string;
  tierKh: string;
  descEn: string;
  descKh: string;
}) {
  return (
    <div className="rounded-xl bg-white border border-yellow-300/60 shadow-sm overflow-hidden flex flex-col">
      <div className="px-3 py-2.5 bg-gradient-to-b from-yellow-50 to-white border-b border-yellow-200 flex items-baseline justify-between">
        <span className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
          {amount}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-amber-700">
          bounty · រង្វាន់
        </span>
      </div>
      <div className="px-3 py-3 flex-1">
        <div className="text-sm font-bold text-slate-900">{tierEn}</div>
        <div className="font-khmer text-[12px] text-slate-700 leading-relaxed">
          {tierKh}
        </div>
        <p className="text-[12px] text-slate-700 leading-snug mt-2">{descEn}</p>
        <p className="font-khmer text-[12px] text-slate-600 leading-relaxed mt-1.5 border-t border-stone-200 pt-1.5">
          {descKh}
        </p>
      </div>
    </div>
  );
}

/* ── Sub 3 · The $500 Riddle — Collatz Conjecture (3x + 1) ───────────── */
function CollatzCard() {
  const [seedInput, setSeedInput] = useState("27");
  const [seed, setSeed] = useState(27);

  // Compute the Collatz sequence (capped to a safe length for the UI).
  const sequence = useMemo(() => collatzSequence(seed, 500), [seed]);

  const handleRun = () => {
    const n = parseInt(seedInput, 10);
    if (Number.isFinite(n) && n > 0 && n <= 1_000_000) setSeed(n);
  };

  const peak = useMemo(
    () => (sequence.length ? Math.max(...sequence) : 0),
    [sequence],
  );
  const steps = sequence.length > 0 ? sequence.length - 1 : 0;
  const reachedOne = sequence.length > 0 && sequence[sequence.length - 1] === 1;

  return (
    <article
      data-testid="erdos-collatz"
      className="rounded-2xl bg-slate-950/60 border-2 border-yellow-300/50 p-5 sm:p-6 shadow-[0_0_28px_rgba(253,224,71,0.10)]"
    >
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-yellow-300 text-slate-900 flex items-center justify-center">
          <HelpCircle className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-yellow-300">
              Section 03 · The Riddle
            </span>
            <span className="font-khmer text-[11px] text-yellow-200">
              ផ្នែក ០៣ · បញ្ហាប្រឈម
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/40 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-200">
              <DollarSign className="w-3 h-3" /> $500 bounty · open
            </span>
          </div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-snug">
            <span className="block">The $500 Riddle — The Collatz Conjecture</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-yellow-200 mt-1 leading-relaxed">
              បញ្ហាប្រចាំតម្លៃ ៥០០ ដុល្លារ — សម្មតិកម្មខូឡាតស៍ (3x + 1)
            </span>
          </h3>
        </div>
      </header>

      <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
        Of all the problems Erdős backed with money, the most famous is the{" "}
        <strong className="text-yellow-200">3x + 1 problem</strong> (also called the{" "}
        <strong className="text-yellow-200">Collatz Conjecture</strong>). It is
        small enough to teach a ten-year-old in 30 seconds, and large enough
        that no human in history has been able to prove it true for all
        numbers. He famously said:{" "}
        <em className="text-yellow-100">“Mathematics may not be ready for such problems.”</em>
      </p>
      <p className="font-khmer text-slate-200 leading-loose mt-3 border-t border-yellow-300/20 pt-3">
        ក្នុងចំណោមបញ្ហាដែល Erdős បានគាំទ្រដោយប្រាក់ ល្បីបំផុតគឺ{" "}
        <strong className="text-yellow-200">បញ្ហា 3x + 1</strong> (ហៅផងដែរថា{" "}
        <strong className="text-yellow-200">សម្មតិកម្មខូឡាតស៍</strong>)។ វាតូចគ្រប់គ្រាន់ក្នុងការបង្រៀនក្មេងអាយុដប់ឆ្នាំ ក្នុងពេល ៣០ វិនាទី ហើយធំគ្រប់គ្រាន់ដែលគ្មានមនុស្សណាក្នុងប្រវត្តិសាស្ត្រ បានបង្ហាញថាវាពិតសម្រាប់លេខទាំងអស់។ គាត់បានពោលដ៏ល្បីថា៖{" "}
        <em className="text-yellow-100">“គណិតវិទ្យាប្រហែលជាមិនទាន់រួចរាល់សម្រាប់បញ្ហាបែបនេះទេ។”</em>
      </p>

      {/* Two clean floating rule cards */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        <CollatzRule
          id="even"
          tone="emerald"
          number="1"
          conditionEn="If the number is EVEN"
          conditionKh="បើសិនជាលេខគូ"
          actionEn="divide it by 2"
          actionKh="ចែកវាដោយ ២"
          formula="n ÷ 2"
          example="10 → 5"
        />
        <CollatzRule
          id="odd"
          tone="rose"
          number="2"
          conditionEn="If the number is ODD"
          conditionKh="បើសិនជាលេខសេស"
          actionEn="multiply by 3 and add 1"
          actionKh="គុណនឹង ៣ រួចបូក ១"
          formula="3n + 1"
          example="7 → 22"
        />
      </div>

      {/* The conjecture statement */}
      <div className="mt-4 rounded-xl bg-yellow-300/10 border border-yellow-300/40 px-4 py-3 flex items-start gap-3">
        <Repeat className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-yellow-50">
          <div>
            <strong className="text-yellow-200">The conjecture: </strong>
            no matter what positive whole number you start with — repeat the two
            rules above and you will{" "}
            <strong className="text-yellow-200">always</strong> eventually fall
            into the same loop:{" "}
            <span className="font-mono text-yellow-100">4 → 2 → 1 → 4 → 2 → 1 …</span>
          </div>
          <div className="font-khmer text-yellow-100/90 leading-loose mt-2">
            <strong className="text-yellow-200">សម្មតិកម្ម៖ </strong>
            មិនថាអ្នកចាប់ផ្ដើមដោយចំនួនគត់វិជ្ជមានណាមួយទេ — ធ្វើវិន័យទាំងពីរខាងលើម្ដងហើយម្ដងទៀត ហើយអ្នកនឹង{" "}
            <strong className="text-yellow-200">ជានិច្ច</strong>{" "}
            ធ្លាក់ចូលក្នុងរង្វិលជុំដដែល៖{" "}
            <span className="font-mono text-yellow-100">៤ → ២ → ១ → ៤ → ២ → ១ …</span>
          </div>
        </div>
      </div>

      {/* Try it yourself */}
      <div className="mt-5 rounded-xl bg-slate-900 border border-yellow-300/30 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-yellow-300">
            <span>Try it yourself</span>
            <span className="ml-2 font-khmer normal-case tracking-normal text-[11px] text-yellow-100/90">
              · សាកល្បងដោយខ្លួនឯង
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="collatz-input" className="text-xs text-slate-300">
            Start with: · ចាប់ផ្ដើមដោយ៖
          </label>
          <input
            id="collatz-input"
            data-testid="collatz-input"
            type="number"
            min={1}
            max={1_000_000}
            value={seedInput}
            onChange={(e) => setSeedInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRun();
            }}
            className="bg-slate-800 border border-yellow-300/40 text-yellow-100 font-mono text-sm rounded px-2 py-1 w-28 focus:outline-none focus:ring-2 focus:ring-yellow-300/60"
            aria-label="Starting number for the Collatz sequence"
          />
          <button
            data-testid="collatz-run"
            type="button"
            onClick={handleRun}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-yellow-300 text-slate-900 text-xs font-bold tracking-wider uppercase hover:bg-yellow-200 transition-colors"
          >
            <Play className="w-3.5 h-3.5" /> Run
          </button>
          <span className="font-khmer text-[11px] text-slate-400">
            (រត់)
          </span>
        </div>

        {/* The sequence */}
        <div
          data-testid="collatz-sequence"
          className="mt-4 rounded-lg bg-black/60 border border-yellow-300/20 p-3 font-mono text-xs sm:text-sm text-yellow-100 leading-relaxed overflow-x-auto"
        >
          {sequence.length === 0 ? (
            <span className="text-rose-300">
              Please enter a positive whole number.
            </span>
          ) : (
            <span>
              {sequence.map((n, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-slate-500"> → </span>}
                  <span
                    className={
                      n === 1 || n === 2 || n === 4
                        ? "text-emerald-300 font-bold"
                        : n === peak
                          ? "text-rose-300 font-bold"
                          : ""
                    }
                  >
                    {n}
                  </span>
                </span>
              ))}
            </span>
          )}
        </div>

        {/* Run summary */}
        {sequence.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            <ChalkStat
              icon={Sigma}
              valueEn={String(steps)}
              labelEn="steps to reach 1"
              labelKh="ចំនួនជំហានដើម្បីដល់ ១"
            />
            <ChalkStat
              icon={Mountain}
              valueEn={peak.toLocaleString()}
              labelEn="highest value reached"
              labelKh="តម្លៃខ្ពស់បំផុត"
            />
            <ChalkStat
              icon={reachedOne ? CheckCircle2 : InfinityIcon}
              valueEn={reachedOne ? "4 → 2 → 1" : "still climbing"}
              labelEn={reachedOne ? "loop reached" : "no result yet"}
              labelKh={reachedOne ? "ឈានដល់រង្វិលជុំ" : "មិនទាន់ដល់"}
            />
          </div>
        )}
      </div>

      {/* Closing note */}
      <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed italic">
        Computers have tested every starting number up to roughly 2<sup>68</sup> —
        about 295 million billion — and so far <em>every single one</em> falls
        into 4 → 2 → 1. But that is not a proof for{" "}
        <strong className="text-yellow-200">all</strong> numbers — only for the
        ones we have checked. The bounty stays open.
      </p>
      <p className="font-khmer text-xs sm:text-sm text-slate-300 leading-loose mt-1">
        កុំព្យូទ័របានសាកល្បងគ្រប់ចំនួនចាប់ផ្ដើមរហូតដល់ប្រហែល ២<sup>៦៨</sup> — ប្រហែល ២៩៥ លានពាន់លាន — ហើយរហូតមកដល់ពេលនេះ <em>គ្រប់លេខទាំងអស់</em> ធ្លាក់ទៅ ៤ → ២ → ១។ ប៉ុន្តែនោះមិនមែនជាសេចក្ដីបង្ហាញសម្រាប់{" "}
        <strong className="text-yellow-200">លេខទាំងអស់</strong>{" "}
        ទេ — តែសម្រាប់លេខដែលយើងបានពិនិត្យប៉ុណ្ណោះ។ ប្រាក់រង្វាន់នៅតែបើកចំហ។
      </p>
    </article>
  );
}

function CollatzRule({
  id,
  tone,
  number,
  conditionEn,
  conditionKh,
  actionEn,
  actionKh,
  formula,
  example,
}: {
  id: string;
  tone: "emerald" | "rose";
  number: string;
  conditionEn: string;
  conditionKh: string;
  actionEn: string;
  actionKh: string;
  formula: string;
  example: string;
}) {
  const accent =
    tone === "emerald"
      ? "border-emerald-300/70 bg-emerald-400/10"
      : "border-rose-300/70 bg-rose-400/10";
  const chip =
    tone === "emerald"
      ? "bg-emerald-300 text-emerald-950"
      : "bg-rose-300 text-rose-950";
  return (
    <div
      data-testid={`collatz-rule-${id}`}
      className={`rounded-xl border-2 ${accent} p-4 flex flex-col`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-7 h-7 rounded-md ${chip} flex items-center justify-center font-display font-bold text-base`}>
          {number}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-yellow-200">
          rule {number} · វិន័យទី {number}
        </span>
      </div>
      <div className="text-sm sm:text-base text-white leading-snug">
        <strong className="text-yellow-200">{conditionEn}</strong> — {actionEn}.
      </div>
      <div className="font-khmer text-sm text-yellow-100/95 leading-loose mt-1.5 border-t border-white/10 pt-1.5">
        <strong className="text-yellow-200">{conditionKh}</strong> — {actionKh}។
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2 rounded-lg bg-black/40 border border-white/10 px-3 py-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
            formula · រូបមន្ត
          </div>
          <div className="font-mono text-base sm:text-lg text-yellow-100">{formula}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
            example · ឧទាហរណ៍
          </div>
          <div className="font-mono text-sm sm:text-base text-emerald-200">
            {example}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tiny chalk-stat used inside the chalkboard panel ────────────────── */
function ChalkStat({
  icon: Icon,
  valueEn,
  labelEn,
  labelKh,
}: {
  icon: React.ComponentType<{ className?: string }>;
  valueEn: string;
  labelEn: string;
  labelKh: string;
}) {
  return (
    <div className="rounded-lg bg-slate-900/70 border border-yellow-300/30 px-3 py-2 flex items-start gap-2 min-w-0">
      <Icon className="w-4 h-4 text-yellow-300 flex-shrink-0 mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="font-display font-bold text-base sm:text-lg text-white leading-tight truncate">
          {valueEn}
        </div>
        <div className="text-[10px] sm:text-[11px] text-slate-300 leading-tight truncate">
          {labelEn}
        </div>
        <div className="font-khmer text-[10px] sm:text-[11px] text-slate-400 leading-relaxed truncate">
          {labelKh}
        </div>
      </div>
    </div>
  );
}

/* ── Pure helper: compute the Collatz sequence safely ────────────────── */
function collatzSequence(seed: number, maxSteps: number): number[] {
  if (!Number.isFinite(seed) || seed <= 0 || !Number.isInteger(seed)) return [];
  const out: number[] = [seed];
  let n = seed;
  for (let i = 0; i < maxSteps; i++) {
    if (n === 1) break;
    n = n % 2 === 0 ? n / 2 : 3 * n + 1;
    out.push(n);
    if (n > Number.MAX_SAFE_INTEGER / 4) break; // safety guard
  }
  return out;
}

// ════════════════════════════════════════════════════════════════════════════
//  Beyond the Curriculum · The Architecture of Numbers
//                          ស្ថាបត្យកម្មនៃតួលេខ
//
//  Aesthetic: shared "Academic Chalkboard" language with the Erdős section
//  (deep slate/charcoal panel, chalk-yellow + chalk-blue accents).
//  Strictly bilingual (paired EN+KH) for every heading and core concept.
// ════════════════════════════════════════════════════════════════════════════

function ArchitectureOfNumbersSection({ isKh: _isKh }: { isKh: boolean }) {
  return (
    <section
      id="architecture-of-numbers"
      data-testid="arch-numbers-section"
      aria-labelledby="arch-numbers-heading"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24"
    >
      <div className="rounded-3xl bg-slate-900 border-2 border-yellow-300/30 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.55)] overflow-hidden chalkboard-surface">
        {/* Top chalk-dust accent bar */}
        <div
          className="h-2"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(125,211,252,0.45), rgba(253,224,71,0.45), transparent)",
          }}
          aria-hidden
        />

        <div className="p-5 sm:p-8 space-y-6">
          {/* Bilingual section header */}
          <header className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sky-300 text-slate-900 flex items-center justify-center shadow-[0_0_22px_rgba(125,211,252,0.45)]">
              <Boxes className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-sky-200 mb-1">
                <span>Beyond the Curriculum</span>
                <span className="ml-2 font-khmer normal-case tracking-normal text-[11px] text-sky-100/90">
                  · លើសពីកម្មវិធីសិក្សា
                </span>
              </div>
              <h2
                id="arch-numbers-heading"
                className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight"
              >
                <span className="block">The Architecture of Numbers</span>
                <span className="block font-khmer text-xl sm:text-2xl text-sky-200 font-bold mt-1 leading-relaxed">
                  ស្ថាបត្យកម្មនៃតួលេខ
                </span>
              </h2>
            </div>
          </header>

          {/* Three sub-cards */}
          <PositionalSystemsCard />
          <NestedNumberSetsCard />
          <SpecializedSystemsCard />
        </div>
      </div>
    </section>
  );
}

/* ── Sub 1 · Positional Number Systems ──────────────────────────────── */
function PositionalSystemsCard() {
  return (
    <article
      data-testid="arch-positional-systems"
      className="rounded-2xl bg-slate-950/60 border-2 border-sky-300/40 p-5 sm:p-6 shadow-[0_0_24px_rgba(125,211,252,0.08)]"
    >
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-sky-300 text-slate-900 flex items-center justify-center">
          <Hash className="w-5 h-5" strokeWidth={2.75} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-sky-300">
              Section 01 · The Base
            </span>
            <span className="font-khmer text-[11px] text-sky-200">
              ផ្នែក ០១ · គ្រឹះ
            </span>
          </div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-snug">
            <span className="block">Positional Number Systems</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-sky-200 mt-1 leading-relaxed">
              ប្រព័ន្ធលេខតាមទីតាំង
            </span>
          </h3>
          <div className="mt-1.5 text-sm text-slate-200 italic leading-relaxed">
            Different languages for the exact same quantities.
          </div>
          <div className="font-khmer text-sm text-slate-300 leading-loose">
            ភាសាផ្សេងគ្នាសម្រាប់បរិមាណដូចគ្នាបេះបិទ។
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <BaseCard
          testId="arch-decimal"
          tone="emerald"
          icon={Hash}
          baseLabel="Base 10"
          nameEn="Decimal"
          nameKh="ទសភាគ"
          digits="0 1 2 3 4 5 6 7 8 9"
          taglineEn="The human standard."
          taglineKh="ស្តង់ដារមនុស្ស។"
          descEn="Based on our ten fingers — the system everyone learns to count with."
          descKh="ផ្អែកលើម្រាមដៃទាំងដប់ — ប្រព័ន្ធដែលមនុស្សគ្រប់គ្នារៀនរាប់ជាមួយ។"
          example="42"
          exampleNote="forty-two · សែសិបពីរ"
        />
        <BaseCard
          testId="arch-binary"
          tone="cyan"
          icon={Binary}
          baseLabel="Base 2"
          nameEn="Binary"
          nameKh="ប៊ីណែរ"
          digits="0 1"
          taglineEn="The computer standard."
          taglineKh="ស្តង់ដារកុំព្យូទ័រ។"
          descEn="Based on microscopic switches being ON or OFF — every chip thinks in 1s and 0s."
          descKh="ផ្អែកលើកុងតាក់មីក្រូទស្សន៍ដែលបើក/បិទ — រាល់ឈីបគិតក្នុង ១ និង ០។"
          example="101010"
          exampleNote="= 42 in decimal · = ៤២ ទសភាគ"
        />
        <BaseCard
          testId="arch-octal"
          tone="amber"
          icon={Cpu}
          baseLabel="Base 8"
          nameEn="Octal"
          nameKh="អុកតាល"
          digits="0 1 2 3 4 5 6 7"
          taglineEn="A computing shortcut."
          taglineKh="ផ្លូវកាត់សម្រាប់កុំព្យូទ័រ។"
          descEn="A historical shorthand for grouping binary in threes — still used in file permissions."
          descKh="សញ្ញាសរសេរចាស់សម្រាប់ការដាក់ប៊ីណែរជាក្រុមៗ បីៗ — នៅតែប្រើក្នុងសិទ្ធិឯកសារ។"
          example="52"
          exampleNote="= 42 in decimal · = ៤២ ទសភាគ"
        />
        <BaseCard
          testId="arch-hex"
          tone="fuchsia"
          icon={Sparkles}
          baseLabel="Base 16"
          nameEn="Hexadecimal"
          nameKh="ហិចសាដេស៊ីម៉ាល់"
          digits="0–9 · A B C D E F"
          taglineEn="The engineer's standard."
          taglineKh="ស្តង់ដារវិស្វករ។"
          descEn="Used by modern engineers for website colors and memory addresses (e.g. #FF5733)."
          descKh="ប្រើដោយវិស្វករសម័យទំនើបសម្រាប់ពណ៌គេហទំព័រ និងអាសយដ្ឋានអង្គចងចាំ (ឧ. #FF5733)។"
          example="2A"
          exampleNote="= 42 in decimal · = ៤២ ទសភាគ"
        />
      </div>

      <p className="mt-4 text-xs sm:text-sm text-slate-300 italic leading-relaxed">
        Note how every card on this row spells the very same quantity —{" "}
        <strong className="text-yellow-200">42</strong> — in a different
        language. The number doesn't change; only the script we write it in does.
      </p>
      <p className="font-khmer text-xs sm:text-sm text-slate-300 leading-loose mt-1">
        សូមកត់សម្គាល់ថា រាល់ប័ណ្ណក្នុងជួរនេះសរសេរបរិមាណដូចគ្នា — <strong className="text-yellow-200">៤២</strong> — ក្នុងភាសាផ្សេងគ្នា។ តួលេខមិនប្រែប្រួលទេ មានតែអក្សរដែលយើងសរសេរវាប៉ុណ្ណោះប្រែប្រួល។
      </p>
    </article>
  );
}

function BaseCard({
  testId,
  tone,
  icon: Icon,
  baseLabel,
  nameEn,
  nameKh,
  digits,
  taglineEn,
  taglineKh,
  descEn,
  descKh,
  example,
  exampleNote,
}: {
  testId: string;
  tone: "emerald" | "cyan" | "amber" | "fuchsia";
  icon: React.ComponentType<{ className?: string }>;
  baseLabel: string;
  nameEn: string;
  nameKh: string;
  digits: string;
  taglineEn: string;
  taglineKh: string;
  descEn: string;
  descKh: string;
  example: string;
  exampleNote: string;
}) {
  const ring = {
    emerald: "border-emerald-300/60 bg-emerald-400/5",
    cyan: "border-cyan-300/60 bg-cyan-400/5",
    amber: "border-amber-300/60 bg-amber-400/5",
    fuchsia: "border-fuchsia-300/60 bg-fuchsia-400/5",
  }[tone];
  const chip = {
    emerald: "bg-emerald-300 text-emerald-950",
    cyan: "bg-cyan-300 text-cyan-950",
    amber: "bg-amber-300 text-amber-950",
    fuchsia: "bg-fuchsia-300 text-fuchsia-950",
  }[tone];
  const accent = {
    emerald: "text-emerald-200",
    cyan: "text-cyan-200",
    amber: "text-amber-200",
    fuchsia: "text-fuchsia-200",
  }[tone];

  return (
    <div
      data-testid={testId}
      className={`rounded-xl border-2 ${ring} p-4 flex flex-col`}
    >
      <div className="flex items-start gap-2.5 mb-2">
        <span className={`w-9 h-9 rounded-lg ${chip} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className={`text-[10px] font-mono uppercase tracking-[0.2em] ${accent}`}>
            {baseLabel}
          </div>
          <div className="font-display font-bold text-base text-white leading-tight">
            {nameEn}
          </div>
          <div className="font-khmer text-sm font-bold text-white/95 leading-relaxed">
            {nameKh}
          </div>
        </div>
      </div>
      <div className="rounded-md bg-black/40 border border-white/10 px-2.5 py-1.5 mt-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
          digits · តួលេខ
        </div>
        <div className="font-mono text-sm text-yellow-100 tracking-wider">
          {digits}
        </div>
      </div>
      <div className="mt-2.5 text-[12px] text-slate-100 leading-snug">
        <strong className={accent}>{taglineEn}</strong> {descEn}
      </div>
      <div className="font-khmer text-[12px] text-slate-200 leading-relaxed mt-1.5 border-t border-white/10 pt-1.5">
        <strong className={accent}>{taglineKh}</strong> {descKh}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2 rounded-md bg-black/40 border border-white/10 px-2.5 py-1.5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
            example · ឧទាហរណ៍
          </div>
          <div className="font-mono text-base sm:text-lg text-yellow-100 tabular-nums">
            {example}
          </div>
        </div>
        <div className="text-right text-[10px] font-mono text-slate-300">
          {exampleNote}
        </div>
      </div>
    </div>
  );
}

/* ── Sub 2 · Nested Dolls — Number Sets ─────────────────────────────── */
function NestedNumberSetsCard() {
  return (
    <article
      data-testid="arch-number-sets"
      className="rounded-2xl bg-slate-950/60 border-2 border-yellow-300/40 p-5 sm:p-6 shadow-[0_0_24px_rgba(253,224,71,0.08)]"
    >
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-yellow-300 text-slate-900 flex items-center justify-center">
          <Layers className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-yellow-300">
              Section 02 · The Hierarchy
            </span>
            <span className="font-khmer text-[11px] text-yellow-200">
              ផ្នែក ០២ · ឋានានុក្រម
            </span>
          </div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-snug">
            <span className="block">The Nested Dolls of Math — Number Sets</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-yellow-200 mt-1 leading-relaxed">
              តុក្កតាសំបុកនៃគណិតវិទ្យា — សំណុំចំនួន
            </span>
          </h3>
        </div>
      </header>

      <p className="text-sm sm:text-[15px] text-slate-100 leading-relaxed">
        Numbers don't all live in one place — they live inside{" "}
        <strong className="text-yellow-200">nested categories</strong>, like
        Russian dolls. Each new layer adds a new kind of number that the smaller
        layer cannot describe. Read the box from the inside out.
      </p>
      <p className="font-khmer text-sm text-slate-200 leading-loose mt-3 border-t border-yellow-300/20 pt-3">
        តួលេខទាំងអស់មិនរស់នៅកន្លែងតែមួយទេ — ពួកវារស់នៅខាងក្នុង<strong className="text-yellow-200">ប្រភេទសំបុក</strong>ដូចជាតុក្កតារុស្ស៊ី។ រាល់ស្រទាប់ថ្មី បន្ថែមប្រភេទលេខថ្មី ដែលស្រទាប់តូចជាងមិនអាចពិពណ៌នាបាន។ សូមអាននៅក្នុងប្រអប់ ពីខាងក្នុងទៅខាងក្រៅ។
      </p>

      {/* Visual nested boxes ℂ ⊃ ℝ ⊃ ℚ ⊃ ℤ ⊃ 𝕎 ⊃ ℕ */}
      <div className="mt-5 rounded-xl bg-black/50 border border-yellow-300/20 p-3 sm:p-4 overflow-hidden">
        <NestedSet
          symbol={<InlineMath math="\mathbb{C}" />}
          nameEn="Complex Numbers"
          nameKh="ចំនួនកុំផ្លិច"
          tagEn="The ultimate set — real + imaginary (a + bi)."
          tagKh="សំណុំចុងក្រោយ — ពិត + ស្រមើស្រមៃ (a + bi)។"
          example="3 + 2i"
          tone="violet"
        >
          <NestedSet
            symbol={<InlineMath math="\mathbb{R}" />}
            nameEn="Real Numbers"
            nameKh="ចំនួនពិត"
            tagEn="Everything on the standard number line."
            tagKh="អ្វីៗគ្រប់យ៉ាងនៅលើបន្ទាត់លេខស្តង់ដារ។"
            example="−7,  0,  ½,  π"
            tone="rose"
          >
            <div className="flex flex-col md:flex-row gap-2.5">
              {/* Rationals branch */}
              <div className="flex-1 min-w-0">
                <NestedSet
                  symbol={<InlineMath math="\mathbb{Q}" />}
                  nameEn="Rational Numbers"
                  nameKh="ចំនួនសនិទាន"
                  tagEn="Anything you can write as a fraction p/q."
                  tagKh="អ្វីដែលអ្នកអាចសរសេរជាប្រភាគ p/q។"
                  example="½,  0.75,  −3"
                  tone="amber"
                >
                  <NestedSet
                    symbol={<InlineMath math="\mathbb{Z}" />}
                    nameEn="Integers"
                    nameKh="ចំនួនគត់"
                    tagEn="Adds the concept of debt — negatives."
                    tagKh="បន្ថែមគំនិតបំណុល — អវិជ្ជមាន។"
                    example="−2, −1, 0, 1, 2"
                    tone="emerald"
                  >
                    <NestedSet
                      symbol={<InlineMath math="\mathbb{W}" />}
                      nameEn="Whole Numbers"
                      nameKh="ចំនួនពេញ"
                      tagEn="Natural numbers plus zero."
                      tagKh="ចំនួនធម្មជាតិបូកសូន្យ។"
                      example="0, 1, 2, 3, …"
                      tone="cyan"
                    >
                      <NestedSet
                        symbol={<InlineMath math="\mathbb{N}" />}
                        nameEn="Natural Numbers"
                        nameKh="ចំនួនធម្មជាតិ"
                        tagEn="Counting numbers — what babies learn first."
                        tagKh="លេខរាប់ — អ្វីដែលក្មេងតូចរៀនមុនគេ។"
                        example="1, 2, 3, …"
                        tone="sky"
                        leaf
                      />
                    </NestedSet>
                  </NestedSet>
                </NestedSet>
              </div>
              {/* Irrationals sibling */}
              <div className="flex-1 min-w-0">
                <NestedSet
                  symbol={<span className="font-serif italic">𝕀</span>}
                  nameEn="Irrational Numbers"
                  nameKh="ចំនួនអសនិទាន"
                  tagEn="Endless, never-repeating decimals — can NEVER be written as a fraction."
                  tagKh="ទសភាគគ្មានទីបញ្ចប់ មិនធ្លាប់ដដែល — មិនអាចសរសេរជាប្រភាគបាន។"
                  example="π,  √2,  e"
                  tone="fuchsia"
                  leaf
                />
              </div>
            </div>
          </NestedSet>
        </NestedSet>
      </div>

      {/* Symbol legend / cheat-sheet */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
        {[
          { sym: "\\mathbb{N}", en: "Natural", kh: "ធម្មជាតិ" },
          { sym: "\\mathbb{W}", en: "Whole", kh: "ពេញ" },
          { sym: "\\mathbb{Z}", en: "Integers", kh: "គត់" },
          { sym: "\\mathbb{Q}", en: "Rational", kh: "សនិទាន" },
          { sym: "", en: "Irrational", kh: "អសនិទាន", literal: "𝕀" },
          { sym: "\\mathbb{R}", en: "Real", kh: "ពិត" },
          { sym: "\\mathbb{C}", en: "Complex", kh: "កុំផ្លិច" },
        ].map((s) => (
          <div
            key={s.en}
            className="rounded-md bg-slate-900/70 border border-yellow-300/20 px-2 py-1.5 text-center"
          >
            <div className="text-yellow-100 text-base">
              {s.sym ? <InlineMath math={s.sym} /> : (
                <span className="font-serif italic">{s.literal}</span>
              )}
            </div>
            <div className="text-[10px] text-slate-300 leading-tight">{s.en}</div>
            <div className="font-khmer text-[10px] text-slate-400 leading-relaxed">
              {s.kh}
            </div>
          </div>
        ))}
      </div>

      {/* Containment line */}
      <div className="mt-4 rounded-md bg-slate-900/70 border border-yellow-300/30 px-3 py-2 overflow-x-auto">
        <div className="text-[10px] font-mono uppercase tracking-widest text-yellow-300 mb-1">
          <span>The chain of containment</span>
          <span className="ml-2 font-khmer normal-case tracking-normal text-yellow-200/90">
            · ខ្សែសង្វាក់នៃការមាន
          </span>
        </div>
        <div className="text-base sm:text-lg text-yellow-100 whitespace-nowrap">
          <BlockMath math="\mathbb{N} \subset \mathbb{W} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}" />
        </div>
      </div>
    </article>
  );
}

function NestedSet({
  symbol,
  nameEn,
  nameKh,
  tagEn,
  tagKh,
  example,
  tone,
  leaf = false,
  children,
}: {
  symbol: React.ReactNode;
  nameEn: string;
  nameKh: string;
  tagEn: string;
  tagKh: string;
  example: string;
  tone: "violet" | "rose" | "amber" | "emerald" | "cyan" | "sky" | "fuchsia";
  leaf?: boolean;
  children?: React.ReactNode;
}) {
  const ring = {
    violet: "border-violet-300/60 bg-violet-400/5",
    rose: "border-rose-300/60 bg-rose-400/5",
    amber: "border-amber-300/60 bg-amber-400/5",
    emerald: "border-emerald-300/60 bg-emerald-400/5",
    cyan: "border-cyan-300/60 bg-cyan-400/5",
    sky: "border-sky-300/60 bg-sky-400/5",
    fuchsia: "border-fuchsia-300/60 bg-fuchsia-400/5",
  }[tone];
  const accent = {
    violet: "text-violet-200",
    rose: "text-rose-200",
    amber: "text-amber-200",
    emerald: "text-emerald-200",
    cyan: "text-cyan-200",
    sky: "text-sky-200",
    fuchsia: "text-fuchsia-200",
  }[tone];

  return (
    <div className={`rounded-lg border-2 ${ring} p-2.5 sm:p-3`}>
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className={`text-2xl ${accent}`}>{symbol}</span>
        <div className="min-w-0">
          <div className="text-sm font-bold text-white leading-tight">
            {nameEn}
          </div>
          <div className="font-khmer text-[12px] text-white/90 leading-relaxed">
            {nameKh}
          </div>
        </div>
        <span className="ml-auto font-mono text-[11px] text-yellow-100 bg-black/40 border border-white/10 rounded px-2 py-0.5">
          {example}
        </span>
      </div>
      <div className="text-[12px] text-slate-200 leading-snug">{tagEn}</div>
      <div className="font-khmer text-[11px] text-slate-300 leading-relaxed">
        {tagKh}
      </div>
      {!leaf && children && <div className="mt-2.5">{children}</div>}
    </div>
  );
}

/* ── Sub 3 · Specialized Systems ────────────────────────────────────── */
function SpecializedSystemsCard() {
  return (
    <article
      data-testid="arch-specialized"
      className="rounded-2xl bg-slate-950/60 border-2 border-sky-300/40 p-5 sm:p-6 shadow-[0_0_24px_rgba(125,211,252,0.08)]"
    >
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-sky-300 text-slate-900 flex items-center justify-center">
          <Sparkles className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-sky-300">
              Section 03 · The Classifications
            </span>
            <span className="font-khmer text-[11px] text-sky-200">
              ផ្នែក ០៣ · ការបែងចែក
            </span>
          </div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-snug">
            <span className="block">Specialized Systems</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-sky-200 mt-1 leading-relaxed">
              ប្រព័ន្ធឯកទេសផ្សេងៗ
            </span>
          </h3>
        </div>
      </header>

      <p className="text-sm text-slate-100 leading-relaxed">
        Beyond the nested-dolls hierarchy, mathematicians label numbers in a few
        more ways — some everyday, others reserved for university lecture halls.
      </p>
      <p className="font-khmer text-sm text-slate-200 leading-loose mt-2 border-t border-sky-300/20 pt-2">
        លើសពីឋានានុក្រមតុក្កតាសំបុក គណិតវិទូដាក់ស្លាកតួលេខតាមវិធីពីរបីផ្សេងទៀត — ខ្លះធម្មតា ខ្លះទុកសម្រាប់សាលសិក្ខាសាលាសាកលវិទ្យាល័យ។
      </p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Even / Odd */}
        <div className="rounded-xl border-2 border-emerald-300/50 bg-emerald-400/5 p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-md bg-emerald-300 text-emerald-950 flex items-center justify-center font-display font-extrabold text-sm">
              ½
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-200">
                Everyday · ប្រចាំថ្ងៃ
              </div>
              <div className="font-display font-bold text-white leading-tight">
                Even / Odd
              </div>
              <div className="font-khmer text-[12px] font-bold text-white/90 leading-relaxed">
                គូ / សេស
              </div>
            </div>
          </div>
          <div className="text-[12px] text-slate-100 leading-snug">
            <strong className="text-emerald-200">Even:</strong> divisible by 2 (2, 4, 6, …).{" "}
            <strong className="text-emerald-200">Odd:</strong> not divisible by 2 (1, 3, 5, …).
          </div>
          <div className="font-khmer text-[12px] text-slate-200 leading-relaxed mt-1.5 border-t border-white/10 pt-1.5">
            <strong className="text-emerald-200">គូ៖</strong> ចែកនឹង ២ បាន (២, ៤, ៦, …)។{" "}
            <strong className="text-emerald-200">សេស៖</strong> ចែកនឹង ២ មិនបាន (១, ៣, ៥, …)។
          </div>
        </div>

        {/* Prime / Composite */}
        <div className="rounded-xl border-2 border-amber-300/50 bg-amber-400/5 p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-md bg-amber-300 text-amber-950 flex items-center justify-center font-display font-extrabold text-sm">
              7
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200">
                Building blocks · គ្រឹះ
              </div>
              <div className="font-display font-bold text-white leading-tight">
                Prime / Composite
              </div>
              <div className="font-khmer text-[12px] font-bold text-white/90 leading-relaxed">
                ចំនួនបឋម / ចំនួនសមាស
              </div>
            </div>
          </div>
          <div className="text-[12px] text-slate-100 leading-snug">
            <strong className="text-amber-200">Prime:</strong> only two factors — 1 and itself (2, 3, 5, 7, 11…).{" "}
            <strong className="text-amber-200">Composite:</strong> built by multiplying smaller primes (4 = 2×2, 12 = 2×2×3).
          </div>
          <div className="font-khmer text-[12px] text-slate-200 leading-relaxed mt-1.5 border-t border-white/10 pt-1.5">
            <strong className="text-amber-200">បឋម៖</strong> មានតួចែកតែ ២ — ១ និងខ្លួនវា។ <strong className="text-amber-200">សមាស៖</strong> បង្កើតពីការគុណចំនួនបឋមតូចៗ។
          </div>
        </div>

        {/* Hypercomplex & P-adic */}
        <div className="rounded-xl border-2 border-fuchsia-300/50 bg-fuchsia-400/5 p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-md bg-fuchsia-300 text-fuchsia-950 flex items-center justify-center font-display font-extrabold text-sm">
              ∞
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-fuchsia-200">
                University-level · កម្រិតសាកលវិទ្យាល័យ
              </div>
              <div className="font-display font-bold text-white leading-tight">
                Hypercomplex &amp; P-adic
              </div>
              <div className="font-khmer text-[12px] font-bold text-white/90 leading-relaxed">
                ហួសកុំផ្លិច និង P-adic
              </div>
            </div>
          </div>
          <div className="text-[12px] text-slate-100 leading-snug">
            Extreme theoretical systems. <strong className="text-fuchsia-200">Quaternions</strong> — a hypercomplex set with three imaginary units — power the rotations in 3D video-game physics.
          </div>
          <div className="font-khmer text-[12px] text-slate-200 leading-relaxed mt-1.5 border-t border-white/10 pt-1.5">
            ប្រព័ន្ធទ្រឹស្តីខ្ពស់។ <strong className="text-fuchsia-200">Quaternions</strong> — សំណុំហួសកុំផ្លិចមានឯកតាស្រមើស្រមៃបី — ប្រើសម្រាប់បង្វិលក្នុងរូបវិទ្យាហ្គេមវីដេអូ ៣D។
          </div>
        </div>
      </div>
    </article>
  );
}
