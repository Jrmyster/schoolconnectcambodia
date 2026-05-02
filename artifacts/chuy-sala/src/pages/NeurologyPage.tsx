import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Brain,
  Eye,
  Siren,
  Inbox,
  Lightbulb,
  Network,
  Zap,
  Moon,
  Sun,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Activity,
  Workflow,
  Droplet,
  Clock,
  Hand,
  MessageSquare,
  Scale,
  HeartPulse,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Bio-Tech surface (deep midnight blue + circuit grid) ─────────────────
const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#0b1220",
  backgroundImage:
    "linear-gradient(rgba(56, 189, 248, 0.07) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(56, 189, 248, 0.07) 1px, transparent 1px), " +
    "linear-gradient(rgba(250, 204, 21, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(250, 204, 21, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};
const CARD_BG: React.CSSProperties = {
  backgroundColor: "rgba(15, 23, 42, 0.85)",
  backgroundImage:
    "linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

// Respect OS-level "reduce motion" preference — skip indefinite SMIL animations
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

function CornerMarks({ tone = "gold" }: { tone?: "gold" | "cyan" }) {
  const stroke = tone === "gold" ? "border-amber-300/60" : "border-sky-400/60";
  return (
    <>
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 ${stroke}`} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────
export function NeurologyPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6 text-slate-100" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300/80 hover:text-amber-300 transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* ── Header ────────────────────────────────────────────── */}
        <header
          className="relative overflow-hidden rounded-3xl px-6 sm:px-10 py-8 sm:py-10 mb-10 shadow-2xl border border-amber-300/20"
          style={{
            background:
              "radial-gradient(circle at 20% 0%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 80% 100%, rgba(250,204,21,0.14), transparent 55%), #0b1220",
            backgroundSize: "auto, auto, auto",
          }}
        >
          <CornerMarks tone="gold" />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-300/10 border-2 border-amber-300/60 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-[0_0_24px_rgba(252,211,77,0.35)]">
              <Brain className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-sky-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>{t("Science", "វិទ្យាសាស្ត្រ")}</span>
                <span className="opacity-50">/</span>
                <span className="text-amber-200">M-SCI-NEU</span>
              </div>
              <h1
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-amber-50 ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t("Neurology: The Universe Inside", "ប្រសាទវិទ្យា៖ សកលលោកខាងក្នុង")}
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base text-sky-100/80 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {t(
                  "1.4 kg of folded tissue, 86 billion neurons, 100 trillion connections — and it's running you right now. Tap a brain region, trace a signal across a synapse, and watch a single night of sleep reshape your memory.",
                  "ជាលិការបត់ ១.៤ គីឡូក្រាម, ណឺរ៉ូន ៨៦ ពាន់លាន, ការតភ្ជាប់ ១០០ ពាន់ពាន់លាន — ហើយវាកំពុងដំណើរការអ្នកនៅពេលនេះ។ ចុចលើតំបន់ខួរ តាមដានសញ្ញាឆ្លងកាត់ស៊ីណាប និងមើលការគេងមួយយប់រៀបចំការចងចាំរបស់អ្នកឡើងវិញ។"
                )}
              </p>
            </div>
          </div>
        </header>

        {/* ── 1. Geography of the Brain ────────────────────────── */}
        <SectionTitle
          en="The geography of the brain"
          kh="ភូមិសាស្ត្រខួរក្បាល"
          numberLabel="01"
          icon={Brain}
        />
        <p className={`text-sm sm:text-base text-sky-100/80 leading-relaxed mb-5 max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Tap a glowing region on the brain map to read its job. Different regions specialise — but they all talk to each other constantly.",
            "ចុចលើតំបន់ភ្លឺនៅលើផែនទីខួរក្បាល ដើម្បីអានតួនាទីរបស់វា។ តំបន់នីមួយៗមានឯកទេសរៀងៗខ្លួន — តែពួកវាទាំងអស់និយាយគ្នាជាប់រហូត។"
          )}
        </p>
        <BrainMap kh={kh} t={t} />

        {/* ── 2. Neural Network ────────────────────────────────── */}
        <SectionTitle
          en="The neural network — your living wiring"
          kh="បណ្តាញប្រសាទ — ខ្សែភ្ជាប់ជីវិត"
          numberLabel="02"
          icon={Network}
        />
        <NeuralWiring kh={kh} t={t} />
        <NeuroplasticityCallout kh={kh} t={t} />

        {/* ── 3. Sleep ─────────────────────────────────────────── */}
        <SectionTitle
          en="The science of sleep — the brain's 'save' button"
          kh="វិទ្យាសាស្ត្រនៃការគេង — ប៊ូតុង 'រក្សាទុក' របស់ខួរក្បាល"
          numberLabel="03"
          icon={Moon}
        />
        <SleepCycle kh={kh} t={t} />
        <AllNighterWarning kh={kh} t={t} />

        {/* ── 4. When the Engine Stalls — Neurological Disorders ─ */}
        <SectionTitle
          en="When the engine stalls — neurological disorders"
          kh="នៅពេលខួរក្បាលមានបញ្ហា — ជំងឺសរសៃប្រសាទ"
          numberLabel="04"
          icon={AlertTriangle}
        />
        <p className={`text-sm sm:text-base text-sky-100/80 leading-relaxed mb-5 max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Even the most remarkable engine can break. Knowing the early signs of these four common disorders can save a parent, a grandparent, or a neighbour — and in the case of stroke, every minute counts.",
            "សូម្បីតែម៉ាស៊ីនដ៏អស្ចារ្យបំផុតក៏អាចខូចបានដែរ។ ការដឹងពីសញ្ញាដំបូងនៃជំងឺទូទៅទាំងបួននេះ អាចសង្គ្រោះឪពុកម្ដាយ ជីដូនជីតា ឬអ្នកជិតខាងបាន — ហើយសម្រាប់ជំងឺដាច់សរសៃខួរក្បាល រាល់នាទីសុទ្ធតែសំខាន់។"
          )}
        </p>
        <DisordersGrid kh={kh} t={t} />
        <BeFastCallout kh={kh} t={t} />

        {/* footer crumbs */}
        <div className="mt-12 pt-6 border-t border-dashed border-sky-300/20 flex flex-wrap items-center justify-between gap-3 text-xs text-sky-300/60 font-mono">
          <span className="uppercase tracking-widest">M-SCI-NEU · {t("Sheet 1 / 1", "សន្លឹក ១ / ១")}</span>
          <span className="uppercase tracking-widest">{t("Bio-Tech log · Chouy Sala", "កំណត់ហេតុជីវ-បច្ចេកវិទ្យា · ជួយសាលា")}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Section title (dark variant)
// ─────────────────────────────────────────────────────────────────────────
function SectionTitle({
  en,
  kh,
  numberLabel,
  icon: Icon,
}: {
  en: string;
  kh: string;
  numberLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  return (
    <div className="flex items-center gap-3 mb-4 mt-2">
      <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-[0_0_18px_rgba(252,211,77,0.5)]">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-sky-300/80 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {language === "kh" ? `ផ្នែក ${numberLabel}` : `Section ${numberLabel}`}
        </div>
        <h2 className={`text-lg sm:text-xl md:text-2xl font-bold text-amber-50 leading-tight ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h2>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 1. Brain map
// ─────────────────────────────────────────────────────────────────────────
type RegionKey = "frontal" | "occipital" | "amygdala" | "hippocampus";

type Region = {
  key: RegionKey;
  nameEn: string;
  nameKh: string;
  nicknameEn: string;
  nicknameKh: string;
  jobEn: string;
  jobKh: string;
  exampleEn: string;
  exampleKh: string;
  icon: React.ComponentType<{ className?: string }>;
  // SVG hotspot — ellipse on a side-view brain
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  color: string;
  glow: string;
  link?: { href: string; labelEn: string; labelKh: string };
};

const REGIONS: Region[] = [
  {
    key: "frontal",
    nameEn: "Frontal Lobe",
    nameKh: "ផ្នែកខាងមុខ",
    nicknameEn: "The Boardroom",
    nicknameKh: "បន្ទប់ប្រជុំ",
    jobEn: "Logic, decision-making, planning, and self-control. The last region of the brain to fully mature (around age 25).",
    jobKh: "តក្កវិជ្ជា ការសម្រេចចិត្ត ការរៀបចំផែនការ និងការគ្រប់គ្រងខ្លួនឯង។ ផ្នែកចុងក្រោយដែលពេញវ័យ (ប្រហែលអាយុ ២៥ ឆ្នាំ)។",
    exampleEn: "Choosing to study tonight instead of scrolling — that 'choice' lives in the frontal lobe.",
    exampleKh: "សម្រេចរៀននៅយប់នេះជំនួសការអូសទូរស័ព្ទ — 'ជម្រើស' នោះរស់នៅក្នុងផ្នែកខាងមុខ។",
    icon: Lightbulb,
    cx: 120,
    cy: 110,
    rx: 60,
    ry: 50,
    color: "#fbbf24",
    glow: "drop-shadow(0 0 8px rgba(251,191,36,0.85))",
  },
  {
    key: "occipital",
    nameEn: "Occipital Lobe",
    nameKh: "ផ្នែកខាងក្រោយ",
    nicknameEn: "The Display Driver",
    nicknameKh: "កម្មវិធីបង្ហាញ",
    jobEn: "Processes everything your eyes send back: colour, motion, shape, and depth — the brain's GPU.",
    jobKh: "ដំណើរការអ្វីៗដែលភ្នែករបស់អ្នកផ្ញើមកវិញ៖ ពណ៌ ចលនា រូបរាង និងជម្រៅ — GPU នៃខួរក្បាល។",
    exampleEn: "When you watch a video game render a 3D world, your occipital lobe is what builds the scene from raw light.",
    exampleKh: "ពេលអ្នកមើលហ្គេមបង្ហាញពិភព 3D ផ្នែកខាងក្រោយរបស់អ្នកគឺជាអ្នកសាងសង់ឆាកនោះពីពន្លឺឆៅ។",
    icon: Eye,
    cx: 320,
    cy: 175,
    rx: 50,
    ry: 42,
    color: "#38bdf8",
    glow: "drop-shadow(0 0 8px rgba(56,189,248,0.85))",
    link: { href: "/video-games", labelEn: "See: how a GPU paints pixels →", labelKh: "មើល៖ របៀបដែល GPU គូរភីកសែល →" },
  },
  {
    key: "amygdala",
    nameEn: "Amygdala",
    nameKh: "អាមីដាល់",
    nicknameEn: "The Alarm System",
    nicknameKh: "ប្រព័ន្ធរោទ៍",
    jobEn: "Two almond-shaped clusters that fire fear and emotion. Faster than your conscious mind — that's why you flinch before you 'decide' to.",
    jobKh: "ក្រុមរូបរាងគ្រាប់ល្អង់ពីរ ដែលបញ្ចេញការភ័យខ្លាច និងអារម្មណ៍។ លឿនជាងគំនិតដឹងខ្លួន — នេះហើយជាមូលហេតុដែលអ្នកញាប់មុនពេលអ្នក 'សម្រេច' ធ្វើ។",
    exampleEn: "Hearing a snake-shaped stick on a dark path: amygdala fires → adrenaline → you freeze, all before you 'see' it's a stick.",
    exampleKh: "ពេលឃើញដំបងរូបរាងពស់នៅផ្លូវងងឹត៖ អាមីដាល់បាញ់ → អាដ្រេណាលីន → អ្នកឈប់ស្ងៀម មុនអ្នក 'ឃើញ' វាជាដំបង។",
    icon: Siren,
    cx: 200,
    cy: 195,
    rx: 22,
    ry: 18,
    color: "#f87171",
    glow: "drop-shadow(0 0 8px rgba(248,113,113,0.85))",
  },
  {
    key: "hippocampus",
    nameEn: "Hippocampus",
    nameKh: "ហ៊ីប៉ូកាំប",
    nicknameEn: "The Inbox",
    nicknameKh: "ប្រអប់សារ",
    jobEn: "Catches new short-term memories and decides which ones to keep. Without it, today would never become 'yesterday'.",
    jobKh: "ចាប់យកការចងចាំខ្លីថ្មីៗ ហើយសម្រេចថាមួយណាត្រូវរក្សាទុក។ បើគ្មានវា ថ្ងៃនេះនឹងមិនអាចក្លាយជា 'ម្សិលមិញ' ឡើយ។",
    exampleEn: "The name of your new classmate sits here for hours — sleep then files it into long-term storage.",
    exampleKh: "ឈ្មោះរបស់មិត្តរួមថ្នាក់ថ្មីរបស់អ្នកស្ថិតនៅទីនេះច្រើនម៉ោង — ការគេងបន្ទាប់មកដាក់វាចូលឃ្លាំងរយៈពេលវែង។",
    icon: Inbox,
    cx: 240,
    cy: 200,
    rx: 22,
    ry: 16,
    color: "#a78bfa",
    glow: "drop-shadow(0 0 8px rgba(167,139,250,0.85))",
  },
];

function BrainMap({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  const [active, setActive] = useState<RegionKey>("frontal");
  const region = REGIONS.find((r) => r.key === active)!;
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="grid md:grid-cols-[1fr_minmax(0,360px)] gap-5 mb-10">
      {/* Brain SVG */}
      <article className="relative rounded-2xl border border-sky-400/30 shadow-lg overflow-hidden p-4" style={CARD_BG}>
        <CornerMarks tone="cyan" />
        <div className="relative">
          <svg viewBox="0 0 420 280" className="w-full h-auto" role="img" aria-label={t("Brain map", "ផែនទីខួរក្បាល")}>
            <defs>
              <radialGradient id="brain-fill" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>
              <pattern id="brain-grid" width="14" height="14" patternUnits="userSpaceOnUse">
                <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* baseline */}
            <line x1="40" y1="245" x2="380" y2="245" stroke="rgba(148,163,184,0.3)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="40" y="262" fontSize="9" fontFamily="monospace" fill="rgba(148,163,184,0.7)">
              {kh ? "ទិដ្ឋភាពចំហៀង" : "LATERAL VIEW"}
            </text>

            {/* brain silhouette (cerebrum + cerebellum + brainstem) */}
            <path
              d="M 70 140 C 60 80, 130 50, 200 55 C 280 50, 360 80, 360 150 C 360 200, 320 235, 250 235 L 200 235 C 180 235, 170 245, 155 240 L 110 235 C 80 230, 70 200, 70 140 Z"
              fill="url(#brain-fill)"
              stroke="rgba(56,189,248,0.6)"
              strokeWidth="1.5"
            />
            <path
              d="M 70 140 C 60 80, 130 50, 200 55 C 280 50, 360 80, 360 150 C 360 200, 320 235, 250 235 L 200 235 C 180 235, 170 245, 155 240 L 110 235 C 80 230, 70 200, 70 140 Z"
              fill="url(#brain-grid)"
            />

            {/* central sulcus + lobe lines (cosmetic) */}
            <path d="M 180 60 C 175 110, 175 160, 200 220" fill="none" stroke="rgba(56,189,248,0.35)" strokeWidth="1" strokeDasharray="2 3" />
            <path d="M 90 150 C 150 145, 220 145, 320 150" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1" strokeDasharray="2 3" />

            {/* cerebellum bump */}
            <path d="M 290 215 C 300 195, 340 195, 348 220 C 345 235, 305 240, 290 230 Z" fill="#0f172a" stroke="rgba(56,189,248,0.4)" strokeWidth="1" />
            <text x="319" y="222" fontSize="8" fontFamily="monospace" fill="rgba(148,163,184,0.6)" textAnchor="middle">cerebellum</text>

            {/* brainstem */}
            <path d="M 215 235 L 215 268 L 230 268 L 230 235 Z" fill="#0f172a" stroke="rgba(56,189,248,0.4)" strokeWidth="1" />

            {/* hotspots — keyboard accessible */}
            {REGIONS.map((r) => {
              const isActive = active === r.key;
              const label = kh ? r.nameKh : r.nameEn;
              const onActivate = () => setActive(r.key);
              return (
                <g
                  key={r.key}
                  role="button"
                  tabIndex={0}
                  aria-label={label}
                  aria-pressed={isActive}
                  onClick={onActivate}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onActivate();
                    }
                  }}
                  className="focus:outline-none focus-visible:[&>ellipse]:stroke-white"
                  style={{ cursor: "pointer" }}
                >
                  {/* outer pulse halo when active (skipped when reduced-motion) */}
                  {isActive && (
                    <ellipse
                      cx={r.cx}
                      cy={r.cy}
                      rx={r.rx + 6}
                      ry={r.ry + 6}
                      fill="none"
                      stroke={r.color}
                      strokeWidth="1.5"
                      opacity={reducedMotion ? 0.4 : 0.5}
                      style={{ filter: r.glow }}
                    >
                      {!reducedMotion && (
                        <>
                          <animate attributeName="rx" values={`${r.rx + 4};${r.rx + 10};${r.rx + 4}`} dur="2.4s" repeatCount="indefinite" />
                          <animate attributeName="ry" values={`${r.ry + 4};${r.ry + 10};${r.ry + 4}`} dur="2.4s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.4s" repeatCount="indefinite" />
                        </>
                      )}
                    </ellipse>
                  )}
                  <ellipse
                    cx={r.cx}
                    cy={r.cy}
                    rx={r.rx}
                    ry={r.ry}
                    fill={r.color}
                    fillOpacity={isActive ? 0.45 : 0.18}
                    stroke={r.color}
                    strokeWidth={isActive ? 2.5 : 1.25}
                    style={{ filter: isActive ? r.glow : "none" }}
                  >
                    <title>{label}</title>
                  </ellipse>
                  <text
                    x={r.cx}
                    y={r.cy + 3}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill={isActive ? "#fff" : r.color}
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    {r.key === "amygdala" ? "AMG" : r.key === "hippocampus" ? "HIP" : r.key === "frontal" ? "FRONT" : "OCC"}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* button row (also keyboard accessible) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            {REGIONS.map((r) => {
              const isActive = active === r.key;
              const Icon = r.icon;
              return (
                <button
                  key={r.key}
                  onClick={() => setActive(r.key)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                    isActive
                      ? "bg-amber-300/15 border-amber-300/70 text-amber-200 shadow-[0_0_12px_rgba(252,211,77,0.35)]"
                      : "bg-slate-900/60 border-sky-400/20 text-sky-200/80 hover:border-sky-400/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className={`truncate ${kh ? "font-khmer text-[11px]" : ""}`}>
                    {kh ? r.nameKh : r.nameEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </article>

      {/* Detail panel */}
      <article className="relative rounded-2xl border border-amber-300/40 shadow-lg overflow-hidden" style={CARD_BG}>
        <CornerMarks tone="gold" />
        <div className="relative p-5">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-11 h-11 rounded-xl border-2 flex items-center justify-center"
              style={{ borderColor: region.color, color: region.color, backgroundColor: "rgba(15,23,42,0.6)" }}
            >
              <region.icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className={`text-[10px] font-mono uppercase tracking-widest text-sky-300/70 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Region", "តំបន់")}
              </div>
              <h3 className={`text-lg font-bold text-amber-50 leading-tight ${kh ? "font-khmer" : ""}`}>
                {kh ? region.nameKh : region.nameEn}
              </h3>
              <div className={`text-xs italic text-sky-200/70 ${kh ? "font-khmer not-italic" : ""}`}>
                {kh ? `«${region.nicknameKh}»` : `"${region.nicknameEn}"`}
              </div>
            </div>
          </div>

          <p className={`text-sm text-sky-100/90 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? region.jobKh : region.jobEn}
          </p>

          <div className="border-t border-dashed border-sky-300/20 pt-3">
            <div className={`text-[10px] font-mono uppercase tracking-widest text-amber-300/80 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Real-life moment", "ឧទាហរណ៍ជីវិតពិត")}
            </div>
            <p className={`text-sm text-sky-100/80 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? region.exampleKh : region.exampleEn}
            </p>
          </div>

          {region.link && (
            <Link
              href={region.link.href}
              className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors ${kh ? "font-khmer" : ""}`}
            >
              {kh ? region.link.labelKh : region.link.labelEn}
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 2. Neural wiring + neuroplasticity
// ─────────────────────────────────────────────────────────────────────────
function NeuralWiring({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  const reducedMotion = usePrefersReducedMotion();
  const parts: {
    nameEn: string;
    nameKh: string;
    roleEn: string;
    roleKh: string;
    descEn: string;
    descKh: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: string;
  }[] = [
    {
      nameEn: "Neuron",
      nameKh: "ណឺរ៉ូន",
      roleEn: "The wire",
      roleKh: "ខ្សែ",
      descEn: "A single brain cell. Receives signals on its branches (dendrites), runs them down its body, and out the cable.",
      descKh: "កោសិកាខួរក្បាលមួយ។ ទទួលសញ្ញានៅលើមែករបស់វា (ដេនឌ្រីត) រត់តាមរាងកាយ ហើយចេញតាមខ្សែ។",
      icon: Workflow,
      accent: "text-sky-300 border-sky-400/60",
    },
    {
      nameEn: "Axon",
      nameKh: "អាក់សុង",
      roleEn: "The transmitter",
      roleKh: "អ្នកបញ្ជូន",
      descEn: "The long cable. An electrical pulse races down it at up to 120 m/s — faster than a motorbike on the highway.",
      descKh: "ខ្សែវែង។ ចលនាអគ្គិសនីរត់ចុះវាល្បឿនរហូតដល់ ១២០ ម៉ែត្រ/វិនាទី — លឿនជាងម៉ូតូលើផ្លូវធំ។",
      icon: Zap,
      accent: "text-amber-300 border-amber-300/70",
    },
    {
      nameEn: "Synapse",
      nameKh: "ស៊ីណាប",
      roleEn: "The microscopic gap",
      roleKh: "ចន្លោះមីក្រូទស្សន៍",
      descEn: "The signal can't jump electrically. Tiny chemical messengers (neurotransmitters) cross a gap 20 nanometres wide — and the next neuron fires.",
      descKh: "សញ្ញាមិនអាចលោតដោយអគ្គិសនីបានទេ។ សារធាតុគីមីតូចៗ (neurotransmitter) ឆ្លងកាត់ចន្លោះធំ ២០ ណាណូម៉ែត្រ — ហើយណឺរ៉ូនបន្ទាប់បាញ់។",
      icon: Sparkles,
      accent: "text-violet-300 border-violet-300/60",
    },
  ];

  return (
    <div className="mb-6">
      {/* Animated synapse diagram */}
      <article className="relative rounded-2xl border border-sky-400/30 shadow-lg overflow-hidden p-5 mb-5" style={CARD_BG}>
        <CornerMarks tone="cyan" />
        <div className="relative">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-sky-300/70 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Live diagram — signal across a synapse", "តារាងផ្ទាល់ — សញ្ញាឆ្លងកាត់ស៊ីណាប")}
          </div>
          <svg viewBox="0 0 480 160" className="w-full h-auto" role="img" aria-label={t("Synapse diagram", "តារាងស៊ីណាប")}>
            <defs>
              <linearGradient id="axon-grad" x1="0" x2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <radialGradient id="neuron-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>
            </defs>

            {/* Neuron A */}
            <circle cx="60" cy="80" r="34" fill="url(#neuron-fill)" stroke="#38bdf8" strokeWidth="1.5" />
            {/* dendrites */}
            <g stroke="#38bdf8" strokeWidth="1.25" fill="none" opacity="0.85">
              <path d="M 40 50 L 25 30" />
              <path d="M 30 70 L 8 60" />
              <path d="M 30 95 L 8 105" />
              <path d="M 45 110 L 30 130" />
            </g>
            <text x="60" y="84" fontSize="10" fontFamily="monospace" fill="#fff" textAnchor="middle" fontWeight="bold">A</text>

            {/* Axon (cable) */}
            <line x1="94" y1="80" x2="290" y2="80" stroke="url(#axon-grad)" strokeWidth="6" strokeLinecap="round" />
            {/* myelin sheath blocks */}
            {[120, 170, 220, 260].map((x) => (
              <rect key={x} x={x - 12} y={70} width="24" height="20" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.95" />
            ))}

            {/* electrical pulse */}
            <circle cx={reducedMotion ? 200 : 100} cy="80" r="6" fill="#fde68a">
              {!reducedMotion && (
                <>
                  <animate attributeName="cx" values="100;290;100" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0;1" dur="2.6s" repeatCount="indefinite" />
                </>
              )}
            </circle>

            {/* Synapse gap */}
            <line x1="294" y1="55" x2="294" y2="105" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="318" y1="55" x2="318" y2="105" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
            <text x="306" y="42" fontSize="9" fontFamily="monospace" fill="#fbbf24" textAnchor="middle">SYNAPSE</text>
            <text x="306" y="125" fontSize="8" fontFamily="monospace" fill="#fbbf24" textAnchor="middle">~20 nm</text>

            {/* neurotransmitter dots crossing */}
            {[0, 0.3, 0.6, 0.9].map((delay, i) => (
              <circle key={i} cx={reducedMotion ? 306 : 296} cy={70 + i * 6} r="2.2" fill="#a78bfa" opacity={reducedMotion ? 0.85 : undefined}>
                {!reducedMotion && (
                  <>
                    <animate attributeName="cx" values="296;316" dur="0.9s" begin={`${delay}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;0" dur="0.9s" begin={`${delay}s`} repeatCount="indefinite" />
                  </>
                )}
              </circle>
            ))}

            {/* Neuron B */}
            <circle cx="380" cy="80" r="34" fill="url(#neuron-fill)" stroke="#fbbf24" strokeWidth="1.5" />
            <g stroke="#fbbf24" strokeWidth="1.25" fill="none" opacity="0.85">
              <path d="M 360 50 L 345 30" />
              <path d="M 414 70 L 436 60" />
              <path d="M 414 95 L 436 105" />
              <path d="M 395 110 L 410 130" />
            </g>
            <text x="380" y="84" fontSize="10" fontFamily="monospace" fill="#fff" textAnchor="middle" fontWeight="bold">B</text>
          </svg>
        </div>
      </article>

      {/* Three concept cards */}
      <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
        {parts.map((p) => {
          const Icon = p.icon;
          return (
            <article key={p.nameEn} className={`relative rounded-2xl border ${p.accent} shadow-md overflow-hidden p-5`} style={CARD_BG}>
              <CornerMarks tone="cyan" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg border-2 ${p.accent} bg-slate-900/70 flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-[10px] font-mono uppercase tracking-widest text-sky-300/70 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                      {kh ? p.roleKh : p.roleEn}
                    </div>
                    <div className={`font-bold text-amber-50 ${kh ? "font-khmer" : ""}`}>
                      {kh ? p.nameKh : p.nameEn}
                    </div>
                  </div>
                </div>
                <p className={`text-sm text-sky-100/85 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                  {kh ? p.descKh : p.descEn}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function NeuroplasticityCallout({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  return (
    <article
      className="relative rounded-2xl border-2 border-amber-300/60 shadow-lg overflow-hidden mb-10"
      style={{
        background:
          "radial-gradient(circle at 0% 0%, rgba(250,204,21,0.18), transparent 60%), rgba(15,23,42,0.92)",
      }}
    >
      <CornerMarks tone="gold" />
      <div className="relative p-5 sm:p-6 grid md:grid-cols-[64px_1fr] gap-4">
        <div className="w-14 h-14 rounded-xl border-2 border-amber-300/70 bg-slate-900/70 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_rgba(252,211,77,0.4)]">
          <RefreshCw className="w-6 h-6" />
        </div>
        <div>
          <div className={`text-[10px] font-mono uppercase tracking-widest text-amber-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Big idea", "គំនិតធំ")}
          </div>
          <h3 className={`text-xl font-bold text-amber-50 mb-2 ${kh ? "font-khmer" : ""}`}>
            {t(
              "Neuroplasticity — neurons that fire together, wire together",
              "ភាពបត់បែនប្រសាទ — ណឺរ៉ូនដែលបាញ់ជាមួយគ្នា ភ្ជាប់ជាមួយគ្នា"
            )}
          </h3>
          <p className={`text-sm sm:text-base text-sky-100/85 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Every time two neurons fire at the same moment, the synapse between them gets a tiny bit stronger. Practise a Khmer–English vocab pair ten times tonight and the wire physically thickens — myelin grows, receptors multiply. The brain you wake up with tomorrow is literally not the same shape as the one you have now.",
              "រៀងរាល់ពេលណឺរ៉ូនពីរបាញ់នៅពេលតែមួយ ស៊ីណាបរវាងពួកវាខ្លាំងឡើងបន្តិច។ អនុវត្តគូពាក្យខ្មែរ–អង់គ្លេសដប់ដងនៅយប់នេះ ខ្សែកនឹងក្រាស់ឡើងពិតៗ — myelin លូតលាស់ ទទួលច្រើន។ ខួរក្បាលដែលអ្នកភ្ញាក់ស្អែក គឺពិតជាមិនមានរូបរាងដូចគ្នានឹងខួរក្បាលដែលអ្នកមាននៅឥឡូវនេះទេ។"
            )}
          </p>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-300/15 border border-amber-300/40 text-amber-200 text-xs font-bold ${kh ? "font-khmer" : ""}`}>
            <Lightbulb className="w-3.5 h-3.5" />
            {t("Practice = physical change", "ការអនុវត្ត = ការផ្លាស់ប្តូររាងកាយ")}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 3. Sleep cycle + warning
// ─────────────────────────────────────────────────────────────────────────
function SleepCycle({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  const stages: {
    nameEn: string;
    nameKh: string;
    tagEn: string;
    tagKh: string;
    descEn: string;
    descKh: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bar: number; // depth 0..100
  }[] = [
    {
      nameEn: "Light Sleep",
      nameKh: "ដំណេកស្រាល",
      tagEn: "Stages 1–2 · ~50% of the night",
      tagKh: "ដំណាក់កាល ១–២ · ~៥០% នៃយប់",
      descEn: "The brain disconnects from the senses. Heart rate slows, muscles relax. You can still be woken easily.",
      descKh: "ខួរក្បាលផ្តាច់ខ្លួនពីប្រសាទ។ បេះដូងវាយយឺត សាច់ដុំបន្ធូរ។ អ្នកនៅតែអាចឱ្យដាស់បានយ៉ាងងាយ។",
      icon: Moon,
      color: "#60a5fa",
      bar: 35,
    },
    {
      nameEn: "Deep Sleep (Slow-Wave)",
      nameKh: "ដំណេកជ្រៅ (រលកយឺត)",
      tagEn: "Stage 3 · ~20% of the night",
      tagKh: "ដំណាក់កាល ៣ · ~២០% នៃយប់",
      descEn: "Physical repair shift: growth hormone is released, the immune system reloads, and the brain literally washes toxins away through the glymphatic system.",
      descKh: "វេនជួសជុលរូបរាង ៖ អ័រម៉ូនលូតលាស់បញ្ចេញ ប្រព័ន្ធការពាររាងកាយផ្ទុកសាជាថ្មី ហើយខួរក្បាលលាងសារធាតុពុលចេញតាមរយៈប្រព័ន្ធ glymphatic ពិតៗ។",
      icon: Activity,
      color: "#a78bfa",
      bar: 90,
    },
    {
      nameEn: "REM Sleep (Dreaming)",
      nameKh: "REM (សុបិន)",
      tagEn: "Rapid Eye Movement · ~25% of the night",
      tagKh: "ចលនាភ្នែកលឿន · ~២៥% នៃយប់",
      descEn: "Eyes dart, body is paralysed, brain fires almost as hard as when awake. Today's lessons are sorted, tagged, and moved from the hippocampus 'inbox' into long-term memory. Emotions get processed.",
      descKh: "ភ្នែកញ័រលឿន រាងកាយត្រូវបានបង្កក ខួរក្បាលបាញ់ស្ទើរតែខ្លាំងដូចពេលភ្ញាក់។ មេរៀនរបស់ថ្ងៃនេះត្រូវបានរៀបចំ ដាក់ស្លាក និងផ្លាស់ពី 'ប្រអប់សារ' ហ៊ីប៉ូកាំប ទៅជាការចងចាំរយៈពេលវែង។ អារម្មណ៍ត្រូវបានដំណើរការ។",
      icon: Sun,
      color: "#fbbf24",
      bar: 55,
    },
  ];

  return (
    <article className="relative rounded-2xl border border-sky-400/30 shadow-lg overflow-hidden mb-5" style={CARD_BG}>
      <CornerMarks tone="cyan" />
      <div className="relative p-5 sm:p-6">
        <div className={`text-[10px] font-mono uppercase tracking-widest text-sky-300/70 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {t("One full cycle ≈ 90 minutes · repeats 4–5 times per night", "វដ្តពេញមួយ ≈ ៩០ នាទី · ធ្វើម្តងទៀត ៤–៥ ដងក្នុងមួយយប់")}
        </div>
        <h3 className={`text-lg font-bold text-amber-50 mb-4 ${kh ? "font-khmer" : ""}`}>
          {t("The sleep cycle timeline", "វិមាត្រវដ្តគេង")}
        </h3>

        {/* mini wave graph */}
        <div className="rounded-xl bg-slate-900/70 border border-sky-400/20 p-3 mb-5">
          <svg viewBox="0 0 360 110" className="w-full h-auto" role="img" aria-label={t("Sleep depth graph", "ក្រាហ្វជម្រៅគេង")}>
            <defs>
              <pattern id="sleep-grid" width="30" height="20" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 20" fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="20" y="10" width="330" height="80" fill="url(#sleep-grid)" />
            {/* axis */}
            <line x1="20" y1="90" x2="350" y2="90" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
            <text x="20" y="105" fontSize="9" fontFamily="monospace" fill="rgba(148,163,184,0.7)">{kh ? "ភ្ញាក់" : "AWAKE"}</text>
            <text x="350" y="105" fontSize="9" fontFamily="monospace" fill="rgba(148,163,184,0.7)" textAnchor="end">90 min</text>
            <text x="8" y="14" fontSize="9" fontFamily="monospace" fill="rgba(148,163,184,0.7)">↓</text>
            <text x="8" y="92" fontSize="9" fontFamily="monospace" fill="rgba(148,163,184,0.7)" transform="rotate(-90 8 92)">DEPTH</text>
            {/* sleep curve */}
            <path
              d="M 20 20 L 60 30 L 100 75 L 150 80 L 190 60 L 230 25 L 270 30 L 310 75 L 350 80"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* REM band highlight */}
            <rect x="190" y="18" width="50" height="14" fill="rgba(251,191,36,0.25)" stroke="#fbbf24" strokeWidth="0.8" />
            <text x="215" y="11" fontSize="8" fontFamily="monospace" fill="#fbbf24" textAnchor="middle">REM</text>
            {/* deep band highlight */}
            <rect x="80" y="68" width="80" height="14" fill="rgba(167,139,250,0.25)" stroke="#a78bfa" strokeWidth="0.8" />
            <text x="120" y="100" fontSize="8" fontFamily="monospace" fill="#a78bfa" textAnchor="middle">DEEP</text>
          </svg>
        </div>

        {/* stage cards */}
        <ol className="space-y-3 sm:space-y-4">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.nameEn} className="relative rounded-xl border border-slate-700 bg-slate-900/70 p-4 overflow-hidden">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border-2"
                    style={{ borderColor: s.color, color: s.color, backgroundColor: "rgba(15,23,42,0.6)" }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1">
                      <span className={`text-[10px] font-mono uppercase tracking-widest text-sky-300/70 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                        {`${kh ? "ជំហាន" : "Stage"} 0${i + 1}`}
                      </span>
                      <h4 className={`font-bold text-amber-50 ${kh ? "font-khmer" : ""}`}>{kh ? s.nameKh : s.nameEn}</h4>
                      <span className={`text-[11px] text-sky-200/60 ${kh ? "font-khmer text-xs" : ""}`}>{kh ? s.tagKh : s.tagEn}</span>
                    </div>
                    {/* depth bar */}
                    <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden mb-2">
                      <div className="h-full rounded-full" style={{ width: `${s.bar}%`, background: s.color }} />
                    </div>
                    <p className={`text-sm text-sky-100/85 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {kh ? s.descKh : s.descEn}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </article>
  );
}

function AllNighterWarning({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  return (
    <article
      className="relative rounded-2xl border-2 border-rose-400/60 shadow-lg overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 100% 0%, rgba(244,63,94,0.20), transparent 55%), rgba(15,23,42,0.92)",
      }}
    >
      <CornerMarks tone="gold" />
      <div className="relative p-5 sm:p-6 grid md:grid-cols-[64px_1fr] gap-4">
        <div className="w-14 h-14 rounded-xl border-2 border-rose-400/70 bg-slate-900/70 text-rose-300 flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_rgba(244,63,94,0.35)]">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <div className={`text-[10px] font-mono uppercase tracking-widest text-rose-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Warning — exam-week myth-buster", "ការព្រមាន — បំបាត់ការយល់ច្រឡំសប្តាហ៍ប្រឡង")}
          </div>
          <h3 className={`text-xl font-bold text-amber-50 mb-2 ${kh ? "font-khmer" : ""}`}>
            {t("Pulling an 'all-nighter' destroys what you studied", "ការ 'អត់គេងពេញមួយយប់' បំផ្លាញអ្វីដែលអ្នកបានរៀន")}
          </h3>
          <p className={`text-sm sm:text-base text-sky-100/85 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Without sleep, the hippocampus 'inbox' overflows and never gets emptied into long-term storage. Studies show that one night of zero sleep can drop next-day recall by up to 40%. The lesson is brutal: 6 hours of study + 8 hours of sleep beats 14 hours of cramming. Sleep is not the opposite of studying — it is part of studying.",
              "បើគ្មានការគេង ប្រអប់សារហ៊ីប៉ូកាំបនឹងហៀរ ហើយមិនត្រូវបានលុបចូលឃ្លាំងរយៈពេលវែងឡើយ។ ការសិក្សាបង្ហាញថា មួយយប់នៃការគ្មានគេង អាចបន្ថយការរំលឹកថ្ងៃបន្ទាប់រហូតដល់ ៤០%។ មេរៀនគឺឃោរឃៅ ៖ ការរៀន ៦ ម៉ោង + ការគេង ៨ ម៉ោង ឈ្នះការដាក់ខួរ ១៤ ម៉ោង។ ការគេងមិនមែនជាបដិបក្ខនៃការរៀនទេ — វាជាផ្នែកមួយនៃការរៀន។"
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 4. Neurological disorders — grid of 4 + B.E. F.A.S.T. callout
// ─────────────────────────────────────────────────────────────────────────

type Disorder = {
  key: "parkinson" | "alzheimer" | "epilepsy" | "stroke";
  nameEn: string;
  nameKh: string;
  tagEn: string;
  tagKh: string;
  anatomyEn: string;
  anatomyKh: string;
  signs: { en: string; kh: string }[];
  icon: React.ComponentType<{ className?: string }>;
  accent: string; // hex color for icon + accent
  glow: string; // matching shadow color
};

const DISORDERS: Disorder[] = [
  {
    key: "parkinson",
    nameEn: "Parkinson's Disease",
    nameKh: "ជំងឺផាកិនសុន",
    tagEn: "Movement disorder",
    tagKh: "ជំងឺនៃចលនា",
    anatomyEn:
      "Deep in the midbrain sits a small region called the substantia nigra, which makes dopamine — the chemical that lets the brain start and smooth movement. In Parkinson's, those dopamine-making cells slowly die, so movement becomes stiff, slow, and shaky.",
    anatomyKh:
      "នៅជ្រៅក្នុងខួរក្បាលកណ្តាល មានតំបន់តូចមួយឈ្មោះ substantia nigra ដែលផលិតសារធាតុ dopamine — សារធាតុគីមីដែលជួយខួរក្បាលចាប់ផ្តើម និងធ្វើឱ្យចលនារលូន។ ក្នុងជំងឺផាកិនសុន កោសិកាផលិត dopamine ទាំងនោះស្លាប់បន្តិចម្តងៗ ដូច្នេះចលនាក្លាយជារឹង យឺត និងញ័រ។",
    signs: [
      {
        en: "A slow tremor in one hand or finger when at rest (often the very first sign)",
        kh: "ការញ័រយឺតៗនៅដៃ ឬម្រាមដៃម្ខាង ពេលសម្រាក (ជាញឹកញាប់ ជាសញ្ញាដំបូងបំផុត)",
      },
      {
        en: "Movement becomes slower — buttoning a shirt or eating with a spoon takes longer than before",
        kh: "ចលនាក្លាយជាយឺត — ការចាក់ឡេវអាវ ឬការបរិភោគនឹងស្លាបព្រា ប្រើពេលយូរជាងមុន",
      },
      {
        en: "Stiff, rigid arms and legs; smaller, cramped handwriting",
        kh: "ដៃជើងរឹងតឹង; ការសរសេរតូច និងតឹងបង្គ្រប់",
      },
      {
        en: "A shuffling walk and a stooped posture; loss of the natural arm-swing",
        kh: "ការដើរអូសជើង និងខ្នងកោងទៅមុខ; បាត់បង់ការយោលដៃធម្មជាតិ",
      },
    ],
    icon: Activity,
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
  },
  {
    key: "alzheimer",
    nameEn: "Alzheimer's Disease",
    nameKh: "ជំងឺអាល់ហ្សាយម័រ",
    tagEn: "Memory disorder",
    tagKh: "ជំងឺនៃការចងចាំ",
    anatomyEn:
      "Alzheimer's begins by attacking the hippocampus — the brain's 'inbox' for new memories — before spreading outward across the cortex. Abnormal proteins (amyloid plaques and tau tangles) clog the spaces between neurons until the connections themselves are lost.",
    anatomyKh:
      "ជំងឺអាល់ហ្សាយម័រ ចាប់ផ្តើមដោយវាយប្រហារហ៊ីប៉ូកាំប — 'ប្រអប់សារ' នៃខួរក្បាលសម្រាប់ការចងចាំថ្មី — មុនពេលរាលដាលចេញទៅខាងក្រៅឆ្លងកាត់សំបកខួរ។ ប្រូតេអ៊ីនមិនធម្មតា (amyloid plaques និង tau tangles) ស្ទះចន្លោះរវាងណឺរ៉ូន រហូតដល់ការតភ្ជាប់ផ្ទាល់ក៏បាត់បង់។",
    signs: [
      {
        en: "Forgetting recently learned information — asking the same question many times in one day",
        kh: "ភ្លេចព័ត៌មានដែលទើបនឹងរៀន — សួរសំណួរដដែលច្រើនដងក្នុងមួយថ្ងៃ",
      },
      {
        en: "Getting lost in familiar places, like the road home from the market",
        kh: "វង្វេងផ្លូវនៅកន្លែងធ្លាប់ស្គាល់ ដូចជាផ្លូវត្រឡប់ពីផ្សារទៅផ្ទះ",
      },
      {
        en: "Trouble finding everyday words; calling familiar objects by the wrong name",
        kh: "មានបញ្ហាក្នុងការរកពាក្យប្រចាំថ្ងៃ; ហៅឈ្មោះវត្ថុធ្លាប់ស្គាល់ខុស",
      },
      {
        en: "Big changes in mood, personality, or judgement — withdrawing from family activities",
        kh: "ការផ្លាស់ប្តូរធំៗនៃអារម្មណ៍ បុគ្គលិកលក្ខណៈ ឬការវិនិច្ឆ័យ — ដកខ្លួនពីសកម្មភាពគ្រួសារ",
      },
    ],
    icon: Inbox,
    accent: "#fbbf24",
    glow: "rgba(252,211,77,0.35)",
  },
  {
    key: "epilepsy",
    nameEn: "Epilepsy",
    nameKh: "ជំងឺអេពីឡេបស៊ី (ឆ្កួតជ្រូក)",
    tagEn: "Electrical-storm disorder",
    tagKh: "ជំងឺនៃព្យុះអគ្គិសនី",
    anatomyEn:
      "In a healthy brain, neurons fire in well-coordinated patterns. In epilepsy, large groups of neurons suddenly fire all at once in an uncontrolled electrical storm — a 'seizure'. Where that storm starts decides which body part jerks, which sense distorts, or whether the person blacks out completely.",
    anatomyKh:
      "ក្នុងខួរក្បាលធម្មតា ណឺរ៉ូនបាញ់តាមលំនាំសមស្រប។ ក្នុងជំងឺនេះ ក្រុមណឺរ៉ូនច្រើនបាញ់ភ្លាមៗព្រមគ្នាក្នុងព្យុះអគ្គិសនីដែលគ្រប់គ្រងមិនបាន — ហៅថា 'ការប្រកាច់'។ កន្លែងដែលព្យុះនោះចាប់ផ្តើមកំណត់ថា ផ្នែករាងកាយណាមួយញ័រ ប្រសាទណាមួយមានអារម្មណ៍ខុសប្រក្រតី ឬថាតើមនុស្សនោះសន្លប់ទាំងស្រុងឬអត់។",
    signs: [
      {
        en: "Sudden, uncontrolled jerking of the arms and legs — sometimes with loss of consciousness",
        kh: "ការញ័រដៃជើងភ្លាមៗ មិនអាចបញ្ឈប់បាន — ពេលខ្លះមកជាមួយការសន្លប់",
      },
      {
        en: "Brief 'absence' spells — staring blankly into space for several seconds and not responding",
        kh: "រយៈពេលខ្លី 'ដាច់សតិ' — សម្លឹងទទេច្រើនវិនាទី ហើយមិនឆ្លើយតប",
      },
      {
        en: "Strange smells, tastes, or a sudden feeling of déjà-vu just before an attack ('aura')",
        kh: "ក្លិន រសជាតិ ឬអារម្មណ៍ចម្លែកថា 'ធ្លាប់ឃើញរួចហើយ' មុនការប្រកាច់ ('aura')",
      },
      {
        en: "Confusion, deep tiredness, or sore muscles for hours afterwards",
        kh: "ភាពច្រឡំ ការអស់កម្លាំងធ្ងន់ ឬឈឺសាច់ដុំជាច្រើនម៉ោងបន្ទាប់",
      },
    ],
    icon: Zap,
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.4)",
  },
  {
    key: "stroke",
    nameEn: "Stroke",
    nameKh: "ជំងឺដាច់សរសៃខួរក្បាល",
    tagEn: "Brain emergency",
    tagKh: "ជំងឺបន្ទាន់នៃខួរក្បាល",
    anatomyEn:
      "A stroke happens when blood — and the oxygen it carries — suddenly stops reaching part of the brain, either because a vessel is blocked by a clot or because a vessel bursts. Brain tissue starts dying within minutes, so a stroke is always a race against the clock.",
    anatomyKh:
      "ជំងឺដាច់សរសៃខួរក្បាលកើតឡើង នៅពេលឈាម — និងអុកស៊ីសែនដែលវាដឹកជញ្ជូន — ឈប់ទៅដល់ផ្នែកមួយនៃខួរក្បាលភ្លាមៗ ដោយសារសរសៃត្រូវបានស្ទះដោយកំណកឈាម ឬដោយសារសរសៃបែក។ ជាលិកាខួរក្បាលចាប់ផ្តើមស្លាប់ក្នុងរយៈពេលប៉ុន្មាននាទី ដូច្នេះជំងឺនេះតែងតែជាការប្រជែងពេលវេលា។",
    signs: [
      {
        en: "Sudden numbness or weakness on one side of the body — a drooping face or a hanging arm",
        kh: "ស្ពឹក ឬខ្សោយនៅរាងកាយម្ខាងភ្លាមៗ — ផ្ទៃមុខធ្លាក់វៀច ឬដៃធ្លាក់មិនអាចលើកបាន",
      },
      {
        en: "Sudden trouble speaking or understanding what others say",
        kh: "ពិបាកនិយាយ ឬពិបាកយល់នូវអ្វីដែលអ្នកដទៃនិយាយ ភ្លាមៗ",
      },
      {
        en: "Sudden blurred or double vision in one or both eyes",
        kh: "ភ្នែកស្រវាំង ឬឃើញទ្វេភ្លាមៗ នៅភ្នែកម្ខាង ឬទាំងពីរ",
      },
      {
        en: "Sudden severe headache, dizziness, loss of balance, or trouble walking",
        kh: "ឈឺក្បាលធ្ងន់ វិលមុខ បាត់បង់តុល្យភាព ឬពិបាកដើរ ភ្លាមៗ",
      },
    ],
    icon: Droplet,
    accent: "#f87171",
    glow: "rgba(248,113,113,0.4)",
  },
];

function DisordersGrid({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
      {DISORDERS.map((d) => {
        const Icon = d.icon;
        return (
          <article
            key={d.key}
            className="relative rounded-2xl border shadow-lg overflow-hidden flex flex-col"
            style={{ ...CARD_BG, borderColor: `${d.accent}55` }}
            data-testid={`disorder-${d.key}`}
          >
            <CornerMarks tone="cyan" />
            <div className="relative p-5">
              {/* header */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-xl border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: d.accent,
                    color: d.accent,
                    backgroundColor: "rgba(15,23,42,0.65)",
                    boxShadow: `0 0 14px ${d.glow}`,
                  }}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className={`text-[10px] font-mono uppercase tracking-widest mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
                    style={{ color: d.accent, opacity: 0.85 }}
                  >
                    {kh ? d.tagKh : d.tagEn}
                  </div>
                  <h3
                    className={`text-lg font-bold text-amber-50 leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
                  >
                    {kh ? d.nameKh : d.nameEn}
                  </h3>
                  {/* opposite-language subtitle for full bilingual coverage */}
                  <div
                    className={`text-[11px] mt-0.5 text-sky-200/60 ${kh ? "" : "font-khmer"}`}
                  >
                    {kh ? d.nameEn : d.nameKh}
                  </div>
                </div>
              </div>

              {/* anatomy */}
              <p
                className={`text-sm text-sky-100/85 leading-relaxed mb-4 ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {kh ? d.anatomyKh : d.anatomyEn}
              </p>

              {/* warning signs */}
              <div className="border-t border-dashed border-sky-300/20 pt-3">
                <div
                  className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-rose-300 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t("Warning signs", "សញ្ញាព្រមាន")}</span>
                </div>
                <ul className="space-y-1.5">
                  {d.signs.map((s, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-sm text-sky-100/85 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: d.accent }}
                      />
                      <span>{kh ? s.kh : s.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

// ── B.E. F.A.S.T. — high-visibility stroke-detection callout ───────────────

type FastLetter = {
  letter: string;
  enWord: string;
  khWord: string;
  enCue: string;
  khCue: string;
  icon: React.ComponentType<{ className?: string }>;
};

const FAST_LETTERS: FastLetter[] = [
  {
    letter: "B",
    enWord: "Balance",
    khWord: "តុល្យភាព",
    enCue: "Sudden loss of balance, dizziness, or trouble walking.",
    khCue: "បាត់បង់តុល្យភាព វិលមុខ ឬពិបាកដើរភ្លាមៗ។",
    icon: Scale,
  },
  {
    letter: "E",
    enWord: "Eyes",
    khWord: "ភ្នែក",
    enCue: "Sudden blurred, double, or lost vision in one or both eyes.",
    khCue: "ភ្នែកស្រវាំង ឃើញទ្វេ ឬបាត់បង់ការមើល ភ្លាមៗ។",
    icon: Eye,
  },
  {
    letter: "F",
    enWord: "Face",
    khWord: "ផ្ទៃមុខ",
    enCue: "Ask them to smile — does one side of the face droop or feel numb?",
    khCue: "សុំឱ្យគាត់ញញឹម — តើផ្ទៃមុខម្ខាងធ្លាក់វៀច ឬស្ពឹកដែរឬទេ?",
    icon: AlertTriangle,
  },
  {
    letter: "A",
    enWord: "Arms",
    khWord: "ដៃ",
    enCue: "Ask them to raise both arms — does one arm drift downward or fall?",
    khCue: "សុំឱ្យគាត់លើកដៃទាំងពីរ — តើដៃម្ខាងធ្លាក់ចុះ ឬលើកមិនរួចទេ?",
    icon: Hand,
  },
  {
    letter: "S",
    enWord: "Speech",
    khWord: "ការនិយាយ",
    enCue: "Ask them to repeat a simple sentence — is the speech slurred or strange?",
    khCue: "សុំឱ្យគាត់និយាយប្រយោគសាមញ្ញម្តង — តើពាក្យសម្ដីច្របូកច្របល់ ឬចម្លែកដែរឬទេ?",
    icon: MessageSquare,
  },
  {
    letter: "T",
    enWord: "Time",
    khWord: "ពេលវេលា",
    enCue: "If ANY sign appears — call an ambulance and rush to the hospital NOW.",
    khCue: "បើឃើញសញ្ញាណាមួយ — ហៅឡានពេទ្យ ហើយប្រញាប់ទៅមន្ទីរពេទ្យឥឡូវនេះ!",
    icon: Clock,
  },
];

function BeFastCallout({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  return (
    <article
      className="relative rounded-2xl border-2 border-rose-400/70 shadow-lg overflow-hidden mb-10"
      style={{
        background:
          "radial-gradient(circle at 0% 0%, rgba(244,63,94,0.20), transparent 55%), radial-gradient(circle at 100% 100%, rgba(250,204,21,0.10), transparent 55%), rgba(15,23,42,0.94)",
      }}
      data-testid="be-fast-callout"
    >
      <CornerMarks tone="gold" />
      <div className="relative p-5 sm:p-6">
        {/* header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl border-2 border-rose-400/80 bg-slate-900/70 text-rose-300 flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_rgba(244,63,94,0.4)]">
            <HeartPulse className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div
              className={`text-[10px] font-mono uppercase tracking-widest text-rose-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            >
              {t("Stroke emergency · memorise this", "ជំងឺដាច់សរសៃខួរក្បាលបន្ទាន់ · ត្រូវចងចាំ")}
            </div>
            <h3
              className={`text-xl sm:text-2xl font-bold text-amber-50 leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
            >
              {t(
                "B.E. F.A.S.T. — six signs that can save a life",
                "B.E. F.A.S.T. — សញ្ញាប្រាំមួយដែលអាចសង្គ្រោះជីវិត"
              )}
            </h3>
            <p
              className={`mt-1.5 text-sm text-sky-100/85 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
            >
              {t(
                "In an untreated ischemic stroke, brain cells die at an estimated rate of nearly two million per minute. The faster a person reaches the hospital, the more of them — and more of who they are — can be saved.",
                "ក្នុងជំងឺដាច់សរសៃខួរក្បាលប្រភេទស្ទះឈាមដែលមិនបានព្យាបាល កោសិកាខួរក្បាលស្លាប់ក្នុងអត្រាប៉ាន់ស្មានជិត ២ លានកោសិកាក្នុងមួយនាទី។ កាន់តែលឿនអ្នកជំងឺទៅដល់មន្ទីរពេទ្យ កាន់តែច្រើនកោសិកា — និងកាន់តែច្រើននៃខ្លួនគាត់ — អាចត្រូវបានសង្គ្រោះ។"
              )}
            </p>
          </div>
        </div>

        {/* the 6 letters */}
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" data-testid="be-fast-letters">
          {FAST_LETTERS.map((f) => {
            const Icon = f.icon;
            const isTime = f.letter === "T";
            return (
              <li
                key={f.letter}
                className={`relative rounded-xl border p-3 sm:p-4 flex items-start gap-3 overflow-hidden ${
                  isTime
                    ? "border-rose-400/80 bg-rose-500/10"
                    : "border-rose-400/30 bg-slate-900/60"
                }`}
                data-testid={`be-fast-${f.letter.toLowerCase()}`}
              >
                {/* big letter */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 font-display font-bold text-xl sm:text-2xl ${
                    isTime
                      ? "bg-rose-500 text-white shadow-[0_0_18px_rgba(244,63,94,0.6)]"
                      : "bg-rose-500/15 text-rose-300 border border-rose-400/50"
                  }`}
                  aria-hidden="true"
                >
                  {f.letter}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon
                      className={`w-3.5 h-3.5 ${isTime ? "text-rose-200" : "text-rose-300/80"}`}
                      aria-hidden="true"
                    />
                    <h4
                      className={`text-sm sm:text-base font-bold leading-tight ${isTime ? "text-amber-50" : "text-amber-100"}`}
                    >
                      <span>{f.enWord}</span>
                      <span
                        className={`mx-1.5 ${isTime ? "text-rose-200" : "text-sky-300/60"}`}
                      >
                        ·
                      </span>
                      <span className="font-khmer font-bold">{f.khWord}</span>
                    </h4>
                  </div>
                  <p
                    className={`text-xs sm:text-[13px] ${isTime ? "text-rose-100" : "text-sky-100/80"} ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
                  >
                    {kh ? f.khCue : f.enCue}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* closing emphasis */}
        <div
          className={`mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/50 text-rose-200 text-xs font-bold ${kh ? "font-khmer" : ""}`}
        >
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          {t("Time lost = brain lost", "ពេលវេលាដែលបាត់ = ខួរក្បាលដែលបាត់")}
        </div>
      </div>
    </article>
  );
}

export default NeurologyPage;
