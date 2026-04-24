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
  Dog,
  Layers,
  Atom,
  AlertTriangle,
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

      {/* ── Section 2: Infinite Abstraction & The Structural Differential ── */}
      <Section
        spec="02"
        eyebrowEn="Infinite Abstraction · The Structural Differential"
        eyebrowKh="ការអរូបីកម្មគ្មានទីបញ្ចប់ · ម៉ូដែលរចនាសម្ព័ន្ធប្លែកគ្នា"
        titleEn="Why humans build skyscrapers of meaning — and how Korzybski drew the blueprint"
        titleKh="ហេតុអ្វីមនុស្សសាងសង់អគារខ្ពស់ៗនៃអត្ថន័យ — ហើយ Korzybski បានគូសប្លង់នោះយ៉ាងណា"
        descEn="Words let us climb a ladder that no other animal can reach. But every rung pulls us further from the physical ground. Korzybski even built a 3D wooden model — the Structural Differential — to make this loss visible. Below: the animal floor, the human ladder, and the model itself."
        descKh="ពាក្យអនុញ្ញាតឱ្យយើងឡើងជណ្ដើរមួយដែលគ្មានសត្វណាទៀតអាចទៅដល់។ ប៉ុន្តែជើងជណ្ដើរនីមួយៗទាញយើងកាន់តែឆ្ងាយពីដីរូបវ័ន្ត។ លោក Korzybski ថែមទាំងបានសាងសង់គំរូឈើ ៣ វិមាត្រ — Structural Differential — ដើម្បីធ្វើឱ្យការបាត់បង់នេះអាចមើលឃើញ។ ខាងក្រោម៖ ជាន់សត្វ ជណ្ដើរមនុស្ស និងគំរូខ្លួនវា។"
        isKh={isKh}
      >
        <InfiniteAbstraction isKh={isKh} />
      </Section>

      {/* ── Section 3: The Translation Matrix ─────────────────────────── */}
      <Section
        spec="03"
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
//  Section 2 · Infinite Abstraction & The Structural Differential
// ════════════════════════════════════════════════════════════════════════════

function InfiniteAbstraction({ isKh }: { isKh: boolean }) {
  return (
    <div data-testid="infinite-abstraction" className="space-y-5">
      {/* Cards 1 + 2 — animal limit vs human ladder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimalLimitCard isKh={isKh} />
        <HumanAbstractionCard isKh={isKh} />
      </div>

      {/* Card 3 — the Structural Differential, full width */}
      <StructuralDifferentialCard isKh={isKh} />
    </div>
  );
}

// ── Card 1 · The Animal Limit ─────────────────────────────────────────────

function AnimalLimitCard({ isKh }: { isKh: boolean }) {
  return (
    <article
      data-testid="card-animal-limit"
      className="relative bg-white border border-amber-300/70 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Header strip */}
      <div className="flex items-center gap-2.5 px-5 pt-4 pb-3 border-b border-amber-200/80 bg-gradient-to-r from-amber-50 to-stone-50">
        <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/40 flex items-center justify-center">
          <Dog className="w-4 h-4 text-amber-700" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-700">
            CARD 01 · THE FLOOR
          </p>
          <h3 className={`font-display font-bold text-stone-900 text-base sm:text-lg leading-tight ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ដែនកំណត់របស់សត្វ" : "The Animal Limit"}
          </h3>
          <p className={`text-[11px] text-stone-500 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "The Animal Limit" : "ដែនកំណត់របស់សត្វ"}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        <span className={`inline-block text-[10px] font-mono uppercase tracking-[0.18em] text-amber-700 bg-amber-500/10 border border-amber-400/40 rounded-sm px-2 py-0.5 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "គំនិតគោល" : "The Concept"}
        </span>
        <p className={`text-stone-700 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "សត្វ ពិតជា អរូបីកម្មពិភពលោក — ប៉ុន្តែវាប៉ះពិដានរឹងមួយ។ ឆ្កែមួយក្បាលមានអារម្មណ៍លើពិភពរូបវ័ន្តកម្រិតអាតូម ហើយអរូបីកម្មវាទៅជា «វត្ថុ» (ដូចជាឆ្អឹង)។ វាថែមទាំងអាចរៀនសំឡេងភ្ជាប់ជាមួយវាទៀតផង។ ប៉ុន្តែ ឆ្កែមិនអាចសរសេរអត្ថបទទស្សនវិជ្ជាស្ដីពី «គំនិតនៃឆ្អឹង» បានឡើយ។ ផែនទីរបស់វាត្រូវបានចាក់សោរនឹងទឹកដីរូបវ័ន្ត។"
            : "Animals do absolutely abstract reality — but they hit a hard ceiling. A dog senses the subatomic physical world and abstracts it into an 'Object' (like a bone). It can even learn a sound associated with it. But a dog cannot write a philosophical essay about the concept of bones. Their Map is locked to the physical Territory."}
        </p>

        {/* Tiny ladder of "what they can / can't do" */}
        <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
          <div className="rounded-md bg-emerald-50 border border-emerald-300/60 px-2.5 py-1.5">
            <p className="text-emerald-700 font-mono text-[10px] uppercase tracking-widest mb-0.5">
              {isKh ? "ធ្វើបាន" : "Can do"}
            </p>
            <p className={`text-stone-700 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "មានអារម្មណ៍ឆ្អឹង · រត់តាមឆ្អឹង" : "Sense a bone · chase a bone"}
            </p>
          </div>
          <div className="rounded-md bg-stone-100 border border-stone-300/70 px-2.5 py-1.5">
            <p className="text-stone-500 font-mono text-[10px] uppercase tracking-widest mb-0.5 inline-flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" aria-hidden="true" />
              {isKh ? "មិនបាន" : "Cannot"}
            </p>
            <p className={`text-stone-600 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ពិភាក្សា «គំនិតនៃឆ្អឹង»" : "Discuss the 'idea' of a bone"}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Card 2 · Infinite Human Abstraction ───────────────────────────────────

function HumanAbstractionCard({ isKh }: { isKh: boolean }) {
  // Bessie → Cow → Livestock → Agricultural Asset
  const ladder: { en: string; kh: string }[] = [
    { en: "Bessie", kh: "Bessie (បេស៊ី)" },
    { en: "Cow", kh: "គោ" },
    { en: "Livestock", kh: "សត្វចិញ្ចឹម" },
    { en: "Agricultural Asset", kh: "ទ្រព្យកសិកម្ម" },
  ];

  return (
    <article
      data-testid="card-human-abstraction"
      className="relative bg-white border border-yellow-400/70 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Header strip */}
      <div className="flex items-center gap-2.5 px-5 pt-4 pb-3 border-b border-yellow-300/70 bg-gradient-to-r from-yellow-50 via-amber-50 to-emerald-50">
        <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center">
          <Layers className="w-4 h-4 text-yellow-700" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-yellow-700">
            CARD 02 · THE LADDER
          </p>
          <h3 className={`font-display font-bold text-stone-900 text-base sm:text-lg leading-tight ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ការអរូបីកម្មគ្មានទីបញ្ចប់របស់មនុស្ស" : "Infinite Human Abstraction"}
          </h3>
          <p className={`text-[11px] text-stone-500 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Infinite Human Abstraction" : "ការអរូបីកម្មគ្មានទីបញ្ចប់របស់មនុស្ស"}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-4">
        {/* Superpower */}
        <div>
          <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.18em] text-yellow-800 bg-yellow-400/15 border border-yellow-500/40 rounded-sm px-2 py-0.5 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            <Sparkles className="w-2.5 h-2.5" aria-hidden="true" />
            {isKh ? "សមត្ថភាពពិសេស" : "The Superpower"}
          </span>
          <p className={`text-stone-700 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "មនុស្ស អាច «ដាក់ស្លាកលើស្លាក» បាន។ យើងឃើញសត្វរូបវ័ន្តជាក់លាក់មួយ (វត្ថុ) យើងហៅវាថា «Bessie» (ស្លាក ១) យើងចាត់ថ្នាក់វាជា «គោ» (ស្លាក ២) បន្ទាប់មក «សត្វចិញ្ចឹម» (ស្លាក ៣) បន្ទាប់មក «ទ្រព្យកសិកម្ម» (ស្លាក ៤)។"
              : "Humans can label a label. We see a specific physical animal (Object), we call it 'Bessie' (Label 1), we classify it as a 'Cow' (Label 2), then 'Livestock' (Label 3), then 'Agricultural Asset' (Label 4)."}
          </p>

          {/* Visual ladder */}
          <ol className="mt-3 space-y-1.5" aria-label={isKh ? "ជណ្ដើរនៃការអរូបីកម្ម" : "Ladder of abstraction"}>
            {ladder.map((rung, i) => {
              const total = ladder.length;
              // Indent each rung a little more, color shifts amber → emerald
              const indentClass = ["ml-0", "ml-3", "ml-6", "ml-9"][i] ?? "ml-12";
              const tones = [
                "bg-amber-50 border-amber-300 text-amber-900",
                "bg-yellow-50 border-yellow-300 text-yellow-900",
                "bg-lime-50 border-lime-300 text-lime-900",
                "bg-emerald-50 border-emerald-300 text-emerald-900",
              ];
              return (
                <li key={i} className={`flex items-center gap-2 ${indentClass}`}>
                  <span className="text-[10px] font-mono text-stone-400 w-8 shrink-0">
                    L{i + 1}
                    {i === 0 ? <span className="text-stone-300"> ·</span> : null}
                  </span>
                  <span className={`flex-1 text-xs sm:text-sm rounded-md border px-2.5 py-1 ${tones[i] ?? tones[3]} ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? rung.kh : rung.en}
                  </span>
                  {i < total - 1 ? (
                    <ArrowRight className="w-3 h-3 text-stone-400 shrink-0" aria-hidden="true" />
                  ) : (
                    <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Danger */}
        <div className="rounded-lg bg-stone-50 border-l-4 border-amber-500/70 px-3.5 py-3">
          <p className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-amber-800 mb-1.5 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            <AlertTriangle className="w-3 h-3" aria-hidden="true" />
            {isKh ? "គ្រោះថ្នាក់" : "The Danger"}
          </p>
          <p className={`text-stone-700 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "យើងឡើងកាន់តែខ្ពស់លើជណ្ដើរប៉ុណ្ណា យើងកាន់តែឆ្ងាយពីទឹកដីរូបវ័ន្តប៉ុណ្ណោះ។ ការឈ្លោះប្រកែករបស់មនុស្សភាគច្រើនកើតឡើងព្រោះយើងជាប់គាំងនៅក្នុងពពកនៃ «ការអរូបីកម្មកម្រិតខ្ពស់» (ឧ. ឈ្លោះអំពី «មូលធននិយម») ជំនួសឱ្យការចង្អុលទៅការពិតរូបវ័ន្តនៅលើដី។"
              : "The higher we climb the ladder, the further we get from the physical Territory. Most human arguments happen because we get stuck fighting in the clouds of High Abstraction (e.g. arguing about 'Capitalism') instead of pointing at the physical realities on the ground."}
          </p>
        </div>
      </div>
    </article>
  );
}

// ── Card 3 · The Structural Differential ──────────────────────────────────

function StructuralDifferentialCard({ isKh }: { isKh: boolean }) {
  return (
    <article
      data-testid="card-structural-differential"
      className="relative bg-white border border-emerald-400/60 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Mint accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400" aria-hidden="true" />

      {/* Header */}
      <div className="flex items-start sm:items-center gap-2.5 px-5 pt-5 pb-3 border-b border-emerald-200/70 bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-400/50 flex items-center justify-center shrink-0">
          <Atom className="w-4 h-4 text-emerald-700" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-700">
            CARD 03 · THE MODEL · NON-ARISTOTELIAN
          </p>
          <h3 className={`font-display font-bold text-stone-900 text-base sm:text-lg leading-tight ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ម៉ូដែលរចនាសម្ព័ន្ធប្លែកគ្នា" : "The Structural Differential"}
          </h3>
          <p className={`text-[11px] text-stone-500 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "The Structural Differential · Korzybski" : "ម៉ូដែលរចនាសម្ព័ន្ធប្លែកគ្នា · Korzybski"}
          </p>
        </div>
      </div>

      {/* Body — split: diagram + text */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,260px)_1fr] gap-5 px-5 py-5">
        {/* Diagram */}
        <div className="flex flex-col items-center">
          <StructuralDifferentialDiagram isKh={isKh} />
          <p className={`mt-2 text-[11px] text-stone-500 italic text-center max-w-[240px] ${isKh ? "font-khmer not-italic" : ""}`}>
            {isKh
              ? "ផែនទីតែងតែតូចជាងទឹកដី។"
              : "The Map is always smaller than the Territory."}
          </p>
        </div>

        {/* Text columns */}
        <div className="space-y-3.5">
          {/* The Physical Model */}
          <div>
            <span className={`inline-block text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-800 bg-emerald-500/10 border border-emerald-500/40 rounded-sm px-2 py-0.5 mb-1.5 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "គំរូរូបវ័ន្ត" : "The Physical Model"}
            </span>
            <p className={`text-stone-700 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "Alfred Korzybski បាន សាងសង់ គំរូ ៣ វិមាត្រដោយដៃ ដើម្បីបង្រៀនការនេះ។"
                : "Alfred Korzybski actually built a 3D physical model — out of wood and string — to teach this."}
            </p>
          </div>

          {/* Three labelled parts */}
          <DiagramPart
            tone="parabola"
            labelEn="The Parabola — The Event"
            labelKh="ភ្នំ​ប៉ារ៉ាបូល — ព្រឹត្តិការណ៍"
            isKh={isKh}
          >
            {isKh
              ? "បំណែកខាងលើគឺជា ប៉ារ៉ាបូល ដែលមានរន្ធគ្មានទីបញ្ចប់ តំណាងឱ្យអាតូមកំពុងវិលគ្មានទីបញ្ចប់នៃសកលលោករូបវ័ន្ត។"
              : "The top piece is a parabola with infinite holes, representing the infinite, swirling atoms of the physical universe."}
          </DiagramPart>

          <DiagramPart
            tone="disc"
            labelEn="The Disc — The Object"
            labelKh="ថាស — វត្ថុ"
            isKh={isKh}
          >
            {isKh
              ? "ខ្សែស្រឡាយ ភ្ជាប់ ប៉ារ៉ាបូល ទៅនឹង ថាសមូល មួយ។ នេះគឺជាប្រព័ន្ធសរសៃប្រសាទរបស់យើង កំពុងច្រោះអាតូម ឱ្យទៅជាវត្ថុរូបវ័ន្តដែលយើងអាចមើលឃើញ និងប៉ះបាន។"
              : "Strings connect the Parabola to a solid round Disc. This is our nervous system filtering the atoms into a physical object we can see and touch."}
          </DiagramPart>

          <DiagramPart
            tone="strings"
            labelEn="The Hanging Strings — What we leave out"
            labelKh="ខ្សែ​ព្យួរ — អ្វីដែលយើងទុកចោល"
            isKh={isKh}
          >
            {isKh
              ? "សំខាន់៖ ខ្សែ ច្រើន ពី​ប៉ារ៉ាបូល មិន ភ្ជាប់ទៅថាស​ទេ — ពួកវាព្យួរ​ជា​គូទៗ។ នេះតំណាងឱ្យលក្ខណៈនៃការពិតដែលសរសៃប្រសាទរបស់យើងមិនអាចចាប់បាន។ រាល់ពេលយើងអរូបីកម្ម យើងបាត់បង់ព័ត៌មានលម្អិត។"
              : "Crucially, many strings from the Parabola do not connect to the Disc. They hang loose. This represents the characteristics of reality our senses simply cannot pick up. Every time we abstract, we lose details."}
          </DiagramPart>

          {/* Punchline */}
          <div className="rounded-lg bg-emerald-50 border border-emerald-300 px-3.5 py-2.5">
            <p className={`text-emerald-900 text-sm font-semibold ${isKh ? "font-khmer" : ""}`}>
              {isKh
                ? "ផែនទីតែងតែតូចជាងទឹកដី។"
                : "The Map is always smaller than the Territory!"}
            </p>
            <p className={`text-emerald-800/80 text-[11px] mt-0.5 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "The Map is always smaller than the Territory." : "ផែនទីតែងតែតូចជាងទឹកដី។"}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function DiagramPart({
  tone, labelEn, labelKh, isKh, children,
}: {
  tone: "parabola" | "disc" | "strings";
  labelEn: string; labelKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  const swatch =
    tone === "parabola" ? "bg-teal-400"
    : tone === "disc" ? "bg-emerald-500"
    : "bg-stone-300";
  return (
    <div className="flex gap-3">
      <span className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${swatch}`} aria-hidden="true" />
      <div className="min-w-0">
        <p className={`text-[12px] font-bold uppercase tracking-wider text-stone-800 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? labelKh : labelEn}
        </p>
        <p className={`text-[11px] text-stone-500 mb-0.5 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? labelEn : labelKh}
        </p>
        <p className={`text-stone-700 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
          {children}
        </p>
      </div>
    </div>
  );
}

// Inline SVG of Korzybski's Structural Differential
function StructuralDifferentialDiagram({ isKh }: { isKh: boolean }) {
  // Atoms scattered inside the parabola
  const atoms = [
    [70, 38], [95, 32], [120, 30], [145, 32], [170, 38],
    [85, 50], [110, 46], [135, 46], [160, 50],
    [100, 62], [125, 60], [150, 62],
  ];

  // Strings: x positions on the parabola underside; some go to disc, some hang loose
  const strings: { fromX: number; fromY: number; toX: number; toY: number; loose: boolean }[] = [
    { fromX: 70,  fromY: 75, toX: 100, toY: 175, loose: false },
    { fromX: 88,  fromY: 80, toX: 115, toY: 175, loose: false },
    { fromX: 108, fromY: 84, toX: 130, toY: 175, loose: false },
    { fromX: 128, fromY: 84, toX: 145, toY: 175, loose: false },
    { fromX: 148, fromY: 80, toX: 160, toY: 175, loose: false },
    { fromX: 168, fromY: 75, toX: 175, toY: 175, loose: false },
    // Loose strings — hang straight down or off to the side
    { fromX: 60,  fromY: 70, toX: 35,  toY: 220, loose: true },
    { fromX: 78,  fromY: 78, toX: 55,  toY: 235, loose: true },
    { fromX: 175, fromY: 70, toX: 215, toY: 220, loose: true },
    { fromX: 195, fromY: 60, toX: 235, toY: 230, loose: true },
    { fromX: 30,  fromY: 60, toX: 18,  toY: 200, loose: true },
  ];

  return (
    <svg
      viewBox="0 0 260 280"
      className="w-full max-w-[260px]"
      role="img"
      aria-label={
        isKh
          ? "គំនូររបស់ Korzybski ៖ ប៉ារ៉ាបូលនៅខាងលើ ខ្សែស្រឡាយចុះមកថាស និងខ្សែព្យួរបាត់បង់"
          : "Korzybski's Structural Differential — parabola of infinite atoms above, strings descending to a disc, with loose strings hanging away"
      }
    >
      {/* Parabola — top piece */}
      <g>
        {/* Outline */}
        <path
          d="M 25 80 Q 130 -15 235 80 L 215 90 Q 130 10 45 90 Z"
          fill="#ccfbf1"
          stroke="#0f766e"
          strokeWidth="1.5"
        />
        {/* Atoms inside */}
        {atoms.map(([x, y], i) => (
          <circle key={`atom-${i}`} cx={x} cy={y} r="2" fill="#0d9488" opacity="0.85" />
        ))}
        {/* Label tag */}
        <text x="130" y="22" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#0f766e" fontWeight="600" letterSpacing="0.1em">
          EVENT
        </text>
      </g>

      {/* Strings */}
      {strings.map((s, i) => (
        <line
          key={`s-${i}`}
          x1={s.fromX}
          y1={s.fromY}
          x2={s.toX}
          y2={s.toY}
          stroke={s.loose ? "#a8a29e" : "#0d9488"}
          strokeWidth={s.loose ? "1" : "1.2"}
          strokeDasharray={s.loose ? "2 3" : undefined}
          opacity={s.loose ? 0.7 : 0.9}
        />
      ))}

      {/* Loose-string end caps (small dots so they read as broken) */}
      {strings.filter((s) => s.loose).map((s, i) => (
        <circle key={`loose-${i}`} cx={s.toX} cy={s.toY} r="1.6" fill="#a8a29e" />
      ))}

      {/* Disc — solid object */}
      <g>
        <ellipse cx="137" cy="195" rx="72" ry="14" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
        <ellipse cx="137" cy="192" rx="72" ry="14" fill="#34d399" stroke="#047857" strokeWidth="1.5" />
        <text x="137" y="196" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#064e3b" fontWeight="700" letterSpacing="0.12em">
          OBJECT
        </text>
      </g>

      {/* Annotation arrows */}
      <g fontSize="8" fontFamily="ui-monospace, monospace" fill="#78716c">
        <text x="248" y="245" textAnchor="end">{isKh ? "ខ្សែបាត់" : "loose"}</text>
        <text x="12"  y="245">{isKh ? "បាត់" : "lost"}</text>
      </g>
    </svg>
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
