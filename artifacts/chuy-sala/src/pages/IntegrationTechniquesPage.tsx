import React, { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Sparkles,
  HelpCircle,
  BookOpen,
  Info,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sigma,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import "katex/dist/katex.min.css";

export default function IntegrationTechniquesPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Stepper state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetStepper = () => {
    setCurrentStep(1);
  };

  // Define steps translations and LaTeX equations
  // We use glowing colors inside LaTeX: Yellow (#facc15) for u, Blue (#60a5fa) for du
  const stepsData = [
    {
      titleEn: "Step 1: Identify the inner function",
      titleKh: "ជំហានទី ១៖ កំណត់អនុគមន៍ខាងក្នុង",
      latex: String.raw`\int 2x \cos\left(\color{#facc15}{x^2}\right) dx`,
      subMath: String.raw`\color{#facc15}{u = x^2}`,
      descEn: "Look for an 'inner' function whose derivative is also present in the integrand. Here, the inner function is $x^2$, and its derivative $2x$ is present. Let's define: $u = x^2$.",
      descKh: "ស្វែងរកអនុគមន៍ 'ខាងក្នុង' ដែលមានដេរីវេរបស់វាស្ថិតនៅក្នុងអាំងតេក្រង់ដែរ។ នៅទីនេះ អនុគមន៍ខាងក្នុងគឺ $x^2$ ហើយដេរីវេរបស់វាគឺ $2x$ ក៏មានវត្តមានដែរ។ យើងកំណត់៖ $u = x^2$។",
    },
    {
      titleEn: "Step 2: Find the derivative, du",
      titleKh: "ជំហានទី ២៖ រកដេរីវេ du",
      latex: String.raw`\int \cos\left(\color{#facc15}{x^2}\right) \cdot \left(\color{#60a5fa}{2x\,dx}\right)`,
      subMath: String.raw`\frac{d\color{#facc15}{u}}{dx} = 2x \implies \color{#60a5fa}{du = 2x\,dx}`,
      descEn: "Differentiate $u$ with respect to $x$ to find $du$. The derivative of $x^2$ is $2x$, so $\\frac{du}{dx} = 2x$. Rearranging, we get: $du = 2x\\,dx$. We can see both variables perfectly color-coded.",
      descKh: "គណនាដេរីវេ $u$ ធៀបនឹង $x$ ដើម្បីរក $du$។ ដេរីវេនៃ $x^2$ គឺ $2x$ នាំឱ្យ $\\frac{du}{dx} = 2x$។ តាមរយៈការតម្រៀបឡើងវិញ យើងបាន៖ $du = 2x\\,dx$។ យើងអាចឃើញអថេរទាំងពីរត្រូវគ្នាតាមពណ៌។",
    },
    {
      titleEn: "Step 3: Substitute u and du into the integral",
      titleKh: "ជំហានទី ៣៖ ជំនួស u និង du ទៅក្នុងអាំងតេក្រាល",
      latex: String.raw`\int \cos\left(\color{#facc15}{u}\right) \color{#60a5fa}{du}`,
      subMath: String.raw`\text{Substituted: } \color{#facc15}{x^2} \to \color{#facc15}{u} \quad \text{and} \quad \color{#60a5fa}{2x\,dx} \to \color{#60a5fa}{du}`,
      descEn: "Substitute $\\color{#facc15}{u}$ for $\\color{#facc15}{x^2}$ and $\\color{#60a5fa}{du}$ for $\\color{#60a5fa}{2x\\,dx}$. The complex $x$-integral simplifies into a basic $u$-integral that is easy to solve.",
      descKh: "ជំនួស $\\color{#facc15}{u}$ សម្រាប់ $\\color{#facc15}{x^2}$ និង $\\color{#60a5fa}{du}$ សម្រាប់ $\\color{#60a5fa}{2x\\,dx}$។ អាំងតេក្រាលស្មុគស្មាញធៀបនឹង $x$ ត្រូវបានសម្រួលទៅជាអាំងតេក្រាលងាយស្រួលធៀបនឹង $u$។",
    },
    {
      titleEn: "Step 4: Integrate with respect to u",
      titleKh: "ជំហានទី ៤៖ គណនាអាំងតេក្រាលធៀបនឹង u",
      latex: String.raw`\sin\left(\color{#facc15}{u}\right) + C`,
      subMath: String.raw`\int \cos(u)\,du = \sin(u) + C`,
      descEn: "Integrate using standard anti-derivative rules. The anti-derivative of $\\cos(u)$ is $\\sin(u)$. Do not forget to add the constant of integration, $\\mathbf{+ C}$!",
      descKh: "គណនាអាំងតេក្រាលដោយប្រើច្បាប់ព្រីមីទីវគ្រឹះ។ ព្រីមីទីវនៃ $\\cos(u)$ គឺ $\\sin(u)$។ កុំភ្លេចបន្ថែមចំនួនថេរអាំងតេក្រាល $\\mathbf{+ C}$ ឱ្យសោះ!",
    },
    {
      titleEn: "Step 5: Substitute the original x expression back",
      titleKh: "ជំហានទី ៥៖ ជំនួសកន្សោមដើម x ត្រឡប់មកវិញ",
      latex: String.raw`\sin\left(\color{#facc15}{x^2}\right) + C`,
      subMath: String.raw`\text{Final Answer: } \sin(\color{#facc15}{x^2}) + C`,
      descEn: "Replace $u$ with the original function $x^2$ to write the final answer in terms of $x$. You have successfully integrated using U-substitution!",
      descKh: "ជំនួស $u$ ដោយអនុគមន៍ដើម $x^2$ ត្រឡប់មកវិញ ដើម្បីសរសេរចម្លើយចុងក្រោយជាអថេរ $x$។ អ្នកបានគណនាអាំងតេក្រាលដោយជោគជ័យតាមវិធីជំនួស u!",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background radial matrix glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20 font-sans">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/mathematics"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>
              {t("Back to Math Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគណិតវិទ្យា")}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Sigma className="w-5 h-5 text-indigo-400 animate-pulse" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-500 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Integration Techniques", "វិធីសាស្ត្រអាំងតេក្រាល")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block font-mono">
            <span>MATH-CALC-USUB</span>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-grow w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-8">
        
        {/* Section 1: The 'Anti-Derivative' Foundation Panel */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase block mb-1">
              {t("FOUNDATION CONCEPT", "គោលគំនិតគ្រឹះ")}
            </span>
            <h2
              className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
              style={{ fontSize: "max(1.3rem, 2.5vw)" }}
            >
              {t("The Anti-Derivative Foundation", "គ្រឹះនៃព្រីមីទីវ (អាំងទីដេរីវេ)")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Concept explanation */}
            <div className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className={`text-indigo-300 font-bold text-[max(1.1rem,1.8vw)] mb-3 ${isKh ? "font-khmer" : ""}`}>
                  {t("Integration is the Reverse of Differentiation", "អាំងតេក្រាលគឺជាច្រាសនៃដេរីវេ")}
                </h3>
                <p className={`text-slate-400 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Differentiation breaks a function down to find its rate of change at any point. Integration runs the process backward, summing up tiny, continuous rates of change to recover the original function (the anti-derivative). If the derivative of F(x) is f(x), then integrating f(x) yields F(x) + C.",
                    "ដេរីវេបំបែកអនុគមន៍មួយដើម្បីស្វែងរកអត្រាបម្រែបម្រួលរបស់វាត្រង់ចំណុចនីមួយៗ។ រីឯអាំងតេក្រាលដំណើរការបញ្ច្រាសមកវិញ ដោយបូកបញ្ចូលអត្រាបម្រែបម្រួលតូចៗជាបន្តបន្ទាប់ ដើម្បីស្វែងរកអនុគមន៍ដើម (ព្រីមីទីវ)។ បើដេរីវេនៃ F(x) គឺ f(x) នោះអាំងតេក្រាលនៃ f(x) គឺ F(x) + C។"
                  )}
                </p>
              </div>
              <div className="mt-4 p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                <BlockMath math={String.raw`\frac{d}{dx}[F(x)] = f(x) \iff \int f(x)\,dx = F(x) + C`} />
              </div>
            </div>

            {/* Basic power rule card */}
            <div className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className={`text-indigo-300 font-bold text-[max(1.1rem,1.8vw)] mb-3 ${isKh ? "font-khmer" : ""}`}>
                  {t("The Power Rule for Integrals", "វិធានស្វ័យគុណសម្រាប់អាំងតេក្រាល")}
                </h3>
                <p className={`text-slate-400 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Just as the Power Rule in differentiation decreases the exponent, the Power Rule in integration increases the exponent by 1 and divides the term by the new exponent. This holds for any power n except -1.",
                    "ដូចគ្នានឹងវិធានស្វ័យគុណក្នុងដេរីវេដែលបន្ថយស្វ័យគុណដែរ វិធានស្វ័យគុណក្នុងអាំងតេក្រាលបង្កើនស្វ័យគុណឡើង ១ និងចែកនឹងតម្លៃស្វ័យគុណថ្មីនោះ។ វិធាននេះប្រើបានចំពោះគ្រប់ស្វ័យគុណ n លើកលែងតែ -1។"
                  )}
                </p>
              </div>
              <div className="mt-4 p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                <BlockMath math={String.raw`\int x^n \,dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1)`} />
              </div>
            </div>
          </div>

          {/* "+ C" High-contrast Warning Alert Banner */}
          <div className="bg-gradient-to-r from-amber-950/30 to-yellow-950/20 border-2 border-amber-600/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <div className="bg-amber-600/20 p-3 rounded-xl border border-amber-500/40 text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h4 className={`text-amber-300 font-black text-[max(1.1rem,1.8vw)] mb-1 ${isKh ? "font-khmer" : ""}`}>
                {t("NEVER FORGET THE + C!", "កុំភ្លេចគណនាបូកនឹង + C ឱ្យសោះ!")}
              </h4>
              <p className={`text-slate-300 text-xs sm:text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Constants are destroyed during differentiation because the derivative of any constant (like 5, -42, or π) is zero. When we integrate backward, we cannot know what constant was originally there. Thus, we write '+ C' to represent the family of all possible original functions!",
                  "ចំនួនថេរត្រូវបានលុបចោលនៅពេលគណនាដេរីវេ ពីព្រោះដេរីវេនៃចំនួនថេរណាមួយ (ដូចជា 5, -42, ឬ π) គឺស្មើនឹងសូន្យ។ នៅពេលយើងធ្វើអាំងតេក្រាលបញ្ច្រាសមកវិញ យើងមិនអាចដឹងថាតើចំនួនថេរដើមជាលេខអ្វីនោះទេ។ ហេតុនេះ យើងត្រូវសរសេរ '+ C' ដើម្បីតំណាងឱ្យគ្រប់អនុគមន៍ដើមដែលអាចមានទាំងអស់!"
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive U-Substitution Stepper */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase block mb-1">
              {t("INTERACTIVE VISUALIZER", "កម្មវិធីបង្ហាញអន្តរកម្ម")}
            </span>
            <h2
              className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
              style={{ fontSize: "max(1.3rem, 2.5vw)" }}
            >
              {t("Interactive U-Substitution Stepper", "វិធីសាស្ត្រជំនួស u មួយជំហានម្តងៗ")}
            </h2>
            <p className={`text-slate-400 text-xs mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Learn the technique of u-substitution step-by-step using a classic composite function integral.",
                "សិក្សាពីវិធីសាស្ត្រជំនួស u មួយជំហានម្តងៗ តាមរយៈឧទាហរណ៍អាំងតេក្រាលនៃអនុគមន៍បណ្ដាក់។"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visualizer Blackboard (Col Span 7) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-850 rounded-2xl p-6 flex flex-col justify-center items-center min-h-[350px] relative overflow-hidden">
              {/* Grid overlay background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3vw_3vw] opacity-25" />
              
              {/* Variable Legend */}
              <div className="absolute top-4 left-4 flex gap-4 text-xs font-mono z-10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 drop-shadow-[0_0_3px_#facc15]" />
                  <span className="text-yellow-400 font-bold">u</span>
                  <span className="text-slate-500">({t("Inner Function", "អនុគមន៍ខាងក្នុង")})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 drop-shadow-[0_0_3px_#60a5fa]" />
                  <span className="text-blue-400 font-bold">du</span>
                  <span className="text-slate-500">({t("Derivative", "ដេរីវេ")})</span>
                </div>
              </div>

              {/* Step indicator label */}
              <div className="absolute top-4 right-4 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs font-mono text-slate-400">
                {t("Step", "ជំហាន")} {currentStep} / {totalSteps}
              </div>

              {/* Main math rendering area */}
              <div className="my-8 text-center w-full z-10 select-none animate-in fade-in duration-300">
                <span className="block text-slate-500 text-xs font-mono uppercase mb-3">
                  {t("CURRENT STATE", "ស្ថានភាពបច្ចុប្បន្ន")}
                </span>
                
                {/* Large responsive KaTeX equation */}
                <div className="py-6 px-4 bg-slate-900/40 rounded-2xl border border-slate-900 overflow-x-auto text-[max(1.3rem,2.8vw)] leading-relaxed select-text text-white">
                  <BlockMath math={stepsData[currentStep - 1].latex} />
                </div>

                {/* Sub math details (like u = x^2 or du = 2xdx) */}
                <div className="mt-6 py-3 px-4 bg-indigo-950/20 border border-indigo-900/30 rounded-xl max-w-sm mx-auto text-[max(1rem,1.8vw)] text-indigo-200">
                  <BlockMath math={stepsData[currentStep - 1].subMath} />
                </div>
              </div>

              {/* Glowing decorative rings */}
              <div className="absolute -bottom-16 -right-16 w-36 h-36 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
              <div className="absolute -top-16 -left-16 w-36 h-36 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
            </div>

            {/* Stepper Explanation & Controls (Col Span 5) */}
            <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-600/10 border border-indigo-500/30 p-2 rounded-lg text-indigo-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className={`text-white font-bold text-[max(1.1rem,1.8vw)] ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? stepsData[currentStep - 1].titleKh : stepsData[currentStep - 1].titleEn}
                  </h3>
                </div>

                <div className="h-px bg-slate-800" />

                {/* Step narrative description */}
                <p className={`text-slate-300 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh ? stepsData[currentStep - 1].descKh : stepsData[currentStep - 1].descEn}
                </p>

                {/* Help tip */}
                <div className="mt-2 bg-slate-950/40 border border-slate-850 p-4 rounded-xl flex items-start gap-2.5">
                  <Info className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <p className={`text-slate-400 text-xs ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {currentStep === 1 && t("The goal is to simplify a composite function. Substituting $u$ will turn a product of functions into a single standard form.", "គោលដៅគឺសម្រួលអនុគមន៍បណ្ដាក់។ ការជំនួស $u$ នឹងបំប្លែងផលគុណនៃអនុគមន៍ទៅជារូបរាងស្ដង់ដារតែមួយ។")}
                    {currentStep === 2 && t("Don't forget the differential $dx$! It represents the width of the rectangles we are summing, and it transitions to $du$.", "កុំភ្លេចឌីផេរ៉ង់ស្យែល $dx$! វាជាទទឹងនៃចតុកោណកែងដែលយើងបូកបញ្ចូលគ្នា ហើយវានឹងបំប្លែងទៅជា $du$។")}
                    {currentStep === 3 && t("Notice that both $x^2$ and $2x\\,dx$ are completely replaced by $u$ and $du$. The equation no longer has any $x$ terms.", "សម្គាល់ថាទាំង $x^2$ និង $2x\\,dx$ ត្រូវបានជំនួសទាំងស្រុងដោយ $u$ និង $du$។ សមីការលែងមានអថេរ $x$ ទៀតហើយ។")}
                    {currentStep === 4 && t("We solve this just like a basic anti-derivative rule. The variable of integration is $u$.", "យើងគណនាវាដូចជាព្រីមីទីវគ្រឹះធម្មតាដែរ។ អថេរអាំងតេក្រាលគឺ $u$។")}
                    {currentStep === 5 && t("Always substitute the original function back! The question was asked in terms of $x$, so the answer must be in terms of $x$.", "ត្រូវតែជំនួសអនុគមន៍ដើមត្រឡប់មកវិញជានិច្ច! ព្រោះសំណួរចោទឡើងជាអថេរ $x$ ដូច្នេះចម្លើយក៏ត្រូវតែជាអថេរ $x$ ដែរ។")}
                  </p>
                </div>
              </div>

              {/* Stepper Controls */}
              <div className="mt-8 flex flex-col gap-4">
                {/* Progress bar */}
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:text-slate-600 disabled:border-slate-900 disabled:hover:border-slate-900 rounded-xl transition-all text-xs font-bold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t("Previous", "ថយក្រោយ")}
                  </button>

                  {currentStep === totalSteps ? (
                    <button
                      onClick={resetStepper}
                      className="flex items-center gap-1.5 px-4 py-2 bg-indigo-900/30 border border-indigo-700/50 hover:bg-indigo-900/50 text-indigo-200 rounded-xl transition-all text-xs font-bold"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {t("Reset", "សារដើម")}
                    </button>
                  ) : (
                    <button
                      onClick={handleNextStep}
                      className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all text-xs font-bold shadow-md shadow-indigo-900/30"
                    >
                      {t("Next Step", "ជំហានបន្ទាប់")}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Integration Strategy Flowchart */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold text-indigo-400 font-mono tracking-widest uppercase block mb-1">
              {t("DECISION STRATEGY GUIDE", "មគ្គុទ្ទេសក៍យុទ្ធសាស្ត្រដោះស្រាយ")}
            </span>
            <h2
              className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
              style={{ fontSize: "max(1.3rem, 2.5vw)" }}
            >
              {t("How to Choose Your Integration Method", "របៀបជ្រើសរើសវិធីសាស្ត្រគណនាអាំងតេក្រាល")}
            </h2>
            <p className={`text-slate-400 text-xs mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Follow this step-by-step checklist to determine the most effective technique for solving an unknown integral.",
                "អនុវត្តតាមបញ្ជីត្រួតពិនិត្យជំហានៗខាងក្រោម ដើម្បីកំណត់វិធីសាស្ត្រដែលមានប្រសិទ្ធភាពបំផុតសម្រាប់ដោះស្រាយអាំងតេក្រាលមិនស្គាល់។"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Strategy Card 1: Basic Rules */}
            <div className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-800 p-2 rounded-lg text-slate-300 font-mono text-xs font-bold w-7 h-7 flex items-center justify-center">
                    1
                  </div>
                  <h3 className={`text-slate-200 font-bold text-sm sm:text-base ${isKh ? "font-khmer" : ""}`}>
                    {t("Basic Rules", "វិធានគ្រឹះដំបូង")}
                  </h3>
                </div>
                <h4 className={`text-indigo-400 text-xs font-bold ${isKh ? "font-khmer" : ""}`}>
                  {t("Is simplification possible?", "តើអាចសម្រួលកន្សោមបានទេ?")}
                </h4>
                <p className={`text-slate-400 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Before attempting advanced methods, check if you can simplify the integrand using algebra, trigonometry, or separating terms. Can it be solved directly using the Power Rule or standard trig anti-derivatives?",
                    "មុននឹងសាកល្បងវិធីសាស្ត្រកម្រិតខ្ពស់ ត្រូវពិនិត្យមើលថាតើអាចសម្រួលកន្សោមអាំងតេក្រង់ដោយប្រើពិជគណិត ត្រីកោណមាត្រ ឬការបំបែកតួបានដែរឬទេ។ តើវាអាចដោះស្រាយបានដោយផ្ទាល់ដោយប្រើវិធានស្វ័យគុណ ឬដេរីវេបញ្ច្រាសត្រីកោណមាត្រធម្មតាដែរឬទេ?"
                  )}
                </p>
              </div>
              <div className="mt-4 p-2 bg-slate-900/50 rounded-xl border border-slate-800 text-[10px] text-slate-400 font-mono text-center">
                {t("Example:", "ឧទាហរណ៍៖")} <InlineMath math={String.raw`\int \frac{x^2 + 1}{x}\,dx = \int (x + x^{-1})\,dx`} />
              </div>
            </div>

            {/* Strategy Card 2: U-Substitution */}
            <div className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-950/40 border border-yellow-800/30 p-2 rounded-lg text-yellow-400 font-mono text-xs font-bold w-7 h-7 flex items-center justify-center">
                    2
                  </div>
                  <h3 className={`text-slate-200 font-bold text-sm sm:text-base ${isKh ? "font-khmer" : ""}`}>
                    {t("U-Substitution", "វិធីជំនួស u")}
                  </h3>
                </div>
                <h4 className={`text-yellow-400 text-xs font-bold ${isKh ? "font-khmer" : ""}`}>
                  {t("Is a derivative pattern present?", "តើមានទម្រង់ដេរីវេដែរឬទេ?")}
                </h4>
                <p className={`text-slate-400 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "Look for a composite function where the derivative of the 'inner' function $g(x)$ is multiplied by the rest of the integrand. If you see a function and its derivative (scaled by a constant), define $u = g(x)$ and substitute.",
                    "ស្វែងរកអនុគមន៍បណ្ដាក់ ដែលមានដេរីវេនៃអនុគមន៍ 'ខាងក្នុង' $g(x)$ គុណនឹងផ្នែកដែលសល់នៃកន្សោមអាំងតេក្រង់។ ប្រសិនបើអ្នកឃើញអនុគមន៍មួយ និងដេរីវេរបស់វា (គុណនឹងចំនួនថេរ) ត្រូវកំណត់ $u = g(x)$ រួចជំនួសវា។"
                  )}
                </p>
              </div>
              <div className="mt-4 p-2 bg-slate-900/50 rounded-xl border border-slate-800 text-[10px] text-slate-400 font-mono text-center">
                {t("Example:", "ឧទាហរណ៍៖")} <InlineMath math={String.raw`\int e^{\sin x}\cos x\,dx \quad (u = \sin x)`} />
              </div>
            </div>

            {/* Strategy Card 3: Integration by Parts */}
            <div className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-950/40 border border-blue-800/30 p-2 rounded-lg text-blue-400 font-mono text-xs font-bold w-7 h-7 flex items-center justify-center">
                    3
                  </div>
                  <h3 className={`text-slate-200 font-bold text-sm sm:text-base ${isKh ? "font-khmer" : ""}`}>
                    {t("Integration by Parts", "អាំងតេក្រាលដោយផ្នែក")}
                  </h3>
                </div>
                <h4 className={`text-blue-400 text-xs font-bold ${isKh ? "font-khmer" : ""}`}>
                  {t("Is it a product of unrelated terms?", "តើវាជាផលគុណនៃតួខុសគ្នា?")}
                </h4>
                <p className={`text-slate-400 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "If the integrand is a product of two unrelated functions (e.g. algebraic and logarithmic, or polynomial and exponential) and U-sub fails, use the product rule in reverse. Separate the terms into $u$ and $dv$ using the LIATE rule.",
                    "ប្រសិនបើកន្សោមអាំងតេក្រង់ជាផលគុណនៃអនុគមន៍ពីរផ្សេងគ្នា (ដូចជា ពិជគណិត និងលោការីត ឬពហុធា និងអិចស្ប៉ូណង់ស្យែល) ហើយវិធីជំនួស u មិនអាចដោះស្រាយបាន ត្រូវប្រើវិធានផលគុណបញ្ច្រាស។ បំបែកតួជា $u$ និង $dv$ ដោយប្រើវិធាន LIATE។"
                  )}
                </p>
              </div>
              <div className="mt-4 p-2 bg-slate-900/50 rounded-xl border border-slate-800 text-[10px] text-slate-400 font-mono text-center">
                <InlineMath math={String.raw`\int u\,dv = uv - \int v\,du`} />
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
