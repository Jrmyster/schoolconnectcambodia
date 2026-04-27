import { Link } from "wouter";
import {
  ArrowLeft,
  Grid3x3,
  Zap,
  Magnet,
  Shield,
  Globe2,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Inorganic Chemistry 101 · Module 05
 * Main Group Element Chemistry — គីមីវិទ្យាធាតុក្រុមចម្បង
 * Soft orange / amber accents to match the curriculum-hub card.
 * ══════════════════════════════════════════════════════════════════════════ */

export function InorganicMainGroupPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 to-background py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/science/chemistry/inorganic"
          data-testid="link-back-to-inorganic"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t(
            "Back to Inorganic Chemistry 101",
            "ត្រឡប់ទៅគីមីវិទ្យាអសរីរាង្គ ១០១",
          )}
        </Link>

        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="mb-8 sm:mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-amber-200">
              <Grid3x3 className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-amber-700 opacity-80 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t(
                  "Module 05 · Inorganic Chemistry",
                  "មុខវិជ្ជា ០៥ · គីមីវិទ្យាអសរីរាង្គ",
                )}
              </span>
              <h1
                id="main-group-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t(
                  "Main Group Element Chemistry",
                  "គីមីវិទ្យាធាតុក្រុមចម្បង",
                )}
              </h1>
            </div>
          </div>
          <p
            className={`text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Transition metals get the spotlight, but the elements you actually live with — the salt on your rice, the chlorine in your drinking water, the helium in a party balloon — almost all of them come from the Main Group. This is the chemistry of everyday life.",
              "លោហៈអន្តរការចូលត្រូវបានចាប់អារម្មណ៍ ប៉ុន្តែធាតុដែលអ្នករស់នៅជាមួយជាក់ស្តែង — អំបិលលើបាយអ្នក ក្លរីនក្នុងទឹកផឹក អេលីយ៉ូមក្នុងប៉ោងពិធីបុណ្យ — ស្ទើរតែទាំងអស់សុទ្ធតែមកពីក្រុមចម្បង។ នេះគឺជាគីមីវិទ្យានៃជីវភាពប្រចាំថ្ងៃ។",
            )}
          </p>
        </header>

        {/* ── Building Blocks of Earth · intro card ──────────────── */}
        <section
          data-testid="section-building-blocks"
          aria-labelledby="building-blocks-title"
          className="mb-8 rounded-2xl border-2 border-amber-200 bg-white p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow ring-2 ring-amber-200"
              aria-hidden="true"
            >
              <Globe2 className="w-5 h-5" strokeWidth={2.25} />
            </span>
            <div className="flex-1 min-w-0">
              <h2
                id="building-blocks-title"
                className={`text-lg sm:text-xl font-bold leading-tight text-amber-900 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t(
                  "The Building Blocks of Earth",
                  "សម្ភារៈសំណង់នៃផែនដី",
                )}
              </h2>
              <p
                className={`text-xs font-semibold text-amber-700/80 mt-0.5 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t(
                  "Why the s-block and p-block matter most in daily life",
                  "ហេតុអ្វី s-block និង p-block សំខាន់បំផុតក្នុងជីវភាពប្រចាំថ្ងៃ",
                )}
              </p>
            </div>
          </div>

          {/* Mini periodic-table strip showing s-block + p-block highlighted */}
          <div
            aria-hidden="true"
            className="mb-4 rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-3 overflow-x-auto"
          >
            <div className="flex items-center justify-center gap-1 min-w-fit">
              {/* s-block (Group 1 + 2) */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex gap-0.5">
                  <Cell tone="amber-strong" label="H" />
                  <Cell tone="amber-strong" label="" />
                </div>
                <div className="flex gap-0.5">
                  <Cell tone="amber-strong" label="Li" />
                  <Cell tone="amber-strong" label="Be" />
                </div>
                <div className="flex gap-0.5">
                  <Cell tone="amber-strong" label="Na" />
                  <Cell tone="amber-strong" label="Mg" />
                </div>
                <div className="flex gap-0.5">
                  <Cell tone="amber-strong" label="K" />
                  <Cell tone="amber-strong" label="Ca" />
                </div>
                <span className="text-[9px] font-bold text-amber-700 mt-0.5">s</span>
              </div>

              {/* d-block placeholder (greyed) */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Cell key={i} tone="muted" label="" />
                  ))}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Cell key={i} tone="muted" label="" />
                  ))}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Cell key={i} tone="muted" label="" />
                  ))}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Cell key={i} tone="muted" label="" />
                  ))}
                </div>
                <span className="text-[9px] font-bold text-slate-400 mt-0.5">d</span>
              </div>

              {/* p-block (Groups 13–18) */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Cell key={i} tone="orange-strong" label="" />
                  ))}
                  <Cell tone="orange-strong" label="He" />
                </div>
                <div className="flex gap-0.5">
                  <Cell tone="orange-strong" label="B" />
                  <Cell tone="orange-strong" label="C" />
                  <Cell tone="orange-strong" label="N" />
                  <Cell tone="orange-strong" label="O" />
                  <Cell tone="orange-strong" label="F" />
                  <Cell tone="orange-strong" label="Ne" />
                </div>
                <div className="flex gap-0.5">
                  <Cell tone="orange-strong" label="Al" />
                  <Cell tone="orange-strong" label="Si" />
                  <Cell tone="orange-strong" label="P" />
                  <Cell tone="orange-strong" label="S" />
                  <Cell tone="orange-strong" label="Cl" />
                  <Cell tone="orange-strong" label="Ar" />
                </div>
                <div className="flex gap-0.5">
                  <Cell tone="orange-strong" label="Ga" />
                  <Cell tone="orange-strong" label="Ge" />
                  <Cell tone="orange-strong" label="As" />
                  <Cell tone="orange-strong" label="Se" />
                  <Cell tone="orange-strong" label="Br" />
                  <Cell tone="orange-strong" label="Kr" />
                </div>
                <span className="text-[9px] font-bold text-orange-700 mt-0.5">p</span>
              </div>
            </div>
            <p
              className={`text-center text-[10px] mt-2 text-amber-800/80 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t(
                "s-block (left) and p-block (right) make up the Main Group.",
                "s-block (ឆ្វេង) និង p-block (ស្តាំ) បង្កើតបានជាក្រុមចម្បង។",
              )}
            </p>
          </div>

          <p
            className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Transition metals are flashy — colorful complexes, magnets, catalysts. But the Main Group, made of the s-block (Groups 1 and 2) and the p-block (Groups 13 to 18), makes up almost everything you actually touch, breathe, and eat. The oxygen in your lungs (O), the calcium in your bones (Ca), the silicon in window glass (Si), the nitrogen filling 78 percent of the air around you — every one of them is a Main Group element.",
              "លោហៈអន្តរការចូលអស្ចារ្យ — កុំផ្លិចមានពណ៌ ម៉ាញេទិក កាតាលីការ។ ប៉ុន្តែក្រុមចម្បង ដែលធ្វើពី s-block (ក្រុម ១ និង ២) និង p-block (ក្រុម ១៣ ដល់ ១៨) បង្កើតបានស្ទើរតែគ្រប់អ្វីៗដែលអ្នកប៉ះពាល់ ដកដង្ហើម និងបរិភោគជាក់ស្តែង។ អុកស៊ីសែនក្នុងសួត (O) កាល់ស្យូមក្នុងឆ្អឹង (Ca) ស៊ីលីស្យូមក្នុងកញ្ចក់បង្អួច (Si) អាសូតបំពេញ ៧៨ ភាគរយនៃខ្យល់ជុំវិញអ្នក — ធាតុនីមួយៗគឺជាធាតុក្រុមចម្បង។",
            )}
          </p>
        </section>

        {/* ── Three concept cards · CSS Grid · soft amber/orange ── */}
        <h2
          className={`text-base sm:text-lg font-bold text-amber-900 mb-3 ${
            kh ? "font-khmer" : ""
          }`}
        >
          {t(
            "Three families that run your daily life",
            "គ្រួសារធាតុបីដែលជួយជីវភាពប្រចាំថ្ងៃ",
          )}
        </h2>
        <div
          role="list"
          aria-label="Main Group element families · គ្រួសារធាតុក្រុមចម្បង"
          data-testid="grid-concept-cards"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {/* ─── Card 1 · The Alkali Metals (Group 1) ──────────── */}
          <article
            role="listitem"
            data-testid="card-alkali-metals"
            className="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow ring-2 ring-amber-200"
                aria-hidden="true"
              >
                <Zap className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold leading-tight text-amber-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("The Alkali Metals", "លោហៈអាល់កាឡាំង")}
                </h3>
                <p
                  className={`text-xs font-semibold text-amber-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Group 1 · electron givers",
                    "ក្រុម ១ · អ្នកផ្តល់អេឡិចត្រុង",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: Na giving an electron to Cl → NaCl */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center overflow-hidden gap-2"
            >
              <span className="relative w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-md ring-2 ring-white text-[9px] font-bold text-white flex items-center justify-center">
                Na
              </span>
              <span className="text-amber-700 text-base font-bold">→</span>
              <span className="relative w-2.5 h-2.5 rounded-full bg-yellow-300 shadow-sm ring-1 ring-white" />
              <span className="text-amber-700 text-base font-bold">→</span>
              <span className="relative w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-md ring-2 ring-white text-[9px] font-bold text-white flex items-center justify-center">
                Cl
              </span>
              <span className="ml-1 text-[9px] font-bold uppercase tracking-wider text-amber-700">
                NaCl
              </span>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Group 1 elements have just one electron in their outer shell — and they desperately want to give it away. That makes them incredibly reactive. When sodium (Na) hands its outer electron to chlorine, the result is the salt (NaCl) sprinkled on your rice. Potassium (K) is so important to plant growth that it is one of the three main ingredients in agricultural fertilizer (the K in NPK).",
                "ធាតុក្រុម ១ មានអេឡិចត្រុងមួយតែប៉ុណ្ណោះនៅសែលខាងក្រៅ — ហើយពួកវាចង់បោះបង់វាចោលយ៉ាងខ្លាំង។ នេះធ្វើឱ្យពួកវាមានប្រតិកម្មយ៉ាងខ្លាំង។ នៅពេលសូដ្យូម (Na) ប្រគល់អេឡិចត្រុងខាងក្រៅទៅឱ្យក្លរីន លទ្ធផលគឺអំបិល (NaCl) ដែលអ្នកបាចលើបាយ។ ប៉ូតាស្យូម (K) សំខាន់ដល់ការលូតលាស់រុក្ខជាតិ ដូច្នេះវាជាសមាសធាតុចម្បងមួយក្នុងចំណោមបីនៃជីកសិកម្ម (K ក្នុង NPK)។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-amber-800 bg-white/60 border border-amber-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Daily life:", "ជីវភាពប្រចាំថ្ងៃ៖")}{" "}
              <span className="font-normal">
                {t(
                  "Table salt (Na), banana potassium (K), lithium (Li) phone batteries.",
                  "អំបិល (Na) ប៉ូតាស្យូមក្នុងចេក (K) ថ្មទូរស័ព្ទលីធីយ៉ូម (Li)។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 2 · The Halogens (Group 17) ──────────────── */}
          <article
            role="listitem"
            data-testid="card-halogens"
            className="rounded-2xl border-2 border-orange-200 bg-orange-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow ring-2 ring-orange-200"
                aria-hidden="true"
              >
                <Magnet className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold leading-tight text-orange-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("The Halogens", "ហាឡូសែន")}
                </h3>
                <p
                  className={`text-xs font-semibold text-orange-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Group 17 · electron stealers",
                    "ក្រុម ១៧ · អ្នកលួចអេឡិចត្រុង",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: Cl pulling an electron away from a tiny "germ" cell */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 flex items-center justify-center overflow-hidden gap-2"
            >
              <span className="relative w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-md ring-2 ring-white text-[9px] font-bold text-white flex items-center justify-center">
                Cl
              </span>
              <span className="text-orange-700 text-base font-bold">←</span>
              <span className="relative w-2.5 h-2.5 rounded-full bg-yellow-300 shadow-sm ring-1 ring-white" />
              <span className="text-orange-700 text-base font-bold">←</span>
              <span className="relative w-9 h-9 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 shadow-md ring-2 ring-white text-[10px] font-bold text-white flex items-center justify-center">
                ✗
              </span>
              <span className="ml-1 text-[9px] font-bold uppercase tracking-wider text-orange-700">
                {t("germ", "ជីវាណូ")}
              </span>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Group 17 elements are the opposite of the alkali metals — they need just one more electron to fill their outer shell, so they aggressively rip electrons away from anything they touch. That chemical aggression is exactly why chlorine (Cl) is the active ingredient in household bleach and is added to drinking water and swimming pools: it tears apart the molecules that hold bacteria and viruses together.",
                "ធាតុក្រុម ១៧ គឺផ្ទុយពីលោហៈអាល់កាឡាំង — ពួកវាត្រូវការអេឡិចត្រុងតែមួយបន្ថែមទៀតដើម្បីបំពេញសែលខាងក្រៅ ដូច្នេះពួកវាលួចអេឡិចត្រុងពីអ្វីៗដែលពួកវាប៉ះយ៉ាងខ្លាំង។ ការវាយប្រហារគីមីនេះច្បាស់ជាហេតុដែលក្លរីន (Cl) ជាសមាសធាតុសកម្មនៅក្នុងសារធាតុបក្ខាងប្រើក្នុងផ្ទះ និងត្រូវបានបន្ថែមទៅក្នុងទឹកផឹក និងអាងហែលទឹក៖ វាបំបែកម៉ូលេគុលដែលរក្សាបាក់តេរី និងវីរុសរួមគ្នា។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-orange-800 bg-white/60 border border-orange-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Daily life:", "ជីវភាពប្រចាំថ្ងៃ៖")}{" "}
              <span className="font-normal">
                {t(
                  "Bleach & pool chlorine (Cl), toothpaste fluoride (F), iodine (I) for wounds.",
                  "សារធាតុបក្ខាង និងក្លរីនអាងហែល (Cl) ហ្វ្លុយអូរីដក្នុងថ្នាំដុសធ្មេញ (F) អ៊ីយ៉ូត (I) លាងរបួស។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 3 · The Noble Gases (Group 18) ───────────── */}
          <article
            role="listitem"
            data-testid="card-noble-gases"
            className="rounded-2xl border-2 border-yellow-200 bg-yellow-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 text-white shadow ring-2 ring-yellow-200"
                aria-hidden="true"
              >
                <Shield className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold leading-tight text-amber-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("The Noble Gases", "ឧស្ម័នកម្រ")}
                </h3>
                <p
                  className={`text-xs font-semibold text-amber-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Group 18 · chemically satisfied",
                    "ក្រុម ១៨ · ពេញចិត្តគីមី",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: a noble-gas atom with a complete shell + check badge */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-200 flex items-center justify-center overflow-hidden"
            >
              <div className="relative w-14 h-14">
                <span className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 shadow-md ring-2 ring-white text-[9px] font-bold text-white flex items-center justify-center">
                  He
                </span>
                {/* full electron shell */}
                <span className="absolute inset-0 rounded-full border-2 border-amber-400/70" />
                {/* checkmark badge for "complete" */}
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white text-[9px] font-bold text-white flex items-center justify-center">
                  ✓
                </span>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Group 18 elements already have completely full outer electron shells. They have nothing to gain and nothing to give, so they are chemically satisfied — almost completely non-reactive. That is why we put helium (He) inside party balloons (it floats and never burns), use neon (Ne) in glowing signs, and fill light bulbs with argon (Ar) to stop the filament from oxidizing.",
                "ធាតុក្រុម ១៨ មានសែលអេឡិចត្រុងខាងក្រៅពេញលេញរួចហើយ។ ពួកវាគ្មានអ្វីត្រូវយក គ្មានអ្វីត្រូវឱ្យទេ ដូច្នេះពួកវាពេញចិត្តគីមី — ស្ទើរតែមិនមានប្រតិកម្មទាំងស្រុង។ នេះជាហេតុដែលយើងដាក់អេលីយ៉ូម (He) ក្នុងប៉ោងពិធីបុណ្យ (វាអណ្តែតហើយមិនឆេះ) ប្រើនេអុង (Ne) ក្នុងផ្លាកសញ្ញាភ្លឺ និងបំពេញអំពូលភ្លើងជាមួយអាហ្គន (Ar) ដើម្បីបញ្ឈប់ខ្សែរូបភាពពីការអុកស៊ីដ។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-amber-800 bg-white/60 border border-yellow-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Daily life:", "ជីវភាពប្រចាំថ្ងៃ៖")}{" "}
              <span className="font-normal">
                {t(
                  "Helium balloons (He), neon signs (Ne), argon light bulbs (Ar).",
                  "ប៉ោងអេលីយ៉ូម (He) ផ្លាកនេអុង (Ne) អំពូលអាហ្គន (Ar)។",
                )}
              </span>
            </p>
          </article>
        </div>

        {/* ── Putting it together strip ──────────────────────────── */}
        <div className="mt-8 rounded-2xl border-2 border-amber-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2
            className={`text-base sm:text-lg font-bold text-amber-900 mb-3 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "Why it matters in real life",
              "ហេតុអ្វីវាសំខាន់ក្នុងជីវិតពិត",
            )}
          </h2>
          <p
            className={`text-sm sm:text-base text-foreground/85 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "The whole story of the Main Group is electron count. Group 1 wants to lose one. Group 17 wants to gain one. Group 18 already has the perfect number. Almost every chemical you use at home — salt, soap, bleach, fertilizer, fluoride toothpaste, helium balloons — is just two of these families finding each other and trading electrons. Once you can predict who wants to give and who wants to take, you can predict almost every reaction that runs your daily life.",
              "រឿងរ៉ាវទាំងមូលនៃក្រុមចម្បងគឺការរាប់អេឡិចត្រុង។ ក្រុម ១ ចង់បាត់បង់មួយ។ ក្រុម ១៧ ចង់ទទួលបានមួយ។ ក្រុម ១៨ មានចំនួនល្អឥតខ្ចោះរួចហើយ។ ស្ទើរតែគ្រប់សារធាតុគីមីដែលអ្នកប្រើនៅផ្ទះ — អំបិល សាប៊ូ សារធាតុបក្ខាង ជី ថ្នាំដុសធ្មេញហ្វ្លុយអូរីដ ប៉ោងអេលីយ៉ូម — គឺគ្រាន់តែជាគ្រួសារទាំងពីរនេះស្វែងរកគ្នា និងផ្លាស់ប្តូរអេឡិចត្រុង។ នៅពេលអ្នកអាចទាយថានរណាចង់ឱ្យ និងនរណាចង់យក អ្នកអាចទាយប្រតិកម្មស្ទើរតែទាំងអស់ដែលដំណើរការជីវភាពប្រចាំថ្ងៃរបស់អ្នក។",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── tiny periodic-table cell helper for the intro strip ─────────────── */
function Cell({
  tone,
  label,
}: {
  tone: "amber-strong" | "orange-strong" | "muted";
  label: string;
}) {
  const className =
    tone === "amber-strong"
      ? "bg-gradient-to-br from-amber-300 to-amber-400 text-amber-900 ring-amber-500/30"
      : tone === "orange-strong"
        ? "bg-gradient-to-br from-orange-300 to-orange-400 text-orange-900 ring-orange-500/30"
        : "bg-slate-100 text-slate-300 ring-slate-200";
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-[3px] text-[8px] font-bold ring-1 shadow-sm ${className}`}
    >
      {label}
    </span>
  );
}
