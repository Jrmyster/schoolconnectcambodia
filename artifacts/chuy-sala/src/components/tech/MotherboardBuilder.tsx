import { useState } from "react";
import { Cpu, MemoryStick, HardDrive, MonitorPlay, X, CheckCircle2, Zap, RotateCcw } from "lucide-react";
import type { ComponentType } from "react";
import { useLanguageStore } from "@/store/use-language";

type ComponentId = "cpu" | "ram1" | "ram2" | "gpu" | "ssd";
type CompType    = "cpu" | "ram" | "gpu" | "ssd";

type Slot = {
  id: ComponentId;
  type: CompType;
  /** Slot rectangle on a 800×500 viewBox */
  x: number; y: number; w: number; h: number;
  labelEn: string;
  labelKh: string;
};

const SLOTS: Slot[] = [
  { id: "cpu",  type: "cpu",  x: 280, y: 100, w: 180, h: 180, labelEn: "CPU Socket",      labelKh: "រន្ធ CPU" },
  { id: "ram1", type: "ram",  x: 510, y:  85, w:  40, h: 230, labelEn: "RAM Slot 1",      labelKh: "រន្ធ RAM ១" },
  { id: "ram2", type: "ram",  x: 565, y:  85, w:  40, h: 230, labelEn: "RAM Slot 2",      labelKh: "រន្ធ RAM ២" },
  { id: "gpu",  type: "gpu",  x: 110, y: 360, w: 480, h:  35, labelEn: "PCIe Slot (GPU)", labelKh: "រន្ធ PCIe (GPU)" },
  { id: "ssd",  type: "ssd",  x: 640, y: 200, w: 130, h:  30, labelEn: "M.2 SSD Slot",    labelKh: "រន្ធ M.2 SSD" },
];

type Info = {
  type: CompType;
  nickEn: string; nickKh: string;
  nameEn: string; nameKh: string;
  shortEn: string; shortKh: string;
  longEn: string;  longKh: string;
  /** Quick fact callout */
  factEn: string; factKh: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;     // hex for slot glow & detail panel
  accentBg: string;   // tailwind bg
  accentBorder: string;
  accentText: string;
};

const INFO: Record<CompType, Info> = {
  cpu: {
    type: "cpu",
    nickEn: "The Brain", nickKh: "ខួរក្បាល",
    nameEn: "CPU — Central Processing Unit", nameKh: "CPU — ខួរក្បាលកុំព្យូទ័រ",
    shortEn: "Does all the math.", shortKh: "ធ្វើការគណនាទាំងអស់។",
    longEn: "The CPU is the brain of the computer. Every game, every video, every Khmer letter you type — the CPU calculates them, billions of times per second. Inside, billions of microscopic switches called transistors flip between two states: ON (1) or OFF (0). That is the language of all computers.",
    longKh: "CPU គឺជាខួរក្បាលនៃកុំព្យូទ័រ។ ហ្គេមនីមួយៗ វីដេអូនីមួយៗ អក្សរខ្មែរនីមួយៗដែលអ្នកវាយ — CPU គណនាវា រាប់ពាន់លានដងក្នុងមួយវិនាទី។ នៅខាងក្នុង មានកុងតាក់មីក្រូដ៏តូចរាប់ពាន់លាន ដែលហៅថាត្រង់ស៊ីស្ទ័រ ផ្លាស់ប្ដូររវាងពីរស្ថានភាព៖ បើក (១) ឬបិទ (០)។ នោះគឺជាភាសានៃកុំព្យូទ័រទាំងអស់។",
    factEn: "A modern smartphone CPU has more than 15 BILLION transistors — smaller than a virus.",
    factKh: "CPU ស្មាតហ្វូនទំនើបមួយ មានត្រង់ស៊ីស្ទ័រលើសពី ១៥ ពាន់លាន — តូចជាងវីរុស។",
    icon: Cpu,
    accent: "#06b6d4", accentBg: "bg-cyan-50", accentBorder: "border-cyan-400", accentText: "text-cyan-900",
  },
  ram: {
    type: "ram",
    nickEn: "Short-term Memory", nickKh: "អង្គចងចាំខ្លី",
    nameEn: "RAM — Random Access Memory", nameKh: "RAM — អង្គចងចាំបណ្តោះអាសន្ន",
    shortEn: "Holds what's happening RIGHT NOW.", shortKh: "រក្សាអ្វីដែលកំពុងកើតឡើងឥឡូវនេះ។",
    longEn: "RAM is the desk where the CPU spreads out its work. The webpage you're reading, the game you're playing, the song you're listening to — all sit in RAM so the CPU can grab them instantly. RAM is FAST but FORGETFUL — when the power goes off, everything in RAM is wiped clean.",
    longKh: "RAM គឺជាតុដែល CPU លាតសន្ធឹងការងាររបស់ខ្លួន។ គេហទំព័រដែលអ្នកកំពុងអាន ហ្គេមដែលអ្នកកំពុងលេង បទចម្រៀងដែលអ្នកកំពុងស្ដាប់ — សុទ្ធតែស្ថិតនៅក្នុង RAM ដើម្បីឱ្យ CPU អាចចាប់យកវាបានភ្លាមៗ។ RAM គឺ លឿន ប៉ុន្តែ ភ្លេចភ្លាំង — ពេលដាច់ភ្លើង អ្វីៗគ្រប់យ៉ាងក្នុង RAM ត្រូវលុបអស់។",
    factEn: "When you save a document, you're moving it from RAM (forgetful) to the hard drive (permanent).",
    factKh: "ពេលអ្នករក្សាទុកឯកសារ អ្នកកំពុងផ្លាស់វាពី RAM (ភ្លេច) ទៅ Hard Drive (អចិន្ត្រៃយ៍)។",
    icon: MemoryStick,
    accent: "#22c55e", accentBg: "bg-green-50", accentBorder: "border-green-400", accentText: "text-green-900",
  },
  ssd: {
    type: "ssd",
    nickEn: "Long-term Memory", nickKh: "អង្គចងចាំវែង",
    nameEn: "SSD / Hard Drive — Storage", nameKh: "SSD / Hard Drive — អង្គផ្ទុកទិន្នន័យ",
    shortEn: "Where photos & files stay forever.", shortKh: "កន្លែងដែលរូបថត និងឯកសារនៅជាប់ជានិច្ច។",
    longEn: "Storage is where your stuff lives even when the computer is OFF. Family photos, your school essays, downloaded videos, the operating system itself — all live here. Old hard drives use a spinning magnetic disc; modern SSDs use flash memory chips with no moving parts (faster and more durable).",
    longKh: "អង្គផ្ទុកគឺជាកន្លែងដែលរបស់របររបស់អ្នកនៅរស់នៅ សូម្បីពេលកុំព្យូទ័របិទ។ រូបថតគ្រួសារ អត្ថបទសិក្សា វីដេអូបានទាញយក ប្រព័ន្ធប្រតិបត្តិការខ្លួនវា — សុទ្ធតែរស់នៅទីនេះ។ Hard Drive ចាស់ប្រើថាសម៉ាញេទិចបង្វិល; SSD ទំនើបប្រើបន្ទះអង្គចងចាំ flash គ្មានផ្នែកផ្លាស់ទី (លឿន និងកាន់តែ​ធន់)។",
    factEn: "A 1 terabyte SSD can hold around 250,000 photos or 500 hours of video.",
    factKh: "SSD ទំហំ ១ តេរ៉ាបៃ អាចផ្ទុករូបថតប្រហែល ២៥០,០០០ ឬវីដេអូ ៥០០ ម៉ោង។",
    icon: HardDrive,
    accent: "#a855f7", accentBg: "bg-purple-50", accentBorder: "border-purple-400", accentText: "text-purple-900",
  },
  gpu: {
    type: "gpu",
    nickEn: "The Artist", nickKh: "វិចិត្រករ",
    nameEn: "GPU — Graphics Processing Unit", nameKh: "GPU — ក្រាហ្វិកកាត",
    shortEn: "Draws every pixel on your screen.", shortKh: "គូររាល់ភីកសែលនៅលើអេក្រង់របស់អ្នក។",
    longEn: "The GPU is a specialist for pictures. While the CPU does a few hard problems quickly, the GPU does THOUSANDS of small problems all at the same time — perfect for drawing every pixel of a 3D game or playing a video. Your monitor shows whatever the GPU sends it.",
    longKh: "GPU គឺជាអ្នកជំនាញសម្រាប់រូបភាព។ ខណៈ CPU ដោះស្រាយបញ្ហាពិបាកពីរបីយ៉ាងលឿន GPU ដោះស្រាយបញ្ហាតូចៗរាប់ពាន់ ក្នុងពេលដំណាលគ្នា — ល្អឥតខ្ចោះសម្រាប់គូររាល់ភីកសែលនៃហ្គេម 3D ឬចាក់វីដេអូ។ Monitor (អេក្រង់) របស់អ្នកបង្ហាញនូវអ្វីដែល GPU បញ្ជូនទៅ។",
    factEn: "A 1080p screen has 2 million pixels. The GPU re-paints all of them 60 times every second when you watch video.",
    factKh: "អេក្រង់ 1080p មាន ២ លានភីកសែល។ GPU គូរវាទាំងអស់ ៦០ ដងក្នុងមួយវិនាទី ពេលអ្នកមើលវីដេអូ។",
    icon: MonitorPlay,
    accent: "#f97316", accentBg: "bg-orange-50", accentBorder: "border-orange-400", accentText: "text-orange-900",
  },
};

export function MotherboardBuilder() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [installed, setInstalled] = useState<Set<ComponentId>>(new Set());
  const [selected, setSelected] = useState<ComponentId | null>(null);

  function toggle(id: ComponentId) {
    setInstalled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setSelected(id);
  }

  function reset() {
    setInstalled(new Set());
    setSelected(null);
  }

  const allInstalled = SLOTS.every((s) => installed.has(s.id));
  const selectedSlot = selected ? SLOTS.find((s) => s.id === selected) : null;
  const selectedInfo = selectedSlot ? INFO[selectedSlot.type] : null;

  return (
    <div className="rounded-3xl bg-slate-950 border-2 border-cyan-500/40 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-b-2 border-cyan-500/30 relative">
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />
        <div className="relative">
          <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            <Cpu className="w-3.5 h-3.5" />
            <span>{kh ? "ឧបករណ៍សាងសង់" : "Build Tool"}</span>
            <span className="opacity-50">/</span>
            <span>BLUEPRINT v1.0</span>
          </div>
          <h3 className={`font-display text-xl sm:text-2xl font-bold text-white mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh ? "ផែនទីម៉ザーបត Virtual PC" : "Build Your Virtual PC"}
            {kh && <span className="ml-2 text-sm text-cyan-300/80 font-sans font-normal">(Motherboard Diagram)</span>}
          </h3>
          <p className={`mt-1 text-sm text-slate-300 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "ចុចលើរន្ធទទេនីមួយៗ ដើម្បី «ដំឡើង» ផ្នែកមួយ ហើយរៀនពីអ្វីដែលវាធ្វើ។"
              : "Click each empty slot to 'install' a component and learn what it does."}
          </p>
        </div>
      </div>

      {/* Status bar */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-900 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {SLOTS.map((s) => {
            const info = INFO[s.type];
            const Icon = info.icon;
            const ok = installed.has(s.id);
            return (
              <span key={s.id}
                className={`inline-flex items-center gap-1 px-1.5 py-1 rounded font-mono uppercase tracking-wider border ${
                  ok ? "border-cyan-400 text-cyan-300 bg-cyan-500/10" : "border-slate-700 text-slate-500"
                } ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                <Icon className="w-3 h-3" />
                <span className="text-[10px]">{kh ? info.nickKh : info.type.toUpperCase()}{s.id === "ram2" ? " ²" : s.id === "ram1" ? " ¹" : ""}</span>
                {ok && <CheckCircle2 className="w-3 h-3 text-cyan-300" />}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          {allInstalled && (
            <span className={`inline-flex items-center gap-1 text-xs font-bold text-emerald-300 animate-pulse ${kh ? "font-khmer" : ""}`}>
              <Zap className="w-3.5 h-3.5" />
              {kh ? "PC រួចរាល់ហើយ!" : "PC Ready!"}
            </span>
          )}
          {installed.size > 0 && (
            <button onClick={reset} className={`text-xs text-slate-400 hover:text-cyan-300 inline-flex items-center gap-1 ${kh ? "font-khmer" : ""}`}>
              <RotateCcw className="w-3 h-3" />
              {kh ? "កំណត់ឡើងវិញ" : "Reset"}
            </button>
          )}
        </div>
      </div>

      {/* Motherboard SVG */}
      <div className="p-3 sm:p-5 bg-slate-950">
        <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
          <svg viewBox="0 0 800 500" className="block w-full min-w-[560px] h-auto rounded-xl border-2 border-cyan-700/40 bg-slate-900"
               role="img" aria-label="Motherboard diagram">
            <defs>
              {/* Blueprint grid */}
              <pattern id="mb-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0 L0 0 0 40" fill="none" stroke="#0e7490" strokeWidth="0.5" opacity="0.4" />
              </pattern>
              <pattern id="mb-grid-fine" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M10 0 L0 0 0 10" fill="none" stroke="#0e7490" strokeWidth="0.3" opacity="0.25" />
              </pattern>
              <radialGradient id="cpu-glow">
                <stop offset="0%"  stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ram-stick" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
              <linearGradient id="gpu-card" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9a3412" />
                <stop offset="100%" stopColor="#7c2d12" />
              </linearGradient>
              <style>{`
                @keyframes slot-pulse { 0%,100% { stroke-opacity: 0.5; } 50% { stroke-opacity: 1; } }
                @keyframes circuit-flow { to { stroke-dashoffset: -16; } }
                .slot-empty { animation: slot-pulse 2s ease-in-out infinite; }
                .circuit-trace { animation: circuit-flow 2s linear infinite; }
                @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
              `}</style>
            </defs>

            {/* Background grids */}
            <rect width="800" height="500" fill="url(#mb-grid-fine)" />
            <rect width="800" height="500" fill="url(#mb-grid)" />

            {/* PCB outline */}
            <rect x="40" y="40" width="720" height="420" rx="14"
                  fill="#082f1f" stroke="#22d3ee" strokeWidth="2.5" strokeOpacity="0.7" />
            {/* Mounting holes */}
            {[[60,60],[740,60],[60,440],[740,440]].map(([cx,cy],i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.2" />
                <circle cx={cx} cy={cy} r="2" fill="#22d3ee" opacity="0.6" />
              </g>
            ))}

            {/* Decorative circuit traces (cyan) */}
            <g stroke="#22d3ee" strokeWidth="1.4" fill="none" opacity="0.6">
              <path d="M 280 190 L 230 190 L 230 250 L 110 250" />
              <path d="M 460 190 L 510 190" />
              <path d="M 460 220 L 640 220" />
              <path d="M 350 280 L 350 360" />
              <path d="M 480 280 L 480 360" strokeDasharray="6 4" className="circuit-trace" />
              <path d="M 280 220 L 110 220 L 110 360" />
              <path d="M 565 100 L 565 70 L 670 70" strokeDasharray="6 4" className="circuit-trace" />
            </g>
            <g fill="#22d3ee" opacity="0.85">
              {[[230,250],[110,250],[510,190],[640,220],[110,360],[670,70]].map(([cx,cy],i) =>
                <circle key={i} cx={cx} cy={cy} r="2.5" />
              )}
            </g>

            {/* Decorative chipset block (lower-right corner) */}
            <g>
              <rect x="640" y="280" width="100" height="60" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" />
              <text x="690" y="315" textAnchor="middle" fontSize="9" fontWeight="700" fill="#67e8f9" fontFamily="ui-monospace">CHIPSET</text>
            </g>

            {/* Slots */}
            {SLOTS.map((slot) => {
              const info = INFO[slot.type];
              const isInstalled = installed.has(slot.id);
              const isSelected = selected === slot.id;

              return (
                <g key={slot.id} className="cursor-pointer" onClick={() => toggle(slot.id)}>
                  {/* Selection glow */}
                  {isSelected && (
                    <rect x={slot.x - 6} y={slot.y - 6} width={slot.w + 12} height={slot.h + 12} rx="6"
                          fill="none" stroke={info.accent} strokeWidth="2.5" opacity="0.7" />
                  )}

                  {!isInstalled ? (
                    <EmptySlot slot={slot} info={info} kh={kh} />
                  ) : (
                    <InstalledComponent slot={slot} info={info} kh={kh} />
                  )}
                </g>
              );
            })}

            {/* Compass/legend mark (blueprint touch) */}
            <g transform="translate(60, 470)">
              <text x="0" y="0" fontSize="9" fontWeight="700" fill="#67e8f9" fontFamily="ui-monospace">
                {kh ? "ផែនទីបច្ចេកទេស — VIRTUAL PC v1.0" : "TECHNICAL DIAGRAM — VIRTUAL PC v1.0"}
              </text>
            </g>
            <g transform="translate(740, 470)">
              <text x="0" y="0" fontSize="9" fontWeight="700" fill="#67e8f9" fontFamily="ui-monospace" textAnchor="end">
                SCALE: NTS / MM
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Detail panel */}
      <div className="border-t-2 border-cyan-500/30 bg-slate-900">
        {selectedInfo && selectedSlot ? (
          <ComponentDetail info={selectedInfo} kh={kh}
                           installed={installed.has(selectedSlot.id)}
                           onClose={() => setSelected(null)} />
        ) : (
          <div className={`p-5 text-center text-sm text-slate-400 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "↑ ចុចរន្ធណាមួយខាងលើ ដើម្បីដំឡើងផ្នែក និងអានការពន្យល់។"
              : "↑ Click any slot above to install a component and read its explanation."}
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function EmptySlot({ slot, info, kh }: { slot: Slot; info: Info; kh: boolean }) {
  return (
    <g className="slot-empty">
      {/* Hit area */}
      <rect x={slot.x} y={slot.y} width={slot.w} height={slot.h} fill="transparent" />
      {/* Slot outline */}
      <rect x={slot.x} y={slot.y} width={slot.w} height={slot.h} rx="4"
            fill="#0f172a" stroke={info.accent} strokeWidth="1.8" strokeDasharray="6 4" opacity="0.9" />
      {/* Center plus */}
      <g transform={`translate(${slot.x + slot.w / 2}, ${slot.y + slot.h / 2})`}>
        <circle r="14" fill="#0f172a" stroke={info.accent} strokeWidth="1.5" />
        <line x1="-7" y1="0" x2="7" y2="0" stroke={info.accent} strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="-7" x2="0" y2="7" stroke={info.accent} strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Slot label */}
      <text x={slot.x + slot.w / 2} y={slot.y - 8} textAnchor="middle" fontSize="10" fontWeight="700"
            fill={info.accent} fontFamily="ui-monospace" opacity="0.9">
        {kh ? slot.labelKh : slot.labelEn.toUpperCase()}
      </text>
      {/* Click hint inside larger slots */}
      {slot.w > 100 && slot.h > 50 && (
        <text x={slot.x + slot.w / 2} y={slot.y + slot.h / 2 + 32} textAnchor="middle" fontSize="9"
              fill="#94a3b8" fontFamily="ui-monospace" opacity="0.85"
              style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
          {kh ? "ចុច​ដើម្បីដំឡើង" : "CLICK TO INSTALL"}
        </text>
      )}
    </g>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function InstalledComponent({ slot, info, kh }: { slot: Slot; info: Info; kh: boolean }) {
  if (slot.type === "cpu") {
    const cx = slot.x + slot.w / 2, cy = slot.y + slot.h / 2;
    return (
      <g>
        <circle cx={cx} cy={cy} r="100" fill="url(#cpu-glow)" />
        {/* CPU package */}
        <rect x={slot.x + 18} y={slot.y + 18} width={slot.w - 36} height={slot.h - 36} rx="8"
              fill="#0c1220" stroke={info.accent} strokeWidth="2" />
        {/* Inner die */}
        <rect x={cx - 38} y={cy - 38} width="76" height="76" rx="3" fill="#1e3a5f" stroke="#67e8f9" strokeWidth="1.4" />
        {/* Etched grid (transistor concept) */}
        <g stroke="#67e8f9" strokeWidth="0.5" opacity="0.7">
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i}>
              <line x1={cx - 38} y1={cy - 38 + i * 15} x2={cx + 38} y2={cy - 38 + i * 15} />
              <line x1={cx - 38 + i * 15} y1={cy - 38} x2={cx - 38 + i * 15} y2={cy + 38} />
            </g>
          ))}
        </g>
        {/* Pins (around the package) */}
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i}>
            <line x1={slot.x + 18 + i * 12} y1={slot.y + 18} x2={slot.x + 18 + i * 12} y2={slot.y + 8}
                  stroke="#fbbf24" strokeWidth="1.2" />
            <line x1={slot.x + 18 + i * 12} y1={slot.y + slot.h - 18} x2={slot.x + 18 + i * 12} y2={slot.y + slot.h - 8}
                  stroke="#fbbf24" strokeWidth="1.2" />
          </g>
        ))}
        <text x={cx} y={cy - 50} textAnchor="middle" fontSize="11" fontWeight="800" fill="#67e8f9" fontFamily="ui-monospace">CPU</text>
        <text x={cx} y={cy + 56} textAnchor="middle" fontSize="9" fontWeight="700" fill="#94a3b8" fontFamily="ui-monospace">
          {kh ? "ខួរក្បាល" : "BRAIN"}
        </text>
      </g>
    );
  }

  if (slot.type === "ram") {
    return (
      <g>
        <rect x={slot.x} y={slot.y} width={slot.w} height={slot.h} rx="3" fill="url(#ram-stick)" stroke="#16a34a" strokeWidth="1.5" />
        {/* Memory chips (8 small black rectangles) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={slot.x + 8} y={slot.y + 18 + i * 24} width={slot.w - 16} height="14" rx="1"
                fill="#0c1220" stroke="#bbf7d0" strokeWidth="0.6" />
        ))}
        {/* Gold pins at the bottom edge */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={slot.x + 5 + i * 6} y1={slot.y + slot.h} x2={slot.x + 5 + i * 6} y2={slot.y + slot.h + 5}
                stroke="#fbbf24" strokeWidth="1" />
        ))}
        <text x={slot.x + slot.w / 2} y={slot.y - 4} textAnchor="middle" fontSize="9" fontWeight="800" fill="#86efac" fontFamily="ui-monospace">RAM</text>
      </g>
    );
  }

  if (slot.type === "gpu") {
    return (
      <g>
        {/* GPU card body */}
        <rect x={slot.x} y={slot.y - 60} width={slot.w} height={slot.h + 60} rx="4"
              fill="url(#gpu-card)" stroke="#fb923c" strokeWidth="1.5" />
        {/* Twin fans */}
        {[140, 290, 440].map((cx, i) => (
          <g key={i} transform={`translate(${slot.x + cx}, ${slot.y - 25})`}>
            <circle r="22" fill="#1c1917" stroke="#fb923c" strokeWidth="1.2" />
            <circle r="8" fill="#7c2d12" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <line key={a} x1="0" y1="0"
                    x2={Math.cos(a * Math.PI / 180) * 18}
                    y2={Math.sin(a * Math.PI / 180) * 18}
                    stroke="#44403c" strokeWidth="3" strokeLinecap="round" />
            ))}
          </g>
        ))}
        {/* Pins */}
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={i} x1={slot.x + 8 + i * 16} y1={slot.y + slot.h - 4}
                x2={slot.x + 8 + i * 16} y2={slot.y + slot.h + 4}
                stroke="#fbbf24" strokeWidth="0.8" />
        ))}
        <text x={slot.x + slot.w / 2} y={slot.y - 70} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fb923c" fontFamily="ui-monospace">GPU CARD</text>
      </g>
    );
  }

  // SSD
  return (
    <g>
      <rect x={slot.x} y={slot.y} width={slot.w} height={slot.h} rx="2"
            fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
      {/* Storage chips */}
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x={slot.x + 10 + i * 28} y={slot.y + 5} width="22" height="20" rx="1"
              fill="#0c1220" stroke="#d8b4fe" strokeWidth="0.6" />
      ))}
      <text x={slot.x + slot.w / 2} y={slot.y - 6} textAnchor="middle" fontSize="9" fontWeight="800" fill="#d8b4fe" fontFamily="ui-monospace">M.2 SSD</text>
    </g>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function ComponentDetail({ info, kh, installed, onClose }: { info: Info; kh: boolean; installed: boolean; onClose: () => void }) {
  const Icon = info.icon;
  return (
    <div className={`p-5 sm:p-6 ${info.accentBg} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className="flex items-start gap-4 mb-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center" style={{ color: info.accent }}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`text-[10px] font-mono uppercase tracking-widest opacity-70 ${info.accentText} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? `«${info.nickKh}»` : `"${info.nickEn}"`}
            {installed && <span className="ml-2 inline-flex items-center gap-1 text-emerald-700"><CheckCircle2 className="w-3 h-3" /> {kh ? "ដំឡើងរួច" : "Installed"}</span>}
          </div>
          <h4 className={`font-display font-bold text-lg ${info.accentText} ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh ? info.nameKh : info.nameEn}
          </h4>
          <p className={`mt-0.5 text-sm font-bold text-stone-700 ${kh ? "font-khmer" : ""}`}>
            {kh ? info.shortKh : info.shortEn}
          </p>
        </div>
        <button onClick={onClose} className="text-stone-500 hover:text-stone-800 p-1" aria-label={kh ? "បិទ" : "Close"}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className={`text-sm text-stone-800 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose text-base" : ""}`}>
        {kh ? info.longKh : info.longEn}
      </p>
      {kh && (
        <p className="text-xs italic text-stone-500 mb-3">{info.longEn}</p>
      )}

      <div className={`rounded-lg border-2 ${info.accentBorder} bg-white p-3 flex items-start gap-2`}>
        <Zap className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: info.accent }} />
        <div>
          <div className={`text-[10px] font-mono uppercase tracking-widest opacity-70 ${info.accentText} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "ចំណេះដឹងមួយយ៉ាង" : "Quick Fact"}
          </div>
          <div className={`text-sm font-bold text-stone-900 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? info.factKh : info.factEn}
          </div>
        </div>
      </div>
    </div>
  );
}
