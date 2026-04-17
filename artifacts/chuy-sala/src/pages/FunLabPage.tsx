import { Link } from "wouter";
import {
  ArrowLeft,
  AlertTriangle,
  FlaskConical,
  Flame,
  Leaf,
  Droplets,
  ListChecks,
  Lightbulb,
  Package,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Experiment = {
  number: string;
  titleEn: string;
  titleKh: string;
  taglineEn: string;
  taglineKh: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: {
    cardBorder: string;
    headerBg: string;
    headerIconBg: string;
    headerText: string;
    chip: string;
    sectionLabel: string;
    scienceBg: string;
    scienceBorder: string;
    scienceLabel: string;
  };
  materialsEn: string[];
  materialsKh: string[];
  stepsEn: string[];
  stepsKh: string[];
  scienceEn: React.ReactNode;
  scienceKh: React.ReactNode;
};

const EXPERIMENTS: Experiment[] = [
  {
    number: "01",
    titleEn: "The Fizzy Volcano",
    titleKh: "ភ្នំភ្លើងពពុះ",
    taglineEn: "An eruption powered by an acid–base reaction.",
    taglineKh: "ការផ្ទុះដែលបង្កើតឡើងដោយប្រតិកម្មអាស៊ីត–បាស។",
    icon: Flame,
    accent: {
      cardBorder: "border-orange-200",
      headerBg: "bg-gradient-to-br from-orange-50 to-red-50",
      headerIconBg: "bg-orange-600",
      headerText: "text-orange-900",
      chip: "bg-orange-100 text-orange-800",
      sectionLabel: "text-orange-800",
      scienceBg: "bg-orange-50",
      scienceBorder: "border-orange-500",
      scienceLabel: "text-orange-900",
    },
    materialsEn: [
      "2 tablespoons of baking soda",
      "About ½ cup of vinegar",
      "1 empty plastic bottle (small)",
      "A tray to catch the foam",
      "A few drops of dish soap (optional, makes more bubbles)",
      "Red food colouring (optional, for lava effect)",
    ],
    materialsKh: [
      "សូដាដុតនំ ២ ស្លាបព្រា",
      "ទឹកខ្មេះ ប្រហែល ½ កែវ",
      "ដបប្លាស្ទិចទទេ ១ (តូច)",
      "ថាសសម្រាប់ទ្រពពុះ",
      "សាប៊ូលាងចាន ពីរបី ដំណក់ (ស្រេចចិត្ត ធ្វើឱ្យពពុះកាន់តែច្រើន)",
      "ពណ៌ចំណីអាហារក្រហម (ស្រេចចិត្ត សម្រាប់ប្រសិទ្ធិភាពឡាវ៉ា)",
    ],
    stepsEn: [
      "Place the empty bottle in the centre of the tray.",
      "Spoon the baking soda into the bottle.",
      "Add a few drops of dish soap and food colouring if you have them.",
      "Pour the vinegar in quickly, then step back.",
      "Watch the foam erupt out of the bottle like lava!",
    ],
    stepsKh: [
      "ដាក់ដបទទេនៅកណ្តាលថាស។",
      "ដួសសូដាដុតនំចូលក្នុងដប។",
      "ដាក់សាប៊ូលាងចាន និងពណ៌ចំណីអាហារពីរបីដំណក់ បើអ្នកមាន។",
      "ចាក់ទឹកខ្មេះចូលយ៉ាងលឿន រួចដកថយ។",
      "មើលពពុះផ្ទុះចេញពីដបដូចឡាវ៉ា!",
    ],
    scienceEn: (
      <>
        Vinegar is an <strong>acid</strong> and baking soda is a{" "}
        <strong>base</strong>. When they meet, they react to make{" "}
        <strong>carbon dioxide gas (CO₂)</strong> — the same gas you breathe out!
        The CO₂ pushes through the soapy liquid, creating thousands of bubbles
        that overflow like a real volcano.
      </>
    ),
    scienceKh: (
      <>
        ទឹកខ្មេះគឺជា <strong>អាស៊ីត</strong> ហើយសូដាដុតនំគឺជា{" "}
        <strong>បាស</strong>។ ពេលពួកវាជួបគ្នា ពួកវាធ្វើប្រតិកម្មបង្កើតបានជា{" "}
        <strong>ឧស្ម័នកាបូនឌីអុកស៊ីត (CO₂)</strong> — ឧស្ម័នដូចគ្នានឹងអ្វីដែលអ្នកដកដង្ហើមចេញ!
        CO₂ រុញកាត់ទឹកសាប៊ូ បង្កើតពពុះរាប់ពាន់ ដែលហូរលើសដូចភ្នំភ្លើងពិត។
      </>
    ),
  },
  {
    number: "02",
    titleEn: "Red Cabbage pH Indicator",
    titleKh: "សូចនាករ pH ស្ពៃក្តោបស្វាយ",
    taglineEn: "Turn purple cabbage water into a magic colour-changing potion.",
    taglineKh: "ប្រែទឹកស្ពៃក្តោបស្វាយឱ្យក្លាយជាថ្នាំវេទមន្តដែលប្តូរពណ៌។",
    icon: Leaf,
    accent: {
      cardBorder: "border-purple-200",
      headerBg: "bg-gradient-to-br from-purple-50 to-fuchsia-50",
      headerIconBg: "bg-purple-600",
      headerText: "text-purple-900",
      chip: "bg-purple-100 text-purple-800",
      sectionLabel: "text-purple-800",
      scienceBg: "bg-purple-50",
      scienceBorder: "border-purple-500",
      scienceLabel: "text-purple-900",
    },
    materialsEn: [
      "Half a red (purple) cabbage",
      "A pot of water and a stove (with an adult)",
      "Lemon juice",
      "Liquid soap (or baking soda dissolved in water)",
      "3 clear cups or glasses",
      "A spoon for stirring",
    ],
    materialsKh: [
      "ស្ពៃក្តោបស្វាយ ½",
      "ឆ្នាំងទឹក និងចង្ក្រាន (ជាមួយមនុស្សពេញវ័យ)",
      "ទឹកក្រូចឆ្មារ",
      "សាប៊ូទឹក (ឬសូដាដុតនំរលាយក្នុងទឹក)",
      "ពែងថ្លា ឬកែវ ៣",
      "ស្លាបព្រាសម្រាប់កូរ",
    ],
    stepsEn: [
      "Chop the red cabbage and put it in the pot with water.",
      "Boil for about 10 minutes, then let it cool. The water turns deep purple.",
      "Pour the purple water into 3 cups so they're each half-full.",
      "Cup 1: leave it alone (this is your control).",
      "Cup 2: add a spoon of lemon juice — watch it turn pink or red!",
      "Cup 3: add a spoon of soapy water — watch it turn blue or green!",
    ],
    stepsKh: [
      "កាត់ស្ពៃក្តោបស្វាយ ហើយដាក់ក្នុងឆ្នាំងជាមួយទឹក។",
      "ដាំឱ្យពុះប្រហែល ១០ នាទី រួចទុកឱ្យត្រជាក់។ ទឹកនឹងប្រែទៅជាពណ៌ស្វាយជ្រៅ។",
      "ចាក់ទឹកស្វាយចូលក្នុងពែង ៣ ឱ្យពាក់កណ្តាលនីមួយៗ។",
      "ពែងទី ១៖ ទុកចោល (ជាគំរូត្រួតពិនិត្យ)។",
      "ពែងទី ២៖ ដាក់ទឹកក្រូចឆ្មារ ១ ស្លាបព្រា — មើលវាប្រែទៅជាពណ៌ផ្កាឈូក ឬក្រហម!",
      "ពែងទី ៣៖ ដាក់ទឹកសាប៊ូ ១ ស្លាបព្រា — មើលវាប្រែទៅជាពណ៌ខៀវ ឬបៃតង!",
    ],
    scienceEn: (
      <>
        Red cabbage contains a natural pigment called{" "}
        <strong>anthocyanin</strong>. Anthocyanin is sensitive to pH: it turns{" "}
        <strong>red/pink in acids</strong> (like lemon juice) and{" "}
        <strong>green/blue in bases</strong> (like soap). Scientists use this
        kind of substance as a <strong>pH indicator</strong> to tell whether a
        liquid is acidic or basic.
      </>
    ),
    scienceKh: (
      <>
        ស្ពៃក្តោបស្វាយផ្ទុកសារធាតុពណ៌ធម្មជាតិដែលហៅថា{" "}
        <strong>អានតូស្យានីន</strong>។ អានតូស្យានីនមានភាពប្រែប្រួលនឹង pH៖ វាប្រែទៅជា{" "}
        <strong>ពណ៌ក្រហម/ផ្កាឈូកនៅក្នុងអាស៊ីត</strong> (ដូចជាទឹកក្រូចឆ្មារ) ហើយប្រែទៅជា{" "}
        <strong>ពណ៌បៃតង/ខៀវនៅក្នុងបាស</strong> (ដូចជាសាប៊ូ)។ អ្នកវិទ្យាសាស្ត្រប្រើសារធាតុបែបនេះជា{" "}
        <strong>សូចនាករ pH</strong> ដើម្បីប្រាប់ថាទឹកមួយជាអាស៊ីត ឬបាស។
      </>
    ),
  },
  {
    number: "03",
    titleEn: "The Magic Leak-Proof Bag",
    titleKh: "កាបូបវេទមន្តមិនជ្រាបទឹក",
    taglineEn: "Stab a bag full of water — and not a single drop escapes.",
    taglineKh: "ចាក់កាបូបពេញដោយទឹក — ហើយគ្មានដំណក់ណាមួយហូរចេញឡើយ។",
    icon: Droplets,
    accent: {
      cardBorder: "border-blue-200",
      headerBg: "bg-gradient-to-br from-blue-50 to-sky-50",
      headerIconBg: "bg-blue-600",
      headerText: "text-blue-900",
      chip: "bg-blue-100 text-blue-800",
      sectionLabel: "text-blue-800",
      scienceBg: "bg-blue-50",
      scienceBorder: "border-blue-500",
      scienceLabel: "text-blue-900",
    },
    materialsEn: [
      "1 zip-lock plastic bag (sandwich size)",
      "Tap water",
      "2–3 sharp pencils with pointed tips",
      "A sink or basin (just in case)",
    ],
    materialsKh: [
      "កាបូបប្លាស្ទិចហ្ស៊ីប ១ (ទំហំសង់វីច)",
      "ទឹកម៉ាស៊ីន",
      "ខ្មៅដៃមុតស្រួច ២–៣",
      "ចានទឹក ឬអាងបន្ទាប់ (ក្នុងករណីគ្រោះថ្នាក់)",
    ],
    stepsEn: [
      "Fill the zip-lock bag about three-quarters full with water and seal it tight.",
      "Hold the bag over the sink with one hand, gripping the top.",
      "Take a sharp pencil with your other hand.",
      "Push the pencil quickly and firmly straight through both sides of the bag.",
      "The pencil stays in — and the water does not leak out!",
      "Try it with another pencil. How many can you add?",
    ],
    stepsKh: [
      "ដាក់ទឹកក្នុងកាបូបហ្ស៊ីបឱ្យបាន ¾ រួចបិទឱ្យជិត។",
      "កាន់កាបូបនៅពីលើចានទឹកដោយដៃមួយ ដោយចាប់ផ្នែកខាងលើ។",
      "យកខ្មៅដៃមុតស្រួចមួយដោយដៃម្ខាងទៀត។",
      "រុញខ្មៅដៃយ៉ាងលឿន និងរឹងមាំ ឱ្យចាក់ទម្លុះកាបូបទាំងសងខាង។",
      "ខ្មៅដៃនៅជាប់ — ហើយទឹកមិនហូរចេញ!",
      "សាកល្បងជាមួយខ្មៅដៃមួយទៀត។ តើអ្នកអាចបន្ថែមបានប៉ុន្មាន?",
    ],
    scienceEn: (
      <>
        Plastic bags are made of long molecules called <strong>polymers</strong>{" "}
        — think of them as super-long chains of beads linked end to end. When
        the sharp pencil pokes through, those flexible chains stretch and{" "}
        <strong>wrap tightly around the pencil</strong>, sealing the hole as
        they go. No gap = no leak!
      </>
    ),
    scienceKh: (
      <>
        កាបូបប្លាស្ទិចត្រូវបានធ្វើពីម៉ូលេគុលវែងហៅថា <strong>ប៉ូលីមែរ</strong> —
        គិតថាពួកវាជាខ្សែវែងៗនៃអង្គុលីភ្ជាប់គ្នាពីចុងមួយទៅចុងមួយ។ នៅពេលខ្មៅដៃមុតស្រួចចាក់ទម្លុះ
        ខ្សែបត់បែនទាំងនោះលាតសន្ធឹង ហើយ <strong>រុំជាប់ជុំវិញខ្មៅដៃ</strong> បិទរន្ធនៅពេលវាចូល។
        គ្មានចន្លោះ = គ្មានការលេចធ្លាយ!
      </>
    ),
  },
];

export function FunLabPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-background to-background py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/chemistry"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Chemistry Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា")}
        </Link>

        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow">
              <FlaskConical className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-amber-700 opacity-80 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Science Hub", "មជ្ឈមណ្ឌលវិទ្យាសាស្ត្រ")}
              </span>
              <h1
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t("Fun Lab", "មន្ទីរពិសោធន៍កំសាន្ត")}
              </h1>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Three safe, hands-on chemistry experiments you can do at home with things from your kitchen. Read the safety rules first — then have fun!",
              "ការពិសោធន៍គីមីវិទ្យាសុវត្ថិភាពបី ដែលអ្នកអាចធ្វើនៅផ្ទះជាមួយរបស់របរក្នុងផ្ទះបាយ។ សូមអានច្បាប់សុវត្ថិភាពមុនសិន — រួចសប្បាយ!",
            )}
          </p>
        </header>

        {/* ── Safety First Banner ──────────────────────────────── */}
        <div
          role="alert"
          className="rounded-2xl bg-red-50 border-2 border-red-300 shadow-sm p-4 sm:p-5 mb-8 flex items-start gap-3 sm:gap-4"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h2
              className={`text-base sm:text-lg font-bold text-red-900 mb-1 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t("Safety First!", "សុវត្ថិភាពមុនគេ!")}
            </h2>
            <p
              className={`text-sm sm:text-base text-red-900/90 leading-relaxed ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Always perform these experiments with an adult. Never taste or eat your experiments!",
                "តែងតែធ្វើការពិសោធន៍ទាំងនេះជាមួយមនុស្សពេញវ័យ។ កុំភ្លក់ ឬញ៉ាំការពិសោធន៍របស់អ្នក!",
              )}
            </p>
          </div>
        </div>

        {/* ── Experiment recipe cards ──────────────────────────── */}
        <div className="space-y-6">
          {EXPERIMENTS.map((exp) => (
            <RecipeCard key={exp.number} experiment={exp} />
          ))}
        </div>

        {/* Footer note */}
        <p
          className={`mt-10 text-center text-xs sm:text-sm text-muted-foreground ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "Want to know the chemistry behind these reactions? Visit the Chemistry Hub.",
            "ចង់ដឹងពីគីមីវិទ្យានៅពីក្រោយប្រតិកម្មទាំងនេះមែនទេ? សូមទៅកាន់មជ្ឈមណ្ឌលគីមីវិទ្យា។",
          )}
        </p>
      </div>
    </div>
  );
}

// ── Recipe Card ───────────────────────────────────────────────────────────
function RecipeCard({ experiment: e }: { experiment: Experiment }) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const Icon = e.icon;

  return (
    <article className={`rounded-3xl bg-white border-2 ${e.accent.cardBorder} shadow-sm overflow-hidden`}>
      {/* Card header */}
      <header className={`${e.accent.headerBg} px-5 sm:px-6 py-5`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl ${e.accent.headerIconBg} text-white flex items-center justify-center flex-shrink-0 shadow`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className={`text-[10px] font-bold tracking-widest uppercase ${e.accent.headerText} opacity-70 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t(`Experiment ${e.number}`, `ការពិសោធន៍ ${e.number}`)}
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold ${e.accent.headerText} leading-tight ${kh ? "font-khmer" : ""}`}>
              {kh ? e.titleKh : e.titleEn}
            </h2>
            <p className={`text-sm sm:text-base text-foreground/70 mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? e.taglineKh : e.taglineEn}
            </p>
          </div>
        </div>
      </header>

      {/* Card body — recipe layout */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Materials */}
        <div>
          <SectionLabel
            icon={Package}
            color={e.accent.sectionLabel}
            labelEn="Materials"
            labelKh="សម្ភារៈ"
          />
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
            <BilingualBulletList itemsEn={e.materialsEn} itemsKh={e.materialsKh} />
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Steps */}
        <div>
          <SectionLabel
            icon={ListChecks}
            color={e.accent.sectionLabel}
            labelEn="Steps"
            labelKh="ជំហាន"
          />
          <ol
            className={`mt-2 space-y-2 text-sm sm:text-base text-foreground/85 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {(kh ? e.stepsKh : e.stepsEn).map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${e.accent.chip} font-mono text-xs font-bold flex-shrink-0 mt-0.5`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="flex-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* The Science */}
        <div className={`rounded-xl ${e.accent.scienceBg} border-l-4 ${e.accent.scienceBorder} px-4 py-3 flex items-start gap-2.5`}>
          <Lightbulb className={`w-5 h-5 ${e.accent.scienceLabel} flex-shrink-0 mt-0.5`} />
          <div className="flex-1 min-w-0">
            <div className={`text-xs font-bold uppercase tracking-wider ${e.accent.scienceLabel} opacity-80 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
              {t("The Science", "វិទ្យាសាស្ត្រ")}
            </div>
            <p className={`text-sm sm:text-base text-foreground/85 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? e.scienceKh : e.scienceEn}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function SectionLabel({
  icon: Icon,
  color,
  labelEn,
  labelKh,
}: {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  labelEn: string;
  labelKh: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <div className={`inline-flex items-center gap-1.5 ${color} ${kh ? "font-khmer" : ""}`}>
      <Icon className="w-4 h-4" />
      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
        {kh ? labelKh : labelEn}
      </span>
    </div>
  );
}

function BilingualBulletList({
  itemsEn,
  itemsKh,
}: {
  itemsEn: string[];
  itemsKh: string[];
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const items = kh ? itemsKh : itemsEn;
  return (
    <ul className={`list-disc pl-5 text-sm sm:text-base text-foreground/85 space-y-1 ${kh ? "font-khmer leading-loose" : ""}`}>
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}
