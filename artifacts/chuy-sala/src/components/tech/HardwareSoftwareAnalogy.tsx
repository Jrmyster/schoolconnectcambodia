import { PersonStanding, Brain, Heart, Eye, Cloud, Lightbulb, Music, MessageSquare, ArrowRight } from "lucide-react";
import type { ComponentType } from "react";
import { useLanguageStore } from "@/store/use-language";

type Item = { Icon: ComponentType<{ className?: string }>; en: string; kh: string };

const HARDWARE: Item[] = [
  { Icon: Brain,           en: "Brain (CPU)",    kh: "ខួរក្បាល (CPU)" },
  { Icon: Heart,           en: "Heart (Power)",  kh: "បេះដូង (ថាមពល)" },
  { Icon: Eye,             en: "Eyes (Camera)",  kh: "ភ្នែក (កាមេរ៉ា)" },
  { Icon: PersonStanding,  en: "Body parts",     kh: "សរីរាង្គ" },
];
const SOFTWARE: Item[] = [
  { Icon: Lightbulb,       en: "Ideas",      kh: "គំនិត" },
  { Icon: MessageSquare,   en: "Memories",   kh: "ការចងចាំ" },
  { Icon: Music,           en: "Songs you know", kh: "បទចម្រៀងដែលអ្នកស្គាល់" },
  { Icon: Cloud,           en: "Dreams",     kh: "សុបិន" },
];

export function HardwareSoftwareAnalogy() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="rounded-3xl bg-slate-950 border-2 border-cyan-500/40 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-b-2 border-cyan-500/30 relative">
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />
        <div className="relative">
          <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{kh ? "ឧបមា" : "Analogy"}</span>
          </div>
          <h3 className={`font-display text-xl sm:text-2xl font-bold text-white mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh
              ? "Hardware ដូចជាខ្លួនរបស់អ្នក; Software ដូចជាគំនិតរបស់អ្នក"
              : "Hardware is like your body; Software is like your thoughts"}
          </h3>
          {kh && (
            <p className="mt-1 text-sm text-cyan-300/80 italic">
              Hardware is like your body; Software is like your thoughts.
            </p>
          )}
        </div>
      </div>

      {/* Two columns */}
      <div className="grid md:grid-cols-[1fr_auto_1fr] items-stretch">
        {/* HARDWARE column */}
        <Column
          accent="cyan"
          titleEn="HARDWARE — The Body"
          titleKh="HARDWARE — ខ្លួនប្រាណ"
          subtitleEn="The physical parts you can touch."
          subtitleKh="ផ្នែករូបវ័ន្តដែលអ្នកអាចប៉ះបាន។"
          examplesLabelEn="Examples in your body:"
          examplesLabelKh="ឧទាហរណ៍ក្នុងខ្លួនរបស់អ្នក៖"
          items={HARDWARE}
          computerExEn="In a computer: CPU, RAM, screen, keyboard, motherboard."
          computerExKh="នៅក្នុងកុំព្យូទ័រ៖ CPU, RAM, អេក្រង់, ក្ដារចុច, ម៉ザーបត។"
          kh={kh}
        />

        {/* Connector */}
        <div className="hidden md:flex items-center justify-center px-3 bg-slate-950 border-y-2 border-cyan-500/30">
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="w-5 h-5 text-cyan-400" />
            <span className={`text-[10px] font-mono uppercase tracking-widest text-cyan-400 rotate-90 origin-center whitespace-nowrap ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {kh ? "ត្រូវការគ្នា" : "needs"}
            </span>
            <ArrowRight className="w-5 h-5 text-cyan-400 rotate-180" />
          </div>
        </div>

        {/* SOFTWARE column */}
        <Column
          accent="fuchsia"
          titleEn="SOFTWARE — The Thoughts"
          titleKh="SOFTWARE — គំនិត"
          subtitleEn="The instructions running inside — invisible but real."
          subtitleKh="ការណែនាំដែលដំណើរការនៅខាងក្នុង — មើលមិនឃើញ ប៉ុន្តែពិត។"
          examplesLabelEn="Examples in your mind:"
          examplesLabelKh="ឧទាហរណ៍ក្នុងគំនិតរបស់អ្នក៖"
          items={SOFTWARE}
          computerExEn="In a computer: operating system, web browser, games, apps, songs."
          computerExKh="នៅក្នុងកុំព្យូទ័រ៖ ប្រព័ន្ធប្រតិបត្តិការ កម្មវិធីរុករក ហ្គេម កម្មវិធី បទចម្រៀង។"
          kh={kh}
        />
      </div>

      {/* Insight footer */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 border-t-2 border-cyan-500/30 p-5 sm:p-6">
        <div className={`flex items-start gap-3 ${kh ? "" : ""}`}>
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {kh ? "គំនិតគន្លឹះ" : "Key Insight"}
            </div>
            <p className={`text-sm sm:text-base text-slate-200 leading-relaxed ${kh ? "font-khmer leading-loose text-base" : ""}`}>
              {kh ? (
                <>
                  ខ្លួនអ្នកដោយគ្មានគំនិត គឺ​មិនអាចធ្វើអ្វីបានទេ។ គំនិតដោយគ្មានខ្លួន ក៏មិនអាចប៉ះពិភពលោកបានដែរ។ រឿងតែមួយដូចគ្នាសម្រាប់កុំព្យូទ័រ៖
                  {" "}<span className="font-extrabold text-cyan-300">Hardware</span> ត្រូវការ{" "}
                  <span className="font-extrabold text-fuchsia-300">Software</span> ដើម្បីដឹងត្រូវធ្វើអ្វី — ហើយ Software ត្រូវការ Hardware ដើម្បីដំណើរការ។
                </>
              ) : (
                <>
                  Your body without thoughts can do nothing. Your thoughts without a body can never touch the world. Same for a computer:
                  {" "}<span className="font-extrabold text-cyan-300">Hardware</span> needs{" "}
                  <span className="font-extrabold text-fuchsia-300">Software</span> to know what to do — and Software needs Hardware to actually run.
                </>
              )}
            </p>
            {kh && (
              <p className="mt-1 text-xs italic text-slate-400">
                Your body without thoughts can do nothing. Your thoughts without a body can never touch the world.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Column({
  accent, titleEn, titleKh, subtitleEn, subtitleKh, examplesLabelEn, examplesLabelKh,
  items, computerExEn, computerExKh, kh,
}: {
  accent: "cyan" | "fuchsia";
  titleEn: string; titleKh: string;
  subtitleEn: string; subtitleKh: string;
  examplesLabelEn: string; examplesLabelKh: string;
  items: Item[];
  computerExEn: string; computerExKh: string;
  kh: boolean;
}) {
  const a = accent === "cyan" ? {
    text: "text-cyan-300", accentText: "text-cyan-200", border: "border-cyan-500/40", bg: "bg-cyan-500/5",
    chip: "border-cyan-500/40 text-cyan-200 bg-cyan-500/10",
  } : {
    text: "text-fuchsia-300", accentText: "text-fuchsia-200", border: "border-fuchsia-500/40", bg: "bg-fuchsia-500/5",
    chip: "border-fuchsia-500/40 text-fuchsia-200 bg-fuchsia-500/10",
  };

  return (
    <div className={`p-5 sm:p-6 ${a.bg} border-y-2 ${a.border}`}>
      <div className={`text-[11px] font-mono uppercase tracking-[0.25em] ${a.text} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? titleKh : titleEn}
      </div>
      <p className={`mt-2 text-sm text-slate-300 leading-relaxed ${kh ? "font-khmer leading-loose text-base" : ""}`}>
        {kh ? subtitleKh : subtitleEn}
      </p>

      <div className={`mt-4 text-[10px] font-mono uppercase tracking-widest text-slate-400 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? examplesLabelKh : examplesLabelEn}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {items.map((it, i) => {
          const Icon = it.Icon;
          return (
            <div key={i} className={`inline-flex items-center gap-2 px-2.5 py-2 rounded-lg border-2 ${a.chip}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className={`text-xs font-bold leading-tight ${kh ? "font-khmer text-sm" : ""}`}>
                {kh ? it.kh : it.en}
              </span>
            </div>
          );
        })}
      </div>

      <div className={`mt-4 rounded-lg bg-slate-950 border ${a.border} p-3 text-xs ${a.accentText} ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
        <span className={`font-extrabold ${a.text}`}>{kh ? "→ ក្នុងកុំព្យូទ័រ៖ " : "→ In a computer: "}</span>
        {kh ? computerExKh : computerExEn}
      </div>
    </div>
  );
}
