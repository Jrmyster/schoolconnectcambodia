import type { CSSProperties } from "react";
import { Cpu, Compass, Binary, Code2, Stethoscope, BatteryCharging, History } from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { MotherboardBuilder } from "@/components/tech/MotherboardBuilder";
import { BinarySignalVisualizer } from "@/components/tech/BinarySignalVisualizer";
import { HardwareSoftwareAnalogy } from "@/components/tech/HardwareSoftwareAnalogy";
import { TechDoctor } from "@/components/tech/TechDoctor";
import { BatteryCareGuide } from "@/components/tech/BatteryCareGuide";
import { HistoryOfComputingTimeline } from "@/components/tech/HistoryOfComputingTimeline";
import { ApolloVsPhoneCard } from "@/components/tech/ApolloVsPhoneCard";

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
                <span>{t("INTERACTIVES: 06", "ឧបករណ៍អន្តរកម្ម៖ ០៦")}</span>
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

        {/* 2. Binary signal */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ២" : "Lesson 2"}
            titleEn="The Binary Signal"
            titleKh="សញ្ញាប្រព័ន្ធគោលពីរ"
            kh={kh}
            Icon={Binary}
          />
          <BinarySignalVisualizer />
        </section>

        {/* 3. Hardware vs Software */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ៣" : "Lesson 3"}
            titleEn="Hardware vs. Software"
            titleKh="Hardware ប្រឆាំងនឹង Software"
            kh={kh}
            Icon={Code2}
          />
          <HardwareSoftwareAnalogy />
        </section>

        {/* 4. Tech Doctor — symptom checker */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ៤" : "Lesson 4"}
            titleEn="Tech Doctor — Troubleshooting Clinic"
            titleKh="គ្រូពេទ្យបច្ចេកវិទ្យា — គ្លីនិកជួសជុល"
            kh={kh}
            Icon={Stethoscope}
          />
          <TechDoctor />
        </section>

        {/* 5. Battery Life & Care Guide */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ៥" : "Lesson 5"}
            titleEn="Battery Life & Care Guide"
            titleKh="មគ្គុទ្ទេសក៍ថែទាំថ្ម"
            kh={kh}
            Icon={BatteryCharging}
          />
          <BatteryCareGuide />
        </section>

        {/* 6. History of Computing Timeline */}
        <section>
          <SectionHeading
            kicker={kh ? "មេរៀនទី ៦" : "Lesson 6"}
            titleEn="History of Computing — Timeline"
            titleKh="ប្រវត្តិរូបវិទ្យាកុំព្យូទ័រ — បន្ទាត់ពេលវេលា"
            kh={kh}
            Icon={History}
          />
          <HistoryOfComputingTimeline />
          <div className="mt-6">
            <ApolloVsPhoneCard />
          </div>
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
