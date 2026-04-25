import { Link } from "wouter";
import {
  ArrowLeft,
  Pill,
  Activity,
  Beaker,
  Target,
  GraduationCap,
  School,
  Stethoscope,
  Award,
  CheckCircle2,
  Droplets,
  Wind,
  Recycle,
  Sparkles,
  Microscope,
  HeartPulse,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import PharmacyDirectory from "@/components/PharmacyDirectory";

/* ══════════════════════════════════════════════════════════════════════════
 * Pharmacology: The Science of Medicine
 *   ឱសថសាស្ត្រ៖ វិទ្យាសាស្ត្រនៃថ្នាំពេទ្យ
 *
 * Strictly bilingual standalone page. Two sections:
 *   §1  The Two Halves of Pharmacology
 *         Pharmacokinetics (ADME)  vs  Pharmacodynamics (Lock-and-Key)
 *   §2  The Pathway to Becoming a Pharmacist
 *         4-step vertical roadmap (high school → BPharm → internship → license)
 *
 * Aesthetic: Clinical / Health — clean whites, soft medical blues, sterile
 * greens, gentle shadow, rounded corners, faint grid backdrop.
 * ══════════════════════════════════════════════════════════════════════════ */

/* ── Color palette ─────────────────────────────────────────────────────── */
const MED_BLUE_DARK = "#0c4a6e";    // sky-900
const MED_BLUE = "#0284c7";         // sky-600
const MED_BLUE_LIGHT = "#e0f2fe";   // sky-100
const STERILE_GREEN_DARK = "#047857"; // emerald-700
const STERILE_GREEN = "#10b981";    // emerald-500
const STERILE_GREEN_LIGHT = "#d1fae5"; // emerald-100
const CLINIC_BG = "#f8fafc";        // slate-50

/* ── Bilingual helpers (kept local to the file) ────────────────────────── */
function Bili({
  en,
  kh,
  primaryClass = "",
  secondaryClass = "",
}: {
  en: React.ReactNode;
  kh: React.ReactNode;
  primaryClass?: string;
  secondaryClass?: string;
}) {
  return (
    <span className="inline-flex flex-col leading-tight">
      <span className={primaryClass}>{en}</span>
      <span
        className={`${
          secondaryClass || "text-xs italic text-sky-700/80"
        } font-khmer not-italic leading-loose mt-0.5`}
      >
        {kh}
      </span>
    </span>
  );
}

function BiliPara({
  en,
  kh,
  className = "",
  khmerClass = "",
}: {
  en: React.ReactNode;
  kh: React.ReactNode;
  className?: string;
  khmerClass?: string;
}) {
  return (
    <>
      <p className={className}>{en}</p>
      <p className={`font-khmer leading-loose mt-1 ${khmerClass}`}>{kh}</p>
    </>
  );
}

/* ── Background: faint clinical grid ───────────────────────────────────── */
function ClinicalGridBg() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(2,132,199,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(2,132,199,0.08) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * §1 — The Two Halves of Pharmacology
 * ══════════════════════════════════════════════════════════════════════════ */

const ADME_STEPS: {
  letter: string;
  icon: typeof Droplets;
  en: { name: string; desc: string };
  kh: { name: string; desc: string };
}[] = [
  {
    letter: "A",
    icon: Droplets,
    en: {
      name: "Absorption",
      desc: "How the drug enters the bloodstream — through the stomach, the lungs, the skin, or directly into a vein.",
    },
    kh: {
      name: "ការស្រូបយក",
      desc: "របៀបដែលថ្នាំចូលទៅក្នុងចរន្តឈាម — តាមរយៈក្រពះ សួត ស្បែក ឬដោយផ្ទាល់ចូលទៅក្នុងសរសៃឈាម។",
    },
  },
  {
    letter: "D",
    icon: Wind,
    en: {
      name: "Distribution",
      desc: "How the drug travels through the blood to reach the right tissue or organ — the brain, the heart, an infected joint.",
    },
    kh: {
      name: "ការចែកចាយ",
      desc: "របៀបដែលថ្នាំធ្វើដំណើរតាមឈាមដើម្បីទៅដល់ជាលិកា ឬសរីរាង្គត្រឹមត្រូវ — ខួរក្បាល បេះដូង ឬសន្លាក់ដែលឆ្លង។",
    },
  },
  {
    letter: "M",
    icon: Beaker,
    en: {
      name: "Metabolism",
      desc: "How the body — mostly the liver — chemically changes the drug, breaking it into smaller pieces it can use or remove.",
    },
    kh: {
      name: "ការរំលាយ",
      desc: "របៀបដែលរាងកាយ — ជាសំខាន់ថ្លើម — ផ្លាស់ប្ដូរថ្នាំខាងគីមី បំបែកវាជាបំណែកតូចៗដែលអាចប្រើ ឬដក​ចេញ។",
    },
  },
  {
    letter: "E",
    icon: Recycle,
    en: {
      name: "Excretion",
      desc: "How the drug finally leaves the body — mostly through the kidneys as urine, but also via sweat, breath, and stool.",
    },
    kh: {
      name: "ការបញ្ចេញ",
      desc: "របៀបដែលថ្នាំចេញពីរាងកាយចុងក្រោយ — ភាគច្រើនតាមតម្រងនោមជាទឹកនោម ប៉ុន្តែក៏តាមញើស ដង្ហើម និងលាមកផងដែរ។",
    },
  },
];

function PharmacokineticsCard() {
  return (
    <article
      className="rounded-2xl bg-white border-2 shadow-md p-5 sm:p-6 flex flex-col"
      style={{ borderColor: MED_BLUE_LIGHT }}
      data-testid="card-pharmacokinetics"
    >
      <header className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl text-white flex items-center justify-center shadow-sm"
          style={{ background: `linear-gradient(135deg, ${MED_BLUE_DARK}, ${MED_BLUE})` }}
        >
          <Activity className="w-5 h-5" aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <Bili
            en={<span>Pharmacokinetics</span>}
            kh={<span>ឱសថចលនសាស្ត្រ</span>}
            primaryClass="font-display text-lg sm:text-xl font-bold text-sky-950"
            secondaryClass="text-sm text-sky-800/85 italic"
          />
        </div>
      </header>

      <div
        className="rounded-lg px-3 py-2 mb-4 text-center"
        style={{ background: MED_BLUE_LIGHT, color: MED_BLUE_DARK }}
      >
        <p className="text-sm font-bold">
          What the body does to the drug.
        </p>
        <p className="font-khmer text-sm leading-loose mt-0.5">
          អ្វីដែលរាងកាយធ្វើចំពោះថ្នាំ។
        </p>
      </div>

      <ul className="space-y-3" aria-label="ADME steps">
        {ADME_STEPS.map((s) => {
          const Icon = s.icon;
          return (
            <li
              key={s.letter}
              className="flex items-start gap-3 rounded-lg p-3 border bg-sky-50/40"
              style={{ borderColor: "#bae6fd" /* sky-200 */ }}
            >
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg text-white flex items-center justify-center font-display font-extrabold text-sm shadow-sm"
                style={{ background: MED_BLUE }}
                aria-hidden
              >
                {s.letter}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <Icon className="w-4 h-4" style={{ color: MED_BLUE_DARK }} aria-hidden />
                  <Bili
                    en={<span>{s.en.name}</span>}
                    kh={<span>{s.kh.name}</span>}
                    primaryClass="font-semibold text-sky-950"
                    secondaryClass="text-xs italic text-sky-800/80"
                  />
                </div>
                <BiliPara
                  en={s.en.desc}
                  kh={s.kh.desc}
                  className="text-sm text-slate-700"
                  khmerClass="text-sm text-slate-700"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function PharmacodynamicsCard() {
  return (
    <article
      className="rounded-2xl bg-white border-2 shadow-md p-5 sm:p-6 flex flex-col"
      style={{ borderColor: STERILE_GREEN_LIGHT }}
      data-testid="card-pharmacodynamics"
    >
      <header className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl text-white flex items-center justify-center shadow-sm"
          style={{ background: `linear-gradient(135deg, ${STERILE_GREEN_DARK}, ${STERILE_GREEN})` }}
        >
          <Target className="w-5 h-5" aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <Bili
            en={<span>Pharmacodynamics</span>}
            kh={<span>ឱសថរលកសាស្ត្រ</span>}
            primaryClass="font-display text-lg sm:text-xl font-bold text-emerald-950"
            secondaryClass="text-sm text-emerald-800/85 italic"
          />
        </div>
      </header>

      <div
        className="rounded-lg px-3 py-2 mb-4 text-center"
        style={{ background: STERILE_GREEN_LIGHT, color: STERILE_GREEN_DARK }}
      >
        <p className="text-sm font-bold">What the drug does to the body.</p>
        <p className="font-khmer text-sm leading-loose mt-0.5">
          អ្វីដែលថ្នាំធ្វើចំពោះរាងកាយ។
        </p>
      </div>

      {/* Lock-and-Key SVG illustration */}
      <div
        className="rounded-lg border bg-emerald-50/40 p-4 mb-4"
        style={{ borderColor: "#a7f3d0" /* emerald-200 */ }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <svg
            viewBox="0 0 240 110"
            className="w-full max-w-xs"
            role="img"
            aria-label="Drug (key) fitting into a cell receptor (lock)"
          >
            {/* Receptor (lock) — half-circle on right */}
            <path
              d="M 200 15 a 40 40 0 0 1 0 80 L 200 65 L 160 65 L 160 45 L 200 45 Z"
              fill="#10b981"
              opacity="0.85"
            />
            <text
              x="210"
              y="60"
              fontSize="9"
              fill="white"
              fontWeight="700"
              textAnchor="middle"
            >
              CELL
            </text>
            {/* Drug (key) — on left, fits into the receptor notch */}
            <rect x="20" y="46" width="120" height="18" rx="4" fill="#0284c7" />
            <circle cx="20" cy="55" r="14" fill="#0284c7" />
            <circle cx="20" cy="55" r="5" fill="white" />
            <rect x="120" y="40" width="6" height="6" fill="#0284c7" />
            <rect x="130" y="40" width="6" height="6" fill="#0284c7" />
            <text x="65" y="59" fontSize="9" fill="white" fontWeight="700">
              DRUG
            </text>
          </svg>
        </div>
        <BiliPara
          en="A drug acts like a key, and the cell's receptor is the lock. When the right key fits the right lock, it tells the cell to do something — kill a bacterium, ease pain, slow a heartbeat, lower blood pressure."
          kh="ថ្នាំធ្វើដូចជាកូនសោ ហើយឧបករណ៍ទទួលរបស់កោសិកាគឺជាសោ។ នៅពេលកូនសោត្រឹមត្រូវចូលទៅក្នុងសោត្រឹមត្រូវ វាប្រាប់កោសិកាឱ្យធ្វើអ្វីមួយ — សម្លាប់បាក់តេរី បំបាត់ការឈឺ បន្ថយចង្វាក់បេះដូង ឬបន្ថយសម្ពាធឈាម។"
          className="text-sm text-slate-700"
          khmerClass="text-sm text-slate-700"
        />
      </div>

      {/* Three example outcomes */}
      <ul className="space-y-2" aria-label="Examples of receptor effects">
        {[
          {
            en: { label: "Right key, right lock", desc: "The drug works as intended — the desired therapeutic effect." },
            kh: { label: "កូនសោត្រឹមត្រូវ សោត្រឹមត្រូវ", desc: "ថ្នាំដំណើរការដូចបំណង — ផលប្រយោជន៍ព្យាបាលដែលចង់បាន។" },
            color: STERILE_GREEN,
          },
          {
            en: { label: "Wrong key", desc: "Nothing happens — the drug cannot bind to that receptor." },
            kh: { label: "កូនសោខុស", desc: "មិនមានអ្វីកើតឡើងទេ — ថ្នាំមិនអាចភ្ជាប់ទៅឧបករណ៍ទទួលនោះទេ។" },
            color: "#94a3b8",
          },
          {
            en: { label: "Right key, wrong lock", desc: "A side effect — the drug binds where it was not meant to and the body reacts." },
            kh: { label: "កូនសោត្រឹមត្រូវ សោខុស", desc: "ផលប៉ះពាល់ — ថ្នាំភ្ជាប់នៅកន្លែងដែលវាមិនគួរ ហើយរាងកាយមានប្រតិកម្ម។" },
            color: "#f59e0b",
          },
        ].map((row, i) => (
          <li
            key={i}
            className="flex items-start gap-2 rounded-md px-3 py-2 border"
            style={{ borderColor: "#d1fae5", background: "#f0fdf4" }}
          >
            <span
              className="mt-1 flex-shrink-0 w-2.5 h-2.5 rounded-full"
              style={{ background: row.color }}
              aria-hidden
            />
            <div className="flex-1 min-w-0">
              <Bili
                en={<span className="font-semibold">{row.en.label}</span>}
                kh={<span className="font-semibold">{row.kh.label}</span>}
                primaryClass="text-sm text-emerald-950"
                secondaryClass="text-xs italic text-emerald-800/80"
              />
              <BiliPara
                en={row.en.desc}
                kh={row.kh.desc}
                className="text-sm text-slate-700 mt-0.5"
                khmerClass="text-sm text-slate-700"
              />
            </div>
          </li>
        ))}
      </ul>

    </article>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * §2 — The Pathway to Becoming a Pharmacist
 * ══════════════════════════════════════════════════════════════════════════ */

const ROADMAP_STEPS: {
  n: number;
  icon: typeof School;
  en: { title: string; sub: string; body: string; chip: string };
  kh: { title: string; sub: string; body: string; chip: string };
  accent: string;
}[] = [
  {
    n: 1,
    icon: School,
    accent: MED_BLUE,
    en: {
      title: "High School",
      sub: "Build the foundation",
      body: "Focus heavily on Chemistry, Biology, and Mathematics. Strong grades in these subjects are essential for university admission into a pharmacy program.",
      chip: "≈ Grade 10–12",
    },
    kh: {
      title: "វិទ្យាល័យ",
      sub: "បង្កើតគ្រឹះ",
      body: "ផ្ដោតយ៉ាងខ្លាំងលើគីមីវិទ្យា ជីវវិទ្យា និងគណិតវិទ្យា។ ពិន្ទុល្អនៅក្នុងមុខវិជ្ជាទាំងនេះគឺចាំបាច់សម្រាប់ការចូលរៀននៅសាកលវិទ្យាល័យក្នុងកម្មវិធីឱសថសាស្ត្រ។",
      chip: "≈ ថ្នាក់ទី១០–១២",
    },
  },
  {
    n: 2,
    icon: GraduationCap,
    accent: STERILE_GREEN_DARK,
    en: {
      title: "University",
      sub: "Bachelor of Pharmacy (BPharm)",
      body: "In Cambodia this is an intensive 5-year degree combining classroom study (anatomy, physiology, biochemistry, pharmacology, toxicology) with hands-on laboratory work in formulation and quality control.",
      chip: "5 years",
    },
    kh: {
      title: "សាកលវិទ្យាល័យ",
      sub: "បរិញ្ញាបត្រឱសថសាស្ត្រ (BPharm)",
      body: "នៅប្រទេសកម្ពុជា នេះគឺជាបរិញ្ញាបត្រ ៥ ឆ្នាំដ៏ខ្លាំងក្លា ដែលបញ្ចូលគ្នារវាងការសិក្សាក្នុងថ្នាក់ (កាយវិភាគវិទ្យា សរីរវិទ្យា ជីវគីមី ឱសថសាស្ត្រ ជាតិពុល) ជាមួយនឹងការអនុវត្តន៍ផ្ទាល់ក្នុងបន្ទប់ពិសោធន៍លើការបង្កើតថ្នាំ និងការត្រួតពិនិត្យគុណភាព។",
      chip: "៥ ឆ្នាំ",
    },
  },
  {
    n: 3,
    icon: Stethoscope,
    accent: "#0e7490", // cyan-700
    en: {
      title: "Clinical Internship",
      sub: "Real-world practice",
      body: "Work under the supervision of experienced pharmacists in hospitals or community pharmacies. Counsel patients, dispense prescriptions, manage stock, and learn to spot dangerous drug interactions before they reach a patient.",
      chip: "Hospital · Community",
    },
    kh: {
      title: "ការចុះកម្មសិក្សា",
      sub: "បទពិសោធន៍ក្នុងពិភពពិត",
      body: "ធ្វើការក្រោមការគ្រប់គ្រងរបស់ឱសថការីដែលមានបទពិសោធន៍នៅក្នុងមន្ទីរពេទ្យ ឬឱសថស្ថានសហគមន៍។ ផ្ដល់ប្រឹក្សាដល់អ្នកជំងឺ ចែកចាយវេជ្ជបញ្ជា គ្រប់គ្រងស្តុក និងរៀនកត់សម្គាល់ការប្រតិកម្មគ្រោះថ្នាក់រវាងថ្នាំមុនពេលវាដល់អ្នកជំងឺ។",
      chip: "មន្ទីរពេទ្យ · សហគមន៍",
    },
  },
  {
    n: 4,
    icon: Award,
    accent: "#9333ea", // purple-600
    en: {
      title: "Licensing & Career",
      sub: "Become a licensed pharmacist",
      body: "Pass the national licensing exams. From there you can work in a hospital, own and run a community pharmacy, work in medicine manufacturing, do research, or teach the next generation of pharmacists.",
      chip: "National Exam → License",
    },
    kh: {
      title: "អាជ្ញាប័ណ្ណ និងអាជីព",
      sub: "ក្លាយជាឱសថការីមានអាជ្ញាប័ណ្ណ",
      body: "ប្រឡងជាប់ការប្រឡងអាជ្ញាប័ណ្ណថ្នាក់ជាតិ។ ពីទីនោះ អ្នកអាចធ្វើការនៅមន្ទីរពេទ្យ មានឱសថស្ថានសហគមន៍ផ្ទាល់ខ្លួន ធ្វើការនៅរោងចក្រផលិតថ្នាំ ធ្វើការស្រាវជ្រាវ ឬបង្រៀនឱសថការីជំនាន់ក្រោយ។",
      chip: "ការប្រឡងជាតិ → អាជ្ញាប័ណ្ណ",
    },
  },
];

function RoadmapStep({
  step,
  isLast,
}: {
  step: (typeof ROADMAP_STEPS)[number];
  isLast: boolean;
}) {
  const Icon = step.icon;
  return (
    <li className="relative pl-16 sm:pl-20 pb-8 last:pb-0" data-testid={`roadmap-step-${step.n}`}>
      {/* Connector line */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-6 sm:left-8 top-12 bottom-0 w-0.5"
          style={{ background: `linear-gradient(to bottom, ${step.accent}, #cbd5e1)` }}
        />
      )}

      {/* Numbered medallion */}
      <span
        className="absolute left-0 top-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full text-white flex items-center justify-center shadow-md ring-4 ring-white"
        style={{ background: `linear-gradient(135deg, ${step.accent}, ${step.accent}cc)` }}
        aria-hidden
      >
        <span className="font-display text-lg sm:text-2xl font-extrabold">{step.n}</span>
      </span>

      <div
        className="rounded-2xl bg-white border shadow-sm p-4 sm:p-5"
        style={{ borderColor: "#e2e8f0" /* slate-200 */ }}
      >
        <header className="flex items-start gap-3 mb-2">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${step.accent}1a`, color: step.accent }}
          >
            <Icon className="w-5 h-5" aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <Bili
              en={<span>{step.en.title}</span>}
              kh={<span>{step.kh.title}</span>}
              primaryClass="font-display text-base sm:text-lg font-bold text-slate-900"
              secondaryClass="text-xs italic text-slate-700/80"
            />
            <p className="text-xs text-slate-500 mt-1">
              <span>{step.en.sub}</span>
              <span aria-hidden className="mx-1.5 opacity-50">·</span>
              <span className="font-khmer">{step.kh.sub}</span>
            </p>
          </div>
          <span
            className="flex-shrink-0 text-[11px] font-semibold rounded-full px-2.5 py-1 hidden sm:inline-flex items-center gap-1.5"
            style={{ background: `${step.accent}14`, color: step.accent }}
          >
            <span>{step.en.chip}</span>
            <span aria-hidden className="opacity-50">·</span>
            <span className="font-khmer">{step.kh.chip}</span>
          </span>
        </header>

        <BiliPara
          en={step.en.body}
          kh={step.kh.body}
          className="text-sm text-slate-700"
          khmerClass="text-sm text-slate-700"
        />

        <div className="mt-2 sm:hidden">
          <span
            className="text-[11px] font-semibold rounded-full px-2.5 py-1 inline-flex items-center gap-1.5"
            style={{ background: `${step.accent}14`, color: step.accent }}
          >
            <span>{step.en.chip}</span>
            <span aria-hidden className="opacity-50">·</span>
            <span className="font-khmer">{step.kh.chip}</span>
          </span>
        </div>
      </div>
    </li>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * Page
 * ══════════════════════════════════════════════════════════════════════════ */

export function PharmacologyPage() {
  return (
    <div className="min-h-screen relative" style={{ background: CLINIC_BG }}>
      <ClinicalGridBg />

      <div className="relative max-w-5xl mx-auto px-4 py-8">
        {/* Back link (bilingual) */}
        <Link
          href="/science"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-800 hover:text-sky-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scientific Literacy</span>
          <span aria-hidden className="opacity-50">·</span>
          <span className="font-khmer">ត្រឡប់ទៅ វិទ្យាសាស្ត្រ</span>
        </Link>

        {/* Page hero */}
        <header className="rounded-3xl bg-white border-2 shadow-md p-6 sm:p-8 mb-8 relative overflow-hidden"
          style={{ borderColor: MED_BLUE_LIGHT }}>
          <div
            aria-hidden
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${STERILE_GREEN}, transparent 65%)` }}
          />
          <div
            aria-hidden
            className="absolute -bottom-16 -left-12 w-56 h-56 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${MED_BLUE}, transparent 65%)` }}
          />
          <div className="relative flex items-start gap-4">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-md"
              style={{ background: `linear-gradient(135deg, ${MED_BLUE_DARK}, ${STERILE_GREEN_DARK})` }}
            >
              <Pill className="w-7 h-7" aria-hidden />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-sky-950 leading-tight">
                Pharmacology: The Science of Medicine
              </h1>
              <p className="font-khmer text-base sm:text-lg text-emerald-900/90 leading-loose mt-1">
                ឱសថសាស្ត្រ៖ វិទ្យាសាស្ត្រនៃថ្នាំពេទ្យ
              </p>
              <BiliPara
                en="How drugs actually work inside the human body — and the educational pathway to becoming a licensed pharmacist in Cambodia."
                kh="របៀបដែលថ្នាំដំណើរការពិតប្រាកដនៅក្នុងរាងកាយមនុស្ស — និងផ្លូវការអប់រំឆ្ពោះទៅកាន់ឱសថការីមានអាជ្ញាប័ណ្ណនៅប្រទេសកម្ពុជា។"
                className="text-sm text-slate-600 mt-3 max-w-2xl"
                khmerClass="text-sm text-slate-600 max-w-2xl"
              />
            </div>
          </div>
        </header>

        {/* §1 The Two Halves */}
        <section className="mb-10" aria-labelledby="sec-two-halves">
          <div className="flex items-center gap-2 mb-4">
            <Microscope className="w-5 h-5" style={{ color: MED_BLUE_DARK }} aria-hidden />
            <h2
              id="sec-two-halves"
              className="font-display text-xl sm:text-2xl font-bold text-sky-950"
            >
              §1 · The Two Halves of Pharmacology
            </h2>
          </div>
          <p className="font-khmer text-base text-emerald-900/85 leading-loose mb-5">
            §១ · ផ្នែកទាំងពីរនៃឱសថសាស្ត្រ
          </p>

          <BiliPara
            en="To understand any medicine, scientists ask two complementary questions. The answers are studied as two distinct fields:"
            kh="ដើម្បីយល់ពីថ្នាំណាមួយ អ្នកវិទ្យាសាស្ត្រសួរសំណួរបំពេញគ្នាពីរ។ ចម្លើយត្រូវបានសិក្សាជាវិស័យដាច់ដោយឡែកពីរ៖"
            className="text-sm text-slate-700 mb-5"
            khmerClass="text-sm text-slate-700"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <PharmacokineticsCard />
            <PharmacodynamicsCard />
          </div>

          {/* Mnemonic callout */}
          <div
            className="mt-5 rounded-xl border-2 p-4 flex items-start gap-3"
            style={{ borderColor: STERILE_GREEN_LIGHT, background: "#ecfeff" }}
          >
            <Sparkles className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: STERILE_GREEN_DARK }} aria-hidden />
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-950">
                Quick way to remember:
                <span className="ml-1.5 italic font-normal text-slate-700">
                  kinetics = body acts on drug · dynamics = drug acts on body.
                </span>
              </p>
              <p className="font-khmer text-sm text-emerald-950 leading-loose mt-1">
                <span className="font-semibold">វិធីងាយចង់ចាំ៖</span>{" "}
                <span className="italic">
                  ចលនសាស្ត្រ = រាងកាយធ្វើលើថ្នាំ · រលកសាស្ត្រ = ថ្នាំធ្វើលើរាងកាយ។
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* §2 Roadmap */}
        <section className="mb-10" aria-labelledby="sec-roadmap">
          <div className="flex items-center gap-2 mb-4">
            <HeartPulse className="w-5 h-5" style={{ color: STERILE_GREEN_DARK }} aria-hidden />
            <h2
              id="sec-roadmap"
              className="font-display text-xl sm:text-2xl font-bold text-emerald-950"
            >
              §2 · The Pathway to Becoming a Pharmacist
            </h2>
          </div>
          <p className="font-khmer text-base text-emerald-900/85 leading-loose mb-5">
            §២ · ផ្លូវឆ្ពោះទៅកាន់អាជីពជាឱសថការី
          </p>

          <ol className="relative" aria-label="Pharmacist career roadmap">
            {ROADMAP_STEPS.map((step, i) => (
              <RoadmapStep key={step.n} step={step} isLast={i === ROADMAP_STEPS.length - 1} />
            ))}
          </ol>
        </section>

        {/* §3 Pharmacy Schools Directory */}
        <PharmacyDirectory />

        {/* Closing banner */}
        <div
          className="rounded-2xl p-5 sm:p-6 text-center border-2"
          style={{
            background: "linear-gradient(135deg, #ecfeff, #f0fdf4)",
            borderColor: STERILE_GREEN_LIGHT,
          }}
        >
          <CheckCircle2
            className="w-9 h-9 mx-auto mb-2"
            style={{ color: STERILE_GREEN_DARK }}
            aria-hidden
          />
          <h3 className="font-display text-base sm:text-lg font-bold text-emerald-950">
            Pharmacy is where chemistry meets compassion.
          </h3>
          <p className="font-khmer text-sm sm:text-base text-emerald-900 leading-loose mt-1">
            ឱសថសាស្ត្រ គឺជាកន្លែងដែលគីមីវិទ្យាជួបនឹងសេចក្ដីមេត្តា។
          </p>
        </div>
      </div>
    </div>
  );
}

export default PharmacologyPage;
