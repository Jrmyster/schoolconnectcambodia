import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  PenLine,
  Check,
  X,
  Sparkles,
  Lightbulb,
  RotateCcw,
  ChevronRight,
  BookOpenCheck,
  Trophy,
  Eraser,
  Loader2,
  WifiOff,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  The Spelling Forge — កម្មវិធីពិនិត្យអក្ខរាវិរុទ្ធ
//
//    1. Smart Type — instant green/red feedback + closest-match suggestions
//    2. Tricky Words — homophone fill-in-the-blank mini-game
//
//  Aesthetic: distraction-free notepad — cream paper #fdfaf0, blue ruled
//  lines, red margin line, classic serif body + handwriting accents.
// ════════════════════════════════════════════════════════════════════════════

// ─────────────────────── Common-words list (helper only) ────────────────────
// IMPORTANT: This list is NO LONGER the source of truth for "is this a word?".
// Validation goes through the live dictionary API (see checkWord below).
// This list is used only for two UX helpers:
//   (1) Levenshtein "did-you-mean" suggestions when the API confirms a word
//       is invalid (the API doesn't return spelling suggestions itself).
//   (2) Nothing else — we no longer pre-seed any cache from it.
const COMMON_WORDS = [
  // basic / pronouns / determiners
  "a","an","the","i","you","he","she","it","we","they","me","him","her","us","them",
  "my","your","his","its","our","their","this","that","these","those","what","which","who","whom","whose","why","when","where","how",
  // common verbs
  "be","am","is","are","was","were","been","being","have","has","had","having","do","does","did","done","doing",
  "go","goes","went","gone","going","come","comes","came","coming","get","gets","got","gotten","getting",
  "make","makes","made","making","take","takes","took","taken","taking","see","sees","saw","seen","seeing",
  "say","says","said","saying","know","knew","known","knowing","think","thought","thinking",
  "want","wants","wanted","need","needs","needed","like","likes","liked","love","loves","loved",
  "feel","feels","felt","leave","leaves","left","find","finds","found","tell","tells","told",
  "ask","asks","asked","work","works","worked","seem","seemed","try","tried","trying","call","called","calling",
  "look","looked","looking","use","used","using","help","helped","helping","play","played","playing",
  "run","runs","ran","running","walk","walked","walking","talk","talked","talking","read","reads","reading",
  "write","writes","wrote","written","writing","speak","spoke","spoken","speaking","listen","listened","listening",
  "learn","learned","learning","teach","taught","teaching","study","studies","studied","studying","practice","practiced",
  "open","opened","opening","close","closed","closing","start","started","starting","stop","stopped","stopping",
  "begin","began","begun","beginning","end","ended","ending","finish","finished","finishing",
  "build","built","building","break","broke","broken","breaking","fix","fixed","fixing",
  "buy","bought","buying","sell","sold","selling","pay","paid","paying","cost","costs",
  "eat","ate","eaten","eating","drink","drank","drunk","drinking","sleep","slept","sleeping",
  "wake","woke","woken","waking","sit","sat","sitting","stand","stood","standing",
  "give","gave","given","giving","bring","brought","bringing","send","sent","sending",
  "receive","received","receiving","keep","kept","keeping","hold","held","holding","carry","carried","carrying",
  "show","showed","shown","showing","wear","wore","worn","wearing","grow","grew","grown","growing",
  "live","lived","living","die","died","dying","born","change","changed","changing",
  "believe","believed","believing","understand","understood","understanding","remember","remembered","forget","forgot","forgotten",
  "happen","happened","happening","become","became","becoming","mean","meant","meaning",
  "win","won","winning","lose","lost","losing","follow","followed","following","watch","watched","watching",
  // common adjectives
  "good","great","best","better","bad","worst","worse","big","small","large","little","tall","short","long",
  "new","old","young","fast","slow","high","low","hot","cold","warm","cool","hard","soft",
  "easy","difficult","strong","weak","heavy","light","clean","dirty","full","empty",
  "happy","sad","angry","tired","busy","free","rich","poor","kind","mean","funny","serious",
  "beautiful","handsome","ugly","pretty","famous","important","interesting","boring","exciting","scared","brave",
  "right","wrong","true","false","real","sure","ready","late","early","quick","quiet","loud",
  // common nouns — people / family
  "person","people","man","men","woman","women","boy","girl","child","children","baby","family","mother","father",
  "parent","parents","brother","sister","son","daughter","grandfather","grandmother","uncle","aunt","cousin","friend","neighbor",
  // school
  "school","teacher","student","class","classroom","lesson","book","books","page","pages","pencil","pen","paper","notebook",
  "homework","exam","test","question","answer","grade","subject","english","math","science","history","geography",
  // home / everyday
  "home","house","room","kitchen","bedroom","bathroom","door","window","floor","wall","roof","table","chair","bed","sofa",
  "food","water","rice","bread","fruit","apple","banana","orange","mango","vegetable","meat","fish","chicken","egg",
  "milk","tea","coffee","sugar","salt","breakfast","lunch","dinner",
  "money","price","store","shop","market","bank","hospital","library","park","city","town","village","country",
  // technology
  "computer","laptop","phone","mobile","internet","website","email","screen","keyboard","mouse","camera","photo","picture",
  "video","music","song","movie","film","game","app","online","wifi","bluetooth","battery",
  // nature
  "sun","moon","star","sky","cloud","rain","wind","snow","ice","fire","earth","ground","rock","sand","sea","ocean",
  "river","lake","mountain","hill","forest","tree","flower","grass","leaf","leaves","plant","animal","dog","cat",
  "bird","horse","cow","pig","tiger","elephant","monkey","rabbit","mouse","spider",
  // time
  "time","day","night","morning","afternoon","evening","week","month","year","hour","minute","second",
  "today","tomorrow","yesterday","now","later","before","after","always","never","sometimes","often","usually",
  "monday","tuesday","wednesday","thursday","friday","saturday","sunday",
  "january","february","march","april","may","june","july","august","september","october","november","december",
  // places / travel
  "world","cambodia","asia","america","europe","africa","road","street","airport","station","bus","car","bike","train","plane","boat","ship",
  // colors
  "red","orange","yellow","green","blue","purple","pink","black","white","brown","gray","grey","color","colour",
  // numbers / quantity
  "zero","one","two","three","four","five","six","seven","eight","nine","ten","hundred","thousand","million","billion",
  "first","second","third","fourth","fifth","next","last","many","much","more","most","few","several","all","some","any",
  "none","both","each","every","another","other",
  // small connectors / prepositions
  "and","or","but","if","then","so","because","since","while","as","than","also","too","very","just","only",
  "in","on","at","by","for","with","without","from","to","into","onto","of","off","up","down",
  "over","under","above","below","between","through","across","around","near","far","here","there",
  "yes","no","not","please","thank","thanks","sorry","welcome","hello","hi","goodbye","bye","okay","ok",
  // common tricky / often-misspelled
  "necessary","accommodate","embarrass","occurrence","occasion","beginning","believe","achieve","receive",
  "separate","definitely","government","environment","weather","whether","tomorrow","yesterday","beautiful",
  "restaurant","february","wednesday","calendar","schedule","favorite","favourite","exercise","question",
  "language","country","library","education","university","experience","knowledge","success","successful",
  "different","difference","understand","understanding","interesting","important","everything","everyone",
  "anything","nothing","somebody","everybody","family","families","children","themselves","yourself",
  "address","argument","cemetery","conscience","conscious","equipment","grateful","independent","jewelry",
  "license","maintenance","millennium","minuscule","misspell","noticeable","occasionally","perseverance","possession",
  "publicly","questionnaire","recommend","relevant","rhythm","supersede","threshold","tomorrow","weird",
  // homophones used in the mini-game (must be in dict)
  "to","too","two","there","their","they're","your","you're","its","it's","then","than","here","hear","where","wear","were",
  "buy","by","bye","write","right","know","no","new","knew","week","weak","sea","see","son","sun","peace","piece",
  "flower","flour","mail","male","meet","meat","one","won","plane","plain","pair","pear",
  "yore","peas","heir","who's",
] as const;

// ───────────────────────── Live-dictionary plumbing ─────────────────────────
// Source of truth: https://api.dictionaryapi.dev/api/v2/entries/en/{word}
// 200 → valid word, 404 → not a word, anything else → treat as network error.
//
// Each successful lookup is cached in memory AND localStorage so:
//   • repeated checks of the same word are instant,
//   • the tool keeps working for previously-seen words when the device is offline.

const CACHE_STORAGE_KEY = "sf-dict-cache-v1";
const dictCache = new Map<string, boolean>();

// Hydrate once on module load (browser only)
if (typeof window !== "undefined") {
  try {
    const raw = window.localStorage.getItem(CACHE_STORAGE_KEY);
    if (raw) {
      const obj = JSON.parse(raw) as Record<string, boolean>;
      for (const [k, v] of Object.entries(obj)) dictCache.set(k, !!v);
    }
  } catch {
    /* localStorage may be disabled (private mode) — ignore */
  }
}

function persistCache() {
  if (typeof window === "undefined") return;
  try {
    // Cap cache to last 500 entries to keep storage bounded
    const entries = Array.from(dictCache.entries()).slice(-500);
    window.localStorage.setItem(
      CACHE_STORAGE_KEY,
      JSON.stringify(Object.fromEntries(entries)),
    );
  } catch {
    /* quota exceeded or unavailable — ignore */
  }
}

export type CheckOutcome =
  | { kind: "valid" }
  | { kind: "invalid" }
  | { kind: "invalid-format" }
  | { kind: "network-error" };

/** Sanitize, then check the word against the live dictionary (with caching). */
async function checkWord(rawInput: string, externalSignal?: AbortSignal): Promise<CheckOutcome> {
  // 1. Sanitize: trim, lowercase, normalize curly apostrophes.
  const cleaned = rawInput.trim().toLowerCase().replace(/[\u2018\u2019]/g, "'");

  if (!cleaned) return { kind: "invalid-format" };
  // Allow letters, internal apostrophes (it's, they're) and hyphens (well-known)
  if (!/^[a-z][a-z'-]*$/.test(cleaned)) return { kind: "invalid-format" };

  // 2. Cache hit → return immediately (no network call).
  if (dictCache.has(cleaned)) {
    return dictCache.get(cleaned) ? { kind: "valid" } : { kind: "invalid" };
  }

  // 3. API call with timeout + external abort support.
  const ctrl = new AbortController();
  const onExternalAbort = () => ctrl.abort();
  externalSignal?.addEventListener("abort", onExternalAbort);
  const timeoutId = window.setTimeout(() => ctrl.abort(), 6000);

  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleaned)}`,
      { signal: ctrl.signal },
    );

    if (res.status === 200) {
      dictCache.set(cleaned, true);
      persistCache();
      return { kind: "valid" };
    }
    if (res.status === 404) {
      dictCache.set(cleaned, false);
      persistCache();
      return { kind: "invalid" };
    }
    // 5xx, 429, etc. → don't cache, treat as transient network error.
    return { kind: "network-error" };
  } catch {
    // Network down, CORS, abort, timeout — all surface as network-error.
    return { kind: "network-error" };
  } finally {
    window.clearTimeout(timeoutId);
    externalSignal?.removeEventListener("abort", onExternalAbort);
  }
}

// ─── Levenshtein distance for suggestions ───────────────────────────────────
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const m = a.length, n = b.length;
  const prev = new Array(n + 1);
  const curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= n; j++) prev[j] = curr[j];
  }
  return prev[n];
}

function suggest(word: string, max = 4): string[] {
  const w = word.toLowerCase();
  if (!w) return [];
  const scored: Array<{ word: string; d: number }> = [];
  // Pre-filter by length difference for performance
  for (const candidate of COMMON_WORDS) {
    const c = candidate.toLowerCase();
    if (Math.abs(c.length - w.length) > 2) continue;
    const d = levenshtein(w, c);
    if (d <= 2) scored.push({ word: c, d });
  }
  scored.sort((a, b) => a.d - b.d || a.word.localeCompare(b.word));
  // Dedupe (DICT has e.g. "color" + "colour" — both fine)
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of scored) {
    if (seen.has(s.word)) continue;
    seen.add(s.word);
    out.push(s.word);
    if (out.length >= max) break;
  }
  return out;
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

export default function SpellingForgePage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-[#fdfaf0] text-stone-800 relative overflow-hidden">
      <ScopedStyles />
      <PaperBg />

      {/* Hero */}
      <header className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest">
          <PenLine className="w-3.5 h-3.5" />
          {isKh ? "ការសរសេរអង់គ្លេស · ឧបករណ៍អន្តរកម្ម" : "English Writing · Interactive Tool"}
        </div>
        <h1 className={`font-display font-bold text-3xl sm:text-5xl text-stone-900 mb-4 leading-tight ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh ? (
            <>កម្មវិធីពិនិត្យ<span className="sf-underline">អក្ខរាវិរុទ្ធ</span></>
          ) : (
            <>The <span className="sf-underline">Spelling</span> Forge</>
          )}
        </h1>
        <p className={`text-stone-600 max-w-2xl text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "វាយពាក្យអង់គ្លេសណាមួយ ហើយទទួលបានការឆ្លើយតបភ្លាមៗ — បៃតងសម្រាប់ត្រឹមត្រូវ ក្រហមសម្រាប់ខុស រួមជាមួយការផ្ដល់យោបល់ដែលជិតជាងគេ។ បន្ទាប់មក សាកល្បងហ្គេម 'ពាក្យពិបាក' ដើម្បីស្ទាត់ជំនាញពាក្យដែលស្ដាប់ដូចគ្នាប៉ុន្តែមានអក្ខរាវិរុទ្ធខុសគ្នា។"
            : "Type any English word and get instant feedback — green for correct, red for wrong, with the closest correct spellings suggested. Then play the Tricky Words game to master the words that sound alike but are spelled differently."}
        </p>
      </header>

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <SmartType isKh={isKh} />
        <TrickyWords isKh={isKh} />
      </main>

      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-stone-500 text-sm italic">
        <span className={isKh ? "font-khmer not-italic" : ""}>
          {isKh
            ? "“ការអាន​ធ្វើ​ឲ្យ​មនុស្ស​ពេញលេញ; ការ​សន្ទនា​ធ្វើ​ឲ្យ​មនុស្ស​ត្រៀម​ខ្លួន; ហើយ​ការ​សរសេរ​ធ្វើ​ឲ្យ​មនុស្ស​ច្បាស់លាស់។” — Francis Bacon"
            : "“Reading maketh a full man; conference a ready man; and writing an exact man.” — Francis Bacon"}
        </span>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Notepad background (cream + blue rules + red margin)
// ════════════════════════════════════════════════════════════════════════════

function PaperBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {/* Blue ruled lines every 28px */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 27px, #c5d8e8 27px, #c5d8e8 28px)",
        }}
      />
      {/* Left red margin */}
      <div className="hidden md:block absolute left-16 top-0 bottom-0 w-px bg-rose-300/60" />
      {/* Subtle paper texture / corner shading */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-50/60 to-transparent" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1. Smart Type
// ════════════════════════════════════════════════════════════════════════════

type Status =
  | "idle"
  | "checking"
  | "correct"
  | "incorrect"
  | "invalid-format"
  | "network-error";

function SmartType({ isKh }: { isKh: boolean }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [history, setHistory] = useState<Array<{ word: string; ok: boolean }>>([]);
  const [lastChecked, setLastChecked] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inFlightRef = useRef<AbortController | null>(null);

  // Cancel any in-flight check on unmount.
  useEffect(() => {
    return () => inFlightRef.current?.abort();
  }, []);

  const correctCount = history.filter((h) => h.ok).length;

  const check = useCallback(async () => {
    const raw = text.trim();
    if (!raw) return;

    // Cancel any previous in-flight request before starting a new one.
    inFlightRef.current?.abort();
    const ctrl = new AbortController();
    inFlightRef.current = ctrl;

    setStatus("checking");
    setSuggestions([]);
    setLastChecked(raw);

    const outcome = await checkWord(raw, ctrl.signal);

    // If a newer request superseded this one, drop the result.
    if (ctrl.signal.aborted) return;

    if (outcome.kind === "valid") {
      setStatus("correct");
      setHistory((h) => [{ word: raw, ok: true }, ...h].slice(0, 6));
      return;
    }
    if (outcome.kind === "invalid") {
      setStatus("incorrect");
      setSuggestions(suggest(raw.toLowerCase()));
      setHistory((h) => [{ word: raw, ok: false }, ...h].slice(0, 6));
      return;
    }
    if (outcome.kind === "invalid-format") {
      setStatus("invalid-format");
      // Don't pollute history with non-words.
      return;
    }
    // network-error → don't add to history; surface a distinct message.
    setStatus("network-error");
  }, [text]);

  const reset = () => {
    inFlightRef.current?.abort();
    setText("");
    setStatus("idle");
    setSuggestions([]);
    setLastChecked("");
    inputRef.current?.focus();
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      check();
    }
  };

  const useSuggestion = (s: string) => {
    setText(s);
    setStatus("idle");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // Border + ring colour by status
  const ringClass =
    status === "correct"
      ? "border-emerald-500 ring-emerald-200 sf-flash-green"
      : status === "incorrect" || status === "invalid-format"
      ? "border-rose-500 ring-rose-200 sf-flash-red"
      : status === "network-error"
      ? "border-amber-500 ring-amber-200"
      : status === "checking"
      ? "border-sky-400 ring-sky-100"
      : "border-stone-300 ring-transparent";

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h2 className={`font-display font-bold text-2xl sm:text-3xl text-stone-900 ${isKh ? "font-khmer leading-loose" : ""}`}>
          <span className="text-emerald-700">01</span> · {isKh ? "វាយ​ហើយ​ពិនិត្យ" : "Smart Type"}
        </h2>
        <div className={`flex items-center gap-1.5 text-xs text-stone-500 ${isKh ? "font-khmer" : ""}`}>
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          {isKh ? "ត្រឹមត្រូវ​នៅ​ក្នុង​ការ​ពិសោធ​ចុងក្រោយ៖" : "Correct in last attempts:"}{" "}
          <span className="font-bold text-emerald-700">{correctCount}/{history.length}</span>
        </div>
      </div>

      {/* Input card */}
      <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-sm p-5 sm:p-6">
        <label htmlFor="sf-word" className={`block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "វាយពាក្យអង់គ្លេសនៅទីនេះ..." : "Type an English word..."}
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            ref={inputRef}
            id="sf-word"
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={text}
            onChange={(e) => { setText(e.target.value); setStatus("idle"); setSuggestions([]); }}
            onKeyDown={onKey}
            placeholder={isKh ? "ឧ. necessary" : "e.g. necessary"}
            aria-describedby="sf-feedback"
            className={`flex-1 px-5 py-4 text-2xl sm:text-3xl font-display font-semibold text-stone-900 placeholder:text-stone-300 bg-stone-50 rounded-xl border-2 outline-none ring-4 transition-all ${ringClass}`}
          />
          <div className="flex gap-2">
            <button
              onClick={check}
              disabled={status === "checking" || !text.trim()}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold inline-flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
            >
              {status === "checking" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {isKh ? "ពិនិត្យ" : "Check"}
            </button>
            <button
              onClick={reset}
              aria-label={isKh ? "លុប" : "Clear"}
              className="px-3 py-3 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-600 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300"
            >
              <Eraser className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback */}
        <div id="sf-feedback" aria-live="polite" className="mt-5 min-h-[5rem]">
          {status === "correct" && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                ✓
              </div>
              <div>
                <div className={`text-2xl font-display font-bold text-emerald-700 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "អក្ខរាវិរុទ្ធ​ត្រឹមត្រូវ!" : "Perfect Spelling!"}
                </div>
                <div className={`text-sm text-emerald-700/80 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh
                    ? "ល្អណាស់ — បន្ត​ទៅ​មុខ​ដោយ​ពាក្យ​មួយ​ទៀត។"
                    : "Well done — try another word to keep your streak going."}
                </div>
              </div>
            </div>
          )}

          {status === "checking" && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-sky-50 border-2 border-sky-200">
              <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white flex-shrink-0">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <div className={`text-2xl font-display font-bold text-sky-700 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "កំពុង​ពិនិត្យ..." : "Checking dictionary…"}
                </div>
                <div className={`text-sm text-sky-700/80 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh
                    ? "កំពុង​ស្វែង​រក​ពាក្យ “" + lastChecked + "” នៅ​ក្នុង​វចនានុក្រម​អង់គ្លេស។"
                    : `Looking up “${lastChecked}” in the English dictionary…`}
                </div>
              </div>
            </div>
          )}

          {status === "incorrect" && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border-2 border-rose-300">
              <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                ✕
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-2xl font-display font-bold text-rose-700 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "មិន​ត្រឹមត្រូវ​ទេ" : "Not quite right"}
                </div>
                <div className={`text-sm text-rose-700/85 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {suggestions.length > 0
                    ? (isKh ? "តើអ្នក​មាន​បំណង​សរសេរ​ថា...?" : "Did you mean...?")
                    : (isKh
                        ? `ពាក្យ “${lastChecked}” មិន​មាន​ក្នុង​វចនានុក្រម​អង់គ្លេស​ទេ។`
                        : `“${lastChecked}” isn't in the English dictionary. Check the letters and try again.`)}
                </div>
                {suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => useSuggestion(s)}
                        className="px-3 py-1.5 rounded-full bg-white border-2 border-rose-300 text-rose-800 hover:bg-rose-100 font-bold text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {status === "invalid-format" && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border-2 border-rose-300">
              <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                ✕
              </div>
              <div>
                <div className={`text-2xl font-display font-bold text-rose-700 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "ទម្រង់​មិន​ត្រឹមត្រូវ" : "Letters only, please"}
                </div>
                <div className={`text-sm text-rose-700/85 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh
                    ? "សូម​វាយ​ពាក្យ​មួយ​ប្រើ​អក្សរ​អង់គ្លេស​តែ​ប៉ុណ្ណោះ (a–z) — គ្មាន​លេខ ឬ​សញ្ញា​ផ្សេងៗ។"
                    : "Please type a single English word using letters only (a–z) — no numbers or special characters."}
                </div>
              </div>
            </div>
          )}

          {status === "network-error" && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border-2 border-amber-300">
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white flex-shrink-0">
                <WifiOff className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-2xl font-display font-bold text-amber-800 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "បញ្ហា​បណ្ដាញ" : "Network error"}
                </div>
                <div className={`text-sm text-amber-800/85 mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh
                    ? "មិន​អាច​ភ្ជាប់​ទៅ​វចនានុក្រម​បាន​ទេ — សូម​ពិនិត្យ​ការ​ភ្ជាប់​អ៊ីនធឺណិត​របស់​អ្នក រួច​សាកល្បង​ម្ដងទៀត។ ពាក្យ​នេះ​មិន​ត្រូវ​បាន​សម្គាល់​ថា​ខុស​ទេ។"
                    : "Couldn't reach the dictionary service — please check your internet connection and try again. We did not mark this word as wrong."}
                </div>
                <button
                  onClick={check}
                  className="px-3 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {isKh ? "សាកល្បង​ម្ដងទៀត" : "Try again"}
                </button>
              </div>
            </div>
          )}

          {status === "idle" && (
            <div className={`flex items-start gap-2 text-sm text-stone-500 italic ${isKh ? "font-khmer not-italic leading-loose" : ""}`}>
              <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
              {isKh
                ? "គន្លឹះ៖ វាយពាក្យ​មួយ​រួច​ហើយ​ចុច Enter ឬ​ប៊ូតុង \"ពិនិត្យ\" ដើម្បី​ទទួល​បាន​ការ​ឆ្លើយ​តប​ភ្លាមៗ។"
                : "Tip: type a word and press Enter (or the Check button) to get an instant green/red answer."}
            </div>
          )}
        </div>

        {/* Recent attempts */}
        {history.length > 0 && (
          <div className="mt-5 pt-4 border-t border-stone-200">
            <div className={`text-[11px] font-bold uppercase tracking-widest text-stone-500 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ការ​ពិសោធ​ថ្មីៗ" : "Recent attempts"}
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((h, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-mono ${
                    h.ok
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-rose-100 text-rose-800 border border-rose-200 line-through decoration-rose-400"
                  }`}
                >
                  {h.ok ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {h.word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. Tricky Words — homophone fill-in-the-blank
// ════════════════════════════════════════════════════════════════════════════

const PUZZLES: Array<{
  sentenceEn: string;
  sentenceKh: string;
  options: string[];
  answer: string;
  explainEn: string;
  explainKh: string;
}> = [
  {
    sentenceEn: "I want to go ___ the store.",
    sentenceKh: "ខ្ញុំ​ចង់​ទៅ ___ ហាង។",
    options: ["to", "too", "two"],
    answer: "to",
    explainEn: "“to” shows direction or purpose. “too” means also/very, and “two” is the number 2.",
    explainKh: "“to” បង្ហាញ​ទិសដៅ ឬ​គោលបំណង។ “too” មាន​ន័យ​ថា ផងដែរ/ខ្លាំង ហើយ “two” ជា​លេខ ២។",
  },
  {
    sentenceEn: "Please put ___ books on the desk.",
    sentenceKh: "សូម​ដាក់​សៀវភៅ​របស់​ពួកគេ ___ លើ​តុ។",
    options: ["their", "there", "they're"],
    answer: "their",
    explainEn: "“their” = belonging to them. “there” = a place. “they're” = they are.",
    explainKh: "“their” = ជា​របស់​ពួកគេ។ “there” = ទីកន្លែង។ “they're” = they are។",
  },
  {
    sentenceEn: "___ the new student in our class.",
    sentenceKh: "___ ជា​សិស្ស​ថ្មី​នៅ​ក្នុង​ថ្នាក់​យើង។",
    options: ["You're", "Your", "Yore"],
    answer: "You're",
    explainEn: "“You're” = you are. “your” = belonging to you. “yore” means long ago (rare).",
    explainKh: "“You're” = you are។ “your” = ជា​របស់​អ្នក។ “yore” មាន​ន័យ​ថា​យូរ​មក​ហើយ (កម្រ​ប្រើ)។",
  },
  {
    sentenceEn: "Please cut me a ___ of cake.",
    sentenceKh: "សូម​កាត់​នំ​មួយ ___ ឲ្យ​ខ្ញុំ។",
    options: ["piece", "peace", "peas"],
    answer: "piece",
    explainEn: "A “piece” is a portion of something. “peace” is calm or no war. “peas” are the small green vegetable.",
    explainKh: "“piece” គឺ​ជា​ចំណែក​មួយ។ “peace” គឺ​ជា​សន្តិភាព។ “peas” គឺ​ជា​សណ្ដែក​បៃតង​តូចៗ។",
  },
  {
    sentenceEn: "I can ___ the bird singing outside.",
    sentenceKh: "ខ្ញុំ​អាច ___ សម្លេង​បក្សី​ច្រៀង​នៅ​ខាង​ក្រៅ។",
    options: ["hear", "here", "heir"],
    answer: "hear",
    explainEn: "“hear” = to listen with your ears. “here” = this place. “heir” = a person who inherits.",
    explainKh: "“hear” = ស្ដាប់​ដោយ​ត្រចៀក។ “here” = ទីកន្លែង​នេះ។ “heir” = អ្នក​ស្នង​មរតក។",
  },
  {
    sentenceEn: "She bought a new pair of shoes ___ wear to the party.",
    sentenceKh: "នាង​បាន​ទិញ​ស្បែកជើង​មួយ​គូ​ថ្មី ___ ពាក់​ទៅ​ពិធីជប់លៀង។",
    options: ["to", "too", "two"],
    answer: "to",
    explainEn: "Here we need the infinitive “to wear” (purpose). Not “too” (also) or “two” (2).",
    explainKh: "នៅ​ទីនេះ​យើង​ត្រូវការ infinitive “to wear” (គោលបំណង)។ មិនមែន “too” (ផងដែរ) ឬ “two” (២)។",
  },
  {
    sentenceEn: "Can you tell me ___ shoes are these?",
    sentenceKh: "តើ​អ្នក​អាច​ប្រាប់​ខ្ញុំ​បាន​ទេ​ថា​ស្បែកជើង​ទាំង​នេះ​ជា​របស់ ___?",
    options: ["whose", "who's", "whos"],
    answer: "whose",
    explainEn: "“whose” asks about ownership. “who's” = who is.",
    explainKh: "“whose” សួរ​អំពី​ភាព​ជា​ម្ចាស់។ “who's” = who is។",
  },
  {
    sentenceEn: "The dog wagged ___ tail.",
    sentenceKh: "ឆ្កែ​បាន​គ្រវី​កន្ទុយ​របស់ ___។",
    options: ["its", "it's", "its'"],
    answer: "its",
    explainEn: "“its” = belonging to it (no apostrophe!). “it's” = it is. “its'” isn't a word.",
    explainKh: "“its” = ជា​របស់​វា (គ្មាន apostrophe!)។ “it's” = it is។ “its'” មិនមែន​ជា​ពាក្យ​ទេ។",
  },
  // ── 17 new homophone puzzles appended below to bring the total to 25 ──────
  {
    sentenceEn: "The dog wagged ___ tail.",
    sentenceKh: "ឆ្កែ​បាន​គ្រវី​កន្ទុយ​របស់ ___។",
    options: ["its", "it's"],
    answer: "its",
    explainEn: "“its” shows possession (the tail belongs to the dog). “it's” always means “it is”.",
    explainKh: "“its” បង្ហាញ​ភាព​ជា​ម្ចាស់ (កន្ទុយ​ជា​របស់​ឆ្កែ)។ “it's” ជានិច្ច​មាន​ន័យ​ថា “it is”។",
  },
  {
    sentenceEn: "Put the books over ___ on the table.",
    sentenceKh: "ដាក់​សៀវភៅ ___ លើ​តុ។",
    options: ["their", "there", "they're"],
    answer: "there",
    explainEn: "“there” points to a place. “their” shows possession, “they're” = they are.",
    explainKh: "“there” ចង្អុល​ទៅ​កន្លែង។ “their” បង្ហាញ​ភាព​ជា​ម្ចាស់, “they're” = they are។",
  },
  {
    sentenceEn: "___ going to the market later.",
    sentenceKh: "___ កំពុង​នឹង​ទៅ​ផ្សារ​នៅ​ពេល​ក្រោយ។",
    options: ["their", "there", "they're"],
    answer: "they're",
    explainEn: "“they're” = they are. The sentence needs a subject + verb (“they are going”).",
    explainKh: "“they're” = they are។ ប្រយោគ​ត្រូវការ​ប្រធាន + កិរិយា (“they are going”)។",
  },
  {
    sentenceEn: "Can you ___ the birds singing?",
    sentenceKh: "តើ​អ្នក​អាច ___ បក្សី​ច្រៀង​ទេ?",
    options: ["hear", "here"],
    answer: "hear",
    explainEn: "“hear” means to listen with your ears. “here” is a place — this spot.",
    explainKh: "“hear” មាន​ន័យ​ថា ស្ដាប់​ដោយ​ត្រចៀក។ “here” ជា​ទី​កន្លែង — ត្រង់​នេះ។",
  },
  {
    sentenceEn: "Please ___ your name on the paper.",
    sentenceKh: "សូម ___ ឈ្មោះ​របស់​អ្នក​លើ​ក្រដាស។",
    options: ["right", "write"],
    answer: "write",
    explainEn: "“write” means to put words on paper. “right” means correct or the opposite of left.",
    explainKh: "“write” មាន​ន័យ​ថា សរសេរ​ពាក្យ​លើ​ក្រដាស។ “right” មាន​ន័យ​ថា ត្រឹមត្រូវ ឬ​ផ្ទុយ​ពី​ឆ្វេង។",
  },
  {
    sentenceEn: "The boat will set ___ tomorrow.",
    sentenceKh: "ទូក​នឹង​ចេញ ___ ថ្ងៃ​ស្អែក។",
    options: ["sail", "sale"],
    answer: "sail",
    explainEn: "“sail” is the cloth that catches the wind on a boat (and the action of sailing). “sale” means a discount.",
    explainKh: "“sail” គឺ​ជា​ក្ដារ​បាញ់​ខ្យល់​នៅ​លើ​ទូក (ហើយ​ជា​សកម្មភាព​ជិះ​ទូក)។ “sale” មាន​ន័យ​ថា លក់​បញ្ចុះ​តម្លៃ។",
  },
  {
    sentenceEn: "I would like a ___ of cake.",
    sentenceKh: "ខ្ញុំ​ចង់​បាន​នំ​មួយ ___។",
    options: ["piece", "peace"],
    answer: "piece",
    explainEn: "A “piece” is a portion — like a slice of cake. “peace” means calm or no war.",
    explainKh: "“piece” គឺ​ជា​ចំណែក — ដូច​ជា​ចំណិត​នំ។ “peace” មាន​ន័យ​ថា សន្តិភាព។",
  },
  {
    sentenceEn: "She has been sick and feels very ___.",
    sentenceKh: "នាង​បាន​ឈឺ​ហើយ​មាន​អារម្មណ៍​ ___ ខ្លាំង​ណាស់។",
    options: ["week", "weak"],
    answer: "weak",
    explainEn: "“weak” = not strong. “week” = 7 days.",
    explainKh: "“weak” = មិន​រឹង​មាំ។ “week” = ៧ ថ្ងៃ។",
  },
  {
    sentenceEn: "We need to ___ at the library at noon.",
    sentenceKh: "យើង​ត្រូវ ___ នៅ​បណ្ណាល័យ​នៅ​ថ្ងៃ​ត្រង់។",
    options: ["meet", "meat"],
    answer: "meet",
    explainEn: "“meet” means to come together. “meat” is food from animals.",
    explainKh: "“meet” មាន​ន័យ​ថា ជួប​គ្នា។ “meat” ជា​សាច់ — អាហារ​ពី​សត្វ។",
  },
  {
    sentenceEn: "He dug a deep ___ in the dirt.",
    sentenceKh: "គាត់​បាន​ជីក ___ ដ៏​ជ្រៅ​មួយ​នៅ​ក្នុង​ដី។",
    options: ["whole", "hole"],
    answer: "hole",
    explainEn: "A “hole” is an empty space dug into the ground. “whole” means complete or all of something.",
    explainKh: "“hole” គឺ​ជា​រន្ធ​នៅ​ក្នុង​ដី។ “whole” មាន​ន័យ​ថា ទាំង​មូល ឬ​ពេញ។",
  },
  {
    sentenceEn: "Did you ___ the new movie yet?",
    sentenceKh: "តើ​អ្នក​បាន ___ ភាពយន្ត​ថ្មី​ហើយ​ឬ​នៅ?",
    options: ["sea", "see"],
    answer: "see",
    explainEn: "“see” = to look at with your eyes. “sea” is a large body of salt water.",
    explainKh: "“see” = មើល​ឃើញ​ដោយ​ភ្នែក។ “sea” គឺ​ជា​សមុទ្រ — ទឹក​ប្រៃ​ដ៏​ធំ​មួយ។",
  },
  {
    sentenceEn: "I need to ___ some rice at the store.",
    sentenceKh: "ខ្ញុំ​ត្រូវ ___ អង្ករ​នៅ​ហាង។",
    options: ["by", "buy", "bye"],
    answer: "buy",
    explainEn: "“buy” = to purchase with money. “by” = next to or how. “bye” = goodbye.",
    explainKh: "“buy” = ទិញ​ជាមួយ​លុយ។ “by” = នៅ​ក្បែរ ឬ​មធ្យោបាយ។ “bye” = លាហើយ។",
  },
  {
    sentenceEn: "The ___ shines brightly today.",
    sentenceKh: "___ ភ្លឺ​ខ្លាំង​នៅ​ថ្ងៃ​នេះ។",
    options: ["sun", "son"],
    answer: "sun",
    explainEn: "The “sun” is the bright star in the sky. A “son” is a male child.",
    explainKh: "“sun” គឺ​ជា​ព្រះ​អាទិត្យ — ផ្កាយ​ភ្លឺ​នៅ​លើ​មេឃ។ “son” គឺ​ជា​កូន​ប្រុស។",
  },
  {
    sentenceEn: "I have ___ brothers and one sister.",
    sentenceKh: "ខ្ញុំ​មាន​បង​ប្អូន​ប្រុស ___ នាក់ និង​ប្អូន​ស្រី​ម្នាក់។",
    options: ["to", "too", "two"],
    answer: "two",
    explainEn: "“two” is the number 2. “to” shows direction, “too” means also/very.",
    explainKh: "“two” ជា​លេខ ២។ “to” បង្ហាញ​ទិសដៅ, “too” មាន​ន័យ​ថា ផងដែរ/ខ្លាំង។",
  },
  {
    sentenceEn: "Is that ___ bicycle?",
    sentenceKh: "តើ​នោះ​ជា​កង់​របស់ ___ ទេ?",
    options: ["your", "you're"],
    answer: "your",
    explainEn: "“your” shows possession (the bike belongs to you). “you're” = you are.",
    explainKh: "“your” បង្ហាញ​ភាព​ជា​ម្ចាស់ (កង់​ជា​របស់​អ្នក)។ “you're” = you are។",
  },
  {
    sentenceEn: "I think ___ going to be a great student.",
    sentenceKh: "ខ្ញុំ​គិត​ថា ___ នឹង​ក្លាយ​ជា​សិស្ស​ដ៏​អស្ចារ្យ​ម្នាក់។",
    options: ["your", "you're"],
    answer: "you're",
    explainEn: "“you're” = you are. The sentence needs a subject + verb (“you are going”).",
    explainKh: "“you're” = you are។ ប្រយោគ​ត្រូវការ​ប្រធាន + កិរិយា (“you are going”)។",
  },
  {
    sentenceEn: "The sky is very ___ today.",
    sentenceKh: "មេឃ ___ ខ្លាំង​នៅ​ថ្ងៃ​នេះ។",
    options: ["blue", "blew"],
    answer: "blue",
    explainEn: "“blue” is a color. “blew” is the past tense of “blow” (the wind blew).",
    explainKh: "“blue” គឺ​ជា​ពណ៌​ខៀវ។ “blew” គឺ​ជា​អតីតកាល​នៃ “blow” (ខ្យល់​បាន​បក់)។",
  },
];

function TrickyWords({ isKh }: { isKh: boolean }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ ok: 0, total: 0 });

  const cur = PUZZLES[idx];
  const isAnswered = picked !== null;
  const isRight = picked === cur.answer;

  // Shuffle the option buttons so the correct answer isn't always in the same
  // position. Stable per question (recomputes only when `idx` changes).
  const shuffledOptions = useMemo(() => {
    const arr = [...cur.options];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const pick = (opt: string) => {
    if (isAnswered) return; // lock once chosen
    setPicked(opt);
    setScore((s) => ({ ok: s.ok + (opt === cur.answer ? 1 : 0), total: s.total + 1 }));
  };

  const next = () => {
    setPicked(null);
    setIdx((i) => (i + 1) % PUZZLES.length);
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setScore({ ok: 0, total: 0 });
  };

  // Replace the blank with either ___ or the picked answer
  const renderSentence = (sentence: string) => {
    const parts = sentence.split("___");
    return (
      <>
        {parts[0]}
        <span
          className={`inline-block min-w-[5rem] px-2 mx-1 border-b-2 align-baseline font-display font-bold ${
            isAnswered
              ? isRight
                ? "border-emerald-500 text-emerald-700"
                : "border-rose-500 text-rose-700 line-through decoration-rose-400"
              : "border-stone-400 text-stone-400"
          }`}
        >
          {isAnswered ? picked : "\u00A0\u00A0\u00A0"}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h2 className={`font-display font-bold text-2xl sm:text-3xl text-stone-900 ${isKh ? "font-khmer leading-loose" : ""}`}>
          <span className="text-emerald-700">02</span> · {isKh ? "ហ្គេម​ពាក្យ​ពិបាក (Homophones)" : "Tricky Words mini-game (Homophones)"}
        </h2>
        <div className={`flex items-center gap-1.5 text-xs text-stone-500 ${isKh ? "font-khmer" : ""}`}>
          <BookOpenCheck className="w-3.5 h-3.5 text-emerald-600" />
          {isKh ? "ពិន្ទុ៖" : "Score:"}{" "}
          <span className="font-bold text-emerald-700">{score.ok}/{score.total}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-stone-200 shadow-sm p-5 sm:p-6">
        <div className={`text-xs font-bold uppercase tracking-widest text-stone-500 mb-3 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? `សំណួរ​ទី ${idx + 1} នៃ ${PUZZLES.length}` : `Question ${idx + 1} of ${PUZZLES.length}`}
        </div>

        {/* Sentence */}
        <p
          className="text-2xl sm:text-3xl font-display text-stone-900 leading-relaxed mb-5"
          aria-live="polite"
        >
          {renderSentence(cur.sentenceEn)}
        </p>
        {isKh && (
          <p className="text-base text-stone-500 font-khmer leading-loose mb-5 -mt-3">
            {renderSentence(cur.sentenceKh)}
          </p>
        )}

        {/* Options */}
        <div className="flex flex-wrap gap-3 mb-5">
          {shuffledOptions.map((opt) => {
            const isCorrectOpt = opt === cur.answer;
            const isPickedOpt = opt === picked;
            const styles = !isAnswered
              ? "bg-stone-50 border-stone-300 text-stone-800 hover:bg-emerald-50 hover:border-emerald-400 hover:-translate-y-0.5"
              : isCorrectOpt
                ? "bg-emerald-100 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200"
                : isPickedOpt
                  ? "bg-rose-100 border-rose-500 text-rose-800"
                  : "bg-stone-50 border-stone-200 text-stone-400";
            return (
              <button
                key={opt}
                onClick={() => pick(opt)}
                disabled={isAnswered}
                aria-pressed={isPickedOpt}
                className={`px-6 py-3 rounded-xl border-2 font-display font-bold text-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 ${styles} ${isAnswered ? "cursor-default" : ""}`}
              >
                {opt}
                {isAnswered && isCorrectOpt && <Check className="inline w-5 h-5 ml-2" />}
                {isAnswered && isPickedOpt && !isCorrectOpt && <X className="inline w-5 h-5 ml-2" />}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div
            className={`p-4 rounded-xl border-2 mb-4 ${
              isRight ? "bg-emerald-50 border-emerald-300" : "bg-amber-50 border-amber-300"
            }`}
          >
            <div className={`flex items-center gap-2 text-lg font-display font-bold mb-1 ${isRight ? "text-emerald-700" : "text-amber-700"} ${isKh ? "font-khmer" : ""}`}>
              {isRight
                ? (<>{<Check className="w-5 h-5" />}{isKh ? "ត្រឹមត្រូវ!" : "Correct!"}</>)
                : (<>{<Lightbulb className="w-5 h-5" />}{isKh ? "ជិត​ហើយ — ចម្លើយ​ត្រឹមត្រូវ​គឺ" : "Not quite — the answer is"} <span className="underline">{cur.answer}</span></>)
              }
            </div>
            <p className={`text-sm ${isRight ? "text-emerald-700/85" : "text-amber-800/90"} ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? cur.explainKh : cur.explainEn}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={next}
            disabled={!isAnswered}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
          >
            {isKh ? "សំណួរ​បន្ទាប់" : "Next question"}
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={restart}
            className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300"
          >
            <RotateCcw className="w-4 h-4" />
            {isKh ? "ចាប់ផ្ដើម​ឡើង​វិញ" : "Restart"}
          </button>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Scoped styles
// ════════════════════════════════════════════════════════════════════════════

function ScopedStyles() {
  return (
    <style>{`
      .sf-underline {
        background-image: linear-gradient(to top, #34d399 0, #34d399 8px, transparent 8px);
        background-repeat: no-repeat;
        padding: 0 4px;
      }

      @keyframes sf-flash-green-kf {
        0%   { background-color: #d1fae5; }
        100% { background-color: #fafaf9; }
      }
      .sf-flash-green { animation: sf-flash-green-kf 0.6s ease-out; }

      @keyframes sf-flash-red-kf {
        0%   { background-color: #fee2e2; transform: translateX(0); }
        15%  { transform: translateX(-4px); }
        30%  { transform: translateX(4px); }
        45%  { transform: translateX(-3px); }
        60%  { transform: translateX(3px); }
        100% { background-color: #fafaf9; transform: translateX(0); }
      }
      .sf-flash-red { animation: sf-flash-red-kf 0.55s ease-out; }

      @media (prefers-reduced-motion: reduce) {
        .sf-flash-green, .sf-flash-red { animation: none !important; }
      }
    `}</style>
  );
}
