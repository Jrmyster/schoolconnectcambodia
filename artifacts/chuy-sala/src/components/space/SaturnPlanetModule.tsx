import {
  Globe2, Wind, Disc3, Droplets, Snowflake, Sparkles,
  Ruler, Clock, Gauge,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

// ── Reusable header (golden palette) ──────────────────────────────────────

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
        <div className="w-8 h-8 rounded-lg bg-amber-300/15 border border-amber-300/40 flex items-center justify-center text-amber-200">
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

// Reusable Saturn-disc gradient defs (used in several SVGs)
function SaturnDefs({ idPrefix }: { idPrefix: string }) {
  return (
    <defs>
      <radialGradient id={`${idPrefix}-saturn`} cx="0.4" cy="0.35" r="0.7">
        <stop offset="0%"  stopColor="#fef9c3" />
        <stop offset="40%" stopColor="#fbbf24" />
        <stop offset="80%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#451a03" />
      </radialGradient>
      <linearGradient id={`${idPrefix}-band`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
        <stop offset="50%" stopColor="#fde68a" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

// ── 1. The Gas Giant ───────────────────────────────────────────────────────

function GasGiantPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-[#1a0f02] via-[#3b2106] to-[#0a0500] p-5 sm:p-7">
      <PanelHeader
        icon={<Wind className="w-4 h-4" />}
        en="The Gas Giant"
        kh="ភពឧស្ម័នយក្ស"
        lang={lang}
        descEn="Saturn is the 6th planet from the Sun. Unlike Earth or Mars, it has no solid surface to walk on. It is a colossal ball of hydrogen and helium gas. If you tried to land a spacecraft on Saturn, you would just sink deeper and deeper into crushing layers of cloud — there is nothing solid to land on."
        descKh="ភពសៅរ៍ ជាភពទី ៦ ពីព្រះអាទិត្យ។ ខុសពីផែនដី ឬភពអង្គារ វាគ្មានផ្ទៃរឹងសម្រាប់ដើរឡើយ។ វាគឺជាបាល់ឧស្ម័នយក្ស ដែលធ្វើពីហ្ស៊ីដ្រូសែន និងអេលីយ៉ូម។ បើព្យាយាមចុះចតយានអវកាសលើភពសៅរ៍ យានរបស់អ្នក នឹងលិចចុះកាន់តែជ្រៅៗ ក្នុងពពកដែលបង្ហាប់ — គ្មានអ្វីរឹងសម្រាប់ចុះចតឡើយ។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Saturn cross-section card */}
        <div className="rounded-2xl border border-amber-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Globe2 className="w-4 h-4 text-amber-300" />
            <h4 className={`text-sm font-bold text-amber-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "បាល់ឧស្ម័នយក្ស" : "A giant ball of gas"}
            </h4>
          </div>

          <svg
            viewBox="0 0 320 200"
            className="w-full h-auto"
            aria-label={isKh ? "ផែនដី និងភពសៅរ៍ ប្រៀបធៀបទំហំ" : "Earth and Saturn size comparison"}
            data-testid="saturn-vs-earth"
          >
            <SaturnDefs idPrefix="gg" />
            <defs>
              <radialGradient id="gg-earth" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="55%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#0c4a6e" />
              </radialGradient>
            </defs>

            {/* Saturn — radius 75 (representing ~120,500 km) */}
            <circle cx="180" cy="100" r="75" fill="url(#gg-saturn)" />
            {/* Saturn cloud bands */}
            <ellipse cx="180" cy="80"  rx="73" ry="6" fill="url(#gg-band)" opacity="0.6" />
            <ellipse cx="180" cy="100" rx="74" ry="5" fill="url(#gg-band)" opacity="0.5" />
            <ellipse cx="180" cy="120" rx="72" ry="6" fill="url(#gg-band)" opacity="0.55" />
            <ellipse cx="180" cy="140" rx="68" ry="4" fill="url(#gg-band)" opacity="0.45" />
            <text x="180" y="190" textAnchor="middle" fontSize="11" fill="#fde68a" fontWeight="700">
              {isKh ? "ភពសៅរ៍ — ១២០,៥០០ គម" : "Saturn — 120,500 km"}
            </text>

            {/* Earth — radius 8 (true ratio 12,742/120,536 ≈ 0.106 → 75 × 0.106 ≈ 7.9) */}
            <circle cx="40" cy="100" r="8" fill="url(#gg-earth)" />
            <text x="40" y="190" textAnchor="middle" fontSize="11" fill="#86efac" fontWeight="700">
              {isKh ? "ផែនដី" : "Earth"}
            </text>
          </svg>
        </div>

        {/* Composition card */}
        <div className="rounded-2xl border border-amber-300/25 bg-black/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wind className="w-4 h-4 text-amber-300" />
            <h4 className={`text-sm font-bold text-amber-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "សមាសភាព" : "What it's made of"}
            </h4>
          </div>

          <div className="space-y-3" data-testid="saturn-composition">
            {/* Hydrogen */}
            <div>
              <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                <span className="text-amber-200 font-semibold">{isKh ? "ហ្ស៊ីដ្រូសែន (H₂)" : "Hydrogen (H₂)"}</span>
                <span className="font-mono text-amber-200 font-bold">96%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-700 to-amber-300" style={{ width: "96%" }} />
              </div>
            </div>

            {/* Helium */}
            <div>
              <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                <span className="text-amber-100 font-semibold">{isKh ? "អេលីយ៉ូម (He)" : "Helium (He)"}</span>
                <span className="font-mono text-amber-100 font-bold">3%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-amber-200" style={{ width: "3%" }} />
              </div>
            </div>

            {/* Other */}
            <div>
              <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                <span className="text-white/70 font-semibold">{isKh ? "ផ្សេងៗ (CH₄, NH₃, ...)" : "Other (CH₄, NH₃, …)"}</span>
                <span className="font-mono text-white/70 font-bold">1%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-slate-500" style={{ width: "2%" }} />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-amber-500/10 border border-amber-300/20 p-3">
            <p className={`text-amber-100/85 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "នៅជ្រៅខាងក្នុង សម្ពាធរបស់ភពសៅរ៍ បង្ហាប់ឧស្ម័នឱ្យទៅជារាវ ហើយចុងបញ្ចប់ ទៅជាស្នូលថ្មតូចមួយ ប៉ុនទំហំផែនដី។"
                : "Deep inside, Saturn's pressure squeezes the gas into a liquid, and finally into a small rocky core about the size of Earth."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 2. The Illusion of the Rings ──────────────────────────────────────────

function RingsPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-[#1a0f02] via-[#3b2106] to-[#0a0500] p-5 sm:p-7">
      <PanelHeader
        icon={<Disc3 className="w-4 h-4" />}
        en="The Illusion of the Rings"
        kh="ការបំភាន់នៃរង្វង់ក្រវាត់"
        lang={lang}
        descEn="The famous rings are not solid — they are made of billions of pieces of ice, rock, and dust, ranging from grains of sand to chunks the size of a house, all reflecting sunlight back at us. They stretch wide enough to fit the whole Earth-to-Moon distance, but in many places they are barely 10 metres thick — about as thin as a 3-storey building."
        descKh="រង្វង់ក្រវាត់ដ៏ល្បីល្បាញនេះ មិនមែនរឹងទេ — វាធ្វើពីបំណែកទឹកកក ថ្ម និងធូលី ជាប់រាប់ពាន់លានដុំ ចាប់ពីគ្រាប់ខ្សាច់ ដល់ដុំធំប៉ុនផ្ទះ ដែលឆ្លុះបញ្ចាំងពន្លឺព្រះអាទិត្យត្រឡប់មកយើងវិញ។ វាលាតសន្ធឹង គ្រប់គ្រាន់ដាក់ចម្ងាយពីផែនដី ទៅព្រះច័ន្ទ ប៉ុន្តែ កន្លែងជាច្រើន មានកម្រាស់ត្រឹមតែ ១០ ម៉ែត្រ — ស្រដៀងនឹងកម្ពស់អគារ ៣ ជាន់។"
      />

      {/* Saturn with face-on rings */}
      <div className="rounded-2xl border border-amber-300/25 bg-black/40 p-5 mb-4" data-testid="saturn-rings">
        <svg viewBox="0 0 600 220" className="w-full h-auto" aria-label={isKh ? "ភពសៅរ៍ និងរង្វង់ក្រវាត់" : "Saturn and its rings"}>
          <SaturnDefs idPrefix="rg" />
          <defs>
            {/* Stars background */}
            <radialGradient id="rg-ring1" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#fde68a" stopOpacity="0" />
              <stop offset="65%" stopColor="#fde68a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* Stars */}
          {[
            [40, 30], [110, 50], [200, 25], [320, 40], [430, 30], [520, 60], [560, 25],
            [80, 180], [180, 195], [280, 175], [400, 195], [490, 180], [570, 195],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.2" fill="#fff" opacity="0.7" />
          ))}

          {/* Back half of rings (behind Saturn) */}
          <ellipse cx="300" cy="115" rx="240" ry="32" fill="none" stroke="#fde68a" strokeWidth="6"  opacity="0.55" />
          <ellipse cx="300" cy="115" rx="200" ry="26" fill="none" stroke="#f59e0b" strokeWidth="3"  opacity="0.45" />
          <ellipse cx="300" cy="115" rx="170" ry="22" fill="none" stroke="#fde68a" strokeWidth="2"  opacity="0.35" />

          {/* Saturn body */}
          <circle cx="300" cy="110" r="60" fill="url(#rg-saturn)" />
          {/* Cloud bands */}
          <ellipse cx="300" cy="92"  rx="58" ry="4" fill="url(#rg-band)" opacity="0.6" />
          <ellipse cx="300" cy="110" rx="59" ry="4" fill="url(#rg-band)" opacity="0.5" />
          <ellipse cx="300" cy="128" rx="56" ry="4" fill="url(#rg-band)" opacity="0.55" />

          {/* Front half of rings (in front of Saturn) — drawn after the body */}
          <path
            d="M 60 115 A 240 32 0 0 0 540 115"
            fill="none"
            stroke="#fde68a"
            strokeWidth="6"
            opacity="0.85"
          />
          <path
            d="M 100 115 A 200 26 0 0 0 500 115"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            opacity="0.8"
          />
          <path
            d="M 130 115 A 170 22 0 0 0 470 115"
            fill="none"
            stroke="#fde68a"
            strokeWidth="2"
            opacity="0.7"
          />
        </svg>

        <div className={`mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center ${isKh ? "font-khmer" : ""}`}>
          <div className="rounded-md bg-amber-500/10 border border-amber-300/25 p-3">
            <div className="text-[10px] text-amber-200/80">{isKh ? "ទទឹង" : "Width"}</div>
            <div className="text-base font-bold text-amber-200 font-mono">~282,000 km</div>
            <div className={`text-[10px] text-amber-100/70 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "≈ ចម្ងាយ ផែនដី–ព្រះច័ន្ទ" : "≈ Earth–Moon distance"}
            </div>
          </div>
          <div className="rounded-md bg-amber-500/10 border border-amber-300/25 p-3">
            <div className="text-[10px] text-amber-200/80">{isKh ? "កម្រាស់" : "Thickness"}</div>
            <div className="text-base font-bold text-amber-200 font-mono">~10 m</div>
            <div className={`text-[10px] text-amber-100/70 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "≈ កម្ពស់អគារ ៣ ជាន់" : "≈ a 3-storey building"}
            </div>
          </div>
          <div className="rounded-md bg-amber-500/10 border border-amber-300/25 p-3">
            <div className="text-[10px] text-amber-200/80">{isKh ? "ធ្វើពី" : "Made of"}</div>
            <div className="text-base font-bold text-amber-200">
              {isKh ? "ទឹកកក · ថ្ម · ធូលី" : "Ice · Rock · Dust"}
            </div>
            <div className={`text-[10px] text-amber-100/70 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ដុំ រាប់ពាន់លាន" : "billions of pieces"}
            </div>
          </div>
        </div>
      </div>

      {/* Width-vs-thickness side scale */}
      <div className="rounded-2xl border border-amber-300/25 bg-black/40 p-5" data-testid="ring-scale">
        <h4 className={`text-sm font-bold text-amber-200 mb-3 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ទទឹងធំធេង — តែស្ដើងស្រឡៀង" : "Enormous width — paper thin"}
        </h4>
        <svg viewBox="0 0 600 100" className="w-full h-auto" role="img" aria-label={isKh ? "ការប្រៀបធៀបទទឹង និងកម្រាស់ នៃរង្វង់ក្រវាត់" : "Ring width vs. thickness comparison"}>
          {/* Long thin yellow strip representing the rings (width ~282,000 km) */}
          <rect x="20" y="48" width="560" height="4" fill="#fde68a" />
          <text x="300" y="40" textAnchor="middle" fontSize="10" fill="#fde68a" fontWeight="700">
            {isKh ? "ទទឹង — ~២៨២,០០០ គម" : "Width — ~282,000 km"}
          </text>
          {/* Thickness arrow on the right */}
          <line x1="555" y1="48" x2="555" y2="52" stroke="#fbbf24" strokeWidth="2" />
          <text x="585" y="54" textAnchor="middle" fontSize="9" fill="#fbbf24" fontWeight="700">↕</text>
          <text x="555" y="78" textAnchor="middle" fontSize="9" fill="#fbbf24" fontStyle="italic">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "កម្រាស់ ~១០ ម៉ែត្រ" : "thickness ~10 m"}</tspan>
          </text>
        </svg>
        <p className={`mt-2 text-xs text-amber-100/80 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "ប្រសិនបើយើងបង្រួមរង្វង់ក្រវាត់ឱ្យបានទទឹងស្មើកម្រាស់ក្រដាសមួយសន្លឹក វានឹងលាតប្រវែង ៦ គីឡូម៉ែត្រ — ស្ដើងជឿមិនបាន!"
            : "If we shrank the rings to the thickness of a sheet of paper, they would still stretch about 6 km wide — unbelievably flat."}
        </p>
      </div>
    </div>
  );
}

// ── 3. The Floating Planet ────────────────────────────────────────────────

function FloatingPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-[#1a0f02] via-[#3b2106] to-[#0a0500] p-5 sm:p-7">
      <PanelHeader
        icon={<Droplets className="w-4 h-4" />}
        en="The Floating Planet"
        kh="ភពដែលអណ្តែតទឹក"
        lang={lang}
        descEn="Saturn is enormous — you could fit more than 700 Earths inside it. Yet it is the least dense planet in the entire solar system. If you could build a bathtub big enough to hold the whole solar system, Saturn would be the only planet that floats — like an apple bobbing on water — while Earth, Mars, and even Mercury would sink straight to the bottom."
        descKh="ភពសៅរ៍ ធំមហិមា — អ្នកអាចដាក់ផែនដី លើសពី ៧០០ ចូលក្នុងវាបាន។ ប៉ុន្តែ វាមានដង់ស៊ីតេទាបបំផុត ក្នុងប្រព័ន្ធព្រះអាទិត្យទាំងមូល។ ប្រសិនបើអ្នកអាចសង់អាងងូតទឹក ធំគ្រប់គ្រាន់ដាក់ប្រព័ន្ធព្រះអាទិត្យទាំងមូល ភពសៅរ៍ នឹងជាភពតែមួយគត់ ដែលអណ្តែត — ដូចផ្លែប៉ោម អណ្តែតលើទឹក — ខណៈដែលផែនដី ភពអង្គារ និងសូម្បីតែភពពុធ លិចចុះដល់បាត។"
      />

      {/* Bathtub diagram */}
      <div className="rounded-2xl border border-amber-300/25 bg-black/40 p-5" data-testid="bathtub-test">
        <h4 className={`text-sm font-bold text-amber-200 mb-3 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ការសាកល្បងអាងងូតទឹក" : "The bathtub test"}
        </h4>

        <svg viewBox="0 0 600 220" className="w-full h-auto" aria-label={isKh ? "តើភពមួយណា អណ្តែតទឹក" : "Which planet would float in water"}>
          <SaturnDefs idPrefix="ft" />
          <defs>
            <radialGradient id="ft-earth" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="55%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </radialGradient>
            <radialGradient id="ft-mars" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
            <radialGradient id="ft-mercury" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
            <linearGradient id="ft-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#0ea5e9" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Tub outline */}
          <path d="M 30 50 L 30 190 Q 30 200 40 200 L 560 200 Q 570 200 570 190 L 570 50"
                fill="none" stroke="#cbd5e1" strokeWidth="2" />
          {/* Water */}
          <rect x="32" y="100" width="536" height="98" fill="url(#ft-water)" />
          {/* Surface waterline */}
          <line x1="32" y1="100" x2="568" y2="100" stroke="#bae6fd" strokeWidth="1" opacity="0.7" />
          <text x="40" y="94" fontSize="9" fill="#bae6fd" fontStyle="italic">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ផ្ទៃទឹក" : "Water surface"}</tspan>
          </text>

          {/* Saturn — floating, mostly above water (density 0.69) */}
          <g>
            <circle cx="180" cy="92" r="46" fill="url(#ft-saturn)" />
            <ellipse cx="180" cy="78" rx="44" ry="3" fill="url(#ft-band)" opacity="0.6" />
            <ellipse cx="180" cy="92" rx="45" ry="3" fill="url(#ft-band)" opacity="0.5" />
            <ellipse cx="180" cy="106" rx="42" ry="3" fill="url(#ft-band)" opacity="0.55" />
            {/* Slim ring */}
            <ellipse cx="180" cy="100" rx="68" ry="6" fill="none" stroke="#fde68a" strokeWidth="2" opacity="0.85" />
            <text x="180" y="160" textAnchor="middle" fontSize="11" fill="#fde68a" fontWeight="800">
              {isKh ? "សៅរ៍" : "Saturn"}
            </text>
            <text x="180" y="174" textAnchor="middle" fontSize="9" fill="#fed7aa" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "អណ្តែត" : "FLOATS"}</tspan>
            </text>
            <text x="180" y="186" textAnchor="middle" fontSize="9" fill="#fed7aa" fontFamily="monospace">0.69 g/cm³</text>
          </g>

          {/* Earth — sunk to bottom */}
          <g>
            <circle cx="340" cy="180" r="14" fill="url(#ft-earth)" />
            <text x="340" y="80" textAnchor="middle" fontSize="11" fill="#86efac" fontWeight="800">
              {isKh ? "ផែនដី" : "Earth"}
            </text>
            {/* Sinking arrow */}
            <line x1="340" y1="115" x2="340" y2="160" stroke="#86efac" strokeWidth="1.5" strokeDasharray="3 3" />
            <polygon points="336,160 344,160 340,167" fill="#86efac" />
            <text x="340" y="138" textAnchor="middle" fontSize="9" fill="#bbf7d0" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "លិច" : "SINKS"}</tspan>
            </text>
            <text x="340" y="152" textAnchor="middle" fontSize="8" fill="#bbf7d0" fontFamily="monospace">5.51 g/cm³</text>
          </g>

          {/* Mars — sunk to bottom */}
          <g>
            <circle cx="430" cy="184" r="11" fill="url(#ft-mars)" />
            <text x="430" y="80" textAnchor="middle" fontSize="11" fill="#fb923c" fontWeight="800">
              {isKh ? "អង្គារ" : "Mars"}
            </text>
            <line x1="430" y1="115" x2="430" y2="165" stroke="#fb923c" strokeWidth="1.5" strokeDasharray="3 3" />
            <polygon points="426,165 434,165 430,172" fill="#fb923c" />
            <text x="430" y="138" textAnchor="middle" fontSize="9" fill="#fed7aa" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "លិច" : "SINKS"}</tspan>
            </text>
            <text x="430" y="152" textAnchor="middle" fontSize="8" fill="#fed7aa" fontFamily="monospace">3.93 g/cm³</text>
          </g>

          {/* Mercury — sunk to bottom */}
          <g>
            <circle cx="510" cy="186" r="9" fill="url(#ft-mercury)" />
            <text x="510" y="80" textAnchor="middle" fontSize="11" fill="#cbd5e1" fontWeight="800">
              {isKh ? "ពុធ" : "Mercury"}
            </text>
            <line x1="510" y1="115" x2="510" y2="167" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
            <polygon points="506,167 514,167 510,174" fill="#cbd5e1" />
            <text x="510" y="138" textAnchor="middle" fontSize="9" fill="#e2e8f0" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "លិច" : "SINKS"}</tspan>
            </text>
            <text x="510" y="152" textAnchor="middle" fontSize="8" fill="#e2e8f0" fontFamily="monospace">5.43 g/cm³</text>
          </g>

          {/* Water-density reference line */}
          <text x="40" y="216" fontSize="9" fill="#bae6fd">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ទឹក" : "Water"}</tspan>
            <tspan dx="6" fontFamily="monospace">= 1.00 g/cm³</tspan>
          </text>
        </svg>

        <p className={`mt-3 text-xs text-amber-100/85 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "ភពសៅរ៍ មានដង់ស៊ីតេ ០.៦៩ g/cm³ — ស្រាលជាងទឹក! ដូច្នេះ វាអណ្តែត ខណៈភពថ្មទាំងអស់ លិច។"
            : "Saturn's density of just 0.69 g/cm³ — lighter than water! — is what makes it float while every rocky planet sinks."}
        </p>
      </div>
    </div>
  );
}

// ── 4. Titan: The Alien Earth ─────────────────────────────────────────────

function TitanPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-[#1a0f02] via-[#3b2106] to-[#0a0500] p-5 sm:p-7">
      <PanelHeader
        icon={<Sparkles className="w-4 h-4" />}
        en="Titan — The Alien Earth"
        kh="ទីតាន — ផែនដីក្រៅភព"
        lang={lang}
        descEn="Titan is Saturn's largest moon and one of the strangest worlds in the solar system. It is the only moon with a thick atmosphere — orange and hazy. It has clouds, rain, rivers, and even lakes… but at −179 °C, water would be frozen rock-hard. So on Titan, the rivers and lakes are made of liquid methane (natural gas) instead of water!"
        descKh="ទីតាន ជាព្រះច័ន្ទធំបំផុតរបស់ភពសៅរ៍ ហើយជាពិភពចម្លែកបំផុតមួយ ក្នុងប្រព័ន្ធព្រះអាទិត្យ។ វាជាព្រះច័ន្ទតែមួយគត់ ដែលមានបរិយាកាសក្រាស់ — ពណ៌ទឹកក្រូច និងស្រអាប់។ វាមានពពក ភ្លៀង ទន្លេ និងសូម្បីតែបឹង… ប៉ុន្តែ នៅសីតុណ្ហភាព −១៧៩ °C ទឹក នឹងកកស្ទះជាដុំថ្ម។ ដូច្នេះ នៅលើទីតាន ទន្លេ និងបឹង ធ្វើពីមេតានរាវ (ឧស្ម័នធម្មជាតិ) ជំនួសឱ្យទឹក!"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Titan visual */}
        <div className="rounded-2xl border border-amber-300/25 bg-black/40 p-5" data-testid="titan-visual">
          <svg viewBox="0 0 320 200" className="w-full h-auto" aria-label={isKh ? "ទីតាន ព្រះច័ន្ទដ៏ធំរបស់ភពសៅរ៍" : "Titan, Saturn's giant moon"}>
            <defs>
              <radialGradient id="ti-titan" cx="0.4" cy="0.35" r="0.7">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="55%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#451a03" />
              </radialGradient>
              <radialGradient id="ti-haze" cx="0.5" cy="0.5" r="0.55">
                <stop offset="60%" stopColor="#fbbf24" stopOpacity="0" />
                <stop offset="85%" stopColor="#fbbf24" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Stars */}
            {[[40,30],[280,40],[60,170],[270,180],[170,20]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="1" fill="#fff" opacity="0.7" />
            ))}
            {/* Hazy atmosphere */}
            <circle cx="160" cy="100" r="80" fill="url(#ti-haze)" />
            {/* Titan body */}
            <circle cx="160" cy="100" r="60" fill="url(#ti-titan)" />
            {/* Cloud bands hint */}
            <ellipse cx="160" cy="84"  rx="58" ry="3" fill="#fef3c7" opacity="0.35" />
            <ellipse cx="160" cy="116" rx="56" ry="3" fill="#fef3c7" opacity="0.3" />
            {/* Surface lake hint */}
            <ellipse cx="148" cy="114" rx="10" ry="3" fill="#0c4a6e" opacity="0.6" />
            <ellipse cx="172" cy="120" rx="6"  ry="2" fill="#0c4a6e" opacity="0.6" />
            <text x="160" y="180" textAnchor="middle" fontSize="11" fill="#fde68a" fontWeight="800">
              {isKh ? "ទីតាន" : "Titan"}
            </text>
            <text x="160" y="194" textAnchor="middle" fontSize="9" fill="#fed7aa" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "បរិយាកាសក្រាស់ និងស្រអាប់" : "Thick, hazy atmosphere"}</tspan>
            </text>
          </svg>
        </div>

        {/* Earth-vs-Titan side facts */}
        <div className="rounded-2xl border border-amber-300/25 bg-black/40 p-5">
          <h4 className={`text-sm font-bold text-amber-200 mb-4 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ផែនដី ប្រៀបធៀបនឹងទីតាន" : "An Earth-like world… in liquid methane"}
          </h4>
          <ul className="space-y-3" data-testid="titan-facts">
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-300/30 flex items-center justify-center text-cyan-300 flex-shrink-0">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <div className={`text-sm font-bold text-cyan-100 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "ទន្លេ និងបឹងមេតាន" : "Methane rivers and lakes"}
                </div>
                <p className={`text-xs text-white/65 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh
                    ? "មានទន្លេ និងបឹងពិតប្រាកដ — ប៉ុន្តែ ធ្វើពីមេតានរាវ មិនមែនទឹកទេ។"
                    : "Real rivers and lakes — but made of liquid methane, not water."}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-300/30 flex items-center justify-center text-amber-200 flex-shrink-0">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <div className={`text-sm font-bold text-amber-100 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "បរិយាកាសក្រាស់" : "A thick atmosphere"}
                </div>
                <p className={`text-xs text-white/65 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh
                    ? "ក្រាស់ជាងបរិយាកាសផែនដី ដល់ទៅ ៥០% — ជាព្រះច័ន្ទតែមួយគត់ ក្នុងប្រព័ន្ធព្រះអាទិត្យ ដែលមានបែបនេះ។"
                    : "50% denser than Earth's — the only moon in the solar system with a real atmosphere."}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-300/30 flex items-center justify-center text-sky-300 flex-shrink-0">
                <Snowflake className="w-4 h-4" />
              </div>
              <div>
                <div className={`text-sm font-bold text-sky-100 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "ត្រជាក់ខ្លាំង −១៧៩ °C" : "Bitterly cold: −179 °C"}
                </div>
                <p className={`text-xs text-white/65 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {isKh
                    ? "នៅសីតុណ្ហភាពនេះ ទឹកក្លាយជាថ្មរឹង ហើយឧស្ម័នធម្មជាតិ ហូរដូចទឹក។"
                    : "At this temperature, water becomes hard rock — and natural gas flows like water."}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── 5. Earth vs Saturn comparison chart ───────────────────────────────────

function ComparisonChart({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  type Row = {
    Icon: React.ComponentType<{ className?: string }>;
    labelEn: string; labelKh: string;
    earthEn: string; earthKh: string; earthValue: number;
    satEn: string;   satKh: string;   satValue: number;
    /** When true, the smaller value should be the "winner" (visualized full); used for density (less = floaty). */
    invert?: boolean;
  };

  // Each row uses absolute display values; bars are normalized against row max
  // so the larger value fills the bar and the smaller shows true proportion.
  // For density, we set invert=true so that the *lighter* (smaller) value is
  // the highlighted "Saturn floats" winner — but the bar lengths still reflect
  // the literal measurements, with both bars visible.
  const rows: Row[] = [
    {
      Icon: Ruler,
      labelEn: "Diameter",
      labelKh: "អង្កត់ផ្ចិត",
      earthEn: "12,742 km",
      earthKh: "១២,៧៤២ គម",
      earthValue: 12742,
      satEn: "120,536 km",
      satKh: "១២០,៥៣៦ គម",
      satValue: 120536,
    },
    {
      Icon: Clock,
      labelEn: "Day length",
      labelKh: "ប្រវែងថ្ងៃ",
      earthEn: "24 hours",
      earthKh: "២៤ ម៉ោង",
      earthValue: 24,
      satEn: "10.7 hours",
      satKh: "១០.៧ ម៉ោង",
      satValue: 10.7,
    },
    {
      Icon: Gauge,
      labelEn: "Density",
      labelKh: "ដង់ស៊ីតេ",
      earthEn: "5.51 g/cm³",
      earthKh: "៥.៥១ g/cm³",
      earthValue: 5.51,
      satEn: "0.69 g/cm³",
      satKh: "០.៦៩ g/cm³",
      satValue: 0.69,
      invert: true,
    },
  ];

  return (
    <div
      className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-[#0a0500] via-[#3b2106] to-[#0a0500] p-5 sm:p-7"
      data-testid="earth-saturn-compare"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-amber-300/15 border border-amber-300/40 flex items-center justify-center text-amber-200">
          <Globe2 className="w-4 h-4" />
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ផែនដី ធៀប សៅរ៍ — តួលេខរហ័ស" : "Earth vs. Saturn — at a glance"}
        </h3>
      </div>

      <div className="space-y-5">
        {rows.map((r) => {
          const max = Math.max(r.earthValue, r.satValue);
          const earthPct = Math.max(2, (r.earthValue / max) * 100);
          const satPct   = Math.max(2, (r.satValue   / max) * 100);
          return (
            <div key={r.labelEn}>
              <div className="flex items-center gap-2 mb-2">
                <r.Icon className="w-4 h-4 text-amber-300" />
                <span className={`text-sm font-semibold text-white ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? r.labelKh : r.labelEn}
                </span>
                {r.invert && (
                  <span className={`text-[10px] text-amber-300 italic ${isKh ? "font-khmer not-italic" : ""}`}>
                    {isKh ? "(ស្រាល = អណ្តែត)" : "(lighter = floats)"}
                  </span>
                )}
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

                {/* Saturn */}
                <div>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className="text-amber-200 font-semibold">{isKh ? "ភពសៅរ៍" : "Saturn"}</span>
                    <span className="font-mono text-white/85">{isKh ? r.satKh : r.satEn}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-700 to-amber-300"
                      style={{ width: `${satPct}%` }}
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

export function SaturnPlanetModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="saturn-planet-module"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-300/15 border border-amber-300/30 flex items-center justify-center text-amber-200">
            <Disc3 className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-amber-200 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Saturn: The Lord of the Rings", "ភពសៅរ៍៖ ម្ចាស់រង្វង់ក្រវាត់")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-300/30 to-transparent" />
      </div>

      {/* Hero card */}
      <div
        className="rounded-3xl border border-amber-300/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(251,191,36,0.10) 0%,rgba(146,64,14,0.55) 50%,rgba(2,6,12,0.95) 100%)",
          boxShadow: "0 0 40px rgba(251,191,36,0.15) inset",
        }}
      >
        <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-amber-300/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-orange-700/25 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-5 items-center">
          {/* Saturn-with-rings hero visual */}
          <div className="flex justify-center">
            <svg viewBox="-90 -60 180 120" className="w-40 h-28" aria-hidden>
              <SaturnDefs idPrefix="hero" />
              {/* Back half of ring (behind body) */}
              <ellipse cx="0" cy="0" rx="80" ry="14" fill="none" stroke="#fde68a" strokeWidth="4" opacity="0.55" />
              <ellipse cx="0" cy="0" rx="68" ry="11" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.45" />
              {/* Saturn body */}
              <circle cx="0" cy="0" r="42" fill="url(#hero-saturn)" />
              <ellipse cx="0" cy="-10" rx="40" ry="3" fill="url(#hero-band)" opacity="0.6" />
              <ellipse cx="0" cy="0"   rx="41" ry="3" fill="url(#hero-band)" opacity="0.5" />
              <ellipse cx="0" cy="10"  rx="39" ry="3" fill="url(#hero-band)" opacity="0.55" />
              {/* Front half of ring */}
              <path d="M -80 0 A 80 14 0 0 0 80 0" fill="none" stroke="#fde68a" strokeWidth="4" opacity="0.85" />
              <path d="M -68 0 A 68 11 0 0 0 68 0" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.8" />
            </svg>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#fef3c7 0%,#fbbf24 55%,#fde68a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(251,191,36,0.25)",
              }}
            >
              {t("The Jewel of the Solar System", "គ្រឿងអលង្ការ នៃប្រព័ន្ធព្រះអាទិត្យ")}
            </h2>
            <p className={`text-white/80 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "A swirling gas giant 700 times the size of Earth, wearing a halo of ice that stretches as wide as the Earth-to-Moon distance — and yet so light it would float in a bathtub. Around it orbits Titan, a moon with rivers of liquid natural gas.",
                "ភពឧស្ម័នយក្ស ដែលធំជាងផែនដី ៧០០ ដង ពាក់រង្វង់ទឹកកក ដែលលាតសន្ធឹង ស្មើចម្ងាយផែនដី–ព្រះច័ន្ទ — ប៉ុន្តែ ស្រាលរហូតអាចអណ្តែតលើទឹកក្នុងអាងងូត។ ជុំវិញវា មានព្រះច័ន្ទទីតាន ដែលមានទន្លេនៃឧស្ម័នធម្មជាតិរាវ។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Gas Giant */}
      <div className="mb-6">
        <GasGiantPanel lang={lang} />
      </div>

      {/* 2. Rings */}
      <div className="mb-6">
        <RingsPanel lang={lang} />
      </div>

      {/* 3. Floating planet */}
      <div className="mb-6">
        <FloatingPanel lang={lang} />
      </div>

      {/* 4. Titan */}
      <div className="mb-6">
        <TitanPanel lang={lang} />
      </div>

      {/* 5. Earth-vs-Saturn chart */}
      <ComparisonChart lang={lang} />

      <p className={`mt-5 text-center text-amber-200/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "Massive yet light, ringed yet paper-thin, frozen yet flowing — Saturn is the solar system's masterpiece of contradictions.",
          "ធំធេង តែស្រាល មានរង្វង់ តែស្ដើងដូចក្រដាស ត្រជាក់ តែនៅហូរ — ភពសៅរ៍ ជាស្នាដៃនៃភាពផ្ទុយគ្នា ក្នុងប្រព័ន្ធព្រះអាទិត្យ។",
        )}
      </p>
    </section>
  );
}
