import {
  Rocket,
  Gauge,
  Thermometer,
  Shield,
  Wind,
  Droplets,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  The Human Spacecraft: Spacesuit Engineering
//  យានអវកាសរាងមនុស្ស៖ វិស្វកម្មសម្លៀកបំពាក់អវកាស
//
//  A spacesuit is not clothing — it is a single-occupant spacecraft built
//  to keep an astronaut alive against three lethal threats: vacuum,
//  extreme temperature swings, and micrometeoroid impacts.
//
//  Aesthetic = void black + lunar grey + high-tech blue accents (sky/cyan),
//  matching the rest of the SpacePage dark theme. Pure CSS starfield, no
//  external assets, no animation jitter.
// ════════════════════════════════════════════════════════════════════════════

export function SpacesuitEngineeringModule() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      aria-labelledby="spacesuit-heading"
      data-testid="spacesuit-engineering"
    >
      {/* Section eyebrow */}
      <div
        className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-sky-300/90 mb-3 ${
          kh ? "font-khmer normal-case tracking-normal text-xs" : ""
        }`}
      >
        <Rocket className="w-3.5 h-3.5" aria-hidden />
        <span>
          {t("Life-Support Engineering", "វិស្វកម្មទ្រទ្រង់ជីវិត")}
        </span>
      </div>

      {/* Heading */}
      <h2
        id="spacesuit-heading"
        className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight"
        data-testid="spacesuit-title-en"
      >
        The Human Spacecraft:{" "}
        <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
          Spacesuit Engineering
        </span>
      </h2>
      <p
        className="font-khmer mt-2 text-lg sm:text-xl text-sky-200/90 leading-loose"
        data-testid="spacesuit-title-kh"
      >
        យានអវកាសរាងមនុស្ស៖ វិស្វកម្មសម្លៀកបំពាក់អវកាស
      </p>

      <p className="mt-4 text-sm sm:text-base text-white/70 max-w-3xl leading-relaxed">
        {t(
          "A spacesuit is not clothing — it is a single-occupant spacecraft. To survive a walk in space, an astronaut must be defended against three killers at once: a vacuum that would boil their blood, temperature swings of nearly 300°C, and bullet-fast specks of dust.",
          "សម្លៀកបំពាក់អវកាសមិនមែនជាសម្លៀកបំពាក់ធម្មតាទេ — វាគឺជាយានអវកាសសម្រាប់មនុស្សម្នាក់។ ដើម្បីរស់ពេលដើរក្នុងលំហ អវកាសយានិកត្រូវការពារពីការគំរាមកំហែងធំៗបី៖ សុញ្ញកាសដែលនឹងធ្វើឱ្យឈាមរបស់គេពុះ ការប្រែប្រួលសីតុណ្ហភាពជិត ៣០០°C និងធូលីតូចៗដែលលឿនដូចគ្រាប់កាំភ្លើង។",
        )}
      </p>

      {/* Cards grid */}
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <VacuumPressureCard kh={kh} t={t} />
        <TemperatureControlCard kh={kh} t={t} />
        <MicrometeoroidsCard kh={kh} t={t} />
      </div>

      {/* Closing thought */}
      <div
        className="relative mt-7 rounded-2xl border border-sky-400/30 bg-gradient-to-r from-slate-950 via-blue-950/60 to-slate-950 px-5 sm:px-7 py-5 overflow-hidden"
        data-testid="spacesuit-footer"
      >
        <StarSpeck top="20%" left="8%" />
        <StarSpeck top="60%" left="92%" />
        <StarSpeck top="40%" left="55%" />
        <div className="relative flex items-start gap-3">
          <Lightbulb
            className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5"
            aria-hidden
          />
          <div>
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {t(
                "Every astronaut who steps outside is wearing all of human engineering at once: a balloon, a refrigerator, and a bulletproof vest, sewn into a single human-shaped ship.",
                "អវកាសយានិកគ្រប់រូបដែលដើរចេញខាងក្រៅ កំពុងពាក់វិស្វកម្មរបស់មនុស្សជាតិទាំងអស់ក្នុងពេលតែមួយ៖ បាឡុងមួយ ទូទឹកកកមួយ និងអាវការពារគ្រាប់កាំភ្លើងមួយ ដេរចូលគ្នាជាយានរាងមនុស្ស។",
              )}
            </p>
            <p className="font-khmer mt-1 text-sm text-sky-200/85 leading-loose">
              សម្លៀកបំពាក់មួយ — យានអវកាសមួយ។
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpacesuitEngineeringModule;

// ════════════════════════════════════════════════════════════════════════════
//  Card 1 — The Vacuum & Pressure
// ════════════════════════════════════════════════════════════════════════════

function VacuumPressureCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, k: string) => string;
}) {
  return (
    <article
      className="lg:col-span-1 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/70 p-5 sm:p-6 shadow-[0_0_40px_rgba(56,189,248,0.06)]"
      data-testid="spacesuit-card-vacuum"
    >
      <StarField />

      <CardHeader
        en="The Vacuum & Pressure"
        kh="សុញ្ញកាស និងសម្ពាធ"
        index="01"
        accentColor="text-sky-300"
        Icon={Gauge}
      />

      <div className="relative mt-4 space-y-4">
        <Subhead
          en="The Problem"
          kh="បញ្ហា"
          accent="text-sky-200"
          t={t}
          icon={<AlertTriangle className="w-3.5 h-3.5" aria-hidden />}
        />
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          {t(
            "Space is a vacuum — there is no air at all. Without atmospheric pressure pushing against our bodies, the water inside our blood and tissues would instantly turn to gas and boil, even at normal body temperature.",
            "លំហអាកាសគឺជាសុញ្ញកាស — គ្មានខ្យល់សោះឡើយ។ បើគ្មានសម្ពាធបរិយាកាសរុញច្រានរាងកាយយើងទេ ទឹកនៅក្នុងឈាម និងជាលិកានឹងប្រែជាឧស្ម័នភ្លាមៗ ហើយពុះ បើទោះបីជានៅសីតុណ្ហភាពធម្មតារបស់រាងកាយក៏ដោយ។",
          )}
        </p>

        <div className="rounded-xl border border-sky-400/30 bg-sky-500/5 px-4 py-3">
          <Subhead
            en="The Pressure Bladder"
            kh="បាឡុងសម្ពាធ"
            accent="text-sky-200"
            t={t}
            inline
          />
          <p className="mt-2 text-sm text-white/85 leading-relaxed">
            {t(
              "The solution. The innermost layer of a spacesuit is, quite literally, a human-shaped balloon — inflated with pure ",
              "ដំណោះស្រាយ។ ស្រទាប់ខាងក្នុងបំផុតនៃសម្លៀកបំពាក់អវកាសគឺ ពិតជាបាឡុងរាងមនុស្ស — ដែលពុះដោយ ",
            )}
            <strong className="text-sky-200">
              {t("oxygen", "អុកស៊ីសែន")}
            </strong>
            {t(
              ". It mimics the heavy, invisible ocean of air that we live under on Earth, so the astronaut's body keeps functioning normally.",
              " សុទ្ធ។ វាធ្វើត្រាប់តាមមហាសមុទ្រខ្យល់ដ៏ធ្ងន់ និងមើលមិនឃើញ ដែលយើងរស់នៅក្រោម នៅលើផែនដី ដូច្នេះរាងកាយរបស់អវកាសយានិកនៅតែដំណើរការធម្មតា។",
            )}
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-sky-300/80">
            <Wind className="w-3.5 h-3.5" aria-hidden />
            <span data-testid="spacesuit-pressure-spec">
              ≈ 4.3 psi · 100% O₂
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 2 — Extreme Temperature Control
// ════════════════════════════════════════════════════════════════════════════

function TemperatureControlCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, k: string) => string;
}) {
  return (
    <article
      className="lg:col-span-1 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-blue-950/70 to-cyan-950/40 p-5 sm:p-6 shadow-[0_0_40px_rgba(34,211,238,0.08)]"
      data-testid="spacesuit-card-temperature"
    >
      <StarField />

      <CardHeader
        en="Extreme Temperature Control"
        kh="ការគ្រប់គ្រងសីតុណ្ហភាពខ្លាំង"
        index="02"
        accentColor="text-cyan-300"
        Icon={Thermometer}
      />

      <div className="relative mt-4 space-y-4">
        <Subhead
          en="The Problem"
          kh="បញ្ហា"
          accent="text-cyan-200"
          t={t}
          icon={<AlertTriangle className="w-3.5 h-3.5" aria-hidden />}
        />
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          {t(
            "In space, if you step into the sunlight, temperatures hit ",
            "នៅក្នុងលំហ បើអ្នកដើរចូលទៅក្នុងពន្លឺព្រះអាទិត្យ សីតុណ្ហភាពកើនឡើងដល់ ",
          )}
          <GlowingNumber tone="warm">120°C</GlowingNumber>
          {t(
            " — the boiling point of water. Step into the shadow, and it crashes to ",
            " — ចំណុចពុះនៃទឹក។ ដើរចូលទៅក្នុងម្លប់វិញ វានឹងធ្លាក់ចុះមកត្រឹម ",
          )}
          <GlowingNumber tone="cool">−150°C</GlowingNumber>
          {t(
            " — colder than any winter on Earth.",
            " — ត្រជាក់ជាងរដូវរងាណាមួយនៅលើផែនដីទៅទៀត។",
          )}
        </p>

        {/* Mini temperature gradient bar */}
        <div
          className="rounded-lg overflow-hidden border border-white/10"
          aria-hidden
        >
          <div className="h-3 bg-gradient-to-r from-blue-400 via-slate-200 to-orange-400" />
          <div className="flex justify-between text-[10px] font-mono text-white/60 px-1.5 py-1 bg-black/40">
            <span>−150°C</span>
            <span>0°C</span>
            <span>+120°C</span>
          </div>
        </div>

        <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/5 px-4 py-3">
          <Subhead
            en="Liquid Cooling & Ventilation Garment"
            kh="សម្លៀកបំពាក់ត្រជាក់ដោយវត្ថុរាវ"
            accent="text-cyan-200"
            t={t}
            inline
          />
          <p className="mt-2 text-sm text-white/85 leading-relaxed">
            {t(
              "Astronauts wear a body-hugging suit woven with miles of tiny plastic pipes — about ",
              "អវកាសយានិកពាក់សម្លៀកបំពាក់រឹតរាងកាយដែលត្បាញដោយបំពង់ប្លាស្ទិកតូចៗរាប់ម៉ាយ — ប្រហែល ",
            )}
            <GlowingNumber>91 m</GlowingNumber>
            {t(
              " of tubing — pumping cool water across their skin so they don't overheat from their own body heat or the sun. The bright white outer layers reflect solar radiation and insulate against the deep cold of shadow.",
              " នៃបំពង់ — បូមទឹកត្រជាក់រាលលើស្បែករបស់ពួកគេ ដើម្បីកុំឱ្យពួកគេក្ដៅពេកពីកំដៅរាងកាយ ឬព្រះអាទិត្យ។ ស្រទាប់ខាងក្រៅពណ៌សភ្លឺ ឆ្លុះបញ្ចាំងវិទ្យុសកម្មពីព្រះអាទិត្យ ហើយការពារពីការត្រជាក់ខ្លាំងនៃម្លប់។",
            )}
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-cyan-300/80">
            <Droplets className="w-3.5 h-3.5" aria-hidden />
            <span data-testid="spacesuit-cooling-spec">
              {t("LCVG · ~91 m of tubing", "LCVG · បំពង់ប្រវែង ~៩១ ម៉ែត្រ")}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Card 3 — Micrometeoroids
// ════════════════════════════════════════════════════════════════════════════

function MicrometeoroidsCard({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, k: string) => string;
}) {
  return (
    <article
      className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/70 p-5 sm:p-6 shadow-[0_0_40px_rgba(99,102,241,0.08)]"
      data-testid="spacesuit-card-micrometeoroids"
    >
      <StarField dense />

      <CardHeader
        en="Micrometeoroids"
        kh="អាចម៍ផ្កាយតូចៗ"
        index="03"
        accentColor="text-indigo-300"
        Icon={Shield}
      />

      <div className="relative mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* The Problem */}
        <div className="space-y-3">
          <Subhead
            en="The Problem"
            kh="បញ្ហា"
            accent="text-indigo-200"
            t={t}
            icon={<AlertTriangle className="w-3.5 h-3.5" aria-hidden />}
          />
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            {t(
              "Space is full of tiny rocks, dust, and even flecks of paint chipped off old satellites — all travelling at roughly ",
              "លំហអាកាសពេញទៅដោយថ្មតូចៗ ធូលី និងសូម្បីតែសំណល់ថ្នាំលាបដែលបាក់ចេញពីផ្កាយរណបចាស់ៗ — ទាំងអស់នោះធ្វើដំណើរប្រហែល ",
            )}
            <GlowingNumber>28,000 km/h</GlowingNumber>.{" "}
            {t(
              "At that speed, even a single speck of dust can punch straight through a human body like a high-velocity bullet.",
              "នៅល្បឿននោះ សូម្បីតែធូលីមួយគ្រាប់ ក៏អាចចាក់ទម្លុះរាងកាយមនុស្សដូចជាគ្រាប់កាំភ្លើងល្បឿនលឿនដែរ។",
            )}
          </p>

          {/* Speed comparison chips */}
          <div className="flex flex-wrap gap-2">
            <SpeedChip
              label={t("Bullet", "គ្រាប់កាំភ្លើង")}
              value="~3,000 km/h"
              tone="dim"
            />
            <SpeedChip
              label={t("Micrometeoroid", "អាចម៍ផ្កាយតូច")}
              value="~28,000 km/h"
              tone="hot"
            />
          </div>
        </div>

        {/* The Solution */}
        <div className="space-y-3">
          <div className="rounded-xl border border-indigo-400/30 bg-indigo-500/5 px-4 py-3">
            <Subhead
              en="Thermal Micrometeoroid Garment"
              kh="សម្លៀកការពារកំដៅ និងអាចម៍ផ្កាយតូច"
              accent="text-indigo-200"
              t={t}
              inline
            />
            <p className="mt-2 text-sm text-white/85 leading-relaxed">
              {t(
                "The outermost shell of a spacesuit is engineered with ",
                "ស្រទាប់ខាងក្រៅបំផុតនៃសម្លៀកបំពាក់អវកាសត្រូវបានសាងសង់ដោយ ",
              )}
              <strong className="text-indigo-200">
                {t("Kevlar", "កែវឡា")}
              </strong>
              {t(
                " — the same fibre used in bulletproof vests — together with layers of specialised fabrics designed to catch and shatter high-speed impacts before they can pierce the inner pressure balloon.",
                " — សរសៃតែមួយដែលប្រើនៅក្នុងអាវការពារគ្រាប់កាំភ្លើង — ផ្គុំជាមួយស្រទាប់សំពត់ពិសេស ដែលរចនាឡើងដើម្បីចាប់ និងបំបាក់ការប៉ះទង្គិចល្បឿនលឿន មុនពេលវាអាចចាក់ទម្លុះបាឡុងសម្ពាធខាងក្នុង។",
              )}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-indigo-300/80">
              <Shield className="w-3.5 h-3.5" aria-hidden />
              <span data-testid="spacesuit-armor-spec">
                {t("TMG · Kevlar + multilayer", "TMG · កែវឡា + ច្រើនស្រទាប់")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Shared sub-components (mirrors CosmicScaleModule's pattern)
// ════════════════════════════════════════════════════════════════════════════

function CardHeader({
  en,
  kh,
  index,
  accentColor,
  Icon,
}: {
  en: string;
  kh: string;
  index: string;
  accentColor: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <header className="relative flex items-start gap-3">
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center ${accentColor}`}
        aria-hidden
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`text-[10px] font-mono uppercase tracking-[0.25em] ${accentColor} opacity-80`}
          aria-hidden
        >
          CARD · {index}
        </div>
        <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
          {en}
        </h3>
        <p className="font-khmer text-sm sm:text-base text-white/80 leading-loose mt-0.5">
          {kh}
        </p>
      </div>
    </header>
  );
}

function Subhead({
  en,
  kh,
  accent,
  t: _t,
  inline = false,
  icon,
}: {
  en: string;
  kh: string;
  accent: string;
  t: (en: string, k: string) => string;
  inline?: boolean;
  icon?: React.ReactNode;
}) {
  if (inline) {
    return (
      <span
        className={`inline-flex items-baseline gap-2 font-display font-bold ${accent}`}
      >
        {icon && <span className="self-center">{icon}</span>}
        <span>{en}</span>
        <span className="font-khmer text-xs sm:text-sm font-normal opacity-80">
          · {kh}
        </span>
      </span>
    );
  }
  return (
    <h4
      className={`flex items-baseline gap-2 font-display text-sm sm:text-base font-bold ${accent}`}
    >
      {icon && <span className="self-center">{icon}</span>}
      <span>{en}</span>
      <span className="font-khmer text-xs sm:text-sm font-normal opacity-80">
        · {kh}
      </span>
    </h4>
  );
}

function GlowingNumber({
  children,
  tone = "cool",
}: {
  children: React.ReactNode;
  tone?: "cool" | "warm";
}) {
  const glow =
    tone === "warm"
      ? "drop-shadow-[0_0_6px_rgba(251,146,60,0.6)]"
      : "drop-shadow-[0_0_6px_rgba(125,211,252,0.55)]";
  return (
    <span
      className={`font-mono font-bold text-white tabular-nums ${glow}`}
    >
      {children}
    </span>
  );
}

function SpeedChip({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "dim" | "hot";
}) {
  const ring =
    tone === "hot"
      ? "border-orange-400/40 bg-orange-500/10 text-orange-200"
      : "border-white/15 bg-white/5 text-white/70";
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] ${ring}`}
    >
      <span className="font-semibold">{label}</span>
      <span className="font-mono tabular-nums">{value}</span>
    </div>
  );
}

function StarSpeck({
  top,
  left,
  size = 1,
}: {
  top: string;
  left: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className="absolute rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.85)]"
      style={{ top, left, width: `${size * 2}px`, height: `${size * 2}px` }}
    />
  );
}

function StarField({ dense = false }: { dense?: boolean }) {
  // Decorative twinkling background for cards. Pure CSS, no animation
  // jitter — just static specks tuned to the dark backdrop.
  const positions = dense
    ? [
        ["10%", "8%"],
        ["18%", "85%"],
        ["35%", "42%"],
        ["48%", "12%"],
        ["55%", "78%"],
        ["72%", "30%"],
        ["80%", "62%"],
        ["88%", "8%"],
        ["92%", "92%"],
        ["28%", "68%"],
      ]
    : [
        ["12%", "10%"],
        ["28%", "78%"],
        ["50%", "32%"],
        ["62%", "88%"],
        ["80%", "18%"],
        ["88%", "55%"],
      ];
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {positions.map(([top, left], i) => (
        <StarSpeck key={i} top={top} left={left} />
      ))}
    </div>
  );
}
