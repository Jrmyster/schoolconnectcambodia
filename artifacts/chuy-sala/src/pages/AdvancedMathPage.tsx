import { Link } from "wouter";
import {
  ArrowLeft,
  Sparkles,
  Mountain,
  Move,
  Grid3x3,
  Sigma,
  Compass,
  Snowflake,
  Info,
} from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  MTH-ADV-01 · Advanced Logic: Multi-Variable Math & Matrices
//             តក្កវិទ្យាកម្រិតខ្ពស់៖ គណិតវិទ្យាអថេរច្រើន និងម៉ាទ្រីស
//
//  1. Partial Derivatives — the mountain climber (∂)
//  2. Linear Algebra      — vectors as arrows + matrices as grid transformers
//
//  Aesthetic: blueprint graph paper (matches the Arithmetic / Mathematics page)
// ════════════════════════════════════════════════════════════════════════════

export function AdvancedMathPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-900 overflow-hidden">
      <GraphPaperBg />

      {/* Back link */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/mathematics"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors ${isKh ? "font-khmer" : ""}`}
          data-testid="back-to-math"
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅគណិតវិទ្យា" : "Back to Mathematics"}
        </Link>
      </div>

      {/* Hero */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
        <div className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm">
          <Sigma className="w-3.5 h-3.5" />
          {isKh ? "មេរៀនបន្ត · គណិតវិទ្យា" : "Continue deeper · Mathematics"}
          <span className="font-mono opacity-60">· MTH-ADV-01</span>
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-4 leading-tight ${isKh ? "font-khmer leading-loose" : ""}`}
          data-testid="page-title"
        >
          {isKh ? (
            <>តក្កវិទ្យាកម្រិតខ្ពស់៖ <span className="text-blue-700">គណិតវិទ្យាអថេរច្រើន និងម៉ាទ្រីស</span></>
          ) : (
            <>Advanced Logic: <span className="text-blue-700">Multi-Variable Math & Matrices</span></>
          )}
        </h1>
        <p className={`text-slate-700 max-w-3xl text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "មេរៀនពីរនៅតែជាគ្រឹះនៃសាកលវិទ្យាល័យ និងវិស្វកម្មទំនើប — Calculus III ដែលអនុញ្ញាតឱ្យអ្នកគណនាជម្រាលលើផ្ទៃ ៣ វិមាត្រ ហើយ ពីជគណិតលីនេអ៊ែរ ដែលប្រែក្លាយលំហទាំងមូលដោយការគុណមួយ។"
            : "Two ideas that anchor every modern engineering and computer-science degree — Calculus III lets you measure slope on a 3-dimensional surface, and Linear Algebra lets you transform an entire space with one multiplication."}
        </p>
      </header>

      {/* Section 01 — Partial Derivatives */}
      <PartialDerivativesSection isKh={isKh} />

      {/* Section 02 — Linear Algebra */}
      <LinearAlgebraSection isKh={isKh} />

      {/* Closing */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-slate-600 text-sm italic">
        <span className={isKh ? "font-khmer not-italic" : "font-serif"}>
          {isKh
            ? "« តាមការរីករាលនៃរូបមន្ត គណិតវិទ្យាបង្កើតពិភពនៅឯកលក្ខណៈរបស់វា។ »"
            : "“Through the language of formulas, mathematics builds a world of its own.”"}
        </span>
      </footer>
    </div>
  );
}

export default AdvancedMathPage;

// ════════════════════════════════════════════════════════════════════════════
//  Shared blueprint background + paper card
// ════════════════════════════════════════════════════════════════════════════

function GraphPaperBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eff6ff 60%, #e0ecfb 100%)" }} />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="adv-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.55" />
          </pattern>
          <pattern id="adv-grid-bold" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#adv-grid-fine)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#93c5fd" strokeWidth="0.9" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#adv-grid-bold)" />
      </svg>
    </div>
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

function SectionShell({
  id, eyebrowEn, eyebrowKh, titleEn, titleKh, khTerm, descEn, descKh, isKh, children,
}: {
  id: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  khTerm: string;
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
            <span className="ml-2 font-khmer text-base font-normal text-slate-500">({khTerm})</span>
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

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — Partial Derivatives (the Mountain Climber)
// ════════════════════════════════════════════════════════════════════════════

function PartialDerivativesSection({ isKh }: { isKh: boolean }) {
  return (
    <SectionShell
      id="partial-derivatives"
      eyebrowEn="01 · The Mountain Climber"
      eyebrowKh="០១ · អ្នកឡើងភ្នំ"
      titleEn="Partial Derivatives — slope in a world with more than one direction"
      titleKh="ដេរីវេដោយផ្នែក — ជម្រាលនៅក្នុងពិភពលោកដែលមានទិសច្រើនជាងមួយ"
      khTerm="ដេរីវេដោយផ្នែក"
      descEn={
        "Imagine you are standing on the side of a mountain. Someone asks: \"What is your slope?\" The honest answer is: \"It depends on which way I'm facing.\" Step North and the ground rises sharply; step East and it falls away. The standard derivative d/dx breaks down here — there is more than one direction to walk in. We need a tool that can talk about one direction at a time."
      }
      descKh="ស្រមៃថាអ្នកឈរនៅលើជម្រាលភ្នំមួយ។ មានគេសួរថា ៖ « តើជម្រាលរបស់អ្នកគឺប៉ុន្មាន ? » ចម្លើយដ៏ស្មោះត្រង់គឺ ៖ « វាអាស្រ័យលើទិសណាដែលខ្ញុំបែរមុខ។ » ដើរទៅខាងជើង ដីឡើងខ្ពស់ ដើរទៅខាងកើត ដីធ្លាក់ចុះ។ ដេរីវេធម្មតា d/dx លែងគ្រប់គ្រាន់ទៀតហើយ — មានទិសច្រើនជាងមួយដើម្បីដើរ។ យើងត្រូវការឧបករណ៍មួយដែលអាចនិយាយអំពីទិសមួយក្នុងពេលមួយ។"
      isKh={isKh}
    >
      {/* Topographic mountain map */}
      <PaperCard className="p-5 sm:p-6" data-testid="mountain-card">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-5 items-center">
          <div className="flex justify-center">
            <TopoMountainSVG isKh={isKh} />
          </div>
          <div>
            <div className={`text-[11px] font-bold uppercase tracking-widest text-blue-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ផែនទី Topo នៃភ្នំ" : "Topographic mountain map"}
            </div>
            <h3 className={`font-display font-bold text-xl sm:text-2xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? "ការដឹកការផ្នែកតែមួយជើងក្នុងពេលតែមួយ" : "Take one step in one direction at a time"}
            </h3>
            <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "ផែនទីខាងឆ្វេងជាផែនទីបន្ទាត់ស្រទាប់ — បន្ទាត់រាងរង្វង់នីមួយៗតំណាងឱ្យកំពស់មួយដូចគ្នា។ ចំណុចក្រហមគឺជាកន្លែងដែលអ្នកឈរ។ ព្រួញបៃតង = ការដើរទៅខាងជើង (តាមអ័ក្ស x) ; ព្រួញ​ផ្កាឈូក = ការដើរទៅខាងកើត (តាមអ័ក្ស y)។"
                : "On the left is a contour map — every loop is one constant altitude. The red dot is where you are standing. The green arrow is one step North (the x axis); the rose arrow is one step East (the y axis)."}
            </p>
            <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "បន្ទាត់ស្រទាប់ខាងជើង កាន់តែស្និតគ្នា ⇒ ដីឡើងលឿន ⇒ ជម្រាលផ្នែកធំ។ ខាងកើតដាច់ស្រឡះ ⇒ ដីស្ងួត ⇒ ជម្រាលផ្នែកតូច។"
                : "Contour lines crowd together to the North → ground rises fast → large partial slope. Contour lines spread apart to the East → ground is gentle → small partial slope."}
            </p>
          </div>
        </div>
      </PaperCard>

      {/* The ∂ notation */}
      <PaperCard className="p-5 sm:p-6" data-testid="partial-notation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ∂f/∂x */}
          <div className="rounded-xl border border-emerald-300 bg-emerald-50/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-emerald-600 text-white">
                <Mountain className="w-4 h-4" />
              </span>
              <h4 className={`font-bold text-base text-slate-900 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ដើរទៅខាងជើង" : "Step North"}
              </h4>
            </div>
            <div className="text-center my-3">
              <BlockMath math="\frac{\partial f}{\partial x}" />
            </div>
            <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "« កក់ y ឱ្យឋិតថេរ ; តើ f ប្រែប៉ុណ្ណា ប្រសិនបើខ្ញុំធ្វើជំហានតូចមួយតាម x ? »"
                : "\"Freeze y in place; how much does f change if I take one tiny step along x?\""}
            </p>
          </div>

          {/* ∂f/∂y */}
          <div className="rounded-xl border border-rose-300 bg-rose-50/40 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-rose-600 text-white">
                <Compass className="w-4 h-4" />
              </span>
              <h4 className={`font-bold text-base text-slate-900 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ដើរទៅខាងកើត" : "Step East"}
              </h4>
            </div>
            <div className="text-center my-3">
              <BlockMath math="\frac{\partial f}{\partial y}" />
            </div>
            <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "« កក់ x ឱ្យឋិតថេរ ; តើ f ប្រែប៉ុណ្ណា ប្រសិនបើខ្ញុំធ្វើជំហានតូចមួយតាម y ? »"
                : "\"Freeze x in place; how much does f change if I take one tiny step along y?\""}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-blue-300 bg-blue-50/60 p-4">
          <div className="flex items-start gap-2">
            <Snowflake className="w-4 h-4 mt-0.5 text-blue-700 flex-shrink-0" />
            <p className={`text-sm text-slate-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <strong>{isKh ? "និមិត្តសញ្ញាកោងៗ ∂ ៖ " : "The curly ∂ symbol: "}</strong>
              {isKh ? (
                <>
                  ខុសពី <InlineMath math="d" /> ត្រង់ៗរបស់ Calculus I, និមិត្តសញ្ញាកោង <InlineMath math="\partial" /> ប្រាប់អ្នកអានថា « សូមកក់សកលលោកដែលនៅសល់ឱ្យឋិតថេរ » ហើយផ្លាស់ប្ដូរតែអថេរមួយប៉ុណ្ណោះ។ វាគឺជាល្បិចសំខាន់របស់ Calculus III, ហើយជាមូលដ្ឋាននៃរូបវិទ្យា វិស្វកម្ម និងការបណ្តុះបណ្តាល AI។
                </>
              ) : (
                <>
                  Unlike the straight <InlineMath math="d" /> of Calculus I, the curly <InlineMath math="\partial" /> tells the reader: <em>"hold the rest of the universe constant"</em> and vary just one variable. It is the central trick of Calculus III, and the foundation of physics, engineering, and AI training.
                </>
              )}
            </p>
          </div>
        </div>
      </PaperCard>

      {/* Worked example */}
      <PaperCard className="p-5 sm:p-6" data-testid="partial-example">
        <div className={`text-[11px] font-bold uppercase tracking-widest text-blue-700 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ឧទាហរណ៍" : "Worked example"}
        </div>
        <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ឱ្យមុខងារភ្នំ ៖ "
            : "Let the mountain be described by:"}{" "}
          <span className="inline-block align-middle">
            <InlineMath math="f(x, y) = x^2 + 3y^2" />
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="text-center mb-2">
              <BlockMath math="\frac{\partial f}{\partial x} = 2x" />
            </div>
            <p className={`text-xs text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "កក់ y ឋិតថេរ → តួ 3y² ក្លាយជាថេរ ហើយរលាយ។ នៅសល់តែជម្រាលក្នុងទិស x ប៉ុណ្ណោះ។"
                : "Freezing y, the 3y² term becomes a constant and vanishes. Only the slope along x survives."}
            </p>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
            <div className="text-center mb-2">
              <BlockMath math="\frac{\partial f}{\partial y} = 6y" />
            </div>
            <p className={`text-xs text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "កក់ x ឋិតថេរ → តួ x² រលាយ។ នៅសល់តែជម្រាលក្នុងទិស y ប៉ុណ្ណោះ — ហើយវាធំជាង ៣ ដង!"
                : "Freezing x, the x² term vanishes. Only the slope along y survives — and it is 3× steeper!"}
            </p>
          </div>
        </div>

        <p className={`text-sm text-slate-700 mt-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "នៅចំណុច (1, 1) ៖ ដើរទៅខាងជើងផ្តល់ជម្រាល 2 ; ដើរទៅខាងកើតផ្តល់ជម្រាល 6។ ដូច្នេះផ្លូវឡើងភ្នំដ៏ងាយស្រួលបំផុត គឺផ្ទុយពីព្រួញ — ដើរ​ទៅ​ខាង​លិច!"
            : "At the point (1, 1): walking North gives slope 2; walking East gives slope 6. So the easiest way down the mountain is the opposite of those arrows — walk West!"}
        </p>
      </PaperCard>
    </SectionShell>
  );
}

// ─── Topographic mountain SVG (contour lines + N/E partial-derivative arrows)
function TopoMountainSVG({ isKh }: { isKh: boolean }) {
  // Contour ellipses crowded north (small ry), spread east (large rx)
  const cx = 200;
  const cy = 170;
  const contours = [
    { rx: 30, ry: 18 },
    { rx: 60, ry: 36 },
    { rx: 90, ry: 56 },
    { rx: 120, ry: 78 },
    { rx: 150, ry: 100 },
    { rx: 180, ry: 124 },
  ];
  return (
    <svg viewBox="0 0 400 320" className="w-full h-auto max-w-[460px]" aria-hidden>
      <defs>
        <pattern id="topo-fine" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dbeafe" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="400" height="320" fill="url(#topo-fine)" />

      {/* Contour lines */}
      {contours.map((c, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={c.rx}
          ry={c.ry}
          fill="none"
          stroke="#1d4ed8"
          strokeWidth={i === 0 ? 1.4 : 1}
          opacity={0.45 + (contours.length - i) * 0.08}
        />
      ))}
      {/* Peak label */}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#1e3a8a" fontWeight="bold">
        2,500 m
      </text>

      {/* Standing point (red) */}
      <circle cx={cx + 70} cy={cy + 30} r="6" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
      <text x={cx + 80} y={cy + 35} fontSize="10" fontFamily="monospace" fill="#7f1d1d" fontWeight="bold">
        you
      </text>

      {/* North arrow (green) — ∂f/∂x */}
      <g>
        <line x1={cx + 70} y1={cy + 30} x2={cx + 70} y2={cy - 10} stroke="#059669" strokeWidth="3" markerEnd="url(#arrowGreen)" />
        <text x={cx + 76} y={cy + 5} fontSize="11" fontFamily="serif" fontStyle="italic" fill="#065f46" fontWeight="bold">
          {isKh ? "ខាងជើង (x)" : "North (x)"}
        </text>
        <text x={cx + 76} y={cy - 4} fontSize="10" fontFamily="monospace" fill="#065f46">
          ∂f/∂x
        </text>
      </g>

      {/* East arrow (rose) — ∂f/∂y */}
      <g>
        <line x1={cx + 70} y1={cy + 30} x2={cx + 130} y2={cy + 30} stroke="#e11d48" strokeWidth="3" markerEnd="url(#arrowRose)" />
        <text x={cx + 95} y={cy + 50} fontSize="11" fontFamily="serif" fontStyle="italic" fill="#9f1239" fontWeight="bold">
          {isKh ? "ខាងកើត (y)" : "East (y)"}
        </text>
        <text x={cx + 95} y={cy + 62} fontSize="10" fontFamily="monospace" fill="#9f1239">
          ∂f/∂y
        </text>
      </g>

      {/* Compass rose */}
      <g transform="translate(50 50)">
        <circle r="26" fill="#fff" stroke="#1d4ed8" strokeWidth="1.2" opacity="0.85" />
        <text x="0" y="-15" textAnchor="middle" fontSize="10" fontFamily="serif" fontWeight="bold" fill="#1e3a8a">N</text>
        <text x="0" y="22" textAnchor="middle" fontSize="10" fontFamily="serif" fontWeight="bold" fill="#1e3a8a">S</text>
        <text x="-18" y="4" textAnchor="middle" fontSize="10" fontFamily="serif" fontWeight="bold" fill="#1e3a8a">W</text>
        <text x="18" y="4" textAnchor="middle" fontSize="10" fontFamily="serif" fontWeight="bold" fill="#1e3a8a">E</text>
        <line x1="0" y1="-10" x2="0" y2="10" stroke="#1e3a8a" strokeWidth="1" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="#1e3a8a" strokeWidth="1" />
      </g>

      {/* Arrowhead defs */}
      <defs>
        <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="#059669" />
        </marker>
        <marker id="arrowRose" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="#e11d48" />
        </marker>
      </defs>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — Linear Algebra (the Grid Transformer)
// ════════════════════════════════════════════════════════════════════════════

function LinearAlgebraSection({ isKh }: { isKh: boolean }) {
  return (
    <SectionShell
      id="linear-algebra"
      eyebrowEn="02 · The Grid Transformer"
      eyebrowKh="០២ · ម៉ាស៊ីនបំប្លែងក្រឡា"
      titleEn="Linear Algebra — vectors, matrices, and how computers see space"
      titleKh="ពីជគណិតលីនេអ៊ែរ — វ៉ិចទ័រ ម៉ាទ្រីស និងរបៀបដែលកុំព្យូទ័រមើលឃើញលំហ"
      khTerm="ពីជគណិតលីនេអ៊ែរ"
      descEn={
        "Linear algebra is the math behind every computer-rendered image, every robot arm, and every neural network. Two ideas do almost all the work: vectors, which are arrows of instructions; and matrices, which are little machines that transform an entire grid of space at once."
      }
      descKh="ពីជគណិតលីនេអ៊ែរ គឺជាគណិតវិទ្យានៅពីក្រោយរូបភាពកុំព្យូទ័រគ្រប់រូប ដៃរ៉ូបូតគ្រប់ដៃ និងបណ្តាញសរសៃប្រសាទសិប្បនិម្មិតគ្រប់បណ្តាញ។ គំនិតពីរធ្វើការងារស្ទើរទាំងអស់ ៖ វ៉ិចទ័រ ដែលជាព្រួញនៃការណែនាំ ; និង ម៉ាទ្រីស ដែលជាម៉ាស៊ីនតូចៗ ដែលបំប្លែងក្រឡាលំហទាំងមូលក្នុងពេលតែមួយ។"
      isKh={isKh}
    >
      {/* Vectors */}
      <PaperCard className="p-5 sm:p-6" data-testid="vector-card">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-5 items-center">
          <div>
            <div className={`text-[11px] font-bold uppercase tracking-widest text-blue-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "មេរៀនរង ៖ វ៉ិចទ័រ" : "Concept · Vectors"}
            </div>
            <h3 className={`font-display font-bold text-xl sm:text-2xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? "វ៉ិចទ័រ — ព្រួញនៃការណែនាំ" : "A vector is an arrow of instructions"}
              {!isKh && <span className="ml-2 font-khmer text-base font-normal text-slate-500">(វ៉ិចទ័រ)</span>}
            </h3>
            <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "វ៉ិចទ័រគឺជាព្រួញដែលមានពីរផ្នែក ៖ រ្នួងវែង (មាគ្នីត្យូដ) និងទិសច្បាស់លាស់។ ស្រមៃថាវាជាការណែនាំ ៖ « ដើរ ២ ជំហានទៅខាងស្តាំ ៣ ជំហានទៅខាងលើ »។"
                : "A vector is an arrow with two pieces of information: a length (its magnitude) and a precise direction. Read it as an instruction: \"go 2 steps right, 3 steps up.\""}
            </p>
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/60 p-3 mb-3">
              <div className="text-center">
                <BlockMath math="\vec{v} = \begin{bmatrix} 2 \\ 3 \end{bmatrix}" />
              </div>
              <div className={`text-xs text-center text-slate-700 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? "ស្តាំ 2 · ឡើង 3" : "right 2 · up 3"}
              </div>
            </div>
            <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "គ្រប់ល្បឿន រាល់កម្លាំង គ្រប់ពន្លឺ និងទិសខ្យល់ ត្រូវបានសរសេរជាវ៉ិចទ័រ។ ពួកវាគឺជាកិរិយាបទនៃរូបវិទ្យា។"
                : "Every velocity, every force, every wind direction, every ray of light is written as a vector. They are the verbs of physics."}
            </p>
          </div>
          <div className="flex justify-center">
            <VectorGridSVG isKh={isKh} />
          </div>
        </div>
      </PaperCard>

      {/* Matrices */}
      <PaperCard className="p-5 sm:p-6" data-testid="matrix-card">
        <div className={`text-[11px] font-bold uppercase tracking-widest text-blue-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "មេរៀនរង ៖ ម៉ាទ្រីស" : "Concept · Matrices"}
        </div>
        <h3 className={`font-display font-bold text-xl sm:text-2xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh ? "ម៉ាទ្រីស — ម៉ាស៊ីនដែលបំប្លែងក្រឡាទាំងមូល" : "A matrix is a machine that transforms the whole grid"}
          {!isKh && <span className="ml-2 font-khmer text-base font-normal text-slate-500">(ម៉ាទ្រីស)</span>}
        </h3>
        <p className={`text-sm text-slate-700 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ម៉ាទ្រីស ២×២ មាន ៤ លេខ ៖ a, b, c, d។ វាជាសេចក្តីណែនាំសម្រាប់ការឆ្លុះបញ្ចាំងលំហទាំងមូល ៖ យកអ័ក្ស x ដាក់ទៅទីណា ហើយអ័ក្ស y ដាក់ទៅទីណា។ វ៉ិចទ័រគ្រប់ៗគ្នានៅក្នុងក្រឡាបន្ទាប់មកនឹងធ្វើតាម។"
            : "A 2×2 matrix is just four numbers — a, b, c, d. They are the recipe for re-painting the entire space: where to send the x-axis, and where to send the y-axis. Every other vector in the grid then follows along for the ride."}
        </p>

        <div className="rounded-xl border border-blue-300 bg-blue-50/60 p-4 mb-5">
          <div className="text-center">
            <BlockMath math="A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}" />
          </div>
          <div className={`text-xs text-center text-slate-700 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? "ម៉ាទ្រីស ២×២ — ៤ លេខ" : "a 2×2 matrix — four numbers"}
          </div>
        </div>

        {/* Three transformations grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <TransformationCard
            isKh={isKh}
            color="emerald"
            Icon={Move}
            labelEn="Stretch"
            labelKh="ទាញ"
            matrixTex="\begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix}"
            descEn="x-axis is doubled, y-axis untouched. The whole grid is stretched horizontally."
            descKh="អ័ក្ស x ត្រូវគុណ ២, អ័ក្ស y មិនប៉ះ។ ក្រឡាទាំងមូលត្រូវទាញតាមផ្តេក។"
            kind="stretch"
          />
          <TransformationCard
            isKh={isKh}
            color="rose"
            Icon={Grid3x3}
            labelEn="Squash"
            labelKh="សង្កត់"
            matrixTex="\begin{bmatrix} 1 & 0 \\ 0 & 0.5 \end{bmatrix}"
            descEn="y-axis is halved. The grid is squashed flat from above."
            descKh="អ័ក្ស y ចុះមកពាក់កណ្តាល។ ក្រឡាត្រូវសង្កត់ឱ្យសំប៉ែត។"
            kind="squash"
          />
          <TransformationCard
            isKh={isKh}
            color="amber"
            Icon={Compass}
            labelEn="Rotate 90°"
            labelKh="បង្វិល ៩០°"
            matrixTex="\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}"
            descEn="x-axis points up, y-axis points left. The whole grid pivots a quarter turn."
            descKh="អ័ក្ស x ឈរឡើង, អ័ក្ស y បង្ហាញទៅឆ្វេង។ ក្រឡាទាំងមូលបង្វិលមួយជ្រុង។"
            kind="rotate"
          />
        </div>

        {/* Worked multiplication */}
        <div className="rounded-xl border border-blue-300 bg-white p-4">
          <div className={`text-[11px] font-bold uppercase tracking-widest text-blue-700 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ម៉ាទ្រីស × វ៉ិចទ័រ" : "Matrix × Vector"}
          </div>
          <div className="text-center">
            <BlockMath math="\begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} 2 \\ 3 \end{bmatrix} = \begin{bmatrix} 4 \\ 3 \end{bmatrix}" />
          </div>
          <p className={`text-sm text-slate-700 mt-2 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ម៉ាស៊ីន « ទាញ ២ ដង » ត្រូវបានអនុវត្តលើព្រួញ « ស្តាំ 2 ឡើង 3 » → ទទួលបានព្រួញថ្មី « ស្តាំ 4 ឡើង 3 »។ វ៉ិចទ័រដើមត្រូវ​បាន​ទាញតាមផ្តេក ប៉ុន្តែមិនទាញតាមឈរទេ។"
              : "The \"stretch by 2\" machine is applied to the arrow \"right 2, up 3\" → and out comes the arrow \"right 4, up 3\". The vector got pulled horizontally, but its vertical part was untouched."}
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50/60 p-4">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 text-amber-700 flex-shrink-0" />
            <p className={`text-sm text-slate-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <strong>{isKh ? "ការប្រើប្រាស់ពិត ៖ " : "In real life: "}</strong>
              {isKh
                ? "រាល់រូបភាព 3D ក្នុងហ្គេម រាល់ការបង្វិលកាមេរ៉ាក្នុងវីដេអូ រាល់ស្រទាប់នៃបណ្តាញសរសៃប្រសាទសិប្បនិម្មិត ហើយរាល់ចលនារបស់រ៉ូបូត — សុទ្ធតែជាការគុណម៉ាទ្រីសរាប់លានដង ក្នុងមួយវិនាទី។"
                : "Every 3D image in a video game, every camera rotation in a film, every layer of a neural network, and every robot arm motion — is millions of matrix multiplications happening every second."}
            </p>
          </div>
        </div>
      </PaperCard>
    </SectionShell>
  );
}

// ─── Vector arrow on a graph paper grid
function VectorGridSVG({ isKh }: { isKh: boolean }) {
  return (
    <svg viewBox="0 0 320 280" className="w-full h-auto max-w-[360px]" aria-hidden>
      <defs>
        <pattern id="vec-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#bfdbfe" strokeWidth="0.7" />
        </pattern>
        <marker id="vec-arrow" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#059669" />
        </marker>
      </defs>
      <rect x="20" y="20" width="270" height="240" fill="url(#vec-grid)" stroke="#93c5fd" strokeWidth="1" />

      {/* axes */}
      <line x1="20" y1="200" x2="290" y2="200" stroke="#1e3a8a" strokeWidth="1.4" />
      <line x1="50" y1="20" x2="50" y2="260" stroke="#1e3a8a" strokeWidth="1.4" />
      {/* axis labels */}
      <text x="285" y="216" fontSize="11" fontFamily="serif" fontStyle="italic" fill="#1e3a8a" fontWeight="bold">x</text>
      <text x="34" y="28" fontSize="11" fontFamily="serif" fontStyle="italic" fill="#1e3a8a" fontWeight="bold">y</text>

      {/* tick numbers */}
      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <text key={`x${n}`} x={50 + n * 30} y="214" fontSize="9" fontFamily="monospace" fill="#475569" textAnchor="middle">{n}</text>
      ))}
      {[1, 2, 3, 4, 5].map((n) => (
        <text key={`y${n}`} x="42" y={205 - n * 30} fontSize="9" fontFamily="monospace" fill="#475569" textAnchor="end">{n}</text>
      ))}

      {/* Vector v = (2, 3) */}
      <line x1="50" y1="200" x2={50 + 2 * 30} y2={200 - 3 * 30} stroke="#059669" strokeWidth="3.2" markerEnd="url(#vec-arrow)" />
      {/* dashed components */}
      <line x1="50" y1="200" x2={50 + 2 * 30} y2="200" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <line x1={50 + 2 * 30} y1="200" x2={50 + 2 * 30} y2={200 - 3 * 30} stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

      {/* Component labels */}
      <text x={50 + 30} y="220" fontSize="10" fontFamily="monospace" fill="#065f46" textAnchor="middle" fontWeight="bold">
        {isKh ? "ស្តាំ 2" : "+2 right"}
      </text>
      <text x={50 + 2 * 30 + 8} y={200 - 30} fontSize="10" fontFamily="monospace" fill="#065f46" fontWeight="bold">
        {isKh ? "ឡើង 3" : "+3 up"}
      </text>

      {/* Vector tip label */}
      <circle cx={50 + 2 * 30} cy={200 - 3 * 30} r="4" fill="#059669" />
      <text x={50 + 2 * 30 + 10} y={200 - 3 * 30 - 6} fontSize="11" fontFamily="serif" fontStyle="italic" fill="#065f46" fontWeight="bold">
        v = (2, 3)
      </text>
    </svg>
  );
}

// ─── Transformation card with mini before/after grid
function TransformationCard({
  isKh, color, Icon, labelEn, labelKh, matrixTex, descEn, descKh, kind,
}: {
  isKh: boolean;
  color: "emerald" | "rose" | "amber";
  Icon: React.ComponentType<{ className?: string }>;
  labelEn: string; labelKh: string;
  matrixTex: string;
  descEn: string; descKh: string;
  kind: "stretch" | "squash" | "rotate";
}) {
  const tone = {
    emerald: { bd: "border-emerald-300", bg: "bg-emerald-50/60", chip: "bg-emerald-600", txt: "text-emerald-800", stroke: "#059669" },
    rose:    { bd: "border-rose-300",    bg: "bg-rose-50/60",    chip: "bg-rose-600",    txt: "text-rose-800",    stroke: "#e11d48" },
    amber:   { bd: "border-amber-300",   bg: "bg-amber-50/60",   chip: "bg-amber-600",   txt: "text-amber-800",   stroke: "#d97706" },
  }[color];

  return (
    <div className={`rounded-xl border ${tone.bd} ${tone.bg} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md ${tone.chip} text-white`}>
          <Icon className="w-3.5 h-3.5" />
        </span>
        <h4 className={`font-bold text-base text-slate-900 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? labelKh : labelEn}
        </h4>
      </div>
      <div className="text-center">
        <BlockMath math={matrixTex} />
      </div>
      {/* before / after mini grid */}
      <div className="flex items-center justify-center gap-2 my-2">
        <MiniGrid kind="identity" stroke="#94a3b8" />
        <span className={`font-mono text-xs ${tone.txt}`}>→</span>
        <MiniGrid kind={kind} stroke={tone.stroke} />
      </div>
      <p className={`text-xs text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
    </div>
  );
}

// ─── 60×60 mini-grid showing 4 unit squares before/after a transform
function MiniGrid({ kind, stroke }: { kind: "identity" | "stretch" | "squash" | "rotate"; stroke: string }) {
  // Define the 4 corners of a 2×2 unit square block, in math coords (0..2 × 0..2)
  // We then map through the transform and finally to SVG (origin bottom-left, scale 22 px/unit, padding 6).
  const transform = (x: number, y: number): [number, number] => {
    switch (kind) {
      case "stretch": return [2 * x, y];
      case "squash":  return [x, 0.5 * y];
      case "rotate":  return [-y, x];
      default:        return [x, y];
    }
  };
  const scale = 18;
  const cx = 30; const cy = 30; // svg centre
  const toSvg = (x: number, y: number) => {
    const [tx, ty] = transform(x, y);
    return [cx + tx * scale, cy - ty * scale] as [number, number];
  };
  // Draw integer grid lines from -1..2
  const lines: React.ReactElement[] = [];
  for (let i = -1; i <= 2; i++) {
    // vertical
    const [x1, y1] = toSvg(i, -1);
    const [x2, y2] = toSvg(i, 2);
    lines.push(<line key={`v${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="0.9" opacity="0.85" />);
    // horizontal
    const [hx1, hy1] = toSvg(-1, i);
    const [hx2, hy2] = toSvg(2, i);
    lines.push(<line key={`h${i}`} x1={hx1} y1={hy1} x2={hx2} y2={hy2} stroke={stroke} strokeWidth="0.9" opacity="0.85" />);
  }
  // Fill the unit square (0,0)→(1,1)
  const corners: Array<[number, number]> = [
    toSvg(0, 0), toSvg(1, 0), toSvg(1, 1), toSvg(0, 1),
  ];
  const points = corners.map((p) => p.join(",")).join(" ");

  return (
    <svg viewBox="0 0 60 60" width="60" height="60" className="rounded-md bg-white border border-slate-200">
      {lines}
      <polygon points={points} fill={stroke} fillOpacity="0.18" stroke={stroke} strokeWidth="1.4" />
    </svg>
  );
}
