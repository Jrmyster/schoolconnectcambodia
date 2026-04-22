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
