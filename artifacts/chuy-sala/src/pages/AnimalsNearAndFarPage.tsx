import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  Home as HomeIcon,
  Trees,
  PawPrint,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * ANIMALS: NEAR AND FAR
 * សត្វ៖ ជិត និងឆ្ងាយ
 *
 * Audience:  Cambodian kindergarten / lower primary ESL learners
 * Layout:    Two clearly-labelled sections sharing the same pastel,
 *            tap-to-hear card design used by "My Day".
 *              SECTION 1  "At Home & The Farm"  — local, familiar animals
 *              SECTION 2  "In the Wild"          — global wildlife
 * ────────────────────────────────────────────────────────────────────── */

type Animal = {
  id: string;
  en: string;
  kh: string;
  emoji: string;
  /** Pastel gradient for the card surface (Tailwind). */
  palette: string;
  /** Border + Play-button accent name (Tailwind colour family). */
  accent: string;
};

const HOME_ANIMALS: Animal[] = [
  { id: "dog",           en: "Dog",           kh: "ឆ្កែ", emoji: "🐕", palette: "from-amber-100 via-orange-100 to-rose-100",   accent: "amber"   },
  { id: "cat",           en: "Cat",           kh: "ឆ្មា", emoji: "🐈", palette: "from-pink-100 via-rose-100 to-fuchsia-100",   accent: "pink"    },
  { id: "cow",           en: "Cow",           kh: "គោ",   emoji: "🐄", palette: "from-yellow-100 via-amber-100 to-orange-100", accent: "yellow"  },
  { id: "water-buffalo", en: "Water Buffalo", kh: "ក្របី", emoji: "🐃", palette: "from-stone-100 via-amber-100 to-yellow-100",  accent: "stone"   },
  { id: "fish",          en: "Fish",          kh: "ត្រី", emoji: "🐟", palette: "from-cyan-100 via-sky-100 to-blue-100",       accent: "cyan"    },
  { id: "chicken",       en: "Chicken",       kh: "មាន់", emoji: "🐓", palette: "from-red-100 via-rose-100 to-orange-100",     accent: "red"     },
];

const WILD_ANIMALS: Animal[] = [
  { id: "elephant", en: "Elephant", kh: "ដំរី",  emoji: "🐘", palette: "from-slate-100 via-gray-100 to-zinc-100",      accent: "slate"   },
  { id: "lion",     en: "Lion",     kh: "តោ",    emoji: "🦁", palette: "from-amber-100 via-yellow-100 to-orange-100",  accent: "amber"   },
  { id: "monkey",   en: "Monkey",   kh: "ស្វា", emoji: "🐒", palette: "from-orange-100 via-amber-100 to-yellow-100",  accent: "orange"  },
  { id: "bird",     en: "Bird",     kh: "បក្សី", emoji: "🦅", palette: "from-sky-100 via-cyan-100 to-blue-100",        accent: "sky"     },
];

/* ────────────────────────────────────────────────────────────────────── */

/**
 * Map an Animal's accent name → concrete Tailwind classes for the
 * border, the Play button, and the focus ring. Tailwind's JIT cannot
 * detect dynamic class strings, so each combination is enumerated.
 */
const ACCENT_STYLES: Record<
  string,
  { border: string; ring: string; play: string }
> = {
  amber:  { border: "border-amber-300",  ring: "focus-visible:ring-amber-400",  play: "bg-amber-500 hover:bg-amber-600 text-white"  },
  pink:   { border: "border-pink-300",   ring: "focus-visible:ring-pink-400",   play: "bg-pink-500 hover:bg-pink-600 text-white"    },
  yellow: { border: "border-yellow-300", ring: "focus-visible:ring-yellow-400", play: "bg-yellow-500 hover:bg-yellow-600 text-white"},
  stone:  { border: "border-stone-300",  ring: "focus-visible:ring-stone-400",  play: "bg-stone-500 hover:bg-stone-600 text-white"  },
  cyan:   { border: "border-cyan-300",   ring: "focus-visible:ring-cyan-400",   play: "bg-cyan-500 hover:bg-cyan-600 text-white"    },
  red:    { border: "border-red-300",    ring: "focus-visible:ring-red-400",    play: "bg-red-500 hover:bg-red-600 text-white"      },
  slate:  { border: "border-slate-300",  ring: "focus-visible:ring-slate-400",  play: "bg-slate-500 hover:bg-slate-600 text-white"  },
  orange: { border: "border-orange-300", ring: "focus-visible:ring-orange-400", play: "bg-orange-500 hover:bg-orange-600 text-white"},
  sky:    { border: "border-sky-300",    ring: "focus-visible:ring-sky-400",    play: "bg-sky-500 hover:bg-sky-600 text-white"      },
};

/* ────────────────────────────────────────────────────────────────────── */

export default function AnimalsNearAndFarPage() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Stop any in-flight speech when the user navigates away.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function playAnimal(a: Animal) {
    setSpeakingId(a.id);
    const result = speakText(a.en, "en-US", {
      onEnd: () => setSpeakingId((cur) => (cur === a.id ? null : cur)),
      onError: () => setSpeakingId((cur) => (cur === a.id ? null : cur)),
    });
    if (!result.ok) setSpeakingId(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-sky-50 pb-16">
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
          <PawPrint className="w-4 h-4" aria-hidden="true" />
          <span>{kh ? "សម្រាប់កុមារ · សត្វ" : "FOR KIDS · ANIMALS"}</span>
        </div>

        <h1 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-900">
          {kh ? (
            <span className="font-khmer leading-snug">សត្វ៖ ជិត និងឆ្ងាយ</span>
          ) : (
            <>
              Animals:{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-amber-500 to-sky-500 bg-clip-text text-transparent">
                Near &amp; Far
              </span>
            </>
          )}
        </h1>

        {/* Muted opposite-language echo — both languages always visible. */}
        <p
          className={`mt-2 text-base sm:text-lg text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh ? "Animals: Near and Far" : "សត្វ៖ ជិត និងឆ្ងាយ"}
        </p>

        <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-700">
          {kh
            ? "ប៉ះកាតណាមួយ ដើម្បីស្ដាប់ឈ្មោះសត្វជាភាសាអង់គ្លេស! រៀនអំពីសត្វនៅជុំវិញផ្ទះ និងសត្វនៅតាមព្រៃធម្មជាតិ។"
            : "Tap any card to hear the animal's name in English! Meet the animals around your home, then journey to the wild."}
        </p>
        <p
          className={`mt-2 max-w-2xl text-sm text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh
            ? "Tap any card to hear the animal's name in English! Meet the animals around your home, then journey to the wild."
            : "ប៉ះកាតណាមួយ ដើម្បីស្ដាប់ឈ្មោះសត្វជាភាសាអង់គ្លេស! រៀនអំពីសត្វនៅជុំវិញផ្ទះ និងសត្វនៅតាមព្រៃធម្មជាតិ។"}
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 space-y-14">
        {/* ════════════════════════════════════════════════════════════ */}
        {/*  SECTION 1 — AT HOME & THE FARM                              */}
        {/* ════════════════════════════════════════════════════════════ */}
        <AnimalSection
          id="home"
          icon={HomeIcon}
          accentBg="bg-amber-100"
          accentText="text-amber-700"
          accentBorder="border-amber-300"
          titleEn="At Home & The Farm"
          titleKh="នៅផ្ទះ និងនៅកសិដ្ឋាន"
          subtitleEn="Animals you see every day in your village."
          subtitleKh="សត្វដែលអ្នកឃើញរាល់ថ្ងៃនៅក្នុងភូមិរបស់អ្នក។"
          animals={HOME_ANIMALS}
          kh={kh}
          speakingId={speakingId}
          onPlay={playAnimal}
        />

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  SECTION 2 — IN THE WILD                                     */}
        {/* ════════════════════════════════════════════════════════════ */}
        <AnimalSection
          id="wild"
          icon={Trees}
          accentBg="bg-emerald-100"
          accentText="text-emerald-700"
          accentBorder="border-emerald-300"
          titleEn="In the Wild"
          titleKh="នៅក្នុងព្រៃ"
          subtitleEn="Amazing animals from across the world."
          subtitleKh="សត្វអស្ចារ្យដែលមកពីជុំវិញពិភពលោក។"
          animals={WILD_ANIMALS}
          kh={kh}
          speakingId={speakingId}
          onPlay={playAnimal}
        />

        {/* ── Encouragement footer ─────────────────────────────────── */}
        <div className="mx-auto max-w-3xl rounded-3xl bg-white/80 border-4 border-emerald-200 p-6 sm:p-8 shadow-md text-center">
          <Sparkles
            className="w-8 h-8 mx-auto text-emerald-500"
            aria-hidden="true"
          />
          <h2 className="mt-3 font-display font-black text-2xl sm:text-3xl text-slate-900">
            {kh ? "សត្វជិតខ្លួនយើង សត្វឆ្ងាយឆ្ងាយ!" : "Animals near you, animals far away!"}
          </h2>
          <p
            className={`mt-1 text-base text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh ? "Animals near you, animals far away!" : "សត្វជិតខ្លួនយើង សត្វឆ្ងាយឆ្ងាយ!"}
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            {kh
              ? "ព្យាយាមនិយាយឈ្មោះសត្វនីមួយៗ ៣ ដង រួចបង្រៀនមិត្តភក្តិ​!"
              : "Try saying each animal's name 3 times — then teach a friend!"}
          </p>
          <p
            className={`mt-2 text-sm text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh
              ? "Try saying each animal's name 3 times — then teach a friend!"
              : "ព្យាយាមនិយាយឈ្មោះសត្វនីមួយៗ ៣ ដង រួចបង្រៀនមិត្តភក្តិ​!"}
          </p>
        </div>
      </main>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

function AnimalSection({
  id,
  icon: Icon,
  accentBg,
  accentText,
  accentBorder,
  titleEn,
  titleKh,
  subtitleEn,
  subtitleKh,
  animals,
  kh,
  speakingId,
  onPlay,
}: {
  id: string;
  icon: LucideIcon;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  animals: Animal[];
  kh: boolean;
  speakingId: string | null;
  onPlay: (a: Animal) => void;
}) {
  return (
    <section data-testid={`section-${id}`} aria-labelledby={`heading-${id}`}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${accentBg} border-2 ${accentBorder} shadow-sm`}
        >
          <Icon className={`w-6 h-6 ${accentText}`} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2
            id={`heading-${id}`}
            className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight"
          >
            {kh ? (
              <span className="font-khmer leading-snug">{titleKh}</span>
            ) : (
              titleEn
            )}
          </h2>
          <p
            className={`text-sm sm:text-base text-slate-500 mt-0.5 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh ? titleEn : titleKh}
          </p>
        </div>
      </div>

      {/* Bilingual subtitle line */}
      <p className="text-base text-slate-700 mb-5">
        {kh ? subtitleKh : subtitleEn}
      </p>
      <p
        className={`text-sm text-slate-500 -mt-3 mb-6 ${
          kh ? "" : "font-khmer leading-loose"
        }`}
      >
        {kh ? subtitleEn : subtitleKh}
      </p>

      {/* Card grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        data-testid={`grid-${id}`}
      >
        {animals.map((a) => {
          const styles = ACCENT_STYLES[a.accent];
          const isPlaying = speakingId === a.id;
          return (
            <article
              key={a.id}
              data-testid={`card-${a.id}`}
              className={`group relative rounded-3xl border-4 ${styles.border} bg-gradient-to-br ${a.palette} p-5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col`}
            >
              {/* Big emoji */}
              <div
                className="text-7xl sm:text-8xl text-center leading-none my-2 select-none"
                aria-hidden="true"
              >
                {a.emoji}
              </div>

              {/* English name (bold) */}
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
                onClick={() => onPlay(a)}
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
            </article>
          );
        })}
      </div>
    </section>
  );
}
