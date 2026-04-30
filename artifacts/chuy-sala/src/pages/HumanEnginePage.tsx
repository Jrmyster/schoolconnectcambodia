import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  Activity,
  AlertTriangle,
  Apple,
  Bandage,
  Beef,
  Bike,
  Bone,
  Brain,
  Candy,
  CheckCircle2,
  ChevronRight,
  Cookie,
  CupSoda,
  Droplets,
  Drumstick,
  Dumbbell,
  Eye,
  Fish,
  Flame,
  Gauge,
  Heart,
  HeartCrack,
  Leaf,
  Megaphone,
  Minus,
  Plus,
  Quote,
  Scale,
  Shield,
  Soup,
  Sparkles,
  Sun,
  Volume2,
  Wheat,
  Zap,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

// ════════════════════════════════════════════════════════════════════════════
//  The Human Engine — ម៉ាស៊ីនរាងកាយ៖ អាហារូបត្ថម្ភ និងចលនា
//  Sections:
//    1. Fueling the Engine   — macronutrients + caloric balance slider
//    2. The Science of Movement — cardio + hypertrophy
//    3. The Dangers of "Rust"  — sedentary lifestyle & disease
// ════════════════════════════════════════════════════════════════════════════

export default function HumanEnginePage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-800 overflow-hidden">
      <ScopedStyles />
      <EngineBg />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-800 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm">
          <Heart className="w-3.5 h-3.5" />
          {isKh ? "សុខុមាលភាព · ម៉ាស៊ីនរាងកាយ" : "Well-being · Human Engine"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>ម៉ាស៊ីន <span className="he-text-green">រាងកាយ</span></>
          ) : (
            <>The Human <span className="he-text-green">Engine</span></>
          )}
        </h1>
        <p
          className={`text-slate-700 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "រាងកាយរបស់អ្នកគឺជាម៉ាស៊ីនដ៏ស្មុគស្មាញបំផុតដែលអ្នកនឹងជាម្ចាស់។ វាត្រូវការឥន្ធនៈត្រឹមត្រូវ (អាហារ) ការប្រើប្រាស់ទៀងទាត់ (ចលនា) និងការសម្រាក។ មគ្គុទ្ទេសក៍នេះបង្ហាញថាគ្រឿងបំពាក់ទាំងបីនេះធ្វើការរួមគ្នាយ៉ាងដូចម្ដេច — និងអ្វីដែលកើតឡើងនៅពេលអ្នកមិនយកចិត្តទុកដាក់។"
            : "Your body is the most sophisticated engine you will ever own. It needs the right fuel (food), regular use (movement), and rest. This guide shows how those three parts work together — and what happens when you neglect them."}
        </p>
        <div className="hidden sm:flex absolute top-12 right-8 items-center gap-3 select-none">
          <Apple className="w-7 h-7 text-emerald-400 he-float" style={{ animationDelay: "0s" }} />
          <Dumbbell className="w-7 h-7 text-orange-400 he-float" style={{ animationDelay: "0.6s" }} />
          <HeartCrack className="w-7 h-7 text-rose-400 he-float" style={{ animationDelay: "1.2s" }} />
        </div>
      </header>

      {/* ── Hippocrates Quote ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <blockquote className="relative bg-gradient-to-r from-emerald-50 via-white to-orange-50 border-l-4 border-emerald-600 rounded-r-2xl p-5 sm:p-6 shadow-sm">
          <Quote className="absolute top-3 right-4 w-8 h-8 text-emerald-200" aria-hidden="true" />
          <p className={`text-base sm:text-lg text-slate-800 italic leading-relaxed ${isKh ? "font-khmer not-italic leading-loose" : "font-serif"}`}>
            {isKh
              ? "“ឲ្យអាហាររបស់អ្នកក្លាយជាឱសថរបស់អ្នក ហើយឲ្យឱសថរបស់អ្នកក្លាយជាអាហាររបស់អ្នក។”"
              : "“Let food be thy medicine, and medicine be thy food.”"}
          </p>
          <footer className={`mt-2 text-sm font-bold text-emerald-800 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "— ហ៊ីប៉ូក្រាត" : "— Hippocrates"}
          </footer>
        </blockquote>
      </div>

      {/* ── Section 1: Fuel ──────────────────────────────────────────── */}
      <Section
        id="fuel"
        eyebrowEn="01 · Fuel"
        eyebrowKh="០១ · ឥន្ធនៈ"
        titleEn="Fueling the engine"
        titleKh="ការផ្ដល់ឥន្ធនៈដល់ម៉ាស៊ីន"
        descEn="Every plate of food contains three kinds of building blocks — macronutrients. Each does a different job in your body. Your job is to give the engine all three."
        descKh="ចានអាហារនីមួយៗមានគ្រឿងបង្កើតបីប្រភេទ — សារធាតុចិញ្ចឹមម៉ាក្រូ។ នីមួយៗធ្វើការងារខុសៗគ្នានៅក្នុងរាងកាយរបស់អ្នក។ ការងាររបស់អ្នកគឺផ្ដល់ម៉ាស៊ីននូវទាំងបី។"
        accent="emerald"
        isKh={isKh}
      >
        <Macronutrients isKh={isKh} />
        <CaloricBalance isKh={isKh} />
      </Section>

      {/* ── Section 2: Spark Plugs — Vitamins & Minerals ─────────────── */}
      <Section
        id="spark-plugs"
        eyebrowEn="02 · Spark Plugs"
        eyebrowKh="០២ · ប៊ូស៊ីបញ្ឆេះ"
        titleEn="The Spark Plugs: Vitamins & Minerals"
        titleKh="ប៊ូស៊ីបញ្ឆេះម៉ាស៊ីន៖ វីតាមីន និងសារធាតុរ៉ែ"
        descEn="If macronutrients are the fuel for your engine, vitamins and minerals are the spark plugs and oil. You only need tiny amounts, but without them, the engine breaks down."
        descKh="ប្រសិនបើសារធាតុចិញ្ចឹមម៉ាក្រូជាឥន្ធនៈសម្រាប់ម៉ាស៊ីនរបស់អ្នក វីតាមីន និងសារធាតុរ៉ែគឺជាប៊ូស៊ីបញ្ឆេះ និងប្រេងម៉ាស៊ីន។ អ្នកត្រូវការតែបរិមាណតិចតួចប៉ុណ្ណោះ ប៉ុន្តែបើគ្មានពួកវា ម៉ាស៊ីននឹងខូច។"
        accent="amber"
        isKh={isKh}
      >
        <SparkPlugs isKh={isKh} />
      </Section>

      {/* ── Section 3: Movement ──────────────────────────────────────── */}
      <Section
        id="movement"
        eyebrowEn="03 · Movement"
        eyebrowKh="០៣ · ចលនា"
        titleEn="The science of movement"
        titleKh="វិទ្យាសាស្ត្រនៃចលនា"
        descEn="Exercise isn't just about looking good. Biologically, it strengthens your heart, grows your muscles, and sharpens your brain. There are two main families."
        descKh="លំហាត់ប្រាណមិនត្រឹមតែដើម្បីរូបរាងស្អាតទេ។ តាមជីវសាស្ត្រ វាពង្រឹងបេះដូងរបស់អ្នក ធ្វើឲ្យសាច់ដុំធំឡើង និងធ្វើឲ្យខួរក្បាលរបស់អ្នកមុតស្រួច។ មានគ្រួសារសំខាន់ពីរ។"
        accent="orange"
        isKh={isKh}
      >
        <MovementTabs isKh={isKh} />
      </Section>

      {/* ── Section 4: Rust ──────────────────────────────────────────── */}
      <Section
        id="rust"
        eyebrowEn="04 · Warning"
        eyebrowKh="០៤ · ការព្រមាន"
        titleEn="The dangers of 'rust'"
        titleKh="គ្រោះថ្នាក់នៃ 'ច្រេះ'"
        descEn="An engine that never moves, fuelled with the wrong fuel, breaks down. The same is true for your body. These are the diseases that quietly grow when we sit too long."
        descKh="ម៉ាស៊ីនដែលមិនដែលផ្លាស់ទី និងបានបញ្ចូលឥន្ធនៈខុស នឹងខូច។ ដូចគ្នានេះដែរសម្រាប់រាងកាយរបស់អ្នក។ ទាំងនេះគឺជាជំងឺដែលលូតលាស់ស្ងាត់ៗនៅពេលយើងអង្គុយយូរពេក។"
        accent="rose"
        isKh={isKh}
      >
        <DiseaseCards isKh={isKh} />
      </Section>

      {/* ── Glowing Energy-Meter Divider ─────────────────────────────── */}
      <EnergyMeterDivider isKh={isKh} />

      {/* ── Section 5: Engine Fuel — Healthy vs. Unhealthy ──────────── */}
      <Section
        id="engine-fuel"
        eyebrowEn="05 · Fuel Quality"
        eyebrowKh="០៥ · គុណភាពឥន្ធនៈ"
        titleEn="Engine fuel: healthy vs. unhealthy choices"
        titleKh="ឥន្ធនៈម៉ាស៊ីន៖ ជម្រើសអាហារល្អ និងមិនល្អ"
        descEn="Your body is an engine. The food you eat is its fuel — and not all fuels are equal. Tap the Play button on any card to hear the English name spoken aloud."
        descKh="រាងកាយរបស់អ្នកគឺជាម៉ាស៊ីន។ អាហារដែលអ្នកញ៉ាំគឺជាឥន្ធនៈរបស់វា — ហើយឥន្ធនៈមិនមានគុណភាពដូចគ្នាទេ។ ចុចប៊ូតុង Play លើកាតណាមួយដើម្បីស្ដាប់ឈ្មោះជាភាសាអង់គ្លេស។"
        accent="emerald"
        isKh={isKh}
      >
        <EngineAnalogy isKh={isKh} />
        <FuelGrid kind="healthy" isKh={isKh} />
        <FuelGrid kind="unhealthy" isKh={isKh} />
      </Section>

      {/* ── Closing ─────────────────────────────────────────────────── */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-slate-600 text-sm italic">
        <span className={isKh ? "font-khmer not-italic" : ""}>
          {isKh
            ? "“ការមើលថែរាងកាយរបស់អ្នក គឺជាកន្លែងតែមួយដែលអ្នកត្រូវរស់នៅ។”"
            : "“Take care of your body. It's the only place you have to live.” — Jim Rohn"}
        </span>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout helpers
// ════════════════════════════════════════════════════════════════════════════

function Section({
  id, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, accent, isKh, children,
}: {
  id?: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  accent: "emerald" | "orange" | "rose" | "amber";
  isKh: boolean;
  children: React.ReactNode;
}) {
  const eyebrowColor =
    accent === "emerald" ? "text-emerald-700"
    : accent === "orange" ? "text-orange-700"
    : accent === "amber" ? "text-amber-700"
    : "text-rose-700";
  return (
    <section id={id} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
      <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase ${eyebrowColor} mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        <Sparkles className="w-3 h-3" />
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-slate-700 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function EngineBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #f7fef9 0%, #fff8f0 50%, #fff5f5 100%)" }} />
      <div className="absolute top-32 -left-20 w-72 h-72 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="absolute top-[40%] -right-16 w-80 h-80 rounded-full bg-orange-100/40 blur-3xl" />
      <div className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full bg-rose-100/30 blur-3xl" />
    </div>
  );
}

function ScopedStyles() {
  return (
    <style>{`
      .he-text-green { color: #047857; }
      .he-text-orange { color: #c2410c; }
      .he-text-rose { color: #be123c; }
      @keyframes he-float {
        0%,100% { transform: translateY(0); }
        50%     { transform: translateY(-6px); }
      }
      .he-float { animation: he-float 3.2s ease-in-out infinite; }
      @keyframes he-pump {
        0%,100% { transform: scale(1); }
        50%     { transform: scale(1.08); }
      }
      .he-pump { animation: he-pump 1.6s ease-in-out infinite; }
      @keyframes he-flex {
        0%,100% { transform: translateY(0) rotate(0); }
        50%     { transform: translateY(-3px) rotate(-3deg); }
      }
      .he-flex { animation: he-flex 2s ease-in-out infinite; }

      /* ── Engine-Fuel section ─────────────────────────────────────── */
      @keyframes he-bounce-soft {
        0%,100% { transform: translateY(0); }
        50%     { transform: translateY(-4px); }
      }
      .he-bounce-soft:hover { animation: he-bounce-soft 0.9s ease-in-out infinite; }
      @keyframes he-meter-glow {
        0%,100% { filter: drop-shadow(0 0 6px rgba(16,185,129,0.55)); opacity: .9; }
        50%     { filter: drop-shadow(0 0 14px rgba(249,115,22,0.85)); opacity: 1; }
      }
      .he-meter-glow { animation: he-meter-glow 2.4s ease-in-out infinite; }
      @keyframes he-meter-needle {
        0%   { transform: translateX(0%); }
        45%  { transform: translateX(46%); }
        55%  { transform: translateX(46%); }
        100% { transform: translateX(96%); }
      }
      .he-meter-needle { animation: he-meter-needle 6s ease-in-out infinite alternate; }
      @keyframes he-spark-pulse {
        0%,100% { transform: scale(1); opacity: .85; }
        50%     { transform: scale(1.15); opacity: 1; }
      }
      .he-spark-pulse { animation: he-spark-pulse 1.4s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .he-bounce-soft:hover,
        .he-meter-glow,
        .he-meter-needle,
        .he-spark-pulse {
          animation: none !important;
        }
      }
    `}</style>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1a. Macronutrients — three cards
// ════════════════════════════════════════════════════════════════════════════

type Macro = {
  key: string;
  icon: typeof Wheat;
  tint: "amber" | "rose" | "yellow";
  nameEn: string;
  nameKh: string;
  jobEn: string;
  jobKh: string;
  bodyEn: string;
  bodyKh: string;
  examplesEn: string[];
  examplesKh: string[];
};

const MACROS: Macro[] = [
  {
    key: "carbs",
    icon: Wheat,
    tint: "amber",
    nameEn: "Carbohydrates",
    nameKh: "កាបូអ៊ីដ្រាត",
    jobEn: "Immediate energy",
    jobKh: "ថាមពលភ្លាមៗ",
    bodyEn:
      "Your body breaks carbohydrates down into glucose — the fastest, easiest fuel for your muscles and brain. Without enough, you feel tired and find it hard to focus in class.",
    bodyKh:
      "រាងកាយរបស់អ្នកបំបែកកាបូអ៊ីដ្រាតទៅជាគ្លុយកូស — ឥន្ធនៈលឿនបំផុត និងងាយបំផុតសម្រាប់សាច់ដុំ និងខួរក្បាលរបស់អ្នក។ បើគ្មានគ្រប់គ្រាន់ អ្នកនឹងមានអារម្មណ៍នឿយហត់ និងពិបាកផ្ដោតអារម្មណ៍ក្នុងថ្នាក់។",
    examplesEn: ["Rice (បាយ)", "Noodles", "Bread", "Sweet potato", "Banana"],
    examplesKh: ["បាយ", "មី", "នំបុ័ង", "ដំឡូងជ្វា", "ចេក"],
  },
  {
    key: "protein",
    icon: Beef,
    tint: "rose",
    nameEn: "Proteins",
    nameKh: "ប្រូតេអុីន",
    jobEn: "Building & repair",
    jobKh: "ការសាងសង់ និងជួសជុល",
    bodyEn:
      "Proteins are the bricks your body uses to build muscle, skin, hair, and even the antibodies that fight infections. After exercise or injury, protein rebuilds you stronger.",
    bodyKh:
      "ប្រូតេអុីនគឺជាឥដ្ឋដែលរាងកាយរបស់អ្នកប្រើដើម្បីសាងសង់សាច់ដុំ ស្បែក សក់ និងសូម្បីតែអង់ទីករដែលប្រយុទ្ធនឹងការឆ្លង។ ក្រោយលំហាត់ប្រាណ ឬរបួស ប្រូតេអុីនជួសជុលអ្នកឡើងវិញឲ្យរឹងមាំ។",
    examplesEn: ["Fish (ត្រី)", "Chicken (សាច់មាន់)", "Eggs", "Beans (សណ្ដែក)", "Tofu"],
    examplesKh: ["ត្រី", "សាច់មាន់", "ស៊ុត", "សណ្ដែក", "តៅហ៊ូ"],
  },
  {
    key: "fats",
    icon: Droplets,
    tint: "yellow",
    nameEn: "Fats",
    nameKh: "ខ្លាញ់",
    jobEn: "Long-term energy & brain",
    jobKh: "ថាមពលរយៈពេលវែង និងខួរក្បាល",
    bodyEn:
      "Healthy fats store energy for the long haul, protect your organs, and — crucially — your brain is roughly 60% fat. Good fats support memory, mood, and hormones.",
    bodyKh:
      "ខ្លាញ់ល្អ ផ្ទុកថាមពលរយៈពេលវែង ការពារសរីរាង្គរបស់អ្នក និង — ដ៏សំខាន់ — ខួរក្បាលរបស់អ្នកមានខ្លាញ់ប្រហែល ៦០%។ ខ្លាញ់ល្អជួយដល់ការចងចាំ អារម្មណ៍ និងអរម៉ូន។",
    examplesEn: ["Nuts (គ្រាប់)", "Cooking oil", "Avocado", "Coconut", "Fish oil"],
    examplesKh: ["គ្រាប់", "ប្រេងចម្អិន", "ផ្លែបឺរ", "ដូង", "ប្រេងត្រី"],
  },
];

const MACRO_TINT = {
  amber: { bar: "bg-amber-500", iconBg: "bg-amber-100", iconClr: "text-amber-700", chip: "bg-amber-50 text-amber-800 border-amber-200" },
  rose:  { bar: "bg-rose-500",  iconBg: "bg-rose-100",  iconClr: "text-rose-700",  chip: "bg-rose-50 text-rose-800 border-rose-200" },
  yellow:{ bar: "bg-yellow-500",iconBg: "bg-yellow-100",iconClr: "text-yellow-700",chip: "bg-yellow-50 text-yellow-800 border-yellow-200" },
} as const;

function Macronutrients({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {MACROS.map((m) => {
        const Icon = m.icon;
        const t = MACRO_TINT[m.tint];
        const examples = isKh ? m.examplesKh : m.examplesEn;
        return (
          <div key={m.key} className="bg-white/95 rounded-2xl border border-emerald-100 shadow-[0_2px_24px_-12px_rgba(16,80,60,0.25)] p-5 relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-1 ${t.bar}`} />
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl ${t.iconBg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${t.iconClr}`} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className={`font-display font-bold text-lg text-slate-900 ${isKh ? "font-khmer leading-tight" : ""}`}>
                  {isKh ? m.nameKh : m.nameEn}
                </h3>
                <p className={`text-xs font-bold uppercase tracking-wide ${t.iconClr} ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                  {isKh ? m.jobKh : m.jobEn}
                </p>
              </div>
            </div>
            <p className={`text-sm text-slate-700 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? m.bodyKh : m.bodyEn}
            </p>
            <div className={`text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ឧទាហរណ៍" : "Examples"}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {examples.map((ex) => (
                <span key={ex} className={`text-xs px-2 py-1 rounded-md border ${t.chip} ${isKh ? "font-khmer" : ""}`}>
                  {ex}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1b. Caloric Balance — interactive slider
// ════════════════════════════════════════════════════════════════════════════

function CaloricBalance({ isKh }: { isKh: boolean }) {
  // intake relative to burn: -30 (deficit) to +30 (surplus)
  const [delta, setDelta] = useState<number>(0);
  const burn = 2200; // illustrative
  const intake = burn + delta * 30; // ±900 kcal range

  const state =
    delta < -3 ? "deficit"
    : delta > 3 ? "surplus"
    : "balanced";

  const stateData = {
    deficit: {
      labelEn: "Caloric Deficit",
      labelKh: "ឱនភាពកាឡូរី",
      effectEn: "Eating less than you burn → body uses stored fat → weight loss.",
      effectKh: "ញុំាតិចជាងអ្វីដែលអ្នកដុត → រាងកាយប្រើខ្លាញ់ដែលផ្ទុកទុក → ស្រកទម្ងន់។",
      colour: "text-sky-700",
      bg: "bg-sky-50 border-sky-200",
      bar: "bg-sky-500",
      icon: Minus,
    },
    balanced: {
      labelEn: "Balanced",
      labelKh: "មានតុល្យភាព",
      effectEn: "Energy in equals energy out → weight stays the same.",
      effectKh: "ថាមពលចូលស្មើនឹងថាមពលចេញ → ទម្ងន់នៅដដែល។",
      colour: "text-emerald-700",
      bg: "bg-emerald-50 border-emerald-200",
      bar: "bg-emerald-500",
      icon: Scale,
    },
    surplus: {
      labelEn: "Caloric Surplus",
      labelKh: "ការលើសកាឡូរី",
      effectEn: "Eating more than you burn → body stores the rest as fat → weight gain.",
      effectKh: "ញុំាច្រើនជាងអ្វីដែលអ្នកដុត → រាងកាយផ្ទុកនៅសល់ជាខ្លាញ់ → ឡើងទម្ងន់។",
      colour: "text-rose-700",
      bg: "bg-rose-50 border-rose-200",
      bar: "bg-rose-500",
      icon: Plus,
    },
  } as const;

  const s = stateData[state];
  const StateIcon = s.icon;

  // % positions for the visual bars (0-100)
  const intakePct = Math.min(100, Math.max(0, (intake / 3500) * 100));
  const burnPct = (burn / 3500) * 100;

  return (
    <div className="bg-white/95 rounded-2xl border border-emerald-100 shadow-[0_2px_24px_-12px_rgba(16,80,60,0.25)] p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
          <Scale className="w-6 h-6 text-emerald-700" strokeWidth={1.8} />
        </div>
        <h3 className={`font-display font-bold text-lg sm:text-xl text-slate-900 ${isKh ? "font-khmer leading-tight" : ""}`}>
          {isKh ? "តុល្យភាពកាឡូរី — ការគណនាដ៏សាមញ្ញ" : "Caloric balance — the simple equation"}
        </h3>
      </div>
      <p className={`text-sm text-slate-700 mb-5 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "កាឡូរីគឺជារង្វាស់នៃថាមពល។ ច្បាប់ដ៏សាមញ្ញ៖ ប្រសិនបើអ្នកញុំាថាមពលច្រើនជាងអ្នកដុត រាងកាយនឹងផ្ទុកវាជាខ្លាញ់។ បើតិចជាង វានឹងដុតខ្លាញ់ទុកដើម្បីចំណាយចាន់។ លេងជាមួយឧបករណ៍ខាងក្រោមដើម្បីមើលថាវាដំណើរការយ៉ាងដូចម្ដេច។"
          : "A calorie is a unit of energy. The simple rule: if you eat more energy than you burn, the body stores it as fat. If you eat less, it burns stored fat to make up the difference. Play with the slider below to see how it works."}
      </p>

      {/* Bars */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
        <BarRow
          labelEn="Energy IN (food)"
          labelKh="ថាមពលចូល (អាហារ)"
          icon={Apple}
          value={intake}
          pct={intakePct}
          colour="bg-emerald-500"
          isKh={isKh}
        />
        <BarRow
          labelEn="Energy OUT (movement + life)"
          labelKh="ថាមពលចេញ (ចលនា + ជីវិត)"
          icon={Flame}
          value={burn}
          pct={burnPct}
          colour="bg-orange-500"
          isKh={isKh}
        />
      </div>

      {/* Slider */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="caloric-slider" className={`text-xs font-bold uppercase tracking-wider text-slate-500 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "កែកម្រិតការញុំាប្រចាំថ្ងៃ" : "Adjust your daily intake"}
          </label>
          <span className="font-mono text-sm tabular-nums text-slate-600">
            {delta > 0 ? "+" : ""}{delta * 30} kcal
          </span>
        </div>
        <input
          id="caloric-slider"
          type="range"
          min={-30}
          max={30}
          step={1}
          value={delta}
          onChange={(e) => setDelta(Number(e.target.value))}
          aria-label={isKh ? "កែកម្រិតការញុំាប្រចាំថ្ងៃ" : "Adjust daily caloric intake"}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-600 bg-gradient-to-r from-sky-300 via-emerald-300 to-rose-300"
        />
        <div className={`flex justify-between text-xs text-slate-500 mt-1 ${isKh ? "font-khmer" : ""}`}>
          <span>{isKh ? "ញុំាតិច" : "Eat less"}</span>
          <span>{isKh ? "ភាពតុល្យ" : "Balanced"}</span>
          <span>{isKh ? "ញុំាច្រើន" : "Eat more"}</span>
        </div>
      </div>

      {/* Result */}
      <div className={`mt-5 rounded-xl border-2 p-4 flex items-start gap-3 ${s.bg}`} aria-live="polite">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${s.bar} text-white flex items-center justify-center`}>
          <StateIcon className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div>
          <div className={`font-bold text-base ${s.colour} ${isKh ? "font-khmer" : ""}`}>
            {isKh ? s.labelKh : s.labelEn}
          </div>
          <p className={`text-sm text-slate-700 mt-0.5 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? s.effectKh : s.effectEn}
          </p>
        </div>
      </div>
    </div>
  );
}

function BarRow({
  labelEn, labelKh, icon: Icon, value, pct, colour, isKh,
}: {
  labelEn: string; labelKh: string;
  icon: typeof Apple;
  value: number;
  pct: number;
  colour: string;
  isKh: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-bold text-slate-700 inline-flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
          <Icon className="w-3.5 h-3.5" />
          {isKh ? labelKh : labelEn}
        </span>
        <span className="font-mono text-xs tabular-nums text-slate-600">{value} kcal</span>
      </div>
      <div className="h-3 bg-white rounded-full overflow-hidden border border-slate-200">
        <div className={`h-full ${colour} transition-all duration-300`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. Movement — Cardio + Hypertrophy tabs
// ════════════════════════════════════════════════════════════════════════════

type Move = {
  key: string;
  icon: typeof Bike;
  nameEn: string;
  nameKh: string;
  tagEn: string;
  tagKh: string;
  bodyEn: string;
  bodyKh: string;
  mechanismEn: string;
  mechanismKh: string;
  brainEn: string;
  brainKh: string;
  examplesEn: string[];
  examplesKh: string[];
  colour: "rose" | "orange";
};

const MOVES: Move[] = [
  {
    key: "cardio",
    icon: Heart,
    nameEn: "Cardiovascular Health",
    nameKh: "សុខភាពបេះដូង",
    tagEn: "Steady-state · 20–60 min",
    tagKh: "ល្បឿនថេរ · ២០–៦០ នាទី",
    bodyEn:
      "Cardio means anything that keeps your heart rate elevated for a long stretch. The classic example for a Cambodian student: a daily evening bicycle ride.",
    bodyKh:
      "កាឌីយ៉ូមានន័យថាអ្វីៗដែលធ្វើឲ្យអត្រាបេះដូងរបស់អ្នកលើកខ្ពស់ក្នុងរយៈពេលយូរ។ ឧទាហរណ៍បុរាណសម្រាប់សិស្សកម្ពុជា៖ ការជិះកង់ប្រចាំល្ងាច។",
    mechanismEn:
      "When you bike for 30 minutes, your heart pumps harder. Just like any muscle that's worked, the heart adapts: its walls thicken slightly and each beat moves more blood. Resting heart rate drops — a sign of a strong heart.",
    mechanismKh:
      "នៅពេលអ្នកជិះកង់ ៣០ នាទី បេះដូងរបស់អ្នកបូមកាន់តែខ្លាំង។ ដូចសាច់ដុំដែលត្រូវធ្វើការ បេះដូងបន្សុំា៖ ជញ្ជាំងរបស់វាក្រាស់បន្តិច ហើយការវាយម្ដងៗបញ្ជូនឈាមកាន់តែច្រើន។ អត្រាបេះដូងពេលសម្រាកធ្លាក់ចុះ — ជាសញ្ញានៃបេះដូងរឹងមាំ។",
    brainEn:
      "Bonus: the same flow that strengthens the heart pushes more oxygen-rich blood to the brain. Students who exercise regularly remember more, focus longer, and sleep better — directly improving exam performance.",
    brainKh:
      "បន្ថែមៈ លំហូរឈាមដូចគ្នាដែលពង្រឹងបេះដូង ជំរុញឈាមដែលសម្បូរអុកស៊ីហ្សែនទៅខួរក្បាលច្រើនជាងមុន។ សិស្សដែលហាត់ប្រាណទៀងទាត់ ចាំបានច្រើន ផ្ដោតបានយូរ និងគេងបានល្អ — ធ្វើឲ្យលទ្ធផលប្រឡងប្រសើរឡើងផ្ទាល់។",
    examplesEn: ["Bicycle ride (ជិះកង់)", "Brisk walk", "Jogging", "Swimming", "Football"],
    examplesKh: ["ជិះកង់", "ដើរលឿន", "រត់", "ហែលទឹក", "បាល់ទាត់"],
    colour: "rose",
  },
  {
    key: "hypertrophy",
    icon: Dumbbell,
    nameEn: "Resistance Training & Hypertrophy",
    nameKh: "ការហ្វឹកហាត់ទប់ទល់ & ការលូតលាស់សាច់ដុំ",
    tagEn: "Push · pull · legs · 3–5×/week",
    tagKh: "រុញ · ទាញ · ជើង · ៣–៥ ដង/សប្ដាហ៍",
    bodyEn:
      "Resistance training is any exercise where your muscles fight against a load. That load can be a barbell, a sandbag, your school bag — or just your own body weight in pull-ups and push-ups.",
    bodyKh:
      "ការហ្វឹកហាត់ទប់ទល់ គឺជាលំហាត់ប្រាណដែលសាច់ដុំរបស់អ្នកប្រឆាំងនឹងបន្ទុក។ បន្ទុកនោះអាចជាបាបេល ធុងខ្សាច់ កាបូបសាលា — ឬគ្រាន់តែទម្ងន់រាងកាយរបស់អ្នកក្នុង pull-up និង push-up។",
    mechanismEn:
      "Lifting a weight near your limit creates microscopic tears in the muscle fibres. This sounds bad — but it's the signal. With enough protein and 7–9 hours of sleep, your body rebuilds those fibres slightly thicker and stronger than before. Repeat for months → visible muscle growth. This is hypertrophy.",
    mechanismKh:
      "ការលើកទម្ងន់ជិតដល់ដែនកំណត់របស់អ្នក បង្កើតការដាច់ខ្នាតតូចៗនៅក្នុងសរសៃសាច់ដុំ។ វាស្ដាប់ទៅគួរឲ្យព្រួយ — តែវាគឺជាសញ្ញា។ ជាមួយប្រូតេអុីនគ្រប់គ្រាន់ និងការគេង ៧–៩ ម៉ោង រាងកាយរបស់អ្នកសាងសង់សរសៃទាំងនោះឡើងវិញឲ្យក្រាស់និងរឹងមាំជាងមុន។ ធ្វើឡើងវិញរយៈពេលជាច្រើនខែ → ការរីកលូតលាស់សាច់ដុំដែលអាចមើលឃើញ។ នេះគឺ hypertrophy។",
    brainEn:
      "Progressive overload is the rule: every week or two, add a tiny bit more weight or one extra rep. A bench press of 30 kg becomes 32.5 kg, becomes 35 kg. The body has no choice but to adapt.",
    brainKh:
      "ការបន្ថែមបន្ទុកជាបណ្ដើរៗ គឺជាច្បាប់៖ រៀងរាល់សប្ដាហ៍ ឬពីរ បន្ថែមទម្ងន់បន្តិច ឬម្ដងបន្ថែម។ Bench press ៣០ គីឡូក្លាយជា ៣២.៥ គីឡូ ក្លាយជា ៣៥ គីឡូ។ រាងកាយគ្មានជម្រើសទេក្រៅពីត្រូវតែបន្សុំា។",
    examplesEn: ["Push-ups", "Pull-ups", "Bench press", "Squats", "Carrying water"],
    examplesKh: ["Push-up", "Pull-up", "Bench press", "Squat", "ដឹកទឹក"],
    colour: "orange",
  },
];

const MOVE_TINT = {
  rose: { border: "border-rose-300", bg: "bg-rose-50", chip: "bg-rose-600 text-white", icon: "bg-rose-600 text-white", bar: "bg-rose-500", soft: "bg-rose-100 text-rose-800 border-rose-200" },
  orange: { border: "border-orange-300", bg: "bg-orange-50", chip: "bg-orange-600 text-white", icon: "bg-orange-600 text-white", bar: "bg-orange-500", soft: "bg-orange-100 text-orange-800 border-orange-200" },
} as const;

function MovementTabs({ isKh }: { isKh: boolean }) {
  const [idx, setIdx] = useState<number>(0);
  const active = MOVES[idx];
  const ActiveIcon = active.icon;
  const tint = MOVE_TINT[active.colour];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(next: number) {
    const n = (next + MOVES.length) % MOVES.length;
    setIdx(n);
    requestAnimationFrame(() => tabRefs.current[n]?.focus());
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault(); focusTab(i + 1); break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault(); focusTab(i - 1); break;
      case "Home":
        e.preventDefault(); focusTab(0); break;
      case "End":
        e.preventDefault(); focusTab(MOVES.length - 1); break;
    }
  }

  return (
    <div className="space-y-4">
      <div role="tablist" aria-orientation="horizontal" aria-label={isKh ? "ប្រភេទចលនា" : "Movement types"} className="flex flex-wrap gap-2">
        {MOVES.map((m, i) => {
          const Icon = m.icon;
          const isActive = i === idx;
          const t = MOVE_TINT[m.colour];
          return (
            <button
              key={m.key}
              ref={(el) => { tabRefs.current[i] = el; }}
              id={`he-tab-${m.key}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`he-tabpanel-${m.key}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setIdx(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-bold border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
                isActive
                  ? `${t.chip} border-transparent shadow-md`
                  : `bg-white text-slate-700 ${t.border} hover:bg-slate-50`
              } ${isKh ? "font-khmer" : ""}`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              <span>{isKh ? m.nameKh : m.nameEn}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`he-tabpanel-${active.key}`}
        role="tabpanel"
        aria-labelledby={`he-tab-${active.key}`}
        tabIndex={0}
        className={`bg-white rounded-2xl border-2 ${tint.border} overflow-hidden shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}
      >
        <div className={`flex items-center justify-between px-5 py-3 ${tint.bg} border-b ${tint.border}`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl ${tint.icon} flex items-center justify-center shadow-sm ${active.colour === "rose" ? "he-pump" : "he-flex"}`}>
              <ActiveIcon className="w-6 h-6" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className={`font-display font-bold text-lg sm:text-xl text-slate-900 ${isKh ? "font-khmer leading-tight" : ""}`}>
                {isKh ? active.nameKh : active.nameEn}
              </h3>
              <p className={`text-xs font-mono font-bold tracking-wide text-slate-500 ${isKh ? "font-khmer tracking-normal" : ""}`}>
                {isKh ? active.tagKh : active.tagEn}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? active.bodyKh : active.bodyEn}
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            <InfoBlock
              labelEn="The biology"
              labelKh="ជីវសាស្ត្រ"
              valueEn={active.mechanismEn}
              valueKh={active.mechanismKh}
              icon={Activity}
              colour={active.colour}
              isKh={isKh}
            />
            <InfoBlock
              labelEn={active.colour === "rose" ? "Why your brain wins too" : "The progressive overload rule"}
              labelKh={active.colour === "rose" ? "ហេតុអ្វីខួរក្បាលអ្នកក៏ឈ្នះ" : "ច្បាប់នៃការបន្ថែមបន្ទុកជាបណ្ដើរ"}
              valueEn={active.brainEn}
              valueKh={active.brainKh}
              icon={active.colour === "rose" ? Brain : Zap}
              colour={active.colour}
              isKh={isKh}
            />
          </div>

          <div>
            <div className={`text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ឧទាហរណ៍" : "Examples"}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(isKh ? active.examplesKh : active.examplesEn).map((ex) => (
                <span key={ex} className={`text-xs px-2 py-1 rounded-md border ${tint.soft} ${isKh ? "font-khmer" : ""}`}>
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({
  labelEn, labelKh, valueEn, valueKh, icon: Icon, colour, isKh,
}: {
  labelEn: string; labelKh: string;
  valueEn: string; valueKh: string;
  icon: typeof Brain;
  colour: "rose" | "orange";
  isKh: boolean;
}) {
  const accent = colour === "rose" ? "text-rose-700" : "text-orange-700";
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
      <div className={`flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider ${accent} ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
        <Icon className="w-3.5 h-3.5" strokeWidth={2} />
        {isKh ? labelKh : labelEn}
      </div>
      <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? valueKh : valueEn}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. Disease Cards — sedentary lifestyle warnings
// ════════════════════════════════════════════════════════════════════════════

type Disease = {
  key: string;
  icon: typeof HeartCrack;
  nameEn: string;
  nameKh: string;
  causeEn: string;
  causeKh: string;
  mechanismEn: string;
  mechanismKh: string;
  warningEn: string;
  warningKh: string;
  preventEn: string;
  preventKh: string;
};

const DISEASES: Disease[] = [
  {
    key: "obesity",
    icon: Cookie,
    nameEn: "Obesity",
    nameKh: "ជំងឺធាត់",
    causeEn: "Chronic caloric surplus + low movement",
    causeKh: "លើសកាឡូរីរ៉ាំរ៉ៃ + ចលនាតិច",
    mechanismEn:
      "When energy intake exceeds energy burnt for months and years, the body keeps storing the surplus as fat. The extra weight strains the joints (especially knees and back), and the organs work harder just to keep you alive — even when you are sitting still.",
    mechanismKh:
      "នៅពេលថាមពលដែលញុំាលើសពីថាមពលដែលដុតរយៈពេលច្រើនខែ និងច្រើនឆ្នាំ រាងកាយបន្តផ្ទុកការលើសនោះជាខ្លាញ់។ ទម្ងន់លើសធ្វើឲ្យសន្លាក់តានតឹង (ជាពិសេសជង្គង់ និងខ្នង) ហើយសរីរាង្គធ្វើការកាន់តែខ្លាំងគ្រាន់តែដើម្បីរក្សាជីវិតអ្នក — សូម្បីពេលអ្នកអង្គុយស្ងៀម។",
    warningEn:
      "Obesity is a doorway to type-2 diabetes, sleep apnoea, joint failure, and heart disease.",
    warningKh:
      "ជំងឺធាត់ជាទ្វារទៅរកជំងឺទឹកនោមផ្អែមប្រភេទ ២ ការឈប់ដកដង្ហើមពេលគេង សន្លាក់ខូច និងជំងឺបេះដូង។",
    preventEn:
      "Move every day. Choose water over sugary drinks. Eat protein and vegetables before reaching for a second bowl of rice.",
    preventKh:
      "ផ្លាស់ទីរាល់ថ្ងៃ។ ជ្រើសរើសទឹកជាជាងភេសជ្ជៈផ្អែម។ ញុំាប្រូតេអុីន និងបន្លែ មុនពេលយកចានបាយទីពីរ។",
  },
  {
    key: "heart",
    icon: HeartCrack,
    nameEn: "Heart Disease",
    nameKh: "ជំងឺបេះដូង",
    causeEn: "No cardio + diet high in fried/processed food",
    causeKh: "គ្មានកាឌីយ៉ូ + របបអាហារដែលមានចៀន/កែច្នៃច្រើន",
    mechanismEn:
      "Diets heavy in fried oil and processed snacks raise LDL cholesterol. The cholesterol slowly deposits as plaque on the inside of artery walls — exactly like rust building up inside a pipe. The pipe narrows, blood struggles to flow, and the heart has to pump harder and harder. Eventually, a piece of plaque can break loose and block the artery completely. That's a heart attack.",
    mechanismKh:
      "របបអាហារដែលមានប្រេងចៀន និងអាហារកែច្នៃច្រើន បង្កើនកូឡេស្តេរ៉ុល LDL។ កូឡេស្តេរ៉ុលនោះបង្គរបន្តិចម្ដងៗជាបន្ទះ (plaque) នៅខាងក្នុងជញ្ជាំងសរសៃឈាម — ដូចច្រេះដែលបង្គរនៅក្នុងបំពង់។ បំពង់ចង្អៀត ឈាមហូរពិបាក ហើយបេះដូងត្រូវបូមកាន់តែខ្លាំងឡើងៗ។ ទីបំផុត បំណែកនៃ plaque អាចបាក់ហើយស្ទះសរសៃឈាមទាំងស្រុង។ នោះគឺការគាំងបេះដូង។",
    warningEn:
      "Heart disease is the #1 cause of death worldwide — and it builds silently for 20–30 years before the first symptom.",
    warningKh:
      "ជំងឺបេះដូងគឺជាមូលហេតុលេខ ១ នៃការស្លាប់នៅលើពិភពលោក — ហើយវាបង្កើតយ៉ាងស្ងាត់ៗក្នុងរយៈពេល ២០–៣០ ឆ្នាំ មុនពេលរោគសញ្ញាដំបូង។",
    preventEn:
      "30 minutes of cardio most days, fish instead of fried meat once a week, and don't smoke. That alone cuts your risk by more than half.",
    preventKh:
      "កាឌីយ៉ូ ៣០ នាទីភាគច្រើននៃថ្ងៃ ត្រីជំនួសសាច់ចៀនម្ដងក្នុងមួយសប្ដាហ៍ និងកុំជក់បារី។ ប៉ុណ្ណេះកាត់បន្ថយហានិភ័យរបស់អ្នកជាងពាក់កណ្ដាល។",
  },
];

function DiseaseCards({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {DISEASES.map((d) => {
        const Icon = d.icon;
        return (
          <article key={d.key} className="bg-white rounded-2xl border-2 border-rose-200 shadow-sm overflow-hidden">
            {/* Clinical warning bar */}
            <div className="bg-gradient-to-r from-rose-600 to-rose-700 px-5 py-3 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-display font-bold text-lg sm:text-xl text-white ${isKh ? "font-khmer leading-tight" : ""}`}>
                  {isKh ? d.nameKh : d.nameEn}
                </h3>
                <p className={`text-xs text-rose-100 font-semibold ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? d.causeKh : d.causeEn}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Mechanism */}
              <div>
                <div className={`text-xs font-bold uppercase tracking-wider text-rose-700 mb-2 inline-flex items-center gap-1.5 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                  <Activity className="w-3.5 h-3.5" />
                  {isKh ? "របៀបដែលវាកើតឡើង" : "How it happens"}
                </div>
                <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {isKh ? d.mechanismKh : d.mechanismEn}
                </p>
              </div>

              {/* Warning callout */}
              <div className="bg-rose-50 border-l-4 border-rose-600 rounded-r-lg p-3">
                <div className={`text-xs font-bold uppercase tracking-wider text-rose-800 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                  {isKh ? "ការព្រមាន" : "Warning"}
                </div>
                <p className={`text-sm text-rose-900 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {isKh ? d.warningKh : d.warningEn}
                </p>
              </div>

              {/* Prevention */}
              <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-r-lg p-3">
                <div className={`text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1 inline-flex items-center gap-1.5 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                  <ChevronRight className="w-3.5 h-3.5" />
                  {isKh ? "របៀបបញ្ចៀស" : "How to prevent it"}
                </div>
                <p className={`text-sm text-emerald-900 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {isKh ? d.preventKh : d.preventEn}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4. Engine Fuel — Healthy vs. Unhealthy Choices
//  ឥន្ធនៈម៉ាស៊ីន៖ ជម្រើសអាហារល្អ និងមិនល្អ
// ════════════════════════════════════════════════════════════════════════════

/** Glowing energy-meter strip used as the divider into the fuel section. */
function EnergyMeterDivider({ isKh }: { isKh: boolean }) {
  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-testid="fuel-divider"
      aria-label={isKh ? "ឧបករណ៍វាស់ថាមពល" : "Energy meter divider"}
    >
      <div className="relative rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-700">
            <Gauge className="w-4 h-4 text-emerald-600 he-spark-pulse" aria-hidden="true" />
            <span>{isKh ? "ឧបករណ៍វាស់ឥន្ធនៈ" : "Fuel Quality Meter"}</span>
            <span className={`text-slate-400 font-semibold normal-case tracking-normal ${isKh ? "" : "font-khmer"}`}>
              · {isKh ? "Fuel Quality Meter" : "ឧបករណ៍វាស់ឥន្ធនៈ"}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] font-bold">
            <span className="inline-flex items-center gap-1 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {isKh ? "ល្អ" : "Good"}
            </span>
            <span className="inline-flex items-center gap-1 text-orange-700">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> {isKh ? "ប្រយ័ត្ន" : "Caution"}
            </span>
            <span className="inline-flex items-center gap-1 text-rose-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> {isKh ? "គ្រោះថ្នាក់" : "Danger"}
            </span>
          </div>
        </div>

        {/* The meter bar */}
        <div className="relative h-5 sm:h-6 rounded-full overflow-hidden bg-slate-100 he-meter-glow">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #10b981 0%, #84cc16 30%, #facc15 55%, #f97316 80%, #e11d48 100%)",
            }}
          />
          {/* Tick marks */}
          <div className="absolute inset-0 flex justify-between pointer-events-none">
            {[...Array(11)].map((_, i) => (
              <span key={i} className="w-px bg-white/40" />
            ))}
          </div>
          {/* Animated needle */}
          <div className="absolute top-0 bottom-0 left-0 he-meter-needle" style={{ width: "4%" }}>
            <div className="w-full h-full bg-white border-2 border-slate-800 rounded-sm shadow-md" />
          </div>
        </div>

        <p className={`mt-3 text-xs sm:text-sm text-slate-600 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "អាហារដែលអ្នកញ៉ាំ ផ្លាស់ប្ដូរទីតាំងនៃម្ជុលមួយនេះ — ពីបៃតង (ល្អ) ទៅក្រហម (គ្រោះថ្នាក់)។"
            : "The food you eat moves this needle — from green (great fuel) toward red (engine damage)."}
        </p>
      </div>
    </div>
  );
}

/** Side-by-side analogy explaining what high vs. low quality fuel does. */
function EngineAnalogy({ isKh }: { isKh: boolean }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      data-testid="engine-analogy"
    >
      {/* High-quality */}
      <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-6 h-6" strokeWidth={2.2} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-bold text-lg text-emerald-900">
              {isKh ? "ឥន្ធនៈគុណភាពខ្ពស់" : "High-Quality Fuel"}
            </h3>
            <p className={`text-xs font-semibold text-emerald-700 ${isKh ? "" : "font-khmer"}`}>
              {isKh ? "High-Quality Fuel" : "ឥន្ធនៈគុណភាពខ្ពស់"}
            </p>
          </div>
        </div>
        <p className={`text-sm text-emerald-900 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ឆេះយឺតៗ និងស្អាត — រក្សាម៉ាស៊ីន (រាងកាយ) របស់អ្នកឲ្យដំណើរការខ្លាំងពេញមួយថ្ងៃ ផ្ដល់សារធាតុចិញ្ចឹមដល់សាច់ដុំ ខួរក្បាល និងប្រព័ន្ធការពាររបស់អ្នក។"
            : "Burns slowly and cleanly — keeping your engine (body) running strong all day, feeding your muscles, brain, and immune system."}
        </p>
      </div>

      {/* Low-quality */}
      <div className="rounded-2xl border-2 border-rose-300 bg-gradient-to-br from-rose-50 to-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
            <AlertTriangle className="w-6 h-6" strokeWidth={2.2} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-bold text-lg text-rose-900">
              {isKh ? "ឥន្ធនៈគុណភាពទាប" : "Low-Quality Fuel"}
            </h3>
            <p className={`text-xs font-semibold text-rose-700 ${isKh ? "" : "font-khmer"}`}>
              {isKh ? "Low-Quality Fuel" : "ឥន្ធនៈគុណភាពទាប"}
            </p>
          </div>
        </div>
        <p className={`text-sm text-rose-900 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ឆេះលឿនពេក ស្ទះម៉ាស៊ីន ហើយបណ្ដាលឲ្យវាខូចតាមពេលវេលា — ផ្ដល់ថាមពលខ្លី រួចមកនឹងអារម្មណ៍នឿយហត់ និងជំងឺ។"
            : "Burns too fast, clogs the engine, and breaks it down over time — giving a short burst of energy followed by tiredness and disease."}
        </p>
      </div>
    </div>
  );
}

// ── Data: 4 healthy + 4 unhealthy foods ────────────────────────────────────
type FuelItem = {
  id: string;
  icon: typeof Fish;
  emoji: string;
  nameEn: string;
  nameKh: string;
  tagEn: string;
  tagKh: string;
  bodyEn: string;
  bodyKh: string;
};

const HEALTHY_FOODS: FuelItem[] = [
  {
    id: "fish",
    icon: Fish,
    emoji: "🐟",
    nameEn: "Fresh Fish",
    nameKh: "ត្រីស្រស់",
    tagEn: "Protein",
    tagKh: "ប្រូតេអុីន",
    bodyEn: "Builds strong muscles and helps your body repair itself after a long day at school or work.",
    bodyKh: "សាងសង់សាច់ដុំឲ្យរឹងមាំ និងជួយរាងកាយរបស់អ្នកជួសជុលខ្លួនឯងក្រោយថ្ងៃធ្វើការ ឬរៀនវែងៗ។",
  },
  {
    id: "morning-glory",
    icon: Leaf,
    emoji: "🥬",
    nameEn: "Morning Glory",
    nameKh: "ត្រកួន",
    tagEn: "Iron & Fiber",
    tagKh: "ជាតិដែក និងសរសៃ",
    bodyEn: "Cleans the engine inside, gives you iron for healthy blood, and keeps digestion running smoothly.",
    bodyKh: "សម្អាតម៉ាស៊ីននៅខាងក្នុង ផ្ដល់ជាតិដែកសម្រាប់ឈាមមានសុខភាពល្អ និងធ្វើឲ្យការរំលាយអាហារដំណើរការរលូន។",
  },
  {
    id: "brown-rice",
    icon: Wheat,
    emoji: "🍚",
    nameEn: "Brown Rice",
    nameKh: "អង្ករសម្រូប",
    tagEn: "Complex Carbs",
    tagKh: "កាបូអ៊ីដ្រាតស្មុគស្មាញ",
    bodyEn: "Long-lasting, slow-burning energy — keeps you focused in class without the sudden crash.",
    bodyKh: "ថាមពលឆេះយឺតៗ និងគង់វង្ស — ជួយឲ្យអ្នកផ្ដោតអារម្មណ៍ក្នុងថ្នាក់ ដោយគ្មានអារម្មណ៍ដួលរលំភ្លាមៗ។",
  },
  {
    id: "papaya-mango",
    icon: Apple,
    emoji: "🥭",
    nameEn: "Papaya & Mango",
    nameKh: "ល្ហុង និងស្វាយ",
    tagEn: "Vitamins & Antioxidants",
    tagKh: "វីតាមីន និងសារធាតុប្រឆាំងអុកស៊ីតកម្ម",
    bodyEn: "Protects the engine from getting sick — vitamin C, vitamin A, and antioxidants strengthen your immune system.",
    bodyKh: "ការពារម៉ាស៊ីនមិនឲ្យឈឺ — វីតាមីន C វីតាមីន A និងសារធាតុប្រឆាំងអុកស៊ីតកម្ម ពង្រឹងប្រព័ន្ធការពាររបស់អ្នក។",
  },
];

const UNHEALTHY_FOODS: FuelItem[] = [
  {
    id: "instant-noodles",
    icon: Soup,
    emoji: "🍜",
    nameEn: "Instant Noodles",
    nameKh: "មីកញ្ចប់",
    tagEn: "Too much salt",
    tagKh: "អំបិលច្រើនពេក",
    bodyEn: "Very high in salt, raises your blood pressure, and offers very little real energy or nutrients.",
    bodyKh: "មានអំបិលច្រើនពេក បង្កើនសម្ពាធឈាម និងផ្ដល់ថាមពល ឬសារធាតុចិញ្ចឹមពិតប្រាកដតិចតួចបំផុត។",
  },
  {
    id: "energy-drinks",
    icon: CupSoda,
    emoji: "🥤",
    nameEn: "Sugary Energy Drinks",
    nameKh: "ភេសជ្ជៈប៉ូវកម្លាំង",
    tagEn: "Sugar spike & crash",
    tagKh: "ស្ករឡើង និងធ្លាក់ចុះ",
    bodyEn: "Causes a fast spike in energy, then a 'crash' that makes you feel even more tired than before.",
    bodyKh: "បណ្ដាលឲ្យថាមពលឡើងលឿន រួចហើយ 'ធ្លាក់ចុះ' ដែលធ្វើឲ្យអ្នកមានអារម្មណ៍នឿយហត់ជាងមុន។",
  },
  {
    id: "fried-snacks",
    icon: Drumstick,
    emoji: "🍢",
    nameEn: "Deep-Fried Street Snacks",
    nameKh: "នំចៀន",
    tagEn: "Bad fats",
    tagKh: "ខ្លាញ់មិនល្អ",
    bodyEn: "Clogs the engine's 'pipes' (your blood vessels) with unhealthy fats that build up over years.",
    bodyKh: "ស្ទះ 'បំពង់' របស់ម៉ាស៊ីន (សរសៃឈាមរបស់អ្នក) ដោយខ្លាញ់មិនល្អដែលកកក្នុងរយៈពេលជាច្រើនឆ្នាំ។",
  },
  {
    id: "candies",
    icon: Candy,
    emoji: "🍬",
    nameEn: "Hard Candies",
    nameKh: "ស្ករគ្រាប់",
    tagEn: "Zero nutrition",
    tagKh: "គ្មានសារធាតុចិញ្ចឹម",
    bodyEn: "Damages the teeth — the very first step of digestion — and provides no vitamins or minerals at all.",
    bodyKh: "ធ្វើឲ្យធ្មេញខូច — ជំហានដំបូងបង្អស់នៃការរំលាយអាហារ — ហើយមិនផ្ដល់វីតាមីន ឬជាតិរ៉ែទាល់តែសោះ។",
  },
];

/** Two-grid layout: green for healthy, red/orange for unhealthy. */
function FuelGrid({ kind, isKh }: { kind: "healthy" | "unhealthy"; isKh: boolean }) {
  // Single shared "currently speaking" state per grid keeps tap UX snappy.
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Cancel any in-flight utterance when this grid unmounts (e.g. nav away).
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const items = kind === "healthy" ? HEALTHY_FOODS : UNHEALTHY_FOODS;
  const isHealthy = kind === "healthy";

  const headingEn = isHealthy
    ? "High-Quality Fuel · Healthy Food"
    : "Low-Quality Fuel · Unhealthy Food";
  const headingKh = isHealthy
    ? "ឥន្ធនៈគុណភាពខ្ពស់ · អាហារល្អសម្រាប់សុខភាព"
    : "ឥន្ធនៈគុណភាពទាប · អាហារមិនល្អសម្រាប់សុខភាព";

  const subEn = isHealthy
    ? "Local foods that fuel a strong, focused, healthy engine."
    : "Common processed foods that quietly damage the engine.";
  const subKh = isHealthy
    ? "អាហារក្នុងស្រុកដែលផ្ដល់ឥន្ធនៈដល់ម៉ាស៊ីនមួយដែលរឹងមាំ ផ្ដោតអារម្មណ៍ និងមានសុខភាពល្អ។"
    : "អាហារកែច្នៃធម្មតាដែលបំផ្លាញម៉ាស៊ីនយ៉ាងស្ងាត់ៗ។";

  function play(item: FuelItem) {
    setSpeakingId(item.id);
    const result = speakText(item.nameEn, "en-US", {
      onEnd: () => setSpeakingId((cur) => (cur === item.id ? null : cur)),
      onError: () => setSpeakingId((cur) => (cur === item.id ? null : cur)),
    });
    if (!result.ok) setSpeakingId(null);
  }

  return (
    <div data-testid={`fuel-grid-${kind}`}>
      {/* Sub-heading bar */}
      <div
        className={`flex items-start gap-3 rounded-2xl border-2 p-4 mb-4 ${
          isHealthy
            ? "border-emerald-300 bg-emerald-50/70"
            : "border-rose-300 bg-rose-50/70"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
            isHealthy ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
          }`}
        >
          {isHealthy ? (
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          ) : (
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className={`font-display font-bold text-lg sm:text-xl ${
              isHealthy ? "text-emerald-900" : "text-rose-900"
            } ${isKh ? "font-khmer leading-tight" : ""}`}
          >
            {isKh ? headingKh : headingEn}
          </h3>
          <p
            className={`mt-0.5 text-xs sm:text-sm font-semibold ${
              isHealthy ? "text-emerald-700" : "text-rose-700"
            } ${isKh ? "" : "font-khmer"}`}
          >
            {isKh ? headingEn : headingKh}
          </p>
          <p
            className={`mt-1 text-sm ${
              isHealthy ? "text-emerald-900/80" : "text-rose-900/80"
            } ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {isKh ? subKh : subEn}
          </p>
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            isHealthy={isHealthy}
            isPlaying={speakingId === item.id}
            onPlay={() => play(item)}
            isKh={isKh}
          />
        ))}
      </div>
    </div>
  );
}

/** Single food card with TTS Play button. Bilingual name shown always. */
function FoodCard({
  item,
  isHealthy,
  isPlaying,
  onPlay,
  isKh,
}: {
  item: FuelItem;
  isHealthy: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  isKh: boolean;
}) {
  const Icon = item.icon;
  const palette = isHealthy
    ? {
        border: "border-emerald-300",
        bg: "bg-gradient-to-br from-emerald-50 via-white to-lime-50",
        chip: "bg-emerald-600 text-white",
        chipText: "text-emerald-800 bg-emerald-100",
        body: "text-emerald-900",
        play: "bg-emerald-600 hover:bg-emerald-700 text-white focus-visible:ring-emerald-300",
        ringTint: "ring-emerald-200",
      }
    : {
        border: "border-rose-300",
        bg: "bg-gradient-to-br from-rose-50 via-white to-orange-50",
        chip: "bg-rose-600 text-white",
        chipText: "text-rose-800 bg-rose-100",
        body: "text-rose-900",
        play: "bg-rose-600 hover:bg-rose-700 text-white focus-visible:ring-rose-300",
        ringTint: "ring-rose-200",
      };

  return (
    <article
      data-testid={`fuel-card-${item.id}`}
      className={`relative rounded-2xl border-2 ${palette.border} ${palette.bg} p-4 sm:p-5 shadow-sm flex flex-col he-bounce-soft transition-shadow hover:shadow-lg`}
    >
      {/* Icon row */}
      <div className="flex items-center justify-between mb-2">
        <div
          className={`w-10 h-10 rounded-xl ${palette.chip} flex items-center justify-center shadow-sm shrink-0`}
          aria-hidden="true"
        >
          <Icon className="w-5 h-5" strokeWidth={2.1} />
        </div>
        <span className="text-4xl sm:text-5xl select-none" aria-hidden="true">
          {item.emoji}
        </span>
      </div>

      {/* Always-bilingual name pair */}
      <div className="mt-1">
        <h4 className={`font-display font-black text-lg sm:text-xl text-slate-900 leading-tight`}>
          {item.nameEn}
        </h4>
        <p className="mt-0.5 font-khmer text-base text-slate-700 leading-loose">
          {item.nameKh}
        </p>
      </div>

      {/* Nutrient / warning tag */}
      <div className="mt-2">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${palette.chipText} ${
            isKh ? "font-khmer" : ""
          }`}
        >
          {isKh ? item.tagKh : item.tagEn}
        </span>
      </div>

      {/* Body */}
      <p
        className={`mt-2.5 text-sm flex-1 ${palette.body} ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? item.bodyKh : item.bodyEn}
      </p>

      {/* Play button — speaks the English name */}
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Play audio for ${item.nameEn} (${item.nameKh})`}
        data-testid={`btn-play-${item.id}`}
        className={`mt-4 self-start inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all focus:outline-none focus-visible:ring-4 ${palette.play}`}
      >
        <Volume2
          className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`}
          aria-hidden="true"
        />
        <span>{isKh ? "ស្ដាប់" : "Play"}</span>
        <span className={`text-[11px] opacity-80 ${isKh ? "" : "font-khmer"}`}>
          · {isKh ? "Play" : "ស្ដាប់"}
        </span>
      </button>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · The Spark Plugs — Vitamins & Minerals
//  ប៊ូស៊ីបញ្ឆេះម៉ាស៊ីន៖ វីតាមីន និងសារធាតុរ៉ែ
// ════════════════════════════════════════════════════════════════════════════

type Micronutrient = {
  id: string;
  nameEn: string;
  nameKh: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  funcEn: string;
  funcKh: string;
  sourcesEn: string;
  sourcesKh: string;
  defEn: string;
  defKh: string;
};

const VITAMINS: Micronutrient[] = [
  {
    id: "a",
    nameEn: "Vitamin A",
    nameKh: "វីតាមីន A",
    Icon: Eye,
    funcEn: "Vision and immunity.",
    funcKh: "ការមើលឃើញ និងភាពស៊ាំ។",
    sourcesEn: "Papaya, carrots, sweet potatoes, liver.",
    sourcesKh: "ល្ហុង ការ៉ុត ដំឡូងជ្វា ថ្លើម។",
    defEn: "Night blindness.",
    defKh: "ខ្វាក់ភ្នែកពេលយប់។",
  },
  {
    id: "b",
    nameEn: "Vitamin B-Complex",
    nameKh: "វីតាមីន B-Complex",
    Icon: Zap,
    funcEn: "Energy production, brain function, and metabolism.",
    funcKh: "ផលិតថាមពល មុខងារខួរក្បាល និងការរំលាយអាហារ។",
    sourcesEn: "Brown rice, eggs, meat, leafy greens.",
    sourcesKh: "អង្ករសំរូប ស៊ុត សាច់ បន្លែស្លឹកបៃតង។",
    defEn: "Severe fatigue, weakness.",
    defKh: "ការនឿយហត់ខ្លាំង កម្លាំងថយចុះ។",
  },
  {
    id: "c",
    nameEn: "Vitamin C",
    nameKh: "វីតាមីន C",
    Icon: Shield,
    funcEn: "Antioxidant, immune support, and collagen production.",
    funcKh: "សារធាតុប្រឆាំងអុកស៊ីតកម្ម គាំទ្រភាពស៊ាំ និងផលិតកូឡាហ្សែន។",
    sourcesEn: "Guava, citrus, tomatoes.",
    sourcesKh: "ត្របែក ផ្លែឈើជូរ ប៉េងប៉ោះ។",
    defEn: "Bleeding gums, slow healing.",
    defKh: "អញ្ចាញធ្មេញហូរឈាម ដំបៅជាសះស្បើយយឺត។",
  },
  {
    id: "d",
    nameEn: "Vitamin D",
    nameKh: "វីតាមីន D",
    Icon: Sun,
    funcEn: "Calcium absorption and bone health.",
    funcKh: "ការស្រូបយកជាតិកាល់ស្យូម និងសុខភាពឆ្អឹង។",
    sourcesEn: "Sunlight, fatty fish.",
    sourcesKh: "ពន្លឺព្រះអាទិត្យ ត្រីដែលមានជាតិខ្លាញ់។",
    defEn: "Soft, aching bones (Rickets in children).",
    defKh: "ឆ្អឹងទន់ និងឈឺ (ជំងឺ Rickets ចំពោះកុមារ)។",
  },
  {
    id: "e",
    nameEn: "Vitamin E",
    nameKh: "វីតាមីន E",
    Icon: Leaf,
    funcEn: "Protects cells from damage.",
    funcKh: "ការពារកោសិកាពីការខូចខាត។",
    sourcesEn: "Nuts, seeds, vegetable oils.",
    sourcesKh: "គ្រាប់ផ្លែឈើ គ្រាប់ធញ្ញជាតិ ប្រេងបន្លែ។",
    defEn: "Muscle weakness, vision problems.",
    defKh: "សាច់ដុំខ្សោយ បញ្ហានៃការមើលឃើញ។",
  },
  {
    id: "k",
    nameEn: "Vitamin K",
    nameKh: "វីតាមីន K",
    Icon: Bandage,
    funcEn: "Blood clotting and bone health.",
    funcKh: "ការកករឈាម និងសុខភាពឆ្អឹង។",
    sourcesEn: "Leafy greens (morning glory, spinach).",
    sourcesKh: "បន្លែស្លឹកបៃតង (ត្រកួន ស្ពៃ)។",
    defEn: "Excessive bleeding from small cuts.",
    defKh: "ការហូរឈាមច្រើនពេកពីមុខរបួសតូចៗ។",
  },
];

const MINERALS: Micronutrient[] = [
  {
    id: "ca",
    nameEn: "Calcium",
    nameKh: "កាល់ស្យូម",
    Icon: Bone,
    funcEn: "Strong bones, teeth, and muscle function.",
    funcKh: "ឆ្អឹងរឹងមាំ ធ្មេញ និងមុខងារសាច់ដុំ។",
    sourcesEn: "Small fish (eaten with bones), dairy, dark greens.",
    sourcesKh: "ត្រីតូច (ញ៉ាំទាំងឆ្អឹង) ផលិតផលទឹកដោះគោ បន្លែបៃតងដិត។",
    defEn: "Stunted growth, brittle bones.",
    defKh: "ការលូតលាស់យឺត ឆ្អឹងផុយ។",
  },
  {
    id: "fe",
    nameEn: "Iron",
    nameKh: "ជាតិដែក",
    Icon: Droplets,
    funcEn: "Transports oxygen in the blood.",
    funcKh: "ដឹកជញ្ជូនអុកស៊ីសែននៅក្នុងឈាម។",
    sourcesEn: "Red meat, beans, spinach.",
    sourcesKh: "សាច់ក្រហម សណ្ដែក ស្ពៃ។",
    defEn: "Anemia (extreme exhaustion, pale skin).",
    defKh: "ស្លេកស្លាំង (ការនឿយហត់ខ្លាំង ស្បែកស្លេក)។",
  },
  {
    id: "mg",
    nameEn: "Magnesium",
    nameKh: "ម៉ាញ៉េស្យូម",
    Icon: Brain,
    funcEn: "Nerve function, blood pressure, and bone strength.",
    funcKh: "មុខងារសរសៃប្រសាទ សម្ពាធឈាម និងភាពរឹងមាំនៃឆ្អឹង។",
    sourcesEn: "Nuts, seeds, legumes.",
    sourcesKh: "គ្រាប់ផ្លែឈើ គ្រាប់ធញ្ញជាតិ សណ្ដែក។",
    defEn: "Muscle cramps, twitches.",
    defKh: "សាច់ដុំកន្ត្រាក់ និងញ័រ។",
  },
  {
    id: "k-mineral",
    nameEn: "Potassium",
    nameKh: "ប៉ូតាស្យូម",
    Icon: Heart,
    funcEn: "Healthy blood pressure and nerve function.",
    funcKh: "សម្ពាធឈាមធម្មតា និងមុខងារសរសៃប្រសាទ។",
    sourcesEn: "Bananas, coconut water, potatoes.",
    sourcesKh: "ចេក ទឹកដូង ដំឡូងបារាំង។",
    defEn: "Severe muscle cramps, irregular heartbeat.",
    defKh: "សាច់ដុំកន្ត្រាក់ខ្លាំង បេះដូងលោតមិនទៀងទាត់។",
  },
  {
    id: "zn",
    nameEn: "Zinc",
    nameKh: "ស័ង្កសី",
    Icon: Plus,
    funcEn: "Immune function, DNA synthesis, wound healing.",
    funcKh: "មុខងារភាពស៊ាំ ការសំយោគ DNA ការជាសះស្បើយនៃរបួស។",
    sourcesEn: "Meat, shellfish, legumes.",
    sourcesKh: "សាច់ គ្រឿងសមុទ្រសំបក សណ្ដែក។",
    defEn: "Frequent sickness, hair loss.",
    defKh: "ឈឺញឹកញាប់ ជ្រុះសក់។",
  },
  {
    id: "i",
    nameEn: "Iodine",
    nameKh: "អ៊ីយ៉ូត",
    Icon: Megaphone,
    funcEn: "Thyroid function and metabolism.",
    funcKh: "មុខងារក្រពេញទីរ៉ូអ៊ីត និងការរំលាយអាហារ។",
    sourcesEn: "Iodized salt, seafood.",
    sourcesKh: "អំបិលដែលមានជាតិអ៊ីយ៉ូត គ្រឿងសមុទ្រ។",
    defEn: "Swollen neck (Goiter), developmental delays.",
    defKh: "ករហើម (Goiter) ការវិវឌ្ឍយឺត។",
  },
];

function SparkPlugs({ isKh }: { isKh: boolean }) {
  return (
    <div className="space-y-8" data-testid="spark-plugs-root">
      {/* ── 2A · Solubility callouts ──────────────────────────────── */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
        data-testid="sp-solubility"
      >
        <SolubilityCard
          isKh={isKh}
          tone="water"
          icon={<Droplets className="w-5 h-5" aria-hidden="true" />}
          titleEn="Water-Soluble Vitamins"
          titleKh="វីតាមីនរលាយក្នុងទឹក"
          bodyEn={
            'These wash out of your system quickly. You must "top them off" every single day.'
          }
          bodyKh="ពួកវាហូរចេញពីរាងកាយលឿន។ អ្នកត្រូវ «បំពេញ» ពួកវាឡើងវិញរៀងរាល់ថ្ងៃ។"
          tagEn="Vitamins B & C"
          tagKh="វីតាមីន B និង C"
        />
        <SolubilityCard
          isKh={isKh}
          tone="fat"
          icon={<Flame className="w-5 h-5" aria-hidden="true" />}
          titleEn="Fat-Soluble Vitamins"
          titleKh="វីតាមីនរលាយក្នុងខ្លាញ់"
          bodyEn={
            "These are stored in the body's fat and liver for future use. Be careful not to overfill them."
          }
          bodyKh="ពួកវាត្រូវបានរក្សាទុកក្នុងខ្លាញ់ និងថ្លើមរបស់រាងកាយសម្រាប់ប្រើពេលក្រោយ។ ប្រយ័ត្នកុំបំពេញហួសកម្រិត។"
          tagEn="Vitamins A, D, E, K"
          tagKh="វីតាមីន A, D, E, K"
        />
      </div>

      {/* ── 2B · Vitamin grid ─────────────────────────────────────── */}
      <MicroGroup
        isKh={isKh}
        kind="vitamins"
        eyebrowEn="Vitamins"
        eyebrowKh="វីតាមីន"
        headlineEn="Six tiny sparks that keep the engine running"
        headlineKh="ប៊ូស៊ីតូចៗប្រាំមួយ ដែលធ្វើឱ្យម៉ាស៊ីនដំណើរការ"
        items={VITAMINS}
      />

      {/* ── 2C · Mineral grid ─────────────────────────────────────── */}
      <MicroGroup
        isKh={isKh}
        kind="minerals"
        eyebrowEn="Minerals"
        eyebrowKh="សារធាតុរ៉ែ"
        headlineEn="Six earth elements your cells cannot live without"
        headlineKh="ធាតុដីប្រាំមួយ ដែលកោសិការបស់អ្នកមិនអាចរស់នៅគ្មាន"
        items={MINERALS}
      />

      {/* ── 2D · Mechanic's Rules — Synergy ───────────────────────── */}
      <SynergyBlock isKh={isKh} />
    </div>
  );
}

// ── Solubility callout ─────────────────────────────────────────────────
function SolubilityCard({
  isKh,
  tone,
  icon,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  tagEn,
  tagKh,
}: {
  isKh: boolean;
  tone: "water" | "fat";
  icon: React.ReactNode;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  tagEn: string;
  tagKh: string;
}) {
  const palette =
    tone === "water"
      ? {
          bg: "bg-sky-50",
          border: "border-sky-200",
          text: "text-sky-900",
          tint: "bg-sky-100 text-sky-700",
          tagBg: "bg-sky-600",
        }
      : {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-900",
          tint: "bg-amber-100 text-amber-700",
          tagBg: "bg-amber-600",
        };
  return (
    <div
      className={`rounded-2xl border-2 ${palette.bg} ${palette.border} p-4 sm:p-5`}
      data-testid={`sp-solubility-${tone}`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${palette.tint}`}
          aria-hidden="true"
        >
          {icon}
        </div>
        <h3
          className={`font-extrabold text-base sm:text-lg ${palette.text} ${isKh ? "font-khmer leading-loose" : ""}`}
        >
          {isKh ? titleKh : titleEn}
        </h3>
      </div>
      <p
        className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {isKh ? bodyKh : bodyEn}
      </p>
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold text-white ${palette.tagBg} ${isKh ? "font-khmer text-xs" : ""}`}
      >
        {isKh ? tagKh : tagEn}
      </span>
    </div>
  );
}

// ── Vitamins / Minerals grid wrapper ───────────────────────────────────
function MicroGroup({
  isKh,
  kind,
  eyebrowEn,
  eyebrowKh,
  headlineEn,
  headlineKh,
  items,
}: {
  isKh: boolean;
  kind: "vitamins" | "minerals";
  eyebrowEn: string;
  eyebrowKh: string;
  headlineEn: string;
  headlineKh: string;
  items: Micronutrient[];
}) {
  const palette =
    kind === "vitamins"
      ? {
          eyebrow: "text-amber-700",
          banner: "from-amber-50 via-yellow-50 to-amber-50 border-amber-200",
          chip: "bg-amber-100 text-amber-800 border-amber-200",
          iconWrap: "bg-amber-100 text-amber-700",
          iconRing: "ring-amber-200",
          headlineColor: "text-amber-900",
        }
      : {
          eyebrow: "text-slate-700",
          banner:
            "from-slate-50 via-stone-50 to-slate-50 border-slate-300",
          chip: "bg-slate-200 text-slate-800 border-slate-300",
          iconWrap: "bg-slate-200 text-slate-700",
          iconRing: "ring-slate-300",
          headlineColor: "text-slate-800",
        };
  return (
    <div data-testid={`sp-group-${kind}`}>
      <div
        className={`rounded-2xl border-2 bg-gradient-to-r ${palette.banner} px-4 py-3 mb-4`}
      >
        <div
          className={`text-[11px] font-bold tracking-widest uppercase ${palette.eyebrow} mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}
        >
          {isKh ? eyebrowKh : eyebrowEn}
        </div>
        <h3
          className={`font-extrabold text-lg sm:text-xl ${palette.headlineColor} ${isKh ? "font-khmer leading-loose" : ""}`}
        >
          {isKh ? headlineKh : headlineEn}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {items.map((n) => (
          <MicroCard
            key={n.id}
            kind={kind}
            isKh={isKh}
            item={n}
            chipClass={palette.chip}
            iconWrap={palette.iconWrap}
            iconRing={palette.iconRing}
          />
        ))}
      </div>
    </div>
  );
}

function MicroCard({
  isKh,
  kind,
  item,
  chipClass,
  iconWrap,
  iconRing,
}: {
  isKh: boolean;
  kind: "vitamins" | "minerals";
  item: Micronutrient;
  chipClass: string;
  iconWrap: string;
  iconRing: string;
}) {
  const Icon = item.Icon;
  return (
    <div
      className="rounded-2xl border-2 bg-white border-slate-200 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
      data-testid={`sp-card-${kind}-${item.id}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ring-4 ${iconWrap} ${iconRing}`}
          aria-hidden="true"
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className={`font-extrabold text-base text-slate-900 leading-tight ${isKh ? "font-khmer leading-loose" : ""}`}
          >
            {isKh ? item.nameKh : item.nameEn}
          </h4>
          <span
            className={`inline-block mt-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${chipClass} ${isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}
          >
            {kind === "vitamins"
              ? isKh
                ? "វីតាមីន"
                : "Vitamin"
              : isKh
              ? "សារធាតុរ៉ែ"
              : "Mineral"}
          </span>
        </div>
      </div>

      <MicroFact
        isKh={isKh}
        labelEn="Function"
        labelKh="មុខងារ"
        bodyEn={item.funcEn}
        bodyKh={item.funcKh}
        toneClass="text-emerald-700"
      />
      <MicroFact
        isKh={isKh}
        labelEn="Sources"
        labelKh="ប្រភព"
        bodyEn={item.sourcesEn}
        bodyKh={item.sourcesKh}
        toneClass="text-sky-700"
      />
      <MicroFact
        isKh={isKh}
        labelEn="Deficiency"
        labelKh="ការខ្វះខាត"
        bodyEn={item.defEn}
        bodyKh={item.defKh}
        toneClass="text-rose-700"
        warn
      />
    </div>
  );
}

function MicroFact({
  isKh,
  labelEn,
  labelKh,
  bodyEn,
  bodyKh,
  toneClass,
  warn,
}: {
  isKh: boolean;
  labelEn: string;
  labelKh: string;
  bodyEn: string;
  bodyKh: string;
  toneClass: string;
  warn?: boolean;
}) {
  return (
    <div>
      <div
        className={`flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest mb-0.5 ${toneClass} ${isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}
      >
        {warn && <AlertTriangle className="w-3 h-3" aria-hidden="true" />}
        <span>{isKh ? labelKh : labelEn}</span>
      </div>
      <p
        className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {isKh ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

// ── 2D · Mechanic's Rules (Nutrient Synergy) ───────────────────────────
function SynergyBlock({ isKh }: { isKh: boolean }) {
  return (
    <div data-testid="sp-synergy">
      <div className="rounded-2xl border-2 bg-gradient-to-r from-emerald-50 via-amber-50 to-emerald-50 border-emerald-200 px-4 py-3 mb-4">
        <div
          className={`text-[11px] font-bold tracking-widest uppercase text-emerald-700 mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}
        >
          {isKh ? "ច្បាប់របស់មេជាងម៉ាស៊ីន" : "The Mechanic's Rules"}
        </div>
        <h3
          className={`font-extrabold text-lg sm:text-xl text-slate-900 ${isKh ? "font-khmer leading-loose" : ""}`}
        >
          {isKh
            ? "សហថាមពលនៃសារធាតុចិញ្ចឹម — របៀបដែលពួកវាជួយគ្នាទៅវិញទៅមក"
            : "Nutrient Synergy — How they help each other"}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SynergyCard
          isKh={isKh}
          testId="sp-synergy-iron"
          icon={<Droplets className="w-5 h-5" aria-hidden="true" />}
          tagEn="The Iron Helper"
          tagKh="ជំនួយការសម្រាប់ជាតិដែក"
          pairEn="Vitamin C + Iron"
          pairKh="វីតាមីន C + ជាតិដែក"
          bodyEn="Vitamin C helps your body absorb Iron. Eat guava or squeeze lime on your dark leafy greens — your blood will thank you!"
          bodyKh="វីតាមីន C ជួយឱ្យរាងកាយរបស់អ្នកស្រូបយកជាតិដែក។ ញ៉ាំត្របែក ឬច្របាច់ក្រូចឆ្មារលើបន្លែស្លឹកបៃតងដិត — ឈាមរបស់អ្នកនឹងអរគុណ!"
          accent="emerald"
        />
        <SynergyCard
          isKh={isKh}
          testId="sp-synergy-bone"
          icon={<Bone className="w-5 h-5" aria-hidden="true" />}
          tagEn="The Bone Builders"
          tagKh="អ្នកសាងសង់ឆ្អឹង"
          pairEn="Vitamin D + Calcium"
          pairKh="វីតាមីន D + កាល់ស្យូម"
          bodyEn="Vitamin D acts as the key that unlocks Calcium so your body can absorb it. You need both for strong bones — sunlight helps Vitamin D, dairy and small fish bring the Calcium."
          bodyKh="វីតាមីន D ដើរតួជាសោដែលដោះសោកាល់ស្យូម ដើម្បីឱ្យរាងកាយរបស់អ្នកស្រូបយកវាបាន។ អ្នកត្រូវការទាំងពីរសម្រាប់ឆ្អឹងរឹងមាំ — ពន្លឺព្រះអាទិត្យជួយវីតាមីន D ផលិតផលទឹកដោះ និងត្រីតូចផ្ដល់កាល់ស្យូម។"
          accent="amber"
        />
      </div>
    </div>
  );
}

function SynergyCard({
  isKh,
  testId,
  icon,
  tagEn,
  tagKh,
  pairEn,
  pairKh,
  bodyEn,
  bodyKh,
  accent,
}: {
  isKh: boolean;
  testId: string;
  icon: React.ReactNode;
  tagEn: string;
  tagKh: string;
  pairEn: string;
  pairKh: string;
  bodyEn: string;
  bodyKh: string;
  accent: "emerald" | "amber";
}) {
  const tones =
    accent === "emerald"
      ? {
          border: "border-emerald-200",
          bg: "bg-emerald-50/50",
          iconBg: "bg-emerald-100 text-emerald-700",
          tag: "bg-emerald-600",
          pair: "text-emerald-800",
        }
      : {
          border: "border-amber-200",
          bg: "bg-amber-50/50",
          iconBg: "bg-amber-100 text-amber-700",
          tag: "bg-amber-600",
          pair: "text-amber-800",
        };
  return (
    <div
      className={`rounded-2xl border-2 ${tones.border} ${tones.bg} p-4 sm:p-5`}
      data-testid={testId}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${tones.iconBg}`}
          aria-hidden="true"
        >
          {icon}
        </div>
        <div className="flex flex-col">
          <span
            className={`inline-flex items-center self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${tones.tag} ${isKh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}
          >
            {isKh ? tagKh : tagEn}
          </span>
          <span
            className={`mt-1 font-extrabold text-base ${tones.pair} ${isKh ? "font-khmer leading-loose" : ""}`}
          >
            {isKh ? pairKh : pairEn}
          </span>
        </div>
      </div>
      <p
        className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {isKh ? bodyKh : bodyEn}
      </p>
    </div>
  );
}
