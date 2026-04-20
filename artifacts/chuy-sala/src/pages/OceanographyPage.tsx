import { useState } from "react";
import {
  Waves,
  Fish,
  Droplets,
  Sun,
  Moon,
  Eye,
  Anchor,
  Wind,
  TreePine,
  Sparkles,
  Thermometer,
  ArrowRight,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Oceanography: The Blue Frontier — មហាសមុទ្រវិទ្យា៖ ព្រំដែនពណ៌ខៀវ
//
//  A self-contained page with four interactive tools, modelled on the same
//  pattern as SolarPowerModule / TheSunModule:
//
//   1. Vertical Zones Explorer (Sunlight / Twilight / Midnight)
//   2. The Ocean Conveyor Belt — global currents as Earth's air conditioner
//   3. Marine Biology & Chemistry — phytoplankton oxygen + ocean salinity
//   4. The Cambodian Coast Spotlight — mangroves & coral reefs in the Gulf
//
//  Visual language: deep ocean blue gradient backdrop, slow-moving fish
//  silhouettes, rising bubbles, scoped CSS keyframes prefixed `ocean-*`.
// ════════════════════════════════════════════════════════════════════════════

export default function OceanographyPage() {
  const { language } = useLanguageStore();
  const lang: "en" | "kh" = language === "kh" ? "kh" : "en";
  const isKh = lang === "kh";

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #001428 0%, #002850 30%, #003a6b 60%, #001a35 100%)",
      }}
    >
      {/* Ambient bubbles + drifting fish overlay (page-wide, behind content) */}
      <BubbleField />
      <DriftingFishField />

      <div className="relative z-10">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <header className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,189,248,0.20) 0%, transparent 70%)",
            }}
          />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center relative">
            <div className="inline-flex items-center gap-2 border border-cyan-300/20 bg-cyan-400/8 rounded-full px-5 py-2 mb-6 text-sm font-semibold text-cyan-200/85 backdrop-blur-sm">
              <Waves className="w-4 h-4" />
              {isKh ? "មហាសមុទ្រ និងការរក្សា" : "Oceans & Discovery"}
            </div>

            <h1
              className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight ${
                isKh ? "font-khmer leading-loose" : ""
              }`}
            >
              {isKh ? (
                <>
                  មហាសមុទ្រវិទ្យា៖{" "}
                  <span className="text-cyan-300">ព្រំដែនពណ៌ខៀវ</span>
                </>
              ) : (
                <>
                  Oceanography:{" "}
                  <span className="text-cyan-300">The Blue Frontier</span>
                </>
              )}
            </h1>
            <p
              className={`text-cyan-100/85 max-w-2xl mx-auto leading-relaxed ${
                isKh ? "font-khmer text-base leading-loose" : "text-base"
              }`}
            >
              {isKh
                ? "មហាសមុទ្រគ្របដណ្តប់ ៧១% នៃផ្ទៃផែនដី ផលិតកន្លះនៃខ្យល់អុកស៊ីសែន ហើយនៅតែជាកន្លែងដែលមនុស្សជាតិបានស្វែងយល់តិចបំផុត។ តោះមុជទៅជ្រៅ។"
                : "The ocean covers 71% of Earth's surface, makes half the air we breathe, and is still the least-explored place humans have ever known. Let's dive deeper."}
            </p>
          </div>
        </header>

        {/* ── Tool 1: Vertical Zones Explorer ─────────────────────── */}
        <Section
          icon={<Eye className="w-3.5 h-3.5" />}
          en="The Ocean's Three Zones"
          kh="តំបន់ ៣ នៃមហាសមុទ្រ"
          isKh={isKh}
          descEn="Click each layer of the sea to discover what light, life and pressure look like as you sink deeper. Most of the ocean is dark — sunlight only reaches the top 200 metres."
          descKh="ចុចលើស្រទាប់នីមួយៗនៃសមុទ្រ ដើម្បីស្វែងយល់ពីពន្លឺ ជីវិត និងសម្ពាធ ពេលអ្នកធ្លាក់ចុះកាន់តែជ្រៅ។ ផ្នែកធំនៃមហាសមុទ្រស្ថិតនៅក្នុងភាពងងឹត — ពន្លឺព្រះអាទិត្យឆ្លងបានត្រឹមតែ ២០០ ម៉ែត្រខាងលើប៉ុណ្ណោះ។"
        >
          <VerticalZonesExplorer isKh={isKh} />
        </Section>

        {/* ── Tool 2: Ocean Conveyor Belt ─────────────────────────── */}
        <Section
          icon={<Wind className="w-3.5 h-3.5" />}
          en="The Ocean Conveyor Belt"
          kh="ខ្សែបង្វិលមហាសមុទ្រ"
          isKh={isKh}
          descEn="Warm and cold ocean currents loop around the planet in a giant conveyor belt. They move heat from the tropics to the poles — Earth's natural air conditioner."
          descKh="ចរន្តក្តៅ និងចរន្តត្រជាក់ហូរជារង្វង់ជុំវិញពិភពលោក ដូចជាខ្សែបង្វិលដ៏ធំ។ វាដឹកនាំកម្តៅពីតំបន់អេក្វាទ័រទៅកាន់ប៉ូល — ដូចជាម៉ាស៊ីនត្រជាក់ធម្មជាតិរបស់ផែនដី។"
        >
          <OceanConveyorBelt isKh={isKh} />
        </Section>

        {/* ── Tool 3: Marine Biology & Chemistry ──────────────────── */}
        <Section
          icon={<Droplets className="w-3.5 h-3.5" />}
          en="Marine Biology & Chemistry"
          kh="ជីវវិទ្យា និងគីមីវិទ្យាសមុទ្រ"
          isKh={isKh}
          descEn="The sea is alive with chemistry: tiny invisible plants make half our oxygen, and rocks washed off the land have made the water salty for billions of years."
          descKh="សមុទ្រពោរពេញដោយគីមីវិទ្យា៖ រុក្ខជាតិតូចៗដែលមើលមិនឃើញ ផលិតកន្លះនៃខ្យល់អុកស៊ីសែន ហើយថ្មពីលើគោកដែលលាងហូរចូលសមុទ្រ ធ្វើឱ្យវាមានរសជាតិប្រៃជាច្រើនពាន់លានឆ្នាំមកហើយ។"
        >
          <MarineChemistry isKh={isKh} />
        </Section>

        {/* ── Tool 4: Cambodian Coast Spotlight ───────────────────── */}
        <Section
          icon={<TreePine className="w-3.5 h-3.5" />}
          en="The Cambodian Coast Spotlight"
          kh="ការបញ្ជាក់លើឆ្នេរសមុទ្រកម្ពុជា"
          isKh={isKh}
          descEn="Cambodia has 443 km of coastline along the Gulf of Thailand. Mangrove forests and coral reefs are quietly doing the most important job on that coast — protecting our fish, our beaches, and our families from storms."
          descKh="កម្ពុជាមានឆ្នេរសមុទ្របណ្តោយ ៤៤៣ គីឡូម៉ែត្រនៅឈូងសមុទ្រថៃ។ ព្រៃកោងកាង និងផ្កាថ្មសមុទ្រកំពុងបំពេញការងារសំខាន់បំផុតនៅឆ្នេរនោះ — ការពារត្រី ឆ្នេរ និងគ្រួសាររបស់យើងពីព្យុះ។"
        >
          <CambodianCoastSpotlight isKh={isKh} />
        </Section>

        {/* ── Closing strip ───────────────────────────────────────── */}
        <div className="border-t border-cyan-300/10 bg-cyan-400/5 mt-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
            <Anchor className="w-8 h-8 text-cyan-300/60 mx-auto mb-3" />
            <p
              className={`text-cyan-100/80 text-sm max-w-md mx-auto ${
                isKh ? "font-khmer leading-loose" : ""
              }`}
            >
              {isKh
                ? "មហាសមុទ្រមិនមែនជារូបភាពនៅលើផែនទីនោះទេ — វាជាខ្យល់ដែលយើងដកដង្ហើម អាហាររបស់យើង និងអាកាសធាតុរបស់យើង។"
                : "The ocean is not a picture on a map — it is the air we breathe, the food we eat, and the climate we live in."}
            </p>
          </div>
        </div>
      </div>

      {/* Page-scoped CSS keyframes (all prefixed with `ocean-`) */}
      <style>{`
        @keyframes ocean-bubble-rise {
          0%   { transform: translate(0, 0) scale(0.6); opacity: 0; }
          15%  { opacity: 0.55; }
          90%  { opacity: 0.4; }
          100% { transform: translate(var(--ocean-bubble-x, 8px), -110vh) scale(1); opacity: 0; }
        }
        @keyframes ocean-fish-drift-r {
          0%   { transform: translateX(-15vw); }
          100% { transform: translateX(115vw); }
        }
        @keyframes ocean-fish-drift-l {
          0%   { transform: translateX(115vw) scaleX(-1); }
          100% { transform: translateX(-15vw) scaleX(-1); }
        }
        @keyframes ocean-pulse-soft {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        @keyframes ocean-current-flow {
          0%   { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes ocean-vent-shimmer {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.4; }
          50%      { transform: translateY(-12px) scaleY(1.2); opacity: 0.85; }
        }
        @keyframes ocean-o2-rise {
          0%   { transform: translateY(0); opacity: 0; }
          15%  { opacity: 0.9; }
          100% { transform: translateY(-90px); opacity: 0; }
        }
        @keyframes ocean-mineral-fall {
          0%   { transform: translate(0, -12px); opacity: 0; }
          20%  { opacity: 0.95; }
          100% { transform: translate(var(--ocean-mineral-x, 0), 60px); opacity: 0; }
        }
        @keyframes ocean-wave-shift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }

        .ocean-bubble        { animation: ocean-bubble-rise linear infinite; }
        .ocean-fish-r        { animation: ocean-fish-drift-r linear infinite; }
        .ocean-fish-l        { animation: ocean-fish-drift-l linear infinite; }
        .ocean-pulse         { animation: ocean-pulse-soft 2.4s ease-in-out infinite; }
        .ocean-current-line  { stroke-dasharray: 8 6; animation: ocean-current-flow 1.4s linear infinite; }
        .ocean-vent          { transform-origin: bottom center; animation: ocean-vent-shimmer 2.8s ease-in-out infinite; }
        .ocean-o2            { animation: ocean-o2-rise 3s ease-out infinite; }
        .ocean-mineral       { animation: ocean-mineral-fall 3.5s ease-in infinite; }
        .ocean-wave          { animation: ocean-wave-shift 4s linear infinite; }

        .ocean-svg-button:focus { outline: none; }
        .ocean-svg-button:focus-visible > :first-child {
          stroke: #fde68a;
          stroke-width: 3;
          filter: drop-shadow(0 0 6px rgba(253, 230, 138, 0.85));
        }

        @media (prefers-reduced-motion: reduce) {
          .ocean-bubble, .ocean-fish-r, .ocean-fish-l, .ocean-pulse,
          .ocean-current-line, .ocean-vent, .ocean-o2, .ocean-mineral,
          .ocean-wave { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper (mirrors the pattern used by SolarPowerModule / Sun)
// ════════════════════════════════════════════════════════════════════════════

function Section({
  icon,
  en,
  kh,
  isKh,
  descEn,
  descKh,
  children,
}: {
  icon: React.ReactNode;
  en: string;
  kh: string;
  isKh: boolean;
  descEn: string;
  descKh: string;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-lg bg-cyan-400/15 border border-cyan-400/25 flex items-center justify-center text-cyan-300">
          {icon}
        </div>
        <span
          className={`text-xs font-bold tracking-widest text-cyan-300 uppercase ${
            isKh ? "font-khmer tracking-normal" : ""
          }`}
        >
          {isKh ? kh : en}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/25 to-transparent" />
      </div>
      <p
        className={`text-cyan-100/85 text-sm mb-5 max-w-3xl ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? descKh : descEn}
      </p>
      <div className="rounded-3xl overflow-hidden border border-cyan-300/15 bg-gradient-to-b from-[#002a55]/70 to-[#001a38]/70 backdrop-blur-sm">
        {children}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 1: Vertical Zones Explorer
// ════════════════════════════════════════════════════════════════════════════

type ZoneId = "sunlight" | "twilight" | "midnight";

const ZONES: Record<
  ZoneId,
  {
    en: string;
    kh: string;
    rangeEn: string;
    rangeKh: string;
    bodyEn: string;
    bodyKh: string;
    pillEn: string;
    pillKh: string;
    color: string;
  }
> = {
  sunlight: {
    en: "Sunlight Zone",
    kh: "ផ្ទៃខាងលើ (តំបន់ពន្លឺ)",
    rangeEn: "0 – 200 m",
    rangeKh: "០ – ២០០ ម៉ែត្រ",
    bodyEn:
      "The top layer where sunlight still reaches. Almost all the plants, most of the fish you've seen pictures of, dolphins, whales and coral reefs live here. This thin layer makes nearly all the food the rest of the ocean depends on.",
    bodyKh:
      "ស្រទាប់ខាងលើដែលពន្លឺព្រះអាទិត្យនៅតែឆ្លងមកដល់។ ស្ទើរតែគ្រប់រុក្ខជាតិទាំងអស់ ត្រីភាគច្រើនដែលអ្នកធ្លាប់ឃើញរូបភាព ដូហ្វីន ត្រីបាឡែន និងផ្កាថ្មសមុទ្រ រស់នៅទីនេះ។ ស្រទាប់ស្តើងនេះផលិតស្ទើរតែគ្រប់ចំណីអាហារដែលផ្នែកដទៃនៃមហាសមុទ្រពឹងផ្អែកលើ។",
    pillEn: "Bright • Warm • Full of life",
    pillKh: "ភ្លឺ • ក្តៅ • ពេញដោយជីវិត",
    color: "#38bdf8",
  },
  twilight: {
    en: "Twilight Zone",
    kh: "តំបន់ស្រមោល",
    rangeEn: "200 – 1,000 m",
    rangeKh: "២០០ – ១,០០០ ម៉ែត្រ",
    bodyEn:
      "Light fades into a dim blue-grey here, too dark for plants to grow. Strange creatures live in this twilight: jellyfish that glow on their own (bioluminescence), giant squid, and the hatchet fish with huge upward-pointing eyes that watch for shadows above.",
    bodyKh:
      "ពន្លឺនៅទីនេះប្តូរទៅជាពណ៌ខៀវប្រផេះស្រអាប់ ងងឹតពេកសម្រាប់រុក្ខជាតិដុះ។ សត្វចម្លែកៗរស់នៅក្នុងតំបន់ស្រមោលនេះ៖ សត្វកញ្ឆែ (Jellyfish) ដែលបញ្ចេញពន្លឺដោយខ្លួនឯង (Bioluminescence) ត្រីមឹកយក្ស និងត្រី Hatchet ដែលមានភ្នែកធំៗងើបឡើងលើ ចាំសម្គាល់ស្រមោលពីខាងលើ។",
    pillEn: "Dim light • Cold • Glowing creatures",
    pillKh: "ពន្លឺស្រអាប់ • ត្រជាក់ • សត្វបញ្ចេញពន្លឺ",
    color: "#1d4ed8",
  },
  midnight: {
    en: "Midnight Zone",
    kh: "តំបន់ងងឹតសូន្យឈឹង",
    rangeEn: "1,000 m +",
    rangeKh: "១,០០០ ម៉ែត្រ ឡើងទៅ",
    bodyEn:
      "Total darkness, near-freezing temperatures, and crushing pressure (over 100 times the air pressure at the surface). And yet — life exists. Around hydrothermal vents on the seafloor, super-hot mineral-rich water bursts out, feeding entire communities of giant tube worms, blind crabs, and bacteria that live without sunlight.",
    bodyKh:
      "ភាពងងឹតសូន្យឈឹងទាំងស្រុង សីតុណ្ហភាពជិតកក និងសម្ពាធដ៏ខ្លាំង (ច្រើនជាង ១០០ ដងនៃសម្ពាធខ្យល់នៅផ្ទៃខាងលើ)។ ប៉ុន្តែ — ជីវិតនៅតែមាន។ នៅជុំវិញទ្វារកំដៅ Hydrothermal Vents លើបាតសមុទ្រ ទឹកក្តៅខ្លាំងពេញដោយរ៉ែផ្ទុះចេញ ផ្តល់ចំណីដល់សហគមន៍ទាំងមូលនៃដង្កូវបំពង់យក្ស ក្តាមភ្នែកពិការ និងបាក់តេរីដែលរស់ដោយគ្មានពន្លឺព្រះអាទិត្យ។",
    pillEn: "No light • Crushing pressure • Vent life",
    pillKh: "គ្មានពន្លឺ • សម្ពាធខ្លាំង • ជីវិតនៅទ្វារកំដៅ",
    color: "#0c1e3f",
  },
};

function VerticalZonesExplorer({ isKh }: { isKh: boolean }) {
  const [active, setActive] = useState<ZoneId>("sunlight");
  const z = ZONES[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] gap-0">
      {/* Cross-section SVG */}
      <div className="relative bg-gradient-to-b from-[#79c8ff] via-[#0a3a78] to-[#02060f] p-4">
        <svg viewBox="0 0 320 460" className="w-full h-auto" role="img"
          aria-label={isKh ? "ផ្ទាំងបំបែកមហាសមុទ្របញ្ឈរ" : "Vertical ocean cross-section"}>

          {/* Sky strip */}
          <rect x="0" y="0" width="320" height="36" fill="#cfeaff" />
          <circle cx="270" cy="18" r="11" fill="#fde68a" />

          {/* Wave surface */}
          <path d="M 0 36 Q 20 30 40 36 T 80 36 T 120 36 T 160 36 T 200 36 T 240 36 T 280 36 T 320 36 L 320 40 L 0 40 Z"
            fill="#67c0f8" />

          {/* SUNLIGHT ZONE 0–200m  (y 40 → 180) */}
          <g
            onClick={() => setActive("sunlight")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive("sunlight");
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={isKh ? ZONES.sunlight.kh : ZONES.sunlight.en}
            aria-pressed={active === "sunlight"}
            className="ocean-svg-button"
            style={{ cursor: "pointer" }}
            data-testid="zone-sunlight"
          >
            <rect x="0" y="40" width="320" height="140"
              fill="url(#ocean-grad-sun)"
              stroke={active === "sunlight" ? "#fde047" : "transparent"}
              strokeWidth="3" />
            {/* Light rays from above */}
            {[60, 120, 180, 240].map((x) => (
              <polygon key={x}
                points={`${x - 8},40 ${x + 8},40 ${x + 24},180 ${x - 24},180`}
                fill="rgba(255,240,180,0.10)" />
            ))}
            {/* Friendly fish */}
            <FishGlyph x={40} y={90} fill="#fbbf24" size={12} />
            <FishGlyph x={210} y={130} fill="#f97316" size={10} flip />
            <FishGlyph x={140} y={155} fill="#fef3c7" size={9} />
            {/* Coral nub */}
            <path d="M 250 175 Q 252 165 256 168 Q 260 158 264 168 Q 268 162 272 175 Z" fill="#fb7185" />
            <text x="10" y="60" fill="#0c4a6e" fontSize="11" fontWeight="700">
              {isKh ? "ផ្ទៃខាងលើ" : "Sunlight Zone"}
            </text>
            <text x="10" y="74" fill="#0c4a6e" fontSize="9" fontFamily="monospace">
              0 – 200 m
            </text>
          </g>

          {/* TWILIGHT ZONE 200–1000m  (y 180 → 320) */}
          <g
            onClick={() => setActive("twilight")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive("twilight");
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={isKh ? ZONES.twilight.kh : ZONES.twilight.en}
            aria-pressed={active === "twilight"}
            className="ocean-svg-button"
            style={{ cursor: "pointer" }}
            data-testid="zone-twilight"
          >
            <rect x="0" y="180" width="320" height="140"
              fill="url(#ocean-grad-twi)"
              stroke={active === "twilight" ? "#fde047" : "transparent"}
              strokeWidth="3" />
            {/* Glowing jellyfish */}
            <g className="ocean-pulse">
              <ellipse cx="80" cy="220" rx="14" ry="9" fill="rgba(192,132,252,0.85)" />
              <line x1="72" y1="226" x2="70" y2="246" stroke="rgba(192,132,252,0.7)" strokeWidth="1.5" />
              <line x1="80" y1="228" x2="80" y2="250" stroke="rgba(192,132,252,0.7)" strokeWidth="1.5" />
              <line x1="88" y1="226" x2="90" y2="246" stroke="rgba(192,132,252,0.7)" strokeWidth="1.5" />
            </g>
            {/* Hatchet fish — big-eyed deep fish */}
            <g>
              <ellipse cx="220" cy="270" rx="14" ry="9" fill="#475569" />
              <circle cx="216" cy="266" r="3.5" fill="#facc15" />
              <circle cx="216" cy="266" r="1.6" fill="#1c1917" />
              <polygon points="234,270 244,265 244,275" fill="#475569" />
            </g>
            {/* Glow specks */}
            {[140, 165, 190, 110, 60].map((x, i) => (
              <circle key={i} cx={x} cy={250 + (i % 3) * 18} r="1.6"
                fill="#a5f3fc" className="ocean-pulse"
                style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
            <text x="10" y="200" fill="#e0e7ff" fontSize="11" fontWeight="700">
              {isKh ? "តំបន់ស្រមោល" : "Twilight Zone"}
            </text>
            <text x="10" y="214" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
              200 – 1,000 m
            </text>
          </g>

          {/* MIDNIGHT ZONE 1000m+  (y 320 → 460) */}
          <g
            onClick={() => setActive("midnight")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive("midnight");
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={isKh ? ZONES.midnight.kh : ZONES.midnight.en}
            aria-pressed={active === "midnight"}
            className="ocean-svg-button"
            style={{ cursor: "pointer" }}
            data-testid="zone-midnight"
          >
            <rect x="0" y="320" width="320" height="140"
              fill="url(#ocean-grad-mid)"
              stroke={active === "midnight" ? "#fde047" : "transparent"}
              strokeWidth="3" />
            {/* Seafloor */}
            <path d="M 0 440 L 60 430 L 120 438 L 180 425 L 240 435 L 320 430 L 320 460 L 0 460 Z"
              fill="#1c1917" />
            {/* Hydrothermal vent — dark chimney with shimmering hot plume */}
            <polygon points="148,440 156,440 158,420 146,420" fill="#0c0a09" stroke="#44403c" />
            <g className="ocean-vent">
              <ellipse cx="152" cy="408" rx="6" ry="14" fill="rgba(251,113,133,0.45)" />
              <ellipse cx="152" cy="396" rx="4" ry="10" fill="rgba(248,113,113,0.55)" />
              <ellipse cx="152" cy="386" rx="3" ry="7" fill="rgba(254,215,170,0.45)" />
            </g>
            {/* Tube worms beside the vent */}
            {[130, 138, 168, 175].map((x, i) => (
              <g key={i}>
                <rect x={x} y={425} width="3" height="14" fill="#fafaf9" />
                <circle cx={x + 1.5} cy={424} r="2.2" fill="#dc2626" />
              </g>
            ))}
            {/* Anglerfish silhouette */}
            <g>
              <ellipse cx="240" cy="370" rx="14" ry="8" fill="#0a0a0a" />
              <polygon points="254,370 262,365 262,375" fill="#0a0a0a" />
              <line x1="232" y1="362" x2="226" y2="350" stroke="#fafaf9" strokeWidth="0.8" />
              <circle cx="226" cy="350" r="2" fill="#fde047" className="ocean-pulse" />
            </g>
            <text x="10" y="340" fill="#e0e7ff" fontSize="11" fontWeight="700">
              {isKh ? "តំបន់ងងឹត" : "Midnight Zone"}
            </text>
            <text x="10" y="354" fill="#94a3b8" fontSize="9" fontFamily="monospace">
              1,000 m +
            </text>
          </g>

          {/* Active highlight */}
          {active === "sunlight" && (
            <rect x="2" y="42" width="316" height="136" fill="none" stroke="#fde047" strokeWidth="2" />
          )}
          {active === "twilight" && (
            <rect x="2" y="182" width="316" height="136" fill="none" stroke="#fde047" strokeWidth="2" />
          )}
          {active === "midnight" && (
            <rect x="2" y="322" width="316" height="136" fill="none" stroke="#fde047" strokeWidth="2" />
          )}

          <defs>
            <linearGradient id="ocean-grad-sun" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#7dd3fc" />
              <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="ocean-grad-twi" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#1e3a8a" />
              <stop offset="1" stopColor="#0b1d4a" />
            </linearGradient>
            <linearGradient id="ocean-grad-mid" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#0b1326" />
              <stop offset="1" stopColor="#020409" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Side info panel (aria-live) */}
      <div className="p-6 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-cyan-300/15 bg-[#001428]/40">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(ZONES) as ZoneId[]).map((id) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              aria-pressed={active === id}
              className={`text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors ${
                active === id
                  ? "bg-cyan-300/20 border-cyan-300/50 text-cyan-100"
                  : "bg-white/5 border-white/10 text-cyan-100/60 hover:bg-white/10"
              } ${isKh ? "font-khmer" : ""}`}
              data-testid={`zone-pill-${id}`}
            >
              {isKh ? ZONES[id].kh : ZONES[id].en}
            </button>
          ))}
        </div>

        <div
          aria-live="polite"
          className="rounded-2xl border border-cyan-300/15 bg-[#001a35]/60 p-4"
        >
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {active === "sunlight" && <Sun className="w-4 h-4 text-yellow-300" />}
            {active === "twilight" && <Eye className="w-4 h-4 text-indigo-300" />}
            {active === "midnight" && <Moon className="w-4 h-4 text-slate-300" />}
            <h4 className={`font-display font-bold text-white text-base ${isKh ? "font-khmer" : ""}`}>
              {isKh ? z.kh : z.en}
            </h4>
            <span
              className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{ background: `${z.color}33`, color: z.color, border: `1px solid ${z.color}66` }}
            >
              {isKh ? z.rangeKh : z.rangeEn}
            </span>
          </div>
          <p
            className={`text-cyan-100/75 text-sm ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh ? z.bodyKh : z.bodyEn}
          </p>
          <div className={`mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full px-2.5 py-1 bg-cyan-400/10 border border-cyan-300/20 text-cyan-200 ${isKh ? "font-khmer" : ""}`}>
            <Sparkles className="w-3 h-3" />
            {isKh ? z.pillKh : z.pillEn}
          </div>
        </div>

        <div className={`text-[11px] text-cyan-100/45 ${isKh ? "font-khmer leading-loose" : ""}`}>
          {isKh
            ? "ចំណាំ៖ ចំណុចជ្រៅបំផុតដែលគេបានវាស់នៅចន្លោះ Mariana Trench គឺប្រហែល ១១,០០០ ម៉ែត្រ — ជ្រៅជាងភ្នំ Everest ខ្ពស់!"
            : "Note: The deepest known point of the ocean (the Mariana Trench) is about 11,000 m — deeper than Mount Everest is tall!"}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 2: Ocean Conveyor Belt
// ════════════════════════════════════════════════════════════════════════════

function OceanConveyorBelt({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] gap-0">
      <div className="bg-gradient-to-b from-[#021a3a] to-[#001028] p-4">
        <svg viewBox="0 0 520 280" className="w-full h-auto" role="img"
          aria-label={isKh ? "ផែនទីពិភពលោកបង្ហាញចរន្តមហាសមុទ្រ" : "World map showing ocean currents"}>
          {/* Ocean background with subtle hatching */}
          <rect x="0" y="0" width="520" height="280" fill="#021a3a" />

          {/* Equator + tropics dashed lines */}
          <line x1="0" y1="140" x2="520" y2="140" stroke="#fde047" strokeWidth="0.6"
            strokeDasharray="3 4" opacity="0.5" />
          <text x="6" y="136" fill="#fde047" fontSize="8" opacity="0.7">
            {isKh ? "អេក្វាទ័រ" : "Equator"}
          </text>

          {/* Continents — chunky, friendly silhouettes (not survey-accurate) */}
          {/* North America */}
          <path d="M 30 50 L 100 45 L 130 70 L 140 110 L 110 135 L 70 130 L 45 100 Z" fill="#3a4d2a" />
          {/* South America */}
          <path d="M 110 145 L 145 145 L 150 175 L 140 220 L 120 240 L 110 215 L 105 180 Z" fill="#3a4d2a" />
          {/* Europe */}
          <path d="M 230 60 L 270 55 L 290 80 L 270 100 L 240 95 Z" fill="#3a4d2a" />
          {/* Africa */}
          <path d="M 240 105 L 290 105 L 305 145 L 290 195 L 265 215 L 250 195 L 245 150 Z" fill="#3a4d2a" />
          {/* Asia */}
          <path d="M 290 50 L 420 50 L 450 100 L 420 130 L 360 125 L 320 110 L 295 85 Z" fill="#3a4d2a" />
          {/* Cambodia/SE Asia hint */}
          <circle cx="395" cy="135" r="3" fill="#fbbf24" />
          <text x="402" y="138" fill="#fbbf24" fontSize="7" fontWeight="700">
            {isKh ? "កម្ពុជា" : "Cambodia"}
          </text>
          {/* Australia */}
          <path d="M 410 175 L 460 175 L 470 205 L 440 215 L 415 200 Z" fill="#3a4d2a" />
          {/* Antarctica strip */}
          <path d="M 0 260 L 520 260 L 520 280 L 0 280 Z" fill="#e2e8f0" opacity="0.7" />
          <text x="240" y="275" fill="#0f172a" fontSize="8" fontWeight="700">
            {isKh ? "អង់តាក់ទិក" : "Antarctica"}
          </text>

          {/* WARM CURRENT (red-orange) — equator → poles */}
          <g>
            <path id="ocean-warm-1"
              d="M 200 145 Q 230 135 260 130 Q 320 115 380 90 Q 430 75 470 60"
              fill="none" stroke="#fb7185" strokeWidth="3"
              className="ocean-current-line" />
            <path id="ocean-warm-2"
              d="M 200 145 Q 175 160 165 175 Q 150 195 130 220 Q 110 240 90 250"
              fill="none" stroke="#fb7185" strokeWidth="3"
              className="ocean-current-line" />
            {/* Arrow heads */}
            <polygon points="470,60 462,57 464,65" fill="#fb7185" />
            <polygon points="90,250 96,243 100,251" fill="#fb7185" />
          </g>

          {/* COLD CURRENT (blue) — poles → equator */}
          <g>
            <path d="M 470 60 Q 480 100 470 140 Q 460 180 440 215"
              fill="none" stroke="#38bdf8" strokeWidth="3"
              className="ocean-current-line" style={{ animationDelay: "0.7s" }} />
            <path d="M 90 250 Q 60 230 50 200 Q 40 170 50 140 Q 60 110 90 90"
              fill="none" stroke="#38bdf8" strokeWidth="3"
              className="ocean-current-line" style={{ animationDelay: "0.7s" }} />
            <polygon points="440,215 446,209 449,217" fill="#38bdf8" />
            <polygon points="90,90 96,93 92,99" fill="#38bdf8" />
          </g>

          {/* Sun over equator */}
          <circle cx="200" cy="145" r="9" fill="#fde047" />
          <text x="200" y="149" textAnchor="middle" fill="#92400e" fontSize="8" fontWeight="700">
            {isKh ? "ក្តៅ" : "HOT"}
          </text>

          {/* Pole snowflakes */}
          <text x="465" y="48" fill="#e0f2fe" fontSize="14">❄</text>
          <text x="85" y="262" fill="#e0f2fe" fontSize="14">❄</text>

          {/* Legend box */}
          <g transform="translate(340 230)">
            <rect width="170" height="42" rx="6" fill="rgba(0,0,0,0.55)" stroke="#0ea5e9" />
            <line x1="10" y1="14" x2="34" y2="14" stroke="#fb7185" strokeWidth="3" />
            <text x="40" y="17" fill="#fecdd3" fontSize="9">
              {isKh ? "ចរន្តក្តៅ (សមុទ្រលើ)" : "Warm current (surface)"}
            </text>
            <line x1="10" y1="30" x2="34" y2="30" stroke="#38bdf8" strokeWidth="3" />
            <text x="40" y="33" fill="#bae6fd" fontSize="9">
              {isKh ? "ចរន្តត្រជាក់ (បាតសមុទ្រ)" : "Cold current (deep)"}
            </text>
          </g>
        </svg>
      </div>

      {/* Side panel */}
      <div className="p-6 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-cyan-300/15 bg-[#001428]/40">
        <div className="rounded-2xl border border-rose-300/20 bg-rose-400/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-4 h-4 text-rose-300" />
            <h4 className={`font-display font-bold text-white text-base ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ម៉ាស៊ីនត្រជាក់ផែនដី" : "Earth's Air Conditioner"}
            </h4>
          </div>
          <p
            className={`text-cyan-100/80 text-sm ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "ព្រះអាទិត្យកំដៅសមុទ្រនៅអេក្វាទ័រខ្លាំងជាងនៅប៉ូល។ ទឹកក្តៅហូរនៅផ្ទៃខាងលើទៅប៉ូលជាចរន្ត — ពេលវាមកដល់ វាបញ្ចេញកម្តៅចូលក្នុងខ្យល់ បន្ទាប់មកធ្លាក់ចុះ ត្រជាក់ ហើយវិលត្រឡប់មកអេក្វាទ័រវិញតាមបាតសមុទ្រ។ វដ្តនេះត្រូវបានគេហៅថា Thermohaline Circulation។"
              : "The Sun heats the equator more strongly than the poles. Warm surface water flows toward the poles, releases its heat into the air, then sinks, cools, and returns to the equator along the deep seafloor. This loop is called the thermohaline circulation."}
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-300/15 bg-[#001a35]/60 p-4">
          <h5 className={`font-display font-bold text-cyan-200 text-sm mb-2 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ហេតុអ្វីបានជាសំខាន់សម្រាប់កម្ពុជា?" : "Why does this matter for Cambodia?"}
          </h5>
          <p
            className={`text-cyan-100/70 text-sm ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "ចរន្តសមុទ្រនិងខ្យល់ដែលវាជួយបង្កើត គឺជាអ្វីដែលបញ្ចូនរដូវភ្លៀងមកកម្ពុជាជារៀងរាល់ឆ្នាំ។ បើខ្សែបង្វិលនេះប្តូរ ទម្រង់ភ្លៀង និងការដាំស្រូវរបស់យើងក៏ប្តូរដែរ។"
              : "The currents — and the winds they help drive — are what bring Cambodia its monsoon rains every year. If this great loop shifts, our rainfall and our rice harvest shift with it."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 3: Marine Biology & Chemistry
// ════════════════════════════════════════════════════════════════════════════

function MarineChemistry({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      {/* PHYTOPLANKTON / OXYGEN */}
      <div className="p-6 border-b md:border-b-0 md:border-r border-cyan-300/15">
        <div className="flex items-center gap-2 mb-3">
          <Droplets className="w-4 h-4 text-emerald-300" />
          <h4 className={`font-display font-bold text-white text-base ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ផតូស័ងថែស (Photosynthesis)" : "Photosynthesis"}
          </h4>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden mb-4 bg-gradient-to-b from-[#0a3a78] to-[#001a35] aspect-[16/10]">
          <svg viewBox="0 0 320 200" className="w-full h-full">
            {/* Sun rays */}
            <circle cx="40" cy="30" r="14" fill="#fde047" />
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="40" y1="30" x2={70 + i * 25} y2={70 + i * 30}
                stroke="#fde047" strokeWidth="0.7" opacity="0.5" />
            ))}

            {/* Phytoplankton — small green diatom-like blobs */}
            {[
              { x: 80, y: 110, r: 7 },
              { x: 130, y: 130, r: 9 },
              { x: 180, y: 100, r: 6 },
              { x: 220, y: 125, r: 8 },
              { x: 260, y: 145, r: 7 },
              { x: 100, y: 155, r: 6 },
            ].map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={p.r} fill="#10b981" />
                <circle cx={p.x - p.r / 2} cy={p.y - p.r / 2} r={p.r / 3}
                  fill="#34d399" opacity="0.8" />
              </g>
            ))}

            {/* O2 bubbles rising from each plankton */}
            {[80, 130, 180, 220, 260, 100].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={108} r="3" fill="rgba(186,230,253,0.85)"
                  stroke="#7dd3fc" strokeWidth="0.6"
                  className="ocean-o2"
                  style={{ animationDelay: `${i * 0.5}s` }} />
                <text x={x} y={111} textAnchor="middle" fill="#0c4a6e"
                  fontSize="4.5" fontWeight="700"
                  className="ocean-o2"
                  style={{ animationDelay: `${i * 0.5}s` }}>
                  O₂
                </text>
              </g>
            ))}

            {/* Caption */}
            <rect x="10" y="170" width="300" height="22" rx="4" fill="rgba(0,0,0,0.55)" />
            <text x="160" y="185" textAnchor="middle" fill="#a7f3d0" fontSize="9">
              {isKh
                ? "Phytoplankton + ពន្លឺ + CO₂ → ខ្យល់អុកស៊ីសែន + ស្ករ"
                : "Phytoplankton + light + CO₂ → oxygen + sugar"}
            </text>
          </svg>
        </div>

        <p
          className={`text-cyan-100/75 text-sm mb-3 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "រុក្ខជាតិតូចៗដែលមើលមិនឃើញដោយភ្នែកទទេ ហៅថា Phytoplankton អណ្តែតនៅស្រទាប់ពន្លឺនៃមហាសមុទ្រ។ វាប្រើពន្លឺព្រះអាទិត្យដើម្បីកែឧស្ម័ន CO₂ ទៅជាខ្យល់អុកស៊ីសែន ដូចគ្នានឹងដើមឈើ។"
            : "Tiny plant-like organisms called phytoplankton, far too small to see, drift in the sunlight zone of the ocean. They use sunlight to turn CO₂ into oxygen — exactly like trees do."}
        </p>

        <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/30 p-3 flex items-start gap-3">
          <div className="text-3xl font-bold text-emerald-300 leading-none">50%</div>
          <p
            className={`text-emerald-100/85 text-xs ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "នៃខ្យល់អុកស៊ីសែនរបស់ពិភពលោកមកពី Phytoplankton ក្នុងមហាសមុទ្រ។ មានន័យថា ពាក់កណ្តាលនៃដង្ហើមនីមួយៗដែលអ្នកដក គឺមកពីសមុទ្រ មិនមែនពីព្រៃនោះទេ។"
              : "of the world's oxygen comes from ocean phytoplankton. About half of every breath you take comes from the sea — not from forests."}
          </p>
        </div>
      </div>

      {/* SALINITY */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h4 className={`font-display font-bold text-white text-base ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ហេតុអ្វីបានជាសមុទ្រមានរសជាតិប្រៃ?" : "Why is the Sea Salty?"}
          </h4>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden mb-4 bg-gradient-to-b from-[#1e293b] via-[#0a3a78] to-[#001a35] aspect-[16/10]">
          <svg viewBox="0 0 320 200" className="w-full h-full">
            {/* Mountain on the left with rocks */}
            <polygon points="0,200 0,90 40,50 90,90 110,140 110,200" fill="#44403c" />
            <polygon points="40,50 60,30 90,90" fill="#78716c" />
            {/* Rocks */}
            {[
              { x: 30, y: 130, r: 5 },
              { x: 60, y: 150, r: 6 },
              { x: 85, y: 130, r: 4 },
            ].map((r, i) => (
              <circle key={i} cx={r.x} cy={r.y} r={r.r} fill="#a8a29e" />
            ))}

            {/* River cutting down to the sea */}
            <path d="M 70 90 Q 95 130 115 175 L 130 175 Q 110 130 90 90 Z" fill="#38bdf8" />

            {/* Sea on the right */}
            <rect x="115" y="140" width="205" height="60" fill="#0c4a6e" />
            <path d="M 115 140 Q 140 134 165 140 T 215 140 T 265 140 T 320 140 L 320 145 L 115 145 Z"
              fill="#0ea5e9" />

            {/* Falling minerals (Na+, Cl-) carried by river to sea */}
            {[
              { x: 100, label: "Na⁺", color: "#fde047", delay: 0 },
              { x: 110, label: "Cl⁻", color: "#a7f3d0", delay: 0.5 },
              { x: 120, label: "Na⁺", color: "#fde047", delay: 1 },
              { x: 105, label: "Mg²⁺", color: "#fb7185", delay: 1.5 },
              { x: 115, label: "Cl⁻", color: "#a7f3d0", delay: 2 },
            ].map((m, i) => (
              <g key={i} className="ocean-mineral"
                style={{ animationDelay: `${m.delay}s`, ["--ocean-mineral-x" as string]: `${(i - 2) * 4}px` }}>
                <circle cx={m.x} cy={120} r="6" fill={m.color} opacity="0.9" />
                <text x={m.x} y={123} textAnchor="middle" fill="#1c1917" fontSize="5.5" fontWeight="700">
                  {m.label}
                </text>
              </g>
            ))}

            {/* Sea label */}
            <text x="220" y="175" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="700">
              {isKh ? "សមុទ្រ" : "The Sea"}
            </text>

            {/* Salt crystals scattered on seafloor */}
            {[160, 200, 240, 280].map((x, i) => (
              <rect key={i} x={x - 2} y="192" width="4" height="3" fill="#fef9c3" />
            ))}

            {/* Mountain label */}
            <text x="40" y="80" fill="#e7e5e4" fontSize="9" fontWeight="700">
              {isKh ? "ភ្នំ" : "Mountain"}
            </text>
            <text x="100" y="105" fill="#bae6fd" fontSize="8">
              {isKh ? "ទន្លេ" : "River"}
            </text>
          </svg>
        </div>

        <p
          className={`text-cyan-100/75 text-sm mb-3 ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ភ្លៀងធ្លាក់លើភ្នំ លាងរ៉ែតូចៗ (សូដ្យូម ក្លរ ម៉ាញេស្យូម) ចេញពីថ្ម។ ទន្លេបង្ហូរវាទៅសមុទ្រ។ ទឹកសមុទ្ររំហួតឡើងជាពពក ប៉ុន្តែអំបិលមិនរំហួតទេ — វាស្ថិតនៅកន្លែង។ ច្រើនពាន់លានឆ្នាំក្រោយមក សមុទ្រឥឡូវមានអំបិលប្រហែល ៣៥ ក្រាមក្នុងទឹកមួយលីត្រ។"
            : "Rain falls on mountains and washes tiny minerals — sodium, chloride, magnesium — out of the rocks. Rivers carry them to the sea. Sea water evaporates back into clouds, but salt does not — it stays behind. Over billions of years, this has built up to about 35 grams of salt per litre of seawater."}
        </p>

        <div className="rounded-xl bg-amber-500/10 border border-amber-400/30 p-3">
          <p
            className={`text-amber-100/85 text-xs ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "💡 រាល់ទន្លេនៅលើផែនដី — រួមទាំងអាងទន្លេមេគង្គ — កំពុងបង្ហូរ​រ៉ែតិចតួចទៅសមុទ្រ​នៅ​ពេល​បច្ចុប្បន្ន។ ឱ្យ ៥០០ លានឆ្នាំទៀត សមុទ្រនឹងកាន់តែប្រៃជាងនេះបន្តិច។ វាគឺជាដំណើរការដ៏យឺត។"
              : "💡 Every river on Earth — including the Mekong basin — is carrying small amounts of dissolved minerals into the sea right now. Given another 500 million years of this, the ocean will be a touch saltier still. It is a slow, patient process."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 4: Cambodian Coast Spotlight
// ════════════════════════════════════════════════════════════════════════════

function CambodianCoastSpotlight({ isKh }: { isKh: boolean }) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* MANGROVES */}
        <div className="rounded-2xl border border-emerald-400/25 bg-gradient-to-b from-[#022c22]/80 to-[#001a14]/80 overflow-hidden">
          <div className="aspect-[16/10] bg-gradient-to-b from-[#7dd3fc] via-[#0c4a6e] to-[#022c22] relative">
            <svg viewBox="0 0 320 200" className="w-full h-full">
              {/* Sky */}
              <rect x="0" y="0" width="320" height="60" fill="url(#ocean-mg-sky)" />
              <circle cx="270" cy="22" r="12" fill="#fde047" />
              {/* Water surface */}
              <rect x="0" y="60" width="320" height="80" fill="#0ea5e9" opacity="0.7" />
              {/* Mangrove tree #1 */}
              <g>
                {/* Foliage */}
                <circle cx="70" cy="45" r="22" fill="#15803d" />
                <circle cx="55" cy="55" r="18" fill="#16a34a" />
                <circle cx="85" cy="55" r="20" fill="#22c55e" />
                {/* Trunk */}
                <rect x="66" y="60" width="6" height="40" fill="#78350f" />
                {/* Aerial roots — the iconic stilts */}
                <line x1="69" y1="100" x2="55" y2="150" stroke="#78350f" strokeWidth="3" />
                <line x1="69" y1="100" x2="65" y2="150" stroke="#78350f" strokeWidth="3" />
                <line x1="69" y1="100" x2="80" y2="150" stroke="#78350f" strokeWidth="3" />
                <line x1="69" y1="100" x2="92" y2="150" stroke="#78350f" strokeWidth="3" />
              </g>
              {/* Mangrove tree #2 */}
              <g>
                <circle cx="200" cy="40" r="24" fill="#16a34a" />
                <circle cx="220" cy="55" r="20" fill="#22c55e" />
                <circle cx="180" cy="55" r="20" fill="#15803d" />
                <rect x="196" y="60" width="6" height="42" fill="#78350f" />
                <line x1="199" y1="102" x2="180" y2="150" stroke="#78350f" strokeWidth="3" />
                <line x1="199" y1="102" x2="195" y2="150" stroke="#78350f" strokeWidth="3" />
                <line x1="199" y1="102" x2="210" y2="150" stroke="#78350f" strokeWidth="3" />
                <line x1="199" y1="102" x2="225" y2="150" stroke="#78350f" strokeWidth="3" />
              </g>
              {/* Baby fish hiding among the roots */}
              <FishGlyph x={75} y={130} fill="#fde047" size={5} />
              <FishGlyph x={120} y={140} fill="#fbbf24" size={5} flip />
              <FishGlyph x={205} y={130} fill="#fde047" size={5} />
              <FishGlyph x={250} y={138} fill="#fbbf24" size={5} flip />
              {/* Mud floor */}
              <rect x="0" y="150" width="320" height="50" fill="#451a03" />
              {/* Storm wave being absorbed by mangroves (subtle) */}
              <path d="M -10 70 Q 30 60 60 70 T 130 72 T 200 70 T 270 72 T 330 70"
                fill="none" stroke="#bae6fd" strokeWidth="1" opacity="0.5"
                className="ocean-wave" />

              <defs>
                <linearGradient id="ocean-mg-sky" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#cfeaff" />
                  <stop offset="1" stopColor="#7dd3fc" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <TreePine className="w-4 h-4 text-emerald-300" />
              <h4 className={`font-display font-bold text-white text-base ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ព្រៃកោងកាង" : "Mangrove Forests"}
              </h4>
            </div>
            <p
              className={`text-emerald-100/75 text-sm mb-3 ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {isKh
                ? "ឈើកោងកាងដុះនៅទីរាបតំបន់ឆ្នេរ ដែលទឹកសមុទ្រ និងទឹកសាបជួបគ្នា។ ឫសរបស់វាបង្កើតបានជា «កន្លែងសម្ភព» សម្រាប់កូនត្រី កូនបង្កង និងក្តាម។ ត្រីឆ្នេរសំខាន់ៗជាច្រើនប្រភេទ — ដែលអាចមានរហូតដល់ ៨០% នៃប្រភេទនេសាទពាណិជ្ជកម្មមួយចំនួន — ធ្លាប់រស់នៅទីនេះកាលជាកូន។"
                : "Mangrove trees grow in the muddy coastal flats where seawater and freshwater meet. Their tangled roots are a nursery for baby fish, shrimp and crabs. Many of the fish people eat along the coast — up to about 80% of some commercial species — spent part of their childhood hiding here."}
            </p>
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/30 px-3 py-2">
              <p className={`text-emerald-100/85 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "🛡️ ឫសរបស់វាក៏ផ្តាច់រលកព្យុះបានដែរ — វាជារបាំងធម្មជាតិសម្រាប់ភូមិឆ្នេររបស់កម្ពុជានៅខេត្តកោះកុង និងព្រះសីហនុ។"
                  : "🛡️ Their roots also break the force of storm waves — a natural shield for Cambodia's coastal villages in Koh Kong and Sihanoukville."}
              </p>
            </div>
          </div>
        </div>

        {/* CORAL REEFS */}
        <div className="rounded-2xl border border-rose-400/25 bg-gradient-to-b from-[#3b0a2c]/80 to-[#001a35]/80 overflow-hidden">
          <div className="aspect-[16/10] bg-gradient-to-b from-[#0ea5e9] via-[#1e3a8a] to-[#001a35] relative">
            <svg viewBox="0 0 320 200" className="w-full h-full">
              {/* Light rays from above */}
              {[60, 130, 220, 280].map((x) => (
                <polygon key={x}
                  points={`${x - 6},0 ${x + 6},0 ${x + 18},200 ${x - 18},200`}
                  fill="rgba(255,250,200,0.06)" />
              ))}
              {/* Sandy floor */}
              <ellipse cx="160" cy="200" rx="180" ry="30" fill="#fde68a" opacity="0.85" />
              {/* Coral cluster — left */}
              <g>
                <ellipse cx="60" cy="170" rx="22" ry="8" fill="#fb7185" />
                <path d="M 50 170 Q 48 150 56 145 Q 60 135 64 145 Q 70 138 72 150 Q 78 155 75 170 Z" fill="#f43f5e" />
                <path d="M 60 165 Q 62 155 66 152 Q 68 148 70 155" stroke="#fbbf24" strokeWidth="2" fill="none" />
              </g>
              {/* Coral cluster — center (brain coral) */}
              <g>
                <circle cx="160" cy="170" r="20" fill="#a78bfa" />
                <circle cx="160" cy="170" r="14" fill="none" stroke="#7c3aed" strokeWidth="1" />
                <circle cx="160" cy="170" r="9" fill="none" stroke="#7c3aed" strokeWidth="1" />
                <circle cx="160" cy="170" r="4" fill="none" stroke="#7c3aed" strokeWidth="1" />
              </g>
              {/* Coral cluster — right (branching) */}
              <g>
                <ellipse cx="250" cy="175" rx="24" ry="9" fill="#fb923c" />
                <line x1="240" y1="170" x2="232" y2="145" stroke="#fb923c" strokeWidth="4" />
                <line x1="250" y1="170" x2="250" y2="138" stroke="#fb923c" strokeWidth="4" />
                <line x1="260" y1="170" x2="268" y2="148" stroke="#fb923c" strokeWidth="4" />
                <circle cx="232" cy="145" r="3" fill="#fdba74" />
                <circle cx="250" cy="138" r="3" fill="#fdba74" />
                <circle cx="268" cy="148" r="3" fill="#fdba74" />
              </g>
              {/* Sea anemone */}
              <g>
                <circle cx="110" cy="178" r="8" fill="#22d3ee" />
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const a = (i * Math.PI) / 3;
                  return (
                    <line key={i}
                      x1="110" y1="178"
                      x2={110 + Math.cos(a) * 14} y2={178 + Math.sin(a - Math.PI / 2) * 14}
                      stroke="#22d3ee" strokeWidth="2" />
                  );
                })}
              </g>
              {/* Tropical fish swimming over the reef */}
              <FishGlyph x={90} y={80} fill="#fde047" size={9} />
              <FishGlyph x={180} y={100} fill="#fb7185" size={11} flip />
              <FishGlyph x={260} y={70} fill="#22d3ee" size={9} />
              <FishGlyph x={50} y={120} fill="#a78bfa" size={8} />
              {/* Bubbles */}
              {[70, 145, 215, 280].map((x, i) => (
                <circle key={i} cx={x} cy={150 - i * 8} r={2.5}
                  fill="rgba(186,230,253,0.7)" stroke="#7dd3fc" strokeWidth="0.5"
                  className="ocean-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
              ))}
            </svg>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Fish className="w-4 h-4 text-rose-300" />
              <h4 className={`font-display font-bold text-white text-base ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ផ្កាថ្មសមុទ្រ" : "Coral Reefs"}
              </h4>
            </div>
            <p
              className={`text-rose-100/75 text-sm mb-3 ${
                isKh ? "font-khmer leading-loose" : "leading-relaxed"
              }`}
            >
              {isKh
                ? "ផ្កាថ្មសមុទ្រគឺជាសត្វតូចៗ ហៅថា Coral Polyps ដែលរស់នៅជាមួយអាល់ហ្គាក្នុងខ្លួន។ ជារៀងរាល់ឆ្នាំ វាសាងសង់គ្រោងស៊ុនថ្មកំបោរ ជាន់លើជាន់ក្រោម — ផ្កាថ្មសមុទ្រដ៏ធំៗត្រូវការច្រើនពាន់ឆ្នាំដើម្បីបង្កើត។"
                : "Coral reefs are built by tiny animals called coral polyps that live with algae inside their bodies. Each year they lay down a new layer of limestone — the largest reefs took thousands of years to grow."}
            </p>
            <div className="rounded-xl bg-rose-500/10 border border-rose-400/30 px-3 py-2">
              <p className={`text-rose-100/85 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "🐠 នៅឈូងសមុទ្រថៃជុំវិញខេត្តកោះកុង និងកោះរ៉ុង ផ្កាថ្មសមុទ្រគឺជាផ្ទះរបស់ត្រីច្រើនជាង ៥០០ប្រភេទ ដែលផ្តល់ប្រូតេអ៊ីនដល់គ្រួសារនេសាទតាមឆ្នេរ។"
                  : "🐠 In the Gulf of Thailand around Koh Kong and Koh Rong, the reefs are home to over 500 fish species — the protein source for entire fishing families along the coast."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Closing line about Cambodia coast */}
      <div className="mt-2 rounded-2xl border border-yellow-300/25 bg-yellow-400/5 p-5 flex items-start gap-4">
        <div className="text-2xl flex-shrink-0">🇰🇭</div>
        <div>
          <h5 className={`font-display font-bold text-yellow-100 text-sm mb-1 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ឆ្នេរសមុទ្រ ៤៤៣ គីឡូម៉ែត្ររបស់កម្ពុជា" : "Cambodia's 443 km of Coast"}
          </h5>
          <p
            className={`text-yellow-100/80 text-sm flex items-center gap-2 flex-wrap ${
              isKh ? "font-khmer leading-loose" : "leading-relaxed"
            }`}
          >
            {isKh
              ? "ការការពារព្រៃកោងកាង និងផ្កាថ្មសមុទ្ររបស់យើង មិនមែនគ្រាន់តែជាការការពារធម្មជាតិ — វាគឺជាការការពារត្រីដែលគ្រួសារបរិភោគ ការការពារផ្ទះពីព្យុះ និងការការពារអនាគតសេដ្ឋកិច្ចទេសចរណ៍របស់យើង។"
              : "Protecting our mangroves and reefs is not just about saving nature — it is about saving the fish our families eat, our houses from storms, and the future of our tourism economy."}
            <ArrowRight className="w-3.5 h-3.5 text-yellow-200" />
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative helpers
// ════════════════════════════════════════════════════════════════════════════

function FishGlyph({
  x,
  y,
  fill,
  size = 10,
  flip = false,
}: {
  x: number;
  y: number;
  fill: string;
  size?: number;
  flip?: boolean;
}) {
  // Tiny stylised fish: ellipse body + triangle tail + dot eye
  return (
    <g transform={`translate(${x} ${y}) ${flip ? "scale(-1 1)" : ""}`}>
      <ellipse cx="0" cy="0" rx={size} ry={size * 0.55} fill={fill} />
      <polygon
        points={`${size},0 ${size + size * 0.6},${-size * 0.45} ${size + size * 0.6},${size * 0.45}`}
        fill={fill}
      />
      <circle cx={size * 0.4} cy={-size * 0.15} r={size * 0.12} fill="#0c1e3f" />
    </g>
  );
}

// Page-wide ambient bubble field (behind content, pointer-events none)
function BubbleField() {
  // 24 bubbles, randomised once at mount-time via deterministic seeds based on index
  const bubbles = Array.from({ length: 24 }).map((_, i) => {
    const left = (i * 47) % 100;
    const size = 4 + ((i * 13) % 9); // 4–12 px
    const dur = 14 + ((i * 7) % 12); // 14–26 s
    const delay = (i * 0.7) % 18;
    const drift = ((i * 11) % 30) - 15; // -15…+15 px
    return { left, size, dur, delay, drift };
  });

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="ocean-bubble absolute rounded-full bg-cyan-200/30 border border-cyan-100/30"
          style={{
            left: `${b.left}%`,
            bottom: "-20px",
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            ["--ocean-bubble-x" as string]: `${b.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

// Page-wide ambient drifting fish silhouettes
function DriftingFishField() {
  const fishes = [
    { top: 18, dur: 70, delay: 0, scale: 0.55, dir: "r" as const, fill: "rgba(125,211,252,0.20)" },
    { top: 44, dur: 90, delay: 12, scale: 0.7, dir: "l" as const, fill: "rgba(56,189,248,0.18)" },
    { top: 68, dur: 110, delay: 24, scale: 0.45, dir: "r" as const, fill: "rgba(186,230,253,0.18)" },
    { top: 82, dur: 100, delay: 6, scale: 0.6, dir: "l" as const, fill: "rgba(125,211,252,0.18)" },
  ];

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {fishes.map((f, i) => (
        <div
          key={i}
          className={f.dir === "r" ? "ocean-fish-r absolute" : "ocean-fish-l absolute"}
          style={{
            top: `${f.top}%`,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
            transform: f.dir === "r" ? `scale(${f.scale})` : `scale(${f.scale}) scaleX(-1)`,
          }}
        >
          <svg width="60" height="32" viewBox="0 0 60 32">
            <ellipse cx="22" cy="16" rx="20" ry="9" fill={f.fill} />
            <polygon points="42,16 60,4 60,28" fill={f.fill} />
          </svg>
        </div>
      ))}
    </div>
  );
}
