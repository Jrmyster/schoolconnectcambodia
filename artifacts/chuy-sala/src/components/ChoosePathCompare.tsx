import { useMemo, useState } from "react";
import {
  Briefcase, GraduationCap, Clock, Wrench, Coins, Hammer,
  Lightbulb, RotateCcw, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, BookOpen,
} from "lucide-react";
import type { ComponentType } from "react";
import { useLanguageStore } from "@/store/use-language";

type Side = "voc" | "uni";

type Row = {
  id: string;
  Icon: ComponentType<{ className?: string }>;
  label: { en: string; kh: string };
  voc:   { en: string; kh: string };
  uni:   { en: string; kh: string };
};

const ROWS: Row[] = [
  {
    id: "duration",
    Icon: Clock,
    label: { en: "Duration",      kh: "រយៈពេល" },
    voc:   { en: "6 months to 2 years", kh: "៦ ខែ ដល់ ២ ឆ្នាំ" },
    uni:   { en: "4+ years",            kh: "៤ ឆ្នាំឡើងទៅ" },
  },
  {
    id: "focus",
    Icon: Wrench,
    label: { en: "Focus",         kh: "ការផ្តោតអារម្មណ៍" },
    voc:   { en: "Practical skills and hands-on work — you learn by doing.",
             kh: "ជំនាញជាក់ស្ដែង និងការងារដោយដៃ — អ្នករៀនតាមរយៈការធ្វើ។" },
    uni:   { en: "Theory, research, and broad knowledge — you learn by thinking.",
             kh: "ទ្រឹស្ដី ការស្រាវជ្រាវ និងចំណេះដឹងទូលំទូលាយ — អ្នករៀនតាមរយៈការគិត។" },
  },
  {
    id: "cost",
    Icon: Coins,
    label: { en: "Cost",          kh: "តម្លៃ" },
    voc:   { en: "Lower tuition, faster entry to earning.",
             kh: "ថ្លៃសិក្សាទាប ចូលរកប្រាក់ចំណូលបានឆាប់។" },
    uni:   { en: "Higher tuition, delayed earning while studying.",
             kh: "ថ្លៃសិក្សាខ្ពស់ ពន្យារពេលរកចំណូលក្នុងពេលរៀន។" },
  },
  {
    id: "jobs",
    Icon: Briefcase,
    label: { en: "Example Jobs",  kh: "ឧទាហរណ៍ការងារ" },
    voc:   { en: "Solar Technician, Mechanic, Electrician, Tailor, Chef.",
             kh: "ជាងតម្លើងសូឡា ជាងជួសជុលរថយន្ត ជាងអគ្គិសនី ជាងកាត់ដេរ ចុងភៅ។" },
    uni:   { en: "Engineer, Doctor, Lawyer, Architect, Professor.",
             kh: "វិស្វករ វេជ្ជបណ្ឌិត មេធាវី ស្ថាបត្យករ សាស្ត្រាចារ្យ។" },
  },
];

type Myth = {
  myth:    { en: string; kh: string };
  reality: { en: string; kh: string };
};

const MYTHS: Myth[] = [
  {
    myth: {
      en: "Vocational jobs pay less.",
      kh: "ការងារវិជ្ជាជីវៈ ទទួលប្រាក់ខែតិច។",
    },
    reality: {
      en: "High-demand technical skills — like specialized welding, solar installation, or coding — often pay more than entry-level office jobs in Cambodia. A skilled welder in Phnom Penh can earn more than a fresh university graduate.",
      kh: "ជំនាញបច្ចេកទេសដែលមានតម្រូវការខ្ពស់ — ដូចជាការផ្សារដែកឯកទេស ការតម្លើងសូឡា ឬការសរសេរកូដ — ច្រើនតែទទួលប្រាក់ខែច្រើនជាងការងារការិយាល័យកម្រិតដំបូងនៅកម្ពុជា។ ជាងផ្សារដែកជំនាញនៅភ្នំពេញ អាចរកប្រាក់ខែបានច្រើនជាងនិស្សិតបញ្ចប់ការសិក្សាថ្មីៗ។",
    },
  },
  {
    myth: {
      en: "A university degree guarantees a good job.",
      kh: "សញ្ញាបត្រសាកលវិទ្យាល័យធានាការងារល្អ។",
    },
    reality: {
      en: "A degree opens doors, but employers also want practical skills, English, and real experience. Many Cambodian graduates spend years finding work that matches their major. Internships and side projects matter as much as grades.",
      kh: "សញ្ញាបត្របើកទ្វារ ប៉ុន្តែនិយោជកក៏ចង់បានជំនាញជាក់ស្ដែង ភាសាអង់គ្លេស និងបទពិសោធន៍ពិតប្រាកដ។ និស្សិតខ្មែរជាច្រើនចំណាយពេលជាច្រើនឆ្នាំ ស្វែងរកការងារដែលត្រូវនឹងជំនាញរបស់ខ្លួន។ កម្មសិក្សា និងគម្រោងផ្ទាល់ខ្លួន មានសារៈសំខាន់ដូចពិន្ទុដែរ។",
    },
  },
  {
    myth: {
      en: "You can only choose one path forever.",
      kh: "អ្នកអាចជ្រើសរើសផ្លូវតែមួយរហូត។",
    },
    reality: {
      en: "Many people start vocational, earn money, and study for a degree later — or finish university and add a vocational skill. The two paths are not enemies; they're tools you can pick up at different points in your life.",
      kh: "មនុស្សជាច្រើនចាប់ផ្ដើមផ្លូវវិជ្ជាជីវៈ រកប្រាក់ហើយរៀនយកសញ្ញាបត្រនៅពេលក្រោយ — ឬបញ្ចប់សាកលវិទ្យាល័យ ហើយបន្ថែមជំនាញវិជ្ជាជីវៈ។ ផ្លូវទាំងពីរមិនមែនជាសត្រូវគ្នាទេ; ពួកវាជាឧបករណ៍ ដែលអ្នកអាចយកប្រើនៅពេលផ្សេងគ្នាក្នុងជីវិតរបស់អ្នក។",
    },
  },
];

type QId = "q1" | "q2" | "q3";
type Answer = "voc" | "uni";

const QUESTIONS: Array<{
  id: QId;
  q: { en: string; kh: string };
  voc: { en: string; kh: string };
  uni: { en: string; kh: string };
}> = [
  {
    id: "q1",
    q:   { en: "Do you prefer working with your hands or with books?",
           kh: "តើអ្នកចូលចិត្តធ្វើការដោយដៃ ឬជាមួយសៀវភៅ?" },
    voc: { en: "Hands — I love building, fixing, and seeing real things move.",
           kh: "ដោយដៃ — ខ្ញុំស្រឡាញ់ការសាងសង់ ការជួសជុល និងការឃើញរបស់ពិតផ្លាស់ប្ដូរ។" },
    uni: { en: "Books — I love reading, thinking, and exploring big ideas.",
           kh: "សៀវភៅ — ខ្ញុំស្រឡាញ់ការអាន ការគិត និងការស្វែងយល់គំនិតធំៗ។" },
  },
  {
    id: "q2",
    q:   { en: "Do you need to start earning money quickly to support your family?",
           kh: "តើអ្នកត្រូវការចាប់ផ្ដើមរកប្រាក់ឆាប់ ដើម្បីផ្គត់ផ្គង់គ្រួសារដែរឬទេ?" },
    voc: { en: "Yes — earning soon is important to me and my family.",
           kh: "ត្រូវ — ការរកប្រាក់ឆាប់ មានសារៈសំខាន់សម្រាប់ខ្ញុំ និងគ្រួសារ។" },
    uni: { en: "No — my family can support me through several years of study.",
           kh: "ទេ — គ្រួសារខ្ញុំអាចគាំទ្រខ្ញុំ ក្នុងរយៈពេលសិក្សាជាច្រើនឆ្នាំ។" },
  },
  {
    id: "q3",
    q:   { en: "Do you enjoy deep theoretical study or practical problem-solving?",
           kh: "តើអ្នកសប្បាយចិត្តនឹងការសិក្សាទ្រឹស្ដីស៊ីជម្រៅ ឬការដោះស្រាយបញ្ហាជាក់ស្ដែង?" },
    voc: { en: "Practical — give me a real problem and let me fix it.",
           kh: "ជាក់ស្ដែង — ផ្ដល់បញ្ហាពិតៗឲ្យខ្ញុំ ហើយទុកឲ្យខ្ញុំដោះស្រាយ។" },
    uni: { en: "Theoretical — I want to understand why things work, deeply.",
           kh: "ទ្រឹស្ដី — ខ្ញុំចង់យល់ឲ្យបានស៊ីជម្រៅ ថាហេតុអ្វីបានជាអ្វីៗដំណើរការ។" },
  },
];

export function ChoosePathCompare() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [answers, setAnswers] = useState<Record<QId, Answer | undefined>>({
    q1: undefined, q2: undefined, q3: undefined,
  });

  const result = useMemo(() => {
    const filled = Object.values(answers).filter(Boolean) as Answer[];
    if (filled.length < QUESTIONS.length) return null;
    const voc = filled.filter(a => a === "voc").length;
    const uni = filled.filter(a => a === "uni").length;
    if (voc > uni) return "voc" as const;
    if (uni > voc) return "uni" as const;
    return "mix" as const;
  }, [answers]);

  function reset() {
    setAnswers({ q1: undefined, q2: undefined, q3: undefined });
  }

  return (
    <div className="rounded-3xl bg-white border-2 border-primary/20 shadow-sm overflow-hidden">
      {/* Masthead */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-amber-50 via-white to-blue-50 border-b border-border">
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-primary/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <BookOpen className="w-3.5 h-3.5" />
          <span>{kh ? "ជ្រើសរើសផ្លូវរបស់អ្នក" : "Choose Your Path"}</span>
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-foreground mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "វិជ្ជាជីវៈ ឬសាកលវិទ្យាល័យ?" : "Vocational vs. University"}
        </h3>
        <p className={`mt-1 text-sm text-muted-foreground max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "ផ្លូវទាំងពីរអាចនាំអ្នកទៅជីវិតដ៏ល្អបាន — ប៉ុន្តែវាមានរូបរាងផ្សេងគ្នា។ ប្រៀបធៀបពួកវាដោយត្រង់ ហើយបន្ទាប់មកសាកល្បងតេស្តរហ័ស ៣ សំណួរនៅខាងក្រោម។"
            : "Both paths can lead to a great life — they just look different. Compare them honestly, then take the quick 3-question quiz below."}
        </p>
      </div>

      {/* Split-screen comparison */}
      <div className="p-4 sm:p-6">
        {/* Sticky path headers */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-3">
          <PathHeader side="voc" kh={kh} />
          <PathHeader side="uni" kh={kh} />
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {ROWS.map(r => (
            <CompareRow key={r.id} row={r} kh={kh} />
          ))}
        </div>
      </div>

      {/* Myth Buster */}
      <div className="px-4 sm:px-6 pb-6">
        <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 overflow-hidden">
          <div className="px-5 py-4 border-b border-amber-200 bg-amber-100/60 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-700 flex-shrink-0" />
            <h4 className={`font-display font-bold text-amber-900 text-base sm:text-lg ${kh ? "font-khmer leading-snug" : ""}`}>
              {kh ? "ការយល់ខុសទូទៅ" : "Common Misconceptions"}
              {kh && <span className="ml-2 text-xs text-amber-700 font-sans font-normal">(Common Misconceptions)</span>}
            </h4>
          </div>
          <div className="divide-y divide-amber-200/70">
            {MYTHS.map((m, i) => (
              <MythRow key={i} myth={m} kh={kh} />
            ))}
          </div>
        </div>
      </div>

      {/* Path Finder Quiz */}
      <div className="border-t-2 border-dashed border-stone-200 bg-stone-50/60 px-4 sm:px-6 py-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-primary" />
          <h4 className={`font-display font-bold text-foreground text-base sm:text-lg ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh ? "តេស្តរកផ្លូវរបស់អ្នក" : "Path Finder Quiz"}
            {kh && <span className="ml-2 text-xs text-stone-500 font-sans font-normal">(Path Finder)</span>}
          </h4>
        </div>
        <p className={`text-xs sm:text-sm text-stone-600 mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "សំណួរ ៣ ខ្លីៗ។ មិនមានចម្លើយខុសទេ — គ្រាន់តែជាការណែនាំចាប់ផ្ដើម។"
            : "3 short questions. There are no wrong answers — just a starting point."}
        </p>

        <div className="space-y-4">
          {QUESTIONS.map((qq, i) => (
            <QuizCard
              key={qq.id}
              index={i + 1}
              question={qq}
              value={answers[qq.id]}
              onChange={(v) => setAnswers((a) => ({ ...a, [qq.id]: v }))}
              kh={kh}
            />
          ))}
        </div>

        {/* Result */}
        <div className={`mt-5 overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          result ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
        }`}>
          {result && <QuizResult result={result} kh={kh} onReset={reset} />}
        </div>

        {!result && (
          <p className={`mt-4 text-xs text-stone-500 italic ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
            {kh
              ? "ឆ្លើយសំណួរទាំង ៣ ដើម្បីមើលការណែនាំចាប់ផ្ដើមរបស់អ្នក។"
              : "Answer all 3 questions to see your suggested starting point."}
          </p>
        )}
      </div>
    </div>
  );
}

function PathHeader({ side, kh }: { side: Side; kh: boolean }) {
  const isVoc = side === "voc";
  const Icon = isVoc ? Hammer : GraduationCap;
  return (
    <div className={`rounded-2xl px-4 py-3 sm:py-4 flex items-center gap-3 border-2 ${
      isVoc
        ? "bg-gradient-to-br from-orange-500 to-amber-500 border-orange-600 text-white"
        : "bg-gradient-to-br from-primary to-[#032EA1] border-primary text-white"
    }`}>
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
        isVoc ? "bg-white/25" : "bg-white/20"
      }`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="min-w-0">
        <div className={`text-[10px] font-mono uppercase tracking-widest opacity-80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? (isVoc ? "ផ្លូវ A" : "ផ្លូវ B") : (isVoc ? "Path A" : "Path B")}
        </div>
        <div className={`font-bold text-sm sm:text-base leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh
            ? (isVoc ? "ផ្លូវវិជ្ជាជីវៈ" : "ផ្លូវសាកលវិទ្យាល័យ")
            : (isVoc ? "Vocational" : "University")}
        </div>
      </div>
    </div>
  );
}

function CompareRow({ row, kh }: { row: Row; kh: boolean }) {
  const Icon = row.Icon;
  return (
    <div className="rounded-2xl border border-border bg-white overflow-hidden">
      {/* Row label */}
      <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 border-b border-border">
        <Icon className="w-4 h-4 text-stone-600" />
        <span className={`text-xs sm:text-sm font-bold uppercase tracking-wide text-stone-700 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
          {kh ? row.label.kh : row.label.en}
          {kh && <span className="ml-2 text-[10px] text-stone-500 font-sans normal-case font-normal tracking-normal">({row.label.en})</span>}
        </span>
      </div>
      {/* Side-by-side cells */}
      <div className="grid grid-cols-2 divide-x divide-border">
        <Cell text={kh ? row.voc.kh : row.voc.en} side="voc" kh={kh} />
        <Cell text={kh ? row.uni.kh : row.uni.en} side="uni" kh={kh} />
      </div>
    </div>
  );
}

function Cell({ text, side, kh }: { text: string; side: Side; kh: boolean }) {
  const isVoc = side === "voc";
  return (
    <div className={`px-4 py-3 sm:py-4 ${isVoc ? "bg-orange-50/50" : "bg-blue-50/50"}`}>
      <div className={`flex items-start gap-2 text-sm sm:text-base ${isVoc ? "text-orange-950" : "text-blue-950"}`}>
        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isVoc ? "bg-orange-600" : "bg-primary"}`} />
        <p className={`flex-1 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>{text}</p>
      </div>
    </div>
  );
}

function MythRow({ myth, kh }: { myth: Myth; kh: boolean }) {
  return (
    <div className="px-5 py-4 grid sm:grid-cols-[auto,1fr] gap-3 sm:gap-5 items-start">
      {/* Myth side */}
      <div className="sm:max-w-[260px]">
        <div className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-rose-700 bg-rose-100 border border-rose-300 rounded px-2 py-0.5 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
          <AlertTriangle className="w-3 h-3" />
          {kh ? "ការយល់ខុស" : "Myth"}
        </div>
        <p className={`text-sm font-bold text-rose-900 line-through decoration-rose-400/60 decoration-2 ${kh ? "font-khmer leading-loose no-underline" : ""}`}>
          {kh ? myth.myth.kh : myth.myth.en}
        </p>
        {kh && (
          <p className="mt-0.5 text-[11px] italic text-stone-500 line-through decoration-stone-300">
            {myth.myth.en}
          </p>
        )}
      </div>
      {/* Reality side */}
      <div>
        <div className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 rounded px-2 py-0.5 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
          <CheckCircle2 className="w-3 h-3" />
          {kh ? "ការពិត" : "Reality"}
        </div>
        <p className={`text-sm sm:text-base text-stone-800 leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}>
          {kh ? myth.reality.kh : myth.reality.en}
        </p>
      </div>
    </div>
  );
}

function QuizCard({
  index, question, value, onChange, kh,
}: {
  index: number;
  question: typeof QUESTIONS[number];
  value: Answer | undefined;
  onChange: (v: Answer) => void;
  kh: boolean;
}) {
  return (
    <div className="rounded-2xl border-2 border-stone-200 bg-white p-4 sm:p-5">
      <div className="flex items-start gap-3 mb-3">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
          {index}
        </span>
        <p className={`text-sm sm:text-base font-bold text-foreground leading-snug ${kh ? "font-khmer text-base leading-snug" : ""}`}>
          {kh ? question.q.kh : question.q.en}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <AnswerOption
          side="voc"
          selected={value === "voc"}
          onClick={() => onChange("voc")}
          text={kh ? question.voc.kh : question.voc.en}
          kh={kh}
        />
        <AnswerOption
          side="uni"
          selected={value === "uni"}
          onClick={() => onChange("uni")}
          text={kh ? question.uni.kh : question.uni.en}
          kh={kh}
        />
      </div>
    </div>
  );
}

function AnswerOption({
  side, selected, onClick, text, kh,
}: { side: Side; selected: boolean; onClick: () => void; text: string; kh: boolean }) {
  const isVoc = side === "voc";
  const base = "rounded-xl px-3.5 py-3 text-left text-sm border-2 transition-all duration-150 active:scale-[0.98] min-h-[64px] flex items-start gap-2";
  const onCls = isVoc
    ? "border-orange-500 bg-orange-50 text-orange-950 shadow-sm"
    : "border-primary bg-blue-50 text-blue-950 shadow-sm";
  const offCls = "border-stone-200 bg-white text-stone-700 hover:border-stone-400";
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`${base} ${selected ? onCls : offCls}`}
    >
      <span className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
        selected
          ? (isVoc ? "border-orange-600 bg-orange-600" : "border-primary bg-primary")
          : "border-stone-300 bg-white"
      }`}>
        {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
      </span>
      <span className={`flex-1 leading-snug ${kh ? "font-khmer leading-loose" : ""}`}>{text}</span>
    </button>
  );
}

function QuizResult({
  result, kh, onReset,
}: { result: "voc" | "uni" | "mix"; kh: boolean; onReset: () => void }) {
  const meta = (() => {
    if (result === "voc") {
      return {
        Icon: Hammer,
        cls: "from-orange-500 to-amber-500 border-orange-600",
        soft: "from-orange-50 to-amber-50 border-orange-300",
        text: "text-orange-950",
        title:    { en: "Suggested Starting Point: Vocational",
                    kh: "ការណែនាំចាប់ផ្ដើម៖ ផ្លូវវិជ្ជាជីវៈ" },
        body: {
          en: "You learn best by doing, you'd like to start earning soon, and real problems excite you. Look at TVET institutes (technical and vocational training) — solar, electrical, IT support, automotive, hospitality. You can always add a degree later if you want to grow further.",
          kh: "អ្នករៀនបានល្អតាមរយៈការធ្វើ អ្នកចង់ចាប់ផ្ដើមរកប្រាក់ឆាប់ ហើយបញ្ហាពិតៗធ្វើឲ្យអ្នករំភើប។ មើលវិទ្យាស្ថានបណ្តុះបណ្តាលបច្ចេកទេស និងវិជ្ជាជីវៈ (TVET) — សូឡា អគ្គិសនី ជំនួយ IT រថយន្ត និងបដិសណ្ឋារកិច្ច។ អ្នកតែងតែអាចបន្ថែមសញ្ញាបត្រនៅពេលក្រោយ ប្រសិនបើអ្នកចង់រីកលូតលាស់ថែមទៀត។",
        },
      };
    }
    if (result === "uni") {
      return {
        Icon: GraduationCap,
        cls: "from-primary to-[#032EA1] border-primary",
        soft: "from-blue-50 to-sky-50 border-blue-300",
        text: "text-blue-950",
        title:    { en: "Suggested Starting Point: University",
                    kh: "ការណែនាំចាប់ផ្ដើម៖ ផ្លូវសាកលវិទ្យាល័យ" },
        body: {
          en: "You enjoy thinking deeply, your family can support a longer study runway, and you're comfortable with theory. Look at bachelor's programmes that match your interests — engineering, medicine, business, computer science. Add internships early so theory meets practice.",
          kh: "អ្នកសប្បាយចិត្តនឹងការគិតស៊ីជម្រៅ គ្រួសារអ្នកអាចគាំទ្រការសិក្សារយៈពេលវែង ហើយអ្នកស្រួលជាមួយទ្រឹស្ដី។ មើលកម្មវិធីបរិញ្ញាបត្រ ដែលត្រូវនឹងចំណាប់អារម្មណ៍របស់អ្នក — វិស្វកម្ម វេជ្ជសាស្ត្រ ពាណិជ្ជកម្ម វិទ្យាសាស្ត្រកុំព្យូទ័រ។ បន្ថែមកម្មសិក្សាពីដំបូង ដើម្បីឲ្យទ្រឹស្ដីជួបការអនុវត្ត។",
        },
      };
    }
    return {
      Icon: Sparkles,
      cls: "from-violet-500 to-fuchsia-500 border-violet-600",
      soft: "from-violet-50 to-fuchsia-50 border-violet-300",
      text: "text-violet-950",
      title:    { en: "Suggested Starting Point: A Hybrid Path",
                  kh: "ការណែនាំចាប់ផ្ដើម៖ ផ្លូវចម្រុះ" },
      body: {
        en: "You're balanced between hands and head — and that's a strength. Consider an associate degree, a polytechnic, or a vocational certificate followed by part-time university. In Cambodia, many of the most employable young people have both a trade skill and a degree.",
        kh: "អ្នកមានតុល្យភាពរវាងដៃ និងគំនិត — នោះគឺជាចំណុចខ្លាំង។ សូមពិចារណាសញ្ញាបត្រសហការី វិទ្យាស្ថានពហុបច្ចេកទេស ឬវិញ្ញាបនបត្រវិជ្ជាជីវៈ បន្ទាប់ដោយសាកលវិទ្យាល័យក្រៅម៉ោង។ នៅកម្ពុជា យុវជនដែលមានឱកាសការងារខ្ពស់បំផុតភាគច្រើន មានទាំងជំនាញវិជ្ជាជីវៈ និងសញ្ញាបត្រ។",
      },
    };
  })();
  const Icon = meta.Icon;
  return (
    <div className={`rounded-2xl border-2 bg-gradient-to-br ${meta.soft} overflow-hidden`}>
      <div className={`flex items-center gap-3 px-5 py-3 bg-gradient-to-r ${meta.cls} text-white`}>
        <Icon className="w-5 h-5" />
        <h5 className={`font-display font-bold text-sm sm:text-base ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? meta.title.kh : meta.title.en}
        </h5>
      </div>
      <div className="px-5 py-4">
        <p className={`text-sm sm:text-base ${meta.text} leading-relaxed ${kh ? "font-khmer text-base leading-loose" : ""}`}>
          {kh ? meta.body.kh : meta.body.en}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className={`text-xs text-stone-600 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "ចង់សាកល្បងម្ដងទៀតជាមួយចម្លើយផ្សេង?"
              : "Want to try again with different answers?"}
          </p>
          <button
            onClick={onReset}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-stone-700 border border-stone-300 hover:bg-stone-100 transition ${kh ? "font-khmer" : ""}`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {kh ? "ចាប់ផ្ដើមឡើងវិញ" : "Reset"}
          </button>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-stone-500">
          <ArrowRight className="w-3 h-3" />
          <span className={kh ? "font-khmer leading-loose" : ""}>
            {kh
              ? "បន្ទាប់៖ មើល 'ម៉ាទ្រីសស្វែងរកអាជីព' ខាងលើ ហើយ 'ជីវិតប្រចាំថ្ងៃ' ខាងក្រោម។"
              : "Next: explore the Career Discovery Matrix above and the Day in the Life gallery below."}
          </span>
        </div>
      </div>
    </div>
  );
}
