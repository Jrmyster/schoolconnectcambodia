import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Globe2,
  Crown,
  AlertTriangle,
  Type,
  Trees,
  Anchor,
  Sparkles,
  BookOpen,
  Mic,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import type React from "react";

// ════════════════════════════════════════════════════════════════════════════
//  STUDY-LANG-01 · Languages of the World: The Human Tapestry
//                  ភាសានៅជុំវិញពិភពលោក ៖ ផ្ទាំងគំនូរនៃមនុស្សជាតិ
//
//  Global-atlas aesthetic — parchment background, deep ink-blue accents,
//  meridian/latitude lines, hand-drawn cartography vibe. Sections:
//   1 · The Global Count (7,100 languages · PNG outlier)
//   2 · The Most & The Least Common (top speakers + endangered)
//   3 · Alphabets, Logograms, Abugidas (with Khmer pride moment)
//   4 · Language Families & Isolates (Romance tree vs. Basque)
// ════════════════════════════════════════════════════════════════════════════

// ─── Atlas palette ────────────────────────────────────────────────────────
const PARCH    = "#f4ead5";
const PARCH_2  = "#ede0bf";
const PARCH_3  = "#e3d3a6";
const INK      = "#1f2a44";
const INK_SOFT = "#3d4566"; // darkened from #4a5274 for stronger contrast on parchment
const SEPIA    = "#735a2c"; // darkened from #8a6d3b for WCAG-friendly captions
const GOLD     = "#8a6508"; // darkened from #b8860b for WCAG-friendly small text
const RUST     = "#8a3d22"; // darkened from #a04a2a
const TEAL     = "#155758"; // darkened from #1f6f70
const ROSE     = "#8a2839"; // darkened from #a83246
const FOREST   = "#235230"; // darkened from #2f6b3c

// Khmer numerals
const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKhNum(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}
function num(k: boolean, n: number | string): string {
  return k ? toKhNum(n) : String(n);
}

// ─── Layout primitives ────────────────────────────────────────────────────

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
        className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-md px-2.5 py-1"
        style={{ backgroundColor: accent, color: PARCH }}
      >
        {spec}
      </span>
      <Icon className="w-5 h-5" style={{ color: accent }} />
      <h2
        className={`text-xl sm:text-2xl font-bold ${k ? "font-khmer" : ""}`}
        style={{ color: INK, fontFamily: k ? undefined : "Georgia, serif" }}
      >
        {k ? kh : en}
      </h2>
      <div className="flex-1 border-t border-dashed" style={{ borderColor: SEPIA }} />
    </div>
  );
}

function P({
  k,
  en,
  kh,
  className,
}: {
  k: boolean;
  en: string;
  kh: string;
  className?: string;
}) {
  return (
    <p
      className={`${className ?? ""} ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      style={{ color: INK_SOFT }}
    >
      {k ? kh : en}
    </p>
  );
}

function StatTile({
  Icon,
  k,
  enLabel,
  khLabel,
  value,
  enUnit,
  khUnit,
  accent,
}: {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  k: boolean;
  enLabel: string;
  khLabel: string;
  value: string;
  enUnit?: string;
  khUnit?: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl border-2 p-3 sm:p-4"
      style={{
        borderColor: accent,
        backgroundColor: PARCH_2,
        boxShadow: `inset 0 0 0 1px ${PARCH_3}, 0 6px 18px -10px ${SEPIA}`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" style={{ color: accent }} />
        <div
          className={`text-[10px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
          style={{ color: accent }}
        >
          {k ? khLabel : enLabel}
        </div>
      </div>
      <div
        className="text-2xl sm:text-3xl font-extrabold leading-none"
        style={{
          color: INK,
          fontFamily: k ? "Hanuman, serif" : "Georgia, serif",
        }}
      >
        {value}
      </div>
      {enUnit && khUnit ? (
        <div
          className={`mt-1 text-[11px] ${k ? "font-khmer" : ""}`}
          style={{ color: INK_SOFT }}
        >
          {k ? khUnit : enUnit}
        </div>
      ) : null}
    </div>
  );
}

function FeatureCard({
  k,
  Icon,
  enTitle,
  khTitle,
  enTag,
  khTag,
  enBody,
  khBody,
  accent,
  children,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enTitle: string;
  khTitle: string;
  enTag: string;
  khTag: string;
  enBody: string;
  khBody: string;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="rounded-3xl p-5 sm:p-6 border-2 flex flex-col h-full"
      style={{
        borderColor: accent,
        backgroundColor: PARCH_2,
        boxShadow: `inset 0 0 0 1px ${PARCH_3}, 0 12px 28px -18px ${SEPIA}`,
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: PARCH, border: `2px solid ${accent}` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-lg sm:text-xl ${k ? "font-khmer" : ""}`}
            style={{ color: INK, fontFamily: k ? undefined : "Georgia, serif" }}
          >
            {k ? khTitle : enTitle}
          </h3>
          <div
            className={`text-[11px] mt-0.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
            style={{ color: accent }}
          >
            {k ? khTag : enTag}
          </div>
        </div>
      </div>
      <P k={k} en={enBody} kh={khBody} className="text-sm sm:text-[15px] mb-3" />
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function LanguagesWorldPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  // Parchment frame: paper grain + faint meridian grid
  const frame: React.CSSProperties = {
    backgroundColor: PARCH,
    backgroundImage:
      `radial-gradient(circle at 18% 12%, ${PARCH_3}66, transparent 45%),` +
      `radial-gradient(circle at 82% 88%, ${PARCH_3}55, transparent 45%),` +
      // meridians (vertical)
      `linear-gradient(90deg, transparent 0, transparent 79px, ${SEPIA}1c 79px, ${SEPIA}1c 80px),` +
      // latitudes (horizontal)
      `linear-gradient(0deg, transparent 0, transparent 79px, ${SEPIA}1c 79px, ${SEPIA}1c 80px)`,
    backgroundSize: "auto, auto, 80px 80px, 80px 80px",
  };

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={frame}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${k ? "font-khmer" : ""}`}
            style={{ color: TEAL }}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* Hero — atlas plate */}
        <header
          className="relative rounded-[2rem] p-6 sm:p-9 mb-10 overflow-hidden border-2"
          style={{
            borderColor: SEPIA,
            backgroundColor: PARCH_2,
            backgroundImage:
              `radial-gradient(circle at 100% 0%, ${GOLD}22, transparent 55%),` +
              `radial-gradient(circle at 0% 100%, ${TEAL}22, transparent 55%)`,
            boxShadow: `inset 0 0 0 1px ${PARCH_3}, 0 18px 40px -22px ${SEPIA}`,
          }}
        >
          {/* Compass rose — top right */}
          <svg
            className="hidden sm:block absolute top-5 right-5 w-28 h-28 opacity-80"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="46" fill="none" stroke={SEPIA} strokeWidth="0.8" />
            <circle cx="50" cy="50" r="38" fill="none" stroke={SEPIA} strokeWidth="0.6" strokeDasharray="2 3" />
            <polygon points="50,8 56,50 50,92 44,50" fill={INK} opacity="0.85" />
            <polygon points="8,50 50,44 92,50 50,56" fill={INK} opacity="0.65" />
            {/* Directional letters omitted: compass is purely decorative (aria-hidden) and bilingual N/S/E/W parity would otherwise be required. */}
          </svg>

          <div
            className={`relative flex items-center gap-2 text-xs mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}
            style={{ color: SEPIA }}
          >
            <span>{t("Study Center · Linguistics", "មជ្ឈមណ្ឌលសិក្សា · ភាសាវិទ្យា")}</span>
            <span>·</span>
            <span>STUDY-LANG-01</span>
          </div>
          <h1
            className={`relative text-3xl sm:text-4xl font-extrabold leading-tight max-w-3xl ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: INK, fontFamily: k ? undefined : "Georgia, serif" }}
            data-testid="page-title"
          >
            {t(
              "Languages of the World: The Human Tapestry",
              "ភាសានៅជុំវិញពិភពលោក ៖ ផ្ទាំងគំនូរនៃមនុស្សជាតិ"
            )}
          </h1>
          <p
            className={`relative mt-3 text-sm sm:text-base max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {t(
              "Spread out a map of the world and you will see only borders and capitals. Spread out a linguistic map of the same world and you will see something different — about 7,100 living languages, woven across every continent like the threads of an enormous tapestry. Some are spoken by more than a billion people. Others are held alive by only one elderly grandmother. This module walks through the great human inheritance of speech: how many languages we have, who speaks the loudest and who is going silent, the three different ways humans have invented to write thoughts down (including our own beautiful Khmer script with its world-record alphabet), and how some languages are close cousins while others — like the lonely Basque tongue of Spain — stand completely alone.",
              "លាតផែនទីពិភពលោកនោះ អ្នកនឹងឃើញតែព្រំដែន និងរាជធានី។ លាតផែនទីភាសានៃពិភពលោកដូចគ្នា អ្នកនឹងឃើញអ្វីផ្សេង — ភាសារស់ប្រហែល ៧,១០០ ត្បាញឆ្លងគ្រប់ទ្វីបដូចសរសៃនៃផ្ទាំងគំនូរយ៉ាងធំ។ ខ្លះត្រូវបាននិយាយដោយមនុស្សជាងមួយពាន់លាននាក់។ ខ្លះទៀតត្រូវបានរក្សាឲ្យរស់ដោយជីដូនចំណាស់តែម្នាក់។ មុខវិជ្ជានេះដើរតាមមរតកមនុស្សដ៏អស្ចារ្យនៃការនិយាយ ៖ យើងមានភាសាប៉ុន្មាន អ្នកណានិយាយឮខ្លាំងបំផុត និងអ្នកណាកំពុងស្ងាត់ វិធីបីផ្សេងគ្នាដែលមនុស្សបានបង្កើតដើម្បីសរសេរគំនិត (រួមទាំងអក្សរខ្មែរដ៏ស្រស់ស្អាតរបស់យើង ដែលមានអក្ខរក្រមកំណត់ត្រាពិភពលោក) និងរបៀបដែលភាសាខ្លះជាបងប្អូនជិតស្និទ្ធ ខ្ណៈពេលដែលខ្លះទៀត — ដូចជាភាសាបាស្ក៍ឯកោនៅអេស្ប៉ាញ — ឈរម្នាក់ឯងទាំងស្រុង។"
            )}
          </p>

          <div className="relative grid sm:grid-cols-3 gap-3 mt-6">
            <StatTile Icon={Globe2} k={k} accent={TEAL}
              enLabel="Living languages on Earth" khLabel="ភាសារស់នៅលើផែនដី"
              value={`~${num(k, "7,100")}`}
              enUnit="from sign languages to whistled tongues"
              khUnit="ពីភាសាសញ្ញាដល់ភាសាស្វិតមាត់"
            />
            <StatTile Icon={Crown} k={k} accent={GOLD}
              enLabel="Khmer alphabet" khLabel="អក្ខរក្រមខ្មែរ"
              value={num(k, 74)}
              enUnit="letters · longest in the world (Guinness)"
              khUnit="អក្សរ · វែងជាងគេលើពិភពលោក (Guinness)"
            />
            <StatTile Icon={AlertTriangle} k={k} accent={ROSE}
              enLabel="Languages dying" khLabel="ភាសាដែលកំពុងស្លាប់"
              value={`~${num(k, 1)}/${num(k, 2)} ${k ? "សប្ដាហ៍" : "wks"}`}
              enUnit="one extinct roughly every two weeks"
              khUnit="ភាសាមួយផុតពូជប្រហែលរៀងរាល់ ២ សប្ដាហ៍"
            />
          </div>
        </header>

        {/* SECTION 1 · The Global Count */}
        <SectionHeader spec="01" en="The Global Count" kh="ចំនួនភាសាសរុបនៅលើពិភពលោក" k={k} Icon={Globe2} accent={TEAL} />

        <div className="grid lg:grid-cols-5 gap-5 mb-12">
          <div className="lg:col-span-3">
            <FeatureCard
              k={k}
              Icon={Globe2}
              accent={TEAL}
              enTitle="About 7,100 living languages"
              khTitle="ភាសារស់ប្រហែល ៧,១០០"
              enTag="not 100 · not 1,000 · seven thousand"
              khTag="មិនមែន ១០០ · មិនមែន ១,០០០ · ប្រាំពីរពាន់"
              enBody="Most people, if you asked them, would guess that there are perhaps a hundred languages in the world. The real answer, as best linguists can count, is around 7,100 — and they are spread very unevenly. About half the world's people share just 23 'big' languages between them. The other half — roughly four billion people — share more than 7,000 'small' languages. Some are spoken by twenty million villagers. Some are held alive by twenty old farmers. The total keeps shifting because new languages are still being discovered in remote forests, and other languages quietly die when their last fluent speaker passes away. The number 7,100 is a snapshot, not a final count — it is the world as we know it this year."
              khBody="មនុស្សភាគច្រើនប្រសិនបើអ្នកសួរ ច្រើនតែទាយថា មានភាសាប្រហែលមួយរយនៅលើពិភពលោក។ ចម្លើយពិត តាមការរាប់ល្អបំផុតរបស់អ្នកភាសាវិទ្យា គឺប្រហែល ៧,១០០ — ហើយពួកវាត្រូវបានចែកចាយមិនស្មើគ្នាខ្លាំង។ ប្រហែលពាក់កណ្ដាលនៃមនុស្សពិភពលោកចែករំលែកតែ ២៣ ភាសាធំៗជាមួយគ្នា។ ពាក់កណ្ដាលផ្សេងទៀត — ប្រហែលបួនពាន់លាននាក់ — ចែករំលែកភាសា 'តូច' ច្រើនជាង ៧,០០០។ ខ្លះត្រូវបាននិយាយដោយអ្នកភូមិម្ភៃលាននាក់។ ខ្លះទៀតរក្សាឲ្យរស់ដោយកសិករចំណាស់ម្ភៃនាក់។ ចំនួនសរុបបន្តប្ដូរ ព្រោះភាសាថ្មីនៅតែត្រូវបានរកឃើញនៅព្រៃឆ្ងាយ ហើយភាសាផ្សេងទៀតស្លាប់ស្ងាត់ៗ នៅពេលអ្នកនិយាយស្ទាត់ចុងក្រោយរបស់ពួកវាស្លាប់។ លេខ ៧,១០០ ជារូបរូបថត មិនមែនការរាប់ចុងក្រោយទេ — វាជាពិភពលោកដូចដែលយើងស្គាល់នៅឆ្នាំនេះ។"
            />
          </div>

          {/* PNG outlier card */}
          <div className="lg:col-span-2">
            <PNGOutlierCard k={k} />
          </div>
        </div>

        {/* SECTION 2 · The Most & Least Common */}
        <SectionHeader spec="02" en="The Most & Least Common" kh="ភាសាដែលនិយាយច្រើន និងតិចជាងគេ" k={k} Icon={Mic} accent={GOLD} />

        <div className="grid lg:grid-cols-5 gap-5 mb-6">
          <div className="lg:col-span-3">
            <SpeakersChart k={k} />
          </div>
          <div className="lg:col-span-2">
            <FeatureCard
              k={k}
              Icon={Crown}
              accent={GOLD}
              enTitle="The Giants"
              khTitle="ភាសាយក្ស"
              enTag="counted by total speakers (native + second-language)"
              khTag="រាប់តាមអ្នកនិយាយសរុប (ម្ដាយ + ភាសាទីពីរ)"
              enBody="When you count everyone who can speak a language — not just people who grew up with it — four giants tower above the rest. English is the planet's lingua franca, used in business, science, aviation, and the internet, with about 1.5 billion total speakers. Mandarin Chinese is the largest by native speakers, with around 940 million people who learned it as their first tongue. Hindi, the language of about half a billion people in northern India, is close behind. Spanish — carried by ships from Spain to almost all of Latin America five centuries ago — is the fourth giant, with about 600 million speakers between Madrid and Mexico City."
              khBody="នៅពេលអ្នករាប់មនុស្សគ្រប់គ្នាដែលអាចនិយាយភាសាមួយ — មិនមែនតែមនុស្សដែលធំឡើងជាមួយវា — ភាសាយក្សបួនលើសពីភាសាផ្សេងទៀត។ អង់គ្លេសជាភាសាសកលនៃផែនដី ប្រើក្នុងពាណិជ្ជកម្ម វិទ្យាសាស្ត្រ អាកាសចរណ៍ និងអ៊ីនធឺណិត ដោយមានអ្នកនិយាយសរុបប្រហែល ១.៥ ពាន់លាននាក់។ ភាសាចិនកុកងឺ ធំជាងគេតាមអ្នកនិយាយម្ដាយ ប្រហែល ៩៤០ លាននាក់ដែលរៀនវាជាភាសាដំបូង។ ហិណ្ឌី ភាសារបស់មនុស្សប្រហែលកន្លះពាន់លាននាក់នៅភាគខាងជើងឥណ្ឌា មកជិតពីក្រោយ។ អេស្ប៉ាញ — ដែលត្រូវបានដឹកដោយកប៉ាល់ពីអេស្ប៉ាញទៅស្ទើរតែទាំងអស់នៃអាមេរិកឡាទីនកាលពីប្រាំសតវត្សមុន — ជាយក្សទីបួន ដោយមានអ្នកនិយាយប្រហែល ៦០០ លាននាក់ រវាងម៉ាដ្រីដ និងម៉ិកស៊ិកូស៊ីធី។"
            />
          </div>
        </div>

        {/* The Endangered card */}
        <FeatureCard
          k={k}
          Icon={AlertTriangle}
          accent={ROSE}
          enTitle="The Endangered: a language dies every two weeks"
          khTitle="ភាសាដែលរងគ្រោះ ៖ ភាសាមួយស្លាប់រៀងរាល់ ២ សប្ដាហ៍"
          enTag="extinction by silence"
          khTag="ការផុតពូជដោយភាពស្ងាត់"
          enBody="At the other end of the scale is a quiet emergency. Of the roughly 7,100 languages alive today, linguists estimate that almost half are seriously endangered — meaning children are no longer learning them. Languages disappear at a rate of about one every two weeks. In nearly every case the same scene plays out: there is one last fluent speaker, almost always elderly, sometimes living far from any town. When that grandmother or grandfather dies, the language dies with them. And what disappears is far more than vocabulary. Each language carries an entire way of seeing the world — names for plants no other language has noticed, songs no one else can sing, jokes nobody else can hear, a unique way of slicing time, colour, family, and the sky. When a language goes silent, a whole library that was never written down burns to the ground in a single afternoon."
          khBody="នៅចុងម្ខាងផ្សេងនៃមាត្រដ្ឋានគឺមានបញ្ហាបន្ទាន់ស្ងាត់។ ក្នុងចំណោមភាសារស់ប្រហែល ៧,១០០ សព្វថ្ងៃ អ្នកភាសាវិទ្យាប៉ាន់ស្មានថា ជិតពាក់កណ្ដាលរងគ្រោះធ្ងន់ធ្ងរ — មានន័យថា កុមារលែងរៀនពួកវា។ ភាសាបាត់នៅអត្រាប្រហែលមួយរៀងរាល់ ២ សប្ដាហ៍។ ស្ទើរតែគ្រប់ករណីសាច់រឿងដូចគ្នាកើតឡើង ៖ មានអ្នកនិយាយស្ទាត់ចុងក្រោយម្នាក់ ស្ទើរតែតែងតែចាស់ ខ្លះរស់ឆ្ងាយពីទីក្រុង។ នៅពេលជីដូន ឬជីតានោះស្លាប់ ភាសាស្លាប់ជាមួយពួកគេ។ ហើយអ្វីដែលបាត់គឺច្រើនជាងវាក្យសព្ទឆ្ងាយ។ ភាសានីមួយៗដឹកនៅទស្សនៈពេញលេញនៃការមើលឃើញពិភពលោក — ឈ្មោះរុក្ខជាតិដែលគ្មានភាសាផ្សេងបានកត់សម្គាល់ បទចម្រៀងដែលគ្មានអ្នកផ្សេងអាចច្រៀង រឿងកំប្លែងដែលគ្មានអ្នកផ្សេងអាចស្ដាប់ វិធីតែមួយនៃការកាត់ពេលវេលា ពណ៌ គ្រួសារ និងមេឃ។ នៅពេលភាសាមួយស្ងាត់ បណ្ណាល័យទាំងមូលដែលមិនដែលបានសរសេរ ឆេះបាត់នៅរសៀលតែមួយ។"
        />

        {/* SECTION 3 · Writing systems */}
        <div className="mt-12">
          <SectionHeader spec="03" en="Alphabets, Logograms, Abugidas" kh="អក្ខរក្រម ឡូហ្គូក្រាម និងអប៊ូហ្គីដា" k={k} Icon={Type} accent={SEPIA} />
        </div>

        <P
          k={k}
          en="Almost everyone assumes that writing means 'an alphabet' — a row of letters where consonants and vowels are separate building blocks, like English C-A-T. That is only one of three completely different inventions humans have made for putting language on paper. Look at how three writing systems handle the same idea side by side:"
          kh="ស្ទើរតែគ្រប់គ្នាសន្មត់ថា ការសរសេរមានន័យថា 'អក្ខរក្រម' — ជួរអក្សរដែលព្យញ្ជនៈ និងស្រៈជាប្លុកសាងសង់ដាច់ដោយឡែក ដូចជាអង់គ្លេស C-A-T។ នោះគ្រាន់តែជាមួយក្នុងចំណោមការបង្កើតបីយ៉ាងខុសគ្នាទាំងស្រុងដែលមនុស្សបានបង្កើត ដើម្បីដាក់ភាសាលើក្រដាស។ មើលរបៀបដែលប្រព័ន្ធសរសេរបីដោះស្រាយគំនិតដូចគ្នា ៖"
          className="mb-5 -mt-1"
        />

        <WritingSystemsComparison k={k} />

        <div className="grid lg:grid-cols-3 gap-5 mt-6 mb-6">
          <FeatureCard
            k={k}
            Icon={Type}
            accent={INK_SOFT}
            enTitle="Alphabet"
            khTitle="អក្ខរក្រម"
            enTag="consonants + vowels · separate blocks"
            khTag="ព្យញ្ជនៈ + ស្រៈ · ប្លុកដាច់ដោយឡែក"
            enBody="An alphabet writes consonants and vowels as equal, separate symbols sitting in a row. English, French, Russian, Greek, and Arabic all use alphabet-style systems. To write the word 'cat' in English you stack three independent letters: C + A + T. Each of those letters can stand on its own, in any order, in any other word. About 70 different alphabets exist today, but most of them descend from a single ancestor invented in the Middle East about 3,800 years ago."
            khBody="អក្ខរក្រមសរសេរព្យញ្ជនៈ និងស្រៈជានិមិត្តសញ្ញាស្មើគ្នា ដាច់ដោយឡែក អង្គុយក្នុងជួរ។ អង់គ្លេស បារាំង រុស្ស៊ី ក្រិច និងអារ៉ាប់ ប្រើប្រព័ន្ធបែបអក្ខរក្រម។ ដើម្បីសរសេរពាក្យ 'cat' ជាអង់គ្លេស អ្នកដាក់អក្សរឯករាជ្យបី ៖ C + A + T។ អក្សរនីមួយៗអាចឈរតែឯង ក្នុងលំដាប់ណាក៏បាន ក្នុងពាក្យផ្សេងណាក៏បាន។ ប្រហែល ៧០ អក្ខរក្រមផ្សេងគ្នាមានសព្វថ្ងៃ ប៉ុន្តែភាគច្រើនចុះមកពីបុព្វបុរសតែមួយដែលត្រូវបានបង្កើតនៅមជ្ឈិមបូព៌ាប្រហែល ៣,៨០០ ឆ្នាំមុន។"
          />

          <FeatureCard
            k={k}
            Icon={BookOpen}
            accent={RUST}
            enTitle="Logogram"
            khTitle="ឡូហ្គូក្រាម"
            enTag="one symbol = one whole word or idea"
            khTag="និមិត្តសញ្ញាមួយ = ពាក្យពេញមួយ ឬគំនិតមួយ"
            enBody="A logogram does not write sounds at all — it writes whole ideas. Chinese characters (called Hanzi) are the most famous living example. The character 山 means 'mountain' and looks like one. The character 木 means 'tree'. Combine them and 林 means 'forest' — two trees together. There are no letters and no spelling: you must memorise the symbol for every concept you want to write. A literate Chinese adult knows roughly 3,000–5,000 characters. The system is hard to learn but powerful — speakers of completely different Chinese dialects who cannot understand each other's spoken words can still read the same newspaper."
            khBody="ឡូហ្គូក្រាមមិនសរសេរសំឡេងទាល់តែសោះ — វាសរសេរគំនិតពេញមួយ។ អក្សរចិន (ហៅថា ហានហ្ស៊ី) ជាឧទាហរណ៍រស់ល្បីបំផុត។ អក្សរ 山 មានន័យថា 'ភ្នំ' និងមើលទៅដូចភ្នំ។ អក្សរ 木 មានន័យថា 'ដើមឈើ'។ បញ្ចូលគ្នា 林 មានន័យថា 'ព្រៃ' — ដើមឈើពីរនៅជាមួយគ្នា។ គ្មានអក្សរ និងគ្មានការប្រកប ៖ អ្នកត្រូវចងចាំនិមិត្តសញ្ញាសម្រាប់គំនិតគ្រប់យ៉ាងដែលអ្នកចង់សរសេរ។ មនុស្សពេញវ័យចិនចេះអាន ស្គាល់ប្រហែល ៣,០០០–៥,០០០ អក្សរ។ ប្រព័ន្ធនេះពិបាករៀន ប៉ុន្តែខ្លាំង — អ្នកនិយាយគ្រាមភាសាចិនខុសគ្នាទាំងស្រុង ដែលមិនអាចស្ដាប់គ្នាបាន នៅតែអាចអានកាសែតដូចគ្នា។"
          />

          <FeatureCard
            k={k}
            Icon={Crown}
            accent={GOLD}
            enTitle="Abugida — including Khmer!"
            khTitle="អប៊ូហ្គីដា — រួមទាំងភាសាខ្មែរ !"
            enTag="consonant base + vowel attachments"
            khTag="ព្យញ្ជនៈគោល + ស្រៈភ្ជាប់"
            enBody="Khmer (and most scripts of India and Southeast Asia — Devanagari, Tamil, Tibetan, Thai, Lao, Burmese) belongs to a third family called abugidas. In an abugida the consonant is the main building block and the vowels are 'attachments' that wrap around it: above, below, in front, behind, or curling around. Khmer carries an extra source of national pride: at 74 letters (33 consonants + 23 vowels + 18 independent vowels) the Khmer alphabet holds the Guinness World Record for the longest alphabet on Earth. So every time a Khmer student writes their own name, they are using a writing system that is, by the official measure, the most elaborate the human race has ever invented."
            khBody="ភាសាខ្មែរ (និងអក្សរភាគច្រើននៃឥណ្ឌា និងអាស៊ីអាគ្នេយ៍ — ទេវនាគរី តាមីល ទីបេ ថៃ ឡាវ ភូមា) ជាកម្មសិទ្ធិរបស់គ្រួសារទីបីដែលហៅថា អប៊ូហ្គីដា។ ក្នុងអប៊ូហ្គីដា ព្យញ្ជនៈជាប្លុកសាងសង់ចម្បង ហើយស្រៈជា 'ការភ្ជាប់' ដែលរុំជុំវិញ ៖ ខាងលើ ខាងក្រោម ខាងមុខ ខាងក្រោយ ឬកោងជុំវិញ។ ខ្មែរមានប្រភពនៃមោទនភាពជាតិបន្ថែម ៖ នៅ ៧៤ អក្សរ (៣៣ ព្យញ្ជនៈ + ២៣ ស្រៈ + ១៨ ស្រៈឯករាជ្យ) អក្ខរក្រមខ្មែរកាន់កំណត់ត្រាពិភពលោក Guinness សម្រាប់អក្ខរក្រមវែងបំផុតនៅលើផែនដី។ ដូច្នេះរាល់ពេលសិស្សខ្មែរម្នាក់សរសេរឈ្មោះខ្លួនឯង ពួកគេកំពុងប្រើប្រព័ន្ធសរសេរ ដែលតាមការវាស់វែងផ្លូវការ ស្មុគស្មាញបំផុតដែលមនុស្សជាតិធ្លាប់បានបង្កើត។"
          />
        </div>

        {/* Khmer-script breakdown diagram */}
        <KhmerAbugidaDiagram k={k} />

        {/* SECTION 4 · Families & Isolates */}
        <div className="mt-12">
          <SectionHeader spec="04" en="Language Relatives & Strangers" kh="ភាសាដែលមានទំនាក់ទំនង និងភាសាដាច់ស្រយាល" k={k} Icon={Trees} accent={FOREST} />
        </div>

        <div className="grid lg:grid-cols-5 gap-5 mb-8">
          <div className="lg:col-span-3">
            <FeatureCard
              k={k}
              Icon={Trees}
              accent={FOREST}
              enTitle="The Romance family — daughters of Latin"
              khTitle="គ្រួសាររ៉ូម៉ាំង — កូនស្រីនៃឡាតាំង"
              enTag="why Spanish and Italian feel like cousins"
              khTag="ហេតុអ្វីអេស្ប៉ាញ និងអ៊ីតាលីមានអារម្មណ៍ដូចបងប្អូនជីដូនមួយ"
              enBody="Have you ever noticed that Spanish, French, Italian, Portuguese, and Romanian look strangely alike? 'Water' is agua, eau, acqua, água, apă. 'Night' is noche, nuit, notte, noite, noapte. They are not coincidences. Two thousand years ago, all of those countries were part of the Roman Empire and spoke Latin. When Rome fell, Latin slowly broke apart in each region — like one big tree splitting into branches — and those branches became the modern Romance languages. They are sisters with the same mother, which is why a Spanish speaker can often half-understand a written Italian menu. Linguists call groups like this language families. The world has roughly 140 of them. The biggest is Indo-European, the family English, Hindi, Russian, Greek, Persian, and the Romance languages all belong to."
              khBody="តើអ្នកធ្លាប់សម្គាល់ឃើញទេថា អេស្ប៉ាញ បារាំង អ៊ីតាលី ព័រទុយហ្គាល់ និងរ៉ូម៉ានី មើលទៅដូចគ្នាចម្លែក ? 'ទឹក' គឺ agua, eau, acqua, água, apă។ 'យប់' គឺ noche, nuit, notte, noite, noapte។ ពួកវាមិនមែនជាការចៃដន្យទេ។ ពីរពាន់ឆ្នាំមុន ប្រទេសទាំងនោះជាផ្នែកនៃចក្រភពរ៉ូម៉ាំង និងនិយាយឡាតាំង។ នៅពេលរ៉ូមដួល ឡាតាំងបែកបាក់យឺតៗក្នុងតំបន់នីមួយៗ — ដូចដើមឈើធំមួយបែកជាមែក — ហើយមែកទាំងនោះក្លាយជាភាសារ៉ូម៉ាំងសម័យថ្មី។ ពួកវាជាបងប្អូនស្រីដែលមានម្ដាយដូចគ្នា ហេតុនេះអ្នកនិយាយអេស្ប៉ាញ ច្រើនតែអាចយល់ពាក់កណ្ដាលនៃម៉ឺនុយអ៊ីតាលីដែលសរសេរ។ អ្នកភាសាវិទ្យាហៅក្រុមបែបនេះថា គ្រួសារភាសា។ ពិភពលោកមានប្រហែល ១៤០ គ្រួសារ។ ធំបំផុតគឺឥណ្ឌូ-អឺរ៉ុប គ្រួសារដែលអង់គ្លេស ហិណ្ឌី រុស្ស៊ី ក្រិច ពែរ្ស និងភាសារ៉ូម៉ាំងជាកម្មសិទ្ធិ។"
            >
              <RomanceTree k={k} />
            </FeatureCard>
          </div>

          <div className="lg:col-span-2">
            <FeatureCard
              k={k}
              Icon={Anchor}
              accent={ROSE}
              enTitle="Basque — the lonely island"
              khTitle="បាស្ក៍ — កោះឯកោ"
              enTag="a language isolate · related to nothing"
              khTag="ភាសាដាច់ស្រយាល · ពុំទាក់ទងនឹងអ្វីផ្សេង"
              enBody="In a small region between northern Spain and southern France, about 750,000 people speak a language called Basque (their own name for it is Euskara). It is surrounded on every side by Romance languages — Spanish, French, Catalan — and yet Basque has nothing in common with any of them. It has nothing in common with any other language alive on Earth. Linguists call this kind of orphan a language isolate. Basque was already being spoken in Europe before the ancestors of Latin, Greek, Celtic, or Germanic ever arrived — it is, as far as anyone can tell, the last surviving voice of pre-Indo-European Europe. Its origins are a complete mystery. There are about a dozen confirmed isolates worldwide; Basque is the most famous of them, a small linguistic island that has refused for thousands of years to be absorbed by the languages that surround it."
              khBody="នៅតំបន់តូចមួយរវាងភាគខាងជើងអេស្ប៉ាញ និងភាគខាងត្បូងបារាំង មនុស្សប្រហែល ៧៥០,០០០ នាក់និយាយភាសាមួយហៅថា បាស្ក៍ (ឈ្មោះផ្ទាល់ខ្លួនរបស់ពួកគេសម្រាប់វាគឺ Euskara)។ វាត្រូវបានព័ទ្ធជុំវិញគ្រប់ផ្នែកដោយភាសារ៉ូម៉ាំង — អេស្ប៉ាញ បារាំង កាតាឡាន — ប៉ុន្តែបាស្ក៍គ្មានអ្វីទូទៅជាមួយណាមួយឡើយ។ វាគ្មានអ្វីទូទៅជាមួយភាសាផ្សេងណាមួយរស់នៅលើផែនដី។ អ្នកភាសាវិទ្យាហៅប្រភេទក្មេងកំព្រានេះថា ភាសាដាច់ស្រយាល។ បាស្ក៍ត្រូវបាននិយាយនៅអឺរ៉ុបរួចហើយ មុនពេលបុព្វបុរសរបស់ឡាតាំង ក្រិច សែលទីក ឬហ្សែម៉ានិកមកដល់ — វាជាសំឡេងរស់ចុងក្រោយនៃអឺរ៉ុបមុនឥណ្ឌូ-អឺរ៉ុប ដូចដែលអ្នកណាក៏អាចប្រាប់បាន។ ប្រភពរបស់វាជាអាថ៌កំបាំងពេញលេញ។ មានភាសាដាច់ស្រយាលបញ្ជាក់ប្រហែលដប់ពីរនៅជុំវិញពិភពលោក ; បាស្ក៍ល្បីបំផុតក្នុងចំណោមពួកគេ កោះភាសាតូចមួយដែលបានបដិសេធអស់រាប់ពាន់ឆ្នាំ មិនទទួលយកភាសាដែលព័ទ្ធជុំវិញវា។"
            />
          </div>
        </div>

        {/* Closing reflection */}
        <div
          className="mt-2 rounded-2xl border-2 p-4 flex items-start gap-3"
          style={{ borderColor: SEPIA, backgroundColor: PARCH_2 }}
        >
          <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
          <p
            className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {t(
              "Every word a Khmer student speaks at home is part of a chain of voices stretching back two thousand years to the kingdoms of Funan and Chenla. Every letter in their alphabet — all 74 of them — is a small inheritance from a civilisation that decided, long ago, that no spoken sound was too small to be worth writing down. To learn a language is to step inside someone's way of thinking. To speak two is to live in two worlds at once.",
              "រាល់ពាក្យដែលសិស្សខ្មែរនិយាយនៅផ្ទះ ជាផ្នែកនៃខ្សែសំឡេងលាតសន្ធឹងថយក្រោយពីរពាន់ឆ្នាំទៅរាជាណាចក្រហ្វូណន និងចេនឡា។ រាល់អក្សរក្នុងអក្ខរក្រមរបស់ពួកគេ — ទាំង ៧៤ — ជាមរតកតូចមួយពីអរិយធម៌ដែលបានសម្រេចចិត្ត ជាយូរមកហើយ ថា គ្មានសំឡេងនិយាយណាមួយតូចពេកដែលមិនគួរសរសេរទេ។ ការរៀនភាសាគឺការជើងចូលក្នុងវិធីគិតរបស់នរណាម្នាក់។ ការនិយាយពីរ គឺការរស់នៅពិភពលោកពីរក្នុងពេលតែមួយ។"
            )}
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-90 ${k ? "font-khmer" : ""}`}
            style={{
              backgroundColor: TEAL,
              color: PARCH,
              boxShadow: `0 8px 22px -10px ${TEAL}`,
            }}
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
//  Diagram · Papua New Guinea linguistic-diversity outlier card
// ════════════════════════════════════════════════════════════════════════════

function PNGOutlierCard({ k }: { k: boolean }) {
  return (
    <div
      className="rounded-3xl border-2 p-5 sm:p-6 h-full"
      style={{
        borderColor: TEAL,
        backgroundColor: PARCH_2,
        boxShadow: `inset 0 0 0 1px ${PARCH_3}, 0 12px 28px -18px ${SEPIA}`,
      }}
      data-testid="png-outlier"
    >
      <div className={`text-[10px] mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: TEAL }}>
        {k ? "ភាពចម្រុះភាសាខ្ពស់បំផុតលើពិភពលោក" : "EXTREME · MOST DIVERSE COUNTRY"}
      </div>
      <h3
        className={`text-2xl font-extrabold mb-1 ${k ? "font-khmer" : ""}`}
        style={{ color: INK, fontFamily: k ? undefined : "Georgia, serif" }}
      >
        {k ? "ប៉ាពួញូហ្គីណេ" : "Papua New Guinea"}
      </h3>
      <div className={`text-sm mb-3 ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k ? "ប្រទេសកោះមួយ · ភាសាជាង ៨០០" : "One island country · over 800 languages"}
      </div>

      {/* Mini stylised map */}
      <svg viewBox="0 0 240 130" className="w-full h-auto mb-3" role="img" aria-label={k ? "ផែនទីប៉ាពួញូហ្គីណេ" : "Map of Papua New Guinea"}>
        {/* Sea background */}
        <rect width="240" height="130" fill="#cfe2dd" rx="6" />
        {/* Latitude lines */}
        {[20, 50, 80, 110].map((y) => (
          <line key={y} x1="0" y1={y} x2="240" y2={y} stroke={TEAL} strokeWidth="0.4" strokeDasharray="2 4" opacity="0.5" />
        ))}
        {/* PNG silhouette (simplified) */}
        <path
          d="M 30 70 Q 50 50 90 50 L 130 45 Q 160 42 180 55 L 210 60 Q 220 70 205 80 L 170 88 Q 140 92 110 86 L 70 90 Q 40 88 30 78 Z"
          fill={SEPIA}
          stroke={INK}
          strokeWidth="1"
          opacity="0.85"
        />
        {/* Many tiny dots = 800 languages */}
        {Array.from({ length: 60 }).map((_, i) => {
          const x = 36 + (i * 13) % 170;
          const y = 55 + (Math.floor(i / 13) * 6) + ((i * 3) % 25);
          if (y < 60 || y > 88 || x < 36 || x > 205) return null;
          return <circle key={i} cx={x} cy={y} r="1.4" fill={GOLD} opacity="0.9" />;
        })}
        {/* Label */}
        <text x="120" y="22" textAnchor="middle" fontSize="9" fill={INK} fontFamily="Georgia, serif" fontWeight="bold">
          {k ? "៨០០+ ភាសា" : "800+ LANGUAGES"}
        </text>
        {/* Arrow */}
        <path d="M 120 26 L 120 42" stroke={INK} strokeWidth="1" markerEnd="url(#langArrow)" />
        <defs>
          <marker id="langArrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill={INK} />
          </marker>
        </defs>
      </svg>

      <P
        k={k}
        en="One country, smaller than Cambodia by population, contains over 800 mutually-unintelligible languages — more than the whole continent of Europe. Its mountain valleys are so rugged that for thousands of years the people on one side of a ridge could not easily reach the people on the other side, and so each valley quietly grew its own language. About 12% of every living language on the planet is spoken on this single island."
        kh="ប្រទេសមួយ ដែលតូចជាងកម្ពុជាតាមចំនួនប្រជាជន មានភាសាជាង ៨០០ ដែលមិនអាចស្ដាប់គ្នាបាន — ច្រើនជាងទ្វីបអឺរ៉ុបទាំងមូល។ ជ្រលងភ្នំរបស់វាខ្ពស់ស្មុគស្មាញខ្លាំងណាស់ ដែលអស់រាប់ពាន់ឆ្នាំ មនុស្សនៅផ្នែកម្ខាងនៃកំពូលភ្នំ ពុំងាយចូលដល់មនុស្សនៅផ្នែកម្ខាងទៀត ដូច្នេះជ្រលងនីមួយៗស្ងាត់ៗ បានដាំភាសាផ្ទាល់របស់ខ្លួន។ ប្រហែល ១២% នៃភាសារស់គ្រប់ភាសានៅលើផែនដី ត្រូវបាននិយាយនៅលើកោះតែមួយនេះ។"
        className="text-[13px]"
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Diagram · Top spoken languages (total speakers) — bar chart
// ════════════════════════════════════════════════════════════════════════════

function SpeakersChart({ k }: { k: boolean }) {
  const langs = [
    { en: "English",    kh: "អង់គ្លេស",    speakers: 1500, native:  380, colour: TEAL  },
    { en: "Mandarin",   kh: "ចិនកុកងឺ",    speakers: 1100, native:  940, colour: RUST  },
    { en: "Hindi",      kh: "ហិណ្ឌី",       speakers:  610, native:  345, colour: GOLD  },
    { en: "Spanish",    kh: "អេស្ប៉ាញ",     speakers:  600, native:  485, colour: ROSE  },
    { en: "Arabic",     kh: "អារ៉ាប់",       speakers:  390, native:  335, colour: SEPIA },
    { en: "Bengali",    kh: "បេន្កាលី",     speakers:  290, native:  235, colour: FOREST },
  ];
  const max = langs[0].speakers;

  return (
    <div
      className="rounded-3xl border-2 p-5 sm:p-6 h-full"
      style={{
        borderColor: GOLD,
        backgroundColor: PARCH_2,
        boxShadow: `inset 0 0 0 1px ${PARCH_3}, 0 12px 28px -18px ${SEPIA}`,
      }}
      data-testid="speakers-chart"
    >
      <div className={`text-[10px] mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: GOLD }}>
        {k ? "ភាសាដែលនិយាយច្រើនបំផុត · លាននាក់" : "MOST-SPOKEN LANGUAGES · MILLIONS OF SPEAKERS"}
      </div>
      <ol className="space-y-3 mt-3">
        {langs.map((l) => {
          const pct = (l.speakers / max) * 100;
          const nativePct = (l.native / max) * 100;
          return (
            <li key={l.en}>
              <div className="flex items-center justify-between text-[12px] mb-0.5">
                <span className={`font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK, fontFamily: k ? undefined : "Georgia, serif" }}>
                  {k ? l.kh : l.en}
                </span>
                <span className="font-mono" style={{ color: l.colour }}>
                  {num(k, l.speakers)}M {k ? "សរុប" : "total"}
                </span>
              </div>
              <div className="h-4 rounded-full overflow-hidden relative" style={{ backgroundColor: PARCH }}>
                {/* Total bar */}
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: `${l.colour}55`,
                    border: `1px solid ${l.colour}`,
                  }}
                />
                {/* Native-speaker overlay */}
                <div
                  className="h-full rounded-full absolute left-0 top-0"
                  style={{
                    width: `${nativePct}%`,
                    backgroundColor: l.colour,
                  }}
                />
              </div>
              <div className="text-[10px] mt-0.5 font-mono" style={{ color: INK_SOFT }}>
                {k ? "ភាសាម្ដាយ" : "native"} {num(k, l.native)}M
              </div>
            </li>
          );
        })}
      </ol>
      <div className="flex items-center gap-3 mt-4 text-[10px]" style={{ color: INK_SOFT }}>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: TEAL }} />
          <span className={k ? "font-khmer" : ""}>{k ? "អ្នកនិយាយម្ដាយ" : "native speakers"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: `${TEAL}55`, border: `1px solid ${TEAL}` }} />
          <span className={k ? "font-khmer" : ""}>{k ? "សរុប (ម្ដាយ + ភាសាទីពីរ)" : "total (native + L2)"}</span>
        </div>
      </div>
      <div className={`mt-3 text-[10px] italic ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "ខ្មែរ ៖ ប្រហែល ១៦ លានអ្នកនិយាយម្ដាយ — ខាងក្រៅប្លុកនេះ ប៉ុន្តែជារូបិយភាសាប្រវត្តិសាស្ត្រនៃកម្ពុជា។"
          : "Khmer: ~16M native speakers — outside this top tier, but our country's historic tongue."}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Diagram · Three writing systems side-by-side
// ════════════════════════════════════════════════════════════════════════════

function WritingSystemsComparison({ k }: { k: boolean }) {
  return (
    <div
      className="rounded-3xl border-2 p-5 sm:p-6"
      style={{
        borderColor: SEPIA,
        backgroundColor: PARCH_2,
        boxShadow: `inset 0 0 0 1px ${PARCH_3}, 0 12px 28px -18px ${SEPIA}`,
      }}
      data-testid="writing-systems"
    >
      <div className={`text-[10px] mb-3 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: SEPIA }}>
        {k ? "ប្រព័ន្ធសរសេរបី · គំនិតដូចគ្នា" : "THREE WRITING SYSTEMS · ONE IDEA"}
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Alphabet */}
        <div className="rounded-2xl p-4 border-2" style={{ borderColor: INK_SOFT, backgroundColor: PARCH }}>
          <div className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
            {k ? "អក្ខរក្រម · អង់គ្លេស" : "Alphabet · English"}
          </div>
          <div className="text-3xl font-bold mb-1" style={{ color: INK, fontFamily: "Georgia, serif" }}>FOREST</div>
          <div className="flex gap-1 mb-2">
            {["F", "O", "R", "E", "S", "T"].map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center justify-center w-7 h-7 rounded-md text-sm font-bold"
                style={{
                  backgroundColor: i % 2 === 0 ? `${INK_SOFT}22` : "transparent",
                  border: `1px solid ${INK_SOFT}55`,
                  color: INK,
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className={`text-[11px] ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK_SOFT }}>
            {k ? "៦ អក្សរឯករាជ្យ ↦ សំឡេង ៦ ភ្ជាប់គ្នា។" : "6 independent letters → 6 sounds in a row."}
          </div>
        </div>

        {/* Logogram */}
        <div className="rounded-2xl p-4 border-2" style={{ borderColor: RUST, backgroundColor: PARCH }}>
          <div className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${k ? "font-khmer" : ""}`} style={{ color: RUST }}>
            {k ? "ឡូហ្គូក្រាម · ចិន" : "Logogram · Chinese"}
          </div>
          <div className="text-5xl mb-1 leading-none" style={{ color: INK }} lang="zh">林</div>
          <div className="text-[12px] mb-2" style={{ color: INK_SOFT }}>
            <span lang="zh" style={{ color: INK, fontWeight: 600 }}>木</span>{" "}
            {k ? "(ដើមឈើ)" : "(tree)"} +{" "}
            <span lang="zh" style={{ color: INK, fontWeight: 600 }}>木</span>{" "}
            {k ? "(ដើមឈើ) = " : "(tree) = "}
            <span lang="zh" style={{ color: INK, fontWeight: 600 }}>林</span>{" "}
            {k ? "(ព្រៃ)" : "(forest)"}
          </div>
          <div className={`text-[11px] ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK_SOFT }}>
            {k ? "១ និមិត្តសញ្ញា = ១ គំនិតពេញ។ ការប្រកបមិនមាន។" : "1 symbol = 1 whole idea. No spelling exists."}
          </div>
        </div>

        {/* Abugida */}
        <div className="rounded-2xl p-4 border-2" style={{ borderColor: GOLD, backgroundColor: PARCH }}>
          <div className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${k ? "font-khmer" : ""}`} style={{ color: GOLD }}>
            {k ? "អប៊ូហ្គីដា · ខ្មែរ" : "Abugida · Khmer"}
          </div>
          <div
            className="text-5xl mb-1 leading-none font-khmer"
            style={{ color: INK }}
          >
            ព្រៃ
          </div>
          <div className={`text-[12px] mb-2 font-khmer`} style={{ color: INK_SOFT }}>
            <span style={{ color: INK, fontWeight: 600 }}>ព</span> + <span style={{ color: INK, fontWeight: 600 }}>្រ</span> + <span style={{ color: INK, fontWeight: 600 }}>ៃ</span>
            {" "}= <span style={{ color: INK, fontWeight: 600 }}>ព្រៃ</span> ({k ? "ព្រៃឈើ" : "forest"})
          </div>
          <div className={`text-[11px] ${k ? "font-khmer leading-loose" : ""}`} style={{ color: INK_SOFT }}>
            {k
              ? "ព្យញ្ជនៈគោល + ព្យញ្ជនៈរង + ស្រៈ ភ្ជាប់គ្នាជាប្លុកតែមួយ។"
              : "Consonant base + sub-consonant + vowel, fused into a single block."}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Diagram · Khmer abugida — show ក with various vowel attachments
// ════════════════════════════════════════════════════════════════════════════

function KhmerAbugidaDiagram({ k }: { k: boolean }) {
  // Different vowel positions around the consonant ក (KA)
  const examples = [
    { syl: "កា", vowel: "ា",  enPos: "vowel sits AFTER",  khPos: "ស្រៈនៅខាងក្រោយ",   sound: "kaa" },
    { syl: "កិ", vowel: "ិ",  enPos: "vowel sits ABOVE",  khPos: "ស្រៈនៅខាងលើ",        sound: "ki"  },
    { syl: "កុ", vowel: "ុ",  enPos: "vowel sits BELOW",  khPos: "ស្រៈនៅខាងក្រោម",     sound: "ko"  },
    { syl: "កេ", vowel: "េ",  enPos: "vowel sits BEFORE", khPos: "ស្រៈនៅខាងមុខ",        sound: "kee" },
    { syl: "កៀ", vowel: "ៀ", enPos: "vowel WRAPS around",khPos: "ស្រៈព័ទ្ធជុំវិញ",      sound: "kie" },
  ];
  return (
    <div
      className="mt-6 rounded-3xl border-2 p-5 sm:p-6"
      style={{
        borderColor: GOLD,
        backgroundColor: PARCH_2,
        boxShadow: `inset 0 0 0 1px ${PARCH_3}, 0 12px 28px -18px ${SEPIA}`,
      }}
      data-testid="khmer-abugida"
    >
      <div className={`text-[10px] mb-1 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: GOLD }}>
        {k ? "របៀបដែលអប៊ូហ្គីដាខ្មែរដំណើរការ" : "HOW THE KHMER ABUGIDA WORKS"}
      </div>
      <h3
        className={`text-xl font-extrabold mb-3 ${k ? "font-khmer" : ""}`}
        style={{ color: INK, fontFamily: k ? undefined : "Georgia, serif" }}
      >
        {k
          ? "ព្យញ្ជនៈ ក មួយ · ស្រៈប្រាំផ្សេងគ្នា · ៥ ព្យាង្គ"
          : "One consonant ក · five different vowels · five syllables"}
      </h3>
      <P
        k={k}
        en="In an alphabet, vowels sit on the line beside the consonants like equal partners. In an abugida like Khmer, the consonant is the boss — it always sits in the centre of its block — and the vowel attaches to it from whichever side the language demands. Watch how the same single consonant ក 'k' completely changes meaning depending on where the vowel mark is placed:"
        kh="ក្នុងអក្ខរក្រម ស្រៈអង្គុយលើបន្ទាត់ ក្បែរព្យញ្ជនៈ ដូចជាដៃគូស្មើគ្នា។ ក្នុងអប៊ូហ្គីដាដូចខ្មែរ ព្យញ្ជនៈជាមេ — វាតែងតែអង្គុយនៅកណ្ដាលនៃប្លុករបស់វា — ហើយស្រៈភ្ជាប់ទៅវាពីផ្នែកណាដែលភាសាទាមទារ។ មើលរបៀបដែលព្យញ្ជនៈតែមួយ ក 'k' ប្ដូរអត្ថន័យទាំងស្រុង អាស្រ័យលើកន្លែងណាដែលសញ្ញាស្រៈត្រូវបានដាក់ ៖"
        className="text-sm mb-4"
      />
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {examples.map((ex) => (
          <div
            key={ex.syl}
            className="rounded-2xl border-2 p-3 text-center"
            style={{ borderColor: GOLD, backgroundColor: PARCH }}
          >
            {/* The syllable */}
            <div
              className="font-khmer leading-none mb-1"
              style={{
                color: INK,
                fontSize: "3rem",
              }}
            >
              {ex.syl}
            </div>
            {/* Vowel highlighted */}
            <div className="font-khmer text-[12px] mb-1" style={{ color: GOLD }}>
              ក + <span style={{ color: ROSE, fontWeight: 700, fontSize: "1rem" }}>{ex.vowel}</span>
            </div>
            <div className="font-mono text-[11px]" style={{ color: INK_SOFT }}>
              /{ex.sound}/
            </div>
            <div
              className={`text-[10px] mt-1 ${k ? "font-khmer leading-snug" : ""}`}
              style={{ color: INK_SOFT }}
            >
              {k ? ex.khPos : ex.enPos}
            </div>
          </div>
        ))}
      </div>
      <div className={`mt-4 text-center text-[12px] italic ${k ? "font-khmer" : ""}`} style={{ color: SEPIA }}>
        {k
          ? "ហេតុនេះហើយ អក្ខរក្រមខ្មែរត្រូវការអក្សរ ៧៤ ៖ ៣៣ ព្យញ្ជនៈ + ២៣ ស្រៈ + ១៨ ស្រៈឯករាជ្យ — វែងបំផុតលើពិភពលោក។"
          : "This is why the Khmer alphabet needs 74 letters: 33 consonants + 23 vowels + 18 independent vowels — the longest in the world."}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Diagram · Romance language family tree
// ════════════════════════════════════════════════════════════════════════════

function RomanceTree({ k }: { k: boolean }) {
  const branches = [
    { en: "Spanish",    kh: "អេស្ប៉ាញ",   word: "agua",   x:  40 },
    { en: "French",     kh: "បារាំង",       word: "eau",    x: 110 },
    { en: "Italian",    kh: "អ៊ីតាលី",       word: "acqua",  x: 180 },
    { en: "Portuguese", kh: "ព័រទុយហ្គាល់", word: "água",   x: 250 },
    { en: "Romanian",   kh: "រ៉ូម៉ានី",       word: "apă",    x: 320 },
  ];
  return (
    <div
      className="mt-3 rounded-2xl border-2 p-3"
      style={{ borderColor: FOREST, backgroundColor: PARCH }}
      data-testid="romance-tree"
    >
      <div className={`text-[10px] mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: FOREST }}>
        {k ? "មែកធាងគ្រួសាររ៉ូម៉ាំង · ឧទាហរណ៍ : 'ទឹក'" : "ROMANCE FAMILY TREE · WORD: 'WATER'"}
      </div>
      <svg viewBox="0 0 360 180" className="w-full h-auto" role="img" aria-label={k ? "មែកធាងគ្រួសាររ៉ូម៉ាំង" : "Romance family tree"}>
        {/* Root: Latin */}
        <rect x="140" y="6" width="80" height="26" rx="4" fill={SEPIA} />
        <text x="180" y="22" textAnchor="middle" fontSize="11" fill={PARCH} fontFamily="Georgia, serif" fontWeight="bold">
          {k ? "ឡាតាំង" : "LATIN"}
        </text>
        <text x="180" y="44" textAnchor="middle" fontSize="9" fill={SEPIA} fontFamily="monospace">aqua</text>

        {/* Branch lines */}
        {branches.map((b) => (
          <g key={b.en}>
            <line x1="180" y1="48" x2={b.x + 30} y2="100" stroke={FOREST} strokeWidth="1" />
          </g>
        ))}

        {/* Daughter language boxes */}
        {branches.map((b) => (
          <g key={`b-${b.en}`}>
            <rect x={b.x} y="100" width="60" height="50" rx="4" fill={`${FOREST}22`} stroke={FOREST} strokeWidth="1" />
            <text
              x={b.x + 30}
              y="116"
              textAnchor="middle"
              fontSize="9"
              fill={INK}
              fontFamily={k ? "Hanuman, serif" : "Georgia, serif"}
              fontWeight="bold"
            >
              {k ? b.kh : b.en}
            </text>
            <text x={b.x + 30} y="135" textAnchor="middle" fontSize="11" fill={FOREST} fontFamily="monospace">
              {b.word}
            </text>
          </g>
        ))}

        {/* Caption */}
        <text x="180" y="172" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "Georgia, serif"} fontStyle="italic">
          {k ? "ម្ដាយតែមួយ · កូនស្រីប្រាំ · គ្រប់គ្នានៅតែស្រដៀង" : "one mother · five daughters · still recognisably alike"}
        </text>
      </svg>
    </div>
  );
}

