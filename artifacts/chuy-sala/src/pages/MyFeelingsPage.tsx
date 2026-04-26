import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  Smile,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * MY FEELINGS
 * អារម្មណ៍របស់ខ្ញុំ
 *
 * Audience: Cambodian kindergarten / lower primary ESL learners
 * Layout:   Pastel card grid; emojis are intentionally HUGE and central
 *           because facial-expression recognition is the primary learning
 *           channel for this module.
 * ────────────────────────────────────────────────────────────────────── */

type Feeling = {
  id: string;
  en: string;
  kh: string;
  emoji: string;
  /** Pastel gradient for the card surface (Tailwind). */
  palette: string;
  /** Border + Play-button accent name (Tailwind colour family). */
  accent: string;
};

const FEELINGS: Feeling[] = [
  { id: "happy",  en: "Happy",  kh: "សប្បាយចិត្ត",  emoji: "😊", palette: "from-yellow-100 via-amber-100 to-orange-100", accent: "yellow" },
  { id: "sad",    en: "Sad",    kh: "ពិបាកចិត្ត",   emoji: "😢", palette: "from-sky-100 via-blue-100 to-indigo-100",     accent: "blue"   },
  { id: "angry",  en: "Angry",  kh: "ខឹង",          emoji: "😠", palette: "from-red-100 via-rose-100 to-orange-100",     accent: "red"    },
  { id: "scared", en: "Scared", kh: "ភ័យខ្លាច",    emoji: "😨", palette: "from-violet-100 via-purple-100 to-indigo-100", accent: "violet" },
  { id: "tired",  en: "Tired",  kh: "អស់កម្លាំង",   emoji: "🥱", palette: "from-stone-100 via-slate-100 to-zinc-100",    accent: "slate"  },
  { id: "hungry", en: "Hungry", kh: "ឃ្លាន",         emoji: "🤤", palette: "from-lime-100 via-green-100 to-emerald-100", accent: "green"  },
];

/* ────────────────────────────────────────────────────────────────────── */

/**
 * Map a Feeling's accent name → concrete Tailwind classes for the
 * border, the Play button, and the focus ring. Tailwind's JIT cannot
 * detect dynamic class strings, so each combination is enumerated.
 */
const ACCENT_STYLES: Record<
  string,
  { border: string; ring: string; play: string }
> = {
  yellow: { border: "border-yellow-300", ring: "focus-visible:ring-yellow-400", play: "bg-yellow-500 hover:bg-yellow-600 text-white" },
  blue:   { border: "border-blue-300",   ring: "focus-visible:ring-blue-400",   play: "bg-blue-500 hover:bg-blue-600 text-white"     },
  red:    { border: "border-red-300",    ring: "focus-visible:ring-red-400",    play: "bg-red-500 hover:bg-red-600 text-white"       },
  violet: { border: "border-violet-300", ring: "focus-visible:ring-violet-400", play: "bg-violet-500 hover:bg-violet-600 text-white" },
  slate:  { border: "border-slate-300",  ring: "focus-visible:ring-slate-400",  play: "bg-slate-500 hover:bg-slate-600 text-white"   },
  green:  { border: "border-green-300",  ring: "focus-visible:ring-green-400",  play: "bg-green-500 hover:bg-green-600 text-white"   },
};

/* ────────────────────────────────────────────────────────────────────── */

export default function MyFeelingsPage() {
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

  function playFeeling(f: Feeling) {
    setSpeakingId(f.id);
    const result = speakText(f.en, "en-US", {
      onEnd: () => setSpeakingId((cur) => (cur === f.id ? null : cur)),
      onError: () => setSpeakingId((cur) => (cur === f.id ? null : cur)),
    });
    if (!result.ok) setSpeakingId(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-rose-50 to-violet-50 pb-16">
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
        <div className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-rose-300 px-4 py-1.5 text-xs sm:text-sm font-bold text-rose-700 shadow-sm">
          <Smile className="w-4 h-4" aria-hidden="true" />
          <span>{kh ? "សម្រាប់កុមារ · អារម្មណ៍" : "FOR KIDS · FEELINGS"}</span>
        </div>

        <h1 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-900">
          {kh ? (
            <span className="font-khmer leading-snug">អារម្មណ៍របស់ខ្ញុំ</span>
          ) : (
            <>
              My{" "}
              <span className="bg-gradient-to-r from-yellow-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
                Feelings
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
          {kh ? "My Feelings" : "អារម្មណ៍របស់ខ្ញុំ"}
        </p>

        <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-700">
          {kh
            ? "មើលទៅមុខ ប៉ះកាត រួចស្ដាប់ឈ្មោះអារម្មណ៍ជាភាសាអង់គ្លេស! រៀននិយាយពីរបៀបដែលអ្នកមានអារម្មណ៍ក្នុងថ្ងៃនេះ។"
            : "Look at the face, tap the card, and hear the feeling in English! Learn how to talk about how you feel today."}
        </p>
        <p
          className={`mt-2 max-w-2xl text-sm text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh
            ? "Look at the face, tap the card, and hear the feeling in English! Learn how to talk about how you feel today."
            : "មើលទៅមុខ ប៉ះកាត រួចស្ដាប់ឈ្មោះអារម្មណ៍ជាភាសាអង់គ្លេស! រៀននិយាយពីរបៀបដែលអ្នកមានអារម្មណ៍ក្នុងថ្ងៃនេះ។"}
        </p>
      </header>

      {/* ── Card grid ────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          data-testid="feelings-grid"
        >
          {FEELINGS.map((f) => {
            const styles = ACCENT_STYLES[f.accent];
            const isPlaying = speakingId === f.id;
            return (
              <article
                key={f.id}
                data-testid={`card-${f.id}`}
                className={`group relative rounded-3xl border-4 ${styles.border} bg-gradient-to-br ${f.palette} p-6 sm:p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col items-center`}
              >
                {/* HUGE central emoji — visual recognition is the primary
                    learning channel for this module. */}
                <div
                  className="text-[7rem] sm:text-[9rem] leading-none select-none mb-2"
                  aria-hidden="true"
                >
                  {f.emoji}
                </div>

                {/* English name (bold) */}
                <div className="mt-2 text-center font-display font-black text-3xl sm:text-4xl text-slate-900">
                  {f.en}
                </div>

                {/* Khmer translation */}
                <div className="mt-1 text-center font-khmer text-lg sm:text-xl text-slate-700 leading-loose">
                  {f.kh}
                </div>

                {/* Play audio button */}
                <button
                  type="button"
                  onClick={() => playFeeling(f)}
                  aria-label={`Play audio for ${f.en} (${f.kh})`}
                  data-testid={`button-play-${f.id}`}
                  className={`mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm sm:text-base shadow-md hover:shadow-lg active:scale-95 transition-all focus:outline-none focus-visible:ring-4 ${styles.ring} ${styles.play}`}
                >
                  <Volume2
                    className={`w-5 h-5 ${isPlaying ? "animate-pulse" : ""}`}
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

        {/* ── Encouragement footer ─────────────────────────────────── */}
        <div className="mt-12 max-w-3xl mx-auto rounded-3xl bg-white/80 border-4 border-rose-200 p-6 sm:p-8 shadow-md text-center">
          <Sparkles
            className="w-8 h-8 mx-auto text-rose-500"
            aria-hidden="true"
          />
          <h2 className="mt-3 font-display font-black text-2xl sm:text-3xl text-slate-900">
            {kh ? "អារម្មណ៍ទាំងអស់សុទ្ធតែគួរឱ្យគោរព!" : "Every feeling is okay!"}
          </h2>
          <p
            className={`mt-1 text-base text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh ? "Every feeling is okay!" : "អារម្មណ៍ទាំងអស់សុទ្ធតែគួរឱ្យគោរព!"}
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            {kh
              ? "ព្យាយាមនិយាយឱ្យឪពុកម្ដាយ ឬគ្រូស្ដាប់ពីអារម្មណ៍របស់អ្នកថ្ងៃនេះ — \"I am happy\" ឬ \"I am tired\"!"
              : "Try telling a parent or teacher how you feel today — \"I am happy\" or \"I am tired\"!"}
          </p>
          <p
            className={`mt-2 text-sm text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh
              ? "Try telling a parent or teacher how you feel today — \"I am happy\" or \"I am tired\"!"
              : "ព្យាយាមនិយាយឱ្យឪពុកម្ដាយ ឬគ្រូស្ដាប់ពីអារម្មណ៍របស់អ្នកថ្ងៃនេះ — \"I am happy\" ឬ \"I am tired\"!"}
          </p>
        </div>
      </main>
    </div>
  );
}
