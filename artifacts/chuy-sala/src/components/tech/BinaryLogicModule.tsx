import { useMemo, useState } from "react";
import {
  Binary,
  Cpu,
  Power,
  Lightbulb,
  KeyRound,
  Lock,
  CreditCard,
  Banknote,
  Zap,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Lesson 3 · The Language of the Machine — Binary & Logic
//   ▸ Section 1: Thinking in Ones and Zeros (transistors as light switches +
//                live letter→binary translator)
//   ▸ Section 2: Logic Gates (interactive AND / OR / NOT with truth tables)
//
//  Aesthetic: deep navy backgrounds, cyan grid lines, glowing technical accents
//  to match the established blueprint theme used by the rest of the page.
//  Bilingual EN + KH for every heading, gate name, and core concept.
// ════════════════════════════════════════════════════════════════════════════

export function BinaryLogicModule() {
  return (
    <div className="space-y-8" data-testid="binary-logic-module">
      <SubSectionOnesAndZeros />
      <SubSectionLogicGates />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  ▸ Section 1 · Thinking in Ones and Zeros
// ────────────────────────────────────────────────────────────────────────────
function SubSectionOnesAndZeros() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [letter, setLetter] = useState("A");

  const safeChar = useMemo(() => {
    const c = (letter || "A").trim().slice(0, 1).toUpperCase();
    return /^[A-Z0-9 ]$/.test(c) ? c : "A";
  }, [letter]);

  const code = safeChar.charCodeAt(0);
  const bits = useMemo(
    () => code.toString(2).padStart(8, "0").split("").map(Number),
    [code]
  );

  return (
    <article
      className="relative rounded-2xl border-2 border-cyan-500/30 bg-slate-950/70 p-5 sm:p-7 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-sm"
      data-testid="subsection-ones-and-zeros"
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Bilingual sub-heading (always paired) */}
      <header className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0">
          <Power className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400/80">
            PART 01 · ON / OFF
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug mt-0.5">
            Thinking in Ones and Zeros
          </h3>
          <p className="font-khmer text-lg sm:text-xl font-bold text-cyan-200 leading-relaxed">
            ការគិតជាលេខ ១ និង ០
          </p>
        </div>
      </header>

      <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
        <p>
          A computer has{" "}
          <strong className="text-cyan-300">no brain</strong>. What it has
          instead is{" "}
          <strong className="text-cyan-300">millions of microscopic light switches</strong>{" "}
          called <em>transistors</em>. Each switch can only be in one of two states:{" "}
          <span className="font-mono text-emerald-300 font-bold">ON (1)</span> or{" "}
          <span className="font-mono text-rose-300 font-bold">OFF (0)</span>. That is
          the entire alphabet a computer knows.
        </p>
        <p
          className={`font-khmer leading-loose border-t border-cyan-500/20 pt-3 ${kh ? "" : "text-slate-300/90"}`}
        >
          កុំព្យូទ័រ <strong className="text-cyan-300">គ្មានខួរក្បាលទេ</strong>។
          អ្វីដែលវាមានគឺ <strong className="text-cyan-300">កុងតាក់ភ្លើងតូចៗរាប់លាន</strong> ហៅថា{" "}
          <em>ត្រង់ស៊ីស្ទ័រ (transistors)</em>។ កុងតាក់នីមួយៗមានតែពីរស្ថានភាពប៉ុណ្ណោះ៖{" "}
          <span className="font-mono text-emerald-300 font-bold">បើក (1)</span> ឬ{" "}
          <span className="font-mono text-rose-300 font-bold">បិទ (0)</span>។
          នោះគឺជាអក្ខរក្រមទាំងមូលដែលកុំព្យូទ័រស្គាល់។
        </p>
      </div>

      {/* ── Visual: 8 little light switches ──────────────────────────── */}
      <div className="mt-6 rounded-xl border border-cyan-500/25 bg-slate-900/60 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400/80">
            8-bit register
          </span>
          <span className="font-khmer text-xs text-cyan-300/80">
            ជួររបស់ ៨ បីត
          </span>
        </div>
        <div className="grid grid-cols-8 gap-1.5 sm:gap-2">
          {bits.map((b, i) => (
            <SwitchCell key={i} on={b === 1} index={i} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>1 = ON · បើក</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-slate-700" />
            <span>0 = OFF · បិទ</span>
          </div>
        </div>
      </div>

      {/* ── Letter ↔ Binary translator ────────────────────────────────── */}
      <div className="mt-6 rounded-xl border-2 border-cyan-400/40 bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-900 p-4 sm:p-5 shadow-[0_0_25px_rgba(34,211,238,0.1)]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-300">
              Live Translator · កម្មវិធីបកប្រែផ្ទាល់
            </div>
            <h4 className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
              From a letter to ones and zeros
            </h4>
            <p className="font-khmer text-sm text-cyan-200/90 leading-relaxed">
              ពីអក្សរទៅជាលេខ ១ និង ០
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/80">
              Type a letter
              <span className="ml-1 font-khmer text-cyan-300/80 normal-case tracking-normal">
                · វាយអក្សរ
              </span>
            </label>
            <input
              data-testid="binary-input"
              type="text"
              maxLength={1}
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              className="w-12 h-10 text-center font-mono text-xl font-bold text-cyan-200 bg-slate-950 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:border-cyan-300 focus:shadow-[0_0_12px_rgba(34,211,238,0.5)] transition-all"
              aria-label="Letter to translate to binary"
            />
            <button
              type="button"
              onClick={() => setLetter("A")}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/10 transition-colors"
              aria-label="Reset to A"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        {/* Live translation row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 justify-center sm:justify-start">
          {/* Letter glyph */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/80">
              You see
            </span>
            <div
              className="w-20 h-20 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/60 flex items-center justify-center text-5xl font-display font-bold text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
              data-testid="binary-letter-glyph"
            >
              {safeChar}
            </div>
            <span className="font-khmer text-[10px] text-cyan-300/70">អ្នកឃើញ</span>
          </div>

          <ArrowRight className="w-6 h-6 text-cyan-400 hidden sm:block" />

          {/* ASCII code */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/80">
              ASCII number
            </span>
            <div className="px-4 py-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 font-mono text-2xl font-bold text-cyan-100">
              {code}
            </div>
            <span className="font-khmer text-[10px] text-cyan-300/70">លេខ ASCII</span>
          </div>

          <ArrowRight className="w-6 h-6 text-cyan-400 hidden sm:block" />

          {/* Binary */}
          <div className="flex-1 min-w-[200px] flex flex-col items-center sm:items-start gap-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/80">
              Computer sees · កុំព្យូទ័រឃើញ
            </span>
            <div
              className="px-4 py-3 rounded-xl bg-slate-950 border-2 border-emerald-400/50 font-mono text-xl sm:text-2xl font-bold text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.25)] tracking-widest"
              data-testid="binary-output"
            >
              {bits.join("")}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400 leading-relaxed border-t border-cyan-500/10 pt-3">
          <span className="font-mono text-cyan-300">'A' = 01000001</span> · 'B' =
          01000010 · 'C' = 01000011 · ' ' (space) = 00100000 — every single
          letter, picture, song, and video on every device in the world is
          ultimately stored as one of these long strings of ON and OFF.
        </p>
        <p className="mt-2 font-khmer text-xs text-slate-400 leading-loose">
          អក្សរនីមួយៗ រូបភាព ចម្រៀង និងវីដេអូនៅលើគ្រឿងបរិក្ខារទាំងអស់នៅលើពិភពលោក សុទ្ធតែត្រូវបានរក្សាទុកជាខ្សែវែងៗនៃ បើក និងបិទ ទាំងនេះ។
        </p>
      </div>
    </article>
  );
}

function SwitchCell({ on, index }: { on: boolean; index: number }) {
  return (
    <div
      data-testid={`bit-${index}`}
      className={`flex flex-col items-center justify-center gap-1 rounded-lg border-2 py-2 sm:py-3 font-mono font-bold text-base sm:text-lg transition-all ${
        on
          ? "border-emerald-400/70 bg-emerald-500/15 text-emerald-200 shadow-[0_0_14px_rgba(52,211,153,0.4)]"
          : "border-slate-700 bg-slate-900/60 text-slate-500"
      }`}
    >
      <Lightbulb
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${on ? "text-emerald-300" : "text-slate-600"}`}
      />
      <span>{on ? 1 : 0}</span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  ▸ Section 2 · Logic Gates
// ────────────────────────────────────────────────────────────────────────────
function SubSectionLogicGates() {
  return (
    <article
      className="relative rounded-2xl border-2 border-cyan-500/30 bg-slate-950/70 p-5 sm:p-7 shadow-[0_0_40px_rgba(34,211,238,0.08)] backdrop-blur-sm"
      data-testid="subsection-logic-gates"
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Bilingual sub-heading (always paired) */}
      <header className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400/80">
            PART 02 · DECISIONS
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug mt-0.5">
            Logic Gates — The Digital Brain
          </h3>
          <p className="font-khmer text-lg sm:text-xl font-bold text-cyan-200 leading-relaxed">
            ច្រកតក្កវិជ្ជា — ខួរក្បាលឌីជីថល
          </p>
        </div>
      </header>

      <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed">
        <p>
          So a computer only understands 1s and 0s. But how does it{" "}
          <em>decide</em> anything? It uses tiny circuits called{" "}
          <strong className="text-cyan-300">logic gates</strong> — simple rules
          that take 1s and 0s as input and spit out a 1 or a 0 as the answer.
          Stack billions of them together and you get a brain.
        </p>
        <p className="font-khmer leading-loose border-t border-cyan-500/20 pt-3">
          ដូច្នេះ កុំព្យូទ័រយល់តែលេខ ១ និង ០ ប៉ុណ្ណោះ។ ប៉ុន្តែតើវា <em>សម្រេចចិត្ត</em> យ៉ាងដូចម្តេច? វាប្រើសៀគ្វីតូចៗហៅថា{" "}
          <strong className="text-cyan-300">ច្រកតក្កវិជ្ជា (logic gates)</strong> — ច្បាប់ងាយៗដែលទទួលលេខ ១ និង ០ ជាការបញ្ចូល និងបញ្ចេញចម្លើយជាលេខ ១ ឬ ០។ បន្ដគ្នារាប់ពាន់លាន អ្នកនឹងបានខួរក្បាលមួយ។
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        <GateCard kind="AND" />
        <GateCard kind="OR" />
        <GateCard kind="NOT" />
      </div>

      {/* Closing footnote */}
      <div className="mt-6 rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4 flex items-start gap-3">
        <Zap className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="text-sm text-slate-200 leading-relaxed">
            <strong className="text-cyan-300">The big idea:</strong> every
            calculation, every game, every photo on your phone is just AND, OR,
            and NOT gates firing billions of times per second. The computer is
            not magic — it is just a very, very fast switch flipper.
          </p>
          <p className="font-khmer text-sm text-slate-200 leading-loose border-t border-cyan-500/15 pt-2">
            <strong className="text-cyan-300">គំនិតធំ៖</strong> រាល់ការគណនា ហ្គេមនីមួយៗ រូបថតនីមួយៗនៅលើទូរស័ព្ទរបស់អ្នក គឺគ្រាន់តែជាច្រក AND, OR និង NOT ដែលដំណើរការរាប់ពាន់លានដងក្នុងមួយវិនាទី។ កុំព្យូទ័រមិនមែនជាមន្តអាគមទេ — វាគ្រាន់តែជាអ្នកបិទបើកកុងតាក់ដ៏លឿនបំផុតម្នាក់ប៉ុណ្ណោះ។
          </p>
        </div>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────────────────────────────────
//  Interactive Gate Card (AND / OR / NOT)
// ────────────────────────────────────────────────────────────────────────────
type GateKind = "AND" | "OR" | "NOT";

const GATE_META: Record<
  GateKind,
  {
    nameKh: string;
    accent: string; // border + glow color class fragment
    text: string;
    bg: string;
    analogyEn: string;
    analogyKh: string;
    ruleEn: string;
    ruleKh: string;
    inputAEn: string;
    inputAKh: string;
    inputBEn: string;
    inputBKh: string;
    iconA: React.ComponentType<{ className?: string }>;
    iconB: React.ComponentType<{ className?: string }>;
  }
> = {
  AND: {
    nameKh: "ច្រក AND",
    accent: "border-emerald-400/60 shadow-[0_0_25px_rgba(52,211,153,0.18)]",
    text: "text-emerald-300",
    bg: "bg-emerald-500/10",
    analogyEn:
      "Like needing both a key AND a password to open the door. Miss either one and you stay outside.",
    analogyKh:
      "ដូចជាត្រូវការទាំង សោ និងពាក្យសម្ងាត់ ដើម្បីបើកទ្វារ។ បាត់មួយណាមួយ អ្នកនៅខាងក្រៅ។",
    ruleEn: "Outputs 1 only if BOTH inputs are 1.",
    ruleKh: "បញ្ចេញលេខ 1 លុះត្រាតែការបញ្ចូលទាំងពីរ ជាលេខ 1។",
    inputAEn: "Key",
    inputAKh: "សោ",
    inputBEn: "Password",
    inputBKh: "ពាក្យសម្ងាត់",
    iconA: KeyRound,
    iconB: Lock,
  },
  OR: {
    nameKh: "ច្រក OR",
    accent: "border-amber-400/60 shadow-[0_0_25px_rgba(251,191,36,0.18)]",
    text: "text-amber-300",
    bg: "bg-amber-500/10",
    analogyEn:
      "Like paying with cash OR with a card. Either one works — you only need one.",
    analogyKh:
      "ដូចជាការបង់ប្រាក់ដោយ សាច់ប្រាក់ ឬ ប័ណ្ណឥណទាន។ មួយណាក៏បាន — អ្នកត្រូវការតែមួយ។",
    ruleEn: "Outputs 1 if EITHER input is 1.",
    ruleKh: "បញ្ចេញលេខ 1 ប្រសិនបើការបញ្ចូលណាមួយ ជាលេខ 1។",
    inputAEn: "Cash",
    inputAKh: "សាច់ប្រាក់",
    inputBEn: "Card",
    inputBKh: "ប័ណ្ណឥណទាន",
    iconA: Banknote,
    iconB: CreditCard,
  },
  NOT: {
    nameKh: "ច្រក NOT",
    accent: "border-rose-400/60 shadow-[0_0_25px_rgba(244,114,182,0.18)]",
    text: "text-rose-300",
    bg: "bg-rose-500/10",
    analogyEn:
      "The rebel. It just flips the input. Give it a 1, it returns a 0. Give it a 0, it returns a 1.",
    analogyKh:
      "អ្នកបះបោរ។ វាគ្រាន់តែបង្វិលការបញ្ចូល។ ឱ្យវាលេខ 1 វានឹងផ្ដល់លេខ 0 វិញ។ ឱ្យវាលេខ 0 វានឹងផ្ដល់លេខ 1 វិញ។",
    ruleEn: "Outputs the OPPOSITE of the input.",
    ruleKh: "បញ្ចេញ ផ្ទុយ នឹងការបញ្ចូល។",
    inputAEn: "Signal",
    inputAKh: "សញ្ញា",
    inputBEn: "",
    inputBKh: "",
    iconA: Power,
    iconB: Power,
  },
};

function compute(kind: GateKind, a: 0 | 1, b: 0 | 1): 0 | 1 {
  if (kind === "AND") return (a & b) as 0 | 1;
  if (kind === "OR") return (a | b) as 0 | 1;
  return (a === 0 ? 1 : 0) as 0 | 1; // NOT
}

function GateCard({ kind }: { kind: GateKind }) {
  const meta = GATE_META[kind];
  const isUnary = kind === "NOT";
  const [a, setA] = useState<0 | 1>(1);
  const [b, setB] = useState<0 | 1>(isUnary ? 0 : 1);
  const out = compute(kind, a, isUnary ? 0 : b);

  return (
    <div
      data-testid={`gate-${kind.toLowerCase()}`}
      className={`relative rounded-2xl border-2 ${meta.accent} bg-slate-950/80 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-4`}
    >
      {/* Header: gate name (EN + KH paired) */}
      <header className="flex items-baseline gap-2 flex-wrap">
        <h4 className={`font-display text-2xl sm:text-3xl font-black ${meta.text}`}>
          {kind}
        </h4>
        <span className="font-khmer text-sm sm:text-base font-bold text-cyan-200">
          {meta.nameKh}
        </span>
        <span className="ml-auto text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
          GATE
        </span>
      </header>

      {/* Analogy */}
      <div className="space-y-2 text-sm leading-relaxed">
        <p className="text-slate-200">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/80 mr-1">
            Analogy:
          </span>
          {meta.analogyEn}
        </p>
        <p className="font-khmer text-slate-300 leading-loose border-t border-cyan-500/15 pt-2">
          <span className="text-xs text-cyan-300/80 mr-1">ការប្រៀបធៀប៖</span>
          {meta.analogyKh}
        </p>
      </div>

      {/* Interactive: click to toggle inputs */}
      <div className={`rounded-xl ${meta.bg} border border-slate-800 p-3`}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300/80">
            Try it · សាកល្បង
          </span>
          <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${meta.text}`}>
            click to flip
          </span>
        </div>
        <div className="flex items-center justify-around gap-2">
          {/* Input A */}
          <InputBit
            label={meta.inputAEn}
            labelKh={meta.inputAKh}
            value={a}
            onClick={() => setA((v) => ((v ? 0 : 1) as 0 | 1))}
            icon={meta.iconA}
            testid={`gate-${kind.toLowerCase()}-input-a`}
          />
          {!isUnary && (
            <InputBit
              label={meta.inputBEn}
              labelKh={meta.inputBKh}
              value={b}
              onClick={() => setB((v) => ((v ? 0 : 1) as 0 | 1))}
              icon={meta.iconB}
              testid={`gate-${kind.toLowerCase()}-input-b`}
            />
          )}
          <ArrowRight className={`w-5 h-5 flex-shrink-0 ${meta.text}`} />
          {/* Output */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">
              Output · លទ្ធផល
            </span>
            <div
              data-testid={`gate-${kind.toLowerCase()}-output`}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center font-mono text-2xl font-black transition-all ${
                out === 1
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-[0_0_18px_rgba(52,211,153,0.5)]"
                  : "border-slate-700 bg-slate-900 text-slate-500"
              }`}
            >
              {out}
            </div>
          </div>
        </div>
      </div>

      {/* Truth table */}
      <div className="rounded-lg border border-cyan-500/20 overflow-hidden">
        <div className="px-3 py-1.5 bg-slate-900/80 border-b border-cyan-500/20 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300/80">
            Truth table
          </span>
          <span className="font-khmer text-[10px] text-cyan-300/80">
            តារាងតក្កវិជ្ជា
          </span>
        </div>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="bg-slate-900/60 text-cyan-400/80">
              <th className="py-1.5 px-2 text-center font-medium">A</th>
              {!isUnary && <th className="py-1.5 px-2 text-center font-medium">B</th>}
              <th className="py-1.5 px-2 text-center font-medium">OUT</th>
            </tr>
          </thead>
          <tbody>
            {(isUnary
              ? ([[0, undefined, compute("NOT", 0, 0)], [1, undefined, compute("NOT", 1, 0)]] as const)
              : ([
                  [0, 0, compute(kind, 0, 0)],
                  [0, 1, compute(kind, 0, 1)],
                  [1, 0, compute(kind, 1, 0)],
                  [1, 1, compute(kind, 1, 1)],
                ] as const)
            ).map((row, i) => {
              const [ra, rb, ro] = row;
              const matchesCurrent =
                ra === a && (isUnary ? true : rb === b);
              return (
                <tr
                  key={i}
                  className={`border-t border-slate-800 ${
                    matchesCurrent ? "bg-cyan-500/10 text-cyan-100" : "text-slate-300"
                  }`}
                >
                  <td className="py-1 px-2 text-center">{ra}</td>
                  {!isUnary && <td className="py-1 px-2 text-center">{rb}</td>}
                  <td
                    className={`py-1 px-2 text-center font-bold ${
                      ro === 1 ? "text-emerald-300" : "text-rose-300"
                    }`}
                  >
                    {ro}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Rule */}
      <div className="text-xs leading-relaxed">
        <p className="text-slate-300">
          <strong className={meta.text}>Rule:</strong> {meta.ruleEn}
        </p>
        <p className="font-khmer text-slate-300 leading-loose mt-1">
          <strong className={meta.text}>ច្បាប់៖</strong> {meta.ruleKh}
        </p>
      </div>
    </div>
  );
}

function InputBit({
  label,
  labelKh,
  value,
  onClick,
  icon: Icon,
  testid,
}: {
  label: string;
  labelKh: string;
  value: 0 | 1;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  testid: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400 truncate max-w-[60px] sm:max-w-none">
        {label}
        <span className="font-khmer text-cyan-300/70 ml-1 normal-case tracking-normal">
          ({labelKh})
        </span>
      </span>
      <button
        type="button"
        data-testid={testid}
        onClick={onClick}
        aria-label={`${label} input — currently ${value}, click to flip`}
        className={`group w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex flex-col items-center justify-center font-mono text-2xl font-black transition-all hover:scale-105 ${
          value === 1
            ? "border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.4)]"
            : "border-slate-700 bg-slate-900 text-slate-500"
        }`}
      >
        <Icon className="w-3 h-3 mb-0.5 opacity-70" />
        {value}
      </button>
    </div>
  );
}

export default BinaryLogicModule;
