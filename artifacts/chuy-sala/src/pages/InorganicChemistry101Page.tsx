import { Link } from "wouter";
import {
  ArrowLeft,
  Hammer,
  Gem,
  Wheat,
  BatteryCharging,
  AlertTriangle,
  Sparkles,
  Building2,
  FlaskConical,
  Box,
  Calculator,
  HelpCircle,
  Atom,
  Combine,
  Hexagon,
  Orbit,
  Grid3x3,
  Dna,
  Activity,
  GraduationCap,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Inorganic Chemistry 101 — គីមីវិទ្យាអសរីរាង្គ ១០១
 * Self-contained module. Earth & Industry aesthetic:
 *   metallic silvers (slate/zinc) · rust oranges (orange-700/amber)
 *   crystalline blues (sky/indigo).
 * No new dependencies.
 * ══════════════════════════════════════════════════════════════════════════ */

export function InorganicChemistry101Page() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-sky-50/60 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle metallic crosshatch backdrop */}
      <MetalBackdrop />

      <div className="relative max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/chemistry"
          data-testid="link-back-to-chemistry"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Chemistry Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា")}
        </Link>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-600 via-zinc-500 to-orange-600 text-white shadow-lg mb-4 ring-1 ring-slate-300">
            <Gem className="w-9 h-9" strokeWidth={2.25} />
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-[0.25em] text-orange-700 mb-1 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Module 06 · Chemistry Hub", "មុខវិជ្ជា ០៦ · មជ្ឈមណ្ឌលគីមីវិទ្យា")}
          </div>
          <h1
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 ${
              kh ? "font-khmer leading-snug" : ""
            }`}
          >
            <span className="bg-gradient-to-r from-slate-700 via-zinc-600 to-orange-700 bg-clip-text text-transparent">
              {t("Inorganic Chemistry 101", "គីមីវិទ្យាអសរីរាង្គ ១០១")}
            </span>
          </h1>
          <p
            className={`text-base sm:text-lg text-slate-600 max-w-2xl mx-auto ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "The chemistry of metals, minerals, salts, and gases — the material world that builds our roads, our buildings, and our farms.",
              "គីមីវិទ្យានៃលោហៈ សារធាតុរ៉ែ អំបិល និងឧស្ម័ន — ពិភពសម្ភារៈដែលស្ថាបនាផ្លូវ អគារ និងចម្ការរបស់យើង។",
            )}
          </p>
        </header>

        {/* ── Section 1: The Not-Carbon World ─────────────────── */}
        <NotCarbonSection />

        {/* ── Section 2: Core Curriculum (7 modules) ──────────── */}
        <CoreCurriculumSection />

        {/* ── Section 3: Crystal Lattices & Solid Structures ──── */}
        <CrystalLatticesSection />

        {/* ── Section 4: Metals & Alloys ──────────────────────── */}
        <MetalsAlloysSection />

        {/* ── Section 5: Salts & Crystals ─────────────────────── */}
        <SaltsCrystalsSection />

        {/* ── Section 6: Agriculture & Power ──────────────────── */}
        <AgriPowerSection />

        {/* Footer note */}
        <p
          className={`mt-12 text-center text-xs sm:text-sm text-muted-foreground ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "Inorganic chemistry is everywhere — from the cement in your school walls to the battery on the roof.",
            "គីមីវិទ្យាអសរីរាង្គមាននៅគ្រប់ទីកន្លែង — ចាប់ពីស៊ីម៉ងត៍ក្នុងជញ្ជាំងសាលា ដល់ថ្មនៅលើដំបូល។",
          )}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 1 — The "Not-Carbon" World                                     */
/* ──────────────────────────────────────────────────────────────────────── */

function NotCarbonSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      aria-labelledby="not-carbon-heading"
      className="mb-12 rounded-3xl bg-white border-2 border-slate-200 shadow-sm overflow-hidden"
    >
      <header className="px-5 sm:px-7 pt-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-slate-700 text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </span>
          <h2
            id="not-carbon-heading"
            className={`text-xl sm:text-2xl font-bold text-slate-900 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t("1. The 'Not-Carbon' World", "១. ពិភពមិនមែនកាបូន")}
          </h2>
        </div>
        <p
          className={`text-sm text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}
        >
          {t(
            "If organic chemistry is the chemistry of life, inorganic chemistry is the chemistry of everything else.",
            "បើគីមីវិទ្យាសរីរាង្គគឺគីមីវិទ្យានៃជីវិត គីមីវិទ្យាអសរីរាង្គគឺគីមីវិទ្យានៃអ្វីៗផ្សេងទៀតទាំងអស់។",
          )}
        </p>
      </header>

      <div className="p-5 sm:p-7 grid sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Organic */}
        <article className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" role="img" aria-label="Leaf">🌿</span>
            <h3
              className={`font-bold text-emerald-900 ${kh ? "font-khmer" : ""}`}
            >
              {t("Organic", "សរីរាង្គ")}
            </h3>
          </div>
          <p
            className={`text-sm text-emerald-900/80 mb-3 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Built around carbon (C). The chemistry of living things, fuels, and most plastics.",
              "ស្ថាបនាជុំវិញកាបូន (C)។ គីមីវិទ្យានៃរបស់មានជីវិត ឥន្ធនៈ និងប្លាស្ទិកភាគច្រើន។",
            )}
          </p>
          <ul
            className={`text-xs text-emerald-900/80 space-y-1 ${
              kh ? "font-khmer" : ""
            }`}
          >
            <li>• {t("Sugar, DNA, wood", "ស្ករ DNA ឈើ")}</li>
            <li>• {t("Petrol, plastic bags", "សាំង ថង់ប្លាស្ទិក")}</li>
            <li>• {t("Most medicines", "ឱសថភាគច្រើន")}</li>
          </ul>
        </article>

        {/* Inorganic */}
        <article className="rounded-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" role="img" aria-label="Gear">⚙️</span>
            <h3
              className={`font-bold text-orange-900 ${kh ? "font-khmer" : ""}`}
            >
              {t("Inorganic", "អសរីរាង្គ")}
            </h3>
          </div>
          <p
            className={`text-sm text-orange-900/85 mb-3 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Everything else: metals, minerals, salts, and gases. The chemistry of the Earth itself.",
              "អ្វីផ្សេងទៀតទាំងអស់៖ លោហៈ សារធាតុរ៉ែ អំបិល និងឧស្ម័ន។ គីមីវិទ្យានៃផែនដី។",
            )}
          </p>
          <ul
            className={`text-xs text-orange-900/85 space-y-1 ${
              kh ? "font-khmer" : ""
            }`}
          >
            <li>• {t("Iron, copper, gold", "ដែក ស្ពាន់ មាស")}</li>
            <li>• {t("Cement, glass, ceramics", "ស៊ីម៉ងត៍ កញ្ចក់ សេរ៉ាមិច")}</li>
            <li>• {t("Fertilizer, battery acid", "ជី អាស៊ីតថ្ម")}</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 2 — Core Curriculum (7 modules)                                */
/* ──────────────────────────────────────────────────────────────────────── */

type CurriculumModule = {
  key: string;
  Icon: typeof Atom;
  titleEn: string;
  titleKh: string;
  descEn: string;
  descKh: string;
  /* Optional route — when present the card becomes a navigable Link. */
  href?: string;
  /* Pastel theme — using Tailwind classes that already exist on this page so
     no new safelist entries are required. Each card gets a soft tinted bg,
     matching border, an icon-tile gradient, and a hover ring color. */
  bgClass: string;
  borderClass: string;
  iconBgClass: string;
  iconRingClass: string;
  hoverRingClass: string;
  titleColor: string;
};

const CURRICULUM: CurriculumModule[] = [
  {
    key: "atomic-structure",
    Icon: Atom,
    titleEn: "Atomic Structure & Periodic Trends",
    titleKh: "រចនាសម្ព័ន្ធអាតូម និងនិន្នាការខួប",
    descEn:
      "Analysis of periodic properties and atomic structure, providing a foundation for understanding inorganic behavior.",
    descKh:
      "ការវិភាគលក្ខណៈសម្បត្តិតាមខួប និងរចនាសម្ព័ន្ធអាតូម ដែលផ្តល់ជាមូលដ្ឋានសម្រាប់ការយល់ដឹងពីឥរិយាបថអសរីរាង្គ។",
    href: "/science/chemistry/inorganic/atomic-structure",
    bgClass: "bg-sky-50/70",
    borderClass: "border-sky-200",
    iconBgClass: "bg-gradient-to-br from-sky-500 to-blue-600",
    iconRingClass: "ring-sky-200",
    hoverRingClass: "hover:ring-sky-300",
    titleColor: "text-sky-900",
  },
  {
    key: "bonding-molecular",
    Icon: Combine,
    titleEn: "Bonding & Molecular Theory",
    titleKh: "ទ្រឹស្តីចំណង និងម៉ូលេគុល",
    descEn:
      "Study of Lewis structures, Valence-Shell Electron-Pair Repulsion (VSEPR), molecular orbital (MO) diagrams, and band structure for solids.",
    descKh:
      "ការសិក្សារចនាសម្ព័ន្ធ Lewis ការច្រានគ្នាជាគូអេឡិចត្រុងសែល Valence (VSEPR) ដ្យាក្រាមកក្ខវ៌រម៉ូលេគុល (MO) និងរចនាសម្ព័ន្ធបាន់សម្រាប់សារធាតុរឹង។",
    href: "/science/chemistry/inorganic/bonding-molecular",
    bgClass: "bg-indigo-50/70",
    borderClass: "border-indigo-200",
    iconBgClass: "bg-gradient-to-br from-indigo-500 to-violet-600",
    iconRingClass: "ring-indigo-200",
    hoverRingClass: "hover:ring-indigo-300",
    titleColor: "text-indigo-900",
  },
  {
    key: "symmetry-group",
    Icon: Hexagon,
    titleEn: "Symmetry and Group Theory",
    titleKh: "ទ្រឹស្តីស៊ីមេទ្រី និងក្រុម",
    descEn:
      "Application of symmetry operations, point groups, and character tables to determine molecular properties.",
    descKh:
      "ការអនុវត្តប្រតិបត្តិការស៊ីមេទ្រី ក្រុមចំនុច និងតារាងអក្សរ ដើម្បីកំណត់លក្ខណៈសម្បត្តិម៉ូលេគុល។",
    bgClass: "bg-fuchsia-50/70",
    borderClass: "border-fuchsia-200",
    iconBgClass: "bg-gradient-to-br from-fuchsia-500 to-pink-600",
    iconRingClass: "ring-fuchsia-200",
    hoverRingClass: "hover:ring-fuchsia-300",
    titleColor: "text-fuchsia-900",
  },
  {
    key: "coordination",
    Icon: Orbit,
    titleEn: "Coordination Chemistry",
    titleKh: "គីមីវិទ្យាកូអរដោនេ",
    descEn:
      "Exploration of transition metal complexes, including structure, isomerism, nomenclature, and ligand field theory (bonding theories).",
    descKh:
      "ការស្វែងយល់អំពីសមាសធាតុលោហៈអន្តរកាល រួមទាំងរចនាសម្ព័ន្ធ អ៊ីសូម៉េរីស ឈ្មោះវិទ្យា និងទ្រឹស្តីវាលលីហ្គង់ (ទ្រឹស្តីចំណង)។",
    bgClass: "bg-emerald-50/70",
    borderClass: "border-emerald-200",
    iconBgClass: "bg-gradient-to-br from-emerald-500 to-teal-600",
    iconRingClass: "ring-emerald-200",
    hoverRingClass: "hover:ring-emerald-300",
    titleColor: "text-emerald-900",
  },
  {
    key: "main-group",
    Icon: Grid3x3,
    titleEn: "Main Group Element Chemistry",
    titleKh: "គីមីវិទ្យាធាតុក្រុមចម្បង",
    descEn:
      "Survey of s-block and p-block elements, including their reactivity and industrial applications.",
    descKh:
      "ការសិក្សាទូទៅអំពីធាតុ s-block និង p-block រួមទាំងប្រតិកម្មរបស់ពួកវា និងការអនុវត្តក្នុងឧស្សាហកម្ម។",
    bgClass: "bg-amber-50/70",
    borderClass: "border-amber-200",
    iconBgClass: "bg-gradient-to-br from-amber-500 to-orange-600",
    iconRingClass: "ring-amber-200",
    hoverRingClass: "hover:ring-amber-300",
    titleColor: "text-amber-900",
  },
  {
    key: "organometallic",
    Icon: Dna,
    titleEn: "Organometallic and Bioinorganic Chemistry",
    titleKh: "គីមីសរីរាង្គលោហៈ និងជីវអសរីរាង្គ",
    descEn:
      "Introduction to metal-carbon bonds, catalysis, and the role of metals in biological systems.",
    descKh:
      "សេចក្ដីផ្ដើមអំពីចំណងលោហៈ-កាបូន ការកាតាលីស និងតួនាទីរបស់លោហៈនៅក្នុងប្រព័ន្ធជីវសាស្ត្រ។",
    bgClass: "bg-rose-50/70",
    borderClass: "border-rose-200",
    iconBgClass: "bg-gradient-to-br from-rose-500 to-pink-600",
    iconRingClass: "ring-rose-200",
    hoverRingClass: "hover:ring-rose-300",
    titleColor: "text-rose-900",
  },
  {
    key: "spectroscopy",
    Icon: Activity,
    titleEn: "Spectroscopy & Characterization",
    titleKh: "វិសាលគមវិទ្យា និងការកំណត់លក្ខណៈ",
    descEn:
      "Techniques for structural determination, including Nuclear Magnetic Resonance (NMR) and Electronic Spectroscopy.",
    descKh:
      "បច្ចេកទេសសម្រាប់កំណត់រចនាសម្ព័ន្ធ រួមទាំង Nuclear Magnetic Resonance (NMR) និងវិសាលគមអេឡិចត្រូនិច។",
    bgClass: "bg-cyan-50/70",
    borderClass: "border-cyan-200",
    iconBgClass: "bg-gradient-to-br from-cyan-500 to-sky-600",
    iconRingClass: "ring-cyan-200",
    hoverRingClass: "hover:ring-cyan-300",
    titleColor: "text-cyan-900",
  },
];

function CoreCurriculumSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      data-testid="section-core-curriculum"
      aria-labelledby="core-curriculum-heading"
      className="mb-12 rounded-3xl bg-white border-2 border-slate-200 shadow-sm overflow-hidden"
    >
      <header className="px-5 sm:px-7 pt-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 via-slate-50 to-white">
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-700 to-slate-700 text-white shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </span>
          <h2
            id="core-curriculum-heading"
            className={`text-xl sm:text-2xl font-bold text-slate-900 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t("2. Core Curriculum", "២. កម្មវិធីសិក្សាស្នូល")}
          </h2>
        </div>
        <p
          className={`text-sm text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}
        >
          {t(
            "The seven foundational pillars taught in any university-level inorganic chemistry course. Tap any module to learn more.",
            "សសរស្តម្ភមូលដ្ឋានទាំងប្រាំពីរ ដែលបង្រៀននៅក្នុងវគ្គគីមីវិទ្យាអសរីរាង្គកម្រិតសាកលវិទ្យាល័យណាមួយ។ ចុចលើម៉ូឌុលណាមួយដើម្បីស្វែងយល់បន្ថែម។",
          )}
        </p>
      </header>

      <div
        role="list"
        aria-label="Core curriculum modules · ម៉ូឌុលកម្មវិធីសិក្សាស្នូល"
        data-testid="curriculum-grid"
        className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
      >
        {CURRICULUM.map((m) => {
          const { Icon } = m;
          const cardClass = `group text-left rounded-2xl border-2 ${m.borderClass} ${m.bgClass} p-5 shadow-sm ring-1 ring-transparent ${m.hoverRingClass} hover:-translate-y-1 hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-indigo-400/60`;
          const inner = (
            <>
              <div className="flex items-start gap-4">
                <span
                  className={`shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl text-white shadow-md ring-2 ${m.iconRingClass} ${m.iconBgClass} group-hover:scale-105 transition-transform`}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" strokeWidth={2.25} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`text-base sm:text-lg font-bold leading-snug ${m.titleColor} mb-1`}
                  >
                    <span>{m.titleEn}</span>
                    <span className="block font-khmer text-sm sm:text-base font-semibold opacity-90 mt-0.5 leading-relaxed">
                      {m.titleKh}
                    </span>
                  </h3>
                </div>
              </div>

              <p
                className={`mt-3 text-sm text-slate-700 leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(m.descEn, m.descKh)}
              </p>

              <div
                className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${m.titleColor} opacity-70 group-hover:opacity-100 transition-opacity`}
              >
                <span>{t("Explore module", "ស្វែងយល់ម៉ូឌុល")}</span>
                <span aria-hidden="true">→</span>
              </div>
            </>
          );
          return m.href ? (
            <Link
              key={m.key}
              href={m.href}
              role="listitem"
              data-testid={`curriculum-${m.key}`}
              aria-label={`${m.titleEn} · ${m.titleKh}`}
              className={cardClass}
            >
              {inner}
            </Link>
          ) : (
            <button
              key={m.key}
              type="button"
              role="listitem"
              data-testid={`curriculum-${m.key}`}
              aria-label={`${m.titleEn} · ${m.titleKh}`}
              className={cardClass}
            >
              {inner}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 3 — Crystal Lattices & Solid Structures                        */
/* ──────────────────────────────────────────────────────────────────────── */

function CrystalLatticesSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  // Three cubic structures, drawn as lightweight CSS atom-cluster diagrams.
  const cubics = [
    {
      key: "sc",
      labelEn: "Simple Cubic (SC)",
      labelKh: "គូប​សាមញ្ញ (SC)",
      packing: "52%",
      blurbEn: "Atoms only at the 8 corners of the cube. Lots of empty space inside.",
      blurbKh: "អាតូមនៅត្រឹមតែជ្រុងទាំង ៨ នៃគូប។ មានចន្លោះទទេច្រើននៅខាងក្នុង។",
      ringClass: "ring-slate-300",
      bgClass: "from-slate-50 to-slate-100",
      // 8 corners only
      atoms: [
        [10, 10], [90, 10], [10, 90], [90, 90],
        [25, 25], [75, 25], [25, 75], [75, 75],
      ] as [number, number][],
    },
    {
      key: "bcc",
      labelEn: "Body-Centered Cubic (BCC)",
      labelKh: "គូបកណ្តាលកាយ (BCC)",
      packing: "68%",
      blurbEn:
        "Atoms at the 8 corners + 1 atom trapped in the dead centre of the cube.",
      blurbKh:
        "អាតូមនៅជ្រុងទាំង ៨ + អាតូម ១ ជាប់នៅចំកណ្តាលគូប។",
      ringClass: "ring-zinc-400",
      bgClass: "from-zinc-50 to-slate-100",
      // 8 corners + 1 centre
      atoms: [
        [10, 10], [90, 10], [10, 90], [90, 90],
        [25, 25], [75, 25], [25, 75], [75, 75],
        [50, 50],
      ] as [number, number][],
    },
    {
      key: "fcc",
      labelEn: "Face-Centered Cubic (FCC)",
      labelKh: "គូបកណ្តាលផ្ទៃ (FCC)",
      packing: "74%",
      blurbEn:
        "Atoms at the 8 corners + 1 atom embedded in each of the 6 faces. Very tightly packed.",
      blurbKh:
        "អាតូមនៅជ្រុងទាំង ៨ + អាតូម ១ បង្កប់នៅផ្ទៃនីមួយៗក្នុងចំនួនផ្ទៃទាំង ៦ នៃគូប។ វេចខ្ចប់តឹងណែនបំផុត។",
      ringClass: "ring-orange-300",
      bgClass: "from-orange-50 to-amber-50",
      // 8 corners + 6 face centres (front/back/top/bottom/left/right projected to 2D)
      atoms: [
        [10, 10], [90, 10], [10, 90], [90, 90],
        [25, 25], [75, 25], [25, 75], [75, 75],
        [50, 18], [50, 82], [18, 50], [82, 50],
        [37, 50], [63, 50],
      ] as [number, number][],
    },
  ];

  return (
    <section
      aria-labelledby="crystal-lattices-heading"
      className="mb-12 rounded-3xl bg-white border-2 border-slate-200 shadow-sm overflow-hidden"
    >
      <header className="px-5 sm:px-7 pt-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-sky-50 via-slate-50 to-white">
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-sky-700 to-indigo-700 text-white shadow-sm">
            <Box className="w-5 h-5" />
          </span>
          <h2
            id="crystal-lattices-heading"
            className={`text-xl sm:text-2xl font-bold text-slate-900 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "3. Crystal Lattices & Solid Structures",
              "៣. បណ្តាញគ្រីស្តាល់ និងរចនាសម្ព័ន្ធរឹង",
            )}
          </h2>
        </div>
        <p
          className={`text-sm text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}
        >
          {t(
            "Metals and minerals aren't random piles of atoms — they're highly organised 3D grids. Let's zoom in.",
            "លោហៈ និងសារធាតុរ៉ែ មិនមែនជាគំនរអាតូមដោយចៃដន្យទេ — ពួកវាជាបណ្តាញ ៣ វិមាត្រដែលរៀបចំយ៉ាងម៉ត់ចត់។ តោះពង្រីកមើល។",
          )}
        </p>
      </header>

      <div className="p-5 sm:p-7 space-y-5 sm:space-y-6">
        {/* ─── Card 1 — The Unit Cell ───────────────────────── */}
        <article
          data-testid="card-unit-cell"
          className="rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-sky-50/70 to-white p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-sky-700 text-white shadow-sm">
              <Box className="w-4 h-4" />
            </span>
            <h3
              className={`text-lg sm:text-xl font-bold text-sky-900 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t("The Unit Cell", "កោសិកាឯកតា")}
            </h3>
          </div>

          <p
            className={`text-sm text-slate-700 mb-4 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "The smallest repeating piece of a crystal's 3D grid is called the Unit Cell. Stack millions of identical unit cells together and you get a piece of metal or a mineral crystal.",
              "បំណែកតូចបំផុតដែលធ្វើឡើងម្តងហើយម្តងទៀតនៃបណ្តាញ ៣ វិមាត្ររបស់គ្រីស្តាល់ ហៅថា កោសិកាឯកតា។ តម្រួតកោសិកាឯកតាដូចគ្នារាប់លានចូលគ្នា អ្នកនឹងទទួលបានដុំលោហៈ ឬគ្រីស្តាល់សារធាតុរ៉ែមួយ។",
            )}
          </p>

          {/* Two key concepts side-by-side */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
            <div className="rounded-xl bg-white border border-sky-200 p-4">
              <div
                className={`text-xs font-mono uppercase tracking-wider text-sky-700 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Coordination Number", "ចំនួនកូអរដោនេ")}
              </div>
              <p
                className={`text-sm text-slate-700 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "How many direct neighbours a single atom is touching.",
                  "ចំនួនអ្នកជិតខាងផ្ទាល់ដែលអាតូមមួយប៉ះជាមួយ។",
                )}
              </p>
            </div>
            <div className="rounded-xl bg-white border border-sky-200 p-4">
              <div
                className={`text-xs font-mono uppercase tracking-wider text-sky-700 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Packing Efficiency", "ប្រសិទ្ធភាពនៃការវេចខ្ចប់")}
              </div>
              <p
                className={`text-sm text-slate-700 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "How much of the cell is filled with solid atoms vs. empty space.",
                  "ផ្នែកប៉ុន្មាននៃកោសិកាដែលត្រូវបានបំពេញដោយអាតូមរឹង ធៀបនឹងចន្លោះទទេ។",
                )}
              </p>
            </div>
          </div>

          {/* Three cubic structures */}
          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            {cubics.map((c) => (
              <div
                key={c.key}
                data-testid={`cubic-${c.key}`}
                className="rounded-xl bg-white border-2 border-slate-200 p-3 sm:p-4 shadow-sm"
              >
                {/* Mini diagram */}
                <div
                  className={`relative aspect-square rounded-lg bg-gradient-to-br ${c.bgClass} ring-1 ${c.ringClass} mb-3 overflow-hidden`}
                  role="img"
                  aria-label={`${c.labelEn} diagram`}
                >
                  {/* Cube outline (just for visual scaffolding) */}
                  <div className="absolute inset-[12%] border-2 border-slate-400/50 rounded-sm" />
                  <div className="absolute inset-[27%] border-2 border-slate-400/30 rounded-sm" />
                  {/* Atoms */}
                  {c.atoms.map(([x, y], i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 ring-1 ring-white shadow"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}
                </div>

                <div
                  className={`text-sm font-bold text-slate-900 mb-1 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(c.labelEn, c.labelKh)}
                </div>
                <div className="inline-block px-2 py-0.5 rounded-md bg-orange-100 text-[11px] font-mono font-bold text-orange-800 mb-2">
                  {c.packing} {t("packing", "វេចខ្ចប់")}
                </div>
                <p
                  className={`text-xs text-slate-600 ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  {t(c.blurbEn, c.blurbKh)}
                </p>
              </div>
            ))}
          </div>
        </article>

        {/* ─── Card 2 — The Math of Density ─────────────────── */}
        <article
          data-testid="card-density-math"
          className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/70 to-white p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-700 text-white shadow-sm">
              <Calculator className="w-4 h-4" />
            </span>
            <h3
              className={`text-lg sm:text-xl font-bold text-indigo-900 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t("The Math of Density", "គណិតវិទ្យានៃដង់ស៊ីតេ")}
            </h3>
          </div>

          <p
            className={`text-sm text-slate-700 mb-4 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Because we know exactly how atoms pack together inside a unit cell, we can calculate the exact density of a metal — without ever touching it!",
              "ដោយយើងដឹងច្បាស់អំពីរបៀបដែលអាតូមវេចខ្ចប់គ្នាក្នុងកោសិកាឯកតា យើងអាចគណនាដង់ស៊ីតេពិតប្រាកដនៃលោហៈ — ដោយមិនបាច់ប៉ះវាសោះ!",
            )}
          </p>

          {/* The formula */}
          <div className="rounded-xl bg-white border-2 border-indigo-200 p-5 mb-4 flex items-center justify-center">
            <div className="text-indigo-900 text-xl sm:text-2xl">
              <BlockMath
                math={String.raw`\rho = \frac{z \cdot M}{N_A \cdot a^3}`}
              />
            </div>
          </div>

          {/* Variable key */}
          <div
            className={`text-xs font-mono uppercase tracking-wider text-indigo-700 mb-2 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Variable key", "តារាងអថេរ")}
          </div>
          <ul className="space-y-2">
            {[
              {
                sym: String.raw`\rho`,
                en: "Density of the metal",
                kh: "ដង់ស៊ីតេនៃលោហៈ",
              },
              {
                sym: "z",
                en: "Number of atoms per unit cell",
                kh: "ចំនួនអាតូមក្នុងមួយកោសិកាឯកតា",
              },
              {
                sym: "M",
                en: "Molar mass (g/mol)",
                kh: "ម៉ាសម៉ូល (g/mol)",
              },
              {
                sym: "N_A",
                en: "Avogadro's number (≈ 6.022 × 10²³)",
                kh: "លេខអាវ៉ូហ្គាដ្រូ (≈ 6.022 × 10²³)",
              },
              {
                sym: "a^3",
                en: "Volume of the unit cell",
                kh: "មាឌនៃកោសិកាឯកតា",
              },
            ].map((row, i) => (
              <li
                key={i}
                className="flex items-baseline gap-3 rounded-lg bg-white border border-indigo-100 px-3 py-2"
              >
                <span className="inline-flex items-center justify-center min-w-[2.5rem] text-indigo-900 text-base">
                  <InlineMath math={row.sym} />
                </span>
                <span
                  className={`text-sm text-slate-700 ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  {t(row.en, row.kh)}
                </span>
              </li>
            ))}
          </ul>
        </article>

        {/* ─── Card 3 — The Diamond Enigma ──────────────────── */}
        <article
          data-testid="card-diamond-enigma"
          className="rounded-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50/70 to-amber-50/70 p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-600 to-amber-700 text-white shadow-sm">
              <Gem className="w-4 h-4" />
            </span>
            <h3
              className={`text-lg sm:text-xl font-bold text-orange-900 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t("The Diamond Enigma", "អាថ៌កំបាំងពេជ្រ")}
            </h3>
          </div>

          {/* The question */}
          <div className="rounded-xl bg-white border border-orange-200 px-4 py-3 mb-4 flex items-start gap-2.5">
            <HelpCircle className="w-5 h-5 text-orange-700 flex-shrink-0 mt-0.5" />
            <p
              className={`text-sm font-semibold text-orange-900 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Why is a diamond so hard?",
                "ហេតុអ្វីបានជាពេជ្ររឹងម៉ាំខ្លាំងម្ល៉េះ?",
              )}
            </p>
          </div>

          <p
            className={`text-sm text-slate-700 mb-3 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            <strong>{t("The Tetrahedral Lattice", "បណ្តាញតេត្រាអែត")}.</strong>{" "}
            {t(
              "Unlike metals — where atoms just pack together like oranges in a box — a diamond uses a Network Covalent structure. Every single carbon atom is bolted to four other carbon atoms in a rigid 3D pyramid (tetrahedron) shape.",
              "មិនដូចលោហៈ — ដែលអាតូមគ្រាន់តែវេចខ្ចប់គ្នាដូចជាក្រូចនៅក្នុងប្រអប់ — ពេជ្រប្រើរចនាសម្ព័ន្ធកូវ៉ាឡង់បណ្តាញ។ អាតូមកាបូននីមួយៗត្រូវបានភ្ជាប់ទៅអាតូមកាបូនបួនផ្សេងទៀត ក្នុងទម្រង់ពីរ៉ាមីត ៣ វិមាត្រដ៏រឹងមាំ (តេត្រាអែត)។",
            )}
          </p>

          <p
            className={`text-sm text-slate-700 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "To break a diamond, you have to break millions of real chemical bonds at the exact same time — that's why it's the hardest natural material on Earth.",
              "ដើម្បីបំបែកពេជ្រ អ្នកត្រូវបំបែកចំណងគីមីពិតរាប់លាន ក្នុងពេលតែមួយ — នោះហើយជាហេតុដែលវាជាសារធាតុធម្មជាតិដែលរឹងបំផុតនៅលើផែនដី។",
            )}
          </p>
        </article>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 4 — Metals & Alloys                                            */
/* ──────────────────────────────────────────────────────────────────────── */

type Alloy = {
  key: string;
  nameEn: string;
  nameKh: string;
  formula: string; // e.g. "Fe + C"
  swatch: string; // tailwind classes for the color block
  ringClass: string;
  borderClass: string;
  blurbEn: string;
  blurbKh: string;
  useEn: string;
  useKh: string;
};

const ALLOYS: Alloy[] = [
  {
    key: "steel",
    nameEn: "Steel",
    nameKh: "ដែកថែប",
    formula: "Fe + C",
    swatch: "bg-gradient-to-br from-slate-300 via-slate-500 to-slate-700",
    ringClass: "ring-slate-400",
    borderClass: "border-slate-300",
    blurbEn:
      "Pure iron is soft and bends easily. Add a tiny pinch of carbon (less than 2%) and it becomes incredibly strong.",
    blurbKh:
      "ដែកសុទ្ធគឺទន់ និងពត់ងាយ។ បន្ថែមកាបូនបន្តិច (តិចជាង ២%) វាក្លាយជារឹងមាំខ្លាំង។",
    useEn: "Bridges, school buildings, rebar, vehicles.",
    useKh: "ស្ពាន អគារសាលា ដែកពង្រឹង យានយន្ត។",
  },
  {
    key: "bronze",
    nameEn: "Bronze",
    nameKh: "សំរឹទ្ធ",
    formula: "Cu + Sn",
    swatch: "bg-gradient-to-br from-amber-400 via-orange-600 to-amber-800",
    ringClass: "ring-orange-500",
    borderClass: "border-orange-300",
    blurbEn:
      "One of humanity's first alloys. Harder than copper alone — it shaped tools and art for thousands of years.",
    blurbKh:
      "ជាលោហៈធាតុផ្សំដំបូងបង្អស់របស់មនុស្ស។ រឹងជាងស្ពាន់សុទ្ធ — បានបង្កើតឧបករណ៍ និងសិល្បៈរាប់ពាន់ឆ្នាំ។",
    useEn: "Bronze statues at Angkor, bells, ancient weapons.",
    useKh: "រូបសំណាកសំរឹទ្ធនៅអង្គរ កណ្តឹង អាវុធបុរាណ។",
  },
  {
    key: "brass",
    nameEn: "Brass",
    nameKh: "លង្ហិន",
    formula: "Cu + Zn",
    swatch: "bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600",
    ringClass: "ring-yellow-500",
    borderClass: "border-yellow-300",
    blurbEn:
      "Bright and golden. It resists rust very well, so it's used where water and air are always present.",
    blurbKh:
      "ភ្លឺ និងមានពណ៌មាស។ វាទប់ទល់នឹងច្រែះបានល្អ ដូច្នេះត្រូវបានប្រើនៅកន្លែងមានទឹក និងខ្យល់។",
    useEn: "Water valves, taps, trumpets, traditional instruments.",
    useKh: "រ៉ូប៊ីណេទឹក ត្រែ ឧបករណ៍តន្ត្រីប្រពៃណី។",
  },
];

function MetalsAlloysSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      aria-labelledby="metals-heading"
      className="mb-12 rounded-3xl bg-white border-2 border-slate-200 shadow-sm overflow-hidden"
    >
      <header className="px-5 sm:px-7 pt-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-zinc-50 via-slate-50 to-white">
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-slate-600 to-zinc-700 text-white shadow-sm">
            <Hammer className="w-5 h-5" />
          </span>
          <h2
            id="metals-heading"
            className={`text-xl sm:text-2xl font-bold text-slate-900 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "4. The Science of Metals & Alloys",
              "៤. វិទ្យាសាស្ត្រនៃលោហៈ និងលោហៈធាតុផ្សំ",
            )}
          </h2>
        </div>
        <p
          className={`text-sm text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}
        >
          {t(
            "Pure metals are often too soft or too reactive to be useful. So humans mix them — these mixtures are called alloys.",
            "លោហៈសុទ្ធច្រើនតែទន់ ឬប្រតិកម្មខ្លាំងពេកមិនអាចប្រើបាន។ ដូច្នេះមនុស្សលាយវា — ល្បាយទាំងនេះហៅថា លោហៈធាតុផ្សំ។",
          )}
        </p>
      </header>

      <div className="p-5 sm:p-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {ALLOYS.map((a) => (
          <article
            key={a.key}
            data-testid={`alloy-card-${a.key}`}
            className={`group rounded-2xl border-2 ${a.borderClass} bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow`}
          >
            {/* Color swatch — represents the metallic appearance. */}
            <div
              className={`h-20 ${a.swatch} relative ring-1 ${a.ringClass}`}
              role="img"
              aria-label={`${a.nameEn} color sample`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
              <span className="absolute bottom-2 right-3 px-2 py-0.5 rounded-md bg-white/85 text-[11px] font-mono font-bold text-slate-800 shadow">
                {a.formula}
              </span>
            </div>
            <div className="p-4">
              <h3
                className={`text-lg font-bold text-slate-900 mb-0.5 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {kh ? a.nameKh : a.nameEn}
              </h3>
              <p className="text-[11px] text-slate-500 font-mono mb-3">
                {kh ? a.nameEn : a.nameKh}
              </p>
              <p
                className={`text-sm text-slate-700 mb-3 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {kh ? a.blurbKh : a.blurbEn}
              </p>
              <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                <span
                  className={`block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-0.5 ${
                    kh ? "font-khmer normal-case tracking-normal" : ""
                  }`}
                >
                  {t("Used for", "ប្រើសម្រាប់")}
                </span>
                <span
                  className={`text-xs text-slate-700 ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  {kh ? a.useKh : a.useEn}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 5 — Salts & Crystals                                           */
/* ──────────────────────────────────────────────────────────────────────── */

function SaltsCrystalsSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      aria-labelledby="salts-heading"
      className="mb-12 rounded-3xl bg-white border-2 border-sky-200 shadow-sm overflow-hidden"
    >
      <header className="px-5 sm:px-7 pt-6 pb-4 border-b border-sky-100 bg-gradient-to-r from-sky-50 via-indigo-50 to-white">
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-700 text-white shadow-sm">
            <Gem className="w-5 h-5" />
          </span>
          <h2
            id="salts-heading"
            className={`text-xl sm:text-2xl font-bold text-slate-900 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t("5. Salts & Crystals", "៥. អំបិល និងគ្រីស្តាល់")}
          </h2>
        </div>
        <p
          className={`text-sm text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}
        >
          {t(
            "In chemistry, 'salt' doesn't just mean the white powder on your food.",
            "ក្នុងគីមីវិទ្យា ពាក្យ \"អំបិល\" មិនមានន័យត្រឹមតែម្សៅពណ៌សលើម្ហូបទេ។",
          )}
        </p>
      </header>

      <div className="p-5 sm:p-7 grid lg:grid-cols-2 gap-5">
        {/* Definition card */}
        <article className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-sky-50 to-indigo-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="w-5 h-5 text-indigo-700" />
            <h3
              className={`font-bold text-indigo-900 ${kh ? "font-khmer" : ""}`}
            >
              {t("What is a chemical salt?", "តើអំបិលគីមីជាអ្វី?")}
            </h3>
          </div>
          <p
            className={`text-sm text-slate-800 mb-4 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "A salt is what you get when an acid reacts with a base. The acid and base cancel each other out — and the leftover is a crystal salt.",
              "អំបិលគឺជាអ្វីដែលអ្នកទទួលបាន ពេលអាស៊ីតប្រតិកម្មនឹងបាស។ អាស៊ីត និងបាសលុបបំបាត់គ្នាទៅវិញទៅមក — ហើយអ្វីដែលនៅសល់គឺគ្រីស្តាល់អំបិល។",
            )}
          </p>
          <div className="rounded-xl bg-white border-2 border-dashed border-indigo-300 p-4 text-center font-mono text-sm sm:text-base text-slate-800 shadow-inner">
            <span className="text-rose-700 font-bold">
              {t("Acid", "អាស៊ីត")}
            </span>
            <span className="mx-2 text-slate-400">+</span>
            <span className="text-emerald-700 font-bold">
              {t("Base", "បាស")}
            </span>
            <span className="mx-2 text-slate-400">→</span>
            <span className="text-indigo-700 font-bold">
              {t("Salt", "អំបិល")}
            </span>
            <span className="mx-2 text-slate-400">+</span>
            <span className="text-sky-700 font-bold">
              {t("Water", "ទឹក")}
            </span>
          </div>
          <p
            className={`text-xs text-slate-600 mt-3 italic ${
              kh ? "font-khmer not-italic leading-loose" : ""
            }`}
          >
            {t(
              "Example: HCl + NaOH → NaCl (table salt) + H₂O",
              "ឧទាហរណ៍៖ HCl + NaOH → NaCl (អំបិលបរិភោគ) + H₂O",
            )}
          </p>
        </article>

        {/* Calcium Carbonate → Cement */}
        <article className="rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-zinc-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-slate-700" />
            <h3
              className={`font-bold text-slate-900 ${kh ? "font-khmer" : ""}`}
            >
              {t(
                "Calcium Carbonate (CaCO₃)",
                "កាល់ស្យូមកាបូណាត (CaCO₃)",
              )}
            </h3>
          </div>
          <p
            className={`text-sm text-slate-700 mb-3 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "This salt is the white rock called limestone. Crushed and baked with clay in a hot kiln, it forms a hard pellet called clinker — which is then ground with gypsum to make the gray cement powder used in construction.",
              "អំបិលនេះគឺថ្មពណ៌សហៅថា ថ្មកំបោរ។ កិន និងដុតវាជាមួយដីឥដ្ឋក្នុងឡក្តៅ វាបង្កើតគ្រាប់រឹងហៅថា គ្លីនកឺ — បន្ទាប់មកកិនជាមួយកំបោរស ដើម្បីផលិតម្សៅស៊ីម៉ងត៍ពណ៌ប្រផេះប្រើក្នុងសំណង់។",
            )}
          </p>

          {/* Mini visual chain: Limestone → Kiln → Cement */}
          <ol
            className="grid grid-cols-3 gap-2 text-center mb-2"
            aria-label={kh ? "ដំណើរការផលិតស៊ីម៉ងត៍" : "Cement production steps"}
          >
            <li className="rounded-xl bg-white border border-slate-200 p-2.5">
              <div className="text-2xl mb-1" aria-hidden="true">🪨</div>
              <div
                className={`text-[11px] font-bold text-slate-800 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t("Limestone", "ថ្មកំបោរ")}
              </div>
            </li>
            <li className="rounded-xl bg-white border border-orange-200 p-2.5">
              <div className="text-2xl mb-1" aria-hidden="true">🔥</div>
              <div
                className={`text-[11px] font-bold text-orange-800 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t("Kiln", "ឡដុត")}
              </div>
            </li>
            <li className="rounded-xl bg-white border border-slate-300 p-2.5">
              <div className="text-2xl mb-1" aria-hidden="true">🏗️</div>
              <div
                className={`text-[11px] font-bold text-slate-800 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t("Cement", "ស៊ីម៉ងត៍")}
              </div>
            </li>
          </ol>
          <p
            className={`text-xs text-slate-600 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Cement mixed with sand, gravel, and water becomes concrete — the most-used building material on Earth.",
              "ស៊ីម៉ងត៍លាយជាមួយខ្សាច់ ក្រួស និងទឹកក្លាយជាបេតុង — សម្ភារៈសំណង់ដែលប្រើច្រើនបំផុតលើផែនដី។",
            )}
          </p>
        </article>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 6 — Agriculture & Power                                        */
/* ──────────────────────────────────────────────────────────────────────── */

function AgriPowerSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      aria-labelledby="agri-heading"
      className="mb-12 rounded-3xl bg-white border-2 border-amber-200 shadow-sm overflow-hidden"
    >
      <header className="px-5 sm:px-7 pt-6 pb-4 border-b border-amber-100 bg-gradient-to-r from-amber-50 via-orange-50 to-white">
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-sm">
            <Wheat className="w-5 h-5" />
          </span>
          <h2
            id="agri-heading"
            className={`text-xl sm:text-2xl font-bold text-slate-900 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t("6. Agriculture & Power", "៦. កសិកម្ម និងថាមពល")}
          </h2>
        </div>
        <p
          className={`text-sm text-slate-600 ${kh ? "font-khmer leading-loose" : ""}`}
        >
          {t(
            "Two inorganic chemicals you'll find at work in almost every Cambodian village.",
            "សារធាតុគីមីអសរីរាង្គពីរ ដែលអ្នកនឹងឃើញដំណើរការនៅស្ទើរគ្រប់ភូមិកម្ពុជា។",
          )}
        </p>
      </header>

      <div className="p-5 sm:p-7 grid lg:grid-cols-2 gap-5">
        {/* NPK Fertilizers */}
        <article className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wheat className="w-5 h-5 text-amber-700" />
            <h3
              className={`font-bold text-amber-900 ${kh ? "font-khmer" : ""}`}
            >
              {t("NPK Fertilizers", "ជី NPK")}
            </h3>
          </div>
          <p
            className={`text-sm text-slate-800 mb-4 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Three salts are added to soil to grow stronger rice and vegetables. Each letter feeds a different part of the plant.",
              "អំបិលបីត្រូវបានបន្ថែមទៅក្នុងដី ដើម្បីបណ្តុះអង្ករ និងបន្លែឱ្យរឹងមាំ។ អក្សរនីមួយៗចិញ្ចឹមផ្នែកផ្សេងគ្នានៃរុក្ខជាតិ។",
            )}
          </p>
          <ul
            className="grid grid-cols-3 gap-2 text-center"
            aria-label={kh ? "សារធាតុចិញ្ចឹមផ្សំ NPK" : "NPK nutrients"}
          >
            <li className="rounded-xl bg-white border-2 border-emerald-300 p-3">
              <div className="font-display font-extrabold text-2xl text-emerald-700 mb-0.5">N</div>
              <div className={`text-[11px] font-bold text-emerald-900 ${kh ? "font-khmer" : ""}`}>
                {t("Nitrogen", "អាសូត")}
              </div>
              <div className={`text-[10px] text-slate-600 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
                {t("Green leaves", "ស្លឹកបៃតង")}
              </div>
            </li>
            <li className="rounded-xl bg-white border-2 border-orange-300 p-3">
              <div className="font-display font-extrabold text-2xl text-orange-700 mb-0.5">P</div>
              <div className={`text-[11px] font-bold text-orange-900 ${kh ? "font-khmer" : ""}`}>
                {t("Phosphorus", "ផូស្វ័រ")}
              </div>
              <div className={`text-[10px] text-slate-600 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
                {t("Strong roots", "ឫសរឹងមាំ")}
              </div>
            </li>
            <li className="rounded-xl bg-white border-2 border-violet-300 p-3">
              <div className="font-display font-extrabold text-2xl text-violet-700 mb-0.5">K</div>
              <div className={`text-[11px] font-bold text-violet-900 ${kh ? "font-khmer" : ""}`}>
                {t("Potassium", "ប៉ូតាស្យូម")}
              </div>
              <div className={`text-[10px] text-slate-600 mt-1 ${kh ? "font-khmer leading-snug" : ""}`}>
                {t("Big fruit & grain", "ផ្លែ & គ្រាប់ធំ")}
              </div>
            </li>
          </ul>
          <p
            className={`text-xs text-slate-600 mt-3 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Modern NPK fertilizers helped double Cambodian rice yields in a single generation.",
              "ជី NPK ទំនើបបានជួយបង្កើនទិន្នផលអង្ករកម្ពុជាទ្វេដងក្នុងមួយជំនាន់។",
            )}
          </p>
        </article>

        {/* Sulfuric Acid → Battery */}
        <article className="rounded-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-rose-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <BatteryCharging className="w-5 h-5 text-orange-700" />
            <h3
              className={`font-bold text-orange-900 ${kh ? "font-khmer" : ""}`}
            >
              {t(
                "Sulfuric Acid (H₂SO₄)",
                "អាស៊ីតស៊ុលហ្វួរីក (H₂SO₄)",
              )}
            </h3>
          </div>
          <p
            className={`text-sm text-slate-800 mb-3 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "A heavy, syrup-like liquid — and one of the most important chemicals in industry. Inside a lead-acid battery, it acts as the electrolyte: the chemical that lets electricity flow between the lead plates as the battery charges and discharges.",
              "វត្ថុរាវធ្ងន់ ដូចទឹកស៊ីរ៉ូ — និងជាសារធាតុគីមីសំខាន់បំផុតមួយក្នុងឧស្សាហកម្ម។ នៅក្នុងថ្មសំណ-អាស៊ីត វាដើរតួជាអេឡិចត្រូលីត៖ សារធាតុដែលអនុញ្ញាតឱ្យអគ្គិសនីហូររវាងបន្ទះសំណ ពេលថ្មសាក និងបញ្ចេញថាមពល។",
            )}
          </p>
          <div className="rounded-lg bg-rose-50 border-2 border-rose-300 p-3 flex items-start gap-2 mb-3">
            <AlertTriangle
              className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p
              className={`text-xs text-rose-900 font-semibold ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "DANGER: Highly corrosive. It burns skin, eyes, and clothes on contact. Never open a battery.",
                "គ្រោះថ្នាក់៖ កាត់ស៊ីខ្លាំង។ វាដុតស្បែក ភ្នែក និងសម្លៀកបំពាក់នៅពេលប៉ះ។ កុំបើកថ្ម។",
              )}
            </p>
          </div>
          <div className="rounded-xl bg-white border border-orange-200 p-3 flex items-center gap-3">
            <div className="text-3xl" aria-hidden="true">🔋</div>
            <p
              className={`text-xs text-slate-700 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "The same chemistry powers the lead-acid batteries used in rural solar systems across Cambodia.",
                "គីមីវិទ្យាដូចគ្នានេះដំណើរការថ្មសំណ-អាស៊ីត ដែលប្រើក្នុងប្រព័ន្ធព្រះអាទិត្យតាមជនបទនៅទូទាំងកម្ពុជា។",
              )}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Decorative backdrop                                                    */
/* ──────────────────────────────────────────────────────────────────────── */

function MetalBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #475569 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, #475569 0 1px, transparent 1px 14px)",
      }}
    />
  );
}

export default InorganicChemistry101Page;
