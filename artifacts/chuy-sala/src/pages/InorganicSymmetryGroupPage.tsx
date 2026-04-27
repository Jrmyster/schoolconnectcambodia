import { Link } from "wouter";
import {
  ArrowLeft,
  Hexagon,
  RotateCw,
  FlipHorizontal,
  Crosshair,
  Sigma,
} from "lucide-react";
import { InlineMath } from "react-katex";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { SymmetrySpinner } from "@/components/SymmetrySpinner";

/* ══════════════════════════════════════════════════════════════════════════
 * Inorganic Chemistry 101 · Module 03
 * Symmetry and Group Theory — ទ្រឹស្តីស៊ីមេទ្រី និងក្រុម
 * Soft pink accents. Includes placeholder boxes for future 3D molecule models.
 * ══════════════════════════════════════════════════════════════════════════ */

export function InorganicSymmetryGroupPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/60 to-background py-8 sm:py-10 px-4 sm:px-6">
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow ring-2 ring-pink-200">
              <Hexagon className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-pink-700 opacity-80 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t(
                  "Module 03 · Inorganic Chemistry",
                  "មុខវិជ្ជា ០៣ · គីមីវិទ្យាអសរីរាង្គ",
                )}
              </span>
              <h1
                id="symmetry-group-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold text-pink-900 ${
                  kh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t(
                  "Symmetry and Group Theory",
                  "ទ្រឹស្តីស៊ីមេទ្រី និងក្រុម",
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
              "Symmetry is more than aesthetic — it is the mathematical fingerprint of every molecule. Group Theory turns those fingerprints into rules we can use to predict spectra, magnetism, and reactivity.",
              "ស៊ីមេទ្រីមិនមែនត្រឹមតែសម្រាប់សោភ័ណភាពនោះទេ — វាគឺជាស្នាមម្រាមដៃគណិតវិទ្យានៃម៉ូលេគុលនីមួយៗ។ ទ្រឹស្តីក្រុមបង្វែរស្នាមម្រាមដៃទាំងនោះទៅជាច្បាប់ ដែលយើងអាចប្រើដើម្បីព្យាករណ៍ស្ប៉ិចត្រ ម៉ាញេទិច និងប្រតិកម្ម។",
            )}
          </p>
        </header>

        {/* ── The Mathematics of Shape (intro card) ──────────────── */}
        <section
          data-testid="section-math-of-shape"
          className="mb-6 rounded-2xl border-2 border-pink-200 bg-pink-50/80 p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow ring-2 ring-rose-200"
              aria-hidden="true"
            >
              <Sigma className="w-5 h-5" strokeWidth={2.25} />
            </span>
            <div className="flex-1 min-w-0">
              <h2
                className={`text-lg sm:text-xl font-bold leading-tight text-pink-900 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t(
                  "The Mathematics of Shape",
                  "គណិតវិទ្យានៃទម្រង់",
                )}
              </h2>
              <p
                className={`text-xs font-semibold text-pink-700/80 mt-0.5 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t(
                  "Why symmetry deserves its own theory",
                  "ហេតុអ្វីស៊ីមេទ្រីសមនឹងមានទ្រឹស្តីផ្ទាល់ខ្លួន",
                )}
              </p>
            </div>
          </div>
          <p
            className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Group Theory is how chemists use math to describe shapes. If we know a molecule\u2019s exact symmetry, we can predict — without ever touching it — how it will absorb light, respond to magnets, vibrate, and even which reactions are allowed or forbidden.",
              "ទ្រឹស្តីក្រុមគឺជារបៀបដែលអ្នកគីមីវិទ្យាប្រើគណិតវិទ្យាដើម្បីពិពណ៌នាទម្រង់។ ប្រសិនបើយើងដឹងពីស៊ីមេទ្រីពិតប្រាកដនៃម៉ូលេគុលមួយ យើងអាចព្យាករណ៍បាន — ដោយមិនចាំបាច់ប៉ះវាសោះ — ពីរបៀបដែលវាស្រូបពន្លឺ ប្រតិកម្មនឹងមេដែក រំញ័រ និងសូម្បីតែប្រតិកម្មគីមីណាដែលត្រូវបានអនុញ្ញាត ឬហាមឃាត់។",
            )}
          </p>
        </section>

        {/* ── The Symmetry Spinner · interactive 3D demonstrator ── */}
        <div className="mb-6">
          <SymmetrySpinner />
        </div>

        {/* ── Symmetry Operations · 3 cards · CSS Grid · soft pink ─ */}
        <h2
          className={`text-base sm:text-lg font-bold text-pink-900 mb-3 ${
            kh ? "font-khmer" : ""
          }`}
        >
          {t(
            "Symmetry Operations",
            "ប្រតិបត្តិការស៊ីមេទ្រី",
          )}
        </h2>
        <div
          role="list"
          aria-label="Symmetry operations · ប្រតិបត្តិការស៊ីមេទ្រី"
          data-testid="grid-concept-cards"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {/* ─── Card 1 · Rotation Axis (C_n) ──────────────────── */}
          <article
            role="listitem"
            data-testid="card-rotation-axis"
            className="rounded-2xl border-2 border-pink-200 bg-pink-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow ring-2 ring-pink-200"
                aria-hidden="true"
              >
                <RotateCw className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold leading-tight text-pink-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Rotation Axis", "អ័ក្សវិល")}{" "}
                  <InlineMath math={"C_{n}"} />
                </h3>
                <p
                  className={`text-xs font-semibold text-pink-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Spin like a wheel", "បង្វិលដូចកង់")}
                </p>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Spin a molecule like a wheel around an imaginary axis. If it looks exactly the same after the spin, it has rotational symmetry. A C\u2082 axis means it matches after a 180° turn; C\u2083 after 120°; C\u2086 after 60°.",
                "បង្វិលម៉ូលេគុលដូចកង់ជុំវិញអ័ក្សស្រមៃ។ ប្រសិនបើវាមើលទៅដូចគ្នាពិតប្រាកដបន្ទាប់ពីការវិល វាមានស៊ីមេទ្រីវិល។ អ័ក្ស C\u2082 មានន័យថាវាដូចគ្នាបន្ទាប់ពីបង្វិល ១៨០° · C\u2083 បន្ទាប់ពី ១២០° · C\u2086 បន្ទាប់ពី ៦០°។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-pink-800 bg-white/60 border border-pink-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Example:", "ឧទាហរណ៍៖")}{" "}
              <span className="font-normal">
                {t(
                  "water (H\u2082O) has a C\u2082 axis through the oxygen.",
                  "ទឹក (H\u2082O) មានអ័ក្ស C\u2082 ឆ្លងកាត់អុកស៊ីសែន។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 2 · Mirror Plane (σ) ─────────────────────── */}
          <article
            role="listitem"
            data-testid="card-mirror-plane"
            className="rounded-2xl border-2 border-pink-200 bg-pink-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white shadow ring-2 ring-rose-200"
                aria-hidden="true"
              >
                <FlipHorizontal className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold leading-tight text-pink-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Mirror Plane", "ឆ្លុះប្លង់")}{" "}
                  <InlineMath math={"\\sigma"} />
                </h3>
                <p
                  className={`text-xs font-semibold text-pink-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Cut it in half · perfect reflection",
                    "កាត់វាជាពីរ · ឆ្លុះបញ្ចាំងពេញលេញ",
                  )}
                </p>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Slice the molecule in half with an imaginary plane. If the left side is a perfect reflection of the right side, that plane is a mirror plane (\u03c3). A molecule can have several — vertical (\u03c3\u1d65), horizontal (\u03c3\u2095), or diagonal (\u03c3\u1d05).",
                "កាត់ម៉ូលេគុលជាពីរដោយប្លង់ស្រមៃ។ ប្រសិនបើផ្នែកខាងឆ្វេងគឺជាការឆ្លុះបញ្ចាំងពេញលេញនៃផ្នែកខាងស្តាំ ប្លង់នោះជាប្លង់ឆ្លុះ (\u03c3)។ ម៉ូលេគុលមួយអាចមានច្រើន — បញ្ឈរ (\u03c3\u1d65) ផ្តេក (\u03c3\u2095) ឬទ្រេត (\u03c3\u1d05)។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-pink-800 bg-white/60 border border-pink-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Example:", "ឧទាហរណ៍៖")}{" "}
              <span className="font-normal">
                {t(
                  "ammonia (NH\u2083) has 3 vertical mirror planes.",
                  "អាម៉ូញ៉ាក់ (NH\u2083) មានប្លង់ឆ្លុះបញ្ឈរ ៣។",
                )}
              </span>
            </p>
          </article>

          {/* ─── Card 3 · Inversion Center (i) ─────────────────── */}
          <article
            role="listitem"
            data-testid="card-inversion-center"
            className="rounded-2xl border-2 border-pink-200 bg-pink-50/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow ring-2 ring-fuchsia-200"
                aria-hidden="true"
              >
                <Crosshair className="w-5 h-5" strokeWidth={2.25} />
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold leading-tight text-pink-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Inversion Center", "ចំណុចបញ្ច្រាស")}{" "}
                  <InlineMath math={"i"} />
                </h3>
                <p
                  className={`text-xs font-semibold text-pink-700/80 mt-0.5 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Flip every atom through dead center",
                    "ត្រឡប់រាល់អាតូមឆ្លងកាត់ចំណុចកណ្តាល",
                  )}
                </p>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed text-foreground/85 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Find the dead center of the molecule and flip every atom through it — top becomes bottom, left becomes right, front becomes back. If the molecule looks identical afterwards, it has an inversion center (i).",
                "រកចំណុចកណ្តាលនៃម៉ូលេគុល ហើយត្រឡប់រាល់អាតូមឆ្លងកាត់វា — ខាងលើទៅខាងក្រោម ឆ្វេងទៅស្តាំ មុខទៅក្រោយ។ ប្រសិនបើម៉ូលេគុលមើលទៅដូចគ្នាបន្ទាប់ពីនោះ វាមានចំណុចបញ្ច្រាស (i)។",
              )}
            </p>

            <p
              className={`mt-3 text-xs font-semibold text-pink-800 bg-white/60 border border-pink-200 rounded-lg px-3 py-2 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t("Example:", "ឧទាហរណ៍៖")}{" "}
              <span className="font-normal">
                {t(
                  "benzene (C\u2086H\u2086) and SF\u2086 both have an inversion center.",
                  "បេនហ្សែន (C\u2086H\u2086) និង SF\u2086 ទាំងពីរមានចំណុចបញ្ច្រាស។",
                )}
              </span>
            </p>
          </article>
        </div>

        {/* ── Why it matters strip ───────────────────────────────── */}
        <div className="mt-8 rounded-2xl border-2 border-pink-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2
            className={`text-base sm:text-lg font-bold text-pink-900 mb-3 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "Why chemists care",
              "ហេតុអ្វីអ្នកគីមីវិទ្យាយកចិត្តទុកដាក់",
            )}
          </h2>
          <p
            className={`text-sm sm:text-base text-foreground/85 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Once you list every symmetry operation a molecule obeys, you have its \u201Cpoint group.\u201D Group Theory then tells you which vibrations show up in IR spectra, which transitions appear in UV-Vis, whether the molecule is polar, and even whether it can be optically active.",
              "នៅពេលអ្នករាប់រាល់ប្រតិបត្តិការស៊ីមេទ្រីដែលម៉ូលេគុលមួយគោរព អ្នកមាន \u201Cក្រុមចំណុច\u201D របស់វា។ ទ្រឹស្តីក្រុមបន្ទាប់មកប្រាប់អ្នកថា រំញ័រណាខ្លះបង្ហាញនៅក្នុងស្ប៉ិចត្រ IR ការផ្លាស់ប្តូរណាខ្លះលេចឡើងនៅ UV-Vis តើម៉ូលេគុលមានប៉ូល ហើយសូម្បីតែថាតើវាអាចសកម្មអុបទិកដែរឬទេ។",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
