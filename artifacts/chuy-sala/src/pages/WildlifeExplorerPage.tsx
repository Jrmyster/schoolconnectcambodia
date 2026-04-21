import { useEffect, useMemo, useState } from "react";
import { Volume2, Trees, Sparkles } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import {
  speakText,
  loadVoicesAsync,
  type SpeakLang,
} from "@/lib/speech";

type Animal = {
  key: string;
  nameEn: string;
  nameKh: string;
  emoji: string;
  imageUrl?: string;
  cardTint: {
    bg: string;
    border: string;
    accent: string;
  };
};

const ANIMALS: Animal[] = [
  {
    key: "elephant",
    nameEn: "Elephant",
    nameKh: "ដំរី",
    emoji: "🐘",
    cardTint: {
      bg: "bg-emerald-50",
      border: "border-emerald-300",
      accent: "bg-emerald-100",
    },
  },
  {
    key: "tiger",
    nameEn: "Tiger",
    nameKh: "ខ្លាធំ",
    emoji: "🐅",
    cardTint: {
      bg: "bg-amber-50",
      border: "border-amber-300",
      accent: "bg-amber-100",
    },
  },
  {
    key: "monkey",
    nameEn: "Monkey",
    nameKh: "ស្វា",
    emoji: "🐒",
    cardTint: {
      bg: "bg-lime-50",
      border: "border-lime-300",
      accent: "bg-lime-100",
    },
  },
  {
    key: "bear",
    nameEn: "Bear",
    nameKh: "ខ្លាឃ្មុំ",
    emoji: "🐻",
    cardTint: {
      bg: "bg-stone-50",
      border: "border-stone-300",
      accent: "bg-stone-100",
    },
  },
  {
    key: "crocodile",
    nameEn: "Crocodile",
    nameKh: "ក្រពើ",
    emoji: "🐊",
    cardTint: {
      bg: "bg-green-50",
      border: "border-green-400",
      accent: "bg-green-100",
    },
  },
  {
    key: "snake",
    nameEn: "Snake",
    nameKh: "ពស់",
    emoji: "🐍",
    cardTint: {
      bg: "bg-teal-50",
      border: "border-teal-300",
      accent: "bg-teal-100",
    },
  },
  {
    key: "lion",
    nameEn: "Lion",
    nameKh: "តោ",
    emoji: "🦁",
    cardTint: {
      bg: "bg-yellow-50",
      border: "border-yellow-400",
      accent: "bg-yellow-100",
    },
  },
  {
    key: "giraffe",
    nameEn: "Giraffe",
    nameKh: "សត្វកវែង",
    emoji: "🦒",
    cardTint: {
      bg: "bg-orange-50",
      border: "border-orange-300",
      accent: "bg-orange-100",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Inline SVG flags — emoji flags don't render on Windows or older Android.
// Tiny (24×16) and decorative; aria-hidden because they're paired with text.
// ─────────────────────────────────────────────────────────────────────────────

function FlagUS({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`${className} rounded-sm overflow-hidden shadow-sm`}
      aria-hidden="true"
      role="img"
    >
      <rect width="24" height="16" fill="#B22234" />
      <rect y="1.7" width="24" height="1.2" fill="white" />
      <rect y="4.1" width="24" height="1.2" fill="white" />
      <rect y="6.5" width="24" height="1.2" fill="white" />
      <rect y="8.9" width="24" height="1.2" fill="white" />
      <rect y="11.3" width="24" height="1.2" fill="white" />
      <rect y="13.7" width="24" height="1.2" fill="white" />
      <rect width="10" height="8.6" fill="#3C3B6E" />
    </svg>
  );
}

function FlagKH({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`${className} rounded-sm overflow-hidden shadow-sm`}
      aria-hidden="true"
      role="img"
    >
      <rect width="24" height="4" fill="#032EA1" />
      <rect y="4" width="24" height="8" fill="#E00025" />
      <rect y="12" width="24" height="4" fill="#032EA1" />
      {/* Stylised Angkor Wat silhouette — three towers on a base. */}
      <g fill="white">
        <rect x="9" y="10.5" width="6" height="0.7" />
        <rect x="11.6" y="6.3" width="0.8" height="4.2" />
        <rect x="11.2" y="5.6" width="1.6" height="0.7" />
        <rect x="9.2" y="7.2" width="0.7" height="3.3" />
        <rect x="14.1" y="7.2" width="0.7" height="3.3" />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function WildlifeExplorerPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  // Toast state for the "Audio not supported" fallback.
  const [toast, setToast] = useState<string | null>(null);

  // Track whether a Khmer voice is installed on this device.
  // Defaults to `true` (optimistic) until the async voice list resolves —
  // this avoids flashing a "disabled" state on first paint for users whose
  // browsers DO have a Khmer voice but populate the list lazily.
  const [khmerVoiceReady, setKhmerVoiceReady] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    loadVoicesAsync().then((voices) => {
      if (cancelled) return;
      const hasKhmer = voices.some((v) => /^km/i.test(v.lang));
      setKhmerVoiceReady(hasKhmer);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-dismiss the toast after 2.5s.
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(t);
  }, [toast]);

  function handleSpeak(animal: Animal, lang: SpeakLang) {
    // For Khmer with no installed voice, short-circuit and show the toast
    // immediately. We intentionally route through here (instead of using the
    // native `disabled` attribute) so touch users — who have no hover and
    // therefore can't see the title-attribute tooltip — still get clear,
    // discoverable feedback when they tap the button.
    if (lang === "km-KH" && !khmerVoiceReady) {
      setToast(
        isKh
          ? "សំឡេងភាសាខ្មែរមិនទាន់មាននៅលើកម្មវិធីរុករកនេះទេ"
          : "Khmer audio not supported on this browser",
      );
      return;
    }
    const text = lang === "en-US" ? animal.nameEn : animal.nameKh;
    const result = speakText(text, lang);
    if (!result.ok) {
      setToast(
        isKh
          ? "សំឡេងមិនអាចប្រើបានទេនៅលើកម្មវិធីរុករកនេះ"
          : "Audio not supported on this browser",
      );
    }
  }

  // Bilingual copy for the page chrome.
  const t = useMemo(
    () => ({
      eyebrowEn: "Study Center · Vocabulary",
      eyebrowKh: "មជ្ឈមណ្ឌលសិក្សា · វាក្យសព្ទ",
      titleEn: "Wildlife Explorer: Zoo Animals",
      titleKh: "ការរុករកសត្វព្រៃ៖ សត្វសួនសត្វ",
      leadEn:
        "Tap the flag buttons to hear each animal's name out loud — in English or Khmer. Practice a few cards a day and the words will stick.",
      leadKh:
        "ចុចលើប៊ូតុងទង់ជាតិដើម្បីស្ដាប់ឈ្មោះសត្វនីមួយៗ — ជាភាសាអង់គ្លេស ឬខ្មែរ។ អនុវត្តពីរបីកាតក្នុងមួយថ្ងៃ ហើយពាក្យនឹងចាំ។",
      enLabel: "EN",
      khLabel: "ខ្មែរ",
      khUnsupportedTip: "Audio not supported",
    }),
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-lime-50 to-white">
      {/* Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border-2 border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide shadow-sm"
            data-testid="wildlife-eyebrow"
          >
            <Trees className="w-3.5 h-3.5" />
            <span className={isKh ? "font-khmer" : ""}>
              {isKh ? t.eyebrowKh : t.eyebrowEn}
            </span>
          </div>

          <h1
            className={`mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-emerald-900 leading-tight ${
              isKh ? "font-khmer leading-snug" : ""
            }`}
            data-testid="wildlife-title"
          >
            {isKh ? t.titleKh : t.titleEn}{" "}
            <span aria-hidden="true" className="inline-block ml-1">
              🌿
            </span>
          </h1>

          <p
            className={`mt-3 max-w-2xl text-base sm:text-lg text-emerald-900/80 ${
              isKh ? "font-khmer" : ""
            }`}
          >
            {isKh ? t.leadKh : t.leadEn}
          </p>
        </div>
      </section>

      {/* Flashcard grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 list-none p-0"
            aria-label={
              isKh
                ? "កាតវាក្យសព្ទសត្វសួនសត្វ"
                : "Zoo animal vocabulary cards"
            }
          >
            {ANIMALS.map((animal) => (
              <li key={animal.key}>
                <article
                  className={`group relative rounded-3xl border-2 ${animal.cardTint.border} ${animal.cardTint.bg} overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
                  data-testid={`animal-card-${animal.key}`}
                >
                  {/* Image / emoji placeholder */}
                  <div
                    className={`h-36 sm:h-40 ${animal.cardTint.accent} flex items-center justify-center select-none`}
                  >
                    {animal.imageUrl ? (
                      <img
                        src={animal.imageUrl}
                        alt={animal.nameEn}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className="text-7xl sm:text-8xl drop-shadow-sm transition-transform group-hover:scale-110"
                        role="img"
                        aria-label={animal.nameEn}
                      >
                        {animal.emoji}
                      </span>
                    )}
                  </div>

                  {/* Words + audio buttons */}
                  <div className="p-4 sm:p-5 space-y-3 bg-white/60 backdrop-blur-[2px]">
                    <div className="text-center">
                      <h2
                        className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-900 tracking-tight"
                        data-testid={`animal-en-${animal.key}`}
                      >
                        {animal.nameEn}
                      </h2>
                      <p
                        className="font-khmer text-xl sm:text-2xl text-emerald-800 mt-1"
                        data-testid={`animal-kh-${animal.key}`}
                      >
                        {animal.nameKh}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-1">
                      {/* English audio */}
                      <button
                        type="button"
                        onClick={() => handleSpeak(animal, "en-US")}
                        title={
                          isKh
                            ? "ស្ដាប់ជាភាសាអង់គ្លេស"
                            : "Listen in English"
                        }
                        aria-label={`Play ${animal.nameEn} in English`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-emerald-300 text-emerald-900 text-sm font-bold shadow-sm hover:bg-emerald-50 hover:border-emerald-500 active:scale-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                        data-testid={`play-en-${animal.key}`}
                      >
                        <FlagUS />
                        <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t.enLabel}</span>
                      </button>

                      {/*
                        Khmer audio. We deliberately do NOT use the native
                        `disabled` attribute when no Khmer voice is installed —
                        a disabled button swallows the click and touch users
                        (no hover, no title tooltip) get zero feedback. Instead
                        we keep it clickable, mark it `aria-disabled`, and let
                        `handleSpeak` show a visible toast on tap.
                      */}
                      <button
                        type="button"
                        onClick={() => handleSpeak(animal, "km-KH")}
                        aria-disabled={!khmerVoiceReady}
                        title={
                          khmerVoiceReady
                            ? isKh
                              ? "ស្ដាប់ជាភាសាខ្មែរ"
                              : "Listen in Khmer"
                            : t.khUnsupportedTip
                        }
                        aria-label={
                          khmerVoiceReady
                            ? `Play ${animal.nameEn} in Khmer`
                            : `Khmer audio not supported on this browser for ${animal.nameEn}`
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 text-sm font-bold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                          khmerVoiceReady
                            ? "border-emerald-300 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-500 active:scale-95"
                            : "border-slate-200 text-slate-400 hover:bg-slate-50 active:scale-95"
                        }`}
                        data-testid={`play-kh-${animal.key}`}
                      >
                        <FlagKH />
                        <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span className="font-khmer">{t.khLabel}</span>
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {/* Helper note */}
          <div
            className={`mt-8 max-w-2xl mx-auto text-center text-sm text-emerald-900/70 flex items-center justify-center gap-2 ${
              isKh ? "font-khmer" : ""
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>
              {isKh
                ? "ឆាប់ៗនេះនឹងមានរូបថតពិត និងសត្វថ្មីៗបន្ថែម។"
                : "Real photos and more animals are coming soon."}
            </span>
          </div>
        </div>
      </section>

      {/* "Audio not supported" toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium shadow-lg max-w-[90vw] text-center"
          data-testid="audio-toast"
        >
          <span className={isKh ? "font-khmer" : ""}>{toast}</span>
        </div>
      )}
    </div>
  );
}
