import { useState } from "react";
import {
  Rocket, Zap, Microscope, Camera, Battery, Timer, Radio, Umbrella,
  Wrench, Globe2, Bot,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

// ── Header used by each panel ───────────────────────────────────────────────

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
        <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-400/40 flex items-center justify-center text-orange-300">
          {icon}
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h3>
      </div>
      <p className={`text-white/65 text-sm leading-relaxed ml-[42px] ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? descKh : descEn}
      </p>
    </div>
  );
}

// ── Rover data ──────────────────────────────────────────────────────────────

type Rover = {
  id: string;
  nameEn: string;
  nameKh: string;
  year: number;
  sizeEn: string;
  sizeKh: string;
  /** Relative footprint width in pixels for the size-comparison silhouette. */
  scale: number;
  /** Hardware traits — kept independent of render scale so silhouettes stay correct at any size. */
  hasSolarPanels: boolean;
  hasRTG: boolean;
  taglineEn: string;
  taglineKh: string;
  bulletsEn: string[];
  bulletsKh: string[];
  accent: string;          // tailwind text color
  ringTone: string;        // tailwind border + bg tone
  Icon: React.ComponentType<{ className?: string }>;
};

const ROVERS: Rover[] = [
  {
    id: "sojourner",
    nameEn: "Sojourner",
    nameKh: "សូជូណឺ",
    year: 1997,
    sizeEn: "Size of a microwave oven (10.6 kg)",
    sizeKh: "ទំហំស្មើម៉ាស៊ីនម៉ៃក្រូវេវ (១០,៦ គីឡូក្រាម)",
    scale: 50,
    hasSolarPanels: true,
    hasRTG: false,
    taglineEn: "The Pioneer — proved driving on Mars was possible.",
    taglineKh: "អ្នកត្រួសត្រាយ — បង្ហាញថា ការបើករថភ្លើងលើភពអង្គារ អាចធ្វើទៅបាន។",
    bulletsEn: [
      "Travelled only ~100 metres in total during its 83-day mission.",
      "Used six small wheels and a slow 1 cm-per-second top speed.",
      "Communicated through the Pathfinder lander instead of directly to Earth.",
    ],
    bulletsKh: [
      "ធ្វើដំណើរសរុបតែប្រហែល ១០០ ម៉ែត្រ ក្នុងបេសកកម្ម ៨៣ ថ្ងៃ។",
      "ប្រើកង់តូចៗប្រាំមួយ និងល្បឿនអតិបរមា ១ ស.ម. ក្នុងមួយវិនាទី។",
      "ទំនាក់ទំនងតាមរយៈយានចតភេតថ្វាយន់ឌ័រ មិនមែនផ្ញើផ្ទាល់មកផែនដី។",
    ],
    accent: "text-amber-300",
    ringTone: "border-amber-400/40 bg-amber-500/8",
    Icon: Bot,
  },
  {
    id: "spirit-opportunity",
    nameEn: "Spirit & Opportunity",
    nameKh: "ស្ពីរីត និង អបភើទូនីធី",
    year: 2004,
    sizeEn: "Size of a golf cart (185 kg each)",
    sizeKh: "ទំហំស្មើរថយន្តកីឡាហ្គោល (១៨៥ គីឡូក្រាមក្នុងមួយ)",
    scale: 100,
    hasSolarPanels: true,
    hasRTG: false,
    taglineEn: "Frugal Engineering legends — built for 90 days, lasted 15 years.",
    taglineKh: "ចំណុចសំខាន់នៃវិស្វកម្មសន្សំសំចៃ — បង្កើតសម្រាប់ ៩០ ថ្ងៃ ប៉ុន្តែស៊ូពេលបាន ១៥ ឆ្នាំ។",
    bulletsEn: [
      "Designed for a 90-day mission; Opportunity kept driving for 15 years.",
      "Solar-powered — wind-storms occasionally cleaned the dust off the panels.",
      "Found mineral evidence (hematite, gypsum) that Mars once had liquid water.",
    ],
    bulletsKh: [
      "បង្កើតសម្រាប់បេសកកម្ម ៩០ ថ្ងៃ; អបភើទូនីធី បន្តដំណើរការអស់ ១៥ ឆ្នាំ។",
      "ដំណើរការដោយថាមពលព្រះអាទិត្យ — ខ្យល់ព្យុះម្ដងម្កាល បក់ធូលីចេញពីបន្ទះ។",
      "រកឃើញភស្តុតាងសារធាតុរ៉ែ (ហេម៉ាទីត និង ហ្គីបស៊ុំ) ដែលបង្ហាញថា ភពអង្គារធ្លាប់មានទឹករាវ។",
    ],
    accent: "text-orange-300",
    ringTone: "border-orange-400/40 bg-orange-500/8",
    Icon: Wrench,
  },
  {
    id: "curiosity",
    nameEn: "Curiosity",
    nameKh: "គូរីអូស៊ីធី",
    year: 2012,
    sizeEn: "Size of a small car (899 kg)",
    sizeKh: "ទំហំស្មើរថយន្តតូច (៨៩៩ គីឡូក្រាម)",
    scale: 165,
    hasSolarPanels: false,
    hasRTG: true,
    taglineEn: "A nuclear-powered chemistry lab on six wheels.",
    taglineKh: "មន្ទីរពិសោធន៍គីមីដំណើរការដោយថាមពលនុយក្លេអ៊ែរ លើកង់ប្រាំមួយ។",
    bulletsEn: [
      "Powered by a plutonium-238 battery (RTG) — works through dust storms and night.",
      "ChemCam laser vaporizes rock from up to 7 metres away to read its composition.",
      "Found organic molecules and seasonal methane spikes in Gale Crater.",
    ],
    bulletsKh: [
      "ដំណើរការដោយថ្មប្លូតូនីញ៉ូម-២៣៨ — ដំណើរការសូម្បីពេលមានព្យុះធូលី និងពេលយប់។",
      "ឡាស៊ែរ ChemCam ធ្វើឱ្យថ្មក្លាយជាចំហាយ ពីចម្ងាយរហូតដល់ ៧ ម៉ែត្រ ដើម្បីអានសមាសភាពរបស់វា។",
      "រកឃើញម៉ូលេគុលសរីរាង្គ និងការកើនឡើងម៉េតានតាមរដូវកាល នៅរណ្ដៅហ្គេល។",
    ],
    accent: "text-rose-300",
    ringTone: "border-rose-400/40 bg-rose-500/8",
    Icon: Microscope,
  },
  {
    id: "perseverance",
    nameEn: "Perseverance & Ingenuity",
    nameKh: "ភឺសេវេរ៉ាន់ស៍ និង អ៊ីនជេនយូទី",
    year: 2021,
    sizeEn: "Car-sized rover + 1.8 kg helicopter drone",
    sizeKh: "រ៉ូវើទំហំរថយន្ត + ដ្រូនកូនហេលីកុបទ័រ ១,៨ គីឡូក្រាម",
    scale: 175,
    hasSolarPanels: false,
    hasRTG: true,
    taglineEn: "Sample collector — and the first flight on another planet.",
    taglineKh: "អ្នកប្រមូលគំរូ — និងការហោះហើរលើកដំបូងលើភពផ្សេង។",
    bulletsEn: [
      "Drills and seals rock cores into titanium tubes for a future Mars Sample Return.",
      "Carried Ingenuity, a tiny solar helicopter that completed 72 powered flights.",
      "Tests MOXIE — an experiment that makes oxygen from the Martian atmosphere.",
    ],
    bulletsKh: [
      "ខួងនិងបិទភ្ជាប់សម្បកថ្ម ដាក់ក្នុងបំពង់ទីតានញ៉ូម សម្រាប់បេសកកម្មនាំគំរូត្រឡប់មកវិញ នាពេលអនាគត។",
      "នាំយក អ៊ីនជេនយូទី ហេលីកុបទ័រដ្រូនតូច ដែលបានបំពេញការហោះហើរ ៧២ ដង។",
      "សាកល្បង MOXIE — ការពិសោធផលិតអុកស៊ីហ្សែនពីបរិយាកាសភពអង្គារ។",
    ],
    accent: "text-red-300",
    ringTone: "border-red-400/40 bg-red-500/8",
    Icon: Rocket,
  },
];

// ── Sub-component: rover silhouette (size-comparison icon) ──────────────────

function RoverSilhouette({
  scale, accent, hasSolarPanels, hasRTG,
}: {
  scale: number; accent: string; hasSolarPanels: boolean; hasRTG: boolean;
}) {
  // A simple side-view rover silhouette, scaled. Hardware traits are passed
  // in explicitly so they stay correct at any render scale.
  const w = scale;
  const h = scale * 0.65;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden>
      {/* ground shadow */}
      <ellipse cx={w / 2} cy={h - 4} rx={w / 2.4} ry={3} fill="#7f1d1d" opacity="0.45" />
      {/* body */}
      <rect x={w * 0.18} y={h * 0.32} width={w * 0.64} height={h * 0.34} rx="3" fill="#cbd5e1" stroke={accent} strokeWidth="1.2" />
      {/* mast */}
      <rect x={w * 0.32} y={h * 0.12} width={3} height={h * 0.22} fill={accent} />
      <circle cx={w * 0.335} cy={h * 0.12} r={3} fill={accent} />
      {/* solar panels (small/early rovers) */}
      {hasSolarPanels && (
        <>
          <rect x={w * 0.05} y={h * 0.22} width={w * 0.16} height={h * 0.12} fill="#1e3a8a" stroke={accent} strokeWidth="0.8" />
          <rect x={w * 0.79} y={h * 0.22} width={w * 0.16} height={h * 0.12} fill="#1e3a8a" stroke={accent} strokeWidth="0.8" />
        </>
      )}
      {/* RTG nuclear battery (Curiosity / Perseverance class) */}
      {hasRTG && (
        <rect x={w * 0.78} y={h * 0.30} width={w * 0.12} height={h * 0.08} fill="#475569" stroke={accent} strokeWidth="0.8" />
      )}
      {/* Six wheels (Mars rovers all use a 6-wheel rocker-bogie) */}
      {[0.18, 0.31, 0.44, 0.56, 0.69, 0.82].map((px, i) => (
        <circle
          key={i}
          cx={w * px}
          cy={h * 0.78}
          r={Math.max(2.5, h * 0.085)}
          fill="#1f2937"
          stroke={accent}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

// ── 1. Evolution timeline / tab selector ────────────────────────────────────

function EvolutionPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";
  const [activeId, setActiveId] = useState(ROVERS[0].id);
  const active = ROVERS.find((r) => r.id === activeId)!;

  return (
    <div className="rounded-3xl border border-orange-400/25 bg-gradient-to-br from-[#1a0a05] via-[#3b1106] to-[#0c0202] p-5 sm:p-7">
      <PanelHeader
        icon={<Globe2 className="w-4 h-4" />}
        en="The Evolution of Exploration"
        kh="ការវិវត្តនៃការរុករក"
        lang={lang}
        descEn="In just 24 years, NASA's Mars rovers grew from a microwave-sized scout to a car-sized nuclear-powered chemistry lab carrying its own helicopter. Each generation was bolder than the last."
        descKh="ក្នុងរយៈពេលត្រឹមតែ ២៤ ឆ្នាំ រ៉ូវើ NASA លើភពអង្គារ បានរីកធំពីយានស្កោតទំហំម៉ៃក្រូវេវ ទៅជាមន្ទីរពិសោធន៍គីមីដំណើរការដោយនុយក្លេអ៊ែរ ទំហំរថយន្ត ដែលនាំយកហេលីកុបទ័រផ្ទាល់ខ្លួន។ ជំនាន់នីមួយៗ ហ៊ានជាងជំនាន់មុន។"
      />

      {/* Tab strip — also acts as a year-line */}
      <div className="relative mb-6">
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          role="tablist"
          aria-label={isKh ? "ជំនាន់រ៉ូវើ" : "Rover generations"}
        >
          {ROVERS.map((r) => {
            const isActive = r.id === activeId;
            return (
              <button
                key={r.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(r.id)}
                data-testid={`rover-tab-${r.id}`}
                className={[
                  "relative rounded-xl border px-3 py-3 text-left transition-all",
                  isActive
                    ? `${r.ringTone} shadow-[0_0_20px_rgba(251,146,60,0.25)]`
                    : "border-white/10 bg-white/3 hover:border-white/25 hover:bg-white/5",
                ].join(" ")}
              >
                <div className={`text-xs font-mono ${isActive ? r.accent : "text-white/50"}`}>
                  {r.year}
                </div>
                <div className={`text-sm font-semibold mt-1 ${isActive ? "text-white" : "text-white/75"} ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh ? r.nameKh : r.nameEn}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active rover detail */}
      <div
        key={active.id /* re-mount → fade */}
        className={`rounded-2xl border ${active.ringTone} p-5 animate-in fade-in duration-300`}
        data-testid="rover-detail"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)] gap-5 items-start">
          {/* Silhouette + size */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-[120px] flex items-end justify-center w-full">
              <RoverSilhouette
                scale={active.scale}
                accent="#fdba74"
                hasSolarPanels={active.hasSolarPanels}
                hasRTG={active.hasRTG}
              />
            </div>
            <div className={`text-center text-xs ${active.accent} font-medium ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? active.sizeKh : active.sizeEn}
            </div>
          </div>

          {/* Text content */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <active.Icon className={`w-4 h-4 ${active.accent}`} />
              <h4 className={`font-display font-bold text-white text-lg ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? active.nameKh : active.nameEn}
              </h4>
              <span className={`ml-auto text-xs font-mono ${active.accent}`}>
                {active.year}
              </span>
            </div>
            <p className={`text-white/85 text-sm italic mb-3 ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
              {isKh ? active.taglineKh : active.taglineEn}
            </p>
            <ul className="space-y-2">
              {(isKh ? active.bulletsKh : active.bulletsEn).map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${active.accent.replace("text-", "bg-")} flex-shrink-0`} />
                  <span className={`text-white/75 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Size-comparison strip — all four silhouettes side-by-side */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
        <div className={`text-xs uppercase tracking-widest text-orange-300/80 mb-3 text-center ${isKh ? "font-khmer tracking-normal" : ""}`}>
          {isKh ? "ការប្រៀបធៀបទំហំ" : "Size Comparison"}
        </div>
        <div className="flex items-end justify-around gap-3 overflow-x-auto pb-2">
          {ROVERS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveId(r.id)}
              className={[
                "flex flex-col items-center gap-1 flex-shrink-0 transition-opacity rounded-md p-1",
                r.id === activeId ? "opacity-100" : "opacity-55 hover:opacity-90",
              ].join(" ")}
              aria-label={isKh ? `ជ្រើសរើស ${r.nameKh}` : `Select ${r.nameEn}`}
            >
              <div className="h-[120px] flex items-end">
                <RoverSilhouette
                  scale={r.scale * 0.7}
                  accent={r.id === activeId ? "#fdba74" : "#94a3b8"}
                  hasSolarPanels={r.hasSolarPanels}
                  hasRTG={r.hasRTG}
                />
              </div>
              <span className="text-[10px] font-mono text-white/55">{r.year}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 2. Seven Minutes of Terror ──────────────────────────────────────────────

function SevenMinutesPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  const stages: { tEn: string; tKh: string; bodyEn: string; bodyKh: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    {
      tEn: "Atmospheric Entry",
      tKh: "ចូលបរិយាកាស",
      bodyEn: "Hits the upper atmosphere at ~20,000 km/h. The heat shield glows at 2,100 °C.",
      bodyKh: "បុកចូលផ្នែកខាងលើនៃបរិយាកាសក្នុងល្បឿន ~២០,០០០ គ.ម./ម៉ោង។ ខែលកំដៅភ្លឺនៅសីតុណ្ហភាព ២,១០០ °C។",
      Icon: Rocket,
    },
    {
      tEn: "Parachute Deploy",
      tKh: "បើកឆ័ត្រយោង",
      bodyEn: "A 21-metre supersonic parachute snaps open while the rover is still flying faster than sound.",
      bodyKh: "ឆ័ត្រយោងលឿនជាងសម្លេង ទំហំ ២១ ម៉ែត្រ បើកភ្លាម ខណៈរ៉ូវើនៅហោះលឿនជាងសម្លេង។",
      Icon: Umbrella,
    },
    {
      tEn: "Powered Descent",
      tKh: "ការចុះចតដោយម៉ាស៊ីន",
      bodyEn: "Eight retro-rockets fire to slow the descent stage to a hover above the surface.",
      bodyKh: "ម៉ាស៊ីនរ៉ុក្កែតប្រាំបី ក្បាលបាញ់ចុះក្រោម ដើម្បីបន្ថយល្បឿនការចុះ រហូតយានឈរនឹងលើផ្ទៃ។",
      Icon: Zap,
    },
    {
      tEn: "Sky-Crane Touchdown",
      tKh: "ការចតដោយចង្កូតមេឃ",
      bodyEn: "The descent stage lowers the rover on three nylon cords, then flies away to crash safely far off.",
      bodyKh: "ដំណាក់កាលចុះទម្លាក់រ៉ូវើដោយខ្សែនីឡុងបី បន្ទាប់មកហោះចេញ ធ្លាក់នៅឆ្ងាយដោយសុវត្ថិភាព។",
      Icon: Camera,
    },
  ];

  return (
    <div className="rounded-3xl border border-red-400/25 bg-gradient-to-br from-[#1a0606] via-[#3b0a0a] to-[#0c0202] p-5 sm:p-7">
      <PanelHeader
        icon={<Timer className="w-4 h-4" />}
        en="The 7 Minutes of Terror"
        kh="៧ នាទីនៃភាពភ័យរន្ធត់"
        lang={lang}
        descEn="Radio signals take 10 to 20 minutes to travel between Mars and Earth. So during landing — which lasts only seven minutes — no human can help. The rover must enter, descend, and land entirely by itself."
        descKh="សញ្ញាវិទ្យុ ត្រូវការពេល ១០ ទៅ ២០ នាទី ដើម្បីធ្វើដំណើររវាងភពអង្គារ និងផែនដី។ ដូច្នេះក្នុងពេលចុះចត — ដែលមានរយៈពេលត្រឹមតែប្រាំពីរនាទី — គ្មានមនុស្សណាអាចជួយបានទេ។ រ៉ូវើត្រូវតែចូល ចុះ និងចតដោយខ្លួនឯងទាំងស្រុង។"
      />

      {/* Light-lag visual */}
      <div
        className="rounded-2xl border border-red-400/20 bg-black/30 p-4 mb-5"
        data-testid="light-lag-diagram"
      >
        <svg viewBox="0 0 600 130" className="w-full h-auto" aria-label="Earth to Mars light-lag diagram">
          <defs>
            <radialGradient id="mr-earth" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
            <radialGradient id="mr-mars" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
          </defs>
          {/* Earth */}
          <circle cx="60" cy="65" r="22" fill="url(#mr-earth)" />
          <text x="60" y="105" textAnchor="middle" fontSize="11" fill="#93c5fd" fontWeight="700">
            {isKh ? "ផែនដី" : "Earth"}
          </text>
          {/* Mars */}
          <circle cx="540" cy="65" r="18" fill="url(#mr-mars)" />
          <text x="540" y="105" textAnchor="middle" fontSize="11" fill="#fb923c" fontWeight="700">
            {isKh ? "ភពអង្គារ" : "Mars"}
          </text>
          {/* Signal beam */}
          <line x1="84" y1="65" x2="520" y2="65" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="6 5" opacity="0.6" />
          {/* Three signal pulses staggered */}
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={130 + i * 130} cy="65" r="3.5" fill="#fde047">
              <animate attributeName="cx" from="84" to="520" dur="3s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.4;1" dur="3s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <text x="300" y="40" textAnchor="middle" fontSize="11" fill="#fbbf24" fontWeight="700">
            {isKh ? "សញ្ញាវិទ្យុ ~១០–២០ នាទី" : "Radio signal ~10–20 min"}
          </text>
          <text x="300" y="92" textAnchor="middle" fontSize="9" fill="#fbbf24" opacity="0.75">
            {isKh ? "(មិនទាន់សម្រាប់ការចុះចត ៧ នាទី)" : "(Far too slow for a 7-minute landing)"}
          </text>
        </svg>
      </div>

      {/* Four EDL stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stages.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border border-red-400/30 bg-red-500/5 p-4 relative"
          >
            <div className="absolute top-2 right-2 text-[10px] font-mono text-red-300/70">
              {String(i + 1).padStart(2, "0")}
            </div>
            <s.Icon className="w-5 h-5 text-red-300 mb-2" />
            <h4 className={`text-sm font-bold text-red-200 mb-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? s.tKh : s.tEn}
            </h4>
            <p className={`text-white/70 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? s.bodyKh : s.bodyEn}
            </p>
          </div>
        ))}
      </div>

      {/* Key takeaway */}
      <div className="mt-5 rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 flex items-start gap-3">
        <Radio className="w-5 h-5 text-orange-300 mt-0.5 flex-shrink-0" />
        <p className={`text-white/80 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "នៅពេលដែលរូបភាពចុះចតលើកដំបូង មកដល់ផែនដី — រ៉ូវើបានចតរួចហើយ ឬ បានបាក់រួចហើយ ប៉ុន្មាននាទីមុន។ វិស្វករ NASA ហៅរយៈពេលនេះថា \"ប្រាំពីរនាទីនៃភាពភ័យរន្ធត់\" ព្រោះពួកគេអាចតែមើល និងរង់ចាំ។"
            : 'By the time the first landing image reaches Earth, the rover has already either touched down — or been destroyed — minutes ago. NASA engineers call this stretch the "Seven Minutes of Terror" because all they can do is watch and wait.'}
        </p>
      </div>
    </div>
  );
}

// ── Main wrapper ────────────────────────────────────────────────────────────

export function MarsRoversModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="mars-rovers-module"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-orange-500/15 border border-orange-400/30 flex items-center justify-center text-orange-300">
            <Rocket className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-orange-300 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("The Mars Rovers: Robotic Mapmakers", "រ៉ូវើភពអង្គារ៖ អ្នករុករកមនុស្សយន្ត")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-orange-400/30 to-transparent" />
      </div>

      {/* Glowing intro card — Martian dusty backdrop */}
      <div
        className="rounded-3xl border border-orange-400/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(234,88,12,0.18) 0%,rgba(120,53,15,0.45) 45%,rgba(20,5,2,0.9) 100%)",
          boxShadow: "0 0 40px rgba(234,88,12,0.15) inset",
        }}
      >
        {/* Soft dust haze */}
        <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-rose-700/20 blur-3xl pointer-events-none" />
        <div className="relative">
          <h2
            className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
            style={{
              background: "linear-gradient(90deg,#fed7aa 0%,#fb923c 55%,#fecaca 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(234,88,12,0.25)",
            }}
          >
            {t("Driving on Another World", "ការបើកបរនៅលើពិភពមួយផ្សេង")}
          </h2>
          <p className={`text-white/75 text-sm sm:text-base leading-relaxed max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Since 1997, six robotic explorers have rolled across the rust-coloured deserts of Mars — sniffing rocks, drilling for samples, and slowly mapping a planet 225 million kilometres away. Each rover is a small Earth ambassador, learning whether life ever called Mars home.",
              "ចាប់តាំងពីឆ្នាំ ១៩៩៧ មក អ្នករុករកមនុស្សយន្តប្រាំមួយ បានបើកបរឆ្លងកាត់វាលខ្សាច់ពណ៌ច្រែះរបស់ភពអង្គារ — ហិតថ្ម ខួងយកគំរូ និងគូរផែនទីយឺតៗនៃភពមួយដែលនៅឆ្ងាយ ២២៥ លានគីឡូម៉ែត្រ។ រ៉ូវើនីមួយៗ គឺជាឯកអគ្គរដ្ឋទូតតូចមួយរបស់ផែនដី កំពុងសិក្សាមើលថា ភពអង្គារធ្លាប់មានជីវិតរស់នៅឬទេ។",
            )}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <Battery className="w-3.5 h-3.5 text-orange-300" />
            <span className={`text-orange-200/80 ${kh ? "font-khmer" : ""}`}>
              {t("4 generations · 24 years of exploration", "៤ ជំនាន់ · ២៤ ឆ្នាំនៃការរុករក")}
            </span>
          </div>
        </div>
      </div>

      {/* 1. Evolution */}
      <div className="mb-6">
        <EvolutionPanel lang={lang} />
      </div>

      {/* 2. Seven minutes of terror */}
      <SevenMinutesPanel lang={lang} />

      <p className={`mt-5 text-center text-orange-200/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "Six wheels, one nuclear heart, and the patience to wait twenty light-minutes for instructions from home.",
          "កង់ប្រាំមួយ បេះដូងនុយក្លេអ៊ែរមួយ និងការអត់ធ្មត់ដើម្បីរង់ចាំសេចក្ដីណែនាំពីផ្ទះ ម្ភៃនាទីពន្លឺ។",
        )}
      </p>
    </section>
  );
}
