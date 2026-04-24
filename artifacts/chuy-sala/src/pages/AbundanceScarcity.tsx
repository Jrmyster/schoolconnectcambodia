import { Link } from "wouter";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Brain,
  Cpu,
  Eye,
  Flame,
  Gauge,
  HeartHandshake,
  Lightbulb,
  Quote,
  Sparkles,
  Users,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  ABUNDANCE vs. SCARCITY: THE ARCHITECTURE OF BEHAVIOR
 *  ភាពសម្បូរបែប និងភាពខ្សត់ខ្សោយ៖ ស្ថាបត្យកម្មនៃអាកប្បកិរិយា
 *
 *  Lives under: Well-being
 *  Route:       /well-being/abundance-vs-scarcity
 *
 *  Sections:
 *    1. The Scarcity Map  — what scarcity does to societies & brains
 *    2. The Abundance Map — what abundance unlocks
 *    3. The Transition    — we already have the tools; greed is a symptom
 *
 *  Aesthetic: high-contrast — warm/stressful reds for Scarcity,
 *             cool/calm teals for Abundance, neutral charcoal frame.
 * ══════════════════════════════════════════════════════════════════════════ */

type T = (en: string, kh: string) => string;

/* ─── Palette ─────────────────────────────────────────────────────────────── */

// Scarcity — warm, stressful
const SCARCITY_RED       = "#b91c1c"; // dominant warning red
const SCARCITY_RED_SOFT  = "#fee2e2"; // pale red for backgrounds
const SCARCITY_RED_DEEP  = "#7f1d1d"; // deep ink red for emphasis
const SCARCITY_AMBER     = "#ea580c"; // warm orange accent

// Abundance — cool, calm
const ABUNDANCE_TEAL     = "#0d9488"; // calm teal
const ABUNDANCE_TEAL_SOFT = "#ccfbf1"; // pale teal for backgrounds
const ABUNDANCE_TEAL_DEEP = "#134e4a"; // deep ink teal for emphasis
const ABUNDANCE_SKY      = "#0284c7"; // cool sky-blue accent

// Neutral
const CHARCOAL          = "#334155"; // primary text grey
const CHARCOAL_SOFT     = "#64748b"; // secondary text grey

const FRAME: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  backgroundImage:
    // a subtle warm hint top-left, cool hint bottom-right — echoes the dual theme
    "radial-gradient(circle at 10% 10%, rgba(185, 28, 28, 0.05), transparent 45%)," +
    "radial-gradient(circle at 90% 90%, rgba(13, 148, 136, 0.05), transparent 50%)",
};

/* ─── Section header (always bilingual) ───────────────────────────────────── */

function SectionHeader({
  spec,
  en,
  kh,
  k,
  Icon,
  accent,
}: {
  spec: string;
  en: string;
  kh: string;
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  // Each section can use its own theme accent (warm for Scarcity,
  // cool for Abundance, balanced for Transition).
  accent: { bg: string; ink: string };
}) {
  const primaryEn = !k;
  return (
    <div className="mb-6 flex items-center gap-3 flex-wrap">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded-full px-3 py-1 shadow-sm"
        style={{ backgroundColor: accent.bg }}
      >
        SEC-{spec}
      </span>
      <Icon className="w-6 h-6" style={{ color: accent.ink }} />
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl leading-tight ${primaryEn ? "" : "font-khmer leading-loose"}`}
        style={{ color: accent.ink }}
      >
        {primaryEn ? en : kh}
      </h2>
      <span
        className={`text-base sm:text-lg ml-1 ${primaryEn ? "font-khmer" : ""}`}
        style={{ color: CHARCOAL_SOFT }}
      >
        {primaryEn ? kh : en}
      </span>
    </div>
  );
}

/* ─── Bilingual heading helper (always shows BOTH languages) ─────────────── */

function BilingualHeading({
  en,
  kh,
  k,
  level = "h3",
  className = "",
  style,
}: {
  en: string;
  kh: string;
  k: boolean;
  level?: "h3" | "h4";
  className?: string;
  style?: React.CSSProperties;
}) {
  const primaryEn = !k;
  const Tag = level;
  return (
    <Tag className={`leading-tight ${className}`} style={style}>
      <span className={`font-display font-bold ${primaryEn ? "" : "font-khmer"}`}>
        {primaryEn ? en : kh}
      </span>
      <span
        className={`block text-sm font-normal mt-0.5 ${primaryEn ? "font-khmer" : ""}`}
        style={{ color: CHARCOAL_SOFT }}
      >
        {primaryEn ? kh : en}
      </span>
    </Tag>
  );
}

/* ─── Bilingual eyebrow / small uppercase label ──────────────────────────── */

function BilingualEyebrow({
  en,
  kh,
  color = CHARCOAL,
}: { en: string; kh: string; color?: string }) {
  return (
    <div
      className="text-xs uppercase tracking-wider font-bold mb-1 flex flex-wrap items-baseline gap-x-2"
      style={{ color }}
    >
      <span>{en}</span>
      <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">
        {kh}
      </span>
    </div>
  );
}

/* ─── Bilingual term chip (English + Khmer side-by-side) ─────────────────── */

function BilingualTerm({
  en,
  kh,
  k,
}: { en: string; kh: string; k: boolean }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className={k ? "font-khmer" : "font-semibold"}>
        {k ? kh : en}
      </span>
      <span
        className={`text-xs italic ${k ? "" : "font-khmer not-italic text-sm"}`}
        style={{ color: CHARCOAL_SOFT }}
      >
        ({k ? en : kh})
      </span>
    </span>
  );
}

/* ─── Bilingual chip pill (used for resource / characteristic tags) ──────── */

function BilingualChip({
  en,
  kh,
  k,
  bg,
  ink,
}: { en: string; kh: string; k: boolean; bg: string; ink: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ backgroundColor: bg, color: ink }}
    >
      <span className={k ? "font-khmer" : ""}>{k ? kh : en}</span>
      <span
        className={`opacity-70 ${k ? "" : "font-khmer"}`}
        style={{ fontSize: "0.7rem" }}
      >
        {k ? en : kh}
      </span>
    </span>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export function AbundanceScarcity() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  return (
    <div className="min-h-screen" style={FRAME}>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden text-white"
        style={{
          // duotone gradient — warm scarcity on the left fading into cool abundance on the right
          background:
            "linear-gradient(110deg, #7f1d1d 0%, #44403c 38%, #1f2937 62%, #134e4a 100%)",
        }}
      >
        {/* accent bar — visually splits warm | neutral | cool */}
        <div className="flex h-1.5">
          <div className="flex-1" style={{ backgroundColor: SCARCITY_AMBER }} />
          <div className="flex-1" style={{ backgroundColor: "#475569" }} />
          <div className="flex-1" style={{ backgroundColor: ABUNDANCE_TEAL }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative z-10">
          {/* breadcrumb */}
          <Link
            href="/sanctuary"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            data-testid="link-back-sanctuary"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className={k ? "font-khmer text-base" : ""}>
              {t("Back to Sanctuary", "ត្រឡប់ទៅសន្តិភាព")}
            </span>
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 text-xs sm:text-sm font-semibold backdrop-blur-sm">
            <Gauge className="w-4 h-4 text-teal-200" />
            <span className={k ? "font-khmer" : ""}>
              {t("Well-being", "សុខុមាលភាព")}
            </span>
          </div>

          <h1
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 ${k ? "font-khmer leading-loose" : ""}`}
          >
            {k
              ? "ភាពសម្បូរបែប និងភាពខ្សត់ខ្សោយ៖ ស្ថាបត្យកម្មនៃអាកប្បកិរិយា"
              : "Abundance vs. Scarcity: The Architecture of Behavior"}
          </h1>
          <p
            className={`text-base sm:text-lg max-w-2xl leading-relaxed ${k ? "font-khmer leading-loose" : "font-khmer"}`}
            style={{ color: "rgba(224, 242, 254, 0.85)" }}
          >
            {k
              ? "Abundance vs. Scarcity: The Architecture of Behavior"
              : "ភាពសម្បូរបែប និងភាពខ្សត់ខ្សោយ៖ ស្ថាបត្យកម្មនៃអាកប្បកិរិយា"}
          </p>

          <p
            className={`mt-5 text-sm sm:text-base max-w-2xl leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: "rgba(241, 245, 249, 0.8)" }}
          >
            {t(
              "Behavior is shaped by the world we build. When the world withholds, we hoard. When the world provides, we create. The architecture comes first; the behavior follows.",
              "អាកប្បកិរិយាត្រូវបានរូបរាងដោយពិភពលោកដែលយើងសាងសង់។ ពេលពិភពលោករារាំង យើងប្រមូលផ្តុំ។ ពេលពិភពលោកផ្ដល់ យើងបង្កើត។ ស្ថាបត្យកម្មមកមុន អាកប្បកិរិយាមកក្រោយ។",
            )}
          </p>
        </div>

        {/* soft bottom curve */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="#f8fafc" />
        </svg>
      </header>

      {/* ── BODY ────────────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <SectionOneScarcity t={t} k={k} />
        <SectionTwoAbundance t={t} k={k} />
        <SectionThreeTransition t={t} k={k} />

        {/* closing nav */}
        <nav
          className="pt-6 border-t flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
          style={{ borderColor: "#e2e8f0" }}
        >
          <Link
            href="/sanctuary"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: ABUNDANCE_TEAL_DEEP }}
            data-testid="link-footer-sanctuary"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className={k ? "font-khmer text-base" : ""}>
              {t("Back to Sanctuary", "ត្រឡប់ទៅសន្តិភាព")}
            </span>
          </Link>
          <Link
            href="/well-being/sanctuary/structural-violence"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: ABUNDANCE_TEAL_DEEP }}
            data-testid="link-footer-structural-violence"
          >
            <span className={k ? "font-khmer text-base" : ""}>
              {t("Continue to Structural Violence", "បន្តទៅអំពើហិង្សាជារចនាសម្ព័ន្ធ")}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}

export default AbundanceScarcity;

/* ════════════════════════════════════════════════════════════════════════════
 *  SECTION 1 — The Scarcity Map (ផែនទីនៃភាពខ្សត់ខ្សោយ)
 * ══════════════════════════════════════════════════════════════════════════ */

function SectionOneScarcity({ t, k }: { t: T; k: boolean }) {
  return (
    <section
      aria-labelledby="sec-1-scarcity"
      data-testid="section-scarcity-map"
    >
      <SectionHeader
        spec="01"
        en="The Scarcity Map"
        kh="ផែនទីនៃភាពខ្សត់ខ្សោយ"
        k={k}
        Icon={AlertTriangle}
        accent={{ bg: SCARCITY_RED, ink: SCARCITY_RED_DEEP }}
      />

      {/* Defining Scarcity */}
      <article
        className="rounded-3xl bg-white border-2 shadow-sm p-6 sm:p-8 mb-6"
        style={{ borderColor: SCARCITY_RED_SOFT }}
        data-testid="card-scarcity-define"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: SCARCITY_RED_SOFT }}
          >
            <BookOpen className="w-6 h-6" style={{ color: SCARCITY_RED_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualHeading
              en="Defining Scarcity"
              kh="និយមន័យនៃភាពខ្សត់ខ្សោយ"
              k={k}
              level="h3"
              className="text-lg sm:text-xl mb-2"
              style={{ color: SCARCITY_RED_DEEP }}
            />
            <p
              className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "Scarcity is the condition where essential resources — food, clean water, energy, shelter, medicine — are limited or actively withheld from the people who need them. It can be natural, but in modern societies it is most often manufactured by economic and political systems.",
                "ភាពខ្សត់ខ្សោយគឺជាស្ថានភាពដែលធនធានចាំបាច់ — អាហារ ទឹកស្អាត ថាមពល ជម្រក ឱសថ — មានកម្រិត ឬត្រូវបានរារាំងយ៉ាងសកម្មពីមនុស្សដែលត្រូវការវា។ វាអាចមានលក្ខណៈធម្មជាតិ ប៉ុន្តែនៅក្នុងសង្គមទំនើប វាភាគច្រើនត្រូវបានបង្កើតឡើងដោយប្រព័ន្ធសេដ្ឋកិច្ច និងនយោបាយ។",
              )}
            </p>

            {/* limited / withheld resources */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { en: "Food", kh: "អាហារ" },
                { en: "Water", kh: "ទឹកស្អាត" },
                { en: "Energy", kh: "ថាមពល" },
                { en: "Shelter", kh: "ជម្រក" },
                { en: "Medicine", kh: "ឱសថ" },
              ].map((r) => (
                <BilingualChip
                  key={r.en}
                  en={r.en}
                  kh={r.kh}
                  k={k}
                  bg={SCARCITY_RED_SOFT}
                  ink={SCARCITY_RED_DEEP}
                />
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Societal Characteristics — Scarcity */}
      <article
        className="rounded-3xl bg-white border-2 shadow-sm p-6 sm:p-8 mb-6"
        style={{ borderColor: SCARCITY_RED_SOFT }}
        data-testid="card-scarcity-society"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: SCARCITY_RED_SOFT }}
          >
            <Flame className="w-6 h-6" style={{ color: SCARCITY_AMBER }} />
          </div>
          <div className="min-w-0">
            <BilingualHeading
              en="Societal Characteristics"
              kh="លក្ខណៈសង្គម"
              k={k}
              level="h3"
              className="text-lg sm:text-xl mb-2"
              style={{ color: SCARCITY_RED_DEEP }}
            />
            <p
              className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "When resources feel limited, society organizes around competition for survival: schools rank and fail children, families hoard goods, leaders rise on fear, and crime and conflict become predictable survival mechanisms — not character flaws.",
                "ពេលធនធានហាក់មានកម្រិត សង្គមរៀបចំខ្លួនជុំវិញការប្រកួតប្រជែងដើម្បីរស់រាន៖ សាលាដាក់ចំណាត់ថ្នាក់ និងបណ្ដោយឲ្យកុមារធ្លាក់ គ្រួសារប្រមូលផ្តុំទំនិញ មេដឹកនាំឡើងកាន់អំណាចលើភាពភ័យខ្លាច ហើយឧក្រិដ្ឋកម្ម និងជម្លោះក្លាយជាយន្តការរស់រានដែលអាចព្យាករណ៍បាន — មិនមែនកំហុសចរិកនោះទេ។",
              )}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { en: "Competitive education", kh: "ការអប់រំប្រកួតប្រជែង" },
                { en: "Hoarding of goods", kh: "ការប្រមូលផ្តុំទំនិញ" },
                { en: "High stress", kh: "ភាពតានតឹងខ្ពស់" },
                { en: "Crime & conflict", kh: "ឧក្រិដ្ឋកម្ម និងជម្លោះ" },
              ].map((c) => (
                <BilingualChip
                  key={c.en}
                  en={c.en}
                  kh={c.kh}
                  k={k}
                  bg={SCARCITY_RED_SOFT}
                  ink={SCARCITY_RED_DEEP}
                />
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Behavioral Impact — Tunnel Vision */}
      <article
        className="rounded-3xl border-2 shadow-md p-6 sm:p-8"
        style={{
          backgroundColor: SCARCITY_RED_SOFT,
          borderColor: SCARCITY_RED,
        }}
        data-testid="card-scarcity-tunnel-vision"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "white" }}
          >
            <Eye className="w-6 h-6" style={{ color: SCARCITY_RED_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualEyebrow
              en="Behavioral Impact"
              kh="ផលប៉ះពាល់លើអាកប្បកិរិយា"
              color={SCARCITY_RED_DEEP}
            />
            <h3 className="leading-tight mb-2">
              <span className="font-display font-bold text-lg sm:text-xl" style={{ color: SCARCITY_RED_DEEP }}>
                <BilingualTerm en={`"Tunnel Vision"`} kh={`"ចក្ខុវិស័យចង្អៀត"`} k={k} />
              </span>
            </h3>
            <p
              className={`text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "Humans living in scarcity narrow their attention to immediate survival. Behavioral scientists call this 'Tunnel Vision'. Long-term planning, cooperation with strangers, and creative thinking all become harder — not because the person is weak, but because the brain is overloaded by the threat of going without.",
                "មនុស្សដែលរស់នៅក្នុងភាពខ្សត់ខ្សោយ បង្រួមការផ្តោតរបស់ខ្លួនទៅលើការរស់រានភ្លាមៗ។ អ្នកវិទ្យាសាស្ត្រអាកប្បកិរិយាហៅវាថា 'ចក្ខុវិស័យចង្អៀត'។ ការរៀបចំផែនការរយៈពេលវែង ការសហការជាមួយមនុស្សចម្លែក និងការគិតច្នៃប្រឌិត ទាំងអស់នេះក្លាយជារឿងពិបាក — មិនមែនដោយសារមនុស្សនោះខ្សោយទេ ប៉ុន្តែដោយសារខួរក្បាលត្រូវបានដាក់បន្ទុកលើសដោយការគំរាមថានឹងគ្មាន។",
              )}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  SECTION 2 — The Abundance Map (ផែនទីនៃភាពសម្បូរបែប)
 * ══════════════════════════════════════════════════════════════════════════ */

function SectionTwoAbundance({ t, k }: { t: T; k: boolean }) {
  return (
    <section
      aria-labelledby="sec-2-abundance"
      data-testid="section-abundance-map"
    >
      <SectionHeader
        spec="02"
        en="The Abundance Map"
        kh="ផែនទីនៃភាពសម្បូរបែប"
        k={k}
        Icon={Sparkles}
        accent={{ bg: ABUNDANCE_TEAL, ink: ABUNDANCE_TEAL_DEEP }}
      />

      {/* Defining Abundance */}
      <article
        className="rounded-3xl bg-white border-2 shadow-sm p-6 sm:p-8 mb-6"
        style={{ borderColor: ABUNDANCE_TEAL_SOFT }}
        data-testid="card-abundance-define"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: ABUNDANCE_TEAL_SOFT }}
          >
            <BookOpen className="w-6 h-6" style={{ color: ABUNDANCE_TEAL_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualHeading
              en="Defining Abundance"
              kh="និយមន័យនៃភាពសម្បូរបែប"
              k={k}
              level="h3"
              className="text-lg sm:text-xl mb-2"
              style={{ color: ABUNDANCE_TEAL_DEEP }}
            />
            <p
              className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "Abundance is the condition where technology and the science of design make high-quality essentials — food, water, energy, education, healthcare — available to every person without a price tag. It is not magic; it is engineering applied with the goal of human well-being instead of profit.",
                "ភាពសម្បូរបែបគឺជាស្ថានភាពដែលបច្ចេកវិទ្យា និងវិទ្យាសាស្ត្ររចនាធ្វើឲ្យធនធានចាំបាច់គុណភាពខ្ពស់ — អាហារ ទឹក ថាមពល ការអប់រំ ការថែទាំសុខភាព — មានសម្រាប់មនុស្សគ្រប់រូបដោយគ្មានតម្លៃ។ វាមិនមែនជាមន្តអាគមទេ វាគឺជាវិស្វកម្មដែលអនុវត្តដោយគោលដៅសុខុមាលភាពមនុស្ស ជំនួសឲ្យផលចំណេញ។",
              )}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { en: "Food", kh: "អាហារ" },
                { en: "Water", kh: "ទឹក" },
                { en: "Energy", kh: "ថាមពល" },
                { en: "Education", kh: "ការអប់រំ" },
                { en: "Healthcare", kh: "ការថែទាំសុខភាព" },
              ].map((r) => (
                <BilingualChip
                  key={r.en}
                  en={r.en}
                  kh={r.kh}
                  k={k}
                  bg={ABUNDANCE_TEAL_SOFT}
                  ink={ABUNDANCE_TEAL_DEEP}
                />
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Societal Characteristics — Abundance */}
      <article
        className="rounded-3xl bg-white border-2 shadow-sm p-6 sm:p-8 mb-6"
        style={{ borderColor: ABUNDANCE_TEAL_SOFT }}
        data-testid="card-abundance-society"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: ABUNDANCE_TEAL_SOFT }}
          >
            <Users className="w-6 h-6" style={{ color: ABUNDANCE_SKY }} />
          </div>
          <div className="min-w-0">
            <BilingualHeading
              en="Societal Characteristics"
              kh="លក្ខណៈសង្គម"
              k={k}
              level="h3"
              className="text-lg sm:text-xl mb-2"
              style={{ color: ABUNDANCE_TEAL_DEEP }}
            />
            <p
              className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "When the floor of survival is guaranteed, the architecture of society changes. Learning becomes collaborative because no one needs to win a seat. Resources are shared like libraries instead of locked like vaults. Debt — a tool of the old system — fades away. Energy that used to be spent surviving is redirected toward creativity, science, and care.",
                "ពេលការរស់រានត្រូវបានធានា ស្ថាបត្យកម្មនៃសង្គមផ្លាស់ប្ដូរ។ ការសិក្សាក្លាយជាការសហការ ដោយសារគ្មាននរណាត្រូវឈ្នះកៅអី។ ធនធានត្រូវបានចែករំលែកដូចបណ្ណាល័យ ជំនួសឲ្យការចាក់សោដូចទូដែក។ បំណុល — ឧបករណ៍នៃប្រព័ន្ធចាស់ — រលត់ទៅ។ ថាមពលដែលធ្លាប់ត្រូវចំណាយលើការរស់រាន ត្រូវបានដឹកនាំទៅរកការច្នៃប្រឌិត វិទ្យាសាស្ត្រ និងការថែទាំ។",
              )}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { en: "Collaborative learning", kh: "ការសិក្សាសហការ" },
                { en: "Shared resources", kh: "ការចែករំលែកធនធាន" },
                { en: "No debt", kh: "គ្មានបំណុល" },
                { en: "Creative & scientific pursuits", kh: "ការច្នៃប្រឌិត និងវិទ្យាសាស្ត្រ" },
              ].map((c) => (
                <BilingualChip
                  key={c.en}
                  en={c.en}
                  kh={c.kh}
                  k={k}
                  bg={ABUNDANCE_TEAL_SOFT}
                  ink={ABUNDANCE_TEAL_DEEP}
                />
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Behavioral Impact — The Survival Brain Relaxes */}
      <article
        className="rounded-3xl border-2 shadow-md p-6 sm:p-8"
        style={{
          backgroundColor: ABUNDANCE_TEAL_SOFT,
          borderColor: ABUNDANCE_TEAL,
        }}
        data-testid="card-abundance-survival-brain"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "white" }}
          >
            <Brain className="w-6 h-6" style={{ color: ABUNDANCE_TEAL_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualEyebrow
              en="Behavioral Impact"
              kh="ផលប៉ះពាល់លើអាកប្បកិរិយា"
              color={ABUNDANCE_TEAL_DEEP}
            />
            <h3 className="leading-tight mb-2">
              <span className="font-display font-bold text-lg sm:text-xl" style={{ color: ABUNDANCE_TEAL_DEEP }}>
                <BilingualTerm
                  en={`The "Survival Brain" relaxes`}
                  kh={`"ខួរក្បាលរស់រាន" សម្រាក`}
                  k={k}
                />
              </span>
            </h3>
            <p
              className={`text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "When basic needs (the Territory) are met, the survival brain relaxes. People naturally become more altruistic, more curious, and more willing to plan for the long-term well-being of their community and the planet. Generosity is not a moral achievement here — it is what humans do when they are no longer afraid.",
                "ពេលដែលតម្រូវការមូលដ្ឋាន (ដែនដី) ត្រូវបានបំពេញ ខួរក្បាលរស់រានសម្រាក។ មនុស្សក្លាយជាមនុស្សដែលគិតពីអ្នកដទៃ ចង់ដឹងចង់ឃើញ និងសុខចិត្តរៀបចំផែនការសម្រាប់សុខុមាលភាពរយៈពេលវែងនៃសហគមន៍ និងភពផែនដី។ ការសប្បុរសនៅទីនេះមិនមែនជាសមិទ្ធផលសីលធម៌ទេ — វាគឺជាអ្វីដែលមនុស្សធ្វើ ពេលពួកគេលែងភ័យខ្លាច។",
              )}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  SECTION 3 — The Transition (ការផ្លាស់ប្តូរ)
 * ══════════════════════════════════════════════════════════════════════════ */

function SectionThreeTransition({ t, k }: { t: T; k: boolean }) {
  return (
    <section
      aria-labelledby="sec-3-transition"
      data-testid="section-transition"
    >
      <SectionHeader
        spec="03"
        en="The Transition"
        kh="ការផ្លាស់ប្តូរ"
        k={k}
        Icon={ArrowLeftRight}
        // Balanced ink — neither warm nor cool, to signal the bridge between worlds.
        accent={{ bg: CHARCOAL, ink: CHARCOAL }}
      />

      {/* From → To shift */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* From — Scarcity-based economy */}
        <article
          className="rounded-3xl bg-white border-2 shadow-sm overflow-hidden"
          style={{ borderColor: SCARCITY_RED_SOFT }}
          data-testid="card-transition-from"
        >
          <div className="h-1.5" style={{ backgroundColor: SCARCITY_RED }} />
          <div className="p-6">
            <BilingualEyebrow en="From" kh="ពី" color={SCARCITY_RED_DEEP} />
            <BilingualHeading
              en="A scarcity-based economy"
              kh="សេដ្ឋកិច្ចផ្អែកលើភាពខ្សត់ខ្សោយ"
              k={k}
              level="h4"
              className="text-lg mb-2"
              style={{ color: SCARCITY_RED_DEEP }}
            />
            <p
              className={`text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "Resources are distributed by price. Access is rationed by income. Survival is a private problem to solve.",
                "ធនធានត្រូវបានបែងចែកតាមតម្លៃ។ ការទទួលបានត្រូវបានកំណត់ដោយចំណូល។ ការរស់រានគឺជាបញ្ហាឯកជនដែលត្រូវដោះស្រាយ។",
              )}
            </p>
          </div>
        </article>

        {/* To — Abundance-based economy */}
        <article
          className="rounded-3xl bg-white border-2 shadow-md overflow-hidden"
          style={{ borderColor: ABUNDANCE_TEAL }}
          data-testid="card-transition-to"
        >
          <div className="h-1.5" style={{ backgroundColor: ABUNDANCE_TEAL }} />
          <div className="p-6">
            <BilingualEyebrow en="To" kh="ទៅ" color={ABUNDANCE_TEAL_DEEP} />
            <BilingualHeading
              en="An abundance-based economy"
              kh="សេដ្ឋកិច្ចផ្អែកលើភាពសម្បូរបែប"
              k={k}
              level="h4"
              className="text-lg mb-2"
              style={{ color: ABUNDANCE_TEAL_DEEP }}
            />
            <p
              className={`text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "Resources are distributed by need. Essentials are designed to be available to all. Survival is a shared baseline, not a daily contest.",
                "ធនធានត្រូវបានបែងចែកតាមតម្រូវការ។ របស់ចាំបាច់ត្រូវបានរចនាឲ្យមានសម្រាប់មនុស្សគ្រប់គ្នា។ ការរស់រានគឺជាបន្ទាត់មូលដ្ឋានរួម មិនមែនជាការប្រកួតប្រចាំថ្ងៃនោះទេ។",
              )}
            </p>
          </div>
        </article>
      </div>

      {/* We have the technology — body card */}
      <article
        className="rounded-3xl bg-white border shadow-sm p-6 sm:p-8 mb-6"
        style={{ borderColor: "#e2e8f0" }}
        data-testid="card-transition-technology"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: ABUNDANCE_TEAL_SOFT }}
          >
            <Cpu className="w-6 h-6" style={{ color: ABUNDANCE_TEAL_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualHeading
              en="We already have the technology"
              kh="យើងមានបច្ចេកវិទ្យារួចហើយ"
              k={k}
              level="h3"
              className="text-lg sm:text-xl mb-2"
              style={{ color: CHARCOAL }}
            />
            <p
              className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "Renewable energy, automated production, vertical farming, open knowledge, and modern logistics already give us the technical capacity to move from a scarcity-based economy to an abundance-based one. The barrier is not science. The barrier is design — choosing systems that distribute by human need rather than by price.",
                "ថាមពលកើតឡើងវិញ ផលិតកម្មស្វ័យប្រវត្តិ កសិកម្មបញ្ឈរ ចំណេះដឹងបើកទូលាយ និងភស្តុភារសម័យថ្មី បានផ្ដល់ឲ្យយើងរួចហើយនូវសមត្ថភាពបច្ចេកទេសក្នុងការផ្លាស់ប្ដូរពីសេដ្ឋកិច្ចផ្អែកលើភាពខ្សត់ខ្សោយ ទៅជាសេដ្ឋកិច្ចផ្អែកលើភាពសម្បូរបែប។ ឧបសគ្គមិនមែនជាវិទ្យាសាស្ត្រទេ។ ឧបសគ្គគឺជាការរចនា — ការជ្រើសរើសប្រព័ន្ធដែលបែងចែកតាមតម្រូវការមនុស្ស ជំនួសឲ្យតម្លៃ។",
              )}
            </p>
          </div>
        </div>
      </article>

      {/* Greed insight callout — bridges warm into cool */}
      <article
        className="rounded-3xl border-2 shadow-md p-6 sm:p-8"
        style={{
          // gentle gradient hinting at the spectrum from scarcity to abundance
          background:
            "linear-gradient(110deg, rgba(254, 226, 226, 0.55) 0%, rgba(204, 251, 241, 0.55) 100%)",
          borderColor: CHARCOAL_SOFT,
        }}
        data-testid="card-transition-greed-insight"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "white" }}
          >
            <Quote className="w-6 h-6" style={{ color: CHARCOAL }} />
          </div>
          <div className="min-w-0">
            <BilingualEyebrow
              en="Educational Insight"
              kh="ការយល់ដឹងពីការអប់រំ"
              color={CHARCOAL}
            />
            <h3 className="leading-tight mb-2">
              <span className="font-display font-bold text-lg sm:text-xl" style={{ color: CHARCOAL }}>
                <BilingualTerm
                  en={`"Greed" is a symptom, not a human trait`}
                  kh={`"ភាពលោភលន់" ជារោគសញ្ញា មិនមែនជាលក្ខណៈរបស់មនុស្ស`}
                  k={k}
                />
              </span>
            </h3>
            <p
              className={`text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "What we call 'greed' is rarely a flaw of character. It is the predictable behavior of people raised inside a system that punishes generosity and rewards accumulation. Change the architecture and the behavior changes too — because the behavior was never the cause; the system was.",
                "អ្វីដែលយើងហៅថា 'ភាពលោភលន់' កម្រជាពិការភាពនៃចរិកណាស់។ វាគឺជាអាកប្បកិរិយាដែលអាចព្យាករណ៍បាននៃមនុស្សដែលធំធាត់ឡើងនៅក្នុងប្រព័ន្ធដែលដាក់ទោសភាពសប្បុរស និងផ្ដល់រង្វាន់ដល់ការប្រមូលផ្តុំ។ ផ្លាស់ប្ដូរស្ថាបត្យកម្ម ហើយអាកប្បកិរិយានឹងផ្លាស់ប្ដូរផងដែរ — ដោយសារអាកប្បកិរិយាមិនដែលជាបុព្វហេតុទេ ប្រព័ន្ធទើបជាបុព្វហេតុ។",
              )}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold"
                style={{ backgroundColor: "white", color: ABUNDANCE_TEAL_DEEP }}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{t("Design the system for people", "រចនាប្រព័ន្ធសម្រាប់មនុស្ស")}</span>
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold"
                style={{ backgroundColor: "white", color: ABUNDANCE_TEAL_DEEP }}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{t("And the people will rise to meet it", "ហើយមនុស្សនឹងរួមគ្នាឆ្លើយតប")}</span>
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
