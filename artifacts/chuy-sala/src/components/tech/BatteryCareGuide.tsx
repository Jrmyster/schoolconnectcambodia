import { useState } from "react";
import {
  BatteryCharging, BatteryFull, BatteryLow, Sun, Moon, Wifi, Bluetooth, Bed,
  Flame, Thermometer, AlertTriangle, CheckSquare, Square, Trophy, RotateCcw,
  Droplets, ZapOff, Leaf, Laptop, Lightbulb,
} from "lucide-react";
import type { ComponentType } from "react";
import { useLanguageStore } from "@/store/use-language";

type Tip = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconBad: ComponentType<{ className?: string }>;
  en: string;
  kh: string;
  detailEn: string;
  detailKh: string;
};

const TIPS: Tip[] = [
  {
    id: "brightness",
    icon: Moon, iconBad: Sun,
    en: "Lower screen brightness.",
    kh: "បន្ថយពន្លឺអេក្រង់។",
    detailEn: "The screen is the BIGGEST battery user. Even dropping from 100% to 50% brightness can add 1–2 hours of life.",
    detailKh: "អេក្រង់ប្រើថ្មច្រើនជាងគេ។ សូម្បីតែបន្ថយពី ១០០% ទៅ ៥០% អាចបន្ថែមជីវិតថ្ម ១–២ ម៉ោង។",
  },
  {
    id: "apps",
    icon: ZapOff, iconBad: Laptop,
    en: "Close unused background apps.",
    kh: "បិទកម្មវិធីដែលមិនប្រើ។",
    detailEn: "Each open app keeps the CPU and RAM working — even when you can't see it on the screen.",
    detailKh: "កម្មវិធីនីមួយៗដែលបើក នៅតែធ្វើឱ្យ CPU និង RAM ដំណើរការ — ទោះបីអ្នកមិនឃើញលើអេក្រង់ក៏ដោយ។",
  },
  {
    id: "powersave",
    icon: Leaf, iconBad: Flame,
    en: "Turn on Power-Saving Mode.",
    kh: "ប្រើមុខងារសន្សំសំចៃថាមពល។",
    detailEn: "This setting tells the computer to slow down a bit and dim the screen — saving 20–40% extra battery.",
    detailKh: "ការកំណត់នេះប្រាប់កុំព្យូទ័រឱ្យដំណើរការយឺតបន្តិច និងបន្ថយពន្លឺអេក្រង់ — សន្សំថ្មបន្ថែម ២០–៤០%។",
  },
  {
    id: "radios",
    icon: Bluetooth, iconBad: Wifi,
    en: "Turn off Bluetooth & Wi-Fi when not needed.",
    kh: "បិទ Bluetooth និង Wi-Fi ពេលមិនប្រើ។",
    detailEn: "Wireless radios constantly search for devices and networks — that uses electricity all day.",
    detailKh: "សញ្ញាឥតខ្សែ ស្វែងរកឧបករណ៍ និងបណ្ដាញជានិច្ច — ប្រើអគ្គិសនីពេញមួយថ្ងៃ។",
  },
  {
    id: "surface",
    icon: Laptop, iconBad: Bed,
    en: "Keep the laptop on a hard, flat surface.",
    kh: "ដាក់កុំព្យូទ័រលើផ្ទៃរឹង និងរាបស្មើ ដើម្បីខ្យល់ហូរល្អ។",
    detailEn: "Soft surfaces (beds, pillows, lap) block the air vents under the laptop — heat builds up and the battery suffers.",
    detailKh: "ផ្ទៃទន់ (គ្រែ ខ្នើយ ភ្លៅ) ស្ទះរន្ធខ្យល់ខាងក្រោមកុំព្យូទ័រ — កំដៅកើនឡើង ហើយថ្មរងគ្រោះ។",
  },
];

export function BatteryCareGuide() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [demoLevel, setDemoLevel] = useState(65); // % for the interactive battery slider

  const score = checked.size;
  const allDone = score === TIPS.length;
  const zone = demoLevel < 20 ? "danger" : demoLevel > 80 ? "warn" : "safe";
  const zoneColor = zone === "safe" ? "#16a34a" : zone === "warn" ? "#f59e0b" : "#dc2626";
  const zoneLabel = {
    safe:   { en: "Healthy zone (20–80%)", kh: "តំបន់សុខភាពល្អ (២០–៨០%)" },
    warn:   { en: "Stress zone — too full", kh: "តំបន់តានតឹង — ពេញពេក" },
    danger: { en: "Stress zone — too empty", kh: "តំបន់តានតឹង — ទទេពេក" },
  }[zone];

  function toggle(id: string) {
    setChecked((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  }

  return (
    <div className="rounded-3xl bg-white border-4 border-emerald-500 shadow-2xl overflow-hidden">
      {/* Battery-status header strip: green→yellow→red gradient */}
      <div className="h-2.5" style={{
        background: "linear-gradient(90deg, #16a34a 0%, #16a34a 60%, #f59e0b 75%, #dc2626 100%)",
      }} />
      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-emerald-50 via-white to-amber-50 border-b-2 border-emerald-200">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
            <BatteryCharging className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
          </div>
          <div className="min-w-0 flex-1">
            <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              <BatteryFull className="w-3.5 h-3.5" />
              <span>{kh ? "សុខភាពថ្ម" : "Battery Health"}</span>
              <span className="opacity-50">/</span>
              <span>{kh ? "មគ្គុទ្ទេសក៍" : "Care Guide"}</span>
            </div>
            <h3 className={`font-display text-xl sm:text-2xl font-bold text-stone-900 ${kh ? "font-khmer leading-snug" : ""}`}>
              {kh ? "មគ្គុទ្ទេសក៍ថែទាំថ្ម និងជីវិតថ្ម" : "Battery Life & Care Guide"}
              {kh && <span className="ml-2 text-sm text-stone-500 font-sans font-normal">(Battery Care)</span>}
            </h3>
            <p className={`mt-1 text-sm text-stone-700 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh
                ? "មើលថែថ្មរបស់អ្នក ហើយវានឹងមើលថែការសិក្សារបស់អ្នកអស់រយៈពេលជាច្រើនឆ្នាំ។"
                : "Take care of your battery, and it will take care of your studies for years."}
            </p>
          </div>
        </div>
      </div>

      {/* Section A: The Lithium-Ion Science */}
      <Section
        kicker={kh ? "ផ្នែកទី ១ — វិទ្យាសាស្ត្រ" : "Part 1 — The Science"}
        titleEn="The 'Chemical Sponge' Inside"
        titleKh="«អេប៉ុងគីមី» ខាងក្នុង"
        icon={Droplets}
        kh={kh}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* Sponge analogy */}
          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
            <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              <Droplets className="w-3.5 h-3.5" /> {kh ? "ឧបមា" : "The Analogy"}
            </div>
            {/* Sponge SVG */}
            <SpongeIllustration kh={kh} />
            <p className={`mt-3 text-sm text-stone-800 leading-relaxed ${kh ? "font-khmer leading-loose text-base" : ""}`}>
              <span className="font-extrabold text-emerald-800">{kh ? "ថ្មគឺដូចជាអេប៉ុងគីមី។ " : "A battery is like a chemical sponge. "}</span>
              {kh
                ? "ពេលអ្នកសាក វាស្រូបយកអគ្គិសនី (ដូចជាទឹក)។ ពេលអ្នកប្រើ វារុញអគ្គិសនីចេញ ដើម្បីផ្ដល់ថាមពលដល់កុំព្យូទ័រ។ បិទ-បើកដ៏ច្រើនដង នៅទីបំផុត គ្រាប់អេប៉ុងនឹងពាំងពាក់។"
                : "When you charge it, it soaks up electricity (like water). When you use it, it squeezes that electricity back out to power the computer. Squeeze and soak too many times, and the sponge eventually wears out."}
            </p>
            {kh && <p className="mt-1 text-xs italic text-stone-500">A battery is like a chemical sponge…</p>}
          </div>

          {/* The 20-80 rule */}
          <div className="rounded-2xl border-2 border-emerald-300 bg-white p-4">
            <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              <Lightbulb className="w-3.5 h-3.5" /> {kh ? "ច្បាប់ ២០–៨០" : "The 20–80 Rule"}
            </div>

            {/* Big interactive battery */}
            <BigBatteryGauge level={demoLevel} zone={zone} zoneColor={zoneColor} kh={kh} />

            {/* Zone label */}
            <div className="mt-2 flex items-center justify-between gap-2 text-xs font-bold"
                 style={{ color: zoneColor }}>
              <span className={`${kh ? "font-khmer text-sm" : ""}`}>{kh ? zoneLabel.kh : zoneLabel.en}</span>
              <span className="font-mono">{demoLevel}%</span>
            </div>

            {/* Slider */}
            <input type="range" min={0} max={100} value={demoLevel}
                   onChange={(e) => setDemoLevel(Number(e.target.value))}
                   className="w-full mt-2"
                   style={{ accentColor: zoneColor }}
                   aria-label={kh ? "កម្រិតថ្ម" : "Battery level"} />
            <div className="grid grid-cols-3 text-[10px] font-mono mt-0.5">
              <span className="text-red-600 font-bold">0% {kh ? "ទទេ" : "EMPTY"}</span>
              <span className="text-emerald-700 text-center font-bold">20–80% {kh ? "ល្អបំផុត" : "BEST"}</span>
              <span className="text-amber-600 text-right font-bold">100% {kh ? "ពេញ" : "FULL"}</span>
            </div>

            <p className={`mt-3 text-sm text-stone-800 leading-relaxed ${kh ? "font-khmer leading-loose text-base" : ""}`}>
              <span className="font-extrabold">{kh ? "ហេតុអ្វី? " : "Why? "}</span>
              {kh
                ? "ការទុកថ្មនៅ ១០០% ពេញម៉ោង ឬទុកវាដាច់ដល់ ០% បង្កើតភាពតានតឹងលើសលុបដល់គ្រាប់គីមីខាងក្នុង។ រក្សារវាង ២០% និង ៨០% — ថ្មរបស់អ្នកនឹងរស់នៅបាន ២ ដង យូរជាង។"
                : "Keeping a battery sitting at 100% all the time, or letting it drop to 0%, puts the most stress on the chemistry inside. Stay between 20% and 80% — your battery will last up to 2× longer."}
            </p>
            {kh && <p className="mt-1 text-xs italic text-stone-500">Keeping a battery at 100% all the time, or letting it hit 0%, stresses the chemistry inside…</p>}
          </div>
        </div>
      </Section>

      {/* Section B: Heat warning */}
      <Section
        kicker={kh ? "ផ្នែកទី ២ — ការព្រមាន" : "Part 2 — The Warning"}
        titleEn="Heat is the #1 Enemy"
        titleKh="កំដៅគឺជាសត្រូវលេខ ១"
        icon={Thermometer}
        kh={kh}
        accent="red"
      >
        <div className="rounded-2xl border-4 border-red-500 bg-gradient-to-br from-red-50 via-white to-amber-50 overflow-hidden">
          {/* Black & yellow hazard stripe */}
          <div className="h-2" style={{
            backgroundImage: "repeating-linear-gradient(45deg, #000 0 12px, #facc15 12px 24px)",
          }} />
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg animate-pulse">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-red-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  <AlertTriangle className="w-3 h-3" /> {kh ? "ការព្រមាន" : "Warning"}
                </div>
                <h4 className={`font-display text-lg sm:text-xl font-extrabold text-red-700 leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
                  {kh ? "កំដៅគឺជាសត្រូវលេខ ១ របស់ថ្មអ្នក!" : "Heat is the #1 enemy of your battery!"}
                </h4>
                {kh && <p className="text-xs italic text-stone-500 mt-0.5">Heat is the #1 enemy of your battery!</p>}
              </div>
            </div>

            <p className={`text-sm text-stone-800 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose text-base" : ""}`}>
              {kh
                ? "កំដៅខ្ពស់ធ្វើឱ្យគ្រាប់គីមីខាងក្នុងថ្មបែកធ្លាយលឿន។ ថ្មក្ដៅនៅ ៣៥°C បាត់បង់សុខភាព ២ ដង លឿនជាងថ្មត្រជាក់នៅ ២០°C។"
                : "High temperatures break down the chemistry inside the battery faster. A battery sitting at 35°C loses health 2× faster than one kept cool at 20°C."}
            </p>

            {/* Don't / Do row */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border-2 border-red-400 bg-red-100/50 p-3">
                <div className={`text-[10px] font-mono uppercase tracking-widest text-red-700 font-bold mb-1.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  ✗ {kh ? "កុំធ្វើ" : "DON'T"}
                </div>
                <ul className={`space-y-1.5 text-sm text-stone-800 ${kh ? "font-khmer leading-loose text-base" : ""}`}>
                  <BadItem icon={Bed}     en="Use it on a bed or pillow (blocks the fan)." kh="ប្រើវានៅលើគ្រែ ឬខ្នើយ (ស្ទះកង្ហារ)។" kh_active={kh} />
                  <BadItem icon={Sun}     en="Leave it in direct sunlight."                 kh="ទុកវានៅក្រោមពន្លឺថ្ងៃផ្ទាល់។"          kh_active={kh} />
                  <BadItem icon={Laptop}  en="Use it on your lap for hours."                kh="ប្រើវានៅលើភ្លៅជាច្រើនម៉ោង។"            kh_active={kh} />
                </ul>
              </div>
              <div className="rounded-xl border-2 border-emerald-400 bg-emerald-100/50 p-3">
                <div className={`text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold mb-1.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  ✓ {kh ? "ត្រូវធ្វើ" : "DO"}
                </div>
                <ul className={`space-y-1.5 text-sm text-stone-800 ${kh ? "font-khmer leading-loose text-base" : ""}`}>
                  <GoodItem icon={Laptop} en="Place it on a desk or hard, flat surface."   kh="ដាក់វានៅលើតុ ឬផ្ទៃរឹងរាបស្មើ។"        kh_active={kh} />
                  <GoodItem icon={Leaf}   en="Keep it in a cool, shaded room."             kh="ទុកវានៅក្នុងបន្ទប់ត្រជាក់ និងមានស្រមោល។" kh_active={kh} />
                  <GoodItem icon={ZapOff} en="Let it rest sometimes — don't game for hours straight." kh="ឱ្យវាសម្រាកជួនកាល — កុំលេងហ្គេមជាច្រើនម៉ោងជាប់គ្នា។" kh_active={kh} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section C: Battery saving checklist */}
      <Section
        kicker={kh ? "ផ្នែកទី ៣ — បញ្ជីការងារ" : "Part 3 — Checklist"}
        titleEn="Battery-Saving Checklist"
        titleKh="បញ្ជីសន្សំថាមពលថ្ម"
        icon={CheckSquare}
        kh={kh}
      >
        <div className="rounded-2xl border-2 border-emerald-300 bg-white overflow-hidden">
          {/* Progress bar */}
          <div className="px-4 pt-3 pb-2 bg-stone-50 border-b border-stone-200">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className={`text-stone-700 ${kh ? "font-khmer" : ""}`}>
                {kh ? "ការវឌ្ឍនភាព" : "Progress"}
              </span>
              <span className="text-emerald-700 font-mono">{score} / {TIPS.length}</span>
            </div>
            <div className="h-3 rounded-full bg-stone-200 overflow-hidden border border-stone-300">
              <div className="h-full rounded-full transition-all duration-500"
                   style={{
                     width: `${(score / TIPS.length) * 100}%`,
                     background: score === TIPS.length
                       ? "linear-gradient(90deg, #16a34a, #22c55e)"
                       : score >= 3
                         ? "linear-gradient(90deg, #16a34a, #84cc16)"
                         : score >= 1
                           ? "linear-gradient(90deg, #f59e0b, #facc15)"
                           : "#dc2626",
                   }} />
            </div>
          </div>

          {/* Checkbox list */}
          <ul>
            {TIPS.map((t, i) => {
              const isChecked = checked.has(t.id);
              const Icon = isChecked ? t.icon : t.iconBad;
              return (
                <li key={t.id} className={`border-b border-stone-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-stone-50/40"}`}>
                  <button
                    onClick={() => toggle(t.id)}
                    aria-pressed={isChecked}
                    className="w-full text-left p-3 sm:p-4 flex items-start gap-3 hover:bg-emerald-50/60 transition active:scale-[0.99]"
                  >
                    {/* Checkbox visual */}
                    <span className={`flex-shrink-0 w-7 h-7 rounded-md border-2 flex items-center justify-center transition ${
                      isChecked
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                        : "bg-white border-stone-300 text-transparent"
                    }`}>
                      {isChecked
                        ? <CheckSquare className="w-5 h-5" />
                        : <Square className="w-5 h-5 text-stone-300" />}
                    </span>
                    {/* Icon */}
                    <span className={`flex-shrink-0 w-9 h-9 rounded-lg border-2 flex items-center justify-center ${
                      isChecked
                        ? "bg-emerald-100 border-emerald-400 text-emerald-700"
                        : "bg-amber-50 border-amber-300 text-amber-700"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm sm:text-base font-bold leading-snug ${
                        isChecked ? "text-emerald-900" : "text-stone-900"
                      } ${kh ? "font-khmer leading-snug text-base sm:text-lg" : ""}`}>
                        {kh ? t.kh : t.en}
                      </div>
                      {kh && (
                        <div className="text-[11px] italic text-stone-500 mt-0.5 leading-tight">{t.en}</div>
                      )}
                      <div className={`mt-1 text-xs text-stone-600 leading-relaxed ${kh ? "font-khmer leading-loose text-sm" : ""}`}>
                        {kh ? t.detailKh : t.detailEn}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Footer / score banner */}
          <div className={`p-4 border-t-2 ${
            allDone
              ? "bg-gradient-to-r from-emerald-100 to-emerald-50 border-emerald-400"
              : score >= 3
                ? "bg-gradient-to-r from-lime-100 to-amber-50 border-amber-400"
                : "bg-stone-50 border-stone-200"
          }`}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              {allDone ? (
                <div className={`flex items-center gap-2 text-emerald-800 font-bold ${kh ? "font-khmer leading-loose" : ""}`}>
                  <Trophy className="w-5 h-5" />
                  <span className="text-sm sm:text-base">
                    {kh ? "ល្អឥតខ្ចោះ! អ្នកជាអ្នកថែទាំថ្មពិតប្រាកដ។" : "Perfect! You're a real battery champion."}
                  </span>
                </div>
              ) : score >= 3 ? (
                <div className={`flex items-center gap-2 text-amber-800 font-bold ${kh ? "font-khmer leading-loose" : ""}`}>
                  <BatteryFull className="w-5 h-5" />
                  <span className="text-sm sm:text-base">
                    {kh ? `ល្អណាស់! នៅ ${TIPS.length - score} ទៀត ដើម្បីសម្រេច។` : `Nice work! ${TIPS.length - score} more to go.`}
                  </span>
                </div>
              ) : (
                <div className={`flex items-center gap-2 text-stone-700 ${kh ? "font-khmer leading-loose" : ""}`}>
                  <BatteryLow className="w-5 h-5 text-red-600" />
                  <span className="text-sm sm:text-base">
                    {kh ? "ធីកអ្វីដែលអ្នកនឹងសាកល្បងថ្ងៃនេះ។" : "Tick off what you'll try today."}
                  </span>
                </div>
              )}
              {score > 0 && (
                <button onClick={() => setChecked(new Set())}
                  className={`inline-flex items-center gap-1 text-xs text-stone-500 hover:text-emerald-700 ${kh ? "font-khmer" : ""}`}>
                  <RotateCcw className="w-3 h-3" /> {kh ? "កំណត់ឡើងវិញ" : "Reset"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function Section({
  kicker, titleEn, titleKh, icon: Icon, kh, accent = "emerald", children,
}: {
  kicker: string; titleEn: string; titleKh: string;
  icon: ComponentType<{ className?: string }>;
  kh: boolean; accent?: "emerald" | "red"; children: React.ReactNode;
}) {
  const a = accent === "red"
    ? { text: "text-red-700",     bg: "bg-red-50/50",     border: "border-red-200",     iconBg: "bg-red-100 border-red-300 text-red-700" }
    : { text: "text-emerald-700", bg: "bg-emerald-50/30", border: "border-emerald-200", iconBg: "bg-emerald-100 border-emerald-300 text-emerald-700" };
  return (
    <div className={`p-5 sm:p-6 ${a.bg} border-b-2 ${a.border} last:border-b-0`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${a.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className={`text-[10px] font-mono uppercase tracking-[0.25em] ${a.text} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kicker}
          </div>
          <h4 className={`font-display text-lg sm:text-xl font-bold text-stone-900 leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
            {kh ? titleKh : titleEn}
            {kh && <span className="ml-2 text-sm text-stone-500 font-sans font-normal">({titleEn})</span>}
          </h4>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function BigBatteryGauge({ level, zone, zoneColor, kh }: { level: number; zone: "safe" | "warn" | "danger"; zoneColor: string; kh: boolean }) {
  const fillW = (level / 100) * 220; // body inner is 220 wide
  return (
    <svg viewBox="0 0 260 90" className="block w-full h-auto" role="img" aria-label="Battery charge level">
      <style>{`
        @keyframes pwr-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
        .pwr-pulse { animation: pwr-pulse 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pwr-pulse { animation: none; } }
      `}</style>
      {/* Battery body */}
      <rect x="10" y="15" width="230" height="60" rx="8" fill="#fff" stroke="#0f172a" strokeWidth="2.5" />
      {/* Battery cap */}
      <rect x="240" y="32" width="10" height="26" rx="2" fill="#0f172a" />

      {/* Background zone bands inside (subtle) */}
      <g opacity="0.13">
        <rect x="15"  y="20" width="44"  height="50" fill="#dc2626" />
        <rect x="59"  y="20" width="132" height="50" fill="#16a34a" />
        <rect x="191" y="20" width="44"  height="50" fill="#f59e0b" />
      </g>

      {/* Fill */}
      <rect x="15" y="20" width={fillW} height="50" rx="3"
            fill={zoneColor} className={zone !== "safe" ? "pwr-pulse" : ""} />

      {/* Zone divider lines */}
      <line x1="59"  y1="14" x2="59"  y2="76" stroke="#0f172a" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.55" />
      <line x1="191" y1="14" x2="191" y2="76" stroke="#0f172a" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.55" />

      {/* Tick labels */}
      <text x="59"  y="11" textAnchor="middle" fontSize="9" fontWeight="800" fill="#dc2626" fontFamily="ui-monospace">20%</text>
      <text x="191" y="11" textAnchor="middle" fontSize="9" fontWeight="800" fill="#f59e0b" fontFamily="ui-monospace">80%</text>

      {/* Level text inside */}
      <text x="125" y="52" textAnchor="middle" fontSize="22" fontWeight="900"
            fill={level > 45 ? "#fff" : "#0f172a"} fontFamily="ui-monospace">
        {level}%
      </text>

      {/* Healthy band caption */}
      <text x="125" y="86" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a" fontFamily="ui-monospace"
            style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
        {kh ? "← តំបន់សុខភាពល្អ →" : "← HEALTHY ZONE →"}
      </text>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────── */

function SpongeIllustration({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 240 100" className="block w-full h-auto" role="img" aria-label="Battery as sponge analogy">
      {/* Sponge */}
      <rect x="20" y="30" width="100" height="55" rx="6" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
      {/* Holes in sponge */}
      {[[40,45],[60,52],[82,42],[100,55],[48,72],[70,68],[95,75]].map(([cx,cy],i) =>
        <circle key={i} cx={cx} cy={cy} r="4" fill="#b45309" opacity="0.45" />
      )}
      {/* Water drops above */}
      {[35, 55, 75, 95].map((x, i) => (
        <g key={i}>
          <path d={`M ${x} 8 Q ${x - 4} 16 ${x} 22 Q ${x + 4} 16 ${x} 8 Z`}
                fill="#3b82f6" opacity={0.85} />
        </g>
      ))}
      {/* Arrow */}
      <g>
        <line x1="135" y1="55" x2="180" y2="55" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="180,55 174,51 174,59" fill="#16a34a" />
      </g>
      {/* Battery on the right */}
      <rect x="185" y="35" width="45" height="40" rx="4" fill="#fff" stroke="#16a34a" strokeWidth="2" />
      <rect x="230" y="44" width="6" height="22" rx="1.5" fill="#16a34a" />
      <rect x="188" y="38" width="32" height="34" rx="2" fill="#16a34a" opacity="0.85" />
      <text x="207" y="92" textAnchor="middle" fontSize="9" fontWeight="800" fill="#16a34a" fontFamily="ui-monospace"
            style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
        {kh ? "ថ្ម" : "BATTERY"}
      </text>
      <text x="70" y="98" textAnchor="middle" fontSize="9" fontWeight="800" fill="#b45309" fontFamily="ui-monospace"
            style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-monospace" }}>
        {kh ? "អេប៉ុង = ស្រូបអគ្គិសនី" : "SPONGE = soaks electricity"}
      </text>
    </svg>
  );
}

function BadItem({ icon: Icon, en, kh, kh_active }: { icon: ComponentType<{ className?: string }>; en: string; kh: string; kh_active: boolean }) {
  return (
    <li className="flex items-start gap-2">
      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
      <div>
        <span className={kh_active ? "font-khmer text-base" : ""}>{kh_active ? kh : en}</span>
        {kh_active && <div className="text-[11px] italic text-stone-500 leading-tight">{en}</div>}
      </div>
    </li>
  );
}
function GoodItem({ icon: Icon, en, kh, kh_active }: { icon: ComponentType<{ className?: string }>; en: string; kh: string; kh_active: boolean }) {
  return (
    <li className="flex items-start gap-2">
      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
      <div>
        <span className={kh_active ? "font-khmer text-base" : ""}>{kh_active ? kh : en}</span>
        {kh_active && <div className="text-[11px] italic text-stone-500 leading-tight">{en}</div>}
      </div>
    </li>
  );
}
