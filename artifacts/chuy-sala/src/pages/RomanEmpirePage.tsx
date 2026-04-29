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
  Hash,
  Plus,
  Minus,
  Calendar,
  Hand,
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

      {/* ── Section 4 · Lesson 4: Roman Numerals ──────────────────────── */}
      <Section
        spec="04"
        eyebrowEn="Lesson 4 · The math of the legions"
        eyebrowKh="មេរៀនទី ៤ · គណិតវិទ្យានៃកងទ័ពរ៉ូម៉ាំង"
        titleEn="Roman Numerals — The Language of Numbers"
        titleKh="លេខរ៉ូម៉ាំង — ភាសានៃលេខ"
        descEn="Modern numerals (1, 2, 3) are abstract — they don't look like the things they count. Roman numerals are the opposite: they are pictures of fingers and tally marks pressed onto wood and stone. Learn to read them, and you can read inscriptions, clock faces, and the year on the front of any old building."
        descKh="លេខទំនើប (១, ២, ៣) ជានាមធម៌ — ពួកវាមិនមើលទៅដូចជារបស់ដែលរាប់ឡើយ។ លេខរ៉ូម៉ាំងគឺផ្ទុយ៖ ពួកវាជារូបភាពនៃម្រាមដៃ និងសញ្ញារាប់ដែលឆ្លាក់លើឈើ និងថ្ម។ រៀនអានពួកវា ហើយអ្នកនឹងអាចអានឆ្លាក់ប្រវត្តិសាស្ត្រ មុខនាឡិកា និងឆ្នាំនៅលើផ្ទាំងអាគារចាស់ៗបាន។"
        isKh={isKh}
      >
        <RomanNumeralsLesson isKh={isKh} />
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

// ════════════════════════════════════════════════════════════════════════════
//  Section 4 · Lesson 4 — Roman Numerals: The Language of Numbers
//                        មេរៀនទី ៤ — លេខរ៉ូម៉ាំង៖ ភាសានៃលេខ
//
//  Bilingual rule: every heading, rule, and number definition shows BOTH
//  English and Khmer simultaneously (paired), regardless of language toggle.
//  Aesthetic: deep purple panels, gold/amber accents, marble-card feel,
//  serif "engraved" letterforms for the symbols themselves.
// ════════════════════════════════════════════════════════════════════════════

type RomanSymbol = {
  letter: string;
  value: number;
  valueLabel: string;
  originEn: string;
  originKh: string;
};

const ROMAN_SYMBOLS: RomanSymbol[] = [
  {
    letter: "I",
    value: 1,
    valueLabel: "1",
    originEn: "A single tally — one finger held up.",
    originKh: "សញ្ញារាប់មួយ — ម្រាមដៃមួយលើកឡើង។",
  },
  {
    letter: "V",
    value: 5,
    valueLabel: "5",
    originEn: "An open hand — the V-shape between thumb and fingers.",
    originKh: "បាតដៃចំហ — រូប V រវាងមេដៃ និងម្រាមដៃ។",
  },
  {
    letter: "X",
    value: 10,
    valueLabel: "10",
    originEn: "Two hands crossed — or two V-shapes stacked.",
    originKh: "ដៃពីរឆ្លងគ្នា — ឬរូប V ពីរត្រួតគ្នា។",
  },
  {
    letter: "L",
    value: 50,
    valueLabel: "50",
    originEn: "From an older symbol shaped like a bent angle.",
    originKh: "ពីនិមិត្តសញ្ញាចាស់រាងមុំពត់។",
  },
  {
    letter: "C",
    value: 100,
    valueLabel: "100",
    originEn: 'From the Latin word "centum" — meaning hundred.',
    originKh: "ពីពាក្យឡាតាំង “centum” — មានន័យថា មួយរយ។",
  },
  {
    letter: "D",
    value: 500,
    valueLabel: "500",
    originEn: "Half of an ancient symbol used for one thousand.",
    originKh: "ពាក់កណ្តាលនៃនិមិត្តសញ្ញាបុរាណ ដែលប្រើសម្រាប់មួយពាន់។",
  },
  {
    letter: "M",
    value: 1000,
    valueLabel: "1,000",
    originEn: 'From the Latin word "mille" — meaning thousand.',
    originKh: "ពីពាក្យឡាតាំង “mille” — មានន័យថា មួយពាន់។",
  },
];

function RomanNumeralsLesson({ isKh }: { isKh: boolean }) {
  return (
    <div data-testid="roman-numerals-lesson" className="space-y-5">
      <SevenSymbolsBlock isKh={isKh} />
      <TwoRulesBlock />
      <YearBreakdownBlock />
    </div>
  );
}

/* ── Sub 1 · The 7 Sacred Symbols ────────────────────────────────────── */
function SevenSymbolsBlock({ isKh }: { isKh: boolean }) {
  return (
    <article
      data-testid="roman-symbols-block"
      className={`rounded-2xl ${PURPLE_GRADIENT} text-white border-2 border-amber-300/60 shadow-lg overflow-hidden`}
    >
      <div className="px-5 sm:px-6 py-4 border-b border-amber-300/30 bg-black/20 flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center shadow">
          <Hash className="w-5 h-5" strokeWidth={2.75} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-200 mb-0.5">
            <span>Part 01 · The Symbols</span>
            <span className={`ml-2 ${isKh ? "" : ""} font-khmer normal-case tracking-normal text-[11px] text-amber-100/90`}>
              · ផ្នែក ០១ · និមិត្តសញ្ញា
            </span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl leading-snug">
            <span className="block">The 7 Sacred Symbols</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-amber-200 mt-1 leading-relaxed">
              និមិត្តសញ្ញាពិសិដ្ឋទាំង ៧
            </span>
          </h3>
        </div>
      </div>

      <div className="px-5 sm:px-6 py-4">
        <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
          The Roman number system uses just <strong className="text-amber-300">seven letters</strong>.
          Every other Roman number — no matter how large — is built by combining
          these. They were not invented at a desk: they grew out of{" "}
          <strong className="text-amber-300">tally marks on wood</strong> and{" "}
          <strong className="text-amber-300">hand signals</strong> used by
          shepherds and merchants long before Rome itself was a city.
        </p>
        <p className="font-khmer text-purple-100 leading-loose mt-3 border-t border-amber-300/20 pt-3">
          ប្រព័ន្ធលេខរ៉ូម៉ាំងប្រើ <strong className="text-amber-300">អក្សរតែ ៧</strong>{" "}
          ប៉ុណ្ណោះ។ លេខរ៉ូម៉ាំងផ្សេងទៀត — មិនថាធំប៉ុណ្ណាទេ — ត្រូវបានបង្កើតឡើងដោយការផ្សំអក្សរទាំងនេះ។ ពួកវាមិនបានបង្កើតនៅលើតុ៖ ពួកវាបានលូតលាស់ចេញពី{" "}
          <strong className="text-amber-300">សញ្ញារាប់នៅលើឈើ</strong> និង{" "}
          <strong className="text-amber-300">សញ្ញាដៃ</strong>{" "}
          ដែលប្រើដោយអ្នកគង្វាល និងពាណិជ្ជករ ជាយូរមកហើយមុនពេលរ៉ូមជាទីក្រុង។
        </p>

        <div
          data-testid="roman-symbols-grid"
          className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {ROMAN_SYMBOLS.map((s) => (
            <SymbolCard key={s.letter} symbol={s} />
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-amber-300/10 border border-amber-300/40 px-4 py-3 flex items-start gap-3">
          <Hand className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-50">
            <div>
              <strong className="text-amber-200">I, V, X are the body itself.</strong>{" "}
              One finger, an open palm, two crossed hands. The numbers were
              already on you before they were on stone.
            </div>
            <div className="font-khmer text-amber-100/90 leading-loose mt-2">
              <strong className="text-amber-200">I, V, X គឺជាខ្លួនឯងផ្ទាល់</strong>។
              ម្រាមដៃមួយ បាតដៃចំហ ដៃពីរឆ្លងគ្នា។ លេខទាំងនេះបានចារនៅលើខ្លួនអ្នក មុនពេលវាត្រូវបានចារនៅលើថ្ម។
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function SymbolCard({ symbol: s }: { symbol: RomanSymbol }) {
  return (
    <div
      data-testid={`roman-symbol-${s.letter}`}
      className="relative rounded-xl bg-stone-50 border border-amber-300/60 shadow-sm overflow-hidden flex flex-col"
    >
      <div className="bg-gradient-to-b from-stone-100 to-stone-50 px-3 py-3 border-b border-amber-300/40 flex items-baseline justify-between">
        <div className="font-display font-bold text-3xl sm:text-4xl text-purple-950 leading-none tracking-tight">
          {s.letter}
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-widest text-purple-700/70">
            value · តម្លៃ
          </div>
          <div className="font-display font-bold text-lg text-amber-700 leading-none">
            {s.valueLabel}
          </div>
        </div>
      </div>
      <div className="px-3 py-2.5 flex-1">
        <p className="text-[11px] sm:text-xs text-stone-700 leading-snug">
          {s.originEn}
        </p>
        <p className="font-khmer text-[11px] sm:text-xs text-stone-600 leading-relaxed mt-1.5 border-t border-stone-200 pt-1.5">
          {s.originKh}
        </p>
      </div>
    </div>
  );
}

/* ── Sub 2 · The Logic of the Script ─────────────────────────────────── */
function TwoRulesBlock() {
  return (
    <article
      data-testid="roman-rules-block"
      className={`rounded-2xl ${PURPLE_GRADIENT} text-white border-2 border-amber-300/60 shadow-lg overflow-hidden`}
    >
      <div className="px-5 sm:px-6 py-4 border-b border-amber-300/30 bg-black/20 flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center shadow">
          <ScrollText className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-200 mb-0.5">
            <span>Part 02 · The Two Golden Rules</span>
            <span className="ml-2 font-khmer normal-case tracking-normal text-[11px] text-amber-100/90">
              · ផ្នែក ០២ · វិន័យមាសទាំងពីរ
            </span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl leading-snug">
            <span className="block">The Logic of the Script</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-amber-200 mt-1 leading-relaxed">
              តក្កវិជ្ជានៃសំណេរ
            </span>
          </h3>
        </div>
      </div>

      <div className="px-5 sm:px-6 py-4">
        <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
          Once you know the seven letters, only{" "}
          <strong className="text-amber-300">two rules</strong> turn them into
          numbers. The Romans were practical engineers — they only had two,
          because two is enough.
        </p>
        <p className="font-khmer text-purple-100 leading-loose mt-3 border-t border-amber-300/20 pt-3">
          ពេលដែលអ្នកស្គាល់អក្សរទាំងប្រាំពីរហើយ មានតែ{" "}
          <strong className="text-amber-300">វិន័យពីរ</strong>{" "}
          ប៉ុណ្ណោះ ដែលប្ដូរពួកវាទៅជាលេខ។ រ៉ូម៉ាំងជាវិស្វករដែលជាក់ស្ដែង — ពួកគេមានតែពីរ ព្រោះពីរគឺគ្រប់គ្រាន់។
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleCard
            id="addition"
            tone="add"
            Icon={Plus}
            ruleNumber="1"
            titleEn="Rule 1 · Addition"
            titleKh="វិន័យទី ១ · ការបូក"
            ruleEn="When a smaller symbol comes AFTER a larger symbol, ADD them together."
            ruleKh="នៅពេលនិមិត្តសញ្ញាតូចជាង មកក្រោយ និមិត្តសញ្ញាធំជាង — បូកពួកវាជាមួយគ្នា។"
            example="VI"
            mathEn="V + I  =  5 + 1  =  6"
            mathKh="V + I  =  ៥ + ១  =  ៦"
          />
          <RuleCard
            id="subtraction"
            tone="sub"
            Icon={Minus}
            ruleNumber="2"
            titleEn="Rule 2 · Subtraction"
            titleKh="វិន័យទី ២ · ការដក"
            ruleEn="When a smaller symbol comes BEFORE a larger symbol, SUBTRACT it."
            ruleKh="នៅពេលនិមិត្តសញ្ញាតូចជាង មកមុន និមិត្តសញ្ញាធំជាង — ដកវាចេញ។"
            example="IV"
            mathEn="V − I  =  5 − 1  =  4"
            mathKh="V − I  =  ៥ − ១  =  ៤"
          />
        </div>

        <div className="mt-4 rounded-xl bg-purple-950/40 border border-amber-300/30 px-4 py-3">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-300 mb-1">
            Why subtract? · ហេតុអ្វីដក?
          </div>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
            Subtraction was a <strong className="text-amber-200">space-saving trick</strong>. Without it,
            "four" would have to be written <span className="font-mono text-amber-200">IIII</span>{" "}
            — four heavy chisel-strokes on stone. With the subtraction rule it
            becomes just <span className="font-mono text-amber-200">IV</span> — two strokes.
            Same idea for 9 (<span className="font-mono text-amber-200">IX</span>),
            40 (<span className="font-mono text-amber-200">XL</span>), and
            90 (<span className="font-mono text-amber-200">XC</span>).
          </p>
          <p className="font-khmer text-xs sm:text-sm text-purple-100 leading-loose mt-2">
            ការដកគឺជា <strong className="text-amber-200">ល្បិចសន្សំសំចៃកន្លែង</strong>។ បើគ្មានវាទេ លេខ "បួន" ត្រូវសរសេរជា{" "}
            <span className="font-mono text-amber-200">IIII</span> — ការឆ្លាក់បួនដងធ្ងន់ៗលើថ្ម។ ជាមួយវិន័យដក វាក្លាយជា{" "}
            <span className="font-mono text-amber-200">IV</span> — ឆ្លាក់តែពីរដង។ គំនិតដូចគ្នាសម្រាប់លេខ ៩{" "}
            (<span className="font-mono text-amber-200">IX</span>), ៤០{" "}
            (<span className="font-mono text-amber-200">XL</span>), និង ៩០{" "}
            (<span className="font-mono text-amber-200">XC</span>)។
          </p>
        </div>
      </div>
    </article>
  );
}

function RuleCard({
  id,
  tone,
  Icon,
  ruleNumber,
  titleEn,
  titleKh,
  ruleEn,
  ruleKh,
  example,
  mathEn,
  mathKh,
}: {
  id: string;
  tone: "add" | "sub";
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  ruleNumber: string;
  titleEn: string;
  titleKh: string;
  ruleEn: string;
  ruleKh: string;
  example: string;
  mathEn: string;
  mathKh: string;
}) {
  const accent =
    tone === "add"
      ? "border-emerald-300/70 bg-emerald-400/10"
      : "border-rose-300/70 bg-rose-400/10";
  const chip =
    tone === "add"
      ? "bg-emerald-400 text-emerald-950"
      : "bg-rose-400 text-rose-950";
  const accentText =
    tone === "add" ? "text-emerald-200" : "text-rose-200";
  return (
    <div
      data-testid={`roman-rule-${id}`}
      className={`rounded-xl border-2 ${accent} p-4 flex flex-col`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-8 h-8 rounded-lg ${chip} flex items-center justify-center font-display font-bold text-lg`}>
          {ruleNumber}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200">
            {titleEn}
          </div>
          <div className="font-khmer text-[11px] text-amber-100/90 leading-relaxed">
            {titleKh}
          </div>
        </div>
        <Icon className={`w-5 h-5 ${accentText}`} strokeWidth={2.75} />
      </div>
      <p className="text-sm text-white leading-relaxed">{ruleEn}</p>
      <p className="font-khmer text-sm text-purple-100 leading-loose mt-2 border-t border-white/10 pt-2">
        {ruleKh}
      </p>
      <div className="mt-3 rounded-lg bg-stone-50 text-purple-950 px-3 py-3 flex items-baseline justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-purple-700/70">
            example · ឧទាហរណ៍
          </div>
          <div className="font-display font-bold text-3xl sm:text-4xl leading-none tracking-tight">
            {example}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-sm text-stone-800">{mathEn}</div>
          <div className="font-khmer text-sm text-stone-700 mt-0.5">{mathKh}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub 3 · Reading the Year ────────────────────────────────────────── */
function YearBreakdownBlock() {
  // Current year breakdown — 2026 → MMXXVI
  const parts: { roman: string; value: string; en: string; kh: string }[] = [
    { roman: "M",  value: "1,000", en: "one thousand",  kh: "មួយពាន់" },
    { roman: "M",  value: "1,000", en: "one thousand",  kh: "មួយពាន់" },
    { roman: "X",  value: "10",    en: "ten",           kh: "ដប់" },
    { roman: "X",  value: "10",    en: "ten",           kh: "ដប់" },
    { roman: "V",  value: "5",     en: "five",          kh: "ប្រាំ" },
    { roman: "I",  value: "1",     en: "one",           kh: "មួយ" },
  ];
  return (
    <article
      data-testid="roman-year-block"
      className={`rounded-2xl ${PURPLE_GRADIENT} text-white border-2 border-amber-300/60 shadow-lg overflow-hidden`}
    >
      <div className="px-5 sm:px-6 py-4 border-b border-amber-300/30 bg-black/20 flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center shadow">
          <Calendar className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-200 mb-0.5">
            <span>Part 03 · Putting It Together</span>
            <span className="ml-2 font-khmer normal-case tracking-normal text-[11px] text-amber-100/90">
              · ផ្នែក ០៣ · ផ្គុំចូលគ្នា
            </span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl leading-snug">
            <span className="block">Reading the Year</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-amber-200 mt-1 leading-relaxed">
              ការអានឆ្នាំ
            </span>
          </h3>
        </div>
      </div>

      <div className="px-5 sm:px-6 py-5">
        <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
          Walk past any old church or government building and you will see a
          year carved over the door — written in Roman numerals. Let's read{" "}
          <strong className="text-amber-300">this year</strong> together.
        </p>
        <p className="font-khmer text-purple-100 leading-loose mt-3 border-t border-amber-300/20 pt-3">
          ដើរកាត់ព្រះវិហារចាស់ ឬអាគាររដ្ឋាភិបាលណាមួយ អ្នកនឹងឃើញឆ្នាំមួយឆ្លាក់នៅពីលើទ្វារ — សរសេរជាលេខរ៉ូម៉ាំង។ តោះអាន{" "}
          <strong className="text-amber-300">ឆ្នាំនេះ</strong>{" "}
          ជាមួយគ្នា។
        </p>

        {/* Big year carved on a stone-coloured tablet */}
        <div
          data-testid="roman-year-breakdown"
          className="mt-5 rounded-2xl bg-stone-50 text-purple-950 border-2 border-amber-300/70 shadow-inner px-4 sm:px-6 py-5"
        >
          <div className="text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-700/70 mb-1">
              The year · ឆ្នាំ
            </div>
            <div className="font-display font-extrabold text-5xl sm:text-6xl tracking-[0.15em] text-purple-950">
              MMXXVI
            </div>
            <div className="mt-1 font-mono text-xl sm:text-2xl font-bold text-amber-700">
              = 2026
            </div>
          </div>

          {/* Per-letter chips */}
          <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2">
            {parts.map((p, i) => (
              <div
                key={i}
                className="rounded-lg bg-white border border-purple-200 shadow-sm flex flex-col items-center py-2"
              >
                <div className="font-display font-bold text-2xl text-purple-950 leading-none">
                  {p.roman}
                </div>
                <div className="text-[10px] font-mono text-amber-700 mt-1">
                  = {p.value}
                </div>
                <div className="text-[10px] text-stone-600 mt-0.5">{p.en}</div>
                <div className="font-khmer text-[10px] text-stone-500 leading-relaxed">
                  {p.kh}
                </div>
              </div>
            ))}
          </div>

          {/* The math line */}
          <div className="mt-5 rounded-xl bg-purple-950 text-amber-100 px-4 py-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            <div className="whitespace-nowrap">
              <span className="text-amber-300 font-bold">MM</span>
              <span className="text-purple-300"> (1000+1000) </span>
              <span className="text-stone-400">+</span>
              <span className="text-amber-300 font-bold"> XX</span>
              <span className="text-purple-300"> (10+10) </span>
              <span className="text-stone-400">+</span>
              <span className="text-amber-300 font-bold"> VI</span>
              <span className="text-purple-300"> (5+1)</span>
            </div>
            <div className="whitespace-nowrap mt-1">
              <span className="text-stone-400">=</span>
              <span className="text-white font-bold"> 2000 + 20 + 6 </span>
              <span className="text-stone-400">=</span>
              <span className="text-amber-300 font-bold text-base sm:text-lg"> 2026</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-stone-800">
                  <strong>VI</strong> uses Rule 1 (addition): 5 + 1 = 6.
                </div>
                <div className="font-khmer text-stone-600 leading-relaxed mt-1">
                  <strong>VI</strong> ប្រើវិន័យទី ១ (ការបូក)៖ ៥ + ១ = ៦។
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-stone-800">
                  Two years ago (2024) was <strong>MMXXIV</strong> — same MM and XX, but the year ended with <strong>IV</strong> (5 − 1 = 4) using Rule 2.
                </div>
                <div className="font-khmer text-stone-600 leading-relaxed mt-1">
                  ពីរឆ្នាំមុន (២០២៤) គឺ <strong>MMXXIV</strong> — MM និង XX ដូចគ្នា ប៉ុន្តែឆ្នាំបញ្ចប់ដោយ <strong>IV</strong> (៥ − ១ = ៤) ដោយប្រើវិន័យទី ២។
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
