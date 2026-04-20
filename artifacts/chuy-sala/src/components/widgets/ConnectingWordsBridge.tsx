import { useMemo, useState } from "react";
import {
  Link2, RefreshCw, Check, X, Sparkles, ArrowRight, Trophy, PlusCircle,
  GitFork, Zap, Clock,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakWord } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * Connecting Words: The Bridge Builder
 * ពាក្យភ្ជាប់៖ អ្នកសាងសង់ស្ពាន
 * Bilingual ESL drill that teaches conjunctions through a "bridge two
 * cliffs" metaphor with multiple-choice stones.
 * ────────────────────────────────────────────────────────────────────── */

type CategoryId = "add" | "contrast" | "cause" | "time";
type Category = {
  id: CategoryId;
  labelEn: string;
  labelKh: string;
  hintEn: string;            // shown when student picks wrong answer
  hintKh: string;
  words: string[];           // the connecting words in this group
  tone: { card: string; chip: string; ring: string; text: string; icon: string };
  Icon: React.ComponentType<{ className?: string }>;
};

const CATEGORIES: Category[] = [
  {
    id: "add",
    labelEn: "Adding Ideas",
    labelKh: "ការបន្ថែម",
    hintEn: "Adding Ideas — joining two similar thoughts.",
    hintKh: "ការបន្ថែម — ការផ្សំគំនិតស្រដៀងគ្នាពីរ។",
    words: ["and", "nor"],
    tone: {
      card: "from-emerald-50 to-teal-50 border-emerald-300",
      chip: "bg-emerald-100 text-emerald-900 border-emerald-400",
      ring: "ring-emerald-400",
      text: "text-emerald-900",
      icon: "bg-emerald-600",
    },
    Icon: PlusCircle,
  },
  {
    id: "contrast",
    labelEn: "Showing Contrast",
    labelKh: "ការផ្ទុយ",
    hintEn: "Showing Contrast — when the second idea is opposite or surprising.",
    hintKh: "ការផ្ទុយ — នៅពេលគំនិតទីពីរផ្ទុយ ឬគួរឱ្យភ្ញាក់ផ្អើល។",
    words: ["but", "however", "yet"],
    tone: {
      card: "from-amber-50 to-orange-50 border-amber-300",
      chip: "bg-amber-100 text-amber-900 border-amber-400",
      ring: "ring-amber-400",
      text: "text-amber-900",
      icon: "bg-amber-600",
    },
    Icon: GitFork,
  },
  {
    id: "cause",
    labelEn: "Cause & Effect",
    labelKh: "ហេតុ និងផល",
    hintEn: "Cause & Effect — one idea makes the other happen.",
    hintKh: "ហេតុ និងផល — គំនិតមួយធ្វើឱ្យគំនិតមួយទៀតកើតឡើង។",
    words: ["because", "so", "therefore", "for"],
    tone: {
      card: "from-rose-50 to-pink-50 border-rose-300",
      chip: "bg-rose-100 text-rose-900 border-rose-400",
      ring: "ring-rose-400",
      text: "text-rose-900",
      icon: "bg-rose-600",
    },
    Icon: Zap,
  },
  {
    id: "time",
    labelEn: "Time & Sequence",
    labelKh: "ពេលវេលា និងលំដាប់",
    hintEn: "Time & Sequence — showing what happens next or in order.",
    hintKh: "ពេលវេលា និងលំដាប់ — បង្ហាញអ្វីដែលកើតឡើងបន្ទាប់ ឬតាមលំដាប់។",
    words: ["then", "and then"],
    tone: {
      card: "from-sky-50 to-blue-50 border-sky-300",
      chip: "bg-sky-100 text-sky-900 border-sky-400",
      ring: "ring-sky-400",
      text: "text-sky-900",
      icon: "bg-sky-600",
    },
    Icon: Clock,
  },
];

const CAT_BY_WORD = new Map<string, CategoryId>();
CATEGORIES.forEach((c) => c.words.forEach((w) => CAT_BY_WORD.set(w, c.id)));
const CAT_BY_ID = new Map<CategoryId, Category>(CATEGORIES.map((c) => [c.id, c]));

/* ── Sentence-pair bank ──────────────────────────────────────────────── */
type Pair = {
  leftEn: string;  leftKh: string;
  rightEn: string; rightKh: string;
  answer: string;            // correct connecting word
  // optional extra wrong choices to mix in (otherwise we pick from other cats)
};
const PAIRS: Pair[] = [
  { leftEn: "It was raining hard",        leftKh: "ភ្លៀងធ្លាក់ខ្លាំង",
    rightEn: "we stayed inside",          rightKh: "ពួកយើងនៅខាងក្នុង",
    answer: "so" },
  { leftEn: "She studied every night",    leftKh: "នាងសិក្សារាល់យប់",
    rightEn: "she passed the exam",       rightKh: "នាងប្រឡងជាប់",
    answer: "therefore" },
  { leftEn: "I like rice",                leftKh: "ខ្ញុំចូលចិត្តបាយ",
    rightEn: "I like noodles",            rightKh: "ខ្ញុំចូលចិត្តមី",
    answer: "and" },
  { leftEn: "He is small",                leftKh: "គាត់តូច",
    rightEn: "he is very strong",         rightKh: "គាត់រឹងមាំខ្លាំង",
    answer: "but" },
  { leftEn: "First we ate breakfast",     leftKh: "ដំបូងយើងបានញ៉ាំអាហារពេលព្រឹក",
    rightEn: "we walked to school",       rightKh: "យើងបានដើរទៅសាលា",
    answer: "then" },
  { leftEn: "The road was muddy",         leftKh: "ផ្លូវមានភក់",
    rightEn: "the bus arrived on time",   rightKh: "ឡានក្រុងមកដល់ទាន់ពេល",
    answer: "however" },
  { leftEn: "I was tired",                leftKh: "ខ្ញុំនឿយហត់",
    rightEn: "I finished my homework",    rightKh: "ខ្ញុំបានបញ្ចប់កិច្ចការផ្ទះ",
    answer: "yet" },
  { leftEn: "She didn't bring an umbrella", leftKh: "នាងមិនបាននាំឆ័ត្រ",
    rightEn: "she didn't wear a raincoat", rightKh: "នាងក៏មិនបានស្លៀកអាវភ្លៀង",
    answer: "nor" },
  { leftEn: "The market closed early",    leftKh: "ផ្សារបិទព្រលឹម",
    rightEn: "of the heavy storm",        rightKh: "ដោយសារព្យុះធំ",
    answer: "because" },
  { leftEn: "He saved money for months",  leftKh: "គាត់សន្សំប្រាក់ច្រើនខែ",
    rightEn: "he bought a new bicycle",   rightKh: "គាត់ទិញកង់ថ្មី",
    answer: "and then" },
  { leftEn: "We must hurry",              leftKh: "យើងត្រូវប្រញាប់",
    rightEn: "the boat is leaving soon",  rightKh: "ទូកនឹងចាកចេញឆាប់ៗនេះ",
    answer: "for" },
  { leftEn: "The fish was fresh",         leftKh: "ត្រីស្រស់",
    rightEn: "Mom cooked amok for dinner", rightKh: "ម្ដាយចម្អិនអាម៉ុកសម្រាប់ពេលល្ងាច",
    answer: "so" },
  { leftEn: "The teacher explained the lesson", leftKh: "គ្រូពន្យល់មេរៀន",
    rightEn: "the students wrote notes",  rightKh: "សិស្សៗបានកត់ត្រា",
    answer: "and" },
  { leftEn: "The exam was difficult",     leftKh: "ការប្រឡងពិបាក",
    rightEn: "everyone passed",           rightKh: "មនុស្សគ្រប់គ្នាប្រឡងជាប់",
    answer: "however" },
  { leftEn: "Wash the rice carefully",    leftKh: "លាងអង្ករឱ្យបានស្អាត",
    rightEn: "put it in the rice cooker", rightKh: "ដាក់វាក្នុងឆ្នាំងដាំបាយ",
    answer: "then" },
];

/* Pick 2 distractors from OTHER categories to make a 3-stone choice set. */
function buildChoices(answer: string, seed: number): string[] {
  const correctCat = CAT_BY_WORD.get(answer)!;
  const others: string[] = [];
  CATEGORIES.forEach((c) => {
    if (c.id !== correctCat) others.push(...c.words);
  });
  // deterministic shuffle by seed
  const shuffled = [...others].sort(
    (a, b) => ((seed * 9301 + a.charCodeAt(0)) % 233280) - ((seed * 9301 + b.charCodeAt(0)) % 233280),
  );
  const picks = shuffled.slice(0, 2);
  const all = [answer, ...picks];
  // shuffle the 3 stones
  return all.sort(
    (a, b) => ((seed * 49297 + a.length * 7) % 233280) - ((seed * 49297 + b.length * 7) % 233280),
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
export function ConnectingWordsBridge() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [pairIdx, setPairIdx] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wrongPick, setWrongPick] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, attempts: 0 });

  const pair = PAIRS[pairIdx];
  const choices = useMemo(() => buildChoices(pair.answer, pairIdx + 7), [pair.answer, pairIdx]);

  function pick(word: string) {
    if (solved) return;
    if (word === pair.answer) {
      setSolved(true);
      setWrongPick(null);
      setScore((s) => ({ correct: s.correct + 1, attempts: s.attempts + 1 }));
      // Speak the full completed sentence aloud as a reward
      speakWord(`${pair.leftEn} ${word} ${pair.rightEn}`);
    } else {
      setWrongPick(word);
      setScore((s) => ({ ...s, attempts: s.attempts + 1 }));
    }
  }

  function next() {
    setPairIdx((i) => (i + 1) % PAIRS.length);
    setSolved(false);
    setWrongPick(null);
  }

  function reset() {
    setPairIdx(0);
    setSolved(false);
    setWrongPick(null);
    setScore({ correct: 0, attempts: 0 });
  }

  const wrongCat = wrongPick ? CAT_BY_ID.get(CAT_BY_WORD.get(wrongPick)!) : null;
  const correctCat = CAT_BY_ID.get(CAT_BY_WORD.get(pair.answer)!)!;

  return (
    <section
      aria-labelledby="bridge-heading"
      className="rounded-3xl border-4 border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-5 sm:p-7 shadow-md"
    >
      {/* ── Header ───────────────────────────────────────── */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold uppercase tracking-wider mb-3">
          <Link2 className="w-3.5 h-3.5" />
          <span className={kh ? "font-khmer normal-case tracking-normal text-xs" : ""}>
            {kh ? "ពាក្យភ្ជាប់" : "Connecting Words"}
          </span>
        </div>
        <h2
          id="bridge-heading"
          className={`font-display text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 ${kh ? "font-khmer leading-snug" : ""}`}
        >
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {kh ? "អ្នកសាងសង់ស្ពាន" : "The Bridge Builder"}
          </span>
        </h2>
        <p className={`text-sm sm:text-base text-slate-600 max-w-2xl mx-auto ${kh ? "font-khmer text-base sm:text-lg leading-loose" : ""}`}>
          {kh
            ? "តភ្ជាប់គំនិតពីរ! ជ្រើសរើសពាក្យត្រឹមត្រូវដើម្បីបង្កើតស្ពានឆ្លងកាត់ចន្លោះ។"
            : "Connect two ideas! Pick the right word to build the bridge across the gap."}
        </p>
      </div>

      {/* ── Category guide ───────────────────────────────── */}
      <div className="mb-7">
        <div className={`text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
          {kh ? "១. ស្គាល់គ្រួសារពាក្យបួនរបស់អ្នក" : "1. Meet your four word families"}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => {
            const Icon = c.Icon;
            return (
              <div key={c.id} className={`rounded-2xl border-2 bg-gradient-to-br ${c.tone.card} p-3.5`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg ${c.tone.icon} text-white flex items-center justify-center shadow-sm`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-[10px] font-bold uppercase tracking-wider ${c.tone.text} opacity-70 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                      {kh ? c.labelKh : c.labelEn}
                    </div>
                    <div className={`text-sm font-extrabold ${c.tone.text} ${kh ? "font-khmer" : ""}`}>
                      {kh ? c.labelEn : c.labelKh}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.words.map((w) => (
                    <span key={w} className={`text-xs sm:text-sm font-mono font-bold px-2 py-0.5 rounded border-2 ${c.tone.chip}`}>
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Game header ─────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <div className={`text-xs font-bold uppercase tracking-wider text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
          {kh ? "២. បង្កើតស្ពាន" : "2. Build the bridge"}
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border-2 border-slate-200 text-xs font-bold text-slate-700">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            {score.correct}
            <span className="opacity-60">/ {score.attempts}</span>
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border-2 border-slate-200 text-xs font-bold text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {kh ? "ចាប់ផ្ដើមឡើងវិញ" : "Reset"}
          </button>
        </div>
      </div>

      {/* ── The Bridge Game ─────────────────────────────── */}
      <div className="relative rounded-3xl border-4 border-indigo-200 bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 p-4 sm:p-6 overflow-hidden">
        {/* Sun & clouds for friendly feel */}
        <div className="absolute top-3 right-4 w-12 h-12 rounded-full bg-amber-300/70 blur-md" aria-hidden />
        <div className="absolute top-5 left-10 w-20 h-5 rounded-full bg-white/80" aria-hidden />
        <div className="absolute top-12 left-32 w-14 h-4 rounded-full bg-white/60" aria-hidden />

        <div className="relative grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-3">
          {/* Cliff 1 */}
          <Cliff side="left" kh={kh} en={pair.leftEn} khText={pair.leftKh} />

          {/* Bridge gap with stones */}
          <div className="flex flex-col items-center justify-end pb-2 min-h-[180px]">
            <div className={`mb-3 text-[10px] font-bold uppercase tracking-wider ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""} ${solved ? "text-emerald-700" : "text-indigo-700"}`}>
              {solved ? (kh ? "ស្ពានបានបញ្ចប់!" : "Bridge Complete!") : (kh ? "ជ្រើសរើសថ្ម" : "Pick a stone")}
            </div>
            <div className="flex items-end gap-1.5 sm:gap-2 mb-2 min-h-[70px]">
              {choices.map((w) => {
                const isAnswer = w === pair.answer;
                const isWrong = wrongPick === w;
                const cat = CAT_BY_ID.get(CAT_BY_WORD.get(w)!)!;
                const dimmed = solved && !isAnswer;
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => pick(w)}
                    disabled={solved}
                    className={`
                      relative px-3 sm:px-4 py-2.5 rounded-xl font-mono font-extrabold text-sm sm:text-base shadow-md transition-all
                      border-b-[6px] active:translate-y-[2px] active:border-b-[4px]
                      ${solved && isAnswer ? "bg-emerald-500 text-white border-emerald-700 ring-4 ring-emerald-300 scale-110" : ""}
                      ${isWrong ? "bg-rose-100 text-rose-800 border-rose-400 animate-shake" : ""}
                      ${!solved && !isWrong ? `${cat.tone.chip} hover:scale-105 hover:-translate-y-0.5` : ""}
                      ${dimmed ? "opacity-30" : ""}
                      ${solved && !isAnswer ? "cursor-not-allowed" : ""}
                    `}
                    style={{ minWidth: "60px" }}
                    aria-label={`Use the word ${w}`}
                  >
                    {w}
                    {solved && isAnswer && (
                      <Check className="absolute -top-2 -right-2 w-5 h-5 text-white bg-emerald-600 rounded-full p-0.5 shadow" />
                    )}
                    {isWrong && (
                      <X className="absolute -top-2 -right-2 w-5 h-5 text-white bg-rose-600 rounded-full p-0.5 shadow" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* The bridge plank — appears when solved */}
            <div className="relative w-full h-3 mt-1">
              <div
                className={`absolute inset-x-0 top-0 h-3 rounded-full transition-all duration-500 origin-left ${
                  solved
                    ? "bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 scale-x-100 shadow-md"
                    : "bg-slate-300/40 scale-x-0"
                }`}
              />
              {/* Gap dots when no bridge */}
              {!solved && (
                <div className="absolute inset-0 flex items-center justify-around">
                  {[0,1,2,3,4].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400/70" />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cliff 2 */}
          <Cliff side="right" kh={kh} en={pair.rightEn} khText={pair.rightKh} />
        </div>

        {/* ── Feedback / Next ───────────────────────────── */}
        <div className="mt-5 min-h-[64px]">
          {solved && (
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className={kh ? "font-khmer" : ""}>
                    {kh ? "ល្អណាស់! ស្ពានរបស់អ្នករឹងមាំ។" : "Great job! Your bridge is solid."}
                  </span>
                </div>
                <p className={`text-sm text-emerald-900 ${kh ? "font-khmer text-base leading-loose" : ""}`}>
                  <span className="font-semibold">{kh ? "អានឱ្យឮៗ៖ " : "Read it aloud: "}</span>
                  &ldquo;{pair.leftEn} <span className="font-extrabold underline decoration-emerald-500 decoration-2 underline-offset-2">{pair.answer}</span> {pair.rightEn}.&rdquo;
                </p>
                {kh && (
                  <p className="text-sm text-emerald-900/80 font-khmer mt-1 leading-loose">
                    {pair.leftKh} {pair.rightKh}។
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md active:scale-95 transition"
              >
                {kh ? "បន្ទាប់" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {wrongPick && !solved && wrongCat && (
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-3 sm:p-4">
              <div className="flex items-start gap-2">
                <X className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className={`text-sm text-amber-900 font-bold mb-1 ${kh ? "font-khmer text-base" : ""}`}>
                    {kh
                      ? `សាកល្បងម្ដងទៀត! «${wrongPick}» ប្រើសម្រាប់ ${wrongCat.labelKh}។`
                      : `Try again! "${wrongPick}" is used for ${wrongCat.labelEn}.`}
                  </p>
                  <p className={`text-sm text-amber-800 ${kh ? "font-khmer text-base leading-loose" : ""}`}>
                    {kh
                      ? `សូមមើលរកពាក្យដែលបង្ហាញ ${correctCat.labelKh}។ ${correctCat.hintKh}`
                      : `Look for a word that shows ${correctCat.labelEn}. ${correctCat.hintEn}`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Counter footer */}
      <p className={`mt-4 text-center text-xs text-slate-500 ${kh ? "font-khmer text-sm" : ""}`}>
        {kh
          ? `លំហាត់ទី ${pairIdx + 1} នៃ ${PAIRS.length}`
          : `Sentence ${pairIdx + 1} of ${PAIRS.length}`}
      </p>

      {/* Local keyframes for the wrong-answer shake */}
      <style>{`
        @keyframes bridgeShake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
        .animate-shake { animation: bridgeShake 0.4s ease-in-out; }
      `}</style>
    </section>
  );
}

/* ── Cliff sub-component ─────────────────────────────────────────────── */
function Cliff({
  side, kh, en, khText,
}: { side: "left" | "right"; kh: boolean; en: string; khText: string }) {
  const rounded = side === "left" ? "rounded-l-2xl" : "rounded-r-2xl";
  return (
    <div className={`relative ${rounded} bg-gradient-to-b from-stone-200 via-stone-300 to-stone-500 p-3 sm:p-4 shadow-inner overflow-hidden min-h-[180px] flex flex-col`}>
      {/* Grass top */}
      <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-b from-emerald-500 to-emerald-600" />
      <div className="relative bg-white/95 rounded-xl border-2 border-stone-400/40 p-2.5 sm:p-3 mt-2 shadow-md flex-1 flex flex-col justify-center">
        <div className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {side === "left"
            ? (kh ? "ឃ្លាទីមួយ" : "Sentence A")
            : (kh ? "ឃ្លាទីពីរ" : "Sentence B")}
        </div>
        <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {en}
        </div>
        <div className={`mt-1 text-xs sm:text-sm text-slate-600 ${kh ? "font-khmer text-sm leading-loose" : "italic"}`}>
          {khText}
        </div>
      </div>
      {/* rocky texture lines */}
      <div className="absolute bottom-2 left-2 right-2 h-1 rounded-full bg-stone-700/30" />
      <div className="absolute bottom-5 left-4 right-6 h-0.5 rounded-full bg-stone-700/20" />
    </div>
  );
}
