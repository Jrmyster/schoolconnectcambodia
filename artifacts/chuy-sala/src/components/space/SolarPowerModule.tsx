import { useState } from "react";
import {
  Sun, Zap, Home, Lightbulb, Leaf,
  Info, CircuitBoard, Sparkles,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ─────────────────────────────────────────────────────────────────────────────
// "Solar Power: Harvesting the Sun" — bilingual interactive module.
//
// Three sub-tools, all self-contained in this one file:
//   1. PVCellAnimation     — photons hitting silicon, knocking electrons free
//   2. SolarHome           — Cambodian house with 3 clickable components
//   3. CleanEnergyCompare  — CO2 bar chart, Coal vs Solar
//
// Bright eco palette (emerald greens + sky blues + sun yellow) so it visually
// pops out of the dark space-themed section it sits inside.
// All animations are scoped CSS keyframes prefixed `solpwr-*` to avoid
// collisions with anything else in the app.
// ─────────────────────────────────────────────────────────────────────────────

type Lang = "en" | "kh";

// ── Shared header ────────────────────────────────────────────────────────────

function ToolHeader({
  icon, en, kh, lang, descEn, descKh,
}: {
  icon: React.ReactNode; en: string; kh: string; lang: Lang;
  descEn: string; descKh: string;
}) {
  const isKh = lang === "kh";
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
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

// ─── 1. PV Cell Animation ───────────────────────────────────────────────────

function PVCellAnimation({ lang }: { lang: Lang }) {
  const t = useTranslation();
  const isKh = lang === "kh";

  // 5 photons + 5 electrons offset in time so the animation looks continuous.
  const photons = [0, 0.4, 0.8, 1.2, 1.6];

  return (
    <div className="rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-[#06231f] to-[#031a26] p-5 sm:p-7">
      <ToolHeader
        icon={<Sun className="w-4 h-4" />}
        en="How a Solar Cell Works"
        kh="វិធីកោសិកាសូឡាដំណើរការ"
        lang={lang}
        descEn="Sunlight is made of tiny energy packets called photons. When they hit silicon, they knock electrons loose — and moving electrons are exactly what we call electricity."
        descKh="ពន្លឺព្រះអាទិត្យ​ផ្សំឡើងពីភាគល្អិតថាមពលតូចៗហៅថា Photon (ភាគល្អិតពន្លឺ)។ ពេលវាប៉ះស៊ីលីកូន វាបើកអេឡិចត្រុងឱ្យរំកិលចេញ — ហើយអេឡិចត្រុងដែលរំកិល គឺជាអ្វីដែលយើងហៅថា ចរន្តអគ្គិសនី។"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,260px)] gap-6 items-start">

        {/* SVG scene */}
        <div className="relative w-full max-w-[520px] mx-auto" data-testid="pv-cell-diagram">
          <svg viewBox="0 0 520 360" className="w-full h-auto">
            <defs>
              {/* Sky → ground gradient backdrop */}
              <linearGradient id="solpwr-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0c4a6e" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
              {/* Photon glow */}
              <radialGradient id="solpwr-photon" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff8a8" />
                <stop offset="60%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
              </radialGradient>
              {/* Panel surface */}
              <linearGradient id="solpwr-panel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width="520" height="360" fill="url(#solpwr-sky)" rx="14" />

            {/* Sun in the corner */}
            <g>
              <circle cx="60" cy="55" r="22" fill="#fff7c2" />
              <circle cx="60" cy="55" r="14" fill="#facc15" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <line
                  key={a}
                  x1={60 + Math.cos((a * Math.PI) / 180) * 28}
                  y1={55 + Math.sin((a * Math.PI) / 180) * 28}
                  x2={60 + Math.cos((a * Math.PI) / 180) * 38}
                  y2={55 + Math.sin((a * Math.PI) / 180) * 38}
                  stroke="#fde047"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* Falling photons (yellow energy packets streaming toward panel) */}
            {photons.map((delay, i) => (
              <circle
                key={i}
                cx={140 + i * 36}
                cy="60"
                r="7"
                fill="url(#solpwr-photon)"
                className="solpwr-photon"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}

            {/* Solar panel — slightly tilted parallelogram */}
            <g transform="translate(150 180) skewX(-12)">
              <rect x="0" y="0" width="240" height="120" fill="url(#solpwr-panel)" stroke="#38bdf8" strokeWidth="2" rx="4" />
              {/* Grid of cells */}
              {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3, 4, 5].map((col) => (
                  <rect
                    key={`${row}-${col}`}
                    x={6 + col * 39}
                    y={6 + row * 28}
                    width="36"
                    height="24"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.6"
                    opacity="0.55"
                  />
                ))
              )}
            </g>

            {/* Silicon layer label callout (left side) */}
            <g>
              <line x1="148" y1="240" x2="120" y2="270" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="3 3" />
              <rect x="20" y="262" width="100" height="22" rx="11" fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth="1" />
              <text x="70" y="277" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontFamily="monospace">
                {isKh ? "ស្រទាប់ស៊ីលីកូន" : "Silicon Layer"}
              </text>
            </g>

            {/* Photon label — explicitly bilingual */}
            <g>
              <line x1="195" y1="80" x2="240" y2="40" stroke="#fde68a" strokeWidth="1" strokeDasharray="3 3" />
              <rect x="232" y="22" width={isKh ? 130 : 80} height="22" rx="11" fill="rgba(250,204,21,0.18)" stroke="#facc15" strokeWidth="1" />
              <text x={232 + (isKh ? 65 : 40)} y="37" textAnchor="middle" fill="#fde68a" fontSize="10" fontFamily="monospace">
                {isKh ? "Photon (ភាគល្អិតពន្លឺ)" : "Photon"}
              </text>
            </g>

            {/* Circuit wire from panel → lightbulb → back to panel */}
            <path
              d="M 380 200 L 460 200 L 460 280 L 360 320 L 200 320 L 160 280"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Lightbulb at end of circuit */}
            <g transform="translate(440 230)">
              <circle cx="20" cy="20" r="22" fill="rgba(250,204,21,0.18)" stroke="#facc15" strokeWidth="1" />
              <circle cx="20" cy="20" r="14" fill="#fde047" className="solpwr-bulb" />
              <rect x="14" y="40" width="12" height="6" fill="#94a3b8" />
            </g>

            {/* Flowing electrons along the circuit */}
            {[0, 0.6, 1.2, 1.8].map((delay, i) => (
              <circle
                key={i}
                r="5"
                fill="#22d3ee"
                stroke="#67e8f9"
                strokeWidth="1"
                className="solpwr-electron"
                style={{ animationDelay: `${delay}s`, offsetPath: "path('M 380 200 L 460 200 L 460 280 L 360 320 L 200 320 L 160 280')" } as React.CSSProperties}
              />
            ))}

            {/* Electron label */}
            <g>
              <line x1="290" y1="320" x2="270" y2="350" stroke="#a5f3fc" strokeWidth="1" strokeDasharray="3 3" />
              <rect x="220" y="335" width="100" height="22" rx="11" fill="rgba(34,211,238,0.18)" stroke="#22d3ee" strokeWidth="1" />
              <text x="270" y="350" textAnchor="middle" fill="#a5f3fc" fontSize="10" fontFamily="monospace">
                {isKh ? "Electron (អេឡិចត្រុង)" : "Electron"}
              </text>
            </g>
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-3" aria-live="polite">
          <LegendRow color="#facc15" en="Photon" kh="Photon (ភាគល្អិតពន្លឺ)" descEn="A tiny packet of light energy from the Sun." descKh="ភាគល្អិតថាមពលពន្លឺតូចៗមកពីព្រះអាទិត្យ។" lang={lang} />
          <LegendRow color="#22d3ee" en="Electron" kh="Electron (អេឡិចត្រុង)" descEn="The negative particle that carries electricity through wires." descKh="ភាគល្អិតបន្ទុកអវិជ្ជមាន ដែលដឹកនាំចរន្តអគ្គិសនីតាមខ្សែ។" lang={lang} />
          <LegendRow color="#10b981" en="Silicon Layer" kh="Silicon Layer (ស្រទាប់ស៊ីលីកូន)" descEn="The special crystal inside the panel that releases electrons when photons hit it." descKh="គ្រីស្តាល់ពិសេសខាងក្នុងផ្ទាំងសូឡា ដែលបញ្ចេញអេឡិចត្រុងពេលពន្លឺមកប៉ះ។" lang={lang} />

          <div className={`mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-100 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
            {t(
              "No fuel, no smoke, no moving parts — just light becoming electricity.",
              "គ្មានឥន្ធនៈ គ្មានផ្សែង គ្មានគ្រឿងចលនា — គ្រាន់តែពន្លឺក្លាយជាអគ្គិសនី។"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendRow({
  color, en, kh, descEn, descKh, lang,
}: {
  color: string; en: string; kh: string; descEn: string; descKh: string; lang: Lang;
}) {
  const isKh = lang === "kh";
  return (
    <div className="flex gap-3 items-start">
      <span className="w-3.5 h-3.5 rounded-full mt-1 flex-shrink-0 border border-white/20" style={{ background: color }} />
      <div>
        <div className={`font-bold text-white text-sm ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </div>
        <div className={`text-white/60 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh ? descKh : descEn}
        </div>
      </div>
    </div>
  );
}

// ─── 2. Solar Home ──────────────────────────────────────────────────────────

type ComponentId = "panels" | "inverter" | "battery";

const COMPONENTS: Record<ComponentId, {
  en: string; kh: string;
  bodyEn: string; bodyKh: string;
  pillEn: string; pillKh: string;
  color: string;
}> = {
  panels: {
    en: "Solar Panels",
    kh: "ផ្ទាំងសូឡា",
    bodyEn: "Mounted on the roof to face the sky. They capture sunlight and turn it into DC (direct-current) electricity all day long.",
    bodyKh: "ភ្ជាប់នៅលើដំបូលឆ្ពោះទៅមេឃ។ ពួកវាប្រមូលពន្លឺព្រះអាទិត្យ និងប្ដូរវាជាអគ្គិសនី DC (ចរន្តតែមួយទិស) ពេញមួយថ្ងៃ។",
    pillEn: "Captures the Sun",
    pillKh: "ប្រមូលពន្លឺព្រះអាទិត្យ",
    color: "#3b82f6",
  },
  inverter: {
    en: "The Inverter",
    kh: "ឧបករណ៍បំលែង (Inverter)",
    bodyEn: "Changes the 'shape' of the electricity from DC to AC (alternating current) — the kind your fans, lights and TV are built to use. Without the inverter, your appliances simply could not plug in.",
    bodyKh: "ប្ដូរ \"រូបរាង\" របស់អគ្គិសនីពី DC ទៅ AC (ចរន្តប្តូរទិស) — ជាប្រភេទដែលកង្ហារ ពន្លឺ និងទូរទស្សន៍របស់អ្នកត្រូវការ។ បើគ្មានឧបករណ៍បំលែងទេ ឧបករណ៍ប្រើប្រាស់នៅផ្ទះមិនអាចដោតប្រើបានទេ។",
    pillEn: "DC → AC",
    pillKh: "DC → AC",
    color: "#10b981",
  },
  battery: {
    en: "The Battery",
    kh: "អាគុយ",
    bodyEn: "Stores extra energy made during the day so the lights stay on after sunset and during cloudy weather. In remote villages, it can also reduce dependence on the public grid.",
    bodyKh: "ស្តុកថាមពលបន្ថែមដែលផលិតបានពេលថ្ងៃ ដើម្បីបំភ្លឺនៅពេលថ្ងៃលិច និងពេលអាកាសធាតុមានពពកច្រើន។ នៅភូមិឆ្ងាយដាច់ស្រយាល វាក៏អាចជួយកាត់បន្ថយការពឹងផ្អែកលើបណ្តាញអគ្គិសនីសាធារណៈផងដែរ។",
    pillEn: "Stores energy for night",
    pillKh: "ស្តុកថាមពលសម្រាប់ពេលយប់",
    color: "#f59e0b",
  },
};

function SolarHome({ lang }: { lang: Lang }) {
  const t = useTranslation();
  const isKh = lang === "kh";
  const [active, setActive] = useState<ComponentId>("panels");
  const c = COMPONENTS[active];

  return (
    <div className="rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-[#02201d] to-[#031a18] p-5 sm:p-7">
      <ToolHeader
        icon={<Home className="w-4 h-4" />}
        en="Solar Home: Tap the Components"
        kh="ផ្ទះប្រើសូឡា — ចុចលើផ្នែកនីមួយៗ"
        lang={lang}
        descEn="A solar home in Cambodia needs three pieces working together. Tap each one to see what it does and how the electricity flows from roof to lightbulb."
        descKh="ផ្ទះប្រើសូឡានៅកម្ពុជា ត្រូវការផ្នែកបីដែលដំណើរការជាមួយគ្នា។ ចុចមួយៗ ដើម្បីមើលថាវាធ្វើអ្វី និងរបៀបដែលអគ្គិសនីហូរពីដំបូលចូលទៅអំពូលភ្លើង។"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] gap-6 items-start">

        {/* SVG: Cambodian house with solar panels */}
        <div className="relative w-full max-w-[560px] mx-auto" data-testid="solar-home-diagram">
          <svg viewBox="0 0 560 380" className="w-full h-auto">
            <defs>
              <linearGradient id="solpwr-skyhome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="solpwr-roof" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width="560" height="380" fill="url(#solpwr-skyhome)" rx="14" />

            {/* Ground */}
            <rect x="0" y="320" width="560" height="60" fill="#14532d" />
            {/* A few palm-tree silhouettes for Cambodian feel */}
            <g opacity="0.55" fill="#052e16">
              <rect x="40" y="240" width="6" height="80" />
              <path d="M 43 240 Q 20 220 8 230 M 43 240 Q 66 220 78 230 M 43 240 Q 30 218 35 200 M 43 240 Q 56 218 51 200" stroke="#052e16" strokeWidth="3" fill="none" />
              <rect x="510" y="245" width="6" height="75" />
              <path d="M 513 245 Q 490 225 478 235 M 513 245 Q 536 225 548 235 M 513 245 Q 500 223 505 205 M 513 245 Q 526 223 521 205" stroke="#052e16" strokeWidth="3" fill="none" />
            </g>

            {/* House body — simple stilted Cambodian-style with raised platform */}
            <g>
              {/* Stilts (typical of rural Khmer house) */}
              <rect x="180" y="270" width="6" height="50" fill="#78350f" />
              <rect x="372" y="270" width="6" height="50" fill="#78350f" />
              {/* Walls */}
              <rect x="170" y="200" width="220" height="120" fill="#fde68a" stroke="#a16207" strokeWidth="1.5" />
              {/* Door */}
              <rect x="260" y="240" width="40" height="80" fill="#7c2d12" />
              <circle cx="293" cy="280" r="2" fill="#fbbf24" />
              {/* Window with internal lightbulb */}
              <rect x="195" y="225" width="50" height="40" fill="#0c4a6e" stroke="#a16207" strokeWidth="1.5" />
              <line x1="220" y1="225" x2="220" y2="265" stroke="#a16207" strokeWidth="1" />
              <line x1="195" y1="245" x2="245" y2="245" stroke="#a16207" strokeWidth="1" />

              {/* Lightbulb glow inside (turns on when active path reaches it) */}
              <g>
                <circle cx="220" cy="245" r="14" fill="#fde047" opacity="0.55" className="solpwr-houselight" />
                <circle cx="220" cy="245" r="6" fill="#fffbeb" />
              </g>

              {/* Pitched roof */}
              <polygon points="160,200 280,130 400,200" fill="url(#solpwr-roof)" stroke="#7f1d1d" strokeWidth="1.5" />
              <polygon points="160,200 280,130 280,200" fill="rgba(0,0,0,0.15)" />

              {/* SOLAR PANELS on roof — clickable */}
              <g
                onClick={() => setActive("panels")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive("panels"); } }}
                tabIndex={0}
                role="button"
                aria-label={isKh ? COMPONENTS.panels.kh : COMPONENTS.panels.en}
                aria-pressed={active === "panels"}
                className="solpwr-svg-button"
                style={{ cursor: "pointer" }}
                data-testid="component-panels"
              >
                {/* Panel sits on right roof slope */}
                <polygon points="290,196 388,196 376,148 282,148" fill="#1e3a8a" stroke={active === "panels" ? "#fff" : "#38bdf8"} strokeWidth={active === "panels" ? 2.5 : 1.5} />
                {/* Cells grid */}
                {[0, 1, 2, 3].map((r) =>
                  [0, 1, 2].map((col) => (
                    <rect
                      key={`${r}-${col}`}
                      x={290 + col * 32 + r * 2}
                      y={150 + r * 12}
                      width="28"
                      height="10"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="0.6"
                      opacity="0.65"
                    />
                  ))
                )}
                {/* Pulsing ring when active */}
                {active === "panels" && (
                  <polygon points="288,198 390,198 378,146 280,146" fill="none" stroke="#facc15" strokeWidth="2" className="solpwr-pulse" />
                )}
                {/* Hotspot label */}
                <circle cx="335" cy="172" r="11"
                  fill={active === "panels" ? "#facc15" : "rgba(0,0,0,0.45)"}
                  stroke="#facc15" strokeWidth="1.5"
                  opacity={active === "panels" ? 1 : 0.5} />
                <text x="335" y="176" textAnchor="middle"
                  fill={active === "panels" ? "#1c1917" : "#facc15"}
                  fontSize="11" fontWeight="700"
                  opacity={active === "panels" ? 1 : 0.65}>1</text>
              </g>

              {/* INVERTER — small grey box on the side wall */}
              <g
                onClick={() => setActive("inverter")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive("inverter"); } }}
                tabIndex={0}
                role="button"
                aria-label={isKh ? COMPONENTS.inverter.kh : COMPONENTS.inverter.en}
                aria-pressed={active === "inverter"}
                className="solpwr-svg-button"
                style={{ cursor: "pointer" }}
                data-testid="component-inverter"
              >
                <rect x="335" y="225" width="46" height="58" rx="3" fill="#475569" stroke={active === "inverter" ? "#fff" : "#10b981"} strokeWidth={active === "inverter" ? 2.5 : 1.5} />
                <rect x="342" y="232" width="32" height="16" fill="#0f172a" />
                <text x="358" y="244" textAnchor="middle" fill="#10b981" fontSize="8" fontFamily="monospace" fontWeight="700">DC→AC</text>
                <circle cx="345" cy="258" r="2" fill="#10b981" />
                <circle cx="358" cy="258" r="2" fill="#facc15" />
                <circle cx="371" cy="258" r="2" fill="#ef4444" />
                <rect x="343" y="266" width="30" height="12" fill="#1e293b" stroke="#0f172a" />
                {active === "inverter" && (
                  <rect x="333" y="223" width="50" height="62" rx="4" fill="none" stroke="#facc15" strokeWidth="2" className="solpwr-pulse" />
                )}
                <circle cx="358" cy="220" r="11"
                  fill={active === "inverter" ? "#facc15" : "rgba(0,0,0,0.45)"}
                  stroke="#facc15" strokeWidth="1.5"
                  opacity={active === "inverter" ? 1 : 0.5} />
                <text x="358" y="224" textAnchor="middle"
                  fill={active === "inverter" ? "#1c1917" : "#facc15"}
                  fontSize="11" fontWeight="700"
                  opacity={active === "inverter" ? 1 : 0.65}>2</text>
              </g>

              {/* BATTERY — under the stilts / on the ground */}
              <g
                onClick={() => setActive("battery")}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive("battery"); } }}
                tabIndex={0}
                role="button"
                aria-label={isKh ? COMPONENTS.battery.kh : COMPONENTS.battery.en}
                aria-pressed={active === "battery"}
                className="solpwr-svg-button"
                style={{ cursor: "pointer" }}
                data-testid="component-battery"
              >
                <rect x="395" y="280" width="50" height="38" rx="4" fill="#1e293b" stroke={active === "battery" ? "#fff" : "#f59e0b"} strokeWidth={active === "battery" ? 2.5 : 1.5} />
                <rect x="402" y="276" width="10" height="6" fill="#f59e0b" />
                <rect x="428" y="276" width="10" height="6" fill="#f59e0b" />
                {/* Charge bars */}
                <rect x="402" y="290" width="38" height="5" fill="#10b981" />
                <rect x="402" y="298" width="28" height="5" fill="#10b981" />
                <rect x="402" y="306" width="18" height="5" fill="#facc15" />
                {active === "battery" && (
                  <rect x="393" y="278" width="54" height="42" rx="5" fill="none" stroke="#facc15" strokeWidth="2" className="solpwr-pulse" />
                )}
                <circle cx="420" cy="335" r="11"
                  fill={active === "battery" ? "#facc15" : "rgba(0,0,0,0.45)"}
                  stroke="#facc15" strokeWidth="1.5"
                  opacity={active === "battery" ? 1 : 0.5} />
                <text x="420" y="339" textAnchor="middle"
                  fill={active === "battery" ? "#1c1917" : "#facc15"}
                  fontSize="11" fontWeight="700"
                  opacity={active === "battery" ? 1 : 0.65}>3</text>
              </g>
            </g>

            {/* Electricity flow path: roof panel → down wall → inverter → into wall → bulb (and a branch to battery) */}
            {/* Main path string used by offset-path */}
            <path
              id="solpwr-flow"
              d="M 335 196 L 335 215 L 358 215 L 358 225 M 358 285 L 358 300 L 300 300 L 240 280 L 222 252"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 3"
              opacity="0.55"
            />
            {/* Branch to battery */}
            <path
              d="M 380 285 L 410 285"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 3"
              opacity="0.55"
            />

            {/* Flowing electron packets along the main path (roof → bulb) */}
            {[0, 0.7, 1.4, 2.1].map((d, i) => (
              <circle
                key={i}
                r="4"
                fill="#22d3ee"
                stroke="#a5f3fc"
                strokeWidth="0.8"
                className="solpwr-flow-electron"
                style={{ animationDelay: `${d}s`, offsetPath: "path('M 335 196 L 335 215 L 358 215 L 358 225 L 358 240 L 358 270 L 358 285 L 358 300 L 300 300 L 240 280 L 222 252')" } as React.CSSProperties}
              />
            ))}
          </svg>
        </div>

        {/* Side panel with active component info */}
        <div className="space-y-3" aria-live="polite">
          {/* Component pill row */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(COMPONENTS) as ComponentId[]).map((id) => {
              const isActive = active === id;
              const meta = COMPONENTS[id];
              return (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  data-testid={`button-component-${id}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                    isActive
                      ? "bg-emerald-500/30 border-emerald-300 text-white"
                      : "bg-white/5 border-white/15 text-white/65 hover:border-emerald-400/40"
                  } ${isKh ? "font-khmer" : ""}`}
                >
                  {isKh ? meta.kh : meta.en}
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
            <div className="text-[10px] uppercase tracking-widest text-emerald-300/80 mb-1">
              {t("Selected Component", "ផ្នែកដែលបានជ្រើស")}
            </div>
            <div className={`text-white font-bold text-lg ${isKh ? "font-khmer" : ""}`}>
              {isKh ? c.kh : c.en}
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono"
              style={{ background: `${c.color}22`, border: `1px solid ${c.color}66`, color: c.color }}>
              <Zap className="w-3 h-3" />
              <span className={isKh ? "font-khmer" : ""}>{isKh ? c.pillKh : c.pillEn}</span>
            </div>
            <p className={`text-white/75 text-sm mt-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? c.bodyKh : c.bodyEn}
            </p>
          </div>

          <div className={`p-3 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-100 text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            <Lightbulb className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
            {t(
              "Watch the green path: sunlight hits the roof panels, the inverter changes its shape, and the lightbulb inside the house turns on. Extra energy is parked in the battery for the night.",
              "សូមមើលបណ្ដោយផ្លូវពណ៌បៃតង៖ ពន្លឺព្រះអាទិត្យប៉ះផ្ទាំងសូឡាលើដំបូល ឧបករណ៍បំលែងប្ដូររូបរាងវា ហើយអំពូលភ្លើងខាងក្នុងផ្ទះភ្លឺឡើង។ ថាមពលបន្ថែមត្រូវស្តុកនៅអាគុយសម្រាប់ពេលយប់។"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Clean Energy Comparison ──────────────────────────────────────────────

function CleanEnergyCompare({ lang }: { lang: Lang }) {
  const t = useTranslation();
  const isKh = lang === "kh";

  // Lifecycle CO2 estimates (g per kWh) — sourced from IPCC AR5 / IPCC AR6 medians.
  const COAL = 820;
  const SOLAR = 41;
  const maxBar = COAL;
  const coalH = (COAL / maxBar) * 220;
  const solarH = (SOLAR / maxBar) * 220;
  const ratio = Math.round(COAL / SOLAR);

  return (
    <div className="rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-[#031a14] to-[#01160e] p-5 sm:p-7">
      <ToolHeader
        icon={<Leaf className="w-4 h-4" />}
        en="Clean Energy: Coal vs. Solar"
        kh="ថាមពលស្អាត — រ៉ែធ្យូងថ្ម ធៀបនឹង សូឡា"
        lang={lang}
        descEn="Every unit of electricity has a hidden cost: how much carbon dioxide (CO₂) is released into the air to make it. Less CO₂ means cleaner air and a more stable climate."
        descKh="អគ្គិសនីនីមួយៗមានតម្លៃលាក់កំបាំងមួយ៖ បរិមាណឧស្ម័ន CO₂ ដែលត្រូវបញ្ចេញចូលអាកាស ដើម្បីផលិតវា។ CO₂ តិចជាង មានន័យថាខ្យល់ស្អាតជាង និងអាកាសធាតុមានស្ថេរភាពជាង។"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] gap-6 items-start">

        {/* Bar chart */}
        <div className="relative w-full max-w-[480px] mx-auto" data-testid="co2-chart">
          <svg viewBox="0 0 480 320" className="w-full h-auto">
            {/* Background grid lines */}
            {[0, 1, 2, 3, 4].map((i) => {
              const y = 50 + i * 50;
              return (
                <g key={i}>
                  <line x1="60" y1={y} x2="460" y2={y} stroke="#ffffff" strokeOpacity="0.07" strokeDasharray="2 4" />
                  <text x="52" y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace">
                    {Math.round(((4 - i) / 4) * maxBar)}
                  </text>
                </g>
              );
            })}

            {/* Y-axis label */}
            <text x="20" y="160" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="monospace" transform="rotate(-90 20 160)">
              {isKh ? "ក្រាម CO₂ / kWh" : "g CO₂ / kWh"}
            </text>

            {/* Coal bar */}
            <g>
              <rect x="120" y={270 - coalH} width="80" height={coalH} fill="url(#solpwr-coalbar)" stroke="#78350f" strokeWidth="1" rx="3" className="solpwr-bar" />
              <defs>
                <linearGradient id="solpwr-coalbar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#57534e" />
                  <stop offset="100%" stopColor="#1c1917" />
                </linearGradient>
                <linearGradient id="solpwr-solarbar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>
              {/* Smoke puffs above coal */}
              <g opacity="0.6">
                <circle cx="148" cy={270 - coalH - 8} r="9" fill="#78716c" className="solpwr-smoke" style={{ animationDelay: "0s" }} />
                <circle cx="172" cy={270 - coalH - 16} r="11" fill="#a8a29e" className="solpwr-smoke" style={{ animationDelay: "0.5s" }} />
                <circle cx="160" cy={270 - coalH - 30} r="14" fill="#d6d3d1" className="solpwr-smoke" style={{ animationDelay: "1.0s" }} />
              </g>
              <text x="160" y={270 - coalH - 50} textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="700">{COAL}g</text>
              <text x="160" y="290" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" className={isKh ? "" : ""}>
                {isKh ? "រ៉ែធ្យូងថ្ម" : "Coal Plant"}
              </text>
            </g>

            {/* Solar bar */}
            <g>
              <rect x="280" y={270 - solarH} width="80" height={solarH} fill="url(#solpwr-solarbar)" stroke="#065f46" strokeWidth="1" rx="3" className="solpwr-bar" style={{ animationDelay: "0.4s" }} />
              {/* tiny leaf above solar bar */}
              <g transform={`translate(310 ${270 - solarH - 26})`}>
                <path d="M 10 20 Q -2 14 0 0 Q 14 -2 20 10 Q 14 22 10 20 Z" fill="#34d399" />
                <path d="M 0 0 L 10 20" stroke="#065f46" strokeWidth="1" />
              </g>
              <text x="320" y={270 - solarH - 8} textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="700">{SOLAR}g</text>
              <text x="320" y="290" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
                {isKh ? "រោងចក្រសូឡា" : "Solar Plant"}
              </text>
            </g>

            {/* Bottom axis line */}
            <line x1="60" y1="270" x2="460" y2="270" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
          </svg>
        </div>

        {/* Side panel */}
        <div className="space-y-3">
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <div className="text-[10px] uppercase tracking-widest text-emerald-300/80 mb-1">
              {t("Headline number", "តួលេខសំខាន់")}
            </div>
            <div className={`text-white text-2xl font-bold leading-tight ${isKh ? "font-khmer" : ""}`}>
              {t(
                `Solar releases about ${ratio}× less CO₂ than coal.`,
                `សូឡាបញ្ចេញ CO₂ តិចជាងរ៉ែធ្យូងថ្មប្រហែល ${ratio} ដង។`
              )}
            </div>
            <p className={`text-white/70 text-xs mt-2 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Per kilowatt-hour of electricity, lifecycle emissions (mining, manufacturing, operation) of coal are roughly 820 g CO₂ vs. solar PV at about 41 g (IPCC).",
                "ក្នុងមួយគីឡូវ៉ាត់-ម៉ោងនៃអគ្គិសនី ការបញ្ចេញឧស្ម័នពេញវដ្តជីវិត (ការជីករ៉ែ ការផលិត ការប្រតិបត្តិ) របស់រ៉ែធ្យូងថ្ម ប្រហែល ៨២០ ក្រាម CO₂ ធៀបនឹងសូឡា PV ប្រហែល ៤១ ក្រាម (IPCC)។"
              )}
            </p>
          </div>

          <div className={`p-3 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-100 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
            {t(
              "Solar power is clean because it doesn't burn anything or release smoke into our air. Cleaner air means healthier lungs, clearer skies over Phnom Penh, and a steadier climate for our farmers.",
              "ថាមពលសូឡាគឺស្អាត ព្រោះវាមិនដុតអ្វី ហើយក៏មិនបញ្ចេញផ្សែងទៅក្នុងខ្យល់របស់យើងដែរ។ ខ្យល់ស្អាតមានន័យថា សួតរឹងមាំជាង មេឃភ្នំពេញច្បាស់ជាង និងអាកាសធាតុមានស្ថេរភាពសម្រាប់កសិករយើង។"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Module wrapper ──────────────────────────────────────────────────────────

export function SolarPowerModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const lang: Lang = language === "kh" ? "kh" : "en";
  const isKh = lang === "kh";

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20" data-testid="section-solar-power">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-emerald-400/15 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
          <CircuitBoard className="w-3.5 h-3.5" />
        </div>
        <span className={`text-xs font-bold tracking-widest text-emerald-300 uppercase ${isKh ? "font-khmer tracking-normal" : ""}`}>
          {t("Solar Power: Harvesting the Sun", "ថាមពលពន្លឺព្រះអាទិត្យ៖ ការប្រមូលផលពីព្រះអាទិត្យ")}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/30 to-transparent" />
      </div>

      <div className="rounded-3xl border border-emerald-400/15 bg-black/30 backdrop-blur-sm p-4 sm:p-5 mb-5 flex items-start gap-3">
        <Info className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
        <p className={`text-white/65 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Cambodia gets some of the strongest sunlight in the world. Every roof is potentially a tiny power plant. Here's how that actually works.",
            "កម្ពុជាទទួលបានពន្លឺព្រះអាទិត្យខ្លាំងជាងគេមួយក្នុងពិភពលោក។ ដំបូលផ្ទះនីមួយៗ អាចក្លាយជារោងចក្រអគ្គិសនីតូចមួយ។ នេះគឺជាវិធីដែលវាដំណើរការ។"
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <PVCellAnimation lang={lang} />
        <SolarHome lang={lang} />
        <CleanEnergyCompare lang={lang} />
      </div>

      {/* Scoped keyframes — all prefixed `solpwr-` so they cannot collide. */}
      <style>{`
        @keyframes solpwr-photon-fall {
          0%   { transform: translate(0, 0); opacity: 0; }
          15%  { opacity: 1; }
          70%  { transform: translate(0, 130px); opacity: 1; }
          100% { transform: translate(0, 130px); opacity: 0; }
        }
        .solpwr-photon {
          animation: solpwr-photon-fall 2s ease-in infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        @keyframes solpwr-electron-flow {
          0%   { offset-distance: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .solpwr-electron {
          animation: solpwr-electron-flow 2.4s linear infinite;
          offset-rotate: 0deg;
        }

        @keyframes solpwr-bulb-pulse {
          0%, 100% { fill: #fde047; filter: drop-shadow(0 0 6px #facc15); }
          50%      { fill: #fffbeb; filter: drop-shadow(0 0 12px #fde047); }
        }
        .solpwr-bulb {
          animation: solpwr-bulb-pulse 1.6s ease-in-out infinite;
        }

        @keyframes solpwr-house-light {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 0.85; }
        }
        .solpwr-houselight {
          animation: solpwr-house-light 2.1s ease-in-out infinite;
        }

        @keyframes solpwr-flow {
          0%   { offset-distance: 0%;   opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .solpwr-flow-electron {
          animation: solpwr-flow 2.8s linear infinite;
          offset-rotate: 0deg;
        }

        @keyframes solpwr-pulse-ring {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        .solpwr-pulse {
          animation: solpwr-pulse-ring 1.6s ease-in-out infinite;
        }

        @keyframes solpwr-bar-rise {
          0%   { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        .solpwr-bar {
          transform-origin: bottom;
          transform-box: fill-box;
          animation: solpwr-bar-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Focus-visible ring for keyboard users on the SVG buttons in
           SolarHome. We disable the default outline (which would be
           rectangular and ugly around an SVG group) and replace it with
           a yellow stroke ring on focus only. */
        .solpwr-svg-button:focus { outline: none; }
        .solpwr-svg-button:focus-visible > :first-child {
          stroke: #facc15;
          stroke-width: 3;
          filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.8));
        }

        @keyframes solpwr-smoke-rise {
          0%   { transform: translate(0, 0) scale(0.6); opacity: 0; }
          25%  { opacity: 0.7; }
          100% { transform: translate(-12px, -34px) scale(1.3); opacity: 0; }
        }
        .solpwr-smoke {
          transform-box: fill-box;
          transform-origin: center;
          animation: solpwr-smoke-rise 2.4s ease-out infinite;
        }
      `}</style>
    </section>
  );
}
