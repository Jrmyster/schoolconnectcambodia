import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  Search,
  Droplets,
  Sprout,
  Atom,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * SCIENCE FOR KIDS — The World Around Us
 * វិទ្យាសាស្ត្រសម្រាប់កុមារ
 *
 * Audience: Cambodian primary-school ESL learners
 * Pattern: Reuses the established kids aesthetic (pastel cards, rounded
 *          edges, big emoji, bilingual content, Play-to-hear English).
 *          Three grouped modules with bilingual section headings.
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
  id: "water" | "plants" | "matter";
  testid: string;
  gridTestid: string;
  headingId: string;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconAccent: string; // Tailwind text color for the heading icon
  cards: ScienceCard[];
};

const MODULES: ScienceModule[] = [
  {
    id: "water",
    testid: "section-water",
    gridTestid: "grid-water",
    headingId: "heading-water",
    titleEn: "The Water Cycle",
    titleKh: "វដ្តទឹក",
    subtitleEn: "How water travels around the world.",
    subtitleKh: "តើទឹកធ្វើដំណើរជុំវិញពិភពលោកយ៉ាងដូចម្ដេច។",
    icon: Droplets,
    iconAccent: "text-sky-600 bg-sky-100 border-sky-200",
    cards: [
      { id: "rain",  en: "Rain",  kh: "ភ្លៀង",        emoji: "🌧️", palette: "from-sky-100 via-blue-100 to-indigo-100",     accent: "blue"   },
      { id: "cloud", en: "Cloud", kh: "ពពក",           emoji: "☁️", palette: "from-slate-100 via-sky-100 to-blue-100",      accent: "slate"  },
      { id: "sun",   en: "Sun",   kh: "ព្រះអាទិត្យ",  emoji: "☀️", palette: "from-yellow-100 via-amber-100 to-orange-100", accent: "yellow" },
      { id: "river", en: "River", kh: "ទន្លេ",          emoji: "🌊", palette: "from-cyan-100 via-teal-100 to-blue-100",      accent: "cyan"   },
    ],
  },
  {
    id: "plants",
    testid: "section-plants",
    gridTestid: "grid-plants",
    headingId: "heading-plants",
    titleEn: "Plant Life",
    titleKh: "ជីវិតរុក្ខជាតិ",
    subtitleEn: "How a tiny seed grows into a mighty tree.",
    subtitleKh: "តើគ្រាប់ពូជតូចលូតលាស់ក្លាយជាដើមឈើធំយ៉ាងដូចម្ដេច។",
    icon: Sprout,
    iconAccent: "text-green-600 bg-green-100 border-green-200",
    cards: [
      { id: "seed", en: "Seed", kh: "គ្រាប់ពូជ", emoji: "🌱", palette: "from-lime-100 via-green-100 to-emerald-100",  accent: "green"  },
      { id: "root", en: "Root", kh: "ឫស",          emoji: "🪢", palette: "from-amber-100 via-orange-100 to-yellow-100", accent: "amber"  },
      { id: "leaf", en: "Leaf", kh: "ស្លឹក",       emoji: "🍃", palette: "from-green-100 via-lime-100 to-emerald-100",  accent: "lime"   },
      { id: "tree", en: "Tree", kh: "ដើមឈើ",     emoji: "🌳", palette: "from-emerald-100 via-green-100 to-teal-100",  accent: "emerald"},
    ],
  },
  {
    id: "matter",
    testid: "section-matter",
    gridTestid: "grid-matter",
    headingId: "heading-matter",
    titleEn: "States of Matter",
    titleKh: "ស្ថានភាពនៃរូបធាតុ",
    subtitleEn: "Solid, liquid, gas — the three faces of water.",
    subtitleKh: "រឹង រាវ ឧស្ម័ន — បីទម្រង់នៃទឹក។",
    icon: Atom,
    iconAccent: "text-violet-600 bg-violet-100 border-violet-200",
    cards: [
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
  violet:  { border: "border-violet-300",  ring: "focus-visible:ring-violet-400",  play: "bg-violet-500 hover:bg-violet-600 text-white"   },
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
      {/* Bilingual section header */}
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
              <span className="font-khmer leading-snug">{m.titleKh}</span>
            ) : (
              m.titleEn
            )}
          </h2>
          <p
            className={`mt-0.5 text-sm sm:text-base text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh ? m.titleEn : m.titleKh}
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

      {/* Card grid */}
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

              {/* Optional sub-note (used by States of Matter) */}
              {c.subEn && c.subKh && (
                <div className="mt-3 px-3 py-2 rounded-xl bg-white/70 border border-white/80 text-sm">
                  <div className="italic text-slate-700">
                    “{c.subEn}”
                  </div>
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-green-50 to-violet-50 pb-16">
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
              <span className="bg-gradient-to-r from-sky-500 via-emerald-500 to-violet-500 bg-clip-text text-transparent">
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
          {kh ? "ពិភពលោកជុំវិញយើង" : "The World Around Us"}
        </p>
        <p
          className={`text-sm text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh ? "The World Around Us" : "ពិភពលោកជុំវិញយើង"}
        </p>

        <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-700">
          {kh
            ? "ស្វែងយល់អំពីពិភពលោកធម្មជាតិតាមរយៈវដ្តទឹក ជីវិតរុក្ខជាតិ និងស្ថានភាពនៃរូបធាតុ។ ប៉ះប៊ូតុង ស្ដាប់ ដើម្បីលឺពាក្យជាភាសាអង់គ្លេស!"
            : "Explore the natural world through the water cycle, plant life, and the states of matter. Tap Play to hear each word in English!"}
        </p>
        <p
          className={`mt-2 max-w-2xl text-sm text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh
            ? "Explore the natural world through the water cycle, plant life, and the states of matter. Tap Play to hear each word in English!"
            : "ស្វែងយល់អំពីពិភពលោកធម្មជាតិតាមរយៈវដ្តទឹក ជីវិតរុក្ខជាតិ និងស្ថានភាពនៃរូបធាតុ។ ប៉ះប៊ូតុង ស្ដាប់ ដើម្បីលឺពាក្យជាភាសាអង់គ្លេស!"}
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
