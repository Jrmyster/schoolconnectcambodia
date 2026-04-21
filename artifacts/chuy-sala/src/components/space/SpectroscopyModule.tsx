import { useState } from "react";
import {
  Rainbow, Telescope, Atom, Sparkles, Globe2, Info,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

const ELEMENTS = [
  {
    id: "H",
    nameEn: "Hydrogen",
    nameKh: "អ៊ីដ្រូសែន",
    symbol: "H",
    color: "#ff4d6d",
    blurbEn: "The most common element in the Universe — fuel of every star.",
    blurbKh: "ធាតុដែលមានច្រើនជាងគេនៅក្នុងចក្រវាល — ឥន្ធនៈនៃផ្កាយគ្រប់ផ្កាយ។",
    lines: [21, 38, 56, 71, 84],
  },
  {
    id: "O",
    nameEn: "Oxygen",
    nameKh: "អុកស៊ីសែន",
    symbol: "O",
    color: "#22d3ee",
    blurbEn: "What you breathe — and a major sign of life on a planet.",
    blurbKh: "អ្វីដែលអ្នកដកដង្ហើម — ហើយជាសញ្ញាសំខាន់នៃជីវិតនៅលើភពមួយ។",
    lines: [12, 28, 41, 49, 62, 78, 89],
  },
  {
    id: "C",
    nameEn: "Carbon",
    nameKh: "កាបូន",
    symbol: "C",
    color: "#fbbf24",
    blurbEn: "The backbone of all known life — and of every organic molecule.",
    blurbKh: "ឆ្អឹងខ្នងនៃជីវិតទាំងអស់ដែលគេស្គាល់ — និងនៃម៉ូលេគុលសរីរាង្គទាំងអស់។",
    lines: [18, 33, 47, 60, 74, 92],
  },
] as const;

// ── Section header (matches Space-page section vibe) ────────────────────────

function ModuleHeader({
  icon, en, kh, lang, descEn, descKh,
}: {
  icon: React.ReactNode; en: string; kh: string; lang: Lang;
  descEn: string; descKh: string;
}) {
  const isKh = lang === "kh";
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-lg bg-fuchsia-500/15 border border-fuchsia-400/40 flex items-center justify-center text-fuchsia-300">
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

// ── 1. Continuous spectrum bar with optional black absorption lines ─────────

function SpectrumBar({
  lines,
  height = 28,
  glowColor,
}: {
  lines?: readonly number[];
  height?: number;
  glowColor?: string;
}) {
  return (
    <div
      className="relative w-full rounded-md overflow-hidden border border-white/10"
      style={{
        height,
        background:
          "linear-gradient(90deg,#7e22ce 0%,#3b82f6 18%,#06b6d4 35%,#10b981 52%,#facc15 70%,#f97316 86%,#dc2626 100%)",
        boxShadow: glowColor ? `0 0 18px ${glowColor}55` : undefined,
      }}
      data-testid="spectrum-bar"
    >
      {lines?.map((pct, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            left: `${pct}%`,
            width: "2.5px",
            background: "#000",
            boxShadow: "0 0 1px #000",
          }}
        />
      ))}
    </div>
  );
}

// ── 2. The "Light → Gas → Prism → Barcode" diagram ──────────────────────────

function PrismDiagram({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";
  return (
    <div className="rounded-3xl border border-fuchsia-400/25 bg-gradient-to-br from-[#0b0420] via-[#10052e] to-[#020010] p-5 sm:p-7">
      <div className="relative w-full max-w-[640px] mx-auto" data-testid="prism-diagram">
        <svg viewBox="0 0 640 280" className="w-full h-auto">
          <defs>
            <linearGradient id="spec-rainbow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="20%" stopColor="#3b82f6" />
              <stop offset="38%" stopColor="#06b6d4" />
              <stop offset="55%" stopColor="#10b981" />
              <stop offset="72%" stopColor="#facc15" />
              <stop offset="86%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <radialGradient id="spec-star" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="55%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="spec-gas" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0e7490" stopOpacity="0" />
            </radialGradient>
            <filter id="spec-glow">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Star */}
          <circle cx="60" cy="140" r="42" fill="url(#spec-star)" />
          <circle cx="60" cy="140" r="22" fill="#fde68a" filter="url(#spec-glow)" />

          {/* White light beam from star → gas cloud */}
          <rect x="100" y="134" width="120" height="12" fill="#f8fafc" opacity="0.85" filter="url(#spec-glow)" />

          {/* Gas cloud (absorbs colors) */}
          <ellipse cx="260" cy="140" rx="40" ry="46" fill="url(#spec-gas)" />
          <text x="260" y="218" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="600">
            {isKh ? "ពពកឧស្ម័ន" : "Gas Cloud"}
          </text>

          {/* Light continues — now slightly dimmer (some colors eaten) */}
          <rect x="300" y="134" width="100" height="12" fill="#e2e8f0" opacity="0.7" filter="url(#spec-glow)" />

          {/* Prism (triangle) */}
          <polygon
            points="400,90 470,180 400,180"
            fill="rgba(167,139,250,0.25)"
            stroke="#c4b5fd"
            strokeWidth="2"
          />
          <text x="430" y="205" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="600">
            {isKh ? "ព្រីស្ម" : "Prism"}
          </text>

          {/* Rainbow fan-out from prism */}
          <polygon points="470,178 620,72 620,108" fill="#a855f7" opacity="0.9" />
          <polygon points="470,178 620,108 620,128" fill="#3b82f6" opacity="0.9" />
          <polygon points="470,178 620,128 620,142" fill="#06b6d4" opacity="0.9" />
          <polygon points="470,178 620,142 620,154" fill="#10b981" opacity="0.9" />
          <polygon points="470,178 620,154 620,170" fill="#facc15" opacity="0.9" />
          <polygon points="470,178 620,170 620,192" fill="#f97316" opacity="0.9" />
          <polygon points="470,178 620,192 620,224" fill="#dc2626" opacity="0.9" />

          {/* Black absorption lines — drawn across the rainbow fan */}
          {[88, 102, 134, 158, 182, 210].map((y, i) => (
            <line
              key={i}
              x1="540"
              y1={y}
              x2="618"
              y2={y}
              stroke="#000"
              strokeWidth="1.5"
            />
          ))}

          {/* Star label */}
          <text x="60" y="200" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="600">
            {isKh ? "ផ្កាយ" : "Star"}
          </text>

          {/* Spectrum label */}
          <text x="588" y="252" textAnchor="middle" fill="#f0abfc" fontSize="11" fontWeight="600">
            {isKh ? "វិសាលគមស្រូប" : "Absorption Spectrum"}
          </text>
        </svg>
      </div>

      <p className={`text-white/55 text-xs text-center mt-3 max-w-md mx-auto ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh
          ? "ពន្លឺពណ៌សពីផ្កាយឆ្លងកាត់ពពកឧស្ម័ន។ អាតូមនៅក្នុងឧស្ម័ន 'ស៊ី' ពណ៌ជាក់លាក់។ ព្រីស្មបង្ហាញថាពណ៌ណាមួយត្រូវបានបាត់ — ខ្សែខ្មៅ។"
          : "White light from the star passes through a gas cloud. Atoms in the gas \"eat\" specific colors. The prism reveals which colors are missing — the dark lines."}
      </p>
    </div>
  );
}

// ── 3. Element barcode picker ───────────────────────────────────────────────

function ElementBarcode({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";
  const [active, setActive] = useState<typeof ELEMENTS[number]["id"]>("H");
  const el = ELEMENTS.find((e) => e.id === active)!;

  return (
    <div className="rounded-3xl border border-fuchsia-400/25 bg-gradient-to-br from-[#0b0420] via-[#10052e] to-[#020010] p-5 sm:p-7">
      <ModuleHeader
        icon={<Atom className="w-4 h-4" />}
        en="Every Element Has a Barcode"
        kh="ធាតុនីមួយៗមានបាកូដផ្ទាល់ខ្លួន"
        lang={lang}
        descEn="Each element absorbs a unique pattern of colors. Tap an element below to see its fingerprint of dark lines — its cosmic barcode."
        descKh="ធាតុនីមួយៗស្រូបពណ៌តាមលំនាំពិសេសផ្ទាល់ខ្លួន។ ចុចលើធាតុខាងក្រោម ដើម្បីមើលស្នាមដៃនៃខ្សែខ្មៅរបស់វា — បាកូដចក្រវាល។"
      />

      <div className="flex flex-wrap gap-2 mb-5">
        {ELEMENTS.map((e) => {
          const isActive = e.id === active;
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => setActive(e.id)}
              data-testid={`element-tab-${e.id}`}
              aria-pressed={isActive}
              className={`px-4 py-2.5 rounded-xl border transition-all duration-150 flex items-center gap-2 ${
                isActive
                  ? "bg-white/10 border-white/40 -translate-y-0.5"
                  : "bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/25"
              }`}
              style={isActive ? { boxShadow: `0 0 22px ${e.color}55` } : undefined}
            >
              <span
                className="w-7 h-7 rounded-md flex items-center justify-center font-display font-bold text-sm"
                style={{
                  background: isActive ? e.color : `${e.color}22`,
                  color: isActive ? "#0b0420" : e.color,
                }}
              >
                {e.symbol}
              </span>
              <span className={`text-sm font-semibold text-white ${isKh ? "font-khmer" : ""}`}>
                {isKh ? e.nameKh : e.nameEn}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        <SpectrumBar lines={el.lines} height={36} glowColor={el.color} />
        <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/3 px-4 py-3">
          <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: el.color }} />
          <p className={`text-white/75 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? el.blurbKh : el.blurbEn}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 4. Hunting for Alien Earths — transit diagram ───────────────────────────

function TransitDiagram({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";
  return (
    <div className="rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-[#020a1a] via-[#03132e] to-[#000510] p-5 sm:p-7">
      <ModuleHeader
        icon={<Telescope className="w-4 h-4" />}
        en="Hunting for Alien Earths"
        kh="ការស្វែងរកភពផែនដីទី២"
        lang={lang}
        descEn="When a distant planet crosses in front of its star — a Transit — starlight shines through the planet's atmosphere on its way to our telescopes. The missing colors tell us exactly which gases are in that alien sky."
        descKh="ពេលភពឆ្ងាយឆ្លងកាត់មុខផ្កាយរបស់វា — ការឆ្លងកាត់ — ពន្លឺផ្កាយឆ្លងកាត់បរិយាកាសភពនោះ មុនពេលមកដល់កែវយឺតរបស់យើង។ ពណ៌ដែលបាត់ ប្រាប់យើងថាមានឧស្ម័នអ្វីខ្លះនៅលើមេឃភពចម្លែកនោះ។"
      />

      <div className="relative w-full max-w-[640px] mx-auto" data-testid="transit-diagram">
        <svg viewBox="0 0 640 240" className="w-full h-auto">
          <defs>
            <radialGradient id="spec-star2" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="55%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="spec-planet" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <radialGradient id="spec-atmo" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="70%" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
            <filter id="spec-glow2">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Stars in background */}
          {[
            [80, 30], [180, 60], [560, 25], [610, 90], [40, 200], [250, 215],
            [510, 200], [460, 50], [420, 220],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.2" fill="#e0f2fe" opacity="0.7" />
          ))}

          {/* Star */}
          <circle cx="120" cy="120" r="62" fill="url(#spec-star2)" />
          <circle cx="120" cy="120" r="38" fill="#fef08a" filter="url(#spec-glow2)" />
          <text x="120" y="208" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="600">
            {isKh ? "ផ្កាយឆ្ងាយ" : "Distant Star"}
          </text>

          {/* Planet with atmosphere — silhouetted in front of the star */}
          <circle cx="160" cy="118" r="32" fill="url(#spec-atmo)" />
          <circle cx="160" cy="118" r="20" fill="url(#spec-planet)" stroke="#0ea5e9" strokeWidth="0.6" />
          <text x="160" y="78" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="600">
            {isKh ? "បរិយាកាស" : "Atmosphere"}
          </text>

          {/* Light beam — passing through planet's atmosphere edge */}
          <rect x="200" y="116" width="280" height="6" fill="#fef9c3" opacity="0.55" filter="url(#spec-glow2)" />

          {/* Telescope on Earth side */}
          <g transform="translate(500,108)">
            <rect x="0" y="0" width="42" height="14" rx="3" fill="#94a3b8" />
            <polygon points="42,-4 64,7 42,18" fill="#cbd5e1" />
            <rect x="14" y="14" width="14" height="22" fill="#64748b" />
            <rect x="4" y="36" width="34" height="6" rx="2" fill="#475569" />
          </g>
          <text x="528" y="168" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600">
            {isKh ? "កែវយឺតផែនដី" : "Earth Telescope"}
          </text>

          {/* Spectrum strip below */}
          <linearGradient id="spec-rainbow2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="20%" stopColor="#3b82f6" />
            <stop offset="38%" stopColor="#06b6d4" />
            <stop offset="55%" stopColor="#10b981" />
            <stop offset="72%" stopColor="#facc15" />
            <stop offset="86%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <rect x="200" y="195" width="240" height="14" fill="url(#spec-rainbow2)" />
          {[18, 32, 56, 78, 112, 152, 186, 212].map((x, i) => (
            <line
              key={i}
              x1={200 + x}
              y1="195"
              x2={200 + x}
              y2="209"
              stroke="#000"
              strokeWidth="1.5"
            />
          ))}
          <text x="320" y="226" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="600">
            {isKh ? "ពណ៌ដែលបាត់ → ឧស្ម័ននៅលើភព" : "Missing colors → gases on the planet"}
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        <div className="rounded-xl border border-cyan-400/25 bg-cyan-400/5 p-4 flex items-start gap-2.5">
          <Globe2 className="w-4 h-4 text-cyan-300 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className={`text-cyan-200 font-bold text-sm mb-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ស្វែងរកទឹក" : "Search for Water"}
            </h4>
            <p className={`text-white/65 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "ចំហាយទឹកក្នុងបរិយាកាសភព ទុកស្នាមដៃរបស់វានៅលើពន្លឺផ្កាយ។"
                : "Water vapor in a planet's atmosphere leaves its fingerprint on the starlight."}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/5 p-4 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className={`text-emerald-200 font-bold text-sm mb-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "សញ្ញានៃជីវិត" : "Signs of Life"}
            </h4>
            <p className={`text-white/65 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "អុកស៊ីសែននិងមេតាន​ជាមួយគ្នា ជាសញ្ញាគួរឱ្យចាប់អារម្មណ៍ — ដែលជីវិតអាចមាន។"
                : "Oxygen and methane together would be a strong hint that life might exist there."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 5. Module wrapper ───────────────────────────────────────────────────────

export function SpectroscopyModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="spectroscopy-module"
    >
      {/* Section label — matches SpacePage's SectionLabel style */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-fuchsia-400/15 border border-fuchsia-400/30 flex items-center justify-center text-fuchsia-300">
            <Rainbow className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-fuchsia-300 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Spectroscopy: Reading the Light", "វិសាលគមវិទ្យា៖ ការអានពន្លឺ")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-fuchsia-400/25 to-transparent" />
      </div>

      {/* Glowing intro card */}
      <div
        className="rounded-3xl border border-fuchsia-400/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(192,38,211,0.12) 0%,rgba(15,23,42,0.6) 60%,rgba(2,6,23,0.85) 100%)",
          boxShadow: "0 0 40px rgba(217,70,239,0.15) inset",
        }}
      >
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-fuchsia-500/15 blur-3xl pointer-events-none" />
        <div className="relative">
          <h2
            className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
            style={{
              background: "linear-gradient(90deg,#f0abfc 0%,#67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(240,171,252,0.25)",
            }}
          >
            {t("Reading the Light of the Universe", "ការអានពន្លឺនៃចក្រវាល")}
          </h2>
          <p className={`text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Light is more than what we see — it's a message from the stars. Spectroscopy is the science of decoding that message, line by line, color by color, until we know what distant worlds are made of.",
              "ពន្លឺគឺច្រើនជាងអ្វីដែលយើងឃើញ — វាជាសារចេញពីផ្កាយ។ វិសាលគមវិទ្យា គឺវិទ្យាសាស្ត្រនៃការឌិកូដសារនោះ ខ្សែម្ដងមួយ ពណ៌ម្ដងមួយ រហូតដល់យើងដឹងថាពិភពឆ្ងាយ បង្កើតឡើងពីអ្វី។"
            )}
          </p>
        </div>
      </div>

      {/* 1. What is Spectroscopy? */}
      <ModuleHeader
        icon={<Info className="w-4 h-4" />}
        en="What is Spectroscopy?"
        kh="តើអ្វីទៅជាវិសាលគមវិទ្យា?"
        lang={lang}
        descEn="Light is a spectrum — a rainbow of every color blended together. When that light passes through a gas, the atoms inside the gas eat very specific colors. Look at the leftover light through a prism, and you see a rainbow with thin black lines where the missing colors used to be. That's an Absorption Spectrum."
        descKh="ពន្លឺគឺជាវិសាលគម — ឥន្ទនូនៃពណ៌គ្រប់ពណ៌ច្របាច់ចូលគ្នា។ ពេលពន្លឺនោះឆ្លងកាត់ឧស្ម័ន អាតូមនៅក្នុងឧស្ម័ននោះស៊ីពណ៌ជាក់លាក់។ មើលពន្លឺដែលនៅសល់ឆ្លងកាត់ព្រីស្ម អ្នកនឹងឃើញឥន្ទនូដែលមានខ្សែខ្មៅស្ដើងៗ នៅកន្លែងដែលពណ៌ដែលបាត់នោះធ្លាប់នៅ។ នេះហៅថា វិសាលគមស្រូប។"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <PrismDiagram lang={lang} />
        <ElementBarcode lang={lang} />
      </div>

      {/* 2. Hunting for Alien Earths */}
      <TransitDiagram lang={lang} />

      <p className={`mt-5 text-center text-fuchsia-200/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "We may never set foot on another world — but with spectroscopy, we can already taste its sky.",
          "យើងប្រហែលជាមិនដែលឈានជើងទៅពិភពផ្សេងទៀតទេ — ប៉ុន្តែជាមួយវិសាលគមវិទ្យា យើងអាចភ្លក់រសជាតិមេឃរបស់វាបានហើយ។"
        )}
      </p>
    </section>
  );
}
