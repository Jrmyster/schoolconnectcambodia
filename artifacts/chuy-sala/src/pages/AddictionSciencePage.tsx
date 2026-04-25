import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Cigarette,
  Sparkles,
  AlertTriangle,
  HeartPulse,
  Pill,
  Beaker,
  ShieldCheck,
  Quote,
  Activity,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  PHL-02 · The Science of Addiction: Hijacking the Brain
//           វិទ្យាសាស្ត្រនៃការញៀន៖ ការលួចបញ្ជាខួរក្បាល
//
//  A clinical, empathetic, bilingual deep-dive within Public Health.
//
//  Cards:
//    1. The Survival Reward          — Dopamine as the "do that again" signal
//    2. The Chemical Hijack          — Nicotine/drugs + Tolerance (receptor loss)
//    3. The Stress Trigger           — Cortisol → relapse loop
//
//  Aesthetic: clean whites · anatomical reds · neural blues (clinical, not scary)
// ════════════════════════════════════════════════════════════════════════════

const NEURAL_BLUE = "#1d4ed8";
const NEURAL_BLUE_LIGHT = "#dbeafe";
const NEURAL_BLUE_DEEP = "#1e3a8a";
const ANATOMY_RED = "#be123c";
const ANATOMY_RED_LIGHT = "#fecdd3";
const ANATOMY_RED_DEEP = "#881337";
const SLATE = "#1e293b";
const PAPER = "#fafbff";

export default function AddictionSciencePage() {
  const { language } = useLanguageStore();
  const k = language === "kh";
  const t = (en: string, kh: string) => (k ? kh : en);

  return (
    <div
      className="min-h-screen text-slate-800"
      style={{
        backgroundColor: PAPER,
        backgroundImage:
          "radial-gradient(circle at 12% 14%, rgba(29, 78, 216, 0.06), transparent 45%)," +
          "radial-gradient(circle at 88% 10%, rgba(190, 18, 60, 0.05), transparent 45%)," +
          "radial-gradient(circle at 50% 90%, rgba(29, 78, 216, 0.04), transparent 50%)",
      }}
    >
      <ScopedStyles />

      {/* ── Top: back + content warning ─────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/well-being/public-health"
          className={`inline-flex items-center gap-1.5 text-sm font-medium hover:underline ${
            k ? "font-khmer" : ""
          }`}
          style={{ color: NEURAL_BLUE }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Public Health", "ត្រឡប់ទៅសុខភាពសាធារណៈ")}
        </Link>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5 text-[11px] font-bold tracking-widest uppercase"
          style={{
            backgroundColor: "#ffffff",
            border: `1px solid ${NEURAL_BLUE}33`,
            color: NEURAL_BLUE_DEEP,
          }}
        >
          <Brain className="w-3.5 h-3.5" />
          {t("Public Health · Module 02", "សុខភាពសាធារណៈ · ម៉ូឌុល ០២")}
        </div>

        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${
            k ? "font-khmer leading-loose" : ""
          }`}
          style={{ color: SLATE }}
        >
          {k ? (
            <>
              វិទ្យាសាស្ត្រនៃការញៀន៖{" "}
              <span style={{ color: ANATOMY_RED_DEEP }}>ការលួចបញ្ជាខួរក្បាល</span>
            </>
          ) : (
            <>
              The Science of Addiction:{" "}
              <span style={{ color: ANATOMY_RED_DEEP }}>Hijacking the Brain</span>
            </>
          )}
        </h1>

        <p
          className={`text-slate-700 max-w-3xl text-base ${
            k ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {t(
            "Addiction is not weakness, and it is not a moral failure. It is a measurable, mechanical change inside the brain — a survival system that has been tricked. This module walks through three pieces: the brain's natural reward, what addictive chemicals do to that reward, and why stress so often pulls a person back in.",
            "ការញៀន មិនមែនជាភាពទន់ខ្សោយទេ ហើយក៏មិនមែនជាការខុសផ្នែកសីលធម៌ដែរ។ វាគឺជាការផ្លាស់ប្ដូរផ្នែកមេកានិច ដែលអាចវាស់បាន នៅខាងក្នុងខួរក្បាល — ប្រព័ន្ធការរស់រានមួយ ដែលត្រូវបានបន្លំ។ ម៉ូឌុលនេះ ដើរតាមបីផ្នែក៖ រង្វាន់ធម្មជាតិរបស់ខួរក្បាល អ្វីដែលសារធាតុញៀនធ្វើទៅលើរង្វាន់នោះ និងហេតុអ្វីបានជាភាពតានតឹង ច្រើនតែទាញមនុស្សម្នាក់ត្រឡប់មកវិញ។",
          )}
        </p>

        {/* Empathetic disclosure / safety strip */}
        <div
          className="mt-6 flex items-start gap-3 rounded-2xl p-4 sm:p-5 max-w-3xl"
          style={{
            backgroundColor: "#ffffff",
            border: `1px solid ${NEURAL_BLUE}22`,
          }}
        >
          <HeartPulse
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            style={{ color: ANATOMY_RED }}
            aria-hidden="true"
          />
          <p
            className={`text-sm text-slate-700 ${
              k ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {t(
              "If you or someone you love is struggling, this is not a judgement of them. Understanding the biology is the first step toward compassion — and toward effective help.",
              "ប្រសិនបើអ្នក ឬអ្នកដែលអ្នកស្រឡាញ់ កំពុងតស៊ូ នេះមិនមែនជាការវិនិច្ឆ័យពួកគេទេ។ ការយល់ដឹងពីជីវវិទ្យា គឺជាជំហានដំបូងឆ្ពោះទៅរកការអាណិតអាសូរ — និងឆ្ពោះទៅរកជំនួយដ៏មានប្រសិទ្ធភាព។",
            )}
          </p>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          CARD 1 · The Survival Reward
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-survival-reward"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <ClinicalCard
          numberEn="Card 01 · The Built-In System"
          numberKh="កាត ០១ · ប្រព័ន្ធកើតមកជាមួយ"
          icon={Sparkles}
          accent="blue"
          titleEn="The Survival Reward"
          titleKh="រង្វាន់សម្រាប់ការរស់រានមានជីវិត"
          k={k}
        >
          <p className={`mb-4 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The brain has a built-in reward system. When a human does something essential for survival — like eating a good meal, drinking water on a hot day, sleeping safely, or holding a loved one — the brain releases a chemical called",
              "ខួរក្បាល មានប្រព័ន្ធរង្វាន់កើតមកជាមួយ។ នៅពេលមនុស្សធ្វើអ្វីមួយដ៏ចាំបាច់សម្រាប់ការរស់រានមានជីវិត — ដូចជាការទទួលទានអាហារឆ្ងាញ់ ការផឹកទឹកនៅថ្ងៃក្ដៅ ការដេកលក់ដោយសុវត្ថិភាព ឬការឱបអ្នកដែលគេស្រឡាញ់ — ខួរក្បាលលែងសារធាតុមួយឈ្មោះ",
            )}{" "}
            <strong style={{ color: NEURAL_BLUE_DEEP }}>{t("Dopamine", "ដូប៉ាមីន")}</strong>
            {t(".", "។")}
          </p>

          <p className={`mb-5 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Dopamine makes us feel good. More importantly, it writes a message into the brain's memory:",
              "ដូប៉ាមីន ធ្វើឲ្យយើងមានអារម្មណ៍ល្អ។ សំខាន់ជាងនេះ វាសរសេរសារមួយចូលទៅក្នុងការចងចាំរបស់ខួរក្បាល៖",
            )}
          </p>

          <BrainMessage
            en="Remember how you did that? Do it again."
            kh="ចាំទេ ថាអ្នកបានធ្វើដូចនេះម៉េច? ធ្វើម្ដងទៀតទៅ។"
            k={k}
          />

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <FactTile
              icon={HeartPulse}
              accent="blue"
              titleEn="What it is"
              titleKh="តើវាជាអ្វី"
              k={k}
            >
              {t(
                "Dopamine is a neurotransmitter — a tiny chemical messenger that nerve cells use to talk to each other across narrow gaps called synapses.",
                "ដូប៉ាមីន គឺជាអ្នកនាំសារប្រសាទ — សារធាតុគីមីតូចមួយ ដែលកោសិកាប្រសាទប្រើដើម្បីនិយាយគ្នា ឆ្លងកាត់ចន្លោះតូចៗហៅថា ស៊ីណាប់។",
              )}
            </FactTile>
            <FactTile
              icon={Sparkles}
              accent="blue"
              titleEn="Why it matters"
              titleKh="ហេតុអ្វីវាសំខាន់"
              k={k}
            >
              {t(
                "Without this teaching signal we would forget which behaviours kept us alive. Dopamine is how the body says: that was good for you — bookmark it.",
                "បើគ្មានសញ្ញាបង្រៀននេះ យើងនឹងភ្លេចឥរិយាបថណាដែលរក្សាយើងឲ្យរស់។ ដូប៉ាមីន គឺជាវិធីដែលរាងកាយនិយាយថា ៖ នោះល្អសម្រាប់អ្នក — ចំណាំទុក។",
              )}
            </FactTile>
          </div>

          {/* Tiny anatomical illustration */}
          <SynapseIllustration k={k} />
        </ClinicalCard>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 2 · The Chemical Hijack
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-chemical-hijack"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 scroll-mt-24"
      >
        <ClinicalCard
          numberEn="Card 02 · The Imposter"
          numberKh="កាត ០២ · អ្នកក្លែងបន្លំ"
          icon={Cigarette}
          accent="red"
          titleEn="The Chemical Hijack"
          titleKh="ការលួចបញ្ជាដោយសារធាតុគីមី"
          k={k}
        >
          <p className={`mb-4 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t("Drugs like ", "សារធាតុញៀន ដូចជា ")}
            <strong style={{ color: ANATOMY_RED_DEEP }}>{t("Nicotine", "នីកូទីន")}</strong>{" "}
            {t(
              "(in cigarettes), methamphetamine, alcohol and opioids are chemical imposters. They cross the blood-brain barrier and force the brain to release a massive, unnatural flood of",
              "(នៅក្នុងបារី) មេតាំហ្វេតាមីន គ្រឿងស្រវឹង និងអូពីអ៊ីដ គឺជាសារធាតុគីមីក្លែងបន្លំ។ ពួកវាឆ្លងកាត់របាំងឈាម-ខួរក្បាល ហើយបង្ខំខួរក្បាលឲ្យលែង",
            )}{" "}
            <strong style={{ color: NEURAL_BLUE_DEEP }}>{t("Dopamine", "ដូប៉ាមីន")}</strong>
            {t(
              " — far more than food, water, or any natural reward could ever produce.",
              " ច្រើនលើសលប់ — ច្រើនជាងអាហារ ទឹក ឬរង្វាន់ធម្មជាតិណាមួយដែលអាចបង្កើតបាន។",
            )}
          </p>

          {/* Compare bars: natural vs chemical surge */}
          <SurgeBars k={k} />

          {/* Tolerance — the receptor map changes */}
          <div
            className="mt-6 rounded-2xl p-5"
            style={{
              backgroundColor: "#ffffff",
              border: `1px solid ${ANATOMY_RED}33`,
              boxShadow: `0 1px 0 ${ANATOMY_RED}11, 0 12px 30px -20px ${ANATOMY_RED}44`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
                style={{
                  backgroundColor: ANATOMY_RED_LIGHT,
                  color: ANATOMY_RED_DEEP,
                }}
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3
                className={`font-bold text-base ${k ? "font-khmer" : ""}`}
                style={{ color: ANATOMY_RED_DEEP }}
              >
                {t("Tolerance — the map changes", "ភាពស៊ាំ — ផែនទីផ្លាស់ប្ដូរ")}
              </h3>
            </div>

            <p className={`mb-4 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t("To protect itself from this unnatural flood, the brain physically removes some of its own dopamine receptors. This is called ", "ដើម្បីការពារខ្លួន ពីទឹកជំនន់មិនធម្មតានេះ ខួរក្បាលដកយកអ្នកទទួលដូប៉ាមីនរបស់ខ្លួន មួយចំនួនចេញ ផ្នែករូបវ័ន្ត។ វាត្រូវបានហៅថា ")}
              <strong style={{ color: ANATOMY_RED_DEEP }}>{t("Tolerance", "ភាពស៊ាំ")}</strong>
              {t(". The map changes.", "។ ផែនទីផ្លាស់ប្ដូរ។")}
            </p>

            {/* Receptor map: before / after */}
            <ReceptorMap k={k} />

            <p className={`mt-4 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Now the person needs the drug just to feel ",
                "ឥឡូវនេះ មនុស្សនោះ ត្រូវការសារធាតុនោះ ទើបអាចមានអារម្មណ៍ ",
              )}
              <em className={`font-semibold ${k ? "not-italic" : ""}`}>{t("normal", "ធម្មតា")}</em>
              {t(
                ". And natural joys — eating with family, hanging out with friends, a beautiful sunset — no longer feel good, because the receptors that used to receive that joy are gone. The world goes grey.",
                "។ ហើយសេចក្ដីសប្បាយធម្មជាតិ — ការទទួលទានអាហារជាមួយគ្រួសារ ការនៅជាមួយមិត្តភក្ដិ ព្រះអាទិត្យលិចដ៏ស្រស់ស្អាត — លែងធ្វើឲ្យមានអារម្មណ៍ល្អទៀតទេ ព្រោះអ្នកទទួលដែលធ្លាប់ទទួលអារម្មណ៍សប្បាយនោះ បានបាត់ទៅហើយ។ ពិភពលោកក្លាយជាពណ៌ប្រផេះ។",
              )}
            </p>
          </div>
        </ClinicalCard>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CARD 3 · The Stress Trigger
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="card-stress-trigger"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24"
      >
        <ClinicalCard
          numberEn="Card 03 · The Loop"
          numberKh="កាត ០៣ · រង្វិលជុំ"
          icon={Activity}
          accent="red"
          titleEn="The Stress Trigger"
          titleKh="កត្តាជំរុញពីភាពតានតឹង"
          k={k}
        >
          <p className={`mb-4 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t("When a person experiences stress — exams, poverty, family conflict, illness — the brain is flooded with the stress hormone ", "នៅពេលមនុស្សម្នាក់ ជួបនឹងភាពតានតឹង — ការប្រឡង ភាពក្រីក្រ វិវាទគ្រួសារ ឬជំងឺ — ខួរក្បាលត្រូវបានពេញដោយអរម៉ូនភាពតានតឹង ")}
            <strong style={{ color: ANATOMY_RED_DEEP }}>{t("Cortisol", "កូទីសុល")}</strong>
            {t(". Cortisol makes the body feel terrible: tight chest, shallow breath, racing thoughts, irritability.", "។ កូទីសុលធ្វើឲ្យរាងកាយមានអារម្មណ៍មិនស្រួល ៖ ទ្រូងណែន ដកដង្ហើមរាក់ គិតលឿន និងឆាប់ខឹង។")}
          </p>

          <p className={`mb-5 text-slate-700 text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The brain panics, and it desperately searches its memory for the fastest way to feel okay again. And there, bookmarked from earlier — the massive dopamine spike from the cigarette, the drink, the drug. Stress literally tricks the survival system into demanding the addictive substance as a cure for the pain.",
              "ខួរក្បាលភ័យស្លន់ស្លោ ហើយវាស្វែងរកនៅក្នុងការចងចាំ ដោយអស់សង្ឃឹម នូវវិធីលឿនបំផុតដើម្បីមានអារម្មណ៍ល្អម្ដងទៀត។ ហើយនៅទីនោះ — ដែលត្រូវបានចំណាំទុកពីពេលមុន — គឺការកើនឡើងដ៏ខ្លាំងនៃដូប៉ាមីន ពីបារី ស្រា ឬគ្រឿងញៀន។ ភាពតានតឹង បន្លំប្រព័ន្ធការរស់រាន ឲ្យទាមទារសារធាតុញៀននោះ ជាថ្នាំព្យាបាលឧបទ្ទវហេតុ។",
            )}
          </p>

          {/* Cortisol → relapse loop */}
          <RelapseLoop k={k} />

          {/* Closing — empathy + the way out */}
          <div
            className="mt-6 rounded-2xl p-5 flex items-start gap-3"
            style={{
              backgroundColor: NEURAL_BLUE_LIGHT + "55",
              border: `1px solid ${NEURAL_BLUE}33`,
            }}
          >
            <Sparkles
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              style={{ color: NEURAL_BLUE_DEEP }}
              aria-hidden="true"
            />
            <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <strong className={k ? "" : "font-bold"}>
                {t("The hopeful part: ", "ផ្នែកសង្ឃឹម ៖ ")}
              </strong>
              {t(
                "the brain is plastic. With time, distance from the substance, and lower stress, dopamine receptors slowly grow back. Natural joys return. Recovery is not a story of willpower against weakness — it is a story of giving the brain enough time and enough kindness to rebuild its own map.",
                "ខួរក្បាល មានភាពបត់បែន។ ដោយពេលវេលា ការដាច់ពីសារធាតុនោះ និងភាពតានតឹងតិចជាង អ្នកទទួលដូប៉ាមីន បានដុះត្រឡប់មកវិញបន្តិចម្ដងៗ។ សេចក្ដីសប្បាយធម្មជាតិ ត្រឡប់មកវិញ។ ការជាសះស្បើយ មិនមែនជារឿងនៃកម្លាំងចិត្តប្រឆាំងនឹងភាពទន់ខ្សោយទេ — វាគឺជារឿងនៃការផ្ដល់ពេលវេលា និងការអាណិតអាសូរឲ្យខួរក្បាលគ្រប់គ្រាន់ ដើម្បីសាងសង់ផែនទីខ្លួនវាឡើងវិញ។",
              )}
            </p>
          </div>

          <blockquote
            className={`relative mt-6 pl-5 border-l-4 italic text-slate-700 ${k ? "font-khmer not-italic leading-loose" : "leading-relaxed"}`}
            style={{ borderColor: NEURAL_BLUE }}
          >
            <Quote
              className="absolute -left-3 -top-1 w-4 h-4"
              style={{ color: NEURAL_BLUE }}
              aria-hidden="true"
            />
            <span className="text-base">
              {t(
                "\u201CAddiction is not a moral failure. It is the predictable result of taking a healthy reward circuit and overwhelming it.\u201D",
                "«ការញៀនមិនមែនជាការខុសផ្នែកសីលធម៌ទេ។ វាគឺជាលទ្ធផលដែលអាចទាយទុកមុនបាន នៃការយកសៀគ្វីរង្វាន់ដែលមានសុខភាពល្អ មកធ្វើឲ្យលើសកម្រិត។»",
              )}
            </span>
            <span
              className={`block mt-1 text-xs not-italic text-slate-500 ${k ? "font-khmer" : ""}`}
            >
              — {t("modern neuroscience consensus", "មតិស្រុះស្រួលនៃប្រសាទវិទ្យាសម័យទំនើប")}
            </span>
          </blockquote>
        </ClinicalCard>
      </section>

      {/* Footer back link */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center">
        <Link
          href="/well-being/public-health"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold shadow hover:opacity-90 transition-opacity ${k ? "font-khmer" : ""}`}
          style={{ backgroundColor: NEURAL_BLUE }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Public Health", "ត្រឡប់ទៅសុខភាពសាធារណៈ")}
        </Link>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Reusable building blocks
// ════════════════════════════════════════════════════════════════════════════

type Accent = "blue" | "red";

function ClinicalCard({
  numberEn,
  numberKh,
  icon: Icon,
  accent,
  titleEn,
  titleKh,
  k,
  children,
}: {
  numberEn: string;
  numberKh: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: Accent;
  titleEn: string;
  titleKh: string;
  k: boolean;
  children: React.ReactNode;
}) {
  const accentColor = accent === "red" ? ANATOMY_RED_DEEP : NEURAL_BLUE_DEEP;
  const accentBg = accent === "red" ? ANATOMY_RED_LIGHT : NEURAL_BLUE_LIGHT;
  const accentBorder = accent === "red" ? ANATOMY_RED : NEURAL_BLUE;

  return (
    <article
      className="rounded-3xl p-6 sm:p-8"
      style={{
        backgroundColor: "#ffffff",
        border: `1px solid ${accentBorder}22`,
        boxShadow: `0 1px 0 ${accentBorder}11, 0 22px 50px -25px ${accentBorder}33`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl"
          style={{ backgroundColor: accentBg, color: accentColor }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`text-[11px] font-bold tracking-widest uppercase ${
            k ? "font-khmer tracking-normal normal-case" : ""
          }`}
          style={{ color: accentColor }}
        >
          {k ? numberKh : numberEn}
        </span>
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl mb-5 ${
          k ? "font-khmer leading-loose" : ""
        }`}
        style={{ color: SLATE }}
      >
        {k ? titleKh : titleEn}
      </h2>
      {children}
    </article>
  );
}

function FactTile({
  icon: Icon,
  accent,
  titleEn,
  titleKh,
  k,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  accent: Accent;
  titleEn: string;
  titleKh: string;
  k: boolean;
  children: React.ReactNode;
}) {
  const accentColor = accent === "red" ? ANATOMY_RED_DEEP : NEURAL_BLUE_DEEP;
  const accentBg = accent === "red" ? ANATOMY_RED_LIGHT : NEURAL_BLUE_LIGHT;
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        backgroundColor: "#ffffff",
        border: `1px solid ${accentColor}22`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="inline-flex items-center justify-center w-7 h-7 rounded-lg"
          style={{ backgroundColor: accentBg, color: accentColor }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <h4
          className={`text-sm font-bold ${k ? "font-khmer" : ""}`}
          style={{ color: accentColor }}
        >
          {k ? titleKh : titleEn}
        </h4>
      </div>
      <p
        className={`text-sm text-slate-700 ${
          k ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function BrainMessage({ en, kh, k }: { en: string; kh: string; k: boolean }) {
  return (
    <div
      className="rounded-2xl px-5 py-4 max-w-2xl"
      style={{
        backgroundColor: NEURAL_BLUE_LIGHT + "66",
        border: `1px dashed ${NEURAL_BLUE}55`,
      }}
    >
      <div className="flex items-start gap-3">
        <Brain
          className="w-5 h-5 flex-shrink-0 mt-0.5"
          style={{ color: NEURAL_BLUE_DEEP }}
          aria-hidden="true"
        />
        <p
          className={`text-base font-semibold ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: NEURAL_BLUE_DEEP }}
        >
          “{k ? kh : en}”
        </p>
      </div>
    </div>
  );
}

// ─── Tiny synapse illustration (clinical, not scary) ─────────────────────────

function SynapseIllustration({ k }: { k: boolean }) {
  return (
    <div
      className="mt-6 rounded-2xl p-4"
      style={{
        backgroundColor: NEURAL_BLUE_LIGHT + "33",
        border: `1px solid ${NEURAL_BLUE}22`,
      }}
    >
      <svg
        viewBox="0 0 360 110"
        className="w-full h-auto max-h-[120px]"
        role="img"
        aria-label={
          k
            ? "កោសិកាប្រសាទពីរមួយជួបគ្នា ដោយលែងដូប៉ាមីននៅចន្លោះ"
            : "Two nerve cells meeting at a synapse, releasing dopamine into the gap"
        }
      >
        {/* Pre-synaptic neuron */}
        <circle cx="50" cy="55" r="22" fill="#ffffff" stroke={NEURAL_BLUE} strokeWidth="2" />
        <line x1="72" y1="55" x2="160" y2="55" stroke={NEURAL_BLUE} strokeWidth="2" />
        {/* Vesicles */}
        <circle cx="155" cy="48" r="3" fill={NEURAL_BLUE} />
        <circle cx="148" cy="58" r="3" fill={NEURAL_BLUE} />
        <circle cx="158" cy="62" r="3" fill={NEURAL_BLUE} />

        {/* Synaptic gap */}
        <text x="200" y="34" fontSize="9" fill={NEURAL_BLUE_DEEP} fontFamily="monospace" textAnchor="middle">
          {k ? "ដូប៉ាមីន" : "DOPAMINE"}
        </text>
        {[170, 180, 190, 200, 210, 220, 230].map((x, i) => (
          <circle key={i} cx={x} cy={55 + (i % 2 === 0 ? -6 : 6)} r="2.5" fill={NEURAL_BLUE} opacity="0.85" />
        ))}

        {/* Post-synaptic neuron */}
        <line x1="240" y1="55" x2="288" y2="55" stroke={NEURAL_BLUE_DEEP} strokeWidth="2" />
        <circle cx="310" cy="55" r="22" fill="#ffffff" stroke={NEURAL_BLUE_DEEP} strokeWidth="2" />
        {/* Receptors (little notches) */}
        {[245, 257, 269, 281].map((x, i) => (
          <rect key={i} x={x} y="46" width="6" height="6" fill={NEURAL_BLUE_DEEP} rx="1" />
        ))}

        <text x="50" y="98" fontSize="9" fill="#475569" fontFamily="monospace" textAnchor="middle">
          {k ? "កោសិកាបញ្ជូន" : "sender cell"}
        </text>
        <text x="310" y="98" fontSize="9" fill="#475569" fontFamily="monospace" textAnchor="middle">
          {k ? "កោសិកាទទួល" : "receiver cell"}
        </text>
      </svg>
    </div>
  );
}

// ─── Surge bars: natural reward vs chemical surge ────────────────────────────

function SurgeBars({ k }: { k: boolean }) {
  const rows: { en: string; kh: string; pct: number; color: string; iconColor: string }[] = [
    { en: "Eating a good meal", kh: "ការទទួលទានអាហារឆ្ងាញ់", pct: 18, color: NEURAL_BLUE, iconColor: NEURAL_BLUE_DEEP },
    { en: "Sex", kh: "ការរួមភេទ", pct: 32, color: NEURAL_BLUE, iconColor: NEURAL_BLUE_DEEP },
    { en: "Cocaine", kh: "កូកាអ៊ីន", pct: 75, color: ANATOMY_RED, iconColor: ANATOMY_RED_DEEP },
    { en: "Methamphetamine", kh: "មេតាំហ្វេតាមីន", pct: 100, color: ANATOMY_RED_DEEP, iconColor: ANATOMY_RED_DEEP },
  ];
  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: "#ffffff", border: `1px solid ${ANATOMY_RED}22` }}>
      <div className="flex items-center gap-2 mb-3">
        <Beaker className="w-4 h-4" style={{ color: ANATOMY_RED_DEEP }} />
        <h4 className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: ANATOMY_RED_DEEP }}>
          {t_inline(k, "Dopamine release · relative size", "ការលែងដូប៉ាមីន · ទំហំធៀប")}
        </h4>
      </div>
      <ul className="space-y-2.5">
        {rows.map((r, i) => (
          <li key={i} className="grid grid-cols-[140px,1fr] sm:grid-cols-[180px,1fr] items-center gap-3">
            <span className={`text-xs sm:text-sm text-slate-700 ${k ? "font-khmer" : ""}`}>{k ? r.kh : r.en}</span>
            <div className="relative h-5 rounded-full overflow-hidden" style={{ backgroundColor: "#f1f5f9" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${r.pct}%`,
                  background: `linear-gradient(90deg, ${r.color}aa 0%, ${r.color} 100%)`,
                }}
                aria-hidden="true"
              />
              <span
                className="absolute inset-y-0 right-2 flex items-center text-[10px] font-mono font-bold"
                style={{ color: r.iconColor }}
              >
                ×{Math.max(1, Math.round(r.pct / 18))}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className={`mt-3 text-[11px] text-slate-500 ${k ? "font-khmer" : ""}`}>
        {t_inline(
          k,
          "Schematic — based on neuroscience studies of nucleus accumbens dopamine response. Not exact percentages.",
          "គ្រោងការណ៍ — ផ្អែកលើការសិក្សាប្រសាទវិទ្យានៃប្រតិកម្មដូប៉ាមីន nucleus accumbens។ មិនមែនជាភាគរយជាក់លាក់ទេ។",
        )}
      </p>
    </div>
  );
}

// ─── Receptor map: before / after tolerance ──────────────────────────────────

function ReceptorMap({ k }: { k: boolean }) {
  const Cell = ({ count, label, color }: { count: number; label: string; color: string }) => (
    <div
      className="rounded-xl p-3 text-center"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${color}33` }}
    >
      <div className={`text-[11px] font-bold mb-2 ${k ? "font-khmer" : ""}`} style={{ color }}>
        {label}
      </div>
      <svg
        viewBox="0 0 110 50"
        className="w-full h-auto max-h-[60px] mx-auto"
        role="img"
        aria-label={label}
      >
        {/* The receiving neuron membrane */}
        <line x1="6" y1="40" x2="104" y2="40" stroke={color} strokeWidth="2" />
        {/* Receptors */}
        {Array.from({ length: 8 }).map((_, i) => {
          const visible = i < count;
          const x = 14 + i * 11;
          return visible ? (
            <rect key={i} x={x - 3.5} y="30" width="7" height="10" fill={color} rx="1" />
          ) : (
            <rect key={i} x={x - 3.5} y="30" width="7" height="10" fill="none" stroke={color} strokeDasharray="2 2" rx="1" />
          );
        })}
      </svg>
    </div>
  );
  return (
    <div className="grid grid-cols-2 gap-3">
      <Cell count={8} label={t_inline(k, "Healthy brain · 8 receptors", "ខួរក្បាលមានសុខភាពល្អ · ៨ អ្នកទទួល")} color={NEURAL_BLUE_DEEP} />
      <Cell count={3} label={t_inline(k, "After tolerance · 3 receptors", "បន្ទាប់ពីភាពស៊ាំ · ៣ អ្នកទទួល")} color={ANATOMY_RED_DEEP} />
    </div>
  );
}

// ─── Stress → relapse loop diagram ────────────────────────────────────────────

function RelapseLoop({ k }: { k: boolean }) {
  const Step = ({
    icon: Icon,
    titleEn,
    titleKh,
    color,
    bg,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    titleEn: string;
    titleKh: string;
    color: string;
    bg: string;
  }) => (
    <div
      className="rounded-2xl px-3 py-3 flex items-center gap-2 min-w-0"
      style={{ backgroundColor: bg, border: `1px solid ${color}33` }}
    >
      <div
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
        style={{ backgroundColor: "#ffffff", color }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <span className={`text-xs sm:text-sm font-semibold ${k ? "font-khmer" : ""}`} style={{ color }}>
        {k ? titleKh : titleEn}
      </span>
    </div>
  );
  const arrow = (
    <ArrowRight
      className="w-4 h-4 flex-shrink-0 mx-1 hidden sm:block"
      style={{ color: ANATOMY_RED }}
      aria-hidden="true"
    />
  );
  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: ANATOMY_RED_LIGHT + "33", border: `1px solid ${ANATOMY_RED}22` }}>
      <h4 className={`text-sm font-bold mb-3 ${k ? "font-khmer" : ""}`} style={{ color: ANATOMY_RED_DEEP }}>
        {t_inline(k, "How stress triggers relapse", "របៀបដែលភាពតានតឹងបង្កការដួលរលំឡើងវិញ")}
      </h4>
      <div className="grid sm:flex sm:items-stretch gap-2 sm:gap-1">
        <Step
          icon={AlertTriangle}
          titleEn="Stressful event"
          titleKh="ព្រឹត្តិការណ៍តានតឹង"
          color={ANATOMY_RED_DEEP}
          bg="#ffffff"
        />
        {arrow}
        <Step
          icon={Beaker}
          titleEn="Cortisol spike"
          titleKh="កូទីសុលកើនឡើង"
          color={ANATOMY_RED_DEEP}
          bg={ANATOMY_RED_LIGHT + "55"}
        />
        {arrow}
        <Step
          icon={Brain}
          titleEn="Brain searches memory"
          titleKh="ខួរក្បាលរុករកការចងចាំ"
          color={NEURAL_BLUE_DEEP}
          bg={NEURAL_BLUE_LIGHT + "55"}
        />
        {arrow}
        <Step
          icon={Pill}
          titleEn="Demands the substance"
          titleKh="ទាមទារសារធាតុនោះ"
          color={ANATOMY_RED_DEEP}
          bg="#ffffff"
        />
      </div>
    </div>
  );
}

// ─── Inline t() helper for nested components without prop drilling ───────────

function t_inline(k: boolean, en: string, kh: string) {
  return k ? kh : en;
}

// ─── Scoped styles (motion) ──────────────────────────────────────────────────

function ScopedStyles() {
  return (
    <style>{`
      @media (prefers-reduced-motion: reduce) {
        .addiction-pulse { animation: none !important; }
      }
    `}</style>
  );
}
