import { Link } from "wouter";
import {
  ArrowLeft,
  Atom,
  Waves,
  Eye,
  EyeOff,
  Sparkles,
  Radio,
  Sigma,
  AlertTriangle,
} from "lucide-react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  The Double-Slit Experiment: Reality is Broken
//  ការពិសោធន៍ចន្លោះពីរ៖ ភាពពិតត្រូវបានបំបែក
//
//  A conceptual deep-dive within Module 4 (Waves, Sound & Light).
//  Aesthetic: deep space black + neon wave blue + glowing particle green.
//
//  Cards:
//    1. The Marbles and the Water — classical setup + fringe-spacing math
//    2. Light is a Wave — Thomas Young's 1801 experiment
//    3. The Quantum Observer — single electrons + observation collapse
// ════════════════════════════════════════════════════════════════════════════

export default function DoubleSlitPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = (en: string, kh: string) => (isKh ? kh : en);

  return (
    <div className="min-h-screen relative text-slate-100 bg-black overflow-hidden">
      <ScopedStyles />
      <QuantumBg />

      {/* ── Top: Back link ──────────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/physics/waves"
          className={`inline-flex items-center gap-1.5 text-cyan-300/80 hover:text-cyan-200 text-sm font-medium ${
            isKh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Waves, Sound & Light", "ត្រឡប់ទៅរលក សំឡេង និងពន្លឺ")}
        </Link>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/40 text-emerald-200 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.25)] backdrop-blur-sm">
          <Atom className="w-3.5 h-3.5" />
          {t("Module 04 · Quantum Deep-Dive", "ម៉ូឌុល ០៤ · ឯកទេសកង់ទិច")}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>
              ការពិសោធន៍ចន្លោះពីរ៖{" "}
              <span className="ds-text-glow">ភាពពិតត្រូវបានបំបែក</span>
            </>
          ) : (
            <>
              The Double-Slit Experiment:{" "}
              <span className="ds-text-glow">Reality is Broken</span>
            </>
          )}
        </h1>
        <p
          className={`text-slate-300 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {t(
            "One simple experiment with two slits has confused — and amazed — physicists for over 200 years. By the end of this module, you will understand why some scientists say that the universe only finishes deciding what is real once we look.",
            "ការពិសោធន៍សាមញ្ញមួយដែលមានចន្លោះពីរ បានធ្វើឲ្យអ្នករូបវិទ្យាច្រឡំ — និងភ្ញាក់ផ្អើល — អស់រយៈពេលជាង ២០០ ឆ្នាំមកហើយ។ នៅចុងបញ្ចប់នៃម៉ូឌុលនេះ អ្នកនឹងយល់ពីមូលហេតុដែលអ្នកវិទ្យាសាស្ត្រខ្លះនិយាយថា សកលលោកគ្រាន់តែសម្រេចថាអ្វីពិតៗបន្ទាប់ពីយើងមើលប៉ុណ្ណោះ។",
          )}
        </p>

        <div className="hidden sm:flex absolute top-4 right-8 items-center gap-3 select-none">
          <Waves className="w-7 h-7 text-cyan-300/70 ds-pulse" style={{ animationDelay: "0s" }} />
          <Atom className="w-7 h-7 text-emerald-300/70 ds-pulse" style={{ animationDelay: "0.6s" }} />
          <Radio className="w-7 h-7 text-cyan-300/60 ds-pulse" style={{ animationDelay: "1.2s" }} />
        </div>
      </header>

      {/* ── Card 1: Marbles & Water ─────────────────────────────────── */}
      <section
        id="card-marbles-water"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <DSCard
          eyebrowEn="Card 01 · The Setup"
          eyebrowKh="កាត ០១ · ការដំឡើង"
          icon={Atom}
          accent="emerald"
          titleEn="The Marbles and the Water"
          titleKh="គ្រាប់ឃ្លី និងទឹក"
          isKh={isKh}
        >
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {/* Marbles */}
            <div className="ds-panel rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="ds-chip ds-chip-emerald">
                  <Atom className="w-4 h-4" />
                </div>
                <h4
                  className={`text-emerald-200 font-bold text-sm uppercase tracking-widest ${
                    isKh ? "font-khmer tracking-normal normal-case" : ""
                  }`}
                >
                  {t("Marbles → 2 lines", "គ្រាប់ឃ្លី → ២ ខ្សែ")}
                </h4>
              </div>
              <p
                className={`text-slate-300 text-sm ${
                  isKh ? "font-khmer leading-loose" : "leading-relaxed"
                }`}
              >
                {t(
                  "Shoot solid marbles through two vertical slits in a wall and what hits the screen behind it? Two distinct stripes, exactly opposite the two openings. Particles act like particles — predictable, common-sense, every single time.",
                  "បាញ់គ្រាប់ឃ្លីរឹងកាត់ចន្លោះបញ្ឈរពីរនៅលើជញ្ជាំង — តើអ្វីដែលប៉ះអេក្រង់ខាងក្រោយ? ខ្សែពីរច្បាស់លាស់ ស្ថិតទល់មុខនឹងចន្លោះទាំងពីរ។ ភាគល្អិតធ្វើដូចភាគល្អិត — ដឹងមុន សមហេតុផល គ្រប់ដង។",
                )}
              </p>
              <MarblesSvg />
            </div>

            {/* Water waves */}
            <div className="ds-panel rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="ds-chip ds-chip-cyan">
                  <Waves className="w-4 h-4" />
                </div>
                <h4
                  className={`text-cyan-200 font-bold text-sm uppercase tracking-widest ${
                    isKh ? "font-khmer tracking-normal normal-case" : ""
                  }`}
                >
                  {t("Water → many lines", "ទឹក → ខ្សែច្រើន")}
                </h4>
              </div>
              <p
                className={`text-slate-300 text-sm ${
                  isKh ? "font-khmer leading-loose" : "leading-relaxed"
                }`}
              >
                {t(
                  "Push a water wave through the same two slits and you get something completely different: a beautiful pattern of many bright bands separated by dark gaps. Where two crests meet they reinforce; where a crest meets a trough they cancel. This is an interference pattern — the unmistakable fingerprint of a wave.",
                  "បញ្ជូនរលកទឹកកាត់ចន្លោះពីរដដែល អ្នកនឹងទទួលបានរឿងផ្សេងគ្នាទាំងស្រុង៖ លំនាំស្អាតនៃខ្សែភ្លឺៗច្រើនដែលបំបែកដោយចន្លោះងងឹត។ កន្លែងដែលកំពូលរលកពីរជួបគ្នា ពួកវាបង្កើនកម្លាំង; កន្លែងដែលកំពូលជួបជ្រលង ពួកវាបាត់។ នេះគឺ លំនាំជ្រៀតជ្រែក — ស្នាមដៃច្បាស់លាស់នៃរលក។",
                )}
              </p>
              <WaterWavesSvg />
            </div>
          </div>

          {/* The math */}
          <div className="ds-panel ds-panel-glow rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sigma className="w-5 h-5 text-cyan-300" />
              <h4
                className={`text-cyan-200 font-bold text-sm uppercase tracking-widest ${
                  isKh ? "font-khmer tracking-normal normal-case" : ""
                }`}
              >
                {t("The Math · Fringe Spacing", "គណិតវិទ្យា · ចន្លោះខ្សែ")}
              </h4>
            </div>
            <p
              className={`text-slate-300 text-sm mb-4 ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {t(
                "The distance between the bright bands on the screen depends on three things — the wavelength of the light, how far the screen sits from the slits, and how close the two slits are to each other:",
                "ចម្ងាយរវាងខ្សែភ្លឺៗនៅលើអេក្រង់ អាស្រ័យលើរបស់បីយ៉ាង — រលកប្រវែងនៃពន្លឺ ចម្ងាយពីចន្លោះទៅអេក្រង់ និងចម្ងាយរវាងចន្លោះទាំងពីរ៖",
              )}
            </p>
            <div className="ds-math-frame rounded-lg p-4 overflow-x-auto">
              <BlockMath math={String.raw`\Delta y = \frac{\lambda \, L}{d}`} />
            </div>
            <ul className={`mt-4 grid sm:grid-cols-3 gap-2 text-xs ${isKh ? "font-khmer" : ""}`}>
              <li className="ds-formula-leg">
                <span className="text-cyan-300 font-mono font-bold">Δy</span>{" "}
                <span className="text-slate-300">{t("= fringe spacing", "= ចន្លោះខ្សែ")}</span>
              </li>
              <li className="ds-formula-leg">
                <span className="text-cyan-300 font-mono font-bold">λ</span>{" "}
                <span className="text-slate-300">{t("= wavelength of light", "= រលកប្រវែងនៃពន្លឺ")}</span>
              </li>
              <li className="ds-formula-leg">
                <span className="text-cyan-300 font-mono font-bold">L</span>{" "}
                <span className="text-slate-300">{t("= distance to screen", "= ចម្ងាយដល់អេក្រង់")}</span>
              </li>
              <li className="ds-formula-leg sm:col-span-3">
                <span className="text-cyan-300 font-mono font-bold">d</span>{" "}
                <span className="text-slate-300">{t("= separation between the two slits", "= ចម្ងាយរវាងចន្លោះទាំងពីរ")}</span>
              </li>
            </ul>
          </div>
        </DSCard>
      </section>

      {/* ── Card 2: Light is a Wave (Young 1801) ───────────────────── */}
      <section
        id="card-young"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <DSCard
          eyebrowEn="Card 02 · The Discovery"
          eyebrowKh="កាត ០២ · ការរកឃើញ"
          icon={Waves}
          accent="cyan"
          titleEn="Light is a Wave"
          titleKh="ពន្លឺគឺជារលក"
          isKh={isKh}
        >
          <div className="grid md:grid-cols-[1fr,260px] gap-6 items-start">
            <div>
              <p
                className={`text-slate-300 text-sm mb-4 ${
                  isKh ? "font-khmer leading-loose" : "leading-relaxed"
                }`}
              >
                {t(
                  "In 1801, Thomas Young in London tried the experiment with a single beam of light. If light were made of marble-like particles, he should have seen two stripes. Instead — he saw a sprawling interference pattern. Bright. Dark. Bright. Dark. Stretching far past the slits.",
                  "នៅឆ្នាំ ១៨០១ លោក Thomas Young នៅទីក្រុង London បានព្យាយាមធ្វើពិសោធន៍ដោយប្រើធ្នឹមពន្លឺមួយ។ ប្រសិនបើពន្លឺផ្សំឡើងពីភាគល្អិតដូចគ្រាប់ឃ្លី គាត់គួរតែមើលឃើញខ្សែពីរ។ ផ្ទុយទៅវិញ — គាត់បានឃើញលំនាំជ្រៀតជ្រែកដ៏ធំ។ ភ្លឺ។ ងងឹត។ ភ្លឺ។ ងងឹត។ លាតសន្ធឹងហួសពីចន្លោះ។",
                )}
              </p>
              <p
                className={`text-slate-300 text-sm mb-5 ${
                  isKh ? "font-khmer leading-loose" : "leading-relaxed"
                }`}
              >
                {t(
                  "That single observation settled the argument: for the next hundred years and more, every physicist agreed that light was a wave, not a particle. The interference pattern was the proof — and Young's two slits became one of the most famous experiments in the history of science.",
                  "ការសង្កេតតែមួយនោះបានដោះស្រាយការជជែកវែកញែក៖ សម្រាប់រយៈពេលមួយរយឆ្នាំ និងច្រើនជាងនោះ រាល់អ្នករូបវិទ្យាបានយល់ព្រមថា ពន្លឺគឺជារលក មិនមែនជាភាគល្អិតទេ។ លំនាំជ្រៀតជ្រែកគឺជាភ័ស្តុតាង — ហើយចន្លោះពីររបស់ Young បានក្លាយជាការពិសោធន៍ដ៏ល្បីមួយក្នុងប្រវត្តិសាស្ត្រវិទ្យាសាស្ត្រ។",
                )}
              </p>

              <div className="flex flex-wrap gap-2">
                <Tag color="cyan" labelEn="Thomas Young · 1801" labelKh="Thomas Young · ១៨០១" isKh={isKh} />
                <Tag color="cyan" labelEn="Wave theory wins" labelKh="ទ្រឹស្តីរលកឈ្នះ" isKh={isKh} />
                <Tag color="cyan" labelEn="100+ years of consensus" labelKh="មតិស្រុះស្រួលជាង ១០០ ឆ្នាំ" isKh={isKh} />
              </div>
            </div>

            <DoubleSlitInterferenceSvg />
          </div>
        </DSCard>
      </section>

      {/* ── Card 3: The Quantum Observer ───────────────────────────── */}
      <section
        id="card-quantum-observer"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24"
      >
        <DSCard
          eyebrowEn="Card 03 · Reality Breaks"
          eyebrowKh="កាត ០៣ · ភាពពិតបំបែក"
          icon={Atom}
          accent="emerald"
          titleEn="The Quantum Observer"
          titleKh="អ្នកសង្កេតការណ៍កង់ទិច"
          isKh={isKh}
        >
          {/* The Mind-Bender */}
          <div className="ds-panel ds-panel-glow rounded-xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <h4
                className={`text-emerald-200 font-bold text-sm uppercase tracking-widest ${
                  isKh ? "font-khmer tracking-normal normal-case" : ""
                }`}
              >
                {t("The Mind-Bender", "រឿងគួរឲ្យឆ្ងល់")}
              </h4>
            </div>
            <p
              className={`text-slate-300 text-sm mb-3 ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {t(
                "A modern version of the experiment fires single electrons — real, solid particles — through the slits one at a time. After enough electrons land on the screen, what builds up?",
                "កំណែទំនើបនៃការពិសោធន៍ បាញ់អេឡិចត្រុងតែមួយ — ភាគល្អិតពិត រឹង — កាត់ចន្លោះម្ដងមួយ។ បន្ទាប់ពីអេឡិចត្រុងគ្រប់គ្រាន់ប៉ះអេក្រង់ តើមានអ្វីបង្កើតឡើង?",
              )}
            </p>
            <p
              className={`text-emerald-100 text-sm font-semibold mb-3 ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {t(
                "An interference pattern. The same wavy fingerprint as the water.",
                "លំនាំជ្រៀតជ្រែក។ ស្នាមដៃរលកដូចគ្នាបេះបិទនឹងទឹក។",
              )}
            </p>
            <p
              className={`text-slate-300 text-sm ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {t(
                "Each electron is somehow going through both slits at once — and interfering with itself on the way. There is nothing in classical physics that can explain this.",
                "អេឡិចត្រុងនីមួយៗធ្វើដំណើរកាត់ចន្លោះទាំងពីរក្នុងពេលតែមួយ — ហើយជ្រៀតជ្រែកជាមួយខ្លួនវាផ្ទាល់នៅតាមផ្លូវ។ គ្មានអ្វីនៅក្នុងរូបវិទ្យាបុរាណអាចពន្យល់រឿងនេះបានទេ។",
              )}
            </p>
          </div>

          {/* The Collapse — observation breaks reality */}
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <ObserverPanel
              icon={EyeOff}
              accent="emerald"
              modeEn="No Detector"
              modeKh="គ្មានឧបករណ៍សង្កេត"
              resultEn="Wave pattern · interference"
              resultKh="លំនាំរលក · ជ្រៀតជ្រែក"
              bodyEn="Without a detector at the slits, the electron behaves like a wave. Many bright bands. The universe is uncertain — every possible path is alive at once."
              bodyKh="នៅពេលគ្មានឧបករណ៍សង្កេតនៅឯចន្លោះ អេឡិចត្រុងធ្វើដូចជារលក។ ខ្សែភ្លឺច្រើន។ សកលលោកមិនច្បាស់លាស់ — រាល់ផ្លូវដែលអាចមានទាំងអស់ មានជីវិតក្នុងពេលតែមួយ។"
              isKh={isKh}
            />
            <ObserverPanel
              icon={Eye}
              accent="rose"
              modeEn="Detector Watching"
              modeKh="ឧបករណ៍សង្កេតមើល"
              resultEn="Particle pattern · two stripes"
              resultKh="លំនាំភាគល្អិត · ខ្សែពីរ"
              bodyEn="Place a detector at the slits to record which one each electron passes through — and the wave pattern collapses. The electrons go right back to behaving like marbles. Two stripes. The interference is gone."
              bodyKh="ដាក់ឧបករណ៍សង្កេតនៅឯចន្លោះដើម្បីកត់ត្រាថា អេឡិចត្រុងនីមួយៗឆ្លងកាត់មួយណា — ហើយលំនាំរលកនឹងបាក់។ អេឡិចត្រុងនឹងត្រឡប់ទៅធ្វើដូចគ្រាប់ឃ្លីវិញ។ ខ្សែពីរ។ ជ្រៀតជ្រែកបាត់ហើយ។"
              isKh={isKh}
            />
          </div>

          {/* Closing — the punch line */}
          <div className="relative ds-panel rounded-xl p-5 border-l-4 border-emerald-400 ds-glow-line">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-emerald-300 mt-0.5 flex-shrink-0" />
              <div>
                <h4
                  className={`text-emerald-200 font-bold text-sm uppercase tracking-widest mb-2 ${
                    isKh ? "font-khmer tracking-normal normal-case" : ""
                  }`}
                >
                  {t("Reality is Broken", "ភាពពិតត្រូវបានបំបែក")}
                </h4>
                <p
                  className={`text-slate-200 text-sm ${
                    isKh ? "font-khmer leading-loose" : "leading-relaxed"
                  }`}
                >
                  {t(
                    "The very act of observing the territory changes the territory. Reality at the smallest scales does not exist as one fixed answer until something measures it. This is not a metaphor — it is a measurable, repeatable, deeply weird fact about our universe. The double-slit experiment is reality whispering: you are part of the picture.",
                    "ការសង្កេតដែនដីដោយខ្លួនឯង ផ្លាស់ប្ដូរដែនដី។ ភាពពិតនៅខ្នាតតូចបំផុត មិនមាននៅជាចម្លើយតែមួយដែលច្បាស់លាស់ទេ រហូតទាល់តែមានអ្វីមួយវាស់វា។ នេះមិនមែនជាការប្រៀបធៀបទេ — វាគឺជាការពិតដែលអាចវាស់បាន អាចធ្វើម្ដងហើយម្ដងទៀត និងចម្លែកយ៉ាងជ្រៅអំពីសកលលោករបស់យើង។ ការពិសោធន៍ចន្លោះពីរ គឺជាសំឡេងខ្សឹបនៃភាពពិត៖ អ្នកគឺជាផ្នែកមួយនៃរូបភាព។",
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Pull quote */}
          <p
            className={`mt-6 text-cyan-200/80 text-sm italic max-w-3xl ${
              isKh ? "font-khmer not-italic leading-loose" : ""
            }`}
          >
            {t(
              "“If you think you understand quantum mechanics, you don't understand quantum mechanics.” — Richard Feynman",
              "“បើអ្នកគិតថាអ្នកយល់មេកានិចកង់ទិច អ្នកមិនយល់មេកានិចកង់ទិចទេ។” — Richard Feynman",
            )}
          </p>
        </DSCard>
      </section>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center text-slate-500 text-xs">
        <Link
          href="/physics/waves"
          className={`inline-flex items-center gap-1.5 text-cyan-400/70 hover:text-cyan-300 ${
            isKh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t("Back to Waves, Sound & Light", "ត្រឡប់ទៅរលក សំឡេង និងពន្លឺ")}
        </Link>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable building blocks (scoped)
// ════════════════════════════════════════════════════════════════════════════

type Accent = "cyan" | "emerald" | "rose";

function DSCard({
  eyebrowEn,
  eyebrowKh,
  icon: Icon,
  accent,
  titleEn,
  titleKh,
  isKh,
  children,
}: {
  eyebrowEn: string;
  eyebrowKh: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: Accent;
  titleEn: string;
  titleKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  const accentText =
    accent === "emerald" ? "text-emerald-300/80" : "text-cyan-300/80";
  return (
    <article className="ds-card relative rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className={`ds-chip ${accent === "emerald" ? "ds-chip-emerald" : "ds-chip-cyan"}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`text-xs font-bold tracking-widest uppercase ${accentText} ${
            isKh ? "font-khmer tracking-normal normal-case" : ""
          }`}
        >
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-white mb-5 ${
          isKh ? "font-khmer leading-loose" : ""
        }`}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      {children}
    </article>
  );
}

function ObserverPanel({
  icon: Icon,
  accent,
  modeEn,
  modeKh,
  resultEn,
  resultKh,
  bodyEn,
  bodyKh,
  isKh,
}: {
  icon: React.ComponentType<{ className?: string }>;
  accent: "emerald" | "rose";
  modeEn: string;
  modeKh: string;
  resultEn: string;
  resultKh: string;
  bodyEn: string;
  bodyKh: string;
  isKh: boolean;
}) {
  const accentClass =
    accent === "emerald"
      ? "border-emerald-400/40 ds-glow-emerald"
      : "border-rose-400/40 ds-glow-rose";
  const textClass = accent === "emerald" ? "text-emerald-200" : "text-rose-200";
  return (
    <div className={`ds-panel rounded-xl p-5 border ${accentClass}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-5 h-5 ${textClass}`} />
        <h5 className={`${textClass} font-bold text-sm ${isKh ? "font-khmer" : ""}`}>
          {isKh ? modeKh : modeEn}
        </h5>
      </div>
      <p className={`text-white font-semibold text-xs mb-2 ${isKh ? "font-khmer" : ""}`}>
        → {isKh ? resultKh : resultEn}
      </p>
      <p
        className={`text-slate-300 text-sm ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

function Tag({
  color,
  labelEn,
  labelKh,
  isKh,
}: {
  color: "cyan" | "emerald";
  labelEn: string;
  labelKh: string;
  isKh: boolean;
}) {
  const c =
    color === "emerald"
      ? "bg-emerald-500/15 text-emerald-200 border-emerald-400/30"
      : "bg-cyan-500/15 text-cyan-200 border-cyan-400/30";
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${c} ${
        isKh ? "font-khmer" : ""
      }`}
    >
      {isKh ? labelKh : labelEn}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Background + scoped styles
// ════════════════════════════════════════════════════════════════════════════

function QuantumBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, #050a1a 0%, #02030a 50%, #000000 100%)",
        }}
      />
      {/* Glow blooms */}
      <div className="absolute top-32 -left-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute top-[35%] -right-16 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      {/* Faint dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(125, 211, 252, 0.5) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
    </div>
  );
}

function ScopedStyles() {
  return (
    <style>{`
      .ds-text-glow {
        color: #6ee7b7;
        text-shadow: 0 0 24px rgba(16, 185, 129, 0.55), 0 0 60px rgba(16, 185, 129, 0.18);
      }
      .ds-card {
        background: linear-gradient(180deg, rgba(8, 12, 24, 0.78) 0%, rgba(0, 0, 0, 0.78) 100%);
        border: 1px solid rgba(34, 211, 238, 0.18);
        box-shadow: 0 0 0 1px rgba(0,0,0,0.5), 0 30px 60px -30px rgba(34, 211, 238, 0.18);
        backdrop-filter: blur(8px);
      }
      .ds-panel {
        background: rgba(2, 6, 23, 0.55);
        border: 1px solid rgba(125, 211, 252, 0.18);
      }
      .ds-panel-glow {
        box-shadow: 0 0 40px -10px rgba(34, 211, 238, 0.30), 0 0 0 1px rgba(34, 211, 238, 0.18) inset;
      }
      .ds-glow-emerald {
        box-shadow: 0 0 30px -8px rgba(16, 185, 129, 0.45);
      }
      .ds-glow-rose {
        box-shadow: 0 0 30px -8px rgba(244, 63, 94, 0.40);
      }
      .ds-glow-line {
        box-shadow: -3px 0 30px -8px rgba(16, 185, 129, 0.55);
      }
      .ds-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px; height: 36px;
        border-radius: 10px;
      }
      .ds-chip-cyan {
        background: linear-gradient(135deg, rgba(34, 211, 238, 0.22), rgba(14, 165, 233, 0.12));
        border: 1px solid rgba(34, 211, 238, 0.35);
        color: #a5f3fc;
        box-shadow: 0 0 16px rgba(34, 211, 238, 0.25);
      }
      .ds-chip-emerald {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.22), rgba(5, 150, 105, 0.12));
        border: 1px solid rgba(16, 185, 129, 0.40);
        color: #a7f3d0;
        box-shadow: 0 0 16px rgba(16, 185, 129, 0.30);
      }
      .ds-math-frame {
        background: rgba(0, 0, 0, 0.45);
        border: 1px solid rgba(34, 211, 238, 0.25);
        box-shadow: inset 0 0 24px rgba(34, 211, 238, 0.12);
        color: #e2e8f0;
      }
      /* KaTeX inherits from .ds-math-frame text color */
      .ds-math-frame .katex { color: #e0f2fe; }
      .ds-formula-leg {
        background: rgba(2, 6, 23, 0.5);
        border: 1px solid rgba(125, 211, 252, 0.18);
        border-radius: 8px;
        padding: 8px 10px;
      }
      @keyframes dsPulse {
        0%, 100% { opacity: 0.55; transform: translateY(0); }
        50%      { opacity: 1;    transform: translateY(-3px); }
      }
      .ds-pulse {
        animation: dsPulse 3.4s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .ds-pulse { animation: none; }
      }
    `}</style>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tiny illustrative SVGs (low-fidelity, for vibe — not measurements)
// ════════════════════════════════════════════════════════════════════════════

function MarblesSvg() {
  return (
    <svg viewBox="0 0 240 100" className="w-full h-auto max-h-[100px] mt-4" role="img" aria-label="Marbles passing through two slits make two stripes on the screen">
      {/* slit wall */}
      <rect x="90" y="10" width="6" height="22" fill="#94a3b8" />
      <rect x="90" y="40" width="6" height="20" fill="#94a3b8" />
      <rect x="90" y="68" width="6" height="22" fill="#94a3b8" />
      {/* incoming marbles (left) */}
      {[20, 35, 50].map((cx, i) => (
        <circle key={i} cx={cx} cy={36 + i * 12} r="3.5" fill="#a7f3d0" stroke="#34d399" />
      ))}
      {/* trajectories */}
      <line x1="55" y1="36" x2="93" y2="36" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="55" y1="64" x2="93" y2="64" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="96" y1="36" x2="220" y2="36" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="96" y1="64" x2="220" y2="64" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" />
      {/* screen */}
      <rect x="220" y="6" width="6" height="88" fill="#1e293b" stroke="#475569" />
      {/* two stripes on the screen */}
      <rect x="221" y="28" width="4" height="18" fill="#34d399" opacity="0.85" />
      <rect x="221" y="55" width="4" height="18" fill="#34d399" opacity="0.85" />
    </svg>
  );
}

function WaterWavesSvg() {
  return (
    <svg viewBox="0 0 240 100" className="w-full h-auto max-h-[100px] mt-4" role="img" aria-label="Water waves through two slits create an interference pattern">
      {/* slit wall */}
      <rect x="90" y="10" width="6" height="22" fill="#94a3b8" />
      <rect x="90" y="40" width="6" height="20" fill="#94a3b8" />
      <rect x="90" y="68" width="6" height="22" fill="#94a3b8" />
      {/* incoming wavefronts */}
      {[20, 35, 50, 65].map((x, i) => (
        <line key={i} x1={x} y1="10" x2={x} y2="90" stroke="#67e8f9" strokeWidth="1.5" opacity={0.4 + i * 0.1} />
      ))}
      {/* circular wavefronts radiating from each slit */}
      {[25, 45, 65, 85, 105, 125].map((r, i) => (
        <circle key={`u-${i}`} cx="93" cy="48" r={r} fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.45" />
      ))}
      {[25, 45, 65, 85, 105, 125].map((r, i) => (
        <circle key={`l-${i}`} cx="93" cy="78" r={r} fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.45" />
      ))}
      {/* screen */}
      <rect x="220" y="6" width="6" height="88" fill="#1e293b" stroke="#475569" />
      {/* interference: many bands */}
      {[14, 26, 38, 50, 62, 74, 86].map((y, i) => (
        <rect key={i} x="221" y={y} width="4" height="6" fill="#22d3ee" opacity={0.4 + (i % 3) * 0.2} />
      ))}
    </svg>
  );
}

function DoubleSlitInterferenceSvg() {
  return (
    <svg viewBox="0 0 260 200" className="w-full h-auto" role="img" aria-label="Light passing through two slits creates an interference pattern of bright and dark bands">
      {/* light source */}
      <circle cx="14" cy="100" r="8" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="14" y="124" fontSize="8" fill="#fcd34d" fontFamily="monospace" textAnchor="middle">SOURCE</text>

      {/* incoming wave hatches */}
      {[28, 40, 52, 64].map((x, i) => (
        <line key={i} x1={x} y1="40" x2={x} y2="160" stroke="#67e8f9" strokeWidth="1.2" opacity={0.4 + i * 0.1} />
      ))}

      {/* slit wall */}
      <rect x="98" y="20" width="6" height="60" fill="#475569" />
      <rect x="98" y="92" width="6" height="16" fill="#475569" />
      <rect x="98" y="120" width="6" height="60" fill="#475569" />

      {/* circular wavefronts from each slit */}
      {[20, 40, 60, 80, 100, 120, 140].map((r, i) => (
        <circle key={`a-${i}`} cx="101" cy="88" r={r} fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.40" />
      ))}
      {[20, 40, 60, 80, 100, 120, 140].map((r, i) => (
        <circle key={`b-${i}`} cx="101" cy="112" r={r} fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.40" />
      ))}

      {/* screen */}
      <rect x="244" y="20" width="6" height="160" fill="#0f172a" stroke="#475569" />

      {/* interference bands on screen */}
      {[
        { y: 28, h: 6, op: 0.5 },
        { y: 44, h: 12, op: 0.95 },
        { y: 64, h: 8, op: 0.7 },
        { y: 80, h: 14, op: 0.95 },
        { y: 100, h: 14, op: 1 },
        { y: 120, h: 14, op: 0.95 },
        { y: 140, h: 8, op: 0.7 },
        { y: 156, h: 12, op: 0.95 },
        { y: 174, h: 6, op: 0.5 },
      ].map((b, i) => (
        <rect key={i} x="245" y={b.y} width="4" height={b.h} fill="#22d3ee" opacity={b.op} />
      ))}
      <text x="247" y="194" fontSize="7" fill="#67e8f9" fontFamily="monospace" textAnchor="middle">SCREEN</text>

      {/* labels */}
      <text x="12" y="180" fontSize="7" fill="#cbd5e1" fontFamily="monospace">light</text>
      <text x="100" y="14" fontSize="7" fill="#cbd5e1" fontFamily="monospace" textAnchor="middle">2 slits</text>
      <text x="180" y="14" fontSize="7" fill="#22d3ee" fontFamily="monospace" textAnchor="middle">interference pattern</text>
    </svg>
  );
}
