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
} from "lucide-react";
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

type TabId = "intelligence" | "software" | "economy";

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
