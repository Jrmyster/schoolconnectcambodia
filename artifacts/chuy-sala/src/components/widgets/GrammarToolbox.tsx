import { useState } from "react";
import {
  Box, Zap, Paintbrush, Gauge, User, ArrowLeftRight,
  Link as LinkIcon, Megaphone, Wrench, RotateCcw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type Tone = {
  card: string;       // border + background gradient on the front face
  iconBg: string;     // small badge behind the icon
  iconText: string;
  back: string;       // flipped face background
  chip: string;       // example chip background
};

type PartOfSpeech = {
  key: string;
  Icon: LucideIcon;
  termEn: string;
  termKh: string;
  metaphorEn: string;     // "(The bricks)" — short visual cue
  metaphorKh: string;
  defEn: string;
  defKh: string;
  examples: Array<{ en: string; kh: string }>;
  tone: Tone;
};

// Eight pastel tones — one per part of speech for instant visual recognition.
const TONES: Record<string, Tone> = {
  amber:   { card: "border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100",
             iconBg: "bg-amber-200", iconText: "text-amber-800",
             back: "bg-amber-50", chip: "bg-white border-amber-300 text-amber-900" },
  rose:    { card: "border-rose-300 bg-gradient-to-br from-rose-50 to-rose-100",
             iconBg: "bg-rose-200", iconText: "text-rose-800",
             back: "bg-rose-50", chip: "bg-white border-rose-300 text-rose-900" },
  violet:  { card: "border-violet-300 bg-gradient-to-br from-violet-50 to-violet-100",
             iconBg: "bg-violet-200", iconText: "text-violet-800",
             back: "bg-violet-50", chip: "bg-white border-violet-300 text-violet-900" },
  emerald: { card: "border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100",
             iconBg: "bg-emerald-200", iconText: "text-emerald-800",
             back: "bg-emerald-50", chip: "bg-white border-emerald-300 text-emerald-900" },
  sky:     { card: "border-sky-300 bg-gradient-to-br from-sky-50 to-sky-100",
             iconBg: "bg-sky-200", iconText: "text-sky-800",
             back: "bg-sky-50", chip: "bg-white border-sky-300 text-sky-900" },
  cyan:    { card: "border-cyan-300 bg-gradient-to-br from-cyan-50 to-cyan-100",
             iconBg: "bg-cyan-200", iconText: "text-cyan-800",
             back: "bg-cyan-50", chip: "bg-white border-cyan-300 text-cyan-900" },
  indigo:  { card: "border-indigo-300 bg-gradient-to-br from-indigo-50 to-indigo-100",
             iconBg: "bg-indigo-200", iconText: "text-indigo-800",
             back: "bg-indigo-50", chip: "bg-white border-indigo-300 text-indigo-900" },
  orange:  { card: "border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100",
             iconBg: "bg-orange-200", iconText: "text-orange-800",
             back: "bg-orange-50", chip: "bg-white border-orange-300 text-orange-900" },
};

const PARTS: PartOfSpeech[] = [
  {
    key: "noun",
    Icon: Box,
    termEn: "Noun",
    termKh: "នាម",
    metaphorEn: "(The bricks)",
    metaphorKh: "(ឥដ្ឋ)",
    defEn: "A person, place, thing, or idea.",
    defKh: "មនុស្ស ទីកន្លែង វត្ថុ ឬគំនិត។",
    examples: [
      { en: "Student", kh: "សិស្ស" },
      { en: "School",  kh: "សាលារៀន" },
      { en: "Water",   kh: "ទឹក" },
    ],
    tone: TONES.amber,
  },
  {
    key: "verb",
    Icon: Zap,
    termEn: "Verb",
    termKh: "កិរិយាសព្ទ",
    metaphorEn: "(The engine)",
    metaphorKh: "(ម៉ាស៊ីន)",
    defEn: "An action or state of being.",
    defKh: "សកម្មភាព ឬស្ថានភាព។",
    examples: [
      { en: "Run",       kh: "រត់" },
      { en: "Eat",       kh: "ញ៉ាំ" },
      { en: "Is/Am/Are", kh: "គឺ" },
    ],
    tone: TONES.rose,
  },
  {
    key: "adjective",
    Icon: Paintbrush,
    termEn: "Adjective",
    termKh: "គុណនាម",
    metaphorEn: "(The paint)",
    metaphorKh: "(ថ្នាំលាប)",
    defEn: "Describes a noun.",
    defKh: "ពិពណ៌នានាម។",
    examples: [
      { en: "Big",       kh: "ធំ" },
      { en: "Red",       kh: "ក្រហម" },
      { en: "Beautiful", kh: "ស្រស់ស្អាត" },
    ],
    tone: TONES.violet,
  },
  {
    key: "adverb",
    Icon: Gauge,
    termEn: "Adverb",
    termKh: "គុណកិរិយា",
    metaphorEn: "(How / When)",
    metaphorKh: "(ដូចម្ដេច / ពេលណា)",
    defEn: "Describes a verb, adjective, or other adverb. Tells how or when.",
    defKh: "ពិពណ៌នាកិរិយាសព្ទ គុណនាម ឬគុណកិរិយាដទៃ។ ប្រាប់ពីរបៀប ឬពេលវេលា។",
    examples: [
      { en: "Quickly",   kh: "យ៉ាងលឿន" },
      { en: "Very",      kh: "ណាស់" },
      { en: "Yesterday", kh: "ម្សិលមិញ" },
    ],
    tone: TONES.emerald,
  },
  {
    key: "pronoun",
    Icon: User,
    termEn: "Pronoun",
    termKh: "សព្វនាម",
    metaphorEn: "(The stand-in)",
    metaphorKh: "(ពាក្យជំនួស)",
    defEn: "Takes the place of a noun to avoid repeating it.",
    defKh: "ជំនួសនាម ដើម្បីចៀសវាងការនិយាយឡើងវិញ។",
    examples: [
      { en: "He",   kh: "គាត់" },
      { en: "She",  kh: "នាង" },
      { en: "They", kh: "ពួកគេ" },
    ],
    tone: TONES.sky,
  },
  {
    key: "preposition",
    Icon: ArrowLeftRight,
    termEn: "Preposition",
    termKh: "ធ្នាក់",
    metaphorEn: "(The bridge)",
    metaphorKh: "(ស្ពាន)",
    defEn: "Shows location, time, or direction.",
    defKh: "បង្ហាញទីកន្លែង ពេលវេលា ឬទិសដៅ។",
    examples: [
      { en: "In",    kh: "នៅក្នុង" },
      { en: "On",    kh: "នៅលើ" },
      { en: "Under", kh: "នៅក្រោម" },
    ],
    tone: TONES.cyan,
  },
  {
    key: "conjunction",
    Icon: LinkIcon,
    termEn: "Conjunction",
    termKh: "ឈ្នាប់",
    metaphorEn: "(The glue)",
    metaphorKh: "(កាវ)",
    defEn: "Connects words or phrases together.",
    defKh: "ភ្ជាប់ពាក្យ ឬឃ្លាជាមួយគ្នា។",
    examples: [
      { en: "And",     kh: "និង" },
      { en: "But",     kh: "ប៉ុន្តែ" },
      { en: "Because", kh: "ពីព្រោះ" },
    ],
    tone: TONES.indigo,
  },
  {
    key: "interjection",
    Icon: Megaphone,
    termEn: "Interjection",
    termKh: "ឧទានសព្ទ",
    metaphorEn: "(The explosion!)",
    metaphorKh: "(ការផ្ទុះ!)",
    defEn: "Shows strong emotion or surprise.",
    defKh: "បង្ហាញអារម្មណ៍ខ្លាំង ឬការភ្ញាក់ផ្អើល។",
    examples: [
      { en: "Wow!",   kh: "អស្ចារ្យ!" },
      { en: "Oh no!", kh: "អូទេ!" },
    ],
    tone: TONES.orange,
  },
];

export function GrammarToolbox() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section
      className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/60 p-5 sm:p-7 shadow-sm"
      data-testid="grammar-toolbox"
      aria-labelledby="grammar-toolbox-title"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-5 sm:mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-800 shrink-0">
          <Wrench className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "មូលដ្ឋានវេយ្យាករណ៍" : "Grammar Foundation"}
          </div>
          <h2
            id="grammar-toolbox-title"
            className={`font-display font-extrabold text-xl sm:text-2xl text-amber-900 leading-tight mt-0.5 ${kh ? "font-khmer leading-snug" : ""}`}
          >
            {kh
              ? "ប្រអប់ឧបករណ៍វេយ្យាករណ៍៖ ថ្នាក់ពាក្យទាំង៨"
              : "The Grammar Toolbox: The 8 Parts of Speech"}
          </h2>
          <p className={`text-xs sm:text-sm text-amber-800/80 mt-1 ${kh ? "font-khmer" : ""}`}>
            {kh
              ? "ចុចលើកាតណាមួយ ដើម្បីបង្ហាញឧទាហរណ៍។"
              : "Tap any card to reveal its examples."}
          </p>
        </div>
      </div>

      {/* 4×2 grid on desktop, 2×4 on mobile */}
      <ul
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 list-none p-0"
        aria-label={kh ? "កាតថ្នាក់ពាក្យ" : "Parts of speech cards"}
        data-testid="grammar-toolbox-grid"
      >
        {PARTS.map((p) => {
          const isFlipped = flipped === p.key;
          const { Icon, tone } = p;

          return (
            <li key={p.key}>
              <button
                type="button"
                onClick={() => setFlipped((cur) => (cur === p.key ? null : p.key))}
                aria-pressed={isFlipped}
                aria-label={
                  isFlipped
                    ? (kh ? `បិទឧទាហរណ៍ ${p.termKh}` : `Hide examples for ${p.termEn}`)
                    : (kh ? `បង្ហាញឧទាហរណ៍ ${p.termKh}` : `Show examples for ${p.termEn}`)
                }
                className={`group relative w-full text-left rounded-2xl border-2 ${tone.card} p-3 sm:p-4 min-h-[10rem] sm:min-h-[11rem] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 overflow-hidden`}
                data-testid={`pos-card-${p.key}`}
                data-flipped={isFlipped ? "true" : "false"}
              >
                {/* FRONT face — definition */}
                <div
                  className={`flex flex-col h-full transition-all duration-300 ${isFlipped ? "opacity-0 -translate-y-2 pointer-events-none absolute inset-3 sm:inset-4" : "opacity-100 translate-y-0"}`}
                  aria-hidden={isFlipped}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${tone.iconBg} ${tone.iconText} shrink-0`}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`font-display font-extrabold text-base sm:text-lg ${tone.iconText} leading-tight`}
                        data-testid={`pos-term-en-${p.key}`}
                      >
                        {p.termEn}
                      </div>
                      <div
                        className={`font-khmer text-sm leading-tight ${tone.iconText} opacity-90`}
                        data-testid={`pos-term-kh-${p.key}`}
                      >
                        {p.termKh}
                      </div>
                    </div>
                  </div>

                  <p className={`text-xs sm:text-sm text-slate-700 leading-snug ${kh ? "font-khmer leading-relaxed" : ""}`}>
                    {kh ? p.defKh : p.defEn}
                  </p>
                  <p className={`mt-1 text-[11px] sm:text-xs italic ${tone.iconText} opacity-75 ${kh ? "font-khmer not-italic" : ""}`}>
                    {kh ? p.metaphorKh : p.metaphorEn}
                  </p>

                  <div className={`mt-auto pt-2 inline-flex items-center gap-1 self-start text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${tone.iconText} opacity-70 group-hover:opacity-100 transition-opacity ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                    <RotateCcw className="w-3 h-3" aria-hidden="true" />
                    <span>{kh ? "បង្ហាញឧទាហរណ៍" : "See examples"}</span>
                  </div>
                </div>

                {/* BACK face — examples */}
                <div
                  className={`flex flex-col h-full transition-all duration-300 ${isFlipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none absolute inset-3 sm:inset-4"}`}
                  aria-hidden={!isFlipped}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${tone.iconBg} ${tone.iconText} shrink-0`}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div
                      className={`font-display font-extrabold text-base sm:text-lg ${tone.iconText} leading-tight`}
                    >
                      {kh ? p.termKh : p.termEn}
                    </div>
                  </div>

                  <div className={`text-[10px] font-bold uppercase tracking-wider ${tone.iconText} opacity-70 mb-1.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                    {kh ? "ឧទាហរណ៍" : "Examples"}
                  </div>

                  <ul className="flex flex-wrap gap-1.5 list-none p-0" data-testid={`pos-examples-${p.key}`}>
                    {p.examples.map((ex, i) => (
                      <li
                        key={i}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px] sm:text-xs font-bold ${tone.chip}`}
                      >
                        <span>{ex.en}</span>
                        <span className="font-khmer opacity-70">· {ex.kh}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-auto pt-2 inline-flex items-center gap-1 self-start text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${tone.iconText} opacity-70 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                    <RotateCcw className="w-3 h-3" aria-hidden="true" />
                    <span>{kh ? "បង្វិលត្រឡប់" : "Flip back"}</span>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
