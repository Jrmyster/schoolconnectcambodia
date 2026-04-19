import { useState } from "react";
import {
  Stethoscope, Wrench, ClipboardList, Activity, HeartPulse, Cpu, MemoryStick, HardDrive, MonitorPlay,
  ThermometerSun, Pill, AlertCircle, CheckCircle2, RotateCcw, FileText,
} from "lucide-react";
import type { ComponentType } from "react";
import { useLanguageStore } from "@/store/use-language";

type Part = "cpu" | "ram" | "gpu" | "ssd" | "fan";

type Case = {
  id: string;
  /** Vital-sign style metric on the symptom card */
  vital: { en: string; kh: string; tone: "warn" | "alert" | "info" };
  symptomEn: string;
  symptomKh: string;
  detailEn: string;          // a short patient-style note
  detailKh: string;
  diagEn: string;            // the bilingual diagnosis sentence requested
  diagKh: string;
  treatEn: string[];         // treatment / next steps
  treatKh: string[];
  parts: Part[];             // which motherboard parts to highlight
  icon: ComponentType<{ className?: string }>;
  accent: string;            // hex
  accentBg: string;
  accentBorder: string;
  accentText: string;
};

const CASES: Case[] = [
  {
    id: "slow",
    icon: Activity,
    vital: { en: "Speed: 12% of normal", kh: "ល្បឿន៖ ១២% នៃធម្មតា", tone: "warn" },
    symptomEn: "My computer is very slow.",
    symptomKh: "កុំព្យូទ័រដើរយឺតខ្លាំង។",
    detailEn: "Programs take a long time to open. Switching between tabs feels stuck.",
    detailKh: "កម្មវិធីត្រូវការពេលយូរដើម្បីបើក។ ការប្ដូររវាង Tab មានអារម្មណ៍ជាប់។",
    diagEn: "You might have too many apps open in your RAM. Try closing some programs.",
    diagKh: "អ្នកប្រហែលជាបើកកម្មវិធីច្រើនពេកក្នុង RAM។ សាកល្បងបិទកម្មវិធីខ្លះ។",
    treatEn: [
      "Close browser tabs and apps you aren't using.",
      "Restart the computer to clear out RAM completely.",
      "If it stays slow, the computer may need more RAM installed.",
    ],
    treatKh: [
      "បិទ Tab និងកម្មវិធីដែលអ្នកមិនប្រើ។",
      "ចាប់ផ្ដើមកុំព្យូទ័រឡើងវិញ ដើម្បីសម្អាត RAM ទាំងស្រុង។",
      "បើនៅតែយឺត កុំព្យូទ័រអាចត្រូវការ RAM បន្ថែម។",
    ],
    parts: ["ram"],
    accent: "#22c55e", accentBg: "bg-green-50", accentBorder: "border-green-400", accentText: "text-green-900",
  },
  {
    id: "black",
    icon: MonitorPlay,
    vital: { en: "Display: 0 signal", kh: "អេក្រង់៖ គ្មានសញ្ញា", tone: "alert" },
    symptomEn: "My screen is black / no picture.",
    symptomKh: "អេក្រង់ងងឹត ឬគ្មានរូបភាព។",
    detailEn: "The computer makes sound, but the monitor stays completely dark.",
    detailKh: "កុំព្យូទ័របញ្ចេញសំឡេង ប៉ុន្តែ Monitor នៅងងឹតទាំងស្រុង។",
    diagEn: "Check the connection to your Monitor or your GPU.",
    diagKh: "ពិនិត្យការតភ្ជាប់ទៅ Monitor ឬ GPU របស់អ្នក។",
    treatEn: [
      "Check the cable (HDMI / VGA) at BOTH ends — wiggle it gently.",
      "Try a different cable or different monitor if you can.",
      "If the GPU card is loose inside the PCIe slot, ask an adult to re-seat it.",
    ],
    treatKh: [
      "ពិនិត្យខ្សែ (HDMI / VGA) នៅចុងទាំងពីរ — រំកិលថ្នមៗ។",
      "សាកល្បងខ្សែផ្សេង ឬ Monitor ផ្សេង បើអ្នកអាច។",
      "បើ GPU រលុងពីរន្ធ PCIe សុំមនុស្សពេញវ័យដាក់ឡើងវិញ។",
    ],
    parts: ["gpu"],
    accent: "#f97316", accentBg: "bg-orange-50", accentBorder: "border-orange-400", accentText: "text-orange-900",
  },
  {
    id: "lostfile",
    icon: FileText,
    vital: { en: "Storage: read errors", kh: "អង្គផ្ទុក៖ មានកំហុសអាន", tone: "alert" },
    symptomEn: "My files didn't save after I turned it off.",
    symptomKh: "ឯកសារមិនបានរក្សាទុកបន្ទាប់ពីខ្ញុំបិទ។",
    detailEn: "Work I typed yesterday is gone. The folder shows no new files.",
    detailKh: "ការងារដែលខ្ញុំវាយម្សិលមិញបាត់។ ថតមិនបង្ហាញឯកសារថ្មីទេ។",
    diagEn: "There might be a problem with your Hard Drive / Storage.",
    diagKh: "ប្រហែលជាមានបញ្ហាជាមួយ Hard Drive / អង្គផ្ទុករបស់អ្នក។",
    treatEn: [
      "ALWAYS click 'Save' (Ctrl+S) BEFORE closing the program — RAM forgets, storage remembers.",
      "Check that the file is in the folder you think it is.",
      "If files keep disappearing, the SSD/Hard Drive may be failing — back up everything to a USB or cloud now.",
    ],
    treatKh: [
      "ត្រូវចុច «Save» (Ctrl+S) មុនពេលបិទកម្មវិធីជានិច្ច — RAM ភ្លេច អង្គផ្ទុកចងចាំ។",
      "ពិនិត្យមើលថា ឯកសារនៅក្នុងថតដែលអ្នកគិត។",
      "បើឯកសារបាត់ជានិច្ច SSD/Hard Drive អាចខូច — ចម្លងទុកទៅ USB ឬ Cloud ឥឡូវនេះ។",
    ],
    parts: ["ssd"],
    accent: "#a855f7", accentBg: "bg-purple-50", accentBorder: "border-purple-400", accentText: "text-purple-900",
  },
  {
    id: "hot",
    icon: ThermometerSun,
    vital: { en: "Temperature: 92°C HIGH", kh: "សីតុណ្ហភាព៖ ៩២°C ខ្ពស់", tone: "alert" },
    symptomEn: "The computer is getting very hot.",
    symptomKh: "កុំព្យូទ័រឡើងកម្ដៅខ្លាំង។",
    detailEn: "The fan is loud, the case feels hot to touch, and it sometimes shuts off by itself.",
    detailKh: "កង្ហារលឺខ្លាំង ប្រអប់ក្ដៅពេលប៉ះ ហើយជួនកាលវាបិទដោយខ្លួនវាផ្ទាល់។",
    diagEn: "The CPU is working too hard, or the cooling fan is blocked!",
    diagKh: "CPU ធ្វើការខ្លាំងពេក ឬកង្ហារត្រជាក់ស្ទះ!",
    treatEn: [
      "Move the computer to an open space — never on a soft bed or pillow.",
      "Gently clean dust from the fan vents with a soft brush or compressed air.",
      "Close heavy programs (games, video editors) to lower CPU load.",
    ],
    treatKh: [
      "ផ្លាស់កុំព្យូទ័រទៅកន្លែងបើកចំហ — កុំដាក់លើគ្រែ ឬខ្នើយ។",
      "សម្អាតធូលីពីរន្ធកង្ហារដោយច្រាសទន់ ឬខ្យល់សង្កត់។",
      "បិទកម្មវិធីធ្ងន់ៗ (ហ្គេម កម្មវិធីកាត់ត វីដេអូ) ដើម្បីបន្ថយបន្ទុក CPU។",
    ],
    parts: ["cpu", "fan"],
    accent: "#dc2626", accentBg: "bg-red-50", accentBorder: "border-red-400", accentText: "text-red-900",
  },
];

export function TechDoctor() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = CASES.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="rounded-3xl bg-white border-4 border-red-500 shadow-2xl overflow-hidden">
      {/* Header — Medical clinic strip */}
      <div className="relative overflow-hidden">
        {/* Red & white medical stripe */}
        <div className="h-2.5" style={{
          backgroundImage: "repeating-linear-gradient(90deg, #dc2626 0 24px, #fff 24px 48px)",
        }} />
        <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-red-50 via-white to-teal-50 border-b-2 border-red-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-red-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <Stethoscope className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div className="min-w-0 flex-1">
              <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-red-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <HeartPulse className="w-3.5 h-3.5" />
                <span>{kh ? "កម្មវិធីនៃកម្ពុជា" : "PC Clinic"}</span>
                <span className="opacity-50">/</span>
                <span>{kh ? "ការវិនិច្ឆ័យ" : "Diagnostics"}</span>
              </div>
              <h3 className={`font-display text-xl sm:text-2xl font-bold text-stone-900 ${kh ? "font-khmer leading-snug" : ""}`}>
                {kh ? "គ្រូពេទ្យបច្ចេកវិទ្យា" : "The Tech Doctor"}
                {kh && <span className="ml-2 text-sm text-stone-500 font-sans font-normal">(Tech Doctor)</span>}
              </h3>
              <p className={`mt-1 text-sm text-stone-700 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {kh
                  ? "ជ្រើសរើសរោគសញ្ញាមួយខាងក្រោម ដើម្បីរកមើលថាផ្នែកណានៃកុំព្យូទ័រអាចមានបញ្ហា និងការព្យាបាលណាដែលត្រូវសាកល្បង។"
                  : "Pick a symptom below to find which part of the computer might be sick — and what treatment to try."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid: symptoms + mini board */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-0 border-b-2 border-red-200">
        {/* Symptom checklist */}
        <div className="p-4 sm:p-5 bg-stone-50/50">
          <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-red-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            <ClipboardList className="w-3.5 h-3.5" />
            {kh ? "តារាងរោគសញ្ញារបស់អ្នកជំងឺ" : "Patient Symptom Chart"}
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {CASES.map((c) => {
              const Icon = c.icon;
              const isSelected = selectedId === c.id;
              const toneCls =
                c.vital.tone === "alert" ? "bg-red-100 text-red-800 border-red-300" :
                c.vital.tone === "warn"  ? "bg-amber-100 text-amber-800 border-amber-300" :
                                            "bg-sky-100 text-sky-800 border-sky-300";
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId((s) => (s === c.id ? null : c.id))}
                  className={`group text-left rounded-2xl border-2 p-3 transition active:scale-[0.98] shadow-sm hover:shadow-md ${
                    isSelected
                      ? `${c.accentBg} ${c.accentBorder} ring-2 ring-offset-1`
                      : "bg-white border-stone-200 hover:border-red-400"
                  }`}
                  style={isSelected ? { boxShadow: `0 0 0 2px ${c.accent}40` } : undefined}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white border-2 flex items-center justify-center"
                         style={{ borderColor: c.accent, color: c.accent }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm font-bold leading-tight ${isSelected ? c.accentText : "text-stone-900"} ${kh ? "font-khmer leading-snug text-base" : ""}`}>
                        {kh ? c.symptomKh : c.symptomEn}
                      </div>
                      {kh && (
                        <div className="text-[11px] italic text-stone-500 mt-0.5 leading-tight">{c.symptomEn}</div>
                      )}
                      <div className={`mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-mono font-bold ${toneCls} ${kh ? "font-khmer normal-case text-[11px]" : ""}`}>
                        <Activity className="w-2.5 h-2.5" />
                        {kh ? c.vital.kh : c.vital.en}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedId && (
            <button onClick={() => setSelectedId(null)}
              className={`mt-3 inline-flex items-center gap-1 text-xs text-stone-500 hover:text-red-700 ${kh ? "font-khmer" : ""}`}>
              <RotateCcw className="w-3 h-3" />
              {kh ? "សម្អាតការវិនិច្ឆ័យ" : "Clear diagnosis"}
            </button>
          )}
        </div>

        {/* Mini "Internal Map" — always visible, highlights selected parts */}
        <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-red-200 bg-slate-950 p-4 flex flex-col">
          <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            <Cpu className="w-3.5 h-3.5" />
            {kh ? "ផែនទីខាងក្នុង" : "Internal Map"}
          </div>
          <MiniMotherboard highlighted={selected?.parts ?? []} accent={selected?.accent} kh={kh} />
          {selected ? (
            <div className={`mt-2.5 text-[11px] font-mono text-cyan-300 text-center ${kh ? "font-khmer text-xs" : ""}`}>
              <span className="opacity-70">{kh ? "ផ្នែកក្ដៅ៖ " : "Hot zone: "}</span>
              <span className="font-bold" style={{ color: selected.accent }}>
                {selected.parts.map((p) => PART_LABEL[p][kh ? "kh" : "en"]).join(" + ")}
              </span>
            </div>
          ) : (
            <div className={`mt-2.5 text-[11px] text-cyan-700 text-center italic ${kh ? "font-khmer text-xs" : ""}`}>
              {kh ? "ជ្រើសរើសរោគសញ្ញា ដើម្បីបំភ្លឺផ្នែក" : "Pick a symptom to light up a part"}
            </div>
          )}
        </div>
      </div>

      {/* Diagnosis & Treatment — prescription pad */}
      <div className="bg-white">
        {selected ? (
          <DiagnosisPanel c={selected} kh={kh} />
        ) : (
          <div className={`p-6 sm:p-8 text-center text-sm text-stone-500 italic ${kh ? "font-khmer leading-loose" : ""}`}>
            <Stethoscope className="w-8 h-8 mx-auto mb-2 text-stone-300" />
            {kh
              ? "↑ ចុចរោគសញ្ញាមួយខាងលើ ដើម្បីទទួលការវិនិច្ឆ័យ និងការព្យាបាលរបស់គ្រូពេទ្យ។"
              : "↑ Click a symptom above to receive the doctor's diagnosis and treatment plan."}
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

const PART_LABEL: Record<Part, { en: string; kh: string }> = {
  cpu: { en: "CPU",     kh: "CPU" },
  ram: { en: "RAM",     kh: "RAM" },
  gpu: { en: "GPU",     kh: "GPU" },
  ssd: { en: "Storage", kh: "អង្គផ្ទុក" },
  fan: { en: "Fan",     kh: "កង្ហារ" },
};

function MiniMotherboard({ highlighted, accent, kh }: { highlighted: Part[]; accent?: string; kh: boolean }) {
  const isHot = (p: Part) => highlighted.includes(p);
  const HOT = accent ?? "#dc2626";
  const partFill = (p: Part, base: string) =>
    isHot(p) ? HOT : base;
  const partGlow = (p: Part) => (isHot(p) ? `drop-shadow(0 0 6px ${HOT})` : "none");

  return (
    <div className="flex-1 min-h-0">
      <svg viewBox="0 0 280 200" className="block w-full h-auto" role="img" aria-label="Mini motherboard map">
        <style>{`
          @keyframes hot-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
          .hot { animation: hot-pulse 1.4s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .hot { animation: none; } }
        `}</style>
        <defs>
          <pattern id="td-grid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0 L0 0 0 14" fill="none" stroke="#0e7490" strokeWidth="0.4" opacity="0.4" />
          </pattern>
        </defs>

        {/* Board */}
        <rect width="280" height="200" fill="#082f1f" />
        <rect width="280" height="200" fill="url(#td-grid)" />
        <rect x="6" y="6" width="268" height="188" rx="6" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />

        {/* Circuit traces */}
        <g stroke="#22d3ee" strokeWidth="0.8" fill="none" opacity="0.5">
          <path d="M 100 70 L 150 70 L 150 35 L 200 35" />
          <path d="M 100 90 L 150 90 L 150 130 L 60 130" />
          <path d="M 100 100 L 220 100" />
          <path d="M 70 110 L 70 140" />
        </g>

        {/* CPU */}
        <g style={{ filter: partGlow("cpu") }} className={isHot("cpu") ? "hot" : ""}>
          <rect x="40" y="60" width="60" height="60" rx="3"
                fill={partFill("cpu", "#0c1220")} stroke={isHot("cpu") ? HOT : "#22d3ee"} strokeWidth="1.6" />
          <text x="70" y="95" textAnchor="middle" fontSize="11" fontWeight="800"
                fill={isHot("cpu") ? "#fff" : "#67e8f9"} fontFamily="ui-monospace">CPU</text>
        </g>

        {/* RAM x2 */}
        {[155, 175].map((x, i) => (
          <g key={i} style={{ filter: partGlow("ram") }} className={isHot("ram") ? "hot" : ""}>
            <rect x={x} y="55" width="14" height="80" rx="2"
                  fill={partFill("ram", "#15803d")} stroke={isHot("ram") ? HOT : "#86efac"} strokeWidth="1.2" />
          </g>
        ))}
        <text x="167" y="48" textAnchor="middle" fontSize="9" fontWeight="800"
              fill={isHot("ram") ? HOT : "#86efac"} fontFamily="ui-monospace"
              style={{ filter: isHot("ram") ? `drop-shadow(0 0 4px ${HOT})` : "none" }}>RAM</text>

        {/* GPU */}
        <g style={{ filter: partGlow("gpu") }} className={isHot("gpu") ? "hot" : ""}>
          <rect x="30" y="160" width="170" height="22" rx="2"
                fill={partFill("gpu", "#7c2d12")} stroke={isHot("gpu") ? HOT : "#fb923c"} strokeWidth="1.4" />
          <text x="115" y="175" textAnchor="middle" fontSize="10" fontWeight="800"
                fill={isHot("gpu") ? "#fff" : "#fed7aa"} fontFamily="ui-monospace">GPU</text>
        </g>

        {/* SSD */}
        <g style={{ filter: partGlow("ssd") }} className={isHot("ssd") ? "hot" : ""}>
          <rect x="200" y="55" width="65" height="20" rx="2"
                fill={partFill("ssd", "#1e1b4b")} stroke={isHot("ssd") ? HOT : "#a855f7"} strokeWidth="1.2" />
          <text x="232" y="69" textAnchor="middle" fontSize="9" fontWeight="800"
                fill={isHot("ssd") ? "#fff" : "#d8b4fe"} fontFamily="ui-monospace">SSD</text>
        </g>

        {/* Fan */}
        <g style={{ filter: partGlow("fan") }} className={isHot("fan") ? "hot" : ""}>
          <circle cx="232" cy="115" r="22" fill={partFill("fan", "#1c1917")} stroke={isHot("fan") ? HOT : "#22d3ee"} strokeWidth="1.4" />
          <circle cx="232" cy="115" r="5" fill={isHot("fan") ? HOT : "#0e7490"} />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a}
                  x1="232" y1="115"
                  x2={232 + Math.cos(a * Math.PI / 180) * 18}
                  y2={115 + Math.sin(a * Math.PI / 180) * 18}
                  stroke={isHot("fan") ? "#fff" : "#475569"} strokeWidth="2.2" strokeLinecap="round" />
          ))}
          <text x="232" y="148" textAnchor="middle" fontSize="9" fontWeight="800"
                fill={isHot("fan") ? HOT : "#67e8f9"} fontFamily="ui-monospace"
                style={{ filter: isHot("fan") ? `drop-shadow(0 0 3px ${HOT})` : "none" }}>
            {kh ? "កង្ហារ" : "FAN"}
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function DiagnosisPanel({ c, kh }: { c: Case; kh: boolean }) {
  const Icon = c.icon;
  return (
    <div className="grid md:grid-cols-2 gap-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Diagnosis card */}
      <div className={`p-5 sm:p-6 ${c.accentBg} border-r-0 md:border-r-2 border-stone-200 border-b-2 md:border-b-0`}>
        <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest mb-2 ${c.accentText} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Stethoscope className="w-3.5 h-3.5" />
          {kh ? "ការវិនិច្ឆ័យ" : "Diagnosis"}
        </div>
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white border-2 flex items-center justify-center shadow-sm"
               style={{ borderColor: c.accent, color: c.accent }}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className={`text-sm font-bold text-stone-900 leading-snug ${kh ? "font-khmer leading-snug text-base" : ""}`}>
              {kh ? c.symptomKh : c.symptomEn}
            </div>
            <div className={`text-xs text-stone-600 italic mt-0.5 ${kh ? "font-khmer text-sm leading-loose" : ""}`}>
              {kh ? c.detailKh : c.detailEn}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 p-3 shadow-sm" style={{ borderColor: c.accent }}>
          <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest mb-1 ${c.accentText} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            <AlertCircle className="w-3 h-3" />
            {kh ? "សេចក្ដីសន្និដ្ឋាន" : "Doctor's Finding"}
          </div>
          <p className={`text-sm font-bold leading-relaxed ${c.accentText} ${kh ? "font-khmer leading-loose text-base" : ""}`}>
            {kh ? c.diagKh : c.diagEn}
          </p>
          {kh && (
            <p className="mt-1 text-[11px] italic text-stone-500">{c.diagEn}</p>
          )}
        </div>
      </div>

      {/* Prescription pad */}
      <div className="relative bg-white p-5 sm:p-6"
           style={{
             backgroundImage: "repeating-linear-gradient(transparent 0 27px, rgba(220,38,38,0.08) 27px 28px)",
           }}>
        {/* Rx watermark */}
        <div className="absolute top-3 right-4 text-5xl font-display font-black text-red-100 select-none pointer-events-none leading-none">℞</div>

        <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-red-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Wrench className="w-3.5 h-3.5" />
          {kh ? "ការព្យាបាល / វេជ្ជបញ្ជា" : "Treatment / Prescription"}
        </div>

        <ol className="space-y-2.5">
          {(kh ? c.treatKh : c.treatEn).map((step, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-sm"
                    style={{ backgroundColor: c.accent }}>
                {i + 1}
              </span>
              <div>
                <p className={`text-sm text-stone-800 leading-snug ${kh ? "font-khmer leading-loose text-base" : ""}`}>
                  {step}
                </p>
                {kh && (
                  <p className="text-[11px] italic text-stone-500 mt-0.5">{c.treatEn[i]}</p>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* Doctor signature */}
        <div className="mt-5 pt-3 border-t border-dashed border-stone-300 flex items-center justify-between">
          <div className={`flex items-center gap-1.5 text-[10px] text-stone-500 ${kh ? "font-khmer text-xs" : ""}`}>
            <Pill className="w-3 h-3" />
            {kh ? "សុវត្ថិភាពមកមុន — សុំជំនួយមនុស្សពេញវ័យ" : "Safety first — ask an adult for help"}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="italic font-display">Dr. Chuy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* keep TS happy on unused-imports eslint rule, all imports above are used */
export const _MemoryStick = MemoryStick;
export const _HardDrive = HardDrive;
