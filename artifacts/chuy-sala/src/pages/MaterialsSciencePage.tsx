import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
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
        <SectionTitle
          en="Lifecycle — glass vs. plastic"
          kh="វដ្តជីវិត — កញ្ចក់ ប្រឆាំងនឹង ប្លាស្ទិក"
          numberLabel="03"
          icon={Recycle}
        />
        <LifecycleCompare kh={kh} t={t} />

        <UpcyclingCallout kh={kh} t={t} />

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

export default MaterialsSciencePage;
