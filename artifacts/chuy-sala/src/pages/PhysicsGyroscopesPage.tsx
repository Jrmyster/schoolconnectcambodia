import { Link } from "wouter";
import {
  ArrowLeft,
  Orbit,
  Compass,
  Sigma,
  Bike,
  Rocket,
  Sparkles,
  Sun,
  Zap,
  Globe2,
  ShieldAlert,
  Gauge,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Page surface — dark blueprint grid ─────────────────────────────────────
const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#020617",
  backgroundImage:
    "linear-gradient(rgba(34, 211, 238, 0.10) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(34, 211, 238, 0.10) 1px, transparent 1px), " +
    "linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};

// Card surface — deep navy with subtle cyan grid for that schematic feel.
const CARD_BG: React.CSSProperties = {
  backgroundColor: "#0f172a",
  backgroundImage:
    "linear-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(34, 211, 238, 0.08) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-cyan-400/40" : "border-cyan-300/70";
  const size = subtle ? "w-3 h-3" : "w-4 h-4";
  return (
    <>
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 left-2 ${size} border-t-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 right-2 ${size} border-t-2 border-r-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 ${size} border-b-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 ${size} border-b-2 border-r-2 ${stroke}`} />
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────
export function PhysicsGyroscopesPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/physics"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300/90 hover:text-cyan-200 transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
        </Link>

        {/* ── Header ──────────────────────────────────────────── */}
        <header
          className="relative overflow-hidden rounded-3xl px-6 sm:px-10 py-9 sm:py-12 mb-10 shadow-lg text-white"
          style={{
            backgroundImage: "linear-gradient(135deg, #020617 0%, #0c4a6e 55%, #155e75 100%)",
            backgroundColor: "#020617",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(103, 232, 249, 0.18) 1px, transparent 1px), " +
                "linear-gradient(90deg, rgba(103, 232, 249, 0.18) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-300/15 border-2 border-cyan-300/70 text-cyan-200 flex items-center justify-center flex-shrink-0">
              <Orbit className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-200/90 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Physics Hub", "មជ្ឈមណ្ឌលរូបវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span className="text-cyan-100">M-06</span>
              </div>
              <h1
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t("Gyroscopes: The Magic of Spin", "ហ្គីរ៉ូស្កុប៖ មន្តអាគមនៃរង្វិល")}
              </h1>
              <p
                className={`mt-3 text-sm sm:text-base text-cyan-100/90 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {t(
                  "How a spinning wheel can stand up against gravity, hold a bicycle upright, and even steer a 400-ton space station — without using a single drop of fuel.",
                  "របៀបដែលកង់ដែលកំពុងវិលអាចឈររឹងមាំទប់ទល់ទំនាញ រក្សាកង់ឱ្យឈរត្រង់ និងសូម្បីតែបត់បែនស្ថានីយអវកាសធ្ងន់ ៤០០ តោន — ដោយមិនប្រើឥន្ធនៈសូម្បីតែមួយដំណក់។",
                )}
              </p>
              <div
                className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-cyan-200/70 ${kh ? "font-khmer text-xs" : ""}`}
              >
                <span>{t("CARDS: 03", "កាត៖ ០៣")}</span>
                <span className="opacity-40">|</span>
                <span>{t("TOPIC: ANGULAR MOMENTUM", "ប្រធានបទ៖ ម៉ូម៉ង់ប្រដាប់រង្វិល")}</span>
                <span className="opacity-40">|</span>
                <span>{t("LANG: EN / ខ្មែរ", "ភាសា៖ EN / ខ្មែរ")}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Card 1: Invisible Wall ──────────────────────────── */}
        <InvisibleWallCard kh={kh} t={t} />

        {/* ── Card 2: Bicycle Rule ────────────────────────────── */}
        <BicycleRuleCard kh={kh} t={t} />

        {/* ── Card 3: Steering a Spaceship ────────────────────── */}
        <SpaceshipSteeringCard kh={kh} t={t} />

        {/* ── Footer ──────────────────────────────────────────── */}
        <p
          className={`mt-10 text-center text-xs sm:text-sm text-cyan-200/60 ${kh ? "font-khmer leading-loose" : ""}`}
        >
          {t(
            "Spin is not just motion — it's an invisible force that holds the universe together, from cycling bicycles on Earth to spinning planets in orbit.",
            "ការវិលមិនមែនគ្រាន់តែជាចលនាទេ — វាជាកម្លាំងដែលមើលមិនឃើញ ដែលរក្សាសកលលោកឱ្យនៅជាមួយគ្នា ចាប់ពីកង់ជិះនៅលើផែនដី រហូតដល់ភពកំពុងវិលនៅក្នុងគន្លង។",
          )}
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Card 1 — The Invisible Wall (Angular Momentum)
// ────────────────────────────────────────────────────────────────────────────
function InvisibleWallCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section
      id="invisible-wall"
      className="relative rounded-2xl border-2 border-cyan-400/50 shadow-lg shadow-cyan-900/30 overflow-hidden mb-8 scroll-mt-24 text-cyan-50"
      style={CARD_BG}
    >
      <CornerMarks subtle />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-cyan-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("CARD 01 · THE CONCEPT", "កាត ០១ · គំនិត")}
            </div>
            <h2
              className={`font-display text-xl sm:text-2xl font-bold text-cyan-50 leading-tight ${kh ? "font-khmer" : ""}`}
            >
              {t("The Invisible Wall", "ជញ្ជាំងដែលមើលមិនឃើញ")}
            </h2>
            <p className={`text-xs sm:text-sm font-khmer text-cyan-200/80 mt-0.5`}>
              {t("ជញ្ជាំងដែលមើលមិនឃើញ", "The Invisible Wall")}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* ── Left: explanation ── */}
          <div className="space-y-4">
            <p className={`text-sm sm:text-base text-cyan-100/95 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "When a heavy object spins very fast, it doesn't just want to move — it wants to keep spinning in the exact same direction. This is called",
                "ពេលដែលវត្ថុធ្ងន់មួយវិលលឿនខ្លាំង វាមិនត្រឹមតែចង់ផ្លាស់ទីទេ — វាចង់បន្តវិលក្នុងទិសដៅដូចគ្នាបេះបិទ។ នេះគេហៅថា",
              )}{" "}
              <strong className="text-cyan-300 font-bold">
                {t("Angular Momentum", "ម៉ូម៉ង់ប្រដាប់រង្វិល")}
              </strong>
              {t(".", "។")}
            </p>
            <p className={`text-sm sm:text-base text-cyan-100/95 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Try to tilt it sideways and the spinning object will fight you — as if it had hit an invisible wall. The faster and heavier the spin, the harder the wall pushes back.",
                "សាកល្បងផ្អៀងវាទៅចំហៀង នោះវត្ថុដែលកំពុងវិលនឹងតវ៉ាជាមួយអ្នក — ដូចជាវាបានប៉ះនឹងជញ្ជាំងដែលមើលមិនឃើញ។ កាន់តែលឿន និងកាន់តែធ្ងន់ ជញ្ជាំងនោះកាន់តែរុញត្រឡប់មកវិញខ្លាំង។",
              )}
            </p>

            <div className="rounded-xl bg-cyan-950/60 border border-cyan-400/30 px-4 py-3">
              <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Sparkles className="w-3.5 h-3.5" />
                {t("EVERYDAY EXAMPLE", "ឧទាហរណ៍ប្រចាំថ្ងៃ")}
              </div>
              <p className={`text-xs sm:text-sm text-cyan-100 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "A spinning top stays balanced on its tiny point only while it spins fast. When the spin slows, the invisible wall fades — and gravity wins.",
                  "ស្បឹនដែលកំពុងវិលនៅឈរនឹងលើចុងតូចរបស់វា លុះត្រាតែវាវិលលឿន។ នៅពេលដែលការវិលថយចុះ ជញ្ជាំងដែលមើលមិនឃើញនោះក៏រលាយបាត់ — ហើយទំនាញឈ្នះ។",
                )}
              </p>
            </div>
          </div>

          {/* ── Right: math + visual ── */}
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-950/60 border-2 border-cyan-400/40 p-5 text-center">
              <div className={`flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-300 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Sigma className="w-3.5 h-3.5" />
                {t("THE FORMULA", "រូបមន្ត")}
              </div>
              <div className="text-cyan-100 text-2xl sm:text-3xl py-2">
                <BlockMath math={String.raw`L = I \, \omega`} />
              </div>
              <div className={`mt-3 text-[11px] sm:text-xs text-cyan-200/85 font-mono leading-relaxed`}>
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="text-cyan-300">L</span>
                  <span className="opacity-60">=</span>
                  <span className={kh ? "font-khmer" : ""}>{t("Angular Momentum", "ម៉ូម៉ង់ប្រដាប់រង្វិល")}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 flex-wrap mt-1">
                  <span className="text-cyan-300">I</span>
                  <span className="opacity-60">=</span>
                  <span className={kh ? "font-khmer" : ""}>{t("Mass / Shape", "ម៉ាស់ / រូបរាង")}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 flex-wrap mt-1">
                  <span className="text-cyan-300">
                    <InlineMath math={String.raw`\omega`} />
                  </span>
                  <span className="opacity-60">=</span>
                  <span className={kh ? "font-khmer" : ""}>{t("Spin Speed", "ល្បឿនវិល")}</span>
                </div>
              </div>
            </div>

            {/* Spinning wheel SVG */}
            <div className="rounded-xl bg-slate-950/40 border border-cyan-400/20 p-4 flex flex-col items-center">
              <SpinningWheelSvg />
              <div className={`mt-2 text-[11px] text-cyan-300/90 font-mono text-center ${kh ? "font-khmer text-xs" : ""}`}>
                {t("Heavier wheel + faster spin = stronger 'wall'", "កង់ធ្ងន់ជាង + វិលលឿនជាង = 'ជញ្ជាំង' រឹងមាំជាង")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Card 2 — The Bicycle Rule
// ────────────────────────────────────────────────────────────────────────────
function BicycleRuleCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section
      id="bicycle-rule"
      className="relative rounded-2xl border-2 border-cyan-400/50 shadow-lg shadow-cyan-900/30 overflow-hidden mb-8 scroll-mt-24 text-cyan-50"
      style={CARD_BG}
    >
      <CornerMarks subtle />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 text-white flex items-center justify-center shadow-md">
            <Bike className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-cyan-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("CARD 02 · EVERYDAY LIFE", "កាត ០២ · ជីវិតប្រចាំថ្ងៃ")}
            </div>
            <h2
              className={`font-display text-xl sm:text-2xl font-bold text-cyan-50 leading-tight ${kh ? "font-khmer" : ""}`}
            >
              {t("The Bicycle Rule", "ច្បាប់កង់")}
            </h2>
            <p className={`text-xs sm:text-sm font-khmer text-cyan-200/80 mt-0.5`}>
              {t("ច្បាប់កង់", "The Bicycle Rule")}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-6 items-stretch">
          {/* ── Left: stationary bike (falls) ── */}
          <div className="md:col-span-1 rounded-xl bg-rose-950/40 border-2 border-rose-400/40 p-4 flex flex-col items-center justify-center text-center">
            <BikeFallingSvg />
            <div className={`mt-2 text-[10px] font-mono uppercase tracking-widest text-rose-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("STILL = FALLS", "នឹង = ដួល")}
            </div>
            <p className={`mt-1 text-[11px] sm:text-xs text-rose-100/90 leading-snug ${kh ? "font-khmer leading-relaxed" : ""}`}>
              {t("No spin, no balance.", "គ្មានវិល គ្មានសមតុល្យ។")}
            </p>
          </div>

          {/* ── Middle: explanation ── */}
          <div className="md:col-span-3 space-y-3">
            <p className={`text-sm sm:text-base text-cyan-100/95 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "When a bicycle is standing perfectly still, it falls over almost immediately — just like a coin balanced on its edge. There is nothing to keep it upright.",
                "ពេលដែលកង់ឈរនឹងស្ងៀមឥតរញ្ជួយ វាដួលស្ទើរតែភ្លាមៗ — ដូចជាកាក់ដែលឈរលើគែមរបស់វា។ គ្មានអ្វីដើម្បីរក្សាវាឱ្យឈរត្រង់ឡើយ។",
              )}
            </p>
            <p className={`text-sm sm:text-base text-cyan-100/95 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "But the moment you start riding, each wheel becomes a small gyroscope. The angular momentum of the spinning wheels resists every wobble and",
                "ប៉ុន្តែភ្លាមៗដែលអ្នកចាប់ផ្តើមជិះ កង់នីមួយៗក្លាយជាហ្គីរ៉ូស្កុបតូចមួយ។ ម៉ូម៉ង់ប្រដាប់រង្វិលរបស់កង់ដែលកំពុងវិលទប់ទល់នឹងការរើររាល់លើក និង",
              )}{" "}
              <strong className="text-emerald-300 font-bold">
                {t("creates the stability that holds you upright", "បង្កើតស្ថេរភាពដែលរក្សាអ្នកឱ្យឈរត្រង់")}
              </strong>
              {t(".", "។")}
            </p>
            <div className="rounded-xl bg-emerald-950/40 border border-emerald-400/30 px-4 py-3">
              <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Gauge className="w-3.5 h-3.5" />
                {t("RULE OF THUMB", "ច្បាប់សាមញ្ញ")}
              </div>
              <p className={`text-xs sm:text-sm text-emerald-100 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Faster pedaling = more stable bicycle. That's why beginners are told to keep moving — slow speed feels much more wobbly than full speed!",
                  "ជាន់កង់លឿនជាង = កង់រឹងមាំជាង។ នេះហើយជាមូលហេតុដែលអ្នកជិះថ្មីៗត្រូវបានគេប្រាប់ឱ្យបន្តផ្លាស់ទី — ល្បឿនយឺតមានអារម្មណ៍រើររាលជាងល្បឿនពេញ!",
                )}
              </p>
            </div>
          </div>

          {/* ── Right: moving bike (stable) ── */}
          <div className="md:col-span-1 rounded-xl bg-emerald-950/40 border-2 border-emerald-400/40 p-4 flex flex-col items-center justify-center text-center">
            <BikeRidingSvg />
            <div className={`mt-2 text-[10px] font-mono uppercase tracking-widest text-emerald-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("SPINS = STABLE", "វិល = រឹងមាំ")}
            </div>
            <p className={`mt-1 text-[11px] sm:text-xs text-emerald-100/90 leading-snug ${kh ? "font-khmer leading-relaxed" : ""}`}>
              {t("Spin = balance.", "វិល = សមតុល្យ។")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Card 3 — Steering a Spaceship (ISS CMGs)
// ────────────────────────────────────────────────────────────────────────────
function SpaceshipSteeringCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section
      id="spaceship-steering"
      className="relative rounded-2xl border-2 border-cyan-400/50 shadow-lg shadow-cyan-900/30 overflow-hidden mb-8 scroll-mt-24 text-cyan-50"
      style={CARD_BG}
    >
      <CornerMarks subtle />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-600 text-white flex items-center justify-center shadow-md">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-cyan-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("CARD 03 · ENGINEERING", "កាត ០៣ · វិស្វកម្ម")}
            </div>
            <h2
              className={`font-display text-xl sm:text-2xl font-bold text-cyan-50 leading-tight ${kh ? "font-khmer" : ""}`}
            >
              {t("Steering a Spaceship", "ការបើកបរយានអវកាស")}
            </h2>
            <p className={`text-xs sm:text-sm font-khmer text-cyan-200/80 mt-0.5`}>
              {t("ការបើកបរយានអវកាស", "Steering a Spaceship")}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* ── Left: ISS visual ── */}
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-950/60 border border-cyan-400/30 p-4">
              <ISSWithCMGSvg />
              <div className={`mt-3 flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Globe2 className="w-3.5 h-3.5" />
                {t("INTERNATIONAL SPACE STATION", "ស្ថានីយ៍អវកាសអន្តរជាតិ")}
              </div>
              <p className={`mt-1 text-center text-[11px] sm:text-xs text-cyan-100/90 leading-snug ${kh ? "font-khmer leading-relaxed" : ""}`}>
                {t(
                  "400 tons · 109 m wide · orbits Earth at 27,600 km/h",
                  "៤០០ តោន · ទទឹង ១០៩ ម៉ែត្រ · គោចរផែនដីដោយល្បឿន ២៧,៦០០ គ.ម./ម៉ោង",
                )}
              </p>
            </div>

            <div className="rounded-xl bg-amber-950/40 border border-amber-400/30 px-4 py-3">
              <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-amber-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <ShieldAlert className="w-3.5 h-3.5" />
                {t("THE PROBLEM", "បញ្ហា")}
              </div>
              <p className={`text-xs sm:text-sm text-amber-100 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "If the ISS used rocket thrusters every time it needed to turn, it would burn through fuel in weeks — and there are no gas stations in space.",
                  "បើស្ថានីយ៍អវកាសប្រើគ្រឿងបាញ់រ៉ុក្កែតរាល់ពេលដែលវាត្រូវបត់ វានឹងអស់ឥន្ធនៈក្នុងរយៈពេលប៉ុន្មានសប្តាហ៍ — ហើយគ្មានស្ថានីយ៍ប្រេងឥន្ធនៈនៅក្នុងអវកាសទេ។",
                )}
              </p>
            </div>
          </div>

          {/* ── Right: explanation ── */}
          <div className="space-y-4">
            <div>
              <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Orbit className="w-3.5 h-3.5" />
                {t("THE SOLUTION · CONTROL MOMENT GYROSCOPES (CMGs)", "ដំណោះស្រាយ · ហ្គីរ៉ូស្កុបបញ្ជាម៉ូម៉ង់ (CMGs)")}
              </div>
              <p className={`text-sm sm:text-base text-cyan-100/95 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Hidden inside the station are four massive, heavy wheels that spin constantly at 6,600 RPM. Each weighs about 100 kg.",
                  "លាក់នៅខាងក្នុងស្ថានីយ៍មានកង់ធ្ងន់សម្បើមចំនួន ៤ ដែលបន្តវិលឥតឈប់នៅល្បឿន ៦,៦០០ វគ្គក្នុងមួយនាទី។ កង់នីមួយៗមានទម្ងន់ប្រហែល ១០០ គីឡូក្រាម។",
                )}
              </p>
            </div>

            <ol className={`space-y-2.5 text-sm sm:text-base text-cyan-100/95 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <CMGStep n={1} accent="cyan">
                {t(
                  "Solar panels generate electricity from sunlight.",
                  "បន្ទះថាមពលពន្លឺព្រះអាទិត្យបង្កើតអគ្គិសនីពីពន្លឺថ្ងៃ។",
                )}
              </CMGStep>
              <CMGStep n={2} accent="cyan">
                {t(
                  "Motors use that electricity to gently tilt the spinning wheels.",
                  "ម៉ូទ័រប្រើអគ្គិសនីនោះដើម្បីផ្អៀងកង់ដែលកំពុងវិលដោយថ្នមៗ។",
                )}
              </CMGStep>
              <CMGStep n={3} accent="violet">
                {t(
                  "The wheel's invisible wall pushes back — and Newton's Third Law forces the entire 400-ton station to rotate the opposite way.",
                  "ជញ្ជាំងមើលមិនឃើញរបស់កង់រុញត្រឡប់មកវិញ — ហើយច្បាប់ទីបីរបស់ញូតុនបង្ខំស្ថានីយ៍ទាំងមូលទម្ងន់ ៤០០ តោន ឱ្យបង្វិលក្នុងទិសផ្ទុយ។",
                )}
              </CMGStep>
            </ol>

            <div className="rounded-xl bg-cyan-950/60 border-2 border-cyan-400/40 px-4 py-3">
              <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Sun className="w-3.5 h-3.5" />
                {t("THE RESULT", "លទ្ធផល")}
              </div>
              <p className={`text-xs sm:text-sm text-cyan-100 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "The ISS turns and points wherever astronauts need it — using only sunlight. Zero fuel. Zero exhaust. Pure spinning physics.",
                  "ស្ថានីយ៍អវកាសបង្វិល និងតម្រង់ទៅកន្លែងណាដែលអវកាសយានិកត្រូវការ — ដោយប្រើតែពន្លឺថ្ងៃ។ ឥន្ធនៈ ០។ ផ្សែង ០។ រូបវិទ្យានៃការវិលសុទ្ធសាធ។",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Helper components & SVGs
// ────────────────────────────────────────────────────────────────────────────

function CMGStep({
  n,
  accent,
  children,
}: {
  n: number;
  accent: "cyan" | "violet";
  children: React.ReactNode;
}) {
  const ring =
    accent === "cyan"
      ? "border-cyan-400/60 bg-cyan-500/15 text-cyan-200"
      : "border-violet-400/60 bg-violet-500/15 text-violet-200";
  return (
    <li className="flex items-start gap-3">
      <span
        className={`flex-shrink-0 w-7 h-7 rounded-full border-2 ${ring} flex items-center justify-center text-xs font-mono font-bold mt-0.5`}
        aria-hidden="true"
      >
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

// Spinning wheel illustration — top-down view of a heavy disc with motion arcs.
function SpinningWheelSvg() {
  return (
    <svg
      viewBox="0 0 200 140"
      className="w-full max-w-[280px] h-auto"
      role="img"
      aria-label="A heavy spinning wheel with rotation arrows"
    >
      {/* shaft / axle */}
      <line x1="100" y1="20" x2="100" y2="120" stroke="#67e8f9" strokeWidth="2" />
      <circle cx="100" cy="20" r="4" fill="#0f172a" stroke="#67e8f9" strokeWidth="2" />
      <circle cx="100" cy="120" r="4" fill="#0f172a" stroke="#67e8f9" strokeWidth="2" />
      {/* wheel disc (ellipse for perspective) */}
      <ellipse cx="100" cy="70" rx="70" ry="22" fill="#155e75" stroke="#22d3ee" strokeWidth="2.5" />
      <ellipse cx="100" cy="70" rx="60" ry="18" fill="#0e7490" stroke="#67e8f9" strokeWidth="1" opacity="0.7" />
      <ellipse cx="100" cy="70" rx="10" ry="3" fill="#0f172a" stroke="#67e8f9" strokeWidth="1.5" />
      {/* spin arrows */}
      <path
        d="M 30 70 A 70 22 0 0 1 100 48"
        fill="none"
        stroke="#a5f3fc"
        strokeWidth="2"
        strokeDasharray="3 2"
      />
      <polygon points="100,46 95,52 105,52" fill="#a5f3fc" />
      <path
        d="M 170 70 A 70 22 0 0 1 100 92"
        fill="none"
        stroke="#a5f3fc"
        strokeWidth="2"
        strokeDasharray="3 2"
      />
      <polygon points="100,94 95,88 105,88" fill="#a5f3fc" />
      {/* omega label */}
      <text x="100" y="14" textAnchor="middle" fill="#67e8f9" fontSize="11" fontFamily="monospace" fontWeight="bold">
        ω
      </text>
    </svg>
  );
}

// Stationary bicycle that's tipped over.
function BikeFallingSvg() {
  return (
    <svg viewBox="0 0 100 80" className="w-20 h-16" role="img" aria-label="A stationary bicycle falling over">
      <g transform="rotate(-35 50 60)">
        <circle cx="30" cy="55" r="14" fill="none" stroke="#fda4af" strokeWidth="2.5" />
        <circle cx="70" cy="55" r="14" fill="none" stroke="#fda4af" strokeWidth="2.5" />
        <line x1="30" y1="55" x2="70" y2="55" stroke="#fda4af" strokeWidth="2" />
        <line x1="50" y1="55" x2="50" y2="35" stroke="#fda4af" strokeWidth="2" />
        <line x1="50" y1="35" x2="65" y2="30" stroke="#fda4af" strokeWidth="2" />
      </g>
      {/* fall direction arrow */}
      <path d="M 75 25 Q 85 35 80 50" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
      <polygon points="80,50 76,45 84,45" fill="#f87171" />
    </svg>
  );
}

// Riding bicycle — upright with motion lines.
function BikeRidingSvg() {
  return (
    <svg viewBox="0 0 100 80" className="w-20 h-16" role="img" aria-label="A bicycle being ridden, upright and stable">
      <circle cx="25" cy="55" r="14" fill="none" stroke="#6ee7b7" strokeWidth="2.5" />
      <circle cx="75" cy="55" r="14" fill="none" stroke="#6ee7b7" strokeWidth="2.5" />
      {/* spin arcs inside wheels */}
      <path d="M 18 55 A 7 7 0 0 1 32 55" fill="none" stroke="#a7f3d0" strokeWidth="1.5" />
      <path d="M 68 55 A 7 7 0 0 1 82 55" fill="none" stroke="#a7f3d0" strokeWidth="1.5" />
      <line x1="25" y1="55" x2="75" y2="55" stroke="#6ee7b7" strokeWidth="2" />
      <line x1="50" y1="55" x2="50" y2="30" stroke="#6ee7b7" strokeWidth="2" />
      <line x1="50" y1="30" x2="65" y2="25" stroke="#6ee7b7" strokeWidth="2" />
      {/* motion lines */}
      <line x1="2" y1="35" x2="12" y2="35" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="2" y1="45" x2="14" y2="45" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="2" y1="55" x2="10" y2="55" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

// ISS schematic with internal CMG wheels.
function ISSWithCMGSvg() {
  return (
    <svg
      viewBox="0 0 320 180"
      className="w-full max-w-[420px] h-auto mx-auto"
      role="img"
      aria-label="The International Space Station with control moment gyroscope wheels inside"
    >
      {/* solar panels (left) */}
      <rect x="10" y="60" width="60" height="14" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
      <rect x="10" y="80" width="60" height="14" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
      <line x1="10" y1="60" x2="70" y2="94" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5" />
      <line x1="10" y1="94" x2="70" y2="60" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5" />
      {/* solar panels (right) */}
      <rect x="250" y="60" width="60" height="14" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
      <rect x="250" y="80" width="60" height="14" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
      <line x1="250" y1="60" x2="310" y2="94" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5" />
      <line x1="250" y1="94" x2="310" y2="60" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5" />
      {/* truss beam */}
      <rect x="70" y="74" width="180" height="6" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
      {/* main module body */}
      <rect x="120" y="60" width="80" height="34" rx="6" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      {/* sun */}
      <circle cx="35" cy="30" r="9" fill="#fde047" />
      <g stroke="#fde047" strokeWidth="1.5" strokeLinecap="round">
        <line x1="35" y1="14" x2="35" y2="8" />
        <line x1="35" y1="46" x2="35" y2="52" />
        <line x1="19" y1="30" x2="13" y2="30" />
        <line x1="51" y1="30" x2="57" y2="30" />
        <line x1="24" y1="19" x2="20" y2="15" />
        <line x1="46" y1="19" x2="50" y2="15" />
        <line x1="24" y1="41" x2="20" y2="45" />
        <line x1="46" y1="41" x2="50" y2="45" />
      </g>
      {/* sunlight to panels */}
      <line x1="44" y1="33" x2="14" y2="60" stroke="#fde047" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      {/* CMG callout box */}
      <rect x="135" y="105" width="50" height="55" rx="6" fill="#0c4a6e" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="160" y="120" textAnchor="middle" fill="#67e8f9" fontSize="7" fontFamily="monospace" fontWeight="bold">
        CMG ARRAY
      </text>
      {/* 4 spinning gyro wheels in 2x2 grid */}
      <g>
        <ellipse cx="148" cy="135" rx="9" ry="3" fill="#155e75" stroke="#67e8f9" strokeWidth="1.2" />
        <line x1="148" y1="129" x2="148" y2="141" stroke="#67e8f9" strokeWidth="1" />
        <ellipse cx="172" cy="135" rx="9" ry="3" fill="#155e75" stroke="#67e8f9" strokeWidth="1.2" />
        <line x1="172" y1="129" x2="172" y2="141" stroke="#67e8f9" strokeWidth="1" />
        <ellipse cx="148" cy="150" rx="9" ry="3" fill="#155e75" stroke="#67e8f9" strokeWidth="1.2" />
        <line x1="148" y1="144" x2="148" y2="156" stroke="#67e8f9" strokeWidth="1" />
        <ellipse cx="172" cy="150" rx="9" ry="3" fill="#155e75" stroke="#67e8f9" strokeWidth="1.2" />
        <line x1="172" y1="144" x2="172" y2="156" stroke="#67e8f9" strokeWidth="1" />
      </g>
      {/* arrow from main body to CMG box */}
      <line x1="160" y1="94" x2="160" y2="105" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 2" />
      {/* rotation arrow around station */}
      <path
        d="M 220 50 A 60 25 0 0 1 100 50"
        fill="none"
        stroke="#a5f3fc"
        strokeWidth="1.5"
        strokeDasharray="3 2"
        opacity="0.85"
      />
      <polygon points="100,50 106,46 106,54" fill="#a5f3fc" opacity="0.85" />
      <text x="160" y="42" textAnchor="middle" fill="#67e8f9" fontSize="8" fontFamily="monospace">
        STATION ROTATES
      </text>
    </svg>
  );
}

export default PhysicsGyroscopesPage;
