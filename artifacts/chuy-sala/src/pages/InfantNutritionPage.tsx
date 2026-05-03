import type { ComponentType, ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Baby,
  Milk,
  HeartPulse,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Heart,
  Brain,
  Sun,
  FlaskConical,
  Sparkles,
  Cross,
  Users,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Infant Nutrition: Formula, Breast Milk, and Safety
 * អាហារូបត្ថម្ភទារក៖ ទឹកដោះគោម្សៅ ទឹកដោះម្តាយ និងសុវត្ថិភាព
 * Module: Well-Being → Parenting & Health
 * Aesthetic: soft pastel yellows + baby blues, medical cross icons.
 * Self-contained, no new dependencies.
 * ══════════════════════════════════════════════════════════════════════════ */

export function InfantNutritionPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-sky-50 text-slate-900 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden"
      data-testid="infant-nutrition-page"
    >
      {/* Soft pastel ambience */}
      <div
        aria-hidden
        className="absolute -top-32 -left-24 w-[36rem] h-[36rem] rounded-full bg-amber-200/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-24 w-[36rem] h-[36rem] rounded-full bg-sky-200/40 blur-3xl pointer-events-none"
      />
      <SoftDots />

      <div className="relative max-w-5xl mx-auto">
        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          href="/well-being/family-development"
          data-testid="link-back-to-parenting"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-900 transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Parenting & Development", "ត្រឡប់ទៅការចិញ្ចឹមបីបាច់ និងការវិវត្ត")}
        </Link>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <header className="mb-10 sm:mb-12" data-testid="hero">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-200 to-sky-300 shadow-md flex items-center justify-center">
                <Baby className="w-8 h-8 sm:w-9 sm:h-9 text-amber-900" strokeWidth={2.25} />
              </div>
              {/* Medical cross badge */}
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-rose-300 flex items-center justify-center shadow">
                <Cross className="w-3.5 h-3.5 text-rose-500" strokeWidth={3} />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold tracking-[0.25em] uppercase text-sky-700 mb-1.5">
                <Heart className="w-3 h-3" />
                <span>Parenting · Health</span>
                <span className="opacity-50" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-sky-700">
                  ការចិញ្ចឹមបីបាច់ · សុខភាព
                </span>
              </span>
              <h1
                id="infant-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
                data-testid="page-title"
              >
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-sky-600 bg-clip-text text-transparent">
                  Infant Nutrition:
                </span>{" "}
                <span className="text-slate-900">Formula, Breast Milk, and Safety</span>
              </h1>
              <p
                className="font-khmer text-lg sm:text-xl md:text-2xl text-slate-700 leading-snug mt-2"
                data-testid="page-title-kh"
              >
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-sky-600 bg-clip-text text-transparent">
                  អាហារូបត្ថម្ភទារក៖
                </span>{" "}
                <span>ទឹកដោះគោម្សៅ ទឹកដោះម្តាយ និងសុវត្ថិភាព</span>
              </p>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "What goes into a baby's bottle is one of the most important decisions a family makes. Here's the science of commercial formula, an honest comparison with breast milk, and a clear safety warning every caregiver in Cambodia should know.",
              "អ្វីដែលដាក់ក្នុងដបទារកគឺជាការសម្រេចចិត្តសំខាន់បំផុតមួយដែលគ្រួសារធ្វើ។ នេះគឺវិទ្យាសាស្ត្រនៃទឹកដោះគោម្សៅពាណិជ្ជកម្ម ការប្រៀបធៀបស្មោះត្រង់ជាមួយទឹកដោះម្តាយ និងការព្រមានសុវត្ថិភាពច្បាស់លាស់ដែលអ្នកថែទាំគ្រប់រូបនៅកម្ពុជាគួរដឹង។",
            )}
          </p>
        </header>

        {/* ── Section 1: What is Baby Formula? ────────────────────── */}
        <Section
          number={1}
          icon={FlaskConical}
          tone="amber"
          titleEn="What is Baby Formula?"
          titleKh="តើទឹកដោះគោម្សៅទារកគឺជាអ្វី?"
          subtitleEn="Engineered, regulated, and far more than 'just powdered milk'"
          subtitleKh="រចនាដោយវិទ្យាសាស្ត្រ បានគ្រប់គ្រង និងលើសពីគ្រាន់តែ «ម្សៅទឹកដោះ»"
          dataTestid="section-what-is-formula"
        >
          <SoftCard testid="formula-explainer">
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              <BL
                en="Commercial baby formula is one of the most heavily regulated foods in the world. Every can must meet strict government standards before it reaches a shelf. It usually starts as cow's milk (or sometimes soy) that has been chemically altered so an infant's tiny digestive system can break it down nearly as easily as human milk."
                kh="ទឹកដោះគោម្សៅទារកពាណិជ្ជកម្មគឺជាអាហារដែលត្រូវបានគ្រប់គ្រងយ៉ាងតឹងរ៉ឹងបំផុតមួយនៅលើពិភពលោក។ កំប៉ុងនីមួយៗត្រូវឆ្លងស្តង់ដារតឹងរឹងរបស់រដ្ឋាភិបាលមុនពេលដាក់លើធ្នើ។ វាជាធម្មតាចាប់ផ្ដើមជាទឹកដោះគោ (ឬពេលខ្លះសណ្ដែកសៀង) ដែលត្រូវបានកែប្រែគីមី ដើម្បីឱ្យប្រព័ន្ធរំលាយតូចរបស់ទារកអាចបំបែកវាបានស្ទើរតែងាយដូចទឹកដោះមនុស្ស។"
              />
            </p>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed mt-3">
              <BL
                en="Then it is fortified — extra nutrients are added so each bottle delivers exactly what a growing infant needs:"
                kh="បន្ទាប់មកវាត្រូវបានបន្ថែមសារធាតុចិញ្ចឹម — សារធាតុចិញ្ចឹមបន្ថែមត្រូវបានបន្ថែម ដើម្បីឱ្យដបនីមួយៗផ្ដល់នូវអ្វីដែលទារកកំពុងលូតលាស់ត្រូវការច្បាស់លាស់៖"
              />
            </p>
          </SoftCard>

          {/* Essential additives */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5">
            <NutrientCard
              icon={Sparkles}
              tone="rose"
              labelEn="Iron"
              labelKh="ជាតិដែក"
              forEn="Healthy blood"
              forKh="ឈាមមានសុខភាពល្អ"
            />
            <NutrientCard
              icon={Sun}
              tone="amber"
              labelEn="Vitamin D"
              labelKh="វីតាមីន D"
              forEn="Strong bones"
              forKh="ឆ្អឹងរឹងមាំ"
            />
            <NutrientCard
              icon={Cross}
              tone="sky"
              labelEn="Calcium"
              labelKh="កាល់ស្យូម"
              forEn="Bones & teeth"
              forKh="ឆ្អឹង និងធ្មេញ"
            />
            <NutrientCard
              icon={Brain}
              tone="violet"
              labelEn="DHA"
              labelKh="DHA"
              forEn="Brain development"
              forKh="ការអភិវឌ្ឍខួរក្បាល"
            />
          </div>

          <p className="text-xs sm:text-sm text-slate-600 italic mt-4 leading-relaxed">
            <BL
              en="DHA is an omega-3 fatty acid that the human brain is largely built from in the first two years of life — it's why every reputable formula must include it."
              kh="DHA គឺជាអាស៊ីតខ្លាញ់អូមេហ្គា-៣ ដែលខួរក្បាលមនុស្សត្រូវបានសាងសង់ភាគច្រើនពីវានៅក្នុងពីរឆ្នាំដំបូងនៃជីវិត — នេះជាហេតុដែលទឹកដោះគោម្សៅគ្រប់ម៉ាកដែលគួរទុកចិត្តត្រូវបញ្ចូលវា។"
            />
          </p>
        </Section>

        {/* ── Section 2: Breast Milk vs. Formula ──────────────────── */}
        <Section
          number={2}
          icon={Milk}
          tone="sky"
          titleEn="Breast Milk vs. Formula"
          titleKh="ទឹកដោះម្តាយ ប្រៀបធៀបនឹង ទឹកដោះគោម្សៅ"
          subtitleEn="Both can grow a healthy baby — here's what each one offers"
          subtitleKh="ទាំងពីរអាចចិញ្ចឹមទារកឱ្យមានសុខភាពល្អបាន — នេះជាអ្វីដែលនីមួយៗផ្ដល់ឱ្យ"
          dataTestid="section-comparison"
        >
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {/* Breast Milk card */}
            <ComparisonCard
              icon={Heart}
              tone="rose"
              tagEn="The biological gold standard"
              tagKh="ស្តង់ដារមាសជីវសាស្ត្រ"
              titleEn="Breast Milk"
              titleKh="ទឹកដោះម្តាយ"
              points={[
                {
                  en: "Live antibodies",
                  kh: "អង់ទីករពេញដៃ",
                  bodyEn:
                    "Contains living immune cells from the mother that fight infections — formula simply cannot replicate this.",
                  bodyKh:
                    "មានកោសិកាភាពស៊ាំរស់ៗពីម្តាយ ដែលប្រយុទ្ធនឹងការឆ្លងមេរោគ — ទឹកដោះគោម្សៅមិនអាចចម្លងវាបានទេ។",
                },
                {
                  en: "Dynamic recipe",
                  kh: "រូបមន្តប្រែប្រួល",
                  bodyEn:
                    "The fat, protein, and antibody mix changes day-to-day as the baby grows and even varies through a single feeding.",
                  bodyKh:
                    "ការលាយខ្លាញ់ ប្រូតេអ៊ីន និងអង់ទីករប្រែប្រួលពីថ្ងៃមួយទៅថ្ងៃមួយ ពេលទារកកំពុងលូតលាស់ ហើយថែមទាំងប្រែប្រួលក្នុងការបំបៅមួយដងផងដែរ។",
                },
                {
                  en: "Free",
                  kh: "ឥតគិតថ្លៃ",
                  bodyEn:
                    "No bottles, no powder to buy, no hot water needed. Always at the right temperature.",
                  bodyKh:
                    "គ្មានដប គ្មានម្សៅត្រូវទិញ គ្មានទឹកក្ដៅត្រូវការ។ តែងតែនៅសីតុណ្ហភាពត្រឹមត្រូវ។",
                },
              ]}
              testid="card-breast-milk"
            />

            {/* Formula card */}
            <ComparisonCard
              icon={Milk}
              tone="sky"
              tagEn="A safe, complete alternative"
              tagKh="ជម្រើសសុវត្ថិភាព និងពេញលេញ"
              titleEn="Baby Formula"
              titleKh="ទឹកដោះគោម្សៅ"
              points={[
                {
                  en: "Guaranteed nutrition",
                  kh: "អាហារូបត្ថម្ភធានា",
                  bodyEn:
                    "Every bottle delivers the same precise amounts of vitamins, minerals, and calories — verified by regulators.",
                  bodyKh:
                    "ដបនីមួយៗផ្ដល់នូវវីតាមីន សារធាតុរ៉ែ និងកាឡូរី ក្នុងបរិមាណច្បាស់លាស់ដូចគ្នា — ត្រូវបានផ្ទៀងផ្ទាត់ដោយអ្នកកំណត់បទប្បញ្ញត្តិ។",
                },
                {
                  en: "Life-saving when needed",
                  kh: "ជួយសង្គ្រោះជីវិតពេលត្រូវការ",
                  bodyEn:
                    "A vital option when a mother cannot breastfeed — for medical reasons, low supply, or after adoption.",
                  bodyKh:
                    "ជាជម្រើសសំខាន់ពេលម្តាយមិនអាចបំបៅបាន — ដោយសារហេតុផលវេជ្ជសាស្ត្រ ផ្គត់ផ្គង់តិច ឬបន្ទាប់ពីការសុំកូនចិញ្ចឹម។",
                },
                {
                  en: "Anyone can feed",
                  kh: "នរណាក៏អាចបំបៅបាន",
                  bodyEn:
                    "Fathers, grandparents, and other caregivers can take turns. Digests slower than breast milk, so babies sometimes sleep longer between feeds.",
                  bodyKh:
                    "ឪពុក ជីដូនជីតា និងអ្នកថែទាំផ្សេងទៀតអាចផ្លាស់វេនបាន។ រំលាយយឺតជាងទឹកដោះម្តាយ ដូច្នេះពេលខ្លះទារកដេកបានយូរជាងរវាងការបំបៅ។",
                },
              ]}
              testid="card-formula"
            />
          </div>

          {/* Reassurance footer */}
          <div
            className="mt-5 rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-4 sm:p-5 backdrop-blur-sm flex items-start gap-3"
            data-testid="reassurance"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-white flex items-center justify-center flex-shrink-0 shadow">
              <Users className="w-5 h-5" strokeWidth={2.25} />
            </div>
            <p className="text-sm text-slate-800 leading-relaxed">
              <BL
                en="A fed baby is a healthy baby. There is no shame in either choice — the right one depends on your family's circumstances."
                kh="ទារកដែលបានបំបៅគ្រប់គ្រាន់គឺជាទារកដែលមានសុខភាពល្អ។ គ្មានការអាម៉ាស់ចំពោះជម្រើសណាមួយឡើយ — ជម្រើសត្រឹមត្រូវអាស្រ័យលើស្ថានភាពគ្រួសាររបស់អ្នក។"
              />
            </p>
          </div>
        </Section>

        {/* ── Section 3: WARNING — Homemade Formula ──────────────── */}
        <Section
          number={3}
          icon={ShieldAlert}
          tone="rose"
          titleEn="The Danger of Homemade Formula"
          titleKh="គ្រោះថ្នាក់នៃទឹកដោះគោម្សៅធ្វើដោយខ្លួនឯង"
          subtitleEn="Please read this carefully — lives depend on it"
          subtitleKh="សូមអានដោយយកចិត្តទុកដាក់ — ជីវិតអាស្រ័យលើវា"
          dataTestid="section-warning"
        >
          {/* High-visibility warning block */}
          <div
            role="alert"
            aria-labelledby="homemade-warning-title"
            className="relative rounded-3xl overflow-hidden border-4 border-rose-500 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 p-5 sm:p-7 shadow-[0_0_36px_rgba(244,63,94,0.25)]"
            data-testid="warning-block"
          >
            {/* Diagonal warning stripes top */}
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-2"
              style={{
                background:
                  "repeating-linear-gradient(45deg, #f43f5e 0 12px, #fde68a 12px 24px)",
              }}
            />
            {/* Diagonal warning stripes bottom */}
            <div
              aria-hidden
              className="absolute bottom-0 left-0 right-0 h-2"
              style={{
                background:
                  "repeating-linear-gradient(45deg, #f43f5e 0 12px, #fde68a 12px 24px)",
              }}
            />

            <div className="flex items-start gap-4 mb-5 mt-1">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg ring-4 ring-rose-200">
                  <AlertTriangle className="w-9 h-9" strokeWidth={2.5} />
                </div>
                <span aria-hidden className="absolute inset-0 rounded-2xl ring-4 ring-rose-300/50 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-[0.25em] mb-2 shadow">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Warning</span>
                  <span className="opacity-70" aria-hidden>·</span>
                  <span className="font-khmer normal-case tracking-normal">ការព្រមាន</span>
                </span>
                <h3
                  id="homemade-warning-title"
                  className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-rose-900 leading-tight"
                >
                  Never attempt to make homemade baby formula.
                </h3>
                <h4 className="font-khmer text-base sm:text-lg md:text-xl text-rose-900 leading-snug mt-1.5">
                  កុំព្យាយាមធ្វើទឹកដោះគោម្សៅទារកដោយខ្លួនឯងឱ្យសោះ។
                </h4>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-900 leading-relaxed mb-5">
              <BL
                en="Recipes circulating online and through word of mouth — using regular cow's milk, goat's milk, evaporated milk, condensed milk, sugar, oil, or plant milks — cannot meet a baby's needs. An infant's body is not a small adult's body."
                kh="រូបមន្តដែលចែកចាយតាមអ៊ីនធឺណិត និងតាមមាត់ — ដោយប្រើទឹកដោះគោធម្មតា ទឹកដោះពពែ ទឹកដោះបានហួត ទឹកដោះកំប៉ុង ស្ករ ប្រេង ឬទឹកដោះបន្លែ — មិនអាចបំពេញតម្រូវការរបស់ទារកបានទេ។ រាងកាយរបស់ទារកមិនមែនជារាងកាយមនុស្សពេញវ័យតូចទេ។"
              />
            </p>

            {/* Why it's dangerous */}
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-rose-700 mb-3 inline-flex flex-wrap gap-x-2 gap-y-0.5">
                <span>Why it's dangerous</span>
                <span className="opacity-50" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal">
                  ហេតុអ្វីបានជាមានគ្រោះថ្នាក់
                </span>
              </div>
              <ul className="space-y-3">
                <DangerItem
                  titleEn="Missing vitamins & nutrients"
                  titleKh="វីតាមីន និងសារធាតុចិញ្ចឹមខ្វះ"
                  bodyEn="Regular cow's, goat's, and plant milks lack the precise iron, vitamin D, DHA, and other micronutrients an infant must have to grow normally. Severe malnutrition develops quickly."
                  bodyKh="ទឹកដោះគោ ទឹកដោះពពែ និងទឹកដោះបន្លែធម្មតាខ្វះជាតិដែក វីតាមីន D DHA និងសារធាតុចិញ្ចឹមផ្សេងទៀត ដែលទារកត្រូវមានច្បាស់លាស់ដើម្បីលូតលាស់ធម្មតា។ កង្វះអាហារូបត្ថម្ភធ្ងន់ធ្ងរនឹងវិវត្តយ៉ាងលឿន។"
                />
                <DangerItem
                  titleEn="Too much protein & salt"
                  titleKh="ប្រូតេអ៊ីន និងអំបិលច្រើនពេក"
                  bodyEn="Cow's milk has too much protein and minerals for a baby's small kidneys to filter. Salt imbalances can cause seizures and lasting brain injury."
                  bodyKh="ទឹកដោះគោមានប្រូតេអ៊ីន និងសារធាតុរ៉ែច្រើនពេក សម្រាប់តម្រងតូចៗរបស់ទារក។ ភាពមិនស្មើនៃអំបិលអាចបណ្ដាលឱ្យមានជំងឺឆ្កួតជ្រូក និងរបួសខួរក្បាលជារៀងរហូត។"
                />
                <DangerItem
                  titleEn="Bacterial infection"
                  titleKh="ការឆ្លងមេរោគបាក់តេរី"
                  bodyEn="Unsterilized ingredients, raw milk, or unsafe water can introduce bacteria that an infant's immature immune system cannot fight off — and the result can be fatal."
                  bodyKh="គ្រឿងផ្សំមិនបានសម្លាប់មេរោគ ទឹកដោះឆៅ ឬទឹកមិនមានសុវត្ថិភាពអាចនាំមកនូវបាក់តេរី ដែលប្រព័ន្ធភាពស៊ាំមិនទាន់ពេញលេញរបស់ទារកមិនអាចប្រយុទ្ធបាន — ហើយលទ្ធផលអាចជាមរណភាព។"
                />
              </ul>
            </div>

            {/* What to do instead */}
            <div className="mt-6 pt-5 border-t-2 border-dashed border-rose-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow">
                  <ShieldCheck className="w-5 h-5" strokeWidth={2.25} />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-extrabold text-emerald-900 leading-tight">
                    What to do instead
                  </h4>
                  <h5 className="font-khmer text-sm sm:text-base text-emerald-900 leading-snug mt-0.5">
                    អ្វីដែលត្រូវធ្វើជំនួសវិញ
                  </h5>
                  <p className="text-sm text-slate-800 leading-relaxed mt-2">
                    <BL
                      en="If commercial formula is unaffordable or unavailable, talk to a doctor, nurse, midwife, or a hospital's infant feeding clinic immediately. Many countries — including Cambodia — have programs that can help."
                      kh="បើទឹកដោះគោម្សៅពាណិជ្ជកម្មថ្លៃពេក ឬគ្មាន សូមនិយាយជាមួយវេជ្ជបណ្ឌិត គិលានុបដ្ឋាក ឆ្មប ឬគ្លីនិកអាហារទារករបស់មន្ទីរពេទ្យភ្លាមៗ។ ប្រទេសជាច្រើន — រួមទាំងកម្ពុជា — មានកម្មវិធីដែលអាចជួយបាន។"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Footer note ─────────────────────────────────────────── */}
        <p
          className={`mt-12 text-center text-xs sm:text-sm text-slate-500 italic max-w-2xl mx-auto ${
            kh ? "font-khmer not-italic leading-loose" : ""
          }`}
        >
          {t(
            "This page is general education, not medical advice. For decisions about your baby, please speak with a qualified healthcare provider in Cambodia.",
            "ទំព័រនេះគឺជាការអប់រំទូទៅ មិនមែនជាដំបូន្មានវេជ្ជសាស្ត្រទេ។ សម្រាប់ការសម្រេចចិត្តអំពីទារករបស់អ្នក សូមនិយាយជាមួយអ្នកផ្ដល់សេវាសុខាភិបាលដែលមានគុណវុឌ្ឍិនៅកម្ពុជា។",
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

function SoftDots() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.18]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="soft-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="16" cy="16" r="1.2" fill="#fbbf24" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#soft-dots)" />
    </svg>
  );
}

type Tone = "amber" | "sky" | "rose" | "violet";

const TONE: Record<
  Tone,
  {
    bg: string;
    text: string;
    border: string;
    soft: string;
    chip: string;
  }
> = {
  amber: {
    bg: "bg-gradient-to-br from-amber-300 to-amber-500",
    text: "text-amber-700",
    border: "border-amber-200",
    soft: "bg-amber-50",
    chip: "bg-amber-100 text-amber-800",
  },
  sky: {
    bg: "bg-gradient-to-br from-sky-300 to-sky-500",
    text: "text-sky-700",
    border: "border-sky-200",
    soft: "bg-sky-50",
    chip: "bg-sky-100 text-sky-800",
  },
  rose: {
    bg: "bg-gradient-to-br from-rose-400 to-rose-600",
    text: "text-rose-700",
    border: "border-rose-200",
    soft: "bg-rose-50",
    chip: "bg-rose-100 text-rose-800",
  },
  violet: {
    bg: "bg-gradient-to-br from-violet-400 to-violet-600",
    text: "text-violet-700",
    border: "border-violet-200",
    soft: "bg-violet-50",
    chip: "bg-violet-100 text-violet-800",
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
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  children: ReactNode;
  dataTestid: string;
}) {
  const T = TONE[tone];
  return (
    <section className="mb-10 sm:mb-12 scroll-mt-24" data-testid={dataTestid}>
      <header className="mb-5 sm:mb-6">
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-2xl ${T.bg} text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-white`}>
            <Icon className="w-6 h-6" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`inline-block text-[10px] font-bold tracking-[0.25em] uppercase ${T.text} mb-0.5`}>
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

function SoftCard({ children, testid }: { children: ReactNode; testid?: string }) {
  return (
    <div
      className="rounded-2xl border-2 border-amber-200 bg-white/90 backdrop-blur-sm p-5 sm:p-6 shadow-sm"
      data-testid={testid}
    >
      {children}
    </div>
  );
}

function NutrientCard({
  icon: Icon,
  tone,
  labelEn,
  labelKh,
  forEn,
  forKh,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  labelEn: string;
  labelKh: string;
  forEn: string;
  forKh: string;
}) {
  const T = TONE[tone];
  return (
    <div className={`rounded-2xl border-2 ${T.border} ${T.soft} p-3 sm:p-4 text-center shadow-sm`}>
      <div className={`mx-auto w-11 h-11 rounded-xl ${T.bg} text-white flex items-center justify-center shadow ring-2 ring-white mb-2`}>
        <Icon className="w-5 h-5" strokeWidth={2.25} />
      </div>
      <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
        {labelEn}
      </div>
      <div className="font-khmer text-xs sm:text-sm text-slate-700 leading-snug">
        {labelKh}
      </div>
      <div className={`mt-2 text-[11px] font-bold uppercase tracking-wider ${T.text}`}>
        {forEn}
      </div>
      <div className="font-khmer text-[11px] text-slate-600 leading-snug">{forKh}</div>
    </div>
  );
}

function ComparisonCard({
  icon: Icon,
  tone,
  tagEn,
  tagKh,
  titleEn,
  titleKh,
  points,
  testid,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: Tone;
  tagEn: string;
  tagKh: string;
  titleEn: string;
  titleKh: string;
  points: { en: string; kh: string; bodyEn: string; bodyKh: string }[];
  testid: string;
}) {
  const T = TONE[tone];
  return (
    <article
      className={`relative rounded-2xl border-2 ${T.border} bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
      data-testid={testid}
    >
      <div aria-hidden className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${T.bg} opacity-10 blur-2xl`} />
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-2xl ${T.bg} text-white flex items-center justify-center shadow ring-2 ring-white`}>
            <Icon className="w-6 h-6" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`block text-[10px] font-bold uppercase tracking-[0.2em] ${T.text} inline-flex flex-wrap gap-x-2 gap-y-0.5`}>
              <span>{tagEn}</span>
              <span className="opacity-50" aria-hidden>·</span>
              <span className="font-khmer normal-case tracking-normal">{tagKh}</span>
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
              {titleEn}
            </h3>
            <h4 className="font-khmer text-sm sm:text-base text-slate-700 leading-snug">
              {titleKh}
            </h4>
          </div>
        </div>

        <ul className="space-y-3 mt-4">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className={`w-5 h-5 ${T.text} flex-shrink-0 mt-0.5`} strokeWidth={2.5} />
              <div>
                <div className="text-sm font-bold text-slate-900 inline-flex flex-wrap gap-x-2 gap-y-0.5">
                  <span>{p.en}</span>
                  <span className="opacity-50" aria-hidden>·</span>
                  <span className="font-khmer normal-case font-normal">{p.kh}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-0.5">
                  {p.bodyEn}
                </p>
                <p className="font-khmer text-xs sm:text-sm text-slate-700 leading-loose mt-1">
                  {p.bodyKh}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function DangerItem({
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
}: {
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  return (
    <li className="flex items-start gap-3 rounded-xl border-2 border-rose-200 bg-white p-3 sm:p-4">
      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
      <div>
        <div className="text-sm sm:text-base font-extrabold text-rose-900 inline-flex flex-wrap gap-x-2 gap-y-0.5">
          <span>{titleEn}</span>
          <span className="opacity-50" aria-hidden>·</span>
          <span className="font-khmer normal-case font-normal text-slate-800">{titleKh}</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed mt-1">{bodyEn}</p>
        <p className="font-khmer text-sm text-slate-700 leading-loose mt-1">{bodyKh}</p>
      </div>
    </li>
  );
}
