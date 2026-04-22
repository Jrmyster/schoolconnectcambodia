import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Sigma,
  Hash,
  X as XIcon,
  Divide,
  Link as LinkIcon,
  BookOpen,
  Car,
  Gauge,
  Zap,
  Activity,
  Rocket,
  Infinity as InfinityIcon,
} from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  MTH-CALC-RULES-01 · The Rules of Change: Limits & Derivatives
//                      ច្បាប់នៃការផ្លាស់ប្ដូរ ៖ លីមីត និងដេរីវេ
//
//  Drafting-paper aesthetic — blue graph-paper background, white paper cards
//  with subtle blue shadow, slate-900 ink text, italic-serif math variables,
//  blue eyebrow tags. Strictly bilingual EN / Khmer.
// ════════════════════════════════════════════════════════════════════════════

// ─── Italic serif inline math variable ──────────────────────────────────
const I = ({ children }: { children: React.ReactNode }) => (
  <em className="font-serif italic font-medium text-stone-900">{children}</em>
);

export function LimitsDerivativesPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-900 overflow-hidden">
      <GraphPaperBg />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/mathematics#calculus"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors ${isKh ? "font-khmer" : ""}`}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅគណិតវិទ្យា" : "Back to Mathematics"}
          </Link>
        </div>

        {/* Hero */}
        <header className="mb-10">
          <div
            className={`inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm ${isKh ? "font-khmer" : ""}`}
          >
            <Sigma className="w-3.5 h-3.5" />
            {isKh ? "មេរៀនធំ · គណនាឌីផេរ៉ង់ស្យែល" : "Major Lesson · Calculus"}
            <span className="opacity-50">·</span>
            <span className="font-mono">MTH-CALC-RULES-01</span>
          </div>
          <h1
            className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-4 leading-tight ${isKh ? "font-khmer leading-loose" : ""}`}
            data-testid="page-title"
          >
            {isKh ? (
              <>
                ច្បាប់នៃការផ្លាស់ប្ដូរ ៖{" "}
                <span className="text-blue-700">លីមីត និងដេរីវេ</span>
              </>
            ) : (
              <>
                The Rules of Change:{" "}
                <span className="text-blue-700">Limits &amp; Derivatives</span>
              </>
            )}
          </h1>
          <p
            className={`text-slate-700 max-w-3xl text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {isKh
              ? "បន្ទាប់ពីយើងដឹងថា ដេរីវេ វាស់ល្បឿនភ្លាមៗ មានសំណួរមួយតូចស្ងាត់ៗ ៖ តើដេរីវេ កើតពីណាមកវិញ ? ការបែងចែកនឹងសូន្យត្រូវបានហាមឃាត់ ហើយចំណុចតែមួយមិនមានជម្រាល។ ដំណោះស្រាយគឺ លីមីត — ឧបករណ៍ដែលអនុញ្ញាតឲ្យយើងសួរថា ជម្រាលក្លាយជាអ្វី ពេលដែលចំណុចពីរនៅជិតគ្នាដោយគ្មានកំណត់។ ពីអ្វីដែលហាក់ដូចជាល្បិច បានកើតមកនូវឧបករណ៍ដ៏មានឥទ្ធិពលបំផុតរបស់គណិតវិទ្យាសម័យទំនើប ៖ ច្បាប់ស្វ័យគុណ ច្បាប់ផលគុណ ច្បាប់ផលចែក និងច្បាប់បណ្ដាក់ — ហើយ L'Hôpital ដែលជាល្បឿនកាត់សម្រាប់លីមីតបាក់។"
              : "Once we know that the derivative measures instantaneous speed, a small but nagging question follows: where does the derivative actually come from? Dividing by zero is forbidden, and a single point has no slope. The answer is the limit — a tool that lets us ask what a slope becomes as two points get infinitely close to each other. Out of what looks like a trick falls some of modern mathematics' most powerful machinery: the Power, Product, Quotient, and Chain rules — and L'Hôpital's, the cheat code for broken limits."}
          </p>
        </header>

        {/* §1 — The Limit & Difference Quotient */}
        <Section
          isKh={isKh}
          num={1}
          eyebrowEn="The Limit"
          eyebrowKh="លីមីត"
          titleEn="The Limit & the Difference Quotient"
          titleKh="លីមីត និងផលធៀបនៃភាពខុសគ្នា"
          khTerm="លីមីត និងផលធៀបនៃភាពខុសគ្នា"
          descEn="The slope between two points on a curve is rise over run. But to find the slope at a single point we'd have to set the run equal to zero — and dividing by zero is illegal. The trick is the limit: instead of setting h to zero, we ask what the answer would be as h shrinks closer and closer to zero, without ever quite arriving."
          descKh="ជម្រាលរវាងចំណុចពីរលើខ្សែកោងគឺ ឡើង/រត់។ ប៉ុន្តែដើម្បីរកជម្រាលនៅចំណុចតែមួយ យើងត្រូវដាក់រត់ឲ្យស្មើសូន្យ — ហើយការចែកនឹងសូន្យត្រូវបានហាមឃាត់។ ល្បិចគឺ លីមីត ៖ ជំនួសឲ្យដាក់ h ស្មើសូន្យ យើងសួរថា ចម្លើយនឹងក្លាយជាអ្វី ពេល h តូចចូលនិងតូចចូលជិតសូន្យ ដោយមិនទាន់ដល់សោះឡើយ។"
        >
          <PaperCard className="p-5 sm:p-7" testId="diff-quotient-card">
            <DifferenceQuotientGraphic isKh={isKh} />

            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <ConceptBlock
                isKh={isKh}
                titleEn="The slope of a line"
                titleKh="ជម្រាលនៃបន្ទាត់"
                accent="blue"
              >
                <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh ? (
                    <>
                      រវាងចំណុចពីរ <I>(x, f(x))</I> និង <I>(x+h, f(x+h))</I> ការឡើងគឺ
                      <I> f(x+h) − f(x)</I> ហើយការរត់គឺ <I>h</I>។ ដូច្នេះជម្រាលរបស់ខ្សែកាត់ (secant) គឺ ៖
                    </>
                  ) : (
                    <>
                      Between two points <I>(x, f(x))</I> and <I>(x+h, f(x+h))</I>, the rise is{" "}
                      <I>f(x+h) − f(x)</I> and the run is <I>h</I>. So the slope of the secant line
                      is:
                    </>
                  )}
                </p>
                <KatexBlock math={String.raw`\text{slope} = \frac{f(x+h) - f(x)}{h}`} />
                <p className={`text-xs text-slate-500 mt-1 ${isKh ? "font-khmer leading-loose" : "italic"}`}>
                  {isKh
                    ? "នេះហៅថា ផលធៀបនៃភាពខុសគ្នា (Difference Quotient) ៖ ខុសគ្នាបញ្ឈរលើខុសគ្នាផ្ដេក។"
                    : "This is called the Difference Quotient — vertical difference over horizontal difference."}
                </p>
              </ConceptBlock>

              <ConceptBlock
                isKh={isKh}
                titleEn="Squeeze h to zero — the limit"
                titleKh="បង្រួម h ទៅសូន្យ — លីមីត"
                accent="indigo"
              >
                <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh ? (
                    <>
                      ពេល <I>h</I> តូចចូលជិតសូន្យ ខ្សែកាត់រមៀលរហូតក្លាយជា ខ្សែប៉ះ (tangent) — ដែលជាជម្រាលនៅចំណុចតែមួយ។
                      លទ្ធផលនេះគឺជា <strong>ដេរីវេ</strong> ៖
                    </>
                  ) : (
                    <>
                      As <I>h</I> shrinks toward zero, the secant pivots until it becomes the{" "}
                      <strong>tangent line</strong> — the slope at one single point. That value is
                      the <strong>derivative</strong>:
                    </>
                  )}
                </p>
                <KatexBlock
                  math={String.raw`f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}`}
                  testId="def-derivative"
                />
                <p className={`text-xs text-slate-500 mt-1 ${isKh ? "font-khmer leading-loose" : "italic"}`}>
                  {isKh
                    ? "និយមន័យដ៏សំខាន់នៃដេរីវេ — ហើយជាអ្វីដែលច្បាប់កាត់គ្រប់យ៉ាងខាងក្រោមនេះត្រូវបានសម្រាយចេញ។"
                    : "The fundamental definition of the derivative — and the seed from which every shortcut rule below is proved."}
                </p>
              </ConceptBlock>
            </div>
          </PaperCard>
        </Section>

        {/* §2 — L'Hôpital */}
        <Section
          isKh={isKh}
          num={2}
          eyebrowEn="The Cheat Code"
          eyebrowKh="ល្បឿនកាត់"
          titleEn="L'Hôpital's Rule"
          titleKh="ច្បាប់ L'Hôpital"
          khTerm="ច្បាប់ L'Hôpital"
          descEn="Sometimes a limit walks straight into a wall: the numerator and the denominator both go to zero, or both go to infinity, and the fraction means nothing. L'Hôpital's rule is the cheat code that gets you out: just take the derivative of the top and the derivative of the bottom and try the limit again."
          descKh="ពេលខ្លះលីមីតមួយជំពាក់ជញ្ជាំង ៖ ភាគយក និងភាគបែងសុទ្ធតែទៅសូន្យ ឬសុទ្ធតែទៅអនន្ត ហើយប្រភាគនោះគ្មានអត្ថន័យសោះ។ ច្បាប់ L'Hôpital គឺជាល្បឿនកាត់ ៖ គ្រាន់តែយកដេរីវេនៃខាងលើ និងដេរីវេនៃខាងក្រោម រួចព្យាយាមលីមីតម្ដងទៀត។"
        >
          <PaperCard className="p-5 sm:p-7" testId="lhopital-card">
            <div className="grid md:grid-cols-5 gap-5">
              <div className="md:col-span-2 space-y-3">
                <Tag isKh={isKh} en="Indeterminate forms" kh="រូបមិនកំណត់" />
                <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh ? (
                    <>
                      រូបទាំងនេះមិនមានចម្លើយដោយខ្លួនវាទេ ៖ ពួកវាហៅថា ប្រភាគបាក់ ឬ <em>indeterminate</em>។
                    </>
                  ) : (
                    <>
                      These shapes have no answer on their own — they're called{" "}
                      <em>indeterminate</em> forms:
                    </>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    String.raw`\frac{0}{0}`,
                    String.raw`\frac{\infty}{\infty}`,
                  ].map((m, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 font-serif text-base"
                    >
                      <InlineMath math={m} />
                    </span>
                  ))}
                </div>
                <p className={`text-xs text-slate-500 mt-2 ${isKh ? "font-khmer leading-loose" : "italic"}`}>
                  {isKh
                    ? "ប្រសិនបើកំឡុងពេលជំនួសផ្ទាល់ លីមីតរបស់អ្នកធ្លាក់ចូលរូបទាំងនេះ — បើកច្បាប់ L'Hôpital ។"
                    : "If direct substitution drops your limit into one of these, reach for L'Hôpital's rule."}
                </p>
              </div>

              <div className="md:col-span-3">
                <Tag isKh={isKh} en="The rule" kh="ច្បាប់" />
                <KatexBlock
                  math={String.raw`\lim_{x \to c} \frac{f(x)}{g(x)} \;=\; \lim_{x \to c} \frac{f'(x)}{g'(x)}`}
                  testId="lhopital-formula"
                />
                <p className={`text-[12px] text-slate-600 mt-1 italic ${isKh ? "font-khmer not-italic leading-loose" : ""}`}>
                  {isKh
                    ? "(ប្រើបានពេលផលដើមមានរូប 0/0 ឬ ∞/∞ ប៉ុណ្ណោះ — ហើយ g'(x) ≠ 0 នៅជិត c។)"
                    : "(valid only when the original limit has the form 0/0 or ∞/∞ — and g'(x) ≠ 0 near c.)"}
                </p>

                {/* Worked example */}
                <div className="mt-4 rounded-xl bg-blue-50/70 border border-blue-200 p-4">
                  <Tag isKh={isKh} en="Worked example" kh="ឧទាហរណ៍ដោះស្រាយ" tone="blue" />
                  <p className={`text-sm text-slate-700 mt-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {isKh
                      ? "ការជំនួសផ្ទាល់ផ្ដល់ឲ្យ sin(0)/0 = 0/0 — បាក់។ យកដេរីវេខាងលើ និងខាងក្រោម ៖"
                      : "Direct substitution gives sin(0)/0 = 0/0 — broken. Take derivatives top and bottom:"}
                  </p>
                  <KatexBlock
                    math={String.raw`\lim_{x \to 0} \frac{\sin x}{x} \;=\; \lim_{x \to 0} \frac{\cos x}{1} \;=\; \cos 0 \;=\; 1`}
                    testId="lhopital-example"
                  />
                </div>
              </div>
            </div>
          </PaperCard>
        </Section>

        {/* §3 — Shortcut rule cards */}
        <Section
          isKh={isKh}
          num={3}
          eyebrowEn="Shortcut Rules"
          eyebrowKh="ច្បាប់កាត់"
          titleEn="The Derivative Shortcut Rules"
          titleKh="ច្បាប់កាត់នៃដេរីវេ"
          khTerm="ច្បាប់កាត់នៃដេរីវេ"
          descEn="Almost no working mathematician computes a derivative from the limit definition every time — that would be like computing 7 × 8 by adding eight sevens. Instead we use four small algebraic rules that handle 99 % of derivatives in one or two lines."
          descKh="ស្ទើរតែគ្មានអ្នកគណិតវិទូដែលគណនាដេរីវេពីនិយមន័យលីមីតរាល់ដងទេ — វានឹងដូចជាគណនា ៧ × ៨ ដោយបូកប្រាំពីរប្រាំបីដង។ ផ្ទុយទៅវិញ យើងប្រើច្បាប់ពិជគណិតតូចៗបួនដែលដោះស្រាយ ៩៩% នៃដេរីវេក្នុងមួយ ឬពីរបន្ទាត់។"
        >
          <div className="grid sm:grid-cols-2 gap-4" data-testid="shortcut-grid">
            <RuleCard
              isKh={isKh}
              num={1}
              titleEn="Power Rule"
              titleKh="ច្បាប់ស្វ័យគុណ"
              Icon={Hash}
              formula={String.raw`\frac{d}{dx}\, x^{n} \;=\; n\, x^{n-1}`}
              explanationEn="Bring the exponent down to the front, then subtract one from it."
              explanationKh="ទាញនិទស្សន្តចុះមកខាងមុខ រួចដក ១ ចេញពីវា។"
              exampleEn={
                <>
                  e.g. <InlineMath math={String.raw`\frac{d}{dx}\, x^{5} = 5x^{4}`} />
                </>
              }
              exampleKh={
                <>
                  ឧ. <InlineMath math={String.raw`\frac{d}{dx}\, x^{5} = 5x^{4}`} />
                </>
              }
            />

            <RuleCard
              isKh={isKh}
              num={2}
              titleEn="Product Rule"
              titleKh="ច្បាប់ផលគុណ"
              Icon={XIcon}
              formula={String.raw`(fg)' \;=\; f'g + fg'`}
              explanationEn="The first times the derivative of the second, plus the second times the derivative of the first."
              explanationKh="អនុគមន៍ទីមួយគុណនឹងដេរីវេនៃទីពីរ បូកនឹងអនុគមន៍ទីពីរគុណនឹងដេរីវេនៃទីមួយ។"
              exampleEn={
                <>
                  if <InlineMath math={String.raw`f = x^{2},\; g = \sin x`} />, then{" "}
                  <InlineMath math={String.raw`(fg)' = 2x \sin x + x^{2} \cos x`} />
                </>
              }
              exampleKh={
                <>
                  បើ <InlineMath math={String.raw`f = x^{2},\; g = \sin x`} />, នោះ{" "}
                  <InlineMath math={String.raw`(fg)' = 2x \sin x + x^{2} \cos x`} />
                </>
              }
            />

            <RuleCard
              isKh={isKh}
              num={3}
              titleEn="Quotient Rule"
              titleKh="ច្បាប់ផលចែក"
              Icon={Divide}
              formula={String.raw`\left(\frac{f}{g}\right)' \;=\; \frac{f'g - fg'}{g^{2}}`}
              explanationEn={'Mnemonic: "Low d-High minus High d-Low, square the bottom and away we go."'}
              explanationKh={'ឃ្លាចាំ ៖ «ខាងក្រោម d-ខាងលើ ដក ខាងលើ d-ខាងក្រោម ស្វ័យគុណពីរនៃភាគបែង — ហើយចេញដំណើរ»។'}
              exampleEn={
                <>
                  if <InlineMath math={String.raw`f = x,\; g = x^{2}+1`} />, then{" "}
                  <InlineMath
                    math={String.raw`\left(\tfrac{f}{g}\right)' = \tfrac{(1)(x^{2}+1) - x(2x)}{(x^{2}+1)^{2}} = \tfrac{1 - x^{2}}{(x^{2}+1)^{2}}`}
                  />
                </>
              }
              exampleKh={
                <>
                  បើ <InlineMath math={String.raw`f = x,\; g = x^{2}+1`} />, នោះ{" "}
                  <InlineMath
                    math={String.raw`\left(\tfrac{f}{g}\right)' = \tfrac{(1)(x^{2}+1) - x(2x)}{(x^{2}+1)^{2}} = \tfrac{1 - x^{2}}{(x^{2}+1)^{2}}`}
                  />
                </>
              }
            />

            <RuleCard
              isKh={isKh}
              num={4}
              titleEn="Chain Rule"
              titleKh="ច្បាប់បណ្ដាក់"
              Icon={LinkIcon}
              formula={String.raw`\frac{d}{dx}\, f(g(x)) \;=\; f'(g(x))\,g'(x)`}
              explanationEn="The derivative of the outside function (with the inside left alone), multiplied by the derivative of the inside function."
              explanationKh="ដេរីវេនៃអនុគមន៍ខាងក្រៅ (ដោយទុកខាងក្នុងនៅដដែល) គុណនឹងដេរីវេនៃអនុគមន៍ខាងក្នុង។"
              exampleEn={
                <>
                  e.g. <InlineMath math={String.raw`\frac{d}{dx}\, \sin(x^{2}) = \cos(x^{2}) \cdot 2x`} />
                </>
              }
              exampleKh={
                <>
                  ឧ. <InlineMath math={String.raw`\frac{d}{dx}\, \sin(x^{2}) = \cos(x^{2}) \cdot 2x`} />
                </>
              }
            />
          </div>
        </Section>

        {/* §4 — Proofs (collapsible) */}
        <Section
          isKh={isKh}
          num={4}
          eyebrowEn="Proofs"
          eyebrowKh="ការសម្រាយបញ្ជាក់"
          titleEn="The Proofs — where the rules really come from"
          titleKh="ការសម្រាយបញ្ជាក់ — ច្បាប់ទាំងនេះកើតពីណា"
          khTerm="ការសម្រាយបញ្ជាក់"
          descEn="Every shortcut above is a theorem, not a coincidence. Each one falls straight out of the limit definition with a few lines of algebra. The proofs are hidden by default — open them only if you want to see why the machinery works."
          descKh="ច្បាប់កាត់ខាងលើនីមួយៗគឺជាទ្រឹស្ដីបទ មិនមែនជាការចៃដន្យទេ។ ច្បាប់ទាំងអស់ ធ្លាក់ចេញដោយផ្ទាល់ពីនិយមន័យលីមីត ដោយប្រើពិជគណិតពីរបីបន្ទាត់។ ការសម្រាយត្រូវបានលាក់ទុកជាមុន — បើកវាបើអ្នកចង់ឃើញហេតុអ្វីបានជាគ្រឿងបរិក្ខានេះដំណើរការ។"
        >
          <div className="space-y-3" data-testid="proofs-stack">
            <ProofAccordion
              isKh={isKh}
              titleEn="Proof of the Power Rule (for positive integer n)"
              titleKh="ការសម្រាយបញ្ជាក់ច្បាប់ស្វ័យគុណ (សម្រាប់ n ចំនួនគត់វិជ្ជមាន)"
              testId="proof-power"
            >
              <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? (
                  <>
                    ចាប់ផ្ដើមពីនិយមន័យដេរីវេជាមួយ <I>f(x) = x<sup>n</sup></I> ៖
                  </>
                ) : (
                  <>
                    Start from the derivative definition with <I>f(x) = x<sup>n</sup></I>:
                  </>
                )}
              </p>
              <KatexBlock math={String.raw`f'(x) = \lim_{h \to 0} \frac{(x+h)^{n} - x^{n}}{h}`} />
              <p className={`text-sm text-slate-700 mt-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh
                  ? "ពង្រីក (x+h)ⁿ ដោយប្រើទ្រឹស្ដីបទ Binomial ៖"
                  : "Expand (x+h)ⁿ using the Binomial Theorem:"}
              </p>
              <KatexBlock
                math={String.raw`(x+h)^{n} \;=\; x^{n} + n\,x^{n-1}h + \binom{n}{2} x^{n-2} h^{2} + \cdots + h^{n}`}
              />
              <p className={`text-sm text-slate-700 mt-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh
                  ? "ដក xⁿ ហើយចែកនឹង h ៖ តួ xⁿ បាត់ ហើយ h ដាក់ចេញពីគ្រប់តួដែលនៅសល់ ៖"
                  : "Subtract xⁿ and divide by h: the xⁿ terms cancel and one h pulls out of every remaining term:"}
              </p>
              <KatexBlock
                math={String.raw`\frac{(x+h)^{n} - x^{n}}{h} \;=\; n\,x^{n-1} + \binom{n}{2} x^{n-2} h + \cdots + h^{n-1}`}
              />
              <p className={`text-sm text-slate-700 mt-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh
                  ? "ឥឡូវឲ្យ h → 0 — រាល់តួដែលមាន h សុទ្ធតែបាត់ ៖"
                  : "Now let h → 0 — every term that still contains an h vanishes:"}
              </p>
              <KatexBlock math={String.raw`f'(x) \;=\; n\,x^{n-1} \quad\blacksquare`} />
            </ProofAccordion>

            <ProofAccordion
              isKh={isKh}
              titleEn="Proof of the Product Rule"
              titleKh="ការសម្រាយបញ្ជាក់ច្បាប់ផលគុណ"
              testId="proof-product"
            >
              <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh
                  ? "ដាក់ p(x) = f(x) · g(x) និងសរសេរនិយមន័យដេរីវេសម្រាប់ p ៖"
                  : "Let p(x) = f(x) · g(x) and write the derivative definition for p:"}
              </p>
              <KatexBlock math={String.raw`p'(x) \;=\; \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x)g(x)}{h}`} />
              <p className={`text-sm text-slate-700 mt-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? (
                  <>
                    ល្បិច ៖ បន្ថែម និងដក <I>f(x+h) g(x)</I> ក្នុងភាគយក (បន្ថែមសូន្យ — ពិតជាមិនផ្លាស់ប្ដូរអ្វីទេ) ៖
                  </>
                ) : (
                  <>
                    Trick: add and subtract <I>f(x+h) g(x)</I> in the numerator (we're adding zero — nothing
                    actually changes):
                  </>
                )}
              </p>
              <KatexBlock
                math={String.raw`= \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x+h)g(x) + f(x+h)g(x) - f(x)g(x)}{h}`}
              />
              <p className={`text-sm text-slate-700 mt-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh
                  ? "ដាក់កត្តារួម f(x+h) និង g(x) ៖"
                  : "Group terms by factoring out f(x+h) and g(x):"}
              </p>
              <KatexBlock
                math={String.raw`= \lim_{h \to 0} \left[ f(x+h)\,\frac{g(x+h) - g(x)}{h} \;+\; g(x)\,\frac{f(x+h) - f(x)}{h} \right]`}
              />
              <p className={`text-sm text-slate-700 mt-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh
                  ? "ពេល h → 0 ៖ f(x+h) → f(x) ; ប្រភាគទីមួយ → g'(x) ; ប្រភាគទីពីរ → f'(x)។ លទ្ធផលគឺ ៖"
                  : "As h → 0: f(x+h) → f(x); the first quotient → g'(x); the second quotient → f'(x). The result is:"}
              </p>
              <KatexBlock math={String.raw`p'(x) \;=\; f(x)\,g'(x) + g(x)\,f'(x) \;=\; f'g + fg' \quad\blacksquare`} />
            </ProofAccordion>
          </div>
        </Section>

        {/* §5 — Higher-Order Derivatives */}
        <HigherOrderSection isKh={isKh} />

        {/* Closing CTA */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/mathematics#calculus"
            className={`group rounded-2xl border border-blue-200 bg-white/90 p-5 hover:shadow-md transition-all ${isKh ? "font-khmer" : ""}`}
            data-testid="cta-back-calculus"
          >
            <div className="flex items-center gap-2 text-blue-700 text-xs font-bold tracking-widest uppercase mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              {isKh ? "ត្រឡប់ទៅគណនាឌីផេរ៉ង់ស្យែល" : "Back to Calculus"}
            </div>
            <p className="text-slate-800 text-sm leading-relaxed">
              {isKh
                ? "ឃើញដេរីវេជាល្បឿនភ្លាមៗ និងអាំងតេក្រាលជាផ្ទៃម្ដងទៀត ដើម្បីភ្ជាប់និយមន័យលីមីតទៅនឹងរូបភាពធំ។"
                : "Re-visit the derivative as instantaneous speed and the integral as area to anchor the limit definition into the bigger picture."}
            </p>
          </Link>
          <Link
            href="/mathematics/integrals"
            className={`group rounded-2xl border border-blue-200 bg-blue-700 text-white p-5 hover:bg-blue-800 transition-colors ${isKh ? "font-khmer" : ""}`}
            data-testid="cta-integrals"
          >
            <div className="flex items-center gap-2 text-blue-100 text-xs font-bold tracking-widest uppercase mb-2">
              {isKh ? "ទៅបន្តមេរៀន" : "Continue exploring"}
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-white text-sm leading-relaxed">
              {isKh
                ? "ឆ្លងទៅអាំងតេក្រាល — ផ្នែកម្ខាងទៀតនៃគណនាឌីផេរ៉ង់ស្យែល ដែលប្រមូលផ្ដុំបំណែកតូចៗរាប់មិនអស់ឲ្យក្លាយជាផ្ទៃ ឬចម្ងាយសរុប។"
                : "Cross over to Integrals — calculus' other half, where uncountably many tiny pieces gather into a total area or distance."}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout primitives — drafting-paper aesthetic
// ════════════════════════════════════════════════════════════════════════════

function GraphPaperBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eff6ff 60%, #e0ecfb 100%)" }}
      />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="ld-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.55" />
          </pattern>
          <pattern id="ld-grid-bold" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#ld-grid-fine)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#93c5fd" strokeWidth="0.9" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ld-grid-bold)" />
      </svg>
    </div>
  );
}

function PaperCard({
  children,
  className = "",
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  testId?: string;
}) {
  return (
    <div
      data-testid={testId}
      className={`bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-200/70 shadow-[0_2px_24px_-12px_rgba(30,64,175,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

function Section({
  isKh,
  num,
  eyebrowEn,
  eyebrowKh,
  titleEn,
  titleKh,
  khTerm,
  descEn,
  descKh,
  children,
}: {
  isKh: boolean;
  num: number;
  eyebrowEn: string;
  eyebrowKh: string;
  titleEn: string;
  titleKh: string;
  khTerm?: string;
  descEn: string;
  descKh: string;
  children: React.ReactNode;
}) {
  const numStr = isKh ? toKh(num) : String(num).padStart(2, "0");
  return (
    <section className="mb-12 scroll-mt-24" id={`s${num}`}>
      <div
        className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-700 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}
      >
        <Sparkles className="w-3 h-3" />
        <span className="font-mono">§{numStr}</span>
        <span className="opacity-50">·</span>
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}
      >
        {isKh ? titleKh : (
          <>
            {titleEn}
            {khTerm && (
              <span className="ml-2 font-khmer text-base font-normal text-slate-500">
                ({khTerm})
              </span>
            )}
          </>
        )}
      </h2>
      <p
        className={`text-slate-700 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Tag({
  isKh,
  en,
  kh,
  tone = "slate",
}: {
  isKh: boolean;
  en: string;
  kh: string;
  tone?: "slate" | "blue" | "indigo" | "rose";
}) {
  const palette = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
    rose: "bg-rose-100 text-rose-700 border-rose-200",
  }[tone];
  return (
    <span
      className={`inline-block text-[10px] font-bold tracking-widest px-2 py-1 rounded-md border ${palette} ${isKh ? "font-khmer tracking-normal normal-case" : "uppercase font-mono"}`}
    >
      {isKh ? kh : en}
    </span>
  );
}

function ConceptBlock({
  isKh,
  titleEn,
  titleKh,
  accent,
  children,
}: {
  isKh: boolean;
  titleEn: string;
  titleKh: string;
  accent: "blue" | "indigo";
  children: React.ReactNode;
}) {
  const stripe = accent === "blue" ? "border-blue-400" : "border-indigo-400";
  return (
    <div className={`bg-white rounded-xl border-l-4 ${stripe} border border-blue-100 p-4`}>
      <h3 className={`text-sm font-bold text-slate-900 mb-2 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h3>
      {children}
    </div>
  );
}

function KatexBlock({ math, testId }: { math: string; testId?: string }) {
  return (
    <div
      data-testid={testId}
      className="my-2 overflow-x-auto rounded-lg bg-slate-50 border border-slate-200 px-3 py-3 text-slate-900"
    >
      <BlockMath math={math} />
    </div>
  );
}

// ─── Rule Card ──────────────────────────────────────────────────────────
function RuleCard({
  isKh,
  num,
  titleEn,
  titleKh,
  Icon,
  formula,
  explanationEn,
  explanationKh,
  exampleEn,
  exampleKh,
}: {
  isKh: boolean;
  num: number;
  titleEn: string;
  titleKh: string;
  Icon: React.ComponentType<{ className?: string }>;
  formula: string;
  explanationEn: string;
  explanationKh: string;
  exampleEn: React.ReactNode;
  exampleKh: React.ReactNode;
}) {
  return (
    <PaperCard
      className="p-5 sm:p-6 hover:shadow-lg transition-shadow"
      testId={`rule-${num}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-700 text-white font-mono font-extrabold text-sm">
          {isKh ? toKh(num) : num}
        </span>
        <Icon className="w-5 h-5 text-blue-700" />
        <h3 className={`text-lg font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? titleKh : titleEn}
        </h3>
      </div>
      <KatexBlock math={formula} />
      <p className={`text-sm text-slate-700 mt-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? explanationKh : explanationEn}
      </p>
      <div className="mt-3 rounded-lg bg-blue-50/70 border border-blue-200 px-3 py-2">
        <div
          className={`text-[10px] font-bold tracking-widest text-blue-700 mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : "uppercase font-mono"}`}
        >
          {isKh ? "ឧទាហរណ៍" : "Example"}
        </div>
        <div className="text-sm text-slate-800 overflow-x-auto">
          {isKh ? exampleKh : exampleEn}
        </div>
      </div>
    </PaperCard>
  );
}

// ─── Difference quotient graphic ─────────────────────────────────────────
function DifferenceQuotientGraphic({ isKh }: { isKh: boolean }) {
  return (
    <div className="relative">
      <div
        className={`text-[10px] font-bold tracking-widest text-blue-700 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : "uppercase font-mono"}`}
      >
        {isKh ? "ខ្សែកាត់រមៀលចូលទៅរកខ្សែប៉ះ" : "Secant pivots toward the tangent"}
      </div>
      <svg
        viewBox="0 0 480 220"
        className="w-full h-auto"
        role="img"
        aria-label={isKh ? "ខ្សែកោងជាមួយខ្សែកាត់ និងខ្សែប៉ះនៅចំណុច x" : "A curve with a secant line and a tangent line at the point x"}
      >
        {/* Axes */}
        <line x1="40" y1="180" x2="460" y2="180" stroke="#475569" strokeWidth="1.2" />
        <line x1="40" y1="20" x2="40" y2="180" stroke="#475569" strokeWidth="1.2" />
        <text x="465" y="184" fontSize="11" fill="#475569" fontFamily="serif" fontStyle="italic">x</text>
        <text x="32" y="18" fontSize="11" fill="#475569" fontFamily="serif" fontStyle="italic" textAnchor="end">y</text>

        {/* Curve y = 0.012 (x-40)^2 + 40 */}
        <path
          d="M 40 175 Q 200 -20 460 60"
          stroke="#1d4ed8"
          strokeWidth="2.2"
          fill="none"
        />

        {/* Secant points */}
        {/* P1 at x=140 -> approx y on curve */}
        <line x1="140" y1="180" x2="140" y2="120" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="40" y1="120" x2="140" y2="120" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />
        {/* P2 at x=320 */}
        <line x1="320" y1="180" x2="320" y2="74" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="40" y1="74" x2="320" y2="74" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />

        {/* Secant line (extended) */}
        <line x1="60" y1="146" x2="420" y2="40" stroke="#7c3aed" strokeWidth="1.6" strokeDasharray="6 4" />
        {/* Tangent line at P1 */}
        <line x1="60" y1="148" x2="240" y2="78" stroke="#10b981" strokeWidth="2" />

        {/* Points */}
        <circle cx="140" cy="120" r="5" fill="#1d4ed8" stroke="#fff" strokeWidth="1.4" />
        <circle cx="320" cy="74"  r="5" fill="#1d4ed8" stroke="#fff" strokeWidth="1.4" />

        {/* Labels */}
        <text x="148" y="116" fontSize="11" fill="#1e293b" fontFamily="serif" fontStyle="italic">(x, f(x))</text>
        <text x="328" y="70" fontSize="11" fill="#1e293b" fontFamily="serif" fontStyle="italic">(x+h, f(x+h))</text>

        {/* h bracket */}
        <line x1="140" y1="195" x2="320" y2="195" stroke="#dc2626" strokeWidth="1.4" />
        <line x1="140" y1="190" x2="140" y2="200" stroke="#dc2626" strokeWidth="1.4" />
        <line x1="320" y1="190" x2="320" y2="200" stroke="#dc2626" strokeWidth="1.4" />
        <text x="230" y="212" textAnchor="middle" fontSize="12" fill="#dc2626" fontFamily="serif" fontStyle="italic" fontWeight="bold">h</text>

        {/* Rise bracket */}
        <line x1="335" y1="120" x2="335" y2="74" stroke="#dc2626" strokeWidth="1.4" />
        <line x1="330" y1="120" x2="340" y2="120" stroke="#dc2626" strokeWidth="1.4" />
        <line x1="330" y1="74"  x2="340" y2="74"  stroke="#dc2626" strokeWidth="1.4" />
        <text x="345" y="100" fontSize="11" fill="#dc2626" fontFamily="serif" fontStyle="italic" fontWeight="bold">
          f(x+h) − f(x)
        </text>

        {/* Legend */}
        <g transform="translate(50,30)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#7c3aed" strokeWidth="1.6" strokeDasharray="6 4" />
          <text x="24" y="3" fontSize="10" fill="#475569" fontFamily={isKh ? "Hanuman, serif" : "monospace"}>
            {isKh ? "ខ្សែកាត់ (h > 0)" : "secant (h > 0)"}
          </text>
          <line x1="0" y1="14" x2="20" y2="14" stroke="#10b981" strokeWidth="2" />
          <text x="24" y="17" fontSize="10" fill="#475569" fontFamily={isKh ? "Hanuman, serif" : "monospace"}>
            {isKh ? "ខ្សែប៉ះ (h → 0)" : "tangent (h → 0)"}
          </text>
        </g>
      </svg>
    </div>
  );
}

// ─── Proof accordion ────────────────────────────────────────────────────
function ProofAccordion({
  isKh,
  titleEn,
  titleKh,
  testId,
  children,
}: {
  isKh: boolean;
  titleEn: string;
  titleKh: string;
  testId?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <PaperCard className="overflow-hidden" testId={testId}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-blue-50/40 transition-colors"
        data-testid={testId ? `${testId}-toggle` : undefined}
      >
        <div className="flex items-center gap-3 min-w-0">
          <BookOpen className="w-5 h-5 text-blue-700 flex-shrink-0" />
          <span className={`text-sm sm:text-base font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? titleKh : titleEn}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`text-[10px] font-bold tracking-widest text-blue-700 px-2 py-0.5 rounded border border-blue-200 ${isKh ? "font-khmer tracking-normal normal-case" : "uppercase font-mono"}`}
          >
            {isKh ? (open ? "បិទ" : "បើក") : open ? "Hide" : "Show"}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-blue-700 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-blue-100">{children}</div>
      )}
    </PaperCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  §5 — Higher-Order Derivatives: The Ladder of Motion
//  ដេរីវេបន្តបន្ទាប់៖ ជណ្ដើរនៃចលនា
// ════════════════════════════════════════════════════════════════════════════

type CarRung = {
  order: 1 | 2 | 3;
  prime: string;          // f', f'', f'''
  termEn: string;         // Velocity
  termKh: string;         // ល្បឿន
  analogyEn: string;      // The speed of the car.
  analogyKh: string;
  Icon: React.ComponentType<{ className?: string }>;
  unitEn: string;         // m/s
  unitKh: string;         // ម៉ែត្រ/វិនាទី
  flavorEn: string;       // longer note
  flavorKh: string;
};

const CAR_LADDER: CarRung[] = [
  {
    order: 1,
    prime: "f'(x)",
    termEn: "Velocity",
    termKh: "ល្បឿន",
    analogyEn: "How fast the car is moving — the reading on your speedometer.",
    analogyKh: "ល្បឿនដែលរថយន្តកំពុងធ្វើដំណើរ — តួលេខនៅលើនាឡិកាល្បឿន។",
    Icon: Gauge,
    unitEn: "m/s",
    unitKh: "ម៉ែត្រ/វិនាទី",
    flavorEn: "The first derivative tells you the slope of position — your moment-to-moment speed.",
    flavorKh: "ដេរីវេទីមួយប្រាប់ពីជម្រាលនៃទីតាំង — ល្បឿនរបស់អ្នកនៅគ្រប់ពេលវេលា។",
  },
  {
    order: 2,
    prime: "f''(x)",
    termEn: "Acceleration",
    termKh: "ការបង្កើនល្បឿន",
    analogyEn: "How hard you are pressing the gas pedal — the rate at which speed itself changes.",
    analogyKh: "កម្រិតដែលអ្នកសង្កត់លើគ្រឿងប្រេង — អត្រាដែលល្បឿនកំពុងផ្លាស់ប្ដូរ។",
    Icon: Zap,
    unitEn: "m/s²",
    unitKh: "ម៉ែត្រ/វិនាទី²",
    flavorEn: "Press harder → bigger acceleration → you sink into the seat.",
    flavorKh: "សង្កត់ខ្លាំង → ការបង្កើនល្បឿនធំ → អ្នកត្រូវរុញចូលទៅខ្នង។",
  },
  {
    order: 3,
    prime: "f'''(x)",
    termEn: "Jerk",
    termKh: "ការកន្ត្រាក់",
    analogyEn: "How fast you are pushing the gas pedal itself. High jerk = a shaky, unpleasant ride.",
    analogyKh: "ល្បឿនដែលអ្នកសង្កត់គ្រឿងប្រេង។ ការកន្ត្រាក់ខ្ពស់ = ការធ្វើដំណើរញ័រ មិនស្រួល។",
    Icon: Activity,
    unitEn: "m/s³",
    unitKh: "ម៉ែត្រ/វិនាទី³",
    flavorEn: "Engineers minimize jerk so elevators, trains, and roller coasters feel smooth.",
    flavorKh: "វិស្វករកាត់បន្ថយការកន្ត្រាក់ ដើម្បីឲ្យជណ្ដើរយន្ត រថភ្លើង និងរថយន្តកម្សាន្ត មានអារម្មណ៍រលូន។",
  },
];

type FunRung = {
  order: number;
  nameEn: string;
  nameKh: string;
};

const FUN_LADDER: FunRung[] = [
  { order: 4, nameEn: "Snap",    nameKh: "ស្នាប" },
  { order: 5, nameEn: "Crackle", nameKh: "ក្រេកគ្ល៍" },
  { order: 6, nameEn: "Pop",     nameKh: "ផប" },
  { order: 7, nameEn: "Lock",    nameKh: "ឡុក" },
  { order: 8, nameEn: "Drop",    nameKh: "ដ្រប" },
];

function HigherOrderSection({ isKh }: { isKh: boolean }) {
  return (
    <Section
      isKh={isKh}
      num={5}
      eyebrowEn="Higher-Order Derivatives"
      eyebrowKh="ដេរីវេបន្តបន្ទាប់"
      titleEn="The Ladder of Motion"
      titleKh="ជណ្ដើរនៃចលនា"
      descEn="If the first derivative is the speed of a car, what does the second derivative mean? The third? You can keep differentiating a function over and over — and each new derivative tells you about the rate of change of the one below it. Climb the ladder."
      descKh="បើដេរីវេទីមួយជាល្បឿនរថយន្ត តើដេរីវេទីពីរមានន័យដូចម្តេច? ទីបី? អ្នកអាចបន្តរកដេរីវេម្ដងហើយម្ដងទៀត — ហើយដេរីវេថ្មីនីមួយៗប្រាប់ពីអត្រាការផ្លាស់ប្ដូរនៃដេរីវេខាងក្រោម។ ឡើងជណ្ដើរ។"
    >
      {/* The car analogy ladder */}
      <PaperCard className="p-5 sm:p-6 mb-6" testId="ladder-card">
        <div className="flex items-center gap-2 mb-4">
          <Car className="w-5 h-5 text-blue-700" />
          <h3 className={`text-base sm:text-lg font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ជណ្ដើរនៃចលនា — រថយន្តរបស់អ្នក" : "The Ladder of Motion — Your Car"}
          </h3>
        </div>
        <ol className="space-y-3" data-testid="ladder-rungs">
          {CAR_LADDER.map((rung) => (
            <CarRungRow key={rung.order} rung={rung} isKh={isKh} />
          ))}
        </ol>
      </PaperCard>

      {/* The infinite series — fun names */}
      <PaperCard className="p-5 sm:p-6 mb-6" testId="fun-names-card">
        <div className="flex items-start sm:items-center gap-2 mb-3 flex-wrap">
          <Rocket className="w-5 h-5 text-indigo-700 flex-shrink-0" />
          <h3 className={`text-base sm:text-lg font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ការបន្ត 'ឥតកំណត់' — ដេរីវេខ្ពស់ជាងនេះ" : "The 'Infinite' Series — Higher Orders (n ≥ 4)"}
          </h3>
        </div>
        <p className={`text-sm text-slate-700 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "យើងមិនត្រូវការដេរីវេទាំងនេះសម្រាប់បើករថយន្តទេ — ប៉ុន្តែវិស្វករប្រើវាដើម្បីរចនារថយន្តកម្សាន្តដ៏រលូន ផ្លូវដែករថភ្លើងលឿន និងផ្លូវហោះហើររបស់យានអវកាស។ ដើម្បីភាពសប្បាយ អ្នករូបវិទ្យាបានដាក់ឈ្មោះកំប្លែងឲ្យពួកវាដូចខាងក្រោម៖"
            : "We don't need these derivatives to drive a car — but engineers use them to design smooth roller coasters, high-speed train tracks, and spacecraft trajectories. For fun, physicists gave them these playful names:"}
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3" data-testid="fun-names-list">
          {FUN_LADDER.map((rung) => (
            <li
              key={rung.order}
              data-testid={`fun-rung-${rung.order}`}
              className="rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-white to-indigo-50/60 p-3 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="text-[10px] font-mono font-bold tracking-widest text-indigo-700 mb-1">
                {isKh ? `លំដាប់ ${toKh(rung.order)}` : `${rung.order}TH`}
              </div>
              <div className="text-slate-900 font-extrabold text-base sm:text-lg leading-tight">
                {rung.nameEn}
              </div>
              {isKh && (
                <div className="text-[11px] text-slate-600 font-khmer mt-0.5">
                  {rung.nameKh}
                </div>
              )}
            </li>
          ))}
        </ul>
      </PaperCard>

      {/* Notation card */}
      <PaperCard className="p-5 sm:p-6" testId="notation-card">
        <div className="flex items-center gap-2 mb-3">
          <InfinityIcon className="w-5 h-5 text-blue-700" />
          <h3 className={`text-base sm:text-lg font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "សញ្ញាសរសេរ — ដេរីវេទី n" : "Notation — The nth Derivative"}
          </h3>
        </div>
        <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? (
            <>
              ពេល <I>n</I> កាន់តែធំ យើងឈប់ប្រើសញ្ញាបន្ទាត់តូច (
              <I>'''</I>) ហើយចាប់ផ្ដើមដាក់លេខក្នុងវង់ក្រចក ដើម្បីកុំឲ្យ "ផែនទី"
              មើលច្របូកច្របល់៖
            </>
          ) : (
            <>
              As <I>n</I> grows, we stop using prime tick-marks (
              <I>'''</I>) and start using a number in parentheses so the
              "map" doesn't get messy:
            </>
          )}
        </p>
        <KatexBlock
          testId="notation-formula"
          math={String.raw`f^{(n)}(x) \;=\; \frac{d^{n}y}{dx^{n}}`}
        />
        <table
          className="mt-4 w-full border-separate border-spacing-y-2"
          data-testid="notation-table"
        >
          <caption className="sr-only">
            {isKh
              ? "តារាងសញ្ញាសរសេរសម្រាប់ដេរីវេទី ១ ដល់ទី ៤ — សញ្ញាបន្ទាត់តូច និងសញ្ញា Leibniz"
              : "Notation table for the 1st through 4th derivative — prime and Leibniz forms"}
          </caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">{isKh ? "លំដាប់" : "Order"}</th>
              <th scope="col">{isKh ? "សញ្ញាបន្ទាត់តូច" : "Prime form"}</th>
              <th scope="col">{isKh ? "សញ្ញា Leibniz" : "Leibniz form"}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { n: 1, prime: "f'(x)",    leibniz: String.raw`\frac{dy}{dx}` },
              { n: 2, prime: "f''(x)",   leibniz: String.raw`\frac{d^{2}y}{dx^{2}}` },
              { n: 3, prime: "f'''(x)",  leibniz: String.raw`\frac{d^{3}y}{dx^{3}}` },
              { n: 4, prime: "f^{(4)}(x)", leibniz: String.raw`\frac{d^{4}y}{dx^{4}}` },
            ].map((row) => (
              <tr
                key={row.n}
                data-testid={`notation-row-${row.n}`}
                className="bg-blue-50/40"
              >
                <th
                  scope="row"
                  className="rounded-l-lg border-y border-l border-blue-100 px-3 py-2 align-middle w-12"
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-700 text-white font-mono font-bold text-xs">
                    {isKh ? toKh(row.n) : row.n}
                  </span>
                </th>
                <td className="border-y border-blue-100 px-2 py-2 align-middle">
                  <div className="overflow-x-auto">
                    <InlineMath math={row.prime} />
                  </div>
                </td>
                <td className="rounded-r-lg border-y border-r border-blue-100 px-3 py-2 align-middle">
                  <div className="flex items-center gap-3 overflow-x-auto">
                    <span aria-hidden="true" className="text-slate-400">=</span>
                    <InlineMath math={row.leibniz} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={`mt-4 text-xs text-slate-600 italic ${isKh ? "font-khmer not-italic leading-loose" : ""}`}>
          {isKh
            ? "កត់សម្គាល់៖ f⁽⁴⁾(x) មិនមែនជា f ទៅគុណនឹង 4 ទេ — វង់ក្រចកមានន័យថា «ដេរីវេទី ៤»។"
            : "Note: f⁽⁴⁾(x) is NOT f raised to the power 4 — the parentheses mean \"the 4th derivative\"."}
        </p>
      </PaperCard>
    </Section>
  );
}

function CarRungRow({ rung, isKh }: { rung: CarRung; isKh: boolean }) {
  const Icon = rung.Icon;
  // Stepped indent so the ladder visually climbs.
  const indent = ["", "sm:ml-6", "sm:ml-12"][rung.order - 1];
  return (
    <li
      data-testid={`rung-${rung.order}`}
      className={`relative rounded-xl border-2 border-blue-300 bg-white shadow-[0_2px_12px_-6px_rgba(30,64,175,0.4)] p-4 sm:p-5 transition-all hover:shadow-lg hover:border-blue-400 ${indent}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Order badge */}
        <div className="flex flex-col items-center flex-shrink-0">
          <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-700 text-white font-mono font-extrabold text-sm shadow-md">
            {isKh ? toKh(rung.order) : rung.order}
          </span>
          <span className="mt-1 text-[9px] font-bold tracking-widest text-blue-700 font-mono">
            {rung.order === 1 ? "1ST" : rung.order === 2 ? "2ND" : "3RD"}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Icon className="w-4 h-4 text-blue-700 flex-shrink-0" />
            <h4
              className={`text-base sm:text-lg font-extrabold text-slate-900 ${isKh ? "font-khmer" : ""}`}
              data-testid={`rung-title-${rung.order}`}
            >
              {isKh ? rung.termKh : rung.termEn}
            </h4>
            <span className="opacity-50 text-slate-400">·</span>
            <span className="text-sm">
              <InlineMath math={rung.prime} />
            </span>
            <Tag isKh={isKh} en={rung.unitEn} kh={rung.unitKh} tone="blue" />
          </div>

          {/* Always show BOTH languages of the term (strict bilingual) */}
          <div
            className={`text-[11px] text-slate-500 mb-2 ${isKh ? "font-mono" : "font-khmer"}`}
          >
            {isKh ? `${rung.termEn} · ${rung.unitEn}` : `${rung.termKh} · ${rung.unitKh}`}
          </div>

          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? rung.analogyKh : rung.analogyEn}
          </p>
          <p className={`mt-2 text-xs text-slate-600 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? rung.flavorKh : rung.flavorEn}
          </p>
        </div>
      </div>
    </li>
  );
}

// ─── Khmer numeral helper ──────────────────────────────────────────────
const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKh(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}

