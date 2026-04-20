import { useMemo, useState } from "react";
import {
  Sparkles, Volume2, BookOpen, Hash, Layers3, RotateCcw, ChevronRight,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakWord } from "@/lib/speech";

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

/* ──────────────────────────────────────────────────────────────────── */

export default function BeginnerGuidePage() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [tab, setTab] = useState<"alphabet" | "numbers" | "pattern">("alphabet");

  const tabs: { id: typeof tab; en: string; kh: string; icon: typeof BookOpen; color: string }[] = [
    { id: "alphabet", en: "Alphabet A–Z",        kh: KH_TODO("អក្ខរក្រម A–Z"),     icon: BookOpen, color: "bg-rose-500" },
    { id: "numbers",  en: "Numbers 1 to 100",    kh: KH_TODO("លេខ ១ ដល់ ១០០"),    icon: Hash,     color: "bg-sky-500" },
    { id: "pattern",  en: "100 to 1,000",        kh: KH_TODO("១០០ ដល់ ១,០០០"),    icon: Layers3,  color: "bg-emerald-500" },
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
      <div className="rounded-3xl bg-white border-4 border-sky-200 shadow-md p-5 sm:p-6 mb-5 text-center min-h-[140px] flex flex-col items-center justify-center">
        {selected === null ? (
          <p className={`text-slate-500 text-base sm:text-lg ${kh ? "font-khmer text-lg sm:text-xl" : ""}`}>
            {kh
              ? KH_TODO("ចុចលេខណាមួយខាងក្រោម…")
              : "Click any number below to see it big!"}
          </p>
        ) : (
          <>
            <div className="font-display font-black text-7xl sm:text-8xl text-sky-600 leading-none animate-in zoom-in-50 fade-in duration-200">
              {selected}
            </div>
            <div className={`mt-2 font-bold text-2xl sm:text-3xl text-slate-800 ${kh ? "font-khmer text-xl sm:text-2xl" : ""}`}>
              {numberToWords(selected)}
            </div>
            {kh && (
              <div className="mt-1 text-sm italic text-slate-500">
                {KH_TODO("(កន្លែងបម្រុងសម្រាប់បកប្រែខ្មែរ)")}
              </div>
            )}
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
                onClick={() => setSelected(isSelected ? null : n)}
                aria-pressed={isSelected}
                aria-label={`Number ${n}`}
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

      {/* Hundreds gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-8">
        {HUNDREDS.map((h, idx) => (
          <div
            key={h}
            className={`rounded-2xl border-4 border-white shadow-lg p-4 text-center text-white bg-gradient-to-br ${HUNDRED_PALETTES[idx]} transform hover:scale-105 transition-transform`}
          >
            <div className="font-display font-black text-4xl sm:text-5xl leading-none">{h}</div>
            <div className="mt-2 font-bold text-sm sm:text-base">
              {numberToWords(h)}
            </div>
            {kh && (
              <div className="mt-1 font-khmer text-xs opacity-90">
                {KH_TODO("(បកប្រែខ្មែរ)")}
              </div>
            )}
          </div>
        ))}
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
}: { kh: boolean; en: string; khText: string; accent: "rose" | "sky" | "emerald" }) {
  const palette = {
    rose:    "from-rose-100 to-pink-100 border-rose-300 text-rose-800",
    sky:     "from-sky-100 to-cyan-100 border-sky-300 text-sky-800",
    emerald: "from-emerald-100 to-teal-100 border-emerald-300 text-emerald-800",
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
