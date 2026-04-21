import {
  Globe2, Thermometer, Mountain, Zap, Snowflake, Flame,
  Gauge, Clock, CalendarDays, Moon, Sun,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

// ── Reusable header (lunar palette) ─────────────────────────────────────────

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
        <div className="w-8 h-8 rounded-lg bg-slate-300/15 border border-slate-300/40 flex items-center justify-center text-slate-200">
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

// ── 1. Basics + Fast Year, Slow Day ─────────────────────────────────────────

function BasicsPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-slate-300/20 bg-gradient-to-br from-[#0c0d10] via-[#1c1f26] to-[#05060a] p-5 sm:p-7">
      <PanelHeader
        icon={<Globe2 className="w-4 h-4" />}
        en="The Basics & The Speed"
        kh="ព័ត៌មានមូលដ្ឋាន និងល្បឿន"
        lang={lang}
        descEn="Mercury is the closest planet to the Sun and the smallest planet in our solar system — only slightly larger than Earth's Moon. The Sun's powerful gravity whips Mercury around its orbit at extraordinary speed, yet the planet itself spins on its axis incredibly slowly."
        descKh="ភពពុធ ជាភពនៅជិតព្រះអាទិត្យបំផុត និងជាភពតូចបំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ — ធំជាងព្រះច័ន្ទរបស់ផែនដី បន្ដិចបន្ដួចប៉ុណ្ណោះ។ ទំនាញខ្លាំងរបស់ព្រះអាទិត្យ ធ្វើឱ្យភពពុធ វិលជុំវិញគន្លងយ៉ាងលឿនពិសេស ប៉ុន្តែ ខ្លួនវាវិលលើអ័ក្ស យឺតមិនគួរឱ្យជឿ។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Distance & size card */}
        <div className="rounded-2xl border border-slate-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Globe2 className="w-4 h-4 text-slate-200" />
            <h4 className={`text-sm font-bold text-slate-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ចម្ងាយ និងទំហំ" : "Distance & Size"}
            </h4>
          </div>

          <svg
            viewBox="0 0 320 160"
            className="w-full h-auto"
            aria-label={isKh ? "គន្លង និងទំហំរបស់ភពពុធ" : "Mercury orbit and size"}
            data-testid="mercury-orbit"
          >
            <defs>
              <radialGradient id="mp-sun2" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="55%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="mp-mercury" cx="0.4" cy="0.35" r="0.7">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="60%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>
              <radialGradient id="mp-earth2" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
            </defs>
            {/* Mercury orbit (highlighted) */}
            <ellipse cx="40" cy="80" rx="55" ry="38" fill="none" stroke="#cbd5e1" strokeDasharray="3 5" />
            {/* Venus orbit (faint) */}
            <ellipse cx="40" cy="80" rx="85" ry="58" fill="none" stroke="#475569" strokeDasharray="2 4" opacity="0.5" />
            {/* Earth orbit (faint) */}
            <ellipse cx="40" cy="80" rx="115" ry="78" fill="none" stroke="#475569" strokeDasharray="2 4" opacity="0.5" />
            {/* Sun */}
            <circle cx="40" cy="80" r="14" fill="url(#mp-sun2)" />
            <circle cx="40" cy="80" r="7" fill="#fde047" />
            {/* Mercury */}
            <circle cx="95" cy="80" r="4.5" fill="url(#mp-mercury)" />
            <text x="95" y="68" textAnchor="middle" fontSize="9" fill="#cbd5e1" fontWeight="700">
              {isKh ? "ពុធ" : "Mercury"}
            </text>
            {/* Earth */}
            <circle cx="155" cy="80" r="6" fill="url(#mp-earth2)" />
            <text x="155" y="98" textAnchor="middle" fontSize="9" fill="#93c5fd" fontWeight="700">
              {isKh ? "ផែនដី" : "Earth"}
            </text>
            {/* Distance arrow */}
            <defs>
              <marker id="mp-arrow5" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#cbd5e1" />
              </marker>
            </defs>
            <line x1="40" y1="145" x2="95" y2="145" stroke="#cbd5e1" strokeWidth="1" markerEnd="url(#mp-arrow5)" />
            <text x="68" y="156" textAnchor="middle" fontSize="9" fill="#cbd5e1">
              {isKh ? "~៥៨ លាន គម" : "~58 million km"}
            </text>
          </svg>

          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-md bg-slate-300/10 border border-slate-300/20 p-2">
              <div className="text-[10px] text-slate-300/70">{isKh ? "ភពទី" : "Planet #"}</div>
              <div className="text-base font-bold text-slate-100 font-mono">1</div>
            </div>
            <div className="rounded-md bg-slate-300/10 border border-slate-300/20 p-2">
              <div className="text-[10px] text-slate-300/70">{isKh ? "ធៀបនឹងផែនដី" : "Vs. Earth size"}</div>
              <div className="text-base font-bold text-slate-100 font-mono">×0.38</div>
            </div>
          </div>

          {/* Moon-vs-Mercury size visual */}
          <div className="mt-4">
            <div className={`text-[11px] text-slate-300/80 mb-2 text-center ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ធំជាងព្រះច័ន្ទ បន្ដិចបន្ដួច" : "Only slightly larger than the Moon"}
            </div>
            <svg viewBox="0 0 320 80" className="w-full h-auto" aria-hidden data-testid="mercury-vs-moon">
              {/* Moon — radius 22 (3,474 km) */}
              <g transform="translate(95,40)">
                <circle r="22" fill="#cbd5e1" />
                <circle cx="-6" cy="-4" r="3" fill="#94a3b8" opacity="0.7" />
                <circle cx="5"  cy="6"  r="4" fill="#94a3b8" opacity="0.7" />
                <circle cx="-9" cy="8"  r="2" fill="#94a3b8" opacity="0.7" />
              </g>
              <text x="95"  y="76" textAnchor="middle" fontSize="9" fill="#cbd5e1">{isKh ? "ព្រះច័ន្ទ ៣,៤៧៤ គម" : "Moon 3,474 km"}</text>
              {/* Mercury — radius 31 (4,879 km) → 22 * 4879/3474 ≈ 30.9 */}
              <g transform="translate(220,40)">
                <circle r="31" fill="url(#mp-mercury)" />
                <circle cx="-10" cy="-8" r="4" fill="#0f172a" opacity="0.55" />
                <circle cx="8"   cy="4"  r="6" fill="#0f172a" opacity="0.55" />
                <circle cx="-6"  cy="12" r="3" fill="#0f172a" opacity="0.55" />
                <circle cx="14"  cy="-10" r="2.5" fill="#0f172a" opacity="0.55" />
              </g>
              <text x="220" y="76" textAnchor="middle" fontSize="9" fill="#cbd5e1">{isKh ? "ពុធ ៤,៨៧៩ គម" : "Mercury 4,879 km"}</text>
            </svg>
          </div>
        </div>

        {/* Fast year, slow day card */}
        <div className="rounded-2xl border border-amber-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-300" />
            <h4 className={`text-sm font-bold text-amber-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ឆ្នាំលឿន ថ្ងៃយឺត" : "Fast Year, Slow Day"}
            </h4>
          </div>

          {/* Side-by-side comparison bars */}
          <div className="space-y-4" data-testid="year-vs-day">
            {/* Year — 88 Earth days */}
            <div>
              <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                <span className="flex items-center gap-1.5 text-amber-200 font-semibold">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {isKh ? "មួយឆ្នាំ" : "1 year"}
                </span>
                <span className="font-mono text-amber-300 font-bold">88 d</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-300"
                  style={{ width: `${(88 / 176) * 100}%` }}
                />
              </div>
            </div>

            {/* Day — 176 Earth days (sun-up to next sun-up) */}
            <div>
              <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  {isKh ? "មួយថ្ងៃ (សុរីយៈ ពេញ)" : "1 day (full solar)"}
                </span>
                <span className="font-mono text-slate-100 font-bold">176 d</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-slate-500 to-slate-200" style={{ width: "100%" }} />
              </div>
            </div>

            {/* Scale labels */}
            <div className="flex items-center justify-between text-[10px] text-white/40 font-mono pt-1">
              <span>0</span>
              <span>88 d</span>
              <span>176 {isKh ? "ថ្ងៃផែនដី" : "Earth days"}</span>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-amber-500/10 border border-amber-300/20 p-3">
            <p className={`text-amber-100/85 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "មួយ «ថ្ងៃ» ពេញ (ពីព្រះអាទិត្យរះ ដល់ព្រះអាទិត្យរះម្ដងទៀត) លើភពពុធ វែងជាងមួយ «ឆ្នាំ» ពេញ ដល់ទៅពីរដង!"
                : "A full Mercury day (sunrise to next sunrise) lasts twice as long as a full Mercury year!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 2. Fire and Ice ─────────────────────────────────────────────────────────

function FireAndIcePanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-slate-300/20 bg-gradient-to-br from-[#0c0d10] via-[#1c1f26] to-[#05060a] p-5 sm:p-7">
      <PanelHeader
        icon={<Flame className="w-4 h-4" />}
        en="Fire and Ice"
        kh="ភ្លើង និងទឹកកក"
        lang={lang}
        descEn="Mercury has almost no atmosphere — no 'blanket' to trap heat the way Venus or Earth does. The result is the most violent temperature swing of any planet: scorching fire on the sunlit side and freezing cold on the dark side, at the very same moment."
        descKh="ភពពុធ ស្ទើរតែគ្មានបរិយាកាស — គ្មាន «ភួយ» រក្សាកម្ដៅ ដូចភពសុក្រ ឬផែនដី។ លទ្ធផលគឺ ភាពប្រែប្រួលសីតុណ្ហភាពដ៏ខ្លាំងបំផុត ក្នុងចំណោមភពទាំងអស់៖ ភ្លើងក្ដៅខ្លាំងនៅផ្នែកត្រូវពន្លឺ និងភាពត្រជាក់ខ្លាំង នៅផ្នែកងងឹត ក្នុងពេលតែមួយ។"
      />

      {/* Day vs Night side-by-side hemisphere card */}
      <div className="rounded-2xl border border-slate-300/25 bg-black/40 p-5" data-testid="day-night-mercury">
        <svg
          viewBox="0 0 600 240"
          className="w-full h-auto"
          aria-label={isKh ? "សីតុណ្ហភាពផ្នែកថ្ងៃ និងផ្នែកយប់ នៃភពពុធ" : "Mercury day side and night side temperatures"}
        >
          <defs>
            <radialGradient id="merc-day" cx="0.3" cy="0.35" r="0.85">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
            <radialGradient id="merc-night" cx="0.7" cy="0.35" r="0.85">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
            <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background split */}
          <rect x="0"   y="0" width="300" height="240" fill="#1a0d02" />
          <rect x="300" y="0" width="300" height="240" fill="#020617" />

          {/* Sun (left, off-screen edge glow) */}
          <circle cx="-20" cy="120" r="80" fill="url(#sun-glow)" />
          {/* Sun rays */}
          {[80, 110, 140, 160].map((y, i) => (
            <line
              key={i}
              x1="20" y1={y} x2="120" y2={y}
              stroke="#fde047" strokeWidth="1.5" opacity="0.7"
            />
          ))}

          {/* Mercury day hemisphere */}
          <path d="M 200 30 A 90 90 0 0 1 200 210 Z" fill="url(#merc-day)" />
          {/* Mercury night hemisphere */}
          <path d="M 200 30 A 90 90 0 0 0 200 210 Z" fill="url(#merc-night)" />

          {/* Stars on the night side */}
          {[
            [340, 50], [410, 80], [480, 40], [380, 130], [510, 160],
            [450, 200], [550, 100], [340, 180], [560, 60],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.2" fill="#fff" opacity="0.7" />
          ))}

          {/* Day-side label */}
          <text x="100" y="40" fontSize="11" fill="#fde047" fontWeight="700">
            {isKh ? "ផ្នែកថ្ងៃ" : "Day side"}
          </text>
          <text x="100" y="116" fontSize="22" fill="#fde047" fontWeight="800">+430 °C</text>
          <text x="100" y="138" fontSize="9" fill="#fed7aa" fontStyle={isKh ? "normal" : "italic"}>
            <tspan className={isKh ? "font-khmer" : ""}>
              {isKh ? "ក្ដៅគ្រប់គ្រាន់ រំលាយសំណ" : "Hot enough to melt lead"}
            </tspan>
          </text>

          {/* Night-side label */}
          <text x="320" y="40" fontSize="11" fill="#7dd3fc" fontWeight="700">
            {isKh ? "ផ្នែកយប់" : "Night side"}
          </text>
          <text x="320" y="116" fontSize="22" fill="#7dd3fc" fontWeight="800">−180 °C</text>
          <text x="320" y="138" fontSize="9" fill="#bae6fd" fontStyle={isKh ? "normal" : "italic"}>
            <tspan className={isKh ? "font-khmer" : ""}>
              {isKh ? "ត្រជាក់ជាងផ្ទៃណាមួយលើផែនដី" : "Colder than anywhere on Earth"}
            </tspan>
          </text>

          {/* Total swing badge at the bottom */}
          <rect x="200" y="190" width="200" height="36" rx="6" fill="#0f172a" stroke="#fbbf24" strokeWidth="1" />
          <text x="300" y="205" textAnchor="middle" fontSize="10" fill="#fbbf24" fontWeight="700">
            {isKh ? "ភាពប្រែប្រួលសរុប" : "Total swing"}
          </text>
          <text x="300" y="221" textAnchor="middle" fontSize="13" fill="#fef3c7" fontWeight="800" fontFamily="monospace">
            610 °C
          </text>
        </svg>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-md bg-amber-500/10 border border-amber-300/20 p-3 flex items-start gap-2">
            <Flame className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
            <p className={`text-xs text-amber-100/85 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "ផ្នែកត្រូវពន្លឺ ឡើងដល់ +៤៣០ °C — ក្ដៅជាងឡដុតនំ មួយដងកន្លះ។"
                : "The sunlit side reaches +430 °C — about 1.5× hotter than a kitchen oven."}
            </p>
          </div>
          <div className="rounded-md bg-cyan-500/10 border border-cyan-300/20 p-3 flex items-start gap-2">
            <Snowflake className="w-4 h-4 text-cyan-300 flex-shrink-0 mt-0.5" />
            <p className={`text-xs text-cyan-100/85 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "ផ្នែកងងឹត ធ្លាក់ដល់ −១៨០ °C — ត្រជាក់ជាងសីតុណ្ហភាពទាបបំផុត ដែលធ្លាប់កត់ត្រា លើផែនដី។"
                : "The dark side plunges to −180 °C — colder than the lowest temperature ever recorded on Earth."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. The Scarred Surface ──────────────────────────────────────────────────

function CrateredSurfacePanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-slate-300/20 bg-gradient-to-br from-[#0c0d10] via-[#1c1f26] to-[#05060a] p-5 sm:p-7">
      <PanelHeader
        icon={<Mountain className="w-4 h-4" />}
        en="The Scarred Surface"
        kh="ផ្ទៃដែលពោរពេញដោយរណ្ដៅ"
        lang={lang}
        descEn="Mercury looks almost identical to Earth's Moon — completely covered in craters. With no atmosphere to burn up incoming meteors, and no wind or rain to wash the marks away, every rock that has hit Mercury for the last 4 billion years has left a permanent scar."
        descKh="ភពពុធ មើលទៅស្ទើរតែដូចព្រះច័ន្ទរបស់ផែនដី — ពោរពេញដោយរណ្ដៅ។ ដោយសារគ្មានបរិយាកាស ដុតបំផ្លាញឧល្កាដែលធ្លាក់ចូលមក និងគ្មានខ្យល់ ឬភ្លៀង លុបស្នាមរណ្ដៅ ដូច្នេះ ថ្មគ្រប់ដុំ ដែលបុកមកលើភពពុធ ក្នុងរយៈ ៤ ពាន់លានឆ្នាំ ចុងក្រោយ ទុករបួសជាប់ជានិច្ច។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Cratered surface visual */}
        <div className="rounded-2xl border border-slate-300/25 bg-black/40 p-5" data-testid="craters">
          <h4 className={`text-sm font-bold text-slate-200 mb-3 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ផ្ទៃ ដែលគ្មានពេលរាល់ដាប" : "A surface that never heals"}
          </h4>

          <svg viewBox="0 0 320 200" className="w-full h-auto" aria-label={isKh ? "ផ្ទៃរបស់ភពពុធ ពោរពេញដោយរណ្ដៅ" : "Mercury's heavily cratered surface"}>
            <defs>
              <radialGradient id="merc-surface" cx="0.5" cy="0.5" r="0.55">
                <stop offset="0%" stopColor="#9ca3af" />
                <stop offset="60%" stopColor="#475569" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>
              <radialGradient id="crater-grad" cx="0.5" cy="0.4" r="0.5">
                <stop offset="0%" stopColor="#1f2937" />
                <stop offset="80%" stopColor="#475569" />
                <stop offset="100%" stopColor="#94a3b8" />
              </radialGradient>
            </defs>
            {/* Mercury disc */}
            <circle cx="160" cy="100" r="90" fill="url(#merc-surface)" />

            {/* A scattering of craters of varied sizes */}
            {[
              [120,  60, 18], [210,  70, 14], [150, 110, 22], [180, 150, 12],
              [90,  120, 10], [230, 130, 16], [120, 160,  8], [200, 100,  9],
              [170,  85,  6], [140, 140,  7], [220, 100, 11], [100,  85,  9],
              [195,  55,  6], [115,  95,  7], [240, 160,  9], [80,  150,  6],
              [165, 175, 10], [225, 175,  6], [105, 175,  5], [255,  85,  5],
            ].map(([cx, cy, r], i) => {
              // Skip craters that fall outside the Mercury disc
              const dx = cx - 160, dy = cy - 100;
              if (dx * dx + dy * dy > 86 * 86) return <g key={i} />;
              return (
                <g key={i}>
                  {/* Outer rim shadow */}
                  <circle cx={cx} cy={cy} r={r} fill="url(#crater-grad)" />
                  {/* Inner shadow (deepest, lower-left) */}
                  <circle cx={cx - r * 0.15} cy={cy + r * 0.18} r={r * 0.55} fill="#0f172a" opacity="0.7" />
                  {/* Highlight crescent (sunlit upper-right rim) */}
                  <path
                    d={`M ${cx + r * 0.85} ${cy - r * 0.3} A ${r} ${r} 0 0 1 ${cx + r * 0.3} ${cy + r * 0.85}`}
                    stroke="#cbd5e1"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.55"
                  />
                </g>
              );
            })}

            {/* Caption */}
            <text x="160" y="195" textAnchor="middle" fontSize="9" fill="#cbd5e1" fontStyle="italic">
              {isKh ? "ពោរពេញដោយរណ្ដៅ ជាង ៤ ពាន់លានឆ្នាំ" : "Craters built up over 4 billion years"}
            </text>
          </svg>
        </div>

        {/* Why? — three-row cause/effect */}
        <div className="rounded-2xl border border-slate-300/25 bg-black/40 p-5" data-testid="why-craters">
          <h4 className={`text-sm font-bold text-slate-200 mb-4 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ហេតុអ្វី រណ្ដៅគ្មានបាត់?" : "Why don't the craters fade?"}
          </h4>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-300/15 border border-slate-300/30 flex items-center justify-center text-slate-200 flex-shrink-0">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <div className={`text-sm font-bold text-slate-100 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "គ្មានបរិយាកាស" : "No atmosphere"}
                </div>
                <p className={`text-xs text-white/65 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh
                    ? "គ្មានខ្យល់ ដុតបំផ្លាញឧល្កាមុនចូលដល់ផ្ទៃ — ថ្មគ្រប់ដុំ ធ្លាក់មកដល់ផ្ទៃផ្ទាល់។"
                    : "No air to burn up incoming meteors — every rock reaches the surface."}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-300/15 border border-slate-300/30 flex items-center justify-center text-slate-200 flex-shrink-0">
                <Globe2 className="w-4 h-4" />
              </div>
              <div>
                <div className={`text-sm font-bold text-slate-100 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "គ្មានខ្យល់ ឬភ្លៀង" : "No wind or rain"}
                </div>
                <p className={`text-xs text-white/65 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh
                    ? "គ្មានអាកាសធាតុ ច្រេះច្រួចរណ្ដៅ ឬកកើតថ្មីដី — រណ្ដៅនៅដដែល ដូចថ្ងៃដែលវាកើត។"
                    : "No weather to erode the craters or build new soil — they look exactly as they did the day they formed."}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-300/15 border border-slate-300/30 flex items-center justify-center text-slate-200 flex-shrink-0">
                <Mountain className="w-4 h-4" />
              </div>
              <div>
                <div className={`text-sm font-bold text-slate-100 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "សកម្មភាពភ្នំភ្លើង តូចណាស់" : "Almost no volcanism"}
                </div>
                <p className={`text-xs text-white/65 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh
                    ? "គ្មានគ្រឿងផ្ទៃថ្មី គ្របលើស្នាមចាស់ — ស្នាមរបួសនៅជាអចិន្ត្រៃយ៍។"
                    : "No fresh lava or surface renewal to cover the old scars — the wounds are permanent."}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Caloris Basin highlight */}
      <div className="mt-4 rounded-2xl border border-slate-300/25 bg-black/40 p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-300/30 flex items-center justify-center text-amber-300 flex-shrink-0">
            <Sun className="w-4 h-4" />
          </div>
          <div>
            <div className={`text-sm font-bold text-amber-200 mb-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "អាងកាឡូរីស — របួសយក្ស" : "Caloris Basin — the giant scar"}
            </div>
            <p className={`text-xs text-white/65 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "រណ្ដៅ ១,៥៥០ គីឡូម៉ែត្រ — រឿយរង្គើខ្លាំងណាស់ រហូតបុកបង្កើនភ្នំឱ្យកើតឡើង នៅផ្នែកម្ខាងទៀតនៃភពពុធ។"
                : "A 1,550 km wide impact crater — so violent that the shockwave punched mountains up on the opposite side of Mercury."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 4. Earth vs Mercury chart ───────────────────────────────────────────────

function ComparisonChart({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  type Row = {
    Icon: React.ComponentType<{ className?: string }>;
    labelEn: string; labelKh: string;
    earthEn: string; earthKh: string; earthValue: number;
    merEn: string;   merKh: string;   merValue: number;
    /** When true, smaller value gets more emphasis (for "size" the earth is bigger; for "year" mercury is shorter, etc). */
  };

  // Each row uses absolute "for-display" numeric values. Bars are normalized
  // against the row max so whichever is larger fills the track and the smaller
  // shows true proportion.
  const rows: Row[] = [
    {
      Icon: Globe2,
      labelEn: "Diameter",
      labelKh: "អង្កត់ផ្ចិត",
      earthEn: "12,742 km",
      earthKh: "១២,៧៤២ គម",
      earthValue: 12742,
      merEn: "4,879 km",
      merKh: "៤,៨៧៩ គម",
      merValue: 4879,
    },
    {
      Icon: CalendarDays,
      labelEn: "Year length",
      labelKh: "ប្រវែងឆ្នាំ",
      earthEn: "365 days",
      earthKh: "៣៦៥ ថ្ងៃ",
      earthValue: 365,
      merEn: "88 days",
      merKh: "៨៨ ថ្ងៃ",
      merValue: 88,
    },
    {
      Icon: Thermometer,
      labelEn: "Temperature range",
      labelKh: "ជួរសីតុណ្ហភាព",
      earthEn: "≈ 150 °C",
      earthKh: "≈ ១៥០ °C",
      earthValue: 150,
      merEn: "≈ 610 °C",
      merKh: "≈ ៦១០ °C",
      merValue: 610,
    },
  ];

  return (
    <div
      className="rounded-3xl border border-slate-300/20 bg-gradient-to-br from-[#05060a] via-[#0e1116] to-[#05060a] p-5 sm:p-7"
      data-testid="earth-mercury-compare"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-slate-300/15 border border-slate-300/40 flex items-center justify-center text-slate-200">
          <Globe2 className="w-4 h-4" />
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ផែនដី ធៀប ពុធ — តួលេខរហ័ស" : "Earth vs. Mercury — at a glance"}
        </h3>
      </div>

      <div className="space-y-5">
        {rows.map((r) => {
          const max = Math.max(r.earthValue, r.merValue);
          const earthPct = Math.max(2, (r.earthValue / max) * 100);
          const merPct   = Math.max(2, (r.merValue   / max) * 100);
          return (
            <div key={r.labelEn}>
              <div className="flex items-center gap-2 mb-2">
                <r.Icon className="w-4 h-4 text-slate-200" />
                <span className={`text-sm font-semibold text-white ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? r.labelKh : r.labelEn}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Earth */}
                <div>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className="text-blue-300 font-semibold">{isKh ? "ផែនដី" : "Earth"}</span>
                    <span className="font-mono text-white/85">{isKh ? r.earthKh : r.earthEn}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-700 to-sky-400"
                      style={{ width: `${earthPct}%` }}
                    />
                  </div>
                </div>

                {/* Mercury */}
                <div>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className="text-slate-200 font-semibold">{isKh ? "ភពពុធ" : "Mercury"}</span>
                    <span className="font-mono text-white/85">{isKh ? r.merKh : r.merEn}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-slate-500 to-slate-200"
                      style={{ width: `${merPct}%` }}
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

// ── Main wrapper ────────────────────────────────────────────────────────────

export function MercuryPlanetModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="mercury-planet-module"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-slate-300/15 border border-slate-300/30 flex items-center justify-center text-slate-200">
            <Moon className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-slate-200 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Mercury: The Planet of Extremes", "ភពពុធ៖ ភពនៃអាកាសធាតុខ្លាំងបំផុត")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-slate-300/30 to-transparent" />
      </div>

      {/* Hero card with split day/night Mercury */}
      <div
        className="rounded-3xl border border-slate-300/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(203,213,225,0.10) 0%,rgba(30,41,59,0.55) 50%,rgba(2,6,12,0.95) 100%)",
          boxShadow: "0 0 40px rgba(148,163,184,0.12) inset",
        }}
      >
        <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-amber-300/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-cyan-700/15 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 sm:grid-cols-[140px_minmax(0,1fr)] gap-5 items-center">
          {/* Mercury hero visual: half lit / half shadowed */}
          <div className="flex justify-center">
            <svg viewBox="-70 -70 140 140" className="w-32 h-32" aria-hidden>
              <defs>
                <radialGradient id="hero-merc-day" cx="0.3" cy="0.35" r="0.85">
                  <stop offset="0%" stopColor="#fef9c3" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#7c2d12" />
                </radialGradient>
                <radialGradient id="hero-merc-night" cx="0.7" cy="0.35" r="0.85">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="60%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#000" />
                </radialGradient>
              </defs>
              {/* Day half */}
              <path d="M 0 -60 A 60 60 0 0 1 0 60 Z" fill="url(#hero-merc-day)" />
              {/* Night half */}
              <path d="M 0 -60 A 60 60 0 0 0 0 60 Z" fill="url(#hero-merc-night)" />
              {/* A few craters straddling both halves */}
              <circle cx="-20" cy="-15" r="5" fill="#0f172a" opacity="0.5" />
              <circle cx="-32" cy="20"  r="4" fill="#0f172a" opacity="0.55" />
              <circle cx="-8"  cy="35"  r="3" fill="#0f172a" opacity="0.5" />
              <circle cx="20"  cy="-25" r="3" fill="#cbd5e1" opacity="0.35" />
              <circle cx="28"  cy="15"  r="4" fill="#cbd5e1" opacity="0.3" />
              <circle cx="10"  cy="40"  r="2" fill="#cbd5e1" opacity="0.3" />
            </svg>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#fef3c7 0%,#cbd5e1 55%,#7dd3fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(203,213,225,0.25)",
              }}
            >
              {t("A World of Boiling Fire and Frozen Ice", "ពិភពនៃភ្លើងពុះ និងទឹកកក")}
            </h2>
            <p className={`text-white/75 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "The smallest planet, closest to the Sun — only a little bigger than Earth's Moon. With no atmosphere to soften anything, Mercury swings 610 °C from day to night and wears every meteor scar of the last four billion years.",
                "ភពតូចបំផុត នៅជិតព្រះអាទិត្យបំផុត — ធំជាងព្រះច័ន្ទរបស់ផែនដី បន្ដិចបន្ដួចប៉ុណ្ណោះ។ ដោយគ្មានបរិយាកាសសម្រាលអ្វីទាំងអស់ ភពពុធ ប្រែប្រួលសីតុណ្ហភាព ៦១០ °C ពីថ្ងៃទៅយប់ ហើយរក្សារបួសឧល្កាគ្រប់ស្នាម ក្នុងរយៈបួនពាន់លានឆ្នាំ ចុងក្រោយ។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Basics + speed */}
      <div className="mb-6">
        <BasicsPanel lang={lang} />
      </div>

      {/* 2. Fire and ice */}
      <div className="mb-6">
        <FireAndIcePanel lang={lang} />
      </div>

      {/* 3. Cratered surface */}
      <div className="mb-6">
        <CrateredSurfacePanel lang={lang} />
      </div>

      {/* 4. Earth-vs-Mercury chart */}
      <ComparisonChart lang={lang} />

      <p className={`mt-5 text-center text-slate-300/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "Smallest, fastest, and most extreme — a tiny scarred world with one foot in the fire and one in the freezer.",
          "តូចបំផុត លឿនបំផុត និងខ្លាំងបំផុត — ពិភពតូចមួយ ដែលមានជើងម្ខាងនៅក្នុងភ្លើង និងជើងម្ខាងទៀតក្នុងទឹកកក។",
        )}
      </p>
    </section>
  );
}
