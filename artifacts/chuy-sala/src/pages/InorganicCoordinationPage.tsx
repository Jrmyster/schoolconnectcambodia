import { Link } from "wouter";
import {
  ArrowLeft,
  Anchor,
  Hand,
  Palette,
  Atom,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Inorganic Chemistry 101 · Module 04
 * Coordination Chemistry — គីមីវិទ្យាកូអរដោនេ
 * Soft green accents.
 * ══════════════════════════════════════════════════════════════════════════ */

export function InorganicCoordinationPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 to-background py-8 sm:py-10 px-4 sm:px-6">
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-emerald-200">
              <Atom className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t(
                  "Module 04 · Inorganic Chemistry",
                  "មុខវិជ្ជា ០៤ · គីមីវិទ្យាអសរីរាង្គ",
                )}
              </span>
              <h1
                id="coordination-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-900 ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t(
                  "Coordination Chemistry",
                  "គីមីវិទ្យាកូអរដោនេ",
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
              "A transition metal sits at the heart of a complex like a tiny anchor, while other molecules grip onto it like claws. From the iron in your blood to the green pigment in leaves, coordination chemistry powers the colors and reactions of the living world.",
              "លោហៈអន្តរការចូលគេងនៅបេះដូងនៃកុំផ្លិចហាក់ដូចជាយុថ្កាតូចមួយ ខណៈពេលដែលម៉ូលេគុលដទៃទៀតចាប់វាដូចក្រញាំ។ ពីដែកក្នុងឈាមអ្នក រហូតដល់ពណ៌បៃតងនៃស្លឹកឈើ គីមីវិទ្យាកូអរដោនេជំរុញពណ៌ និងប្រតិកម្មនៃពិភពមានជីវិត។",
            )}
          </p>
        </header>

        {/* ── Three concept cards · CSS Grid · soft green ────────── */}
        <div
          role="list"
          aria-label="Coordination chemistry concepts · គំនិតស្តីពីគីមីវិទ្យាកូអរដោនេ"
          data-testid="grid-concept-cards"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {/* ─── Card 1 · The Metal Trap ───────────────────────── */}
          <article
            role="listitem"
            data-testid="card-metal-trap"
            className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow ring-2 ring-emerald-200"
                aria-hidden="true"
              >
                <Anchor className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h2
                  className={`text-base sm:text-lg font-bold leading-tight text-emerald-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("The Metal Trap", "អន្ទាក់លោហៈ")}
                </h2>
                <p
                  className={`text-xs font-semibold text-emerald-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Transition metals as central anchors",
                    "លោហៈអន្តរការចូលជាយុថ្កាកណ្តាល",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: central metal with surrounding atoms */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 flex items-center justify-center overflow-hidden"
            >
              <div className="relative w-20 h-12">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-600 to-green-700 shadow-md ring-2 ring-white text-[8px] font-bold text-white flex items-center justify-center">
                  Fe
                </span>
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-teal-400 shadow-sm" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-teal-400 shadow-sm" />
                <span className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-400 shadow-sm" />
                <span className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-400 shadow-sm" />
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Transition metals like iron (Fe), copper (Cu), and cobalt (Co) have empty slots in their outer electron shells. They act as central anchors that trap other molecules around them, forming a structure called a coordination complex.",
                "លោហៈអន្តរការចូលដូចជាដែក (Fe) ទង់ដែង (Cu) និងកូបាល់ (Co) មានកន្លែងទំនេរនៅសែលអេឡិចត្រុងខាងក្រៅ។ ពួកវាដើរតួជាយុថ្កាកណ្តាលដែលអន្ទាក់ម៉ូលេគុលដទៃទៀតជុំវិញខ្លួន បង្កើតជារចនាសម្ព័ន្ធហៅថាកុំផ្លិចកូអរដោនេ។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-emerald-800 bg-white/60 border border-emerald-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Common metals:", "លោហៈទូទៅ៖")}{" "}
              <span className="font-normal">
                {t(
                  "Fe, Cu, Co, Ni, Zn, Pt — typically grabbing 4 or 6 partners.",
                  "Fe, Cu, Co, Ni, Zn, Pt — ជាធម្មតាចាប់ដៃគូ ៤ ឬ ៦។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 2 · Ligands ──────────────────────────────── */}
          <article
            role="listitem"
            data-testid="card-ligands"
            className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 text-white shadow ring-2 ring-green-200"
                aria-hidden="true"
              >
                <Hand className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h2
                  className={`text-base sm:text-lg font-bold leading-tight text-emerald-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Ligands", "លីហ្គង់")}
                </h2>
                <p
                  className={`text-xs font-semibold text-emerald-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Claws that grab the metal",
                    "ក្រញាំដែលចាប់លោហៈ",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: hemoglobin-style claw around iron */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-green-100 to-teal-100 border border-emerald-200 flex items-center justify-center overflow-hidden"
            >
              <div className="relative w-20 h-12">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-rose-500 to-red-600 shadow-md ring-2 ring-white text-[7px] font-bold text-white flex items-center justify-center">
                  Fe
                </span>
                <span className="absolute top-0 left-1 w-7 h-2 rounded-full bg-emerald-500/80 rotate-12 shadow-sm" />
                <span className="absolute top-0 right-1 w-7 h-2 rounded-full bg-emerald-500/80 -rotate-12 shadow-sm" />
                <span className="absolute bottom-0 left-1 w-7 h-2 rounded-full bg-emerald-500/80 -rotate-12 shadow-sm" />
                <span className="absolute bottom-0 right-1 w-7 h-2 rounded-full bg-emerald-500/80 rotate-12 shadow-sm" />
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-sm" />
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Ligands are the \u201Cclaws\u201D — molecules or ions that latch onto the central metal by donating a pair of electrons. In your blood, the hemoglobin protein acts as a giant claw holding a single atom of iron, which in turn grabs a molecule of oxygen and carries it to your cells.",
                "លីហ្គង់គឺជា \u201Cក្រញាំ\u201D — ម៉ូលេគុល ឬអ៊ីយ៉ុងដែលចាប់លោហៈកណ្តាលដោយផ្តល់គូអេឡិចត្រុង។ នៅក្នុងឈាមរបស់អ្នក ប្រូតេអ៊ីនហេម៉ូក្លូប៊ីនដើរតួជាក្រញាំយក្សកាន់អាតូមដែកមួយ ដែលរួចហើយចាប់ម៉ូលេគុលអុកស៊ីសែន ហើយដឹកវាទៅកោសិកាអ្នក។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-emerald-800 bg-white/60 border border-emerald-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Real-world claws:", "ក្រញាំក្នុងជីវិតពិត៖")}{" "}
              <span className="font-normal">
                {t(
                  "H\u2082O, NH\u2083, Cl\u207B, CN\u207B, hemoglobin, chlorophyll.",
                  "H\u2082O, NH\u2083, Cl\u207B, CN\u207B, ហេម៉ូក្លូប៊ីន, ក្លរូហ្វីល។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 3 · Crystal Field Theory ─────────────────── */}
          <article
            role="listitem"
            data-testid="card-crystal-field"
            className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow ring-2 ring-teal-200"
                aria-hidden="true"
              >
                <Palette className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h2
                  className={`text-base sm:text-lg font-bold leading-tight text-emerald-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Crystal Field Theory",
                    "ទ្រឹស្តីដែនគ្រីស្តាល់",
                  )}
                </h2>
                <p
                  className={`text-xs font-semibold text-emerald-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Why these complexes are so colorful",
                    "ហេតុអ្វីកុំផ្លិចទាំងនេះមានពណ៌ច្រើនយ៉ាងដូច្នេះ",
                  )}
                </p>
              </div>
            </div>

            {/* Tiny visual: spectrum of bright complex colors */}
            <div
              aria-hidden="true"
              className="relative h-16 mb-3 rounded-lg bg-gradient-to-r from-teal-100 to-emerald-100 border border-emerald-200 flex items-center justify-center gap-1 overflow-hidden px-3"
            >
              <span className="w-7 h-9 rounded-md bg-gradient-to-b from-blue-500 to-blue-700 shadow-sm" />
              <span className="w-7 h-9 rounded-md bg-gradient-to-b from-rose-500 to-red-700 shadow-sm" />
              <span className="w-7 h-9 rounded-md bg-gradient-to-b from-emerald-500 to-green-700 shadow-sm" />
              <span className="w-7 h-9 rounded-md bg-gradient-to-b from-violet-500 to-purple-700 shadow-sm" />
              <span className="w-7 h-9 rounded-md bg-gradient-to-b from-amber-400 to-orange-600 shadow-sm" />
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Transition metal complexes are often dazzlingly colorful — bright blues, deep reds, emerald greens. Why? When ligands attach, they push on the metal\u2019s d-orbitals and force them to split into two energy levels. Electrons jump between these levels by absorbing specific colors of light, and the colors we see are what\u2019s left over.",
                "កុំផ្លិចលោហៈអន្តរការចូលជាញឹកញាប់មានពណ៌ភ្លឺច្បាស់ — ខៀវភ្លឺ ក្រហមដិត បៃតងពេជ្រ។ ហេតុអ្វី? ពេលលីហ្គង់ភ្ជាប់ ពួកវារុញលើ d-អ័រប៊ីតាលរបស់លោហៈ ហើយបង្ខំឱ្យពួកវាបំបែកជាកម្រិតថាមពលពីរ។ អេឡិចត្រុងលោតរវាងកម្រិតទាំងនេះដោយស្រូបពណ៌ពន្លឺជាក់លាក់ ហើយពណ៌ដែលយើងឃើញគឺអ្វីដែលនៅសល់។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-emerald-800 bg-white/60 border border-emerald-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Famous colors:", "ពណ៌ល្បីៗ៖")}{" "}
              <span className="font-normal">
                {t(
                  "Cu(H\u2082O)\u2086²\u207A blue · [Fe(CN)\u2086]³\u207B red · Cr³\u207A emerald.",
                  "Cu(H\u2082O)\u2086²\u207A ខៀវ · [Fe(CN)\u2086]³\u207B ក្រហម · Cr³\u207A បៃតងពេជ្រ។",
                )}
              </span>
            </p>
          </article>
        </div>

        {/* ── Putting it together strip ──────────────────────────── */}
        <div className="mt-8 rounded-2xl border-2 border-emerald-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2
            className={`text-base sm:text-lg font-bold text-emerald-900 mb-3 ${
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
              "Coordination complexes carry oxygen in your blood (heme + Fe), drive photosynthesis in leaves (chlorophyll + Mg), let plants fix nitrogen, deliver chemotherapy drugs (cisplatin + Pt), and color stained glass and gemstones. Wherever you see a vivid color in nature or medicine, a coordination complex is usually behind it.",
              "កុំផ្លិចកូអរដោនេដឹកអុកស៊ីសែនក្នុងឈាមអ្នក (ហែម + Fe) ជំរុញការសំយោគពន្លឺនៅក្នុងស្លឹក (ក្លរូហ្វីល + Mg) អនុញ្ញាតឱ្យរុក្ខជាតិចាប់អាសូត ដឹកថ្នាំព្យាបាលជំងឺមហារីក (cisplatin + Pt) ហើយផ្តល់ពណ៌ដល់កញ្ចក់ប៉ាក់ និងថ្មពេជ្រ។ កន្លែងណាដែលអ្នកឃើញពណ៌ភ្លឺច្បាស់នៅក្នុងធម្មជាតិ ឬឱសថ កុំផ្លិចកូអរដោនេជាធម្មតាស្ថិតនៅពីក្រោយ។",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
