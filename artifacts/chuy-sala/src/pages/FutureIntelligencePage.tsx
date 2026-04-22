import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Code2,
  Globe,
  Cpu,
  Sparkles,
  Infinity as InfinityIcon,
  Bot,
  Calculator,
  Workflow,
  Wheat,
  Droplets,
  SunMedium,
  Network,
  Gauge,
  Crown,
  Atom,
  Database,
  Terminal,
  Orbit,
  Sun,
  Flame,
  Wheat as WheatIcon,
  Lightbulb,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  Telescope,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import type React from "react";

// ════════════════════════════════════════════════════════════════════════════
//  TECH-FUTURE-01 · The Future of Intelligence & Economy
//                   អនាគតនៃបញ្ញា និងសេដ្ឋកិច្ច
//
//  Futuristic / singularity aesthetic — obsidian black, electric cyan and
//  violet circuit glows, animated neural-network constellation in the hero.
//  Three tabbed chapters:
//   1 · The Ladder of Intelligence   (AI · AGI · ASI)
//   2 · The Anatomy of Software       (If/Then · Languages of Code)
//   3 · The AI-Managed Economy        (Resource-Based · World Game · Distribution)
// ════════════════════════════════════════════════════════════════════════════

// ─── Singularity palette ─────────────────────────────────────────────────
const BG       = "#04060d";
const PANEL    = "#0a0e1c";
const PANEL_2  = "#0d1326";
const GRID     = "#16203b";
const INK      = "#dbe6ff";
const INK_SOFT = "#8aa0c8";
const CYAN     = "#22d3ee";
const VIOLET   = "#a855f7";
const MAGENTA  = "#f472b6";
const LIME     = "#84cc16";
const AMBER    = "#fbbf24";
const ROSE     = "#fb7185";

// Khmer numerals
const KH_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
function toKhNum(n: number | string): string {
  return String(n).replace(/[0-9]/g, (d) => KH_DIGITS[Number(d)]);
}

// ─── Layout primitives ───────────────────────────────────────────────────

function P({
  k,
  en,
  kh,
  className,
}: {
  k: boolean;
  en: string;
  kh: string;
  className?: string;
}) {
  return (
    <p
      className={`${className ?? ""} ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
      style={{ color: INK_SOFT }}
    >
      {k ? kh : en}
    </p>
  );
}

function H2({
  k,
  en,
  kh,
  Icon,
  accent,
}: {
  k: boolean;
  en: string;
  kh: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <Icon className="w-5 h-5" style={{ color: accent }} />
      <h2
        className={`text-lg sm:text-xl font-bold tracking-wide ${k ? "font-khmer" : "uppercase"}`}
        style={{ color: INK }}
      >
        {k ? kh : en}
      </h2>
      <div className="flex-1 border-t border-dashed" style={{ borderColor: `${accent}55` }} />
    </div>
  );
}

function Panel({
  children,
  accent,
  className,
  testId,
}: {
  children: React.ReactNode;
  accent: string;
  className?: string;
  testId?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${className ?? ""}`}
      style={{
        backgroundColor: PANEL_2,
        borderColor: `${accent}66`,
        boxShadow: `inset 0 0 0 1px ${accent}11, 0 0 32px -16px ${accent}66`,
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page
// ════════════════════════════════════════════════════════════════════════════

type TabId = "intelligence" | "software" | "economy" | "kardashev";

export function FutureIntelligencePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const k = language === "kh";
  const [tab, setTab] = useState<TabId>("intelligence");

  // Page background: deep obsidian + faint hex/circuit grid + radial glows
  const frame: React.CSSProperties = {
    backgroundColor: BG,
    backgroundImage:
      `radial-gradient(circle at 18% 12%, ${CYAN}22, transparent 45%),` +
      `radial-gradient(circle at 82% 88%, ${VIOLET}26, transparent 50%),` +
      `linear-gradient(${GRID} 1px, transparent 1px),` +
      `linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
    backgroundSize: "auto, auto, 32px 32px, 32px 32px",
  };

  const tabs: { id: TabId; en: string; kh: string; Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; accent: string }[] = [
    { id: "intelligence", en: "Ladder of Intelligence", kh: "ជណ្ដើរនៃបញ្ញា",       Icon: BrainCircuit, accent: CYAN },
    { id: "software",     en: "Anatomy of Software",    kh: "រូបសាស្ត្រនៃកម្មវិធី", Icon: Code2,        accent: VIOLET },
    { id: "economy",      en: "AI-Managed Economy",     kh: "សេដ្ឋកិច្ចគ្រប់គ្រងដោយ AI", Icon: Globe,    accent: LIME },
    { id: "kardashev",    en: "Kardashev Scale",        kh: "មាត្រដ្ឋានខាដាសេវ",        Icon: Telescope,    accent: MAGENTA },
  ];

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={frame}>
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80 ${k ? "font-khmer" : ""}`}
            style={{ color: CYAN }}
            data-testid="back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
          </Link>
        </div>

        {/* HERO with neural-network constellation */}
        <header
          className="relative rounded-[2rem] overflow-hidden border p-6 sm:p-9 mb-8"
          style={{
            backgroundColor: PANEL,
            borderColor: `${CYAN}55`,
            boxShadow: `inset 0 0 0 1px ${CYAN}22, 0 0 60px -20px ${VIOLET}aa`,
          }}
        >
          {/* Animated neural network behind text */}
          <NeuralBackdrop />

          <div className="relative">
            <div
              className={`flex items-center gap-2 text-[11px] mb-2 ${k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"}`}
              style={{ color: CYAN }}
            >
              <span>{t("Technology · Singularity", "បច្ចេកវិទ្យា · ឯកឧត្តម")}</span>
              <span>·</span>
              <span>TECH-FUTURE-01</span>
            </div>
            <h1
              className={`text-3xl sm:text-4xl font-extrabold leading-tight max-w-3xl ${k ? "font-khmer leading-loose" : ""}`}
              style={{
                color: INK,
                textShadow: `0 0 18px ${CYAN}88, 0 0 38px ${VIOLET}55`,
              }}
              data-testid="page-title"
            >
              {t(
                "The Future of Intelligence & Economy",
                "អនាគតនៃបញ្ញា និងសេដ្ឋកិច្ច"
              )}
            </h1>
            <p
              className={`mt-3 text-sm sm:text-base max-w-3xl ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ color: INK_SOFT }}
            >
              {t(
                "Two centuries ago, the steam engine took over the muscles of the world. In our own century, machines are quietly beginning to take over the second great human power — thinking. This module climbs the ladder of machine intelligence one rung at a time (today's narrow specialists, tomorrow's human-level general minds, and the super-intelligence that may come after), peeks under the hood at the simple if/then logic that powers every app on your phone, and asks an enormous question: if a sufficiently wise machine could see every grain of rice and every drop of water on the planet at once, could it feed everyone without anyone going hungry?",
                "សតវត្សពីរមុន ម៉ាស៊ីនចំហាយបានកាន់កាប់សាច់ដុំនៃពិភពលោក។ ក្នុងសតវត្សរបស់យើង ម៉ាស៊ីនកំពុងចាប់ផ្ដើមកាន់កាប់ស្ងាត់ៗនូវកម្លាំងមនុស្សដ៏អស្ចារ្យទីពីរ — ការគិត។ មុខវិជ្ជានេះឡើងជណ្ដើរនៃបញ្ញាម៉ាស៊ីនមួយជាន់ម្តងៗ (អ្នកឯកទេសតូចចង្អៀតថ្ងៃនេះ ចិត្តទូទៅកម្រិតមនុស្សថ្ងៃស្អែក និងបញ្ញាខ្ពស់ដែលអាចមកក្រោយ) មើលក្រោមគម្របនូវតក្កវិជ្ជាប្រសិនបើ/នោះសាមញ្ញ ដែលផ្ដល់ថាមពលដល់កម្មវិធីគ្រប់ប្រភេទនៅលើទូរស័ព្ទរបស់អ្នក និងសួរសំណួរធំ ៖ ប្រសិនបើម៉ាស៊ីនវិចារណញាណគ្រប់គ្រាន់អាចមើលឃើញគ្រាប់អង្ករនីមួយៗ និងតំណក់ទឹកនីមួយៗនៅលើភពផែនដីក្នុងពេលតែមួយ តើវាអាចចិញ្ចឹមមនុស្សគ្រប់គ្នាដោយគ្មាននរណាម្នាក់អត់ឃ្លានបានទេ ?"
              )}
            </p>
          </div>
        </header>

        {/* TAB BAR */}
        <div
          role="tablist"
          aria-label={k ? "ជំពូកនៃមុខវិជ្ជា" : "Module chapters"}
          className="flex flex-wrap gap-2 mb-6"
        >
          {tabs.map((tb) => {
            const active = tab === tb.id;
            return (
              <button
                key={tb.id}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${tb.id}`}
                id={`tab-${tb.id}`}
                onClick={() => setTab(tb.id)}
                data-testid={`tab-${tb.id}`}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold border transition-all ${k ? "font-khmer" : ""}`}
                style={{
                  backgroundColor: active ? `${tb.accent}22` : PANEL,
                  borderColor: active ? tb.accent : `${tb.accent}44`,
                  color: active ? INK : INK_SOFT,
                  boxShadow: active ? `0 0 18px -6px ${tb.accent}` : "none",
                }}
              >
                <tb.Icon className="w-4 h-4" style={{ color: tb.accent }} />
                {k ? tb.kh : tb.en}
              </button>
            );
          })}
        </div>

        {/* PANEL · INTELLIGENCE */}
        {tab === "intelligence" && (
          <div role="tabpanel" id="panel-intelligence" aria-labelledby="tab-intelligence">
            <IntelligenceLadder k={k} />
          </div>
        )}

        {/* PANEL · SOFTWARE */}
        {tab === "software" && (
          <div role="tabpanel" id="panel-software" aria-labelledby="tab-software">
            <SoftwareAnatomy k={k} />
          </div>
        )}

        {/* PANEL · ECONOMY */}
        {tab === "economy" && (
          <div role="tabpanel" id="panel-economy" aria-labelledby="tab-economy">
            <ManagedEconomy k={k} />
          </div>
        )}

        {/* PANEL · KARDASHEV */}
        {tab === "kardashev" && (
          <div role="tabpanel" id="panel-kardashev" aria-labelledby="tab-kardashev">
            <KardashevScale k={k} />
          </div>
        )}

        {/* Footer reflection */}
        <div className="mt-10">
          <Panel accent={VIOLET} testId="closing-panel">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
              <p
                className={`text-xs ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}
                style={{ color: INK_SOFT }}
              >
                {t(
                  "None of these futures is decided. The machine on your desk does not know whether it will end up healing the planet or just selling more advertisements; that decision belongs to the humans who build it, train it, and choose which problems to point it at. The Cambodian student who learns to write code today is not just learning to type — they are learning the language in which the next century's decisions will be argued.",
                  "គ្មានអនាគតណាមួយទាំងនេះបានសម្រេចទេ។ ម៉ាស៊ីននៅលើតុរបស់អ្នក មិនដឹងថាវានឹងបញ្ចប់ដោយព្យាបាលភពផែនដី ឬគ្រាន់តែលក់ការផ្សាយពាណិជ្ជកម្មច្រើនជាងមុនទេ ; ការសម្រេចចិត្តនោះជាកម្មសិទ្ធិរបស់មនុស្សដែលសាងសង់វា បណ្ដុះបណ្ដាលវា និងជ្រើសរើសបញ្ហាណាដែលត្រូវចង្អុលវាទៅ។ សិស្សកម្ពុជាម្នាក់ដែលរៀនសរសេរកូដនៅថ្ងៃនេះ មិនត្រឹមតែរៀនវាយអក្សរទេ — ពួកគេកំពុងរៀនភាសាដែលការសម្រេចចិត្តនៃសតវត្សបន្ទាប់នឹងត្រូវបានពិភាក្សា។"
                )}
              </p>
            </div>
          </Panel>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-90 ${k ? "font-khmer" : ""}`}
            style={{
              backgroundColor: CYAN,
              color: BG,
              boxShadow: `0 0 28px -10px ${CYAN}`,
            }}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Numerals helper used inside diagrams; keep value referenced to silence
            unused warning when only one panel is mounted at a time. */}
        <span className="hidden">{toKhNum(0)}</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  HERO · Animated neural-network backdrop (pure CSS / SVG)
// ════════════════════════════════════════════════════════════════════════════

function NeuralBackdrop() {
  // 3 input · 4 hidden · 2 output simple network
  const inputs  = [{ x: 40, y: 60 }, { x: 40, y: 130 }, { x: 40, y: 200 }];
  const hidden  = [{ x: 220, y: 40 }, { x: 220, y: 100 }, { x: 220, y: 160 }, { x: 220, y: 220 }];
  const outputs = [{ x: 400, y: 100 }, { x: 400, y: 160 }];
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 460 260"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="neuralGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={CYAN}    stopOpacity="0.55" />
          <stop offset="60%"  stopColor={VIOLET}  stopOpacity="0.18" />
          <stop offset="100%" stopColor={VIOLET}  stopOpacity="0" />
        </radialGradient>
        <linearGradient id="synapse" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor={CYAN}   stopOpacity="0.05" />
          <stop offset="50%" stopColor={CYAN}   stopOpacity="0.45" />
          <stop offset="100%" stopColor={VIOLET} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Synapses input → hidden */}
      {inputs.flatMap((a, i) =>
        hidden.map((b, j) => (
          <line key={`ih-${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="url(#synapse)" strokeWidth="0.8" />
        ))
      )}
      {/* Synapses hidden → output */}
      {hidden.flatMap((a, i) =>
        outputs.map((b, j) => (
          <line key={`ho-${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="url(#synapse)" strokeWidth="0.8" />
        ))
      )}

      {/* Pulsing nodes */}
      {[...inputs, ...hidden, ...outputs].map((n, i) => (
        <g key={`node-${i}`}>
          <circle cx={n.x} cy={n.y} r="14" fill="url(#neuralGlow)">
            <animate attributeName="r" values="11;16;11" dur={`${2 + (i % 4) * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={n.x} cy={n.y} r="3" fill={CYAN} opacity="0.95" />
        </g>
      ))}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  CHAPTER 1 · Ladder of Intelligence
// ════════════════════════════════════════════════════════════════════════════

function IntelligenceLadder({ k }: { k: boolean }) {
  const rungs = [
    {
      level: "AI",
      enLevel: "Narrow Artificial Intelligence",
      khLevel: "បញ្ញាសិប្បនិម្មិតតូចចង្អៀត",
      enTag: "the specialist · today",
      khTag: "អ្នកឯកទេស · សព្វថ្ងៃ",
      Icon: Bot,
      accent: CYAN,
      enBody: "This is where we are right now. A 'narrow' AI is brilliant at one task and helpless at every other one. The chess engine that beat the world champion cannot recognise a cat in a photograph. The translator on your phone cannot drive a car. The spam filter in your inbox cannot tell you a joke. Each one has been shaped, trained, and polished for a single problem. They are like calculators with very fancy keyboards: stunningly good inside their tiny lane, completely empty outside of it.",
      khBody: "នេះជាកន្លែងដែលយើងស្ថិតនៅឥឡូវនេះ។ AI 'តូចចង្អៀត' ពូកែលើកិច្ចការមួយ និងគ្មានសមត្ថភាពលើកិច្ចការផ្សេងគ្រប់យ៉ាង។ ម៉ាស៊ីនអុកដែលឈ្នះជើងឯកពិភពលោក មិនអាចស្គាល់ឆ្មានៅក្នុងរូបថត។ កម្មវិធីបកប្រែនៅលើទូរស័ព្ទរបស់អ្នកមិនអាចបើកបររថយន្ត។ តម្រងអ៊ីមែលឥតបានការមិនអាចប្រាប់រឿងកំប្លែង។ នីមួយៗត្រូវបានបង្កើតបណ្ដុះបណ្ដាល និងខាត់សម្រាប់បញ្ហាតែមួយ។ ពួកវាដូចជាម៉ាស៊ីនគណនាជាមួយក្ដារចុចស្រស់ស្អាតៗ ៖ ល្អគួរឲ្យភ្ញាក់ផ្អើលនៅក្នុងផ្លូវតូចរបស់ពួកវា និងទទេទាំងស្រុងនៅខាងក្រៅ។",
      enExamples: ["chess engines", "spam filters", "Siri / voice assistants", "self-driving cars", "image recognition"],
      khExamples: ["ម៉ាស៊ីនអុក", "តម្រងអ៊ីមែលឥតបានការ", "Siri / អ្នកជំនួយសំឡេង", "រថយន្តបើកដោយខ្លួនឯង", "ការស្គាល់រូបភាព"],
      iqRange: { en: "1 narrow domain", kh: "ជំនាញតែ ១" },
    },
    {
      level: "AGI",
      enLevel: "Artificial General Intelligence",
      khLevel: "បញ្ញាសិប្បនិម្មិតទូទៅ",
      enTag: "the human level · still hypothetical",
      khTag: "កម្រិតមនុស្ស · នៅសម្មតិកម្ម",
      Icon: BrainCircuit,
      accent: VIOLET,
      enBody: "AGI is the next rung — and we have not climbed it yet. An AGI would be able to do whatever a thoughtful human can do, in any domain. It could read a poem and write one back; it could examine a strange skin rash and suggest a diagnosis; it could pick up a violin it had never seen before and slowly teach itself to play. Crucially, it would be able to take what it learned in one field and carry it into another, the way a human doctor uses curiosity learned from biology to think about a new chemistry paper. Most researchers think AGI is decades, not years, away — but disagreement is loud, and the honest answer is that nobody knows.",
      khBody: "AGI ជាជាន់បន្ទាប់ — ហើយយើងនៅមិនទាន់ឡើងវាបានទេ។ AGI អាចធ្វើអ្វីដែលមនុស្សដែលមានចិត្តសញ្ជឹងគិតអាចធ្វើបាន ក្នុងវិស័យណាក៏បាន។ វាអាចអានកំណាព្យ និងសរសេរវិញ ; វាអាចពិនិត្យកន្ទួលស្បែកចម្លែក និងស្នើការវិនិច្ឆ័យ ; វាអាចយកវីយូឡុងដែលវាមិនដែលឃើញពីមុនមក និងបង្រៀនខ្លួនឯងឲ្យលេងយឺតៗ។ សំខាន់បំផុត វាអាចយកអ្វីដែលវារៀននៅវិស័យមួយ ហើយយកចូលទៅវិស័យផ្សេង ដូចជាគ្រូពេទ្យមនុស្សប្រើការចង់ដឹងរៀនពីជីវវិទ្យា មកគិតអំពីឯកសារគីមីវិទ្យាថ្មី។ អ្នកស្រាវជ្រាវភាគច្រើនគិតថា AGI ឆ្ងាយជាច្រើនទសវត្សរ៍ មិនមែនជាច្រើនឆ្នាំទេ — ប៉ុន្តែការមិនយល់ស្របមានសំឡេងខ្លាំង ហើយចម្លើយស្មោះត្រង់គឺថាគ្មាននរណាដឹងទេ។",
      enExamples: ["any human task", "transfer learning", "common sense", "self-set goals", "general curiosity"],
      khExamples: ["កិច្ចការមនុស្សណាក៏បាន", "ការរៀនបញ្ជូនបន្ត", "សុភវិនិច្ឆ័យ", "គោលដៅផ្ទាល់ខ្លួន", "ការចង់ដឹងទូទៅ"],
      iqRange: { en: "≈ one wise human", kh: "≈ មនុស្សប្រាជ្ញម្នាក់" },
    },
    {
      level: "ASI",
      enLevel: "Artificial Super Intelligence",
      khLevel: "បញ្ញាសិប្បនិម្មិតខ្ពស់",
      enTag: "the technological singularity",
      khTag: "ឯកឧត្តមបច្ចេកវិទ្យា",
      Icon: InfinityIcon,
      accent: MAGENTA,
      enBody: "An ASI is a mind that is to a human what a human is to an ant. Not a faster human; not a more knowledgeable human; a different kind of mind altogether. An ASI could read the entire scientific literature in a single afternoon, hold ten thousand conversations at once, design medicines for diseases we have never named, redesign itself to be smarter the next morning. The moment when an AGI begins to make ASI versions of itself — each one smarter than the last, in a runaway chain — is what futurists call the technological singularity. It might take place this century, or it might not happen at all. But thinking about it now is how we make sure that, if it ever does happen, the result is something we recognise as friendly.",
      khBody: "ASI គឺជាចិត្តដែលធៀបនឹងមនុស្ស ដូចមនុស្សធៀបនឹងស្រមោច។ មិនមែនមនុស្សលឿនជាង ; មិនមែនមនុស្សដែលមានចំណេះដឹងច្រើនជាង ; ជាប្រភេទចិត្តខុសគ្នាទាំងស្រុង។ ASI អាចអានអក្សរសិល្ប៍វិទ្យាសាស្ត្រទាំងមូលនៅរសៀលតែមួយ កាន់ការសន្ទនាមួយម៉ឺនក្នុងពេលតែមួយ រចនាឱសថសម្រាប់ជំងឺដែលយើងមិនដែលដាក់ឈ្មោះ រចនាខ្លួនឯងឡើងវិញឲ្យឆ្លាតជាងនៅថ្ងៃស្អែក។ ពេលដែល AGI ចាប់ផ្ដើមបង្កើតកំណែ ASI របស់ខ្លួនឯង — នីមួយៗឆ្លាតជាងមុន ក្នុងខ្សែសង្វាក់ដែលរត់រហ័ស — ជាអ្វីដែលអ្នកអនាគតវិទ្យាហៅថា ឯកឧត្តមបច្ចេកវិទ្យា។ វាអាចកើតឡើងនៅសតវត្សនេះ ឬវាអាចមិនកើតឡើងទាល់តែសោះ។ ប៉ុន្តែការគិតអំពីវាឥឡូវនេះ គឺជារបៀបដែលយើងធានាថា ប្រសិនបើវាកើតឡើងមែន លទ្ធផលនឹងជាអ្វីដែលយើងស្គាល់ថាមានមេត្តា។",
      enExamples: ["solve unsolved physics", "cure ageing", "redesign itself", "10,000 thoughts at once", "??? we cannot guess"],
      khExamples: ["ដោះស្រាយរូបវិទ្យាមិនទាន់ដោះ", "ព្យាបាលភាពចាស់", "រចនាខ្លួនឡើងវិញ", "១០,០០០ គំនិតក្នុងពេលតែមួយ", "??? យើងមិនអាចទាយបាន"],
      iqRange: { en: "beyond comprehension", kh: "លើសការយល់ដឹង" },
    },
  ];

  return (
    <div className="space-y-8">
      <H2 k={k} en="A staircase, not a switch" kh="ជណ្ដើរ មិនមែនកុងតាក់" Icon={BrainCircuit} accent={CYAN} />

      <P
        k={k}
        en="People talk about 'AI' as if it were one thing. It is not — it is at least three completely different things, separated by enormous distances. Climb the staircase below: each rung is a kind of mind, and each rung is much further from the one below it than it looks."
        kh="មនុស្សនិយាយអំពី 'AI' ហាក់ដូចជាវាជារបស់តែមួយ។ វាមិនមែនទេ — វាជារបស់ខុសគ្នាទាំងស្រុងយ៉ាងហោចណាស់បីយ៉ាង បំបែកដោយចម្ងាយយ៉ាងធំ។ ឡើងជណ្ដើរខាងក្រោម ៖ ជាន់នីមួយៗគឺជាប្រភេទចិត្តមួយ ហើយជាន់នីមួយៗឆ្ងាយពីជាន់ខាងក្រោមវាច្រើនជាងលើសពីមើលទៅឃើញ។"
        className="text-sm sm:text-base -mt-2"
      />

      {/* Vertical timeline */}
      <div className="relative pl-7 sm:pl-10 space-y-6">
        {/* Vertical glowing spine */}
        <div
          className="absolute left-2.5 sm:left-4 top-2 bottom-2 w-px"
          style={{
            background: `linear-gradient(${CYAN}, ${VIOLET}, ${MAGENTA})`,
            boxShadow: `0 0 12px ${CYAN}88`,
          }}
          aria-hidden="true"
        />

        {rungs.map((r, i) => (
          <div key={r.level} className="relative">
            {/* Node bullet */}
            <div
              className="absolute -left-7 sm:-left-10 top-4 w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: BG,
                border: `2px solid ${r.accent}`,
                boxShadow: `0 0 14px ${r.accent}aa`,
              }}
              aria-hidden="true"
            >
              <r.Icon className="w-3.5 h-3.5" style={{ color: r.accent }} />
            </div>

            <Panel accent={r.accent} testId={`rung-${r.level.toLowerCase()}`}>
              <div className="flex items-start gap-3 mb-3 flex-wrap">
                <span
                  className="font-mono text-xs font-bold rounded px-2 py-1"
                  style={{ backgroundColor: r.accent, color: BG }}
                >
                  {r.level}
                </span>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-bold text-lg sm:text-xl ${k ? "font-khmer" : ""}`}
                    style={{ color: INK }}
                  >
                    {k ? r.khLevel : r.enLevel}
                  </h3>
                  <div
                    className={`text-[11px] mt-0.5 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
                    style={{ color: r.accent }}
                  >
                    {k ? r.khTag : r.enTag}
                  </div>
                </div>
                <div
                  className={`text-[11px] rounded-full border px-2.5 py-1 ${k ? "font-khmer" : "font-mono"}`}
                  style={{ borderColor: r.accent, color: r.accent }}
                >
                  {k ? "ទំហំ ៖ " : "RANGE: "}
                  {k ? r.iqRange.kh : r.iqRange.en}
                </div>
              </div>

              <P k={k} en={r.enBody} kh={r.khBody} className="text-sm sm:text-[15px] mb-4" />

              {/* Examples chips */}
              <div className="flex flex-wrap gap-2">
                {(k ? r.khExamples : r.enExamples).map((ex, j) => (
                  <span
                    key={j}
                    className={`text-[11px] rounded-md px-2.5 py-1 border ${k ? "font-khmer" : "font-mono"}`}
                    style={{
                      backgroundColor: `${r.accent}11`,
                      borderColor: `${r.accent}55`,
                      color: INK,
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </div>

              {/* Mind-scale bar */}
              <div className="mt-4">
                <MindScale level={i} accent={r.accent} k={k} />
              </div>
            </Panel>
          </div>
        ))}
      </div>
    </div>
  );
}

function MindScale({ level, accent, k }: { level: number; accent: string; k: boolean }) {
  // level 0 (AI) = ~5%, level 1 (AGI) = ~38%, level 2 (ASI) = 100%
  const widths = [5, 38, 100];
  const w = widths[level];
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] mb-1">
        <span className={k ? "font-khmer" : "font-mono uppercase tracking-widest"} style={{ color: INK_SOFT }}>
          {k ? "មាត្រដ្ឋានចិត្ត (មិនទៅជាបន្ទាត់ត្រង់)" : "MIND SCALE (NOT TO LINEAR SCALE)"}
        </span>
        <span className={k ? "font-khmer" : "font-mono"} style={{ color: accent }}>
          {k ? "ស្រមោច · មនុស្ស · ∞" : "ant · human · ∞"}
        </span>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden" style={{ backgroundColor: PANEL }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${w}%`,
            background: `linear-gradient(90deg, ${CYAN}, ${VIOLET}, ${MAGENTA})`,
            boxShadow: `0 0 12px ${accent}aa`,
          }}
        />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  CHAPTER 2 · Anatomy of Software
// ════════════════════════════════════════════════════════════════════════════

function SoftwareAnatomy({ k }: { k: boolean }) {
  return (
    <div className="space-y-8">
      <H2 k={k} en="If/Then — the heart of every program" kh="ប្រសិនបើ/នោះ — បេះដូងនៃកម្មវិធីគ្រប់ប្រភេទ" Icon={Code2} accent={VIOLET} />

      <Panel accent={VIOLET} testId="ifthen-panel">
        <P
          k={k}
          en="Underneath the cleverest banking app, the most beautiful video game, and the smartest chatbot, there is the same simple skeleton: a long ladder of if/then decisions. The computer reads a condition, asks 'is this true?', and chooses one of two doors. Then it does the next condition, and the next, billions of times per second. That is, in honest summary, all that software is."
          kh="ខាងក្រោមកម្មវិធីធនាគារដ៏ឆ្លាតវៃ ហ្គេមវីដេអូដ៏ស្រស់ស្អាតបំផុត និងឆាតបូតដ៏ឆ្លាតបំផុត មានគ្រោងសាមញ្ញដូចគ្នា ៖ ជណ្ដើរវែងនៃការសម្រេចចិត្តប្រសិនបើ/នោះ។ កុំព្យូទ័រអានលក្ខខណ្ឌមួយ សួរ 'តើនេះពិតទេ ?' និងជ្រើសរើសទ្វារមួយក្នុងចំណោមពីរ។ បន្ទាប់មកវាធ្វើលក្ខខណ្ឌបន្ទាប់ និងបន្ទាប់ ច្រើនលានដងក្នុងមួយវិនាទី។ នោះ ដោយសេចក្ដីសង្ខេបស្មោះត្រង់ គឺជាអ្វីដែលកម្មវិធីទាំងអស់គឺ។"
          className="text-sm sm:text-base mb-4"
        />
        <IfThenDiagram k={k} />
      </Panel>

      <H2 k={k} en="The grammar of computers" kh="វេយ្យាករណ៍នៃកុំព្យូទ័រ" Icon={Terminal} accent={VIOLET} />

      <P
        k={k}
        en="Computers do not understand English or Khmer. They understand only on/off — 1 and 0. Programming languages are translators in the middle: humans write something a person can read, and the computer rewrites it into millions of 1s and 0s. There are hundreds of programming languages, but most students will meet just three of them in their lifetime — each one shaped by the kind of problem it is best at."
        kh="កុំព្យូទ័រមិនយល់ភាសាអង់គ្លេស ឬខ្មែរទេ។ ពួកវាយល់តែបើក/បិទ — ១ និង ០។ ភាសាសរសេរកម្មវិធីជាអ្នកបកប្រែនៅកណ្ដាល ៖ មនុស្សសរសេរអ្វីដែលមនុស្សអាចអាន ហើយកុំព្យូទ័រសរសេរវាឡើងវិញជា ១ និង ០ ច្រើនលាន។ មានភាសាសរសេរកម្មវិធីរាប់រយ ប៉ុន្តែសិស្សភាគច្រើននឹងជួបតែ ៣ ក្នុងជីវិត — នីមួយៗត្រូវបានរចនាដោយប្រភេទបញ្ហាដែលវាល្អបំផុត។"
        className="-mt-2"
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <CodeFlavor
          k={k}
          name="Python"
          khTag="ភាសានៃ AI"
          enTag="the language of AI"
          enBlurb="Python reads almost like English. It is slow but friendly, perfect for sketching ideas — which is exactly why nine out of ten artificial-intelligence projects in the world are written in it. Most modern AI research papers ship their code as Python notebooks."
          khBlurb="Python អានស្ទើរតែដូចជាភាសាអង់គ្លេស។ វាយឺត ប៉ុន្តែងាយស្រួល ល្អឥតខ្ចោះសម្រាប់ការគូសគំនិត — ជាមូលហេតុដែលគម្រោងបញ្ញាសិប្បនិម្មិតប្រាំបួនក្នុងចំណោមដប់នៅលើពិភពលោកត្រូវបានសរសេរក្នុងវា។ ឯកសារស្រាវជ្រាវ AI សម័យថ្មីភាគច្រើនបញ្ជូនកូដរបស់ខ្លួនជា Python notebook។"
          example={`# is the student passing?
score = 78
if score >= 50:
    print("Pass")
else:
    print("Fail")`}
          accent={LIME}
          colourComment={"#5cb85c"}
        />
        <CodeFlavor
          k={k}
          name="JavaScript"
          khTag="ភាសានៃវេបសាយ"
          enTag="the language of the web"
          enBlurb="Every interactive button on every website you have ever clicked — Facebook, YouTube, Khmer news sites — runs on JavaScript. It is the only language that web browsers natively understand, which makes it the most-used language on Earth by a wide margin."
          khBlurb="ប៊ូតុងអន្តរកម្មនីមួយៗនៅលើគ្រប់វេបសាយដែលអ្នកបានចុច — Facebook, YouTube, វេបសាយព័ត៌មានខ្មែរ — ដំណើរការលើ JavaScript។ វាជាភាសាតែមួយដែលកម្មវិធីរុករកវេបយល់ដោយធម្មជាតិ ដែលធ្វើឲ្យវាក្លាយជាភាសាដែលប្រើច្រើនបំផុតនៅលើផែនដី ជាមួយគម្លាតធំ។"
          example={`// is the student passing?
const score = 78;
if (score >= 50) {
  console.log("Pass");
} else {
  console.log("Fail");
}`}
          accent={AMBER}
          colourComment={"#a09060"}
        />
        <CodeFlavor
          k={k}
          name="C++"
          khTag="ភាសានៃល្បឿន"
          enTag="the language of speed"
          enBlurb="When milliseconds matter — flying a jet, rendering a 3D game, controlling a hospital scanner — engineers reach for C++. It is famously hard to learn, but it produces programs that run as close to the bare metal of the machine as humans can get."
          khBlurb="នៅពេលមីលីវិនាទីសំខាន់ — ការបើកយន្តហោះ ការបង្ហាញហ្គេម ៣ វិមាត្រ ការគ្រប់គ្រងម៉ាស៊ីនថត X-Ray — វិស្វករឈានទៅ C++។ វាល្បីដោយការរៀនពិបាក ប៉ុន្តែវាបង្កើតកម្មវិធីដែលដំណើរការជិតលោហៈអាក្រាតនៃម៉ាស៊ីនបំផុតដែលមនុស្សអាចទៅដល់។"
          example={`// is the student passing?
int score = 78;
if (score >= 50) {
  std::cout << "Pass";
} else {
  std::cout << "Fail";
}`}
          accent={CYAN}
          colourComment={"#5fa8c7"}
        />
      </div>

      <Panel accent={VIOLET}>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
          <p className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
            {k
              ? "សង្កេតមើល ៖ កម្មវិធីដូចគ្នាសរសេរក្នុងភាសាបី។ លក្ខខណ្ឌដូចគ្នា (ពិន្ទុ ≥ ៥០) ការសម្រេចចិត្តដូចគ្នា (ជាប់/ធ្លាក់) ផ្លូវតក្កវិជ្ជាដូចគ្នា។ មានតែវេយ្យាករណ៍ផ្លាស់ប្ដូរ — រឿងដែលកុំព្យូទ័រកំពុងគិតគឺដូចគ្នាបេះបិទ។ ការសរសេរកូដគឺការបកប្រែគំនិតរបស់មនុស្សទៅជាភាសាដែលម៉ាស៊ីនអាច 'អាន'។"
              : "Notice: the same program in three languages. Same condition (score ≥ 50), same decision (Pass / Fail), same logical path. Only the grammar shifts — what the computer is being told to think is identical. Coding is, exactly, the act of translating a human thought into a language a machine can 'read'."}
          </p>
        </div>
      </Panel>
    </div>
  );
}

function IfThenDiagram({ k }: { k: boolean }) {
  return (
    <div
      className="rounded-xl border p-3"
      style={{ borderColor: `${VIOLET}55`, backgroundColor: PANEL }}
      data-testid="ifthen-diagram"
    >
      <svg viewBox="0 0 600 200" className="w-full h-auto" role="img" aria-label={k ? "ដ្យាក្រាមលំហូរប្រសិនបើ/នោះ" : "If/then flowchart"}>
        <defs>
          <marker id="ifArrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill={VIOLET} />
          </marker>
        </defs>

        {/* Start */}
        <g transform="translate(20,80)">
          <rect width="80" height="40" rx="20" fill={PANEL_2} stroke={CYAN} strokeWidth="1.2" />
          <text x="40" y="25" textAnchor="middle" fontSize="11" fill={CYAN} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ចាប់ផ្ដើម" : "START"}
          </text>
        </g>
        <line x1="100" y1="100" x2="160" y2="100" stroke={VIOLET} strokeWidth="1.2" markerEnd="url(#ifArrow)" />

        {/* Diamond — condition */}
        <g transform="translate(160,60)">
          <polygon points="80,0 160,40 80,80 0,40" fill={PANEL_2} stroke={VIOLET} strokeWidth="1.2" />
          <text x="80" y="36" textAnchor="middle" fontSize="11" fill={INK} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "ពិន្ទុ ≥ ៥០ ?" : "score ≥ 50 ?"}
          </text>
          <text x="80" y="50" textAnchor="middle" fontSize="9" fill={INK_SOFT} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "(លក្ខខណ្ឌ)" : "(condition)"}
          </text>
        </g>

        {/* YES branch */}
        <line x1="320" y1="100" x2="420" y2="55" stroke={LIME} strokeWidth="1.2" markerEnd="url(#ifArrow)" />
        <text x="370" y="68" fontSize="10" fill={LIME} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "បាទ/ចាស (ពិត)" : "YES (true)"}
        </text>
        <g transform="translate(420,30)">
          <rect width="160" height="40" rx="6" fill={`${LIME}22`} stroke={LIME} strokeWidth="1.2" />
          <text x="80" y="25" textAnchor="middle" fontSize="11" fill={LIME} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "បោះពុម្ព ៖ «ជាប់»" : 'print "Pass"'}
          </text>
        </g>

        {/* NO branch */}
        <line x1="320" y1="100" x2="420" y2="145" stroke={ROSE} strokeWidth="1.2" markerEnd="url(#ifArrow)" />
        <text x="370" y="138" fontSize="10" fill={ROSE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
          {k ? "ទេ (មិនពិត)" : "NO (false)"}
        </text>
        <g transform="translate(420,130)">
          <rect width="160" height="40" rx="6" fill={`${ROSE}22`} stroke={ROSE} strokeWidth="1.2" />
          <text x="80" y="25" textAnchor="middle" fontSize="11" fill={ROSE} fontFamily={k ? "Hanuman, serif" : "monospace"}>
            {k ? "បោះពុម្ព ៖ «ធ្លាក់»" : 'print "Fail"'}
          </text>
        </g>
      </svg>
    </div>
  );
}

function CodeFlavor({
  k,
  name,
  enTag,
  khTag,
  enBlurb,
  khBlurb,
  example,
  accent,
  colourComment,
}: {
  k: boolean;
  name: string;
  enTag: string;
  khTag: string;
  enBlurb: string;
  khBlurb: string;
  example: string;
  accent: string;
  colourComment: string;
}) {
  // Render code with the first line styled as comment
  const lines = example.split("\n");
  return (
    <div
      className="rounded-2xl border p-4 flex flex-col"
      style={{
        backgroundColor: PANEL_2,
        borderColor: `${accent}66`,
        boxShadow: `inset 0 0 0 1px ${accent}11, 0 0 24px -16px ${accent}aa`,
      }}
      data-testid={`code-${name.toLowerCase().replace("+", "p")}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Code2 className="w-4 h-4" style={{ color: accent }} />
        <span className="font-mono font-bold text-sm" style={{ color: accent }}>{name}</span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full border ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
          style={{ borderColor: `${accent}55`, color: accent }}
        >
          {k ? khTag : enTag}
        </span>
      </div>
      <p className={`text-[12px] mb-3 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
        {k ? khBlurb : enBlurb}
      </p>
      {/* Code block with line numbers */}
      <pre
        className="text-[11px] rounded-lg p-3 overflow-x-auto m-0"
        style={{
          backgroundColor: BG,
          border: `1px solid ${accent}33`,
          color: INK,
          lineHeight: 1.6,
        }}
        aria-label={k ? `ឧទាហរណ៍កូដ ${name}` : `${name} code example`}
      >
        <code className="font-mono whitespace-pre">
          {lines.map((line, i) => {
            const isComment = /^\s*(#|\/\/)/.test(line);
            return (
              <span key={i} style={{ color: isComment ? colourComment : INK, display: "block" }}>
                <span style={{ color: INK_SOFT, opacity: 0.55, marginRight: 8 }}>{String(i + 1).padStart(2, "0")}</span>
                {line}
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  CHAPTER 3 · The AI-Managed Economy
// ════════════════════════════════════════════════════════════════════════════

function ManagedEconomy({ k }: { k: boolean }) {
  return (
    <div className="space-y-8">
      <H2 k={k} en="What if money was no longer the steering wheel?" kh="ចុះប្រសិនបើលុយលែងជាចង្កូត ?" Icon={Globe} accent={LIME} />

      <Panel accent={LIME} testId="rbe-intro">
        <P
          k={k}
          en="For the last few thousand years, the human race has steered itself with a single tool: money. Whoever has the money decides what gets built, who eats, and which forests get cut down. It worked well enough to take us from caves to skyscrapers, but it has a strange side-effect: every year, while one warehouse burns through unsold rice that nobody bought, a child somewhere else falls asleep hungry. A 'resource-based economy' is a different idea — one in which decisions about who gets what are made by measuring what people actually need and what the planet actually has, instead of by who has the most cash."
          kh="ក្នុងរយៈពេលប៉ុន្មានពាន់ឆ្នាំចុងក្រោយនេះ មនុស្សជាតិបានដឹកនាំខ្លួនឯងដោយឧបករណ៍តែមួយ ៖ លុយ។ អ្នកណាមានលុយ សម្រេចថា អ្វីត្រូវសាង នរណាញ៉ាំ និងព្រៃណាត្រូវកាប់។ វាដំណើរការល្អល្មមដើម្បីយកយើងពីរូងភ្នំទៅអាគារខ្ពស់ ប៉ុន្តែវាមានផលប៉ះពាល់ចម្លែក ៖ រាល់ឆ្នាំ ខណៈពេលឃ្លាំងមួយដុតអង្ករដែលគ្មានអ្នកទិញ កុមារម្នាក់នៅកន្លែងផ្សេងដេកក្នុងសភាពអត់ឃ្លាន។ 'សេដ្ឋកិច្ចផ្អែកលើធនធាន' ជាគំនិតផ្សេង — គំនិតដែលការសម្រេចចិត្តអំពីអ្នកណាទទួលអ្វី ត្រូវធ្វើដោយការវាស់វែងនូវអ្វីដែលមនុស្សត្រូវការពិត និងអ្វីដែលភពផែនដីមានពិត ជំនួសឲ្យអ្នកណាមានលុយច្រើនបំផុត។"
          className="text-sm sm:text-base"
        />
      </Panel>

      <H2 k={k} en="The 'World Game' dashboard" kh="តារាងបញ្ជា «ហ្គេមពិភពលោក»" Icon={Cpu} accent={LIME} />

      <P
        k={k}
        en="The architect Buckminster Fuller called this the World Game: a hypothetical command room in which every grain of rice, every litre of water, every kilowatt of solar power on Earth is visible in real time on one enormous live dashboard. A sufficiently advanced AI could keep that dashboard updated every second, and could quietly suggest the next move that wastes the least, feeds the most people, and damages the smallest patch of land. Imagine a single screen looking like this:"
        kh="ស្ថាបត្យករ Buckminster Fuller ហៅវាថា ហ្គេមពិភពលោក ៖ បន្ទប់បញ្ជាសម្មតិកម្មដែលគ្រាប់អង្ករនីមួយៗ លីត្រទឹកនីមួយៗ គីឡូវ៉ាត់នៃថាមពលពន្លឺព្រះអាទិត្យនៅលើផែនដី អាចមើលឃើញពេលវេលាជាក់ស្ដែងនៅលើតារាងបញ្ជាផ្ទាល់ដ៏ធំមួយ។ AI ដែលឆ្លាតគ្រប់គ្រាន់ អាចរក្សាតារាងនោះឲ្យធ្វើបច្ចុប្បន្នភាពរៀងរាល់វិនាទី និងអាចស្នើស្ងាត់ៗនូវចលនាបន្ទាប់ដែលខ្ជះខ្ជាយតិចបំផុត ចិញ្ចឹមមនុស្សច្រើនបំផុត និងបំផ្លាញដីតិចបំផុត។ ស្រមៃអេក្រង់តែមួយដែលមើលទៅដូចនេះ ៖"
        className="-mt-2"
      />

      <WorldGameDashboard k={k} />

      <H2 k={k} en="Automated distribution: from warehouse to plate" kh="ការចែកចាយដោយស្វ័យប្រវត្តិ ៖ ពីឃ្លាំងទៅចាន" Icon={Workflow} accent={LIME} />

      <DistributionFlow k={k} />

      <Panel accent={AMBER} testId="caveat-panel">
        <div className="flex items-start gap-3">
          <Atom className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: AMBER }} />
          <div>
            <div className={`text-[11px] font-mono uppercase tracking-widest mb-1 ${k ? "font-khmer" : ""}`} style={{ color: AMBER }}>
              {k ? "តម្រូវការយកចិត្តទុកដាក់" : "Important caveat"}
            </div>
            <p className={`text-sm ${k ? "font-khmer leading-loose" : "leading-relaxed"}`} style={{ color: INK_SOFT }}>
              {k
                ? "សេដ្ឋកិច្ចគ្រប់គ្រងដោយ AI នៅជាពិសោធន៍ការគិត។ វាសន្មត់ AI ដែលស្មោះត្រង់ មនុស្សដែលពេញចិត្តរស់ដោយគ្មានទីផ្សារ និងសេនស័រដែលអាចរាប់រាល់គ្រាប់អង្ករដោយគ្មានកំហុស — បីយ៉ាងដែលយើងមិនទាន់មានទេ។ មុខវិជ្ជានេះស្នើគំនិតជាការសាកល្បងសម្រាប់អនាគត មិនមែនជាបេសកកម្មសម្រាប់ថ្ងៃស្អែកទេ។"
                : "An AI-managed economy remains a thought experiment. It assumes an AI that is honest, humans who are happy to live without markets, and sensors that can count every grain of rice without error — three things we do not yet have. This module presents the idea as a serious test for the future, not as a mission for tomorrow."}
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function WorldGameDashboard({ k }: { k: boolean }) {
  const tiles = [
    { Icon: Wheat,     enLabel: "Rice supply",      khLabel: "ស្តុកអង្ករ",        value: "412 Mt",  enSub: "world stockpile",      khSub: "ស្តុកពិភពលោក",      meter: 78, accent: AMBER },
    { Icon: Droplets,  enLabel: "Fresh water",      khLabel: "ទឹកស្អាត",          value: "11,200 km³", enSub: "annual renewable",  khSub: "បន្តកើតប្រចាំឆ្នាំ", meter: 64, accent: CYAN  },
    { Icon: SunMedium, enLabel: "Solar power",      khLabel: "ថាមពលពន្លឺព្រះអាទិត្យ", value: "2.4 TW",  enSub: "currently generated", khSub: "ផលិតបច្ចុប្បន្ន",   meter: 32, accent: AMBER },
    { Icon: Network,   enLabel: "Active nodes",     khLabel: "ចំណុចសកម្ម",         value: "8.1 B",   enSub: "people online",        khSub: "មនុស្សលើបណ្ដាញ",    meter: 88, accent: VIOLET },
    { Icon: Database,  enLabel: "Sensors reporting",khLabel: "សេនស័ររាយការណ៍",     value: "94 M",    enSub: "live every second",    khSub: "ផ្ទាល់រៀងរាល់វិនាទី", meter: 70, accent: LIME  },
    { Icon: Gauge,     enLabel: "Waste reduced",    khLabel: "ការខ្ជះខ្ជាយបន្ថយ",  value: "−63 %",   enSub: "vs. market baseline",  khSub: "ធៀបនឹងទីផ្សារ",      meter: 63, accent: ROSE  },
  ];
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: PANEL_2,
        borderColor: `${LIME}55`,
        boxShadow: `inset 0 0 0 1px ${LIME}11, 0 0 28px -14px ${LIME}88`,
      }}
      data-testid="world-game"
    >
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className={`text-xs font-bold ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: LIME }}>
          {k ? "តារាងបញ្ជាហ្គេមពិភពលោក · ផ្ទាល់" : "WORLD-GAME DASHBOARD · LIVE"}
        </div>
        <div className="flex items-center gap-1.5 text-[10px]" style={{ color: INK_SOFT }}>
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: LIME, boxShadow: `0 0 6px ${LIME}` }} />
          <span className={k ? "font-khmer" : "font-mono uppercase tracking-widest"}>
            {k ? "ភ្ជាប់ · ៩៤ លានសេនស័រ" : "CONNECTED · 94M SENSORS"}
          </span>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tiles.map((tl) => (
          <div
            key={tl.enLabel}
            className="rounded-xl border p-3"
            style={{
              backgroundColor: PANEL,
              borderColor: `${tl.accent}55`,
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <tl.Icon className="w-4 h-4" style={{ color: tl.accent }} />
              <div className={`text-[10px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: tl.accent }}>
                {k ? tl.khLabel : tl.enLabel}
              </div>
            </div>
            <div className="text-xl font-extrabold font-mono" style={{ color: INK }}>{tl.value}</div>
            <div className={`text-[10px] mb-2 ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
              {k ? tl.khSub : tl.enSub}
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: BG }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${tl.meter}%`,
                  background: `linear-gradient(90deg, ${tl.accent}55, ${tl.accent})`,
                  boxShadow: `0 0 6px ${tl.accent}`,
                }}
                role="progressbar"
                aria-valuenow={tl.meter}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={k ? tl.khLabel : tl.enLabel}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={`text-center text-[10px] mt-3 italic ${k ? "font-khmer" : ""}`} style={{ color: INK_SOFT }}>
        {k
          ? "ទិន្នន័យបង្ហាញគឺឧទាហរណ៍ មិនមែនពិត ; តួលេខពិភពលោកប្រែប្រួលប្រចាំថ្ងៃ។"
          : "Figures shown are illustrative, not live; real-world numbers shift daily."}
      </div>
    </div>
  );
}

function DistributionFlow({ k }: { k: boolean }) {
  const stages = [
    { Icon: Database,    en: "Sensors count what exists",     kh: "សេនស័ររាប់អ្វីដែលមាន",          accent: CYAN   },
    { Icon: BrainCircuit, en: "AI computes the optimum plan", kh: "AI គណនាផែនការដ៏ល្អបំផុត",       accent: VIOLET },
    { Icon: Workflow,    en: "Trucks, drones, ships dispatch", kh: "រថយន្តដឹក ដ្រូន កប៉ាល់ ត្រូវបញ្ជូន", accent: LIME   },
    { Icon: Crown,       en: "Everyone fed · waste minimised", kh: "មនុស្សគ្រប់គ្នាបានញ៉ាំ · ខ្ជះខ្ជាយតិចបំផុត", accent: AMBER },
  ];
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: PANEL_2,
        borderColor: `${LIME}55`,
        boxShadow: `inset 0 0 0 1px ${LIME}11`,
      }}
      data-testid="distribution-flow"
    >
      <div className={`text-xs font-bold mb-3 ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color: LIME }}>
        {k ? "ខ្សែសង្វាក់ការចែកចាយ ៖ ៤ ជំហាន" : "DISTRIBUTION CHAIN · 4 STEPS"}
      </div>
      <ol className="grid sm:grid-cols-4 gap-2 sm:gap-3">
        {stages.map((s, i) => (
          <li
            key={i}
            className="rounded-xl border p-3 relative"
            style={{
              backgroundColor: PANEL,
              borderColor: `${s.accent}66`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="font-mono text-[10px] rounded-md px-1.5 py-0.5"
                style={{ backgroundColor: s.accent, color: BG }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <s.Icon className="w-4 h-4" style={{ color: s.accent }} />
            </div>
            <div className={`text-[12px] ${k ? "font-khmer leading-snug" : "leading-snug"}`} style={{ color: INK }}>
              {k ? s.kh : s.en}
            </div>
            {/* connector arrow on larger screens */}
            {i < stages.length - 1 && (
              <span
                className="hidden sm:block absolute top-1/2 -right-2 -translate-y-1/2"
                aria-hidden="true"
                style={{ color: s.accent }}
              >
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <div className={`text-center text-[11px] mt-3 ${k ? "font-khmer" : "italic"}`} style={{ color: INK_SOFT }}>
        {k
          ? "មិនមានលុយ មិនមានការប្រកួតប្រជែង — មានតែគណិតវិទ្យានៃតម្រូវការ និងផ្គត់ផ្គង់ នៅល្បឿនពន្លឺ។"
          : "No money, no competition — only the maths of need and supply, at the speed of light."}
      </div>
    </div>
  );
}

// keep unused-helper warning quiet for shared icon imports referenced only in one chapter
const _iconKeep: React.ComponentType[] = [Calculator];
void _iconKeep;

/* ════════════════════════════════════════════════════════════════════════════
 *  KARDASHEV SCALE — Measuring Cosmic Civilizations
 *  មាត្រដ្ឋានខាដាសេវ — ការវាស់វែងអរិយធម៌ចក្រវាល
 * ════════════════════════════════════════════════════════════════════════════ */

const KAR_DEEP   = "#03030a";
const KAR_NEON_B = "#60a5fa";   // glowing stellar blue
const KAR_NEON_P = "#c084fc";   // nebula purple
const KAR_GOLD   = "#fcd34d";

function KardashevScale({ k }: { k: boolean }) {
  return (
    <div className="space-y-8">
      {/* ── HERO STRIP ─────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden border p-6 sm:p-8"
        style={{
          backgroundColor: KAR_DEEP,
          borderColor: `${KAR_NEON_P}66`,
          boxShadow: `inset 0 0 60px -10px ${KAR_NEON_P}44, 0 0 40px -16px ${KAR_NEON_B}88`,
        }}
      >
        <StarField />
        <div className="relative">
          <div
            className={`flex items-center gap-2 text-[11px] mb-2 ${
              k ? "font-khmer" : "font-mono uppercase tracking-[0.3em]"
            }`}
            style={{ color: KAR_NEON_P }}
          >
            <Telescope className="w-3.5 h-3.5" />
            <span>{k ? "ខាដាសេវ · ១៩៦៤" : "Kardashev · 1964"}</span>
            <span style={{ color: INK_SOFT }}>·</span>
            <span style={{ color: INK_SOFT }}>TECH-FUTURE-K1</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-extrabold leading-tight max-w-3xl ${
              k ? "font-khmer leading-loose" : ""
            }`}
            style={{
              color: INK,
              textShadow: `0 0 18px ${KAR_NEON_B}aa, 0 0 38px ${KAR_NEON_P}66`,
            }}
          >
            {k
              ? "មាត្រដ្ឋានខាដាសេវ៖ ការវាស់វែងអរិយធម៌ចក្រវាល"
              : "The Kardashev Scale: Measuring Cosmic Civilizations"}
          </h2>
          <p
            className={`mt-3 text-sm sm:text-base max-w-3xl ${
              k ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
            style={{ color: INK_SOFT }}
          >
            {k
              ? "មិនមែនវាស់ភាពជឿនលឿនដោយនយោបាយ ឬសិល្បៈ — តែតាមរយៈរូបវិទ្យាសុទ្ធសាធ៖ តើពួកគេអាចគ្រប់គ្រងថាមពលបានប៉ុន្មានដោយសុវត្ថិភាព?"
              : "Not measured by politics or art — but by raw physics: how much energy can they safely command?"}
          </p>
        </div>
      </div>

      {/* ── SECTION 1 · The Energy Ruler ───────────────────── */}
      <Panel accent={KAR_NEON_B}>
        <H2
          k={k}
          en="The Energy Ruler"
          kh="បន្ទាត់វាស់ថាមពល"
          Icon={Gauge}
          accent={KAR_NEON_B}
        />
        <P
          k={k}
          en="In 1964 the Soviet astronomer Nikolai Kardashev asked a question no one had asked before: if we ever meet aliens, or look at our own future selves a thousand years from now, what's the fairest way to compare civilizations? Not by their poetry, not by their flags, not even by their politics — those are too local. Kardashev's answer was beautifully simple. Measure them by physics. Measure them by the one thing every civilization needs and every civilization spends — energy."
          kh="នៅឆ្នាំ ១៩៦៤ តារាវិទូសូវៀត Nikolai Kardashev បានសួរសំណួរថ្មី ៖ ប្រសិនបើយើងជួបជនបរទេស ឬមើលខ្លួនយើងផ្ទាល់នៅអនាគត តើវិធីយុត្តិធម៌បំផុតប្រៀបធៀបអរិយធម៌ជាអ្វី? មិនមែនកំណាព្យ ទង់ជាតិ ឬនយោបាយទេ — ទាំងអស់នោះតូចចង្អៀតពេក។ ចម្លើយរបស់ខាដាសេវគឺសាមញ្ញដ៏ស្រស់ស្អាត ៖ វាស់តាមរូបវិទ្យា — តាមអ្វីមួយដែលគ្រប់អរិយធម៌ត្រូវការ និងគ្រប់អរិយធម៌ចំណាយ — ថាមពល។"
        />
        <p
          className={`mt-4 text-xs italic ${
            k ? "font-khmer leading-loose" : ""
          }`}
          style={{ color: KAR_NEON_B }}
        >
          {k
            ? "« មិនមែនអ្វីដែលអ្នកគិត — តែអ្វីដែលអ្នកអាចបញ្ចេញនិងគ្រប់គ្រងបាន។ »"
            : "“Not what you think — but what you can release and command.”"}
        </p>
      </Panel>

      {/* ── SECTION 2 · The Three Types ─────────────────────── */}
      <div>
        <H2
          k={k}
          en="The Three Types"
          kh="ប្រភេទទាំងបី"
          Icon={Crown}
          accent={KAR_NEON_P}
        />
        <div className="space-y-5">
          <CivTier
            k={k}
            tier="I"
            tierKh="១"
            offset={0}
            accent={KAR_NEON_B}
            titleEn="The Planetary Master"
            titleKh="ម្ចាស់ភព"
            energyEn="≈ 10¹⁶ watts (all sunlight hitting Earth)"
            energyKh="≈ ១០¹⁶ វ៉ាត់ (ពន្លឺព្រះអាទិត្យទាំងអស់ប៉ះផែនដី)"
            descEn="A civilization that harnesses 100% of the energy hitting its planet from its parent star. They control the weather, mine the oceans, and use clean fusion power."
            descKh="អរិយធម៌ដែលប្រើថាមពល ១០០% ដែលប៉ះផែនដីខ្លួនពីព្រះអាទិត្យមេ។ ពួកគេគ្រប់គ្រងអាកាសធាតុ ជីករករទឹក និងប្រើថាមពលហ្វូស្យុងស្អាត។"
            statusEn="Humanity is currently only Type ≈ 0.73 — we still dig up dead plants (coal, oil) and burn them for heat."
            statusKh="មនុស្សជាតិបច្ចុប្បន្នស្ថិតនៅប្រភេទ ≈ ០.៧៣ — យើងនៅតែជីករុក្ខជាតិស្លាប់ (ធ្យូងថ្ម ប្រេង) ហើយដុតវាដើម្បីយកកំដៅ។"
            Visual={TierIVisual}
          />
          <CivTier
            k={k}
            tier="II"
            tierKh="២"
            offset={32}
            accent={KAR_NEON_P}
            titleEn="The Stellar Master"
            titleKh="ម្ចាស់តារា"
            energyEn="≈ 10²⁶ watts (the entire output of a star)"
            energyKh="≈ ១០²⁶ វ៉ាត់ (ផលិតផលទាំងមូលនៃតារាមួយ)"
            descEn="A civilization that captures 100% of the energy radiated by an entire star. The classic blueprint is the Dyson Sphere — a vast swarm of solar collectors built to enclose the Sun and harvest every photon."
            descKh="អរិយធម៌ដែលចាប់យក ១០០% នៃថាមពលដែលតារាទាំងមូលផ្សាយ។ គំនូសប្លង់បុរាណគឺ Dyson Sphere — ហ្វូងធំសម្បើមនៃផ្ទាំងសូឡាដែលសង់ឡោមព័ទ្ធព្រះអាទិត្យ ហើយប្រមូលគ្រាប់ពន្លឺនីមួយៗ។"
            statusEn="A Type II would never know an energy shortage in the lifetime of its star — about 5 billion more years for our Sun."
            statusKh="ប្រភេទ ២ នឹងមិនដែលដឹងពីខ្វះថាមពលក្នុងអាយុកាលនៃតារារបស់ខ្លួនទេ — ប្រហែល ៥ ពាន់លានឆ្នាំទៀតសម្រាប់ព្រះអាទិត្យរបស់យើង។"
            Visual={TierIIVisual}
            badgeEn="Dyson Sphere"
            badgeKh="ស្វ៊ែរដាយសុន"
          />
          <CivTier
            k={k}
            tier="III"
            tierKh="៣"
            offset={64}
            accent={KAR_GOLD}
            titleEn="The Galactic Master"
            titleKh="ម្ចាស់កាឡាក់ស៊ី"
            energyEn="≈ 10³⁶ watts (the energy of an entire galaxy)"
            energyKh="≈ ១០³⁶ វ៉ាត់ (ថាមពលនៃកាឡាក់ស៊ីទាំងមូល)"
            descEn="A civilization that has spread across the stars and harnesses the energy of an entire galaxy — including the colossal power of supermassive black holes at galactic cores."
            descKh="អរិយធម៌ដែលបានរីករាលដាលឆ្លងកាត់តារា ហើយប្រើថាមពលនៃកាឡាក់ស៊ីទាំងមូល — រួមទាំងថាមពលដ៏សម្បើមនៃរន្ធខ្មៅធំៗនៅចំកណ្ដាលកាឡាក់ស៊ី។"
            statusEn="From this height, the leap from Type II to Type III dwarfs every prior leap. We may already have detected hints — vast galaxies that are strangely dim in visible light, but glow in waste heat."
            statusKh="ពីកំពូលនេះ ការលោតពីប្រភេទ ២ ទៅប្រភេទ ៣ ធំជាងការលោតមុនៗទាំងអស់។ យើងប្រហែលជាបានរកឃើញដាន — កាឡាក់ស៊ីធំដែលងងឹតក្នុងពន្លឺមើលឃើញ ប៉ុន្តែភ្លឺនៅក្នុងកំដៅខ្ជះខ្ជាយ។"
            Visual={TierIIIVisual}
          />
        </div>
      </div>

      {/* ── SECTION 3 · The Great Transition ─────────────────── */}
      <Panel accent={ROSE}>
        <H2
          k={k}
          en="The Great Transition"
          kh="ការផ្លាស់ប្តូរដ៏អស្ចារ្យ"
          Icon={AlertTriangle}
          accent={ROSE}
        />
        <P
          k={k}
          en="Moving from Type 0 to Type I is the single most dangerous moment in the life of any species. By the time a civilization is powerful enough to cross that line, it has already invented technologies that can destroy it — nuclear weapons, runaway climate change, engineered plagues, hostile artificial intelligence. But it does not yet have the wisdom, the planetary energy grid, or the political coordination to save itself. The window is narrow. Many civilizations may have entered it. We do not know how many came out the other side."
          kh="ការផ្លាស់ប្ដូរពីប្រភេទ ០ ទៅប្រភេទ ១ គឺជាពេលគ្រោះថ្នាក់បំផុតក្នុងជីវិតនៃប្រភេទណាមួយ។ នៅពេលអរិយធម៌មានកម្លាំងគ្រប់គ្រាន់ឆ្លងកាត់បន្ទាត់នោះ វាបានបង្កើតបច្ចេកវិទ្យាដែលអាចបំផ្លាញខ្លួនរួចហើយ — អាវុធនុយក្លេអ៊ែរ ការប្រែប្រួលអាកាសធាតុ ជំងឺរាតត្បាត និងបញ្ញាសិប្បនិម្មិតអរិសក។ ប៉ុន្តែវាមិនទាន់មានវិចារណញាណ បណ្ដាញថាមពលផែនដី ឬការសម្របសម្រួលនយោបាយដើម្បីសង្គ្រោះខ្លួនទេ។ បង្អួចគឺតូចចង្អៀត។"
        />
        <div
          className="mt-5 rounded-xl border-l-4 px-4 py-4"
          style={{
            backgroundColor: `${ROSE}11`,
            borderColor: ROSE,
          }}
        >
          <p
            className={`text-sm font-semibold ${
              k ? "font-khmer leading-loose" : ""
            }`}
            style={{ color: INK }}
          >
            {k
              ? "« ការរស់រានមានជីវិតពីការលោតផ្លោះទៅកាន់អរិយធម៌ប្រភេទទី ១ គឺជាការសាកល្បងដ៏ធំបំផុតនៃបញ្ញារបស់មនុស្ស។ »"
              : "“Surviving the leap to a Type I civilization is the ultimate test of human intelligence.”"}
          </p>
          <p
            className={`mt-2 text-xs italic ${
              k ? "" : "font-khmer leading-loose"
            }`}
            style={{ color: INK_SOFT }}
          >
            {k
              ? "(Surviving the leap to a Type I civilization is the ultimate test of human intelligence.)"
              : "(ការរស់រានមានជីវិតពីការលោតផ្លោះទៅកាន់អរិយធម៌ប្រភេទទី ១ គឺជាការសាកល្បងដ៏ធំបំផុតនៃបញ្ញារបស់មនុស្ស។)"}
          </p>
        </div>
      </Panel>

      {/* ── SECTION 4 · Civilization Tracker ─────────────────── */}
      <Panel accent={KAR_GOLD}>
        <H2
          k={k}
          en="Civilization Tracker"
          kh="ឧបករណ៍តាមដានអរិយធម៌"
          Icon={Gauge}
          accent={KAR_GOLD}
        />
        <P
          k={k}
          en="Drag the marker — or press play — to watch humanity creep along the energy ruler from the campfire (≈ 0.10) to roughly where we sit today (≈ 0.73)."
          kh="អូសសញ្ញាសម្គាល់ — ឬចុច Play — ដើម្បីមើលមនុស្សជាតិវិវត្តតាមបន្ទាត់ថាមពល ពីភ្លើងបោះជំរុំ (≈ ០.១០) ទៅជាប្រហែលកន្លែងដែលយើងស្ថិតនៅសព្វថ្ងៃ (≈ ០.៧៣)។"
        />
        <CivilizationTracker k={k} />
      </Panel>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 *  Tier card with staircase offset
 * ───────────────────────────────────────────────────────────────────────── */

function CivTier({
  k,
  tier,
  tierKh,
  offset,
  accent,
  titleEn,
  titleKh,
  energyEn,
  energyKh,
  descEn,
  descKh,
  statusEn,
  statusKh,
  Visual,
  badgeEn,
  badgeKh,
}: {
  k: boolean;
  tier: string;
  tierKh: string;
  offset: number;
  accent: string;
  titleEn: string;
  titleKh: string;
  energyEn: string;
  energyKh: string;
  descEn: string;
  descKh: string;
  statusEn: string;
  statusKh: string;
  Visual: React.ComponentType<{ accent: string }>;
  badgeEn?: string;
  badgeKh?: string;
}) {
  return (
    <div style={{ marginLeft: offset }} className="relative">
      {/* riser line on the left to suggest a staircase */}
      <div
        aria-hidden
        className="absolute -left-3 top-2 bottom-2 w-[2px] rounded-full"
        style={{
          background: `linear-gradient(180deg, ${accent}88, ${accent}11)`,
          boxShadow: `0 0 12px ${accent}66`,
        }}
      />
      <div
        className="rounded-2xl border p-5 sm:p-6 grid sm:grid-cols-[180px_1fr] gap-5 items-center"
        style={{
          backgroundColor: PANEL_2,
          borderColor: `${accent}66`,
          boxShadow: `inset 0 0 0 1px ${accent}11, 0 0 36px -16px ${accent}aa`,
        }}
      >
        {/* Visual */}
        <div
          className="aspect-square w-full max-w-[180px] mx-auto rounded-xl flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: KAR_DEEP,
            border: `1px solid ${accent}44`,
            boxShadow: `inset 0 0 30px ${accent}22`,
          }}
        >
          <Visual accent={accent} />
        </div>

        {/* Body */}
        <div>
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <span
              className="font-mono text-[11px] tracking-widest px-2 py-0.5 rounded-full border"
              style={{ color: accent, borderColor: `${accent}66` }}
            >
              {k ? `ប្រភេទ ${tierKh}` : `TYPE ${tier}`}
            </span>
            {badgeEn && (
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full ${
                  k ? "font-khmer" : "font-mono uppercase tracking-widest"
                }`}
                style={{
                  backgroundColor: `${accent}22`,
                  color: accent,
                  border: `1px solid ${accent}55`,
                }}
              >
                {k ? badgeKh : badgeEn}
              </span>
            )}
            <span
              className={`ml-auto text-[11px] ${
                k ? "font-khmer" : "font-mono"
              }`}
              style={{ color: INK_SOFT }}
            >
              {k ? energyKh : energyEn}
            </span>
          </div>

          <h3
            className={`text-lg sm:text-xl font-bold mb-2 ${
              k ? "font-khmer" : ""
            }`}
            style={{ color: INK, textShadow: `0 0 14px ${accent}66` }}
          >
            {k ? titleKh : titleEn}
          </h3>

          <p
            className={`text-sm ${
              k ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
            style={{ color: INK_SOFT }}
          >
            {k ? descKh : descEn}
          </p>

          <p
            className={`mt-3 text-xs ${
              k ? "font-khmer leading-loose" : "italic leading-relaxed"
            }`}
            style={{ color: accent }}
          >
            {k ? statusKh : statusEn}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 *  Tier visuals — pure SVG
 * ───────────────────────────────────────────────────────────────────────── */

function TierIVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <radialGradient id="kar1-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={KAR_GOLD} />
          <stop offset="60%" stopColor={KAR_GOLD} stopOpacity="0.7" />
          <stop offset="100%" stopColor={KAR_GOLD} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="kar1-earth" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="60%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0c1e5e" />
        </radialGradient>
      </defs>
      {/* sun top-right */}
      <circle cx="92" cy="22" r="14" fill="url(#kar1-sun)" />
      <circle cx="92" cy="22" r="7" fill={KAR_GOLD} />
      {/* energy rays toward earth */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={88 - i * 4}
          y1={28 + i * 3}
          x2={64 - i * 4}
          y2={62 + i * 3}
          stroke={KAR_GOLD}
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      ))}
      {/* earth */}
      <circle cx="48" cy="78" r="26" fill="url(#kar1-earth)" stroke={accent} strokeWidth="0.8" />
      {/* simple continents */}
      <path
        d="M30 72 q8 -6 16 -2 q6 4 14 0 M28 86 q10 4 22 -2 q6 -2 12 2"
        fill="none"
        stroke="#84cc16"
        strokeWidth="1.4"
        strokeOpacity="0.7"
      />
      {/* capture ring around earth */}
      <ellipse
        cx="48"
        cy="78"
        rx="32"
        ry="9"
        fill="none"
        stroke={accent}
        strokeWidth="1.2"
        strokeDasharray="3 2"
        opacity="0.7"
      />
    </svg>
  );
}

function TierIIVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <radialGradient id="kar2-star" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7c2" />
          <stop offset="50%" stopColor={KAR_GOLD} />
          <stop offset="100%" stopColor={KAR_GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* central star */}
      <circle cx="60" cy="60" r="22" fill="url(#kar2-star)" />
      <circle cx="60" cy="60" r="10" fill="#fef3c7" />
      {/* dyson swarm — concentric arcs of solar collectors */}
      {[34, 42, 50].map((r, i) => (
        <g key={i}>
          <ellipse
            cx="60"
            cy="60"
            rx={r}
            ry={r * 0.85}
            fill="none"
            stroke={accent}
            strokeOpacity="0.45"
            strokeWidth="0.8"
            transform={`rotate(${i * 28} 60 60)`}
          />
          {Array.from({ length: 12 }).map((_, j) => {
            const ang = (j / 12) * Math.PI * 2 + i * 0.2;
            const x = 60 + Math.cos(ang) * r;
            const y = 60 + Math.sin(ang) * r * 0.85;
            return (
              <rect
                key={j}
                x={x - 1.6}
                y={y - 1.1}
                width="3.2"
                height="2.2"
                fill={accent}
                opacity={0.7 + (j % 3) * 0.1}
                transform={`rotate(${(ang * 180) / Math.PI + 90} ${x} ${y})`}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

function TierIIIVisual({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <radialGradient id="kar3-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" />
          <stop offset="40%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor={KAR_NEON_P} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="kar3-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="60%" stopColor={KAR_NEON_P} stopOpacity="0.25" />
          <stop offset="100%" stopColor={KAR_NEON_P} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* halo */}
      <circle cx="60" cy="60" r="55" fill="url(#kar3-glow)" />
      {/* spiral arms */}
      {[0, 1].map((arm) => (
        <g key={arm} transform={`rotate(${arm * 180} 60 60)`}>
          {Array.from({ length: 28 }).map((_, i) => {
            const t = i / 28;
            const angle = t * Math.PI * 2.2;
            const r = 8 + t * 44;
            const x = 60 + Math.cos(angle) * r;
            const y = 60 + Math.sin(angle) * r;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={1.4 + (1 - t) * 1.6}
                fill={i % 5 === 0 ? KAR_GOLD : "#fff"}
                opacity={0.45 + (1 - t) * 0.5}
              />
            );
          })}
        </g>
      ))}
      {/* black hole core with accretion ring */}
      <circle cx="60" cy="60" r="14" fill="url(#kar3-core)" />
      <ellipse
        cx="60"
        cy="60"
        rx="16"
        ry="4"
        fill="none"
        stroke={KAR_GOLD}
        strokeWidth="1.4"
        opacity="0.85"
      />
      <circle cx="60" cy="60" r="6" fill="#000" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 *  Civilization Tracker — interactive slider + auto-play animation
 * ───────────────────────────────────────────────────────────────────────── */

const CIV_MILESTONES: { v: number; en: string; kh: string; Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }[] = [
  { v: 0.10, en: "Fire & Wood",    kh: "ភ្លើង និងឧស",            Icon: Flame },
  { v: 0.30, en: "Agriculture",    kh: "កសិកម្ម",                Icon: WheatIcon },
  { v: 0.55, en: "Steam & Coal",   kh: "ចំហាយ និងធ្យូងថ្ម",        Icon: Atom },
  { v: 0.68, en: "Electric Grid",  kh: "បណ្ដាញអគ្គិសនី",          Icon: Lightbulb },
  { v: 0.73, en: "Today",          kh: "សព្វថ្ងៃ",                Icon: Sun },
  { v: 1.00, en: "Type I Goal",    kh: "គោលដៅប្រភេទ ១",          Icon: Orbit },
];

function CivilizationTracker({ k }: { k: boolean }) {
  const [val, setVal] = useState(0.73);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);
  const tStart = useRef(0);

  // Animate from 0.10 → 0.73 over ~5 seconds when playing.
  useEffect(() => {
    if (!playing) return;
    const FROM = 0.10;
    const TO = 0.73;
    const DUR = 5000;
    tStart.current = performance.now();
    setVal(FROM);

    const tick = (now: number) => {
      const p = Math.min(1, (now - tStart.current) / DUR);
      // ease-in-out for "slowly creeping"
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setVal(FROM + (TO - FROM) * eased);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPlaying(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const pct = Math.max(0, Math.min(1, val)) * 100;
  const active = [...CIV_MILESTONES].reverse().find((m) => val >= m.v - 0.001) ?? CIV_MILESTONES[0];
  const display = val.toFixed(2);
  const displayKh = display.replace(/[0-9]/g, (d) => "០១២៣៤៥៦៧៨៩"[Number(d)]);

  return (
    <div className="mt-5">
      {/* Read-out */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <div className="flex items-center gap-3">
          <active.Icon className="w-5 h-5" style={{ color: KAR_GOLD }} />
          <div>
            <div
              className={`text-base font-bold ${k ? "font-khmer" : ""}`}
              style={{ color: INK }}
            >
              {k ? active.kh : active.en}
            </div>
            <div
              className={`text-[11px] ${k ? "font-khmer" : "font-mono uppercase tracking-widest"}`}
              style={{ color: INK_SOFT }}
            >
              {k
                ? `ប្រភេទ ${displayKh}`
                : `TYPE ${display}`}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className={`tap-target inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${k ? "font-khmer" : ""}`}
            style={{
              backgroundColor: playing ? `${ROSE}22` : `${KAR_GOLD}22`,
              borderColor: playing ? ROSE : KAR_GOLD,
              color: playing ? ROSE : KAR_GOLD,
            }}
            aria-label={playing ? (k ? "ផ្អាក" : "Pause") : (k ? "ចាក់" : "Play")}
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {playing ? (k ? "ផ្អាក" : "Pause") : (k ? "ចាក់" : "Play")}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setVal(0.10);
            }}
            className={`tap-target inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${k ? "font-khmer" : ""}`}
            style={{
              backgroundColor: `${INK_SOFT}11`,
              borderColor: `${INK_SOFT}55`,
              color: INK_SOFT,
            }}
            aria-label={k ? "កំណត់ឡើងវិញ" : "Reset"}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {k ? "ដំបូង" : "Reset"}
          </button>
        </div>
      </div>

      {/* Bar */}
      <div className="relative h-12">
        <div
          className="absolute inset-y-3 left-0 right-0 rounded-full overflow-hidden"
          style={{
            backgroundColor: KAR_DEEP,
            border: `1px solid ${KAR_NEON_P}55`,
          }}
        >
          <div
            className="h-full rounded-full transition-[width] duration-150"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${KAR_NEON_B} 0%, ${KAR_NEON_P} 60%, ${KAR_GOLD} 100%)`,
              boxShadow: `0 0 22px ${KAR_NEON_P}cc`,
            }}
          />
        </div>

        {/* Milestone ticks */}
        {CIV_MILESTONES.map((m) => (
          <div
            key={m.v}
            className="absolute top-0 bottom-0 flex flex-col items-center"
            style={{ left: `${m.v * 100}%`, transform: "translateX(-50%)" }}
          >
            <div
              className="w-[1px] h-3"
              style={{ backgroundColor: val >= m.v ? KAR_GOLD : `${INK_SOFT}66` }}
            />
            <div
              className="w-[1px] flex-1"
              style={{ backgroundColor: `${INK_SOFT}33` }}
            />
            <div
              className="w-[1px] h-3"
              style={{ backgroundColor: val >= m.v ? KAR_GOLD : `${INK_SOFT}66` }}
            />
          </div>
        ))}

        {/* Range input on top — invisible, controls the marker */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={val}
          onChange={(e) => {
            setPlaying(false);
            setVal(Number(e.target.value));
          }}
          aria-label={k ? "ឧបករណ៍តាមដានអរិយធម៌" : "Civilization Tracker"}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          style={{ height: "100%" }}
        />
      </div>

      {/* Milestone labels */}
      <div className="relative mt-2 h-10">
        {CIV_MILESTONES.map((m) => {
          const reached = val >= m.v - 0.001;
          return (
            <div
              key={m.v}
              className="absolute top-0 text-center"
              style={{
                left: `${m.v * 100}%`,
                transform: "translateX(-50%)",
                width: 78,
              }}
            >
              <div
                className={`text-[10px] leading-tight ${
                  k ? "font-khmer" : "font-mono uppercase tracking-wider"
                }`}
                style={{
                  color: reached ? KAR_GOLD : INK_SOFT,
                  textShadow: reached ? `0 0 8px ${KAR_GOLD}88` : "none",
                }}
              >
                {k ? m.kh : m.en}
              </div>
              <div
                className="text-[10px] font-mono mt-0.5"
                style={{ color: reached ? KAR_GOLD : `${INK_SOFT}88` }}
              >
                {k
                  ? m.v.toFixed(2).replace(/[0-9]/g, (d) => "០១២៣៤៥៦៧៨៩"[Number(d)])
                  : m.v.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 *  Hero starfield (deterministic, no flicker on re-render)
 * ───────────────────────────────────────────────────────────────────────── */

function StarField() {
  // Pre-computed deterministic "random" starfield so it never re-shuffles
  // on language toggle and stays still under the text.
  const stars = Array.from({ length: 60 }).map((_, i) => {
    const x = ((i * 73) % 100);
    const y = ((i * 137) % 100);
    const r = 0.4 + ((i * 11) % 10) / 12;
    const o = 0.25 + ((i * 17) % 50) / 100;
    return { x, y, r, o, key: i };
  });
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="kar-nebula" cx="78%" cy="22%" r="60%">
          <stop offset="0%" stopColor={KAR_NEON_P} stopOpacity="0.35" />
          <stop offset="60%" stopColor={KAR_NEON_B} stopOpacity="0.08" />
          <stop offset="100%" stopColor={KAR_NEON_B} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#kar-nebula)" />
      {stars.map((s) => (
        <circle
          key={s.key}
          cx={s.x}
          cy={s.y}
          r={s.r * 0.4}
          fill="#fff"
          opacity={s.o}
        />
      ))}
    </svg>
  );
}

