import { Link } from "wouter";
import {
  ArrowLeft,
  Lock,
  Eye,
  Quote,
  Map as MapIcon,
  Mountain,
  ArrowRight,
  Leaf,
  PersonStanding,
  Sparkles,
  Info,
  Scale,
  User,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  PHIL-02 · Language & Reality: Escaping the 'Is' Trap
//            ភាសា និងការពិត៖ ការគេចចេញពីអន្ទាក់នៃពាក្យ 'គឺ'
//
//  1. The Two Systems of Thought  (Aristotelian vs Non-Aristotelian)
//  2. The Translation Matrix      (Before & After cards)
//
//  Aesthetic: Calm philosophical paper-and-ink — warm bone background,
//  amber/stone for the rigid Aristotelian side, teal/cyan flowing-water
//  for the Non-Aristotelian side.
// ════════════════════════════════════════════════════════════════════════════

export default function LanguageRealityPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* ── Header / Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-teal-950 text-stone-100 border-b-4 border-teal-500/40">
        <PaperGrainBg />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-stone-400 hover:text-teal-300 text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-400/40 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-teal-300">
            <Scale className="w-3.5 h-3.5" />
            PHIL-02 · GENERAL SEMANTICS
          </div>

          <h1
            className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl ${isKh ? "font-khmer leading-snug" : ""}`}
          >
            {isKh ? (
              <>
                ភាសា និងការពិត —{" "}
                <span className="text-teal-300">ការគេចចេញពីអន្ទាក់នៃពាក្យ 'គឺ'</span>
              </>
            ) : (
              <>
                Language &amp; Reality —{" "}
                <span className="text-teal-300">Escaping the 'Is' Trap</span>
              </>
            )}
          </h1>

          <p className={`mt-4 max-w-2xl text-stone-300 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ពាក្យតូចៗមួយចំនួនអាចចាក់សោរការគិតរបស់យើងឱ្យនៅក្នុងទ្រុង។ ពាក្យ 'គឺ' អាចប្រែពីការសង្កេតមួយដ៏រស់រវើក ទៅជាការវិនិច្ឆ័យដ៏អស់កល្ប។ តោះរៀនរបៀបបើកសោនោះ។"
              : "A few small words can lock our thinking inside cages. The word 'is' can turn a living observation into an eternal verdict. Let's learn how to unlock that cage."}
          </p>

          {/* Map ≠ Territory pull-quote */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl bg-stone-950/40 border border-teal-400/30 px-4 py-2.5">
            <MapIcon className="w-4 h-4 text-teal-300" />
            <span className="text-stone-400 text-xs">≠</span>
            <Mountain className="w-4 h-4 text-amber-300" />
            <span className={`text-xs sm:text-sm text-stone-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ផែនទីមិនមែនជាទឹកដី" : "The map is not the territory"}
              <span className="text-stone-500"> · Korzybski (1933)</span>
            </span>
          </div>
        </div>
      </header>

      {/* ── Section 1: The Two Systems of Thought ────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="The Two Systems of Thought"
        eyebrowKh="ប្រព័ន្ធគំនិតទាំងពីរ"
        titleEn="Two ways to wear the spectacles of language"
        titleKh="មធ្យោបាយពីរយ៉ាងសម្រាប់ពាក់វ៉ែនតានៃភាសា"
        descEn="Every sentence we speak runs through one of two engines. The first one stamps things with permanent labels. The second one watches the world breathing and changing. Aristotle gave us the first engine 2,300 years ago. A Polish-American thinker named Alfred Korzybski offered an alternative in 1933."
        descKh="ប្រយោគនីមួយៗដែលយើងនិយាយ ដំណើរការតាមម៉ាស៊ីនមួយក្នុងចំណោមពីរ។ ម៉ាស៊ីនទីមួយបោះត្រាស្លាកអចិន្ត្រៃយ៍ទៅលើវត្ថុ។ ម៉ាស៊ីនទីពីរសង្កេតពិភពលោកដែលដកដង្ហើម និងផ្លាស់ប្តូរ។ លោក Aristotle បានផ្ដល់ម៉ាស៊ីនទីមួយឱ្យយើងកាលពី ២,៣០០ ឆ្នាំមុន។ អ្នកគិតប៉ូឡូញ-អាមេរិកម្នាក់ឈ្មោះ Alfred Korzybski បានស្នើជម្រើសមួយក្នុងឆ្នាំ ១៩៣៣។"
        isKh={isKh}
      >
        <TwoSystems isKh={isKh} />
      </Section>

      {/* ── Section 2: The Translation Matrix ─────────────────────────── */}
      <Section
        spec="02"
        eyebrowEn="The Translation Matrix"
        eyebrowKh="ម៉ាទ្រីសបកប្រែ"
        titleEn="From locked sentences to honest observations"
        titleKh="ពីប្រយោគដែលត្រូវចាក់សោ ទៅជាការសង្កេតដ៏ស្មោះត្រង់"
        descEn="Below are three everyday sentences. Read the left column out loud and notice how each one feels final, like a verdict from a courtroom. Then read the right column and feel how it softens — there is now room for tomorrow to be different."
        descKh="ខាងក្រោមនេះគឺជាប្រយោគទាំងបីនៃជីវិតប្រចាំថ្ងៃ។ សូមអានជួរឆ្វេងឱ្យឮ ហើយកត់សម្គាល់ថាប្រយោគនីមួយៗមានអារម្មណ៍ដូចចុងបញ្ចប់ ដូចសេចក្តីសម្រេចពីសាលាក្តី។ បន្ទាប់មកអានជួរស្តាំ ហើយមានអារម្មណ៍ថាវាទន់ភ្លន់ឡើង — ឥឡូវនេះមានកន្លែងសម្រាប់ថ្ងៃស្អែកដែលអាចខុសគ្នា។"
        isKh={isKh}
      >
        <TranslationMatrix isKh={isKh} />
        <TryItYourself isKh={isKh} />
      </Section>

      {/* ── Footer breadcrumb ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-stone-500 hover:text-teal-700 text-sm ${isKh ? "font-khmer" : ""}`}
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
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-teal-500/10 text-teal-700 rounded-sm px-2.5 py-0.5 border border-teal-500/30">
          SEC-{spec}
        </span>
        <span className={`text-xs font-bold uppercase tracking-widest text-teal-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-stone-900 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-stone-600 text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · Two Systems side-by-side
// ════════════════════════════════════════════════════════════════════════════

function TwoSystems({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Aristotelian */}
      <SystemCard
        side="aristotelian"
        Icon={Lock}
        labelEn="ARISTOTELIAN LANGUAGE"
        labelKh="ភាសាអារីស្តូត"
        sinceEn="Since ~350 BCE"
        sinceKh="តាំងពីប្រហែល ៣៥០ មុន គ.ស."
        titleEn="Absolute Identity — the world is locked"
        titleKh="អត្តសញ្ញាណដាច់ខាត — ពិភពត្រូវបានចាក់សោ"
        bodyEn="Built around the verb 'is'. It stamps every thing into a permanent box: 'A is A — and that is the end of it.' The map is the territory. What we say about a thing IS the thing."
        bodyKh="សាងសង់ឡើងដោយប្រើពាក្យ 'គឺ'។ វាបោះត្រាគ្រប់របស់ទៅក្នុងប្រអប់អចិន្ត្រៃយ៍៖ «A គឺ A — ហើយនោះគឺជាទីបញ្ចប់»។ ផែនទីគឺជាទឹកដី។ អ្វីដែលយើងនិយាយអំពីរបស់មួយ គឺជារបស់នោះ។"
        traits={[
          { en: "The verb 'to be' (is, are, was, will be)", kh: "កិរិយាសព្ទ 'គឺ' (គឺ ជា បាន នឹង)" },
          { en: "Permanent categories & labels", kh: "ប្រភេទ និងស្លាកអចិន្ត្រៃយ៍" },
          { en: "Either/or, true/false, this/that", kh: "មួយឬមួយ ពិតឬមិនពិត នេះឬនោះ" },
          { en: "Map = Territory (no gap)", kh: "ផែនទី = ទឹកដី (គ្មានចន្លោះ)" },
        ]}
        sample={{ en: "Sophea is angry.", kh: "សុភា គឺ ខឹង។" }}
        accent="amber"
        isKh={isKh}
      />

      {/* Non-Aristotelian */}
      <SystemCard
        side="non-aristotelian"
        Icon={Eye}
        labelEn="NON-ARISTOTELIAN LANGUAGE"
        labelKh="ភាសាមិនមែនអារីស្តូត"
        sinceEn="Korzybski · 1933 — General Semantics"
        sinceKh="Korzybski · ១៩៣៣ — អត្ថន័យវិទ្យាទូទៅ"
        titleEn="Observation & Change — the world is flowing"
        titleKh="ការសង្កេត និងការផ្លាស់ប្តូរ — ពិភពកំពុងហូរ"
        bodyEn="Removes the 'is of identity' (a writing practice called E-Prime) and replaces it with action verbs, perspectives, and time. It remembers that the map is not the territory — our words are only one drawing of an ever-changing world."
        bodyKh="លុបចោល 'គឺនៃអត្តសញ្ញាណ' (ការអនុវត្តសរសេរហៅថា E-Prime) ហើយជំនួសវាដោយកិរិយាសព្ទសកម្ម ទស្សនវិស័យ និងពេលវេលា។ វាចងចាំថាផែនទីមិនមែនជាទឹកដី — ពាក្យរបស់យើងគ្រាន់តែជាគំនូរមួយនៃពិភពលោកដែលផ្លាស់ប្តូរជានិច្ច។"
        traits={[
          { en: "Action verbs (does, appears, seems)", kh: "កិរិយាសព្ទសកម្ម (ធ្វើ មើលទៅ ហាក់ដូចជា)" },
          { en: "Time-stamped & person-stamped", kh: "បោះត្រាពេលវេលា និងបុគ្គល" },
          { en: "Both/and, degrees, perspectives", kh: "ទាំងពីរ កម្រិត ទស្សនវិស័យ" },
          { en: "Map ≠ Territory (always a gap)", kh: "ផែនទី ≠ ទឹកដី (តែងតែមានចន្លោះ)" },
        ]}
        sample={{ en: "Sophea seems angry to me right now.", kh: "សុភា មើលទៅខឹងនឹងខ្ញុំនៅពេលនេះ។" }}
        accent="teal"
        isKh={isKh}
      />
    </div>
  );
}

function SystemCard({
  side, Icon, labelEn, labelKh, sinceEn, sinceKh, titleEn, titleKh, bodyEn, bodyKh,
  traits, sample, accent, isKh,
}: {
  side: "aristotelian" | "non-aristotelian";
  Icon: React.ComponentType<{ className?: string }>;
  labelEn: string; labelKh: string;
  sinceEn: string; sinceKh: string;
  titleEn: string; titleKh: string;
  bodyEn: string; bodyKh: string;
  traits: { en: string; kh: string }[];
  sample: { en: string; kh: string };
  accent: "amber" | "teal";
  isKh: boolean;
}) {
  const a =
    accent === "amber"
      ? {
          ring: "ring-amber-400/40",
          border: "border-amber-300/70",
          bg: "bg-amber-50",
          chipBg: "bg-amber-100",
          chipText: "text-amber-800",
          accent: "text-amber-700",
          hex: "bg-amber-600",
          rule: "border-amber-200",
          sampleBg: "bg-amber-100/70 border-amber-300",
        }
      : {
          ring: "ring-teal-400/40",
          border: "border-teal-300/70",
          bg: "bg-teal-50",
          chipBg: "bg-teal-100",
          chipText: "text-teal-800",
          accent: "text-teal-700",
          hex: "bg-teal-600",
          rule: "border-teal-200",
          sampleBg: "bg-teal-100/70 border-teal-300",
        };

  return (
    <div className={`rounded-2xl ${a.bg} border-2 ${a.border} ring-1 ${a.ring} overflow-hidden flex flex-col`} data-testid={`system-${side}`}>
      {/* Top label band */}
      <div className={`px-4 py-2.5 ${a.chipBg} border-b ${a.rule} flex items-center gap-2.5`}>
        <div className={`w-9 h-9 rounded-lg ${a.hex} text-white flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`font-mono text-[10px] tracking-widest ${a.chipText} ${isKh ? "font-khmer normal-case tracking-normal" : "uppercase"}`}>
            {isKh ? labelKh : labelEn}
          </div>
          <div className={`text-[11px] ${a.accent}/80 ${isKh ? "font-khmer" : "font-mono"}`}>
            {isKh ? sinceKh : sinceEn}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        <h3 className={`font-display font-bold text-lg text-stone-900 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}>
          {isKh ? titleKh : titleEn}
        </h3>
        <p className={`text-sm text-stone-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? bodyKh : bodyEn}
        </p>

        {/* Traits */}
        <ul className="space-y-1.5 mt-1">
          {traits.map((t, i) => (
            <li key={i} className={`flex items-start gap-2 text-xs text-stone-700 ${isKh ? "font-khmer leading-loose" : ""}`}>
              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.hex}`} />
              <span>{isKh ? t.kh : t.en}</span>
            </li>
          ))}
        </ul>

        {/* Sample sentence */}
        <div className={`mt-auto rounded-lg ${a.sampleBg} border px-3 py-2.5`}>
          <div className={`font-mono text-[9px] uppercase tracking-widest mb-1 ${a.chipText} ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ឧទាហរណ៍" : "Sample sentence"}
          </div>
          <div className={`text-sm text-stone-900 italic ${isKh ? "font-khmer not-italic leading-loose" : ""}`}>
            "{isKh ? sample.kh : sample.en}"
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · Translation Matrix
// ════════════════════════════════════════════════════════════════════════════

type Pair = {
  Icon: React.ComponentType<{ className?: string }>;
  topicEn: string; topicKh: string;
  beforeEn: string; beforeKh: string;
  beforeProblemEn: string; beforeProblemKh: string;
  afterEn: string; afterKh: string;
  afterFixEn: string; afterFixKh: string;
};

const PAIRS: Pair[] = [
  {
    Icon: Leaf,
    topicEn: "About a thing",
    topicKh: "អំពីវត្ថុ",
    beforeEn: "The leaf is green.",
    beforeKh: "ស្លឹក គឺ បៃតង។",
    beforeProblemEn: "Absolute statement — claims the leaf carries 'greenness' inside it, true for everyone, forever.",
    beforeProblemKh: "ប្រយោគដាច់ខាត — អះអាងថាស្លឹកមាន 'ភាពបៃតង' នៅខាងក្នុង ពិតសម្រាប់មនុស្សគ្រប់គ្នា ជារៀងរហូត។",
    afterEn: "The leaf appears green to my eyes, in this light.",
    afterKh: "ស្លឹក មើលទៅបៃតង នឹងភ្នែករបស់ខ្ញុំ នៅក្រោមពន្លឺនេះ។",
    afterFixEn: "Observational statement — credits the eye, the light, and the moment. A bee with UV vision would describe the same leaf differently.",
    afterFixKh: "ប្រយោគសង្កេត — ផ្តល់កិត្តិយសដល់ភ្នែក ពន្លឺ និងពេលវេលា។ ឃ្មុំដែលមើលឃើញ UV នឹងពិពណ៌នាស្លឹកដដែលនេះខុសគ្នា។",
  },
  {
    Icon: PersonStanding,
    topicEn: "About another person",
    topicKh: "អំពីអ្នកដទៃ",
    beforeEn: "Sophak is lazy.",
    beforeKh: "សុផាក់ គឺ ខ្ជិល។",
    beforeProblemEn: "Permanent identity — fuses one person to one trait for all time. Closes the door on tomorrow.",
    beforeProblemKh: "អត្តសញ្ញាណអចិន្ត្រៃយ៍ — ភ្ជាប់មនុស្សម្នាក់ទៅនឹងលក្ខណៈតែមួយជារៀងរហូត។ បិទទ្វារនៃថ្ងៃស្អែក។",
    afterEn: "Sophak did not finish his work today.",
    afterKh: "សុផាក់មិនបានបញ្ចប់ការងាររបស់គាត់ថ្ងៃនេះទេ។",
    afterFixEn: "Action-based fact — names the deed, dates it, and leaves Sophak free to do otherwise tomorrow.",
    afterFixKh: "ការពិតផ្អែកលើសកម្មភាព — ដាក់ឈ្មោះអំពើ ដាក់កាលបរិច្ឆេទ ហើយទុកឱ្យសុផាក់មានសេរីភាពធ្វើផ្សេងនៅថ្ងៃស្អែក។",
  },
  {
    Icon: User,
    topicEn: "About yourself",
    topicKh: "អំពីខ្លួនឯង",
    beforeEn: "I am a failure.",
    beforeKh: "ខ្ញុំ គឺជា មនុស្សបរាជ័យ។",
    beforeProblemEn: "Destructive self-label — collapses your whole life into one word and then makes that word your name.",
    beforeProblemKh: "ស្លាកដាក់ខ្លួនឯងបំផ្លិចបំផ្លាញ — បង្រួមជីវិតទាំងមូលរបស់អ្នកទៅជាពាក្យតែមួយ ហើយបន្ទាប់មកធ្វើឱ្យពាក្យនោះក្លាយជាឈ្មោះរបស់អ្នក។",
    afterEn: "I failed this specific exam.",
    afterKh: "ខ្ញុំបានបរាជ័យក្នុងការប្រឡងជាក់លាក់នេះ។",
    afterFixEn: "A temporary event — a single test, a single day. The next exam, and the next you, are still unwritten.",
    afterFixKh: "ព្រឹត្តិការណ៍បណ្តោះអាសន្ន — ការប្រឡងតែមួយ ថ្ងៃតែមួយ។ ការប្រឡងបន្ទាប់ និងខ្លួនអ្នកនៅថ្ងៃស្អែក នៅតែមិនទាន់សរសេរ។",
  },
];

function TranslationMatrix({ isKh }: { isKh: boolean }) {
  return (
    <div className="space-y-4">
      {PAIRS.map((p, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden"
          data-testid={`pair-${i}`}
        >
          {/* Topic header */}
          <div className="px-4 sm:px-5 py-2.5 bg-stone-100 border-b border-stone-200 flex items-center gap-2.5">
            <p.Icon className="w-4 h-4 text-stone-500" />
            <div className={`font-mono text-[10px] uppercase tracking-widest text-stone-600 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? p.topicKh : p.topicEn}
            </div>
            <span className="text-stone-300 text-xs ml-1">·</span>
            <div className="text-[10px] font-mono text-stone-400">PAIR {String(i + 1).padStart(2, "0")}</div>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
            {/* BEFORE */}
            <div className="p-4 sm:p-5 bg-amber-50/40 border-b md:border-b-0 md:border-r border-amber-200/60">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                  {isKh ? "អារីស្តូត — មុន" : "Aristotelian — Before"}
                </div>
              </div>
              <Quote className="w-4 h-4 text-amber-300 mb-1" />
              <blockquote className={`text-base sm:text-lg font-display text-stone-900 mb-2 ${isKh ? "font-khmer leading-snug" : "leading-snug"}`}>
                "{isKh ? p.beforeKh : p.beforeEn}"
              </blockquote>
              <p className={`text-xs text-amber-900/80 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh ? p.beforeProblemKh : p.beforeProblemEn}
              </p>
            </div>

            {/* Arrow */}
            <div className="flex md:flex-col items-center justify-center py-2 md:py-0 md:px-2 bg-white">
              <ArrowRight className="w-5 h-5 text-stone-400 md:rotate-0 rotate-90" />
            </div>

            {/* AFTER */}
            <div className="p-4 sm:p-5 bg-teal-50/50">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-3.5 h-3.5 text-teal-700" />
                <div className={`font-mono text-[10px] uppercase tracking-widest text-teal-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                  {isKh ? "មិនមែនអារីស្តូត — ក្រោយ" : "Non-Aristotelian — After"}
                </div>
              </div>
              <Quote className="w-4 h-4 text-teal-300 mb-1" />
              <blockquote className={`text-base sm:text-lg font-display text-stone-900 mb-2 ${isKh ? "font-khmer leading-snug" : "leading-snug"}`}>
                "{isKh ? p.afterKh : p.afterEn}"
              </blockquote>
              <p className={`text-xs text-teal-900/80 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh ? p.afterFixKh : p.afterFixEn}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TryItYourself({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-stone-900 text-white p-5 sm:p-6">
      <div className="flex items-start gap-3 max-w-3xl">
        <Sparkles className="w-5 h-5 text-teal-200 flex-shrink-0 mt-0.5" />
        <div className="space-y-3">
          <div className={`font-display font-bold text-teal-100 text-lg ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "សាកល្បងដោយខ្លួនឯង — បទពិសោធន៍ E-Prime" : "Try it yourself — the E-Prime experiment"}
          </div>
          <p className={`text-sm text-stone-200 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "សម្រាប់រយៈពេលមួយថ្ងៃ សូមព្យាយាមនិយាយដោយមិនប្រើពាក្យ 'គឺ' 'ជា' 'បាន' និង 'នឹង' ទាំងស្រុងសម្រាប់ការវិនិច្ឆ័យអំពីមនុស្ស។ អ្នកនឹងសម្គាល់ឃើញពីរយ៉ាង៖ (១) វាពិបាកគួរឱ្យភ្ញាក់ផ្អើល ហើយ (២) ការគិតរបស់អ្នកក្លាយជាសុភាពនិងច្បាស់ជាងមុន។"
              : "For one day, try to speak without using the words 'is, are, was, were' for any verdict about people. You'll notice two things: (1) it is surprisingly hard, and (2) your thinking becomes gentler and more accurate."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <Pill emoji="🔒" en="Catch the 'is'" kh="ចាប់ពាក្យ 'គឺ'" isKh={isKh} />
            <Pill emoji="🔄" en="Replace with a verb" kh="ជំនួសដោយកិរិយាសព្ទ" isKh={isKh} />
            <Pill emoji="📅" en="Add time + observer" kh="បន្ថែមពេលវេលា + អ្នកសង្កេត" isKh={isKh} />
          </div>
        </div>
      </div>

      <div className={`mt-5 pt-4 border-t border-white/10 flex items-start gap-2 text-xs text-stone-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <Info className="w-3.5 h-3.5 text-teal-200 flex-shrink-0 mt-0.5" />
        <p>
          {isKh
            ? "ភាសាខ្មែរមានគុណសម្បត្តិលាក់កំបាំងមួយ៖ យើងតែងតែលុបពាក្យ 'គឺ' រួចស្រេច (ឧ. «ស្លឹកបៃតង» ជំនួស «ស្លឹកគឺបៃតង»)។ បទពិសោធន៍នេះជួយយើងសម្គាល់ឱ្យបានច្បាស់នូវពេលដែលយើងពិតជាបោះត្រាស្លាកដាច់ខាត។"
            : "Khmer has a hidden advantage: the verb 'is' often disappears already (e.g. «ស្លឹកបៃតង» without «គឺ»). The exercise helps us notice the moments when we still secretly stamp absolute labels."}
        </p>
      </div>
    </div>
  );
}

function Pill({ emoji, en, kh, isKh }: { emoji: string; en: string; kh: string; isKh: boolean }) {
  return (
    <div className={`rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-sm text-stone-100 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
      <span className="text-base">{emoji}</span>
      <span>{isKh ? kh : en}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative — paper-grain backdrop for the hero
// ════════════════════════════════════════════════════════════════════════════

function PaperGrainBg() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" aria-hidden>
      <defs>
        <pattern id="paper" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill="#fff" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#paper)" />
    </svg>
  );
}
