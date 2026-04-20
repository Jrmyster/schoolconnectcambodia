import { PenLine, BookOpenCheck, Sparkles, Languages } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { ParagraphBuilder } from "@/components/widgets/ParagraphBuilder";
import { GreetingsModule } from "@/components/widgets/GreetingsModule";
import { VocabularyModule } from "@/components/widgets/VocabularyModule";
import { ConnectingWordsBridge } from "@/components/widgets/ConnectingWordsBridge";
import { PunctuationChecker } from "@/components/widgets/PunctuationChecker";
import { SentenceTrain } from "@/components/widgets/SentenceTrain";

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

        {/* The main builder */}
        <div className="mb-10">
          <ParagraphBuilder />
        </div>

        {/* Sentence Train — drag-and-drop S+V+O game for young learners */}
        <div className="mb-10">
          <SentenceTrain />
        </div>

        {/* Introductions & Greetings — for ESL beginners */}
        <div className="mb-10">
          <GreetingsModule />
        </div>

        {/* Everyday Vocabulary — categorized flashcards */}
        <div className="mb-10">
          <VocabularyModule />
        </div>

        {/* Connecting Words — Bridge Builder game */}
        <div className="mb-10">
          <ConnectingWordsBridge />
        </div>

        {/* Punctuation Checker — Traffic Signs game */}
        <div className="mb-10">
          <PunctuationChecker />
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
      </div>
    </div>
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
