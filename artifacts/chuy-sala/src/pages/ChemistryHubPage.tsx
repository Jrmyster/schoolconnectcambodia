import { Link } from "wouter";
import {
  Atom,
  FlaskConical,
  Microscope,
  Sparkles,
  ArrowRight,
  Hexagon,
  Gem,
  Sigma,
  FlaskRound,
  Dna,
  Flame,
  Factory,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { ChemistryUnitConverter } from "@/components/widgets/ChemistryUnitConverter";
import { MolarMassLookup } from "@/components/widgets/MolarMassLookup";
import { EquationBalancer } from "@/components/widgets/EquationBalancer";
import { PeriodicTable } from "@/components/widgets/PeriodicTable";

type Module = {
  href: string;
  number: string;
  titleEn: string;
  titleKh: string;
  blurbEn: string;
  blurbKh: string;
  topicsEn: string[];
  topicsKh: string[];
  icon: React.ComponentType<{ className?: string }>;
  accent: {
    bgFrom: string;
    bgTo: string;
    border: string;
    chip: string;
    iconBg: string;
    btn: string;
    btnHover: string;
    title: string;
  };
};

const MODULES: Module[] = [
  {
    href: "/chemistry/building-blocks",
    number: "01",
    titleEn: "The Atom",
    titleKh: "អាតូម",
    blurbEn:
      "The building blocks of the universe. Meet the nucleus, protons, neutrons, and electrons.",
    blurbKh:
      "ប្លុកសំណង់នៃសកលលោក។ ស្គាល់ស្នូលអាតូម ប្រូតុង ណឺត្រុង និងអេឡិចត្រុង។",
    topicsEn: ["Nucleus", "Protons", "Neutrons", "Electrons"],
    topicsKh: ["ស្នូលអាតូម", "ប្រូតុង", "ណឺត្រុង", "អេឡិចត្រុង"],
    icon: Atom,
    accent: {
      bgFrom: "from-sky-50",
      bgTo: "to-blue-50",
      border: "border-sky-200",
      chip: "bg-sky-100 text-sky-800",
      iconBg: "bg-sky-600",
      btn: "bg-sky-600",
      btnHover: "hover:bg-sky-700",
      title: "text-sky-900",
    },
  },
  {
    href: "/chemistry/reactions-math",
    number: "02",
    titleEn: "Chemical Reactions & Math",
    titleKh: "ប្រតិកម្មគីមី និងគណិតវិទ្យា",
    blurbEn:
      "How atoms bond, how to balance equations, plus an interactive molecular-weight calculator and a pH scale.",
    blurbKh:
      "របៀបអាតូមភ្ជាប់គ្នា របៀបធ្វើឱ្យស្មើនូវសមីការ ព្រមទាំងម៉ាស៊ីនគណនាម៉ាសម៉ូលេគុល និងមាត្រដ្ឋាន pH។",
    topicsEn: ["Bonding", "Stoichiometry", "Calculator", "Acids & Bases"],
    topicsKh: ["ចំណងគីមី", "រូបមន្តតុល្យភាព", "ម៉ាស៊ីនគណនា", "អាស៊ីត និងបាស"],
    icon: FlaskConical,
    accent: {
      bgFrom: "from-emerald-50",
      bgTo: "to-teal-50",
      border: "border-emerald-200",
      chip: "bg-emerald-100 text-emerald-800",
      iconBg: "bg-emerald-600",
      btn: "bg-emerald-600",
      btnHover: "hover:bg-emerald-700",
      title: "text-emerald-900",
    },
  },
  {
    href: "/chemistry/advanced",
    number: "03",
    titleEn: "Advanced Concepts",
    titleKh: "គំនិតកម្រិតខ្ពស់",
    blurbEn:
      "Bird's-eye tours of the major branches of chemistry — perfect before university.",
    blurbKh:
      "ទិដ្ឋភាពទូទៅនៃផ្នែកសំខាន់ៗនៃគីមីវិទ្យា — ល្អឥតខ្ចោះមុនចូលសាកលវិទ្យាល័យ។",
    topicsEn: [
      "Quantum Mechanics",
      "Organic Chemistry",
      "Biochemistry",
      "Physical Chemistry",
      "Inorganic Chemistry",
    ],
    topicsKh: [
      "មេកានិចកង់ទិច",
      "គីមីវិទ្យាសរីរាង្គ",
      "ជីវគីមីវិទ្យា",
      "គីមីវិទ្យារូប",
      "គីមីវិទ្យាអសរីរាង្គ",
    ],
    icon: Microscope,
    accent: {
      bgFrom: "from-violet-50",
      bgTo: "to-purple-50",
      border: "border-violet-200",
      chip: "bg-violet-100 text-violet-800",
      iconBg: "bg-violet-600",
      btn: "bg-violet-600",
      btnHover: "hover:bg-violet-700",
      title: "text-violet-900",
    },
  },
  {
    href: "/chemistry/organic-101",
    number: "05",
    titleEn: "Organic Chemistry 101",
    titleKh: "គីមីសរីរាង្គមូលដ្ឋាន",
    blurbEn:
      "The chemistry of carbon — from the Rule of 4 to a 3D molecule viewer you can spin with your finger.",
    blurbKh:
      "គីមីវិទ្យានៃកាបូន — ចាប់ពីច្បាប់នៃ ៤ ដល់កម្មវិធីបង្ហាញម៉ូលេគុល ៣D ដែលអ្នកអាចបង្វិលដោយម្រាមដៃ។",
    topicsEn: ["Carbon & Bonds", "Methane · Ethanol · Glucose", "3D Viewer", "Plastics & Medicine"],
    topicsKh: ["កាបូន & ចំណង", "មេតាន · អេតាណុល · គ្លុយកូស", "កម្មវិធីបង្ហាញ ៣D", "ប្លាស្ទិក & ឱសថ"],
    icon: Hexagon,
    accent: {
      bgFrom: "from-teal-50",
      bgTo: "to-cyan-50",
      border: "border-teal-200",
      chip: "bg-teal-100 text-teal-800",
      iconBg: "bg-teal-600",
      btn: "bg-teal-600",
      btnHover: "hover:bg-teal-700",
      title: "text-teal-900",
    },
  },
  {
    href: "/science/chemistry/inorganic",
    number: "06",
    titleEn: "Inorganic Chemistry 101",
    titleKh: "គីមីវិទ្យាអសរីរាង្គ ១០១",
    blurbEn:
      "Metals, alloys, salts, and battery acid — the chemistry of the material world that builds our roads, schools, and farms.",
    blurbKh:
      "លោហៈ លោហៈធាតុផ្សំ អំបិល និងអាស៊ីតថ្ម — គីមីវិទ្យានៃពិភពសម្ភារៈដែលស្ថាបនាផ្លូវ សាលា និងចម្ការរបស់យើង។",
    topicsEn: ["Metals & Alloys", "Salts & Crystals", "Fertilizers", "Battery Acid"],
    topicsKh: ["លោហៈ & លោហៈធាតុផ្សំ", "អំបិល & គ្រីស្តាល់", "ជី", "អាស៊ីតថ្ម"],
    icon: Gem,
    accent: {
      bgFrom: "from-slate-50",
      bgTo: "to-orange-50",
      border: "border-slate-300",
      chip: "bg-slate-200 text-slate-800",
      iconBg: "bg-gradient-to-br from-slate-600 to-orange-700",
      btn: "bg-slate-700",
      btnHover: "hover:bg-slate-800",
      title: "text-slate-900",
    },
  },
  {
    href: "/science/chemistry/physical",
    number: "07",
    titleEn: "Physical Chemistry",
    titleKh: "គីមីរូបវិទ្យា",
    blurbEn:
      "An undergraduate preview — where physics and calculus walk into the chemistry lab to explain why every reaction in the universe behaves the way it does.",
    blurbKh:
      "ការមើលជាមុនថ្នាក់បរិញ្ញាបត្រ — កន្លែងដែលរូបវិទ្យា និងកាល់គុល ចូលមកក្នុងមន្ទីរពិសោធន៍គីមី ដើម្បីពន្យល់ហេតុអ្វីបានជារាល់ប្រតិកម្មក្នុងសកលលោក ប្រព្រឹត្តដូចនេះ។",
    topicsEn: ["Thermodynamics", "Quantum", "Kinetics", "Energy"],
    topicsKh: ["ទែម៉ូឌីណាមិច", "កង់ទិច", "គីនេទិច", "ថាមពល"],
    icon: Sigma,
    accent: {
      bgFrom: "from-emerald-900",
      bgTo: "to-slate-900",
      border: "border-emerald-700",
      chip: "bg-emerald-800 text-emerald-100",
      iconBg: "bg-emerald-700",
      btn: "bg-emerald-700",
      btnHover: "hover:bg-emerald-800",
      title: "text-emerald-50",
    },
  },
  {
    href: "/science/chemistry/haber-bosch",
    number: "07.5",
    titleEn: "The Haber-Bosch Process",
    titleKh: "ដំណើរការ Haber-Bosch",
    blurbEn:
      "The reaction that feeds the world. Watch nitrogen + hydrogen ⇌ ammonia, see Le Chatelier's Principle in action, and learn why 8 billion people are alive today.",
    blurbKh:
      "ប្រតិកម្មដែលចិញ្ចឹមពិភពលោក។ មើលអាសូត + អ៊ីដ្រូសែន ⇌ អាម៉ូញាក់ ឃើញគោលការណ៍របស់ Le Chatelier ដំណើរការ ហើយរៀនថាហេតុអ្វីបានជាមនុស្ស ៨ ពាន់លាននាក់នៅរស់សព្វថ្ងៃ។",
    topicsEn: ["Equilibrium", "Le Chatelier", "Iron Catalyst", "Ammonia · NH₃"],
    topicsKh: ["សមតុល្យ", "Le Chatelier", "កាតាលីករដែក", "អាម៉ូញាក់ · NH₃"],
    icon: Factory,
    accent: {
      bgFrom: "from-slate-50",
      bgTo: "to-emerald-50",
      border: "border-emerald-200",
      chip: "bg-emerald-100 text-emerald-800",
      iconBg: "bg-gradient-to-br from-slate-600 via-sky-600 to-emerald-600",
      btn: "bg-emerald-700",
      btnHover: "hover:bg-emerald-800",
      title: "text-slate-900",
    },
  },
  {
    href: "/science/chemistry/analytical",
    number: "08",
    titleEn: "Analytical Chemistry",
    titleKh: "គីមីវិភាគ និងឧបករណ៍",
    blurbEn:
      "Inside the modern lab — the four machines that can name a single molecule out of trillions: chromatography, mass spec, and NMR.",
    blurbKh:
      "ខាងក្នុងមន្ទីរពិសោធន៍ទំនើប — ឧបករណ៍ដែលអាចស្គាល់ឈ្មោះម៉ូលេគុលមួយ ក្នុងចំណោមរាប់ត្រីលាន៖ ក្រូម៉ាតូក្រាម ម៉ាសស្ប៉ិច និង NMR។",
    topicsEn: ["Chromatography", "Mass Spec", "NMR", "Lab Tech"],
    topicsKh: ["ក្រូម៉ាតូក្រាម", "ម៉ាសស្ប៉ិច", "NMR", "ឧបករណ៍មន្ទីរពិសោធន៍"],
    icon: FlaskRound,
    accent: {
      bgFrom: "from-slate-900",
      bgTo: "to-cyan-950",
      border: "border-cyan-700",
      chip: "bg-cyan-900/60 text-cyan-100",
      iconBg: "bg-gradient-to-br from-slate-700 to-cyan-700",
      btn: "bg-cyan-700",
      btnHover: "hover:bg-cyan-800",
      title: "text-cyan-50",
    },
  },
  {
    href: "/chemistry/real-world",
    number: "04",
    titleEn: "Chemistry in the Real World",
    titleKh: "គីមីវិទ្យាក្នុងពិភពពិត",
    blurbEn:
      "See chemistry in your kitchen, your body, and your community — plus safe experiments to try.",
    blurbKh:
      "ឃើញគីមីវិទ្យានៅក្នុងផ្ទះបាយ ក្នុងរាងកាយ និងសហគមន៍របស់អ្នក — រួមនឹងការពិសោធន៍សុវត្ថិភាពសាកល្បង។",
    topicsEn: [
      "Chemistry in daily life",
      "Cooking & cleaning",
      "Safe experiments for kids",
      "Vinegar + baking soda",
    ],
    topicsKh: [
      "គីមីវិទ្យាក្នុងជីវភាពប្រចាំថ្ងៃ",
      "ការចម្អិន និងការសម្អាត",
      "ការពិសោធន៍សុវត្ថិភាពសម្រាប់កុមារ",
      "ទឹកខ្មេះ + សូដាដុតនំ",
    ],
    icon: Sparkles,
    accent: {
      bgFrom: "from-amber-50",
      bgTo: "to-orange-50",
      border: "border-amber-200",
      chip: "bg-amber-100 text-amber-800",
      iconBg: "bg-amber-600",
      btn: "bg-amber-600",
      btnHover: "hover:bg-amber-700",
      title: "text-amber-900",
    },
  },
  {
    href: "/chemistry/flame-test",
    number: "10",
    titleEn: "The Flame Test — Reading the Colors of Fire",
    titleKh: "ការធ្វើតេស្តអណ្តាតភ្លើង — ការអានពណ៌នៃភ្លើង",
    blurbEn:
      "Why does copper burn blue-green and sodium burn yellow? The quantum jump, ΔE = hν, and a glowing color guide to four famous elements.",
    blurbKh:
      "ហេតុ​អ្វី​បាន​ជា​ទង់ដែង​ឆេះ​ពណ៌​ខៀវ-បៃតង ហើយ​សូដ្យូម​ឆេះ​ពណ៌​លឿង? ការ​លោត​កង់ទិច សមីការ ΔE = hν និង​មគ្គុទ្ទេសក៍​ពណ៌​ភ្លឺ​នៃ​ធាតុ​ល្បីៗ​បួន។",
    topicsEn: ["Quantum Jump", "Photons (ΔE = hν)", "Cu · Na · Sr · K", "Fireworks"],
    topicsKh: ["ការ​លោត​កង់ទិច", "ភូតុង (ΔE = hν)", "Cu · Na · Sr · K", "កាំជ្រួច"],
    icon: Flame,
    accent: {
      bgFrom: "from-slate-900",
      bgTo: "to-slate-950",
      border: "border-amber-500/40",
      chip: "bg-amber-900/60 text-amber-100",
      iconBg: "bg-gradient-to-br from-amber-500 via-rose-500 to-cyan-500",
      btn: "bg-amber-600",
      btnHover: "hover:bg-amber-700",
      title: "text-amber-50",
    },
  },
  {
    href: "/science/chemistry/biochemistry",
    number: "09",
    titleEn: "Biochemistry",
    titleKh: "ជីវគីមីវិទ្យា",
    blurbEn:
      "Explore the chemical code of life. Learn how lifeless atoms combine to build the DNA, proteins, and molecular machines that power the human body and nature.",
    blurbKh:
      "ស្វែងយល់ពីកូដគីមីនៃជីវិត។ រៀនពីរបៀបដែលអាតូមឥតព្រលឹងផ្គុំគ្នាបង្កើត ឌីអិនអេ ប្រូតេអ៊ីន និងម៉ាស៊ីនម៉ូលេគុល ដែលផ្ដល់ថាមពលដល់រាងកាយមនុស្ស និងធម្មជាតិ។",
    topicsEn: ["DNA & RNA", "Proteins", "Enzymes", "Metabolism"],
    topicsKh: ["ឌីអិនអេ & អាអិនអេ", "ប្រូតេអ៊ីន", "អង់ស៊ីម", "មេតាបូលីសែម"],
    icon: Dna,
    accent: {
      bgFrom: "from-emerald-50",
      bgTo: "to-violet-50",
      border: "border-emerald-300",
      chip: "bg-violet-100 text-violet-800",
      iconBg: "bg-gradient-to-br from-emerald-500 via-teal-600 to-violet-600",
      btn: "bg-violet-700",
      btnHover: "hover:bg-violet-800",
      title: "text-emerald-900",
    },
  },
];

export function ChemistryHubPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mb-5 shadow-sm">
            <FlaskConical className="w-8 h-8" />
          </div>
          <h1
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 ${
              kh ? "font-khmer leading-snug" : ""
            }`}
          >
            {t("Chemistry Hub", "មជ្ឈមណ្ឌលគីមីវិទ្យា")}
          </h1>
          <p
            className={`text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Ten learning modules — from the tiniest atom to the chemistry of life itself. Pick where you want to start.",
              "មុខវិជ្ជារៀនដប់ — ចាប់ពីអាតូមតូចបំផុត រហូតដល់គីមីវិទ្យានៃជីវិតផ្ទាល់។ ជ្រើសរើសកន្លែងដែលអ្នកចង់ចាប់ផ្តើម។",
            )}
          </p>
        </div>

        {/* ── Chemistry Toolkit row ─────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6 items-start">
          <ChemistryUnitConverter />
          <MolarMassLookup />
        </div>

        {/* ── Equation Balancer (full width) ────────────────────── */}
        <div className="mb-5 sm:mb-6">
          <EquationBalancer />
        </div>

        {/* ── Interactive Periodic Table (full width) ───────────── */}
        <div className="mb-10 sm:mb-12">
          <PeriodicTable />
        </div>

        {/* ── Module grid ───────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`group block rounded-3xl bg-gradient-to-br ${m.accent.bgFrom} ${m.accent.bgTo} border-2 ${m.accent.border} p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${m.accent.iconBg} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`inline-block text-[10px] font-bold tracking-widest uppercase ${m.accent.title} opacity-70 mb-1 ${
                        kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                      }`}
                    >
                      {t(`Module ${m.number}`, `មុខវិជ្ជា ${m.number}`)}
                    </span>
                    <h2
                      className={`text-lg sm:text-xl font-bold ${m.accent.title} ${
                        kh ? "font-khmer" : ""
                      }`}
                    >
                      {kh ? m.titleKh : m.titleEn}
                    </h2>
                  </div>
                </div>

                <p
                  className={`text-sm text-foreground/80 leading-relaxed mb-4 ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  {kh ? m.blurbKh : m.blurbEn}
                </p>

                <ul className="flex flex-wrap gap-1.5 mb-5" aria-label={kh ? "ប្រធានបទ" : "Topics"}>
                  {(kh ? m.topicsKh : m.topicsEn).map((topic, i) => (
                    <li
                      key={i}
                      className={`inline-block text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full ${m.accent.chip} ${
                        kh ? "font-khmer" : ""
                      }`}
                    >
                      {topic}
                    </li>
                  ))}
                </ul>

                <span
                  className={`inline-flex items-center gap-1.5 text-sm font-bold ${m.accent.title} group-hover:gap-2 transition-all ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Open module", "បើកមុខវិជ្ជា")}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* ── Footer note ───────────────────────────────────────── */}
        <p
          className={`mt-10 text-center text-xs sm:text-sm text-muted-foreground ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "New to chemistry? Start with Module 1 — every other module builds on it.",
            "ទើបនឹងស្គាល់គីមីវិទ្យា? សូមចាប់ផ្តើមជាមួយមុខវិជ្ជាទី ១ — រាល់មុខវិជ្ជាដទៃទៀតស្ថាបនាលើវា។",
          )}
        </p>
      </div>
    </div>
  );
}
