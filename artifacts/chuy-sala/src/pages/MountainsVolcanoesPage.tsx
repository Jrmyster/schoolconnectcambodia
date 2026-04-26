import { Link } from "wouter";
import {
  ArrowLeft,
  Flame,
  Mountain,
  Triangle,
  Layers,
  ArrowDown,
  ArrowUp,
  AlertTriangle,
  Globe,
  Snowflake,
  Waves,
  Activity,
  Sparkles,
  Thermometer,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Mountains & Volcanoes — The Earth's Crust
 * ភ្នំ និងភ្នំភ្លើង៖ សំបកផែនដី
 *
 * Rugged geology aesthetic: deep magma reds, granite greys, snowy whites.
 * Bilingual EN/Khmer throughout.
 * ══════════════════════════════════════════════════════════════════════════ */

export function MountainsVolcanoesPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen relative overflow-hidden bg-stone-950 text-stone-100">
      {/* Backdrop: granite-to-magma vertical gradient + faint rock-strata lines */}
      <BackdropStrata />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Back link */}
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-stone-400 hover:text-white transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* Hero ─────────────────────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-stone-700 via-red-700 to-amber-600 text-white shadow-lg mb-4 ring-2 ring-amber-500/30">
            <Mountain className="w-9 h-9" strokeWidth={2.25} aria-hidden />
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-[0.3em] text-amber-400/90 mb-2 inline-flex items-center gap-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
          >
            <Flame className="w-3.5 h-3.5" aria-hidden />
            {t("Science / Earth's Crust", "វិទ្យាសាស្ត្រ / សំបកផែនដី")}
          </div>
          <h1
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
            data-testid="heading-hero"
          >
            {kh ? (
              "ភ្នំ និងភ្នំភ្លើង៖ សំបកផែនដី"
            ) : (
              <>
                Mountains & Volcanoes:{" "}
                <span className="bg-gradient-to-r from-amber-300 via-red-400 to-rose-500 bg-clip-text text-transparent">
                  The Earth's Crust
                </span>
              </>
            )}
          </h1>
          <p
            className={`text-base sm:text-lg text-stone-300 max-w-2xl mx-auto ${kh ? "font-khmer leading-loose" : ""}`}
          >
            {t(
              "Beneath your feet, a planet of molten rock churns slowly under crushing pressure — building continents, raising peaks, and lighting fires we call volcanoes.",
              "នៅក្រោមជើងរបស់អ្នក ភពផែនដីដ៏រាវនៃថ្មរលាយកំពុងកូរយឺតៗក្រោមសម្ពាធដ៏ខ្លាំង — ស្ថាបនាទ្វីប លើកកំពូលភ្នំ និងបញ្ឆេះភ្លើងដែលយើងហៅថាភ្នំភ្លើង។",
            )}
          </p>

          {/* Earth-stats chip strip */}
          <div className="mt-5 inline-flex flex-wrap justify-center gap-2 text-[10px] sm:text-xs font-mono text-stone-300">
            <span className="px-3 py-1.5 rounded-full border border-stone-600/60 bg-stone-900/60">
              {t("CORE: 6,000°C", "ស្នូល៖ ៦ ០០០°C")}
            </span>
            <span className="px-3 py-1.5 rounded-full border border-red-700/60 bg-red-950/60 text-red-200">
              {t("MAGMA: 700–1,300°C", "ម៉ាកម៉ា៖ ៧០០–១ ៣០០°C")}
            </span>
            <span className="px-3 py-1.5 rounded-full border border-stone-600/60 bg-stone-900/60">
              {t("PLATES: 7 major", "បន្ទះធំ៖ ៧")}
            </span>
            <span className="px-3 py-1.5 rounded-full border border-amber-700/60 bg-amber-950/40 text-amber-200">
              {t("ACTIVE VOLCANOES: ~1,500", "ភ្នំភ្លើងសកម្ម៖ ~១ ៥០០")}
            </span>
          </div>
        </header>

        {/* Card 1 ───────────────────────────────────────────────────────── */}
        <Card1MagmaVsLava kh={kh} t={t} />

        {/* Card 2 ───────────────────────────────────────────────────────── */}
        <Card2Convection kh={kh} t={t} />

        {/* Card 3 ───────────────────────────────────────────────────────── */}
        <Card3Yellowstone kh={kh} t={t} />

        {/* Card 4 ───────────────────────────────────────────────────────── */}
        <Card4GiantsOfTheWorld kh={kh} t={t} />

        {/* Closing */}
        <div className="mt-10 rounded-2xl border border-amber-700/40 bg-gradient-to-r from-stone-900/80 via-red-950/40 to-stone-900/80 p-5 sm:p-6 text-center">
          <Sparkles
            className="w-5 h-5 mx-auto mb-2 text-amber-400"
            aria-hidden
          />
          <p
            className={`text-sm sm:text-base text-stone-200 ${kh ? "font-khmer text-base sm:text-lg leading-loose" : "leading-relaxed"}`}
          >
            {t(
              "Every mountain you climb is older than your country, your language, and your species — and one day it, too, will erode back into the sea.",
              "រាល់ភ្នំដែលអ្នកឡើង មានអាយុចាស់ជាងប្រទេស ភាសា និងពូជសត្វរបស់អ្នក — ហើយថ្ងៃណាមួយ វាក៏នឹងរលាយបាត់ត្រឡប់ទៅសមុទ្រវិញដែរ។",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Backdrop — granite strata + magma glow at the bottom
 * ══════════════════════════════════════════════════════════════════════════ */

function BackdropStrata() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {/* Vertical magma gradient: stone at top, deep red toward bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-red-950/70" />
      {/* Horizontal rock-strata lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 38px, rgba(255,255,255,0.6) 38px, rgba(255,255,255,0.6) 39px)",
        }}
      />
      {/* Magma glow at the bottom */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[120%] h-96 bg-orange-600/25 blur-3xl rounded-full" />
      {/* Snowy peak hint at the top corners */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-stone-100/5 blur-3xl rounded-full" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-stone-100/5 blur-3xl rounded-full" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Shared: section header with eyebrow + bilingual title
 * ══════════════════════════════════════════════════════════════════════════ */

function SectionHeader({
  index,
  Icon,
  eyebrowEn,
  eyebrowKh,
  titleEn,
  titleKh,
  kh,
}: {
  index: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  eyebrowEn: string;
  eyebrowKh: string;
  titleEn: string;
  titleKh: string;
  kh: boolean;
}) {
  return (
    <div className="mb-5">
      <div
        className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400/90 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
      >
        <span className="text-stone-500">{index}</span>
        <Icon className="w-3.5 h-3.5" aria-hidden />
        <span>{kh ? eyebrowKh : eyebrowEn}</span>
      </div>
      <h2
        className={`font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
      >
        {kh ? titleKh : titleEn}
      </h2>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * CARD 1 — Magma vs. Lava
 * ══════════════════════════════════════════════════════════════════════════ */

function Card1MagmaVsLava({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, khh: string) => string;
}) {
  return (
    <section
      data-testid="card-magma-lava"
      className="rounded-3xl border border-stone-700/70 bg-gradient-to-br from-stone-900/90 to-stone-950/90 backdrop-blur shadow-2xl p-5 sm:p-7 mb-8"
    >
      <SectionHeader
        index="01"
        Icon={Flame}
        eyebrowEn="The Same Substance, Two Names"
        eyebrowKh="សារធាតុដូចគ្នា ឈ្មោះពីរ"
        titleEn="Magma vs. Lava"
        titleKh="ម៉ាកម៉ា និងកម្អែលភ្នំភ្លើង"
        kh={kh}
      />

      {/* Two-column comparison: Magma (underground) vs Lava (surface) */}
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        {/* Magma column */}
        <div className="rounded-2xl border-2 border-red-900/60 bg-gradient-to-b from-stone-900 to-red-950/60 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Layers
              className="w-5 h-5 text-red-400"
              aria-hidden
            />
            <h3
              className={`font-display text-xl font-extrabold text-red-200 ${kh ? "font-khmer" : ""}`}
            >
              {t("Magma", "ម៉ាកម៉ា")}
            </h3>
            <span className="ml-auto text-[10px] font-mono uppercase tracking-widest text-red-400/80">
              {t("UNDERGROUND", "ក្នុងផែនដី")}
            </span>
          </div>
          <p
            className={`text-sm sm:text-base text-stone-300 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}
          >
            {t(
              "Molten rock stored beneath the Earth's surface, trapped under enormous pressure inside chambers in the crust and upper mantle.",
              "ថ្មរលាយដែលផ្ទុកនៅក្រោមផ្ទៃផែនដី ជាប់ជំពាក់ក្រោមសម្ពាធដ៏ខ្លាំង នៅក្នុងបន្ទប់ផ្សេងៗខាងក្នុងសំបក និងផ្នែកខាងលើនៃអាវរង។",
            )}
          </p>
        </div>

        {/* Lava column */}
        <div className="rounded-2xl border-2 border-amber-700/60 bg-gradient-to-b from-stone-900 to-amber-950/60 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Flame
              className="w-5 h-5 text-amber-400"
              aria-hidden
            />
            <h3
              className={`font-display text-xl font-extrabold text-amber-200 ${kh ? "font-khmer" : ""}`}
            >
              {t("Lava", "កម្អែលភ្នំភ្លើង")}
            </h3>
            <span className="ml-auto text-[10px] font-mono uppercase tracking-widest text-amber-400/80">
              {t("ON THE SURFACE", "នៅលើផ្ទៃ")}
            </span>
          </div>
          <p
            className={`text-sm sm:text-base text-stone-300 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}
          >
            {t(
              "The exact same molten rock — but after it has broken through the surface and is flowing in the open air. Same substance, different location.",
              "ថ្មរលាយដូចគ្នាបេះបិទ — ប៉ុន្តែបន្ទាប់ពីវាបានផ្ទុះចេញពីផ្ទៃ ហើយហូរនៅលើខ្យល់ខាងក្រៅ។ សារធាតុដូចគ្នា ទីតាំងផ្សេងគ្នា។",
            )}
          </p>
        </div>
      </div>

      {/* The Distinction callout */}
      <div className="rounded-xl border border-stone-700/70 bg-stone-950/60 p-4 mb-5">
        <div
          className={`text-[10px] font-mono uppercase tracking-[0.25em] text-stone-400 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
        >
          {t("The Distinction", "ភាពខុសគ្នា")}
        </div>
        <p
          className={`text-sm sm:text-base text-stone-200 ${kh ? "font-khmer text-base leading-loose" : "leading-relaxed"}`}
        >
          {t(
            "Magma and lava are the same substance — molten rock — just in different locations. The moment magma breaks through the crust into the open air, scientists rename it lava.",
            "ម៉ាកម៉ា និងកម្អែលភ្នំភ្លើងគឺជាសារធាតុដូចគ្នាបេះបិទ — ថ្មរលាយ — គ្រាន់តែនៅទីតាំងផ្សេងគ្នា។ នៅពេលដែលម៉ាកម៉ាផ្ទុះចេញពីសំបកមកលើខ្យល់ខាងក្រៅ អ្នកវិទ្យាសាស្ត្រប្តូរឈ្មោះវាទៅជាកម្អែលភ្នំភ្លើង។",
          )}
        </p>
      </div>

      {/* Composition */}
      <div className="rounded-xl border border-amber-700/40 bg-amber-950/20 p-4">
        <div
          className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
        >
          <Thermometer className="w-3.5 h-3.5" aria-hidden />
          {t("Composition", "សមាសភាព")}
        </div>
        <p
          className={`text-sm sm:text-base text-stone-200 mb-3 ${kh ? "font-khmer text-base leading-loose" : "leading-relaxed"}`}
        >
          {t(
            "Both magma and lava are a hot 'soup' of silicate minerals (silicon and oxygen — the same family that builds beach sand and quartz crystals) mixed with dissolved gases trapped under immense pressure.",
            "ទាំងម៉ាកម៉ា និងកម្អែលភ្នំភ្លើងគឺជា «ស៊ុប» ក្តៅនៃសារធាតុរ៉ែស៊ីលីកាត (ស៊ីលីស្យូម និងអុកស៊ីសែន — ត្រកូលដូចគ្នាដែលបង្កើតខ្សាច់សមុទ្រ និងគ្រីស្តាល់កួតស្ថ៍) លាយជាមួយឧស្ម័នដែលរលាយ ជាប់ក្រោមសម្ពាធដ៏ខ្លាំង។",
          )}
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-stone-800/80 border border-stone-700/80 text-stone-200 font-mono">
            SiO₂ {t("(silica)", "(ស៊ីលីកា)")}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-blue-200 font-mono">
            H₂O {t("(water vapor)", "(ចំហាយទឹក)")}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-stone-800/80 border border-stone-700/80 text-stone-200 font-mono">
            CO₂ {t("(carbon dioxide)", "(កាបូនឌីអុកស៊ីត)")}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-yellow-950/60 border border-yellow-800/60 text-yellow-200 font-mono">
            SO₂ {t("(sulfur dioxide)", "(ស៊ុលហ្វួឌីអុកស៊ីត)")}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * CARD 2 — Convection Currents
 * ══════════════════════════════════════════════════════════════════════════ */

function Card2Convection({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, khh: string) => string;
}) {
  return (
    <section
      data-testid="card-convection"
      className="rounded-3xl border border-stone-700/70 bg-gradient-to-br from-stone-900/90 to-stone-950/90 backdrop-blur shadow-2xl p-5 sm:p-7 mb-8"
    >
      <SectionHeader
        index="02"
        Icon={Activity}
        eyebrowEn="The Engine of the Planet"
        eyebrowKh="ម៉ាស៊ីននៃភពផែនដី"
        titleEn="Convection Currents"
        titleKh="ចរន្តកម្តៅក្នុងផែនដី"
        kh={kh}
      />

      <div className="grid md:grid-cols-2 gap-5 items-stretch">
        {/* Diagram column */}
        <div className="rounded-2xl border border-red-900/50 bg-stone-950/70 p-4 flex flex-col items-center">
          <ConvectionDiagram />
          <p
            className={`mt-3 text-xs sm:text-sm text-stone-400 text-center ${kh ? "font-khmer text-sm sm:text-base leading-loose" : ""}`}
          >
            {t(
              "Cross-section of Earth: hot mantle rises (red), cools near the crust, sinks back down (blue) — a slow circular conveyor belt.",
              "ផ្នែកកាត់នៃផែនដី៖ អាវរងក្តៅឡើងលើ (ក្រហម) ត្រជាក់នៅជិតសំបក ធ្លាក់ចុះវិញ (ខៀវ) — ខ្សែបង្វិលរង្វង់យឺតៗ។",
            )}
          </p>
        </div>

        {/* Text column */}
        <div className="flex flex-col gap-4">
          {/* The boiling pot analogy */}
          <div className="rounded-2xl border-2 border-red-800/60 bg-gradient-to-b from-stone-900 to-red-950/40 p-5">
            <div
              className={`text-[10px] font-mono uppercase tracking-[0.25em] text-red-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            >
              {t("How It Works", "របៀបដំណើរការ")}
            </div>
            <h3
              className={`font-display text-lg font-extrabold text-white mb-2 ${kh ? "font-khmer" : ""}`}
            >
              {t("The Boiling Pot Analogy", "ការប្រៀបធៀបនឹងឆ្នាំងពុះ")}
            </h3>
            <p
              className={`text-sm sm:text-base text-stone-200 ${kh ? "font-khmer text-base leading-loose" : "leading-relaxed"}`}
            >
              {t(
                "The Earth's core is incredibly hot — about 6,000°C, as hot as the surface of the Sun. This heat causes the liquid mantle above it to rise toward the surface, slowly cool against the crust, and sink back down. The same circular motion you see in a pot of boiling water — only on a planetary scale.",
                "ស្នូលផែនដីក្តៅខ្លាំងណាស់ — ប្រហែល ៦ ០០០°C ក្តៅស្មើនឹងផ្ទៃព្រះអាទិត្យ។ កម្តៅនេះបណ្តាលឱ្យអាវរងរាវខាងលើវាឡើងឡើងទៅផ្ទៃ ត្រជាក់យឺតៗប៉ះនឹងសំបក ហើយធ្លាក់ចុះវិញ។ ចលនារង្វង់ដូចគ្នាដែលអ្នកឃើញក្នុងឆ្នាំងទឹកពុះ — តែនៅខ្នាតភពទាំងមូល។",
              )}
            </p>
          </div>

          {/* The result */}
          <div className="rounded-2xl border-2 border-amber-700/60 bg-gradient-to-b from-stone-900 to-amber-950/40 p-5">
            <div
              className={`text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            >
              {t("The Result", "លទ្ធផល")}
            </div>
            <h3
              className={`font-display text-lg font-extrabold text-white mb-2 ${kh ? "font-khmer" : ""}`}
            >
              {t("A Planet-Sized Conveyor Belt", "ខ្សែបង្វិលធំស្មើភព")}
            </h3>
            <p
              className={`text-sm sm:text-base text-stone-200 ${kh ? "font-khmer text-base leading-loose" : "leading-relaxed"}`}
            >
              {t(
                "This constant motion drags the tectonic plates floating on top of the mantle. When two plates crash together, they crumple upward and form mountains. When two plates pull apart, magma rushes up to fill the gap — and we get volcanoes.",
                "ចលនាជាប់ជានិច្ចនេះអូសបន្ទះតិចតូនិកដែលអណ្តែតនៅខាងលើអាវរង។ នៅពេលបន្ទះពីរទង្គិចគ្នា ពួកវាខូចទ្រង់ឡើងលើ ហើយបង្កើតភ្នំ។ នៅពេលបន្ទះពីរទាញដាច់ពីគ្នា ម៉ាកម៉ាប្រញាប់ឡើងបំពេញចន្លោះ — ហើយយើងទទួលបានភ្នំភ្លើង។",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Convection diagram (SVG) ─────────────────────────────────────────── */
function ConvectionDiagram() {
  // Simple cross-section: outer crust ring, mantle ring, glowing core,
  // with two pairs of curved arrows showing rising hot + sinking cool flow.
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full max-w-[320px] h-auto"
      role="img"
      aria-label="Earth cross-section showing hot mantle rising and cool material sinking"
    >
      <defs>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
        <radialGradient id="mantleGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#451a03" stopOpacity="0.95" />
        </radialGradient>
        <linearGradient id="riseRed" x1="0" y1="100%" x2="0" y2="0%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="sinkBlue" x1="0" y1="0%" x2="0" y2="100%">
          <stop offset="0%" stopColor="#7f1d1d" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>

      {/* Mantle ring */}
      <circle cx="160" cy="120" r="100" fill="url(#mantleGrad)" />
      {/* Crust band (granite grey) */}
      <circle
        cx="160"
        cy="120"
        r="100"
        fill="none"
        stroke="#78716c"
        strokeWidth="8"
      />
      {/* Snowy mountain peaks on top of crust */}
      <polygon points="120,28 130,42 140,28 150,42 160,28 170,42 180,28" fill="#f1f5f9" opacity="0.9" />
      {/* Core */}
      <circle cx="160" cy="120" r="34" fill="url(#coreGrad)" />
      <circle cx="160" cy="120" r="34" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />

      {/* Convection arrows: rising hot (left side) */}
      <path
        d="M 120 168 Q 100 120 110 70"
        stroke="url(#riseRed)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <polygon points="106,72 114,72 110,60" fill="#fde68a" />

      {/* Sinking cool (left to center top) */}
      <path
        d="M 110 70 Q 130 50 158 80"
        stroke="url(#sinkBlue)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Rising hot (right side) */}
      <path
        d="M 200 168 Q 220 120 210 70"
        stroke="url(#riseRed)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <polygon points="206,72 214,72 210,60" fill="#fde68a" />

      {/* Sinking cool (right to center top) */}
      <path
        d="M 210 70 Q 190 50 162 80"
        stroke="url(#sinkBlue)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Labels */}
      <text x="160" y="124" textAnchor="middle" fill="#fff7ed" fontSize="10" fontWeight="700" fontFamily="monospace">
        CORE
      </text>
      <text x="160" y="138" textAnchor="middle" fill="#fde68a" fontSize="8" fontFamily="monospace">
        6,000°C
      </text>
      <text x="60" y="120" fill="#fca5a5" fontSize="9" fontFamily="monospace" fontWeight="700">
        RISE
      </text>
      <text x="245" y="120" fill="#fca5a5" fontSize="9" fontFamily="monospace" fontWeight="700">
        RISE
      </text>
      <text x="160" y="20" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontFamily="monospace">
        CRUST · SINK
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * CARD 3 — Yellowstone: The Sleeping Giant
 * ══════════════════════════════════════════════════════════════════════════ */

function Card3Yellowstone({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, khh: string) => string;
}) {
  return (
    <section
      data-testid="card-yellowstone"
      className="rounded-3xl border border-amber-700/40 bg-gradient-to-br from-stone-900/90 via-amber-950/30 to-red-950/40 backdrop-blur shadow-2xl p-5 sm:p-7 mb-8"
    >
      <SectionHeader
        index="03"
        Icon={AlertTriangle}
        eyebrowEn="The Sleeping Giant"
        eyebrowKh="យក្សដែលកំពុងដេក"
        titleEn="Yellowstone: A Supervolcano in Disguise"
        titleKh="យ៉ូឡូស្តូន៖ ភ្នំភ្លើងយក្សក្នុងរូបភាពឧទ្យាន"
        kh={kh}
      />

      <div className="grid md:grid-cols-5 gap-5 items-start">
        {/* Text column */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="rounded-2xl border-2 border-amber-700/60 bg-stone-950/60 p-5">
            <h3
              className={`font-display text-lg font-extrabold text-amber-200 mb-2 flex items-center gap-2 ${kh ? "font-khmer" : ""}`}
            >
              <Flame className="w-5 h-5" aria-hidden />
              {t("The Supervolcano", "ភ្នំភ្លើងយក្ស")}
            </h3>
            <p
              className={`text-sm sm:text-base text-stone-200 ${kh ? "font-khmer text-base leading-loose" : "leading-relaxed"}`}
            >
              {t(
                "Yellowstone National Park in the United States isn't just a beautiful park full of geysers and bison — it sits directly on top of a massive 'Hotspot,' a column of unusually hot mantle that has been burning a hole through the North American plate for millions of years.",
                "ឧទ្យានជាតិយ៉ូឡូស្តូននៅសហរដ្ឋអាមេរិក មិនមែនគ្រាន់តែជាឧទ្យានស្អាតៗពេញដោយប្រភពទឹកពុះ និងគោព្រៃនោះទេ — វាស្ថិតនៅខាងលើ «ចំណុចក្តៅ» ដ៏ធំ ដែលជាសសរនៃអាវរងក្តៅខុសប្រក្រតី កំពុងតែដុតរន្ធទម្លុះបន្ទះអាមេរិកខាងជើងអស់រាប់លានឆ្នាំ។",
              )}
            </p>
          </div>

          <div className="rounded-2xl border-2 border-red-800/60 bg-stone-950/60 p-5">
            <h3
              className={`font-display text-lg font-extrabold text-red-200 mb-2 flex items-center gap-2 ${kh ? "font-khmer" : ""}`}
            >
              <Activity className="w-5 h-5" aria-hidden />
              {t("The Scale", "ខ្នាត")}
            </h3>
            <p
              className={`text-sm sm:text-base text-stone-200 ${kh ? "font-khmer text-base leading-loose" : "leading-relaxed"}`}
            >
              {t(
                "Unlike a normal cone-shaped volcano, Yellowstone is a Caldera — a giant crater more than 70 km wide, formed when a previous massive eruption emptied the magma chamber and the ground above collapsed inward. If it erupted today at full strength, it would cover roughly half of North America in a thick layer of volcanic ash.",
                "មិនដូចភ្នំភ្លើងធម្មតាមានរូបទ្រង់សាជីទេ យ៉ូឡូស្តូនជា «កាល់ដេរ៉ា» — ផ្ទៃរណ្តៅយក្សទទឹងជាង ៧០ គីឡូម៉ែត្រ បង្កើតឡើងនៅពេលការផ្ទុះមហាសាលពីមុនបានបញ្ចេញម៉ាកម៉ាអស់ ហើយដីខាងលើបានរលំចូលក្នុង។ បើវាផ្ទុះថ្ងៃនេះពេញកម្លាំង វានឹងគ្របដណ្តប់ប្រហែលពាក់កណ្តាលនៃអាមេរិកខាងជើង ដោយផេះភ្នំភ្លើងដ៏ក្រាស់។",
              )}
            </p>
          </div>
        </div>

        {/* Stat callouts */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <StatBox
            value="~70 km"
            labelEn="Caldera width"
            labelKh="ទទឹងកាល់ដេរ៉ា"
            tone="amber"
            kh={kh}
          />
          <StatBox
            value="640,000"
            labelEn="Years since last super-eruption"
            labelKh="ឆ្នាំចាប់តាំងពីការផ្ទុះលើកចុងក្រោយ"
            tone="red"
            kh={kh}
          />
          <StatBox
            value="~1,000 km³"
            labelEn="Magma chamber volume"
            labelKh="មាឌបន្ទប់ម៉ាកម៉ា"
            tone="stone"
            kh={kh}
          />
          <div className="rounded-xl border border-amber-700/40 bg-amber-950/30 p-3 text-xs sm:text-sm text-amber-100">
            <div
              className={`flex items-start gap-2 ${kh ? "font-khmer text-sm sm:text-base leading-loose" : "leading-relaxed"}`}
            >
              <AlertTriangle
                className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400"
                aria-hidden
              />
              <span>
                {t(
                  "Note: Geologists monitor it daily. A major eruption is not predicted in the near future — but the science of supervolcanoes is exactly why we keep watching.",
                  "ចំណាំ៖ អ្នកធរណីសាស្ត្រត្រួតពិនិត្យវាប្រចាំថ្ងៃ។ ការផ្ទុះធំមួយមិនត្រូវបានព្យាករនឹងកើតឡើងក្នុងពេលឆាប់ៗនេះទេ — ប៉ុន្តែវិទ្យាសាស្ត្រនៃភ្នំភ្លើងយក្សគឺជាមូលហេតុដែលយើងបន្តតាមដាន។",
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBox({
  value,
  labelEn,
  labelKh,
  tone,
  kh,
}: {
  value: string;
  labelEn: string;
  labelKh: string;
  tone: "amber" | "red" | "stone";
  kh: boolean;
}) {
  const palette = {
    amber: "border-amber-700/60 bg-amber-950/40 text-amber-200",
    red: "border-red-800/60 bg-red-950/40 text-red-200",
    stone: "border-stone-700/60 bg-stone-900/60 text-stone-200",
  }[tone];
  return (
    <div className={`rounded-xl border-2 ${palette} p-4`}>
      <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-0.5">
        {value}
      </div>
      <div
        className={`text-xs sm:text-sm opacity-90 ${kh ? "font-khmer text-sm sm:text-base leading-loose" : ""}`}
      >
        {kh ? labelKh : labelEn}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * CARD 4 — Giants of the World
 * ══════════════════════════════════════════════════════════════════════════ */

function Card4GiantsOfTheWorld({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, khh: string) => string;
}) {
  type Giant = {
    id: string;
    nameEn: string;
    nameKh: string;
    regionEn: string;
    regionKh: string;
    headlineEn: string;
    headlineKh: string;
    bodyEn: string;
    bodyKh: string;
    Icon: React.ComponentType<{
      className?: string;
      "aria-hidden"?: boolean;
    }>;
    accent: string;
  };

  const giants: Giant[] = [
    {
      id: "himalayas",
      nameEn: "The Himalayas",
      nameKh: "ភ្នំហិមាល័យ",
      regionEn: "Asia",
      regionKh: "អាស៊ី",
      headlineEn: "Two continents in slow-motion collision",
      headlineKh: "ទ្វីបពីរទង្គិចគ្នាយឺតៗ",
      bodyEn:
        "Created when the Indian continent crashed into Asia about 50 million years ago and is still pushing north. Home to Mt. Everest (8,849 m) — the highest point on Earth, growing taller by a few millimeters every year.",
      bodyKh:
        "បង្កើតឡើងនៅពេលទ្វីបឥណ្ឌាបានទង្គិចទៅអាស៊ីប្រហែល ៥០ លានឆ្នាំមុន ហើយនៅតែបន្តរុញទៅខាងជើង។ ជាលំនៅរបស់ភ្នំអេវើរេស (៨ ៨៤៩ ម៉ែត្រ) — ចំណុចខ្ពស់បំផុតលើផែនដី កំពុងកើនកម្ពស់ប៉ុន្មានមីលីម៉ែត្ររាល់ឆ្នាំ។",
      Icon: Snowflake,
      accent: "from-cyan-700/40 to-stone-900/80 border-cyan-700/50",
    },
    {
      id: "andes",
      nameEn: "The Andes",
      nameKh: "ភ្នំអង់ដេស",
      regionEn: "South America",
      regionKh: "អាមេរិកខាងត្បូង",
      headlineEn: "The longest mountain range on Earth",
      headlineKh: "ជួរភ្នំវែងបំផុតនៅលើផែនដី",
      bodyEn:
        "More than 7,000 km long, built by an ocean plate sliding underneath the South American continental plate — a process called subduction. The diving plate melts as it descends, feeding a chain of active volcanoes along the spine of the continent.",
      bodyKh:
        "វែងជាង ៧ ០០០ គីឡូម៉ែត្រ សាងសង់ដោយបន្ទះមហាសមុទ្ររអិលចូលក្រោមបន្ទះទ្វីបអាមេរិកខាងត្បូង — ដំណើរការមួយហៅថា «សាប់ឌុចស្យុង»។ បន្ទះដែលធ្លាក់ចុះរលាយពេលធ្លាក់ចុះ ផ្តល់អាហារដល់ជួរភ្នំភ្លើងសកម្មនៅខ្នងទ្វីប។",
      Icon: Waves,
      accent: "from-emerald-800/40 to-stone-900/80 border-emerald-700/50",
    },
    {
      id: "rockies",
      nameEn: "The Rockies",
      nameKh: "ភ្នំរ៉ូគី",
      regionEn: "North America",
      regionKh: "អាមេរិកខាងជើង",
      headlineEn: "A 4,800 km granite spine",
      headlineKh: "ខ្នងថ្មក្រានីត ៤ ៨០០ គីឡូម៉ែត្រ",
      bodyEn:
        "A massive range stretching from Canada down to New Mexico, carved by an unusual burst of tectonic activity 80–55 million years ago. The Pacific plate didn't dive steeply but slid almost flat under the continent — squeezing the rock upward far inland.",
      bodyKh:
        "ជួរភ្នំដ៏ធំលាតសន្ធឹងពីប្រទេសកាណាដាចុះមកញូម៉ិកស៊ិកូ ឆ្លាក់ដោយចលនាតិចតូនិកខុសប្រក្រតីកាលពី ៨០–៥៥ លានឆ្នាំមុន។ បន្ទះប៉ាស៊ីហ្វិកមិនបានធ្លាក់ចុះស្តួចទេ ប៉ុន្តែរអិលស្ទើរតែសំប៉ែតក្រោមទ្វីប — ច្របាច់ថ្មឡើងលើដ៏ឆ្ងាយចូលក្នុងដី។",
      Icon: Triangle,
      accent: "from-stone-700/50 to-stone-900/80 border-stone-600/50",
    },
  ];

  return (
    <section
      data-testid="card-giants"
      className="rounded-3xl border border-stone-700/70 bg-gradient-to-br from-stone-900/90 to-stone-950/90 backdrop-blur shadow-2xl p-5 sm:p-7 mb-8"
    >
      <SectionHeader
        index="04"
        Icon={Globe}
        eyebrowEn="Three Mountain Ranges, Three Stories"
        eyebrowKh="ជួរភ្នំបី រឿងបី"
        titleEn="Giants of the World"
        titleKh="ភ្នំយក្សៗនៅលើពិភពលោក"
        kh={kh}
      />

      <div className="grid md:grid-cols-3 gap-4">
        {giants.map((g) => (
          <article
            key={g.id}
            data-testid={`giant-${g.id}`}
            className={`rounded-2xl border-2 bg-gradient-to-b ${g.accent} p-5 flex flex-col`}
          >
            <div className="flex items-center gap-2 mb-2">
              <g.Icon className="w-5 h-5 text-white" aria-hidden />
              <span
                className={`text-[10px] font-mono uppercase tracking-widest text-stone-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                {kh ? g.regionKh : g.regionEn}
              </span>
            </div>
            <h3
              className={`font-display text-xl font-extrabold text-white mb-1 ${kh ? "font-khmer" : ""}`}
            >
              {kh ? g.nameKh : g.nameEn}
            </h3>
            <p
              className={`text-sm font-semibold text-white/90 mb-2 ${kh ? "font-khmer text-base leading-loose" : ""}`}
            >
              {kh ? g.headlineKh : g.headlineEn}
            </p>
            <p
              className={`text-xs sm:text-sm text-stone-200/90 ${kh ? "font-khmer text-sm sm:text-base leading-loose" : "leading-relaxed"}`}
            >
              {kh ? g.bodyKh : g.bodyEn}
            </p>
          </article>
        ))}
      </div>

      {/* Tectonic-mechanism legend */}
      <div className="mt-5 grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
        <div className="rounded-xl border border-stone-700/70 bg-stone-950/60 p-3 flex items-start gap-2">
          <ArrowUp className="w-4 h-4 mt-0.5 text-amber-400" aria-hidden />
          <span
            className={`text-stone-200 ${kh ? "font-khmer text-sm sm:text-base leading-loose" : "leading-relaxed"}`}
          >
            <strong className="text-white">
              {t("Collision", "ការទង្គិច")}
            </strong>{" "}
            —{" "}
            {t(
              "two continental plates crash and crumple upward (Himalayas).",
              "បន្ទះទ្វីបពីរទង្គិចគ្នា ហើយខូចទ្រង់ឡើងលើ (ហិមាល័យ)។",
            )}
          </span>
        </div>
        <div className="rounded-xl border border-stone-700/70 bg-stone-950/60 p-3 flex items-start gap-2">
          <ArrowDown className="w-4 h-4 mt-0.5 text-emerald-400" aria-hidden />
          <span
            className={`text-stone-200 ${kh ? "font-khmer text-sm sm:text-base leading-loose" : "leading-relaxed"}`}
          >
            <strong className="text-white">
              {t("Subduction", "សាប់ឌុចស្យុង")}
            </strong>{" "}
            —{" "}
            {t(
              "ocean plate slides under continental plate, melting as it dives (Andes).",
              "បន្ទះមហាសមុទ្ររអិលចូលក្រោមបន្ទះទ្វីប រលាយពេលធ្លាក់ចុះ (អង់ដេស)។",
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
