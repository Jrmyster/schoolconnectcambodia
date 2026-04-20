import { Volume2, Sunrise, Sun, Moon, AlertTriangle, MessageCircle, Hand, Smile, Coffee } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakWord } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * Introductions & Greetings — ESL learner module
 * Khmer translations are PLACEHOLDERS marked with KH_TODO so a translator
 * can locate every spot easily later.
 * ────────────────────────────────────────────────────────────────────── */

const KH_TODO = (placeholder: string) => placeholder;

type Greeting = {
  phrase: string;
  phraseKh: string;
  contextEn: string;
  contextKh: string;
  toneEn: "Casual / Friends" | "Standard" | "Friendly" | "American / Country";
  toneKh: string;
  icon: React.ComponentType<{ className?: string }>;
  palette: string;
  iconColor: string;
};

const EVERYDAY: Greeting[] = [
  {
    phrase: "Hi",
    phraseKh: KH_TODO("ជំរាបសួរ (មិនផ្លូវការ)"),
    contextEn: "The most common short greeting. Works almost anywhere.",
    contextKh: KH_TODO("ការស្វាគមន៍ខ្លីបំផុតដែលគេប្រើ។ ប្រើបានស្ទើរតែគ្រប់ទីកន្លែង។"),
    toneEn: "Friendly",
    toneKh: KH_TODO("មិត្តភាព"),
    icon: Hand,
    palette: "from-rose-50 to-pink-100 border-rose-300",
    iconColor: "text-rose-600 bg-rose-100",
  },
  {
    phrase: "How are you?",
    phraseKh: KH_TODO("អ្នកសុខសប្បាយជាទេ?"),
    contextEn: "A polite question after 'Hi' or 'Hello'. People usually answer 'I'm fine, thanks!'",
    contextKh: KH_TODO("សំណួរសុជីវធម៌បន្ទាប់ពី «Hi» ឬ «Hello»។ មនុស្សតែងតែឆ្លើយថា «I'm fine, thanks!»"),
    toneEn: "Standard",
    toneKh: KH_TODO("ផ្លូវការ"),
    icon: Smile,
    palette: "from-sky-50 to-blue-100 border-sky-300",
    iconColor: "text-sky-600 bg-sky-100",
  },
  {
    phrase: "What's up?",
    phraseKh: KH_TODO("មានរឿងអ្វីដែរ?"),
    contextEn: "Very casual — use only with friends, classmates, or family.",
    contextKh: KH_TODO("មិនផ្លូវការខ្លាំង — ប្រើតែជាមួយមិត្តភក្តិ ឬគ្រួសារ។"),
    toneEn: "Casual / Friends",
    toneKh: KH_TODO("មិនផ្លូវការ / មិត្តភក្តិ"),
    icon: MessageCircle,
    palette: "from-violet-50 to-fuchsia-100 border-violet-300",
    iconColor: "text-violet-600 bg-violet-100",
  },
  {
    phrase: "Howdy",
    phraseKh: KH_TODO("សួស្ដី (រចនាបទអាមេរិក)"),
    contextEn: "An old, friendly American word — common in country areas like Texas.",
    contextKh: KH_TODO("ពាក្យអាមេរិកចាស់ៗ ដែលមានភាពមិត្តភាព — ជាញឹកញាប់នៅតំបន់ជនបទដូចជា Texas។"),
    toneEn: "American / Country",
    toneKh: KH_TODO("អាមេរិក / ជនបទ"),
    icon: Coffee,
    palette: "from-amber-50 to-orange-100 border-amber-300",
    iconColor: "text-amber-700 bg-amber-100",
  },
];

/* ──────────────────────────────────────────────────────────────────── */

export function GreetingsModule() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  function playAudio(phrase: string) {
    speakWord(phrase);
  }

  return (
    <section
      aria-labelledby="greetings-heading"
      className="rounded-3xl border-4 border-amber-200 bg-gradient-to-br from-yellow-50 via-white to-rose-50 shadow-md p-5 sm:p-7"
    >
      {/* Header */}
      <header className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-2">
          <Hand className="w-3.5 h-3.5" />
          <span className={kh ? "font-khmer normal-case tracking-normal text-xs" : ""}>
            {kh ? KH_TODO("ការណែនាំ និងស្វាគមន៍") : "Introductions & Greetings"}
          </span>
        </div>
        <h2
          id="greetings-heading"
          className={`font-display text-2xl sm:text-3xl md:text-4xl font-extrabold ${kh ? "font-khmer leading-snug" : ""}`}
        >
          <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
            {kh ? KH_TODO("របៀបនិយាយ «សួស្ដី» ជាភាសាអង់គ្លេស") : "How to say 'Hello' in English"}
          </span>
        </h2>
        <p
          className={`mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto ${kh ? "font-khmer text-base sm:text-lg leading-loose" : ""}`}
        >
          {kh
            ? KH_TODO("រៀននិយាយជាមួយមិត្ត ឬគ្រូ — រាល់ស្ថានភាព មានពាក្យត្រឹមត្រូវរបស់វា!")
            : "Learn how to say hello to friends, teachers, or anyone — every situation has the right word!"}
        </p>
      </header>

      {/* ── SECTION 1: Everyday Greetings ─────────────────────── */}
      <SubsectionHeader
        kh={kh}
        en="1. Everyday Greetings"
        khText={KH_TODO("១. ការស្វាគមន៍ប្រចាំថ្ងៃ")}
        accent="rose"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {EVERYDAY.map((g) => (
          <article
            key={g.phrase}
            className={`group rounded-2xl border-4 bg-gradient-to-br ${g.palette} p-4 sm:p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col`}
          >
            {/* Top row: icon + tone tag */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${g.iconColor} flex-shrink-0`}
              >
                <g.icon className="w-5 h-5" />
              </div>
              <span
                className={`px-2 py-0.5 rounded-full bg-white/90 border border-current text-[10px] font-bold uppercase tracking-wide ${g.iconColor.replace(/bg-\S+/, "")} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                {kh ? g.toneKh : g.toneEn}
              </span>
            </div>

            {/* The phrase — large and bold */}
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
              "{g.phrase}"
            </div>

            {/* Khmer translation placeholder */}
            <div
              className={`mt-1 font-khmer text-base text-slate-600 italic ${kh ? "" : "opacity-70"}`}
              aria-label="Khmer translation placeholder"
            >
              {g.phraseKh}
            </div>

            {/* Context */}
            <p
              className={`mt-2 text-sm text-slate-700 leading-snug flex-1 ${kh ? "font-khmer text-base leading-loose" : ""}`}
            >
              {kh ? g.contextKh : g.contextEn}
            </p>

            {/* Play Audio placeholder button */}
            <button
              type="button"
              onClick={() => playAudio(g.phrase)}
              className="mt-3 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-white border-2 border-slate-300 hover:border-current hover:shadow font-bold text-xs sm:text-sm text-slate-700 active:scale-95 transition-all"
              aria-label={`Play audio for ${g.phrase} (coming soon)`}
            >
              <Volume2 className="w-4 h-4" />
              {kh ? KH_TODO("ស្ដាប់ការបន្លឺសំឡេង") : "Play Audio"}
            </button>
          </article>
        ))}
      </div>

      {/* ── SECTION 2: Time-of-Day Greetings ──────────────────── */}
      <SubsectionHeader
        kh={kh}
        en="2. Time-of-Day Greetings"
        khText={KH_TODO("២. ការស្វាគមន៍តាមពេលវេលា")}
        accent="sky"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TimeCard
          kh={kh}
          phrase="Good Morning"
          phraseKh={KH_TODO("អរុណសួស្ដី")}
          when="From sunrise until about 12:00 noon."
          whenKh={KH_TODO("ចាប់ពីព្រះអាទិត្យរះ រហូតដល់ប្រហែលម៉ោង ១២:០០ រសៀល។")}
          icon={Sunrise}
          gradient="from-amber-100 via-orange-100 to-rose-100"
          accent="text-orange-700"
          ring="ring-orange-300"
          pillBg="bg-orange-200 text-orange-900"
        />
        <TimeCard
          kh={kh}
          phrase="Good Afternoon"
          phraseKh={KH_TODO("ទិវាសួស្ដី")}
          when="From around 12:00 noon until about 6:00 PM."
          whenKh={KH_TODO("ចាប់ពីប្រហែលម៉ោង ១២:០០ រសៀល រហូតដល់ប្រហែលម៉ោង ៦:០០ ល្ងាច។")}
          icon={Sun}
          gradient="from-sky-100 via-cyan-100 to-yellow-100"
          accent="text-amber-600"
          ring="ring-yellow-300"
          pillBg="bg-yellow-200 text-yellow-900"
        />
        <TimeCard
          kh={kh}
          phrase="Good Night"
          phraseKh={KH_TODO("រាត្រីសួស្ដី")}
          when="Used at the end of the day or before sleep."
          whenKh={KH_TODO("ប្រើនៅពេលចុងថ្ងៃ ឬមុនពេលគេង។")}
          icon={Moon}
          gradient="from-indigo-200 via-violet-200 to-blue-300"
          accent="text-indigo-100"
          ring="ring-indigo-400"
          pillBg="bg-indigo-100/90 text-indigo-900"
          dark
          warning={{
            titleEn: "IMPORTANT — Don't say it as a hello!",
            titleKh: KH_TODO("សំខាន់ — កុំប្រើជាការស្វាគមន៍!"),
            bodyEn: "Used when leaving or going to sleep, NOT when saying hello. To greet someone at night, say 'Good Evening' instead.",
            bodyKh: KH_TODO("ប្រើនៅពេលលា ឬពេលត្រៀមគេង — មិនមែននៅពេលជួបគ្នាទេ។ ដើម្បីស្វាគមន៍មនុស្សនៅពេលយប់ ប្រើ «Good Evening» ជំនួសវិញ។"),
          }}
        />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function TimeCard({
  kh, phrase, phraseKh, when, whenKh, icon: Icon, gradient, accent, ring, pillBg, dark, warning,
}: {
  kh: boolean;
  phrase: string;
  phraseKh: string;
  when: string;
  whenKh: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  accent: string;
  ring: string;
  pillBg: string;
  dark?: boolean;
  warning?: { titleEn: string; titleKh: string; bodyEn: string; bodyKh: string };
}) {
  const textBase = dark ? "text-white" : "text-slate-900";
  const textMuted = dark ? "text-indigo-100/90" : "text-slate-700";
  return (
    <article
      className={`relative rounded-2xl border-4 border-white bg-gradient-to-br ${gradient} p-5 sm:p-6 shadow-md ring-2 ${ring} hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col`}
    >
      {/* Big icon hero */}
      <div className="flex items-center justify-center mb-3">
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/70 ${dark ? "bg-indigo-900/40" : ""} flex items-center justify-center shadow-inner`}
        >
          <Icon className={`w-12 h-12 sm:w-14 sm:h-14 ${accent}`} aria-hidden />
        </div>
      </div>

      {/* The phrase */}
      <div className={`text-center font-display font-extrabold text-2xl sm:text-3xl leading-tight ${textBase}`}>
        "{phrase}"
      </div>
      <div
        className={`text-center font-khmer text-base sm:text-lg italic mt-1 ${dark ? "text-indigo-100" : "text-slate-600"} ${kh ? "" : "opacity-80"}`}
        aria-label="Khmer translation placeholder"
      >
        {phraseKh}
      </div>

      {/* When-to-use pill */}
      <div className={`mt-3 mx-auto inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold ${pillBg}`}>
        <span className={kh ? "font-khmer text-sm sm:text-base" : ""}>
          {kh ? whenKh : when}
        </span>
      </div>

      {/* Warning box (Good Night only) */}
      {warning && (
        <div
          role="alert"
          className="mt-4 rounded-xl border-2 border-amber-400 bg-amber-50 text-amber-900 p-3 sm:p-4 shadow-md flex items-start gap-2"
        >
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" aria-hidden />
          <div className="min-w-0">
            <div className={`font-extrabold text-xs sm:text-sm uppercase tracking-wide ${kh ? "font-khmer normal-case tracking-normal text-sm" : ""}`}>
              {kh ? warning.titleKh : warning.titleEn}
            </div>
            <p className={`mt-1 text-xs sm:text-sm leading-snug ${kh ? "font-khmer text-sm sm:text-base leading-loose" : ""}`}>
              {kh ? warning.bodyKh : warning.bodyEn}
            </p>
          </div>
        </div>
      )}

      {/* Spacer so cards equalize when one has the warning box */}
      {!warning && <div className="flex-1" />}

      {/* Suppressed-warning text for non-Good-Night cards keeps min-height parity */}
      <div className={`mt-3 text-center text-[11px] uppercase tracking-wider font-bold ${dark ? "text-indigo-200" : "text-slate-500"} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? KH_TODO("ប្រើជាការស្វាគមន៍ ✓") : "Use as a greeting ✓"}
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function SubsectionHeader({
  kh, en, khText, accent,
}: {
  kh: boolean;
  en: string;
  khText: string;
  accent: "rose" | "sky";
}) {
  const palette = {
    rose: "from-rose-100 to-pink-100 border-rose-300 text-rose-800",
    sky: "from-sky-100 to-cyan-100 border-sky-300 text-sky-800",
  }[accent];
  return (
    <div className={`mb-4 rounded-2xl border-2 bg-gradient-to-r ${palette} px-4 py-3`}>
      <div
        className={`font-display font-extrabold text-lg sm:text-xl leading-tight ${kh ? "font-khmer text-xl sm:text-2xl leading-loose" : ""}`}
      >
        {kh ? khText : en}
      </div>
      {kh && <div className="text-xs italic opacity-70 mt-0.5">{en}</div>}
    </div>
  );
}
