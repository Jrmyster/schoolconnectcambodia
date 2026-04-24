import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Circle,
  Eye,
  EyeOff,
  Microscope,
  Sparkles,
  Sun,
  ZoomIn,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  MICROSCOPES: SEEING THE INVISIBLE
 *  មីក្រូទស្សន៍៖ ការមើលឃើញអ្វីដែលមើលមិនឃើញ
 *
 *  Lives under: Biology, Genetics & Evolution
 *  Route:       /science/biology/microscopes
 *
 *  Sections:
 *    1. The Limits of the Eye  — why ~0.1 mm is the floor of unaided sight
 *    2. Bending Light          — convex lens + focal point
 *    3. The Math of Magnification — eyepiece × objective = total
 *
 *  Aesthetic: Biolab — deep emerald greens, lens cyan accent,
 *             tech-white surfaces, clean slate borders.
 * ══════════════════════════════════════════════════════════════════════════ */

type T = (en: string, kh: string) => string;

/* ─── Palette (Biolab) ────────────────────────────────────────────────────── */

const LAB_GREEN_DEEP  = "#064e3b"; // deep emerald — primary ink
const LAB_GREEN       = "#047857"; // primary lab green
const LAB_GREEN_SOFT  = "#d1fae5"; // pale mint
const LAB_LENS        = "#0891b2"; // lens / light cyan accent
const LAB_LENS_SOFT   = "#cffafe"; // pale cyan
const TECH_WHITE      = "#f8fafc"; // lab-bench background
const TECH_PAPER      = "#ffffff"; // card surface
const SLATE_BORDER    = "#e2e8f0"; // clean lab borders
const INK             = "#0f172a"; // primary text
const INK_SOFT        = "#475569"; // secondary text

const FRAME: React.CSSProperties = {
  backgroundColor: TECH_WHITE,
  // very faint biolab haze — green top-left, cyan bottom-right
  backgroundImage:
    "radial-gradient(circle at 12% 14%, rgba(4, 120, 87, 0.06), transparent 45%)," +
    "radial-gradient(circle at 88% 86%, rgba(8, 145, 178, 0.05), transparent 50%)",
};

/* ─── Section header (always bilingual) ───────────────────────────────────── */

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
  const primaryEn = !k;
  return (
    <div className="mb-6 flex items-center gap-3 flex-wrap">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded-full px-3 py-1 shadow-sm"
        style={{ backgroundColor: LAB_GREEN }}
      >
        SEC-{spec}
      </span>
      <Icon className="w-6 h-6" style={{ color: LAB_GREEN_DEEP }} />
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl leading-tight ${primaryEn ? "" : "font-khmer leading-loose"}`}
        style={{ color: LAB_GREEN_DEEP }}
      >
        {primaryEn ? en : kh}
      </h2>
      <span
        className={`text-base sm:text-lg ml-1 ${primaryEn ? "font-khmer" : ""}`}
        style={{ color: INK_SOFT }}
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
        style={{ color: INK_SOFT }}
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
  color = LAB_GREEN_DEEP,
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

/* ─── Bilingual term (English + Khmer side-by-side) ──────────────────────── */

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
        style={{ color: INK_SOFT }}
      >
        ({k ? en : kh})
      </span>
    </span>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export function Microscopes() {
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
            "linear-gradient(135deg, #064e3b 0%, #134e4a 55%, #0e7490 100%)",
        }}
      >
        {/* lab accent bar */}
        <div className="flex h-1.5">
          <div className="flex-1" style={{ backgroundColor: LAB_GREEN }} />
          <div className="flex-1" style={{ backgroundColor: "#0d9488" }} />
          <div className="flex-1" style={{ backgroundColor: LAB_LENS }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative z-10">
          {/* breadcrumb */}
          <Link
            href="/biology"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            data-testid="link-back-biology"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className={k ? "font-khmer text-base" : ""}>
              {t("Back to Biology Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលជីវវិទ្យា")}
            </span>
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 text-xs sm:text-sm font-semibold backdrop-blur-sm">
            <Microscope className="w-4 h-4 text-emerald-200" />
            <span className={k ? "font-khmer" : ""}>
              {t("Biology, Genetics & Evolution", "ជីវវិទ្យា ហ្សែន និងការវិវត្ត")}
            </span>
          </div>

          <h1
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 ${k ? "font-khmer leading-loose" : ""}`}
          >
            {k
              ? "មីក្រូទស្សន៍៖ ការមើលឃើញអ្វីដែលមើលមិនឃើញ"
              : "Microscopes: Seeing the Invisible"}
          </h1>
          <p
            className={`text-base sm:text-lg max-w-2xl leading-relaxed ${k ? "font-khmer leading-loose" : "font-khmer"}`}
            style={{ color: "rgba(207, 250, 254, 0.9)" }}
          >
            {k
              ? "Microscopes: Seeing the Invisible"
              : "មីក្រូទស្សន៍៖ ការមើលឃើញអ្វីដែលមើលមិនឃើញ"}
          </p>

          <p
            className={`mt-5 text-sm sm:text-base max-w-2xl leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: "rgba(241, 245, 249, 0.85)" }}
          >
            {t(
              "Two pieces of curved glass changed what humans could see — and rewrote our understanding of life itself. This is how it works.",
              "កញ្ចក់កោងពីរបន្ទះ បានផ្លាស់ប្ដូរអ្វីដែលមនុស្សអាចមើលឃើញ — ហើយសរសេរការយល់ដឹងរបស់យើងពីជីវិតឡើងវិញ។ នេះគឺជាវិធីដែលវាដំណើរការ។",
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
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill={TECH_WHITE} />
        </svg>
      </header>

      {/* ── BODY ────────────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <SectionOneEye t={t} k={k} />
        <SectionTwoLight t={t} k={k} />
        <SectionThreeMath t={t} k={k} />

        {/* closing nav */}
        <nav
          className="pt-6 border-t flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
          style={{ borderColor: SLATE_BORDER }}
        >
          <Link
            href="/biology"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: LAB_GREEN_DEEP }}
            data-testid="link-footer-biology"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className={k ? "font-khmer text-base" : ""}>
              {t("Back to Biology Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលជីវវិទ្យា")}
            </span>
          </Link>
          <Link
            href="/biology/cellular-power-plant"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: LAB_GREEN_DEEP }}
            data-testid="link-footer-cell-power"
          >
            <span className={k ? "font-khmer text-base" : ""}>
              {t(
                "Continue to The Cellular Power Plant",
                "បន្តទៅរោងចក្រថាមពលកោសិកា",
              )}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}

export default Microscopes;

/* ════════════════════════════════════════════════════════════════════════════
 *  SECTION 1 — The Limits of the Eye (ដែនកំណត់នៃភ្នែក)
 * ══════════════════════════════════════════════════════════════════════════ */

function SectionOneEye({ t, k }: { t: T; k: boolean }) {
  return (
    <section
      aria-labelledby="sec-1-eye"
      data-testid="section-limits-of-eye"
    >
      <SectionHeader
        spec="01"
        en="The Limits of the Eye"
        kh="ដែនកំណត់នៃភ្នែក"
        k={k}
        Icon={Eye}
      />

      {/* What the eye can see */}
      <article
        className="rounded-3xl border shadow-sm p-6 sm:p-8 mb-6"
        style={{ backgroundColor: TECH_PAPER, borderColor: SLATE_BORDER }}
        data-testid="card-eye-floor"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: LAB_GREEN_SOFT }}
          >
            <Eye className="w-6 h-6" style={{ color: LAB_GREEN_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualHeading
              en="What the naked eye can see"
              kh="អ្វីដែលភ្នែកទទេអាចមើលឃើញ"
              k={k}
              level="h3"
              className="text-lg sm:text-xl mb-2"
              style={{ color: LAB_GREEN_DEEP }}
            />
            <p
              className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK }}
            >
              {k ? (
                <>
                  ភ្នែកមនុស្សដែលមានសុខភាពល្អ អាចមើលឃើញវត្ថុដែលធំជាងប្រហែល{" "}
                  <span className="font-mono font-semibold">០,១ មិល្លីម៉ែត្រ</span>{" "}
                  — ប្រហែលនឹងទទឹងនៃ <span className="font-semibold">សក់មនុស្សមួយសរសៃ</span>។
                  អ្វីដែលតូចជាងនេះ នឹងព្រៀលបាត់ មិនថាអ្នកសម្លឹងខ្លាំងប៉ុណ្ណាទេ។
                </>
              ) : (
                <>
                  Healthy human eyes can only resolve objects bigger than about{" "}
                  <span className="font-mono font-semibold">0.1 millimeters</span> —
                  roughly the width of a single{" "}
                  <span className="font-semibold">human hair</span>. Anything smaller
                  blurs into nothing, no matter how hard you stare.
                </>
              )}
            </p>
          </div>
        </div>
      </article>

      {/* Visible vs invisible scale ruler */}
      <article
        className="rounded-3xl border shadow-sm p-6 sm:p-8 mb-6"
        style={{ backgroundColor: TECH_PAPER, borderColor: SLATE_BORDER }}
        data-testid="card-scale-ruler"
      >
        <BilingualEyebrow
          en="Scale of life"
          kh="មាត្រដ្ឋាននៃជីវិត"
          color={LAB_GREEN_DEEP}
        />
        <BilingualHeading
          en="Above and below the visible line"
          kh="លើ និងក្រោមបន្ទាត់ដែលអាចមើលឃើញ"
          k={k}
          level="h3"
          className="text-lg sm:text-xl mb-4"
          style={{ color: LAB_GREEN_DEEP }}
        />

        <ul className="space-y-2">
          {[
            {
              en: "Human hair",
              kh: "សក់មនុស្ស",
              size: "~0.1 mm",
              khSize: "~០,១ មម",
              visible: true,
            },
            {
              en: "Red blood cell",
              kh: "កោសិកាឈាមក្រហម",
              size: "~0.008 mm",
              khSize: "~០,០០៨ មម",
              visible: false,
            },
            {
              en: "Bacterium",
              kh: "បាក់តេរី",
              size: "~0.001 mm",
              khSize: "~០,០០១ មម",
              visible: false,
            },
            {
              en: "DNA strand",
              kh: "ខ្សែ DNA",
              size: "~0.000002 mm",
              khSize: "~០,០០០០០២ មម",
              visible: false,
            },
          ].map((row) => (
            <li
              key={row.en}
              className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
              style={{
                backgroundColor: row.visible ? LAB_GREEN_SOFT : "#f1f5f9",
                borderColor: row.visible ? LAB_GREEN : SLATE_BORDER,
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                {row.visible ? (
                  <Eye className="w-5 h-5 flex-shrink-0" style={{ color: LAB_GREEN_DEEP }} />
                ) : (
                  <EyeOff className="w-5 h-5 flex-shrink-0" style={{ color: INK_SOFT }} />
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-sm" style={{ color: INK }}>
                    {k ? row.kh : row.en}
                  </div>
                  <div
                    className={`text-xs ${k ? "" : "font-khmer"}`}
                    style={{ color: INK_SOFT }}
                  >
                    {k ? row.en : row.kh}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                <span className="font-mono text-sm font-semibold" style={{ color: INK }}>
                  {k ? row.khSize : row.size}
                </span>
                <span
                  className="text-[10px] uppercase tracking-wider font-bold"
                  style={{ color: row.visible ? LAB_GREEN_DEEP : INK_SOFT }}
                >
                  {row.visible
                    ? `${t("Visible", "មើលឃើញ")}`
                    : `${t("Invisible", "មើលមិនឃើញ")}`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </article>

      {/* Why we need to cheat physics */}
      <article
        className="rounded-3xl border-2 shadow-md p-6 sm:p-8"
        style={{
          backgroundColor: LAB_GREEN_SOFT,
          borderColor: LAB_GREEN,
        }}
        data-testid="card-cheat-physics"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: TECH_PAPER }}
          >
            <Sparkles className="w-6 h-6" style={{ color: LAB_GREEN_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualEyebrow
              en="The challenge"
              kh="បញ្ហាប្រឈម"
              color={LAB_GREEN_DEEP}
            />
            <BilingualHeading
              en="To see life, we must bend light"
              kh="ដើម្បីមើលឃើញជីវិត យើងត្រូវបង្វែរពន្លឺ"
              k={k}
              level="h3"
              className="text-lg sm:text-xl mb-2"
              style={{ color: LAB_GREEN_DEEP }}
            />
            <p
              className={`text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK }}
            >
              {t(
                "Cells, bacteria, viruses, and DNA all live below this line. To see them, we must cheat the laws of physics — by carefully bending light through curved glass.",
                "កោសិកា បាក់តេរី វីរុស និង DNA ទាំងអស់រស់នៅខាងក្រោមបន្ទាត់នេះ។ ដើម្បីមើលឃើញពួកវា យើងត្រូវបោកច្បាប់រូបវិទ្យា — ដោយការបង្វែរពន្លឺយ៉ាងល្អិតល្អន់ឆ្លងកាត់កញ្ចក់កោង។",
              )}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  SECTION 2 — Bending Light (ការបង្វែរពន្លឺ)
 * ══════════════════════════════════════════════════════════════════════════ */

function SectionTwoLight({ t, k }: { t: T; k: boolean }) {
  return (
    <section aria-labelledby="sec-2-light" data-testid="section-bending-light">
      <SectionHeader
        spec="02"
        en="Bending Light"
        kh="ការបង្វែរពន្លឺ"
        k={k}
        Icon={Sun}
      />

      {/* The Convex Lens */}
      <article
        className="rounded-3xl border shadow-sm p-6 sm:p-8 mb-6"
        style={{ backgroundColor: TECH_PAPER, borderColor: SLATE_BORDER }}
        data-testid="card-convex-lens"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: LAB_LENS_SOFT }}
          >
            <Circle className="w-6 h-6" style={{ color: LAB_LENS }} />
          </div>
          <div className="min-w-0">
            <h3 className="leading-tight mb-2">
              <span
                className="font-display font-bold text-lg sm:text-xl"
                style={{ color: LAB_GREEN_DEEP }}
              >
                <BilingualTerm en="The Convex Lens" kh="ឡង់ទីប៉ោង" k={k} />
              </span>
            </h3>
            <p
              className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK }}
            >
              {t(
                "A convex lens is a piece of glass that is thicker in the middle than at the edges. When parallel rays of light enter this curved glass, the shape forces each ray to bend inward — and they all meet at a single spot called the Focal Point.",
                "ឡង់ទីប៉ោងគឺជាបន្ទះកញ្ចក់ដែលក្រាស់នៅកណ្តាលជាងនៅគែម។ ពេលកាំរស្មីពន្លឺស្របគ្នាចូលក្នុងកញ្ចក់កោងនេះ រាងរបស់វាបង្ខំកាំរស្មីនីមួយៗឱ្យបង្វែរចូលខាងក្នុង — ហើយពួកវាជួបគ្នានៅចំណុចតែមួយដែលហៅថាចំណុចប្រសព្វ។",
              )}
            </p>
          </div>
        </div>

        {/* SVG diagram — convex lens bending parallel rays into a focal point */}
        <figure className="mt-6">
          <div
            className="rounded-2xl border p-4 sm:p-6"
            style={{ backgroundColor: TECH_WHITE, borderColor: SLATE_BORDER }}
          >
            <svg
              viewBox="0 0 500 220"
              className="w-full h-auto"
              role="img"
              aria-label={t(
                "Diagram: parallel light rays enter a convex lens from the left and bend to meet at a focal point on the right.",
                "តារាង៖ កាំរស្មីពន្លឺស្របគ្នាចូលឡង់ទីប៉ោងពីខាងឆ្វេង ហើយបង្វែរទៅជួបគ្នានៅចំណុចប្រសព្វនៅខាងស្តាំ។",
              )}
            >
              {/* central optical axis */}
              <line
                x1="20" y1="110" x2="480" y2="110"
                stroke={SLATE_BORDER} strokeWidth="1" strokeDasharray="4 4"
              />

              {/* parallel light rays entering from the left */}
              {[40, 75, 110, 145, 180].map((y) => (
                <line
                  key={`in-${y}`}
                  x1="20" y1={y} x2="240" y2={y}
                  stroke={LAB_LENS} strokeWidth="2"
                />
              ))}

              {/* convex lens body — symmetric oval */}
              <path
                d="M 240 30 Q 280 110 240 190 Q 200 110 240 30 Z"
                fill={LAB_LENS_SOFT}
                stroke={LAB_LENS}
                strokeWidth="2"
              />

              {/* refracted rays converging at focal point */}
              {[40, 75, 110, 145, 180].map((y) => (
                <line
                  key={`out-${y}`}
                  x1="240" y1={y} x2="400" y2="110"
                  stroke={LAB_LENS} strokeWidth="2"
                />
              ))}

              {/* rays continuing past the focal point (diverging) */}
              {[40, 75, 145, 180].map((y) => {
                // mirror each ray as it continues past F
                const dy = 110 - y;
                return (
                  <line
                    key={`pass-${y}`}
                    x1="400" y1="110" x2="475" y2={110 + dy * 0.5}
                    stroke={LAB_LENS} strokeWidth="1.5" strokeOpacity="0.5"
                  />
                );
              })}

              {/* focal point dot */}
              <circle cx="400" cy="110" r="5" fill={LAB_GREEN_DEEP} />
              <text
                x="400" y="138"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={LAB_GREEN_DEEP}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                F
              </text>

              {/* labels */}
              <text x="30" y="22" fontSize="11" fill={INK_SOFT}>
                {t("Parallel light", "ពន្លឺស្របគ្នា")}
              </text>
              <text x="240" y="208" textAnchor="middle" fontSize="11" fill={INK_SOFT}>
                {t("Convex lens", "ឡង់ទីប៉ោង")}
              </text>
              <text x="400" y="22" textAnchor="middle" fontSize="11" fill={LAB_GREEN_DEEP} fontWeight="700">
                {t("Focal Point", "ចំណុចប្រសព្វ")}
              </text>
            </svg>
          </div>
          <figcaption
            className={`mt-3 text-xs text-center ${k ? "font-khmer" : ""}`}
            style={{ color: INK_SOFT }}
          >
            {t(
              "Parallel light enters the lens, bends inward, and converges at the focal point.",
              "ពន្លឺស្របគ្នាចូលក្នុងឡង់ទី បង្វែរចូលខាងក្នុង ហើយជួបគ្នានៅចំណុចប្រសព្វ។",
            )}
          </figcaption>
        </figure>
      </article>

      {/* Focal Point detail */}
      <article
        className="rounded-3xl border shadow-sm p-6 sm:p-8"
        style={{ backgroundColor: TECH_PAPER, borderColor: SLATE_BORDER }}
        data-testid="card-focal-point"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: LAB_LENS_SOFT }}
          >
            <ZoomIn className="w-6 h-6" style={{ color: LAB_LENS }} />
          </div>
          <div className="min-w-0">
            <h3 className="leading-tight mb-2">
              <span
                className="font-display font-bold text-lg sm:text-xl"
                style={{ color: LAB_GREEN_DEEP }}
              >
                <BilingualTerm en="The Focal Point" kh="ចំណុចប្រសព្វ" k={k} />
              </span>
            </h3>
            <p
              className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK }}
            >
              {t(
                "By placing your eye on the far side of the focal point, you intercept the light after it has crossed and spread out again. The image now fills more of your retina than the real object ever could — and the object appears massive.",
                "ដោយដាក់ភ្នែករបស់អ្នកនៅខាងម្ខាងទៀតនៃចំណុចប្រសព្វ អ្នកចាប់យកពន្លឺក្រោយពីវាបានឆ្លងកាត់ និងផ្ទុះចេញម្ដងទៀត។ រូបភាពឥឡូវនេះបំពេញផ្ទៃភ្នែករបស់អ្នកច្រើនជាងវត្ថុពិត — ហើយវត្ថុហាក់បីដូចជាធំសម្បើម។",
              )}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  SECTION 3 — The Math of Magnification (គណិតវិទ្យានៃការពង្រីក)
 * ══════════════════════════════════════════════════════════════════════════ */

function SectionThreeMath({ t, k }: { t: T; k: boolean }) {
  return (
    <section
      aria-labelledby="sec-3-math"
      data-testid="section-magnification-math"
    >
      <SectionHeader
        spec="03"
        en="The Math of Magnification"
        kh="គណិតវិទ្យានៃការពង្រីក"
        k={k}
        Icon={Calculator}
      />

      {/* Two lenses, multiplied */}
      <article
        className="rounded-3xl border shadow-sm p-6 sm:p-8 mb-6"
        style={{ backgroundColor: TECH_PAPER, borderColor: SLATE_BORDER }}
        data-testid="card-two-lenses"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: LAB_GREEN_SOFT }}
          >
            <Microscope className="w-6 h-6" style={{ color: LAB_GREEN_DEEP }} />
          </div>
          <div className="min-w-0">
            <BilingualHeading
              en="Two lenses, multiplied"
              kh="ឡង់ទីពីរ បានគុណគ្នា"
              k={k}
              level="h3"
              className="text-lg sm:text-xl mb-2"
              style={{ color: LAB_GREEN_DEEP }}
            />
            <p
              className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK }}
            >
              {k ? (
                <>
                  មីក្រូទស្សន៍ផ្សំដាក់ឡង់ទីពីរបន្ទះត្រួតគ្នា។{" "}
                  <span className="font-semibold">ឡង់ទីវត្ថុ (Objective Lens)</span>{" "}
                  — ជិតបំផុតនឹងស្លាយ — បង្កើតរូបភាពពង្រីកដំបូង។{" "}
                  <span className="font-semibold">ឡង់ទីភ្នែក (Eyepiece Lens)</span>{" "}
                  — ជិតបំផុតនឹងភ្នែករបស់អ្នក — ពង្រីករូបភាពនោះម្ដងទៀត។
                  កម្លាំងរបស់ពួកវា <span className="font-semibold">គុណគ្នា</span>។
                </>
              ) : (
                <>
                  A compound microscope stacks two lenses. The{" "}
                  <span className="font-semibold">objective lens</span> — closest to
                  the slide — creates a first enlarged image. The{" "}
                  <span className="font-semibold">eyepiece lens</span> — closest to
                  your eye — magnifies that image again. Their powers{" "}
                  <span className="font-semibold">multiply</span>.
                </>
              )}
            </p>
          </div>
        </div>
      </article>

      {/* Equation card */}
      <article
        className="rounded-3xl border-2 shadow-md p-6 sm:p-8 mb-6"
        style={{
          backgroundColor: LAB_GREEN_SOFT,
          borderColor: LAB_GREEN,
        }}
        data-testid="card-equation"
      >
        <BilingualEyebrow
          en="The equation"
          kh="សមីការ"
          color={LAB_GREEN_DEEP}
        />
        <div
          className="rounded-2xl border-2 p-5 sm:p-6 text-center"
          style={{
            backgroundColor: TECH_PAPER,
            borderColor: LAB_GREEN,
          }}
        >
          {/* English line */}
          <div
            className="font-display text-lg sm:text-2xl font-bold flex items-center justify-center flex-wrap gap-x-2 gap-y-1"
            style={{ color: LAB_GREEN_DEEP }}
          >
            <span>Total Magnification</span>
            <span style={{ color: INK_SOFT }}>=</span>
            <span>Eyepiece Lens</span>
            <span style={{ color: INK_SOFT }}>×</span>
            <span>Objective Lens</span>
          </div>
          {/* Khmer line */}
          <div
            className="font-khmer text-base sm:text-xl font-semibold mt-3 flex items-center justify-center flex-wrap gap-x-2 gap-y-1"
            style={{ color: LAB_GREEN_DEEP }}
          >
            <span>ពង្រីកសរុប</span>
            <span style={{ color: INK_SOFT }}>=</span>
            <span>ឡង់ទីភ្នែក</span>
            <span style={{ color: INK_SOFT }}>×</span>
            <span>ឡង់ទីវត្ថុ</span>
          </div>
        </div>
      </article>

      {/* Worked example */}
      <article
        className="rounded-3xl border-2 shadow-md p-6 sm:p-8"
        style={{
          backgroundColor: LAB_LENS_SOFT,
          borderColor: LAB_LENS,
        }}
        data-testid="card-worked-example"
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: TECH_PAPER }}
          >
            <ZoomIn className="w-6 h-6" style={{ color: LAB_LENS }} />
          </div>
          <div className="min-w-0 w-full">
            <BilingualEyebrow
              en="Worked example"
              kh="ឧទាហរណ៍ជាក់ស្ដែង"
              color={LAB_GREEN_DEEP}
            />
            <BilingualHeading
              en="A 10× eyepiece with a 40× objective"
              kh="ឡង់ទីភ្នែក ១០× ជាមួយឡង់ទីវត្ថុ ៤០×"
              k={k}
              level="h3"
              className="text-lg sm:text-xl mb-3"
              style={{ color: LAB_GREEN_DEEP }}
            />
            <p
              className={`text-sm sm:text-base leading-relaxed mb-4 ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK }}
            >
              {t(
                "If the eyepiece is 10× and the objective lens nearest the slide is 40×, the object appears 400 times larger than real life.",
                "បើឡង់ទីភ្នែកមាន ១០× ហើយឡង់ទីវត្ថុដែលនៅជិតបំផុតនឹងស្លាយមាន ៤០× នោះវត្ថុនឹងហាក់ដូចជាធំជាងជីវិតពិត ៤០០ ដង។",
              )}
            </p>

            {/* Equation breakdown — visual chain */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FactorTile
                label={t("Eyepiece", "ឡង់ទីភ្នែក")}
                value="10×"
                color={LAB_LENS}
              />
              <FactorTile
                label={t("Objective", "ឡង់ទីវត្ថុ")}
                value="40×"
                color={LAB_LENS}
              />
              <FactorTile
                label={t("Total", "សរុប")}
                value="400×"
                color={LAB_GREEN}
                emphasised
              />
            </div>

            {/* Plain math line */}
            <div
              className="mt-4 text-center font-mono text-base sm:text-lg font-bold"
              style={{ color: LAB_GREEN_DEEP }}
            >
              10× &nbsp;×&nbsp; 40× &nbsp;=&nbsp; 400×
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

/* ─── Small reusable tile for the worked-example breakdown ───────────────── */

function FactorTile({
  label,
  value,
  color,
  emphasised = false,
}: {
  label: string;
  value: string;
  color: string;
  emphasised?: boolean;
}) {
  return (
    <div
      className="rounded-2xl border-2 p-4 text-center"
      style={{
        backgroundColor: emphasised ? color : "#ffffff",
        borderColor: color,
        color: emphasised ? "#ffffff" : "#0f172a",
      }}
    >
      <div
        className="text-[11px] uppercase tracking-wider font-bold opacity-80"
      >
        {label}
      </div>
      <div className="font-mono text-2xl sm:text-3xl font-bold mt-1">
        {value}
      </div>
    </div>
  );
}
