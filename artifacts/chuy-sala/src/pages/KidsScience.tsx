import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  Search,
  Sprout,
  Atom,
  Move,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * SCIENCE FOR KIDS — The Three Branches of Science
 * វិទ្យាសាស្ត្រសម្រាប់កុមារ — បីផ្នែកនៃវិទ្យាសាស្ត្រ
 *
 * Audience: Cambodian primary-school ESL learners
 * Pattern: Reuses the established kids aesthetic (pastel cards, rounded
 *          edges, big emoji, bilingual content, Play-to-hear English).
 *          Three colour-coded branches:
 *            • Biology   — green   — life sciences
 *            • Chemistry — purple  — what things are made of
 *            • Physics   — blue    — how things move
 * ────────────────────────────────────────────────────────────────────── */

type ScienceCard = {
  id: string;
  en: string;
  kh: string;
  emoji: string;
  /** Sub-note shown only on cards that need a one-line behaviour hint. */
  subEn?: string;
  subKh?: string;
  /** Pastel gradient for the card surface (Tailwind). */
  palette: string;
  /** Border + Play-button accent name (enumerated below). */
  accent: string;
};

type ScienceModule = {
  id: "biology" | "chemistry" | "physics";
  testid: string;
  gridTestid: string;
  headingId: string;
  /** Branch name (e.g. "Biology") — appears as the bold prefix. */
  branchEn: string;
  branchKh: string;
  /** Tagline (e.g. "The Study of Life!") — appears after the colon. */
  taglineEn: string;
  taglineKh: string;
  subtitleEn: string;
  subtitleKh: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconAccent: string; // Tailwind text/bg/border color for the heading icon
  cards: ScienceCard[];
};

const MODULES: ScienceModule[] = [
  /* ── Branch 1: BIOLOGY (green) ───────────────────────────────────── */
  {
    id: "biology",
    testid: "section-biology",
    gridTestid: "grid-biology",
    headingId: "heading-biology",
    branchEn: "Biology",
    branchKh: "ជីវវិទ្យា",
    taglineEn: "The Study of Life!",
    taglineKh: "ការសិក្សាអំពីជីវិត!",
    subtitleEn: "From a tiny seed to a mighty tree, and every animal in between.",
    subtitleKh: "ពីគ្រាប់ពូជតូចមួយ ដល់ដើមឈើធំ និងសត្វគ្រប់ប្រភេទនៅចន្លោះ។",
    icon: Sprout,
    iconAccent: "text-green-600 bg-green-100 border-green-200",
    cards: [
      // Plant Life — moved from previous structure
      { id: "seed", en: "Seed", kh: "គ្រាប់ពូជ", emoji: "🌱", palette: "from-lime-100 via-green-100 to-emerald-100",  accent: "green"   },
      { id: "root", en: "Root", kh: "ឫស",          emoji: "🪢", palette: "from-amber-100 via-orange-100 to-yellow-100", accent: "amber"   },
      { id: "leaf", en: "Leaf", kh: "ស្លឹក",       emoji: "🍃", palette: "from-green-100 via-lime-100 to-emerald-100",  accent: "lime"    },
      { id: "tree", en: "Tree", kh: "ដើមឈើ",     emoji: "🌳", palette: "from-emerald-100 via-green-100 to-teal-100",  accent: "emerald" },
      // New cards
      {
        id: "animal",
        en: "Animal",
        kh: "សត្វ",
        emoji: "🐸",
        subEn: "They breathe and move!",
        subKh: "ពួកវាដកដង្ហើម និងផ្លាស់ទី!",
        palette: "from-emerald-100 via-teal-100 to-green-100",
        accent: "teal",
      },
      {
        id: "human",
        en: "Human",
        kh: "មនុស្ស",
        emoji: "🙋🏽‍♀️",
        subEn: "That is you!",
        subKh: "នោះគឺជាអ្នក!",
        palette: "from-rose-100 via-pink-100 to-orange-100",
        accent: "rose",
      },
    ],
  },

  /* ── Branch 2: CHEMISTRY (purple) ────────────────────────────────── */
  {
    id: "chemistry",
    testid: "section-chemistry",
    gridTestid: "grid-chemistry",
    headingId: "heading-chemistry",
    branchEn: "Chemistry",
    branchKh: "គីមីវិទ្យា",
    taglineEn: "What things are made of!",
    taglineKh: "តើវត្ថុធ្វើពីអ្វី!",
    subtitleEn: "Solid, liquid, gas — and what happens when we mix them together.",
    subtitleKh: "រឹង រាវ ឧស្ម័ន — និងអ្វីដែលកើតឡើង នៅពេលយើងលាយវាបញ្ចូលគ្នា។",
    icon: Atom,
    iconAccent: "text-purple-600 bg-purple-100 border-purple-200",
    cards: [
      // States of Matter — moved from previous structure
      {
        id: "solid",
        en: "Solid / Ice",
        kh: "រឹង / ទឹកកក",
        emoji: "🧊",
        subEn: "It holds its shape!",
        subKh: "វាមានរាងច្បាស់លាស់!",
        palette: "from-cyan-100 via-sky-100 to-blue-100",
        accent: "cyan",
      },
      {
        id: "liquid",
        en: "Liquid / Water",
        kh: "រាវ / ទឹក",
        emoji: "💧",
        subEn: "It flows!",
        subKh: "វាហូរ!",
        palette: "from-blue-100 via-sky-100 to-indigo-100",
        accent: "blue",
      },
      {
        id: "gas",
        en: "Gas / Steam",
        kh: "ឧស្ម័ន / ចំហាយទឹក",
        emoji: "💨",
        subEn: "It floats away!",
        subKh: "វាហោះអណ្តែត!",
        palette: "from-violet-100 via-purple-100 to-fuchsia-100",
        accent: "violet",
      },
      // New cards
      {
        id: "mix",
        en: "Mix",
        kh: "លាយ",
        emoji: "🥣",
        subEn: "Putting things together!",
        subKh: "ដាក់របស់ចូលគ្នា!",
        palette: "from-purple-100 via-violet-100 to-fuchsia-100",
        accent: "purple",
      },
      {
        id: "bubbles",
        en: "Bubbles",
        kh: "ពពុះ",
        emoji: "🫧",
        subEn: "A chemical reaction!",
        subKh: "ប្រតិកម្មគីមី!",
        palette: "from-fuchsia-100 via-pink-100 to-purple-100",
        accent: "fuchsia",
      },
    ],
  },

  /* ── Branch 3: PHYSICS (blue) ────────────────────────────────────── */
  {
    id: "physics",
    testid: "section-physics",
    gridTestid: "grid-physics",
    headingId: "heading-physics",
    branchEn: "Physics",
    branchKh: "រូបវិទ្យា",
    taglineEn: "How things move!",
    taglineKh: "របៀបដែលវត្ថុផ្លាស់ទី!",
    subtitleEn:
      "Pushes, pulls, and gravity — even the weather is driven by motion and heat.",
    subtitleKh:
      "ការរុញ ការទាញ និងទំនាញផែនដី — សូម្បីតែអាកាសធាតុក៏ដំណើរការដោយការផ្លាស់ទី និងកំដៅ។",
    icon: Move,
    iconAccent: "text-blue-600 bg-blue-100 border-blue-200",
    cards: [
      // Water Cycle — moved here (driven by heat & gravity)
      { id: "rain",  en: "Rain",  kh: "ភ្លៀង",        emoji: "🌧️", palette: "from-sky-100 via-blue-100 to-indigo-100",     accent: "blue"   },
      { id: "cloud", en: "Cloud", kh: "ពពក",           emoji: "☁️", palette: "from-slate-100 via-sky-100 to-blue-100",      accent: "slate"  },
      { id: "sun",   en: "Sun",   kh: "ព្រះអាទិត្យ",  emoji: "☀️", palette: "from-yellow-100 via-amber-100 to-orange-100", accent: "yellow" },
      { id: "river", en: "River", kh: "ទន្លេ",          emoji: "🌊", palette: "from-cyan-100 via-teal-100 to-blue-100",      accent: "cyan"   },
      // New cards
      {
        id: "push",
        en: "Push",
        kh: "រុញ",
        emoji: "🖐️",
        subEn: "Moving it away!",
        subKh: "ធ្វើឲ្យវាផ្លាស់ទីទៅឆ្ងាយ!",
        palette: "from-indigo-100 via-blue-100 to-sky-100",
        accent: "indigo",
      },
      {
        id: "pull",
        en: "Pull",
        kh: "ទាញ",
        emoji: "🪢",
        subEn: "Bringing it closer!",
        subKh: "យកវាមកជិត!",
        palette: "from-sky-100 via-blue-100 to-indigo-100",
        accent: "sky",
      },
      {
        id: "gravity",
        en: "Gravity",
        kh: "ទំនាញផែនដី",
        emoji: "🍎",
        subEn: "What makes things fall!",
        subKh: "អ្វីដែលធ្វើឱ្យវត្ថុធ្លាក់ចុះ!",
        palette: "from-red-100 via-rose-100 to-pink-100",
        accent: "red",
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────── */

/**
 * Map an accent name → concrete Tailwind classes for the card border,
 * the Play button, and its focus ring. Tailwind's JIT cannot detect
 * dynamic class strings, so each combination is enumerated.
 */
const ACCENT_STYLES: Record<
  string,
  { border: string; ring: string; play: string }
> = {
  blue:    { border: "border-blue-300",    ring: "focus-visible:ring-blue-400",    play: "bg-blue-500 hover:bg-blue-600 text-white"       },
  slate:   { border: "border-slate-300",   ring: "focus-visible:ring-slate-400",   play: "bg-slate-500 hover:bg-slate-600 text-white"     },
  yellow:  { border: "border-yellow-300",  ring: "focus-visible:ring-yellow-400",  play: "bg-yellow-500 hover:bg-yellow-600 text-white"   },
  cyan:    { border: "border-cyan-300",    ring: "focus-visible:ring-cyan-400",    play: "bg-cyan-500 hover:bg-cyan-600 text-white"       },
  green:   { border: "border-green-300",   ring: "focus-visible:ring-green-400",   play: "bg-green-500 hover:bg-green-600 text-white"     },
  amber:   { border: "border-amber-300",   ring: "focus-visible:ring-amber-400",   play: "bg-amber-500 hover:bg-amber-600 text-white"     },
  lime:    { border: "border-lime-300",    ring: "focus-visible:ring-lime-400",    play: "bg-lime-500 hover:bg-lime-600 text-white"       },
  emerald: { border: "border-emerald-300", ring: "focus-visible:ring-emerald-400", play: "bg-emerald-500 hover:bg-emerald-600 text-white" },
  teal:    { border: "border-teal-300",    ring: "focus-visible:ring-teal-400",    play: "bg-teal-500 hover:bg-teal-600 text-white"       },
  rose:    { border: "border-rose-300",    ring: "focus-visible:ring-rose-400",    play: "bg-rose-500 hover:bg-rose-600 text-white"       },
  violet:  { border: "border-violet-300",  ring: "focus-visible:ring-violet-400",  play: "bg-violet-500 hover:bg-violet-600 text-white"   },
  purple:  { border: "border-purple-300",  ring: "focus-visible:ring-purple-400",  play: "bg-purple-500 hover:bg-purple-600 text-white"   },
  fuchsia: { border: "border-fuchsia-300", ring: "focus-visible:ring-fuchsia-400", play: "bg-fuchsia-500 hover:bg-fuchsia-600 text-white" },
  indigo:  { border: "border-indigo-300",  ring: "focus-visible:ring-indigo-400",  play: "bg-indigo-500 hover:bg-indigo-600 text-white"   },
  sky:     { border: "border-sky-300",     ring: "focus-visible:ring-sky-400",     play: "bg-sky-500 hover:bg-sky-600 text-white"         },
  red:     { border: "border-red-300",     ring: "focus-visible:ring-red-400",     play: "bg-red-500 hover:bg-red-600 text-white"         },
};

/* ────────────────────────────────────────────────────────────────────── */

type ScienceModuleProps = {
  module: ScienceModule;
  kh: boolean;
  speakingId: string | null;
  onPlay: (card: ScienceCard) => void;
};

function ScienceModuleSection({
  module: m,
  kh,
  speakingId,
  onPlay,
}: ScienceModuleProps) {
  const HeadingIcon = m.icon;
  return (
    <section
      data-testid={m.testid}
      aria-labelledby={m.headingId}
      className="mt-12 first:mt-0"
    >
      {/* Bilingual section header — branch name + tagline (e.g. "Biology: The Study of Life!") */}
      <div className="flex items-start gap-4">
        <div
          className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl border-2 ${m.iconAccent}`}
          aria-hidden="true"
        >
          <HeadingIcon className="w-6 h-6" />
        </div>
        <div>
          <h2
            id={m.headingId}
            className="font-display font-black text-2xl sm:text-3xl text-slate-900"
          >
            {kh ? (
              <span className="font-khmer leading-snug">
                {m.branchKh}៖ {m.taglineKh}
              </span>
            ) : (
              <>
                {m.branchEn}: {m.taglineEn}
              </>
            )}
          </h2>
          <p
            className={`mt-0.5 text-sm sm:text-base text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh
              ? `${m.branchEn}: ${m.taglineEn}`
              : `${m.branchKh}៖ ${m.taglineKh}`}
          </p>
        </div>
      </div>

      {/* Bilingual subtitle */}
      <p className="mt-3 text-base text-slate-700">
        {kh ? m.subtitleKh : m.subtitleEn}
      </p>
      <p
        className={`mt-1 text-sm text-slate-500 ${
          kh ? "" : "font-khmer leading-loose"
        }`}
      >
        {kh ? m.subtitleEn : m.subtitleKh}
      </p>

      {/* Card grid — 1 col on mobile, 2 on tablet, up to 4 on desktop */}
      <div
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        data-testid={m.gridTestid}
      >
        {m.cards.map((c) => {
          const styles = ACCENT_STYLES[c.accent];
          const isPlaying = speakingId === c.id;
          return (
            <article
              key={c.id}
              data-testid={`card-${c.id}`}
              className={`group relative rounded-3xl border-4 ${styles.border} bg-gradient-to-br ${c.palette} p-5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center`}
            >
              {/* Big central emoji */}
              <div
                className="text-7xl sm:text-8xl leading-none select-none"
                aria-hidden="true"
              >
                {c.emoji}
              </div>

              {/* English name (bold) */}
              <div className="mt-3 font-display font-black text-2xl sm:text-3xl text-slate-900">
                {c.en}
              </div>

              {/* Khmer translation */}
              <div className="mt-1 font-khmer text-base sm:text-lg text-slate-700 leading-loose">
                {c.kh}
              </div>

              {/* Optional sub-note */}
              {c.subEn && c.subKh && (
                <div className="mt-3 px-3 py-2 rounded-xl bg-white/70 border border-white/80 text-sm">
                  <div className="italic text-slate-700">“{c.subEn}”</div>
                  <div className="mt-0.5 font-khmer text-xs text-slate-500 leading-loose">
                    “{c.subKh}”
                  </div>
                </div>
              )}

              {/* Play audio button — uses speakText (Web Speech API @ 0.85 rate) */}
              <button
                type="button"
                onClick={() => onPlay(c)}
                aria-label={`Play audio for ${c.en} (${c.kh})`}
                data-testid={`button-play-${c.id}`}
                className={`mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all focus:outline-none focus-visible:ring-4 ${styles.ring} ${styles.play}`}
              >
                <Volume2
                  className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`}
                  aria-hidden="true"
                />
                <span>{kh ? "ស្ដាប់" : "Play"}</span>
                <span
                  className={`text-[11px] opacity-80 ${
                    kh ? "" : "font-khmer"
                  }`}
                >
                  · {kh ? "Play" : "ស្ដាប់"}
                </span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

export default function KidsScience() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Stop any in-flight speech if the user navigates away.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function playCard(c: ScienceCard) {
    setSpeakingId(c.id);
    const result = speakText(c.en, "en-US", {
      onEnd: () => setSpeakingId((cur) => (cur === c.id ? null : cur)),
      onError: () => setSpeakingId((cur) => (cur === c.id ? null : cur)),
    });
    if (!result.ok) setSpeakingId(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50 to-blue-50 pb-16">
      {/* ── Back link ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {kh ? "ត្រឡប់ទំព័រដើម" : "Back to Home"}
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-emerald-300 px-4 py-1.5 text-xs sm:text-sm font-bold text-emerald-700 shadow-sm">
          <Search className="w-4 h-4" aria-hidden="true" />
          <span>{kh ? "សម្រាប់កុមារ · វិទ្យាសាស្ត្រ" : "FOR KIDS · SCIENCE"}</span>
        </div>

        <h1 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-900">
          {kh ? (
            <span className="font-khmer leading-snug">
              វិទ្យាសាស្ត្រសម្រាប់កុមារ
            </span>
          ) : (
            <>
              Science for{" "}
              <span className="bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Kids
              </span>
            </>
          )}
        </h1>

        {/* Muted opposite-language echo so both languages always appear. */}
        <p
          className={`mt-2 text-base sm:text-lg text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh ? "Science for Kids" : "វិទ្យាសាស្ត្រសម្រាប់កុមារ"}
        </p>

        <p className="mt-2 text-lg sm:text-xl font-display font-bold text-slate-700">
          {kh ? "បីផ្នែកនៃវិទ្យាសាស្ត្រ" : "The Three Branches of Science"}
        </p>
        <p
          className={`text-sm text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh ? "The Three Branches of Science" : "បីផ្នែកនៃវិទ្យាសាស្ត្រ"}
        </p>

        <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-700">
          {kh
            ? "ស្វែងយល់ពីបីផ្នែកធំនៃវិទ្យាសាស្ត្រ៖ ជីវវិទ្យា (ការសិក្សាអំពីជីវិត), គីមីវិទ្យា (តើវត្ថុធ្វើពីអ្វី), និងរូបវិទ្យា (របៀបដែលវត្ថុផ្លាស់ទី)។ ប៉ះប៊ូតុង ស្ដាប់ ដើម្បីលឺពាក្យជាភាសាអង់គ្លេស!"
            : "Explore the three big branches of science: Biology (the study of life), Chemistry (what things are made of), and Physics (how things move). Tap Play to hear each word in English!"}
        </p>
        <p
          className={`mt-2 max-w-2xl text-sm text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh
            ? "Explore the three big branches of science: Biology (the study of life), Chemistry (what things are made of), and Physics (how things move). Tap Play to hear each word in English!"
            : "ស្វែងយល់ពីបីផ្នែកធំនៃវិទ្យាសាស្ត្រ៖ ជីវវិទ្យា (ការសិក្សាអំពីជីវិត), គីមីវិទ្យា (តើវត្ថុធ្វើពីអ្វី), និងរូបវិទ្យា (របៀបដែលវត្ថុផ្លាស់ទី)។ ប៉ះប៊ូតុង ស្ដាប់ ដើម្បីលឺពាក្យជាភាសាអង់គ្លេស!"}
        </p>
      </header>

      {/* ── Modules ──────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        {MODULES.map((m) => (
          <ScienceModuleSection
            key={m.id}
            module={m}
            kh={kh}
            speakingId={speakingId}
            onPlay={playCard}
          />
        ))}

        {/* ── Encouragement footer ─────────────────────────────────── */}
        <div className="mt-14 max-w-3xl mx-auto rounded-3xl bg-white/80 border-4 border-emerald-200 p-6 sm:p-8 shadow-md text-center">
          <Sparkles
            className="w-8 h-8 mx-auto text-emerald-500"
            aria-hidden="true"
          />
          <h2 className="mt-3 font-display font-black text-2xl sm:text-3xl text-slate-900">
            {kh ? "អ្នកជាអ្នកវិទ្យាសាស្ត្រតូច!" : "You are a little scientist!"}
          </h2>
          <p
            className={`mt-1 text-base text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh ? "You are a little scientist!" : "អ្នកជាអ្នកវិទ្យាសាស្ត្រតូច!"}
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            {kh
              ? "សួរសំណួរច្រើន សង្កេតមើលធម្មជាតិ ហើយរីករាយជាមួយការរៀន!"
              : "Ask lots of questions, watch nature carefully, and have fun learning!"}
          </p>
          <p
            className={`mt-2 text-sm text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh
              ? "Ask lots of questions, watch nature carefully, and have fun learning!"
              : "សួរសំណួរច្រើន សង្កេតមើលធម្មជាតិ ហើយរីករាយជាមួយការរៀន!"}
          </p>
        </div>
      </main>
    </div>
  );
}
