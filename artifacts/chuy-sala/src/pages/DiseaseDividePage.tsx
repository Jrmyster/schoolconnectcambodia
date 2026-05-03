import type { ComponentType, ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Globe,
  Activity,
  HeartPulse,
  Heart,
  Droplet,
  Bug,
  Shield,
  Pill,
  Stethoscope,
  Apple,
  Brain,
  TrendingUp,
  TrendingDown,
  Skull,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Sun,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * The Disease Divide: Global Health Perspectives
 * គម្លាតនៃជំងឺ៖ ទិដ្ឋភាពសុខភាពសកល
 * Module: Well-Being → Public Health
 * Aesthetic: clean clinical — teal blues, whites, global map iconography.
 * ══════════════════════════════════════════════════════════════════════════ */

export function DiseaseDividePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-sky-50 text-slate-900 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden"
      data-testid="disease-divide-page"
    >
      {/* Clinical grid background */}
      <ClinicalGrid />

      {/* Subtle world map silhouette */}
      <WorldMapBackdrop />

      <div className="relative max-w-5xl mx-auto">
        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          href="/well-being/public-health"
          data-testid="link-back-public-health"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900 transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Public Health", "ត្រឡប់ទៅសុខភាពសាធារណៈ")}
        </Link>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <header className="mb-10 sm:mb-12" data-testid="hero">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500 via-cyan-600 to-sky-700 shadow-lg ring-2 ring-teal-200 flex items-center justify-center">
                <Globe className="w-8 h-8 sm:w-9 sm:h-9 text-white" strokeWidth={2.25} />
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center shadow">
                <HeartPulse className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold tracking-[0.25em] uppercase text-teal-700 mb-1.5">
                <Activity className="w-3 h-3" />
                <span>Public Health · Global Epidemiology</span>
                <span className="opacity-50" aria-hidden>·</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-teal-700">
                  សុខភាពសាធារណៈ · រោគរាតត្បាតសកល
                </span>
              </span>
              <h1
                id="disease-divide-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
                data-testid="page-title"
              >
                <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-700 bg-clip-text text-transparent">
                  The Disease Divide:
                </span>{" "}
                <span className="text-slate-900">Global Health Perspectives</span>
              </h1>
              <p
                className="font-khmer text-lg sm:text-xl md:text-2xl text-slate-800 leading-snug mt-2"
                data-testid="page-title-kh"
              >
                <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-700 bg-clip-text text-transparent">
                  គម្លាតនៃជំងឺ៖
                </span>{" "}
                <span>ទិដ្ឋភាពសុខភាពសកល</span>
              </p>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Two children are born today: one in a village without clean water, one in a wealthy city. Statistically, they will die of completely different diseases — and the reason has nothing to do with biology, and everything to do with the road, the well, and the hospital.",
              "កុមារពីរនាក់កើតថ្ងៃនេះ៖ ម្នាក់នៅភូមិដែលគ្មានទឹកស្អាត ម្នាក់ទៀតនៅទីក្រុងធំសម្បូរ។ តាមស្ថិតិ ពួកគេនឹងស្លាប់ដោយជំងឺផ្សេងគ្នាទាំងស្រុង — ហើយហេតុផលពុំទាក់ទងនឹងជីវវិទ្យាទេ ប៉ុន្តែទាក់ទងនឹងផ្លូវ អណ្តូង និងមន្ទីរពេទ្យ។",
            )}
          </p>
        </header>

        {/* ── Section 1: The Epidemiological Transition ─────────── */}
        <Section
          number={1}
          icon={TrendingUp}
          tone="teal"
          titleEn="The Epidemiological Transition"
          titleKh="អន្តរកាលរោគរាតត្បាត"
          subtitleEn="When a country builds wells and hospitals, the diseases that kill its citizens completely change"
          subtitleKh="ពេលប្រទេសសាងសង់អណ្តូង និងមន្ទីរពេទ្យ ជំងឺដែលសម្លាប់ប្រជាជនផ្លាស់ប្តូរទាំងស្រុង"
          dataTestid="section-transition"
        >
          {/* Definition card */}
          <div className="rounded-2xl border-2 border-teal-200 bg-white/90 backdrop-blur-sm p-5 sm:p-6 shadow-sm mb-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-teal-200">
                <Sparkles className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-teal-900 leading-tight">
                  The Core Idea
                </h3>
                <h4 className="font-khmer text-sm sm:text-base text-teal-900 leading-snug">
                  គំនិតស្នូល
                </h4>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
              <BL
                en="As a country builds better infrastructure — clean water systems, sanitation, vaccination programs, and hospitals — the types of diseases that threaten its citizens completely change. People stop dying young from infections and start dying old from worn-out bodies. This shift is called the Epidemiological Transition."
                kh="ពេលប្រទេសមួយសាងសង់ហេដ្ឋារចនាសម្ព័ន្ធកាន់តែប្រសើរ — ប្រព័ន្ធទឹកស្អាត អនាម័យ កម្មវិធីចាក់វ៉ាក់សាំង និងមន្ទីរពេទ្យ — ប្រភេទនៃជំងឺដែលគំរាមកំហែងប្រជាជនរបស់ខ្លួនផ្លាស់ប្តូរទាំងស្រុង។ មនុស្សឈប់ស្លាប់នៅក្មេងដោយការឆ្លងមេរោគ ហើយចាប់ផ្តើមស្លាប់នៅចាស់ដោយរាងកាយរលាយ។ ការផ្លាស់ប្តូរនេះត្រូវបានគេហៅថា អន្តរកាលរោគរាតត្បាត។"
              />
            </p>
          </div>

          {/* Transition diagram */}
          <TransitionDiagram />
        </Section>

        {/* ── Section 2: LMICs ─────────────────────────────────── */}
        <Section
          number={2}
          icon={TrendingDown}
          tone="amber"
          titleEn="Low-to-Middle-Income Countries (LMICs)"
          titleKh="ប្រទេសចំណូលទាប និងមធ្យម"
          subtitleEn="The primary threat: communicable (infectious) diseases — most of them preventable"
          subtitleKh="ការគំរាមកំហែងចម្បង៖ ជំងឺឆ្លង — ភាគច្រើនអាចការពារបាន"
          dataTestid="section-lmics"
        >
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/80 backdrop-blur-sm p-5 sm:p-6 shadow-sm mb-5">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-amber-200">
                <Bug className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-800 inline-flex flex-wrap gap-x-2">
                  <span>Primary Threat</span>
                  <span className="opacity-50" aria-hidden>·</span>
                  <span className="font-khmer normal-case tracking-normal">ការគំរាមកំហែងចម្បង</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-amber-900 leading-tight mt-0.5">
                  Communicable (Infectious) Diseases
                </h3>
                <h4 className="font-khmer text-sm sm:text-base text-amber-900 leading-snug">
                  ជំងឺឆ្លង
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed mt-2">
                  <BL
                    en="A microbe — a bacterium, virus, or parasite — passes from one person, animal, or contaminated source to another."
                    kh="មីក្រូសរីរាង្គ — បាក់តេរី វីរុស ឬសត្វល្អិតប៉ារ៉ាស៊ីត — ឆ្លងពីមនុស្ស សត្វ ឬប្រភពកខ្វក់មួយទៅមួយទៀត។"
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Three example cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-5">
            <DiseaseCard
              icon={WaterDropBiohazard}
              tone="sky"
              nameEn="Water-borne diseases"
              nameKh="ជំងឺមកពីទឹក"
              examplesEn="Cholera, diarrheal diseases"
              examplesKh="អាសន្នរោគ ជំងឺរាគ"
              bodyEn="A single contaminated well can poison an entire village. Diarrheal disease is one of the leading killers of children under five worldwide."
              bodyKh="អណ្តូងកខ្វក់មួយអាចបំពុលភូមិទាំងមូល។ ជំងឺរាគគឺជាអ្នកសម្លាប់ដ៏ធំបំផុតមួយនៃកុមារអាយុក្រោម ៥ ឆ្នាំទូទាំងពិភពលោក។"
            />
            <DiseaseCard
              icon={Bug}
              tone="emerald"
              nameEn="Malaria"
              nameKh="គ្រុនចាញ់"
              examplesEn="Plasmodium parasite via mosquito bite"
              examplesKh="ប៉ារ៉ាស៊ីត Plasmodium តាមរយៈការខាំរបស់មូស"
              bodyEn="Spread by Anopheles mosquitoes that breed in standing water. Bed nets, screened windows, and drained ditches block transmission."
              bodyKh="រាលដាលដោយមូស Anopheles ដែលបង្កាត់ពូជក្នុងទឹកស្ងួត។ មុង បង្អួចមានសំណាញ់ និងលូទឹកដែលហូរបានរារាំងការឆ្លង។"
            />
            <DiseaseCard
              icon={Stethoscope}
              tone="violet"
              nameEn="Tuberculosis"
              nameKh="របេង"
              examplesEn="Mycobacterium tuberculosis (airborne)"
              examplesKh="មីកូបាក់តេរី (ឆ្លងតាមខ្យល់)"
              bodyEn="Spread when an infected person coughs in a crowded, poorly ventilated room. Treatable with a 6-month antibiotic course — if a clinic exists."
              bodyKh="រាលដាលពេលអ្នកជំងឺក្អកនៅក្នុងបន្ទប់ច្រើនមនុស្ស ដែលខ្យល់មិនចេញចូលល្អ។ ព្យាបាលបានដោយថ្នាំផ្សះរយៈពេល ៦ ខែ — ប្រសិនបើមានគ្លីនិក។"
            />
          </div>

          {/* Infrastructure connection */}
          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/85 p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-emerald-200">
                <Shield className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-emerald-900 leading-tight">
                  Mostly Preventable
                </h3>
                <h4 className="font-khmer text-sm sm:text-base text-emerald-900 leading-snug">
                  ភាគច្រើនអាចការពារបាន
                </h4>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed mb-4">
              <BL
                en="The cruel truth: almost every disease in this section is entirely preventable with infrastructure that costs a fraction of a single cancer treatment in a wealthy country."
                kh="ការពិតដ៏សោកសៅ៖ ស្ទើរតែគ្រប់ជំងឺនៅក្នុងផ្នែកនេះអាចការពារបានទាំងស្រុងដោយហេដ្ឋារចនាសម្ព័ន្ធដែលមានតម្លៃត្រឹមតែបន្តិចបន្តួចនៃការព្យាបាលជំងឺមហារីកមួយដងនៅប្រទេសអ្នកមាន។"
              />
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <Pillar icon={Droplet} labelEn="Clean drinking water" labelKh="ទឹកផឹកស្អាត" />
              <Pillar icon={CheckCircle2} labelEn="Proper sanitation" labelKh="អនាម័យត្រឹមត្រូវ" />
              <Pillar icon={Pill} labelEn="Basic vaccines" labelKh="វ៉ាក់សាំងមូលដ្ឋាន" />
            </div>
          </div>
        </Section>

        {/* ── Section 3: HICs ──────────────────────────────────── */}
        <Section
          number={3}
          icon={TrendingUp}
          tone="rose"
          titleEn="High-Income Countries"
          titleKh="ប្រទេសចំណូលខ្ពស់"
          subtitleEn="The primary threat: non-communicable, chronic, and lifestyle diseases"
          subtitleKh="ការគំរាមកំហែងចម្បង៖ ជំងឺមិនឆ្លង រ៉ាំរ៉ៃ និងជំងឺនៃរបៀបរស់នៅ"
          dataTestid="section-hics"
        >
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/80 backdrop-blur-sm p-5 sm:p-6 shadow-sm mb-5">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-rose-200">
                <HeartCardiogram />
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-rose-800 inline-flex flex-wrap gap-x-2">
                  <span>Primary Threat</span>
                  <span className="opacity-50" aria-hidden>·</span>
                  <span className="font-khmer normal-case tracking-normal">ការគំរាមកំហែងចម្បង</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-rose-900 leading-tight mt-0.5">
                  Non-Communicable (Chronic) & Lifestyle Diseases
                </h3>
                <h4 className="font-khmer text-sm sm:text-base text-rose-900 leading-snug">
                  ជំងឺមិនឆ្លង (រ៉ាំរ៉ៃ) និងជំងឺនៃរបៀបរស់នៅ
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed mt-2">
                  <BL
                    en="Citizens live much longer and have abundant food, sweet drinks, and sedentary jobs. Their bodies do not get killed by microbes — they wear down slowly from the inside."
                    kh="ប្រជាជនរស់នៅយូរជាង និងមានអាហារសម្បូរ ភេសជ្ជៈផ្អែម និងការងារអង្គុយច្រើន។ រាងកាយរបស់ពួកគេមិនត្រូវបានសម្លាប់ដោយមីក្រូសរីរាង្គទេ — ពួកវារលាយយឺតៗពីខាងក្នុង។"
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Four example cards */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <DiseaseCard
              icon={HeartEKG}
              tone="rose"
              nameEn="Heart disease"
              nameKh="ជំងឺបេះដូង"
              examplesEn="Coronary artery disease, heart attack, stroke"
              examplesKh="ជំងឺសរសៃឈាមបេះដូង គាំងបេះដូង ដាច់សរសៃខួរ"
              bodyEn="Decades of high blood pressure, cholesterol, salt, and stress slowly clog the arteries that feed the heart muscle itself. Worldwide, the #1 cause of death."
              bodyKh="ជាច្រើនទសវត្សរ៍នៃសម្ពាធឈាមខ្ពស់ កូឡេស្តេរ៉ុល អំបិល និងភាពតានតឹង បិទសរសៃឈាមដែលផ្ទុកសាច់ដុំបេះដូងយឺតៗ។ ជាមូលហេតុនៃការស្លាប់លេខ ១ ទូទាំងពិភពលោក។"
            />
            <DiseaseCard
              icon={Apple}
              tone="amber"
              nameEn="Type 2 Diabetes"
              nameKh="ជំងឺទឹកនោមផ្អែមប្រភេទ ២"
              examplesEn="Insulin resistance from sugar & weight"
              examplesKh="ភាពធន់នឹងអាំងស៊ុយលីនពីស្ករ និងទម្ងន់"
              bodyEn="The body stops responding to insulin, so blood sugar climbs and quietly damages eyes, kidneys, nerves, and feet over twenty years."
              bodyKh="រាងកាយឈប់ឆ្លើយតបនឹងអាំងស៊ុយលីន ដូច្នេះស្ករក្នុងឈាមឡើងខ្ពស់ ហើយបំផ្លាញភ្នែក តម្រងនោម សរសៃប្រសាទ និងជើងស្ងាត់ៗរយៈពេល ២០ ឆ្នាំ។"
            />
            <DiseaseCard
              icon={Skull}
              tone="violet"
              nameEn="Cancer"
              nameKh="ជំងឺមហារីក"
              examplesEn="Uncontrolled cell growth (lung, colon, breast, prostate)"
              examplesKh="ការកើនកោសិកាដែលមិនអាចគ្រប់គ្រងបាន (សួត ពោះវៀន សុដន់ ក្រពេញប្រូស្តាត)"
              bodyEn="A cell's DNA gets damaged, copy-error after copy-error, until it forgets how to die. Risk rises sharply with age, tobacco, alcohol, and certain diets."
              bodyKh="DNA របស់កោសិកាខូចខាត ការចម្លងខុស ម្តងមួយ ៗ រហូតដល់វាភ្លេចរបៀបស្លាប់។ ហានិភ័យកើនឡើងយ៉ាងខ្លាំងជាមួយអាយុ ថ្នាំជក់ គ្រឿងស្រវឹង និងរបបអាហារខ្លះៗ។"
            />
            <DiseaseCard
              icon={Brain}
              tone="sky"
              nameEn="Alzheimer's disease"
              nameKh="ជំងឺវង្វេងវង្វាន់ Alzheimer"
              examplesEn="Progressive brain degeneration, memory loss"
              examplesKh="ការចុះខ្សោយខួរក្បាលជាបណ្ដើរៗ ការបាត់បង់ការចងចាំ"
              bodyEn="A disease of long life — when bodies survive into the 80s and 90s, the brain itself slowly fills with toxic protein plaques and stops remembering."
              bodyKh="ជំងឺនៃជីវិតវែង — ពេលរាងកាយរស់រហូតដល់អាយុ ៨០ និង ៩០ ឆ្នាំ ខួរក្បាលផ្ទាល់ពោរពេញដោយដុំប្រូតេអ៊ីនពុលយឺតៗ ហើយឈប់ចងចាំ។"
            />
          </div>

          {/* Closing perspective */}
          <div className="mt-5 rounded-2xl border-2 border-teal-300 bg-gradient-to-br from-teal-50 to-sky-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-teal-200">
                <Globe className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-semibold">
                <BL
                  en="A country in transition often carries both burdens at once — Cambodia today is fighting cholera, dengue, and tuberculosis on one side, and rising rates of diabetes and heart disease on the other. Public health policy must aim at both ends of the divide."
                  kh="ប្រទេសមួយក្នុងអន្តរកាល តែងតែទ្រាំទ្របន្ទុកទាំងពីរក្នុងពេលតែមួយ — កម្ពុជាសព្វថ្ងៃកំពុងប្រយុទ្ធនឹងអាសន្នរោគ គ្រុនឈាម និងរបេងម្ខាង និងអត្រាជំងឺទឹកនោមផ្អែម និងបេះដូងកើនឡើងម្ខាងទៀត។ គោលនយោបាយសុខភាពសាធារណៈត្រូវតែសំដៅទាំងពីរចុងនៃគម្លាត។"
                />
              </p>
            </div>
          </div>
        </Section>

        {/* ── Footer note ─────────────────────────────────────────── */}
        <p
          className={`mt-12 text-center text-xs sm:text-sm text-teal-800/70 italic max-w-2xl mx-auto ${
            kh ? "font-khmer not-italic leading-loose" : ""
          }`}
        >
          {t(
            "Geography is destiny — but infrastructure is choice. Every clean well, every vaccine, every clinic, redraws the map of who dies of what.",
            "ភូមិសាស្ត្រគឺជាវាសនា — ប៉ុន្តែហេដ្ឋារចនាសម្ព័ន្ធគឺជាជម្រើស។ អណ្តូងស្អាតមួយ វ៉ាក់សាំងមួយ គ្លីនិកមួយ គូរផែនទីឡើងវិញនៃអ្នកណាស្លាប់ដោយអ្វី។",
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

function ClinicalGrid() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="clinic-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#0f766e" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#clinic-grid)" />
    </svg>
  );
}

function WorldMapBackdrop() {
  return (
    <div
      aria-hidden
      className="absolute right-0 top-20 w-[480px] h-[280px] opacity-[0.04] pointer-events-none"
    >
      <svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
        {/* Stylized continents — abstract blobs */}
        <g fill="#0f766e">
          <ellipse cx="120" cy="110" rx="70" ry="40" />
          <ellipse cx="230" cy="100" rx="50" ry="35" />
          <ellipse cx="220" cy="180" rx="35" ry="55" />
          <ellipse cx="340" cy="120" rx="60" ry="45" />
          <ellipse cx="380" cy="200" rx="40" ry="30" />
          <ellipse cx="420" cy="80" rx="25" ry="18" />
        </g>
      </svg>
    </div>
  );
}

/* Custom icon: water drop with biohazard ring */
function WaterDropBiohazard({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 3 C8 9 5 13 5 16 a7 7 0 0 0 14 0 c0-3-3-7-7-13z"
        fill="currentColor"
      />
      <circle cx="12" cy="15" r="2.2" fill="#fff" />
      <circle cx="12" cy="11" r="1.4" fill="#fff" />
      <circle cx="9.6" cy="17" r="1.4" fill="#fff" />
      <circle cx="14.4" cy="17" r="1.4" fill="#fff" />
    </svg>
  );
}

/* Custom icon: heart pierced with EKG line */
function HeartEKG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2c0 5.65-7 10-7 10z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M3 12 h4 l1.5 -3 l2 6 l2 -4 l1.5 2 H21"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function HeartCardiogram() {
  return <HeartEKG className="w-5 h-5 text-white" />;
}

function TransitionDiagram() {
  return (
    <div
      className="rounded-2xl border-2 border-teal-200 bg-white/85 backdrop-blur-sm p-4 sm:p-6 shadow-sm"
      data-testid="transition-diagram"
    >
      <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-teal-700 mb-4 text-center inline-flex flex-wrap justify-center gap-x-2 w-full">
        <span>The Transition · អន្តរកាល</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Before */}
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50/70 p-4">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 mb-2">
            Before · មុន
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow">
              <Bug className="w-5 h-5" strokeWidth={2.25} />
            </div>
            <div className="text-sm font-extrabold text-slate-900 leading-tight">
              Infectious deaths
              <div className="font-khmer text-xs text-slate-700 font-semibold leading-snug">
                ស្លាប់ដោយជំងឺឆ្លង
              </div>
            </div>
          </div>
          <Bar pct={75} tone="amber" labelEn="Infectious" labelKh="ឆ្លង" />
          <Bar pct={25} tone="rose" labelEn="Chronic" labelKh="រ៉ាំរ៉ៃ" />
        </div>

        {/* After */}
        <div className="rounded-xl border-2 border-rose-200 bg-rose-50/70 p-4">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-rose-700 mb-2">
            After · បន្ទាប់ពី
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-rose-500 text-white flex items-center justify-center shadow">
              <HeartEKG className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm font-extrabold text-slate-900 leading-tight">
              Chronic deaths
              <div className="font-khmer text-xs text-slate-700 font-semibold leading-snug">
                ស្លាប់ដោយជំងឺរ៉ាំរ៉ៃ
              </div>
            </div>
          </div>
          <Bar pct={20} tone="amber" labelEn="Infectious" labelKh="ឆ្លង" />
          <Bar pct={80} tone="rose" labelEn="Chronic" labelKh="រ៉ាំរ៉ៃ" />
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-slate-600 inline-flex flex-wrap justify-center gap-x-2 w-full">
        <span className="italic">Driven by clean water, vaccines, and hospitals</span>
        <span className="opacity-50" aria-hidden>·</span>
        <span className="font-khmer">ជំរុញដោយទឹកស្អាត វ៉ាក់សាំង និងមន្ទីរពេទ្យ</span>
      </div>
    </div>
  );
}

function Bar({
  pct,
  tone,
  labelEn,
  labelKh,
}: {
  pct: number;
  tone: "amber" | "rose";
  labelEn: string;
  labelKh: string;
}) {
  const fill = tone === "amber" ? "bg-amber-500" : "bg-rose-500";
  return (
    <div className="mb-1.5 last:mb-0">
      <div className="flex items-center justify-between text-[10px] font-bold mb-0.5">
        <span className="text-slate-700 inline-flex gap-x-1.5">
          <span>{labelEn}</span>
          <span className="opacity-50" aria-hidden>·</span>
          <span className="font-khmer">{labelKh}</span>
        </span>
        <span className="font-mono text-slate-700">{pct}%</span>
      </div>
      <div className="w-full h-2.5 rounded bg-slate-200/80 overflow-hidden">
        <div className={`h-full ${fill} rounded`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Pillar({
  icon: Icon,
  labelEn,
  labelKh,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  labelEn: string;
  labelKh: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white/90 border-2 border-emerald-200 p-3">
      <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow">
        <Icon className="w-4.5 h-4.5" strokeWidth={2.5} />
      </div>
      <div>
        <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
          {labelEn}
        </div>
        <div className="font-khmer text-xs text-slate-700 leading-snug">
          {labelKh}
        </div>
      </div>
    </div>
  );
}

type Tone = "teal" | "sky" | "amber" | "emerald" | "rose" | "violet";

const TONE: Record<
  Tone,
  { bg: string; text: string; border: string; ring: string; soft: string }
> = {
  teal: {
    bg: "bg-gradient-to-br from-teal-500 to-cyan-700",
    text: "text-teal-700",
    border: "border-teal-300",
    ring: "ring-teal-200",
    soft: "bg-teal-50/70",
  },
  sky: {
    bg: "bg-gradient-to-br from-sky-500 to-sky-700",
    text: "text-sky-700",
    border: "border-sky-300",
    ring: "ring-sky-200",
    soft: "bg-sky-50/70",
  },
  amber: {
    bg: "bg-gradient-to-br from-amber-400 to-amber-600",
    text: "text-amber-700",
    border: "border-amber-300",
    ring: "ring-amber-200",
    soft: "bg-amber-50/70",
  },
  emerald: {
    bg: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    text: "text-emerald-700",
    border: "border-emerald-300",
    ring: "ring-emerald-200",
    soft: "bg-emerald-50/70",
  },
  rose: {
    bg: "bg-gradient-to-br from-rose-500 to-rose-700",
    text: "text-rose-700",
    border: "border-rose-300",
    ring: "ring-rose-200",
    soft: "bg-rose-50/70",
  },
  violet: {
    bg: "bg-gradient-to-br from-violet-500 to-violet-700",
    text: "text-violet-700",
    border: "border-violet-300",
    ring: "ring-violet-200",
    soft: "bg-violet-50/70",
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

function DiseaseCard({
  icon: Icon,
  tone,
  nameEn,
  nameKh,
  examplesEn,
  examplesKh,
  bodyEn,
  bodyKh,
}: {
  icon:
    | ComponentType<{ className?: string; strokeWidth?: number }>
    | ComponentType<{ className?: string }>;
  tone: Tone;
  nameEn: string;
  nameKh: string;
  examplesEn: string;
  examplesKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  const T = TONE[tone];
  const IconCmp = Icon as ComponentType<{ className?: string; strokeWidth?: number }>;
  return (
    <article className={`rounded-2xl border-2 ${T.border} bg-white/95 p-4 sm:p-5 shadow-sm`}>
      <div className="flex items-start gap-3">
        <div
          className={`w-11 h-11 rounded-xl ${T.bg} text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ${T.ring}`}
        >
          <IconCmp className="w-5 h-5" strokeWidth={2.25} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
            {nameEn}
          </h4>
          <h5 className="font-khmer text-xs sm:text-sm text-slate-700 leading-snug">
            {nameKh}
          </h5>
          <div className={`mt-1.5 text-[10px] font-mono font-bold uppercase tracking-wider ${T.text}`}>
            {examplesEn}
          </div>
          <div className={`font-khmer text-[11px] ${T.text} font-semibold leading-snug`}>
            {examplesKh}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2.5">{bodyEn}</p>
          <p className="font-khmer text-xs sm:text-sm text-slate-700 leading-loose mt-1">
            {bodyKh}
          </p>
        </div>
      </div>
    </article>
  );
}

/* Suppress unused-import warnings for icons retained for semantic clarity */
void Heart;
void AlertTriangle;
void Sun;
