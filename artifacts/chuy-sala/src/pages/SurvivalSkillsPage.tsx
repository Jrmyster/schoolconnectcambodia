import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Hand,
  Brain,
  Eye,
  ListChecks,
  Wind,
  TreePine,
  Droplet,
  Apple,
  Flame,
  Bug,
  AlertTriangle,
  Bed,
  Megaphone,
  Mountain,
  Sun,
  Sunrise,
  Star,
  MoveUp,
  RefreshCw,
  Umbrella,
  Clock,
  Skull,
  Siren,
  AlertOctagon,
  HeartPulse,
  Ban,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { DehydrationModule } from "@/components/widgets/DehydrationModule";

// ════════════════════════════════════════════════════════════════════════════
//  SUR-01 · Survival Skills: Thriving in the Wild
//           ជំនាញរស់រានមានជីវិត៖ ការរស់នៅក្នុងព្រៃ
//
//  1. The S.T.O.P. Method      — Stop · Think · Observe · Plan
//  2. The Rule of Threes       — 3 min air · 3 hr shelter · 3 day water · 3 wk food
//  3. Jungle Specifics         — Cambodian-jungle water, shelter, fire/smoke
//
//  Aesthetic: deep jungle greens with leafy SVG canopy, earthy browns,
//  high-visibility rescue orange for warnings.
// ════════════════════════════════════════════════════════════════════════════

const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#0e2a1f", // deep jungle green
  backgroundImage:
    "radial-gradient(circle at 15% 10%, rgba(101, 163, 13, 0.18), transparent 55%)," +
    "radial-gradient(circle at 85% 80%, rgba(180, 83, 9, 0.18), transparent 55%)," +
    "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
  backgroundSize: "auto, auto, 28px 28px, 28px 28px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "#fdf6e3", // warm parchment
};

function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-amber-700/40" : "border-amber-700/70";
  const size = subtle ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="contents">
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 left-2 ${size} border-t-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 right-2 ${size} border-t-2 border-r-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 ${size} border-b-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 ${size} border-b-2 border-r-2 ${stroke}`} />
    </div>
  );
}

// Decorative leaves (purely aesthetic)
function LeafScatter() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]"
      viewBox="0 0 800 600"
      preserveAspectRatio="none"
    >
      <g fill="#a3e635" stroke="#65a30d" strokeWidth="0.6">
        <path d="M40 60 q24 -36 48 0 q-24 36 -48 0 z" />
        <path d="M700 80 q24 -36 48 0 q-24 36 -48 0 z" />
        <path d="M120 530 q24 -36 48 0 q-24 36 -48 0 z" />
        <path d="M620 520 q24 -36 48 0 q-24 36 -48 0 z" />
        <path d="M380 30 q24 -36 48 0 q-24 36 -48 0 z" />
      </g>
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export function SurvivalSkillsPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-amber-100/90 hover:text-white transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* Hero */}
        <header
          className="relative overflow-hidden rounded-3xl bg-emerald-950 text-white px-6 sm:px-10 py-8 sm:py-10 mb-10 shadow-xl border-2 border-amber-700/60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(132, 204, 22, 0.18), transparent 55%)," +
              "radial-gradient(circle at 10% 90%, rgba(217, 119, 6, 0.20), transparent 55%)",
          }}
        >
          <CornerMarks />
          <LeafScatter />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/15 border-2 border-amber-300/60 text-amber-100 flex items-center justify-center flex-shrink-0">
              <Compass className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <TreePine className="w-3.5 h-3.5" />
                <span>{t("Well-being · Field Skills", "សុខុមាលភាព · ជំនាញវាល")}</span>
                <span className="opacity-50">/</span>
                <span className="text-amber-100">SUR-01</span>
              </div>
              <h1
                data-testid="page-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t(
                  "Survival Skills: Thriving in the Wild",
                  "ជំនាញរស់រានមានជីវិត៖ ការរស់នៅក្នុងព្រៃ"
                )}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-amber-100/85 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "If you ever get lost in the forest — on the way to a relative's farm, on a school field trip, or following a path that disappeared — these are the calm, simple ideas that keep you alive until help finds you.",
                  "ប្រសិនបើអ្នកវង្វេងផ្លូវនៅក្នុងព្រៃ — ពេលធ្វើដំណើរទៅចម្ការសាច់ញាតិ ពេលដំណើរទេសចរណ៍សិក្សា ឬដើរតាមផ្លូវដែលរលាយបាត់ — នេះជាគំនិតស្ងប់ៗ និងសាមញ្ញៗ ដែលនឹងរក្សាជីវិតអ្នកទុក រហូតដល់ជំនួយរកឃើញអ្នក។"
                )}
              </p>
            </div>
          </div>
        </header>

        {/* Sections */}
        <SectionStop kh={kh} t={t} />
        <SectionRuleOfThrees kh={kh} t={t} />
        <SectionJungleSpecifics kh={kh} t={t} />

        {/* SUR-04 — Celestial Navigation: Reading the Sky (strictly bilingual) */}
        <SectionCelestialNavigation />

        {/* SUR-05 — Toxic Nature: Poison, Venom & Antidotes */}
        <SectionToxicNature kh={kh} t={t} />

        {/* SUR-02 — Dehydration: The Silent Threat (strictly bilingual, self-contained) */}
        <DehydrationModule />

        {/* Closing */}
        <div
          className="relative mt-10 rounded-2xl border-2 border-amber-600 p-5 flex items-start gap-3"
          style={CARD_BG}
          data-testid="closing-note"
        >
          <CornerMarks subtle />
          <Compass className="w-6 h-6 text-emerald-800 flex-shrink-0" />
          <p className={`text-sm text-emerald-950 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong>{t("Remember: ", "ចងចាំ ៖ ")}</strong>
            {t(
              "The single most important survival tool you carry is a calm head. Stop, think, and the forest becomes a place full of resources rather than a trap. Most lost people are found within 24 hours by staying put — so let them find you.",
              "ឧបករណ៍រស់រានមានជីវិតដ៏សំខាន់បំផុតដែលអ្នកកាន់ គឺក្បាលដ៏ស្ងប់ស្ងាត់មួយ។ ឈប់ គិត ហើយព្រៃនឹងក្លាយជាកន្លែងពោរពេញដោយធនធាន មិនមែនជាអន្ទាក់ទេ។ មនុស្សវង្វេងផ្លូវភាគច្រើនត្រូវបានរកឃើញក្នុង 24 ម៉ោង ដោយការនៅកន្លែងដដែល — ដូច្នេះសូមឱ្យពួកគេរកអ្នកឃើញ។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-600 text-white text-sm font-bold shadow hover:bg-amber-500 transition-colors ${kh ? "font-khmer" : ""}`}
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
//  Section 01 — The S.T.O.P. Method
// ════════════════════════════════════════════════════════════════════════════

function SectionStop({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const steps = [
    {
      letter: "S",
      en: "Stop",
      kh: "ឈប់",
      Icon: Hand,
      bodyEn:
        "The instant you realise you don't know where you are, freeze. Sit down on a fallen log if you can. Every step you take when lost makes it harder for searchers to find you and burns the energy you'll need later.",
      bodyKh:
        "ភ្លាមៗដែលអ្នកដឹងថាអ្នកមិនដឹងថាអ្នកនៅឯណា សូមឈប់ស្ងៀម។ អង្គុយលើដើមឈើដួលបើអាច។ រាល់ជំហានដែលអ្នកបោះពេលវង្វេង ធ្វើឱ្យអ្នកស្វែងរករកអ្នកលំបាកជាង ហើយក៏អស់កម្លាំងដែលអ្នកនឹងត្រូវការក្រោយ។",
      bg: "bg-rose-50 border-rose-300",
      iconBg: "bg-rose-100 text-rose-700 border-rose-300",
    },
    {
      letter: "T",
      en: "Think",
      kh: "គិត",
      Icon: Brain,
      bodyEn:
        "Don't panic. Take ten slow breaths in through the nose, out through the mouth. Panic is the most dangerous animal in the jungle — it makes good people do unsafe things. A clear mind survives.",
      bodyKh:
        "កុំភ័យស្លន់ស្លោ។ ដកដង្ហើមយឺតៗ 10 ដង តាមច្រមុះចូល ហើយតាមមាត់ចេញ។ ការភ័យស្លន់ស្លោគឺជាសត្វដ៏គ្រោះថ្នាក់បំផុតនៅក្នុងព្រៃ — វាធ្វើឱ្យមនុស្សល្អធ្វើអ្វីដែលមិនសុវត្ថិភាព។ ចិត្តស្ងប់ទើបរស់រានមានជីវិត។",
      bg: "bg-amber-50 border-amber-300",
      iconBg: "bg-amber-100 text-amber-700 border-amber-300",
    },
    {
      letter: "O",
      en: "Observe",
      kh: "សង្កេត",
      Icon: Eye,
      bodyEn:
        "Look around. What's in your pockets and bag — a phone, a knife, water, matches, a piece of cloth, money? What's around you — a stream, tall trees, a path, the sun? Each item and each landmark is a tool.",
      bodyKh:
        "មើលជុំវិញ។ មានអ្វីខ្លះក្នុងហោប៉ៅ និងកាបូបរបស់អ្នក — ទូរស័ព្ទ កាំបិត ទឹក ឈើគូស ក្រណាត់ លុយ? មានអ្វីខ្លះនៅជុំវិញអ្នក — ស្ទឹង ដើមឈើខ្ពស់ ផ្លូវ ព្រះអាទិត្យ? វត្ថុនីមួយៗ និងចំណាំនីមួយៗគឺជាឧបករណ៍មួយ។",
      bg: "bg-sky-50 border-sky-300",
      iconBg: "bg-sky-100 text-sky-700 border-sky-300",
    },
    {
      letter: "P",
      en: "Plan",
      kh: "រៀបចំផែនការ",
      Icon: ListChecks,
      bodyEn:
        "Decide what you need most right now, in this hour — not later. Use the Rule of Threes (next section) to choose the right priority: shelter from cold or sun first, then water, then a fire and smoke for signalling. Make a small plan you can actually do, then do it slowly.",
      bodyKh:
        "សម្រេចចិត្តថា អ្វីដែលអ្នកត្រូវការច្រើនបំផុតនៅពេលនេះ ក្នុងម៉ោងនេះ — មិនមែនពេលក្រោយទេ។ ប្រើច្បាប់នៃលេខ 3 (ផ្នែកបន្ទាប់) ដើម្បីជ្រើសរើសអាទិភាពត្រឹមត្រូវ ៖ ជម្រកការពារពីត្រជាក់ ឬកម្ដៅព្រះអាទិត្យជាមុនសិន បន្ទាប់ទឹក បន្ទាប់មកភ្លើង និងផ្សែងសម្រាប់សញ្ញា។ ធ្វើផែនការតូចមួយដែលអ្នកពិតជាអាចធ្វើបាន រួចធ្វើវាយឺតៗ។",
      bg: "bg-emerald-50 border-emerald-300",
      iconBg: "bg-emerald-100 text-emerald-700 border-emerald-300",
    },
  ];

  return (
    <section className="mb-10" data-testid="section-stop">
      <SectionHeader spec="01" en="The S.T.O.P. Method" kh="វិធីសាស្ត្រ S.T.O.P." kh_={kh} />

      <div
        className="relative rounded-2xl border-2 border-amber-600 p-5 sm:p-7 shadow-sm"
        style={CARD_BG}
      >
        <CornerMarks subtle />

        {/* High-visibility rescue-orange warning banner */}
        <div className="rounded-lg border-l-4 border-orange-500 bg-orange-100 p-3 mb-5 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-orange-700 flex-shrink-0 mt-0.5" />
          <div>
            <div className={`text-sm font-bold text-orange-900 mb-0.5 ${kh ? "font-khmer" : ""}`}>
              {t("First rule of being lost: DO NOT RUN.", "ច្បាប់ទីមួយនៅពេលវង្វេង ៖ កុំរត់!")}
            </div>
            <p className={`text-sm text-orange-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Panic is the single most dangerous enemy in the wild. It pushes you further from your route, drains your energy, and makes you make bad decisions. The four steps below — S.T.O.P. — replace panic with a plan.",
                "ការភ័យស្លន់ស្លោគឺជាសត្រូវដ៏គ្រោះថ្នាក់បំផុតនៅក្នុងព្រៃ។ វារុញអ្នកឱ្យឆ្ងាយពីផ្លូវដើម អស់កម្លាំង និងធ្វើឱ្យអ្នកសម្រេចចិត្តខុសខុស។ ជំហានបួនខាងក្រោម — S.T.O.P. — ជំនួសការភ័យដោយផែនការមួយ។"
              )}
            </p>
          </div>
        </div>

        {/* Big STOP letters across the top */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-5" data-testid="stop-letters">
          {steps.map((s) => (
            <div
              key={s.letter}
              className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-emerald-700/40 bg-emerald-900 text-amber-50 py-3 sm:py-4 px-2 shadow-sm"
            >
              <span className="font-mono font-extrabold text-3xl sm:text-4xl text-amber-300 tabular-nums">
                {s.letter}
              </span>
              <span className={`text-[11px] sm:text-xs font-semibold text-amber-100 text-center leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
                {kh ? s.kh : s.en}
              </span>
            </div>
          ))}
        </div>

        {/* Detailed cards */}
        <div className="grid sm:grid-cols-2 gap-3" data-testid="stop-cards">
          {steps.map((s) => (
            <div key={s.letter} className={`rounded-xl border-2 ${s.bg} p-4`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center ${s.iconBg}`}>
                  <s.Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="leading-tight">
                  <div className="font-mono font-extrabold text-lg text-emerald-900">
                    {s.letter}
                  </div>
                  <div className={`text-[12px] font-semibold text-slate-700 ${kh ? "font-khmer" : ""}`}>
                    {kh ? s.kh : s.en}
                  </div>
                </div>
              </div>
              <p className={`text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {kh ? s.bodyKh : s.bodyEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — The Rule of Threes
// ════════════════════════════════════════════════════════════════════════════

function SectionRuleOfThrees({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const items = [
    {
      Icon: Wind,
      qty: "3",
      unitEn: "MINUTES",
      unitKh: "នាទី",
      thingEn: "without AIR",
      thingKh: "គ្មានខ្យល់",
      bodyEn:
        "Drowning, smoke, choking, or being trapped under a heavy branch can kill in minutes. If someone near you cannot breathe, that is the first emergency — clear their airway before anything else.",
      bodyKh:
        "ការលង់ទឹក ផ្សែង ច្នៀនបំពង់ក ឬត្រូវសម្ពាធដោយមែកធ្ងន់ អាចសម្លាប់ក្នុងរយៈពេលពីរបីនាទី។ ប្រសិនបើនរណាម្នាក់ក្បែរអ្នកមិនអាចដកដង្ហើម នោះគឺជាគ្រោះអាសន្នដំបូង — សម្អាតផ្លូវដង្ហើមរបស់គាត់មុនអ្វីៗផ្សេងទៀត។",
      tone: "rose",
    },
    {
      Icon: Bed,
      qty: "3",
      unitEn: "HOURS",
      unitKh: "ម៉ោង",
      thingEn: "without SHELTER",
      thingKh: "គ្មានជម្រក",
      bodyEn:
        "In extreme heat or cold, an unprotected body fails fast. In a Cambodian dry-season noon, sun and dehydration can knock you down in a few hours; on a cold mountain night, hypothermia does the same. Build shade or a windbreak before chasing food or water.",
      bodyKh:
        "នៅក្នុងកម្ដៅខ្លាំង ឬត្រជាក់ខ្លាំង រាងកាយដែលគ្មានការការពារនឹងធ្លាក់ចុះយ៉ាងលឿន។ នៅពេលថ្ងៃត្រង់រដូវប្រាំងនៅកម្ពុជា ព្រះអាទិត្យ និងការខ្វះទឹក អាចធ្វើឱ្យអ្នកដួលក្នុងរយៈពេលពីរបីម៉ោង។ នៅពេលយប់ត្រជាក់នៅលើភ្នំ សីតុណ្ហភាពទាបធ្វើដូចគ្នា។ សាងសង់ម្លប់ ឬជញ្ជាំងបាំងខ្យល់ មុននឹងតាមរកអាហារ ឬទឹក។",
      tone: "orange",
    },
    {
      Icon: Droplet,
      qty: "3",
      unitEn: "DAYS",
      unitKh: "ថ្ងៃ",
      thingEn: "without WATER",
      thingKh: "គ្មានទឹក",
      bodyEn:
        "After about three days with no water, the body cannot keep its blood pressure or its thinking. Long before that, your judgement weakens — so look for water on day one. Streams, dew on big leaves, and the inside of fresh bamboo are all sources you can use safely.",
      bodyKh:
        "បន្ទាប់ពីប្រហែលបីថ្ងៃគ្មានទឹក រាងកាយមិនអាចរក្សាសម្ពាធឈាម ឬការគិតរបស់វាបានទេ។ មុនពេលនោះយូរមក ការវិនិច្ឆ័យរបស់អ្នកចុះខ្សោយ — ដូច្នេះស្វែងរកទឹកនៅថ្ងៃទីមួយ។ ស្ទឹង ទឹកសន្សើមលើស្លឹកធំៗ និងផ្នែកខាងក្នុងនៃឫស្សីស្រស់ ទាំងអស់ជាប្រភពដែលអ្នកអាចប្រើបានដោយសុវត្ថិភាព។",
      tone: "sky",
    },
    {
      Icon: Apple,
      qty: "3",
      unitEn: "WEEKS",
      unitKh: "សប្ដាហ៍",
      thingEn: "without FOOD",
      thingKh: "គ្មានអាហារ",
      bodyEn:
        "This is the surprise: food is the LOWEST priority, even though most people worry about it first. A healthy person can survive about three weeks with no food. So do not waste energy chasing animals or eating unknown plants in your first day or two — focus on shelter and water.",
      bodyKh:
        "នេះគឺជាការភ្ញាក់ផ្អើល ៖ អាហារគឺជាអាទិភាព ទាប បំផុត ទោះបីជាមនុស្សភាគច្រើនព្រួយបារម្ភវាជាមុនក៏ដោយ។ មនុស្សដែលមានសុខភាពល្អអាចរស់បានប្រហែល 3 សប្ដាហ៍ដោយគ្មានអាហារ។ ដូច្នេះកុំខ្ជះខ្ជាយកម្លាំងក្នុងការដេញតាមសត្វ ឬញ៉ាំរុក្ខជាតិដែលមិនស្គាល់ ក្នុងថ្ងៃទីមួយឬទីពីររបស់អ្នក — ផ្ដោតលើជម្រក និងទឹក។",
      tone: "emerald",
    },
  ];

  const toneMap: Record<string, { ring: string; pill: string; iconBg: string }> = {
    rose:    { ring: "border-rose-400",    pill: "bg-rose-600 text-white",       iconBg: "bg-rose-100 text-rose-700 border-rose-400" },
    orange:  { ring: "border-orange-400",  pill: "bg-orange-500 text-white",     iconBg: "bg-orange-100 text-orange-700 border-orange-400" },
    sky:     { ring: "border-sky-400",     pill: "bg-sky-600 text-white",        iconBg: "bg-sky-100 text-sky-700 border-sky-400" },
    emerald: { ring: "border-emerald-500", pill: "bg-emerald-700 text-white",    iconBg: "bg-emerald-100 text-emerald-700 border-emerald-500" },
  };

  return (
    <section className="mb-10" data-testid="section-threes">
      <SectionHeader spec="02" en="The Rule of Threes" kh="ច្បាប់នៃលេខ 3" kh_={kh} />

      <div
        className="relative rounded-2xl border-2 border-amber-600 p-5 sm:p-7 shadow-sm"
        style={CARD_BG}
      >
        <CornerMarks subtle />

        <p className={`text-emerald-950 text-sm sm:text-base mb-5 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "These four numbers are the universal survival priorities — the order in which the human body breaks. Memorise them, and you will never waste effort on the wrong problem first.",
            "លេខបួននេះគឺជាអាទិភាពនៃការរស់រានមានជីវិតសកលលោក — លំដាប់ដែលរាងកាយមនុស្សខូច។ ចងចាំវា ហើយអ្នកនឹងមិនដែលខ្ជះខ្ជាយកម្លាំងលើបញ្ហាខុសជាមុនទេ។"
          )}
        </p>

        <ol className="grid sm:grid-cols-2 gap-3" data-testid="threes-grid">
          {items.map((it, idx) => {
            const tone = toneMap[it.tone];
            return (
              <li
                key={it.unitEn}
                className={`relative rounded-xl border-2 ${tone.ring} bg-white p-4 shadow-sm`}
              >
                <span className={`absolute -top-2.5 -left-2.5 ${tone.pill} text-[11px] font-mono font-bold uppercase tracking-widest rounded-full px-2.5 py-0.5 shadow`}>
                  {idx + 1}
                </span>
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center flex-shrink-0 ${tone.iconBg}`}>
                    <it.Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1.5 leading-none">
                      <span className="font-mono font-extrabold text-3xl text-emerald-900 tabular-nums">{it.qty}</span>
                      <span className={`font-mono text-[11px] uppercase tracking-widest text-slate-600 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                        {kh ? it.unitKh : it.unitEn}
                      </span>
                    </div>
                    <div className={`mt-1 text-sm font-semibold text-emerald-900 ${kh ? "font-khmer" : ""}`}>
                      {kh ? it.thingKh : it.thingEn}
                    </div>
                  </div>
                </div>
                <p className={`text-[13px] text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {kh ? it.bodyKh : it.bodyEn}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-5 rounded-lg border-l-4 border-orange-500 bg-orange-100 p-3 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-700 flex-shrink-0 mt-0.5" />
          <p className={`text-sm text-orange-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong>{t("Counter-intuitive: ", "ផ្ទុយនឹងអារម្មណ៍ ៖ ")}</strong>
            {t(
              "Most people who get lost worry about food first. Don't. By the time you're hungry enough for it to matter, rescuers will almost certainly have found you. Spend day one on shelter and water.",
              "មនុស្សភាគច្រើនដែលវង្វេងផ្លូវ បារម្ភពីអាហារជាមុន។ កុំ។ ពេលដែលអ្នកឃ្លានគ្រប់គ្រាន់ដើម្បីឱ្យវាសំខាន់ អ្នកសង្គ្រោះស្ទើរតែប្រាកដជារកអ្នកឃើញហើយ។ ចំណាយថ្ងៃទីមួយលើជម្រក និងទឹក។"
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — Jungle Specifics (Cambodia)
// ════════════════════════════════════════════════════════════════════════════

function SectionJungleSpecifics({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-jungle">
      <SectionHeader
        spec="03"
        en="Jungle Specifics — Cambodian Forest"
        kh="ពិសេសសម្រាប់ព្រៃកម្ពុជា"
        kh_={kh}
      />

      <div className="grid lg:grid-cols-3 gap-4">
        {/* WATER */}
        <article
          className="relative rounded-2xl border-2 border-sky-400 p-5 shadow-sm"
          style={CARD_BG}
          data-testid="jungle-water"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 border-2 border-sky-400 text-sky-700 flex items-center justify-center">
              <Droplet className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className={`text-lg font-bold text-sky-900 ${kh ? "font-khmer" : ""}`}>
              {t("Water", "ទឹក")}
            </h3>
          </div>

          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "Even the cleanest-looking stream can carry bacteria, parasites, or animal waste from upstream. ",
              "សូម្បីតែស្ទឹងដែលមើលទៅស្អាតបំផុត ក៏អាចមានបាក់តេរី ប៉ារ៉ាស៊ីត ឬកាកសំណល់សត្វមកពីខាងលើ។ "
            )}
            <strong className="text-sky-900">
              {t("Always boil stream water for at least one full minute before drinking.", "ត្ម្រូវឱ្យដាំទឹកស្ទឹងឱ្យពុះយ៉ាងតិច 1 នាទីពេញ មុននឹងផឹក។")}
            </strong>
          </p>

          <div className="rounded-lg bg-emerald-50 border border-emerald-300 p-3 mb-2">
            <div className={`text-[11px] font-mono uppercase tracking-widest text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("FREE & USUALLY SAFE", "ឥតតម្លៃ និងជាធម្មតាសុវត្ថិភាព")}
            </div>
            <ul className={`text-sm text-emerald-950 space-y-1 list-disc list-inside ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <li>
                <strong>{t("Fresh bamboo stalks: ", "ឫស្សីស្រស់ ៖ ")}</strong>
                {t(
                  "shake a green stalk; if you hear sloshing, cut it carefully — water trapped inside fresh, healthy bamboo is usually much cleaner than stream water. Drink only if it is clear and odourless, and boil it first whenever you can.",
                  "អង្រួនឫស្សីបៃតង បើអ្នកលឺសំឡេងទឹក សូមកាត់ដោយប្រុងប្រយ័ត្ន — ទឹកនៅខាងក្នុងឫស្សីស្រស់ៗមានសុខភាពល្អ ជាធម្មតាស្អាតជាងទឹកស្ទឹងច្រើន។ ផឹកបានតែបើទឹកថ្លា និងគ្មានក្លិន ហើយដាំវាជាមុនរាល់ពេលដែលអ្នកអាច។"
                )}
              </li>
              <li>
                <strong>{t("Banana plant: ", "ដើមចេក ៖ ")}</strong>
                {t(
                  "cut a banana stem near the base; the bowl-shaped stump fills with watery sap from the roots within an hour. The first bowl is bitter — scoop it out; the second and third refills are mild and usually safe. Boil if you have a way to.",
                  "កាត់ដើមចេកនៅជិតគល់ ស្រមោលទ្រូងដែលនៅសល់នឹងពេញដោយជាតិទឹកពីឫសក្នុងរយៈពេលប្រមាណ 1 ម៉ោង។ ចានដំបូងជូរ — ស្រង់ចោល។ ការពេញឡើងវិញលើកទីពីរ និងទីបី ស្រាល និងជាធម្មតាសុវត្ថិភាព។ ដាំបើអ្នកមានវិធី។"
                )}
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-orange-100 border-l-4 border-orange-500 p-2.5 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-700 flex-shrink-0 mt-0.5" />
            <p className={`text-[12px] text-orange-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Never drink from still puddles or muddy ponds without boiling — they can carry leptospirosis and worse.",
                "កុំផឹកពីទឹកភក់ឈរ ឬបឹងភក់ដោយមិនដាំ — វាអាចមានជំងឺឡិបតូស្ពីរ៉ូស និងអាក្រក់ជាងនេះ។"
              )}
            </p>
          </div>
        </article>

        {/* SHELTER */}
        <article
          className="relative rounded-2xl border-2 border-amber-600 p-5 shadow-sm"
          style={CARD_BG}
          data-testid="jungle-shelter"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 border-2 border-amber-500 text-amber-700 flex items-center justify-center">
              <Mountain className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className={`text-lg font-bold text-amber-900 ${kh ? "font-khmer" : ""}`}>
              {t("Shelter", "ជម្រក")}
            </h3>
          </div>

          <div className="rounded-lg border-2 border-orange-500 bg-orange-100 p-3 mb-3">
            <div className={`text-[11px] font-mono uppercase tracking-widest text-orange-800 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("THE GOLDEN RULE", "ច្បាប់មាស")}
            </div>
            <p className={`text-sm font-bold text-orange-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t("Never sleep directly on the ground.", "កុំដេកលើដីផ្ទាល់ឡើយ។")}
            </p>
          </div>

          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "The forest floor is the highway for snakes, scorpions, centipedes, and biting ants. Lift your sleeping body even 30 cm off the ground and you remove almost every danger at once.",
              "ដីព្រៃគឺជាផ្លូវធំសម្រាប់ពស់ ខ្ទួយ ក្អែប និងស្រមោចខាំ។ លើករាងកាយដេករបស់អ្នក ឱ្យឡើងពីដីសូម្បី 30 សង់ទីម៉ែត្រ អ្នកនឹងលុបបំបាត់គ្រោះថ្នាក់ស្ទើរតែទាំងអស់ភ្លាមៗ។"
            )}
          </p>

          <div className="rounded-lg bg-amber-50 border border-amber-400 p-3">
            <div className={`text-[11px] font-mono uppercase tracking-widest text-amber-800 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("DO THIS INSTEAD", "ត្រូវធ្វើបែបនេះ")}
            </div>
            <ul className={`text-sm text-amber-950 space-y-1 list-disc list-inside ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <li>
                {t(
                  "Lash four bamboo poles between two trees and lay a platform of split bamboo — a raised bed.",
                  "ចងបង្គោលឫស្សីបួនរវាងដើមឈើពីរ ហើយដាក់បន្ទះឫស្សីពុះ — គ្រែលើកខ្ពស់។"
                )}
              </li>
              <li>
                {t(
                  "Or sling a krama or hammock between two strong trees, well above the ground.",
                  "ឬចងក្រមា ឬអង្រឹងរវាងដើមឈើរឹងពីរ លើដីខ្ពស់ៗ។"
                )}
              </li>
              <li>
                {t(
                  "Cover with broad palm or banana leaves for rain.",
                  "គ្របដោយស្លឹកត្នោត ឬស្លឹកចេកធំៗដើម្បីការពារភ្លៀង។"
                )}
              </li>
            </ul>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-700">
            <Bug className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            <span className={kh ? "font-khmer" : ""}>
              {t("Off the ground = away from snakes, scorpions, centipedes.", "ឆ្ងាយពីដី = ឆ្ងាយពីពស់ ខ្ទួយ និងក្អែប។")}
            </span>
          </div>
        </article>

        {/* FIRE & SMOKE */}
        <article
          className="relative rounded-2xl border-2 border-orange-500 p-5 shadow-sm"
          style={CARD_BG}
          data-testid="jungle-fire"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 border-2 border-orange-500 text-orange-700 flex items-center justify-center">
              <Flame className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className={`text-lg font-bold text-orange-900 ${kh ? "font-khmer" : ""}`}>
              {t("Fire & Smoke", "ភ្លើង និងផ្សែង")}
            </h3>
          </div>

          <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {t(
              "A fire in the jungle is not only for warmth — in fact, in Cambodia it is rarely cold enough to need warmth. The two real jobs of your fire are ",
              "ភ្លើងក្នុងព្រៃ មិនមែនសម្រាប់តែកម្ដៅទេ — ជាការពិត នៅកម្ពុជាជំនួសណាស់ដែលត្រជាក់ដល់កម្រិតត្រូវការកម្ដៅ។ ភារកិច្ចពិតទាំងពីររបស់ភ្លើងគឺ "
            )}
            <strong className="text-orange-900">
              {t("keeping mosquitoes away and signalling for rescue.", "ការដេញមូស និងការផ្ដល់សញ្ញាស្នើសុំការសង្គ្រោះ។")}
            </strong>
          </p>

          <div className="rounded-lg bg-emerald-50 border border-emerald-300 p-3 mb-3">
            <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              <Bug className="w-3.5 h-3.5" aria-hidden="true" />
              {t("MOSQUITOES & MALARIA", "មូស និងគ្រុនចាញ់")}
            </div>
            <p className={`text-sm text-emerald-950 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Throw a handful of green leaves on a small fire — the heavy white smoke drives mosquitoes away from your sleeping spot and lowers your malaria risk overnight.",
                "បោះស្លឹកបៃតងមួយក្ដាប់លើភ្លើងតូចមួយ — ផ្សែងពណ៌សក្រាស់ដេញមូសចេញពីកន្លែងដេករបស់អ្នក ហើយកាត់បន្ថយហានិភ័យគ្រុនចាញ់នៅពេលយប់។"
              )}
            </p>
          </div>

          <div className="rounded-lg bg-orange-100 border border-orange-500 p-3">
            <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-orange-800 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              <Megaphone className="w-3.5 h-3.5" aria-hidden="true" />
              {t("SIGNAL FOR HELP", "សញ្ញាស្នើសុំជំនួយ")}
            </div>
            <p className={`text-sm text-orange-950 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Searchers from the air look for SMOKE, not flames. Build three small smoky fires in a triangle in a clearing — three of anything is the international distress sign. Keep green leaves nearby to throw on if you hear an engine.",
                "អ្នកស្វែងរកពីលើអាកាស ស្វែងរកផ្សែង មិនមែនអណ្ដាតភ្លើងទេ។ ដុតភ្លើងតូចៗដែលផ្តល់ផ្សែងបី ជាត្រីកោណនៅតំបន់វាល — បីនៃអ្វីៗគឺជាសញ្ញាគ្រោះអាសន្នអន្តរជាតិ។ រក្សាស្លឹកបៃតងនៅជិត ដើម្បីបោះលើ ប្រសិនបើអ្នកលឺសំឡេងម៉ាស៊ីន។"
              )}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Helpers — Section header
// ════════════════════════════════════════════════════════════════════════════

function SectionHeader({
  spec,
  en,
  kh,
  kh_,
}: {
  spec: string;
  en: string;
  kh: string;
  kh_: boolean;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-amber-300 bg-emerald-900/80 border border-amber-600/60 rounded px-2 py-0.5">
        SEC-{spec}
      </span>
      <h2 className={`text-xl sm:text-2xl font-bold text-amber-50 ${kh_ ? "font-khmer" : ""}`}>
        {kh_ ? kh : en}
      </h2>
      <Compass className="w-4 h-4 text-amber-400/70 ml-1" aria-hidden="true" />
      <div className="flex-1 border-t border-dashed border-amber-700/50" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 04 — Celestial Navigation: Reading the Sky
//                ការនាំផ្លូវដោយផ្កាយ៖ ការអានមេឃ
//
//  Three cards (strictly bilingual EN+KH throughout):
//   1. The Sun Clock           — sun/daylight theme (warm amber/parchment)
//   2. Finding Polaris         — dark navy starlight theme
//   3. The Center of the Wheel — dark navy starlight theme
// ════════════════════════════════════════════════════════════════════════════

const STAR_BG: React.CSSProperties = {
  backgroundColor: "#0b1530",
  backgroundImage:
    "radial-gradient(1.2px 1.2px at 12% 22%, rgba(255,255,255,0.85), transparent 60%)," +
    "radial-gradient(1px 1px at 28% 60%, rgba(255,255,255,0.65), transparent 60%)," +
    "radial-gradient(1.4px 1.4px at 47% 18%, rgba(255,255,255,0.9), transparent 60%)," +
    "radial-gradient(1px 1px at 60% 75%, rgba(255,255,255,0.6), transparent 60%)," +
    "radial-gradient(1.6px 1.6px at 75% 30%, rgba(255,255,255,0.95), transparent 60%)," +
    "radial-gradient(1px 1px at 88% 65%, rgba(255,255,255,0.55), transparent 60%)," +
    "radial-gradient(1.2px 1.2px at 22% 85%, rgba(255,255,255,0.7), transparent 60%)," +
    "radial-gradient(1px 1px at 92% 12%, rgba(255,255,255,0.6), transparent 60%)," +
    "linear-gradient(180deg, #0b1530 0%, #0f1f48 60%, #1e293b 100%)",
};

const SUN_BG: React.CSSProperties = {
  backgroundColor: "#fff7ed",
  backgroundImage:
    "radial-gradient(circle at 80% 12%, rgba(251, 191, 36, 0.45), transparent 55%)," +
    "radial-gradient(circle at 10% 90%, rgba(217, 119, 6, 0.18), transparent 55%)," +
    "linear-gradient(180deg, #fff7ed 0%, #fef3c7 100%)",
};

function SectionCelestialNavigation() {
  return (
    <section className="mb-10" data-testid="section-celestial">
      {/* Bilingual section header — both languages always present */}
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-amber-300 bg-emerald-900/80 border border-amber-600/60 rounded px-2 py-0.5">
          SEC-04
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-50 leading-tight">
            <span className="block">Celestial Navigation: Reading the Sky</span>
            <span className="block font-khmer text-base sm:text-lg leading-loose mt-0.5 text-amber-200/85">
              ការនាំផ្លូវដោយផ្កាយ៖ ការអានមេឃ
            </span>
          </h2>
        </div>
        <Star className="w-4 h-4 text-amber-400/70 ml-1" aria-hidden="true" />
      </div>

      {/* Bilingual intro paragraph */}
      <div className="mb-5 space-y-1.5">
        <p className="text-sm text-amber-50/85 leading-relaxed">
          When you're lost without a compass or a phone, the sky becomes your map. The sun tells you direction by day, and the stars tell you direction by night — for free, anywhere on Earth.
        </p>
        <p className="text-sm text-amber-50/85 font-khmer leading-loose">
          ពេលអ្នកវង្វេងផ្លូវដោយគ្មានត្រីវិស័យ ឬទូរស័ព្ទ មេឃក្លាយជាផែនទីរបស់អ្នក។ ព្រះអាទិត្យប្រាប់ទិសនៅពេលថ្ងៃ ហើយផ្កាយប្រាប់ទិសនៅពេលយប់ — ដោយឥតគិតថ្លៃ គ្រប់ទីកន្លែងលើផែនដី។
        </p>
      </div>

      {/* Three cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SunClockCard />
        <PolarisCard />
        <WheelCenterCard />
      </div>
    </section>
  );
}

// ── Card 1: The Sun Clock — sun/daylight theme ───────────────────────────────

function SunClockCard() {
  return (
    <article
      className="relative rounded-2xl border-2 border-amber-500 p-5 shadow-md flex flex-col"
      style={SUN_BG}
      data-testid="celestial-sun-clock"
    >
      <CornerMarks subtle />

      {/* Header */}
      <header className="mb-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-100 border-2 border-amber-500 text-amber-700 flex items-center justify-center">
            <Sun className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-700 mb-1 flex-wrap">
              <span>Card · 01</span>
              <span className="opacity-50">/</span>
              <span>By Day</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">ពេលថ្ងៃ</span>
            </div>
            <h3 className="font-bold text-lg text-amber-900 leading-tight">
              <span className="block">The Sun Clock</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-orange-800">
                នាឡិកាព្រះអាទិត្យ
              </span>
            </h3>
          </div>
        </div>
      </header>

      {/* Subsection: The Path */}
      <SunSubBlock
        labelEn="The Path"
        labelKh="ផ្លូវ"
        icon={Sunrise}
      >
        <p className="text-sm text-amber-950 leading-relaxed">
          The sun always rises in the <strong>East</strong> and sets in the <strong>West</strong>. When the sun is at its highest point straight overhead, it is <strong>solar noon</strong>.
        </p>
        <p className="text-sm text-amber-950 font-khmer leading-loose mt-1">
          ព្រះអាទិត្យតែងតែរះនៅ <strong>ខាងកើត</strong> ហើយលិចនៅ <strong>ខាងលិច</strong>។ នៅពេលដែលព្រះអាទិត្យឡើងដល់ចំណុចខ្ពស់បំផុតស្មើពីលើក្បាល នោះគឺ <strong>ពេលថ្ងៃត្រង់ព្រះអាទិត្យ</strong>។
        </p>

        {/* Sun-arc visual */}
        <SunArcDiagram />
      </SunSubBlock>

      {/* Subsection: The Hand Method */}
      <SunSubBlock
        labelEn="The Hand Method"
        labelKh="វិធីប្រើដៃ"
        icon={Hand}
      >
        <p className="text-sm text-amber-950 leading-relaxed">
          To know how much daylight is left before sunset, hold your hand out straight with your fingers horizontal between the sun and the horizon.
        </p>
        <p className="text-sm text-amber-950 font-khmer leading-loose mt-1">
          ដើម្បីដឹងថាមានពន្លឺថ្ងៃប៉ុន្មាននៅសល់មុនព្រះអាទិត្យលិច សូមលូកដៃរបស់អ្នកត្រង់ ដោយម្រាមដៃផ្ដេក នៅចន្លោះព្រះអាទិត្យ និងជើងមេឃ។
        </p>

        {/* Hand-method visual */}
        <HandMethodDiagram />

        {/* The rule callout */}
        <div className="mt-3 rounded-lg border-2 border-orange-500 bg-orange-100 p-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-orange-800 mb-1 flex flex-wrap gap-x-2">
            <span>The Rule</span>
            <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">ច្បាប់</span>
          </div>
          <p className="text-sm font-bold text-orange-950">
            Every finger width = about <strong>15 minutes</strong> of daylight.
          </p>
          <p className="text-sm font-bold text-orange-950 font-khmer leading-loose">
            ទទឹងម្រាមដៃនីមួយៗ = ប្រហែល <strong>១៥ នាទី</strong> នៃពន្លឺថ្ងៃ។
          </p>
          <p className="text-sm font-bold text-orange-900 mt-1 italic flex items-start gap-1.5">
            <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            A full hand (4 fingers) = exactly <strong className="ml-1">1 hour</strong> to build a shelter!
          </p>
          <p className="text-sm font-bold text-orange-900 font-khmer leading-loose not-italic">
            ដៃពេញ (៤ ម្រាម) = មាន <strong>១ ម៉ោង</strong> គត់ ដើម្បីសង់ជម្រក!
          </p>
        </div>
      </SunSubBlock>
    </article>
  );
}

// ── Card 2: Finding Polaris — dark navy starlight ────────────────────────────

function PolarisCard() {
  return (
    <article
      className="relative rounded-2xl border-2 border-indigo-500/60 p-5 shadow-md flex flex-col text-amber-50"
      style={STAR_BG}
      data-testid="celestial-polaris"
    >
      <CornerMarksDark />

      {/* Header */}
      <header className="mb-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-indigo-500/20 border-2 border-indigo-300/60 text-amber-100 flex items-center justify-center">
            <Star className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-indigo-200 mb-1 flex-wrap">
              <span>Card · 02</span>
              <span className="opacity-50">/</span>
              <span>By Night</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">ពេលយប់</span>
            </div>
            <h3 className="font-bold text-lg text-amber-100 leading-tight">
              <span className="block">Finding Polaris</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-amber-200/90">
                ការស្វែងរកផ្កាយខាងជើង
              </span>
            </h3>
          </div>
        </div>
      </header>

      {/* Subsection: The North Star */}
      <StarSubBlock
        labelEn="The North Star"
        labelKh="ផ្កាយខាងជើង"
        icon={Star}
      >
        <p className="text-sm text-amber-50 leading-relaxed">
          <strong>Polaris</strong> (The North Star) is the most important star for navigation in the Northern Hemisphere — including all of Cambodia.
        </p>
        <p className="text-sm text-amber-50 font-khmer leading-loose mt-1">
          <strong>ផ្កាយប៉ូឡារីស (Polaris)</strong> គឺជាផ្កាយដ៏សំខាន់បំផុតសម្រាប់ការនាំផ្លូវនៅអឌ្ឍគោលខាងជើង — រាប់ទាំងប្រទេសកម្ពុជាទាំងមូលផងដែរ។
        </p>
      </StarSubBlock>

      {/* Subsection: The Pointer Stars */}
      <StarSubBlock
        labelEn="The Pointer Stars"
        labelKh="ផ្កាយចង្អុល"
        icon={MoveUp}
      >
        <p className="text-sm text-amber-50 leading-relaxed">
          Look for the <strong>Big Dipper</strong> — a constellation shaped like a giant spoon. Take the two stars at the very front edge of the spoon's bowl and draw an imaginary line straight up. The first bright star that line hits is <strong>Polaris</strong>.
        </p>
        <p className="text-sm text-amber-50 font-khmer leading-loose mt-1">
          រកមើល <strong>ផ្កាយវែកធំ (Big Dipper)</strong> — ក្រុមផ្កាយដែលមានរូបរាងដូចស្លាបព្រាដ៏ធំមួយ។ យកផ្កាយពីរនៅគែមមុខបង្អស់នៃធុងស្លាបព្រា ហើយគូរបន្ទាត់ស្រមើស្រមៃត្រង់ឡើងលើ។ ផ្កាយភ្លឺដំបូងដែលបន្ទាត់នោះប៉ះ គឺ <strong>ផ្កាយប៉ូឡារីស</strong>។
        </p>

        {/* Big Dipper → Polaris diagram */}
        <BigDipperDiagram />
      </StarSubBlock>
    </article>
  );
}

// ── Card 3: The Center of the Wheel — dark navy starlight ────────────────────

function WheelCenterCard() {
  return (
    <article
      className="relative rounded-2xl border-2 border-cyan-400/50 p-5 shadow-md flex flex-col text-amber-50"
      style={STAR_BG}
      data-testid="celestial-wheel-center"
    >
      <CornerMarksDark />

      {/* Header */}
      <header className="mb-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-cyan-500/20 border-2 border-cyan-300/60 text-amber-100 flex items-center justify-center">
            <RefreshCw className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan-200 mb-1 flex-wrap">
              <span>Card · 03</span>
              <span className="opacity-50">/</span>
              <span>Why It Works</span>
              <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">មូលហេតុ</span>
            </div>
            <h3 className="font-bold text-lg text-amber-100 leading-tight">
              <span className="block">The Center of the Wheel</span>
              <span className="block font-khmer text-base leading-loose mt-0.5 text-amber-200/90">
                ចំណុចកណ្តាលនៃកង់
              </span>
            </h3>
          </div>
        </div>
      </header>

      {/* Why it never moves */}
      <StarSubBlock
        labelEn="Why It Never Moves"
        labelKh="មូលហេតុដែលវាមិនផ្លាស់ទី"
        icon={Star}
      >
        <p className="text-sm text-amber-50 leading-relaxed">
          Throughout the night, all the stars seem to slowly move across the sky. But Polaris stands perfectly still. Why? Because Polaris happens to sit almost exactly above the Earth's <strong>North Pole</strong> (the axis of rotation).
        </p>
        <p className="text-sm text-amber-50 font-khmer leading-loose mt-1">
          ពេញមួយយប់ ផ្កាយទាំងអស់ហាក់ដូចជាផ្លាស់ទីយឺតៗឆ្លងកាត់មេឃ។ ប៉ុន្តែផ្កាយប៉ូឡារីសឈរនឹងយ៉ាងឥតសល់ប្រលែះ។ ហេតុអ្វី? ដោយសារតែផ្កាយប៉ូឡារីសស្ថិតស្ថេរនៅពីលើ <strong>ប៉ូលខាងជើង</strong> នៃផែនដី (អ័ក្សបង្វិល) ស្ទើរតែពិតប្រាកដ។
        </p>

        {/* Spinning sky visual */}
        <SkyWheelDiagram />
      </StarSubBlock>

      {/* The umbrella analogy */}
      <StarSubBlock
        labelEn="The Umbrella Analogy"
        labelKh="ការប្រៀបធៀបនឹងឆ័ត្រ"
        icon={Umbrella}
      >
        <p className="text-sm text-amber-50 leading-relaxed italic">
          Imagine looking straight up at the center of a spinning umbrella — the edges blur, but the exact center stays completely still.
        </p>
        <p className="text-sm text-amber-50 font-khmer leading-loose not-italic mt-1">
          ស្រមៃថា អ្នកសម្លឹងត្រង់ឡើងលើ ទៅចំណុចកណ្ដាលនៃឆ័ត្រមួយដែលកំពុងបង្វិល — គែមឆ័ត្រគ្មានរូបច្បាស់ ប៉ុន្តែចំណុចកណ្ដាលពិតប្រាកដនៅតែឈរនឹងទាំងស្រុង។
        </p>

        <div className="mt-3 rounded-lg border-2 border-cyan-400/60 bg-cyan-500/10 p-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-200 mb-1 flex flex-wrap gap-x-2">
            <span>The Payoff</span>
            <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">លទ្ធផល</span>
          </div>
          <p className="text-sm font-bold text-amber-50">
            If you walk toward Polaris, you are walking <strong className="text-cyan-200">True North</strong>.
          </p>
          <p className="text-sm font-bold text-amber-50 font-khmer leading-loose">
            ប្រសិនបើអ្នកដើរទៅកាន់ផ្កាយប៉ូឡារីស អ្នកកំពុងដើរទៅ <strong className="text-cyan-200">ខាងជើងពិត</strong>។
          </p>
        </div>
      </StarSubBlock>
    </article>
  );
}

// ── Helper sub-block for Sun (Card 1) — warm parchment ───────────────────────

function SunSubBlock({
  labelEn,
  labelKh,
  icon: Icon,
  children,
}: {
  labelEn: string;
  labelKh: string;
  icon: typeof Sun;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3 rounded-lg bg-amber-50/80 border border-amber-300 p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-800 flex flex-wrap gap-x-2">
          <span>{labelEn}</span>
          <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">{labelKh}</span>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

// ── Helper sub-block for Stars (Cards 2/3) — dark navy ───────────────────────

function StarSubBlock({
  labelEn,
  labelKh,
  icon: Icon,
  children,
}: {
  labelEn: string;
  labelKh: string;
  icon: typeof Star;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3 rounded-lg bg-indigo-950/40 border border-indigo-400/30 p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-3.5 h-3.5 text-amber-200" aria-hidden="true" />
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-200 flex flex-wrap gap-x-2">
          <span>{labelEn}</span>
          <span className="font-khmer normal-case tracking-normal text-[0.7rem] opacity-80">{labelKh}</span>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

// ── Corner marks for dark cards ──────────────────────────────────────────────

function CornerMarksDark() {
  return (
    <div className="contents">
      <span aria-hidden="true" className="pointer-events-none absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-300/40" />
      <span aria-hidden="true" className="pointer-events-none absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-300/40" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-300/40" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-300/40" />
    </div>
  );
}

// ── Diagram: Sun arc East → noon → West ──────────────────────────────────────

function SunArcDiagram() {
  return (
    <div
      className="mt-3 relative w-full h-24 rounded-lg bg-gradient-to-b from-sky-200 to-amber-100 border border-amber-300 overflow-hidden"
      aria-hidden="true"
    >
      {/* horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-emerald-700 to-emerald-500" />
      {/* arc */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 96" preserveAspectRatio="none">
        <path
          d="M 18 78 Q 100 -14 182 78"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
      </svg>
      {/* sun at noon (top) */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-400 shadow-lg shadow-amber-300/60 ring-2 ring-amber-200" />
      {/* East/West labels */}
      <div className="absolute bottom-4 left-2 text-[10px] font-mono font-bold text-amber-900">
        E · កើត
      </div>
      <div className="absolute bottom-4 right-2 text-[10px] font-mono font-bold text-amber-900 text-right">
        W · លិច
      </div>
      <div className="absolute top-1 right-2 flex flex-col items-end text-[9px] font-mono font-bold text-amber-700 leading-tight">
        <span>NOON</span>
        <span className="font-khmer text-[0.6rem]">ថ្ងៃត្រង់</span>
      </div>
    </div>
  );
}

// ── Diagram: Hand-method (4 fingers above horizon = 1 hour) ──────────────────

function HandMethodDiagram() {
  return (
    <div
      className="mt-3 relative w-full h-32 rounded-lg bg-gradient-to-b from-orange-200 via-amber-100 to-emerald-100 border border-amber-400 overflow-hidden"
      aria-hidden="true"
    >
      {/* horizon line */}
      <div className="absolute bottom-3 left-0 right-0 h-px bg-emerald-700" />
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-emerald-700 to-emerald-500" />

      {/* Sun positioned above horizon */}
      <div className="absolute right-6 top-3 w-7 h-7 rounded-full bg-amber-400 shadow-lg shadow-amber-300/60 ring-2 ring-amber-200" />

      {/* Stack of 4 finger bands between sun and horizon */}
      <div className="absolute right-6 top-10 w-7 flex flex-col gap-[2px]">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="h-3.5 rounded-sm bg-orange-300/80 border border-orange-500 flex items-center justify-center"
          >
            <span className="text-[8px] font-mono font-bold text-orange-900 leading-none">15m</span>
          </div>
        ))}
      </div>

      {/* total label on the left */}
      <div className="absolute left-3 top-3 text-amber-900">
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest leading-tight">
          4 fingers
        </div>
        <div className="text-[10px] font-khmer leading-tight opacity-90">
          ៤ ម្រាមដៃ
        </div>
        <div className="mt-1 text-base font-bold leading-none">= 1h</div>
        <div className="text-[10px] font-khmer leading-tight opacity-90 mt-0.5">
          = ១ ម៉ោង
        </div>
      </div>

      {/* horizon labels */}
      <div className="absolute bottom-4 right-2 text-[9px] font-mono font-bold text-emerald-900 text-right">
        Horizon · ជើងមេឃ
      </div>
    </div>
  );
}

// ── Diagram: Big Dipper → pointer line → Polaris ─────────────────────────────

function BigDipperDiagram() {
  return (
    <div
      className="mt-3 relative w-full h-36 rounded-lg overflow-hidden border border-indigo-400/40"
      style={{ backgroundColor: "#020617" }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 144">
        {/* Faint background stars */}
        {[
          [22, 18], [45, 35], [70, 110], [120, 105], [185, 25], [205, 70], [225, 130], [15, 95],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="0.6" fill="#94a3b8" opacity="0.55" />
        ))}

        {/* Big Dipper — 7 stars: bowl (4) + handle (3) */}
        {/* Bowl */}
        <g>
          {/* front-edge stars (the two pointers) */}
          <circle cx="55" cy="105" r="2.4" fill="#fef3c7" />
          <circle cx="75" cy="115" r="2.4" fill="#fef3c7" />
          {/* back-edge stars of bowl */}
          <circle cx="62" cy="80" r="2" fill="#fef3c7" />
          <circle cx="82" cy="90" r="2" fill="#fef3c7" />
          {/* Handle (3 stars curving to right) */}
          <circle cx="105" cy="92" r="2" fill="#fef3c7" />
          <circle cx="128" cy="100" r="2" fill="#fef3c7" />
          <circle cx="148" cy="115" r="2" fill="#fef3c7" />
          {/* Connect bowl + handle */}
          <path
            d="M 55 105 L 62 80 L 82 90 L 75 115 Z"
            fill="none"
            stroke="#fef3c7"
            strokeWidth="0.6"
            opacity="0.55"
          />
          <path
            d="M 82 90 L 105 92 L 128 100 L 148 115"
            fill="none"
            stroke="#fef3c7"
            strokeWidth="0.6"
            opacity="0.55"
          />
        </g>

        {/* Pointer line: straight up from front-edge (avg of 55,105 and 75,115) → Polaris */}
        <path
          d="M 65 110 L 65 22"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        {/* Arrowhead */}
        <path d="M 60 28 L 65 18 L 70 28 Z" fill="#fbbf24" />

        {/* Polaris — bright glowing star with rays */}
        <g>
          <circle cx="65" cy="20" r="6" fill="#fef3c7" opacity="0.25" />
          <circle cx="65" cy="20" r="3" fill="#fde68a" />
          <line x1="65" y1="10" x2="65" y2="30" stroke="#fde68a" strokeWidth="0.6" />
          <line x1="55" y1="20" x2="75" y2="20" stroke="#fde68a" strokeWidth="0.6" />
        </g>
      </svg>

      {/* Labels */}
      <div className="absolute bottom-1 left-2 text-[9px] font-mono font-bold text-amber-100 leading-tight">
        <div>Big Dipper</div>
        <div className="font-khmer text-[0.6rem] opacity-90">ផ្កាយវែកធំ</div>
      </div>
      <div className="absolute top-1 left-16 text-[9px] font-mono font-bold text-amber-200 leading-tight">
        <div>POLARIS ★</div>
        <div className="font-khmer text-[0.6rem] opacity-90">ផ្កាយខាងជើង</div>
      </div>
    </div>
  );
}

// ── Diagram: Spinning sky wheel — Polaris at center ──────────────────────────

function SkyWheelDiagram() {
  return (
    <div
      className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-cyan-400/40 flex items-center justify-center"
      style={{ backgroundColor: "#020617" }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 128" preserveAspectRatio="xMidYMid meet">
        {/* Concentric circles representing star trails around Polaris */}
        {[18, 30, 44, 58].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="64"
            r={r}
            fill="none"
            stroke="#67e8f9"
            strokeWidth="0.6"
            strokeDasharray="2 4"
            opacity={0.35 - i * 0.05}
          />
        ))}
        {/* Star dots along trails */}
        {[
          [82, 64], [118, 64], [100, 46], [100, 82],
          [70, 64], [130, 64], [100, 34], [100, 94],
          [56, 64], [144, 64],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1" fill="#94a3b8" opacity="0.7" />
        ))}
        {/* Polaris in center — glowing */}
        <circle cx="100" cy="64" r="8" fill="#fde68a" opacity="0.18" />
        <circle cx="100" cy="64" r="4" fill="#fde68a" />
        <line x1="100" y1="50" x2="100" y2="78" stroke="#fde68a" strokeWidth="0.6" />
        <line x1="86" y1="64" x2="114" y2="64" stroke="#fde68a" strokeWidth="0.6" />
      </svg>
      {/* Center label */}
      <div className="absolute top-2 right-2 text-right text-[9px] font-mono font-bold text-amber-200 leading-tight">
        <div>POLARIS = STILL</div>
        <div className="font-khmer text-[0.6rem] opacity-90">ប៉ូឡារីស = នឹង</div>
      </div>
      <div className="absolute bottom-2 left-2 text-[9px] font-mono font-bold text-cyan-200 leading-tight">
        <div>Sky spins around it</div>
        <div className="font-khmer text-[0.6rem] opacity-90">មេឃបង្វិលជុំវិញ</div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 05 — Toxic Nature: Poison, Venom & Antidotes
//               ធម្មជាតិមានពិស៖ ពិសលេប ពិសចាក់ និង ថ្នាំបន្សាប
// ════════════════════════════════════════════════════════════════════════════

function SnakeHeadIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M6 32 q14 -22 30 -16 q18 6 22 0 q-4 14 -22 14 q-12 0 -18 8 q-6 -2 -12 -6 z"
        fill="currentColor"
      />
      <path d="M30 24 q4 -4 10 -2" stroke="#fef3c7" strokeWidth="1.4" fill="none" />
      <circle cx="36" cy="22" r="2.2" fill="#fef3c7" />
      <circle cx="36" cy="22" r="0.9" fill="#0e2a1f" />
      <path d="M58 30 l8 -1 l-8 -1 l8 -3 l-10 1 z" fill="#dc2626" />
      <path d="M14 36 l-3 4 m6 -2 l-3 5 m8 -3 l-2 5" stroke="#fbbf24" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function CrossedMushroomIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M14 32 q0 -18 18 -18 q18 0 18 18 z" fill="currentColor" />
      <circle cx="24" cy="24" r="2.6" fill="#fef3c7" />
      <circle cx="36" cy="20" r="2.0" fill="#fef3c7" />
      <circle cx="42" cy="28" r="1.6" fill="#fef3c7" />
      <rect x="26" y="32" width="12" height="20" rx="2" fill="#f5f5dc" stroke="#92400e" strokeWidth="0.8" />
      <line x1="8" y1="8" x2="58" y2="58" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
      <line x1="8" y1="8" x2="58" y2="58" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ThreatCard({
  kh,
  t,
  variant,
  nameEn,
  nameKh,
  scientific,
  badgeEn,
  badgeKh,
  storyEn,
  storyKh,
  cureEn,
  cureKh,
  Icon,
}: {
  kh: boolean;
  t: (en: string, k: string) => string;
  variant: "venom" | "poison";
  nameEn: string;
  nameKh: string;
  scientific: string;
  badgeEn: string;
  badgeKh: string;
  storyEn: string;
  storyKh: string;
  cureEn: string;
  cureKh: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const isVenom = variant === "venom";
  const accent = isVenom
    ? "from-rose-100 to-amber-50 border-rose-700"
    : "from-lime-100 to-amber-50 border-lime-700";
  const badgeColor = isVenom
    ? "bg-rose-700 text-white"
    : "bg-lime-700 text-white";
  const iconColor = isVenom ? "text-rose-700" : "text-lime-800";

  return (
    <article
      className={`relative rounded-2xl border-2 bg-gradient-to-br ${accent} p-5 flex flex-col shadow-md`}
      data-testid={`threat-${variant}-${nameEn.toLowerCase().replace(/[^a-z]+/g, "-")}`}
    >
      <CornerMarks subtle />
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-12 h-12 rounded-xl bg-white border-2 ${isVenom ? "border-rose-700" : "border-lime-700"} flex items-center justify-center flex-shrink-0 ${iconColor}`}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-lg font-bold text-emerald-950 leading-tight">
            {nameEn}
          </h4>
          <p className="font-khmer text-base text-emerald-900 leading-snug">{nameKh}</p>
          <p className="text-[10px] font-mono italic text-emerald-800/70 mt-0.5">{scientific}</p>
        </div>
      </div>

      <span className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${badgeColor} mb-3`}>
        {isVenom ? <SnakeHeadIcon className="w-3.5 h-3.5" /> : <Skull className="w-3.5 h-3.5" />}
        {badgeEn}
        <span className="font-khmer normal-case tracking-normal opacity-90">· {badgeKh}</span>
      </span>

      <p className={`text-sm text-emerald-950 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
        {t(storyEn, storyKh)}
      </p>

      <div className="mt-auto rounded-xl bg-white/70 border border-emerald-900/20 p-3">
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-900 mb-1">
          <Plus className="w-3.5 h-3.5" />
          {t("The Cure", "ការព្យាបាល")}
        </div>
        <p className={`text-sm text-emerald-950 leading-snug ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(cureEn, cureKh)}
        </p>
      </div>
    </article>
  );
}

function SectionToxicNature({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section
      id="toxic-nature"
      className="mb-10 scroll-mt-24"
      data-testid="section-toxic-nature"
    >
      <SectionHeader
        spec="05"
        kh_={kh}
        en="Toxic Nature: Poison, Venom & Antidotes"
        kh="ធម្មជាតិមានពិស៖ ពិសលេប ពិសចាក់ និង ថ្នាំបន្សាប"
      />
      <p className={`text-sm text-amber-100/85 -mt-2 mb-5 max-w-3xl ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "Knowing the difference saves lives — and so does ignoring the dangerous folk-cures.",
          "ការដឹងពីភាពខុសគ្នាអាចជួយសង្គ្រោះជីវិត — ហើយការបោះបង់ចោលជំនឿខុសឆ្គង ក៏ជួយសង្គ្រោះជីវិតដែរ។"
        )}
      </p>

      {/* ── Sub 1 — Venom vs. Poison ───────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {/* Poison panel */}
        <div
          className="relative rounded-2xl border-2 border-lime-700 bg-gradient-to-br from-lime-50 to-amber-50 p-5"
          style={CARD_BG}
          data-testid="rule-poison"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl bg-lime-700 text-white flex items-center justify-center">
              <CrossedMushroomIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-lime-900">
                Rule 1 · វិធាន ១
              </div>
              <h4 className="font-display text-xl font-bold text-emerald-950 leading-tight">
                Poisonous
                <span className="font-khmer text-base text-emerald-900 ml-2">មានពុល</span>
              </h4>
            </div>
          </div>
          <p className={`text-sm text-emerald-950 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            <strong>{t("You eat or touch it.", "អ្នកលេបចូល ឬប៉ះវា។")}</strong>{" "}
            {t(
              "The toxin enters through your mouth, skin, or stomach. Examples: a wild mushroom, a bright tropical frog, the seeds of certain trees.",
              "ពិសចូលតាមមាត់ ស្បែក ឬក្រពះ។ ឧទាហរណ៍៖ ផ្សិតព្រៃ កង្កែបពណ៌ភ្លឺ និងគ្រាប់ពូជដើមឈើខ្លះ។"
            )}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-mono text-lime-900">
            <span className="px-2 py-0.5 rounded-full bg-white border border-lime-700">EAT / TOUCH</span>
            <span className="font-khmer px-2 py-0.5 rounded-full bg-white border border-lime-700">លេប / ប៉ះ</span>
          </div>
        </div>

        {/* Venom panel */}
        <div
          className="relative rounded-2xl border-2 border-rose-700 bg-gradient-to-br from-rose-50 to-amber-50 p-5"
          style={CARD_BG}
          data-testid="rule-venom"
        >
          <CornerMarks subtle />
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl bg-rose-700 text-white flex items-center justify-center">
              <SnakeHeadIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose-900">
                Rule 2 · វិធាន ២
              </div>
              <h4 className="font-display text-xl font-bold text-emerald-950 leading-tight">
                Venomous
                <span className="font-khmer text-base text-emerald-900 ml-2">មានពិស</span>
              </h4>
            </div>
          </div>
          <p className={`text-sm text-emerald-950 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            <strong>{t("It bites or stings you.", "វាខាំ ឬចាក់អ្នក។")}</strong>{" "}
            {t(
              "The toxin is injected straight into your bloodstream by fangs, a stinger, or spines. Examples: a snake, a scorpion, a stingray.",
              "ពិសត្រូវបានចាក់បញ្ចូលដោយផ្ទាល់ទៅក្នុងឈាម តាមរយៈចង្កូម ដែកចាក់ ឬបន្លា។ ឧទាហរណ៍៖ ពស់ ខ្ទួយ និងត្រីសុឺ។"
            )}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-mono text-rose-900">
            <span className="px-2 py-0.5 rounded-full bg-white border border-rose-700">BITE / STING</span>
            <span className="font-khmer px-2 py-0.5 rounded-full bg-white border border-rose-700">ខាំ / ចាក់</span>
          </div>
        </div>
      </div>

      {/* Memory hook */}
      <div className="rounded-xl border-2 border-amber-700 bg-amber-100 px-4 py-3 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-800 flex-shrink-0 mt-0.5" />
        <p className={`text-sm text-amber-950 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <strong>{t("Quick memory: ", "ចងចាំរហ័ស ៖ ")}</strong>
          {t(
            "If YOU bite IT and get sick, it is poisonous. If IT bites YOU and you get sick, it is venomous.",
            "បើ អ្នក ខាំ វា ហើយអ្នកឈឺ — នោះវា មានពុល។ បើ វា ខាំ អ្នក ហើយអ្នកឈឺ — នោះវា មានពិស។"
          )}
        </p>
      </div>

      {/* ── Sub 2 — Local Threats & Cures ──────────────────────────────── */}
      <div className="mb-3">
        <h3 className={`font-display text-xl font-bold text-amber-100 mb-1 ${kh ? "font-khmer" : ""}`}>
          {t("Local Threats & Cures", "ហានិភ័យក្នុងតំបន់ និង ការព្យាបាល")}
        </h3>
        <p className={`text-sm text-amber-100/80 mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Three threats every Cambodian student should be able to recognize.",
            "ហានិភ័យបីយ៉ាង ដែលសិស្សកម្ពុជាគ្រប់រូបគួរស្គាល់។"
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <ThreatCard
          kh={kh}
          t={t}
          variant="venom"
          nameEn="Malayan Pit Viper"
          nameKh="ពស់ពព្លាក់"
          scientific="Calloselasma rhodostoma"
          badgeEn="Venomous"
          badgeKh="មានពិស"
          Icon={SnakeHeadIcon}
          storyEn="This snake causes the most bites in Southeast Asia. It hides under dry leaves in plantations and rubber farms — and unlike other snakes, it does NOT slither away when people approach. Its camouflage is so good that workers step right on it."
          storyKh="ពស់នេះបង្កការខាំច្រើនជាងគេនៅអាស៊ីអាគ្នេយ៍។ វាលាក់ខ្លួននៅក្រោមស្លឹកឈើស្ងួត ក្នុងចម្ការ និងចម្ការកៅស៊ូ — ហើយខុសពីពស់ដទៃ វាមិនលូនរត់ចេញពេលមនុស្សចូលមកជិតទេ។ ការបន្លំពណ៌ឆ្លាតវៃរបស់វា ធ្វើឲ្យអ្នកធ្វើការជាន់លើវាដោយមិនដឹងខ្លួន។"
          cureEn="There IS a specific Antivenom (Antivenom). It MUST be administered at a hospital — village remedies will not save the limb or the life."
          cureKh="មានសេរ៉ូមប្រឆាំងពិសពស់ជាក់លាក់មួយ។ វាត្រូវតែចាក់នៅមន្ទីរពេទ្យ — ថ្នាំស្រុកមិនអាចសង្គ្រោះដៃ ឬជីវិតបានទេ។"
        />
        <ThreatCard
          kh={kh}
          t={t}
          variant="poison"
          nameEn="The Sleng Tree / Strychnine"
          nameKh="ដើមស្លែង"
          scientific="Strychnos nux-vomica"
          badgeEn="Poisonous"
          badgeKh="មានពុល"
          Icon={CrossedMushroomIcon}
          storyEn="The orange fruit looks tempting and the seeds inside contain strychnine — a deadly neurotoxin that causes violent, uncontrollable muscle spasms within an hour. The whole body locks up, including the muscles you breathe with."
          storyKh="ផ្លែពណ៌ទឹកក្រូចមើលទៅគួរឱ្យចង់ញ៉ាំ ហើយគ្រាប់ខាងក្នុងមានស្ត្រីកនីន — ជាសារធាតុពុលប្រព័ន្ធសរសៃប្រសាទដ៏សាហាវ ដែលបង្កការប្រកាច់សាច់ដុំខ្លាំងក្នុងរយៈពេលមួយម៉ោង។ រាងកាយទាំងមូលនឹងរឹងតឹង រួមទាំងសាច់ដុំដកដង្ហើមផងដែរ។"
          cureEn="There is NO direct antidote. Immediate stomach pumping (gastric lavage) and breathing support at a hospital are the only chance of survival."
          cureKh="គ្មានថ្នាំបន្សាបដោយផ្ទាល់ទេ។ ការបឺតក្រពះភ្លាមៗ និងការជួយដកដង្ហើមនៅមន្ទីរពេទ្យ ជាឱកាសតែមួយគត់ដើម្បីរស់រាន។"
        />
        <ThreatCard
          kh={kh}
          t={t}
          variant="poison"
          nameEn="Wild Death Cap Mushrooms"
          nameKh="ផ្សិតពុលព្រៃ"
          scientific="Amanita phalloides"
          badgeEn="Poisonous"
          badgeKh="មានពុល"
          Icon={CrossedMushroomIcon}
          storyEn="Often mistaken for edible straw mushrooms (ផ្សិតចំប៉ើង). The poison feels harmless for 6–12 hours, then quietly destroys the liver. By the time the person feels truly sick, it is often too late."
          storyKh="ច្រើនត្រូវបានច្រឡំជាមួយផ្សិតចំប៉ើងដែលអាចបរិភោគបាន។ ពិសមើលទៅហាក់ដូចគ្មានគ្រោះថ្នាក់រយៈពេល ៦–១២ ម៉ោង បន្ទាប់មក វាបំផ្លាញថ្លើមដោយស្ងៀមៗ។ លុះត្រាតែមនុស្សនោះមានអារម្មណ៍ឈឺពិតប្រាកដ វាច្រើនតែយឺតពេលហើយ។"
          cureEn="No direct antidote. The liver dies. Survival rule: if you did not GROW it or BUY it from a trusted seller, do NOT eat it."
          cureKh="គ្មានថ្នាំបន្សាបដោយផ្ទាល់ទេ។ ថ្លើមនឹងស្លាប់។ វិធានរស់រាន ៖ បើអ្នកមិន ដាំ វាខ្លួនឯង ឬមិន ទិញ ពីអ្នកលក់ដែលអាចទុកចិត្តបាន — សូម កុំបរិភោគ វា។"
        />
      </div>

      {/* ── Sub 3 — First-Aid Myths ────────────────────────────────────── */}
      <div
        className="relative rounded-2xl border-4 border-rose-700 bg-rose-950 text-white p-5 sm:p-6 mb-4 shadow-2xl"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(250, 204, 21, 0.08) 0 12px, transparent 12px 24px)",
        }}
        data-testid="myth-busting"
      >
        <CornerMarks />
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-rose-600 border-2 border-yellow-300 flex items-center justify-center animate-pulse">
            <Siren className="w-7 h-7 text-yellow-200" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-yellow-300 text-rose-950 text-[10px] font-mono uppercase tracking-widest font-bold">
              <AlertOctagon className="w-3.5 h-3.5" />
              Snakebite First-Aid · Myth Busting
            </div>
            <h4 className={`font-display text-2xl font-bold mt-1 leading-tight ${kh ? "font-khmer" : ""}`}>
              {t("DO NOT DO THIS", "សូមកុំធ្វើរឿងទាំងនេះ")}
            </h4>
            <p className="font-khmer text-sm text-yellow-100/90 mt-0.5">
              លុបបំបាត់ជំនឿខុសឆ្គងនៃការសង្គ្រោះបឋម
            </p>
          </div>
        </div>

        <ul className="space-y-2.5 mb-5">
          {[
            {
              en: "Cutting the wound to bleed the venom out.",
              kh: "កាត់របួសដើម្បីបញ្ចេញពិសតាមឈាម។",
              why_en: "It only damages the limb — and the venom is already past that point.",
              why_kh: "វាគ្រាន់តែបំផ្លាញដៃ ឬជើង — ហើយពិសបានហួសចំណុចនោះទៅហើយ។",
            },
            {
              en: "Sucking out the venom with your mouth.",
              kh: "បឺតពិសចេញដោយមាត់។",
              why_en: "You poison yourself through tiny cuts in your gums.",
              why_kh: "អ្នកនឹងពុលខ្លួនឯងតាមរយៈរបួសតូចៗនៅអញ្ចាញធ្មេញ។",
            },
            {
              en: "Tying a tight tourniquet (ខ្សែចងរឹត) above the bite.",
              kh: "ចងខ្សែឲ្យតឹង (ខ្សែចងរឹត) ខាងលើស្នាមខាំ។",
              why_en: "The limb dies from no blood flow, AND when you finally untie it the trapped venom rushes to the heart all at once — much worse.",
              why_kh: "ដៃ ឬជើងនឹងស្លាប់ ព្រោះឈាមមិនហូរ ហើយពេលអ្នកស្រាយចេញ ពិសដែលនៅជាប់នឹងហូរទៅបេះដូងភ្លាមៗ — កាន់តែអាក្រក់ជាងមុន។",
            },
          ].map((m, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl bg-rose-900/60 border border-rose-400/40 px-3 py-2.5"
            >
              <Ban className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold text-yellow-100 leading-snug ${kh ? "font-khmer" : ""}`}>
                  {t(m.en, m.kh)}
                </div>
                <div className={`text-xs text-rose-100/85 leading-snug mt-0.5 ${kh ? "font-khmer leading-loose" : ""}`}>
                  {t(m.why_en, m.why_kh)}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* The correct first aid */}
        <div className="rounded-xl bg-emerald-900 border-2 border-emerald-300 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-300" />
            <div className={`text-sm font-mono uppercase tracking-widest text-emerald-200 ${kh ? "font-khmer normal-case tracking-normal text-base" : ""}`}>
              {t("The ONLY correct first aid", "ការសង្គ្រោះបឋមត្រឹមត្រូវ​តែមួយគត់")}
            </div>
          </div>
          <ol className={`space-y-2 text-sm text-emerald-50 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <li className="flex gap-2">
              <span className="font-mono font-bold text-emerald-300">1.</span>
              <span>
                <strong>{t("Stay completely still.", "នៅស្ងៀមឲ្យបានពេញលេញ។")}</strong>{" "}
                {t(
                  "Lie the victim down. The lower their heart rate, the slower the venom moves.",
                  "ដាក់អ្នករងគ្រោះឲ្យដេក។ បេះដូងលោតយឺតប៉ុនណា ពិសហូរយឺតប៉ុណ្ណោះ។"
                )}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono font-bold text-emerald-300">2.</span>
              <span>
                <strong>{t("Immobilize the bitten limb.", "ធ្វើឲ្យដៃ ឬជើងដែលត្រូវខាំឈប់រំកិល។")}</strong>{" "}
                {t(
                  "Splint it like a broken bone. Keep it BELOW the level of the heart if possible.",
                  "ចងរុំដូចឆ្អឹងបាក់។ ទុកវាឲ្យនៅទាបជាងបេះដូង បើអាច។"
                )}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono font-bold text-emerald-300">3.</span>
              <span>
                <strong>{t("Get to a clinic — fast but calm.", "ទៅមន្ទីរពេទ្យ — លឿនប៉ុន្តែស្ងប់។")}</strong>{" "}
                {t(
                  "Carry the victim if possible. Note the time of the bite and what the snake looked like — but never waste time chasing or killing it.",
                  "សែងអ្នករងគ្រោះបើអាច។ កត់សម្គាល់ម៉ោងខាំ និងរូបរាងពស់ — តែកុំខាតពេលដេញ ឬសម្លាប់វាឡើយ។"
                )}
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* Closing line */}
      <div
        className="relative rounded-2xl border-2 border-amber-600 p-4 flex items-start gap-3"
        style={CARD_BG}
      >
        <CornerMarks subtle />
        <HeartPulse className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
        <p className={`text-sm text-emerald-950 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <strong>{t("Bottom line: ", "សេចក្តីសន្និដ្ឋាន ៖ ")}</strong>
          {t(
            "Slow down the venom by staying still — speed up the rescue by going straight to a hospital. Folk remedies cost limbs and lives every year in Cambodia.",
            "បន្ថយល្បឿនពិសដោយការនៅស្ងៀម — បង្កើនល្បឿនការសង្គ្រោះដោយទៅមន្ទីរពេទ្យឲ្យឆាប់។ ថ្នាំស្រុកបង្កការបាត់ដៃ ជើង និងជីវិតរាប់រយករណីជារៀងរាល់ឆ្នាំនៅកម្ពុជា។"
          )}
        </p>
      </div>
    </section>
  );
}
