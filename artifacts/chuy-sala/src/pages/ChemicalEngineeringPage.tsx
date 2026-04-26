import { Link } from "wouter";
import {
  ArrowLeft,
  Factory,
  FlaskConical,
  HardHat,
  Thermometer,
  Pill,
  Zap,
  Droplets,
  Wheat,
  Filter,
  Calculator,
  Flame,
  Waves,
  Sparkles,
  ShieldAlert,
  Atom,
  Beaker,
  type LucideIcon,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Chemical Engineering — The Science of Scale
 * វិស្វកម្មគីមី៖ វិទ្យាសាស្ត្រនៃមាត្រដ្ឋាន
 *
 * Industrial / pragmatic aesthetic:
 *   STEEL  — slate-600/700 greys (#475569 / #334155)
 *   FLUID  — sky / cyan blues (#0284c7 / #0e7490)
 *   SAFETY — safety oranges  (#f97316 / #ea580c)
 *
 * Three cards: Basics · University Curriculum · Careers.
 * Bilingual EN/Khmer throughout.
 * ══════════════════════════════════════════════════════════════════════════ */

const STEEL = "#334155";        // slate-700
const STEEL_LIGHT = "#64748b";  // slate-500
const FLUID = "#0284c7";        // sky-700
const FLUID_LIGHT = "#0ea5e9";  // sky-500
const SAFETY = "#ea580c";       // orange-600
const SAFETY_LIGHT = "#f97316"; // orange-500

export function ChemicalEngineeringPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      {/* Backdrop: faint pipework grid */}
      <BackdropGrid />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Back link */}
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* Hero ─────────────────────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 via-sky-700 to-orange-500 text-white shadow-lg mb-4 ring-2 ring-orange-500/30">
            <Factory className="w-9 h-9" strokeWidth={2.25} aria-hidden />
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-[0.3em] text-orange-600 mb-2 inline-flex items-center gap-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
          >
            <HardHat className="w-3.5 h-3.5" aria-hidden />
            {t("Science / Engineering", "វិទ្យាសាស្ត្រ / វិស្វកម្ម")}
          </div>
          <h1
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
            data-testid="heading-hero"
          >
            {kh ? (
              "វិស្វកម្មគីមី៖ វិទ្យាសាស្ត្រនៃមាត្រដ្ឋាន"
            ) : (
              <>
                Chemical Engineering:{" "}
                <span className="bg-gradient-to-r from-slate-700 via-sky-600 to-orange-500 bg-clip-text text-transparent">
                  The Science of Scale
                </span>
              </>
            )}
          </h1>
          <p
            className={`text-base sm:text-lg text-slate-700 max-w-2xl mx-auto ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {t(
              "Chemists invent in glass test tubes. Chemical engineers turn that discovery into a multi-ton steel factory that runs safely, cheaply, and around the clock.",
              "អ្នកគីមីវិទ្យាបង្កើតរូបមន្តក្នុងបំពង់សាកល្បងកញ្ចក់។ វិស្វករគីមីបំប្លែងការរកឃើញនោះទៅជារោងចក្រដែកធ្ងន់រាប់តោន ដែលដំណើរការដោយសុវត្ថិភាព ថោក និងមួយម៉ោងម្ដងៗ ២៤ ម៉ោងក្នុងមួយថ្ងៃ។",
            )}
          </p>

          {/* Industrial-stat chip strip */}
          <div className="mt-5 inline-flex flex-wrap justify-center gap-2 text-[10px] sm:text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full border border-slate-300 bg-white/80 text-slate-700">
              {t("SCALE: g → tonnes", "មាត្រដ្ឋាន៖ ក្រាម → តោន")}
            </span>
            <span className="px-3 py-1.5 rounded-full border border-sky-300 bg-sky-50 text-sky-800">
              {t("FLOW: m³ / hr", "លំហូរ៖ ម៉ែត្រគូប/ម៉ោង")}
            </span>
            <span className="px-3 py-1.5 rounded-full border border-orange-300 bg-orange-50 text-orange-800">
              {t("SAFETY: zero leaks", "សុវត្ថិភាព៖ លេចមិនបាន")}
            </span>
            <span className="px-3 py-1.5 rounded-full border border-slate-300 bg-white/80 text-slate-700">
              {t("UPTIME: 24/7/365", "ម៉ោងប្រតិបត្តិ៖ ២៤/៧/៣៦៥")}
            </span>
          </div>
        </header>

        {/* Card 1 — Chemistry vs Engineering ─────────────────────────────── */}
        <Card1Basics kh={kh} t={t} />

        {/* Card 2 — University Curriculum ─────────────────────────────────── */}
        <Card2Curriculum kh={kh} t={t} />

        {/* Card 3 — Careers ──────────────────────────────────────────────── */}
        <Card3Careers kh={kh} t={t} />

        {/* Closing */}
        <div className="mt-10 rounded-2xl border-2 border-orange-300 bg-gradient-to-r from-slate-50 via-white to-orange-50 p-5 sm:p-6 text-center shadow-sm">
          <Sparkles className="w-5 h-5 mx-auto mb-2 text-orange-500" aria-hidden />
          <p
            className={`text-sm sm:text-base text-slate-800 ${kh ? "font-khmer text-base sm:text-lg leading-loose" : "leading-relaxed"}`}
          >
            {t(
              "Every clean glass of water, every safe vial of vaccine, every bag of fertilizer that feeds a province — somewhere behind it stands a chemical engineer who figured out how to make it a million times.",
              "កែវទឹកស្អាតគ្រប់កែវ ដបវ៉ាក់សាំងសុវត្ថិភាពគ្រប់ដប កាបូបជី គ្រប់កាបូប ដែលចិញ្ចឹមខេត្តទាំងមូល — នៅខាងក្រោយម្តងម្តងនៃវត្ថុទាំងនោះ មានវិស្វករគីមីម្នាក់ ដែលបានរៀបចំរបៀបធ្វើវាមួយលានដង។",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Backdrop — faint isometric piping grid
 * ─────────────────────────────────────────────────────────────────────── */
function BackdropGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden>
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="ce-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
          </pattern>
          <pattern id="ce-pipes" width="160" height="160" patternUnits="userSpaceOnUse">
            <path
              d="M 0 80 L 80 80 L 80 0 M 80 80 L 160 80"
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ce-grid)" />
        <rect width="100%" height="100%" fill="url(#ce-pipes)" />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Reusable bits
 * ─────────────────────────────────────────────────────────────────────── */

type T = ReturnType<typeof useTranslation>;

function CardShell({
  spec,
  Icon,
  enKicker,
  khKicker,
  enTitle,
  khTitle,
  accent,
  kh,
  children,
  testId,
}: {
  spec: string;
  Icon: LucideIcon;
  enKicker: string;
  khKicker: string;
  enTitle: string;
  khTitle: string;
  accent: string;
  kh: boolean;
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <section
      className="relative mb-8 rounded-3xl border-2 bg-white shadow-md overflow-hidden"
      style={{ borderColor: `${accent}55`, boxShadow: `0 12px 30px -18px ${accent}55` }}
      data-testid={testId}
    >
      {/* Top safety stripe */}
      <div
        className="h-1.5 w-full"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${accent}, ${accent} 12px, ${accent}33 12px, ${accent}33 20px)`,
        }}
      />

      <div className="p-5 sm:p-7">
        <div className="flex items-start gap-4 mb-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}55` }}
          >
            <Icon className="w-6 h-6" style={{ color: accent }} aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className={`text-[10px] font-mono uppercase tracking-[0.25em] mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              style={{ color: accent }}
            >
              {kh ? `ផ្នែក · ${spec}` : `Card · ${spec}`}
            </div>
            <h2
              className={`font-display font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
            >
              {kh ? khTitle : enTitle}
            </h2>
            <div
              className={`text-xs sm:text-sm font-medium mt-1 ${kh ? "font-khmer" : ""}`}
              style={{ color: STEEL_LIGHT }}
            >
              {kh ? khKicker : enKicker}
            </div>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}

function LabelChip({
  Icon,
  enLabel,
  khLabel,
  accent,
  kh,
}: {
  Icon: LucideIcon;
  enLabel: string;
  khLabel: string;
  accent: string;
  kh: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${kh ? "font-khmer" : ""}`}
      style={{
        color: accent,
        borderColor: `${accent}66`,
        backgroundColor: `${accent}10`,
      }}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden />
      {kh ? khLabel : enLabel}
    </span>
  );
}

function MiniTopic({
  Icon,
  enTitle,
  khTitle,
  enBody,
  khBody,
  accent,
  kh,
}: {
  Icon: LucideIcon;
  enTitle: string;
  khTitle: string;
  enBody: string;
  khBody: string;
  accent: string;
  kh: boolean;
}) {
  return (
    <div
      className="rounded-xl border bg-white p-4 hover:shadow-md transition-shadow"
      style={{ borderColor: `${accent}44` }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
        >
          <Icon className="w-[18px] h-[18px]" style={{ color: accent }} aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-sm sm:text-base text-slate-900 leading-snug ${kh ? "font-khmer" : ""}`}
          >
            {kh ? khTitle : enTitle}
          </h3>
          <p
            className={`text-xs sm:text-sm text-slate-700 mt-1 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {kh ? khBody : enBody}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Card 1 — The Basics: Chemistry vs Engineering
 * ─────────────────────────────────────────────────────────────────────── */
function Card1Basics({ kh, t }: { kh: boolean; t: T }) {
  return (
    <CardShell
      spec="01"
      Icon={FlaskConical}
      enKicker="Chemistry vs. Engineering"
      khKicker="គីមីវិទ្យា ធៀបនឹង វិស្វកម្ម"
      enTitle="The Basics"
      khTitle="មូលដ្ឋានគ្រឹះ"
      accent={STEEL}
      kh={kh}
      testId="card-basics"
    >
      {/* The Difference */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Chemist column */}
        <div
          className="rounded-2xl border-2 p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-white"
          style={{ borderColor: `${STEEL}44` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Beaker className="w-5 h-5" style={{ color: STEEL }} aria-hidden />
            <div
              className={`font-bold text-base sm:text-lg text-slate-900 ${kh ? "font-khmer" : ""}`}
            >
              {kh ? "អ្នកគីមីវិទ្យា" : "The Chemist"}
            </div>
            <span
              className={`text-[10px] font-mono uppercase tracking-widest ml-auto ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              style={{ color: STEEL_LIGHT }}
            >
              {kh ? "មាត្រដ្ឋាន ៖ ក្រាម" : "Scale: grams"}
            </span>
          </div>
          <p
            className={`text-sm text-slate-700 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {t(
              "Invents new molecules in small glass test tubes. The job stops when the reaction works once, on the bench, in clean conditions.",
              "បង្កើតម៉ូលេគុលថ្មី នៅក្នុងបំពង់សាកល្បងកញ្ចក់តូចៗ។ ការងារបញ្ចប់ នៅពេលប្រតិកម្មដំណើរការម្ដង នៅលើតុ ក្នុងលក្ខខណ្ឌស្អាត។",
            )}
          </p>
        </div>

        {/* Engineer column */}
        <div
          className="rounded-2xl border-2 p-4 sm:p-5 bg-gradient-to-br from-orange-50 to-white"
          style={{ borderColor: `${SAFETY}55` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Factory className="w-5 h-5" style={{ color: SAFETY }} aria-hidden />
            <div
              className={`font-bold text-base sm:text-lg text-slate-900 ${kh ? "font-khmer" : ""}`}
            >
              {kh ? "វិស្វករគីមី" : "The Chemical Engineer"}
            </div>
            <span
              className={`text-[10px] font-mono uppercase tracking-widest ml-auto ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              style={{ color: SAFETY }}
            >
              {kh ? "មាត្រដ្ឋាន ៖ តោន" : "Scale: tonnes"}
            </span>
          </div>
          <p
            className={`text-sm text-slate-700 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
          >
            {t(
              "Figures out how to produce that same molecule in massive, multi-ton steel factories — safely, cheaply, every single day, without ever stopping.",
              "រកវិធីផលិតម៉ូលេគុលដដែល នៅក្នុងរោងចក្រដែកដ៏ធំធ្ងន់រាប់តោន — ដោយសុវត្ថិភាព ថោក រាល់ថ្ងៃ ដោយមិនឈប់។",
            )}
          </p>
        </div>
      </div>

      {/* Connector / arrow */}
      <div
        className={`text-center text-xs font-mono uppercase tracking-[0.25em] mb-5 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}
        style={{ color: STEEL_LIGHT }}
      >
        {kh
          ? "↓ ការបំប្លែងពី បំពង់សាកល្បង → រោងចក្រ ↓"
          : "↓ Bench tube → multi-ton plant ↓"}
      </div>

      {/* The Core Concept — three pillars */}
      <div
        className="rounded-2xl border-2 p-4 sm:p-5 bg-white"
        style={{ borderColor: `${FLUID}44` }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${FLUID}14`, border: `1px solid ${FLUID}33` }}
          >
            <Atom className="w-4 h-4" style={{ color: FLUID }} aria-hidden />
          </div>
          <div>
            <div
              className={`text-[10px] font-mono uppercase tracking-[0.25em] ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              style={{ color: FLUID }}
            >
              {kh ? "គំនិតស្នូល" : "The Core Concept"}
            </div>
            <h3
              className={`font-bold text-base sm:text-lg text-slate-900 leading-snug ${kh ? "font-khmer" : ""}`}
            >
              {t(
                "It is the mastery of three things",
                "វាគឺជាការគ្រប់គ្រងលើរបស់បីយ៉ាង",
              )}
            </h3>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <PillarCard
            number="1"
            Icon={Waves}
            enTitle="Mass"
            khTitle="ម៉ាស"
            enSub="moving fluids"
            khSub="ចលនារបស់រាវ"
            enBody="Pumps, pipes, valves, and tanks — moving raw materials and products through the plant."
            khBody="ស្នប់ បំពង់ សន្ទះ និងធុង — ផ្លាស់ទីសម្ភារៈឆៅ និងផលិតផលឆ្លងកាត់រោងចក្រ។"
            accent={FLUID}
            kh={kh}
          />
          <PillarCard
            number="2"
            Icon={Flame}
            enTitle="Energy"
            khTitle="ថាមពល"
            enSub="heating & cooling"
            khSub="កំដៅ និងបញ្ជាប់ត្រជាក់"
            enBody="Boilers, heat exchangers, and refrigeration — every reaction needs the right temperature."
            khBody="ចម្អុះ ឧបករណ៍ផ្លាស់ប្តូរកំដៅ និងម៉ាស៊ីនត្រជាក់ — រាល់ប្រតិកម្មត្រូវការសីតុណ្ហភាពត្រឹមត្រូវ។"
            accent={SAFETY}
            kh={kh}
          />
          <PillarCard
            number="3"
            Icon={FlaskConical}
            enTitle="Reactions"
            khTitle="ប្រតិកម្ម"
            enSub="making the product"
            khSub="ផលិតផលិតផល"
            enBody="The reactor — where raw atoms are rearranged into the molecule the world needs."
            khBody="ឧបករណ៍ប្រតិកម្ម — ជាកន្លែងដែលអាតូមឆៅត្រូវបានរៀបចំឡើងវិញ ទៅជាម៉ូលេគុលដែលពិភពលោកត្រូវការ។"
            accent={STEEL}
            kh={kh}
          />
        </div>
      </div>
    </CardShell>
  );
}

function PillarCard({
  number,
  Icon,
  enTitle,
  khTitle,
  enSub,
  khSub,
  enBody,
  khBody,
  accent,
  kh,
}: {
  number: string;
  Icon: LucideIcon;
  enTitle: string;
  khTitle: string;
  enSub: string;
  khSub: string;
  enBody: string;
  khBody: string;
  accent: string;
  kh: boolean;
}) {
  return (
    <div
      className="rounded-xl border-2 p-3 sm:p-4 bg-gradient-to-b from-white to-slate-50 hover:shadow-md transition-shadow"
      style={{ borderColor: `${accent}55` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white font-mono"
          style={{ backgroundColor: accent }}
        >
          {number}
        </span>
        <Icon className="w-5 h-5" style={{ color: accent }} aria-hidden />
        <div className="flex-1">
          <div
            className={`font-bold text-base text-slate-900 leading-tight ${kh ? "font-khmer" : ""}`}
          >
            {kh ? khTitle : enTitle}
          </div>
          <div
            className={`text-[10px] font-mono uppercase tracking-widest ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            style={{ color: accent }}
          >
            {kh ? khSub : enSub}
          </div>
        </div>
      </div>
      <p
        className={`text-xs sm:text-sm text-slate-700 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {kh ? khBody : enBody}
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Card 2 — University Curriculum
 * ─────────────────────────────────────────────────────────────────────── */
function Card2Curriculum({ kh, t }: { kh: boolean; t: T }) {
  return (
    <CardShell
      spec="02"
      Icon={Calculator}
      enKicker="The classes you will survive at university"
      khKicker="មុខវិជ្ជាដែលអ្នកនឹងរស់រានមានជីវិតនៅសាកលវិទ្យាល័យ"
      enTitle="The University Curriculum"
      khTitle="កម្មវិធីសិក្សានៅសាកលវិទ្យាល័យ"
      accent={FLUID}
      kh={kh}
      testId="card-curriculum"
    >
      <p
        className={`text-sm sm:text-base text-slate-700 mb-5 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {t(
          "A chemical engineering degree is built on four pillar courses. Master these and you can read the blueprint of almost any factory in the world.",
          "សញ្ញាបត្រវិស្វកម្មគីមី ត្រូវបានសាងសង់លើមុខវិជ្ជាសសរស្តម្ភបួន។ គ្រប់គ្រងវានោះ អ្នកអាចអានគម្រោងបង្ហាញរបស់រោងចក្រស្ទើរតែទាំងអស់នៅលើពិភពលោក។",
        )}
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        <MiniTopic
          Icon={Calculator}
          enTitle="Mass & Energy Balances"
          khTitle="តុល្យភាពម៉ាស និងថាមពល"
          enBody="The fundamental accounting of a factory: what goes in must equal what comes out — atom for atom, joule for joule. Every plant design starts here."
          khBody="គណនេយ្យជាគ្រឹះនៃរោងចក្រ៖ អ្វីដែលចូល ត្រូវតែស្មើនឹងអ្វីដែលចេញ — អាតូមមួយទល់នឹងអាតូម ហ្សូលមួយទល់នឹងហ្សូល។ រាល់ការរចនារោងចក្រ ចាប់ផ្តើមនៅទីនេះ។"
          accent={FLUID}
          kh={kh}
        />
        <MiniTopic
          Icon={Waves}
          enTitle="Fluid Mechanics"
          khTitle="មេកានិចរាវ"
          enBody="The physics of how liquids and gases move through miles of pipes, pumps, and valves. Pressure drop, turbulence, the Reynolds number."
          khBody="រូបវិទ្យានៃរបៀបដែលរាវ និងឧស្ម័នផ្លាស់ទីឆ្លងកាត់បំពង់រាប់គីឡូម៉ែត្រ ស្នប់ និងសន្ទះ។ ការធ្លាក់សម្ពាធ ភាពប្រែប្រួល និងលេខ Reynolds។"
          accent={FLUID}
          kh={kh}
        />
        <MiniTopic
          Icon={Thermometer}
          enTitle="Thermodynamics & Heat Transfer"
          khTitle="ទែម៉ូឌីណាមិច និងការផ្ទេរកំដៅ"
          enBody="Calculate exactly how much energy is needed to boil, freeze, or stabilize a massive reaction — and how to move that heat in or out of a tank that holds 10,000 litres."
          khBody="គណនាឲ្យបានច្បាស់នូវថាមពលដែលត្រូវការ ដើម្បីដាំឲ្យពុះ បង្កក ឬធ្វើឲ្យមានស្ថេរភាព ប្រតិកម្មដ៏ធំ — និងរបៀបបញ្ចូល ឬដកកំដៅនោះចេញពីធុងដែលផ្ទុក ១០.០០០ លីត្រ។"
          accent={SAFETY}
          kh={kh}
        />
        <MiniTopic
          Icon={Filter}
          enTitle="Separation Processes"
          khTitle="ដំណើរការបំបែក"
          enBody="How to pull a single valuable chemical out of a soup of waste — by distillation (boiling-point ladders), advanced filtration, or membranes that pass one molecule and block the next."
          khBody="របៀបដកសារធាតុគីមីដ៏មានតម្លៃតែមួយ ចេញពីសម្ល៉សំណល់ — តាមការចម្រាញ់ (ជណ្ដើរចំណុចពុះ) ការច្រោះកម្រិតខ្ពស់ ឬភ្នាសដែលអនុញ្ញាតឲ្យម៉ូលេគុលមួយឆ្លងកាត់ ហើយរារាំងម៉ូលេគុលបន្ទាប់។"
          accent={FLUID}
          kh={kh}
        />
      </div>

      {/* Tag strip */}
      <div className="mt-5 flex flex-wrap gap-2">
        <LabelChip Icon={Calculator} enLabel="Math-heavy" khLabel="គណិតវិទ្យាច្រើន" accent={STEEL} kh={kh} />
        <LabelChip Icon={ShieldAlert} enLabel="Safety-first" khLabel="សុវត្ថិភាពមុនគេ" accent={SAFETY} kh={kh} />
        <LabelChip Icon={Waves} enLabel="Plant-scale" khLabel="មាត្រដ្ឋានរោងចក្រ" accent={FLUID} kh={kh} />
      </div>
    </CardShell>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Card 3 — Careers
 * ─────────────────────────────────────────────────────────────────────── */
function Card3Careers({ kh, t }: { kh: boolean; t: T }) {
  return (
    <CardShell
      spec="03"
      Icon={HardHat}
      enKicker="Real jobs, especially relevant to developing regions"
      khKicker="ការងារពិត ជាពិសេសសម្រាប់តំបន់កំពុងអភិវឌ្ឍន៍"
      enTitle="The Careers"
      khTitle="អាជីពការងារ"
      accent={SAFETY}
      kh={kh}
      testId="card-careers"
    >
      <p
        className={`text-sm sm:text-base text-slate-700 mb-5 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {t(
          "Chemical engineers work in almost every industry that matters for a country's development — from clean water and food security to medicine and clean energy.",
          "វិស្វករគីមីធ្វើការនៅក្នុងស្ទើរតែគ្រប់ឧស្សាហកម្ម ដែលសំខាន់សម្រាប់ការអភិវឌ្ឍន៍ប្រទេស — ចាប់ពីទឹកស្អាត និងសន្តិសុខស្បៀង រហូតដល់ឱសថ និងថាមពលស្អាត។",
        )}
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        <CareerColumn
          Icon={Droplets}
          accent={FLUID}
          kh={kh}
          enTitle="Water & Environmental"
          khTitle="ទឹក និងបរិស្ថាន"
          enRole="Water & Environmental Engineering"
          khRole="វិស្វកម្មទឹក និងបរិស្ថាន"
          enBody="Designing massive reverse-osmosis plants that turn salty river water into clean drinking water for entire provinces. Treating wastewater so it returns to the river clean instead of poisoning it."
          khBody="រចនារោងចក្រ Reverse Osmosis ដ៏ធំ ដែលប្រែទឹកទន្លេប្រៃ ទៅជាទឹកផឹកស្អាត សម្រាប់ខេត្តទាំងមូល។ ព្យាបាលទឹកសំណល់ ឲ្យត្រលប់ទៅទន្លេវិញដោយស្អាត ជំនួសឲ្យការបំពុលវា។"
          enExamples={["RO desalination plants", "Wastewater treatment", "Industrial scrubbers"]}
          khExamples={["រោងចក្រ RO លុបភាពប្រៃ", "ការព្យាបាលទឹកសំណល់", "ឧបករណ៍សម្អាតឧស្ម័ន"]}
        />
        <CareerColumn
          Icon={Wheat}
          accent={STEEL}
          kh={kh}
          enTitle="Food & Agriculture"
          khTitle="ស្បៀង និងកសិកម្ម"
          enRole="Food & Agriculture Engineering"
          khRole="វិស្វកម្មស្បៀង និងកសិកម្ម"
          enBody="Scaling up fertilizer production so a kilogram of nitrogen costs cents instead of dollars. Designing pasteurization factories that heat-kill bacteria in milk and juice without spoiling the taste — keeping a nation's food supply safe."
          khBody="ពង្រីកការផលិតជី ដើម្បីឲ្យអាសូតមួយគីឡូ មានតម្លៃត្រឹមតែប៉ុន្មានសេន ជំនួសឲ្យដុល្លារ។ រចនារោងចក្រ Pasteurization ដែលកម្តៅសម្លាប់បាក់តេរីក្នុងទឹកដោះគោ និងទឹកផ្លែឈើ ដោយមិនបង្ខូចរសជាតិ — រក្សាការផ្គត់ផ្គង់ស្បៀងរបស់ប្រទេសឲ្យមានសុវត្ថិភាព។"
          enExamples={["Urea / NPK fertilizer plants", "Milk & juice pasteurization", "Cooking-oil refining"]}
          khExamples={["រោងចក្រជី Urea / NPK", "Pasteurization ទឹកដោះគោ និងទឹកផ្លែឈើ", "ការចម្រាញ់ប្រេងម្ហូប"]}
        />
        <CareerColumn
          Icon={Zap}
          accent={SAFETY}
          kh={kh}
          enTitle="Energy & Pharmaceuticals"
          khTitle="ថាមពល និងឱសថ"
          enRole="Energy & Pharmaceutical Engineering"
          khRole="វិស្វកម្មថាមពល និងឱសថ"
          enBody="From refining biofuels out of waste sugarcane and palm oil, to mass-producing the life-saving vaccines and antibiotics that a public-health system depends on every single day."
          khBody="ចាប់ពីការចម្រាញ់ឥន្ធនៈជីវសាស្ត្រពីសំណល់អំពៅ និងប្រេងដូង រហូតដល់ការផលិតវ៉ាក់សាំង និងថ្នាំអង់ទីប៊ីយ៉ូទិកដ៏ច្រើនមហិមា ដែលប្រព័ន្ធសុខាភិបាលសាធារណៈពឹងផ្អែករាល់ថ្ងៃ។"
          enExamples={["Biodiesel & ethanol refining", "Vaccine bioreactors", "Antibiotic & API production"]}
          khExamples={["ការចម្រាញ់ Biodiesel និង Ethanol", "Bioreactor វ៉ាក់សាំង", "ការផលិតថ្នាំអង់ទីប៊ីយ៉ូទិក និង API"]}
          IconBottom={Pill}
        />
      </div>

      {/* Why it matters bar */}
      <div
        className="mt-6 flex items-start gap-3 rounded-xl border-2 p-4"
        style={{ borderColor: `${SAFETY}55`, backgroundColor: `${SAFETY}0d` }}
      >
        <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: SAFETY }} aria-hidden />
        <p
          className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
        >
          <span className={`font-bold ${kh ? "font-khmer" : ""}`} style={{ color: SAFETY }}>
            {t("Why this matters here:", "ហេតុអ្វីបានជាសំខាន់នៅទីនេះ៖")}{" "}
          </span>
          {t(
            "A single chemical engineer who understands distillation, water treatment, and reactor scale-up can give a province clean water, safe food, and locally-made medicine. There is no more practical engineering discipline for a developing country.",
            "វិស្វករគីមីម្នាក់ ដែលយល់អំពីការចម្រាញ់ ការព្យាបាលទឹក និងការពង្រីកមាត្រដ្ឋានឧបករណ៍ប្រតិកម្ម អាចផ្តល់ឲ្យខេត្តមួយនូវទឹកស្អាត ស្បៀងសុវត្ថិភាព និងឱសថផលិតក្នុងស្រុក។ មិនមានវិស័យវិស្វកម្មអ្វីដែលជាក់ស្តែងជាងនេះ សម្រាប់ប្រទេសកំពុងអភិវឌ្ឍន៍ឡើយ។",
          )}
        </p>
      </div>
    </CardShell>
  );
}

function CareerColumn({
  Icon,
  IconBottom,
  accent,
  kh,
  enTitle,
  khTitle,
  enRole,
  khRole,
  enBody,
  khBody,
  enExamples,
  khExamples,
}: {
  Icon: LucideIcon;
  IconBottom?: LucideIcon;
  accent: string;
  kh: boolean;
  enTitle: string;
  khTitle: string;
  enRole: string;
  khRole: string;
  enBody: string;
  khBody: string;
  enExamples: string[];
  khExamples: string[];
}) {
  return (
    <div
      className="rounded-2xl border-2 bg-gradient-to-b from-white to-slate-50 p-4 sm:p-5 flex flex-col"
      style={{ borderColor: `${accent}55` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}33` }}
        >
          <Icon className="w-5 h-5" style={{ color: accent }} aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-[10px] font-mono uppercase tracking-widest ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            style={{ color: accent }}
          >
            {kh ? khTitle : enTitle}
          </div>
          <div className={`font-bold text-sm sm:text-base text-slate-900 leading-tight ${kh ? "font-khmer" : ""}`}>
            {kh ? khRole : enRole}
          </div>
        </div>
        {IconBottom ? (
          <IconBottom className="w-4 h-4 opacity-60" style={{ color: accent }} aria-hidden />
        ) : null}
      </div>

      <p
        className={`text-xs sm:text-sm text-slate-700 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {kh ? khBody : enBody}
      </p>

      <ul className="mt-auto space-y-1.5">
        {(kh ? khExamples : enExamples).map((ex, i) => (
          <li
            key={i}
            className={`flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 ${kh ? "font-khmer" : ""}`}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
              style={{ backgroundColor: accent }}
            />
            <span>{ex}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChemicalEngineeringPage;
