import { Link } from "wouter";
import {
  ArrowLeft,
  FlaskConical,
  Wind,
  ArrowLeftRight,
  Scale,
  ListChecks,
  Lightbulb,
  ShoppingBasket,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  The Frugal Lab: Physics at Home
//  បន្ទប់ពិសោធន៍សន្សំសំចៃ៖ រូបវិទ្យានៅផ្ទះ
//
//  Hands-on experiments students can run at home with kitchen-cupboard
//  materials. Aesthetic = bright blueprint blues + vibrant yellow accents
//  on clean white cards, matching the rest of the Physics Hub.
// ════════════════════════════════════════════════════════════════════════════

// Shared blueprint surface (echoes PhysicsHubPage)
const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  backgroundImage:
    "linear-gradient(rgba(14, 116, 144, 0.07) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.07) 1px, transparent 1px), " +
    "linear-gradient(rgba(14, 116, 144, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(14, 116, 144, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};

type Bilingual = { en: string; kh: string };

type Experiment = {
  id: string;
  number: string;
  numberKh: string;
  titleEn: string;
  titleKh: string;
  conceptEn: string;
  conceptKh: string;
  icon: React.ComponentType<{ className?: string }>;
  hazard?: Bilingual; // safety note
  setup: Bilingual[]; // bullet list
  steps: Bilingual[]; // numbered list
  physicsEn: string; // "The Physics" explanation, EN
  physicsKh: string;
  physicsBoldEn: string; // headline takeaway in English (bolded)
  physicsBoldKh: string;
};

const EXPERIMENTS: Experiment[] = [
  // ── 1. Air Pressure: Crushed Bottle ─────────────────────────────────────
  {
    id: "crushed-bottle",
    number: "01",
    numberKh: "០១",
    titleEn: "The Crushed Bottle",
    titleKh: "ដបទឹកដែលត្រូវកម្ទេច",
    conceptEn: "Air Pressure",
    conceptKh: "សម្ពាធខ្យល់",
    icon: Wind,
    hazard: {
      en: "Use very hot water — ask an adult to help and never touch the bottle while it is hot.",
      kh: "ប្រើទឹកក្តៅខ្លាំង — សូមឱ្យមនុស្សពេញវ័យជួយ និងមិនត្រូវប៉ះដបពេលវាក្តៅឡើយ។",
    },
    setup: [
      {
        en: "An empty plastic water bottle (with its cap)",
        kh: "ដបទឹកប្លាស្ទិចទទេមួយ (ព្រមទាំងគម្របរបស់វា)",
      },
      {
        en: "A small amount of very hot water",
        kh: "ទឹកក្តៅខ្លាំងបន្តិច",
      },
      {
        en: "Cold water from the tap",
        kh: "ទឹកត្រជាក់ពីរ៉ូប៊ីណេ",
      },
    ],
    steps: [
      {
        en: "Pour a small amount of hot water into the empty plastic bottle.",
        kh: "ចាក់ទឹកក្តៅបន្តិចចូលក្នុងដបទឹកប្លាស្ទិចទទេ។",
      },
      {
        en: "Shake the bottle for about 10 seconds so hot steam fills the inside.",
        kh: "អង្រួនដបប្រហែល ១០ វិនាទី ដើម្បីឱ្យចំហាយក្តៅពេញពោះដប។",
      },
      {
        en: "Quickly screw the cap on completely tight.",
        kh: "ខាន់គម្របឱ្យជិតស្និតភ្លាមៗ។",
      },
      {
        en: "Slowly pour cold water over the outside of the bottle and watch.",
        kh: "ចាក់ទឹកត្រជាក់យឺតៗលើផ្ទៃខាងក្រៅនៃដប រួចសង្កេត។",
      },
    ],
    physicsBoldEn: "Atmospheric air is heavy — and you can see its weight.",
    physicsBoldKh: "ខ្យល់ក្នុងបរិយាកាសមានទម្ងន់ — ហើយអ្នកអាចមើលឃើញទម្ងន់របស់វា។",
    physicsEn:
      "The cold water rapidly cools the steam inside the bottle, turning it back into a few drops of liquid water. This shrinks the air dramatically and creates a partial vacuum — a region where the inside pressure is much lower than the air outside. Atmospheric pressure (the weight of all the air above us, about 1 kg pressing on every square centimetre) is now far stronger than the pressure inside, so the invisible outside air physically crushes the bottle in front of your eyes.",
    physicsKh:
      "ទឹកត្រជាក់ធ្វើឱ្យចំហាយខាងក្នុងដបត្រជាក់យ៉ាងលឿន ហើយប្រែជាដំណក់ទឹករាវវិញ។ ហេតុនេះធ្វើឱ្យខ្យល់ខាងក្នុងតូចចុះយ៉ាងខ្លាំង និងបង្កើតជាខ្យល់ទំនេរប្រហែល — ជាតំបន់ដែលសម្ពាធខាងក្នុងទាបជាងសម្ពាធខ្យល់ខាងក្រៅយ៉ាងច្រើន។ សម្ពាធបរិយាកាស (ទម្ងន់នៃខ្យល់ទាំងអស់ខាងលើពួកយើង ប្រហែល ១ គីឡូក្រាមកំពុងសង្កត់លើផ្ទៃ ១ ស.ម.ការ៉េ) ឥឡូវនេះខ្លាំងជាងសម្ពាធខាងក្នុងច្រើន ដូច្នេះខ្យល់ខាងក្រៅដែលមើលមិនឃើញ ពិតជាកម្ទេចដបនៅចំពោះមុខភ្នែករបស់អ្នក។",
  },

  // ── 2. Refraction: Reversing Arrow ──────────────────────────────────────
  {
    id: "reversing-arrow",
    number: "02",
    numberKh: "០២",
    titleEn: "The Reversing Arrow",
    titleKh: "ព្រួញប្តូរទិសដៅ",
    conceptEn: "Refraction",
    conceptKh: "ការច្រាល",
    icon: ArrowLeftRight,
    setup: [
      {
        en: "A clear, round drinking glass",
        kh: "កែវទឹកថ្លាមូល",
      },
      {
        en: "A piece of paper",
        kh: "បន្ទះក្រដាសមួយ",
      },
      {
        en: "A marker or thick pen",
        kh: "ប៊ិកសម្គាល់ ឬប៊ិកក្រាស់",
      },
      {
        en: "Water (room temperature)",
        kh: "ទឹក (សីតុណ្ហភាពធម្មតា)",
      },
    ],
    steps: [
      {
        en: "Draw a thick arrow pointing to the LEFT on the paper.",
        kh: "គូរព្រួញក្រាស់មួយចង្អុលទៅខាង​ឆ្វេងលើក្រដាស។",
      },
      {
        en: "Stand the paper up behind the empty glass so you can see the arrow through the glass.",
        kh: "ដាក់ក្រដាសឱ្យឈរនៅខាងក្រោយកែវទទេ ដើម្បីឱ្យអ្នកអាចមើលឃើញព្រួញកាត់កែវ។",
      },
      {
        en: "Look at the arrow through the empty glass — it still points LEFT.",
        kh: "សង្កេតព្រួញកាត់កែវទទេ — វានៅតែចង្អុលទៅខាង​ឆ្វេង។",
      },
      {
        en: "Slowly pour water into the glass and keep watching the arrow.",
        kh: "ចាក់ទឹកយឺតៗចូលក្នុងកែវ និងបន្តសង្កេតព្រួញ។",
      },
    ],
    physicsBoldEn:
      "A glass of water is a powerful lens that flips the world.",
    physicsBoldKh:
      "កែវទឹកមួយ ជាកែវភ្នែកដ៏មានឥទ្ធិពលដែលបង្វិលពិភពលោក។",
    physicsEn:
      "When water fills the glass, the round glass becomes a cylindrical convex lens. Light bends (refracts) every time it crosses between two materials with different densities — air, glass, water, glass, then air again. The curved water surface bends the light rays from the two ends of the arrow so much that they cross over each other before reaching your eye. The image of the arrow flips horizontally, and what was pointing LEFT now points to the RIGHT.",
    physicsKh:
      "ពេលទឹកពេញកែវ កែវមូលប្រែជាកែវភ្នែករាងស៊ីឡាំងផ្ដិត។ ពន្លឺច្រាល​រាល់ពេលដែលវាកាត់ពីសម្ភារៈមួយទៅសម្ភារៈមួយដែលមានដង់ស៊ីតេខុសគ្នា — ខ្យល់ កែវ ទឹក កែវ រួចហើយខ្យល់ម្ដងទៀត។ ផ្ទៃទឹកកោងធ្វើឱ្យកាំពន្លឺពីចុងទាំងពីរនៃព្រួញច្រាលច្រើនណាស់ ដែលពួកវាឆ្លងកាត់គ្នាមុនពេលទៅដល់ភ្នែករបស់អ្នក។ រូបព្រួញត្រូវបានបង្វិលផ្ដេក ហើយព្រួញដែលធ្លាប់ចង្អុលទៅឆ្វេង ឥឡូវនេះចង្អុលទៅខាង​ស្ដាំវិញ។",
  },

  // ── 3. Center of Mass: Balancing Forks ──────────────────────────────────
  {
    id: "balancing-forks",
    number: "03",
    numberKh: "០៣",
    titleEn: "The Balancing Forks",
    titleKh: "សមរក្សាតុល្យភាព",
    conceptEn: "Center of Mass",
    conceptKh: "មជ្ឈមណ្ឌលម៉ាស់",
    icon: Scale,
    setup: [
      {
        en: "Two identical metal forks",
        kh: "សម​ដែកដូចគ្នាពីរ",
      },
      {
        en: "One wooden toothpick",
        kh: "ឈើជូតធ្មេញមួយ",
      },
      {
        en: "A drinking glass with a firm rim",
        kh: "កែវទឹកដែលមានគែមរឹងមាំ",
      },
    ],
    steps: [
      {
        en: "Interlock the prongs of the two forks so they grip each other tightly.",
        kh: "ច្រកស្នៀតរបស់សមទាំងពីរបញ្ចូលគ្នាឱ្យកាន់គ្នាជាប់។",
      },
      {
        en: "Push the toothpick through the gap in the middle of the interlocking prongs.",
        kh: "ចាក់ឈើជូតធ្មេញកាត់ចន្លោះកណ្ដាលនៃស្នៀតដែលច្រកស្នៀត។",
      },
      {
        en: "Carefully balance the tip of the toothpick on the rim of the glass — angle the heavy fork handles backward and downward.",
        kh: "ដាក់ចុងឈើជូតធ្មេញលើគែមកែវដោយប្រុងប្រយ័ត្ន — ផ្អៀងដងសមធ្ងន់ៗឱ្យបែរទៅខាងក្រោយ និងចុះក្រោម។",
      },
      {
        en: "Let go gently. The heavy forks should hover perfectly in the air.",
        kh: "ដោះដៃយឺតៗ។ សមធ្ងន់ៗគួរអណ្ដែតយ៉ាងឥតខ្ចោះក្នុងខ្យល់។",
      },
    ],
    physicsBoldEn:
      "Every object has a single point where its weight perfectly balances.",
    physicsBoldKh:
      "វត្ថុនីមួយៗមានចំណុចមួយដែលទម្ងន់របស់វាមានតុល្យភាពយ៉ាងឥតខ្ចោះ។",
    physicsEn:
      "Every object has a Center of Mass — the exact point where the weight of every part of the object is perfectly distributed around it. As long as gravity pulls straight down through that point, the object cannot tip over. By angling the heavy fork handles backward and downward, you moved the system's center of mass directly underneath (and onto) the tip of the toothpick. The earth's gravitational pull now passes straight through the support point, locking the whole arrangement in place.",
    physicsKh:
      "វត្ថុនីមួយៗមានមជ្ឈមណ្ឌលម៉ាស់ — ជាចំណុចដែលទម្ងន់នៃផ្នែកនីមួយៗនៃវត្ថុ​ត្រូវបានចែកចាយយ៉ាងស្មើទាក់ទងនឹងវា។ ដរាបណាទំនាញធ្លាក់ចុះត្រង់កាត់ចំណុចនោះ វត្ថុនឹងមិនអាចទម្លាក់ឡើយ។ ដោយផ្អៀងដងសមធ្ងន់ៗទៅខាងក្រោយ និងចុះក្រោម អ្នកបានផ្លាស់មជ្ឈមណ្ឌលម៉ាស់នៃប្រព័ន្ធនេះត្រង់ខាងក្រោម (និងស្ថិតលើ) ចុងឈើជូតធ្មេញ។ ឥឡូវនេះកម្លាំងទំនាញរបស់ផែនដី​ឆ្លងកាត់ត្រង់ចំណុចទ្រ ហើយចាក់សោរការរៀបចំទាំងមូលឱ្យនៅនឹងថ្ករ។",
  },
];

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function FrugalPhysicsLab() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="min-h-screen py-10 sm:py-12 px-4 sm:px-6"
      style={PAGE_BG}
      data-testid="frugal-physics-lab"
    >
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/physics"
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-800 hover:text-sky-600 mb-6"
          data-testid="link-back-to-physics-hub"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          <span>{t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}</span>
        </Link>

        {/* Hero */}
        <header
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 sm:px-10 py-9 sm:py-11 mb-8 shadow-lg"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56, 189, 248, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(56, 189, 248, 0.10) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-yellow-400/15 border-2 border-yellow-300/70 text-yellow-300 flex items-center justify-center flex-shrink-0 shadow-inner">
              <FlaskConical className="w-9 h-9 sm:w-10 sm:h-10" aria-hidden />
            </div>

            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-yellow-300/90 mb-2 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden />
                <span>
                  {t("Physics Hub / Hands-on", "មជ្ឈមណ្ឌលរូបវិទ្យា / ពិសោធន៍ដោយខ្លួនឯង")}
                </span>
              </div>

              <h1
                className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
                data-testid="frugal-lab-title-en"
              >
                The Frugal Lab: Physics at Home
              </h1>
              <p
                className="font-khmer mt-2 text-lg sm:text-xl text-sky-100/90 leading-loose"
                data-testid="frugal-lab-title-kh"
              >
                បន្ទប់ពិសោធន៍សន្សំសំចៃ៖ រូបវិទ្យានៅផ្ទះ
              </p>

              <p
                className={`mt-4 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "Three real physics experiments you can run today using only things you already have at home. No special equipment — just curiosity and a steady hand.",
                  "ការពិសោធន៍រូបវិទ្យាពិតៗបី ដែលអ្នកអាចសាកល្បងថ្ងៃនេះ ដោយប្រើតែវត្ថុដែលអ្នកមាននៅផ្ទះរួចហើយ។ មិនត្រូវការឧបករណ៍ពិសេសឡើយ — គ្រាន់តែភាពចង់ដឹងចង់ឃើញ និងដៃរឹងមាំ។",
                )}
              </p>

              {/* Spec line */}
              <div
                className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-slate-400 ${
                  kh ? "font-khmer text-xs" : ""
                }`}
              >
                <span>{t("EXPERIMENTS: 03", "ការពិសោធន៍៖ ០៣")}</span>
                <span className="opacity-40">|</span>
                <span>{t("LANG: EN / ខ្មែរ", "ភាសា៖ EN / ខ្មែរ")}</span>
                <span className="opacity-40">|</span>
                <span>{t("BUDGET: ≈ 0₭", "ថវិកា៖ ≈ ០៛")}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Intro yellow callout */}
        <div
          className="rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-4 sm:p-5 mb-8 flex items-start gap-3"
          data-testid="frugal-lab-intro-callout"
        >
          <Lightbulb
            className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-0.5"
            aria-hidden
          />
          <div>
            <p className="text-sm sm:text-base text-yellow-900 leading-relaxed font-semibold">
              {t(
                "Real physics is not locked inside expensive labs.",
                "រូបវិទ្យាពិតប្រាកដ មិនបានចាក់សោនៅក្នុងបន្ទប់ពិសោធន៍ថ្លៃៗឡើយ។",
              )}
            </p>
            <p
              className={`mt-1 text-sm text-yellow-900/85 leading-relaxed ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Each experiment below pairs a simple kitchen-cupboard setup with the deep physical idea behind what you observe. Read the steps, predict the result, then test it.",
                "ការពិសោធន៍នីមួយៗខាងក្រោម ភ្ជាប់ការរៀបចំសាមញ្ញដោយប្រើវត្ថុក្នុងផ្ទះបាយ ជាមួយនឹងគំនិតរូបវិទ្យាជ្រៅជ្រះនៅពីក្រោយអ្វីដែលអ្នកសង្កេតឃើញ។ អានជំហាន ទាយលទ្ធផល រួចសាកល្បង។",
              )}
            </p>
          </div>
        </div>

        {/* Experiments */}
        <div className="space-y-8" data-testid="frugal-lab-experiments-list">
          {EXPERIMENTS.map((ex) => (
            <ExperimentCard key={ex.id} ex={ex} kh={kh} t={t} />
          ))}
        </div>

        {/* Closing banner */}
        <div className="mt-10 rounded-2xl border-2 border-sky-200 bg-white p-5 sm:p-6 text-center shadow-sm">
          <h3 className="font-display text-lg sm:text-xl font-bold text-sky-900">
            {t(
              "The whole world is your physics lab.",
              "ពិភពលោកទាំងមូលគឺជាបន្ទប់ពិសោធន៍រូបវិទ្យារបស់អ្នក។",
            )}
          </h3>
          <p
            className={`mt-1 text-sm sm:text-base text-slate-700 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "When something surprises you, ask: what force, what energy, what wave caused that?",
              "ពេលអ្វីមួយធ្វើឱ្យអ្នកភ្ញាក់ផ្អើល សួរថា៖ កម្លាំងមួយណា ថាមពលមួយណា រលកមួយណា ដែលបង្កឱ្យកើតមានរឿងនោះ?",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FrugalPhysicsLab;

// ════════════════════════════════════════════════════════════════════════════
//  Experiment card
// ════════════════════════════════════════════════════════════════════════════

function ExperimentCard({
  ex,
  kh,
  t,
}: {
  ex: Experiment;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const Icon = ex.icon;
  return (
    <article
      className="rounded-2xl bg-white border-2 border-sky-200 shadow-sm overflow-hidden"
      data-testid={`experiment-card-${ex.id}`}
    >
      {/* Card header — sky-blueprint band */}
      <div className="bg-sky-900 text-white px-5 sm:px-7 py-5 relative overflow-hidden">
        {/* Faint blueprint grid in header */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.18) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(56,189,248,0.18) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />
        <div className="relative flex items-start gap-4">
          {/* Yellow step number badge */}
          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl bg-yellow-400 text-sky-900 flex flex-col items-center justify-center font-mono font-bold leading-none border-2 border-yellow-300 shadow-md"
            aria-hidden
          >
            <span className="text-[10px] tracking-wider opacity-80">EXP</span>
            <span className="text-xl mt-0.5">
              {kh ? ex.numberKh : ex.number}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-yellow-300 font-mono uppercase tracking-widest text-[10px] sm:text-[11px] mb-1">
              <Icon className="w-4 h-4" aria-hidden />
              <span>{ex.conceptEn}</span>
              <span className="opacity-60">·</span>
              <span className="font-khmer normal-case tracking-normal text-xs">
                {ex.conceptKh}
              </span>
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold leading-tight"
              data-testid={`experiment-title-en-${ex.id}`}
            >
              {ex.titleEn}
            </h2>
            <p
              className="font-khmer text-base sm:text-lg text-sky-100/90 leading-loose mt-1"
              data-testid={`experiment-title-kh-${ex.id}`}
            >
              {ex.titleKh}
            </p>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 sm:px-7 py-6 space-y-6">
        {/* Hazard */}
        {ex.hazard && (
          <div
            className="flex items-start gap-3 rounded-xl border-2 border-yellow-400 bg-yellow-50 p-3 sm:p-4"
            data-testid={`experiment-hazard-${ex.id}`}
          >
            <AlertTriangle
              className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5"
              aria-hidden
            />
            <div className="text-sm leading-relaxed">
              <p className="font-semibold text-yellow-900">
                {t("Safety:", "សុវត្ថិភាព៖")} <span>{ex.hazard.en}</span>
              </p>
              <p className="font-khmer text-yellow-900/90 leading-loose mt-1">
                {ex.hazard.kh}
              </p>
            </div>
          </div>
        )}

        {/* Setup */}
        <section aria-labelledby={`setup-${ex.id}`}>
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBasket className="w-4 h-4 text-sky-700" aria-hidden />
            <h3
              id={`setup-${ex.id}`}
              className="font-display text-base sm:text-lg font-bold text-sky-900"
            >
              {t("The Setup", "ការរៀបចំ")}
              <span className="font-khmer text-sm sm:text-base font-normal text-sky-700/85 ml-2">
                · ការរៀបចំ
              </span>
            </h3>
          </div>
          <ul className="grid sm:grid-cols-2 gap-2">
            {ex.setup.map((item, i) => (
              <li
                key={i}
                className="rounded-lg border border-sky-200 bg-sky-50/60 px-3 py-2 text-sm"
              >
                <span className="text-slate-800">{item.en}</span>
                <span className="font-khmer block text-slate-600 leading-loose mt-0.5">
                  {item.kh}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        <section aria-labelledby={`steps-${ex.id}`}>
          <div className="flex items-center gap-2 mb-3">
            <ListChecks className="w-4 h-4 text-sky-700" aria-hidden />
            <h3
              id={`steps-${ex.id}`}
              className="font-display text-base sm:text-lg font-bold text-sky-900"
            >
              {t("The Steps", "ជំហាន")}
              <span className="font-khmer text-sm sm:text-base font-normal text-sky-700/85 ml-2">
                · ជំហាន
              </span>
            </h3>
          </div>
          <ol className="space-y-3">
            {ex.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-3 items-start"
                data-testid={`experiment-step-${ex.id}-${i + 1}`}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-sky-900 font-mono font-bold text-xs flex items-center justify-center border-2 border-yellow-300 shadow-sm"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="flex-1 text-sm sm:text-base">
                  <p className="text-slate-800 leading-relaxed">{step.en}</p>
                  <p className="font-khmer text-slate-700/90 leading-loose mt-0.5">
                    {step.kh}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* The Physics */}
        <section
          aria-labelledby={`physics-${ex.id}`}
          className="rounded-xl border-2 border-sky-300 bg-gradient-to-br from-sky-50 to-white p-4 sm:p-5"
          data-testid={`experiment-physics-${ex.id}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" aria-hidden />
            <h3
              id={`physics-${ex.id}`}
              className="font-display text-base sm:text-lg font-bold text-sky-900"
            >
              {t("The Physics", "រូបវិទ្យានៅខាងក្រោយ")}
              <span className="font-khmer text-sm sm:text-base font-normal text-sky-700/85 ml-2">
                · រូបវិទ្យានៅខាងក្រោយ
              </span>
            </h3>
          </div>

          <p className="text-base sm:text-lg font-bold text-sky-900 leading-relaxed">
            {ex.physicsBoldEn}
          </p>
          <p className="font-khmer text-base sm:text-lg font-bold text-sky-900 leading-loose mt-1">
            {ex.physicsBoldKh}
          </p>

          <p
            className={`mt-3 text-sm sm:text-base text-slate-800 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {ex.physicsEn}
          </p>
          <p className="font-khmer mt-2 text-sm sm:text-base text-slate-700 leading-loose">
            {ex.physicsKh}
          </p>
        </section>
      </div>
    </article>
  );
}
