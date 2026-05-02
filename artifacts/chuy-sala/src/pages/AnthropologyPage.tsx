import { Link } from "wouter";
import {
  ArrowLeft,
  Bone,
  BookOpen,
  Brain,
  Compass,
  Globe,
  Languages as LanguagesIcon,
  Lightbulb,
  Mountain,
  Quote,
  ScrollText,
  Sparkles,
  Users,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  ANTH-01 · Anthropology: The Human Story
//             នរវិទ្យា៖ រឿងរ៉ាវរបស់មនុស្សជាតិ
//
//  1. What is Anthropology?            · The four-field science of being human
//  2. Pioneers of the Human Mind       · Boas, Mead, Ibn Khaldun
//  3. The Ultimate Conclusion          · Culture & Environment thesis
//
//  Aesthetic: grounded academic — terracotta, sand, deep forest green,
//             ink-on-paper typography, dashed earth-tone rules.
// ════════════════════════════════════════════════════════════════════════════

const PAPER       = "#fbf7f0";   // warm sand paper
const PAPER_2     = "#f5efe4";
const INK         = "#1c1917";
const INK_SOFT    = "#44403c";
const RULE        = "#d6cfc2";
const RULE_SOFT   = "#e8e2d3";

const TERRA       = "#c2410c";   // terracotta
const TERRA_SOFT  = "#fed7aa";
const TERRA_DEEP  = "#7c2d12";

const FOREST      = "#166534";   // deep forest green
const FOREST_SOFT = "#dcfce7";
const FOREST_DEEP = "#14532d";

const CLAY        = "#a16207";   // earthy gold
const CLAY_SOFT   = "#fef3c7";

const STONE       = "#57534e";

const FRAME: React.CSSProperties = {
  backgroundColor: PAPER,
  backgroundImage:
    `radial-gradient(circle at 12% 0%, ${TERRA}14, transparent 45%),` +
    `radial-gradient(circle at 100% 100%, ${FOREST}10, transparent 50%)`,
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

// ─── Pioneer card ──────────────────────────────────────────────────────────

function PioneerCard({
  k,
  Icon,
  enName,
  khName,
  enTitle,
  khTitle,
  enYears,
  khYears,
  enBody,
  khBody,
  accent,
  badgeEn,
  badgeKh,
  testId,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enName: string;
  khName: string;
  enTitle: string;
  khTitle: string;
  enYears: string;
  khYears: string;
  enBody: string;
  khBody: string;
  accent: string;
  badgeEn: string;
  badgeKh: string;
  testId: string;
}) {
  return (
    <div
      className="relative rounded-3xl p-5 sm:p-6 border-2 overflow-hidden flex flex-col h-full"
      style={{
        backgroundColor: "#ffffff",
        borderColor: `${accent}55`,
        boxShadow: `0 1px 0 ${accent}11, 0 12px 30px -22px ${accent}55`,
      }}
      data-testid={testId}
    >
      {/* paper grid background hint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            `linear-gradient(${RULE_SOFT} 1px, transparent 1px),` +
            `linear-gradient(90deg, ${RULE_SOFT} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(180deg, white, transparent 55%)",
          WebkitMaskImage: "linear-gradient(180deg, white, transparent 55%)",
        }}
      />

      {/* Header: avatar + name + era badge */}
      <div className="relative flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${accent}1f`, border: `1px solid ${accent}55` }}
        >
          <Icon className="w-7 h-7" style={{ color: accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`}
            style={{ color: INK }}
          >
            {k ? khName : enName}
          </h3>
          <div
            className={`text-[12px] mt-0.5 ${k ? "font-khmer" : ""}`}
            style={{ color: accent }}
          >
            {k ? khTitle : enTitle}
          </div>
          <div
            className={`text-[11px] mt-0.5 ${k ? "font-khmer" : "font-mono tracking-widest uppercase"}`}
            style={{ color: STONE }}
          >
            {k ? khYears : enYears}
          </div>
        </div>
      </div>

      {/* Era / contribution badge */}
      <span
        className={`relative self-start mb-3 text-[10px] px-2 py-1 rounded-full text-white ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
        style={{ backgroundColor: accent }}
      >
        {k ? badgeKh : badgeEn}
      </span>

      {/* Body */}
      <p
        className={`relative text-sm sm:text-[15px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: INK_SOFT }}
      >
        {k ? khBody : enBody}
      </p>
    </div>
  );
}

// ─── Pillar (the four fields) ──────────────────────────────────────────────

function Pillar({
  k,
  Icon,
  enLabel,
  khLabel,
  enHint,
  khHint,
  accent,
}: {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enLabel: string;
  khLabel: string;
  enHint: string;
  khHint: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl p-3.5 border flex items-start gap-3"
      style={{
        backgroundColor: "#ffffff",
        borderColor: `${accent}55`,
      }}
    >
      <div
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${accent}1f`, border: `1px solid ${accent}55` }}
      >
        <Icon className="w-4 h-4" style={{ color: accent }} />
      </div>
      <div className="min-w-0">
        <div
          className={`font-bold text-[13px] sm:text-sm leading-tight ${k ? "font-khmer" : ""}`}
          style={{ color: INK }}
        >
          {k ? khLabel : enLabel}
        </div>
        <div
          className={`text-[11px] sm:text-xs mt-0.5 ${k ? "font-khmer leading-relaxed" : "leading-snug"}`}
          style={{ color: INK_SOFT }}
        >
          {k ? khHint : enHint}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function AnthropologyPage() {
  const language = useLanguageStore((s) => s.language);
  const k = language === "kh";
  const T: T = (en, kh) => (k ? kh : en);

  return (
    <div className="min-h-screen pt-8 sm:pt-12 pb-20 px-4 sm:px-6" style={FRAME}>
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/study-center/sociology"
          className={`inline-flex items-center gap-1.5 text-sm mb-6 hover:underline ${k ? "font-khmer" : ""}`}
          style={{ color: TERRA_DEEP }}
          data-testid="anthropology-back-link"
        >
          <ArrowLeft className="w-4 h-4" />
          {T("Back to Study Center", "ត្រឡប់ទៅមជ្ឈមណ្ឌលសិក្សា")}
        </Link>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-md px-2.5 py-1 text-white"
              style={{ backgroundColor: TERRA }}
            >
              ANTH-01
            </span>
            <span
              className={`text-[11px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
              style={{ color: STONE }}
            >
              {T("Study Center · Humanities", "មជ្ឈមណ្ឌលសិក្សា · មនុស្សសាស្ត្រ")}
            </span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-2 ${k ? "font-khmer leading-snug" : ""}`}
            style={{ color: INK }}
            data-testid="anthropology-title"
          >
            {T("Anthropology", "នរវិទ្យា")}
          </h1>
          <h2
            className={`text-xl sm:text-2xl font-semibold mb-4 ${k ? "font-khmer leading-snug" : ""}`}
            style={{ color: TERRA_DEEP }}
          >
            {T("The Human Story", "រឿងរ៉ាវរបស់មនុស្សជាតិ")}
          </h2>
          <p
            className={`text-base sm:text-lg max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {T(
              "How did we get here, and why are we so different from one village to the next? Anthropology is the science that follows that question across every culture, every century, and every continent.",
              "តើយើងមកដល់ទីនេះដោយរបៀបណា ហើយហេតុអ្វីយើងខុសគ្នាខ្លាំងពីភូមិមួយទៅភូមិមួយ? នរវិទ្យាគឺជាវិទ្យាសាស្ត្រដែលតាមដានសំណួរនេះឆ្លងគ្រប់វប្បធម៌ គ្រប់សតវត្សរ៍ និងគ្រប់ទ្វីប។",
            )}
          </p>
        </header>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 1 · WHAT IS ANTHROPOLOGY?
        ════════════════════════════════════════════════════════════════ */}
        <section id="what-is-anthropology" className="scroll-mt-24 mb-14">
          <SectionHeader
            spec="01"
            en="What is Anthropology?"
            kh="តើនរវិទ្យាជាអ្វី?"
            k={k}
            Icon={Globe}
            accent={TERRA}
          />

          <div
            className="rounded-3xl p-5 sm:p-7 border-2 mb-5"
            style={{
              backgroundColor: "#ffffff",
              borderColor: `${TERRA}33`,
              boxShadow: `0 12px 30px -22px ${TERRA}55`,
            }}
          >
            <p
              className={`text-base sm:text-lg ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK }}
            >
              <span className="font-bold" style={{ color: TERRA_DEEP }}>
                {T("Anthropology is the study of what makes us human.", "នរវិទ្យាគឺជាការសិក្សាអំពីអ្វីដែលធ្វើឱ្យយើងជាមនុស្ស។")}
              </span>{" "}
              {T(
                "It explores our past, our biology, our languages, and most importantly, our complex societies — the way millions of people, born thousands of kilometres apart, end up living, eating, marrying, and worshipping in beautifully different ways.",
                "វាស្វែងយល់ពីអតីតកាល ជីវវិទ្យា ភាសា និងសំខាន់បំផុតគឺសង្គមស្មុគស្មាញរបស់យើង — របៀបដែលមនុស្សរាប់លាននាក់ ដែលកើតនៅឆ្ងាយគ្នារាប់ពាន់គីឡូម៉ែត្រ បានបញ្ចប់ការរស់នៅ បរិភោគ រៀបការ និងគោរពបូជាតាមរបៀបខុសគ្នាយ៉ាងស្រស់ស្អាត។",
              )}
            </p>

            {/* Four pillars */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Pillar
                k={k}
                Icon={Bone}
                enLabel="Archaeology — Our Past"
                khLabel="បុរាណវិទ្យា — អតីតកាលរបស់យើង"
                enHint="Stone tools, pottery shards, lost cities."
                khHint="ឧបករណ៍ថ្ម កំទេចភាជន៍ ទីក្រុងបាត់បង់។"
                accent={CLAY}
              />
              <Pillar
                k={k}
                Icon={Sparkles}
                enLabel="Biological — Our Body"
                khLabel="ជីវវិទ្យា — រាងកាយរបស់យើង"
                enHint="Evolution, genetics, why we walk on two feet."
                khHint="វិវត្តន៍ ហ្សែនវិទ្យា ហេតុអ្វីយើងដើរលើជើងពីរ។"
                accent={FOREST}
              />
              <Pillar
                k={k}
                Icon={LanguagesIcon}
                enLabel="Linguistic — Our Words"
                khLabel="ភាសាវិទ្យា — ពាក្យរបស់យើង"
                enHint="How language shapes thought, and 7,000+ living tongues."
                khHint="របៀបដែលភាសាបង្កើតគំនិត និងភាសារស់ជាង ៧,០០០។"
                accent={TERRA}
              />
              <Pillar
                k={k}
                Icon={Users}
                enLabel="Cultural — Our Societies"
                khLabel="វប្បធម៌ — សង្គមរបស់យើង"
                enHint="Customs, beliefs, family, ritual — the rules we live by."
                khHint="ទំនៀមទម្លាប់ ជំនឿ គ្រួសារ ពិធីបុណ្យ — ច្បាប់ដែលយើងរស់តាម។"
                accent={TERRA_DEEP}
              />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 2 · PIONEERS OF THE HUMAN MIND
        ════════════════════════════════════════════════════════════════ */}
        <section id="pioneers" className="scroll-mt-24 mb-14">
          <SectionHeader
            spec="02"
            en="The Pioneers of the Human Mind"
            kh="អ្នកត្រួសត្រាយផ្លូវនៃគំនិតមនុស្ស"
            k={k}
            Icon={Users}
            accent={FOREST}
          />

          <p
            className={`text-sm sm:text-base mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {T(
              "Three thinkers — separated by centuries and oceans — each smashed a comfortable belief about who we are.",
              "អ្នកគិតបីនាក់ — បំបែកគ្នាដោយសតវត្សរ៍ និងមហាសមុទ្រ — ម្នាក់ៗបានបំបែកជំនឿមួយដ៏ស្រួលអំពីខ្លួនយើង។",
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PioneerCard
              k={k}
              Icon={BookOpen}
              enName="Franz Boas"
              khName="ហ្វ្រេន បូអាស៊ី"
              enTitle="Father of Modern Anthropology"
              khTitle="បិតានៃនរវិទ្យាសម័យទំនើប"
              enYears="1858 – 1942 · Germany / USA"
              khYears="១៨៥៨ – ១៩៤២ · អាល្លឺម៉ង់ / សហរដ្ឋអាមេរិក"
              badgeEn="Culture Over Race"
              badgeKh="វប្បធម៌លើសពូជសាសន៍"
              enBody="Boas proved that human behavior is not determined by biology or race, but by social learning and culture. By measuring thousands of skulls of immigrant families, he showed that 'racial' traits change in a single generation when the environment changes — destroying the 19th-century myth that some peoples were biologically 'more advanced' than others."
              khBody="លោកបូអាស៊ីបានបង្ហាញថា អាកប្បកិរិយារបស់មនុស្ស មិនត្រូវបានកំណត់ដោយជីវវិទ្យា ឬពូជសាសន៍ទេ ប៉ុន្តែដោយការរៀនសូត្រសង្គម និងវប្បធម៌។ ដោយវាស់លលាដ៍ក្បាលរាប់ពាន់របស់គ្រួសារជនអន្តោប្រវេសន៍ លោកបានបង្ហាញថាលក្ខណៈ «ពូជសាសន៍» ផ្លាស់ប្តូរក្នុងតែមួយជំនាន់នៅពេលបរិយាកាសផ្លាស់ប្តូរ — បំបែកមិត្តនិទាននៃសតវត្សរ៍ទី ១៩ ដែលថាប្រជាជនខ្លះ «រីកចម្រើនជាង» គេតាមជីវវិទ្យា។"
              accent={TERRA}
              testId="pioneer-boas"
            />

            <PioneerCard
              k={k}
              Icon={Compass}
              enName="Margaret Mead"
              khName="ម៉ាហ្គារ៉េត មីដ"
              enTitle="The Field-Worker of the Pacific"
              khTitle="អ្នកស្រាវជ្រាវវាលនៃប៉ាស៊ីហ្វិក"
              enYears="1901 – 1978 · USA / Samoa & New Guinea"
              khYears="១៩០១ – ១៩៧៨ · សហរដ្ឋអាមេរិក / សាម័រ និងហ្គីណេថ្មី"
              badgeEn="Nurture Beats Nature"
              badgeKh="ការចិញ្ចឹមឈ្នះធម្មជាតិ"
              enBody="Mead lived for years among Pacific Island peoples and showed that things we think are 'natural' human behaviors — gender roles, teenage rebellion, anger, jealousy — change entirely depending on the culture you are raised in. In Samoa, teenagers had no 'rebellious phase' at all. The lesson: very little of who we are is fixed at birth."
              khBody="លោកស្រីមីដបានរស់នៅជាច្រើនឆ្នាំក្នុងចំណោមប្រជាជនកោះប៉ាស៊ីហ្វិក ហើយបានបង្ហាញថា អ្វីដែលយើងគិតថាជាអាកប្បកិរិយា «ធម្មជាតិ» របស់មនុស្ស — តួនាទីភេទ ការបះបោរវ័យជំទង់ កំហឹង ការច្រណែន — ផ្លាស់ប្តូរទាំងស្រុងអាស្រ័យលើវប្បធម៌ដែលអ្នកត្រូវបានចិញ្ចឹមនៅ។ នៅសាម័រ វ័យជំទង់គ្មាន «ដំណាក់កាលបះបោរ» ទាល់តែសោះ។ មេរៀន ៖ មានតិចតួចបំផុតនៃអ្វីដែលយើងជា ត្រូវបានកំណត់ពីកំណើត។"
              accent={FOREST}
              testId="pioneer-mead"
            />

            <PioneerCard
              k={k}
              Icon={Mountain}
              enName="Ibn Khaldun"
              khName="អ៊ីប៊ុន ខាល់ឌូន"
              enTitle="The 14th-Century Trail-Blazer"
              khTitle="អ្នកត្រួសត្រាយផ្លូវនៃសតវត្សរ៍ទី ១៤"
              enYears="1332 – 1406 · Tunisia / North Africa"
              khYears="១៣៣២ – ១៤០៦ · ទុយណេស៊ី / អាហ្វ្រិកខាងជើង"
              badgeEn="Environment Shapes Mind"
              badgeKh="បរិស្ថានបង្កើតគំនិត"
              enBody="Six hundred years before the word 'anthropology' even existed, Ibn Khaldun studied how the environment — desert versus city — fundamentally changed the psychology and social structure of different civilizations. His Muqaddimah argued that nomads were tough and loyal because the desert demanded it, while city-dwellers grew rich, soft, and divided. Today's social science begins with him."
              khBody="ប្រាំមួយរយឆ្នាំមុនពេលដែលពាក្យ «នរវិទ្យា» មាន លោកអ៊ីប៊ុន ខាល់ឌូន បានសិក្សារបៀបដែលបរិស្ថាន — វាលខ្សាច់ ទល់នឹងទីក្រុង — បានផ្លាស់ប្តូរយ៉ាងជ្រៅជ្រះនូវផ្លូវចិត្ត និងរចនាសម្ព័ន្ធសង្គមនៃអរិយធម៌ផ្សេងៗ។ សៀវភៅ Muqaddimah របស់គាត់បានអះអាងថា អ្នកនាំសត្វស៊ីស្មៅរឹងមាំ និងស្មោះត្រង់ ដោយសារវាលខ្សាច់ទាមទារដូច្នេះ ខណៈពេលដែលអ្នករស់នៅទីក្រុងក្លាយជាអ្នកមាន ទន់ និងបែកបាក់។ វិទ្យាសាស្ត្រសង្គមសព្វថ្ងៃចាប់ផ្ដើមជាមួយគាត់។"
              accent={CLAY}
              testId="pioneer-khaldun"
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 3 · THE ULTIMATE CONCLUSION
        ════════════════════════════════════════════════════════════════ */}
        <section id="ultimate-conclusion" className="scroll-mt-24 mb-14">
          <SectionHeader
            spec="03"
            en="The Ultimate Conclusion"
            kh="សេចក្តីសន្និដ្ឋានចុងក្រោយ"
            k={k}
            Icon={Lightbulb}
            accent={FOREST_DEEP}
          />

          {/* Highlighted thesis block */}
          <div
            className="relative rounded-3xl p-6 sm:p-8 mb-5 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${FOREST_DEEP} 0%, ${FOREST} 50%, ${TERRA_DEEP} 100%)`,
              boxShadow: `0 20px 50px -28px ${FOREST_DEEP}cc`,
            }}
            data-testid="anthropology-thesis"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  `radial-gradient(circle at 12% 12%, #ffffff44, transparent 35%),` +
                  `radial-gradient(circle at 88% 88%, #ffffff22, transparent 40%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Quote className="w-5 h-5" style={{ color: TERRA_SOFT }} />
                <span
                  className={`text-[10px] tracking-[0.25em] uppercase ${k ? "font-khmer normal-case tracking-normal text-xs" : "font-mono"}`}
                  style={{ color: TERRA_SOFT }}
                >
                  {T("Core Thesis of Modern Anthropology", "ទ្រឹស្តីសំខាន់នៃនរវិទ្យាសម័យទំនើប")}
                </span>
              </div>
              <p
                className={`font-extrabold text-xl sm:text-2xl lg:text-3xl text-white leading-tight mb-3 ${k ? "font-khmer leading-snug" : ""}`}
              >
                {T(
                  "Culture and Environment are the Ultimate Determinants of Macro-Human Behavior.",
                  "វប្បធម៌ និងបរិស្ថាន គឺជាកត្តាកំណត់ចម្បងនៃអាកប្បកិរិយារបស់មនុស្សទូទៅ។",
                )}
              </p>
              {/* Bilingual mirror line */}
              <p
                className={`text-sm sm:text-base text-white/85 ${!k ? "font-khmer leading-snug" : "italic"}`}
              >
                {!k
                  ? "វប្បធម៌ និងបរិស្ថាន គឺជាកត្តាកំណត់ចម្បងនៃអាកប្បកិរិយារបស់មនុស្សទូទៅ។"
                  : "Culture and Environment are the Ultimate Determinants of Macro-Human Behavior."}
              </p>
            </div>
          </div>

          {/* Explanation card */}
          <div
            className="rounded-3xl p-5 sm:p-7 border-2"
            style={{
              backgroundColor: "#ffffff",
              borderColor: `${FOREST}55`,
            }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${FOREST}1f`, border: `1px solid ${FOREST}55` }}
              >
                <Brain className="w-5 h-5" style={{ color: FOREST_DEEP }} />
              </div>
              <div className="min-w-0">
                <h3
                  className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`}
                  style={{ color: INK }}
                >
                  {T("Our Only Real Instinct is to Adapt", "សញ្ជាតញ្ញាណពិតមួយគត់របស់យើងគឺការសម្របខ្លួន")}
                </h3>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK_SOFT }}
            >
              {T(
                "Humans do not have strong, fixed instincts like other animals. A spider knows how to weave its web on the day it hatches; a baby human knows almost nothing.",
                "មនុស្សមិនមានសញ្ជាតញ្ញាណរឹងមាំ និងថេរដូចសត្វផ្សេងទៀតទេ។ ពីងពាងចេះត្បាញសំណាញ់របស់វានៅថ្ងៃដែលវាញាស់; ទារកមនុស្សស្ទើរតែមិនចេះអ្វីសោះ។",
              )}
            </p>

            <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div
                className="rounded-2xl p-3.5 border"
                style={{ backgroundColor: PAPER_2, borderColor: RULE }}
              >
                <div
                  className={`font-bold text-sm mb-1 ${k ? "font-khmer" : ""}`}
                  style={{ color: TERRA_DEEP }}
                >
                  {T("1. Environment", "១. បរិស្ថាន")}
                </div>
                <div
                  className={`text-xs sm:text-sm ${k ? "font-khmer leading-relaxed" : "leading-snug"}`}
                  style={{ color: INK_SOFT }}
                >
                  {T(
                    "Where you live dictates the problems you must solve — desert thirst, monsoon flood, mountain cold.",
                    "កន្លែងដែលអ្នករស់នៅ កំណត់បញ្ហាដែលអ្នកត្រូវដោះស្រាយ — ភាពស្រេកទឹកវាលខ្សាច់ ទឹកជំនន់រដូវវស្សា ភាពត្រជាក់ភ្នំ។",
                  )}
                </div>
              </div>

              <div
                className="rounded-2xl p-3.5 border"
                style={{ backgroundColor: PAPER_2, borderColor: RULE }}
              >
                <div
                  className={`font-bold text-sm mb-1 ${k ? "font-khmer" : ""}`}
                  style={{ color: CLAY }}
                >
                  {T("2. Culture", "២. វប្បធម៌")}
                </div>
                <div
                  className={`text-xs sm:text-sm ${k ? "font-khmer leading-relaxed" : "leading-snug"}`}
                  style={{ color: INK_SOFT }}
                >
                  {T(
                    "The toolkit we invent to survive — language, farming, religion, marriage rules, recipes, songs.",
                    "ឧបករណ៍ដែលយើងបង្កើតដើម្បីរស់រាន — ភាសា កសិកម្ម សាសនា ច្បាប់រៀបការ ម្ហូប បទចម្រៀង។",
                  )}
                </div>
              </div>

              <div
                className="rounded-2xl p-3.5 border"
                style={{ backgroundColor: PAPER_2, borderColor: RULE }}
              >
                <div
                  className={`font-bold text-sm mb-1 ${k ? "font-khmer" : ""}`}
                  style={{ color: FOREST_DEEP }}
                >
                  {T("3. Behavior", "៣. អាកប្បកិរិយា")}
                </div>
                <div
                  className={`text-xs sm:text-sm ${k ? "font-khmer leading-relaxed" : "leading-snug"}`}
                  style={{ color: INK_SOFT }}
                >
                  {T(
                    "How a whole society acts — gentle or fierce, communal or competitive — is the result, not the cause.",
                    "របៀបដែលសង្គមទាំងមូលប្រព្រឹត្ត — សុភាព ឬកាចសាហាវ រួមរស់ ឬប្រកួតប្រជែង — គឺជាលទ្ធផល មិនមែនជាមូលហេតុ។",
                  )}
                </div>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK }}
            >
              <span className="font-bold" style={{ color: FOREST_DEEP }}>
                {T("In short:", "សរុបមក ៖")}{" "}
              </span>
              {T(
                "large-scale human behavior is shaped by where we live and what we are taught — not by biology. Change the environment or the lessons, and the next generation will think, work, and love in new ways.",
                "អាកប្បកិរិយារបស់មនុស្សទ្រង់ទ្រាយធំ ត្រូវបានបង្កើតដោយកន្លែងដែលយើងរស់នៅ និងអ្វីដែលយើងបានរៀន — មិនមែនដោយជីវវិទ្យាទេ។ ផ្លាស់ប្តូរបរិស្ថាន ឬមេរៀន នោះជំនាន់បន្ទាប់នឹងគិត ធ្វើការ និងស្រឡាញ់តាមរបៀបថ្មី។",
              )}
            </p>
          </div>
        </section>

        {/* ── Footer / cross-links ──────────────────────────────────── */}
        <div
          className="rounded-2xl p-4 sm:p-5 border flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
          style={{
            backgroundColor: CLAY_SOFT,
            borderColor: `${CLAY}55`,
          }}
        >
          <ScrollText className="w-6 h-6 flex-shrink-0" style={{ color: TERRA_DEEP }} />
          <p
            className={`text-xs sm:text-sm flex-1 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {T(
              "Keep going: see how a single society's rules become a whole science in",
              "បន្តទៅទៀត ៖ មើលរបៀបដែលច្បាប់របស់សង្គមមួយក្លាយជាវិទ្យាសាស្ត្រទាំងមូលនៅក្នុង",
            )}{" "}
            <Link
              href="/study-center/sociology"
              className="font-bold underline"
              style={{ color: TERRA_DEEP }}
            >
              {T("Sociology", "សង្គមវិទ្យា")}
            </Link>
            {", "}
            <Link
              href="/study-center/behaviorism"
              className="font-bold underline"
              style={{ color: TERRA_DEEP }}
            >
              {T("Behaviorism", "អាកប្បកិរិយាវិទ្យា")}
            </Link>
            {", "}{T("and", "និង")}{" "}
            <Link
              href="/study-center/linguistics"
              className="font-bold underline"
              style={{ color: TERRA_DEEP }}
            >
              {T("Linguistics", "ភាសាវិទ្យា")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnthropologyPage;
