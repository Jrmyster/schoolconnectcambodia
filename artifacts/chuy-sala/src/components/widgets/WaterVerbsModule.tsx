import { useState } from "react";
import { Droplets, Volume2, Waves } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * Water Actions: How Liquids Move — bilingual ESL vocabulary module.
 * Nine action verbs that describe how water (and other liquids) behave:
 * spill, drip, leak, pour, overflow, splash, soak, steam, flood.
 * Each card shows English, IPA phonetics, Khmer translation, an English
 * definition with its Khmer counterpart, an aquatic emoji visual cue, and
 * a 🔊 button powered by the browser's native window.speechSynthesis API.
 * Layout collapses to a single vertical column on mobile.
 * ────────────────────────────────────────────────────────────────────── */

type WaterCard = {
  id: string;
  en: string;
  /** IPA pronunciation, e.g. "/spɪl/". */
  ipa: string;
  /** Khmer translation of the verb itself. */
  kh: string;
  /** English definition. */
  defEn: string;
  /** Khmer translation of the definition. */
  defKh: string;
  /** Universally readable emoji icon as the visual cue. */
  emoji: string;
};

const WATER_CARDS: WaterCard[] = [
  {
    id: "spill",
    en: "Spill",
    ipa: "/spɪl/",
    kh: "កំពប់",
    defEn: "To drop liquid by accident.",
    defKh: "ការធ្វើឱ្យជ្រុះវត្ថុរាវដោយចៃដន្យ។",
    emoji: "🥛",
  },
  {
    id: "drip",
    en: "Drip",
    ipa: "/drɪp/",
    kh: "ស្រក់",
    defEn: "To fall in small drops.",
    defKh: "ការធ្លាក់ចុះជាដំណក់តូចៗ។",
    emoji: "🚰",
  },
  {
    id: "leak",
    en: "Leak",
    ipa: "/liːk/",
    kh: "លេច / ជ្រាប",
    defEn: "To let liquid escape slowly through a hole.",
    defKh: "ការបណ្តោយឱ្យវត្ថុរាវជ្រាបចេញយឺតៗតាមប្រហោង។",
    emoji: "💧",
  },
  {
    id: "pour",
    en: "Pour",
    ipa: "/pɔːr/",
    kh: "ចាក់",
    defEn: "To make liquid flow in a steady stream.",
    defKh: "ការធ្វើឱ្យវត្ថុរាវហូរជារបៀបរៀបរយ។",
    emoji: "🫗",
  },
  {
    id: "overflow",
    en: "Overflow",
    ipa: "/ˌoʊ.vɚˈfloʊ/",
    kh: "ហៀរ",
    defEn: "To flow over the edge of a container.",
    defKh: "ការហូរហៀរចេញពីមាត់ធុង។",
    emoji: "🥤",
  },
  {
    id: "splash",
    en: "Splash",
    ipa: "/splæʃ/",
    kh: "ខ្ទាត",
    defEn: "To scatter water in many directions.",
    defKh: "ការធ្វើឱ្យទឹកខ្ទាតទៅគ្រប់ទិសទី។",
    emoji: "💦",
  },
  {
    id: "soak",
    en: "Soak",
    ipa: "/soʊk/",
    kh: "ត្រាំ / ជោក",
    defEn: "To make something completely wet.",
    defKh: "ការធ្វើឱ្យវត្ថុណាមួយសើមជោក។",
    emoji: "🧽",
  },
  {
    id: "steam",
    en: "Steam",
    ipa: "/stiːm/",
    kh: "ចំហាយទឹក",
    defEn: "Hot water vapor in the air.",
    defKh: "ចំហាយទឹកក្តៅនៅក្នុងខ្យល់។",
    emoji: "☕",
  },
  {
    id: "flood",
    en: "Flood",
    ipa: "/flʌd/",
    kh: "ទឹកជំនន់ / លិចលង់",
    defEn: "To cover an area with a large amount of water.",
    defKh: "ការគ្របដណ្តប់តំបន់ណាមួយដោយបរិមាណទឹកយ៉ាងច្រើន។",
    emoji: "🌧️",
  },
];

export function WaterVerbsModule() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      id="water-vocabulary"
      data-testid="water-vocabulary"
      aria-labelledby="water-vocabulary-heading"
      className="relative overflow-hidden rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-white via-sky-50 to-blue-50 shadow-[0_10px_40px_-15px_rgba(14,116,144,0.30)] p-6 sm:p-8 scroll-mt-20"
    >
      {/* Soft aquatic glows */}
      <div className="pointer-events-none absolute -top-24 -right-16 w-64 h-64 rounded-full bg-sky-200/50 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-28 -left-16 w-72 h-72 rounded-full bg-blue-200/40 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full bg-cyan-100/30 blur-3xl" aria-hidden />

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-7 sm:mb-9">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-sky-300 mb-3 shadow-sm">
            <Droplets className="w-6 h-6 sm:w-7 sm:h-7 text-sky-700" />
          </div>
          <div className={`text-[11px] font-mono uppercase tracking-[0.25em] text-sky-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "វាក្យសព្ទទឹក" : "Water Vocabulary"}
          </div>
          <h2
            id="water-vocabulary-heading"
            className={`font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}
          >
            {kh
              ? "សកម្មភាពទឹក៖ របៀបដែលវត្ថុរាវផ្លាស់ទី"
              : "Water Actions: How Liquids Move"}
            {kh && (
              <span className="ml-2 text-base text-slate-600 font-sans font-normal">
                (Water Actions)
              </span>
            )}
          </h2>
          <p className={`mt-2 max-w-2xl mx-auto text-sm sm:text-base text-slate-700 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "រៀនកិរិយាសព្ទចំនួន ៩ ដែលប្រាប់យើងពីរបៀបដែលទឹក និងវត្ថុរាវផ្សេងៗផ្លាស់ទី។ ចុចលើនិមិត្តសញ្ញា 🔊 នៅលើកាតនីមួយៗដើម្បីស្តាប់ការបញ្ចេញសំឡេងជាភាសាអង់គ្លេស។"
              : "Learn nine action verbs that describe how water and other liquids move. Tap the 🔊 button on any card to hear the English pronunciation."}
          </p>
        </div>

        {/* 3×3 grid of action cards — collapses to 1 column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {WATER_CARDS.map((card) => (
            <WaterCardView key={card.id} card={card} kh={kh} />
          ))}
        </div>

        {/* Footer tip */}
        <p className={`mt-7 text-center text-xs text-slate-600 max-w-2xl mx-auto ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "💡 គន្លឹះ៖ កិរិយាសព្ទទាំងនេះភាគច្រើនអាចជាកិរិយាសព្ទ ឬនាមក៏បាន — ឧទាហរណ៍ \"a leak\" (នាម) និង \"to leak\" (កិរិយាសព្ទ)។"
            : '💡 Tip: Most of these words work as both verbs and nouns — for example, "a leak" (noun) and "to leak" (verb).'}
        </p>
      </div>
    </section>
  );
}

/* ─── Subcomponent ───────────────────────────────────────────────── */

function WaterCardView({ card, kh }: { card: WaterCard; kh: boolean }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (speaking) return;
    setSpeaking(true);
    const result = speakText(card.en, "en-US", {
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
    if (!result.ok) setSpeaking(false);
  };

  return (
    <article
      data-testid={`water-card-${card.id}`}
      className={`group relative bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-sky-400 transition-all duration-200 flex flex-col ${
        speaking ? "ring-4 ring-sky-300 border-sky-500" : ""
      }`}
    >
      {/* Top row — emoji + speak button */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="text-5xl sm:text-6xl leading-none drop-shadow-sm" aria-hidden>
          {card.emoji}
        </div>

        <button
          type="button"
          onClick={handleSpeak}
          data-testid={`btn-listen-${card.id}`}
          data-speaking={speaking ? "true" : "false"}
          aria-label={kh ? `ស្តាប់ការបញ្ចេញសំឡេង ${card.en}` : `Listen to ${card.en}`}
          className={`shrink-0 inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white shadow-md transition active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 bg-sky-600 hover:bg-sky-700 shadow-sky-500/40 ${
            speaking ? "animate-pulse" : ""
          }`}
        >
          <span className="text-xl sm:text-2xl leading-none" aria-hidden>
            🔊
          </span>
          <Volume2 className="sr-only" />
        </button>
      </div>

      {/* English word + phonetics */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-tight">
          {card.en}
        </span>
        <span className="text-sm sm:text-base font-mono text-sky-700/90">{card.ipa}</span>
      </div>

      {/* Khmer translation chip */}
      <div className="mt-2 flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200">
          {kh ? "ខ្មែរ" : "Khmer"}
        </span>
        <span className="text-base sm:text-lg font-khmer text-slate-900 leading-snug">
          {card.kh}
        </span>
      </div>

      {/* Definitions — bilingual stacked, separated by a hairline */}
      <div className="mt-3 pt-3 border-t border-sky-100 space-y-2 flex-1">
        <p className="text-sm sm:text-[15px] text-slate-800 leading-relaxed">
          <span className="font-mono text-[10px] uppercase tracking-widest text-sky-600 mr-1.5">EN</span>
          {card.defEn}
        </p>
        <p className="text-sm sm:text-[15px] font-khmer text-slate-700 leading-loose">
          <span className="font-mono text-[10px] uppercase tracking-widest text-sky-600 mr-1.5 font-sans">KH</span>
          {card.defKh}
        </p>
      </div>

      {/* Speaking pulse indicator */}
      {speaking && (
        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-sky-700">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-75" />
            <span className="relative w-2 h-2 rounded-full bg-sky-500" />
          </span>
          <span className={kh ? "font-khmer" : ""}>
            {kh ? "កំពុងនិយាយ..." : "Speaking..."}
          </span>
        </div>
      )}

      {/* Subtle wave decoration in corner */}
      <Waves
        aria-hidden
        className="absolute bottom-2 right-2 w-5 h-5 text-sky-200/70 group-hover:text-sky-300 transition-colors"
      />
    </article>
  );
}
