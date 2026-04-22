import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Sigma,
  Infinity as InfinityIcon,
  Target,
  Lightbulb,
  Car,
  Map as MapIcon,
  Pin,
  Gauge,
  Clock,
} from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  MTH-CALC-INTEGRALS-01 · Integrals: The Sum of the Parts
//                          អាំងតេក្រាល៖ ផលបូកនៃផ្នែកនានា
//
//  Same blueprint / drafting-paper aesthetic as Limits & Derivatives.
//  Strictly bilingual EN / Khmer.
// ════════════════════════════════════════════════════════════════════════════

const I = ({ children }: { children: React.ReactNode }) => (
  <em className="font-serif italic font-medium text-stone-900">{children}</em>
);

export function IntegralsPage() {
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
            <span className="font-mono">MTH-CALC-INTEGRALS-01</span>
          </div>
          <h1
            className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-4 leading-tight ${isKh ? "font-khmer leading-loose" : ""}`}
            data-testid="page-title"
          >
            {isKh ? (
              <>
                អាំងតេក្រាល៖{" "}
                <span className="text-blue-700">ផលបូកនៃផ្នែកនានា</span>
              </>
            ) : (
              <>
                Integrals:{" "}
                <span className="text-blue-700">The Sum of the Parts</span>
              </>
            )}
          </h1>
          <p
            className={`text-slate-700 max-w-3xl text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {isKh
              ? "ដេរីវេបានបំបែករបស់របរជាបំណែកតូចៗ ហើយសួរថា 'លឿនប៉ុណ្ណានៅពេលនេះ?'។ អាំងតេក្រាលដើរផ្លូវផ្ទុយ — វាប្រមូលផ្ដុំបំណែកតូចៗរាប់មិនអស់ ហើយបូកវាជាមួយគ្នា ដើម្បីឲ្យយើងផ្ទៃ ចម្ងាយ បរិមាណ ឬផលបូកសរុប។ មាន 'ផែនទី' ពីរប្រភេទ ៖ ផែនទី ទូទៅ (មិនកំណត់) និងផែនទី ច្បាស់លាស់ (កំណត់) — ហើយរវាងពួកវាទាំងពីរ ស្ថិតនៅអ្នកអាថ៌កំបាំង ឈ្មោះថា «+ C»។"
              : "Derivatives chop the world into tiny moments and ask 'how fast right now?'. Integrals walk the opposite direction — they collect uncountably many tiny pieces and add them up to give us area, distance, volume, or any total. There are two kinds of 'maps': a general one (indefinite) and a specific one (definite) — and a tiny mystery letter, the famous '+ C', sits between them."}
          </p>
        </header>

        {/* §1 — The Two Types of Maps */}
        <Section
          isKh={isKh}
          num={1}
          eyebrowEn="Two Maps"
          eyebrowKh="ផែនទីពីរ"
          titleEn="The Two Types of Maps"
          titleKh="ផែនទីពីរប្រភេទ"
          khTerm="ផែនទីពីរប្រភេទ"
          descEn="An integral can mean two different things depending on whether you write little numbers above and below the long S-shaped symbol. One returns a whole formula; the other returns a single, specific number. Side by side:"
          descKh="អាំងតេក្រាលអាចមានន័យពីរយ៉ាងផ្សេងគ្នា អាស្រ័យលើថា អ្នកសរសេរលេខតូចៗនៅខាងលើ និងខាងក្រោមនៃសញ្ញារាង S វែង ឬអត់ទេ។ ប្រភេទមួយផ្ដល់ឲ្យអ្នកនូវរូបមន្តទាំងមូល មួយទៀតផ្ដល់ឲ្យតែចំនួនច្បាស់លាស់មួយប៉ុណ្ណោះ។ ផ្ទៀងផ្ទាត់ៗ ៖"
        >
          <div className="grid md:grid-cols-2 gap-5" data-testid="maps-grid">
            <MapCompareCard
              isKh={isKh}
              testId="map-indefinite"
              accent="blue"
              Icon={MapIcon}
              kindEn="Indefinite"
              kindKh="មិនកំណត់"
              symbolMath={String.raw`\int f(x)\,dx`}
              returnsEn="A whole formula F(x) + C"
              returnsKh="រូបមន្តទាំងមូល F(x) + C"
              answersEn="What family of functions has f(x) as its derivative?"
              answersKh="តើគ្រួសារ​អនុគមន៍មួយណាដែលមានដេរីវេជា f(x)?"
              tagEn="General map"
              tagKh="ផែនទីទូទៅ"
            />
            <MapCompareCard
              isKh={isKh}
              testId="map-definite"
              accent="indigo"
              Icon={Pin}
              kindEn="Definite"
              kindKh="កំណត់"
              symbolMath={String.raw`\int_{a}^{b} f(x)\,dx`}
              returnsEn="A single specific number"
              returnsKh="ចំនួនច្បាស់លាស់តែមួយ"
              answersEn="What is the exact area under f(x) from a to b?"
              answersKh="តើផ្ទៃក្រោមខ្សែ f(x) ពី a ដល់ b មានចំនួនប៉ុន្មានច្បាស់?"
              tagEn="Specific number"
              tagKh="ចំនួនច្បាស់"
            />
          </div>
        </Section>

        {/* §2 — Indefinite Integrals */}
        <Section
          isKh={isKh}
          num={2}
          eyebrowEn="Indefinite Integrals"
          eyebrowKh="អាំងតេក្រាលមិនកំណត់"
          titleEn="The General Formula — the Reverse Derivative"
          titleKh="រូបមន្តទូទៅ — ដេរីវេបញ្ច្រាស"
          khTerm="អាំងតេក្រាលមិនកំណត់"
          descEn="An indefinite integral asks 'which function, when differentiated, gives me back f(x)?' The answer is a whole family of functions — every member of the family is called an antiderivative."
          descKh="អាំងតេក្រាលមិនកំណត់សួរថា 'តើអនុគមន៍មួយណា ពេលរកដេរីវេវា ប្រគល់មកវិញនូវ f(x)?' ចម្លើយគឺគ្រួសារអនុគមន៍ទាំងមូល — សមាជិកគ្រួសារនីមួយៗហៅថា អង់ទីដេរីវេ (antiderivative)។"
        >
          <PaperCard className="p-5 sm:p-7" testId="indefinite-card">
            <div className="flex items-center gap-2 mb-3">
              <InfinityIcon className="w-5 h-5 text-blue-700" />
              <h3 className={`text-lg font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "សញ្ញា និងនិយមន័យ" : "The Symbol and Definition"}
              </h3>
            </div>
            <KatexBlock
              testId="indefinite-formula"
              math={String.raw`\int f(x)\,dx \;=\; F(x) + C`}
            />
            <p className={`text-sm text-slate-700 mt-2 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? (
                <>
                  អានថា ៖ «អាំងតេក្រាលមិនកំណត់នៃ <I>f(x)</I> ធៀបនឹង <I>x</I> គឺស្មើនឹង <I>F(x)</I> បូកនឹង <I>C</I>»។
                  ត្រង់នេះ <I>F(x)</I> ជាមួយណាដែលដេរីវេវា <I>F'(x) = f(x)</I> — មានន័យថា <I>F</I> «បំបែរ» ដេរីវេ។
                </>
              ) : (
                <>
                  Read it as: "the indefinite integral of <I>f(x)</I> with respect to <I>x</I> equals{" "}
                  <I>F(x)</I> plus <I>C</I>". Here <I>F(x)</I> is any function whose derivative is{" "}
                  <I>F'(x) = f(x)</I> — meaning <I>F</I> "undoes" the derivative.
                </>
              )}
            </p>

            <div className="mt-4 grid sm:grid-cols-3 gap-2" data-testid="indefinite-parts">
              <PartTile isKh={isKh} symbol={String.raw`\int`} en="Integral sign — 'add up'" kh="សញ្ញាអាំងតេក្រាល — «បូកបញ្ចូលគ្នា»" />
              <PartTile isKh={isKh} symbol="f(x)" en="Integrand — what we're summing" kh="អាំងតេក្រង់ — អ្វីដែលយើងបូក" />
              <PartTile isKh={isKh} symbol="dx" en="Tells us the variable is x" kh="ប្រាប់ថាអថេរគឺ x" />
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-3" data-testid="indefinite-examples">
              <ExampleRow
                isKh={isKh}
                problem={String.raw`\int 2x\,dx`}
                answer={String.raw`= x^{2} + C`}
                noteEn="Because the derivative of x² is 2x."
                noteKh="ព្រោះដេរីវេនៃ x² គឺ 2x។"
              />
              <ExampleRow
                isKh={isKh}
                problem={String.raw`\int \cos(x)\,dx`}
                answer={String.raw`= \sin(x) + C`}
                noteEn="Because the derivative of sin(x) is cos(x)."
                noteKh="ព្រោះដេរីវេនៃ sin(x) គឺ cos(x)។"
              />
            </div>
          </PaperCard>

          {/* +C Mystery callout */}
          <PlusCMystery isKh={isKh} />
        </Section>

        {/* §3 — Definite Integrals */}
        <Section
          isKh={isKh}
          num={3}
          eyebrowEn="Definite Integrals"
          eyebrowKh="អាំងតេក្រាលកំណត់"
          titleEn="A Specific Number — the Area Between Two Points"
          titleKh="ចំនួនច្បាស់លាស់មួយ — ផ្ទៃរវាងចំណុចពីរ"
          khTerm="អាំងតេក្រាលកំណត់"
          descEn="Add tiny numbers above and below the integral sign and the answer changes character: instead of a formula, you get a single, exact number — the area trapped between the curve y = f(x), the x-axis, and the two vertical lines x = a and x = b."
          descKh="ដាក់លេខតូចៗនៅខាងលើ និងខាងក្រោមនៃសញ្ញាអាំងតេក្រាល ហើយចម្លើយផ្លាស់ប្ដូរលក្ខណៈ ៖ ជំនួសឲ្យរូបមន្ត អ្នកនឹងទទួលបានចំនួនច្បាស់លាស់តែមួយ — ផ្ទៃរវាងខ្សែ y = f(x) អ័ក្ស x និងបន្ទាត់បញ្ឈរ x = a និង x = b។"
        >
          <PaperCard className="p-5 sm:p-7" testId="definite-card">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-indigo-700" />
              <h3 className={`text-lg font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "សញ្ញា និងនិយមន័យ" : "The Symbol and Definition"}
              </h3>
            </div>
            <KatexBlock
              testId="definite-formula"
              math={String.raw`\int_{a}^{b} f(x)\,dx`}
            />
            <p className={`text-sm text-slate-700 mt-2 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? (
                <>
                  លេខ <I>a</I> នៅខាងក្រោមហៅថា ព្រំដែន​ក្រោម (ចំណុចចាប់ផ្ដើម) ហើយ <I>b</I> ខាងលើហៅថា ព្រំដែនលើ (ចំណុចបញ្ចប់)។
                  ចម្លើយគឺ ផ្ទៃក្រោមខ្សែកោង រវាង x = a និង x = b។
                </>
              ) : (
                <>
                  The number <I>a</I> at the bottom is the lower limit (where you start) and <I>b</I> at
                  the top is the upper limit (where you stop). The answer is the area under the curve
                  between x = a and x = b.
                </>
              )}
            </p>

            {/* Area-under-curve graphic */}
            <AreaUnderCurveGraphic isKh={isKh} />

            {/* Worked example */}
            <div className="mt-5 rounded-xl border-l-4 border-indigo-400 border border-blue-100 bg-white p-4" data-testid="definite-example">
              <h4 className={`text-sm font-bold text-slate-900 mb-2 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ឧទាហរណ៍ — ផ្ទៃក្រោម y = 2x ពី 0 ដល់ 3" : "Example — area under y = 2x from 0 to 3"}
              </h4>
              <KatexBlock math={String.raw`\int_{0}^{3} 2x\,dx \;=\; \Big[ x^{2} \Big]_{0}^{3} \;=\; 3^{2} - 0^{2} \;=\; 9`} />
              <p className={`text-xs text-slate-600 ${isKh ? "font-khmer leading-loose" : "italic"}`}>
                {isKh
                  ? "កត់សម្គាល់៖ +C បាត់ទៅ — ព្រោះវាដក​ខ្លួនវាចេញ ពេលយើងគណនា F(b) − F(a)។"
                  : "Notice: the +C disappeared — it cancels itself out when we compute F(b) − F(a)."}
              </p>
            </div>
          </PaperCard>

          {/* Car analogy */}
          <CarAnalogy isKh={isKh} />
        </Section>

        {/* Closing CTA */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/mathematics/limits-derivatives"
            className={`group rounded-2xl border border-blue-200 bg-white/90 p-5 hover:shadow-md transition-all ${isKh ? "font-khmer" : ""}`}
            data-testid="cta-back-derivatives"
          >
            <div className="flex items-center gap-2 text-blue-700 text-xs font-bold tracking-widest uppercase mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              {isKh ? "ត្រឡប់ទៅលីមីត និងដេរីវេ" : "Back to Limits & Derivatives"}
            </div>
            <p className="text-slate-800 text-sm leading-relaxed">
              {isKh
                ? "ឃើញដេរីវេជា «ការបំបែក» និងអាំងតេក្រាលជា «ការប្រមូលផ្ដុំ» — ភាគទាំងពីរនៃប្រតិបត្តិការតែមួយ។"
                : "See the derivative as 'breaking apart' and the integral as 'gathering up' — two halves of the same operation."}
            </p>
          </Link>
          <Link
            href="/mathematics"
            className={`group rounded-2xl border border-blue-200 bg-blue-700 text-white p-5 hover:bg-blue-800 transition-colors ${isKh ? "font-khmer" : ""}`}
            data-testid="cta-mathematics"
          >
            <div className="flex items-center gap-2 text-blue-100 text-xs font-bold tracking-widest uppercase mb-2">
              {isKh ? "ទៅបន្តមេរៀន" : "Continue exploring"}
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-white text-sm leading-relaxed">
              {isKh
                ? "មកមើលទំព័រគណិតវិទ្យាមេ — រកមើលលំដាប់ ស៊េរី និងផ្នែកដ៏ទៃនៃគណនាឌីផេរ៉ង់ស្យែល។"
                : "Head back to Mathematics — explore sequences, series, and the rest of calculus."}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  +C Mystery callout
// ════════════════════════════════════════════════════════════════════════════
function PlusCMystery({ isKh }: { isKh: boolean }) {
  return (
    <div
      data-testid="plus-c-mystery"
      className="relative rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-white to-yellow-50 p-5 sm:p-6 shadow-[0_2px_24px_-12px_rgba(180,83,9,0.4)]"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-amber-600" />
        <span className={`text-[10px] font-bold tracking-widest text-amber-700 ${isKh ? "font-khmer tracking-normal normal-case" : "uppercase font-mono"}`}>
          {isKh ? "ល្បិចសប្បាយ" : "Fun mystery"}
        </span>
      </div>
      <h3 className={`text-xl font-extrabold text-slate-900 mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? "អាថ៌កំបាំងនៃ « + C »" : "The '+ C' Mystery"}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className={`text-sm text-slate-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? (
              <>
                ដេរីវេ «សម្លាប់» លេខថេរ ៖ ដេរីវេនៃ <I>5</I> គឺ <I>0</I> ;
                ដេរីវេនៃ <I>−42</I> ក៏ <I>0</I> ដែរ ; ដេរីវេនៃ <I>π</I> គឺ <I>0</I> ផងដែរ។
                គ្រប់លេខថេរ ដាច់ចេញពីភ្នែករបស់ដេរីវេទាំងអស់!
              </>
            ) : (
              <>
                Derivatives <strong>kill constants</strong>: the derivative of <I>5</I> is <I>0</I>;
                the derivative of <I>−42</I> is also <I>0</I>; even the derivative of <I>π</I> is{" "}
                <I>0</I>. Every constant disappears from the derivative's eyes!
              </>
            )}
          </p>
          <div className="mt-3 rounded-lg bg-white border border-amber-200 px-3 py-2">
            <BlockMath math={String.raw`\frac{d}{dx}\big[\, x^{2} + 5\,\big] \;=\; 2x`} />
            <BlockMath math={String.raw`\frac{d}{dx}\big[\, x^{2} - 42\,\big] \;=\; 2x`} />
            <BlockMath math={String.raw`\frac{d}{dx}\big[\, x^{2} + \pi\,\big] \;=\; 2x`} />
          </div>
        </div>
        <div>
          <p className={`text-sm text-slate-800 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? (
              <>
                ដូច្នេះពេលយើងដើរ <strong>ផ្លូវផ្ទុយ</strong> (រកអាំងតេក្រាល) ហើយឃើញ <I>2x</I> យើងមិនអាចដឹងទេថា
                អនុគមន៍ដើមមាន <I>+5</I> ឬ <I>−42</I> ឬ <I>+π</I> លាក់ទុកនៅពីក្រោយ! ដូច្នេះយើងសរសេរ
                <strong> + C</strong> ដែលមានន័យថា «បូកនឹងលេខថេរអាថ៌កំបាំងណាមួយ»។
              </>
            ) : (
              <>
                So when we walk <strong>backward</strong> (taking the integral) and see <I>2x</I>, we
                cannot know whether the original function had a hidden <I>+5</I>, <I>−42</I>, or{" "}
                <I>+π</I> tucked behind it! That's why we write <strong>+ C</strong> — it means
                "plus some unknown hidden constant".
              </>
            )}
          </p>
          <div className="mt-3 rounded-lg bg-white border border-amber-200 px-3 py-2">
            <BlockMath math={String.raw`\int 2x\,dx \;=\; x^{2} + C`} />
            <p className={`text-xs text-amber-800 mt-1 ${isKh ? "font-khmer leading-loose" : "italic"}`}>
              {isKh
                ? "C ជាអក្សរពិសេស ៖ វាតំណាងឲ្យលេខថេរណាមួយក៏បាន ដែលយើងមិនទាន់ដឹង។"
                : "C is a special letter: it stands in for any constant we don't yet know."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Car analogy for definite integrals
// ════════════════════════════════════════════════════════════════════════════
function CarAnalogy({ isKh }: { isKh: boolean }) {
  return (
    <div
      data-testid="car-analogy"
      className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Car className="w-5 h-5 text-indigo-700" />
        <span className={`text-[10px] font-bold tracking-widest text-indigo-700 ${isKh ? "font-khmer tracking-normal normal-case" : "uppercase font-mono"}`}>
          {isKh ? "ឧទាហរណ៍ពិត" : "Real-world analogy"}
        </span>
      </div>
      <h3 className={`text-xl font-extrabold text-slate-900 mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? "រថយន្ត — ល្បឿន​ទៅជាចម្ងាយ" : "The Car — Speed Becomes Distance"}
      </h3>
      <p className={`text-sm text-slate-800 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "ស្រមៃថា អនុគមន៍ v(t) ប្រាប់ពីល្បឿនរថយន្តនៅពេលនីមួយៗ។ ពេលអ្នកអាំងតេក្រាល v(t) រវាងម៉ោង ១៣:០០ និងម៉ោង ១៤:០០ លទ្ធផលគឺ ចម្ងាយពិតប្រាកដ ដែលរថយន្តបានធ្វើដំណើរក្នុងម៉ោងនោះ។"
          : "Imagine a function v(t) that gives your car's speed at every moment. When you integrate v(t) between 1:00 PM and 2:00 PM, the result is the exact distance the car traveled during that hour."}
      </p>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <AnalogyTile isKh={isKh} Icon={Gauge} en="Speed v(t)" kh="ល្បឿន v(t)" subEn="km/h" subKh="គ.ម/ម៉ោង" />
        <AnalogyTile isKh={isKh} Icon={Clock} en="Time from a to b" kh="ពេលវេលា ពី a ដល់ b" subEn="hours" subKh="ម៉ោង" />
        <AnalogyTile isKh={isKh} Icon={Pin} en="Total distance" kh="ចម្ងាយសរុប" subEn="km — a number" subKh="គ.ម — ចំនួនមួយ" />
      </div>

      <div className="rounded-lg bg-white border border-indigo-200 px-3 py-3">
        <div className="flex items-baseline gap-2 flex-wrap mb-1">
          <span className={`text-sm font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ចម្ងាយ =" : "distance ="}
          </span>
          <div className="overflow-x-auto">
            <InlineMath math={String.raw`\int_{13:00}^{14:00} v(t)\,dt`} />
          </div>
        </div>
        <p className={`text-xs text-slate-700 mt-1 ${isKh ? "font-khmer leading-loose" : "italic"}`}>
          {isKh
            ? "ឧទាហរណ៍ ៖ បើ v(t) = 60 គ.ម/ម៉ោង ថេរ នោះអាំងតេក្រាល = 60 × (14 − 13) = 60 គ.ម។"
            : "Example: if v(t) = 60 km/h is constant, then the integral = 60 × (14 − 13) = 60 km."}
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable presentational pieces
// ════════════════════════════════════════════════════════════════════════════

function MapCompareCard({
  isKh,
  testId,
  accent,
  Icon,
  kindEn,
  kindKh,
  symbolMath,
  returnsEn,
  returnsKh,
  answersEn,
  answersKh,
  tagEn,
  tagKh,
}: {
  isKh: boolean;
  testId: string;
  accent: "blue" | "indigo";
  Icon: React.ComponentType<{ className?: string }>;
  kindEn: string;
  kindKh: string;
  symbolMath: string;
  returnsEn: string;
  returnsKh: string;
  answersEn: string;
  answersKh: string;
  tagEn: string;
  tagKh: string;
}) {
  const stripe = accent === "blue" ? "border-blue-400" : "border-indigo-400";
  const tagBg =
    accent === "blue"
      ? "bg-blue-100 text-blue-700 border-blue-200"
      : "bg-indigo-100 text-indigo-700 border-indigo-200";
  const iconColor = accent === "blue" ? "text-blue-700" : "text-indigo-700";
  return (
    <PaperCard
      className={`p-5 sm:p-6 border-l-4 ${stripe} hover:shadow-lg transition-shadow`}
      testId={testId}
    >
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h3 className={`text-lg font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? `អាំងតេក្រាល${kindKh}` : `${kindEn} Integral`}
        </h3>
        <span
          className={`inline-block text-[10px] font-bold tracking-widest px-2 py-1 rounded-md border ${tagBg} ${isKh ? "font-khmer tracking-normal normal-case" : "uppercase font-mono"}`}
        >
          {isKh ? tagKh : tagEn}
        </span>
      </div>
      <div className={`text-[11px] text-slate-500 mb-3 ${isKh ? "font-mono" : "font-khmer"}`}>
        {isKh ? `${kindEn} Integral` : `អាំងតេក្រាល${kindKh}`}
      </div>

      <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-3 mb-3 overflow-x-auto">
        <BlockMath math={symbolMath} />
      </div>

      <dl className="text-sm space-y-2">
        <div>
          <dt className={`text-[10px] font-bold tracking-widest text-slate-500 ${isKh ? "font-khmer tracking-normal normal-case" : "uppercase font-mono"}`}>
            {isKh ? "ឆ្លើយតបនឹង" : "Returns"}
          </dt>
          <dd className={`text-slate-800 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? returnsKh : returnsEn}
          </dd>
        </div>
        <div>
          <dt className={`text-[10px] font-bold tracking-widest text-slate-500 ${isKh ? "font-khmer tracking-normal normal-case" : "uppercase font-mono"}`}>
            {isKh ? "ដោះស្រាយ" : "Answers"}
          </dt>
          <dd className={`text-slate-800 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? answersKh : answersEn}
          </dd>
        </div>
      </dl>
    </PaperCard>
  );
}

function PartTile({
  isKh,
  symbol,
  en,
  kh,
}: {
  isKh: boolean;
  symbol: string;
  en: string;
  kh: string;
}) {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50/40 px-3 py-2 text-center">
      <div className="text-base mb-1 overflow-x-auto">
        <InlineMath math={symbol} />
      </div>
      <div className={`text-[11px] text-slate-600 ${isKh ? "font-khmer leading-loose" : "leading-snug"}`}>
        {isKh ? kh : en}
      </div>
    </div>
  );
}

function ExampleRow({
  isKh,
  problem,
  answer,
  noteEn,
  noteKh,
}: {
  isKh: boolean;
  problem: string;
  answer: string;
  noteEn: string;
  noteKh: string;
}) {
  return (
    <div className="rounded-lg border border-blue-100 bg-white px-3 py-3">
      <div className="flex items-center gap-2 overflow-x-auto">
        <InlineMath math={problem} />
        <InlineMath math={answer} />
      </div>
      <p className={`text-[11px] text-slate-600 mt-1 ${isKh ? "font-khmer leading-loose" : "italic"}`}>
        {isKh ? noteKh : noteEn}
      </p>
    </div>
  );
}

function AnalogyTile({
  isKh,
  Icon,
  en,
  kh,
  subEn,
  subKh,
}: {
  isKh: boolean;
  Icon: React.ComponentType<{ className?: string }>;
  en: string;
  kh: string;
  subEn: string;
  subKh: string;
}) {
  return (
    <div className="rounded-xl border-2 border-indigo-200 bg-white p-3 text-center">
      <Icon className="w-5 h-5 text-indigo-700 mx-auto mb-1" aria-hidden="true" />
      <div className={`text-sm font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? kh : en}
      </div>
      <div className={`text-[11px] text-slate-500 ${isKh ? "font-khmer leading-loose" : "font-mono"}`}>
        {isKh ? subKh : subEn}
      </div>
    </div>
  );
}

// ─── Area-under-curve graphic ──────────────────────────────────────────
function AreaUnderCurveGraphic({ isKh }: { isKh: boolean }) {
  return (
    <figure className="mt-4" data-testid="area-graphic">
      <svg
        viewBox="0 0 400 220"
        className="w-full h-auto rounded-lg border border-blue-100 bg-blue-50/30"
        role="img"
        aria-label={isKh ? "ផ្ទៃក្រោមខ្សែកោងរវាង a និង b" : "Area under the curve between a and b"}
      >
        <defs>
          <pattern id="iaucg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#bfdbfe" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="iaucg-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill="url(#iaucg-grid)" />
        {/* axes */}
        <line x1="40" y1="180" x2="380" y2="180" stroke="#1e3a8a" strokeWidth="1.5" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="#1e3a8a" strokeWidth="1.5" />
        {/* curve f(x) */}
        <path
          d="M 40 170 Q 130 40, 220 90 T 380 60"
          fill="none"
          stroke="#1d4ed8"
          strokeWidth="2.5"
        />
        {/* shaded area between a and b */}
        <path
          d="M 120 180 L 120 105 Q 175 60, 220 90 Q 250 110, 280 95 L 280 180 Z"
          fill="url(#iaucg-fill)"
          stroke="#6366f1"
          strokeWidth="1"
        />
        {/* a and b lines */}
        <line x1="120" y1="180" x2="120" y2="105" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="280" y1="180" x2="280" y2="95" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* labels */}
        <text x="120" y="200" textAnchor="middle" className="font-mono" fontSize="13" fill="#1e3a8a" fontStyle="italic">a</text>
        <text x="280" y="200" textAnchor="middle" className="font-mono" fontSize="13" fill="#1e3a8a" fontStyle="italic">b</text>
        <text x="385" y="195" className="font-mono" fontSize="12" fill="#1e3a8a" fontStyle="italic">x</text>
        <text x="30" y="25" className="font-mono" fontSize="12" fill="#1e3a8a" fontStyle="italic">y</text>
        <text x="345" y="55" className="font-mono" fontSize="13" fill="#1d4ed8" fontStyle="italic">f(x)</text>
        <text x="200" y="155" textAnchor="middle" fontSize="11" fill="#4338ca" fontWeight="700">
          {isKh ? "ផ្ទៃ = អាំងតេក្រាល" : "Area = Integral"}
        </text>
      </svg>
      <figcaption className={`mt-2 text-[11px] text-slate-600 text-center ${isKh ? "font-khmer leading-loose" : "italic"}`}>
        {isKh
          ? "ផ្ទៃខាងក្នុងពណ៌ស្វាយ ៗ គឺជាតម្លៃនៃអាំងតេក្រាលកំណត់ ពី a ដល់ b។"
          : "The shaded purple area equals the value of the definite integral from a to b."}
      </figcaption>
    </figure>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout primitives — drafting-paper aesthetic (mirrors LimitsDerivativesPage)
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
          <pattern id="ip-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.55" />
          </pattern>
          <pattern id="ip-grid-bold" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#ip-grid-fine)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#93c5fd" strokeWidth="0.9" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ip-grid-bold)" />
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

// ─── Khmer numeral helper ──────────────────────────────────────────────
function toKh(n: number | string): string {
  const map: Record<string, string> = {
    "0": "០", "1": "១", "2": "២", "3": "៣", "4": "៤",
    "5": "៥", "6": "៦", "7": "៧", "8": "៨", "9": "៩",
  };
  return String(n).split("").map((c) => map[c] ?? c).join("");
}

export default IntegralsPage;
