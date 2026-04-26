import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  HeartPulse,
  Sun,
  Info,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * MY DAY: ACTIONS & HEALTH
 * ថ្ងៃរបស់ខ្ញុំ៖ សកម្មភាព និងសុខភាព
 *
 * Audience:  Cambodian kindergarten / lower primary ESL learners
 * Aesthetic: Bright pastel cards, huge emoji, big bold English verb,
 *            Khmer translation underneath, Play button (Web Speech API).
 *            Three "health-tip" cards carry an extra bilingual note pill.
 * ────────────────────────────────────────────────────────────────────── */

type Action = {
  id: string;
  en: string;
  kh: string;
  emoji: string;
  /** Pastel gradient classes for the card surface (Tailwind). */
  palette: string;
  /** Border + ring accent (Tailwind colour name). */
  accent: string;
  /** Optional bilingual health note shown as a pill under the Play button. */
  noteEn?: string;
  noteKh?: string;
};

const ACTIONS: Action[] = [
  {
    id: "wake-up",
    en: "Wake up",
    kh: "ភ្ញាក់ពីដេក",
    emoji: "🌅",
    palette: "from-amber-100 via-orange-100 to-rose-100",
    accent: "amber",
  },
  {
    id: "wash-hands",
    en: "Wash hands",
    kh: "លាងដៃ",
    emoji: "🧼",
    palette: "from-sky-100 via-cyan-100 to-teal-100",
    accent: "sky",
    noteEn: "Use soap to stop germs!",
    noteKh: "ប្រើសាប៊ូដើម្បីការពារមេរោគ!",
  },
  {
    id: "brush-teeth",
    en: "Brush teeth",
    kh: "ដុសធ្មេញ",
    emoji: "🪥",
    palette: "from-cyan-100 via-blue-100 to-indigo-100",
    accent: "cyan",
  },
  {
    id: "drink-water",
    en: "Drink water",
    kh: "ផឹកទឹក",
    emoji: "💧",
    palette: "from-blue-100 via-sky-100 to-cyan-100",
    accent: "blue",
    noteEn: "Only drink clean, boiled water!",
    noteKh: "ផឹកតែទឹកស្អាតដែលដាំពុះ!",
  },
  {
    id: "eat-food",
    en: "Eat food",
    kh: "ញ៉ាំអាហារ",
    emoji: "🍚",
    palette: "from-yellow-100 via-amber-100 to-orange-100",
    accent: "yellow",
  },
  {
    id: "read-book",
    en: "Read a book",
    kh: "អានសៀវភៅ",
    emoji: "📖",
    palette: "from-emerald-100 via-green-100 to-lime-100",
    accent: "emerald",
  },
  {
    id: "play",
    en: "Play",
    kh: "លេង",
    emoji: "⚽",
    palette: "from-pink-100 via-rose-100 to-fuchsia-100",
    accent: "pink",
  },
  {
    id: "sleep",
    en: "Sleep",
    kh: "ដេក",
    emoji: "🛏️",
    palette: "from-violet-100 via-purple-100 to-indigo-100",
    accent: "violet",
    noteEn: "Sleep under a mosquito net!",
    noteKh: "ដេកក្នុងមុង!",
  },
];

/* ────────────────────────────────────────────────────────────────────── */

/**
 * Map an Action's accent name to concrete Tailwind classes for the
 * border, the Play button, and the focus ring. Tailwind cannot detect
 * dynamically-built class names, so each combination is enumerated.
 */
const ACCENT_STYLES: Record<
  string,
  {
    border: string;
    ring: string;
    play: string;
    note: string;
    noteText: string;
  }
> = {
  amber: {
    border: "border-amber-300",
    ring: "focus-visible:ring-amber-400",
    play: "bg-amber-500 hover:bg-amber-600 text-white",
    note: "bg-amber-50 border-amber-300",
    noteText: "text-amber-900",
  },
  sky: {
    border: "border-sky-300",
    ring: "focus-visible:ring-sky-400",
    play: "bg-sky-500 hover:bg-sky-600 text-white",
    note: "bg-sky-50 border-sky-300",
    noteText: "text-sky-900",
  },
  cyan: {
    border: "border-cyan-300",
    ring: "focus-visible:ring-cyan-400",
    play: "bg-cyan-500 hover:bg-cyan-600 text-white",
    note: "bg-cyan-50 border-cyan-300",
    noteText: "text-cyan-900",
  },
  blue: {
    border: "border-blue-300",
    ring: "focus-visible:ring-blue-400",
    play: "bg-blue-500 hover:bg-blue-600 text-white",
    note: "bg-blue-50 border-blue-300",
    noteText: "text-blue-900",
  },
  yellow: {
    border: "border-yellow-300",
    ring: "focus-visible:ring-yellow-400",
    play: "bg-yellow-500 hover:bg-yellow-600 text-white",
    note: "bg-yellow-50 border-yellow-300",
    noteText: "text-yellow-900",
  },
  emerald: {
    border: "border-emerald-300",
    ring: "focus-visible:ring-emerald-400",
    play: "bg-emerald-500 hover:bg-emerald-600 text-white",
    note: "bg-emerald-50 border-emerald-300",
    noteText: "text-emerald-900",
  },
  pink: {
    border: "border-pink-300",
    ring: "focus-visible:ring-pink-400",
    play: "bg-pink-500 hover:bg-pink-600 text-white",
    note: "bg-pink-50 border-pink-300",
    noteText: "text-pink-900",
  },
  violet: {
    border: "border-violet-300",
    ring: "focus-visible:ring-violet-400",
    play: "bg-violet-500 hover:bg-violet-600 text-white",
    note: "bg-violet-50 border-violet-300",
    noteText: "text-violet-900",
  },
};

/* ────────────────────────────────────────────────────────────────────── */

export default function MyDayActionsPage() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  // Track the currently-speaking card so the Play button can show a
  // subtle "Playing…" state without blocking taps on other cards.
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Cancel any in-flight speech if the user navigates away.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function playAction(a: Action) {
    setSpeakingId(a.id);
    const result = speakText(a.en, "en-US", {
      onEnd: () => setSpeakingId((cur) => (cur === a.id ? null : cur)),
      onError: () => setSpeakingId((cur) => (cur === a.id ? null : cur)),
    });
    if (!result.ok) {
      // Browsers without speech API: clear immediately so UI doesn't hang.
      setSpeakingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 pb-16">
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
        <div className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-amber-300 px-4 py-1.5 text-xs sm:text-sm font-bold text-amber-700 shadow-sm">
          <Sun className="w-4 h-4" aria-hidden="true" />
          <span>{kh ? "សម្រាប់កុមារ · ថ្ងៃរបស់ខ្ញុំ" : "FOR KIDS · MY DAY"}</span>
        </div>

        <h1 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-900">
          {kh ? (
            <span className="font-khmer leading-snug">ថ្ងៃរបស់ខ្ញុំ៖ សកម្មភាព និងសុខភាព</span>
          ) : (
            <>
              My Day:{" "}
              <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-sky-500 bg-clip-text text-transparent">
                Actions &amp; Health
              </span>
            </>
          )}
        </h1>

        {/* Muted opposite-language echo, so both languages always appear. */}
        <p
          className={`mt-2 text-base sm:text-lg text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh
            ? "My Day: Actions & Health"
            : "ថ្ងៃរបស់ខ្ញុំ៖ សកម្មភាព និងសុខភាព"}
        </p>

        <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-700">
          {kh
            ? "ប៉ះកាតណាមួយ ដើម្បីស្ដាប់ពាក្យជាភាសាអង់គ្លេស! រៀនសកម្មភាពប្រចាំថ្ងៃ និងគន្លឹះសុខភាពសំខាន់ៗ។"
            : "Tap any card to hear the English word! Learn everyday actions and important health tips along the way."}
        </p>
        <p
          className={`mt-2 max-w-2xl text-sm text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh
            ? "Tap any card to hear the English word! Learn everyday actions and important health tips along the way."
            : "ប៉ះកាតណាមួយ ដើម្បីស្ដាប់ពាក្យជាភាសាអង់គ្លេស! រៀនសកម្មភាពប្រចាំថ្ងៃ និងគន្លឹះសុខភាពសំខាន់ៗ។"}
        </p>

        {/* Tiny legend so kids spot the health-tip cards at a glance. */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/70 border border-rose-200 px-3 py-2 text-xs sm:text-sm">
          <HeartPulse className="w-4 h-4 text-rose-500" aria-hidden="true" />
          <span className="font-bold text-rose-700">
            {kh ? "កាតមានរូប" : "Cards with a"}{" "}
            <HeartPulse className="inline w-3.5 h-3.5 -mt-0.5" aria-hidden="true" />{" "}
            {kh ? "មានគន្លឹះសុខភាព" : "have a health tip!"}
          </span>
          <span
            className={`text-slate-500 ${kh ? "" : "font-khmer"}`}
          >
            ·{" "}
            {kh
              ? "Cards with a heart icon have a health tip!"
              : "កាតដែលមានរូបបេះដូងមានគន្លឹះសុខភាព!"}
          </span>
        </div>
      </header>

      {/* ── Card grid ────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
          data-testid="actions-grid"
        >
          {ACTIONS.map((a) => {
            const styles = ACCENT_STYLES[a.accent];
            const isPlaying = speakingId === a.id;
            const hasTip = !!a.noteEn;
            return (
              <article
                key={a.id}
                data-testid={`card-${a.id}`}
                className={`group relative rounded-3xl border-4 ${styles.border} bg-gradient-to-br ${a.palette} p-5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col`}
              >
                {/* Health-tip indicator (top-right corner of tip cards) */}
                {hasTip && (
                  <div
                    className="absolute top-3 right-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-500 text-white shadow-md"
                    aria-label={kh ? "មានគន្លឹះសុខភាព" : "Has a health tip"}
                    title={kh ? "មានគន្លឹះសុខភាព" : "Has a health tip"}
                  >
                    <HeartPulse className="w-4 h-4" aria-hidden="true" />
                  </div>
                )}

                {/* Big emoji */}
                <div
                  className="text-7xl sm:text-8xl text-center leading-none my-2 select-none"
                  aria-hidden="true"
                >
                  {a.emoji}
                </div>

                {/* English verb (bold) */}
                <div className="mt-3 text-center font-display font-black text-2xl sm:text-3xl text-slate-900">
                  {a.en}
                </div>

                {/* Khmer translation */}
                <div className="mt-1 text-center font-khmer text-base sm:text-lg text-slate-700 leading-loose">
                  {a.kh}
                </div>

                {/* Play audio button */}
                <button
                  type="button"
                  onClick={() => playAction(a)}
                  aria-label={`Play audio for ${a.en} (${a.kh})`}
                  data-testid={`button-play-${a.id}`}
                  className={`mt-4 self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all focus:outline-none focus-visible:ring-4 ${styles.ring} ${styles.play}`}
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

                {/* Optional bilingual health-tip pill */}
                {hasTip && (
                  <div
                    className={`mt-4 rounded-2xl border-2 ${styles.note} p-3 sm:p-3.5`}
                    data-testid={`note-${a.id}`}
                  >
                    <div className="flex items-start gap-2">
                      <Info
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${styles.noteText}`}
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-semibold ${styles.noteText}`}
                        >
                          {a.noteEn}
                        </p>
                        <p
                          className={`mt-0.5 font-khmer text-sm leading-loose ${styles.noteText}`}
                        >
                          {a.noteKh}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* ── Encouragement footer ─────────────────────────────────── */}
        <div className="mt-12 max-w-3xl mx-auto rounded-3xl bg-white/80 border-4 border-amber-200 p-6 sm:p-8 shadow-md text-center">
          <Sparkles
            className="w-8 h-8 mx-auto text-amber-500"
            aria-hidden="true"
          />
          <h2 className="mt-3 font-display font-black text-2xl sm:text-3xl text-slate-900">
            {kh ? "អ្នកធ្វើបានល្អណាស់!" : "You're doing great!"}
          </h2>
          <p
            className={`mt-1 text-base text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh ? "You're doing great!" : "អ្នកធ្វើបានល្អណាស់!"}
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            {kh
              ? "ព្យាយាមនិយាយពាក្យនីមួយៗ ៣ ដង រួចនិយាយឱ្យឪពុកម្ដាយ ឬមិត្តភ័ក្ដិស្ដាប់!"
              : "Try saying each word 3 times — then teach them to a parent or a friend!"}
          </p>
          <p
            className={`mt-2 text-sm text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh
              ? "Try saying each word 3 times — then teach them to a parent or a friend!"
              : "ព្យាយាមនិយាយពាក្យនីមួយៗ ៣ ដង រួចនិយាយឱ្យឪពុកម្ដាយ ឬមិត្តភ័ក្ដិស្ដាប់!"}
          </p>
        </div>
      </main>
    </div>
  );
}
