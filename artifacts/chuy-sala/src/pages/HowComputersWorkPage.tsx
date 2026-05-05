import type { CSSProperties } from "react";
import { Cpu, Compass, Binary, Code2, Stethoscope, BatteryCharging, History, Wifi, Router, Cog, Terminal, ShieldCheck, Atom, RadioTower, BrainCircuit } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { MotherboardBuilder } from "@/components/tech/MotherboardBuilder";
import { BinarySignalVisualizer } from "@/components/tech/BinarySignalVisualizer";
import { BinaryLogicModule } from "@/components/tech/BinaryLogicModule";
import { CommandLineModule } from "@/components/tech/CommandLineModule";
import { HardwareSoftwareAnalogy } from "@/components/tech/HardwareSoftwareAnalogy";
import { TechDoctor } from "@/components/tech/TechDoctor";
import { BatteryCareGuide } from "@/components/tech/BatteryCareGuide";
import { HistoryOfComputingTimeline } from "@/components/tech/HistoryOfComputingTimeline";
import { ApolloVsPhoneCard } from "@/components/tech/ApolloVsPhoneCard";
import { HorizonFutureCard } from "@/components/tech/HorizonFutureCard";
import { IoT5GModule } from "@/components/tech/IoT5GModule";
import { RouterPostOfficeModule } from "@/components/tech/RouterPostOfficeModule";
import { TrustArchitectureModule } from "@/components/tech/TrustArchitectureModule";
import { QuantumEraModule } from "@/components/tech/QuantumEraModule";
import { CellularNetworksModule } from "@/components/tech/CellularNetworksModule";

const BLUEPRINT_BG: CSSProperties = {
  backgroundColor: "#020617",
  backgroundImage:
    "linear-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.08) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
};

export function HowComputersWorkPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6 text-slate-100" style={BLUEPRINT_BG}>
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
        {/* HERO — blueprint card */}
        <header className="relative overflow-hidden rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 sm:px-10 py-10 sm:py-14 shadow-2xl">
          {/* Blueprint grid */}
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }} />
          {/* Corner crosshairs */}
          {[
            { top: "10px",    left: "10px"  },
            { top: "10px",    right: "10px" },
            { bottom: "10px", left: "10px"  },
            { bottom: "10px", right: "10px" },
          ].map((pos, i) => (
            <div key={i} className="absolute w-5 h-5 pointer-events-none" style={pos}>
              <div className="absolute inset-0 border-l-2 border-t-2 border-cyan-400/70" />
            </div>
          ))}
          <Cpu className="absolute -right-6 -top-6 w-44 h-44 text-cyan-400/10 rotate-12 pointer-events-none" strokeWidth={1.2} />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/15 border-2 border-cyan-400/60 text-cyan-300 flex items-center justify-center flex-shrink-0">
              <Cpu className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300/90 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Technology Hub", "មជ្ឈមណ្ឌលបច្ចេកវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span>{t("How Computers Work", "របៀបដែលកុំព្យូទ័រដំណើរការ")}</span>
              </div>
              <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white ${kh ? "font-khmer leading-snug" : ""}`}>
                {t("How Computers Work", "របៀបដែលកុំព្យូទ័រដំណើរការ")}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Open the case. Look inside. From a single transistor flipping ON or OFF to the apps you use every day — see exactly how a computer thinks.",
                  "បើកប្រអប់។ មើលខាងក្នុង។ ចាប់ពីត្រង់ស៊ីស្ទ័រមួយ ដែលបើក ឬបិទ រហូតដល់កម្មវិធីដែលអ្នកប្រើប្រចាំថ្ងៃ — មើលឱ្យច្បាស់ពីរបៀបដែលកុំព្យូទ័រគិត។",
                )}
              </p>
              <div className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-cyan-200/70 ${kh ? "font-khmer text-xs" : ""}`}>
                <span>{t("INTERACTIVES: 12", "ឧបករណ៍អន្តរកម្ម៖ ១២")}</span>
                <span className="opacity-40">|</span>
                <span>{t("BLUEPRINT THEME", "ប្រធានបទ Blueprint")}</span>
                <span className="opacity-40">|</span>
                <span>{t("BILINGUAL", "ទ្វេភាសា")}</span>
              </div>
            </div>
          </div>
        </header>

        {/* 1. Motherboard build tool */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ១" : "Lesson 1"}
            titleEn="The Virtual PC Build"
            titleKh="ការសាងសង់ Virtual PC"
            kh={kh}
            Icon={Cpu}
          />
          <MotherboardBuilder />
        </section>

        {/* 2. The Digital Post Office — Routers & Wi-Fi */}
        <section data-testid="lesson-router-postoffice">
          {/* Paired bilingual main heading — both EN + KH always visible. */}
          <div className="mb-4 sm:mb-5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0">
              <Router className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400/85">
                <span>Lesson 2</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-cyan-300/85">មេរៀនទី ២</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mt-0.5">
                <span className="block">The Digital Post Office — Routers &amp; Wi-Fi</span>
                <span className="block font-khmer text-xl sm:text-2xl font-bold text-cyan-200 mt-1 leading-relaxed">
                  ប្រៃសណីយ៍ឌីជីថល — រ៉ោតទ័រ និងវ៉ាយហ្វាយ
                </span>
              </h2>
            </div>
          </div>
          <RouterPostOfficeModule />
        </section>

        {/* 3. NEW · The Language of the Machine — Binary & Logic */}
        <section data-testid="lesson-binary-logic">
          {/* Paired bilingual main heading — both EN + KH always visible. */}
          <div className="mb-4 sm:mb-5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0">
              <Cog className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400/85">
                <span>Lesson 3</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-cyan-300/85">មេរៀនទី ៣</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mt-0.5">
                <span className="block">The Language of the Machine — Binary &amp; Logic</span>
                <span className="block font-khmer text-xl sm:text-2xl font-bold text-cyan-200 mt-1 leading-relaxed">
                  ភាសារបស់ម៉ាស៊ីន — លេខគោលពីរ និងតក្កវិជ្ជា
                </span>
              </h2>
            </div>
          </div>
          <BinaryLogicModule />
        </section>

        {/* 4. NEW · The Command Line — Talking to the Machine */}
        <section data-testid="lesson-command-line">
          {/* Paired bilingual main heading — both EN + KH always visible. */}
          <div className="mb-4 sm:mb-5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400/85">
                <span>Lesson 4</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-cyan-300/85">មេរៀនទី ៤</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mt-0.5">
                <span className="block">The Command Line — Talking to the Machine</span>
                <span className="block font-khmer text-xl sm:text-2xl font-bold text-cyan-200 mt-1 leading-relaxed">
                  បន្ទាត់ពាក្យបញ្ជា — ការនិយាយជាមួយម៉ាស៊ីន
                </span>
              </h2>
            </div>
          </div>
          <CommandLineModule />
        </section>

        {/* 5. Binary signal (was Lesson 4) */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ៥" : "Lesson 5"}
            titleEn="The Binary Signal"
            titleKh="សញ្ញាប្រព័ន្ធគោលពីរ"
            kh={kh}
            Icon={Binary}
          />
          <BinarySignalVisualizer />
        </section>

        {/* 6. Hardware vs Software (was Lesson 5) */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ៦" : "Lesson 6"}
            titleEn="Hardware vs. Software"
            titleKh="Hardware ប្រឆាំងនឹង Software"
            kh={kh}
            Icon={Code2}
          />
          <HardwareSoftwareAnalogy />
        </section>

        {/* 7. Tech Doctor — symptom checker (was Lesson 6) */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ៧" : "Lesson 7"}
            titleEn="Tech Doctor — Troubleshooting Clinic"
            titleKh="គ្រូពេទ្យបច្ចេកវិទ្យា — គ្លីនិកជួសជុល"
            kh={kh}
            Icon={Stethoscope}
          />
          <TechDoctor />
        </section>

        {/* 8. Battery Life & Care Guide (was Lesson 7) */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ៨" : "Lesson 8"}
            titleEn="Battery Life & Care Guide"
            titleKh="មគ្គុទ្ទេសក៍ថែទាំថ្ម"
            kh={kh}
            Icon={BatteryCharging}
          />
          <BatteryCareGuide />
        </section>

        {/* 9. IoT & 5G — The Global Nervous System (was Lesson 8) */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ៩" : "Lesson 9"}
            titleEn="IoT & 5G: The Global Nervous System"
            titleKh="អ៉ីនធឺណិតនៃកិច្ចការនានា និង 5G — ប្រព័ន្ធសរសៃប្រសាទសកល"
            kh={kh}
            Icon={Wifi}
          />
          <IoT5GModule />
        </section>

        {/* 10. NEW · The Invisible Web — Cellular Networks 2G to 6G */}
        <section
          id="cellular-networks"
          data-testid="lesson-cellular-networks"
          className="scroll-mt-24"
        >
          {/* Paired bilingual main heading — both EN + KH always visible. */}
          <div className="mb-4 sm:mb-5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0">
              <RadioTower className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400/85">
                <span>Lesson 10</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-cyan-300/85">មេរៀនទី ១០</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mt-0.5">
                <span className="block">The Invisible Web: Cellular Networks 2G to 6G</span>
                <span className="block font-khmer text-xl sm:text-2xl font-bold text-cyan-200 mt-1 leading-relaxed">
                  បណ្តាញអរូបី៖ បណ្តាញទូរស័ព្ទ 2G ដល់ 6G
                </span>
              </h2>
            </div>
          </div>
          <CellularNetworksModule />
        </section>

        {/* 11. History of Computing Timeline (was Lesson 10) */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ១១" : "Lesson 11"}
            titleEn="History of Computing — Timeline"
            titleKh="ប្រវត្តិរូបវិទ្យាកុំព្យូទ័រ — បន្ទាត់ពេលវេលា"
            kh={kh}
            Icon={History}
          />
          <HistoryOfComputingTimeline />
          <div className="mt-6">
            <ApolloVsPhoneCard />
          </div>
          <div className="mt-6">
            <HorizonFutureCard />
          </div>
        </section>

        {/* 12. The Architecture of Trust — Cryptography & Blockchain */}
        <section data-testid="lesson-trust-architecture">
          {/* Paired bilingual main heading — both EN + KH always visible. */}
          <div className="mb-4 sm:mb-5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400/85">
                <span>Lesson 12</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-emerald-300/85">មេរៀនទី ១២</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mt-0.5">
                <span className="block">The Architecture of Trust: Cryptography &amp; Blockchain</span>
                <span className="block font-khmer text-xl sm:text-2xl font-bold text-emerald-200 mt-1 leading-relaxed">
                  ស្ថាបត្យកម្មនៃទំនុកចិត្ត៖ កូដនីយកម្ម និងប្លុកឆេន
                </span>
              </h2>
            </div>
          </div>
          <TrustArchitectureModule />
        </section>

        {/* 13. FEATURED DEEP DIVE · Beyond Silicon — The Quantum Era */}
        <section data-testid="lesson-quantum-era">
          {/* Paired bilingual main heading — both EN + KH always visible.
              Violet/fuchsia palette to differentiate from cyan + emerald
              and signal "next-generation / futuristic". */}
          <div className="mb-4 sm:mb-5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/15 border border-violet-400/50 text-violet-300 flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_-4px_rgba(167,139,250,0.65)]">
              <Atom className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.25em] text-violet-300/95">
                <span>Lesson 13 · Featured deep dive</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-violet-200/85">
                  មេរៀនទី ១៣ · ការសិក្សាស៊ីជម្រៅ
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mt-0.5">
                <span className="block">Beyond Silicon: The Quantum Era</span>
                <span className="block font-khmer text-xl sm:text-2xl font-bold text-fuchsia-200 mt-1 leading-relaxed">
                  ហួសពីស៊ីលីកូន៖ យុគសម័យកង់ទិច
                </span>
              </h2>
            </div>
          </div>
          <QuantumEraModule />
        </section>

        {/* 14. FEATURED DEEP DIVE · The Modern Brain: AI Transformers */}
        <section data-testid="lesson-ai-transformers">
          <div className="mb-4 sm:mb-5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-400/50 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_-4px_rgba(251,191,36,0.55)]">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300/95">
                <span>Lesson 14 · Featured deep dive</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-amber-200/85">
                  មេរៀនទី ១៤ · ការសិក្សាស៊ីជម្រៅ
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mt-0.5">
                <span className="block">The Modern Brain: How AI Transformers Work</span>
                <span className="block font-khmer text-xl sm:text-2xl font-bold text-amber-200 mt-1 leading-relaxed">
                  ខួរក្បាលទំនើប៖ តើ AI Transformers ដំណើរការយ៉ាងដូចម្តេច
                </span>
              </h2>
            </div>
          </div>
          <AITransformersModule />
        </section>

        {/* 15. FEATURED DEEP DIVE · The Pocket Computer: Raspberry Pi */}
        <section data-testid="lesson-raspberry-pi">
          <div className="mb-4 sm:mb-5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-400/50 text-emerald-300 flex items-center justify-center flex-shrink-0 shadow-[0_0_18px_-4px_rgba(52,211,153,0.55)]">
              <PiCircuitBoardSVG size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300/95">
                <span>Lesson 15 · Featured deep dive</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-emerald-200/85">
                  មេរៀនទី ១៥ · ការសិក្សាស៊ីជម្រៅ
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mt-0.5">
                <span className="block">The Pocket Computer: Raspberry Pi</span>
                <span className="block font-khmer text-xl sm:text-2xl font-bold text-emerald-200 mt-1 leading-relaxed">
                  កុំព្យូទ័រក្នុងហោប៉ៅ៖ Raspberry Pi
                </span>
              </h2>
            </div>
          </div>
          <RaspberryPiModule />
        </section>
      </div>
    </div>
  );
}

// ── AI Transformers Module ──────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    colorClass: "border-amber-500/60 bg-amber-500/10",
    numClass: "text-amber-400",
    titleEn: "From Binary to Neural Networks",
    titleKh: "ពីប្រព័ន្ធទ្វេភាគ ទៅបណ្តាញសរសៃប្រសាទសិប្បនិម្មិត",
    bodyEn:
      "A CPU executes billions of ones and zeros per second — pure logic. Artificial Neural Networks (ANNs) stack these binary operations into layers of interconnected nodes, each modeled loosely on a brain neuron. Instead of following rigid IF/THEN rules, the network adjusts the strength (\"weight\") of each connection through training until it can recognize patterns: a handwritten digit, a spoken word, or a fraudulent transaction.",
    bodyKh:
      "CPU ដំណើរការលេខ ០ និង ១ ជាទ្វេនៃប្រព័ន្ធ — តក្កវិទ្យាសុទ្ធសាធ។ បណ្តាញសរសៃប្រសាទសិប្បនិម្មិត (ANN) ជង់ប្រតិបត្តិការទ្វេភាគទៅជាស្រទាប់នៃ node ដែលភ្ជាប់គ្នា ដូចនឹងនឺរ៉ូននៃខួរក្បាលមនុស្ស។ ជំនួសឱ្យការតាមដានច្បាប់តឹងរ៉ឹង បណ្តាញនេះកែប្រែ \"ទម្ងន់\" នៃការភ្ជាប់ ដើម្បីស្គាល់រូបភាព ជាដើម។",
  },
  {
    num: "02",
    colorClass: "border-orange-500/60 bg-orange-500/10",
    numClass: "text-orange-400",
    titleEn: "The Transformer Architecture",
    titleKh: "ស្ថាបត្យកម្ម Transformer",
    bodyEn:
      "In 2017, a Google team published \"Attention Is All You Need\" — introducing the Transformer. Unlike earlier AI that read data one token at a time (like a human reading left-to-right), a Transformer processes an entire sequence at once in parallel. This breakthrough made training on massive datasets practical for the first time, and is the foundation of every modern Large Language Model: GPT, Gemini, Claude, and beyond.",
    bodyKh:
      "ក្នុងឆ្នាំ ២០១៧ ក្រុម Google បានបង្ហាញ \"Attention Is All You Need\" — ណែនាំ Transformer។ ភាពខុសគ្នាពី AI មុន Transformer ដំណើរការ token ទាំងអស់ក្នុងពេលតែមួយ (ជំនួសការអានរៀងគ្នា)។ ភាពក្លាហានដូចនេះធ្វើឱ្យការបណ្តុះបណ្តាលដ៏ធំ GPT Gemini Claude ក្លាយជាការពិត។",
  },
  {
    num: "03",
    colorClass: "border-rose-500/60 bg-rose-500/10",
    numClass: "text-rose-400",
    titleEn: "The 'Attention' Mechanism",
    titleKh: "យន្តការនៃការយកចិត្តទុកដាក់",
    bodyEn:
      "Self-Attention is the core innovation. When a Transformer reads a sentence, every word simultaneously \"votes\" on how relevant every other word is to understanding it. The word \"bank\" alone is ambiguous — but surrounded by \"river\" and \"canoe\" the model learns to pay high attention to those nearby words and low attention to unrelated ones. This lets AI resolve context a rigid rule-set never could.",
    bodyKh:
      "Self-Attention គឺជានវានុវត្ត​ស្នូល។ ពេល Transformer អានប្រយោគ ពាក្យនីមួយៗ \"បោះឆ្នោត\" លើភាពពាក់ព័ន្ធរបស់ពាក្យផ្សេងទៀត។ ពាក្យ \"bank\" តែម្នាក់ឯងមិនច្បាស់ — ប៉ុន្តែបើព័ទ្ធជុំវិញដោយ \"ទន្លេ\" ម៉ូដែលស្គាល់ន័យ \"ច្រាំង\" ឬ \"ធនាគារ\" ដោយស្វ័យប្រវត្តិ — រឿងដែល AI ចាស់មិនអាចធ្វើបាន។",
  },
  {
    num: "04",
    colorClass: "border-purple-500/60 bg-purple-500/10",
    numClass: "text-purple-400",
    titleEn: "Predicting the Next Word",
    titleKh: "ការព្យាករណ៍ពាក្យបន្ទាប់",
    bodyEn:
      "At its foundation, a Large Language Model is an extraordinarily complex probability engine. Given every word it has seen so far, it computes a probability score across its entire vocabulary and picks the most contextually fitting next token. Scale this to trillions of parameters trained on most of the written internet, and the model can write essays, translate languages, debug code, and compose poetry — all from the same underlying math: P(next word | all previous words).",
    bodyKh:
      "ស្នូលនៃ Large Language Model គឺម៉ាស៊ីនប្រូបាប៊ីលីតេស្មុគស្មាញ។ វាគណនាពិន្ទុប្រូបាប៊ីលីតេសម្រាប់ token បន្ទាប់ ហើយជ្រើសរើសអ្វីដែលសមបំផុត។ ធំដល់ trillion parameter ផ្ទុកពាក្យរបស់អ៊ីនធឺណែត ម៉ូដែលអាចសរសេរអត្ថបទ បកប្រែ ជួសជុលកូដ — ទាំងអស់ពីគណិតវិទ្យាតែមួយ: P(ពាក្យបន្ទាប់ | ពាក្យទាំងអស់មុននេះ)។",
  },
] as const;

// Neural-network SVG icon — abstract node-and-edge web
function NeuralNetworkSVG() {
  // 9 nodes arranged in 3 layers: input(3), hidden(3), output(3)
  const nodes = [
    // Input layer  x=60
    { id: "i0", cx: 60,  cy: 60  },
    { id: "i1", cx: 60,  cy: 130 },
    { id: "i2", cx: 60,  cy: 200 },
    // Hidden layer x=160
    { id: "h0", cx: 160, cy: 85  },
    { id: "h1", cx: 160, cy: 130 },
    { id: "h2", cx: 160, cy: 175 },
    // Output layer x=260
    { id: "o0", cx: 260, cy: 100 },
    { id: "o1", cx: 260, cy: 160 },
  ];
  const edges: [string, string][] = [
    ["i0","h0"],["i0","h1"],["i0","h2"],
    ["i1","h0"],["i1","h1"],["i1","h2"],
    ["i2","h0"],["i2","h1"],["i2","h2"],
    ["h0","o0"],["h0","o1"],
    ["h1","o0"],["h1","o1"],
    ["h2","o0"],["h2","o1"],
  ];
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" aria-hidden="true">
      {/* Glow filter */}
      <defs>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* Edges */}
      {edges.map(([a, b]) => {
        const A = byId[a], B = byId[b];
        return (
          <line key={`${a}-${b}`}
            x1={A.cx} y1={A.cy} x2={B.cx} y2={B.cy}
            stroke="url(#edgeGrad)" strokeWidth="1.5" />
        );
      })}
      {/* Layer labels */}
      {[{ x: 60, label: "Input" }, { x: 160, label: "Hidden" }, { x: 260, label: "Output" }].map(l => (
        <text key={l.label} x={l.x} y={238} textAnchor="middle"
          fontSize="9" fill="#fbbf24" opacity="0.7" fontFamily="monospace" letterSpacing="0.05em">
          {l.label.toUpperCase()}
        </text>
      ))}
      {/* Nodes */}
      {nodes.map(n => {
        const isInput  = n.id.startsWith("i");
        const isOutput = n.id.startsWith("o");
        const fill = isInput ? "#f59e0b" : isOutput ? "#a78bfa" : "#34d399";
        return (
          <g key={n.id} filter="url(#glow)">
            <circle cx={n.cx} cy={n.cy} r={11} fill={fill} opacity="0.18" />
            <circle cx={n.cx} cy={n.cy} r={7}  fill={fill} opacity="0.85" />
            <circle cx={n.cx} cy={n.cy} r={3}  fill="#fff"  opacity="0.9"  />
          </g>
        );
      })}
    </svg>
  );
}

function AITransformersModule() {
  const t = useTranslation();

  return (
    <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-900 overflow-hidden shadow-xl">

      {/* ── Header band ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 px-6 sm:px-8 pt-7 pb-6 border-b border-amber-500/20">

        {/* SVG visual */}
        <div className="w-36 h-28 sm:w-44 sm:h-36 flex-shrink-0 rounded-xl border border-amber-500/30 bg-slate-900/70 p-2 overflow-hidden">
          <NeuralNetworkSVG />
        </div>

        {/* Intro text */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-amber-400/80 mb-2">
            {t("AI Architecture", "ស្ថាបត្យកម្ម AI")}
          </p>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-lg">
            {t(
              "Modern AI doesn't just follow instructions — it learns. Below is the four-step journey from the binary logic inside your CPU all the way to the 'thinking' of ChatGPT, Gemini, and Claude.",
              "AI ទំនើបមិនគ្រាន់តែធ្វើតាមការណែនាំ — វារៀន។ ខាងក្រោមគឺដំណើរការ ៤ ជំហានពីតក្កវិទ្យាទ្វេភាគដល់ \"ការគិត\" របស់ ChatGPT Gemini និង Claude។",
            )}
          </p>
        </div>
      </div>

      {/* ── Steps ── */}
      <div className="px-6 sm:px-8 py-6 space-y-4">
        {STEPS.map((step) => (
          <div key={step.num}
            className={`rounded-xl border ${step.colorClass} p-5 flex gap-4 items-start`}>

            {/* Step number */}
            <div className={`text-2xl font-black font-mono ${step.numClass} leading-none flex-shrink-0 w-9 text-right opacity-80`}>
              {step.num}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-white text-base sm:text-lg leading-snug mb-0.5">
                {step.titleEn}
              </h3>
              <p className="font-khmer text-xs sm:text-sm text-slate-300/80 mb-3 leading-relaxed">
                {step.titleKh}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t(step.bodyEn, step.bodyKh)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer callout ── */}
      <div className="mx-6 sm:mx-8 mb-7 mt-1 rounded-xl border border-purple-500/30 bg-purple-950/30 px-5 py-4">
        <p className="text-xs font-mono uppercase tracking-widest text-purple-400/80 mb-1.5">
          {t("The math behind it all", "គណិតវិទ្យាដែលស្ថិតនៅពីក្រោយ")}
        </p>
        <p className="text-slate-200 text-sm leading-relaxed font-mono">
          P(w<sub>n</sub> | w<sub>1</sub>, w<sub>2</sub>, … w<sub>n-1</sub>) → {t("predict the next best token", "ព្យាករណ៍ token ដ៏ល្អបំផុតបន្ទាប់")}
        </p>
        <p className="text-slate-400 text-xs mt-2">
          {t(
            "Scaled to trillions of parameters and petabytes of training data, this single equation underlies every essay, translation, and generated image produced by modern AI.",
            "ក្នុងទំហំ trillion parameter និង petabyte ទិន្នន័យ សមីការតែមួយនេះស្ថិតនៅពីក្រោម AI ទំនើបទាំងអស់។",
          )}
        </p>
      </div>
    </div>
  );
}

// ── Raspberry Pi SVG Icons ───────────────────────────────────────────────────

function PiCircuitBoardSVG({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
      <line x1="7" y1="1" x2="7" y2="3"  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="17" y1="1" x2="17" y2="3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="7" y1="21" x2="7" y2="23"  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="17" y1="21" x2="17" y2="23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="1" y1="7"  x2="3" y2="7"  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="1" y1="17" x2="3" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="21" y1="7"  x2="23" y2="7"  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="21" y1="17" x2="23" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function SoCChipSVG() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id="piGlow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect x="14" y="14" width="36" height="36" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1.5" filter="url(#piGlow)" />
      <rect x="20" y="20" width="24" height="24" rx="2" fill="#022c22" stroke="#6ee7b7" strokeWidth="1" />
      <text x="32" y="36" textAnchor="middle" fontSize="8" fill="#34d399" fontFamily="monospace" fontWeight="bold">SoC</text>
      {[18,26,34,42].map((y, i) => (
        <g key={i}>
          <line x1="6" y1={y} x2="14" y2={y} stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1={y} x2="58" y2={y} stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      {[18,26,34,42].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="6"  x2={x} y2="14" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={x} y1="50" x2={x} y2="58" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

function GPIOPinsSVG() {
  const pins = Array.from({ length: 20 }, (_, i) => i);
  return (
    <svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect x="0" y="20" width="200" height="24" rx="3" fill="#1a2e1a" stroke="#34d399" strokeWidth="1" />
      {pins.map((i) => {
        const x = 6 + i * 9.5;
        const isTop = i % 2 === 0;
        const pinColor = i < 4 ? "#f59e0b" : i >= 16 ? "#a78bfa" : "#34d399";
        return (
          <g key={i}>
            <rect x={x - 2} y={isTop ? 8 : 36} width="4" height="16" rx="1" fill={pinColor} opacity="0.9" />
            <circle cx={x} cy={isTop ? 7 : 57} r="2.5" fill={pinColor} opacity="0.6" />
          </g>
        );
      })}
      <text x="6"   y="62" fontSize="5.5" fill="#f59e0b" fontFamily="monospace" opacity="0.9">3.3V</text>
      <text x="150" y="62" fontSize="5.5" fill="#a78bfa" fontFamily="monospace" opacity="0.9">GPIO</text>
    </svg>
  );
}

// ── Raspberry Pi Module ───────────────────────────────────────────────────────

const PI_ANATOMY = [
  {
    id: "soc",
    titleEn: "System on a Chip (SoC)",
    titleKh: "ប្រព័ន្ធនៅលើបន្ទះឈីប (SoC)",
    bodyEn: "The brain. Instead of a massive motherboard, it combines the CPU (thinking) and GPU (graphics) into one tiny silicon square.",
    bodyKh: "ជាខួរក្បាល។ វាបញ្ចូល CPU និង GPU ទៅក្នុងការ៉េស៊ីលីកូនតូចមួយ។",
    Svg: SoCChipSVG,
    accent: "#34d399",
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/10",
  },
  {
    id: "gpio",
    titleEn: "GPIO Pins",
    titleKh: "ជើងបញ្ជូនទិន្នន័យ (GPIO)",
    bodyEn: "The magic connection. These metal 'General Purpose Input/Output' pins allow the Pi to talk to the physical world — LED lights, temperature sensors, or robot motors.",
    bodyKh: "ការតភ្ជាប់ដ៏អស្ចារ្យ។ ជើងទាំងនេះអនុញ្ញាតឱ្យ Pi ទំនាក់ទំនងជាមួយពិភពពិត — ភ្លើង LED ឧបករណ៍វាស់សីតុណ្ហភាព ឬម៉ូទ័រមនុស្សយន្ត។",
    Svg: GPIOPinsSVG,
    accent: "#6ee7b7",
    border: "border-teal-500/50",
    bg: "bg-teal-500/10",
  },
  {
    id: "sd",
    titleEn: "MicroSD Storage",
    titleKh: "អង្គចងចាំ MicroSD",
    bodyEn: "Instead of a heavy hard drive, it uses a tiny memory card to hold its operating system (usually Linux) and all your files.",
    bodyKh: "ជំនួសឱ្យថាសរឹងធ្ងន់ វាប្រើកាតអង្គចងចាំតូចមួយ ដើម្បីផ្ទុក Linux និងឯកសារទាំងអស់របស់អ្នក។",
    Svg: () => (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" aria-hidden="true">
        <rect x="16" y="8" width="32" height="48" rx="4" fill="#0f2a1a" stroke="#34d399" strokeWidth="1.5"/>
        <rect x="22" y="14" width="20" height="6" rx="1" fill="#34d399" opacity="0.25"/>
        {[24,32,40].map(y => <line key={y} x1="22" y1={y} x2="42" y2={y} stroke="#34d399" strokeWidth="1" opacity="0.4"/>)}
        <text x="32" y="50" textAnchor="middle" fontSize="7" fill="#6ee7b7" fontFamily="monospace">SD</text>
      </svg>
    ),
    accent: "#34d399",
    border: "border-emerald-400/50",
    bg: "bg-emerald-400/10",
  },
] as const;

const PI_USES = [
  {
    icon: "🤖",
    titleEn: "Robotics",
    titleKh: "មនុស្សយន្ត",
    bodyEn: "Use GPIO pins to write a Python script that drives a robot chassis or controls a drone.",
    bodyKh: "ប្រើ GPIO សរសេរកូដ Python ដើម្បីបញ្ជាមនុស្សយន្ត ឬដ្រូន។",
    border: "border-emerald-500/40",
    badge: "bg-emerald-900/60 text-emerald-300",
  },
  {
    icon: "🌐",
    titleEn: "Web Servers",
    titleKh: "ម៉ាស៊ីនមេគេហទំព័រ",
    bodyEn: "Host your own websites, create a local network file server, or build a network-wide ad blocker.",
    bodyKh: "បង្ហោះគេហទំព័រផ្ទាល់ខ្លួន បង្កើតម៉ាស៊ីនមេផ្ទុកឯកសារ ឬបង្កើតកម្មវិធីរារាំងការផ្សាយពាណិជ្ជកម្ម។",
    border: "border-teal-500/40",
    badge: "bg-teal-900/60 text-teal-300",
  },
  {
    icon: "🕹️",
    titleEn: "Retro Gaming",
    titleKh: "ហ្គេមអតីតកាល",
    bodyEn: "Install special software so the Pi can emulate and play classic arcade and console video games.",
    bodyKh: "ដំឡើងកម្មវិធីពិសេស ដើម្បីលេងហ្គេមអតីតកាលបែបបុរាណ។",
    border: "border-cyan-500/40",
    badge: "bg-cyan-900/60 text-cyan-300",
  },
] as const;

function RaspberryPiModule() {
  const t = useTranslation();

  return (
    <div className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-900 overflow-hidden shadow-xl">

      {/* ── Header band ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 px-6 sm:px-8 pt-7 pb-6 border-b border-emerald-500/20">
        {/* SVG visual */}
        <div className="w-36 h-28 sm:w-44 sm:h-36 flex-shrink-0 rounded-xl border border-emerald-500/30 bg-slate-900/70 p-3 overflow-hidden flex items-center justify-center">
          <PiCircuitBoardSVG size={90} />
        </div>
        {/* Intro text */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-2">
            {t("Single-Board Computer", "កុំព្យូទ័របន្ទះទោល")}
          </p>
          <h3 className="text-white font-bold text-base sm:text-lg mb-1">
            {t("What is a Single-Board Computer?", "តើអ្វីទៅជាកុំព្យូទ័របន្ទះទោល?")}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {t(
              "Unlike a desktop with many separate, bulky parts, a Raspberry Pi fits an entire computer — processor, memory, and graphics — onto a single circuit board the size of a credit card.",
              "មិនដូចកុំព្យូទ័រលើតុដែលមានផ្នែកដាច់ដោយឡែកជាច្រើននោះទេ Raspberry Pi បញ្ចូលកុំព្យូទ័រទាំងមូល ទៅលើបន្ទះសៀគ្វីប៉ុនកាតឥណទាន។",
            )}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            {t(
              "It was designed to make learning computer science, engineering, and programming cheap and accessible to everyone.",
              "វាត្រូវបានរចនាឡើងដើម្បីធ្វើឱ្យការរៀនកុំព្យូទ័រ វិស្វកម្ម និងការសរសេរកូដ មានតំលៃថោក និងងាយស្រួលចូលប្រើ។",
            )}
          </p>
        </div>
      </div>

      {/* ── Anatomy ── */}
      <div className="px-6 sm:px-8 py-6 border-b border-emerald-500/15">
        <p className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-4">
          {t("The Anatomy of a Pi", "គ្រឿងបង្គុំនៃ Raspberry Pi")}
        </p>
        <div className="space-y-3">
          {PI_ANATOMY.map((item) => (
            <div key={item.id} className={`rounded-xl border ${item.border} ${item.bg} p-4 flex gap-4 items-start`}>
              <div className="w-14 h-14 flex-shrink-0 rounded-lg bg-slate-900/60 border border-white/10 p-1.5 overflow-hidden">
                <item.Svg />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-white text-sm sm:text-base leading-snug mb-0.5">
                  {item.titleEn}
                </h4>
                <p className="font-khmer text-xs text-emerald-200/70 mb-2 leading-relaxed">
                  {item.titleKh}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t(item.bodyEn, item.bodyKh)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Use Cases ── */}
      <div className="px-6 sm:px-8 py-6">
        <p className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 mb-4">
          {t("What Can You Build?", "តើអ្នកអាចបង្កើតអ្វីបានខ្លះ?")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PI_USES.map((use) => (
            <div key={use.titleEn} className={`rounded-xl border ${use.border} bg-slate-900/50 p-4 flex flex-col gap-2`}>
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">{use.icon}</span>
                <div>
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${use.badge}`}>
                    {use.titleEn}
                  </span>
                  <p className="font-khmer text-xs text-slate-400 mt-0.5 leading-tight">{use.titleKh}</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t(use.bodyEn, use.bodyKh)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  kicker, titleEn, titleKh, kh, Icon,
}: { kicker: string; titleEn: string; titleKh: string; kh: boolean; Icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="mb-4 sm:mb-5 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kicker}
        </div>
        <h2 className={`font-display text-2xl sm:text-3xl font-bold text-white leading-tight mt-0.5 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? titleKh : titleEn}
          {kh && <span className="ml-2 text-base text-cyan-300/70 font-sans font-normal">({titleEn})</span>}
        </h2>
      </div>
    </div>
  );
}
