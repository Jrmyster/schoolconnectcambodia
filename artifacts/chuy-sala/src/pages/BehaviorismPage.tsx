import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Bell,
  Brain,
  Building2,
  ClipboardList,
  Dna,
  Hand,
  HandCoins,
  Heart,
  Info,
  Lightbulb,
  MinusCircle,
  PlusCircle,
  PuzzleIcon,
  Repeat,
  Scale,
  Sparkles,
  Sprout,
  Users,
  Utensils,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  PSY-01 · Behaviorism: The Architecture of Action
//             អាកប្បកិរិយាវិទ្យា៖ ស្ថាបត្យកម្មនៃសកម្មភាព
//
//  1. The Blank Slate           · Tabula Rasa + Nature vs Nurture
//  2. Two Types of Conditioning · Pavlov (classical) + Skinner (operant)
//  3. Culture as Environment    · the Sampeah as a learned behavior
//
//  Aesthetic: Psychology Lab — soft neutral grays, warm puzzle-piece yellow,
//             gentle teal accents, flow-chart style diagrams, Outfit/serif type.
// ════════════════════════════════════════════════════════════════════════════

const PAPER       = "#fafaf9";   // off-white lab paper
const PAPER_2     = "#f5f5f4";
const INK         = "#1c1917";
const INK_SOFT    = "#44403c";
const RULE        = "#d6d3d1";
const RULE_SOFT   = "#e7e5e4";

const PUZZLE      = "#eab308";   // warm puzzle yellow
const PUZZLE_SOFT = "#fef3c7";
const PUZZLE_DEEP = "#854d0e";

const TEAL        = "#0d9488";   // calm classroom teal
const TEAL_SOFT   = "#ccfbf1";

const ROSE        = "#be123c";   // negative / punishment
const ROSE_SOFT   = "#ffe4e6";

const SAGE        = "#65a30d";   // positive / reward
const SAGE_SOFT   = "#ecfccb";

const SLATE       = "#475569";   // chart slate
const SLATE_SOFT  = "#f1f5f9";

const FRAME: React.CSSProperties = {
  backgroundColor: PAPER,
  backgroundImage:
    `radial-gradient(circle at 20% 0%, ${PUZZLE}11, transparent 45%),` +
    `radial-gradient(circle at 100% 100%, ${TEAL}0d, transparent 50%)`,
};

type T = (en: string, kh: string) => string;

// ─── Section header ────────────────────────────────────────────────────────

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
  accent: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3 flex-wrap">
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-md px-2.5 py-1 text-white"
        style={{ backgroundColor: accent }}
      >
        SEC-{spec}
      </span>
      <Icon className="w-5 h-5" style={{ color: accent }} />
      <h2
        className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
        style={{ color: INK }}
      >
        {k ? kh : en}
      </h2>
      <div
        className="flex-1 border-t border-dashed"
        style={{ borderColor: RULE }}
      />
    </div>
  );
}

// ─── Concept card ──────────────────────────────────────────────────────────

type ConceptCardProps = {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enName: string;
  khName: string;
  enTag: string;
  khTag: string;
  enBody?: string;
  khBody?: string;
  accent: string;
  badge?: { en: string; kh: string };
  children?: React.ReactNode;
};

function ConceptCard({
  k,
  Icon,
  enName,
  khName,
  enTag,
  khTag,
  enBody,
  khBody,
  accent,
  badge,
  children,
}: ConceptCardProps) {
  return (
    <div
      className="relative rounded-3xl p-5 sm:p-6 border-2 overflow-hidden flex flex-col"
      style={{
        backgroundColor: "#ffffff",
        borderColor: `${accent}55`,
        boxShadow: `0 1px 0 ${accent}11, 0 12px 30px -22px ${accent}55`,
      }}
      data-testid={`concept-card-${enName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    >
      {/* paper grid background hint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            `linear-gradient(${RULE_SOFT} 1px, transparent 1px),` +
            `linear-gradient(90deg, ${RULE_SOFT} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(180deg, white, transparent 50%)",
          WebkitMaskImage: "linear-gradient(180deg, white, transparent 50%)",
        }}
      />

      <div className="relative flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${accent}1f`, border: `1px solid ${accent}55` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`}
            style={{ color: INK }}
          >
            {k ? khName : enName}
          </h3>
          <div
            className={`text-[11px] mt-0.5 uppercase ${k ? "font-khmer normal-case" : "font-mono tracking-widest"}`}
            style={{ color: accent }}
          >
            {k ? khTag : enTag}
          </div>
        </div>
        {badge ? (
          <span
            className={`text-[10px] px-2 py-1 rounded-full text-white ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
            style={{ backgroundColor: accent }}
          >
            {k ? badge.kh : badge.en}
          </span>
        ) : null}
      </div>

      {enBody && khBody ? (
        <p
          className={`relative text-sm sm:text-[15px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: INK_SOFT }}
        >
          {k ? khBody : enBody}
        </p>
      ) : null}

      {children ? <div className="relative mt-4">{children}</div> : null}
    </div>
  );
}

// ─── Pull-out callout ──────────────────────────────────────────────────────

function Callout({
  k,
  Icon,
  labelEn,
  labelKh,
  enTitle,
  khTitle,
  enBody,
  khBody,
  accent,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  labelEn: string;
  labelKh: string;
  enTitle: string;
  khTitle: string;
  enBody: string;
  khBody: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 border-l-4 border"
      style={{
        backgroundColor: `${accent}11`,
        borderLeftColor: accent,
        borderColor: `${accent}33`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="w-4 h-4" style={{ color: accent }} />
        <span
          className={`text-[10px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
          style={{ color: accent }}
        >
          {k ? labelKh : labelEn}
        </span>
      </div>
      <h4
        className={`font-bold text-sm sm:text-base mb-1 ${k ? "font-khmer" : ""}`}
        style={{ color: INK }}
      >
        {k ? khTitle : enTitle}
      </h4>
      <p
        className={`text-xs sm:text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: INK_SOFT }}
      >
        {k ? khBody : enBody}
      </p>
    </div>
  );
}

// ─── Hero chip ─────────────────────────────────────────────────────────────

function HeroChip({
  color,
  k,
  en,
  kh,
}: {
  color: string;
  k: boolean;
  en: string;
  kh: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
      style={{
        color,
        borderColor: `${color}66`,
        backgroundColor: `${color}11`,
      }}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {k ? kh : en}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function BehaviorismPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={FRAME}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${k ? "font-khmer" : ""}`}
            style={{ color: SLATE }}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* Hero */}
        <header
          className="relative rounded-[2rem] p-6 sm:p-9 mb-10 overflow-hidden border-2"
          style={{
            borderColor: `${PUZZLE}55`,
            backgroundColor: PAPER_2,
            backgroundImage:
              `radial-gradient(circle at 90% 10%, ${PUZZLE}22, transparent 50%),` +
              `linear-gradient(135deg, #ffffff 0%, ${PAPER_2} 100%)`,
          }}
        >
          {/* faint puzzle pattern in background */}
          <svg
            viewBox="0 0 400 200"
            className="absolute right-0 top-0 w-72 h-44 opacity-20"
            aria-hidden="true"
          >
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 60 + 80}
                  y={row * 40 + 10}
                  width="50"
                  height="30"
                  rx="4"
                  fill="none"
                  stroke={PUZZLE}
                  strokeWidth="1"
                />
              ))
            )}
          </svg>

          <div className="relative">
            <div
              className={`flex items-center gap-2 text-xs mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}
              style={{ color: PUZZLE_DEEP }}
            >
              <span>{t("Study Center · Psychology", "មជ្ឈមណ្ឌលសិក្សា · ចិត្តវិទ្យា")}</span>
              <span>·</span>
              <span>PSY-01</span>
            </div>
            <h1
              className={`text-3xl sm:text-4xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
              style={{ color: INK }}
              data-testid="page-title"
            >
              {t(
                "Behaviorism: The Architecture of Action",
                "អាកប្បកិរិយាវិទ្យា៖ ស្ថាបត្យកម្មនៃសកម្មភាព"
              )}
            </h1>
            <p
              className={`mt-3 text-sm sm:text-base max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK_SOFT }}
            >
              {t(
                "Why does a child press their hands together when they see grandmother? Why does a dog drool when it hears the dinner bowl rattle? Why do you scroll your phone the moment you feel bored? Behaviorism is the part of psychology that says: almost everything you do, including the things that feel automatic, was actually built by what happened to you. Your behavior is not random. It is architecture.",
                "ហេតុអ្វីបានជាកុមារយកដៃឡើងគូបនៅពេលឃើញលោកយាយ? ហេតុអ្វីបានជាសត្វឆ្កែដាក់ទឹកមាត់នៅពេលឮសំឡេងចាន? ហេតុអ្វីបានជាអ្នកចុចទូរស័ព្ទនៅពេលអ្នកធុញ? អាកប្បកិរិយាវិទ្យាគឺជាផ្នែកនៃចិត្តវិទ្យាដែលនិយាយថា ៖ ស្ទើរតែអ្វីៗគ្រប់យ៉ាងដែលអ្នកធ្វើ រាប់បញ្ចូលរបស់ដែលហាក់ដូចជាស្វ័យប្រវត្តិ ជាការពិតត្រូវបានកសាងដោយអ្វីដែលបានកើតឡើងចំពោះអ្នក។ អាកប្បកិរិយារបស់អ្នកមិនមែនចៃដន្យទេ។ វាគឺជាស្ថាបត្យកម្ម។"
              )}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <HeroChip color={PUZZLE_DEEP} k={k} en="Tabula Rasa"     kh="ក្តារខៀនទទេ" />
              <HeroChip color={TEAL}        k={k} en="Pavlov’s bell"   kh="កណ្ដឹង Pavlov" />
              <HeroChip color={SAGE}        k={k} en="Skinner box"     kh="ប្រអប់ Skinner" />
              <HeroChip color={ROSE}        k={k} en="Sampeah · learned" kh="សំពះ · រៀននោះ" />
            </div>
          </div>
        </header>

        <SectionBlankSlate   k={k} t={t} />
        <SectionConditioning k={k} t={t} />
        <SectionCulture      k={k} t={t} />

        {/* Closing */}
        <div
          className="mt-12 rounded-3xl border-2 p-5 sm:p-6 flex items-start gap-3"
          style={{
            borderColor: `${PUZZLE}66`,
            backgroundColor: PUZZLE_SOFT,
          }}
          data-testid="closing-note"
        >
          <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: PUZZLE_DEEP }} />
          <p className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK }}>
            <strong className={k ? "" : "font-bold"}>
              {t("The big idea: ", "គំនិតធំ ៖ ")}
            </strong>
            {t(
              "Behaviorism does not say genes are nothing. It says: between genes and behavior, there is a lifetime of bells, rewards, punishments, and quiet imitation that build the person you have become. The good news is — anything that was built can be re-built. Habits, fears, manners, even the way you greet your grandmother — all of them are pieces of an architecture you are still allowed to redesign.",
              "អាកប្បកិរិយាវិទ្យាមិននិយាយថា ហ្សែនមិនសំខាន់ទេ។ វានិយាយថា ៖ រវាងហ្សែន និងអាកប្បកិរិយា មានអាយុជីវិតមួយនៃកណ្ដឹង រង្វាន់ ការដាក់ទោស និងការត្រាប់តាមស្ងាត់ដែលកសាងមនុស្សដែលអ្នកបានក្លាយជា។ ដំណឹងល្អគឺ — អ្វីៗដែលត្រូវបានកសាង អាចត្រូវកសាងឡើងវិញបាន។ ទម្លាប់ ការភ័យខ្លាច មារយាទ សូម្បីតែវិធីដែលអ្នកសួរសុខទុក្ខលោកយាយ — ទាំងអស់នោះគឺជាបំណែកនៃស្ថាបត្យកម្មមួយដែលអ្នកនៅតែអាចរចនាឡើងវិញបាន។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-90 ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: PUZZLE_DEEP }}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — The Blank Slate (Tabula Rasa) + Nature vs Nurture
// ════════════════════════════════════════════════════════════════════════════

function SectionBlankSlate({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-blank-slate">
      <SectionHeader
        spec="01"
        en="The Blank Slate"
        kh="ក្តារខៀនទទេ"
        k={k}
        Icon={ClipboardList}
        accent={PUZZLE_DEEP}
      />

      <div className="grid lg:grid-cols-2 gap-5">
        <ConceptCard
          k={k}
          Icon={ClipboardList}
          enName="Tabula Rasa · the blank slate"
          khName="Tabula Rasa · ក្តារខៀនទទេ"
          enTag="Latin · 1690 · John Locke"
          khTag="ឡាតាំង · ឆ្នាំ ១៦៩០ · John Locke"
          enBody="In 1690 the English philosopher John Locke proposed a striking idea: a newborn baby's mind is a tabula rasa — a Latin phrase meaning 'a scraped tablet', a wax board with nothing written on it yet. He argued that humans arrive with no built-in knowledge, no fears, no preferences, no memories. Everything you will ever believe, hate, love, or fear is written onto that blank tablet over your lifetime by experience. Two children born on the same day in the same hospital can grow into completely different adults, not because their souls were different at birth, but because life wrote different things on each of them."
          khBody="នៅឆ្នាំ ១៦៩០ ទស្សនវិទូអង់គ្លេស John Locke បានស្នើគំនិតមួយដ៏គួរឲ្យចាប់អារម្មណ៍ ៖ ចិត្តរបស់ទារកទើបនឹងកើតគឺជា tabula rasa — ឃ្លាឡាតាំងមានន័យថា 'ក្ដារដែលត្រូវបានកោស' ក្ដារក្រមួនដែលគ្មានអ្វីសរសេរលើនៅឡើយ។ គាត់បានជជែកថា មនុស្សមកដល់ដោយគ្មានចំណេះដឹងស្រាប់ គ្មានការភ័យខ្លាច គ្មានចំណង់ចំណូលចិត្ត គ្មានការចងចាំ។ អ្វីៗគ្រប់យ៉ាងដែលអ្នកនឹងជឿ ស្អប់ ស្រឡាញ់ ឬភ័យខ្លាច ត្រូវបានសរសេរលើក្ដារទទេនោះក្នុងអាយុជីវិតរបស់អ្នកដោយបទពិសោធន៍។ កុមារពីរនាក់ដែលកើតថ្ងៃតែមួយក្នុងមន្ទីរពេទ្យតែមួយ អាចធំឡើងជាមនុស្សពេញវ័យខុសគ្នាទាំងស្រុង មិនមែនព្រោះវិញ្ញាណរបស់ពួកគេខុសគ្នាពីពេលកើតទេ ប៉ុន្តែព្រោះជីវិតបានសរសេរអ្វីផ្សេងគ្នាលើពួកគេម្នាក់ៗ។"
          accent={PUZZLE_DEEP}
          badge={{ en: "Foundational idea", kh: "គំនិតគ្រឹះ" }}
        >
          {/* The slate visual */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: SLATE_SOFT }} data-testid="slate-visual">
            <svg viewBox="0 0 320 120" className="w-full h-32" aria-hidden="true">
              {/* Frame */}
              <rect x="10" y="10" width="300" height="100" rx="6" fill="#f5f5f4" stroke={PUZZLE_DEEP} strokeWidth="3" />
              {/* Inner slate */}
              <rect x="20" y="20" width="280" height="80" rx="3" fill="#e7e5e4" />
              {/* Ghosted "writing" being added */}
              <line x1="40"  y1="42" x2="120" y2="42" stroke={PUZZLE_DEEP} strokeWidth="1.4" opacity="0.55" />
              <line x1="40"  y1="58" x2="180" y2="58" stroke={PUZZLE_DEEP} strokeWidth="1.4" opacity="0.4" />
              <line x1="40"  y1="74" x2="100" y2="74" stroke={PUZZLE_DEEP} strokeWidth="1.4" opacity="0.25" />
              {/* Pencil */}
              <g transform="translate(220,60) rotate(25)">
                <rect x="0" y="0" width="60" height="6" fill={PUZZLE} />
                <polygon points="60,0 70,3 60,6" fill={INK_SOFT} />
                <rect x="-8" y="0" width="8" height="6" fill={ROSE} />
              </g>
            </svg>
            <div className={`mt-2 text-xs text-center ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
              {t(
                "Born blank · written on by every experience.",
                "កើតមកទទេ · ត្រូវបានសរសេរដោយរាល់បទពិសោធន៍។"
              )}
            </div>
          </div>
        </ConceptCard>

        {/* Nature vs Nurture debate */}
        <ConceptCard
          k={k}
          Icon={Scale}
          enName="Nature vs Nurture"
          khName="ធម្មជាតិ និងការចិញ្ចឹមបីបាច់"
          enTag="the great two-sided debate"
          khTag="ការជជែកដ៏ធំពីរបែប"
          enBody="The 'blank slate' idea sets up the oldest argument in psychology: how much of who you are was decided at birth, and how much is being decided every day by the world you live in? On one side stands NATURE — your DNA, your inherited temperament, the brain wiring you arrived with. On the other side stands NURTURE — your parents, your school, your village, your friends, the language you grew up hearing, the food you grew up eating. Almost no scientist today thinks one side wins completely. The honest answer is: both. But behaviorism focuses sharply on the second one, because that is the side we can actually change."
          khBody="គំនិត 'ក្ដារខៀនទទេ' បង្កើតការជជែកចាស់ជាងគេក្នុងចិត្តវិទ្យា ៖ ប៉ុន្មានភាគរយនៃអ្នកត្រូវបានសម្រេចពីពេលកើត ហើយប៉ុន្មានភាគរយត្រូវបានសម្រេចជារៀងរាល់ថ្ងៃដោយពិភពដែលអ្នករស់នៅ? ម្ខាង គឺ ធម្មជាតិ — ហ្សែនរបស់អ្នក និស្ស័យដែលអ្នកទទួលមរតក ការតភ្ជាប់ខួរក្បាលដែលអ្នកមកដល់។ ម្ខាងទៀតគឺ ការចិញ្ចឹមបីបាច់ — ឪពុកម្ដាយ សាលា ភូមិ មិត្តភក្ដិ ភាសាដែលអ្នកធំឡើងស្ដាប់ អាហារដែលអ្នកធំឡើងបរិភោគ។ ស្ទើរតែគ្មានអ្នកវិទ្យាសាស្ត្រសព្វថ្ងៃគិតថាម្ខាងឈ្នះទាំងស្រុង។ ចម្លើយស្មោះត្រង់គឺ ៖ ទាំងពីរ។ ប៉ុន្តែអាកប្បកិរិយាវិទ្យាផ្ដោតលើផ្នែកទីពីរ ព្រោះវាគឺជាផ្នែកដែលយើងពិតជាអាចផ្លាស់ប្ដូរបាន។"
          accent={SLATE}
          badge={{ en: "Both, not one", kh: "ទាំងពីរ មិនមែនតែមួយ" }}
        >
          {/* Two-column comparison */}
          <div className="grid grid-cols-2 gap-3" data-testid="nature-nurture">
            {/* Nature */}
            <div
              className="rounded-2xl border-2 p-3"
              style={{
                borderColor: `${TEAL}55`,
                backgroundColor: TEAL_SOFT,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Dna className="w-5 h-5" style={{ color: TEAL }} />
                <div className={`text-sm font-bold ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: TEAL }}>
                  {k ? "ធម្មជាតិ" : "Nature"}
                </div>
              </div>
              <ul className={`text-xs space-y-1 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK }}>
                <li>• {t("DNA · genes from parents",          "DNA · ហ្សែនពីឪពុកម្ដាយ")}</li>
                <li>• {t("Inherited temperament",              "និស្ស័យដែលទទួលមរតក")}</li>
                <li>• {t("Brain wiring at birth",              "ការតភ្ជាប់ខួរក្បាលពីពេលកើត")}</li>
                <li>• {t("Cannot easily be changed",           "មិនអាចផ្លាស់ប្ដូរងាយៗ")}</li>
              </ul>
            </div>

            {/* Nurture */}
            <div
              className="rounded-2xl border-2 p-3"
              style={{
                borderColor: `${PUZZLE}66`,
                backgroundColor: PUZZLE_SOFT,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="w-5 h-5" style={{ color: PUZZLE_DEEP }} />
                <div className={`text-sm font-bold ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: PUZZLE_DEEP }}>
                  {k ? "ការចិញ្ចឹមបីបាច់" : "Nurture"}
                </div>
              </div>
              <ul className={`text-xs space-y-1 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK }}>
                <li>• {t("Parents · family",          "ឪពុកម្ដាយ · ក្រុមគ្រួសារ")}</li>
                <li>• {t("School · teachers",         "សាលា · គ្រូ")}</li>
                <li>• {t("Friends · village",         "មិត្តភក្ដិ · ភូមិ")}</li>
                <li>• {t("Language · culture",        "ភាសា · វប្បធម៌")}</li>
                <li>• {t("Can be re-shaped",          "អាចត្រូវបានកសាងឡើងវិញ")}</li>
              </ul>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs" style={{ color: SLATE }}>
            <Scale className="w-4 h-4" />
            <span className={k ? "font-khmer" : ""}>
              {t(
                "Modern psychology: the answer is almost always both, in different proportions.",
                "ចិត្តវិទ្យាទំនើប ៖ ចម្លើយស្ទើរតែតែងតែគឺទាំងពីរ ក្នុងសមាមាត្រខុសគ្នា។"
              )}
            </span>
          </div>
        </ConceptCard>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — Two types of conditioning
// ════════════════════════════════════════════════════════════════════════════

function SectionConditioning({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-conditioning">
      <SectionHeader
        spec="02"
        en="The Two Types of Conditioning"
        kh="ប្រភេទនៃការផ្សារភ្ជាប់បញ្ញា"
        k={k}
        Icon={Brain}
        accent={TEAL}
      />

      <div className="grid lg:grid-cols-2 gap-5">
        <ClassicalCard k={k} />
        <OperantCard   k={k} t={t} />
      </div>

      <div className="mt-5">
        <Callout
          k={k}
          Icon={Info}
          labelEn="Tell them apart"
          labelKh="បែងចែកវាចេញពីគ្នា"
          enTitle="Classical = automatic reflex. Operant = chosen action."
          khTitle="បែបបុរាណ = ប្រតិកម្មស្វ័យប្រវត្តិ។ តាមសកម្មភាព = សកម្មភាពរើសយក។"
          enBody="Classical conditioning works on things your body does without thinking — drooling, blinking, fearing. Operant conditioning works on things you choose to do — studying, lying, helping. Pavlov made a dog drool at a sound. Skinner made a rat press a lever for food. One trains a reflex; the other trains a decision."
          khBody="ការផ្សារភ្ជាប់បែបបុរាណធ្វើការលើរបស់ដែលរាងកាយរបស់អ្នកធ្វើដោយមិនគិត — ដាក់ទឹកមាត់ ភ្លឹបភ្នែក ភ័យខ្លាច។ ការផ្សារភ្ជាប់តាមសកម្មភាពធ្វើការលើរបស់ដែលអ្នករើសយកធ្វើ — រៀន កុហក ជួយ។ Pavlov ធ្វើឲ្យឆ្កែដាក់ទឹកមាត់នៅពេលឮសំឡេង។ Skinner ធ្វើឲ្យកណ្ដុរចុចដងស្ពានដើម្បីអាហារ។ មួយហ្វឹកហាត់ប្រតិកម្ម មួយទៀតហ្វឹកហាត់ការសម្រេចចិត្ត។"
          accent={SLATE}
        />
      </div>
    </section>
  );
}

// ─── Classical conditioning · Pavlov ───────────────────────────────────────

function ClassicalCard({ k }: { k: boolean }) {
  // Three-step Pavlov flow
  const steps = [
    {
      enLabel: "BEFORE",
      khLabel: "មុន",
      enWhat:  "Food → drool. The bell does nothing.",
      khWhat:  "អាហារ → ទឹកមាត់។ កណ្ដឹងគ្មានឥទ្ធិពលទេ។",
      Icon: Utensils,
    },
    {
      enLabel: "TRAINING",
      khLabel: "ហ្វឹកហាត់",
      enWhat:  "Bell + food, again and again, every meal.",
      khWhat:  "កណ្ដឹង + អាហារ ម្ដងហើយម្ដងទៀត រាល់ពេលអាហារ។",
      Icon: Repeat,
    },
    {
      enLabel: "AFTER",
      khLabel: "ក្រោយ",
      enWhat:  "Bell alone → drool. The dog learned the link.",
      khWhat:  "កណ្ដឹងតែឯង → ទឹកមាត់។ ឆ្កែបានរៀនទំនាក់ទំនង។",
      Icon: Bell,
    },
  ];

  return (
    <ConceptCard
      k={k}
      Icon={Bell}
      enName="Classical Conditioning"
      khName="ការផ្សារភ្ជាប់បែបបុរាណ"
      enTag="Ivan Pavlov · Russia · 1890s · learning by association"
      khTag="Ivan Pavlov · រុស្ស៊ី · ទសវត្ស ១៨៩០ · រៀនដោយការផ្សារភ្ជាប់"
      enBody="In the 1890s the Russian physiologist Ivan Pavlov was actually studying digestion in dogs. He noticed something strange: the dogs began to drool the moment they heard the footsteps of the assistant who fed them — long before the food appeared. Pavlov realised the dogs had learned to link a sound (footsteps) with a meaning (food is coming). To test it, he switched to a bell. He rang the bell every single time he fed the dog, again and again. After enough repetitions, he rang the bell alone, with no food in the room — and the dog still drooled. The dog had not chosen to drool. Its body had been trained to react to the sound itself."
      khBody="នៅទសវត្ស ១៨៩០ អ្នករាងកាយវិទ្យារុស្ស៊ី Ivan Pavlov ពិតជាកំពុងសិក្សាអំពីការរំលាយអាហារក្នុងសត្វឆ្កែ។ គាត់បានកត់សម្គាល់រឿងប្លែកមួយ ៖ សត្វឆ្កែចាប់ផ្ដើមដាក់ទឹកមាត់នៅពេលឮសំឡេងជើងរបស់ជំនួយការដែលចុះចំណីពួកវា — មុនពេលអាហារលេចឡើងយូរ។ Pavlov បានដឹងថា សត្វឆ្កែបានរៀនភ្ជាប់សំឡេង (ជើង) ជាមួយអត្ថន័យ (អាហារនឹងមកដល់)។ ដើម្បីសាកល្បង គាត់បានប្ដូរទៅកណ្ដឹង។ គាត់បានបន្លឺកណ្ដឹងរាល់ពេលដែលគាត់ចុះចំណីសត្វឆ្កែ ម្ដងហើយម្ដងទៀត។ ក្រោយការធ្វើម្ដងទៀតគ្រប់គ្រាន់ គាត់បានបន្លឺកណ្ដឹងតែឯង ដោយគ្មានអាហារក្នុងបន្ទប់ — ហើយសត្វឆ្កែនៅតែដាក់ទឹកមាត់។ សត្វឆ្កែមិនបានរើសយកដាក់ទឹកមាត់ទេ។ រាងកាយរបស់វាត្រូវបានហ្វឹកហាត់ឲ្យមានប្រតិកម្មចំពោះសំឡេងខ្លួនវា។"
      accent={TEAL}
      badge={{ en: "Pavlov · 1890s", kh: "Pavlov · ទស. ១៨៩០" }}
    >
      {/* The dog + bell + food diagram */}
      <div
        className="rounded-2xl p-3 border"
        style={{ backgroundColor: TEAL_SOFT, borderColor: `${TEAL}44` }}
        data-testid="pavlov-diagram"
      >
        <svg viewBox="0 0 320 120" className="w-full h-28" aria-hidden="true">
          {/* Floor */}
          <line x1="0" y1="100" x2="320" y2="100" stroke={SLATE} strokeWidth="1" />

          {/* Bell on left */}
          <g transform="translate(40,40)">
            <path d="M-12,30 L12,30 L12,28 Q12,8 0,0 Q-12,8 -12,28 Z" fill={PUZZLE} stroke={PUZZLE_DEEP} strokeWidth="1.5" />
            <circle cx="0" cy="34" r="3" fill={PUZZLE_DEEP} />
            {/* sound waves */}
            <path d="M-22,12 q-6,8 0,18" fill="none" stroke={TEAL} strokeWidth="1.5" />
            <path d="M-30,8  q-10,12 0,26" fill="none" stroke={TEAL} strokeWidth="1.5" opacity="0.6" />
          </g>

          {/* Dog (very simple silhouette) on right */}
          <g transform="translate(220,55)">
            {/* body */}
            <ellipse cx="0" cy="25" rx="42" ry="18" fill={INK_SOFT} />
            {/* head */}
            <circle cx="34" cy="10" r="14" fill={INK_SOFT} />
            {/* ear */}
            <path d="M40,-2 L48,-12 L46,-2 Z" fill={INK_SOFT} />
            {/* snout */}
            <ellipse cx="48" cy="14" rx="8" ry="5" fill={INK_SOFT} />
            {/* eye */}
            <circle cx="38" cy="8" r="1.5" fill="#ffffff" />
            {/* legs */}
            <rect x="-30" y="40" width="4" height="14" fill={INK_SOFT} />
            <rect x="-15" y="40" width="4" height="14" fill={INK_SOFT} />
            <rect x="14"  y="40" width="4" height="14" fill={INK_SOFT} />
            <rect x="28"  y="40" width="4" height="14" fill={INK_SOFT} />
            {/* tail */}
            <path d="M-40,18 q-12,-6 -16,4" fill="none" stroke={INK_SOFT} strokeWidth="4" strokeLinecap="round" />
            {/* drool */}
            <circle cx="56" cy="22" r="2"   fill={TEAL} />
            <circle cx="58" cy="28" r="1.5" fill={TEAL} opacity="0.7" />
            <circle cx="55" cy="33" r="1.2" fill={TEAL} opacity="0.5" />
          </g>

          {/* Food bowl below bell */}
          <g transform="translate(40,92)">
            <path d="M-14,0 L14,0 L10,8 L-10,8 Z" fill={PUZZLE_DEEP} />
            <ellipse cx="0" cy="0" rx="14" ry="3" fill={PUZZLE} />
          </g>

          {/* Arrow bell -> dog */}
          <line x1="80" y1="55" x2="172" y2="65" stroke={TEAL} strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="172,65 165,61 165,69" fill={TEAL} />

          <text x="92" y="50" fontSize="9" fill={TEAL} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "សំឡេង" : "SOUND"}
          </text>
          <text x="160" y="100" fontSize="9" fill={TEAL} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "→ ទឹកមាត់" : "→ DROOL"}
          </text>
        </svg>
      </div>

      {/* Three-step timeline */}
      <div className="mt-3 grid grid-cols-3 gap-2" data-testid="pavlov-steps">
        {steps.map((s, i) => {
          const Icon = s.Icon;
          return (
            <div
              key={i}
              className="rounded-xl border p-2.5"
              style={{
                backgroundColor: "#ffffff",
                borderColor: `${TEAL}55`,
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5" style={{ color: TEAL }} />
                <div
                  className={`text-[10px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
                  style={{ color: TEAL }}
                >
                  {i + 1} · {k ? s.khLabel : s.enLabel}
                </div>
              </div>
              <div className={`text-[11px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK }}>
                {k ? s.khWhat : s.enWhat}
              </div>
            </div>
          );
        })}
      </div>
    </ConceptCard>
  );
}

// ─── Operant conditioning · Skinner ────────────────────────────────────────

function OperantCard({ k, t }: { k: boolean; t: T }) {
  return (
    <ConceptCard
      k={k}
      Icon={HandCoins}
      enName="Operant Conditioning"
      khName="ការផ្សារភ្ជាប់តាមសកម្មភាព"
      enTag="B. F. Skinner · USA · 1938 · learning by consequences"
      khTag="B. F. Skinner · សហរដ្ឋអាមេរិក · ឆ្នាំ ១៩៣៨ · រៀនដោយផលវិបាក"
      enBody="In 1938 the American psychologist B. F. Skinner built a small box, no bigger than a microwave, with one simple lever inside. He put a hungry rat in the box. The first time the rat accidentally bumped the lever, a pellet of food dropped down. The rat noticed. Soon it was bumping the lever on purpose. Then pressing it. Then pressing it again and again. Skinner had discovered the simplest law of behaviour: an action followed by a reward gets repeated; an action followed by a punishment fades away. He gave it the formal name 'operant conditioning' — learning by what happens after you act. Skinner's box explains a huge slice of human behaviour: studying for the praise of a parent, lying to avoid being shouted at, refreshing your phone for the little buzz of a notification."
      khBody="នៅឆ្នាំ ១៩៣៨ អ្នកចិត្តវិទ្យាអាមេរិក B. F. Skinner បានសាងសង់ប្រអប់តូចមួយ មិនធំជាងម៉ាស៊ីនមីក្រូវ ដោយមានដងស្ពានសាមញ្ញមួយនៅខាងក្នុង។ គាត់បានដាក់កណ្ដុរឃ្លានមួយក្នុងប្រអប់។ លើកដំបូងដែលកណ្ដុរប៉ះដងស្ពានដោយចៃដន្យ គ្រាប់អាហារមួយធ្លាក់ចុះ។ កណ្ដុរបានកត់សម្គាល់។ មិនយូរប៉ុន្មាន វាប៉ះដងស្ពានដោយចេតនា។ បន្ទាប់មកចុចវា។ បន្ទាប់មកចុចវាម្ដងហើយម្ដងទៀត។ Skinner បានរកឃើញច្បាប់សាមញ្ញបំផុតនៃអាកប្បកិរិយា ៖ សកម្មភាពមួយដែលត្រូវបានតាមដោយរង្វាន់ ត្រូវបានធ្វើម្ដងទៀត។ សកម្មភាពមួយដែលត្រូវបានតាមដោយការដាក់ទោស រសាត់បាត់។ គាត់បានដាក់ឈ្មោះជាផ្លូវការថា 'ការផ្សារភ្ជាប់តាមសកម្មភាព' — រៀនដោយអ្វីដែលកើតឡើងបន្ទាប់ពីអ្នកធ្វើ។ ប្រអប់របស់ Skinner ពន្យល់ផ្នែកដ៏ធំនៃអាកប្បកិរិយាមនុស្ស ៖ រៀនសម្រាប់ការសរសើររបស់ឪពុកម្ដាយ កុហកដើម្បីជៀសវាងការស្រែក ស្ដារទូរស័ព្ទសម្រាប់សន្ទុះតូចនៃការជូនដំណឹង។"
      accent={SAGE}
      badge={{ en: "Skinner · 1938", kh: "Skinner · ១៩៣៨" }}
    >
      {/* Skinner box diagram */}
      <div
        className="rounded-2xl p-3 border"
        style={{ backgroundColor: SAGE_SOFT, borderColor: `${SAGE}44` }}
        data-testid="skinner-box"
      >
        <svg viewBox="0 0 320 130" className="w-full h-32" aria-hidden="true">
          {/* Box outline */}
          <rect x="40" y="20" width="240" height="95" rx="4" fill="#ffffff" stroke={INK_SOFT} strokeWidth="2" />
          {/* Floor grid */}
          {[60, 100, 140, 180, 220, 260].map((x) => (
            <line key={x} x1={x} y1="115" x2={x} y2="105" stroke={INK_SOFT} strokeWidth="1" />
          ))}
          <line x1="40" y1="115" x2="280" y2="115" stroke={INK_SOFT} strokeWidth="1.5" />

          {/* Light at top */}
          <circle cx="80" cy="35" r="6" fill={PUZZLE} stroke={PUZZLE_DEEP} strokeWidth="1" />
          <line x1="80" y1="42" x2="80" y2="50" stroke={PUZZLE} strokeWidth="1.5" />

          {/* Lever */}
          <g transform="translate(220,90)">
            <rect x="-6" y="-3" width="6" height="6" fill={INK_SOFT} />
            <rect x="-30" y="-2" width="24" height="4" fill={INK_SOFT} />
            <text x="-50" y="20" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "ដងស្ពាន" : "LEVER"}
            </text>
          </g>

          {/* Food chute on right side wall */}
          <g transform="translate(270,60)">
            <rect x="0" y="0" width="6" height="20" fill={SAGE} />
            <text x="-12" y="35" fontSize="9" fill={SAGE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
              {k ? "អាហារ" : "FOOD"}
            </text>
            <circle cx="3" cy="55" r="2" fill={SAGE} />
            <circle cx="3" cy="60" r="2" fill={SAGE} opacity="0.7" />
          </g>

          {/* Rat (very simple) */}
          <g transform="translate(140,108)">
            <ellipse cx="0" cy="0" rx="22" ry="9" fill={INK_SOFT} />
            <circle cx="20" cy="-4" r="6" fill={INK_SOFT} />
            <circle cx="22" cy="-6" r="1" fill="#fff" />
            <ellipse cx="24" cy="-3" rx="2" ry="1.2" fill="#fff" />
            {/* tail */}
            <path d="M-22,-2 q-14,-8 -22,2" fill="none" stroke={INK_SOFT} strokeWidth="1.5" />
          </g>

          {/* arrow lever -> food */}
          <path d="M225,90 q22,-25 50,-30" stroke={SAGE} strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <polygon points="276,60 270,58 271,65" fill={SAGE} />
        </svg>
      </div>

      {/* Reward vs punishment */}
      <div className="mt-3 grid grid-cols-2 gap-2" data-testid="reward-punishment">
        <div
          className="rounded-xl border p-3"
          style={{
            backgroundColor: SAGE_SOFT,
            borderColor: `${SAGE}66`,
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <PlusCircle className="w-4 h-4" style={{ color: SAGE }} />
            <div className={`text-xs font-bold ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: SAGE }}>
              {k ? "រង្វាន់ → ច្រើនឡើង" : "Reward → more"}
            </div>
          </div>
          <div className={`text-[11px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK }}>
            {t(
              "Action followed by something good (food, praise, money) is repeated more often.",
              "សកម្មភាពដែលត្រូវបានតាមដោយរបស់ល្អ (អាហារ ការសរសើរ លុយ) ត្រូវបានធ្វើម្ដងទៀតញឹកញាប់ជាង។"
            )}
          </div>
        </div>
        <div
          className="rounded-xl border p-3"
          style={{
            backgroundColor: ROSE_SOFT,
            borderColor: `${ROSE}66`,
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <MinusCircle className="w-4 h-4" style={{ color: ROSE }} />
            <div className={`text-xs font-bold ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: ROSE }}>
              {k ? "ការដាក់ទោស → តិចទៅ" : "Punishment → less"}
            </div>
          </div>
          <div className={`text-[11px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK }}>
            {t(
              "Action followed by something bad (pain, scolding, fine) fades away over time.",
              "សកម្មភាពដែលត្រូវបានតាមដោយរបស់អាក្រក់ (ឈឺ ស្ដី ពិន័យ) រសាត់បាត់តាមពេលវេលា។"
            )}
          </div>
        </div>
      </div>
    </ConceptCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — Culture as the ultimate environment (Sampeah)
// ════════════════════════════════════════════════════════════════════════════

function SectionCulture({ k, t }: { k: boolean; t: T }) {
  // Five-step Sampeah learning flow
  const steps = [
    {
      Icon: Users,
      enT: "Observe",
      khT: "សង្កេត",
      enW: "A small child watches their parents and grandparents press their hands together when greeting a monk or an elder.",
      khW: "កុមារតូចមើលឪពុកម្ដាយ និងជីដូនជីតារបស់ខ្លួនយកដៃឡើងគូបនៅពេលសួរសុខទុក្ខព្រះសង្ឃ ឬចាស់ទុំ។",
    },
    {
      Icon: Hand,
      enT: "Imitate",
      khT: "ត្រាប់តាម",
      enW: "The child copies the gesture, sometimes clumsily, holding their hands the wrong way at first.",
      khW: "កុមារត្រាប់តាមកាយវិការនោះ ពេលខ្លះមិនស៊ីសង្វាក់ ដោយកាន់ដៃខុសតាំងពីដំបូង។",
    },
    {
      Icon: Award,
      enT: "Get praised",
      khT: "ត្រូវបានសរសើរ",
      enW: "Parents smile, neighbours say 'so polite!', the monk gently blesses them. The child feels warmth.",
      khW: "ឪពុកម្ដាយញញឹម អ្នកជិតខាងនិយាយថា 'ស្គាល់សុជីវធម៌!' ព្រះសង្ឃប្រសិទ្ធពរយ៉ាងថ្នមៗ។ កុមារមានអារម្មណ៍កក់ក្ដៅ។",
    },
    {
      Icon: Repeat,
      enT: "Repeat",
      khT: "ធ្វើម្ដងទៀត",
      enW: "Because the warmth feels good (operant reinforcement), the child does the Sampeah again next time.",
      khW: "ដោយសារភាពកក់ក្ដៅមានអារម្មណ៍ល្អ (ការពង្រឹងតាមសកម្មភាព) កុមារធ្វើសំពះម្ដងទៀតលើកក្រោយ។",
    },
    {
      Icon: Heart,
      enT: "Becomes automatic",
      khT: "ក្លាយជាស្វ័យប្រវត្តិ",
      enW: "After thousands of times, the gesture is no longer a decision — it appears the moment an elder enters the room.",
      khW: "បន្ទាប់ពីរាប់ពាន់ដង កាយវិការនេះមិនមែនជាការសម្រេចចិត្តទៀតទេ — វាលេចឡើងនៅពេលដែលចាស់ទុំចូលក្នុងបន្ទប់។",
    },
  ];

  return (
    <section className="mb-2" data-testid="section-culture">
      <SectionHeader
        spec="03"
        en="Culture as the Ultimate Environment"
        kh="វប្បធម៌ជាបរិស្ថានជុំវិញ"
        k={k}
        Icon={Building2}
        accent={ROSE}
      />

      <ConceptCard
        k={k}
        Icon={Users}
        enName="The Sampeah · a behavior shaped by culture"
        khName="សំពះ · អាកប្បកិរិយាដែលបង្កើតដោយវប្បធម៌"
        enTag="culture is conditioning, scaled to a whole society"
        khTag="វប្បធម៌គឺជាការផ្សារភ្ជាប់ ដែលរីកធំទៅទាំងសង្គម"
        enBody="Pavlov's bell trained one dog. Skinner's box trained one rat. But what trains an entire country? The answer is culture. Culture is the same set of laws — association, reward, imitation — applied to millions of people, every day, for generations. Take the Sampeah, the traditional Cambodian greeting where you press your hands together in front of your chest and bow slightly. No baby is born with a 'Sampeah gene'. There is no DNA instruction that tells a Cambodian child how high to hold their hands when greeting a monk versus a grandparent versus a friend. Every part of that beautiful behavior was learned: by watching, by being praised when they did it correctly, by the gentle adjustments of relatives. It is an almost perfect example of behaviorism in action — a behavior so deeply conditioned that, by adulthood, it appears automatically, as if it had always been there."
        khBody="កណ្ដឹង Pavlov បានហ្វឹកហាត់សត្វឆ្កែមួយ។ ប្រអប់ Skinner បានហ្វឹកហាត់កណ្ដុរមួយ។ ប៉ុន្តែអ្វីហ្វឹកហាត់ប្រទេសទាំងមូល? ចម្លើយគឺវប្បធម៌។ វប្បធម៌គឺជាសំណុំច្បាប់ដូចគ្នា — ការផ្សារភ្ជាប់ រង្វាន់ ការត្រាប់តាម — អនុវត្តចំពោះមនុស្សរាប់លាននាក់ ជារៀងរាល់ថ្ងៃ អស់ជំនាន់។ យកសំពះ ដែលជាការសួរសុខទុក្ខប្រពៃណីខ្មែរ ដោយអ្នកយកដៃឡើងគូបនៅមុខទ្រូង និងលំទោនបន្តិច។ គ្មានទារកណាកើតមកជាមួយ 'ហ្សែនសំពះ' ទេ។ គ្មានការណែនាំ DNA ណាប្រាប់កុមារខ្មែរថា ត្រូវកាន់ដៃខ្ពស់ប៉ុនណានៅពេលសួរសុខទុក្ខព្រះសង្ឃ ធៀបនឹងជីដូនជីតា ធៀបនឹងមិត្តភក្ដិទេ។ រាល់ផ្នែកនៃអាកប្បកិរិយាដ៏ស្រស់ស្អាតនោះត្រូវបានរៀន ៖ ដោយការមើល ដោយត្រូវបានសរសើរនៅពេលធ្វើបានត្រឹមត្រូវ ដោយការកែតម្រូវយ៉ាងថ្នមៗរបស់សាច់ញាតិ។ វាគឺជាឧទាហរណ៍ស្ទើរតែល្អឥតខ្ចោះនៃអាកប្បកិរិយាវិទ្យាក្នុងសកម្មភាព — អាកប្បកិរិយាមួយដែលត្រូវបានផ្សារភ្ជាប់យ៉ាងជ្រៅ ដែលនៅអាយុពេញវ័យវាលេចឡើងស្វ័យប្រវត្តិ ហាក់ដូចជាវាមាននៅទីនោះតាំងពីដើម។"
        accent={ROSE}
        badge={{ en: "Cambodia · Sampeah", kh: "កម្ពុជា · សំពះ" }}
      >
        {/* Five-step flow */}
        <div className="grid sm:grid-cols-5 gap-2 mb-4" data-testid="sampeah-flow">
          {steps.map((s, i) => {
            const Icon = s.Icon;
            return (
              <div
                key={i}
                className="rounded-xl border p-3"
                style={{
                  backgroundColor: i === steps.length - 1 ? PUZZLE_SOFT : "#ffffff",
                  borderColor: i === steps.length - 1 ? `${PUZZLE_DEEP}55` : `${ROSE}33`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mb-2 text-white text-xs font-bold font-mono"
                  style={{ backgroundColor: i === steps.length - 1 ? PUZZLE_DEEP : ROSE }}
                >
                  {i + 1}
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-3.5 h-3.5" style={{ color: i === steps.length - 1 ? PUZZLE_DEEP : ROSE }} />
                  <div
                    className={`text-[11px] font-bold ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
                    style={{ color: i === steps.length - 1 ? PUZZLE_DEEP : ROSE }}
                  >
                    {k ? s.khT : s.enT}
                  </div>
                </div>
                <div className={`text-[11px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK }}>
                  {k ? s.khW : s.enW}
                </div>
              </div>
            );
          })}
        </div>

        {/* The Sampeah levels infographic */}
        <div
          className="rounded-2xl p-4 border"
          style={{ backgroundColor: SLATE_SOFT, borderColor: `${SLATE}33` }}
          data-testid="sampeah-levels"
        >
          <div
            className={`text-[10px] mb-2 flex items-center gap-1.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
            style={{ color: SLATE }}
          >
            <Hand className="w-3.5 h-3.5" />
            {t("Even the height of the hands is learned", "សូម្បីកម្ពស់នៃដៃក៏ត្រូវបានរៀនដែរ")}
          </div>
          <div className="grid sm:grid-cols-4 gap-2 text-[11px]">
            {[
              { en: "Friend / equal",     kh: "មិត្ត / ស្មើគ្នា",   enLvl: "Hands at chest",        khLvl: "ដៃនៅទ្រូង" },
              { en: "Older person",       kh: "មនុស្សចាស់ជាង",      enLvl: "Hands at mouth",        khLvl: "ដៃនៅមាត់" },
              { en: "Parents / teacher",  kh: "ឪពុកម្ដាយ / គ្រូ",   enLvl: "Hands at nose",         khLvl: "ដៃនៅច្រមុះ" },
              { en: "Monk / royalty",     kh: "ព្រះសង្ឃ / ព្រះរាជា", enLvl: "Hands at forehead",     khLvl: "ដៃនៅថ្ងាស" },
            ].map((row, i) => (
              <div
                key={i}
                className="rounded-lg p-2 border"
                style={{ backgroundColor: "#ffffff", borderColor: `${SLATE}22` }}
              >
                <div className={`font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? row.kh : row.en}
                </div>
                <div className={`mt-0.5 ${k ? "font-khmer" : ""}`} style={{ color: SLATE }}>
                  {k ? row.khLvl : row.enLvl}
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-3 text-[11px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
            {t(
              "A Cambodian child gradually learns the right level for the right person — through years of quiet correction. None of it is in their genes.",
              "កុមារខ្មែរបន្តិចម្ដងៗរៀនកម្រិតត្រឹមត្រូវសម្រាប់មនុស្សត្រឹមត្រូវ — តាមរយៈការកែតម្រូវយ៉ាងស្ងាត់អស់ឆ្នាំ។ គ្មានមួយណានៅក្នុងហ្សែនរបស់ពួកគេទេ។"
            )}
          </div>
        </div>

        <div className="mt-4">
          <Callout
            k={k}
            Icon={PuzzleIcon}
            labelEn="Why this matters"
            labelKh="ហេតុអ្វីវាសំខាន់"
            enTitle="If culture built it, culture can change it."
            khTitle="បើវប្បធម៌កសាងវា វប្បធម៌អាចផ្លាស់ប្ដូរវាបាន។"
            enBody="The same machine that builds beautiful behaviors like the Sampeah also builds harmful ones — bullying, prejudice, the silence that lets injustice continue. Behaviorism is not just a description of how we got here. It is also a quiet promise: any behavior taught by an environment can be untaught by a different one. Schools, families, friends, and even a single kind teacher are powerful conditioning forces."
            khBody="ម៉ាស៊ីនដូចគ្នាដែលកសាងអាកប្បកិរិយាល្អៗដូចជាសំពះ ក៏កសាងរបស់អាក្រក់ផងដែរ — ការបៀតបៀន ការមានអគតិ ភាពស្ងៀមដែលឲ្យអយុត្តិធម៌បន្តកើតមាន។ អាកប្បកិរិយាវិទ្យាមិនមែនគ្រាន់តែជាការពណ៌នាអំពីរបៀបដែលយើងមកដល់ទីនេះទេ។ វាក៏ជាការសន្យាស្ងាត់មួយផងដែរ ៖ អាកប្បកិរិយាណាមួយដែលបានបង្រៀនដោយបរិស្ថានមួយ អាចត្រូវបានដក់ដាស់ដោយបរិស្ថានមួយផ្សេងទៀត។ សាលា ក្រុមគ្រួសារ មិត្តភក្ដិ សូម្បីតែគ្រូចិត្តល្អម្នាក់ ជាកម្លាំងផ្សារភ្ជាប់ដ៏មានឥទ្ធិពល។"
            accent={PUZZLE_DEEP}
          />
        </div>
      </ConceptCard>

      {/* Three more everyday Cambodian examples */}
      <div className="mt-5 grid sm:grid-cols-3 gap-3">
        {[
          { Icon: Lightbulb, en: "Removing shoes indoors", kh: "ដោះស្បែកជើងពេលចូលផ្ទះ", enB: "Conditioned by every household door, every temple entrance — never explicitly taught.", khB: "ផ្សារភ្ជាប់ដោយរាល់ទ្វារផ្ទះ រាល់ច្រកចូលវត្ត — មិនដែលបង្រៀនច្បាស់លាស់ទេ។" },
          { Icon: Heart,     en: "Eating with the right hand", kh: "ញ៉ាំដោយដៃស្ដាំ", enB: "A family table is one long classroom: hand position, sitting posture, who eats first.", khB: "តុក្រុមគ្រួសារគឺជាថ្នាក់រៀនវែងមួយ ៖ ទីតាំងដៃ ឫកអង្គុយ អ្នកណាញ៉ាំមុន។" },
          { Icon: Bell,      en: "Speaking softly to elders",   kh: "និយាយទៅចាស់ទុំទន់ៗ",  enB: "Quiet voice = praise. Loud voice = a frown. Two consequences are enough to wire a habit.", khB: "សំឡេងស្ងាត់ = ការសរសើរ។ សំឡេងខ្លាំង = ការច្រឡំ។ ផលវិបាកពីរគ្រប់គ្រាន់ដើម្បីតភ្ជាប់ទម្លាប់។" },
        ].map((u, i) => {
          const Icon = u.Icon;
          return (
            <div
              key={i}
              className="rounded-xl p-3 border"
              style={{
                backgroundColor: "#ffffff",
                borderColor: `${PUZZLE_DEEP}33`,
              }}
              data-testid={`extra-example-${i}`}
            >
              <Icon className="w-5 h-5 mb-2" style={{ color: PUZZLE_DEEP }} />
              <div className={`text-sm font-bold mb-1 ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                {k ? u.kh : u.en}
              </div>
              <div className={`text-[11px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
                {k ? u.khB : u.enB}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
