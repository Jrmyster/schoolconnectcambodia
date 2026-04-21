import { Link } from "wouter";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Bug,
  Droplets,
  Flower2,
  History,
  Info,
  Layers,
  Leaf,
  Mountain,
  Network,
  Snowflake,
  Sparkles,
  Sprout,
  Sun,
  TreeDeciduous,
  TreePine,
  Trees,
  Wind,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  BIO-02 · Botany: The Green Engine of Earth
//          រុក្ខសាស្ត្រ៖ ម៉ាស៊ីនពណ៌បៃតងនៃផែនដី
//
//  1. The Deep History       · bare rock → 8m mushrooms → first trees (~385 mya)
//  2. The Alchemy of Leaves  · photosynthesis (LaTeX) + xylem & phloem
//  3. Global Diversity       · conifers vs Cambodian dipterocarps + flowers/pollen
//  4. The Wood Wide Web      · mycorrhizae + Mother Trees
//  5. Tree Diseases & Burls  · agrobacterium tumours, why they don't kill the tree
//
//  Aesthetic: Living Forest — deep canopy greens, sun-amber, soil brown,
//             moss + bark layered cards.
// ════════════════════════════════════════════════════════════════════════════

const CANOPY = "#15803d";       // primary leaf green
const CANOPY_DEEP = "#14532d";
const CANOPY_LIGHT = "#bbf7d0";

const MOSS = "#65a30d";         // brighter sap green
const MOSS_LIGHT = "#d9f99d";

const SUN = "#d97706";          // photosynthesis amber
const SUN_LIGHT = "#fef3c7";

const SOIL = "#78350f";         // deep root brown
const BARK = "#92400e";

const SKY = "#0284c7";          // water/sky blue (xylem)
const ROSE = "#be123c";         // alarm/disease

const CREAM = "#fefce8";
const PARCH = "#fff7ed";
const INK = "#1e293b";

const FRAME: React.CSSProperties = {
  backgroundColor: CREAM,
  backgroundImage:
    `radial-gradient(circle at 12% 18%, rgba(21, 128, 61, 0.07), transparent 45%),` +
    `radial-gradient(circle at 88% 82%, rgba(120, 53, 15, 0.06), transparent 50%),` +
    `linear-gradient(${PARCH}, ${CREAM})`,
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
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-white rounded-full px-3 py-1 shadow-sm"
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
        className="flex-1 border-t-2 border-dotted"
        style={{ borderColor: `${accent}55` }}
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
  glow?: boolean;
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
  glow = false,
  badge,
  children,
}: ConceptCardProps) {
  return (
    <div
      className="relative rounded-3xl p-5 sm:p-6 bg-white border-2 overflow-hidden flex flex-col"
      style={{
        borderColor: `${accent}55`,
        boxShadow: glow
          ? `0 0 0 1px ${accent}22 inset, 0 12px 30px -16px ${accent}66`
          : "0 6px 18px -12px rgba(15, 23, 42, 0.18)",
      }}
      data-testid={`concept-card-${enName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: `${accent}14`,
            border: `1px solid ${accent}44`,
          }}
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
            className={`text-[11px] font-mono uppercase tracking-widest mt-0.5 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: accent }}
          >
            {k ? khTag : enTag}
          </div>
        </div>
        {badge ? (
          <span
            className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full text-white ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ backgroundColor: accent }}
          >
            {k ? badge.kh : badge.en}
          </span>
        ) : null}
      </div>

      {enBody && khBody ? (
        <p
          className={`text-sm sm:text-[15px] text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          {k ? khBody : enBody}
        </p>
      ) : null}

      {children ? <div className="mt-4">{children}</div> : null}
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
        backgroundColor: `${accent}10`,
        borderLeftColor: accent,
        borderColor: `${accent}33`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="w-4 h-4" style={{ color: accent }} />
        <span
          className={`text-[10px] font-mono uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`}
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
        className={`text-xs sm:text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
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
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border bg-white/85 backdrop-blur-sm ${k ? "font-khmer" : ""}`}
      style={{ color, borderColor: `${color}88` }}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {k ? kh : en}
    </span>
  );
}

// ─── Decorative SVG: layered forest canopy (hero) ──────────────────────────

function ForestSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 200"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {/* far ridge */}
      <path
        d="M0,140 L60,120 L100,135 L150,100 L200,125 L260,95 L310,118 L360,90 L420,115 L480,85 L540,110 L600,95 L660,118 L720,100 L800,128 L800,200 L0,200 Z"
        fill="rgba(20, 83, 45, 0.45)"
      />
      {/* middle ridge */}
      <path
        d="M0,170 L50,150 L110,165 L170,140 L230,160 L290,135 L350,158 L410,128 L470,150 L530,130 L590,155 L650,138 L710,160 L770,142 L800,158 L800,200 L0,200 Z"
        fill="rgba(21, 128, 61, 0.55)"
      />
      {/* sun */}
      <circle cx="640" cy="50" r="32" fill="rgba(254, 240, 138, 0.85)" />
      <circle cx="640" cy="50" r="22" fill="rgba(253, 224, 71, 0.95)" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function BotanyPage() {
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
            className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors ${k ? "font-khmer" : ""}`}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* Hero */}
        <header
          className="relative rounded-[2rem] p-6 sm:p-9 mb-10 overflow-hidden shadow-xl border"
          style={{
            borderColor: `${CANOPY}55`,
            backgroundImage: `
              linear-gradient(180deg, #ecfccb 0%, #d9f99d 35%, #bbf7d0 100%)
            `,
          }}
        >
          <ForestSilhouette className="absolute bottom-0 left-0 w-full h-32 sm:h-40 opacity-90 pointer-events-none" />

          <div className="relative flex items-start gap-4">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border bg-white/85 backdrop-blur-sm"
              style={{ borderColor: `${CANOPY}66` }}
            >
              <Trees className="w-8 h-8" style={{ color: CANOPY_DEEP }} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] mb-2 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
                style={{ color: CANOPY_DEEP }}
              >
                <span>{t("Biology", "ជីវវិទ្យា")}</span>
                <span>·</span>
                <span>BIO-02</span>
              </div>
              <h1
                className={`text-3xl sm:text-4xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
                style={{ color: INK }}
                data-testid="page-title"
              >
                {t(
                  "Botany: The Green Engine of Earth",
                  "រុក្ខសាស្ត្រ៖ ម៉ាស៊ីនពណ៌បៃតងនៃផែនដី"
                )}
              </h1>
              <p
                className={`mt-3 text-sm sm:text-base text-slate-700 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              >
                {t(
                  "Almost every breath you have ever taken came from a plant. Almost every meal you have ever eaten began as a leaf catching sunlight. Plants are not the quiet decoration of the planet — they are the engine that runs it. To study them seriously is to study how Earth works.",
                  "ស្ទើរតែគ្រប់ដង្ហើមដែលអ្នកធ្លាប់ដក គឺមកពីរុក្ខជាតិ។ ស្ទើរតែគ្រប់អាហារដែលអ្នកធ្លាប់ញ៉ាំ ចាប់ផ្តើមជាស្លឹកមួយដែលចាប់យកពន្លឺព្រះអាទិត្យ។ រុក្ខជាតិមិនមែនជាការតុបតែងស្ងៀមៗរបស់ភពនេះទេ — ពួកវាគឺជាម៉ាស៊ីនដែលបើកបរវា។ ដើម្បីសិក្សាពួកវាយ៉ាងម៉ត់ចត់ គឺត្រូវសិក្សាពីរបៀបដែលផែនដីដំណើរការ។"
                )}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <HeroChip color={CANOPY} k={k} en="Photosynthesis" kh="រស្មីសំយោគ" />
                <HeroChip color={SKY}    k={k} en="Xylem & Phloem" kh="ស៊ីឡែម និងផ្លូអែម" />
                <HeroChip color={SOIL}   k={k} en="Wood Wide Web"  kh="បណ្តាញព្រៃឈើ" />
                <HeroChip color={ROSE}   k={k} en="Burls"          kh="ដុំសាច់" />
              </div>
            </div>
          </div>
        </header>

        <SectionDeepHistory  k={k} t={t} />
        <SectionAlchemy      k={k} t={t} />
        <SectionDiversity    k={k} t={t} />
        <SectionWoodWideWeb  k={k} t={t} />
        <SectionBurls        k={k} t={t} />

        {/* Closing */}
        <div
          className="mt-12 rounded-3xl border-2 p-5 sm:p-6 flex items-start gap-3 shadow"
          style={{
            borderColor: `${CANOPY}66`,
            backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${CANOPY_LIGHT}cc 100%)`,
          }}
          data-testid="closing-note"
        >
          <Sparkles className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: CANOPY_DEEP }} />
          <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong className={k ? "" : "font-bold"}>
              {t("The big idea: ", "គំនិតធំ ៖ ")}
            </strong>
            {t(
              "A tree is not a single quiet object. It is a chemistry lab, a plumbing system, a marketplace, a communications network, and a hospital — all standing silently in your village. The next time you sit under a Dipterocarp in the heat of the day, remember: it is breathing your old air back to you, sending sugar to its neighbours through the soil, and keeping a watch on insects you cannot see.",
              "ដើមឈើមួយ មិនមែនជាវត្ថុស្ងៀមតែមួយទេ។ វាគឺជាមន្ទីរពិសោធន៍គីមី ប្រព័ន្ធបំពង់ទឹក ផ្សារ បណ្តាញប្រាស្រ័យទាក់ទង និងមន្ទីរពេទ្យ — ទាំងអស់ឈរស្ងៀមៗក្នុងភូមិរបស់អ្នក។ លើកក្រោយដែលអ្នកអង្គុយក្រោមដើមឈើជ័រដ្បូងក្នុងកំដៅថ្ងៃ ចូរចងចាំ ៖ វាកំពុងបញ្ចេញខ្យល់ចាស់របស់អ្នកត្រឡប់មកអ្នកវិញ បញ្ជូនស្ករទៅកាន់អ្នកជិតខាងរបស់វាតាមរយៈដី និងឃ្លាំមើលសត្វល្អិតដែលអ្នកមិនអាចមើលឃើញ។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold shadow hover:opacity-90 transition-opacity ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: CANOPY_DEEP }}
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
//  Section 01 — The Deep History
// ════════════════════════════════════════════════════════════════════════════

function SectionDeepHistory({ k, t }: { k: boolean; t: T }) {
  // Earth timeline tiles
  const tiles = [
    {
      Icon: Mountain,
      tag: "4,500 mya",
      en: "Bare rock",
      kh: "ថ្មទទេ",
      enBody: "For most of Earth's history, the land was simply bare stone — no soil, no green, no shade. Rain fell onto rock and ran straight back to the sea.",
      khBody: "សម្រាប់ប្រវត្តិសាស្ត្រភាគច្រើនរបស់ផែនដី ដីគោកគ្រាន់តែជាថ្មទទេ — គ្មានដីសុទ្ធ គ្មានពណ៌បៃតង គ្មានម្លប់។ ភ្លៀងធ្លាក់លើថ្ម ហើយហូរត្រឡប់ទៅសមុទ្រវិញ។",
      accent: SOIL,
    },
    {
      Icon: Sprout,
      tag: "470 mya",
      en: "First mosses",
      kh: "ម៉ូសដំបូង",
      enBody: "The first land plants were tiny mosses and liverworts — flat, soft, hugging the rock. They began the very slow work of breaking stone into soil.",
      khBody: "រុក្ខជាតិដីគោកដំបូងគឺម៉ូស និងលីវ៉ឺវត តូចៗ — រាបស្មើ ទន់ ឱបជាប់នឹងថ្ម។ ពួកវាបានចាប់ផ្តើមការងារដ៏យឺតបំផុត ក្នុងការបំបែកថ្មទៅជាដី។",
      accent: MOSS,
    },
    {
      Icon: Trees,
      tag: "420 mya",
      en: "8-metre mushrooms",
      kh: "ផ្សិត ៨ ម៉ែត្រ",
      enBody: "Before any tree existed, the tallest living thing on land was a fungus called Prototaxites — a column of solid mycelium up to eight metres tall, towering over a knee-high green carpet.",
      khBody: "មុនពេលដើមឈើណាមួយមាន របស់រស់ខ្ពស់បំផុតនៅលើដីគោក គឺផ្សិតមួយឈ្មោះ Prototaxites — ជាសសរនៃមីសេលីមារឹងរហូតដល់ ៨ ម៉ែត្រខ្ពស់ ឈរលើគំរប់បៃតងកម្រិតជង្គង់។",
      accent: BARK,
    },
    {
      Icon: TreeDeciduous,
      tag: "385 mya",
      en: "First true trees",
      kh: "ដើមឈើពិតដំបូង",
      enBody: "The first real trees finally appeared — wood, bark, deep roots, towering canopies. Within a few million years they had pulled so much CO\u2082 out of the air that the whole climate changed.",
      khBody: "ដើមឈើពិតប្រាកដដំបូង ទីបំផុតបានលេចឡើង — ឈើ សំបក ឫសជ្រៅ និងពាលពាសក្បាល។ ក្នុងរយៈពេលប៉ុន្មានលានឆ្នាំ ពួកវាបានទាញ CO\u2082 ច្រើនណាស់ចេញពីខ្យល់ ហើយអាកាសធាតុទាំងមូលបានផ្លាស់ប្តូរ។",
      accent: CANOPY,
    },
  ];

  return (
    <section className="mb-12" data-testid="section-deep-history">
      <SectionHeader
        spec="01"
        en="The Deep History"
        kh="ប្រវត្តិដ៏ជ្រាលជ្រៅ"
        k={k}
        Icon={History}
        accent={SOIL}
      />

      <p className={`text-sm text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "It is hard to imagine, standing in a Cambodian jungle today, that for almost the entire age of the Earth there were no trees at all. Trees are a young invention. They appeared less than 400 million years ago — about the last nine percent of our planet's life.",
          "វាពិបាកនឹងស្រមៃ ឈរក្នុងព្រៃកម្ពុជាសព្វថ្ងៃ ថាសម្រាប់រយៈពេលស្ទើរតែទាំងអស់នៃអាយុរបស់ផែនដី គ្មានដើមឈើទាល់តែសោះ។ ដើមឈើគឺជាការច្នៃប្រឌិតវ័យក្មេង។ ពួកវាបានលេចឡើងតិចជាង ៤០០ លានឆ្នាំមុន — ប្រហែលជា ៩ ភាគរយចុងក្រោយនៃអាយុជីវិតភពយើង។"
        )}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((tile, i) => {
          const Icon = tile.Icon;
          return (
            <div
              key={i}
              className="rounded-2xl p-4 bg-white border-2 flex flex-col"
              style={{ borderColor: `${tile.accent}55` }}
              data-testid={`history-tile-${i}`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5" style={{ color: tile.accent }} />
                <span
                  className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: tile.accent }}
                >
                  {tile.tag}
                </span>
              </div>
              <h4 className={`font-bold text-base mb-1 ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                {k ? tile.kh : tile.en}
              </h4>
              <p className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {k ? tile.khBody : tile.enBody}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <Callout
          k={k}
          Icon={Info}
          labelEn="Wait — what?"
          labelKh="អី? — ចាំមួយភ្លែត"
          enTitle="The Earth was once ruled by giant mushrooms."
          khTitle="ផែនដីធ្លាប់ត្រូវបានគ្រប់គ្រងដោយផ្សិតយក្ស។"
          enBody="This is not a joke. Around 420 million years ago, before any forest existed, the largest organism on land was a fossil now called Prototaxites — a fungus that grew into upright columns up to 8 metres high and 1 metre thick. If you had been a small early animal walking across what is now Europe or Africa, the tallest thing in your world would have been a mushroom taller than a house."
          khBody="នេះមិនមែនជារឿងកំប្លែងទេ។ ប្រហែល ៤២០ លានឆ្នាំមុន មុនព្រៃណាមួយមាន សារពាង្គកាយធំបំផុតលើដីគោក គឺជាហ្វូស៊ីលដែលឥឡូវហៅថា Prototaxites — ផ្សិតមួយដែលដុះជាសសរបញ្ឈរខ្ពស់ដល់ ៨ ម៉ែត្រ និងក្រាស់ ១ ម៉ែត្រ។ ប្រសិនបើអ្នកជាសត្វតូចៗដំបូងដើរកាត់អ្វីដែលឥឡូវជាអឺរ៉ុប ឬអាហ្វ្រិក វត្ថុខ្ពស់បំផុតក្នុងពិភពអ្នក គឺផ្សិតមួយ ខ្ពស់ជាងផ្ទះ។"
          accent={BARK}
        />
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — The Alchemy of Leaves
// ════════════════════════════════════════════════════════════════════════════

function SectionAlchemy({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-alchemy">
      <SectionHeader
        spec="02"
        en="The Alchemy of Leaves"
        kh="គីមីវិទ្យានៃស្លឹក"
        k={k}
        Icon={Leaf}
        accent={CANOPY}
      />

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Photosynthesis */}
        <ConceptCard
          k={k}
          Icon={Sun}
          enName="Photosynthesis"
          khName="រស្មីសំយោគ"
          enTag="the chemistry of being green"
          khTag="គីមីវិទ្យានៃការក្លាយជាបៃតង"
          enBody="A plant is a small chemistry factory powered by light. Through tiny holes in its leaves it inhales an invisible gas — carbon dioxide — from the very air you exhale. Through its roots it drinks water from the soil. Then, using sunlight as a hammer, it smashes those two together inside the chloroplast and produces two outputs: a sugar called glucose, which the plant eats, and pure oxygen, which it releases back into the air for you to breathe. Every plank of timber, every grain of rice, every blade of grass on Earth was once nothing but air, water, and sunlight."
          khBody="រុក្ខជាតិមួយ គឺជារោងចក្រគីមីតូចមួយដែលដំណើរការដោយពន្លឺ។ តាមរន្ធតូចៗក្នុងស្លឹក វាស្រូបយកឧស្ម័នដែលមិនអាចមើលឃើញ — ខាបូនឌីអុកស៊ីត — ពីខ្យល់ដែលអ្នកដកដង្ហើមចេញ។ តាមរយៈឫស វាផឹកទឹកពីដី។ បន្ទាប់មក ដោយប្រើពន្លឺព្រះអាទិត្យជាញញួរ វាបុកវាទាំងពីរចូលគ្នាក្នុងក្លរ៉ូប្លាស ហើយផលិតផលិតផលពីរ ៖ ស្ករមួយឈ្មោះ ហ្គ្លុយកូស ដែលរុក្ខជាតិញ៉ាំ និងអុកស៊ីសែនបរិសុទ្ធ ដែលវាបញ្ចេញត្រឡប់ទៅខ្យល់វិញសម្រាប់អ្នកដកដង្ហើម។ ផ្ទាំងឈើនីមួយៗ គ្រាប់អង្ករនីមួយៗ ស្លឹកស្មៅនីមួយៗនៅលើផែនដី ធ្លាប់គ្មានអ្វីក្រៅពីខ្យល់ ទឹក និងពន ្លឺព្រះអាទិត្យ។"
          accent={CANOPY}
          glow
          badge={{ en: "Master equation", kh: "សមីការមេ" }}
        >
          <div
            className="rounded-2xl p-4 mb-3 border"
            style={{
              backgroundColor: `${SUN_LIGHT}88`,
              borderColor: `${SUN}55`,
            }}
            data-testid="photosynthesis-equation"
          >
            <div
              className={`text-[10px] font-mono uppercase tracking-widest mb-2 flex items-center gap-1.5 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
              style={{ color: SUN }}
            >
              <Sun className="w-3.5 h-3.5" />
              {t("Powered by sunlight", "ដំណើរការដោយពន្លឺព្រះអាទិត្យ")}
            </div>
            <div className="overflow-x-auto">
              <BlockMath math={String.raw`6\,CO_2 \;+\; 6\,H_2O \;\xrightarrow{\text{sunlight}}\; C_6H_{12}O_6 \;+\; 6\,O_2`} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
              <div className={`rounded-lg p-2 border ${k ? "font-khmer" : ""}`} style={{ borderColor: `${SUN}33`, backgroundColor: "white" }}>
                <div className="font-bold" style={{ color: SUN }}>{t("Inputs (free)", "ធាតុចូល (ឥតគិតថ្លៃ)")}</div>
                <div className="text-slate-700 mt-0.5">
                  {t("Air · Water · Sunlight", "ខ្យល់ · ទឹក · ពន្លឺព្រះអាទិត្យ")}
                </div>
              </div>
              <div className={`rounded-lg p-2 border ${k ? "font-khmer" : ""}`} style={{ borderColor: `${CANOPY}33`, backgroundColor: "white" }}>
                <div className="font-bold" style={{ color: CANOPY }}>{t("Outputs", "ផលិតផល")}</div>
                <div className="text-slate-700 mt-0.5">
                  {t("Sugar (food + wood) · Oxygen", "ស្ករ (អាហារ + ឈើ) · អុកស៊ីសែន")}
                </div>
              </div>
            </div>
          </div>

          <Callout
            k={k}
            Icon={Wind}
            labelEn="Mind-bender"
            labelKh="គំនិតគួរឲ្យភ្ញាក់ផ្អើល"
            enTitle="A tree is mostly air."
            khTitle="ដើមឈើភាគច្រើនធ្វើពីខ្យល់។"
            enBody="The wood of an oak weighing one tonne did not come up out of the soil. It was assembled, atom by atom, out of carbon dioxide molecules pulled out of the sky. When you split firewood, you are splitting compressed sunlight."
            khBody="ឈើនៃដើមអុកដែលធ្ងន់មួយតោន មិនបានឡើងមកពីដីទេ។ វាត្រូវបានផ្គុំឡើង ម៉ូលេគុលម្តង ៗ ពីម៉ូលេគុលខាបូនឌីអុកស៊ីត ដែលត្រូវបានទាញចេញពីមេឃ។ ពេលអ្នកពុះអុស អ្នកកំពុងពុះពន្លឺព្រះអាទិត្យដែលបានបង្ហាប់។"
            accent={CANOPY}
          />
        </ConceptCard>

        {/* Xylem & Phloem */}
        <ConceptCard
          k={k}
          Icon={Droplets}
          enName="Xylem & Phloem"
          khName="ស៊ីឡែម និងផ្លូអែម"
          enTag="how plants drink without a heart"
          khTag="របៀបដែលរុក្ខជាតិផឹកដោយគ្មានបេះដូង"
          enBody="A 30-metre tree has to lift water from its roots all the way up to its highest leaf — and it does this without any pump. Inside the trunk, two parallel pipelines run in opposite directions. Xylem carries water and dissolved minerals upward, pulled by the suction of leaves losing water to the air. Phloem carries the sugary food made in the leaves downward, feeding the roots, the trunk, and any new shoots. Every wooden ring you have ever seen on a sawn log is a layer of these two systems, frozen in time."
          khBody="ដើមឈើខ្ពស់ ៣០ ម៉ែត្រ ត្រូវលើកទឹកពីឫសរបស់វា ឡើងទៅដល់ស្លឹកខ្ពស់បំផុត — ហើយវាធ្វើដូច្នេះដោយគ្មានស្នប់។ ក្នុងបន្តូប បំពង់ពីរស្របគ្នាដំណើរការក្នុងទិសផ្ទុយគ្នា។ ស៊ីឡែម នាំទឹក និងសារធាតុរ៉ែដែលរលាយឡើងលើ ត្រូវបានទាញដោយការបឺតរបស់ស្លឹកដែលបាត់បង់ទឹកទៅខ្យល់។ ផ្លូអែម នាំអាហារផ្អែមដែលផលិតក្នុងស្លឹកចុះក្រោម ចិញ្ចឹមឫស បន្តូប និងពន្លកថ្មីៗ។ រង្វង់ឈើនីមួយៗដែលអ្នកធ្លាប់ឃើញលើកំណាត់ឈើ គឺជាស្រទាប់នៃប្រព័ន្ធទាំងពីរនេះ ដែលត្រូវបានកក់ក្នុងពេលវេលា។"
          accent={SKY}
          glow
          badge={{ en: "Two pipes", kh: "បំពង់ពីរ" }}
        >
          {/* Xylem / Phloem schematic */}
          <div
            className="rounded-2xl border-2 p-4 grid grid-cols-2 gap-3"
            style={{ borderColor: `${SKY}33`, backgroundColor: `${SKY}06` }}
            data-testid="xylem-phloem-diagram"
          >
            {[
              {
                Icon: ArrowUp,
                color: SKY,
                en: "Xylem",
                kh: "ស៊ីឡែម",
                enWhat: "Water + minerals",
                khWhat: "ទឹក + សារធាតុរ៉ែ",
                enHow: "Capillary action · leaf suction",
                khHow: "សកម្មភាពកាពីលែ · ការបឺតស្លឹក",
                dir: "Up",
                kdir: "ឡើងលើ",
              },
              {
                Icon: ArrowDown,
                color: MOSS,
                en: "Phloem",
                kh: "ផ្លូអែម",
                enWhat: "Dissolved sugar (sap)",
                khWhat: "ស្ករដែលរលាយ (ជ័រ)",
                enHow: "Pressure flow from leaves",
                khHow: "លំហូរសម្ពាធពីស្លឹក",
                dir: "Down",
                kdir: "ចុះក្រោម",
              },
            ].map((p, i) => {
              const Icon = p.Icon;
              return (
                <div
                  key={i}
                  className="rounded-xl bg-white border p-3"
                  style={{ borderColor: `${p.color}55` }}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className="w-4 h-4" style={{ color: p.color }} />
                    <span className={`text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: p.color }}>
                      {k ? p.kh : p.en}
                    </span>
                    <span
                      className={`ml-auto text-[9px] px-1.5 py-0.5 rounded-full text-white ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
                      style={{ backgroundColor: p.color }}
                    >
                      {k ? p.kdir : p.dir}
                    </span>
                  </div>
                  <div className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : ""}`}>
                    <div><span className="font-bold">{t("Carries: ", "នាំ ៖ ")}</span>{k ? p.khWhat : p.enWhat}</div>
                    <div className="mt-1"><span className="font-bold">{t("How: ", "របៀប ៖ ")}</span>{k ? p.khHow : p.enHow}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className={`mt-3 text-xs text-slate-600 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong className={k ? "" : "font-bold"}>{t("Worth knowing: ", "គួរដឹង ៖ ")}</strong>
            {t(
              "The technical word for the leaf-suction effect that pulls water all the way up the trunk is transpiration pull. It is the silent force that lifts millions of litres of water out of the Cambodian forest into the sky every single day.",
              "ពាក្យបច្ចេកទេសសម្រាប់ឥទ្ធិពលនៃការបឺតស្លឹក ដែលទាញទឹកឡើងតាមបន្តូបទាំងមូល គឺ ការប្តូរទឹក។ វាគឺជាកម្លាំងស្ងៀមៗដែលលើកទឹករាប់លានលីត្រចេញពីព្រៃកម្ពុជាឡើងទៅមេឃ ជារៀងរាល់ថ្ងៃ។"
            )}
          </p>
        </ConceptCard>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — Global Diversity & Reproduction
// ════════════════════════════════════════════════════════════════════════════

function SectionDiversity({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-diversity">
      <SectionHeader
        spec="03"
        en="Global Diversity & Reproduction"
        kh="ភាពចម្រុះ និងការបន្តពូជ"
        k={k}
        Icon={Flower2}
        accent={MOSS}
      />

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* Conifers */}
        <ConceptCard
          k={k}
          Icon={TreePine}
          enName="Conifers of the Cold North"
          khName="ដើមត្នោតស្វិតនៃភាគខាងជើងត្រជាក់"
          enTag="needles · cones · evergreen"
          khTag="ស្លឹកម្ជុល · គ្រាប់ផ្កា · បៃតងគ្រប់រដូវ"
          enBody="In Siberia, Canada, and the cold mountain belts, the dominant trees are conifers — pines, firs, spruces. Their leaves are not flat blades but tough, waxy needles that survive ice and never fall in autumn. Their seeds are not wrapped in fruit but tucked between the woody scales of cones. Conifers are evolution's answer to a long, freezing winter: do not waste energy regrowing leaves every year, and shed snow off your branches like a slanted roof."
          khBody="នៅស៊ីបេរី កាណាដា និងតំបន់ភ្នំត្រជាក់ ដើមឈើគ្របដណ្តប់គឺជាដើមត្នោតស្វិត — ដើមផែនធើ ដើមហ្វៀ ដើមស្ព្រូស។ ស្លឹករបស់វាមិនមែនជាផ្ទាំងរាបទេ ប៉ុន្តែជាស្លឹកម្ជុលរឹង និងមានជាតិក្រមួន ដែលរស់រានពីទឹកកក និងមិនជ្រុះក្នុងរដូវស្លឹកឈើជ្រុះ។ គ្រាប់របស់វាមិនត្រូវបានរុំក្នុងផ្លែឈើទេ ប៉ុន្តែលាក់នៅរវាងស្រកាឈើនៃផ្ការាង។ ដើមត្នោតស្វិតគឺជាចម្លើយរបស់ការវិវត្តចំពោះរដូវរងាដ៏វែង និងកក ៖ កុំខ្ជះខ្ជាយថាមពលដើម្បីដុះស្លឹកឡើងវិញរាល់ឆ្នាំ ហើយបណ្តាលឲ្យព្រិលធ្លាក់ពីមែករបស់អ្នក ដូចដំបូលជម្រាល។"
          accent={SKY}
        >
          <Callout
            k={k}
            Icon={Snowflake}
            labelEn="Cold-climate strategy"
            labelKh="យុទ្ធសាស្ត្រអាកាសធាតុត្រជាក់"
            enTitle="A pine tree is a winter survivor."
            khTitle="ដើមផែនធើ គឺជាអ្នករស់រានពីរដូវរងា។"
            enBody="By keeping its needles year-round, a conifer can begin photosynthesising the moment a single warm day appears in spring — a huge advantage in places where the growing season is only a few months long."
            khBody="ដោយរក្សាស្លឹកម្ជុលរបស់វាគ្រប់រដូវ ដើមត្នោតស្វិតអាចចាប់ផ្តើមធ្វើរស្មីសំយោគ នៅពេលដែលថ្ងៃក្តៅតែមួយលេចឡើងក្នុងរដូវផ្ការីក — ជាគុណសម្បត្តិដ៏ធំនៅកន្លែងដែលរដូវដុះមានរយៈពេលត្រឹមតែប៉ុន្មានខែ។"
            accent={SKY}
          />
        </ConceptCard>

        {/* Dipterocarps */}
        <ConceptCard
          k={k}
          Icon={TreeDeciduous}
          enName="Dipterocarps of the Cambodian Jungle"
          khName="ដើមឈើជ័រដ្បូងនៃព្រៃកម្ពុជា"
          enTag="broadleaf · winged seeds · giants"
          khTag="ស្លឹកធំ · គ្រាប់មានស្លាប · យក្ស"
          enBody={"The kings of the lowland Cambodian forest belong to the Dipterocarpaceae family — Chhoeuteal, Koki, Beng, and others. They are broadleaf giants, often more than 50 metres tall, with wide flat leaves that catch every drop of equatorial sun. Their seeds famously have two papery wings (dipterocarp literally means \u201Ctwo-winged fruit\u201D), so when they fall from the canopy they spin like helicopter blades, riding the wind far from the parent tree."}
          khBody={"ស្តេចនៃព្រៃកម្ពុជាដីទាប ជាកម្មសិទ្ធិរបស់គ្រួសារ Dipterocarpaceae — ឈើទាល គគី បេង និងផ្សេងទៀត។ ពួកវាគឺជាយក្សស្លឹកធំ ច្រើនតែខ្ពស់ជាង ៥០ ម៉ែត្រ មានស្លឹករាបធំ ដែលចាប់រាល់ដំណក់ពន្លឺព្រះអាទិត្យអេក្វាទ័រ។ គ្រាប់របស់ពួកវាល្បីដោយមានស្លាបក្រដាសពីរ (dipterocarp មានន័យត្រង់ \u00abផ្លែមានស្លាបពីរ\u00bb) ដូច្នេះពេលពួកវាជ្រុះពីពាល ពួកវាបង្វិលដូចស្លាបហេលីកុបទ័រ ជិះខ្យល់ឆ្ងាយពីដើមមេ។"}
          accent={CANOPY}
          glow
        >
          <Callout
            k={k}
            Icon={Sun}
            labelEn="Tropical strategy"
            labelKh="យុទ្ធសាស្ត្រត្រូពិក"
            enTitle="A Cambodian forest giant is a sun-trap."
            khTitle="ដើមឈើយក្សកម្ពុជាគឺជាអន្ទាក់ពន្លឺព្រះអាទិត្យ។"
            enBody="In a hot, humid jungle, the limiting resource is not water — it is light, because the canopy above blocks almost all of it. Dipterocarps win by simply growing taller than everyone else, opening their giant leaves above the competition."
            khBody="ក្នុងព្រៃក្តៅ និងសើម ធនធានដែលកំណត់មិនមែនជាទឹកទេ — គឺជាពន្លឺ ព្រោះពាលខាងលើបិទស្ទើរតែទាំងអស់។ ដើមឈើជ័រដ្បូងឈ្នះដោយគ្រាន់តែដុះខ្ពស់ជាងអ្នកដទៃទាំងអស់ បើកស្លឹកយក្សរបស់វានៅពីលើការប្រកួតប្រជែង។"
            accent={CANOPY}
          />
        </ConceptCard>
      </div>

      {/* Reproduction — Flowers */}
      <ConceptCard
        k={k}
        Icon={Flower2}
        enName="Flowers, Pollen, and the Bribery of Insects"
        khName="ផ្កា លំអងផ្កា និងការបន្លំសត្វល្អិត"
        enTag="how a rooted thing has children"
        khTag="របៀបដែលរបស់ដែលជាប់នឹងដី មានកូន"
        enBody="A plant has a problem its parents never solved: it is rooted to one spot. To make seeds, the male part of one flower has to deliver its tiny grains of pollen to the female part of another flower — and the plant cannot walk over to do it. So flowers became the cleverest sales display in the history of biology. Their bright petals, their sweet smell, and the drop of free sugar (nectar) inside are all advertisements aimed at insects, birds, and bats. The visitor lands to drink the nectar, accidentally gets pollen stuck to its body, then carries that pollen to the next flower it visits. The plant pays a small bribe in sugar; in return it gets a free delivery service. The fertilised flower then grows a seed wrapped in fruit, which animals eat and spread far away — another bribe, another delivery."
        khBody="រុក្ខជាតិមានបញ្ហាមួយដែលមាតាបិតារបស់វាមិនដែលដោះស្រាយ ៖ វាជាប់នឹងកន្លែងមួយ។ ដើម្បីបង្កើតគ្រាប់ ផ្នែកឈ្មោលនៃផ្កាមួយ ត្រូវបញ្ជូនគ្រាប់លំអងផ្កាតូចៗរបស់វា ទៅផ្នែកញីនៃផ្កាមួយផ្សេងទៀត — ហើយរុក្ខជាតិមិនអាចដើរទៅធ្វើវាបានទេ។ ដូច្នេះផ្កាបានក្លាយទៅជាការបង្ហាញលក់ដ៏ឆ្លាតវៃបំផុតក្នុងប្រវត្តិសាស្ត្រនៃជីវវិទ្យា។ ត្របកផ្ការស់ស្វាង ក្លិនឈ្ងុយឆ្ងាញ់ និងដំណក់ស្ករឥតគិតថ្លៃ (ទឹកដម) នៅខាងក្នុង គឺសុទ្ធតែជាការផ្សាយពាណិជ្ជកម្មសម្តៅសត្វល្អិត បក្សី និងប្រចៀវ។ អ្នកមកលើដើម្បីផឹកទឹកដម ដោយចៃដន្យលំអងផ្កាជាប់នឹងរាងកាយរបស់វា បន្ទាប់មកនាំយកលំអងផ្កានោះទៅផ្កាបន្ទាប់ដែលវាមកលើ។ រុក្ខជាតិបង់សំណូកតិចតួចជាស្ករ ៖ ជាថ្នូរវានឹងទទួលបានសេវាដឹកជញ្ជូនឥតគិតថ្លៃ។ ផ្ការត្រូវបានបង្កកំណើត បន្ទាប់មកដុះគ្រាប់រុំក្នុងផ្លែឈើ ដែលសត្វញ៉ាំ និងផ្សព្វផ្សាយឆ្ងាយ — សំណូកមួយផ្សេងទៀត ការដឹកជញ្ជូនមួយផ្សេងទៀត។"
        accent={MOSS}
        glow
        badge={{ en: "Co-evolution", kh: "ការវិវត្តរួម" }}
      >
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { Icon: Flower2, en: "1 · Display",  kh: "១ · បង្ហាញ", enBody: "Bright petals + sweet smell advertise free nectar.", khBody: "ត្របកផ្ការស់ស្វាង + ក្លិនឈ្ងុយ ផ្សាយទឹកដមឥតគិតថ្លៃ។" },
            { Icon: Bug,     en: "2 · Bribe",    kh: "២ · សំណូក", enBody: "An insect lands to drink — pollen sticks to its body.", khBody: "សត្វល្អិតមកលើដើម្បីផឹក — លំអងជាប់នឹងរាងកាយវា។" },
            { Icon: Sprout,  en: "3 · Delivery", kh: "៣ · ការដឹកជញ្ជូន", enBody: "Insect flies on, drops pollen on next flower → seeds form inside fruit.", khBody: "សត្វល្អិតហោះតទៅ ទម្លាក់លំអងលើផ្កាបន្ទាប់ → គ្រាប់ផ្តើមបង្កើតក្នុងផ្លែ។" },
          ].map((step, i) => {
            const Icon = step.Icon;
            return (
              <div
                key={i}
                className="rounded-xl p-3 border bg-white"
                style={{ borderColor: `${MOSS}44` }}
                data-testid={`pollen-step-${i}`}
              >
                <Icon className="w-5 h-5 mb-2" style={{ color: MOSS }} />
                <div className={`text-sm font-bold mb-1 ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? step.kh : step.en}
                </div>
                <div className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {k ? step.khBody : step.enBody}
                </div>
              </div>
            );
          })}
        </div>
      </ConceptCard>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 04 — The Wood Wide Web
// ════════════════════════════════════════════════════════════════════════════

function SectionWoodWideWeb({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-wood-wide-web">
      <SectionHeader
        spec="04"
        en="The Wood Wide Web"
        kh="បណ្តាញប្រាស្រ័យទាក់ទងនៃព្រៃឈើ"
        k={k}
        Icon={Network}
        accent={SOIL}
      />

      <ConceptCard
        k={k}
        Icon={Network}
        enName="Mycorrhizae · The Forest's Internet"
        khName="មីកូរ៉ីហ្ស៊ែ · អ៊ីនធើណិតនៃព្រៃ"
        enTag="trees do not have brains, but they do have a network"
        khTag="ដើមឈើគ្មានខួរក្បាល ប៉ុន្តែវាមានបណ្តាញ"
        enBody={"Beneath your feet in any healthy forest, there is a second forest — invisible, woven out of fungal threads thinner than human hair. These networks, called mycorrhizae, wrap themselves around tree roots and stitch one tree to the next, sometimes over hundreds of metres. The fungus gives the tree extra water and minerals it could never reach on its own; the tree pays the fungus back with sugar from photosynthesis. But the truly amazing discovery is what happens between trees: through this hidden network, a giant old \u201Cmother tree\u201D can pump sugar to a young sapling that is too shaded to feed itself, and a tree under attack from caterpillars can release chemical warning signals that other trees pick up and use to start producing defensive bitter-tasting compounds before they are even bitten. A forest is not a crowd of individuals. It is one quiet conversation."}
        khBody={"នៅក្រោមជើងរបស់អ្នក ក្នុងព្រៃដែលមានសុខភាពល្អ មានព្រៃទីពីរ — មើលមិនឃើញ ត្បាញពីសរសៃផ្សិតស្តើងជាងសក់មនុស្ស។ បណ្តាញទាំងនេះ ហៅថា មីកូរ៉ីហ្ស៊ែ រុំខ្លួនជុំវិញឫសដើមឈើ និងដេរដើមឈើមួយទៅដើមមួយទៀត ពេលខ្លះលើសពីរយម៉ែត្រ។ ផ្សិតផ្តល់ឲ្យដើមឈើនូវទឹក និងសារធាតុរ៉ែបន្ថែម ដែលវាមិនអាចទៅដល់ដោយខ្លួនឯង ៖ ដើមឈើបង់ផ្សិតវិញនូវស្ករពីរស្មីសំយោគ។ ប៉ុន្តែការរកឃើញដែលអស្ចារ្យពិតប្រាកដ គឺអ្វីដែលកើតឡើងរវាងដើមឈើ ៖ តាមរយៈបណ្តាញលាក់នេះ \u00abដើមឈើមេ\u00bb ចាស់ដ៏ធំ អាចបញ្ចូលស្ករទៅដើមឈើតូចមួយ ដែលមានម្លប់ច្រើនពេកដើម្បីចិញ្ចឹមខ្លួនវាបាន ហើយដើមឈើដែលរងការវាយប្រហារពីដង្កូវ អាចបញ្ចេញសញ្ញាព្រមានគីមី ដែលដើមឈើដទៃចាប់យក និងប្រើដើម្បីចាប់ផ្តើមផលិតសារធាតុជូរល្វីងការពារ មុនពេលពួកវាត្រូវខាំ។ ព្រៃមួយមិនមែនជាហ្វូងបុគ្គលនោះទេ។ វាគឺជាការសន្ទនាស្ងៀមៗតែមួយ។"}
        accent={SOIL}
        glow
        badge={{ en: "Hidden network", kh: "បណ្តាញលាក់" }}
      >
        <div className="grid sm:grid-cols-2 gap-3">
          <Callout
            k={k}
            Icon={Sparkles}
            labelEn="Mother tree"
            labelKh="ដើមឈើមេ"
            enTitle="The oldest trees feed the youngest."
            khTitle="ដើមឈើចាស់បំផុត ចិញ្ចឹមដើមឈើក្មេងបំផុត។"
            enBody="Suzanne Simard, a Canadian forest ecologist, used radioactive tracers to prove that giant old Douglas firs were sending sugar through the fungal network to small saplings standing in their shade. The forest was raising its own children."
            khBody="សូហ្សាន ស៊ីម៉ាដ អ្នកវិទ្យាសាស្ត្រអេកូរុក្ខជាតិកាណាដា បានប្រើដាននៃវិទ្យុសកម្មដើម្បីបង្ហាញថា ដើមផែនធើដាក្លាសយក្សចាស់ កំពុងបញ្ជូនស្ករតាមរយៈបណ្តាញផ្សិតទៅដើមឈើតូចៗដែលឈរក្នុងម្លប់របស់វា។ ព្រៃកំពុងចិញ្ចឹមកូនរបស់វាផ្ទាល់។"
            accent={CANOPY}
          />
          <Callout
            k={k}
            Icon={AlertTriangle}
            labelEn="Chemical warnings"
            labelKh="ការព្រមានគីមី"
            enTitle="A bitten tree warns its neighbours."
            khTitle="ដើមឈើដែលត្រូវខាំ ព្រមានអ្នកជិតខាងរបស់វា។"
            enBody="When acacia trees are eaten by caterpillars, they release a chemical signal into the air and into the fungal network. Trees that have not yet been attacked detect the signal and immediately start producing bitter tannins in their leaves, so when the caterpillars arrive the meal has already gone sour."
            khBody="នៅពេលដើមអាកាស៊ាត្រូវបានដង្កូវញ៉ាំ វាបញ្ចេញសញ្ញាគីមីចូលក្នុងខ្យល់ និងចូលក្នុងបណ្តាញផ្សិត។ ដើមឈើដែលមិនទាន់ត្រូវបានវាយប្រហារ ចាប់សញ្ញានោះ ហើយចាប់ផ្តើមផលិតតាន់នីនជូរក្នុងស្លឹករបស់វាភ្លាមៗ ដូច្នេះពេលដង្កូវមកដល់ អាហារបានជូរទៅហើយ។"
            accent={ROSE}
          />
        </div>
      </ConceptCard>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 05 — Tree Diseases & Burls
// ════════════════════════════════════════════════════════════════════════════

function SectionBurls({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-2" data-testid="section-burls">
      <SectionHeader
        spec="05"
        en="Tree Diseases & Burls"
        kh="ជំងឺរុក្ខជាតិ និងដុំសាច់"
        k={k}
        Icon={Layers}
        accent={ROSE}
      />

      <ConceptCard
        k={k}
        Icon={Layers}
        enName="Burls · A Tree's Tumour"
        khName="ដុំសាច់ឈើ · ដុំពកនៃដើមឈើ"
        enTag="when wood cells multiply out of control"
        khTag="ពេលកោសិកាឈើបែងចែកដោយឥតគ្រប់គ្រង"
        enBody={"You may have seen them in the jungle: huge twisted lumps of wood bulging from the side of a healthy-looking trunk, sometimes the size of a person. These are burls. They form when a tree is infected by certain bacteria \u2014 most famously Agrobacterium \u2014 or by viruses, fungi, or insect injuries that confuse the tree's growth signals. The infected cells lose their normal instructions and start dividing again and again, with no off-switch. The tree responds by simply growing a new, chaotic mass of wood around the infection. In animals, this kind of uncontrolled cell growth is what we call cancer, and it is usually deadly because cancer cells travel through the bloodstream and seed new tumours in distant organs. But a tree has no flowing blood. Its xylem and phloem are quiet, slow, one-way pipes. So the rogue cells are stuck where they started, and the tree simply walls them off and keeps living \u2014 sometimes for centuries. The burl is the scar of an old battle the tree has already won."}
        khBody="អ្នកប្រហែលជាបានឃើញវានៅក្នុងព្រៃ ៖ ដុំឈើក្រាស់ស្មុគស្មាញដ៏ធំ ដែលលៀននៅសងខាងបន្តូបដែលមើលទៅមានសុខភាពល្អ ពេលខ្លះធំស្មើនឹងមនុស្សម្នាក់។ ទាំងនេះគឺជាដុំសាច់ឈើ។ វាបង្កើតឡើងនៅពេលដើមឈើរងការឆ្លងពីបាក់តេរីមួយចំនួន — ល្បីបំផុតគឺ Agrobacterium — ឬពីវីរុស ផ្សិត ឬរបួសសត្វល្អិត ដែលធ្វើឲ្យសញ្ញាដុះរបស់ដើមឈើច្រឡំ។ កោសិកាដែលឆ្លងបាត់បង់ការណែនាំធម្មតារបស់វា ហើយចាប់ផ្តើមបែងចែកម្តងហើយម្តងទៀត ដោយគ្មានកុងតាក់បិទ។ ដើមឈើឆ្លើយតបដោយគ្រាន់តែដុះដុំឈើថ្មី និងចលាចលជុំវិញការឆ្លង។ ក្នុងសត្វ ការដុះកោសិកាដោយឥតគ្រប់គ្រងបែបនេះ គឺជាអ្វីដែលយើងហៅថាមហារីក ហើយវាជារឿយៗស្លាប់ ព្រោះកោសិកាមហារីកធ្វើដំណើរតាមឈាម និងចាប់ផ្តើមដុំថ្មីៗនៅសរីរាង្គឆ្ងាយ។ ប៉ុន្តែដើមឈើគ្មានឈាមហូរទេ។ ស៊ីឡែម និងផ្លូអែមរបស់វាគឺជាបំពង់ស្ងៀម យឺត ហូរទិសតែមួយ។ ដូច្នេះកោសិកាបះបោរត្រូវជាប់នៅកន្លែងដែលវាចាប់ផ្តើម ហើយដើមឈើគ្រាន់តែដាក់ជញ្ជាំងព័ទ្ធជុំវិញវា ហើយបន្តរស់នៅ — ពេលខ្លះរយៈពេលរាប់សតវត្ស។ ដុំសាច់ឈើ គឺជាស្នាមរបួសនៃសមរភូមិចាស់ដែលដើមឈើបានឈ្នះរួចទៅហើយ។"
        accent={ROSE}
        glow
        badge={{ en: "Localised tumour", kh: "ដុំពកមានទីតាំង" }}
      >
        <div className="grid sm:grid-cols-2 gap-3">
          <Callout
            k={k}
            Icon={AlertTriangle}
            labelEn="Why it doesn't kill the tree"
            labelKh="ហេតុអ្វីវាមិនសម្លាប់ដើមឈើ"
            enTitle="No bloodstream, no metastasis."
            khTitle="គ្មានឈាមហូរ គ្មានការរីករាលដាល។"
            enBody="In an animal, cancer kills mostly because cells break loose, ride the blood to distant organs, and seed new tumours there. A tree has no circulating blood. Whatever rogue cells form in the trunk stay in the trunk. The tree wraps them in fresh wood and keeps growing right past the wound."
            khBody="ក្នុងសត្វ មហារីកសម្លាប់ភាគច្រើនព្រោះកោសិការួចខ្លួន ជិះឈាមទៅសរីរាង្គឆ្ងាយ និងចាប់ផ្តើមដុំថ្មីៗនៅទីនោះ។ ដើមឈើគ្មានឈាមចរាចរទេ។ កោសិកាបះបោរណាមួយដែលបង្កើតក្នុងបន្តូប នៅតែក្នុងបន្តូប។ ដើមឈើរុំវាដោយឈើថ្មី ហើយបន្តដុះកាត់របួសនោះ។"
            accent={ROSE}
          />
          <Callout
            k={k}
            Icon={Sparkles}
            labelEn="A second life"
            labelKh="ជីវិតទីពីរ"
            enTitle="Burls are prized by woodworkers."
            khTitle="ដុំសាច់ឈើ ត្រូវបានយកចិត្តទុកដាក់ដោយជាងឈើ។"
            enBody="Because the chaotic growth twists the wood grain in beautiful, swirling patterns, burls are some of the most valuable timber on Earth. A single large burl from a teak or rosewood tree can be carved into bowls, tables, or musical instruments worth more than the rest of the trunk combined. The tree's old illness becomes the artisan's most beautiful material."
            khBody="ដោយសារការដុះចលាចលធ្វើឲ្យគ្រាប់ឈើបង្វិលជាគំរូស្អាត និងវិល ដុំសាច់ឈើគឺជាឈើដែលមានតម្លៃបំផុតមួយចំនួននៅលើផែនដី។ ដុំសាច់ឈើធំមួយពីដើមម៉ៃសាក់ ឬដើមហ្វ្រាហ្វក់ អាចត្រូវឆ្លាក់ជាចាន តុ ឬឧបករណ៍តន្ត្រី ដែលមានតម្លៃច្រើនជាងបន្តូបនៅសល់រួមគ្នា។ ជំងឺចាស់របស់ដើមឈើ ក្លាយជាសម្ភារៈដ៏ស្អាតបំផុតរបស់ជាងសិប្បកម្ម។"
            accent={SUN}
          />
        </div>

        <p className={`mt-4 text-xs text-slate-600 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <strong className={k ? "" : "font-bold"}>{t("Worth knowing: ", "គួរដឹង ៖ ")}</strong>
          {t(
            "Agrobacterium is so good at injecting its own DNA into plant cells that biologists now use it as a tool — a kind of natural needle — to create the genetically-modified crops you read about in the news. The same trick that gives a tree a burl in the forest, gives us pest-resistant rice in the lab.",
            "បាក់តេរី Agrobacterium ពូកែខ្លាំងណាស់ក្នុងការចាក់ DNA របស់ខ្លួនចូលក្នុងកោសិការុក្ខជាតិ ដែលអ្នកជីវវិទូឥឡូវប្រើវាជាឧបករណ៍ — ម្ជុលធម្មជាតិមួយប្រភេទ — ដើម្បីបង្កើតដំណាំកែប្រែហ្សែនិច ដែលអ្នកអានក្នុងព័ត៌មាន។ ល្បិចដូចគ្នាដែលផ្តល់ដុំសាច់ឈើដល់ដើមឈើក្នុងព្រៃ ផ្តល់ឲ្យយើងនូវស្រូវធន់នឹងសត្វល្អិតក្នុងមន្ទីរពិសោធន៍។"
          )}
        </p>
      </ConceptCard>
    </section>
  );
}
