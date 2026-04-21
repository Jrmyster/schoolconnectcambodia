import {
  Telescope, RotateCcw, Wind, Snowflake,
  Ruler, Thermometer, CalendarDays, Sun as SunIcon, Sparkles,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

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
        <div className="w-8 h-8 rounded-lg bg-cyan-300/15 border border-cyan-200/40 flex items-center justify-center text-cyan-100">
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

function UranusDefs({ idPrefix }: { idPrefix: string }) {
  return (
    <defs>
      <radialGradient id={`${idPrefix}-uranus`} cx="0.4" cy="0.4" r="0.75">
        <stop offset="0%"  stopColor="#ecfeff" />
        <stop offset="40%" stopColor="#a5f3fc" />
        <stop offset="80%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#155e75" />
      </radialGradient>
      <linearGradient id={`${idPrefix}-ringfade`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"  stopColor="#a5f3fc" stopOpacity="0" />
        <stop offset="50%" stopColor="#a5f3fc" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

function UranusBody({
  prefix, cx, cy, r, withRings = false, ringTilt = 90,
}: { prefix: string; cx: number; cy: number; r: number; withRings?: boolean; ringTilt?: number }) {
  return (
    <g>
      {withRings && (
        <g transform={`rotate(${ringTilt} ${cx} ${cy})`} opacity="0.7">
          <ellipse cx={cx} cy={cy} rx={r * 1.55} ry={r * 0.18} fill="none" stroke={`url(#${prefix}-ringfade)`} strokeWidth="1.5" />
          <ellipse cx={cx} cy={cy} rx={r * 1.7}  ry={r * 0.2}  fill="none" stroke={`url(#${prefix}-ringfade)`} strokeWidth="1" />
          <ellipse cx={cx} cy={cy} rx={r * 1.85} ry={r * 0.22} fill="none" stroke={`url(#${prefix}-ringfade)`} strokeWidth="0.8" opacity="0.7" />
        </g>
      )}
      <circle cx={cx} cy={cy} r={r} fill={`url(#${prefix}-uranus)`} />
      <ellipse cx={cx} cy={cy + r * 0.15} rx={r * 0.85} ry={r * 0.04} fill="#ecfeff" opacity="0.18" />
      <ellipse cx={cx} cy={cy - r * 0.25} rx={r * 0.7}  ry={r * 0.03} fill="#ecfeff" opacity="0.12" />
    </g>
  );
}

// ── 1. First Telescope Discovery ──────────────────────────────────────────

function DiscoveryPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-cyan-200/20 bg-gradient-to-br from-[#021a1f] via-[#073d4a] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Telescope className="w-4 h-4" />}
        en="The First Telescope Discovery"
        kh="ការរកឃើញដោយតេឡេទស្សន៍ជាលើកដំបូង"
        lang={lang}
        descEn="Uranus is the 7th planet from the Sun. For thousands of years, humans only knew of five planets — Mercury, Venus, Mars, Jupiter, and Saturn — because they are bright enough to see with the naked eye. Then, on the night of March 13, 1781, an English astronomer named William Herschel pointed his homemade telescope at the sky and noticed a faint blue-green dot moving slowly among the stars. It was Uranus — the first planet ever discovered with a telescope, and the first new planet found since ancient times. In a single night, the known solar system doubled in size."
        descKh="អ៊ុយរ៉ានុស ជាភពទី ៧ ពីព្រះអាទិត្យ។ អស់រយៈពេលរាប់ពាន់ឆ្នាំ មនុស្សស្គាល់ភពតែប្រាំ — ភពពុធ ភពសុក្រ ភពអង្គារ ភពព្រហស្បតិ៍ និងភពសៅរ៍ — ព្រោះវាភ្លឺល្មមឱ្យឃើញដោយភ្នែកទទេ។ បន្ទាប់មក នៅយប់ថ្ងៃទី ១៣ ខែមីនា ឆ្នាំ ១៧៨១ តារាវិទូអង់គ្លេសម្នាក់ឈ្មោះ វីលៀម ហ៊ឺឆែល បានបង្វិលតេឡេទស្សន៍ ដែលគាត់ផលិតដោយខ្លួនឯង ឆ្ពោះទៅមេឃ ហើយបានឃើញចំណុចព្រឿងៗ ពណ៌ខៀវ-បៃតង កំពុងផ្លាស់ទីយឺតៗ ក្នុងចំណោមផ្កាយ។ វាគឺអ៊ុយរ៉ានុស — ភពដំបូងគេ ដែលត្រូវបានរកឃើញដោយតេឡេទស្សន៍ និងភពថ្មីដំបូងគេ ដែលរកឃើញតាំងពីជំនាន់បុរាណមក។ ត្រឹមតែយប់មួយ ប្រព័ន្ធព្រះអាទិត្យដែលគេស្គាល់ បានកើនឡើងទ្វេដង។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Timeline of known planets */}
        <div className="rounded-2xl border border-cyan-200/25 bg-black/40 p-5" data-testid="planets-timeline">
          <h4 className={`text-sm font-bold text-cyan-100 mb-3 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ភពដែលស្គាល់ — មុន និងក្រោយ ឆ្នាំ ១៧៨១" : "Known planets — before and after 1781"}
          </h4>
          <svg
            viewBox="0 0 320 200"
            className="w-full h-auto"
            aria-label={isKh ? "ខ្សែពេលនៃភពដែលគេស្គាល់ មុន និងក្រោយឆ្នាំ ១៧៨១" : "Timeline of known planets, before and after 1781"}
          >
            <defs>
              <radialGradient id="tl-sun" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fef9c3" />
                <stop offset="60%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#b45309" />
              </radialGradient>
              <UranusDefs idPrefix="tl" />
            </defs>

            {/* Before label */}
            <text x="80" y="18" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="700">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "មុនឆ្នាំ ១៧៨១ — ៥ ភព" : "Before 1781 — 5 planets"}</tspan>
            </text>
            <line x1="20" y1="30" x2="300" y2="30" stroke="#334155" strokeWidth="0.5" />

            {/* Sun + 5 ancient planets */}
            <circle cx="35" cy="55" r="9" fill="url(#tl-sun)" />
            <circle cx="60" cy="55" r="2"   fill="#9ca3af" />
            <circle cx="80" cy="55" r="3.5" fill="#fde68a" />
            <circle cx="105" cy="55" r="2.5" fill="#dc2626" />
            <circle cx="140" cy="55" r="6"   fill="#fb923c" />
            <circle cx="180" cy="55" r="5"   fill="#fcd34d" />
            <text x="35"  y="78" textAnchor="middle" fontSize="7" fill="#94a3b8">{isKh ? "ព.អ." : "Sun"}</text>
            <text x="60"  y="78" textAnchor="middle" fontSize="7" fill="#94a3b8">{isKh ? "ពុធ" : "Me"}</text>
            <text x="80"  y="78" textAnchor="middle" fontSize="7" fill="#94a3b8">{isKh ? "សុក្រ" : "Ve"}</text>
            <text x="105" y="78" textAnchor="middle" fontSize="7" fill="#94a3b8">{isKh ? "អង្គារ" : "Ma"}</text>
            <text x="140" y="78" textAnchor="middle" fontSize="7" fill="#94a3b8">{isKh ? "ព្រហ." : "Ju"}</text>
            <text x="180" y="78" textAnchor="middle" fontSize="7" fill="#94a3b8">{isKh ? "សៅរ៍" : "Sa"}</text>

            {/* After label */}
            <text x="160" y="115" textAnchor="middle" fontSize="9" fill="#a5f3fc" fontWeight="700">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "បន្ទាប់ពីឆ្នាំ ១៧៨១ — ៦ ភព (+អ៊ុយរ៉ានុស)" : "After 1781 — 6 planets (+Uranus)"}</tspan>
            </text>
            <line x1="20" y1="127" x2="300" y2="127" stroke="#155e75" strokeWidth="0.5" />

            <circle cx="35" cy="155" r="9" fill="url(#tl-sun)" />
            <circle cx="60" cy="155" r="2"   fill="#9ca3af" />
            <circle cx="80" cy="155" r="3.5" fill="#fde68a" />
            <circle cx="105" cy="155" r="2.5" fill="#dc2626" />
            <circle cx="140" cy="155" r="6"   fill="#fb923c" />
            <circle cx="180" cy="155" r="5"   fill="#fcd34d" />
            <UranusBody prefix="tl" cx={230} cy={155} r={6} />
            <g stroke="#22d3ee" strokeWidth="1" fill="none">
              <circle cx="230" cy="155" r="11" strokeDasharray="2 2" />
            </g>
            <text x="230" y="178" textAnchor="middle" fontSize="7" fill="#a5f3fc" fontWeight="700">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "អ៊ុយរ៉ានុស" : "Uranus"}</tspan>
            </text>
            <text x="230" y="188" textAnchor="middle" fontSize="6" fill="#67e8f9" fontStyle="italic">{isKh ? "ថ្មី!" : "NEW!"}</text>
          </svg>
        </div>

        {/* Discovery facts card */}
        <div className="rounded-2xl border border-cyan-200/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <h4 className={`text-sm font-bold text-cyan-100 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "តួលេខគន្លឹះ — ការរកឃើញ" : "Key facts — the discovery"}
            </h4>
          </div>
          <ul className="space-y-3 text-xs text-white/85">
            <li className="flex gap-2.5">
              <span className="text-cyan-300 font-bold flex-shrink-0">📅</span>
              <span className={isKh ? "font-khmer leading-loose" : "leading-relaxed"}>
                {isKh
                  ? "ថ្ងៃទី ១៣ ខែមីនា ឆ្នាំ ១៧៨១ — នៅទីក្រុងបាត ប្រទេសអង់គ្លេស"
                  : "March 13, 1781 — in Bath, England"}
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-cyan-300 font-bold flex-shrink-0">👨‍🔬</span>
              <span className={isKh ? "font-khmer leading-loose" : "leading-relaxed"}>
                {isKh
                  ? "តារាវិទូ វីលៀម ហ៊ឺឆែល — ប្រើតេឡេទស្សន៍ដែលគាត់ផលិតផ្ទាល់"
                  : "Astronomer William Herschel — using a telescope he built himself"}
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-cyan-300 font-bold flex-shrink-0">🔭</span>
              <span className={isKh ? "font-khmer leading-loose" : "leading-relaxed"}>
                {isKh
                  ? "ភពដំបូងគេ ដែលរកឃើញដោយតេឡេទស្សន៍ — មិនមែនដោយភ្នែកទទេ"
                  : "First planet ever discovered with a telescope — not the naked eye"}
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-cyan-300 font-bold flex-shrink-0">🌌</span>
              <span className={isKh ? "font-khmer leading-loose" : "leading-relaxed"}>
                {isKh
                  ? "ប្រព័ន្ធព្រះអាទិត្យ ដែលគេស្គាល់ កើនឡើងទ្វេដង — ក្នុងតែយប់មួយ"
                  : "Doubled the known size of the solar system — in a single night"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── 2. Extreme Tilt ───────────────────────────────────────────────────────

function TiltPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-cyan-200/20 bg-gradient-to-br from-[#021a1f] via-[#073d4a] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<RotateCcw className="w-4 h-4" />}
        en="The Extreme Tilt"
        kh="អ័ក្សផ្អៀងខ្លាំងបំផុត"
        lang={lang}
        descEn="Earth spins on its axis like a top — tilted just 23.5°. But Uranus is the strangest planet in the solar system: it has been knocked completely on its side, with an axial tilt of 98°. Scientists believe a giant Earth-sized object slammed into it billions of years ago and tipped it over. Today, Uranus orbits the Sun rolling like a barrel, not spinning like a top. The result is the most extreme seasons in the solar system — at each pole, 42 Earth-years of unbroken sunlight followed by 42 Earth-years of pitch-black darkness."
        descKh="ផែនដី បង្វិលលើអ័ក្សរបស់វា ដូចចង្កូត — ផ្អៀងត្រឹមតែ ២៣.៥°។ ប៉ុន្តែ អ៊ុយរ៉ានុស ជាភពចម្លែកបំផុត ក្នុងប្រព័ន្ធព្រះអាទិត្យ៖ វាត្រូវបានទម្លាក់ផ្អៀងពេញមួយចំហៀង ដោយមានអ័ក្សផ្អៀង ៩៨°។ អ្នកវិទ្យាសាស្ត្រ ជឿថា វត្ថុយក្ស ធំស្មើផែនដី បានបុកវា កាលពីរាប់ពាន់លានឆ្នាំមុន ហើយធ្វើឱ្យវាផ្ដួលចុះ។ សព្វថ្ងៃ អ៊ុយរ៉ានុសធ្វើគន្លងជុំវិញព្រះអាទិត្យ ដោយប្រឡាក់ដូចធុង មិនមែនបង្វិលដូចចង្កូតទេ។ លទ្ធផលគឺ រដូវកាលជ្រុលនិយមបំផុត ក្នុងប្រព័ន្ធព្រះអាទិត្យ — នៅប៉ូលនីមួយៗ មានពន្លឺព្រះអាទិត្យ ៤២ ឆ្នាំផែនដីដោយមិនឈប់ បន្ទាប់មក ភាពងងឹតស្រអាប់ ៤២ ឆ្នាំផែនដី។"
      />

      {/* Earth vs Uranus tilt visualization */}
      <div className="rounded-2xl border border-cyan-200/25 bg-black/40 p-5 mb-4" data-testid="tilt-compare">
        <h4 className={`text-sm font-bold text-cyan-100 mb-3 text-center ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "របៀបបង្វិល៖ ផែនដី (ចង្កូត) ធៀប អ៊ុយរ៉ានុស (ធុង)" : "How they spin: Earth (top) vs Uranus (barrel)"}
        </h4>
        <svg
          viewBox="0 0 600 240"
          className="w-full h-auto"
          aria-label={isKh ? "ផែនដី បង្វិលផ្អៀង ២៣.៥° និងអ៊ុយរ៉ានុស បង្វិលផ្អៀង ៩៨°" : "Earth spins at 23.5° tilt and Uranus spins at 98° tilt"}
        >
          <defs>
            <radialGradient id="tcmp-earth" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%"  stopColor="#86efac" />
              <stop offset="60%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </radialGradient>
            <UranusDefs idPrefix="tcmp" />
          </defs>

          {/* Stars */}
          {[[40,30],[200,40],[330,25],[470,35],[560,55],[80,210],[280,215],[450,210],[540,220]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1.2" fill="#fff" opacity="0.6" />
          ))}

          {/* Earth side */}
          <text x="150" y="30" textAnchor="middle" fontSize="11" fill="#86efac" fontWeight="700">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ផែនដី — ផ្អៀង ២៣.៥°" : "Earth — tilted 23.5°"}</tspan>
          </text>
          {/* Earth axis (slightly tilted) */}
          <g transform="rotate(-23.5 150 130)">
            <line x1="150" y1="60" x2="150" y2="200" stroke="#86efac" strokeWidth="1.2" strokeDasharray="3 3" />
            <polygon points="146,62 154,62 150,52" fill="#86efac" />
          </g>
          <circle cx="150" cy="130" r="42" fill="url(#tcmp-earth)" />
          {/* Spin arrow around equator */}
          <g stroke="#86efac" strokeWidth="1.2" fill="none" opacity="0.85">
            <path d="M 110 130 Q 150 150 190 130" />
            <polygon points="190,130 184,127 187,134" fill="#86efac" />
          </g>
          <text x="150" y="220" textAnchor="middle" fontSize="9" fill="#bbf7d0" fontStyle="italic">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "បង្វិលដូចចង្កូត" : "spins like a top"}</tspan>
          </text>

          {/* Divider */}
          <line x1="300" y1="50" x2="300" y2="200" stroke="#155e75" strokeWidth="0.5" strokeDasharray="2 4" />

          {/* Uranus side */}
          <text x="450" y="30" textAnchor="middle" fontSize="11" fill="#a5f3fc" fontWeight="700">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "អ៊ុយរ៉ានុស — ផ្អៀង ៩៨°" : "Uranus — tilted 98°"}</tspan>
          </text>
          {/* Uranus axis (almost horizontal — 98° from vertical ≈ 8° below horizontal) */}
          <g transform="rotate(-98 450 130)">
            <line x1="450" y1="55" x2="450" y2="205" stroke="#a5f3fc" strokeWidth="1.2" strokeDasharray="3 3" />
            <polygon points="446,57 454,57 450,47" fill="#a5f3fc" />
          </g>
          <UranusBody prefix="tcmp" cx={450} cy={130} r={45} withRings ringTilt={0} />
          {/* Rolling arrow */}
          <g stroke="#a5f3fc" strokeWidth="1.2" fill="none" opacity="0.85">
            <path d="M 405 175 Q 450 195 495 175" />
            <polygon points="495,175 489,172 492,179" fill="#a5f3fc" />
          </g>
          <text x="450" y="220" textAnchor="middle" fontSize="9" fill="#cffafe" fontStyle="italic">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ប្រឡាក់ដូចធុង" : "rolls like a barrel"}</tspan>
          </text>
        </svg>
      </div>

      {/* Extreme seasons strip */}
      <div className="rounded-2xl border border-cyan-200/25 bg-black/40 p-5" data-testid="extreme-seasons">
        <h4 className={`text-sm font-bold text-cyan-100 mb-3 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "រដូវកាលជ្រុលនិយម — នៅប៉ូលនីមួយៗ" : "Extreme seasons — at each pole"}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-yellow-300/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/20 p-4 flex flex-col items-center text-center">
            <SunIcon className="w-8 h-8 text-yellow-300 mb-2" />
            <div className="text-2xl font-bold text-yellow-200 font-mono">{isKh ? "៤២" : "42"}</div>
            <div className={`text-xs text-yellow-100/85 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? "ឆ្នាំផែនដី នៃថ្ងៃ ដោយមិនឈប់" : "Earth-years of non-stop daylight"}
            </div>
          </div>
          <div className="rounded-xl border border-indigo-400/30 bg-gradient-to-br from-indigo-950/40 to-slate-950/40 p-4 flex flex-col items-center text-center">
            <Snowflake className="w-8 h-8 text-indigo-300 mb-2" />
            <div className="text-2xl font-bold text-indigo-200 font-mono">{isKh ? "៤២" : "42"}</div>
            <div className={`text-xs text-indigo-100/85 ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? "ឆ្នាំផែនដី នៃយប់ងងឹតស្រអាប់" : "Earth-years of pitch-black night"}
            </div>
          </div>
        </div>
        <p className={`mt-3 text-xs text-cyan-100/80 italic text-center ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
          {isKh
            ? "ប្រសិនបើអ្នករស់នៅប៉ូលរបស់អ៊ុយរ៉ានុស អ្នកនឹងឃើញព្រះអាទិត្យដែលមិនលិច ៤២ ឆ្នាំ ហើយបន្ទាប់មកគ្មានព្រះអាទិត្យសោះ ៤២ ឆ្នាំទៀត។"
            : "Live at a Uranian pole and the Sun would not set for 42 years — then it would not rise again for another 42."}
        </p>
      </div>
    </div>
  );
}

// ── 3. Atmosphere & Rotten-egg fact ───────────────────────────────────────

function AtmospherePanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-cyan-200/20 bg-gradient-to-br from-[#021a1f] via-[#073d4a] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Wind className="w-4 h-4" />}
        en="The Ice Giant's Atmosphere"
        kh="បរិយាកាសនៃភពទឹកកកយក្ស"
        lang={lang}
        descEn="Through a telescope, Uranus looks like a smooth, pale blue-green marble — almost featureless, with no dramatic stripes or storms like Jupiter or Saturn. The colour comes from methane gas (CH₄) high in its atmosphere, which absorbs red light and reflects the cool cyan-green back into space. But scientists discovered something unforgettable in 2018: the upper clouds also contain hydrogen sulfide (H₂S) — the same chemical that makes rotten eggs smell. So if a human ever stood on Uranus's clouds, the planet would smell exactly like rotten eggs!"
        descKh="តាមរយៈតេឡេទស្សន៍ អ៊ុយរ៉ានុសមើលទៅដូចជាគ្រាប់កែវមូល ពណ៌ខៀវ-បៃតង ស្រាល និងរលោង — ស្ទើរតែគ្មានលក្ខណៈ គ្មានឆ្នូត ឬព្យុះដ៏ធំ ដូចភពព្រហស្បតិ៍ ឬភពសៅរ៍ឡើយ។ ពណ៌នេះ មកពីឧស្ម័នមេតាន (CH₄) នៅខ្ពស់ក្នុងបរិយាកាសរបស់វា ដែលស្រូបយកពន្លឺក្រហម ហើយឆ្លុះបញ្ចាំងពន្លឺខៀវ-បៃតង ត្រជាក់ ត្រឡប់ចូលអវកាសវិញ។ ប៉ុន្តែ អ្នកវិទ្យាសាស្ត្រ បានរកឃើញរឿងមួយ ដែលមិនអាចភ្លេចបាន ក្នុងឆ្នាំ ២០១៨៖ ពពកខាងលើ ក៏មាន ហ្ស៊ីដ្រូសែន ស៊ុលហ្វីត (H₂S) — ជាសារធាតុគីមីដូចគ្នា ដែលធ្វើឱ្យពងមាន់រលួយ មានក្លិនស្អុយ។ ដូច្នេះ ប្រសិនបើមនុស្សម្នាក់ បានឈរលើពពកអ៊ុយរ៉ានុស ភពនេះនឹងមានក្លិន ដូចពងមាន់រលួយ ដ៏ពិតប្រាកដ!"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Smooth featureless body */}
        <div className="rounded-2xl border border-cyan-200/25 bg-black/40 p-5" data-testid="smooth-body">
          <h4 className={`text-sm font-bold text-cyan-100 mb-3 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "មុខភពរលោង — ពណ៌ខៀវ-បៃតងស្ងប់ស្ងាត់" : "A smooth, calm cyan-green face"}
          </h4>
          <svg
            viewBox="-100 -100 200 200"
            className="w-full h-auto"
            aria-label={isKh ? "មុខភពអ៊ុយរ៉ានុសរលោង" : "The featureless Uranus disc"}
          >
            <UranusDefs idPrefix="sm" />
            <UranusBody prefix="sm" cx={0} cy={0} r={85} />
          </svg>
          <p className={`mt-2 text-[11px] text-cyan-100/70 leading-relaxed text-center italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
            {isKh
              ? "មិនមានឆ្នូត មិនមានចំណុចព្យុះ — តែជាមូលរលោងស្រាល"
              : "No stripes, no storm-spots — just a soft, even sphere."}
          </p>
        </div>

        {/* Rotten-egg fact card */}
        <div className="rounded-2xl border border-yellow-300/30 bg-gradient-to-br from-yellow-900/20 to-cyan-900/30 p-5" data-testid="rotten-egg-fact">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🥚</span>
            <h4 className={`text-sm font-bold text-yellow-100 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ការពិតគួរឱ្យចង់ចាំ៖ ភពនេះមានក្លិនស្អុយ!" : "A fact you'll never forget: the planet stinks!"}
            </h4>
          </div>
          <p className={`text-xs text-yellow-50/90 leading-relaxed mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ពពកខាងលើ មានឧស្ម័ន ហ្ស៊ីដ្រូសែន ស៊ុលហ្វីត (H₂S) — ជាឧស្ម័នដដែល ដែលមានក្នុងពងមាន់រលួយ។ ដូច្នេះ ប្រសិនបើអ្នកអាចហិតបរិយាកាសអ៊ុយរ៉ានុសបាន — វានឹងមានក្លិនស្អុយដូចពងមាន់រលួយ មិនខាន!"
              : "The upper clouds contain hydrogen sulfide (H₂S) — the very same gas that gives rotten eggs their stink. So if you could ever take a sniff of Uranus's atmosphere, it would smell exactly like a basket of rotten eggs!"}
          </p>
          <div className="rounded-md bg-black/40 border border-yellow-300/20 px-3 py-2 text-center">
            <span className={`text-[11px] text-yellow-200 font-bold ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "រកឃើញក្នុងឆ្នាំ ២០១៨ ដោយតេឡេទស្សន៍ Gemini North នៅហាវ៉ៃ" : "Confirmed in 2018 by the Gemini North telescope in Hawaii"}
            </span>
          </div>
        </div>
      </div>

      {/* Composition mini-bars */}
      <div className="mt-4 rounded-2xl border border-cyan-200/25 bg-black/40 p-5" data-testid="uranus-composition">
        <h4 className={`text-sm font-bold text-cyan-100 mb-3 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "បរិយាកាសរបស់វា — មានអ្វីខ្លះ?" : "What's in the atmosphere?"}
        </h4>
        <div className="space-y-3">
          {[
            { en: "Hydrogen H₂",         kh: "ហ្ស៊ីដ្រូសែន H₂",      pct: 83, color: "from-cyan-700 to-cyan-300" },
            { en: "Helium He",           kh: "អេលីយ៉ូម He",           pct: 15, color: "from-teal-700 to-teal-300" },
            { en: "Methane CH₄",         kh: "មេតាន CH₄",             pct:  2, color: "from-emerald-700 to-emerald-300" },
            { en: "Hydrogen sulfide H₂S (trace)", kh: "ហ្ស៊ីដ្រូសែន ស៊ុលហ្វីត H₂S (កម្រិតតិចតួច)", pct: 0.5, color: "from-yellow-700 to-yellow-300", isTrace: true },
          ].map((row) => {
            const w = row.pct < 1 ? 2 : row.pct;
            return (
              <div key={row.en}>
                <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                  <span className="text-white/85 font-semibold">{isKh ? row.kh : row.en}</span>
                  <span className="font-mono text-white/85">{row.isTrace ? (isKh ? "តិច" : "<1%") : `${row.pct}%`}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${row.color}`} style={{ width: `${w}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 4. Earth vs Uranus chart ──────────────────────────────────────────────

function ComparisonChart({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  type Row = {
    Icon: React.ComponentType<{ className?: string }>;
    labelEn: string; labelKh: string;
    earthEn: string; earthKh: string; earthValue: number;
    urEn: string;    urKh: string;    urValue: number;
  };

  const rows: Row[] = [
    {
      Icon: RotateCcw,
      labelEn: "Axial tilt",
      labelKh: "អ័ក្សផ្អៀង",
      earthEn: "23.5°",
      earthKh: "២៣.៥°",
      earthValue: 23.5,
      urEn: "98°",
      urKh: "៩៨°",
      urValue: 98,
    },
    {
      Icon: Thermometer,
      labelEn: "Average temperature",
      labelKh: "សីតុណ្ហភាព ជាមធ្យម",
      earthEn: "+15 °C",
      earthKh: "+១៥ °C",
      earthValue: 15,
      urEn: "−224 °C (coldest planet!)",
      urKh: "−២២៤ °C (ភពត្រជាក់ជាងគេ!)",
      urValue: 224,
    },
    {
      Icon: CalendarDays,
      labelEn: "Year length",
      labelKh: "ប្រវែងឆ្នាំ",
      earthEn: "1 Earth year",
      earthKh: "១ ឆ្នាំ ផែនដី",
      earthValue: 1,
      urEn: "84 Earth years",
      urKh: "៨៤ ឆ្នាំ ផែនដី",
      urValue: 84,
    },
    {
      Icon: Ruler,
      labelEn: "Distance from the Sun",
      labelKh: "ចម្ងាយ ពីព្រះអាទិត្យ",
      earthEn: "1 AU",
      earthKh: "១ AU",
      earthValue: 1,
      urEn: "19 AU",
      urKh: "១៩ AU",
      urValue: 19,
    },
  ];

  return (
    <div
      className="rounded-3xl border border-cyan-200/20 bg-gradient-to-br from-[#000814] via-[#073d4a] to-[#000814] p-5 sm:p-7"
      data-testid="earth-uranus-compare"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-cyan-300/15 border border-cyan-200/40 flex items-center justify-center text-cyan-100">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ផែនដី ធៀប អ៊ុយរ៉ានុស — តួលេខរហ័ស" : "Earth vs. Uranus — at a glance"}
        </h3>
      </div>

      <div className="space-y-5">
        {rows.map((r) => {
          const max = Math.max(r.earthValue, r.urValue);
          const earthPct = Math.max(2, (r.earthValue / max) * 100);
          const urPct    = Math.max(2, (r.urValue   / max) * 100);
          return (
            <div key={r.labelEn}>
              <div className="flex items-center gap-2 mb-2">
                <r.Icon className="w-4 h-4 text-cyan-200" />
                <span className={`text-sm font-semibold text-white ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? r.labelKh : r.labelEn}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className="text-emerald-300 font-semibold">{isKh ? "ផែនដី" : "Earth"}</span>
                    <span className="font-mono text-white/85">{isKh ? r.earthKh : r.earthEn}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-700 to-emerald-300" style={{ width: `${earthPct}%` }} />
                  </div>
                </div>
                <div>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className="text-cyan-200 font-semibold">{isKh ? "អ៊ុយរ៉ានុស" : "Uranus"}</span>
                    <span className="font-mono text-white/85">{isKh ? r.urKh : r.urEn}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-700 to-cyan-300" style={{ width: `${urPct}%` }} />
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

// ── Main wrapper ──────────────────────────────────────────────────────────

export function UranusPlanetModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="uranus-planet-module"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-cyan-300/15 border border-cyan-200/30 flex items-center justify-center text-cyan-100">
            <RotateCcw className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-cyan-100 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Uranus: The Sideways Planet", "អ៊ុយរ៉ានុស៖ ភពផ្អៀង")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-cyan-200/30 to-transparent" />
      </div>

      <div
        className="rounded-3xl border border-cyan-200/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(34,211,238,0.12) 0%,rgba(7,89,108,0.55) 50%,rgba(2,6,12,0.95) 100%)",
          boxShadow: "0 0 40px rgba(34,211,238,0.18) inset",
        }}
      >
        <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-cyan-300/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-teal-900/40 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-5 items-center">
          <div className="flex justify-center">
            <svg viewBox="-80 -80 160 160" className="w-40 h-40" aria-hidden>
              <UranusDefs idPrefix="hero" />
              <UranusBody prefix="hero" cx={0} cy={0} r={50} withRings ringTilt={0} />
            </svg>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#cffafe 0%,#22d3ee 55%,#a5f3fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(34,211,238,0.3)",
              }}
            >
              {t("The Tipped-Over World", "ពិភពដែលផ្ដួលផ្អៀង")}
            </h2>
            <p className={`text-white/80 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "A pale cyan ice giant rolling on its side, with seasons that last 42 Earth-years, clouds that stink of rotten eggs, and a place in history as the first planet ever found through a telescope.",
                "ភពទឹកកកយក្ស ពណ៌ខៀវ-បៃតង ស្រាល ដែលប្រឡាក់ចំហៀង ដោយមានរដូវកាល យូរ ៤២ ឆ្នាំផែនដី ពពកមានក្លិនពងមាន់រលួយ និងកន្លែងក្នុងប្រវត្តិសាស្ត្រ ជាភពដំបូងគេ ដែលរកឃើញតាមរយៈតេឡេទស្សន៍។",
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6"><DiscoveryPanel lang={lang} /></div>
      <div className="mb-6"><TiltPanel lang={lang} /></div>
      <div className="mb-6"><AtmospherePanel lang={lang} /></div>
      <ComparisonChart lang={lang} />

      <p className={`mt-5 text-center text-cyan-100/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "Tipped, frozen, and faintly stinking — Uranus is the strangest, quietest world in the solar system, hiding in plain sight until 1781.",
          "ផ្ដួល ត្រជាក់ និងមានក្លិនស្តើងៗ — អ៊ុយរ៉ានុស ជាពិភពចម្លែក និងស្ងប់ស្ងាត់បំផុត ក្នុងប្រព័ន្ធព្រះអាទិត្យ លាក់ខ្លួននៅចំហ រហូតដល់ឆ្នាំ ១៧៨១។",
        )}
      </p>
    </section>
  );
}
