import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sparkles, Volume2, BookOpen, Hash, Layers3, RotateCcw, ChevronRight,
  CalendarDays, Star, CalendarRange, Sun, CheckCircle2, HelpCircle, Palette,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText, speakWord } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * Beginner English & Math Guide
 * Audience: Cambodian primary-school ESL learners
 * Khmer translations are PLACEHOLDERS — tagged with `__KH_TODO__` so they
 * can be located and replaced later by a translator.
 * ────────────────────────────────────────────────────────────────────── */

/** Mark Khmer strings that still need a real translation. */
const KH_TODO = (placeholder: string) => placeholder; // rename later when wired

/* ──────────────────────────────────────────────────────────────────── */

type Letter = { upper: string; lower: string; word: string; emoji: string; wordKh: string };

const ALPHABET: Letter[] = [
  { upper: "A", lower: "a", word: "Apple",     emoji: "🍎", wordKh: KH_TODO("ផ្លែប៉ោម") },
  { upper: "B", lower: "b", word: "Ball",      emoji: "⚽", wordKh: KH_TODO("បាល់") },
  { upper: "C", lower: "c", word: "Cat",       emoji: "🐱", wordKh: KH_TODO("ឆ្មា") },
  { upper: "D", lower: "d", word: "Dog",       emoji: "🐶", wordKh: KH_TODO("ឆ្កែ") },
  { upper: "E", lower: "e", word: "Elephant",  emoji: "🐘", wordKh: KH_TODO("ដំរី") },
  { upper: "F", lower: "f", word: "Fish",      emoji: "🐟", wordKh: KH_TODO("ត្រី") },
  { upper: "G", lower: "g", word: "Goat",      emoji: "🐐", wordKh: KH_TODO("ពពែ") },
  { upper: "H", lower: "h", word: "House",     emoji: "🏠", wordKh: KH_TODO("ផ្ទះ") },
  { upper: "I", lower: "i", word: "Ice",       emoji: "🧊", wordKh: KH_TODO("ទឹកកក") },
  { upper: "J", lower: "j", word: "Juice",     emoji: "🧃", wordKh: KH_TODO("ទឹកផ្លែឈើ") },
  { upper: "K", lower: "k", word: "Kite",      emoji: "🪁", wordKh: KH_TODO("ខ្លែង") },
  { upper: "L", lower: "l", word: "Lion",      emoji: "🦁", wordKh: KH_TODO("សិង្ហ") },
  { upper: "M", lower: "m", word: "Moon",      emoji: "🌙", wordKh: KH_TODO("ព្រះច័ន្ទ") },
  { upper: "N", lower: "n", word: "Nest",      emoji: "🪺", wordKh: KH_TODO("សំបុក") },
  { upper: "O", lower: "o", word: "Orange",    emoji: "🍊", wordKh: KH_TODO("ក្រូច") },
  { upper: "P", lower: "p", word: "Pen",       emoji: "🖊️", wordKh: KH_TODO("ប៊ិច") },
  { upper: "Q", lower: "q", word: "Queen",     emoji: "👸", wordKh: KH_TODO("មហាក្សត្រី") },
  { upper: "R", lower: "r", word: "Rain",      emoji: "🌧️", wordKh: KH_TODO("ភ្លៀង") },
  { upper: "S", lower: "s", word: "Sun",       emoji: "☀️", wordKh: KH_TODO("ព្រះអាទិត្យ") },
  { upper: "T", lower: "t", word: "Tree",      emoji: "🌳", wordKh: KH_TODO("ដើមឈើ") },
  { upper: "U", lower: "u", word: "Umbrella",  emoji: "☂️", wordKh: KH_TODO("ឆ័ត្រ") },
  { upper: "V", lower: "v", word: "Van",       emoji: "🚐", wordKh: KH_TODO("រថយន្តដឹកទំនិញ") },
  { upper: "W", lower: "w", word: "Water",     emoji: "💧", wordKh: KH_TODO("ទឹក") },
  { upper: "X", lower: "x", word: "X-ray",     emoji: "🩻", wordKh: KH_TODO("កាំរស្មីអ៊ិច") },
  { upper: "Y", lower: "y", word: "Yarn",      emoji: "🧶", wordKh: KH_TODO("អំបោះ") },
  { upper: "Z", lower: "z", word: "Zebra",     emoji: "🦓", wordKh: KH_TODO("សេះបង្កង់") },
];

/* ──────────────────────────────────────────────────────────────────── */
/** Spell out an integer 0..1000 in English. */
function numberToWords(n: number): string {
  if (n === 0) return "Zero";
  if (n === 1000) return "One thousand";

  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  function under100(num: number): string {
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    const t = Math.floor(num / 10);
    const o = num % 10;
    return o === 0 ? tens[t] : `${tens[t]}-${ones[o]}`;
  }

  let parts: string[] = [];
  const h = Math.floor(n / 100);
  const rest = n % 100;
  if (h > 0) parts.push(`${ones[h]} hundred`);
  if (rest > 0) parts.push(under100(rest));

  const out = parts.join(" ");
  return out.charAt(0).toUpperCase() + out.slice(1);
}

/** Spell out an integer 0..1000 in Khmer. */
function numberToKhmerWords(n: number): string {
  if (n === 0) return "សូន្យ";
  if (n === 1000) return "មួយពាន់";

  const ones  = ["", "មួយ", "ពីរ", "បី", "បួន", "ប្រាំ", "ប្រាំមួយ", "ប្រាំពីរ", "ប្រាំបី", "ប្រាំបួន"];
  const tens  = ["", "ដប់", "ម្ភៃ", "សាមសិប", "សែសិប", "ហាសិប", "ហុកសិប", "ចិតសិប", "ប៉ែតសិប", "កៅសិប"];

  function under100(num: number): string {
    if (num < 10) return ones[num];
    const t = Math.floor(num / 10);
    const o = num % 10;
    return o === 0 ? tens[t] : `${tens[t]}${ones[o]}`;
  }

  const h = Math.floor(n / 100);
  const rest = n % 100;
  let out = "";
  if (h > 0) out += `${ones[h]}រយ`;
  if (rest > 0) out += under100(rest);
  return out;
}

/* ──────────────────────────────────────────────────────────────────── */

export default function BeginnerGuidePage() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [tab, setTab] = useState<"alphabet" | "numbers" | "pattern" | "days" | "months" | "questions" | "colors">("alphabet");

  const tabs: { id: typeof tab; en: string; kh: string; icon: typeof BookOpen; color: string }[] = [
    { id: "alphabet",  en: "Alphabet A–Z",        kh: KH_TODO("អក្ខរក្រម A–Z"),     icon: BookOpen,      color: "bg-rose-500" },
    { id: "numbers",   en: "Numbers 1 to 100",    kh: KH_TODO("លេខ ១ ដល់ ១០០"),    icon: Hash,          color: "bg-sky-500" },
    { id: "pattern",   en: "100 to 1,000",        kh: KH_TODO("១០០ ដល់ ១,០០០"),    icon: Layers3,       color: "bg-emerald-500" },
    { id: "days",      en: "Days of the Week",    kh: KH_TODO("ថ្ងៃនៃសប្តាហ៍"),     icon: CalendarDays,  color: "bg-indigo-500" },
    { id: "months",    en: "Months of the Year",  kh: KH_TODO("ខែនៃឆ្នាំ"),         icon: CalendarRange, color: "bg-fuchsia-500" },
    { id: "questions", en: "Question Words",      kh: KH_TODO("ពាក្យសួរ"),          icon: HelpCircle,    color: "bg-violet-500" },
    { id: "colors",    en: "Colors",              kh: KH_TODO("ពណ៌"),               icon: Palette,       color: "bg-pink-500" },
  ];

  return (
    <div className="min-h-screen w-full" style={{
      background: "linear-gradient(180deg, #fff7ed 0%, #fef3c7 30%, #ecfeff 70%, #faf5ff 100%)",
    }}>
      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="rounded-3xl bg-white border-4 border-amber-300 shadow-xl p-6 sm:p-10 text-center relative overflow-hidden">
          <span aria-hidden className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-yellow-200 opacity-60 blur-2xl" />
          <span aria-hidden className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-sky-200 opacity-60 blur-2xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span className={kh ? "font-khmer normal-case tracking-normal text-sm" : ""}>
                {kh ? KH_TODO("មគ្គុទ្ទេសក៍សម្រាប់សិស្សចាប់ផ្ដើម") : "Beginner Guide"}
              </span>
            </div>
            <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
              <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-sky-500 bg-clip-text text-transparent">
                {kh ? KH_TODO("មគ្គុទ្ទេសក៍ភាសាអង់គ្លេស និងគណិតវិទ្យា") : "English & Math Starter"}
              </span>
            </h1>
            {kh && (
              <p className="mt-2 text-sm italic text-slate-500">
                English & Math Starter Guide (placeholder Khmer translation)
              </p>
            )}
            <p className={`mt-3 text-base sm:text-lg text-slate-700 max-w-2xl mx-auto ${kh ? "font-khmer text-lg sm:text-xl leading-loose" : ""}`}>
              {kh
                ? KH_TODO("រៀនអក្សរ ពាក្យ និងលេខ — ទាំងសប្បាយ ទាំងងាយយល់!")
                : "Learn letters, words, and numbers — fun and easy!"}
            </p>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-3" role="tablist">
          {tabs.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className={`group inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-4 font-extrabold text-base sm:text-lg transition-all active:scale-95 ${
                  active
                    ? `${t.color} text-white border-transparent shadow-lg scale-[1.03]`
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow"
                } ${kh ? "font-khmer" : ""}`}
              >
                <t.icon className="w-5 h-5" />
                {kh ? t.kh : t.en}
              </button>
            );
          })}
        </div>
      </section>

      {/* TAB CONTENT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {tab === "alphabet" && <AlphabetSection kh={kh} />}
        {tab === "numbers" && <NumbersGridSection kh={kh} />}
        {tab === "pattern" && <PatternGuideSection kh={kh} />}
        {tab === "days" && <DaysOfWeekSection kh={kh} />}
        {tab === "months" && <MonthsOfYearSection kh={kh} />}
        {tab === "questions" && <QuestionWordsGallery kh={kh} />}
        {tab === "colors" && <ColorsGallery kh={kh} />}
      </section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* SECTION 1 — Alphabet                                                */
/* ──────────────────────────────────────────────────────────────────── */

const LETTER_PALETTES = [
  "from-rose-100 to-rose-200 border-rose-300 text-rose-700",
  "from-orange-100 to-orange-200 border-orange-300 text-orange-700",
  "from-amber-100 to-amber-200 border-amber-300 text-amber-700",
  "from-yellow-100 to-yellow-200 border-yellow-300 text-yellow-700",
  "from-lime-100 to-lime-200 border-lime-300 text-lime-700",
  "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-700",
  "from-teal-100 to-teal-200 border-teal-300 text-teal-700",
  "from-cyan-100 to-cyan-200 border-cyan-300 text-cyan-700",
  "from-sky-100 to-sky-200 border-sky-300 text-sky-700",
  "from-blue-100 to-blue-200 border-blue-300 text-blue-700",
  "from-indigo-100 to-indigo-200 border-indigo-300 text-indigo-700",
  "from-violet-100 to-violet-200 border-violet-300 text-violet-700",
  "from-fuchsia-100 to-fuchsia-200 border-fuchsia-300 text-fuchsia-700",
  "from-pink-100 to-pink-200 border-pink-300 text-pink-700",
];

function AlphabetSection({ kh }: { kh: boolean }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <SectionHeader
        kh={kh}
        en="Tap a letter to learn its word!"
        khText={KH_TODO("ប៉ះអក្សរណាមួយ ដើម្បីរៀនពាក្យ!")}
        accent="rose"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {ALPHABET.map((L, idx) => {
          const palette = LETTER_PALETTES[idx % LETTER_PALETTES.length];
          const isSelected = selected === L.upper;
          const toggle = () => setSelected(isSelected ? null : L.upper);
          return (
            <div
              key={L.upper}
              role="button"
              tabIndex={0}
              onClick={toggle}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle();
                }
              }}
              aria-pressed={isSelected}
              aria-label={`Letter ${L.upper}, word ${L.word}`}
              className={`group rounded-2xl border-4 bg-gradient-to-br ${palette} p-3 sm:p-4 text-center shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${
                isSelected ? "ring-4 ring-offset-2 ring-amber-400 -translate-y-1 scale-[1.02]" : ""
              }`}
            >
              {/* Big letter pair */}
              <div className="font-display font-black leading-none text-4xl sm:text-5xl">
                {L.upper}
                <span className="opacity-60 ml-1">{L.lower}</span>
              </div>

              {/* Emoji visual */}
              <div className="text-4xl sm:text-5xl my-2" aria-hidden>
                {L.emoji}
              </div>

              {/* Word */}
              <div className="font-bold text-base sm:text-lg text-slate-800">{L.word}</div>
              {kh && (
                <div className="font-khmer text-sm text-slate-600 mt-0.5">{L.wordKh}</div>
              )}

              {/* Audio placeholder */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord(L.word);
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border-2 border-current font-bold text-xs hover:bg-white active:scale-95 transition-all"
                aria-label={`Play audio for ${L.word} (coming soon)`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                {kh ? KH_TODO("ស្ដាប់") : "Play"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* SECTION 2 — Numbers 1 to 100                                         */
/* ──────────────────────────────────────────────────────────────────── */

function NumbersGridSection({ kh }: { kh: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);

  // Build a 10x10 grid arranged so the FIRST row is 1..10, last row is 91..100.
  const rows = useMemo(() => {
    const out: number[][] = [];
    for (let r = 0; r < 10; r++) {
      const row: number[] = [];
      for (let c = 1; c <= 10; c++) row.push(r * 10 + c);
      out.push(row);
    }
    return out;
  }, []);

  return (
    <div>
      <SectionHeader
        kh={kh}
        en="Tap a number to see its name. The yellow column counts by tens!"
        khText={KH_TODO("ប៉ះលេខ ដើម្បីឃើញឈ្មោះ។ ជួរឈរពណ៌លឿងគឺរាប់ដប់ៗ!")}
        accent="sky"
      />

      {/* The selected number — large display */}
      <div
        className="rounded-3xl bg-white border-4 border-sky-200 shadow-md p-5 sm:p-6 mb-5 text-center min-h-[140px] flex flex-col items-center justify-center"
        data-testid="number-display"
      >
        {selected === null ? (
          <p className={`text-slate-500 text-base sm:text-lg ${kh ? "font-khmer text-lg sm:text-xl" : ""}`}>
            {kh
              ? KH_TODO("ចុចលេខណាមួយខាងក្រោម…")
              : "Click any number below to see it big!"}
          </p>
        ) : (
          <>
            <div
              className="font-display font-black text-7xl sm:text-8xl text-sky-600 leading-none animate-in zoom-in-50 fade-in duration-200"
              data-testid="number-display-digit"
            >
              {selected}
            </div>
            <div
              className="mt-2 font-bold text-2xl sm:text-3xl text-slate-800 flex items-baseline justify-center gap-2 flex-wrap"
              data-testid="number-display-bilingual"
            >
              <span>{selected} - {numberToWords(selected)}</span>
              <span className="text-slate-400 font-normal">/</span>
              <span className="font-khmer text-xl sm:text-2xl text-slate-700">
                {numberToKhmerWords(selected)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => speakWord(numberToWords(selected))}
              aria-label={`Hear ${numberToWords(selected)} again`}
              data-testid="number-display-speaker"
              className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 active:scale-95 transition-all shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              <Volume2 className="w-4 h-4" />
              <span className={kh ? "font-khmer" : ""}>
                {kh ? KH_TODO("ស្ដាប់ម្ដងទៀត") : "Hear it again"}
              </span>
            </button>
          </>
        )}
      </div>

      {/* The 10x10 grid */}
      <div className="rounded-3xl bg-white border-4 border-sky-200 shadow-md p-3 sm:p-5">
        <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
          {rows.flat().map((n) => {
            const isTens = n % 10 === 0;
            const isSelected = selected === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setSelected(isSelected ? null : n);
                  speakWord(numberToWords(n));
                }}
                aria-pressed={isSelected}
                aria-label={`Number ${n}`}
                data-testid={`number-cell-${n}`}
                className={`aspect-square rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg md:text-xl transition-all duration-150 active:scale-95 border-2 ${
                  isSelected
                    ? "bg-sky-500 text-white border-sky-700 scale-110 shadow-lg ring-2 ring-amber-400 z-10"
                    : isTens
                      ? "bg-amber-200 text-amber-900 border-amber-400 hover:bg-amber-300 hover:-translate-y-0.5"
                      : "bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100 hover:-translate-y-0.5"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className={`mt-4 flex flex-wrap items-center justify-center gap-4 text-sm ${kh ? "font-khmer text-base" : ""}`}>
          <span className="inline-flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-amber-200 border-2 border-amber-400" />
            {kh ? KH_TODO("ដប់ៗ (10, 20, 30…)") : "Counting by tens (10, 20, 30…)"}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-sky-50 border-2 border-sky-200" />
            {kh ? KH_TODO("លេខផ្សេង") : "Other numbers"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* SECTION 3 — Numbers 100 to 1,000 (Pattern Guide + Builder)           */
/* ──────────────────────────────────────────────────────────────────── */

function PatternGuideSection({ kh }: { kh: boolean }) {
  const HUNDREDS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const HUNDRED_PALETTES = [
    "from-rose-400 to-rose-500",
    "from-orange-400 to-orange-500",
    "from-amber-400 to-amber-500",
    "from-yellow-400 to-yellow-500",
    "from-lime-400 to-lime-500",
    "from-emerald-400 to-emerald-500",
    "from-teal-400 to-teal-500",
    "from-sky-400 to-sky-500",
    "from-violet-400 to-violet-500",
    "from-fuchsia-500 to-pink-500",
  ];

  const [hundreds, setHundreds] = useState(200);
  const [tens, setTens] = useState(40);
  const [ones, setOnes] = useState(5);
  const total = hundreds + tens + ones;

  // Which hundreds card is currently being spoken — drives the glow / pulse.
  const [playing, setPlaying] = useState<number | null>(null);
  const playTimerRef = useRef<number | null>(null);

  // Cancel any in-flight speech and the visual "playing" state on unmount.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (playTimerRef.current !== null) {
        window.clearTimeout(playTimerRef.current);
      }
    };
  }, []);

  function speakHundred(h: number) {
    const word = numberToWords(h); // e.g. "Three hundred"

    // Clear any pending fallback timer from the previous utterance.
    if (playTimerRef.current !== null) {
      window.clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }

    // Sync UI to actual utterance lifecycle. We only clear `playing` if the
    // ended utterance is still the active one — otherwise a rapid second tap
    // would have already moved `playing` to a new card and we mustn't undo it.
    const clearIfStillActive = () => {
      setPlaying((current) => (current === h ? null : current));
    };

    // speakText() internally calls speechSynthesis.cancel() before speaking,
    // so rapid taps never overlap.
    const result = speakText(word, "en-US", {
      onEnd: clearIfStillActive,
      onError: clearIfStillActive,
    });
    if (!result.ok) return;

    setPlaying(h);

    // Safety-net timer — covers browsers that occasionally drop `end` events
    // (e.g. Safari background tabs). 3.5s is comfortably longer than any of
    // the spoken phrases at rate 0.85.
    playTimerRef.current = window.setTimeout(() => {
      clearIfStillActive();
      playTimerRef.current = null;
    }, 3500);
  }

  function reset() {
    setHundreds(0); setTens(0); setOnes(0);
  }

  return (
    <div>
      <SectionHeader
        kh={kh}
        en="See the pattern of hundreds, then build your own number!"
        khText={KH_TODO("មើលលំនាំនៃរយ បន្ទាប់មកសាងសង់លេខផ្ទាល់ខ្លួន!")}
        accent="emerald"
      />

      {/* Hundreds gallery — every card is a tappable pronunciation button */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-8">
        {HUNDREDS.map((h, idx) => {
          const word = numberToWords(h);
          const isPlaying = playing === h;
          return (
            <button
              key={h}
              type="button"
              onClick={() => speakHundred(h)}
              aria-label={
                kh
                  ? KH_TODO(`ស្ដាប់ការបញ្ចេញសំឡេងនៃ ${word}`)
                  : `Listen to the pronunciation of ${word}`
              }
              aria-pressed={isPlaying}
              data-testid={`hundreds-card-${h}`}
              className={`relative group rounded-2xl border-4 ${
                isPlaying ? "border-white animate-pulse-glow" : "border-white"
              } shadow-lg p-4 text-center text-white bg-gradient-to-br ${HUNDRED_PALETTES[idx]} transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${
                isPlaying ? "scale-105 ring-4 ring-white/80 ring-offset-2 ring-offset-transparent" : ""
              }`}
            >
              {/* Speaker icon — top-right corner */}
              <span
                aria-hidden="true"
                className={`absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900/35 ring-1 ring-white/60 backdrop-blur-sm transition-all ${
                  isPlaying
                    ? "bg-white/95 ring-white scale-110"
                    : "group-hover:bg-slate-900/55"
                }`}
              >
                <Volume2
                  className={`w-3.5 h-3.5 ${isPlaying ? "text-slate-800" : "text-white"}`}
                />
              </span>

              <div className="font-display font-black text-4xl sm:text-5xl leading-none">
                {h}
              </div>
              <div className="mt-2 font-bold text-sm sm:text-base">{word}</div>
              {kh && (
                <div className="mt-1 font-khmer text-xs opacity-90">
                  {KH_TODO("(បកប្រែខ្មែរ)")}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* The pattern explainer */}
      <div className="rounded-3xl bg-white border-4 border-emerald-200 shadow-md p-5 sm:p-6 mb-6">
        <h3 className={`font-display font-extrabold text-xl sm:text-2xl text-emerald-700 mb-2 ${kh ? "font-khmer text-lg sm:text-xl" : ""}`}>
          {kh ? KH_TODO("លំនាំ៖ បន្ថែម «រយ»") : "The Pattern: just add 'hundred'!"}
        </h3>
        <p className={`text-slate-700 text-base sm:text-lg leading-relaxed ${kh ? "font-khmer text-lg sm:text-xl leading-loose" : ""}`}>
          {kh
            ? KH_TODO("រាល់លេខពី ១០០ ដល់ ៩០០ គឺគ្រាន់តែ «one», «two», «three»… បន្ថែមដោយ «hundred»។ ឧទាហរណ៍៖ 3 → three → 300 → three hundred។")
            : "Every number from 100 to 900 is just 'one', 'two', 'three'… with the word 'hundred' added. Example: 3 → three → 300 → three hundred."}
        </p>
      </div>

      {/* Number builder */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-sky-50 border-4 border-emerald-300 shadow-xl p-5 sm:p-7">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <h3 className={`font-display font-extrabold text-xl sm:text-2xl text-emerald-700 ${kh ? "font-khmer text-lg sm:text-xl" : ""}`}>
            {kh ? KH_TODO("ឧបករណ៍សាងសង់លេខ") : "Number Builder"}
          </h3>
        </div>
        <p className={`text-slate-600 text-sm sm:text-base mb-5 ${kh ? "font-khmer text-base sm:text-lg" : ""}`}>
          {kh
            ? KH_TODO("ជ្រើសរើសរយ ដប់ និងឯកតា — បន្ទាប់មកមើលលេខចុងក្រោយ!")
            : "Pick hundreds, tens, and ones — then see the final number!"}
        </p>

        {/* The three pickers */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          <PickerColumn
            label={kh ? KH_TODO("រយ") : "Hundreds"}
            sublabel={kh ? KH_TODO("(រយ)") : "(100s)"}
            color="emerald"
            value={hundreds}
            options={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900]}
            onChange={setHundreds}
          />
          <PickerColumn
            label={kh ? KH_TODO("ដប់") : "Tens"}
            sublabel={kh ? KH_TODO("(ដប់)") : "(10s)"}
            color="sky"
            value={tens}
            options={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
            onChange={setTens}
          />
          <PickerColumn
            label={kh ? KH_TODO("ឯកតា") : "Ones"}
            sublabel={kh ? KH_TODO("(ឯកតា)") : "(1s)"}
            color="rose"
            value={ones}
            options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            onChange={setOnes}
          />
        </div>

        {/* Equation visualization */}
        <div className="mt-6 rounded-2xl bg-white border-2 border-slate-200 p-4 sm:p-5 text-center">
          <div className="font-display font-black text-2xl sm:text-3xl text-slate-700 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-emerald-600">{hundreds}</span>
            <span className="text-slate-400">+</span>
            <span className="text-sky-600">{tens}</span>
            <span className="text-slate-400">+</span>
            <span className="text-rose-600">{ones}</span>
            <span className="text-slate-400">=</span>
            <span className="px-3 py-1 rounded-xl bg-amber-200 text-amber-900 border-2 border-amber-400 shadow-sm">
              {total}
            </span>
          </div>

          <div className="mt-4">
            <div className={`text-slate-500 text-xs uppercase tracking-wider font-bold ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
              {kh ? KH_TODO("ជាពាក្យអង់គ្លេស") : "In English Words"}
            </div>
            <div className="mt-1 font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-800 leading-tight break-words">
              {numberToWords(total)}
            </div>
            {kh && (
              <div className="mt-1 text-sm italic text-slate-400">
                {KH_TODO("(បកប្រែខ្មែរនឹងបន្ថែមនៅពេលក្រោយ)")}
              </div>
            )}
          </div>
        </div>

        {/* Reset */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={reset}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border-2 border-slate-200 active:scale-95 transition ${kh ? "font-khmer text-base" : ""}`}
          >
            <RotateCcw className="w-4 h-4" />
            {kh ? KH_TODO("ចាប់ផ្ដើមឡើងវិញ") : "Reset"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function PickerColumn({
  label, sublabel, value, options, onChange, color,
}: {
  label: string; sublabel: string;
  value: number; options: number[];
  onChange: (n: number) => void;
  color: "emerald" | "sky" | "rose";
}) {
  const palette = {
    emerald: { ring: "ring-emerald-400", text: "text-emerald-700",  active: "bg-emerald-500 text-white border-emerald-700" },
    sky:     { ring: "ring-sky-400",     text: "text-sky-700",      active: "bg-sky-500 text-white border-sky-700" },
    rose:    { ring: "ring-rose-400",    text: "text-rose-700",     active: "bg-rose-500 text-white border-rose-700" },
  }[color];
  return (
    <div className="rounded-2xl bg-white border-2 border-slate-200 p-3">
      <div className="text-center mb-2">
        <div className={`font-display font-extrabold text-lg ${palette.text}`}>{label}</div>
        <div className="text-xs text-slate-400 font-mono">{sublabel}</div>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`px-1 py-2 rounded-lg font-bold text-sm border-2 transition active:scale-95 ${
                active
                  ? `${palette.active} shadow-md scale-105`
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function SectionHeader({
  kh, en, khText, accent,
}: { kh: boolean; en: string; khText: string; accent: "rose" | "sky" | "emerald" | "indigo" | "fuchsia" | "violet" }) {
  const palette = {
    rose:    "from-rose-100 to-pink-100 border-rose-300 text-rose-800",
    sky:     "from-sky-100 to-cyan-100 border-sky-300 text-sky-800",
    emerald: "from-emerald-100 to-teal-100 border-emerald-300 text-emerald-800",
    indigo:  "from-indigo-100 to-violet-100 border-indigo-300 text-indigo-800",
    fuchsia: "from-fuchsia-100 to-pink-100 border-fuchsia-300 text-fuchsia-800",
    violet:  "from-violet-100 to-purple-100 border-violet-300 text-violet-800",
  }[accent];
  return (
    <div className={`mb-5 rounded-2xl border-2 bg-gradient-to-r ${palette} px-5 py-4 flex items-start gap-3`}>
      <ChevronRight className="w-6 h-6 mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <div className={`font-bold text-lg sm:text-xl leading-snug ${kh ? "font-khmer text-xl sm:text-2xl leading-loose" : ""}`}>
          {kh ? khText : en}
        </div>
        {kh && <div className="text-xs italic opacity-70 mt-0.5">{en}</div>}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* SECTION 4 — Days of the Week (ថ្ងៃនៃសប្តាហ៍)                       */
/* ──────────────────────────────────────────────────────────────────── */

/**
 * Index matches `Date.prototype.getDay()` — 0 = Sunday … 6 = Saturday.
 * Each day gets its own vibrant gradient to anchor visual memory.
 */
const DAYS_OF_WEEK = [
  { en: "Sunday",    kh: "ថ្ងៃអាទិត្យ", emoji: "☀️", gradient: "from-rose-400 via-pink-500 to-fuchsia-500" },
  { en: "Monday",    kh: "ថ្ងៃច័ន្ទ",   emoji: "🌙", gradient: "from-amber-400 via-orange-500 to-rose-500" },
  { en: "Tuesday",   kh: "ថ្ងៃអង្គារ",  emoji: "🔥", gradient: "from-red-400 via-rose-500 to-pink-600" },
  { en: "Wednesday", kh: "ថ្ងៃពុធ",    emoji: "🌿", gradient: "from-emerald-400 via-green-500 to-teal-600" },
  { en: "Thursday",  kh: "ថ្ងៃព្រហស្បតិ៍", emoji: "🌟", gradient: "from-yellow-400 via-amber-500 to-orange-500" },
  { en: "Friday",    kh: "ថ្ងៃសុក្រ",   emoji: "💎", gradient: "from-sky-400 via-cyan-500 to-blue-600" },
  { en: "Saturday",  kh: "ថ្ងៃសៅរ៍",   emoji: "🪐", gradient: "from-indigo-400 via-violet-500 to-purple-600" },
] as const;

function DaysOfWeekSection({ kh }: { kh: boolean }) {
  // Today's index in the user's LOCAL timezone (0 = Sun … 6 = Sat). Recomputed
  // automatically whenever the local date rolls over so a page left open
  // across midnight still highlights the correct day in the morning.
  const [todayIdx, setTodayIdx] = useState<number>(() => new Date().getDay());

  useEffect(() => {
    let intervalId: number | null = null;
    // Schedule a one-shot timeout to fire at the next local midnight, then
    // switch to a steady 24h interval. This avoids drift from setInterval(24h)
    // started at an arbitrary time of day.
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 5 // 5s past midnight to dodge clock-skew edge cases
    );
    const msUntilMidnight = Math.max(1000, nextMidnight.getTime() - now.getTime());

    const timeoutId = window.setTimeout(() => {
      setTodayIdx(new Date().getDay());
      intervalId = window.setInterval(() => {
        setTodayIdx(new Date().getDay());
      }, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, []);

  // Which day card is currently being spoken — drives the glow/pulse state.
  const [playing, setPlaying] = useState<number | null>(null);
  const playTimerRef = useRef<number | null>(null);

  // Cancel any in-flight speech and the visual playing state on unmount.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (playTimerRef.current !== null) {
        window.clearTimeout(playTimerRef.current);
      }
    };
  }, []);

  function speakDay(idx: number) {
    const day = DAYS_OF_WEEK[idx];

    if (playTimerRef.current !== null) {
      window.clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }

    // Only clear `playing` if the ended utterance is still the active one —
    // a rapid second tap will have already advanced it.
    const clearIfStillActive = () => {
      setPlaying((current) => (current === idx ? null : current));
    };

    // speakText() internally calls speechSynthesis.cancel() before speaking,
    // so rapid taps never overlap. Rate is set inside speakText() (~0.85),
    // intentionally slowed for ESL learners on tricky phonetics like
    // "Wednesday" and "Thursday".
    const result = speakText(day.en, "en-US", {
      onEnd: clearIfStillActive,
      onError: clearIfStillActive,
    });
    if (!result.ok) return;

    setPlaying(idx);

    // Safety-net timer for browsers that occasionally drop `end` events.
    playTimerRef.current = window.setTimeout(() => {
      clearIfStillActive();
      playTimerRef.current = null;
    }, 3500);
  }

  return (
    <div>
      <SectionHeader
        kh={kh}
        en="Tap a day to hear it spoken — today is highlighted!"
        khText={KH_TODO("ប៉ះថ្ងៃណាមួយដើម្បីស្ដាប់ការបញ្ចេញសំឡេង — ថ្ងៃនេះត្រូវបានបន្លិច!")}
        accent="indigo"
      />

      {/* 7-card grid:
          - mobile: 2 columns (compact, scrolls vertically)
          - tablet: 4 columns
          - desktop: 7 columns (one full week in a row) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {DAYS_OF_WEEK.map((day, idx) => {
          const isPlaying = playing === idx;
          const isToday = todayIdx === idx;
          return (
            <button
              key={day.en}
              type="button"
              onClick={() => speakDay(idx)}
              aria-label={
                // Always include both languages so screen readers configured
                // in either English OR Khmer announce the matching day name.
                `Listen to the pronunciation of ${day.en} / ${day.kh}${
                  isToday ? ` — Today / ${KH_TODO("ថ្ងៃនេះ")}` : ""
                }`
              }
              aria-pressed={isPlaying}
              aria-current={isToday ? "date" : undefined}
              data-testid={`day-card-${day.en.toLowerCase()}`}
              className={`relative group rounded-2xl border-4 shadow-lg p-4 text-center text-white bg-gradient-to-br ${day.gradient} transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${
                isToday
                  ? "border-yellow-300 ring-4 ring-yellow-300/70 ring-offset-2 ring-offset-transparent"
                  : "border-white"
              } ${
                isPlaying
                  ? "scale-105 ring-4 ring-white/80 ring-offset-2 ring-offset-transparent animate-pulse-glow"
                  : ""
              }`}
            >
              {/* Speaker icon — top-right corner */}
              <span
                aria-hidden="true"
                className={`absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900/35 ring-1 ring-white/60 backdrop-blur-sm transition-all ${
                  isPlaying
                    ? "bg-white/95 ring-white scale-110"
                    : "group-hover:bg-slate-900/55"
                }`}
              >
                <Volume2
                  className={`w-3.5 h-3.5 ${isPlaying ? "text-slate-800" : "text-white"}`}
                />
              </span>

              {/* "Today / ថ្ងៃនេះ" badge — top-left corner, only on the matching card.
                  Always shows both languages so learners always see both forms. */}
              {isToday && (
                <span
                  className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-300 text-slate-900 text-[10px] font-extrabold tracking-wider shadow"
                  data-testid={`day-card-${day.en.toLowerCase()}-today-badge`}
                >
                  <Star className="w-3 h-3 fill-current" aria-hidden />
                  <span className="uppercase">Today</span>
                  <span className="font-khmer normal-case tracking-normal text-xs">
                    {KH_TODO("ថ្ងៃនេះ")}
                  </span>
                </span>
              )}

              {/* Emoji visual */}
              <div className="text-4xl sm:text-5xl mt-4 mb-1" aria-hidden>
                {day.emoji}
              </div>

              {/* English day name — drop-shadow keeps white text legible
                  even on the bright yellow/orange Thursday gradient. */}
              <div className="font-display font-extrabold text-xl sm:text-2xl leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.45)]">
                {day.en}
              </div>

              {/* Khmer translation — always shown so learners get the bridge.
                  Uses the same shadow as the English name so contrast is
                  consistent across both lines on bright gradients. */}
              <div className="font-khmer text-sm sm:text-base mt-1 text-white leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.45)]">
                {day.kh}
              </div>
            </button>
          );
        })}
      </div>

      {/* Helpful caption that names today's date in plain language */}
      <div className="mt-6 text-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border-2 border-indigo-200 text-indigo-800 font-bold shadow-sm ${
            kh ? "font-khmer" : ""
          }`}
          data-testid="days-today-caption"
        >
          <CalendarDays className="w-4 h-4" />
          {kh
            ? KH_TODO(`ថ្ងៃនេះគឺ ${DAYS_OF_WEEK[todayIdx].kh}`)
            : `Today is ${DAYS_OF_WEEK[todayIdx].en}`}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* SECTION 5 — Months of the Year (ខែនៃឆ្នាំ)                          */
/* ──────────────────────────────────────────────────────────────────── */

/**
 * Index matches `Date.prototype.getMonth()` — 0 = January … 11 = December.
 * Each month gets its own vibrant gradient to anchor visual memory, just
 * like the Days of the Week tab.
 */
const MONTHS_OF_YEAR = [
  { en: "January",   kh: "មករា",    emoji: "❄️", gradient: "from-sky-400 via-cyan-500 to-blue-600" },
  { en: "February",  kh: "កុម្ភៈ",   emoji: "💖", gradient: "from-pink-400 via-rose-500 to-red-500" },
  { en: "March",     kh: "មីនា",    emoji: "🌷", gradient: "from-emerald-400 via-green-500 to-teal-500" },
  { en: "April",     kh: "មេសា",    emoji: "🌧️", gradient: "from-teal-400 via-cyan-500 to-sky-600" },
  { en: "May",       kh: "ឧសភា",    emoji: "🌸", gradient: "from-fuchsia-400 via-pink-500 to-rose-500" },
  { en: "June",      kh: "មិថុនា",   emoji: "☀️", gradient: "from-amber-400 via-orange-500 to-rose-500" },
  { en: "July",      kh: "កក្កដា",   emoji: "🎆", gradient: "from-red-400 via-rose-500 to-pink-600" },
  { en: "August",    kh: "សីហា",    emoji: "🏖️", gradient: "from-yellow-400 via-amber-500 to-orange-500" },
  { en: "September", kh: "កញ្ញា",    emoji: "🍂", gradient: "from-orange-400 via-amber-500 to-yellow-500" },
  { en: "October",   kh: "តុលា",    emoji: "🎃", gradient: "from-orange-500 via-red-500 to-rose-600" },
  { en: "November",  kh: "វិច្ឆិកា",  emoji: "🍁", gradient: "from-amber-500 via-orange-600 to-red-600" },
  { en: "December",  kh: "ធ្នូ",     emoji: "🎄", gradient: "from-emerald-500 via-green-600 to-teal-700" },
] as const;

function MonthsOfYearSection({ kh }: { kh: boolean }) {
  // Current month in the user's LOCAL timezone (0 = Jan … 11 = Dec). Recomputed
  // automatically whenever the local date rolls over so a page left open
  // across a month boundary still highlights the correct month.
  const [thisMonthIdx, setThisMonthIdx] = useState<number>(() => new Date().getMonth());

  useEffect(() => {
    let intervalId: number | null = null;
    const now = new Date();
    // Schedule a one-shot timeout to fire shortly after the next local
    // midnight, then poll once per day. A daily poll is enough to catch the
    // month boundary — we don't need to land exactly on the 1st.
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 5, // 5s past midnight to dodge clock-skew edge cases
    );
    const msUntilMidnight = Math.max(1000, nextMidnight.getTime() - now.getTime());

    const timeoutId = window.setTimeout(() => {
      setThisMonthIdx(new Date().getMonth());
      intervalId = window.setInterval(() => {
        setThisMonthIdx(new Date().getMonth());
      }, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, []);

  // Which month card is currently being spoken — drives the glow/pulse state.
  const [playing, setPlaying] = useState<number | null>(null);
  const playTimerRef = useRef<number | null>(null);

  // Cancel any in-flight speech and the visual playing state on unmount.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (playTimerRef.current !== null) {
        window.clearTimeout(playTimerRef.current);
      }
    };
  }, []);

  function speakMonth(idx: number) {
    const month = MONTHS_OF_YEAR[idx];

    if (playTimerRef.current !== null) {
      window.clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }

    // Only clear `playing` if the ended utterance is still the active one —
    // a rapid second tap will have already advanced it.
    const clearIfStillActive = () => {
      setPlaying((current) => (current === idx ? null : current));
    };

    const result = speakText(month.en, "en-US", {
      onEnd: clearIfStillActive,
      onError: clearIfStillActive,
    });
    if (!result.ok) return;

    setPlaying(idx);

    // Safety-net timer for browsers that occasionally drop `end` events.
    playTimerRef.current = window.setTimeout(() => {
      clearIfStillActive();
      playTimerRef.current = null;
    }, 3500);
  }

  const TIME_FACTS = [
    { Icon: Sun,           en: "1 Year = 12 Months",  kh: KH_TODO("១ ឆ្នាំ = ១២ ខែ"),     accent: "from-amber-100 to-amber-200 border-amber-300 text-amber-800" },
    { Icon: CalendarRange, en: "1 Year = 52 Weeks",   kh: KH_TODO("១ ឆ្នាំ = ៥២ សប្តាហ៍"), accent: "from-sky-100 to-sky-200 border-sky-300 text-sky-800" },
    { Icon: CheckCircle2,  en: "1 Year = 365 Days",   kh: KH_TODO("១ ឆ្នាំ = ៣៦៥ ថ្ងៃ"),  accent: "from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-800" },
  ] as const;

  return (
    <div>
      <SectionHeader
        kh={kh}
        en="Tap a month to hear it spoken — this month is highlighted!"
        khText={KH_TODO("ប៉ះខែណាមួយដើម្បីស្ដាប់ការបញ្ចេញសំឡេង — ខែនេះត្រូវបានបន្លិច!")}
        accent="fuchsia"
      />

      {/* Time-Facts banner — soft, friendly, bilingual. Stacks on mobile,
          fans into 3 columns from sm-up. */}
      <div
        className="mb-6 rounded-3xl border-4 border-amber-200 bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 p-4 sm:p-5 shadow-sm"
        data-testid="months-time-facts-banner"
      >
        <div
          className={`text-center text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 mb-3 ${
            kh ? "font-khmer normal-case tracking-normal text-sm sm:text-base" : ""
          }`}
        >
          {kh ? KH_TODO("ការពិតអំពីពេលវេលា") : "Time Facts"}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TIME_FACTS.map((fact) => (
            <div
              key={fact.en}
              className={`flex items-center gap-3 rounded-2xl bg-gradient-to-br ${fact.accent} border-2 px-4 py-3 shadow-sm`}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/70 ring-2 ring-white shadow-inner shrink-0">
                <fact.Icon className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <div className="font-display font-extrabold text-lg sm:text-xl leading-tight">
                  {fact.en}
                </div>
                <div className="font-khmer text-sm sm:text-base leading-relaxed opacity-90">
                  {fact.kh}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 12-card grid:
          - mobile: 2 columns
          - tablet: 3 columns
          - desktop: 4 columns
          - xl: 6 columns (two full half-years per row) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
        {MONTHS_OF_YEAR.map((month, idx) => {
          const isPlaying = playing === idx;
          const isThisMonth = thisMonthIdx === idx;
          return (
            <button
              key={month.en}
              type="button"
              onClick={() => speakMonth(idx)}
              aria-label={
                `Listen to the pronunciation of ${month.en} / ${month.kh}${
                  isThisMonth ? ` — This month / ${KH_TODO("ខែនេះ")}` : ""
                }`
              }
              aria-pressed={isPlaying}
              aria-current={isThisMonth ? "date" : undefined}
              data-testid={`month-card-${month.en.toLowerCase()}`}
              className={`relative group rounded-2xl border-4 shadow-lg p-4 text-center text-white bg-gradient-to-br ${month.gradient} transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${
                isThisMonth
                  ? "border-yellow-300 ring-4 ring-yellow-300/70 ring-offset-2 ring-offset-transparent"
                  : "border-white"
              } ${
                isPlaying
                  ? "scale-105 ring-4 ring-white/80 ring-offset-2 ring-offset-transparent animate-pulse-glow"
                  : ""
              }`}
            >
              {/* Speaker icon — top-right corner */}
              <span
                aria-hidden="true"
                className={`absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900/35 ring-1 ring-white/60 backdrop-blur-sm transition-all ${
                  isPlaying
                    ? "bg-white/95 ring-white scale-110"
                    : "group-hover:bg-slate-900/55"
                }`}
              >
                <Volume2
                  className={`w-3.5 h-3.5 ${isPlaying ? "text-slate-800" : "text-white"}`}
                />
              </span>

              {/* "This month / ខែនេះ" badge — top-left corner, only on the matching card. */}
              {isThisMonth && (
                <span
                  className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-300 text-slate-900 text-[10px] font-extrabold tracking-wider shadow"
                  data-testid={`month-card-${month.en.toLowerCase()}-this-month-badge`}
                >
                  <Star className="w-3 h-3 fill-current" aria-hidden />
                  <span className="uppercase">This Month</span>
                  <span className="font-khmer normal-case tracking-normal text-xs">
                    {KH_TODO("ខែនេះ")}
                  </span>
                </span>
              )}

              {/* Month-number chip — small visual anchor (1..12) */}
              <div className="mt-3 inline-flex items-center justify-center min-w-[1.75rem] h-6 px-1.5 rounded-md bg-slate-900/30 ring-1 ring-white/40 font-mono text-[11px] font-bold text-white/95">
                {idx + 1}
              </div>

              {/* Emoji visual */}
              <div className="text-4xl sm:text-5xl mt-1 mb-1" aria-hidden>
                {month.emoji}
              </div>

              {/* English month name */}
              <div className="font-display font-extrabold text-lg sm:text-xl leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.45)]">
                {month.en}
              </div>

              {/* Khmer translation */}
              <div className="font-khmer text-sm sm:text-base mt-1 text-white leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.45)]">
                {month.kh}
              </div>
            </button>
          );
        })}
      </div>

      {/* Helpful caption that names the current month in plain language */}
      <div className="mt-6 text-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border-2 border-fuchsia-200 text-fuchsia-800 font-bold shadow-sm ${
            kh ? "font-khmer" : ""
          }`}
          data-testid="months-this-month-caption"
        >
          <CalendarRange className="w-4 h-4" />
          {kh
            ? KH_TODO(`ខែនេះគឺ ${MONTHS_OF_YEAR[thisMonthIdx].kh}`)
            : `This month is ${MONTHS_OF_YEAR[thisMonthIdx].en}`}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* SECTION 6 — Question Words (ពាក្យសួរ): The 5 Ws                     */
/* ──────────────────────────────────────────────────────────────────── */

type QuestionWord = {
  id: string;
  word: string;
  wordKh: string;
  roleEn: string;
  roleKh: string;
  emoji: string;
  exampleEn: string;
  exampleKh: string;
  answerEn: string;
  answerKh: string;
  palette: string;
  ringColor: string;
  badgeColor: string;
};

const QUESTION_WORDS: QuestionWord[] = [
  {
    id: "who",
    word: "Who",
    wordKh: KH_TODO("នរណា"),
    roleEn: "The Person",
    roleKh: KH_TODO("មនុស្ស"),
    emoji: "🧑‍🤝‍🧑",
    exampleEn: "Who is that?",
    exampleKh: KH_TODO("តើនោះជានរណា?"),
    answerEn: "It is my friend.",
    answerKh: KH_TODO("គាត់គឺជាមិត្តរបស់ខ្ញុំ។"),
    palette: "from-rose-100 to-pink-200 border-rose-300 text-rose-700",
    ringColor: "ring-rose-400",
    badgeColor: "bg-rose-500",
  },
  {
    id: "what",
    word: "What",
    wordKh: KH_TODO("អ្វី"),
    roleEn: "The Thing",
    roleKh: KH_TODO("វត្ថុ"),
    emoji: "📦",
    exampleEn: "What is this?",
    exampleKh: KH_TODO("តើនេះគឺជាអ្វី?"),
    answerEn: "It is a book.",
    answerKh: KH_TODO("វាគឺជាសៀវភៅ។"),
    palette: "from-amber-100 to-yellow-200 border-amber-300 text-amber-700",
    ringColor: "ring-amber-400",
    badgeColor: "bg-amber-500",
  },
  {
    id: "when",
    word: "When",
    wordKh: KH_TODO("នៅពេលណា"),
    roleEn: "The Time",
    roleKh: KH_TODO("ពេលវេលា"),
    emoji: "⏰",
    exampleEn: "When is school?",
    exampleKh: KH_TODO("តើសាលារៀនចាប់ផ្តើមនៅពេលណា?"),
    answerEn: "School is at 7:00 AM.",
    answerKh: KH_TODO("នៅម៉ោង ៧ ព្រឹក។"),
    palette: "from-emerald-100 to-teal-200 border-emerald-300 text-emerald-700",
    ringColor: "ring-emerald-400",
    badgeColor: "bg-emerald-500",
  },
  {
    id: "where",
    word: "Where",
    wordKh: KH_TODO("នៅឯណា"),
    roleEn: "The Place",
    roleKh: KH_TODO("ទីកន្លែង"),
    emoji: "🏠",
    exampleEn: "Where are you?",
    exampleKh: KH_TODO("តើអ្នកនៅឯណា?"),
    answerEn: "I am at home.",
    answerKh: KH_TODO("ខ្ញុំនៅផ្ទះ។"),
    palette: "from-sky-100 to-blue-200 border-sky-300 text-sky-700",
    ringColor: "ring-sky-400",
    badgeColor: "bg-sky-500",
  },
  {
    id: "why",
    word: "Why",
    wordKh: KH_TODO("ហេតុអ្វី"),
    roleEn: "The Reason",
    roleKh: KH_TODO("មូលហេតុ"),
    emoji: "💡",
    exampleEn: "Why are you happy?",
    exampleKh: KH_TODO("ហេតុអ្វីបានជាអ្នកសប្បាយចិត្ត?"),
    answerEn: "Because I am learning!",
    answerKh: KH_TODO("ពីព្រោះខ្ញុំកំពុងរៀន!"),
    palette: "from-violet-100 to-purple-200 border-violet-300 text-violet-700",
    ringColor: "ring-violet-400",
    badgeColor: "bg-violet-500",
  },
];

function QuestionWordsGallery({ kh }: { kh: boolean }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div data-testid="question-words-gallery">
      <SectionHeader
        kh={kh}
        en="Tap a card to see the question and a friendly answer!"
        khText={KH_TODO("ប៉ះកាតណាមួយ ដើម្បីឃើញសំណួរ និងចម្លើយ!")}
        accent="violet"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {QUESTION_WORDS.map((q) => {
          const isOpen = selected === q.id;
          const toggle = () => setSelected(isOpen ? null : q.id);
          return (
            <div
              key={q.id}
              role="button"
              tabIndex={0}
              onClick={toggle}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle();
                }
              }}
              aria-pressed={isOpen}
              aria-label={`${q.word} — ${q.roleEn}. Tap to ${isOpen ? "hide" : "see"} the example sentence.`}
              data-testid={`question-word-${q.id}`}
              className={`group relative rounded-3xl border-4 bg-gradient-to-br ${q.palette} p-5 sm:p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${
                isOpen ? `ring-4 ring-offset-2 ${q.ringColor} -translate-y-1 scale-[1.02]` : ""
              }`}
            >
              {/* Role badge (The Person, The Thing, …) */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${q.badgeColor} text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shadow-sm ${
                  kh ? "font-khmer normal-case tracking-normal" : ""
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" aria-hidden />
                {kh ? q.roleKh : q.roleEn}
              </div>

              {/* Big emoji */}
              <div
                className="text-6xl sm:text-7xl my-3 sm:my-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                aria-hidden
              >
                {q.emoji}
              </div>

              {/* English word — large */}
              <div className="font-display font-black text-4xl sm:text-5xl leading-none">
                {q.word}
              </div>

              {/* Khmer translation */}
              <div className="font-khmer text-base sm:text-lg text-slate-700 mt-1.5">
                {q.wordKh}
              </div>

              {/* Play button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord(q.word);
                }}
                className={`mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 border-2 border-current font-bold text-xs sm:text-sm hover:bg-white active:scale-95 transition-all ${
                  kh ? "font-khmer" : ""
                }`}
                aria-label={`Play audio for ${q.word}`}
                data-testid={`question-word-${q.id}-play`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                {kh ? KH_TODO("ស្ដាប់") : "Play"}
              </button>

              {/* Revealed example sentence */}
              {isOpen && (
                <div
                  className="mt-4 rounded-2xl bg-white/85 border-2 border-current/40 p-3 sm:p-4 text-left animate-in fade-in zoom-in-95 duration-200"
                  data-testid={`question-word-${q.id}-example`}
                >
                  {/* English Q + A */}
                  <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                    <span className="opacity-70">Q:</span> {q.exampleEn}
                  </p>
                  <p className="text-sm sm:text-base text-slate-700 leading-snug mt-1">
                    <span className="opacity-70 font-bold">A:</span> {q.answerEn}
                  </p>
                  {/* Khmer Q + A */}
                  <div className="mt-2 pt-2 border-t border-current/20">
                    <p className="font-khmer text-sm sm:text-base text-slate-700 leading-loose">
                      <span className="opacity-70 font-bold">សួរ៖</span> {q.exampleKh}
                    </p>
                    <p className="font-khmer text-sm sm:text-base text-slate-700 leading-loose mt-0.5">
                      <span className="opacity-70 font-bold">ឆ្លើយ៖</span> {q.answerKh}
                    </p>
                  </div>

                  {/* Speak the full example */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(`${q.exampleEn} ${q.answerEn}`);
                    }}
                    className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-current font-bold text-xs hover:bg-slate-50 active:scale-95 transition-all ${
                      kh ? "font-khmer" : ""
                    }`}
                    aria-label={`Play full sentence for ${q.word}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {kh ? KH_TODO("ស្តាប់ប្រយោគ") : "Play sentence"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Friendly recap caption */}
      <div className="mt-6 flex justify-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border-2 border-violet-200 text-violet-800 font-bold shadow-sm ${
            kh ? "font-khmer" : ""
          }`}
          data-testid="question-words-recap"
        >
          <HelpCircle className="w-4 h-4" />
          {kh
            ? KH_TODO("៥ ពាក្យសួរសំខាន់៖ នរណា · អ្វី · នៅពេលណា · នៅឯណា · ហេតុអ្វី")
            : "5 big question words: Who · What · When · Where · Why"}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/* SECTION 7 — Colors: The Visual World (ពណ៌)                          */
/* ──────────────────────────────────────────────────────────────────── */

type ColorWord = {
  id: string;
  name: string;
  nameKh: string;
  /** Background color of the card — must be the actual color it represents. */
  bg: string;
  /** Foreground (text) color picked for legibility against the background. */
  fg: "light" | "dark";
  /** Border color (slightly darker tone of the background, for definition). */
  border: string;
  /** Decorative emoji shown in the corner of the card. */
  emoji: string;
  /** Tailwind ring color used when the card is focused/selected. */
  ringClass: string;
};

const COLOR_WORDS: ColorWord[] = [
  { id: "red",    name: "Red",    nameKh: KH_TODO("ក្រហម"),    bg: "#ef4444", fg: "light", border: "#b91c1c", emoji: "🍎", ringClass: "focus-visible:ring-red-300" },
  { id: "blue",   name: "Blue",   nameKh: KH_TODO("ខៀវ"),     bg: "#2563eb", fg: "light", border: "#1d4ed8", emoji: "🌊", ringClass: "focus-visible:ring-blue-300" },
  { id: "yellow", name: "Yellow", nameKh: KH_TODO("លឿង"),     bg: "#facc15", fg: "dark",  border: "#ca8a04", emoji: "☀️", ringClass: "focus-visible:ring-yellow-300" },
  { id: "green",  name: "Green",  nameKh: KH_TODO("បៃតង"),    bg: "#22c55e", fg: "light", border: "#15803d", emoji: "🌿", ringClass: "focus-visible:ring-green-300" },
  { id: "orange", name: "Orange", nameKh: KH_TODO("ទឹកក្រូច"), bg: "#f97316", fg: "light", border: "#c2410c", emoji: "🍊", ringClass: "focus-visible:ring-orange-300" },
  { id: "purple", name: "Purple", nameKh: KH_TODO("ស្វាយ"),    bg: "#a855f7", fg: "light", border: "#7e22ce", emoji: "🍇", ringClass: "focus-visible:ring-purple-300" },
  { id: "pink",   name: "Pink",   nameKh: KH_TODO("ផ្កាឈូក"),  bg: "#ec4899", fg: "light", border: "#be185d", emoji: "🌸", ringClass: "focus-visible:ring-pink-300" },
  { id: "brown",  name: "Brown",  nameKh: KH_TODO("ត្នោត"),    bg: "#92400e", fg: "light", border: "#78350f", emoji: "🪵", ringClass: "focus-visible:ring-amber-300" },
  { id: "black",  name: "Black",  nameKh: KH_TODO("ខ្មៅ"),     bg: "#18181b", fg: "light", border: "#000000", emoji: "🌑", ringClass: "focus-visible:ring-zinc-300" },
  { id: "white",  name: "White",  nameKh: KH_TODO("ស"),        bg: "#ffffff", fg: "dark",  border: "#cbd5e1", emoji: "☁️", ringClass: "focus-visible:ring-slate-300" },
];

function ColorsGallery({ kh }: { kh: boolean }) {
  return (
    <div data-testid="colors-gallery">
      <SectionHeader
        kh={kh}
        en="Tap a color card to hear its name!"
        khText={KH_TODO("ប៉ះកាតពណ៌ ដើម្បីស្តាប់ឈ្មោះវា!")}
        accent="fuchsia"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {COLOR_WORDS.map((c) => {
          const isLight = c.fg === "light";
          /* Foreground (text) color */
          const textPrimary = isLight ? "#ffffff" : "#0f172a";   // slate-900 for dark text
          const textSecondary = isLight ? "rgba(255,255,255,0.85)" : "rgba(15,23,42,0.75)";
          /* Translucent surface for the play button */
          const buttonBg = isLight ? "rgba(255,255,255,0.18)" : "rgba(15,23,42,0.06)";
          const buttonBorder = isLight ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.35)";

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => speakWord(c.name)}
              aria-label={`${c.name} color${kh ? ` (${c.nameKh})` : ""}. Tap to hear the name.`}
              data-testid={`color-card-${c.id}`}
              className={`group relative overflow-hidden rounded-3xl border-4 p-5 sm:p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-4 ${c.ringClass}`}
              style={{
                backgroundColor: c.bg,
                borderColor: c.border,
                color: textPrimary,
                /* A soft lift shadow tinted with the card's own color */
                boxShadow: `0 6px 18px -8px ${c.border}`,
              }}
            >
              {/* Decorative emoji in the corner */}
              <span
                aria-hidden
                className="absolute top-2 right-2 text-2xl sm:text-3xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
              >
                {c.emoji}
              </span>

              {/* Color swatch dot — inner ring shows pure color even if background is busy */}
              <span
                aria-hidden
                className="inline-block w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 mt-2 mb-3"
                style={{
                  backgroundColor: c.bg,
                  borderColor: isLight ? "rgba(255,255,255,0.7)" : "rgba(15,23,42,0.25)",
                  boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.06)",
                }}
              />

              {/* English name — large bold */}
              <div
                className="font-display font-black text-3xl sm:text-4xl leading-none"
                style={{ color: textPrimary }}
                data-testid={`color-card-${c.id}-name`}
              >
                {c.name}
              </div>

              {/* Khmer translation */}
              <div
                className="font-khmer text-base sm:text-lg mt-1.5"
                style={{ color: textSecondary }}
                data-testid={`color-card-${c.id}-name-kh`}
              >
                {c.nameKh}
              </div>

              {/* Play button — visually styled but is a span (the whole card is the button) */}
              <span
                className={`mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 font-bold text-xs sm:text-sm transition-all group-hover:scale-105 ${
                  kh ? "font-khmer" : ""
                }`}
                style={{
                  backgroundColor: buttonBg,
                  borderColor: buttonBorder,
                  color: textPrimary,
                }}
              >
                <Volume2 className="w-3.5 h-3.5" aria-hidden />
                {kh ? KH_TODO("ស្ដាប់") : "Play"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Friendly recap caption */}
      <div className="mt-6 flex justify-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border-2 border-pink-200 text-pink-800 font-bold shadow-sm ${
            kh ? "font-khmer" : ""
          }`}
          data-testid="colors-recap"
        >
          <Palette className="w-4 h-4" />
          {kh
            ? KH_TODO("១០ ពណ៌សំខាន់ — ពិភពលោកដ៏ស្រស់ស្អាត!")
            : "10 colors — the bright, beautiful world!"}
        </div>
      </div>
    </div>
  );
}
