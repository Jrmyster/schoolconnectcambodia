import {
  Radio, Zap, Magnet, Lightbulb, Gauge, Waves,
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
        <div className="w-8 h-8 rounded-lg bg-cyan-400/15 border border-cyan-300/40 flex items-center justify-center text-cyan-200">
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

// ── 1. The Crushed Core ──────────────────────────────────────────────────

function CrushedCorePanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";
  return (
    <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-[#0b0a2e] via-[#070725] to-[#020014] p-5 sm:p-7">
      <PanelHeader
        icon={<Gauge className="w-4 h-4" />}
        en="The Crushed Core"
        kh="ស្នូលដែលត្រូវកម្ទេច"
        lang={lang}
        descEn="When a giant star runs out of fuel and explodes as a supernova, sometimes its core survives. Gravity squeezes that core so hard that even atoms break apart — protons and electrons are crushed together until only neutrons remain. The result is a neutron star: a star with the mass of our entire Sun packed into a sphere only 20 km across — about the width of Phnom Penh."
        descKh="នៅពេលផ្កាយយក្ស អស់ឥន្ធនៈ ហើយផ្ទុះជាស៊ូពើណូវ៉ា ពេលខ្លះស្នូលរបស់វារស់រាន។ កម្លាំងទំនាញច្របាច់ស្នូលនោះ ខ្លាំងជ្រៀតរហូត សូម្បីតែអាតូម ក៏បែកបាក់ — ប្រូតុង និងអេឡិចត្រុង ត្រូវបានច្របាច់ចូលគ្នា រហូតសល់តែណឺត្រុង។ លទ្ធផលគឺ ផ្កាយណឺត្រុង៖ ផ្កាយដែលមានម៉ាស់ ស្មើព្រះអាទិត្យពេញ ប្រមូលផ្តុំក្នុងបាល់ ដែលមានទំហំត្រឹមតែ ២០ គីឡូម៉ែត្រ — ប្រហែលនឹងទំហំក្រុងភ្នំពេញ។"
      />

      {/* Size comparison: Sun → Neutron Star → Phnom Penh */}
      <div className="rounded-2xl border border-cyan-300/25 bg-black/55 p-5 mb-4" data-testid="size-comparison">
        <h4 className={`text-sm font-bold text-cyan-100 mb-4 text-center ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ម៉ាស់ព្រះអាទិត្យ — ច្របាច់ឱ្យតូចនឹងក្រុង" : "The mass of the Sun — squeezed to the size of a city"}
        </h4>

        <svg viewBox="0 0 600 180" className="w-full h-auto" aria-label={aria("Comparison: the Sun is 1.4 million km wide; a neutron star with the same mass is only 20 km wide, about the size of Phnom Penh", "ការប្រៀបធៀប៖ ព្រះអាទិត្យធំ ១.៤ លានគីឡូម៉ែត្រ ផ្កាយណឺត្រុងដែលមានម៉ាស់ដូចគ្នា ធំត្រឹមតែ ២០ គីឡូម៉ែត្រ ប្រហែលក្រុងភ្នំពេញ", lang)}>
          <defs>
            <radialGradient id="ns-sun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#fde68a" />
              <stop offset="60%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
            <radialGradient id="ns-core" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#fff" />
              <stop offset="40%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#1e40af" />
            </radialGradient>
          </defs>

          {/* Sun */}
          <circle cx="120" cy="90" r="70" fill="url(#ns-sun)" />
          <text x="120" y="175" textAnchor="middle" fontSize="11" fill="#fde68a" fontWeight="700">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ព្រះអាទិត្យ" : "Sun"}</tspan>
          </text>
          <text x="120" y="20" textAnchor="middle" fontSize="9" fill="#fcd34d">
            <tspan>1,400,000 km</tspan>
          </text>

          {/* Big arrow with "same mass" */}
          <g stroke="#67e8f9" strokeWidth="1.5" fill="#67e8f9">
            <line x1="200" y1="90" x2="350" y2="90" />
            <polygon points="350,90 343,86 343,94" />
          </g>
          <text x="275" y="78" textAnchor="middle" fontSize="10" fill="#a5f3fc" fontWeight="700">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ច្របាច់!" : "CRUSH!"}</tspan>
          </text>
          <text x="275" y="105" textAnchor="middle" fontSize="9" fill="#cffafe" fontStyle="italic">
            <tspan className={isKh ? "font-khmer" : "italic"}>{isKh ? "ម៉ាស់ដូចគ្នា" : "same mass"}</tspan>
          </text>

          {/* Neutron Star — tiny but ultra bright */}
          <circle cx="430" cy="90" r="22" fill="url(#ns-core)" filter="url(#ns-glow)" />
          <circle cx="430" cy="90" r="35" fill="none" stroke="#67e8f9" strokeWidth="0.8" opacity="0.5" strokeDasharray="2 2" />
          <text x="430" y="175" textAnchor="middle" fontSize="11" fill="#bae6fd" fontWeight="700">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ផ្កាយណឺត្រុង" : "Neutron Star"}</tspan>
          </text>
          <text x="430" y="20" textAnchor="middle" fontSize="9" fill="#bae6fd">20 km</text>

          {/* Phnom Penh skyline silhouette for scale */}
          <g transform="translate(485, 78)" opacity="0.8">
            <rect x="0"  y="20" width="100" height="2" fill="#94a3b8" />
            <rect x="2"  y="14" width="6"  height="6" fill="#64748b" />
            <rect x="11" y="10" width="5"  height="10" fill="#64748b" />
            <rect x="19" y="6"  width="7"  height="14" fill="#94a3b8" />
            {/* Stylised Wat tower */}
            <polygon points="30,20 35,4 40,20" fill="#94a3b8" />
            <rect x="33" y="0" width="4" height="6" fill="#94a3b8" />
            <rect x="44" y="8"  width="6"  height="12" fill="#64748b" />
            <rect x="53" y="3"  width="5"  height="17" fill="#94a3b8" />
            <rect x="61" y="11" width="6"  height="9" fill="#64748b" />
            <rect x="70" y="6"  width="7"  height="14" fill="#94a3b8" />
            <rect x="80" y="14" width="5"  height="6" fill="#64748b" />
            <rect x="88" y="9"  width="6"  height="11" fill="#64748b" />
          </g>
          <text x="535" y="110" textAnchor="middle" fontSize="8" fill="#94a3b8" fontStyle="italic">
            <tspan className={isKh ? "font-khmer" : "italic"}>{isKh ? "ភ្នំពេញ — ២០ គម" : "Phnom Penh — 20 km"}</tspan>
          </text>

          <defs>
            <filter id="ns-glow">
              <feGaussianBlur stdDeviation="2" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Teaspoon callout */}
      <div className="rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-950/40 to-black p-5" data-testid="teaspoon-callout">
        <div className="flex items-start gap-4">
          <div className="text-5xl flex-shrink-0" aria-hidden>🥄</div>
          <div className="flex-1">
            <div className={`text-xs font-bold tracking-widest text-cyan-300 uppercase mb-1 ${isKh ? "font-khmer tracking-normal" : ""}`}>
              {isKh ? "ស្លាបព្រាមួយ ផ្កាយណឺត្រុង" : "One teaspoon of neutron star"}
            </div>
            <div className="font-mono text-2xl sm:text-3xl text-white font-bold mb-1">
              ≈ <span className="text-cyan-200">10,000,000</span>{" "}
              <span className={`text-base font-sans ${isKh ? "font-khmer" : ""}`}>{isKh ? "តោន" : "tons"}</span>
            </div>
            <p className={`text-sm text-white/85 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh
                ? "ស្លាបព្រាកាហ្វេមួយ នៃផ្កាយណឺត្រុង នឹងធ្ងន់ប្រហែល ១០ លានតោន — ស្មើនឹងភ្នំទាំងមូលមួយ!"
                : "One single teaspoon of neutron star material would weigh about 10 million tons — as much as an entire mountain!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 2. Ice Skater Effect ─────────────────────────────────────────────────

function IceSkaterPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";
  return (
    <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-[#0b0a2e] via-[#070725] to-[#020014] p-5 sm:p-7">
      <PanelHeader
        icon={<Waves className="w-4 h-4" />}
        en="The Ice Skater Effect"
        kh="ប្រសិទ្ធិភាពអ្នកជិះស្គីលើទឹកកក"
        lang={lang}
        descEn="Why do neutron stars spin so fast? The same reason an ice skater spins faster when they pull their arms in. A massive star spins slowly because it is huge — but when its core is suddenly crushed into a tiny ball just 20 km wide, the law of conservation of angular momentum (L = I × ω) forces it to spin incredibly fast. Some neutron stars complete hundreds of full rotations every second."
        descKh="ហេតុអ្វីផ្កាយណឺត្រុង វិលលឿនម្ល៉េះ? មូលហេតុដូចគ្នានឹង អ្នកជិះស្គីលើទឹកកក វិលលឿនជាងមុន ពេលគេទាញដៃចូល។ ផ្កាយយក្ស វិលយឺត ព្រោះវាធំ — ប៉ុន្តែនៅពេលស្នូលរបស់វា ភ្លាមៗ ត្រូវបានច្របាច់ ឱ្យតូចត្រឹម ២០ គីឡូម៉ែត្រ ច្បាប់រក្សាម៉ូម៉ង់មុំ (L = I × ω) បង្ខំឱ្យវាវិលលឿនយ៉ាងខ្លាំង។ ផ្កាយណឺត្រុងខ្លះ បំពេញការវិលពេញ រាប់រយដង ក្នុងមួយវិនាទី។"
      />

      <div className="rounded-2xl border border-cyan-300/25 bg-black/55 p-5" data-testid="ice-skater">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          {/* Arms out — slow */}
          <div className="text-center">
            <svg viewBox="-60 -70 120 140" className="w-full h-auto max-w-[140px] mx-auto" aria-label={aria("Skater with arms wide — slow spin", "អ្នកជិះស្គី បើកដៃ — វិលយឺត", lang)}>
              {/* Body */}
              <circle cx="0" cy="-30" r="10" fill="#67e8f9" />
              <line x1="0" y1="-20" x2="0" y2="20" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" />
              {/* Arms WIDE */}
              <line x1="0" y1="-10" x2="-50" y2="-15" stroke="#67e8f9" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="0" y1="-10" x2="50"  y2="-15" stroke="#67e8f9" strokeWidth="3.5" strokeLinecap="round" />
              {/* Legs */}
              <line x1="0" y1="20" x2="-12" y2="50" stroke="#67e8f9" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="0" y1="20" x2="12"  y2="50" stroke="#67e8f9" strokeWidth="3.5" strokeLinecap="round" />
              {/* Slow spin arc */}
              <path d="M -30 60 Q 0 70 30 60" stroke="#a5f3fc" strokeWidth="1" fill="none" strokeDasharray="3 3" />
            </svg>
            <div className={`mt-2 text-xs font-bold text-cyan-100 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "បើកដៃ — វិលយឺត" : "Arms wide — slow"}
            </div>
            <div className={`text-[10px] text-white/60 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ផ្កាយយក្ស ឬផ្កាយដើម" : "Massive original star"}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 80 40" className="w-full max-w-[100px] h-auto" aria-hidden>
              <line x1="5" y1="20" x2="68" y2="20" stroke="#67e8f9" strokeWidth="2" />
              <polygon points="68,20 60,15 60,25" fill="#67e8f9" />
              <text x="40" y="14" textAnchor="middle" fontSize="8" fill="#a5f3fc" fontWeight="700">
                <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ច្របាច់" : "CRUSH"}</tspan>
              </text>
              <text x="40" y="35" textAnchor="middle" fontSize="7" fill="#cffafe" fontStyle="italic">L = I × ω</text>
            </svg>
          </div>

          {/* Arms in — fast */}
          <div className="text-center">
            <svg viewBox="-60 -70 120 140" className="w-full h-auto max-w-[140px] mx-auto" aria-label={aria("Skater with arms tucked in — extremely fast spin", "អ្នកជិះស្គី បត់ដៃចូល — វិលលឿនខ្លាំង", lang)}>
              {/* Spin blur rings */}
              <ellipse cx="0" cy="-10" rx="32" ry="12" fill="none" stroke="#67e8f9" strokeWidth="1" opacity="0.3" />
              <ellipse cx="0" cy="-10" rx="26" ry="9"  fill="none" stroke="#bae6fd" strokeWidth="1" opacity="0.5" />
              <ellipse cx="0" cy="-10" rx="20" ry="6"  fill="none" stroke="#fff"    strokeWidth="1" opacity="0.7" />
              {/* Body */}
              <circle cx="0" cy="-30" r="10" fill="#fff" />
              <line x1="0" y1="-20" x2="0" y2="20" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
              {/* Arms TUCKED */}
              <line x1="0" y1="-10" x2="-12" y2="0" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="0" y1="-10" x2="12"  y2="0" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
              {/* Legs */}
              <line x1="0" y1="20" x2="-6" y2="50" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="0" y1="20" x2="6"  y2="50" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
              {/* Fast spin */}
              <path d="M -45 60 Q 0 80 45 60" stroke="#fff" strokeWidth="1.5" fill="none" />
              <path d="M -45 65 Q 0 85 45 65" stroke="#bae6fd" strokeWidth="1" fill="none" />
            </svg>
            <div className={`mt-2 text-xs font-bold text-white ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "បត់ដៃចូល — វិលលឿនខ្លាំង" : "Arms tucked — very fast"}
            </div>
            <div className={`text-[10px] text-white/60 mt-0.5 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ផ្កាយណឺត្រុងថ្មី" : "New neutron star"}
            </div>
          </div>
        </div>

        {/* Spin rate stats */}
        <div className="mt-5 grid grid-cols-2 gap-3 max-w-md mx-auto">
          <div className="rounded-md bg-slate-800/40 border border-slate-600/40 p-3 text-center">
            <div className={`text-[10px] text-slate-300 mb-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ផ្កាយដើម" : "Original star"}
            </div>
            <div className="font-mono text-lg font-bold text-slate-100">
              ~ {isKh ? "៣០ ថ្ងៃ" : "30 days"}
            </div>
            <div className={`text-[10px] text-slate-400 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ក្នុង​មួយ​ការវិល" : "per rotation"}
            </div>
          </div>
          <div className="rounded-md bg-cyan-500/15 border border-cyan-300/30 p-3 text-center">
            <div className={`text-[10px] text-cyan-200 mb-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ផ្កាយណឺត្រុង" : "Neutron star"}
            </div>
            <div className="font-mono text-lg font-bold text-white">
              {isKh ? "៧០០ ដង" : "700×"}
            </div>
            <div className={`text-[10px] text-cyan-200/80 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ក្នុងមួយវិនាទី" : "per second"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. Pulsars: The Beating Heart ────────────────────────────────────────

function PulsarPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";
  return (
    <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-[#0b0a2e] via-[#070725] to-[#020014] p-5 sm:p-7">
      <PanelHeader
        icon={<Radio className="w-4 h-4" />}
        en="Pulsars: The Beating Heart"
        kh="ផ្កាយពុលសា៖ បេះដូងដែលលោតផ្លុក"
        lang={lang}
        descEn="A pulsar is a neutron star with an extraordinarily powerful magnetic field. Its north and south magnetic poles fire huge beams of radiation out into space. Because the magnetic poles usually don't line up with the spin axis, those beams sweep around the sky like the rotating beam of a lighthouse. If one of those beams happens to sweep past Earth, our radio telescopes hear a perfectly regular ticking — a flash of light, then darkness, then a flash again — over and over, sometimes hundreds of times per second."
        descKh="ផ្កាយពុលសា ជាផ្កាយណឺត្រុង ដែលមានដែនម៉ាញេទិក ខ្លាំងជាខ្លាំង។ ប៉ូលម៉ាញេទិកខាងជើង និងខាងត្បូងរបស់វា បាញ់កាំរស្មីយក្ស ចេញទៅក្នុងលំហ។ ដោយសារប៉ូលម៉ាញេទិកជាធម្មតា មិនត្រង់នឹងអ័ក្សវិល កាំរស្មីទាំងនោះ បោសបោកជុំវិញមេឃ ដូចកាំរស្មីវិល នៃប្រាសាទភ្លើងហ្វារ។ ប្រសិនបើកាំរស្មីមួយ បោសកាត់ផែនដី តេឡេទស្សន៍វិទ្យុរបស់យើង ឮសំឡេងតេប្រកដ — ផ្លែនពន្លឺ បន្ទាប់មកងងឹត បន្ទាប់មកផ្លែនម្ដងទៀត — ម្ដងហើយម្ដងទៀត ពេលខ្លះរាប់រយដង ក្នុងមួយវិនាទី។"
      />

      {/* Lighthouse diagram */}
      <div className="rounded-2xl border border-cyan-300/25 bg-black/65 p-5 mb-4" data-testid="lighthouse">
        <svg viewBox="-150 -120 300 240" className="w-full max-w-md mx-auto h-auto" aria-label={aria("A spinning neutron star with magnetic field lines and two beams of radiation sweeping across space, with one beam pointing toward Earth", "ផ្កាយណឺត្រុងវិលជុំ ជាមួយខ្សែដែនម៉ាញេទិក និងកាំរស្មីពីរ បោសបោកក្នុងលំហ ដោយកាំរស្មីមួយ ចង្អុលមកផែនដី", lang)}>
          <defs>
            <radialGradient id="ps-core" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#fff" />
              <stop offset="40%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
            <linearGradient id="ps-beam-up" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%"   stopColor="#67e8f9" stopOpacity="1"   />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0"   />
            </linearGradient>
            <linearGradient id="ps-beam-down" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#67e8f9" stopOpacity="1"   />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0"   />
            </linearGradient>
            <filter id="ps-glow">
              <feGaussianBlur stdDeviation="2.5" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Magnetic field lines (curved closed loops around the star) */}
          <g stroke="#a78bfa" strokeWidth="0.6" fill="none" opacity="0.6">
            <path d="M 0 -18 Q 60 0 0 18" />
            <path d="M 0 -18 Q -60 0 0 18" />
            <path d="M 0 -18 Q 90 0 0 18" />
            <path d="M 0 -18 Q -90 0 0 18" />
            <path d="M 0 -18 Q 120 0 0 18" opacity="0.4" />
            <path d="M 0 -18 Q -120 0 0 18" opacity="0.4" />
          </g>

          {/* Radiation beams along the magnetic axis (tilted from spin axis) */}
          <g transform="rotate(-18)">
            {/* Up beam */}
            <polygon points="-9,-18 9,-18 22,-115 -22,-115" fill="url(#ps-beam-up)" opacity="0.85" />
            <line x1="0" y1="-18" x2="0" y2="-115" stroke="#fff" strokeWidth="1.5" opacity="0.95" />
            {/* Down beam */}
            <polygon points="-9,18 9,18 22,115 -22,115" fill="url(#ps-beam-down)" opacity="0.85" />
            <line x1="0" y1="18" x2="0" y2="115" stroke="#fff" strokeWidth="1.5" opacity="0.95" />
          </g>

          {/* Spin axis (vertical, dashed) */}
          <line x1="0" y1="-100" x2="0" y2="100" stroke="#fde68a" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
          <text x="6" y="-95" fontSize="7" fill="#fde68a" opacity="0.7">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "អ័ក្សវិល" : "spin axis"}</tspan>
          </text>

          {/* Neutron star core */}
          <circle cx="0" cy="0" r="18" fill="url(#ps-core)" filter="url(#ps-glow)" />

          {/* Earth in path of one beam */}
          <g transform="translate(38, -115)">
            <circle cx="0" cy="0" r="6" fill="#3b82f6" />
            <circle cx="0" cy="0" r="6" fill="none" stroke="#bfdbfe" strokeWidth="0.5" />
            <text x="0" y="-10" textAnchor="middle" fontSize="8" fill="#bae6fd" fontWeight="700">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ផែនដី" : "Earth"}</tspan>
            </text>
            <text x="0" y="18" textAnchor="middle" fontSize="7" fill="#bae6fd" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : "italic"}>{isKh ? "ឃើញផ្លែន!" : "sees the flash!"}</tspan>
            </text>
          </g>

          {/* Spin direction indicator */}
          <path d="M -55 0 A 55 55 0 0 1 -38 -40" stroke="#67e8f9" strokeWidth="1.2" fill="none" />
          <polygon points="-38,-40 -32,-36 -42,-32" fill="#67e8f9" />
        </svg>
      </div>

      {/* Pulse rhythm visualisation */}
      <div className="rounded-2xl border border-cyan-300/25 bg-black/65 p-5" data-testid="pulse-rhythm">
        <h4 className={`text-sm font-bold text-cyan-100 mb-3 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "សញ្ញាដែលតេឡេទស្សន៍ឃើញ" : "What our telescopes hear"}
        </h4>
        <svg viewBox="0 0 600 80" className="w-full h-auto" aria-label={aria("A regular pulse signal — flash, gap, flash, gap, repeating", "សញ្ញាប្រកដ — ផ្លែន ចន្លោះ ផ្លែន ចន្លោះ ហើយកើតឡើងម្ដងហើយម្ដងទៀត", lang)}>
            <line x1="0" y1="60" x2="600" y2="60" stroke="#1e293b" strokeWidth="1" />
            {[0,1,2,3,4,5,6,7].map(i => {
              const x = 30 + i * 75;
              return (
                <g key={i}>
                  <line x1={x} y1="60" x2={x} y2="60"   stroke="#0e7490" strokeWidth="1" />
                  <line x1={x} y1="60" x2={x} y2="20"   stroke="#67e8f9" strokeWidth="2.5" />
                  <circle cx={x} cy="20" r="4" fill="#fff" />
                  <circle cx={x} cy="20" r="8" fill="#67e8f9" opacity="0.4" />
                </g>
              );
            })}
            <text x="300" y="78" textAnchor="middle" fontSize="9" fill="#94a3b8" fontStyle="italic">
              <tspan className={isKh ? "font-khmer" : "italic"}>{isKh ? "ចង្វាក់ប្រកដ — ដូចបេះដូងលោត" : "perfectly regular — like a heartbeat"}</tspan>
            </text>
        </svg>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="rounded-md bg-cyan-500/10 border border-cyan-300/25 p-2">
            <Magnet className="w-3.5 h-3.5 mx-auto text-cyan-300 mb-1" />
            <div className={`font-bold text-cyan-100 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ដែនម៉ាញេទិកខ្លាំង" : "Strong magnetism"}</div>
            <div className={`text-white/60 mt-0.5 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ខ្លាំងជាងផែនដី ១ ទ្រី ដង" : "1T× Earth's"}</div>
          </div>
          <div className="rounded-md bg-cyan-500/10 border border-cyan-300/25 p-2">
            <Lightbulb className="w-3.5 h-3.5 mx-auto text-cyan-300 mb-1" />
            <div className={`font-bold text-cyan-100 ${isKh ? "font-khmer" : ""}`}>{isKh ? "កាំរស្មីប៉ូល" : "Polar beams"}</div>
            <div className={`text-white/60 mt-0.5 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ខាងជើង និងខាងត្បូង" : "north + south"}</div>
          </div>
          <div className="rounded-md bg-cyan-500/10 border border-cyan-300/25 p-2">
            <Zap className="w-3.5 h-3.5 mx-auto text-cyan-300 mb-1" />
            <div className={`font-bold text-cyan-100 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ផ្លែនទៀងទាត់" : "Regular flashes"}</div>
            <div className={`text-white/60 mt-0.5 ${isKh ? "font-khmer" : ""}`}>{isKh ? "រាប់រយ ក្នុងមួយវិនាទី" : "100s per second"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main wrapper ─────────────────────────────────────────────────────────

export function NeutronStarModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="neutron-star-module"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-cyan-400/15 border border-cyan-300/30 flex items-center justify-center text-cyan-200">
            <Radio className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-cyan-100 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Neutron Stars & Pulsars: The Cosmic Lighthouses", "ផ្កាយណឺត្រុង និងផ្កាយពុលសា៖ បង្គោលភ្លើងហ្វារសកល")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-cyan-300/30 to-transparent" />
      </div>

      <div
        className="rounded-3xl border border-cyan-300/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(103,232,249,0.18) 0%, rgba(67,56,202,0.32) 35%, rgba(7,7,37,0.95) 75%)",
          boxShadow: "0 0 40px rgba(103,232,249,0.18) inset",
        }}
      >
        {/* Magnetic field line decorations */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-25">
            <g fill="none" stroke="#67e8f9" strokeWidth="0.5">
              <path d="M 200 100 Q 280 60 360 100 Q 280 140 200 100" />
              <path d="M 200 100 Q 320 40 400 100 Q 320 160 200 100" />
              <path d="M 200 100 Q 360 20 460 100 Q 360 180 200 100" opacity="0.5" />
              <path d="M 200 100 Q 120 60 40 100 Q 120 140 200 100" />
              <path d="M 200 100 Q 80 40 0 100 Q 80 160 200 100" />
            </g>
            {Array.from({ length: 40 }).map((_, i) => {
              const x = (i * 47) % 400;
              const y = (i * 29) % 200;
              const r = (i % 3) * 0.3 + 0.3;
              return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.4 + (i % 5) * 0.1} />;
            })}
          </svg>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-5 items-center">
          <div className="flex justify-center">
            <svg viewBox="-80 -80 160 160" className="w-40 h-40" aria-hidden>
              <defs>
                <radialGradient id="hero-ns" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%"  stopColor="#fff" />
                  <stop offset="40%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                </radialGradient>
                <filter id="hero-glow">
                  <feGaussianBlur stdDeviation="3" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Beams */}
              <g transform="rotate(-22)">
                <polygon points="-10,-15 10,-15 22,-78 -22,-78" fill="#67e8f9" opacity="0.55" />
                <polygon points="-10,15 10,15 22,78 -22,78"     fill="#67e8f9" opacity="0.55" />
                <line x1="0" y1="-15" x2="0" y2="-78" stroke="#fff" strokeWidth="1.4" />
                <line x1="0" y1="15"  x2="0" y2="78"  stroke="#fff" strokeWidth="1.4" />
              </g>
              {/* Field lines */}
              <g stroke="#a78bfa" strokeWidth="0.6" fill="none" opacity="0.55">
                <path d="M 0 -15 Q 50 0 0 15" />
                <path d="M 0 -15 Q -50 0 0 15" />
                <path d="M 0 -15 Q 70 0 0 15" opacity="0.5" />
                <path d="M 0 -15 Q -70 0 0 15" opacity="0.5" />
              </g>
              <circle cx="0" cy="0" r="15" fill="url(#hero-ns)" filter="url(#hero-glow)" />
            </svg>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#fff 0%,#67e8f9 55%,#6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(103,232,249,0.45)",
              }}
            >
              {t("A City-Sized Sun That Spins 700 Times a Second", "ព្រះអាទិត្យធំស្មើក្រុង វិល ៧០០ ដង ក្នុងមួយវិនាទី")}
            </h2>
            <p className={`text-white/85 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "When a giant star dies, it can leave behind something almost impossible — a city-sized object as heavy as the Sun, with a magnetic field a trillion times stronger than Earth's, spinning so fast that it sends regular pulses of light across the galaxy.",
                "នៅពេលផ្កាយយក្សស្លាប់ វាអាចបន្សល់ទុក វត្ថុដ៏អស្ចារ្យ — វត្ថុធំស្មើក្រុង ដែលធ្ងន់ស្មើព្រះអាទិត្យ មានដែនម៉ាញេទិកខ្លាំង ១ ទ្រីលានដង ជាងផែនដី វិលលឿនរហូតបញ្ជូនផ្លែនពន្លឺប្រកដ ឆ្លងកាត់ហ្គាឡាក់ស៊ី។",
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6"><CrushedCorePanel lang={lang} /></div>
      <div className="mb-6"><IceSkaterPanel lang={lang} /></div>
      <PulsarPanel lang={lang} />

      <p className={`mt-5 text-center text-cyan-100/75 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "Every steady tick from a pulsar is a message from the corpse of a star — a perfect cosmic clock built from the death of something giant.",
          "រាល់សំឡេងតេជារៀងរាល់ ពីផ្កាយពុលសា ជាសារពីសាកសព នៃផ្កាយ — នាឡិកាសកលដ៏ល្អឥតខ្ចោះ បង្កើតឡើង ពីមរណៈភាពនៃវត្ថុយក្សមួយ។",
        )}
      </p>
    </section>
  );
}
