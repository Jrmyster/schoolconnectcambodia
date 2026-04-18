import { Link } from "wouter";
import {
  Atom,
  FlaskConical,
  Microscope,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { ChemistryUnitConverter } from "@/components/widgets/ChemistryUnitConverter";
import { MolarMassLookup } from "@/components/widgets/MolarMassLookup";
import { EquationBalancer } from "@/components/widgets/EquationBalancer";

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
              "Four learning modules — from the tiniest atom to chemistry in your kitchen. Pick where you want to start.",
              "មុខវិជ្ជារៀនបួន — ចាប់ពីអាតូមតូចបំផុត រហូតដល់គីមីវិទ្យានៅក្នុងផ្ទះបាយរបស់អ្នក។ ជ្រើសរើសកន្លែងដែលអ្នកចង់ចាប់ផ្តើម។",
            )}
          </p>
        </div>

        {/* ── Chemistry Toolkit row ─────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6 items-start">
          <ChemistryUnitConverter />
          <MolarMassLookup />
        </div>

        {/* ── Equation Balancer (full width) ────────────────────── */}
        <div className="mb-10 sm:mb-12">
          <EquationBalancer />
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
