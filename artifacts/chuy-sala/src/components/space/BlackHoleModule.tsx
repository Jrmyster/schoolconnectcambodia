import {
  CircleDot, Orbit, Camera, HelpCircle, Zap, Telescope,
  Infinity as InfinityIcon, Compass, AlertTriangle,
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
        <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-300/40 flex items-center justify-center text-amber-200">
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

// ── 1. Ultimate Gravity ──────────────────────────────────────────────────

function UltimateGravityPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  // Escape velocity bars
  const bodies = [
    { en: "Moon",       kh: "ព្រះច័ន្ទ",       v: 2.4,    color: "#cbd5e1", widthPct: 0.5 },
    { en: "Earth",      kh: "ផែនដី",          v: 11.2,   color: "#3b82f6", widthPct: 2.5 },
    { en: "Sun",        kh: "ព្រះអាទិត្យ",     v: 618,    color: "#fb923c", widthPct: 25 },
    { en: "Black hole", kh: "ប្រហោងខ្មៅ",      v: 300000, color: "#fde68a", widthPct: 100 },
  ];

  return (
    <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-[#000000] via-[#0a0410] to-[#000000] p-5 sm:p-7">
      <PanelHeader
        icon={<Zap className="w-4 h-4" />}
        en="The Ultimate Gravity"
        kh="កម្លាំងទំនាញខ្លាំងបំផុត"
        lang={lang}
        descEn="A black hole is not actually a 'hole' in space. It is an object — but an object with so much mass squeezed into such a tiny space that its gravity has become inescapable. To leave the surface of the Earth, a rocket has to reach 11 km/s. To escape a black hole, you would have to travel faster than light itself: 300,000 km/s. And nothing in the universe — not light, not radio waves, not information — can travel faster than light. So once something falls in, it is gone, forever."
        descKh="ប្រហោងខ្មៅ ពិតប្រាកដ មិនមែនជា « ប្រហោង » នៅក្នុងលំហទេ។ វាជាវត្ថុមួយ — ប៉ុន្តែជាវត្ថុ ដែលមានម៉ាស់ច្រើនណាស់ ច្របាច់ក្នុងលំហតូចណាស់ រហូតកម្លាំងទំនាញរបស់វា ក្លាយជាមិនអាចគេចចេញបាន។ ដើម្បីចេញពីផ្ទៃផែនដី រ៉ុកកែតត្រូវឈានដល់ល្បឿន ១១ គម/វិនាទី។ ដើម្បីគេចចេញពីប្រហោងខ្មៅ អ្នកត្រូវធ្វើដំណើរ លឿនជាងពន្លឺផ្ទាល់៖ ៣០០,០០០ គម/វិនាទី។ ហើយគ្មានអ្វី ក្នុងសកលលោក — ទាំងពន្លឺ ទាំងរលកវិទ្យុ ទាំងព័ត៌មាន — អាចធ្វើដំណើរ លឿនជាងពន្លឺបានទេ។ ដូច្នេះនៅពេលអ្វីមួយធ្លាក់ចូល វាបាត់ ជារៀងរហូត។"
      />

      {/* Escape velocity comparison */}
      <div className="rounded-2xl border border-amber-300/25 bg-black/60 p-5" data-testid="escape-velocity">
        <h4 className={`text-sm font-bold text-amber-100 mb-4 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ល្បឿនដែលត្រូវការ ដើម្បីគេចចេញ" : "How fast you'd have to fly to escape"}
        </h4>
        <div className="space-y-3">
          {bodies.map((b, i) => {
            const isLight = b.v >= 300000;
            return (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`text-xs font-semibold text-white ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? b.kh : b.en}
                  </span>
                  <span className={`text-xs font-mono ${isLight ? "text-amber-200" : "text-white/70"}`}>
                    {isLight
                      ? (isKh ? "៣០០,០០០ គម/វិនាទី — ល្បឿនពន្លឺ" : "300,000 km/s — speed of light")
                      : (isKh ? `${b.v.toString().replace(".", ".")} គម/វិនាទី` : `${b.v} km/s`)}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-slate-900/80 border border-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${b.widthPct}%`,
                      background: isLight
                        ? "linear-gradient(90deg, #fde68a 0%, #fb923c 60%, #ef4444 100%)"
                        : b.color,
                      boxShadow: isLight ? "0 0 8px #fbbf24" : undefined,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className={`mt-4 text-[11px] text-amber-100/75 italic text-center ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
          {isKh
            ? "គ្មានអ្វី ក្នុងសកលលោក អាចលឿនជាងពន្លឺ — ដូច្នេះគ្មានអ្វី អាចគេចចេញ"
            : "Nothing in the universe is faster than light — so nothing can ever escape."}
        </p>
      </div>
    </div>
  );
}

// ── 2. Event Horizon ─────────────────────────────────────────────────────

function EventHorizonPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-[#000000] via-[#0a0410] to-[#000000] p-5 sm:p-7">
      <PanelHeader
        icon={<AlertTriangle className="w-4 h-4" />}
        en="The Event Horizon"
        kh="ជើងមេឃព្រឹត្តិការណ៍"
        lang={lang}
        descEn="The event horizon is the invisible boundary around a black hole — the 'point of no return.' Cross it, and you can never come back. From outside, it looks like a perfectly black sphere. From inside, no signal — not even a single photon of light — can ever reach the outside universe again. The event horizon does not destroy you immediately; it simply divides the universe in two. Inside, and outside. And the inside is forever cut off."
        descKh="ជើងមេឃព្រឹត្តិការណ៍ ជាព្រំដែនមិនអាចមើលឃើញ ជុំវិញប្រហោងខ្មៅ — « ចំណុចគ្មានវិលត្រឡប់ »។ ឆ្លងកាត់វា ហើយអ្នកមិនអាចត្រឡប់មកវិញបានទេ។ មើលពីខាងក្រៅ វាមើលទៅដូចជាបាល់ខ្មៅ ដ៏ល្អឥតខ្ចោះ។ ពីខាងក្នុង គ្មានសញ្ញាណាមួយ — សូម្បីតែភាគល្អិតពន្លឺមួយ — អាចទៅដល់សកលលោកខាងក្រៅ បានទៀតទេ។ ជើងមេឃព្រឹត្តិការណ៍ មិនបំផ្លាញអ្នកភ្លាមៗទេ វាគ្រាន់តែបែងចែកសកលលោក ជាពីរ។ ខាងក្នុង និងខាងក្រៅ។ ហើយខាងក្នុង ត្រូវកាត់ផ្តាច់ជារៀងរហូត។"
      />

      <div className="rounded-2xl border border-amber-300/25 bg-black/60 p-5" data-testid="event-horizon-diagram">
        <svg viewBox="-150 -120 300 240" className="w-full max-w-md mx-auto h-auto" aria-label={aria("Cross-section showing the event horizon as the point of no return around a singularity", "ផ្នែកកាត់ បង្ហាញពីជើងមេឃព្រឹត្តិការណ៍ ជាចំណុចគ្មានវិលត្រឡប់ ជុំវិញឯកត្តភាព", lang)}>
          <defs>
            <radialGradient id="eh-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"  stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#7c2d12" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer warping rings (gravitational gradient hint) */}
          <circle cx="0" cy="0" r="110" fill="none" stroke="#fbbf24" strokeWidth="0.4" opacity="0.15" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="95"  fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.25" strokeDasharray="3 3" />

          {/* Glow halo */}
          <circle cx="0" cy="0" r="80" fill="url(#eh-glow)" />

          {/* Event horizon ring (the "point of no return") */}
          <circle cx="0" cy="0" r="55" fill="#000" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="6 4" />

          {/* Singularity at the very centre */}
          <circle cx="0" cy="0" r="3" fill="#fff" />
          <circle cx="0" cy="0" r="6" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.4" />

          {/* Outside arrow — escapes */}
          <g stroke="#22c55e" strokeWidth="1.5" fill="#22c55e">
            <line x1="-130" y1="-90" x2="-95" y2="-65" />
            <polygon points="-95,-65 -100,-72 -107,-67" />
            <text x="-138" y="-95" fontSize="9" fill="#86efac" fontWeight="700">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "នៅក្រៅ — ផុត" : "outside — safe"}</tspan>
            </text>
          </g>

          {/* Crossing arrow — gone */}
          <g stroke="#ef4444" strokeWidth="1.5" fill="#ef4444">
            <line x1="120" y1="-95" x2="35" y2="-30" />
            <polygon points="35,-30 45,-32 42,-22" />
            <text x="125" y="-100" fontSize="9" fill="#fca5a5" fontWeight="700" textAnchor="end">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ឆ្លងកាត់ — បាត់ជារៀងរហូត" : "crossed — lost forever"}</tspan>
            </text>
          </g>

          {/* Labels */}
          <line x1="55" y1="0" x2="105" y2="40" stroke="#fde68a" strokeWidth="0.6" strokeDasharray="2 2" />
          <text x="108" y="44" fontSize="9" fill="#fde68a" fontWeight="700">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ជើងមេឃព្រឹត្តិការណ៍" : "event horizon"}</tspan>
          </text>

          <line x1="0" y1="0" x2="-70" y2="60" stroke="#fff" strokeWidth="0.6" strokeDasharray="2 2" />
          <text x="-75" y="64" fontSize="9" fill="#fff" fontWeight="700" textAnchor="end">
            <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ឯកត្តភាព" : "singularity"}</tspan>
          </text>
        </svg>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-md bg-emerald-500/10 border border-emerald-300/25 p-3">
            <div className={`text-[11px] font-bold text-emerald-200 mb-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "នៅខាងក្រៅ" : "Outside"}
            </div>
            <p className={`text-[11px] text-emerald-100/80 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? "ពន្លឺ និងសញ្ញា អាចគេចចេញ" : "Light and signals can escape."}
            </p>
          </div>
          <div className="rounded-md bg-rose-500/10 border border-rose-300/25 p-3">
            <div className={`text-[11px] font-bold text-rose-200 mb-1 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "នៅខាងក្នុង" : "Inside"}
            </div>
            <p className={`text-[11px] text-rose-100/80 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? "កាត់ផ្តាច់ពីសកលលោក ជារៀងរហូត" : "Cut off from the universe forever."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. M87 Landmark ──────────────────────────────────────────────────────

function M87Panel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-[#000000] via-[#0a0410] to-[#000000] p-5 sm:p-7">
      <PanelHeader
        icon={<Camera className="w-4 h-4" />}
        en="The M87 Landmark"
        kh="រូបភាពដំបូងនៃប្រហោងខ្មៅ"
        lang={lang}
        descEn="On April 10, 2019, humanity took its first ever photo of a black hole. The Event Horizon Telescope — eight radio observatories spread across the entire planet, working together as one Earth-sized telescope — captured the supermassive black hole at the heart of the M87 galaxy, 55 million light-years away. The black centre is the silhouette of the event horizon. The glowing orange ring is super-heated gas, swirling at near light-speed just before it falls in. We have never seen the black hole itself — and we never will. We only see the fire at the edge of nothing."
        descKh="នៅថ្ងៃទី ១០ ខែមេសា ឆ្នាំ ២០១៩ មនុស្សជាតិ បានថតរូបប្រហោងខ្មៅ ជាលើកដំបូងហើយ។ Event Horizon Telescope — តេឡេទស្សន៍វិទ្យុ ៨ នៅជុំវិញពិភពលោកទាំងមូល ដែលធ្វើការរួមគ្នា ជាតេឡេទស្សន៍ធំស្មើនឹងផែនដី — បានចាប់ប្រហោងខ្មៅយក្ស នៅចំកណ្តាលហ្គាឡាក់ស៊ី M87 ឆ្ងាយ ៥៥ លានឆ្នាំពន្លឺ។ ផ្នែកខ្មៅនៅកណ្តាល ជាស្រមោលនៃជើងមេឃព្រឹត្តិការណ៍។ រង្វង់ពណ៌ទឹកក្រូច ដែលបញ្ចេញពន្លឺ ជាឧស្ម័នក្តៅខ្លាំង វិលជុំប្រហែលល្បឿនពន្លឺ មុនវាធ្លាក់ចូល។ យើងមិនដែលឃើញប្រហោងខ្មៅផ្ទាល់ទេ — ហើយយើងនឹងមិនឃើញទេ។ យើងគ្រាន់តែឃើញភ្លើង នៅគែមនៃភាពគ្មានអ្វី។"
      />

      <div className="rounded-2xl border border-amber-300/25 bg-black p-5" data-testid="m87-image">
        {/* Stylised EHT-style image of M87 */}
        <div className="flex justify-center mb-3">
          <svg viewBox="-100 -100 200 200" className="w-full max-w-sm h-auto" aria-label={aria("Stylised reproduction of the 2019 Event Horizon Telescope image of M87", "ការបង្ហាញឡើងវិញ នៃរូបភាពតេឡេទស្សន៍ Event Horizon Telescope ឆ្នាំ ២០១៩ នៃ M87", lang)}>
            <defs>
              <radialGradient id="m87-disk" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%"  stopColor="#000" />
                <stop offset="42%" stopColor="#000" />
                <stop offset="48%" stopColor="#7c2d12" />
                <stop offset="56%" stopColor="#fb923c" />
                <stop offset="62%" stopColor="#fde68a" />
                <stop offset="74%" stopColor="#fb923c" />
                <stop offset="86%" stopColor="#7c2d12" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="m87-bright" cx="0.4" cy="0.62" r="0.3">
                <stop offset="0%"  stopColor="#fffbeb" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#fb923c" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Black background plate */}
            <rect x="-100" y="-100" width="200" height="200" fill="#000" />
            {/* Glowing accretion ring */}
            <circle cx="0" cy="0" r="80" fill="url(#m87-disk)" />
            {/* Asymmetric brighter region (Doppler-boosted, lower-left in real image) */}
            <ellipse cx="-22" cy="32" rx="55" ry="42" fill="url(#m87-bright)" />
            {/* Inner shadow (event horizon silhouette) */}
            <circle cx="0" cy="0" r="38" fill="#000" />
            {/* Subtle outer haze */}
            <circle cx="0" cy="0" r="92" fill="none" stroke="#fb923c" strokeWidth="0.4" opacity="0.15" />
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-black border border-slate-500" />
            <span className={`text-white/70 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ស្រមោលប្រហោងខ្មៅ" : "black hole shadow"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
            <span className={`text-white/70 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ឧស្ម័នក្តៅ វិលជុំ" : "hot gas spinning"}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
          <div className="rounded-md bg-amber-500/10 border border-amber-300/25 p-2">
            <Telescope className="w-3.5 h-3.5 mx-auto text-amber-300 mb-1" />
            <div className={`font-bold text-amber-100 ${isKh ? "font-khmer" : ""}`}>{isKh ? "១០ មេសា ២០១៩" : "10 Apr 2019"}</div>
            <div className={`text-white/60 mt-0.5 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ការបង្ហាញ" : "revealed"}</div>
          </div>
          <div className="rounded-md bg-amber-500/10 border border-amber-300/25 p-2">
            <Compass className="w-3.5 h-3.5 mx-auto text-amber-300 mb-1" />
            <div className={`font-bold text-amber-100 ${isKh ? "font-khmer" : ""}`}>{isKh ? "៥៥ លាន ឆ្នាំពន្លឺ" : "55M light-years"}</div>
            <div className={`text-white/60 mt-0.5 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ចម្ងាយ" : "distance"}</div>
          </div>
          <div className="rounded-md bg-amber-500/10 border border-amber-300/25 p-2">
            <Orbit className="w-3.5 h-3.5 mx-auto text-amber-300 mb-1" />
            <div className={`font-bold text-amber-100 font-mono ${isKh ? "font-khmer" : ""}`}>{isKh ? "៦.៥ ប៊ី × ព្រះអាទិត្យ" : "6.5B × Sun"}</div>
            <div className={`text-white/60 mt-0.5 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ម៉ាស់" : "mass"}</div>
          </div>
          <div className="rounded-md bg-amber-500/10 border border-amber-300/25 p-2">
            <Telescope className="w-3.5 h-3.5 mx-auto text-amber-300 mb-1" />
            <div className={`font-bold text-amber-100 ${isKh ? "font-khmer" : ""}`}>{isKh ? "៨ តេឡេទស្សន៍" : "8 telescopes"}</div>
            <div className={`text-white/60 mt-0.5 ${isKh ? "font-khmer" : ""}`}>{isKh ? "ជុំវិញផែនដី" : "around Earth"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 4. What is Inside? ───────────────────────────────────────────────────

function InsidePanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-[#000000] via-[#0a0410] to-[#000000] p-5 sm:p-7">
      <PanelHeader
        icon={<HelpCircle className="w-4 h-4" />}
        en="What is Inside?"
        kh="តើមានអ្វីនៅខាងក្នុង?"
        lang={lang}
        descEn="The honest answer is: nobody knows. No experiment can ever look inside. Our equations describe a 'singularity' — a single point of zero size and infinite density where all the mass is crushed together — but most physicists agree this just means our equations break down. Something else, something we don't yet understand, must be happening at the centre. The most imaginative theories suggest a black hole could even be a tunnel — a 'wormhole' — leading to another part of the universe, or to a different universe altogether. None of this has been proven. The inside of a black hole is the biggest unknown in modern science."
        descKh="ចម្លើយដ៏ស្មោះត្រង់ គឺ៖ គ្មាននរណាដឹងទេ។ គ្មានការពិសោធន៍ណាមួយ អាចមើលទៅខាងក្នុងបានទេ។ សមីការរបស់យើងពិពណ៌នាពី « ឯកត្តភាព » — ចំណុចមួយ ដែលមានទំហំសូន្យ និងដង់ស៊ីតេគ្មានកំណត់ ដែលម៉ាស់ទាំងអស់ ត្រូវបានច្របាច់ជាមួយគ្នា — ប៉ុន្តែ រូបវិទូភាគច្រើនយល់ស្រប ថានេះគ្រាន់តែមានន័យថា សមីការរបស់យើងបាក់។ អ្វីមួយផ្សេងទៀត ដែលយើងមិនទាន់យល់ ត្រូវតែកើតឡើង នៅចំកណ្តាល។ ទ្រឹស្តីដ៏មានការស្រមើស្រមៃបំផុត ស្នើថា ប្រហោងខ្មៅ អាចជាផ្លូវរូងក្រោមដី — « ប្រហោងដង្កូវ » — ដែលនាំទៅផ្នែកមួយផ្សេងទៀត នៃសកលលោក ឬទៅសកលលោក ខុសគ្នាទាំងស្រុង។ គ្មានរឿងណាមួយត្រូវបានបញ្ជាក់ឱ្យដឹងទេ។ ខាងក្នុងប្រហោងខ្មៅ ជាការមិនស្គាល់ ដ៏ធំជាងគេ ក្នុងវិទ្យាសាស្ត្រសម័យទំនើប។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="inside-theories">
        {/* Singularity card */}
        <div className="rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-950/30 to-black p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-100">
              <InfinityIcon className="w-4 h-4" />
            </div>
            <h4 className={`text-sm font-bold text-amber-100 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ឯកត្តភាព" : "The Singularity"}
            </h4>
          </div>

          <svg viewBox="-100 -60 200 120" className="w-full h-auto mb-3" aria-label={aria("All mass crushed into a single point of zero volume", "ម៉ាស់ទាំងអស់ ច្របាច់ចូលក្នុងចំណុចមួយ ដែលមានទំហំសូន្យ", lang)}>
            <defs>
              <radialGradient id="sg-conv" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%"  stopColor="#fde68a" />
                <stop offset="40%" stopColor="#fb923c" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Converging arrows */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              const x1 = 70 * Math.cos(a);
              const y1 = 50 * Math.sin(a);
              const x2 = 8  * Math.cos(a);
              const y2 = 6  * Math.sin(a);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#fbbf24" strokeWidth="1" opacity="0.6" />
              );
            })}
            <circle cx="0" cy="0" r="30" fill="url(#sg-conv)" />
            <circle cx="0" cy="0" r="2.5" fill="#fff" />
          </svg>

          <p className={`text-xs text-white/85 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ម៉ាស់ទាំងអស់របស់ផ្កាយ — ច្រើនជាងព្រះអាទិត្យពេញ — ត្រូវបានច្របាច់ ឱ្យតូចជាងភាគល្អិតមួយ។ ទំហំ៖ សូន្យ។ ដង់ស៊ីតេ៖ គ្មានកំណត់។ វិទ្យាសាស្ត្ររបស់យើង ឈប់ដំណើរការត្រឹមនេះ។"
              : "All the mass of an entire star — sometimes more than the Sun — squeezed into something smaller than a single particle. Size: zero. Density: infinite. Our science breaks down right there."}
          </p>
        </div>

        {/* Wormhole card */}
        <div className="rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-950/40 to-black p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-100">
              <CircleDot className="w-4 h-4" />
            </div>
            <h4 className={`text-sm font-bold text-violet-100 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ប្រហោងដង្កូវ — ទ្រឹស្តី" : "Wormholes — speculation"}
            </h4>
          </div>

          <svg viewBox="-110 -60 220 120" className="w-full h-auto mb-3" aria-label={aria("A speculative tunnel connecting two distant points in spacetime", "ផ្លូវរូងក្រោមដី តភ្ជាប់ចំណុចពីរ ឆ្ងាយគ្នា ក្នុងលំហ-ពេលវេលា", lang)}>
            <defs>
              <radialGradient id="wh-l" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#000" />
                <stop offset="70%" stopColor="#000" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.7" />
              </radialGradient>
              <radialGradient id="wh-r" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#000" />
                <stop offset="70%" stopColor="#000" />
                <stop offset="100%" stopColor="#fb923c" stopOpacity="0.7" />
              </radialGradient>
            </defs>
            {/* Spacetime grid (curved) */}
            <g stroke="#a855f7" strokeWidth="0.4" fill="none" opacity="0.4">
              <path d="M -100 -40 Q 0 0 100 -40" />
              <path d="M -100 -20 Q 0 20 100 -20" />
              <path d="M -100 0   Q 0 40 100 0" />
              <path d="M -100 20  Q 0 60 100 20" />
            </g>
            {/* Two mouths */}
            <ellipse cx="-75" cy="0" rx="20" ry="28" fill="url(#wh-l)" stroke="#a855f7" strokeWidth="1" />
            <ellipse cx="75"  cy="0" rx="20" ry="28" fill="url(#wh-r)" stroke="#fb923c" strokeWidth="1" />
            {/* Connecting tunnel */}
            <path d="M -75 -25 Q 0 -45 75 -25" fill="none" stroke="#c4b5fd" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.7" />
            <path d="M -75 25  Q 0 45  75 25"  fill="none" stroke="#fdba74" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.7" />
            <text x="-75" y="50" textAnchor="middle" fontSize="9" fill="#c4b5fd">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "ទីនេះ" : "here"}</tspan>
            </text>
            <text x="75" y="50" textAnchor="middle" fontSize="9" fill="#fdba74">
              <tspan className={isKh ? "font-khmer" : ""}>{isKh ? "?" : "?"}</tspan>
            </text>
          </svg>

          <p className={`text-xs text-white/85 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ទ្រឹស្តីខ្លះស្នើថា ប្រហោងខ្មៅ អាចជាផ្លូវលំហ — តភ្ជាប់ទៅផ្នែកមួយផ្សេងទៀត នៃសកលលោក ឬសូម្បីតែ មិតិផ្សេង។ ដ៏គួរឱ្យចាប់អារម្មណ៍ — ប៉ុន្តែមិនទាន់ត្រូវបានបញ្ជាក់ ឬបដិសេធទេ។"
              : "Some theories propose black holes could be tunnels through space — connecting to a distant part of our universe, or even to a different dimension. Fascinating — but neither proven nor disproven."}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-amber-500/10 border border-amber-300/20 p-3">
        <p className={`text-amber-100/85 text-xs leading-relaxed text-center italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
          {isKh
            ? "ខាងក្នុងប្រហោងខ្មៅ ជាសំណួរធំជាងគេ ដែលវិទ្យាសាស្ត្រ មិនទាន់ឆ្លើយបាន"
            : "The inside of a black hole is the biggest open question in all of science."}
        </p>
      </div>
    </div>
  );
}

// ── Main wrapper ─────────────────────────────────────────────────────────

export function BlackHoleModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="black-hole-module"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-300/30 flex items-center justify-center text-amber-200">
            <CircleDot className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-amber-100 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Black Holes: The End of Space and Time", "ប្រហោងខ្មៅ៖ ចុងបញ្ចប់នៃលំហ និងពេលវេលា")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-300/30 to-transparent" />
      </div>

      <div
        className="rounded-3xl border border-amber-300/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(251,191,36,0.18) 0%, rgba(124,45,18,0.25) 30%, rgba(0,0,0,0.95) 70%)",
          boxShadow: "0 0 40px rgba(251,191,36,0.18) inset",
        }}
      >
        {/* Gravitational lensing effect — warped concentric rings */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-30">
            <g fill="none" stroke="#fbbf24" strokeWidth="0.4">
              <ellipse cx="120" cy="100" rx="160" ry="60" opacity="0.15" />
              <ellipse cx="120" cy="100" rx="130" ry="48" opacity="0.2" />
              <ellipse cx="120" cy="100" rx="100" ry="36" opacity="0.25" />
              <ellipse cx="120" cy="100" rx="70"  ry="24" opacity="0.3" />
              <ellipse cx="120" cy="100" rx="40"  ry="14" opacity="0.4" />
            </g>
            {/* Star field */}
            {Array.from({ length: 50 }).map((_, i) => {
              const x = (i * 47) % 400;
              const y = (i * 29) % 200;
              const r = (i % 3) * 0.4 + 0.4;
              return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.4 + (i % 5) * 0.1} />;
            })}
          </svg>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-5 items-center">
          <div className="flex justify-center">
            <svg viewBox="-80 -80 160 160" className="w-40 h-40" aria-hidden>
              <defs>
                <radialGradient id="hero-bh" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%"  stopColor="#000" />
                  <stop offset="42%" stopColor="#000" />
                  <stop offset="48%" stopColor="#7c2d12" />
                  <stop offset="56%" stopColor="#fb923c" />
                  <stop offset="62%" stopColor="#fde68a" />
                  <stop offset="74%" stopColor="#fb923c" />
                  <stop offset="86%" stopColor="#7c2d12" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="0" cy="0" r="65" fill="url(#hero-bh)" />
              <circle cx="0" cy="0" r="28" fill="#000" />
            </svg>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#fde68a 0%,#fb923c 55%,#7c2d12 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(251,191,36,0.35)",
              }}
            >
              {t("Where Even Light Cannot Escape", "កន្លែងដែលសូម្បីពន្លឺ ក៏មិនអាចគេចចេញ")}
            </h2>
            <p className={`text-white/85 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "A black hole is the strangest object in the universe — a place where gravity is so extreme that space and time themselves bend, break, and end. Once you cross its edge, you are gone from our universe forever. And we now have a photograph.",
                "ប្រហោងខ្មៅ ជាវត្ថុចម្លែកបំផុត ក្នុងសកលលោក — កន្លែងដែលកម្លាំងទំនាញ ខ្លាំងជ្រៀតហួសប្រមាណ រហូតលំហ និងពេលវេលា ខ្លួនឯង ពត់ បាក់ និងបញ្ចប់។ នៅពេលអ្នកឆ្លងកាត់គែមរបស់វា អ្នកបាត់ ពីសកលលោកយើង ជារៀងរហូត។ ហើយឥឡូវនេះ យើងមានរូបថត។",
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6"><UltimateGravityPanel lang={lang} /></div>
      <div className="mb-6"><EventHorizonPanel lang={lang} /></div>
      <div className="mb-6"><M87Panel lang={lang} /></div>
      <InsidePanel lang={lang} />

      <p className={`mt-5 text-center text-amber-100/75 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "Some doors in the universe open only one way — and a black hole is the only door we know that closes forever.",
          "ទ្វារខ្លះក្នុងសកលលោក បើកតែខាងតែម្ខាង — ហើយប្រហោងខ្មៅ ជាទ្វារតែមួយ ដែលយើងស្គាល់ ដែលបិទ ជារៀងរហូត។",
        )}
      </p>
    </section>
  );
}
