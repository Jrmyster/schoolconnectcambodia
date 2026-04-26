import { Link } from "wouter";
import {
  ArrowLeft,
  Snowflake,
  Wind,
  CloudOff,
  Mountain,
  Globe2,
  Microscope,
  Telescope,
  Ban,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Antarctica: The Frozen Desert
//  អង់តាក់ទិក៖ វាលខ្សាច់ទឹកកក
//
//  A bilingual EN/Khmer Earth-extremes module living at
//  /study-center/antarctica. Three cards explain the geography & weather
//  paradox, the Antarctic Treaty + scientific use, and the 6-month
//  daylight / 6-month night cycle. Aesthetic: glacial whites, deep
//  ocean blues, aurora greens.
// ════════════════════════════════════════════════════════════════════════════

export function AntarcticaScience() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-950 via-[#04122b] to-slate-950 text-white relative overflow-hidden"
      data-testid="antarctica-science"
    >
      <Snowfield />
      <Aurora />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-cyan-200/80 hover:text-cyan-100 transition-colors mb-6"
          data-testid="link-back-to-home"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          <span>
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </span>
        </Link>

        {/* Hero */}
        <header
          className="relative rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-[#031428] to-blue-950/60 p-6 sm:p-8 overflow-hidden"
          aria-labelledby="antarctica-title"
        >
          <FrostGrid />
          <div className="relative">
            <div
              className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300/90 mb-3 ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              <Snowflake className="w-3.5 h-3.5" aria-hidden />
              <span>{t("Study Center / Earth Extremes", "មជ្ឈមណ្ឌលសិក្សា / ភាពខ្លាំងក្លានៃផែនដី")}</span>
            </div>

            <h1
              id="antarctica-title"
              className="font-display text-3xl sm:text-5xl font-bold leading-tight"
              data-testid="antarctica-title-en"
            >
              Antarctica:{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-white to-emerald-200 bg-clip-text text-transparent">
                The Frozen Desert
              </span>
            </h1>
            <p
              className="font-khmer mt-2 text-lg sm:text-2xl text-cyan-100/90 leading-loose"
              data-testid="antarctica-title-kh"
            >
              អង់តាក់ទិក៖ វាលខ្សាច់ទឹកកក
            </p>

            <p className="mt-5 text-sm sm:text-base text-white/75 leading-relaxed max-w-3xl">
              {t(
                "A continent of ice the size of the United States and Mexico combined — colder than your freezer by a factor of ten, drier than the Sahara, ruled by no nation, and used only for science.",
                "ទ្វីបទឹកកកមួយដែលមានទំហំប៉ុនសហរដ្ឋអាមេរិក និងម៉ិចស៊ិករួមគ្នា — ត្រជាក់ជាងទូរស្ពានរបស់អ្នក ១០ ដង ស្ងួតជាងវាលខ្សាច់សាហារ៉ា គ្មានជាតិសាសន៍ណាគ្រប់គ្រង និងប្រើសម្រាប់តែវិទ្យាសាស្ត្រ។",
              )}
            </p>

            <div
              className={`mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1.5 font-mono text-[11px] sm:text-xs text-cyan-100 tracking-wide ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              <span>{t("AVG ICE", "ទឹកកកមធ្យម")}: 2 km</span>
              <span className="text-cyan-400/60">·</span>
              <span>{t("FRESH WATER", "ទឹកសាប")}: 70%</span>
              <span className="text-cyan-400/60">·</span>
              <span>{t("OWNERS", "ម្ចាស់")}: 0</span>
            </div>
          </div>
        </header>

        {/* Cards */}
        <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <IceDesertCard kh={kh} t={t} />
          <PeaceAndScienceCard kh={kh} t={t} />
          <MidnightSunCard kh={kh} t={t} />
        </div>

        {/* Closing thought */}
        <div
          className="relative mt-7 rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950 px-5 sm:px-7 py-5 overflow-hidden"
          data-testid="antarctica-footer"
        >
          <div className="relative flex items-start gap-3">
            <Sparkles
              className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5"
              aria-hidden
            />
            <div>
              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                {t(
                  "Antarctica belongs to no one — and that is exactly why it belongs to everyone.",
                  "អង់តាក់ទិកមិនជារបស់អ្នកណាម្នាក់ឡើយ — ហើយនោះគឺជាហេតុផលដែលវាជារបស់មនុស្សគ្រប់គ្នា។",
                )}
              </p>
              <p className="font-khmer mt-1 text-sm text-emerald-200/85 leading-loose">
                ទ្វីបនៃសន្តិភាព សម្រាប់មនុស្សជាតិទាំងមូល។
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AntarcticaScience;

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 — The Ice Desert
// ════════════════════════════════════════════════════════════════════════════

function IceDesertCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, k: string) => string;
}) {
  return (
    <article
      className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-[#03152e] to-blue-950/70 p-5 sm:p-6 shadow-[0_0_40px_rgba(34,211,238,0.06)]"
      data-testid="antarctica-card-ice-desert"
    >
      <FrostGrid />

      <CardHeader
        en="The Ice Desert"
        kh="វាលខ្សាច់ទឹកកក"
        index="01"
        accent="text-cyan-200"
        Icon={Mountain}
      />

      <div className="relative mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Geography */}
        <div className="space-y-2">
          <Subhead en="The Geography" kh="ភូមិសាស្ត្រ" accent="text-cyan-200" />
          <p className="text-sm sm:text-base text-white/85 leading-relaxed">
            {t(
              "Antarctica is an entire continent buried under a continuous ice sheet. On average it is ",
              "អង់តាក់ទិកគឺជាទ្វីបទាំងមូលដែលត្រូវកប់ក្រោមផ្ទាំងទឹកកកជាប់ៗគ្នា។ ជាមធ្យម វាមានកំរាស់ ",
            )}
            <Strong>{t("2 kilometers thick", "២ គីឡូម៉ែត្រ")}</Strong>
            {t(
              " — in some places more than 4 km — and locks up roughly ",
              " — នៅកន្លែងខ្លះលើសពី ៤ គីឡូម៉ែត្រ — ហើយវាស្តុកទុកប្រហែល ",
            )}
            <Strong>{t("70% of all the planet's fresh water", "៧០% នៃទឹកសាបទាំងអស់នៃផែនដី")}</Strong>.
          </p>
          <p className="font-khmer text-xs sm:text-sm text-white/65 leading-loose">
            ទ្វីបទាំងមូលនៅក្រោមផ្ទាំងទឹកកក កំរាស់ជាមធ្យម ២ គីឡូម៉ែត្រ ស្តុកទុក ៧០% នៃទឹកសាបរបស់ផែនដី។
          </p>

          <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-white/75">
            <Stat
              en="Continent area"
              kh="ផ្ទៃដី"
              value="≈ 14,200,000 km²"
            />
            <Stat
              en="Avg ice thickness"
              kh="កំរាស់ទឹកកកមធ្យម"
              value="≈ 2,000 m"
            />
            <Stat
              en="Share of Earth's fresh water"
              kh="ភាគរយនៃទឹកសាបផែនដី"
              value="≈ 70%"
            />
          </ul>
        </div>

        {/* Weather paradox */}
        <div className="space-y-2 rounded-xl border border-cyan-400/30 bg-cyan-500/5 px-4 py-4">
          <Subhead en="The Weather" kh="អាកាសធាតុ" accent="text-cyan-100" />
          <p className="text-sm sm:text-base text-white/85 leading-relaxed">
            {t(
              "It is the ",
              "វាគឺជាទ្វីប ",
            )}
            <Strong>{t("coldest, windiest, and driest continent", "ត្រជាក់បំផុត ខ្យល់ខ្លាំងបំផុត និងស្ងួតបំផុត")}</Strong>
            {t(
              " on Earth. The lowest natural temperature ever recorded — ",
              " នៅលើផែនដី។ សីតុណ្ហភាពធម្មជាតិទាបបំផុតដែលធ្លាប់កត់ត្រាបាន — ",
            )}
            <Strong>−89.2°C</Strong>
            {t(
              " — was measured here.",
              " — ត្រូវបានវាស់នៅទីនេះ។",
            )}
          </p>

          <div className="mt-3 rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-3 py-3">
            <p
              className={`text-[11px] uppercase tracking-[0.2em] text-cyan-100/85 mb-1 ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {t("The Paradox", "ភាពផ្ទុយគ្នា")}
            </p>
            <p className="text-sm text-white/90 leading-relaxed">
              {t(
                "Antarctica is technically the world's largest desert. It almost never rains or snows — most inland regions get less than ",
                "តាមនិយមន័យ អង់តាក់ទិកគឺជាវាលខ្សាច់ធំបំផុតនៅលើពិភពលោក។ វាស្ទើរតែមិនដែលភ្លៀង ឬធ្លាក់ព្រិលឡើយ — តំបន់ខាងក្នុងភាគច្រើនទទួលបានតិចជាង ",
              )}
              <Strong>50 mm</Strong>
              {t(
                " of precipitation a year. The thick ice you see has just been ",
                " នៃទឹកភ្លៀងក្នុងមួយឆ្នាំ។ ទឹកកកក្រាស់ដែលអ្នកឃើញ គឺគ្រាន់តែជាការ ",
              )}
              <Strong>{t("piling up for millions of years", "បង្គរឡើងអស់រាប់លានឆ្នាំ")}</Strong>.
            </p>
            <p className="font-khmer text-xs text-cyan-100/80 leading-loose mt-1">
              វាលខ្សាច់ធំជាងគេ — មិនមែនដោយសារក្ដៅ តែដោយសារគ្មានភ្លៀង។
            </p>
          </div>

          <div className="mt-2 flex items-center gap-3 text-[11px] text-cyan-200/80 font-mono">
            <span className="inline-flex items-center gap-1">
              <Snowflake className="w-3 h-3" aria-hidden /> COLDEST
            </span>
            <span className="inline-flex items-center gap-1">
              <Wind className="w-3 h-3" aria-hidden /> WINDIEST
            </span>
            <span className="inline-flex items-center gap-1">
              <CloudOff className="w-3 h-3" aria-hidden /> DRIEST
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 — The Continent of Peace & Science
// ════════════════════════════════════════════════════════════════════════════

function PeaceAndScienceCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, k: string) => string;
}) {
  return (
    <article
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-[#06112a] to-blue-950/60 p-5 sm:p-6 shadow-[0_0_40px_rgba(56,189,248,0.06)]"
      data-testid="antarctica-card-peace-science"
    >
      <FrostGrid />

      <CardHeader
        en="The Continent of Peace & Science"
        kh="ទ្វីបនៃសន្តិភាព និងវិទ្យាសាស្ត្រ"
        index="02"
        accent="text-sky-200"
        Icon={Globe2}
      />

      <div className="relative mt-4 space-y-4">
        <Subhead en="Human Activity" kh="សកម្មភាពមនុស្ស" accent="text-sky-200" />
        <p className="text-sm sm:text-base text-white/85 leading-relaxed">
          {t(
            "In ",
            "នៅឆ្នាំ ",
          )}
          <Strong>1959</Strong>
          {t(
            ", twelve nations signed the ",
            " ប្រទេសចំនួន ១២ បានចុះហត្ថលេខាលើ ",
          )}
          <Strong>{t("Antarctic Treaty", "សន្ធិសញ្ញាអង់តាក់ទិក")}</Strong>
          {t(
            ". No single country owns Antarctica. Today more than 50 nations honor the treaty.",
            "។ គ្មានប្រទេសណាមួយជាម្ចាស់នៃអង់តាក់ទិកឡើយ។ បច្ចុប្បន្ននេះ ប្រទេសច្រើនជាង ៥០ គោរពតាមសន្ធិសញ្ញានេះ។",
          )}
        </p>

        <div className="rounded-xl border border-sky-400/30 bg-sky-500/5 px-4 py-4">
          <p
            className={`text-[11px] uppercase tracking-[0.2em] text-sky-100/85 mb-2 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("What is banned", "អ្វីដែលត្រូវហាមឃាត់")}
          </p>
          <ul className="space-y-2 text-sm text-white/85">
            <BanRow
              en="Military bases, weapons, and any military activity"
              kh="មូលដ្ឋានយោធា អាវុធ និងសកម្មភាពយោធាគ្រប់ប្រភេទ"
            />
            <BanRow
              en="Mineral and oil mining"
              kh="ការជីកយករ៉ែ និងប្រេង"
            />
            <BanRow
              en="Nuclear explosions and radioactive waste disposal"
              kh="ការផ្ទុះនុយក្លេអ៊ែរ និងការចោលកាកសំណល់វិទ្យុសកម្ម"
            />
          </ul>
        </div>

        <Subhead en="The Scientists" kh="អ្នកវិទ្យាសាស្ត្រ" accent="text-emerald-200" />
        <p className="text-sm sm:text-base text-white/85 leading-relaxed">
          {t(
            "Antarctica is dedicated entirely to scientific research. Across roughly 70 international research stations, ",
            "អង់តាក់ទិកត្រូវបានឧទ្ទិសទាំងស្រុងសម្រាប់ការស្រាវជ្រាវវិទ្យាសាស្ត្រ។ នៅតាមស្ថានីយស្រាវជ្រាវអន្តរជាតិប្រហែល ៧០ ",
          )}
          <Strong>{t("thousands of scientists", "អ្នកវិទ្យាសាស្ត្ររាប់ពាន់នាក់")}</Strong>
          {t(
            " live and work in extreme-weather conditions to study three big questions:",
            " រស់នៅ និងធ្វើការនៅក្នុងលក្ខខណ្ឌអាកាសធាតុធ្ងន់ធ្ងរ ដើម្បីសិក្សាសំណួរធំៗបី៖",
          )}
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <ResearchPill
            Icon={Snowflake}
            en="Climate Change"
            kh="ការប្រែប្រួលអាកាសធាតុ"
            descEn="Ice cores reveal Earth's air from 800,000 years ago."
            descKh="សន្នូលទឹកកកបង្ហាញខ្យល់នៃផែនដីពី ៨០០.០០០ ឆ្នាំមុន។"
          />
          <ResearchPill
            Icon={Telescope}
            en="Astronomy"
            kh="តារាសាស្ត្រ"
            descEn="Dry, clear skies make perfect telescope conditions."
            descKh="មេឃស្ងួត និងច្បាស់ បង្កើតលក្ខខណ្ឌល្អឥតខ្ចោះសម្រាប់តេឡេស្កុប។"
          />
          <ResearchPill
            Icon={Microscope}
            en="Biology"
            kh="ជីវវិទ្យា"
            descEn="Penguins, seals, krill, and microbes that thrive in ice."
            descKh="ភេនឃ្វីន សមុទ្រ សមុទ្រ និងមីក្រូប ដែលរស់ល្អក្នុងទឹកកក។"
          />
        </ul>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 — The Midnight Sun
// ════════════════════════════════════════════════════════════════════════════

function MidnightSunCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, k: string) => string;
}) {
  return (
    <article
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-[#0a1f3d] to-emerald-950/30 p-5 sm:p-6 shadow-[0_0_40px_rgba(16,185,129,0.08)]"
      data-testid="antarctica-card-midnight-sun"
    >
      <FrostGrid />

      <CardHeader
        en="The Midnight Sun"
        kh="ព្រះអាទិត្យកណ្ដាលអធ្រាត្រ"
        index="03"
        accent="text-emerald-200"
        Icon={Sun}
      />

      <div className="relative mt-4 space-y-4">
        <Subhead en="The Extreme Seasons" kh="រដូវកាលដ៏ខ្លាំងក្លា" accent="text-emerald-200" />
        <p className="text-sm sm:text-base text-white/85 leading-relaxed">
          {t(
            "The Earth spins on a tilted axis (23.5°). Because Antarctica sits at the very ",
            "ផែនដីវិលលើអ័ក្សដែលផ្អៀង (២៣,៥°)។ ដោយសារអង់តាក់ទិកស្ថិតនៅ ",
          )}
          <Strong>{t("bottom of the globe", "ខាងក្រោមបំផុតនៃផែនដី")}</Strong>
          {t(
            ", that tilt means it either points fully toward the Sun for half the year, or fully away from it for the other half.",
            " ផ្ទាំងផ្អៀងនោះមានន័យថា វាបែជាបែរទៅរកព្រះអាទិត្យពេញលេញពាក់កណ្ដាលឆ្នាំ ឬបែរចេញពីព្រះអាទិត្យពេញលេញពាក់កណ្ដាលឆ្នាំទៀត។",
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SeasonCard
            kind="day"
            Icon={Sun}
            en="Polar Summer"
            kh="រដូវក្ដៅប៉ូឡា"
            duration={t("≈ 6 months", "≈ ៦ ខែ")}
            blurbEn="The Sun never sets. It just circles the sky, day after day."
            blurbKh="ព្រះអាទិត្យមិនលិចឡើយ។ វាគ្រាន់តែវិលជុំមេឃ ថ្ងៃនេះទៅថ្ងៃក្រោយ។"
          />
          <SeasonCard
            kind="night"
            Icon={Moon}
            en="Polar Winter"
            kh="រដូវរងារប៉ូឡា"
            duration={t("≈ 6 months", "≈ ៦ ខែ")}
            blurbEn="The Sun never rises. Only stars, the Moon, and the Aurora Australis."
            blurbKh="ព្រះអាទិត្យមិនរះឡើយ។ មានតែផ្កាយ ព្រះច័ន្ទ និងពន្លឺអូរ៉ូរ៉ាខាងត្បូង។"
          />
        </div>

        <p className="font-khmer text-xs sm:text-sm text-white/65 leading-loose">
          ៦ ខែពន្លឺថ្ងៃជាប់ៗ ហើយ ៦ ខែងងឹតត្រជាក់ — ដោយសារអ័ក្សផែនដីផ្អៀង។
        </p>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Sub-components
// ════════════════════════════════════════════════════════════════════════════

function CardHeader({
  en,
  kh,
  index,
  accent,
  Icon,
}: {
  en: string;
  kh: string;
  index: string;
  accent: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <header className="relative flex items-start gap-3">
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center ${accent}`}
        aria-hidden
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`text-[10px] font-mono uppercase tracking-[0.25em] ${accent} opacity-80`}
          aria-hidden
        >
          CARD · {index}
        </div>
        <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
          {en}
        </h2>
        <p className="font-khmer text-sm sm:text-base text-white/85 leading-loose mt-0.5">
          {kh}
        </p>
      </div>
    </header>
  );
}

function Subhead({
  en,
  kh,
  accent,
}: {
  en: string;
  kh: string;
  accent: string;
}) {
  return (
    <h3
      className={`flex items-baseline gap-2 font-display text-sm sm:text-base font-bold ${accent}`}
    >
      <span>{en}</span>
      <span className="font-khmer text-xs sm:text-sm font-normal opacity-80">
        · {kh}
      </span>
    </h3>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-white drop-shadow-[0_0_6px_rgba(165,243,252,0.45)]">
      {children}
    </strong>
  );
}

function Stat({
  en,
  kh,
  value,
}: {
  en: string;
  kh: string;
  value: string;
}) {
  return (
    <li className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-1.5 last:border-b-0">
      <span className="leading-snug">
        <span className="text-white/85">{en}</span>
        <span className="font-khmer text-white/55 text-[11px] block leading-loose">
          {kh}
        </span>
      </span>
      <span className="font-mono text-cyan-200 font-bold tabular-nums whitespace-nowrap">
        {value}
      </span>
    </li>
  );
}

function BanRow({ en, kh }: { en: string; kh: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <Ban
        className="w-4 h-4 text-rose-300 flex-shrink-0 mt-0.5"
        aria-hidden
      />
      <span>
        <span className="text-white/90">{en}</span>
        <span className="font-khmer text-white/65 text-xs block leading-loose">
          {kh}
        </span>
      </span>
    </li>
  );
}

function ResearchPill({
  Icon,
  en,
  kh,
  descEn,
  descKh,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  en: string;
  kh: string;
  descEn: string;
  descKh: string;
}) {
  return (
    <li className="rounded-xl border border-emerald-400/25 bg-emerald-500/5 px-3.5 py-3">
      <div className="flex items-center gap-2 text-emerald-200">
        <Icon className="w-4 h-4" aria-hidden />
        <p className="font-semibold text-sm text-white">{en}</p>
      </div>
      <p className="font-khmer text-xs text-emerald-100/85 leading-loose mt-0.5">
        {kh}
      </p>
      <p className="text-[11px] text-white/65 leading-relaxed mt-2">
        {descEn}
      </p>
      <p className="font-khmer text-[11px] text-white/55 leading-loose mt-1">
        {descKh}
      </p>
    </li>
  );
}

function SeasonCard({
  kind,
  Icon,
  en,
  kh,
  duration,
  blurbEn,
  blurbKh,
}: {
  kind: "day" | "night";
  Icon: React.ComponentType<{ className?: string }>;
  en: string;
  kh: string;
  duration: string;
  blurbEn: string;
  blurbKh: string;
}) {
  const tone =
    kind === "day"
      ? "border-amber-300/30 bg-amber-400/5 text-amber-100"
      : "border-indigo-300/30 bg-indigo-500/10 text-indigo-100";
  const iconTone = kind === "day" ? "text-amber-200" : "text-indigo-200";

  return (
    <div
      className={`rounded-xl border ${tone} px-4 py-4`}
      data-testid={`antarctica-season-${kind}`}
    >
      <div className="flex items-center gap-2.5">
        <Icon className={`w-5 h-5 ${iconTone}`} aria-hidden />
        <div>
          <p className="font-semibold text-sm text-white leading-tight">{en}</p>
          <p className="font-khmer text-xs text-white/80 leading-loose">{kh}</p>
        </div>
        <span className="ml-auto font-mono text-[11px] text-white/85 tabular-nums">
          {duration}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-white/85 leading-relaxed mt-2">
        {blurbEn}
      </p>
      <p className="font-khmer text-xs text-white/65 leading-loose mt-1">
        {blurbKh}
      </p>
    </div>
  );
}

// ── Decorative backdrop ─────────────────────────────────────────────────────

function FrostGrid() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.07] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(to right, #a5f3fc 1px, transparent 1px), linear-gradient(to bottom, #a5f3fc 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    />
  );
}

function Snowfield() {
  const positions = [
    ["6%", "8%"],
    ["12%", "82%"],
    ["19%", "32%"],
    ["27%", "65%"],
    ["38%", "12%"],
    ["44%", "88%"],
    ["52%", "44%"],
    ["61%", "20%"],
    ["68%", "73%"],
    ["77%", "10%"],
    ["83%", "55%"],
    ["91%", "30%"],
    ["95%", "84%"],
  ];
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {positions.map(([top, left], i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.85)]"
          style={{ top, left, width: "2px", height: "2px" }}
        />
      ))}
    </div>
  );
}

function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[140%] h-72 blur-3xl opacity-30"
      style={{
        background:
          "radial-gradient(60% 60% at 30% 40%, rgba(16,185,129,0.5) 0%, transparent 60%)," +
          "radial-gradient(60% 60% at 70% 50%, rgba(34,211,238,0.45) 0%, transparent 60%)",
      }}
    />
  );
}
