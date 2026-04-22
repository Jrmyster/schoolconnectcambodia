import { Link } from "wouter";
import {
  ArrowLeft,
  Dna,
  Scissors,
  Sprout,
  HeartPulse,
  Search,
  ClipboardPaste,
  Sparkles,
  AlertTriangle,
  Microscope,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  SCI-BIO-CRISPR · CRISPR & Genetic Engineering: Editing the Code of Life
//                  CRISPR និងវិស្វកម្មហ្សែន៖ ការកែសម្រួលកូដនៃជីវិត
//
//  1. The Microscopic Scissors — CRISPR-Cas9 as 'Find & Replace'
//  2. GMO Plants & The Future of Food — copy-paste survival genes
//  3. Curing the Incurable — fixing single-letter typos in DNA
//
//  Aesthetic: Biolab — deep emerald greens + clean tech-whites,
//  abstract DNA-strand visuals breaking and reforming.
// ════════════════════════════════════════════════════════════════════════════

export default function CrisprPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white text-slate-900">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#022c1f] via-[#04432f] to-[#066044] text-white border-b-4 border-emerald-300">
        <DnaBgPattern />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-emerald-200 hover:text-emerald-100 text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-emerald-300/15 backdrop-blur border border-emerald-300/40 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-emerald-200">
            <Dna className="w-3.5 h-3.5" />
            SCI-BIO-CRISPR · GENETICS · BIOTECH
          </div>

          <h1 className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl drop-shadow ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? (
              <>
                CRISPR និងវិស្វកម្មហ្សែន —{" "}
                <span className="text-emerald-300">ការកែសម្រួលកូដនៃជីវិត</span>
              </>
            ) : (
              <>
                CRISPR &amp; Genetic Engineering —{" "}
                <span className="text-emerald-300">Editing the Code of Life</span>
              </>
            )}
          </h1>

          <p className={`mt-4 max-w-2xl text-emerald-100 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "DNA គឺជាសៀវភៅ ៣ ពាន់លានអក្សរនៅក្នុងកោសិកានីមួយៗរបស់អ្នក។ CRISPR-Cas9 ផ្តល់ឱ្យអ្នកវិទ្យាសាស្ត្រនូវប៊ូតុង «រកនិងជំនួស» ដើម្បីកែសម្រួលសៀវភៅនោះ — បំបែករុក្ខជាតិដែលធន់នឹងគ្រោះរាំងស្ងួត និងការព្យាបាលជំងឺហ្សែនពេញមួយជីវិត។"
              : "DNA is a 3-billion-letter book inside every one of your cells. CRISPR-Cas9 hands scientists a 'find & replace' button to edit that book — unlocking drought-proof crops and lifelong cures for genetic disease."}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
            <Stat valueEn="3 billion" labelEn="Letters in your DNA" labelKh="អក្សរនៅក្នុង DNA របស់អ្នក" isKh={isKh} />
            <Stat valueEn="2012" labelEn="CRISPR-Cas9 unveiled" labelKh="CRISPR-Cas9 បង្ហាញខ្លួន" isKh={isKh} />
            <Stat valueEn="2020" labelEn="Doudna & Charpentier — Nobel Prize" labelKh="Doudna និង Charpentier — រង្វាន់ណូបែល" isKh={isKh} />
          </div>
        </div>
      </header>

      {/* ── Section 1: The Microscopic Scissors ───────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="The Word-Processor analogy"
        eyebrowKh="ការប្រៀបធៀបជាមួយកម្មវិធីវាយអត្ថបទ"
        titleEn="The Microscopic Scissors"
        titleKh="កន្ត្រៃមីក្រូទស្សន៍"
        descEn="Imagine your DNA is a huge instruction book — 3 billion letters spelled with only A, T, C, and G — that tells your body how to build itself. CRISPR is the 'Find &amp; Replace' menu on that book. The Cas9 enzyme is a pair of microscopic scissors that does the actual cutting once the right page has been found."
        descKh="ស្រមៃមើលថា DNA របស់អ្នកគឺជាសៀវភៅណែនាំដ៏ធំមួយ — ៣ ពាន់លានអក្សរ ដែលសរសេរដោយអក្សរ A, T, C, G ប៉ុណ្ណោះ — ដែលប្រាប់រូបកាយរបស់អ្នកពីរបៀបសាងសង់ខ្លួនវា។ CRISPR គឺជាមីនុយ «រកនិងជំនួស» នៅលើសៀវភៅនោះ។ អង់ស៊ីម Cas9 គឺជាកន្ត្រៃមីក្រូទស្សន៍មួយគូ ដែលធ្វើការកាត់ជាក់ស្តែង នៅពេលដែលរកឃើញទំព័រត្រឹមត្រូវ។"
        isKh={isKh}
      >
        <FindReplaceCard isKh={isKh} />
        <CrisprStepper isKh={isKh} />
      </Section>

      {/* ── Section 2: GMO Plants ─────────────────────────────────────── */}
      <Section
        spec="02"
        eyebrowEn="Editing for the dinner plate"
        eyebrowKh="ការកែសម្រួលសម្រាប់ចានបាយ"
        titleEn="GMO Plants & The Future of Food"
        titleKh="រុក្ខជាតិបំប្លែងហ្សែន និងអនាគតនៃអាហារ"
        descEn="A GMO — Genetically Modified Organism — is any living thing whose DNA we have rewritten on purpose. The most useful trick is borrowing a gene that already works perfectly in one species and pasting it into another. The result is plants that survive what their wild ancestors never could."
        descKh="GMO — សារពាង្គកាយបំប្លែងហ្សែន — គឺជារបស់រស់ណាមួយ ដែល DNA របស់វាត្រូវបានយើងសរសេរឡើងវិញដោយចេតនា។ ល្បិចមានប្រយោជន៍បំផុតគឺការខ្ចីហ្សែនដែលដំណើរការយ៉ាងល្អឥតខ្ចោះក្នុងប្រភេទមួយ ហើយបិទភ្ជាប់វាទៅក្នុងប្រភេទមួយទៀត។ លទ្ធផលគឺរុក្ខជាតិដែលរស់រានពីអ្វីដែលដូនតាព្រៃរបស់ពួកវាមិនអាចទៅរួច។"
        isKh={isKh}
      >
        <DroughtRiceStory isKh={isKh} />
        <CropResilienceCard isKh={isKh} />
      </Section>

      {/* ── Section 3: Curing the Incurable ───────────────────────────── */}
      <Section
        spec="03"
        eyebrowEn="One letter, one cure"
        eyebrowKh="អក្សរមួយ ការព្យាបាលមួយ"
        titleEn="Curing the Incurable"
        titleKh="ការព្យាបាលជំងឺដែលមិនអាចព្យាបាលបាន"
        descEn="Many of the world's cruellest diseases are caused by a single typo in DNA. Sickle Cell Anemia, for example, is one wrong letter (A → T) out of 3 billion. Old medicine could only soften the symptoms. CRISPR offers something unprecedented: deleting the typo and writing the correct letter back, permanently — a one-time edit, not a lifelong prescription."
        descKh="ជំងឺឃោរឃៅបំផុតជាច្រើនរបស់ពិភពលោកបណ្តាលមកពីការវាយខុសតែមួយក្នុង DNA។ ឧទាហរណ៍ ជំងឺឈាមរូបអាក់ (Sickle Cell Anemia) គឺអក្សរខុសតែមួយ (A → T) ក្នុងចំណោម ៣ ពាន់លាន។ ឱសថចាស់អាចបន្ធូរបន្ថយតែរោគសញ្ញាប៉ុណ្ណោះ។ CRISPR ផ្តល់នូវអ្វីមួយដែលមិនធ្លាប់មាន៖ លុបចោលការវាយខុស ហើយសរសេរអក្សរត្រឹមត្រូវត្រឡប់មកវិញ ជាអចិន្ត្រៃយ៍ — ការកែសម្រួលតែម្តង មិនមែនជាវេជ្ជបញ្ជាពេញមួយជីវិត។"
        isKh={isKh}
      >
        <SickleCellCard isKh={isKh} />
        <ApprovedCuresCard isKh={isKh} />
        <EthicsNote isKh={isKh} />
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-700 text-sm ${isKh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout shell
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
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-emerald-900 text-emerald-200 rounded-sm px-2.5 py-0.5">
          SEC-{spec}
        </span>
        <span className={`text-xs font-bold uppercase tracking-widest text-emerald-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-emerald-950 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-slate-700 text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Stat({ valueEn, labelEn, labelKh, isKh }: { valueEn: string; labelEn: string; labelKh: string; isKh: boolean }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur border border-emerald-300/30 px-3 py-2 flex flex-col">
      <div className="font-display font-bold text-2xl text-emerald-300 leading-none">{valueEn}</div>
      <div className={`text-[11px] text-emerald-100 mt-1 ${isKh ? "font-khmer" : ""}`}>{isKh ? labelKh : labelEn}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · Find & Replace card + CRISPR stepper
// ════════════════════════════════════════════════════════════════════════════

function FindReplaceCard({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white shadow-sm p-5 sm:p-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: word processor mockup */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
          <div className="bg-slate-200 px-3 py-2 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">DNA.book</span>
          </div>
          <div className="p-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">Find &amp; Replace</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <code className="block bg-rose-100 text-rose-800 font-mono text-sm px-2 py-1 rounded w-full">…GAG…</code>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardPaste className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <code className="block bg-emerald-100 text-emerald-800 font-mono text-sm px-2 py-1 rounded w-full">…GTG…</code>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
              <span className="text-slate-400">3 letters of 3,000,000,000</span>
              <span className="text-emerald-700">Replace All ✓</span>
            </div>
          </div>
        </div>

        {/* Right: explanation */}
        <div>
          <div className={`font-mono text-[10px] uppercase tracking-widest text-emerald-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "DNA = សៀវភៅ" : "DNA = a book"}
          </div>
          <h3 className={`font-display font-bold text-lg text-emerald-950 mb-2 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}>
            {isKh ? "ស្វែងរកពាក្យមួយ ហើយជំនួសវា" : "Find one word, replace it"}
          </h3>
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "នៅក្នុងសៀវភៅនៃជីវិត ហ្សែននីមួយៗគឺជា «ពាក្យ»។ CRISPR មាន «មគ្គុទ្ទេសក៍ RNA» ដែលជា Ctrl+F ដ៏ល្អឥតខ្ចោះ — វារំកិលតាម DNA រាប់ពាន់លានអក្សររហូតដល់វាឃើញការផ្គូផ្គងពិតប្រាកដ។ បន្ទាប់មក Cas9 — អង់ស៊ីមរូបរាងដូចកន្ត្រៃ — បិទលើកន្លែងនោះ ហើយធ្វើការកាត់យ៉ាងជាក់លាក់នៅខ្សែទាំងពីរនៃខ្សែកាវ DNA។"
              : "In the book of life, every gene is a 'word'. CRISPR carries a 'guide RNA' that acts as a perfect Ctrl+F — it scrolls through billions of letters of DNA until it finds an exact match. Then Cas9, a scissor-shaped enzyme, clamps down on that spot and makes a precise cut through both strands of the DNA helix."}
          </p>
        </div>
      </div>
    </div>
  );
}

function CrisprStepper({ isKh }: { isKh: boolean }) {
  const steps: { Icon: React.ComponentType<{ className?: string }>; titleEn: string; titleKh: string; bodyEn: string; bodyKh: string; tone: string }[] = [
    {
      Icon: Search,
      titleEn: "1. Guide finds the gene",
      titleKh: "១. មគ្គុទ្ទេសក៍រកឃើញហ្សែន",
      bodyEn: "A short RNA molecule — designed by the scientist — locks onto the exact 20-letter sequence we want to edit.",
      bodyKh: "ម៉ូលេគុល RNA ខ្លី — ដែលរចនាដោយអ្នកវិទ្យាសាស្ត្រ — ចាប់ផ្តួបនៅលំដាប់ ២០ អក្សរច្បាស់លាស់ ដែលយើងចង់កែសម្រួល។",
      tone: "from-emerald-500 to-emerald-700",
    },
    {
      Icon: Scissors,
      titleEn: "2. Cas9 snips the strand",
      titleKh: "២. Cas9 កាត់ខ្សែកាវ",
      bodyEn: "The enzyme makes a clean double-strand cut. The cell panics and starts to repair the break right away.",
      bodyKh: "អង់ស៊ីមធ្វើការកាត់ខ្សែទ្វេស្អាត។ កោសិកាភ័យខ្លាច ហើយចាប់ផ្តើមជួសជុលការកាត់នោះភ្លាមៗ។",
      tone: "from-rose-500 to-rose-700",
    },
    {
      Icon: ClipboardPaste,
      titleEn: "3. New code is pasted in",
      titleKh: "៣. កូដថ្មីត្រូវបានបិទភ្ជាប់",
      bodyEn: "We hand the cell a tiny DNA template with the corrected letters. Its repair machinery glues them in — and the edit is permanent.",
      bodyKh: "យើងផ្តល់ឱ្យកោសិកានូវគំរូ DNA តូចមួយដែលមានអក្សរត្រឹមត្រូវ។ យន្តការជួសជុលរបស់វាបិទភ្ជាប់ពួកវាចូល — ហើយការកែសម្រួលជាអចិន្ត្រៃយ៍។",
      tone: "from-emerald-600 to-emerald-900",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {steps.map((s, i) => (
        <div key={i} className="rounded-2xl border-2 border-emerald-100 bg-white p-4 shadow-sm flex flex-col">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.tone} text-white flex items-center justify-center mb-3 shadow-sm`}>
            <s.Icon className="w-5 h-5" />
          </div>
          <h4 className={`font-display font-bold text-emerald-950 mb-1.5 ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? s.titleKh : s.titleEn}
          </h4>
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? s.bodyKh : s.bodyEn}
          </p>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · Drought rice + crop resilience
// ════════════════════════════════════════════════════════════════════════════

function DroughtRiceStory({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-emerald-200 bg-white shadow-sm grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="bg-gradient-to-br from-emerald-900 via-[#04432f] to-emerald-700 p-6 flex items-center justify-center relative overflow-hidden">
        <DnaBgPattern muted />
        <DroughtRiceSVG />
      </div>
      <div className="bg-white p-5 sm:p-6">
        <div className={`font-mono text-[10px] uppercase tracking-widest text-emerald-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ឧទាហរណ៍ជាក់ស្តែង" : "A real-world example"}
        </div>
        <h3 className={`font-display font-bold text-lg text-emerald-950 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
          {isKh ? "អង្ករដែលទប់ទល់នឹងគ្រោះរាំងស្ងួត" : "A drought-proof rice plant"}
        </h3>
        <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "ស្រមៃមើលថា វាលស្រូវកម្ពុជាកំពុងងាប់ ដោយសារភ្លៀងមកយឺត។ អ្នកវិទ្យាសាស្ត្រសង្កេតឃើញថា រុក្ខជាតិវាលខ្សាច់មួយប្រភេទ — ដូចជាមីយ៉ាន់ម៉ាខ្លះៗ — រស់រានបានច្រើនសប្តាហ៍ដោយគ្មានទឹក។ ពួកគេស្វែងរក «ហ្សែនរស់រានពីគ្រោះរាំងស្ងួត» ច្បាស់លាស់ ហើយប្រើ CRISPR ដើម្បីបិទភ្ជាប់ច្បាប់ចម្លងនៃកូដនោះចូលក្នុង DNA របស់ស្រូវ។ លទ្ធផលគឺស្រូវមានរស់ជាតិដូចគ្នា ប៉ុន្តែឈរជើងបានពេញមួយរដូវប្រាំង។"
            : "Imagine Cambodian rice paddies dying because the rains are late. Scientists notice that a certain desert plant — like some Burmese cacti — survives weeks with no water at all. They locate the exact 'drought-survival gene' and use CRISPR to paste a copy of that code into the rice plant's DNA. The result: rice that tastes the same but stands its ground through an entire dry season."}
        </p>
        <ol className="space-y-1.5 text-xs text-slate-700">
          <li className="flex gap-2">
            <span className="font-mono text-emerald-700 flex-shrink-0">①</span>
            <span className={isKh ? "font-khmer leading-loose" : ""}>
              {isKh ? "ស្វែងរកហ្សែនដែលដំណើរការនៅក្នុងរុក្ខជាតិវាលខ្សាច់" : "Find the gene that already works in a desert plant"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-emerald-700 flex-shrink-0">②</span>
            <span className={isKh ? "font-khmer leading-loose" : ""}>
              {isKh ? "កាត់វាចេញដោយ Cas9" : "Cut it out with Cas9"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-emerald-700 flex-shrink-0">③</span>
            <span className={isKh ? "font-khmer leading-loose" : ""}>
              {isKh ? "បិទភ្ជាប់ច្បាប់ចម្លងចូលក្នុង DNA របស់ស្រូវ" : "Paste a copy into the rice DNA"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-mono text-emerald-700 flex-shrink-0">④</span>
            <span className={isKh ? "font-khmer leading-loose" : ""}>
              {isKh ? "ដាំ — ហើយស្រូវរស់រានពីគ្រោះរាំងស្ងួត" : "Plant it — and the rice survives the drought"}
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function CropResilienceCard({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border-l-4 border-emerald-600 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center flex-shrink-0">
          <Sprout className="w-5 h-5" />
        </div>
        <div>
          <div className={`font-mono text-[10px] uppercase tracking-widest text-emerald-800 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ការសន្យានៃវិស្វកម្មហ្សែន" : "The promise of genetic engineering"}
          </div>
          <p className={`text-sm text-emerald-950 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? <><span className="font-semibold">យើងអាចកែច្នៃដំណាំឱ្យធន់នឹងកំដៅ សត្វល្អិត និងទឹកជំនន់ ដោយបង្កើតភាពសម្បូរបែបសម្រាប់ពិភពលោកដែលកំពុងលូតលាស់។</span></>
              : <><span className="font-semibold">We can engineer crops to resist heat, pests, and flooding, creating abundance for a growing world.</span></>}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              { en: "Heat-resistant maize", kh: "ពោតធន់នឹងកម្តៅ" },
              { en: "Pest-resistant cassava", kh: "ដំឡូងមីធន់នឹងសត្វល្អិត" },
              { en: "Flood-tolerant rice", kh: "ស្រូវធន់នឹងទឹកជំនន់" },
              { en: "Vitamin-A 'Golden Rice'", kh: "ស្រូវមាស (មានវីតាមីន A)" },
            ].map((c, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 rounded-full bg-white border border-emerald-300 text-emerald-900 px-2.5 py-0.5 text-[11px] ${isKh ? "font-khmer" : "font-mono"}`}
              >
                <Sparkles className="w-3 h-3" />
                {isKh ? c.kh : c.en}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · Sickle cell + approved cures + ethics
// ════════════════════════════════════════════════════════════════════════════

function SickleCellCard({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white shadow-sm p-5 sm:p-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className={`font-mono text-[10px] uppercase tracking-widest text-emerald-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ករណីសិក្សា — ឈាមរូបអាក់" : "Case study — Sickle Cell Anemia"}
          </div>
          <h3 className={`font-display font-bold text-lg text-emerald-950 mb-2 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}>
            {isKh ? "ការវាយខុសតែមួយ ក្នុងចំណោម ៣ ពាន់លានអក្សរ" : "One typo in 3 billion letters"}
          </h3>
          <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ជំងឺហ្សែនជាច្រើនមិនមែនជាការខូចខាតធំទេ — ពួកវាគឺជាការវាយខុសតែមួយ។ នៅក្នុងជំងឺឈាមរូបអាក់ ហ្សែនអ៊ីម៉ូកូប៊ីនរបស់អ្នកមានអក្សរ A ដែលគួរតែជាអក្សរ T។ ការប៊ិចតែមួយនោះធ្វើឱ្យកោសិកាឈាមក្រហមមានរូបរាងដូចពាក់កណ្តាលព្រះច័ន្ទ ស្ទះសរសៃឈាម និងបង្កើតការឈឺចាប់យ៉ាងខ្លាំងពេញមួយជីវិត។"
              : "Many genetic diseases aren't big breakdowns — they're a single typo. In Sickle Cell Anemia, your hemoglobin gene has the letter A where it should have a T. That one slip makes red blood cells curl into a half-moon shape, clog up your veins, and cause a lifetime of crushing pain."}
          </p>
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "នៅឆ្នាំ ២០២៣ FDA អនុម័តការព្យាបាល CRISPR ជាលើកដំបូង — Casgevy — ដែលកាត់ការវាយខុសនោះនៅខាងក្រៅរូបកាយ និងផ្តល់ឱ្យអ្នកជំងឺនូវកោសិការដ្ឋមជ្ឈិមដែលបានជួសជុលរបស់ពួកគេវិញ។ អ្នកខ្លះបានរាយការណ៍ថា គ្មានការឈឺចាប់ទេ បន្ទាប់ពីការព្យាបាលតែម្តង។"
              : "In 2023, the FDA approved the first CRISPR therapy — Casgevy — which corrects that typo outside the body and gives the patient back their own repaired bone-marrow cells. Some patients report zero pain after a single treatment."}
          </p>
        </div>

        {/* DNA before / after visual */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-rose-700">{isKh ? "មុនពេលព្យាបាល" : "Before"}</span>
            </div>
            <DnaSequence sequence={["G","T","G","C","A","C","C","T","G","A","C","T","C","C","T","G","T","G","G","A","G"]} highlightIndex={10} highlightColor="bg-rose-500 text-white" />
            <p className={`text-[11px] text-slate-500 mt-1 ${isKh ? "font-khmer" : "font-mono"}`}>
              {isKh ? "អក្សរខុស A បង្កឱ្យឈាមរូបអាក់" : "wrong letter A → sickle cell"}
            </p>
          </div>
          <div className="flex items-center justify-center text-emerald-700">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-700">{isKh ? "បន្ទាប់ពីព្យាបាល" : "After"}</span>
            </div>
            <DnaSequence sequence={["G","T","G","C","A","C","C","T","G","T","C","T","C","C","T","G","T","G","G","A","G"]} highlightIndex={9} highlightColor="bg-emerald-500 text-white" />
            <p className={`text-[11px] text-emerald-700 mt-1 ${isKh ? "font-khmer" : "font-mono"}`}>
              {isKh ? "អក្សរត្រឹមត្រូវ T → ឈាមធម្មតា" : "correct letter T → healthy blood"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DnaSequence({ sequence, highlightIndex, highlightColor }: { sequence: string[]; highlightIndex: number; highlightColor: string }) {
  return (
    <div className="flex flex-wrap gap-0.5 font-mono text-[11px] sm:text-xs">
      {sequence.map((b, i) => {
        const tone =
          i === highlightIndex
            ? highlightColor
            : b === "A" ? "bg-emerald-100 text-emerald-900"
            : b === "T" ? "bg-amber-100 text-amber-900"
            : b === "C" ? "bg-sky-100 text-sky-900"
            : "bg-rose-50 text-rose-900";
        return (
          <span key={i} className={`px-1 py-0.5 rounded ${tone}`}>
            {b}
          </span>
        );
      })}
    </div>
  );
}

function ApprovedCuresCard({ isKh }: { isKh: boolean }) {
  const cures: { yearEn: string; yearKh: string; titleEn: string; titleKh: string; bodyEn: string; bodyKh: string }[] = [
    {
      yearEn: "2020", yearKh: "២០២០",
      titleEn: "Nobel Prize in Chemistry",
      titleKh: "រង្វាន់ណូបែលផ្នែកគីមីវិទ្យា",
      bodyEn: "Jennifer Doudna and Emmanuelle Charpentier — for inventing the CRISPR-Cas9 gene-editing tool.",
      bodyKh: "Jennifer Doudna និង Emmanuelle Charpentier — សម្រាប់ការបង្កើតឧបករណ៍កែសម្រួលហ្សែន CRISPR-Cas9។",
    },
    {
      yearEn: "Dec 2023", yearKh: "ធ្នូ ២០២៣",
      titleEn: "Casgevy approved (UK + USA)",
      titleKh: "Casgevy ត្រូវបានអនុម័ត (ចក្រភពអង់គ្លេស + សហរដ្ឋអាមេរិក)",
      bodyEn: "First-ever CRISPR medicine. Cures sickle cell disease and beta-thalassemia with a one-time treatment.",
      bodyKh: "ឱសថ CRISPR ដំបូងបង្អស់។ ព្យាបាលជំងឺឈាមរូបអាក់ និងជំងឺ beta-thalassemia ដោយការព្យាបាលតែម្តង។",
    },
    {
      yearEn: "2024+", yearKh: "២០២៤+",
      titleEn: "Trials in progress",
      titleKh: "ការសាកល្បងកំពុងដំណើរការ",
      bodyEn: "Hereditary blindness, certain cancers, high cholesterol, HIV — early CRISPR trials are showing real results.",
      bodyKh: "ភាពពិការភ្នែកតំណពូជ មហារីកខ្លះ កូឡេស្តេរ៉ុលខ្ពស់ HIV — ការសាកល្បង CRISPR ដំបូងបង្ហាញលទ្ធផលពិតប្រាកដ។",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {cures.map((c, i) => (
        <div key={i} className="rounded-2xl bg-white border-2 border-emerald-100 p-4 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <HeartPulse className="w-4 h-4" />
            </div>
            <span className={`font-mono text-[10px] uppercase tracking-widest text-emerald-800 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? c.yearKh : c.yearEn}
            </span>
          </div>
          <h4 className={`font-display font-bold text-emerald-950 mb-1 ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? c.titleKh : c.titleEn}
          </h4>
          <p className={`text-xs text-slate-600 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? c.bodyKh : c.bodyEn}
          </p>
        </div>
      ))}
    </div>
  );
}

function EthicsNote({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 border-l-4 border-amber-500 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-800 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ការគិតពីសីលធម៌" : "An ethical pause"}
          </div>
          <p className={`text-sm text-amber-950 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ការកែសម្រួល DNA នៃកោសិកានៅក្នុងអ្នកជំងឺម្នាក់ — ដើម្បីព្យាបាលជំងឺ — គឺត្រូវបានទទួលយកយ៉ាងទូលំទូលាយ។ ការកែសម្រួល DNA នៃទារកមួយ ដូច្នេះការផ្លាស់ប្តូរនោះត្រូវបានបញ្ជូនទៅកាន់ជំនាន់ទាំងអស់នាពេលអនាគត — នេះគឺជាបន្ទាត់មួយដែលអ្នកវិទ្យាសាស្ត្រ មនុស្សជាតិ និងច្បាប់នៅតែកំពុងឈ្លោះប្រកែកគ្នា។ ឧបករណ៍ដ៏មានឥទ្ធិពលត្រូវការការវិនិច្ឆ័យដ៏ឈ្លាសវៃ។"
              : "Editing the DNA of cells inside one patient — to cure a disease — is widely accepted. Editing the DNA of an embryo so that the change is passed on to all future generations is a line that scientists, citizens, and lawmakers are still arguing over. A powerful tool demands wise judgement."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative DNA visuals
// ════════════════════════════════════════════════════════════════════════════

function DnaBgPattern({ muted = false }: { muted?: boolean }) {
  // Faint double-helix pattern via SVG
  const opacity = muted ? 0.10 : 0.18;
  const N = 24;
  const rungs = Array.from({ length: N }, (_, i) => i);
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden style={{ opacity }}>
      <defs>
        <path id="helix-top" d="M 0 60 Q 25 20 50 60 T 100 60 T 150 60 T 200 60 T 250 60 T 300 60 T 350 60 T 400 60" stroke="#6ee7b7" strokeWidth="1.5" fill="none" />
        <path id="helix-bot" d="M 0 60 Q 25 100 50 60 T 100 60 T 150 60 T 200 60 T 250 60 T 300 60 T 350 60 T 400 60" stroke="#34d399" strokeWidth="1.5" fill="none" />
      </defs>
      <use href="#helix-top" />
      <use href="#helix-bot" />
      <use href="#helix-top" y="80" />
      <use href="#helix-bot" y="80" />
      {rungs.map((i) => {
        const x = (i / N) * 400;
        const phase = Math.sin((i / N) * Math.PI * 8) * 18;
        return <line key={i} x1={x} y1={60 - phase} x2={x} y2={60 + phase} stroke="#6ee7b7" strokeWidth="0.8" />;
      })}
      {rungs.map((i) => {
        const x = (i / N) * 400;
        const phase = Math.sin((i / N) * Math.PI * 8) * 18;
        return <line key={`b${i}`} x1={x} y1={140 - phase} x2={x} y2={140 + phase} stroke="#6ee7b7" strokeWidth="0.8" />;
      })}
    </svg>
  );
}

function DroughtRiceSVG() {
  return (
    <svg viewBox="0 0 240 200" className="relative w-full h-auto max-w-[240px] drop-shadow" aria-hidden>
      {/* Cracked dry ground */}
      <rect x="0" y="150" width="240" height="50" fill="#92400e" />
      <path d="M 30 160 L 50 195 M 90 155 L 80 195 M 140 165 L 160 195 M 200 158 L 195 195" stroke="#451a03" strokeWidth="1.5" fill="none" />

      {/* Surviving rice plant — green stalks */}
      <g transform="translate(120 150)">
        {[-20, -8, 4, 16].map((dx, i) => (
          <g key={i} transform={`translate(${dx} 0)`}>
            <line x1="0" y1="0" x2="0" y2="-65" stroke="#10b981" strokeWidth="2" />
            {[0, -15, -30, -45].map((y, j) => (
              <ellipse key={j} cx={j % 2 === 0 ? -4 : 4} cy={y - 8} rx="6" ry="2.5" fill="#34d399" transform={`rotate(${j % 2 === 0 ? -25 : 25} ${j % 2 === 0 ? -4 : 4} ${y - 8})`} />
            ))}
            {/* Rice grains at tip */}
            <circle cx="0" cy="-68" r="1.6" fill="#fde68a" />
            <circle cx="-2" cy="-72" r="1.3" fill="#fde68a" />
            <circle cx="2" cy="-72" r="1.3" fill="#fde68a" />
          </g>
        ))}
      </g>

      {/* DNA spliced in — small label */}
      <g transform="translate(40 30)">
        <rect x="-2" y="-2" width="64" height="22" rx="11" fill="#022c1f" stroke="#34d399" strokeWidth="1" />
        <text x="30" y="13" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#6ee7b7">+drought gene</text>
      </g>

      {/* Sun */}
      <circle cx="200" cy="40" r="14" fill="#fde68a" />
      <g stroke="#fde68a" strokeWidth="1.5">
        {[0,45,90,135,180,225,270,315].map((a) => {
          const r1 = 16, r2 = 22;
          const rad = (a * Math.PI) / 180;
          return (
            <line
              key={a}
              x1={200 + Math.cos(rad) * r1}
              y1={40 + Math.sin(rad) * r1}
              x2={200 + Math.cos(rad) * r2}
              y2={40 + Math.sin(rad) * r2}
            />
          );
        })}
      </g>
    </svg>
  );
}
