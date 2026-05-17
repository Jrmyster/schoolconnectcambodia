import { PenLine, BookOpenCheck, Sparkles, Languages, Feather, Quote, ScrollText } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { ParagraphBuilder } from "@/components/widgets/ParagraphBuilder";
import { GrammarToolbox } from "@/components/widgets/GrammarToolbox";
import { GreetingsModule } from "@/components/widgets/GreetingsModule";
import { VocabularyModule } from "@/components/widgets/VocabularyModule";
import { ConnectingWordsBridge } from "@/components/widgets/ConnectingWordsBridge";
import { PunctuationChecker } from "@/components/widgets/PunctuationChecker";
import { SentenceTrain } from "@/components/widgets/SentenceTrain";
import { LocalMarketCounter } from "@/components/widgets/LocalMarketCounter";
import { ComparativeSuperlativeModule } from "@/components/widgets/ComparativeSuperlativeModule";
import { PronunciationAssistant } from "@/components/widgets/PronunciationAssistant";
import { FamilyVocabularyModule } from "@/components/widgets/FamilyVocabularyModule";
import { WaterVerbsModule } from "@/components/widgets/WaterVerbsModule";
import { WordOfTheDay } from "@/components/widgets/WordOfTheDay";

export function EnglishWritingPage() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-background to-orange-50/30 py-8 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-200 mb-4">
            <PenLine className="w-7 h-7 text-amber-700" />
          </div>
          <div className={`text-[11px] font-mono uppercase tracking-[0.25em] text-amber-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "មជ្ឈមណ្ឌលសិក្សា" : "Study Center"}
          </div>
          <h1 className={`font-display text-3xl sm:text-4xl font-bold text-foreground mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh ? "ការសរសេរភាសាអង់គ្លេស" : "English Writing"}
            {kh && <span className="ml-2 text-base text-muted-foreground font-sans font-normal">(English Writing)</span>}
          </h1>
          <p className={`mt-2 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "សាងសង់ជំនាញសរសេរភាសាអង់គ្លេសរបស់អ្នកម្ដងមួយប្រយោគ — ដោយប្រើឧបករណ៍សាមញ្ញ ច្បាស់លាស់ និងមានព័ត៌មានជាពីរភាសា។"
              : "Build your English writing skills one sentence at a time — with simple, clear, bilingual tools."}
          </p>
        </div>

        {/* Word of the Day */}
        <WordOfTheDay />

        {/* Pronunciation Assistant — Web Speech API powered audio tool */}
        <div className="mb-10">
          <PronunciationAssistant />
        </div>

        {/* Grammar Toolbox — foundational primer on the 8 parts of speech */}
        <div className="mb-10">
          <GrammarToolbox />
        </div>

        {/* The main builder */}
        <div className="mb-10">
          <ParagraphBuilder />
        </div>

        {/* Sentence Train — drag-and-drop S+V+O game for young learners */}
        <div className="mb-10">
          <SentenceTrain />
        </div>

        {/* Local Market Counter — beginner English + Math counting game */}
        <div className="mb-10">
          <LocalMarketCounter />
        </div>

        {/* Introductions & Greetings — for ESL beginners */}
        <div className="mb-10">
          <GreetingsModule />
        </div>

        {/* Everyday Vocabulary — categorized flashcards */}
        <div className="mb-10">
          <VocabularyModule />
        </div>

        {/* Family & Relatives — bilingual ESL vocabulary with audio */}
        <div className="mb-10">
          <FamilyVocabularyModule />
        </div>

        {/* Water Actions — bilingual ESL vocabulary on liquid action verbs */}
        <div className="mb-10">
          <WaterVerbsModule />
        </div>

        {/* Connecting Words — Bridge Builder game */}
        <div className="mb-10">
          <ConnectingWordsBridge />
        </div>

        {/* Punctuation Checker — Traffic Signs game */}
        <div className="mb-10">
          <PunctuationChecker />
        </div>

        {/* Comparing the World — Comparative & Superlative Adjectives lesson */}
        <div className="mb-10">
          <ComparativeSuperlativeModule />
        </div>

        {/* Quick tips strip */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <TipCard
            kh={kh}
            Icon={BookOpenCheck}
            color="amber"
            titleEn="Read every day"
            titleKh="អានរាល់ថ្ងៃ"
            bodyEn="Even 10 minutes of English reading helps your writing improve. Try short stories or news headlines."
            bodyKh="ការអានភាសាអង់គ្លេស ១០ នាទីក្នុងមួយថ្ងៃ ក៏អាចជួយឱ្យការសរសេររបស់អ្នកប្រសើរឡើង។ សាកល្បងរឿងខ្លីៗ ឬចំណងជើងព័ត៌មាន។"
          />
          <TipCard
            kh={kh}
            Icon={Sparkles}
            color="emerald"
            titleEn="Use transition words"
            titleKh="ប្រើពាក្យបន្ត"
            bodyEn="Words like First, Also, Because, Finally help your reader follow your ideas smoothly."
            bodyKh="ពាក្យដូចជា First, Also, Because, Finally ជួយឱ្យអ្នកអានតាមដានគំនិតរបស់អ្នកបានដោយរលូន។"
          />
          <TipCard
            kh={kh}
            Icon={Languages}
            color="sky"
            titleEn="Think in English"
            titleKh="គិតជាភាសាអង់គ្លេស"
            bodyEn="Try forming the sentence in English first, instead of translating from Khmer word-by-word."
            bodyKh="សាកល្បងបង្កើតប្រយោគជាភាសាអង់គ្លេសមុន ជាជាងបកប្រែពីខ្មែរម្ដងមួយពាក្យ។"
          />
        </div>

        {/* Masters of the English Language — closing classical section */}
        <MastersOfEnglish kh={kh} />
      </div>
    </div>
  );
}

const PARCHMENT_BG: React.CSSProperties = {
  backgroundColor: "#fbf6e9",
  backgroundImage: [
    "radial-gradient(ellipse at top left, rgba(180, 130, 60, 0.10), transparent 55%)",
    "radial-gradient(ellipse at bottom right, rgba(120, 80, 30, 0.10), transparent 55%)",
    "radial-gradient(circle at 20% 80%, rgba(140, 90, 30, 0.06), transparent 40%)",
    "radial-gradient(circle at 80% 20%, rgba(140, 90, 30, 0.06), transparent 40%)",
  ].join(", "),
};

function MastersOfEnglish({ kh }: { kh: boolean }) {
  return (
    <section
      data-testid="masters-of-english"
      aria-labelledby="masters-heading"
      className="mt-12 mb-4 rounded-3xl border-2 border-amber-900/20 shadow-[0_8px_30px_-12px_rgba(120,80,30,0.25)] overflow-hidden"
      style={PARCHMENT_BG}
    >
      {/* Section header */}
      <div className="px-6 sm:px-10 pt-8 sm:pt-10 pb-4 text-center border-b border-amber-900/15">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-900/10 border border-amber-900/30 mb-3">
          <Feather className="w-6 h-6 text-amber-900" />
        </div>
        <div className={`text-[11px] font-mono uppercase tracking-[0.3em] text-amber-800/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? "ផ្នែកបិទបញ្ចប់" : "Closing Chapter"}
        </div>
        <h2
          id="masters-heading"
          className={`font-serif text-2xl sm:text-3xl font-bold text-amber-950 mt-1 italic ${kh ? "font-khmer not-italic leading-snug" : ""}`}
        >
          {kh ? "កំពូលអ្នកប្រាជ្ញផ្នែកភាសាអង់គ្លេស" : "Masters of the English Language"}
          {kh && (
            <span className="ml-2 text-base text-amber-800/70 font-sans font-normal not-italic">
              (Masters of the English Language)
            </span>
          )}
        </h2>
        <p className={`mt-2 max-w-2xl mx-auto text-sm text-amber-900/70 ${kh ? "font-khmer leading-loose" : "font-serif italic"}`}>
          {kh
            ? "សូមជួបជាមួយអ្នកនិពន្ធពីរនាក់ ដែលបានកសាងភាសាអង់គ្លេសសម័យទំនើប — តាមរយៈពាក្យ និងគំនិតរបស់ពួកគេ។"
            : "Meet two writers who shaped the modern English language — through their words and their ideas."}
        </p>
      </div>

      {/* Split-card layout */}
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-amber-900/15">
        <MasterCard
          kh={kh}
          monogram="W.S."
          dates="1564 – 1616"
          nameEn="William Shakespeare"
          nameKh="វីលៀម សេកស្ពៀរ"
          tagEn="The Inventor of Words"
          tagKh="អ្នកបង្កើតពាក្យ"
          ideaEn="Shakespeare didn't just write plays; he literally invented over 1,700 words we use every day (like 'lonely', 'bedroom', and 'swagger') because the old English language wasn't big enough for his ideas."
          ideaKh="សេកស្ពៀរមិនត្រឹមតែសរសេររឿងល្ខោនប៉ុណ្ណោះទេ គាត់បានបង្កើតពាក្យជាង ១៧០០ ម៉ាត់ដែលយើងប្រើប្រាស់សព្វថ្ងៃ (ដូចជា 'lonely', 'bedroom', និង 'swagger') ដោយសារភាសាអង់គ្លេសចាស់មិនធំល្មមសម្រាប់គំនិតរបស់គាត់។"
          works={["Romeo and Juliet", "Hamlet", "Macbeth"]}
          quote="To be, or not to be, that is the question."
          modernEn="Should I keep on living, or end my life? That is the big question I am asking myself."
          modernKh="តើខ្ញុំគួររស់នៅបន្ត ឬបញ្ចប់ជីវិតខ្លួនឯង? នេះជាសំណួរដ៏ធំដែលខ្ញុំកំពុងសួរខ្លួនឯង។"
        />
        <MasterCard
          kh={kh}
          monogram="J.M."
          dates="1608 – 1674"
          nameEn="John Milton"
          nameKh="ចន មីលតុន"
          tagEn="The Epic Architect"
          tagKh="ស្ថាបត្យករកំណាព្យវីរកថា"
          ideaEn="Milton went blind later in life, but he still wrote the greatest epic poem in the English language entirely from memory, exploring the ultimate cosmic battle between freedom, rebellion, and authority."
          ideaKh="មីលតុនបានពិការភ្នែកនៅចុងបញ្ចប់នៃជីវិតរបស់គាត់ ប៉ុន្តែគាត់នៅតែអាចសរសេរកំណាព្យវីរកថាដ៏អស្ចារ្យបំផុតក្នុងភាសាអង់គ្លេសទាំងស្រុងពីការចងចាំ ដោយរុករកសមរភូមិចក្រវាលរវាងសេរីភាព ការបះបោរ និងអំណាច។"
          works={["Paradise Lost"]}
          quote="The mind is its own place, and in itself can make a heaven of hell, a hell of heaven."
          modernEn="Your mind decides your reality. With the right thoughts, even a terrible place can feel like paradise — and a wonderful place can feel like torment."
          modernKh="ចិត្តរបស់អ្នកជាអ្នកសម្រេចលើការពិតរបស់អ្នក។ ដោយគំនិតត្រឹមត្រូវ សូម្បីតែទីកន្លែងដ៏អាក្រក់ក៏អាចមានអារម្មណ៍ដូចឋានសួគ៌ ហើយទីកន្លែងដ៏ល្អក៏អាចមានអារម្មណ៍ដូចនរក។"
        />
      </div>

      {/* Footer flourish */}
      <div className={`px-6 py-4 text-center text-xs text-amber-900/60 border-t border-amber-900/15 ${kh ? "font-khmer leading-loose" : "font-serif italic"}`}>
        {kh
          ? "ដាក់ទស្សន៍កណ្ដុរលើសម្រង់ខាងលើ ដើម្បីបកប្រែជាភាសាអង់គ្លេសសម័យទំនើប និងភាសាខ្មែរ។"
          : "Hover over the quotes above to decode them into modern English and Khmer."}
      </div>
    </section>
  );
}

function MasterCard({
  kh, monogram, dates, nameEn, nameKh, tagEn, tagKh, ideaEn, ideaKh, works, quote, modernEn, modernKh,
}: {
  kh: boolean;
  monogram: string;
  dates: string;
  nameEn: string;
  nameKh: string;
  tagEn: string;
  tagKh: string;
  ideaEn: string;
  ideaKh: string;
  works: string[];
  quote: string;
  modernEn: string;
  modernKh: string;
}) {
  return (
    <article className="p-6 sm:p-8 flex flex-col">
      {/* Portrait medallion + name */}
      <div className="flex items-center gap-4 mb-4">
        <div
          aria-hidden
          className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-900/40 shadow-inner flex items-center justify-center font-serif italic text-amber-900 text-xl font-bold"
        >
          {monogram}
        </div>
        <div className="min-w-0">
          <h3 className={`font-serif text-xl sm:text-2xl font-bold text-amber-950 leading-tight ${kh ? "font-khmer not-italic" : ""}`}>
            {kh ? nameKh : nameEn}
            {kh && <span className="ml-1.5 text-sm font-normal text-amber-800/70 font-sans">({nameEn})</span>}
          </h3>
          <div className={`text-[11px] uppercase tracking-widest text-amber-800/70 mt-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : "font-serif"}`}>
            {dates} · <span className="italic">{kh ? tagKh : tagEn}</span>
            {kh && <span className="ml-1 not-italic font-sans">({tagEn})</span>}
          </div>
        </div>
      </div>

      {/* The Big Idea */}
      <div className="mb-5">
        <div className={`text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700/80 mb-1.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? "គំនិតធំ" : "The Big Idea"}
        </div>
        <p className={`text-sm text-amber-950/85 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? ideaKh : ideaEn}
        </p>
      </div>

      {/* Famous Works chips */}
      <div className="mb-5">
        <div className={`text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700/80 mb-2 inline-flex items-center gap-1.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <ScrollText className="w-3.5 h-3.5" />
          {kh ? "ស្នាដៃល្បីៗ" : "Famous Works"}
        </div>
        <ul className="flex flex-wrap gap-2">
          {works.map((w) => (
            <li
              key={w}
              className="font-serif italic text-sm px-3 py-1 rounded-full bg-amber-100/70 border border-amber-900/25 text-amber-900"
            >
              {w}
            </li>
          ))}
        </ul>
      </div>

      {/* Famous Quote with Decoder tooltip */}
      <div className="mt-auto">
        <div className={`text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? "សម្រង់ល្បី (ដាក់ទស្សន៍កណ្ដុរ ឬចុចដើម្បីបកប្រែ)" : "Famous Quote (hover or focus to decode)"}
        </div>

        <div className="relative group">
          <button
            type="button"
            data-testid="quote-decoder-trigger"
            aria-label={kh ? "បកប្រែសម្រង់នេះ" : "Decode this quote"}
            className="w-full text-left rounded-xl border border-amber-900/25 bg-white/60 px-4 py-3 cursor-help focus:outline-none focus:ring-2 focus:ring-amber-700/50 hover:bg-white/80 hover:border-amber-900/40 transition-colors"
          >
            <Quote className="w-4 h-4 text-amber-700/70 mb-1" />
            <p className="font-serif italic text-base sm:text-lg text-amber-950 leading-snug">
              "{quote}"
            </p>
          </button>

          {/* Decoder tooltip — visible on hover/focus-within */}
          <div
            role="tooltip"
            data-testid="quote-decoder-tooltip"
            className="pointer-events-none absolute z-20 left-1/2 -translate-x-1/2 bottom-full mb-3 w-[min(22rem,90vw)] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200"
          >
            <div className="rounded-xl border border-amber-900/30 bg-amber-950 text-amber-50 shadow-xl p-4 text-left">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300/80 mb-1">
                Modern English
              </div>
              <p className="text-sm leading-relaxed mb-3">{modernEn}</p>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300/80 mb-1">
                ភាសាខ្មែរ
              </div>
              <p className="font-khmer text-sm leading-loose">{modernKh}</p>
              {/* Caret */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-amber-950 border-r border-b border-amber-900/30" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function TipCard({
  Icon, color, titleEn, titleKh, bodyEn, bodyKh, kh,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  color: "amber" | "emerald" | "sky";
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  kh: boolean;
}) {
  const tone = {
    amber:   "bg-amber-50  border-amber-200  text-amber-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
    sky:     "bg-sky-50    border-sky-200    text-sky-900",
  }[color];
  const iconTone = {
    amber: "text-amber-600", emerald: "text-emerald-600", sky: "text-sky-600",
  }[color];
  return (
    <div className={`rounded-2xl border-2 p-4 ${tone}`}>
      <Icon className={`w-5 h-5 ${iconTone}`} />
      <h4 className={`mt-2 font-bold text-sm ${kh ? "font-khmer" : ""}`}>
        {kh ? titleKh : titleEn}
        {kh && <span className="ml-1.5 text-[11px] font-normal opacity-70 font-sans">({titleEn})</span>}
      </h4>
      <p className={`mt-1 text-xs leading-relaxed opacity-90 ${kh ? "font-khmer text-sm leading-loose" : ""}`}>
        {kh ? bodyKh : bodyEn}
      </p>
    </div>
  );
}
