import {
  Globe2, Thermometer, Wind, Mountain, Ruler, Clock, CalendarDays,
  Snowflake, Sun, Sparkles,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

// ── Reusable header ─────────────────────────────────────────────────────────

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
        <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-400/40 flex items-center justify-center text-rose-300">
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

// ── 1. The Basics — distance + temperature ──────────────────────────────────

function BasicsPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-orange-400/25 bg-gradient-to-br from-[#1a0a05] via-[#3b1106] to-[#0c0202] p-5 sm:p-7">
      <PanelHeader
        icon={<Globe2 className="w-4 h-4" />}
        en="The Basics"
        kh="ព័ត៌មានមូលដ្ឋាន"
        lang={lang}
        descEn="Mars is the fourth planet from the Sun and our nearest planetary neighbour with a solid surface. It orbits at an average distance of about 228 million kilometres from the Sun — roughly 1.5 times further than Earth."
        descKh="ភពអង្គារ ជាភពទីបួនពីព្រះអាទិត្យ និងជាអ្នកជិតខាងភពយើងដែលនៅជិតបំផុត ហើយមានផ្ទៃរឹង។ វាបង្វិលនៅចម្ងាយជាមធ្យមប្រហែល ២២៨ លានគីឡូម៉ែត្រ ពីព្រះអាទិត្យ — ប្រហែល ១,៥ ដងឆ្ងាយជាងផែនដី។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Distance card with mini orbit diagram */}
        <div className="rounded-2xl border border-orange-400/30 bg-black/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Ruler className="w-4 h-4 text-orange-300" />
            <h4 className={`text-sm font-bold text-orange-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ចម្ងាយ ពីព្រះអាទិត្យ" : "Distance from the Sun"}
            </h4>
          </div>

          <svg viewBox="0 0 320 160" className="w-full h-auto" aria-label="Mars orbit diagram" data-testid="mars-orbit">
            <defs>
              <radialGradient id="mp-sun" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="55%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="mp-earth" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
              <radialGradient id="mp-mars" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>
            </defs>
            {/* Earth orbit */}
            <ellipse cx="40" cy="80" rx="80" ry="55" fill="none" stroke="#475569" strokeDasharray="2 4" />
            {/* Mars orbit */}
            <ellipse cx="40" cy="80" rx="120" ry="80" fill="none" stroke="#7c2d12" strokeDasharray="3 5" />
            {/* Sun */}
            <circle cx="40" cy="80" r="14" fill="url(#mp-sun)" />
            <circle cx="40" cy="80" r="7" fill="#fde047" />
            {/* Earth */}
            <circle cx="120" cy="80" r="6" fill="url(#mp-earth)" />
            <text x="120" y="98" textAnchor="middle" fontSize="9" fill="#93c5fd" fontWeight="700">
              {isKh ? "ផែនដី" : "Earth"}
            </text>
            {/* Mars */}
            <circle cx="160" cy="80" r="5" fill="url(#mp-mars)" />
            <text x="160" y="68" textAnchor="middle" fontSize="9" fill="#fb923c" fontWeight="700">
              {isKh ? "អង្គារ" : "Mars"}
            </text>
            {/* Distance arrow */}
            <line x1="40" y1="145" x2="160" y2="145" stroke="#fb923c" strokeWidth="1" markerEnd="url(#mp-arrow)" />
            <defs>
              <marker id="mp-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#fb923c" />
              </marker>
            </defs>
            <text x="100" y="156" textAnchor="middle" fontSize="9" fill="#fb923c">
              {isKh ? "~២២៨ លាន គម" : "~228 million km"}
            </text>
          </svg>

          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-md bg-orange-500/10 border border-orange-400/20 p-2">
              <div className="text-[10px] text-orange-200/70">{isKh ? "ភពទី" : "Planet #"}</div>
              <div className="text-base font-bold text-orange-300 font-mono">4</div>
            </div>
            <div className="rounded-md bg-orange-500/10 border border-orange-400/20 p-2">
              <div className="text-[10px] text-orange-200/70">{isKh ? "ឆ្ងាយជាងផែនដី" : "Vs. Earth"}</div>
              <div className="text-base font-bold text-orange-300 font-mono">×1.5</div>
            </div>
          </div>
        </div>

        {/* Temperature card with day/night thermometer */}
        <div className="rounded-2xl border border-rose-400/30 bg-black/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Thermometer className="w-4 h-4 text-rose-300" />
            <h4 className={`text-sm font-bold text-rose-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "សីតុណ្ហភាពខ្លាំង" : "Extreme Temperatures"}
            </h4>
          </div>

          {/* Thermometer bar showing +20 °C → −73 °C on a −100 → +50 scale. */}
          {(() => {
            const SCALE_MIN = -100;
            const SCALE_MAX = 50;
            const range = SCALE_MAX - SCALE_MIN; // 150
            const pctOf = (t: number) => ((t - SCALE_MIN) / range) * 100;
            const dayPct = pctOf(20);   // 80%
            const nightPct = pctOf(-73); // 18%
            return (
              <div className="space-y-3" data-testid="mars-thermometer">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-300" />
                      <span className={`text-xs text-amber-200 ${isKh ? "font-khmer" : ""}`}>
                        {isKh ? "ថ្ងៃ (រដូវក្ដៅ, អេក្វាទ័រ)" : "Day (summer, equator)"}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-amber-300 font-bold">+20 °C</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                      style={{ width: `${dayPct}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Snowflake className="w-3.5 h-3.5 text-cyan-300" />
                      <span className={`text-xs text-cyan-200 ${isKh ? "font-khmer" : ""}`}>
                        {isKh ? "យប់" : "Night"}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-cyan-300 font-bold">−73 °C</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-700 to-cyan-400"
                      style={{ width: `${nightPct}%` }}
                    />
                  </div>
                </div>

                {/* Scale labels */}
                <div className="flex items-center justify-between text-[10px] text-white/40 font-mono pt-1">
                  <span>−100 °C</span>
                  <span>0 °C</span>
                  <span>+50 °C</span>
                </div>
              </div>
            );
          })()}

          <p className={`text-white/60 text-xs mt-4 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "បរិយាកាសស្ដើងបំផុត មិនអាចរក្សាកម្ដៅបានទេ — ក្ដៅជាងផែនដី ហើយត្រជាក់ខ្លាំងជាងផែនដី ក្នុងថ្ងៃតែមួយ។"
              : "The atmosphere is too thin to hold heat — Mars can swing nearly 100 °C between noon and midnight in a single day."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 2. The Weather — atmosphere composition + dust storms ───────────────────

function WeatherPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  // Composition slices (whole planet atmosphere by volume)
  const composition = [
    { labelEn: "Carbon Dioxide", labelKh: "កាបូនឌីអុកស៊ីត", short: "CO₂", pct: 95.0, color: "#fb923c" },
    { labelEn: "Nitrogen",       labelKh: "នីត្រូសែន",     short: "N₂",  pct: 2.8,  color: "#a78bfa" },
    { labelEn: "Argon",          labelKh: "អាហ្គូន",        short: "Ar",  pct: 2.0,  color: "#60a5fa" },
    { labelEn: "Other trace",    labelKh: "ឧស្ម័នផ្សេង",   short: "···", pct: 0.2,  color: "#94a3b8" },
  ] as const;

  // Convert to stacked-bar widths
  let acc = 0;
  const segments = composition.map((c) => {
    const start = acc;
    acc += c.pct;
    return { ...c, start };
  });

  return (
    <div className="rounded-3xl border border-orange-400/25 bg-gradient-to-br from-[#1a0a05] via-[#3b1106] to-[#0c0202] p-5 sm:p-7">
      <PanelHeader
        icon={<Wind className="w-4 h-4" />}
        en="The Weather on Mars"
        kh="អាកាសធាតុនៅលើភពអង្គារ"
        lang={lang}
        descEn="The Martian atmosphere is less than 1% as thick as Earth's — and it is almost entirely carbon dioxide. That thin air drives some of the most dramatic weather in the solar system: planet-wide dust storms that can rage for months and blot out the Sun."
        descKh="បរិយាកាសភពអង្គារ ក្រាស់តិចជាង ១% ធៀបនឹងផែនដី — ហើយវាសឹងតែទាំងស្រុង គឺ CO₂។ ខ្យល់ស្ដើងនោះ បង្កើតអាកាសធាតុដ៏អស្ចារ្យបំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ៖ ព្យុះធូលីពាសពេញភពទាំងមូល ដែលអាចបក់រយៈពេលច្រើនខែ និងបាំងព្រះអាទិត្យ។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Atmosphere composition */}
        <div className="rounded-2xl border border-orange-400/30 bg-black/30 p-5">
          <h4 className={`text-sm font-bold text-orange-200 mb-3 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "សមាសភាពបរិយាកាស" : "Atmospheric Composition"}
          </h4>

          {/* Stacked bar (proportional widths) */}
          <div
            className="h-6 w-full rounded-md overflow-hidden flex border border-white/10"
            data-testid="atmosphere-bar"
            role="img"
            aria-label={isKh ? "សមាសភាពបរិយាកាសភពអង្គារ" : "Mars atmosphere composition"}
          >
            {segments.map((s) => (
              <div
                key={s.short}
                style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                title={`${s.short} ${s.pct}%`}
              />
            ))}
          </div>

          {/* Legend */}
          <ul className="mt-3 space-y-1.5">
            {segments.map((s) => (
              <li key={s.short} className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="font-mono text-white/60 w-10">{s.short}</span>
                <span className={`flex-1 text-white/75 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? s.labelKh : s.labelEn}
                </span>
                <span className="font-mono text-white/85 font-bold">{s.pct}%</span>
              </li>
            ))}
          </ul>

          <p className={`text-white/55 text-[11px] mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "សម្ពាធបរិយាកាសត្រឹម ~០,៦% នៃផែនដី — ស្ដើងពេក សម្រាប់មនុស្សដកដង្ហើម។"
              : "Surface pressure is only ~0.6% of Earth's — far too thin for humans to breathe."}
          </p>
        </div>

        {/* Dust-storm visual */}
        <div className="rounded-2xl border border-rose-400/30 bg-black/30 p-5">
          <h4 className={`text-sm font-bold text-rose-200 mb-3 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ព្យុះធូលី" : "Global Dust Storms"}
          </h4>

          <svg
            viewBox="0 0 320 160"
            className="w-full h-auto"
            aria-label="Mars dust storm diagram"
            data-testid="dust-storm"
          >
            <defs>
              <radialGradient id="ds-mars" cx="0.4" cy="0.4" r="0.7">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="60%" stopColor="#9a3412" />
                <stop offset="100%" stopColor="#451a03" />
              </radialGradient>
              <radialGradient id="ds-storm" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#fed7aa" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Mars disc */}
            <circle cx="160" cy="80" r="60" fill="url(#ds-mars)" />
            {/* Polar caps */}
            <ellipse cx="160" cy="25" rx="22" ry="6" fill="#f1f5f9" opacity="0.85" />
            <ellipse cx="160" cy="135" rx="14" ry="4" fill="#f1f5f9" opacity="0.65" />
            {/* Storm haze */}
            <circle cx="160" cy="80" r="58" fill="url(#ds-storm)" opacity="0.7">
              <animate attributeName="opacity" values="0.4;0.85;0.4" dur="6s" repeatCount="indefinite" />
            </circle>
            {/* Wind arrows */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const a = (deg * Math.PI) / 180;
              const r1 = 70, r2 = 92;
              const x1 = 160 + r1 * Math.cos(a);
              const y1 = 80 + r1 * Math.sin(a);
              const x2 = 160 + r2 * Math.cos(a);
              const y2 = 80 + r2 * Math.sin(a);
              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#fed7aa" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"
                />
              );
            })}
            <text x="160" y="155" textAnchor="middle" fontSize="9" fill="#fed7aa" fontStyle="italic">
              {isKh ? "ខ្យល់រហូតដល់ ៩៦ គម/ម៉ោង" : "winds up to 96 km/h"}
            </text>
          </svg>

          <p className={`text-white/65 text-xs mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "រាល់ប៉ុន្មានឆ្នាំ ព្យុះធូលីមួយ កើនឡើងហ៊ុំព័ទ្ធពេញភពអង្គារ — បាំងព្រះអាទិត្យរយៈពេលច្រើនខែ និងបង្ខំរ៉ូវើថាមពលព្រះអាទិត្យឱ្យសម្រាក។"
              : "Every few years a single storm grows until it engulfs the entire planet — blocking sunlight for months and forcing solar-powered rovers to hibernate."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 3. Giants of Mars — Olympus Mons + Valles Marineris ─────────────────────

function GiantsPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-orange-400/25 bg-gradient-to-br from-[#1a0a05] via-[#3b1106] to-[#0c0202] p-5 sm:p-7">
      <PanelHeader
        icon={<Mountain className="w-4 h-4" />}
        en="The Giants of Mars"
        kh="យក្ស នៃភពអង្គារ"
        lang={lang}
        descEn="Mars hosts the largest volcano and the largest canyon system in the entire solar system. Both are so enormous that nothing on Earth even comes close."
        descKh="ភពអង្គារ មានភ្នំភ្លើងធំបំផុត និងប្រព័ន្ធរណ្ដៅធំបំផុត ក្នុងប្រព័ន្ធព្រះអាទិត្យទាំងមូល។ ទាំងពីរ ធំខ្លាំងណាស់ រហូតដល់គ្មានអ្វីនៅលើផែនដីដែលអាចប្រដូចបាន។"
      />

      {/* Olympus Mons — height comparison */}
      <div className="rounded-2xl border border-rose-400/30 bg-black/30 p-5 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Mountain className="w-4 h-4 text-rose-300" />
          <h4 className={`text-sm font-bold text-rose-200 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "អូឡាំប៉ាស ម៉ន — ភ្នំធំបំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ" : "Olympus Mons — the largest mountain in the solar system"}
          </h4>
        </div>

        <p className={`text-white/70 text-sm leading-relaxed mb-4 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "កំពូលរបស់វាខ្ពស់ ២១,៩ គីឡូម៉ែត្រ — ជិត ៣ ដងខ្ពស់ជាងភ្នំអេវឺរេស្ត។ មូលដ្ឋានរបស់វាមានទំហំស្មើនឹងប្រទេសមួយ — ប្រហែលទំហំប្រទេសប៉ូឡូញ។"
            : "Its summit reaches 21.9 kilometres — nearly three times the height of Mount Everest. Its base is about the size of an entire country — roughly the area of Poland."}
        </p>

        {/* Side-by-side silhouette comparison */}
        <svg
          viewBox="0 0 600 220"
          className="w-full h-auto"
          aria-label="Olympus Mons vs Mount Everest height comparison"
          data-testid="mountain-compare"
        >
          {/* Sky gradient */}
          <defs>
            <linearGradient id="om-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#1e293b" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>
          <rect width="600" height="220" fill="url(#om-sky)" rx="6" />

          {/* Ground line */}
          <line x1="0" y1="195" x2="600" y2="195" stroke="#7c2d12" strokeWidth="1" />

          {/* Mt Everest silhouette (left) — drawn so its rendered height
              matches the true ratio 8.85 / 21.9 of Olympus Mons (Olympus base
              y=195, summit y=22 → 173 px tall; Everest height = 173 * 8.85/21.9
              ≈ 70 px → summit y = 195 - 70 = 125). */}
          <g>
            <polygon
              points="80,195 130,125 175,195"
              fill="#475569"
              stroke="#cbd5e1" strokeWidth="1"
            />
            <polygon
              points="120,140 130,125 145,140 138,147 128,143"
              fill="#f8fafc"
            />
            <text x="127" y="210" textAnchor="middle" fontSize="11" fill="#cbd5e1" fontWeight="700">
              {isKh ? "ភ្នំអេវឺរេស្ត" : "Mt. Everest"}
            </text>
            <text x="127" y="118" textAnchor="middle" fontSize="9" fill="#cbd5e1">
              8.85 km
            </text>
          </g>

          {/* Olympus Mons silhouette (right) — 21.9 km → height 173px */}
          {/* Wide shallow shield-volcano shape */}
          <g>
            <path
              d="M 250 195 C 290 178, 330 70, 425 22 C 520 70, 560 178, 590 195 Z"
              fill="#9a3412"
              stroke="#fb923c" strokeWidth="1"
            />
            {/* Caldera notch on top */}
            <ellipse cx="425" cy="24" rx="22" ry="3" fill="#451a03" />
            <text x="425" y="210" textAnchor="middle" fontSize="11" fill="#fb923c" fontWeight="700">
              {isKh ? "អូឡាំប៉ាស ម៉ន" : "Olympus Mons"}
            </text>
            <text x="425" y="14" textAnchor="middle" fontSize="9" fill="#fb923c">
              21.9 km
            </text>
          </g>

          {/* Scale dotted line at Everest summit height extended right */}
          <line x1="175" y1="125" x2="240" y2="125" stroke="#cbd5e1" strokeDasharray="2 4" opacity="0.5" />
        </svg>

        <div className="mt-2 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-rose-300" />
          <span className={`text-[11px] text-rose-200/80 italic ${isKh ? "font-khmer not-italic" : ""}`}>
            {isKh
              ? "ចំណោទ ផ្ទៃក្រាល មិនមែនកម្ពស់ — អូឡាំប៉ាស ម៉ន មានជម្រាលថ្នមៗ ដូចខែលធំ។"
              : "Scaled to height — Olympus Mons is wide and gently-sloped, like a giant shield."}
          </span>
        </div>
      </div>

      {/* Valles Marineris */}
      <div className="rounded-2xl border border-amber-400/30 bg-black/30 p-5">
        <div className="flex items-center gap-2 mb-2">
          <Mountain className="w-4 h-4 text-amber-300 rotate-180" />
          <h4 className={`text-sm font-bold text-amber-200 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "វ៉ាល់ឡេស ម៉ារីណេរីស — រណ្ដៅយក្ស" : "Valles Marineris — a canyon system that dwarfs ours"}
          </h4>
        </div>

        <p className={`text-white/70 text-sm leading-relaxed mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "វែង ៤,០០០ គីឡូម៉ែត្រ ជ្រៅរហូតដល់ ៧ គីឡូម៉ែត្រ និងធំបំផុត ៦០០ គីឡូម៉ែត្រ។ ប្រសិនបើដាក់នៅលើផែនដី វានឹងវែងពីសមុទ្រមួយដល់សមុទ្រមួយទៀត ពាសពេញសហរដ្ឋអាមេរិក។"
            : "It stretches 4,000 kilometres long, plunges up to 7 kilometres deep, and is up to 600 kilometres wide. Laid across Earth, it would reach from one ocean to the other — spanning the entire United States."}
        </p>

        {/* Comparison bars: length */}
        <div className="space-y-2.5" data-testid="valles-compare">
          <div>
            <div className={`flex items-center justify-between text-[11px] text-white/65 mb-1 ${isKh ? "font-khmer" : ""}`}>
              <span>{isKh ? "វ៉ាល់ឡេស ម៉ារីណេរីស" : "Valles Marineris"}</span>
              <span className="font-mono text-amber-300">4,000 km</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-600 to-amber-300" style={{ width: "100%" }} />
            </div>
          </div>
          <div>
            <div className={`flex items-center justify-between text-[11px] text-white/65 mb-1 ${isKh ? "font-khmer" : ""}`}>
              <span>{isKh ? "ហ្គ្រែនឃែនយ៉ុន (ផែនដី)" : "Grand Canyon (Earth)"}</span>
              <span className="font-mono text-white/65">446 km</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-slate-500 to-slate-400" style={{ width: `${(446 / 4000) * 100}%` }} />
            </div>
          </div>
        </div>

        <p className={`text-white/55 text-[11px] mt-3 italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
          {isKh
            ? "វែងជាង ៩ ដងហ្គ្រែនឃែនយ៉ុន — និងជ្រៅជាង ៤ ដង។"
            : "More than nine times longer — and more than four times deeper — than the Grand Canyon."}
        </p>
      </div>
    </div>
  );
}

// ── 4. Earth vs Mars — quick comparison chart ───────────────────────────────

function ComparisonChart({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  // Each row: label + Earth value + Mars value + Mars-as-fraction-of-Earth (for the bar visual)
  const rows = [
    {
      Icon: Globe2,
      labelEn: "Diameter",
      labelKh: "អង្កត់ផ្ចិត",
      earthEn: "12,742 km",
      earthKh: "១២,៧៤២ គម",
      marsEn: "6,779 km",
      marsKh: "៦,៧៧៩ គម",
      marsRatio: 0.532,
    },
    {
      Icon: Clock,
      labelEn: "Day length",
      labelKh: "ប្រវែងថ្ងៃ",
      earthEn: "24 hours",
      earthKh: "២៤ ម៉ោង",
      marsEn: "24 h 37 min",
      marsKh: "២៤ ម៉ោង ៣៧ នាទី",
      marsRatio: 1.026,
    },
    {
      Icon: CalendarDays,
      labelEn: "Year length",
      labelKh: "ប្រវែងឆ្នាំ",
      earthEn: "365 days",
      earthKh: "៣៦៥ ថ្ងៃ",
      marsEn: "687 days",
      marsKh: "៦៨៧ ថ្ងៃ",
      marsRatio: 1.881,
    },
  ] as const;

  return (
    <div className="rounded-3xl border border-orange-400/25 bg-gradient-to-br from-[#0c0202] via-[#1f0a04] to-[#0c0202] p-5 sm:p-7" data-testid="earth-mars-compare">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-400/40 flex items-center justify-center text-orange-300">
          <Globe2 className="w-4 h-4" />
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ផែនដី ធៀប អង្គារ — តួលេខរហ័ស" : "Earth vs. Mars — at a glance"}
        </h3>
      </div>

      <div className="space-y-5">
        {rows.map((r) => {
          // Normalize the two bars against whichever is larger, so ratios > 1
          // remain visually proportional (Earth's bar shrinks instead of Mars
          // being clamped to 100%).
          const earthPct = r.marsRatio >= 1 ? (1 / r.marsRatio) * 100 : 100;
          const marsPct  = r.marsRatio >= 1 ? 100 : r.marsRatio * 100;
          return (
            <div key={r.labelEn}>
              <div className="flex items-center gap-2 mb-2">
                <r.Icon className="w-4 h-4 text-orange-300" />
                <span className={`text-sm font-semibold text-white ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? r.labelKh : r.labelEn}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Earth row */}
                <div>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className="text-blue-300 font-semibold">{isKh ? "ផែនដី" : "Earth"}</span>
                    <span className="font-mono text-white/85">
                      {isKh ? r.earthKh : r.earthEn}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-700 to-sky-400"
                      style={{ width: `${earthPct}%` }}
                    />
                  </div>
                </div>

                {/* Mars row */}
                <div>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className="text-orange-300 font-semibold">{isKh ? "អង្គារ" : "Mars"}</span>
                    <span className="font-mono text-white/85">
                      {isKh ? r.marsKh : r.marsEn}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-700 to-orange-400"
                      style={{ width: `${marsPct}%` }}
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

export function MarsPlanetModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="mars-planet-module"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-400/30 flex items-center justify-center text-rose-300">
            <Globe2 className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-rose-300 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Mars: Our Next-Door Neighbor", "ភពអង្គារ៖ អ្នកជិតខាងរបស់យើង")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-rose-400/30 to-transparent" />
      </div>

      {/* Hero card with terracotta planet */}
      <div
        className="rounded-3xl border border-rose-400/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(220,38,38,0.18) 0%,rgba(124,45,18,0.45) 45%,rgba(20,5,2,0.9) 100%)",
          boxShadow: "0 0 40px rgba(234,88,12,0.18) inset",
        }}
      >
        <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-rose-700/20 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 sm:grid-cols-[140px_minmax(0,1fr)] gap-5 items-center">
          {/* Mars planet visual */}
          <div className="flex justify-center">
            <svg viewBox="-70 -70 140 140" className="w-32 h-32" aria-hidden>
              <defs>
                <radialGradient id="hero-mars" cx="0.35" cy="0.3" r="0.75">
                  <stop offset="0%" stopColor="#fed7aa" />
                  <stop offset="35%" stopColor="#fb923c" />
                  <stop offset="80%" stopColor="#9a3412" />
                  <stop offset="100%" stopColor="#451a03" />
                </radialGradient>
              </defs>
              <circle cx="0" cy="0" r="60" fill="url(#hero-mars)" />
              {/* Surface markings */}
              <ellipse cx="-15" cy="-10" rx="18" ry="6" fill="#7c2d12" opacity="0.6" />
              <ellipse cx="20"  cy="15"  rx="22" ry="9" fill="#7c2d12" opacity="0.55" />
              <ellipse cx="-25" cy="25"  rx="14" ry="5" fill="#7c2d12" opacity="0.45" />
              {/* Polar cap */}
              <ellipse cx="0" cy="-50" rx="20" ry="6" fill="#fef3c7" opacity="0.85" />
              <ellipse cx="0" cy="55"  rx="14" ry="4" fill="#fef3c7" opacity="0.6" />
            </svg>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#fed7aa 0%,#fb923c 55%,#fecaca 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(234,88,12,0.25)",
              }}
            >
              {t("The Red Planet", "ភពក្រហម")}
            </h2>
            <p className={`text-white/75 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "A cold desert world, half the diameter of Earth, painted rust-red by iron-rich dust. It has the largest volcano, the deepest canyon, and possibly the answer to whether life ever existed beyond Earth.",
                "ពិភពវាលខ្សាច់ត្រជាក់ ដែលមានអង្កត់ផ្ចិតពាក់កណ្ដាលផែនដី លាបពណ៌ច្រែះក្រហមដោយធូលីសម្បូរជាតិដែក។ វាមានភ្នំភ្លើងធំបំផុត រណ្ដៅជ្រៅបំផុត និងប្រហែលជាចម្លើយចំពោះសំណួរថា តើជីវិតធ្លាប់មាននៅខាងក្រៅផែនដីឬទេ។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Basics */}
      <div className="mb-6">
        <BasicsPanel lang={lang} />
      </div>

      {/* 2. Weather */}
      <div className="mb-6">
        <WeatherPanel lang={lang} />
      </div>

      {/* 3. Giants */}
      <div className="mb-6">
        <GiantsPanel lang={lang} />
      </div>

      {/* 4. Comparison chart */}
      <ComparisonChart lang={lang} />

      <p className={`mt-5 text-center text-rose-200/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "Half the size, twice the year, three times the mountain — and only a few light-minutes away.",
          "ពាក់កណ្ដាលទំហំ ឆ្នាំវែងទ្វេដង ភ្នំខ្ពស់បីដង — ហើយឆ្ងាយតែប៉ុន្មាននាទីពន្លឺប៉ុណ្ណោះ។",
        )}
      </p>
    </section>
  );
}
