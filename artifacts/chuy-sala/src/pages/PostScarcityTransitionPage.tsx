import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Network,
  TrendingUp,
  Sparkles,
  Brain,
  Users,
  Telescope,
  Compass,
  Globe,
  Workflow,
  Infinity as InfinityIcon,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Heart,
  Cpu,
  Database,
  Wheat,
  Zap,
} from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import type React from "react";

/* ════════════════════════════════════════════════════════════════════════════
 *  TECH-FUTURE-02 · The Post-Scarcity Transition: Life After Labor
 *                    ការផ្លាស់ប្តូរទៅកាន់សេដ្ឋកិច្ចក្រោយភាពខ្វះខាត៖
 *                    ជីវិតក្រោយការងារ
 *
 *  Capstone module — sister to TECH-FUTURE-01 (FutureIntelligencePage).
 *  Long-form scroll (no tabs) so the four sections read as one arc:
 *    01 · The End of Scarcity
 *    02 · The Automation Wave & Technological Unemployment
 *    03 · The AI-Managed Economy
 *    04 · The Value Shift  (highlight card asking: what do you do?)
 *
 *  Aesthetic re-uses the singularity palette from FutureIntelligencePage:
 *  obsidian black with cyan/violet glows, faint circuit-grid backdrop,
 *  paired-bilingual headings & key concepts (always show both languages).
 * ══════════════════════════════════════════════════════════════════════════ */

// ─── Singularity palette (kept in sync with FutureIntelligencePage) ────────
const BG       = "#04060d";
const PANEL    = "#0a0e1c";
const PANEL_2  = "#0d1326";
const GRID     = "#16203b";
const INK      = "#dbe6ff";
const INK_SOFT = "#8aa0c8";
const INK_DIM  = "#5a6c92";
const CYAN     = "#22d3ee";
const VIOLET   = "#a855f7";
const MAGENTA  = "#f472b6";
const LIME     = "#84cc16";
const AMBER    = "#fbbf24";
const ROSE     = "#fb7185";

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export function PostScarcityTransitionPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";

  const frame: React.CSSProperties = {
    backgroundColor: BG,
    backgroundImage:
      `radial-gradient(circle at 12% 8%, ${CYAN}22, transparent 45%),` +
      `radial-gradient(circle at 88% 92%, ${VIOLET}26, transparent 55%),` +
      `radial-gradient(circle at 60% 40%, ${LIME}10, transparent 50%),` +
      `linear-gradient(${GRID} 1px, transparent 1px),` +
      `linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
    backgroundSize: "auto, auto, auto, 32px 32px, 32px 32px",
  };

  const sections = [
    { id: "end-of-scarcity", num: "01", en: "The End of Scarcity", kh: "ទីបញ្ចប់នៃភាពខ្វះខាត", Icon: InfinityIcon, accent: CYAN },
    { id: "automation",      num: "02", en: "The Automation Wave",  kh: "រលកនៃស្វ័យប្រវត្តិកម្ម", Icon: Bot, accent: AMBER },
    { id: "ai-managed",      num: "03", en: "The AI-Managed Economy", kh: "សេដ្ឋកិច្ចគ្រប់គ្រងដោយ AI", Icon: Network, accent: VIOLET },
    { id: "value-shift",     num: "04", en: "The Value Shift",       kh: "ការផ្លាស់ប្តូរតម្លៃ", Icon: Sparkles, accent: MAGENTA },
  ];

  return (
    <div
      data-testid="post-scarcity-page"
      className="min-h-screen py-10 sm:py-12 px-4 sm:px-6"
      style={frame}
    >
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/technology/future-intelligence"
            data-testid="back-link"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80 ${k ? "font-khmer" : ""}`}
            style={{ color: CYAN }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Future of Intelligence", "ត្រឡប់ទៅអនាគតនៃបញ្ញា")}
          </Link>
        </div>

        {/* HERO */}
        <header
          data-testid="post-scarcity-hero"
          className="relative rounded-[2rem] overflow-hidden border p-6 sm:p-9 mb-10"
          style={{
            backgroundColor: PANEL,
            borderColor: `${CYAN}55`,
            boxShadow: `inset 0 0 0 1px ${CYAN}22, 0 0 60px -20px ${VIOLET}aa`,
          }}
        >
          <HeroBackdrop />

          <div className="relative">
            <div
              className={`flex items-center gap-2 text-[11px] mb-2 flex-wrap ${k ? "font-khmer" : ""}`}
              style={{ color: CYAN }}
            >
              <span className="font-mono uppercase tracking-[0.3em]">CAPSTONE · TECH-FUTURE-02</span>
              <span style={{ color: INK_DIM }}>·</span>
              <span className={k ? "" : "font-khmer"} style={{ color: INK_SOFT }}>
                {k ? "បញ្ចប់ · សេដ្ឋកិច្ច" : "មុខវិជ្ជាបញ្ចប់ · សេដ្ឋកិច្ច"}
              </span>
            </div>

            {/* Always paired bilingual title */}
            <h1
              data-testid="page-title"
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl ${k ? "font-khmer leading-snug" : ""}`}
              style={{ color: INK, textShadow: `0 0 18px ${CYAN}88, 0 0 38px ${VIOLET}55` }}
            >
              {k ? "ការផ្លាស់ប្តូរទៅកាន់សេដ្ឋកិច្ចក្រោយភាពខ្វះខាត៖" : "The Post-Scarcity Transition:"}{" "}
              <span style={{
                background: `linear-gradient(90deg, ${CYAN}, ${VIOLET}, ${MAGENTA})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {k ? "ជីវិតក្រោយការងារ" : "Life After Labor"}
              </span>
            </h1>
            <div
              className="mt-2 text-base sm:text-lg font-semibold font-khmer leading-snug"
              style={{ color: INK_SOFT }}
            >
              {k
                ? "The Post-Scarcity Transition: Life After Labor"
                : "ការផ្លាស់ប្តូរទៅកាន់សេដ្ឋកិច្ចក្រោយភាពខ្វះខាត៖ ជីវិតក្រោយការងារ"}
            </div>

            <p
              className={`mt-4 max-w-3xl text-sm sm:text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK_SOFT }}
            >
              {k
                ? "មនុស្ស​បាន​ខំ​ប្រឹង​ធ្វើ​ការ​អស់​រាប់​ពាន់​ឆ្នាំ​ដើម្បី​បង្កើត​អាហារ ខោអាវ និង​ផ្ទះ​ឱ្យ​គ្រប់​គ្រាន់។ ប៉ុន្តែ​បញ្ញា​ស្វ័យ​ប្រវត្តិ និង​ថាមពល​ស្អាត​ដែល​ស្ទើរ​មិន​អស់​ហើយ​នឹង​ផ្លាស់​ប្ដូរ​សំណួរ​ដ៏​ចំណាស់​មួយ៖ បើ​ម៉ាស៊ីន​អាច​ផលិត​អ្វី​គ្រប់​យ៉ាង​ដោយ​ស្ទើរ​មិន​អស់​លុយ មនុស្ស​នឹង​ធ្វើ​អ្វី​នៅ​រស់? មុខវិជ្ជា​ចុង​ក្រោយ​នេះ​ដើរ​ឆ្លង​កាត់​ការ​ផ្លាស់​ប្ដូរ​ដ៏​ធំ​បំផុត​នៃ​សតវត្សរ៍​ខាង​មុខ — ដោយ​មាន​ភាព​ស្មោះ​ត្រង់​អំពី​ការ​ឈឺ​ចាប់ និង​ភាព​សុទិដ្ឋិនិយម​អំពី​ឱកាស។"
                : "Humans have spent millennia struggling to grow enough food, sew enough clothes, and build enough houses. But automated intelligence and almost-limitless clean energy will rewrite an ancient question: if machines can produce nearly everything for nearly nothing, what will humans do with their lives? This capstone module walks through the largest transition of the next century — honest about the pain, optimistic about the opportunity."}
            </p>

            {/* Section navigator */}
            <nav
              aria-label={k ? "ផ្នែកនៃមុខវិជ្ជា" : "Module sections"}
              className="mt-6 flex flex-wrap gap-2"
            >
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  data-testid={`nav-${s.id}`}
                  className={`group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold border transition-all hover:-translate-y-0.5 ${k ? "font-khmer" : ""}`}
                  style={{
                    backgroundColor: PANEL_2,
                    borderColor: `${s.accent}55`,
                    color: INK,
                    boxShadow: `0 0 18px -10px ${s.accent}`,
                  }}
                >
                  <span className="font-mono text-[10px]" style={{ color: s.accent }}>
                    {s.num}
                  </span>
                  <s.Icon className="w-3.5 h-3.5" style={{ color: s.accent }} />
                  <span>{k ? s.kh : s.en}</span>
                </a>
              ))}
            </nav>
          </div>
        </header>

        {/* SECTION 01 — The End of Scarcity */}
        <SectionEndOfScarcity k={k} />

        {/* SECTION 02 — Automation Wave & Technological Unemployment */}
        <SectionAutomationWave k={k} />

        {/* SECTION 03 — AI-Managed Economy */}
        <SectionAIManagedEconomy k={k} />

        {/* SECTION 04 — The Value Shift (highlight card) */}
        <SectionValueShift k={k} />

        {/* Closing CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/technology/future-intelligence"
            data-testid="cta-back"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-90 ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: CYAN, color: BG, boxShadow: `0 0 28px -10px ${CYAN}` }}
          >
            {t("Back to Future of Intelligence", "ត្រឡប់ទៅអនាគតនៃបញ្ញា")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostScarcityTransitionPage;

// ════════════════════════════════════════════════════════════════════════════
//  Shared building blocks
// ════════════════════════════════════════════════════════════════════════════

function SectionShell({
  id,
  num,
  Icon,
  accent,
  titleEn,
  titleKh,
  eyebrowEn,
  eyebrowKh,
  k,
  children,
  testId,
}: {
  id: string;
  num: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  titleEn: string;
  titleKh: string;
  eyebrowEn: string;
  eyebrowKh: string;
  k: boolean;
  children: React.ReactNode;
  testId?: string;
}) {
  return (
    <section
      id={id}
      data-testid={testId ?? `section-${id}`}
      aria-labelledby={`${id}-heading`}
      className="mb-12 rounded-3xl border overflow-hidden"
      style={{
        backgroundColor: PANEL,
        borderColor: `${accent}55`,
        boxShadow: `inset 0 0 0 1px ${accent}22, 0 0 50px -28px ${accent}`,
      }}
    >
      <header
        className="px-5 sm:px-7 pt-6 pb-5 border-b"
        style={{
          borderColor: `${accent}33`,
          background: `linear-gradient(180deg, ${accent}1a 0%, transparent 100%)`,
        }}
      >
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <span
            className="font-mono text-[10px] tracking-[0.25em] uppercase rounded-sm px-2.5 py-0.5 border"
            style={{
              color: accent,
              borderColor: `${accent}66`,
              backgroundColor: `${accent}1a`,
            }}
          >
            SEC-{num}
          </span>
          <Icon className="w-5 h-5" style={{ color: accent }} />
          <span
            className={`text-[11px] font-bold uppercase tracking-widest ${k ? "font-khmer normal-case tracking-normal" : ""}`}
            style={{ color: accent }}
          >
            {k ? eyebrowKh : eyebrowEn}
          </span>
        </div>
        {/* Always paired bilingual heading */}
        <h2
          id={`${id}-heading`}
          className={`text-2xl sm:text-3xl font-extrabold leading-tight ${k ? "font-khmer leading-snug" : ""}`}
          style={{ color: INK }}
        >
          {k ? titleKh : titleEn}
        </h2>
        <div
          className="mt-1 text-base sm:text-lg font-semibold font-khmer leading-snug"
          style={{ color: INK_SOFT }}
        >
          {k ? titleEn : titleKh}
        </div>
      </header>
      <div className="p-5 sm:p-7 space-y-4">{children}</div>
    </section>
  );
}

function Body({ k, en, kh }: { k: boolean; en: string; kh: string }) {
  return (
    <p
      className={`${k ? "font-khmer leading-loose" : "leading-relaxed"} text-sm sm:text-base`}
      style={{ color: INK_SOFT }}
    >
      {k ? kh : en}
    </p>
  );
}

function ConceptChip({
  termEn,
  termKh,
  detailEn,
  detailKh,
  accent,
  iconEl,
}: {
  termEn: string;
  termKh: string;
  detailEn: string;
  detailKh: string;
  accent: string;
  iconEl?: React.ReactNode;
}) {
  return (
    <div
      className="rounded-lg px-3 py-2 border"
      style={{
        backgroundColor: `${accent}10`,
        borderColor: `${accent}55`,
      }}
    >
      <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: accent }}>
        {iconEl}
        <span>{termEn}</span>
        <span style={{ color: INK_DIM }}>·</span>
        <span className="font-khmer">{termKh}</span>
      </div>
      <div className="text-[11px] mt-1 leading-tight" style={{ color: INK }}>
        {detailEn}
      </div>
      <div className="text-[11px] font-khmer leading-snug" style={{ color: INK_SOFT }}>
        {detailKh}
      </div>
    </div>
  );
}

function HeroBackdrop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 280"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    >
      <defs>
        <radialGradient id="hg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={CYAN} stopOpacity="0.5" />
          <stop offset="100%" stopColor={CYAN} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={VIOLET} stopOpacity="0.45" />
          <stop offset="100%" stopColor={VIOLET} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="490" cy="60" r="120" fill="url(#hg1)" />
      <circle cx="540" cy="200" r="140" fill="url(#hg2)" />
      {/* Constellation dots */}
      {Array.from({ length: 28 }).map((_, i) => {
        const x = (i * 73 + 40) % 580 + 10;
        const y = (i * 41 + 25) % 260 + 10;
        const r = (i % 3) + 1;
        return <circle key={i} cx={x} cy={y} r={r} fill={INK_SOFT} opacity={0.35} />;
      })}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 01 — The End of Scarcity
// ════════════════════════════════════════════════════════════════════════════

function SectionEndOfScarcity({ k }: { k: boolean }) {
  return (
    <SectionShell
      id="end-of-scarcity"
      num="01"
      Icon={InfinityIcon}
      accent={CYAN}
      eyebrowEn="The core idea"
      eyebrowKh="គំនិត​សំខាន់"
      titleEn="The End of Scarcity"
      titleKh="ទីបញ្ចប់នៃភាពខ្វះខាត"
      k={k}
    >
      <Body
        k={k}
        en="Traditional economics is the study of how to divide limited resources. Whenever there is less of something than people want — rice in a bad harvest, oil in a hot summer, doctors in a small town — economics asks: who gets it, at what price, and at what cost to others?"
        kh="សេដ្ឋកិច្ច​ប្រពៃណី​គឺ​ការ​សិក្សា​អំពី​របៀប​បែងចែក​ធនធាន​ដែល​មាន​កំណត់។ នៅ​ពេល​ណា​ដែល​មាន​អ្វី​មួយ​តិច​ជាង​ការ​ត្រូវការ​របស់​មនុស្ស — អង្ករ​ក្នុង​រដូវ​ច្រូត​មិន​ល្អ ប្រេង​ក្នុង​រដូវ​ក្ដៅ វេជ្ជបណ្ឌិត​ក្នុង​ភូមិ​តូច — សេដ្ឋកិច្ច​សួរ​ថា៖ អ្នក​ណា​ត្រូវ​បាន​ផ្ដល់? តម្លៃ​ប៉ុន្មាន? តម្លៃ​អ្វី​លើ​អ្នក​ដទៃ?"
      />

      <Body
        k={k}
        en="A 'post-scarcity' economy happens when advanced technology — sun-cheap energy, automated farms, clean recycling, cheap manufacturing — makes the things humans need to survive (food, water, shelter, electricity, basic medicine) so abundant and so cheap that everyone can have them for almost nothing."
        kh="«សេដ្ឋកិច្ច​ក្រោយ​ភាព​ខ្វះខាត» កើត​ឡើង​នៅ​ពេល​បច្ចេកវិទ្យា​ជឿន​លឿន — ថាមពល​ព្រះអាទិត្យ​ថោក ចម្ការ​ស្វ័យ​ប្រវត្តិ ការ​កែ​ច្នៃ​ស្អាត ការ​ផលិត​ថោក — ធ្វើ​ឱ្យ​អ្វី​ដែល​មនុស្ស​ត្រូវ​ការ​ដើម្បី​រស់ (អាហារ ទឹក ផ្ទះ​សម្បែង អគ្គិសនី ឱសថ​មូលដ្ឋាន) មាន​សម្បូរ​ច្រើន និង​ថោក​ខ្លាំង​ដល់​ថា​មនុស្ស​គ្រប់​គ្នា​អាច​មាន​វា​ស្ទើរ​មិន​ចំណាយ​លុយ។"
      />

      {/* Visual contrast — old vs new */}
      <div className="grid sm:grid-cols-2 gap-4 mt-3">
        <div
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: PANEL_2,
            borderColor: `${ROSE}55`,
            boxShadow: `inset 0 0 0 1px ${ROSE}22`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Wheat className="w-5 h-5" style={{ color: ROSE }} />
            <h3
              className={`font-bold ${k ? "font-khmer" : ""}`}
              style={{ color: ROSE }}
            >
              {k ? "សេដ្ឋកិច្ច​បែប​ចាស់" : "The Old Economy"}
            </h3>
            <span className="text-xs font-khmer" style={{ color: INK_SOFT }}>
              {k ? "The Old Economy" : "សេដ្ឋកិច្ច​បែប​ចាស់"}
            </span>
          </div>
          <p
            className={`text-sm mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK }}
          >
            {k
              ? "ធនធាន​មាន​កំណត់ — តម្លៃ​ឡើង​នៅ​ពេល​មាន​តិច។ មនុស្ស​ត្រូវ​លក់​ម៉ោង​ការងារ​របស់​ខ្លួន​ដើម្បី​ទិញ​អ្វី​ដែល​ត្រូវ​ការ​ដើម្បី​រស់។"
              : "Resources are limited — prices rise when there is less. Humans must sell their hours of labor to buy the things they need to stay alive."}
          </p>
          <div className="flex justify-center">
            <ScarcityPie />
          </div>
          <div
            className={`text-[11px] text-center mt-2 ${k ? "font-khmer leading-snug" : ""}`}
            style={{ color: INK_DIM }}
          >
            {k ? "នំ​មួយ​តូច · មនុស្ស​ច្រើន · ប្រកួត​ប្រជែង" : "small pie · many people · competition"}
          </div>
        </div>

        <div
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: PANEL_2,
            borderColor: `${LIME}55`,
            boxShadow: `inset 0 0 0 1px ${LIME}22, 0 0 28px -16px ${LIME}`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <InfinityIcon className="w-5 h-5" style={{ color: LIME }} />
            <h3
              className={`font-bold ${k ? "font-khmer" : ""}`}
              style={{ color: LIME }}
            >
              {k ? "សេដ្ឋកិច្ច​ក្រោយ​ភាព​ខ្វះខាត" : "The Post-Scarcity Economy"}
            </h3>
            <span className="text-xs font-khmer" style={{ color: INK_SOFT }}>
              {k ? "The Post-Scarcity Economy" : "សេដ្ឋកិច្ច​ក្រោយ​ភាព​ខ្វះខាត"}
            </span>
          </div>
          <p
            className={`text-sm mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK }}
          >
            {k
              ? "តម្រូវការ​មូលដ្ឋាន​មាន​ច្រើន​លើស​លប់ — តម្លៃ​ជិត​សូន្យ។ មនុស្ស​មិន​ចាំបាច់​លក់​ម៉ោង​ការងារ​ដើម្បី​រស់​បាន​ទៀត​ទេ។"
              : "Basic needs become overflowing — prices approach zero. Humans no longer have to sell their hours of labor just to stay alive."}
          </p>
          <div className="flex justify-center">
            <AbundanceCornucopia />
          </div>
          <div
            className={`text-[11px] text-center mt-2 ${k ? "font-khmer leading-snug" : ""}`}
            style={{ color: INK_DIM }}
          >
            {k ? "ភាព​សម្បូរ​មិន​អស់ · គ្រប់​គ្នា​មាន​គ្រប់​គ្រាន់" : "endless abundance · enough for everyone"}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-2 mt-3">
        <ConceptChip
          accent={CYAN}
          termEn="Scarcity"
          termKh="ភាព​ខ្វះខាត"
          detailEn="not enough to go around"
          detailKh="មាន​មិន​គ្រប់​គ្រាន់​សម្រាប់​គ្រប់​គ្នា"
          iconEl={<Wheat className="w-3.5 h-3.5" />}
        />
        <ConceptChip
          accent={LIME}
          termEn="Abundance"
          termKh="ភាព​សម្បូរ"
          detailEn="more than anyone needs"
          detailKh="ច្រើន​លើស​អ្វី​ដែល​ត្រូវ​ការ"
          iconEl={<InfinityIcon className="w-3.5 h-3.5" />}
        />
        <ConceptChip
          accent={AMBER}
          termEn="Marginal cost ≈ 0"
          termKh="តម្លៃ​បន្ថែម ≈ ០"
          detailEn="one more unit costs almost nothing"
          detailKh="មួយ​បន្ថែម​ទៀត​ស្ទើរ​មិន​ចំណាយ"
          iconEl={<Zap className="w-3.5 h-3.5" />}
        />
      </div>
    </SectionShell>
  );
}

function ScarcityPie() {
  // Small pie split into 8 narrow slices
  return (
    <svg viewBox="0 0 140 140" className="w-32 h-32" role="img" aria-label="A small pie split into many thin slices, suggesting limited resources divided among many people.">
      <circle cx="70" cy="70" r="50" fill={`${ROSE}22`} stroke={ROSE} strokeWidth="2" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = 70 + Math.cos(angle) * 50;
        const y = 70 + Math.sin(angle) * 50;
        return (
          <line
            key={i}
            x1="70"
            y1="70"
            x2={x}
            y2={y}
            stroke={ROSE}
            strokeWidth="1.5"
            opacity="0.7"
          />
        );
      })}
      {/* Tiny stick figures around it */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = ((i + 0.5) / 8) * Math.PI * 2;
        const x = 70 + Math.cos(angle) * 64;
        const y = 70 + Math.sin(angle) * 64;
        return (
          <circle key={`p${i}`} cx={x} cy={y} r="2.5" fill={INK_SOFT} />
        );
      })}
    </svg>
  );
}

function AbundanceCornucopia() {
  // Larger glowing circle of abundance with overflowing dots
  return (
    <svg viewBox="0 0 140 140" className="w-32 h-32" role="img" aria-label="An overflowing reservoir of resources, suggesting near-limitless abundance for everyone.">
      <defs>
        <radialGradient id="absrc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={LIME} stopOpacity="0.65" />
          <stop offset="100%" stopColor={LIME} stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="70" r="58" fill="url(#absrc)" stroke={LIME} strokeWidth="2" />
      {/* Overflow drops — abundance escaping the boundary */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const r = 58 + ((i % 3) + 1) * 6;
        const x = 70 + Math.cos(angle) * r;
        const y = 70 + Math.sin(angle) * r;
        return <circle key={i} cx={x} cy={y} r={2.5} fill={LIME} opacity={0.7} />;
      })}
      <text x="70" y="76" textAnchor="middle" fontSize="22" fill={INK} fontFamily="monospace" fontWeight="bold">
        ∞
      </text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 02 — The Automation Wave
// ════════════════════════════════════════════════════════════════════════════

function SectionAutomationWave({ k }: { k: boolean }) {
  return (
    <SectionShell
      id="automation"
      num="02"
      Icon={Bot}
      accent={AMBER}
      eyebrowEn="The hard transition"
      eyebrowKh="ការ​ផ្លាស់​ប្ដូរ​ដ៏​លំបាក"
      titleEn="The Automation Wave & Technological Unemployment"
      titleKh="រលកនៃស្វ័យប្រវត្តិកម្ម និង និកម្មភាពបច្ចេកវិទ្យា"
      k={k}
    >
      <Body
        k={k}
        en="Let us be honest about the road there. As artificial intelligence and robotics become cheaper than the humans who do the same work, routine jobs disappear — first the predictable ones (factory lines, paperwork, long-haul driving), then knowledge work that follows clear rules (basic legal review, coding boilerplate, medical scans)."
        kh="សូម​ស្មោះ​ត្រង់​អំពី​ផ្លូវ​ទៅ​ដល់​ទីនោះ។ នៅ​ពេល​បញ្ញា​សិប្បនិម្មិត និង​មនុស្ស​យន្ត​ថោក​ជាង​មនុស្ស​ដែល​ធ្វើ​ការ​ដូច​គ្នា ការងារ​ប្រចាំ​ថ្ងៃ​នឹង​បាត់​បង់ — ដំបូង​ការងារ​ដែល​អាច​ទាយ​ទុក​បាន (ខ្សែ​សង្វាក់​រោងចក្រ ក្រដាស​ការ ឈ្នួល​ដឹក​ឆ្ងាយ) បន្ទាប់​មក​ការងារ​ចំណេះ​ដឹង​ដែល​មាន​ច្បាប់​ច្បាស់ (ការ​ត្រួត​ពិនិត្យ​ច្បាប់​មូលដ្ឋាន ការ​សរសេរ​កូដ​ទម្រង់ ការ​មើល​រូប​បេះដូង)។"
      />

      {/* Cost-curve visual */}
      <div
        className="rounded-2xl border p-5"
        style={{
          backgroundColor: PANEL_2,
          borderColor: `${AMBER}55`,
          boxShadow: `inset 0 0 0 1px ${AMBER}22`,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5" style={{ color: AMBER }} />
          <h3 className={`font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
            {k ? "តម្លៃ​មនុស្ស ទល់​នឹង តម្លៃ​ម៉ាស៊ីន" : "Cost of human labor vs. cost of machines"}
          </h3>
          <span className="text-xs font-khmer" style={{ color: INK_SOFT }}>
            {k ? "Cost of human labor vs. cost of machines" : "តម្លៃ​មនុស្ស ទល់​នឹង តម្លៃ​ម៉ាស៊ីន"}
          </span>
        </div>
        <CostCrossingChart />
        <div className="flex flex-wrap gap-3 mt-4 text-[11px]">
          <span className="flex items-center gap-1.5" style={{ color: INK }}>
            <span className="inline-block w-3 h-0.5 rounded" style={{ backgroundColor: ROSE }} />
            {k ? "តម្លៃ​មនុស្ស (Human cost)" : "Human cost · តម្លៃ​មនុស្ស"}
          </span>
          <span className="flex items-center gap-1.5" style={{ color: INK }}>
            <span className="inline-block w-3 h-0.5 rounded" style={{ backgroundColor: CYAN }} />
            {k ? "តម្លៃ​ម៉ាស៊ីន (Machine cost)" : "Machine cost · តម្លៃ​ម៉ាស៊ីន"}
          </span>
          <span className="flex items-center gap-1.5" style={{ color: INK }}>
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: AMBER }} />
            {k ? "ចំណុច​ឆ្លង (Crossing point)" : "Crossing point · ចំណុច​ឆ្លង"}
          </span>
        </div>
      </div>

      {/* Reframe block */}
      <div
        className="rounded-2xl border p-5"
        style={{
          backgroundColor: `${LIME}10`,
          borderColor: `${LIME}66`,
          boxShadow: `0 0 28px -16px ${LIME}`,
        }}
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: LIME }} />
          <div>
            <h3
              className={`font-bold mb-1 ${k ? "font-khmer" : ""}`}
              style={{ color: LIME }}
            >
              {k ? "ការ​បក​ស្រាយ​ឡើង​វិញ៖ និកម្មភាព​បច្ចេកវិទ្យា" : "A reframe: technological unemployment"}
            </h3>
            <div
              className="text-sm font-semibold font-khmer leading-snug mb-3"
              style={{ color: INK_SOFT }}
            >
              {k ? "A reframe: technological unemployment" : "ការ​បក​ស្រាយ​ឡើង​វិញ៖ និកម្មភាព​បច្ចេកវិទ្យា"}
            </div>
            <p
              className={`text-sm mb-2 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK }}
            >
              {k
                ? "«និកម្មភាព​បច្ចេកវិទ្យា» មិន​មាន​ន័យ​ថា​សង្គម​បរាជ័យ​ទេ។ វា​មាន​ន័យ​ថា​ម៉ាស៊ីន​បាន​ទទួល​ជោគជ័យ​ក្នុង​ការ​ទទួល​យក​ការងារ​ធ្ងន់ — អ្វី​ដែល​មនុស្ស​សុបិន​មាន​ជាង​មួយ​សតវត្ស។"
                : "'Technological unemployment' does not mean society has failed. It means the machines have succeeded in taking over the heavy lifting — exactly what humans have dreamed of for over a century."}
            </p>
            <p
              className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK_SOFT }}
            >
              {k
                ? "បញ្ហា​ពិត​មិន​មែន​ការងារ​ឡើយ — បញ្ហា​គឺ​ការ​ផ្លាស់​ប្ដូរ​របៀប​ដែល​មនុស្ស​ទទួល​បាន​លុយ​នៅ​ពេល​ដែល​ពួក​គេ​មិន​ត្រូវ​ការ «ធ្វើ​ការ» ក្នុង​ន័យ​ចាស់​ទៀត​ទេ។"
                : "The real problem is not work — it is changing how humans get money when they no longer have to 'work' in the traditional sense at all."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-2 mt-2">
        <ConceptChip
          accent={ROSE}
          termEn="Routine jobs"
          termKh="ការងារ​ប្រចាំ"
          detailEn="vanish first — predictable tasks"
          detailKh="បាត់​មុន​ដំបូង — ការងារ​ងាយ​ទាយ"
          iconEl={<Workflow className="w-3.5 h-3.5" />}
        />
        <ConceptChip
          accent={AMBER}
          termEn="Reskilling"
          termKh="ការ​បណ្ដុះ​ជំនាញ​ឡើង​វិញ"
          detailEn="bridges old jobs to new roles"
          detailKh="ភ្ជាប់​ការងារ​ចាស់​ទៅ​តួនាទី​ថ្មី"
          iconEl={<BookOpen className="w-3.5 h-3.5" />}
        />
        <ConceptChip
          accent={LIME}
          termEn="UBI / dividends"
          termKh="UBI / ភាគលាភ"
          detailEn="how money reaches humans without jobs"
          detailKh="របៀប​លុយ​ទៅ​ដល់​មនុស្ស​ដោយ​មិន​មាន​ការងារ"
          iconEl={<Heart className="w-3.5 h-3.5" />}
        />
      </div>
    </SectionShell>
  );
}

function CostCrossingChart() {
  // Two lines crossing — human stays high, machine drops, crossing point highlighted
  const W = 460, H = 180, P = 30;
  // Human cost: roughly flat (slowly rising)
  const humanPts: [number, number][] = [
    [0, 60], [1, 62], [2, 65], [3, 68], [4, 72], [5, 76], [6, 80],
  ];
  // Machine cost: starts very high, drops fast
  const machinePts: [number, number][] = [
    [0, 160], [1, 130], [2, 100], [3, 75], [4, 55], [5, 40], [6, 30],
  ];
  const sx = (i: number) => P + (i / 6) * (W - 2 * P);
  const sy = (v: number) => H - P - (v / 170) * (H - 2 * P);
  const path = (pts: [number, number][]) =>
    pts.map(([i, v], idx) => `${idx === 0 ? "M" : "L"} ${sx(i)} ${sy(v)}`).join(" ");
  // Crossing point ~ between i=3 and i=4 for these values
  const cx = sx(3.4);
  const cy = sy(70);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Two cost curves crossing: machine cost falls below human cost over time.">
      {/* axes */}
      <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke={INK_DIM} strokeWidth="1" />
      <line x1={P} y1={P} x2={P} y2={H - P} stroke={INK_DIM} strokeWidth="1" />
      <text x={P} y={H - 8} fill={INK_DIM} fontSize="10" fontFamily="monospace">
        time →
      </text>
      <text x={4} y={P + 8} fill={INK_DIM} fontSize="10" fontFamily="monospace">
        $
      </text>
      {/* curves */}
      <path d={path(humanPts)} fill="none" stroke={ROSE} strokeWidth="2.5" />
      <path d={path(machinePts)} fill="none" stroke={CYAN} strokeWidth="2.5" />
      {/* crossing marker */}
      <circle cx={cx} cy={cy} r="6" fill={AMBER} />
      <circle cx={cx} cy={cy} r="11" fill="none" stroke={AMBER} strokeWidth="1.5" opacity="0.6" />
      <text x={cx + 12} y={cy - 6} fill={AMBER} fontSize="11" fontFamily="monospace">
        crossing
      </text>
      <text x={cx + 12} y={cy + 6} fill={AMBER} fontSize="10" fontFamily="monospace">
        ចំណុច​ឆ្លង
      </text>
      {/* labels at line ends */}
      <text x={W - P - 4} y={sy(80) - 6} fill={ROSE} fontSize="11" fontFamily="monospace" textAnchor="end">
        human ↑
      </text>
      <text x={W - P - 4} y={sy(30) - 6} fill={CYAN} fontSize="11" fontFamily="monospace" textAnchor="end">
        machine ↓
      </text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 03 — The AI-Managed Economy
// ════════════════════════════════════════════════════════════════════════════

function SectionAIManagedEconomy({ k }: { k: boolean }) {
  return (
    <SectionShell
      id="ai-managed"
      num="03"
      Icon={Network}
      accent={VIOLET}
      eyebrowEn="The new operating system"
      eyebrowKh="ប្រព័ន្ធ​ប្រតិបត្តិការ​ថ្មី"
      titleEn="The AI-Managed Economy"
      titleKh="សេដ្ឋកិច្ចគ្រប់គ្រងដោយ AI"
      k={k}
    >
      <Body
        k={k}
        en="Managing a global supply chain of infinite abundance is far too complex for any human brain — or even any committee of human brains. There are billions of fields, factories, ports, and storage rooms moving billions of items every minute. No president, no minister, no executive has ever been able to see all of it at once."
        kh="ការ​គ្រប់​គ្រង​ខ្សែ​សង្វាក់​ផ្គត់​ផ្គង់​សកល​នៃ​ភាព​សម្បូរ​មិន​អស់​គឺ​ស្មុគ​ស្មាញ​ខ្លាំង​ពេក​សម្រាប់​ខួរ​ក្បាល​មនុស្ស — សូម្បី​តែ​គណៈកម្មាធិការ​មួយ​ក៏​មិន​អាច​ដែរ។ មាន​ស្រែ​ចម្ការ រោងចក្រ កំពង់ផែ និង​ឃ្លាំង​រាប់​ពាន់​លាន​កន្លែង​ដែល​ផ្លាស់​ប្ដូរ​ទំនិញ​រាប់​ពាន់​លាន​ក្នុង​មួយ​នាទី។ គ្មាន​ប្រធានាធិបតី គ្មាន​រដ្ឋមន្ត្រី គ្មាន​នាយក​ប្រតិបត្តិ​ណា​មួយ​អាច​មើល​ឃើញ​ទាំង​អស់​ក្នុង​ពេល​តែ​មួយ​បាន​ឡើយ។"
      />

      <Body
        k={k}
        en="Artificial Super Intelligence (ASI) — a thinking machine more capable than any human at almost every task — could become the global logistics manager. It would track raw materials in real time, predict crop yields months in advance, anticipate floods and droughts, and quietly route resources to where they are needed before anyone has to ask — without the bottlenecks of human error, distraction, or greed."
        kh="បញ្ញា​ខ្ពស់​សិប្បនិម្មិត (Artificial Super Intelligence – ASI) — ម៉ាស៊ីន​គិត​ដែល​ខ្លាំង​ជាង​មនុស្ស​ក្នុង​ស្ទើរ​គ្រប់​ការងារ — អាច​ក្លាយ​ជា​អ្នក​គ្រប់​គ្រង​ផ្គត់​ផ្គង់​សកល។ វា​នឹង​តាម​ដាន​វត្ថុធាតុ​ដើម​ក្នុង​ពេល​ពិត ទាយ​ទិន្នផល​ស្រូវ​ច្រូត​ច្រើន​ខែ​មុន ព្យាករ​ទឹក​ជំនន់ និង​រាំងស្ងួត ហើយ​ផ្ដល់​ធនធាន​ទៅ​កន្លែង​ដែល​ត្រូវ​ការ​ដោយ​ស្ងាត់ៗ​មុន​នឹង​នរណា​សួរ — ដោយ​មិន​មាន​ការ​ច្រើន​ស្ទះ​នៃ​កំហុស​មនុស្ស ការ​ភ្លេច ឬ​ភាព​លោភលន់។"
      />

      {/* Network diagram */}
      <div
        className="rounded-2xl border p-5"
        style={{
          backgroundColor: PANEL_2,
          borderColor: `${VIOLET}55`,
          boxShadow: `inset 0 0 0 1px ${VIOLET}22, 0 0 28px -16px ${VIOLET}`,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Network className="w-5 h-5" style={{ color: VIOLET }} />
          <h3 className={`font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
            {k ? "ASI ជា​អ្នក​គ្រប់គ្រង​ផ្គត់ផ្គង់​សកល" : "ASI as global logistics manager"}
          </h3>
          <span className="text-xs font-khmer" style={{ color: INK_SOFT }}>
            {k ? "ASI as global logistics manager" : "ASI ជា​អ្នក​គ្រប់គ្រង​ផ្គត់ផ្គង់​សកល"}
          </span>
        </div>
        <ASINetworkDiagram />
      </div>

      {/* Three concrete capabilities */}
      <div className="grid md:grid-cols-3 gap-4 mt-2">
        <CapabilityCard
          k={k}
          accent={CYAN}
          icon={<Database className="w-5 h-5" />}
          titleEn="Tracks raw materials"
          titleKh="តាម​ដាន​វត្ថុធាតុ​ដើម"
          bodyEn="Knows how much steel, lithium, food, and clean water exists right now — and exactly where it sits."
          bodyKh="ដឹង​បរិមាណ​ដែក សារធាតុ Lithium អាហារ និង​ទឹក​ស្អាត​ដែល​មាន​នៅ​ពេល​នេះ — និង​កន្លែង​ដែល​វា​ស្ថិត​នៅ​ពិត​ប្រាកដ។"
        />
        <CapabilityCard
          k={k}
          accent={LIME}
          icon={<TrendingUp className="w-5 h-5" />}
          titleEn="Predicts crop yields"
          titleKh="ទាយ​ទិន្នផល​ស្រូវ"
          bodyEn="Forecasts weather, pests, and harvests months in advance — so famine becomes a problem we plan around, not react to."
          bodyKh="ព្យាករ​អាកាសធាតុ សត្វល្អិត និង​ការ​ច្រូត​ច្រើន​ខែ​មុន — ដូច្នេះ​ភាព​អត់​ឃ្លាន​ក្លាយ​ជា​បញ្ហា​ដែល​យើង​ត្រៀម​មុន មិន​មែន​ប្រតិកម្ម​ក្រោយ។"
        />
        <CapabilityCard
          k={k}
          accent={MAGENTA}
          icon={<Globe className="w-5 h-5" />}
          titleEn="Distributes worldwide"
          titleKh="ចែកចាយ​ទូទាំង​ពិភពលោក"
          bodyEn="Routes goods to where they are needed in real time, with no human bottleneck of paperwork, ego, or corruption."
          bodyKh="នាំ​ផលិតផល​ទៅ​កន្លែង​ដែល​ត្រូវ​ការ​ក្នុង​ពេល​ពិត ដោយ​មិន​មាន​ការ​ច្រើន​ស្ទះ​នៃ​ក្រដាស ការ​អាត្មនិយម ឬ​អំពើ​ពុករលួយ។"
        />
      </div>

      {/* Caution */}
      <div
        className="rounded-xl border p-3 flex items-start gap-2"
        style={{
          backgroundColor: PANEL_2,
          borderColor: `${AMBER}55`,
        }}
      >
        <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
        <p
          className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: INK_SOFT }}
        >
          {k
            ? "សំណួរ​ដ៏​ធំ​បំផុត​មិន​មែន «តើ ASI អាច​ធ្វើ​បាន​ទេ?» ទេ — តែ​ជា «តើ​អ្នក​ណា​សរសេរ​ច្បាប់​ដែល​វា​ដើរ​តាម?» តម្លៃ​មនុស្ស​នៅ​តែ​ជា​ការ​សម្រេច​ចិត្ត​របស់​មនុស្ស ហើយ​មិន​អាច​ផ្ទេរ​ឱ្យ​ម៉ាស៊ីន​បាន​ឡើយ។"
            : "The biggest question is not 'can ASI do this?' — it is 'who writes the rules it follows?' Human values remain a human decision and cannot be outsourced to a machine."}
        </p>
      </div>
    </SectionShell>
  );
}

function CapabilityCard({
  k,
  accent,
  icon,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
}: {
  k: boolean;
  accent: string;
  icon: React.ReactNode;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  return (
    <article
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: PANEL_2,
        borderColor: `${accent}55`,
        boxShadow: `inset 0 0 0 1px ${accent}22, 0 0 26px -18px ${accent}`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border"
          style={{ backgroundColor: `${accent}1a`, borderColor: `${accent}55`, color: accent }}
        >
          {icon}
        </span>
      </div>
      {/* Always paired bilingual title */}
      <h4 className="font-bold leading-tight" style={{ color: accent }}>
        {titleEn}
      </h4>
      <div className="text-sm font-semibold font-khmer leading-snug" style={{ color: INK_SOFT }}>
        {titleKh}
      </div>
      <p
        className={`mt-2 text-[13px] ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
        style={{ color: INK }}
      >
        {k ? bodyKh : bodyEn}
      </p>
    </article>
  );
}

function ASINetworkDiagram() {
  // Central ASI hub connected to many resource nodes
  const cx = 230, cy = 110;
  const nodes: { x: number; y: number; label: string; kh: string; color: string }[] = [
    { x: 60,  y: 50,  label: "farms",     kh: "ស្រែ",    color: LIME },
    { x: 60,  y: 170, label: "factories", kh: "រោងចក្រ", color: AMBER },
    { x: 230, y: 30,  label: "energy",    kh: "ថាមពល",  color: CYAN },
    { x: 230, y: 195, label: "homes",     kh: "ផ្ទះ",    color: MAGENTA },
    { x: 400, y: 50,  label: "ports",     kh: "កំពង់ផែ", color: VIOLET },
    { x: 400, y: 170, label: "hospitals", kh: "មន្ទីរពេទ្យ", color: ROSE },
  ];
  return (
    <svg viewBox="0 0 460 220" className="w-full h-auto" role="img" aria-label="An ASI hub at the center of a network of resource nodes (farms, factories, energy, homes, ports, hospitals).">
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={VIOLET} stopOpacity="0.7" />
          <stop offset="100%" stopColor={VIOLET} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* lines */}
      {nodes.map((n, i) => (
        <line
          key={`l${i}`}
          x1={cx}
          y1={cy}
          x2={n.x}
          y2={n.y}
          stroke={n.color}
          strokeWidth="1.5"
          opacity="0.7"
        />
      ))}
      {/* glow under hub */}
      <circle cx={cx} cy={cy} r="40" fill="url(#hubGlow)" />
      {/* hub */}
      <circle cx={cx} cy={cy} r="22" fill={PANEL} stroke={VIOLET} strokeWidth="2" />
      <text x={cx} y={cy + 4} fill={VIOLET} fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        ASI
      </text>
      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r="14" fill={PANEL_2} stroke={n.color} strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="4" fill={n.color} />
          <text
            x={n.x}
            y={n.y - 22}
            fill={n.color}
            fontSize="10"
            fontFamily="monospace"
            textAnchor="middle"
          >
            {n.label}
          </text>
          <text
            x={n.x}
            y={n.y + 28}
            fill={INK_SOFT}
            fontSize="9"
            textAnchor="middle"
          >
            {n.kh}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SECTION 04 — The Value Shift
// ════════════════════════════════════════════════════════════════════════════

function SectionValueShift({ k }: { k: boolean }) {
  return (
    <SectionShell
      id="value-shift"
      num="04"
      Icon={Sparkles}
      accent={MAGENTA}
      eyebrowEn="The new human purpose"
      eyebrowKh="គោលបំណង​មនុស្ស​ថ្មី"
      titleEn="The Value Shift"
      titleKh="ការផ្លាស់ប្តូរតម្លៃ"
      k={k}
    >
      {/* Highlight thought-experiment card */}
      <div
        data-testid="value-thought-card"
        className="relative rounded-3xl border overflow-hidden"
        style={{
          backgroundColor: PANEL_2,
          borderColor: `${MAGENTA}66`,
          boxShadow: `inset 0 0 0 1px ${MAGENTA}33, 0 0 60px -22px ${MAGENTA}`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              `radial-gradient(circle at 20% 20%, ${MAGENTA}55, transparent 40%),` +
              `radial-gradient(circle at 80% 80%, ${VIOLET}55, transparent 50%)`,
          }}
        />
        <div className="relative p-6 sm:p-8">
          <div
            className={`flex items-center gap-2 mb-3 text-[11px] font-mono uppercase tracking-[0.25em] ${k ? "" : ""}`}
            style={{ color: MAGENTA }}
          >
            <HelpCircle className="w-4 h-4" />
            THOUGHT EXPERIMENT
            <span style={{ color: INK_DIM }}>·</span>
            <span className="font-khmer normal-case tracking-normal" style={{ color: INK_SOFT }}>
              ការ​ពិសោធ​គំនិត
            </span>
          </div>

          {/* Always paired bilingual question */}
          <blockquote
            className={`text-2xl sm:text-3xl font-extrabold leading-tight ${k ? "font-khmer leading-snug" : ""}`}
            style={{ color: INK }}
          >
            {k
              ? "បើ​អ្នក​មិន​ត្រូវ​ការ​ធ្វើ​ការ​ដើម្បី​រស់​ទៀត​ទេ — តើ​អ្នក​នឹង​ធ្វើ​អ្វី?"
              : "If you don't have to work to survive — what do you do?"}
          </blockquote>
          <div
            className="mt-2 text-base sm:text-lg font-semibold font-khmer leading-snug"
            style={{ color: INK_SOFT }}
          >
            {k
              ? "If you don't have to work to survive — what do you do?"
              : "បើ​អ្នក​មិន​ត្រូវ​ការ​ធ្វើ​ការ​ដើម្បី​រស់​ទៀត​ទេ — តើ​អ្នក​នឹង​ធ្វើ​អ្វី?"}
          </div>

          <p
            className={`mt-5 text-sm sm:text-base ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
            style={{ color: INK }}
          >
            {k
              ? "ក្នុង​ពិភពលោក​ក្រោយ​ភាព​ខ្វះខាត តម្លៃ​មនុស្ស​ផ្លាស់​ប្ដូរ​ពី «ការ​ផលិត​ទំនិញ» ទៅ​ការ​ច្នៃ​ប្រឌិត វិទ្យាសាស្ត្រ ទស្សនវិជ្ជា ការ​សាងសង់​សហគមន៍ និង​ការ​ស្វែង​យល់​ចក្រវាល។ យើង​ឈប់​ធ្វើ​ការ​ដើម្បី​រស់ ហើយ​ចាប់​ផ្ដើម​ធ្វើ​ការ​ដើម្បី​យល់។"
              : "In a post-scarcity world, human value shifts from 'producing goods' to creativity, science, philosophy, community building, and exploring the universe. We stop working to survive — and start working to understand."}
          </p>
        </div>
      </div>

      {/* New domains of human value */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
        <ValueDomain
          accent={MAGENTA}
          icon={<Sparkles className="w-5 h-5" />}
          en="Creativity"
          kh="ការ​ច្នៃ​ប្រឌិត"
        />
        <ValueDomain
          accent={CYAN}
          icon={<Cpu className="w-5 h-5" />}
          en="Science"
          kh="វិទ្យាសាស្ត្រ"
        />
        <ValueDomain
          accent={VIOLET}
          icon={<Brain className="w-5 h-5" />}
          en="Philosophy"
          kh="ទស្សនវិជ្ជា"
        />
        <ValueDomain
          accent={LIME}
          icon={<Users className="w-5 h-5" />}
          en="Community"
          kh="សហគមន៍"
        />
        <ValueDomain
          accent={AMBER}
          icon={<Telescope className="w-5 h-5" />}
          en="Exploration"
          kh="ការ​ស្វែង​យល់"
        />
      </div>

      {/* Closing reflection */}
      <div
        className="rounded-xl border p-4 mt-2 flex items-start gap-3"
        style={{
          backgroundColor: PANEL_2,
          borderColor: `${CYAN}55`,
        }}
      >
        <Compass className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
        <p
          className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
          style={{ color: INK_SOFT }}
        >
          {k
            ? "ការ​ងារ​មិន​នឹង​បាត់​នោះ​ទេ។ វា​នឹង​ក្លាយ​ជា​អ្វី​ដែល​យើង​ជ្រើស​ធ្វើ — មិន​មែន​អ្វី​ដែល​យើង​ត្រូវ​ធ្វើ​ដើម្បី​មិន​អត់​ឃ្លាន។ នេះ​ជា​ការ​ផ្លាស់​ប្ដូរ​ដ៏​ធំ​បំផុត​នៃ​អត្ថន័យ​មនុស្ស​នៅ​ក្នុង​ប្រវត្តិសាស្ត្រ​ទាំង​មូល។"
            : "Work will not disappear. It will become what we choose to do — not what we have to do to avoid hunger. This is the largest shift in the meaning of being human in all of recorded history."}
        </p>
      </div>
    </SectionShell>
  );
}

function ValueDomain({
  accent,
  icon,
  en,
  kh,
}: {
  accent: string;
  icon: React.ReactNode;
  en: string;
  kh: string;
}) {
  return (
    <div
      className="rounded-xl border p-3 text-center"
      style={{
        backgroundColor: PANEL_2,
        borderColor: `${accent}55`,
        boxShadow: `inset 0 0 0 1px ${accent}22`,
      }}
    >
      <span
        className="inline-flex items-center justify-center w-10 h-10 rounded-full border mb-2"
        style={{ backgroundColor: `${accent}1a`, borderColor: `${accent}66`, color: accent }}
      >
        {icon}
      </span>
      <div className="text-sm font-bold" style={{ color: INK }}>
        {en}
      </div>
      <div className="text-xs font-khmer leading-snug" style={{ color: INK_SOFT }}>
        {kh}
      </div>
    </div>
  );
}
