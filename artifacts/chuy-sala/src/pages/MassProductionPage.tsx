import { Link } from "wouter";
import {
  ArrowLeft,
  Factory,
  Hammer,
  Cog,
  Wrench,
  Bot,
  Zap,
  Flame,
  Users,
  Clock,
  TrendingDown,
  Package,
  Sparkles,
  Info,
  Car,
  History,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  TECH-06 · The History of Mass Production: From Hands to Robots
//            ប្រវត្តិនៃការផលិតទ្រង់ទ្រាយធំ៖ ពីដៃទៅរ៉ូបូត
//
//  1. The Timeline of Making   · Cottage → Interchangeable Parts → Assembly
//  2. Automation & Machinery   · Human → Steam → Electricity → Robotics
//  3. The Economics of Scale   · Why prices drop (Efficiency / Bulk / Access)
//
//  Aesthetic: Industrial — slate greys, metallic accents, blueprint line art.
// ════════════════════════════════════════════════════════════════════════════

const STEEL = "#475569";   // slate-600
const RIVET = "#94a3b8";   // slate-400
const BRASS = "#b45309";   // amber-700
const COPPER = "#c2410c";  // orange-700

// ─── Page ─────────────────────────────────────────────────────────────────

export default function MassProductionPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* ── Header / Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-b-4 border-amber-700/60">
        <BlueprintGrid />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/5 border border-amber-600/40 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-amber-300">
            <Factory className="w-3.5 h-3.5" />
            TECH-06 · Mass Production & Automation
          </div>

          <h1 className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh
              ? "ប្រវត្តិនៃការផលិតទ្រង់ទ្រាយធំ៖ ពីដៃទៅរ៉ូបូត"
              : <>The History of <span className="text-amber-400">Mass Production</span> — From Hands to Robots</>}
          </h1>
          <p className={`mt-4 max-w-2xl text-slate-300 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "របៀបដែលពិភពលោកបានឆ្លងពីការផលិតវត្ថុមួយតាមដៃនីមួយៗ ទៅរ៉ូបូតផលិតរាប់លានវត្ថុក្នុងមួយយប់ — និងហេតុអ្វីបានជារឿងនេះបានប្ដូរអ្វីៗគ្រប់យ៉ាង។"
              : "How the world moved from making one thing at a time by hand to robots producing millions overnight — and why that change rewired everything."}
          </p>
        </div>
      </header>

      {/* ── Section 1: Timeline ───────────────────────────────────────── */}
      <Section
        spec="01"
        Icon={History}
        eyebrowEn="The Timeline of Making"
        eyebrowKh="ប្រវត្តិនៃការផលិត"
        titleEn="Three shifts that changed the factory floor"
        titleKh="ការផ្លាស់ប្តូរបីដែលបានកែទ្រង់ទ្រាយរោងចក្រ"
        descEn="Each step lets us make things faster, cheaper, and in greater numbers. The same shirt that took a tailor a week now takes a factory minutes."
        descKh="ជំហាននីមួយៗអនុញ្ញាតឱ្យយើងផលិតបានលឿនជាង ថោកជាង និងច្រើនជាង។ អាវដែលជាងដេរម្នាក់ត្រូវចំណាយពេលមួយសប្ដាហ៍ ឥឡូវនេះរោងចក្រធ្វើបានក្នុងពេលប៉ុន្មាននាទី។"
        isKh={isKh}
      >
        <Timeline isKh={isKh} />
      </Section>

      {/* ── Section 2: Automation & Machinery ─────────────────────────── */}
      <Section
        spec="02"
        Icon={Cog}
        eyebrowEn="Automation & Machinery"
        eyebrowKh="ស្វ័យប្រវត្តិកម្ម និងគ្រឿងចក្រ"
        titleEn="From muscle to motor to machine intelligence"
        titleKh="ពីសាច់ដុំ ទៅម៉ូទ័រ ទៅបញ្ញាម៉ាស៊ីន"
        descEn="The energy that turns the wheels has changed four times in 250 years. Each new source unlocked factories that the previous one could never have built."
        descKh="ប្រភពថាមពលដែលបង្វិលកង់ បានផ្លាស់ប្តូរ ៤ ដងក្នុងរយៈពេល ២៥០ ឆ្នាំ។ ប្រភពថ្មីនីមួយៗបានបើកដំណើររោងចក្រដែលប្រភពមុនមិនអាចសាងសង់បាន។"
        isKh={isKh}
      >
        <PowerLadder isKh={isKh} />
        <AutomationDefinition isKh={isKh} />
      </Section>

      {/* ── Section 3: Economics of Scale ─────────────────────────────── */}
      <Section
        spec="03"
        Icon={TrendingDown}
        eyebrowEn="The Economics of Scale"
        eyebrowKh="សេដ្ឋកិច្ចនៃទំហំផលិតកម្ម"
        titleEn="Why making more makes things cheaper"
        titleKh="ហេតុអ្វីបានជាការផលិតច្រើនធ្វើឱ្យតម្លៃថោក"
        descEn="When a factory scales up, three forces push the price per item down. Together they turn a luxury into something every family can afford."
        descKh="នៅពេលរោងចក្រពង្រីកធំ កម្លាំងបី បន្ថយតម្លៃក្នុងមួយឯកតា។ រួមគ្នា ពួកវាបង្វែរវត្ថុប្រណិតទៅជាវត្ថុដែលគ្រួសារទាំងអស់អាចទិញបាន។"
        isKh={isKh}
      >
        <ScaleCards isKh={isKh} />
        <LuxuryToEveryday isKh={isKh} />
      </Section>

      {/* ── Footer breadcrumb ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 text-sm ${isKh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec, Icon, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  spec: string;
  Icon: React.ComponentType<{ className?: string }>;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-slate-800 text-amber-400 rounded-sm px-2.5 py-0.5 border border-amber-700/40">
          SEC-{spec}
        </span>
        <Icon className="w-5 h-5 text-slate-700" />
        <span className={`text-xs font-bold uppercase tracking-widest text-slate-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-slate-600 text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · Timeline
// ════════════════════════════════════════════════════════════════════════════

type Era = {
  id: string;
  year: string;
  nameEn: string;
  nameKh: string;
  shortEn: string;
  shortKh: string;
  bodyEn: string;
  bodyKh: string;
  Icon: React.ComponentType<{ className?: string }>;
  pillars: { en: string; kh: string }[];
  metric?: { labelEn: string; labelKh: string; valueEn: string; valueKh: string };
};

const ERAS: Era[] = [
  {
    id: "cottage",
    year: "Before 1700",
    nameEn: "Cottage Industry",
    nameKh: "សិប្បកម្មតាមផ្ទះ",
    shortEn: "By hand, at home",
    shortKh: "ដោយដៃ នៅផ្ទះ",
    bodyEn: "Goods were made slowly by hand, one at a time, often inside the worker's own home or village workshop. The quality could be very high — but every shoe, every clay pot, every shirt was a unique original. That made them very expensive and rare. Most people owned only what they truly needed.",
    bodyKh: "ទំនិញត្រូវបានផលិតយឺតៗដោយដៃ ម្ដងមួយ ភាគច្រើននៅផ្ទះអ្នកធ្វើ ឬតាមភូមិ។ គុណភាពអាចខ្ពស់ណាស់ — ប៉ុន្តែស្បែកជើងនីមួយៗ ផើងដីនីមួយៗ អាវនីមួយៗ គឺជារបស់តែមួយ។ នេះធ្វើឱ្យវាថ្លៃណាស់ និងកម្រ។ មនុស្សភាគច្រើនមានតែវត្ថុដែលគេពិតជាត្រូវការ។",
    Icon: Hammer,
    pillars: [
      { en: "High craftsmanship", kh: "សិល្បៈដៃខ្ពស់" },
      { en: "Very expensive", kh: "ថ្លៃណាស់" },
      { en: "Slow output", kh: "ផលិតបានយឺត" },
    ],
  },
  {
    id: "interchangeable",
    year: "1798",
    nameEn: "Interchangeable Parts",
    nameKh: "គ្រឿងបន្លាស់ដែលអាចផ្លាស់ប្តូរបាន",
    shortEn: "Eli Whitney's idea",
    shortKh: "គំនិតរបស់ Eli Whitney",
    bodyEn: "American inventor Eli Whitney won a contract to make 10,000 muskets for the U.S. government. His big idea: make every trigger, every barrel, every screw to the EXACT same shape and size. Now if a part broke, any other part could replace it. Repairs became fast, and assembly became something an unskilled worker could do.",
    bodyKh: "អ្នកបង្កើតគំនិតអាមេរិកាំង Eli Whitney បានឈ្នះកិច្ចសន្យាផលិតកាំភ្លើង ១០.០០០ ដើម្បីសហរដ្ឋអាមេរិក។ គំនិតធំរបស់គាត់៖ ផលិតគ្រប់ឧបករណ៍បាញ់ គ្រប់ដងកាំភ្លើង គ្រប់វីសឱ្យមានរូបរាង និងទំហំដូចគ្នាបេះបិទ។ ឥឡូវនេះ បើគ្រឿងណាមួយខូច គ្រឿងផ្សេងទៀតអាចជំនួសវាបាន។ ការជួសជុលលឿន ហើយការផ្គុំអាចធ្វើបានដោយកម្មករដែលគ្មានជំនាញ។",
    Icon: Wrench,
    pillars: [
      { en: "Same shape, same size", kh: "រូបរាងតែមួយ ទំហំតែមួយ" },
      { en: "Fast repairs", kh: "ជួសជុលលឿន" },
      { en: "Unskilled assembly", kh: "ផ្គុំដោយគ្មានជំនាញ" },
    ],
  },
  {
    id: "assembly-line",
    year: "1913",
    nameEn: "The Moving Assembly Line",
    nameKh: "ខ្សែសង្វាក់ផលិតកម្មចល័ត",
    shortEn: "Henry Ford's Model T",
    shortKh: "Model T របស់ Henry Ford",
    bodyEn: "Henry Ford turned the old idea upside-down: instead of the worker walking to the car, the car came to the worker on a moving belt. Each worker did one tiny job — bolt this, paint that — over and over, perfectly. The time to build a Ford Model T fell from 12 hours to 90 minutes, and the price collapsed from $825 to $260. A car became something an ordinary worker could afford.",
    bodyKh: "Henry Ford បានបង្វែរគំនិតចាស់៖ ជំនួសឱ្យកម្មករដើរទៅឡាន ឡានបែរជាមកកម្មករតាមរយៈខ្សែសង្វាក់។ កម្មកររៀងម្នាក់ធ្វើការងារតូចមួយ — បង្គ្រប់នេះ លាបនោះ — ម្ដងហើយម្ដងទៀតយ៉ាងល្អឥតខ្ចោះ។ ពេលវេលាសាងសង់ Ford Model T ធ្លាក់ពី ១២ ម៉ោង មក ៩០ នាទី ហើយតម្លៃធ្លាក់ពី ៨២៥ ដុល្លារ មក ២៦០ ដុល្លារ។ ឡានក្លាយជាវត្ថុដែលកម្មករធម្មតាអាចទិញបាន។",
    Icon: Car,
    pillars: [
      { en: "Belt brings work to worker", kh: "ខ្សែសង្វាក់នាំការងារទៅកម្មករ" },
      { en: "12 hrs ➜ 90 min", kh: "១២ ម៉ោង ➜ ៩០ នាទី" },
      { en: "Affordable for workers", kh: "តម្លៃសមរម្យសម្រាប់កម្មករ" },
    ],
    metric: {
      labelEn: "Model T price drop",
      labelKh: "តម្លៃ Model T ធ្លាក់ចុះ",
      valueEn: "$825 → $260",
      valueKh: "៨២៥ ➜ ២៦០ ដុល្លារ",
    },
  },
];

function Timeline({ isKh }: { isKh: boolean }) {
  return (
    <ol className="relative">
      {/* Rail */}
      <div className="absolute left-5 sm:left-7 top-0 bottom-0 w-0.5 bg-slate-300" aria-hidden />
      {ERAS.map((era, i) => (
        <li key={era.id} className="relative pl-14 sm:pl-20 pb-8 last:pb-0" data-testid={`era-${era.id}`}>
          {/* Node */}
          <div
            className="absolute left-0 top-1 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-slate-800 border-4 border-amber-600/70 flex items-center justify-center text-amber-400 shadow-lg"
            style={{ boxShadow: `0 0 0 4px ${RIVET}33` }}
          >
            <era.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div className="rounded-2xl bg-white border border-slate-300 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-widest text-amber-400">
                  {era.year} · ERA {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className={`font-display font-bold text-lg sm:text-xl leading-tight ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? era.nameKh : era.nameEn}
                </h3>
                <div className={`text-[11px] text-slate-300 ${isKh ? "font-sans" : "font-khmer"}`}>
                  {isKh ? era.nameEn : era.nameKh}
                </div>
              </div>
              <div className={`text-xs italic text-slate-300 ${isKh ? "font-khmer not-italic" : ""}`}>
                {isKh ? era.shortKh : era.shortEn}
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh ? era.bodyKh : era.bodyEn}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {era.pillars.map((p, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] px-2.5 py-1 rounded-sm bg-slate-100 border border-slate-300 text-slate-700 ${isKh ? "font-khmer" : "font-mono uppercase tracking-wide"}`}
                  >
                    {isKh ? p.kh : p.en}
                  </span>
                ))}
              </div>

              {era.metric && (
                <div className="rounded-lg bg-amber-50 border-l-4 border-amber-600 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
                  <div className={`text-[10px] font-mono uppercase tracking-widest text-amber-800 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                    {isKh ? era.metric.labelKh : era.metric.labelEn}
                  </div>
                  <div className="font-display font-extrabold text-xl text-amber-900 tabular-nums">
                    {isKh ? era.metric.valueKh : era.metric.valueEn}
                  </div>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · Power ladder + Automation definition
// ════════════════════════════════════════════════════════════════════════════

type PowerStep = {
  id: string;
  era: string;
  nameEn: string;
  nameKh: string;
  bodyEn: string;
  bodyKh: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
};

const POWER_STEPS: PowerStep[] = [
  {
    id: "human",
    era: "—",
    nameEn: "Human Power",
    nameKh: "កម្លាំងមនុស្ស",
    bodyEn: "Muscle and skill. Limited by how long a person can work without rest.",
    bodyKh: "សាច់ដុំ និងជំនាញ។ កំណត់ដោយរយៈពេលដែលមនុស្សអាចធ្វើការដោយគ្មានការសម្រាក។",
    Icon: Users,
    accent: "bg-stone-200 text-stone-700 border-stone-300",
  },
  {
    id: "steam",
    era: "1780s",
    nameEn: "Steam",
    nameKh: "ចំហាយទឹក",
    bodyEn: "Boil water with coal, push pistons. One engine could replace 100 workers — but only near a coal mine.",
    bodyKh: "ស្ងោរទឹកដោយធ្យូងថ្ម រុញកំចាត់។ ម៉ាស៊ីនមួយអាចជំនួសកម្មករ ១០០ នាក់ — ប៉ុន្តែតែនៅជិតរំណប់ធ្យូងថ្មប៉ុណ្ណោះ។",
    Icon: Flame,
    accent: "bg-orange-100 text-orange-800 border-orange-300",
  },
  {
    id: "electricity",
    era: "1880s",
    nameEn: "Electricity",
    nameKh: "អគ្គិសនី",
    bodyEn: "Power flows down a wire to anywhere. Now factories can be built in cities, and each machine has its own motor.",
    bodyKh: "ថាមពលហូរតាមខ្សែទៅគ្រប់ទីកន្លែង។ ឥឡូវនេះរោងចក្រអាចសាងសង់ក្នុងទីក្រុង ហើយម៉ាស៊ីននីមួយៗមានម៉ូទ័រផ្ទាល់ខ្លួន។",
    Icon: Zap,
    accent: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  {
    id: "robotics",
    era: "1960s+",
    nameEn: "Robotics",
    nameKh: "រ៉ូបូត",
    bodyEn: "Programmed arms that weld, paint, and assemble — 24 hours a day, in conditions no human could survive.",
    bodyKh: "ដៃកម្មវិធីដែលផ្សារ លាបពណ៌ និងផ្គុំ — ២៤ ម៉ោងក្នុងមួយថ្ងៃ ក្នុងលក្ខខណ្ឌដែលមនុស្សមិនអាចរស់រានបាន។",
    Icon: Bot,
    accent: "bg-cyan-100 text-cyan-800 border-cyan-300",
  },
];

function PowerLadder({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-300 shadow-sm p-4 sm:p-6">
      <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
        {isKh ? "ជណ្ដើរថាមពល៖ ពីសាច់ដុំ ទៅរ៉ូបូត" : "Power Ladder: from muscle to robots"}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {POWER_STEPS.map((s, i) => (
          <div key={s.id} className="relative">
            {/* Arrow between steps */}
            {i < POWER_STEPS.length - 1 && (
              <div className="hidden md:flex absolute -right-2 top-6 z-10 w-4 h-4 items-center justify-center text-slate-400">
                ▶
              </div>
            )}
            <div
              className={`rounded-xl border ${s.accent} p-4 h-full flex flex-col`}
              data-testid={`power-${s.id}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-white/70 flex items-center justify-center">
                  <s.Icon className="w-5 h-5" />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest opacity-80">
                  {s.era}
                </div>
              </div>
              <h4 className={`font-display font-bold text-base leading-tight ${isKh ? "font-khmer" : ""}`}>
                {isKh ? s.nameKh : s.nameEn}
              </h4>
              <div className={`text-[11px] opacity-80 mb-2 ${isKh ? "font-sans" : "font-khmer"}`}>
                {isKh ? s.nameEn : s.nameKh}
              </div>
              <p className={`text-xs flex-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh ? s.bodyKh : s.bodyEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationDefinition({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-slate-900 text-white p-5 sm:p-6 border-2 border-amber-700/50 relative overflow-hidden">
      <div className="absolute top-2 right-2 flex gap-1" aria-hidden>
        <Rivet /><Rivet /><Rivet />
      </div>
      <div className="absolute bottom-2 left-2 flex gap-1" aria-hidden>
        <Rivet /><Rivet /><Rivet />
      </div>

      <div className="flex items-start gap-4 max-w-3xl">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-700/20 border border-amber-600/40 flex items-center justify-center">
          <Cog className="w-6 h-6 text-amber-400" />
        </div>
        <div className="min-w-0">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-amber-400 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "និយមន័យ" : "Definition"}
          </div>
          <h3 className={`font-display font-bold text-xl mt-0.5 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ស្វ័យប្រវត្តិកម្ម (Automation)" : "Automation"}
          </h3>
          <p className={`mt-2 text-sm text-slate-200 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ការប្រើប្រាស់ម៉ាស៊ីនដើម្បីធ្វើការងារដដែលៗ ឬគ្រោះថ្នាក់ ដោយមិនត្រូវការមនុស្សដឹកនាំគ្រប់ចលនា។ មនុស្សកំណត់ច្បាប់ម្ដង — ម៉ាស៊ីនអនុវត្តតាមច្បាប់នោះរាប់លានដង។"
              : "Using machines to do repetitive or dangerous tasks without needing a human to guide every move. Humans set the rules once — the machine follows those rules a million times."}
          </p>
        </div>
      </div>
    </div>
  );
}

function Rivet() {
  return <span className="block w-1.5 h-1.5 rounded-full bg-amber-600/70" />;
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · Economics of Scale
// ════════════════════════════════════════════════════════════════════════════

type ScaleForce = {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  nameEn: string;
  nameKh: string;
  bodyEn: string;
  bodyKh: string;
  exampleEn: string;
  exampleKh: string;
  tone: { from: string; to: string; ring: string; chip: string };
};

const SCALE_FORCES: ScaleForce[] = [
  {
    id: "efficiency",
    Icon: Clock,
    nameEn: "Efficiency",
    nameKh: "ប្រសិទ្ធភាព",
    bodyEn: "Machines don't get tired, don't take lunch breaks, and don't make different choices on a Monday than a Friday. The same exact action is repeated thousands of times per hour with zero variation.",
    bodyKh: "ម៉ាស៊ីនមិនអស់កម្លាំង មិនឈប់ហូបអាហារថ្ងៃត្រង់ ហើយមិនជ្រើសរើសខុសគ្នារវាងថ្ងៃច័ន្ទ និងថ្ងៃសុក្រ។ សកម្មភាពដូចគ្នាបេះបិទត្រូវបានធ្វើម្ដងហើយម្ដងទៀតរាប់ពាន់ដងក្នុងមួយម៉ោង ដោយគ្មានភាពខុសប្លែក។",
    exampleEn: "1 robot welder = 8 human welders, 24/7.",
    exampleKh: "១ រ៉ូបូតផ្សារ = ៨ ជាងផ្សារ ២៤/៧។",
    tone: { from: "from-slate-700", to: "to-slate-800", ring: "ring-slate-300", chip: "text-slate-600" },
  },
  {
    id: "bulk",
    Icon: Package,
    nameEn: "Bulk Buying",
    nameKh: "ការទិញរាយ",
    bodyEn: "Buying 1 million tons of steel at once is far cheaper per gram than buying 1 kilogram. Suppliers cut the price for big customers because they save on packaging, shipping, and paperwork.",
    bodyKh: "ការទិញដែក ១ លានតោនក្នុងពេលតែមួយ គឺថោកជាងក្នុងមួយក្រាម បើធៀបនឹងការទិញ ១ គីឡូក្រាម។ អ្នកផ្គត់ផ្គង់បន្ថយតម្លៃសម្រាប់អតិថិជនធំ ព្រោះពួកគេសន្សំសំចៃលើការវេចខ្ចប់ ការដឹកជញ្ជូន និងក្រដាសកិច្ចការ។",
    exampleEn: "Cost per gram of steel: 1 kg ➜ 1,000,000 kg can drop ~70%.",
    exampleKh: "តម្លៃក្នុងមួយក្រាមដែក៖ ១ គ.ក. ➜ ១.០០០.០០០ គ.ក. អាចធ្លាក់ ~៧០%។",
    tone: { from: "from-amber-700", to: "to-amber-800", ring: "ring-amber-300", chip: "text-amber-700" },
  },
  {
    id: "accessibility",
    Icon: Users,
    nameEn: "Accessibility",
    nameKh: "ការងាយទទួលយក",
    bodyEn: "Mass production turns 'luxury' items into 'everyday' items for everyone. A radio, a refrigerator, a smartphone — all once owned only by the rich, all now in millions of ordinary homes.",
    bodyKh: "ការផលិតទ្រង់ទ្រាយធំ បង្វែរវត្ថុ 'ប្រណីត' ទៅជាវត្ថុ 'ប្រចាំថ្ងៃ' សម្រាប់មនុស្សគ្រប់គ្នា។ វិទ្យុ ទូទឹកកក ទូរស័ព្ទស្មាតហ្វូន — ធ្លាប់ជាកម្មសិទ្ធិតែអ្នកមានលុយ ឥឡូវនេះមាននៅក្នុងផ្ទះធម្មតារាប់លាន។",
    exampleEn: "1900: 1 in 7,000 people owned a car. 2025: ~1 in 5.",
    exampleKh: "១៩០០៖ ១ ក្នុង ៧.០០០ នាក់មានឡាន។ ២០២៥៖ ~១ ក្នុង ៥។",
    tone: { from: "from-cyan-700", to: "to-cyan-800", ring: "ring-cyan-300", chip: "text-cyan-700" },
  },
];

function ScaleCards({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {SCALE_FORCES.map((f) => (
        <div
          key={f.id}
          className={`rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden ring-1 ${f.tone.ring}`}
          data-testid={`scale-${f.id}`}
        >
          <div className={`bg-gradient-to-br ${f.tone.from} ${f.tone.to} text-white p-4 flex items-center gap-3`}>
            <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <f.Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className={`font-display font-bold text-lg leading-tight ${isKh ? "font-khmer" : ""}`}>
                {isKh ? f.nameKh : f.nameEn}
              </div>
              <div className={`text-[11px] opacity-90 ${isKh ? "font-sans" : "font-khmer"}`}>
                {isKh ? f.nameEn : f.nameKh}
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? f.bodyKh : f.bodyEn}
            </p>
            <div className={`text-[11px] font-mono pt-3 border-t border-dashed border-slate-200 ${f.tone.chip} ${isKh ? "font-khmer" : ""}`}>
              ▸ {isKh ? f.exampleKh : f.exampleEn}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LuxuryToEveryday({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-100 via-white to-slate-100 border border-slate-300 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span className={`text-[10px] font-mono uppercase tracking-widest text-slate-600 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ការរំកិលប្រណិតទៅប្រចាំថ្ងៃ" : "Luxury → Everyday"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <LuxRow isKh={isKh} en="Mechanical clock" kh="នាឡិកាម៉ូឌែលចាស់" lux="1700: only kings" lukKh="១៧០០៖ មានតែស្ដេច" now="Today: every wrist" nowKh="សព្វថ្ងៃ៖ លើដៃគ្រប់គ្នា" />
        <LuxRow isKh={isKh} en="Automobile" kh="រថយន្ត" lux="1900: only the rich" lukKh="១៩០០៖ មានតែអ្នកមាន" now="Today: family transport" nowKh="សព្វថ្ងៃ៖ យានជំនិះគ្រួសារ" />
        <LuxRow isKh={isKh} en="Smartphone" kh="ទូរស័ព្ទស្មាត" lux="1995: bankers only" lukKh="១៩៩៥៖ មានតែជំនួញ" now="Today: students & farmers" nowKh="សព្វថ្ងៃ៖ សិស្ស និងកសិករ" />
      </div>

      <div className={`mt-4 flex items-start gap-2 text-xs text-slate-600 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <p>
          {isKh
            ? "នេះហើយជាមូលហេតុដែលការផលិតទ្រង់ទ្រាយធំ ជារឿងសំខាន់សម្រាប់ការអភិវឌ្ឍន៍សេដ្ឋកិច្ច៖ វាបង្វែរសុបិន្តរបស់ជំនាន់មុន ឱ្យក្លាយជាជីវភាពធម្មតារបស់យើងនៅថ្ងៃនេះ។"
            : "This is why mass production matters for economic development: it turns one generation's dreams into the next generation's everyday life."}
        </p>
      </div>
    </div>
  );
}

function LuxRow({
  isKh, en, kh, lux, lukKh, now, nowKh,
}: { isKh: boolean; en: string; kh: string; lux: string; lukKh: string; now: string; nowKh: string }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-3">
      <div className={`font-display font-bold text-slate-900 text-sm ${isKh ? "font-khmer" : ""}`}>
        {isKh ? kh : en}
      </div>
      <div className={`mt-2 text-[11px] text-slate-500 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? lukKh : lux}
      </div>
      <div className={`text-[11px] font-bold text-emerald-700 ${isKh ? "font-khmer" : ""}`}>
        ➜ {isKh ? nowKh : now}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative blueprint grid for hero
// ════════════════════════════════════════════════════════════════════════════

function BlueprintGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
      aria-hidden
    >
      <defs>
        <pattern id="grid-mp" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
        </pattern>
        <pattern id="grid-mp-major" width="160" height="160" patternUnits="userSpaceOnUse">
          <path d="M 160 0 L 0 0 0 160" fill="none" stroke="#fbbf24" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-mp)" />
      <rect width="100%" height="100%" fill="url(#grid-mp-major)" />
    </svg>
  );
}
