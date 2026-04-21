import { useState } from "react";
import {
  Globe2, Thermometer, Wind, Cloud, CloudRain, Compass, Flame,
  RotateCcw, Gauge, Sun, Droplets,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

type Lang = "en" | "kh";

// ── Reusable header (Venusian palette) ──────────────────────────────────────

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
        <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300">
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

// ── 1. Basics + Backward Spin ───────────────────────────────────────────────

function BasicsPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-[#1a1405] via-[#3b2906] to-[#0c0902] p-5 sm:p-7">
      <PanelHeader
        icon={<Globe2 className="w-4 h-4" />}
        en="The Basics & The Backward Spin"
        kh="ព័ត៌មានមូលដ្ឋាន និងការវិលបញ្ច្រាស"
        lang={lang}
        descEn="Venus is the second planet from the Sun and almost exactly the same size as Earth — sometimes called Earth's 'twin'. But that is where the similarities end. Venus spins the wrong way, so slowly that one day there outlasts an entire year."
        descKh="ភពសុក្រ ជាភពទីពីរ ពីព្រះអាទិត្យ ហើយមានទំហំជិតដូចគ្នាបេះបិទនឹងផែនដី — ពេលខ្លះគេហៅថា «ភ្លោះ» របស់ផែនដី។ ប៉ុន្តែ ភាពស្រដៀងគ្នា ឈប់ត្រឹមនោះ។ ភពសុក្រ វិលលើអ័ក្សបញ្ច្រាសពីផែនដី យឺតរហូតដល់ មួយថ្ងៃ នៅទីនោះ វែងជាងមួយឆ្នាំទាំងមូល។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Distance & size card */}
        <div className="rounded-2xl border border-amber-400/30 bg-black/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Globe2 className="w-4 h-4 text-amber-300" />
            <h4 className={`text-sm font-bold text-amber-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ចម្ងាយ និងទំហំ" : "Distance & Size"}
            </h4>
          </div>

          <svg
            viewBox="0 0 320 160"
            className="w-full h-auto"
            aria-label="Venus orbit and Earth-Venus size comparison"
            data-testid="venus-orbit"
          >
            <defs>
              <radialGradient id="vp-sun" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="55%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="vp-venus" cx="0.4" cy="0.4" r="0.7">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="55%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>
              <radialGradient id="vp-earth" cx="0.4" cy="0.4" r="0.6">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
            </defs>
            {/* Mercury orbit (faint) */}
            <ellipse cx="40" cy="80" rx="55" ry="38" fill="none" stroke="#475569" strokeDasharray="2 4" opacity="0.5" />
            {/* Venus orbit */}
            <ellipse cx="40" cy="80" rx="85" ry="58" fill="none" stroke="#f59e0b" strokeDasharray="3 5" />
            {/* Earth orbit */}
            <ellipse cx="40" cy="80" rx="115" ry="78" fill="none" stroke="#475569" strokeDasharray="2 4" />
            {/* Sun */}
            <circle cx="40" cy="80" r="14" fill="url(#vp-sun)" />
            <circle cx="40" cy="80" r="7" fill="#fde047" />
            {/* Venus */}
            <circle cx="125" cy="80" r="6" fill="url(#vp-venus)" />
            <text x="125" y="68" textAnchor="middle" fontSize="9" fill="#fbbf24" fontWeight="700">
              {isKh ? "សុក្រ" : "Venus"}
            </text>
            {/* Earth */}
            <circle cx="155" cy="80" r="6" fill="url(#vp-earth)" />
            <text x="155" y="98" textAnchor="middle" fontSize="9" fill="#93c5fd" fontWeight="700">
              {isKh ? "ផែនដី" : "Earth"}
            </text>
            {/* Distance arrow */}
            <defs>
              <marker id="vp-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#fbbf24" />
              </marker>
            </defs>
            <line x1="40" y1="145" x2="125" y2="145" stroke="#fbbf24" strokeWidth="1" markerEnd="url(#vp-arrow)" />
            <text x="82" y="156" textAnchor="middle" fontSize="9" fill="#fbbf24">
              {isKh ? "~១០៨ លាន គម" : "~108 million km"}
            </text>
          </svg>

          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-md bg-amber-500/10 border border-amber-400/20 p-2">
              <div className="text-[10px] text-amber-200/70">{isKh ? "ភពទី" : "Planet #"}</div>
              <div className="text-base font-bold text-amber-300 font-mono">2</div>
            </div>
            <div className="rounded-md bg-amber-500/10 border border-amber-400/20 p-2">
              <div className="text-[10px] text-amber-200/70">{isKh ? "ធៀបនឹងផែនដី" : "Vs. Earth size"}</div>
              <div className="text-base font-bold text-amber-300 font-mono">×0.95</div>
            </div>
          </div>

          <p className={`text-white/60 text-xs mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "អង្កត់ផ្ចិត ១២,១០៤ គីឡូម៉ែត្រ — ត្រឹមតែ ៥% តូចជាងផែនដី។"
              : "Diameter 12,104 km — only 5% smaller than Earth."}
          </p>
        </div>

        {/* Backward spin card */}
        <div className="rounded-2xl border border-orange-400/30 bg-black/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw className="w-4 h-4 text-orange-300" />
            <h4 className={`text-sm font-bold text-orange-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ការវិលបញ្ច្រាស" : "The Backward Spin"}
            </h4>
          </div>

          {/* Sun-rises-in-west diagram */}
          <svg
            viewBox="0 0 320 140"
            className="w-full h-auto"
            aria-label="On Venus the Sun rises in the west"
            data-testid="backward-spin"
          >
            <defs>
              <linearGradient id="vp-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#451a03" />
                <stop offset="100%" stopColor="#1a0d02" />
              </linearGradient>
              <radialGradient id="vp-sunset" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="60%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Sky */}
            <rect width="320" height="105" fill="url(#vp-sky)" rx="4" />
            {/* Ground */}
            <rect y="105" width="320" height="35" fill="#3f1d08" rx="2" />
            {/* Sun (rising on the LEFT = West label) */}
            <circle cx="50" cy="70" r="22" fill="url(#vp-sunset)" />
            <circle cx="50" cy="70" r="11" fill="#fde047" />
            {/* Arrow showing motion: from left up, arching across to right (down) */}
            <path
              d="M 50 70 Q 160 -10, 270 70"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              markerEnd="url(#vp-arrow2)"
            />
            <defs>
              <marker id="vp-arrow2" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#fbbf24" />
              </marker>
            </defs>
            {/* W and E labels on the ground */}
            <text x="50"  y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fbbf24">W</text>
            <text x="270" y="128" textAnchor="middle" fontSize="14" fontWeight="700" fill="#94a3b8">E</text>
            {/* Caption at top */}
            <text x="160" y="20" textAnchor="middle" fontSize="10" fill="#fbbf24" fontStyle="italic">
              {isKh ? "ព្រះអាទិត្យរះពីខាងលិច" : "Sun rises in the West"}
            </text>
          </svg>

          {/* Day vs year stat */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-md bg-orange-500/10 border border-orange-400/20 p-2">
              <div className={`text-[10px] text-orange-200/70 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "មួយថ្ងៃ (សុរីយៈ)" : "1 day (solar)"}
              </div>
              <div className="text-base font-bold text-orange-300 font-mono">117 d</div>
            </div>
            <div className="rounded-md bg-orange-500/10 border border-orange-400/20 p-2">
              <div className={`text-[10px] text-orange-200/70 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "មួយឆ្នាំ" : "1 year"}
              </div>
              <div className="text-base font-bold text-orange-300 font-mono">225 d</div>
            </div>
          </div>

          <p className={`text-white/60 text-xs mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "ភពសុក្រ វិលលើអ័ក្សយឺតខ្លាំង — មួយថ្ងៃសុរីយៈយាវ ១១៧ ថ្ងៃផែនដី ខណៈឆ្នាំ មានត្រឹម ២២៥ ថ្ងៃ។"
              : "Venus spins on its axis so slowly that one solar day lasts 117 Earth-days, while a full orbit (its year) takes only 225 Earth-days."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 2. Runaway Greenhouse Effect ────────────────────────────────────────────

function GreenhousePanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  // Hottest-planet temperature comparison (surface average, °C)
  type Planet = {
    id: string; nameEn: string; nameKh: string;
    tempC: number; color: string; highlight?: boolean;
  };
  const planets: Planet[] = [
    { id: "mercury", nameEn: "Mercury", nameKh: "ភពពុធ",  tempC: 167, color: "#94a3b8" },
    { id: "venus",   nameEn: "Venus",   nameKh: "ភពសុក្រ", tempC: 464, color: "#f59e0b", highlight: true },
    { id: "earth",   nameEn: "Earth",   nameKh: "ផែនដី",   tempC: 15,  color: "#60a5fa" },
    { id: "mars",    nameEn: "Mars",    nameKh: "ភពអង្គារ", tempC: -63, color: "#fb923c" },
  ];

  const max = 500; // chart scale ceiling

  return (
    <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-[#1a1405] via-[#3b2906] to-[#0c0902] p-5 sm:p-7">
      <PanelHeader
        icon={<Flame className="w-4 h-4" />}
        en="The Runaway Greenhouse Effect"
        kh="ឥទ្ធិពលផ្ទះកញ្ចក់ (ហួសកម្រិត)"
        lang={lang}
        descEn="Venus is the hottest planet in the solar system — even hotter than Mercury, which orbits much closer to the Sun. The reason is its thick atmosphere of carbon dioxide, which traps heat like a perfectly sealed blanket. Sunlight enters, warms the surface, and the heat can never escape back into space."
        descKh="ភពសុក្រ ជាភពក្ដៅបំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ — ក្ដៅជាងភពពុធ ដែលនៅជិតព្រះអាទិត្យជាង។ មូលហេតុ គឺបរិយាកាសក្រាស់ ដែលធ្វើឡើងពី CO₂ ដែលរក្សាកម្ដៅ ដូចភួយបិទជិត។ ពន្លឺថ្ងៃចូល ធ្វើឱ្យផ្ទៃក្ដៅ និងកម្ដៅនោះ មិនអាចចេញត្រឡប់ទៅអវកាសវិញឡើយ។"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Hottest-planet bar chart */}
        <div className="rounded-2xl border border-amber-400/30 bg-black/30 p-5" data-testid="hottest-planets">
          <h4 className={`text-sm font-bold text-amber-200 mb-3 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "សីតុណ្ហភាពផ្ទៃ ជាមធ្យម" : "Average surface temperature"}
          </h4>

          <div className="space-y-2.5">
            {planets.map((p) => {
              const pct = Math.max(2, (Math.abs(p.tempC) / max) * 100);
              const negative = p.tempC < 0;
              return (
                <div key={p.id}>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className={`font-semibold ${p.highlight ? "text-amber-300" : "text-white/75"}`}>
                      {isKh ? p.nameKh : p.nameEn}
                      {p.highlight && (
                        <Flame className="inline-block w-3 h-3 ml-1 -mt-0.5 text-amber-300" aria-hidden />
                      )}
                    </span>
                    <span className="font-mono text-white/85 font-bold">
                      {p.tempC > 0 ? `+${p.tempC}` : p.tempC} °C
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: negative
                          ? "linear-gradient(90deg,#0e7490,#22d3ee)"
                          : `linear-gradient(90deg,${p.color}aa,${p.color})`,
                        boxShadow: p.highlight ? `0 0 12px ${p.color}88` : undefined,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <p className={`text-amber-200/80 text-[11px] mt-3 leading-relaxed italic ${isKh ? "font-khmer leading-loose not-italic" : ""}`}>
            {isKh
              ? "ភពសុក្រ ក្ដៅគ្រប់គ្រាន់ ដើម្បីរំលាយសំណ — ខណៈភពពុធ ត្រជាក់ខ្លាំងនៅផ្នែកងងឹត។"
              : "Venus is hot enough to melt lead — while Mercury actually freezes on its dark side."}
          </p>
        </div>

        {/* Sealed-blanket / CO₂ trap diagram */}
        <div className="rounded-2xl border border-orange-400/30 bg-black/30 p-5">
          <h4 className={`text-sm font-bold text-orange-200 mb-3 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ភួយ CO₂ បិទជិត" : "The sealed CO₂ blanket"}
          </h4>

          <svg
            viewBox="0 0 320 180"
            className="w-full h-auto"
            aria-label="CO2 traps heat on Venus"
            data-testid="co2-trap"
          >
            <defs>
              <linearGradient id="vp-ground" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9a3412" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="vp-cloud" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fde68a" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            {/* Space (top) */}
            <rect width="320" height="40" fill="#0c0a09" />
            {/* Cloud blanket */}
            <rect y="40" width="320" height="40" fill="url(#vp-cloud)" />
            {/* Atmosphere haze */}
            <rect y="80" width="320" height="60" fill="#7c2d12" opacity="0.55" />
            {/* Ground */}
            <rect y="140" width="320" height="40" fill="url(#vp-ground)" />

            {/* Incoming sunlight rays (yellow, going down through clouds) */}
            {[40, 100, 160, 220, 280].map((x, i) => (
              <line
                key={`in-${i}`}
                x1={x} y1="0" x2={x - 10} y2="140"
                stroke="#fde047" strokeWidth="1.5" opacity="0.85"
                markerEnd="url(#vp-arrow3)"
              />
            ))}
            {/* Outgoing infrared (red, bouncing back from ground but stuck under cloud) */}
            {[60, 130, 200, 260].map((x, i) => (
              <path
                key={`out-${i}`}
                d={`M ${x} 140 Q ${x + 8} 110, ${x - 4} 85`}
                fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.9"
                markerEnd="url(#vp-arrow4)"
              />
            ))}
            <defs>
              <marker id="vp-arrow3" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#fde047" />
              </marker>
              <marker id="vp-arrow4" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#ef4444" />
              </marker>
            </defs>

            {/* Labels */}
            <text x="10"  y="32"  fontSize="9" fill="#fde047" fontWeight="700">{isKh ? "ពន្លឺថ្ងៃ" : "Sunlight"}</text>
            <text x="10"  y="60"  fontSize="9" fill="#7c2d12" fontWeight="700">{isKh ? "ភួយ CO₂" : "CO₂ blanket"}</text>
            <text x="180" y="135" fontSize="9" fill="#ef4444" fontWeight="700">{isKh ? "កម្ដៅជាប់ខាងក្នុង" : "Heat trapped"}</text>
            <text x="160" y="166" textAnchor="middle" fontSize="9" fill="#fed7aa" fontWeight="700">
              {isKh ? "ផ្ទៃ ៤៦៤ °C" : "Surface +464 °C"}
            </text>
          </svg>

          <p className={`text-white/60 text-xs mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh
              ? "បរិយាកាស ៩៦,៥% CO₂ + ៣,៥% នីត្រូសែន — សមាសភាពជិតបរិសុទ្ធនៃឧស្ម័នផ្ទះកញ្ចក់។"
              : "The atmosphere is 96.5% CO₂ + 3.5% nitrogen — a near-pure greenhouse-gas mix."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 3. Crushing Pressure & Acid Rain ────────────────────────────────────────

function PressureAcidPanel({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  return (
    <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-[#1a1405] via-[#3b2906] to-[#0c0902] p-5 sm:p-7">
      <PanelHeader
        icon={<Gauge className="w-4 h-4" />}
        en="Crushing Pressure & Acid Rain"
        kh="សម្ពាធ និងភ្លៀងអាស៊ីត"
        lang={lang}
        descEn="The Venusian atmosphere is so heavy that standing on the surface feels like being one kilometre below the ocean on Earth — about 90 times Earth's air pressure. And the clouds above? Not water — pure sulfuric acid."
        descKh="បរិយាកាសភពសុក្រ ធ្ងន់ខ្លាំងណាស់ រហូតដល់ ការឈរនៅលើផ្ទៃ មានអារម្មណ៍ដូចនៅក្រោមមហាសមុទ្រ ១ គីឡូម៉ែត្រ លើផែនដី — ប្រហែល ៩០ ដងនៃសម្ពាធខ្យល់ផែនដី។ ហើយពពកខាងលើ? មិនមែនទឹកទេ — អាស៊ីតស៊ុលហ្វួរិកសុទ្ធ។"
      />

      {/* Pressure card with depth comparison */}
      <div className="rounded-2xl border border-amber-400/30 bg-black/30 p-5 mb-4" data-testid="pressure-compare">
        <div className="flex items-center gap-2 mb-3">
          <Gauge className="w-4 h-4 text-amber-300" />
          <h4 className={`text-sm font-bold text-amber-200 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "សម្ពាធកំទេច" : "Crushing Pressure"}
          </h4>
        </div>

        <svg
          viewBox="0 0 600 180"
          className="w-full h-auto"
          aria-label="Venus surface pressure equals 1 km underwater on Earth"
        >
          <defs>
            <linearGradient id="vp-sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c4a6e" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
          {/* Sky / surface */}
          <rect width="600" height="22" fill="#1e293b" rx="4" />
          <text x="20" y="16" fontSize="10" fill="#cbd5e1" fontWeight="700">
            {isKh ? "ផ្ទៃផែនដី (សម្ពាធ ១ បរិយាកាស)" : "Earth surface (1 atm)"}
          </text>

          {/* Ocean column */}
          <rect y="22" width="600" height="140" fill="url(#vp-sea)" />

          {/* Depth ticks at 0, 250, 500, 750, 1000 m */}
          {[0, 0.25, 0.5, 0.75, 1].map((d, i) => {
            const y = 22 + d * 140;
            const m = d * 1000;
            return (
              <g key={i}>
                <line x1="0" y1={y} x2="600" y2={y} stroke="#0ea5e9" opacity="0.25" />
                <text x="595" y={y + 3} fontSize="8" fill="#7dd3fc" textAnchor="end">{m} m</text>
              </g>
            );
          })}

          {/* Diver at 1 km depth */}
          <g transform="translate(180, 152)">
            <circle cx="0" cy="0" r="6" fill="#fcd34d" />
            <rect x="-4" y="6" width="8" height="14" fill="#fbbf24" rx="1" />
          </g>
          <text x="180" y="178" textAnchor="middle" fontSize="9" fill="#fde047" fontWeight="700">
            {isKh ? "១ គម ក្រោមទឹក = ៩០ atm" : "1 km underwater = 90 atm"}
          </text>

          {/* Venus surface marker on right side */}
          <g transform="translate(440, 152)">
            <circle cx="0" cy="0" r="9" fill="url(#vp-venus-mini)" />
          </g>
          <defs>
            <radialGradient id="vp-venus-mini" cx="0.4" cy="0.4" r="0.7">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
          </defs>
          <text x="440" y="178" textAnchor="middle" fontSize="9" fill="#fbbf24" fontWeight="700">
            {isKh ? "ផ្ទៃភពសុក្រ ≈ ៩០ atm" : "Venus surface ≈ 90 atm"}
          </text>

          {/* Equals symbol bridging diver and Venus marker */}
          <text x="310" y="158" textAnchor="middle" fontSize="22" fill="#fbbf24" fontWeight="700">=</text>
        </svg>

        <p className={`text-white/60 text-xs mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "យានអវកាសសូវៀតមួយចំនួន ដែលចុះចតលើភពសុក្រ ស៊ូបានតែ ៥០ ទៅ ១២៧ នាទី មុនពេលបរិយាកាសកំទេចវា។"
            : "The Soviet probes that landed on Venus survived only 50 to 127 minutes before the atmosphere crushed them."}
        </p>
      </div>

      {/* Acid rain card */}
      <div className="rounded-2xl border border-yellow-400/30 bg-black/30 p-5" data-testid="acid-rain">
        <div className="flex items-center gap-2 mb-3">
          <CloudRain className="w-4 h-4 text-yellow-300" />
          <h4 className={`text-sm font-bold text-yellow-200 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ភ្លៀងអាស៊ីត ដែលរំហួតមុនធ្លាក់ដល់ដី" : "Acid Rain that boils away before it lands"}
          </h4>
        </div>

        <svg
          viewBox="0 0 320 180"
          className="w-full h-auto"
          aria-label="Sulfuric acid rain evaporates above the surface"
        >
          <defs>
            <linearGradient id="vp-acidcloud" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
            <linearGradient id="vp-hot" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c2d12" />
              <stop offset="100%" stopColor="#1c0a02" />
            </linearGradient>
          </defs>
          {/* Cloud band (upper) */}
          <ellipse cx="80"  cy="35" rx="60" ry="14" fill="url(#vp-acidcloud)" />
          <ellipse cx="190" cy="32" rx="70" ry="15" fill="url(#vp-acidcloud)" />
          <ellipse cx="270" cy="38" rx="50" ry="12" fill="url(#vp-acidcloud)" />
          <text x="160" y="14" textAnchor="middle" fontSize="9" fill="#fde047" fontWeight="700">
            {isKh ? "ពពកអាស៊ីតស៊ុលហ្វួរិក" : "Sulfuric-acid clouds"}
          </text>

          {/* Falling acid drops */}
          {[60, 95, 130, 175, 215, 250, 290].map((x, i) => (
            <g key={i}>
              <path
                d={`M ${x} 50 L ${x - 2} 80 L ${x + 2} 80 Z`}
                fill="#fbbf24" opacity="0.85"
              />
              {/* Steam puff where the drop evaporates */}
              <circle cx={x} cy={92} r="4" fill="#fef3c7" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
              </circle>
            </g>
          ))}

          {/* Hot atmosphere haze (between cloud and ground) */}
          <rect y="100" width="320" height="40" fill="url(#vp-hot)" opacity="0.85" />
          <text x="160" y="124" textAnchor="middle" fontSize="9" fill="#fed7aa" fontStyle="italic">
            {isKh ? "ខ្យល់ក្ដៅ ៤៦៤ °C — ដំណក់ទឹករំហួត" : "464 °C air — drops boil away"}
          </text>

          {/* Ground (no rain reaches it) */}
          <rect y="140" width="320" height="40" fill="#451a03" />
          <text x="160" y="170" textAnchor="middle" fontSize="9" fill="#fbbf24" fontWeight="700">
            {isKh ? "ផ្ទៃ — ស្ងួត" : "Surface — bone dry"}
          </text>
        </svg>

        <p className={`text-white/65 text-xs mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "ភ្លៀងធ្លាក់ពីពពកអាស៊ីតស៊ុលហ្វួរិក — ប៉ុន្តែ មុនទាន់ដល់ដី ខ្យល់ ៤៦៤ °C ធ្វើឱ្យដំណក់ទាំងនោះរំហួតបាត់។"
            : "Rain falls from sulfuric-acid clouds — but the 464 °C air below boils every drop away long before it can hit the ground."}
        </p>
      </div>
    </div>
  );
}

// ── 4. Earth vs Venus quick chart ───────────────────────────────────────────

function ComparisonChart({ lang }: { lang: Lang }) {
  const isKh = lang === "kh";

  type Row = {
    Icon: React.ComponentType<{ className?: string }>;
    labelEn: string; labelKh: string;
    earthEn: string; earthKh: string; earthValue: number;
    venusEn: string; venusKh: string; venusValue: number;
  };

  // Each row uses absolute "for-display" numeric values. Bars are normalized
  // against the row max so whichever is larger fills the track and the smaller
  // shows true proportion.
  const rows: Row[] = [
    {
      Icon: Wind,
      labelEn: "Atmosphere — % CO₂",
      labelKh: "បរិយាកាស — %  CO₂",
      earthEn: "0.04% CO₂",
      earthKh: "០,០៤%  CO₂",
      earthValue: 0.04,
      venusEn: "96.5% CO₂",
      venusKh: "៩៦,៥%  CO₂",
      venusValue: 96.5,
    },
    {
      Icon: Thermometer,
      labelEn: "Average temperature",
      labelKh: "សីតុណ្ហភាព ជាមធ្យម",
      earthEn: "+15 °C",
      earthKh: "+១៥ °C",
      earthValue: 15,
      venusEn: "+464 °C",
      venusKh: "+៤៦៤ °C",
      venusValue: 464,
    },
    {
      Icon: Gauge,
      labelEn: "Surface pressure",
      labelKh: "សម្ពាធផ្ទៃ",
      earthEn: "1 atm",
      earthKh: "១ atm",
      earthValue: 1,
      venusEn: "≈ 92 atm",
      venusKh: "≈ ៩២ atm",
      venusValue: 92,
    },
  ];

  return (
    <div
      className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-[#0c0902] via-[#1f1604] to-[#0c0902] p-5 sm:p-7"
      data-testid="earth-venus-compare"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300">
          <Globe2 className="w-4 h-4" />
        </div>
        <h3 className={`font-display font-bold text-white text-lg sm:text-xl ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ផែនដី ធៀប សុក្រ — តួលេខរហ័ស" : "Earth vs. Venus — at a glance"}
        </h3>
      </div>

      <div className="space-y-5">
        {rows.map((r) => {
          const max = Math.max(r.earthValue, r.venusValue);
          const earthPct = (r.earthValue / max) * 100;
          const venusPct = (r.venusValue / max) * 100;
          // Floor so the tiny-but-nonzero values still produce a visible sliver
          const earthBar = r.earthValue > 0 ? Math.max(1.5, earthPct) : 0;
          const venusBar = r.venusValue > 0 ? Math.max(1.5, venusPct) : 0;

          return (
            <div key={r.labelEn}>
              <div className="flex items-center gap-2 mb-2">
                <r.Icon className="w-4 h-4 text-amber-300" />
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
                      style={{ width: `${earthBar}%` }}
                    />
                  </div>
                </div>

                {/* Venus */}
                <div>
                  <div className={`flex items-center justify-between text-xs mb-1 ${isKh ? "font-khmer" : ""}`}>
                    <span className="text-amber-300 font-semibold">{isKh ? "ភពសុក្រ" : "Venus"}</span>
                    <span className="font-mono text-white/85">{isKh ? r.venusKh : r.venusEn}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-300"
                      style={{ width: `${venusBar}%` }}
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

export function VenusPlanetModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const kh = lang === "kh";
  // Suppress unused-import warning in case sections shift; kept for parity with siblings.
  const [, _setNoop] = useState(0);
  void _setNoop;

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      data-testid="venus-planet-module"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Cloud className="w-3.5 h-3.5" />
          </div>
          <span className={`text-xs font-bold tracking-widest text-amber-300 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
            {t("Venus: The Greenhouse Warning", "ភពសុក្រ៖ ការព្រមានអំពីឥទ្ធិពលផ្ទះកញ្ចក់")}
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-400/30 to-transparent" />
      </div>

      {/* Hero card with sulfur-yellow planet */}
      <div
        className="rounded-3xl border border-amber-400/30 p-6 sm:p-8 mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(245,158,11,0.18) 0%,rgba(124,45,18,0.45) 45%,rgba(20,12,2,0.92) 100%)",
          boxShadow: "0 0 40px rgba(217,119,6,0.18) inset",
        }}
      >
        <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-yellow-700/25 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 sm:grid-cols-[140px_minmax(0,1fr)] gap-5 items-center">
          {/* Venus visual: thick swirling cloud-blanket planet */}
          <div className="flex justify-center">
            <svg viewBox="-70 -70 140 140" className="w-32 h-32" aria-hidden>
              <defs>
                <radialGradient id="hero-venus" cx="0.3" cy="0.3" r="0.85">
                  <stop offset="0%" stopColor="#fefce8" />
                  <stop offset="35%" stopColor="#fde68a" />
                  <stop offset="70%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#451a03" />
                </radialGradient>
              </defs>
              <circle cx="0" cy="0" r="60" fill="url(#hero-venus)" />
              {/* Swirling cloud bands */}
              <path d="M -55 -15 Q -10 -28, 35 -10 Q 10 0, -45 5 Z"   fill="#fef3c7" opacity="0.35" />
              <path d="M -50 12  Q  0 -2,  50  18  Q  10 28, -45 22 Z" fill="#fef3c7" opacity="0.25" />
              <path d="M -40 35  Q -5 28,  45  40 Q 5 48, -38 44 Z"   fill="#fef3c7" opacity="0.2" />
              <ellipse cx="-15" cy="-30" rx="20" ry="4" fill="#fefce8" opacity="0.4" />
            </svg>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl sm:text-3xl mb-3 ${kh ? "font-khmer leading-loose" : ""}`}
              style={{
                background: "linear-gradient(90deg,#fef3c7 0%,#fbbf24 55%,#fed7aa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(245,158,11,0.25)",
              }}
            >
              {t("Earth's Twisted Twin", "ភ្លោះរបស់ផែនដី ដែលបែរខុស")}
            </h2>
            <p className={`text-white/75 text-sm sm:text-base leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Almost the same size as Earth, but wrapped in a suffocating blanket of carbon dioxide and sulfuric-acid clouds. A surface hot enough to melt lead, pressure that crushes spacecraft, and a sun that rises in the west.",
                "មានទំហំស្ទើរតែដូចផែនដី ប៉ុន្តែ ត្រូវរុំដោយភួយ CO₂ និងពពកអាស៊ីតស៊ុលហ្វួរិក ដែលធ្វើឱ្យពិបាកដកដង្ហើម។ ផ្ទៃក្ដៅគ្រប់គ្រាន់ រំលាយសំណ សម្ពាធកំទេចយានអវកាស និងព្រះអាទិត្យដែលរះពីខាងលិច។",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Basics + Backward Spin */}
      <div className="mb-6">
        <BasicsPanel lang={lang} />
      </div>

      {/* 2. Greenhouse */}
      <div className="mb-6">
        <GreenhousePanel lang={lang} />
      </div>

      {/* 3. Pressure & Acid Rain */}
      <div className="mb-6">
        <PressureAcidPanel lang={lang} />
      </div>

      {/* 4. Earth-vs-Venus chart */}
      <ComparisonChart lang={lang} />

      <p className={`mt-5 text-center text-amber-200/70 text-xs italic max-w-2xl mx-auto ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "Same size as Earth — and a warning of what an unchecked greenhouse effect can do.",
          "ទំហំស្មើផែនដី — ហើយជាការព្រមាន អំពីអ្វីដែលឥទ្ធិពលផ្ទះកញ្ចក់ដែលគ្មានការគ្រប់គ្រង អាចបង្ក។",
        )}
      </p>
    </section>
  );
}

// Suppress unused-import warnings for icons we reference only conditionally.
void Compass; void Sun; void Droplets;
