import {
  Rocket, Smartphone, Quote, Cpu, MemoryStick, HardDrive, Gauge,
  Weight, Ruler, Sparkles, Zap,
} from "lucide-react";
import type { ComponentType } from "react";
import { useLanguageStore } from "@/store/use-language";

type Row = {
  icon: ComponentType<{ className?: string }>;
  labelEn: string; labelKh: string;
  apollo: string;            // mono, B&W
  apolloDescEn: string; apolloDescKh: string;
  phone: string;             // mono, neon
  phoneDescEn: string;  phoneDescKh: string;
  multiplierEn: string; multiplierKh: string;
};

const ROWS: Row[] = [
  {
    icon: Gauge,
    labelEn: "Processing Speed", labelKh: "ល្បឿនដំណើរការ",
    apollo: "0.043 MHz",
    apolloDescEn: "43 thousand cycles per second.",
    apolloDescKh: "៤៣ ពាន់ដង ក្នុងមួយវិនាទី។",
    phone: "~3,000 MHz",
    phoneDescEn: "3 BILLION cycles per second.",
    phoneDescKh: "៣ ពាន់លានដង ក្នុងមួយវិនាទី។",
    multiplierEn: "60,000× faster",
    multiplierKh: "លឿនជាង ៦០,០០០ ដង",
  },
  {
    icon: MemoryStick,
    labelEn: "Memory (RAM)", labelKh: "អង្គចងចាំ (RAM)",
    apollo: "4 KB",
    apolloDescEn: "Enough for ~1 page of text.",
    apolloDescKh: "ល្មមសម្រាប់ប្រហែល ១ ទំព័រអក្សរ។",
    phone: "8 GB (8,000,000 KB)",
    phoneDescEn: "Enough for thousands of apps at once.",
    phoneDescKh: "ល្មមសម្រាប់កម្មវិធីរាប់ពាន់ក្នុងពេលតែមួយ។",
    multiplierEn: "2,000,000× more",
    multiplierKh: "ច្រើនជាង ២,០០០,០០០ ដង",
  },
  {
    icon: HardDrive,
    labelEn: "Storage", labelKh: "អង្គផ្ទុក",
    apollo: "Rope Memory",
    apolloDescEn: "Wires WOVEN BY HAND through tiny iron rings — '1' if through, '0' if around.",
    apolloDescKh: "ខ្សែដែលត្រូវត្បាញដោយដៃតាមរយៈចិញ្ចៀនដែកតូចៗ — '១' ប្រសិនបើកាត់ '០' ប្រសិនបើជុំវិញ។",
    phone: "Flash Storage (128 GB)",
    phoneDescEn: "Holds millions of books, photos, and songs — no moving parts.",
    phoneDescKh: "ផ្ទុកសៀវភៅ រូបថត និងបទចម្រៀងរាប់លាន — គ្មានផ្នែកផ្លាស់ទី។",
    multiplierEn: "Built in seconds, not months",
    multiplierKh: "សាងសង់ក្នុងវិនាទី មិនមែនខែ",
  },
];

/* ────────────────────────────────────────────────────────────────────── */

export function ApolloVsPhoneCard() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="rounded-3xl overflow-hidden border-4 border-stone-900 shadow-2xl bg-stone-900">
      {/* Top header bar — mission control style */}
      <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-stone-950 via-stone-900 to-indigo-950 border-b-2 border-stone-700 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className={`ml-2 text-[10px] font-mono uppercase tracking-[0.3em] text-stone-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "បន្ទប់បញ្ជា" : "Mission Control"}
          </span>
        </div>
        <div className={`text-[10px] font-mono text-stone-500 ${kh ? "font-khmer text-xs" : ""}`}>
          T+{kh ? "៥៦ ឆ្នាំ" : "56 YEARS"} • 1969 ↔ 2026
        </div>
      </div>

      {/* SPLIT SCREEN */}
      <div className="grid md:grid-cols-2 relative">
        {/* VS divider — diagonal slash on desktop, horizontal on mobile */}
        <div aria-hidden className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-20 items-center pointer-events-none">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-stone-500 to-transparent opacity-60" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-stone-900 border-4 border-amber-400 flex items-center justify-center shadow-[0_0_24px_#fbbf24aa] font-display font-extrabold text-amber-300 text-base">
            VS
          </div>
        </div>

        {/* ──────── LEFT: 1960s NASA (B&W analog) ──────── */}
        <div
          className="relative p-5 sm:p-6 text-stone-200 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #1c1917 100%), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
            backgroundBlendMode: "normal, overlay",
          }}
        >
          {/* CRT scanlines overlay */}
          <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.08]"
               style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 3px)" }} />
          {/* Film grain dots */}
          <div aria-hidden className="absolute inset-0 pointer-events-none opacity-20"
               style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #fff 0.5px, transparent 0.5px), radial-gradient(circle at 80% 70%, #fff 0.5px, transparent 0.5px), radial-gradient(circle at 50% 50%, #fff 0.5px, transparent 0.5px)", backgroundSize: "23px 23px, 31px 31px, 17px 17px" }} />

          {/* Header */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-white text-stone-900 text-[10px] font-mono font-extrabold tracking-widest">NASA</span>
              <span className={`text-[10px] font-mono uppercase tracking-widest text-stone-400 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? "ឆ្នាំ ១៩៦៩ • បេសកកម្មលើព្រះច័ន្ទ" : "1969 • LUNAR MISSION"}
              </span>
            </div>
            <h4 className={`font-mono text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white leading-none ${kh ? "font-khmer leading-snug normal-case text-xl sm:text-2xl" : ""}`}>
              {kh ? "កុំព្យូទ័រ Apollo (AGC)" : "Apollo Guidance Computer"}
            </h4>
            {kh && <div className="text-xs italic text-stone-400 mt-1">Apollo Guidance Computer (AGC)</div>}
            <p className={`mt-2 text-sm text-stone-400 leading-relaxed font-mono ${kh ? "font-khmer leading-loose text-base" : ""}`}>
              {kh
                ? "កុំព្យូទ័រដែលនាំមនុស្សទៅព្រះច័ន្ទដំបូងបង្អស់។"
                : "The computer that took humans to the moon for the very first time."}
            </p>
          </div>

          {/* AGC SVG illustration — boxy suitcase look */}
          <div className="relative mt-5 mb-4 flex flex-col items-center">
            <AgcIllustration kh={kh} />
            {/* B&W stat strip under illustration */}
            <div className="grid grid-cols-2 gap-2 w-full mt-3">
              <SpecChip dark icon={Weight} labelEn="WEIGHT" labelKh="ទម្ងន់" valueEn="32 kg" valueKh="៣២ គ.ក." kh={kh} />
              <SpecChip dark icon={Ruler}  labelEn="SIZE"   labelKh="ទំហំ"  valueEn="Suitcase-sized (61×32×17 cm)" valueKh="ស្មើវ៉ាលី (៦១×៣២×១៧ ស.ម.)" kh={kh} />
            </div>
          </div>

          {/* Apollo data readout */}
          <div className="relative mt-4 border-2 border-stone-700 bg-black/60 rounded-sm p-3">
            <div className={`text-[9px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {kh ? "ទិន្នន័យ AGC // ប្រវត្តិ" : "AGC TELEMETRY // ARCHIVAL"}
            </div>
            <ul className="space-y-2 font-mono text-sm">
              {ROWS.map((r) => (
                <li key={r.labelEn} className="flex items-baseline gap-2">
                  <r.icon className="w-3.5 h-3.5 flex-shrink-0 text-stone-400 self-center" />
                  <span className={`text-stone-400 text-xs ${kh ? "font-khmer text-sm" : ""}`}>{kh ? r.labelKh : r.labelEn}:</span>
                  <span className="text-white font-extrabold tracking-tight">{r.apollo}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ──────── RIGHT: Modern high-tech (vibrant) ──────── */}
        <div
          className="relative p-5 sm:p-6 overflow-hidden text-white"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(168,85,247,0.35), transparent 60%), radial-gradient(ellipse at bottom left, rgba(34,211,238,0.30), transparent 55%), linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #4a044e 100%)",
          }}
        >
          {/* Subtle digital grid */}
          <div aria-hidden className="absolute inset-0 pointer-events-none opacity-30"
               style={{ backgroundImage: "linear-gradient(#22d3ee22 1px, transparent 1px), linear-gradient(90deg, #22d3ee22 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          {/* Header */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white text-[10px] font-display font-extrabold tracking-widest rounded-full">2026</span>
              <span className={`text-[10px] font-mono uppercase tracking-widest text-cyan-200/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {kh ? "ស្មាតហ្វូនទំនើប" : "MODERN SMARTPHONE"}
              </span>
            </div>
            <h4 className={`font-display text-2xl sm:text-3xl font-extrabold leading-none bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent ${kh ? "font-khmer leading-snug text-xl sm:text-2xl" : ""}`}>
              {kh ? "ស្មាតហ្វូនរបស់អ្នក" : "Your Smartphone"}
            </h4>
            {kh && <div className="text-xs italic text-fuchsia-200/70 mt-1">Your Smartphone</div>}
            <p className={`mt-2 text-sm text-cyan-100/90 leading-relaxed ${kh ? "font-khmer leading-loose text-base" : ""}`}>
              {kh
                ? "កុំព្យូទ័រដែលដេកនៅក្នុងហោប៉ៅរបស់អ្នកនៅពេលនេះ។"
                : "The computer sleeping in your pocket right now."}
            </p>
          </div>

          {/* Phone SVG illustration */}
          <div className="relative mt-5 mb-4 flex flex-col items-center">
            <PhoneIllustration kh={kh} />
            <div className="grid grid-cols-2 gap-2 w-full mt-3">
              <SpecChip icon={Weight} labelEn="WEIGHT" labelKh="ទម្ងន់" valueEn="0.17 kg" valueKh="០.១៧ គ.ក." kh={kh} />
              <SpecChip icon={Ruler}  labelEn="SIZE"   labelKh="ទំហំ"   valueEn="Pocket-sized (15×7×0.8 cm)" valueKh="ស្មើហោប៉ៅ (១៥×៧×០.៨ ស.ម.)" kh={kh} />
            </div>
          </div>

          {/* Phone data readout — neon */}
          <div className="relative mt-4 border-2 border-fuchsia-400/60 bg-slate-950/60 rounded-xl p-3 shadow-[0_0_24px_rgba(168,85,247,0.25)]">
            <div className={`text-[9px] font-mono uppercase tracking-[0.3em] text-cyan-300 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {kh ? "ទិន្នន័យផ្ទាល់ // ​ឧបករណ៍ឥឡូវ" : "LIVE READOUT // YOUR DEVICE"}
            </div>
            <ul className="space-y-2 font-mono text-sm">
              {ROWS.map((r) => (
                <li key={r.labelEn} className="flex items-baseline gap-2">
                  <r.icon className="w-3.5 h-3.5 flex-shrink-0 text-cyan-300 self-center" />
                  <span className={`text-cyan-200/80 text-xs ${kh ? "font-khmer text-sm" : ""}`}>{kh ? r.labelKh : r.labelEn}:</span>
                  <span className="text-white font-extrabold tracking-tight">{r.phone}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ──────── BOTTOM: Side-by-side comparison table ──────── */}
      <div className="bg-stone-50 border-t-4 border-stone-900 p-5 sm:p-6">
        <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-stone-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
          {kh ? "ការប្រៀបធៀបដោយផ្ទាល់ • ស្ថិតិថាមពល" : "Side-by-Side • Power Stats"}
        </div>

        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full min-w-[640px] text-sm border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className={`text-left px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-stone-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  {kh ? "តួរ" : "Metric"}
                </th>
                <th className="text-left px-3 py-2 rounded-l-lg bg-stone-900 text-white">
                  <span className="inline-flex items-center gap-1.5">
                    <Rocket className="w-4 h-4" />
                    <span className={`font-mono font-bold ${kh ? "font-khmer" : ""}`}>{kh ? "Apollo (១៩៦៩)" : "Apollo (1969)"}</span>
                  </span>
                </th>
                <th className="text-center px-3 py-2 text-stone-500 text-[10px] font-mono uppercase">vs</th>
                <th className="text-left px-3 py-2 bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white">
                  <span className="inline-flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    <span className={`font-display font-bold ${kh ? "font-khmer" : ""}`}>{kh ? "ស្មាតហ្វូន (២០២៦)" : "Smartphone (2026)"}</span>
                  </span>
                </th>
                <th className={`text-left px-3 py-2 rounded-r-lg bg-amber-400 text-stone-900 ${kh ? "font-khmer" : ""}`}>
                  <span className="inline-flex items-center gap-1.5 font-display font-bold">
                    <Zap className="w-4 h-4" />
                    {kh ? "ភាពខុសគ្នា" : "The Leap"}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} className="bg-white shadow-sm rounded-lg align-top">
                  <td className="px-3 py-3 rounded-l-lg border-l-4 border-stone-900">
                    <div className="flex items-center gap-2">
                      <r.icon className="w-4 h-4 text-stone-700" />
                      <span className={`font-bold text-stone-900 ${kh ? "font-khmer text-base" : ""}`}>
                        {kh ? r.labelKh : r.labelEn}
                      </span>
                    </div>
                  </td>
                  {/* Apollo cell */}
                  <td className="px-3 py-3 bg-stone-100">
                    <div className="font-mono font-extrabold text-stone-900 text-base">{r.apollo}</div>
                    <div className={`text-xs text-stone-600 mt-0.5 leading-snug ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
                      {kh ? r.apolloDescKh : r.apolloDescEn}
                    </div>
                  </td>
                  <td className="px-2 text-center text-stone-400 font-mono font-bold align-middle">→</td>
                  {/* Phone cell */}
                  <td className="px-3 py-3 bg-gradient-to-br from-fuchsia-50 to-cyan-50">
                    <div className="font-mono font-extrabold text-fuchsia-700 text-base">{r.phone}</div>
                    <div className={`text-xs text-stone-700 mt-0.5 leading-snug ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
                      {kh ? r.phoneDescKh : r.phoneDescEn}
                    </div>
                  </td>
                  {/* Multiplier cell */}
                  <td className="px-3 py-3 rounded-r-lg bg-amber-100 border-r-4 border-amber-500">
                    <div className={`font-display font-extrabold text-amber-800 text-sm leading-tight ${kh ? "font-khmer text-base leading-snug" : ""}`}>
                      {kh ? r.multiplierKh : r.multiplierEn}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ──────── BIG IDEA QUOTE ──────── */}
      <div
        className="relative p-6 sm:p-8 text-white overflow-hidden border-t-4 border-amber-400"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(251,191,36,0.25), transparent 50%), linear-gradient(135deg, #0a0a0a 0%, #1e1b4b 50%, #4a044e 100%)",
        }}
      >
        {/* Twinkling stars */}
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-50"
             style={{ backgroundImage: "radial-gradient(1px 1px at 10% 20%, #fff, transparent), radial-gradient(1px 1px at 30% 70%, #fff, transparent), radial-gradient(1.5px 1.5px at 60% 35%, #fff, transparent), radial-gradient(1px 1px at 80% 80%, #fff, transparent), radial-gradient(1px 1px at 90% 15%, #fbbf24, transparent), radial-gradient(1.5px 1.5px at 45% 90%, #22d3ee, transparent)", backgroundSize: "300px 300px" }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <Quote className="w-10 h-10 text-amber-300 mx-auto mb-3 opacity-80" />
          <blockquote>
            <p className={`font-display text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight ${kh ? "font-khmer leading-snug text-lg sm:text-xl md:text-2xl" : ""}`}>
              {kh ? (
                <>
                  «យើងបានទៅដល់ព្រះច័ន្ទដោយប្រើថាមពលនៃម៉ាស៊ីនគិតលេខប៉ុណ្ណោះ។{" "}
                  <span className="bg-gradient-to-r from-cyan-300 via-amber-300 to-fuchsia-300 bg-clip-text text-transparent">
                    សាកស្រមៃមើលថា តើប្អូនៗអាចទៅដល់ទីណាខ្លះ ដោយប្រើថាមពលនៅក្នុងហោប៉ៅរបស់ប្អូនៗ!
                  </span>»
                </>
              ) : (
                <>
                  "We went to the moon with the power of a calculator.{" "}
                  <span className="bg-gradient-to-r from-cyan-300 via-amber-300 to-fuchsia-300 bg-clip-text text-transparent">
                    Imagine where YOU can go with the power in your pocket!
                  </span>"
                </>
              )}
            </p>
            {kh && (
              <p className="mt-3 text-sm italic text-stone-400 leading-relaxed">
                "We went to the moon with the power of a calculator. Imagine where YOU can go with the power in your pocket!"
              </p>
            )}
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-amber-300/80">
            <Rocket className="w-3.5 h-3.5" />
            <span>{kh ? "ជួយសាលា • បច្ចេកវិទ្យាសម្រាប់សិស្សកម្ពុជា" : "Chouy Sala • Tech for Cambodian Students"}</span>
            <Cpu className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function SpecChip({
  icon: Icon, labelEn, labelKh, valueEn, valueKh, kh, dark,
}: {
  icon: ComponentType<{ className?: string }>;
  labelEn: string; labelKh: string; valueEn: string; valueKh: string; kh: boolean; dark?: boolean;
}) {
  return (
    <div className={`rounded-md p-2 border ${
      dark
        ? "bg-stone-950 border-stone-700 text-stone-200"
        : "bg-slate-950/70 border-cyan-400/40 text-cyan-100"
    }`}>
      <div className={`flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest ${dark ? "text-stone-500" : "text-cyan-300"} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        <Icon className="w-3 h-3" />
        {kh ? labelKh : labelEn}
      </div>
      <div className={`mt-0.5 text-sm font-extrabold ${dark ? "text-white font-mono" : "text-white"} ${kh ? "font-khmer text-base" : ""}`}>
        {kh ? valueKh : valueEn}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function AgcIllustration({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 240 140" className="block w-full max-w-[280px] h-auto" role="img" aria-label="Apollo Guidance Computer">
      {/* Suitcase body */}
      <rect x="20" y="22" width="200" height="100" rx="3" fill="#1c1917" stroke="#fff" strokeWidth="2.5" />
      {/* Brushed metal lines */}
      <g opacity="0.5" stroke="#a8a29e" strokeWidth="0.5">
        {[28, 36, 44, 52, 60, 68, 76, 84, 92, 100, 108, 116].map((y) => (
          <line key={y} x1="22" y1={y} x2="218" y2={y} />
        ))}
      </g>

      {/* DSKY display unit (left) — green-on-black like real AGC */}
      <rect x="30" y="32" width="80" height="80" rx="2" fill="#000" stroke="#fff" strokeWidth="1.5" />
      <text x="36" y="44" fontSize="6" fontFamily="ui-monospace" fill="#9ca3af" fontWeight="700">DSKY</text>
      {/* Digit display rows */}
      <g fontFamily="ui-monospace" fontSize="9" fontWeight="900" fill="#4ade80">
        <text x="36" y="58">PROG  21</text>
        <text x="36" y="70">VERB  37</text>
        <text x="36" y="82">NOUN  01</text>
        <text x="36" y="94">+ 00069</text>
        <text x="36" y="106">+ 12345</text>
      </g>
      {/* Status lights */}
      <g>
        {[["UPLINK","#fbbf24"],["NO ATT","#dc2626"],["STBY","#fff"]].map(([l, c], i) => (
          <g key={i}>
            <rect x={92} y={36 + i * 8} width="14" height="6" fill={c as string} opacity="0.8" />
            <text x={99} y={40 + i * 8} fontSize="3.5" textAnchor="middle" fill="#000" fontWeight="700">{l}</text>
          </g>
        ))}
      </g>

      {/* Keypad (right side) */}
      <g>
        {[0,1,2,3].map((row) =>
          [0,1,2,3,4].map((col) => (
            <g key={`${row}-${col}`}>
              <rect x={120 + col * 18} y={36 + row * 18} width="14" height="14" rx="2" fill="#292524" stroke="#fff" strokeWidth="0.7" />
              <circle cx={127 + col * 18} cy={43 + row * 18} r="3" fill="#1c1917" stroke="#a8a29e" strokeWidth="0.5" />
            </g>
          ))
        )}
      </g>

      {/* Handle on top */}
      <path d="M 90 22 Q 90 12 105 12 L 135 12 Q 150 12 150 22"
            fill="none" stroke="#fff" strokeWidth="2.5" />
      {/* Side latches */}
      <rect x="14" y="60" width="6" height="16" fill="#a8a29e" stroke="#fff" strokeWidth="1" />
      <rect x="220" y="60" width="6" height="16" fill="#a8a29e" stroke="#fff" strokeWidth="1" />
      {/* NASA tag */}
      <rect x="155" y="106" width="55" height="10" fill="#fff" />
      <text x="183" y="113" textAnchor="middle" fontSize="6" fontFamily="ui-monospace" fontWeight="900" fill="#000">NASA · 1969</text>

      {/* Caption below */}
      <text x="120" y="135" textAnchor="middle" fontSize="7" fontFamily="ui-monospace" fontWeight="700" fill="#fff"
            style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
        {kh ? "AGC • ស្មើទំហំវ៉ាលី • ៣២ គ.ក." : "AGC • SUITCASE-SIZED • 32 KG"}
      </text>
    </svg>
  );
}

function PhoneIllustration({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 200 180" className="block w-full max-w-[200px] h-auto" role="img" aria-label="Modern smartphone">
      {/* Glow halo */}
      <ellipse cx="100" cy="160" rx="70" ry="6" fill="#a855f7" opacity="0.35" />
      {/* Phone body */}
      <rect x="55" y="10" width="90" height="160" rx="14" fill="#0f172a" stroke="url(#phoneEdge)" strokeWidth="2.5" />
      <defs>
        <linearGradient id="phoneEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {/* Screen */}
      <rect x="60" y="18" width="80" height="140" rx="8" fill="url(#screenGrad)" opacity="0.95" />
      {/* Notch */}
      <rect x="86" y="20" width="28" height="4" rx="2" fill="#0f172a" />
      {/* App grid */}
      <g>
        {[0,1,2,3].map((row) =>
          [0,1,2].map((col) => (
            <rect key={`${row}-${col}`}
                  x={68 + col * 22}
                  y={36 + row * 26}
                  width="16" height="16" rx="4"
                  fill="#fff" opacity="0.85" />
          ))
        )}
      </g>
      {/* Bottom bar */}
      <rect x="80" y="148" width="40" height="4" rx="2" fill="#fff" opacity="0.6" />
      {/* Side button */}
      <rect x="146" y="40" width="2.5" height="22" rx="1" fill="#22d3ee" />
      <rect x="51.5" y="35" width="2.5" height="14" rx="1" fill="#a855f7" />
      <rect x="51.5" y="55" width="2.5" height="22" rx="1" fill="#a855f7" />

      {/* Caption */}
      <text x="100" y="178" textAnchor="middle" fontSize="7" fontFamily="ui-sans-serif" fontWeight="800" fill="#22d3ee"
            style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-sans-serif" }}>
        {kh ? "ហោប៉ៅ • ០.១៧ គ.ក. • 2026" : "POCKET • 0.17 KG • 2026"}
      </text>
    </svg>
  );
}
