import {
  Snowflake, Hourglass, Lightbulb, Waves, Power, Moon, Star,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

const aria = (en: string, kh: string, lang: Lang) => (lang === "kh" ? kh : en);

function PanelHeader({
  icon, en, kh, lang, descEn, descKh,
}: {
  icon: React.ReactNode; en: string; kh: string; lang: Lang;
  descEn: string; descKh: string;
}) {
  const isKh = lang === "kh";
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-lg bg-slate-300/10 border border-slate-300/30 flex items-center justify-center text-slate-200">
          {icon}
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h3>
      </div>
      <p className={`text-white/70 text-sm leading-relaxed ml-[42px] ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? descKh : descEn}
      </p>
    </div>
  );
}

// ── 1. The Law of Entropy ────────────────────────────────────────────────

function EntropyPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";
  return (
    <div className="rounded-3xl border border-slate-300/15 bg-gradient-to-br from-[#10172a]/80 to-[#020617]/90 p-5 sm:p-7">
      <PanelHeader
        icon={<Waves className="w-4 h-4" />}
        en="The Law of Entropy"
        kh="ច្បាប់នៃអង់ត្រូពី"
        lang={lang}
        descEn="Entropy is a simple but absolute law of nature: things naturally move from order to disorder. A new house slowly falls apart. A hot cup of tea cools down to match the room. A drop of ink spreads through a glass of water until it is evenly grey — and never gathers itself back into a drop. The universe as a whole is doing the exact same thing with all of its energy."
        descKh="អង់ត្រូពី ជាច្បាប់ដ៏សាមញ្ញ ប៉ុន្តែដាច់ខាត នៃធម្មជាតិ៖ វត្ថុនានា ផ្លាស់ប្តូរដោយធម្មជាតិ ពីសណ្តាប់ធ្នាប់ ទៅភាពច្របូកច្របល់។ ផ្ទះថ្មីមួយ ដួលរលំបន្តិចម្តងៗ។ ពែងតែក្តៅមួយ ត្រជាក់ចុះ ឱ្យស្មើនឹងសីតុណ្ហភាពបន្ទប់។ ដំណក់ទឹកថ្នាំមួយ រាលដាលក្នុងកែវទឹក រហូតវាក្លាយជាពណ៌ប្រផេះស្មើគ្នា — ហើយមិនដែលប្រមូលគ្នាមកធ្វើ ជាដំណក់វិញឡើយ។ សកលលោកទាំងមូល ធ្វើរឿងដូចគ្នាបេះបិទ ជាមួយថាមពលរបស់ខ្លួន។"
      />

      {/* Sandcastle metaphor */}
      <div className="rounded-2xl border border-slate-300/20 bg-black/50 p-5" data-testid="sandcastle-metaphor">
        <h4 className={`text-sm font-bold text-slate-100 mb-3 text-center ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ប្រាសាទខ្សាច់ — រូបតំណាងអង់ត្រូពី" : "The sandcastle — entropy in everyday life"}
        </h4>

        <svg viewBox="0 0 600 160" className="w-full h-auto mb-3" aria-label={aria("A sandcastle on the left, scattered sand on the right, separated by an arrow showing the passage of time", "ប្រាសាទខ្សាច់ខាងឆ្វេង ខ្សាច់ដែលបានរាលដាលនៅខាងស្តាំ ដោយសញ្ញាព្រួញ បង្ហាញពេលវេលា", lang)}>
          <defs>
            <linearGradient id="hd-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#1e293b" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="hd-sand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>

          {/* Left scene — sandcastle (ordered) */}
          <rect x="0" y="0" width="280" height="160" fill="url(#hd-sky)" />
          <rect x="0" y="120" width="280" height="40" fill="url(#hd-sand)" />
          {/* Castle */}
          <rect x="80" y="70"  width="120" height="50" fill="#fbbf24" stroke="#78350f" strokeWidth="0.6" />
          <rect x="70" y="50"  width="20" height="70" fill="#fcd34d" stroke="#78350f" strokeWidth="0.6" />
          <rect x="190" y="50" width="20" height="70" fill="#fcd34d" stroke="#78350f" strokeWidth="0.6" />
          <rect x="130" y="40" width="20" height="80" fill="#fcd34d" stroke="#78350f" strokeWidth="0.6" />
          <polygon points="70,50 80,38 90,50" fill="#a16207" />
          <polygon points="130,40 140,28 150,40" fill="#a16207" />
          <polygon points="190,50 200,38 210,50" fill="#a16207" />
          {/* Door */}
          <rect x="135" y="90" width="10" height="30" fill="#451a03" />

          <text x="140" y="150" textAnchor="middle" fontSize="11" fill="#fde68a" fontWeight="700">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "សណ្តាប់ធ្នាប់ — អង់ត្រូពីទាប" : "ORDER — low entropy"}</tspan>
          </text>

          {/* Arrow with time */}
          <g stroke="#94a3b8" strokeWidth="1.5" fill="#94a3b8">
            <line x1="290" y1="80" x2="320" y2="80" />
            <polygon points="320,80 313,76 313,84" />
          </g>
          <text x="305" y="65" textAnchor="middle" fontSize="9" fill="#cbd5e1" fontStyle="italic">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ពេលវេលា" : "time"}</tspan>
          </text>

          {/* Right scene — flat sand (disordered) */}
          <rect x="320" y="0" width="280" height="160" fill="url(#hd-sky)" />
          {/* Slight rolling beach */}
          <path d="M 320 130 Q 380 122 440 128 T 600 124 L 600 160 L 320 160 Z" fill="url(#hd-sand)" />
          {/* Scattered sand grains */}
          {[[360,125],[400,128],[450,124],[490,127],[540,125],[580,123],[420,135],[470,138],[520,135],[560,138]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1.5" fill="#fbbf24" opacity="0.8" />
          ))}

          <text x="460" y="150" textAnchor="middle" fontSize="11" fill="#fde68a" fontWeight="700">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ច្របូកច្របល់ — អង់ត្រូពីខ្ពស់" : "DISORDER — high entropy"}</tspan>
          </text>
        </svg>

        <p className={`text-xs text-white/75 leading-relaxed text-center italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
          {isKh
            ? "ខ្យល់ និងរលក នឹងបំផ្លាញប្រាសាទខ្សាច់ ឱ្យត្រឡប់ទៅជាខ្សាច់រាបស្មើ — ហើយវានឹងមិនដែលបង្កើតខ្លួនវាឡើងវិញឡើយ"
            : "Wind and waves will scatter the castle back into flat sand — and the sand will never rebuild itself."}
        </p>
      </div>
    </div>
  );
}

// ── 2. Fate of the Stars ─────────────────────────────────────────────────

function FateOfStarsPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";
  return (
    <div className="rounded-3xl border border-slate-300/15 bg-gradient-to-br from-[#0b1326]/85 to-[#020617]/95 p-5 sm:p-7">
      <PanelHeader
        icon={<Star className="w-4 h-4" />}
        en="The Fate of the Stars"
        kh="ជោគវាសនារបស់ផ្កាយ"
        lang={lang}
        descEn="The universe has a finite amount of fuel. Every star, no matter how big, will eventually burn through its hydrogen — exploding as a supernova or quietly fading into a dead white dwarf. And once the giant gas clouds between the stars are used up, no new stars can ever be born to replace them. Galaxy by galaxy, star by star, the lights of the universe will switch off — until the cosmos is fully dark."
        descKh="សកលលោក មានឥន្ធនៈចំនួនកំណត់។ ផ្កាយគ្រប់ ទោះធំប៉ុណ្ណា នឹងដុតហ្ស៊ីដ្រូសែនរបស់វា អស់ទៅៗ — ផ្ទុះជាស៊ូពើណូវ៉ា ឬរសាយស្ងាត់ៗ ទៅជាផ្កាយតូចសស្លាប់។ ហើយនៅពេលពពកឧស្ម័នយក្ស រវាងផ្កាយ ត្រូវបានប្រើអស់ គ្មានផ្កាយថ្មី អាចកើតមកជំនួសវាបានទេ។ ហ្គាឡាក់ស៊ីម្តងៗ ផ្កាយម្តងៗ ពន្លឺនៃសកលលោកនឹងបិទ — រហូតចក្រវាឡ ងងឹតទាំងស្រុង។"
      />

      <div className="rounded-2xl border border-slate-300/20 bg-black/55 p-5" data-testid="lights-off">
        <h4 className={`text-sm font-bold text-slate-100 mb-4 text-center ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ពន្លឺទាំងអស់ បិទម្តងមួយៗ" : "The lights, switched off one by one"}
        </h4>

        <div className="grid grid-cols-4 gap-3 mb-4" aria-hidden>
          {[
            { lit: 4, label: { en: "Today", kh: "ថ្ងៃនេះ" } },
            { lit: 3, label: { en: "+1B yrs", kh: "+១ ប៊ី ឆ្នាំ" } },
            { lit: 1, label: { en: "+100B yrs", kh: "+១០០ ប៊ី ឆ្នាំ" } },
            { lit: 0, label: { en: "+1T yrs", kh: "+១ ទ្រី ឆ្នាំ" } },
          ].map((stage, idx) => (
            <div key={idx} className="rounded-lg border border-slate-700/60 bg-slate-950/80 p-3 text-center">
              <div className="grid grid-cols-2 gap-1 mb-2">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-3 h-3 mx-auto rounded-full"
                    style={{
                      background: i < stage.lit ? "#fde68a" : "#1e293b",
                      boxShadow: i < stage.lit ? "0 0 6px #fbbf24" : "none",
                      opacity: i < stage.lit ? 1 : 0.4,
                    }}
                  />
                ))}
              </div>
              <div className={`text-[10px] text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? stage.label.kh : stage.label.en}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-md bg-orange-500/10 border border-orange-300/20 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-base">💥</span>
              <span className={`text-[11px] font-bold text-orange-200 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ផ្ទុះជាស៊ូពើណូវ៉ា" : "Explode as supernova"}</span>
            </div>
            <p className={`text-[10px] text-white/65 ${isKh ? "font-khmer leading-snug" : ""}`}>
              {isKh ? "ផ្កាយយក្ស ៨× ព្រះអាទិត្យ +" : "Massive stars (8× Sun +)"}
            </p>
          </div>
          <div className="rounded-md bg-slate-500/10 border border-slate-300/20 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-base">⚪</span>
              <span className={`text-[11px] font-bold text-slate-200 ${isKh ? "font-khmer" : ""}`}>{isKh ? "រសាយ ទៅជាផ្កាយតូចស" : "Fade to white dwarf"}</span>
            </div>
            <p className={`text-[10px] text-white/65 ${isKh ? "font-khmer leading-snug" : ""}`}>
              {isKh ? "ផ្កាយមធ្យម ដូចព្រះអាទិត្យ" : "Average stars like our Sun"}
            </p>
          </div>
          <div className="rounded-md bg-slate-600/10 border border-slate-400/20 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Power className="w-3 h-3 text-slate-300" />
              <span className={`text-[11px] font-bold text-slate-200 ${isKh ? "font-khmer" : ""}`}>{isKh ? "គ្មានផ្កាយថ្មី" : "No new stars"}</span>
            </div>
            <p className={`text-[10px] text-white/65 ${isKh ? "font-khmer leading-snug" : ""}`}>
              {isKh ? "ឧស្ម័នអស់ — គ្មានឥន្ធនៈ" : "Gas runs out — no fuel left"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. The Big Freeze ────────────────────────────────────────────────────

function BigFreezePanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-slate-300/15 bg-gradient-to-br from-[#060d1f]/90 to-[#000]/95 p-5 sm:p-7">
      <PanelHeader
        icon={<Snowflake className="w-4 h-4" />}
        en="The Big Freeze"
        kh="ការកកស្កាត់ធំ"
        lang={lang}
        descEn="A common misconception: 'Heat Death' does not mean the universe burns up. It means the death OF heat. Right now, the universe is full of differences — hot stars next to cold space, fast atoms next to slow ones. These differences are what allow heat to flow, machines to work, and life to exist. But as the universe expands and energy spreads out perfectly evenly, those differences disappear. Eventually everything reaches the exact same icy temperature — and nothing can ever happen again."
        descKh="ការយល់ច្រឡំទូទៅ៖ « មរណៈភាពដោយកម្តៅ » មិនមានន័យថា ចក្រវាឡឆេះអស់ទេ។ វាមានន័យថា មរណៈភាពនៃកម្តៅ។ ពេលនេះ ចក្រវាឡពោរពេញដោយភាពខុសគ្នា — ផ្កាយក្តៅ នៅជាប់នឹងលំហត្រជាក់ អាតូមលឿន នៅជាប់នឹងអាតូមយឺត។ ភាពខុសគ្នាទាំងនេះ ជាអ្វីដែលអនុញ្ញាតឱ្យកម្តៅហូរ ម៉ាស៊ីនដំណើរការ និងជីវិតមាន។ ប៉ុន្តែនៅពេលចក្រវាឡរីកធំ ហើយថាមពលរាលដាលស្មើគ្នា ភាពខុសគ្នាទាំងនោះបាត់ទៅ។ ទីបំផុត គ្រប់របស់ឈានដល់សីតុណ្ហភាពទឹកកក ដូចគ្នាបេះបិទ — ហើយគ្មានអ្វី អាចកើតឡើងបានទៀតទេ។"
      />

      <div className="rounded-2xl border border-slate-300/20 bg-black/65 p-5" data-testid="big-freeze">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className={`text-sm font-bold text-orange-200 mb-3 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ឥឡូវនេះ — មានភាពខុសគ្នា" : "Now — differences exist"}
            </h4>
            <svg viewBox="0 0 200 100" className="w-full h-auto mb-2" aria-label={aria("Hot region next to a cold region — heat can flow", "តំបន់ក្តៅជាប់នឹងតំបន់ត្រជាក់ — កម្តៅអាចហូរ", lang)}>
              <defs>
                <linearGradient id="bf-hot" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"  stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
                <linearGradient id="bf-cold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"  stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>
              <rect x="0"   y="0" width="100" height="100" fill="url(#bf-hot)" />
              <rect x="100" y="0" width="100" height="100" fill="url(#bf-cold)" />
              {/* Heat-flow arrows */}
              <g stroke="#fde68a" strokeWidth="1" fill="#fde68a">
                <line x1="80"  y1="30" x2="120" y2="30" />
                <polygon points="120,30 113,27 113,33" />
                <line x1="80"  y1="50" x2="120" y2="50" />
                <polygon points="120,50 113,47 113,53" />
                <line x1="80"  y1="70" x2="120" y2="70" />
                <polygon points="120,70 113,67 113,73" />
              </g>
              <text x="50"  y="55" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">HOT</text>
              <text x="150" y="55" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">COLD</text>
            </svg>
            <p className={`text-[11px] text-white/70 text-center italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
              {isKh ? "កម្តៅហូរ — ម៉ាស៊ីនដំណើរការ — ជីវិតមាន" : "Heat flows — engines work — life happens"}
            </p>
          </div>

          <div>
            <h4 className={`text-sm font-bold text-cyan-200 mb-3 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "បន្ទាប់ពីមរណៈភាពកម្តៅ — ស្មើគ្នា" : "After heat death — perfectly even"}
            </h4>
            <svg viewBox="0 0 200 100" className="w-full h-auto mb-2" aria-label={aria("All space is the same icy temperature — nothing can flow", "លំហទាំងមូល មានសីតុណ្ហភាពទឹកកក ដូចគ្នា — គ្មានអ្វី អាចហូរបាន", lang)}>
              <rect x="0" y="0" width="200" height="100" fill="#0c1628" />
              {/* Faint specks of energy, evenly spread */}
              {Array.from({ length: 40 }).map((_, i) => {
                const x = (i * 53) % 200;
                const y = (i * 31) % 100;
                return <circle key={i} cx={x} cy={y} r="0.6" fill="#94a3b8" opacity="0.35" />;
              })}
              <text x="100" y="55" textAnchor="middle" fontSize="10" fill="#94a3b8" fontWeight="700">≈ 0 K</text>
            </svg>
            <p className={`text-[11px] text-white/70 text-center italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
              {isKh ? "គ្មានកម្តៅហូរ — គ្មានដំណើរការ — គ្មានអ្វី" : "No heat flow — no processes — nothing"}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-md bg-cyan-500/10 border border-cyan-300/20 p-3 flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-cyan-300 flex-shrink-0 mt-0.5" />
          <p className={`text-xs text-cyan-100/85 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            <span className="font-bold">{isKh ? "មិនមែនការឆេះ — ការត្រជាក់ : " : "Not burning — freezing: "}</span>
            {isKh
              ? "ឈ្មោះ « មរណៈភាពដោយកម្តៅ » សំដៅលើមរណៈភាព នៃកម្តៅ — ចុងបញ្ចប់ដ៏ងងឹត ត្រជាក់ និងស្ងាត់ទាំងស្រុង"
              : "“Heat death” is the death OF heat — a final state that is dark, freezing, and perfectly silent."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 4. The Unfathomable Timeline ─────────────────────────────────────────

function TimelinePanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  const stages = [
    { en: "Today", kh: "ថ្ងៃនេះ", years: "13.8 × 10⁹", note: { en: "stars are still being born", kh: "ផ្កាយនៅតែកើត" } },
    { en: "Star Era ends", kh: "យុគផ្កាយ បញ្ចប់", years: "10¹⁴", note: { en: "last stars fade", kh: "ផ្កាយចុងក្រោយ រសាយ" } },
    { en: "Black Hole Era", kh: "យុគប្រហោងខ្មៅ", years: "10⁴⁰", note: { en: "only black holes left", kh: "មានតែប្រហោងខ្មៅសល់" } },
    { en: "Black holes evaporate", kh: "ប្រហោងខ្មៅ រសាយអស់", years: "10¹⁰⁰", note: { en: "even they fade away", kh: "សូម្បីតែវា ក៏រសាយបាត់" } },
  ];

  return (
    <div className="rounded-3xl border border-slate-300/15 bg-gradient-to-br from-[#02050d]/95 to-[#000]/100 p-5 sm:p-7">
      <PanelHeader
        icon={<Hourglass className="w-4 h-4" />}
        en="The Unfathomable Timeline"
        kh="ពេលវេលាដ៏វែងអន្លាយ"
        lang={lang}
        descEn="Don't worry — this will not happen anytime soon. The Sun will not burn out for another five billion years. The last bright stars will keep shining for around 100 trillion years. Only after the last black holes have slowly evaporated, around 10¹⁰⁰ years from now — a number called a 'googol' — will the universe reach its final, cold, silent state. A googol is the number 1 with one hundred zeros after it. It is so vast that it dwarfs the current age of the universe by a factor that itself dwarfs everything we can imagine."
        descKh="មិនបាច់បារម្ភទេ — រឿងនេះនឹងមិនកើតមកពេលឆាប់ៗនេះទេ។ ព្រះអាទិត្យ នឹងមិនរលត់ ទាល់តែ ៥ ប៊ីលានឆ្នាំទៀតទេ។ ផ្កាយភ្លឺចុងក្រោយ នឹងបន្តភ្លឺ ប្រហែល ១០០ ទ្រីលានឆ្នាំ។ មានតែបន្ទាប់ពី ប្រហោងខ្មៅចុងក្រោយ បានរសាយអស់ ប្រហែល ១០¹⁰⁰ ឆ្នាំពីពេលនេះ — តួលេខហៅថា « ហ្គូហ្គោល » — ទើបចក្រវាឡឈានដល់ស្ថានភាពចុងក្រោយ ដ៏ត្រជាក់ និងស្ងាត់របស់វា។ ហ្គូហ្គោល ជាលេខ ១ ដែលមានសូន្យ ១០០ នៅពីក្រោយ។ វាធំខ្លាំងណាស់ វាធំជាងអាយុបច្ចុប្បន្ននៃចក្រវាឡ ច្រើនដងជាងអ្វីៗដែលយើង អាចស្រមៃបាន។"
      />

      <div className="rounded-2xl border border-slate-300/20 bg-black/70 p-5 mb-5" data-testid="timeline">
        <div className="space-y-3">
          {stages.map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_2fr] gap-3 items-center">
              <div className="text-right">
                <div className={`text-xs font-bold text-white ${isKh ? "font-khmer" : ""}`}>{isKh ? s.kh : s.en}</div>
                <div className={`text-[10px] text-slate-400 ${isKh ? "font-khmer leading-snug" : ""}`}>
                  {isKh ? s.note.kh : s.note.en}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                {i < stages.length - 1 && <span className="block w-6 h-px bg-slate-700" />}
              </div>
              <div>
                <div className="text-sm font-mono font-bold text-amber-200">
                  {s.years} <span className={`text-[10px] text-slate-400 font-sans ${isKh ? "font-khmer" : ""}`}>{isKh ? "ឆ្នាំ" : "years"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Googol callout */}
      <div className="rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-950/30 to-black p-5" data-testid="googol-callout">
        <div className="text-center">
          <div className={`text-xs font-bold text-amber-300 mb-2 tracking-widest uppercase ${isKh ? "font-khmer tracking-normal" : ""}`}>
            {isKh ? "ហ្គូហ្គោល — តួលេខ ១០¹⁰⁰" : "A googol — the number 10¹⁰⁰"}
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] text-amber-100/90 leading-relaxed break-all px-2">
            10000000000000000000000000000000000000000000000000
            <br />
            00000000000000000000000000000000000000000000000000
          </div>
          <p className={`mt-3 text-[11px] text-amber-100/70 italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
            {isKh
              ? "លេខ ១ ដែលមានសូន្យ ១០០ នៅពីក្រោយ"
              : "the digit 1 followed by one hundred zeros"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main wrapper — vertical fade from dim starlight to absolute black ────

export function HeatDeathModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="heat-death-module"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-slate-300/10 border border-slate-300/30 flex items-center justify-center text-slate-200">
            <Moon className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-slate-200 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("The Heat Death: The End of the Universe", "មរណៈភាពដោយកម្ដៅ៖ ចុងបញ្ចប់នៃចក្រវាឡ")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-slate-300/30 to-transparent" />
      </div>

      {/* Outer wrapper applies the vertical fade-to-black gradient */}
      <div
        className="rounded-3xl border border-slate-300/20 p-1"
        style={{
          background: "linear-gradient(180deg,#1e293b 0%,#0b1326 25%,#04060d 60%,#000 100%)",
        }}
      >
        {/* Hero card — dim starlight */}
        <div
          className="rounded-[20px] border border-slate-300/15 p-6 sm:p-8 mb-2 relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(148,163,184,0.18) 0%, rgba(15,23,42,0.65) 45%, rgba(0,0,0,0.95) 100%)",
            boxShadow: "0 0 30px rgba(148,163,184,0.1) inset",
          }}
        >
          {/* Faint star field */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-50">
              {Array.from({ length: 70 }).map((_, i) => {
                const x = (i * 47) % 400;
                const y = (i * 29) % 200;
                const r = (i % 3) * 0.3 + 0.3;
                const o = 0.15 + (i % 5) * 0.1;
                return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={o} />;
              })}
            </svg>
          </div>

          <div className="relative">
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#e2e8f0 0%,#94a3b8 60%,#475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("The Last Whisper of the Cosmos", "ការខ្សឹបចុងក្រោយ នៃចក្រវាឡ")}
            </h2>
            <p className={`text-white/80 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Everything that exists — every star, every planet, every thought — is borrowing energy from a universe that is slowly running down. Trillions upon trillions of years from now, the last light will fade and the cosmos will settle into a perfect, freezing, silent dark. Not with a bang — but with a long, gentle yawn into nothing.",
                "អ្វីៗគ្រប់យ៉ាងដែលមាន — ផ្កាយគ្រប់ ភពគ្រប់ គំនិតគ្រប់ — កំពុងខ្ចីថាមពល ពីចក្រវាឡដែលកំពុងអស់បន្តិចម្តងៗ។ ទ្រីលានដងនៃទ្រីលានឆ្នាំ ពីពេលនេះ ពន្លឺចុងក្រោយ នឹងរសាយ ហើយចក្រវាឡនឹងស្ងប់ ក្នុងភាពងងឹត ដ៏ល្អឥតខ្ចោះ ត្រជាក់ និងស្ងាត់។ មិនមែនជាមួយការផ្ទុះ — តែជាមួយការដកដង្ហើមវែងៗ ស្មូនទៅភាពគ្មានអ្វី។",
              )}
            </p>
          </div>
        </div>

        <div className="px-1">
          <div className="mb-2"><EntropyPanel lang={lang} /></div>
          <div className="mb-2"><FateOfStarsPanel lang={lang} /></div>
          <div className="mb-2"><BigFreezePanel lang={lang} /></div>
          <TimelinePanel lang={lang} />
        </div>

        {/* Bottom: pure black "void" */}
        <div className="mt-2 rounded-[20px] bg-black p-6 text-center">
          <p className={`text-slate-500 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
            {t(
              "The universe will not end with fire. It will end with quiet — a dark, even nothing, in which time itself has nothing left to do.",
              "ចក្រវាឡនឹងមិនបញ្ចប់ដោយភ្លើងទេ។ វានឹងបញ្ចប់ដោយភាពស្ងាត់ — ភាពងងឹតស្មើគ្នា ដែលពេលវេលាខ្លួនឯង គ្មានអ្វីត្រូវធ្វើទៀតទេ។",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
