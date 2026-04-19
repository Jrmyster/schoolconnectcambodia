import { useState } from "react";
import { Lightbulb, Type as TypeIcon, Palette, Shuffle, Power } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type Mode = "letter" | "color";

const PRESETS: { label: string; bits: number; en: string; kh: string }[] = [
  { label: "A",       bits: 65,  en: "Capital letter A",       kh: "អក្សរ A" },
  { label: "B",       bits: 66,  en: "Capital letter B",       kh: "អក្សរ B" },
  { label: "Z",       bits: 90,  en: "Capital letter Z",       kh: "អក្សរ Z" },
  { label: "!",       bits: 33,  en: "Exclamation mark",       kh: "សញ្ញាឧទាន" },
  { label: "0",       bits: 48,  en: "The digit zero",         kh: "លេខសូន្យ" },
  { label: "Space",   bits: 32,  en: "A space character",      kh: "តួអក្សរទំនេរ" },
];

export function BinarySignalVisualizer() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [bits, setBits] = useState<boolean[]>(() => Array(8).fill(false));
  const [mode, setMode] = useState<Mode>("letter");

  // Big-endian: bits[0] = MSB (128), bits[7] = LSB (1)
  const decimal = bits.reduce((acc, b, i) => acc + (b ? Math.pow(2, 7 - i) : 0), 0);
  const binaryStr = bits.map((b) => (b ? "1" : "0")).join("");
  const isPrintable = decimal >= 32 && decimal <= 126;
  const ascii = isPrintable ? String.fromCharCode(decimal) : null;
  const grayHex = `rgb(${decimal}, ${decimal}, ${decimal})`;

  function toggle(i: number) {
    setBits((prev) => prev.map((b, j) => (j === i ? !b : b)));
  }
  function setFromDecimal(d: number) {
    const next = Array(8).fill(false);
    let n = d & 0xff;
    for (let i = 7; i >= 0; i--) { next[i] = (n & 1) === 1; n >>= 1; }
    setBits(next);
  }

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
            <Power className="w-3.5 h-3.5" />
            <span>{kh ? "ឧបករណ៍ចុងក្រោយ" : "Signal Tool"}</span>
          </div>
          <h3 className={`font-display text-xl sm:text-2xl font-bold text-white mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh ? "ការមើលឃើញសញ្ញាប្រព័ន្ធគោលពីរ" : "The Binary Signal Visualizer"}
            {kh && <span className="ml-2 text-sm text-cyan-300/80 font-sans font-normal">(0s and 1s)</span>}
          </h3>
          <p className={`mt-1 text-sm text-slate-300 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "កុំព្យូទ័រដឹងតែ ពីរ រឿង៖ បើក (១) និង បិទ (០)។ ផ្ដល់កុំព្យូទ័រនូវ ៨ ពីរទាំងនេះ ហើយវាអាចបង្កើតអក្សរ ឬពណ៌។"
              : "Computers only know TWO things: ON (1) and OFF (0). Give a computer 8 of these, and it can spell a letter or paint a color."}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-0">
        {/* Switches & presets */}
        <div className="p-5 sm:p-6 bg-slate-900">
          {/* Switch row */}
          <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "កុងតាក់ ៨ ដុំ (១ បៃ)" : "8 Switches (1 Byte)"}
          </div>
          <div className="grid grid-cols-8 gap-1.5 sm:gap-2 mb-2">
            {bits.map((on, i) => (
              <BitSwitch key={i} on={on} place={Math.pow(2, 7 - i)} onClick={() => toggle(i)} />
            ))}
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 mb-5">
            <span>← {kh ? "ខ្ពស់" : "MSB (128)"}</span>
            <div className="flex-1 border-b border-dashed border-slate-700" />
            <span>{kh ? "ទាប" : "LSB (1)"} →</span>
          </div>

          {/* Live readout */}
          <div className="rounded-2xl bg-slate-950 border border-cyan-500/30 p-4 mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <Readout label={kh ? "គោលពីរ" : "BINARY"} value={binaryStr} mono kh={kh} />
              <Readout label={kh ? "គោលដប់" : "DECIMAL"} value={String(decimal)} mono kh={kh} />
              <Readout label={kh ? "ASCII"   : "ASCII"}   value={ascii ?? "—"} large kh={kh} />
            </div>
          </div>

          {/* Presets */}
          <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "សាកល្បងមួយចំនួន" : "Try a preset"}
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button key={p.label} onClick={() => setFromDecimal(p.bits)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border-2 border-cyan-500/40 bg-slate-900 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 transition ${kh ? "font-khmer" : ""}`}>
                <span className="font-mono text-base">{p.label}</span>
                <span className="opacity-70">→ {p.bits}</span>
              </button>
            ))}
            <button onClick={() => setFromDecimal(Math.floor(Math.random() * 95) + 32)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border-2 border-fuchsia-500/40 bg-slate-900 text-fuchsia-200 hover:bg-fuchsia-500/20 hover:border-fuchsia-400 transition ${kh ? "font-khmer" : ""}`}>
              <Shuffle className="w-3 h-3" />
              {kh ? "ព្យាករ" : "Random"}
            </button>
            <button onClick={() => setBits(Array(8).fill(false))}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border-2 border-slate-600 bg-slate-900 text-slate-300 hover:bg-slate-800 transition ${kh ? "font-khmer" : ""}`}>
              {kh ? "បិទទាំងអស់" : "All OFF"}
            </button>
          </div>

          {/* Mode info card (hardware/CPU explanation) */}
          <div className={`mt-5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-3 text-xs text-cyan-100 flex items-start gap-2 ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
            <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-300" />
            <span>
              <span className="font-extrabold">{kh ? "ហេតុអ្វី «ពីរ»? " : "Why TWO? "}</span>
              {kh
                ? "ត្រង់ស៊ីស្ទ័រនៅក្នុង CPU គឺជាកុងតាក់តូចៗ — បើក (១) ឬបិទ (០)។ វាគ្មានស្ថានភាពចន្លោះទេ។ ដូច្នេះអ្វីៗគ្រប់យ៉ាង — អក្សរ រូបភាព សំឡេង វីដេអូ — សុទ្ធតែបង្កើតពីការរៀបចំ ១ និង ០ មហាសាល។"
                : "Transistors inside the CPU are tiny switches — ON (1) or OFF (0). There is no in-between. So everything — letters, pictures, sound, video — is built from huge arrangements of 1s and 0s."}
            </span>
          </div>
        </div>

        {/* Output panel — what it MEANS */}
        <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-cyan-500/30 bg-gradient-to-b from-slate-950 to-slate-900 p-5">
          {/* Mode tabs */}
          <div className="flex gap-1 mb-4 p-1 rounded-lg bg-slate-900 border border-cyan-500/20">
            <ModeTab active={mode === "letter"} onClick={() => setMode("letter")}
                     icon={<TypeIcon className="w-3.5 h-3.5" />}
                     en="Letter" kh="អក្សរ" kh_active={kh} />
            <ModeTab active={mode === "color"}  onClick={() => setMode("color")}
                     icon={<Palette className="w-3.5 h-3.5" />}
                     en="Color"  kh="ពណ៌"  kh_active={kh} />
          </div>

          {mode === "letter" ? (
            <div className="space-y-3">
              <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? "បកស្រាយជាអក្សរ (ASCII)" : "Interpreted as a letter (ASCII)"}
              </div>
              <div className="rounded-2xl bg-black border-2 border-cyan-500/50 aspect-square flex items-center justify-center relative overflow-hidden">
                {/* CRT scanline effect */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "repeating-linear-gradient(0deg, #22d3ee 0px, transparent 1px, transparent 3px)",
                }} />
                <div className="relative">
                  {ascii ? (
                    <div className="text-[160px] sm:text-[200px] font-mono font-extrabold text-cyan-300 leading-none"
                         style={{ textShadow: "0 0 20px #22d3ee, 0 0 40px #06b6d4" }}>
                      {ascii === " " ? "␣" : ascii}
                    </div>
                  ) : (
                    <div className={`text-center text-cyan-700 ${kh ? "font-khmer" : ""}`}>
                      <div className="text-5xl font-mono mb-2">—</div>
                      <div className="text-xs">
                        {kh ? "មិនមែនអក្សរបោះពុម្ពទេ" : "Not a printable letter"}
                      </div>
                      <div className="text-[10px] mt-1 opacity-70">
                        {kh ? "សាកល្បងលេខ ៣២–១២៦" : "Try values 32–126"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-xs text-slate-400 leading-relaxed ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
                {kh
                  ? `កុំព្យូទ័រឃើញ "${binaryStr}" ហើយតារាង ASCII ប្រាប់វាថា = ${ascii ?? "—"}`
                  : `The computer sees "${binaryStr}" and the ASCII table tells it = ${ascii ?? "—"}`}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? "បកស្រាយជាពណ៌ប្រផេះ" : "Interpreted as a grayscale value"}
              </div>
              <div className="rounded-2xl border-2 border-cyan-500/50 aspect-square overflow-hidden relative shadow-inner"
                   style={{ backgroundColor: grayHex }}>
                <div className="absolute inset-0 flex items-end justify-center p-3">
                  <div className="px-2 py-1 rounded bg-black/70 text-[10px] font-mono text-cyan-200 backdrop-blur-sm">
                    rgb({decimal}, {decimal}, {decimal})
                  </div>
                </div>
              </div>
              <div className={`rounded-lg bg-slate-900 border border-cyan-500/30 p-3 text-xs text-slate-300 ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
                {kh
                  ? "ពណ៌ ១ ប៊ីត = ប្រផេះកម្រិត ២៥៦។ ពណ៌ពេញ ត្រូវការ ៣ បៃ ​(R, G, B) — បង្កើតបាន ១៦.៧ លានពណ៌។"
                  : "One byte = 256 shades of gray. A FULL color uses 3 bytes (R, G, B) — making 16.7 million possible colors."}
              </div>
              {/* Mini RGB demo: three sliders */}
              <RgbDemo kh={kh} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function BitSwitch({ on, place, onClick }: { on: boolean; place: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`group relative aspect-[3/4] rounded-lg border-2 transition active:scale-95 ${
        on
          ? "bg-gradient-to-b from-cyan-300 to-cyan-500 border-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
          : "bg-slate-900 border-slate-700 hover:border-cyan-500/60"
      }`}
    >
      {/* Bulb icon */}
      <div className="flex flex-col items-center justify-center h-full gap-0.5 px-1">
        <div className={`text-2xl sm:text-3xl font-mono font-extrabold leading-none ${on ? "text-slate-900" : "text-slate-600"}`}>
          {on ? "1" : "0"}
        </div>
        <div className={`text-[8px] sm:text-[9px] font-mono uppercase tracking-wider ${on ? "text-slate-800" : "text-slate-500"}`}>
          {on ? "ON" : "OFF"}
        </div>
      </div>
      {/* Place value chip */}
      <div className={`absolute -top-1 left-1/2 -translate-x-1/2 px-1 rounded text-[8px] font-mono font-bold ${on ? "bg-cyan-400 text-slate-900" : "bg-slate-800 text-cyan-400"}`}>
        {place}
      </div>
    </button>
  );
}

function Readout({ label, value, mono, large, kh }: { label: string; value: string; mono?: boolean; large?: boolean; kh: boolean }) {
  return (
    <div>
      <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-400/70 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>{label}</div>
      <div className={`mt-1 ${mono ? "font-mono" : ""} ${large ? "text-3xl" : "text-xl"} font-extrabold text-cyan-200 break-all`}
           style={large ? { textShadow: "0 0 8px rgba(34,211,238,0.6)" } : undefined}>
        {value}
      </div>
    </div>
  );
}

function ModeTab({ active, onClick, icon, en, kh, kh_active }: { active: boolean; onClick: () => void; icon: React.ReactNode; en: string; kh: string; kh_active: boolean }) {
  return (
    <button onClick={onClick} className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded transition ${
      active ? "bg-cyan-500 text-slate-950 shadow" : "text-cyan-300 hover:bg-cyan-500/10"
    } ${kh_active ? "font-khmer" : ""}`}>
      {icon}
      {kh_active ? kh : en}
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function RgbDemo({ kh }: { kh: boolean }) {
  const [r, setR] = useState(220);
  const [g, setG] = useState(38);
  const [b, setB] = useState(127);
  const swatch = `rgb(${r}, ${g}, ${b})`;
  return (
    <div className="rounded-lg bg-slate-900 border border-cyan-500/30 p-3 mt-2">
      <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-400/70 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? "សាកល្បងពណ៌ពេញ (R + G + B)" : "Try a full color (R + G + B)"}
      </div>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-lg border-2 border-cyan-500/40 flex-shrink-0" style={{ backgroundColor: swatch }} />
        <div className="flex-1 space-y-1.5 min-w-0">
          <ChannelSlider label="R" value={r} setValue={setR} color="#ef4444" />
          <ChannelSlider label="G" value={g} setValue={setG} color="#22c55e" />
          <ChannelSlider label="B" value={b} setValue={setB} color="#3b82f6" />
        </div>
      </div>
      <div className={`mt-2 text-[11px] font-mono text-cyan-200/80 ${kh ? "font-khmer text-xs" : ""}`}>
        rgb({r}, {g}, {b}) = {(r * 65536 + g * 256 + b).toString(2).padStart(24, "0").match(/.{8}/g)?.join(" ")}
      </div>
    </div>
  );
}

function ChannelSlider({ label, value, setValue, color }: { label: string; value: number; setValue: (n: number) => void; color: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <span className="w-4 font-bold" style={{ color }}>{label}</span>
      <input type="range" min={0} max={255} value={value} onChange={(e) => setValue(Number(e.target.value))}
             className="flex-1" style={{ accentColor: color }} />
      <span className="w-8 text-right text-cyan-200">{value}</span>
    </div>
  );
}
