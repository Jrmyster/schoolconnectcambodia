import { useState, useEffect, useRef } from "react";
import { Compass, X, Sparkles } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type BranchKey =
  | "epistemology"
  | "logic"
  | "metaphysics"
  | "ethics"
  | "aesthetics"
  | "axiology"
  | "mind";

interface Branch {
  key: BranchKey;
  glyph: string;        // single character / symbol shown in the node
  nameEn: string;
  nameKh: string;
  studyEn: string;      // "The study of ..."
  studyKh: string;
  questionEn: string;
  questionKh: string;
  exampleTitleEn: string;
  exampleTitleKh: string;
  exampleEn: string;    // Cambodian-context real-world example
  exampleKh: string;
  /** Soft accent gradient for the active card border + node ring. */
  accent: string;
}

const BRANCHES: Branch[] = [
  {
    key: "epistemology",
    glyph: "👁",
    nameEn: "Epistemology",
    nameKh: "ញាណវិទ្យា",
    studyEn: "The study of knowledge.",
    studyKh: "ការសិក្សាអំពីចំណេះដឹង។",
    questionEn: "How do we know what is true?",
    questionKh: "តើយើងដឹងយ៉ាងម៉េចថាអ្វីពិត?",
    exampleTitleEn: "Real World",
    exampleTitleKh: "ឧទាហរណ៍ជាក់ស្តែង",
    exampleEn:
      "Your friend says it will rain tomorrow because their grandmother dreamed of fish. Another friend looks at the weather app. Whose 'knowledge' should you trust, and why?",
    exampleKh:
      "មិត្តម្នាក់និយាយថាស្អែកនឹងភ្លៀងព្រោះយាយរបស់គេយល់សុបិនឃើញត្រី។ មិត្តម្នាក់ទៀតមើលកម្មវិធីព្យាករអាកាសធាតុ។ តើ «ចំណេះដឹង» របស់អ្នកណាដែលអ្នកគួរទុកចិត្ត ហើយហេតុអ្វី?",
    accent: "from-amber-300 via-yellow-200 to-amber-500",
  },
  {
    key: "logic",
    glyph: "∴",
    nameEn: "Logic",
    nameKh: "តក្កវិជ្ជា",
    studyEn: "The study of reasoning.",
    studyKh: "ការសិក្សាអំពីការវែកញែក។",
    questionEn: "What makes a good argument?",
    questionKh: "តើអ្វីដែលធ្វើឱ្យអំណះអំណាងមួយល្អ?",
    exampleTitleEn: "Real World",
    exampleTitleKh: "ឧទាហរណ៍ជាក់ស្តែង",
    exampleEn:
      "All students who studied passed the exam. Sokha studied. Therefore, Sokha passed. Is this reasoning valid? What if some students who studied still failed?",
    exampleKh:
      "សិស្សទាំងអស់ដែលបានរៀនបានប្រឡងជាប់។ សុខាបានរៀន។ ដូច្នេះ សុខាប្រឡងជាប់។ តើការវែកញែកនេះត្រឹមត្រូវទេ? ចុះប្រសិនបើសិស្សខ្លះដែលរៀនហើយនៅតែធ្លាក់?",
    accent: "from-sky-300 via-blue-200 to-sky-500",
  },
  {
    key: "metaphysics",
    glyph: "✦",
    nameEn: "Metaphysics",
    nameKh: "មេតាភីស៊ីក",
    studyEn: "The study of reality.",
    studyKh: "ការសិក្សាអំពីការពិត។",
    questionEn: "What actually exists in the universe?",
    questionKh: "តើអ្វីពិតជាមាននៅក្នុងសកលលោក?",
    exampleTitleEn: "Real World",
    exampleTitleKh: "ឧទាហរណ៍ជាក់ស្តែង",
    exampleEn:
      "When you sleep and dream of walking through Angkor Wat, was that experience 'real'? What about numbers — does the number 7 exist somewhere, or only in our minds?",
    exampleKh:
      "ពេលអ្នកដេកលក់ ហើយយល់សុបិនថាដើរក្នុងអង្គរវត្ត តើបទពិសោធន៍នោះ «ពិត» ទេ? ចុះលេខ — តើលេខ 7 មានកន្លែងណាមួយ ឬមានតែក្នុងគំនិតយើងប៉ុណ្ណោះ?",
    accent: "from-indigo-300 via-violet-200 to-indigo-500",
  },
  {
    key: "ethics",
    glyph: "⚖",
    nameEn: "Ethics",
    nameKh: "សីលធម៌វិជ្ជា",
    studyEn: "The study of morality.",
    studyKh: "ការសិក្សាអំពីសីលធម៌។",
    questionEn: "What is the right thing to do?",
    questionKh: "តើអ្វីជាការត្រឹមត្រូវដែលត្រូវធ្វើ?",
    exampleTitleEn: "Real World",
    exampleTitleKh: "ឧទាហរណ៍ជាក់ស្តែង",
    exampleEn:
      "If you find a wallet with $50 in cash at Phsar Thmei market, what should you do — and why? Does it matter whether anyone is watching?",
    exampleKh:
      "បើអ្នករកឃើញកាបូបមួយដែលមានលុយ $50 នៅផ្សារធំថ្មី តើអ្នកគួរធ្វើដូចម្តេច — ហើយហេតុអ្វី? តើវាសំខាន់ទេថា មាននរណាមើលឃើញឬអត់?",
    accent: "from-emerald-300 via-green-200 to-emerald-500",
  },
  {
    key: "aesthetics",
    glyph: "✿",
    nameEn: "Aesthetics",
    nameKh: "សោភ័ណវិជ្ជា",
    studyEn: "The study of beauty and art.",
    studyKh: "ការសិក្សាអំពីសោភ័ណភាព និងសិល្បៈ។",
    questionEn: "What makes something beautiful?",
    questionKh: "តើអ្វីដែលធ្វើឱ្យវត្ថុមួយស្រស់ស្អាត?",
    exampleTitleEn: "Real World",
    exampleTitleKh: "ឧទាហរណ៍ជាក់ស្តែង",
    exampleEn:
      "An apsara dance, a sunset over Tonle Sap, and a perfectly arranged plate of amok — all are called 'beautiful'. Do they share something in common, or is beauty only in the eye of the beholder?",
    exampleKh:
      "របាំអប្សរា ថ្ងៃលិចលើបឹងទន្លេសាប និងចានអាម៉ុករៀបយ៉ាងស្រស់ស្អាត — ទាំងអស់នេះយើងហៅថា «ស្រស់ស្អាត»។ តើពួកគេមានអ្វីដូចគ្នាទេ ឬសោភ័ណភាពមាននៅក្នុងភ្នែករបស់អ្នកមើលតែប៉ុណ្ណោះ?",
    accent: "from-rose-300 via-pink-200 to-rose-500",
  },
  {
    key: "axiology",
    glyph: "♛",
    nameEn: "Axiology",
    nameKh: "គុណតម្លៃវិជ្ជា",
    studyEn: "The study of value.",
    studyKh: "ការសិក្សាអំពីគុណតម្លៃ។",
    questionEn: "What is truly important in life?",
    questionKh: "តើអ្វីដែលសំខាន់ពិតៗក្នុងជីវិត?",
    exampleTitleEn: "Real World",
    exampleTitleKh: "ឧទាហរណ៍ជាក់ស្តែង",
    exampleEn:
      "Your family can either spend savings sending you to university or buy a tractor that doubles the rice harvest. Both have value. How do we decide which kind of value matters more?",
    exampleKh:
      "គ្រួសារអ្នកអាចប្រើប្រាក់សន្សំដើម្បីបញ្ជូនអ្នកទៅសាកលវិទ្យាល័យ ឬទិញត្រាក់ទ័រដែលបង្កើនបង្គូរស្រូវទ្វេដង។ ទាំងពីរមានគុណតម្លៃ។ តើយើងសម្រេចចិត្តយ៉ាងម៉េចថាគុណតម្លៃប្រភេទណាសំខាន់ជាង?",
    accent: "from-orange-300 via-amber-200 to-orange-500",
  },
  {
    key: "mind",
    glyph: "☯",
    nameEn: "Philosophy of Mind",
    nameKh: "ទស្សនវិជ្ជានៃចិត្ត",
    studyEn: "The study of consciousness.",
    studyKh: "ការសិក្សាអំពីស្មារតី។",
    questionEn: "Are we just physical brains, or something more?",
    questionKh: "តើយើងគ្រាន់តែជាខួរក្បាលរូបី ឬអ្វីដែលច្រើនជាងនេះ?",
    exampleTitleEn: "Real World",
    exampleTitleKh: "ឧទាហរណ៍ជាក់ស្តែង",
    exampleEn:
      "When you feel love for your mother or sadness leaving home for school, is that just neurons firing — or is your 'self' something the brain alone cannot fully explain?",
    exampleKh:
      "ពេលអ្នកមានអារម្មណ៍ស្រលាញ់ម្ដាយ ឬព្រួយបារម្ភពេលចាកចេញពីផ្ទះទៅសាលា តើនោះគ្រាន់តែជាសរសៃប្រសាទដំណើរការ — ឬ «ខ្លួនឯង» របស់អ្នកជាអ្វីដែលខួរក្បាលតែឯងពន្យល់មិនអស់?",
    accent: "from-fuchsia-300 via-purple-200 to-fuchsia-500",
  },
];

export function PhilosophyMap() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [activeKey, setActiveKey] = useState<BranchKey | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const active = BRANCHES.find((b) => b.key === activeKey) ?? null;

  // When a node is opened, gently scroll the expanded card into view on small screens.
  useEffect(() => {
    if (!active || !cardRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardRef.current.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "nearest",
    });
  }, [active]);

  // Allow Escape to close the card for keyboard users.
  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveKey(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section
      aria-labelledby="philosophy-map-title"
      className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
    >
      <style>{`
        /* Marble + gold backdrop */
        .phil-marble {
          background:
            radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.18), transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(252,211,77,0.12), transparent 55%),
            radial-gradient(ellipse at 60% 90%, rgba(167,139,250,0.18), transparent 55%),
            linear-gradient(140deg, #0b1026 0%, #131a3a 35%, #1a1f4a 65%, #0d1228 100%);
        }
        /* Subtle starfield */
        .phil-stars::before {
          content: "";
          position: absolute; inset: 0;
          background-image:
            radial-gradient(1.5px 1.5px at 12% 22%, rgba(255,255,255,0.7), transparent 60%),
            radial-gradient(1px 1px at 28% 70%, rgba(255,255,255,0.55), transparent 60%),
            radial-gradient(1.5px 1.5px at 64% 18%, rgba(252,211,77,0.55), transparent 60%),
            radial-gradient(1px 1px at 82% 64%, rgba(255,255,255,0.6), transparent 60%),
            radial-gradient(1.5px 1.5px at 46% 88%, rgba(255,255,255,0.5), transparent 60%),
            radial-gradient(1px 1px at 92% 32%, rgba(252,211,77,0.5), transparent 60%);
          opacity: 0.7;
          pointer-events: none;
        }
        @keyframes phil-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes phil-pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0   rgba(252,211,77,0.6); }
          50%      { box-shadow: 0 0 0 10px rgba(252,211,77,0);   }
        }
        @keyframes phil-card-in {
          0%   { opacity: 0; transform: translateY(12px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0)    scale(1);   }
        }
        @keyframes phil-glyph-glow {
          0%, 100% { text-shadow: 0 0 6px rgba(252,211,77,0.55); }
          50%      { text-shadow: 0 0 18px rgba(252,211,77,0.95); }
        }
        .phil-compass-ring { animation: phil-spin 80s linear infinite; transform-origin: center; }
        .phil-pulse        { animation: phil-pulse-ring 2.6s ease-out infinite; }
        .phil-card-in      { animation: phil-card-in 0.42s cubic-bezier(.2,.9,.3,1.1) both; }
        .phil-glyph-glow   { animation: phil-glyph-glow 3.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .phil-compass-ring,
          .phil-pulse,
          .phil-card-in,
          .phil-glyph-glow { animation: none !important; }
        }
      `}</style>

      <div className="relative phil-marble phil-stars rounded-3xl p-6 sm:p-10 overflow-hidden border border-amber-500/30 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.6)]">
        {/* Gold corner flourishes */}
        <CornerFlourish className="top-3 left-3" />
        <CornerFlourish className="top-3 right-3 -scale-x-100" />
        <CornerFlourish className="bottom-3 left-3 -scale-y-100" />
        <CornerFlourish className="bottom-3 right-3 -scale-x-100 -scale-y-100" />

        {/* Header */}
        <header className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 text-[11px] font-bold tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {t("Study Center", "មជ្ឈមណ្ឌលសិក្សា")}
          </div>
          <h2
            id="philosophy-map-title"
            className={`mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-amber-50 ${kh ? "font-khmer leading-snug" : "font-display"}`}
          >
            {kh ? "ទស្សនវិជ្ជា៖ ផែនទីនៃការគិត" : "Philosophy"}
            {!kh && <span className="block text-base sm:text-lg font-medium text-amber-200/80 mt-2 tracking-wide">The Map of Thinking</span>}
            {kh && <span className="block text-sm font-sans font-normal text-amber-200/70 mt-2">(Philosophy: The Map of Thinking)</span>}
          </h2>
          <p className={`mt-3 max-w-xl mx-auto text-sm sm:text-base text-amber-100/70 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Tap a star on the compass to explore one of the seven great branches of philosophy.",
              "ចុចលើផ្កាយនៅលើត្រីវិស័យ ដើម្បីរុករកមួយក្នុងចំណោមមែកធំទាំងប្រាំពីរនៃទស្សនវិជ្ជា។"
            )}
          </p>
        </header>

        {/* THE COMPASS */}
        <Compass7
          branches={BRANCHES}
          activeKey={activeKey}
          onSelect={(k) => setActiveKey((cur) => (cur === k ? null : k))}
          kh={kh}
        />

        {/* EXPANDED CARD */}
        <div ref={cardRef} className="mt-8">
          {active && <BranchCard branch={active} onClose={() => setActiveKey(null)} kh={kh} />}
          {!active && (
            <p className={`text-center text-sm text-amber-200/60 italic ${kh ? "font-khmer" : ""}`}>
              {t(
                "Choose a branch above to reveal its core question and a real-world example.",
                "ជ្រើសរើសមែកធំខាងលើ ដើម្បីបង្ហាញសំណួរចម្បង និងឧទាហរណ៍ពិតក្នុងជីវិត។"
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- */
/*  COMPASS — 7 branch nodes arranged radially around a center    */
/* -------------------------------------------------------------- */

function Compass7({
  branches,
  activeKey,
  onSelect,
  kh,
}: {
  branches: Branch[];
  activeKey: BranchKey | null;
  onSelect: (k: BranchKey) => void;
  kh: boolean;
}) {
  const N = branches.length; // 7
  const radius = 42; // % of compass diameter from center

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[440px] sm:max-w-[520px]"
      role="group"
      aria-label="Philosophy compass"
    >
      {/* Outer rotating gold ring */}
      <div className="phil-compass-ring absolute inset-2 rounded-full border-2 border-dashed border-amber-400/40" />
      {/* Inner solid ring */}
      <div className="absolute inset-[14%] rounded-full border border-amber-300/30 bg-gradient-to-br from-slate-900/40 to-indigo-950/40 backdrop-blur-sm" />

      {/* Center emblem */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 border-4 border-amber-200/60 shadow-[0_0_30px_rgba(252,211,77,0.55)] flex items-center justify-center">
          <Compass className="w-9 h-9 sm:w-11 sm:h-11 text-slate-900" strokeWidth={2.4} />
        </div>
        <p className={`mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-amber-300/90 font-bold ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? "ផែនទីការគិត" : "Map of Thinking"}
        </p>
      </div>

      {/* The 7 nodes */}
      {branches.map((b, i) => {
        // Start at -90° (top) and go clockwise.
        const angle = -90 + (360 / N) * i;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * radius;
        const y = 50 + Math.sin(rad) * radius;
        const isActive = b.key === activeKey;
        return (
          <button
            key={b.key}
            type="button"
            onClick={() => onSelect(b.key)}
            aria-pressed={isActive}
            aria-label={`${b.nameEn} — ${b.studyEn}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${b.accent}
                          border-[3px] ${isActive ? "border-amber-200" : "border-amber-300/50"}
                          shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)]
                          flex flex-col items-center justify-center
                          transition-all duration-300
                          ${isActive ? "scale-110 phil-pulse" : "group-hover:scale-105 group-hover:-translate-y-0.5"}`}
            >
              <span className="phil-glyph-glow text-2xl sm:text-3xl text-slate-900 font-bold leading-none">
                {b.glyph}
              </span>
              {/* Compact label below the node */}
              <span
                className={`absolute top-full mt-1.5 px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs font-bold whitespace-nowrap
                           bg-slate-900/85 text-amber-100 border border-amber-400/30
                           ${kh ? "font-khmer text-[11px]" : ""}`}
              >
                {kh ? b.nameKh : b.nameEn}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------- */
/*  EXPANDED BRANCH CARD                                          */
/* -------------------------------------------------------------- */

function BranchCard({
  branch,
  onClose,
  kh,
}: {
  branch: Branch;
  onClose: () => void;
  kh: boolean;
}) {
  return (
    <article
      key={branch.key}
      className="phil-card-in relative rounded-2xl border border-amber-400/40 bg-gradient-to-br from-slate-900/95 via-indigo-950/90 to-slate-900/95 backdrop-blur-md p-5 sm:p-7 shadow-2xl"
      aria-live="polite"
    >
      {/* Accent border-top */}
      <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${branch.accent}`} />

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label={kh ? "បិទ" : "Close"}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-800/70 hover:bg-slate-700 border border-amber-300/30 text-amber-200 flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-4">
        <div className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${branch.accent} border-2 border-amber-200/60 shadow-lg flex items-center justify-center`}>
          <span className="text-3xl sm:text-4xl text-slate-900 font-bold">{branch.glyph}</span>
        </div>
        <div className="min-w-0">
          <h3 className={`text-2xl sm:text-3xl font-bold text-amber-100 leading-tight ${kh ? "font-khmer" : "font-display"}`}>
            {kh ? branch.nameKh : branch.nameEn}
          </h3>
          <p className={`mt-1 text-sm text-amber-200/80 ${kh ? "font-khmer" : ""}`}>
            {kh ? branch.studyKh : branch.studyEn}
          </p>
          {/* secondary translation */}
          <p className={`mt-0.5 text-xs ${kh ? "text-amber-200/50" : "font-khmer text-amber-200/50"}`}>
            {kh ? branch.nameEn : branch.nameKh} {kh ? null : <span className="text-amber-200/40">· {branch.studyKh}</span>}
          </p>
        </div>
      </div>

      {/* Core question */}
      <div className="mt-5 rounded-xl border-l-4 border-amber-400 bg-amber-400/10 p-4">
        <div className={`text-[10px] uppercase tracking-[0.25em] font-bold text-amber-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? "សំណួរចម្បង" : "The Core Question"}
        </div>
        <p className={`text-lg sm:text-xl font-semibold text-amber-50 leading-snug ${kh ? "font-khmer leading-relaxed" : "italic"}`}>
          “{kh ? branch.questionKh : branch.questionEn}”
        </p>
        <p className={`mt-1 text-xs ${kh ? "text-amber-200/50" : "font-khmer text-amber-200/55"}`}>
          {kh ? branch.questionEn : branch.questionKh}
        </p>
      </div>

      {/* Real-world Cambodian example */}
      <div className="mt-4 rounded-xl bg-slate-800/60 border border-amber-300/20 p-4">
        <div className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-emerald-300 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          🇰🇭 {kh ? branch.exampleTitleKh : branch.exampleTitleEn}
        </div>
        <p className={`text-sm sm:text-base text-amber-50/90 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? branch.exampleKh : branch.exampleEn}
        </p>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------- */
/*  Decorative gold corner flourish                               */
/* -------------------------------------------------------------- */

function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 60 60"
      className={`absolute w-12 h-12 sm:w-16 sm:h-16 text-amber-400/50 pointer-events-none ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M2 30 Q2 2 30 2" strokeLinecap="round" />
      <path d="M2 22 Q10 14 22 14" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
      <path d="M30 8 L34 4 M30 8 L26 4" strokeLinecap="round" />
    </svg>
  );
}
