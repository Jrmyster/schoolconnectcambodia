import {
  Atom,
  Lock,
  FlaskConical,
  Layers,
  BrainCircuit,
  Sparkles,
  AlertTriangle,
  KeyRound,
  Cpu,
  Infinity as InfinityIcon,
  Coins,
  Orbit,
  Network,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode, CSSProperties } from "react";

const SHELL: CSSProperties = {
  boxShadow:
    "0 0 60px -15px rgba(167, 139, 250, 0.45), inset 0 0 80px -40px rgba(217, 70, 239, 0.25)",
};

const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(167,139,250,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.18) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

export function QuantumEraModule() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border-2 border-violet-500/50 bg-gradient-to-br from-slate-950 via-violet-950/40 to-slate-950 px-5 sm:px-10 py-8 sm:py-12 text-slate-100"
      style={SHELL}
      data-testid="quantum-era-module"
    >
      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={GRID_OVERLAY}
      />

      {/* Corner crosshairs */}
      {[
        { top: "10px", left: "10px" },
        { top: "10px", right: "10px" },
        { bottom: "10px", left: "10px" },
        { bottom: "10px", right: "10px" },
      ].map((pos, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute w-5 h-5 pointer-events-none"
          style={pos}
        >
          <div className="absolute inset-0 border-l-2 border-t-2 border-violet-300/70" />
        </div>
      ))}

      {/* Faint orbiting atom watermark */}
      <Orbit
        aria-hidden="true"
        className="absolute -right-10 -top-10 w-56 h-56 text-violet-400/10 rotate-12 pointer-events-none"
        strokeWidth={1.2}
      />

      <div className="relative space-y-10 sm:space-y-12">
        {/* Module hero strip */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-violet-500/15 border-2 border-violet-400/60 text-violet-300 flex items-center justify-center flex-shrink-0 shadow-[0_0_25px_-5px_rgba(167,139,250,0.6)]">
            <Atom className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10px] font-mono uppercase tracking-[0.3em] text-fuchsia-300/85">
              <span>Featured deep dive</span>
              <span className="font-khmer normal-case tracking-normal text-xs text-fuchsia-200/85">
                ការសិក្សាស៊ីជម្រៅ
              </span>
            </div>
            <p className="mt-2 text-sm sm:text-base text-violet-100/85 leading-relaxed max-w-3xl">
              Silicon transistors built the modern world — but they are
              approaching a physical wall. The next generation of computers
              will not just switch faster. They will think in a different way
              entirely — in <em className="text-fuchsia-300 not-italic font-semibold">probabilities</em>.
            </p>
            <p className="mt-1 text-sm sm:text-base text-violet-100/70 font-khmer leading-loose max-w-3xl">
              ត្រង់ស៊ីស្ទ័រស៊ីលីកូន​បាន​សាងសង់​ពិភពលោក​សម័យ​ទំនើប — ប៉ុន្តែ​វា​ជិត​ដល់​ដែន​កំណត់​រូបវន្ត​ហើយ។
              កុំព្យូទ័រ​ជំនាន់​ក្រោយ​នឹង​មិន​ត្រឹម​តែ​លឿន​ជាង​នេះ​ទេ — វា​នឹង​គិត​បែប​ខុស​គ្នា​ទាំង​ស្រុង​គឺ​គិត​ជា
              <span className="text-fuchsia-300 font-semibold"> ប្រូបាប៊ីលីតេ</span>។
            </p>
          </div>
        </div>

        {/* ── Section 1: Bits vs. Qubits ─────────────────────────── */}
        <section data-testid="quantum-section-bits-vs-qubits">
          <SubHeading
            kickerEn="Section 1"
            kickerKh="ផ្នែកទី ១"
            titleEn="Bits vs. Qubits"
            titleKh="ប៊ីត និង ឃ្យូប៊ីត"
            Icon={Atom}
            tone="violet"
          />

          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
            Every computer you have ever touched thinks in two states: ON or
            OFF, 1 or 0. A quantum computer breaks that rule.
          </p>
          <p className="mt-1 text-sm sm:text-base text-slate-300 font-khmer leading-loose">
            កុំព្យូទ័រគ្រប់គ្រឿងដែលអ្នកធ្លាប់ប៉ះ គិតជាពីរស្ថានភាព៖ បើក ឬបិទ
            ១ ឬ ០។ កុំព្យូទ័រកង់ទិចបំបែកច្បាប់នោះ។
          </p>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {/* Classical bit */}
            <div className="rounded-2xl border border-blue-400/40 bg-gradient-to-br from-slate-900/95 via-blue-950/60 to-slate-900/95 p-5 shadow-[0_0_25px_-10px_rgba(96,165,250,0.5)]">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/50 text-blue-300 flex items-center justify-center flex-shrink-0">
                  <Coins className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-300/85">
                    Classical bit
                  </div>
                  <div className="text-xs text-blue-200/85 font-khmer">
                    ប៊ីតធម្មតា
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Like a <strong className="text-blue-200">coin sitting on a table</strong> — it is
                strictly Heads (1) or Tails (0). To find its way through a
                maze, the computer must try one path at a time, then another,
                then another.
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 font-khmer leading-loose">
                ដូច​ជា<strong className="text-blue-200"> កាក់​មួយ​ដាក់​នៅ​លើ​តុ</strong> — វា​គឺ​ជា Heads (១)
                ឬ Tails (០) ប៉ុណ្ណោះ។ ដើម្បី​រក​ផ្លូវ​ចេញ​ពី​តំបន់​ផ្លូវ​វិល​វល់​មួយ
                កុំព្យូទ័រ​ត្រូវ​សាកល្បង​ផ្លូវ​មួយ​ម្តង រួច​សាក​ផ្លូវ​មួយ​ទៀត រហូត​ដល់​រក​ឃើញ។
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Pill tone="blue">0</Pill>
                <Pill tone="blue">or</Pill>
                <Pill tone="blue">1</Pill>
                <Pill tone="blue" muted>
                  one path
                </Pill>
              </div>
            </div>

            {/* Qubit */}
            <div className="rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-slate-900/95 via-fuchsia-950/60 to-slate-900/95 p-5 shadow-[0_0_30px_-10px_rgba(232,121,249,0.55)]">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-lg bg-fuchsia-500/20 border border-fuchsia-400/50 text-fuchsia-300 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-fuchsia-300/90">
                    Qubit · superposition
                  </div>
                  <div className="text-xs text-fuchsia-200/90 font-khmer">
                    ឃ្យូប៊ីត · ស៊ុបពើរប៉ូស៊ីស្យង
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Like a <strong className="text-fuchsia-200">coin spinning in the air</strong> — it
                is a blur of Heads <em>and</em> Tails at the same time. With
                clever quantum tricks, it can effectively explore{" "}
                <strong className="text-fuchsia-200">many paths through the maze in parallel</strong> and
                let the right answer rise to the top.
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 font-khmer leading-loose">
                ដូច​ជា<strong className="text-fuchsia-200"> កាក់​មួយ​វិល​នៅ​លើ​អាកាស</strong> —
                វា​គឺ​ជា​ការ​លាយ​ឡំ​រវាង Heads <em>និង</em> Tails ក្នុង​ពេល​តែ​មួយ។
                តាម​រយៈ​ល្បិច​កង់ទិច វា​អាច
                <strong className="text-fuchsia-200"> ស្ទង់​មើល​ផ្លូវ​ច្រើន​ស្រប​គ្នា</strong>
                ហើយ​ឱ្យ​ចម្លើយ​ត្រឹម​ត្រូវ​ងើប​ឡើង​លើ។
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Pill tone="fuchsia">0</Pill>
                <Pill tone="fuchsia">+</Pill>
                <Pill tone="fuchsia">1</Pill>
                <Pill tone="fuchsia" muted>
                  every path at once
                </Pill>
              </div>
            </div>
          </div>

          {/* Entanglement callout */}
          <div className="mt-5 rounded-2xl border border-violet-400/50 bg-gradient-to-r from-violet-950/70 via-fuchsia-950/40 to-violet-950/70 p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 border border-violet-300/60 text-violet-200 flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_-3px_rgba(167,139,250,0.7)]">
                <Network className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-violet-300/90">
                    Bonus concept · Entanglement
                  </span>
                  <span className="text-xs text-violet-200/85 font-khmer">
                    ការភ្ជាប់គ្នានៃកង់ទិច
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                  Imagine two <em>entangled</em> spinning coins. Neither has a
                  decided side until you look — but the moment you check one,
                  the other is <strong className="text-fuchsia-200">guaranteed to show the matching result</strong>,
                  even on the far side of the universe. (Strangely, you can't
                  use this to send messages faster than light — you can only
                  see the match afterwards, when both observers compare notes.)
                  Einstein famously hated this, calling it{" "}
                  <em>"spooky action at a distance."</em>
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-200 font-khmer leading-loose">
                  ស្រមៃ​មើល​កាក់​វិល​ពីរ​ដែល​បាន<em>ភ្ជាប់​គ្នា</em>។ មុន​ពេល​អ្នក​មើល
                  ទាំង​ពីរ​មិន​ទាន់​មាន​ផ្នែក​ច្បាស់​លាស់​ទេ — ប៉ុន្តែ​ពេល​អ្នក​ពិនិត្យ​មួយ
                  មួយ​ទៀត​ត្រូវ
                  <strong className="text-fuchsia-200"> បង្ហាញ​លទ្ធផល​ផ្គូ​គ្នា​បេះបិទ</strong>
                  ទោះ​បី​ជា​វា​នៅ​ខាង​ម្ខាង​ទៀត​នៃ​ចក្រវាឡ​ក៏​ដោយ។
                  (រឿង​ចម្លែក​គឺ​អ្នក​មិន​អាច​ប្រើ​បាតុភូត​នេះ​ផ្ញើ​សារ​លឿន​ជាង​ពន្លឺ​បាន​ទេ —
                  អ្នក​អាច​ឃើញ​តែ​ការ​ផ្គូ​គ្នា​នៅ​ពេល​អ្នក​សង្កេត​ទាំង​ពីរ​ប្រៀបធៀប​លទ្ធផល​គ្នា​ប៉ុណ្ណោះ។)
                  Einstein ស្អប់​រឿង​នេះ​ខ្លាំង ហើយ​ហៅ​វា​ថា
                  <em> "សកម្មភាព​អាថ៌​កំបាំង​ពី​ចម្ងាយ។"</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Shor's Algorithm ─────────────────────────── */}
        <section data-testid="quantum-section-shor">
          <SubHeading
            kickerEn="Section 2"
            kickerKh="ផ្នែកទី ២"
            titleEn="Cracking the Code — Shor's Algorithm"
            titleKh="ក្បួនដោះស្រាយរបស់ Shor"
            Icon={Lock}
            tone="violet"
          />

          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
            Every password you type, every banking transaction, every private
            message — modern internet security rests on math problems like{" "}
            <em>factoring an enormous number that is the product of two huge
            primes</em>. A normal computer would need{" "}
            <strong className="text-fuchsia-300">millions of years</strong> to crack a single one.
          </p>
          <p className="mt-1 text-sm sm:text-base text-slate-300 font-khmer leading-loose">
            ពាក្យ​សម្ងាត់​រាល់​ដង ប្រតិបត្តិការ​ធនាគារ និង​សារ​ផ្ទាល់​ខ្លួន —
            សុវត្ថិភាព​អ៊ីនធឺណិត​សម័យ​ទំនើប​ពឹង​លើ​បញ្ហា​គណិតវិទ្យា ដូច​ជា
            <em> ការ​បំបែក​លេខ​ដ៏​ធំ​មួយ​ដែល​ជា​ផល​គុណ​នៃ​លេខ​បឋម​ធំ​ពីរ</em>។
            កុំព្យូទ័រ​ធម្មតា​ត្រូវ​ការ<strong className="text-fuchsia-300"> រាប់​លាន​ឆ្នាំ</strong>
            ដើម្បី​បំបែក​លេខ​មួយ​បែប​នេះ។
          </p>

          {/* Crypto-crisis callout */}
          <div className="mt-5 rounded-2xl border-2 border-rose-400/50 bg-gradient-to-br from-rose-950/60 via-fuchsia-950/40 to-violet-950/60 p-5 sm:p-6 shadow-[0_0_30px_-10px_rgba(244,63,94,0.55)]">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-rose-500/25 border border-rose-300/60 text-rose-200 flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_-3px_rgba(251,113,133,0.7)]">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose-200/95">
                    The looming cryptography crisis
                  </span>
                  <span className="text-xs text-rose-100/90 font-khmer">
                    វិបត្តិកូដនីយកម្មនាពេលអនាគត
                  </span>
                </div>
                <h4 className="mt-1 font-display text-lg sm:text-xl font-bold text-white leading-snug">
                  <span className="block">
                    Shor's Algorithm — minutes instead of millennia
                  </span>
                  <span className="block font-khmer text-base sm:text-lg text-fuchsia-200 mt-0.5 leading-relaxed">
                    ក្បួនដោះស្រាយរបស់ Shor — ប៉ុន្មាននាទីជំនួសឱ្យរាប់ពាន់ឆ្នាំ
                  </span>
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-100 leading-relaxed">
                  In 1994 a mathematician named <strong className="text-fuchsia-200">Peter Shor</strong>{" "}
                  discovered a quantum calculation that, on a large enough
                  quantum computer, could factor those same enormous numbers
                  in <strong className="text-rose-200">hours or minutes</strong>{" "}
                  instead of millennia. The day a stable, large quantum
                  computer arrives, many of the locks that protect today's
                  internet — most prominently RSA — would no longer be safe.
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-200 font-khmer leading-loose">
                  នៅ​ឆ្នាំ ១៩៩៤ លោក<strong className="text-fuchsia-200"> Peter Shor</strong>
                  បាន​រក​ឃើញ​ការ​គណនា​កង់ទិច​មួយ ដែល​នៅ​លើ​កុំព្យូទ័រ​កង់ទិច​ធំ​គ្រប់​គ្រាន់
                  អាច​បំបែក​លេខ​ធំៗ​ទាំង​នោះ​ក្នុង​រយៈ​ពេល
                  <strong className="text-rose-200"> ប៉ុន្មាន​ម៉ោង ឬ​ប៉ុន្មាន​នាទី</strong>
                  ជំនួស​ឱ្យ​រាប់​ពាន់​ឆ្នាំ។ ថ្ងៃ​ដែល​កុំព្យូទ័រ​កង់ទិច​ធំ និង​ស្ថេរភាព​មក​ដល់
                  សោ​ជា​ច្រើន​ដែល​ការពារ​អ៊ីនធឺណិត​សព្វ​ថ្ងៃ — ជាពិសេស RSA —
                  នឹង​លែង​មាន​សុវត្ថិភាព​ទៀត​ហើយ។
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip icon={KeyRound} en="RSA · broken" kh="RSA · បាក់" tone="rose" />
                  <Chip
                    icon={Lock}
                    en="Banking encryption · vulnerable"
                    kh="ការអ៊ិនគ្រីបធនាគារ · មានហានិភ័យ"
                    tone="rose"
                  />
                  <Chip
                    icon={Cpu}
                    en="Race for post-quantum crypto"
                    kh="ការប្រជែង​សម្រាប់​កូដនីយកម្ម​ក្រោយ​កង់ទិច"
                    tone="violet"
                  />
                </div>

                <p className="mt-3 text-[11px] sm:text-xs text-rose-100/80 italic leading-relaxed">
                  The world's mathematicians are already racing to invent
                  new <strong>quantum-proof locks</strong> before quantum
                  computers become fully stable. This is one of the great
                  engineering races of the 21st century.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Applications & The Future ────────────────── */}
        <section data-testid="quantum-section-applications">
          <SubHeading
            kickerEn="Section 3"
            kickerKh="ផ្នែកទី ៣"
            titleEn="Applications & The Future"
            titleKh="ការអនុវត្ត និងអនាគត"
            Icon={Sparkles}
            tone="violet"
          />

          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
            Breaking codes is the <em>famous</em> use of quantum computers.
            But the everyday revolution is even bigger — because the
            building blocks of nature are themselves quantum, and quantum
            computers are uniquely well-suited to simulating them.
          </p>
          <p className="mt-1 text-sm sm:text-base text-slate-300 font-khmer leading-loose">
            ការ​បំបែក​កូដ​គឺ​ជា​ការ​ប្រើ​ប្រាស់<em>ល្បីល្បាញ</em>​នៃ​កុំព្យូទ័រ​កង់ទិច។
            ប៉ុន្តែ​បដិវត្តន៍​ប្រចាំ​ថ្ងៃ​គឺ​ធំ​ជាង — ព្រោះ​សមាសភាគ​មូលដ្ឋាន​នៃ​ធម្មជាតិ​ខ្លួន​វា​ជា​កង់ទិច
            ហើយ​កុំព្យូទ័រ​កង់ទិច​គឺ​ជា​ឧបករណ៍​ដ៏​សក្តិសម​ជាង​គេ​សម្រាប់​ក្លែង​ធ្វើ​ពួក​វា។
          </p>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <ApplicationCard
              Icon={FlaskConical}
              tone="emerald"
              kickerEn="Biochemistry · Medicine"
              kickerKh="ជីវគីមី · វេជ្ជសាស្ត្រ"
              titleEn="Cure diseases by simulating real molecules"
              titleKh="ព្យាបាលជំងឺ​ដោយ​ការ​ក្លែង​ធ្វើ​ម៉ូលេគុល​ពិត"
              bodyEn="Today's drug research is mostly an educated guess — chemists try thousands of compounds in a lab to see what sticks. A quantum computer can simulate the actual quantum chemistry of a protein and a candidate drug, atom for atom, before anything is ever mixed in a test tube. Cancer drugs, Alzheimer's treatments, vaccines — all could arrive years sooner."
              bodyKh="ការ​ស្រាវជ្រាវ​ថ្នាំ​បច្ចុប្បន្ន​ភាគច្រើន​គឺ​ជា​ការ​ទស្សន៍​ទាយ​ពូកែ — អ្នក​គីមីសាស្ត្រ​សាកល្បង​សារធាតុ​រាប់ពាន់​ក្នុង​មន្ទីរពិសោធន៍​មើល​ថា​មួយ​ណា​ទទួលផល។ កុំព្យូទ័រកង់ទិច​អាច​ក្លែង​ធ្វើ​គីមី​កង់ទិច​ពិតៗ​នៃ​ប្រូតេអ៊ីន និង​ថ្នាំ​បេក្ខជន — អាតូម​មួយៗ — មុន​ពេល​លាយ​អ្វី​ក្នុង​បំពង់​ពិសោធន៍។ ថ្នាំ​មហារីក ការ​ព្យាបាល​ជំងឺ​អាល់ហ្សាយម័រ វ៉ាក់សាំង — អាច​មក​ដល់​ឆាប់​ជាង​នេះ​ច្រើន​ឆ្នាំ។"
              tags={["Drug discovery", "Protein folding", "Vaccines"]}
            />

            <ApplicationCard
              Icon={Layers}
              tone="cyan"
              kickerEn="Material Science"
              kickerKh="វិទ្យាសាស្ត្រសម្ភារៈ"
              titleEn="Design lighter, stronger, cleaner materials"
              titleKh="រចនា​សម្ភារៈ​ស្រាល​ជាង រឹង​ជាង និង​ស្អាត​ជាង"
              bodyEn="Stronger steel for bridges, lighter alloys for solar panels, room-temperature superconductors for lossless power grids, better catalysts that pull CO₂ out of the air. Each is a quantum problem at heart — atoms arranging themselves to share electrons. Quantum simulation lets engineers design these materials on a screen instead of waiting on lucky discoveries in a lab."
              bodyKh="ដែក​រឹង​ជាង​សម្រាប់​ស្ពាន ជាតិលោហៈ​ស្រាល​ជាង​សម្រាប់​បន្ទះ​សូឡា អ្នក​នាំ​អគ្គិសនី​ដែល​មិន​បាត់បង់​ថាមពល​នៅ​សីតុណ្ហភាព​បន្ទប់ កាតាលីករ​ល្អ​ជាង​ដែល​ទាញ CO₂ ចេញ​ពី​ខ្យល់។ ទាំងអស់​នេះ​គឺ​ជា​បញ្ហា​កង់ទិច​នៅ​ខ្លួន — អាតូម​រៀបចំ​ខ្លួន​ឯង​ដើម្បី​ចែករំលែក​អេឡិចត្រុង។ ការ​ក្លែង​ធ្វើ​កង់ទិច​ឱ្យ​វិស្វករ​រចនា​សម្ភារៈ​ទាំងនេះ​នៅ​លើ​អេក្រង់ ជំនួស​ឱ្យ​ការ​រង់ចាំ​ការ​រក​ឃើញ​ចៃដន្យ។"
              tags={["Superconductors", "Solar cells", "Carbon capture"]}
            />
          </div>
        </section>

        {/* ── Section 4: Quantum Computing + AI ───────────────────── */}
        <section data-testid="quantum-section-ai">
          <SubHeading
            kickerEn="Section 4"
            kickerKh="ផ្នែកទី ៤"
            titleEn="Quantum Computing + AI"
            titleKh="កុំព្យូទ័រកង់ទិច និង AI"
            Icon={BrainCircuit}
            tone="fuchsia"
          />

          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
            Modern Artificial Intelligence is, at its heart, a calculation
            machine. To "think," it must multiply trillions of numbers
            together to find patterns in oceans of data. Today's AI is
            bottlenecked by the physical limits of silicon chips — every
            year we squeeze a few more transistors onto a wafer, but we are
            running out of room.
          </p>
          <p className="mt-1 text-sm sm:text-base text-slate-300 font-khmer leading-loose">
            បញ្ញាសិប្បនិម្មិត​សម័យ​ទំនើប​ខ្លឹមសារ​ពិតគឺ​ម៉ាស៊ីន​គណនា។ ដើម្បី
            «គិត» វា​ត្រូវ​គុណ​លេខ​រាប់​ពាន់​ពាន់​លាន​ដើម្បី​រក​លំនាំ​ក្នុង​សមុទ្រ​ទិន្នន័យ។
            AI សព្វថ្ងៃ​ត្រូវ​បាន​រឹត​ត្បិត​ដោយ​ដែន​កំណត់​រូបវន្ត​នៃ​បន្ទះ​ស៊ីលីកូន —
            រាល់​ឆ្នាំ​យើង​ច្របាច់​ត្រង់ស៊ីស្ទ័រ​បន្ថែម​ទៀត​លើ​បន្ទះ​មួយ ប៉ុន្តែ​យើង​ជិត​អស់​កន្លែង។
          </p>

          {/* ASI multiplier callout */}
          <div className="mt-5 rounded-2xl border-2 border-fuchsia-400/55 bg-gradient-to-br from-fuchsia-950/70 via-violet-950/60 to-indigo-950/70 p-5 sm:p-6 shadow-[0_0_35px_-10px_rgba(217,70,239,0.65)]">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-fuchsia-500/25 border border-fuchsia-300/60 text-fuchsia-100 flex items-center justify-center flex-shrink-0 shadow-[0_0_22px_-3px_rgba(232,121,249,0.85)]">
                <InfinityIcon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-fuchsia-200/95">
                    The unimaginable multiplier
                  </span>
                  <span className="text-xs text-fuchsia-100/90 font-khmer">
                    កត្តាគុណ​ដែល​មិន​អាច​ស្រមៃ​បាន
                  </span>
                </div>
                <h4 className="mt-1 font-display text-lg sm:text-xl font-bold text-white leading-snug">
                  <span className="block">
                    AI on quantum hardware = the ASI accelerator
                  </span>
                  <span className="block font-khmer text-base sm:text-lg text-fuchsia-200 mt-0.5 leading-relaxed">
                    AI លើ​ផ្នែក​រឹង​កង់ទិច = កម្មវិធី​បង្កើន​ល្បឿន ASI
                  </span>
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-100 leading-relaxed">
                  Plug an advanced AI into a mature quantum computer and you
                  give it hardware that can{" "}
                  <strong className="text-fuchsia-200">
                    weigh an unimaginable number of variables at once
                  </strong>
                  . Workloads that today fill a warehouse-sized data center
                  could one day fit on a far smaller quantum machine —
                  dramatically accelerating the path toward{" "}
                  <strong className="text-fuchsia-200">
                    Artificial Super Intelligence (ASI)
                  </strong>{" "}
                  and reshaping every industry, every job, and the global
                  economy. (Most researchers think this is decades away — but
                  the trajectory is real.)
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-200 font-khmer leading-loose">
                  ដោត AI កម្រិត​ខ្ពស់​ចូល​ក្នុង​កុំព្យូទ័រ​កង់ទិច​ចាស់ទុំ ហើយ​អ្នក​ផ្តល់​ឱ្យ​វា​នូវ​ផ្នែករឹង
                  ដែល​អាច
                  <strong className="text-fuchsia-200"> ថ្លឹង​អថេរ​ច្រើន​ដែល​មិន​អាច​ស្រមៃ​បាន​ក្នុង​ពេល​តែ​មួយ</strong>។
                  ការ​ងារ​ដែល​សព្វ​ថ្ងៃ​ត្រូវ​ការ​មជ្ឈមណ្ឌល​ទិន្នន័យ​ធំ​ដូច​ឃ្លាំង​មួយ
                  ថ្ងៃ​ណា​មួយ​អាច​ដំណើរ​ការ​នៅ​លើ​ម៉ាស៊ីន​កង់ទិច​តូច​ជាង​នោះ​ច្រើន — បង្កើន​ល្បឿន​ឆ្ពោះ​ទៅ​រក
                  <strong className="text-fuchsia-200"> បញ្ញា​សិប្បនិម្មិត​កម្រិត​លើស (ASI)</strong>
                  ហើយ​ផ្លាស់​ប្តូរ​គ្រប់​ឧស្សាហកម្ម គ្រប់​ការងារ និង​សេដ្ឋកិច្ច​សកល។
                  (អ្នក​ស្រាវ​ជ្រាវ​ភាគ​ច្រើន​គិត​ថា​នេះ​នៅ​រាប់​ទសវត្សរ៍​ខាង​មុខ — ប៉ុន្តែ​ទិសដៅ​នោះ​ជា​ការ​ពិត។)
                </p>

                <div className="mt-3 grid sm:grid-cols-3 gap-2">
                  <Stat
                    en="Silicon AI"
                    kh="AI លើ​ស៊ីលីកូន"
                    bigEn="Bottlenecked"
                    bigKh="មាន​ដែន​កំណត់"
                    tone="slate"
                  />
                  <ArrowRow />
                  <Stat
                    en="Quantum AI"
                    kh="AI កង់ទិច"
                    bigEn="Massively parallel"
                    bigKh="ស្រប​គ្នា​ច្រើន​ដង"
                    tone="fuchsia"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Closing pill */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 rounded-full border border-violet-400/50 bg-violet-950/50 text-violet-100 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-fuchsia-300" aria-hidden="true" />
                <span>The next computing revolution will not be faster.</span>
              </span>
              <span className="opacity-50">·</span>
              <span className="font-khmer leading-loose">
                បដិវត្តន៍​កុំព្យូទ័រ​បន្ទាប់​នឹង​មិន​ត្រឹម​លឿន​ជាង — វា​នឹង​ខុស​ប្រភេទ​ទាំង​ស្រុង។
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────── */
/* Helpers                                                                */
/* ───────────────────────────────────────────────────────────────────── */

function SubHeading({
  kickerEn,
  kickerKh,
  titleEn,
  titleKh,
  Icon,
  tone = "violet",
}: {
  kickerEn: string;
  kickerKh: string;
  titleEn: string;
  titleKh: string;
  Icon: LucideIcon;
  tone?: "violet" | "fuchsia";
}) {
  const palette =
    tone === "fuchsia"
      ? {
          chip: "bg-fuchsia-500/20 border-fuchsia-300/60 text-fuchsia-200",
          kicker: "text-fuchsia-300/95",
          kickerKh: "text-fuchsia-200/90",
          titleKh: "text-fuchsia-200",
        }
      : {
          chip: "bg-violet-500/20 border-violet-300/60 text-violet-200",
          kicker: "text-violet-300/95",
          kickerKh: "text-violet-200/90",
          titleKh: "text-violet-200",
        };

  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ${palette.chip}`}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.25em]">
          <span className={palette.kicker}>{kickerEn}</span>
          <span
            className={`font-khmer normal-case tracking-normal text-xs ${palette.kickerKh}`}
          >
            {kickerKh}
          </span>
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight mt-0.5">
          <span className="block">{titleEn}</span>
          <span
            className={`block font-khmer text-lg sm:text-xl font-bold mt-0.5 leading-relaxed ${palette.titleKh}`}
          >
            {titleKh}
          </span>
        </h3>
      </div>
    </div>
  );
}

function ApplicationCard({
  Icon,
  tone,
  kickerEn,
  kickerKh,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  tags,
}: {
  Icon: LucideIcon;
  tone: "emerald" | "cyan";
  kickerEn: string;
  kickerKh: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  tags: string[];
}) {
  const palette =
    tone === "emerald"
      ? {
          border: "border-emerald-400/45",
          shell:
            "from-slate-900/95 via-emerald-950/40 to-slate-900/95 shadow-[0_0_25px_-10px_rgba(52,211,153,0.5)]",
          chipBg: "bg-emerald-500/20 border-emerald-400/50 text-emerald-200",
          kicker: "text-emerald-300/90",
          kickerKh: "text-emerald-200/85",
          titleKh: "text-emerald-200",
          tag: "bg-emerald-500/15 border-emerald-400/40 text-emerald-200",
        }
      : {
          border: "border-cyan-400/45",
          shell:
            "from-slate-900/95 via-cyan-950/40 to-slate-900/95 shadow-[0_0_25px_-10px_rgba(34,211,238,0.5)]",
          chipBg: "bg-cyan-500/20 border-cyan-400/50 text-cyan-200",
          kicker: "text-cyan-300/90",
          kickerKh: "text-cyan-200/85",
          titleKh: "text-cyan-200",
          tag: "bg-cyan-500/15 border-cyan-400/40 text-cyan-200",
        };

  return (
    <div
      className={`rounded-2xl border ${palette.border} bg-gradient-to-br ${palette.shell} p-5`}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${palette.chipBg}`}
        >
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div
            className={`text-[10px] font-mono uppercase tracking-[0.2em] ${palette.kicker}`}
          >
            {kickerEn}
          </div>
          <div className={`text-xs font-khmer ${palette.kickerKh}`}>
            {kickerKh}
          </div>
        </div>
      </div>
      <h4 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
        <span className="block">{titleEn}</span>
        <span
          className={`block font-khmer text-sm sm:text-base font-semibold mt-0.5 leading-relaxed ${palette.titleKh}`}
        >
          {titleKh}
        </span>
      </h4>
      <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
        {bodyEn}
      </p>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-300 font-khmer leading-loose">
        {bodyKh}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`text-[10px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border ${palette.tag}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function Pill({
  children,
  tone,
  muted = false,
}: {
  children: ReactNode;
  tone: "blue" | "fuchsia";
  muted?: boolean;
}) {
  const palette =
    tone === "blue"
      ? muted
        ? "bg-blue-500/10 border-blue-400/30 text-blue-200/80"
        : "bg-blue-500/25 border-blue-300/60 text-blue-100 font-bold"
      : muted
      ? "bg-fuchsia-500/10 border-fuchsia-400/30 text-fuchsia-200/80"
      : "bg-fuchsia-500/25 border-fuchsia-300/60 text-fuchsia-100 font-bold";
  return (
    <span
      className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${palette}`}
    >
      {children}
    </span>
  );
}

function Chip({
  icon: Icon,
  en,
  kh,
  tone,
}: {
  icon: LucideIcon;
  en: string;
  kh: string;
  tone: "rose" | "violet";
}) {
  const palette =
    tone === "rose"
      ? "bg-rose-500/15 border-rose-300/50 text-rose-100"
      : "bg-violet-500/15 border-violet-300/50 text-violet-100";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1 rounded-full border ${palette}`}
    >
      <Icon className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
      <span>{en}</span>
      <span className="opacity-50">·</span>
      <span className="font-khmer">{kh}</span>
    </span>
  );
}

function Stat({
  en,
  kh,
  bigEn,
  bigKh,
  tone,
}: {
  en: string;
  kh: string;
  bigEn: string;
  bigKh: string;
  tone: "slate" | "fuchsia";
}) {
  const palette =
    tone === "fuchsia"
      ? {
          shell:
            "border-fuchsia-300/55 bg-fuchsia-500/15 shadow-[0_0_20px_-6px_rgba(232,121,249,0.7)]",
          eyebrow: "text-fuchsia-200/95",
          eyebrowKh: "text-fuchsia-100/90",
          big: "text-fuchsia-50",
          bigKh: "text-fuchsia-100/95",
        }
      : {
          shell: "border-slate-500/40 bg-slate-800/60",
          eyebrow: "text-slate-300/90",
          eyebrowKh: "text-slate-300/85",
          big: "text-slate-100",
          bigKh: "text-slate-200/90",
        };
  return (
    <div className={`rounded-xl border p-3 ${palette.shell}`}>
      <div
        className={`text-[10px] font-mono uppercase tracking-[0.2em] ${palette.eyebrow}`}
      >
        {en}
      </div>
      <div className={`text-[10px] font-khmer ${palette.eyebrowKh}`}>
        {kh}
      </div>
      <div className={`mt-1 font-bold text-base ${palette.big}`}>{bigEn}</div>
      <div
        className={`text-sm font-khmer leading-relaxed ${palette.bigKh}`}
      >
        {bigKh}
      </div>
    </div>
  );
}

function ArrowRow() {
  return (
    <div className="flex items-center justify-center sm:py-3">
      <div className="flex items-center gap-1 text-fuchsia-300">
        <span className="hidden sm:inline-block w-6 h-px bg-fuchsia-300/60" />
        <Sparkles className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline-block w-6 h-px bg-fuchsia-300/60" />
        <span className="sm:hidden text-[10px] font-mono uppercase tracking-[0.2em]">
          quantum leap
        </span>
      </div>
    </div>
  );
}
