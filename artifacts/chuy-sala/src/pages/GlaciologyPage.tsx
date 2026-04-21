import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Snowflake,
  Compass,
  Mountain,
  Droplets,
  Lightbulb,
  Ruler,
  Globe2,
  Waves,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  GLA-01 · Glaciology: The Frozen Rivers
//           ផ្ទាំងទឹកកក៖ ទន្លេដែលកក
//
//   1. What is a Glacier?            — snow → firn → dense blue ice
//   2. The Mountain Carvers          — V-valley (river) vs U-valley (glacier)
//   3. Why Cambodia Cares            — 70% fresh-water store, sea-level rise
//
//   Aesthetic: arctic ice-sheet — stark whites, icy cyans, deep ocean blues,
//   crystalline grid, monospace spec codes.
// ════════════════════════════════════════════════════════════════════════════

const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#f0f9ff", // sky-50
  backgroundImage:
    "linear-gradient(rgba(8, 47, 73, 0.08) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(8, 47, 73, 0.08) 1px, transparent 1px), " +
    "linear-gradient(rgba(8, 47, 73, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(8, 47, 73, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(8, 47, 73, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(8, 47, 73, 0.04) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-sky-300/70" : "border-cyan-400/70";
  const size = subtle ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="contents">
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 left-2 ${size} border-t-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 right-2 ${size} border-t-2 border-r-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 ${size} border-b-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 ${size} border-b-2 border-r-2 ${stroke}`} />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export function GlaciologyPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* Hero */}
        <header
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 sm:px-10 py-8 sm:py-10 mb-10 shadow-lg"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(125, 211, 252, 0.20), transparent 55%)," +
              "linear-gradient(rgba(125, 211, 252, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(125, 211, 252, 0.10) 1px, transparent 1px)",
            backgroundSize: "auto, 32px 32px, 32px 32px",
          }}
        >
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/60 text-cyan-200 flex items-center justify-center flex-shrink-0">
              <Snowflake className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Science", "វិទ្យាសាស្ត្រ")}</span>
                <span className="opacity-50">/</span>
                <span className="text-cyan-200">GLA-01</span>
              </div>
              <h1
                data-testid="page-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t(
                  "Glaciology: The Frozen Rivers",
                  "ផ្ទាំងទឹកកក៖ ទន្លេដែលកក"
                )}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "High in the world's coldest mountains, snow that fell a thousand years ago is still slowly sliding downhill — a frozen river so heavy it grinds the rock beneath it into dust. When it melts, the water reaches all the way to the Mekong delta.",
                  "នៅលើភ្នំត្រជាក់បំផុតរបស់ពិភពលោក ព្រិលដែលធ្លាក់កាលពីមួយពាន់ឆ្នាំមុន នៅតែរអិលចុះភ្នំយឺតៗ — ទន្លេកកមួយដែលធ្ងន់ខ្លាំងរហូតកិនថ្មនៅក្រោមឱ្យទៅជាធូលី។ ពេលរលាយ ទឹកនោះធ្វើដំណើររហូតដល់ដីសណ្ដទន្លេមេគង្គ។"
                )}
              </p>
            </div>
          </div>
        </header>

        {/* Sections */}
        <WhatIsAGlacier kh={kh} t={t} />
        <MountainCarvers kh={kh} t={t} />
        <ClimateConnection kh={kh} t={t} />

        {/* Closing */}
        <div
          className="relative mt-10 rounded-2xl border-2 border-sky-300 p-5 flex items-start gap-3"
          style={CARD_BG}
          data-testid="closing-note"
        >
          <CornerMarks subtle />
          <Globe2 className="w-6 h-6 text-sky-700 flex-shrink-0" />
          <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong>{t("The big picture: ", "រូបភាពធំ ៖ ")}</strong>
            {t(
              "A glacier on the other side of the planet and a rice farmer beside the Tonle Sap are joined by one chain — frozen water, melted water, ocean water, rain. What happens to ice in the Himalayas, the Andes, and Antarctica eventually arrives in Cambodia.",
              "ផ្ទាំងទឹកកកនៅម្ខាងទៀតនៃភពផែនដី និងកសិករដាំស្រូវនៅជិតបឹងទន្លេសាប ត្រូវភ្ជាប់គ្នាដោយខ្សែសង្វាក់តែមួយ — ទឹកកក ទឹករលាយ ទឹកសមុទ្រ និងទឹកភ្លៀង។ អ្វីដែលកើតឡើងលើទឹកកកនៅហិមាល័យ ប្រទេសអង់ដ និងអង់តាក់ទិក ចុងក្រោយនឹងមកដល់ប្រទេសកម្ពុជា។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold shadow hover:bg-slate-800 transition-colors ${kh ? "font-khmer" : ""}`}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — What is a Glacier?
// ════════════════════════════════════════════════════════════════════════════

function WhatIsAGlacier({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-what-is">
      <SectionHeader
        spec="01"
        en="What is a Glacier?"
        kh="តើអ្វីទៅជាផ្ទាំងទឹកកក?"
        kh_={kh}
      />

      <div
        className="relative rounded-2xl border-2 border-cyan-300 p-5 sm:p-7 shadow-sm"
        style={CARD_BG}
      >
        <CornerMarks subtle />
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-6 items-center">
          <div>
            <p className={`text-foreground text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "A glacier is a ", "ផ្ទាំងទឹកកកគឺជា "
              )}
              <strong className={`text-cyan-800 ${kh ? "font-khmer" : ""}`}>
                {t("massive, slow-moving river of ice", "ទន្លេទឹកកកដ៏ធំសម្បើម ដែលផ្លាស់ទីយឺតៗ")}
              </strong>
              {t(
                ". It is not made by freezing liquid water like the ice cube in your drink. Instead, it is built — flake by flake — over thousands of years from snow that never gets a chance to fully melt.",
                "។ វាមិនមែនកើតឡើងពីការកកនៃទឹករាវដូចជាដុំទឹកកកក្នុងភេសជ្ជៈរបស់អ្នកទេ។ ផ្ទុយទៅវិញ វាត្រូវបានបង្កើតឡើង — ស្រកាមួយៗ — ឆ្លងកាត់រាប់ពាន់ឆ្នាំ ពីព្រិលដែលមិនដែលបានរលាយទាំងស្រុងឡើយ។"
              )}
            </p>
            <p className={`text-foreground text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Each winter, fresh snow lands on top of last year's snow. The ",
                "រដូវរងារនីមួយៗ ព្រិលថ្មីធ្លាក់ពីលើព្រិលឆ្នាំមុន។ "
              )}
              <strong className={`text-sky-700 ${kh ? "font-khmer" : ""}`}>
                {t("weight of the new snow", "ទម្ងន់នៃព្រិលថ្មី")}
              </strong>
              {t(
                " crushes the old layers below, squeezing the air out of them. After hundreds of years, those buried snowflakes turn into a solid block of ",
                " សង្កត់ស្រទាប់ចាស់នៅខាងក្រោម បញ្ចេញខ្យល់ចេញពីវា។ បន្ទាប់ពីរាប់រយឆ្នាំ ស្រកាព្រិលដែលត្រូវបានកប់នោះ ប្រែទៅជាដុំទឹកកករឹងម៉ាំ "
              )}
              <strong className={`text-blue-800 ${kh ? "font-khmer" : ""}`}>
                {t("dense blue ice", "ដែលក្រាស់និងមានពណ៌ខៀវ")}
              </strong>
              {t(
                " — so dense it absorbs every colour of light except blue.",
                " — ក្រាស់ខ្លាំងរហូតដល់វាស្រូបយកពណ៌ពន្លឺគ្រប់ប្រភេទ លើកលែងតែពណ៌ខៀវ។"
              )}
            </p>

            {/* Vocabulary chips */}
            <div className="flex flex-wrap gap-2 mb-4" data-testid="glacier-vocab">
              <VocabChip color="white"  en="Snow"     kh="ព្រិល"          k={kh} />
              <VocabChip color="sky"    en="Firn"     kh="ហ្វៀន (ព្រិលក្រាស់)" k={kh} />
              <VocabChip color="cyan"   en="Blue Ice" kh="ទឹកកកខៀវ"        k={kh} />
              <VocabChip color="blue"   en="Pressure" kh="សម្ពាធ"          k={kh} />
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-sky-50 border-l-4 border-sky-400 p-3">
              <Lightbulb className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <p className={`text-sm text-sky-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                <strong>{t("Key idea: ", "គំនិតគន្លឹះ ៖ ")}</strong>
                {t(
                  "A glacier is frozen time. The ice you touch on its surface today fell as snow on a mountain hundreds — sometimes thousands — of years ago.",
                  "ផ្ទាំងទឹកកកគឺជាពេលវេលាដែលបានកក។ ទឹកកកដែលអ្នកប៉ះនៅលើផ្ទៃរបស់វាថ្ងៃនេះ បានធ្លាក់ជាព្រិលនៅលើភ្នំ កាលពីរាប់រយ — ពេលខ្លះរាប់ពាន់ — ឆ្នាំមុន។"
                )}
              </p>
            </div>
          </div>

          {/* Snow → Ice compaction diagram */}
          <div
            className="rounded-xl bg-slate-900 p-4 text-slate-100"
            data-testid="snow-to-ice-diagram"
          >
            <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("COMPACTION · SNOW → BLUE ICE", "ការសង្កត់ · ព្រិល → ទឹកកកខៀវ")}
            </div>
            <SnowToIceDiagram kh={kh} t={t} />
            <div className={`mt-2 text-center text-[11px] text-slate-400 ${kh ? "font-khmer leading-loose" : "font-mono uppercase tracking-widest"}`}>
              {t(
                "Years of weight squeeze air out, pack crystals tight",
                "ទម្ងន់ឆ្នាំក្រោយឆ្នាំ បញ្ចេញខ្យល់ចេញ ច្របាច់គ្រីស្តាល់ឱ្យស្និទ្ធ"
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VocabChip({
  color,
  en,
  kh,
  k,
}: {
  color: "white" | "sky" | "cyan" | "blue";
  en: string;
  kh: string;
  k: boolean;
}) {
  const colours: Record<string, string> = {
    white: "border-slate-300 text-slate-800 bg-white",
    sky:   "border-sky-300 text-sky-800 bg-sky-50",
    cyan:  "border-cyan-300 text-cyan-800 bg-cyan-50",
    blue:  "border-blue-400 text-blue-900 bg-blue-50",
  };
  return (
    <span
      className={`inline-block text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded border ${colours[color]} ${k ? "font-khmer" : ""}`}
    >
      {k ? kh : en}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — Mountain Carvers (V vs U valleys)
// ════════════════════════════════════════════════════════════════════════════

function MountainCarvers({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-carvers">
      <SectionHeader
        spec="02"
        en="The Mountain Carvers"
        kh="អ្នកឆ្លាក់ភ្នំ"
        kh_={kh}
      />

      <div
        className="relative rounded-2xl border-2 border-blue-300 p-5 sm:p-7 shadow-sm mb-5"
        style={CARD_BG}
      >
        <CornerMarks subtle />
        <p className={`text-foreground text-sm sm:text-base ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "Both rivers and glaciers wear down mountains, but they leave very different marks. A liquid river is light and fast — it cuts a narrow ",
            "ទាំងទន្លេទឹក និងផ្ទាំងទឹកកកធ្វើឱ្យភ្នំសឹក ប៉ុន្តែវាទុកស្នាមខុសគ្នាខ្លាំងណាស់។ ទន្លេទឹករាវគឺស្រាល និងលឿន — វាកាត់ជ្រលងតូចចង្អៀតរាង "
          )}
          <strong className={`text-emerald-800 ${kh ? "font-khmer" : ""}`}>
            {t("V-shaped valley", "អក្សរ V")}
          </strong>
          {t(
            " by scratching downward at one line. A glacier is a slow giant — millions of tons of ice sliding for centuries. It does not scratch; it ",
            " ដោយឆ្កូតចុះតាមបន្ទាត់តែមួយ។ ផ្ទាំងទឹកកកគឺជាយក្សយឺត — ទឹកកករាប់លានតោន ដែលរអិលអស់ច្រើនសតវត្សរ៍។ វាមិនឆ្កូតទេ វា "
          )}
          <strong className={`text-cyan-800 ${kh ? "font-khmer" : ""}`}>
            {t("grinds and bulldozes", "កិន និងរុញដូចបាល់ឌូហ្សឺ")}
          </strong>
          {t(
            " everything beneath it, plucking out boulders and dragging them along like sandpaper made of stone. The result is a wide, flat-bottomed ",
            " អ្វីៗគ្រប់យ៉ាងនៅខាងក្រោម ហើយដកថ្មធំៗ ចេញ ហើយអូសវាទៅដូចក្រដាសខាត់ខ្សាច់ដែលធ្វើពីថ្ម។ លទ្ធផលគឺជ្រលងធំទូលាយដែលបាតរាបស្មើ រាង "
          )}
          <strong className={`text-blue-800 ${kh ? "font-khmer" : ""}`}>
            {t("U-shaped valley", "អក្សរ U")}
          </strong>
          {t(
            " — nature's giant bulldozer leaving its mark on the planet.",
            " — ដាននៃបាល់ឌូហ្សឺយក្សនៃធម្មជាតិទុកនៅលើភពផែនដី។"
          )}
        </p>
      </div>

      {/* Side-by-side V vs U valley diagram */}
      <div className="grid md:grid-cols-2 gap-5">
        <article
          className="relative rounded-2xl border-2 border-emerald-300 p-5 shadow-sm"
          style={CARD_BG}
          data-testid="v-valley-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-3">
            <Waves className="w-5 h-5 text-emerald-700" />
            <h3 className={`text-lg font-bold text-emerald-900 ${kh ? "font-khmer" : ""}`}>
              {t("River → V-Valley", "ទន្លេទឹក → ជ្រលង V")}
            </h3>
          </div>
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3 mb-3">
            <VValleyDiagram kh={kh} t={t} />
          </div>
          <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Liquid water cuts straight down a single line, leaving steep V-shaped sides and a narrow stream at the bottom.",
              "ទឹករាវកាត់ចុះត្រង់តាមបន្ទាត់តែមួយ ទុកជ្រលងរាង V ច្រាំងចោទ និងអូរតូចមួយនៅបាត។"
            )}
          </p>
          <div className={`mt-3 rounded-md border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-xs ${kh ? "font-khmer leading-loose text-emerald-900" : "font-mono uppercase tracking-widest text-emerald-800"}`}>
            {t(
              "EXAMPLE · Mekong tributaries in Mondulkiri",
              "ឧទាហរណ៍ · ដៃទន្លេមេគង្គនៅមណ្ឌលគិរី"
            )}
          </div>
        </article>

        <article
          className="relative rounded-2xl border-2 border-cyan-300 p-5 shadow-sm"
          style={CARD_BG}
          data-testid="u-valley-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-3">
            <Mountain className="w-5 h-5 text-cyan-700" />
            <h3 className={`text-lg font-bold text-cyan-900 ${kh ? "font-khmer" : ""}`}>
              {t("Glacier → U-Valley", "ផ្ទាំងទឹកកក → ជ្រលង U")}
            </h3>
          </div>
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-3 mb-3">
            <UValleyDiagram kh={kh} t={t} />
          </div>
          <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "A heavy glacier grinds the rock on every side at once, leaving a wide, flat-bottomed U-shape with steep walls. After the ice retreats, a smaller river often flows along the valley floor.",
              "ផ្ទាំងទឹកកកធ្ងន់ៗ កិនថ្មគ្រប់ទិសក្នុងពេលតែមួយ ទុកជ្រលងរាង U ទូលាយ បាតរាបស្មើ ច្រាំងចោទ។ បន្ទាប់ពីទឹកកករួញចេញ ទន្លេតូចមួយច្រើនតែហូរតាមបាតជ្រលង។"
            )}
          </p>
          <div className={`mt-3 rounded-md border border-cyan-200 bg-cyan-50/70 px-3 py-2 text-xs ${kh ? "font-khmer leading-loose text-cyan-900" : "font-mono uppercase tracking-widest text-cyan-800"}`}>
            {t(
              "EXAMPLE · Yosemite Valley, the Swiss Alps",
              "ឧទាហរណ៍ · ជ្រលងយ៉ូសេមីធី, ភ្នំអាល់ស្វីស"
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — Why Cambodia Cares (climate connection)
// ════════════════════════════════════════════════════════════════════════════

function ClimateConnection({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-climate">
      <SectionHeader
        spec="03"
        en="Why Cambodia Cares: The Climate Connection"
        kh="ហេតុអ្វីយើងត្រូវខ្វល់ខ្វាយ៖ ទំនាក់ទំនងអាកាសធាតុ"
        kh_={kh}
      />

      <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-5">
        <article
          className="relative rounded-2xl border-2 border-blue-300 p-5 sm:p-6 shadow-sm"
          style={CARD_BG}
          data-testid="freshwater-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-blue-700" />
            <h3 className={`text-lg font-bold text-blue-900 ${kh ? "font-khmer" : ""}`}>
              {t("The World's Frozen Water Tank", "ធុងទឹកសាបកករបស់ពិភពលោក")}
            </h3>
          </div>
          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Most of the planet's water is salty — only about 2.5% is fresh, the kind we can drink and use to grow rice. Of all that fresh water, glaciers and the great ice sheets store roughly ",
              "ទឹកភាគច្រើនរបស់ភពផែនដីគឺជាទឹកប្រៃ — មានតែប្រហែល ២.៥% ប៉ុណ្ណោះដែលជាទឹកសាប ដែលយើងអាចផឹក និងប្រើដើម្បីដាំស្រូវ។ ក្នុងចំណោមទឹកសាបទាំងអស់នោះ ផ្ទាំងទឹកកក និងផ្ទាំងទឹកកកធំៗ រក្សាទុកប្រហែល "
            )}
            <strong className={`text-blue-800 ${kh ? "font-khmer" : ""}`}>
              {t("about 70%", "ប្រហែល ៧០%")}
            </strong>
            {t(
              " — a frozen savings account holding most of the fresh water on Earth, locked up high in the mountains and at the poles.",
              " — គណនីសន្សំកក ដែលផ្ទុកទឹកសាបភាគច្រើននៅលើផែនដី ត្រូវបានចាក់សោទុកនៅលើភ្នំខ្ពស់ និងនៅប៉ូល។"
            )}
          </p>

          <FreshwaterShareDiagram kh={kh} t={t} />

          <div className="mt-3 flex items-start gap-3 rounded-lg bg-blue-50 border-l-4 border-blue-400 p-3">
            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className={`text-sm text-blue-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <strong>{t("Note: ", "ចំណាំ ៖ ")}</strong>
              {t(
                "About 70% of the world's fresh water is locked in ice (USGS estimate). Only a tiny fraction flows in rivers and lakes at any moment.",
                "ប្រហែល ៧០% នៃទឹកសាបពិភពលោក ត្រូវបានចាក់សោក្នុងទឹកកក (ប៉ាន់ស្មានដោយ USGS)។ មានតែផ្នែកតូចមួយប៉ុណ្ណោះដែលហូរក្នុងទន្លេ និងបឹង នៅពេលណាមួយ។"
              )}
            </p>
          </div>
        </article>

        <article
          className="relative rounded-2xl border-2 border-cyan-400 p-5 sm:p-6 shadow-sm"
          style={{
            ...CARD_BG,
            backgroundColor: "#ecfeff",
          }}
          data-testid="sealevel-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-2">
            <Waves className="w-5 h-5 text-cyan-700" />
            <h3 className={`text-lg font-bold text-cyan-900 ${kh ? "font-khmer" : ""}`}>
              {t("Sea Level Rise Reaches Cambodia", "ការឡើងកម្ពស់ទឹកសមុទ្រ មកដល់ប្រទេសកម្ពុជា")}
            </h3>
          </div>
          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "When the planet warms, ice that was safely stored on land for thousands of years melts and pours into the ocean. Global sea level rises overall — though by different amounts in different regions — and that rise also reaches the coast of Sihanoukville and Kep.",
              "ពេលផែនដីឡើងកម្ដៅ ទឹកកកដែលត្រូវបានរក្សាទុកដោយសុវត្ថិភាពនៅលើដីរាប់ពាន់ឆ្នាំ រលាយ និងហូរចូលសមុទ្រ។ កម្ពស់ទឹកសមុទ្រសកលឡើងជារួម — ទោះបីជាមិនស្មើគ្នាគ្រប់ទីកន្លែងក៏ដោយ — ហើយការឡើងនោះក៏មកដល់ឆ្នេរក្រុមព្រះសីហនុ និងកំពត-កែបដែរ។"
            )}
          </p>
          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Cambodia is mostly low and flat. A higher ocean pushes salt water up the Mekong delta, can flood coastal towns and rice paddies, and damages farmland that families have used for generations.",
              "ប្រទេសកម្ពុជាភាគច្រើនមានកម្ពស់ទាប និងរាបស្មើ។ សមុទ្រខ្ពស់ជាងមុនរុញទឹកប្រៃឡើងតាមដីសណ្ដទន្លេមេគង្គ អាចលិចទីក្រុងឆ្នេរ និងវាលស្រែ ហើយបំផ្លាញដីកសិកម្មដែលគ្រួសារបានប្រើជាច្រើនជំនាន់មកហើយ។"
            )}
          </p>

          <SeaLevelDiagram kh={kh} t={t} />

          <div className={`mt-3 rounded-md border border-cyan-300 bg-white/60 px-3 py-2 text-xs ${kh ? "font-khmer leading-loose text-cyan-900" : "font-mono uppercase tracking-widest text-cyan-800"}`}>
            {t(
              "AT RISK · Coastal farms, fishing villages, fresh-water wells",
              "មានហានិភ័យ · ចម្ការឆ្នេរ ភូមិនេសាទ អណ្ដូងទឹកសាប"
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Helpers — Section header
// ════════════════════════════════════════════════════════════════════════════

function SectionHeader({
  spec,
  en,
  kh,
  kh_,
}: {
  spec: string;
  en: string;
  kh: string;
  kh_: boolean;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan-700 bg-cyan-50 border border-cyan-300 rounded px-2 py-0.5">
        SEC-{spec}
      </span>
      <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 ${kh_ ? "font-khmer" : ""}`}>
        {kh_ ? kh : en}
      </h2>
      <Ruler className="w-4 h-4 text-slate-400 ml-1" />
      <div className="flex-1 border-t border-dashed border-slate-300" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SVG Diagrams — arctic blueprint style
// ════════════════════════════════════════════════════════════════════════════

const STROKE = "#0c4a6e"; // sky-900
const ICE = "#a5f3fc";    // cyan-200
const DEEP = "#0e7490";   // cyan-700
const ROCK = "#78716c";   // stone-500
const WATER = "#0284c7";  // sky-600

// ── Snow → Ice compaction diagram ─────────────────────────────────────────
function SnowToIceDiagram({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <svg
      viewBox="0 0 300 200"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "ដ្យាក្រាម៖ ព្រិលបង្រួមជាទឹកកកខៀវ" : "Diagram: snow compacting into blue ice"}
    >
      <title>{kh ? "ការបង្រួម៖ ព្រិល → ហ្វៀន → ទឹកកកខៀវ" : "Compaction: snow → firn → blue ice"}</title>

      {/* layer: fresh snow */}
      <rect x="20" y="20"  width="260" height="40" fill="#f8fafc" stroke={STROKE} strokeWidth="1" />
      {/* layer: firn */}
      <rect x="20" y="60"  width="260" height="50" fill="#bae6fd" stroke={STROKE} strokeWidth="1" />
      {/* layer: blue ice */}
      <rect x="20" y="110" width="260" height="70" fill={ICE}     stroke={STROKE} strokeWidth="1.4" />

      {/* tiny crystal dots */}
      {Array.from({ length: 26 }).map((_, i) => (
        <circle key={"s" + i} cx={28 + (i * 10) % 252} cy={28 + Math.floor(i / 26) * 8} r="1.6" fill="#cbd5e1" />
      ))}
      {Array.from({ length: 22 }).map((_, i) => (
        <circle key={"f" + i} cx={32 + (i * 12) % 244} cy={75 + (i % 2) * 14} r="1.2" fill="#0284c7" opacity="0.65" />
      ))}
      {Array.from({ length: 18 }).map((_, i) => (
        <circle key={"i" + i} cx={36 + (i * 14) % 240} cy={130 + (i % 3) * 16} r="0.9" fill={DEEP} opacity="0.85" />
      ))}

      {/* downward arrow showing pressure */}
      <line x1="152" y1="6" x2="152" y2="184" stroke="#f43f5e" strokeWidth="1.4" strokeDasharray="4 3" />
      <polygon points="148,178 156,178 152,188" fill="#f43f5e" />

      {/* labels — bilingual */}
      <text x="28" y="36" fontSize="9" fill={STROKE} fontFamily="monospace">
        {kh ? "ព្រិលថ្មី (ឆ្នាំ 0)" : "FRESH SNOW (yr 0)"}
      </text>
      <text x="28" y="80" fontSize="9" fill={STROKE} fontFamily="monospace">
        {kh ? "ហ្វៀន (ឆ្នាំ ~50)" : "FIRN (~yr 50)"}
      </text>
      <text x="28" y="140" fontSize="9" fill={STROKE} fontFamily="monospace">
        {kh ? "ទឹកកកខៀវ (ឆ្នាំ 100+)" : "BLUE ICE (yr 100+)"}
      </text>

      {/* pressure label */}
      <text x="166" y="100" fontSize="9" fill="#f43f5e" fontFamily="monospace">
        {kh ? "សម្ពាធ" : "PRESSURE"}
      </text>
    </svg>
  );
}

// ── V-shaped river valley ─────────────────────────────────────────────────
function VValleyDiagram({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <svg
      viewBox="0 0 280 180"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "ដ្យាក្រាម៖ ជ្រលងរាងអក្សរ V ដែលកាត់ដោយទឹកទន្លេ" : "Diagram: V-shaped valley carved by a river"}
    >
      <title>{kh ? "ជ្រលង V" : "V-shaped valley"}</title>

      {/* sky strip */}
      <rect x="0" y="0" width="280" height="36" fill="#e0f2fe" />

      {/* mountain block (rock) */}
      <polygon points="0,36 0,180 280,180 280,36 200,36 140,160 80,36" fill="#d6d3d1" stroke={ROCK} strokeWidth="1.2" />

      {/* V outline highlight */}
      <polyline points="80,36 140,160 200,36" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* river at bottom of V */}
      <line x1="135" y1="158" x2="145" y2="158" stroke={WATER} strokeWidth="3" strokeLinecap="round" />
      <circle cx="140" cy="158" r="2" fill={WATER} />

      {/* downward arrow showing single-line cutting */}
      <line x1="140" y1="50" x2="140" y2="148" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3 3" />
      <polygon points="137,144 143,144 140,152" fill="#0284c7" />

      {/* axis label */}
      <text x="140" y="174" fontSize="9" fill={STROKE} fontFamily="monospace" textAnchor="middle">
        {kh ? "ទឹក កាត់បន្ទាត់តែមួយ" : "WATER · SINGLE LINE CUT"}
      </text>
      <text x="6" y="14" fontSize="9" fill={STROKE} fontFamily="monospace">
        {kh ? "ផ្ទៃកំពូល" : "RIDGE"}
      </text>
      <text x="244" y="14" fontSize="9" fill={STROKE} fontFamily="monospace">
        {kh ? "ផ្ទៃកំពូល" : "RIDGE"}
      </text>

      {/* big "V" letter mark */}
      <text x="140" y="84" fontSize="40" fill={WATER} opacity="0.18" fontFamily="serif" textAnchor="middle" fontWeight="bold">
        V
      </text>
    </svg>
  );
}

// ── U-shaped glacier valley ───────────────────────────────────────────────
function UValleyDiagram({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <svg
      viewBox="0 0 280 180"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "ដ្យាក្រាម៖ ជ្រលងរាងអក្សរ U ដែលកិនដោយផ្ទាំងទឹកកក" : "Diagram: U-shaped valley ground out by a glacier"}
    >
      <title>{kh ? "ជ្រលង U" : "U-shaped valley"}</title>

      {/* sky strip */}
      <rect x="0" y="0" width="280" height="36" fill="#e0f2fe" />

      {/* mountain block with U cut out */}
      <path
        d="M0,36 L0,180 L280,180 L280,36 L210,36 L210,90 Q210,150 140,150 Q70,150 70,90 L70,36 Z"
        fill="#d6d3d1"
        stroke={ROCK}
        strokeWidth="1.2"
      />

      {/* U outline highlight */}
      <path d="M70,36 L70,90 Q70,150 140,150 Q210,150 210,90 L210,36" fill="none" stroke={STROKE} strokeWidth="1.4" />

      {/* ice fill in valley */}
      <path d="M76,38 L76,90 Q76,144 140,144 Q204,144 204,90 L204,38 Z" fill={ICE} opacity="0.85" />

      {/* striations on ice */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={84 + i * 28}
          y1={50}
          x2={84 + i * 28}
          y2={120}
          stroke={DEEP}
          strokeWidth="0.8"
          opacity="0.5"
          strokeDasharray="3 4"
        />
      ))}

      {/* multi-direction grinding arrows at base */}
      <polygon points="100,140 92,148 108,148" fill="#0e7490" />
      <polygon points="180,140 172,148 188,148" fill="#0e7490" />
      <polygon points="140,148 132,140 148,140" fill="#0e7490" />

      {/* labels */}
      <text x="140" y="174" fontSize="9" fill={STROKE} fontFamily="monospace" textAnchor="middle">
        {kh ? "ទឹកកក · កិនគ្រប់ទិស" : "ICE · GRINDS ALL SIDES"}
      </text>
      <text x="6" y="14" fontSize="9" fill={STROKE} fontFamily="monospace">
        {kh ? "ផ្ទៃកំពូល" : "RIDGE"}
      </text>
      <text x="244" y="14" fontSize="9" fill={STROKE} fontFamily="monospace">
        {kh ? "ផ្ទៃកំពូល" : "RIDGE"}
      </text>

      {/* big "U" letter mark */}
      <text x="140" y="100" fontSize="42" fill={DEEP} opacity="0.20" fontFamily="serif" textAnchor="middle" fontWeight="bold">
        U
      </text>
    </svg>
  );
}

// ── Freshwater share bar ──────────────────────────────────────────────────
function FreshwaterShareDiagram({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  // Approximate USGS shares of Earth's fresh water
  // Glaciers/ice ~68.7%, Groundwater ~30.1%, Surface (rivers/lakes) ~1.2%
  return (
    <svg
      viewBox="0 0 320 80"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "ដ្យាក្រាម៖ ការបែងចែកទឹកសាបនៅផែនដី ផ្ទាំងទឹកកកប្រហែល ៧០%" : "Diagram: shares of Earth's fresh water — glaciers about 70%"}
    >
      <title>{kh ? "ការបែងចែកទឹកសាប" : "Earth's fresh-water share"}</title>

      {/* bar */}
      <g>
        <rect x="10" y="20" width="218" height="22" fill={ICE} stroke={STROKE} strokeWidth="1" />
        <rect x="228" y="20" width="76"  height="22" fill="#bae6fd" stroke={STROKE} strokeWidth="1" />
        <rect x="304" y="20" width="6"   height="22" fill={WATER} stroke={STROKE} strokeWidth="1" />
      </g>

      {/* labels */}
      <text x="119" y="36" fontSize="10" fill={STROKE} fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        {kh ? "ផ្ទាំងទឹកកក ~៧០%" : "GLACIERS & ICE ~70%"}
      </text>
      <text x="266" y="36" fontSize="9" fill={STROKE} fontFamily="monospace" textAnchor="middle">
        {kh ? "ទឹកក្រោមដី ~៣០%" : "GROUNDWATER ~30%"}
      </text>

      {/* tiny lakes/rivers callout */}
      <line x1="307" y1="46" x2="307" y2="56" stroke={STROKE} strokeWidth="0.8" />
      <text x="312" y="62" fontSize="8" fill={STROKE} fontFamily="monospace">
        {kh ? "ទន្លេ + បឹង <២%" : "RIVERS + LAKES <2%"}
      </text>

      {/* footer scale */}
      <text x="10" y="14" fontSize="8" fill={STROKE} fontFamily="monospace">
        {kh ? "ទឹកសាបពិភពលោក · ប្រភព៖ USGS" : "EARTH'S FRESH WATER · SOURCE: USGS"}
      </text>
    </svg>
  );
}

// ── Sea-level rise diagram (coastline before/after) ───────────────────────
function SeaLevelDiagram({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <svg
      viewBox="0 0 300 140"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "ដ្យាក្រាម៖ ឆ្នេរសមុទ្រកំពុងជន់លិចពេលផ្ទាំងទឹកកករលាយ" : "Diagram: coastline flooding as glaciers melt"}
    >
      <title>{kh ? "ការឡើងកម្ពស់ទឹកសមុទ្រ" : "Sea level rise"}</title>

      {/* sky */}
      <rect x="0" y="0" width="300" height="60" fill="#e0f2fe" />

      {/* land profile (gentle slope, low at right) */}
      <path
        d="M0,60 L80,60 L160,80 L240,95 L300,100 L300,140 L0,140 Z"
        fill="#bbf7d0"
        stroke="#166534"
        strokeWidth="1"
      />

      {/* current sea (low) */}
      <rect x="240" y="95" width="60" height="45" fill={WATER} opacity="0.55" />
      <line x1="240" y1="95" x2="300" y2="95" stroke={STROKE} strokeWidth="1" />
      <text x="295" y="92" fontSize="8" fill={STROKE} fontFamily="monospace" textAnchor="end">
        {kh ? "កម្ពស់ទឹកថ្ងៃនេះ" : "SEA TODAY"}
      </text>

      {/* future sea (higher) */}
      <rect x="160" y="80" width="140" height="15" fill={WATER} opacity="0.30" />
      <line x1="160" y1="80" x2="300" y2="80" stroke="#dc2626" strokeWidth="1" strokeDasharray="3 3" />
      <text x="295" y="76" fontSize="8" fill="#dc2626" fontFamily="monospace" textAnchor="end">
        {kh ? "កម្ពស់ទឹកថ្ងៃក្រោយ" : "FUTURE SEA"}
      </text>

      {/* tiny rice paddy + house symbols on threatened land */}
      <rect x="170" y="74" width="6" height="6" fill="#f59e0b" stroke={STROKE} strokeWidth="0.5" />
      <polygon points="170,74 173,70 176,74" fill="#dc2626" stroke={STROKE} strokeWidth="0.5" />
      <line x1="190" y1="79" x2="195" y2="79" stroke="#15803d" strokeWidth="2" />
      <line x1="200" y1="79" x2="205" y2="79" stroke="#15803d" strokeWidth="2" />
      <line x1="210" y1="79" x2="215" y2="79" stroke="#15803d" strokeWidth="2" />

      {/* arrow showing rise */}
      <line x1="40" y1="60" x2="40" y2="40" stroke="#dc2626" strokeWidth="1.2" />
      <polygon points="36,44 44,44 40,36" fill="#dc2626" />
      <text x="48" y="48" fontSize="9" fill="#dc2626" fontFamily="monospace">
        {kh ? "ទឹករលាយ ⇒ ឡើងខ្ពស់" : "MELT ⇒ RISE"}
      </text>

      {/* land label */}
      <text x="20" y="125" fontSize="9" fill={STROKE} fontFamily="monospace">
        {kh ? "ដីទាប · ចម្ការ + ភូមិ" : "LOW LAND · FARMS + VILLAGES"}
      </text>
    </svg>
  );
}
