import { Link } from "wouter";
import {
  ArrowLeft,
  Wind,
  Waves,
  Plane,
  Droplet,
  Gauge,
  Sigma,
  Zap,
  Trophy,
  AlertCircle,
  Beaker,
} from "lucide-react";
import { useTranslation } from "@/store/use-language";

/* ════════════════════════════════════════════════════════════════════════════
 *  NAVIER-STOKES — "The Rules of Fluid Flow"
 *  សមីការ Navier-Stokes៖ ច្បាប់នៃលំហូរទឹកនិងខ្យល់
 *
 *  Aesthetic: sleek wind-tunnel — deep navy + electric cyan + soft sky blues,
 *  with flowing streamline graphics and aerodynamic typography. Bilingual.
 * ══════════════════════════════════════════════════════════════════════════ */

// ── Palette ────────────────────────────────────────────────────────────────
const BG          = "#06121f"; // deep ocean navy
const PANEL       = "#0c1e35"; // wind-tunnel chamber
const PANEL_SOFT  = "#11294a";
const STREAMLINE  = "rgba(56, 189, 248, 0.12)";
const SKY         = "#7dd3fc";
const CYAN        = "#22d3ee";
const ELECTRIC    = "#38bdf8";
const GOLD        = "#fbbf24";
const TEXT        = "#e0f2fe";
const TEXT_DIM    = "#94a3b8";
const TEXT_MUTED  = "#64748b";

const glow = (color: string, strength = 8) =>
  `0 0 ${strength}px ${color}, 0 0 ${strength * 2}px ${color}40`;

/* ════════════════════════════════════════════════════════════════════════════
 *  PAGE
 * ══════════════════════════════════════════════════════════════════════════ */

export default function NavierStokesPage() {
  const t = useTranslation();

  return (
    <div className="min-h-screen relative" style={{ background: BG, color: TEXT }}>
      {/* ── Wind-tunnel streamlines (background SVG) ───────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 1200 800">
          {Array.from({ length: 14 }).map((_, i) => {
            const y = 40 + i * 55;
            const wave = 30 + (i % 3) * 8;
            return (
              <path
                key={i}
                d={`M -50 ${y} Q 300 ${y - wave} 600 ${y} T 1250 ${y}`}
                fill="none"
                stroke={STREAMLINE}
                strokeWidth="1.5"
              />
            );
          })}
        </svg>
        {/* Soft radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(6,18,31,0.85) 90%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/science"
          className="inline-flex items-center gap-2 text-sm font-mono mb-8 hover:opacity-80 transition-opacity"
          style={{ color: CYAN, textShadow: glow(CYAN, 4) }}
          data-testid="link-back-science"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
        </Link>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <header className="mb-12 sm:mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-6"
            style={{
              border: `1px solid ${CYAN}`,
              color: CYAN,
              boxShadow: glow(CYAN, 4),
            }}
          >
            <Wind className="w-3.5 h-3.5" />
            {t("Fluid Dynamics", "ឌីណាមិចទឹកនិងខ្យល់")}
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4"
            style={{ color: SKY, textShadow: glow(SKY, 10) }}
          >
            Navier-Stokes
            <br />
            <span style={{ color: CYAN, textShadow: glow(CYAN, 10) }}>
              The Rules of Fluid Flow
            </span>
          </h1>
          <h2
            className="font-khmer text-xl sm:text-2xl md:text-3xl leading-relaxed mt-3"
            style={{ color: ELECTRIC, textShadow: glow(ELECTRIC, 6) }}
          >
            សមីការ Navier-Stokes៖ ច្បាប់នៃលំហូរទឹកនិងខ្យល់
          </h2>

          <p className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed" style={{ color: TEXT_DIM }}>
            {t(
              "Every river that bends around a rock, every gust of wind that lifts a 400-tonne airplane, every cup of coffee that swirls when you stir it — they all obey the same handful of rules. This is the rulebook.",
              "ទន្លេគ្រប់ខ្សែដែលបត់ជុំវិញថ្ម ខ្យល់គ្រប់ផ្លុំដែលលើកយន្តហោះធ្ងន់ ៤០០ តោន កាហ្វេគ្រប់កែវដែលវិលនៅពេលអ្នកកូរ — សុទ្ធតែគោរពច្បាប់តែប៉ុន្មានប៉ុណ្ណោះ។ នេះគឺជាសៀវភៅច្បាប់នោះ។",
            )}
          </p>
        </header>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 1 — THE SIMPLE VIEW
           ════════════════════════════════════════════════════════════════ */}
        <Section
          eyebrowEn="Section 1"
          eyebrowKh="ផ្នែកទី ១"
          titleEn="The Simple View"
          titleKh="សម្រាប់អ្នកចាប់ផ្តើម"
          icon={Droplet}
          accent={SKY}
        >
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <Analogy
              icon={Waves}
              titleEn="River around a rock"
              titleKh="ទន្លេជុំវិញថ្ម"
              bodyEn="Water at the front piles up, water on the sides speeds around, water behind swirls in little eddies."
              bodyKh="ទឹកខាងមុខប្រមូលផ្តុំ ទឹកសងខាងរត់លឿនជុំវិញ ទឹកខាងក្រោយវិលជាខ្យល់កួចតូចៗ។"
            />
            <Analogy
              icon={Plane}
              titleEn="Air over a wing"
              titleKh="ខ្យល់លើស្លាបយន្តហោះ"
              bodyEn="Air on top moves faster, pressure drops, and that pressure difference lifts the entire airplane into the sky."
              bodyKh="ខ្យល់ខាងលើផ្លាស់ទីលឿនជាង សម្ពាធធ្លាក់ចុះ ហើយភាពខុសគ្នាសម្ពាធនោះលើកយន្តហោះទាំងមូលឡើងលើមេឃ។"
            />
            <Analogy
              icon={Beaker}
              titleEn="Stirring honey vs water"
              titleKh="ការកូរទឹកឃ្មុំធៀបនឹងទឹក"
              bodyEn="Honey resists the spoon — that is high viscosity. Water lets the spoon glide — low viscosity. Same equation, different μ."
              bodyKh="ទឹកឃ្មុំទប់ស្លាបព្រា — នោះជាភាពខាប់ខ្ពស់។ ទឹកអនុញ្ញាតស្លាបព្រាជ្រុលងាយ — ភាពខាប់ទាប។ សមីការដូចគ្នា μ ខុសគ្នា។"
            />
          </div>

          <div
            className="rounded-2xl p-5 sm:p-6 mb-6"
            style={{ background: PANEL, border: `1px solid ${ELECTRIC}30` }}
          >
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: TEXT }}>
              {t(
                "The Navier-Stokes equation is the rulebook that tells every single drop of water or puff of air exactly where to go and how fast to move. It calculates how fluids get pushed, pulled, and slowed down by friction.",
                "សមីការ Navier-Stokes គឺជាសៀវភៅច្បាប់ដែលប្រាប់ដំណក់ទឹក ឬផ្លុំខ្យល់នីមួយៗឱ្យដឹងច្បាស់ថាត្រូវទៅណា និងផ្លាស់ទីលឿនប៉ុនណា។ វាគណនារបៀបដែលសារធាតុរាវត្រូវរុញច្រាន ទាញ និងបន្ថយល្បឿនដោយកកិត។",
              )}
            </p>
          </div>

          {/* ── Interactive fluid simulator slot ──────────────────── */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${PANEL} 0%, ${PANEL_SOFT} 100%)`,
              border: `1px dashed ${CYAN}60`,
              minHeight: "320px",
            }}
            data-testid="fluid-simulator-slot"
          >
            {/* Faint flowing streamlines so the empty slot still feels alive */}
            <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none" viewBox="0 0 800 320">
              {Array.from({ length: 10 }).map((_, i) => {
                const y = 20 + i * 30;
                return (
                  <path
                    key={i}
                    d={`M -20 ${y} Q 200 ${y - 20} 400 ${y} T 820 ${y}`}
                    fill="none"
                    stroke={CYAN}
                    strokeWidth="1"
                    opacity={0.3 + (i % 3) * 0.15}
                  />
                );
              })}
              {/* Obstacle the streamlines bend around */}
              <circle cx="400" cy="160" r="28" fill={ELECTRIC} opacity="0.25" stroke={CYAN} strokeWidth="1.5" />
            </svg>

            <div className="relative h-full min-h-[320px] flex flex-col items-center justify-center text-center px-6 py-10">
              <Wind className="w-10 h-10 mb-3" style={{ color: CYAN }} />
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: CYAN }}>
                {t("Interactive Fluid Simulator", "ម៉ូឌែលលំហូរអន្តរកម្ម")}
              </p>
              <p className="max-w-md text-sm leading-relaxed" style={{ color: TEXT_DIM }}>
                {t(
                  "Reserved space for an interactive wind-tunnel: drag obstacles into the flow and watch the streamlines bend in real time.",
                  "កន្លែងដែលបានរក្សាទុកសម្រាប់ផ្លូវខ្យល់អន្តរកម្ម៖ អូសវត្ថុរារាំងចូលក្នុងលំហូរ ហើយមើលខ្សែលំហូរបត់បែនក្នុងពេលវេលាជាក់ស្តែង។",
                )}
              </p>
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 2 — THE TECHNICAL VIEW
           ════════════════════════════════════════════════════════════════ */}
        <Section
          eyebrowEn="Section 2"
          eyebrowKh="ផ្នែកទី ២"
          titleEn="The Technical View"
          titleKh="ផ្នែកបច្ចេកទេស"
          icon={Sigma}
          accent={CYAN}
        >
          {/* The equation — large, monospace, glowing */}
          <div
            className="rounded-2xl p-6 sm:p-10 mb-8 text-center"
            style={{
              background: PANEL,
              border: `1px solid ${CYAN}60`,
              boxShadow: glow(CYAN, 6),
            }}
          >
            <p className="text-[11px] font-mono uppercase tracking-widest mb-4" style={{ color: TEXT_MUTED }}>
              {t("The Equation", "សមីការ")}
            </p>
            <div
              className="font-mono text-2xl sm:text-3xl md:text-4xl leading-snug select-all"
              style={{ color: SKY, textShadow: glow(SKY, 6) }}
              aria-label="Navier-Stokes equation: rho times open paren partial u over partial t plus u dot grad u close paren equals minus grad p plus mu times grad squared u plus f"
            >
              <span style={{ color: GOLD }}>ρ</span>
              <span>(</span>
              <span style={{ color: ELECTRIC }}>∂u/∂t</span>
              <span> + </span>
              <span style={{ color: ELECTRIC }}>u·∇u</span>
              <span>) = </span>
              <span style={{ color: "#fb7185" }}>−∇p</span>
              <span> + </span>
              <span style={{ color: "#a78bfa" }}>μ∇²u</span>
              <span> + </span>
              <span style={{ color: "#34d399" }}>f</span>
            </div>
            <p className="mt-4 text-xs sm:text-sm" style={{ color: TEXT_MUTED }}>
              {t(
                "Each colored term is a physical force. Read the breakdown below.",
                "ពាក្យពណ៌នីមួយៗគឺជាកម្លាំងរូបវិទ្យាមួយ។ អានការពន្យល់ខាងក្រោម។",
              )}
            </p>
          </div>

          {/* Term breakdown */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            <Term
              icon={Gauge}
              symbol="ρ(∂u/∂t + u·∇u)"
              symbolColor={GOLD}
              labelEn="Inertia"
              labelKh="និចលភាព"
              bodyEn="How the fluid's speed changes over time, and how it carries its own momentum from one place to another."
              bodyKh="របៀបដែលល្បឿនរបស់សារធាតុរាវផ្លាស់ប្ដូរតាមពេលវេលា និងរបៀបដែលវាដឹកនាំសន្ទុះរបស់វាពីកន្លែងមួយទៅកន្លែងមួយទៀត។"
            />
            <Term
              icon={Wind}
              symbol="−∇p"
              symbolColor="#fb7185"
              labelEn="Pressure Gradient"
              labelKh="គម្លាតសម្ពាធ"
              bodyEn="Fluids always move from high pressure to low pressure. The minus sign means the push goes from where it's crowded to where it's not."
              bodyKh="សារធាតុរាវតែងតែផ្លាស់ទីពីសម្ពាធខ្ពស់ទៅសម្ពាធទាប។ សញ្ញាដក មានន័យថាការរុញចេញពីកន្លែងដែលច្រើនទៅកន្លែងដែលតិច។"
            />
            <Term
              icon={Droplet}
              symbol="μ∇²u"
              symbolColor="#a78bfa"
              labelEn="Viscosity"
              labelKh="ភាពខាប់"
              bodyEn="The internal friction between fluid layers. Honey has a huge μ and flows slowly; water has a small μ; air has a tiny μ."
              bodyKh="កកិតផ្ទៃក្នុងរវាងស្រទាប់សារធាតុរាវ។ ទឹកឃ្មុំមាន μ ធំ ហើយហូរយឺត ទឹកមាន μ តូច ខ្យល់មាន μ តូចបំផុត។"
            />
            <Term
              icon={Zap}
              symbol="f"
              symbolColor="#34d399"
              labelEn="External Forces"
              labelKh="កម្លាំងខាងក្រៅ"
              bodyEn="Gravity, electromagnetic pulls, or anything else from outside the fluid that tugs on every parcel of it."
              bodyKh="ទំនាញ កម្លាំងអេឡិចត្រូម៉ាញេទិក ឬអ្វីផ្សេងទៀតពីខាងក្រៅសារធាតុរាវ ដែលទាញលើគ្រប់ផ្នែករបស់វា។"
            />
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 3 — THE MILLION DOLLAR PRIZE
           ════════════════════════════════════════════════════════════════ */}
        <Section
          eyebrowEn="Section 3"
          eyebrowKh="ផ្នែកទី ៣"
          titleEn="The Million Dollar Prize"
          titleKh="រង្វាន់មួយលានដុល្លារ"
          icon={Trophy}
          accent={GOLD}
        >
          <div
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
            style={{
              background: `linear-gradient(135deg, ${PANEL} 0%, ${PANEL_SOFT} 100%)`,
              border: `2px solid ${GOLD}`,
              boxShadow: glow(GOLD, 8),
            }}
          >
            {/* Faint dollar-sign watermark */}
            <div
              aria-hidden
              className="absolute -right-6 -top-6 text-[180px] font-bold leading-none select-none pointer-events-none"
              style={{ color: GOLD, opacity: 0.07 }}
            >
              $
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-7 h-7 flex-shrink-0" style={{ color: GOLD, filter: `drop-shadow(${glow(GOLD, 4)})` }} />
                <p className="text-xs font-mono uppercase tracking-widest" style={{ color: GOLD }}>
                  {t("Millennium Prize Problem", "បញ្ហារង្វាន់សហស្សវត្សរ៍")}
                </p>
              </div>

              <h3
                className="text-2xl sm:text-4xl font-bold mb-2"
                style={{ color: GOLD, textShadow: glow(GOLD, 6) }}
              >
                $1,000,000
              </h3>
              <p className="font-khmer text-base sm:text-lg mb-5" style={{ color: SKY }}>
                {t("Clay Mathematics Institute", "វិទ្យាស្ថានគណិតវិទ្យា Clay")}
              </p>

              <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: TEXT }}>
                {t(
                  "Navier-Stokes is one of the seven Millennium Prize Problems — the most prestigious open questions in mathematics. Anyone who can prove that smooth, predictable solutions to the equation always exist in three dimensions (or find a single counter-example) will win one million U.S. dollars from the Clay Mathematics Institute.",
                  "Navier-Stokes គឺជាមួយក្នុងចំណោមបញ្ហារង្វាន់សហស្សវត្សរ៍ទាំងប្រាំពីរ — សំណួរបើកចំហដ៏មានកិត្តិយសបំផុតក្នុងគណិតវិទ្យា។ អ្នកណាដែលអាចបង្ហាញថាដំណោះស្រាយរលូននិងអាចទាយទុកជាមុនបានសម្រាប់សមីការនេះមានជានិច្ចក្នុងបី​វិមាត្រ (ឬរកឃើញឧទាហរណ៍ផ្ទុយតែមួយ) នឹងឈ្នះមួយលានដុល្លារអាមេរិកពីវិទ្យាស្ថានគណិតវិទ្យា Clay។",
                )}
              </p>

              <div
                className="flex items-start gap-3 rounded-xl p-4 mt-4"
                style={{ background: "rgba(251, 191, 36, 0.08)", border: `1px solid ${GOLD}40` }}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: TEXT_DIM }}>
                  {t(
                    "The prize has been waiting since the year 2000. We use Navier-Stokes every day to design airplanes, predict the weather, and model blood flow — but no one on Earth has yet proved it always behaves nicely. The next breakthrough could come from anywhere — including a classroom in Cambodia.",
                    "រង្វាន់នេះបានរង់ចាំតាំងពីឆ្នាំ ២០០០ មក។ យើងប្រើ Navier-Stokes ជារៀងរាល់ថ្ងៃដើម្បីរចនាយន្តហោះ ព្យាករអាកាសធាតុ និងគំរូលំហូរឈាម — ប៉ុន្តែគ្មាននរណាម្នាក់នៅលើផែនដីបានបង្ហាញឱ្យឃើញថាវាដំណើរការល្អជាប់លាប់នោះទេ។ ការរកឃើញបន្ទាប់អាចមកពីកន្លែងណាក៏បាន — រួមទាំងថ្នាក់រៀននៅកម្ពុជាផងដែរ។",
                  )}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer breadcrumb back */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: `${CYAN}20` }}>
          <Link
            href="/science"
            className="inline-flex items-center gap-2 text-sm font-mono hover:opacity-80 transition-opacity"
            style={{ color: CYAN }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to Science", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  SECTION WRAPPER
 * ══════════════════════════════════════════════════════════════════════════ */

function Section({
  eyebrowEn,
  eyebrowKh,
  titleEn,
  titleKh,
  icon: Icon,
  accent,
  children,
}: {
  eyebrowEn: string;
  eyebrowKh: string;
  titleEn: string;
  titleKh: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14 sm:mb-20">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5" style={{ color: accent, filter: `drop-shadow(${glow(accent, 3)})` }} />
        <p className="text-[11px] font-mono uppercase tracking-widest" style={{ color: accent }}>
          <span>{eyebrowEn}</span>
          <span className="mx-2 opacity-50">·</span>
          <span className="font-khmer">{eyebrowKh}</span>
        </p>
      </div>
      <h2
        className="text-2xl sm:text-4xl font-bold mb-1"
        style={{ color: TEXT, textShadow: glow(accent, 4) }}
      >
        {titleEn}
      </h2>
      <h3 className="font-khmer text-lg sm:text-2xl mb-6" style={{ color: accent }}>
        {titleKh}
      </h3>
      {children}
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  ANALOGY CARD (Section 1)
 * ══════════════════════════════════════════════════════════════════════════ */

function Analogy({
  icon: Icon,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  return (
    <div
      className="rounded-xl p-5 transition-transform hover:-translate-y-0.5"
      style={{ background: PANEL, border: `1px solid ${ELECTRIC}30` }}
    >
      <Icon className="w-6 h-6 mb-3" style={{ color: SKY }} />
      <p className="font-bold text-sm sm:text-base mb-1" style={{ color: TEXT }}>
        {titleEn}
      </p>
      <p className="font-khmer text-sm mb-3" style={{ color: SKY }}>
        {titleKh}
      </p>
      <p className="text-xs sm:text-sm leading-relaxed mb-2" style={{ color: TEXT_DIM }}>
        {bodyEn}
      </p>
      <p className="font-khmer text-xs sm:text-sm leading-relaxed" style={{ color: TEXT_DIM }}>
        {bodyKh}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
 *  TERM CARD (Section 2)
 * ══════════════════════════════════════════════════════════════════════════ */

function Term({
  icon: Icon,
  symbol,
  symbolColor,
  labelEn,
  labelKh,
  bodyEn,
  bodyKh,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  symbol: string;
  symbolColor: string;
  labelEn: string;
  labelKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: PANEL, border: `1px solid ${ELECTRIC}30` }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" style={{ color: symbolColor }} />
          <p className="font-bold text-sm sm:text-base" style={{ color: TEXT }}>
            {labelEn}
            <span className="mx-2 opacity-40">·</span>
            <span className="font-khmer" style={{ color: symbolColor }}>{labelKh}</span>
          </p>
        </div>
      </div>

      <div
        className="font-mono text-base sm:text-lg rounded-md px-3 py-2 mb-3 inline-block"
        style={{
          background: "rgba(0,0,0,0.35)",
          color: symbolColor,
          border: `1px solid ${symbolColor}40`,
          textShadow: glow(symbolColor, 3),
        }}
      >
        {symbol}
      </div>

      <p className="text-xs sm:text-sm leading-relaxed mb-2" style={{ color: TEXT_DIM }}>
        {bodyEn}
      </p>
      <p className="font-khmer text-xs sm:text-sm leading-relaxed" style={{ color: TEXT_DIM }}>
        {bodyKh}
      </p>
    </div>
  );
}
