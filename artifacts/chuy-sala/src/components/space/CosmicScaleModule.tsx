import {
  Ruler,
  Sparkles,
  Sun,
  Star,
  Telescope,
  Bike,
  Orbit,
  Compass,
  Lightbulb,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  The Cosmic Ruler: Measuring the Galaxy
//  បន្ទាត់ចក្រវាឡ៖ ការវាស់វែងកាឡាក់ស៊ី
//
//  How astronomers measure distances when kilometers stop being useful:
//  the Light-Year, the Parsec (parallax), and a galactic-scale tour.
//
//  Aesthetic = void black + starlight white + nebula blue, matching the
//  rest of the SpacePage dark theme. Decorative icons are aria-hidden;
//  numeric distance values carry their own data-testid for stable QA.
// ════════════════════════════════════════════════════════════════════════════

type Distance = {
  id: string;
  nameEn: string;
  nameKh: string;
  noteEn?: string;
  noteKh?: string;
  parsec: string; // human-readable string, e.g. "0.0000048 pc"
  alt: string; // alternative description, e.g. "8 light-minutes"
  altKh: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NEIGHBORHOOD: Distance[] = [
  {
    id: "sun",
    nameEn: "The Sun",
    nameKh: "ព្រះអាទិត្យ",
    noteEn: "Our home star.",
    noteKh: "ផ្កាយផ្ទះរបស់យើង។",
    parsec: "0.0000048 pc",
    alt: "8 light-minutes",
    altKh: "៨ នាទីពន្លឺ",
    icon: Sun,
  },
  {
    id: "proxima",
    nameEn: "Proxima Centauri",
    nameKh: "ប្រូក្ស៊ីម៉ា សង់តូរ៉ូស៍",
    noteEn: "The nearest star to the Sun.",
    noteKh: "ផ្កាយជិតបំផុតនឹងព្រះអាទិត្យ។",
    parsec: "1.3 pc",
    alt: "≈ 4.24 light-years",
    altKh: "≈ ៤,២៤ ឆ្នាំពន្លឺ",
    icon: Star,
  },
  {
    id: "sirius",
    nameEn: "Sirius",
    nameKh: "ស៊ីរីយូស",
    noteEn: "Brightest star in Earth's night sky.",
    noteKh: "ផ្កាយភ្លឺបំផុតនៅលើមេឃរាត្រីផែនដី។",
    parsec: "2.6 pc",
    alt: "≈ 8.6 light-years",
    altKh: "≈ ៨,៦ ឆ្នាំពន្លឺ",
    icon: Sparkles,
  },
  {
    id: "milky-way-center",
    nameEn: "Center of the Milky Way",
    nameKh: "ចំណុចកណ្ដាលនៃផ្លូវទឹកដោះ",
    noteEn: "Home of the supermassive black hole Sagittarius A*.",
    noteKh: "ផ្ទះនៃរន្ធខ្មៅធំសាហាវ Sagittarius A*។",
    parsec: "≈ 8,000 pc",
    alt: "≈ 26,000 light-years",
    altKh: "≈ ២៦.០០០ ឆ្នាំពន្លឺ",
    icon: Orbit,
  },
  {
    id: "milky-way-diameter",
    nameEn: "Diameter of the Milky Way",
    nameKh: "អង្កត់ផ្ចិតនៃផ្លូវទឹកដោះ",
    noteEn: "End-to-end width of our entire galaxy.",
    noteKh: "ទទឹងពីចុងម្ខាងទៅចុងម្ខាងនៃកាឡាក់ស៊ីទាំងមូលរបស់យើង។",
    parsec: "≈ 30,000 pc",
    alt: "≈ 100,000 light-years",
    altKh: "≈ ១០០.០០០ ឆ្នាំពន្លឺ",
    icon: Telescope,
  },
];

export function CosmicScaleModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      aria-labelledby="cosmic-scale-heading"
      data-testid="cosmic-scale"
    >
      {/* Section eyebrow (matches SpacePage SectionLabel vibe) */}
      <div
        className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-sky-300/90 mb-3 ${
          kh ? "font-khmer normal-case tracking-normal text-xs" : ""
        }`}
      >
        <Ruler className="w-3.5 h-3.5" aria-hidden />
        <span>{t("Distance & Scale", "ចម្ងាយ និងមាត្រដ្ឋាន")}</span>
      </div>

      {/* Heading */}
      <h2
        id="cosmic-scale-heading"
        className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight"
        data-testid="cosmic-scale-title-en"
      >
        The Cosmic Ruler:{" "}
        <span className="bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
          Measuring the Galaxy
        </span>
      </h2>
      <p
        className="font-khmer mt-2 text-lg sm:text-xl text-sky-200/90 leading-loose"
        data-testid="cosmic-scale-title-kh"
      >
        បន្ទាត់ចក្រវាឡ៖ ការវាស់វែងកាឡាក់ស៊ី
      </p>

      <p className="mt-4 text-sm sm:text-base text-white/70 max-w-3xl leading-relaxed">
        {t(
          "Once you leave the Earth, kilometers stop making sense. Astronomers built a new ruler — the light-year and the parsec — to measure distances so vast that even light takes years to cross them.",
          "នៅពេលអ្នកចាកចេញពីផែនដី គីឡូម៉ែត្រលែងមានន័យ។ តារាវិទូបានបង្កើតបន្ទាត់ថ្មី — ឆ្នាំពន្លឺ និងប៉ាសិច — ដើម្បីវាស់ចម្ងាយដ៏ធំធេង ដែលសូម្បីពន្លឺក៏ត្រូវការពេលច្រើនឆ្នាំ ដើម្បីឆ្លងកាត់។",
        )}
      </p>

      {/* Cards grid */}
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <KilometersFailCard kh={kh} t={t} />
        <ParsecCard kh={kh} t={t} />
        <NeighborhoodCard kh={kh} t={t} />
      </div>

      {/* Closing thought */}
      <div
        className="relative mt-7 rounded-2xl border border-sky-400/30 bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 px-5 sm:px-7 py-5 overflow-hidden"
        data-testid="cosmic-scale-footer"
      >
        <StarSpeck top="20%" left="8%" />
        <StarSpeck top="60%" left="92%" />
        <StarSpeck top="40%" left="55%" />
        <div className="relative flex items-start gap-3">
          <Lightbulb
            className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5"
            aria-hidden
          />
          <div>
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {t(
                "Every starlit night, your eyes are catching photons that left their stars before you were born.",
                "រាល់រាត្រីដែលផ្កាយរះ ភ្នែករបស់អ្នកកំពុងចាប់យកហ្វូតុនដែលបានចាកចេញពីផ្កាយរបស់ពួកវា មុនពេលអ្នកកើតមកទៀត។",
              )}
            </p>
            <p className="font-khmer mt-1 text-sm text-sky-200/85 leading-loose">
              ការមើលទៅឱ្យឆ្ងាយ គឺការមើលទៅក្នុងអតីតកាល។
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CosmicScaleModule;

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 — Why Kilometers Fail
// ════════════════════════════════════════════════════════════════════════════

function KilometersFailCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, k: string) => string;
}) {
  return (
    <article
      className="lg:col-span-1 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/70 p-5 sm:p-6 shadow-[0_0_40px_rgba(56,189,248,0.06)]"
      data-testid="cosmic-scale-card-kilometers"
    >
      <StarField />

      <CardHeader
        en="Why Kilometers Fail"
        kh="ហេតុអ្វីបានជាគីឡូម៉ែត្របរាជ័យ"
        index="01"
        accentColor="text-sky-300"
        Icon={Ruler}
      />

      <div className="relative mt-4 space-y-4">
        <Subhead
          en="The Problem"
          kh="បញ្ហា"
          accent="text-sky-200"
          t={t}
        />
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          {t(
            "Measuring space in kilometers is like trying to measure the distance between Phnom Penh and Bangkok using a single grain of rice. The numbers grow so large that the human brain stops being able to picture what they mean.",
            "ការវាស់លំហអាកាសជាគីឡូម៉ែត្រ គឺដូចជាការព្យាយាមវាស់ចម្ងាយរវាងភ្នំពេញ និងបាងកក ដោយប្រើគ្រាប់អង្ករតែមួយ។ លេខធំទៅៗ រហូតខួរក្បាលមនុស្សលែងអាចស្រមៃឃើញអ្វីដែលពួកវាមានន័យ។",
          )}
        </p>
        <p className="font-khmer text-sm text-white/70 leading-loose">
          ការវាស់លំហអាកាសជាគីឡូម៉ែត្រ គឺដូចជាការប្រើគ្រាប់អង្ករវាស់ចម្ងាយពីភ្នំពេញទៅបាងកក។
        </p>

        <div className="rounded-xl border border-sky-400/30 bg-sky-500/5 px-4 py-3">
          <Subhead
            en="The Light-Year"
            kh="ឆ្នាំពន្លឺ"
            accent="text-sky-200"
            t={t}
            inline
          />
          <p className="mt-2 text-sm text-white/85 leading-relaxed">
            {t(
              "The first solution. Light is the fastest thing in the universe — it travels roughly ",
              "ដំណោះស្រាយដំបូង។ ពន្លឺគឺជាវត្ថុលឿនបំផុតក្នុងចក្រវាល — វាធ្វើដំណើរប្រហែល ",
            )}
            <GlowingNumber>300,000 km</GlowingNumber>
            {t(
              " every single second. A ",
              " ក្នុងមួយវិនាទី។ ",
            )}
            <strong className="text-sky-200">
              {t("light-year", "ឆ្នាំពន្លឺ")}
            </strong>
            {t(
              " is the distance that light can travel in one entire year — about ",
              " គឺជាចម្ងាយដែលពន្លឺអាចធ្វើដំណើរក្នុងមួយឆ្នាំពេញ — ប្រហែល ",
            )}
            <GlowingNumber>9,460,000,000,000 km</GlowingNumber>.
          </p>
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 — The Parsec
// ════════════════════════════════════════════════════════════════════════════

function ParsecCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, k: string) => string;
}) {
  return (
    <article
      className="lg:col-span-1 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-indigo-950/70 to-slate-900 p-5 sm:p-6 shadow-[0_0_40px_rgba(99,102,241,0.08)]"
      data-testid="cosmic-scale-card-parsec"
    >
      <StarField />

      <CardHeader
        en="The Parsec"
        kh="ប៉ាសិច"
        index="02"
        accentColor="text-indigo-300"
        Icon={Compass}
      />

      <div className="relative mt-4 space-y-4">
        <Subhead
          en="The Professional's Tool"
          kh="ឧបករណ៍របស់អ្នកជំនាញ"
          accent="text-indigo-200"
          t={t}
        />
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          {t(
            "Professional astronomers rarely use light-years in their published work. They use the ",
            "តារាវិទូជំនាញកម្រប្រើឆ្នាំពន្លឺនៅក្នុងស្នាដៃរបស់ខ្លួន។ ពួកគេប្រើ ",
          )}
          <strong className="text-indigo-200">
            {t("parsec", "ប៉ាសិច")}
          </strong>
          {t(
            " (short for ",
            " (កាត់មកពី ",
          )}
          <em className="text-white/90">parallax-second</em>
          {t(
            "), a unit built directly from the way we actually measure distances to nearby stars.",
            ") ដែលជាឯកតាដែលត្រូវបានកសាងដោយផ្ទាល់ពីរបៀបដែលយើងវាស់ចម្ងាយផ្កាយក្បែរៗ។",
          )}
        </p>

        {/* The Math */}
        <div
          className="rounded-xl border border-indigo-400/30 bg-indigo-500/5 px-4 py-4 text-center"
          data-testid="cosmic-scale-parsec-math"
        >
          <p
            className={`text-[11px] uppercase tracking-[0.2em] text-indigo-200/80 mb-2 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("The Math", "គណិតវិទ្យា")}
          </p>
          <p className="font-mono text-base sm:text-lg text-white">
            <span className="text-indigo-200">1 Parsec</span>{" "}
            <span className="text-white/60">=</span>{" "}
            <GlowingNumber>3.26</GlowingNumber>{" "}
            <span className="text-indigo-200">Light-Years</span>
          </p>
          <p className="font-khmer mt-2 text-xs sm:text-sm text-indigo-200/85 leading-loose">
            ១ ប៉ាសិច = ៣,២៦ ឆ្នាំពន្លឺ
          </p>
        </div>

        {/* How it works */}
        <Subhead
          en="How Parallax Works"
          kh="របៀបដែលប៉ារ៉ាឡាក់សដំណើរការ"
          accent="text-indigo-200"
          t={t}
        />
        <p className="text-sm text-white/80 leading-relaxed">
          {t(
            "As the Earth orbits the Sun, scientists photograph the same nearby star from two opposite sides of our orbit, six months apart. Against the far-away background of fainter stars, the nearby star appears to ",
            "ខណៈផែនដីវិលជុំវិញព្រះអាទិត្យ អ្នកវិទ្យាសាស្ត្រថតរូបផ្កាយដដែលនោះពីសងខាងផ្ទុយគ្នានៃគន្លងរបស់យើង ដាច់ពីគ្នា ៦ ខែ។ ផ្ទៃខាងក្រោយជាផ្កាយឆ្ងាយៗដែលស្រអាប់ ផ្កាយជិតៗហាក់បី ",
          )}
          <strong className="text-indigo-200">
            {t("shift slightly", "រំកិលបន្តិច")}
          </strong>
          {t(
            ". By measuring that tiny shift angle and using simple trigonometry, they can calculate the star's distance with stunning precision.",
            "។ ដោយវាស់មុំរំកិលដ៏តូចនោះ និងប្រើត្រីកោណមាត្រសាមញ្ញ ពួកគេអាចគណនាចម្ងាយរបស់ផ្កាយដោយភាពច្បាស់លាស់គួរឱ្យភ្ញាក់ផ្អើល។",
          )}
        </p>
        <p className="font-khmer text-xs sm:text-sm text-white/65 leading-loose">
          ផែនដី + គន្លង + ត្រីកោណមាត្រ = បន្ទាត់ឆ្ពោះទៅផ្កាយ។
        </p>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 — Our Galactic Neighborhood
// ════════════════════════════════════════════════════════════════════════════

function NeighborhoodCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, k: string) => string;
}) {
  return (
    <article
      className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-violet-950/40 to-slate-950 p-5 sm:p-6 shadow-[0_0_40px_rgba(139,92,246,0.08)]"
      data-testid="cosmic-scale-card-neighborhood"
    >
      <StarField dense />

      <CardHeader
        en="Our Galactic Neighborhood"
        kh="អ្នកជិតខាងកាឡាក់ស៊ីរបស់យើង"
        index="03"
        accentColor="text-violet-300"
        Icon={Orbit}
      />

      <p className="relative mt-3 text-sm sm:text-base text-white/75 leading-relaxed max-w-3xl">
        {t(
          "Now that you know the units, here is the ladder. Watch how quickly the parsec count explodes.",
          "ឥឡូវនេះអ្នកស្គាល់ឯកតាហើយ នេះជាជណ្ដើរ។ សង្កេតថាតើចំនួនប៉ាសិចកើនឡើងលឿនយ៉ាងណា។",
        )}
      </p>

      <ul
        className="relative mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3"
        data-testid="cosmic-scale-distance-list"
      >
        {NEIGHBORHOOD.map((d) => (
          <DistanceRow key={d.id} d={d} />
        ))}
      </ul>

      {/* Motorbike thought-experiment */}
      <div
        className="relative mt-5 rounded-xl border border-violet-400/30 bg-violet-500/5 px-4 py-4"
        data-testid="cosmic-scale-motorbike-callout"
      >
        <div className="flex items-start gap-3">
          <Bike
            className="w-5 h-5 text-violet-200 flex-shrink-0 mt-0.5"
            aria-hidden
          />
          <div>
            <p className="text-sm sm:text-base font-semibold text-violet-100">
              {t(
                "Imagine riding a motorbike at 60 km/h all the way to Proxima Centauri.",
                "ស្រមៃថាជិះម៉ូតូល្បឿន ៦០ គម/ម៉ោង ពេញមួយផ្លូវទៅប្រូក្ស៊ីម៉ា សង់តូរ៉ូស៍។",
              )}
            </p>
            <p className="mt-1 text-sm text-white/80 leading-relaxed">
              {t(
                "Without ever stopping for fuel, food, or sleep — the trip would still take over ",
                "ដោយមិនឈប់សម្រាប់ឥន្ធនៈ អាហារ ឬគេង — ដំណើរនេះនៅតែត្រូវចំណាយពេលជាង ",
              )}
              <GlowingNumber>75,000,000</GlowingNumber>{" "}
              {t("years.", "ឆ្នាំ។")}
            </p>
            <p className="font-khmer mt-1 text-sm text-violet-200/85 leading-loose">
              ៧៥ លានឆ្នាំ ដើម្បីទៅដល់ផ្កាយជិតបំផុត។
            </p>
          </div>
        </div>
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
  accentColor,
  Icon,
}: {
  en: string;
  kh: string;
  index: string;
  accentColor: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <header className="relative flex items-start gap-3">
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center ${accentColor}`}
        aria-hidden
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`text-[10px] font-mono uppercase tracking-[0.25em] ${accentColor} opacity-80`}
          aria-hidden
        >
          CARD · {index}
        </div>
        <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
          {en}
        </h3>
        <p className="font-khmer text-sm sm:text-base text-white/80 leading-loose mt-0.5">
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
  t,
  inline = false,
}: {
  en: string;
  kh: string;
  accent: string;
  t: (en: string, k: string) => string;
  inline?: boolean;
}) {
  if (inline) {
    return (
      <span
        className={`inline-flex items-baseline gap-2 font-display font-bold ${accent}`}
      >
        <span>{en}</span>
        <span className="font-khmer text-xs sm:text-sm font-normal opacity-80">
          · {kh}
        </span>
      </span>
    );
  }
  return (
    <h4
      className={`flex items-baseline gap-2 font-display text-sm sm:text-base font-bold ${accent}`}
    >
      <span>{en}</span>
      <span className="font-khmer text-xs sm:text-sm font-normal opacity-80">
        · {kh}
      </span>
    </h4>
  );
}

function DistanceRow({ d }: { d: Distance }) {
  const Icon = d.icon;
  return (
    <li
      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex items-start gap-3"
      data-testid={`cosmic-scale-distance-${d.id}`}
    >
      <div
        className="flex-shrink-0 w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-400/30 text-violet-200 flex items-center justify-center"
        aria-hidden
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <p className="font-semibold text-sm text-white leading-tight">
            {d.nameEn}
          </p>
          <span
            className="font-mono text-sm text-violet-200 font-bold tabular-nums"
            data-testid={`cosmic-scale-distance-${d.id}-value`}
          >
            {d.parsec}
          </span>
        </div>
        <p className="font-khmer text-xs text-white/75 leading-loose mt-0.5">
          {d.nameKh}
        </p>
        <p className="text-[11px] text-white/55 mt-1">
          {d.alt}
          <span className="text-white/35"> · </span>
          <span className="font-khmer">{d.altKh}</span>
        </p>
        {d.noteEn && (
          <p className="text-[11px] text-white/65 leading-relaxed mt-1">
            {d.noteEn}
            {d.noteKh && (
              <>
                <br />
                <span className="font-khmer text-white/55 leading-loose">
                  {d.noteKh}
                </span>
              </>
            )}
          </p>
        )}
      </div>
    </li>
  );
}

function GlowingNumber({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono font-bold text-white drop-shadow-[0_0_6px_rgba(125,211,252,0.55)] tabular-nums">
      {children}
    </span>
  );
}

function StarSpeck({
  top,
  left,
  size = 1,
}: {
  top: string;
  left: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className="absolute rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.85)]"
      style={{ top, left, width: `${size * 2}px`, height: `${size * 2}px` }}
    />
  );
}

function StarField({ dense = false }: { dense?: boolean }) {
  // Decorative twinkling background for cards. Pure CSS, no animation
  // jitter — just static specks tuned to the dark backdrop.
  const positions = dense
    ? [
        ["10%", "8%"],
        ["18%", "85%"],
        ["35%", "42%"],
        ["48%", "12%"],
        ["55%", "78%"],
        ["72%", "30%"],
        ["80%", "62%"],
        ["88%", "8%"],
        ["92%", "92%"],
        ["28%", "68%"],
      ]
    : [
        ["12%", "10%"],
        ["28%", "78%"],
        ["50%", "32%"],
        ["62%", "88%"],
        ["80%", "18%"],
        ["88%", "55%"],
      ];
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {positions.map(([top, left], i) => (
        <StarSpeck key={i} top={top} left={left} />
      ))}
    </div>
  );
}
