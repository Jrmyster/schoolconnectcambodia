import {
  Smartphone, RadioTower, Cable, Cloud, Radio, Signal,
  Mic, Globe, Video, Cpu, Sparkles, Hourglass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

interface Generation {
  key: string;
  /** Display label, e.g. "2G". Neutral across languages. */
  g: string;
  /** Number of filled signal bars (1–5). 6G uses 5 + neon glow. */
  bars: 1 | 2 | 3 | 4 | 5;
  /** Era — neutral across languages, e.g. "1990s". */
  era: string;
  eraLabelEn: string;
  eraLabelKh: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  Icon: LucideIcon;
  /**
   * Tone progression: dull gray → cool blue → bright neon → futuristic violet.
   * Each tone is a self-contained Tailwind palette for the card.
   */
  tone: {
    badge: string;       // big "G" badge bg + text
    border: string;      // card border
    glow: string;        // outer shadow
    bar: string;         // active signal bar fill
    bar0: string;        // empty signal bar fill
    chip: string;        // era pill
    icon: string;        // icon tile bg + text
  };
  /** Optional "in development" tag, used for 6G. */
  futureTagEn?: string;
  futureTagKh?: string;
}

const GENERATIONS: Generation[] = [
  {
    key: "2g",
    g: "2G",
    bars: 1,
    era: "1990s",
    eraLabelEn: "Voice & Text Era",
    eraLabelKh: "យុគនៃសំឡេង និងសារ",
    titleEn: "The Voice & Text Era",
    titleKh: "យុគនៃសំឡេង និងសារ",
    bodyEn:
      "Digitised phone signals for the first time, allowing SMS text messaging and clearer voice calls. Data was incredibly slow — sending a single photo could take minutes.",
    bodyKh:
      "ឌីជីថលនីយកម្មសញ្ញាទូរស័ព្ទជាលើកដំបូង ដោយអនុញ្ញាតឱ្យផ្ញើសារ SMS និងហៅទូរស័ព្ទច្បាស់ជាងមុន។ ទិន្នន័យដំណើរការយឺតយ៉ាវខ្លាំងណាស់ — ការផ្ញើរូបភាពមួយអាចចំណាយពេលជាច្រើននាទី។",
    Icon: Mic,
    tone: {
      badge: "from-slate-500 to-slate-700 text-slate-100",
      border: "border-slate-600/40",
      glow: "shadow-[0_0_20px_-10px_rgba(148,163,184,0.5)]",
      bar: "bg-slate-400",
      bar0: "bg-slate-700/60",
      chip: "bg-slate-700/40 border-slate-500/40 text-slate-200",
      icon: "bg-slate-700/40 border-slate-500/40 text-slate-200",
    },
  },
  {
    key: "3g",
    g: "3G",
    bars: 2,
    era: "2000s",
    eraLabelEn: "The Mobile Web",
    eraLabelKh: "បណ្តាញអ៊ីនធឺណិតចល័ត",
    titleEn: "The Mobile Web",
    titleKh: "បណ្តាញអ៊ីនធឺណិតចល័ត",
    bodyEn:
      "Brought basic internet to phones for the first time. People could check email, load simple web pages, and use early messaging apps while away from a computer.",
    bodyKh:
      "បាននាំអ៊ីនធឺណិតមូលដ្ឋានដល់ទូរស័ព្ទជាលើកដំបូង។ មនុស្សអាចពិនិត្យអ៊ីមែល បើកគេហទំព័រសាមញ្ញ និងប្រើកម្មវិធីផ្ញើសារដំបូងៗ ពេលឆ្ងាយពីកុំព្យូទ័រ។",
    Icon: Globe,
    tone: {
      badge: "from-sky-700 to-blue-800 text-sky-100",
      border: "border-sky-500/40",
      glow: "shadow-[0_0_22px_-10px_rgba(56,189,248,0.55)]",
      bar: "bg-sky-400",
      bar0: "bg-slate-700/60",
      chip: "bg-sky-900/40 border-sky-500/40 text-sky-100",
      icon: "bg-sky-900/40 border-sky-500/50 text-sky-200",
    },
  },
  {
    key: "4g",
    g: "4G LTE",
    bars: 3,
    era: "2010s",
    eraLabelEn: "The Video Era",
    eraLabelKh: "យុគនៃវីដេអូ",
    titleEn: "The Video Era",
    titleKh: "យុគនៃវីដេអូ",
    bodyEn:
      "Speeds finally became fast enough to stream high-quality video, make video calls, and launch the modern app economy — ride-sharing, food delivery, mobile banking.",
    bodyKh:
      "ល្បឿនទីបំផុតបានលឿនល្មមដើម្បីផ្សាយវីដេអូគុណភាពខ្ពស់ ហៅវីដេអូ និងបង្កើតសេដ្ឋកិច្ចកម្មវិធីសម័យទំនើប — ការចែករំលែករថយន្ត ការដឹកជញ្ជូនអាហារ និងធនាគារចល័ត។",
    Icon: Video,
    tone: {
      badge: "from-cyan-500 to-sky-600 text-white",
      border: "border-cyan-400/50",
      glow: "shadow-[0_0_28px_-10px_rgba(34,211,238,0.65)]",
      bar: "bg-cyan-400",
      bar0: "bg-slate-700/60",
      chip: "bg-cyan-900/40 border-cyan-400/40 text-cyan-100",
      icon: "bg-cyan-900/40 border-cyan-400/50 text-cyan-200",
    },
  },
  {
    key: "5g",
    g: "5G",
    bars: 4,
    era: "2020s",
    eraLabelEn: "The Internet of Things",
    eraLabelKh: "អ៊ីនធឺណិតនៃកិច្ចការនានា",
    titleEn: "The Internet of Things",
    titleKh: "អ៊ីនធឺណិតនៃកិច្ចការនានា",
    bodyEn:
      "Uses ultra-high-frequency radio waves to connect thousands of devices at once with almost zero delay (latency). This is what enables self-driving cars and remote surgery.",
    bodyKh:
      "ប្រើរលកវិទ្យុប្រេកង់ខ្ពស់ខ្លាំងដើម្បីភ្ជាប់ឧបករណ៍រាប់ពាន់ក្នុងពេលតែមួយជាមួយពេលវេលាពន្យារស្ទើរតែសូន្យ (latency)។ នេះគឺជាអ្វីដែលធ្វើឱ្យរថយន្តបើកបរដោយខ្លួនឯង និងការវះកាត់ពីចម្ងាយអាចទៅរួច។",
    Icon: Cpu,
    tone: {
      badge: "from-cyan-400 to-blue-500 text-white",
      border: "border-cyan-300/60",
      glow: "shadow-[0_0_32px_-8px_rgba(34,211,238,0.75)]",
      bar: "bg-gradient-to-t from-cyan-400 to-sky-300",
      bar0: "bg-slate-700/60",
      chip: "bg-cyan-500/15 border-cyan-300/50 text-cyan-100",
      icon: "bg-cyan-500/20 border-cyan-300/60 text-cyan-100",
    },
  },
  {
    key: "6g",
    g: "6G",
    bars: 5,
    era: "≈ 2030+",
    eraLabelEn: "The Future",
    eraLabelKh: "អនាគត",
    titleEn: "The Terahertz Frontier",
    titleKh: "ព្រំដែនតេរ៉ាហឺត",
    bodyEn:
      "Still in development. 6G will use even higher frequencies (terahertz waves), potentially integrating AI directly into the network and making holographic communication a reality.",
    bodyKh:
      "នៅតែកំពុងស្ថិតក្នុងការអភិវឌ្ឍ។ 6G នឹងប្រើប្រេកង់ខ្ពស់ជាងនេះ (រលកតេរ៉ាហឺត) ដោយប្រហែលជារួមបញ្ចូលបញ្ញាសិប្បនិម្មិតផ្ទាល់ទៅក្នុងបណ្តាញ និងធ្វើឱ្យការទំនាក់ទំនងហូឡូក្រាមក្លាយជាការពិត។",
    Icon: Sparkles,
    tone: {
      badge: "from-fuchsia-400 via-violet-400 to-cyan-400 text-white",
      border: "border-fuchsia-400/60",
      glow: "shadow-[0_0_38px_-6px_rgba(232,121,249,0.7)]",
      bar: "bg-gradient-to-t from-fuchsia-400 via-violet-400 to-cyan-300",
      bar0: "bg-slate-700/60",
      chip: "bg-violet-500/20 border-violet-400/50 text-violet-100",
      icon: "bg-violet-500/20 border-fuchsia-300/60 text-fuchsia-200",
    },
    futureTagEn: "In development",
    futureTagKh: "កំពុងអភិវឌ្ឍ",
  },
];

/* ──────────────────────────────────────────────────────────────────────────────
 *  CellularNetworksModule
 *
 *  Two-part lesson:
 *    A. How Cellular Data Works — diagram of phone → waves → tower → fiber → web
 *    B. The Generations of Speed — 2G→6G grid with ascending signal bars and
 *       a colour progression from dull gray to futuristic neon.
 * ────────────────────────────────────────────────────────────────────────────── */
export function CellularNetworksModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes cell-wave {
          0%   { transform: scale(0.6); opacity: 0.85; }
          80%  { opacity: 0.05; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .cell-wave   { animation: cell-wave 2.6s ease-out infinite; transform-origin: center; }
        .cell-wave-2 { animation-delay: 0.85s; }
        .cell-wave-3 { animation-delay: 1.7s;  }

        @keyframes cell-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.08); }
        }
        .cell-pulse { animation: cell-pulse 2.2s ease-in-out infinite; }

        @keyframes cell-flow {
          to { stroke-dashoffset: -32; }
        }
        .cell-flow {
          stroke-dasharray: 6 6;
          animation: cell-flow 1.4s linear infinite;
        }

        @keyframes cell-bar-up {
          0%   { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        .cell-bar-up { animation: cell-bar-up 0.6s cubic-bezier(.2,.9,.3,1.05) both; transform-origin: bottom; }

        @media (prefers-reduced-motion: reduce) {
          .cell-wave, .cell-pulse, .cell-flow, .cell-bar-up { animation: none !important; }
        }
      `}</style>

      {/* ============================================================ */}
      {/*  PART A — How Cellular Data Works                            */}
      {/* ============================================================ */}
      <section
        aria-labelledby="cell-data-title"
        data-testid="cell-how-it-works"
        className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-5 sm:p-7"
      >
        {/* Header */}
        <header className="flex items-start gap-3 mb-5">
          <div
            className="shrink-0 w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/50 text-cyan-300 flex items-center justify-center cell-pulse"
            aria-hidden="true"
          >
            <Radio className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-300/85 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Part A · Core concept", "ផ្នែក A · គោលគំនិតចម្បង")}
            </div>
            <h3
              id="cell-data-title"
              className="mt-0.5 font-display text-xl sm:text-2xl font-bold text-white leading-tight"
            >
              <span className="block">How Cellular Data Works</span>
              <span className="block font-khmer text-base sm:text-lg font-bold text-cyan-200 mt-1 leading-relaxed">
                តើទិន្នន័យទូរស័ព្ទដំណើរការយ៉ាងដូចម្តេច?
              </span>
            </h3>
          </div>
        </header>

        {/* Body copy */}
        <p className={`text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Your phone does not connect directly to the internet. It uses a tiny antenna to convert digital data (0s and 1s) into invisible Radio Waves (រលកវិទ្យុ). Those waves travel through the air to a local Cell Tower, which is then connected to the global internet through underground fibre-optic cables.",
            "ទូរស័ព្ទរបស់អ្នកមិនភ្ជាប់ដោយផ្ទាល់ទៅអ៊ីនធឺណិតទេ។ វាប្រើអង់តែនតូចមួយដើម្បីបំប្លែងទិន្នន័យឌីជីថល (០ និង ១) ទៅជារលកវិទ្យុ (Radio Waves) ដែលមើលមិនឃើញ។ រលកទាំងនោះធ្វើដំណើរតាមអាកាសទៅប៉មទូរស័ព្ទក្នុងតំបន់ ដែលបន្ទាប់មកត្រូវបានភ្ជាប់ទៅអ៊ីនធឺណិតពិភពលោកតាមរយៈខ្សែកាបអុបទិកក្រោមដី។"
          )}
        </p>

        {/* Diagram: Phone --waves--> Tower --fiber--> Cloud */}
        <div className="mt-6 rounded-xl border border-cyan-400/25 bg-slate-950/60 p-4 sm:p-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
            {/* PHONE */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-800 border-2 border-cyan-400/60 text-cyan-200 flex items-center justify-center shadow-[0_0_20px_-8px_rgba(34,211,238,0.6)]">
                  <Smartphone className="w-7 h-7 sm:w-9 sm:h-9" aria-hidden="true" />
                </div>
                {/* Radio wave rings emanating from phone */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 rounded-2xl border-2 border-cyan-400/55 cell-wave ${i === 1 ? "cell-wave-2" : i === 2 ? "cell-wave-3" : ""}`}
                    />
                  ))}
                </div>
              </div>
              <div className={`mt-3 text-xs sm:text-sm font-bold text-white ${kh ? "font-khmer" : "font-display"}`}>
                {t("Your Phone", "ទូរស័ព្ទរបស់អ្នក")}
              </div>
              <div className={`text-[10px] sm:text-xs text-cyan-300/70 ${kh ? "" : "font-khmer"}`}>
                {kh ? "Your Phone" : "ទូរស័ព្ទរបស់អ្នក"}
              </div>
            </div>

            {/* CELL TOWER */}
            <div className="flex flex-col items-center text-center">
              {/* SVG link: phone-side waves into tower */}
              <svg viewBox="0 0 200 60" className="w-full max-w-[220px] h-10 sm:h-12 -mt-1" aria-hidden="true">
                <path
                  d="M 8 30 Q 100 -10 192 30"
                  fill="none"
                  stroke="rgba(34,211,238,0.65)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="cell-flow"
                />
                <text x="100" y="14" textAnchor="middle" fontSize="9" fill="rgba(165,243,252,0.85)" fontFamily="ui-monospace, monospace">
                  {kh ? "រលកវិទ្យុ · Radio Waves" : "Radio Waves · រលកវិទ្យុ"}
                </text>
              </svg>
              <div className="relative">
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-800 border-2 border-cyan-300/70 text-cyan-100 flex items-center justify-center shadow-[0_0_24px_-6px_rgba(34,211,238,0.7)]">
                  <RadioTower className="w-7 h-7 sm:w-9 sm:h-9 cell-pulse" aria-hidden="true" />
                </div>
              </div>
              <div className={`mt-3 text-xs sm:text-sm font-bold text-white ${kh ? "font-khmer" : "font-display"}`}>
                {t("Cell Tower", "ប៉មទូរស័ព្ទ")}
              </div>
              <div className={`text-[10px] sm:text-xs text-cyan-300/70 ${kh ? "" : "font-khmer"}`}>
                {kh ? "Cell Tower" : "ប៉មទូរស័ព្ទ"}
              </div>
            </div>

            {/* INTERNET / CLOUD */}
            <div className="flex flex-col items-center text-center">
              <svg viewBox="0 0 200 60" className="w-full max-w-[220px] h-10 sm:h-12 -mt-1" aria-hidden="true">
                <line
                  x1="8" y1="34" x2="192" y2="34"
                  stroke="rgba(125,211,252,0.7)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="cell-flow"
                />
                <text x="100" y="20" textAnchor="middle" fontSize="9" fill="rgba(125,211,252,0.85)" fontFamily="ui-monospace, monospace">
                  {kh ? "ខ្សែកាបអុបទិក · Fiber" : "Fiber Cable · ខ្សែកាបអុបទិក"}
                </text>
              </svg>
              <div className="relative">
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-700 to-cyan-500 border-2 border-cyan-200/70 text-white flex items-center justify-center shadow-[0_0_28px_-6px_rgba(56,189,248,0.85)]">
                  <Cloud className="w-7 h-7 sm:w-9 sm:h-9" aria-hidden="true" />
                </div>
              </div>
              <div className={`mt-3 text-xs sm:text-sm font-bold text-white ${kh ? "font-khmer" : "font-display"}`}>
                {t("Global Internet", "អ៊ីនធឺណិតពិភពលោក")}
              </div>
              <div className={`text-[10px] sm:text-xs text-cyan-300/70 ${kh ? "" : "font-khmer"}`}>
                {kh ? "Global Internet" : "អ៊ីនធឺណិតពិភពលោក"}
              </div>
            </div>
          </div>

          {/* Step labels under the diagram */}
          <ol className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 list-none p-0 text-[11px] sm:text-xs">
            {[
              {
                en: "1. Phone converts 0s and 1s into radio waves.",
                kh: "១. ទូរស័ព្ទបំប្លែង ០ និង ១ ទៅជារលកវិទ្យុ។",
              },
              {
                en: "2. Waves travel through the air to a nearby cell tower.",
                kh: "២. រលកធ្វើដំណើរតាមអាកាសទៅប៉មទូរស័ព្ទក្បែរៗ។",
              },
              {
                en: "3. The tower forwards your data over fibre to the global internet.",
                kh: "៣. ប៉មបញ្ជូនទិន្នន័យរបស់អ្នកតាមខ្សែអុបទិកទៅអ៊ីនធឺណិតពិភពលោក។",
              },
            ].map((s, i) => (
              <li
                key={i}
                className={`rounded-lg border border-cyan-400/20 bg-slate-900/60 p-2.5 sm:p-3 text-slate-200 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {kh ? s.kh : s.en}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PART B — The Generations of Speed                           */}
      {/* ============================================================ */}
      <section
        aria-labelledby="cell-generations-title"
        data-testid="cell-generations"
        className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-5 sm:p-7"
      >
        <header className="flex items-start gap-3 mb-5">
          <div
            className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-slate-500 via-cyan-400 to-violet-500 text-white flex items-center justify-center shadow-[0_0_22px_-6px_rgba(34,211,238,0.7)]"
            aria-hidden="true"
          >
            <Signal className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-300/85 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Part B · Timeline", "ផ្នែក B · បន្ទាត់ពេលវេលា")}
            </div>
            <h3
              id="cell-generations-title"
              className="mt-0.5 font-display text-xl sm:text-2xl font-bold text-white leading-tight"
            >
              <span className="block">The Generations of Speed</span>
              <span className="block font-khmer text-base sm:text-lg font-bold text-cyan-200 mt-1 leading-relaxed">
                ជំនាន់នៃល្បឿន
              </span>
            </h3>
          </div>
        </header>

        {/* Generation cards grid */}
        <ol
          data-testid="cell-generations-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 list-none p-0"
        >
          {GENERATIONS.map((gen, idx) => (
            <li key={gen.key} data-testid={`cell-generation-${gen.key}`}>
              <article
                className={`relative h-full rounded-2xl border-2 ${gen.tone.border} bg-slate-950/70 backdrop-blur-sm p-4 sm:p-5 ${gen.tone.glow}`}
              >
                {/* Top row: G badge + signal bars */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className={`px-2.5 py-1 rounded-lg bg-gradient-to-br ${gen.tone.badge} text-base sm:text-lg font-extrabold tracking-tight font-display shadow-md`}
                    aria-label={`Generation ${gen.g}`}
                  >
                    {gen.g}
                  </div>

                  {/* Ascending signal bars (5 total) — accessible group label */}
                  <div
                    className="flex items-end gap-0.5 h-8 sm:h-9"
                    role="img"
                    aria-label={
                      kh
                        ? `សញ្ញា ${gen.bars} ក្នុងចំនួន ៥`
                        : `Signal strength ${gen.bars} of 5`
                    }
                    data-testid={`cell-bars-${gen.key}`}
                  >
                    {[1, 2, 3, 4, 5].map((b) => {
                      const filled = b <= gen.bars;
                      const height = 20 + b * 4; // 24, 28, 32, 36, 40
                      return (
                        <span
                          key={b}
                          aria-hidden="true"
                          className={`block w-1.5 sm:w-2 rounded-sm ${filled ? `${gen.tone.bar} cell-bar-up` : gen.tone.bar0}`}
                          style={{
                            height: `${height}px`,
                            animationDelay: filled ? `${idx * 60 + b * 90}ms` : undefined,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Era pill */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className={`text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full border ${gen.tone.chip}`}>
                    {gen.era}
                  </span>
                  {gen.futureTagEn && (
                    <span className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full border border-violet-400/40 bg-violet-500/10 text-violet-200 ${kh ? "font-khmer" : ""}`}>
                      <Hourglass className="w-3 h-3" aria-hidden="true" />
                      {kh ? gen.futureTagKh : gen.futureTagEn}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div className="flex items-start gap-2 mb-2">
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg border ${gen.tone.icon} flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    <gen.Icon className="w-4 h-4" strokeWidth={2.4} />
                  </div>
                  <div className="min-w-0">
                    <h4 className={`text-sm sm:text-base font-bold text-white leading-tight ${kh ? "font-khmer" : "font-display"}`}>
                      {kh ? gen.titleKh : gen.titleEn}
                    </h4>
                    <p className={`text-[11px] text-slate-400 leading-tight ${kh ? "" : "font-khmer"}`}>
                      {kh ? gen.titleEn : gen.titleKh}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <p className={`text-xs sm:text-sm text-slate-300 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                  {kh ? gen.bodyKh : gen.bodyEn}
                </p>
              </article>
            </li>
          ))}
        </ol>

        {/* Footer caption: progression legend */}
        <div className={`mt-5 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-300 ${kh ? "font-khmer leading-loose" : "font-mono"}`}>
          <Cable className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
          <span>{t("Each step adds more bars, more speed, and more connected things.", "ជំហាននីមួយៗបន្ថែមរបារសញ្ញា ល្បឿន និងឧបករណ៍ដែលភ្ជាប់កាន់តែច្រើន។")}</span>
        </div>
      </section>
    </div>
  );
}
