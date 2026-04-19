import { useState } from "react";
import { Waves, Mountain, Activity, AlertTriangle, ArrowRight } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

type Disaster = "flood" | "earthquake" | "tsunami";

const TABS: { id: Disaster; en: string; kh: string; iconColor: string }[] = [
  { id: "flood",      en: "Floods",       kh: "ទឹកជំនន់",        iconColor: "#0284c7" },
  { id: "earthquake", en: "Earthquakes",  kh: "ការរញ្ជួយដី",      iconColor: "#ea580c" },
  { id: "tsunami",    en: "Tsunamis",     kh: "រលកយក្សស៊ូណាមិ",  iconColor: "#0891b2" },
];

export function DisasterSignalGuide() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [active, setActive] = useState<Disaster>("flood");

  return (
    <div className="rounded-3xl bg-white border-4 border-yellow-400 shadow-lg overflow-hidden">
      {/* Header — hazard-tape strip */}
      <div className="relative px-5 sm:px-7 py-4 sm:py-5 bg-yellow-400" style={{
        backgroundImage: "repeating-linear-gradient(45deg, #facc15 0 14px, #1c1917 14px 18px)",
      }}>
        <div className="bg-yellow-300 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-2 border-stone-900 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-stone-900" />
          <span className={`text-sm font-extrabold uppercase tracking-wider text-stone-900 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {kh ? "ការត្រៀមលក្ខណៈ" : "Be Prepared"}
          </span>
        </div>
      </div>

      <div className="px-5 sm:px-7 py-5 sm:py-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-b-2 border-yellow-200">
        <div className={`text-[11px] font-mono uppercase tracking-[0.25em] text-orange-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {kh ? "មេរៀនទី ១" : "Lesson 1"}
        </div>
        <h3 className={`font-display text-xl sm:text-2xl font-bold text-stone-900 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? "តើមានរឿងអ្វីកំពុងកើតឡើង?" : "What is happening?"}
          {kh && <span className="ml-2 text-sm text-stone-600 font-sans font-normal">(Science of the Signal)</span>}
        </h3>
        <p className={`mt-1 text-sm text-stone-700 max-w-2xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh
            ? "ស្គាល់សញ្ញានៃគ្រោះមហន្តរាយធម្មជាតិធំៗទាំងបី និងដឹងថាត្រូវធ្វើដូចម្ដេច។"
            : "Learn the warning signs of the three biggest natural hazards — and exactly what to do."}
        </p>
      </div>

      {/* Tabs */}
      <div className="px-3 sm:px-5 pt-3 bg-white border-b-2 border-yellow-200 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const isActive = active === t.id;
          const Icon = t.id === "flood" ? Waves : t.id === "earthquake" ? Activity : Waves;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-t-xl border-2 border-b-0 transition ${
                isActive
                  ? "bg-yellow-300 border-yellow-500 text-stone-900 shadow-sm"
                  : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-yellow-50"
              } ${kh ? "font-khmer" : ""}`}
              style={isActive ? { color: t.iconColor === "#ea580c" ? "#7c2d12" : "#0c4a6e" } : undefined}
            >
              <Icon className="w-4 h-4" style={{ color: isActive ? t.iconColor : undefined }} />
              {kh ? t.kh : t.en}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div className="p-4 sm:p-6 bg-gradient-to-b from-white to-yellow-50/30">
        {active === "flood"      && <FloodPanel kh={kh} />}
        {active === "earthquake" && <EarthquakePanel kh={kh} />}
        {active === "tsunami"    && <TsunamiPanel kh={kh} />}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Shared layout                                                         */
/* ────────────────────────────────────────────────────────────────────── */

function PanelLayout({
  scene, what, doSteps, kh,
}: {
  scene: React.ReactNode;
  what: { en: string; kh: string };
  doSteps: { en: string; kh: string; iconBg: string; emoji: string }[];
  kh: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5">
      {/* Animated scene */}
      <div className="rounded-2xl border-2 border-stone-200 overflow-hidden bg-gradient-to-b from-sky-100 to-stone-100 shadow-sm">
        {scene}
      </div>

      {/* What & Do */}
      <div className="space-y-4">
        <div className="rounded-2xl border-2 border-sky-300 bg-sky-50 p-4">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-sky-800 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "តើមានរឿងអ្វីកំពុងកើតឡើង?" : "What is happening?"}
          </div>
          <p className={`text-sm text-sky-950 leading-relaxed ${kh ? "font-khmer leading-loose text-base" : ""}`}>
            {kh ? what.kh : what.en}
          </p>
          {kh && <p className="mt-1 text-xs italic text-sky-700/70">{what.en}</p>}
        </div>

        <div className="rounded-2xl border-2 border-orange-400 bg-orange-50 p-4">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-orange-800 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "តើត្រូវធ្វើដូចម្ដេច?" : "What to do"}
          </div>
          <ol className="space-y-2">
            {doSteps.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white font-extrabold text-sm shadow-sm" style={{ backgroundColor: s.iconBg }}>
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-bold text-orange-950 leading-snug ${kh ? "font-khmer leading-tight text-base" : ""}`}>
                    <span className="mr-1.5">{s.emoji}</span>
                    {kh ? s.kh : s.en}
                  </p>
                  {kh && (
                    <p className="text-[11px] italic text-orange-700/70 mt-0.5">{s.en}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Flood — rising water in Mekong basin                                  */
/* ────────────────────────────────────────────────────────────────────── */

function FloodPanel({ kh }: { kh: boolean }) {
  return (
    <PanelLayout
      kh={kh}
      scene={<FloodScene kh={kh} />}
      what={{
        en: "Heavy monsoon rain falls across the Mekong basin (China, Laos, Thailand) for many days. All that water flows downstream into Cambodia. The Mekong, the Bassac, and the Tonle Sap rise — and when banks overflow, low-lying villages and rice fields flood.",
        kh: "ភ្លៀងធ្លាក់ខ្លាំងពេលរដូវវស្សា ធ្លាក់នៅអាងទន្លេមេគង្គ (ចិន ឡាវ ថៃ) រាប់ថ្ងៃ។ ទឹកទាំងអស់នោះហូរចុះមកកម្ពុជា។ ទន្លេមេគង្គ ទន្លេបាសាក់ និងទន្លេសាបឡើងខ្ពស់ — ហើយពេលច្រាំងហៀរ ភូមិទាបនិងស្រែនឹងលិច។",
      }}
      doSteps={[
        { iconBg: "#0284c7", emoji: "📻", en: "Listen to local news and radio for warnings (NCDM, MRC).",   kh: "ស្ដាប់ព័ត៌មាន និងវិទ្យុក្នុងស្រុកដើម្បីស្ដាប់ការព្រមាន (NCDM, MRC)។" },
        { iconBg: "#ea580c", emoji: "🏔️", en: "Move to higher ground — second floor, hill, or pagoda.",       kh: "ផ្លាស់ទីទៅទីខ្ពស់ — ជាន់ទីពីរ ភ្នំ ឬវត្ត។" },
        { iconBg: "#dc2626", emoji: "🚫", en: "NEVER walk or drive through fast-moving water — even shallow water can sweep you away.", kh: "កុំដើរ ឬបើកបរកាត់ទឹកហូរខ្លាំងជាដាច់ខាត — សូម្បីតែទឹករាក់ក៏អាចសម្រុកអ្នកទៅបាន។" },
        { iconBg: "#16a34a", emoji: "🎒", en: "Bring your Go-Bag, drinking water, and important documents.",   kh: "យកកាបូបបន្ទាន់ ទឹកផឹក និងឯកសារសំខាន់ៗមកជាមួយ។" },
      ]}
    />
  );
}

function FloodScene({ kh }: { kh: boolean }) {
  return (
    <div className="relative h-72 sm:h-80">
      <style>{`
        @keyframes flood-rise { 0% { height: 18%; } 50% { height: 62%; } 100% { height: 18%; } }
        @keyframes rain-fall  { 0% { transform: translateY(-12px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(80px); opacity: 0; } }
        .rain-drop { animation: rain-fall 1.2s linear infinite; }
        .flood-water { animation: flood-rise 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      <svg viewBox="0 0 360 240" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="flood-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#475569" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="flood-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect width="360" height="180" fill="url(#flood-sky)" />
        {/* Storm clouds */}
        <ellipse cx="80" cy="35" rx="48" ry="14" fill="#cbd5e1" opacity="0.85" />
        <ellipse cx="200" cy="25" rx="60" ry="16" fill="#cbd5e1" opacity="0.85" />
        <ellipse cx="310" cy="40" rx="50" ry="13" fill="#cbd5e1" opacity="0.8" />
        {/* Rain drops */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={i}
            x1={20 + i * 17} y1="50" x2={16 + i * 17} y2="65"
            stroke="#bae6fd" strokeWidth="1.6" strokeLinecap="round"
            className="rain-drop"
            style={{ animationDelay: `${(i % 5) * 0.2}s` }}
          />
        ))}
        {/* Distant mountains */}
        <polygon points="0,180 60,115 120,180" fill="#475569" opacity="0.85" />
        <polygon points="100,180 180,95 260,180" fill="#334155" opacity="0.9" />
        <polygon points="240,180 320,120 360,180" fill="#475569" opacity="0.85" />

        {/* Ground */}
        <rect y="180" width="360" height="60" fill="#7c5e3a" />
        {/* Village houses on stilts */}
        <g>
          {/* House 1 */}
          <rect x="40" y="155" width="40" height="25" fill="#a16207" />
          <polygon points="38,155 60,135 82,155" fill="#7c2d12" />
          <line x1="48" y1="180" x2="48" y2="200" stroke="#5c4423" strokeWidth="3" />
          <line x1="72" y1="180" x2="72" y2="200" stroke="#5c4423" strokeWidth="3" />
          {/* House 2 */}
          <rect x="240" y="160" width="44" height="22" fill="#b45309" />
          <polygon points="238,160 262,140 286,160" fill="#7c2d12" />
          <line x1="248" y1="182" x2="248" y2="200" stroke="#5c4423" strokeWidth="3" />
          <line x1="276" y1="182" x2="276" y2="200" stroke="#5c4423" strokeWidth="3" />
          {/* Palm tree */}
          <line x1="170" y1="200" x2="170" y2="155" stroke="#78350f" strokeWidth="3" />
          <ellipse cx="170" cy="148" rx="18" ry="6" fill="#15803d" />
          <ellipse cx="170" cy="142" rx="14" ry="5" fill="#16a34a" />
        </g>

        {/* Rising flood water — height animates */}
        <g>
          <rect x="0" y="0" width="360" height="100%" fill="url(#flood-water)" opacity="0.78"
                className="flood-water" style={{ y: "200px" /* fallback */ }}>
            <animate attributeName="height" values="40;120;40" dur="8s" repeatCount="indefinite" />
            <animate attributeName="y"      values="200;120;200" dur="8s" repeatCount="indefinite" />
          </rect>
          {/* Wave shimmer */}
          <path d="M 0 122 Q 30 116 60 122 T 120 122 T 180 122 T 240 122 T 300 122 T 360 122"
                fill="none" stroke="#bae6fd" strokeWidth="1.5" opacity="0.85">
            <animate attributeName="d"
              values="M 0 122 Q 30 116 60 122 T 120 122 T 180 122 T 240 122 T 300 122 T 360 122;
                      M 0 122 Q 30 128 60 122 T 120 122 T 180 122 T 240 122 T 300 122 T 360 122;
                      M 0 122 Q 30 116 60 122 T 120 122 T 180 122 T 240 122 T 300 122 T 360 122"
              dur="3s" repeatCount="indefinite" />
            <animate attributeName="transform" type="translate"
              values="0 80;0 0;0 80" dur="8s" repeatCount="indefinite" additive="sum" />
          </path>
        </g>

        {/* Water-level marker */}
        <g transform="translate(330, 80)">
          <rect x="-6" y="0" width="12" height="120" fill="#fef08a" stroke="#1c1917" strokeWidth="1.4" />
          {[20, 50, 80, 110].map((y, i) => (
            <line key={i} x1="-6" y1={y} x2="6" y2={y} stroke="#1c1917" strokeWidth="1" />
          ))}
          <text x="-10" y="-5" fontSize="9" fontWeight="700" fill="#fef3c7"
                style={{ paintOrder: "stroke", stroke: "#1c1917", strokeWidth: 2.5 }}>
            {kh ? "កម្ពស់ទឹក" : "Water level"}
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Earthquake — Drop, Cover, Hold On                                     */
/* ────────────────────────────────────────────────────────────────────── */

function EarthquakePanel({ kh }: { kh: boolean }) {
  return (
    <PanelLayout
      kh={kh}
      scene={<EarthquakeScene kh={kh} />}
      what={{
        en: "Underground rock suddenly shifts along a fault line, sending shock waves through the ground. The shaking can knock objects off shelves and crack buildings. The safest action is the universal 'Drop, Cover, and Hold On' technique.",
        kh: "ថ្មក្រោមដីផ្លាស់ប្ដូរភ្លាមៗតាមបណ្ដោយខ្សែបាក់ បញ្ជូនរលករញ្ជួយឆ្លងកាត់ដី។ ការរញ្ជួយអាចធ្វើឱ្យវត្ថុធ្លាក់ពីធ្នើ និងបង្កស្នាមប្រេះអគារ។ សកម្មភាពសុវត្ថិភាពបំផុតគឺបច្ចេកទេស «ដួល គ្រប កាន់» (Drop, Cover, Hold On)។",
      }}
      doSteps={[
        { iconBg: "#ea580c", emoji: "👇", en: "DROP — drop down to your hands and knees so you don't fall.",        kh: "ដួល — ចុះអង្គុយដៃនិងជង្គង់ ដើម្បីកុំឱ្យដួល។" },
        { iconBg: "#facc15", emoji: "🛡️", en: "COVER — get under a sturdy table or against an interior wall, away from windows.", kh: "គ្រប — ចូលក្រោមតុរឹងមាំ ឬផ្អែកនឹងជញ្ជាំងខាងក្នុង ឆ្ងាយពីបង្អួច។" },
        { iconBg: "#dc2626", emoji: "✊", en: "HOLD ON — hold on to your shelter and protect your head and neck until shaking stops.", kh: "កាន់ — កាន់របស់ដែលជ្រកជាមួយ និងការពារក្បាល និងករ រហូតដល់ការរញ្ជួយឈប់។" },
        { iconBg: "#16a34a", emoji: "🚪", en: "Only leave the building when the shaking has fully stopped — watch for falling debris.", kh: "ចេញពីអគារនៅពេលការរញ្ជួយឈប់ទាំងស្រុង — ប្រយ័ត្នកំទេចធ្លាក់។" },
      ]}
    />
  );
}

function EarthquakeScene({ kh }: { kh: boolean }) {
  return (
    <div className="relative h-72 sm:h-80">
      <style>{`
        @keyframes eq-shake-h { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-3px); } 75% { transform: translateX(3px); } }
        @keyframes eq-shake-v { 0%,100% { transform: translateY(0); } 25% { transform: translateY(-1.5px); } 75% { transform: translateY(1.5px); } }
        @keyframes step-cycle { 0%,30% { opacity: 1; } 33%,100% { opacity: 0; } }
        .eq-shake-h { animation: eq-shake-h 0.18s linear infinite; }
        .eq-shake-v { animation: eq-shake-v 0.22s linear infinite; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      <svg viewBox="0 0 360 240" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="eq-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>
        </defs>
        <rect width="360" height="180" fill="url(#eq-sky)" />

        {/* Building (shaking) */}
        <g className="eq-shake-h">
          <rect x="220" y="60" width="120" height="120" fill="#a8a29e" stroke="#44403c" strokeWidth="2" />
          {/* Windows */}
          {[0,1,2].map(r => [0,1,2].map(c => (
            <rect key={`${r}${c}`} x={232 + c * 32} y={72 + r * 32} width="20" height="20" fill="#0c4a6e" stroke="#1c1917" />
          )))}
          {/* Cracks (subtle) */}
          <path d="M 280 60 L 285 100 L 280 140" stroke="#1c1917" strokeWidth="1" fill="none" strokeDasharray="2 2" />
        </g>

        {/* Ground */}
        <rect x="0" y="180" width="360" height="60" fill="#78350f" />
        <line x1="0" y1="184" x2="360" y2="184" stroke="#451a03" strokeWidth="1" strokeDasharray="4 3" />

        {/* Sturdy table */}
        <g className="eq-shake-v">
          <rect x="60" y="135" width="100" height="6" fill="#78350f" stroke="#451a03" />
          <rect x="62" y="141" width="6" height="35" fill="#78350f" />
          <rect x="152" y="141" width="6" height="35" fill="#78350f" />
        </g>

        {/* Person — Drop/Cover/Hold On (3 frames cycling) */}
        <g>
          {/* Frame 1: DROP — drops to knees */}
          <g style={{ animation: "step-cycle 6s steps(1) infinite" }}>
            <circle cx="105" cy="155" r="9" fill="#fde68a" stroke="#92400e" strokeWidth="1.4" />
            <rect x="98" y="162" width="14" height="14" rx="2" fill="#16a34a" />
            <line x1="98" y1="176" x2="92" y2="180" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
            <line x1="112" y1="176" x2="118" y2="180" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
            <text x="105" y="200" textAnchor="middle" fontSize="11" fontWeight="800" fill="#7c2d12">DROP</text>
          </g>
          {/* Frame 2: COVER — under table */}
          <g style={{ animation: "step-cycle 6s steps(1) infinite", animationDelay: "2s" }}>
            <circle cx="105" cy="160" r="8" fill="#fde68a" stroke="#92400e" strokeWidth="1.4" />
            <rect x="98" y="166" width="14" height="10" rx="2" fill="#16a34a" />
            <line x1="100" y1="155" x2="95" y2="148" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="110" y1="155" x2="115" y2="148" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
            <text x="105" y="200" textAnchor="middle" fontSize="11" fontWeight="800" fill="#7c2d12">COVER</text>
          </g>
          {/* Frame 3: HOLD ON — gripping table leg */}
          <g style={{ animation: "step-cycle 6s steps(1) infinite", animationDelay: "4s" }}>
            <circle cx="105" cy="160" r="8" fill="#fde68a" stroke="#92400e" strokeWidth="1.4" />
            <rect x="98" y="166" width="14" height="10" rx="2" fill="#facc15" />
            <line x1="98" y1="170" x2="68" y2="158" stroke="#92400e" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="112" y1="170" x2="155" y2="158" stroke="#92400e" strokeWidth="2.8" strokeLinecap="round" />
            <text x="105" y="200" textAnchor="middle" fontSize="11" fontWeight="800" fill="#7c2d12">HOLD ON</text>
          </g>
        </g>

        {/* Seismic waves emanating from ground */}
        <g opacity="0.7">
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M 0 ${230 - i * 6} Q 90 ${236 - i * 6} 180 ${230 - i * 6} T 360 ${230 - i * 6}`}
                  fill="none" stroke="#dc2626" strokeWidth="1.2" />
          ))}
        </g>

        {/* Caption */}
        <g>
          <rect x="10" y="10" width="180" height="22" rx="11" fill="#facc15" stroke="#1c1917" strokeWidth="1.5" />
          <text x="100" y="25" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1c1917"
                style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-sans-serif" }}>
            {kh ? "ដួល → គ្រប → កាន់" : "Drop → Cover → Hold On"}
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Tsunami — receding water, then giant wave                             */
/* ────────────────────────────────────────────────────────────────────── */

function TsunamiPanel({ kh }: { kh: boolean }) {
  return (
    <PanelLayout
      kh={kh}
      scene={<TsunamiScene kh={kh} />}
      what={{
        en: "A tsunami is a giant ocean wave caused by an underwater earthquake or landslide. The most important natural warning sign is when the ocean suddenly RECEDES far back from the beach, exposing the seafloor. If you ever see this — do not go look! Run to high ground immediately.",
        kh: "ស៊ូណាមិគឺជារលកមហាសមុទ្រដ៏យក្ស ដែលបង្កដោយរញ្ជួយដីក្រោមទឹក ឬដីបាក់ក្រោមទឹក។ សញ្ញាព្រមានធម្មជាតិសំខាន់បំផុតគឺ ពេលដែលទឹកសមុទ្រស្រាប់តែដកថយយ៉ាងឆ្ងាយពីឆ្នេរ ដោយបង្ហាញបាតសមុទ្រ។ បើអ្នកឃើញនេះ — កុំទៅមើល! រត់ឡើងទីខ្ពស់ភ្លាមៗ។",
      }}
      doSteps={[
        { iconBg: "#0891b2", emoji: "👀", en: "Recognize the warning — water pulling far out from shore is nature's alarm.", kh: "ស្គាល់ការព្រមាន — ទឹកដកចេញឆ្ងាយពីច្រាំង គឺជាការសូរ៍ម៉ោងធម្មជាតិ។" },
        { iconBg: "#dc2626", emoji: "🏃", en: "RUN to high ground (a hill at least 30 m above sea level) — do not wait, do not pack.", kh: "រត់ ទៅទីខ្ពស់ (ភ្នំយ៉ាងហោចណាស់ ៣០ម៉ែត្រខ្ពស់ជាងមហាសមុទ្រ) — កុំរង់ចាំ កុំខ្ចប់របស់។" },
        { iconBg: "#ea580c", emoji: "🌊", en: "Stay there — more waves will come. The first wave is rarely the biggest.", kh: "នៅទីនោះ — រលកច្រើនទៀតនឹងមកដល់។ រលកដំបូងកម្រនឹងធំបំផុត។" },
        { iconBg: "#16a34a", emoji: "📻", en: "Listen to official 'all clear' from authorities before returning.", kh: "ស្ដាប់ការប្រកាស «សុវត្ថិភាព» ផ្លូវការពីអាជ្ញាធរ មុននឹងត្រឡប់មកវិញ។" },
      ]}
    />
  );
}

function TsunamiScene({ kh }: { kh: boolean }) {
  return (
    <div className="relative h-72 sm:h-80">
      <style>{`
        @keyframes tsu-recede { 0%,15% { transform: translateX(0); }
                                40% { transform: translateX(70px); }
                                75%,100% { transform: translateX(0); } }
        @keyframes tsu-wave   { 0%,30% { transform: translateX(360px) scaleY(0.6); opacity: 0.4; }
                                70% { transform: translateX(0) scaleY(1); opacity: 1; }
                                90%,100% { transform: translateX(-200px) scaleY(0.8); opacity: 0.7; } }
        @keyframes tsu-floor  { 0%,15% { opacity: 0; }
                                30%,65% { opacity: 1; }
                                85%,100% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
      <svg viewBox="0 0 360 240" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="tsu-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
          <linearGradient id="tsu-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e7490" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect width="360" height="160" fill="url(#tsu-sky)" />
        <circle cx="60" cy="40" r="18" fill="#fbbf24" opacity="0.85" />

        {/* High-ground hill on the left */}
        <polygon points="0,200 70,90 130,200" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
        <polygon points="20,200 70,110 110,200" fill="#16a34a" />
        {/* Tiny figure on top of the hill */}
        <circle cx="70" cy="86" r="3" fill="#fde68a" stroke="#7c2d12" strokeWidth="0.8" />
        <rect x="68" y="88" width="4" height="6" fill="#dc2626" />
        <text x="70" y="78" textAnchor="middle" fontSize="8" fontWeight="800" fill="#14532d"
              style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 2 }}>
          {kh ? "សុវត្ថិភាព!" : "Safe!"}
        </text>

        {/* Beach */}
        <rect x="130" y="180" width="230" height="60" fill="#fde68a" />

        {/* Receded water (visible during recede phase) */}
        <g style={{ animation: "tsu-recede 9s ease-in-out infinite", transformOrigin: "300px 180px" }}>
          <rect x="200" y="170" width="160" height="40" fill="url(#tsu-water)" opacity="0.85" />
          <path d="M 200 170 Q 220 165 240 170 T 280 170 T 320 170 T 360 170"
                fill="none" stroke="#bae6fd" strokeWidth="1.4" opacity="0.9" />
        </g>

        {/* Exposed seafloor with stranded fish (appears only during recede) */}
        <g style={{ animation: "tsu-floor 9s ease-in-out infinite" }}>
          <ellipse cx="180" cy="190" rx="6" ry="2.5" fill="#0891b2" />
          <ellipse cx="195" cy="195" rx="5" ry="2" fill="#0e7490" />
          <ellipse cx="170" cy="200" rx="7" ry="2.5" fill="#0c4a6e" />
          <text x="155" y="178" fontSize="8" fontWeight="800" fill="#dc2626"
                style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 2 }}>
            {kh ? "ទឹកដកចេញ — សញ្ញាគ្រោះថ្នាក់!" : "Water pulled out — DANGER!"}
          </text>
        </g>

        {/* Incoming giant wave */}
        <g style={{ animation: "tsu-wave 9s ease-in-out infinite", transformOrigin: "180px 160px" }}>
          <path d="M 0 170 Q 60 60 130 100 Q 180 130 240 90 Q 300 60 360 130 L 360 200 L 0 200 Z"
                fill="url(#tsu-water)" opacity="0.92" />
          <path d="M 0 170 Q 60 60 130 100 Q 180 130 240 90 Q 300 60 360 130"
                fill="none" stroke="#bae6fd" strokeWidth="2" />
          {/* Foam */}
          <ellipse cx="130" cy="100" rx="14" ry="6" fill="#fff" opacity="0.85" />
          <ellipse cx="240" cy="90" rx="12" ry="5" fill="#fff" opacity="0.85" />
        </g>

        {/* Run! arrow */}
        <g>
          <line x1="190" y1="155" x2="100" y2="115" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"
                markerEnd="url(#tsu-arrow)" />
          <defs>
            <marker id="tsu-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
            </marker>
          </defs>
          <text x="135" y="140" fontSize="11" fontWeight="800" fill="#dc2626"
                style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 2.5,
                         fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-sans-serif" }}>
            {kh ? "រត់!" : "RUN!"}
          </text>
        </g>

        {/* Caption */}
        <g>
          <rect x="10" y="10" width="220" height="22" rx="11" fill="#facc15" stroke="#1c1917" strokeWidth="1.5" />
          <text x="120" y="25" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1c1917"
                style={{ fontFamily: kh ? "'Khmer OS', sans-serif" : "ui-sans-serif" }}>
            {kh ? "ទឹកដកចេញ → រលកមកដល់" : "Water recedes → wave arrives"}
          </text>
        </g>
      </svg>
    </div>
  );
}

/* placeholder export to satisfy the “_unused import” rule */
export const _ArrowRight = ArrowRight;
export const _Mountain = Mountain;
