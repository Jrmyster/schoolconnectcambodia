import { Link } from "wouter";
import {
  ArrowLeft,
  Hexagon,
  Zap,
  Apple,
  Cookie,
  Brain,
  Activity,
  Battery,
  Flame,
  Sparkles,
  Wheat,
  Layers,
} from "lucide-react";
import { InlineMath } from "react-katex";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Sweet Science: Sugars and Cellular Energy
 * វិទ្យាសាស្ត្រនៃជាតិស្ករ៖ ជាតិស្ករ និងថាមពលកោសិកា
 * Module: Chemistry → Biochemistry
 * Aesthetic: vibrant biological — hexagonal carbon rings, bright green/orange.
 * Self-contained, no new dependencies.
 * ══════════════════════════════════════════════════════════════════════════ */

export function SweetSciencePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-orange-50 text-slate-900 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden"
      data-testid="sweet-science-page"
    >
      {/* Hexagonal cell-tile backdrop */}
      <HexBackdrop />
      {/* Energy glow ambience */}
      <div
        aria-hidden
        className="absolute -top-32 -left-24 w-[36rem] h-[36rem] rounded-full bg-emerald-300/25 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-24 w-[36rem] h-[36rem] rounded-full bg-orange-300/30 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto">
        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          href="/science/chemistry/biochemistry"
          data-testid="link-back-to-biochemistry"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Biochemistry", "ត្រឡប់ទៅជីវគីមីវិទ្យា")}
        </Link>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <header className="mb-10 sm:mb-12" data-testid="hero">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              {/* Big hexagon icon */}
              <Hexagon
                className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-600 fill-emerald-100"
                strokeWidth={2}
              />
              <span className="absolute inset-0 flex items-center justify-center text-emerald-700 font-extrabold text-lg sm:text-xl">
                C₆
              </span>
              <span
                aria-hidden
                className="absolute inset-0 rounded-full ring-2 ring-orange-300/60 animate-pulse"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold tracking-[0.25em] uppercase text-emerald-700 mb-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Module 09 · Biochemistry</span>
                <span className="opacity-50" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal text-xs">
                  មុខវិជ្ជា ០៩ · ជីវគីមីវិទ្យា
                </span>
              </span>
              <h1
                id="sweet-science-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
                data-testid="page-title"
              >
                <span className="bg-gradient-to-r from-emerald-600 via-lime-600 to-orange-500 bg-clip-text text-transparent">
                  Sweet Science:
                </span>{" "}
                <span className="text-slate-900">Sugars and Cellular Energy</span>
              </h1>
              <p
                className="font-khmer text-lg sm:text-xl md:text-2xl text-slate-700 leading-snug mt-2"
                data-testid="page-title-kh"
              >
                <span className="bg-gradient-to-r from-emerald-600 via-lime-600 to-orange-500 bg-clip-text text-transparent">
                  វិទ្យាសាស្ត្រនៃជាតិស្ករ៖
                </span>{" "}
                <span>ជាតិស្ករ និងថាមពលកោសិកា</span>
              </p>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Every spoon of sugar, every grain of rice, every bowl of fruit feeds the same tiny molecular battery inside your cells: ATP. Follow a glucose ring from your tongue to your mitochondria — and meet the chemistry that lets your brain think and your muscles move.",
              "ចំណីស្ករមួយស្លាប, ស្រូវមួយគ្រាប់, បន្លែផ្លែឈើមួយចាន — ទាំងអស់ចិញ្ចឹមថ្មតូចម៉ូលេគុលដូចគ្នានៅក្នុងកោសិការបស់អ្នក៖ ATP។ តាមដានរង្វង់គ្លុយកូសមួយ ពីអណ្ដាតរបស់អ្នកទៅដល់មីតូកុនឌ្រី — ហើយស្គាល់គីមីដែលអនុញ្ញាតឱ្យខួរក្បាលគិត និងសាច់ដុំធ្វើចលនា។",
            )}
          </p>
        </header>

        {/* ── Section 1: The Carbohydrate Chain ───────────────────── */}
        <Section
          number={1}
          icon={Layers}
          tone="emerald"
          titleEn="The Carbohydrate Chain"
          titleKh="ខ្សែច្រវាក់កាបូអ៊ីដ្រាត"
          subtitleEn="Mono · Di · Poly — count the rings"
          subtitleKh="ម៉ូណូ · ឌី · ប៉ូលី — រាប់រង្វង់"
          dataTestid="section-carb-chain"
        >
          {/* Visual prefix breakdown */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            <CarbCard
              countLabel="1"
              prefixEn='"Mono" = one'
              prefixKh="«ម៉ូណូ» = មួយ"
              titleEn="Monosaccharides"
              titleKh="ម៉ូណូសាការីត"
              bodyEn="Single sugar molecules — the simplest building blocks. Your body absorbs them directly through the wall of the small intestine and into your blood."
              bodyKh="ម៉ូលេគុលជាតិស្ករតែមួយ — ប្លុកសំណង់សាមញ្ញបំផុត។ រាងកាយរបស់អ្នកស្រូបពួកវាដោយផ្ទាល់តាមជញ្ជាំងពោះវៀនតូច ហើយចូលទៅក្នុងឈាម។"
              examplesEn="Glucose · Fructose"
              examplesKh="គ្លុយកូស · ហ្វ្រុចតូស"
              hexCount={1}
              tone="emerald"
              testid="carb-mono"
            />
            <CarbCard
              countLabel="2"
              prefixEn='"Di" = two'
              prefixKh="«ឌី» = ពីរ"
              titleEn="Disaccharides"
              titleKh="ឌីសាការីត"
              bodyEn="Two single sugars chemically linked together. Your saliva and gut enzymes snip the bond and split them back into monosaccharides before absorption."
              bodyKh="ជាតិស្ករមួយពីរភ្ជាប់គ្នាដោយចំណងគីមី។ ទឹកមាត់ និងអង់ស៊ីមពោះវៀននឹងកាត់ចំណងនោះ ហើយបំបែកពួកវាត្រឡប់ជាម៉ូណូសាការីតវិញមុនពេលស្រូប។"
              examplesEn="Sucrose = Glucose + Fructose"
              examplesKh="ស៊ុចក្រូស = គ្លុយកូស + ហ្វ្រុចតូស"
              hexCount={2}
              tone="lime"
              testid="carb-di"
            />
            <CarbCard
              countLabel="100s+"
              prefixEn='"Poly" = many'
              prefixKh="«ប៉ូលី» = ច្រើន"
              titleEn="Polysaccharides"
              titleKh="ប៉ូលីសាការីត"
              bodyEn="Giant chains of hundreds or thousands of sugars — the body's storage form. Plants store energy as starch in potatoes and rice; animals store it as glycogen in muscle and liver."
              bodyKh="ខ្សែច្រវាក់យក្សនៃជាតិស្កររាប់រយ ឬរាប់ពាន់ — ទម្រង់ផ្ទុករបស់រាងកាយ។ រុក្ខជាតិផ្ទុកថាមពលជាម្សៅនៅក្នុងដំឡូង និងបាយ; សត្វផ្ទុកវាជាគ្លីកូហ្សែននៅក្នុងសាច់ដុំ និងថ្លើម។"
              examplesEn="Starch · Glycogen · Cellulose"
              examplesKh="ម្សៅ · គ្លីកូហ្សែន · សែលុយឡូស"
              hexCount={6}
              tone="orange"
              testid="carb-poly"
            />
          </div>
        </Section>

        {/* ── Section 2: The Big Three Sugars ─────────────────────── */}
        <Section
          number={2}
          icon={Hexagon}
          tone="lime"
          titleEn="The Big Three Sugars"
          titleKh="ជាតិស្ករសំខាន់ៗទាំងបី"
          subtitleEn="Meet the molecules behind every sweet thing you eat"
          subtitleKh="ស្គាល់ម៉ូលេគុលនៅពីក្រោយរបស់ផ្អែមៗទាំងអស់ដែលអ្នកបរិភោគ"
          dataTestid="section-big-three"
        >
          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            <SugarCard
              icon={Brain}
              tone="emerald"
              nameEn="Glucose"
              nameKh="គ្លុយកូស"
              formula="C_{6}H_{12}O_{6}"
              kindEn="Monosaccharide"
              kindKh="ម៉ូណូសាការីត"
              tagEn="The brain's only fuel"
              tagKh="ឥន្ធនៈតែមួយរបស់ខួរក្បាល"
              bodyEn="The most important sugar on Earth. The primary fuel for almost every cell in every animal — and the only fuel the brain normally accepts. Your bloodstream holds about 4 grams of free glucose at all times, tightly controlled by insulin."
              bodyKh="ជាតិស្ករសំខាន់បំផុតនៅលើផែនដី។ ឥន្ធនៈចម្បងសម្រាប់ស្ទើរតែគ្រប់កោសិកានៅក្នុងសត្វគ្រប់ប្រភេទ — ហើយជាឥន្ធនៈតែមួយដែលខួរក្បាលធម្មតាទទួលយក។ ឈាមរបស់អ្នកមានគ្លុយកូសសេរីប្រហែល ៤ ក្រាមគ្រប់ពេល គ្រប់គ្រងយ៉ាងតឹងរ៉ឹងដោយអាំងស៊ុយលីន។"
              hexCount={1}
              testid="sugar-glucose"
            />
            <SugarCard
              icon={Apple}
              tone="orange"
              nameEn="Fructose"
              nameKh="ហ្វ្រុចតូស"
              formula="C_{6}H_{12}O_{6}"
              kindEn="Monosaccharide"
              kindKh="ម៉ូណូសាការីត"
              tagEn="The fruit sugar — sweeter"
              tagKh="ស្ករផ្លែឈើ — ផ្អែមជាង"
              bodyEn="Same atoms as glucose, arranged differently — and tastes nearly twice as sweet. Found naturally in fruits, honey, and root vegetables. The liver does most of the work to process it."
              bodyKh="អាតូមដូចគ្លុយកូស ប៉ុន្តែរៀបចំខុសគ្នា — ហើយមានរសជាតិផ្អែមជិតពីរដង។ មាននៅធម្មជាតិក្នុងផ្លែឈើ ទឹកឃ្មុំ និងបន្លែឫស។ ថ្លើមធ្វើការដំណើរការវាភាគច្រើន។"
              hexCount={1}
              testid="sugar-fructose"
            />
            <SugarCard
              icon={Cookie}
              tone="amber"
              nameEn="Sucrose"
              nameKh="ស៊ុចក្រូស"
              formula="C_{12}H_{22}O_{11}"
              kindEn="Disaccharide"
              kindKh="ឌីសាការីត"
              tagEn="Standard table sugar"
              tagKh="ស្ករសរបស់តុ"
              bodyEn="The familiar white crystals in your sugar bowl. Made by plants like sugarcane (អំពៅ) and sugar beet by joining one glucose to one fructose. Your gut splits it apart again before absorption."
              bodyKh="គ្រីស្តាល់សស្គាល់ៗនៅក្នុងចានស្ករអ្នក។ បង្កើតដោយរុក្ខជាតិដូចជាអំពៅ និងស៊ុចរ៉ៃបឺត ដោយភ្ជាប់គ្លុយកូសមួយជាមួយហ្វ្រុចតូសមួយ។ ពោះវៀនរបស់អ្នកនឹងបំបែកវាម្ដងទៀតមុនពេលស្រូប។"
              hexCount={2}
              testid="sugar-sucrose"
            />
          </div>
        </Section>

        {/* ── Section 3: The ATP Factory ──────────────────────────── */}
        <Section
          number={3}
          icon={Battery}
          tone="orange"
          titleEn="The ATP Factory"
          titleKh="ម៉ាស៊ីនផលិត ATP"
          subtitleEn="Why glucose is not the energy — it's the fuel for the engine"
          subtitleKh="ហេតុអ្វីបានជាគ្លុយកូសមិនមែនជាថាមពល — វាគឺជាឥន្ធនៈសម្រាប់ម៉ាស៊ីន"
          dataTestid="section-atp"
        >
          {/* The flow diagram */}
          <div
            className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-white via-orange-50/60 to-emerald-50/60 p-5 sm:p-7 shadow-sm relative overflow-hidden mb-5"
            data-testid="atp-flow"
          >
            <div
              aria-hidden
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-orange-300/30 blur-2xl"
            />
            <div className="relative grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3 sm:gap-2">
              <FlowNode
                icon={Hexagon}
                tone="emerald"
                labelEn="Glucose"
                labelKh="គ្លុយកូស"
                subEn="The fuel"
                subKh="ឥន្ធនៈ"
              />
              <FlowArrow />
              <FlowNode
                icon={Flame}
                tone="orange"
                labelEn="Mitochondrion"
                labelKh="មីតូកុនឌ្រី"
                subEn="The cellular engine"
                subKh="ម៉ាស៊ីនកោសិកា"
                pulse
              />
              <FlowArrow />
              <FlowNode
                icon={Zap}
                tone="lime"
                labelEn="ATP"
                labelKh="អាដេណូស៊ីន ទ្រីផូស្វាត"
                subEn="The battery"
                subKh="ថ្ម"
              />
            </div>
          </div>

          {/* Explanation paragraphs */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-5">
            <ExplainCard
              icon={Flame}
              tone="orange"
              titleEn="Cells don't burn sugar directly"
              titleKh="កោសិកាមិនដុតជាតិស្ករដោយផ្ទាល់ទេ"
              bodyEn="When you eat a banana, your cells don't just set the glucose on fire. Inside the mitochondria — tiny engines living in nearly every cell — glucose is taken apart one bond at a time, and the energy released is captured in a different molecule."
              bodyKh="ពេលអ្នកញ៉ាំចេក កោសិការបស់អ្នកមិនបានដុតគ្លុយកូសភ្លាមៗទេ។ នៅក្នុងមីតូកុនឌ្រី — ម៉ាស៊ីនតូចៗដែលរស់នៅស្ទើរតែគ្រប់កោសិកា — គ្លុយកូសត្រូវបានបំបែកម្ដងមួយចំណង ហើយថាមពលដែលបញ្ចេញត្រូវចាប់យកក្នុងម៉ូលេគុលផ្សេងមួយ។"
              testid="explain-mitochondria"
            />
            <ExplainCard
              icon={Battery}
              tone="lime"
              titleEn="That molecule is ATP"
              titleKh="ម៉ូលេគុលនោះគឺ ATP"
              bodyEn={
                "ATP — Adenosine Triphosphate (អាដេណូស៊ីន ទ្រីផូស្វាត) — is the actual battery your cells spend. One glucose molecule yields up to ~30 ATP. Whenever a muscle pulls, a lung breathes, or a neuron fires, an ATP loses one phosphate, releases its energy, and is recharged again."
              }
              bodyKh="ATP — អាដេណូស៊ីន ទ្រីផូស្វាត (Adenosine Triphosphate) — គឺជាថ្មពិតប្រាកដដែលកោសិការបស់អ្នកចំណាយ។ គ្លុយកូសមួយម៉ូលេគុលផ្ដល់ ATP រហូតដល់ ~៣០។ រាល់ពេលដែលសាច់ដុំទាញ សួតដកដង្ហើម ឬអ្នកប្រសាទបាញ់សញ្ញា ATP បាត់ផូស្វាតមួយ បញ្ចេញថាមពលរបស់វា ហើយត្រូវសាកថ្មម្ដងទៀត។"
              testid="explain-atp"
            />
          </div>

          {/* What ATP powers */}
          <div
            className="relative rounded-3xl overflow-hidden border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-6 sm:p-8 shadow-lg"
            data-testid="atp-powers-box"
          >
            <div
              aria-hidden
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-orange-300/40 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-emerald-300/40 blur-3xl"
            />
            <div className="relative">
              <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 px-3 py-1 rounded-full bg-orange-600 text-white text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                <Zap className="w-3.5 h-3.5" />
                <span>ATP is the battery of life</span>
                <span className="opacity-70" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal">ATP គឺជាថ្មនៃជីវិត</span>
              </div>

              <p className="text-sm sm:text-base text-slate-800 leading-relaxed mb-5">
                <BL
                  en="ATP is the actual currency of cellular energy. Glucose is just the deposit; ATP is the cash you spend. Every heartbeat, every blink, every thought is paid for in ATP."
                  kh="ATP គឺជារូបិយប័ណ្ណពិតប្រាកដនៃថាមពលកោសិកា។ គ្លុយកូសគឺគ្រាន់តែជាប្រាក់ដាក់; ATP គឺជាសាច់ប្រាក់ដែលអ្នកចំណាយ។ រាល់ការដើរឈាម រាល់ការព្រិចភ្នែក រាល់ការគិតគឺត្រូវបង់ដោយ ATP។"
                />
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <PowerChip
                  icon={Activity}
                  labelEn="Muscles move"
                  labelKh="សាច់ដុំធ្វើចលនា"
                />
                <PowerChip
                  icon={Wheat}
                  labelEn="Lungs breathe"
                  labelKh="សួតដកដង្ហើម"
                />
                <PowerChip
                  icon={Brain}
                  labelEn="Brains think"
                  labelKh="ខួរក្បាលគិត"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ── Footer note ─────────────────────────────────────────── */}
        <p
          className={`mt-12 text-center text-xs sm:text-sm text-slate-500 italic ${
            kh ? "font-khmer not-italic leading-loose" : ""
          }`}
        >
          {t(
            "Your body recycles its own weight in ATP every single day — about 50 kg of it — by spinning the same few grams of ATP molecules billions of times.",
            "រាងកាយរបស់អ្នកកែច្នៃ ATP ស្មើនឹងទម្ងន់ខ្លួនរៀងរាល់ថ្ងៃ — ប្រហែល ៥០ គ.ក្រ — ដោយបង្វិលម៉ូលេគុល ATP ប៉ុន្មានក្រាមដដែលរាប់ពាន់លានដង។",
          )}
        </p>
      </div>
    </div>
  );
}

/* ── Helpers ───────────────────────────────────────────────────────────── */

function BL({ en, kh }: { en: string; kh: string }) {
  return (
    <span>
      <span>{en}</span>{" "}
      <span className="font-khmer text-slate-600/90">({kh})</span>
    </span>
  );
}

function HexBackdrop() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.18]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="hex-pattern"
          x="0"
          y="0"
          width="56"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M14 0 L42 0 L56 24 L42 48 L14 48 L0 24 Z"
            fill="none"
            stroke="rgb(16,185,129)"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-pattern)" />
    </svg>
  );
}

type Tone = "emerald" | "lime" | "orange" | "amber";

const TONE: Record<
  Tone,
  {
    bg: string;
    text: string;
    border: string;
    soft: string;
    fill: string;
    ring: string;
  }
> = {
  emerald: {
    bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    text: "text-emerald-700",
    border: "border-emerald-300",
    soft: "bg-emerald-50",
    fill: "fill-emerald-200 text-emerald-600",
    ring: "ring-emerald-200",
  },
  lime: {
    bg: "bg-gradient-to-br from-lime-500 to-emerald-600",
    text: "text-lime-700",
    border: "border-lime-300",
    soft: "bg-lime-50",
    fill: "fill-lime-200 text-lime-600",
    ring: "ring-lime-200",
  },
  orange: {
    bg: "bg-gradient-to-br from-orange-500 to-red-500",
    text: "text-orange-700",
    border: "border-orange-300",
    soft: "bg-orange-50",
    fill: "fill-orange-200 text-orange-600",
    ring: "ring-orange-200",
  },
  amber: {
    bg: "bg-gradient-to-br from-amber-500 to-orange-500",
    text: "text-amber-700",
    border: "border-amber-300",
    soft: "bg-amber-50",
    fill: "fill-amber-200 text-amber-600",
    ring: "ring-amber-200",
  },
};

function Section({
  number,
  icon: Icon,
  tone,
  titleEn,
  titleKh,
  subtitleEn,
  subtitleKh,
  children,
  dataTestid,
}: {
  number: number;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  children: React.ReactNode;
  dataTestid: string;
}) {
  const T = TONE[tone];
  return (
    <section className="mb-10 sm:mb-12 scroll-mt-24" data-testid={dataTestid}>
      <header className="mb-5 sm:mb-6">
        <div className="flex items-start gap-3">
          <div
            className={`w-12 h-12 rounded-2xl ${T.bg} text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ${T.ring}`}
          >
            <Icon className="w-6 h-6" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className={`inline-block text-[10px] font-bold tracking-[0.25em] uppercase ${T.text} mb-0.5`}
            >
              Section {number} · ផ្នែកទី {number}
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
              {titleEn}
            </h2>
            <p className="font-khmer text-base sm:text-lg text-slate-700 leading-snug">
              {titleKh}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 inline-flex flex-wrap gap-x-2 gap-y-0.5">
              <span className="italic">{subtitleEn}</span>
              <span className="opacity-50" aria-hidden>·</span>
              <span className="font-khmer">{subtitleKh}</span>
            </p>
          </div>
        </div>
      </header>
      {children}
    </section>
  );
}

/* ── Hex cluster used in carb cards (mono/di/poly visual) ─────────────── */

function HexCluster({ count, tone }: { count: number; tone: Tone }) {
  const T = TONE[tone];
  // Up to 6-hex honeycomb arrangement
  const positions = [
    { left: 50, top: 50 }, // 1: center
    { left: 24, top: 50 }, // 2: left
    { left: 76, top: 50 }, // 3: right
    { left: 37, top: 18 }, // 4: top-left
    { left: 63, top: 18 }, // 5: top-right
    { left: 37, top: 82 }, // 6: bottom-left
    { left: 63, top: 82 }, // 7: bottom-right
  ];
  const n = Math.min(count, 7);
  return (
    <div
      aria-hidden
      className={`relative h-24 mb-3 rounded-xl ${T.soft} border ${T.border} overflow-hidden`}
    >
      {/* connecting bond lines (only for di/poly) */}
      {n >= 2 && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {Array.from({ length: n - 1 }).map((_, i) => (
            <line
              key={i}
              x1={positions[i].left}
              y1={positions[i].top}
              x2={positions[i + 1].left}
              y2={positions[i + 1].top}
              stroke="currentColor"
              strokeWidth="0.8"
              className={T.text}
              strokeDasharray="2 2"
            />
          ))}
        </svg>
      )}
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${positions[i].left}%`, top: `${positions[i].top}%` }}
        >
          <Hexagon className={`w-7 h-7 ${T.fill}`} strokeWidth={2} />
        </div>
      ))}
      {count > 7 && (
        <span
          className={`absolute right-2 bottom-1 text-[10px] font-bold ${T.text}`}
        >
          +{count - 7}…
        </span>
      )}
    </div>
  );
}

function CarbCard({
  countLabel,
  prefixEn,
  prefixKh,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  examplesEn,
  examplesKh,
  hexCount,
  tone,
  testid,
}: {
  countLabel: string;
  prefixEn: string;
  prefixKh: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  examplesEn: string;
  examplesKh: string;
  hexCount: number;
  tone: Tone;
  testid: string;
}) {
  const T = TONE[tone];
  return (
    <article
      className={`rounded-2xl border-2 ${T.border} bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
      data-testid={testid}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`inline-flex items-center justify-center min-w-[44px] h-9 px-2.5 rounded-full ${T.bg} text-white text-sm font-extrabold shadow ring-2 ${T.ring}`}
        >
          {countLabel}
        </span>
        <div className="text-right">
          <div className={`text-xs font-bold ${T.text}`}>{prefixEn}</div>
          <div className="font-khmer text-[11px] text-slate-600 mt-0.5">
            {prefixKh}
          </div>
        </div>
      </div>

      <HexCluster count={hexCount} tone={tone} />

      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
        {titleEn}
      </h3>
      <h4 className="font-khmer text-sm sm:text-base text-slate-700 leading-snug mt-0.5 mb-2">
        {titleKh}
      </h4>
      <p className="text-sm text-slate-700 leading-relaxed">{bodyEn}</p>
      <p className="font-khmer text-sm text-slate-700 leading-loose mt-2">
        {bodyKh}
      </p>

      <div className={`mt-3 pt-3 border-t ${T.border}`}>
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 inline-flex flex-wrap gap-x-2 gap-y-0.5">
          <span>Examples</span>
          <span className="opacity-50" aria-hidden>·</span>
          <span className="font-khmer normal-case tracking-normal">
            ឧទាហរណ៍
          </span>
        </div>
        <div className={`text-sm font-bold ${T.text} mt-0.5`}>{examplesEn}</div>
        <div className="font-khmer text-sm text-slate-700 mt-0.5">
          {examplesKh}
        </div>
      </div>
    </article>
  );
}

function SugarCard({
  icon: Icon,
  tone,
  nameEn,
  nameKh,
  formula,
  kindEn,
  kindKh,
  tagEn,
  tagKh,
  bodyEn,
  bodyKh,
  hexCount,
  testid,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  nameEn: string;
  nameKh: string;
  formula: string;
  kindEn: string;
  kindKh: string;
  tagEn: string;
  tagKh: string;
  bodyEn: string;
  bodyKh: string;
  hexCount: number;
  testid: string;
}) {
  const T = TONE[tone];
  return (
    <article
      className={`relative rounded-2xl border-2 ${T.border} bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
      data-testid={testid}
    >
      <div
        aria-hidden
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${T.bg} opacity-15 blur-2xl`}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${T.bg} text-white shadow ring-2 ${T.ring}`}
              aria-hidden
            >
              <Icon className="w-5 h-5" strokeWidth={2.25} />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                {nameEn}
              </h3>
              <h4 className="font-khmer text-sm text-slate-700 leading-snug">
                {nameKh}
              </h4>
            </div>
          </div>
        </div>

        {/* Hex visual + formula */}
        <div className={`rounded-xl ${T.soft} border ${T.border} p-3 mb-3`}>
          <div className="flex items-center justify-center gap-1 mb-1.5">
            {Array.from({ length: hexCount }).map((_, i) => (
              <Hexagon
                key={i}
                className={`w-7 h-7 ${T.fill}`}
                strokeWidth={2}
              />
            ))}
          </div>
          <div
            className={`text-center text-sm font-bold ${T.text}`}
            data-testid={`${testid}-formula`}
          >
            <InlineMath math={formula} />
          </div>
          <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1 inline-flex w-full justify-center flex-wrap gap-x-2 gap-y-0.5">
            <span>{kindEn}</span>
            <span className="opacity-50" aria-hidden>·</span>
            <span className="font-khmer normal-case tracking-normal">
              {kindKh}
            </span>
          </div>
        </div>

        <div
          className={`text-xs font-extrabold uppercase tracking-wider ${T.text} mb-2 inline-flex flex-wrap gap-x-2 gap-y-0.5`}
        >
          <span>{tagEn}</span>
          <span className="opacity-50" aria-hidden>·</span>
          <span className="font-khmer normal-case tracking-normal">
            {tagKh}
          </span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{bodyEn}</p>
        <p className="font-khmer text-sm text-slate-700 leading-loose mt-2">
          {bodyKh}
        </p>
      </div>
    </article>
  );
}

function FlowNode({
  icon: Icon,
  tone,
  labelEn,
  labelKh,
  subEn,
  subKh,
  pulse,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  labelEn: string;
  labelKh: string;
  subEn: string;
  subKh: string;
  pulse?: boolean;
}) {
  const T = TONE[tone];
  return (
    <div className="flex flex-col items-center text-center gap-1.5">
      <div className="relative">
        <div
          className={`w-16 h-16 rounded-2xl ${T.bg} text-white flex items-center justify-center shadow-lg ring-2 ${T.ring}`}
        >
          <Icon className="w-8 h-8" strokeWidth={2.25} />
        </div>
        {pulse && (
          <span
            aria-hidden
            className={`absolute inset-0 rounded-2xl ring-2 ${T.ring} animate-ping opacity-60`}
          />
        )}
      </div>
      <div>
        <div className={`text-sm font-extrabold ${T.text} leading-tight`}>
          {labelEn}
        </div>
        <div className="font-khmer text-xs text-slate-700 leading-snug">
          {labelKh}
        </div>
        <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 italic">
          {subEn}
        </div>
        <div className="font-khmer text-[10px] text-slate-500 leading-snug">
          {subKh}
        </div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center text-2xl sm:text-3xl text-slate-400 font-bold py-2">
      →
    </div>
  );
}

function ExplainCard({
  icon: Icon,
  tone,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  testid,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  testid: string;
}) {
  const T = TONE[tone];
  return (
    <article
      className={`rounded-2xl border-2 ${T.border} bg-white p-4 sm:p-5 shadow-sm`}
      data-testid={testid}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${T.bg} text-white shadow ring-2 ${T.ring}`}
          aria-hidden
        >
          <Icon className="w-5 h-5" strokeWidth={2.25} />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            {titleEn}
          </h3>
          <h4 className="font-khmer text-xs sm:text-sm text-slate-700 leading-snug mt-0.5">
            {titleKh}
          </h4>
        </div>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{bodyEn}</p>
      <p className="font-khmer text-sm text-slate-700 leading-loose mt-2">
        {bodyKh}
      </p>
    </article>
  );
}

function PowerChip({
  icon: Icon,
  labelEn,
  labelKh,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  labelEn: string;
  labelKh: string;
}) {
  return (
    <div className="rounded-xl border-2 border-orange-200 bg-white/80 backdrop-blur p-3 shadow-sm flex items-center gap-3">
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white flex-shrink-0">
        <Icon className="w-4.5 h-4.5" strokeWidth={2.25} />
      </span>
      <div className="min-w-0">
        <div className="text-sm font-extrabold text-slate-900 leading-tight">
          {labelEn}
        </div>
        <div className="font-khmer text-xs text-slate-700 leading-snug">
          {labelKh}
        </div>
      </div>
    </div>
  );
}
