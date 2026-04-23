import { useState } from "react";
import {
  Volume2, Heart, Home, Users,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * Family & Relatives — bilingual ESL vocabulary module.
 * Each card shows the formal English word, the informal/everyday word,
 * and the Khmer translation. The 🔊 button reuses the native Web Speech
 * API helper (forced to en-US) and pronounces both forms: "Mother. Mom."
 * ────────────────────────────────────────────────────────────────────── */

type FamilyCard = {
  id: string;
  formalEn: string;
  /** Informal/everyday English form. May be undefined for words that
   *  only have one common form (e.g. Cousin). */
  informalEn?: string;
  /** Khmer translation — may include both formal and informal Khmer
   *  forms separated by "/" or "ឬ". */
  kh: string;
  /** Universally readable emoji icon as the visual cue. */
  emoji: string;
  /** Tone color for the card accent. */
  tone: "amber" | "orange" | "yellow" | "rose";
};

const IMMEDIATE: FamilyCard[] = [
  { id: "mother",      formalEn: "Mother",      informalEn: "Mom",     kh: "ម្ដាយ / ម៉ាក់", emoji: "👩",   tone: "rose"   },
  { id: "father",      formalEn: "Father",      informalEn: "Dad",     kh: "ឪពុក / ប៉ា",   emoji: "👨",   tone: "amber"  },
  { id: "grandmother", formalEn: "Grandmother", informalEn: "Grandma", kh: "ជីដូន / យាយ",  emoji: "👵",   tone: "orange" },
  { id: "grandfather", formalEn: "Grandfather", informalEn: "Grandpa", kh: "ជីតា / តា",   emoji: "👴",   tone: "yellow" },
  { id: "brother",     formalEn: "Brother",                            kh: "បងប្រុស ឬ ប្អូនប្រុស", emoji: "👦",   tone: "amber"  },
  { id: "sister",      formalEn: "Sister",                             kh: "បងស្រី ឬ ប្អូនស្រី",  emoji: "👧",   tone: "rose"   },
];

const EXTENDED: FamilyCard[] = [
  { id: "aunt",   formalEn: "Aunt",   kh: "មីង ឬ អ៊ុំស្រី",       emoji: "🧕", tone: "orange" },
  { id: "uncle",  formalEn: "Uncle",  kh: "ពូ ឬ អ៊ុំប្រុស",       emoji: "🧔", tone: "yellow" },
  { id: "cousin", formalEn: "Cousin", kh: "បងប្អូនជីដូនមួយ",      emoji: "🧑‍🤝‍🧑", tone: "amber"  },
];

/* Tone palette — kept literal so Tailwind JIT picks them up. */
const TONE: Record<FamilyCard["tone"], {
  card: string; ring: string; chip: string; chipText: string; speakBtn: string;
}> = {
  amber:  { card: "from-amber-50 to-orange-50 border-amber-200",   ring: "ring-amber-300",   chip: "bg-amber-100",   chipText: "text-amber-800",   speakBtn: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/40" },
  orange: { card: "from-orange-50 to-amber-50 border-orange-200",  ring: "ring-orange-300",  chip: "bg-orange-100",  chipText: "text-orange-800",  speakBtn: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/40" },
  yellow: { card: "from-yellow-50 to-amber-50 border-yellow-200",  ring: "ring-yellow-300",  chip: "bg-yellow-100",  chipText: "text-yellow-800",  speakBtn: "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/40" },
  rose:   { card: "from-rose-50 to-amber-50 border-rose-200",      ring: "ring-rose-300",    chip: "bg-rose-100",    chipText: "text-rose-800",    speakBtn: "bg-rose-500 hover:bg-rose-600 shadow-rose-500/40" },
};

export function FamilyVocabularyModule() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      data-testid="family-vocabulary"
      aria-labelledby="family-vocabulary-heading"
      className="relative overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50/60 to-yellow-50 shadow-[0_10px_40px_-15px_rgba(180,120,40,0.30)] p-6 sm:p-8"
    >
      {/* Soft warmth glows */}
      <div className="pointer-events-none absolute -top-20 -right-16 w-64 h-64 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 w-64 h-64 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-7 sm:mb-9">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 mb-3 shadow-sm">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-rose-600" fill="currentColor" />
          </div>
          <div className={`text-[11px] font-mono uppercase tracking-[0.25em] text-amber-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "វាក្យសព្ទ" : "Vocabulary Module"}
          </div>
          <h2
            id="family-vocabulary-heading"
            className={`font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}
          >
            {kh
              ? "គ្រួសារ និងសាច់ញាតិ៖ មនុស្សដែលយើងស្រលាញ់"
              : "Family & Relatives: The People We Love"}
          </h2>
          <p className={`mt-2 max-w-2xl mx-auto text-sm sm:text-base text-slate-700 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "ស្វែងយល់ពាក្យអង់គ្លេសសម្រាប់ហៅសមាជិកគ្រួសារ — ទាំងទម្រង់ផ្លូវការ និងទម្រង់ប្រើប្រចាំថ្ងៃ។ ចុចលើនិមិត្តសញ្ញា 🔊 ដើម្បីស្តាប់ការបញ្ចេញសំឡេង។"
              : "Learn the English words for family members — both the formal and the everyday forms. Tap the 🔊 icon on any card to hear them spoken aloud."}
          </p>
        </div>

        {/* Section 1 — Immediate Family */}
        <SectionHeader
          icon={Home}
          en="Immediate Family"
          kh="គ្រួសារជិតស្និទ្ធ"
          isKh={kh}
          testId="section-immediate"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4 mb-8">
          {IMMEDIATE.map((c) => (
            <FamilyCardView key={c.id} card={c} kh={kh} />
          ))}
        </div>

        {/* Section 2 — Extended Family */}
        <SectionHeader
          icon={Users}
          en="Extended Family"
          kh="សាច់ញាតិ"
          isKh={kh}
          testId="section-extended"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4">
          {EXTENDED.map((c) => (
            <FamilyCardView key={c.id} card={c} kh={kh} />
          ))}
        </div>

        {/* Footer tip */}
        <p className={`mt-7 text-center text-xs text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "💡 គន្លឹះ៖ ទម្រង់ផ្លូវការ (Mother) ប្រើនៅក្នុងការសរសេរ ឬកាលៈទេសៈជាផ្លូវការ។ ទម្រង់ប្រចាំថ្ងៃ (Mom) ប្រើនៅផ្ទះ និងជាមួយមិត្តភក្តិ។"
            : "💡 Tip: The formal form (Mother) is used in writing or formal situations. The everyday form (Mom) is used at home and with friends."}
        </p>
      </div>
    </section>
  );
}

/* ─── Subcomponents ──────────────────────────────────────────────── */

function SectionHeader({
  icon: Icon, en, kh, isKh, testId,
}: { icon: React.ComponentType<{ className?: string }>; en: string; kh: string; isKh: boolean; testId: string }) {
  return (
    <div className="flex items-center gap-3" data-testid={testId}>
      <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-amber-300 shadow-sm">
        <Icon className="w-5 h-5 text-amber-700" />
      </div>
      <div>
        <h3 className={`text-lg sm:text-xl font-bold text-slate-900 ${isKh ? "font-khmer leading-snug" : ""}`}>
          {isKh ? kh : en}
        </h3>
        <div className={`text-[11px] font-mono uppercase tracking-widest text-amber-700/80 ${isKh ? "hidden" : ""}`}>
          {kh}
        </div>
      </div>
    </div>
  );
}

function FamilyCardView({ card, kh }: { card: FamilyCard; kh: boolean }) {
  const tone = TONE[card.tone];
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (speaking) return;
    // Pronounce formal first, brief pause, then informal: "Mother. Mom."
    const phrase = card.informalEn
      ? `${card.formalEn}. ${card.informalEn}.`
      : `${card.formalEn}.`;
    setSpeaking(true);
    const result = speakText(phrase, "en-US", {
      onEnd:   () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
    if (!result.ok) setSpeaking(false);
  };

  return (
    <article
      data-testid={`family-card-${card.id}`}
      className={`group relative bg-gradient-to-br ${tone.card} border-2 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition ${speaking ? `ring-4 ${tone.ring}` : ""}`}
    >
      {/* Visual icon */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="text-5xl sm:text-6xl leading-none drop-shadow-sm" aria-hidden>
          {card.emoji}
        </div>

        {/* Listen button */}
        <button
          type="button"
          onClick={handleSpeak}
          data-testid={`btn-listen-${card.id}`}
          data-speaking={speaking ? "true" : "false"}
          aria-label={
            kh
              ? `ស្តាប់ការបញ្ចេញសំឡេង ${card.formalEn}${card.informalEn ? " និង " + card.informalEn : ""}`
              : `Listen to ${card.formalEn}${card.informalEn ? " and " + card.informalEn : ""}`
          }
          className={`shrink-0 inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white shadow-md transition active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 ${tone.speakBtn} ${speaking ? "animate-pulse" : ""}`}
        >
          <span className="text-xl sm:text-2xl leading-none" aria-hidden>🔊</span>
          <Volume2 className="sr-only" />
        </button>
      </div>

      {/* Words */}
      <div className="space-y-1.5">
        {/* Formal English */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-tight">
            {card.formalEn}
          </span>
          {card.informalEn && (
            <>
              <span className="text-slate-400 text-xl font-light">/</span>
              <span className="text-2xl sm:text-3xl font-display font-bold text-slate-700 leading-tight">
                {card.informalEn}
              </span>
            </>
          )}
        </div>

        {/* Formal vs informal mini-labels */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${tone.chip} ${tone.chipText}`}>
            {kh ? "ផ្លូវការ" : "Formal"}
          </span>
          {card.informalEn && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/70 text-slate-700 border border-slate-200">
              {kh ? "ប្រចាំថ្ងៃ" : "Everyday"}
            </span>
          )}
        </div>

        {/* Khmer translation */}
        <div className="pt-2 border-t border-amber-200/60">
          <div className={`text-base sm:text-lg font-khmer text-slate-900 leading-snug`}>
            {card.kh}
          </div>
        </div>

        {/* Speaking pulse indicator */}
        {speaking && (
          <div className="pt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            <span className={kh ? "font-khmer" : ""}>{kh ? "កំពុងនិយាយ..." : "Speaking..."}</span>
          </div>
        )}
      </div>
    </article>
  );
}
