import { useState } from "react";
import { Link } from "wouter";
import {
  Compass,
  Leaf,
  Cpu,
  Users,
  MessageCircle,
  Sprout,
  GraduationCap,
  Heart,
  BookOpenCheck,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Check,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ================================================================ */
/*  TYPES + DATA                                                    */
/* ================================================================ */

type Curiosity = "nature" | "tech" | "society" | "communication";
type Level = "beginner" | "advanced";
type Goal = "community" | "exams" | "career";

interface Option<T extends string> {
  value: T;
  Icon: typeof Leaf;
  labelEn: string;
  labelKh: string;
  blurbEn: string;
  blurbKh: string;
  accent: string; // gradient classes for the option tile icon
}

const Q1_OPTIONS: Option<Curiosity>[] = [
  {
    value: "nature",
    Icon: Leaf,
    labelEn: "Nature & Life",
    labelKh: "ធម្មជាតិ និងជីវិត",
    blurbEn: "Plants, animals, the body, the earth.",
    blurbKh: "រុក្ខជាតិ សត្វ រាងកាយ និងផែនដី។",
    accent: "from-emerald-300 to-green-600",
  },
  {
    value: "tech",
    Icon: Cpu,
    labelEn: "Machines & Tech",
    labelKh: "ម៉ាស៊ីន និងបច្ចេកវិទ្យា",
    blurbEn: "Computers, physics, how things work.",
    blurbKh: "កុំព្យូទ័រ រូបវិទ្យា និងរបៀបដែលរបស់ដំណើរការ។",
    accent: "from-sky-300 to-indigo-600",
  },
  {
    value: "society",
    Icon: Users,
    labelEn: "People & Society",
    labelKh: "មនុស្ស និងសង្គម",
    blurbEn: "Communities, history, money, choices.",
    blurbKh: "សហគមន៍ ប្រវត្តិសាស្ត្រ លុយ និងជម្រើស។",
    accent: "from-amber-300 to-orange-600",
  },
  {
    value: "communication",
    Icon: MessageCircle,
    labelEn: "Communication",
    labelKh: "ការទំនាក់ទំនង",
    blurbEn: "English, writing, speaking, stories.",
    blurbKh: "ភាសាអង់គ្លេស ការសរសេរ ការនិយាយ និងរឿងរ៉ាវ។",
    accent: "from-rose-300 to-pink-600",
  },
];

const Q2_OPTIONS: Option<Level>[] = [
  {
    value: "beginner",
    Icon: Sprout,
    labelEn: "Beginner / Primary",
    labelKh: "កម្រិតដំបូង / បឋមសិក្សា",
    blurbEn: "Just starting out — friendly and visual.",
    blurbKh: "ទើបនឹងចាប់ផ្តើម — រាក់ទាក់ និងមើលឃើញ។",
    accent: "from-lime-300 to-emerald-600",
  },
  {
    value: "advanced",
    Icon: GraduationCap,
    labelEn: "Advanced / High School",
    labelKh: "កម្រិតខ្ពស់ / មធ្យមសិក្សា",
    blurbEn: "Ready for deeper concepts and exam prep.",
    blurbKh: "ត្រៀមខ្លួនសម្រាប់គំនិតស៊ីជម្រៅ និងការត្រៀមប្រឡង។",
    accent: "from-indigo-300 to-violet-700",
  },
];

const Q3_OPTIONS: Option<Goal>[] = [
  {
    value: "community",
    Icon: Heart,
    labelEn: "Help my community",
    labelKh: "ជួយសហគមន៍របស់ខ្ញុំ",
    blurbEn: "Skills I can share with my village.",
    blurbKh: "ជំនាញដែលខ្ញុំអាចចែករំលែកជាមួយភូមិរបស់ខ្ញុំ។",
    accent: "from-rose-300 to-red-600",
  },
  {
    value: "exams",
    Icon: BookOpenCheck,
    labelEn: "Pass my exams",
    labelKh: "ប្រឡងជាប់",
    blurbEn: "Strong foundations and revision.",
    blurbKh: "មូលដ្ឋានរឹងមាំ និងការត្រួតពិនិត្យឡើងវិញ។",
    accent: "from-amber-300 to-yellow-600",
  },
  {
    value: "career",
    Icon: Briefcase,
    labelEn: "Build my career",
    labelKh: "កសាងអាជីពរបស់ខ្ញុំ",
    blurbEn: "Pathways to university and work.",
    blurbKh: "ផ្លូវទៅសាកលវិទ្យាល័យ និងការងារ។",
    accent: "from-sky-300 to-blue-700",
  },
];

/* ================================================================ */
/*  RECOMMENDATION CATALOG                                          */
/* ================================================================ */

interface Section {
  key: string;
  href: string;
  emoji: string;
  titleEn: string;
  titleKh: string;
  descEn: string;
  descKh: string;
  tagEn: string;
  tagKh: string;
}

const SECTIONS: Record<string, Section> = {
  biology: {
    key: "biology",
    href: "/biology",
    emoji: "🌿",
    titleEn: "Biology Hub",
    titleKh: "មជ្ឈមណ្ឌលជីវវិទ្យា",
    descEn: "Plants, the body, ecosystems, and cells.",
    descKh: "រុក្ខជាតិ រាងកាយ ប្រព័ន្ធអេកូឡូស៊ី និងកោសិកា។",
    tagEn: "Foundations",
    tagKh: "មូលដ្ឋាន",
  },
  geology: {
    key: "geology",
    href: "/geology",
    emoji: "🪨",
    titleEn: "Geology Hub",
    titleKh: "មជ្ឈមណ្ឌលភូគព្ភវិទ្យា",
    descEn: "Earth, rocks, and the forces that shape the land.",
    descKh: "ផែនដី ថ្ម និងកម្លាំងដែលបង្កើតដី។",
    tagEn: "Earth Science",
    tagKh: "ផែនដី",
  },
  organic: {
    key: "organic",
    href: "/chemistry/organic-101",
    emoji: "🧬",
    titleEn: "Organic Chemistry 101",
    titleKh: "គីមីសរីរាង្គ ១០១",
    descEn: "The chemistry of life — carbon, DNA, and reactions.",
    descKh: "គីមីនៃជីវិត — កាបូន DNA និងប្រតិកម្ម។",
    tagEn: "Genetics-ready",
    tagKh: "ត្រៀមហ្សែន",
  },
  chemistry: {
    key: "chemistry",
    href: "/chemistry",
    emoji: "⚗️",
    titleEn: "Chemistry Hub",
    titleKh: "មជ្ឈមណ្ឌលគីមីវិទ្យា",
    descEn: "Atoms, reactions, and real-world chemistry.",
    descKh: "អាតូម ប្រតិកម្ម និងគីមីវិទ្យាជាក់ស្តែង។",
    tagEn: "Foundations",
    tagKh: "មូលដ្ឋាន",
  },
  physics: {
    key: "physics",
    href: "/physics",
    emoji: "⚙️",
    titleEn: "Physics Hub",
    titleKh: "មជ្ឈមណ្ឌលរូបវិទ្យា",
    descEn: "Motion, forces, energy, and waves.",
    descKh: "ចលនា កម្លាំង ថាមពល និងរលក។",
    tagEn: "How things work",
    tagKh: "របៀបដំណើរការ",
  },
  computers: {
    key: "computers",
    href: "/how-computers-work",
    emoji: "💻",
    titleEn: "How Computers Work",
    titleKh: "របៀបដែលកុំព្យូទ័រដំណើរការ",
    descEn: "From transistors to apps, demystified.",
    descKh: "ពីត្រង់ស៊ីស្ទ័រដល់កម្មវិធី បកស្រាយយ៉ាងច្បាស់។",
    tagEn: "Tech basics",
    tagKh: "បច្ចេកវិទ្យា",
  },
  english: {
    key: "english",
    href: "/english-writing",
    emoji: "✍️",
    titleEn: "English Writing",
    titleKh: "ការសរសេរអង់គ្លេស",
    descEn: "Sentence Train and the Local Market Counter.",
    descKh: "Sentence Train និង Local Market Counter។",
    tagEn: "Mascot English",
    tagKh: "មាស្កុតអង់គ្លេស",
  },
  marketMath: {
    key: "marketMath",
    href: "/english-writing",
    emoji: "🧮",
    titleEn: "Market Math",
    titleKh: "គណិតផ្សារ",
    descEn: "Counting and pricing at the local market.",
    descKh: "រាប់ និងតម្លៃនៅផ្សារក្នុងស្រុក។",
    tagEn: "Daily-life math",
    tagKh: "គណិតប្រចាំថ្ងៃ",
  },
  finlit: {
    key: "finlit",
    href: "/finlit-intro",
    emoji: "💰",
    titleEn: "Financial Literacy",
    titleKh: "ចំណេះដឹងហិរញ្ញវត្ថុ",
    descEn: "Money skills for daily life and family.",
    descKh: "ជំនាញលុយសម្រាប់ជីវិតប្រចាំថ្ងៃ និងគ្រួសារ។",
    tagEn: "Life skill",
    tagKh: "ជំនាញជីវិត",
  },
  launchpad: {
    key: "launchpad",
    href: "/launchpad",
    emoji: "🚀",
    titleEn: "Launchpad — Career Guide",
    titleKh: "Launchpad — មគ្គុទ្ទេសក៍អាជីព",
    descEn: "Discover careers and university pathways.",
    descKh: "ស្វែងយល់អាជីព និងផ្លូវសាកលវិទ្យាល័យ។",
    tagEn: "Careers",
    tagKh: "អាជីព",
  },
  examPrep: {
    key: "examPrep",
    href: "/exam-prep",
    emoji: "📚",
    titleEn: "Exam Prep",
    titleKh: "ការត្រៀមប្រឡង",
    descEn: "Targeted practice for your big exams.",
    descKh: "ការអនុវត្តដែលផ្តោតសម្រាប់ការប្រឡងធំៗ។",
    tagEn: "Revision",
    tagKh: "ត្រួតពិនិត្យ",
  },
  disasterPrep: {
    key: "disasterPrep",
    href: "/disaster-prep",
    emoji: "🌧️",
    titleEn: "Disaster Preparedness",
    titleKh: "ការត្រៀមមហន្តរាយ",
    descEn: "Floods, storms, and keeping your family safe.",
    descKh: "ទឹកជំនន់ ខ្យល់ព្យុះ និងការការពារគ្រួសារ។",
    tagEn: "Community safety",
    tagKh: "សុវត្ថិភាពសហគមន៍",
  },
  science: {
    key: "science",
    href: "/science",
    emoji: "🔬",
    titleEn: "Scientific Literacy",
    titleKh: "ចំណេះដឹងវិទ្យាសាស្ត្រ",
    descEn: "Think like a scientist about everyday claims.",
    descKh: "គិតដូចអ្នកវិទ្យាសាស្ត្រអំពីការអះអាងប្រចាំថ្ងៃ។",
    tagEn: "Skeptic skills",
    tagKh: "ជំនាញរិះគន់",
  },
};

/* ================================================================ */
/*  RECOMMENDATION LOGIC                                            */
/* ================================================================ */

function recommend(c: Curiosity, l: Level, g: Goal): string[] {
  // Each combination returns 2-3 section keys.
  const map: Record<string, string[]> = {
    // ---------- NATURE & LIFE ----------
    "nature|beginner|community": ["biology", "disasterPrep"],
    "nature|beginner|exams": ["biology", "geology"],
    "nature|beginner|career": ["biology", "science"],
    "nature|advanced|community": ["biology", "disasterPrep", "science"],
    "nature|advanced|exams": ["organic", "biology"],
    "nature|advanced|career": ["organic", "biology", "launchpad"],

    // ---------- MACHINES & TECH ----------
    "tech|beginner|community": ["computers", "disasterPrep"],
    "tech|beginner|exams": ["computers", "physics"],
    "tech|beginner|career": ["computers", "launchpad"],
    "tech|advanced|community": ["physics", "computers"],
    "tech|advanced|exams": ["physics", "chemistry"],
    "tech|advanced|career": ["physics", "computers", "launchpad"],

    // ---------- PEOPLE & SOCIETY ----------
    "society|beginner|community": ["finlit", "english"],
    "society|beginner|exams": ["english", "examPrep"],
    "society|beginner|career": ["finlit", "launchpad"],
    "society|advanced|community": ["finlit", "launchpad", "disasterPrep"],
    "society|advanced|exams": ["examPrep", "english"],
    "society|advanced|career": ["launchpad", "finlit"],

    // ---------- COMMUNICATION ----------
    "communication|beginner|community": ["english", "marketMath"],
    "communication|beginner|exams": ["english", "examPrep"],
    "communication|beginner|career": ["english", "launchpad"],
    "communication|advanced|community": ["english", "launchpad"],
    "communication|advanced|exams": ["english", "examPrep"],
    "communication|advanced|career": ["english", "launchpad", "examPrep"],
  };
  return map[`${c}|${l}|${g}`] ?? ["english", "biology"];
}

/* ================================================================ */
/*  MAIN COMPONENT                                                  */
/* ================================================================ */

export function LearningPathQuiz() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [step, setStep] = useState<0 | 1 | 2 | 3>(0); // 0..2 = questions, 3 = results
  const [a1, setA1] = useState<Curiosity | null>(null);
  const [a2, setA2] = useState<Level | null>(null);
  const [a3, setA3] = useState<Goal | null>(null);

  // Progress: 4 stages (3 questions + 1 result)
  const totalStages = 4;
  const progress = ((step + 1) / totalStages) * 100;

  function reset() {
    setA1(null);
    setA2(null);
    setA3(null);
    setStep(0);
  }

  function pickQ1(v: Curiosity) {
    setA1(v);
    setStep(1);
  }
  function pickQ2(v: Level) {
    setA2(v);
    setStep(2);
  }
  function pickQ3(v: Goal) {
    setA3(v);
    setStep(3);
  }

  const recommendedKeys = a1 && a2 && a3 ? recommend(a1, a2, a3) : [];
  const recommended = recommendedKeys.map((k) => SECTIONS[k]).filter(Boolean);

  return (
    <section
      aria-labelledby="path-quiz-title"
      className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
    >
      <style>{`
        @keyframes lpq-step-in {
          0%   { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes lpq-pop {
          0%   { opacity: 0; transform: scale(0.94) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes lpq-mascot-bounce {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50%      { transform: translateY(-8px) rotate(3deg); }
        }
        .lpq-step-in    { animation: lpq-step-in 0.42s cubic-bezier(.2,.9,.3,1.05) both; }
        .lpq-pop        { animation: lpq-pop 0.42s cubic-bezier(.2,.9,.3,1.1) both; }
        .lpq-bounce-1   { animation: lpq-mascot-bounce 1.6s ease-in-out infinite; }
        .lpq-bounce-2   { animation: lpq-mascot-bounce 1.6s ease-in-out infinite 0.18s; }
        .lpq-bounce-3   { animation: lpq-mascot-bounce 1.6s ease-in-out infinite 0.36s; }
        @media (prefers-reduced-motion: reduce) {
          .lpq-step-in,
          .lpq-pop,
          .lpq-bounce-1, .lpq-bounce-2, .lpq-bounce-3 { animation: none !important; }
        }
      `}</style>

      <div className="rounded-3xl bg-gradient-to-br from-white via-sky-50 to-indigo-50 border border-sky-200 shadow-[0_20px_60px_-20px_rgba(14,116,144,0.25)] p-6 sm:p-10">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold tracking-[0.2em] uppercase">
            <Compass className="w-3.5 h-3.5" />
            {t("New here? Start here", "ថ្មីមែនទេ? ចាប់ផ្តើមនៅទីនេះ")}
          </div>
          <h2
            id="path-quiz-title"
            className={`mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 ${kh ? "font-khmer leading-snug" : "font-display"}`}
          >
            {t("Learning Path Discovery Quiz", "កម្រងសំណួរស្វែងរកផ្លូវសិក្សា")}
          </h2>
          <p className={`mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Three quick questions, one personalized map of where to start on Chouy Sala.",
              "សំណួរលឿនបី និងផែនទីផ្ទាល់ខ្លួនមួយ ដើម្បីដឹងថាគួរចាប់ផ្តើមនៅណានៅលើ Chouy Sala។"
            )}
          </p>
        </header>

        {/* Progress bar + step counter */}
        <div className="mb-8" aria-hidden={step === 3}>
          <div className="flex items-center justify-between mb-2 text-xs font-semibold text-slate-500">
            <span className={kh ? "font-khmer" : ""}>
              {step < 3
                ? t(`Step ${step + 1} of 3`, `ជំហានទី ${step + 1} ក្នុង ៣`)
                : t("Your map is ready!", "ផែនទីរបស់អ្នករួចរាល់!")}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div
            className="h-2 w-full rounded-full bg-slate-200 overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Step dots */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === step
                    ? "bg-indigo-600 w-6"
                    : i < step
                    ? "bg-indigo-400"
                    : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step body */}
        <div className="min-h-[320px]">
          {step === 0 && (
            <QuestionGrid
              key="q1"
              kh={kh}
              titleEn="What are you curious about?"
              titleKh="តើអ្នកចង់ដឹងអំពីអ្វី?"
              options={Q1_OPTIONS}
              selected={a1}
              onPick={pickQ1}
              cols="grid-cols-1 sm:grid-cols-2"
            />
          )}
          {step === 1 && (
            <QuestionGrid
              key="q2"
              kh={kh}
              titleEn="What is your level?"
              titleKh="តើកម្រិតរបស់អ្នកជាអ្វី?"
              options={Q2_OPTIONS}
              selected={a2}
              onPick={pickQ2}
              cols="grid-cols-1 sm:grid-cols-2"
            />
          )}
          {step === 2 && (
            <QuestionGrid
              key="q3"
              kh={kh}
              titleEn="What is your goal?"
              titleKh="តើគោលដៅរបស់អ្នកជាអ្វី?"
              options={Q3_OPTIONS}
              selected={a3}
              onPick={pickQ3}
              cols="grid-cols-1 sm:grid-cols-3"
            />
          )}
          {step === 3 && (
            <Results
              kh={kh}
              t={t}
              recommended={recommended}
              onReset={reset}
            />
          )}
        </div>

        {/* Footer nav */}
        {step > 0 && step < 3 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2) : s))}
              className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors ${kh ? "font-khmer" : ""}`}
            >
              <ArrowLeft className="w-4 h-4" />
              {t("Back", "ត្រឡប់ក្រោយ")}
            </button>
            <button
              type="button"
              onClick={reset}
              className={`inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors ${kh ? "font-khmer" : ""}`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t("Start over", "ចាប់ផ្តើមឡើងវិញ")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ================================================================ */
/*  QUESTION GRID                                                   */
/* ================================================================ */

function QuestionGrid<T extends string>({
  kh,
  titleEn,
  titleKh,
  options,
  selected,
  onPick,
  cols,
}: {
  kh: boolean;
  titleEn: string;
  titleKh: string;
  options: Option<T>[];
  selected: T | null;
  onPick: (v: T) => void;
  cols: string;
}) {
  return (
    <div className="lpq-step-in">
      <h3 className={`text-center text-xl sm:text-2xl font-bold text-slate-900 mb-6 ${kh ? "font-khmer" : ""}`}>
        {kh ? titleKh : titleEn}
      </h3>
      <div className={`grid ${cols} gap-3 sm:gap-4`}>
        {options.map((o) => {
          const isSelected = o.value === selected;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onPick(o.value)}
              aria-pressed={isSelected}
              className={`group relative text-left rounded-2xl border-2 p-4 sm:p-5 transition-all
                          bg-white hover:-translate-y-0.5 hover:shadow-xl
                          ${isSelected
                            ? "border-indigo-500 shadow-lg ring-4 ring-indigo-200"
                            : "border-slate-200 hover:border-indigo-300"}`}
            >
              <div className="flex items-center gap-4">
                <div className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${o.accent} flex items-center justify-center shadow-md`}>
                  <o.Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.4} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-base sm:text-lg font-bold text-slate-900 leading-tight ${kh ? "font-khmer" : ""}`}>
                    {kh ? o.labelKh : o.labelEn}
                  </div>
                  <div className={`text-xs ${kh ? "text-slate-500" : "font-khmer text-slate-500"}`}>
                    {kh ? o.labelEn : o.labelKh}
                  </div>
                  <p className={`mt-1 text-sm text-slate-600 leading-snug ${kh ? "font-khmer leading-relaxed" : ""}`}>
                    {kh ? o.blurbKh : o.blurbEn}
                  </p>
                </div>
                <ArrowRight className={`shrink-0 w-5 h-5 transition-all
                                          ${isSelected ? "text-indigo-600 translate-x-1" : "text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5"}`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================ */
/*  RESULTS                                                         */
/* ================================================================ */

function Results({
  kh,
  t,
  recommended,
  onReset,
}: {
  kh: boolean;
  t: (en: string, khStr: string) => string;
  recommended: Section[];
  onReset: () => void;
}) {
  return (
    <div className="lpq-pop">
      {/* Mascot cheer row */}
      <div className="flex items-end justify-center gap-3 sm:gap-6 mb-2">
        <MiniMascot which="kouprey" className="lpq-bounce-1 w-20 h-20 sm:w-24 sm:h-24" />
        <MiniMascot which="ibis"    className="lpq-bounce-2 w-24 h-24 sm:w-28 sm:h-28" />
        <MiniMascot which="turtle"  className="lpq-bounce-3 w-20 h-20 sm:w-24 sm:h-24" />
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold tracking-[0.2em] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          {t("Personalized Map", "ផែនទីផ្ទាល់ខ្លួន")}
        </div>
        <h3 className={`mt-3 text-2xl sm:text-3xl font-bold text-slate-900 ${kh ? "font-khmer" : "font-display"}`}>
          {t("Your mascots are cheering!", "មាស្កុតរបស់អ្នកកំពុងលើកទឹកចិត្ត!")}
        </h3>
        <p className={`mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Here are the sections we picked just for you. Jump in and the Kouprey, Ibis, and Turtle will keep cheering as you learn.",
            "នេះគឺជាផ្នែកដែលយើងបានជ្រើសរើសសម្រាប់អ្នក។ លោតចូលទៅ ហើយគោព្រៃ ត្មាត និងអណ្ដើកនឹងបន្តលើកទឹកចិត្តពេលអ្នករៀន។"
          )}
        </p>
      </div>

      {/* Recommended cards */}
      <div className={`grid gap-4 ${recommended.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {recommended.map((s) => (
          <Link
            key={s.key}
            href={s.href}
            className="group rounded-2xl bg-white border-2 border-emerald-100 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-0.5 transition-all p-5 flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-4xl drop-shadow-sm">{s.emoji}</div>
              <span className={`text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? s.tagKh : s.tagEn}
              </span>
            </div>
            <h4 className={`text-lg font-bold text-slate-900 leading-tight ${kh ? "font-khmer" : ""}`}>
              {kh ? s.titleKh : s.titleEn}
            </h4>
            <p className={`mt-1 text-xs ${kh ? "text-slate-400" : "font-khmer text-slate-400"}`}>
              {kh ? s.titleEn : s.titleKh}
            </p>
            <p className={`mt-2 text-sm text-slate-600 leading-relaxed flex-1 ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? s.descKh : s.descEn}
            </p>
            <div className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 group-hover:text-emerald-900 transition-colors ${kh ? "font-khmer" : ""}`}>
              <Check className="w-4 h-4" />
              {t("Jump to Section", "លោតទៅផ្នែកនេះ")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      {/* Reset */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onReset}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors ${kh ? "font-khmer" : ""}`}
        >
          <RotateCcw className="w-4 h-4" />
          {t("Take the quiz again", "ធ្វើកម្រងសំណួរម្ដងទៀត")}
        </button>
      </div>
    </div>
  );
}

/* ================================================================ */
/*  MINI MASCOT SVGs (compact versions for the cheer row)           */
/* ================================================================ */

function MiniMascot({
  which,
  className = "",
}: {
  which: "kouprey" | "ibis" | "turtle";
  className?: string;
}) {
  if (which === "kouprey") return <MiniKouprey className={className} />;
  if (which === "ibis") return <MiniIbis className={className} />;
  return <MiniTurtle className={className} />;
}

function MiniEye({ cx, cy, r = 5 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#1f2937" strokeWidth="1.2" />
      <circle cx={cx + 0.6} cy={cy + 1} r={r * 0.55} fill="#1f2937" />
      <circle cx={cx + 1.5} cy={cy - 0.5} r={r * 0.22} fill="#ffffff" />
    </g>
  );
}

function MiniKouprey({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Kouprey mascot cheering">
      <ellipse cx="62" cy="86" rx="36" ry="22" fill="#4b3621" stroke="#1f140a" strokeWidth="2" />
      <rect x="38" y="98" width="8" height="14" rx="2" fill="#3a2a18" />
      <rect x="78" y="98" width="8" height="14" rx="2" fill="#3a2a18" />
      <ellipse cx="40" cy="58" rx="26" ry="22" fill="#5a4129" stroke="#1f140a" strokeWidth="2" />
      <ellipse cx="22" cy="66" rx="11" ry="8" fill="#caa07a" stroke="#1f140a" strokeWidth="1.5" />
      <circle cx="17" cy="65" r="1.6" fill="#1f140a" />
      <circle cx="20" cy="68" r="1.6" fill="#1f140a" />
      <path d="M18 72 q4 3 8 0" stroke="#1f140a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M30 40 q-10 -16 -22 -10 q8 4 6 16" fill="none" stroke="#e7d8b6" strokeWidth="4" strokeLinecap="round" />
      <path d="M52 40 q10 -16 22 -10 q-8 4 -6 16" fill="none" stroke="#e7d8b6" strokeWidth="4" strokeLinecap="round" />
      <MiniEye cx={36} cy={56} r={6} />
      <MiniEye cx={52} cy={56} r={6} />
      <circle cx="32" cy="68" r="2.8" fill="#ef4444" opacity="0.35" />
      <circle cx="56" cy="68" r="2.8" fill="#ef4444" opacity="0.35" />
      {/* tiny cheer star */}
      <text x="92" y="40" fontSize="14" fill="#f59e0b">★</text>
    </svg>
  );
}

function MiniIbis({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Giant Ibis mascot cheering">
      <ellipse cx="56" cy="78" rx="28" ry="26" fill="#6b7280" stroke="#1f2937" strokeWidth="2" />
      <path d="M44 70 q18 -6 30 6 q-10 18 -28 14 z" fill="#4b5563" stroke="#1f2937" strokeWidth="1.5" />
      <line x1="48" y1="103" x2="46" y2="116" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <line x1="64" y1="103" x2="66" y2="116" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <path d="M52 56 q-6 -16 4 -28" stroke="#6b7280" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M52 56 q-6 -16 4 -28" stroke="#1f2937" strokeWidth="2" fill="none" />
      <circle cx="60" cy="26" r="14" fill="#4b5563" stroke="#1f2937" strokeWidth="2" />
      <path d="M72 28 q22 6 26 28 q-4 2 -8 -2 q-2 -16 -20 -20 z" fill="#1f2937" stroke="#0b0f15" strokeWidth="1.2" />
      <MiniEye cx={56} cy={24} r={5} />
      <MiniEye cx={66} cy={24} r={5} />
      <circle cx="50" cy="32" r="2.4" fill="#fb7185" opacity="0.4" />
      <circle cx="70" cy="32" r="2.4" fill="#fb7185" opacity="0.4" />
      <text x="22" y="22" fontSize="14" fill="#f59e0b">★</text>
    </svg>
  );
}

function MiniTurtle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Royal Turtle mascot cheering">
      <ellipse cx="22" cy="86" rx="9" ry="6" fill="#65a30d" stroke="#365314" strokeWidth="1.5" />
      <ellipse cx="98" cy="86" rx="9" ry="6" fill="#65a30d" stroke="#365314" strokeWidth="1.5" />
      <ellipse cx="30" cy="96" rx="9" ry="6" fill="#65a30d" stroke="#365314" strokeWidth="1.5" />
      <ellipse cx="90" cy="96" rx="9" ry="6" fill="#65a30d" stroke="#365314" strokeWidth="1.5" />
      <ellipse cx="60" cy="74" rx="42" ry="28" fill="#a16207" stroke="#3f2c0a" strokeWidth="2" />
      <path d="M22 74 q0 -28 38 -28 q38 0 38 28 z" fill="#15803d" stroke="#14532d" strokeWidth="2" />
      <g stroke="#14532d" strokeWidth="1.4" fill="#22c55e">
        <polygon points="60,52 70,57 70,67 60,72 50,67 50,57" />
        <polygon points="40,58 48,62 48,70 40,74 32,70 32,62" />
        <polygon points="80,58 88,62 88,70 80,74 72,70 72,62" />
      </g>
      <circle cx="14" cy="74" r="13" fill="#84cc16" stroke="#365314" strokeWidth="2" />
      <path d="M4 78 q5 4 10 0" stroke="#365314" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <MiniEye cx={12} cy={70} r={4.2} />
      <MiniEye cx={22} cy={70} r={4.2} />
      <circle cx="10" cy="78" r="2" fill="#ef4444" opacity="0.4" />
      <circle cx="22" cy="78" r="2" fill="#ef4444" opacity="0.4" />
      <text x="92" y="42" fontSize="14" fill="#f59e0b">★</text>
    </svg>
  );
}
