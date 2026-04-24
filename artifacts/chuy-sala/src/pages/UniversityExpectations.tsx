import { Link } from "wouter";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Coffee,
  DoorOpen,
  FileText,
  GraduationCap,
  HeartHandshake,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  WHAT TO EXPECT AT UNIVERSITY: THE FRESHMAN GUIDE
 *  អ្វីដែលត្រូវរំពឹងនៅសាកលវិទ្យាល័យ៖ មគ្គុទ្ទេសក៍សម្រាប់និស្សិតឆ្នាំទី១
 *
 *  Lives under: Career & Future Hub  (currently grouped in Study Center)
 *  Route:       /future-hub/university-guide
 *
 *  Cards:
 *    1. The Illusion of Free Time   — 7h class HS → 3h class uni; 2-3h study/lecture
 *    2. The Syllabus is the Law     — defines syllabus, no reminders, miss = fail
 *    3. Office Hours & Asking Help  — profs aren't scary; asking = strength
 *    4. Homesickness & Culture Shock — emotional toll + "100% normal" reassurance
 *
 *  Aesthetic: calm dorm-room — soft sky blues, warm cream whites, clean type,
 *             gentle amber accents on the empathy cards.
 * ══════════════════════════════════════════════════════════════════════════ */

type T = (en: string, kh: string) => string;

/* ─── Palette (Calm Campus) ──────────────────────────────────────────────── */

const SKY_DEEP   = "#1e3a8a"; // primary deep navy — headings ink
const SKY        = "#2563eb"; // primary blue — accents
const SKY_SOFT   = "#dbeafe"; // pale blue — soft tints
const SKY_TINT   = "#eff6ff"; // very pale — page wash
const CREAM      = "#fffbeb"; // warm white — page background
const PAPER      = "#ffffff"; // card surface
const SLATE_BORDER = "#e2e8f0";
const INK        = "#0f172a";
const INK_SOFT   = "#475569";

const AMBER      = "#d97706"; // gentle warmth — empathy accents
const AMBER_SOFT = "#fef3c7";
const ROSE       = "#be123c"; // used very sparingly for the "fail" warning

const FRAME: React.CSSProperties = {
  backgroundColor: CREAM,
  backgroundImage:
    "radial-gradient(circle at 12% 14%, rgba(37, 99, 235, 0.06), transparent 45%)," +
    "radial-gradient(circle at 88% 86%, rgba(217, 119, 6, 0.05), transparent 50%)," +
    `linear-gradient(${SKY_TINT}, ${CREAM})`,
};

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
  level?: "h2" | "h3" | "h4";
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
  color = SKY_DEEP,
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

/* ─── Card shell — bilingual title strip with number badge & icon ────────── */

function CardShell({
  num,
  Icon,
  en,
  kh,
  k,
  accent = SKY,
  accentSoft = SKY_SOFT,
  border = SLATE_BORDER,
  background = PAPER,
  children,
  testId,
}: {
  num: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  en: string;
  kh: string;
  k: boolean;
  accent?: string;
  accentSoft?: string;
  border?: string;
  background?: string;
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <article
      className="rounded-3xl border shadow-sm overflow-hidden"
      style={{ backgroundColor: background, borderColor: border }}
      data-testid={testId}
    >
      {/* title strip */}
      <header
        className="p-6 sm:p-7 flex items-start gap-4 border-b"
        style={{ borderColor: border, backgroundColor: accentSoft }}
      >
        <div
          className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ backgroundColor: PAPER }}
        >
          <Icon className="w-6 h-6" style={{ color: accent }} />
        </div>
        <div className="min-w-0 flex-1">
          <span
            className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-full px-2.5 py-0.5 inline-block mb-1.5 text-white"
            style={{ backgroundColor: accent }}
          >
            CARD-{num}
          </span>
          <BilingualHeading
            en={en}
            kh={kh}
            k={k}
            level="h2"
            className="text-xl sm:text-2xl"
            style={{ color: SKY_DEEP }}
          />
        </div>
      </header>

      {/* body */}
      <div className="p-6 sm:p-7 space-y-5">{children}</div>
    </article>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export function UniversityExpectations() {
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
            "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #0e7490 100%)",
        }}
      >
        <div className="flex h-1.5">
          <div className="flex-1" style={{ backgroundColor: SKY }} />
          <div className="flex-1" style={{ backgroundColor: "#0ea5e9" }} />
          <div className="flex-1" style={{ backgroundColor: AMBER }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative z-10">
          <Link
            href="/launchpad"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            data-testid="link-back-launchpad"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className={k ? "font-khmer text-base" : ""}>
              {t("Back to LaunchPad", "ត្រឡប់ទៅផ្ទាំង LaunchPad")}
            </span>
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 text-xs sm:text-sm font-semibold backdrop-blur-sm">
            <GraduationCap className="w-4 h-4 text-blue-200" />
            <span className={k ? "font-khmer" : ""}>
              {t("Career & Future Hub", "មជ្ឈមណ្ឌលអាជីព និងអនាគត")}
            </span>
          </div>

          <h1
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 ${k ? "font-khmer leading-loose" : ""}`}
          >
            {k
              ? "អ្វីដែលត្រូវរំពឹងនៅសាកលវិទ្យាល័យ៖ មគ្គុទ្ទេសក៍សម្រាប់និស្សិតឆ្នាំទី១"
              : "What to Expect at University: The Freshman Guide"}
          </h1>
          <p
            className={`text-base sm:text-lg max-w-2xl leading-relaxed ${k ? "font-khmer leading-loose" : "font-khmer"}`}
            style={{ color: "rgba(219, 234, 254, 0.9)" }}
          >
            {k
              ? "What to Expect at University: The Freshman Guide"
              : "អ្វីដែលត្រូវរំពឹងនៅសាកលវិទ្យាល័យ៖ មគ្គុទ្ទេសក៍សម្រាប់និស្សិតឆ្នាំទី១"}
          </p>

          <p
            className={`mt-5 text-sm sm:text-base max-w-2xl leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: "rgba(241, 245, 249, 0.9)" }}
          >
            {t(
              "Four hard truths that will turn your first semester from a panic into a plan. Read this before move-in day — and again the week classes start.",
              "ការពិតពិបាក ៤ ដែលនឹងផ្លាស់ប្ដូរឆមាសទីមួយរបស់អ្នកពីការភ័យស្លន់ស្លោទៅជាគម្រោង។ អានវាមុនថ្ងៃផ្លាស់ប្ដូរទីលំនៅ — ហើយម្ដងទៀតនៅសប្ដាហ៍ដែលថ្នាក់ចាប់ផ្ដើម។",
            )}
          </p>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill={CREAM} />
        </svg>
      </header>

      {/* ── BODY ────────────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <CardOneTime t={t} k={k} />
        <CardTwoSyllabus t={t} k={k} />
        <CardThreeOfficeHours t={t} k={k} />
        <CardFourHomesickness t={t} k={k} />

        {/* closing nav */}
        <nav
          className="pt-6 border-t flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
          style={{ borderColor: SLATE_BORDER }}
        >
          <Link
            href="/launchpad"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: SKY_DEEP }}
            data-testid="link-footer-launchpad"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className={k ? "font-khmer text-base" : ""}>
              {t("Back to LaunchPad", "ត្រឡប់ទៅផ្ទាំង LaunchPad")}
            </span>
          </Link>
          <Link
            href="/exam-prep"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: SKY_DEEP }}
            data-testid="link-footer-exam-prep"
          >
            <span className={k ? "font-khmer text-base" : ""}>
              {t("Continue to Exam Prep", "បន្តទៅការត្រៀមប្រឡង")}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}

export default UniversityExpectations;

/* ════════════════════════════════════════════════════════════════════════════
 *  CARD 1 — The Illusion of Free Time (ការបំភាន់នៃពេលវេលាទំនេរ)
 * ══════════════════════════════════════════════════════════════════════════ */

function CardOneTime({ t, k }: { t: T; k: boolean }) {
  return (
    <CardShell
      num="01"
      Icon={Clock}
      en="The Illusion of Free Time"
      kh="ការបំភាន់នៃពេលវេលាទំនេរ"
      k={k}
      testId="card-time-illusion"
    >
      {/* The Reality — bar comparison */}
      <div>
        <BilingualEyebrow en="The reality" kh="ការពិត" />
        <BilingualHeading
          en="Class hours collapse — but the workload triples"
          kh="ម៉ោងរៀនថយចុះ — តែបន្ទុកការងារកើនឡើងបីដង"
          k={k}
          level="h3"
          className="text-lg mb-4"
          style={{ color: SKY_DEEP }}
        />

        <div className="space-y-3">
          <HoursBar
            label={t("High school", "វិទ្យាល័យ")}
            sublabel={t("In class", "ក្នុងថ្នាក់")}
            hours={7}
            color={SKY}
          />
          <HoursBar
            label={t("University", "សាកលវិទ្យាល័យ")}
            sublabel={t("In class", "ក្នុងថ្នាក់")}
            hours={3}
            color={SKY}
          />
          <HoursBar
            label={t("University", "សាកលវិទ្យាល័យ")}
            sublabel={t("Independent study (the hidden hours)", "ការសិក្សាដោយខ្លួនឯង (ម៉ោងលាក់កំបាំង)")}
            hours={9}
            color={AMBER}
          />
        </div>
        <p
          className={`mt-3 text-xs ${k ? "font-khmer" : ""}`}
          style={{ color: INK_SOFT }}
        >
          {t(
            "Hours per day, typical weekday.",
            "ម៉ោងក្នុងមួយថ្ងៃ ក្នុងថ្ងៃធ្វើការធម្មតា។",
          )}
        </p>
      </div>

      {/* The Trap */}
      <div
        className="rounded-2xl border-2 p-5"
        style={{ backgroundColor: AMBER_SOFT, borderColor: AMBER }}
      >
        <BilingualEyebrow en="The trap" kh="អន្ទាក់" color={AMBER} />
        <p
          className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: INK }}
        >
          {k ? (
            <>
              វាហាក់ដូចជាអ្នកមានពេលវេលាទំនេរគ្មានព្រំដែន ប៉ុន្តែសាកលវិទ្យាល័យតម្រូវឱ្យអាន
              និងសិក្សាដោយខ្លួនឯង <span className="font-semibold">២ ទៅ ៣ ម៉ោង</span>{" "}
              សម្រាប់រៀងរាល់ <span className="font-semibold">១ ម៉ោង</span>{" "}
              ដែលអ្នកចំណាយក្នុងបន្ទប់រៀន។
            </>
          ) : (
            <>
              It feels like you have infinite free time, but university requires{" "}
              <span className="font-semibold">2 to 3 hours</span> of independent
              reading and studying for every <span className="font-semibold">1 hour</span>{" "}
              you spend in a lecture hall.
            </>
          )}
        </p>
      </div>

      {/* Highlight quote */}
      <blockquote
        className="rounded-2xl p-5 text-center border-l-4"
        style={{
          backgroundColor: SKY_SOFT,
          borderColor: SKY,
          color: SKY_DEEP,
        }}
      >
        <div className="font-display text-lg sm:text-xl font-bold">
          “You are now your own manager.”
        </div>
        <div className="font-khmer text-base sm:text-lg font-semibold mt-1">
          “ឥឡូវនេះ អ្នកគឺជាអ្នកគ្រប់គ្រងខ្លួនឯងហើយ។”
        </div>
      </blockquote>
    </CardShell>
  );
}

function HoursBar({
  label,
  sublabel,
  hours,
  color,
}: {
  label: string;
  sublabel: string;
  hours: number;
  color: string;
}) {
  // 24-hour scale; we cap visual width but show real number.
  const widthPct = Math.min(100, (hours / 12) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <div className="text-sm font-semibold" style={{ color: INK }}>
          {label}
          <span className="ml-2 text-xs font-normal" style={{ color: INK_SOFT }}>
            {sublabel}
          </span>
        </div>
        <div className="font-mono text-sm font-bold" style={{ color }}>
          {hours} h
        </div>
      </div>
      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ backgroundColor: "#f1f5f9" }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${widthPct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  CARD 2 — The Syllabus is the Law (គម្រោងកម្មវិធីសិក្សាគឺជាច្បាប់)
 * ══════════════════════════════════════════════════════════════════════════ */

function CardTwoSyllabus({ t, k }: { t: T; k: boolean }) {
  return (
    <CardShell
      num="02"
      Icon={FileText}
      en="The Syllabus is the Law"
      kh="គម្រោងកម្មវិធីសិក្សាគឺជាច្បាប់"
      k={k}
      testId="card-syllabus-law"
    >
      {/* What is a syllabus */}
      <div>
        <BilingualEyebrow en="What is a syllabus?" kh="តើគម្រោងកម្មវិធីសិក្សាជាអ្វី?" />
        <p
          className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: INK }}
        >
          {t(
            "A ", "ឯកសារ",
          )}
          <BilingualTerm en="Syllabus" kh="គម្រោងកម្មវិធីសិក្សា" k={k} />
          {t(
            " is a document the professor hands you on the first day of class. It lists every topic, every reading, every assignment, and every due date for the entire semester — 4 months in advance.",
            " ដែលសាស្ត្រាចារ្យឱ្យអ្នកនៅថ្ងៃដំបូងនៃថ្នាក់រៀន។ វារាប់បញ្ចូលរាល់ប្រធានបទ រាល់ការអាន រាល់កិច្ចការ និងរាល់កាលបរិច្ឆេទផុតកំណត់សម្រាប់ឆមាសទាំងមូល — ៤ ខែជាមុន។",
          )}
        </p>
      </div>

      {/* HS vs Uni side-by-side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          className="rounded-2xl border p-4"
          style={{ backgroundColor: SKY_SOFT, borderColor: SKY }}
        >
          <BilingualEyebrow en="High school" kh="វិទ្យាល័យ" color={SKY_DEEP} />
          <p
            className={`text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: INK }}
          >
            {t(
              "Teachers remind you when each homework is due — sometimes more than once.",
              "គ្រូរំលឹកអ្នកពេលកិច្ចការនីមួយៗត្រូវប្រគល់ — ពេលខ្លះច្រើនជាងម្ដង។",
            )}
          </p>
        </div>
        <div
          className="rounded-2xl border p-4"
          style={{ backgroundColor: "#f1f5f9", borderColor: SLATE_BORDER }}
        >
          <BilingualEyebrow en="University" kh="សាកលវិទ្យាល័យ" color={INK_SOFT} />
          <p
            className={`text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: INK }}
          >
            {t(
              "The professor will never remind you. The syllabus is your only warning system.",
              "សាស្ត្រាចារ្យនឹងមិនរំលឹកអ្នកទេ។ គម្រោងកម្មវិធីសិក្សាគឺជាប្រព័ន្ធព្រមានតែមួយគត់របស់អ្នក។",
            )}
          </p>
        </div>
      </div>

      {/* The hard rule */}
      <div
        className="rounded-2xl border-2 p-5 flex items-start gap-3"
        style={{ backgroundColor: "#fef2f2", borderColor: ROSE }}
      >
        <AlertTriangle
          className="w-6 h-6 flex-shrink-0 mt-0.5"
          style={{ color: ROSE }}
        />
        <div className="min-w-0">
          <BilingualEyebrow en="The hard rule" kh="ច្បាប់រឹង" color={ROSE} />
          <p
            className={`text-sm sm:text-base font-semibold leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: INK }}
          >
            {t(
              "Miss the deadline → you fail the assignment. No second chances. No 'I forgot.' Read the syllabus on Day 1, and put every due date into your phone calendar that same evening.",
              "ខកខានកាលបរិច្ឆេទផុតកំណត់ → អ្នកធ្លាក់កិច្ចការនោះ។ គ្មានឱកាសទីពីរ។ គ្មាន «ខ្ញុំភ្លេច» ទេ។ អានគម្រោងកម្មវិធីសិក្សានៅថ្ងៃទី១ ហើយដាក់រាល់កាលបរិច្ឆេទផុតកំណត់ចូលក្នុងប្រតិទិនទូរស័ព្ទរបស់អ្នកនៅល្ងាចតែមួយនោះ។",
            )}
          </p>
        </div>
      </div>
    </CardShell>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  CARD 3 — Office Hours & Asking for Help
 *           ម៉ោងពិគ្រោះយោបល់ និងការសុំជំនួយ
 * ══════════════════════════════════════════════════════════════════════════ */

function CardThreeOfficeHours({ t, k }: { t: T; k: boolean }) {
  return (
    <CardShell
      num="03"
      Icon={DoorOpen}
      en="Office Hours & Asking for Help"
      kh="ម៉ោងពិគ្រោះយោបល់ និងការសុំជំនួយ"
      k={k}
      accent={AMBER}
      accentSoft={AMBER_SOFT}
      testId="card-office-hours"
    >
      <div>
        <BilingualEyebrow en="The fear" kh="ការភ័យខ្លាច" color={AMBER} />
        <p
          className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: INK }}
        >
          {t(
            "Professors can seem intimidating — they hold doctorates, write books, and run laboratories. Many freshmen are too shy to walk up after class. Don't be.",
            "សាស្ត្រាចារ្យអាចមើលទៅគួរឱ្យខ្លាច — ពួកគេមានសញ្ញាបត្របណ្ឌិត សរសេរសៀវភៅ និងគ្រប់គ្រងមន្ទីរពិសោធន៍។ និស្សិតឆ្នាំទី១ជាច្រើនអៀនពេកមិនហ៊ានទៅជួបបន្ទាប់ពីថ្នាក់។ កុំធ្វើបែបនោះ។",
          )}
        </p>
      </div>

      {/* What office hours actually are */}
      <div
        className="rounded-2xl border p-5 flex items-start gap-3"
        style={{ backgroundColor: PAPER, borderColor: SLATE_BORDER }}
      >
        <Coffee
          className="w-6 h-6 flex-shrink-0 mt-0.5"
          style={{ color: AMBER }}
        />
        <div className="min-w-0">
          <h3 className="leading-tight mb-1.5">
            <span
              className="font-display font-bold text-base sm:text-lg"
              style={{ color: SKY_DEEP }}
            >
              <BilingualTerm en="Office Hours" kh="ម៉ោងពិគ្រោះយោបល់" k={k} />
            </span>
          </h3>
          <p
            className={`text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: INK }}
          >
            {t(
              "Set hours each week — usually 2 to 4 hours — when the professor sits in their office specifically waiting for students to come ask questions. No appointment needed. It is not extra. It is part of their job.",
              "ម៉ោងកំណត់រៀងរាល់សប្ដាហ៍ — ជាធម្មតា ២ ទៅ ៤ ម៉ោង — ពេលដែលសាស្ត្រាចារ្យអង្គុយក្នុងការិយាល័យរបស់ពួកគេ ដោយរង់ចាំនិស្សិតមកសួរសំណួរ។ មិនត្រូវការការណាត់ទេ។ វាមិនមែនជាការបន្ថែមទេ។ វាជាផ្នែកមួយនៃការងាររបស់ពួកគេ។",
            )}
          </p>
        </div>
      </div>

      {/* Reframe — strength chip vs weakness chip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ReframeTile
          variant="myth"
          en="Asking for help shows weakness."
          kh="ការសុំជំនួយបង្ហាញពីភាពទន់ខ្សោយ។"
          k={k}
        />
        <ReframeTile
          variant="truth"
          en="Asking for help shows you are a serious, dedicated student."
          kh="ការសុំជំនួយបង្ហាញថាអ្នកជានិស្សិតដ៏ឧស្សាហ៍ និងព្យាយាម។"
          k={k}
        />
      </div>
    </CardShell>
  );
}

function ReframeTile({
  variant,
  en,
  kh,
  k,
}: {
  variant: "myth" | "truth";
  en: string;
  kh: string;
  k: boolean;
}) {
  const isTruth = variant === "truth";
  const accent = isTruth ? "#047857" : "#94a3b8";
  const bg = isTruth ? "#ecfdf5" : "#f1f5f9";
  return (
    <div
      className="rounded-2xl border-2 p-4 flex items-start gap-3"
      style={{ backgroundColor: bg, borderColor: accent }}
    >
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style={{ backgroundColor: accent }}
      >
        {isTruth ? "✓" : "✕"}
      </div>
      <div className="min-w-0">
        <div
          className="text-[10px] uppercase tracking-wider font-bold mb-1"
          style={{ color: accent }}
        >
          {isTruth ? "Truth · ការពិត" : "Myth · ទេវកថា"}
        </div>
        <p
          className={`text-sm leading-snug ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: INK }}
        >
          {k ? kh : en}
        </p>
        <p
          className={`text-xs mt-1 ${k ? "" : "font-khmer"}`}
          style={{ color: INK_SOFT }}
        >
          {k ? en : kh}
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  CARD 4 — Homesickness & Culture Shock
 *           ការនឹករលឹកផ្ទះ និងការតក់ស្លុតវប្បធម៌
 * ══════════════════════════════════════════════════════════════════════════ */

function CardFourHomesickness({ t, k }: { t: T; k: boolean }) {
  return (
    <CardShell
      num="04"
      Icon={HeartHandshake}
      en="Homesickness & Culture Shock"
      kh="ការនឹករលឹកផ្ទះ និងការតក់ស្លុតវប្បធម៌"
      k={k}
      accent={AMBER}
      accentSoft={AMBER_SOFT}
      testId="card-homesickness"
    >
      {/* Acknowledge */}
      <div>
        <BilingualEyebrow en="It is real" kh="វាជារឿងពិត" color={AMBER} />
        <p
          className={`text-sm sm:text-base leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: INK }}
        >
          {t(
            "Moving away from your family, your village, and your friends is one of the hardest things you will ever do. Your room will feel empty. The food will taste different. The faces around you will be strangers.",
            "ការផ្លាស់ប្ដូរទីលំនៅពីគ្រួសារ ភូមិ និងមិត្តភក្ដិរបស់អ្នក គឺជារឿងពិបាកបំផុតមួយដែលអ្នកនឹងធ្លាប់ធ្វើ។ បន្ទប់របស់អ្នកនឹងមានអារម្មណ៍ទទេ។ អាហារនឹងមានរសជាតិខុសគ្នា។ មុខមនុស្សជុំវិញអ្នកនឹងជាមនុស្សចម្លែក។",
          )}
        </p>
      </div>

      {/* Reassurance — big calm card */}
      <div
        className="rounded-2xl border-2 p-5"
        style={{
          backgroundColor: SKY_SOFT,
          borderColor: SKY,
        }}
      >
        <div className="flex items-start gap-3">
          <ShieldCheck
            className="w-6 h-6 flex-shrink-0 mt-0.5"
            style={{ color: SKY_DEEP }}
          />
          <div className="min-w-0">
            <BilingualEyebrow
              en="What every freshman is feeling"
              kh="អ្វីដែលនិស្សិតឆ្នាំទី១គ្រប់រូបកំពុងមានអារម្មណ៍"
              color={SKY_DEEP}
            />
            <p
              className={`text-base sm:text-lg font-semibold leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: SKY_DEEP }}
            >
              {t(
                "Feeling lonely or overwhelmed during your first semester is 100% normal.",
                "ការមានអារម្មណ៍ឯកោ ឬហួសកម្លាំង ក្នុងអំឡុងឆមាសទីមួយរបស់អ្នក គឺធម្មតា ១០០%។",
              )}
            </p>
            <p
              className={`mt-2 text-sm leading-relaxed ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK }}
            >
              {t(
                "Every other freshman around you is feeling the exact same way — even the ones who look the most confident. The quiet roommate. The student laughing in the cafeteria. The classmate who answers every question. They are all secretly waiting for someone to say it first.",
                "និស្សិតឆ្នាំទី១ផ្សេងទៀតគ្រប់រូបជុំវិញអ្នក កំពុងមានអារម្មណ៍ដូចគ្នាបេះបិទ — សូម្បីតែអ្នកដែលមើលទៅមានទំនុកចិត្តបំផុត។ មិត្តរួមបន្ទប់ស្ងាត់ៗ។ និស្សិតដែលសើចនៅភោជនីយដ្ឋាន។ មិត្តរួមថ្នាក់ដែលឆ្លើយរាល់សំណួរ។ ពួកគេទាំងអស់កំពុងរង់ចាំដោយស្ងៀមៗ ឱ្យមាននរណាម្នាក់និយាយវាមុនគេ។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Three small "first move" tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SurvivalTile
          Icon={Phone}
          en="Call home"
          kh="ហៅទូរស័ព្ទទៅផ្ទះ"
          subEn="Once a week, same day."
          subKh="មួយដងក្នុងមួយសប្ដាហ៍ ថ្ងៃតែមួយ។"
          k={k}
        />
        <SurvivalTile
          Icon={Users}
          en="Find one friend"
          kh="រកមិត្តម្នាក់"
          subEn="Just one. The rest will follow."
          subKh="គ្រាន់តែម្នាក់។ អ្នកដទៃនឹងមកតាមក្រោយ។"
          k={k}
        />
        <SurvivalTile
          Icon={CheckCircle2}
          en="It will pass"
          kh="វានឹងកន្លងទៅ"
          subEn="By semester two, this place is home."
          subKh="ដល់ឆមាសទីពីរ កន្លែងនេះគឺជាផ្ទះ។"
          k={k}
        />
      </div>

      {/* Closing whisper */}
      <p
        className={`text-center text-sm italic ${k ? "font-khmer not-italic" : ""}`}
        style={{ color: INK_SOFT }}
      >
        <Sparkles
          className="inline w-4 h-4 mr-1 align-text-bottom"
          style={{ color: AMBER }}
        />
        {t(
          "You are not weak for missing home. You are human.",
          "អ្នកមិនមែនទន់ខ្សោយទេ ដោយសារនឹករលឹកផ្ទះ។ អ្នកគ្រាន់តែជាមនុស្ស។",
        )}
      </p>
    </CardShell>
  );
}

function SurvivalTile({
  Icon,
  en,
  kh,
  subEn,
  subKh,
  k,
}: {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  en: string;
  kh: string;
  subEn: string;
  subKh: string;
  k: boolean;
}) {
  return (
    <div
      className="rounded-2xl border p-4 text-center"
      style={{ backgroundColor: PAPER, borderColor: SLATE_BORDER }}
    >
      <div
        className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
        style={{ backgroundColor: SKY_SOFT }}
      >
        <Icon className="w-5 h-5" style={{ color: SKY_DEEP }} />
      </div>
      <div
        className={`font-semibold text-sm ${k ? "font-khmer" : ""}`}
        style={{ color: SKY_DEEP }}
      >
        {k ? kh : en}
      </div>
      <div
        className={`text-[11px] mt-0.5 ${k ? "" : "font-khmer"}`}
        style={{ color: INK_SOFT }}
      >
        {k ? en : kh}
      </div>
      <div
        className={`text-xs mt-2 leading-snug ${k ? "font-khmer leading-loose" : ""}`}
        style={{ color: INK }}
      >
        {k ? subKh : subEn}
      </div>
    </div>
  );
}
