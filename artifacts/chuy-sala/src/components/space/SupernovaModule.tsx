import {
  Bomb, Scale, Skull, Sparkles, Star,
  Zap, Magnet, CircleDot, Atom, Heart, Bone, Gem,
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
        <div className="w-8 h-8 rounded-lg bg-fuchsia-400/15 border border-fuchsia-300/40 flex items-center justify-center text-fuchsia-200">
          {icon}
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h3>
      </div>
      <p className={`text-white/75 text-sm leading-relaxed ml-[42px] ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? descKh : descEn}
      </p>
    </div>
  );
}

// ── 1. The Great Imbalance ───────────────────────────────────────────────

function ImbalancePanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";
  return (
    <div className="rounded-3xl border border-fuchsia-300/20 bg-gradient-to-br from-[#1a0533] via-[#2b0d4f] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Scale className="w-4 h-4" />}
        en="The Great Imbalance"
        kh="តុល្យភាពនៃកម្លាំង"
        lang={lang}
        descEn="Every star is a constant war between two opposing forces. Gravity squeezes inward, trying to crush the star into a single point. Nuclear fusion at the core pushes outward, trying to blow it apart. For billions of years these forces are perfectly balanced — that is what we see as a steady, shining star. But when the fuel runs out, fusion stops. Gravity wins instantly. The star collapses on itself in seconds, then 'bounces' off its own ultra-dense core and unleashes a shockwave that tears the star apart in a single, blinding explosion: a supernova."
        descKh="ផ្កាយគ្រប់គ្នា គឺជាសង្គ្រាមមិនឈប់ឈរ រវាងកម្លាំងពីរ ដែលប្រឆាំងគ្នា។ កម្លាំងទំនាញ ច្របាច់ចូលក្នុង ដោយព្យាយាមបុកផ្កាយ ឱ្យក្លាយជាចំណុចតែមួយ។ ការរលាយនុយក្លេអ៊ែរ នៅស្នូលផ្កាយ រុញចេញក្រៅ ដោយព្យាយាមផ្ទុះវាចេញ។ អស់ពីរាប់ពាន់លានឆ្នាំ កម្លាំងទាំងពីរ ស្ថិតក្នុងតុល្យភាពយ៉ាងល្អឥតខ្ចោះ — នោះជាអ្វីដែលយើងឃើញ ជាផ្កាយបញ្ចេញពន្លឺនឹងថ្កុល។ ប៉ុន្តែនៅពេលឥន្ធនៈអស់ ការរលាយឈប់។ កម្លាំងទំនាញឈ្នះភ្លាមៗ។ ផ្កាយដួលរលំលើខ្លួនវា ត្រឹមតែវិនាទី បន្ទាប់មក « លោត » ចេញពីស្នូលដ៏ក្រាស់ខ្លាំង របស់ខ្លួនវា ហើយបញ្ចេញរលករំញ័រ ដែលហែកផ្កាយជាបំណែកៗ ក្នុងការផ្ទុះតែមួយ ដ៏ភ្លឺច្រាល៖ ស៊ូពើណូវ៉ា។"
      />

      {/* Tug-of-war diagram */}
      <div className="rounded-2xl border border-fuchsia-300/25 bg-black/40 p-5" data-testid="forces-balance">
        <h4 className={`text-sm font-bold text-fuchsia-100 mb-3 text-center ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "សង្គ្រាមនៅខាងក្នុងផ្កាយ" : "The war inside every star"}
        </h4>
        <svg viewBox="0 0 600 220" className="w-full h-auto" aria-label={aria("Gravity pulling inward versus nuclear fusion pushing outward", "កម្លាំងទំនាញទាញចូលក្នុង ធៀបនឹងការរលាយនុយក្លេអ៊ែររុញចេញក្រៅ", lang)}>
          <defs>
            <radialGradient id="ib-star" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#fff7ed" />
              <stop offset="35%" stopColor="#fb923c" />
              <stop offset="80%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
          </defs>

          {/* Star at centre */}
          <circle cx="300" cy="110" r="55" fill="url(#ib-star)" />
          <circle cx="300" cy="110" r="55" fill="none" stroke="#fde68a" strokeWidth="0.5" opacity="0.5" />

          {/* Gravity arrows pointing INWARD (4 arrows, blue) */}
          <g stroke="#60a5fa" strokeWidth="2" fill="#60a5fa">
            <line x1="120" y1="110" x2="225" y2="110" />
            <polygon points="225,110 215,105 215,115" />
            <line x1="480" y1="110" x2="375" y2="110" />
            <polygon points="375,110 385,105 385,115" />
            <line x1="300" y1="20" x2="300" y2="45" />
            <polygon points="300,45 295,35 305,35" />
            <line x1="300" y1="200" x2="300" y2="175" />
            <polygon points="300,175 295,185 305,185" />
          </g>
          <text x="80" y="115" fontSize="11" fill="#60a5fa" fontWeight="700" textAnchor="end">{isKh ? "កម្លាំងទំនាញ" : "GRAVITY"}</text>
          <text x="80" y="128" fontSize="9" fill="#93c5fd" textAnchor="end">{isKh ? "ច្របាច់ចូល" : "crushes in"}</text>

          {/* Fusion arrows pointing OUTWARD from inside (orange, smaller, going out from edges) */}
          <g stroke="#fb923c" strokeWidth="2" fill="#fb923c" opacity="0.95">
            <line x1="270" y1="110" x2="240" y2="110" />
            <polygon points="240,110 250,105 250,115" />
            <line x1="330" y1="110" x2="360" y2="110" />
            <polygon points="360,110 350,105 350,115" />
            <line x1="300" y1="80"  x2="300" y2="55" />
            <polygon points="300,55 295,65 305,65" />
            <line x1="300" y1="140" x2="300" y2="165" />
            <polygon points="300,165 295,155 305,155" />
          </g>
          <text x="520" y="115" fontSize="11" fill="#fb923c" fontWeight="700">{isKh ? "ការរលាយ" : "FUSION"}</text>
          <text x="520" y="128" fontSize="9" fill="#fed7aa">{isKh ? "រុញចេញក្រៅ" : "pushes out"}</text>
        </svg>

        <p className={`mt-3 text-xs text-fuchsia-100/80 text-center italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
          {isKh
            ? "ពេលឥន្ធនៈអស់ — ការរលាយបាត់ និងកម្លាំងទំនាញ ឈ្នះក្នុងវិនាទី"
            : "When the fuel runs out, fusion stops — and gravity wins in seconds."}
        </p>
      </div>
    </div>
  );
}

// ── 2. Two Paths to an Explosion ─────────────────────────────────────────

function PathsPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-fuchsia-300/20 bg-gradient-to-br from-[#1a0533] via-[#2b0d4f] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Bomb className="w-4 h-4" />}
        en="Two Paths to an Explosion"
        kh="ផ្លូវពីរឆ្ពោះទៅរកការផ្ទុះ"
        lang={lang}
        descEn="There are two completely different ways a star can become a supernova. One is a small dead star that steals fuel from a partner. The other is a giant star that simply runs out of fuel by itself. Both end in one of the most violent explosions in the universe — for a few weeks, a single supernova can outshine an entire galaxy of 100 billion stars."
        descKh="មានវិធីពីរ ខុសគ្នាទាំងស្រុង ដែលផ្កាយ អាចក្លាយជាស៊ូពើណូវ៉ា។ ទីមួយ ជាផ្កាយតូចស្លាប់ ដែលលួចឥន្ធនៈ ពីផ្កាយដៃគូ។ ទីពីរ ជាផ្កាយយក្ស ដែលគ្រាន់តែអស់ឥន្ធនៈ ដោយខ្លួនឯង។ ទាំងពីរ បញ្ចប់ដោយការផ្ទុះ ដ៏សាហាវបំផុតក្នុងសកលលោក — ត្រឹមតែប៉ុន្មានសប្តាហ៍ ស៊ូពើណូវ៉ាមួយ អាចភ្លឺជាងហ្គាឡាក់ស៊ីមួយ ដែលមានផ្កាយ ១០០ ប៊ីលាន។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Type Ia — White Dwarf Theft */}
        <div className="rounded-2xl border border-fuchsia-300/25 bg-black/40 p-5" data-testid="type-i-theft">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-300/30 text-rose-200 text-[10px] font-mono font-bold">{isKh ? "ប្រភេទ I" : "TYPE I"}</span>
            <h4 className={`text-sm font-bold text-fuchsia-100 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ការលួចគ្នា — ផ្កាយតូចស" : "White Dwarf Theft"}
            </h4>
          </div>

          <svg viewBox="0 0 320 160" className="w-full h-auto mb-3" aria-label={aria("White dwarf siphoning gas from a companion star until it explodes", "ផ្កាយតូចស ស្រូបឧស្ម័នពីផ្កាយដៃគូ រហូតវាផ្ទុះ", lang)}>
            <defs>
              <radialGradient id="ti-comp" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#fef9c3" />
                <stop offset="55%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#b45309" />
              </radialGradient>
              <radialGradient id="ti-wd" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="80%" stopColor="#e0e7ff" />
                <stop offset="100%" stopColor="#6366f1" />
              </radialGradient>
              <linearGradient id="ti-stream" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"  stopColor="#fbbf24" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Stars in background */}
            {[[20,20],[120,15],[230,25],[290,30],[40,140],[280,140]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="1" fill="#fff" opacity="0.5" />
            ))}

            {/* Companion (giant, donor) */}
            <circle cx="60" cy="80" r="32" fill="url(#ti-comp)" />
            <text x="60" y="135" textAnchor="middle" fontSize="9" fill="#fcd34d" fontWeight="700">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ផ្កាយដៃគូ" : "companion"}</tspan>
            </text>

            {/* Stream of gas (curved) */}
            <path d="M 90 75 Q 160 30 240 75" fill="none" stroke="url(#ti-stream)" strokeWidth="6" />
            <path d="M 90 75 Q 160 30 240 75" fill="none" stroke="#fde68a" strokeWidth="0.6" opacity="0.7" strokeDasharray="2 2" />

            {/* White dwarf (small, accreting) */}
            <circle cx="250" cy="80" r="8" fill="url(#ti-wd)" />
            <circle cx="250" cy="80" r="14" fill="none" stroke="#a5b4fc" strokeWidth="0.6" opacity="0.5" strokeDasharray="2 2" />
            <text x="250" y="135" textAnchor="middle" fontSize="9" fill="#c7d2fe" fontWeight="700">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ផ្កាយតូចស" : "white dwarf"}</tspan>
            </text>

            {/* "BOOM" hint */}
            <text x="250" y="35" textAnchor="middle" fontSize="11" fill="#f87171" fontWeight="900">💥</text>
          </svg>

          <p className={`text-xs text-white/80 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ផ្កាយតូចស — ជាស្លាកសេសសល់ ពីផ្កាយដែលស្លាប់ហើយ — ស្រូបឧស្ម័នពីផ្កាយដៃគូ បន្តិចម្តងៗ។ នៅពេលវាធ្វេសពេក វាក្លាយជាមិនស្ថិតស្ថេរ ហើយផ្ទុះដូចគ្រាប់បែកនុយក្លេអ៊ែរ ដ៏ធំសម្បើម។"
              : "A white dwarf — the leftover core of a dead star — slowly siphons gas off its larger partner. Once it grows too heavy, it becomes unstable and detonates like one giant nuclear bomb."}
          </p>
        </div>

        {/* Type II — Core Collapse */}
        <div className="rounded-2xl border border-fuchsia-300/25 bg-black/40 p-5" data-testid="type-ii-collapse">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded-md bg-orange-500/20 border border-orange-300/30 text-orange-200 text-[10px] font-mono font-bold">{isKh ? "ប្រភេទ II" : "TYPE II"}</span>
            <h4 className={`text-sm font-bold text-fuchsia-100 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ការដួលនៃស្នូល — ផ្កាយយក្ស" : "The Core Collapse"}
            </h4>
          </div>

          <svg viewBox="0 0 320 160" className="w-full h-auto mb-3" aria-label={aria("Three stages: massive star, iron core collapse, supernova explosion", "បីដំណាក់កាល៖ ផ្កាយយក្ស ស្នូលដែកដួល និងការផ្ទុះស៊ូពើណូវ៉ា", lang)}>
            <defs>
              <radialGradient id="t2-massive" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%"  stopColor="#fff" />
                <stop offset="40%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
              <radialGradient id="t2-iron" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%"  stopColor="#cbd5e1" />
                <stop offset="80%" stopColor="#475569" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>
              <radialGradient id="t2-boom" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%"  stopColor="#fff" />
                <stop offset="25%" stopColor="#fde68a" />
                <stop offset="55%" stopColor="#fb923c" />
                <stop offset="85%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#1a0533" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 3 frames left to right */}
            <g>
              <circle cx="55" cy="80" r="32" fill="url(#t2-massive)" />
              <text x="55" y="135" textAnchor="middle" fontSize="9" fill="#bfdbfe" fontWeight="700">
                <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ផ្កាយយក្ស" : "massive star"}</tspan>
              </text>
              <text x="55" y="148" textAnchor="middle" fontSize="8" fill="#cbd5e1">
                <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "៨× ព្រះអាទិត្យ+" : "8× Sun+"}</tspan>
              </text>
            </g>

            <text x="115" y="85" fontSize="14" fill="#a5b4fc">→</text>

            <g>
              <circle cx="160" cy="80" r="10" fill="url(#t2-iron)" />
              <g stroke="#94a3b8" strokeWidth="1.5" fill="#94a3b8">
                <line x1="138" y1="80" x2="148" y2="80" />
                <polygon points="148,80 144,77 144,83" />
                <line x1="182" y1="80" x2="172" y2="80" />
                <polygon points="172,80 176,77 176,83" />
                <line x1="160" y1="58" x2="160" y2="68" />
                <polygon points="160,68 157,64 163,64" />
                <line x1="160" y1="102" x2="160" y2="92" />
                <polygon points="160,92 157,96 163,96" />
              </g>
              <text x="160" y="135" textAnchor="middle" fontSize="9" fill="#cbd5e1" fontWeight="700">
                <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ស្នូលដែកដួល" : "iron core collapse"}</tspan>
              </text>
            </g>

            <text x="220" y="85" fontSize="14" fill="#a5b4fc">→</text>

            <g>
              <circle cx="265" cy="80" r="40" fill="url(#t2-boom)" />
              <circle cx="265" cy="80" r="3" fill="#fff" />
              <text x="265" y="135" textAnchor="middle" fontSize="9" fill="#fcd34d" fontWeight="700">
                <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ស៊ូពើណូវ៉ា!" : "supernova!"}</tspan>
              </text>
            </g>
          </svg>

          <p className={`text-xs text-white/80 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ផ្កាយយក្ស (យ៉ាងហោចណាស់ ៨ ដង ធំជាងព្រះអាទិត្យ) ដុតឥន្ធនៈរបស់វាអស់។ ស្នូលដែករបស់វា ដួលរលំក្នុងវិនាទី បន្ទាប់មក លោតចេញ — ផ្កាយផ្ទុះចេញ ជាបំណែកៗ បាញ់ចេញដោយល្បឿនរាប់ម៉ឺនគម/វិនាទី។"
              : "A massive star (at least 8× heavier than our Sun) burns through its fuel. Its iron core collapses in a single second, then bounces — and the whole star is blown apart, hurled outward at tens of thousands of km per second."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 3. Origin of You ─────────────────────────────────────────────────────

function OriginPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  const elements = [
    { Icon: Heart, en: "Iron in your blood", kh: "ដែក នៅក្នុងឈាមអ្នក", color: "from-rose-700 to-rose-300" },
    { Icon: Bone,  en: "Calcium in your bones", kh: "កាល់ស្យូម នៅក្នុងឆ្អឹងអ្នក", color: "from-amber-700 to-amber-300" },
    { Icon: Gem,   en: "Gold in your jewelry",  kh: "មាស នៅក្នុងគ្រឿងអលង្ការ",       color: "from-yellow-700 to-yellow-200" },
  ];

  return (
    <div className="rounded-3xl border border-fuchsia-300/20 bg-gradient-to-br from-[#1a0533] via-[#2b0d4f] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Sparkles className="w-4 h-4" />}
        en="The Origin of You"
        kh="ប្រភពដើមនៃខ្លួនអ្នក"
        lang={lang}
        descEn="The Big Bang only made the lightest elements — hydrogen and helium. Everything heavier — including every atom in your body, your school, this planet, and the air you breathe — was forged inside stars and then scattered across space by supernovas. Without supernova explosions billions of years ago, none of these heavy elements would exist. There would be no rocky planets. No oceans. No life. No you. As the astronomer Carl Sagan said: 'We are made of starstuff.'"
        descKh="មហាបាញ់ផ្ទុះ បានបង្កើតតែធាតុស្រាលៗ — ហ្ស៊ីដ្រូសែន និងអេលីយ៉ូម ប៉ុណ្ណោះ។ អ្វីៗដែលធ្ងន់ជាង — រួមទាំងអាតូមគ្រប់គ្នា ក្នុងរូបកាយអ្នក សាលារៀន ភពនេះ និងខ្យល់ដែលអ្នកដកដង្ហើម — ត្រូវបានសាងសង់នៅខាងក្នុងផ្កាយ ហើយបន្ទាប់មក ត្រូវបានបាញ់ខ្ចាយក្នុងអវកាស ដោយស៊ូពើណូវ៉ា។ បើគ្មានការផ្ទុះស៊ូពើណូវ៉ា កាលពីរាប់ពាន់លានឆ្នាំមុន គ្មានធាតុធ្ងន់ទាំងនេះ នឹងមាននោះទេ។ គ្មានភពថ្មទេ។ គ្មានសមុទ្រទេ។ គ្មានជីវិតទេ។ គ្មានអ្នកទេ។ ដូចតារាវិទូ ខាល សាហ្គាន បាននិយាយ៖ « យើងធ្វើពីសារធាតុផ្កាយ »។"
      />

      {/* Element forge diagram */}
      <div className="rounded-2xl border border-fuchsia-300/25 bg-black/40 p-5 mb-4" data-testid="element-forge">
        <h4 className={`text-sm font-bold text-fuchsia-100 mb-3 text-center ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "រោងជាងនៃធាតុ — ផ្កាយ ផលិតធាតុធ្ងន់" : "The element forge — stars build heavy elements"}
        </h4>
        <svg viewBox="0 0 600 160" className="w-full h-auto" aria-label={aria("From hydrogen to iron to a supernova that scatters heavy elements into space", "ពីហ្ស៊ីដ្រូសែន ទៅដែក ទៅស៊ូពើណូវ៉ា ដែលខ្ចាយធាតុធ្ងន់ ក្នុងអវកាស", lang)}>
          <defs>
            <radialGradient id="ef-burst" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#fff" />
              <stop offset="40%" stopColor="#fb923c" />
              <stop offset="80%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#1a0533" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Step labels along the bottom */}
          {[
            { x: 70,  label: "H · He",           kh: "H · He" },
            { x: 200, label: "C · N · O",        kh: "C · N · O" },
            { x: 330, label: "Si · S · Fe",      kh: "Si · S · Fe" },
            { x: 470, label: isKh ? "ស៊ូពើណូវ៉ា — Au, Ag, U …" : "SUPERNOVA → Au, Ag, U …", kh: "ស៊ូពើណូវ៉ា — Au, Ag, U …" },
          ].map((s, i) => (
            <g key={i}>
              <circle cx={s.x} cy="60" r={20 + i * 6} fill={i < 3 ? `rgba(251,146,60,${0.25 + i * 0.2})` : "url(#ef-burst)"} stroke={i < 3 ? "#fb923c" : "none"} strokeWidth="0.5" />
              <text x={s.x} y="115" textAnchor="middle" fontSize="11" fill="#fde68a" fontWeight="700" fontFamily="monospace">{s.label}</text>
              <text x={s.x} y="135" textAnchor="middle" fontSize="9" fill="#cbd5e1">
                <tspan className={isKh ? "font-khmer" : ""}>
                  {i === 0 && (isKh ? "មហាបាញ់ផ្ទុះ" : "Big Bang")}
                  {i === 1 && (isKh ? "ផ្កាយវ័យក្មេង" : "young stars")}
                  {i === 2 && (isKh ? "ផ្កាយចាស់" : "old stars")}
                  {i === 3 && (isKh ? "ខ្ចាយក្នុងអវកាស" : "scattered into space")}
                </tspan>
              </text>
            </g>
          ))}

          {/* Connecting arrows */}
          {[120, 250, 390].map((x, i) => (
            <g key={i} stroke="#fcd34d" strokeWidth="1.2" fill="#fcd34d">
              <line x1={x} y1="60" x2={x + 30} y2="60" />
              <polygon points={`${x + 30},60 ${x + 22},56 ${x + 22},64`} />
            </g>
          ))}
        </svg>
      </div>

      {/* Starstuff cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-testid="starstuff">
        {elements.map((e, i) => {
          const Icon = e.Icon;
          return (
            <div key={i} className="rounded-xl border border-fuchsia-300/25 bg-black/40 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${e.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className={`text-sm font-semibold text-white ${isKh ? "font-khmer leading-snug" : ""}`}>
                  {isKh ? e.kh : e.en}
                </p>
              </div>
              <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${e.color}`} style={{ width: "100%" }} />
              </div>
              <p className={`mt-2 text-[10px] text-fuchsia-200/70 italic text-center ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
                {isKh ? "ផលិតក្នុងស៊ូពើណូវ៉ា" : "made in a supernova"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-md bg-fuchsia-500/10 border border-fuchsia-300/20 p-3">
        <p className={`text-fuchsia-100/85 text-xs leading-relaxed text-center italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
          {isKh
            ? "« យើងធ្វើពីសារធាតុផ្កាយ »  —  ខាល សាហ្គាន"
            : "“We are made of starstuff.”  —  Carl Sagan"}
        </p>
      </div>
    </div>
  );
}

// ── 4. What's Left Behind — Before/After + remnants ──────────────────────

function RemnantsPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-fuchsia-300/20 bg-gradient-to-br from-[#1a0533] via-[#2b0d4f] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Skull className="w-4 h-4" />}
        en="What is Left Behind?"
        kh="តើមានអ្វីនៅសេសសល់?"
        lang={lang}
        descEn="After the explosion fades, two things remain: a glowing cloud of debris called a supernova remnant — and at the very centre, the squashed-down core. Depending on how heavy the original star was, that core becomes either a Neutron Star — so dense that a matchbox-sized piece would weigh as much as Mount Everest — or, if the star was truly enormous, a Black Hole, where gravity is so strong that not even light can escape."
        descKh="បន្ទាប់ពីការផ្ទុះរសាយ មានរបស់ពីរនៅសេសសល់៖ ពពកសំណល់ផ្ទុះ ដែលបញ្ចេញពន្លឺ ហៅថា សំណល់ស៊ូពើណូវ៉ា — និងនៅចំកណ្តាល ស្នូលដែលត្រូវបានច្របាច់ ឱ្យតូច។ អាស្រ័យលើទម្ងន់ផ្កាយដើម ស្នូលនោះនឹងក្លាយជា ផ្កាយនឺត្រុង — ក្រាស់ខ្លាំងណាស់ បំណែកប៉ុនប្រអប់ឈើគូស នឹងធ្ងន់ស្មើភ្នំអេវ៉ឺរ៉េស្ត — ឬប្រសិនបើផ្កាយដើមធំខ្លាំង វាក្លាយជា រន្ធខ្មៅ ដែលកម្លាំងទំនាញខ្លាំងណាស់ សូម្បីតែពន្លឺ ក៏មិនអាចគេចចេញ។"
      />

      {/* Before & After: Crab Nebula style */}
      <div className="rounded-2xl border border-fuchsia-300/25 bg-black/40 p-5 mb-5" data-testid="before-after">
        <h4 className={`text-sm font-bold text-fuchsia-100 mb-4 text-center ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "មុន និងក្រោយ — ឧទាហរណ៍ អ័ព្ទក្តាម" : "Before & After — like the Crab Nebula"}
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <svg viewBox="-100 -100 200 200" className="w-full h-auto" aria-label={aria("A massive blue star before the supernova", "ផ្កាយយក្សពណ៌ខៀវ មុនការផ្ទុះស៊ូពើណូវ៉ា", lang)}>
              <defs>
                <radialGradient id="ba-star" cx="0.4" cy="0.4" r="0.6">
                  <stop offset="0%"  stopColor="#fff" />
                  <stop offset="35%" stopColor="#bfdbfe" />
                  <stop offset="80%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </radialGradient>
              </defs>
              {/* Stars */}
              {[[-90,-80],[60,-70],[80,80],[-70,70],[-30,-90],[90,30]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="1" fill="#fff" opacity="0.6" />
              ))}
              {/* Glow halo */}
              <circle cx="0" cy="0" r="80" fill="#3b82f6" opacity="0.08" />
              <circle cx="0" cy="0" r="60" fill="#3b82f6" opacity="0.12" />
              {/* Star */}
              <circle cx="0" cy="0" r="50" fill="url(#ba-star)" />
              {/* Spikes */}
              <g stroke="#dbeafe" strokeWidth="1" opacity="0.7">
                <line x1="-90" y1="0" x2="-55" y2="0" />
                <line x1="90"  y1="0" x2="55"  y2="0" />
                <line x1="0" y1="-90" x2="0" y2="-55" />
                <line x1="0" y1="90"  x2="0" y2="55" />
              </g>
            </svg>
            <p className={`mt-2 text-center text-sm font-bold text-blue-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "មុន — ផ្កាយយក្ស" : "BEFORE — massive star"}
            </p>
            <p className={`text-center text-[10px] text-blue-300/70 italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
              {isKh ? "ភ្លឺ ហើយសម្រាក" : "bright and stable"}
            </p>
          </div>

          <div>
            <svg viewBox="-100 -100 200 200" className="w-full h-auto" aria-label={aria("A glowing supernova remnant nebula with a tiny neutron star at the centre", "ពពកសំណល់ស៊ូពើណូវ៉ា ដែលបញ្ចេញពន្លឺ មានផ្កាយនឺត្រុង នៅកណ្តាល", lang)}>
              <defs>
                <radialGradient id="ba-neb" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%"  stopColor="#fef3c7" stopOpacity="0.2" />
                  <stop offset="35%" stopColor="#fb923c" stopOpacity="0.55" />
                  <stop offset="65%" stopColor="#a855f7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1a0533" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Background stars */}
              {[[-90,-80],[60,-70],[80,80],[-70,70],[-30,-90],[90,30],[-50,30],[40,50]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="1" fill="#fff" opacity="0.6" />
              ))}
              {/* Nebula glow */}
              <ellipse cx="0" cy="0" rx="85" ry="70" fill="url(#ba-neb)" />
              {/* Wispy filaments */}
              <g stroke="#fbcfe8" strokeWidth="0.8" fill="none" opacity="0.65">
                <path d="M -75 -10 Q -30 -60 30 -50 Q 70 -30 80 10" />
                <path d="M -80 20 Q -20 50 40 60 Q 75 50 78 25" />
                <path d="M -60 -50 Q 0 -30 60 -55" />
                <path d="M -55 60 Q 10 35 65 55" />
              </g>
              <g stroke="#fde68a" strokeWidth="0.6" fill="none" opacity="0.6">
                <path d="M -65 -30 Q -10 -10 50 -35" />
                <path d="M -60 40 Q 0 60 70 35" />
              </g>
              {/* Tiny neutron star at the centre */}
              <circle cx="0" cy="0" r="2.5" fill="#fff" />
              <circle cx="0" cy="0" r="6" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.4" />
            </svg>
            <p className={`mt-2 text-center text-sm font-bold text-fuchsia-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ក្រោយ — សំណល់ផ្ទុះ" : "AFTER — supernova remnant"}
            </p>
            <p className={`text-center text-[10px] text-fuchsia-300/70 italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
              {isKh ? "ពន្លឺ ហើយចេចវេច — មានស្នូលតូច នៅចំកណ្តាល" : "glowing & expanding — tiny core at the centre"}
            </p>
          </div>
        </div>
      </div>

      {/* Two remnant types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="remnant-types">
        <div className="rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-950/40 to-indigo-950/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-400/20 border border-cyan-300/40 flex items-center justify-center text-cyan-100">
              <Magnet className="w-4 h-4" />
            </div>
            <h4 className={`text-sm font-bold text-cyan-100 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ផ្កាយនឺត្រុង" : "Neutron Star"}
            </h4>
          </div>
          <p className={`text-xs text-white/85 leading-relaxed mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ស្នូលច្របាច់ដួល ឱ្យតូចឆ្ងាយ — ស្ថិតជាបាល់ ត្រឹមតែ ២០ គម កាត់ ប៉ុន្តែផ្ទុកម៉ាស់ ច្រើនជាងព្រះអាទិត្យ។ បំណែកប៉ុនប្រអប់ឈើគូស នឹងមានទម្ងន់ស្មើភ្នំអេវ៉ឺរ៉េស្ត។"
              : "The crushed-down core, no bigger than a city — only 20 km across — but heavier than the Sun. A matchbox-sized piece would weigh as much as Mount Everest."}
          </p>
          <div className="rounded-md bg-cyan-500/10 border border-cyan-300/25 p-2 text-center">
            <span className={`text-[10px] font-mono text-cyan-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "១ ស្លាបព្រា ≈ ៦ ពាន់លាន តោន" : "1 teaspoon ≈ 6 billion tonnes"}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-950/40 to-black p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-100">
              <CircleDot className="w-4 h-4" />
            </div>
            <h4 className={`text-sm font-bold text-violet-100 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "រន្ធខ្មៅ" : "Black Hole"}
            </h4>
          </div>
          <p className={`text-xs text-white/85 leading-relaxed mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "បើផ្កាយដើមធំពេក សូម្បីតែផ្កាយនឺត្រុង មិនអាចទប់នឹងកម្លាំងទំនាញ។ វាបន្តដួលរហូតក្លាយជារន្ធខ្មៅ — តំបន់នៃកម្លាំងទំនាញខ្លាំងមហិមា ដែលគ្មានអ្វី សូម្បីតែពន្លឺ ក៏អាចគេចចេញបាន។"
              : "If the original star was truly massive, even a neutron star can't hold up against gravity. It keeps collapsing until it becomes a black hole — a region of gravity so extreme that nothing, not even light, can escape it."}
          </p>
          <div className="rounded-md bg-violet-500/10 border border-violet-300/25 p-2 text-center">
            <span className={`text-[10px] font-mono text-violet-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ល្បឿនរត់គេច > ល្បឿនពន្លឺ" : "escape velocity > speed of light"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main wrapper ─────────────────────────────────────────────────────────

export function SupernovaModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="supernova-module"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-fuchsia-400/15 border border-fuchsia-300/30 flex items-center justify-center text-fuchsia-200">
            <Star className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-fuchsia-100 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Supernova: The Death and Rebirth of Stars", "ស៊ូពើណូវ៉ា៖ ការស្លាប់ និងការចាប់កំណើតឡើងវិញនៃផ្កាយ")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-fuchsia-300/30 to-transparent" />
      </div>

      <div
        className="rounded-3xl border border-fuchsia-300/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(168,85,247,0.18) 0%,rgba(124,58,237,0.4) 35%,rgba(251,146,60,0.25) 70%,rgba(0,0,0,0.95) 100%)",
          boxShadow: "0 0 40px rgba(168,85,247,0.25) inset",
        }}
      >
        <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-orange-700/30 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-5 items-center">
          <div className="flex justify-center">
            <svg viewBox="-80 -80 160 160" className="w-40 h-40" aria-hidden>
              <defs>
                <radialGradient id="hero-boom" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%"  stopColor="#fff" />
                  <stop offset="20%" stopColor="#fde68a" />
                  <stop offset="50%" stopColor="#fb923c" />
                  <stop offset="80%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#1a0533" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="0" cy="0" r="65" fill="url(#hero-boom)" />
              <circle cx="0" cy="0" r="4" fill="#fff" />
              <g stroke="#fde68a" strokeWidth="1" opacity="0.7">
                <line x1="-75" y1="0"   x2="-15" y2="0" />
                <line x1="75"  y1="0"   x2="15"  y2="0" />
                <line x1="0"   y1="-75" x2="0"   y2="-15" />
                <line x1="0"   y1="75"  x2="0"   y2="15" />
                <line x1="-55" y1="-55" x2="-12" y2="-12" />
                <line x1="55"  y1="55"  x2="12"  y2="12" />
                <line x1="-55" y1="55"  x2="-12" y2="12" />
                <line x1="55"  y1="-55" x2="12"  y2="-12" />
              </g>
            </svg>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#fde68a 0%,#fb923c 40%,#a855f7 75%,#f0abfc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(168,85,247,0.4)",
              }}
            >
              {t("The Death That Makes Us Possible", "ការស្លាប់ដែលធ្វើឱ្យយើងមាន")}
            </h2>
            <p className={`text-white/85 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "When a star dies, it can outshine 100 billion stars for a few weeks — and in those few weeks it forges and scatters every heavy element that will ever exist. The iron in your blood, the calcium in your bones, the gold in a wedding ring — all built in a star's last, brilliant scream.",
                "នៅពេលផ្កាយស្លាប់ វាអាចភ្លឺជាងផ្កាយ ១០០ ប៊ីលាន ត្រឹមតែប៉ុន្មានសប្តាហ៍ — ហើយក្នុងប៉ុន្មានសប្តាហ៍នោះ វាបង្កើត និងខ្ចាយធាតុធ្ងន់គ្រប់គ្នា ដែលនឹងមាននៅទីបំផុត។ ដែកនៅក្នុងឈាមអ្នក កាល់ស្យូមនៅក្នុងឆ្អឹងអ្នក មាសក្នុងចិញ្ចៀនមង្គលការ — ទាំងអស់សុទ្ធតែសាងសង់ក្នុងសម្រែកចុងក្រោយ ដ៏ភ្លឺច្រាល របស់ផ្កាយ។",
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6"><ImbalancePanel lang={lang} /></div>
      <div className="mb-6"><PathsPanel lang={lang} /></div>
      <div className="mb-6"><OriginPanel lang={lang} /></div>
      <RemnantsPanel lang={lang} />

      <p className={`mt-5 text-center text-fuchsia-100/75 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "A star's death is the beginning of everything else — every atom, every planet, every breath. We are the ash of stars that died long before us.",
          "ការស្លាប់របស់ផ្កាយ ជាការចាប់ផ្តើមនៃអ្វីៗគ្រប់យ៉ាង — អាតូមគ្រប់គ្នា ភពគ្រប់គ្នា ដង្ហើមគ្រប់គ្នា។ យើងជាផេះនៃផ្កាយ ដែលបានស្លាប់ ជាយូរឆ្ងាយ មុនយើង។",
        )}
      </p>

      {/* keep unused icons quiet */}
      <span className="hidden">{(() => { void Zap; void Atom; return null; })()}</span>
    </section>
  );
}
