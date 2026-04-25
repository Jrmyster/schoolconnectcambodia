import {
  Sprout,
  HeartHandshake,
  Heart,
  ScrollText,
  Hand,
  Baby,
  Stethoscope,
  Activity,
  Calendar,
  Footprints,
  MessageCircle,
  Smile,
  AlertTriangle,
  Users,
  ShieldCheck,
  Sun,
  Sparkles,
  Leaf,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Family & Development: From Seed to Society
//  គ្រួសារ និងការលូតលាស់៖ ពីគ្រាប់ពូជទៅសង្គម
//
//  A bilingual EN/KH module under /well-being/family-development. Three
//  comprehensive cards walk a family through:
//
//    1. The Three Parenting Styles (Diana Baumrind) — comparison grid
//    2. The Journey of Pregnancy — detection, trimesters, labor
//    3. Baby & Toddler Milestones — physical, language, neurodiversity
//
//  Aesthetic: soft creams, terracotta oranges, organic leaf greens.
//  No graphic medical imagery; tone is warm, nurturing, and clinical.
// ════════════════════════════════════════════════════════════════════════════

const CREAM = "#fffbeb";
const CREAM_DEEP = "#fef3c7";
const TERRA = "#c2410c";
const TERRA_SOFT = "#fed7aa";
const TERRA_DEEP = "#9a3412";
const LEAF = "#15803d";
const LEAF_SOFT = "#bbf7d0";
const LEAF_DEEP = "#166534";
const AMBER = "#b45309";
const INK = "#1f2937";
const INK_SOFT = "#374151";

export default function FamilyDevelopmentPage() {
  const { language } = useLanguageStore();
  const k = language === "kh";
  const t = (en: string, kh: string) => (k ? kh : en);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #fffbeb 0%, #fff7ed 40%, #fefce8 100%)",
        color: INK,
      }}
      data-testid="page-family-development"
    >
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-bold tracking-widest uppercase"
          style={{
            backgroundColor: `${LEAF_SOFT}66`,
            border: `1px solid ${LEAF}55`,
            color: LEAF_DEEP,
          }}
        >
          <Sprout className="w-3.5 h-3.5" aria-hidden="true" />
          {t("Well-Being · Parenting & Development", "សុខុមាលភាព · ការចិញ្ចឹមបីបាច់ និងការវិវត្ត")}
        </div>
        <h1
          className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: INK }}
          data-testid="fd-hero-title"
        >
          {k ? (
            <>
              គ្រួសារ និងការលូតលាស់៖
              <br />
              <span style={{ color: TERRA }}>ពីគ្រាប់ពូជទៅសង្គម</span>
            </>
          ) : (
            <>
              Family & Development:
              <br />
              <span style={{ color: TERRA }}>From Seed to Society</span>
            </>
          )}
        </h1>
        <p
          className={`max-w-2xl mx-auto text-base sm:text-lg ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: INK_SOFT }}
        >
          {t(
            "Every adult was once a seed. How a family welcomes a baby into the world, and how they raise that baby into a child — these are some of the most consequential acts in any society. This module walks gently through three of them: how parents shape character, how a pregnancy unfolds, and what to watch for as a tiny child becomes a person.",
            "មនុស្សពេញវ័យគ្រប់រូប ធ្លាប់ជាគ្រាប់ពូជមួយកាលពីដើម។ របៀបដែលគ្រួសារទទួលស្វាគមន៍ទារកមកក្នុងពិភពលោក និងរបៀបដែលគេចិញ្ចឹមទារកនោះឱ្យក្លាយជាកុមារ — ទាំងនេះគឺជាសកម្មភាពដ៏សំខាន់បំផុតក្នុងសង្គមណាមួយ។ មេរៀននេះដើរតាមដោយថ្នមៗតាមរយៈរឿងបី ៖ របៀបដែលឪពុកម្ដាយរៀបចំចរិតកូន របៀបដែលការមានផ្ទៃពោះវិវឌ្ឍ និងអ្វីដែលត្រូវសង្កេតពេលកុមារតូចមួយក្លាយជាមនុស្ស។"
          )}
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
        <ParentingStylesCard k={k} t={t} />
        <PregnancyJourneyCard k={k} t={t} />
        <MilestonesCard k={k} t={t} />

        {/* Closing strip */}
        <div
          className="mt-2 rounded-2xl border-2 p-5 text-center"
          style={{
            borderColor: `${LEAF}33`,
            backgroundColor: `${LEAF_SOFT}33`,
          }}
        >
          <Leaf
            className="w-7 h-7 mx-auto mb-3"
            style={{ color: LEAF_DEEP }}
            aria-hidden="true"
          />
          <p
            className={`max-w-xl mx-auto text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: LEAF_DEEP }}
          >
            {t(
              "A loving, informed family is the strongest school a child will ever attend. You do not have to know everything — you only have to keep showing up.",
              "គ្រួសារដែលស្រឡាញ់ និងមានចំណេះដឹង គឺជាសាលារៀនខ្លាំងបំផុតដែលកូនម្នាក់នឹងបានចូលរៀន។ អ្នកមិនចាំបាច់ដឹងគ្រប់យ៉ាងទេ — អ្នកគ្រាន់តែបន្តមានវត្តមានជាប់ៗប៉ុណ្ណោះ។"
            )}
          </p>
        </div>
      </main>
    </div>
  );
}

type T = (en: string, kh: string) => string;

// ── Shared card shell ──────────────────────────────────────────────────────

function CardShell({
  k,
  spec,
  icon,
  titleEn,
  titleKh,
  leadEn,
  leadKh,
  accentBg,
  accentBorder,
  accentText,
  testId,
  children,
}: {
  k: boolean;
  spec: string;
  icon: React.ReactNode;
  titleEn: string;
  titleKh: string;
  leadEn: string;
  leadKh: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  testId: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-3xl border-2 bg-white shadow-sm overflow-hidden"
      style={{ borderColor: accentBorder }}
      data-testid={testId}
    >
      {/* Header band */}
      <div
        className="px-5 sm:px-6 py-5"
        style={{ backgroundColor: accentBg }}
      >
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-white"
            style={{ backgroundColor: accentText }}
          >
            {spec}
          </span>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
          >
            <span style={{ color: accentText }} aria-hidden="true">
              {icon}
            </span>
          </div>
        </div>
        <h2
          className={`text-xl sm:text-2xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: accentText }}
        >
          {k ? titleKh : titleEn}
        </h2>
        <p
          className={`mt-2 text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: INK_SOFT }}
        >
          {k ? leadKh : leadEn}
        </p>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

// ── Reusable sub-block (label + body) ──────────────────────────────────────

function SubBlock({
  k,
  labelEn,
  labelKh,
  icon,
  bodyEn,
  bodyKh,
  accent,
  testId,
}: {
  k: boolean;
  labelEn: string;
  labelKh: string;
  icon: React.ReactNode;
  bodyEn: string;
  bodyKh: string;
  accent: string;
  testId?: string;
}) {
  return (
    <div data-testid={testId}>
      <div
        className={`flex items-center gap-1.5 mb-1.5 text-[11px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
        style={{ color: accent }}
      >
        <span aria-hidden="true">{icon}</span>
        <span>{k ? labelKh : labelEn}</span>
      </div>
      <p
        className={`text-sm sm:text-[15px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: INK_SOFT }}
      >
        {k ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 · The Three Parenting Styles (Diana Baumrind)
// ════════════════════════════════════════════════════════════════════════════

function ParentingStylesCard({ k, t }: { k: boolean; t: T }) {
  return (
    <CardShell
      k={k}
      spec="FD-01"
      icon={<HeartHandshake className="w-4 h-4" />}
      titleEn="The Three Parenting Styles"
      titleKh="រចនាប័ទ្មនៃការចិញ្ចឹមបីបាច់ទាំងបី"
      leadEn="In the 1960s, the psychologist Diana Baumrind watched hundreds of families and noticed that parenting tends to fall into three patterns. Each pattern shapes a different kind of adult. None of these are about love — every parent on this page loves their child. They are about how that love is delivered."
      leadKh="ក្នុងទសវត្សរ៍ឆ្នាំ ១៩៦០ អ្នកវិទ្យាសាស្ត្រផ្នែកចិត្តវិទ្យា Diana Baumrind បានសង្កេតគ្រួសាររាប់រយ ហើយបានកត់សម្គាល់ថា ការចិញ្ចឹមកូនច្រើនតែធ្លាក់ចូលក្នុងគំរូបី។ គំរូនីមួយៗរៀបចំមនុស្សពេញវ័យខុសគ្នា។ ទាំងនេះមិនមែននិយាយអំពីសេចក្ដីស្រឡាញ់ទេ — ឪពុកម្ដាយគ្រប់រូបនៅទីនេះស្រឡាញ់កូនរបស់ខ្លួន។ វានិយាយអំពី របៀប ដែលសេចក្ដីស្រឡាញ់នោះត្រូវបានបង្ហាញ។"
      accentBg={CREAM_DEEP}
      accentBorder={`${TERRA}55`}
      accentText={TERRA_DEEP}
      testId="fd-card-parenting-styles"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Authoritative */}
        <StyleTile
          k={k}
          testId="fd-tile-authoritative"
          spec="01"
          icon={<HeartHandshake className="w-4 h-4" aria-hidden="true" />}
          titleEn="Authoritative"
          titleKh="មានតុល្យភាព (Authoritative)"
          tagWarmthEn="High warmth"
          tagWarmthKh="ភាពកក់ក្ដៅខ្ពស់"
          tagRulesEn="Clear rules"
          tagRulesKh="ច្បាប់ច្បាស់លាស់"
          focusEn="The 'why' behind every rule. Listens, explains, then expects."
          focusKh="«ហេតុអ្វី» នៅពីក្រោយច្បាប់នីមួយៗ។ ស្ដាប់ ពន្យល់ បន្ទាប់មករំពឹងការអនុវត្ត។"
          outcomeEn="High self-esteem and independence. Children grow into adults who can both follow good rules and question bad ones."
          outcomeKh="ការគោរពខ្លួនឯងខ្ពស់ និងភាពឯករាជ្យ។ កុមារធំឡើងទៅជាមនុស្សពេញវ័យដែលអាចគោរពច្បាប់ល្អ ហើយក៏ហ៊ានសួរអំពីច្បាប់មិនល្អដែរ។"
          accentBorder={LEAF}
          accentBg={`${LEAF_SOFT}55`}
          accentText={LEAF_DEEP}
          outcomeAccent={LEAF}
        />

        {/* Authoritarian */}
        <StyleTile
          k={k}
          testId="fd-tile-authoritarian"
          spec="02"
          icon={<ScrollText className="w-4 h-4" aria-hidden="true" />}
          titleEn="Authoritarian"
          titleKh="តឹងរ៉ឹងជ្រុល (Authoritarian)"
          tagWarmthEn="Low warmth"
          tagWarmthKh="ភាពកក់ក្ដៅទាប"
          tagRulesEn="Strict rules"
          tagRulesKh="ច្បាប់តឹងរ៉ឹង"
          focusEn="Obedience. 'Because I said so' is the answer. Questions are seen as disrespect."
          focusKh="ការស្ដាប់បង្គាប់។ ចម្លើយគឺ «ព្រោះខ្ញុំបានប្រាប់ហើយ»។ ការសួរសំណួរត្រូវបានចាត់ទុកថាជាការមិនគោរព។"
          outcomeEn="High anxiety, lower social confidence. Children may obey perfectly at home but struggle to make their own decisions later — or rebel hard once free."
          outcomeKh="ការថប់បារម្ភខ្ពស់ ទំនុកចិត្តក្នុងសង្គមទាប។ កុមារអាចស្ដាប់បង្គាប់យ៉ាងល្អនៅផ្ទះ ប៉ុន្តែពិបាកធ្វើការសម្រេចចិត្តដោយខ្លួនឯងពេលធំ — ឬបះបោរយ៉ាងខ្លាំងពេលរួចខ្លួន។"
          accentBorder={TERRA}
          accentBg={`${TERRA_SOFT}55`}
          accentText={TERRA_DEEP}
          outcomeAccent={TERRA}
        />

        {/* Permissive */}
        <StyleTile
          k={k}
          testId="fd-tile-permissive"
          spec="03"
          icon={<Hand className="w-4 h-4" aria-hidden="true" />}
          titleEn="Permissive"
          titleKh="ធូររលុងជ្រុល (Permissive)"
          tagWarmthEn="High warmth"
          tagWarmthKh="ភាពកក់ក្ដៅខ្ពស់"
          tagRulesEn="Few rules"
          tagRulesKh="ច្បាប់តិចតួច"
          focusEn="Acts more like a friend than a parent. Avoids saying 'no'. Wants the child happy in this moment."
          focusKh="ប្រព្រឹត្តដូចជាមិត្តភក្ដិ ច្រើនជាងឪពុកម្ដាយ។ ចៀសវាងនិយាយ «ទេ»។ ចង់ឱ្យកូនសប្បាយចិត្តក្នុងពេលនេះ។"
          outcomeEn="Struggles with self-discipline and authority. Children may be warm and creative, but can have a hard time with school rules, deadlines, and bosses."
          outcomeKh="ពិបាកក្នុងការគ្រប់គ្រងខ្លួនឯង និងការគោរពអាជ្ញាធរ។ កុមារអាចមានភាពកក់ក្ដៅ និងច្នៃប្រឌិត ប៉ុន្តែអាចមានពេលលំបាកជាមួយច្បាប់សាលា ការកំណត់ថ្ងៃ និងថៅកែ។"
          accentBorder={AMBER}
          accentBg="#fef9c333"
          accentText={AMBER}
          outcomeAccent={AMBER}
        />
      </div>

      {/* Footer note */}
      <div
        className="mt-5 rounded-xl border-2 px-4 py-3 flex items-start gap-2"
        style={{ borderColor: `${LEAF}33`, backgroundColor: `${LEAF_SOFT}33` }}
      >
        <Sparkles
          className="w-4 h-4 flex-shrink-0 mt-0.5"
          style={{ color: LEAF_DEEP }}
          aria-hidden="true"
        />
        <p
          className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: LEAF_DEEP }}
        >
          {t(
            "Decades of follow-up research point in the same direction: warmth + clear rules + explanation tends to raise the most resilient adults. The good news? It is a style any parent can practise, one conversation at a time.",
            "ការស្រាវជ្រាវជាច្រើនទសវត្សរ៍ ចង្អុលទៅទិសដូចគ្នា ៖ ភាពកក់ក្ដៅ + ច្បាប់ច្បាស់លាស់ + ការពន្យល់ ច្រើនតែបង្កើតមនុស្សពេញវ័យដែលធន់ខ្លាំងបំផុត។ ដំណឹងល្អ ? វាជារចនាប័ទ្មដែលឪពុកម្ដាយណាក៏អាចអនុវត្តបាន ម្ដងមួយការសន្ទនា។"
          )}
        </p>
      </div>
    </CardShell>
  );
}

function StyleTile({
  k,
  testId,
  spec,
  icon,
  titleEn,
  titleKh,
  tagWarmthEn,
  tagWarmthKh,
  tagRulesEn,
  tagRulesKh,
  focusEn,
  focusKh,
  outcomeEn,
  outcomeKh,
  accentBorder,
  accentBg,
  accentText,
  outcomeAccent,
}: {
  k: boolean;
  testId: string;
  spec: string;
  icon: React.ReactNode;
  titleEn: string;
  titleKh: string;
  tagWarmthEn: string;
  tagWarmthKh: string;
  tagRulesEn: string;
  tagRulesKh: string;
  focusEn: string;
  focusKh: string;
  outcomeEn: string;
  outcomeKh: string;
  accentBorder: string;
  accentBg: string;
  accentText: string;
  outcomeAccent: string;
}) {
  return (
    <div
      className="rounded-2xl border-2 p-4 flex flex-col bg-white"
      style={{ borderColor: `${accentBorder}66` }}
      data-testid={testId}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: accentBg, color: accentText }}
        >
          {icon}
        </div>
        <span
          className="text-[10px] font-mono font-bold tracking-widest uppercase"
          style={{ color: accentText }}
        >
          {spec}
        </span>
      </div>
      <h3
        className={`text-base sm:text-lg font-extrabold leading-tight mb-2 ${k ? "font-khmer leading-loose" : ""}`}
        style={{ color: accentText }}
      >
        {k ? titleKh : titleEn}
      </h3>
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${k ? "font-khmer text-[11px]" : ""}`}
          style={{ backgroundColor: accentBg, color: accentText }}
        >
          <Heart className="w-3 h-3" aria-hidden="true" />
          {k ? tagWarmthKh : tagWarmthEn}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${k ? "font-khmer text-[11px]" : ""}`}
          style={{ backgroundColor: accentBg, color: accentText }}
        >
          <ShieldCheck className="w-3 h-3" aria-hidden="true" />
          {k ? tagRulesKh : tagRulesEn}
        </span>
      </div>
      <div className="space-y-3 flex-1">
        <div>
          <div
            className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1 ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            style={{ color: INK }}
          >
            {k ? "ចំណុចផ្ដោត" : "Focus"}
          </div>
          <p
            className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {k ? focusKh : focusEn}
          </p>
        </div>
        <div
          className="rounded-lg px-3 py-2"
          style={{ backgroundColor: accentBg }}
        >
          <div
            className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1 ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            style={{ color: outcomeAccent }}
          >
            {k ? "លទ្ធផល" : "Outcome"}
          </div>
          <p
            className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {k ? outcomeKh : outcomeEn}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 · The Journey of Pregnancy
// ════════════════════════════════════════════════════════════════════════════

function PregnancyJourneyCard({ k, t }: { k: boolean; t: T }) {
  return (
    <CardShell
      k={k}
      spec="FD-02"
      icon={<Baby className="w-4 h-4" />}
      titleEn="The Journey of Pregnancy"
      titleKh="ដំណើរនៃការមានផ្ទៃពោះ"
      leadEn="From the moment a single cell starts dividing inside the womb, the body begins one of biology's most coordinated nine-month projects. Here is what happens — and how a family can travel through it together."
      leadKh="ចាប់ពីពេលដែលកោសិកាតែមួយចាប់ផ្ដើមបែងចែកនៅក្នុងស្បូន រាងកាយចាប់ផ្ដើមគម្រោងប្រាំបួនខែដែលមានការសម្របសម្រួលច្រើនបំផុតមួយក្នុងជីវវិទ្យា។ នេះគឺជាអ្វីដែលកើតឡើង — និងរបៀបដែលគ្រួសារអាចធ្វើដំណើរឆ្លងកាត់វាជាមួយគ្នា។"
      accentBg="#fff7ed"
      accentBorder={`${TERRA}55`}
      accentText={TERRA_DEEP}
      testId="fd-card-pregnancy"
    >
      <div className="space-y-6">
        {/* A. Detection */}
        <SubBlock
          k={k}
          testId="fd-pregnancy-detection"
          labelEn="Detection · The HCG Signal"
          labelKh="ការរកឃើញ · សញ្ញា HCG"
          icon={<Stethoscope className="w-3.5 h-3.5" />}
          bodyEn="Within days of conception, the early embryo starts releasing a hormone called HCG (human chorionic gonadotropin). HCG is the chemical that home pregnancy tests look for in urine — a single line means no, two lines means HCG is present. The body itself sends quieter signals too: a missed period, morning nausea, a strange tiredness, sore breasts. Most women notice these signs in the first few weeks and confirm with a clinic blood test."
          bodyKh="ក្នុងរយៈពេលប៉ុន្មានថ្ងៃបន្ទាប់ពីការបង្កកំណើត គភ៌ដំបូងចាប់ផ្ដើមបញ្ចេញអរម៉ូនមួយហៅថា HCG (Human Chorionic Gonadotropin)។ HCG គឺជាសារធាតុគីមីដែលឧបករណ៍ធ្វើតេស្តផ្ទៃពោះតាមផ្ទះស្វែងរកក្នុងទឹកនោម — បន្ទាត់មួយមានន័យថា ទេ បន្ទាត់ពីរមានន័យថា មាន HCG។ រាងកាយខ្លួនឯងក៏បញ្ជូនសញ្ញាស្ងាត់ៗដែរ ៖ ការខានរដូវ ការចង់ក្អួតពេលព្រឹក ការនឿយហត់ចម្លែក ដោះឈឺ។ ស្ត្រីភាគច្រើនកត់សម្គាល់សញ្ញាទាំងនេះក្នុងសប្ដាហ៍ដំបូង ហើយបញ្ជាក់ដោយការធ្វើតេស្តឈាមនៅគ្លីនិក។"
          accent={TERRA}
        />

        {/* B. Trimesters */}
        <div data-testid="fd-pregnancy-trimesters">
          <div
            className={`flex items-center gap-1.5 mb-2 text-[11px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            style={{ color: TERRA }}
          >
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{k ? "ត្រីមាសទាំងបី" : "The Three Trimesters"}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <TrimesterTile
              k={k}
              testId="fd-trimester-1"
              numEn="1st Trimester"
              numKh="ត្រីមាសទី ១"
              weeksEn="Weeks 1–13"
              weeksKh="សប្ដាហ៍ទី ១–១៣"
              titleEn="Critical Organ Formation"
              titleKh="ការបង្កើតសរីរាង្គសំខាន់"
              bodyEn="The most important — and most fragile — stage. The embryo's heart starts beating around week 6, and by week 13 the brain, spine, eyes, kidneys, and tiny limbs are all in place. This is also when nausea and exhaustion are usually strongest. Avoid alcohol, smoke, and unsafe medication."
              bodyKh="ដំណាក់កាលសំខាន់បំផុត — និងផុយបំផុត។ បេះដូងភ្រូណចាប់ផ្ដើមលោតប្រហែលសប្ដាហ៍ទី ៦ ហើយត្រឹមសប្ដាហ៍ទី ១៣ ខួរក្បាល ឆ្អឹងខ្នង ភ្នែក តម្រងនោម និងដៃជើងតូចៗ សុទ្ធតែបានចាប់កំណើត។ នេះក៏ជាពេលដែលការក្អួត និងការនឿយហត់ខ្លាំងបំផុត។ ជៀសវាងស្រា ផ្សែង និងថ្នាំមិនមានសុវត្ថិភាព។"
              accent={TERRA}
              bg={`${TERRA_SOFT}33`}
            />
            <TrimesterTile
              k={k}
              testId="fd-trimester-2"
              numEn="2nd Trimester"
              numKh="ត្រីមាសទី ២"
              weeksEn="Weeks 14–27"
              weeksKh="សប្ដាហ៍ទី ១៤–២៧"
              titleEn="The Golden Period"
              titleKh="សម័យមាស"
              bodyEn="Many mothers feel best in this stage. The baby grows quickly, the bump becomes visible, the first kicks (around week 18–22) are felt, and energy returns. A good time for clinic check-ups, gentle exercise, and preparing the family for what is coming."
              bodyKh="ម្ដាយជាច្រើនមានអារម្មណ៍ល្អបំផុតក្នុងដំណាក់កាលនេះ។ ទារកលូតលាស់លឿន ផ្ទៃពោះមើលឃើញច្បាស់ ការតោះដំបូង (ប្រហែលសប្ដាហ៍ទី ១៨–២២) ត្រូវបានគេមានអារម្មណ៍ ហើយថាមពលត្រឡប់មកវិញ។ ជាពេលល្អសម្រាប់ការពិនិត្យសុខភាពនៅគ្លីនិក លំហាត់ប្រាណថ្នមៗ និងការត្រៀមគ្រួសារសម្រាប់អ្វីដែលនឹងមកដល់។"
              accent={LEAF_DEEP}
              bg={`${LEAF_SOFT}55`}
            />
            <TrimesterTile
              k={k}
              testId="fd-trimester-3"
              numEn="3rd Trimester"
              numKh="ត្រីមាសទី ៣"
              weeksEn="Weeks 28–40"
              weeksKh="សប្ដាហ៍ទី ២៨–៤០"
              titleEn="Final Development"
              titleKh="ការវិវត្តចុងក្រោយ"
              bodyEn="The lungs finish maturing, fat is laid down for warmth, and the baby moves into a head-down position. The mother's body now carries 4–5 kg of extra weight: backache, swollen feet, shortness of breath, and broken sleep are all normal. Hospital bag goes by the door."
              bodyKh="សួតបញ្ចប់ការលូតលាស់ ខ្លាញ់ត្រូវបានបង្កើតឡើងដើម្បីរក្សាភាពកក់ក្ដៅ ហើយទារកផ្លាស់ខ្លួនទៅទីតាំងក្បាលចុះក្រោម។ រាងកាយម្ដាយឥឡូវនេះផ្ទុកទម្ងន់បន្ថែម ៤–៥ គីឡូក្រាម ៖ ការឈឺខ្នង ការហើមជើង ការដកដង្ហើមខ្លី និងការគេងមិនលក់ ទាំងអស់នេះធម្មតា។ កាបូបទៅមន្ទីរពេទ្យដាក់នៅក្បែរទ្វារ។"
              accent={AMBER}
              bg="#fef9c333"
            />
          </div>
        </div>

        {/* C. Labor */}
        <div data-testid="fd-pregnancy-labor">
          <div
            className={`flex items-center gap-1.5 mb-2 text-[11px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            style={{ color: TERRA }}
          >
            <Activity className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{k ? "ការឈឺពោះសម្រាល" : "Labor · Bringing the Baby"}</span>
          </div>
          <p
            className={`text-sm sm:text-[15px] mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {t(
              "Labor begins when the muscles of the uterus start squeezing rhythmically — these are contractions. They start mild and far apart, then grow stronger, longer, and closer together as the body opens itself to let the baby out. Doctors describe the whole process in three stages.",
              "ការឈឺពោះសម្រាលចាប់ផ្ដើម នៅពេលសាច់ដុំស្បូនចាប់ផ្ដើមច្របាច់ជាចង្វាក់ — ទាំងនេះគឺជាការកន្ត្រាក់។ វាចាប់ផ្ដើមថ្នមៗ និងឆ្ងាយពីគ្នា បន្ទាប់មកកាន់តែខ្លាំង កាន់តែយូរ និងកាន់តែជិតគ្នា ពេលរាងកាយបើកខ្លួនឯងដើម្បីឱ្យទារកចេញ។ វេជ្ជបណ្ឌិតពិពណ៌នាដំណើរការទាំងមូលជាបីដំណាក់កាល។"
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <LaborStageTile
              k={k}
              numEn="Stage 1"
              numKh="ដំណាក់កាល ១"
              titleEn="Dilation"
              titleKh="ការពង្រីក (Dilation)"
              bodyEn="The longest stage — often 8–12 hours for a first baby. The cervix (the door at the bottom of the womb) slowly opens from closed to about 10 cm wide. Contractions become regular and intense; this is when most mothers go to a clinic or hospital."
              bodyKh="ដំណាក់កាលវែងបំផុត — ច្រើនតែ ៨–១២ ម៉ោងសម្រាប់កូនដំបូង។ មាត់ស្បូន (ទ្វារនៅបាតនៃស្បូន) បើកយឺតៗពីបិទរហូតដល់ប្រហែល ១០ ស.ម.។ ការកន្ត្រាក់ក្លាយជាទៀងទាត់ និងខ្លាំង នេះជាពេលដែលម្ដាយភាគច្រើនទៅគ្លីនិក ឬមន្ទីរពេទ្យ។"
              accent={TERRA}
            />
            <LaborStageTile
              k={k}
              numEn="Stage 2"
              numKh="ដំណាក់កាល ២"
              titleEn="Birth"
              titleKh="ការកើត (Birth)"
              bodyEn="The shortest and most intense stage — usually 30 minutes to 2 hours. With each strong contraction the mother bears down, and the baby moves through the open cervix and the birth canal. The midwife guides the head out first, then the shoulders, then the rest of the small body."
              bodyKh="ដំណាក់កាលខ្លីបំផុត និងខ្លាំងបំផុត — ជាធម្មតា ៣០ នាទីដល់ ២ ម៉ោង។ ជាមួយនឹងការកន្ត្រាក់ខ្លាំងម្ដងៗ ម្ដាយរុញចុះ ហើយទារកផ្លាស់ទីឆ្លងកាត់មាត់ស្បូនបើកចំហ និងផ្លូវសម្រាលកូន។ ឆ្មបនាំក្បាលចេញមុនគេ បន្ទាប់មកស្មា បន្ទាប់មកសេសសល់នៃរូបកាយតូច។"
              accent={LEAF_DEEP}
            />
            <LaborStageTile
              k={k}
              numEn="Stage 3"
              numKh="ដំណាក់កាល ៣"
              titleEn="The Placenta"
              titleKh="សុក (Placenta)"
              bodyEn="A few minutes after the baby is born, the uterus contracts again and pushes out the placenta — the temporary organ that fed the baby for nine months. Once the placenta is out and the bleeding is under control, the labor is medically complete and the baby can rest on the mother's chest."
              bodyKh="ពីរបីនាទីបន្ទាប់ពីទារកកើត ស្បូនកន្ត្រាក់ម្ដងទៀត ហើយរុញចេញសុក — សរីរាង្គបណ្ដោះអាសន្នដែលចិញ្ចឹមទារកអស់ ៩ ខែ។ នៅពេលសុកចេញហើយ និងការហូរឈាមត្រូវបានគ្រប់គ្រង ការឈឺពោះសម្រាលត្រូវបានបញ្ចប់ខាងវេជ្ជសាស្ត្រ ហើយទារកអាចសម្រាកនៅលើទ្រូងម្ដាយ។"
              accent={AMBER}
            />
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function TrimesterTile({
  k,
  testId,
  numEn,
  numKh,
  weeksEn,
  weeksKh,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  accent,
  bg,
}: {
  k: boolean;
  testId: string;
  numEn: string;
  numKh: string;
  weeksEn: string;
  weeksKh: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  accent: string;
  bg: string;
}) {
  return (
    <div
      className="rounded-2xl border-2 p-4"
      style={{ borderColor: `${accent}66`, backgroundColor: bg }}
      data-testid={testId}
    >
      <div className="flex items-baseline justify-between gap-2 mb-1 flex-wrap">
        <span
          className={`text-[11px] font-mono font-bold uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
          style={{ color: accent }}
        >
          {k ? numKh : numEn}
        </span>
        <span
          className={`text-[10px] font-mono ${k ? "font-khmer text-[11px]" : ""}`}
          style={{ color: INK_SOFT }}
        >
          {k ? weeksKh : weeksEn}
        </span>
      </div>
      <h4
        className={`text-base font-extrabold leading-tight mb-1.5 ${k ? "font-khmer leading-loose" : ""}`}
        style={{ color: accent }}
      >
        {k ? titleKh : titleEn}
      </h4>
      <p
        className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: INK_SOFT }}
      >
        {k ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

function LaborStageTile({
  k,
  numEn,
  numKh,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  accent,
}: {
  k: boolean;
  numEn: string;
  numKh: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-xl border-2 bg-white p-4"
      style={{ borderColor: `${accent}55` }}
    >
      <span
        className={`text-[10px] font-mono font-bold uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
        style={{ color: accent }}
      >
        {k ? numKh : numEn}
      </span>
      <h5
        className={`text-base font-extrabold leading-tight mt-1 mb-1.5 ${k ? "font-khmer leading-loose" : ""}`}
        style={{ color: accent }}
      >
        {k ? titleKh : titleEn}
      </h5>
      <p
        className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: INK_SOFT }}
      >
        {k ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 · Baby & Toddler Milestones
// ════════════════════════════════════════════════════════════════════════════

function MilestonesCard({ k, t }: { k: boolean; t: T }) {
  return (
    <CardShell
      k={k}
      spec="FD-03"
      icon={<Sprout className="w-4 h-4" />}
      titleEn="Baby & Toddler Milestones"
      titleKh="ការវិវត្តរបស់ទារក និងកុមារតូច"
      leadEn="Children grow at their own pace, but doctors and teachers watch for a few common milestones to make sure things are going well. Reaching them a little early or a little late is usually fine — but a long, quiet delay is a reason to ask a clinic, not to wait."
      leadKh="កុមារធំឡើងតាមល្បឿនរបស់ខ្លួនឯង ប៉ុន្តែវេជ្ជបណ្ឌិត និងគ្រូបង្រៀន សង្កេតពីដំណាក់កាលសំខាន់ៗមួយចំនួនធម្មតា ដើម្បីប្រាកដថាអ្វីៗដំណើរការល្អ។ ការទៅដល់ដំណាក់កាលនោះមុនគេបន្តិច ឬយឺតបន្តិច ច្រើនតែមិនអីទេ — ប៉ុន្តែការយឺតយូរ និងស្ងៀម គឺជាហេតុផលដើម្បីសួរគ្លីនិក មិនមែនរង់ចាំ។"
      accentBg={`${LEAF_SOFT}55`}
      accentBorder={`${LEAF}55`}
      accentText={LEAF_DEEP}
      testId="fd-card-milestones"
    >
      <div className="space-y-4">
        {/* Physical */}
        <MilestoneRow
          k={k}
          testId="fd-milestone-physical"
          icon={<Footprints className="w-5 h-5" aria-hidden="true" />}
          labelEn="Physical · The First Steps"
          labelKh="រាងកាយ · ជំហានដំបូង"
          windowEn="Walking usually begins between 9–15 months"
          windowKh="ការដើរច្រើនតែចាប់ផ្ដើមរវាង ៩–១៥ ខែ"
          bodyEn="Babies follow a fairly predictable order: lifting the head (3 months) → sitting up (6 months) → crawling (8–10 months) → standing while holding furniture → letting go and toddling. Some children skip crawling and walk straight from sitting. A safe floor — not a walker — is the best training tool."
          bodyKh="ទារកធ្វើតាមលំដាប់ស្ទើរតែទាយដឹង ៖ លើកក្បាល (៣ ខែ) → អង្គុយឡើង (៦ ខែ) → វារ (៨–១០ ខែ) → ឈរដោយកាន់គ្រឿងសង្ហារិម → លែងដៃ និងដើរទើរទាល់។ កុមារខ្លះរំលងការវារ ហើយដើរត្រង់ពីការអង្គុយ។ បរិវេណតូចមួយដែលមានសុវត្ថិភាពនៅលើឥដ្ឋ — មិនមែនឧបករណ៍ហ្វឹកដើរទេ — គឺជាឧបករណ៍ហ្វឹកហាត់ល្អបំផុត។"
          accent={LEAF_DEEP}
          bg={`${LEAF_SOFT}33`}
        />

        {/* Language */}
        <MilestoneRow
          k={k}
          testId="fd-milestone-language"
          icon={<MessageCircle className="w-5 h-5" aria-hidden="true" />}
          labelEn="Language · The First Words"
          labelKh="ភាសា · ពាក្យដំបូង"
          windowEn="First words around 12 months · Simple sentences by 24 months"
          windowKh="ពាក្យដំបូងប្រហែល ១២ ខែ · ប្រយោគខ្លីៗត្រឹម ២៤ ខែ"
          bodyEn="Babies babble (ba-ba, ma-ma) from about 6 months, point to things they want around 9–12 months, and say their first real word — usually 'mama', 'papa', or the name of a beloved food — near the first birthday. By two years old, most children stitch two or three words together ('want milk', 'go outside'). Talking to your baby a lot, even before they can answer, is the single biggest thing you can do."
          bodyKh="ទារកនិយាយឡូឡា (បា-បា, ម៉ា-ម៉ា) ចាប់ពីប្រហែល ៦ ខែ ចង្អុលរបស់ដែលចង់បានប្រហែល ៩–១២ ខែ ហើយនិយាយពាក្យដំបូងពិតប្រាកដ — ច្រើនតែ «ម៉ាក់» «ប៉ា» ឬឈ្មោះអាហារដែលស្រឡាញ់ — នៅជិតថ្ងៃខួបកំណើតទីមួយ។ ត្រឹមអាយុ ២ ឆ្នាំ កុមារភាគច្រើនតភ្ជាប់ពាក្យពីរ ឬបី ចូលគ្នា («ចង់បានទឹកដោះគោ» «ទៅខាងក្រៅ»)។ ការនិយាយជាមួយទារកអ្នកឱ្យបានច្រើន សូម្បីមុនពេលគេអាចឆ្លើយ គឺជារឿងមួយដ៏សំខាន់បំផុតដែលអ្នកអាចធ្វើបាន។"
          accent={TERRA_DEEP}
          bg={`${TERRA_SOFT}33`}
        />

        {/* Neurodiversity */}
        <MilestoneRow
          k={k}
          testId="fd-milestone-neurodiversity"
          icon={<Smile className="w-5 h-5" aria-hidden="true" />}
          labelEn="Neurodiversity · Early Signs of Autism"
          labelKh="ភាពចម្រុះនៃខួរក្បាល · សញ្ញាដំបូងនៃអូទីសឹម"
          windowEn="Best to ask a clinic if signs persist past 18–24 months"
          windowKh="ល្អបំផុតគួរសួរគ្លីនិកប្រសិនបើសញ្ញានៅតែបន្តក្រោយ ១៨–២៤ ខែ"
          bodyEn="Autism is not a disease and not a parent's fault. It is a different way of building a brain. Many autistic children grow into capable, happy adults — especially when their family understands them early. Things to gently watch for: rarely making eye contact, not responding to their own name by 12 months, very delayed speech, repeating the same movement (rocking, hand flapping) for long periods, or being deeply upset by small changes in routine. If you notice several of these together past 18 months, talk to a clinic. Early support is the gift that helps the most."
          bodyKh="អូទីសឹម មិនមែនជាជំងឺទេ ហើយក៏មិនមែនជាកំហុសរបស់ឪពុកម្ដាយដែរ។ វាគឺជារបៀបខុសគ្នាមួយនៃការកសាងខួរក្បាល។ កុមារអូទីសឹមជាច្រើនធំឡើងទៅជាមនុស្សពេញវ័យដែលមានសមត្ថភាព និងសប្បាយចិត្ត — ជាពិសេសពេលគ្រួសារយល់ពួកគេតាំងពីដំបូង។ រឿងដែលត្រូវសង្កេតថ្នមៗ ៖ កម្រសម្លឹងភ្នែកគ្នា មិនឆ្លើយតបនឹងឈ្មោះខ្លួនឯងត្រឹម ១២ ខែ ការនិយាយយឺតយ៉ាងខ្លាំង ការធ្វើចលនាដដែលៗ (ងក់រាងកាយ ទះដៃ) រយៈពេលយូរ ឬមានអារម្មណ៍ខឹងខ្លាំងចំពោះការផ្លាស់ប្ដូរតូចៗក្នុងទម្លាប់។ ប្រសិនបើអ្នកសង្កេតឃើញសញ្ញាទាំងនេះជាច្រើនរួមគ្នាក្រោយ ១៨ ខែ សូមទាក់ទងគ្លីនិក។ ការគាំទ្រពីដំបូង គឺជាអំណោយដែលជួយបានច្រើនបំផុត។"
          accent={AMBER}
          bg="#fef9c333"
          warningChipEn="Not a diagnosis — just a reason to ask"
          warningChipKh="មិនមែនជាការធ្វើរោគវិនិច្ឆ័យ — គ្រាន់តែជាហេតុផលដើម្បីសួរ"
        />

        {/* General reassurance footer */}
        <div
          className="rounded-xl border-2 px-4 py-3 flex items-start gap-2"
          style={{
            borderColor: `${LEAF}33`,
            backgroundColor: `${LEAF_SOFT}33`,
          }}
        >
          <Sun
            className="w-4 h-4 flex-shrink-0 mt-0.5"
            style={{ color: LEAF_DEEP }}
            aria-hidden="true"
          />
          <p
            className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: LEAF_DEEP }}
          >
            {t(
              "Every child meets these milestones in their own rhythm. The numbers above are averages — not deadlines. The goal of watching is not to grade your baby; it is to catch any need for support early, while it is easiest to help.",
              "កុមារម្នាក់ៗទៅដល់ដំណាក់កាលទាំងនេះតាមចង្វាក់របស់ខ្លួន។ លេខខាងលើគឺជាមធ្យម — មិនមែនជាកាលកំណត់ទេ។ គោលដៅនៃការសង្កេតមិនមែនដើម្បីដាក់ពិន្ទុទារកអ្នកទេ វាគឺដើម្បីរកឃើញតម្រូវការជំនួយណាមួយតាំងពីដំបូង នៅពេលដែលជួយបានងាយស្រួលបំផុត។"
            )}
          </p>
        </div>
      </div>
    </CardShell>
  );
}

function MilestoneRow({
  k,
  testId,
  icon,
  labelEn,
  labelKh,
  windowEn,
  windowKh,
  bodyEn,
  bodyKh,
  accent,
  bg,
  warningChipEn,
  warningChipKh,
}: {
  k: boolean;
  testId: string;
  icon: React.ReactNode;
  labelEn: string;
  labelKh: string;
  windowEn: string;
  windowKh: string;
  bodyEn: string;
  bodyKh: string;
  accent: string;
  bg: string;
  warningChipEn?: string;
  warningChipKh?: string;
}) {
  return (
    <div
      className="rounded-2xl border-2 p-4 sm:p-5"
      style={{ borderColor: `${accent}55`, backgroundColor: bg }}
      data-testid={testId}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.7)", color: accent }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className={`text-base sm:text-lg font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
            style={{ color: accent }}
          >
            {k ? labelKh : labelEn}
          </h4>
          <div className="flex items-center gap-2 mt-1 mb-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${k ? "font-khmer text-xs" : ""}`}
              style={{
                backgroundColor: "rgba(255,255,255,0.7)",
                color: accent,
                border: `1px solid ${accent}55`,
              }}
            >
              <Calendar className="w-3 h-3" aria-hidden="true" />
              {k ? windowKh : windowEn}
            </span>
            {warningChipEn && warningChipKh && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${k ? "font-khmer text-xs" : ""}`}
                style={{
                  backgroundColor: `${accent}22`,
                  color: accent,
                  border: `1px solid ${accent}66`,
                }}
              >
                <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                {k ? warningChipKh : warningChipEn}
              </span>
            )}
          </div>
          <p
            className={`text-sm sm:text-[15px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {k ? bodyKh : bodyEn}
          </p>
        </div>
      </div>
    </div>
  );
}
