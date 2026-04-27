import { Link } from "wouter";
import { ArrowLeft, Magnet, Maximize2, Droplet, Atom } from "lucide-react";
import { InlineMath } from "react-katex";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Inorganic Chemistry 101 · Module 01
 * Atomic Structure & Periodic Trends — រចនាសម្ព័ន្ធអាតូម និងនិន្នាការខួប
 * ══════════════════════════════════════════════════════════════════════════ */

export function InorganicAtomicStructurePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/60 to-background py-8 sm:py-10 px-4 sm:px-6">
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-sky-200">
              <Atom className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-sky-700 opacity-80 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Module 01 · Inorganic Chemistry", "មុខវិជ្ជា ០១ · គីមីវិទ្យាអសរីរាង្គ")}
              </span>
              <h1
                id="atomic-structure-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-sky-900 ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t(
                  "Atomic Structure & Periodic Trends",
                  "រចនាសម្ព័ន្ធអាតូម និងនិន្នាការខួប",
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
              "Three big ideas explain almost every pattern you see across the periodic table. Read them side-by-side — they all come from the same simple story: a positive nucleus pulling on negative electrons.",
              "គំនិតធំៗបីយ៉ាងពន្យល់ស្ទើរតែគ្រប់ទម្រង់ដែលអ្នកឃើញនៅទូទាំងតារាងធាតុខួប។ អានពួកវាចំហៀងគ្នា — ទាំងអស់សុទ្ធតែកើតចេញពីរឿងសាមញ្ញដូចគ្នា៖ ស្នូលវិជ្ជមានទាញអេឡិចត្រុងអវិជ្ជមាន។",
            )}
          </p>
        </header>

        {/* ── Three concept cards · CSS Grid · soft blue ─────────── */}
        <div
          role="list"
          aria-label="Atomic structure & periodic trends concepts · គំនិតស្តីពីរចនាសម្ព័ន្ធអាតូម"
          data-testid="grid-concept-cards"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {/* ─── Card 1 · Nucleus as a Magnet (Z_eff) ──────────── */}
          <article
            role="listitem"
            data-testid="card-effective-nuclear-charge"
            className="rounded-2xl border-2 border-sky-200 bg-sky-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow ring-2 ring-sky-200"
                aria-hidden="true"
              >
                <Magnet className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h2
                  className={`text-base sm:text-lg font-bold leading-tight text-sky-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("The Nucleus as a Magnet", "ស្នូលដូចជាមេដែក")}
                </h2>
                <p
                  className={`text-xs font-semibold text-sky-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Effective Nuclear Charge",
                    "បន្ទុកនុយក្លេអ៊ែរមានប្រសិទ្ធភាព",
                  )}{" "}
                  <InlineMath math={"Z_{eff}"} />
                </p>
              </div>
            </div>

            {/* Tiny visual: magnet pulling electron marbles */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-sky-100 to-blue-100 border border-sky-200 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-500 text-white text-xs font-bold shadow">
                +
              </span>
              <span className="text-sky-600 text-lg font-bold">→</span>
              <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm" />
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "The protons in the center act like a magnet pulling on the electron \u201Cmarbles.\u201D As you move right across a row of the periodic table, more protons are added but the electrons stay in the same shell — so the magnet feels stronger and pulls the atom tighter.",
                "ប្រូតុងនៅចំកណ្តាលដើរតួដូចមេដែក ដែលទាញអេឡិចត្រុង \u201Cដូចគ្រាប់សុី\u201D។ ពេលអ្នកផ្លាស់ទីទៅខាងស្តាំតាមជួរនៃតារាងធាតុខួប ប្រូតុងបានបន្ថែមកាន់តែច្រើន ប៉ុន្តែអេឡិចត្រុងនៅសែលដដែល — ដូច្នេះមេដែកមានកម្លាំងកាន់តែខ្លាំង ហើយទាញអាតូមឱ្យតឹងជាងមុន។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-sky-800 bg-white/60 border border-sky-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Rule of thumb:", "ច្បាប់សាមញ្ញ៖")}{" "}
              <span className="font-normal">
                {t(
                  "stronger pull → smaller, tighter atom.",
                  "ការទាញខ្លាំងជាង → អាតូមតូច និងតឹងជាង។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 2 · Atomic Radius ────────────────────────── */}
          <article
            role="listitem"
            data-testid="card-atomic-radius"
            className="rounded-2xl border-2 border-sky-200 bg-sky-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow ring-2 ring-blue-200"
                aria-hidden="true"
              >
                <Maximize2 className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h2
                  className={`text-base sm:text-lg font-bold leading-tight text-sky-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Atomic Radius", "កាំអាតូម")}
                </h2>
                <p
                  className={`text-xs font-semibold text-sky-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "How big the atom is",
                    "តើអាតូមធំប៉ុណ្ណា",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: 3 circles of growing size, then arrow showing shrink right */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-sky-100 to-blue-100 border border-sky-200 flex items-end justify-center gap-2 px-3 pb-2 overflow-hidden"
            >
              <span className="w-3 h-3 rounded-full bg-sky-400 ring-2 ring-sky-200" />
              <span className="w-5 h-5 rounded-full bg-sky-500 ring-2 ring-sky-200" />
              <span className="w-7 h-7 rounded-full bg-sky-600 ring-2 ring-sky-200" />
              <span className="ml-2 text-sky-700 text-xs font-bold">
                ↓ {t("bigger", "ធំជាង")}
              </span>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Going DOWN a column, atoms get larger because each new row adds a brand-new shell of electrons farther from the nucleus. Going RIGHT across a row, atoms get smaller because the stronger nuclear magnet pulls the same shell of electrons in tighter.",
                "ពេលធ្លាក់ចុះតាមជួរឈរ អាតូមកាន់តែធំ ព្រោះជួរថ្មីនីមួយៗបន្ថែមសែលអេឡិចត្រុងថ្មីទាំងស្រុងដែលនៅឆ្ងាយជាងពីស្នូល។ ពេលផ្លាស់ទីទៅស្តាំតាមជួរ អាតូមកាន់តែតូច ព្រោះមេដែកនុយក្លេអ៊ែរដែលខ្លាំងជាងទាញសែលអេឡិចត្រុងដដែលឱ្យតឹងជាងមុន។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-sky-800 bg-white/60 border border-sky-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Rule of thumb:", "ច្បាប់សាមញ្ញ៖")}{" "}
              <span className="font-normal">
                {t(
                  "↓ down a column = bigger · → across a row = smaller.",
                  "↓ ចុះក្រោម = ធំជាង · → ទៅស្តាំ = តូចជាង។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 3 · Electronegativity ────────────────────── */}
          <article
            role="listitem"
            data-testid="card-electronegativity"
            className="rounded-2xl border-2 border-sky-200 bg-sky-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow ring-2 ring-indigo-200"
                aria-hidden="true"
              >
                <Droplet className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h2
                  className={`text-base sm:text-lg font-bold leading-tight text-sky-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Electronegativity", "អេឡិចត្រូអវិជ្ជមាន")}
                </h2>
                <p
                  className={`text-xs font-semibold text-sky-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "An atom\u2019s thirst for electrons",
                    "ការស្រេកឃ្លានអេឡិចត្រុងរបស់អាតូម",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: Fluorine champion */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-sky-100 to-indigo-100 border border-sky-200 flex items-center justify-center gap-3 overflow-hidden"
            >
              <span className="inline-flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-amber-900 font-bold shadow ring-2 ring-yellow-200">
                <span className="text-base leading-none">F</span>
                <span className="text-[8px] leading-none mt-0.5">3.98</span>
              </span>
              <span className="text-indigo-700 text-xs font-bold">
                {t("strongest", "ខ្លាំងបំផុត")}
              </span>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Electronegativity is an atom\u2019s \u201Cthirst\u201D for electrons in a chemical bond. Fluorine (F) is the most electronegative element of all, because it is small AND its nuclear magnet sits very close to the surface — so it grabs shared electrons hardest.",
                "អេឡិចត្រូអវិជ្ជមានគឺជា \u201Cការស្រេកឃ្លាន\u201D អេឡិចត្រុងរបស់អាតូមនៅក្នុងចំណងគីមី។ ហ្វ្លុយអ៊ូរ (F) គឺជាធាតុដែលមានអេឡិចត្រូអវិជ្ជមានខ្លាំងបំផុត ព្រោះវាតូច ហើយមេដែកនុយក្លេអ៊ែររបស់វាស្ថិតនៅជិតផ្ទៃ — ដូច្នេះវាចាប់យកអេឡិចត្រុងរួមគ្នាបានខ្លាំងបំផុត។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-sky-800 bg-white/60 border border-sky-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Rule of thumb:", "ច្បាប់សាមញ្ញ៖")}{" "}
              <span className="font-normal">
                {t(
                  "small atom + close nucleus = thirstiest. F wins.",
                  "អាតូមតូច + ស្នូលជិត = ស្រេកឃ្លានបំផុត។ F ឈ្នះ។",
                )}
              </span>
            </p>
          </article>
        </div>

        {/* ── Periodic-trend summary strip ───────────────────────── */}
        <div className="mt-8 rounded-2xl border-2 border-sky-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2
            className={`text-base sm:text-lg font-bold text-sky-900 mb-3 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "Putting it all together",
              "ដាក់បញ្ចូលគ្នាទាំងអស់",
            )}
          </h2>
          <p
            className={`text-sm sm:text-base text-foreground/85 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "All three trends share one cause: how strongly the nucleus pulls on the outer electrons. Stronger pull means a smaller atom, higher electronegativity, and a tighter grip on its own electrons.",
              "និន្នាការទាំងបីសុទ្ធតែមានហេតុដូចគ្នា៖ កម្លាំងដែលស្នូលទាញអេឡិចត្រុងខាងក្រៅ។ ការទាញខ្លាំងជាងមានន័យថា អាតូមតូចជាង អេឡិចត្រូអវិជ្ជមានខ្ពស់ជាង និងការកាន់អេឡិចត្រុងផ្ទាល់តឹងជាង។",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
