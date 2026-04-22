import { useMemo, useState } from "react";
import {
  TrafficCone, Check, X, RefreshCw, ArrowRight, AlertTriangle, Sparkles,
  Octagon, Triangle, RectangleHorizontal, Trophy,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────
 * Punctuation Checker: Traffic Signs
 * កម្មវិធីពិនិត្យសញ្ញាវណ្ណយុត្តិ
 * Click-to-place workspace (also supports HTML5 drag on desktop) where
 * students fix missing punctuation in bilingual sentences. Built around
 * the common ESL trap of putting a comma before "however" / "therefore".
 * ────────────────────────────────────────────────────────────────────── */

type Mark = "," | "." | ";";

type SignInfo = {
  mark: Mark;
  signEn: string; signKh: string;
  ruleEn: string; ruleKh: string;
  exampleEn: string; exampleKh: string;
  tone: { card: string; sign: string; text: string };
  Icon: React.ComponentType<{ className?: string }>;
};

const SIGNS: SignInfo[] = [
  {
    mark: ",",
    signEn: "Slow Down",
    signKh: "បន្ថយល្បឿន",
    ruleEn: "The COMMA — a small pause. Use it before light connecting words: and, but, so, or.",
    ruleKh: "សញ្ញាក្បៀស — ការផ្អាកតិចតួច។ ប្រើមុនពាក្យភ្ជាប់ស្រាល៖ and, but, so, or។",
    exampleEn: "I was tired, but I finished my work.",
    exampleKh: "ខ្ញុំនឿយហត់ ប៉ុន្តែខ្ញុំបញ្ចប់ការងាររបស់ខ្ញុំ។",
    tone: { card: "from-amber-50 to-yellow-100 border-amber-400", sign: "bg-amber-400 text-amber-950", text: "text-amber-900" },
    Icon: Triangle,
  },
  {
    mark: ".",
    signEn: "STOP",
    signKh: "ឈប់",
    ruleEn: "The PERIOD — a full stop. It ends a complete thought.",
    ruleKh: "សញ្ញាខណ្ឌ — ការឈប់ពេញលេញ។ វាបញ្ចប់គំនិតពេញលេញមួយ។",
    exampleEn: "The bus is late. We will wait.",
    exampleKh: "ឡានក្រុងមកយឺត។ យើងនឹងរង់ចាំ។",
    tone: { card: "from-rose-50 to-red-100 border-rose-400", sign: "bg-rose-600 text-white", text: "text-rose-900" },
    Icon: Octagon,
  },
  {
    mark: ";",
    signEn: "Super Comma",
    signKh: "សញ្ញាក្បៀសខ្លាំង",
    ruleEn: "The SEMICOLON — links two related sentences. Required before HEAVY words like 'however' and 'therefore'.",
    ruleKh: "សញ្ញាបញ្ឈប់ — ភ្ជាប់ឃ្លាពាក់ព័ន្ធពីរ។ តម្រូវនៅមុនពាក្យធ្ងន់ៗដូចជា 'however' និង 'therefore'។",
    exampleEn: "She studied hard; therefore, she passed.",
    exampleKh: "នាងសិក្សាខ្លាំង; ដូច្នេះនាងបានប្រឡងជាប់។",
    tone: { card: "from-sky-50 to-blue-100 border-sky-400", sign: "bg-sky-600 text-white", text: "text-sky-900" },
    Icon: RectangleHorizontal,
  },
];

const SIGN_BY_MARK = new Map<Mark, SignInfo>(SIGNS.map((s) => [s.mark, s]));

/* ── Sentence challenge bank ─────────────────────────────────────────── */
type Slot = { expected: Mark; trapBefore?: string }; // trapBefore = the word right after this slot if heavy
type Challenge = {
  id: string;
  /** Pieces of text alternating with slot positions. parts.length = slots.length + 1 */
  partsEn: string[];
  partsKh: string[];
  slots: Slot[];
  hintEn: string; hintKh: string;
};

const CHALLENGES: Challenge[] = [
  {
    id: "rain-therefore",
    partsEn: ["It rained heavily", " therefore", " the roads were flooded", ""],
    partsKh: ["ភ្លៀងធ្លាក់ខ្លាំង", " ដូច្នេះ", " ផ្លូវត្រូវលិចទឹក", ""],
    slots: [
      { expected: ";", trapBefore: "therefore" },
      { expected: "," },
      { expected: "." },
    ],
    hintEn: "Heavy word ahead. The first slot needs the Super Comma.",
    hintKh: "ពាក្យធ្ងន់ខាងមុខ។ ប្រឡោះទីមួយត្រូវការសញ្ញាបញ្ឈប់។",
  },
  {
    id: "studied-however",
    partsEn: ["She studied hard", " however", " she failed the test", ""],
    partsKh: ["នាងសិក្សាខ្លាំង", " ប៉ុន្តែ", " នាងធ្លាក់ការប្រឡង", ""],
    slots: [
      { expected: ";", trapBefore: "however" },
      { expected: "," },
      { expected: "." },
    ],
    hintEn: "'However' is heavy — it cannot stand on a tiny comma.",
    hintKh: "'However' ជាពាក្យធ្ងន់ — វាមិនអាចឈរលើសញ្ញាក្បៀសតូចបានទេ។",
  },
  {
    id: "rice-noodles",
    partsEn: ["I like rice", " and I like noodles", ""],
    partsKh: ["ខ្ញុំចូលចិត្តបាយ", " ហើយខ្ញុំចូលចិត្តមី", ""],
    slots: [{ expected: "," }, { expected: "." }],
    hintEn: "'And' is a light word — a small pause is enough.",
    hintKh: "'And' ជាពាក្យស្រាល — ការផ្អាកតូចគឺគ្រប់គ្រាន់។",
  },
  {
    id: "tired-finished",
    partsEn: ["I was tired", " but I finished my homework", ""],
    partsKh: ["ខ្ញុំនឿយហត់", " ប៉ុន្តែខ្ញុំបញ្ចប់កិច្ចការផ្ទះ", ""],
    slots: [{ expected: "," }, { expected: "." }],
    hintEn: "'But' is light. Light = comma.",
    hintKh: "'But' ស្រាល។ ស្រាល = សញ្ញាក្បៀស។",
  },
  {
    id: "exam-difficult",
    partsEn: ["The exam was very difficult", " however", " everyone passed", ""],
    partsKh: ["ការប្រឡងពិបាកខ្លាំង", " ប៉ុន្តែ", " មនុស្សគ្រប់គ្នាប្រឡងជាប់", ""],
    slots: [
      { expected: ";", trapBefore: "however" },
      { expected: "," },
      { expected: "." },
    ],
    hintEn: "Heavy word incoming — use the Super Comma.",
    hintKh: "ពាក្យធ្ងន់ខាងមុខ — ប្រើសញ្ញាបញ្ឈប់។",
  },
  {
    id: "saved-bicycle",
    partsEn: ["He saved money for months", " so he bought a new bicycle", ""],
    partsKh: ["គាត់សន្សំប្រាក់ច្រើនខែ", " ដូច្នេះគាត់ទិញកង់ថ្មី", ""],
    slots: [{ expected: "," }, { expected: "." }],
    hintEn: "'So' is light — small pause.",
    hintKh: "'So' ស្រាល — ផ្អាកតូច។",
  },
  {
    id: "small-strong",
    partsEn: ["He is small", " but he is very strong", ""],
    partsKh: ["គាត់តូច", " ប៉ុន្តែគាត់រឹងមាំខ្លាំង", ""],
    slots: [{ expected: "," }, { expected: "." }],
    hintEn: "Light contrast — 'but' takes a comma.",
    hintKh: "ការផ្ទុយស្រាល — 'but' យកសញ្ញាក្បៀស។",
  },
  {
    id: "fish-amok",
    partsEn: ["The fish was fresh", " therefore", " Mom cooked amok for dinner", ""],
    partsKh: ["ត្រីស្រស់", " ដូច្នេះ", " ម្ដាយចម្អិនអាម៉ុកសម្រាប់ពេលល្ងាច", ""],
    slots: [
      { expected: ";", trapBefore: "therefore" },
      { expected: "," },
      { expected: "." },
    ],
    hintEn: "'Therefore' = heavy. Always Semicolon or Period before it.",
    hintKh: "'Therefore' = ធ្ងន់។ ប្រើសញ្ញាបញ្ឈប់ ឬសញ្ញាខណ្ឌមុនវា។",
  },
  {
    id: "homework-done",
    partsEn: ["My homework is done", ""],
    partsKh: ["កិច្ចការផ្ទះរបស់ខ្ញុំរួចហើយ", ""],
    slots: [{ expected: "." }],
    hintEn: "Complete thought — close it with a Stop.",
    hintKh: "គំនិតពេញលេញ — បិទវាដោយសញ្ញាឈប់។",
  },

  /* ── Expansion pack: 11 additional bilingual challenges ────────────── */
  // List — comma, comma, period
  {
    id: "rice-fish-water",
    partsEn: ["I bought rice", " fish", " and water", ""],
    partsKh: ["ខ្ញុំបានទិញបាយ", " ត្រី", " និងទឹក", ""],
    slots: [{ expected: "," }, { expected: "," }, { expected: "." }],
    hintEn: "List of three items — separate with commas, end with a Stop.",
    hintKh: "បញ្ជីវត្ថុបីយ៉ាង — បំបែកដោយសញ្ញាក្បៀស ហើយបញ្ចប់ដោយសញ្ញាខណ្ឌ។",
  },
  // Two independent clauses joined — semicolon, period
  {
    id: "sun-shade",
    partsEn: ["The sun is very hot", " we should rest in the shade", ""],
    partsKh: ["ព្រះអាទិត្យក្តៅខ្លាំងណាស់", " យើងគួរតែសម្រាកនៅក្រោមម្លប់", ""],
    slots: [{ expected: ";" }, { expected: "." }],
    hintEn: "Two complete thoughts joined together — link them with the Super Comma.",
    hintKh: "គំនិតពេញលេញពីរត្រូវភ្ជាប់គ្នា — ប្រើសញ្ញាក្បៀសខ្លាំង។",
  },
  // Introductory clause — comma, period
  {
    id: "before-football",
    partsEn: ["Before we play football", " we must finish our homework", ""],
    partsKh: ["មុនពេលយើងលេងបាល់ទាត់", " យើងត្រូវតែធ្វើកិច្ចការផ្ទះឱ្យរួចរាល់", ""],
    slots: [{ expected: "," }, { expected: "." }],
    hintEn: "An opening clause needs a small pause before the main idea.",
    hintKh: "ឃ្លាបើកត្រូវការការផ្អាកតិចតួចមុនគំនិតមេ។",
  },
  // Two independent clauses — semicolon, period
  {
    id: "sophak-teacher",
    partsEn: ["Sophak is an English teacher", " he also grows rice", ""],
    partsKh: ["សុភ័ក្រ្តគឺជាគ្រូបង្រៀនភាសាអង់គ្លេស", " គាត់ក៏ដាំស្រូវផងដែរ", ""],
    slots: [{ expected: ";" }, { expected: "." }],
    hintEn: "Two related complete sentences — bind them with the Super Comma.",
    hintKh: "ប្រយោគពេញលេញពីរពាក់ព័ន្ធ — ភ្ជាប់ដោយសញ្ញាបញ្ឈប់ខ្លាំង។",
  },
  // Simple sentence — period only
  {
    id: "buffalo-sleeping",
    partsEn: ["The water buffalo is sleeping", ""],
    partsKh: ["សត្វក្របីកំពុងដេក", ""],
    slots: [{ expected: "." }],
    hintEn: "One complete thought — close it with a Stop.",
    hintKh: "គំនិតពេញលេញមួយ — បិទវាដោយសញ្ញាឈប់។",
  },
  // List — comma, comma, period
  {
    id: "mother-fruit",
    partsEn: ["My mother sells mangoes", " bananas", " and papayas", ""],
    partsKh: ["ម្តាយរបស់ខ្ញុំលក់ស្វាយ", " ចេក", " និងល្ហុង", ""],
    slots: [{ expected: "," }, { expected: "," }, { expected: "." }],
    hintEn: "Three items in a list — commas between, period at the end.",
    hintKh: "បីវត្ថុក្នុងបញ្ជី — សញ្ញាក្បៀសរវាង សញ្ញាខណ្ឌចុងបញ្ចប់។",
  },
  // Two independent clauses — semicolon, period
  {
    id: "english-math",
    partsEn: ["I like learning English", " my brother likes learning math", ""],
    partsKh: ["ខ្ញុំចូលចិត្តរៀនភាសាអង់គ្លេស", " បងប្រុសរបស់ខ្ញុំចូលចិត្តរៀនគណិតវិទ្យា", ""],
    slots: [{ expected: ";" }, { expected: "." }],
    hintEn: "Two related sentences — the Super Comma is stronger than a comma.",
    hintKh: "ប្រយោគពាក់ព័ន្ធពីរ — សញ្ញាក្បៀសខ្លាំងមានកម្លាំងជាងសញ្ញាក្បៀស។",
  },
  // Introductory clause — comma, period
  {
    id: "rain-stops",
    partsEn: ["When the rain stops", " we will ride our bicycles", ""],
    partsKh: ["នៅពេលភ្លៀងរាំង", " យើងនឹងជិះកង់របស់យើង", ""],
    slots: [{ expected: "," }, { expected: "." }],
    hintEn: "An opening 'when' clause needs a comma before the main thought.",
    hintKh: "ឃ្លាបើក 'នៅពេល' ត្រូវការសញ្ញាក្បៀសមុនគំនិតមេ។",
  },
  // Simple sentence — period only
  {
    id: "pagoda-beautiful",
    partsEn: ["The pagoda is very beautiful", ""],
    partsKh: ["វត្តនេះស្រស់ស្អាតណាស់", ""],
    slots: [{ expected: "." }],
    hintEn: "Complete thought — finish with a Stop.",
    hintKh: "គំនិតពេញលេញ — បញ្ចប់ដោយសញ្ញាឈប់។",
  },
  // Conjunctive adverb — semicolon, comma, period (with heavy-word trap)
  {
    id: "exam-however-passed",
    partsEn: ["The exam was difficult", " however", " I passed", ""],
    partsKh: ["ការប្រឡងគឺពិបាក", " ទោះយ៉ាងណាក៏ដោយ", " ខ្ញុំប្រឡងជាប់", ""],
    slots: [
      { expected: ";", trapBefore: "however" },
      { expected: "," },
      { expected: "." },
    ],
    hintEn: "Heavy word coming — the Super Comma holds it up, then a comma after.",
    hintKh: "ពាក្យធ្ងន់នៅខាងមុខ — សញ្ញាក្បៀសខ្លាំងទប់វា បន្ទាប់មកសញ្ញាក្បៀស។",
  },
  // Introductory phrase — comma, period
  {
    id: "morning-rice-pork",
    partsEn: ["In the morning", " I eat rice and pork", ""],
    partsKh: ["នៅពេលព្រឹក", " ខ្ញុំញ៉ាំបាយស្រូប", ""],
    slots: [{ expected: "," }, { expected: "." }],
    hintEn: "Opening time-phrase — a small pause leads into the sentence.",
    hintKh: "ឃ្លាបើកអំពីពេលវេលា — ការផ្អាកតូចនាំទៅរកប្រយោគ។",
  },
];

/* ══════════════════════════════════════════════════════════════════════ */
export function PunctuationChecker() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [idx, setIdx] = useState(0);
  const [filled, setFilled] = useState<(Mark | null)[]>(() =>
    Array(CHALLENGES[0].slots.length).fill(null),
  );
  const [selectedMark, setSelectedMark] = useState<Mark | null>(null);
  const [feedback, setFeedback] = useState<
    | { kind: "trap"; word: string }
    | { kind: "wrong"; slotIdx: number }
    | { kind: "success" }
    | null
  >(null);
  const [score, setScore] = useState({ correct: 0, attempts: 0 });

  const challenge = CHALLENGES[idx];

  const allFilled = filled.every((f) => f !== null);
  const allCorrect = useMemo(
    () => filled.every((f, i) => f === challenge.slots[i].expected),
    [filled, challenge],
  );

  function handlePlace(slotIdx: number, mark: Mark) {
    const slot = challenge.slots[slotIdx];

    // Custom trap: comma before "however" / "therefore"
    if (mark === "," && slot.expected === ";" && slot.trapBefore) {
      setFeedback({ kind: "trap", word: slot.trapBefore });
      // still record attempt but don't fill
      setScore((s) => ({ ...s, attempts: s.attempts + 1 }));
      return;
    }

    const next = [...filled];
    next[slotIdx] = mark;
    setFilled(next);
    setSelectedMark(null);

    // Validate the whole sentence once everything is filled
    if (next.every((f) => f !== null)) {
      const correct = next.every((f, i) => f === challenge.slots[i].expected);
      if (correct) {
        setFeedback({ kind: "success" });
        setScore((s) => ({ correct: s.correct + 1, attempts: s.attempts + 1 }));
      } else {
        const firstWrong = next.findIndex((f, i) => f !== challenge.slots[i].expected);
        setFeedback({ kind: "wrong", slotIdx: firstWrong });
        setScore((s) => ({ ...s, attempts: s.attempts + 1 }));
      }
    } else {
      setFeedback(null);
    }
  }

  function handleClearSlot(slotIdx: number) {
    if (allCorrect) return;
    const next = [...filled];
    next[slotIdx] = null;
    setFilled(next);
    setFeedback(null);
  }

  function next() {
    const ni = (idx + 1) % CHALLENGES.length;
    setIdx(ni);
    setFilled(Array(CHALLENGES[ni].slots.length).fill(null));
    setFeedback(null);
    setSelectedMark(null);
  }

  function reset() {
    setIdx(0);
    setFilled(Array(CHALLENGES[0].slots.length).fill(null));
    setFeedback(null);
    setSelectedMark(null);
    setScore({ correct: 0, attempts: 0 });
  }

  const parts = kh ? challenge.partsKh : challenge.partsEn;

  return (
    <section
      aria-labelledby="punc-heading"
      className="rounded-3xl border-4 border-slate-300 bg-gradient-to-br from-slate-50 via-white to-zinc-50 p-5 sm:p-7 shadow-md"
    >
      {/* ── Header ─────────────────────────────────────── */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-3">
          <TrafficCone className="w-3.5 h-3.5" />
          <span className={kh ? "font-khmer normal-case tracking-normal text-xs" : ""}>
            {kh ? "មន្ទីរពិសោធវេយ្យាករណ៍" : "Grammar Lab"}
          </span>
        </div>
        <h2
          id="punc-heading"
          className={`font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 ${kh ? "font-khmer leading-snug" : ""}`}
        >
          {kh ? "កម្មវិធីពិនិត្យសញ្ញាវណ្ណយុត្តិ" : "Punctuation Checker"}
        </h2>
        <p className={`text-sm sm:text-base text-slate-600 max-w-2xl mx-auto ${kh ? "font-khmer text-base sm:text-lg leading-loose" : ""}`}>
          {kh
            ? "សញ្ញាវណ្ណយុត្តិគឺដូចជាសញ្ញាចរាចរណ៍ — ពួកវាប្រាប់អ្នកអានឱ្យឈប់ បន្ថយល្បឿន ឬបន្ត។"
            : "Punctuation marks are like traffic signs — they tell the reader to stop, slow down, or keep going."}
        </p>
      </div>

      {/* ── Traffic-sign guide ─────────────────────────── */}
      <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-7">
        {SIGNS.map((s) => (
          <SignCard key={s.mark} sign={s} kh={kh} />
        ))}
      </div>

      {/* ── Game header ────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        <div className={`text-xs font-bold uppercase tracking-wider text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
          {kh ? "ជួសជុលប្រយោគ" : "Fix the Sentence"}
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border-2 border-slate-200 text-xs font-bold text-slate-700">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            {score.correct}<span className="opacity-60">/ {score.attempts}</span>
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border-2 border-slate-200 text-xs font-bold text-slate-700 hover:border-slate-400 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {kh ? "ចាប់ផ្ដើមឡើងវិញ" : "Reset"}
          </button>
        </div>
      </div>

      {/* ── Workspace ──────────────────────────────────── */}
      <div className="rounded-2xl border-4 border-dashed border-slate-300 bg-white p-4 sm:p-6 mb-4 relative">
        {/* Faint grid-paper background */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />

        <div className={`relative text-lg sm:text-xl md:text-2xl text-slate-900 leading-loose font-medium ${kh ? "font-khmer leading-loose" : ""}`}>
          {parts.map((piece, i) => (
            <span key={i}>
              <span>{piece}</span>
              {i < challenge.slots.length && (
                <Slot
                  index={i}
                  filled={filled[i]}
                  expected={challenge.slots[i].expected}
                  isWrong={feedback?.kind === "wrong" && feedback.slotIdx === i}
                  isCorrect={allCorrect}
                  selectedMark={selectedMark}
                  onPlace={(m) => handlePlace(i, m)}
                  onClear={() => handleClearSlot(i)}
                />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── Punctuation dock ───────────────────────────── */}
      <div className="rounded-2xl bg-slate-900 text-white p-4 sm:p-5 mb-4 shadow-inner">
        <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-amber-300 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
          {kh ? "ជ្រើសរើសសញ្ញា ហើយបន្ទាប់មកប៉ះប្រឡោះ" : "Pick a mark, then tap a box (or drag it)"}
        </div>
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          {SIGNS.map((s) => (
            <DockMark
              key={s.mark}
              sign={s}
              selected={selectedMark === s.mark}
              onSelect={() => setSelectedMark(selectedMark === s.mark ? null : s.mark)}
              kh={kh}
            />
          ))}
        </div>
      </div>

      {/* ── Feedback banner ────────────────────────────── */}
      <div className="min-h-[80px]">
        {feedback?.kind === "trap" && (
          <div className="rounded-2xl border-2 border-rose-400 bg-rose-50 p-3 sm:p-4 animate-shake-once">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className={`font-bold text-rose-900 mb-1 ${kh ? "font-khmer text-base" : ""}`}>
                  {kh
                    ? `ប្រយ័ត្ន! '${feedback.word}' គឺជាពាក្យធ្ងន់។`
                    : `Watch out! '${feedback.word.charAt(0).toUpperCase() + feedback.word.slice(1)}' is a heavy word.`}
                </p>
                <p className={`text-sm text-rose-800 ${kh ? "font-khmer text-base leading-loose" : ""}`}>
                  {kh
                    ? "វាត្រូវការសញ្ញាបញ្ឈប់ខ្លាំង ( ; ) ឬសញ្ញាខណ្ឌ ( . ) ដើម្បីទប់វា!"
                    : "It needs a strong Semicolon ( ; ) or a Period ( . ) to hold it up!"}
                </p>
              </div>
            </div>
          </div>
        )}

        {feedback?.kind === "wrong" && (
          <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-3 sm:p-4">
            <div className="flex items-start gap-2">
              <X className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className={`font-bold text-amber-900 mb-1 ${kh ? "font-khmer text-base" : ""}`}>
                  {kh ? "មិនទាន់ត្រឹមត្រូវនៅឡើយទេ — សូមព្យាយាមម្ដងទៀត។" : "Not quite right — give it another try."}
                </p>
                <p className={`text-sm text-amber-800 ${kh ? "font-khmer text-base leading-loose" : ""}`}>
                  💡 {kh ? challenge.hintKh : challenge.hintEn}
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setFilled(Array(challenge.slots.length).fill(null)); setFeedback(null); }}
                className="text-xs font-bold text-amber-900 underline hover:no-underline"
              >
                {kh ? "សម្អាត" : "Clear"}
              </button>
            </div>
          </div>
        )}

        {feedback?.kind === "success" && allCorrect && (
          <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-3 sm:p-4 animate-pop">
            <div className="flex items-start sm:items-center gap-3 flex-col sm:flex-row">
              <div className="flex items-center gap-2 flex-1">
                <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className={`font-bold text-emerald-900 ${kh ? "font-khmer text-base" : ""}`}>
                    {kh ? "ល្អណាស់! សញ្ញាត្រឹមត្រូវទាំងអស់!" : "Perfect! All signs in the right place!"}
                  </p>
                  <p className="text-sm text-emerald-800 mt-1">
                    &ldquo;{renderFinalSentence(challenge.partsEn, challenge.slots)}&rdquo;
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow active:scale-95 transition w-full sm:w-auto justify-center"
              >
                {kh ? "បន្ទាប់" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <p className={`mt-3 text-center text-xs text-slate-500 ${kh ? "font-khmer text-sm" : ""}`}>
        {kh
          ? `លំហាត់ទី ${idx + 1} នៃ ${CHALLENGES.length}`
          : `Sentence ${idx + 1} of ${CHALLENGES.length}`}
      </p>

      {/* Local keyframes */}
      <style>{`
        @keyframes puncShake {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-3px); }
        }
        @keyframes puncPop {
          0% { transform: scale(0.95); opacity: 0; }
          60% { transform: scale(1.03); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-shake-once { animation: puncShake 0.4s ease-in-out; }
        .animate-pop { animation: puncPop 0.35s ease-out; }
      `}</style>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Sign card (guide)
 * ────────────────────────────────────────────────────────────────────── */
function SignCard({ sign, kh }: { sign: SignInfo; kh: boolean }) {
  return (
    <div className={`rounded-2xl border-4 bg-gradient-to-br ${sign.tone.card} p-4 flex flex-col`}>
      <div className="flex items-center gap-3 mb-2">
        <TrafficSignBadge sign={sign} />
        <div className="min-w-0 flex-1">
          <div className={`text-[10px] font-bold uppercase tracking-wider opacity-70 ${sign.tone.text} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? sign.signKh : sign.signEn}
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 leading-none">
            {sign.mark}
          </div>
        </div>
      </div>
      <p className={`text-xs sm:text-sm ${sign.tone.text} mb-2 leading-snug ${kh ? "font-khmer text-sm leading-loose" : ""}`}>
        {kh ? sign.ruleKh : sign.ruleEn}
      </p>
      <div className={`mt-auto text-xs italic text-slate-700 bg-white/70 rounded-md px-2 py-1.5 border border-slate-200 ${kh ? "font-khmer not-italic text-sm" : ""}`}>
        {kh ? sign.exampleKh : sign.exampleEn}
      </div>
    </div>
  );
}

function TrafficSignBadge({ sign }: { sign: SignInfo }) {
  if (sign.mark === ".") {
    // STOP octagon
    return (
      <div className={`w-12 h-12 ${sign.tone.sign} flex items-center justify-center font-extrabold text-[10px] tracking-tight shadow-md`}
        style={{ clipPath: "polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%)" }}
      >
        STOP
      </div>
    );
  }
  if (sign.mark === ",") {
    // Yellow triangle
    return (
      <div className={`w-12 h-12 flex items-end justify-center pb-1 ${sign.tone.sign} font-mono font-extrabold text-2xl shadow-md`}
        style={{ clipPath: "polygon(50% 8%, 96% 92%, 4% 92%)" }}
      >
        ,
      </div>
    );
  }
  // Semicolon — blue rectangle informational sign
  return (
    <div className={`w-12 h-12 ${sign.tone.sign} flex items-center justify-center font-mono font-extrabold text-2xl rounded-md shadow-md border-4 border-white/70`}>
      ;
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Slot (drop target / click target)
 * ────────────────────────────────────────────────────────────────────── */
function Slot({
  index, filled, expected, isWrong, isCorrect, selectedMark, onPlace, onClear,
}: {
  index: number;
  filled: Mark | null;
  expected: Mark;
  isWrong: boolean;
  isCorrect: boolean;
  selectedMark: Mark | null;
  onPlace: (m: Mark) => void;
  onClear: () => void;
}) {
  const [hover, setHover] = useState(false);
  const isExpectedFilled = filled === expected;

  function handleClick() {
    if (filled && !isCorrect) {
      onClear();
      return;
    }
    if (selectedMark && !filled) {
      onPlace(selectedMark);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onDragOver={(e) => { e.preventDefault(); setHover(true); }}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        e.preventDefault();
        setHover(false);
        const m = e.dataTransfer.getData("text/punc") as Mark;
        if (m && !filled) onPlace(m);
      }}
      aria-label={`Punctuation slot ${index + 1}${filled ? `, contains ${filled}` : ", empty"}`}
      className={`
        inline-flex items-center justify-center align-middle mx-0.5 sm:mx-1
        min-w-[44px] sm:min-w-[52px] h-11 sm:h-12 px-2 rounded-lg border-2 border-dashed
        font-mono font-extrabold text-2xl sm:text-3xl transition-all
        ${filled
          ? (isExpectedFilled && isCorrect
              ? "bg-emerald-100 border-emerald-500 border-solid text-emerald-900"
              : isWrong
                ? "bg-rose-100 border-rose-500 border-solid text-rose-900"
                : "bg-amber-100 border-amber-500 border-solid text-amber-900")
          : (hover || selectedMark
              ? "bg-sky-50 border-sky-500 text-sky-700"
              : "bg-slate-50 border-slate-400 text-slate-400 hover:bg-slate-100")}
        cursor-pointer active:scale-95
      `}
    >
      {filled ?? "?"}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Dock mark (clickable + draggable)
 * ────────────────────────────────────────────────────────────────────── */
function DockMark({
  sign, selected, onSelect, kh,
}: { sign: SignInfo; selected: boolean; onSelect: () => void; kh: boolean }) {
  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/punc", sign.mark)}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${sign.signEn} (${sign.mark})`}
      className={`
        relative flex flex-col items-center gap-1 px-3 sm:px-5 py-2 rounded-2xl
        border-b-[6px] active:translate-y-[2px] active:border-b-[4px]
        transition-all min-w-[72px] sm:min-w-[90px]
        ${selected
          ? "bg-amber-300 text-slate-900 border-amber-600 ring-4 ring-amber-200 scale-110"
          : "bg-white text-slate-900 border-slate-400 hover:scale-105 hover:-translate-y-0.5 shadow-md"}
      `}
    >
      <span className="font-mono font-extrabold text-3xl sm:text-4xl leading-none">{sign.mark}</span>
      <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? sign.signKh : sign.signEn}
      </span>
      {selected && (
        <Check className="absolute -top-2 -right-2 w-5 h-5 text-white bg-emerald-600 rounded-full p-0.5 shadow" />
      )}
    </button>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────── */
function renderFinalSentence(parts: string[], slots: Slot[]): string {
  let out = "";
  for (let i = 0; i < parts.length; i++) {
    out += parts[i];
    if (i < slots.length) out += slots[i].expected;
  }
  return out.trim();
}
