import { Link } from "wouter";
import {
  ArrowLeft,
  Factory,
  Wind,
  AlertTriangle,
  Filter,
  Zap,
  Atom,
  Magnet,
  Sparkles,
  Leaf,
  Globe,
  Gauge,
  CheckCircle2,
  Lightbulb,
  Building2,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  M-TECH-ESP · Electrostatic Precipitators: Cleaning the Air
//                ឧបករណ៍ចាប់ភាគល្អិតដោយអគ្គិសនីស្ទិត៖ ការសម្អាតខ្យល់
//
//  Sub-module under /technology.
//
//  Three cards:
//    1. The Smoke Problem — fly ash, toxic soot, why physical filters fail
//    2. The Cottrell Invention — wall of electricity, ionization, collector plates
//    3. Real-World Applications — 99% efficiency, coal/cement/metals/chemicals
//
//  Aesthetic: high-tech industrial. Electric purples, steely greys, clean
//  air blues. Dark steel backgrounds with violet circuit-glow accents.
// ════════════════════════════════════════════════════════════════════════════

// ── Palette ──────────────────────────────────────────────────────────────────
const VIOLET = "#7c3aed";          // violet-600 — discharge wires / high voltage
const VIOLET_BRIGHT = "#a78bfa";   // violet-400
const VIOLET_GLOW = "#c4b5fd";     // violet-300
const VIOLET_PALE = "#ede9fe";     // violet-100

const SKY = "#0ea5e9";             // sky-500 — clean air
const SKY_BRIGHT = "#38bdf8";      // sky-400
const SKY_PALE = "#e0f2fe";        // sky-100

const STEEL_DARK = "#0f172a";      // slate-900
const STEEL_DEEP = "#0b1220";
const STEEL = "#334155";           // slate-700
const STEEL_MID = "#64748b";       // slate-500
const STEEL_LIGHT = "#cbd5e1";     // slate-300

const CIRCUIT_LINE = "rgba(167, 139, 250, 0.18)"; // violet-400 @ 18% — grid
const SOOT = "#1e1b29";            // very dark violet-tinted black for "dirty" panels

const PAGE_BG: React.CSSProperties = {
  background:
    `radial-gradient(900px 500px at 90% -10%, rgba(124, 58, 237, 0.20), transparent 70%), ` +
    `radial-gradient(800px 500px at 0% 110%, rgba(14, 165, 233, 0.18), transparent 70%), ` +
    `linear-gradient(180deg, ${STEEL_DARK} 0%, #0c1322 60%, ${STEEL_DARK} 100%)`,
};

const CIRCUIT_PANEL: React.CSSProperties = {
  backgroundColor: STEEL_DEEP,
  backgroundImage:
    `linear-gradient(${CIRCUIT_LINE} 1px, transparent 1px), ` +
    `linear-gradient(90deg, ${CIRCUIT_LINE} 1px, transparent 1px)`,
  backgroundSize: "28px 28px, 28px 28px",
};

// ── Tiny helpers ─────────────────────────────────────────────────────────────
function Pill({
  icon: Icon,
  text,
  kh,
  color = VIOLET_BRIGHT,
}: {
  icon: LucideIcon;
  text: string;
  kh: boolean;
  color?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
      style={{
        background: `${color}1F`,           // ~12% alpha
        border: `1px solid ${color}55`,
        color,
      }}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {text}
    </div>
  );
}

function CardHeader({
  num,
  enTitle,
  khTitle,
  icon: Icon,
  accent,
  kh,
}: {
  num: string;
  enTitle: string;
  khTitle: string;
  icon: LucideIcon;
  accent: string;
  kh: boolean;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div
        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${accent}33, ${accent}11)`,
          border: `1px solid ${accent}66`,
          boxShadow: `0 0 22px ${accent}33, inset 0 0 12px ${accent}22`,
        }}
      >
        <Icon className="w-7 h-7" style={{ color: accent }} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-[11px] font-bold tracking-[0.2em] uppercase mb-1"
          style={{ color: accent }}
        >
          Card {num}
        </div>
        <h2 className={`font-display font-bold text-2xl sm:text-3xl text-white leading-tight ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? khTitle : enTitle}
        </h2>
        <p
          className={`text-sm mt-1 ${kh ? "font-display" : "font-khmer"}`}
          style={{ color: STEEL_LIGHT }}
        >
          {kh ? enTitle : khTitle}
        </p>
      </div>
    </div>
  );
}

function FactCallout({
  label,
  enText,
  khText,
  icon: Icon,
  accent,
  kh,
}: {
  label: string;
  enText: string;
  khText: string;
  icon: LucideIcon;
  accent: string;
  kh: boolean;
}) {
  return (
    <div
      className="rounded-xl p-4 sm:p-5"
      style={{
        background: `linear-gradient(180deg, ${accent}1A, ${accent}08)`,
        border: `1px solid ${accent}55`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" style={{ color: accent }} aria-hidden="true" />
        <div
          className={`text-[11px] font-bold tracking-widest uppercase ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
          style={{ color: accent }}
        >
          {label}
        </div>
      </div>
      <p className={`text-base leading-relaxed text-white ${kh ? "font-khmer leading-loose" : ""}`}>
        {kh ? khText : enText}
      </p>
      <p
        className={`text-sm leading-relaxed mt-2 ${kh ? "" : "font-khmer leading-loose"}`}
        style={{ color: STEEL_LIGHT }}
      >
        {kh ? enText : khText}
      </p>
    </div>
  );
}

// ── Step row used inside Card 2 to walk through the mechanism ────────────────
function StepRow({
  step,
  enTitle,
  khTitle,
  enBody,
  khBody,
  icon: Icon,
  accent,
  kh,
}: {
  step: number;
  enTitle: string;
  khTitle: string;
  enBody: string;
  khBody: string;
  icon: LucideIcon;
  accent: string;
  kh: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-sm"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accent}AA)`,
            color: "white",
            boxShadow: `0 0 18px ${accent}55`,
          }}
          aria-hidden="true"
        >
          {step}
        </div>
        <div
          className="w-px flex-1 mt-2"
          style={{ background: `linear-gradient(180deg, ${accent}66, transparent)` }}
        />
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Icon className="w-4 h-4" style={{ color: accent }} aria-hidden="true" />
          <h3 className={`font-display font-bold text-lg text-white ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? khTitle : enTitle}
          </h3>
        </div>
        <p className={`text-base leading-relaxed text-white/90 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? khBody : enBody}
        </p>
        <p
          className={`text-sm leading-relaxed mt-1.5 ${kh ? "" : "font-khmer leading-loose"}`}
          style={{ color: STEEL_LIGHT }}
        >
          {kh ? enBody : khBody}
        </p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ElectrostaticPrecipitator() {
  const { language } = useLanguageStore();
  const k = language === "kh";
  const t = (en: string, kh: string) => (k ? kh : en);

  return (
    <div className="min-h-screen text-slate-100" style={PAGE_BG}>
      {/* ── Top: back link ─────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-medium hover:underline ${k ? "font-khmer" : ""}`}
          style={{ color: VIOLET_BRIGHT }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t("Back to Home", "ត្រឡប់ទំព័រដើម")}
        </Link>
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <Pill
          icon={Factory}
          text={t(
            "Technology · Electrostatic Precipitators",
            "បច្ចេកវិទ្យា · ឧបករណ៍ចាប់ភាគល្អិតដោយអគ្គិសនីស្ទិត",
          )}
          kh={k}
          color={VIOLET_BRIGHT}
        />

        {/* Primary title (in user's currently selected language) */}
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mt-5 mb-3 leading-tight text-white ${k ? "font-khmer leading-loose" : ""}`}
        >
          {k ? (
            <>
              ឧបករណ៍ចាប់ភាគល្អិតដោយអគ្គិសនីស្ទិត៖{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${VIOLET_BRIGHT}, ${SKY_BRIGHT}, ${VIOLET_GLOW})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ការសម្អាតខ្យល់
              </span>
            </>
          ) : (
            <>
              Electrostatic Precipitators:{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${VIOLET_BRIGHT}, ${SKY_BRIGHT}, ${VIOLET_GLOW})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Cleaning the Air
              </span>
            </>
          )}
        </h1>

        {/* Muted secondary title in the opposite language — strict bilingual */}
        <div
          className={`text-base sm:text-lg mb-4 ${k ? "font-display" : "font-khmer leading-loose"}`}
          style={{ color: STEEL_MID }}
        >
          {k
            ? "Electrostatic Precipitators: Cleaning the Air"
            : "ឧបករណ៍ចាប់ភាគល្អិតដោយអគ្គិសនីស្ទិត៖ ការសម្អាតខ្យល់"}
        </div>

        {/* Primary intro paragraph */}
        <p
          className={`text-lg sm:text-xl leading-relaxed max-w-3xl ${k ? "font-khmer leading-loose" : ""}`}
          style={{ color: STEEL_LIGHT }}
        >
          {t(
            "How a 100-year-old invention uses a wall of high-voltage electricity — not a physical filter — to pull microscopic ash and soot out of factory smoke before it reaches the sky.",
            "របៀបដែលការច្នៃប្រឌិតអាយុ ១០០ ឆ្នាំ ប្រើជញ្ជាំងនៃអគ្គិសនីវ៉ុលខ្ពស់ — មិនមែនជាតម្រងរូបវន្តទេ — ដើម្បីទាញភាគល្អិតផេះ និងផ្សែងតូចមីក្រូទស្សន៍ចេញពីផ្សែងរោងចក្រ មុនពេលវាឡើងដល់មេឃ។",
          )}
        </p>

        {/* Muted secondary intro paragraph in the opposite language */}
        <p
          className={`text-sm sm:text-base leading-relaxed max-w-3xl mt-2 ${k ? "" : "font-khmer leading-loose"}`}
          style={{ color: STEEL_MID }}
        >
          {k
            ? "How a 100-year-old invention uses a wall of high-voltage electricity — not a physical filter — to pull microscopic ash and soot out of factory smoke before it reaches the sky."
            : "របៀបដែលការច្នៃប្រឌិតអាយុ ១០០ ឆ្នាំ ប្រើជញ្ជាំងនៃអគ្គិសនីវ៉ុលខ្ពស់ — មិនមែនជាតម្រងរូបវន្តទេ — ដើម្បីទាញភាគល្អិតផេះ និងផ្សែងតូចមីក្រូទស្សន៍ចេញពីផ្សែងរោងចក្រ មុនពេលវាឡើងដល់មេឃ។"}
        </p>

        {/* Aesthetic flourish: a row of mini-pills naming the three big ideas */}
        <div className="flex flex-wrap gap-2 mt-6">
          <Pill icon={AlertTriangle} text={t("Smoke", "ផ្សែង")} kh={k} color={SKY_BRIGHT} />
          <Pill icon={Zap} text={t("High Voltage", "វ៉ុលខ្ពស់")} kh={k} color={VIOLET_BRIGHT} />
          <Pill icon={Leaf} text={t("Clean Air", "ខ្យល់ស្អាត")} kh={k} color="#86efac" />
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* CARD 1 · The Smoke Problem                                          */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <article
          className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            ...CIRCUIT_PANEL,
            border: `1px solid ${SKY}55`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${SKY}22 inset`,
          }}
        >
          {/* Faint factory chimney glow in the corner */}
          <div
            aria-hidden="true"
            className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(closest-side, ${SOOT}, transparent 70%)`,
              opacity: 0.9,
            }}
          />

          <div className="relative">
            <CardHeader
              num="01"
              enTitle="The Smoke Problem"
              khTitle="បញ្ហាផ្សែង"
              icon={Factory}
              accent={SKY_BRIGHT}
              kh={k}
            />

            <p className={`text-lg leading-relaxed text-white/95 mb-6 ${k ? "font-khmer leading-loose" : ""}`}>
              {t(
                "When a factory chimney puffs out a dark cloud, what we casually call \"smoke\" is not just gas. It is a hot stream of exhaust packed with millions of tiny solid particles — fly ash from burned coal, oily black soot, and traces of toxic metals.",
                "ពេលបំពង់ផ្សែងរោងចក្រ​បាញ់ពពកខ្មៅ អ្វី​ដែល​យើង​ហៅ​ថា «ផ្សែង» នោះ មិនមែន​ត្រឹម​តែ​ឧស្ម័ន​ទេ។ វា​ជា​ខ្សែ​ស្រាយ​ផ្សែង​ក្ដៅ​មួយ​ដែល​ពោរ​ពេញ​ដោយ​ភាគល្អិត​រូបរាង​តូចៗ​រាប់​លាន — ផេះ​ថ្ម​ដែល​ឆេះ ផ្សែង​ខ្មៅ​មាន​ប្រេង និង​ដាន​លោហៈ​ពុល។",
              )}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <FactCallout
                label={t("The Issue", "បញ្ហា")}
                enText="If those particles are released into the sky, they drift down into the lungs of every person nearby and cause severe long-term respiratory illness — asthma, chronic bronchitis, and heart disease."
                khText="បើ​ភាគល្អិត​ទាំង​នោះ​ត្រូវ​បាន​បញ្ចេញ​ទៅ​លើ​មេឃ វា​នឹង​ហើរ​ធ្លាក់​ចូល​ក្នុង​សួត​មនុស្ស​គ្រប់​គ្នា​នៅ​ក្នុង​តំបន់ ហើយ​បង្ក​ឱ្យ​មាន​ជំងឺ​ផ្លូវ​ដង្ហើម​យូរ​អង្វែង​ធ្ងន់​ធ្ងរ — ហឺត ការ​រលាក​ទងសួត​រ៉ាំរ៉ៃ និង​ជំងឺ​បេះដូង។"
                icon={AlertTriangle}
                accent="#fb7185" // rose-400 — health warning
                kh={k}
              />
              <FactCallout
                label={t("The Challenge", "បញ្ហាប្រឈម")}
                enText="The particles are so fine — finer than human hair — that a traditional physical filter (a sieve, a net, a cloth bag) clogs solid in minutes under the massive volume of factory exhaust. We need a filter that does not get clogged."
                khText="ភាគ​ល្អិត​ទាំង​នេះ​មាន​ទំហំ​តូច​មែន​ទែន — តូច​ជាង​សក់​មនុស្ស​ទៀត — ដែល​តម្រង​រូបវន្ត​បែប​ប្រពៃណី (ទំពាំង សំណាញ់ ឬ​ថង់​ក្រណាត់) ស្ទះ​ភ្លាមៗ​ក្នុង​ពេល​តែ​ប៉ុន្មាន​នាទី ដោយ​សារ​បរិមាណ​ផ្សែង​ដ៏​ច្រើន​លើស​លប់។ យើង​ត្រូវការ​តម្រង​មួយ​ដែល​មិន​ស្ទះ។"
                icon={Filter}
                accent={SKY_BRIGHT}
                kh={k}
              />
            </div>

            <div
              className="flex items-start gap-3 rounded-lg p-4"
              style={{
                background: "rgba(251, 113, 133, 0.10)",
                border: "1px solid rgba(251, 113, 133, 0.35)",
              }}
            >
              <Atom className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#fb7185" }} aria-hidden="true" />
              <p className={`text-sm leading-relaxed text-white/90 ${k ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Particle size in industrial smoke is typically 0.1 to 100 micrometres. A human hair is about 70 micrometres wide — so the smallest soot particles are 700× thinner than a single hair.",
                  "ទំហំ​ភាគ​ល្អិត​ក្នុង​ផ្សែង​ឧស្សាហកម្ម​ជា​ធម្មតា​មាន​ពី ០.១ ដល់ ១០០ មីក្រូម៉ែត្រ។ សក់​មនុស្ស​មាន​កម្រាស់​ប្រមាណ ៧០ មីក្រូម៉ែត្រ — ដូច្នេះ​ភាគ​ល្អិត​ផ្សែង​តូច​បំផុត​គឺ​ស្ដើង​ជាង​សក់​តែ​មួយ ៧០០ ដង។",
                )}
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* CARD 2 · The Cottrell Invention                                     */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <article
          className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            ...CIRCUIT_PANEL,
            border: `1px solid ${VIOLET}66`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${VIOLET}33 inset, 0 0 60px ${VIOLET}22`,
          }}
        >
          {/* Electric purple glow in the corner */}
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(closest-side, ${VIOLET}55, transparent 70%)`,
              opacity: 0.7,
            }}
          />

          <div className="relative">
            <CardHeader
              num="02"
              enTitle="The Cottrell Invention"
              khTitle="ការច្នៃប្រឌិតរបស់ Cottrell"
              icon={Zap}
              accent={VIOLET_BRIGHT}
              kh={k}
            />

            <p className={`text-lg leading-relaxed text-white/95 mb-6 ${k ? "font-khmer leading-loose" : ""}`}>
              {t(
                "In 1907, an American chemist named Frederick Gardner Cottrell had a brilliant idea: instead of trying to physically catch the particles with a net, why not use a wall of electricity that the particles cannot help but stick to?",
                "នៅ​ឆ្នាំ ១៩០៧ គីមីវិទូ​អាមេរិក​ម្នាក់​ឈ្មោះ Frederick Gardner Cottrell មាន​គំនិត​ប៉ិន​ប្រសប់​មួយ៖ ជំនួស​ការ​ព្យាយាម​ចាប់​ភាគ​ល្អិត​ដោយ​សំណាញ់​រូបវន្ត ហេតុ​អ្វី​មិន​ប្រើ​ជញ្ជាំង​អគ្គិសនី ​ដែល​ភាគ​ល្អិត​ត្រូវ​តែ​ជាប់​នឹង​វា​?",
              )}
            </p>

            <div
              className="rounded-xl p-5 sm:p-6 mb-6"
              style={{
                background: `linear-gradient(180deg, ${VIOLET}12, transparent)`,
                border: `1px solid ${VIOLET}44`,
              }}
            >
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Sparkles className="w-4 h-4" style={{ color: VIOLET_BRIGHT }} aria-hidden="true" />
                <div
                  className={`text-[11px] font-bold tracking-widest uppercase ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
                  style={{ color: VIOLET_BRIGHT }}
                >
                  {t("How It Works", "របៀបដែលវាដំណើរការ")}
                </div>
                <span
                  className={`text-[11px] font-medium tracking-wide ${k ? "" : "font-khmer text-xs"}`}
                  style={{ color: STEEL_MID }}
                >
                  · {k ? "How It Works" : "របៀបដែលវាដំណើរការ"}
                </span>
              </div>
              <div className="mb-4" />

              <StepRow
                step={1}
                enTitle="Dirty gas enters the chamber"
                khTitle="ឧស្ម័នកខ្វក់ចូលក្នុងបន្ទប់"
                enBody="Hot exhaust full of fly ash and soot is funnelled into a tall metal box called the precipitator chamber, where the cleaning happens."
                khBody="ផ្សែង​ក្ដៅ​ដែល​ពោរ​ពេញ​ដោយ​ផេះ​ថ្ម និង​ផ្សែង​ខ្មៅ ត្រូវ​បាន​បង្វែរ​ចូល​ប្រអប់​លោហៈ​ខ្ពស់​មួយ​ឈ្មោះ​បន្ទប់​ចាប់​ភាគ​ល្អិត ដែល​ការ​សម្អាត​កើត​ឡើង។"
                icon={Wind}
                accent={SKY_BRIGHT}
                kh={k}
              />

              <StepRow
                step={2}
                enTitle="High-voltage wires shock the particles"
                khTitle="ខ្សែវ៉ុលខ្ពស់ឆក់ភាគល្អិត"
                enBody="Inside the chamber hang thin discharge electrodes — wires carrying tens of thousands of volts. The electric field rips electrons off nearby gas molecules and dumps them onto every dust particle that drifts past. We say the particle has been ionised: it now carries a strong negative charge."
                khBody="នៅ​ក្នុង​បន្ទប់​មាន​ខ្សែ​អេឡិចត្រូត​បញ្ចេញ​ស្ដើងៗ​ព្យួរ​ចុះ — ខ្សែ​ដែល​ផ្ទុក​វ៉ុល​រាប់​ម៉ឺន។ ដែន​អគ្គិសនី​បក់​អេឡិចត្រុង​ចេញ​ពី​ម៉ូលេគុល​ឧស្ម័ន​ដែល​នៅ​ក្បែរ ហើយ​បោះ​វា​ទៅ​លើ​ភាគ​ល្អិត​ធូលី​គ្រប់​មួយ​ដែល​ហើរ​កាត់។ យើង​ហៅ​ថា​ភាគ​ល្អិត​ត្រូវ​បាន​​ផ្ទុក​បន្ទុក (ionisation) ៖ ឥឡូវ​នេះ​វា​មាន​បន្ទុក​អវិជ្ជមាន​ខ្លាំង។"
                icon={Zap}
                accent={VIOLET_BRIGHT}
                kh={k}
              />

              <StepRow
                step={3}
                enTitle="Charged particles fly to the collector plates"
                khTitle="ភាគល្អិតមានបន្ទុកហើរទៅជញ្ជាំងប្រមូល"
                enBody="The walls of the chamber are large flat metal collector plates wired to be positively charged. Opposite charges attract — so every negatively charged particle is yanked sideways out of the gas stream and slammed onto a collector plate, where it sticks."
                khBody="ជញ្ជាំង​នៃ​បន្ទប់​គឺ​ជា​ផ្ទាំង​លោហៈ​រាប​ស្មើ​ធំៗ​ដែល​ត​ភ្ជាប់​ឱ្យ​មាន​បន្ទុក​វិជ្ជមាន។ បន្ទុក​ផ្ទុយ​គ្នា​ទាញ​គ្នា — ដូច្នេះ​ភាគ​ល្អិត​ដែល​មាន​បន្ទុក​អវិជ្ជមាន​គ្រប់​មួយ​ត្រូវ​បាន​ទាញ​ផ្ដេក​ចេញ​ពី​ខ្សែ​ស្រាយ​ឧស្ម័ន ហើយ​ជាប់​នៅ​លើ​ផ្ទាំង​ប្រមូល។"
                icon={Magnet}
                accent={VIOLET_BRIGHT}
                kh={k}
              />

              <StepRow
                step={4}
                enTitle="Only clean gas leaves the chimney"
                khTitle="មានតែឧស្ម័នស្អាតប៉ុណ្ណោះចេញពីបំពង់ផ្សែង"
                enBody="The dirt is now trapped on the walls. The gas that exits the top of the chimney is almost completely clear. Periodically, mechanical hammers rap the plates so the layer of caked ash falls into a hopper at the bottom and is hauled away."
                khBody="ភាគ​ល្អិត​កខ្វក់​ឥឡូវ​នេះ​ត្រូវ​បាន​ចាប់​នៅ​លើ​ជញ្ជាំង។ ឧស្ម័ន​ដែល​ចេញ​ពី​លើ​បំពង់​ផ្សែង​គឺ​ស្ទើរ​តែ​ថ្លា​ទាំង​ស្រុង។ ជា​បន្ត​បន្ទាប់ ញញួរ​មេកានិច​នឹង​គោះ​ផ្ទាំង ដូច្នេះ​ស្រទាប់​ផេះ​ទម្លាក់​ចូល​ធុង​នៅ​ផ្នែក​ខាង​ក្រោម ហើយ​ត្រូវ​បាន​ដឹក​យក​ទៅ​បោះ​ចោល។"
                icon={Leaf}
                accent="#86efac" // green-300 — clean
                kh={k}
              />

              {/* The single one-liner that makes the whole thing click */}
              <div
                className="mt-2 rounded-lg p-4 flex items-start gap-3"
                style={{
                  background: `linear-gradient(135deg, ${VIOLET}22, ${SKY}22)`,
                  border: `1px solid ${VIOLET_BRIGHT}55`,
                }}
              >
                <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: VIOLET_GLOW }} aria-hidden="true" />
                <p className={`text-base font-semibold text-white ${k ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "The trick: charge the dirt, then attract it to the wall. The gas slips through. The ash sticks.",
                    "ល្បិច​៖ ដាក់​បន្ទុក​អគ្គិសនី​ឱ្យ​ភាគ​ល្អិត​ធូលី រួច​ទាញ​វា​ឱ្យ​ជាប់​នឹង​ជញ្ជាំង។ ឧស្ម័ន​ឆ្លង​កាត់​បាន។ ផេះ​ជាប់​នៅ។",
                  )}
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* CARD 3 · Real-World Applications                                    */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <article
          className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            ...CIRCUIT_PANEL,
            border: `1px solid #86efac55`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px #86efac22 inset`,
          }}
        >
          {/* Soft green leaf glow */}
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(closest-side, rgba(134, 239, 172, 0.18), transparent 70%)`,
            }}
          />

          <div className="relative">
            <CardHeader
              num="03"
              enTitle="Real-World Applications"
              khTitle="ការប្រើប្រាស់ក្នុងពិភពពិត"
              icon={Leaf}
              accent="#86efac"
              kh={k}
            />

            <p className={`text-lg leading-relaxed text-white/95 mb-6 ${k ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Cottrell's invention is well over 100 years old and it is still the global standard for cleaning industrial smoke. A modern electrostatic precipitator can capture up to 99% of the particles in an exhaust stream — sometimes more than 99.9%.",
                "ការ​ច្នៃ​ប្រឌិត​របស់ Cottrell មាន​អាយុ​ជាង ១០០ ឆ្នាំ​ហើយ ហើយ​វា​នៅ​ជា​ស្តង់ដារ​ជា​សកល​សម្រាប់​ការ​សម្អាត​ផ្សែង​ឧស្សាហកម្ម។ ឧបករណ៍​ចាប់​ភាគ​ល្អិត​ដោយ​អគ្គិសនី​ស្ទិត​សម័យ​ថ្មី​អាច​ចាប់​បាន​ដល់ ៩៩% នៃ​ភាគ​ល្អិត​នៅ​ក្នុង​ខ្សែ​ផ្សែង — ពេល​ខ្លះ​ច្រើន​ជាង ៩៩.៩%។",
              )}
            </p>

            {/* The big efficiency stat */}
            <div
              className="rounded-xl p-5 sm:p-6 mb-6 flex items-center gap-5"
              style={{
                background: `linear-gradient(135deg, rgba(134,239,172,0.18), rgba(56,189,248,0.10))`,
                border: `1px solid rgba(134, 239, 172, 0.45)`,
              }}
            >
              <div
                className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, #86efac, ${SKY_BRIGHT})`,
                  boxShadow: `0 0 24px rgba(134,239,172,0.45)`,
                }}
              >
                <Gauge className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div
                  className="font-display font-bold text-3xl sm:text-4xl"
                  style={{
                    background: `linear-gradient(90deg, #86efac, ${SKY_BRIGHT})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t("Up to 99% efficient", "ប្រសិទ្ធភាព​រហូត​ដល់ ៩៩%")}
                </div>
                <div
                  className={`text-sm mt-0.5 ${k ? "" : "font-khmer"}`}
                  style={{ color: STEEL_LIGHT }}
                >
                  {k
                    ? "Up to 99% efficient — particles captured per pass through the chamber"
                    : "ប្រសិទ្ធភាព​រហូត​ដល់ ៩៩% — ភាគ​ល្អិត​ត្រូវ​បាន​ចាប់​ក្នុង​ការ​ឆ្លង​កាត់​បន្ទប់​មួយ​ដង"}
                </div>
              </div>
            </div>

            {/* Industries grid */}
            <div className="mb-3 flex items-baseline gap-2 flex-wrap">
              <div className={`text-[11px] font-bold tracking-widest uppercase ${k ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
                style={{ color: VIOLET_BRIGHT }}
              >
                {t("Where you'll find them", "កន្លែង​ដែល​អ្នក​នឹង​រក​វា​ឃើញ")}
              </div>
              <span
                className={`text-[11px] font-medium tracking-wide ${k ? "" : "font-khmer text-xs"}`}
                style={{ color: STEEL_MID }}
              >
                · {k ? "Where you'll find them" : "កន្លែង​ដែល​អ្នក​នឹង​រក​វា​ឃើញ"}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FactCallout
                label={t("Coal Power Plants", "រោងចក្រ​ផលិតថាមពលធ្យូងថ្ម")}
                enText="The single biggest user. Every coal plant chimney in the world relies on precipitators to strip out fly ash before the smoke leaves the stack."
                khText="អ្នក​ប្រើប្រាស់​ធំ​បំផុត។ បំពង់​ផ្សែង​នៃ​រោងចក្រ​ធ្យូង​ថ្ម​គ្រប់​ទី​កន្លែង​នៅ​លើ​ពិភពលោក ពឹង​ផ្អែក​លើ​ឧបករណ៍​ចាប់​ភាគ​ល្អិត​ដើម្បី​ដក​ផេះ​ថ្ម​ចេញ មុន​ពេល​ផ្សែង​ចេញ​ពី​បំពង់។"
                icon={Factory}
                accent={SKY_BRIGHT}
                kh={k}
              />
              <FactCallout
                label={t("Cement Factories", "រោងចក្រ​ស៊ីម៉ងត៍")}
                enText="Cement kilns produce huge clouds of fine limestone and clinker dust. Precipitators catch the dust so the surrounding villages don't breathe it in — and the recovered dust often goes straight back into the cement."
                khText="ឡ​ស៊ីម៉ងត៍​បង្កើត​ពពក​ធូលី​កំបោរ និង​ក្លែង​ខឺ (clinker) យ៉ាង​ច្រើន។ ឧបករណ៍​ចាប់​ភាគ​ល្អិត​ចាប់​ធូលី​ដើម្បី​កុំ​ឱ្យ​ភូមិ​ជុំវិញ​ស្រូប​ចូល — ហើយ​ធូលី​ដែល​ប្រមូល​បាន​ត្រូវ​បាន​ដាក់​ត្រឡប់​ចូល​ស៊ីម៉ងត៍​វិញ​ភ្លាមៗ។"
                icon={Building2}
                accent="#86efac"
                kh={k}
              />
              <FactCallout
                label={t("Metallurgical Fumes", "ផ្សែង​ចម្រាញ់​លោហៈ")}
                enText="Steel mills, copper smelters, and aluminium plants all run their hot metal-vapour fumes through precipitators to recover valuable metal dust and protect workers from heavy-metal poisoning."
                khText="រោងចក្រ​ដែក រោងចក្រ​ស្ពាន់ និង​រោងចក្រ​អាលុយ​មីញ៉ូម សុទ្ធតែ​បញ្ជូន​ផ្សែង​ចំហាយ​លោហៈ​ក្ដៅ​របស់​ខ្លួន​ឆ្លង​កាត់​ឧបករណ៍​ចាប់​ភាគ​ល្អិត ដើម្បី​ប្រមូល​ធូលី​លោហៈ​មាន​តម្លៃ និង​ការពារ​កម្មករ​ពី​ការ​ពុល​លោហៈ​ធ្ងន់។"
                icon={FlaskConical}
                accent={VIOLET_BRIGHT}
                kh={k}
              />
              <FactCallout
                label={t("Chemical Plants", "រោងចក្រ​គីមី")}
                enText={'A specialised "wet" precipitator removes sulfuric acid mist from the exhaust of fertiliser and battery factories — protecting both the air and the people downwind from acid rain.'}
                khText="ឧបករណ៍​ចាប់​ភាគ​ល្អិត​ប្រភេទ «សើម» ពិសេស ដក​ចំហាយ​អាស៊ីត​ស៊ុលហ្វួរិក​ចេញ​ពី​ផ្សែង​នៃ​រោងចក្រ​ជី និង​រោងចក្រ​ថ្ម — ការពារ​ទាំង​ខ្យល់ និង​ប្រជាជន​ដែល​នៅ​ក្រោម​ខ្យល់ ពី​ភ្លៀង​អាស៊ីត។"
                icon={CheckCircle2}
                accent="#fb7185"
                kh={k}
              />
            </div>

            {/* Closing thought */}
            <div
              className="mt-6 rounded-lg p-4 flex items-start gap-3"
              style={{
                background: `linear-gradient(135deg, rgba(134,239,172,0.10), rgba(56,189,248,0.10))`,
                border: `1px solid rgba(134, 239, 172, 0.35)`,
              }}
            >
              <Globe className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: SKY_BRIGHT }} aria-hidden="true" />
              <p className={`text-sm leading-relaxed text-white/90 ${k ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Every breath of clean air downwind from a modern factory is, in a small way, a quiet thank-you to a chemist named Frederick Cottrell.",
                  "រាល់​ដង​ដែល​យើង​ដក​ដង្ហើម​យក​ខ្យល់​ស្អាត​ខាង​ក្រោម​ខ្យល់​នៃ​រោងចក្រ​សម័យ​ថ្មី គឺ​ជា​ការ​អរគុណ​ស្ងាត់ៗ​មួយ​ដែល​ប្រគល់​ទៅ​គីមីវិទូ​ឈ្មោះ Frederick Cottrell។",
                )}
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
