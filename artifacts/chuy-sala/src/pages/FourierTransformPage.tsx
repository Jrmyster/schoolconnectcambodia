import type { ComponentType, ReactNode, CSSProperties } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Activity,
  BarChart3,
  Music,
  Wifi,
  Sigma,
  Stethoscope,
  Soup,
  Sparkles,
  Waves,
  Clock,
  Radio,
} from "lucide-react";
import { useTranslation } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  FOURIER TRANSFORM — "The Secret Recipe of Waves"
 *  ការបំប្លែង Fourier៖ រូបមន្តសម្ងាត់នៃរលក
 *
 *  Aesthetic: dark oscilloscope screen, neon green + cyan trace lines,
 *  faint grid background, glowing text. Strict bilingual EN/KH throughout.
 * ══════════════════════════════════════════════════════════════════════════ */

// ── Palette ────────────────────────────────────────────────────────────────
const BG          = "#05080d"; // near-black scope background
const PANEL       = "#0b1220"; // card background
const PANEL_SOFT  = "#0f1a2c";
const GRID        = "rgba(57, 255, 20, 0.08)";
const NEON_GREEN  = "#39ff14";
const NEON_CYAN   = "#22d3ee";
const NEON_AMBER  = "#fbbf24";
const NEON_PINK   = "#ec4899";
const TEXT        = "#e2e8f0";
const TEXT_DIM    = "#94a3b8";
const TEXT_MUTED  = "#64748b";

const glow = (color: string, strength = 8) =>
  `0 0 ${strength}px ${color}, 0 0 ${strength * 2}px ${color}40`;

/* ════════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ══════════════════════════════════════════════════════════════════════════ */

export default function FourierTransformPage() {
  const t = useTranslation();

  return (
    <div className="min-h-screen" style={{ background: BG, color: TEXT }}>
      {/* Subtle scanlines + grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${GRID} 1px, transparent 1px),
            linear-gradient(90deg, ${GRID} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.6,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/science"
          className="inline-flex items-center gap-2 text-sm font-mono mb-8 hover:opacity-80 transition-opacity"
          style={{ color: NEON_CYAN, textShadow: glow(NEON_CYAN, 4) }}
          data-testid="link-back-science"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
        </Link>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <header className="mb-12 sm:mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
            style={{
              border: `1px solid ${NEON_GREEN}`,
              color: NEON_GREEN,
              boxShadow: glow(NEON_GREEN, 4),
            }}
          >
            <Activity className="w-3.5 h-3.5" />
            {t("Signal Processing", "ការដំណើរការសញ្ញា")}
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4"
            style={{ color: NEON_GREEN, textShadow: glow(NEON_GREEN, 10) }}
          >
            Fourier Transformation
            <br />
            <span style={{ color: NEON_CYAN, textShadow: glow(NEON_CYAN, 10) }}>
              The Secret Recipe of Waves
            </span>
          </h1>
          <h2
            className="font-khmer text-xl sm:text-2xl md:text-3xl leading-relaxed mt-3"
            style={{ color: NEON_CYAN, textShadow: glow(NEON_CYAN, 6) }}
          >
            ការបំប្លែង Fourier៖ រូបមន្តសម្ងាត់នៃរលក
          </h2>

          <p className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed" style={{ color: TEXT_DIM }}>
            {t(
              "Every sound, every radio wave, every Wi-Fi packet, every MRI scan — they are all just waves added together. The Fourier Transform is the mathematical lens that lets us pull them apart.",
              "សំឡេងគ្រប់ប្រភេទ រលកវិទ្យុ កញ្ចប់ Wi-Fi និងការថតរូបភាព MRI សុទ្ធតែជារលកដែលត្រូវបានបន្ថែមជាមួយគ្នា។ ការបំប្លែង Fourier គឺជាកញ្ចក់គណិតវិទ្យាដែលអនុញ្ញាតឱ្យយើងបំបែកវាចេញពីគ្នា។",
            )}
          </p>

          {/* Integral formula card */}
          <div
            className="mt-8 inline-flex items-center gap-4 px-5 py-3 rounded-xl font-mono text-sm sm:text-base"
            style={{
              background: PANEL,
              border: `1px solid ${NEON_CYAN}40`,
              boxShadow: glow(NEON_CYAN, 6),
            }}
          >
            <span className="text-2xl sm:text-3xl" style={{ color: NEON_CYAN }}>∫</span>
            <span style={{ color: TEXT }}>
              F(ω) ={" "}
              <span style={{ color: NEON_GREEN }}>∫</span>
              <span style={{ color: TEXT_DIM }}>{" "}f(t) · e</span>
              <sup style={{ color: NEON_PINK }}>−iωt</sup>
              <span style={{ color: TEXT_DIM }}>{" "}dt</span>
            </span>
          </div>
        </header>

        {/* ════════════════════════════════════════════════════════════
         *  Section 1: The Smoothie Analogy
         * ═══════════════════════════════════════════════════════════ */}
        <Section
          icon={Soup}
          eyebrow={t("Section 01 — The Big Idea", "ផ្នែកទី ០១ — គំនិតធំ")}
          en="The Smoothie Analogy"
          kh="ការប្រៀបធៀបជាមួយទឹកក្រឡុក"
        >
          <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: TEXT_DIM }}>
            {t(
              "Imagine a smoothie. You can taste it, but can you tell exactly how much banana, mango, and yoghurt went in? A skilled chef can. The Fourier Transform is that chef — but instead of fruit, it tastes a complex sound wave and tells you exactly which musical notes (frequencies) are inside, and how loud each one is.",
              "ស្រមៃមើលទឹកក្រឡុក។ អ្នកអាចភ្លក់វាបាន ប៉ុន្តែតើអ្នកអាចប្រាប់បានដែរទេថាមានចេក ស្វាយ និងទឹកដោះគោជូរប៉ុន្មាន? ចុងភៅជំនាញម្នាក់អាចប្រាប់បាន។ ការបំប្លែង Fourier គឺជាចុងភៅនោះ — ប៉ុន្តែជំនួសផ្លែឈើ វាភ្លក់រលកសំឡេងស្មុគស្មាញ ហើយប្រាប់អ្នកថាតើមានណូតតន្ត្រី (ប្រេកង់) មួយណាខ្លះនៅខាងក្នុង និងខ្លាំងប៉ុនណា។",
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <AnalogyCard
              color={NEON_AMBER}
              labelEn="The Smoothie"
              labelKh="ទឹកក្រឡុក"
              titleEn="What you hear"
              titleKh="អ្វីដែលអ្នកឮ"
              bodyEn="A single complex sound — a chord on a guitar, a person's voice, the rumble of a truck. It is one signal that contains many ingredients mixed together."
              bodyKh="សំឡេងស្មុគស្មាញតែមួយ — សំឡេងភ្លេងហ្គីតាមួយ សំឡេងមនុស្ស ឬសំឡេងគ្រហឹមនៃឡានដឹកទំនិញ។ វាគឺជាសញ្ញាមួយដែលមានគ្រឿងផ្សំជាច្រើនបញ្ចូលគ្នា។"
            />
            <AnalogyCard
              color={NEON_GREEN}
              labelEn="The Recipe"
              labelKh="រូបមន្ត"
              titleEn="What Fourier reveals"
              titleKh="អ្វីដែល Fourier បង្ហាញ"
              bodyEn="A precise list of every pure tone (sine wave) inside the sound, and the exact volume of each one. The recipe that, if followed, recreates the smoothie perfectly."
              bodyKh="បញ្ជីច្បាស់លាស់នៃរលកសុទ្ធ (រលកស៊ីនុស) ទាំងអស់នៅខាងក្នុងសំឡេង និងកម្រិតសំឡេងពិតប្រាកដនៃនីមួយៗ។ រូបមន្តដែលបើធ្វើតាម អាចបង្កើតទឹកក្រឡុកឡើងវិញបានយ៉ាងល្អឥតខ្ចោះ។"
            />
          </div>

          {/* Decompose visual */}
          <div
            className="mt-8 rounded-2xl p-4 sm:p-6"
            style={{ background: PANEL, border: `1px solid ${NEON_GREEN}30` }}
          >
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: NEON_GREEN }}>
              {t("DECOMPOSING ONE WAVE INTO THREE", "ការបំបែករលកមួយជាបី")}
            </p>
            <DecomposeVisual />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: TEXT_DIM }}>
              {t(
                "The complex blue wave at the top is the sum of the three simpler sine waves below it. Fourier's gift: given any signal, find those hidden ingredients.",
                "រលកពណ៌ខៀវស្មុគស្មាញនៅខាងលើគឺជាផលបូកនៃរលកស៊ីនុសសាមញ្ញចំនួនបីនៅខាងក្រោម។ អំណោយរបស់ Fourier៖ បើអ្នកមានសញ្ញាណាមួយ វាអាចរកឃើញគ្រឿងផ្សំដែលលាក់នោះ។",
              )}
            </p>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════
         *  Section 2: Time vs Frequency Domain
         * ═══════════════════════════════════════════════════════════ */}
        <Section
          icon={Sigma}
          eyebrow={t("Section 02 — Two Views, One Signal", "ផ្នែកទី ០២ — ទិដ្ឋភាពពីរ សញ្ញាមួយ")}
          en="Time vs. Frequency"
          kh="ពេលវេលា ប្រៀបធៀបនឹង ប្រេកង់"
        >
          <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: TEXT_DIM }}>
            {t(
              "The same signal can be described two completely different ways. The Fourier Transform is simply the bridge that converts one view into the other — and back again.",
              "សញ្ញាដូចគ្នាអាចត្រូវបានពិពណ៌នាតាមពីរវិធីខុសគ្នាទាំងស្រុង។ ការបំប្លែង Fourier គឺជាស្ពានដែលប្តូរទិដ្ឋភាពមួយទៅមួយទៀត — ហើយត្រឡប់មកវិញ។",
            )}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Time domain */}
            <DomainCard
              color={NEON_GREEN}
              Icon={Clock}
              titleEn="Time Domain"
              titleKh="ដែនពេលវេលា"
              axisXEn="Time →"
              axisXKh="ពេលវេលា →"
              axisYEn="Amplitude"
              axisYKh="អំព្លីទុត"
              descEn="A jagged line showing how the wave moves up and down moment by moment. This is what a microphone records or what an oscilloscope draws on its screen."
              descKh="ខ្សែខ្វាក់បង្ហាញពីរបៀបដែលរលកផ្លាស់ទីឡើងចុះវិនាទីនីមួយៗ។ នេះគឺជាអ្វីដែលមីក្រូហ្វូនថត ឬអ្វីដែលបណ្តាញវាស់រលកគូរនៅលើអេក្រង់របស់វា។"
              visual={<TimeDomainVisual />}
            />

            {/* Frequency domain */}
            <DomainCard
              color={NEON_CYAN}
              Icon={BarChart3}
              titleEn="Frequency Domain"
              titleKh="ដែនប្រេកង់"
              axisXEn="Frequency →"
              axisXKh="ប្រេកង់ →"
              axisYEn="Strength"
              axisYKh="កម្លាំង"
              descEn="A row of vertical bars showing which specific pitches are present and how loud each one is. The same signal — just sorted by ingredient instead of by time."
              descKh="ជួរបារឈរបង្ហាញថាតើមានសំឡេងជាក់លាក់ណាខ្លះ និងកម្រិតសំឡេងនីមួយៗប៉ុនណា។ សញ្ញាដូចគ្នា — គ្រាន់តែតម្រៀបតាមគ្រឿងផ្សំជំនួសឱ្យតាមពេលវេលា។"
              visual={<FrequencyDomainVisual />}
            />
          </div>

          {/* Bridge arrow */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div
              className="px-4 py-2 rounded-lg font-mono text-sm"
              style={{
                background: PANEL_SOFT,
                color: NEON_GREEN,
                border: `1px solid ${NEON_GREEN}40`,
              }}
            >
              f(t)
            </div>
            <div className="font-mono text-xs sm:text-sm flex items-center gap-2" style={{ color: TEXT_DIM }}>
              <span>—</span>
              <span style={{ color: NEON_PINK, textShadow: glow(NEON_PINK, 4) }}>
                {t("FOURIER TRANSFORM", "ការបំប្លែង FOURIER")}
              </span>
              <span>→</span>
            </div>
            <div
              className="px-4 py-2 rounded-lg font-mono text-sm"
              style={{
                background: PANEL_SOFT,
                color: NEON_CYAN,
                border: `1px solid ${NEON_CYAN}40`,
              }}
            >
              F(ω)
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════
         *  Section 3: Real-World Magic
         * ═══════════════════════════════════════════════════════════ */}
        <Section
          icon={Sparkles}
          eyebrow={t("Section 03 — Why It Matters", "ផ្នែកទី ០៣ — ហេតុអ្វីបានជាសំខាន់")}
          en="Real-World Magic"
          kh="មន្តអាគមក្នុងពិភពពិត"
        >
          <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: TEXT_DIM }}>
            {t(
              "The Fourier Transform is not abstract. It is running, right now, billions of times per second — inside your phone, inside hospitals, and inside every song you stream.",
              "ការបំប្លែង Fourier មិនមែនជារឿងអរូបីទេ។ វាកំពុងដំណើរការ នៅពេលនេះ រាប់ពាន់លានដងក្នុងមួយវិនាទី — នៅខាងក្នុងទូរសព្ទរបស់អ្នក នៅខាងក្នុងមន្ទីរពេទ្យ និងនៅខាងក្នុងបទចម្រៀងគ្រប់បទដែលអ្នកស្តាប់។",
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <MagicCard
              color={NEON_GREEN}
              Icon={Music}
              titleEn="MP3 & Music"
              titleKh="MP3 និងតន្ត្រី"
              taglineEn="Smaller files, same song."
              taglineKh="ឯកសារតូចជាង បទដូចគ្នា។"
              bodyEn="Fourier breaks the song into its frequency ingredients. The frequencies humans cannot hear (above 20 kHz) are thrown away. The song shrinks 10× — and your ear can't tell the difference."
              bodyKh="Fourier បំបែកបទចម្រៀងជាគ្រឿងផ្សំប្រេកង់របស់វា។ ប្រេកង់ដែលមនុស្សមិនអាចឮ (លើស ២០ kHz) ត្រូវបានបោះចោល។ បទចម្រៀងតូចចុះ ១០ ដង — ហើយត្រចៀករបស់អ្នកមិនអាចប្រាប់ភាពខុសគ្នាបានទេ។"
            />
            <MagicCard
              color={NEON_CYAN}
              Icon={Stethoscope}
              titleEn="Medical Imaging"
              titleKh="រូបភាពពេទ្យ"
              taglineEn="From raw waves to a clear picture."
              taglineKh="ពីរលកឆៅទៅរូបភាពច្បាស់។"
              bodyEn="An MRI machine doesn't take a photo — it records radio waves bouncing off your body. The Fourier Transform converts those waves into the crisp image of bones and organs that the doctor reads."
              bodyKh="ម៉ាស៊ីន MRI មិនថតរូបទេ — វាថតរលកវិទ្យុដែលលោតពីរាងកាយរបស់អ្នក។ ការបំប្លែង Fourier ប្តូររលកទាំងនោះទៅជារូបភាពច្បាស់នៃឆ្អឹង និងសរីរាង្គដែលគ្រូពេទ្យអាន។"
            />
            <MagicCard
              color={NEON_AMBER}
              Icon={Wifi}
              titleEn="Wi-Fi & Phones"
              titleKh="Wi-Fi និងទូរសព្ទ"
              taglineEn="Your signal, picked from the noise."
              taglineKh="សញ្ញារបស់អ្នក ជ្រើសចេញពីសំឡេងរំខាន។"
              bodyEn="The air around you is full of overlapping radio waves — your router, your neighbour's, the microwave oven. Fourier sorts them by frequency so your phone can grab only the channel meant for it."
              bodyKh="ខ្យល់ជុំវិញអ្នកពោរពេញដោយរលកវិទ្យុដែលត្រួតគ្នា — រ៉ោតទ័ររបស់អ្នក របស់អ្នកជិតខាង ចង្ក្រានមីក្រូវ៉េវ។ Fourier តម្រៀបវាតាមប្រេកង់ ដូច្នេះទូរសព្ទរបស់អ្នកអាចចាប់យកតែប៉ុស្តិ៍ដែលសម្រាប់វាប៉ុណ្ណោះ។"
            />
          </div>
        </Section>

        {/* ── Closing note ─────────────────────────────────────── */}
        <section
          className="mt-12 sm:mt-16 rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${PANEL} 0%, ${PANEL_SOFT} 100%)`,
            border: `1px solid ${NEON_GREEN}40`,
            boxShadow: glow(NEON_GREEN, 4),
          }}
        >
          <Waves className="w-10 h-10 mx-auto mb-4" style={{ color: NEON_CYAN }} />
          <p
            className="text-lg sm:text-xl font-bold leading-relaxed"
            style={{ color: NEON_GREEN, textShadow: glow(NEON_GREEN, 6) }}
          >
            {t(
              "Every signal has a recipe. Fourier taught us how to read it.",
              "សញ្ញាគ្រប់មួយមានរូបមន្ត។ Fourier បានបង្រៀនយើងពីរបៀបអានវា។",
            )}
          </p>
          <p className="font-khmer mt-2 text-sm sm:text-base" style={{ color: TEXT_MUTED }}>
            Joseph Fourier · 1768–1830
          </p>
        </section>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  REUSABLE BUILDING BLOCKS
 * ══════════════════════════════════════════════════════════════════════════ */

function Section({
  icon: Icon,
  eyebrow,
  en,
  kh,
  children,
}: {
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  eyebrow: string;
  en: string;
  kh: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-14 sm:mb-20">
      <div className="flex items-start gap-4 mb-6 sm:mb-8">
        <div
          className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
          style={{
            background: PANEL,
            border: `1px solid ${NEON_GREEN}50`,
            boxShadow: glow(NEON_GREEN, 4),
          }}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: NEON_GREEN }} />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: NEON_CYAN }}
          >
            {eyebrow}
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: NEON_GREEN, textShadow: glow(NEON_GREEN, 6) }}
          >
            {en}
          </h2>
          <h3
            className="font-khmer text-lg sm:text-xl md:text-2xl mt-1 leading-snug"
            style={{ color: NEON_CYAN }}
          >
            {kh}
          </h3>
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
}

function AnalogyCard({
  color,
  labelEn,
  labelKh,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
}: {
  color: string;
  labelEn: string;
  labelKh: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{
        background: PANEL,
        border: `1px solid ${color}40`,
        boxShadow: glow(color, 3),
      }}
    >
      <p
        className="text-xs font-mono uppercase tracking-widest mb-3"
        style={{ color }}
      >
        {labelEn} · <span className="font-khmer">{labelKh}</span>
      </p>
      <h4 className="text-lg sm:text-xl font-bold mb-1" style={{ color: TEXT }}>
        {titleEn}
      </h4>
      <p className="font-khmer text-base sm:text-lg mb-3" style={{ color }}>
        {titleKh}
      </p>
      <p className="text-sm leading-relaxed mb-2" style={{ color: TEXT_DIM }}>
        {bodyEn}
      </p>
      <p className="font-khmer text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
        {bodyKh}
      </p>
    </div>
  );
}

function DomainCard({
  color,
  Icon,
  titleEn,
  titleKh,
  axisXEn,
  axisXKh,
  axisYEn,
  axisYKh,
  descEn,
  descKh,
  visual,
}: {
  color: string;
  Icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  titleEn: string;
  titleKh: string;
  axisXEn: string;
  axisXKh: string;
  axisYEn: string;
  axisYKh: string;
  descEn: string;
  descKh: string;
  visual: ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{
        background: PANEL,
        border: `1px solid ${color}40`,
        boxShadow: glow(color, 4),
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5" style={{ color }} />
        <div>
          <h4 className="text-lg sm:text-xl font-bold" style={{ color }}>
            {titleEn}
          </h4>
          <p className="font-khmer text-sm sm:text-base" style={{ color: TEXT_DIM }}>
            {titleKh}
          </p>
        </div>
      </div>

      <div
        className="rounded-xl p-3 mb-4 relative"
        style={{
          background: BG,
          border: `1px solid ${color}30`,
          minHeight: 200,
        }}
      >
        {visual}
        <div className="flex items-center justify-between mt-2 text-[10px] font-mono" style={{ color: TEXT_MUTED }}>
          <span>{axisYEn} / <span className="font-khmer">{axisYKh}</span></span>
          <span>{axisXEn} / <span className="font-khmer">{axisXKh}</span></span>
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-2" style={{ color: TEXT_DIM }}>
        {descEn}
      </p>
      <p className="font-khmer text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
        {descKh}
      </p>
    </div>
  );
}

function MagicCard({
  color,
  Icon,
  titleEn,
  titleKh,
  taglineEn,
  taglineKh,
  bodyEn,
  bodyKh,
}: {
  color: string;
  Icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  titleEn: string;
  titleKh: string;
  taglineEn: string;
  taglineKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6 h-full flex flex-col"
      style={{
        background: PANEL,
        border: `1px solid ${color}40`,
        boxShadow: glow(color, 3),
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `${color}15`,
          border: `1px solid ${color}50`,
          boxShadow: glow(color, 3),
        }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <h4 className="text-lg sm:text-xl font-bold" style={{ color: TEXT }}>
        {titleEn}
      </h4>
      <p className="font-khmer text-base sm:text-lg mb-3" style={{ color }}>
        {titleKh}
      </p>
      <p className="text-sm font-mono mb-3 italic" style={{ color }}>
        {taglineEn}
        <br />
        <span className="font-khmer not-italic">{taglineKh}</span>
      </p>
      <p className="text-sm leading-relaxed mb-2 flex-1" style={{ color: TEXT_DIM }}>
        {bodyEn}
      </p>
      <p className="font-khmer text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
        {bodyKh}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  SVG VISUALS — pure deterministic, no animation libs
 * ══════════════════════════════════════════════════════════════════════════ */

// Path generator for a sum of sines
function sinePath(
  width: number,
  height: number,
  components: { freq: number; amp: number; phase?: number }[],
  steps = 200,
) {
  const cy = height / 2;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const t = (i / steps) * Math.PI * 2;
    let y = 0;
    for (const c of components) {
      y += c.amp * Math.sin(c.freq * t + (c.phase ?? 0));
    }
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${(cy - y).toFixed(2)}`);
  }
  return points.join(" ");
}

function ScopeGrid({ width, height }: { width: number; height: number }) {
  const cols = 8;
  const rows = 4;
  const lines = [] as ReactNode[];
  for (let i = 1; i < cols; i++) {
    const x = (i / cols) * width;
    lines.push(<line key={`v${i}`} x1={x} y1={0} x2={x} y2={height} stroke={GRID} strokeWidth={1} />);
  }
  for (let i = 1; i < rows; i++) {
    const y = (i / rows) * height;
    lines.push(<line key={`h${i}`} x1={0} y1={y} x2={width} y2={y} stroke={GRID} strokeWidth={1} />);
  }
  // center line emphasised
  lines.push(
    <line key="cy" x1={0} y1={height / 2} x2={width} y2={height / 2} stroke={`${NEON_GREEN}30`} strokeWidth={1} strokeDasharray="3 4" />,
  );
  return <>{lines}</>;
}

function DecomposeVisual() {
  const W = 720;
  const H = 70;
  const components = [
    { freq: 1, amp: 18, phase: 0, color: NEON_AMBER, label: "f₁" },
    { freq: 3, amp: 10, phase: 0.5, color: NEON_PINK, label: "f₂" },
    { freq: 6, amp: 6, phase: 0, color: NEON_CYAN, label: "f₃" },
  ];
  const sumPath = sinePath(W, H, components);

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Composite */}
      <ScopeRow
        label={
          <span style={{ color: NEON_GREEN }}>
            f(t) = f₁ + f₂ + f₃ <span className="font-khmer text-xs ml-1" style={{ color: TEXT_DIM }}>(សញ្ញារួម)</span>
          </span>
        }
        width={W}
        height={H}
        path={sumPath}
        color={NEON_GREEN}
        thickness={2.4}
      />
      <div className="flex items-center justify-center" style={{ color: TEXT_MUTED }}>
        <span className="text-2xl">⇅</span>
      </div>
      {/* Components */}
      {components.map((c) => (
        <ScopeRow
          key={c.label}
          label={
            <span style={{ color: c.color }}>
              {c.label} ·{" "}
              <span className="font-mono" style={{ color: TEXT_DIM }}>
                {c.freq} Hz
              </span>
            </span>
          }
          width={W}
          height={H}
          path={sinePath(W, H, [c])}
          color={c.color}
          thickness={1.6}
        />
      ))}
    </div>
  );
}

function ScopeRow({
  label,
  width,
  height,
  path,
  color,
  thickness,
}: {
  label: ReactNode;
  width: number;
  height: number;
  path: string;
  color: string;
  thickness: number;
}) {
  return (
    <div>
      <p className="text-xs font-mono mb-1">{label}</p>
      <div
        className="rounded-md overflow-hidden"
        style={{ background: BG, border: `1px solid ${color}30` }}
      >
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full block" preserveAspectRatio="none">
          <ScopeGrid width={width} height={height} />
          <path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
      </div>
    </div>
  );
}

function TimeDomainVisual() {
  const W = 360;
  const H = 160;
  const components = [
    { freq: 1, amp: 32 },
    { freq: 3, amp: 18, phase: 0.6 },
    { freq: 5, amp: 10, phase: 1.2 },
  ];
  const path = sinePath(W, H, components);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-40 block" preserveAspectRatio="none">
      <ScopeGrid width={W} height={H} />
      <path
        d={path}
        fill="none"
        stroke={NEON_GREEN}
        strokeWidth={2.2}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 5px ${NEON_GREEN})` }}
      />
    </svg>
  );
}

function FrequencyDomainVisual() {
  const W = 360;
  const H = 160;
  const baseY = H - 14;
  // Six bars matching the components (and a couple of small noise bars)
  const bars = [
    { x: 0.10, h: 100, label: "1" },
    { x: 0.22, h: 24,  label: "2" },
    { x: 0.34, h: 70,  label: "3" },
    { x: 0.46, h: 18,  label: "4" },
    { x: 0.58, h: 50,  label: "5" },
    { x: 0.70, h: 14,  label: "6" },
    { x: 0.82, h: 9,   label: "7" },
  ];
  const barW = 26;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-40 block" preserveAspectRatio="none">
      <ScopeGrid width={W} height={H} />
      {/* baseline */}
      <line x1={0} y1={baseY} x2={W} y2={baseY} stroke={`${NEON_CYAN}50`} strokeWidth={1} />
      {bars.map((b) => {
        const x = b.x * W;
        const y = baseY - b.h;
        return (
          <g key={b.label}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={b.h}
              rx={2}
              fill={NEON_CYAN}
              opacity={0.85}
              style={{ filter: `drop-shadow(0 0 4px ${NEON_CYAN})` }}
            />
            <text
              x={x + barW / 2}
              y={baseY + 10}
              textAnchor="middle"
              fontSize={9}
              fontFamily="ui-monospace, monospace"
              fill={TEXT_MUTED}
            >
              {b.label}
            </text>
          </g>
        );
      })}
      {/* tiny radio icon hint */}
      <Radio style={{ display: "none" }} />
    </svg>
  );
}
