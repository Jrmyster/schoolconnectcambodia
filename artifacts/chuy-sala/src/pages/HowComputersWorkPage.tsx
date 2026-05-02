import type { CSSProperties } from "react";
import { Cpu, Compass, Binary, Code2, Stethoscope, BatteryCharging, History, Wifi, Router, Cog, Terminal, ShieldCheck, Atom, RadioTower } from "lucide-react";
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
