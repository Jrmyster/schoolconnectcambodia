import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowUp,
  Atom,
  Box,
  Brain,
  ChevronsUp,
  Cog,
  Footprints,
  Layers,
  Mountain,
  Quote,
  Radio,
  ScanLine,
  Send,
  Sparkles,
  TrendingUp,
  Wand2,
  Zap,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  PHYS-MOV-01 · Moving Humanity: From Stairs to Teleportation
//                ចលនាមនុស្សជាតិ៖ ពីជណ្ដើរ ដល់ការបញ្ជូនរូបធាតុ
//
//  1. The Human Engine          · Stairs (inclined plane)
//  2. The Mechanical Ascent     · Elevators (counterweight) + Escalators
//  3. The Quantum Leap          · Teleportation + the philosophical question
//
//  Aesthetic: progressive — warm stone/wood at the top flowing into cool
//             industrial steel in the middle, then a deep neon void of cyan
//             and violet for the quantum future at the bottom.
// ════════════════════════════════════════════════════════════════════════════

// ─── Section 1 · Stone & Wood ───────────────────────────────────────────────
const PARCH       = "#f5efe4";
const PARCH_DEEP  = "#e9dfc7";
const WOOD        = "#92400e";
const WOOD_DEEP   = "#7c2d12";
const STONE_WARM  = "#78716c";
const RULE_PARCH  = "#d6cfc2";

// ─── Section 2 · Industrial Steel ───────────────────────────────────────────
const STEEL       = "#475569";
const STEEL_DEEP  = "#1e293b";
const STEEL_SOFT  = "#e2e8f0";
const ELECTRIC    = "#f59e0b";   // sparking electric amber
const ELECTRIC_DEEP = "#b45309";

// ─── Section 3 · Quantum Neon Void ──────────────────────────────────────────
const VOID        = "#080813";
const VOID_2      = "#11122a";
const NEON_CYAN   = "#22d3ee";
const NEON_VIOL   = "#a855f7";
const NEON_PINK   = "#f472b6";

// ─── Shared ─────────────────────────────────────────────────────────────────
const INK         = "#0f172a";
const INK_SOFT    = "#475569";
const RULE        = "#e2e8f0";

// Whole-page progressive background — warm sand at the top, cool slate in the
// middle, deep neon void at the bottom.
const FRAME: React.CSSProperties = {
  background:
    `linear-gradient(180deg,` +
    `  ${PARCH}    0%,` +
    `  ${PARCH}    18%,` +
    `  ${STEEL_SOFT} 38%,` +
    `  #cbd5e1     55%,` +
    `  ${STEEL_DEEP} 72%,` +
    `  ${VOID_2}   85%,` +
    `  ${VOID}     100%)`,
};

type T = (en: string, kh: string) => string;
type IconCmp = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

// ─── Section header ────────────────────────────────────────────────────────

function SectionHeader({
  spec,
  en,
  kh,
  k,
  Icon,
  accent,
  onDark = false,
}: {
  spec: string;
  en: string;
  kh: string;
  k: boolean;
  Icon: IconCmp;
  accent: string;
  onDark?: boolean;
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
        style={{ color: onDark ? "#ffffff" : INK }}
      >
        {k ? kh : en}
      </h2>
      <div
        className="flex-1 border-t border-dashed"
        style={{ borderColor: onDark ? `${NEON_CYAN}55` : RULE }}
      />
    </div>
  );
}

// ─── Hero stat (warm, top of page) ─────────────────────────────────────────

function HeroStat({
  k,
  accent,
  enValue,
  khValue,
  enLabel,
  khLabel,
  Icon,
}: {
  k: boolean;
  accent: string;
  enValue: string;
  khValue: string;
  enLabel: string;
  khLabel: string;
  Icon: IconCmp;
}) {
  return (
    <div
      className="rounded-2xl border-2 px-3 py-3 bg-white text-center shadow-sm"
      style={{ borderColor: `${accent}55` }}
    >
      <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: accent }} />
      <div
        className={`font-extrabold text-lg sm:text-xl leading-none ${k ? "font-khmer" : ""}`}
        style={{ color: accent }}
      >
        {k ? khValue : enValue}
      </div>
      <div
        className={`text-[10px] sm:text-[11px] mt-1.5 ${k ? "font-khmer leading-loose" : "leading-snug"}`}
        style={{ color: INK_SOFT }}
      >
        {k ? khLabel : enLabel}
      </div>
    </div>
  );
}

// ─── Transit Method Card ──────────────────────────────────────────────────
//   Three visual variants matching the page's progressive aesthetic:
//   "wood" (parchment + carved wood), "steel" (brushed industrial steel),
//   and "neon" (deep void with glowing cyan/violet edges).

type Spec = { labelEn: string; labelKh: string; valueEn: string; valueKh: string; Icon: IconCmp };

function TransitMethodCard({
  k,
  testId,
  variant,
  Icon,
  enName,
  khName,
  enTagline,
  khTagline,
  enBody,
  khBody,
  specs,
  enInsight,
  khInsight,
  enInsightLabel,
  khInsightLabel,
  InsightIcon,
}: {
  k: boolean;
  testId: string;
  variant: "wood" | "steel" | "neon";
  Icon: IconCmp;
  enName: string;
  khName: string;
  enTagline: string;
  khTagline: string;
  enBody: string;
  khBody: string;
  specs: Spec[];
  enInsight: string;
  khInsight: string;
  enInsightLabel: string;
  khInsightLabel: string;
  InsightIcon: IconCmp;
}) {
  const isWood  = variant === "wood";
  const isSteel = variant === "steel";
  const isNeon  = variant === "neon";

  const accent     = isWood ? WOOD     : isSteel ? ELECTRIC     : NEON_CYAN;
  const accentDeep = isWood ? WOOD_DEEP : isSteel ? ELECTRIC_DEEP : NEON_VIOL;
  const cardBg     = isWood ? PARCH    : isSteel ? "#ffffff"     : VOID;
  const textCol    = isNeon ? "#ffffff" : INK;
  const textSoft   = isNeon ? "#cbd5e1" : INK_SOFT;
  const stripPattern = isWood
    ? `repeating-linear-gradient(90deg, ${WOOD_DEEP} 0 8px, ${WOOD} 8px 22px, ${WOOD_DEEP} 22px 30px)`
    : isSteel
      ? `repeating-linear-gradient(90deg, ${STEEL} 0 14px, ${STEEL_DEEP} 14px 28px)`
      : `linear-gradient(90deg, ${NEON_VIOL}, ${NEON_CYAN}, ${NEON_PINK})`;

  return (
    <article
      data-testid={testId}
      className="relative rounded-3xl border-2 overflow-hidden flex flex-col h-full"
      style={{
        backgroundColor: cardBg,
        borderColor: isNeon ? `${NEON_CYAN}88` : `${accent}66`,
        boxShadow: isNeon
          ? `0 0 0 1px ${NEON_VIOL}33, 0 18px 50px -18px ${NEON_VIOL}aa, 0 0 80px -20px ${NEON_CYAN}55`
          : `0 16px 32px -22px ${accent}55`,
      }}
    >
      {/* Top accent strip — wood grain / steel brushing / neon spectrum */}
      <div className="relative h-3 w-full" style={{ background: stripPattern }} aria-hidden="true" />

      {/* Optional neon-glow ambient layer for the quantum card */}
      {isNeon && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              `radial-gradient(circle at 15% 20%, ${NEON_VIOL}33, transparent 45%),` +
              `radial-gradient(circle at 85% 90%, ${NEON_CYAN}33, transparent 45%)`,
          }}
        />
      )}

      <div className="relative px-5 pt-5 pb-5 flex flex-col gap-4 flex-1">
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor: isNeon ? `${NEON_CYAN}1a` : `${accent}1a`,
              border: `2px solid ${isNeon ? NEON_CYAN : accent}66`,
              boxShadow: isNeon ? `0 0 24px -6px ${NEON_CYAN}88` : "none",
            }}
          >
            <Icon className="w-7 h-7" style={{ color: isNeon ? NEON_CYAN : accent }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-bold text-lg sm:text-xl leading-tight ${k ? "font-khmer" : ""}`}
              style={{ color: textCol }}
            >
              {k ? khName : enName}
            </h3>
            <div
              className={`text-[12px] mt-0.5 ${k ? "font-khmer leading-loose" : "italic"}`}
              style={{ color: isNeon ? NEON_CYAN : accentDeep }}
            >
              {k ? khTagline : enTagline}
            </div>
          </div>
        </div>

        <p
          className={`text-sm sm:text-[15px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: textSoft }}
        >
          {k ? khBody : enBody}
        </p>

        {/* Specs strip */}
        <div className="flex flex-col gap-2">
          {specs.map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-2.5 flex items-start gap-2.5"
              style={{
                backgroundColor: isNeon ? `${NEON_VIOL}14` : isWood ? "#ffffffaa" : STEEL_SOFT,
                border: `1px solid ${isNeon ? `${NEON_CYAN}55` : isWood ? RULE_PARCH : RULE}`,
              }}
            >
              <div
                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: isNeon ? VOID_2 : "#ffffff",
                  border: `1px solid ${isNeon ? `${NEON_CYAN}77` : `${accent}66`}`,
                }}
              >
                <s.Icon className="w-3.5 h-3.5" style={{ color: isNeon ? NEON_CYAN : accent }} />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={`text-[10px] font-bold uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}
                  style={{ color: isNeon ? NEON_PINK : accentDeep }}
                >
                  {k ? s.labelKh : s.labelEn}
                </div>
                <div
                  className={`text-[12px] sm:text-[13px] ${k ? "font-khmer leading-loose" : "leading-snug"}`}
                  style={{ color: textCol }}
                >
                  {k ? s.valueKh : s.valueEn}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insight band — physics/engineering takeaway */}
        <div
          className="rounded-xl p-3 flex items-start gap-2.5 mt-auto"
          style={{
            backgroundColor: isNeon
              ? `${NEON_VIOL}24`
              : isSteel
                ? `${ELECTRIC}1a`
                : `${WOOD}14`,
            border: `1.5px solid ${isNeon ? NEON_VIOL : accent}`,
            boxShadow: isNeon ? `0 0 18px -4px ${NEON_VIOL}88` : "none",
          }}
        >
          <div
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: isNeon ? VOID : "#ffffff",
              border: `1px solid ${isNeon ? `${NEON_VIOL}99` : `${accent}88`}`,
            }}
          >
            <InsightIcon className="w-4 h-4" style={{ color: isNeon ? NEON_PINK : accentDeep }} />
          </div>
          <div className="min-w-0">
            <div
              className={`text-[10px] font-bold uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}
              style={{ color: isNeon ? NEON_PINK : accentDeep }}
            >
              {k ? khInsightLabel : enInsightLabel}
            </div>
            <div
              className={`text-[13px] ${k ? "font-khmer leading-loose" : "leading-snug"}`}
              style={{ color: textCol }}
            >
              {k ? khInsight : enInsight}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function MovingHumanityPage() {
  const language = useLanguageStore((s) => s.language);
  const k = language === "kh";
  const T: T = (en, kh) => (k ? kh : en);

  return (
    <div className="min-h-screen pt-8 sm:pt-12 pb-20 px-4 sm:px-6" style={FRAME}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm mb-6 hover:underline ${k ? "font-khmer" : ""}`}
          style={{ color: WOOD_DEEP }}
          data-testid="moving-humanity-back-link"
        >
          <ArrowLeft className="w-4 h-4" />
          {T("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <header className="mb-12 relative">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-md px-2.5 py-1 text-white"
              style={{ backgroundColor: WOOD_DEEP }}
            >
              PHYS-MOV-01
            </span>
            <span
              className={`text-[11px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
              style={{ color: STONE_WARM }}
            >
              {T("Study Center · Physics & Technology", "មជ្ឈមណ្ឌលសិក្សា · រូបវិទ្យា និងបច្ចេកវិទ្យា")}
            </span>
            <Atom className="w-4 h-4" style={{ color: WOOD }} aria-hidden="true" />
          </div>
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-2 ${k ? "font-khmer leading-snug" : ""}`}
            style={{ color: INK }}
            data-testid="moving-humanity-title"
          >
            {T("Moving Humanity", "ចលនាមនុស្សជាតិ")}
          </h1>
          <h2
            className={`text-xl sm:text-2xl font-semibold mb-4 ${k ? "font-khmer leading-snug" : ""}`}
            style={{ color: WOOD_DEEP }}
          >
            {T("From Stairs to Teleportation", "ពីជណ្ដើរ ដល់ការបញ្ជូនរូបធាតុ")}
          </h2>
          <p
            className={`text-base sm:text-lg max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK_SOFT }}
          >
            {T(
              "Every act of transport is a quiet conversation with gravity, friction, and the speed of light. From the first stone steps carved into a hillside to the science-fiction dream of beaming a person across the planet, this is the story of how humans keep finding cleverer ways to be somewhere they are not.",
              "រាល់សកម្មភាពនៃការដឹកជញ្ជូន គឺជាការសន្ទនាស្ងាត់ៗជាមួយទំនាញ កកិត និងល្បឿនពន្លឺ។ ចាប់ពីជណ្ដើរថ្មដំបូងគេដែលឆ្លាក់នៅលើភ្នំទាប រហូតដល់សុបិន្តវិទ្យាសាស្ត្រកាល្បនិកនៃការបញ្ជូនមនុស្សម្នាក់ឆ្លងកាត់ផែនដី នេះជារឿងរ៉ាវអំពីរបៀបដែលមនុស្សបន្តរកវិធីដ៏ឆ្លាតវៃជាងមុន ដើម្បីទៅដល់កន្លែងដែលខ្លួនមិននៅ។",
            )}
          </p>

          {/* Hero milestone strip */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl">
            <HeroStat
              k={k}
              accent={WOOD}
              Icon={Footprints}
              enValue="6,000+ yrs"
              khValue="៦,០០០+ ឆ្នាំ"
              enLabel="Stone stairs in human use"
              khLabel="ជណ្ដើរថ្មត្រូវបានប្រើប្រាស់"
            />
            <HeroStat
              k={k}
              accent={ELECTRIC}
              Icon={Box}
              enValue="1853"
              khValue="១៨៥៣"
              enLabel="Otis safe elevator demo"
              khLabel="ការបង្ហាញជណ្ដើរយន្តសុវត្ថិភាព Otis"
            />
            <HeroStat
              k={k}
              accent={NEON_VIOL}
              Icon={Atom}
              enValue="1998"
              khValue="១៩៩៨"
              enLabel="First quantum teleportation"
              khLabel="ការបញ្ជូនរូបធាតុកង់ទិចលើកដំបូង"
            />
          </div>
        </header>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 1 · THE HUMAN ENGINE — STAIRS
        ════════════════════════════════════════════════════════════════ */}
        <section
          id="human-engine"
          data-testid="section-human-engine"
          className="scroll-mt-24 mb-14"
        >
          <SectionHeader
            spec="01"
            en="The Human Engine — Stairs"
            kh="ម៉ាស៊ីនមនុស្ស — ជណ្ដើរ"
            k={k}
            Icon={Footprints}
            accent={WOOD}
          />

          <div
            className="rounded-3xl p-5 sm:p-6 border-2 mb-5"
            style={{
              backgroundColor: PARCH,
              borderColor: RULE_PARCH,
              boxShadow: `0 12px 30px -22px ${WOOD}55`,
            }}
          >
            <p
              className={`text-base sm:text-lg ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK }}
            >
              <span className="font-bold" style={{ color: WOOD_DEEP }}>
                {T(
                  "Before any motor, there were legs.",
                  "មុនពេលមានម៉ាស៊ីនណាមួយ មានជើងជាមុនសិន។",
                )}
              </span>{" "}
              {T(
                "Stairs are the oldest piece of vertical-transport technology humans ever invented — a way of climbing a hill or a temple wall using nothing but our own muscles and the simple physics of the inclined plane.",
                "ជណ្ដើរ គឺជាបច្ចេកវិទ្យាដឹកជញ្ជូនបញ្ឈរដ៏ចាស់បំផុតដែលមនុស្សធ្លាប់បង្កើត — ជាវិធីមួយក្នុងការឡើងលើភ្នំ ឬជញ្ជាំងប្រាសាទ ដោយប្រើតែសាច់ដុំរបស់យើងផ្ទាល់ និងរូបវិទ្យាដ៏សាមញ្ញនៃផ្ទៃជម្រាល។",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <TransitMethodCard
                k={k}
                testId="method-stairs"
                variant="wood"
                Icon={Footprints}
                enName="Stairs · ជណ្ដើរ"
                khName="ជណ្ដើរ · Stairs"
                enTagline="The inclined plane, broken into bite-sized steps"
                khTagline="ផ្ទៃជម្រាល បំបែកជាជំហានតូចៗ"
                enBody="A staircase is the world's oldest 'machine' for climbing. The physics is the same as walking up a long, gentle ramp — only it has been folded up like an accordion to fit into a small space. Each step is a tiny inclined plane that lets you trade horizontal distance for vertical lift. The total energy you spend reaching the top is exactly the same as climbing a steep cliff (your weight × the height). The stairs do not save energy — they save effort, by spreading that energy out across many small, controlled pushes that your legs can actually deliver."
                khBody="ជណ្ដើរ គឺជា 'ម៉ាស៊ីន' ដ៏ចាស់បំផុតរបស់ពិភពលោកសម្រាប់ការឡើង។ រូបវិទ្យាគឺដូចគ្នានឹងការដើរឡើងលើផ្លូវឡើងជម្រាលវែងស្រាល — គ្រាន់តែវាត្រូវបានបត់ដូចអាកូរ្ឌាង ដើម្បីសមនឹងកន្លែងតូច។ ជំហាននីមួយៗ គឺជាផ្ទៃជម្រាលតូចមួយ ដែលអនុញ្ញាតឱ្យអ្នកប្ដូរចម្ងាយផ្ដេក សម្រាប់ការលើកបញ្ឈរ។ ថាមពលសរុបដែលអ្នកចំណាយដើម្បីទៅដល់កំពូល គឺដូចនឹងការឡើងលើច្រាំងថ្មចោទដែរ (ទម្ងន់របស់អ្នក × កម្ពស់)។ ជណ្ដើរមិនសន្សំថាមពលទេ — ពួកវាសន្សំកម្លាំងអាក្រក់ ដោយការផ្សព្វផ្សាយថាមពលនោះតាមរយៈការរុញតូចៗច្រើនលើក ដែលជើងរបស់អ្នកអាចផ្ដល់បានពិតប្រាកដ។"
                specs={[
                  {
                    labelEn: "Physics principle",
                    labelKh: "គោលការណ៍រូបវិទ្យា",
                    valueEn: "The inclined plane — distance traded for force.",
                    valueKh: "ផ្ទៃជម្រាល — ចម្ងាយប្ដូរយកកម្លាំង។",
                    Icon: TrendingUp,
                  },
                  {
                    labelEn: "Energy source",
                    labelKh: "ប្រភពថាមពល",
                    valueEn: "100 % biological — the chemical energy in your food.",
                    valueKh: "១០០% ជីវសាស្ត្រ — ថាមពលគីមីក្នុងម្ហូបអាហាររបស់អ្នក។",
                    Icon: Footprints,
                  },
                  {
                    labelEn: "Trade-off",
                    labelKh: "ការផ្លាស់ប្ដូរ",
                    valueEn: "Spreads the same total work across many small, doable pushes.",
                    valueKh: "ពង្រាយការងារសរុបដូចគ្នាតាមរយៈការរុញតូចៗច្រើនលើក ដែលធ្វើបាន។",
                    Icon: Layers,
                  },
                ]}
                enInsight="Even a 60-storey skyscraper still has stairs in every fire escape — because human legs remain the single most reliable engine ever invented."
                khInsight="សូម្បីតែអគារខ្ពស់ ៦០ ជាន់ ក៏នៅតែមានជណ្ដើរនៅគ្រប់ច្រកចេញអគ្គីភ័យដែរ — ដោយសារជើងរបស់មនុស្សនៅតែជាម៉ាស៊ីនដែលអាចទុកចិត្តបានបំផុត ដែលធ្លាប់បង្កើត។"
                enInsightLabel="Why it still matters"
                khInsightLabel="ហេតុអ្វីវានៅតែសំខាន់"
                InsightIcon={Mountain}
              />
            </div>

            {/* Side note: small visual diagram of the inclined-plane idea */}
            <div
              className="rounded-3xl p-5 border-2 flex flex-col gap-3"
              style={{ backgroundColor: "#ffffff", borderColor: `${WOOD}55` }}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color: WOOD_DEEP }} />
                <h4
                  className={`font-bold text-base ${k ? "font-khmer" : ""}`}
                  style={{ color: INK }}
                >
                  {T("The Same Climb, Two Paths", "ការឡើងដូចគ្នា ផ្លូវពីរ")}
                </h4>
              </div>

              {/* tiny inline SVG diagram */}
              <svg viewBox="0 0 220 120" className="w-full h-auto">
                <defs>
                  <pattern id="hatchWood" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke={WOOD} strokeWidth="1" />
                  </pattern>
                </defs>
                {/* baseline */}
                <line x1="10" y1="105" x2="210" y2="105" stroke={STONE_WARM} strokeWidth="1.5" />
                {/* steep cliff */}
                <polygon points="40,105 40,30 95,30" fill="url(#hatchWood)" stroke={WOOD_DEEP} strokeWidth="1.5" />
                <text
                  x="22" y="22"
                  fontSize={k ? "10" : "9"}
                  fill={WOOD_DEEP}
                  fontFamily={k ? "inherit" : "monospace"}
                  className={k ? "font-khmer" : ""}
                >
                  {T("CLIFF", "ច្រាំងថ្ម")}
                </text>
                {/* gentle stairs */}
                <g stroke={WOOD_DEEP} strokeWidth="1.5" fill="none">
                  <polyline points="120,105 130,105 130,95 145,95 145,80 165,80 165,60 195,60 195,30 210,30" />
                </g>
                <text
                  x="120" y="22"
                  fontSize={k ? "10" : "9"}
                  fill={WOOD_DEEP}
                  fontFamily={k ? "inherit" : "monospace"}
                  className={k ? "font-khmer" : ""}
                >
                  {T("STAIRS", "ជណ្ដើរ")}
                </text>
                {/* both arrows reach same height */}
                <line x1="218" y1="30" x2="218" y2="105" stroke={STONE_WARM} strokeWidth="1" strokeDasharray="2 2" />
                <text
                  x={k ? "55" : "75"} y="118"
                  fontSize={k ? "9" : "8"}
                  fill={STONE_WARM}
                  fontFamily={k ? "inherit" : "monospace"}
                  className={k ? "font-khmer" : ""}
                >
                  {T("SAME HEIGHT · SAME WORK", "កម្ពស់ដូចគ្នា · ការងារដូចគ្នា")}
                </text>
              </svg>

              <p
                className={`text-[13px] ${k ? "font-khmer leading-loose" : "leading-snug"}`}
                style={{ color: INK_SOFT }}
              >
                {T(
                  "Both paths reach the same top with the same total energy. The stairs just split the work into pieces a human body can manage.",
                  "ផ្លូវទាំងពីរ ឈានដល់កំពូលដូចគ្នា ដោយប្រើថាមពលសរុបដូចគ្នា។ ជណ្ដើរគ្រាន់តែបំបែកការងារនេះជាបំណែកៗ ដែលរាងកាយមនុស្សអាចគ្រប់គ្រងបាន។",
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 2 · THE MECHANICAL ASCENT
        ════════════════════════════════════════════════════════════════ */}
        <section
          id="mechanical-ascent"
          data-testid="section-mechanical-ascent"
          className="scroll-mt-24 mb-14"
        >
          <SectionHeader
            spec="02"
            en="The Mechanical Ascent — Elevators & Escalators"
            kh="ការឡើងដោយប្រើម៉ាស៊ីន — ជណ្ដើរយន្ត"
            k={k}
            Icon={Cog}
            accent={ELECTRIC_DEEP}
          />

          <div
            className="rounded-3xl p-5 sm:p-6 border-2 mb-5 relative overflow-hidden"
            style={{
              backgroundColor: "#ffffff",
              borderColor: `${STEEL}55`,
              boxShadow: `0 12px 30px -22px ${STEEL_DEEP}55`,
            }}
          >
            <div className="flex items-start gap-3">
              <Cog className="flex-shrink-0 w-7 h-7 mt-0.5" style={{ color: ELECTRIC_DEEP }} />
              <p
                className={`text-base sm:text-lg ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
                style={{ color: INK }}
              >
                <span className="font-bold" style={{ color: ELECTRIC_DEEP }}>
                  {T(
                    "Once cities started growing upward, human legs were not enough.",
                    "ពេលដែលទីក្រុងចាប់ផ្ដើមរីកចម្រើនទៅលើ ជើងរបស់មនុស្សមិនគ្រប់គ្រាន់ទេ។",
                  )}
                </span>{" "}
                {T(
                  "Two beautifully clever inventions — the elevator and the escalator — let millions of people climb hundreds of metres without breaking a sweat. Each one tricks gravity in its own way.",
                  "ការច្នៃប្រឌិតដ៏ឆ្លាតវៃយ៉ាងស្រស់ស្អាត ២ យ៉ាង — ជណ្ដើរយន្តប្រអប់ និងជណ្ដើរយន្តរំកិល — អនុញ្ញាតឱ្យមនុស្សរាប់លាននាក់ ឡើងរយឬមដោយមិនបែកញើស។ ម្នាក់ៗបោកប្រាស់ទំនាញតាមផ្លូវរៀងៗខ្លួន។",
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Elevator */}
            <TransitMethodCard
              k={k}
              testId="method-elevator"
              variant="steel"
              Icon={Box}
              enName="Elevator · ជណ្ដើរយន្តប្រអប់"
              khName="ជណ្ដើរយន្តប្រអប់ · Elevator"
              enTagline="The genius of the counterweight"
              khTagline="ភាពប៉ិនប្រសប់នៃទម្ងន់ផ្ទុយ"
              enBody="An elevator looks simple — a box that goes up and down — but the secret is what you do not see. Hidden in the shaft, on the other end of a steel cable, is a 'counterweight' (ទម្ងន់ផ្ទុយ) that weighs roughly the same as the empty box plus about half its full load. When the box goes up, the counterweight goes down, and vice-versa. The motor only has to deal with the difference. That is why a single small electric motor can lift dozens of people forty floors using surprisingly little electricity — most of the work is done by gravity pulling the counterweight down for free."
              khBody="ជណ្ដើរយន្តប្រអប់ មើលទៅសាមញ្ញ — ប្រអប់មួយឡើងចុះ — ប៉ុន្តែអាថ៌កំបាំងគឺនៅអ្វីដែលអ្នកមើលមិនឃើញ។ លាក់នៅក្នុងប្រឡោះ នៅចុងផ្សេងទៀតនៃខ្សែដែក គឺ 'ទម្ងន់ផ្ទុយ' (counterweight) ដែលមានទម្ងន់ប្រហែលស្មើនឹងប្រអប់ទទេ បូកនឹងប្រហែលពាក់កណ្ដាលនៃផ្ទុកពេញ។ ពេលប្រអប់ឡើងលើ ទម្ងន់ផ្ទុយចុះក្រោម និងផ្ទុយមកវិញ។ ម៉ូទ័រត្រូវដោះស្រាយតែភាពខុសគ្នាប៉ុណ្ណោះ។ នោះហើយជាមូលហេតុដែលម៉ូទ័រអគ្គិសនីតូចមួយ អាចលើកមនុស្សរាប់សិបនាក់ ឡើង ៤០ ជាន់ ដោយប្រើអគ្គិសនីតិចតួចគួរឱ្យភ្ញាក់ផ្អើល — ការងារភាគច្រើនធ្វើឡើងដោយទំនាញ ដែលទាញទម្ងន់ផ្ទុយចុះក្រោមដោយឥតគិតថ្លៃ។"
              specs={[
                {
                  labelEn: "Trick",
                  labelKh: "ឧបាយកល",
                  valueEn: "Counterweight (~box weight + ½ load) on the other end of the cable.",
                  valueKh: "ទម្ងន់ផ្ទុយ (~ទម្ងន់ប្រអប់ + ½ ផ្ទុក) នៅចុងម្ខាងទៀតនៃខ្សែ។",
                  Icon: ChevronsUp,
                },
                {
                  labelEn: "Safety",
                  labelKh: "សុវត្ថិភាព",
                  valueEn: "Elisha Otis (1853) added the auto-locking brake — and the skyscraper became possible.",
                  valueKh: "Elisha Otis (១៨៥៣) បានបន្ថែមហ្វ្រាំងចាក់សោដោយស្វ័យប្រវត្តិ — ហើយអគារខ្ពស់ក្លាយជាអាចធ្វើទៅបាន។",
                  Icon: Zap,
                },
                {
                  labelEn: "Energy use",
                  labelKh: "ការប្រើប្រាស់ថាមពល",
                  valueEn: "Tiny — gravity does most of the lifting work for free.",
                  valueKh: "តិចតួច — ទំនាញធ្វើការងារលើកភាគច្រើនដោយឥតគិតថ្លៃ។",
                  Icon: ArrowUp,
                },
              ]}
              enInsight="Without the counterweight + auto-brake, modern cities of glass towers, hospitals, and apartment blocks would simply not exist."
              khInsight="ប្រសិនបើគ្មានទម្ងន់ផ្ទុយ + ហ្វ្រាំងស្វ័យប្រវត្តិ ទីក្រុងសម័យទំនើបនៃប៉មកញ្ចក់ មន្ទីរពេទ្យ និងអគារផ្ទះល្វែង នឹងមិនមានទេ។"
              enInsightLabel="Why it changed cities"
              khInsightLabel="ហេតុអ្វីវាបានផ្លាស់ប្ដូរទីក្រុង"
              InsightIcon={Sparkles}
            />

            {/* Escalator / Transveyor */}
            <TransitMethodCard
              k={k}
              testId="method-escalator"
              variant="steel"
              Icon={Layers}
              enName="Escalator · ជណ្ដើរយន្តរំកិល"
              khName="ជណ្ដើរយន្តរំកិល · Escalator"
              enTagline="Continuous-motion transit — no more waiting"
              khTagline="ការដឹកជញ្ជូនចលនាបន្ត — លែងរង់ចាំ"
              enBody="An escalator is not a moving box at all — it is an endless loop of metal steps, riding on a giant hidden chain that runs through gears at the top and the bottom. Because the steps never stop, hundreds of people per minute can step on, ride, and step off without ever waiting for a 'box to arrive'. This is what engineers call continuous-motion transit, and it is the same idea behind moving walkways at airports and the long flat 'transveyors' in shopping malls. It moves more people, more smoothly, than any single elevator ever could."
              khBody="ជណ្ដើរយន្តរំកិលមិនមែនជាប្រអប់ផ្លាស់ទីទាល់តែសោះ — វាគឺជារង្វិលគ្មានទីបញ្ចប់នៃជំហានដែក ដែលជិះលើខ្សែដ៏ធំដែលលាក់ ដែលរត់តាមរន្ធកង់នៅខាងលើ និងខាងក្រោម។ ដោយសារជំហានមិនឈប់ មនុស្សរាប់រយនាក់ក្នុងមួយនាទី អាចជើរ ជិះ និងចុះ ដោយមិនចាំ 'ប្រអប់មកដល់'។ នេះគឺជាអ្វីដែលវិស្វករហៅថា ការដឹកជញ្ជូនចលនាបន្ត ហើយវាជាគំនិតដូចគ្នា នៅពីក្រោយផ្លូវដើររំកិលនៅអាកាសយានដ្ឋាន និង 'transveyor' ផ្ទាល់វែងនៅផ្សារទំនើប។ វាដឹកមនុស្សច្រើនជាង រលូនជាង សម្រាប់ជណ្ដើរយន្តប្រអប់តែមួយណាមួយ។"
              specs={[
                {
                  labelEn: "How it moves",
                  labelKh: "របៀបវាផ្លាស់ទី",
                  valueEn: "An endless loop of steps on a hidden chain through gears.",
                  valueKh: "រង្វិលគ្មានទីបញ្ចប់នៃជំហាន លើខ្សែលាក់ឆ្លងកាត់រន្ធកង់។",
                  Icon: Cog,
                },
                {
                  labelEn: "Throughput",
                  labelKh: "បរិមាណដឹក",
                  valueEn: "Up to ~9,000 people per hour, no waiting.",
                  valueKh: "រហូតដល់ ~៩,០០០ នាក់ក្នុងមួយម៉ោង គ្មានការរង់ចាំ។",
                  Icon: ArrowUp,
                },
                {
                  labelEn: "Cousins",
                  labelKh: "សាច់ញាតិ",
                  valueEn: "Moving walkways, airport transveyors, mall conveyors.",
                  valueKh: "ផ្លូវដើររំកិល transveyor អាកាសយានដ្ឋាន ខ្សែដឹកនៅផ្សារ។",
                  Icon: Layers,
                },
              ]}
              enInsight="When the goal is moving a constant flood of people — a metro station at rush hour — continuous motion always beats the stop-and-wait box."
              khInsight="ពេលដែលគោលដៅគឺផ្លាស់ទីលំហូរអ្នកប្រើបន្ត — ស្ថានីយ៍រថភ្លើងក្រោមដីពេលរវល់ — ចលនាបន្តតែងតែឈ្នះប្រអប់ឈប់-រង់ចាំ។"
              enInsightLabel="When to choose it"
              khInsightLabel="ពេលណាគួរជ្រើសរើស"
              InsightIcon={Sparkles}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 3 · THE QUANTUM LEAP — TELEPORTATION
        ════════════════════════════════════════════════════════════════ */}
        <section
          id="quantum-leap"
          data-testid="section-quantum-leap"
          className="scroll-mt-24 mb-14"
        >
          <SectionHeader
            spec="03"
            en="The Quantum Leap — Teleportation"
            kh="ការលោតផ្លោះកង់ទិច — ការបញ្ជូនរូបធាតុ"
            k={k}
            Icon={Atom}
            accent={NEON_VIOL}
            onDark
          />

          {/* Opening neon block */}
          <div
            className="relative rounded-3xl p-6 sm:p-8 mb-5 overflow-hidden text-white"
            style={{
              background: `linear-gradient(135deg, ${VOID} 0%, ${VOID_2} 55%, #1e0a3a 100%)`,
              border: `1px solid ${NEON_VIOL}55`,
              boxShadow:
                `0 0 0 1px ${NEON_VIOL}33,` +
                `0 18px 50px -18px ${NEON_VIOL}aa,` +
                `0 0 90px -22px ${NEON_CYAN}55`,
            }}
            data-testid="teleportation-intro"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              aria-hidden="true"
              style={{
                backgroundImage:
                  `radial-gradient(circle at 12% 18%, ${NEON_CYAN}33, transparent 35%),` +
                  `radial-gradient(circle at 88% 82%, ${NEON_VIOL}33, transparent 40%),` +
                  `radial-gradient(circle at 50% 50%, ${NEON_PINK}11, transparent 60%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Atom className="w-5 h-5" style={{ color: NEON_CYAN }} />
                <span
                  className={`text-[10px] tracking-[0.25em] uppercase ${k ? "font-khmer normal-case tracking-normal text-xs" : "font-mono"}`}
                  style={{ color: NEON_PINK }}
                >
                  {T("The science behind the science fiction", "វិទ្យាសាស្ត្រនៅខាងក្រោយរឿងវិទ្យាសាស្ត្រកាល្បនិក")}
                </span>
              </div>
              <p
                className={`font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3 ${k ? "font-khmer leading-snug" : ""}`}
                style={{
                  color: "#ffffff",
                  textShadow: `0 0 22px ${NEON_CYAN}99, 0 0 4px ${NEON_VIOL}55`,
                }}
              >
                {T(
                  "Real teleportation does not push your body through a tube — it sends information.",
                  "ការបញ្ជូនរូបធាតុពិតប្រាកដមិនរុញរាងកាយរបស់អ្នកឆ្លងកាត់បំពង់ទេ — វាបញ្ជូនពត៌មាន។",
                )}
              </p>
              <p
                className={`text-sm sm:text-base text-slate-200 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              >
                {T(
                  "In 1998, real physicists at Caltech successfully teleported the quantum state of a single particle of light. Nothing physical travelled between the two locations — only information. That tiny experiment is the entire blueprint for what science fiction movies have been showing for decades.",
                  "នៅឆ្នាំ ១៩៩៨ អ្នករូបវិទ្យាពិតប្រាកដនៅ Caltech បានជោគជ័យក្នុងការបញ្ជូនស្ថានភាពកង់ទិចនៃភាគល្អិតពន្លឺមួយ។ គ្មានវត្ថុពិតណាមួយធ្វើដំណើររវាងទីតាំងទាំងពីរទេ — មានតែពត៌មានប៉ុណ្ណោះ។ ការពិសោធន៍តូចនោះ គឺជាគម្រោងពេញលេញសម្រាប់អ្វីដែលរឿងកុនវិទ្យាសាស្ត្រកាល្បនិកបានបង្ហាញអស់រយៈពេលជាច្រើនទសវត្សរ៍។",
                )}
              </p>
            </div>
          </div>

          {/* Four-step machine breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5" data-testid="teleportation-steps">
            <QuantumStep n="1" enLabel="Scan" khLabel="ស្កេន" Icon={ScanLine} k={k}
              enText="A scanner reads the position, spin, and energy of every atom in your body — billions of trillions of bits."
              khText="ម៉ាស៊ីនស្កេនមួយ អានទីតាំង បង្វិល និងថាមពលនៃអាតូមនីមួយៗក្នុងរាងកាយរបស់អ្នក — ប៊ីតរាប់ពាន់លានពាន់ទ្រីលីយ៉ាន។"
            />
            <QuantumStep n="2" enLabel="Destroy" khLabel="កម្ទេច" Icon={Zap} k={k}
              enText="The act of measuring an atom changes it. The 'original you' is necessarily destroyed in the scanning process."
              khText="សកម្មភាពនៃការវាស់អាតូមមួយ ផ្លាស់ប្ដូរវា។ 'រូបអ្នកដើម' ត្រូវបានកម្ទេចចាំបាច់ក្នុងដំណើរការស្កេន។"
            />
            <QuantumStep n="3" enLabel="Transmit" khLabel="បញ្ជូន" Icon={Send} k={k}
              enText="The information — not the matter — is sent to the destination at the speed of light."
              khText="ពត៌មាន — មិនមែនរូបធាតុ — ត្រូវបានបញ្ជូនទៅទីតាំងគោលដៅ ដោយល្បឿនពន្លឺ។"
            />
            <QuantumStep n="4" enLabel="Rebuild" khLabel="សាងសង់ឡើងវិញ" Icon={Wand2} k={k}
              enText="At the other end, a quantum '3D printer' uses local atoms to build a perfect copy from the data."
              khText="នៅចុងម្ខាងទៀត 'ម៉ាស៊ីនបោះពុម្ព ៣D' កង់ទិច ប្រើអាតូមមូលដ្ឋាន ដើម្បីសាងសង់ច្បាប់ចម្លងដ៏ល្អឥតខ្ចោះពីទិន្នន័យ។"
            />
          </div>

          {/* The quantum machine card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
            <div className="lg:col-span-2">
              <TransitMethodCard
                k={k}
                testId="method-teleportation"
                variant="neon"
                Icon={Atom}
                enName="Teleportation · ការបញ្ជូនរូបធាតុ"
                khName="ការបញ្ជូនរូបធាតុ · Teleportation"
                enTagline="Sending the blueprint, not the body"
                khTagline="បញ្ជូនគម្រោង មិនមែនរាងកាយ"
                enBody="The science of teleportation flips our intuition upside down. The famous 'no-cloning theorem' of quantum mechanics says you can never copy a quantum particle exactly — but you can move its complete state to another particle, as long as the original is destroyed in the process. So a real teleporter would not magically squeeze your atoms through space. It would scan you down to the last quantum detail, transmit the data at light-speed across a normal radio link, and a machine at the other end would assemble a fresh you out of new local atoms. From the outside, it looks instantaneous and miraculous. From the inside, you might never even know it happened."
                khBody="វិទ្យាសាស្ត្រនៃការបញ្ជូនរូបធាតុ បកគំនិតរបស់យើងទាំងស្រុង។ 'ទ្រឹស្ដីគ្មានការចម្លង' ដ៏ល្បីនៃមេកានិចកង់ទិច និយាយថា អ្នកមិនអាចចម្លងភាគល្អិតកង់ទិចមួយឱ្យដូចបេះបិទបានទេ — ប៉ុន្តែអ្នកអាចផ្លាស់ស្ថានភាពពេញលេញរបស់វា ទៅភាគល្អិតផ្សេងមួយ ដរាបណារបស់ដើមត្រូវបានកម្ទេចក្នុងដំណើរការ។ ដូច្នេះការបញ្ជូនរូបធាតុពិតប្រាកដ នឹងមិនច្របាច់អាតូមរបស់អ្នកឆ្លងកាត់លំហដោយវេទមន្តទេ។ វានឹងស្កេនអ្នករហូតដល់ព័ត៌មានកង់ទិចចុងក្រោយ បញ្ជូនទិន្នន័យដោយល្បឿនពន្លឺឆ្លងកាត់តំណវិទ្យុធម្មតា ហើយម៉ាស៊ីននៅចុងម្ខាងទៀត នឹងផ្ដុំរាងកាយថ្មីរបស់អ្នកឡើងវិញ ពីអាតូមមូលដ្ឋានថ្មី។ ពីខាងក្រៅ វាមើលទៅភ្លាមៗ និងអស្ចារ្យ។ ពីខាងក្នុង អ្នកប្រហែលជាមិនដឹងថា វាបានកើតឡើងផងទេ។"
                specs={[
                  {
                    labelEn: "Speed limit",
                    labelKh: "ល្បឿនកំណត់",
                    valueEn: "Information travels at the speed of light — no faster.",
                    valueKh: "ពត៌មានធ្វើដំណើរដោយល្បឿនពន្លឺ — មិនលឿនជាងនេះទេ។",
                    Icon: Radio,
                  },
                  {
                    labelEn: "What moves",
                    labelKh: "អ្វីផ្លាស់ទី",
                    valueEn: "Pure data. The atoms at the destination are local atoms.",
                    valueKh: "ទិន្នន័យសុទ្ធ។ អាតូមនៅទីតាំងគោលដៅ គឺជាអាតូមមូលដ្ឋាន។",
                    Icon: Send,
                  },
                  {
                    labelEn: "Real progress",
                    labelKh: "វឌ្ឍនភាពពិត",
                    valueEn: "Photons (1998), atoms (2004), now whole molecules — humans still science-fiction.",
                    valueKh: "ភូតុង (១៩៩៨) អាតូម (២០០៤) ឥឡូវនេះម៉ូលេគុលទាំងមូល — មនុស្សនៅតែជារឿងវិទ្យាសាស្ត្រកាល្បនិក។",
                    Icon: Atom,
                  },
                ]}
                enInsight="Even just to scan one human body would generate so much data that, at today's transmission speeds, it would take longer than the age of the universe to send."
                khInsight="សូម្បីតែការស្កេនរាងកាយមនុស្សមួយ នឹងបង្កើតទិន្នន័យច្រើនណាស់ ដែលនៅល្បឿនបញ្ជូនសព្វថ្ងៃនេះ វានឹងចំណាយពេលច្រើនជាងអាយុនៃចក្រវាឡ ដើម្បីបញ្ជូន។"
                enInsightLabel="The hard truth"
                khInsightLabel="ការពិតពិបាក"
                InsightIcon={Sparkles}
              />
            </div>

            {/* Side: timeline of real quantum teleportation milestones */}
            <div
              className="rounded-3xl p-5 border-2 flex flex-col gap-3 text-white"
              style={{
                backgroundColor: VOID,
                borderColor: `${NEON_CYAN}88`,
                boxShadow: `0 0 24px -6px ${NEON_CYAN}66, 0 0 0 1px ${NEON_VIOL}33`,
              }}
            >
              <div className="flex items-center gap-2">
                <Atom className="w-5 h-5" style={{ color: NEON_CYAN }} />
                <h4
                  className={`font-bold text-base ${k ? "font-khmer" : ""}`}
                  style={{ color: "#ffffff" }}
                >
                  {T("Real-World Milestones", "ដំណាក់កាលពិតប្រាកដ")}
                </h4>
              </div>
              <ul className="flex flex-col gap-3">
                <Milestone k={k} year="1993" enText="Bennett & team prove quantum teleportation is theoretically possible." khText="Bennett និងក្រុម បង្ហាញថា ការបញ្ជូនរូបធាតុកង់ទិច គឺអាចទៅរួចតាមទ្រឹស្ដី។" />
                <Milestone k={k} year="1998" enText="Caltech teleports the state of a single photon — first real demo." khText="Caltech បញ្ជូនស្ថានភាពនៃភូតុងតែមួយ — ការបង្ហាញពិតលើកដំបូង។" />
                <Milestone k={k} year="2004" enText="Single atoms (calcium ions) successfully teleported in a lab." khText="អាតូមតែមួយ (អ៊ីយ៉ុងកាល់ស្យូម) ត្រូវបានបញ្ជូនជោគជ័យក្នុងបន្ទប់ពិសោធន៍។" />
                <Milestone k={k} year="2017" enText="China teleports a photon from Earth to a satellite 1,400 km away." khText="ប្រទេសចិនបញ្ជូនភូតុងពីផែនដី ទៅផ្កាយរណប ឆ្ងាយ ១,៤០០ គ.ម.។" />
              </ul>
            </div>
          </div>

          {/* The Big Philosophical Question — neon highlight block */}
          <div
            className="relative rounded-3xl p-6 sm:p-9 overflow-hidden text-white"
            data-testid="philosophical-question"
            style={{
              background:
                `radial-gradient(circle at 22% 30%, ${NEON_VIOL}33, transparent 55%),` +
                `radial-gradient(circle at 78% 70%, ${NEON_CYAN}33, transparent 55%),` +
                `linear-gradient(135deg, ${VOID} 0%, #200a3d 60%, ${VOID} 100%)`,
              border: `2px solid ${NEON_VIOL}88`,
              boxShadow:
                `0 0 0 1px ${NEON_PINK}33,` +
                `0 24px 60px -18px ${NEON_VIOL}cc,` +
                `0 0 100px -22px ${NEON_CYAN}66`,
            }}
          >
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Brain className="w-5 h-5" style={{ color: NEON_PINK }} />
              <span
                className={`text-[10px] tracking-[0.25em] uppercase ${k ? "font-khmer normal-case tracking-normal text-xs" : "font-mono"}`}
                style={{ color: NEON_PINK }}
              >
                {T("The philosophical question", "សំណួរទស្សនវិជ្ជា")}
              </span>
            </div>
            <Quote
              className="w-7 h-7 mb-3 opacity-80"
              style={{ color: NEON_CYAN, filter: `drop-shadow(0 0 6px ${NEON_CYAN}cc)` }}
            />
            <p
              className={`font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4 ${k ? "font-khmer leading-snug" : ""}`}
              style={{
                color: "#ffffff",
                textShadow: `0 0 22px ${NEON_CYAN}aa, 0 0 6px ${NEON_VIOL}66`,
              }}
            >
              {T(
                "If the machine destroys the original you, and builds an exact copy… is the person who steps out the other side still YOU?",
                "ប្រសិនបើម៉ាស៊ីនកម្ទេចរូបរាងដើមរបស់អ្នក ហើយបង្កើតច្បាប់ចម្លងដូចបេះបិទ… តើមនុស្សដែលដើរចេញពីម្ខាងទៀត នៅតែជាអ្នកដែរឬទេ?",
              )}
            </p>
            <p
              className={`text-base sm:text-lg text-slate-100/90 max-w-3xl ${!k ? "font-khmer leading-loose" : "italic leading-relaxed"}`}
            >
              {!k
                ? "ប្រសិនបើម៉ាស៊ីនកម្ទេចរូបរាងដើមរបស់អ្នក ហើយបង្កើតច្បាប់ចម្លងដូចបេះបិទ… តើមនុស្សដែលដើរចេញពីម្ខាងទៀត នៅតែជាអ្នកដែរឬទេ?"
                : "If the machine destroys the original you, and builds an exact copy… is the person who steps out the other side still YOU?"}
            </p>

            {/* Two-position framing */}
            <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <PhilPosition
                k={k}
                color={NEON_CYAN}
                enHeading="Position A · Yes, it is still you."
                khHeading="ទស្សនៈ A · មែន គឺនៅជាអ្នកនៅឡើយ។"
                enBody="What makes you 'you' is the pattern of your atoms — your memories, your personality, your skills. If the new body has the exact same pattern, then by every measurable test, it is the same person."
                khBody="អ្វីដែលធ្វើឱ្យអ្នកជា 'អ្នក' គឺគំរូនៃអាតូមរបស់អ្នក — ការចងចាំ បុគ្គលិកលក្ខណៈ ជំនាញ។ ប្រសិនបើរាងកាយថ្មីមានគំរូដូចបេះបិទ នោះតាមរយៈការវាស់ស្ទង់គ្រប់បែប វាគឺជាមនុស្សតែមួយ។"
              />
              <PhilPosition
                k={k}
                color={NEON_PINK}
                enHeading="Position B · No, the original you died."
                khHeading="ទស្សនៈ B · ទេ រូបអ្នកដើមបានស្លាប់ទៅហើយ។"
                enBody="The original you, including your continuous stream of consciousness, was destroyed during the scan. The being who walks out the other end may be identical, may believe she is you — but she is a brand-new person. You are gone."
                khBody="រូបអ្នកដើម រួមទាំងស្ទ្រីមនៃស្មារតីបន្តរបស់អ្នក ត្រូវបានកម្ទេចក្នុងពេលស្កេន។ មនុស្សដែលដើរចេញពីម្ខាងទៀត ប្រហែលជាដូចបេះបិទ ប្រហែលជាជឿថា នាងគឺជាអ្នក — ប៉ុន្តែនាងគឺជាមនុស្សថ្មីទាំងស្រុង។ អ្នកបាត់ទៅហើយ។"
              />
            </div>

            <p
              className={`mt-6 text-sm sm:text-base text-slate-300 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed italic"}`}
            >
              {T(
                "Physics tells us how to build the machine. Philosophy still has to tell us whether to step inside.",
                "រូបវិទ្យាប្រាប់យើងពីរបៀបសាងម៉ាស៊ីន។ ទស្សនវិជ្ជានៅតែត្រូវប្រាប់យើងថាតើគួរជាន់ជើងចូលទៅឬទេ។",
              )}
            </p>
          </div>
        </section>

        {/* ── Cross-links footer (sits on the dark void at the page bottom) ── */}
        <div
          className="rounded-2xl p-4 sm:p-5 border flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
          style={{
            backgroundColor: `${VOID_2}cc`,
            borderColor: `${NEON_CYAN}55`,
            boxShadow: `0 0 24px -6px ${NEON_VIOL}66`,
          }}
        >
          <Sparkles className="w-6 h-6 flex-shrink-0" style={{ color: NEON_CYAN }} />
          <p
            className={`text-xs sm:text-sm flex-1 text-slate-200 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {T(
              "Keep exploring: zoom from a single atom to the edge of the universe in",
              "បន្តការរុករក ៖ ពង្រីកពីអាតូមតែមួយ ទៅគែមនៃចក្រវាឡក្នុង",
            )}{" "}
            <Link
              href="/science/scale-of-universe"
              className="font-bold underline"
              style={{ color: NEON_CYAN }}
            >
              {T("The Scale of the Universe", "ទំហំនៃចក្រវាឡ")}
            </Link>
            {", "}{T("see how engineers move millions of tonnes of water in", "មើលរបៀបដែលវិស្វករផ្លាស់ទីទឹករាប់លានតោនក្នុង")}{" "}
            <Link
              href="/technology/plumbing"
              className="font-bold underline"
              style={{ color: NEON_CYAN }}
            >
              {T("Plumbing & Sewers", "ប្រព័ន្ធទុយោទឹក និងលូបង្ហូរ")}
            </Link>
            {", "}{T("and", "និង")}{" "}
            <Link
              href="/study-center/behaviorism"
              className="font-bold underline"
              style={{ color: NEON_CYAN }}
            >
              {T("Behaviorism", "អាកប្បកិរិយាវិទ្យា")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Quantum step (numbered, neon) ─────────────────────────────────────────

function QuantumStep({
  n,
  Icon,
  enLabel,
  khLabel,
  enText,
  khText,
  k,
}: {
  n: string;
  Icon: IconCmp;
  enLabel: string;
  khLabel: string;
  enText: string;
  khText: string;
  k: boolean;
}) {
  return (
    <div
      className="relative rounded-2xl p-4 text-white overflow-hidden"
      style={{
        backgroundColor: VOID,
        border: `1.5px solid ${NEON_CYAN}88`,
        boxShadow: `0 0 18px -4px ${NEON_CYAN}66, inset 0 0 22px -10px ${NEON_VIOL}99`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase rounded px-1.5 py-0.5"
          style={{
            backgroundColor: NEON_VIOL,
            color: "#ffffff",
            textShadow: `0 0 6px ${NEON_VIOL}cc`,
          }}
        >
          STEP {n}
        </span>
        <Icon className="w-4 h-4" style={{ color: NEON_CYAN, filter: `drop-shadow(0 0 4px ${NEON_CYAN}cc)` }} />
      </div>
      <div
        className={`font-bold text-base mb-1 ${k ? "font-khmer" : ""}`}
        style={{ color: "#ffffff", textShadow: `0 0 12px ${NEON_CYAN}88` }}
      >
        {k ? khLabel : enLabel}
      </div>
      <p
        className={`text-[12px] sm:text-[13px] text-slate-300 ${k ? "font-khmer leading-loose" : "leading-snug"}`}
      >
        {k ? khText : enText}
      </p>
    </div>
  );
}

// ─── Real-world quantum-teleportation milestones list item ─────────────────

function Milestone({
  k,
  year,
  enText,
  khText,
}: {
  k: boolean;
  year: string;
  enText: string;
  khText: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="flex-shrink-0 font-mono text-[11px] rounded px-1.5 py-0.5 text-white tracking-widest"
        style={{
          backgroundColor: NEON_VIOL,
          boxShadow: `0 0 10px -2px ${NEON_VIOL}cc`,
        }}
      >
        {year}
      </span>
      <span
        className={`text-[12px] sm:text-[13px] text-slate-200 ${k ? "font-khmer leading-loose" : "leading-snug"}`}
      >
        {k ? khText : enText}
      </span>
    </li>
  );
}

// ─── Philosophical-question two-position panel ─────────────────────────────

function PhilPosition({
  k,
  color,
  enHeading,
  khHeading,
  enBody,
  khBody,
}: {
  k: boolean;
  color: string;
  enHeading: string;
  khHeading: string;
  enBody: string;
  khBody: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 text-white"
      style={{
        backgroundColor: `${VOID}cc`,
        border: `1.5px solid ${color}88`,
        boxShadow: `inset 0 0 20px -8px ${color}88, 0 0 18px -6px ${color}66`,
      }}
    >
      <div
        className={`font-bold text-base mb-2 ${k ? "font-khmer" : ""}`}
        style={{ color, textShadow: `0 0 8px ${color}aa` }}
      >
        {k ? khHeading : enHeading}
      </div>
      <p
        className={`text-[13px] sm:text-sm text-slate-200 ${k ? "font-khmer leading-loose" : "leading-snug"}`}
      >
        {k ? khBody : enBody}
      </p>
    </div>
  );
}

export default MovingHumanityPage;
