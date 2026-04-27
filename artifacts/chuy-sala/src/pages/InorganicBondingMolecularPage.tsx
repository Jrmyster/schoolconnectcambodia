import { Link } from "wouter";
import { ArrowLeft, Shapes, Orbit, Zap, Combine } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Inorganic Chemistry 101 · Module 02
 * Bonding & Molecular Theory — ទ្រឹស្តីចំណង និងម៉ូលេគុល
 * Soft purple accents.
 * ══════════════════════════════════════════════════════════════════════════ */

export function InorganicBondingMolecularPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/60 to-background py-8 sm:py-10 px-4 sm:px-6">
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-purple-200">
              <Combine className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-purple-700 opacity-80 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Module 02 · Inorganic Chemistry", "មុខវិជ្ជា ០២ · គីមីវិទ្យាអសរីរាង្គ")}
              </span>
              <h1
                id="bonding-molecular-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t(
                  "Bonding & Molecular Theory",
                  "ទ្រឹស្តីចំណង និងម៉ូលេគុល",
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
              "When atoms join to form molecules and solids, three powerful theories — VSEPR, Molecular Orbital (MO), and Band Theory — explain how electrons arrange themselves, what shape the molecule takes, and why some materials conduct electricity.",
              "ពេលអាតូមផ្សំគ្នាបង្កើតជាម៉ូលេគុល និងសារធាតុរឹង ទ្រឹស្តីដ៏មានឥទ្ធិពលបី — VSEPR ម៉ូលេគុលអ័រប៊ីតាល (MO) និងទ្រឹស្តីបាន់ — ពន្យល់ពីរបៀបដែលអេឡិចត្រុងរៀបចំខ្លួន ទម្រង់ដែលម៉ូលេគុលយក និងហេតុអ្វីសារធាតុខ្លះចម្លងអគ្គិសនី។",
            )}
          </p>
        </header>

        {/* ── Three concept cards · CSS Grid · soft purple ───────── */}
        <div
          role="list"
          aria-label="Bonding & molecular theory concepts · គំនិតស្តីពីចំណង និងម៉ូលេគុល"
          data-testid="grid-concept-cards"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {/* ─── Card 1 · VSEPR Theory ─────────────────────────── */}
          <article
            role="listitem"
            data-testid="card-vsepr-theory"
            className="rounded-2xl border-2 border-purple-200 bg-purple-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow ring-2 ring-purple-200"
                aria-hidden="true"
              >
                <Shapes className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h2
                  className={`text-base sm:text-lg font-bold leading-tight text-purple-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("VSEPR Theory", "ទ្រឹស្តី VSEPR")}
                </h2>
                <p
                  className={`text-xs font-semibold text-purple-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Electron-pair repulsion shapes",
                    "ការរុញច្រាននៃគូអេឡិចត្រុង",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: balloons tied together pushing apart */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-purple-100 to-violet-100 border border-purple-200 flex items-center justify-center overflow-hidden"
            >
              <div className="relative w-20 h-12">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-6 rounded-full bg-pink-400 shadow-sm" />
                <span className="absolute bottom-0 left-0 w-5 h-6 rounded-full bg-purple-500 shadow-sm" />
                <span className="absolute bottom-0 right-0 w-5 h-6 rounded-full bg-violet-500 shadow-sm" />
                <span className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900" />
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Electrons hate each other — they all carry a negative charge, so they push as far apart as possible in 3D space. Imagine tying inflated balloons together by their strings: they naturally fan out into specific shapes like Tetrahedral or Linear. Molecules do the same with their electron pairs.",
                "អេឡិចត្រុងស្អប់គ្នា — ពួកវាទាំងអស់មានបន្ទុកអវិជ្ជមាន ដូច្នេះពួកវារុញគ្នាឱ្យឆ្ងាយតាមដែលអាចធ្វើបានក្នុងលំហ ៣ វិមាត្រ។ ស្រមៃថាចងបាឡុងផ្លុំខ្យល់ចូលគ្នាដោយខ្សែអំបោះ៖ ពួកវានឹងកាត់ចេញទៅជាទម្រង់ជាក់លាក់ ដូចជាតេត្រាអ៊ែឌ្រាល ឬលីនេអ៊ែរ។ ម៉ូលេគុលក៏ធ្វើដូចគ្នា ជាមួយនឹងគូអេឡិចត្រុងរបស់វា។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-purple-800 bg-white/60 border border-purple-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Common shapes:", "ទម្រង់ទូទៅ៖")}{" "}
              <span className="font-normal">
                {t(
                  "Linear · Trigonal Planar · Tetrahedral · Bent.",
                  "លីនេអ៊ែរ · ទ្រីហ្គូណាល់ផ្លាណា · តេត្រាអ៊ែឌ្រាល · កោង។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 2 · Molecular Orbital (MO) Theory ────────── */}
          <article
            role="listitem"
            data-testid="card-molecular-orbital"
            className="rounded-2xl border-2 border-purple-200 bg-purple-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow ring-2 ring-violet-200"
                aria-hidden="true"
              >
                <Orbit className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h2
                  className={`text-base sm:text-lg font-bold leading-tight text-purple-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Molecular Orbital (MO) Theory",
                    "ទ្រឹស្តីម៉ូលេគុលអ័រប៊ីតាល (MO)",
                  )}
                </h2>
                <p
                  className={`text-xs font-semibold text-purple-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Electron clouds merge across the whole molecule",
                    "ពពកអេឡិចត្រុងបញ្ចូលគ្នាពេញម៉ូលេគុល",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: two clouds merging into one */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-purple-100 to-fuchsia-100 border border-purple-200 flex items-center justify-center gap-1 overflow-hidden"
            >
              <span className="w-7 h-7 rounded-full bg-purple-400/70 blur-[1px] shadow-sm" />
              <span className="w-9 h-9 rounded-full bg-fuchsia-400/70 blur-[1px] -ml-3 shadow-sm" />
              <span className="w-7 h-7 rounded-full bg-violet-400/70 blur-[1px] -ml-3 shadow-sm" />
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "When atoms bond, their individual electron clouds don\u2019t just touch — they merge to form entirely new \u201Cneighborhoods\u201D called molecular orbitals that span the whole molecule. The electrons no longer belong to one atom; they belong to the whole group.",
                "ពេលអាតូមបង្កើតចំណង ពពកអេឡិចត្រុងនីមួយៗរបស់ពួកវាមិនត្រឹមតែប៉ះគ្នានោះទេ — ពួកវាបញ្ចូលគ្នាបង្កើតជា \u201Cអ្នកជិតខាង\u201D ថ្មីទាំងស្រុងហៅថា ម៉ូលេគុលអ័រប៊ីតាល ដែលលាតសន្ធឹងពេញម៉ូលេគុល។ អេឡិចត្រុងលែងជាកម្មសិទ្ធិរបស់អាតូមតែមួយ — ពួកវាជារបស់ក្រុមទាំងមូល។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-purple-800 bg-white/60 border border-purple-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Two flavors:", "ប្រភេទពីរ៖")}{" "}
              <span className="font-normal">
                {t(
                  "bonding (lower energy, holds atoms together) and antibonding (higher energy).",
                  "ចំណង (ថាមពលទាប រក្សាអាតូមជាប់គ្នា) និងប្រឆាំងចំណង (ថាមពលខ្ពស់ជាង)។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 3 · Band Theory for Solids ───────────────── */}
          <article
            role="listitem"
            data-testid="card-band-theory"
            className="rounded-2xl border-2 border-purple-200 bg-purple-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow ring-2 ring-fuchsia-200"
                aria-hidden="true"
              >
                <Zap className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h2
                  className={`text-base sm:text-lg font-bold leading-tight text-purple-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Band Theory for Solids",
                    "ទ្រឹស្តីបាន់សម្រាប់សារធាតុរឹង",
                  )}
                </h2>
                <p
                  className={`text-xs font-semibold text-purple-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Why metals conduct electricity",
                    "ហេតុអ្វីលោហៈចម្លងអគ្គិសនី",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: highway band with electrons flowing */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 overflow-hidden flex flex-col justify-center px-3 gap-1.5"
            >
              <div className="h-3 rounded-full bg-gradient-to-r from-fuchsia-300 via-purple-400 to-violet-400 shadow-sm relative overflow-hidden">
                <span className="absolute top-1/2 left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow" />
                <span className="absolute top-1/2 left-6 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow" />
                <span className="absolute top-1/2 left-12 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow" />
                <span className="absolute top-1/2 right-2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow" />
              </div>
              <div className="flex items-center justify-between text-[9px] font-bold text-purple-700">
                <span>Cu</span>
                <span>→ →</span>
                <span>Cu</span>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "In a metal, billions of atoms\u2019 orbitals merge into a massive \u201Chighway\u201D called a band. Electrons can drive freely from one side of a copper wire to the other — that\u2019s why metals conduct electricity. Insulators have no such highway; semiconductors have a small gap to jump.",
                "នៅក្នុងលោហៈ អ័រប៊ីតាលរបស់អាតូមរាប់ពាន់លានបញ្ចូលគ្នាជា \u201Cផ្លូវហាយវ៉េ\u201D យក្ស ហៅថា បាន់។ អេឡិចត្រុងអាចបើកបរដោយសេរីពីម្ខាងនៃខ្សែទង់ដែងទៅម្ខាងទៀត — នេះហើយជាមូលហេតុដែលលោហៈចម្លងអគ្គិសនី។ សារធាតុអ៊ីសូឡង់គ្មានផ្លូវហាយវ៉េបែបនេះទេ ហើយឆ្នុះវិញ្ញាណ (semiconductor) មានចន្លោះតូចមួយដែលត្រូវលោត។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-purple-800 bg-white/60 border border-purple-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Three families:", "ត្រកូលបី៖")}{" "}
              <span className="font-normal">
                {t(
                  "metal (free highway) · semiconductor (small gap) · insulator (huge gap).",
                  "លោហៈ (ផ្លូវសេរី) · ឆ្នុះវិញ្ញាណ (ចន្លោះតូច) · អ៊ីសូឡង់ (ចន្លោះធំ)។",
                )}
              </span>
            </p>
          </article>
        </div>

        {/* ── Tying it together strip ────────────────────────────── */}
        <div className="mt-8 rounded-2xl border-2 border-purple-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2
            className={`text-base sm:text-lg font-bold text-purple-900 mb-3 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "From shape to current",
              "ពីទម្រង់ទៅចរន្ត",
            )}
          </h2>
          <p
            className={`text-sm sm:text-base text-foreground/85 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "VSEPR tells you the 3D shape of a single molecule. MO Theory tells you where its electrons actually live. Band Theory zooms out to billions of atoms and explains why a copper wire glows when you flip a switch.",
              "VSEPR ប្រាប់អ្នកពីទម្រង់ ៣ វិមាត្ររបស់ម៉ូលេគុលមួយ។ ទ្រឹស្តី MO ប្រាប់អ្នកថាអេឡិចត្រុងរបស់វារស់នៅឯណាពិតប្រាកដ។ ទ្រឹស្តីបាន់ពង្រីកការមើលទៅកាន់អាតូមរាប់ពាន់លាន ហើយពន្យល់ហេតុអ្វីខ្សែទង់ដែងភ្លឺ ពេលអ្នកបើកកុងតាក់។",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
