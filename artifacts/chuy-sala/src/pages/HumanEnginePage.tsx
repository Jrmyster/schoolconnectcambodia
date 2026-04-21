import { useRef, useState, type KeyboardEvent } from "react";
import {
  Activity,
  Apple,
  Beef,
  Bike,
  Brain,
  ChevronRight,
  Cookie,
  Droplets,
  Dumbbell,
  Flame,
  Heart,
  HeartCrack,
  Minus,
  Plus,
  Quote,
  Scale,
  Sparkles,
  Wheat,
  Zap,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

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

      {/* ── Section 2: Movement ──────────────────────────────────────── */}
      <Section
        id="movement"
        eyebrowEn="02 · Movement"
        eyebrowKh="០២ · ចលនា"
        titleEn="The science of movement"
        titleKh="វិទ្យាសាស្ត្រនៃចលនា"
        descEn="Exercise isn't just about looking good. Biologically, it strengthens your heart, grows your muscles, and sharpens your brain. There are two main families."
        descKh="លំហាត់ប្រាណមិនត្រឹមតែដើម្បីរូបរាងស្អាតទេ។ តាមជីវសាស្ត្រ វាពង្រឹងបេះដូងរបស់អ្នក ធ្វើឲ្យសាច់ដុំធំឡើង និងធ្វើឲ្យខួរក្បាលរបស់អ្នកមុតស្រួច។ មានគ្រួសារសំខាន់ពីរ។"
        accent="orange"
        isKh={isKh}
      >
        <MovementTabs isKh={isKh} />
      </Section>

      {/* ── Section 3: Rust ──────────────────────────────────────────── */}
      <Section
        id="rust"
        eyebrowEn="03 · Warning"
        eyebrowKh="០៣ · ការព្រមាន"
        titleEn="The dangers of 'rust'"
        titleKh="គ្រោះថ្នាក់នៃ 'ច្រេះ'"
        descEn="An engine that never moves, fuelled with the wrong fuel, breaks down. The same is true for your body. These are the diseases that quietly grow when we sit too long."
        descKh="ម៉ាស៊ីនដែលមិនដែលផ្លាស់ទី និងបានបញ្ចូលឥន្ធនៈខុស នឹងខូច។ ដូចគ្នានេះដែរសម្រាប់រាងកាយរបស់អ្នក។ ទាំងនេះគឺជាជំងឺដែលលូតលាស់ស្ងាត់ៗនៅពេលយើងអង្គុយយូរពេក។"
        accent="rose"
        isKh={isKh}
      >
        <DiseaseCards isKh={isKh} />
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
  accent: "emerald" | "orange" | "rose";
  isKh: boolean;
  children: React.ReactNode;
}) {
  const eyebrowColor =
    accent === "emerald" ? "text-emerald-700"
    : accent === "orange" ? "text-orange-700"
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
