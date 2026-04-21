import {
  Crown, Wind, Tornado, Moon as MoonIcon,
  Flame, Droplets, Snowflake, Mountain,
  Scale, ArrowDown, Orbit,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

// ── Reusable header (jovian palette) ──────────────────────────────────────

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
        <div className="w-8 h-8 rounded-lg bg-orange-400/15 border border-orange-300/40 flex items-center justify-center text-orange-200">
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

// Reusable Jupiter banded gradient defs
function JupiterDefs({ idPrefix }: { idPrefix: string }) {
  return (
    <defs>
      <radialGradient id={`${idPrefix}-jupiter`} cx="0.4" cy="0.35" r="0.75">
        <stop offset="0%"  stopColor="#fef3c7" />
        <stop offset="35%" stopColor="#f59e0b" />
        <stop offset="70%" stopColor="#9a3412" />
        <stop offset="100%" stopColor="#3b0a02" />
      </radialGradient>
      <linearGradient id={`${idPrefix}-band-light`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"  stopColor="#fde68a" stopOpacity="0" />
        <stop offset="50%" stopColor="#fef3c7" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${idPrefix}-band-dark`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"  stopColor="#7c2d12" stopOpacity="0" />
        <stop offset="50%" stopColor="#9a3412" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${idPrefix}-redspot`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%"  stopColor="#fca5a5" />
        <stop offset="55%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </radialGradient>
    </defs>
  );
}

// Helper to draw a banded Jupiter at (cx, cy) with radius r, includes a red spot toggle
function JupiterBody({
  prefix, cx, cy, r, withRedSpot = false,
}: { prefix: string; cx: number; cy: number; r: number; withRedSpot?: boolean }) {
  const bands = [-0.7, -0.45, -0.2, 0.05, 0.3, 0.55].map((f, i) => ({
    y: cy + r * f,
    rx: r * Math.sqrt(Math.max(0, 1 - f * f)) - 1,
    ry: r * 0.06,
    light: i % 2 === 0,
    key: i,
  }));

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${prefix}-jupiter)`} />
      {bands.map((b) => (
        <ellipse
          key={b.key}
          cx={cx}
          cy={b.y}
          rx={b.rx}
          ry={b.ry}
          fill={`url(#${prefix}-band-${b.light ? "light" : "dark"})`}
          opacity={b.light ? 0.6 : 0.55}
        />
      ))}
      {withRedSpot && (
        <ellipse
          cx={cx + r * 0.2}
          cy={cy + r * 0.25}
          rx={r * 0.22}
          ry={r * 0.13}
          fill={`url(#${prefix}-redspot)`}
        />
      )}
    </g>
  );
}

// ── 1. The Gas Giant's Scale ──────────────────────────────────────────────

function ScalePanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-orange-300/20 bg-gradient-to-br from-[#1a0902] via-[#3b1606] to-[#0a0300] p-5 sm:p-7">
      <PanelHeader
        icon={<Crown className="w-4 h-4" />}
        en="The Gas Giant's Scale"
        kh="ទំហំនៃភពឧស្ម័នយក្ស"
        lang={lang}
        descEn="Jupiter is the 5th planet from the Sun and by far the largest in the solar system. It is so enormous that you could fit every other planet — Mercury, Venus, Earth, Mars, Saturn, Uranus, and Neptune — inside it twice over and still have room left. Like Saturn, it has no solid surface to land on; it is made almost entirely of hydrogen and helium gas, the same elements that fuel the Sun."
        descKh="ភពព្រហស្បតិ៍ ជាភពទី ៥ ពីព្រះអាទិត្យ ហើយធំជាងគេ ក្នុងប្រព័ន្ធព្រះអាទិត្យ។ វាធំមហិមា រហូតអ្នកអាចដាក់ភពដទៃទៀតទាំងអស់ — ភពពុធ ភពសុក្រ ផែនដី ភពអង្គារ ភពសៅរ៍ ភពអ៊ុយរ៉ានុស និងភពនិបទុន — ចូលក្នុងវាបានពីរដង ហើយនៅសល់កន្លែងទៀតផង។ ដូចភពសៅរ៍ដែរ វាគ្មានផ្ទៃរឹងសម្រាប់ចុះចតឡើយ — វាធ្វើពីហ្ស៊ីដ្រូសែន និងអេលីយ៉ូម ជាសារធាតុដូចគ្នា ដែលធ្វើឱ្យព្រះអាទិត្យឆេះ។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Size comparison: all planets fit inside Jupiter */}
        <div className="rounded-2xl border border-orange-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-4 h-4 text-orange-300" />
            <h4 className={`text-sm font-bold text-orange-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ភពទាំងអស់ ផ្ទុកក្នុងភពព្រហស្បតិ៍ បាន ២ ដង" : "Every other planet fits inside — twice"}
            </h4>
          </div>

          <svg
            viewBox="0 0 320 220"
            className="w-full h-auto"
            aria-label={isKh ? "ភពព្រហស្បតិ៍ ប្រៀបធៀបនឹងភពដទៃ" : "Jupiter compared with all other planets"}
            data-testid="jupiter-scale"
          >
            <JupiterDefs idPrefix="sc" />
            <defs>
              <radialGradient id="sc-mercury" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>
              <radialGradient id="sc-venus" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#92400e" />
              </radialGradient>
              <radialGradient id="sc-earth" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="60%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </radialGradient>
              <radialGradient id="sc-mars" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>
              <radialGradient id="sc-saturn" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#b45309" />
              </radialGradient>
              <radialGradient id="sc-uranus" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#a5f3fc" />
                <stop offset="100%" stopColor="#155e75" />
              </radialGradient>
              <radialGradient id="sc-neptune" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
            </defs>

            {/* Jupiter — radius 90 (representing diameter 142,984 km) */}
            <JupiterBody prefix="sc" cx={160} cy={110} r={85} />
            {/* Inside Jupiter: tile the other planets at proportional sizes */}
            {/* True diameter ratios vs Jupiter: Me 0.034, Ve 0.085, Ea 0.089, Ma 0.047, Sa 0.843, Ur 0.358, Ne 0.347 */}
            <circle cx="115" cy="80"  r="3.0" fill="url(#sc-mercury)" />
            <circle cx="135" cy="78"  r="7.6" fill="url(#sc-venus)" />
            <circle cx="180" cy="82"  r="7.9" fill="url(#sc-earth)" />
            <circle cx="208" cy="84"  r="4.2" fill="url(#sc-mars)" />
            <circle cx="125" cy="135" r="32"  fill="url(#sc-saturn)" />
            <circle cx="195" cy="138" r="24"  fill="url(#sc-uranus)" />
            <circle cx="155" cy="170" r="23"  fill="url(#sc-neptune)" />

            <text x="160" y="210" textAnchor="middle" fontSize="11" fill="#fdba74" fontWeight="700">
              {isKh ? "ភពព្រហស្បតិ៍ — ១៤២,៩៨៤ គម" : "Jupiter — 142,984 km"}
            </text>
          </svg>

          <p className={`mt-2 text-[11px] text-orange-100/75 leading-relaxed text-center italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
            {isKh
              ? "គំនូរសង្ខេប៖ ភពពុធ ភពសុក្រ ផែនដី និងភពអង្គារ បង្ហាញតាមមាត្រដ្ឋានពិត ខណៈភពសៅរ៍ ភពអ៊ុយរ៉ានុស និងភពនិបទុន ត្រូវបន្ថយទំហំ ដើម្បីផ្ទុកក្នុងស៊ុម។ បើតាមមាត្រដ្ឋានពិត ភពសៅរ៍ មានទំហំស្ទើរស្មើភពព្រហស្បតិ៍។"
              : "Schematic: Mercury, Venus, Earth, and Mars are at true relative size. Saturn, Uranus, and Neptune have been shrunk for layout — at true scale, Saturn would be nearly as wide as Jupiter itself."}
          </p>
        </div>

        {/* Composition card */}
        <div className="rounded-2xl border border-orange-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wind className="w-4 h-4 text-orange-300" />
            <h4 className={`text-sm font-bold text-orange-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "សមាសភាព" : "What it's made of"}
            </h4>
          </div>

          <div className="space-y-3" data-testid="jupiter-composition">
            <div>
              <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                <span className="text-orange-200 font-semibold">{isKh ? "ហ្ស៊ីដ្រូសែន (H₂)" : "Hydrogen (H₂)"}</span>
                <span className="font-mono text-orange-200 font-bold">90%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-700 to-orange-300" style={{ width: "90%" }} />
              </div>
            </div>

            <div>
              <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                <span className="text-orange-100 font-semibold">{isKh ? "អេលីយ៉ូម (He)" : "Helium (He)"}</span>
                <span className="font-mono text-orange-100 font-bold">10%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-600 to-orange-200" style={{ width: "10%" }} />
              </div>
            </div>

            <div>
              <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                <span className="text-white/70 font-semibold">{isKh ? "ដាន (CH₄, NH₃, H₂O)" : "Traces (CH₄, NH₃, H₂O)"}</span>
                <span className="font-mono text-white/70 font-bold">&lt;1%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-slate-500" style={{ width: "2%" }} />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-orange-500/10 border border-orange-300/20 p-3">
            <p className={`text-orange-100/85 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "សមាសភាពនេះ ស្ទើរតែដូចព្រះអាទិត្យ។ បើភពព្រហស្បតិ៍ ធំជាងបច្ចុប្បន្នប្រហែល ៨០ ដង វាអាចក្លាយជាផ្កាយតូចមួយ។"
                : "This composition is almost identical to the Sun's. If Jupiter had been about 80× more massive, it would have ignited as a small star."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 2. The Great Red Spot ─────────────────────────────────────────────────

function RedSpotPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-orange-300/20 bg-gradient-to-br from-[#1a0902] via-[#3b1606] to-[#0a0300] p-5 sm:p-7">
      <PanelHeader
        icon={<Tornado className="w-4 h-4" />}
        en="The Great Red Spot"
        kh="ចំណុចក្រហមយក្ស"
        lang={lang}
        descEn="The Great Red Spot is a colossal spinning storm that has been raging in Jupiter's southern hemisphere for more than 300 years — astronomers have watched it continuously since the 1600s. Winds inside the storm reach 430 km/h. The most astonishing fact: this single storm is so enormous that the entire Earth could fit inside it, with room to spare."
        descKh="ចំណុចក្រហមយក្ស ជាខ្យល់ព្យុះវិលដ៏មហិមា ដែលកំពុងបក់បោក ក្នុងអឌ្ឍគោលខាងត្បូង របស់ភពព្រហស្បតិ៍ លើសពី ៣០០ ឆ្នាំ — តារាវិទូ បានសង្កេតវាជាប់ៗ ចាប់ពីសតវត្សរ៍ទី ១៦។ ខ្យល់ខាងក្នុងព្យុះនេះ មានល្បឿនរហូតដល់ ៤៣០ គម/ម៉ោង។ រឿងគួរឱ្យភ្ញាក់ផ្អើលបំផុត៖ ខ្យល់ព្យុះតែមួយនេះ ធំល្មមអាច ដាក់ផែនដីទាំងមូល ចូលក្នុងវាបាន ហើយនៅសល់កន្លែងទៀតផង។"
      />

      {/* Side-by-side: Jupiter with red spot, and Earth at scale */}
      <div className="rounded-2xl border border-orange-300/25 bg-black/40 p-5 mb-4" data-testid="red-spot-scale">
        <svg viewBox="0 0 600 240" className="w-full h-auto" aria-label={isKh ? "ខ្យល់ព្យុះក្រហម ធំជាងផែនដី" : "The Great Red Spot is wider than Earth"}>
          <JupiterDefs idPrefix="rs" />
          <defs>
            <radialGradient id="rs-earth" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="60%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </radialGradient>
          </defs>

          {/* Stars */}
          {[[40,30],[110,50],[200,25],[350,40],[490,30],[560,55],[80,210],[280,215],[450,200],[540,210]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1.2" fill="#fff" opacity="0.7" />
          ))}

          {/* Jupiter close-up showing the spot */}
          <JupiterBody prefix="rs" cx={210} cy={120} r={100} withRedSpot />

          {/* Swirl lines on the spot */}
          <g transform="translate(230,145)">
            <ellipse cx="0" cy="0" rx="14" ry="8" fill="none" stroke="#fecaca" strokeWidth="0.6" opacity="0.6" />
            <ellipse cx="0" cy="0" rx="9"  ry="5" fill="none" stroke="#fecaca" strokeWidth="0.6" opacity="0.6" />
            <ellipse cx="0" cy="0" rx="4"  ry="2" fill="none" stroke="#fecaca" strokeWidth="0.6" opacity="0.7" />
          </g>

          {/* Arrow + Earth at true scale: Earth diameter is ~1.0× spot's short axis,
              but spot is ~1.3× Earth across its longer axis. Spot here ry=13, rx=22.
              So Earth radius should be ~13 to be true scale. */}
          <line x1="320" y1="145" x2="430" y2="145" stroke="#fb923c" strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="430,141 430,149 438,145" fill="#fb923c" />

          {/* Earth disc at true scale */}
          <circle cx="490" cy="145" r="13" fill="url(#rs-earth)" />
          <text x="490" y="180" textAnchor="middle" fontSize="11" fill="#86efac" fontWeight="700">
            {isKh ? "ផែនដី" : "Earth"}
          </text>
          <text x="490" y="194" textAnchor="middle" fontSize="9" fill="#bbf7d0" fontStyle="italic">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "សម្រាប់ប្រៀបធៀប" : "for scale"}</tspan>
          </text>

          {/* Spot label */}
          <text x="280" y="40" textAnchor="middle" fontSize="11" fill="#fca5a5" fontWeight="700">
            {isKh ? "ចំណុចក្រហមយក្ស" : "Great Red Spot"}
          </text>
          <line x1="280" y1="48" x2="240" y2="138" stroke="#fca5a5" strokeWidth="1" opacity="0.7" />
        </svg>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${isKh ? "font-khmer" : ""}`}>
        <div className="rounded-md bg-red-500/10 border border-red-300/25 p-3 text-center">
          <div className="text-[10px] text-red-200/80">{isKh ? "អាយុ" : "Age"}</div>
          <div className="text-base font-bold text-red-200 font-mono">300+ {isKh ? "ឆ្នាំ" : "years"}</div>
        </div>
        <div className="rounded-md bg-red-500/10 border border-red-300/25 p-3 text-center">
          <div className="text-[10px] text-red-200/80">{isKh ? "ល្បឿនខ្យល់" : "Wind speed"}</div>
          <div className="text-base font-bold text-red-200 font-mono">~430 km/h</div>
        </div>
        <div className="rounded-md bg-red-500/10 border border-red-300/25 p-3 text-center">
          <div className="text-[10px] text-red-200/80">{isKh ? "ទទឹង" : "Width"}</div>
          <div className="text-base font-bold text-red-200">
            {isKh ? "> ផែនដី ១ ដង" : "> 1× Earth"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. The Galilean Moons ─────────────────────────────────────────────────

type MoonCard = {
  id: string;
  nameEn: string; nameKh: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string; // tailwind text class
  ringClass: string; // tailwind border class
  tagEn: string; tagKh: string;
  bodyEn: string; bodyKh: string;
  /** SVG body renderer */
  render: (cx: number, cy: number, r: number) => React.ReactNode;
};

function GalileanMoonsPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  const moons: MoonCard[] = [
    {
      id: "io",
      nameEn: "Io",
      nameKh: "អ៊ីយ៉ូ",
      Icon: Flame,
      accent: "text-yellow-300",
      ringClass: "border-yellow-300/30",
      tagEn: "The volcanic moon",
      tagKh: "ព្រះច័ន្ទភ្នំភ្លើង",
      bodyEn: "Covered in hundreds of active volcanoes, Io is the most volcanically active world in the entire solar system. Sulphur from the eruptions paints it yellow, orange, and red — like a bubbling pizza in space.",
      bodyKh: "គ្របដណ្តប់ដោយភ្នំភ្លើងសកម្ម រាប់រយ ព្រះច័ន្ទអ៊ីយ៉ូ ជាពិភពដែលមានភ្នំភ្លើងសកម្មបំផុត ក្នុងប្រព័ន្ធព្រះអាទិត្យទាំងមូល។ ស្ពាន់ធ័រ ពីការផ្ទុះ ធ្វើឱ្យវាមានពណ៌លឿង ទឹកក្រូច និងក្រហម — ដូចភីហ្សា ដែលកំពុងពុះក្នុងអវកាស។",
      render: (cx, cy, r) => (
        <g>
          <defs>
            <radialGradient id="io-body" cx="0.4" cy="0.35" r="0.7">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="55%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={r} fill="url(#io-body)" />
          {/* Volcano splotches */}
          {[
            [-r * 0.4, -r * 0.2, r * 0.15, "#7f1d1d"],
            [r * 0.3, -r * 0.35, r * 0.10, "#991b1b"],
            [-r * 0.1, r * 0.4, r * 0.12, "#7c2d12"],
            [r * 0.45, r * 0.15, r * 0.09, "#7f1d1d"],
            [-r * 0.5, r * 0.05, r * 0.07, "#991b1b"],
            [r * 0.1, r * 0.05, r * 0.05, "#92400e"],
          ].map(([dx, dy, rr, color], i) => (
            <circle key={i} cx={cx + (dx as number)} cy={cy + (dy as number)} r={rr as number} fill={color as string} opacity="0.85" />
          ))}
        </g>
      ),
    },
    {
      id: "europa",
      nameEn: "Europa",
      nameKh: "អឺរ៉ូប៉ា",
      Icon: Droplets,
      accent: "text-cyan-200",
      ringClass: "border-cyan-300/30",
      tagEn: "The hidden ocean",
      tagKh: "មហាសមុទ្រ លាក់ខ្លួន",
      bodyEn: "A smooth, frozen crust of pure ice — but beneath it lies a vast liquid water ocean, possibly twice as much water as all of Earth's oceans combined. It is one of the very best places to search for alien life.",
      bodyKh: "សំបករឹងរលោង ធ្វើពីទឹកកក — ប៉ុន្តែ នៅខាងក្រោម មានមហាសមុទ្រទឹករាវដ៏ធំ ប្រហែលមានទឹក ច្រើនជាងមហាសមុទ្រផែនដី រួមបញ្ចូលគ្នា ពីរដង។ វាជាកន្លែងល្អបំផុតមួយ សម្រាប់ស្វែងរកជីវិត ក្រៅផែនដី។",
      render: (cx, cy, r) => (
        <g>
          <defs>
            <radialGradient id="eu-body" cx="0.4" cy="0.35" r="0.7">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="55%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={r} fill="url(#eu-body)" />
          {/* Cracks (drawn in unit-circle space, then scaled) */}
          <g transform={`translate(${cx} ${cy}) scale(${r})`}>
            <path d="M -0.85 -0.2 Q -0.2 -0.05 0.65 -0.3" fill="none" stroke="#7c2d12" strokeWidth="0.04" opacity="0.8" />
            <path d="M -0.75 0.2  Q  0.0  0.4  0.75 0.1" fill="none" stroke="#7c2d12" strokeWidth="0.04" opacity="0.7" />
            <path d="M -0.55 -0.6 Q -0.1 -0.3 0.45 -0.7" fill="none" stroke="#7c2d12" strokeWidth="0.03" opacity="0.6" />
            <path d="M -0.3 0.5  Q  0.2  0.6  0.55 0.4"   fill="none" stroke="#7c2d12" strokeWidth="0.03" opacity="0.6" />
          </g>
        </g>
      ),
    },
    {
      id: "ganymede",
      nameEn: "Ganymede",
      nameKh: "ហ្គានីមេដ",
      Icon: Crown,
      accent: "text-amber-100",
      ringClass: "border-amber-200/30",
      tagEn: "The largest moon",
      tagKh: "ព្រះច័ន្ទធំជាងគេ",
      bodyEn: "The biggest moon in the entire solar system — even bigger than the planet Mercury! Ganymede is the only moon known to have its own magnetic field, generated deep inside its iron core.",
      bodyKh: "ព្រះច័ន្ទធំជាងគេ ក្នុងប្រព័ន្ធព្រះអាទិត្យទាំងមូល — ធំជាងភពពុធ ទៀតផង! ហ្គានីមេដ ជាព្រះច័ន្ទតែមួយគត់ ដែលគេដឹងថា មានដែនមេដែករបស់ខ្លួន ដែលបង្កើតពីស្នូលដែក នៅជ្រៅខាងក្នុង។",
      render: (cx, cy, r) => (
        <g>
          <defs>
            <radialGradient id="ga-body" cx="0.4" cy="0.35" r="0.7">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="55%" stopColor="#a8a29e" />
              <stop offset="100%" stopColor="#292524" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={r} fill="url(#ga-body)" />
          {/* Light/dark terrain bands */}
          <ellipse cx={cx - r * 0.2} cy={cy - r * 0.3} rx={r * 0.45} ry={r * 0.18} fill="#3f3f46" opacity="0.4" transform={`rotate(-15 ${cx - r * 0.2} ${cy - r * 0.3})`} />
          <ellipse cx={cx + r * 0.25} cy={cy + r * 0.2} rx={r * 0.4} ry={r * 0.15} fill="#3f3f46" opacity="0.35" transform={`rotate(20 ${cx + r * 0.25} ${cy + r * 0.2})`} />
          <ellipse cx={cx - r * 0.4} cy={cy + r * 0.4} rx={r * 0.2} ry={r * 0.08} fill="#3f3f46" opacity="0.3" />
        </g>
      ),
    },
    {
      id: "callisto",
      nameEn: "Callisto",
      nameKh: "កាលីស្តូ",
      Icon: Mountain,
      accent: "text-stone-200",
      ringClass: "border-stone-300/30",
      tagEn: "The cratered ancient",
      tagKh: "ពិភពបុរាណ ពេញដោយរណ្តៅ",
      bodyEn: "Callisto's surface is the oldest and most heavily cratered of any world in the solar system — almost untouched for 4 billion years. Every scar is a record of an ancient impact frozen in time.",
      bodyKh: "ផ្ទៃរបស់កាលីស្តូ ចាស់បំផុត និងពេញដោយរណ្តៅខ្ពស់បំផុត ក្នុងចំណោមពិភពទាំងអស់ ក្នុងប្រព័ន្ធព្រះអាទិត្យ — ស្ទើរតែមិនប្រែប្រួលអ្វីសោះ អស់រយៈពេល ៤ ពាន់លានឆ្នាំ។ រាល់ស្នាមរបួស ជាកំណត់ត្រា នៃការបុកប៉ះបុរាណ ដែលកក់ក្នុងពេលវេលា។",
      render: (cx, cy, r) => (
        <g>
          <defs>
            <radialGradient id="ca-body" cx="0.4" cy="0.35" r="0.7">
              <stop offset="0%" stopColor="#e7e5e4" />
              <stop offset="55%" stopColor="#78716c" />
              <stop offset="100%" stopColor="#1c1917" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={r} fill="url(#ca-body)" />
          {/* Many craters */}
          {[
            [-0.5, -0.3, 0.18], [0.3, -0.4, 0.14], [0.55, 0.05, 0.1],
            [-0.2, 0.45, 0.16], [0.25, 0.45, 0.12], [-0.6, 0.15, 0.11],
            [0.0, -0.05, 0.09], [-0.35, -0.55, 0.08], [0.45, -0.15, 0.07],
            [-0.15, -0.25, 0.06], [0.15, 0.2, 0.06], [-0.55, -0.05, 0.05],
          ].map(([dx, dy, rr], i) => (
            <g key={i}>
              <circle cx={cx + dx * r} cy={cy + dy * r} r={rr * r} fill="#1c1917" opacity="0.6" />
              <circle cx={cx + dx * r - rr * r * 0.2} cy={cy + dy * r - rr * r * 0.2} r={rr * r * 0.6} fill="#a8a29e" opacity="0.4" />
            </g>
          ))}
        </g>
      ),
    },
  ];

  return (
    <div className="rounded-3xl border border-orange-300/20 bg-gradient-to-br from-[#1a0902] via-[#3b1606] to-[#0a0300] p-5 sm:p-7">
      <PanelHeader
        icon={<Orbit className="w-4 h-4" />}
        en="The Galilean Moons"
        kh="ព្រះច័ន្ទទាំង ៤ របស់ហ្គាលីឡេ"
        lang={lang}
        descEn="In January 1610, the Italian astronomer Galileo Galilei pointed his new telescope at Jupiter and saw four small points of light moving around it night after night. They turned out to be the four largest of Jupiter's moons — and the first worlds ever discovered orbiting another planet."
        descKh="ក្នុងខែមករា ឆ្នាំ ១៦១០ តារាវិទូអ៊ីតាលី ហ្គាលីឡេអូ ហ្គាលីឡេ បានបង្វិលកែវយឹតថ្មីរបស់គាត់ ឆ្ពោះទៅភពព្រហស្បតិ៍ ហើយឃើញចំណុចពន្លឺតូចៗ ៤ កំពុងធ្វើដំណើរជុំវិញវា យប់រួចយប់ទៀត។ វាបានក្លាយជាព្រះច័ន្ទធំបំផុត ៤ របស់ភពព្រហស្បតិ៍ — និងជាពិភពដំបូងគេ ដែលគេរកឃើញ ធ្វើគន្លងជុំវិញភពផ្សេង។"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="galilean-moons">
        {moons.map((m) => {
          const M = m.Icon;
          return (
            <div key={m.id} className={`rounded-2xl border ${m.ringClass} bg-black/40 p-4`} data-testid={`moon-${m.id}`}>
              <div className="flex items-center gap-3 mb-3">
                <svg viewBox="0 0 80 80" className="w-16 h-16 flex-shrink-0" aria-label={isKh ? `${m.nameKh}` : `${m.nameEn}, a moon of Jupiter`}>
                  {m.render(40, 40, 32)}
                </svg>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <M className={`w-3.5 h-3.5 ${m.accent}`} />
                    <h4 className={`text-base font-bold ${m.accent} ${isKh ? "font-khmer" : ""}`}>
                      {isKh ? m.nameKh : m.nameEn}
                    </h4>
                  </div>
                  <div className={`text-[11px] text-white/65 italic ${isKh ? "font-khmer not-italic" : ""}`}>
                    {isKh ? m.tagKh : m.tagEn}
                  </div>
                </div>
              </div>
              <p className={`text-xs text-white/75 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? m.bodyKh : m.bodyEn}
              </p>
            </div>
          );
        })}
      </div>

      {/* Special call-out: Ganymede vs Mercury */}
      <div className="mt-5 rounded-2xl border border-amber-300/25 bg-black/40 p-5" data-testid="ganymede-mercury">
        <h4 className={`text-sm font-bold text-amber-100 mb-3 text-center ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ហ្គានីមេដ ធំជាងភពពុធ" : "Ganymede is bigger than the planet Mercury"}
        </h4>
        <svg viewBox="0 0 320 130" className="w-full h-auto" aria-label={isKh ? "ហ្គានីមេដ ប្រៀបធៀប នឹងភពពុធ" : "Ganymede compared with Mercury"}>
          <defs>
            <radialGradient id="cmp-gan" cx="0.4" cy="0.35" r="0.7">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="55%" stopColor="#a8a29e" />
              <stop offset="100%" stopColor="#292524" />
            </radialGradient>
            <radialGradient id="cmp-mer" cx="0.4" cy="0.35" r="0.7">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>
          {/* Ganymede 5,268 km vs Mercury 4,879 km — ratio 0.926 */}
          <circle cx="100" cy="65" r="48" fill="url(#cmp-gan)" />
          <text x="100" y="125" textAnchor="middle" fontSize="11" fill="#fef3c7" fontWeight="700">
            {isKh ? "ហ្គានីមេដ — ៥,២៦៨ គម" : "Ganymede — 5,268 km"}
          </text>

          <circle cx="230" cy="65" r="44" fill="url(#cmp-mer)" />
          <text x="230" y="125" textAnchor="middle" fontSize="11" fill="#cbd5e1" fontWeight="700">
            {isKh ? "ភពពុធ — ៤,៨៧៩ គម" : "Mercury — 4,879 km"}
          </text>
        </svg>
      </div>
    </div>
  );
}

// ── 4. Earth vs Jupiter comparison chart ──────────────────────────────────

function ComparisonChart({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  type Row = {
    Icon: React.ComponentType<{ className?: string }>;
    labelEn: string; labelKh: string;
    earthEn: string; earthKh: string; earthValue: number;
    jupEn: string;   jupKh: string;   jupValue: number;
  };

  const rows: Row[] = [
    {
      Icon: Scale,
      labelEn: "Mass",
      labelKh: "ម៉ាស",
      earthEn: "1× Earth (1.0)",
      earthKh: "១ ផែនដី (១.០)",
      earthValue: 1,
      jupEn: "318× Earth",
      jupKh: "៣១៨ ផែនដី",
      jupValue: 318,
    },
    {
      Icon: ArrowDown,
      labelEn: "Surface gravity",
      labelKh: "ទំនាញផ្ទៃ",
      earthEn: "9.8 m/s²",
      earthKh: "៩.៨ m/s²",
      earthValue: 9.8,
      jupEn: "24.8 m/s²",
      jupKh: "២៤.៨ m/s²",
      jupValue: 24.8,
    },
    {
      Icon: MoonIcon,
      labelEn: "Number of moons",
      labelKh: "ចំនួនព្រះច័ន្ទ",
      earthEn: "1",
      earthKh: "១",
      earthValue: 1,
      jupEn: "95+",
      jupKh: "៩៥+",
      jupValue: 95,
    },
  ];

  return (
    <div
      className="rounded-3xl border border-orange-300/20 bg-gradient-to-br from-[#0a0300] via-[#3b1606] to-[#0a0300] p-5 sm:p-7"
      data-testid="earth-jupiter-compare"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-orange-300/15 border border-orange-300/40 flex items-center justify-center text-orange-200">
          <Crown className="w-4 h-4" />
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ផែនដី ធៀប ភពព្រហស្បតិ៍ — តួលេខរហ័ស" : "Earth vs. Jupiter — at a glance"}
        </h3>
      </div>

      <div className="space-y-5">
        {rows.map((r) => {
          const max = Math.max(r.earthValue, r.jupValue);
          const earthPct = Math.max(2, (r.earthValue / max) * 100);
          const jupPct   = Math.max(2, (r.jupValue   / max) * 100);
          return (
            <div key={r.labelEn}>
              <div className="flex items-center gap-2 mb-2">
                <r.Icon className="w-4 h-4 text-orange-300" />
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
                    <div
                      className="h-full bg-gradient-to-r from-emerald-700 to-emerald-300"
                      style={{ width: `${earthPct}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className="text-orange-200 font-semibold">{isKh ? "ភពព្រហស្បតិ៍" : "Jupiter"}</span>
                    <span className="font-mono text-white/85">{isKh ? r.jupKh : r.jupEn}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-700 to-orange-300"
                      style={{ width: `${jupPct}%` }}
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

// ── Main wrapper ──────────────────────────────────────────────────────────

export function JupiterPlanetModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="jupiter-planet-module"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-orange-400/15 border border-orange-300/30 flex items-center justify-center text-orange-200">
            <Crown className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-orange-200 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Jupiter: The King of Planets", "ភពព្រហស្បតិ៍៖ ស្តេចនៃភព")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-orange-300/30 to-transparent" />
      </div>

      {/* Hero card */}
      <div
        className="rounded-3xl border border-orange-300/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(251,146,60,0.14) 0%,rgba(124,45,18,0.55) 50%,rgba(2,6,12,0.95) 100%)",
          boxShadow: "0 0 40px rgba(251,146,60,0.18) inset",
        }}
      >
        <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-orange-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-red-700/25 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-5 items-center">
          {/* Hero Jupiter visual */}
          <div className="flex justify-center">
            <svg viewBox="-60 -60 120 120" className="w-40 h-40" aria-hidden>
              <JupiterDefs idPrefix="hero" />
              <JupiterBody prefix="hero" cx={0} cy={0} r={50} withRedSpot />
            </svg>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#fef3c7 0%,#fb923c 55%,#fca5a5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(251,146,60,0.3)",
              }}
            >
              {t("The King of Planets", "ស្តេចនៃភព")}
            </h2>
            <p className={`text-white/80 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "A swirling giant of cream and brick-red bands, big enough to hold every other planet inside it twice over, scarred by a 300-year-old storm wider than Earth, and orbited by four small worlds that rewrote astronomy in 1610.",
                "ភពយក្ស ដែលមានរបាំងពពកពណ៌ក្រែម និងក្រហម កំពុងវិលច្រវ៉ាច់ ធំល្មមអាចផ្ទុកភពដទៃទាំងអស់បានពីរដង មានស្នាមស្លាក នៃខ្យល់ព្យុះអាយុ ៣០០ ឆ្នាំ ដែលធំជាងផែនដី ហើយមានព្រះច័ន្ទតូចៗ ៤ ធ្វើគន្លងជុំវិញ ដែលបានកែប្រែតារាសាស្ត្រ ក្នុងឆ្នាំ ១៦១០។",
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6"><ScalePanel lang={lang} /></div>
      <div className="mb-6"><RedSpotPanel lang={lang} /></div>
      <div className="mb-6"><GalileanMoonsPanel lang={lang} /></div>
      <ComparisonChart lang={lang} />

      <p className={`mt-5 text-center text-orange-200/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "A failed star, a 300-year-old storm, four worlds of fire and ice — Jupiter rules the outer solar system from a throne of gas.",
          "ផ្កាយដែលបរាជ័យ ខ្យល់ព្យុះអាយុ ៣០០ ឆ្នាំ និងពិភពភ្លើង-ទឹកកក ៤ — ភពព្រហស្បតិ៍ គ្រប់គ្រងប្រព័ន្ធព្រះអាទិត្យខាងក្រៅ ពីបល្ល័ង្កឧស្ម័ន។",
        )}
      </p>

      {/* Defensive: appease unused-import lints if a sub-icon goes unused after edits */}
      {(() => { void Snowflake; void Flame; void Droplets; void Mountain; return null; })()}
    </section>
  );
}
