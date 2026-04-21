import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CircleSlash,
  Crown,
  Globe2,
  HandHeart,
  Handshake,
  Hammer,
  Home,
  Layers,
  Link2,
  Network,
  Quote,
  Rocket,
  Scale,
  Sparkles,
  Sprout,
  Swords,
  Trophy,
  Users,
  Wheat,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  SOC-02 · Competition vs. Cooperation: The Social Operating System
//           ការប្រកួតប្រជែង និងកិច្ចសហប្រតិបត្តិការ៖ ប្រព័ន្ធប្រតិបត្តិការសង្គម
//
//  1. The Two Strategies        · competition (zero-sum) vs. cooperation (positive-sum)
//  2. The Evolution of Society  · expanding circle of cooperation + Resource-Based Economy
//  3. The Local Reality         · Pravas Dai · Cambodian mutual aid
//
//  Aesthetic: Connected Nodes — warm human tones (terracotta, sand)
//             contrasted with indigo cooperation; SVG node-network hero.
// ════════════════════════════════════════════════════════════════════════════

const COMP = "#c2410c";       // competition — burnt terracotta (sharp, individual)
const COMP_LIGHT = "#fed7aa";
const COMP_DEEP = "#7c2d12";

const COOP = "#4338ca";       // cooperation — deep indigo (calm, collective)
const COOP_LIGHT = "#c7d2fe";
const COOP_DEEP = "#312e81";

const HUMAN = "#a16207";      // warm human gold for hero accents
const HUMAN_LIGHT = "#fef3c7";

const SAND = "#fefce8";       // page background — sand cream
const PARCHMENT = "#fff7ed";
const INK = "#1e293b";

const FRAME: React.CSSProperties = {
  backgroundColor: SAND,
  backgroundImage:
    "radial-gradient(circle at 12% 20%, rgba(194, 65, 12, 0.06), transparent 45%)," +
    "radial-gradient(circle at 88% 80%, rgba(67, 56, 202, 0.06), transparent 50%)," +
    `linear-gradient(${PARCHMENT}, ${SAND})`,
};

type T = (en: string, kh: string) => string;

// ─── SVG node network (decorative hero background) ─────────────────────────

function NodeNetwork({
  className = "",
  density = 14,
  highlightColor = COOP,
  baseColor = "#cbd5e1",
}: {
  className?: string;
  density?: number;
  highlightColor?: string;
  baseColor?: string;
}) {
  // deterministic pseudo-random points
  const rng = (seed: number) => {
    let s = seed;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  };
  const r = rng(7);
  const points = Array.from({ length: density }, () => ({
    x: 5 + r() * 90,
    y: 5 + r() * 90,
  }));

  // connect each point to its 2 nearest neighbours
  const lines: { x1: number; y1: number; x2: number; y2: number; o: number }[] = [];
  for (let i = 0; i < points.length; i++) {
    const dists = points
      .map((p, j) => ({ j, d: Math.hypot(p.x - points[i].x, p.y - points[i].y) }))
      .filter(d => d.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const { j, d } of dists) {
      lines.push({
        x1: points[i].x,
        y1: points[i].y,
        x2: points[j].x,
        y2: points[j].y,
        o: Math.max(0.08, 0.5 - d / 80),
      });
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {lines.map((l, i) => (
        <line
          key={`l-${i}`}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke={baseColor}
          strokeWidth="0.25"
          opacity={l.o}
        />
      ))}
      {points.map((p, i) => (
        <circle
          key={`p-${i}`}
          cx={p.x}
          cy={p.y}
          r={i % 4 === 0 ? 1.2 : 0.7}
          fill={i % 4 === 0 ? highlightColor : baseColor}
          opacity={i % 4 === 0 ? 0.85 : 0.5}
        />
      ))}
    </svg>
  );
}

// ─── Section header ─────────────────────────────────────────────────────────

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

// ─── Concept card with subtle node-network watermark ───────────────────────

type ConceptCardProps = {
  k: boolean;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  enName: string;
  khName: string;
  enTag: string;
  khTag: string;
  enBody: string;
  khBody: string;
  accent: string;
  glow?: boolean;
  badge?: { en: string; kh: string };
  children?: React.ReactNode;
  watermark?: boolean;
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
  watermark = false,
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
      {watermark ? (
        <NodeNetwork
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
          density={18}
          highlightColor={accent}
          baseColor={`${accent}88`}
        />
      ) : null}

      <div className="relative flex items-start gap-3 mb-3">
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

      <p
        className={`relative text-sm sm:text-[15px] text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      >
        {k ? khBody : enBody}
      </p>

      {children ? <div className="relative mt-4">{children}</div> : null}
    </div>
  );
}

// ─── Pull-out callout ───────────────────────────────────────────────────────

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

// ════════════════════════════════════════════════════════════════════════════

export function CompetitionCooperationPage() {
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
            borderColor: `${HUMAN}66`,
            backgroundImage: `
              radial-gradient(circle at 18% 28%, ${COMP}cc, transparent 55%),
              radial-gradient(circle at 82% 70%, ${COOP}cc, transparent 55%),
              linear-gradient(135deg, #fef3c7 0%, #fff7ed 50%, #e0e7ff 100%)
            `,
          }}
        >
          {/* Connected nodes background */}
          <NodeNetwork
            className="absolute inset-0 w-full h-full opacity-50"
            density={28}
            highlightColor="#ffffff"
            baseColor="rgba(255,255,255,0.65)"
          />

          <div className="relative flex items-start gap-4">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border bg-white/85 backdrop-blur-sm"
              style={{ borderColor: `${HUMAN}66` }}
            >
              <Network className="w-8 h-8" style={{ color: COOP_DEEP }} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] mb-2 ${k ? "font-khmer normal-case tracking-normal" : ""}`}
                style={{ color: COMP_DEEP }}
              >
                <span>{t("Sociology", "សង្គមវិទ្យា")}</span>
                <span>·</span>
                <span>SOC-02</span>
              </div>
              <h1
                className={`text-3xl sm:text-4xl font-extrabold leading-tight ${k ? "font-khmer leading-loose" : ""}`}
                style={{ color: INK }}
                data-testid="page-title"
              >
                {t(
                  "Competition vs. Cooperation: The Social Operating System",
                  "ការប្រកួតប្រជែង និងកិច្ចសហប្រតិបត្តិការ៖ ប្រព័ន្ធប្រតិបត្តិការសង្គម"
                )}
              </h1>
              <p
                className={`mt-3 text-sm sm:text-base text-slate-700 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              >
                {t(
                  "Every society — from a school classroom to an entire civilisation — runs on one of two underlying programs: compete with one another, or cooperate with one another. Most real societies blend the two, but the recipe of that blend quietly decides almost everything else: who is rich and who is poor, what gets invented, who feels safe, and how long the village lasts.",
                  "សង្គមនីមួយៗ — ចាប់ពីថ្នាក់រៀននៅសាលា ដល់អរិយធម៌ទាំងមូល — ដំណើរការដោយប្រើកម្មវិធីមូលដ្ឋានមួយក្នុងចំណោមពីរ ៖ ប្រកួតប្រជែងគ្នាទៅវិញទៅមក ឬសហប្រតិបត្តិការគ្នាទៅវិញទៅមក។ សង្គមពិតភាគច្រើនលាយឡំទាំងពីរ ប៉ុន្តែរូបមន្តនៃការលាយឡំនោះ ស្ងៀមៗកំណត់ស្ទើរតែគ្រប់យ៉ាងផ្សេងទៀត ៖ នរណាជាអ្នកមាន នរណាជាអ្នកក្រ អ្វីដែលត្រូវបង្កើត នរណាមានអារម្មណ៍មានសុវត្ថិភាព និងភូមិនេះរស់នៅបានប៉ុន្មានយូរ។"
                )}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <HeroChip color={COMP} k={k} en="Zero-sum"     kh="ផលសរុបសូន្យ" />
                <HeroChip color={COOP} k={k} en="Positive-sum" kh="ផលសរុបវិជ្ជមាន" />
                <HeroChip color={HUMAN} k={k} en="Pravas Dai"  kh="ប្រវ៉ាស់ដៃ" />
              </div>
            </div>
          </div>
        </header>

        <SectionTwoStrategies k={k} t={t} />
        <SectionEvolution     k={k} t={t} />
        <SectionLocalReality  k={k} t={t} />

        {/* Closing */}
        <div
          className="relative mt-12 rounded-3xl border-2 p-5 sm:p-6 flex items-start gap-3 shadow overflow-hidden"
          style={{
            borderColor: `${HUMAN}66`,
            backgroundImage: `linear-gradient(135deg, #ffffff 0%, ${HUMAN_LIGHT}cc 100%)`,
          }}
          data-testid="closing-note"
        >
          <NodeNetwork
            className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
            density={20}
            highlightColor={HUMAN}
            baseColor={`${HUMAN}88`}
          />
          <Sparkles className="relative w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: COMP_DEEP }} />
          <p className={`relative text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong className={k ? "" : "font-bold"}>
              {t("The big idea: ", "គំនិតធំ ៖ ")}
            </strong>
            {t(
              "Competition is not evil and cooperation is not weak. Both are tools — what matters is which one we choose for which task. Compete in sport and science; cooperate in food, water, climate, and care. The mark of a wise society is not how hard it competes, but how skilfully it knows when to put the swords down and pick up the basket together.",
              "ការប្រកួតប្រជែងមិនមែនជាអាក្រក់ ហើយកិច្ចសហប្រតិបត្តិការមិនមែនខ្សោយទេ។ ទាំងពីរគឺជាឧបករណ៍ — អ្វីដែលសំខាន់ គឺអ្នកណាត្រូវយកមួយណាសម្រាប់កិច្ចការអ្វី។ ប្រកួតប្រជែងក្នុងកីឡា និងវិទ្យាសាស្ត្រ ៖ សហប្រតិបត្តិការក្នុងអាហារ ទឹក អាកាសធាតុ និងការថែទាំ។ សញ្ញាសម្គាល់នៃសង្គមដ៏ឈ្លាសវៃ មិនមែននៅក្នុងការប្រកួតប្រជែងរបស់វាខ្លាំងប៉ុណ្ណានោះទេ ប៉ុន្តែវាដឹងដោយជំនាញ ពេលណាគួរទម្លាក់ដាវចុះ ហើយបោះជើងលើកកន្ត្រកជាមួយគ្នា។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold shadow hover:opacity-90 transition-opacity ${k ? "font-khmer" : ""}`}
            style={{ backgroundColor: COOP_DEEP }}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

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

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — The Two Strategies
// ════════════════════════════════════════════════════════════════════════════

function SectionTwoStrategies({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-12" data-testid="section-two-strategies">
      <SectionHeader
        spec="01"
        en="The Two Strategies"
        kh="យុទ្ធសាស្ត្រទាំងពីរ"
        k={k}
        Icon={Scale}
        accent={INK}
      />

      <p className={`text-sm text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "Both strategies have built civilisations. Both have wrecked them. The first job of a sociologist is to recognise which one is being used in front of you, and to ask honestly: is it the right one for this problem?",
          "យុទ្ធសាស្ត្រទាំងពីរបានកសាងអរិយធម៌។ ទាំងពីរបានបំផ្លាញវាដែរ។ កិច្ចការដំបូងរបស់អ្នកសង្គមវិទ្យា គឺត្រូវស្គាល់ថា មួយណាកំពុងត្រូវបានប្រើប្រាស់នៅមុខអ្នក ហើយសួរដោយស្មោះត្រង់ ៖ តើវាជាមួយដែលត្រឹមត្រូវសម្រាប់បញ្ហានេះឬទេ?"
        )}
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        <ConceptCard
          k={k}
          Icon={Swords}
          enName="Competition"
          khName="ការប្រកួតប្រជែង"
          enTag="zero-sum · scarcity assumed"
          khTag="ផលសរុបសូន្យ · សន្មតថាខ្វះខាត"
          enBody={"Competition is the social program that quietly assumes there is not enough to go around. If only one person can win the race, the prize, or the spot in the school, then by definition another person must lose. That is what \u201Czero-sum\u201D means: every win on one side has to be paid for by a loss on the other. This program can be powerful — fear of losing pushes people and nations to invent at incredible speed. But the same program also leaves stress, inequality, and enormous waste in its wake, because the same problem ends up being solved separately by ten different rivals when one shared solution would have done."}
          khBody="ការប្រកួតប្រជែង គឺជាកម្មវិធីសង្គមដែលស្ងៀមៗសន្មតថា មិនមានអ្វីគ្រប់គ្រាន់សម្រាប់ចែករំលែក។ ប្រសិនបើមនុស្សតែម្នាក់អាចឈ្នះការប្រណាំង រង្វាន់ ឬកន្លែងនៅសាលា នោះតាមនិយមន័យ មនុស្សផ្សេងទៀតត្រូវចាញ់។ នោះគឺជាអ្វីដែល «ផលសរុបសូន្យ» មានន័យ ៖ ការឈ្នះម្ខាងៗ ត្រូវត្រូវបង់ដោយការចាញ់ម្ខាងទៀត។ កម្មវិធីនេះអាចមានឥទ្ធិពលខ្លាំង — ការភ័យខ្លាចចាញ់រុញច្រានមនុស្ស និងប្រទេសឲ្យបង្កើតថ្មីដោយល្បឿនមិនគួរឲ្យជឿ។ ប៉ុន្តែកម្មវិធីដូចគ្នានេះ ក៏ទុកនូវភាពតានតឹង វិសមភាព និងការខ្ជះខ្ជាយដ៏ច្រើនសម្បើមនៅខាងក្រោយ ព្រោះបញ្ហាដូចគ្នាបញ្ចប់ដោយការដោះស្រាយដាច់ដោយឡែកដោយគូប្រកួតប្រជែងដប់នាក់ ខណៈដែលដំណោះស្រាយរួមតែមួយ បានធ្វើការជំនួសវាបាន។"
          accent={COMP}
          glow
          badge={{ en: "Zero-sum", kh: "ផលសរុបសូន្យ" }}
        >
          <Callout
            k={k}
            Icon={Rocket}
            labelEn="Famous example"
            labelKh="ឧទាហរណ៍ល្បី"
            enTitle="The Space Race (USA vs USSR, 1957–1969)"
            khTitle="ការប្រកួតប្រជែងអវកាស (សហរដ្ឋ ទល់នឹង សូវៀត ឆ្នាំ ១៩៥៧–១៩៦៩)"
            enBody="When the Soviet Union launched Sputnik, fear of losing pushed the United States to build NASA from nothing and put a human on the Moon in just twelve years — an engineering miracle that almost certainly would not have happened at that speed without the rivalry. But the same competition also doubled the cost: each side built its own rockets, its own training systems, its own labs, often duplicating exactly what the other side had already done. Innovation and waste, on the same bill."
            khBody="នៅពេលដែលសហភាពសូវៀតបានបាញ់បង្ហោះស្ពូតនិក ការភ័យខ្លាចចាញ់បានរុញច្រានសហរដ្ឋអាមេរិកឲ្យកសាងណាសា (NASA) ពីភាពទទេ ហើយបញ្ជូនមនុស្សម្នាក់ទៅព្រះច័ន្ទ ក្នុងរយៈពេលត្រឹមតែ ១២ ឆ្នាំ — ជាអព្ភូតហេតុវិស្វកម្មមួយដែលស្ទើរតែប្រាកដថា មិនបានកើតឡើងក្នុងល្បឿននោះទេ ប្រសិនបើគ្មានការប្រកួតប្រជែង។ ប៉ុន្តែការប្រកួតប្រជែងដូចគ្នានេះក៏ធ្វើឲ្យតម្លៃកើនទ្វេដង ៖ ភាគីនីមួយៗបានសាងសង់រ៉ុក្កែតផ្ទាល់ខ្លួន ប្រព័ន្ធបណ្តុះបណ្តាលផ្ទាល់ខ្លួន មន្ទីរពិសោធន៍ផ្ទាល់ខ្លួន ច្រើនតែធ្វើស្ទួនច្បាស់នូវអ្វីដែលភាគីម្ខាងទៀតបានធ្វើរួចហើយ។ នវានុវត្តន៍ និងការខ្ជះខ្ជាយ នៅលើវិក្កយបត្រដូចគ្នា។"
            accent={COMP}
          />
        </ConceptCard>

        <ConceptCard
          k={k}
          Icon={Handshake}
          enName="Cooperation"
          khName="កិច្ចសហប្រតិបត្តិការ"
          enTag="positive-sum · synergy"
          khTag="ផលសរុបវិជ្ជមាន · ការសហការ"
          enBody={"Cooperation runs on the opposite assumption: that by combining what we each have, we can produce something none of us could have produced alone. Two farmers sharing one ox can plough four fields in the time one farmer with one ox could plough two. A doctor who knows medicine and a carpenter who knows wood can together build a clinic that neither would dare to build alone. This is what mathematicians call a \u201Cpositive-sum game\u201D \u2014 the total pie literally gets larger because the players share the work. Cooperation does not always feel as exciting as competition, but over centuries it is the strategy that has actually built schools, vaccines, irrigation, and writing."}
          khBody="កិច្ចសហប្រតិបត្តិការ ដំណើរការលើការសន្មតផ្ទុយ ៖ ដោយការផ្សំនូវអ្វីដែលយើងម្នាក់ៗមាន យើងអាចផលិតនូវអ្វីមួយដែលគ្មាននរណាម្នាក់ក្នុងចំណោមយើងអាចផលិតបានតែម្នាក់ឯងបាន។ កសិករពីរនាក់ចែករំលែកគោមួយ អាចភ្ជួរស្រែបួនកន្លែង ក្នុងពេលដែលកសិករម្នាក់ ជាមួយគោមួយក្បាល អាចភ្ជួរបានពីរ។ វេជ្ជបណ្ឌិតដែលចេះវេជ្ជសាស្ត្រ និងជាងឈើដែលចេះឈើ អាចសាងសង់គ្លីនិកមួយដែលគ្មាននរណាម្នាក់ហ៊ានសាងសង់តែម្នាក់ឯងបាន។ នេះគឺជាអ្វីដែលគណិតវិទូហៅថា «ហ្គេមផលសរុបវិជ្ជមាន» — នំខ្ចប់ទាំងមូលពិតជាកើនឡើង ព្រោះអ្នកលេងចែករំលែកការងារ។ កិច្ចសហប្រតិបត្តិការមិនតែងតែមានអារម្មណ៍រំភើបដូចការប្រកួតប្រជែងទេ ប៉ុន្តែឆ្លងកាត់សតវត្ស វាគឺជាយុទ្ធសាស្ត្រដែលពិតជាបានកសាងសាលារៀន វ៉ាក់សាំង ប្រព័ន្ធធារាសាស្ត្រ និងការសរសេរ។"
          accent={COOP}
          glow
          watermark
          badge={{ en: "Positive-sum", kh: "ផលសរុបវិជ្ជមាន" }}
        >
          <Callout
            k={k}
            Icon={Layers}
            labelEn="Synergy"
            labelKh="ការសហការ"
            enTitle="1 + 1 = 3"
            khTitle="១ + ១ = ៣"
            enBody="The technical word for cooperation that produces more than its parts is synergy. A village in which every farmer keeps his rice secret produces less food than a village where farmers share which seeds worked best last season. The shared knowledge is the third 1 — the part that no single person paid for, but everyone benefits from."
            khBody="ពាក្យបច្ចេកទេសសម្រាប់កិច្ចសហប្រតិបត្តិការ ដែលផលិតបានច្រើនជាងផ្នែករបស់វា គឺ ការសហការ។ ភូមិមួយដែលកសិករនីមួយៗរក្សាស្រូវរបស់ខ្លួនជាការសម្ងាត់ ផលិតបានអាហារតិចជាងភូមិមួយដែលកសិករចែករំលែកថាគ្រាប់ពូជមួយណាដំណើរការបានល្អបំផុតក្នុងរដូវកន្លងមក។ ចំណេះដឹងរួមនោះ គឺជាលេខ ១ ទីបី — ផ្នែកដែលគ្មាននរណាម្នាក់បានបង់ថ្លៃ ប៉ុន្តែគ្រប់គ្នាទទួលបានផល។"
            accent={COOP}
          />
        </ConceptCard>
      </div>

      {/* Quick comparison strip */}
      <div
        className="mt-5 rounded-3xl border-2 bg-white p-4 sm:p-5 grid sm:grid-cols-2 gap-4"
        style={{ borderColor: `${INK}22` }}
      >
        {[
          {
            color: COMP,
            heading: "Competition",
            khHeading: "ការប្រកួតប្រជែង",
            rows: [
              { k: "Assumes", v: "Scarcity",       kk: "សន្មត",   kv: "ភាពខ្វះខាត" },
              { k: "Game type", v: "Zero-sum",     kk: "ប្រភេទហ្គេម", kv: "ផលសរុបសូន្យ" },
              { k: "Drives",  v: "Speed, fear",    kk: "រុញច្រាន",  kv: "ល្បឿន ការភ័យខ្លាច" },
              { k: "Costs",   v: "Stress · waste · inequality", kk: "តម្លៃ", kv: "តានតឹង · ខ្ជះខ្ជាយ · វិសមភាព" },
            ],
          },
          {
            color: COOP,
            heading: "Cooperation",
            khHeading: "កិច្ចសហប្រតិបត្តិការ",
            rows: [
              { k: "Assumes",   v: "Shared abundance", kk: "សន្មត",     kv: "ភាពបរិបូរណ៌រួម" },
              { k: "Game type", v: "Positive-sum",     kk: "ប្រភេទហ្គេម", kv: "ផលសរុបវិជ្ជមាន" },
              { k: "Drives",    v: "Synergy, trust",   kk: "រុញច្រាន",   kv: "ការសហការ ទំនុកចិត្ត" },
              { k: "Costs",     v: "Slower decisions · free-riders", kk: "តម្លៃ", kv: "ការសម្រេចចិត្តយឺត · អ្នកជិះឥតគិតថ្លៃ" },
            ],
          },
        ].map(col => (
          <div key={col.heading} className="rounded-2xl p-4 border" style={{ borderColor: `${col.color}33`, backgroundColor: `${col.color}08` }}>
            <h4 className={`font-bold mb-3 text-base ${k ? "font-khmer" : ""}`} style={{ color: col.color }}>
              {k ? col.khHeading : col.heading}
            </h4>
            <dl className="space-y-1.5 text-sm">
              {col.rows.map((row, i) => (
                <div key={i} className="grid grid-cols-3 gap-2">
                  <dt className={`text-xs uppercase tracking-wider text-slate-500 ${k ? "font-khmer normal-case tracking-normal" : ""}`}>
                    {k ? row.kk : row.k}
                  </dt>
                  <dd className={`col-span-2 font-medium ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                    {k ? row.kv : row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — The Evolution of Society
// ════════════════════════════════════════════════════════════════════════════

function SectionEvolution({ k, t }: { k: boolean; t: T }) {
  // expanding circles of cooperation
  const stages = [
    { Icon: Users,   en: "Family",   kh: "គ្រួសារ",         scale: "~10" },
    { Icon: Home,    en: "Tribe",    kh: "កុលសម្ព័ន្ធ",     scale: "~150" },
    { Icon: Wheat,   en: "Village",  kh: "ភូមិ",            scale: "~1,000" },
    { Icon: Crown,   en: "Nation",   kh: "ប្រជាជាតិ",       scale: "millions" },
    { Icon: Globe2,  en: "Planet",   kh: "ភពផែនដី",         scale: "8 billion" },
  ];

  return (
    <section className="mb-12" data-testid="section-evolution">
      <SectionHeader
        spec="02"
        en="The Evolution of Society"
        kh="ការវិវត្តនៃសង្គម"
        k={k}
        Icon={Sprout}
        accent={COOP}
      />

      <p className={`text-sm text-slate-700 mb-5 max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "If you read history as a long story, it is the story of one thing slowly getting bigger: the size of the group of strangers we are willing to cooperate with. Every step forward — agriculture, writing, money, law, the internet — was a tool that let us trust and work with people we had never personally met.",
          "ប្រសិនបើអ្នកអានប្រវត្តិសាស្ត្រជារឿងវែងមួយ វាគឺជារឿងនៃរបស់មួយដែលធំឡើងបន្តិចម្តងៗ ៖ ទំហំនៃក្រុមមនុស្សចម្លែកដែលយើងសុខចិត្តសហប្រតិបត្តិការជាមួយ។ ជំហានទៅមុខនីមួយៗ — កសិកម្ម ការសរសេរ លុយ ច្បាប់ អ៊ីនធើណិត — គឺជាឧបករណ៍ដែលអនុញ្ញាតឲ្យយើងជឿទុកចិត្ត និងធ្វើការជាមួយមនុស្សដែលយើងមិនដែលបានជួបផ្ទាល់ខ្លួន។"
        )}
      </p>

      {/* Expanding circles of cooperation */}
      <div
        className="rounded-3xl border-2 bg-white p-5 sm:p-6 mb-5"
        style={{ borderColor: `${COOP}33` }}
        data-testid="expanding-circle"
      >
        <h3 className={`text-base font-bold mb-4 flex items-center gap-2 ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
          <Link2 className="w-4 h-4" style={{ color: COOP }} />
          {t("The expanding circle of cooperation", "រង្វង់នៃកិច្ចសហប្រតិបត្តិការដែលកំពុងពង្រីក")}
        </h3>
        <div className="grid grid-cols-5 gap-2 sm:gap-3 items-end">
          {stages.map((s, i) => {
            const Icon = s.Icon;
            const size = 36 + i * 10; // visually growing
            return (
              <div
                key={s.en}
                className="flex flex-col items-center text-center"
                data-testid={`stage-${s.en.toLowerCase()}`}
              >
                <div
                  className="rounded-full flex items-center justify-center mb-2 border-2"
                  style={{
                    width: size,
                    height: size,
                    borderColor: COOP,
                    backgroundColor: `${COOP}${(10 + i * 6).toString(16)}`,
                  }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: COOP_DEEP }} />
                </div>
                <div className={`text-xs sm:text-sm font-bold ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? s.kh : s.en}
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">{s.scale}</div>
              </div>
            );
          })}
        </div>
        <p className={`mt-5 text-sm text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "Twenty-thousand years ago, the largest group a human could safely cooperate with was probably about 150 people — everyone you knew personally. Today, you can climb onto an aeroplane built by 10,000 strangers, flown by a pilot you have never met, and trust that the entire chain will work. That is not magic. That is cooperation, scaled up by tools.",
            "កាលពី ២០.០០០ ឆ្នាំមុន ក្រុមធំបំផុតដែលមនុស្សម្នាក់អាចសហប្រតិបត្តិការដោយសុវត្ថិភាព គឺប្រហែល ១៥០ នាក់ — អ្នកគ្រប់គ្នាដែលអ្នកស្គាល់ផ្ទាល់ខ្លួន។ សព្វថ្ងៃនេះ អ្នកអាចឡើងលើយន្តហោះមួយដែលត្រូវបានសាងសង់ដោយមនុស្សចម្លែក ១០.០០០ នាក់ បើកបរដោយអ្នកបើកដែលអ្នកមិនដែលបានជួប ហើយជឿទុកចិត្តថា ខ្សែសង្វាក់ទាំងមូលនឹងដំណើរការ។ នោះមិនមែនជាមន្តអាគមទេ។ នោះគឺជាកិច្ចសហប្រតិបត្តិការ ដែលត្រូវបានពង្រីកដោយឧបករណ៍។"
          )}
        </p>
      </div>

      {/* Resource-Based Economy thought experiment */}
      <ConceptCard
        k={k}
        Icon={Brain}
        enName="A Post-Scarcity Vision: The Resource-Based Economy"
        khName="ចក្ខុវិស័យក្រោយភាពខ្វះខាត ៖ សេដ្ឋកិច្ចផ្អែកលើធនធាន"
        enTag="thought experiment"
        khTag="ការពិសោធគំនិត"
        enBody="For most of history, competition was unavoidable because resources were genuinely scarce — there was simply not enough food, shelter, or medicine for everyone. But what if technology eventually changes that? Some thinkers, beginning with the engineer Jacque Fresco, propose a Resource-Based Economy: a society where automation, renewable energy, and intelligent design produce so much that the basic needs of every human are simply guaranteed, the way clean air is guaranteed today. In that world, money for survival becomes unnecessary, and competition gets reserved for the things it is actually good at — sport, art, science — instead of being a daily fight to eat."
        khBody="សម្រាប់ប្រវត្តិសាស្ត្រភាគច្រើន ការប្រកួតប្រជែងមិនអាចជៀសវាងបានទេ ព្រោះធនធានពិតជាខ្វះខាត — គ្រាន់តែមិនមានអាហារ ជម្រក ឬឱសថគ្រប់គ្រាន់សម្រាប់គ្រប់គ្នា។ ប៉ុន្តែចុះបើបច្ចេកវិទ្យានឹងផ្លាស់ប្តូរវានៅទីបំផុត? អ្នកគិតមួយចំនួន ចាប់ផ្តើមជាមួយវិស្វករ ហ្សាក់ ហ្វ្រែសកូ បានស្នើនូវសេដ្ឋកិច្ចផ្អែកលើធនធាន ៖ សង្គមមួយដែលប្រព័ន្ធស្វ័យប្រវត្តិកម្ម ថាមពលកកើតឡើងវិញ និងការរចនាដ៏ឈ្លាសវៃ ផលិតបានច្រើនណាស់ ដែលតម្រូវការមូលដ្ឋានរបស់មនុស្សគ្រប់រូប ត្រូវបានធានាជាស្រេច ដូចជាខ្យល់បរិសុទ្ធត្រូវបានធានាសព្វថ្ងៃ។ ក្នុងពិភពលោកនោះ លុយសម្រាប់ការរស់រានមានជីវិតមិនចាំបាច់ទេ ហើយការប្រកួតប្រជែងត្រូវបានរក្សាសម្រាប់រឿងដែលវាល្អពិតប្រាកដ — កីឡា សិល្បៈ វិទ្យាសាស្ត្រ — ជំនួសឲ្យការច្បាំងគ្នាប្រចាំថ្ងៃដើម្បីញ៉ាំ។"
        accent={COOP}
        glow
        watermark
        badge={{ en: "Critical thinking", kh: "ការគិតវិភាគ" }}
      >
        <Callout
          k={k}
          Icon={Globe2}
          labelEn="Question for the class"
          labelKh="សំណួរសម្រាប់ថ្នាក់"
          enTitle="If technology can feed every human, do we still need ruthless competition?"
          khTitle="បើបច្ចេកវិទ្យាអាចចិញ្ចឹមមនុស្សគ្រប់រូប តើយើងនៅត្រូវការការប្រកួតប្រជែងដ៏រឹងរូសទៀតឬ?"
          enBody="If artificial intelligence, automation, and clean energy can one day produce enough food, water, shelter, and medicine for all 8 billion people on Earth — should we still organise our societies around the assumption that someone has to lose? Or can we begin to treat this planet as a shared inheritance, the way a family treats the home left behind by its grandparents? There is no single right answer. The point is that this is the kind of question that every generation, including yours, has to answer for itself."
          khBody="ប្រសិនបើបញ្ញាសិប្បនិម្មិត ស្វ័យប្រវត្តិកម្ម និងថាមពលស្អាតអាចផលិតអាហារ ទឹក ជម្រក និងឱសថគ្រប់គ្រាន់សម្រាប់មនុស្ស ៨ ពាន់លាននាក់នៅលើផែនដី ថ្ងៃណាមួយ — តើយើងនៅតែគួររៀបចំសង្គមរបស់យើងជុំវិញការសន្មតថា មាននរណាម្នាក់ត្រូវចាញ់ឬ? ឬយើងអាចចាប់ផ្តើមចាត់ទុកភពនេះថាជាមរតករួម ដូចជាគ្រួសារមួយចាត់ទុកផ្ទះដែលជីដូនជីតាបានទុកមកវិញ? គ្មានចម្លើយត្រឹមត្រូវតែមួយទេ។ ចំណុចសំខាន់គឺថា នេះគឺជាប្រភេទសំណួរដែលជំនាន់នីមួយៗ រួមទាំងជំនាន់របស់អ្នកផងដែរ ត្រូវឆ្លើយដោយខ្លួនវាផ្ទាល់។"
          accent={COOP}
        />
      </ConceptCard>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — The Local Reality (Pravas Dai)
// ════════════════════════════════════════════════════════════════════════════

function SectionLocalReality({ k, t }: { k: boolean; t: T }) {
  return (
    <section className="mb-2" data-testid="section-pravas-dai">
      <SectionHeader
        spec="03"
        en="The Local Reality"
        kh="ភាពជាក់ស្តែងក្នុងតំបន់"
        k={k}
        Icon={HandHeart}
        accent={HUMAN}
      />

      <ConceptCard
        k={k}
        Icon={HandHeart}
        enName="Pravas Dai · Cambodian Mutual Aid"
        khName="ប្រវ៉ាស់ដៃ · ការជួយគ្នាទៅវិញទៅមកបែបខ្មែរ"
        enTag={"literally: \u201Cexchanging hands\u201D"}
        khTag="ន័យត្រង់ ៖ «ដូរដៃ»"
        enBody={"Long before economists invented the word \u201Ccooperation,\u201D Khmer villages had already named it: \u1794\u17d2\u179a\u179c\u17c9\u17b6\u179f\u17cb\u178a\u17c3 \u2014 pravas dai, literally \u201Cexchanging hands.\u201D When one family needed to harvest its rice before the rains, neighbours simply showed up. No money changed hands. No contract was signed. The understanding was that when the next family's roof needed re-thatching, or the next family's house frame needed lifting, those same neighbours would show up too. Across an entire village, a single afternoon of mutual labour can replace what a single family would have struggled with for a week. It is not charity, and it is not a job \u2014 it is a quiet agreement that everyone's survival is the same survival."}
        khBody="មុនពេលដែលអ្នកសេដ្ឋកិច្ចបង្កើតពាក្យ «កិច្ចសហប្រតិបត្តិការ» យូរណាស់មកហើយ ភូមិខ្មែរបានដាក់ឈ្មោះវារួចហើយ ៖ ប្រវ៉ាស់ដៃ — pravas dai ន័យត្រង់ «ដូរដៃ»។ នៅពេលដែលគ្រួសារមួយត្រូវការច្រូតស្រូវរបស់ខ្លួនមុនពេលភ្លៀងធ្លាក់ អ្នកជិតខាងគ្រាន់តែលេចមុខមក។ គ្មានលុយប្តូរដៃទេ។ គ្មានកិច្ចសន្យាត្រូវបានចុះហត្ថលេខាទេ។ ការយល់ដឹងគឺថា នៅពេលដែលដំបូលរបស់គ្រួសារបន្ទាប់ត្រូវការប្តូរស្បូវ ឬបន្តូបផ្ទះរបស់គ្រួសារបន្ទាប់ត្រូវការលើក អ្នកជិតខាងដូចគ្នានោះ នឹងលេចមុខមកដែរ។ ឆ្លងកាត់ភូមិទាំងមូល ការងាររួមតែមួយរសៀលអាចជំនួសនូវអ្វីដែលគ្រួសារតែមួយ នឹងតស៊ូជាមួយអស់រយៈពេលមួយសប្តាហ៍។ វាមិនមែនជាសប្បុរសធម៌ និងមិនមែនជាការងារទេ — វាគឺជាកិច្ចព្រមព្រៀងស្ងៀមៗមួយ ដែលការរស់រានរបស់មនុស្សគ្រប់គ្នា គឺជាការរស់រានដូចគ្នា។"
        accent={HUMAN}
        glow
        watermark
        badge={{ en: "Living tradition", kh: "ប្រពៃណីរស់" }}
      >
        <div className="grid sm:grid-cols-3 gap-3 mt-1">
          {[
            {
              icon: Wheat,
              en: "Harvest help",
              kh: "ជួយច្រូត",
              enBody: "When the rice ripens together, neighbours rotate field by field so no family loses its crop to the rains.",
              khBody: "ពេលស្រូវទុំជាមួយគ្នា អ្នកជិតខាងវិលចុះស្រែម្តងមួយ ដើម្បីកុំឲ្យគ្រួសារណាបាត់ស្រូវដោយសារភ្លៀង។",
            },
            {
              icon: Hammer,
              en: "Raising a house",
              kh: "លើកផ្ទះ",
              enBody: "A traditional stilt house is too heavy for one family to lift. The whole village comes — the frame goes up in a day.",
              khBody: "ផ្ទះខ្ពស់បែបបុរាណធ្ងន់ពេកសម្រាប់គ្រួសារតែមួយលើកបាន។ ភូមិទាំងមូលមកជួយ — បន្តូបដំឡើងបានក្នុងមួយថ្ងៃ។",
            },
            {
              icon: HandHeart,
              en: "Funeral & wedding",
              kh: "ពិធីបុណ្យ ការរៀបការ",
              enBody: "Cooking, decorating, hosting — at every major life event, the village shares the load that one family alone could not carry.",
              khBody: "ចម្អិនអាហារ តុបតែង ទទួលភ្ញៀវ — នៅក្នុងព្រឹត្តិការណ៍សំខាន់ៗនៃជីវិតនីមួយៗ ភូមិចែករំលែកបន្ទុកដែលគ្រួសារតែមួយមិនអាចទ្រាំទ្របាន។",
            },
          ].map((tile, i) => {
            const Icon = tile.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-4 border bg-white/95 backdrop-blur-sm"
                style={{ borderColor: `${HUMAN}44` }}
                data-testid={`pravas-dai-${i}`}
              >
                <Icon className="w-5 h-5 mb-2" style={{ color: HUMAN }} />
                <div className={`text-sm font-bold mb-1 ${k ? "font-khmer" : ""}`} style={{ color: INK }}>
                  {k ? tile.kh : tile.en}
                </div>
                <div className={`text-xs text-slate-700 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {k ? tile.khBody : tile.enBody}
                </div>
              </div>
            );
          })}
        </div>

        <blockquote
          className={`relative mt-5 pl-5 border-l-4 italic text-slate-700 ${k ? "font-khmer not-italic leading-loose" : "leading-relaxed"}`}
          style={{ borderColor: HUMAN }}
        >
          <Quote className="absolute -left-3 -top-1 w-4 h-4" style={{ color: HUMAN }} aria-hidden="true" />
          <span className={`text-base ${k ? "" : ""}`}>
            {t(
              "\u201CIf you want to go fast, go alone. If you want to go far, go together.\u201D",
              "«បើអ្នកចង់ទៅលឿន ទៅម្នាក់ឯង។ បើអ្នកចង់ទៅឆ្ងាយ ទៅជាមួយគ្នា។»"
            )}
          </span>
          <span className={`block mt-1 text-xs not-italic text-slate-500 ${k ? "font-khmer" : ""}`}>
            — {t("African proverb · widely shared across rural Cambodia", "សុភាសិតអាហ្វ្រិក · ត្រូវបានចែករំលែកយ៉ាងទូលំទូលាយក្នុងជនបទកម្ពុជា")}
          </span>
        </blockquote>
      </ConceptCard>
    </section>
  );
}
