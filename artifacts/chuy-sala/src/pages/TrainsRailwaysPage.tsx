import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Train,
  TrainTrack,
  Package,
  Users,
  Magnet,
  Wrench,
  Fuel,
  Zap,
  Droplets,
  Lightbulb,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  RAIL-01 · Trains & Railways: The Steel Arteries
//            រថភ្លើង និងផ្លូវដែក៖ សរសៃឈាមដែកនៃពិភពលោក
//
//  1. The Magic of Steel on Steel  — rolling resistance: rubber vs steel
//  2. Types of Trains              — Freight · Passenger · Maglev · Norry
//  3. How They Are Built           — diesel-electric drivetrain · ballast
//
//  Aesthetic: industrial — steel grays, track-line borders, caution yellows.
// ════════════════════════════════════════════════════════════════════════════

const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#eef0f2",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const CARD_BG: React.CSSProperties = { backgroundColor: "#ffffff" };

const STEEL_BORDER = "border-slate-400";
const CAUTION = "#fbbf24"; // caution yellow

// Track-line top + bottom border decoration
function RailRibbon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 h-1 bg-slate-900"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, #0f172a 0 14px, #fbbf24 14px 28px)",
      }}
    />
  );
}

function CornerRivets() {
  return (
    <div className="contents">
      {[
        "top-2 left-2",
        "top-2 right-2",
        "bottom-2 left-2",
        "bottom-2 right-2",
      ].map((p) => (
        <span
          key={p}
          aria-hidden="true"
          className={`pointer-events-none absolute ${p} w-2 h-2 rounded-full bg-slate-500 ring-1 ring-slate-700/40`}
        />
      ))}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export function TrainsRailwaysPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* Hero */}
        <header
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 sm:px-10 py-9 sm:py-11 mb-10 shadow-xl border-2 border-slate-700"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.18), transparent 55%)," +
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "auto, 28px 28px, 28px 28px",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute top-0 inset-x-0 h-1.5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #fbbf24 0 18px, #0f172a 18px 36px)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 inset-x-0 h-1.5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #fbbf24 0 18px, #0f172a 18px 36px)",
            }}
          />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400/15 border-2 border-amber-300/60 text-amber-100 flex items-center justify-center flex-shrink-0">
              <Train className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200/85 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <TrainTrack className="w-3.5 h-3.5" />
                <span>{t("Science", "វិទ្យាសាស្ត្រ")}</span>
                <span className="opacity-50">/</span>
                <span className="text-amber-100">RAIL-01</span>
              </div>
              <h1
                data-testid="page-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t(
                  "Trains & Railways: The Steel Arteries",
                  "រថភ្លើង និងផ្លូវដែក៖ សរសៃឈាមដែកនៃពិភពលោក"
                )}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-slate-200/85 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "A single freight locomotive can pull thousands of tonnes across a continent on a thimble of fuel. The trick is not the engine — it is what happens where steel touches steel.",
                  "រថភ្លើងដឹកទំនិញតែមួយ អាចទាញទម្ងន់រាប់ពាន់តោន ឆ្លងកាត់ទ្វីបទាំងមូល ដោយប្រេងបន្តិចបន្តួចប៉ុណ្ណោះ។ ល្បិចមិនមែនជាម៉ាស៊ីនទេ — វាគឺនៅកន្លែងដែលដែកប៉ះដែក។"
                )}
              </p>
            </div>
          </div>
        </header>

        <SectionRolling kh={kh} t={t} />
        <SectionTypes   kh={kh} t={t} />
        <SectionBuild   kh={kh} t={t} />

        {/* Closing */}
        <div
          className="relative mt-10 rounded-2xl border-2 border-amber-500 p-5 flex items-start gap-3 overflow-hidden"
          style={CARD_BG}
          data-testid="closing-note"
        >
          <RailRibbon />
          <Sparkles className="w-6 h-6 text-amber-700 flex-shrink-0 mt-2" />
          <p className={`pt-2 text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <strong>{t("Why it matters: ", "ហេតុអ្វីសំខាន់ ៖ ")}</strong>
            {t(
              "Per tonne of cargo moved, modern freight rail uses roughly four times less fuel than long-haul trucking. As Cambodia rebuilds its rail links to Thailand and beyond, every kilometre of well-laid track is a quiet contribution to cleaner air, lower shipping costs, and fewer trucks on the highway.",
              "ក្នុងមួយតោននៃទំនិញដឹកជញ្ជូន រថភ្លើងដឹកទំនិញសម័យទំនើបប្រើប្រេងតិចជាងឡានដឹកទំនិញចម្ងាយឆ្ងាយប្រហែលបួនដង។ ខណៈប្រទេសកម្ពុជាកំពុងសាងសង់ឡើងវិញនូវផ្លូវដែកទៅប្រទេសថៃ និងលើសនេះទៀត រាល់គីឡូម៉ែត្រនៃផ្លូវដែកដែលដាក់បានល្អ គឺជាការរួមចំណែកស្ងាត់ៗដល់ខ្យល់ស្អាតជាងមុន ថ្លៃដឹកជញ្ជូនទាបជាងមុន និងឡានដឹកទំនិញតិចជាងមុននៅលើផ្លូវធំ។"
            )}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-amber-200 text-sm font-bold shadow hover:bg-slate-800 transition-colors ${kh ? "font-khmer" : ""}`}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 01 — The Magic of Steel on Steel
// ════════════════════════════════════════════════════════════════════════════

function SectionRolling({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-rolling">
      <SectionHeader spec="01" en="The Magic of Steel on Steel" kh="មន្តអាគមនៃដែកលើដែក" kh_={kh} />

      <div
        className={`relative rounded-2xl border-2 ${STEEL_BORDER} p-5 sm:p-7 shadow-sm overflow-hidden`}
        style={CARD_BG}
      >
        <RailRibbon />
        <CornerRivets />
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-start pt-3">
          <div>
            <p className={`text-foreground text-sm sm:text-base mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t("The hidden cost of any moving vehicle is called ", "តម្លៃលាក់កំបាំងរបស់រថយន្តណាមួយ ដែលកំពុងផ្លាស់ទី ត្រូវបានហៅថា ")}
              <strong className="text-slate-900">{t("rolling resistance", "ភាពទប់ទល់នៃការរមៀល")}</strong>
              {t(
                " — the energy spent fighting the squish, friction and bending of the wheel as it rolls. The bigger the squish, the more fuel the engine has to burn just to keep moving at the same speed.",
                " — ថាមពលដែលចំណាយដើម្បីប្រឆាំងនឹងការផ្លាស់ទំរង់ ការកកិត និងការពត់នៃកង់ ខណៈវារមៀល។ ការផ្លាស់ទំរង់កាន់តែច្រើន ម៉ាស៊ីនត្រូវដុតប្រេងកាន់តែច្រើន ដើម្បីរក្សាល្បឿនដដែល។"
              )}
            </p>
            <p className={`text-sm sm:text-base mb-4 text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "A truck's rubber tyre is soft. Where it meets the road it flattens into a wide oval, and that whole patch has to peel up off the asphalt with every single turn of the wheel. A train's steel wheel barely deforms at all — it touches a polished steel rail on a contact patch about the size of a small coin. Once a heavy train is rolling, it takes very little energy to keep it rolling.",
                "កង់កៅស៊ូរបស់ឡានគឺទន់។ កន្លែងដែលវាប៉ះផ្លូវ វារាបជារាងពងក្រពើ ហើយទំហំទាំងមូលនោះត្រូវបក់ឡើងពីផ្លូវអាស្វាល់ រាល់ការវិលនៃកង់ម្ដងៗ។ កង់ដែករបស់រថភ្លើងស្ទើរតែមិនផ្លាស់ទំរង់ទេ — វាប៉ះផ្លូវដែករំលីងលើផ្ទៃប៉ះប្រហែលប៉ុនកាក់តូចមួយ។ នៅពេលរថភ្លើងធ្ងន់កំពុងរមៀលហើយ ត្រូវការថាមពលតិចតួចប៉ុណ្ណោះ ដើម្បីឱ្យវារមៀលបន្ត។"
              )}
            </p>

            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4">
              <div className={`text-[11px] font-mono uppercase tracking-widest text-slate-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("ROLLING-RESISTANCE COEFFICIENT", "មេគុណនៃភាពទប់ទល់ការរមៀល")}
              </div>
              <ul className="space-y-2 text-sm text-slate-800">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-block w-3 h-3 rounded-sm bg-amber-400 border border-amber-600 flex-shrink-0" />
                  <span className={kh ? "font-khmer leading-loose" : "leading-relaxed"}>
                    <strong>{t("Rubber on asphalt: ", "កៅស៊ូលើផ្លូវអាស្វាល់ ៖ ")}</strong>
                    <span className="font-mono tabular-nums">≈ 0.010 – 0.015</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-block w-3 h-3 rounded-sm bg-slate-700 border border-slate-900 flex-shrink-0" />
                  <span className={kh ? "font-khmer leading-loose" : "leading-relaxed"}>
                    <strong>{t("Steel wheel on steel rail: ", "កង់ដែកលើផ្លូវដែក ៖ ")}</strong>
                    <span className="font-mono tabular-nums">≈ 0.001 – 0.002</span>
                  </span>
                </li>
                <li className={`text-xs text-slate-600 pt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "→ Roughly 5–10× less wasted energy per tonne, per kilometre.",
                    "→ ប្រហែល 5–10 ដងតិចជាងនៃថាមពលខាតបង់ ក្នុងមួយតោន ក្នុងមួយគីឡូម៉ែត្រ។"
                  )}
                </li>
              </ul>
            </div>
          </div>

          <RollingDiagram kh={kh} t={t} />
        </div>
      </div>
    </section>
  );
}

function RollingDiagram({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <svg
      viewBox="0 0 360 240"
      className="w-full h-auto rounded-xl bg-slate-900 border-2 border-slate-700"
      role="img"
      aria-label={t(
        "Comparison of two wheels: a rubber tyre on asphalt squashes into a wide flat patch where it meets the road, while a steel wheel on a steel rail keeps a tiny coin-sized contact area; arrows show the rubber wheel needs much more pushing force.",
        "ការប្រៀបធៀបនៃកង់ពីរ ៖ កង់កៅស៊ូលើផ្លូវអាស្វាល់ផ្លាស់ទំរង់រាងរាបធំទូលាយនៅកន្លែងដែលវាប៉ះផ្លូវ ខណៈកង់ដែកលើផ្លូវដែករក្សាផ្ទៃប៉ះតូចប៉ុនកាក់ប៉ុណ្ណោះ ព្រួញបង្ហាញថាកង់កៅស៊ូត្រូវការកម្លាំងរុញច្រើនជាង។"
      )}
      data-testid="rolling-diagram"
    >
      <title>{t("Rubber vs steel rolling-contact comparison", "ការប្រៀបធៀបការប៉ះរមៀល កៅស៊ូ ធៀប ដែក")}</title>

      {/* Left: rubber on asphalt */}
      <text x="90" y="22" fontSize="11" fill="#fde68a" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "កង់កៅស៊ូ / អាស្វាល់" : "RUBBER / ASPHALT"}
      </text>
      {/* asphalt */}
      <rect x="10" y="160" width="160" height="40" fill="#1f2937" stroke="#475569" strokeWidth="1" />
      <text x="90" y="178" fontSize="9" fill="#cbd5e1" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "អាស្វាល់" : "asphalt"}
      </text>
      {/* tyre - squished oval */}
      <ellipse cx="90" cy="120" rx="42" ry="40" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
      <ellipse cx="90" cy="120" rx="20" ry="18" fill="#1f2937" stroke="#64748b" strokeWidth="1" />
      {/* contact patch */}
      <rect x="60" y="158" width="60" height="3" fill={CAUTION} />
      <text x="90" y="218" fontSize="9" fill={CAUTION} fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ផ្ទៃប៉ះធំទូលាយ" : "WIDE FLAT PATCH"}
      </text>
      {/* push force arrow */}
      <path d="M22 100 L 50 100" stroke="#fb923c" strokeWidth="3" markerEnd="url(#arrL)" fill="none" />
      <text x="36" y="92" fontSize="9" fill="#fb923c" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "កម្លាំងរុញច្រើន" : "BIG PUSH"}
      </text>

      {/* Divider */}
      <line x1="180" y1="20" x2="180" y2="220" stroke="#475569" strokeWidth="1" strokeDasharray="2 4" />

      {/* Right: steel on steel */}
      <text x="270" y="22" fontSize="11" fill="#a7f3d0" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "កង់ដែក / ផ្លូវដែក" : "STEEL / STEEL RAIL"}
      </text>
      {/* rail */}
      <rect x="200" y="158" width="150" height="6" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="190" y="170" width="170" height="14" fill="#475569" stroke="#1f2937" strokeWidth="1" />
      <text x="275" y="200" fontSize="9" fill="#cbd5e1" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ផ្លូវដែក + ឈើក្រាស់" : "rail + sleeper"}
      </text>
      {/* wheel - perfect circle */}
      <circle cx="275" cy="120" r="40" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="275" cy="120" r="18" fill="#1f2937" stroke="#64748b" strokeWidth="1" />
      <circle cx="275" cy="120" r="4"  fill="#94a3b8" />
      {/* contact patch — tiny dot */}
      <rect x="271" y="156" width="8" height="3" fill={CAUTION} />
      <text x="275" y="218" fontSize="9" fill={CAUTION} fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ផ្ទៃប៉ះតូចប៉ុនកាក់" : "COIN-SIZED PATCH"}
      </text>
      {/* small push arrow */}
      <path d="M218 100 L 230 100" stroke="#a7f3d0" strokeWidth="2" markerEnd="url(#arrS)" fill="none" />
      <text x="224" y="92" fontSize="9" fill="#a7f3d0" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "កម្លាំងរុញតូច" : "tiny push"}
      </text>

      <defs>
        <marker id="arrL" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#fb923c" />
        </marker>
        <marker id="arrS" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#a7f3d0" />
        </marker>
      </defs>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 02 — Types of Trains
// ════════════════════════════════════════════════════════════════════════════

function SectionTypes({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-10" data-testid="section-types">
      <SectionHeader spec="02" en="Types of Trains" kh="ប្រភេទនៃរថភ្លើង" kh_={kh} />

      <div className="grid sm:grid-cols-2 gap-4">
        <TypeCard
          k={kh}
          icon={Package}
          accent="slate"
          titleEn="Freight Trains"
          titleKh="រថភ្លើងដឹកទំនិញ"
          bodyEn="The heavy lifters of the world. A single freight locomotive routinely pulls 100 wagons loaded with coal, rice, cement, or 40-foot shipping containers — moving in one journey what would otherwise need hundreds of trucks."
          bodyKh="អ្នកដឹកធ្ងន់នៃពិភពលោក។ រថភ្លើងដឹកទំនិញតែមួយ ច្រើនតែទាញរទេះ ១០០ ផ្ទុកដោយធ្យូងថ្ម អង្ករ ស៊ីម៉ងត៍ ឬកុងតឺន័រ ៤០ ហ្វីត — ផ្លាស់ទីក្នុងការធ្វើដំណើរតែមួយ នូវអ្វីដែលត្រូវការឡានដឹកទំនិញរាប់រយគ្រឿង។"
        />
        <TypeCard
          k={kh}
          icon={Users}
          accent="amber"
          titleEn="Passenger Trains"
          titleKh="រថភ្លើងដឹកអ្នកដំណើរ"
          bodyEn="Commuter trains, intercity expresses, and underground subways. A single subway line in a big city can move more people each hour than a 12-lane motorway, which is why trains are the backbone of any city that wants less traffic and cleaner air."
          bodyKh="រថភ្លើងទៅធ្វើការ រថភ្លើងលឿនរវាងទីក្រុង និងរថភ្លើងក្រោមដី។ ខ្សែរថភ្លើងក្រោមដីតែមួយក្នុងទីក្រុងធំ អាចដឹកមនុស្សក្នុងមួយម៉ោង ច្រើនជាងផ្លូវធំ ១២ គន្លង ដែលជាហេតុធ្វើឱ្យរថភ្លើងជាឆ្អឹងខ្នងនៃទីក្រុងណា ដែលចង់បានចរាចរណ៍តិច និងខ្យល់ស្អាត។"
        />
        <TypeCard
          k={kh}
          icon={Magnet}
          accent="green"
          titleEn="High-Speed Rail / Maglev"
          titleKh="រថភ្លើងល្បឿនលឿន / ម៉ាក់ឡែវ"
          bodyEn="At very high speeds, even rolling resistance becomes too much. Maglev trains (magnetic levitation) use powerful magnets to lift the whole train a few centimetres above the track and push it forward — the train never touches the rail at all, removing wheel friction entirely. The fastest in commercial service today, the Shanghai Transrapid, cruises at up to about 430 km/h."
          bodyKh="នៅល្បឿនខ្ពស់ខ្លាំង សូម្បីភាពទប់ទល់ការរមៀលក៏ច្រើនពេក។ រថភ្លើងម៉ាក់ឡែវ (ការអណ្ដែតដោយម៉ាញេទិច) ប្រើមេដែកដ៏មានឥទ្ធិពល លើករថភ្លើងទាំងមូលឡើងពីផ្លូវដែកប៉ុន្មានសង់ទីម៉ែត្រ ហើយរុញវាទៅមុខ — រថភ្លើងមិនប៉ះផ្លូវដែកទាល់តែសោះ យកការកកិតនៃកង់ចេញទាំងស្រុង។ រថភ្លើងលឿនបំផុតក្នុងសេវាកម្មពាណិជ្ជកម្មសព្វថ្ងៃ គឺ Shanghai Transrapid រត់រហូតដល់ប្រហែល 430 គីឡូម៉ែត្រ/ម៉ោង។"
        />
        <SpecialNorryCard k={kh} t={t} />
      </div>
    </section>
  );
}

function TypeCard({
  k,
  icon: Icon,
  accent,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
}: {
  k: boolean;
  icon: React.ComponentType<{ className?: string }>;
  accent: "slate" | "amber" | "green";
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  const tone: Record<string, { border: string; pill: string; iconBg: string; iconText: string }> = {
    slate: { border: "border-slate-400",  pill: "bg-slate-100 text-slate-800 border-slate-300",     iconBg: "bg-slate-100",  iconText: "text-slate-700"  },
    amber: { border: "border-amber-400",  pill: "bg-amber-50 text-amber-800 border-amber-300",      iconBg: "bg-amber-50",   iconText: "text-amber-700"  },
    green: { border: "border-emerald-400",pill: "bg-emerald-50 text-emerald-800 border-emerald-300", iconBg: "bg-emerald-50", iconText: "text-emerald-700" },
  };
  const t = tone[accent];
  return (
    <article
      className={`relative rounded-2xl border-2 ${t.border} p-5 shadow-sm overflow-hidden`}
      style={CARD_BG}
    >
      <CornerRivets />
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-lg ${t.iconBg} ${t.iconText} flex items-center justify-center border border-slate-300`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className={`text-lg font-bold text-slate-900 ${k ? "font-khmer" : ""}`}>
          {k ? titleKh : titleEn}
        </h3>
      </div>
      <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {k ? bodyKh : bodyEn}
      </p>
    </article>
  );
}

function SpecialNorryCard({
  k,
  t,
}: {
  k: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <article
      className="relative rounded-2xl border-2 border-amber-500 p-5 shadow-md overflow-hidden bg-gradient-to-br from-amber-50 to-white sm:col-span-2"
      data-testid="norry-card"
    >
      <RailRibbon />
      <CornerRivets />
      <div className="pt-3 flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-400">
          <Wrench className="w-5 h-5" />
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <h3 className={`text-lg font-bold text-amber-900 ${k ? "font-khmer" : ""}`}>
            {t("The Bamboo Train (Norry)", "រថភ្លើងឫស្សី (ណូរី)")}
          </h3>
          <span className={`text-[10px] font-mono uppercase tracking-widest bg-amber-200 text-amber-900 border border-amber-400 px-2 py-0.5 rounded ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("CAMBODIA · BATTAMBANG", "កម្ពុជា · បាត់ដំបង")}
          </span>
        </div>
      </div>
      <p className={`text-sm text-slate-800 ${k ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {t(
          "The famous ", "រថភ្លើង "
        )}
        <strong className="text-amber-900">{t("Norry", "ណូរី")}</strong>
        {t(
          " of Battambang is a brilliant, real-world example of frugal engineering. Villagers build a flat platform of bamboo slats, drop it onto two simple metal axles with steel wheels, and bolt on a small repurposed engine — often a water-pump or motorcycle motor — connected by a rubber drive belt. The whole machine can be lifted off the rails in about a minute by two people, which is exactly how two norries used to pass each other on a single-track line: the lighter one is unloaded, lifted aside, and put back on after the other rolls past. The original norries that ran along the country's French-era main line were largely cleared around 2017 when the railway was rehabilitated, but a short tourist line still operates today near O Sra Lav, just outside Battambang town.",
          " ដ៏ល្បីល្បាញនៃខេត្តបាត់ដំបង គឺជាឧទាហរណ៍ដ៏ឆ្លាតវៃនៃវិស្វកម្មសន្សំសំចៃក្នុងពិភពពិត។ ប្រជាជននៅភូមិសាងសង់វេទិកាសំប៉ែតពីបន្ទះឫស្សី ដាក់វាលើភ្លៅដែកសាមញ្ញពីរ ដែលមានកង់ដែក ហើយដាក់ម៉ាស៊ីនតូចមួយ ដែលច្រើនតែជាម៉ាស៊ីនបូមទឹក ឬម៉ាស៊ីនម៉ូតូ ដែលភ្ជាប់ដោយខ្សែបញ្ជូនកៅស៊ូ។ ម៉ាស៊ីនទាំងមូលអាចលើកចេញពីផ្លូវដែកក្នុងរយៈពេលប្រហែលមួយនាទីដោយមនុស្សពីរនាក់ ដែលជាវិធីដែលណូរីពីរធ្លាប់ឆ្លងកាត់គ្នានៅលើខ្សែផ្លូវដែកតែមួយ ៖ ណូរីដែលស្រាលជាងត្រូវដោះចេញ លើកដាក់ចំហៀង ហើយដាក់ត្រឡប់មកវិញ បន្ទាប់ពីណូរីមួយទៀតរត់កាត់ទៅ។ ណូរីដើមដែលរត់តាមផ្លូវដែកមេសម័យបារាំងភាគច្រើនត្រូវបានដោះចេញនៅប្រហែលឆ្នាំ ២០១៧ ពេលផ្លូវដែកត្រូវបានជួសជុលឡើងវិញ ប៉ុន្តែខ្សែទេសចរណ៍ខ្លីមួយនៅតែដំណើរការសព្វថ្ងៃនៅជិតអូរស្រឡាវ ក្បែរទីប្រជុំជនបាត់ដំបង។"
        )}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <VocabChip color="amber"  en="Bamboo platform" kh="វេទិកាឫស្សី"          k={k} />
        <VocabChip color="slate"  en="Steel axles"     kh="ភ្លៅដែក"               k={k} />
        <VocabChip color="indigo" en="Pump engine"     kh="ម៉ាស៊ីនបូមទឹក"         k={k} />
        <VocabChip color="green"  en="Frugal design"   kh="រចនាសន្សំសំចៃ"        k={k} />
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 03 — How They Are Built
// ════════════════════════════════════════════════════════════════════════════

function SectionBuild({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section className="mb-4" data-testid="section-build">
      <SectionHeader spec="03" en="How They Are Built" kh="របៀបដែលពួកវាត្រូវបានសាងសង់" kh_={kh} />

      {/* Engine sub-card */}
      <article
        className={`relative rounded-2xl border-2 ${STEEL_BORDER} p-5 sm:p-7 shadow-sm overflow-hidden mb-5`}
        style={CARD_BG}
        data-testid="engine-card"
      >
        <CornerRivets />
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] gap-6 items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Fuel className="w-5 h-5 text-slate-700" />
              <h3 className={`text-lg font-bold text-slate-900 ${kh ? "font-khmer" : ""}`}>
                {t("The Engine: Diesel that's secretly Electric", "ម៉ាស៊ីន ៖ ម៉ាស៊ីនឌីសែលដែលពិតជាអគ្គិសនី")}
              </h3>
            </div>

            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-3 mb-3 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <p className={`text-sm text-amber-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                <strong>{t("Fun fact: ", "ការពិតគួរឱ្យចាប់អារម្មណ៍ ៖ ")}</strong>
                {t(
                  "Most modern \"diesel\" freight locomotives are actually electric. The diesel engine never turns the wheels. It only spins a giant generator, which makes electricity, which then powers electric motors mounted on each axle.",
                  "រថភ្លើងដឹកទំនិញ «ឌីសែល» សម័យទំនើបភាគច្រើន ពិតជាដំណើរការដោយអគ្គិសនី។ ម៉ាស៊ីនឌីសែលមិនដែលបង្វិលកង់ដោយផ្ទាល់ទេ។ វាគ្រាន់តែបង្វិលម៉ាស៊ីនភ្លើងធំមួយ ដែលផលិតអគ្គិសនី ហើយអគ្គិសនីនោះផ្គត់ផ្គង់ដល់ម៉ូទ័រអគ្គិសនី ដែលដំឡើងលើភ្លៅនីមួយៗ។"
                )}
              </p>
            </div>

            <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Why bother with this two-step ",
                "ហេតុអ្វីបានជាគេខំធ្វើតាមដំណើរការពីរជំហាន "
              )}
              <em>{t("diesel-electric", "ឌីសែល-អគ្គិសនី")}</em>
              {t(
                " setup? Because electric motors deliver maximum torque from a complete standstill — exactly what you need to start a 10,000-tonne train moving. A pure mechanical gearbox big enough to do the same job would be impossibly heavy and would constantly burn its clutches. It is the same trick as a hybrid car, just scaled up.",
                " ? ព្រោះម៉ូទ័រអគ្គិសនីផ្ដល់នូវកម្លាំងបង្វិលអតិបរមា ចាប់ពីពេលឈរនឹងទាំងស្រុង — ជាអ្វីដែលអ្នកត្រូវការ ដើម្បីចាប់ផ្ដើមរថភ្លើង ១០.០០០ តោន។ ប្រអប់លេខមេកានិចសុទ្ធដែលធំល្មមធ្វើការងារដូចគ្នា នឹងធ្ងន់ដល់កម្រិតមិនអាចទៅរួច និងនឹងដុតក្លាតរបស់វាជាប់ៗ។ វាគឺល្បិចដូចគ្នានឹងឡាន hybrid ប៉ុន្តែក្នុងទំហំធំជាង។"
              )}
            </p>

            <div className="flex flex-wrap gap-2">
              <VocabChip color="slate"  en="Diesel engine" kh="ម៉ាស៊ីនឌីសែល" k={kh} />
              <VocabChip color="amber"  en="Generator"     kh="ម៉ាស៊ីនភ្លើង" k={kh} />
              <VocabChip color="indigo" en="Traction motor" kh="ម៉ូទ័រទាញ"     k={kh} />
              <VocabChip color="green"  en="Torque"         kh="កម្លាំងបង្វិល" k={kh} />
            </div>
          </div>

          <DieselElectricDiagram kh={kh} t={t} />
        </div>
      </article>

      {/* Tracks sub-card */}
      <article
        className="relative rounded-2xl border-2 border-amber-500 p-5 sm:p-7 shadow-sm overflow-hidden bg-gradient-to-br from-amber-50/40 to-white"
        data-testid="tracks-card"
      >
        <CornerRivets />
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] gap-6 items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrainTrack className="w-5 h-5 text-amber-700" />
              <h3 className={`text-lg font-bold text-amber-900 ${kh ? "font-khmer" : ""}`}>
                {t("The Tracks: Why all those crushed rocks?", "ផ្លូវដែក ៖ ហេតុអ្វីមានដុំថ្មកំទេចទាំងអស់នោះ?")}
              </h3>
            </div>

            <p className={`text-sm text-slate-800 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {t(
                "Look under any railway and you will see a thick bed of sharp, angular crushed stone called ",
                "មើលក្រោមផ្លូវដែកណាមួយ អ្នកនឹងឃើញគ្រែដ៏ក្រាស់នៃថ្មកំទេចមុតស្រួច ដែលហៅថា "
              )}
              <strong className="text-amber-900">{t("ballast", "បាឡាស់ (ថ្មគ្រឹះ)")}</strong>
              {t(
                ". It is doing four hidden jobs at once.",
                "។ វាកំពុងធ្វើការងារលាក់កំបាំងបួនក្នុងពេលតែមួយ។"
              )}
            </p>

            <ul className="space-y-2 text-sm text-slate-800 mb-3">
              <li className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span className={kh ? "font-khmer leading-loose" : "leading-relaxed"}>
                  <strong>{t("Drains water. ", "បង្ហូរទឹក ។ ")}</strong>
                  {t(
                    "Big air gaps between the rocks let rainwater fall straight through, so the soil under the track never turns into mud.",
                    "ចន្លោះធំៗរវាងថ្មទុកឱ្យទឹកភ្លៀងហូរធ្លាក់ចុះត្រង់ៗ ដើម្បីកុំឱ្យដីក្រោមផ្លូវដែកប្រែទៅជាភក់។"
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span className={kh ? "font-khmer leading-loose" : "leading-relaxed"}>
                  <strong>{t("Absorbs vibration. ", "ស្រូបយកការរញ្ជួយ ។ ")}</strong>
                  {t(
                    "The angular stones lock together and act like a giant sponge, soaking up the heavy thump of every wheel so the ground beneath does not slowly collapse.",
                    "ថ្មមុតស្រួចចាប់គ្នា ហើយធ្វើដូចសារី យក្ស ស្រូបយកការប៉ះដ៏ធ្ងន់នៃកង់នីមួយៗ ដើម្បីកុំឱ្យដីក្រោមដួលរលំបន្តិចម្ដងៗ។"
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span className={kh ? "font-khmer leading-loose" : "leading-relaxed"}>
                  <strong>{t("Spreads the load. ", "បែងចែកទម្ងន់ ។ ")}</strong>
                  {t(
                    "The narrow rail-and-sleeper sits on a wide bed of ballast, which spreads the train's enormous weight across a much bigger patch of soil.",
                    "ផ្លូវដែក និងឈើក្រាស់ដែលតូចចង្អៀត អង្គុយលើគ្រែបាឡាស់ដ៏ធំទូលាយ ដែលបែងចែកទម្ងន់ដ៏ធំធេងរបស់រថភ្លើង ឲ្យលើផ្ទៃដីដ៏ធំជាង។"
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span className={kh ? "font-khmer leading-loose" : "leading-relaxed"}>
                  <strong>{t("Holds the sleepers in place. ", "ទប់ឈើក្រាស់ឱ្យនៅនឹង ។ ")}</strong>
                  {t(
                    "The interlocking stones grip the wooden or concrete sleepers so the rails do not creep sideways, even after thousands of trains roll over them.",
                    "ថ្មដែលចាប់គ្នាកាន់ឈើក្រាស់ឈើ ឬបេតុង ដើម្បីកុំឱ្យផ្លូវដែកវង្វេងទៅចំហៀង សូម្បីបន្ទាប់ពីរថភ្លើងរាប់ពាន់រត់កាត់វា។"
                  )}
                </span>
              </li>
            </ul>
          </div>

          <TrackCrossSection kh={kh} t={t} />
        </div>
      </article>
    </section>
  );
}

function DieselElectricDiagram({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <svg
      viewBox="0 0 380 200"
      className="w-full h-auto rounded-xl bg-slate-900 border-2 border-slate-700"
      role="img"
      aria-label={t(
        "Diesel-electric drivetrain diagram: a diesel engine spins a generator that produces electricity, which feeds traction motors mounted on each axle, which finally turn the train wheels.",
        "តារាងបញ្ជូនកម្លាំងឌីសែល-អគ្គិសនី ៖ ម៉ាស៊ីនឌីសែលបង្វិលម៉ាស៊ីនភ្លើងដែលផលិតអគ្គិសនី ដែលបញ្ជូនទៅម៉ូទ័រទាញដែលដំឡើងលើភ្លៅនីមួយៗ ហើយចុងក្រោយបង្វិលកង់រថភ្លើង។"
      )}
      data-testid="diesel-electric-diagram"
    >
      <title>{t("Diesel-electric drivetrain", "ប្រព័ន្ធបញ្ជូនកម្លាំងឌីសែល-អគ្គិសនី")}</title>

      {/* Diesel engine */}
      <rect x="20" y="40" width="80" height="60" rx="6" fill="#1f2937" stroke="#94a3b8" strokeWidth="1.4" />
      <text x="60" y="62" fontSize="10" fill="#fde68a" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ម៉ាស៊ីន" : "DIESEL"}
      </text>
      <text x="60" y="76" fontSize="10" fill="#fde68a" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ឌីសែល" : "ENGINE"}
      </text>
      <text x="60" y="92" fontSize="9" fill="#cbd5e1" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "(ដុតប្រេង)" : "(burns fuel)"}
      </text>

      {/* Generator */}
      <rect x="140" y="40" width="80" height="60" rx="6" fill="#1f2937" stroke="#a7f3d0" strokeWidth="1.4" />
      <text x="180" y="62" fontSize="10" fill="#a7f3d0" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ម៉ាស៊ីនភ្លើង" : "GENERATOR"}
      </text>
      <text x="180" y="78" fontSize="9" fill="#cbd5e1" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "(ផលិតអគ្គិសនី)" : "(makes electricity)"}
      </text>

      {/* Motors */}
      <rect x="260" y="40" width="100" height="60" rx="6" fill="#1f2937" stroke="#fbbf24" strokeWidth="1.4" />
      <text x="310" y="62" fontSize="10" fill="#fde68a" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ម៉ូទ័រទាញ" : "TRACTION"}
      </text>
      <text x="310" y="76" fontSize="10" fill="#fde68a" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "" : "MOTORS"}
      </text>
      <text x="310" y="92" fontSize="9" fill="#cbd5e1" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "(លើភ្លៅ)" : "(on each axle)"}
      </text>

      {/* arrows: spin */}
      <path d="M100 70 L 138 70" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrA)" fill="none" />
      <text x="119" y="62" fontSize="9" fill="#fde68a" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "បង្វិល" : "SPINS"}
      </text>

      {/* arrows: amps */}
      <path d="M220 70 L 258 70" stroke="#a7f3d0" strokeWidth="2" markerEnd="url(#arrB)" fill="none" />
      <text x="239" y="62" fontSize="9" fill="#a7f3d0" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ភ្លើង" : "POWER"}
      </text>

      {/* wheels */}
      <line x1="20" y1="170" x2="360" y2="170" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="280" cy="160" r="14" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
      <circle cx="320" cy="160" r="14" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="195" fontSize="9" fill="#cbd5e1" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "កង់" : "WHEELS"}
      </text>
      <path d="M310 105 L 300 145" stroke="#fbbf24" strokeWidth="1.4" strokeDasharray="3 3" />

      <defs>
        <marker id="arrA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#fbbf24" />
        </marker>
        <marker id="arrB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#a7f3d0" />
        </marker>
      </defs>
    </svg>
  );
}

function TrackCrossSection({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  // crushed rock icons (random angles)
  const rocks = Array.from({ length: 26 }).map((_, i) => {
    const x = 25 + (i % 13) * 23 + ((i % 2) * 6);
    const y = 130 + Math.floor(i / 13) * 18;
    const r = 5 + (i % 3);
    return { x, y, r, k: i };
  });
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-auto rounded-xl bg-slate-900 border-2 border-amber-400/40"
      role="img"
      aria-label={t(
        "Cross-section of a railway track: two shiny steel rails on top, sitting across wooden sleepers, all resting on a deep bed of crushed stone ballast that drains rainwater into the soil subgrade beneath.",
        "ផ្នែកកាត់នៃផ្លូវដែក ៖ ផ្លូវដែករំលីងពីរនៅខាងលើ អង្គុយកាត់ឈើក្រាស់ ទាំងអស់នេះអង្គុយលើគ្រែដ៏ជ្រៅនៃថ្មកំទេច ដែលបង្ហូរទឹកភ្លៀងចូលដីខាងក្រោម។"
      )}
      data-testid="track-cross-section"
    >
      <title>{t("Railway track cross-section", "ផ្នែកកាត់ផ្លូវដែក")}</title>

      {/* sky */}
      <rect x="0" y="0" width="320" height="80" fill="#0f172a" />
      {/* rails */}
      <rect x="60"  y="74" width="14" height="12" fill="#cbd5e1" stroke="#f1f5f9" strokeWidth="1" />
      <rect x="246" y="74" width="14" height="12" fill="#cbd5e1" stroke="#f1f5f9" strokeWidth="1" />
      <text x="67"  y="68" fontSize="9" fill="#fde68a" fontFamily="monospace" className={kh ? "font-khmer" : ""}>
        {kh ? "ផ្លូវដែក" : "RAIL"}
      </text>
      <text x="253" y="68" fontSize="9" fill="#fde68a" fontFamily="monospace" textAnchor="end" className={kh ? "font-khmer" : ""}>
        {kh ? "ផ្លូវដែក" : "RAIL"}
      </text>
      {/* sleeper */}
      <rect x="40" y="86" width="240" height="14" fill="#92400e" stroke="#451a03" strokeWidth="1" />
      <text x="160" y="97" fontSize="9" fill="#fde68a" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ឈើក្រាស់ (ឈើ ឬបេតុង)" : "SLEEPER (wood / concrete)"}
      </text>

      {/* ballast */}
      <rect x="0"  y="100" width="320" height="80" fill="#475569" />
      <text x="160" y="115" fontSize="10" fill="#fde68a" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "បាឡាស់ ៖ ថ្មកំទេចមុតស្រួច" : "BALLAST: SHARP CRUSHED STONE"}
      </text>
      {rocks.map((r) => (
        <polygon
          key={r.k}
          points={`${r.x},${r.y - r.r} ${r.x + r.r},${r.y} ${r.x + r.r * 0.4},${r.y + r.r} ${r.x - r.r * 0.6},${r.y + r.r * 0.7} ${r.x - r.r},${r.y - r.r * 0.3}`}
          fill="#94a3b8"
          stroke="#1f2937"
          strokeWidth="0.6"
        />
      ))}

      {/* subgrade */}
      <rect x="0" y="180" width="320" height="40" fill="#7c2d12" />
      <text x="160" y="200" fontSize="9" fill="#fde68a" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ដីគ្រឹះ" : "SOIL SUBGRADE"}
      </text>

      {/* water-drain arrows */}
      <path d="M100 105 L 100 175" stroke="#60a5fa" strokeWidth="1.4" strokeDasharray="2 3" markerEnd="url(#drop)" />
      <path d="M220 105 L 220 175" stroke="#60a5fa" strokeWidth="1.4" strokeDasharray="2 3" markerEnd="url(#drop)" />
      <text x="160" y="170" fontSize="9" fill="#60a5fa" fontFamily="monospace" textAnchor="middle" className={kh ? "font-khmer" : ""}>
        {kh ? "ទឹកភ្លៀងហូរចុះ" : "rain drains down"}
      </text>

      <defs>
        <marker id="drop" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#60a5fa" />
        </marker>
      </defs>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Helpers
// ════════════════════════════════════════════════════════════════════════════

function VocabChip({
  color,
  en,
  kh,
  k,
}: {
  color: "amber" | "slate" | "indigo" | "green";
  en: string;
  kh: string;
  k: boolean;
}) {
  const colours: Record<string, string> = {
    amber:  "border-amber-300 text-amber-900 bg-amber-50",
    slate:  "border-slate-300 text-slate-800 bg-slate-50",
    indigo: "border-indigo-300 text-indigo-800 bg-indigo-50",
    green:  "border-emerald-300 text-emerald-800 bg-emerald-50",
  };
  return (
    <span className={`inline-block text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded border ${colours[color]} ${k ? "font-khmer" : ""}`}>
      {k ? kh : en}
    </span>
  );
}

function SectionHeader({
  spec,
  en,
  kh,
  kh_,
}: {
  spec: string;
  en: string;
  kh: string;
  kh_: boolean;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-amber-800 bg-amber-100 border border-amber-400 rounded px-2 py-0.5">
        SEC-{spec}
      </span>
      <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 ${kh_ ? "font-khmer" : ""}`}>
        {kh_ ? kh : en}
      </h2>
      <TrainTrack className="w-4 h-4 text-amber-600 ml-1" aria-hidden="true" />
      <div
        className="flex-1 h-1 rounded-sm"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #0f172a 0 8px, #fbbf24 8px 16px)",
        }}
      />
    </div>
  );
}
