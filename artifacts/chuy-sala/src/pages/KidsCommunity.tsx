import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  Handshake,
  Building2,
  Users,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * MY COMMUNITY — Places & People
 * សហគមន៍របស់ខ្ញុំ៖ ទីកន្លែង និងមនុស្ស
 *
 * Audience: Cambodian primary-school ESL learners
 * Pattern: Reuses the established kids aesthetic (pastel cards, rounded
 *          edges, big emoji, bilingual content, Play-to-hear English).
 *          Two grouped modules with bilingual section headings.
 * ────────────────────────────────────────────────────────────────────── */

type CommunityCard = {
  id: string;
  en: string;
  kh: string;
  emoji: string;
  /** Optional second emoji shown side-by-side (e.g. female + male teacher). */
  emoji2?: string;
  /** Sub-note shown only on cards that need a one-line behaviour hint. */
  subEn?: string;
  subKh?: string;
  /** Pastel gradient for the card surface (Tailwind). */
  palette: string;
  /** Border + Play-button accent name (enumerated below). */
  accent: string;
};

type CommunityModule = {
  id: "places" | "helpers";
  testid: string;
  gridTestid: string;
  headingId: string;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconAccent: string; // Tailwind classes for the heading icon chip
  cards: CommunityCard[];
};

const MODULES: CommunityModule[] = [
  {
    id: "places",
    testid: "section-places",
    gridTestid: "grid-places",
    headingId: "heading-places",
    titleEn: "Places in My Village",
    titleKh: "ទីកន្លែងក្នុងភូមិរបស់ខ្ញុំ",
    subtitleEn: "The buildings and spaces you visit every week.",
    subtitleKh: "អគារ និងទីកន្លែងដែលអ្នកទៅរៀងរាល់សប្ដាហ៍។",
    icon: Building2,
    iconAccent: "text-emerald-600 bg-emerald-100 border-emerald-200",
    cards: [
      { id: "school",   en: "School",              kh: "សាលារៀន",          emoji: "🏫", palette: "from-blue-100 via-sky-100 to-indigo-100",     accent: "blue"   },
      { id: "market",   en: "Market",              kh: "ផ្សារ",            emoji: "🛒", palette: "from-orange-100 via-amber-100 to-yellow-100", accent: "orange" },
      { id: "farm",     en: "Farm / Rice Field",   kh: "កសិដ្ឋាន / វាលស្រែ", emoji: "🌾", palette: "from-yellow-100 via-lime-100 to-green-100",   accent: "yellow" },
      { id: "pagoda",   en: "Pagoda / Temple",     kh: "វត្ត",             emoji: "🛕", palette: "from-amber-100 via-orange-100 to-rose-100",   accent: "amber"  },
      { id: "hospital", en: "Hospital / Clinic",   kh: "មន្ទីរពេទ្យ / គ្លីនិក", emoji: "🏥", palette: "from-rose-100 via-red-100 to-pink-100",       accent: "red"    },
    ],
  },
  {
    id: "helpers",
    testid: "section-helpers",
    gridTestid: "grid-helpers",
    headingId: "heading-helpers",
    titleEn: "Community Helpers",
    titleKh: "អ្នកជួយសហគមន៍",
    subtitleEn: "The people who care for our village.",
    subtitleKh: "មនុស្សដែលថែរក្សាភូមិរបស់យើង។",
    icon: Users,
    iconAccent: "text-violet-600 bg-violet-100 border-violet-200",
    cards: [
      {
        id: "teacher",
        en: "Teacher",
        kh: "គ្រូបង្រៀន",
        emoji: "👩‍🏫",
        emoji2: "👨‍🏫",
        subEn: "They help us learn!",
        subKh: "ពួកគេជួយយើងឱ្យរៀន!",
        palette: "from-sky-100 via-blue-100 to-indigo-100",
        accent: "blue",
      },
      {
        id: "farmer",
        en: "Farmer",
        kh: "កសិករ",
        emoji: "🧑‍🌾",
        subEn: "They grow our food!",
        subKh: "ពួកគេដាំអាហាររបស់យើង!",
        palette: "from-lime-100 via-green-100 to-emerald-100",
        accent: "green",
      },
      {
        id: "doctor",
        en: "Doctor",
        kh: "គ្រូពេទ្យ",
        emoji: "👩‍⚕️",
        emoji2: "👨‍⚕️",
        subEn: "They keep us healthy!",
        subKh: "ពួកគេថែរក្សាសុខភាពយើង!",
        palette: "from-rose-100 via-red-100 to-pink-100",
        accent: "red",
      },
      {
        id: "monk",
        en: "Monk",
        kh: "ព្រះសង្ឃ",
        emoji: "🧘",
        subEn: "They teach us peace!",
        subKh: "ពួកគាត់បង្រៀនយើងពីសន្តិភាព!",
        palette: "from-amber-100 via-orange-100 to-yellow-100",
        accent: "amber",
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
  blue:   { border: "border-blue-300",   ring: "focus-visible:ring-blue-400",   play: "bg-blue-500 hover:bg-blue-600 text-white"     },
  orange: { border: "border-orange-300", ring: "focus-visible:ring-orange-400", play: "bg-orange-500 hover:bg-orange-600 text-white" },
  yellow: { border: "border-yellow-300", ring: "focus-visible:ring-yellow-400", play: "bg-yellow-500 hover:bg-yellow-600 text-white" },
  amber:  { border: "border-amber-300",  ring: "focus-visible:ring-amber-400",  play: "bg-amber-500 hover:bg-amber-600 text-white"   },
  red:    { border: "border-red-300",    ring: "focus-visible:ring-red-400",    play: "bg-red-500 hover:bg-red-600 text-white"       },
  green:  { border: "border-green-300",  ring: "focus-visible:ring-green-400",  play: "bg-green-500 hover:bg-green-600 text-white"   },
};

/* ────────────────────────────────────────────────────────────────────── */

type CommunityModuleProps = {
  module: CommunityModule;
  kh: boolean;
  speakingId: string | null;
  onPlay: (card: CommunityCard) => void;
};

function CommunityModuleSection({
  module: m,
  kh,
  speakingId,
  onPlay,
}: CommunityModuleProps) {
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
              {/* Big central emoji — pair if a second is provided. */}
              <div
                className="text-7xl sm:text-8xl leading-none select-none flex items-end gap-1"
                aria-hidden="true"
              >
                <span>{c.emoji}</span>
                {c.emoji2 && <span>{c.emoji2}</span>}
              </div>

              {/* English name (bold) */}
              <div className="mt-3 font-display font-black text-2xl sm:text-3xl text-slate-900">
                {c.en}
              </div>

              {/* Khmer translation */}
              <div className="mt-1 font-khmer text-base sm:text-lg text-slate-700 leading-loose">
                {c.kh}
              </div>

              {/* Optional sub-note (Community Helpers) */}
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

export default function KidsCommunity() {
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

  function playCard(c: CommunityCard) {
    setSpeakingId(c.id);
    const result = speakText(c.en, "en-US", {
      onEnd: () => setSpeakingId((cur) => (cur === c.id ? null : cur)),
      onError: () => setSpeakingId((cur) => (cur === c.id ? null : cur)),
    });
    if (!result.ok) setSpeakingId(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-violet-50 pb-16">
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
          <Handshake className="w-4 h-4" aria-hidden="true" />
          <span>{kh ? "សម្រាប់កុមារ · សហគមន៍" : "FOR KIDS · COMMUNITY"}</span>
        </div>

        <h1 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-900">
          {kh ? (
            <span className="font-khmer leading-snug">សហគមន៍របស់ខ្ញុំ</span>
          ) : (
            <>
              My{" "}
              <span className="bg-gradient-to-r from-amber-500 via-emerald-500 to-violet-500 bg-clip-text text-transparent">
                Community
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
          {kh ? "My Community" : "សហគមន៍របស់ខ្ញុំ"}
        </p>

        <p className="mt-2 text-lg sm:text-xl font-display font-bold text-slate-700">
          {kh ? "ទីកន្លែង និងមនុស្ស" : "Places & People"}
        </p>
        <p
          className={`text-sm text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh ? "Places & People" : "ទីកន្លែង និងមនុស្ស"}
        </p>

        <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-700">
          {kh
            ? "ស្គាល់ទីកន្លែង និងមនុស្សដែលធ្វើឱ្យភូមិរបស់អ្នកក្លាយជាផ្ទះ។ ប៉ះប៊ូតុង ស្ដាប់ ដើម្បីលឺពាក្យជាភាសាអង់គ្លេស!"
            : "Meet the places and people who make your village feel like home. Tap Play to hear each word in English!"}
        </p>
        <p
          className={`mt-2 max-w-2xl text-sm text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh
            ? "Meet the places and people who make your village feel like home. Tap Play to hear each word in English!"
            : "ស្គាល់ទីកន្លែង និងមនុស្សដែលធ្វើឱ្យភូមិរបស់អ្នកក្លាយជាផ្ទះ។ ប៉ះប៊ូតុង ស្ដាប់ ដើម្បីលឺពាក្យជាភាសាអង់គ្លេស!"}
        </p>
      </header>

      {/* ── Modules ──────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        {MODULES.map((m) => (
          <CommunityModuleSection
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
            {kh
              ? "យើងទាំងអស់គ្នាជួយគ្នាក្នុងសហគមន៍!"
              : "We all help each other in our community!"}
          </h2>
          <p
            className={`mt-1 text-base text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh
              ? "We all help each other in our community!"
              : "យើងទាំងអស់គ្នាជួយគ្នាក្នុងសហគមន៍!"}
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            {kh
              ? "ថ្ងៃនេះ សូមអរគុណដល់នរណាម្នាក់នៅភូមិរបស់អ្នកសម្រាប់ការងារដ៏ល្អរបស់ពួកគេ!"
              : "Today, say thank you to someone in your village for the great work they do!"}
          </p>
          <p
            className={`mt-2 text-sm text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh
              ? "Today, say thank you to someone in your village for the great work they do!"
              : "ថ្ងៃនេះ សូមអរគុណដល់នរណាម្នាក់នៅភូមិរបស់អ្នកសម្រាប់ការងារដ៏ល្អរបស់ពួកគេ!"}
          </p>
        </div>
      </main>
    </div>
  );
}
