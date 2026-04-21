import {
  Globe2, Droplets, Shield, Sparkles, Moon, Sun, Waves, CircleDot,
  Thermometer, Ruler, Orbit,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

// ── Reusable header (earthly palette) ──────────────────────────────────────

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
        <div className="w-8 h-8 rounded-lg bg-emerald-400/15 border border-emerald-300/40 flex items-center justify-center text-emerald-200">
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

// ── 1. The Goldilocks Planet ───────────────────────────────────────────────

function GoldilocksPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-emerald-300/20 bg-gradient-to-br from-[#021018] via-[#053248] to-[#01060e] p-5 sm:p-7">
      <PanelHeader
        icon={<Droplets className="w-4 h-4" />}
        en="The Goldilocks Planet"
        kh="ភពដែលមានលក្ខខណ្ឌល្អឥតខ្ចោះ"
        lang={lang}
        descEn="Earth sits in the Sun's 'Goldilocks Zone' — not too hot like Venus, not too cold like Mars. It is at exactly the right distance for water to exist as liquid, ice, and vapor all at the same time. And our magnetic field acts as an invisible shield, deflecting the solar wind that would otherwise strip our atmosphere away."
        descKh="ផែនដី ស្ថិតនៅក្នុង «តំបន់ដែលគួរអាស្រ័យបាន» របស់ព្រះអាទិត្យ — មិនក្ដៅពេក ដូចភពសុក្រ ហើយមិនត្រជាក់ពេក ដូចភពអង្គារ។ វាស្ថិតនៅចម្ងាយដ៏ត្រឹមត្រូវ សម្រាប់ឱ្យទឹកអាចមានជាទឹករាវ ទឹកកក និងចំហាយ ក្នុងពេលតែមួយ។ ហើយដែនមេដែករបស់យើង ដើរតួជាខែលមើលមិនឃើញ បំបែរខ្យល់សុរិយាដែលបើមិនដូច្នេះទេ នឹងបក់បរិយាកាសរបស់យើងចេញ។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Habitable Zone diagram */}
        <div className="rounded-2xl border border-emerald-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Orbit className="w-4 h-4 text-emerald-300" />
            <h4 className={`text-sm font-bold text-emerald-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "តំបន់ដែលគួរអាស្រ័យបាន" : "The Habitable Zone"}
            </h4>
          </div>

          <svg
            viewBox="0 0 320 200"
            className="w-full h-auto"
            aria-label={isKh ? "តំបន់ដែលគួរអាស្រ័យបាន ក្នុងប្រព័ន្ធព្រះអាទិត្យ" : "Habitable zone in our solar system"}
            data-testid="habitable-zone"
          >
            <defs>
              <radialGradient id="em-sun" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="55%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="em-venus" cx="0.4" cy="0.35" r="0.7">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="60%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>
              <radialGradient id="em-earth" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="55%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </radialGradient>
              <radialGradient id="em-mars" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>
              <linearGradient id="em-zone" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="30%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="70%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Habitable zone band */}
            <rect x="120" y="90" width="120" height="42" fill="url(#em-zone)" rx="6" />
            <text x="180" y="86" textAnchor="middle" fontSize="9" fill="#6ee7b7" fontWeight="700">
              {isKh ? "តំបន់អាស្រ័យបាន" : "Habitable Zone"}
            </text>

            {/* Sun */}
            <circle cx="30" cy="111" r="16" fill="url(#em-sun)" />
            <circle cx="30" cy="111" r="9" fill="#fde047" />

            {/* Venus — too hot */}
            <circle cx="100" cy="111" r="6" fill="url(#em-venus)" />
            <text x="100" y="148" textAnchor="middle" fontSize="9" fill="#fb923c" fontWeight="700">
              {isKh ? "សុក្រ" : "Venus"}
            </text>
            <text x="100" y="160" textAnchor="middle" fontSize="8" fill="#fed7aa" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>
                {isKh ? "ក្ដៅពេក" : "Too hot"}
              </tspan>
            </text>

            {/* Earth — just right */}
            <circle cx="170" cy="111" r="8" fill="url(#em-earth)" />
            <circle cx="170" cy="111" r="8" fill="none" stroke="#86efac" strokeWidth="1.5" />
            <text x="170" y="148" textAnchor="middle" fontSize="10" fill="#86efac" fontWeight="800">
              {isKh ? "ផែនដី" : "Earth"}
            </text>
            <text x="170" y="161" textAnchor="middle" fontSize="8" fill="#bbf7d0" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>
                {isKh ? "ល្អឥតខ្ចោះ" : "Just right"}
              </tspan>
            </text>

            {/* Mars — too cold */}
            <circle cx="230" cy="111" r="5" fill="url(#em-mars)" />
            <text x="230" y="148" textAnchor="middle" fontSize="9" fill="#fb923c" fontWeight="700">
              {isKh ? "អង្គារ" : "Mars"}
            </text>
            <text x="230" y="160" textAnchor="middle" fontSize="8" fill="#fecaca" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>
                {isKh ? "ត្រជាក់ពេក" : "Too cold"}
              </tspan>
            </text>

            {/* Distance scale */}
            <line x1="30" y1="180" x2="290" y2="180" stroke="#475569" strokeWidth="0.5" />
            <text x="30"  y="194" textAnchor="middle" fontSize="8" fill="#94a3b8">0</text>
            <text x="170" y="194" textAnchor="middle" fontSize="8" fill="#94a3b8">{isKh ? "១៥០ លាន គម" : "150M km"}</text>
            <text x="290" y="194" textAnchor="middle" fontSize="8" fill="#94a3b8">{isKh ? "ចម្ងាយ" : "distance"}</text>
          </svg>

          {/* Three water-state badges */}
          <div className={`mt-4 grid grid-cols-3 gap-2 text-center ${isKh ? "font-khmer" : ""}`}>
            <div className="rounded-md bg-cyan-500/10 border border-cyan-300/25 p-2">
              <div className="text-[18px]">💧</div>
              <div className="text-[10px] text-cyan-200 font-bold mt-0.5">{isKh ? "ទឹករាវ" : "Liquid"}</div>
            </div>
            <div className="rounded-md bg-sky-500/10 border border-sky-300/25 p-2">
              <div className="text-[18px]">❄️</div>
              <div className="text-[10px] text-sky-200 font-bold mt-0.5">{isKh ? "ទឹកកក" : "Ice"}</div>
            </div>
            <div className="rounded-md bg-slate-300/10 border border-slate-300/25 p-2">
              <div className="text-[18px]">☁️</div>
              <div className="text-[10px] text-slate-200 font-bold mt-0.5">{isKh ? "ចំហាយ" : "Vapor"}</div>
            </div>
          </div>
        </div>

        {/* Magnetic shield diagram */}
        <div className="rounded-2xl border border-cyan-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-cyan-300" />
            <h4 className={`text-sm font-bold text-cyan-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ខែលមើលមិនឃើញ" : "The Invisible Shield"}
            </h4>
          </div>

          <svg
            viewBox="0 0 320 200"
            className="w-full h-auto"
            aria-label={isKh ? "ដែនមេដែករបស់ផែនដី បំបែរខ្យល់សុរិយា" : "Earth's magnetic field deflecting solar wind"}
            data-testid="magnetic-shield"
          >
            <defs>
              <radialGradient id="em-earth2" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="55%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </radialGradient>
            </defs>

            {/* Solar wind particles streaming from left */}
            {[
              [10,  40], [10,  70], [10, 100], [10, 130], [10, 160],
              [40,  55], [40,  85], [40, 115], [40, 145],
            ].map(([x, y], i) => (
              <g key={i}>
                <line x1={x} y1={y} x2={x + 25} y2={y} stroke="#fbbf24" strokeWidth="1.5" />
                <polygon points={`${x + 25},${y - 3} ${x + 30},${y} ${x + 25},${y + 3}`} fill="#fbbf24" />
              </g>
            ))}
            <text x="20" y="22" fontSize="9" fill="#fbbf24" fontWeight="700">
              {isKh ? "ខ្យល់សុរិយា" : "Solar wind"}
            </text>

            {/* Magnetosphere field lines (teardrop shape) */}
            {[
              "M 220 100 C 200 30, 130 30, 110 100",
              "M 230 100 C 210 20, 120 20, 100 100",
              "M 240 100 C 220 10, 110 10, 90 100",
              "M 220 100 C 200 170, 130 170, 110 100",
              "M 230 100 C 210 180, 120 180, 100 100",
              "M 240 100 C 220 190, 110 190, 90 100",
            ].map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.55" />
            ))}

            {/* Tail field lines (stretched by solar wind) */}
            <path d="M 230 80  C 270 75, 305 70, 315 60"  fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
            <path d="M 230 100 C 275 100, 310 100, 318 100" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
            <path d="M 230 120 C 270 125, 305 130, 315 140" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />

            {/* Earth */}
            <circle cx="170" cy="100" r="22" fill="url(#em-earth2)" />
            {/* Continents hint */}
            <path d="M 158 92 q 4 -4 8 0 t 6 4 t -4 6 t -8 -2 z" fill="#15803d" opacity="0.85" />
            <path d="M 178 104 q 3 -2 6 0 t 4 4 t -3 4 t -6 -2 z" fill="#15803d" opacity="0.85" />

            {/* Label */}
            <text x="170" y="160" textAnchor="middle" fontSize="9" fill="#22d3ee" fontWeight="700">
              {isKh ? "ដែនមេដែក" : "Magnetosphere"}
            </text>
            <text x="170" y="174" textAnchor="middle" fontSize="8" fill="#a5f3fc" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>
                {isKh ? "បំបែរខ្យល់សុរិយា" : "deflects solar wind"}
              </tspan>
            </text>
          </svg>

          <div className="mt-3 rounded-md bg-cyan-500/10 border border-cyan-300/20 p-3">
            <p className={`text-cyan-100/85 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "បើគ្មានដែនមេដែកនេះទេ ខ្យល់សុរិយា នឹងបក់បរិយាកាស និងទឹករបស់យើងចេញ បន្ដិចម្ដងៗ — ជាតួយ៉ាងដែលបានកើតឡើងហើយ ចំពោះភពអង្គារ។"
                : "Without this magnetic field, the solar wind would slowly strip away our atmosphere and water — exactly what already happened to Mars."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 2. The Giant Impact ────────────────────────────────────────────────────

function GiantImpactPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  type Step = {
    titleEn: string; titleKh: string;
    descEn: string;  descKh: string;
    /** Render function for the small SVG illustration. */
    render: () => React.ReactNode;
  };

  const steps: Step[] = [
    {
      titleEn: "1. Two young worlds",
      titleKh: "១. ពិភពក្មេងពីរ",
      descEn: "4.5 billion years ago, the early Earth shared its orbit with Theia — a planet about the size of Mars.",
      descKh: "៤,៥ ពាន់លានឆ្នាំមុន ផែនដីដើម បានចែករំលែកគន្លងជាមួយធាយ៉ា — ភពមួយប៉ុនទំហំភពអង្គារ។",
      render: () => (
        <svg viewBox="0 0 200 110" className="w-full h-auto" aria-hidden>
          <defs>
            <radialGradient id="gi-earth" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="60%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
            <radialGradient id="gi-theia" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
          </defs>
          <circle cx="60"  cy="55" r="28" fill="url(#gi-earth)" />
          <text x="60"  y="100" textAnchor="middle" fontSize="9" fill="#fde68a" fontWeight="700">
            {isKh ? "ផែនដីដើម" : "Early Earth"}
          </text>
          <circle cx="160" cy="55" r="18" fill="url(#gi-theia)" />
          <text x="160" y="100" textAnchor="middle" fontSize="9" fill="#fed7aa" fontWeight="700">
            {isKh ? "ធាយ៉ា" : "Theia"}
          </text>
        </svg>
      ),
    },
    {
      titleEn: "2. The collision",
      titleKh: "២. ការប៉ះទង្គិច",
      descEn: "Theia slammed into Earth at a glancing angle, vaporizing huge amounts of rock from both worlds.",
      descKh: "ធាយ៉ា បានបុកផែនដីក្នុងមុំជ្រៀង បំបែកថ្មយ៉ាងច្រើនពីពិភពទាំងពីរ ឱ្យក្លាយជាចំហាយ។",
      render: () => (
        <svg viewBox="0 0 200 110" className="w-full h-auto" aria-hidden>
          <defs>
            <radialGradient id="gi-impact" cx="0.5" cy="0.5" r="0.7">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Impact flash */}
          <circle cx="110" cy="55" r="48" fill="url(#gi-impact)" />
          {/* Distorted Earth */}
          <ellipse cx="100" cy="55" rx="32" ry="26" fill="#dc2626" />
          {/* Spray of debris */}
          {[
            [150, 30, 3], [165, 45, 2], [170, 30, 2], [160, 65, 2.5],
            [175, 60, 2], [60, 25, 2], [50, 70, 2.5], [40, 50, 2],
            [180, 75, 2], [30, 35, 2],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="#fbbf24" />
          ))}
          <text x="100" y="100" textAnchor="middle" fontSize="9" fill="#fef3c7" fontWeight="700">
            {isKh ? "ការបុកប៉ះ" : "Impact"}
          </text>
        </svg>
      ),
    },
    {
      titleEn: "3. Earth and Moon today",
      titleKh: "៣. ផែនដី និងព្រះច័ន្ទ សព្វថ្ងៃ",
      descEn: "The debris formed a hot ring around Earth that slowly clumped together — and became our Moon.",
      descKh: "សំណល់នោះ បានបង្កើតជារង្វង់ក្ដៅជុំវិញផែនដី ហើយបន្ដិចម្ដងៗ ប្រមូលផ្ដុំចូលគ្នា — ហើយបានក្លាយជាព្រះច័ន្ទរបស់យើង។",
      render: () => (
        <svg viewBox="0 0 200 110" className="w-full h-auto" aria-hidden>
          <defs>
            <radialGradient id="gi-earth2" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="55%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </radialGradient>
            <radialGradient id="gi-moon" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="80%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>
          </defs>
          {/* Earth */}
          <circle cx="60" cy="55" r="28" fill="url(#gi-earth2)" />
          <path d="M 48 50 q 6 -5 12 0 t 8 6 t -6 6 t -12 -3 z" fill="#15803d" opacity="0.85" />
          <text x="60" y="100" textAnchor="middle" fontSize="9" fill="#86efac" fontWeight="700">
            {isKh ? "ផែនដី" : "Earth"}
          </text>
          {/* Orbit */}
          <ellipse cx="60" cy="55" rx="100" ry="6" fill="none" stroke="#94a3b8" strokeDasharray="2 3" opacity="0.5" />
          {/* Moon */}
          <circle cx="160" cy="55" r="9" fill="url(#gi-moon)" />
          <circle cx="158" cy="53" r="2" fill="#94a3b8" opacity="0.7" />
          <circle cx="162" cy="58" r="1.5" fill="#94a3b8" opacity="0.7" />
          <text x="160" y="100" textAnchor="middle" fontSize="9" fill="#cbd5e1" fontWeight="700">
            {isKh ? "ព្រះច័ន្ទ" : "Moon"}
          </text>
        </svg>
      ),
    },
  ];

  return (
    <div className="rounded-3xl border border-emerald-300/20 bg-gradient-to-br from-[#021018] via-[#053248] to-[#01060e] p-5 sm:p-7">
      <PanelHeader
        icon={<Sparkles className="w-4 h-4" />}
        en="The Giant Impact — How the Moon Was Born"
        kh="ការបុកប៉ះយក្ស — កំណើតនៃព្រះច័ន្ទ"
        lang={lang}
        descEn="The leading explanation for the Moon is the Giant Impact Hypothesis: 4.5 billion years ago, a Mars-sized planet called Theia crashed into the early Earth. The colossal debris of rock and dust thrown into orbit slowly clumped together and became our Moon."
        descKh="ការពន្យល់ឈានមុខគេ អំពីព្រះច័ន្ទ គឺសម្មតិកម្មការបុកប៉ះយក្ស៖ ៤,៥ ពាន់លានឆ្នាំមុន ភពមួយប៉ុនទំហំភពអង្គារ ឈ្មោះធាយ៉ា បានបុកផែនដីដើម។ សំណល់ថ្ម និងធូលីដ៏ច្រើនមហិមា ដែលបានហោះចូលគន្លង បានប្រមូលផ្ដុំ បន្ដិចម្ដងៗ ហើយបានក្លាយជាព្រះច័ន្ទរបស់យើង។"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="giant-impact-steps">
        {steps.map((s) => (
          <div key={s.titleEn} className="rounded-2xl border border-emerald-300/20 bg-black/40 p-4">
            {s.render()}
            <div className="mt-2">
              <div className={`text-sm font-bold text-emerald-200 mb-1 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? s.titleKh : s.titleEn}
              </div>
              <p className={`text-xs text-white/70 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? s.descKh : s.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 3. Tides and Eclipses ──────────────────────────────────────────────────

function TidesEclipsesPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-blue-300/20 bg-gradient-to-br from-[#021018] via-[#053248] to-[#01060e] p-5 sm:p-7">
      <PanelHeader
        icon={<Waves className="w-4 h-4" />}
        en="Tides & Eclipses"
        kh="ទឹកជោរ-ទឹកនាច និងគ្រាស"
        lang={lang}
        descEn="The Moon's gravity gently pulls on Earth's oceans, raising the seas on the side facing it and creating high and low tides twice every day. And by an extraordinary cosmic coincidence, the Sun is 400× larger than the Moon but exactly 400× farther away — making them appear the same size in our sky and giving us the spectacle of perfect solar eclipses."
        descKh="ទំនាញរបស់ព្រះច័ន្ទ ទាញលើមហាសមុទ្ររបស់ផែនដី ធ្វើឱ្យសមុទ្រឡើងខ្ពស់ នៅផ្នែកដែលបែរទៅរកវា ហើយបង្កើតទឹកជោរ និងទឹកនាច ពីរដងក្នុងមួយថ្ងៃ។ ហើយដោយចៃដន្យនៃលំហអាកាសដ៏អស្ចារ្យ ព្រះអាទិត្យ ធំជាងព្រះច័ន្ទ ៤០០ ដង ប៉ុន្តែ ឆ្ងាយជាង ៤០០ ដងបេះបិទ — ធ្វើឱ្យពួកវាមើលទៅធំស្មើគ្នា នៅលើមេឃរបស់យើង ហើយផ្ដល់ឱ្យយើងនូវទេសភាពសូរ្យគ្រាសពេញលក្ខណៈ។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Tides diagram */}
        <div className="rounded-2xl border border-blue-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Waves className="w-4 h-4 text-sky-300" />
            <h4 className={`text-sm font-bold text-sky-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ទឹកជោរ និងទឹកនាច" : "High and Low Tides"}
            </h4>
          </div>

          <svg
            viewBox="0 0 320 180"
            className="w-full h-auto"
            aria-label={isKh ? "ទំនាញព្រះច័ន្ទ បង្កើតទឹកជោរ-ទឹកនាច លើផែនដី" : "The Moon's gravity creates Earth tides"}
            data-testid="tides-diagram"
          >
            <defs>
              <radialGradient id="em-earth3" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="55%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </radialGradient>
              <radialGradient id="em-moon2" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="80%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#475569" />
              </radialGradient>
            </defs>

            {/* Ocean bulges (ellipse stretched horizontally toward Moon) */}
            <ellipse cx="120" cy="90" rx="58" ry="40" fill="#0ea5e9" opacity="0.45" />
            {/* Solid Earth on top */}
            <circle cx="120" cy="90" r="36" fill="url(#em-earth3)" />
            {/* Continent hint */}
            <path d="M 108 82 q 5 -4 10 0 t 6 5 t -5 5 t -10 -2 z" fill="#15803d" opacity="0.85" />

            {/* High-tide labels (left bulge + right bulge) */}
            <text x="55"  y="86" fontSize="9" fill="#7dd3fc" fontWeight="700" textAnchor="middle">
              {isKh ? "ទឹកជោរ" : "High tide"}
            </text>
            <text x="190" y="86" fontSize="9" fill="#7dd3fc" fontWeight="700" textAnchor="middle">
              {isKh ? "ទឹកជោរ" : "High tide"}
            </text>

            {/* Low-tide labels (top + bottom) */}
            <text x="120" y="36" fontSize="9" fill="#94a3b8" fontWeight="700" textAnchor="middle">
              {isKh ? "ទឹកនាច" : "Low tide"}
            </text>
            <text x="120" y="155" fontSize="9" fill="#94a3b8" fontWeight="700" textAnchor="middle">
              {isKh ? "ទឹកនាច" : "Low tide"}
            </text>

            {/* Moon */}
            <circle cx="280" cy="90" r="14" fill="url(#em-moon2)" />
            <circle cx="276" cy="86" r="2.5" fill="#94a3b8" opacity="0.7" />
            <circle cx="284" cy="94" r="2"   fill="#94a3b8" opacity="0.7" />
            <text x="280" y="118" fontSize="9" fill="#cbd5e1" fontWeight="700" textAnchor="middle">
              {isKh ? "ព្រះច័ន្ទ" : "Moon"}
            </text>

            {/* Gravity arrow */}
            <defs>
              <marker id="em-grav" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#fbbf24" />
              </marker>
            </defs>
            <line x1="200" y1="170" x2="260" y2="170" stroke="#fbbf24" strokeWidth="1" markerEnd="url(#em-grav)" />
            <text x="230" y="165" textAnchor="middle" fontSize="8" fill="#fbbf24">
              {isKh ? "ទំនាញ" : "gravity pull"}
            </text>
          </svg>

          <div className="mt-3 rounded-md bg-sky-500/10 border border-sky-300/20 p-3">
            <p className={`text-sky-100/85 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "ខណៈផែនដី បង្វិលជុំវិញខ្លួន ក្រោមកំពូលទឹកទាំងពីរ ឆ្នេរនីមួយៗ កើតទឹកជោរ និងទឹកនាច ពីរដងក្នុងមួយថ្ងៃ។"
                : "As Earth spins under these two ocean bulges, every shoreline goes through two high tides and two low tides every day."}
            </p>
          </div>
        </div>

        {/* Eclipse alignment */}
        <div className="rounded-2xl border border-amber-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CircleDot className="w-4 h-4 text-amber-300" />
            <h4 className={`text-sm font-bold text-amber-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "សូរ្យគ្រាសពេញលក្ខណៈ" : "The Perfect Solar Eclipse"}
            </h4>
          </div>

          <svg
            viewBox="0 0 320 180"
            className="w-full h-auto"
            aria-label={isKh ? "តម្រឹមព្រះអាទិត្យ ព្រះច័ន្ទ និងផែនដី សម្រាប់សូរ្យគ្រាស" : "Sun, Moon, and Earth aligning for a solar eclipse"}
            data-testid="eclipse-diagram"
          >
            <defs>
              <radialGradient id="em-sun2" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="55%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="em-moon3" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="80%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#475569" />
              </radialGradient>
              <radialGradient id="em-earth4" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="55%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </radialGradient>
            </defs>

            {/* Sun (large, left) */}
            <circle cx="40" cy="90" r="32" fill="url(#em-sun2)" />
            <circle cx="40" cy="90" r="22" fill="#fde047" />
            <text x="40" y="146" textAnchor="middle" fontSize="9" fill="#fbbf24" fontWeight="700">
              {isKh ? "ព្រះអាទិត្យ" : "Sun"}
            </text>

            {/* Moon (small, middle) */}
            <circle cx="190" cy="90" r="6" fill="url(#em-moon3)" />
            <text x="190" y="74" textAnchor="middle" fontSize="9" fill="#cbd5e1" fontWeight="700">
              {isKh ? "ព្រះច័ន្ទ" : "Moon"}
            </text>

            {/* Shadow cone from Moon hitting Earth */}
            <path d="M 184 86 L 250 100 L 184 94 Z" fill="#000" opacity="0.55" />
            <path d="M 196 86 L 250 84  L 196 94 Z" fill="#000" opacity="0.0" />

            {/* Earth */}
            <circle cx="270" cy="92" r="14" fill="url(#em-earth4)" />
            {/* Eclipse spot on Earth (dark patch where shadow hits) */}
            <circle cx="258" cy="95" r="4" fill="#000" opacity="0.75" />
            <text x="270" y="124" textAnchor="middle" fontSize="9" fill="#86efac" fontWeight="700">
              {isKh ? "ផែនដី" : "Earth"}
            </text>

            {/* Cosmic-coincidence callout */}
            <text x="160" y="20" textAnchor="middle" fontSize="9" fill="#fef3c7" fontWeight="700">
              {isKh ? "ចៃដន្យដ៏អស្ចារ្យ" : "A cosmic coincidence"}
            </text>
            <text x="160" y="34" textAnchor="middle" fontSize="9" fill="#fde047" fontFamily="monospace">
              {isKh ? "ធំជាង ៤០០ ដង × ឆ្ងាយជាង ៤០០ ដង" : "400× larger × 400× farther"}
            </text>
          </svg>

          <div className={`mt-3 grid grid-cols-2 gap-2 text-center ${isKh ? "font-khmer" : ""}`}>
            <div className="rounded-md bg-amber-500/10 border border-amber-300/25 p-2">
              <div className="text-[10px] text-amber-200/80">{isKh ? "ព្រះអាទិត្យ ធំជាង" : "Sun is larger"}</div>
              <div className="text-base font-bold text-amber-200 font-mono">×400</div>
            </div>
            <div className="rounded-md bg-amber-500/10 border border-amber-300/25 p-2">
              <div className="text-[10px] text-amber-200/80">{isKh ? "ព្រះអាទិត្យ ឆ្ងាយជាង" : "Sun is farther"}</div>
              <div className="text-base font-bold text-amber-200 font-mono">×400</div>
            </div>
          </div>
          <p className={`mt-3 text-xs text-amber-100/80 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ដូច្នេះ ព្រះច័ន្ទតូច អាចបិទបាំងផ្ទៃព្រះអាទិត្យធំ បានច្បាស់លាស់ — ផ្ដល់ឱ្យយើងនូវសូរ្យគ្រាសពេញលក្ខណៈ។"
              : "That's why a tiny Moon can perfectly cover the giant Sun — and give us total solar eclipses."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 4. Earth vs Moon comparison chart ──────────────────────────────────────

function ComparisonChart({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  type Row = {
    Icon: React.ComponentType<{ className?: string }>;
    labelEn: string; labelKh: string;
    earthEn: string; earthKh: string; earthValue: number;
    moonEn: string;  moonKh: string;  moonValue: number;
  };

  const rows: Row[] = [
    {
      Icon: Ruler,
      labelEn: "Diameter",
      labelKh: "អង្កត់ផ្ចិត",
      earthEn: "12,742 km",
      earthKh: "១២,៧៤២ គម",
      earthValue: 12742,
      moonEn: "3,474 km",
      moonKh: "៣,៤៧៤ គម",
      moonValue: 3474,
    },
    {
      Icon: Globe2,
      labelEn: "Surface gravity",
      labelKh: "ទំនាញផ្ទៃ",
      earthEn: "9.8 m/s²",
      earthKh: "៩.៨ m/s²",
      earthValue: 9.8,
      moonEn: "1.6 m/s²",
      moonKh: "១.៦ m/s²",
      moonValue: 1.6,
    },
    {
      Icon: Thermometer,
      labelEn: "Atmosphere",
      labelKh: "បរិយាកាស",
      earthEn: "Yes — protective",
      earthKh: "មាន — ការពារ",
      earthValue: 100,
      moonEn: "Almost none",
      moonKh: "ស្ទើរតែគ្មាន",
      moonValue: 1,
    },
  ];

  return (
    <div
      className="rounded-3xl border border-emerald-300/20 bg-gradient-to-br from-[#01060e] via-[#053248] to-[#01060e] p-5 sm:p-7"
      data-testid="earth-moon-compare"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-emerald-400/15 border border-emerald-300/40 flex items-center justify-center text-emerald-200">
          <Globe2 className="w-4 h-4" />
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ផែនដី ធៀប ព្រះច័ន្ទ — តួលេខរហ័ស" : "Earth vs. Moon — at a glance"}
        </h3>
      </div>

      <div className="space-y-5">
        {rows.map((r) => {
          const max = Math.max(r.earthValue, r.moonValue);
          const earthPct = Math.max(2, (r.earthValue / max) * 100);
          const moonPct  = Math.max(2, (r.moonValue  / max) * 100);
          return (
            <div key={r.labelEn}>
              <div className="flex items-center gap-2 mb-2">
                <r.Icon className="w-4 h-4 text-emerald-300" />
                <span className={`text-sm font-semibold text-white ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? r.labelKh : r.labelEn}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Earth */}
                <div>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className="text-emerald-300 font-semibold">{isKh ? "ផែនដី" : "Earth"}</span>
                    <span className="font-mono text-white/85">{isKh ? r.earthKh : r.earthEn}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-700 to-emerald-300"
                      style={{ width: `${earthPct}%` }}
                    />
                  </div>
                </div>

                {/* Moon */}
                <div>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className="text-slate-200 font-semibold">{isKh ? "ព្រះច័ន្ទ" : "Moon"}</span>
                    <span className="font-mono text-white/85">{isKh ? r.moonKh : r.moonEn}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-slate-500 to-slate-200"
                      style={{ width: `${moonPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main wrapper ───────────────────────────────────────────────────────────

export function EarthMoonModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="earth-moon-module"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-400/15 border border-emerald-300/30 flex items-center justify-center text-emerald-300">
            <Globe2 className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-emerald-200 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Earth & The Moon: Our Cosmic Home", "ផែនដី និងព្រះច័ន្ទ៖ ផ្ទះសកលរបស់យើង")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-300/30 to-transparent" />
      </div>

      {/* Hero card with Earth and Moon */}
      <div
        className="rounded-3xl border border-emerald-300/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(16,185,129,0.10) 0%,rgba(29,78,216,0.45) 50%,rgba(2,6,12,0.95) 100%)",
          boxShadow: "0 0 40px rgba(16,185,129,0.10) inset",
        }}
      >
        <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-blue-700/25 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-5 items-center">
          {/* Earth + Moon hero visual */}
          <div className="flex justify-center">
            <svg viewBox="-80 -60 160 120" className="w-36 h-28" aria-hidden>
              <defs>
                <radialGradient id="hero-earth" cx="0.4" cy="0.4" r="0.6">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="55%" stopColor="#1d4ed8" />
                  <stop offset="100%" stopColor="#0c4a6e" />
                </radialGradient>
                <radialGradient id="hero-moon" cx="0.4" cy="0.4" r="0.6">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="80%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#475569" />
                </radialGradient>
              </defs>
              {/* Earth */}
              <circle cx="-30" cy="0" r="40" fill="url(#hero-earth)" />
              <path d="M -45 -10 q 8 -7 16 0 t 10 8 t -8 8 t -16 -3 z" fill="#15803d" opacity="0.85" />
              <path d="M -22 12  q 6 -4 12 0  t 6 6  t -5 6  t -12 -3 z" fill="#15803d" opacity="0.85" />
              <ellipse cx="-25" cy="-22" rx="10" ry="3" fill="#fff" opacity="0.5" />
              {/* Moon */}
              <circle cx="48" cy="-8" r="13" fill="url(#hero-moon)" />
              <circle cx="44" cy="-12" r="3"   fill="#94a3b8" opacity="0.7" />
              <circle cx="52" cy="-4"  r="2.5" fill="#94a3b8" opacity="0.7" />
              <circle cx="50" cy="-14" r="1.5" fill="#94a3b8" opacity="0.7" />
            </svg>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#bbf7d0 0%,#7dd3fc 50%,#f8fafc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(125,211,252,0.25)",
              }}
            >
              {t("Our Living Blue World", "ពិភពខៀវ ដែលរស់រាន")}
            </h2>
            <p className={`text-white/80 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "The only planet we know with oceans, forests, weather, and life. Sheltered by a magnetic field, warmed by the Sun at just the right distance, and partnered with a Moon born from a giant impact 4.5 billion years ago.",
                "ភពតែមួយគត់ ដែលយើងស្គាល់ ដែលមានមហាសមុទ្រ ព្រៃឈើ អាកាសធាតុ និងជីវិត។ ការពារដោយដែនមេដែក កក់ក្ដៅដោយព្រះអាទិត្យ នៅចម្ងាយដ៏ត្រឹមត្រូវ និងភ្ជាប់ដៃជាមួយព្រះច័ន្ទ ដែលកើតពីការបុកប៉ះយក្ស ៤,៥ ពាន់លានឆ្នាំមុន។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Goldilocks */}
      <div className="mb-6">
        <GoldilocksPanel lang={lang} />
      </div>

      {/* 2. Giant Impact */}
      <div className="mb-6">
        <GiantImpactPanel lang={lang} />
      </div>

      {/* 3. Tides + Eclipses */}
      <div className="mb-6">
        <TidesEclipsesPanel lang={lang} />
      </div>

      {/* 4. Earth-vs-Moon chart */}
      <ComparisonChart lang={lang} />

      <p className={`mt-5 text-center text-emerald-200/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "A small blue planet, a single grey companion — and the only place in the universe we know to call home.",
          "ភពខៀវតូចមួយ និងគូភ្ជាប់ដៃពណ៌ប្រផេះតែមួយ — និងជាកន្លែងតែមួយគត់នៅក្នុងសកលលោក ដែលយើងស្គាល់ថាជាផ្ទះ។",
        )}
      </p>

      {/* Defensive: silence unused-import warnings (Sun + Moon used only in some branches above) */}
      {(() => { void Sun; void Moon; return null; })()}
    </section>
  );
}
