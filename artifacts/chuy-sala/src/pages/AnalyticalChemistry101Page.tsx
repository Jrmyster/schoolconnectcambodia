import { Link } from "wouter";
import {
  ArrowLeft,
  FlaskRound,
  Wind,
  Droplet,
  Zap,
  Scale,
  Music2,
  Microscope,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Analytical Chemistry — គីមីវិភាគ និងឧបករណ៍
 * "Module 08" — high-tech laboratory aesthetic.
 * Slate/silver backgrounds, neon-cyan glow, data-graph chrome.
 * Self-contained, no new dependencies.
 * ══════════════════════════════════════════════════════════════════════════ */

export function AnalyticalChemistry101Page() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="min-h-screen text-slate-100 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(34,211,238,0.10) 0%, transparent 60%), linear-gradient(180deg,#020617 0%,#0b1220 45%,#020617 100%)",
      }}
    >
      <LabBackdrop />

      <div className="relative max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/chemistry"
          data-testid="link-back-to-chemistry"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300/80 hover:text-cyan-200 transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Chemistry Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា")}
        </Link>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900/80 text-cyan-300 mb-4 ring-1 ring-cyan-400/40 backdrop-blur-sm"
            style={{ boxShadow: "0 0 30px rgba(34,211,238,0.25)" }}
          >
            <FlaskRound className="w-9 h-9" strokeWidth={2.25} />
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300/85 mb-1 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t(
              "Module 08 · Lab Instrumentation",
              "មុខវិជ្ជា ០៨ · ឧបករណ៍មន្ទីរពិសោធន៍",
            )}
          </div>
          <h1
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 ${
              kh ? "font-khmer leading-snug" : ""
            }`}
            style={{
              background: "linear-gradient(90deg,#67e8f9 0%,#e2e8f0 60%,#67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 24px rgba(103,232,249,0.20)",
            }}
          >
            {t("Analytical Chemistry", "គីមីវិភាគ និងឧបករណ៍")}
          </h1>
          <p
            className={`text-base sm:text-lg text-slate-300/85 max-w-2xl mx-auto ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Inside every lab is a quiet army of machines that can name a single molecule out of trillions. Here are the four most important — explained simply.",
              "ក្នុងមន្ទីរពិសោធន៍នីមួយៗ មានកងទ័ពម៉ាស៊ីនស្ងាត់ ដែលអាចស្គាល់ឈ្មោះម៉ូលេគុលមួយ ក្នុងចំណោមរាប់ត្រីលាន។ នេះជាបួនដែលសំខាន់បំផុត — ពន្យល់ដោយសាមញ្ញ។",
            )}
          </p>
        </header>

        {/* ── Section 1: Chromatography ────────────────────────── */}
        <ChromatographySection />

        {/* ── Section 2: Mass Spectrometry ─────────────────────── */}
        <MassSpecSection />

        {/* ── Section 3: NMR ───────────────────────────────────── */}
        <NMRSection />

        <p
          className={`mt-12 text-center text-xs sm:text-sm text-cyan-200/65 italic max-w-2xl mx-auto ${
            kh ? "font-khmer not-italic leading-loose" : ""
          }`}
        >
          {t(
            "Every breakthrough drug, every safe drink of water, every newly discovered material — passes through machines like these first.",
            "រាល់ឱសថច្នៃប្រឌិតថ្មី រាល់ដំណក់ទឹកសុវត្ថិភាព រាល់សម្ភារៈដែលគេទើបរកឃើញ — ឆ្លងកាត់ម៉ាស៊ីនបែបនេះជាមុនទាំងអស់។",
          )}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Lab backdrop — subtle data-graph grid + scan line                      */
/* ──────────────────────────────────────────────────────────────────────── */

function LabBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.18) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 0%, transparent 80%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background: "linear-gradient(90deg,transparent,rgba(103,232,249,0.6),transparent)",
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Reusable lab panel                                                     */
/* ──────────────────────────────────────────────────────────────────────── */

function Panel({
  id,
  title,
  subtitle,
  icon: Icon,
  children,
}: {
  id: string;
  title: { en: string; kh: string };
  subtitle?: { en: string; kh: string };
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      id={id}
      data-testid={`panel-${id}`}
      className="relative rounded-3xl border border-cyan-400/20 bg-slate-900/60 backdrop-blur-sm p-5 sm:p-7 mb-8 overflow-hidden"
      style={{ boxShadow: "0 0 35px rgba(34,211,238,0.08), inset 0 0 0 1px rgba(148,163,184,0.04)" }}
    >
      {/* Subtle corner accents */}
      <span className="pointer-events-none absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-cyan-400/40 rounded-tl-3xl" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-cyan-400/40 rounded-br-3xl" />

      <header className="mb-5 flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0"
          style={{ boxShadow: "0 0 18px rgba(34,211,238,0.25)" }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h2
            className={`font-display text-xl sm:text-2xl font-bold text-white ${
              kh ? "font-khmer leading-snug" : ""
            }`}
          >
            {t(title.en, title.kh)}
          </h2>
          {subtitle && (
            <p
              className={`text-sm text-slate-400 mt-0.5 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(subtitle.en, subtitle.kh)}
            </p>
          )}
        </div>
      </header>
      {children}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 1 — Chromatography                                             */
/* ──────────────────────────────────────────────────────────────────────── */

function ChromatographySection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <Panel
      id="chromatography"
      icon={Wind}
      title={{
        en: "The \"Separation Race\" — Chromatography",
        kh: "ការប្រណាំងបំបែក — ក្រូម៉ាតូក្រាម",
      }}
      subtitle={{
        en: "An obstacle course where different molecules run at different speeds.",
        kh: "ផ្លូវប្រណាំងដែលម៉ូលេគុលផ្សេងៗ រត់ក្នុងល្បឿនខុសៗគ្នា។",
      }}
    >
      <p
        className={`text-slate-300/90 text-sm sm:text-base leading-relaxed mb-5 ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {t(
          "Imagine pouring a mixed handful of marbles, sand, and feathers into one end of a long tube full of obstacles. The light feathers rush out first, then the marbles, then the sand. Chromatography is exactly that race — but for molecules. By measuring how long each kind takes to reach the other end, scientists separate any mixture into its individual ingredients.",
          "ស្រមៃថាចាក់ឆ្នុក សាច់ខ្សាច់ និងស្លាបក្រាស់ ច្រើនយ៉ាងលាយគ្នា ចូលក្នុងចុងម្ខាងនៃបំពង់វែងមួយដែលពេញដោយឧបសគ្គ។ ស្លាបស្រាល ហៀររួចមុនគេ បន្ទាប់មកឆ្នុក រួចសាច់ខ្សាច់។ ក្រូម៉ាតូក្រាមគឺជាការប្រណាំងនេះដូចគ្នា — ប៉ុន្តែសម្រាប់ម៉ូលេគុល។ ដោយវាស់រយៈពេលដែលប្រភេទនីមួយៗត្រូវការដើម្បីទៅដល់ចុងម្ខាងទៀត អ្នកវិទ្យាសាស្ត្របំបែកល្បាយណាមួយទៅជាគ្រឿងផ្សំនីមួយៗ។",
        )}
      </p>

      {/* Race-track visualization */}
      <RaceTrackDiagram />

      {/* Three sub-techniques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <TechCard
          icon={Wind}
          tone="cyan"
          tagEn="GC"
          tagKh="GC"
          titleEn="Gas Chromatography"
          titleKh="ក្រូម៉ាតូក្រាមឧស្ម័ន"
          bodyEn="The mixture is heated until it turns into a gas, then blown through a long, microscopic coiled tube. Smaller, lighter molecules slip through and reach the end first; heavier ones take longer. Used for testing fuels, perfumes, and tracing pollutants in the air."
          bodyKh="ល្បាយត្រូវបានកម្ដៅរហូតប្រែជាឧស្ម័ន រួចបក់ឆ្លងកាត់បំពង់រមូរវែងតូចមួយ។ ម៉ូលេគុលតូច និងស្រាល រអិលឆ្លងហើយមកដល់ចុងមុនគេ; ម៉ូលេគុលធ្ងន់ ត្រូវការពេលយូរជាង។ ប្រើសម្រាប់សាកល្បងឥន្ធនៈ ទឹកអប់ និងស្វែងរកសារធាតុបំពុលនៅក្នុងខ្យល់។"
        />
        <TechCard
          icon={Droplet}
          tone="sky"
          tagEn="HPLC"
          tagKh="HPLC"
          titleEn="High-Performance Liquid Chromatography"
          titleKh="ក្រូម៉ាតូក្រាមរាវដំណើរការខ្ពស់"
          bodyEn="The mixture is pushed through a tightly packed tube of sand-like particles, using high-pressure liquid as the carrier. The medical industry depends on it daily to verify that every pill, vaccine, and IV bag contains exactly the right dose — and nothing harmful."
          bodyKh="ល្បាយត្រូវបានរុញឆ្លងកាត់បំពង់ដែលដាក់ភាគល្អិតដូចសាច់ខ្សាច់យ៉ាងតឹង ដោយប្រើអង្គធាតុរាវសម្ពាធខ្ពស់ជាអ្នកដឹក។ ឧស្សាហកម្មឱសថពឹងផ្អែកលើវាជារៀងរាល់ថ្ងៃ ដើម្បីផ្ទៀងផ្ទាត់ថាគ្រាប់ថ្នាំ វ៉ាក់សាំង និងបំពង់សេរ៉ូម មានកម្រិតថ្នាំត្រឹមត្រូវ — និងគ្មានសារធាតុបង្កគ្រោះថ្នាក់។"
        />
        <TechCard
          icon={Zap}
          tone="emerald"
          tagEn="IC"
          tagKh="IC"
          titleEn="Ion Chromatography"
          titleKh="ក្រូម៉ាតូក្រាមអ៊ីយ៉ុង"
          bodyEn="A specialised cousin that separates electrically-charged atoms — ions. In Cambodia, this is the technique behind testing village wells for toxic heavy metals like arsenic, and for measuring salt levels in rivers and rice-field soil."
          bodyKh="បងប្អូនជំនាញ ដែលបំបែកអាតូមមានបន្ទុកអគ្គិសនី — អ៊ីយ៉ុង។ នៅក្នុងប្រទេសកម្ពុជា នេះជាបច្ចេកទេសនៅពីក្រោយការសាកល្បងអណ្ដូងភូមិ ស្វែងរកលោហៈធ្ងន់ពុលដូចជាអាសេនិច និងការវាស់កម្រិតអំបិលនៅក្នុងទន្លេ និងដីស្រែ។"
        />
      </div>

      {/* Cambodia callout */}
      <div className="mt-5 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-300 mt-0.5 flex-shrink-0" />
        <p
          className={`text-amber-100/90 text-sm leading-relaxed ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "Real-world impact in Cambodia: Ion Chromatography is one of the main tools the Ministry of Rural Development and university labs use to certify safe drinking water for rural schools and communities.",
            "ផលប៉ះពាល់ក្នុងពិភពពិតនៅកម្ពុជា៖ ក្រូម៉ាតូក្រាមអ៊ីយ៉ុង គឺជាឧបករណ៍មួយក្នុងចំណោមឧបករណ៍ចម្បង ដែលក្រសួងអភិវឌ្ឍន៍ជនបទ និងមន្ទីរពិសោធន៍សាកលវិទ្យាល័យ ប្រើដើម្បីបញ្ជាក់ទឹកផឹកសុវត្ថិភាព សម្រាប់សាលា និងសហគមន៍ជនបទ។",
          )}
        </p>
      </div>
    </Panel>
  );
}

function RaceTrackDiagram() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div
      className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-4 sm:p-5"
      data-testid="chromatography-race"
    >
      <p
        className={`text-xs uppercase tracking-widest text-cyan-300/80 mb-3 ${
          kh ? "font-khmer normal-case tracking-normal" : ""
        }`}
      >
        {t("Inside the Tube — Live Race", "ក្នុងបំពង់ — ការប្រណាំងផ្ទាល់")}
      </p>
      <svg viewBox="0 0 600 180" className="w-full h-auto" role="img" aria-label="Chromatography race">
        <defs>
          <linearGradient id="ac-tube" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0e7490" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#155e75" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.55" />
          </linearGradient>
          <filter id="ac-glow"><feGaussianBlur stdDeviation="2.5" /></filter>
        </defs>

        {/* Three lanes / tube */}
        {[40, 90, 140].map((y, i) => (
          <g key={i}>
            <rect x="40" y={y - 12} width="520" height="24" rx="12" fill="url(#ac-tube)" stroke="#22d3ee" strokeOpacity="0.35" />
            {/* Sand-pack dots */}
            {Array.from({ length: 60 }).map((_, k) => (
              <circle
                key={k}
                cx={50 + k * 8.6}
                cy={y - 4 + (k % 3)}
                r="1.2"
                fill="#475569"
                opacity="0.55"
              />
            ))}
          </g>
        ))}

        {/* Three "molecules" at different positions — light/medium/heavy */}
        {/* Light — already at the end */}
        <g filter="url(#ac-glow)">
          <circle cx="540" cy="40" r="7" fill="#67e8f9" />
        </g>
        <text x="540" y="22" textAnchor="middle" fontSize="10" fill="#67e8f9" fontWeight="700">
          {t("Light", "ស្រាល")}
        </text>

        {/* Medium — middle */}
        <g filter="url(#ac-glow)">
          <circle cx="320" cy="90" r="9" fill="#a5f3fc" />
        </g>
        <text x="320" y="72" textAnchor="middle" fontSize="10" fill="#a5f3fc" fontWeight="700">
          {t("Medium", "មធ្យម")}
        </text>

        {/* Heavy — barely past start */}
        <g filter="url(#ac-glow)">
          <circle cx="130" cy="140" r="11" fill="#f0abfc" />
        </g>
        <text x="130" y="170" textAnchor="middle" fontSize="10" fill="#f0abfc" fontWeight="700">
          {t("Heavy", "ធ្ងន់")}
        </text>

        {/* Inlet / outlet labels */}
        <text x="40" y="172" fontSize="10" fill="#94a3b8">
          {t("Injection", "ចាក់ចូល")}
        </text>
        <text x="560" y="172" textAnchor="end" fontSize="10" fill="#94a3b8">
          {t("Detector →", "ម៉ាស៊ីនរកឃើញ →")}
        </text>
      </svg>
      <p
        className={`text-xs text-slate-400 text-center mt-2 ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {t(
          "Three molecule sizes injected together — light arrives first, heavy arrives last.",
          "ម៉ូលេគុលបីទំហំ ត្រូវបានចាក់ចូលរួមគ្នា — ស្រាលមកដល់មុនគេ ធ្ងន់មកដល់ចុងក្រោយ។",
        )}
      </p>
    </div>
  );
}

function TechCard({
  icon: Icon,
  tone,
  tagEn,
  tagKh,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "cyan" | "sky" | "emerald";
  tagEn: string;
  tagKh: string;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
}) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const palette = {
    cyan:    { ring: "ring-cyan-400/30",    text: "text-cyan-200",    chip: "bg-cyan-500/15 text-cyan-200 border-cyan-400/40" },
    sky:     { ring: "ring-sky-400/30",     text: "text-sky-200",     chip: "bg-sky-500/15 text-sky-200 border-sky-400/40" },
    emerald: { ring: "ring-emerald-400/30", text: "text-emerald-200", chip: "bg-emerald-500/15 text-emerald-200 border-emerald-400/40" },
  }[tone];

  return (
    <div className={`rounded-2xl border border-slate-700/70 bg-slate-950/60 p-4 ring-1 ${palette.ring} flex flex-col gap-2.5`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${palette.chip}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className={`text-[10px] font-mono uppercase tracking-widest ${palette.text}`}>
          {kh ? tagKh : tagEn}
        </span>
      </div>
      <h3 className={`font-display font-bold text-white text-base leading-snug ${kh ? "font-khmer" : ""}`}>
        {t(titleEn, titleKh)}
      </h3>
      <p className={`text-slate-300/80 text-sm leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
        {t(bodyEn, bodyKh)}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 2 — Mass Spectrometry                                          */
/* ──────────────────────────────────────────────────────────────────────── */

function MassSpecSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <Panel
      id="mass-spec"
      icon={Scale}
      title={{
        en: "The \"Molecule Scale\" — Mass Spectrometry",
        kh: "ជញ្ជីងម៉ូលេគុល — ម៉ាសស្ប៉ិចត្រូម៉ែត",
      }}
      subtitle={{
        en: "Smash a molecule into pieces, then weigh every piece.",
        kh: "បំបែកម៉ូលេគុលជាបំណែកៗ រួចថ្លឹងរាល់បំណែក។",
      }}
    >
      <p
        className={`text-slate-300/90 text-sm sm:text-base leading-relaxed mb-5 ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {t(
          "Scientists shoot a beam of electrons at a single molecule. The collision shatters it into smaller, electrically charged fragments. Magnets then bend each fragment's flight path — heavier ones curve less, lighter ones curve more — and the machine weighs them with breathtaking precision. From the unique pattern of puzzle pieces, chemists can reconstruct exactly which molecule they started with.",
          "អ្នកវិទ្យាសាស្ត្របាញ់ធ្នឹមអេឡិចត្រុង ទៅលើម៉ូលេគុលមួយ។ ការប៉ះទង្គិចបំបែកវាជាបំណែកតូចៗមានបន្ទុកអគ្គិសនី។ មេដែកបន្ទាប់មកបត់ផ្លូវហោះហើររបស់បំណែកនីមួយៗ — បំណែកធ្ងន់បត់តិច បំណែកស្រាលបត់ច្រើន — ហើយម៉ាស៊ីនថ្លឹងពួកវាដោយភាពជាក់លាក់គួរឱ្យភ្ញាក់ផ្អើល។ ពីលំនាំពិសេសនៃបំណែកល្បែង គីមីវិទូអាចសាងសង់ម៉ូលេគុលដើមឡើងវិញបានយ៉ាងពិតប្រាកដ។",
        )}
      </p>

      {/* MS spectrum bar-graph */}
      <div
        className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-4 sm:p-5"
        data-testid="ms-spectrum"
      >
        <p
          className={`text-xs uppercase tracking-widest text-cyan-300/80 mb-3 ${
            kh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {t("Mass Spectrum — Fragment Fingerprint", "វិសាលគមម៉ាស — ស្នាមដៃនៃបំណែក")}
        </p>
        <svg viewBox="0 0 600 200" className="w-full h-auto" role="img" aria-label="Mass spectrum">
          {/* Axes */}
          <line x1="40" y1="170" x2="580" y2="170" stroke="#475569" strokeWidth="1" />
          <line x1="40" y1="20"  x2="40"  y2="170" stroke="#475569" strokeWidth="1" />
          {/* Axis labels */}
          <text x="310" y="192" textAnchor="middle" fontSize="11" fill="#94a3b8">
            {t("mass / charge (m/z)", "ម៉ាស / បន្ទុក (m/z)")}
          </text>
          <text x="14" y="95" textAnchor="middle" fontSize="11" fill="#94a3b8" transform="rotate(-90 14 95)">
            {t("intensity", "កម្រិតខ្លាំង")}
          </text>
          {/* Tick marks */}
          {[80, 160, 240, 320, 400, 480, 560].map((x) => (
            <g key={x}>
              <line x1={x} y1="170" x2={x} y2="174" stroke="#475569" />
              <text x={x} y="186" textAnchor="middle" fontSize="9" fill="#64748b">{Math.round((x - 40) / 5.4)}</text>
            </g>
          ))}
          {/* Bars (peaks) */}
          {[
            { x: 90,  h: 130, label: "15" },
            { x: 160, h: 70,  label: "29" },
            { x: 230, h: 110, label: "43" },
            { x: 320, h: 145, label: "58" },
            { x: 410, h: 50,  label: "73" },
            { x: 510, h: 95,  label: "M⁺" },
          ].map(({ x, h, label }) => (
            <g key={x}>
              <line x1={x} y1="170" x2={x} y2={170 - h} stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
              <circle cx={x} cy={170 - h} r="3" fill="#a5f3fc" />
              <text x={x} y={165 - h} textAnchor="middle" fontSize="10" fill="#a5f3fc" fontWeight="700">
                {label}
              </text>
            </g>
          ))}
          {/* M+ tag */}
          <text x="510" y="38" textAnchor="middle" fontSize="9" fill="#fbbf24">
            {t("Molecular ion", "អ៊ីយ៉ុងម៉ូលេគុល")}
          </text>
        </svg>
        <p className={`text-xs text-slate-400 text-center mt-2 ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Each peak is one fragment. The pattern is as unique as a fingerprint.",
            "កំពូលនីមួយៗគឺជាបំណែកមួយ។ លំនាំនេះមានភាពពិសេស ដូចជាស្នាមដៃ។",
          )}
        </p>
      </div>

      {/* Real-world note */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <UseCase icon={Microscope} tone="cyan"
          en="Forensic toxicology" kh="ឧបករណ៍វិភាគជាតិពុលក្នុងផ្នែកព្រហ្មទណ្ឌ" />
        <UseCase icon={Activity}   tone="sky"
          en="Doping tests at the Olympics" kh="ការសាកល្បងសារធាតុហាមឃាត់នៅកីឡាអូឡាំពិក" />
        <UseCase icon={ShieldCheck} tone="emerald"
          en="Detecting pesticides in food" kh="ការរកឃើញថ្នាំសម្លាប់សត្វល្អិតក្នុងអាហារ" />
      </div>
    </Panel>
  );
}

function UseCase({
  icon: Icon, tone, en, kh,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "cyan" | "sky" | "emerald";
  en: string; kh: string;
}) {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const c = {
    cyan:    "border-cyan-400/30 text-cyan-200",
    sky:     "border-sky-400/30 text-sky-200",
    emerald: "border-emerald-400/30 text-emerald-200",
  }[tone];
  return (
    <div className={`rounded-xl border ${c} bg-white/3 px-3 py-2.5 flex items-center gap-2.5`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className={`text-xs sm:text-sm ${isKh ? "font-khmer" : ""}`}>{t(en, kh)}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 3 — NMR                                                        */
/* ──────────────────────────────────────────────────────────────────────── */

function NMRSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <Panel
      id="nmr"
      icon={Music2}
      title={{
        en: "The \"Magnetic Singer\" — NMR",
        kh: "អ្នកចម្រៀងម៉ាញ៉េទិច — NMR",
      }}
      subtitle={{
        en: "Nuclear Magnetic Resonance — like an MRI scanner, but for one molecule.",
        kh: "សញ្ញាត្រូវនៃនុយក្លេអ៊ែរម៉ាញ៉េទិច — ដូចម៉ាស៊ីន MRI ប៉ុន្តែសម្រាប់ម៉ូលេគុលមួយ។",
      }}
    >
      <p
        className={`text-slate-300/90 text-sm sm:text-base leading-relaxed mb-5 ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {t(
          "Place a molecule inside a colossally strong magnetic field, then ping it with a radio pulse. Specific atoms inside — most often Hydrogen — start to \"sing\" back at very specific radio frequencies that depend on what their atomic neighbours are. Scientists listen carefully to the song, and from those notes they can draw a perfect 3-D map of the molecule, atom by atom.",
          "ដាក់ម៉ូលេគុលមួយនៅខាងក្នុងដែនម៉ាញ៉េទិចដ៏ខ្លាំងមហិមា រួចបាញ់វាដោយលំញ័រវិទ្យុ។ អាតូមជាក់លាក់នៅខាងក្នុង — ភាគច្រើនបំផុតគឺអ៊ីដ្រូសែន — ចាប់ផ្ដើម 'ច្រៀង' ត្រឡប់មកវិញ នៅប្រេកង់វិទ្យុជាក់លាក់ ដែលអាស្រ័យលើថា អ្នកជិតខាងអាតូមរបស់វាជាអ្វី។ អ្នកវិទ្យាសាស្ត្រស្ដាប់បទចម្រៀងនោះដោយយកចិត្តទុកដាក់ ហើយពីតន្ត្រីទាំងនោះ ពួកគេអាចគូរផែនទី ៣D នៃម៉ូលេគុល បានយ៉ាងពេញលក្ខណៈ — អាតូមម្ដងមួយ។",
        )}
      </p>

      {/* NMR sound-wave diagram */}
      <div
        className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-4 sm:p-5"
        data-testid="nmr-spectrum"
      >
        <p
          className={`text-xs uppercase tracking-widest text-cyan-300/80 mb-3 ${
            kh ? "font-khmer normal-case tracking-normal" : ""
          }`}
        >
          {t("¹H NMR Spectrum — The Hydrogen Song", "វិសាលគម ¹H NMR — បទចម្រៀងអ៊ីដ្រូសែន")}
        </p>
        <svg viewBox="0 0 600 180" className="w-full h-auto" role="img" aria-label="NMR spectrum">
          {/* Axis */}
          <line x1="20" y1="150" x2="580" y2="150" stroke="#475569" strokeWidth="1" />
          {/* ppm scale */}
          {[10, 8, 6, 4, 2, 0].map((ppm, i) => {
            const x = 60 + i * 100;
            return (
              <g key={ppm}>
                <line x1={x} y1="150" x2={x} y2="156" stroke="#475569" />
                <text x={x} y="170" textAnchor="middle" fontSize="10" fill="#94a3b8">{ppm}</text>
              </g>
            );
          })}
          <text x="300" y="178" textAnchor="middle" fontSize="9" fill="#64748b">
            {t("chemical shift (ppm)", "ការផ្លាស់ប្ដូរគីមី (ppm)")}
          </text>

          {/* Three peak clusters — singlet, doublet, triplet */}
          {/* Singlet near ~8.6 ppm (aromatic region) */}
          <path d="M 120 150 Q 130 60 140 150" stroke="#67e8f9" strokeWidth="2.5" fill="none" />
          <text x="130" y="50" textAnchor="middle" fontSize="9" fill="#a5f3fc">
            {t("singlet", "សុីងគ្លែត")}
          </text>

          {/* Doublet near ~3.8 ppm */}
          <path d="M 350 150 Q 357 90 364 150" stroke="#67e8f9" strokeWidth="2.5" fill="none" />
          <path d="M 372 150 Q 379 90 386 150" stroke="#67e8f9" strokeWidth="2.5" fill="none" />
          <text x="370" y="80" textAnchor="middle" fontSize="9" fill="#a5f3fc">
            {t("doublet", "ដាប់ប៊ែល")}
          </text>

          {/* Triplet near ~1.3 ppm */}
          <path d="M 470 150 Q 476 110 482 150" stroke="#67e8f9" strokeWidth="2.5" fill="none" />
          <path d="M 488 150 Q 494 70 500 150"  stroke="#67e8f9" strokeWidth="2.5" fill="none" />
          <path d="M 506 150 Q 512 110 518 150" stroke="#67e8f9" strokeWidth="2.5" fill="none" />
          <text x="494" y="60" textAnchor="middle" fontSize="9" fill="#a5f3fc">
            {t("triplet", "ទ្រីបផ្លែត")}
          </text>

          {/* Tiny floating notes for whimsy */}
          <text x="155" y="40" fontSize="14" fill="#67e8f9" opacity="0.6">♪</text>
          <text x="395" y="70" fontSize="14" fill="#67e8f9" opacity="0.6">♫</text>
          <text x="525" y="55" fontSize="14" fill="#67e8f9" opacity="0.6">♪</text>
        </svg>
        <p className={`text-xs text-slate-400 text-center mt-2 ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Each cluster is a different group of hydrogens. Their position and splitting pattern tells you who their neighbours are.",
            "ក្រុមនីមួយៗគឺជាក្រុមអ៊ីដ្រូសែនផ្សេងគ្នា។ ទីតាំង និងលំនាំបំបែករបស់វា ប្រាប់អ្នកថា អ្នកជិតខាងរបស់វាគឺនរណា។",
          )}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-cyan-400/30 bg-cyan-500/5 p-4 flex items-start gap-3">
        <Music2 className="w-5 h-5 text-cyan-300 mt-0.5 flex-shrink-0" />
        <p
          className={`text-cyan-100/90 text-sm leading-relaxed ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "An MRI scanner in a hospital is the same physics — only it's listening to the hydrogen atoms inside the water in your body, instead of inside a single molecule on a lab bench.",
            "ម៉ាស៊ីន MRI នៅមន្ទីរពេទ្យ គឺជារូបវិទ្យាដូចគ្នា — គ្រាន់តែវាស្ដាប់អាតូមអ៊ីដ្រូសែននៅខាងក្នុងទឹកក្នុងរាងកាយរបស់អ្នក ជំនួសឱ្យនៅក្នុងម៉ូលេគុលតែមួយលើតុមន្ទីរពិសោធន៍។",
          )}
        </p>
      </div>
    </Panel>
  );
}
