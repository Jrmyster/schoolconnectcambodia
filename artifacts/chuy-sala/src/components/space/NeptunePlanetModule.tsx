import {
  Snowflake, Wind, Calculator, Telescope, Tornado,
  Ruler, Gauge, CalendarDays, Sun as SunIcon,
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
        <div className="w-8 h-8 rounded-lg bg-sky-400/15 border border-sky-300/40 flex items-center justify-center text-sky-200">
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

// Reusable Neptune body defs (azure blue ice giant)
function NeptuneDefs({ idPrefix }: { idPrefix: string }) {
  return (
    <defs>
      <radialGradient id={`${idPrefix}-neptune`} cx="0.4" cy="0.35" r="0.75">
        <stop offset="0%"  stopColor="#bae6fd" />
        <stop offset="35%" stopColor="#3b82f6" />
        <stop offset="75%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#0a1530" />
      </radialGradient>
      <linearGradient id={`${idPrefix}-band`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"  stopColor="#1e3a8a" stopOpacity="0" />
        <stop offset="50%" stopColor="#bfdbfe" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${idPrefix}-darkspot`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%"  stopColor="#1e293b" />
        <stop offset="60%" stopColor="#020617" />
        <stop offset="100%" stopColor="#000" />
      </radialGradient>
    </defs>
  );
}

function NeptuneBody({
  prefix, cx, cy, r, withDarkSpot = false,
}: { prefix: string; cx: number; cy: number; r: number; withDarkSpot?: boolean }) {
  const bands = [-0.6, -0.3, 0, 0.3, 0.55].map((f, i) => ({
    y: cy + r * f,
    rx: r * Math.sqrt(Math.max(0, 1 - f * f)) - 1,
    ry: r * 0.05,
    key: i,
  }));
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${prefix}-neptune)`} />
      {bands.map((b) => (
        <ellipse key={b.key} cx={cx} cy={b.y} rx={b.rx} ry={b.ry} fill={`url(#${prefix}-band)`} opacity="0.5" />
      ))}
      {withDarkSpot && (
        <ellipse
          cx={cx - r * 0.15}
          cy={cy - r * 0.1}
          rx={r * 0.22}
          ry={r * 0.14}
          fill={`url(#${prefix}-darkspot)`}
        />
      )}
    </g>
  );
}

// ── 1. The Ice Giant ──────────────────────────────────────────────────────

function IceGiantPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-sky-300/20 bg-gradient-to-br from-[#020617] via-[#0c1a3b] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Snowflake className="w-4 h-4" />}
        en="The Ice Giant"
        kh="ភពទឹកកកយក្ស"
        lang={lang}
        descEn="Neptune is the 8th and most distant planet from the Sun. It orbits so far away that sunlight — which reaches Earth in just 8 minutes — takes more than 4 hours to make the journey to Neptune. Out there it is dim, freezing cold (−214 °C), and forever twilight. Unlike the larger gas giants Jupiter and Saturn, Neptune contains a lot of methane gas in its upper atmosphere, which absorbs red light and reflects only the blue — giving it that famous, breathtaking deep azure colour."
        descKh="ណិបទូន ជាភពទី ៨ និងឆ្ងាយជាងគេ ពីព្រះអាទិត្យ។ វាធ្វើគន្លងឆ្ងាយណាស់ រហូតពន្លឺព្រះអាទិត្យ — ដែលធ្វើដំណើរមកដល់ផែនដី ត្រឹមតែ ៨ នាទី — ត្រូវការពេលជាង ៤ ម៉ោង ដើម្បីទៅដល់ណិបទូន។ នៅទីនោះ ពន្លឺស្រអាប់ ត្រជាក់ខ្លាំង (−២១៤ °C) ហើយជាសន្ធ្យាជារៀងរហូត។ ខុសពីភពឧស្ម័នយក្ស ភពព្រហស្បតិ៍ និងភពសៅរ៍ ណិបទូន មានឧស្ម័នមេតានច្រើន នៅបរិយាកាសខាងលើ ដែលស្រូបយកពន្លឺក្រហម ហើយឆ្លុះបញ្ចាំងតែពន្លឺខៀវ — ធ្វើឱ្យវាមានពណ៌ខៀវជ្រៅដ៏ស្រស់ស្អាត ល្បីល្បាញនោះ។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Light-travel-time diagram */}
        <div className="rounded-2xl border border-sky-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <SunIcon className="w-4 h-4 text-sky-300" />
            <h4 className={`text-sm font-bold text-sky-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ពន្លឺ ត្រូវការ ៤ ម៉ោង ដើម្បីទៅដល់" : "Sunlight takes over 4 hours"}
            </h4>
          </div>

          <svg
            viewBox="0 0 320 200"
            className="w-full h-auto"
            aria-label={isKh ? "ពន្លឺ ពីព្រះអាទិត្យ ទៅផែនដី និងណិបទូន" : "Light travel time from the Sun to Earth and Neptune"}
            data-testid="light-travel"
          >
            <NeptuneDefs idPrefix="lt" />
            <defs>
              <radialGradient id="lt-sun" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%"  stopColor="#fef9c3" />
                <stop offset="55%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#b45309" />
              </radialGradient>
              <radialGradient id="lt-earth" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%"  stopColor="#86efac" />
                <stop offset="60%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </radialGradient>
            </defs>

            {/* Sun on the left */}
            <circle cx="30" cy="100" r="22" fill="url(#lt-sun)" />
            <text x="30" y="150" textAnchor="middle" fontSize="10" fill="#facc15" fontWeight="700">
              {isKh ? "ព្រះអាទិត្យ" : "Sun"}
            </text>

            {/* Photon dashes Sun → Earth (short) */}
            <line x1="55" y1="100" x2="105" y2="100" stroke="#fde68a" strokeWidth="1.2" strokeDasharray="3 3" />
            <polygon points="105,96 105,104 113,100" fill="#fde68a" />
            <text x="80" y="92" textAnchor="middle" fontSize="9" fill="#fde68a" fontFamily="monospace">{isKh ? "៨ នាទី" : "8 min"}</text>

            {/* Earth (close) */}
            <circle cx="118" cy="100" r="7" fill="url(#lt-earth)" />
            <text x="118" y="155" textAnchor="middle" fontSize="10" fill="#86efac" fontWeight="700">
              {isKh ? "ផែនដី" : "Earth"}
            </text>

            {/* Long dashes Sun → Neptune */}
            <line x1="55" y1="115" x2="265" y2="115" stroke="#bae6fd" strokeWidth="1.2" strokeDasharray="3 3" />
            <polygon points="265,111 265,119 273,115" fill="#bae6fd" />
            <text x="160" y="108" textAnchor="middle" fontSize="9" fill="#bae6fd" fontFamily="monospace">
              {isKh ? "៤ ម៉ោង ៣ នាទី" : "4 h 3 min"}
            </text>

            {/* Neptune (far right) */}
            <NeptuneBody prefix="lt" cx={285} cy={115} r={14} />
            <text x="285" y="155" textAnchor="middle" fontSize="10" fill="#bae6fd" fontWeight="700">
              {isKh ? "ណិបទូន" : "Neptune"}
            </text>

            {/* Distance scale */}
            <text x="160" y="190" textAnchor="middle" fontSize="9" fill="#cbd5e1" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ឆ្ងាយ ៣០ ដង ជាងផែនដី ពីព្រះអាទិត្យ" : "30× farther from the Sun than Earth"}</tspan>
            </text>
          </svg>
        </div>

        {/* Methane absorption diagram */}
        <div className="rounded-2xl border border-sky-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Snowflake className="w-4 h-4 text-sky-300" />
            <h4 className={`text-sm font-bold text-sky-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ហេតុអ្វី បានជាមានពណ៌ខៀវ?" : "Why is it so blue?"}
            </h4>
          </div>

          <svg
            viewBox="0 0 320 180"
            className="w-full h-auto"
            aria-label={isKh ? "មេតាន ស្រូបពន្លឺក្រហម ឆ្លុះបញ្ចាំងពន្លឺខៀវ" : "Methane absorbs red light, reflects blue light"}
            data-testid="methane-absorption"
          >
            <NeptuneDefs idPrefix="ma" />

            {/* Incoming white sunlight (left) → multi-color rays */}
            <text x="30" y="20" textAnchor="middle" fontSize="9" fill="#e2e8f0">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ពន្លឺព្រះអាទិត្យ" : "Sunlight"}</tspan>
            </text>
            {/* Three rays in: red, green, blue */}
            <line x1="10" y1="50" x2="120" y2="80" stroke="#dc2626" strokeWidth="2" />
            <line x1="10" y1="80" x2="120" y2="80" stroke="#16a34a" strokeWidth="2" />
            <line x1="10" y1="110" x2="120" y2="80" stroke="#3b82f6" strokeWidth="2" />

            {/* Neptune body */}
            <NeptuneBody prefix="ma" cx={170} cy={90} r={50} />
            <text x="170" y="160" textAnchor="middle" fontSize="10" fill="#bae6fd" fontWeight="700">CH₄</text>

            {/* Red ray ends at planet (absorbed — small X mark) */}
            <line x1="120" y1="80" x2="135" y2="80" stroke="#dc2626" strokeWidth="2" />
            <g transform="translate(140 80)" stroke="#dc2626" strokeWidth="1.5">
              <line x1="-3" y1="-3" x2="3" y2="3" />
              <line x1="-3" y1="3" x2="3" y2="-3" />
            </g>
            <text x="148" y="68" fontSize="8" fill="#fca5a5" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ស្រូប" : "absorbed"}</tspan>
            </text>

            {/* Blue ray reflected back out (right side) */}
            <line x1="220" y1="80" x2="310" y2="50" stroke="#3b82f6" strokeWidth="2" />
            <polygon points="310,50 304,52 306,46" fill="#3b82f6" />
            <text x="295" y="42" fontSize="9" fill="#bae6fd" fontWeight="700">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ឆ្លុះបញ្ចាំង" : "reflected"}</tspan>
            </text>

            {/* Green ray reflected too (more muted) */}
            <line x1="220" y1="100" x2="310" y2="120" stroke="#16a34a" strokeWidth="1.5" opacity="0.7" />
          </svg>

          <p className={`mt-3 text-xs text-sky-100/85 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ឧស្ម័នមេតាន (CH₄) នៅបរិយាកាស ស្រូបយកពន្លឺក្រហម ហើយ​ឆ្លុះបញ្ចាំង ពន្លឺខៀវ មកវិញ — នោះហើយ ជាមូលហេតុដែលណិបទូន មានពណ៌ខៀវជ្រៅ។"
              : "Methane (CH₄) in the upper atmosphere absorbs the red part of sunlight and reflects the blue part back into space — and that is why Neptune glows such a deep azure."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 2. Supersonic Winds ───────────────────────────────────────────────────

function SupersonicPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  // Speed comparison data — each value in km/h
  const speeds = [
    { en: "Strongest hurricane on Earth", kh: "ខ្យល់ព្យុះកំពូល លើផែនដី", v: 320, color: "from-emerald-700 to-emerald-300", text: "text-emerald-200" },
    { en: "Speed of sound (sea level)",   kh: "ល្បឿនសំឡេង (ផ្ទៃសមុទ្រ)", v: 1235, color: "from-yellow-700 to-yellow-300", text: "text-yellow-200" },
    { en: "Fighter jet (top speed)",      kh: "យន្តហោះចម្បាំង (ល្បឿនកំពូល)", v: 2450, color: "from-orange-700 to-orange-300", text: "text-orange-200" },
    { en: "Neptune's wind",               kh: "ខ្យល់នៅណិបទូន", v: 2100, color: "from-sky-700 to-sky-300", text: "text-sky-200", highlight: true },
  ];

  const max = Math.max(...speeds.map((s) => s.v));

  return (
    <div className="rounded-3xl border border-sky-300/20 bg-gradient-to-br from-[#020617] via-[#0c1a3b] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Wind className="w-4 h-4" />}
        en="Supersonic Winds"
        kh="ខ្យល់ព្យុះល្បឿនលឿនជាងសំឡេង"
        lang={lang}
        descEn="Neptune is the windiest planet in the entire solar system. The Voyager 2 spacecraft, flying past in 1989, photographed an Earth-sized storm called the Great Dark Spot. The winds inside it tear around the planet at over 2,000 km/h — faster than a modern fighter jet, and well above the speed of sound on Earth. The strangest part: this happens far from the Sun, where there is almost no warmth to power weather at all."
        descKh="ណិបទូន ជាភពដែលមានខ្យល់ខ្លាំងបំផុត ក្នុងប្រព័ន្ធព្រះអាទិត្យទាំងមូល។ យានអវកាស វ័រយ៍ហ្គឺរ ២ ដែលហោះកាត់ ក្នុងឆ្នាំ ១៩៨៩ បានថតរូបព្យុះមួយ ធំស្មើផែនដី ហៅថា ចំណុចខ្មៅយក្ស។ ខ្យល់ខាងក្នុងវា វិលជុំវិញភពនេះ លើសពី ២,០០០ គម/ម៉ោង — លឿនជាងយន្តហោះចម្បាំងទំនើប និងលឿនជាងល្បឿនសំឡេង នៅលើផែនដី។ រឿងដែលចម្លែកបំផុត៖ វាកើតឡើងនៅឆ្ងាយពីព្រះអាទិត្យ កន្លែងស្ទើរតែគ្មានកំដៅ ដើម្បីផ្តល់ថាមពលឱ្យអាកាសធាតុ។"
      />

      {/* Neptune with Great Dark Spot */}
      <div className="rounded-2xl border border-sky-300/25 bg-black/40 p-5 mb-4" data-testid="dark-spot">
        <h4 className={`text-sm font-bold text-sky-200 mb-3 text-center ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ចំណុចខ្មៅយក្ស — ព្យុះធំស្មើផែនដី" : "The Great Dark Spot — a storm the size of Earth"}
        </h4>
        <svg viewBox="0 0 600 220" className="w-full h-auto" aria-label={isKh ? "ណិបទូន និងចំណុចខ្មៅយក្ស" : "Neptune and the Great Dark Spot"}>
          <NeptuneDefs idPrefix="ds" />
          <defs>
            <radialGradient id="ds-earth" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="60%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </radialGradient>
          </defs>

          {/* Stars */}
          {[[40,30],[110,50],[200,25],[350,40],[490,30],[560,55],[80,200],[280,205],[450,200],[540,210]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1.2" fill="#fff" opacity="0.7" />
          ))}

          <NeptuneBody prefix="ds" cx={210} cy={110} r={90} withDarkSpot />

          {/* Wind arrows wrapping around */}
          <g stroke="#bae6fd" strokeWidth="1.5" fill="none" opacity="0.8">
            <path d="M 130 60 Q 210 30 290 60" />
            <polygon points="290,60 282,57 285,65" fill="#bae6fd" />
            <path d="M 130 160 Q 210 190 290 160" />
            <polygon points="290,160 282,163 285,155" fill="#bae6fd" />
          </g>

          {/* Spot label */}
          <text x="295" y="40" textAnchor="middle" fontSize="11" fill="#cbd5e1" fontWeight="700">
            {isKh ? "ចំណុចខ្មៅយក្ស" : "Great Dark Spot"}
          </text>
          <line x1="270" y1="48" x2="200" y2="100" stroke="#cbd5e1" strokeWidth="1" opacity="0.7" />

          {/* True-scale Earth on the right */}
          <line x1="320" y1="120" x2="440" y2="120" stroke="#86efac" strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="440,116 440,124 448,120" fill="#86efac" />
          <circle cx="500" cy="120" r="13" fill="url(#ds-earth)" />
          <text x="500" y="155" textAnchor="middle" fontSize="11" fill="#86efac" fontWeight="700">
            {isKh ? "ផែនដី" : "Earth"}
          </text>
          <text x="500" y="170" textAnchor="middle" fontSize="9" fill="#bbf7d0" fontStyle="italic">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "សម្រាប់ប្រៀបធៀប" : "for scale"}</tspan>
          </text>
        </svg>
      </div>

      {/* Wind-speed bar chart */}
      <div className="rounded-2xl border border-sky-300/25 bg-black/40 p-5" data-testid="wind-speed-chart">
        <h4 className={`text-sm font-bold text-sky-200 mb-4 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ល្បឿនខ្យល់ — ប្រៀបធៀប (គម/ម៉ោង)" : "Wind speeds compared (km/h)"}
        </h4>
        <div className="space-y-3">
          {speeds.map((s) => {
            const pct = Math.max(2, (s.v / max) * 100);
            return (
              <div key={s.en}>
                <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                  <span className={`font-semibold ${s.text} ${s.highlight ? "" : ""}`}>
                    {isKh ? s.kh : s.en}
                    {s.highlight && (
                      <span className={`ml-2 text-[10px] text-sky-300 italic ${isKh ? "font-khmer not-italic" : ""}`}>
                        {isKh ? "← នៅទីនេះ" : "← here"}
                      </span>
                    )}
                  </span>
                  <span className={`font-mono text-white/85 ${isKh ? "font-khmer" : ""}`}>~{s.v.toLocaleString()} {isKh ? "គម/ម៉ោង" : "km/h"}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${s.color}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 3. Discovered by Math ─────────────────────────────────────────────────

function DiscoveryPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  const steps: { Icon: React.ComponentType<{ className?: string }>; en: string; kh: string; bodyEn: string; bodyKh: string }[] = [
    {
      Icon: Telescope,
      en: "1. The mystery: Uranus wobbles",
      kh: "១. អាថ៌កំបាំង៖ អ៊ុយរ៉ានុស រអិលផ្លូវ",
      bodyEn: "By the early 1800s, astronomers had carefully tracked Uranus for decades — but it kept drifting away from where Newton's laws of gravity said it should be. Something invisible was tugging it off course.",
      bodyKh: "ដើមសតវត្សរ៍ទី ១៩ តារាវិទូ បានតាមដានអ៊ុយរ៉ានុស ដោយប្រុងប្រយ័ត្ន អស់រយៈពេលជាច្រើនទសវត្សរ៍ — ប៉ុន្តែ វារអិលទៅឆ្ងាយ ពីកន្លែងដែលច្បាប់ទំនាញ របស់ញូតុន គួរតែឱ្យវានៅ។ មានអ្វីមួយ ដែលមើលមិនឃើញ កំពុងទាញវាចេញពីផ្លូវ។",
    },
    {
      Icon: Calculator,
      en: "2. The maths: predict the unseen",
      kh: "២. គណិតវិទ្យា៖ ទស្សន៍ទាយវត្ថុមើលមិនឃើញ",
      bodyEn: "Two mathematicians — Urbain Le Verrier in France and John Couch Adams in England — used pen, paper, algebra, and Newton's laws to calculate exactly where an unseen 8th planet must be, based only on the way it was pulling on Uranus.",
      bodyKh: "គណិតវិទូពីរនាក់ — អឺរបាំង ឡឺ វ៉េរ្យេ នៅប្រទេសបារាំង និងចន ខូច អាដាំ នៅប្រទេសអង់គ្លេស — បានប្រើប៊ិច ក្រដាស ពិជគណិត និងច្បាប់របស់ញូតុន ដើម្បីគណនាឱ្យបានច្បាស់ ថាភពទី ៨ ដែលមើលមិនឃើញ ត្រូវនៅឯណា — ដោយផ្អែកលើ របៀបដែលវា ទាញអ៊ុយរ៉ានុស ប៉ុណ្ណោះ។",
    },
    {
      Icon: SunIcon,
      en: "3. The discovery: 23 Sept 1846",
      kh: "៣. ការរកឃើញ៖ ២៣ កញ្ញា ១៨៤៦",
      bodyEn: "On the night of September 23, 1846, astronomer Johann Galle in Berlin pointed his telescope to the exact spot Le Verrier had calculated — and Neptune was right there, less than 1° from the predicted position. A planet was found by mathematics before anyone ever saw it.",
      bodyKh: "នៅយប់ថ្ងៃទី ២៣ ខែកញ្ញា ឆ្នាំ ១៨៤៦ តារាវិទូ យ៉ូហាន ហ្គាល្លេ នៅទីក្រុងប៊ែរឡាំង បានបង្វិលកែវយឹតរបស់គាត់ ឆ្ពោះទៅកន្លែងពិតប្រាកដ ដែលឡឺ វ៉េរ្យេ បានគណនា — ហើយណិបទូន នៅទីនោះមែន តិចជាង ១° ពីទីតាំងដែលបានទស្សន៍ទាយ។ ភពមួយ ត្រូវបានរកឃើញ ដោយគណិតវិទ្យា មុនពេលនរណាម្នាក់ បានឃើញវា។",
    },
  ];

  return (
    <div className="rounded-3xl border border-sky-300/20 bg-gradient-to-br from-[#020617] via-[#0c1a3b] to-[#000814] p-5 sm:p-7">
      <PanelHeader
        icon={<Calculator className="w-4 h-4" />}
        en="Discovered by Mathematics"
        kh="រកឃើញដោយគណិតវិទ្យា"
        lang={lang}
        descEn="Neptune is the only planet in our solar system that was found not with a telescope, but with a pen and paper. Astronomers couldn't see it — but they did the maths and predicted exactly where to look."
        descKh="ណិបទូន ជាភពតែមួយគត់ ក្នុងប្រព័ន្ធព្រះអាទិត្យរបស់យើង ដែលត្រូវបានរកឃើញ មិនមែនដោយកែវយឹតទេ ប៉ុន្តែ ដោយប៊ិច និងក្រដាស។ តារាវិទូ មើលវាមិនឃើញ — ប៉ុន្តែ ពួកគេបានធ្វើគណនា ហើយទស្សន៍ទាយឱ្យបានច្បាស់ ថាត្រូវមើលនៅឯណា។"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="discovery-steps">
        {steps.map((s, i) => {
          const Icon = s.Icon;
          return (
            <div key={i} className="rounded-2xl border border-sky-300/25 bg-black/40 p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-sky-400/15 border border-sky-300/30 flex items-center justify-center text-sky-200 flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className={`text-sm font-bold text-sky-100 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? s.kh : s.en}
                </h4>
              </div>
              <p className={`text-xs text-white/75 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? s.bodyKh : s.bodyEn}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-md bg-sky-500/10 border border-sky-300/20 p-3">
        <p className={`text-sky-100/85 text-xs leading-relaxed text-center italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
          {isKh
            ? "« នេះគឺជាជោគជ័យ ដ៏ឆ្លាតវៃបំផុត របស់គណិតវិទ្យា — ភពមួយ រកឃើញនៅចុងប៊ិច »"
            : "“This was one of the most brilliant triumphs of mathematics — a planet found at the tip of a pen.”"}
        </p>
      </div>
    </div>
  );
}

// ── 4. Earth vs Neptune chart ─────────────────────────────────────────────

function ComparisonChart({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  type Row = {
    Icon: React.ComponentType<{ className?: string }>;
    labelEn: string; labelKh: string;
    earthEn: string; earthKh: string; earthValue: number;
    nepEn: string;   nepKh: string;   nepValue: number;
  };

  const rows: Row[] = [
    {
      Icon: Ruler,
      labelEn: "Distance from the Sun",
      labelKh: "ចម្ងាយ ពីព្រះអាទិត្យ",
      earthEn: "150 million km (1 AU)",
      earthKh: "១៥០ លាន គម (១ AU)",
      earthValue: 1,
      nepEn: "4,500 million km (30 AU)",
      nepKh: "៤,៥០០ លាន គម (៣០ AU)",
      nepValue: 30,
    },
    {
      Icon: Tornado,
      labelEn: "Wind speed",
      labelKh: "ល្បឿនខ្យល់",
      earthEn: "~320 km/h (record)",
      earthKh: "~៣២០ គម/ម៉ោង (កំណត់ត្រា)",
      earthValue: 320,
      nepEn: "~2,100 km/h",
      nepKh: "~២,១០០ គម/ម៉ោង",
      nepValue: 2100,
    },
    {
      Icon: CalendarDays,
      labelEn: "Year length",
      labelKh: "ប្រវែងឆ្នាំ",
      earthEn: "1 Earth year",
      earthKh: "១ ឆ្នាំ ផែនដី",
      earthValue: 1,
      nepEn: "165 Earth years",
      nepKh: "១៦៥ ឆ្នាំ ផែនដី",
      nepValue: 165,
    },
  ];

  return (
    <div
      className="rounded-3xl border border-sky-300/20 bg-gradient-to-br from-[#000814] via-[#0c1a3b] to-[#000814] p-5 sm:p-7"
      data-testid="earth-neptune-compare"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-sky-300/15 border border-sky-300/40 flex items-center justify-center text-sky-200">
          <Gauge className="w-4 h-4" />
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ផែនដី ធៀប ណិបទូន — តួលេខរហ័ស" : "Earth vs. Neptune — at a glance"}
        </h3>
      </div>

      <div className="space-y-5">
        {rows.map((r) => {
          const max = Math.max(r.earthValue, r.nepValue);
          const earthPct = Math.max(2, (r.earthValue / max) * 100);
          const nepPct   = Math.max(2, (r.nepValue   / max) * 100);
          return (
            <div key={r.labelEn}>
              <div className="flex items-center gap-2 mb-2">
                <r.Icon className="w-4 h-4 text-sky-300" />
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
                    <span className="text-sky-200 font-semibold">{isKh ? "ណិបទូន" : "Neptune"}</span>
                    <span className="font-mono text-white/85">{isKh ? r.nepKh : r.nepEn}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-700 to-sky-300" style={{ width: `${nepPct}%` }} />
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

export function NeptunePlanetModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="neptune-planet-module"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-sky-400/15 border border-sky-300/30 flex items-center justify-center text-sky-200">
            <Snowflake className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-sky-200 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Neptune: The Supersonic Ice Giant", "ណិបទូន៖ ភពទឹកកកយក្សដែលមានល្បឿនលឿនជាងសំឡេង")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-sky-300/30 to-transparent" />
      </div>

      <div
        className="rounded-3xl border border-sky-300/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(56,189,248,0.12) 0%,rgba(30,58,138,0.55) 50%,rgba(2,6,12,0.95) 100%)",
          boxShadow: "0 0 40px rgba(56,189,248,0.18) inset",
        }}
      >
        <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-sky-400/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-blue-900/40 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-5 items-center">
          <div className="flex justify-center">
            <svg viewBox="-60 -60 120 120" className="w-40 h-40" aria-hidden>
              <NeptuneDefs idPrefix="hero" />
              <NeptuneBody prefix="hero" cx={0} cy={0} r={50} withDarkSpot />
            </svg>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#bae6fd 0%,#3b82f6 55%,#bfdbfe 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(56,189,248,0.3)",
              }}
            >
              {t("The Far Blue World", "ពិភពខៀវឆ្ងាយ")}
            </h2>
            <p className={`text-white/80 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "A distant azure world where sunlight takes more than 4 hours to arrive, methane paints the clouds deep blue, and supersonic winds — 2,000 km/h — howl through endless twilight. The only planet humanity ever found by maths before by sight.",
                "ពិភពខៀវដ៏ឆ្ងាយ កន្លែងពន្លឺព្រះអាទិត្យ ត្រូវការពេលជាង ៤ ម៉ោង ដើម្បីមកដល់ មេតានលាបពពកឱ្យមានពណ៌ខៀវជ្រៅ ហើយខ្យល់ លឿនជាងសំឡេង — ២,០០០ គម/ម៉ោង — ចេចវេចក្នុងសន្ធ្យាដ៏អស់ទីបញ្ចប់។ ជាភពតែមួយគត់ ដែលមនុស្សជាតិ បានរកឃើញដោយគណិតវិទ្យា មុនពេលឃើញដោយភ្នែក។",
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6"><IceGiantPanel lang={lang} /></div>
      <div className="mb-6"><SupersonicPanel lang={lang} /></div>
      <div className="mb-6"><DiscoveryPanel lang={lang} /></div>
      <ComparisonChart lang={lang} />

      <p className={`mt-5 text-center text-sky-200/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "Distant, blue, and supersonic — Neptune was found at the tip of a pen, and still hides most of its secrets in the dark.",
          "ឆ្ងាយ ខៀវ និងលឿនជាងសំឡេង — ណិបទូន ត្រូវបានរកឃើញ នៅចុងប៊ិច ហើយនៅតែលាក់ ការសម្ងាត់ភាគច្រើនរបស់វា ក្នុងភាពងងឹត។",
        )}
      </p>
    </section>
  );
}
