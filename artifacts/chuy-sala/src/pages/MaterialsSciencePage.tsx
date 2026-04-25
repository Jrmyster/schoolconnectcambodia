import { useState, useId } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  Hammer,
  Wrench,
  Layers3,
  Cog,
  Atom,
  Droplets,
  Wind,
  Recycle,
  TrendingUp,
  Shield,
  Activity,
  Sparkles,
  Leaf,
  Trash2,
  Flame,
  Lightbulb,
  Bug,
  LifeBuoy,
  PawPrint,
  AlertOctagon,
  Scissors,
  CheckCircle2,
  Filter,
  Sun,
  AlertTriangle,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Workshop / blueprint surface ─────────────────────────────────────────
const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.07) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.07) 1px, transparent 1px), " +
    "linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};
const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

function CornerMarks({ tone = "slate" }: { tone?: "slate" | "cyan" }) {
  const stroke = tone === "cyan" ? "border-cyan-400/60" : "border-slate-400/60";
  return (
    <>
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 ${stroke}`} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────
export function MaterialsSciencePage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}
        </Link>

        {/* ── Header ────────────────────────────────────────────── */}
        <header
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-6 sm:px-10 py-8 sm:py-10 mb-10 shadow-lg"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34, 211, 238, 0.10) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(34, 211, 238, 0.10) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <CornerMarks tone="cyan" />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/60 text-cyan-300 flex items-center justify-center flex-shrink-0">
              <FlaskConical className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-300/80 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>{t("Science", "វិទ្យាសាស្ត្រ")}</span>
                <span className="opacity-50">/</span>
                <span className="text-cyan-200">M-SCI-MAT</span>
              </div>
              <h1
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t(
                  "Materials Science: The Stuff of the World",
                  "វិទ្យាសាស្ត្រសម្ភារៈ៖ សារធាតុនៃពិភពលោក"
                )}
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {t(
                  "Why does copper bend but glass shatter? Why is plastic so hard to get rid of? Meet the three big families of materials, then bend, pull and crush them in the workshop.",
                  "ហេតុអ្វីបានជាស្ពាន់អាចបត់ប៉ុន្តែកញ្ចក់បែក? ហេតុអ្វីបានជាប្លាស្ទិកលំបាកបំបាត់? ស្គាល់ក្រុមធំទាំងបីនៃសម្ភារៈ បន្ទាប់មកបត់ ទាញ និងសង្កត់វានៅក្នុងសិក្ខាសាលា។"
                )}
              </p>
            </div>
          </div>
        </header>

        {/* ── 1. The Big Three ────────────────────────────────── */}
        <div id="big-three" className="scroll-mt-24" />
        <SectionTitle
          en="The 'Big Three' material families"
          kh="ក្រុមធំទាំងបីនៃសម្ភារៈ"
          numberLabel="01"
          icon={Layers3}
        />
        <p className={`text-sm sm:text-base text-slate-700 leading-relaxed mb-5 max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Tap a card to inspect its lab profile — what it's good at, where it fails, and where you'll find it in everyday Cambodian life.",
            "ចុចលើកាតមួយដើម្បីពិនិត្យព័ត៌មានរបស់វា — អ្វីដែលវាល្អ កន្លែងដែលវាបរាជ័យ និងកន្លែងដែលអ្នកនឹងឃើញវានៅក្នុងជីវភាពប្រចាំថ្ងៃនៅកម្ពុជា។"
          )}
        </p>
        <BigThreeGrid kh={kh} t={t} />

        {/* ── 2. Stress Test flashcards ───────────────────────── */}
        <div id="stress-test" className="scroll-mt-24" />
        <SectionTitle
          en="The 'Stress Test' — engineering vocabulary"
          kh="ការសាកល្បងស្ត្រេស — វាក្យសព្ទវិស្វកម្ម"
          numberLabel="02"
          icon={Activity}
        />
        <p className={`text-sm sm:text-base text-slate-700 leading-relaxed mb-5 max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "Engineers don't just say 'strong' — they say strong how. Flip a card to learn the vocabulary, then read the live stress–strain graph below.",
            "វិស្វករមិននិយាយត្រឹមតែ 'រឹងមាំ' ទេ — ពួកគេនិយាយថា រឹងមាំយ៉ាងម៉េច។ បង្វិលកាតមួយដើម្បីរៀនវាក្យសព្ទ បន្ទាប់មកអានក្រាហ្វស្ត្រេស–បន្ទះផ្ទាល់ខាងក្រោម។"
          )}
        </p>
        <StressFlashcards kh={kh} t={t} />

        <div className="mt-8 mb-10">
          <StressStrainCurve kh={kh} t={t} />
        </div>

        {/* ── 3. Lifecycle: Glass vs Plastic ──────────────────── */}
        <div id="lifecycle" className="scroll-mt-24" />
        <SectionTitle
          en="Lifecycle — glass vs. plastic"
          kh="វដ្តជីវិត — កញ្ចក់ ប្រឆាំងនឹង ប្លាស្ទិក"
          numberLabel="03"
          icon={Recycle}
        />
        <LifecycleCompare kh={kh} t={t} />

        <UpcyclingCallout kh={kh} t={t} />

        {/* ── 4. Waste Upcycling: Frugal Engineering ──────────── */}
        <div id="upcycling" className="mt-12 scroll-mt-24">
          <SectionTitle
            en="Waste Upcycling: Frugal Engineering"
            kh="ការកែច្នៃកាកសំណល់៖ វិស្វកម្មសន្សំសំចៃ"
            numberLabel="04"
            icon={Leaf}
          />
          <p className={`text-sm sm:text-base text-slate-700 leading-relaxed mb-6 max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "An empty PET bottle is not garbage — it is a free, weatherproof, perfectly engineered building block. In this workshop we look at why we should never burn it, what makes it useful, and three projects you can build today.",
              "ដបប្លាស្ទិក PET ទទេមួយមិនមែនជាសំរាមទេ — វាគឺជាសម្ភារៈសំណង់ឥតគិតថ្លៃ ដែលធន់នឹងអាកាសធាតុ និងបានវិស្វកម្មយ៉ាងល្អ។ នៅសិក្ខាសាលានេះ យើងពិនិត្យមើលថា ហេតុអ្វីយើងមិនគួរដុតវា អ្វីដែលធ្វើឱ្យវាមានប្រយោជន៍ និងគម្រោងបីដែលអ្នកអាចសាងសង់ថ្ងៃនេះ។"
            )}
          </p>
          <BurnVsUpcycle kh={kh} t={t} />
          <PetBottleProperties kh={kh} t={t} />
          <BlueprintGallery kh={kh} t={t} />
        </div>

        {/* Featured Deep-Dive: Recycling & Energy */}
        <div className="mt-12">
          <Link
            href="/science/materials/recycling"
            data-testid="link-recycling-module"
            className="group block relative overflow-hidden rounded-2xl bg-white border shadow-sm hover:shadow-md transition-shadow"
            style={{ borderColor: "rgba(21, 128, 61, 0.4)" }}
          >
            {/* corner marks */}
            <span aria-hidden="true" className="pointer-events-none absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-700/60" />
            <span aria-hidden="true" className="pointer-events-none absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-700/60" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-700/60" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-700/60" />

            <div
              className="absolute -top-16 -right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: "rgba(21, 128, 61, 0.12)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 -left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ backgroundColor: "rgba(2, 132, 199, 0.10)" }}
              aria-hidden="true"
            />

            <div className="relative p-6 sm:p-8 grid sm:grid-cols-[auto,1fr,auto] items-center gap-5">
              <div
                className="hidden sm:flex items-center justify-center w-16 h-16 rounded-xl"
                style={{
                  backgroundColor: "rgba(21, 128, 61, 0.12)",
                  border: "1px solid rgba(21, 128, 61, 0.5)",
                  color: "#14532d",
                }}
              >
                <Recycle className="w-8 h-8" />
              </div>
              <div>
                <div
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase mb-2 font-mono ${kh ? "font-khmer tracking-normal normal-case" : ""}`}
                  style={{ color: "#14532d" }}
                >
                  <Sparkles className="w-3 h-3" />
                  {t("Featured Deep-Dive · Recycling & Energy", "សិក្សាស៊ីជម្រៅ · ការកែច្នៃ & ថាមពល")}
                </div>
                <h3
                  className={`font-display font-bold text-xl sm:text-2xl mb-1.5 text-slate-800 ${kh ? "font-khmer leading-loose" : ""}`}
                >
                  {t(
                    "Recycling: The Energy Economics of Trash",
                    "ការកែច្នៃឡើងវិញ៖ សេដ្ឋកិច្ចថាមពលនៃសំរាម",
                  )}
                </h3>
                <p className={`text-sm text-slate-700 max-w-2xl ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  {t(
                    "Why aluminum recycling saves 95% of the energy, how Edjai waste-pickers run Cambodia's recycling network, and the 3-step pathway to starting a recycling business.",
                    "ហេតុអ្វីការកែច្នៃអាលុយមីញ៉ូមសន្សំថាមពល ៩៥% របៀបដែលអេតចាយដំណើរការបណ្ដាញកែច្នៃរបស់កម្ពុជា និងមាគ៌ា ៣ ជំហានឆ្ពោះទៅរកការចាប់ផ្ដើមអាជីវកម្មកែច្នៃ។",
                  )}
                </p>
              </div>
              <div
                className={`flex items-center gap-1.5 group-hover:translate-x-1 transition-transform text-sm font-semibold font-mono uppercase tracking-wider ${kh ? "font-khmer normal-case tracking-normal" : ""}`}
                style={{ color: "#14532d" }}
              >
                <span>{t("Open module", "បើកម៉ូឌុល")}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* footer crumbs */}
        <div className="mt-12 pt-6 border-t border-dashed border-slate-300 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-mono">
          <span className="uppercase tracking-widest">M-SCI-MAT · {t("Sheet 1 / 1", "សន្លឹក ១ / ១")}</span>
          <span className="uppercase tracking-widest">{t("Workshop log · Chouy Sala", "កំណត់ហេតុសិក្ខាសាលា · ជួយសាលា")}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Section title
// ─────────────────────────────────────────────────────────────────────────
function SectionTitle({
  en,
  kh,
  numberLabel,
  icon: Icon,
}: {
  en: string;
  kh: string;
  numberLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-cyan-700 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {language === "kh" ? `ផ្នែក ${numberLabel}` : `Section ${numberLabel}`}
        </div>
        <h2 className={`text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-tight ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h2>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 1. The Big Three
// ─────────────────────────────────────────────────────────────────────────
type FamilyKey = "metals" | "polymers" | "ceramics";

type FamilyDef = {
  key: FamilyKey;
  nameEn: string;
  nameKh: string;
  taglineEn: string;
  taglineKh: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string; // tailwind text/border color
  surface: string; // tailwind background tint
  ring: string; // active ring tone
  propsEn: { label: string; value: number }[]; // 0-100 bar
  propsKh: { label: string; value: number }[];
  goodEn: string[];
  goodKh: string[];
  badEn: string[];
  badKh: string[];
  examplesEn: string;
  examplesKh: string;
};

const FAMILIES: FamilyDef[] = [
  {
    key: "metals",
    nameEn: "Metals",
    nameKh: "លោហៈ",
    taglineEn: "Bend, conduct, and ring like a bell.",
    taglineKh: "បត់ បញ្ជូន និងស្ដាប់ដូចកណ្តឹង។",
    icon: Hammer,
    accent: "text-amber-700 border-amber-400",
    surface: "bg-amber-50",
    ring: "ring-amber-400",
    propsEn: [
      { label: "Conductivity", value: 95 },
      { label: "Malleability", value: 85 },
      { label: "Hardness", value: 70 },
      { label: "Heat resistance", value: 75 },
    ],
    propsKh: [
      { label: "ចំលងអគ្គិសនី", value: 95 },
      { label: "ភាពអាចបត់បាន", value: 85 },
      { label: "ភាពរឹង", value: 70 },
      { label: "ធន់នឹងកំដៅ", value: 75 },
    ],
    goodEn: ["Carries electricity", "Bends without breaking", "Recyclable forever"],
    goodKh: ["ដឹកអគ្គិសនី", "បត់ដោយមិនបាក់", "កែច្នៃឡើងវិញរហូត"],
    badEn: ["Heavy", "Can rust (iron)", "Energy-intensive to refine"],
    badKh: ["ធ្ងន់", "អាចឡើងច្រេះ (ដែក)", "ត្រូវការថាមពលច្រើនដើម្បីចម្រាញ់"],
    examplesEn: "Copper wire in a phone charger · steel rebar in a school · aluminium kettle.",
    examplesKh: "ខ្សែស្ពាន់ក្នុងឆ្នាំងសាកទូរស័ព្ទ · ដែករឹងសាងសង់សាលា · ឆ្នាំងអាលុយមីញ៉ូម។",
  },
  {
    key: "polymers",
    nameEn: "Polymers / Plastics",
    nameKh: "ប៉ូលីមែរ / ប្លាស្ទិក",
    taglineEn: "Long carbon chains — light, flexible, almost immortal.",
    taglineKh: "ខ្សែកាបូនវែង — ស្រាល បត់បែន ស្ទើរតែអមតៈ។",
    icon: Droplets,
    accent: "text-cyan-700 border-cyan-400",
    surface: "bg-cyan-50",
    ring: "ring-cyan-400",
    propsEn: [
      { label: "Flexibility", value: 90 },
      { label: "Chemical resistance", value: 85 },
      { label: "Conductivity", value: 5 },
      { label: "Heat resistance", value: 30 },
    ],
    propsKh: [
      { label: "ភាពបត់បែន", value: 90 },
      { label: "ធន់នឹងគីមី", value: 85 },
      { label: "ចំលងអគ្គិសនី", value: 5 },
      { label: "ធន់នឹងកំដៅ", value: 30 },
    ],
    goodEn: ["Cheap to make", "Doesn't rust or rot", "Easy to mould"],
    goodKh: ["តម្លៃថោកក្នុងការផលិត", "មិនច្រេះ មិនរលួយ", "ងាយរំលាយចាក់ចូលពុម្ព"],
    badEn: ["Hundreds of years to break down", "Can leach chemicals", "Most types burn dirty"],
    badKh: ["ត្រូវចំណាយរាប់រយឆ្នាំទើបបំបែក", "អាចបញ្ចេញសារធាតុគីមី", "ប្រភេទច្រើនឆេះមិនស្អាត"],
    examplesEn: "PVC water pipes · PET drink bottles · plastic chairs at the market.",
    examplesKh: "បំពង់ទឹក PVC · ដបទឹក PET · កៅអីប្លាស្ទិកនៅផ្សារ។",
  },
  {
    key: "ceramics",
    nameEn: "Ceramics & Glass",
    nameKh: "សេរ៉ាមិច និងកញ្ចក់",
    taglineEn: "Hard as stone, smooth as glass — but unforgiving.",
    taglineKh: "រឹងដូចថ្ម រលោងដូចកញ្ចក់ — តែគ្មានការអភ័យទោស។",
    icon: Sparkles,
    accent: "text-slate-700 border-slate-400",
    surface: "bg-slate-50",
    ring: "ring-slate-400",
    propsEn: [
      { label: "Hardness", value: 95 },
      { label: "Heat resistance", value: 90 },
      { label: "Chemical resistance", value: 95 },
      { label: "Toughness (anti-shatter)", value: 15 },
    ],
    propsKh: [
      { label: "ភាពរឹង", value: 95 },
      { label: "ធន់នឹងកំដៅ", value: 90 },
      { label: "ធន់នឹងគីមី", value: 95 },
      { label: "ភាពរឹងម៉ាំ (ប្រឆាំងបែក)", value: 15 },
    ],
    goodEn: ["Withstands huge heat", "Chemically inert", "Long-lasting"],
    goodKh: ["ធន់នឹងកំដៅខ្លាំង", "មិនមានប្រតិកម្មគីមី", "ប្រើបានយូរ"],
    badEn: ["Brittle — shatters on impact", "Heavy", "Hard to shape after firing"],
    badKh: ["ផុយ — បែកពេលប៉ះ", "ធ្ងន់", "លំបាកបង្កើតរូបរាងបន្ទាប់ពីដុត"],
    examplesEn: "Clay roof tiles · cooking pots · car windscreens · phone screen glass.",
    examplesKh: "ក្បឿងដំបូលដី · ឆ្នាំងធ្វើម្ហូប · កញ្ចក់ឡាន · កញ្ចក់អេក្រង់ទូរស័ព្ទ។",
  },
];

function BigThreeGrid({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  const [active, setActive] = useState<FamilyKey>("metals");
  const current = FAMILIES.find((f) => f.key === active)!;
  const props = kh ? current.propsKh : current.propsEn;

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-5">
        {FAMILIES.map((f) => {
          const isActive = active === f.key;
          const Icon = f.icon;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`relative text-left rounded-2xl border-2 p-4 sm:p-5 transition-all overflow-hidden ${
                isActive
                  ? `${f.accent} ${f.surface} ring-4 ring-offset-2 ${f.ring} shadow-md -translate-y-0.5`
                  : "border-slate-300 bg-white hover:border-slate-400 hover:-translate-y-0.5"
              }`}
              aria-pressed={isActive}
            >
              <CornerMarks />
              <div className="relative flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border-2 ${f.accent} bg-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
                    {t("Family", "ក្រុម")}
                  </div>
                  <div className={`font-bold text-slate-900 leading-tight ${kh ? "font-khmer" : ""}`}>
                    {kh ? f.nameKh : f.nameEn}
                  </div>
                  <div className={`text-xs text-slate-600 mt-1 leading-snug ${kh ? "font-khmer leading-relaxed" : ""}`}>
                    {kh ? f.taglineKh : f.taglineEn}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <article className="relative rounded-2xl border-2 border-slate-300 shadow-sm overflow-hidden" style={CARD_BG}>
        <CornerMarks tone="cyan" />
        <div className="relative p-5 sm:p-6 grid md:grid-cols-2 gap-6">
          {/* Properties bars */}
          <div>
            <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Lab profile", "ទម្រង់មន្ទីរពិសោធន៍")}
            </div>
            <h3 className={`text-xl font-bold text-slate-900 mb-4 ${kh ? "font-khmer" : ""}`}>
              {kh ? current.nameKh : current.nameEn}
            </h3>
            <ul className="space-y-2.5" aria-label={t("Material properties", "លក្ខណៈសម្ភារៈ")}>
              {props.map((p) => (
                <li key={p.label}>
                  <div className="flex items-baseline justify-between text-xs mb-1">
                    <span className={`font-semibold text-slate-700 ${kh ? "font-khmer text-[13px]" : ""}`}>{p.label}</span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">{p.value}/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        p.value >= 75 ? "bg-emerald-500" : p.value >= 40 ? "bg-amber-500" : "bg-rose-500"
                      }`}
                      style={{ width: `${p.value}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Pros / cons / examples */}
          <div className="space-y-4">
            <div>
              <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Shield className="w-3 h-3" /> {t("Strengths", "ចំណុចខ្លាំង")}
              </div>
              <ul className="space-y-1">
                {(kh ? current.goodKh : current.goodEn).map((s, i) => (
                  <li key={i} className={`text-sm text-slate-700 flex items-start gap-2 ${kh ? "font-khmer leading-relaxed" : ""}`}>
                    <span className="text-emerald-600 font-bold mt-0.5">+</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-rose-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                <Wind className="w-3 h-3" /> {t("Weaknesses", "ចំណុចខ្សោយ")}
              </div>
              <ul className="space-y-1">
                {(kh ? current.badKh : current.badEn).map((s, i) => (
                  <li key={i} className={`text-sm text-slate-700 flex items-start gap-2 ${kh ? "font-khmer leading-relaxed" : ""}`}>
                    <span className="text-rose-600 font-bold mt-0.5">−</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-dashed border-slate-200 pt-3">
              <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Where you'll see it", "កន្លែងដែលអ្នកនឹងឃើញ")}
              </div>
              <p className={`text-sm text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {kh ? current.examplesKh : current.examplesEn}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 2. Stress test flashcards + curve
// ─────────────────────────────────────────────────────────────────────────
type Card = {
  termEn: string;
  termKh: string;
  shortEn: string;
  shortKh: string;
  longEn: string;
  longKh: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
};
const CARDS: Card[] = [
  {
    termEn: "Tensile Strength",
    termKh: "កម្លាំងទាញ",
    shortEn: "How much you can pull it before it snaps.",
    shortKh: "តើអ្នកអាចទាញវាប៉ុន្មានមុនវាដាច់។",
    longEn: "Pull on both ends. The maximum stress the material handles before breaking is its tensile strength. Steel cables for bridges are chosen for very high tensile strength.",
    longKh: "ទាញសងខាង។ ស្ត្រេសខ្ពស់បំផុតដែលសម្ភារៈអាចទប់បាន មុនពេលបាក់ គឺជាកម្លាំងទាញរបស់វា។ ខ្សែដែកសម្រាប់ស្ពាន ត្រូវបានជ្រើសសម្រាប់កម្លាំងទាញខ្ពស់ខ្លាំង។",
    icon: TrendingUp,
    tone: "text-cyan-700 border-cyan-400",
  },
  {
    termEn: "Compressive Strength",
    termKh: "កម្លាំងសង្កត់",
    shortEn: "How much weight it can hold before it crushes.",
    shortKh: "តើវាអាចទប់ទម្ងន់ប៉ុន្មាន មុនពេលត្រូវកំទេច។",
    longEn: "Push or stack on it. Concrete pillars in a school have huge compressive strength — but they need steel inside for tensile strength.",
    longKh: "សង្កត់ ឬដាក់លើគ្នា។ សសរបេតុងនៅសាលា មានកម្លាំងសង្កត់ដ៏ធំ — តែវាត្រូវការដែកនៅខាងក្នុងសម្រាប់កម្លាំងទាញ។",
    icon: Cog,
    tone: "text-amber-700 border-amber-400",
  },
  {
    termEn: "Brittle vs. Ductile",
    termKh: "ផុយ ប្រឆាំងនឹង បត់បាន",
    shortEn: "Why glass shatters but copper bends.",
    shortKh: "ហេតុអ្វីបានជាកញ្ចក់បែក ប៉ុន្តែស្ពាន់បត់។",
    longEn: "A brittle material (glass, ceramics) snaps with almost no warning — its atoms can't slide. A ductile material (copper, mild steel) stretches first, then necks down — its atomic planes can slip.",
    longKh: "សម្ភារៈផុយ (កញ្ចក់ សេរ៉ាមិច) បាក់ដោយស្ទើរគ្មានព្រមាន — អាតូមរបស់វារអិលមិនបាន។ សម្ភារៈបត់បាន (ស្ពាន់ ដែកទន់) ពង្រីកមុន បន្ទាប់មកស្តើងចុះ — កម្រិតអាតូមរបស់វាអាចរអិល។",
    icon: Atom,
    tone: "text-rose-700 border-rose-400",
  },
];

function StressFlashcards({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    setFlipped((prev) => {
      const n = new Set(prev);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
      {CARDS.map((c, i) => {
        const isFlipped = flipped.has(i);
        const Icon = c.icon;
        return (
          <button
            key={c.termEn}
            onClick={() => toggle(i)}
            className={`relative text-left rounded-2xl border-2 ${c.tone} bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md min-h-[180px] overflow-hidden`}
            aria-pressed={isFlipped}
            aria-label={kh ? c.termKh : c.termEn}
          >
            <CornerMarks />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-9 h-9 rounded-lg border-2 ${c.tone} bg-white flex items-center justify-center`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <h3 className={`font-bold text-slate-900 leading-tight ${kh ? "font-khmer" : ""}`}>
                  {kh ? c.termKh : c.termEn}
                </h3>
              </div>
              <p className={`text-sm text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {isFlipped ? (kh ? c.longKh : c.longEn) : kh ? c.shortKh : c.shortEn}
              </p>
              <div className={`mt-3 inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {isFlipped ? t("Tap to collapse", "ចុចដើម្បីបិទ") : t("Tap to expand", "ចុចដើម្បីបើក")}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// Tensile stress–strain curve with material toggle
type CurveKey = "metal" | "polymer" | "ceramic";
function StressStrainCurve({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  const [mat, setMat] = useState<CurveKey>("metal");

  const curves: Record<
    CurveKey,
    {
      d: string;
      fracture: { x: number; y: number };
      color: string;
      nameEn: string;
      nameKh: string;
      noteEn: string;
      noteKh: string;
    }
  > = {
    metal: {
      d: "M 30 240 L 110 70 C 140 50, 170 50, 200 60 C 230 70, 260 90, 280 120",
      fracture: { x: 280, y: 120 },
      color: "#b45309",
      nameEn: "Ductile metal (e.g. copper, mild steel)",
      nameKh: "លោហៈបត់បាន (ដូចជា ស្ពាន់ ដែកទន់)",
      noteEn: "Climbs steeply (elastic), bends over (yield), then stretches a lot before snapping. Lots of warning.",
      noteKh: "ឡើងខ្ពស់រហ័ស (បត់បែន) កោងទាប (ផ្តល់) បន្ទាប់មកពង្រីកច្រើនមុនបាក់។ មានព្រមានច្រើន។",
    },
    polymer: {
      d: "M 30 240 L 80 170 C 110 130, 140 110, 200 100 C 250 92, 290 110, 310 130",
      fracture: { x: 310, y: 130 },
      color: "#0e7490",
      nameEn: "Polymer (e.g. PET, PVC)",
      nameKh: "ប៉ូលីមែរ (ដូចជា PET, PVC)",
      noteEn: "Lower stiffness, longer stretch. Some plastics 'cold draw' — a thin neck forms and runs along the sample.",
      noteKh: "រឹងតិច ពង្រីកវែង។ ប្លាស្ទិកខ្លះមាន 'ការទាញត្រជាក់' — ក្បាលស្តើងបង្កើតឡើង ហើយរត់តាមបណ្តោយគំរូ។",
    },
    ceramic: {
      d: "M 30 240 L 120 50",
      fracture: { x: 120, y: 50 },
      color: "#475569",
      nameEn: "Ceramic / glass (brittle)",
      nameKh: "សេរ៉ាមិច / កញ្ចក់ (ផុយ)",
      noteEn: "Almost a straight line up — then SNAP, no plastic stretch. Very little warning before failure.",
      noteKh: "ស្ទើរតែជាបន្ទាត់ត្រង់ឡើងលើ — បន្ទាប់មកបាក់ភ្លាម គ្មានការពង្រីក។ ព្រមានតិចតួចមុនបរាជ័យ។",
    },
  };
  const c = curves[mat];

  return (
    <article className="relative rounded-2xl border-2 border-slate-300 shadow-sm overflow-hidden" style={CARD_BG}>
      <CornerMarks tone="cyan" />
      <div className="relative p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Live diagram", "តារាងផ្ទាល់")}
            </div>
            <h3 className={`text-lg font-bold text-slate-900 ${kh ? "font-khmer" : ""}`}>
              {t("Tensile stress–strain curve", "ខ្សែកោងស្ត្រេស–បន្ទះនៃការទាញ")}
            </h3>
          </div>
          <div role="tablist" aria-label={t("Material to plot", "សម្ភារៈដើម្បីគូរ")} className="inline-flex rounded-lg overflow-hidden border-2 border-slate-300">
            {(Object.keys(curves) as CurveKey[]).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={mat === k}
                onClick={() => setMat(k)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  mat === k ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t(
                  k === "metal" ? "Metal" : k === "polymer" ? "Polymer" : "Ceramic",
                  k === "metal" ? "លោហៈ" : k === "polymer" ? "ប៉ូលីមែរ" : "សេរ៉ាមិច"
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-2 sm:p-3">
          <svg viewBox="0 0 360 270" className="w-full h-auto" role="img" aria-label={t("Stress–strain curve", "ខ្សែកោងស្ត្រេស–បន្ទះ")}>
            {/* gridlines */}
            <defs>
              <pattern id="ss-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="30" y="20" width="310" height="220" fill="url(#ss-grid)" />
            {/* axes */}
            <line x1="30" y1="240" x2="340" y2="240" stroke="#0f172a" strokeWidth="1.5" />
            <line x1="30" y1="240" x2="30" y2="20" stroke="#0f172a" strokeWidth="1.5" />
            {/* axis labels */}
            <text x="185" y="260" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#475569">
              {kh ? "បន្ទះ ε" : "Strain ε"}
            </text>
            <text x="14" y="130" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#475569" transform="rotate(-90 14 130)">
              {kh ? "ស្ត្រេស σ" : "Stress σ"}
            </text>
            {/* curve */}
            <path d={c.d} stroke={c.color} strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* fracture endpoint marker (explicit coords for robustness) */}
            <circle cx={c.fracture.x} cy={c.fracture.y} r="5" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
            <text
              x={c.fracture.x + 8}
              y={c.fracture.y + 4}
              fontSize="10"
              fontFamily="monospace"
              fill="#7f1d1d"
              fontWeight="bold"
            >
              {kh ? "បាក់" : "FRACTURE"}
            </text>
          </svg>
        </div>

        <div className="mt-3">
          <div className={`text-sm font-bold text-slate-900 mb-1 ${kh ? "font-khmer" : ""}`}>
            {kh ? c.nameKh : c.nameEn}
          </div>
          <p className={`text-sm text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? c.noteKh : c.noteEn}
          </p>
          <p className={`mt-2 text-[11px] font-mono uppercase tracking-widest text-slate-500 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Illustrative — shape only, not to scale.", "បង្ហាញគំនិត — តែរូបរាង មិនមែនតាមមាត្រដ្ឋានទេ។")}
          </p>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 3. Lifecycle compare + upcycling
// ─────────────────────────────────────────────────────────────────────────
function LifecycleCompare({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  const cols: {
    titleEn: string;
    titleKh: string;
    icon: React.ComponentType<{ className?: string }>;
    tone: string;
    surface: string;
    rows: { labelEn: string; labelKh: string; valEn: string; valKh: string }[];
  }[] = [
    {
      titleEn: "Glass bottle",
      titleKh: "ដបកញ្ចក់",
      icon: Sparkles,
      tone: "text-slate-700 border-slate-400",
      surface: "bg-slate-50",
      rows: [
        { labelEn: "Made from", labelKh: "ផលិតពី", valEn: "Sand + soda + lime, melted at ~1500 °C.", valKh: "ខ្សាច់ + សូដា + កំបោរ រលាយក្នុងសីតុណ្ហភាព ~១៥០០°C។" },
        { labelEn: "If thrown away", labelKh: "បើបោះចោល", valEn: "~1 million years to break down — but it's chemically inert.", valKh: "~១ លានឆ្នាំដើម្បីបំបែក — តែវាមិនមានប្រតិកម្មគីមី។" },
        { labelEn: "Recycling", labelKh: "កែច្នៃឡើងវិញ", valEn: "Melt and re-blow forever, no quality loss.", valKh: "រលាយ និងផ្លុំឡើងវិញរហូត គ្មានបាត់បង់គុណភាព។" },
      ],
    },
    {
      titleEn: "Plastic bottle (PET)",
      titleKh: "ដបប្លាស្ទិក (PET)",
      icon: Droplets,
      tone: "text-cyan-700 border-cyan-400",
      surface: "bg-cyan-50",
      rows: [
        { labelEn: "Made from", labelKh: "ផលិតពី", valEn: "Crude oil → ethylene → polymer chains.", valKh: "ប្រេងឆៅ → អេទីលែន → ខ្សែប៉ូលីមែរ។" },
        { labelEn: "If thrown away", labelKh: "បើបោះចោល", valEn: "~450 years to break down; fragments into microplastics.", valKh: "~៤៥០ ឆ្នាំដើម្បីបំបែក; បំបាក់ជាមីក្រូប្លាស្ទិក។" },
        { labelEn: "Recycling", labelKh: "កែច្នៃឡើងវិញ", valEn: "Quality drops each cycle — but excellent for upcycling.", valKh: "គុណភាពធ្លាក់ចុះក្នុងវដ្តនីមួយៗ — តែល្អសម្រាប់ការកែច្នៃថ្មី។" },
      ],
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-6">
      {cols.map((col) => {
        const Icon = col.icon;
        return (
          <article
            key={col.titleEn}
            className={`relative rounded-2xl border-2 ${col.tone} shadow-sm overflow-hidden`}
            style={CARD_BG}
          >
            <CornerMarks />
            <div className={`relative p-5 sm:p-6`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-xl border-2 ${col.tone} ${col.surface} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className={`text-lg font-bold text-slate-900 ${kh ? "font-khmer" : ""}`}>
                  {kh ? col.titleKh : col.titleEn}
                </h3>
              </div>
              <dl className="space-y-3">
                {col.rows.map((r, i) => (
                  <div key={i} className="border-t border-dashed border-slate-200 pt-2">
                    <dt className={`text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                      {kh ? r.labelKh : r.labelEn}
                    </dt>
                    <dd className={`text-sm text-slate-800 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {kh ? r.valKh : r.valEn}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function UpcyclingCallout({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  return (
    <article
      className="relative rounded-2xl border-2 border-emerald-400 shadow-sm overflow-hidden bg-emerald-50/60"
      style={{
        backgroundImage:
          "linear-gradient(rgba(5, 150, 105, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(5, 150, 105, 0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <CornerMarks />
      <div className="relative p-5 sm:p-6 grid md:grid-cols-[64px_1fr] gap-4">
        <div className="w-14 h-14 rounded-xl border-2 border-emerald-400 bg-white text-emerald-700 flex items-center justify-center flex-shrink-0">
          <Leaf className="w-6 h-6" />
        </div>
        <div>
          <div className={`text-[10px] font-mono uppercase tracking-widest text-emerald-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Engineering insight", "ការយល់ដឹងវិស្វកម្ម")}
          </div>
          <h3 className={`text-xl font-bold text-slate-900 mb-2 ${kh ? "font-khmer" : ""}`}>
            {t("From waste to feedstock — the upcycling argument", "ពីសំណល់ទៅជាសម្ភារៈឆៅ — អំណះអំណាងនៃការកែច្នៃថ្មី")}
          </h3>
          <p className={`text-sm sm:text-base text-slate-800 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Plastics are a problem precisely because they are durable and chemically resistant. But flip the lens: the same chemical durability that makes plastic last 450 years in a landfill makes it an excellent raw material for secondary engineering.",
              "ប្លាស្ទិកគឺជាបញ្ហាព្រោះតែវាប្រើបានយូរ និងធន់នឹងគីមី។ ប៉ុន្តែបើមើលពីផ្នែកមួយទៀត ៖ ភាពរឹងមាំគីមីដូចគ្នា ដែលធ្វើឱ្យប្លាស្ទិកនៅគង់វង្ស ៤៥០ ឆ្នាំក្នុងកន្លែងបោះសំរាម ធ្វើឱ្យវាក្លាយជាសម្ភារៈឆៅដ៏ល្អបំផុតសម្រាប់វិស្វកម្មបន្ទាប់បន្សំ។"
            )}
          </p>
          <ul className="space-y-1.5">
            {[
              {
                en: "Crushed PET bottles → polymer fibres → insulation batts for school roofs.",
                k: "ដបPET កំទេច → សរសៃប៉ូលីមែរ → ស្រទាប់ការពារកម្ដៅសម្រាប់ដំបូលសាលា។",
              },
              {
                en: "Mixed plastic waste + sand → eco-bricks for low-cost walls.",
                k: "សំណល់ប្លាស្ទិកលាយ + ខ្សាច់ → ឥដ្ឋអេកូសម្រាប់ជញ្ជាំងតម្លៃថោក។",
              },
              {
                en: "Shredded HDPE → 3D-printer filament for technical-school projects.",
                k: "HDPE កាត់តូច → សរសៃម៉ាស៊ីន 3D សម្រាប់គម្រោងសាលាបច្ចេកទេស។",
              },
            ].map((row, i) => (
              <li key={i} className={`text-sm text-slate-700 flex items-start gap-2 ${kh ? "font-khmer leading-relaxed" : ""}`}>
                <Trash2 className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                <span>{kh ? row.k : row.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Section 04: Waste Upcycling — Frugal Engineering
// ─────────────────────────────────────────────────────────────────────────

function EcoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl border-2 border-emerald-700/30 shadow-sm ${className}`}
      style={{
        backgroundColor: "#fdfaf3",
        backgroundImage:
          "radial-gradient(rgba(120, 81, 45, 0.12) 1px, transparent 1.4px), " +
          "radial-gradient(rgba(120, 81, 45, 0.08) 1px, transparent 1.4px), " +
          "linear-gradient(180deg, #fdfaf3 0%, #f4ecd8 100%)",
        backgroundSize: "14px 14px, 9px 9px, 100% 100%",
        backgroundPosition: "0 0, 5px 6px, 0 0",
      }}
    >
      <CornerMarks tone="slate" />
      {children}
    </div>
  );
}

function BurnVsUpcycle({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {/* BURN — danger panel */}
      <div className="relative rounded-2xl border-2 border-red-300 bg-red-50/80 p-5 sm:p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-200/40 rounded-full blur-2xl" />
        <div className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-red-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <AlertOctagon className="w-3.5 h-3.5" />
          {t("Avoid · Burning", "ចៀសវាង · ការដុត")}
        </div>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-400 text-red-600 flex items-center justify-center flex-shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className={`text-lg font-bold text-red-900 leading-tight pt-1 ${kh ? "font-khmer" : ""}`}>
            {t("Why we should never burn plastic", "ហេតុអ្វីយើងមិនត្រូវដុតប្លាស្ទិក")}
          </h3>
        </div>
        <p className={`text-sm text-red-950/85 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "When PET, PVC, and other plastics burn at the low temperature of an open fire, they don't fully break apart. Instead they release a soup of toxins — including dioxins, one of the most poisonous chemical families known.",
            "នៅពេលប្លាស្ទិក PET, PVC និងប្លាស្ទិកដទៃត្រូវបានដុតនៅសីតុណ្ហភាពទាបនៃភ្លើងបើកចំហ ពួកវាមិនឆេះអស់ទាំងស្រុងទេ។ ផ្ទុយទៅវិញ វាបញ្ចេញល្បាយនៃជាតិពុលជាច្រើន — រួមទាំង ឌីអុកស៊ីន ដែលជាគ្រួសារសារធាតុគីមីពុលបំផុតមួយ។"
          )}
        </p>
        <ul className="space-y-2">
          {[
            { en: "Dioxins drift in smoke and settle on rice paddies, vegetables, and animal feed.", kh: "ឌីអុកស៊ីនរសាត់នៅក្នុងផ្សែង ហើយធ្លាក់លើស្រែស្រូវ បន្លែ និងចំណីសត្វ។" },
            { en: "Lung damage is fastest in children, the elderly, and people who already have asthma.", kh: "ការខូចសួតលឿនបំផុតចំពោះកុមារ មនុស្សចាស់ និងអ្នកដែលមានជំងឺហឺត។" },
            { en: "Soil contamination can last for years and reduce crop yields nearby.", kh: "ការបំពុលដីអាចមានរយៈពេលច្រើនឆ្នាំ ហើយកាត់បន្ថយផលដំណាំនៅជិតៗ។" },
          ].map((b) => (
            <li key={b.en} className={`flex items-start gap-2 text-sm text-red-950 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <span>{kh ? b.kh : b.en}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* UPCYCLE — solution panel */}
      <div className="relative rounded-2xl border-2 border-emerald-400 bg-emerald-50/80 p-5 sm:p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/50 rounded-full blur-2xl" />
        <div className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-emerald-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <Leaf className="w-3.5 h-3.5" />
          {t("Better · Upcycling", "ល្អជាង · ការកែច្នៃថ្មី")}
        </div>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Recycle className="w-5 h-5" />
          </div>
          <h3 className={`text-lg font-bold text-emerald-900 leading-tight pt-1 ${kh ? "font-khmer" : ""}`}>
            {t("Why upcycling wins", "ហេតុអ្វីការកែច្នៃថ្មីឈ្នះ")}
          </h3>
        </div>
        <p className={`text-sm text-emerald-950/85 mb-3 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {t(
            "Upcycling keeps the same plastic doing a useful second job — no smoke, no toxins, and no fuel cost. The bottle's strength becomes a tool instead of a pollutant.",
            "ការកែច្នៃថ្មីរក្សាប្លាស្ទិកដដែលឱ្យធ្វើការងារទីពីរដ៏មានប្រយោជន៍ — គ្មានផ្សែង គ្មានជាតិពុល និងគ្មានថ្លៃឥន្ធនៈ។ កម្លាំងរបស់ដបក្លាយជាឧបករណ៍ ជំនួសឱ្យសារធាតុបំពុល។"
          )}
        </p>
        <ul className="space-y-2">
          {[
            { en: "Zero air or soil pollution — the bottle stays solid.", kh: "គ្មានការបំពុលខ្យល់ ឬដី — ដបនៅរឹងដដែល។" },
            { en: "Free building material — works for tools, furniture, and farming.", kh: "សម្ភារៈសំណង់ឥតគិតថ្លៃ — ប្រើបានសម្រាប់ឧបករណ៍ គ្រឿងសង្ហារឹម និងកសិកម្ម។" },
            { en: "Teaches frugal engineering — solving real problems with what you already have.", kh: "បង្រៀនវិស្វកម្មសន្សំសំចៃ — ដោះស្រាយបញ្ហាពិតៗដោយប្រើអ្វីដែលអ្នកមានរួចហើយ។" },
          ].map((b) => (
            <li key={b.en} className={`flex items-start gap-2 text-sm text-emerald-950 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{kh ? b.kh : b.en}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PetBottleProperties({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  const props = [
    {
      icon: Recycle,
      titleEn: "400+ years",
      titleKh: "៤០០+ ឆ្នាំ",
      labelEn: "Decomposition time",
      labelKh: "រយៈពេលបំបែកធាតុ",
      bodyEn: "A discarded PET bottle outlasts every person alive today by a dozen lifetimes — which is exactly why we should keep using each one.",
      bodyKh: "ដប PET ដែលបោះចោលមួយមានអាយុវែងជាងមនុស្សរស់នៅសព្វថ្ងៃនេះដប់ជីវិត — នេះហើយជាមូលហេតុដែលយើងគួរបន្តប្រើដបនីមួយៗ។",
    },
    {
      icon: Droplets,
      titleEn: "100% waterproof",
      titleKh: "ទប់ទឹក ១០០%",
      labelEn: "Liquid barrier",
      labelKh: "ស្រទាប់ការពារទឹក",
      bodyEn: "PET does not absorb water and does not let it through — perfect for water storage, drip irrigation, and rain-proof toolkits.",
      bodyKh: "PET មិនស្រូបទឹក និងមិនឱ្យទឹកជ្រាបឆ្លងកាត់ទេ — សមរម្យសម្រាប់ការផ្ទុកទឹក ការស្រោចស្រពតក់ៗ និងឧបករណ៍ការពារភ្លៀង។",
    },
    {
      icon: Wind,
      titleEn: "Traps air perfectly",
      titleKh: "បិទជិតខ្យល់បានល្អឥតខ្ចោះ",
      labelEn: "High buoyancy",
      labelKh: "ភាពអណ្ដែតខ្ពស់",
      bodyEn: "A capped 1.5 L bottle can support about 1.5 kg of weight on water — making it a free, life-saving floatation block.",
      bodyKh: "ដប ១,៥ លីត្រដែលបិទគម្របអាចទ្រទម្ងន់ប្រហែល ១,៥ គីឡូក្រាមនៅលើទឹក — ធ្វើឱ្យវាជាដុំអណ្ដែតសង្គ្រោះជីវិតឥតគិតថ្លៃ។",
    },
  ];
  return (
    <div className="mb-8">
      <div className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-cyan-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        <Lightbulb className="w-3.5 h-3.5" />
        {t("Material spec · PET bottle", "សមាសភាព · ដប PET")}
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {props.map(({ icon: Icon, titleEn, titleKh, labelEn, labelKh, bodyEn, bodyKh }) => (
          <div key={titleEn} className="relative rounded-2xl border-2 border-emerald-700/30 bg-white p-4" style={CARD_BG}>
            <CornerMarks tone="slate" />
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-600/10 border border-emerald-600/40 text-emerald-700 flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <div className={`text-[10px] uppercase tracking-widest text-slate-500 font-mono ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {kh ? labelKh : labelEn}
              </div>
            </div>
            <div className={`text-2xl font-black text-slate-900 leading-tight mb-1 ${kh ? "font-khmer text-xl" : ""}`}>
              {kh ? titleKh : titleEn}
            </div>
            <p className={`text-xs text-slate-700 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {kh ? bodyKh : bodyEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Blueprint SVGs ────────────────────────────────────────────────────────

function BlueprintFrame({ titleId, label, children }: { titleId: string; label: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl border-2 border-emerald-900/40 p-2"
      style={{
        backgroundColor: "#0e3b2e",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), " +
          "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <svg viewBox="0 0 200 160" className="w-full h-auto block" role="img" aria-labelledby={titleId}>
        <title id={titleId}>{label}</title>
        {children}
      </svg>
    </div>
  );
}

function MosquitoTrapBlueprint({ kh }: { kh: boolean }) {
  const uid = useId().replace(/:/g, "");
  const titleId = `bp-trap-${uid}`;
  const tipId = `bp-tip-${uid}`;
  const stroke = "#a7f3d0", dim = "#5eead4";
  return (
    <BlueprintFrame titleId={titleId} label={kh ? "ផែនការអន្ទាក់រុយនិងមូស" : "Mosquito trap blueprint"}>
      {/* base bottle (lower 2/3) */}
      <path d="M 70 60 L 70 130 Q 70 144 84 144 L 116 144 Q 130 144 130 130 L 130 60" fill="none" stroke={stroke} strokeWidth="1.5" />
      {/* inverted spout funnel inside */}
      <path d="M 78 60 L 100 92 L 122 60" fill="none" stroke={stroke} strokeWidth="1.5" />
      <line x1="100" y1="92" x2="100" y2="100" stroke={stroke} strokeWidth="1.2" />
      {/* sugar water level */}
      <line x1="74" y1="120" x2="126" y2="120" stroke={dim} strokeDasharray="2 3" strokeWidth="1" />
      <text x="135" y="124" fontSize="7" fill={dim} fontFamily={kh ? "inherit" : "monospace"}>
        {kh ? "ទឹកស្ករ" : "sugar water"}
      </text>
      {/* mosquito */}
      <g>
        <circle cx="100" cy="76" r="1.5" fill={stroke} />
        <line x1="100" y1="76" x2="96" y2="72" stroke={stroke} strokeWidth="0.6" />
        <line x1="100" y1="76" x2="104" y2="72" stroke={stroke} strokeWidth="0.6" />
        <text x="106" y="78" fontSize="6" fill={stroke}>↓</text>
      </g>
      {/* dimensions */}
      <line x1="50" y1="60" x2="50" y2="144" stroke={dim} strokeWidth="0.6" markerStart={`url(#${tipId})`} markerEnd={`url(#${tipId})`} />
      <text x="46" y="105" fontSize="7" fill={dim} textAnchor="end" fontFamily="monospace">1.5L</text>
      <defs>
        <marker id={tipId} viewBox="0 0 6 6" refX="3" refY="3" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M0,3 L6,0 L6,6 z" fill={dim} />
        </marker>
      </defs>
    </BlueprintFrame>
  );
}

function FloatationBlueprint({ kh }: { kh: boolean }) {
  const uid = useId().replace(/:/g, "");
  const titleId = `bp-float-${uid}`;
  const stroke = "#a7f3d0", dim = "#5eead4";
  return (
    <BlueprintFrame titleId={titleId} label={kh ? "ផែនការឧបករណ៍អណ្ដែតទឹក" : "Floatation device blueprint"}>
      {/* water line */}
      <line x1="0" y1="110" x2="200" y2="110" stroke={dim} strokeDasharray="4 3" strokeWidth="1" />
      <text x="6" y="106" fontSize="7" fill={dim} fontFamily={kh ? "inherit" : "monospace"}>
        {kh ? "ផ្ទៃទឹក" : "water line"}
      </text>
      {/* 4 sealed bottles bound by string */}
      {[40, 80, 120, 160].map((cx) => (
        <g key={cx}>
          {/* cap */}
          <rect x={cx - 5} y="78" width="10" height="6" fill="none" stroke={stroke} strokeWidth="1.2" />
          {/* body */}
          <path d={`M ${cx - 12} 92 L ${cx - 12} 124 Q ${cx - 12} 132 ${cx - 4} 132 L ${cx + 4} 132 Q ${cx + 12} 132 ${cx + 12} 124 L ${cx + 12} 92 Z`} fill="none" stroke={stroke} strokeWidth="1.5" />
          {/* neck */}
          <path d={`M ${cx - 5} 84 L ${cx - 12} 92 L ${cx + 12} 92 L ${cx + 5} 84 Z`} fill="none" stroke={stroke} strokeWidth="1.2" />
        </g>
      ))}
      {/* string lashing across all */}
      <path d="M 30 100 Q 100 92, 170 100" fill="none" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" />
      <path d="M 30 118 Q 100 110, 170 118" fill="none" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" />
      <text x="100" y="148" fontSize="7" fill="#fbbf24" textAnchor="middle" fontFamily={kh ? "inherit" : "monospace"}>
        {kh ? "ខ្សែ × ២" : "string × 2"}
      </text>
    </BlueprintFrame>
  );
}

function PetWatererBlueprint({ kh }: { kh: boolean }) {
  const uid = useId().replace(/:/g, "");
  const titleId = `bp-pet-${uid}`;
  const arrowId = `bp-pet-arrow-${uid}`;
  const stroke = "#a7f3d0", dim = "#5eead4";
  return (
    <BlueprintFrame titleId={titleId} label={kh ? "ផែនការប្រដាប់ដាក់ទឹកសត្វ" : "Automatic pet waterer blueprint"}>
      {/* inverted bottle (cap at bottom) */}
      <path d="M 80 20 L 80 100 L 92 110 L 108 110 L 120 100 L 120 20 Z" fill="none" stroke={stroke} strokeWidth="1.5" />
      {/* water inside */}
      <line x1="82" y1="35" x2="118" y2="35" stroke={dim} strokeDasharray="2 3" strokeWidth="1" />
      <text x="125" y="38" fontSize="7" fill={dim} fontFamily={kh ? "inherit" : "monospace"}>
        {kh ? "ទឹក" : "water"}
      </text>
      {/* dish */}
      <path d="M 60 120 Q 60 145 100 145 Q 140 145 140 120 L 140 132 Q 140 140 100 140 Q 60 140 60 132 Z" fill="none" stroke={stroke} strokeWidth="1.5" />
      {/* water in dish */}
      <line x1="68" y1="132" x2="132" y2="132" stroke={dim} strokeDasharray="2 3" strokeWidth="1" />
      {/* atmospheric pressure arrows pointing down on dish surface */}
      {[72, 100, 128].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={120} x2={x} y2={130} stroke="#fbbf24" strokeWidth="0.8" markerEnd={`url(#${arrowId})`} />
        </g>
      ))}
      <text x="100" y="158" fontSize="7" fill="#fbbf24" textAnchor="middle" fontFamily={kh ? "inherit" : "monospace"}>
        {kh ? "សម្ពាធបរិយាកាស" : "atm. pressure"}
      </text>
      <defs>
        <marker id={arrowId} viewBox="0 0 6 6" refX="3" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M0,0 L6,0 L3,6 z" fill="#fbbf24" />
        </marker>
      </defs>
    </BlueprintFrame>
  );
}

function BioSandFilterBlueprint({ kh }: { kh: boolean }) {
  const uid = useId().replace(/:/g, "");
  const titleId = `bp-biosand-${uid}`;
  const stroke = "#a7f3d0", dim = "#5eead4";
  // Inverted bottle: wide at top (cut bottom), neck pointing down
  const layers = [
    { y1: 32, y2: 56, fill: "#94a3b8", labelEn: "Gravel", labelKh: "ក្រួស", noteEn: "catches leaves", noteKh: "ចាប់ស្លឹកឈើ" },
    { y1: 56, y2: 84, fill: "#fde68a", labelEn: "Fine sand", labelKh: "ខ្សាច់", noteEn: "mechanical", noteKh: "មេកានិច" },
    { y1: 84, y2: 110, fill: "#1f2937", labelEn: "Charcoal", labelKh: "ធ្យូង", noteEn: "chemical", noteKh: "គីមី" },
    { y1: 110, y2: 122, fill: "#fef3c7", labelEn: "Cloth", labelKh: "ក្រណាត់", noteEn: "barrier", noteKh: "ឧបសគ្គ" },
  ];
  return (
    <BlueprintFrame titleId={titleId} label={kh ? "ផែនការតម្រងទឹកសន្សំសំចៃ" : "Bio-sand filter blueprint"}>
      {/* dirty water arrow in */}
      <text x="100" y="14" fontSize="7" fill="#7dd3fc" textAnchor="middle" fontFamily={kh ? "inherit" : "monospace"}>
        {kh ? "ទឹកកខ្វក់" : "dirty water"}
      </text>
      <path d="M 100 18 L 100 28" stroke="#7dd3fc" strokeWidth="1" />
      <path d="M 96 26 L 100 30 L 104 26 Z" fill="#7dd3fc" />

      {/* inverted bottle body — wide top, narrow neck at bottom */}
      <path d="M 60 30 L 60 122 L 88 134 L 88 148 L 112 148 L 112 134 L 140 122 L 140 30 Z" fill="none" stroke={stroke} strokeWidth="1.5" />

      {/* layers (clipped within wide section 30..122) */}
      {layers.map((L) => (
        <g key={L.labelEn}>
          <rect x="61" y={L.y1} width="78" height={L.y2 - L.y1} fill={L.fill} fillOpacity="0.55" />
          <line x1="61" y1={L.y2} x2="139" y2={L.y2} stroke={stroke} strokeDasharray="2 2" strokeWidth="0.6" />
          <text x="146" y={(L.y1 + L.y2) / 2 + 2} fontSize="7" fill={stroke} fontFamily={kh ? "inherit" : "monospace"}>
            {kh ? L.labelKh : L.labelEn}
          </text>
          <text x="146" y={(L.y1 + L.y2) / 2 + 10} fontSize="5.5" fill={dim} fontFamily={kh ? "inherit" : "monospace"}>
            {kh ? L.noteKh : L.noteEn}
          </text>
        </g>
      ))}

      {/* clean water drip out */}
      <text x="100" y="159" fontSize="7" fill="#7dd3fc" textAnchor="middle" fontFamily={kh ? "inherit" : "monospace"}>
        {kh ? "ទឹកស្អាត" : "clean water"}
      </text>
      <circle cx="100" cy="153" r="1.2" fill="#7dd3fc" />
    </BlueprintFrame>
  );
}

function SolarHeaterBlueprint({ kh }: { kh: boolean }) {
  const uid = useId().replace(/:/g, "");
  const titleId = `bp-solar-${uid}`;
  const stroke = "#a7f3d0", dim = "#5eead4";
  return (
    <BlueprintFrame titleId={titleId} label={kh ? "ផែនការគ្រឿងកម្ដៅទឹកដោយព្រះអាទិត្យ" : "Solar water heater blueprint"}>
      {/* Sun + rays */}
      <circle cx="34" cy="32" r="9" fill="none" stroke="#fbbf24" strokeWidth="1.2" />
      <circle cx="34" cy="32" r="4" fill="#fbbf24" fillOpacity="0.4" />
      {[0, 1, 2, 3, 4].map((i) => {
        const x1 = 50 + i * 28, y1 = 24, x2 = 60 + i * 28, y2 = 60;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="0.9" strokeDasharray="3 2" />;
      })}
      <text x="48" y="20" fontSize="7" fill="#fbbf24" fontFamily={kh ? "inherit" : "monospace"}>
        {kh ? "ពន្លឺថ្ងៃ" : "sunlight"}
      </text>

      {/* Corrugated metal roof — slanted */}
      <g>
        <path d="M 20 130 L 180 70 L 184 78 L 24 138 Z" fill="#475569" />
        {/* corrugations */}
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 13;
          const x1 = 20 + 160 * t;
          const y1 = 130 - 60 * t;
          const x2 = x1 + 4;
          const y2 = y1 + 8;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth="0.5" opacity="0.7" />;
        })}
      </g>

      {/* Black bottles laid horizontally on the slope */}
      {[0, 1, 2].map((i) => {
        const cx = 60 + i * 38;
        const cy = 116 - i * 14.5;
        return (
          <g key={i} transform={`rotate(-20 ${cx} ${cy})`}>
            <rect x={cx - 18} y={cy - 6} width="32" height="12" rx="2" fill="#0f172a" stroke={stroke} strokeWidth="1" />
            <rect x={cx + 14} y={cy - 3} width="6" height="6" fill="#0f172a" stroke={stroke} strokeWidth="0.8" />
            {/* heat squiggle */}
            <path d={`M ${cx - 6} ${cy - 12} q 3 -3 6 0 t 6 0`} stroke="#fbbf24" strokeWidth="0.8" fill="none" />
          </g>
        );
      })}

      {/* labels */}
      <text x="100" y="158" fontSize="7" fill={stroke} textAnchor="middle" fontFamily={kh ? "inherit" : "monospace"}>
        {kh ? "ដបពណ៌ខ្មៅស្រូបពន្លឺ → កម្ដៅ" : "black bottles absorb light → heat"}
      </text>
      <text x="186" y="146" fontSize="6" fill={dim} textAnchor="end" fontFamily={kh ? "inherit" : "monospace"}>
        {kh ? "ដំបូលស័ង្កសីរលក" : "corrugated metal roof"}
      </text>
    </BlueprintFrame>
  );
}

function BlueprintGallery({ kh, t }: { kh: boolean; t: (en: string, k: string) => string }) {
  const projects = [
    {
      key: "trap",
      icon: Bug,
      titleEn: "The Mosquito / Fly Trap",
      titleKh: "អន្ទាក់រុយនិងមូស",
      blurbEn: "Insects fly in for the sweet smell — and can't fly back out through the inverted funnel.",
      blurbKh: "សត្វល្អិតហើរចូលដោយក្លិនផ្អែម — ហើយមិនអាចហើរត្រឡប់ចេញតាមបំពង់ចីបដែលដាក់បញ្ច្រាសវិញបានទេ។",
      blueprint: <MosquitoTrapBlueprint kh={kh} />,
      stepsEn: [
        "Cut the top third off a clean 1.5 L PET bottle.",
        "Flip the cut top upside-down and push it into the base — spout pointing down inside.",
        "Pour 100 mL of warm sugar water with a pinch of yeast (or vinegar + soap) into the base.",
      ],
      stepsKh: [
        "កាត់ផ្នែកខាងលើមួយភាគបីនៃដប PET ១,៥ លីត្រស្អាត។",
        "បញ្ច្រាសផ្នែកខាងលើដែលបានកាត់ឱ្យដើរវិញ ហើយរុញចូលក្នុងផ្នែកខាងក្រោម — បំពង់ចីបចង្អុលចុះក្រោម។",
        "ចាក់ទឹកស្ករក្ដៅ ១០០ មល ជាមួយម្សៅយ៉ាស្ដបន្តិច (ឬទឹកខ្មេះ + សាប៊ូ) ចូលផ្នែកខាងក្រោម។",
      ],
    },
    {
      key: "float",
      icon: LifeBuoy,
      titleEn: "Floatation Devices & Rafts",
      titleKh: "ឧបករណ៍អណ្ដែតទឹក",
      blurbEn: "Sealed air gives huge buoyancy — four bottles can hold a child safely above water during swim practice or monsoon flooding.",
      blurbKh: "ខ្យល់ដែលឃុំទុកផ្ដល់ភាពអណ្ដែតយ៉ាងខ្លាំង — ដបបួនអាចទ្រកុមារឱ្យអណ្ដែតលើទឹកដោយសុវត្ថិភាព ក្នុងការហាត់ហែលទឹក ឬទឹកជំនន់រដូវវស្សា។",
      blueprint: <FloatationBlueprint kh={kh} />,
      stepsEn: [
        "Take 4–8 empty 1.5 L bottles and screw the caps on tight (this is the safety check).",
        "Lay them in a 2×2 or 2×4 grid and lash them together with strong nylon string in two places.",
        "Test in shallow water before any real use — adult supervision required for children.",
      ],
      stepsKh: [
        "យកដបទទេ ១,៥ លីត្រ ៤–៨ ហើយបង្គៀរគម្របឱ្យជាប់ល្អ (នេះជាការត្រួតពិនិត្យសុវត្ថិភាព)។",
        "ដាក់ពួកវាជាក្រឡា ២×២ ឬ ២×៤ ហើយចងពួកវាជាមួយខ្សែនីឡុងរឹងមាំនៅពីរកន្លែង។",
        "សាកល្បងនៅក្នុងទឹករាក់មុនការប្រើពិត — ទាមទារការតាមដានពីមនុស្សពេញវ័យសម្រាប់កុមារ។",
      ],
    },
    {
      key: "pet",
      icon: PawPrint,
      titleEn: "Automatic Pet Waterer",
      titleKh: "ប្រដាប់ដាក់ទឹកសត្វ",
      blurbEn: "Atmospheric pressure pushes down on the dish surface, refilling it from the inverted bottle every time the pet drinks.",
      blurbKh: "សម្ពាធបរិយាកាសរុញចុះក្រោមលើផ្ទៃចាន ហើយបំពេញវាឡើងវិញពីដបដែលដាក់បញ្ច្រាស រាល់ពេលដែលសត្វផឹកទឹក។",
      blueprint: <PetWatererBlueprint kh={kh} />,
      stepsEn: [
        "Fill a clean 1.5 L bottle with fresh water and screw the cap on tight.",
        "Place a wide, shallow dish on the ground and quickly invert the bottle into it — the cap should rest just below the dish's rim.",
        "Water flows out only as the pet drinks down the level — the dish stays perfectly full all day.",
      ],
      stepsKh: [
        "បំពេញដបស្អាត ១,៥ លីត្រដោយទឹកស្អាត ហើយបង្គៀរគម្របឱ្យជាប់ល្អ។",
        "ដាក់ចានរាក់ធំៗនៅលើដី ហើយបញ្ច្រាសដបយ៉ាងលឿនចូលទៅក្នុងវា — គម្របគួរនៅខាងក្រោមគែមចានបន្តិច។",
        "ទឹកហូរចេញតែនៅពេលសត្វផឹកធ្វើឱ្យកម្រិតធ្លាក់ — ចានពេញដដែលពេញមួយថ្ងៃ។",
      ],
    },
    {
      key: "filter",
      icon: Filter,
      titleEn: "The Bio-Sand Filter",
      titleKh: "ការចម្រោះទឹកសន្សំសំចៃ",
      blurbEn: "A gravity-fed stack of gravel, sand and charcoal cleans muddy water in two ways at once: physically (sand traps dirt and microbes) and chemically (charcoal pores adsorb toxins, smells and bad tastes).",
      blurbKh: "ដបបញ្ច្រាសដែលដាក់ជាន់ៗដោយក្រួស ខ្សាច់ និងធ្យូង ដំណើរការដោយកម្លាំងទំនាញផែនដី សម្អាតទឹកល្បាប់តាមពីរវិធីក្នុងពេលតែមួយ៖ ការចម្រោះមេកានិច (ខ្សាច់ចាប់សារធាតុកខ្វក់ និងបាក់តេរី) និងការចម្រោះគីមី (រន្ធតូចៗរបស់ធ្យូងស្រូបយកជាតិពុល ក្លិន និងរសជាតិអាក្រក់)។",
      blueprint: <BioSandFilterBlueprint kh={kh} />,
      stepsEn: [
        "Cut the bottom off a clean 5 L PET bottle, remove the cap, and hang it neck-down on a frame.",
        "Pack the layers from neck (bottom) up: a small wad of clean cotton/cloth, then 4 cm of crushed charcoal, 6 cm of fine washed sand, and 4 cm of small gravel on top.",
        "Pour dirty water onto the gravel — let it drip slowly through into a clean container. Re-wash the layers every 2 weeks.",
      ],
      stepsKh: [
        "កាត់បាតដប PET ៥ លីត្រស្អាត ដកគម្របចេញ ហើយព្យួរវាដោយបំពង់ចីបចុះក្រោមលើស៊ុម ដើម្បីឱ្យទឹកធ្លាក់ដោយកម្លាំងទំនាញ។",
        "បង្ហាប់ស្រទាប់ពីបំពង់ចីប (ខាងក្រោម) ឡើងលើ៖ ដុំក្រណាត់សំឡីស្អាតមួយដុំតូច បន្ទាប់មកធ្យូងបុក ៤ ស.ម ខ្សាច់ល្អិតលាងស្អាត ៦ ស.ម និងក្រួសតូច ៤ ស.ម នៅខាងលើ។",
        "ចាក់ទឹកកខ្វក់លើក្រួស — ទុកឱ្យទឹកស្រក់ស្រាលៗឆ្លងកាត់ចូលក្នុងធុងស្អាត។ លាងស្រទាប់ជាថ្មីរៀងរាល់ ២ សប្ដាហ៍។",
      ],
      toolsEn: "Tools: 5 L PET bottle, gravel, sand, charcoal, cloth",
      toolsKh: "ឧបករណ៍៖ ដប PET ៥ លីត្រ ក្រួស ខ្សាច់ ធ្យូង ក្រណាត់",
      scienceEn: "Science: mechanical filtration (sand) + chemical adsorption — toxins stick to the pore surfaces of the charcoal.",
      scienceKh: "វិទ្យាសាស្ត្រ៖ ការចម្រោះមេកានិច (ខ្សាច់) + ការចម្រោះគីមីដោយអាដស័របស្យុង (ការស្រូបជាប់លើផ្ទៃ) — ជាតិពុលជាប់នឹងផ្ទៃរន្ធធ្យូង។",
      warningEn: "Always boil filtered water before drinking to ensure 100% biological safety.",
      warningKh: "តែងតែដាំទឹកដែលបានចម្រោះឱ្យពុះមុនផឹក ដើម្បីធានាសុវត្ថិភាពជីវសាស្ត្រ ១០០%។",
    },
    {
      key: "solar",
      icon: Sun,
      titleEn: "The Solar Water Heater",
      titleKh: "ការកម្ដៅទឹកដោយថាមពលព្រះអាទិត្យ",
      blurbEn: "Black bottles laid on a hot metal roof give you free hot water for washing — no firewood, no electricity. The black surface absorbs every visible wavelength and the clear plastic traps the heat inside.",
      blurbKh: "ដបពណ៌ខ្មៅដាក់នៅលើដំបូលស័ង្កសីរលកដែលក្ដៅផ្ដល់ឱ្យអ្នកនូវទឹកក្ដៅឥតគិតថ្លៃសម្រាប់លាង — គ្មានអុស គ្មានអគ្គិសនី។ ផ្ទៃខ្មៅស្រូបយករាល់រលកពន្លឺមើលឃើញ ហើយប្លាស្ទិកថ្លាឃុំកម្ដៅនៅខាងក្នុង (បាតុភូតផ្ទះកញ្ចក់)។",
      blueprint: <SolarHeaterBlueprint kh={kh} />,
      stepsEn: [
        "Wash 4–8 clear PET bottles, fill them with water and screw the caps on tight.",
        "Paint the outside of each bottle matte black (or push a coil of black hose through and refill with water).",
        "Lay the bottles on a south-facing corrugated metal roof in the morning — by midday the water inside reaches 50–60 °C, hot enough for washing dishes, hands and clothes.",
      ],
      stepsKh: [
        "លាងដប PET ថ្លា ៤–៨ បំពេញពួកវាដោយទឹក ហើយបង្គៀរគម្របឱ្យជាប់ល្អ។",
        "លាបខាងក្រៅដបនីមួយៗដោយថ្នាំខ្មៅស្ងួត (ឬដាក់បំពង់ទឹកខ្មៅរុំជាបង្វិលនៅខាងក្នុង បន្ទាប់មកបំពេញទឹក)។",
        "ដាក់ដបនៅលើដំបូលស័ង្កសីបែរទៅទិសខាងត្បូងពីព្រឹក — ដល់ពេលថ្ងៃត្រង់ ទឹកខាងក្នុងឡើងដល់ ៥០–៦០ °C ក្ដៅគ្រប់គ្រាន់សម្រាប់លាងចាន ដៃ និងសម្លៀកបំពាក់។",
      ],
      toolsEn: "Tools: PET bottles, matte black paint, sunny roof",
      toolsKh: "ឧបករណ៍៖ ដប PET ថ្នាំខ្មៅស្ងួត ដំបូលមានពន្លឺថ្ងៃ",
      scienceEn: "Science: black absorbs all visible wavelengths (albedo ≈ 0); the clear plastic traps re-radiated heat (greenhouse effect).",
      scienceKh: "វិទ្យាសាស្ត្រ៖ ពណ៌ខ្មៅស្រូបយករាល់រលកពន្លឺមើលឃើញ (អាល់បេដូ ≈ ០); ប្លាស្ទិកថ្លាឃុំកម្ដៅដែលបញ្ចេញវិញ (បាតុភូតផ្ទះកញ្ចក់)។",
    },
  ] as Array<{
    key: string;
    icon: React.ComponentType<{ className?: string }>;
    titleEn: string; titleKh: string;
    blurbEn: string; blurbKh: string;
    blueprint: React.ReactNode;
    stepsEn: string[]; stepsKh: string[];
    toolsEn?: string; toolsKh?: string;
    scienceEn?: string; scienceKh?: string;
    warningEn?: string; warningKh?: string;
  }>;

  return (
    <div>
      <div className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-emerald-700 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        <Hammer className="w-3.5 h-3.5" />
        {t("Upcycle Blueprint Gallery", "វិចិត្រសាលផែនការកែច្នៃថ្មី")}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => {
          const { key, icon: Icon, titleEn, titleKh, blurbEn, blurbKh, blueprint, stepsEn, stepsKh, toolsEn, toolsKh, scienceEn, scienceKh, warningEn, warningKh } = p;
          const chipKh: Record<string, string> = {
            trap: "អន្ទាក់",
            float: "សុវត្ថិភាពទឹក",
            pet: "ការផ្ដល់ទឹកសត្វ",
            filter: "ទឹកស្អាត",
            solar: "ថាមពលព្រះអាទិត្យ",
          };
          return (
            <EcoCard key={key} className="p-4 sm:p-5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-slate-900 leading-snug ${kh ? "font-khmer text-base" : "text-base"}`}>
                    {kh ? titleKh : titleEn}
                  </h4>
                  <div className={`text-[10px] uppercase tracking-widest text-emerald-700/80 font-mono mt-0.5 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                    {kh ? (chipKh[key] ?? "គម្រោង") : `Project · ${key.toUpperCase()}`}
                  </div>
                </div>
              </div>

              {blueprint}

              <p className={`text-xs sm:text-sm text-slate-700 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {kh ? blurbKh : blurbEn}
              </p>

              {scienceEn && (
                <div className={`rounded-lg border border-emerald-700/30 bg-emerald-50/70 px-3 py-2 text-[11px] sm:text-xs text-emerald-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                  <span className="font-bold">{kh ? scienceKh : scienceEn}</span>
                </div>
              )}

              <ol className="space-y-1.5">
                {(kh ? stepsKh : stepsEn).map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className={`text-xs sm:text-sm text-slate-800 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              {warningEn && (
                <div
                  role="alert"
                  className={`mt-1 flex items-start gap-2 rounded-lg border-2 border-red-400 bg-red-50 px-3 py-2 text-xs text-red-900 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
                >
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                  <span>
                    <span className="font-bold uppercase tracking-wider mr-1 text-[10px]">
                      {t("Safety", "សុវត្ថិភាព")}:
                    </span>
                    {kh ? warningKh : warningEn}
                  </span>
                </div>
              )}

              <div className={`mt-auto pt-2 flex items-start gap-1.5 text-[10px] uppercase tracking-widest text-slate-500 font-mono ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                <Scissors className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span>{kh ? (toolsKh ?? "ឧបករណ៍៖ កន្ត្រៃ ខ្សែ ទឹក") : (toolsEn ?? "Tools: scissors, string, water")}</span>
              </div>
            </EcoCard>
          );
        })}
      </div>
    </div>
  );
}

export default MaterialsSciencePage;
