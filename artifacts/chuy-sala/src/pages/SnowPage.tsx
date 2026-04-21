import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Snowflake,
  Compass,
  Mountain,
  Globe2,
  Lightbulb,
  Ruler,
  CloudSnow,
  Hexagon,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  SNW-01 · Snow: The Frozen Clouds
//           ព្រិល៖ ពពកដែលកក
//
//   1. How Snow Forms       — deposition: vapour → ice crystal (skip liquid)
//   2. Where Snow Falls     — high latitudes, high altitudes; why not Cambodia
//   3. The Six-Sided Secret — H₂O bond geometry → hexagonal crystals
//
//   Aesthetic: dark winter-storm navy backdrop, crisp white text, pale frosty
//   blues, monospace spec codes, snow-paper grid.
// ════════════════════════════════════════════════════════════════════════════

const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#0b1a33", // deep night-sky navy
  backgroundImage:
    "radial-gradient(circle at 15% 10%, rgba(186, 230, 253, 0.15), transparent 45%)," +
    "radial-gradient(circle at 85% 80%, rgba(125, 211, 252, 0.10), transparent 45%)," +
    "linear-gradient(rgba(186, 230, 253, 0.08) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(186, 230, 253, 0.08) 1px, transparent 1px), " +
    "linear-gradient(rgba(186, 230, 253, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(186, 230, 253, 0.04) 1px, transparent 1px)",
  backgroundSize: "auto, auto, 96px 96px, 96px 96px, 24px 24px, 24px 24px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "rgba(15, 28, 56, 0.85)",
  backgroundImage:
    "linear-gradient(rgba(186, 230, 253, 0.05) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(186, 230, 253, 0.05) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-sky-300/40" : "border-cyan-300/70";
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

// Falling snow accent (decorative only)
function SnowDots() {
  const dots = Array.from({ length: 28 });
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const size = (i % 3) + 1;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white/50"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, opacity: 0.45 + (i % 5) * 0.08 }}
          />
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export function SnowPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6 text-slate-100" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto relative">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-sky-200/80 hover:text-white transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* Hero */}
        <header
          className="relative overflow-hidden rounded-3xl bg-slate-950/70 px-6 sm:px-10 py-8 sm:py-10 mb-10 shadow-xl border border-sky-200/20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(186, 230, 253, 0.20), transparent 55%)," +
              "linear-gradient(rgba(186, 230, 253, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(186, 230, 253, 0.10) 1px, transparent 1px)",
            backgroundSize: "auto, 32px 32px, 32px 32px",
          }}
        >
          <CornerMarks />
          <SnowDots />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-500/10 border-2 border-sky-200/60 text-white flex items-center justify-center flex-shrink-0">
              <Snowflake className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-sky-200/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Weather", "អាកាសធាតុ")}</span>
                <span className="opacity-50">/</span>
                <span className="text-sky-100">SNW-01</span>
              </div>
              <h1
                data-testid="page-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t("Snow: The Frozen Clouds", "ព្រិល៖ ពពកដែលកក")}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-sky-100/80 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "A snowflake is not a frozen raindrop. It begins as invisible water vapour high inside a cloud, builds itself directly into a six-sided crystal of ice, and falls — every single one of them different — through air that is colder than the freezing point of water.",
                  "ស្រកាព្រិលមិនមែនជាដំណក់ភ្លៀងដែលកកទេ។ វាចាប់ផ្ដើមជាចំហាយទឹកដែលមើលមិនឃើញនៅខាងក្នុងពពកខ្ពស់ៗ បង្កើតខ្លួនវាដោយផ្ទាល់ទៅជាគ្រីស្តាល់ទឹកកកមានជ្រុងប្រាំមួយ ហើយធ្លាក់ចុះ — រៀងរាល់ស្រកាខុសគ្នា — ឆ្លងកាត់ខ្យល់ដែលត្រជាក់ជាងចំណុចកករបស់ទឹក។"
                )}
              </p>
            </div>
          </div>
        </header>

        {/* Sections */}
        <HowSnowForms kh={kh} t={t} />
        <WhereSnowFalls kh={kh} t={t} />
        <SixSidedSecret kh={kh} t={t} />

        {/* Closing */}
        <div
          className="relative mt-10 rounded-2xl border border-sky-200/30 p-5 flex items-start gap-3"
          style={CARD_BG}
          data-testid="closing-note"
        >
          <CornerMarks subtle />
          <Globe2 className="w-6 h-6 text-sky-200 flex-shrink-0" />
          <p className={`text-sm text-sky-50 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong className="text-white">{t("Remember: ", "ចងចាំ ៖ ")}</strong>
            {t(
              "Snow is the sky's quiet handwriting — frozen vapour shaped by the geometry of water itself, signed by every breath of wind it falls through. Cambodia's clouds are too warm for it, but the same physics paints rain on the rice fields here every monsoon.",
              "ព្រិលគឺជាអក្សរស្ងាត់ដែលមេឃសរសេរ — ចំហាយទឹកដែលកក រៀបចំរូបរាងដោយធរណីមាត្រនៃទឹកខ្លួនឯង ហើយមានហត្ថលេខាពីខ្យល់រាល់សន្ទុះដែលវាធ្លាក់ឆ្លងកាត់។ ពពកនៅប្រទេសកម្ពុជាក្ដៅពេកសម្រាប់ព្រិល ប៉ុន្តែរូបវិទ្យាដូចគ្នានេះ គូរភ្លៀងលើចម្ការស្រូវនៅទីនេះរាល់រដូវវស្សា។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-bold shadow hover:bg-sky-100 transition-colors ${kh ? "font-khmer" : ""}`}
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
//  Section 01 — How Snow Forms (deposition, with dust seed)
// ════════════════════════════════════════════════════════════════════════════

function HowSnowForms({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-forms">
      <SectionHeader
        spec="01"
        en="How Snow Forms"
        kh="របៀបដែលព្រិលកកើត"
        kh_={kh}
      />

      <div
        className="relative rounded-2xl border border-sky-200/30 p-5 sm:p-7 shadow-lg"
        style={CARD_BG}
      >
        <CornerMarks subtle />
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-6 items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-rose-300/40 bg-rose-500/10 px-3 py-1 text-xs">
              <span className={`font-bold text-rose-200 ${kh ? "font-khmer" : "font-mono uppercase tracking-widest"}`}>
                {t("Common Myth", "ការយល់ច្រឡំ")}
              </span>
              <span className={`text-rose-100/90 ${kh ? "font-khmer" : ""}`}>
                {t("\"Snow is just frozen rain.\"", "«ព្រិលគឺគ្រាន់តែជាភ្លៀងដែលកក។»")}
              </span>
            </div>

            <p className={`text-sky-50 text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Frozen rain has its own name — sleet — and it falls as small clear pellets. Snow is something different. Snow forms by ",
                "ភ្លៀងដែលកកមានឈ្មោះផ្ទាល់ខ្លួន — ហៅថា ‘ស្លេត’ (sleet) — ហើយវាធ្លាក់ជាគ្រាប់តូចថ្លា។ ព្រិលខុសគ្នាទៅទៀត។ ព្រិលកកើតដោយដំណើរការមួយឈ្មោះថា "
              )}
              <strong className="text-cyan-200">{t("deposition", kh ? "ការបន្សុំ" : "deposition")}</strong>
              {t(
                ": water vapour — the invisible gas form of water — turns ",
                " ៖ ចំហាយទឹក — ទម្រង់ឧស្ម័នដែលមើលមិនឃើញរបស់ទឹក — ប្រែទៅជាទឹកកក "
              )}
              <strong className="text-white">{t("directly into solid ice", "ដោយផ្ទាល់")}</strong>
              {t(
                ", with ",
                " ដោយ "
              )}
              <strong className="text-rose-200">{t("no liquid water step in between", "មិនឆ្លងកាត់ដំណាក់កាលទឹករាវឡើយ")}</strong>
              .
            </p>
            <p className={`text-sky-50 text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "It happens high inside cold clouds where the temperature is well below 0 °C. But vapour cannot crystallize out of thin air on its own. Every snowflake needs a ",
                "វាកើតឡើងនៅក្នុងពពកត្រជាក់ខ្ពស់ៗ ដែលសីតុណ្ហភាពទាបជាង 0°C ច្រើន។ ប៉ុន្តែចំហាយមិនអាចក្លាយជាគ្រីស្តាល់ដោយឯកឯងពីខ្យល់ឥតមានអ្វីសោះទេ។ ស្រកាព្រិលនីមួយៗត្រូវការ "
              )}
              <strong className="text-amber-200">{t("seed", "គ្រាប់ពូជ")}</strong>
              {t(
                " — a tiny floating speck of dust, pollen, soot, or sea-salt. The vapour grabs onto that speck, freezes, and a brand-new ice crystal is born.",
                " — ល្អងតូចៗដែលអណ្ដែត ដូចជាធូលី លំអងផ្កា សំណល់ឆេះ ឬអំបិលសមុទ្រ។ ចំហាយចាប់យកល្អងនោះ កក ហើយគ្រីស្តាល់ទឹកកកថ្មីមួយត្រូវបានកកើតឡើង។"
              )}
            </p>

            <div className="flex flex-wrap gap-2 mb-4" data-testid="forms-vocab">
              <VocabChip color="cyan"  en="Vapour (Gas)"  kh="ចំហាយ (ឧស្ម័ន)" k={kh} />
              <VocabChip color="white" en="Deposition"    kh="ការបន្សុំ"        k={kh} />
              <VocabChip color="ice"   en="Ice Crystal"   kh="គ្រីស្តាល់ទឹកកក"    k={kh} />
              <VocabChip color="amber" en="Dust Seed"     kh="គ្រាប់ធូលី"         k={kh} />
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-sky-500/10 border-l-4 border-sky-300 p-3">
              <Lightbulb className="w-5 h-5 text-sky-200 flex-shrink-0 mt-0.5" />
              <p className={`text-sm text-sky-50 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                <strong className="text-white">{t("Surprise: ", "ភាពភ្ញាក់ផ្អើល ៖ ")}</strong>
                {t(
                  "Every snowflake you have ever seen began with a microscopic piece of dirt at its centre. The 'cleanest' thing in winter is built around a tiny speck of dust.",
                  "ស្រកាព្រិលគ្រប់គ្រាប់ដែលអ្នកធ្លាប់ឃើញ បានចាប់ផ្ដើមដោយល្អងអាចម៌តូចៗមើលមិនឃើញនៅកណ្ដាល។ វត្ថុ ‘ស្អាតបំផុត’ នៅរដូវរងារ ត្រូវបានសាងសង់ជុំវិញធូលីតូចមួយ។"
                )}
              </p>
            </div>
          </div>

          {/* Phase-change diagram */}
          <div
            className="rounded-xl bg-slate-950/70 p-4 text-slate-100 border border-sky-200/20"
            data-testid="deposition-diagram"
          >
            <div className={`text-[10px] font-mono uppercase tracking-widest text-sky-200/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("PHASE CHANGE · VAPOUR → ICE", "ការប្ដូរសភាព · ចំហាយ → ទឹកកក")}
            </div>
            <DepositionDiagram kh={kh} />
            <div className={`mt-2 text-center text-[11px] text-sky-200/70 ${kh ? "font-khmer leading-loose" : "font-mono uppercase tracking-widest"}`}>
              {t(
                "Skips the liquid step entirely",
                "ឆ្លងលោតរំលងដំណាក់កាលទឹករាវ"
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
  color: "cyan" | "white" | "ice" | "amber";
  en: string;
  kh: string;
  k: boolean;
}) {
  const colours: Record<string, string> = {
    cyan:  "border-cyan-300/60 text-cyan-100 bg-cyan-500/10",
    white: "border-slate-200/50 text-white bg-white/10",
    ice:   "border-sky-300/60 text-sky-100 bg-sky-500/10",
    amber: "border-amber-300/60 text-amber-100 bg-amber-500/10",
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
//  Section 02 — Where Snow Falls
// ════════════════════════════════════════════════════════════════════════════

function WhereSnowFalls({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-where">
      <SectionHeader
        spec="02"
        en="Where Snow Falls"
        kh="កន្លែងដែលមានព្រិលធ្លាក់"
        kh_={kh}
      />

      <div
        className="relative rounded-2xl border border-sky-200/30 p-5 sm:p-7 shadow-lg mb-5"
        style={CARD_BG}
      >
        <CornerMarks subtle />
        <p className={`text-sky-50 text-sm sm:text-base ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "Snow needs only one ingredient to reach the ground: air colder than ",
            "ព្រិលត្រូវការគ្រឿងផ្សំតែមួយមុខប៉ុណ្ណោះ ដើម្បីធ្លាក់មកដល់ដី ៖ ខ្យល់ដែលត្រជាក់ជាង "
          )}
          <strong className="text-cyan-200">0 °C</strong>
          {t(
            " all the way down through the falling path. On Earth, that condition shows up reliably in just two kinds of places.",
            " ពេញតាមផ្លូវធ្លាក់ទាំងមូល។ នៅលើផែនដី លក្ខខណ្ឌនេះកើតឡើងជាប្រចាំ នៅកន្លែងពីរប្រភេទប៉ុណ្ណោះ។"
          )}
        </p>
      </div>

      {/* Two cards side by side */}
      <div className="grid md:grid-cols-2 gap-5">
        <article
          className="relative rounded-2xl border border-sky-200/40 p-5 shadow-lg"
          style={CARD_BG}
          data-testid="latitude-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-3">
            <Globe2 className="w-5 h-5 text-sky-200" />
            <h3 className={`text-lg font-bold text-white ${kh ? "font-khmer" : ""}`}>
              {t("High Latitudes — Near the Poles", "រយៈទទឹងខ្ពស់ — ជិតប៉ូល")}
            </h3>
          </div>
          <div className="rounded-lg border border-dashed border-sky-200/30 bg-slate-950/60 p-3 mb-3">
            <LatitudeDiagram kh={kh} />
          </div>
          <p className={`text-sm text-sky-50 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Near the North and South Poles, the Sun's rays strike the ground at a sharp slanting angle and have to spread their warmth over a large area. That weak heating keeps the air below 0 °C for most of the year. Examples: ",
              "នៅជិតប៉ូលខាងជើង និងខាងត្បូង កាំរស្មីព្រះអាទិត្យបាញ់មកដីក្នុងមុំមួយផ្អៀង ហើយត្រូវបន្ថយកម្ដៅរបស់វានៅលើផ្ទៃធំ។ កម្ដៅខ្សោយនោះធ្វើឱ្យខ្យល់ស្ថិតក្រោម 0°C ពេញឆ្នាំ។ ឧទាហរណ៍ ៖ "
            )}
            <strong className="text-white">{t("Canada, Antarctica, northern Russia", "ប្រទេសកាណាដា អង់តាក់ទិក រុស្ស៊ីខាងជើង")}</strong>.
          </p>
        </article>

        <article
          className="relative rounded-2xl border border-sky-200/40 p-5 shadow-lg"
          style={CARD_BG}
          data-testid="altitude-card"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-3">
            <Mountain className="w-5 h-5 text-sky-200" />
            <h3 className={`text-lg font-bold text-white ${kh ? "font-khmer" : ""}`}>
              {t("High Altitudes — Tall Mountains", "កម្ពស់ខ្ពស់ — ភ្នំធំៗ")}
            </h3>
          </div>
          <div className="rounded-lg border border-dashed border-sky-200/30 bg-slate-950/60 p-3 mb-3">
            <AltitudeDiagram kh={kh} />
          </div>
          <p className={`text-sm text-sky-50 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Air gets colder as you go up — about 6 °C colder for every 1 km of altitude. So even mountains right on the equator can have snowy peaks. Examples: ",
              "ខ្យល់ត្រជាក់ជាងមុនពេលអ្នកឡើងខ្ពស់ — ប្រហែល 6°C ត្រជាក់ជាងមុន រាល់កម្ពស់ 1 គីឡូម៉ែត្រ។ ដូច្នេះ សូម្បីតែភ្នំដែលនៅលើខ្សែអេក្វាទ័រ ក៏អាចមានកំពូលពោរពេញដោយព្រិលដែរ។ ឧទាហរណ៍ ៖ "
            )}
            <strong className="text-white">{t("Mt. Kilimanjaro (Africa), the Andes, the Himalayas", "ភ្នំគីលីម៉ាន់ចារ៉ូ (អាហ្វ្រិក) ភ្នំអង់ដ ហិមាល័យ")}</strong>.
          </p>
        </article>
      </div>

      {/* Why not Cambodia */}
      <article
        className="relative mt-5 rounded-2xl border border-amber-300/40 p-5 shadow-lg"
        style={CARD_BG}
        data-testid="cambodia-card"
      >
        <CornerMarks subtle />
        <div className="flex items-center gap-2 mb-2">
          <CloudSnow className="w-5 h-5 text-amber-200" />
          <h3 className={`text-lg font-bold text-amber-100 ${kh ? "font-khmer" : ""}`}>
            {t("So why no snow in Cambodia?", "ហេតុអ្វីប្រទេសកម្ពុជាគ្មានព្រិល?")}
          </h3>
        </div>
        <p className={`text-sm text-sky-50 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "Cambodia fails both tests. We sit very close to the equator, so sunlight hits us almost straight down and the country stays warm year-round (rarely below 15 °C even in the coolest weeks). And our highest peak — Phnom Aoral, around ",
            "ប្រទេសកម្ពុជាមិនបំពេញលក្ខខណ្ឌទាំងពីរទេ។ យើងស្ថិតនៅជិតខ្សែអេក្វាទ័រខ្លាំង ដូច្នេះពន្លឺព្រះអាទិត្យបាញ់មកស្ទើរត្រង់ៗ ហើយប្រទេសនេះនៅក្ដៅពេញមួយឆ្នាំ (កម្រធ្លាក់ក្រោម 15°C សូម្បីក្នុងសប្ដាហ៍ត្រជាក់បំផុត)។ ហើយកំពូលភ្នំខ្ពស់បំផុតរបស់យើង — ភ្នំឱរ៉ាល់ ប្រហែល "
          )}
          <strong className="text-amber-100">1,813 m</strong>
          {t(
            " — is far too low to reach freezing temperatures. The ingredients for snow simply never come together over our skies.",
            " — ទាបពេកហើយ មិនអាចឈានដល់សីតុណ្ហភាពកក។ គ្រឿងផ្សំសម្រាប់ព្រិល គ្រាន់តែមិនធ្លាប់មកជួបជុំគ្នានៅលើមេឃយើងសោះ។"
          )}
        </p>
      </article>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — The Six-Sided Secret
// ════════════════════════════════════════════════════════════════════════════

function SixSidedSecret({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-hex">
      <SectionHeader
        spec="03"
        en="The Six-Sided Secret"
        kh="អាថ៌កំបាំងជ្រុងទាំងប្រាំមួយ"
        kh_={kh}
      />

      <div
        className="relative rounded-2xl border border-sky-200/30 p-5 sm:p-7 shadow-lg"
        style={CARD_BG}
      >
        <CornerMarks subtle />
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6 items-center">
          {/* Hexagon molecular diagram */}
          <div
            className="rounded-xl bg-slate-950/70 p-4 text-slate-100 border border-sky-200/20"
            data-testid="hex-diagram"
          >
            <div className={`text-[10px] font-mono uppercase tracking-widest text-sky-200/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("MOLECULAR LATTICE · H₂O → HEXAGON", "បន្ទះម៉ូលេគុល · H₂O → ឆកោន")}
            </div>
            <HexagonLatticeDiagram kh={kh} />
            <div className={`mt-2 text-center text-[11px] text-sky-200/70 ${kh ? "font-khmer leading-loose" : "font-mono uppercase tracking-widest"}`}>
              {t(
                "Six water molecules link into one ring",
                "ម៉ូលេគុលទឹកប្រាំមួយតភ្ជាប់ជារង្វង់មួយ"
              )}
            </div>
          </div>

          <div>
            <p className={`text-sky-50 text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "A water molecule is shaped like a tiny boomerang: one ",
                "ម៉ូលេគុលទឹកមានរូបរាងដូចបូមឺរ៉ាំងតូចមួយ ៖ "
              )}
              <strong className="text-rose-200">{t("oxygen atom (O)", "អាតូមអុកស៊ីសែន (O)")}</strong>
              {t(
                " bonded to two ",
                " ភ្ជាប់ជាមួយ "
              )}
              <strong className="text-cyan-200">{t("hydrogen atoms (H)", "អាតូមអ៊ីដ្រូសែនពីរ (H)")}</strong>
              {t(
                " at a fixed angle of about 104.5°. When the temperature drops below 0 °C, those molecules slow down and lock together. The cleanest way they fit is in rings of six — every ring is a perfect hexagon.",
                " ក្នុងមុំថេរប្រហែល 104.5°។ ពេលសីតុណ្ហភាពធ្លាក់ក្រោម 0°C ម៉ូលេគុលទាំងនោះបន្ថយល្បឿន ហើយចាក់សោជាមួយគ្នា។ វិធីដែលវាសមនឹងគ្នាល្អបំផុត គឺជារង្វង់នៃ ៦ — រង្វង់នីមួយៗគឺជាឆកោនដ៏ល្អឥតខ្ចោះមួយ។"
              )}
            </p>
            <p className={`text-sky-50 text-sm sm:text-base mb-4 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Then the snowflake grows outward. Vapour from the air keeps freezing onto every corner of the hexagon at the same time — so the six branches grow as ",
                "បន្ទាប់មក ស្រកាព្រិលដុះធំចេញ។ ចំហាយពីខ្យល់បន្តកកនៅលើជ្រុងទាំង ៦ ក្នុងពេលតែមួយ — ដូច្នេះមែកទាំង ៦ ដុះជា "
              )}
              <strong className="text-white">{t("six matching arms", "ដៃប្រាំមួយដែលដូចគ្នា")}</strong>
              {t(
                ". That is why every snowflake has six sides — never five, never seven.",
                "។ នេះហើយជាមូលហេតុដែលស្រកាព្រិលគ្រប់គ្រាប់មានជ្រុង ៦ — មិនដែលមាន ៥ ឬ ៧ ឡើយ។"
              )}
            </p>

            <div className="flex flex-wrap gap-2 mb-4" data-testid="hex-vocab">
              <VocabChip color="white" en="H₂O Molecule" kh="ម៉ូលេគុល H₂O" k={kh} />
              <VocabChip color="cyan"  en="Hydrogen Bond" kh="ចំណង​អ៊ីដ្រូសែន" k={kh} />
              <VocabChip color="ice"   en="Hexagonal Lattice" kh="បន្ទះឆកោន" k={kh} />
              <VocabChip color="amber" en="Six-fold Symmetry" kh="ស៊ីមេទ្រី ៦-ដង" k={kh} />
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-amber-500/10 border-l-4 border-amber-300 p-3">
              <Hexagon className="w-5 h-5 text-amber-200 flex-shrink-0 mt-0.5" />
              <p className={`text-sm text-sky-50 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                <strong className="text-white">{t("Why no two are alike: ", "ហេតុអ្វីគ្មានស្រកាពីរដូចគ្នា ៖ ")}</strong>
                {t(
                  "On its long fall to the ground, a snowflake passes through thousands of tiny pockets of slightly different temperature and humidity. Each tiny change tells its arms to grow a little faster, slower, branchier, or sharper. By the time it lands, no other snowflake on Earth has lived through exactly the same path — so each one wears a unique fingerprint.",
                  "ក្នុងការធ្លាក់ដ៏វែងឆ្ងាយរបស់វាមកដី ស្រកាព្រិលមួយឆ្លងកាត់ប៉ុស្តិ៍តូចៗរាប់ពាន់ កន្លែងដែលសីតុណ្ហភាព និងសំណើមខុសគ្នាបន្តិចបន្តួច។ ការប្រែប្រួលតូចៗទាំងនោះ ប្រាប់ដៃរបស់វាឱ្យដុះលឿន យឺត មានមែកច្រើន ឬមុតស្រួចជាងមុន។ ពេលវាធ្លាក់មកដល់ដី គ្មានស្រកាព្រិលណាមួយផ្សេងទៀតនៅលើផែនដី ដែលឆ្លងកាត់ផ្លូវដូចគ្នាបេះបិទនោះទេ — ដូច្នេះស្រកានីមួយៗមានស្នាមមេដៃតែមួយគត់។"
                )}
              </p>
            </div>
          </div>
        </div>
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
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-sky-200 bg-sky-500/10 border border-sky-300/40 rounded px-2 py-0.5">
        SEC-{spec}
      </span>
      <h2 className={`text-xl sm:text-2xl font-bold text-white ${kh_ ? "font-khmer" : ""}`}>
        {kh_ ? kh : en}
      </h2>
      <Ruler className="w-4 h-4 text-sky-300/60 ml-1" />
      <div className="flex-1 border-t border-dashed border-sky-300/30" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SVG Diagrams — winter-storm style
// ════════════════════════════════════════════════════════════════════════════

const ICE_LINE = "#bae6fd"; // sky-200
const ICE_FILL = "#e0f2fe"; // sky-100
const O_COLOR = "#fb7185";  // rose-400 (oxygen)
const H_COLOR = "#7dd3fc";  // sky-300 (hydrogen)
const SUN = "#fde68a";      // amber-200

// ── Deposition diagram (vapour → solid, skipping liquid) ──────────────────
function DepositionDiagram({ kh }: { kh: boolean }) {
  return (
    <svg
      viewBox="0 0 300 200"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "ដ្យាក្រាម៖ ចំហាយប្រែជាទឹកកកដោយផ្ទាល់ លោតរំលងទឹករាវ" : "Diagram: vapour turning directly into ice, skipping liquid"}
    >
      <title>{kh ? "ការបន្សុំ ៖ ចំហាយ → ទឹកកក" : "Deposition: vapour → ice"}</title>

      {/* gas (top) */}
      <rect x="20" y="20" width="80" height="50" fill="rgba(125,211,252,0.18)" stroke={ICE_LINE} strokeWidth="1" />
      <text x="60" y="42" fontSize="10" fill="#e0f2fe" fontFamily="monospace" textAnchor="middle">
        {kh ? "ឧស្ម័ន" : "GAS"}
      </text>
      <text x="60" y="58" fontSize="9" fill="#bae6fd" fontFamily="monospace" textAnchor="middle">
        {kh ? "ចំហាយ" : "VAPOUR"}
      </text>
      {/* gas dots */}
      {Array.from({ length: 14 }).map((_, i) => (
        <circle key={"g" + i} cx={26 + (i * 13) % 68} cy={28 + (i % 4) * 9} r="1.4" fill="#bae6fd" opacity="0.7" />
      ))}

      {/* liquid (middle) — crossed out */}
      <rect x="20" y="80" width="80" height="40" fill="rgba(56,189,248,0.10)" stroke={ICE_LINE} strokeWidth="1" strokeDasharray="3 3" />
      <text x="60" y="100" fontSize="10" fill="#e0f2fe" fontFamily="monospace" textAnchor="middle">
        {kh ? "ទឹករាវ" : "LIQUID"}
      </text>
      <text x="60" y="114" fontSize="8" fill="#94a3b8" fontFamily="monospace" textAnchor="middle">
        {kh ? "(លោត)" : "(SKIPPED)"}
      </text>
      <line x1="20" y1="80" x2="100" y2="120" stroke="#f43f5e" strokeWidth="1.5" />
      <line x1="100" y1="80" x2="20" y2="120" stroke="#f43f5e" strokeWidth="1.5" />

      {/* solid (bottom) */}
      <rect x="20" y="130" width="80" height="50" fill="rgba(186,230,253,0.30)" stroke={ICE_LINE} strokeWidth="1.4" />
      <text x="60" y="152" fontSize="10" fill="#ffffff" fontFamily="monospace" textAnchor="middle">
        {kh ? "សភាពរឹង" : "SOLID"}
      </text>
      <text x="60" y="168" fontSize="9" fill="#bae6fd" fontFamily="monospace" textAnchor="middle">
        {kh ? "ទឹកកក" : "ICE"}
      </text>

      {/* Direct deposition arrow (vapour → ice) skipping middle */}
      <path d="M105,40 C160,40 160,160 105,160" fill="none" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="5 4" />
      <polygon points="100,156 110,156 105,166" fill="#a7f3d0" />
      <text x="170" y="80" fontSize="10" fill="#a7f3d0" fontFamily="monospace">
        {kh ? "ការបន្សុំ" : "DEPOSITION"}
      </text>
      <text x="170" y="94" fontSize="8" fill="#a7f3d0" fontFamily="monospace">
        {kh ? "ចំហាយ → ទឹកកក" : "VAPOUR → ICE"}
      </text>

      {/* dust seed callout */}
      <circle cx="240" cy="140" r="3" fill={SUN} stroke="#0b1a33" strokeWidth="0.6" />
      <text x="248" y="144" fontSize="9" fill={SUN} fontFamily="monospace">
        {kh ? "គ្រាប់ធូលី" : "DUST SEED"}
      </text>
      <line x1="220" y1="140" x2="237" y2="140" stroke={SUN} strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

// ── Latitude diagram (Sun rays straight vs slanted) ───────────────────────
function LatitudeDiagram({ kh }: { kh: boolean }) {
  return (
    <svg
      viewBox="0 0 280 160"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "ដ្យាក្រាម៖ កាំរស្មីព្រះអាទិត្យបាញ់ផ្អៀងនៅជិតប៉ូល" : "Diagram: weak slanted sunlight near the poles"}
    >
      <title>{kh ? "កាំរស្មីព្រះអាទិត្យនៅប៉ូល" : "Sunlight at the poles"}</title>

      {/* Earth circle */}
      <circle cx="140" cy="100" r="55" fill="#1e3a8a" stroke={ICE_LINE} strokeWidth="1.2" />
      {/* equator line */}
      <line x1="85" y1="100" x2="195" y2="100" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3" />
      <text x="200" y="103" fontSize="8" fill="#fbbf24" fontFamily="monospace">
        {kh ? "អេក្វាទ័រ" : "EQUATOR"}
      </text>

      {/* polar caps */}
      <path d="M100,55 A55,55 0 0,1 180,55 A35,18 0 0,1 100,55 Z" fill={ICE_FILL} opacity="0.85" />
      <path d="M100,145 A55,55 0 0,0 180,145 A35,18 0 0,0 100,145 Z" fill={ICE_FILL} opacity="0.85" />
      <text x="140" y="55" fontSize="8" fill="#0b1a33" fontFamily="monospace" textAnchor="middle">
        {kh ? "ព្រិល" : "SNOW"}
      </text>
      <text x="140" y="148" fontSize="8" fill="#0b1a33" fontFamily="monospace" textAnchor="middle">
        {kh ? "ព្រិល" : "SNOW"}
      </text>

      {/* Sun (left) */}
      <circle cx="20" cy="100" r="10" fill={SUN} />
      <text x="20" y="125" fontSize="9" fill={SUN} fontFamily="monospace" textAnchor="middle">
        {kh ? "ព្រះអាទិត្យ" : "SUN"}
      </text>

      {/* straight ray to equator */}
      <line x1="32" y1="100" x2="84" y2="100" stroke={SUN} strokeWidth="1.6" />
      <polygon points="80,97 80,103 88,100" fill={SUN} />
      <text x="58" y="94" fontSize="8" fill={SUN} fontFamily="monospace">
        {kh ? "បាញ់ត្រង់ → ក្ដៅ" : "DIRECT → HOT"}
      </text>

      {/* slanted ray to north pole */}
      <line x1="32" y1="98" x2="118" y2="58" stroke={SUN} strokeWidth="1.2" opacity="0.7" />
      <polygon points="115,55 121,61 124,52" fill={SUN} opacity="0.7" />
      {/* slanted ray to south pole */}
      <line x1="32" y1="102" x2="118" y2="142" stroke={SUN} strokeWidth="1.2" opacity="0.7" />
      <polygon points="115,145 121,139 124,148" fill={SUN} opacity="0.7" />

      <text x="206" y="38" fontSize="8" fill="#bae6fd" fontFamily="monospace">
        {kh ? "ផ្អៀង → ត្រជាក់" : "SLANTED → COLD"}
      </text>
    </svg>
  );
}

// ── Altitude diagram (mountain with snow line) ────────────────────────────
function AltitudeDiagram({ kh }: { kh: boolean }) {
  return (
    <svg
      viewBox="0 0 280 160"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "ដ្យាក្រាម៖ ភ្នំខ្ពស់មានបន្ទាត់ព្រិល ខ្យល់ត្រជាក់ជាងពេលឡើងខ្ពស់" : "Diagram: tall mountain with a snow line; air is colder higher up"}
    >
      <title>{kh ? "ខ្សែបន្ទាត់ព្រិលនៅលើភ្នំ" : "Snow line on a mountain"}</title>

      {/* mountain triangle */}
      <polygon points="20,150 140,20 260,150" fill="#334155" stroke={ICE_LINE} strokeWidth="1.2" />
      {/* snow cap */}
      <polygon points="100,70 140,20 180,70 160,80 140,72 120,80" fill={ICE_FILL} stroke={ICE_LINE} strokeWidth="1" />
      {/* snow line */}
      <line x1="20" y1="80" x2="260" y2="80" stroke={ICE_LINE} strokeWidth="1" strokeDasharray="4 3" opacity="0.7" />
      <text x="6" y="76" fontSize="9" fill={ICE_LINE} fontFamily="monospace">
        {kh ? "បន្ទាត់ព្រិល" : "SNOW LINE"}
      </text>
      <text x="200" y="76" fontSize="9" fill={ICE_LINE} fontFamily="monospace">
        0 °C
      </text>

      {/* altitude axis */}
      <line x1="270" y1="20" x2="270" y2="150" stroke="#94a3b8" strokeWidth="0.8" />
      <polygon points="267,24 273,24 270,16" fill="#94a3b8" />
      <text x="276" y="24" fontSize="9" fill={ICE_LINE} fontFamily="monospace">
        {kh ? "ខ្ពស់" : "HIGH"}
      </text>
      <text x="276" y="148" fontSize="9" fill="#fde68a" fontFamily="monospace">
        {kh ? "ទាប" : "LOW"}
      </text>

      {/* labels: warm at base, cold at peak */}
      <text x="32" y="146" fontSize="9" fill="#fde68a" fontFamily="monospace">
        {kh ? "ខ្យល់ក្ដៅ" : "WARM AIR"}
      </text>
      <text x="120" y="40" fontSize="9" fill={ICE_LINE} fontFamily="monospace">
        {kh ? "ខ្យល់ត្រជាក់" : "COLD AIR"}
      </text>

      {/* vertical lapse arrow */}
      <line x1="225" y1="140" x2="225" y2="40" stroke="#bae6fd" strokeWidth="1" strokeDasharray="3 3" />
      <polygon points="222,44 228,44 225,34" fill="#bae6fd" />
      <text x="232" y="100" fontSize="8" fill="#bae6fd" fontFamily="monospace">
        {kh ? "−6°C / គីឡូម៉" : "−6°C / KM"}
      </text>
    </svg>
  );
}

// ── Hexagonal H₂O molecular lattice diagram ───────────────────────────────
function HexagonLatticeDiagram({ kh }: { kh: boolean }) {
  // Six oxygen atoms placed at hexagon vertices, hydrogens between
  const cx = 150;
  const cy = 100;
  const r = 60;
  const verts = Array.from({ length: 6 }).map((_, i) => {
    const a = (-Math.PI / 2) + (i * Math.PI) / 3;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), a };
  });

  return (
    <svg
      viewBox="0 0 300 200"
      className="w-full h-auto"
      role="img"
      aria-label={kh ? "ដ្យាក្រាម៖ ម៉ូលេគុលទឹក H₂O ផ្គុំជារង្វង់ឆកោន" : "Diagram: H₂O water molecules linked into a hexagonal ring"}
    >
      <title>{kh ? "បន្ទះឆកោននៃទឹកកក" : "Hexagonal lattice of ice"}</title>

      {/* hexagon outline */}
      <polygon
        points={verts.map((v) => `${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(" ")}
        fill="rgba(186,230,253,0.08)"
        stroke={ICE_LINE}
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />

      {/* hydrogen-bond edges (between O atoms) */}
      {verts.map((v, i) => {
        const next = verts[(i + 1) % 6];
        const mx = (v.x + next.x) / 2;
        const my = (v.y + next.y) / 2;
        return (
          <g key={"e" + i}>
            <line x1={v.x} y1={v.y} x2={next.x} y2={next.y} stroke={H_COLOR} strokeWidth="1" />
            <circle cx={mx} cy={my} r="3.5" fill={H_COLOR} stroke="#0b1a33" strokeWidth="0.6" />
            <text x={mx} y={my + 1.2} fontSize="6" fill="#0b1a33" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              H
            </text>
          </g>
        );
      })}

      {/* oxygen atoms at vertices */}
      {verts.map((v, i) => (
        <g key={"o" + i}>
          <circle cx={v.x} cy={v.y} r="9" fill={O_COLOR} stroke="#0b1a33" strokeWidth="0.8" />
          <text x={v.x} y={v.y + 3} fontSize="9" fill="#0b1a33" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            O
          </text>
        </g>
      ))}

      {/* legend */}
      <g transform="translate(8,160)">
        <circle cx="6" cy="6" r="6" fill={O_COLOR} stroke="#0b1a33" strokeWidth="0.6" />
        <text x="18" y="9" fontSize="9" fill="#e0f2fe" fontFamily="monospace">
          {kh ? "អុកស៊ីសែន (O)" : "OXYGEN (O)"}
        </text>
        <circle cx="6" cy="24" r="4" fill={H_COLOR} stroke="#0b1a33" strokeWidth="0.6" />
        <text x="18" y="27" fontSize="9" fill="#e0f2fe" fontFamily="monospace">
          {kh ? "អ៊ីដ្រូសែន (H)" : "HYDROGEN (H)"}
        </text>
      </g>

      {/* "6 sides" callout */}
      <text x="240" y="36" fontSize="11" fill="#ffffff" fontFamily="monospace" fontWeight="bold">
        6
      </text>
      <text x="240" y="50" fontSize="8" fill="#bae6fd" fontFamily="monospace">
        {kh ? "ជ្រុង" : "SIDES"}
      </text>

      {/* angle hint */}
      <text x="200" y="180" fontSize="8" fill="#bae6fd" fontFamily="monospace">
        {kh ? "មុំ H–O–H ≈ 104.5°" : "H–O–H ANGLE ≈ 104.5°"}
      </text>
    </svg>
  );
}
