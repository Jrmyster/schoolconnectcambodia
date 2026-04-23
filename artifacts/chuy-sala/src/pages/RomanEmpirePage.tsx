import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Swords,
  Crown,
  ScrollText,
  Hammer,
  BookOpenCheck,
  Cross,
  Map as MapIcon,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  HIST-ROME · The Roman Empire: Rise, Rule, and Ruin
//             ចក្រភពរ៉ូម៖ ការកកើត ការគ្រប់គ្រង និងការដួលរលំ
//
//  1. Forging the Empire — republic, legions, roads, concrete
//  2. Prominent Emperors — Augustus, Trajan, Marcus Aurelius, Constantine
//  3. The Great Split — West collapses, East lives on for 1,000 years
//
//  Aesthetic: Classical Antiquity — marble whites, imperial purples,
//  warm gold accents, fluted-column motifs.
// ════════════════════════════════════════════════════════════════════════════

const PURPLE_GRADIENT =
  "bg-gradient-to-br from-[#2a1338] via-[#3d1c52] to-[#5a2a78]";

export default function RomanEmpirePage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50 text-stone-900">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header
        className={`relative overflow-hidden ${PURPLE_GRADIENT} text-white border-b-4 border-amber-400`}
      >
        <ColumnsBgPattern />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
          <Link
            href="/world-history"
            className={`inline-flex items-center gap-1.5 text-amber-200 hover:text-amber-100 text-sm mb-5 ${
              isKh ? "font-khmer" : ""
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅប្រវត្តិសាស្ត្រ" : "Back to World History"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-amber-300/15 backdrop-blur border border-amber-300/40 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-amber-200">
            <Swords className="w-3.5 h-3.5" />
            HIST-ROME · ANTIQUITY · EMPIRE
          </div>

          <h1
            className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl drop-shadow ${
              isKh ? "font-khmer leading-snug" : ""
            }`}
          >
            {isKh ? (
              <>
                ចក្រភពរ៉ូម —{" "}
                <span className="text-amber-300">
                  ការកកើត ការគ្រប់គ្រង និង​ការ​ដួល​រលំ
                </span>
              </>
            ) : (
              <>
                The Roman Empire —{" "}
                <span className="text-amber-300">Rise, Rule, and Ruin</span>
              </>
            )}
          </h1>

          <p
            className={`mt-4 max-w-2xl text-purple-100 text-sm sm:text-base ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "រ៉ូម​ចាប់​ផ្តើម​ជា​ភូមិ​តូច​មួយ​នៅ​លើ​ភ្នំ​ចំនួន​ប្រាំ​ពីរ — ហើយ​បាន​បញ្ចប់​ដោយ​គ្រប់​គ្រង​ពិភព​លោក​ដែល​គេ​ស្គាល់​ពាក់​កណ្តាល។ នេះ​ជា​រឿង​នៃ​អ្នក​វិស្វករ ​អ្នក​ច្បាប់ ​អធិរាជ ​និង​ពេល​វេលា ១,០០០ ឆ្នាំ​ដែល​បាន​បង្ខិត​ពិភព​លោក​ទំនើប។"
              : "Rome started as a tiny village on seven hills — and ended up ruling half the known world. This is the story of engineers, lawyers, emperors, and the 1,000-year stretch that quietly built the modern world."}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
            <Stat valueEn="753 BCE" labelEn="Rome founded (legend)" labelKh="រ៉ូម​បង្កើត (រឿង​ព្រេង)" isKh={isKh} />
            <Stat valueEn="400,000 km" labelEn="of paved Roman roads" labelKh="នៃ​ផ្លូវ​រ៉ូម​ដែល​បាន​សង់" isKh={isKh} />
            <Stat valueEn="1,453 CE" labelEn="Eastern half finally falls" labelKh="ផ្នែក​ខាង​កើត​ដួល​ចុង​ក្រោយ" isKh={isKh} />
          </div>
        </div>
      </header>

      {/* ── Section 1: Forging the Empire ─────────────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="Republic to superpower"
        eyebrowKh="សាធារណរដ្ឋ​ទៅ​ជា​មហាអំណាច"
        titleEn="Forging the Empire"
        titleKh="ការ​បង្កើត​ចក្រភព"
        descEn="Rome did not begin as an empire. For its first 500 years it was a republic — a city-state where elected senators argued in the forum. What turned that small republic into a world power was not luck. It was discipline in the army and brilliance in engineering: roads, aqueducts, and a new building material called concrete."
        descKh="រ៉ូម​មិន​បាន​ចាប់​ផ្តើម​ជា​ចក្រភព​ទេ។ សម្រាប់ ៥០០ ឆ្នាំ​ដំបូង វា​ជា​សាធារណរដ្ឋ — ទីក្រុង​មួយ​ដែល​ព្រឹទ្ធសភា​ដែល​បាន​បោះ​ឆ្នោត​ជជែក​គ្នា​នៅ​ក្នុង​សាលា​ប្រជុំ។ អ្វី​ដែល​ប្តូរ​សាធារណរដ្ឋ​តូច​នោះ​ឱ្យ​ក្លាយ​ជា​មហាអំណាច​ពិភព​លោក​មិន​មែន​សំណាង​ទេ។ វា​ជា​វិន័យ​ក្នុង​កងទ័ព និង​ភាព​អស្ចារ្យ​ក្នុង​វិស្វកម្ម៖ ផ្លូវ ​រណ​ផ្លូវ​ទឹក​ និង​សម្ភារៈ​សាងសង់​ថ្មី​ដែល​ហៅ​ថា​បេតុង។"
        isKh={isKh}
      >
        <ThreePillars isKh={isKh} />
        <RoadsHighlight isKh={isKh} />
      </Section>

      {/* ── Section 2: Prominent Emperors ─────────────────────────────── */}
      <Section
        spec="02"
        eyebrowEn="Four men who changed Rome"
        eyebrowKh="បុរស​បួន​នាក់​ដែល​ផ្លាស់​ប្តូរ​រ៉ូម"
        titleEn="Prominent Emperors"
        titleKh="អធិរាជ​លេច​ធ្លោ"
        descEn="Rome had over 70 emperors in 500 years. Four of them stand out — not because they wore the most jewels, but because each one bent the course of the empire decisively. Read them left to right: the Founder, the Conqueror, the Philosopher, and the Changer."
        descKh="រ៉ូម​មាន​អធិរាជ​ជាង ៧០ នាក់​ក្នុង​ពេល ៥០០ ឆ្នាំ។ បួន​នាក់​លេច​ធ្លោ — មិន​មែន​ដោយ​សារ​ពួក​គេ​ពាក់​គ្រឿង​អល្ង្ការ​ច្រើន​បំផុត​ទេ ប៉ុន្តែ​ដោយ​សារ​ម្នាក់​ៗ​បាន​បត់​ផ្លូវ​ចក្រភព​យ៉ាង​ខ្លាំង។ អាន​ពួក​គេ​ពី​ឆ្វេង​ទៅ​ស្តាំ៖ អ្នក​បង្កើត ​អ្នក​ឈ្នះ ​ទស្សន​វិទូ និង​អ្នក​ផ្លាស់​ប្តូរ។"
        isKh={isKh}
      >
        <EmperorScroller isKh={isKh} />
      </Section>

      {/* ── Section 3: The Great Split ────────────────────────────────── */}
      <Section
        spec="03"
        eyebrowEn="Too big to defend"
        eyebrowKh="ធំ​ពេក​ពិបាក​ការពារ"
        titleEn="The Great Split"
        titleKh="ការ​បំបែក​ដ៏​ធំ"
        descEn="By 395 CE, the empire stretched from Britain to Iraq. No single ruler in a horse-and-messenger world could defend a territory that vast against the tribes pressing at the borders. So the empire was officially split into two on the map — and the two halves had completely different fates."
        descKh="នៅ​ត្រឹម​ឆ្នាំ ៣៩៥ នៃ​គ្រិស្ត​សករាជ ចក្រភព​ដាក់​ខ្លួន​ពី​ប្រទេស​អង់គ្លេស​រហូត​ដល់​អ៊ីរ៉ាក់។ គ្មាន​អ្នក​ដឹក​នាំ​តែ​ម្នាក់​នៅ​ក្នុង​ពិភព​លោក​ដែល​ប្រើ​សេះ​និង​អ្នក​នាំ​សារ​អាច​ការពារ​ទឹក​ដី​ដ៏​ធំ​បែប​នោះ​ប្រឆាំង​នឹង​កុលសម្ព័ន្ធ​ដែល​សង្កត់​ព្រំ​ដែន​ឡើយ។ ដូច្នេះ ​ចក្រភព​ត្រូវ​បាន​បំបែក​ជា​ផ្លូវ​ការ​ជា​ពីរ​នៅ​លើ​ផែនទី — ហើយ​ផ្នែក​ទាំង​ពីរ​មាន​វាសនា​ខុស​គ្នា​ទាំង​ស្រុង។"
        isKh={isKh}
      >
        <SplitMap isKh={isKh} />
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/world-history"
          className={`inline-flex items-center gap-1.5 text-stone-500 hover:text-purple-800 text-sm ${
            isKh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅប្រវត្តិសាស្ត្រ" : "Back to World History"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout shell — Antiquity-themed: marble whites + gold accents
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  spec: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-purple-950 text-amber-300 rounded-sm px-2.5 py-0.5">
          SEC-{spec}
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-widest text-purple-800 ${
            isKh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-purple-950 mb-2 ${
          isKh ? "font-khmer leading-snug" : ""
        }`}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      <p
        className={`text-stone-700 text-sm sm:text-base mb-6 max-w-3xl ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Stat({
  valueEn, labelEn, labelKh, isKh,
}: { valueEn: string; labelEn: string; labelKh: string; isKh: boolean }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur border border-amber-300/30 px-3 py-2 flex flex-col">
      <div className="font-display font-bold text-2xl text-amber-300 leading-none">{valueEn}</div>
      <div className={`text-[11px] text-purple-100 mt-1 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? labelKh : labelEn}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · Three pillars + the 400,000 km roads highlight
// ════════════════════════════════════════════════════════════════════════════

function ThreePillars({ isKh }: { isKh: boolean }) {
  const pillars: {
    Icon: React.ComponentType<{ className?: string }>;
    titleEn: string; titleKh: string;
    bodyEn: string; bodyKh: string;
  }[] = [
    {
      Icon: ScrollText,
      titleEn: "1. The Republic",
      titleKh: "១. សាធារណរដ្ឋ",
      bodyEn: "509–27 BCE. Two consuls elected each year, a senate of 300, and the principle that no single man should hold all the power. Even the army was citizen-led. This was Rome's startup phase — small, scrappy, organised.",
      bodyKh: "៥០៩–២៧ មុន​គ.ស. កុងស៊ុល​ពីរ​នាក់​ត្រូវ​បាន​បោះ​ឆ្នោត​ជ្រើស​រើស​រៀង​រាល់​ឆ្នាំ ​ព្រឹទ្ធសភា​មាន ៣០០ នាក់ ​និង​គោល​ការណ៍​ថា​គ្មាន​បុរស​ណា​ម្នាក់​គួរ​មាន​អំណាច​ទាំង​អស់​ឡើយ។ សូម្បី​តែ​កងទ័ព​ក៏​ដឹក​នាំ​ដោយ​ពលរដ្ឋ​ដែរ។ នេះ​ជា​ដំណាក់​កាល​ចាប់​ផ្តើម​របស់​រ៉ូម — តូច ​រឹងមាំ ​មាន​ការ​រៀបចំ។",
    },
    {
      Icon: Swords,
      titleEn: "2. Iron discipline",
      titleKh: "២. វិន័យ​ដែក",
      bodyEn: "The Roman legion drilled like clockwork. 5,000 soldiers could march 30 km in a day, build a fortified camp every single night, and fight as one tortoise-shaped wall of shields the next morning. This is how a republic of farmers conquered the entire Mediterranean.",
      bodyKh: "កង​ល្បាន​រ៉ូម​ហ្វឹក​ហាត់​ដូច​នាឡិកា។ ទាហាន ៥,០០០ នាក់​អាច​ដើរ​បាន ៣០ គ.ម. ក្នុង​មួយ​ថ្ងៃ ​សង់​ជំរុំ​មាន​ការពារ​រៀង​រាល់​យប់ ​ហើយ​ច្បាំង​ដូច​ជា​ជញ្ជាំង​ខែល​រាង​អណ្តើក​នៅ​ព្រឹក​បន្ទាប់។ នេះ​ជា​របៀប​ដែល​សាធារណរដ្ឋ​នៃ​កសិករ​បាន​ឈ្នះ​លើ​មេឌីទែរ៉ាណេ​ទាំង​មូល។",
    },
    {
      Icon: Hammer,
      titleEn: "3. Civil engineering",
      titleKh: "៣. វិស្វកម្ម​ស៊ីវិល",
      bodyEn: "Romans invented opus caementicium — a concrete that hardens underwater and lasts 2,000 years. With it they built aqueducts that carried fresh water 90 km into a city, the Colosseum that held 50,000 spectators, and a harbour at Ostia that fed a million people.",
      bodyKh: "រ៉ូម​បាន​បង្កើត opus caementicium — បេតុង​ដែល​រឹង​នៅ​ក្នុង​ទឹក ហើយ​ស្ថិត​ស្ថេរ​បាន ២,០០០ ឆ្នាំ។ ដោយ​សារ​វា ពួក​គេ​បាន​សង់​រណ​ផ្លូវ​ទឹក​ដែល​នាំ​ទឹក​សុទ្ធ ៩០ គ.ម. ចូល​ក្នុង​ទីក្រុង ​ស្តាដ​កូលីស​ដែល​ផ្ទុក​អ្នក​មើល​បាន ៥០,០០០ នាក់ ​និង​កំពង់​ផែ​នៅ Ostia ​ដែល​ផ្គត់​ផ្គង់​អាហារ​ឱ្យ​មនុស្ស​មួយ​លាន​នាក់។",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {pillars.map((p, i) => (
        <div
          key={i}
          className="rounded-2xl border-2 border-purple-100 bg-white p-4 shadow-sm flex flex-col"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-700 to-purple-900 text-amber-300 flex items-center justify-center mb-3 shadow-sm">
            <p.Icon className="w-5 h-5" />
          </div>
          <h4
            className={`font-display font-bold text-purple-950 mb-1.5 ${
              isKh ? "font-khmer leading-snug" : ""
            }`}
          >
            {isKh ? p.titleKh : p.titleEn}
          </h4>
          <p
            className={`text-sm text-stone-700 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh ? p.bodyKh : p.bodyEn}
          </p>
        </div>
      ))}
    </div>
  );
}

function RoadsHighlight({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50 shadow-sm p-5 sm:p-7">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 items-center">
        <RoadsSVG />

        <div>
          <div
            className={`font-mono text-[10px] uppercase tracking-widest text-purple-800 mb-1 ${
              isKh ? "font-khmer normal-case tracking-normal" : ""
            }`}
          >
            {isKh ? "គន្លឹះ​សំខាន់" : "Key concept"}
          </div>
          <h3
            className={`font-display font-bold text-lg text-purple-950 mb-2 ${
              isKh ? "font-khmer leading-snug" : "leading-tight"
            }`}
          >
            {isKh
              ? "ផ្លូវ ៤០០,០០០ គ.ម. — ប្រព័ន្ធ​សរសៃ​ឈាម​នៃ​ចក្រភព"
              : "400,000 km of roads — the empire's bloodstream"}
          </h3>
          <p
            className={`text-sm text-stone-700 mb-3 ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "រ៉ូម​សង់​ផ្លូវ​មាន​ថ្ម​ល្អ​ៗ​ជាង ៤០០,០០០ គ.ម. — ច្រើន​ល្មម​អាច​ឆ្លង​ផែនដី​បាន ១០ ដង។ ផ្លូវ​ទាំង​នេះ​មិន​មែន​សម្រាប់​អ្នក​ទេសចរ​ទេ។ វា​ជា​មធ្យោបាយ​ដែល​កង​ល្បាន​អាច​មក​ដល់​ខេត្ត​ដាច់​ស្រយាល​ក្នុង​ពីរ​សប្តាហ៍ និង​ជា​មធ្យោបាយ​ដែល​ច្បាប់​រ៉ូម​ត្រូវ​បាន​អនុវត្ត​ភ្លាមៗ​ឆ្លង​កាត់​ផែនទី​ទាំង​មូល។ សុភាសិត​បរទេស​ថា «​ផ្លូវ​ទាំង​អស់​នាំ​ទៅ​រ៉ូម» គឺ​ពិត​តាម​ន័យ​ត្រង់។"
              : "Rome built more than 400,000 km of properly paved roads — enough to wrap around the planet ten times. These were not built for tourists. They were how a legion could reach a distant province in two weeks, and how Roman law was enforced instantly across the entire map. The proverb 'all roads lead to Rome' is literally true."}
          </p>
          <ul className="space-y-1.5 text-xs text-stone-700">
            <li className="flex gap-2">
              <span className="font-mono text-amber-600 flex-shrink-0">★</span>
              <span className={isKh ? "font-khmer leading-loose" : ""}>
                {isKh
                  ? "ស្រទាប់​បួន​៖ ខ្សាច់ ​ថ្ម​ធំ ​ក្រួស ​បន្ទះ​ថ្ម​រាប — នៅ​ប្រើ​បាន​សព្វ​ថ្ងៃ"
                  : "Four layers: sand, large stones, gravel, polished slabs — still usable today"}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-amber-600 flex-shrink-0">★</span>
              <span className={isKh ? "font-khmer leading-loose" : ""}>
                {isKh
                  ? "ផ្លូវ​មាន​ខ្លី​ប្រវែង ៤.៥ ម៉ែត្រ — ល្មម​សម្រាប់​រទេះ​សេះ​សង្គ្រាម​ពីរ​ឆ្លង​គ្នា"
                  : "Roads were 4.5 m wide — wide enough for two war chariots to pass"}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono text-amber-600 flex-shrink-0">★</span>
              <span className={isKh ? "font-khmer leading-loose" : ""}>
                {isKh
                  ? "សារ​សំខាន់​អាច​ធ្វើ​ដំណើរ​ពី​ទីក្រុង​រ៉ូម​ទៅ​ប្រទេស​អង់គ្លេស​ក្នុង​រយៈ​ពេល​តែ ៣៦ ថ្ងៃ​ប៉ុណ្ណោះ"
                  : "An urgent message could travel from Rome to Britain in just 36 days"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · Emperor profile cards (horizontal scroll on mobile, grid on md+)
// ════════════════════════════════════════════════════════════════════════════

type Emperor = {
  Icon: React.ComponentType<{ className?: string }>;
  nameEn: string; nameKh: string;
  epithetEn: string; epithetKh: string;
  reignEn: string; reignKh: string;
  bodyEn: string; bodyKh: string;
  factEn: string; factKh: string;
  accent: string; // tailwind gradient
  ribbonText: string; // gold ribbon abbr
};

const EMPERORS: Emperor[] = [
  {
    Icon: Crown,
    nameEn: "Augustus",
    nameKh: "អូហ្គូស្ទុស",
    epithetEn: "The First Emperor",
    epithetKh: "អធិរាជ​ដំបូង​បំផុត",
    reignEn: "27 BCE – 14 CE",
    reignKh: "២៧ មុន​គ.ស. – ១៤ គ.ស.",
    bodyEn: "Adopted son of Julius Caesar. He quietly ended the 500-year Republic and made himself the first emperor — without ever using the word 'king'. He then opened the Pax Romana, a 200-year stretch of relative peace across the entire Mediterranean.",
    bodyKh: "កូន​ចិញ្ចឹម​របស់ Julius Caesar។ គាត់​បាន​បញ្ចប់​សាធារណរដ្ឋ ៥០០ ឆ្នាំ​យ៉ាង​ស្ងាត់ ហើយ​ធ្វើ​ឱ្យ​ខ្លួន​ឯង​ក្លាយ​ជា​អធិរាជ​ដំបូង — ដោយ​មិន​ដែល​ប្រើ​ពាក្យ «ស្តេច» ឡើយ។ បន្ទាប់​មក គាត់​បាន​បើក​យុគ Pax Romana​ ​ដែល​ជា​សន្តិភាព ២០០ ឆ្នាំ​ឆ្លង​កាត់​មេឌីទែរ៉ាណេ​ទាំង​មូល។",
    factEn: "Pax Romana — 200 years of peace",
    factKh: "Pax Romana — សន្តិភាព ២០០ ឆ្នាំ",
    accent: "from-amber-500 to-amber-700",
    ribbonText: "I",
  },
  {
    Icon: Swords,
    nameEn: "Trajan",
    nameKh: "ត្រាចាន",
    epithetEn: "The Conqueror",
    epithetKh: "អ្នក​ឈ្នះ",
    reignEn: "98 – 117 CE",
    reignKh: "៩៨ – ១១៧ គ.ស.",
    bodyEn: "Born in Spain, Trajan was the first emperor from outside Italy. Under his rule the empire reached its absolute maximum size — from the Sahara Desert in the south to the Caspian Sea in the east. After him, the empire only ever shrank.",
    bodyKh: "កើត​នៅ​អេស្ប៉ាញ ត្រាចាន​ជា​អធិរាជ​ដំបូង​មក​ពី​ក្រៅ​ប្រទេស​អ៊ីតាលី។ ក្រោម​ការ​គ្រប់​គ្រង​របស់​គាត់ ​ចក្រភព​បាន​ឈាន​ដល់​ទំហំ​អតិបរមា — ​ពី​វាល​ខ្សាច់​សាហារ៉ា​នៅ​ខាង​ត្បូង រហូត​ដល់​សមុទ្រ​កាស្ពៀន​នៅ​ខាង​កើត។ បន្ទាប់​ពី​គាត់ ​ចក្រភព​មាន​តែ​តូច​ទៅ​ៗ​តែ​ប៉ុណ្ណោះ។",
    factEn: "Maximum territory — ~5 M km²",
    factKh: "ទឹកដី​អតិបរមា — ~៥ លាន គ.ម²",
    accent: "from-rose-500 to-rose-700",
    ribbonText: "II",
  },
  {
    Icon: BookOpenCheck,
    nameEn: "Marcus Aurelius",
    nameKh: "ម៉ាកុស អូរ៉េលៀស",
    epithetEn: "The Philosopher King",
    epithetKh: "ស្តេច​ទស្សន​វិទូ",
    reignEn: "161 – 180 CE",
    reignKh: "១៦១ – ១៨០ គ.ស.",
    bodyEn: "He ruled during the devastating Antonine Plague which killed 5 million people. At night, in his tent on the front lines, he wrote a private diary called Meditations — short reflections on calm, duty, and how to be a good person. It is still printed and read 1,800 years later.",
    bodyKh: "គាត់​បាន​គ្រប់​គ្រង​ក្នុង​អំឡុង​ពេល​ជំងឺ​រាតត្បាត Antonine ដែល​បាន​សម្លាប់​មនុស្ស ៥ លាន​នាក់។ នៅ​ពេល​យប់ ​នៅ​ក្នុង​តង់​របស់​គាត់​នៅ​មុខ​សមរ​ភូមិ ​គាត់​សរសេរ​សៀវភៅ​កំណត់​ហេតុ​ឯកជន​ឈ្មោះ Meditations — ការ​ឆ្លុះ​បញ្ចាំង​ខ្លី​ៗ​អំពី​ភាព​ស្ងប់ ​ភារកិច្ច ​និង​របៀប​ជា​មនុស្ស​ល្អ។ វា​នៅ​ត្រូវ​បាន​បោះ​ពុម្ព​និង​អាន ១,៨០០ ឆ្នាំ​ក្រោយ​មក។",
    factEn: "Wrote 'Meditations' — Stoic classic",
    factKh: "សរសេរ 'Meditations' — សៀវភៅ​ទស្សន​វិជ្ជា Stoic",
    accent: "from-purple-600 to-purple-900",
    ribbonText: "III",
  },
  {
    Icon: Cross,
    nameEn: "Constantine",
    nameKh: "កុងស្តង់ទីន",
    epithetEn: "The Changer",
    epithetKh: "អ្នក​ផ្លាស់​ប្តូរ",
    reignEn: "306 – 337 CE",
    reignKh: "៣០៦ – ៣៣៧ គ.ស.",
    bodyEn: "Constantine made two changes that reshaped Europe forever. First, in 313 CE he stopped the persecution of Christians and let them worship openly — within a century the empire was officially Christian. Second, he moved the capital from Rome itself to a brand-new city in the east called Constantinople — saving the eastern half for 1,000 more years.",
    bodyKh: "កុងស្តង់ទីន​បាន​ធ្វើ​ការ​ផ្លាស់​ប្តូរ​ពីរ​ដែល​បាន​ប្តូរ​ទម្រង់​អឺរ៉ុប​ជា​រៀង​រហូត។ ទីមួយ ​នៅ​ឆ្នាំ ៣១៣ គ.ស. ​គាត់​បាន​បញ្ឈប់​ការ​ធ្វើ​ទុក្ខ​បុក​ម្នេញ​លើ​គ្រិស្តសាសនិក ហើយ​អនុញ្ញាត​ឱ្យ​ពួក​គេ​ថ្វាយ​បង្គំ​ដោយ​ចំ​ហ — ក្នុង​រយៈ​ពេល​មួយ​សតវត្ស ​ចក្រភព​ជា​ផ្លូវ​ការ​ក្លាយ​ជា​គ្រិស្ត​សាសនា។ ទីពីរ ​គាត់​បាន​ផ្លាស់​ទីរាជធានី​ពី​រ៉ូម​ផ្ទាល់​ទៅ​ទីក្រុង​ថ្មី​មួយ​នៅ​ខាង​កើត​ឈ្មោះ​ថា​កុងស្តង់ទីណូបល — សង្គ្រោះ​ផ្នែក​ខាង​កើត​បាន​មួយ​ពាន់​ឆ្នាំ​ទៀត។",
    factEn: "Legalised Christianity · moved capital",
    factKh: "ធ្វើ​ឱ្យ​គ្រិស្ត​សាសនា​ស្រប​ច្បាប់ · ផ្លាស់​រាជធានី",
    accent: "from-emerald-600 to-emerald-900",
    ribbonText: "IV",
  },
];

function EmperorScroller({ isKh }: { isKh: boolean }) {
  return (
    <div className="-mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0 overflow-x-auto lg:overflow-visible">
      <div className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[55%] lg:grid-flow-row lg:auto-cols-auto lg:grid-cols-2 xl:grid-cols-4 gap-4 pb-3 lg:pb-0">
        {EMPERORS.map((e, i) => (
          <EmperorCard key={i} emperor={e} isKh={isKh} />
        ))}
      </div>
    </div>
  );
}

function EmperorCard({ emperor: e, isKh }: { emperor: Emperor; isKh: boolean }) {
  return (
    <article className="relative rounded-2xl border-2 border-purple-100 bg-white shadow-sm overflow-hidden flex flex-col">
      {/* Marble bust panel */}
      <div className={`relative bg-gradient-to-br ${e.accent} text-white p-5 flex items-center gap-3`}>
        <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center shadow-sm flex-shrink-0">
          <e.Icon className="w-6 h-6 text-amber-200" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`font-display font-bold text-lg leading-tight ${isKh ? "font-khmer" : ""}`}>
            {isKh ? e.nameKh : e.nameEn}
          </div>
          <div className={`text-[11px] text-amber-100 ${isKh ? "font-khmer" : "font-mono uppercase tracking-widest"}`}>
            {isKh ? e.reignKh : e.reignEn}
          </div>
        </div>
        {/* Roman numeral ribbon */}
        <div className="absolute top-2 right-2 font-display font-bold text-amber-300/90 text-xl drop-shadow-sm select-none pointer-events-none">
          {e.ribbonText}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div
          className={`font-mono text-[10px] uppercase tracking-widest text-purple-800 mb-1 ${
            isKh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {isKh ? e.epithetKh : e.epithetEn}
        </div>
        <p
          className={`text-sm text-stone-700 mb-3 flex-1 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh ? e.bodyKh : e.bodyEn}
        </p>

        {/* Gold key-fact strip */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 flex items-center gap-2 text-xs text-amber-900">
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
          <span className={`font-medium ${isKh ? "font-khmer" : ""}`}>
            {isKh ? e.factKh : e.factEn}
          </span>
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · The Great Split — West collapses, East endures 1,000 years
// ════════════════════════════════════════════════════════════════════════════

function SplitMap({ isKh }: { isKh: boolean }) {
  return (
    <>
      {/* Banner */}
      <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/60 px-5 py-4 flex gap-3 items-start">
        <AlertTriangle className="w-5 h-5 text-purple-800 flex-shrink-0 mt-0.5" />
        <p
          className={`text-sm text-purple-950 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "នៅ​ឆ្នាំ ៣៩៥ គ.ស. ​អធិរាជ​ Theodosius ​បាន​បំបែក​ចក្រភព​ជា​ផ្លូវ​ការ​ជា​ពីរ — ប្រគល់​ផ្នែក​ខាង​លិច​ឱ្យ​កូន​ប្រុស​ម្នាក់ និង​ផ្នែក​ខាង​កើត​ឱ្យ​កូន​ប្រុស​ម្នាក់​ទៀត។ ពួក​គេ​មិន​បាន​បង្រួប​បង្រួម​ជា​ថ្មី​ឡើយ។"
            : "In 395 CE, Emperor Theodosius officially split the empire in two — handing the western half to one son and the eastern half to the other. They were never reunited."}
        </p>
      </div>

      {/* Two-half comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WEST */}
        <div className="rounded-2xl overflow-hidden border-2 border-stone-300 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900 text-stone-100 p-5">
            <div className="flex items-center gap-2 mb-1">
              <MapIcon className="w-4 h-4 text-amber-300" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">WEST</span>
            </div>
            <h3 className={`font-display font-bold text-xl ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ចក្រភព​រ៉ូម​ខាង​លិច" : "Western Roman Empire"}
            </h3>
            <div className={`text-stone-300 text-sm mt-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "រាជធានី​៖ រ៉ូម" : "Capital: Rome"}
            </div>
          </div>
          <div className="p-5">
            <div className={`text-sm text-stone-700 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "កុលសម្ព័ន្ធ Visigoth បាន​ចូល​លុក​លុយ​រ៉ូម​នៅ​ឆ្នាំ ៤១០។ នៅ​ឆ្នាំ ៤៧៦ គ.ស. ​អធិរាជ​ខាង​លិច​ចុង​ក្រោយ​បំផុត ​Romulus Augustulus ​ក្មេង​ប្រុស​អាយុ ១៦ ឆ្នាំ ​ត្រូវ​បាន​បណ្តេញ​ចេញ​ដោយ​មេ​ដឹក​នាំ​អាល្លឺម៉ង់។ ផ្នែក​ខាង​លិច​ដួល​រលំ​ចូល​ទៅ​ក្នុង​អ្វី​ដែល​អ្នក​ប្រវត្តិវិទូ​ហៅ​ថា «យុគ​ងងឹត»។"
                : "The Visigoth tribes sacked Rome itself in 410. By 476 CE, the last western emperor — a 16-year-old boy named Romulus Augustulus — was deposed by a Germanic chieftain. The west collapsed into what historians call the 'Dark Ages'."}
            </div>
            <FateRow
              eyebrowEn="Survived"
              eyebrowKh="រស់​បាន"
              valueEn="~80 years after the split"
              valueKh="~៨០ ឆ្នាំ​បន្ទាប់​ពី​ការ​បំបែក"
              tone="stone"
              isKh={isKh}
            />
            <FateRow
              eyebrowEn="Outcome"
              eyebrowKh="លទ្ធផល"
              valueEn="Collapsed → fragmented kingdoms"
              valueKh="ដួល​រលំ → អាណាចក្រ​បែក​បាក់"
              tone="stone"
              isKh={isKh}
            />
          </div>
        </div>

        {/* EAST */}
        <div className="rounded-2xl overflow-hidden border-2 border-amber-300 bg-white shadow-sm">
          <div className={`${PURPLE_GRADIENT} text-white p-5`}>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-amber-300" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">EAST</span>
            </div>
            <h3 className={`font-display font-bold text-xl ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ចក្រភព​បីហ្សង់ទីន (រ៉ូម​ខាង​កើត)" : "Byzantine Empire (East Rome)"}
            </h3>
            <div className={`text-purple-200 text-sm mt-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "រាជធានី​៖ កុងស្តង់ទីណូបល" : "Capital: Constantinople"}
            </div>
          </div>
          <div className="p-5">
            <div className={`text-sm text-stone-700 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh
                ? "ផ្នែក​ខាង​កើត​មាន​ភាព​ងាយ​ការពារ​ជាង — ​កុងស្តង់ទីណូបល​ឈរ​នៅ​ចំ​កណ្តាល​ផ្លូវ​ពាណិជ្ជកម្ម​ឆ្លង​កាត់​អាស៊ី និង​អឺរ៉ុប ហើយ​មាន​ជញ្ជាំង​ដ៏​អស្ចារ្យ​បីជាន់។ វា​នៅ​តែ​មាន​ភាព​ស្តុកស្តម្ភ ​មាន​ច្បាប់​ដ៏​ទំនើប (Justinian Code) និង​សាសនា​គ្រិស្ត​ពួក Orthodox រហូត​ដល់​ឆ្នាំ ១,៤៥៣ គ.ស. — ច្រើន​ជាង​មួយ​ពាន់​ឆ្នាំ​បន្ទាប់​ពី​ផ្នែក​ខាង​លិច​ដួល​រលំ។"
                : "The east was easier to defend — Constantinople sat at the centre of trade routes between Asia and Europe and had triple walls. It stayed wealthy, with a modern legal code (the Justinian Code) and Orthodox Christianity, until 1,453 CE — more than a thousand years after the western half fell."}
            </div>
            <FateRow
              eyebrowEn="Survived"
              eyebrowKh="រស់​បាន"
              valueEn="~1,058 years after the split"
              valueKh="~១,០៥៨ ឆ្នាំ​បន្ទាប់​ពី​ការ​បំបែក"
              tone="amber"
              isKh={isKh}
            />
            <FateRow
              eyebrowEn="Outcome"
              eyebrowKh="លទ្ធផល"
              valueEn="Endured → Byzantine golden age"
              valueKh="នៅ​ស្ថិត​ស្ថេរ → យុគ​មាស​បីហ្សង់ទីន"
              tone="amber"
              isKh={isKh}
            />
          </div>
        </div>
      </div>

      {/* Closing takeaway */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex gap-3 items-start">
        <CheckCircle2 className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <p
          className={`text-sm text-amber-900 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ដូច្នេះ ​នៅ​ពេល​មនុស្ស​និយាយ​ថា «រ៉ូម​ដួល​រលំ​នៅ​ឆ្នាំ ៤៧៦ ​គ.ស.» នោះ​គឺ​មាន​តែ​ផ្នែក​ខាង​លិច​ប៉ុណ្ណោះ។ ផ្នែក​ខាង​កើត — ​បីហ្សង់ទីន — បាន​បន្ត​ការ​ពារ​បេតិកភណ្ឌ​រ៉ូម ​ទស្សន​វិជ្ជា​ក្រិក និង​សាសនា​គ្រិស្ត​អស់​មួយ​ពាន់​ឆ្នាំ​ទៀត​មុន​នឹង​ដួល​រលំ​ដោយ​ដៃ​អូតូម៉ង់។"
            : "So when people say 'Rome fell in 476 CE', they only mean the western half. The eastern half — Byzantium — kept Roman heritage, Greek philosophy, and Christianity alive for another thousand years before finally falling to the Ottomans."}
        </p>
      </div>
    </>
  );
}

function FateRow({
  eyebrowEn, eyebrowKh, valueEn, valueKh, tone, isKh,
}: {
  eyebrowEn: string; eyebrowKh: string;
  valueEn: string; valueKh: string;
  tone: "stone" | "amber";
  isKh: boolean;
}) {
  const labelCls =
    tone === "amber" ? "text-amber-700" : "text-stone-500";
  const arrowCls =
    tone === "amber" ? "text-amber-600" : "text-stone-400";
  return (
    <div className="flex items-baseline gap-2 py-1.5 border-t border-stone-100 first:border-t-0">
      <ArrowRight className={`w-3 h-3 flex-shrink-0 ${arrowCls}`} />
      <span
        className={`font-mono text-[10px] uppercase tracking-widest ${labelCls} flex-shrink-0 ${
          isKh ? "font-khmer normal-case tracking-normal" : ""
        }`}
      >
        {isKh ? eyebrowKh : eyebrowEn}:
      </span>
      <span className={`text-sm text-stone-800 font-medium ${isKh ? "font-khmer" : ""}`}>
        {isKh ? valueKh : valueEn}
      </span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative SVGs — Classical-Antiquity flavour, no third-party assets
// ════════════════════════════════════════════════════════════════════════════

function ColumnsBgPattern() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.10]"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 600 240"
    >
      {/* A row of fluted columns */}
      <g fill="white">
        {[40, 130, 220, 310, 400, 490].map((x) => (
          <g key={x}>
            {/* Capital */}
            <rect x={x - 18} y="40" width="36" height="6" rx="1" />
            <rect x={x - 22} y="46" width="44" height="4" rx="1" />
            {/* Shaft */}
            <rect x={x - 12} y="52" width="24" height="140" />
            {/* Flutes (vertical lines) */}
            <rect x={x - 8} y="54" width="2" height="136" fillOpacity="0.4" />
            <rect x={x - 2} y="54" width="2" height="136" fillOpacity="0.4" />
            <rect x={x + 4} y="54" width="2" height="136" fillOpacity="0.4" />
            {/* Base */}
            <rect x={x - 16} y="194" width="32" height="6" rx="1" />
            <rect x={x - 20} y="200" width="40" height="6" rx="1" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function RoadsSVG() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 180"
      className="w-full max-w-[260px] mx-auto drop-shadow-sm"
    >
      <defs>
        <linearGradient id="rmRoad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fcd34d" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Sun-faded map base */}
      <rect x="0" y="0" width="220" height="180" rx="14" fill="#fef3c7" />
      {/* Mediterranean blob */}
      <path
        d="M30,110 C60,90 100,130 140,100 C170,80 190,110 200,130 L200,160 L20,160 Z"
        fill="#bae6fd"
        opacity="0.7"
      />
      {/* Roman roads radiating from a central point */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x2 = 110 + Math.cos(rad) * 90;
        const y2 = 70 + Math.sin(rad) * 60;
        return (
          <line
            key={deg}
            x1="110"
            y1="70"
            x2={x2}
            y2={y2}
            stroke="url(#rmRoad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })}
      {/* Rome dot */}
      <circle cx="110" cy="70" r="6" fill="#7c2d12" stroke="white" strokeWidth="2" />
      <text
        x="110"
        y="58"
        textAnchor="middle"
        fontSize="10"
        fill="#7c2d12"
        fontFamily="ui-monospace, monospace"
        fontWeight="700"
      >
        ROMA
      </text>
    </svg>
  );
}
