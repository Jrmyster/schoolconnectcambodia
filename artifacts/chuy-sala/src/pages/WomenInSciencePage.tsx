import { Link } from "wouter";
import {
  ArrowLeft,
  Atom,
  Award,
  Beaker,
  Brain,
  Dna,
  HeartPulse,
  Lightbulb,
  Quote,
  Rocket,
  Sigma,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { useTranslation } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  WOMEN IN SCIENCE: THE PIONEERS
 *  ស្ត្រីក្នុងវិស័យវិទ្យាសាស្ត្រ៖ អ្នកត្រួសត្រាយផ្លូវ
 *
 *  Lives under: Science
 *  Route:       /science/women-in-science
 *
 *  Aesthetic: soft purples, warm golds, clean whites — inspiring & elegant.
 * ══════════════════════════════════════════════════════════════════════════ */

const PURPLE_DEEP   = "#4c1d95"; // headlines / ink
const PURPLE        = "#7c3aed"; // primary accent
const PURPLE_SOFT   = "#ede9fe"; // chip / card backgrounds
const PURPLE_MIST   = "#f5f3ff"; // section washes
const GOLD          = "#b8860b"; // refined gold accent
const GOLD_SOFT     = "#fef3c7"; // gold chip background
const GOLD_DEEP     = "#92400e"; // gold ink for emphasis
const INK           = "#1f2937"; // body text
const INK_SOFT      = "#475569"; // secondary text

const FRAME: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "radial-gradient(circle at 12% 8%, rgba(124, 58, 237, 0.06), transparent 45%)," +
    "radial-gradient(circle at 88% 92%, rgba(184, 134, 11, 0.06), transparent 50%)",
};

type Scientist = {
  nameEn: string;
  nameKh: string;
  fieldEn: string;
  fieldKh: string;
  yearsEn: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  initials: string;
  summaryEn: string;
  summaryKh: string;
  contributionEn: string;
  contributionKh: string;
};

const SCIENTISTS: Scientist[] = [
  {
    nameEn: "Marie Curie",
    nameKh: "ម៉ារី គុយរី",
    fieldEn: "Chemistry & Physics",
    fieldKh: "គីមីវិទ្យា និង រូបវិទ្យា",
    yearsEn: "1867 – 1934",
    Icon: Atom,
    initials: "MC",
    summaryEn:
      "The first person — and still the only woman — to win two Nobel Prizes, in two different sciences.",
    summaryKh:
      "មនុស្សដំបូងគេ — ហើយនៅតែជាស្ត្រីតែម្នាក់គត់ — ដែលឈ្នះរង្វាន់ណូបែលពីរ ក្នុងវិទ្យាសាស្ត្រពីរផ្សេងគ្នា។",
    contributionEn:
      "She discovered radioactivity and the elements polonium and radium, paving the way for modern cancer treatments and X-ray medicine that save millions of lives every year.",
    contributionKh:
      "នាងបានរកឃើញវិទ្យុសកម្ម និងធាតុ ប៉ូឡូញ៉ូម និង រ៉ាដ្យូម ដោយបើកផ្លូវឲ្យការព្យាបាលជំងឺមហារីកសម័យទំនើប និងការថតកាំរស្មីអ៊ិច (X-ray) ដែលជួយសង្គ្រោះជីវិតរាប់លាននាក់ជារៀងរាល់ឆ្នាំ។",
  },
  {
    nameEn: "Rosalind Franklin",
    nameKh: "រ៉ូហ្សាលីន ហ្វ្រែងឃ្លីន",
    fieldEn: "Biology",
    fieldKh: "ជីវវិទ្យា",
    yearsEn: "1920 – 1958",
    Icon: Dna,
    initials: "RF",
    summaryEn:
      "The chemist whose precise X-ray photographs revealed the double-helix shape of DNA itself.",
    summaryKh:
      "គីមីវិទូដែលរូបថតកាំរស្មីអ៊ិចដ៏ច្បាស់លាស់របស់នាង បានបង្ហាញរូបរាងកំសៀវកំសៀរ (double-helix) នៃ DNA។",
    contributionEn:
      "Her famous \u201CPhoto 51\u201D unlocked the secret to how all life is built and copied — the foundation of every breakthrough in genetics, medicine, and biotechnology since.",
    contributionKh:
      "«រូបថតលេខ ៥១» ដ៏ល្បីរបស់នាងបានបើកសម្ងាត់ពីរបៀបដែលជីវិតទាំងអស់ត្រូវបានបង្កើត និងចម្លង — ជាមូលដ្ឋានគ្រឹះនៃរាល់ការរីកចម្រើនក្នុងហ្សែនវិទ្យា វេជ្ជសាស្ត្រ និងបច្ចេកវិទ្យាជីវសាស្ត្រ តាំងពីពេលនោះមក។",
  },
  {
    nameEn: "Tu Youyou",
    nameKh: "ទូ យូយូ",
    fieldEn: "Medicine",
    fieldKh: "វេជ្ជសាស្ត្រ",
    yearsEn: "b. 1930",
    Icon: Stethoscope,
    initials: "TY",
    summaryEn:
      "The scientist who searched 2,000-year-old Chinese medical texts to find a cure for malaria.",
    summaryKh:
      "អ្នកវិទ្យាសាស្ត្រដែលបានស្រាវជ្រាវឯកសារវេជ្ជសាស្ត្រចិនអាយុ ២០០០ ឆ្នាំ ដើម្បីរកថ្នាំព្យាបាលជំងឺគ្រុនចាញ់។",
    contributionEn:
      "Her discovery of artemisinin became the world's most effective malaria drug, saving millions of lives across Cambodia, Africa, and the tropics — and earning her the 2015 Nobel Prize in Medicine.",
    contributionKh:
      "ការរកឃើញ artemisinin របស់នាង បានក្លាយជាថ្នាំព្យាបាលគ្រុនចាញ់មានប្រសិទ្ធភាពបំផុតក្នុងពិភពលោក ជួយសង្គ្រោះជីវិតរាប់លាននាក់នៅកម្ពុជា អាហ្វ្រិក និងតំបន់ត្រូពិច — ហើយនាំឱ្យនាងទទួលបានរង្វាន់ណូបែលផ្នែកវេជ្ជសាស្ត្រឆ្នាំ ២០១៥។",
  },
  {
    nameEn: "Katherine Johnson",
    nameKh: "ខាថឺរីន ចនសុន",
    fieldEn: "Mathematics",
    fieldKh: "គណិតវិទ្យា",
    yearsEn: "1918 – 2020",
    Icon: Sigma,
    initials: "KJ",
    summaryEn:
      "The brilliant mathematician whose hand-calculated equations sent the first humans safely to the Moon.",
    summaryKh:
      "គណិតវិទូប៉ិនប្រសប់ ដែលសមីការគណនាដោយដៃរបស់នាងបានបញ្ជូនមនុស្សទីមួយទៅព្រះច័ន្ទដោយសុវត្ថិភាព។",
    contributionEn:
      "At NASA she computed the orbital trajectories for John Glenn's first American orbit and the Apollo 11 Moon landing — astronauts trusted her math more than the early computers.",
    contributionKh:
      "នៅ NASA នាងបានគណនាគន្លងគោចរសម្រាប់ការគោចរអាមេរិកដំបូងរបស់ John Glenn និងការចុះចតព្រះច័ន្ទ Apollo 11 — អវកាសយានិកជឿទុកចិត្តលើគណនារបស់នាង ច្រើនជាងកុំព្យូទ័រដំបូងៗទៀត។",
  },
];

function BilingualHeading({
  en,
  kh,
  Icon,
}: {
  en: string;
  kh: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="grid place-items-center rounded-2xl shrink-0"
        style={{
          backgroundColor: PURPLE_SOFT,
          width: 56,
          height: 56,
          color: PURPLE_DEEP,
          boxShadow: "0 6px 18px rgba(124, 58, 237, 0.18)",
        }}
        aria-hidden
      >
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <h2
          className="text-2xl sm:text-3xl font-bold leading-tight"
          style={{ color: PURPLE_DEEP }}
        >
          {en}
        </h2>
        <p
          className="font-khmer text-lg sm:text-xl mt-1"
          style={{ color: PURPLE }}
        >
          {kh}
        </p>
      </div>
    </div>
  );
}

function ScientistCard({ s }: { s: Scientist }) {
  const { Icon } = s;
  return (
    <article
      className="rounded-3xl p-6 sm:p-7 flex flex-col h-full"
      style={{
        backgroundColor: "#ffffff",
        border: `1px solid ${PURPLE_SOFT}`,
        boxShadow:
          "0 2px 4px rgba(76, 29, 149, 0.04), 0 12px 32px rgba(76, 29, 149, 0.08)",
      }}
      data-testid={`card-scientist-${s.initials.toLowerCase()}`}
    >
      {/* Stylized portrait — gold ring around an initials medallion */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className="relative shrink-0 grid place-items-center rounded-full"
          style={{
            width: 76,
            height: 76,
            background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_DEEP} 100%)`,
            boxShadow: `0 0 0 3px ${GOLD_SOFT}, 0 0 0 4px ${GOLD}`,
          }}
          aria-hidden
        >
          <span
            className="text-white text-xl font-bold tracking-wider"
            style={{ letterSpacing: "0.08em" }}
          >
            {s.initials}
          </span>
          <div
            className="absolute -bottom-1 -right-1 grid place-items-center rounded-full"
            style={{
              width: 28,
              height: 28,
              backgroundColor: GOLD,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="min-w-0">
          <h3
            className="text-xl font-bold leading-tight"
            style={{ color: PURPLE_DEEP }}
          >
            {s.nameEn}
          </h3>
          <p
            className="font-khmer text-base mt-0.5"
            style={{ color: PURPLE }}
          >
            {s.nameKh}
          </p>
          <p
            className="text-xs mt-1 font-medium"
            style={{ color: INK_SOFT }}
          >
            {s.yearsEn}
          </p>
        </div>
      </div>

      {/* Field chip */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: GOLD_SOFT, color: GOLD_DEEP }}
        >
          <Award className="w-3.5 h-3.5" />
          {s.fieldEn}
        </span>
        <span
          className="font-khmer inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: PURPLE_SOFT, color: PURPLE_DEEP }}
        >
          {s.fieldKh}
        </span>
      </div>

      {/* Summary */}
      <p className="text-sm leading-relaxed mb-2" style={{ color: INK }}>
        <span className="font-semibold" style={{ color: PURPLE_DEEP }}>
          {s.summaryEn}
        </span>
      </p>
      <p
        className="font-khmer text-sm leading-relaxed mb-4"
        style={{ color: INK_SOFT }}
      >
        {s.summaryKh}
      </p>

      {/* Contribution */}
      <div
        className="mt-auto rounded-2xl p-4"
        style={{ backgroundColor: PURPLE_MIST }}
      >
        <p className="text-sm leading-relaxed" style={{ color: INK }}>
          {s.contributionEn}
        </p>
        <p
          className="font-khmer text-sm leading-relaxed mt-2"
          style={{ color: INK_SOFT }}
        >
          {s.contributionKh}
        </p>
      </div>
    </article>
  );
}

export default function WomenInSciencePage() {
  const t = useTranslation();

  return (
    <div className="min-h-screen" style={FRAME}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/science"
          className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:underline"
          style={{ color: PURPLE }}
          data-testid="link-back-science"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
        </Link>

        {/* Hero */}
        <header className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: GOLD_SOFT, color: GOLD_DEEP }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t("Inspiration", "ការបំផុសគំនិត")}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-5xl font-bold leading-tight"
            style={{ color: PURPLE_DEEP }}
          >
            Women in Science: The Pioneers
          </h1>
          <p
            className="font-khmer text-2xl sm:text-3xl mt-2 leading-snug"
            style={{ color: PURPLE }}
          >
            ស្ត្រីក្នុងវិស័យវិទ្យាសាស្ត្រ៖ អ្នកត្រួសត្រាយផ្លូវ
          </p>
          <p className="mt-5 text-base sm:text-lg max-w-3xl" style={{ color: INK }}>
            Four extraordinary minds whose curiosity changed the world — from
            the structure of DNA to the medicine that cures malaria, from the
            atom to the Moon.
          </p>
          <p
            className="font-khmer mt-3 text-base sm:text-lg max-w-3xl leading-relaxed"
            style={{ color: INK_SOFT }}
          >
            ឧត្តមបញ្ញាជនបួននាក់ ដែលបំណងចង់ដឹងរបស់ពួកគេបានផ្លាស់ប្តូរពិភពលោក —
            ចាប់ពីរចនាសម្ព័ន្ធ DNA រហូតដល់ថ្នាំព្យាបាលគ្រុនចាញ់
            ចាប់ពីអាតូម រហូតដល់ព្រះច័ន្ទ។
          </p>
        </header>

        {/* ── Section 1: The Trailblazers ─────────────────────────────── */}
        <section className="mb-14 sm:mb-20">
          <BilingualHeading
            Icon={Award}
            en="The Trailblazers"
            kh="អ្នកត្រួសត្រាយផ្លូវ"
          />
          <p
            className="mt-4 mb-8 text-base max-w-3xl"
            style={{ color: INK_SOFT }}
          >
            {t(
              "Each of these scientists faced doors that were closed to women — and opened them anyway.",
              "អ្នកវិទ្យាសាស្ត្រទាំងនេះម្នាក់ៗបានជួបនឹងទ្វារដែលបិទចំពោះស្ត្រី — ហើយពួកគេបើកវាដោយរឹងមាំ។",
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {SCIENTISTS.map((s) => (
              <ScientistCard key={s.nameEn} s={s} />
            ))}
          </div>
        </section>

        {/* ── Section 2: The Future is You ────────────────────────────── */}
        <section className="mb-12">
          <BilingualHeading
            Icon={Lightbulb}
            en="The Future is You"
            kh="អនាគតគឺជារូបអ្នក"
          />

          <div
            className="relative mt-6 rounded-3xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${PURPLE_DEEP} 0%, ${PURPLE} 65%, #6d28d9 100%)`,
              boxShadow:
                "0 8px 24px rgba(76, 29, 149, 0.25), 0 24px 60px rgba(76, 29, 149, 0.18)",
            }}
            data-testid="box-inspiration"
          >
            {/* gold accent border */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1.5"
              style={{
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              }}
            />
            <div
              aria-hidden
              className="absolute -top-12 -right-12 w-56 h-56 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(254, 243, 199, 0.18), transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(254, 243, 199, 0.12), transparent 70%)",
              }}
            />

            <div className="relative p-7 sm:p-12">
              <Quote
                className="w-10 h-10 mb-5"
                style={{ color: GOLD_SOFT }}
                aria-hidden
              />

              <h3
                className="text-2xl sm:text-4xl font-bold leading-tight text-white"
              >
                Cambodia Needs Your Mind
              </h3>
              <p
                className="font-khmer text-xl sm:text-3xl mt-2 leading-snug"
                style={{ color: GOLD_SOFT }}
              >
                ប្រទេសកម្ពុជាត្រូវការបញ្ញារបស់អ្នក
              </p>

              <p
                className="mt-6 text-base sm:text-lg leading-relaxed text-white/95 max-w-3xl"
              >
                Intelligence has no gender. Whether it is engineering a new
                water filter, discovering a cure for a disease, or programming
                the next generation of AI, the world needs female doctors,
                chemists, and engineers. <strong>Your questions matter. Your
                ideas can change the world.</strong>
              </p>
              <p
                className="font-khmer mt-4 text-base sm:text-lg leading-relaxed max-w-3xl"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                បញ្ញាគ្មានភេទទេ។ មិនថាការបង្កើតម៉ាស៊ីនច្រោះទឹកថ្មី
                ការរកឃើញឱសថព្យាបាលជំងឺ ឬការសរសេរកម្មវិធី AI ជំនាន់ក្រោយ —
                ពិភពលោកត្រូវការវេជ្ជបណ្ឌិត គីមីវិទូ និងវិស្វករជាស្ត្រី។ <strong>សំណួររបស់អ្នកមានសារៈសំខាន់។ គំនិតរបស់អ្នកអាចផ្លាស់ប្តូរពិភពលោកបាន។</strong>
              </p>

              {/* Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    Icon: Beaker,
                    en: "Chemists",
                    kh: "គីមីវិទូ",
                  },
                  {
                    Icon: HeartPulse,
                    en: "Doctors",
                    kh: "វេជ្ជបណ្ឌិត",
                  },
                  {
                    Icon: Rocket,
                    en: "Engineers",
                    kh: "វិស្វករ",
                  },
                ].map(({ Icon, en, kh }) => (
                  <div
                    key={en}
                    className="rounded-2xl px-4 py-3 flex items-center gap-3"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(254, 243, 199, 0.25)",
                    }}
                  >
                    <Icon className="w-5 h-5 shrink-0" style={{ color: GOLD_SOFT }} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{en}</p>
                      <p
                        className="font-khmer text-xs"
                        style={{ color: "rgba(254, 243, 199, 0.9)" }}
                      >
                        {kh}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Closing thought */}
          <div
            className="mt-8 rounded-2xl p-5 sm:p-6 flex items-start gap-4"
            style={{
              backgroundColor: GOLD_SOFT,
              border: `1px solid ${GOLD}`,
            }}
          >
            <Brain
              className="w-6 h-6 shrink-0 mt-0.5"
              style={{ color: GOLD_DEEP }}
              aria-hidden
            />
            <div>
              <p className="text-sm sm:text-base font-semibold" style={{ color: GOLD_DEEP }}>
                Marie Curie. Rosalind Franklin. Tu Youyou. Katherine Johnson.
                The next name on this list could be yours.
              </p>
              <p
                className="font-khmer text-sm sm:text-base mt-1"
                style={{ color: GOLD_DEEP }}
              >
                ម៉ារី គុយរី។ រ៉ូហ្សាលីន ហ្វ្រែងឃ្លីន។ ទូ យូយូ។ ខាថឺរីន ចនសុន។
                ឈ្មោះបន្ទាប់ក្នុងបញ្ជីនេះអាចជារបស់អ្នក។
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
