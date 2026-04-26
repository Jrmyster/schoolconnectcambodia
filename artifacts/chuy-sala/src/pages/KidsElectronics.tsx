import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  Lightbulb,
  BatteryCharging,
  Cable,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import { speakText } from "@/lib/speech";

/* ──────────────────────────────────────────────────────────────────────
 * POWER & LIGHT — Basic Electronics
 * ថាមពល និងពន្លឺ៖ អេឡិចត្រូនិកមូលដ្ឋាន
 *
 * Audience: Cambodian primary-school ESL learners
 * Pattern: Reuses the established kids aesthetic (pastel cards, rounded
 *          edges, big emoji, bilingual content, Play-to-hear English).
 *          Two grouped modules with bilingual section headings.
 * ────────────────────────────────────────────────────────────────────── */

type ElectronicsCard = {
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

type ElectronicsModule = {
  id: "power" | "circuit";
  testid: string;
  gridTestid: string;
  headingId: string;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconAccent: string;
  cards: ElectronicsCard[];
};

const MODULES: ElectronicsModule[] = [
  {
    id: "power",
    testid: "section-power",
    gridTestid: "grid-power",
    headingId: "heading-power",
    titleEn: "Where Power Lives",
    titleKh: "ប្រភពថាមពល",
    subtitleEn: "The places electricity comes from before it reaches us.",
    subtitleKh: "កន្លែងដែលអគ្គិសនីមកពី មុនពេលវាមកដល់យើង។",
    icon: BatteryCharging,
    iconAccent: "text-amber-600 bg-amber-100 border-amber-200",
    cards: [
      {
        id: "battery",
        en: "Battery",
        kh: "ថ្ម",
        emoji: "🔋",
        subEn: "It stores the energy!",
        subKh: "វាផ្ទុកថាមពល!",
        palette: "from-green-100 via-lime-100 to-emerald-100",
        accent: "green",
      },
      {
        id: "solar",
        en: "Solar Panel",
        kh: "ផ្ទាំងសូឡា",
        emoji: "☀️",
        subEn: "Power from the sun!",
        subKh: "ថាមពលពីព្រះអាទិត្យ!",
        palette: "from-yellow-100 via-amber-100 to-orange-100",
        accent: "yellow",
      },
      {
        id: "plug",
        en: "Plug",
        kh: "ព្រីភ្លើង",
        emoji: "🔌",
        palette: "from-blue-100 via-sky-100 to-indigo-100",
        accent: "blue",
      },
    ],
  },
  {
    id: "circuit",
    testid: "section-circuit",
    gridTestid: "grid-circuit",
    headingId: "heading-circuit",
    titleEn: "Building the Loop",
    titleKh: "ការបង្កើតសៀគ្វី",
    subtitleEn: "How electricity flows in a circle to do useful work.",
    subtitleKh: "តើអគ្គិសនីហូរតាមរង្វង់ យ៉ាងណាដើម្បីធ្វើការងារមានប្រយោជន៍។",
    icon: Cable,
    iconAccent: "text-violet-600 bg-violet-100 border-violet-200",
    cards: [
      {
        id: "wire",
        en: "Wire",
        kh: "ខ្សែភ្លើង",
        emoji: "〰️",
        subEn: "The road for electricity!",
        subKh: "ផ្លូវសម្រាប់អគ្គិសនី!",
        palette: "from-orange-100 via-amber-100 to-yellow-100",
        accent: "orange",
      },
      {
        id: "switch",
        en: "Switch",
        kh: "កុងតាក់",
        emoji: "🎚️",
        subEn: "The bridge to stop or go!",
        subKh: "ស្ពានសម្រាប់បញ្ឈប់ ឬបន្ត!",
        palette: "from-slate-100 via-zinc-100 to-stone-100",
        accent: "slate",
      },
      {
        id: "lightbulb",
        en: "Lightbulb",
        kh: "អំពូលភ្លើង",
        emoji: "💡",
        palette: "from-yellow-100 via-amber-100 to-orange-100",
        accent: "yellow",
      },
      {
        id: "motor",
        en: "Motor",
        kh: "ម៉ូទ័រ",
        emoji: "⚙️",
        subEn: "It makes things spin!",
        subKh: "ធ្វើឱ្យរបស់វិល!",
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
  green:  { border: "border-green-300",  ring: "focus-visible:ring-green-400",  play: "bg-green-500 hover:bg-green-600 text-white"   },
  yellow: { border: "border-yellow-300", ring: "focus-visible:ring-yellow-400", play: "bg-yellow-500 hover:bg-yellow-600 text-white" },
  blue:   { border: "border-blue-300",   ring: "focus-visible:ring-blue-400",   play: "bg-blue-500 hover:bg-blue-600 text-white"     },
  orange: { border: "border-orange-300", ring: "focus-visible:ring-orange-400", play: "bg-orange-500 hover:bg-orange-600 text-white" },
  slate:  { border: "border-slate-300",  ring: "focus-visible:ring-slate-400",  play: "bg-slate-500 hover:bg-slate-600 text-white"   },
  violet: { border: "border-violet-300", ring: "focus-visible:ring-violet-400", play: "bg-violet-500 hover:bg-violet-600 text-white" },
};

/* ────────────────────────────────────────────────────────────────────── */

type ElectronicsModuleProps = {
  module: ElectronicsModule;
  kh: boolean;
  speakingId: string | null;
  onPlay: (card: ElectronicsCard) => void;
};

function ElectronicsModuleSection({
  module: m,
  kh,
  speakingId,
  onPlay,
}: ElectronicsModuleProps) {
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

export default function KidsElectronics() {
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

  function playCard(c: ElectronicsCard) {
    setSpeakingId(c.id);
    const result = speakText(c.en, "en-US", {
      onEnd: () => setSpeakingId((cur) => (cur === c.id ? null : cur)),
      onError: () => setSpeakingId((cur) => (cur === c.id ? null : cur)),
    });
    if (!result.ok) setSpeakingId(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-violet-50 pb-16">
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
          <Lightbulb className="w-4 h-4" aria-hidden="true" />
          <span>
            {kh ? "សម្រាប់កុមារ · ថាមពល និងពន្លឺ" : "FOR KIDS · POWER & LIGHT"}
          </span>
        </div>

        <h1 className="mt-4 font-display font-black text-4xl sm:text-5xl md:text-6xl leading-tight text-slate-900">
          {kh ? (
            <span className="font-khmer leading-snug">ថាមពល និងពន្លឺ</span>
          ) : (
            <>
              Power &{" "}
              <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Light
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
          {kh ? "Power & Light" : "ថាមពល និងពន្លឺ"}
        </p>

        <p className="mt-2 text-lg sm:text-xl font-display font-bold text-slate-700">
          {kh ? "អេឡិចត្រូនិកមូលដ្ឋាន" : "Basic Electronics"}
        </p>
        <p
          className={`text-sm text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh ? "Basic Electronics" : "អេឡិចត្រូនិកមូលដ្ឋាន"}
        </p>

        <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-700">
          {kh
            ? "ស្វែងយល់ថាតើថាមពលមកពីណា និងរបៀបដែលវាហូរតាមសៀគ្វី ដើម្បីបំភ្លឺអំពូល និងធ្វើឱ្យម៉ូទ័រវិល។ ប៉ះប៊ូតុង ស្ដាប់ ដើម្បីលឺពាក្យជាភាសាអង់គ្លេស!"
            : "Discover where electricity comes from and how it flows through a circuit to light a bulb or spin a motor. Tap Play to hear each word in English!"}
        </p>
        <p
          className={`mt-2 max-w-2xl text-sm text-slate-500 ${
            kh ? "" : "font-khmer leading-loose"
          }`}
        >
          {kh
            ? "Discover where electricity comes from and how it flows through a circuit to light a bulb or spin a motor. Tap Play to hear each word in English!"
            : "ស្វែងយល់ថាតើថាមពលមកពីណា និងរបៀបដែលវាហូរតាមសៀគ្វី ដើម្បីបំភ្លឺអំពូល និងធ្វើឱ្យម៉ូទ័រវិល។ ប៉ះប៊ូតុង ស្ដាប់ ដើម្បីលឺពាក្យជាភាសាអង់គ្លេស!"}
        </p>
      </header>

      {/* ── Modules ──────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        {MODULES.map((m) => (
          <ElectronicsModuleSection
            key={m.id}
            module={m}
            kh={kh}
            speakingId={speakingId}
            onPlay={playCard}
          />
        ))}

        {/* ── Encouragement footer ─────────────────────────────────── */}
        <div className="mt-14 max-w-3xl mx-auto rounded-3xl bg-white/80 border-4 border-amber-200 p-6 sm:p-8 shadow-md text-center">
          <Sparkles
            className="w-8 h-8 mx-auto text-amber-500"
            aria-hidden="true"
          />
          <h2 className="mt-3 font-display font-black text-2xl sm:text-3xl text-slate-900">
            {kh ? "អ្នកជាវិស្វករតូច!" : "You are a little engineer!"}
          </h2>
          <p
            className={`mt-1 text-base text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh ? "You are a little engineer!" : "អ្នកជាវិស្វករតូច!"}
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-700">
            {kh
              ? "មើលជុំវិញផ្ទះរបស់អ្នក — តើអ្នកមើលឃើញកុងតាក់ ខ្សែភ្លើង ឬអំពូលប៉ុន្មាន? អគ្គិសនីនៅគ្រប់ទីកន្លែង!"
              : "Look around your home — how many switches, wires, or lightbulbs can you spot? Electricity is everywhere!"}
          </p>
          <p
            className={`mt-2 text-sm text-slate-500 ${
              kh ? "" : "font-khmer leading-loose"
            }`}
          >
            {kh
              ? "Look around your home — how many switches, wires, or lightbulbs can you spot? Electricity is everywhere!"
              : "មើលជុំវិញផ្ទះរបស់អ្នក — តើអ្នកមើលឃើញកុងតាក់ ខ្សែភ្លើង ឬអំពូលប៉ុន្មាន? អគ្គិសនីនៅគ្រប់ទីកន្លែង!"}
          </p>
        </div>
      </main>
    </div>
  );
}
