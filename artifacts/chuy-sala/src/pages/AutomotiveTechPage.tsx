import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Cog,
  Wrench,
  Flame,
  Zap,
  Wind,
  Volume2,
  Gauge,
  Settings,
  Disc3,
  Compass,
  Ruler,
  CircleDot,
  Triangle,
  ShieldCheck,
  Rocket,
  Activity,
  Scaling,
  Trophy,
  MapPin,
  BatteryCharging,
  Power,
  Layers,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { lazy, Suspense } from "react";

const Engine3DViewer = lazy(() => import("@/components/automotive/Engine3DViewer"));

// ════════════════════════════════════════════════════════════════════════════
//  TEC-AUTO · Automotive Engineering: The Anatomy of a Machine
//             វិស្វកម្មយានយន្ត៖ កាយវិភាគសាស្ត្រនៃម៉ាស៊ីន
//
//   01 · The Heart            — 4-stroke engine, rotary, ignition (20 kV)
//   02 · Power & Air          — throttle (air pedal!), turbocharger, muffler
//   03 · The Drivetrain       — clutch, manual vs automatic transmission
//   04 · Control & Safety     — rack-and-pinion steering, ABS (15 Hz)
//
//   Aesthetic: garage blueprint — dark greys, brushed metal silver,
//   neon orange highlights, technical grid background, mono spec codes.
// ════════════════════════════════════════════════════════════════════════════

const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#0a0a0a",
  backgroundImage:
    "linear-gradient(rgba(251, 146, 60, 0.06) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(251, 146, 60, 0.06) 1px, transparent 1px), " +
    "linear-gradient(rgba(148, 163, 184, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(148, 163, 184, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "rgba(20, 20, 20, 0.85)",
  backgroundImage:
    "linear-gradient(rgba(251, 146, 60, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(251, 146, 60, 0.04) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

// Carbon-fiber weave variant for the High-Performance Garage section.
// Replaces the orange grid with a tighter silver/red carbon-weave pattern.
const CARD_BG_CARBON: React.CSSProperties = {
  backgroundColor: "rgba(18, 18, 18, 0.92)",
  backgroundImage:
    "linear-gradient(45deg, rgba(220, 38, 38, 0.05) 25%, transparent 25%), " +
    "linear-gradient(-45deg, rgba(203, 213, 225, 0.05) 25%, transparent 25%), " +
    "linear-gradient(45deg, transparent 75%, rgba(203, 213, 225, 0.05) 75%), " +
    "linear-gradient(-45deg, transparent 75%, rgba(220, 38, 38, 0.05) 75%)",
  backgroundSize: "10px 10px",
  backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0",
};

const SILVER = "#cbd5e1";
const ORANGE = "#fb923c";
const ORANGE_DEEP = "#ea580c";

// ── High-Performance-Garage palette (carbon fiber + racing red) ────────────
const RACING_RED = "#dc2626";       // primary racing accent
const RACING_RED_DEEP = "#991b1b";  // deeper red shadows
const RACING_RED_LIGHT = "#fca5a5"; // text highlights
const CARBON_FIBER = "#1c1917";     // deepest carbon background

function CornerMarks({ tone = "orange" }: { tone?: "orange" | "silver" | "red" }) {
  const cls =
    tone === "orange"
      ? "border-orange-500/70"
      : tone === "red"
      ? "border-red-500/70"
      : "border-slate-400/60";
  return (
    <div className="contents">
      <span aria-hidden className={`pointer-events-none absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${cls}`} />
      <span aria-hidden className={`pointer-events-none absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${cls}`} />
      <span aria-hidden className={`pointer-events-none absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 ${cls}`} />
      <span aria-hidden className={`pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 ${cls}`} />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export function AutomotiveTechPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen text-slate-100 py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG}>
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-100 transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* ─── HERO ──────────────────────────────────────────────────────── */}
        <header
          className="relative overflow-hidden rounded-3xl px-6 sm:px-10 py-9 sm:py-11 mb-10 shadow-2xl border border-orange-500/40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 88% 18%, rgba(251, 146, 60, 0.30), transparent 55%)," +
              "linear-gradient(135deg, #0a0a0a 0%, #18181b 50%, #0a0a0a 100%)," +
              "linear-gradient(rgba(251, 146, 60, 0.08) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(251, 146, 60, 0.08) 1px, transparent 1px)",
            backgroundSize: "auto, auto, 32px 32px, 32px 32px",
          }}
        >
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-500/15 border-2 border-orange-400/70 text-orange-300 flex items-center justify-center flex-shrink-0">
              <Car className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-orange-300/90 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Technology", "បច្ចេកវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span className="text-amber-200">TEC-AUTO</span>
                <span className="opacity-50">/</span>
                <span className="text-slate-300">10 {t("systems", "ប្រព័ន្ធ")}</span>
              </div>
              <h1
                data-testid="page-title"
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-slate-50 ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t(
                  "Automotive Engineering: The Anatomy of a Machine",
                  "វិស្វកម្មយានយន្ត៖ កាយវិភាគសាស្ត្រនៃម៉ាស៊ីន"
                )}
              </h1>
              <p className={`mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Roll a car onto the workshop floor and lift its skin off. Every part — from a 20,000-volt spark to a brake that pulses 15 times a second — is solving one engineering puzzle. Click open the five bays to see what's inside.",
                  "រុញឡានចូលលើផ្ទៃរោងជាងហើយលើកស្បែករបស់វាចេញ។ គ្រឿងទាំងអស់ — ចាប់ពីផ្គរ ២០,០០០ វ៉ុលទៅហ្វ្រាំងដែលលោតមួយវិនាទី ១៥ ដង — កំពុងដោះស្រាយបញ្ហាវិស្វកម្មមួយ។ បើករោងវែងទាំងប្រាំមើលពីខាងក្នុង។"
                )}
              </p>

              {/* hero shortcut chips */}
              <div className="mt-5 flex flex-wrap gap-2">
                <ShortcutChip href="#bay-heart"   en="01 · Heart"        kh="០១ · បេះដូង"     kh_={kh} />
                <ShortcutChip href="#bay-air"     en="02 · Power & Air"  kh="០២ · ថាមពល និងខ្យល់" kh_={kh} />
                <ShortcutChip href="#bay-drive"   en="03 · Drivetrain"   kh="០៣ · បញ្ជូនចលនា"  kh_={kh} />
                <ShortcutChip href="#bay-control" en="04 · Control & Safety" kh="០៤ · គ្រប់គ្រង · សុវត្ថិភាព" kh_={kh} />
                <ShortcutChip href="#bay-performance" en="05 · Performance" kh="០៥ · សមត្ថភាព" kh_={kh} />
                <ShortcutChip href="#hypercar-hall" en="★ Hall of Fame" kh="★ សាលកិត្តិយស" kh_={kh} variant="red" />
                <ShortcutChip href="#ev-revolution" en="⚡ EV Revolution" kh="⚡ បដិវត្តន៍ EV" kh_={kh} variant="cyan" />
              </div>
            </div>
          </div>
        </header>

        {/* ─── Four bays ─────────────────────────────────────────────────── */}
        <BayHeart kh={kh} t={t} />
        <BayPowerAir kh={kh} t={t} />
        <BayDrivetrain kh={kh} t={t} />
        <BayControlSafety kh={kh} t={t} />
        <BayPerformance kh={kh} t={t} />

        {/* ─── Hypercar Hall of Fame · leisure-reading showroom ─────────── */}
        <HypercarHallOfFame kh={kh} t={t} />

        {/* ─── Electric Revolution · clean-tech finale ──────────────────── */}
        <EvRevolution kh={kh} t={t} />

        {/* ─── Closing reflection ────────────────────────────────────────── */}
        <div
          className="relative mt-10 rounded-2xl border-2 border-slate-600 p-5 sm:p-7 flex items-start gap-4 overflow-hidden"
          style={CARD_BG}
          data-testid="closing-note"
        >
          <CornerMarks tone="silver" />
          <Wrench className="w-7 h-7 text-orange-300 flex-shrink-0 mt-1" />
          <div>
            <p className={`text-base sm:text-lg italic text-slate-100 ${kh ? "font-khmer leading-loose not-italic" : "leading-relaxed"}`}>
              {t(
                "“A car is a controlled explosion you can sit inside. Everything else — the gears, the brakes, the steering — is just teaching that explosion good manners.”",
                "« ឡានគឺជាការផ្ទុះមួយដែលត្រូវបានគ្រប់គ្រង ដែលអ្នកអាចអង្គុយនៅខាងក្នុង។ គ្រឿងផ្សេងទៀត — ឡេខ ហ្វ្រាំង ចង្កូត — គ្រាន់តែបង្រៀនឲ្យការផ្ទុះនោះមានឫកល្អ។ »"
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white text-sm font-bold shadow hover:bg-orange-400 transition-colors ${kh ? "font-khmer" : ""}`}
          >
            {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Shortcut chip
function ShortcutChip({
  href, en, kh, kh_, variant = "orange",
}: { href: string; en: string; kh: string; kh_: boolean; variant?: "orange" | "red" | "cyan" }) {
  const cls =
    variant === "red"
      ? "border-red-500/50 bg-red-500/10 text-red-200 hover:bg-red-500/20"
      : variant === "cyan"
      ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20"
      : "border-orange-500/40 bg-orange-500/10 text-orange-200 hover:bg-orange-500/20";
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border transition-colors ${cls} ${kh_ ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
    >
      {kh_ ? kh : en}
    </a>
  );
}

// ─── Bay header
function BayHeader({
  spec, en, kh, kh_, Icon, tone = "orange",
}: {
  spec: string; en: string; kh: string; kh_: boolean;
  Icon: React.ComponentType<{ className?: string }>;
  tone?: "orange" | "silver" | "red";
}) {
  const map: Record<string, string> = {
    orange: "text-orange-300 bg-orange-500/10 border-orange-500/50",
    silver: "text-slate-200 bg-slate-500/10 border-slate-400/40",
    red:    "text-red-300 bg-red-500/10 border-red-500/50",
  };
  const iconCls: Record<string, string> = {
    orange: "text-orange-300",
    silver: "text-slate-200",
    red:    "text-red-300",
  };
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={`font-mono text-[10px] tracking-[0.25em] uppercase rounded px-2 py-0.5 border ${map[tone]}`}>
        BAY-{spec}
      </span>
      <Icon className={`w-5 h-5 ${iconCls[tone]}`} />
      <h2 className={`text-xl sm:text-2xl font-bold text-slate-50 ${kh_ ? "font-khmer" : ""}`}>
        {kh_ ? kh : en}
      </h2>
      <Ruler className="w-4 h-4 text-slate-500 ml-1" />
      <div className="flex-1 border-t border-dashed border-slate-700" />
    </div>
  );
}

// ─── Generic part card (reused across all bays)
function PartCard({
  spec, en, kh, kh_,
  Icon, tone = "orange",
  diagram, children,
}: {
  spec: string; en: string; kh: string; kh_: boolean;
  Icon: React.ComponentType<{ className?: string }>;
  tone?: "orange" | "silver" | "amber" | "red";
  diagram?: React.ReactNode;
  children: React.ReactNode;
}) {
  const map: Record<string, string> = {
    orange: "border-orange-500/50",
    silver: "border-slate-500/60",
    amber:  "border-amber-400/60",
    red:    "border-red-500/60",
  };
  const iconBg: Record<string, string> = {
    orange: "bg-orange-500/15 text-orange-300 border-orange-400/60",
    silver: "bg-slate-500/15 text-slate-200 border-slate-400/60",
    amber:  "bg-amber-400/15 text-amber-300 border-amber-400/60",
    red:    "bg-red-500/15 text-red-300 border-red-400/60",
  };
  const cornerTone: "orange" | "silver" | "red" =
    tone === "silver" ? "silver" : tone === "red" ? "red" : "orange";
  const bgStyle = tone === "red" ? CARD_BG_CARBON : CARD_BG;
  return (
    <article
      className={`relative rounded-2xl border-2 ${map[tone]} p-4 sm:p-5 shadow-lg overflow-hidden flex flex-col`}
      style={bgStyle}
    >
      <CornerMarks tone={cornerTone} />
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center border-2 flex-shrink-0 ${iconBg[tone]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className={`text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 ${kh_ ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            PART · {spec}
          </div>
          <h3 className={`text-base sm:text-lg font-bold text-slate-50 leading-tight ${kh_ ? "font-khmer leading-loose" : ""}`}>
            {kh_ ? kh : en}
          </h3>
          {!kh_ && (
            <p className="text-[11px] font-khmer text-slate-400 mt-0.5">{kh}</p>
          )}
        </div>
      </div>
      {diagram && <div className="mb-3">{diagram}</div>}
      <div className={`text-sm text-slate-200 ${kh_ ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {children}
      </div>
    </article>
  );
}

// ─── Inline spec pill
function Spec({
  en, kh, kh_, value, tone = "orange",
}: {
  en: string; kh: string; kh_: boolean; value: string;
  tone?: "orange" | "silver" | "amber" | "red";
}) {
  const map: Record<string, string> = {
    orange: "border-orange-500/50 text-orange-200 bg-orange-500/10",
    silver: "border-slate-500/50 text-slate-200 bg-slate-500/10",
    amber:  "border-amber-400/50 text-amber-200 bg-amber-400/10",
    red:    "border-red-500/50 text-red-200 bg-red-500/10",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${map[tone]} ${kh_ ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
      <span className="opacity-70">{kh_ ? kh : en}</span>
      <span className="font-bold text-white">{value}</span>
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Bay 01 · The Heart (engines + ignition)
// ════════════════════════════════════════════════════════════════════════════

function BayHeart({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section id="bay-heart" className="mb-10 scroll-mt-24" data-testid="bay-heart">
      <BayHeader spec="01" en="The Heart — Where Fuel Becomes Force" kh="បេះដូង — កន្លែងឥន្ធនៈក្លាយជាកម្លាំង" kh_={kh} Icon={Flame} />

      <div className="grid lg:grid-cols-3 gap-4">
        {/* 4-Stroke ICE */}
        <PartCard
          spec="ICE-4"
          en="Internal Combustion Engine (4-Stroke)"
          kh="ម៉ាស៊ីនចំហេះក្នុង (៤ ជំហាន)"
          kh_={kh}
          Icon={Flame}
          tone="orange"
          diagram={<FourStrokeDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "A piston slides up and down inside a metal cylinder, repeating four steps over and over — about 50 times every second at highway speed.",
              "ស៊ីឡាំងលោតឡើងចុះក្នុងស៊ីឡាំងដែក ដោយធ្វើជំហានបួនម្ដងទៀតៗ — ប្រហែល ៥០ ដងក្នុងមួយវិនាទីនៅល្បឿនផ្លូវហាយវេ។"
            )}
          </p>
          <p>
            {t("Mechanics call it ", "មេកានិចហៅវាថា ")}
            <strong className="text-orange-300">{t("\"Suck · Squeeze · Bang · Blow\"", "« ស្រូប · ច្របាច់ · ផ្ទុះ · ផ្លុំ »")}</strong>
            {t(
              " — Intake, Compression, Power, Exhaust. Liquid gasoline is turned into explosive pressure that pushes the piston down. That push is what eventually spins your wheels.",
              " — ស្រូបចូល ការច្របាច់ ផ្ទុះ បញ្ចេញ។ សាំងរាវត្រូវបានប្រែក្លាយជាសម្ពាធផ្ទុះដែលរុញស៊ីឡាំងចុះ។ ការរុញនោះគឺជាអ្វីដែលនៅទីបំផុតបង្វិលកង់របស់អ្នក។"
            )}
          </p>
        </PartCard>

        {/* Rotary engine */}
        <PartCard
          spec="ROT"
          en="Rotary (Wankel) Engine"
          kh="ម៉ាស៊ីនរ៉ូតារី (Wankel)"
          kh_={kh}
          Icon={Triangle}
          tone="silver"
          diagram={<RotaryDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "No pistons, no up-and-down. Instead, a triangle-shaped rotor spins inside an oval chamber. Each face of the triangle is a tiny combustion room.",
              "គ្មានស៊ីឡាំង គ្មានការឡើងចុះ។ ផ្ទុយទៅវិញ រ៉ូទ័ររាងត្រីកោណមួយវិលនៅក្នុងបន្ទប់រាងពងក្រពើ។ មុខនីមួយៗនៃត្រីកោណគឺជាបន្ទប់ចំហេះតូចមួយ។"
            )}
          </p>
          <p>
            {t(
              "Because the rotor is curved against a curved chamber, all four strokes — intake, compression, power, exhaust — happen ",
              "ដោយសាររ៉ូទ័ររាងកោងផ្ទុយនឹងបន្ទប់រាងកោង ជំហានទាំងបួន — ស្រូប ច្របាច់ ផ្ទុះ បញ្ចេញ — កើតឡើង "
            )}
            <strong className="text-amber-200">{t("simultaneously, in different corners.", "ក្នុងពេលដំណាលគ្នា នៅជ្រុងផ្សេងគ្នា។")}</strong>
            {t(" The engine is small, smooth, and revs very high.", " ម៉ាស៊ីននេះតូច រលូន និងវិលលឿនខ្លាំង។")}
          </p>
        </PartCard>

        {/* Ignition */}
        <PartCard
          spec="IGN"
          en="Ignition System"
          kh="ប្រព័ន្ធបញ្ឆេះ"
          kh_={kh}
          Icon={Zap}
          tone="amber"
          diagram={<IgnitionDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "The spark plug is a tiny lightning bolt at the top of every cylinder. But your battery is only 12 volts — far too weak to make a spark jump across air.",
              "ប៊ូហ្គីគឺជាផ្គរតូចមួយនៅផ្នែកខាងលើនៃស៊ីឡាំងនីមួយៗ។ ប៉ុន្តែថ្មរបស់អ្នកមានត្រឹម ១២ វ៉ុលប៉ុណ្ណោះ — ខ្សោយពេកដើម្បីធ្វើឱ្យផ្គរលោតឆ្លងកាត់ខ្យល់។"
            )}
          </p>
          <p>
            {t(
              "An ignition coil acts as a step-up transformer, multiplying that 12 V into a ",
              "ខ្ទង់បញ្ឆេះដើរតួជាឧបករណ៍បង្កើនវ៉ុល បង្កើនពី ១២ វ៉ុលនោះទៅជា "
            )}
            <strong className="text-amber-200">{t("20,000-volt blast", "ផ្គរ ២០,០០០ វ៉ុល")}</strong>
            {t(
              " timed to fire at the exact moment the piston has finished squeezing the fuel-air mix.",
              " ដែលត្រូវបានកំណត់ពេលដើម្បីបាញ់នៅពេលចេញពីសំឡេងពិតប្រាកដនៃស៊ីឡាំងបញ្ចប់ការច្របាច់ចម្រុះឥន្ធនៈ-ខ្យល់។"
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Spec en="Battery" kh="ថ្ម" kh_={kh} value="12 V" tone="silver" />
            <Spec en="Spark" kh="ផ្គរ" kh_={kh} value="20,000 V" tone="amber" />
            <Spec en="Sparks/min" kh="ផ្គរ/នាទី" kh_={kh} value="≈ 6,000" tone="orange" />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/40 flex justify-end">
            <Link
              href="/technology/spark-plugs"
              className={`inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors ${kh ? "font-khmer" : ""}`}
            >
              <span>{t("Interactive Spark Plug Simulation →", "មើលការពិសោធន៍ប៊ូហ្គីអន្តរកម្ម →")}</span>
            </Link>
          </div>
        </PartCard>
      </div>

      {/* ─── Live procedural 3D engine (full width below the 3 cards) ─── */}
      <div className="mt-5">
        <div
          className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-orange-300/90 mb-2 ${
            kh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>{t("Live 3D · Inline-4 Engine", "ម៉ូដែលម៉ាស៊ីន 3D · ៤ ស៊ីឡាំង")}</span>
          <span className="opacity-50">/</span>
          <span className="text-amber-200">ICE-4 · 3D</span>
        </div>
        <h3
          className={`text-base sm:text-lg font-bold text-slate-50 leading-tight mb-1 ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "Spin the engine — drag the throttle, watch the pistons fire 1-3-4-2",
            "បង្វិលម៉ាស៊ីន — អូសល្បឿន មើលស៊ីឡាំងបាញ់តាមលំដាប់ ១–៣–៤–២"
          )}
        </h3>
        <p
          className={`text-xs sm:text-sm text-slate-400 mb-3 ${
            kh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {t(
            "A live, interactive 3D engine built from scratch. Click and drag to orbit around the block, scroll to zoom in past the glass, and slide the throttle to change RPM. The orange flash inside each cylinder is the 'Power' stroke — fuel exploding to push the piston down.",
            "ម៉ាស៊ីន 3D ផ្ទាល់ដែលមានអន្តរកម្ម។ ចុចហើយអូសដើម្បីបង្វិលជុំវិញ មូលដើម្បីពង្រីកចូលក្នុងកញ្ចក់ ហើយអូសល្បឿនដើម្បីផ្លាស់ប្ដូរ RPM។ ពន្លឺពណ៌ទឹកក្រូចនៅខាងក្នុងស៊ីឡាំងនីមួយៗគឺជាជំហាន 'ផ្ទុះ' (Power) — ឥន្ធនៈផ្ទុះដើម្បីរុញស៊ីឡាំងចុះ។"
          )}
        </p>
        <Suspense
          fallback={
            <div className="rounded-lg border border-orange-500/30 bg-black/60 h-[400px] flex items-center justify-center text-xs font-mono text-orange-300/80 uppercase tracking-widest">
              {t("Booting 3D engine…", "កំពុងផ្ទុកម៉ាស៊ីន 3D…")}
            </div>
          }
        >
          <Engine3DViewer kh={kh} />
        </Suspense>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Bay 02 · Power & Air
// ════════════════════════════════════════════════════════════════════════════

function BayPowerAir({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section id="bay-air" className="mb-10 scroll-mt-24" data-testid="bay-power-air">
      <BayHeader spec="02" en="Power & Air — Feeding the Fire" kh="ថាមពល និងខ្យល់ — ការផ្ដល់ចំណីដល់ភ្លើង" kh_={kh} Icon={Wind} />

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Throttle */}
        <PartCard
          spec="THR"
          en="Accelerator / Throttle"
          kh="ឈ្នាន់ស្ទុះ"
          kh_={kh}
          Icon={Gauge}
          tone="orange"
          diagram={<ThrottleDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "The gas pedal is actually an ", "ឈ្នាន់សាំងពិតជា "
            )}
            <strong className="text-orange-300">{t("air pedal.", "ឈ្នាន់ខ្យល់។")}</strong>
            {t(
              " Stepping on it opens a butterfly valve — the throttle body — wider, letting more air rush into the engine.",
              " ការដាក់ជើងលើវាបើកសន្ទះមេអំបៅ — Throttle Body — ឱ្យធំ ហើយឱ្យខ្យល់ចូលម៉ាស៊ីនច្រើនជាង។"
            )}
          </p>
          <p>
            {t(
              "Sensors tell the computer how much extra air arrived; the computer instantly adds the matching amount of fuel — keeping the 14:1 air-to-fuel ratio. More air + more fuel = ",
              "ឧបករណ៍ចាប់សញ្ញាប្រាប់កុំព្យូទ័រថា ខ្យល់ចូលច្រើនប៉ុណ្ណា ; កុំព្យូទ័របន្ថែមឥន្ធនៈឱ្យត្រូវគ្នាភ្លាមៗ — រក្សាសមាមាត្រខ្យល់-ឥន្ធនៈ ១៤:១។ ខ្យល់បន្ថែម + ឥន្ធនៈបន្ថែម = "
            )}
            <strong className="text-amber-200">{t("a bigger explosion", "ការផ្ទុះធំជាង")}</strong>{" "}
            {t("— and that's the speed you feel.", "— ហើយនោះជាល្បឿនដែលអ្នកមាន។")}
          </p>
        </PartCard>

        {/* Turbocharger */}
        <PartCard
          spec="TURBO"
          en="Turbocharger"
          kh="ធួបូ"
          kh_={kh}
          Icon={Wind}
          tone="silver"
          diagram={<TurboDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "A turbo is two fans on one shaft. The hot exhaust gas rushing out of the engine spins one fan; that spin powers the other fan, which crams cool fresh air ",
              "ធួបូគឺផ្លុំពីរនៅលើដងតែមួយ។ ឧស្ម័នផ្សែងក្ដៅៗ ដែលរត់ចេញពីម៉ាស៊ីនបង្វិលផ្លុំមួយ ; ការវិលនោះផ្ដល់ថាមពលដល់ផ្លុំមួយទៀត ដែលច្របាច់ខ្យល់ត្រជាក់ស្រស់ "
            )}
            <strong className="text-amber-200">{t("back into", "ត្រឡប់ចូល")}</strong>
            {t(" the engine under pressure.", " ម៉ាស៊ីនក្រោមសម្ពាធ។")}
          </p>
          <p>
            {t(
              "Result: a much bigger explosion in the same small engine — free power harvested from waste heat that would otherwise just escape out the tailpipe.",
              "លទ្ធផល ៖ ការផ្ទុះដ៏ធំជាងមុនច្រើននៅក្នុងម៉ាស៊ីនតូចតែមួយ — ថាមពលឥតគិតថ្លៃប្រមូលបានពីកំដៅខ្ជះខ្ជាយ ដែលមិនដូច្នេះនឹងគ្រាន់តែរត់ចេញតាមបំពង់ផ្សែង។"
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Spec en="Turbine RPM" kh="ល្បឿនទួប៊ីន" kh_={kh} value="≤ 200,000" tone="silver" />
            <Spec en="Boost" kh="សម្ពាធ" kh_={kh} value="+50% power" tone="orange" />
          </div>
        </PartCard>

        {/* Muffler */}
        <PartCard
          spec="MUF"
          en="Muffler"
          kh="បំពង់ស៊ីម៉ាំង"
          kh_={kh}
          Icon={Volume2}
          tone="amber"
          diagram={<MufflerDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "Without a muffler, every explosion would sound like a gunshot. The muffler is a long metal box hiding a maze of perforated tubes and chambers.",
              "បើគ្មានបំពង់ស៊ីម៉ាំងទេ ការផ្ទុះម្ដងៗនឹងស្ដាប់ដូចសំឡេងកាំភ្លើង។ បំពង់ស៊ីម៉ាំងគឺជាប្រអប់ដែកវែងមួយដែលលាក់ផ្លូវរង្វង់នៃបំពង់ និងបន្ទប់ដែលមានប្រហោង។"
            )}
          </p>
          <p>
            {t("Sound waves bounce off opposite walls and meet themselves — a peak of one wave landing on the trough of another. They erase each other in mid-air through ", "រលកសំឡេងលោតលើជញ្ជាំងផ្ទុយ ហើយប៉ះខ្លួនវា — កំពូលរលកមួយធ្លាក់លើគ្រឹះរលកមួយទៀត។ ពួកវាលុបបំបាត់គ្នាក្នុងខ្យល់តាមរយៈ ")}
            <strong className="text-amber-200">{t("destructive interference.", "ការជ្រៀតជ្រែកបំផ្លាញ។")}</strong>
          </p>
        </PartCard>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Bay 03 · The Drivetrain
// ════════════════════════════════════════════════════════════════════════════

function BayDrivetrain({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section id="bay-drive" className="mb-10 scroll-mt-24" data-testid="bay-drivetrain">
      <BayHeader spec="03" en="The Drivetrain — Sending Spin to the Wheels" kh="ប្រព័ន្ធបញ្ជូនចលនា — បញ្ជូនការវិលទៅកង់" kh_={kh} Icon={Cog} />

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Clutch */}
        <PartCard
          spec="CLT"
          en="The Clutch"
          kh="អាំប្រាយ៉ា"
          kh_={kh}
          Icon={Disc3}
          tone="orange"
          diagram={<ClutchDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "The engine never stops spinning while it is on. But the wheels do — at red lights, in traffic, on a hill. So the engine and the wheels need a ",
              "ម៉ាស៊ីនមិនដែលឈប់វិលនៅពេលវាបើក។ ប៉ុន្តែកង់ឈប់ — នៅភ្លើងក្រហម ក្នុងការកកស្ទះ លើភ្នំ។ ដូច្នេះម៉ាស៊ីន និងកង់ត្រូវការ "
            )}
            <strong className="text-orange-300">{t("switch to disconnect them.", "កុងតាក់ដើម្បីផ្ដាច់ពួកវា។")}</strong>
          </p>
          <p>
            {t(
              "The clutch is two high-friction discs facing each other. When pressed together: spin transfers. When pulled apart by your foot pedal: the engine spins freely while the wheels are still.",
              "អាំប្រាយ៉ាគឺជាថាសពីរដែលមានកម្លាំងកកិតខ្ពស់ប្រឈមនឹងគ្នា។ នៅពេលច្របាច់បញ្ចូលគ្នា ៖ ការវិលបញ្ជូន។ នៅពេលបែកចេញពីគ្នាដោយឈ្នាន់ជើងរបស់អ្នក ៖ ម៉ាស៊ីនវិលដោយសេរី ខណៈកង់នៅស្ងៀម។"
            )}
          </p>
        </PartCard>

        {/* Manual transmission */}
        <PartCard
          spec="TX-M"
          en="Manual Transmission"
          kh="ប្រអប់លេខកា"
          kh_={kh}
          Icon={Settings}
          tone="silver"
          diagram={<ManualGearDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "Like the gears on a bicycle. The driver pushes the clutch to disconnect the engine, then slides into a gear of a different size to ",
              "ដូចជាឡេខលើកង់។ អ្នកបើកបរច្របាច់អាំប្រាយ៉ាដើម្បីផ្ដាច់ម៉ាស៊ីន បន្ទាប់មករំកិលចូលលេខទំហំខុសគ្នាដើម្បី "
            )}
            <strong className="text-amber-200">{t("trade speed for torque", "ប្ដូរល្បឿនយកកម្លាំងបង្វិល")}</strong>
            {t(" — or the other way around.", " — ឬផ្ទុយមកវិញ។")}
          </p>
          <p>
            {t(
              "Small gear → engine spins many times per wheel turn → easy to start a heavy car (low gear, lots of torque). Large gear → fewer spins per turn → fast highway cruising (high gear, lots of speed).",
              "ឡេខតូច → ម៉ាស៊ីនវិលច្រើនដងក្នុងមួយជុំកង់ → ងាយចាប់ផ្ដើមឡានធ្ងន់ (លេខទាប កម្លាំងបង្វិលច្រើន)។ ឡេខធំ → វិលតិចជាងក្នុងមួយជុំ → ដំណើរលឿនលើផ្លូវហាយវេ (លេខខ្ពស់ ល្បឿនច្រើន)។"
            )}
          </p>
        </PartCard>

        {/* Automatic transmission */}
        <PartCard
          spec="TX-A"
          en="Automatic Transmission"
          kh="ប្រអប់លេខអូតូ"
          kh_={kh}
          Icon={CircleDot}
          tone="amber"
          diagram={<AutoGearDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "No clutch pedal. Inside is a clever ",
              "គ្មានឈ្នាន់អាំប្រាយ៉ាទេ។ ខាងក្នុងគឺជា "
            )}
            <strong className="text-amber-200">{t("planetary gearset", "សំណុំឡេខភពផ្កាយ")}</strong>
            {t(
              " — a sun gear in the middle, planet gears around it, and a ring gear outside — that can produce many gear ratios from one compact stack.",
              " — ឡេខព្រះអាទិត្យនៅកណ្ដាល ឡេខភពនៅជុំវិញវា និងឡេខវង់នៅខាងក្រៅ — ដែលអាចបង្កើតសមាមាត្រឡេខច្រើនពីដុំបង្គាប់តែមួយ។"
            )}
          </p>
          <p>
            {t(
              "Pressurised hydraulic fluid pushes brake bands that hold one part still — instantly changing which gear ratio is in use. The car decides when to shift, based on speed and how hard you press the throttle.",
              "ទឹករំអិលក្រោមសម្ពាធ រុញខ្សែក្រវាត់ហ្វ្រាំងដែលឱ្យផ្នែកមួយនៅស្ងៀម — ផ្លាស់ប្ដូរសមាមាត្រឡេខភ្លាមៗ។ ឡានសម្រេចចិត្តនៅពេលណាត្រូវប្ដូរ ផ្អែកលើល្បឿន និងថា អ្នកដាក់ឈ្នាន់ស្ទុះខ្លាំងប៉ុណ្ណា។"
            )}
          </p>
        </PartCard>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Bay 04 · Control & Safety
// ════════════════════════════════════════════════════════════════════════════

function BayControlSafety({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section id="bay-control" className="mb-10 scroll-mt-24" data-testid="bay-control-safety">
      <BayHeader spec="04" en="Control & Safety — Aim, and Stop in Time" kh="ការគ្រប់គ្រង និងសុវត្ថិភាព — តម្រង់ និងឈប់ទាន់ពេល" kh_={kh} Icon={ShieldCheck} />

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Steering */}
        <PartCard
          spec="STEER"
          en="Steering Wheel · Rack & Pinion"
          kh="ចង្កូត · Rack និង Pinion"
          kh_={kh}
          Icon={Compass}
          tone="orange"
          diagram={<RackPinionDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "Turning the round wheel spins a small toothed gear at the bottom of the steering column — the ",
              "ការបង្វិលចង្កូតមូល បង្វិលឡេខធ្មេញតូចមួយនៅផ្នែកខាងក្រោមនៃជួរឈរចង្កូត — "
            )}
            <strong className="text-orange-300">{t("pinion.", "Pinion។")}</strong>
          </p>
          <p>
            {t(
              "That pinion's teeth mesh with a long flat toothed bar — the ",
              "ធ្មេញ Pinion នោះប្រជុំជាមួយរបារធ្មេញរាងសំប៉ែតវែង — "
            )}
            <strong className="text-amber-200">{t("rack", "Rack")}</strong>
            {t(
              " — and slide it left or right. The two ends of the rack push the front wheels, turning the car. Rotation in → straight-line motion out.",
              " — ហើយកិលវាទៅឆ្វេង ឬស្ដាំ។ ចុងទាំងពីរនៃ rack រុញកង់ខាងមុខ បង្វិលឡាន។ ការវិលចូល → ចលនាបន្ទាត់ត្រង់ចេញ។"
            )}
          </p>
        </PartCard>

        {/* ABS */}
        <PartCard
          spec="ABS"
          en="Anti-Lock Brakes (ABS)"
          kh="ប្រព័ន្ធហ្វ្រាំង ABS"
          kh_={kh}
          Icon={ShieldCheck}
          tone="amber"
          diagram={<ABSDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "Slam on the brakes hard and the wheels stop turning while the car keeps moving — the tires slide, you cannot steer, and you skid into trouble.",
              "ច្របាច់ហ្វ្រាំងខ្លាំង ហើយកង់ឈប់វិលខណៈឡានបន្តផ្លាស់ទី — សំបកកង់រអិល អ្នកមិនអាចបង្វិលបាន ហើយអ្នករអិលចូលគ្រោះថ្នាក់។"
            )}
          </p>
          <p>
            {t(
              "ABS uses speed sensors at every wheel. The instant a wheel begins to lock, the system automatically pumps the brakes ",
              "ABS ប្រើឧបករណ៍ចាប់សញ្ញាល្បឿននៅគ្រប់កង់។ នៅពេលកង់មួយចាប់ផ្ដើមជាប់ ប្រព័ន្ធលោតហ្វ្រាំង "
            )}
            <strong className="text-amber-200">{t("≈ 15 times per second", "≈ ១៥ ដងក្នុងមួយវិនាទី")}</strong>
            {t(
              " — far faster than any human foot — releasing and re-clamping just enough to keep the tires gripping the road instead of sliding across it.",
              " — លឿនជាងជើងមនុស្សណាមួយ — បញ្ចេញ និងច្របាច់ឡើងវិញគ្រាន់តែល្មមឱ្យសំបកកង់នៅជាប់នឹងផ្លូវ ជំនួសឱ្យការរអិលឆ្លងកាត់វា។"
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Spec en="Pump rate" kh="ល្បឿនលោត" kh_={kh} value="≈ 15 Hz" tone="amber" />
            <Spec en="Stop dist." kh="ចម្ងាយឈប់" kh_={kh} value="-30%" tone="orange" />
          </div>
        </PartCard>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Diagrams
// ════════════════════════════════════════════════════════════════════════════

function DiagramFrame({
  labelEn, labelKh, kh, children, tone = "orange",
}: {
  labelEn: string; labelKh: string; kh: boolean; children: React.ReactNode;
  tone?: "orange" | "red";
}) {
  const border = tone === "red" ? "border-red-500/40" : "border-orange-500/30";
  const label  = tone === "red" ? "text-red-300/85"   : "text-orange-300/80";
  return (
    <div className={`rounded-lg bg-black/60 border ${border} p-3`}>
      <div className={`text-[10px] font-mono uppercase tracking-widest ${label} mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? labelKh : labelEn}
      </div>
      {children}
    </div>
  );
}

// ─── 4-Stroke cycle: 4 mini cylinders showing each stroke
function FourStrokeDiagram({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  const strokes = [
    { en: "Intake",      kh: "ស្រូប",   pist: 70, valveIn: true,  valveOut: false, fill: "#fef3c7", spark: false, dot: ORANGE },
    { en: "Compression", kh: "ច្របាច់", pist: 28, valveIn: false, valveOut: false, fill: "#fde68a", spark: false, dot: ORANGE },
    { en: "Power",       kh: "ផ្ទុះ",   pist: 70, valveIn: false, valveOut: false, fill: "#f97316", spark: true,  dot: "#dc2626" },
    { en: "Exhaust",     kh: "បញ្ចេញ", pist: 28, valveIn: false, valveOut: true,  fill: "#52525b", spark: false, dot: ORANGE },
  ];
  return (
    <DiagramFrame labelEn="4-STROKE CYCLE" labelKh="វដ្ដ ៤ ជំហាន" kh={kh}>
      <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden>
        {strokes.map((s, i) => {
          const cx = 30 + i * 80;
          return (
            <g key={i}>
              {/* cylinder body */}
              <rect x={cx - 18} y={18} width="36" height="80" rx="3" fill="#1f2937" stroke={SILVER} strokeWidth="1" />
              {/* fuel/air inside */}
              <rect x={cx - 16} y={20} width="32" height={s.pist - 4} fill={s.fill} opacity="0.65" />
              {/* piston */}
              <rect x={cx - 16} y={s.pist} width="32" height="14" fill={SILVER} stroke="#334155" />
              {/* connecting rod */}
              <line x1={cx} y1={s.pist + 14} x2={cx} y2={108} stroke={SILVER} strokeWidth="1.6" />
              <circle cx={cx} cy={112} r="4" fill={SILVER} stroke="#334155" />
              {/* valves */}
              <line x1={cx - 8} y1={18} x2={cx - 8} y2={s.valveIn ? 32 : 22} stroke={s.valveIn ? "#22c55e" : "#475569"} strokeWidth="2.2" />
              <line x1={cx + 8} y1={18} x2={cx + 8} y2={s.valveOut ? 32 : 22} stroke={s.valveOut ? "#ef4444" : "#475569"} strokeWidth="2.2" />
              {/* spark */}
              {s.spark && (
                <g>
                  <line x1={cx - 4} y1={20} x2={cx + 4} y2={26} stroke="#fde047" strokeWidth="1.4" />
                  <line x1={cx + 4} y1={20} x2={cx - 4} y2={26} stroke="#fde047" strokeWidth="1.4" />
                </g>
              )}
              {/* step number */}
              <circle cx={cx} cy={10} r="6" fill={s.dot} />
              <text x={cx} y={13} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#fff" fontWeight="bold">{i + 1}</text>
              {/* label */}
              <text x={cx} y={124} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#fed7aa" fontWeight="bold">
                {kh ? s.kh : s.en}
              </text>
            </g>
          );
        })}
      </svg>
    </DiagramFrame>
  );
}

// ─── Rotary engine: triangle rotor in oval housing
function RotaryDiagram({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame labelEn="WANKEL ROTOR · ALL 4 STROKES AT ONCE" labelKh="រ៉ូទ័រ Wankel · ៤ ជំហានក្នុងពេលតែមួយ" kh={kh}>
      <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden>
        {/* oval housing (epitrochoid approximation) */}
        <ellipse cx="160" cy="65" rx="100" ry="48" fill="#1f2937" stroke={SILVER} strokeWidth="1.2" />
        {/* combustion glow on right side */}
        <ellipse cx="220" cy="65" rx="36" ry="22" fill="#f97316" opacity="0.30" />
        {/* triangular rotor */}
        <g transform="translate(160 65) rotate(-15)">
          <polygon points="0,-44 38,22 -38,22" fill="#475569" stroke={ORANGE} strokeWidth="1.6" />
          <circle cx="0" cy="0" r="6" fill={ORANGE} />
        </g>
        {/* labels at three corners */}
        <text x="80"  y="42"  fontSize="9" fontFamily="monospace" fill="#bae6fd" fontWeight="bold">{kh ? "ស្រូប" : "Intake"}</text>
        <text x="220" y="42"  fontSize="9" fontFamily="monospace" fill="#fde68a" fontWeight="bold">{kh ? "ច្របាច់" : "Compress"}</text>
        <text x="240" y="100" fontSize="9" fontFamily="monospace" fill="#fb923c" fontWeight="bold">{kh ? "ផ្ទុះ" : "Power"}</text>
        <text x="60"  y="100" fontSize="9" fontFamily="monospace" fill="#cbd5e1" fontWeight="bold">{kh ? "បញ្ចេញ" : "Exhaust"}</text>
        {/* spark plug */}
        <circle cx="245" cy="65" r="3" fill="#fde047" />
        <line x1="248" y1="65" x2="258" y2="65" stroke="#fde047" strokeWidth="1.4" />
        <text x="260" y="68" fontSize="8" fontFamily="monospace" fill="#fde047">{t("SPARK", "ផ្គរ")}</text>
      </svg>
    </DiagramFrame>
  );
}

// ─── Ignition: 12 V battery → coil → 20,000 V spark
function IgnitionDiagram({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame labelEn="STEP-UP IGNITION COIL" labelKh="ខ្ទង់បញ្ឆេះបង្កើនវ៉ុល" kh={kh}>
      <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden>
        {/* battery */}
        <rect x="10" y="50" width="60" height="40" rx="4" fill="#1f2937" stroke={SILVER} />
        <text x="40" y="74" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#fde68a" fontWeight="bold">12 V</text>
        <text x="40" y="44" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#94a3b8">{kh ? "ថ្ម" : "BATTERY"}</text>
        {/* wire */}
        <line x1="70" y1="70" x2="120" y2="70" stroke={ORANGE} strokeWidth="1.6" />
        {/* coil (rectangle with windings) */}
        <rect x="120" y="40" width="80" height="60" rx="4" fill="#0c0a09" stroke={ORANGE} strokeWidth="1.4" />
        <text x="160" y="34" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#fb923c">{kh ? "ខ្ទង់បញ្ឆេះ" : "COIL"}</text>
        {/* primary windings (sparse) */}
        {[0,1,2,3,4,5].map(i => (
          <line key={`p${i}`} x1={130 + i * 12} y1={42} x2={130 + i * 12} y2={68} stroke="#7dd3fc" strokeWidth="0.8" />
        ))}
        {/* secondary windings (dense) */}
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
          <line key={`s${i}`} x1={125 + i * 6.5} y1={70} x2={125 + i * 6.5} y2={98} stroke={ORANGE} strokeWidth="0.8" />
        ))}
        <text x="135" y="58" fontSize="7" fontFamily="monospace" fill="#7dd3fc">{t("P (few)", "P (តិច)")}</text>
        <text x="135" y="92" fontSize="7" fontFamily="monospace" fill="#fb923c">{t("S (many)", "S (ច្រើន)")}</text>
        {/* high voltage wire */}
        <line x1="200" y1="70" x2="240" y2="70" stroke="#fbbf24" strokeWidth="2" />
        {/* spark plug */}
        <rect x="240" y="40" width="14" height="60" fill="#cbd5e1" stroke="#1f2937" />
        <line x1="247" y1="100" x2="247" y2="118" stroke={SILVER} strokeWidth="2" />
        <line x1="240" y1="118" x2="254" y2="118" stroke={SILVER} strokeWidth="2" />
        {/* spark gap arc */}
        <line x1="247" y1="120" x2="244" y2="125" stroke="#fde047" strokeWidth="1.6" />
        <line x1="247" y1="120" x2="250" y2="125" stroke="#fde047" strokeWidth="1.6" />
        <text x="280" y="74" fontSize="11" fontFamily="monospace" fill="#fde047" fontWeight="bold">20,000 V</text>
        <text x="280" y="86" fontSize="8" fontFamily="monospace" fill="#fde68a">{t("SPARK", "ផ្គរ")}</text>
      </svg>
    </DiagramFrame>
  );
}

// ─── Throttle: butterfly valve open/closed
function ThrottleDiagram({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame labelEn="THROTTLE BODY · BUTTERFLY VALVE" labelKh="ឈ្នាន់ស្ទុះ · សន្ទះមេអំបៅ" kh={kh}>
      <svg viewBox="0 0 320 120" className="w-full h-auto" aria-hidden>
        {/* idle (closed) */}
        <g>
          <text x="70" y="14" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#94a3b8">{kh ? "ស្ងៀម" : "IDLE"}</text>
          <rect x="20" y="30" width="100" height="60" fill="#0c0a09" stroke={SILVER} />
          {/* small air arrows */}
          <line x1="6" y1="60" x2="22" y2="60" stroke="#22d3ee" strokeWidth="1.4" markerEnd="url(#arr)" />
          <line x1="120" y1="60" x2="136" y2="60" stroke="#22d3ee" strokeWidth="0.9" />
          {/* butterfly closed (vertical) */}
          <line x1="70" y1="36" x2="70" y2="84" stroke={ORANGE} strokeWidth="3" />
          <circle cx="70" cy="60" r="3" fill={SILVER} />
        </g>
        {/* WOT (open) */}
        <g>
          <text x="240" y="14" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#fed7aa" fontWeight="bold">{kh ? "ទាញពេញ" : "FULL THROTTLE"}</text>
          <rect x="190" y="30" width="100" height="60" fill="#0c0a09" stroke={SILVER} />
          {/* big arrows */}
          {[40, 56, 72].map((y, i) => (
            <line key={i} x1="174" y1={y} x2="194" y2={y} stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arr)" />
          ))}
          {[40, 56, 72].map((y, i) => (
            <line key={`o${i}`} x1="290" y1={y} x2="310" y2={y} stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arr)" />
          ))}
          {/* butterfly horizontal (open) */}
          <line x1="208" y1="60" x2="272" y2="60" stroke={ORANGE} strokeWidth="3" />
          <circle cx="240" cy="60" r="3" fill={SILVER} />
        </g>
        <defs>
          <marker id="arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="#22d3ee" />
          </marker>
        </defs>
        <text x="160" y="108" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#a8a29e">
          {kh ? "ទីតាំងសន្ទះ → បរិមាណខ្យល់ចូល" : "valve angle → air mass in"}
        </text>
      </svg>
    </DiagramFrame>
  );
}

// ─── Turbocharger: exhaust spins one fan, intake fan crams air
function TurboDiagram({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame labelEn="TURBO · EXHAUST POWERS INTAKE" labelKh="ធួបូ · ផ្សែងផ្ដល់ថាមពលដល់ខ្យល់ចូល" kh={kh}>
      <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden>
        {/* shaft */}
        <line x1="80" y1="65" x2="240" y2="65" stroke={SILVER} strokeWidth="2" />
        {/* turbine (exhaust side) */}
        <g transform="translate(220 65)">
          <circle r="36" fill="#1f2937" stroke="#ef4444" strokeWidth="1.4" />
          {[0,1,2,3,4,5,6,7].map(i => {
            const a = (i * 360) / 8;
            return <line key={i} x1="0" y1="0" x2={Math.cos(a*Math.PI/180)*30} y2={Math.sin(a*Math.PI/180)*30} stroke="#fca5a5" strokeWidth="3" />;
          })}
          <text y="60" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#fca5a5" fontWeight="bold">TURBINE · {kh ? "ផ្សែង" : "EXHAUST"}</text>
        </g>
        {/* compressor (intake side) */}
        <g transform="translate(100 65)">
          <circle r="36" fill="#1f2937" stroke="#22d3ee" strokeWidth="1.4" />
          {[0,1,2,3,4,5,6,7].map(i => {
            const a = (i * 360) / 8 + 22;
            return <line key={i} x1="0" y1="0" x2={Math.cos(a*Math.PI/180)*30} y2={Math.sin(a*Math.PI/180)*30} stroke="#7dd3fc" strokeWidth="3" />;
          })}
          <text y="60" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#7dd3fc" fontWeight="bold">COMPRESSOR · {kh ? "ខ្យល់" : "AIR"}</text>
        </g>
        {/* arrows: hot exhaust in (right), boosted air out (left) */}
        <g>
          <line x1="296" y1="65" x2="262" y2="65" stroke="#ef4444" strokeWidth="2.4" markerEnd="url(#arrR)" />
          <text x="300" y="62" fontSize="9" fontFamily="monospace" fill="#fecaca">{kh ? "ផ្សែង" : "exhaust"}</text>
          <line x1="60" y1="65" x2="20" y2="65" stroke="#22d3ee" strokeWidth="2.4" markerEnd="url(#arrL)" />
          <text x="14" y="62" fontSize="9" fontFamily="monospace" fill="#7dd3fc">{kh ? "ខ្យល់" : "boost"}</text>
        </g>
        <defs>
          <marker id="arrL" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="#22d3ee" />
          </marker>
          <marker id="arrR" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="#ef4444" />
          </marker>
        </defs>
        {/* shaft label */}
        <text x="160" y="58" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#cbd5e1">SHAFT · {kh ? "ដង" : "1 piece"}</text>
      </svg>
    </DiagramFrame>
  );
}

// ─── Muffler: maze of perforated tubes with destructive interference waves
function MufflerDiagram({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame labelEn="MUFFLER · DESTRUCTIVE INTERFERENCE" labelKh="បំពង់ស៊ីម៉ាំង · ការជ្រៀតជ្រែកបំផ្លាញ" kh={kh}>
      <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden>
        {/* outer shell */}
        <rect x="20" y="36" width="280" height="58" rx="20" fill="#1f2937" stroke={SILVER} />
        {/* internal chambers */}
        <line x1="110" y1="36" x2="110" y2="94" stroke="#52525b" strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1="200" y1="36" x2="200" y2="94" stroke="#52525b" strokeWidth="1.2" strokeDasharray="3 3" />
        {/* perforated tubes */}
        <line x1="20" y1="55" x2="160" y2="55" stroke={ORANGE} strokeWidth="1.4" />
        <line x1="160" y1="76" x2="300" y2="76" stroke={ORANGE} strokeWidth="1.4" />
        {[40, 60, 80, 100, 120, 140].map(x => <circle key={x} cx={x} cy="55" r="0.8" fill={ORANGE} />)}
        {[170, 190, 210, 230, 250, 270, 290].map(x => <circle key={x} cx={x} cy="76" r="0.8" fill={ORANGE} />)}
        {/* connecting channel */}
        <line x1="160" y1="55" x2="160" y2="76" stroke={ORANGE} strokeWidth="1.4" />
        {/* incoming loud wave (left) */}
        <g transform="translate(2 55)">
          <path d="M 0 -10 q 4 -10 8 0 t 8 0 t 8 0" stroke="#ef4444" strokeWidth="1.4" fill="none" />
          <text x="-2" y="-16" fontSize="8" fontFamily="monospace" fill="#fca5a5">{t("LOUD", "ខ្លាំង")}</text>
        </g>
        {/* outgoing quiet (right) */}
        <g transform="translate(298 76)">
          <path d="M 0 -2 q 2 -2 4 0 t 4 0" stroke="#22c55e" strokeWidth="1.2" fill="none" />
          <text x="6" y="-6" fontSize="8" fontFamily="monospace" fill="#86efac">{t("QUIET", "ស្ងាត់")}</text>
        </g>
        {/* opposing waves illustration */}
        <g>
          <path d="M 130 110 q 6 -8 12 0 t 12 0 t 12 0" stroke="#22d3ee" strokeWidth="1.2" fill="none" />
          <path d="M 130 110 q 6  8 12 0 t 12 0 t 12 0" stroke="#fb923c" strokeWidth="1.2" fill="none" />
          <text x="180" y="116" fontSize="8" fontFamily="monospace" fill="#a8a29e">{kh ? "រលកដាក់ផ្ទុយគ្នា → លុបបាត់" : "opposite waves → cancel"}</text>
        </g>
      </svg>
    </DiagramFrame>
  );
}

// ─── Clutch: two friction discs engaged / disengaged
function ClutchDiagram({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame labelEn="CLUTCH · ENGAGED vs DISENGAGED" labelKh="អាំប្រាយ៉ា · ភ្ជាប់ ទល់នឹង ផ្ដាច់" kh={kh}>
      <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden>
        {/* engaged */}
        <g>
          <text x="70" y="14" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#fed7aa" fontWeight="bold">{kh ? "ភ្ជាប់" : "ENGAGED"}</text>
          <rect x="22" y="40" width="20" height="50" fill={SILVER} stroke="#334155" />
          <rect x="98" y="40" width="20" height="50" fill={SILVER} stroke="#334155" />
          <rect x="42" y="42" width="56" height="46" fill={ORANGE} opacity="0.25" />
          {/* discs touching */}
          <rect x="60" y="40" width="20" height="50" fill={ORANGE_DEEP} stroke="#fff" strokeWidth="0.6" />
          <text x="70" y="108" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#86efac">{kh ? "កង់វិល" : "wheels spin"}</text>
        </g>
        {/* disengaged */}
        <g>
          <text x="240" y="14" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#7dd3fc" fontWeight="bold">{kh ? "ផ្ដាច់" : "DISENGAGED"}</text>
          <rect x="180" y="40" width="20" height="50" fill={SILVER} stroke="#334155" />
          <rect x="280" y="40" width="20" height="50" fill={SILVER} stroke="#334155" />
          <rect x="206" y="40" width="14" height="50" fill={ORANGE_DEEP} stroke="#fff" strokeWidth="0.6" />
          <rect x="260" y="40" width="14" height="50" fill={ORANGE_DEEP} stroke="#fff" strokeWidth="0.6" />
          {/* gap arrow */}
          <line x1="222" y1="65" x2="258" y2="65" stroke="#7dd3fc" strokeDasharray="3 3" />
          <text x="240" y="60" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#7dd3fc">{t("GAP", "ចន្លោះ")}</text>
          <text x="240" y="108" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#cbd5e1">{kh ? "កង់ឈប់" : "wheels stop"}</text>
        </g>
      </svg>
    </DiagramFrame>
  );
}

// ─── Manual transmission: bicycle-style cogs
function ManualGearDiagram({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  const cogs = [
    { cx: 60,  r: 28, teeth: 18, label: "1st",  sub: "torque" },
    { cx: 140, r: 22, teeth: 14, label: "2nd",  sub: "" },
    { cx: 210, r: 16, teeth: 11, label: "3rd",  sub: "" },
    { cx: 270, r: 12, teeth: 9,  label: "4th",  sub: "speed" },
  ];
  return (
    <DiagramFrame labelEn="MANUAL · TRADE SPEED ↔ TORQUE" labelKh="លេខកា · ប្ដូរល្បឿន ↔ កម្លាំង" kh={kh}>
      <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden>
        {/* shaft */}
        <line x1="20" y1="65" x2="300" y2="65" stroke={SILVER} strokeWidth="1.4" />
        {cogs.map((c, i) => (
          <g key={i}>
            <circle cx={c.cx} cy="65" r={c.r} fill="#1f2937" stroke={ORANGE} strokeWidth="1.4" />
            {Array.from({ length: c.teeth }, (_, k) => {
              const a = (k * 360) / c.teeth;
              const x1 = c.cx + Math.cos(a*Math.PI/180) * c.r;
              const y1 = 65 + Math.sin(a*Math.PI/180) * c.r;
              const x2 = c.cx + Math.cos(a*Math.PI/180) * (c.r + 4);
              const y2 = 65 + Math.sin(a*Math.PI/180) * (c.r + 4);
              return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ORANGE} strokeWidth="1.2" />;
            })}
            <circle cx={c.cx} cy="65" r="2.5" fill={SILVER} />
            <text x={c.cx} y={65 - c.r - 8} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#fed7aa" fontWeight="bold">{c.label}</text>
            {c.sub && <text x={c.cx} y={65 + c.r + 16} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#a8a29e">{c.sub}</text>}
          </g>
        ))}
        <text x="160" y="124" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#94a3b8">{kh ? "ឡេខធំ → លឿន · ឡេខតូច → កម្លាំងច្រើន" : "big cog → fast · small cog → strong"}</text>
      </svg>
    </DiagramFrame>
  );
}

// ─── Automatic: planetary gearset (sun, planets, ring)
function AutoGearDiagram({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame labelEn="AUTO · PLANETARY GEARSET" labelKh="អូតូ · សំណុំឡេខភពផ្កាយ" kh={kh}>
      <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden>
        {/* ring gear */}
        <circle cx="160" cy="65" r="55" fill="none" stroke={SILVER} strokeWidth="3" />
        {Array.from({ length: 32 }, (_, i) => {
          const a = (i * 360) / 32;
          const x1 = 160 + Math.cos(a*Math.PI/180) * 55;
          const y1 = 65 + Math.sin(a*Math.PI/180) * 55;
          const x2 = 160 + Math.cos(a*Math.PI/180) * 60;
          const y2 = 65 + Math.sin(a*Math.PI/180) * 60;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={SILVER} strokeWidth="0.9" />;
        })}
        {/* sun */}
        <circle cx="160" cy="65" r="14" fill={ORANGE_DEEP} stroke="#fff" strokeWidth="0.8" />
        <text x="160" y="69" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#fff" fontWeight="bold">SUN</text>
        {/* planets (3) */}
        {[0, 120, 240].map((a, i) => {
          const x = 160 + Math.cos(a*Math.PI/180) * 32;
          const y = 65  + Math.sin(a*Math.PI/180) * 32;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="11" fill="#1f2937" stroke="#fb923c" strokeWidth="1.4" />
              <text x={x} y={y + 3} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#fb923c" fontWeight="bold">P{i + 1}</text>
            </g>
          );
        })}
        {/* labels */}
        <text x="80"  y="20"  fontSize="9" fontFamily="monospace" fill="#cbd5e1" fontWeight="bold">RING · {kh ? "វង់" : "outer"}</text>
        <text x="280" y="120" fontSize="9" fontFamily="monospace" fill="#fb923c" fontWeight="bold" textAnchor="end">PLANETS · {kh ? "ភព" : "around"}</text>
        <text x="280" y="20"  fontSize="9" fontFamily="monospace" fill="#fed7aa" fontWeight="bold" textAnchor="end">SUN · {kh ? "កណ្ដាល" : "centre"}</text>
      </svg>
    </DiagramFrame>
  );
}

// ─── Rack and pinion steering
function RackPinionDiagram({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame labelEn="RACK & PINION · ROTATION → LINEAR" labelKh="Rack និង Pinion · ការវិល → បន្ទាត់ត្រង់" kh={kh}>
      <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden>
        {/* steering wheel */}
        <circle cx="160" cy="28" r="18" fill="none" stroke={SILVER} strokeWidth="2.4" />
        <line x1="142" y1="28" x2="178" y2="28" stroke={SILVER} strokeWidth="2.4" />
        <line x1="160" y1="10" x2="160" y2="46" stroke={SILVER} strokeWidth="2.4" />
        {/* column */}
        <line x1="160" y1="46" x2="160" y2="68" stroke={SILVER} strokeWidth="2.4" />
        {/* pinion (small gear) */}
        <circle cx="160" cy="78" r="11" fill="#1f2937" stroke={ORANGE} strokeWidth="1.4" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 360) / 12;
          const x1 = 160 + Math.cos(a*Math.PI/180) * 11;
          const y1 = 78  + Math.sin(a*Math.PI/180) * 11;
          const x2 = 160 + Math.cos(a*Math.PI/180) * 14;
          const y2 = 78  + Math.sin(a*Math.PI/180) * 14;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ORANGE} strokeWidth="1.1" />;
        })}
        <text x="178" y="80" fontSize="8" fontFamily="monospace" fill="#fb923c" fontWeight="bold">{t("PINION", "Pinion")}</text>
        {/* rack (toothed bar) */}
        <rect x="30" y="92" width="260" height="14" fill="#1f2937" stroke={SILVER} />
        {Array.from({ length: 30 }, (_, i) => (
          <line key={i} x1={32 + i * 8.5} y1={92} x2={32 + i * 8.5} y2={86} stroke={SILVER} strokeWidth="1.1" />
        ))}
        <text x="35" y="120" fontSize="8" fontFamily="monospace" fill="#cbd5e1">RACK · {kh ? "របារ" : "bar"}</text>
        {/* tie rods to wheels */}
        <line x1="35"  y1="99" x2="14"  y2="106" stroke={SILVER} strokeWidth="1.4" />
        <line x1="285" y1="99" x2="306" y2="106" stroke={SILVER} strokeWidth="1.4" />
        <rect x="2"   y="106" width="14" height="14" fill={ORANGE_DEEP} />
        <rect x="304" y="106" width="14" height="14" fill={ORANGE_DEEP} />
        <text x="9"   y="128" fontSize="7" fontFamily="monospace" fill="#fed7aa" textAnchor="middle">{t("L wheel", "កង់​ឆ្វេង")}</text>
        <text x="311" y="128" fontSize="7" fontFamily="monospace" fill="#fed7aa" textAnchor="middle">{t("R wheel", "កង់​ស្ដាំ")}</text>
      </svg>
    </DiagramFrame>
  );
}

// ─── ABS: skidding (locked) vs ABS pulse (gripping) — comparative paths
function ABSDiagram({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame labelEn="ABS · 15 PULSES PER SECOND" labelKh="ABS · ១៥ លោតក្នុងវិនាទី" kh={kh}>
      <svg viewBox="0 0 320 130" className="w-full h-auto" aria-hidden>
        {/* road */}
        <rect x="0" y="48" width="320" height="34" fill="#0c0a09" />
        <line x1="0" y1="65" x2="320" y2="65" stroke="#fbbf24" strokeWidth="1" strokeDasharray="10 8" opacity="0.7" />
        {/* NO ABS — locked tire skidding (top) */}
        <g transform="translate(0 4)">
          <text x="6" y="14" fontSize="9" fontFamily="monospace" fill="#fca5a5" fontWeight="bold">{kh ? "គ្មាន ABS · កង់ជាប់" : "NO ABS · LOCKED"}</text>
          <line x1="40" y1="42" x2="180" y2="42" stroke="#ef4444" strokeWidth="2.4" />
          <circle cx="180" cy="42" r="9" fill="#ef4444" stroke="#fff" />
          <text x="190" y="46" fontSize="9" fontFamily="monospace" fill="#fecaca">{kh ? "រអិល" : "skid"} →</text>
        </g>
        {/* WITH ABS — pulsing tire gripping (bottom) */}
        <g transform="translate(0 92)">
          <path d="M 40 6 q 6 -8 12 0 t 12 0 t 12 0 t 12 0 t 12 0 t 12 0 t 12 0 t 12 0 t 12 0 t 12 0" stroke="#22c55e" strokeWidth="2" fill="none" />
          <circle cx="180" cy="6" r="9" fill="#22c55e" stroke="#fff" />
          <text x="190" y="10" fontSize="9" fontFamily="monospace" fill="#86efac">{kh ? "ឈប់ត្រឹម" : "stops in time"} ✓</text>
          <text x="6" y="22" fontSize="9" fontFamily="monospace" fill="#86efac" fontWeight="bold">{kh ? "មាន ABS · លោត" : "WITH ABS · PULSE"}</text>
        </g>
      </svg>
    </DiagramFrame>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Bay 05 · Performance Engineering — Muscle & Speed
//
//  Aesthetic shift: from "garage blueprint orange" to "high-performance
//  garage" — carbon-fiber greys, brushed silver, racing-red accents.
// ════════════════════════════════════════════════════════════════════════════

function BayPerformance({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section
      id="bay-performance"
      className="mb-10 scroll-mt-24"
      data-testid="bay-performance"
    >
      <BayHeader
        spec="05"
        en="Performance Engineering — Muscle & Speed"
        kh="វិស្វកម្មសមត្ថភាព — កម្លាំង និងល្បឿន"
        kh_={kh}
        Icon={Rocket}
        tone="red"
      />

      <div className="grid lg:grid-cols-3 gap-4">
        {/* ─── 01 · Physics of Acceleration ───────────────────────────── */}
        <PartCard
          spec="F=ma"
          en="The Physics of Acceleration"
          kh="រូបវិទ្យានៃការបង្កើនល្បឿន"
          kh_={kh}
          Icon={Activity}
          tone="red"
          diagram={<AccelerationDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "Newton's Second Law sums up every race ever run: ",
              "ច្បាប់ទីពីររបស់ Newton សង្ខេបការប្រណាំងគ្រប់ល្បឿន៖ "
            )}
            <strong className="text-red-300">
              {t("Acceleration = Force ÷ Mass", "ការបង្កើនល្បឿន = កម្លាំង ÷ ម៉ាស")}
            </strong>
            {t(
              ". To make a car go faster, an engineer has only two levers — push harder (a bigger engine) or weigh less (a lighter car).",
              "។ ដើម្បីធ្វើឱ្យឡានទៅកាន់តែលឿន វិស្វករមានជម្រើសតែ ២ ប៉ុណ្ណោះ — រុញកាន់តែខ្លាំង (ម៉ាស៊ីនធំជាង) ឬមានទម្ងន់តិច (ឡានស្រាលជាង)។"
            )}
          </p>
          <p>
            {t("That is why a sports car is built around a ", "នោះហើយជាមូលហេតុដែលឡានកីឡាត្រូវបានកសាងជុំវិញ ")}
            <strong className="text-slate-100">
              {t("power-to-weight ratio", "សមាមាត្រថាមពលនិងទម្ងន់")}
            </strong>
            {t(
              " — strip out the heavy steel body panels and the heavy back seats, swap them for lightweight aluminum or carbon fiber, and every gram saved means more acceleration from the same engine.",
              " — ដកបន្ទះដែកធ្ងន់និងកៅអីខាងក្រោយធ្ងន់ ប្ដូរពួកវាជាមួយអាលុយមីញ៉ូមឬកាបូនហ្វៃប័រស្រាល ហើយរាល់ក្រាមដែលសន្សំបានមានន័យថាការបង្កើនល្បឿនច្រើនជាងពីម៉ាស៊ីនដូចគ្នា។"
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Spec en="Newton 2nd Law" kh="ច្បាប់ទី២ Newton" kh_={kh} value="F = ma" tone="red" />
            <Spec en="Power / Weight" kh="ថាមពល/ទម្ងន់" kh_={kh} value="hp/kg" tone="silver" />
            <Spec en="Carbon fiber" kh="កាបូនហ្វៃប័រ" kh_={kh} value="−40 %" tone="silver" />
          </div>
        </PartCard>

        {/* ─── 02 · Heart of the Beast (I4 vs V8) ─────────────────────── */}
        <PartCard
          spec="V8"
          en="The Heart of the Beast"
          kh="បេះដូងនៃសត្វសាហាវ"
          kh_={kh}
          Icon={Flame}
          tone="red"
          diagram={<EngineCompareDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            <strong className="text-slate-200">
              {t("Regular car · ", "ឡានធម្មតា · ")}
            </strong>
            {t(
              "usually a small 4-cylinder engine designed to sip fuel slowly and save money on the daily commute.",
              "ជាធម្មតាមានម៉ាស៊ីន ៤ ស៊ីឡាំងតូច ដែលបានរចនាដើម្បីច្រួសសាំងយឺតៗហើយសន្សំលុយក្នុងការធ្វើដំណើរប្រចាំថ្ងៃ។"
            )}
          </p>
          <p>
            <strong className="text-red-300">
              {t("Muscle car · ", "ឡានសាច់ដុំ · ")}
            </strong>
            {t(
              "a massive V8. A bigger engine has larger cylinders, so it can suck in massive gulps of air and fuel each cycle. Bigger explosions mean a more violent force pushing the pistons down — and that violence is exactly what you feel when the car launches.",
              "V8 ដ៏ធំ។ ម៉ាស៊ីនធំជាងមានស៊ីឡាំងធំជាង ដូច្នេះវាអាចស្រូបខ្យល់និងសាំងយ៉ាងច្រើនក្នុងវដ្តនីមួយៗ។ ការផ្ទុះធំជាងមានន័យថាកម្លាំងសាហាវជាងរុញស៊ីឡាំងចុះ — ហើយភាពសាហាវនោះគឺជាអ្វីដែលអ្នកមានអារម្មណ៍ពេលឡានចេញបិទ។"
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Spec en="Inline-4" kh="៤ ស៊ីឡាំងតម្រង់" kh_={kh} value="≈ 150 hp" tone="silver" />
            <Spec en="V8" kh="V៨" kh_={kh} value="450+ hp" tone="red" />
            <Spec en="Displacement" kh="មាឌស៊ីឡាំង" kh_={kh} value="6.2 L" tone="silver" />
          </div>
        </PartCard>

        {/* ─── 03 · Gripping the Earth (Traction + Aero) ──────────────── */}
        <PartCard
          spec="GRIP"
          en="Gripping the Earth"
          kh="ការអូសទាញនៅលើដី"
          kh_={kh}
          Icon={Scaling}
          tone="red"
          diagram={<TractionAeroDiagram kh={kh} t={t} />}
        >
          <p className="mb-2">
            {t(
              "A huge engine is useless if the tires just spin in the dirt. Two forces decide whether all that power becomes forward motion: grip and air.",
              "ម៉ាស៊ីនធំគឺគ្មានន័យបើកង់គ្រាន់តែវិលនៅលើដី។ កម្លាំងពីរសម្រេចថាតើថាមពលទាំងអស់នោះក្លាយជាចលនាទៅមុខឬទេ៖ ការអូសទាញ និងខ្យល់។"
            )}
          </p>
          <p className="mb-2">
            <strong className="text-red-300">
              {t("Traction · ", "ការអូសទាញ · ")}
            </strong>
            {t(
              "sports cars run incredibly wide, sticky tires to put every horsepower straight into the pavement instead of letting it slip away as smoke.",
              "ឡានកីឡារត់កង់ធំទូលាយនិងស្អិតយ៉ាងខ្លាំង ដើម្បីបញ្ចូលរាល់ horsepower ទៅផ្លូវក្រាលថ្ម ជំនួសឱ្យការបណ្ដោយវាបាត់ជាផ្សែង។"
            )}
          </p>
          <p>
            <strong className="text-slate-200">
              {t("Aerodynamics · ", "លំហូរខ្យល់ · ")}
            </strong>
            {t(
              "regular cars are shaped like boxes; sports cars are shaped like knives. At highway speed, air feels like a solid wall — a wedge slices through it, and a rear ‘spoiler’ flips the airflow so the wind actually pushes the car ",
              "ឡានធម្មតារចនាដូចប្រអប់; ឡានកីឡារចនាដូចកាំបិត។ នៅល្បឿនផ្លូវហាយវេ ខ្យល់មានអារម្មណ៍ដូចជាជញ្ជាំងរឹង — រូបភាពកាំបិតបំបែកកាត់វា ហើយ « spoiler » ខាងក្រោយបង្វិលលំហូរខ្យល់ឱ្យខ្យល់ជំរុញឡាន "
            )}
            <em className="text-red-300">
              {t("down", "ចុះ")}
            </em>
            {t(
              " onto the road, gluing the tires to the asphalt.",
              " មកលើផ្លូវ ដោយជាប់កង់ទៅនឹងផ្លូវដូចសម្ការ។"
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Spec en="Tire width" kh="ទទឹងកង់" kh_={kh} value="305 mm" tone="silver" />
            <Spec en="Drag coeff." kh="មេគុណទាញ" kh_={kh} value="Cd 0.28" tone="silver" />
            <Spec en="Downforce @ 200 km/h" kh="កម្លាំងចុះ @ ២០០ km/h" kh_={kh} value="160 kg" tone="red" />
          </div>
        </PartCard>
      </div>
    </section>
  );
}

// ─── Acceleration: heavy car vs light car under equal force ────────────────
function AccelerationDiagram({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame
      labelEn="F = m × a · SAME FORCE, HALF THE MASS"
      labelKh="F = m × a · កម្លាំងដូចគ្នា ម៉ាសពាក់កណ្ដាល"
      kh={kh}
      tone="red"
    >
      <svg viewBox="0 0 320 140" className="w-full h-auto" aria-hidden>
        {/* Road */}
        <rect x="0" y="106" width="320" height="20" fill={CARBON_FIBER} />
        <line x1="0" y1="118" x2="320" y2="118" stroke="#facc15" strokeWidth="1" strokeDasharray="10 8" opacity="0.55" />

        {/* ── LEFT: REGULAR CAR (heavy, slow) ─────────────────────────── */}
        <g transform="translate(0,0)">
          <text x="10" y="14" fontSize="9" fontFamily="monospace" fill={SILVER} fontWeight="bold">
            {kh ? "ឡានធម្មតា · ធ្ងន់" : "REGULAR · HEAVY"}
          </text>
          {/* Boxy car silhouette */}
          <path d="M 16,90 L 16,72 L 36,60 L 92,60 L 110,76 L 116,90 Z" fill="#374151" stroke={SILVER} strokeWidth="1.2" />
          <rect x="40" y="64" width="40" height="14" fill="#0a0a0a" stroke={SILVER} strokeWidth="0.6" />
          <circle cx="38" cy="98" r="10" fill="#0a0a0a" stroke={SILVER} strokeWidth="1.4" />
          <circle cx="92" cy="98" r="10" fill="#0a0a0a" stroke={SILVER} strokeWidth="1.4" />
          {/* Weight stacks inside */}
          <g>
            <rect x="22" y="74" width="14" height="6" fill={SILVER} />
            <rect x="22" y="80" width="14" height="6" fill="#94a3b8" />
            <rect x="86" y="74" width="14" height="6" fill={SILVER} />
            <rect x="86" y="80" width="14" height="6" fill="#94a3b8" />
            <text x="29" y="92" fontSize="7" fontFamily="monospace" fill="#fde047" textAnchor="middle">m</text>
            <text x="93" y="92" fontSize="7" fontFamily="monospace" fill="#fde047" textAnchor="middle">m</text>
          </g>
          {/* Small force arrow F → */}
          <g transform="translate(118,80)">
            <line x1="0" y1="0" x2="20" y2="0" stroke={RACING_RED} strokeWidth="2.4" />
            <polygon points="20,-4 28,0 20,4" fill={RACING_RED} />
            <text x="0" y="-4" fontSize="8" fontFamily="monospace" fill={RACING_RED} fontWeight="bold">F</text>
          </g>
          {/* Slow speed bar */}
          <text x="10" y="134" fontSize="7" fontFamily="monospace" fill={SILVER}>
            a ={" "}
            <tspan fontWeight="bold" fill="#fca5a5">small</tspan>
          </text>
          <rect x="40" y="129" width="80" height="3" fill="#1f2937" />
          <rect x="40" y="129" width="20" height="3" fill={RACING_RED} />
        </g>

        {/* ── DIVIDER + EQUATION ──────────────────────────────────────── */}
        <line x1="160" y1="20" x2="160" y2="100" stroke={SILVER} strokeWidth="0.6" strokeDasharray="2 3" opacity="0.6" />
        <g transform="translate(160,52)">
          <rect x="-30" y="-12" width="60" height="22" rx="3" fill={CARBON_FIBER} stroke={RACING_RED} strokeWidth="1.2" />
          <text x="0" y="3" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={RACING_RED_LIGHT} fontWeight="bold">
            a = F/m
          </text>
        </g>

        {/* ── RIGHT: SPORT CAR (light, fast) ──────────────────────────── */}
        <g transform="translate(180,0)">
          <text x="118" y="14" fontSize="9" fontFamily="monospace" fill={RACING_RED_LIGHT} textAnchor="end" fontWeight="bold">
            {kh ? "ឡានកីឡា · ស្រាល" : "SPORT · LIGHT"}
          </text>
          {/* Sleek wedge silhouette (slightly shorter to make room for arrow) */}
          <path d="M 6,90 L 6,82 L 24,68 L 86,62 L 110,82 L 116,90 Z" fill="#1c1917" stroke={RACING_RED} strokeWidth="1.4" />
          {/* Tinted window strip */}
          <path d="M 26,74 L 86,68 L 102,82 L 30,82 Z" fill="#0a0a0a" opacity="0.85" />
          {/* Wheels with red brake calipers */}
          <circle cx="26" cy="98" r="10" fill="#0a0a0a" stroke={SILVER} strokeWidth="1.4" />
          <circle cx="96" cy="98" r="10" fill="#0a0a0a" stroke={SILVER} strokeWidth="1.4" />
          <circle cx="26" cy="98" r="3.5" fill={RACING_RED} />
          <circle cx="96" cy="98" r="3.5" fill={RACING_RED} />
          {/* Same-size force arrow F → (equal force, lighter mass) */}
          <g transform="translate(118,80)">
            <line x1="0" y1="0" x2="20" y2="0" stroke={RACING_RED} strokeWidth="2.4" />
            <polygon points="20,-4 28,0 20,4" fill={RACING_RED} />
            <text x="0" y="-4" fontSize="8" fontFamily="monospace" fill={RACING_RED} fontWeight="bold">F</text>
          </g>
          {/* BIG acceleration bar — same force ÷ smaller mass = bigger a */}
          <text x="10" y="134" fontSize="7" fontFamily="monospace" fill={SILVER}>
            a ={" "}
            <tspan fontWeight="bold" fill="#fca5a5">BIG</tspan>
          </text>
          <rect x="40" y="129" width="80" height="3" fill="#1f2937" />
          <rect x="40" y="129" width="74" height="3" fill={RACING_RED} />
        </g>
      </svg>
    </DiagramFrame>
  );
}

// ─── I4 vs V8: small inline cylinders vs big V-arrangement ─────────────────
function EngineCompareDiagram({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame
      labelEn="I4 ECONOMY  vs  V8 MUSCLE"
      labelKh="I៤ សន្សំ  ទល់នឹង  V៨ សាច់ដុំ"
      kh={kh}
      tone="red"
    >
      <svg viewBox="0 0 320 140" className="w-full h-auto" aria-hidden>
        {/* ── LEFT: I4 (small inline cylinders) ───────────────────────── */}
        <g transform="translate(0,0)">
          <text x="10" y="14" fontSize="9" fontFamily="monospace" fill={SILVER} fontWeight="bold">
            {kh ? "I-៤ · សន្សំសាំង" : "INLINE-4 · ECONOMY"}
          </text>
          {/* Engine block backplate */}
          <rect x="6" y="22" width="138" height="84" rx="3" fill={CARBON_FIBER} stroke={SILVER} strokeWidth="0.8" />
          {/* 4 small cylinders in a row */}
          {[0, 1, 2, 3].map((i) => {
            const cx = 22 + i * 30;
            return (
              <g key={`i4-${i}`}>
                <rect x={cx - 9} y={36} width="18" height="44" rx="2" fill="#374151" stroke={SILVER} strokeWidth="0.8" />
                {/* small flame */}
                <ellipse cx={cx} cy={56} rx="6" ry="9" fill="#f97316" opacity="0.7" />
                <ellipse cx={cx} cy={58} rx="3" ry="5" fill="#fde047" opacity="0.85" />
                {/* piston rod */}
                <line x1={cx} y1={80} x2={cx} y2={94} stroke={SILVER} strokeWidth="1.4" />
                <circle cx={cx} cy={97} r="3" fill={SILVER} />
              </g>
            );
          })}
          {/* crankshaft */}
          <line x1="14" y1="97" x2="138" y2="97" stroke={SILVER} strokeWidth="2" />
          <text x="76" y="120" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#cbd5e1">
            {kh ? "≈ ១៥០ horsepower" : "≈ 150 horsepower"}
          </text>
          <text x="76" y="132" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#94a3b8">
            {kh ? "ច្រួសសាំងយឺត" : "sips fuel slowly"}
          </text>
        </g>

        {/* ── DIVIDER ─────────────────────────────────────────────────── */}
        <line x1="160" y1="22" x2="160" y2="106" stroke={SILVER} strokeWidth="0.6" strokeDasharray="2 3" opacity="0.6" />
        <text x="160" y="20" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={RACING_RED} fontWeight="bold">
          vs
        </text>

        {/* ── RIGHT: V8 (8 larger cylinders in V-shape) ───────────────── */}
        <g transform="translate(176,0)">
          <text x="134" y="14" fontSize="9" fontFamily="monospace" fill={RACING_RED_LIGHT} textAnchor="end" fontWeight="bold">
            {kh ? "V៨ · សាច់ដុំ" : "V-8 · MUSCLE"}
          </text>
          {/* Engine block backplate (larger, redder) */}
          <rect x="2" y="22" width="142" height="84" rx="3" fill={CARBON_FIBER} stroke={RACING_RED} strokeWidth="1" />
          {/* 4 left-bank cylinders, tilted left ───────────────────────── */}
          {[0, 1, 2, 3].map((i) => {
            const cx = 18 + i * 22;
            return (
              <g key={`v8L-${i}`} transform={`rotate(-22 ${cx} 90)`}>
                <rect x={cx - 11} y={32} width="22" height="50" rx="2" fill="#3f3f46" stroke={SILVER} strokeWidth="0.9" />
                {/* big flame */}
                <ellipse cx={cx} cy={54} rx="9" ry="14" fill="#dc2626" opacity="0.75" />
                <ellipse cx={cx} cy={56} rx="5" ry="9" fill="#fde047" opacity="0.9" />
                <ellipse cx={cx} cy={58} rx="2.5" ry="5" fill="#fff" opacity="0.85" />
                {/* piston rod */}
                <line x1={cx} y1={82} x2={cx} y2={94} stroke={SILVER} strokeWidth="1.6" />
                <circle cx={cx} cy={97} r="3" fill={SILVER} />
              </g>
            );
          })}
          {/* 4 right-bank cylinders, tilted right ──────────────────────── */}
          {[0, 1, 2, 3].map((i) => {
            const cx = 30 + i * 22;
            return (
              <g key={`v8R-${i}`} transform={`rotate(22 ${cx} 90)`}>
                <rect x={cx - 11} y={32} width="22" height="50" rx="2" fill="#3f3f46" stroke={SILVER} strokeWidth="0.9" />
                <ellipse cx={cx} cy={54} rx="9" ry="14" fill="#dc2626" opacity="0.75" />
                <ellipse cx={cx} cy={56} rx="5" ry="9" fill="#fde047" opacity="0.9" />
                <ellipse cx={cx} cy={58} rx="2.5" ry="5" fill="#fff" opacity="0.85" />
                <line x1={cx} y1={82} x2={cx} y2={94} stroke={SILVER} strokeWidth="1.6" />
                <circle cx={cx} cy={97} r="3" fill={SILVER} />
              </g>
            );
          })}
          {/* crankshaft */}
          <line x1="8" y1="97" x2="136" y2="97" stroke={RACING_RED} strokeWidth="2.4" />
          <text x="72" y="120" textAnchor="middle" fontSize="8" fontFamily="monospace" fill={RACING_RED_LIGHT} fontWeight="bold">
            {kh ? "≥ ៤៥០ horsepower" : "450+ horsepower"}
          </text>
          <text x="72" y="132" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#fca5a5">
            {kh ? "ស្រូបយ៉ាងធំ ផ្ទុះធំ" : "huge gulps · huge bangs"}
          </text>
        </g>
      </svg>
    </DiagramFrame>
  );
}

// ─── Traction + Aero: boxy car (turbulent) vs wedge sports car (downforce) ─
function TractionAeroDiagram({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <DiagramFrame
      labelEn="BOX vs KNIFE · TURBULENCE vs DOWNFORCE"
      labelKh="ប្រអប់ ទល់នឹង កាំបិត · ច្របូកច្របល់ ទល់នឹង កម្លាំងចុះ"
      kh={kh}
      tone="red"
    >
      <svg viewBox="0 0 320 150" className="w-full h-auto" aria-hidden>
        {/* ── TOP ROW: BOX CAR with turbulent airflow ─────────────────── */}
        <g transform="translate(0,0)">
          <text x="6" y="12" fontSize="8" fontFamily="monospace" fill={SILVER} fontWeight="bold">
            {kh ? "ឡានធម្មតា · ប្រអប់" : "REGULAR · BOX"}
          </text>
          {/* Box car silhouette */}
          <path d="M 50,58 L 50,30 L 130,30 L 130,58 Z" fill="#374151" stroke={SILVER} strokeWidth="1" />
          <rect x="60" y="36" width="60" height="14" fill="#0a0a0a" stroke={SILVER} strokeWidth="0.5" />
          {/* Narrow tires */}
          <ellipse cx="62"  cy="60" rx="6" ry="4" fill="#0a0a0a" stroke={SILVER} strokeWidth="0.8" />
          <ellipse cx="118" cy="60" rx="6" ry="4" fill="#0a0a0a" stroke={SILVER} strokeWidth="0.8" />
          {/* Turbulent airflow crashing into the front */}
          <g stroke={RACING_RED} strokeWidth="1" fill="none" opacity="0.85">
            <path d="M 160,34 Q 152,28 144,32 Q 136,28 130,34" />
            <path d="M 160,42 Q 150,46 142,40 Q 134,46 130,42" />
            <path d="M 160,50 Q 152,56 144,50 Q 136,56 130,50" />
            <circle cx="146" cy="38" r="3" fill="none" />
            <circle cx="148" cy="48" r="2.5" fill="none" />
            <circle cx="142" cy="44" r="2" fill="none" />
          </g>
          {/* Smooth incoming streamlines */}
          <g stroke={SILVER} strokeWidth="0.7" fill="none" opacity="0.55">
            <line x1="170" y1="34" x2="220" y2="34" />
            <line x1="170" y1="42" x2="220" y2="42" />
            <line x1="170" y1="50" x2="220" y2="50" />
          </g>
          {/* Drag warning arrow ← */}
          <g transform="translate(230,42)">
            <line x1="0" y1="0" x2="22" y2="0" stroke={RACING_RED} strokeWidth="2" />
            <polygon points="0,-4 -8,0 0,4" fill={RACING_RED} />
            <text x="26" y="3" fontSize="8" fontFamily="monospace" fill={RACING_RED} fontWeight="bold">
              {kh ? "ទាញ" : "DRAG"}
            </text>
          </g>
          {/* Ground */}
          <line x1="0" y1="64" x2="320" y2="64" stroke={SILVER} strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* ── BOTTOM ROW: WEDGE SPORTS CAR with smooth flow + downforce ── */}
        <g transform="translate(0,72)">
          <text x="6" y="12" fontSize="8" fontFamily="monospace" fill={RACING_RED_LIGHT} fontWeight="bold">
            {kh ? "ឡានកីឡា · កាំបិត" : "SPORT · KNIFE"}
          </text>
          {/* Wedge silhouette + spoiler */}
          <path d="M 40,60 L 56,46 L 100,34 L 130,38 L 132,44 L 132,60 Z" fill="#1c1917" stroke={RACING_RED} strokeWidth="1.2" />
          {/* Spoiler (rear wing) */}
          <rect x="32" y="40" width="14" height="3" fill={RACING_RED} />
          <line x1="38" y1="43" x2="38" y2="50" stroke={RACING_RED} strokeWidth="1.2" />
          {/* Wide sticky tires */}
          <ellipse cx="50"  cy="62" rx="11" ry="5" fill="#0a0a0a" stroke={RACING_RED} strokeWidth="1" />
          <ellipse cx="120" cy="62" rx="11" ry="5" fill="#0a0a0a" stroke={RACING_RED} strokeWidth="1" />
          {/* Smooth streamlines flowing OVER the body */}
          <g stroke={SILVER} strokeWidth="0.8" fill="none" opacity="0.85">
            <path d="M 220,30 Q 180,28 140,36 Q 110,30 70,40 Q 56,42 42,42" />
            <path d="M 220,38 Q 180,36 145,42 Q 110,40 75,46 Q 60,46 46,46" />
            <path d="M 220,46 Q 180,46 150,50 Q 120,52 90,54 Q 70,54 54,52" />
          </g>
          {/* Streamline arrow heads (incoming wind direction) */}
          <polygon points="220,30 226,33 220,36" fill={SILVER} opacity="0.85" />
          <polygon points="220,38 226,41 220,44" fill={SILVER} opacity="0.85" />
          <polygon points="220,46 226,49 220,52" fill={SILVER} opacity="0.85" />
          {/* Downforce arrows pushing car DOWN */}
          {[58, 78, 98, 118].map((x) => (
            <g key={`df-${x}`}>
              <line x1={x} y1="20" x2={x} y2="32" stroke={RACING_RED} strokeWidth="1.6" />
              <polygon points={`${x - 3},32 ${x + 3},32 ${x},38`} fill={RACING_RED} />
            </g>
          ))}
          <text x="88" y="18" textAnchor="middle" fontSize="8" fontFamily="monospace" fill={RACING_RED_LIGHT} fontWeight="bold">
            {kh ? "កម្លាំងចុះ ↓" : "DOWNFORCE ↓"}
          </text>
          {/* Ground */}
          <line x1="0" y1="68" x2="320" y2="68" stroke={SILVER} strokeWidth="0.5" opacity="0.5" />
        </g>
      </svg>
    </DiagramFrame>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Hypercar Hall of Fame · សាលកិត្តិយសនៃរថយន្តល្បឿនលឿន
//
//  A "leisure-reading" showroom that lives below the engineering bays.
//  Aesthetic: deep matte-black, glass-morphism cards, glowing metallic
//  accents — a luxury showroom display rather than a textbook page.
// ════════════════════════════════════════════════════════════════════════════

type Hypercar = {
  code: string;
  nameEn: string;
  nameKh: string;
  countryEn: string;
  countryKh: string;
  countryCode: string;
  flagColors: [string, string, string]; // 3 horizontal stripes (top→bottom)
  accent: string;                       // glow color (hex)
  topSpeed: string;
  horsepower: string;
  factEn: string;
  factKh: string;
  imageSrc: string;                     // Wikimedia Commons (CC) photo
  imageCredit: string;                  // attribution / source line
};

const HYPERCARS: Hypercar[] = [
  {
    code: "BUG",
    nameEn: "Bugatti Chiron",
    nameKh: "Bugatti Chiron",
    countryEn: "France",
    countryKh: "ប្រទេសបារាំង",
    countryCode: "FRA",
    flagColors: ["#0055A4", "#FFFFFF", "#EF4135"],
    accent: "#60a5fa",
    topSpeed: "420 km/h",
    horsepower: "1,500 hp",
    factEn:
      "To go over 400 km/h, the engine sucks in 60,000 liters of air every minute. It needs 10 radiators just to stop the engine from melting.",
    factKh:
      "ដើម្បីបើកលើស ៤០០ km/h ម៉ាស៊ីនស្រូបខ្យល់ ៦០,០០០ លីត្រក្នុងមួយនាទី។ វាត្រូវការប្រដាប់បំប៉ោងត្រជាក់ ១០ ដើម្បីការពារកុំឱ្យម៉ាស៊ីនរលាយ។",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bugatti_Chiron_Royal_Blue.jpg/960px-Bugatti_Chiron_Royal_Blue.jpg",
    imageCredit: "Wikimedia Commons (CC)",
  },
  {
    code: "LMB",
    nameEn: "Lamborghini Aventador",
    nameKh: "Lamborghini Aventador",
    countryEn: "Italy",
    countryKh: "ប្រទេសអ៊ីតាលី",
    countryCode: "ITA",
    flagColors: ["#009246", "#FFFFFF", "#CE2B37"],
    accent: "#fbbf24",
    topSpeed: "350 km/h",
    horsepower: "770 hp",
    factEn:
      "Features a massive naturally aspirated V12 engine and is shaped like a fighter jet to slice through wind resistance.",
    factKh:
      "មានម៉ាស៊ីន V12 ដ៏ធំធេងបែប naturally aspirated ហើយរូបរាងដូចយន្តហោះចម្បាំង ដើម្បីបំបែកកាត់កម្លាំងទាញខ្យល់។",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Lamborghini_Aventador_LP750-4_SV_IMG_9103.jpg/960px-Lamborghini_Aventador_LP750-4_SV_IMG_9103.jpg",
    imageCredit: "Wikimedia Commons (CC)",
  },
  {
    code: "FER",
    nameEn: "Ferrari SF90 Stradale",
    nameKh: "Ferrari SF90 Stradale",
    countryEn: "Italy",
    countryKh: "ប្រទេសអ៊ីតាលី",
    countryCode: "ITA",
    flagColors: ["#009246", "#FFFFFF", "#CE2B37"],
    accent: "#ef4444",
    topSpeed: "340 km/h",
    horsepower: "1,000 hp",
    factEn:
      "Uses hybrid technology. It combines a roaring V8 engine with electric motors to create instant, explosive acceleration.",
    factKh:
      "ប្រើបច្ចេកវិទ្យា hybrid — បញ្ចូលម៉ាស៊ីន V8 ដ៏សាហាវជាមួយម៉ូទ័រអគ្គិសនី ដើម្បីបង្កើតការបង្កើនល្បឿនភ្លាមៗ និងផ្ទុះ។",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/2024_Ferrari_SF90_XX_Stradale_in_Bianco_Artico%2C_front_left.jpg/960px-2024_Ferrari_SF90_XX_Stradale_in_Bianco_Artico%2C_front_left.jpg",
    imageCredit: "Wikimedia Commons (CC)",
  },
  {
    code: "POR",
    nameEn: "Porsche 911 Turbo S",
    nameKh: "Porsche 911 Turbo S",
    countryEn: "Germany",
    countryKh: "ប្រទេសអាល្លឺម៉ង់",
    countryCode: "DEU",
    flagColors: ["#000000", "#DD0000", "#FFCE00"],
    accent: "#facc15",
    topSpeed: "330 km/h",
    horsepower: "640 hp",
    factEn:
      "The engine is in the back of the car. This puts massive heavy weight directly over the rear tires, giving it incredible grip when accelerating.",
    factKh:
      "ម៉ាស៊ីននៅខាងក្រោយឡាន។ វាដាក់ទម្ងន់ធំៗដោយផ្ទាល់លើកង់ខាងក្រោយ ផ្តល់ការអូសទាញដ៏អស្ចារ្យពេលបង្កើនល្បឿន។",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Porsche_992_Turbo_S_1X7A6046_%28cropped%29.jpg/960px-Porsche_992_Turbo_S_1X7A6046_%28cropped%29.jpg",
    imageCredit: "Wikimedia Commons (CC)",
  },
  {
    code: "COR",
    nameEn: "Chevrolet Corvette Z06",
    nameKh: "Chevrolet Corvette Z06",
    countryEn: "USA",
    countryKh: "សហរដ្ឋអាមេរិក",
    countryCode: "USA",
    flagColors: ["#B22234", "#FFFFFF", "#3C3B6E"],
    accent: "#f87171",
    topSpeed: "315 km/h",
    horsepower: "670 hp",
    factEn:
      "American Muscle perfected. It uses a flat-plane crank V8 that revs so fast it sounds like a race car, proving that raw force can rival million-dollar exotics.",
    factKh:
      "សាច់ដុំអាមេរិកក្នុងភាពល្អឥតខ្ចោះ។ ប្រើ V8 បែប flat-plane crank ដែលវិលលឿនរហូតស្តាប់ដូចឡានប្រណាំង — បង្ហាញថាកម្លាំងឆៅអាចប្រកួតប្រជែងជាមួយឡានកម្រតម្លៃរាប់លានដុល្លារ។",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Corvette_Z06%2C_BAS_24%2C_Brussels_%28P1170397-RR%29.jpg/960px-Corvette_Z06%2C_BAS_24%2C_Brussels_%28P1170397-RR%29.jpg",
    imageCredit: "Wikimedia Commons (CC)",
  },
  {
    code: "AMV",
    nameEn: "Aston Martin Valkyrie",
    nameKh: "Aston Martin Valkyrie",
    countryEn: "United Kingdom",
    countryKh: "ចក្រភពអង់គ្លេស",
    countryCode: "GBR",
    flagColors: ["#012169", "#FFFFFF", "#C8102E"],
    accent: "#22d3ee",
    topSpeed: "350 km/h",
    horsepower: "1,160 hp",
    factEn:
      "Designed by Formula 1 engineers. The bottom of the car is shaped to suck the vehicle down onto the road, creating massive 'downforce'.",
    factKh:
      "រចនាដោយវិស្វករ Formula 1។ ខាងក្រោមឡានរចនាដើម្បីស្រូបឡានចុះមកលើផ្លូវ បង្កើតកម្លាំងចុះ « downforce » ដ៏ធំ។",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/2019_Aston_Martin_Valkyrie_AMR_Pro_6.5_Front.jpg/1920px-2019_Aston_Martin_Valkyrie_AMR_Pro_6.5_Front.jpg",
    imageCredit: "Wikimedia Commons (CC)",
  },
];

function HypercarHallOfFame({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section
      id="hypercar-hall"
      className="mt-12 scroll-mt-24"
      data-testid="hypercar-hall"
    >
      {/* ─── Section divider · glowing speedometer line + intro ────────── */}
      <SpeedometerDivider kh={kh} t={t} />

      {/* ─── Section header ────────────────────────────────────────────── */}
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase rounded px-2 py-0.5 border text-red-300 bg-red-500/10 border-red-500/50">
          SHOWROOM
        </span>
        <Trophy className="w-5 h-5 text-red-300" aria-hidden="true" />
        <h2 className={`text-xl sm:text-2xl font-bold text-slate-50 ${kh ? "font-khmer" : ""}`}>
          {t(
            "The Hypercar Hall of Fame",
            "សាលកិត្តិយសនៃរថយន្តល្បឿនលឿន"
          )}
        </h2>
        <div className="flex-1 border-t border-dashed border-red-500/30" />
      </div>

      {/* ─── Horizontal scrolling showroom carousel ────────────────────── */}
      <div className="relative">
        {/* edge-fade hints that there is more to scroll */}
        <span aria-hidden className="pointer-events-none absolute top-0 right-0 bottom-4 w-10 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
        <span aria-hidden className="pointer-events-none absolute top-0 left-0 bottom-4 w-6 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div
          className="overflow-x-auto pb-4 -mx-4 sm:-mx-6 px-4 sm:px-6 snap-x snap-mandatory scrollbar-thin"
          data-testid="hypercar-carousel"
          style={{
            scrollbarColor: "#dc2626 #1c1917",
          }}
        >
          <div className="flex gap-4 sm:gap-5">
            {HYPERCARS.map((car) => (
              <HypercarCard key={car.code} car={car} kh={kh} t={t} />
            ))}
          </div>
        </div>

        {/* Scroll-hint label */}
        <p className={`mt-2 text-center text-[11px] font-mono uppercase tracking-widest text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {t("← scroll the showroom →", "← អូសមើលរោងតាំង →")}
        </p>
      </div>
    </section>
  );
}

// ─── Glowing speedometer-line section divider with bilingual intro ────────
function SpeedometerDivider({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <div className="my-10 sm:my-12">
      {/* The glowing line */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent">
        {/* Pulsing dot (radar-style ping) at center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden
            className="absolute inline-flex h-4 w-4 rounded-full bg-red-500 opacity-60 animate-ping"
            style={{ left: "-8px", top: "-8px" }}
          />
          <span
            aria-hidden
            className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"
            style={{ boxShadow: "0 0 14px rgba(220,38,38,0.95), 0 0 28px rgba(220,38,38,0.5)" }}
          />
        </div>
        {/* Tick marks left + right */}
        <span aria-hidden className="absolute -top-1 left-[20%] h-3 w-px bg-red-500/40" />
        <span aria-hidden className="absolute -top-1 left-[35%] h-2 w-px bg-red-500/30" />
        <span aria-hidden className="absolute -top-1 right-[35%] h-2 w-px bg-red-500/30" />
        <span aria-hidden className="absolute -top-1 right-[20%] h-3 w-px bg-red-500/40" />
        {/* "0" / "MAX" labels */}
        <span aria-hidden className="absolute -top-5 left-0 text-[9px] font-mono text-red-400/60 tracking-widest">
          0
        </span>
        <span aria-hidden className="absolute -top-5 right-0 text-[9px] font-mono text-red-400/60 tracking-widest">
          MAX
        </span>
      </div>

      {/* Bilingual intro */}
      <div className="mt-8 max-w-3xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 mb-3 text-[10px] font-mono uppercase tracking-[0.3em] text-red-300/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <span className="w-6 h-px bg-red-500/50" />
          {t("Engineering meets art", "វិស្វកម្មជួបនឹងសិល្បៈ")}
          <span className="w-6 h-px bg-red-500/50" />
        </div>
        <p className={`text-base sm:text-lg italic text-slate-200 leading-relaxed ${kh ? "font-khmer not-italic leading-loose" : ""}`}>
          {t(
            "“When engineers push the laws of physics to the absolute limit, this is what they build.”",
            "« នៅពេលដែលវិស្វករជំរុញច្បាប់រូបវិទ្យាដល់កម្រិតអតិបរមា នេះគឺជាអ្វីដែលពួកគេបង្កើត។ »"
          )}
        </p>
      </div>
    </div>
  );
}

// ─── A single glass-morphism showroom card ────────────────────────────────
function HypercarCard({
  car, kh, t,
}: { car: Hypercar; kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <article
      className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl overflow-hidden relative border border-white/10 transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "rgba(15, 15, 18, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: `0 10px 30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.02)`,
      }}
      data-testid={`hypercar-${car.code.toLowerCase()}`}
    >
      {/* glowing top-edge accent in the car's signature color */}
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${car.accent} 50%, transparent 100%)`,
          boxShadow: `0 0 12px ${car.accent}`,
        }}
      />

      {/* ── HERO IMAGE ─────────────────────────────────────────────────
          Real photo from Wikimedia Commons (CC). The wrapper crops via
          `overflow-hidden` so the inner <img> can scale on hover without
          spilling over the card. `object-cover` fills the 16:10 frame
          without distorting the aspect ratio. */}
      <div
        className="group relative aspect-[16/10] overflow-hidden border-b border-white/5"
        style={{ backgroundColor: "#0c0a09" }}
      >
        <img
          src={car.imageSrc}
          alt={car.nameEn}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* subtle bottom-fade so the white text below the photo reads */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(15,15,18,0.55))",
          }}
        />
        {/* corner ID */}
        <span
          aria-hidden
          className="absolute top-2 left-2 text-[9px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-black/55 backdrop-blur-sm"
          style={{ color: car.accent, opacity: 0.95 }}
        >
          {car.code}-{car.countryCode}
        </span>
      </div>

      {/* ── CONTENT ────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5">
        {/* Car name */}
        <h3 className={`text-lg sm:text-xl font-bold text-slate-50 leading-tight ${kh ? "font-khmer leading-snug" : ""}`}>
          {kh ? car.nameKh : car.nameEn}
        </h3>

        {/* Country pill */}
        <div className="mt-2 flex items-center gap-2">
          <CountryFlagPill colors={car.flagColors} />
          <MapPin className="w-3 h-3 text-slate-500" aria-hidden="true" />
          <span className={`text-xs text-slate-400 ${kh ? "font-khmer text-sm" : ""}`}>
            {kh ? car.countryKh : car.countryEn}
          </span>
          <span className="text-[9px] font-mono text-slate-600 ml-auto">{car.countryCode}</span>
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <StatBox
            Icon={Gauge}
            labelEn="Top Speed"
            labelKh="ល្បឿនអតិបរមា"
            value={car.topSpeed}
            kh={kh}
            accent={car.accent}
          />
          <StatBox
            Icon={Zap}
            labelEn="Horsepower"
            labelKh="កម្លាំងសេះ"
            value={car.horsepower}
            kh={kh}
            accent={car.accent}
          />
        </div>

        {/* Physics fact */}
        <div className="mt-4 rounded-xl border border-white/5 bg-black/40 p-3">
          <div className={`flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.2em] mb-1.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
               style={{ color: car.accent }}>
            <Activity className="w-3 h-3" aria-hidden="true" />
            {t("Physics Fact", "ការពិតរូបវិទ្យា")}
          </div>
          <p className={`text-xs sm:text-[13px] text-slate-300 ${kh ? "font-khmer leading-loose text-sm" : "leading-relaxed"}`}>
            {kh ? car.factKh : car.factEn}
          </p>
        </div>
      </div>
    </article>
  );
}

// ─── Tiny 3-stripe horizontal flag pill (no emoji) ─────────────────────────
function CountryFlagPill({ colors }: { colors: [string, string, string] }) {
  return (
    <div className="inline-flex flex-col w-7 h-4 rounded-sm overflow-hidden border border-white/15 shadow-sm">
      <div className="flex-1" style={{ backgroundColor: colors[0] }} />
      <div className="flex-1" style={{ backgroundColor: colors[1] }} />
      <div className="flex-1" style={{ backgroundColor: colors[2] }} />
    </div>
  );
}

// ─── Stat box for a hypercar card ──────────────────────────────────────────
function StatBox({
  Icon, labelEn, labelKh, value, kh, accent,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  labelEn: string; labelKh: string; value: string; kh: boolean; accent: string;
}) {
  return (
    <div
      className="rounded-lg border border-white/5 bg-black/40 px-2.5 py-2"
      style={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.02)` }}
    >
      <div className={`flex items-center gap-1 text-[9px] font-mono uppercase tracking-[0.15em] text-slate-500 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
        <Icon className="w-3 h-3" aria-hidden="true" />
        <span className="truncate">{kh ? labelKh : labelEn}</span>
      </div>
      <div
        className="font-mono font-bold text-base sm:text-lg leading-none"
        style={{ color: accent, textShadow: `0 0 10px ${accent}55` }}
      >
        {value}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  The Electric Revolution · បដិវត្តន៍អគ្គិសនី
//
//  Final section · "Clean Tech" aesthetic — deep slate, neon cyan and
//  electric green accents, sleek glass surfaces. Three sub-sections explain
//  why an EV is a fundamentally different machine from the gas cars above.
// ════════════════════════════════════════════════════════════════════════════

const EV_CYAN = "#22d3ee";
const EV_GREEN = "#4ade80";

function EvRevolution({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section
      id="ev-revolution"
      className="mt-12 scroll-mt-24"
      data-testid="ev-revolution"
    >
      {/* ── Section divider · circuit-trace pulse ───────────────────────── */}
      <CircuitDivider kh={kh} t={t} />

      {/* ── Section header ──────────────────────────────────────────────── */}
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase rounded px-2 py-0.5 border text-cyan-300 bg-cyan-500/10 border-cyan-500/50">
          EV · CLEAN TECH
        </span>
        <Zap className="w-5 h-5 text-cyan-300" aria-hidden="true" />
        <h2 className={`text-xl sm:text-2xl font-bold text-slate-50 ${kh ? "font-khmer" : ""}`}>
          {t(
            "The Electric Revolution: Instant Torque",
            "បដិវត្តន៍អគ្គិសនី៖ កម្លាំងបង្វិលជុំភ្លាមៗ"
          )}
        </h2>
        <div className="flex-1 border-t border-dashed border-cyan-500/30" />
      </div>

      {/* ── Three sub-sections ─────────────────────────────────────────── */}
      <div className="space-y-6">
        <EvCard
          number="01"
          Icon={Power}
          titleEn="The Light Switch vs. The Water Pump"
          titleKh="កុងតាក់ភ្លើង និងម៉ាស៊ីនបូមទឹក"
          diagram={<PowerDeliveryDiagram kh={kh} />}
          kh={kh}
          bodyEn={
            <>
              A gas engine works like a <strong className="text-cyan-200">water pump</strong> — it has to{" "}
              <em className="not-italic text-cyan-200">rev up</em>, spinning faster and faster, before it can deliver maximum{" "}
              <BiTerm en="torque" kh="កម្លាំងបង្វិលជុំ" accent={EV_CYAN} />. That takes time.
              {" "}An electric motor works like a <strong className="text-emerald-200">light switch</strong>. The
              millisecond your foot touches the pedal, <strong className="text-emerald-200">100% of the electrical current</strong>
              {" "}floods into the magnets and the wheels twist with full force. This is why a $50,000 EV can
              beat a million-dollar gas car off the line in a short drag race — the gas car is still
              "spinning up" while the EV is already gone.
            </>
          }
          bodyKh={
            <>
              ម៉ាស៊ីនប្រេងដំណើរការដូចជា <strong className="text-cyan-200">ម៉ាស៊ីនបូមទឹក</strong> — វាត្រូវ{" "}
              <em className="not-italic text-cyan-200">បង្វិលឡើង</em> វិលកាន់តែលឿនៗ មុននឹងវាអាចផ្តល់នូវ{" "}
              <BiTerm en="torque" kh="កម្លាំងបង្វិលជុំ" accent={EV_CYAN} />អតិបរមា។ វាត្រូវការពេលវេលា។
              {" "}ម៉ូទ័រអគ្គិសនីវិញដំណើរការដូចជា <strong className="text-emerald-200">កុងតាក់ភ្លើង</strong>។
              ភ្លាមៗដែលជើងរបស់អ្នកប៉ះឈ្នាន់ <strong className="text-emerald-200">១០០% នៃចរន្តអគ្គិសនី</strong>
              {" "}ហូរចូលដ៏កម្បាំង ហើយកង់រួមដោយកម្លាំងពេញលេញ។ នេះជាមូលហេតុដែលឡាន EV តម្លៃ ៥០,០០០ ដុល្លារ
              អាចឈ្នះឡានប្រេងតម្លៃរាប់លានដុល្លារក្នុងការប្រណាំង drag ខ្លី — ឡានប្រេងនៅតែ «បង្វិលឡើង»
              ខណៈដែល EV បានចាកចេញរួចហើយ។
            </>
          }
          chips={[
            { en: "Gas · ramp-up", kh: "ប្រេង · បង្វិលឡើង", tone: "slate" },
            { en: "EV · 100% @ 0.001 s", kh: "EV · ១០០% @ ០.០០១ វិ", tone: "cyan" },
          ]}
        />

        <EvCard
          number="02"
          Icon={Layers}
          titleEn="The Skateboard Chassis"
          titleKh="តួទម្ររាងក្ដារស្គី"
          diagram={<SkateboardChassisDiagram kh={kh} />}
          kh={kh}
          bodyEn={
            <>
              An EV completely re-shapes the physics of the car. Instead of a heavy iron engine bolted into
              the front, the EV's massive <strong className="text-cyan-200">battery pack</strong> is laid
              {" "}<strong className="text-emerald-200">completely flat across the entire floor</strong> — like
              a skateboard. That single change drops the{" "}
              <BiTerm en="center of gravity" kh="ចំណុចកណ្តាលនៃទំនាញ" accent={EV_GREEN} />
              {" "}to ankle height. A car with a low{" "}
              <BiTerm en="center of gravity" kh="ចំណុចកណ្តាលនៃទំនាញ" accent={EV_GREEN} />
              {" "}sticks to the road through tight corners and refuses to flip — the same reason race
              cars are built low and wide.
            </>
          }
          bodyKh={
            <>
              EV ផ្លាស់ប្តូរច្បាប់រូបវិទ្យានៃឡានទាំងស្រុង។ ជំនួសឱ្យម៉ាស៊ីនដែកធ្ងន់ដាក់នៅខាងមុខ
              <strong className="text-cyan-200"> កញ្ចប់ថ្ម (battery pack)</strong>យក្សរបស់ EV ត្រូវដាក់
              {" "}<strong className="text-emerald-200">រាបស្មើពេញកម្រាលឡាន</strong> — ដូចជាក្ដារស្គី។
              ការផ្លាស់ប្តូរតែមួយនេះធ្វើឱ្យ{" "}
              <BiTerm en="center of gravity" kh="ចំណុចកណ្តាលនៃទំនាញ" accent={EV_GREEN} />
              {" "}ទាបដល់កម្រិតកជើង។ ឡានដែលមាន{" "}
              <BiTerm en="center of gravity" kh="ចំណុចកណ្តាលនៃទំនាញ" accent={EV_GREEN} />
              {" "}ទាប នឹងជាប់ផ្លូវយ៉ាងរឹងតាមជ្រុងតឹងៗ ហើយមិនធ្លាក់ទំលើ —
              ដូចជាមូលហេតុដែលឡានប្រណាំងត្រូវបានសាងសង់ទាប និងធំទូលាយ។
            </>
          }
          chips={[
            { en: "Gas · COG high", kh: "ប្រេង · ទំនាញខ្ពស់", tone: "slate" },
            { en: "EV · COG ankle-low", kh: "EV · ទំនាញទាបដល់កជើង", tone: "green" },
          ]}
        />

        <EvCard
          number="03"
          Icon={BatteryCharging}
          titleEn="Regenerative Braking"
          titleKh="ការចាប់ហ្វ្រាំងបង្កើតថាមពល"
          diagram={<RegenBrakingDiagram kh={kh} />}
          kh={kh}
          bodyEn={
            <>
              Here is the most elegant trick in the entire EV playbook: an electric{" "}
              <BiTerm en="motor" kh="ម៉ូទ័រ" accent={EV_CYAN} /> and an electric{" "}
              <BiTerm en="generator" kh="ម៉ាស៊ីនភ្លើង" accent={EV_GREEN} /> are
              the <strong className="text-emerald-200">same machine</strong> — just running in reverse.
              Press the pedal: electricity flows into the motor, the motor spins the wheels. Lift your foot
              off: the rolling wheels now spin the motor, the motor becomes a generator, and electricity
              flows the <strong className="text-emerald-200">other direction</strong> — straight back into
              the battery. The car slows itself down by turning its own forward motion into{" "}
              <em className="not-italic text-emerald-200">free fuel</em>. Every red light is a small refuel.
            </>
          }
          bodyKh={
            <>
              នេះគឺជាល្បិចដ៏អស្ចារ្យបំផុតក្នុងសៀវភៅរបស់ EV ទាំងមូល៖
              <BiTerm en="motor" kh="ម៉ូទ័រ" accent={EV_CYAN} />អគ្គិសនី និង
              <BiTerm en="generator" kh="ម៉ាស៊ីនភ្លើង" accent={EV_GREEN} />អគ្គិសនី គឺជា{" "}
              <strong className="text-emerald-200">ម៉ាស៊ីនដូចគ្នា</strong> — គ្រាន់តែដំណើរការច្រាសវិញប៉ុណ្ណោះ។
              ចុចឈ្នាន់ប្រេង៖ អគ្គិសនីហូរចូលម៉ូទ័រ ម៉ូទ័រវិលកង់។ លើកជើងចេញ៖ កង់ដែលកំពុងវិល
              ឥឡូវនេះវិលម៉ូទ័រ ម៉ូទ័រក្លាយជាម៉ាស៊ីនភ្លើង ហើយអគ្គិសនីហូរ
              <strong className="text-emerald-200">ផ្លូវផ្ទុយ</strong> — ត្រឡប់ចូលថ្មវិញ។
              ឡានបន្ថយល្បឿនដោយខ្លួនឯងដោយការបំលែងចលនារបស់វាទៅជា
              <em className="not-italic text-emerald-200"> ឥន្ធនៈឥតគិតថ្លៃ</em>។ ភ្លើងក្រហមនីមួយៗគឺជាការដាក់ឥន្ធនៈតិចតួច។
            </>
          }
          chips={[
            { en: "Drive · ⚡ → wheels", kh: "បើក · ⚡ → កង់", tone: "cyan" },
            { en: "Brake · wheels → ⚡ → battery", kh: "ហ្វ្រាំង · កង់ → ⚡ → ថ្ម", tone: "green" },
          ]}
        />
      </div>
    </section>
  );
}

// ─── Bilingual term — always shows BOTH languages inline ─────────────────
function BiTerm({ en, kh, accent }: { en: string; kh: string; accent: string }) {
  return (
    <strong
      className="font-bold whitespace-nowrap"
      style={{ color: accent, textShadow: `0 0 8px ${accent}55` }}
    >
      {en} <span className="font-khmer font-normal text-xs opacity-90">({kh})</span>
    </strong>
  );
}

// ─── Section divider · animated electric circuit-trace ───────────────────
function CircuitDivider({
  kh, t,
}: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <div className="my-10 sm:my-12">
      <div className="relative h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent">
        {/* Pulse ping at center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden
            className="absolute inline-flex h-4 w-4 rounded-full bg-cyan-400 opacity-60 animate-ping"
            style={{ left: "-8px", top: "-8px" }}
          />
          <span
            aria-hidden
            className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400"
            style={{ boxShadow: "0 0 14px rgba(34,211,238,0.95), 0 0 28px rgba(74,222,128,0.5)" }}
          />
        </div>
        {/* Tick nodes */}
        {[15, 30, 70, 85].map((p) => (
          <span
            key={p}
            aria-hidden
            className="absolute -top-1 h-2 w-2 rounded-full"
            style={{
              left: `${p}%`,
              backgroundColor: p < 50 ? "rgba(34,211,238,0.6)" : "rgba(74,222,128,0.6)",
              boxShadow: `0 0 6px ${p < 50 ? "rgba(34,211,238,0.8)" : "rgba(74,222,128,0.8)"}`,
              transform: "translateY(-3px)",
            }}
          />
        ))}
      </div>

      <div className="mt-8 max-w-3xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 mb-3 text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300/80 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <span className="w-6 h-px bg-cyan-400/50" />
          {t("Now switch off the gas", "ឥឡូវបិទប្រេងវិញ")}
          <span className="w-6 h-px bg-cyan-400/50" />
        </div>
        <p className={`text-base sm:text-lg italic text-slate-200 leading-relaxed ${kh ? "font-khmer not-italic leading-loose" : ""}`}>
          {t(
            "“The combustion engine spent 130 years learning to be polite. The electric motor doesn't have to ask permission.”",
            "« ម៉ាស៊ីនផ្ទុះបានចំណាយពេល ១៣០ ឆ្នាំដើម្បីរៀនមានឫកល្អ។ ម៉ូទ័រអគ្គិសនីវិញមិនចាំបាច់សុំការអនុញ្ញាតទេ។ »"
          )}
        </p>
      </div>
    </div>
  );
}

// ─── A single clean-tech EV explanation card ─────────────────────────────
type EvChip = { en: string; kh: string; tone: "slate" | "cyan" | "green" };

function EvCard({
  number, Icon, titleEn, titleKh, diagram, bodyEn, bodyKh, chips, kh,
}: {
  number: string;
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>;
  titleEn: string;
  titleKh: string;
  diagram: React.ReactNode;
  bodyEn: React.ReactNode;
  bodyKh: React.ReactNode;
  chips: EvChip[];
  kh: boolean;
}) {
  return (
    <article
      className="relative rounded-2xl border border-cyan-500/15 overflow-hidden p-5 sm:p-6"
      style={{
        backgroundColor: "rgba(2, 6, 23, 0.72)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(34,211,238,0.08), 0 0 0 1px rgba(34,211,238,0.04)",
      }}
      data-testid={`ev-card-${number}`}
    >
      {/* glowing top edge — cyan→green gradient */}
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #22d3ee 30%, #4ade80 70%, transparent 100%)",
          boxShadow: "0 0 14px rgba(34,211,238,0.6)",
        }}
      />

      {/* faint dotted-grid background */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #22d3ee 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative">
        {/* Header row */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: "rgba(34,211,238,0.10)",
              border: "1px solid rgba(34,211,238,0.30)",
              boxShadow: "0 0 18px rgba(34,211,238,0.20), inset 0 0 0 1px rgba(74,222,128,0.05)",
            }}
          >
            <Icon className="w-6 h-6 text-cyan-300" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400/80">
              SECTION {number}
            </div>
            <h3 className={`text-base sm:text-lg font-bold text-slate-50 mt-0.5 ${kh ? "font-khmer leading-snug" : ""}`}>
              {kh ? titleKh : titleEn}
            </h3>
            <div className={`text-xs sm:text-sm text-cyan-200/70 mt-1 ${kh ? "" : "font-khmer"}`}>
              {kh ? titleEn : titleKh}
            </div>
          </div>
        </div>

        {/* Diagram */}
        <div className="mt-5">{diagram}</div>

        {/* Tone chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <EvChipTag key={i} chip={c} kh={kh} />
          ))}
        </div>

        {/* Body text */}
        <p className={`mt-4 text-sm sm:text-[15px] text-slate-200 ${kh ? "font-khmer leading-loose text-base" : "leading-relaxed"}`}>
          {kh ? bodyKh : bodyEn}
        </p>
      </div>
    </article>
  );
}

function EvChipTag({ chip, kh }: { chip: EvChip; kh: boolean }) {
  const cls =
    chip.tone === "cyan"
      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-200"
      : chip.tone === "green"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
      : "border-slate-600 bg-slate-800/50 text-slate-300";
  return (
    <span
      className={`inline-flex items-center text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border ${cls} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
    >
      {kh ? chip.kh : chip.en}
    </span>
  );
}

// ─── Frame for EV diagrams (cyan tone instead of orange/red) ─────────────
function EvDiagramFrame({
  labelEn, labelKh, kh, children,
}: {
  labelEn: string; labelKh: string; kh: boolean; children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-xl border border-cyan-500/20 bg-black/40 p-3 sm:p-4">
      <div className={`absolute -top-2 left-3 px-2 text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-300 bg-[#0a0a0a] ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? labelKh : labelEn}
      </div>
      {children}
    </div>
  );
}

// ─── DIAGRAM 1 · Power delivery — gas ramp vs EV step ─────────────────────
function PowerDeliveryDiagram({ kh }: { kh: boolean }) {
  return (
    <EvDiagramFrame labelEn="Power vs Time" labelKh="ថាមពលធៀបនឹងពេលវេលា" kh={kh}>
      <div className="grid grid-cols-2 gap-3">
        {/* GAS — ramping curve */}
        <div className="text-center">
          <svg viewBox="0 0 160 90" className="w-full h-auto" aria-hidden="true">
            {/* axes */}
            <line x1="20" y1="10" x2="20" y2="75" stroke="#475569" strokeWidth="1" />
            <line x1="20" y1="75" x2="155" y2="75" stroke="#475569" strokeWidth="1" />
            {/* dashed max line */}
            <line x1="20" y1="20" x2="155" y2="20" stroke="#64748b" strokeWidth="0.6" strokeDasharray="3 3" />
            {/* ramping curve (S-curve) */}
            <path
              d="M 20 75 Q 60 75 90 50 T 150 22"
              fill="none"
              stroke="#fb923c"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* labels */}
            <text x="14" y="14" fill="#94a3b8" fontFamily="monospace" fontSize="6">POW</text>
            <text x="138" y="86" fill="#94a3b8" fontFamily="monospace" fontSize="6">TIME</text>
            <text x="80" y="42" fill="#fb923c" fontFamily="monospace" fontSize="6.5" textAnchor="middle">slow rev-up</text>
          </svg>
          <div className={`mt-1 text-[10px] font-mono uppercase tracking-widest text-orange-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "ប្រេង · បង្វិលឡើង" : "GAS · RPM ramp-up"}
          </div>
        </div>
        {/* EV — instant step */}
        <div className="text-center">
          <svg viewBox="0 0 160 90" className="w-full h-auto" aria-hidden="true">
            <line x1="20" y1="10" x2="20" y2="75" stroke="#475569" strokeWidth="1" />
            <line x1="20" y1="75" x2="155" y2="75" stroke="#475569" strokeWidth="1" />
            <line x1="20" y1="20" x2="155" y2="20" stroke="#64748b" strokeWidth="0.6" strokeDasharray="3 3" />
            {/* instant step */}
            <path
              d="M 20 75 L 22 75 L 22 20 L 152 20"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2.6"
              strokeLinecap="round"
              filter="drop-shadow(0 0 4px rgba(34,211,238,0.7))"
            />
            {/* lightning at the step */}
            <text x="30" y="16" fill="#4ade80" fontFamily="monospace" fontSize="9">⚡</text>
            <text x="14" y="14" fill="#94a3b8" fontFamily="monospace" fontSize="6">POW</text>
            <text x="138" y="86" fill="#94a3b8" fontFamily="monospace" fontSize="6">TIME</text>
            <text x="90" y="34" fill="#22d3ee" fontFamily="monospace" fontSize="6.5" textAnchor="middle">instant 100%</text>
          </svg>
          <div className={`mt-1 text-[10px] font-mono uppercase tracking-widest text-cyan-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "EV · ភ្លាមៗ ១០០%" : "EV · light-switch"}
          </div>
        </div>
      </div>
    </EvDiagramFrame>
  );
}

// ─── DIAGRAM 2 · Skateboard chassis — high vs low center of gravity ──────
function SkateboardChassisDiagram({ kh }: { kh: boolean }) {
  return (
    <EvDiagramFrame labelEn="Where the Weight Lives" labelKh="ទម្ងន់នៅកន្លែងណា" kh={kh}>
      <svg viewBox="0 0 320 180" className="w-full h-auto" aria-hidden="true">
        {/* GAS car (top) */}
        <text x="6" y="14" fill="#fb923c" fontFamily="monospace" fontSize="8">GAS</text>
        {/* road */}
        <line x1="20" y1="70" x2="300" y2="70" stroke="#475569" strokeWidth="1" />
        {/* car silhouette */}
        <path
          d="M 50 70 L 60 50 L 110 40 L 200 38 L 250 50 L 285 60 L 285 70 Z"
          fill="rgba(251,146,60,0.10)"
          stroke="#fb923c"
          strokeWidth="1.4"
        />
        {/* heavy engine block at front */}
        <rect x="200" y="46" width="40" height="20" fill="rgba(251,146,60,0.45)" stroke="#fb923c" strokeWidth="1" />
        <text x="220" y="59" fill="#fed7aa" fontFamily="monospace" fontSize="6" textAnchor="middle">ENGINE</text>
        {/* COG dot HIGH */}
        <circle cx="170" cy="48" r="5" fill="#fb923c" stroke="#fff" strokeWidth="1" />
        <text x="170" y="34" fill="#fb923c" fontFamily="monospace" fontSize="6.5" textAnchor="middle">COG ↑</text>
        {/* wheels */}
        <circle cx="80" cy="70" r="6" fill="#1c1917" stroke="#94a3b8" strokeWidth="1.2" />
        <circle cx="265" cy="70" r="6" fill="#1c1917" stroke="#94a3b8" strokeWidth="1.2" />

        {/* divider */}
        <line x1="0" y1="92" x2="320" y2="92" stroke="#334155" strokeWidth="0.6" strokeDasharray="3 3" />

        {/* EV car (bottom) */}
        <text x="6" y="112" fill="#22d3ee" fontFamily="monospace" fontSize="8">EV</text>
        {/* road */}
        <line x1="20" y1="170" x2="300" y2="170" stroke="#475569" strokeWidth="1" />
        {/* car silhouette */}
        <path
          d="M 50 170 L 65 148 L 115 138 L 220 138 L 270 152 L 285 162 L 285 170 Z"
          fill="rgba(34,211,238,0.10)"
          stroke="#22d3ee"
          strokeWidth="1.4"
        />
        {/* flat battery slab across the WHOLE floor */}
        <rect
          x="55"
          y="160"
          width="225"
          height="9"
          fill="rgba(74,222,128,0.50)"
          stroke="#4ade80"
          strokeWidth="1"
          rx="1"
        />
        <text x="167" y="167" fill="#bbf7d0" fontFamily="monospace" fontSize="6" textAnchor="middle">
          BATTERY SLAB · skateboard
        </text>
        {/* COG dot LOW */}
        <circle cx="170" cy="158" r="5" fill="#4ade80" stroke="#fff" strokeWidth="1" />
        <text x="170" y="148" fill="#4ade80" fontFamily="monospace" fontSize="6.5" textAnchor="middle">COG ↓</text>
        {/* wheels */}
        <circle cx="85" cy="170" r="6" fill="#1c1917" stroke="#94a3b8" strokeWidth="1.2" />
        <circle cx="265" cy="170" r="6" fill="#1c1917" stroke="#94a3b8" strokeWidth="1.2" />
      </svg>
    </EvDiagramFrame>
  );
}

// ─── DIAGRAM 3 · Regenerative braking — same machine, two directions ─────
function RegenBrakingDiagram({ kh }: { kh: boolean }) {
  return (
    <EvDiagramFrame
      labelEn="Motor ⇄ Generator"
      labelKh="ម៉ូទ័រ ⇄ ម៉ាស៊ីនភ្លើង"
      kh={kh}
    >
      <svg viewBox="0 0 360 150" className="w-full h-auto" aria-hidden="true">
        {/* DRIVE row */}
        <text x="6" y="16" fill="#22d3ee" fontFamily="monospace" fontSize="8">
          DRIVE
        </text>
        {/* battery */}
        <rect x="40" y="22" width="60" height="34" rx="4" fill="rgba(34,211,238,0.10)" stroke="#22d3ee" strokeWidth="1.4" />
        <text x="70" y="42" fill="#cffafe" fontFamily="monospace" fontSize="7" textAnchor="middle">BATTERY</text>
        <text x="70" y="51" fill="#22d3ee" fontFamily="monospace" fontSize="9" textAnchor="middle">⚡</text>
        {/* arrow → */}
        <line x1="100" y1="39" x2="148" y2="39" stroke="#22d3ee" strokeWidth="2" filter="drop-shadow(0 0 4px rgba(34,211,238,0.7))" />
        <polygon points="148,35 156,39 148,43" fill="#22d3ee" />
        <text x="124" y="32" fill="#22d3ee" fontFamily="monospace" fontSize="6" textAnchor="middle">electricity</text>
        {/* motor */}
        <circle cx="180" cy="39" r="20" fill="rgba(34,211,238,0.10)" stroke="#22d3ee" strokeWidth="1.6" />
        <text x="180" y="37" fill="#cffafe" fontFamily="monospace" fontSize="7" textAnchor="middle">MOTOR</text>
        <text x="180" y="46" fill="#22d3ee" fontFamily="monospace" fontSize="6" textAnchor="middle">↻</text>
        {/* arrow → */}
        <line x1="200" y1="39" x2="248" y2="39" stroke="#22d3ee" strokeWidth="2" filter="drop-shadow(0 0 4px rgba(34,211,238,0.7))" />
        <polygon points="248,35 256,39 248,43" fill="#22d3ee" />
        <text x="224" y="32" fill="#22d3ee" fontFamily="monospace" fontSize="6" textAnchor="middle">spin</text>
        {/* wheel */}
        <circle cx="278" cy="39" r="18" fill="#1c1917" stroke="#94a3b8" strokeWidth="1.4" />
        <circle cx="278" cy="39" r="3" fill="#94a3b8" />
        <text x="278" y="68" fill="#94a3b8" fontFamily="monospace" fontSize="7" textAnchor="middle">WHEELS</text>

        {/* divider line */}
        <line x1="0" y1="80" x2="360" y2="80" stroke="#334155" strokeWidth="0.6" strokeDasharray="3 3" />

        {/* BRAKE row — direction reversed */}
        <text x="6" y="98" fill="#4ade80" fontFamily="monospace" fontSize="8">
          BRAKE
        </text>
        {/* wheel */}
        <circle cx="278" cy="118" r="18" fill="#1c1917" stroke="#94a3b8" strokeWidth="1.4" />
        <circle cx="278" cy="118" r="3" fill="#94a3b8" />
        <text x="278" y="146" fill="#94a3b8" fontFamily="monospace" fontSize="7" textAnchor="middle">WHEELS</text>
        {/* arrow ← */}
        <line x1="248" y1="118" x2="200" y2="118" stroke="#4ade80" strokeWidth="2" filter="drop-shadow(0 0 4px rgba(74,222,128,0.7))" />
        <polygon points="208,114 200,118 208,122" fill="#4ade80" />
        <text x="224" y="111" fill="#4ade80" fontFamily="monospace" fontSize="6" textAnchor="middle">spin</text>
        {/* generator (same machine!) */}
        <circle cx="180" cy="118" r="20" fill="rgba(74,222,128,0.10)" stroke="#4ade80" strokeWidth="1.6" />
        <text x="180" y="116" fill="#bbf7d0" fontFamily="monospace" fontSize="6.5" textAnchor="middle">GENERATOR</text>
        <text x="180" y="125" fill="#4ade80" fontFamily="monospace" fontSize="6" textAnchor="middle">↺</text>
        {/* arrow ← */}
        <line x1="148" y1="118" x2="100" y2="118" stroke="#4ade80" strokeWidth="2" filter="drop-shadow(0 0 4px rgba(74,222,128,0.7))" />
        <polygon points="108,114 100,118 108,122" fill="#4ade80" />
        <text x="124" y="111" fill="#4ade80" fontFamily="monospace" fontSize="6" textAnchor="middle">electricity</text>
        {/* battery (now charging) */}
        <rect x="40" y="101" width="60" height="34" rx="4" fill="rgba(74,222,128,0.10)" stroke="#4ade80" strokeWidth="1.4" />
        <text x="70" y="121" fill="#bbf7d0" fontFamily="monospace" fontSize="7" textAnchor="middle">BATTERY</text>
        <text x="70" y="130" fill="#4ade80" fontFamily="monospace" fontSize="6" textAnchor="middle">+ charge</text>

        {/* center bridge: "SAME MACHINE" annotation */}
        <text x="180" y="76" fill="#fde047" fontFamily="monospace" fontSize="6" textAnchor="middle" fontWeight="bold">
          ↑↓ SAME MACHINE · just reversed ↑↓
        </text>
      </svg>
    </EvDiagramFrame>
  );
}
