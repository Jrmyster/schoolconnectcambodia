import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  Footprints,
  HeartHandshake,
  Lightbulb,
  Map as MapIcon,
  Quote,
  Scale,
  Sparkles,
  Stethoscope,
  Users,
  Unlink,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  STRUCTURAL VIOLENCE: THE INVISIBLE INJURY
 *  អំពើហិង្សាជារចនាសម្ព័ន្ធ៖ របួសដែលមើលមិនឃើញ
 *
 *  Lives under: Public Health & Sanctuary
 *  Route:       /well-being/sanctuary/structural-violence
 *
 *  Sections:
 *    1. Defining the Term — Galtung 1969, direct vs. structural
 *    2. The Link to Poverty — Maps vs. Territories
 *    3. Toward a Solution — Resource-Based Thinking
 *
 *  Aesthetic: Humanitarian — soft blues, charcoal greys, clean white cards.
 * ══════════════════════════════════════════════════════════════════════════ */

type T = (en: string, kh: string) => string;

const HUMAN_BLUE       = "#0369a1";  // soft humanitarian blue
const HUMAN_BLUE_SOFT  = "#e0f2fe";  // very pale blue for backgrounds
const HUMAN_BLUE_DEEP  = "#0c4a6e";  // deep ink blue for emphasis
const CHARCOAL         = "#334155";  // primary text grey
const CHARCOAL_SOFT    = "#64748b";  // secondary text grey
const WARM_AMBER       = "#b45309";  // careful, restrained accent

const FRAME: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  backgroundImage:
    "radial-gradient(circle at 12% 12%, rgba(3, 105, 161, 0.06), transparent 45%)," +
    "radial-gradient(circle at 88% 88%, rgba(100, 116, 139, 0.05), transparent 50%)",
};

/* ─── Section header ──────────────────────────────────────────────────────── */

function SectionHeader({
  spec,
  en,
  kh,
  k,
  Icon,
}: {
  spec: string;
  en: string;
  kh: string;
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  // Always render BOTH languages, regardless of UI mode — the section title
  // is a core heading and the spec requires strict bilingual presentation.
  // In English mode the English title leads; in Khmer mode the Khmer title
  // leads; the other language follows in a smaller, softer subtitle.
  const primaryEn = !k;
  return (
    <div className="mb-6 flex items-center gap-3 flex-wrap">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded-full px-3 py-1 shadow-sm"
        style={{ backgroundColor: HUMAN_BLUE }}
      >
        SEC-{spec}
      </span>
      <Icon className="w-6 h-6" style={{ color: HUMAN_BLUE_DEEP }} />
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl leading-tight ${primaryEn ? "" : "font-khmer leading-loose"}`}
        style={{ color: HUMAN_BLUE_DEEP }}
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
  color = HUMAN_BLUE_DEEP,
}: { en: string; kh: string; color?: string }) {
  return (
    <div className="text-xs uppercase tracking-wider font-bold mb-1 flex flex-wrap items-baseline gap-x-2" style={{ color }}>
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

/* ─── Page ────────────────────────────────────────────────────────────────── */

export function StructuralViolence() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  return (
    <div className="min-h-screen" style={FRAME}>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, #0c4a6e 0%, #1e293b 60%, #334155 100%)",
        }}
      >
        {/* subtle accent bar */}
        <div className="flex h-1.5">
          <div className="flex-1" style={{ backgroundColor: "#0ea5e9" }} />
          <div className="flex-1" style={{ backgroundColor: "#475569" }} />
          <div className="flex-1" style={{ backgroundColor: "#0ea5e9" }} />
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
            <Scale className="w-4 h-4 text-sky-200" />
            <span className={k ? "font-khmer" : ""}>
              {t("Public Health & Sanctuary", "សុខភាពសាធារណៈ និងសន្តិភាព")}
            </span>
          </div>

          <h1
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 ${k ? "font-khmer leading-loose" : ""}`}
          >
            {k
              ? "អំពើហិង្សាជារចនាសម្ព័ន្ធ៖ របួសដែលមើលមិនឃើញ"
              : "Structural Violence: The Invisible Injury"}
          </h1>
          <p
            className={`text-base sm:text-lg max-w-2xl leading-relaxed ${k ? "font-khmer leading-loose" : "font-khmer"}`}
            style={{ color: "rgba(224, 242, 254, 0.85)" }}
          >
            {k
              ? "Structural Violence: The Invisible Injury"
              : "អំពើហិង្សាជារចនាសម្ព័ន្ធ៖ របួសដែលមើលមិនឃើញ"}
          </p>

          <p
            className={`mt-5 text-sm sm:text-base max-w-2xl leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: "rgba(241, 245, 249, 0.8)" }}
          >
            {t(
              "Some injuries leave no bruises. They are written into laws, economies, and hospitals. To heal them, we must first learn to see them.",
              "របួសខ្លះមិនទុកស្នាមជាំទេ។ វាត្រូវបានសរសេរនៅក្នុងច្បាប់ សេដ្ឋកិច្ច និងមន្ទីរពេទ្យ។ ដើម្បីព្យាបាលវា យើងត្រូវរៀនមើលឃើញវាជាមុនសិន។",
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
        <SectionOneDefining t={t} k={k} />
        <SectionTwoPoverty t={t} k={k} />
        <SectionThreeSolution t={t} k={k} />

        {/* closing nav */}
        <nav
          className="pt-6 border-t flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
          style={{ borderColor: "#e2e8f0" }}
        >
          <Link
            href="/sanctuary"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: HUMAN_BLUE_DEEP }}
            data-testid="link-footer-sanctuary"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className={k ? "font-khmer text-base" : ""}>
              {t("Back to Sanctuary", "ត្រឡប់ទៅសន្តិភាព")}
            </span>
          </Link>
          <Link
            href="/well-being/public-health"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: HUMAN_BLUE_DEEP }}
            data-testid="link-footer-public-health"
          >
            <span className={k ? "font-khmer text-base" : ""}>
              {t("Continue to Public Health", "បន្តទៅសុខភាពសាធារណៈ")}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}

export default StructuralViolence;

/* ════════════════════════════════════════════════════════════════════════════
 *  SECTION 1 — Defining the Term (និយមន័យនៃពាក្យ)
 * ══════════════════════════════════════════════════════════════════════════ */

function SectionOneDefining({ t, k }: { t: T; k: boolean }) {
  return (
    <section
      aria-labelledby="sec-1-defining"
      data-testid="section-defining-term"
    >
      <SectionHeader
        spec="01"
        en="Defining the Term"
        kh="និយមន័យនៃពាក្យ"
        k={k}
        Icon={BookOpen}
      />

      {/* The Origin — Galtung quote card */}
      <div
        className="rounded-3xl bg-white border shadow-sm p-6 sm:p-8 mb-6"
        style={{ borderColor: "#e2e8f0" }}
        data-testid="card-galtung-origin"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: HUMAN_BLUE_SOFT }}
          >
            <Quote className="w-6 h-6" style={{ color: HUMAN_BLUE_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualHeading
              en="The Origin"
              kh="ប្រភពនៃពាក្យ"
              k={k}
              level="h3"
              className="text-lg sm:text-xl mb-2"
              style={{ color: CHARCOAL }}
            />
            <p
              className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {k ? (
                <>
                  ពាក្យ <span className="font-semibold">"អំពើហិង្សាជារចនាសម្ព័ន្ធ" (Structural Violence)</span>{" "}
                  ត្រូវបានបង្កើតឡើងដោយអ្នកស្រាវជ្រាវសន្តិភាពនរវែស ឈ្មោះ{" "}
                  <span className="font-semibold">Johan Galtung</span> ក្នុងឆ្នាំ <span className="font-mono">១៩៦៩</span>។
                  គាត់សុំឲ្យពិភពលោកមើលហួសពីសង្គ្រាម និងផ្ទុះកាំភ្លើង — ហើយឃើញថា មនុស្សជាច្រើនក៏រងគ្រោះដោយរបៀបដែលសង្គមត្រូវបានរៀបចំឡើងដែរ។
                </>
              ) : (
                <>
                  The term <span className="font-semibold">"Structural Violence"</span> was coined
                  by the Norwegian peace researcher{" "}
                  <span className="font-semibold">Johan Galtung</span> in <span className="font-mono">1969</span>.
                  He asked the world to look beyond bullets and bombs — and to see that many people
                  are also harmed by the way societies themselves are arranged.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* The Concept */}
      <div
        className="rounded-3xl bg-white border shadow-sm p-6 sm:p-8 mb-6"
        style={{ borderColor: "#e2e8f0" }}
        data-testid="card-concept"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: HUMAN_BLUE_SOFT }}
          >
            <Building2 className="w-6 h-6" style={{ color: HUMAN_BLUE_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualHeading
              en="The Concept"
              kh="គំនិតមូលដ្ឋាន"
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
                "Structural violence happens when a social structure or institution harms people by preventing them from meeting their basic needs — clean water, food, shelter, education, healthcare. No single attacker can be named; the harm is built into the system.",
                "អំពើហិង្សាជារចនាសម្ព័ន្ធកើតឡើង នៅពេលដែលរចនាសម្ព័ន្ធសង្គម ឬស្ថាប័នធ្វើបាបមនុស្ស ដោយរារាំងពួកគេមិនឲ្យបំពេញតម្រូវការមូលដ្ឋាន — ទឹកស្អាត អាហារ ជម្រក ការអប់រំ ការថែទាំសុខភាព។ គ្មាននរណាម្នាក់ដែលអាចចាត់ទុកជាជនល្មើសទេ។ ការធ្វើបាបនេះត្រូវបានបង្កើតឡើងនៅខាងក្នុងប្រព័ន្ធទាំងមូល។",
              )}
            </p>

            {/* basic-needs chip row */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { en: "Clean Water", kh: "ទឹកស្អាត" },
                { en: "Food", kh: "អាហារ" },
                { en: "Shelter", kh: "ជម្រក" },
                { en: "Education", kh: "ការអប់រំ" },
                { en: "Healthcare", kh: "ការថែទាំសុខភាព" },
              ].map((need) => (
                <span
                  key={need.en}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: HUMAN_BLUE_SOFT,
                    color: HUMAN_BLUE_DEEP,
                  }}
                >
                  <span>{k ? need.kh : need.en}</span>
                  <span
                    className={`opacity-70 ${k ? "" : "font-khmer"}`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {k ? need.en : need.kh}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Difference: Direct vs. Structural */}
      <BilingualHeading
        en="Key Difference: Direct vs. Structural"
        kh="ភាពខុសគ្នាសំខាន់៖ ផ្ទាល់ ទល់នឹង រចនាសម្ព័ន្ធ"
        k={k}
        level="h3"
        className="text-lg sm:text-xl mb-4"
        style={{ color: CHARCOAL }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Direct violence */}
        <article
          className="rounded-3xl bg-white border shadow-sm overflow-hidden flex flex-col"
          style={{ borderColor: "#e2e8f0" }}
          data-testid="card-direct-violence"
        >
          <div className="h-1.5" style={{ backgroundColor: WARM_AMBER }} />
          <div className="p-6 flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#fef3c7" }}
              >
                <Footprints className="w-5 h-5" style={{ color: WARM_AMBER }} />
              </div>
              <h4
                className={`font-display font-bold text-base ${k ? "font-khmer" : ""}`}
                style={{ color: CHARCOAL }}
              >
                <BilingualTerm en="Direct Violence" kh="អំពើហិង្សាផ្ទាល់" k={k} />
              </h4>
            </div>
            <p
              className={`text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "Visible. One person hits, shoots, or hurts another. You can name the attacker, point to the moment, and see the wound.",
                "មើលឃើញ។ មនុស្សម្នាក់វាយ បាញ់ ឬធ្វើបាបអ្នកដទៃ។ អ្នកអាចហៅឈ្មោះជនល្មើស ចង្អុលទៅពេលវេលា ហើយឃើញរបួសបាន។",
              )}
            </p>
            <div
              className="mt-2 text-xs uppercase tracking-wider font-bold"
              style={{ color: WARM_AMBER }}
            >
              {t("Visible · Personal", "មើលឃើញ · បុគ្គល")}
            </div>
          </div>
        </article>

        {/* Structural violence */}
        <article
          className="rounded-3xl bg-white border-2 shadow-md overflow-hidden flex flex-col"
          style={{ borderColor: HUMAN_BLUE }}
          data-testid="card-structural-violence"
        >
          <div className="h-1.5" style={{ backgroundColor: HUMAN_BLUE }} />
          <div className="p-6 flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: HUMAN_BLUE_SOFT }}
              >
                <Building2 className="w-5 h-5" style={{ color: HUMAN_BLUE_DEEP }} />
              </div>
              <h4
                className={`font-display font-bold text-base ${k ? "font-khmer" : ""}`}
                style={{ color: CHARCOAL }}
              >
                <BilingualTerm
                  en="Structural Violence"
                  kh="អំពើហិង្សាជារចនាសម្ព័ន្ធ"
                  k={k}
                />
              </h4>
            </div>
            <p
              className={`text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "Invisible. No fist, no weapon. The harm is built into the laws, the economy, and the healthcare system — quietly deciding who gets to live well and who does not.",
                "មើលមិនឃើញ។ គ្មានកណ្ដាប់ដៃ គ្មានអាវុធទេ។ ការធ្វើបាបនេះត្រូវបានបង្កើតឡើងនៅខាងក្នុងច្បាប់ សេដ្ឋកិច្ច និងប្រព័ន្ធថែទាំសុខភាព — ស្ងាត់ៗកំណត់ថា អ្នកណាបានរស់នៅយ៉ាងល្អ និងអ្នកណាមិនបាន។",
              )}
            </p>
            <div
              className="mt-2 text-xs uppercase tracking-wider font-bold"
              style={{ color: HUMAN_BLUE_DEEP }}
            >
              {t("Invisible · Systemic", "មើលមិនឃើញ · ប្រព័ន្ធទាំងមូល")}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  SECTION 2 — The Link to Poverty (ការផ្សារភ្ជាប់ទៅនឹងភាពក្រីក្រ)
 * ══════════════════════════════════════════════════════════════════════════ */

function SectionTwoPoverty({ t, k }: { t: T; k: boolean }) {
  return (
    <section aria-labelledby="sec-2-poverty" data-testid="section-link-poverty">
      <SectionHeader
        spec="02"
        en="The Link to Poverty"
        kh="ការផ្សារភ្ជាប់ទៅនឹងភាពក្រីក្រ"
        k={k}
        Icon={Users}
      />

      {/* Lead paragraph */}
      <div
        className="rounded-3xl bg-white border shadow-sm p-6 sm:p-8 mb-6"
        style={{ borderColor: "#e2e8f0" }}
      >
        <p
          className={`text-base sm:text-lg leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: CHARCOAL }}
        >
          {k ? (
            <>
              <span className="font-semibold">ភាពក្រីក្រ</span>{" "}
              គឺជាទម្រង់ដ៏ធម្មតាបំផុតនៃ
              <span className="font-semibold"> អំពើហិង្សាជារចនាសម្ព័ន្ធ</span>។
              វាមិនមែនគ្រាន់តែជាការខ្វះប្រាក់នោះទេ — វាជាប្រព័ន្ធមួយ ដែលមនុស្សខ្លះកើតមកជាមួយ
              "<span className="font-semibold">ផែនទី</span>" ផ្ដល់ឲ្យពួកគេនូវការចូលទៅដល់គ្រូពេទ្យ និងសាលា ខណៈដែលអ្នកដទៃកើតនៅក្នុង "<span className="font-semibold">ដែនដី</span>" ដែលរបស់ទាំងនោះត្រូវបានរារាំងតាមរូបកាយ ឬច្បាប់។
            </>
          ) : (
            <>
              <span className="font-semibold">Poverty</span> is the most common form of{" "}
              <span className="font-semibold">structural violence</span>. It is not just a lack
              of money — it is a system in which some people are born with{" "}
              <span className="font-semibold">"Maps"</span> that give them access to doctors and
              schools, while others are born into{" "}
              <span className="font-semibold">"Territories"</span> where those things are
              physically or legally blocked.
            </>
          )}
        </p>
      </div>

      {/* Maps vs. Territories visual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Maps */}
        <article
          className="rounded-3xl bg-white border shadow-sm overflow-hidden"
          style={{ borderColor: "#e2e8f0" }}
          data-testid="card-maps"
        >
          <div className="h-1.5" style={{ backgroundColor: HUMAN_BLUE }} />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: HUMAN_BLUE_SOFT }}
              >
                <MapIcon className="w-5 h-5" style={{ color: HUMAN_BLUE_DEEP }} />
              </div>
              <h4
                className={`font-display font-bold text-base ${k ? "font-khmer" : ""}`}
                style={{ color: CHARCOAL }}
              >
                <BilingualTerm en={`"Maps"`} kh={`"ផែនទី"`} k={k} />
              </h4>
            </div>
            <p
              className={`text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "Born with paths already drawn: nearby clinics, paved roads to school, family savings, and laws that protect them.",
                "កើតមកជាមួយផ្លូវដែលគូររួចជាស្រេច៖ គ្លីនិកនៅក្បែរ ផ្លូវកៅស៊ូទៅសាលា ការសន្សំរបស់គ្រួសារ និងច្បាប់ដែលការពារពួកគេ។",
              )}
            </p>
            <ul
              className={`mt-3 text-sm list-disc list-inside space-y-1 ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL_SOFT }}
            >
              <li>{t("Doctor 10 minutes away", "គ្រូពេទ្យឆ្ងាយ ១០ នាទី")}</li>
              <li>{t("School with electricity & books", "សាលាមានភ្លើង និងសៀវភៅ")}</li>
              <li>{t("Money for medicine when sick", "មានលុយទិញឱសថពេលឈឺ")}</li>
            </ul>
          </div>
        </article>

        {/* Territories */}
        <article
          className="rounded-3xl bg-white border shadow-sm overflow-hidden"
          style={{ borderColor: "#e2e8f0" }}
          data-testid="card-territories"
        >
          <div className="h-1.5" style={{ backgroundColor: CHARCOAL }} />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#e2e8f0" }}
              >
                <Footprints className="w-5 h-5" style={{ color: CHARCOAL }} />
              </div>
              <h4
                className={`font-display font-bold text-base ${k ? "font-khmer" : ""}`}
                style={{ color: CHARCOAL }}
              >
                <BilingualTerm en={`"Territories"`} kh={`"ដែនដី"`} k={k} />
              </h4>
            </div>
            <p
              className={`text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "Born into raw geography: no nearby clinic, the road floods every wet season, no savings, and rules written for someone else.",
                "កើតនៅក្នុងភូមិសាស្ត្រដើម៖ គ្មានគ្លីនិកនៅក្បែរ ផ្លូវលិចទឹករាល់រដូវវស្សា គ្មានការសន្សំ និងច្បាប់ដែលត្រូវសរសេរសម្រាប់នរណាម្នាក់ផ្សេងទៀត។",
              )}
            </p>
            <ul
              className={`mt-3 text-sm list-disc list-inside space-y-1 ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL_SOFT }}
            >
              <li>{t("Doctor a full day's travel away", "គ្រូពេទ្យឆ្ងាយមួយថ្ងៃធ្វើដំណើរ")}</li>
              <li>{t("School too far, or has no teacher", "សាលាឆ្ងាយពេក ឬគ្មានគ្រូ")}</li>
              <li>{t("No money for medicine when sick", "គ្មានលុយទិញឱសថពេលឈឺ")}</li>
            </ul>
          </div>
        </article>
      </div>

      {/* Educational Insight — emphasis card */}
      <div
        className="rounded-3xl border shadow-sm p-6 sm:p-8"
        style={{
          backgroundColor: HUMAN_BLUE_SOFT,
          borderColor: HUMAN_BLUE,
        }}
        data-testid="card-insight-preventable-disease"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "white" }}
          >
            <Stethoscope className="w-6 h-6" style={{ color: HUMAN_BLUE_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualEyebrow
              en="Educational Insight"
              kh="ការយល់ដឹងពីការអប់រំ"
              color={HUMAN_BLUE_DEEP}
            />
            <BilingualHeading
              en="When a child dies from a preventable disease…"
              kh="ពេលកុមារម្នាក់ស្លាប់ដោយជំងឺដែលអាចការពារបាន…"
              k={k}
              level="h3"
              className="text-lg sm:text-xl mb-2"
              style={{ color: HUMAN_BLUE_DEEP }}
            />
            <p
              className={`text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "…because their family cannot afford the medicine, that is not an accident. It is structural violence — quiet, lawful, and entirely preventable if we choose to redesign the system.",
                "…ដោយសារតែគ្រួសារមិនអាចទិញឱសថ — នោះមិនមែនជាគ្រោះថ្នាក់ទេ។ វាគឺជាអំពើហិង្សាជារចនាសម្ព័ន្ធ — ស្ងាត់ ស្របច្បាប់ ហើយអាចការពារបានទាំងស្រុង បើយើងជ្រើសរើសរៀបចំប្រព័ន្ធឡើងវិញ។",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  SECTION 3 — Toward a Solution (ឆ្ពោះទៅរកដំណោះស្រាយ)
 * ══════════════════════════════════════════════════════════════════════════ */

function SectionThreeSolution({ t, k }: { t: T; k: boolean }) {
  return (
    <section aria-labelledby="sec-3-solution" data-testid="section-toward-solution">
      <SectionHeader
        spec="03"
        en="Toward a Solution"
        kh="ឆ្ពោះទៅរកដំណោះស្រាយ"
        k={k}
        Icon={Lightbulb}
      />

      <div
        className="rounded-3xl bg-white border shadow-sm p-6 sm:p-8 mb-6"
        style={{ borderColor: "#e2e8f0" }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: HUMAN_BLUE_SOFT }}
          >
            <HeartHandshake className="w-6 h-6" style={{ color: HUMAN_BLUE_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualHeading
              en="Resource-Based Thinking"
              kh="ការគិតផ្អែកលើធនធាន"
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
                "To end structural violence, we must redesign our social \"Maps\" so that resources are distributed based on human needs rather than just profit. The question changes from \"Who can afford this?\" to \"Who needs this?\"",
                "ដើម្បីបញ្ចប់អំពើហិង្សាជារចនាសម្ព័ន្ធ យើងត្រូវរៀបចំ \"ផែនទី\" សង្គមរបស់យើងឡើងវិញ ដើម្បីឲ្យធនធានត្រូវបានបែងចែកផ្អែកលើតម្រូវការមនុស្ស មិនមែនគ្រាន់តែផលចំណេញនោះទេ។ សំណួរផ្លាស់ប្ដូរពី \"តើនរណាមានលទ្ធភាពទិញវាបាន?\" ទៅជា \"តើនរណាដែលត្រូវការវា?\"",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* From → To shift */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <article
          className="rounded-3xl bg-white border shadow-sm overflow-hidden"
          style={{ borderColor: "#e2e8f0" }}
          data-testid="card-shift-from"
        >
          <div className="h-1.5" style={{ backgroundColor: CHARCOAL }} />
          <div className="p-6">
            <BilingualEyebrow en="From" kh="ពី" color={CHARCOAL_SOFT} />
            <BilingualHeading
              en="Distribution by profit"
              kh="ការបែងចែកតាមផលចំណេញ"
              k={k}
              level="h4"
              className="text-lg mb-2"
              style={{ color: CHARCOAL }}
            />
            <p
              className={`text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL_SOFT }}
            >
              {t(
                "Medicine, schools, and clean water flow toward whoever has the most money — not whoever needs them most.",
                "ឱសថ សាលា និងទឹកស្អាតហូរទៅរកអ្នកដែលមានលុយច្រើនបំផុត — មិនមែនអ្នកដែលត្រូវការវាច្រើនបំផុតនោះទេ។",
              )}
            </p>
          </div>
        </article>

        <article
          className="rounded-3xl border-2 shadow-md overflow-hidden"
          style={{
            borderColor: HUMAN_BLUE,
            backgroundColor: "white",
          }}
          data-testid="card-shift-to"
        >
          <div className="h-1.5" style={{ backgroundColor: HUMAN_BLUE }} />
          <div className="p-6">
            <BilingualEyebrow en="To" kh="ទៅ" color={HUMAN_BLUE_DEEP} />
            <BilingualHeading
              en="Distribution by human need"
              kh="ការបែងចែកតាមតម្រូវការមនុស្ស"
              k={k}
              level="h4"
              className="text-lg mb-2"
              style={{ color: HUMAN_BLUE_DEEP }}
            />
            <p
              className={`text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: CHARCOAL }}
            >
              {t(
                "Resources reach the people whose lives depend on them first — turning the silent system from a weapon into a shelter.",
                "ធនធានទៅដល់មនុស្សដែលជីវិតពួកគេអាស្រ័យលើវាជាមុនសិន — ដោយប្រែប្រព័ន្ធស្ងាត់ៗ ពីអាវុធ ទៅជាជម្រកការពារ។",
              )}
            </p>
          </div>
        </article>
      </div>

      {/* Closing reflection */}
      <div className="mt-8 flex items-start gap-3">
        <Sparkles className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: HUMAN_BLUE }} />
        <p
          className={`text-sm sm:text-base italic leading-relaxed ${k ? "font-khmer leading-loose not-italic" : ""}`}
          style={{ color: CHARCOAL }}
        >
          {t(
            "Once you can see structural violence, you can no longer call its harms accidents. Seeing it is the first step toward healing it.",
            "ពេលអ្នកមើលឃើញអំពើហិង្សាជារចនាសម្ព័ន្ធ អ្នកមិនអាចហៅផលប៉ះពាល់របស់វាជាគ្រោះថ្នាក់ទៀតទេ។ ការមើលឃើញវា គឺជាជំហានដំបូងឆ្ពោះទៅរកការព្យាបាលវា។",
          )}
        </p>
      </div>
    </section>
  );
}

/* Suppress unused-import lints for icons reserved for future expansion. */
void Unlink;
void Scale;
