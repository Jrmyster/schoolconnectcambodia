import { useRef, useState } from "react";
import {
  Zap,
  Activity,
  Gauge,
  CircleDashed,
  AlertTriangle,
  Heart,
  Plug,
  Droplets,
  Power,
  HardHat,
  ShieldCheck,
  BatteryCharging,
  FlaskConical,
  Flame,
  Wind,
  LifeBuoy,
  Hand,
  Sun,
  Lightbulb,
  Target,
  Trophy,
  ChevronDown,
  Loader2,
  CheckCircle2,
  Award,
  Trash2,
  Wrench,
  X,
  HelpCircle,
  Search,
  Radio,
  RadioTower,
  Mic,
  Speaker,
  AudioLines,
  Waves,
  RotateCcw,
  Magnet,
  Recycle,
  ShieldAlert,
  Atom,
  Snowflake,
  Sparkles,
  Globe,
  Train,
  Cpu,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";
import { IncandescentBulbSection } from "./ElectricalIncandescentBulbSection";

// ── Core Concept cards (the "Big Three") ────────────────────────────────────

type Concept = {
  icon: React.ElementType;
  symbol: string;
  unit: string;
  termEn: string;
  termKh: string;
  metaphorEn: string;
  metaphorKh: string;
  explainEn: string;
  explainKh: string;
  accent: string; // bg+border accent
  badge: string;
};

const CONCEPTS: Concept[] = [
  {
    icon: Gauge,
    symbol: "V",
    unit: "Volts (V)",
    termEn: "Voltage",
    termKh: "វ៉ុល",
    metaphorEn: "The Pressure",
    metaphorKh: "សម្ពាធ",
    explainEn:
      "Voltage is the electrical 'pressure' that pushes electricity through a wire — just like water pressure pushes water through a pipe. The higher the voltage, the harder the push.",
    explainKh:
      "វ៉ុលគឺជា 'សម្ពាធ' អគ្គិសនី ដែលរុញចរន្តអគ្គិសនីឆ្លងកាត់ខ្សែ — ដូចសម្ពាធទឹករុញទឹកឆ្លងកាត់បំពង់។ វ៉ុលកាន់តែខ្ពស់ ការរុញកាន់តែខ្លាំង។",
    accent: "bg-amber-50 border-amber-200",
    badge: "bg-amber-500 text-white",
  },
  {
    icon: Activity,
    symbol: "I",
    unit: "Amperes (A)",
    termEn: "Current",
    termKh: "ចរន្ត",
    metaphorEn: "The Flow",
    metaphorKh: "លំហូរ",
    explainEn:
      "Current is the actual 'flow' of electricity through the wire — how much electrical charge passes by each second. Like the volume of water flowing through a pipe.",
    explainKh:
      "ចរន្តគឺជា 'លំហូរ' ពិតប្រាកដនៃអគ្គិសនីឆ្លងកាត់ខ្សែ — ចំនួនបន្ទុកអគ្គិសនីដែលឆ្លងកាត់ក្នុងមួយវិនាទី។ ដូចជាបរិមាណទឹកដែលហូរក្នុងបំពង់។",
    accent: "bg-sky-50 border-sky-200",
    badge: "bg-sky-500 text-white",
  },
  {
    icon: CircleDashed,
    symbol: "R",
    unit: "Ohms (Ω)",
    termEn: "Resistance",
    termKh: "រេស៊ីស្តង់",
    metaphorEn: "The Friction",
    metaphorKh: "កកិត",
    explainEn:
      "Resistance is the 'friction' that slows electricity down. A thin or rough wire has high resistance; a thick smooth wire has low resistance. Resistance turns electricity into heat — that's how a light bulb glows.",
    explainKh:
      "រេស៊ីស្តង់គឺជា 'កកិត' ដែលធ្វើឲ្យអគ្គិសនីយឺត។ ខ្សែស្តើងឬគ្រើមមានរេស៊ីស្តង់ខ្ពស់ ខ្សែក្រាស់រលោងមានរេស៊ីស្តង់ទាប។ រេស៊ីស្តង់បំប្លែងអគ្គិសនីទៅជាកំដៅ — នេះជារបៀបអំពូលភ្លើងភ្លឺ។",
    accent: "bg-purple-50 border-purple-200",
    badge: "bg-purple-500 text-white",
  },
];

// ── Safety protocols ────────────────────────────────────────────────────────

type Protocol = {
  icon: React.ElementType;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  whyEn: string;
  whyKh: string;
};

const PROTOCOLS: Protocol[] = [
  {
    icon: Droplets,
    titleEn: "Never touch wires with wet hands",
    titleKh: "កុំប៉ះខ្សែភ្លើងដោយដៃសើមឡើយ",
    bodyEn:
      "Dry your hands completely and stand on a dry surface before handling any electrical equipment.",
    bodyKh:
      "សូមផ្តួលដៃឲ្យស្ងួតទាំងស្រុង ហើយឈរលើផ្ទៃស្ងួត មុនពេលប៉ះឧបករណ៍អគ្គិសនីណាមួយ។",
    whyEn:
      "Water dramatically lowers your skin's resistance, allowing far more deadly current to flow through your body.",
    whyKh:
      "ទឹកបន្ថយរេស៊ីស្តង់ស្បែករបស់អ្នកយ៉ាងខ្លាំង ដោយអនុញ្ញាតឲ្យចរន្តដ៏គ្រោះថ្នាក់ហូរកាត់រាងកាយរបស់អ្នកកាន់តែច្រើន។",
  },
  {
    icon: Power,
    titleEn: "Always turn off the breaker first",
    titleKh: "សូមបិទសៀគ្វីរបង (breaker) ជាមុនជានិច្ច",
    bodyEn:
      "Before working on any wiring, switch off the circuit breaker for that area and verify with a voltage tester that the line is dead.",
    bodyKh:
      "មុននឹងធ្វើការលើខ្សែភ្លើងណាមួយ សូមបិទសៀគ្វីរបងសម្រាប់តំបន់នោះ និងផ្ទៀងផ្ទាត់ដោយឧបករណ៍វាស់វ៉ុលថាខ្សែបានដាច់ពីប្រភពភ្លើង។",
    whyEn:
      "Switching off a single light switch is not enough — the wires can still be live. Only the breaker fully cuts power.",
    whyKh:
      "ការបិទកុងតាក់អំពូលតែមួយមិនគ្រប់គ្រាន់ទេ — ខ្សែអាចនៅតែមានភ្លើង។ មានតែសៀគ្វីរបងប៉ុណ្ណោះដែលផ្តាច់ភ្លើងពេញលេញ។",
  },
  {
    icon: HardHat,
    titleEn: "Use insulated tools and rubber-soled shoes",
    titleKh: "ប្រើឧបករណ៍មានការអ៊ីសូឡង់ និងស្បែកជើងបាតកៅស៊ូ",
    bodyEn:
      "Insulated screwdrivers, pliers, and rubber-soled shoes create a barrier between you and any accidental live contact.",
    bodyKh:
      "កំ​បិត​វីសមានអ៊ីសូឡង់ ដង្កាប់ និងស្បែកជើងបាតកៅស៊ូ បង្កើតរបាំងរវាងអ្នក និងការប៉ះពាល់ខ្សែមានភ្លើងដោយអចេតនា។",
    whyEn:
      "Rubber and proper insulation have extremely high resistance, blocking the flow of current to your body.",
    whyKh:
      "កៅស៊ូ និងការអ៊ីសូឡង់ត្រឹមត្រូវ មានរេស៊ីស្តង់ខ្ពស់ខ្លាំងណាស់ ដោយរារាំងលំហូរនៃចរន្តចូលរាងកាយរបស់អ្នក។",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

// API base — Vite injects the artifact's mount path here (e.g. "/" or "/chuy-sala/").
const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type AwardState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "awarded" }
  | { kind: "alreadyEarned" }
  | { kind: "needLogin" }
  | { kind: "needStudentRole" }
  | { kind: "error"; message: string };

export function ElectricalSafetyPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [hintOpen, setHintOpen] = useState(false);
  const [award, setAward] = useState<AwardState>({ kind: "idle" });
  const [hintOpen3, setHintOpen3] = useState(false);
  const [panicOpen, setPanicOpen] = useState(false);
  const [noLightOpen, setNoLightOpen] = useState(false);
  const [award3, setAward3] = useState<AwardState>({ kind: "idle" });
  // Per-badge in-flight locks: prevents same-tick rapid double-clicks from
  // firing two POSTs (the captured-state check alone is not race-safe).
  const inFlight = useRef<Set<string>>(new Set());

  async function claimBadge(
    badgeType: string,
    setter: (s: AwardState) => void,
  ) {
    if (inFlight.current.has(badgeType)) return;
    inFlight.current.add(badgeType);
    setter({ kind: "loading" });
    try {
      const res = await fetch(`${API_BASE}/api/achievements/award`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ badgeType }),
      });
      if (res.status === 401) return setter({ kind: "needLogin" });
      if (res.status === 403) return setter({ kind: "needStudentRole" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return setter({
          kind: "error",
          message: data?.error || `HTTP ${res.status}`,
        });
      }
      setter(data?.alreadyEarned ? { kind: "alreadyEarned" } : { kind: "awarded" });
    } catch (e) {
      setter({ kind: "error", message: String(e) });
    } finally {
      inFlight.current.delete(badgeType);
    }
  }

  const claimParallelEngineer = () => claimBadge("parallel-engineer", setAward);
  const claimSafetyInspector = () => claimBadge("safety-inspector", setAward3);

  const heading = (en: string, khText: string) =>
    kh ? <span className="font-khmer">{khText}</span> : <span>{en}</span>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-sky-50/40">
      {/* Hero ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 mb-4 shadow-sm">
          <Zap className="w-8 h-8 text-amber-600" />
        </div>
        <h1
          className={`text-3xl sm:text-4xl font-bold text-amber-900 mb-3 ${
            kh ? "font-khmer leading-snug" : "font-display"
          }`}
        >
          {t("Electrical Safety & Science", "វិទ្យាសាស្ត្រ និងសុវត្ថិភាពអគ្គិសនី")}
        </h1>
        <p
          className={`text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto ${
            kh ? "font-khmer leading-relaxed" : ""
          }`}
        >
          {t(
            "Understand the invisible force that powers your home — and learn the rules that keep you safe around it.",
            "ស្វែងយល់អំពីកម្លាំងដែលមើលមិនឃើញ ដែលផ្តល់ថាមពលដល់ផ្ទះរបស់អ្នក — ហើយរៀនច្បាប់ដែលរក្សាអ្នកឲ្យមានសុវត្ថិភាព។",
          )}
        </p>
      </section>

      {/* ── Section 1: The Big Three ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <span
            className={`inline-block text-xs font-bold tracking-widest uppercase text-amber-700 mb-2 ${
              kh ? "font-khmer normal-case tracking-normal text-sm" : ""
            }`}
          >
            {t("Core Concepts", "គោលគំនិតស្នូល")}
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-bold ${
              kh ? "font-khmer" : "font-display"
            }`}
          >
            {t('The "Big Three"', "បីយ៉ាងសំខាន់")}
          </h2>
          <p
            className={`mt-2 text-sm text-muted-foreground max-w-xl mx-auto ${
              kh ? "font-khmer leading-relaxed" : ""
            }`}
          >
            {t(
              "Every electrical circuit can be understood through three quantities — and a simple water analogy.",
              "សៀគ្វីអគ្គិសនីគ្រប់ប្រភេទអាចត្រូវបានយល់តាមរយៈបរិមាណបីយ៉ាង — ព្រមទាំងការប្រៀបធៀបទឹកដ៏សាមញ្ញ។",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CONCEPTS.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.symbol}
                className={`relative rounded-3xl border-2 ${c.accent} p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${c.badge} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground/80">{c.symbol}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      {c.unit}
                    </div>
                  </div>
                </div>

                <h3
                  className={`text-xl font-bold mb-1 ${kh ? "font-khmer" : ""}`}
                >
                  {kh ? c.termKh : c.termEn}
                  <span className={`block text-xs font-normal text-muted-foreground mt-1 ${kh ? "" : "italic"}`}>
                    {kh ? c.termEn : c.termKh}
                  </span>
                </h3>

                <p
                  className={`text-sm font-bold text-foreground/90 mb-3 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  → {kh ? c.metaphorKh : c.metaphorEn}
                </p>

                <p
                  className={`text-sm text-foreground/80 leading-relaxed ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  {kh ? c.explainKh : c.explainEn}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Section 2: Circuit Basics ────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6 items-center">
            <div>
              <span
                className={`inline-block text-xs font-bold tracking-widest uppercase text-sky-700 mb-2 ${
                  kh ? "font-khmer normal-case tracking-normal text-sm" : ""
                }`}
              >
                {t("Circuit Basics", "មូលដ្ឋានសៀគ្វី")}
              </span>
              <h2
                className={`text-2xl sm:text-3xl font-bold mb-3 ${
                  kh ? "font-khmer" : "font-display"
                }`}
              >
                {t("Electricity needs a closed loop", "អគ្គិសនីត្រូវការរង្វិលជុំបិទ")}
              </h2>
              <p
                className={`text-sm sm:text-base text-foreground/80 leading-relaxed mb-3 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "A circuit is a complete path that electricity can travel along: out from the power source (battery or wall outlet), through a device (a light bulb, a phone charger), and back to the source.",
                  "សៀគ្វីគឺជាផ្លូវពេញលេញដែលអគ្គិសនីអាចធ្វើដំណើរ៖ ចេញពីប្រភពថាមពល (ថ្មឬដោតភ្លើងជញ្ជាំង) ឆ្លងកាត់ឧបករណ៍មួយ (អំពូលភ្លើង ឬ adapter ទូរស័ព្ទ) រួចត្រឡប់មកប្រភពវិញ។",
                )}
              </p>
              <p
                className={`text-sm sm:text-base text-foreground/80 leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "If the loop is broken — by a switch, a cut wire, or a missing battery — no electricity flows. That's why your light goes off the moment you flip the switch.",
                  "ប្រសិនបើរង្វិលជុំត្រូវដាច់ — ដោយកុងតាក់ ខ្សែដាច់ ឬគ្មានថ្ម — អគ្គិសនីមិនហូរទេ។ នេះជាមូលហេតុដែលអំពូលភ្លើងរបស់អ្នករលត់ភ្លាមនៅពេលអ្នកបិទកុងតាក់។",
                )}
              </p>
            </div>

            {/* Decorative SVG circuit diagram */}
            <div className="flex justify-center md:justify-end">
              <svg
                viewBox="0 0 200 160"
                className="w-48 h-40 text-sky-600"
                aria-hidden="true"
              >
                {/* Wire loop */}
                <rect
                  x="20" y="30" width="160" height="100" rx="8"
                  fill="none" stroke="currentColor" strokeWidth="3"
                />
                {/* Battery */}
                <line x1="60" y1="30" x2="60" y2="20" stroke="currentColor" strokeWidth="3" />
                <line x1="80" y1="30" x2="80" y2="14" stroke="currentColor" strokeWidth="3" />
                <text x="65" y="12" className="text-[8px]" fill="currentColor">+</text>
                <text x="50" y="18" className="text-[8px]" fill="currentColor">−</text>
                {/* Bulb */}
                <circle cx="140" cy="80" r="14" fill="#fef3c7" stroke="currentColor" strokeWidth="2.5" />
                <line x1="132" y1="92" x2="132" y2="100" stroke="currentColor" strokeWidth="2" />
                <line x1="148" y1="92" x2="148" y2="100" stroke="currentColor" strokeWidth="2" />
                {/* Switch */}
                <line x1="40" y1="130" x2="55" y2="118" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <circle cx="40" cy="130" r="3" fill="currentColor" />
                <circle cx="60" cy="130" r="3" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: The Danger Zone ───────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div
          className="rounded-3xl bg-red-50 border-2 border-red-300 shadow-md overflow-hidden"
          role="region"
          aria-labelledby="danger-zone-heading"
        >
          {/* Red banner */}
          <div className="bg-red-600 text-white px-6 py-4 flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 flex-shrink-0" aria-hidden="true" />
            <div>
              <p
                className={`text-[10px] font-bold tracking-widest uppercase text-red-100 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Warning — Read Carefully", "ការព្រមាន — សូមអានដោយប្រុងប្រយ័ត្ន")}
              </p>
              <h2
                id="danger-zone-heading"
                className={`text-xl sm:text-2xl font-bold ${
                  kh ? "font-khmer" : "font-display"
                }`}
              >
                {t("The Danger Zone", "តំបន់គ្រោះថ្នាក់")}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            {/* Heart-current fact */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className={`text-base font-bold text-red-900 mb-1 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Tiny currents can stop your heart",
                    "ចរន្តតិចតួចអាចបញ្ឈប់បេះដូងរបស់អ្នកបាន",
                  )}
                </h3>
                <p
                  className={`text-sm text-foreground/80 leading-relaxed ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  {t(
                    "Around 30 milliamps (0.03 A) crossing the chest can already trigger ventricular fibrillation — a chaotic heart rhythm that is fatal within minutes without help. By 75–100 mA the risk becomes severe. For comparison, a smartphone charger normally draws thousands of milliamps from the wall.",
                    "ប្រហែល ៣០ milliamp (០.០៣ A) ដែលឆ្លងកាត់ទ្រូង អាចបង្កឲ្យកើត ventricular fibrillation — ចង្វាក់បេះដូងច្របូកច្របល់ដែលបណ្តាលឲ្យស្លាប់ក្នុងពេលប៉ុន្មាននាទី ប្រសិនបើគ្មានជំនួយ។ នៅ ៧៥–១០០ mA គ្រោះថ្នាក់កាន់តែធ្ងន់ធ្ងរ។ ប្រៀបធៀប៖ adapter សាកទូរស័ព្ទធម្មតាស្រូបចរន្តរាប់ពាន់ milliamp ពីដោតភ្លើងជញ្ជាំង។",
                  )}
                </p>
              </div>
            </div>

            {/* 220V outlet warning */}
            <div className="flex items-start gap-4 pt-4 border-t border-red-200">
              <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0">
                <Plug className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className={`text-base font-bold text-red-900 mb-1 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t(
                    "Cambodian wall outlets carry ~220 V — extremely dangerous",
                    "ដោតភ្លើងជញ្ជាំងនៅកម្ពុជាមាន ~២២០ វ៉ុល — គ្រោះថ្នាក់ខ្លាំងណាស់",
                  )}
                </h3>
                <p
                  className={`text-sm text-foreground/80 leading-relaxed ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  {t(
                    "Standard outlets in Cambodia operate at 220 volts. That voltage easily pushes more than enough current through a person to cause severe burns, muscle paralysis, or death. Never insert objects (keys, wires, paperclips) into an outlet, and never let children play near them.",
                    "ដោតភ្លើងស្តង់ដារនៅកម្ពុជាដំណើរការនៅ ២២០ វ៉ុល។ វ៉ុលនោះអាចរុញចរន្តគ្រប់គ្រាន់ឆ្លងកាត់មនុស្សម្នាក់ យ៉ាងងាយស្រួល ដែលបណ្តាលឲ្យកើតរលាកខ្លាំង ពិការសាច់ដុំ ឬស្លាប់។ កុំបញ្ចូលវត្ថុ (កូនសោ ខ្សែ ឬឃ្លីបក្រដាស) ចូលក្នុងដោតភ្លើងឡើយ ហើយកុំឲ្យកុមារលេងជិតវាដែរ។",
                  )}
                </p>
              </div>
            </div>

            {/* Memorable summary */}
            <div className="bg-red-100 rounded-2xl px-5 py-4 mt-2">
              <p
                className={`text-sm font-bold text-red-900 ${
                  kh ? "font-khmer leading-loose" : "leading-relaxed"
                }`}
              >
                {t(
                  "Remember: it is the CURRENT (amps) that kills, but it is the VOLTAGE that drives that current through your body. 220 V is more than enough.",
                  "សូមចងចាំ៖ ចរន្ត (amp) ជាអ្វីដែលសម្លាប់ ប៉ុន្តែវ៉ុលគឺជាអ្វីដែលរុញចរន្តនោះកាត់រាងកាយរបស់អ្នក។ ២២០ វ៉ុលគឺច្រើនជាងគ្រប់គ្រាន់។",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Module: The Incandescent Bulb — Let There Be Light ───────────── */}
      <IncandescentBulbSection kh={kh} />

      {/* ── Section 4: Safety Protocols ──────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-emerald-700 mb-2 ${
              kh ? "font-khmer normal-case tracking-normal text-sm" : ""
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            {t("Safety Protocols", "ពិធីការសុវត្ថិភាព")}
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-bold ${
              kh ? "font-khmer" : "font-display"
            }`}
          >
            {t("How to Protect Yourself", "របៀបការពារខ្លួនអ្នក")}
          </h2>
        </div>

        <ol className="space-y-4">
          {PROTOCOLS.map((p, i) => {
            const Icon = p.icon;
            return (
              <li
                key={p.titleEn}
                className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-5 sm:p-6 flex items-start gap-4"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="mt-2 text-xs font-bold text-emerald-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-base sm:text-lg font-bold mb-1 ${
                      kh ? "font-khmer" : ""
                    }`}
                  >
                    {kh ? p.titleKh : p.titleEn}
                  </h3>
                  <p
                    className={`text-sm text-foreground/80 mb-2 leading-relaxed ${
                      kh ? "font-khmer leading-loose" : ""
                    }`}
                  >
                    {kh ? p.bodyKh : p.bodyEn}
                  </p>
                  <p
                    className={`text-xs text-emerald-800 bg-emerald-50 rounded-lg px-3 py-2 leading-relaxed ${
                      kh ? "font-khmer leading-loose" : ""
                    }`}
                  >
                    <span className="font-bold">
                      {t("Why: ", "មូលហេតុ៖ ")}
                    </span>
                    {kh ? p.whyKh : p.whyEn}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

      </section>

      {/* ── Section 5: AC vs DC & Battery Safety ─────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-8">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-indigo-700 mb-2 ${
              kh ? "font-khmer normal-case tracking-normal text-sm" : ""
            }`}
          >
            <BatteryCharging className="w-4 h-4" />
            {t("Going Deeper", "ស្វែងយល់បន្ថែម")}
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-bold ${
              kh ? "font-khmer" : "font-display"
            }`}
          >
            {t(
              "AC vs. DC & Battery Safety",
              "ចរន្តជាប់ ចរន្តឆ្លាស់ និងសុវត្ថិភាពអាគុយ",
            )}
          </h2>
        </div>

        {/* AC vs DC comparison ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
          {/* DC card */}
          <article className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <Sun className="w-6 h-6" />
              </div>
              {/* DC symbol: equals sign */}
              <div
                className="font-mono text-4xl font-bold text-indigo-700 leading-none select-none"
                aria-label={t("DC symbol", "និមិត្តសញ្ញា DC")}
                role="img"
              >
                =
              </div>
            </div>
            <h3 className={`text-xl font-bold mb-1 ${kh ? "font-khmer" : ""}`}>
              {t("Direct Current (DC)", "ចរន្តជាប់ (DC)")}
              <span
                className={`block text-xs font-normal text-muted-foreground mt-1 ${
                  kh ? "" : "italic"
                }`}
              >
                {kh ? "Direct Current (DC)" : "ចរន្តជាប់"}
              </span>
            </h3>
            <p
              className={`text-sm font-bold text-foreground/90 mb-3 ${
                kh ? "font-khmer" : ""
              }`}
            >
              → {t("Flows in one direction — like a river", "ហូរទៅទិសតែមួយ — ដូចជាទន្លេ")}
            </p>
            <p
              className={`text-sm text-foreground/80 leading-relaxed ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "DC is what batteries, solar panels, and most small electronics produce. The current always travels from the + terminal, through the device, and back to the − terminal. It is steady and predictable.",
                "DC គឺជាអ្វីដែលអាគុយ ផ្ទាំងសូឡា និងឧបករណ៍អេឡិចត្រូនិកតូចៗភាគច្រើនផលិត។ ចរន្តតែងតែដើរពីកំពូល + ឆ្លងកាត់ឧបករណ៍ ហើយត្រឡប់មកកំពូល − វិញ។ វាមានស្ថេរភាព និងអាចព្យាករបាន។",
              )}
            </p>
          </article>

          {/* AC card */}
          <article className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-sm">
                <Activity className="w-6 h-6" />
              </div>
              {/* AC symbol: tilde */}
              <div
                className="font-mono text-4xl font-bold text-rose-700 leading-none select-none"
                aria-label={t("AC symbol", "និមិត្តសញ្ញា AC")}
                role="img"
              >
                ∼
              </div>
            </div>
            <h3 className={`text-xl font-bold mb-1 ${kh ? "font-khmer" : ""}`}>
              {t("Alternating Current (AC)", "ចរន្តឆ្លាស់ (AC)")}
              <span
                className={`block text-xs font-normal text-muted-foreground mt-1 ${
                  kh ? "" : "italic"
                }`}
              >
                {kh ? "Alternating Current (AC)" : "ចរន្តឆ្លាស់"}
              </span>
            </h3>
            <p
              className={`text-sm font-bold text-foreground/90 mb-3 ${
                kh ? "font-khmer" : ""
              }`}
            >
              → {t("Switches direction many times per second", "ប្តូរទិសច្រើនដងក្នុងមួយវិនាទី")}
            </p>
            <p
              className={`text-sm text-foreground/80 leading-relaxed ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "AC is what arrives through the big power lines and your wall outlets. In Cambodia it switches direction 50 times every second (50 Hz). AC is efficient to send over long distances, but more dangerous to touch than low-voltage DC.",
                "AC គឺជាអ្វីដែលមកដល់តាមខ្សែបណ្តាញអគ្គិសនីធំៗ និងដោតភ្លើងជញ្ជាំងរបស់អ្នក។ នៅកម្ពុជាវាប្តូរទិស ៥០ ដងក្នុងមួយវិនាទី (៥០ Hz)។ AC មានប្រសិទ្ធភាពក្នុងការបញ្ជូនចម្ងាយឆ្ងាយ ប៉ុន្តែគ្រោះថ្នាក់ខ្លាំងជាង DC វ៉ុលទាប នៅពេលប៉ះវា។",
              )}
            </p>
          </article>
        </div>

        {/* Battery Safety ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-amber-200 shadow-sm p-6 sm:p-8 mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <div>
              <span
                className={`block text-xs font-bold tracking-widest uppercase text-amber-700 ${
                  kh ? "font-khmer normal-case tracking-normal text-sm" : ""
                }`}
              >
                {t("Chemical Energy", "ថាមពលគីមី")}
              </span>
              <h3
                className={`text-xl sm:text-2xl font-bold ${
                  kh ? "font-khmer" : "font-display"
                }`}
              >
                {t("Battery Safety Map", "ផែនទីសុវត្ថិភាពអាគុយ")}
              </h3>
            </div>
          </div>

          <p
            className={`text-sm text-foreground/80 leading-relaxed mb-5 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Batteries store energy as chemicals. That makes them small and portable, but also means they can leak, burn, or explode if abused.",
              "អាគុយផ្ទុកថាមពលជាគីមី។ វាធ្វើឲ្យពួកវាតូច និងងាយចល័ត ប៉ុន្តែក៏មានន័យថាពួកវាអាចលេចធ្លាយ ឆេះ ឬផ្ទុះ ប្រសិនបើគេប្រើខុស។",
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Acid warning */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <FlaskConical className="w-5 h-5 text-amber-700 flex-shrink-0" />
                <h4
                  className={`text-sm font-bold text-amber-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Corrosive Acid", "អាស៊ីតកាត់")}
                </h4>
              </div>
              <p
                className={`text-xs text-foreground/80 leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "Large batteries — especially lead-acid car batteries — contain sulfuric acid that can burn your skin and blind your eyes. If you see white powder around the terminals or any liquid leaking, do not touch it with bare hands. Wear gloves and eye protection.",
                  "អាគុយធំៗ — ជាពិសេសអាគុយឡានសំណរ-អាស៊ីត — មានអាស៊ីតស៊ុលហ្វួរិកដែលអាចរលាកស្បែករបស់អ្នក និងធ្វើឲ្យភ្នែកអ្នកខូច។ បើអ្នកឃើញម្សៅស ៗ ជុំវិញកំពូល ឬមានសារធាតុរាវលេចធ្លាយ កុំប៉ះវាដោយដៃទទេ។ សូមពាក់ស្រោមដៃ និងកញ្ចក់ការពារភ្នែក។",
                )}
              </p>
            </div>

            {/* Short circuit */}
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-orange-700 flex-shrink-0" />
                <h4
                  className={`text-sm font-bold text-orange-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Short-Circuit Risk", "ហានិភ័យសៀគ្វីខ្លី")}
                </h4>
              </div>
              <p
                className={`text-xs text-foreground/80 leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "Letting a metal tool — a screwdriver, wrench, or even a bracelet — touch both battery terminals at once creates a short circuit. The battery dumps all its energy through the metal in a fraction of a second, causing huge sparks, melted metal, fire, or even an explosion.",
                  "ប្រសិនបើទុកឲ្យឧបករណ៍ដែក — កំ​បិត​វីស ឧបករណ៍មានកាំ ឬសូម្បីខ្សែដៃ — ប៉ះកំពូលអាគុយទាំងពីរក្នុងពេលតែមួយ វាបង្កើតសៀគ្វីខ្លី។ អាគុយបញ្ចេញថាមពលទាំងអស់របស់វាឆ្លងកាត់ដែកក្នុងរយៈពេលខ្លីបំផុត ដែលបង្កឲ្យមានផ្កាភ្លើងធំ ដែករលាយ ភ្លើងឆេះ ឬសូម្បីការផ្ទុះ។",
                )}
              </p>
            </div>

            {/* Ventilation */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-5 h-5 text-sky-700 flex-shrink-0" />
                <h4
                  className={`text-sm font-bold text-sky-900 ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {t("Always Ventilate", "តែងតែបញ្ចេញខ្យល់")}
                </h4>
              </div>
              <p
                className={`text-xs text-foreground/80 leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "Charging batteries can release invisible, odourless, explosive gases — especially hydrogen from lead-acid batteries. Always charge in a well-ventilated room with the windows open. Never charge in a closed bedroom or under a blanket, and keep flames or sparks away.",
                  "ការសាកអាគុយអាចបញ្ចេញឧស្ម័នផ្ទុះ ដែលមើលមិនឃើញ និងគ្មានក្លិន — ជាពិសេសអ៊ីដ្រូសែនពីអាគុយសំណរ-អាស៊ីត។ សូមសាកនៅក្នុងបន្ទប់ដែលមានខ្យល់ចេញចូលបាន និងបើកបង្អួច។ កុំសាកនៅក្នុងបន្ទប់គេងបិទជិត ឬនៅក្រោមភួយ ហើយរក្សាភ្លើង ឬផ្កាភ្លើងឲ្យឆ្ងាយ។",
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Emergency: someone is shocked ─────────────────────────────────── */}
        <div
          className="rounded-3xl bg-red-50 border-2 border-red-300 shadow-md overflow-hidden"
          role="region"
          aria-labelledby="rescue-heading"
        >
          <div className="bg-red-700 text-white px-6 py-4 flex items-center gap-3">
            <LifeBuoy className="w-7 h-7 flex-shrink-0" aria-hidden="true" />
            <div>
              <p
                className={`text-[10px] font-bold tracking-widest uppercase text-red-100 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Emergency", "សង្គ្រោះបន្ទាន់")}
              </p>
              <h3
                id="rescue-heading"
                className={`text-xl sm:text-2xl font-bold ${
                  kh ? "font-khmer" : "font-display"
                }`}
              >
                {t(
                  "What to do if someone is shocked",
                  "ត្រូវធ្វើដូចម្ដេច បើអ្នកណាម្នាក់ត្រូវឆក់ភ្លើង",
                )}
              </h3>
            </div>
          </div>

          <ol className="p-6 sm:p-8 space-y-0 list-none">
            {[
              {
                icon: Hand,
                titleEn: "DO NOT touch them with your bare hands",
                titleKh: "កុំ​ប៉ះ​ពួក​គេ​ដោយ​ដៃ​ទទេ",
                bodyEn:
                  "If they are still in contact with the power source, electricity is flowing through them — and it will flow through you the moment you touch them. You will become a second victim, not a rescuer.",
                bodyKh:
                  "ប្រសិនបើពួកគេនៅតែប៉ះប្រភពភ្លើង អគ្គិសនីកំពុងហូរកាត់ពួកគេ — ហើយវានឹងហូរកាត់អ្នកនៅពេលអ្នកប៉ះពួកគេ។ អ្នកនឹងក្លាយជាជនរងគ្រោះទីពីរ មិនមែនជាអ្នកសង្គ្រោះទេ។",
              },
              {
                icon: Power,
                titleEn: "Cut the power, or push them away with a DRY wooden stick",
                titleKh: "ផ្តាច់ភ្លើង ឬរុញពួកគេឲ្យឃ្លាតដោយដំបងឈើ​ស្ងួត",
                bodyEn:
                  "First try to flip the breaker or unplug the device. If you cannot reach the breaker, use a DRY wooden broomstick, plastic chair, or thick rubber object to push the person away from the wire. Never use anything wet or metal — it will conduct the electricity straight back into you.",
                bodyKh:
                  "ដំបូងសូមព្យាយាមបិទសៀគ្វីរបង ឬដកដោតភ្លើងចេញ។ ប្រសិនបើអ្នកមិនអាចទៅដល់សៀគ្វីរបង សូមប្រើដំបងបោសឈើ​ស្ងួត កៅអីប្លាស្ទិក ឬវត្ថុកៅស៊ូក្រាស់ ដើម្បីរុញមនុស្សនោះឲ្យឃ្លាតពីខ្សែ។ កុំប្រើវត្ថុសើម ឬដែកឡើយ — វានឹងបញ្ជូនអគ្គិសនីត្រឡប់មកអ្នកវិញ។",
              },
              {
                icon: Heart,
                titleEn: "Then call for medical help",
                titleKh: "បន្ទាប់មកសូមហៅជំនួយវេជ្ជសាស្ត្រ",
                bodyEn:
                  "Once the person is clear of the power source, call emergency services (119 in Cambodia). Even if they look fine, electric shock can stop the heart hours later — they need to be checked by a doctor.",
                bodyKh:
                  "នៅពេលមនុស្សនោះឃ្លាតពីប្រភពភ្លើងហើយ សូមហៅសេវាសង្គ្រោះបន្ទាន់ (១១៩ នៅកម្ពុជា)។ ទោះបីពួកគេមើលទៅធម្មតា ការឆក់ភ្លើងអាចបញ្ឈប់បេះដូងបានច្រើនម៉ោងក្រោយ — ពួកគេត្រូវបានគ្រូពេទ្យពិនិត្យ។",
              },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.titleEn}
                  className={`flex items-start gap-4 ${
                    i > 0 ? "pt-4 mt-4 border-t border-red-200" : ""
                  }`}
                >
                  <div className="w-11 h-11 rounded-2xl bg-red-200 text-red-800 flex items-center justify-center flex-shrink-0 relative">
                    <Icon className="w-5 h-5" />
                    <span
                      className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-red-700 text-white text-[10px] font-bold flex items-center justify-center shadow"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h4
                      className={`text-base font-bold text-red-900 mb-1 ${
                        kh ? "font-khmer" : ""
                      }`}
                    >
                      {kh ? step.titleKh : step.titleEn}
                    </h4>
                    <p
                      className={`text-sm text-foreground/80 leading-relaxed ${
                        kh ? "font-khmer leading-loose" : ""
                      }`}
                    >
                      {kh ? step.bodyKh : step.bodyEn}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

      </section>

      {/* ── Section 6: Virtual Circuit Lab (PhET embed) ──────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-6">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-teal-700 mb-2 ${
              kh ? "font-khmer normal-case tracking-normal text-sm" : ""
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            {t("Hands-On", "អនុវត្តដោយផ្ទាល់")}
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-bold ${
              kh ? "font-khmer" : "font-display"
            }`}
          >
            {t("Virtual Circuit Lab", "មន្ទីរពិសោធន៍សៀគ្វីនិម្មិត")}
          </h2>
          <p
            className={`mt-3 text-sm sm:text-base text-foreground/80 max-w-3xl mx-auto leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Practice building circuits here! You can test batteries, wires, and bulbs safely before trying it in real life.",
              "អនុវត្តការបង្កើតសៀគ្វីនៅទីនេះ! អ្នកអាចសាកល្បងថ្ម ខ្សែភ្លើង និងអំពូលដោយសុវត្ថិភាព មុននឹងសាកល្បងវាក្នុងជីវិតពិត។",
            )}
          </p>
        </div>

        {/* Responsive iframe container ─────────────────────────────────── */}
        <div className="rounded-3xl border-2 border-teal-200 bg-white shadow-md overflow-hidden">
          <div className="bg-teal-50 border-b border-teal-200 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-teal-800">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span
                className={`text-xs sm:text-sm font-semibold ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t("Safe Sandbox — no real electricity", "កន្លែងសាកល្បងសុវត្ថិភាព — គ្មានអគ្គិសនីពិតទេ")}
              </span>
            </div>
            <a
              href="https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_all.html"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-semibold text-teal-700 hover:text-teal-900 underline underline-offset-2 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t("Open in new tab ↗", "បើកក្នុង tab ថ្មី ↗")}
            </a>
          </div>

          <div className="relative w-full aspect-[16/10] min-h-[420px] sm:min-h-[520px] bg-slate-100">
            <iframe
              src="https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_all.html"
              title={t(
                "PhET Circuit Construction Kit: DC",
                "PhET ឧបករណ៍សាងសង់សៀគ្វី៖ DC",
              )}
              className="absolute inset-0 w-full h-full border-0"
              allow="fullscreen"
              loading="lazy"
            />
          </div>
        </div>

        {/* ── Bilingual Lab Glossary ─────────────────────────────────── */}
        <LabGlossary t={t} kh={kh} />

        {/* ── Lab Assistant: Troubleshooting Menu ─────────────────────── */}
        <div className="mt-5 rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50/40 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div
                className={`text-[10px] font-bold tracking-widest uppercase text-slate-700 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Lab Assistant — Troubleshooting", "ជំនួយការមន្ទីរពិសោធន៍ — ការដោះស្រាយបញ្ហា")}
              </div>
              <div
                className={`text-sm text-slate-700 leading-snug ${
                  kh ? "font-khmer leading-relaxed" : ""
                }`}
              >
                {t(
                  "Pick the problem you're seeing in the simulator and I'll explain how to fix it.",
                  "ជ្រើសរើសបញ្ហាដែលអ្នកកំពុងឃើញក្នុងការសាកល្បង នោះខ្ញុំនឹងពន្យល់របៀបជួសជុល។",
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPanicOpen(true)}
              className={`group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-lg shadow-rose-500/30 ring-2 ring-rose-300/60 transition-all active:scale-95 text-sm sm:text-base ${
                kh ? "font-khmer" : ""
              }`}
              aria-haspopup="dialog"
              aria-expanded={panicOpen}
            >
              <Flame className="w-5 h-5 text-amber-200 group-hover:text-amber-100 animate-pulse flex-shrink-0" />
              <span className="text-center">
                {t("Help! My battery is on fire!", "ជួយផង! ថ្មរបស់ខ្ញុំកំពុងឆេះ!")}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setNoLightOpen(true)}
              className={`group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold shadow-lg shadow-amber-400/30 ring-2 ring-amber-300/60 transition-all active:scale-95 text-sm sm:text-base ${
                kh ? "font-khmer" : ""
              }`}
              aria-haspopup="dialog"
              aria-expanded={noLightOpen}
            >
              <HelpCircle className="w-5 h-5 text-amber-900 flex-shrink-0" />
              <span className="text-center">
                {t("Why didn't my bulb light up?", "ហេតុអ្វីបានជាអំពូលរបស់ខ្ញុំមិនភ្លឺ?")}
              </span>
            </button>
          </div>
        </div>

        {/* ── Lab Assistant: Diagnostic Modal ─────────────────────────── */}
        {panicOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lab-assistant-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setPanicOpen(false);
            }}
          >
            <div className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-rose-200 shadow-2xl overflow-hidden animate-in zoom-in-95">
              {/* Top accent strip */}
              <div className="h-1.5 bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400" />

              {/* Close X */}
              <button
                type="button"
                onClick={() => setPanicOpen(false)}
                aria-label={t("Close", "បិទ")}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="px-5 sm:px-6 pt-6 pb-4 flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0 ring-2 ring-rose-200">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <div
                    className={`text-[10px] font-bold tracking-widest uppercase text-rose-600 mb-0.5 ${
                      kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                    }`}
                  >
                    {t("Friendly Diagnosis", "ការវិភាគដោយមិត្តភាព")}
                  </div>
                  <h3
                    id="lab-assistant-title"
                    className={`text-lg sm:text-xl font-bold text-rose-900 leading-snug ${
                      kh ? "font-khmer leading-relaxed" : "font-display"
                    }`}
                  >
                    {t(
                      "You Created a Short Circuit!",
                      "អ្នកបានបង្កើតសៀគ្វីខ្លី!",
                    )}
                  </h3>
                </div>
              </div>

              {/* Explanation */}
              <div className="px-5 sm:px-6 pb-5">
                <p
                  className={`text-sm sm:text-[15px] text-slate-700 leading-relaxed ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  {t(
                    "Electricity is lazy; it always takes the easiest path. You created a path with zero resistance (a wire going straight from one end of the battery to the other, bypassing the bulb). This causes massive current, which creates extreme heat and fire!",
                    "អគ្គិសនីតែងតែឆ្លងកាត់ផ្លូវដែលងាយស្រួលបំផុត។ អ្នកបានបង្កើតផ្លូវដែលគ្មានរេស៊ីស្តង់ (ខ្សែភ្លើងរត់ត្រង់ពីចុងម្ខាងនៃថ្មទៅចុងម្ខាងទៀត ដោយរំលងអំពូល)។ នេះបណ្តាលឱ្យមានចរន្តអគ្គិសនីឆ្លងកាត់យ៉ាងច្រើន ដែលបង្កើតកម្ដៅខ្លាំង និងបង្កជាភ្លើង!",
                  )}
                </p>
              </div>

              {/* Next Steps */}
              <div className="mx-5 sm:mx-6 mb-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Wrench className="w-3.5 h-3.5" />
                  </div>
                  <h4
                    className={`text-sm font-bold text-emerald-900 ${
                      kh ? "font-khmer" : ""
                    }`}
                  >
                    {t("Next Steps", "ជំហានបន្ទាប់")}
                  </h4>
                </div>
                <ol className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-emerald-400 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      1
                    </span>
                    <span
                      className={`text-sm text-emerald-900/90 leading-relaxed flex items-center gap-1.5 flex-wrap ${
                        kh ? "font-khmer leading-loose" : ""
                      }`}
                    >
                      {t(
                        "Click the",
                        "ចុចលើរូប",
                      )}{" "}
                      <Trash2 className="inline w-4 h-4 text-rose-600" />{" "}
                      {t(
                        "trash can icon on the wire that caused the fire.",
                        "ធុងសំរាមនៅលើខ្សែភ្លើងដែលបង្កឱ្យឆេះ។",
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-emerald-400 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      2
                    </span>
                    <span
                      className={`text-sm text-emerald-900/90 leading-relaxed ${
                        kh ? "font-khmer leading-loose" : ""
                      }`}
                    >
                      {t(
                        "Make sure the electricity has to travel THROUGH the lightbulb to get back to the battery.",
                        "ត្រូវប្រាកដថា អគ្គិសនីត្រូវតែឆ្លងកាត់ អំពូលភ្លើង មុននឹងវិលទៅកាន់ថ្មវិញ។",
                      )}
                    </span>
                  </li>
                </ol>
              </div>

              {/* Footer button */}
              <div className="px-5 sm:px-6 pb-5">
                <button
                  type="button"
                  onClick={() => setPanicOpen(false)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md transition-all active:scale-95 ${
                    kh ? "font-khmer" : ""
                  }`}
                  autoFocus
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {t("Got it!", "យល់ហើយ!")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Lab Assistant: "No Light" Diagnostic Modal ──────────────── */}
        {noLightOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="no-light-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setNoLightOpen(false);
            }}
          >
            <div className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-amber-200 shadow-2xl overflow-hidden animate-in zoom-in-95">
              {/* Top accent strip */}
              <div className="h-1.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500" />

              {/* Close X */}
              <button
                type="button"
                onClick={() => setNoLightOpen(false)}
                aria-label={t("Close", "បិទ")}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="px-5 sm:px-6 pt-6 pb-4 flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 ring-2 ring-amber-200">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <div
                    className={`text-[10px] font-bold tracking-widest uppercase text-amber-700 mb-0.5 ${
                      kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                    }`}
                  >
                    {t("Friendly Diagnosis", "ការវិភាគដោយមិត្តភាព")}
                  </div>
                  <h3
                    id="no-light-title"
                    className={`text-lg sm:text-xl font-bold text-amber-900 leading-snug ${
                      kh ? "font-khmer leading-relaxed" : "font-display"
                    }`}
                  >
                    {t(
                      "You Have an Open Circuit!",
                      "អ្នកមានសៀគ្វីចំហ!",
                    )}
                  </h3>
                </div>
              </div>

              {/* Explanation */}
              <div className="px-5 sm:px-6 pb-5">
                <p
                  className={`text-sm sm:text-[15px] text-slate-700 leading-relaxed ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  {t(
                    "Electricity needs a complete, unbroken circle to flow. If there is even a tiny gap in the wire, or if a switch is open, the electrons cannot jump across the empty space. The flow stops entirely!",
                    "អគ្គិសនីត្រូវការរង្វង់ពេញលេញ និងមិនដាច់ ដើម្បីហូរ។ ប្រសិនបើមានចន្លោះប្រហោងសូម្បីតែបន្តិចនៅក្នុងខ្សែភ្លើង ឬប្រសិនបើកុងតាក់ត្រូវបានបើក (ផ្តាច់) អេឡិចត្រុងមិនអាចលោតឆ្លងកាត់លំហទទេនោះទេ។ ចរន្តនឹងឈប់ទាំងស្រុង!",
                  )}
                </p>
              </div>

              {/* Next Steps */}
              <div className="mx-5 sm:mx-6 mb-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Wrench className="w-3.5 h-3.5" />
                  </div>
                  <h4
                    className={`text-sm font-bold text-emerald-900 ${
                      kh ? "font-khmer" : ""
                    }`}
                  >
                    {t("Next Steps", "ជំហានបន្ទាប់")}
                  </h4>
                </div>
                <ol className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-emerald-400 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      1
                    </span>
                    <span
                      className={`text-sm text-emerald-900/90 leading-relaxed ${
                        kh ? "font-khmer leading-loose" : ""
                      }`}
                    >
                      {t(
                        "Trace the path with your finger from the negative side of the battery all the way to the positive side.",
                        "ប្រើម្រាមដៃរបស់អ្នកតាមដានផ្លូវ ពីផ្នែកអវិជ្ជមាននៃថ្ម រហូតដល់ផ្នែកវិជ្ជមាន។",
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-emerald-400 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      2
                    </span>
                    <span
                      className={`text-sm text-emerald-900/90 leading-relaxed ${
                        kh ? "font-khmer leading-loose" : ""
                      }`}
                    >
                      {t(
                        "Make sure wires are touching the metal contacts on the bulb, not just the glass!",
                        "ត្រូវប្រាកដថាខ្សែភ្លើងប៉ះនឹងចំណុចទំនាក់ទំនងលោហៈនៅលើអំពូល មិនមែនត្រឹមតែកញ្ចក់នោះទេ!",
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-emerald-400 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      3
                    </span>
                    <span
                      className={`text-sm text-emerald-900/90 leading-relaxed ${
                        kh ? "font-khmer leading-loose" : ""
                      }`}
                    >
                      {t(
                        "Make sure any switches are closed.",
                        "ត្រូវប្រាកដថាកុងតាក់ទាំងអស់ត្រូវបានបិទ (ភ្ជាប់)។",
                      )}
                    </span>
                  </li>
                </ol>
              </div>

              {/* Footer button */}
              <div className="px-5 sm:px-6 pb-5">
                <button
                  type="button"
                  onClick={() => setNoLightOpen(false)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-md transition-all active:scale-95 ${
                    kh ? "font-khmer" : ""
                  }`}
                  autoFocus
                >
                  <Lightbulb className="w-5 h-5" />
                  {t("Let me try again!", "ទុកឱ្យខ្ញុំសាកល្បងម្តងទៀត!")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Guided Mission box ──────────────────────────────────────────── */}
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 shadow-sm p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Target className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-amber-700 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Mission", "បេសកកម្ម")}
              </span>
              <h3
                className={`text-base sm:text-lg font-bold text-amber-900 mb-2 flex items-center gap-2 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0" />
                {t("Challenge", "បញ្ហាប្រឈម")}
              </h3>
              <p
                className={`text-sm sm:text-base text-foreground/90 leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "Can you make the lightbulb shine using only one battery, two wires, and one bulb?",
                  "តើអ្នកអាចធ្វើឱ្យអំពូលភ្លើងបញ្ចេញពន្លឺបានទេ ដោយប្រើតែថ្មមួយ ខ្សែភ្លើងពីរ និងអំពូលមួយ?",
                )}
              </p>
              <p
                className={`mt-2 text-xs text-amber-800/80 italic ${
                  kh ? "font-khmer not-italic leading-loose" : ""
                }`}
              >
                {t(
                  "Hint: remember — electricity needs a closed loop.",
                  "គន្លឹះ៖ ចូរចងចាំ — អគ្គិសនីត្រូវការរង្វិលជុំបិទ។",
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ── Level 2 Mission: Parallel Power ──────────────────────────── */}
        <div
          className="mt-6 rounded-3xl bg-gradient-to-br from-violet-50 to-fuchsia-50 border-2 border-violet-300 shadow-sm p-5 sm:p-6"
          aria-labelledby="level2-heading"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-violet-700 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Level 2 — Circuit Challenge", "កម្រិត ២ — ការប្រកួតប្រជែងសៀគ្វី")}
              </span>
              <h3
                id="level2-heading"
                className={`text-base sm:text-lg font-bold text-violet-900 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t("Parallel Power", "ថាមពលស្របគ្នា")}
              </h3>
            </div>
          </div>

          {/* Goal */}
          <p
            className={`text-sm sm:text-base text-foreground/90 leading-relaxed mb-4 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            <span className="font-bold text-violet-900">
              {t("The Goal: ", "គោលដៅ៖ ")}
            </span>
            {t(
              "Connect two lightbulbs to one battery so that if you remove one bulb, the other one stays bright!",
              "ភ្ជាប់អំពូលពីរទៅនឹងថ្មមួយ តាមរបៀបដែលបើយើងដកអំពូលមួយចេញ អំពូលមួយទៀតនៅតែភ្លឺ!",
            )}
          </p>

          {/* Toggleable hint */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setHintOpen((o) => !o)}
              aria-expanded={hintOpen}
              aria-controls="level2-hint"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors ${
                kh ? "font-khmer" : ""
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              {hintOpen
                ? t("Hide hint", "លាក់គន្លឹះ")
                : t("Show hint", "បង្ហាញគន្លឹះ")}
              <ChevronDown
                className="w-4 h-4 transition-transform duration-200"
                style={{ transform: hintOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
            {hintOpen && (
              <div
                id="level2-hint"
                className="mt-2 rounded-xl bg-white border border-violet-200 px-4 py-3"
              >
                <p
                  className={`text-sm text-foreground/90 leading-relaxed ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  <span className="font-bold text-violet-700">
                    {t("Hint: ", "គន្លឹះ៖ ")}
                  </span>
                  {t(
                    "Don't put the bulbs in one single loop. Give each bulb its own separate path to the battery!",
                    "កុំដាក់អំពូលក្នុងរង្វិលជុំតែមួយ។ សូមផ្តល់ឱ្យអំពូលនីមួយៗនូវផ្លូវដាច់ដោយឡែករៀងៗខ្លួនទៅកាន់ថ្ម!",
                  )}
                </p>
              </div>
            )}
          </div>

          {/* "I solved it" button + result feedback */}
          <div className="pt-4 border-t border-violet-200" aria-live="polite">
            {(award.kind === "idle" ||
              award.kind === "loading" ||
              award.kind === "error") && (
              <>
                <button
                  type="button"
                  onClick={claimParallelEngineer}
                  disabled={award.kind === "loading"}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold shadow-sm transition-colors ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {award.kind === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trophy className="w-4 h-4" />
                  )}
                  {t("I solved Level 2!", "ខ្ញុំបានដោះស្រាយកម្រិត ២ហើយ!")}
                </button>
                {award.kind === "error" && (
                  <p
                    className={`mt-2 text-xs text-red-700 ${
                      kh ? "font-khmer" : ""
                    }`}
                  >
                    {t("Could not save your badge. Please try again.", "មិនអាចរក្សាទុកស្លាកសញ្ញារបស់អ្នកបានទេ។ សូមព្យាយាមម្តងទៀត។")}
                  </p>
                )}
              </>
            )}

            {award.kind === "needLogin" && (
              <div
                className={`flex items-center gap-2 text-sm text-violet-900 bg-white border border-violet-200 rounded-xl px-4 py-3 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                <Award className="w-5 h-5 text-violet-600 flex-shrink-0" />
                <span>
                  {t(
                    "Sign in as a student to earn the Parallel Engineer badge.",
                    "សូមចូលគណនីជាសិស្ស ដើម្បីទទួលបានស្លាកសញ្ញាវិស្វករសៀគ្វីស្រប។",
                  )}
                </span>
              </div>
            )}

            {award.kind === "needStudentRole" && (
              <div
                className={`flex items-center gap-2 text-sm text-violet-900 bg-white border border-violet-200 rounded-xl px-4 py-3 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                <Award className="w-5 h-5 text-violet-600 flex-shrink-0" />
                <span>
                  {t(
                    "Only student accounts can earn this badge — but you solved the challenge anyway. Well done!",
                    "មានតែគណនីសិស្សប៉ុណ្ណោះដែលអាចទទួលបានស្លាកសញ្ញានេះ — ប៉ុន្តែអ្នកបានដោះស្រាយបញ្ហាប្រឈមជោគជ័យ។ ល្អណាស់!",
                  )}
                </span>
              </div>
            )}

            {(award.kind === "awarded" || award.kind === "alreadyEarned") && (
              <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 border-2 border-violet-300 px-4 py-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-violet-700 mb-0.5">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase ${
                        kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                      }`}
                    >
                      {award.kind === "awarded"
                        ? t("Badge Earned", "ទទួលបានស្លាកសញ្ញា")
                        : t("Already Earned", "បានទទួលរួចហើយ")}
                    </span>
                  </div>
                  <h4
                    className={`text-base sm:text-lg font-bold text-violet-900 ${
                      kh ? "font-khmer" : ""
                    }`}
                  >
                    {t("Parallel Engineer", "វិស្វករសៀគ្វីស្រប")}
                  </h4>
                  <p
                    className={`text-xs text-foreground/80 mt-1 ${
                      kh ? "font-khmer leading-loose" : ""
                    }`}
                  >
                    {award.kind === "awarded"
                      ? t(
                          "Nice work! Your new badge is now visible on your dashboard.",
                          "ល្អណាស់! ស្លាកសញ្ញាថ្មីរបស់អ្នកឥឡូវនេះអាចមើលឃើញនៅលើផ្ទាំងគ្រប់គ្រងរបស់អ្នក។",
                        )
                      : t(
                          "You already earned this badge. Great consistency!",
                          "អ្នកបានទទួលស្លាកសញ្ញានេះរួចហើយ។ ការខិតខំល្អណាស់!",
                        )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Level 3 Mission: The Short Circuit Mystery ──────────────── */}
        <div
          className="mt-6 rounded-3xl bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 shadow-sm p-5 sm:p-6"
          aria-labelledby="level3-heading"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Flame className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[10px] font-bold tracking-widest uppercase text-red-700 mb-1 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Level 3 — Circuit Challenge", "កម្រិត ៣ — ការប្រកួតប្រជែងសៀគ្វី")}
              </span>
              <h3
                id="level3-heading"
                className={`text-base sm:text-lg font-bold text-red-900 ${
                  kh ? "font-khmer" : ""
                }`}
              >
                {t("The Short Circuit Mystery", "អាថ៌កំបាំងសៀគ្វីខ្លី")}
              </h3>
            </div>
          </div>

          {/* Goal */}
          <p
            className={`text-sm sm:text-base text-foreground/90 leading-relaxed mb-4 ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            <span className="font-bold text-red-900">
              {t("The Goal: ", "គោលដៅ៖ ")}
            </span>
            {t(
              'Your virtual battery is catching fire! A wire is touching the wrong place. Can you find the "short circuit" and then add a Fuse to protect the system?',
              'ថ្មនិម្មិតរបស់អ្នកកំពុងឆេះ! មានខ្សែភ្លើងប៉ះកន្លែងខុស។ តើអ្នកអាចរកឃើញ "សៀគ្វីខ្លី" ហើយបន្ទាប់មកបន្ថែម "ហ្វុយស៊ីប (Fuse)" ដើម្បីការពារប្រព័ន្ធបានទេ?',
            )}
          </p>

          {/* Toggleable safety hint */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setHintOpen3((o) => !o)}
              aria-expanded={hintOpen3}
              aria-controls="level3-hint"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-900 transition-colors ${
                kh ? "font-khmer" : ""
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              {hintOpen3
                ? t("Hide safety hint", "លាក់គន្លឹះសុវត្ថិភាព")
                : t("Show safety hint", "បង្ហាញគន្លឹះសុវត្ថិភាព")}
              <ChevronDown
                className="w-4 h-4 transition-transform duration-200"
                style={{ transform: hintOpen3 ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
            {hintOpen3 && (
              <div
                id="level3-hint"
                className="mt-2 rounded-xl bg-white border border-red-200 px-4 py-3"
              >
                <p
                  className={`text-sm text-foreground/90 leading-relaxed ${
                    kh ? "font-khmer leading-loose" : ""
                  }`}
                >
                  <span className="font-bold text-red-700">
                    {t("Safety Hint: ", "គន្លឹះសុវត្ថិភាព៖ ")}
                  </span>
                  {t(
                    'A Fuse is like a "Sacrificial Bridge." It is designed to break if the current gets too high, stopping the fire before it starts.',
                    'ហ្វុយស៊ីបគឺដូចជា "ស្ពានបូជា" ដែរ។ វាត្រូវបានរចនាឡើងឱ្យដាច់ ប្រសិនបើចរន្តខ្ពស់ពេក ដើម្បីបញ្ឈប់ភ្លើងឆេះមុនពេលវាចាប់ផ្តើម។',
                  )}
                </p>
              </div>
            )}
          </div>

          {/* "I solved it" button + result feedback */}
          <div className="pt-4 border-t border-red-200" aria-live="polite">
            {(award3.kind === "idle" ||
              award3.kind === "loading" ||
              award3.kind === "error") && (
              <>
                <button
                  type="button"
                  onClick={claimSafetyInspector}
                  disabled={award3.kind === "loading"}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold shadow-sm transition-colors ${
                    kh ? "font-khmer" : ""
                  }`}
                >
                  {award3.kind === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                  {t("I solved Level 3!", "ខ្ញុំបានដោះស្រាយកម្រិត ៣ហើយ!")}
                </button>
                {award3.kind === "error" && (
                  <p
                    className={`mt-2 text-xs text-red-700 ${
                      kh ? "font-khmer" : ""
                    }`}
                  >
                    {t(
                      "Could not save your badge. Please try again.",
                      "មិនអាចរក្សាទុកស្លាកសញ្ញារបស់អ្នកបានទេ។ សូមព្យាយាមម្តងទៀត។",
                    )}
                  </p>
                )}
              </>
            )}

            {award3.kind === "needLogin" && (
              <div
                className={`flex items-center gap-2 text-sm text-red-900 bg-white border border-red-200 rounded-xl px-4 py-3 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                <Award className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>
                  {t(
                    "Sign in as a student to earn the Safety Inspector badge.",
                    "សូមចូលគណនីជាសិស្ស ដើម្បីទទួលបានស្លាកសញ្ញាអធិការសុវត្ថិភាពអគ្គិសនី។",
                  )}
                </span>
              </div>
            )}

            {award3.kind === "needStudentRole" && (
              <div
                className={`flex items-center gap-2 text-sm text-red-900 bg-white border border-red-200 rounded-xl px-4 py-3 ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                <Award className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>
                  {t(
                    "Only student accounts can earn this badge — but you solved the challenge anyway. Well done!",
                    "មានតែគណនីសិស្សប៉ុណ្ណោះដែលអាចទទួលបានស្លាកសញ្ញានេះ — ប៉ុន្តែអ្នកបានដោះស្រាយបញ្ហាប្រឈមជោគជ័យ។ ល្អណាស់!",
                  )}
                </span>
              </div>
            )}

            {(award3.kind === "awarded" || award3.kind === "alreadyEarned") && (
              <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-br from-red-100 to-orange-100 border-2 border-red-300 px-4 py-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-red-700 mb-0.5">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase ${
                        kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                      }`}
                    >
                      {award3.kind === "awarded"
                        ? t("Badge Earned", "ទទួលបានស្លាកសញ្ញា")
                        : t("Already Earned", "បានទទួលរួចហើយ")}
                    </span>
                  </div>
                  <h4
                    className={`text-base sm:text-lg font-bold text-red-900 ${
                      kh ? "font-khmer" : ""
                    }`}
                  >
                    {t("Safety Inspector", "អធិការសុវត្ថិភាពអគ្គិសនី")}
                  </h4>
                  <p
                    className={`text-xs text-foreground/80 mt-1 ${
                      kh ? "font-khmer leading-loose" : ""
                    }`}
                  >
                    {award3.kind === "awarded"
                      ? t(
                          "Excellent work! Your new badge is now visible on your dashboard.",
                          "ល្អណាស់! ស្លាកសញ្ញាថ្មីរបស់អ្នកឥឡូវនេះអាចមើលឃើញនៅលើផ្ទាំងគ្រប់គ្រងរបស់អ្នក។",
                        )
                      : t(
                          "You already earned this badge. Stay safe!",
                          "អ្នកបានទទួលស្លាកសញ្ញានេះរួចហើយ។ សូមរក្សាសុវត្ថិភាព!",
                        )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Closing reminder (moved here so it's the last thing on the page) */}
        <div className="mt-10 text-center">
          <p
            className={`text-sm text-muted-foreground italic max-w-xl mx-auto ${
              kh ? "font-khmer not-italic leading-loose" : ""
            }`}
          >
            {heading(
              "When in doubt, don't touch it. Call a licensed electrician.",
              "ពេលមានការសង្ស័យ កុំប៉ះវាឡើយ។ សូមហៅជាងអគ្គិសនីដែលមានវិញ្ញាបនបត្រ។",
            )}
          </p>
        </div>
      </section>

      {/* ── Section 7: The Gatekeepers — Fuses & Circuit Breakers ────────── */}
      <GatekeepersSection kh={kh} t={t} />

      {/* ── Section 8: Invisible Wires — How Radios Work ─────────────────── */}
      <RadioSection kh={kh} t={t} />

      {/* ── Section 9: The Holy Grail — Room-Temperature Superconductors ── */}
      <SuperconductorsSection kh={kh} t={t} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION · The Gatekeepers — Fuses & Circuit Breakers
 *   ▸ Sub 1: The Danger of the Overload   (caution-yellow)
 *   ▸ Sub 2: The Sacrifice — Fuses        (safety-orange)
 *   ▸ Sub 3: The Smart Switch — Breakers  (caution-yellow with green ON state)
 *
 * Aesthetic: dark charcoal (slate-900/950) backgrounds, caution-yellow
 * (#facc15) and safety-orange (#fb923c) accents, diagonal hazard-tape
 * accent stripe at the top. Crisp sans-serif. Strictly bilingual headings
 * and core terms (Fuse / ហ្វុយស៊ីប, Circuit Breaker / ឌីស្យុងទ័រ,
 * Overload / ផ្ទុកលើសចំណុះ).
 * ══════════════════════════════════════════════════════════════════════════ */
function GatekeepersSection({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 py-10"
      data-testid="gatekeepers-section"
      aria-labelledby="gatekeepers-heading"
    >
      <div className="rounded-3xl bg-slate-900 border-2 border-amber-400/50 shadow-[0_0_40px_rgba(251,191,36,0.12)] overflow-hidden">
        {/* Diagonal hazard tape strip */}
        <div
          className="h-3"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #facc15 0 18px, #0f172a 18px 36px)",
          }}
          aria-hidden
        />

        <div className="p-5 sm:p-8">
          {/* Bilingual paired header */}
          <header className="flex items-start gap-3 mb-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.45)]">
              <ShieldAlert className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300 mb-0.5">
                <span>Section · Safety Inside the Wall</span>
                <span className="font-khmer normal-case tracking-normal text-xs text-amber-200 ml-2">
                  ផ្នែក · សុវត្ថិភាពនៅក្នុងជញ្ជាំង
                </span>
              </div>
              <h2
                id="gatekeepers-heading"
                className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight"
              >
                <span className="block">The Gatekeepers — Fuses &amp; Circuit Breakers</span>
                <span className="block font-khmer text-xl sm:text-2xl font-bold text-amber-200 mt-1 leading-relaxed">
                  អ្នកយាមទ្វារ — ហ្វុយស៊ីប និងឌីស្យុងទ័រ
                </span>
              </h2>
            </div>
          </header>

          {/* Intro — bilingual paired */}
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Inside every wall in your house there is a small, silent guardian
            whose only job is to{" "}
            <strong className="text-amber-300">stop a fire before it starts</strong>.
            It does this by sacrificing itself — or by tripping a switch — the
            moment things get too dangerous. Meet the two devices that quietly
            keep your home from burning down.
          </p>
          <p className="font-khmer text-slate-300 leading-loose mt-3 border-t border-amber-400/20 pt-3">
            នៅខាងក្នុងជញ្ជាំងផ្ទះរបស់អ្នកម្នាក់ៗ មានអ្នកការពារតូចមួយដ៏ស្ងាត់ ដែលការងារតែមួយគត់របស់វាគឺ{" "}
            <strong className="text-amber-300">បញ្ឈប់ភ្លើងឆេះមុនពេលវាចាប់ផ្ដើម</strong>។ វាធ្វើដូច្នេះដោយការ លះបង់ខ្លួន — ឬដោយការបិទកុងតាក់ — ភ្លាមៗ ពេលអ្វីៗកើនឡើងគ្រោះថ្នាក់ពេក។ ស្គាល់ឧបករណ៍ពីរយ៉ាង ដែលរក្សាផ្ទះរបស់អ្នកមិនឱ្យឆេះ។
          </p>

          {/* Three sub-sections stacked */}
          <div className="mt-6 space-y-5">
            <OverloadCard />
            <FuseCard />
            <BreakerCard />
          </div>

          {/* Comparison strip */}
          <ComparisonStrip />
        </div>
      </div>
    </section>
  );
}

/* ── Sub 1 · The Danger of the Overload ─────────────────────────────────── */
function OverloadCard() {
  return (
    <article
      data-testid="gatekeeper-overload"
      className="rounded-2xl bg-slate-950 border-2 border-yellow-400/60 p-5 sm:p-6 shadow-[0_0_24px_rgba(250,204,21,0.10)]"
    >
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-yellow-400 text-slate-900 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" strokeWidth={2.75} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">
              Part 01 · Danger
            </span>
            <span className="font-khmer text-[11px] text-yellow-300">
              ផ្នែក ០១ · គ្រោះថ្នាក់
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
            <span className="block">The Danger of the Overload</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-yellow-300 mt-1 leading-relaxed">
              គ្រោះថ្នាក់នៃការផ្ទុកលើសចំណុះ (Overload)
            </span>
          </h3>
        </div>
      </header>

      <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
        Wires get <strong className="text-yellow-300">hot</strong> when too much
        electricity flows through them. If you plug a kettle, a rice cooker, an
        iron, and an air-con into one outlet, the wire hidden inside the wall
        will heat up <strong className="text-orange-300">like a toaster oven</strong> —
        and start a fire you cannot see until the smoke arrives. We need a{" "}
        <strong className="text-amber-300">"weak link"</strong> that breaks{" "}
        <em>safely</em>, before the wall wire burns.
      </p>
      <p className="font-khmer text-slate-300 leading-loose mt-3 border-t border-yellow-400/20 pt-3">
        ខ្សែភ្លើងក្ដៅ នៅពេលដែលអគ្គិសនីច្រើនពេករត់កាត់វា។ ប្រសិនបើអ្នកដោតកំសត់ ឆ្នាំងបាយ ឆ្នាំងគុជ និងម៉ាស៊ីនត្រជាក់ ចូលរន្ធតែមួយ ខ្សែដែលលាក់នៅក្នុងជញ្ជាំងនឹងក្ដៅឡើង{" "}
        <strong className="text-orange-300">ដូចជាឡដុតនំប័ុង</strong> — ហើយចាប់ផ្ដើមឆេះភ្លើង ដែលអ្នកមើលមិនឃើញរហូតដល់ផ្សែងលេចចេញ។ យើងត្រូវការ{" "}
        <strong className="text-amber-300">"ខ្សែខ្សោយ"</strong> មួយ ដែលដាច់ដោយ <em>មានសុវត្ថិភាព</em>{" "}
        មុនពេលខ្សែជញ្ជាំងឆេះ។
      </p>

      {/* Visual: outlet → hot wire → fire */}
      <div className="mt-4 rounded-xl bg-slate-900/60 border border-yellow-400/30 p-3">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
          <Pill icon={Plug} label="One outlet" sub="រន្ធតែមួយ" tone="slate" />
          <ChevronArrow />
          <Pill icon={Plug} label="Too many things" sub="របស់ច្រើនពេក" tone="yellow" />
          <ChevronArrow />
          <Pill icon={Flame} label="Wire heats up" sub="ខ្សែក្ដៅ" tone="orange" />
          <ChevronArrow />
          <Pill icon={Flame} label="FIRE" sub="ឆេះ!" tone="red" />
        </div>
      </div>
    </article>
  );
}

/* ── Sub 2 · The Sacrifice — How Fuses Work ─────────────────────────────── */
function FuseCard() {
  return (
    <article
      data-testid="gatekeeper-fuse"
      className="rounded-2xl bg-slate-950 border-2 border-orange-400/60 p-5 sm:p-6 shadow-[0_0_24px_rgba(251,146,60,0.12)]"
    >
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-orange-400 text-slate-900 flex items-center justify-center">
          <Trash2 className="w-5 h-5" strokeWidth={2.75} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">
              Part 02 · The Sacrifice
            </span>
            <span className="font-khmer text-[11px] text-orange-300">
              ផ្នែក ០២ · ការលះបង់
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
            <span className="block">The Sacrifice — How Fuses Work</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-orange-300 mt-1 leading-relaxed">
              ការលះបង់ — របៀបដែលហ្វុយស៊ីប (Fuse) ដំណើរការ
            </span>
          </h3>
        </div>
      </header>

      <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
        A <strong className="text-orange-300">fuse (ហ្វុយស៊ីប)</strong> is just a
        tiny, incredibly thin piece of wire sealed inside a glass tube. Because
        the wire inside is so thin, it heats up{" "}
        <strong className="text-orange-300">much faster</strong> than the big
        wires hidden in the wall. If too much current flows through the line,
        that thin wire <strong className="text-red-300">literally melts in half</strong> —
        snapping the circuit and stopping the electricity dead.
        It <strong className="text-amber-300">sacrifices itself</strong> to save
        the building, and must then be{" "}
        <strong className="text-orange-200">thrown away and replaced</strong>{" "}
        with a new one.
      </p>
      <p className="font-khmer text-slate-300 leading-loose mt-3 border-t border-orange-400/20 pt-3">
        <strong className="text-orange-300">ហ្វុយស៊ីប (Fuse)</strong> គ្រាន់តែជាបំណែកខ្សែស្ដើងតូច ដែលដាក់នៅខាងក្នុងបំពង់កែវ។ ដោយសារខ្សែខាងក្នុងស្ដើងណាស់ វាក្ដៅឡើង{" "}
        <strong className="text-orange-300">លឿនជាង</strong> ខ្សែធំៗដែលលាក់នៅក្នុងជញ្ជាំងច្រើន។ ប្រសិនបើចរន្តច្រើនពេករត់កាត់ខ្សែ ខ្សែស្ដើងនោះ{" "}
        <strong className="text-red-300">រលាយដាច់ជាពីរ</strong> — កាត់សៀគ្វី ហើយបញ្ឈប់អគ្គិសនីភ្លាម។ វា{" "}
        <strong className="text-amber-300">លះបង់ខ្លួន</strong> ដើម្បីសង្គ្រោះអាគារ ហើយបន្ទាប់មកត្រូវ{" "}
        <strong className="text-orange-200">បោះចោល និងជំនួស</strong> ដោយ ហ្វុយស៊ីប ថ្មី។
      </p>

      {/* Inline SVG: a fuse before / after melt */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FuseSvg state="ok" />
        <FuseSvg state="blown" />
      </div>
    </article>
  );
}

/* ── Sub 3 · The Smart Switch — How Breakers Work ───────────────────────── */
function BreakerCard() {
  return (
    <article
      data-testid="gatekeeper-breaker"
      className="rounded-2xl bg-slate-950 border-2 border-emerald-400/60 p-5 sm:p-6 shadow-[0_0_24px_rgba(52,211,153,0.10)]"
    >
      <header className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-400 text-slate-900 flex items-center justify-center">
          <RotateCcw className="w-5 h-5" strokeWidth={2.75} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
              Part 03 · The Smart Switch
            </span>
            <span className="font-khmer text-[11px] text-emerald-200">
              ផ្នែក ០៣ · កុងតាក់ឆ្លាតវៃ
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-200">
              <Recycle className="w-3 h-3" /> Reusable
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
            <span className="block">The Smart Switch — How Circuit Breakers Work</span>
            <span className="block font-khmer text-base sm:text-lg font-bold text-emerald-200 mt-1 leading-relaxed">
              កុងតាក់ឆ្លាតវៃ — របៀបដែលឌីស្យុងទ័រ (Circuit Breaker) ដំណើរការ
            </span>
          </h3>
        </div>
      </header>

      <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
        A <strong className="text-emerald-300">circuit breaker (ឌីស្យុងទ័រ)</strong>{" "}
        does the <em>exact same job</em> as a fuse — but it is{" "}
        <strong className="text-emerald-300">reusable</strong>. Inside the
        switch is either a strip of metal that{" "}
        <strong className="text-amber-300">bends as it heats up</strong>, or an{" "}
        <strong className="text-amber-300">electromagnet</strong> that pulls
        harder when the current spikes. When the strip bends — or the magnet
        pulls — too far, it physically{" "}
        <strong className="text-red-300">trips a tiny spring</strong>, throwing
        the switch into the <strong className="text-rose-300">OFF</strong>{" "}
        position and cutting the power.
      </p>
      <p className="font-khmer text-slate-300 leading-loose mt-3 border-t border-emerald-400/20 pt-3">
        <strong className="text-emerald-300">ឌីស្យុងទ័រ (Circuit Breaker)</strong>{" "}
        ធ្វើ <em>ការងារដូចគ្នាបេះបិទ</em> នឹង ហ្វុយស៊ីប — ប៉ុន្តែវា{" "}
        <strong className="text-emerald-300">អាចប្រើឡើងវិញបាន</strong>។ នៅខាងក្នុងកុងតាក់ មាន ឬជាបន្ទះដែក ដែល{" "}
        <strong className="text-amber-300">ពត់ ពេលក្ដៅ</strong> ឬជា{" "}
        <strong className="text-amber-300">មេដែកអគ្គិសនី</strong> ដែលទាញខ្លាំងជាង នៅពេលចរន្តឡើងខ្ពស់ភ្លាមៗ។ ពេលបន្ទះពត់ ឬមេដែកទាញ លើសពីកម្រិតមួយ វា{" "}
        <strong className="text-red-300">បង្ហើរពនលឺចាស់តូចមួយ</strong> ហើយផ្លាស់កុងតាក់ទៅទីតាំង{" "}
        <strong className="text-rose-300">OFF (បិទ)</strong> ដោយកាត់ផ្ដាច់ចរន្ត។
      </p>
      <p className="text-slate-200 text-sm sm:text-base leading-relaxed mt-3">
        You don't have to throw it away. You just{" "}
        <strong className="text-emerald-300">find what caused the overload</strong>,
        unplug it, and flip the switch back to{" "}
        <strong className="text-emerald-300">ON</strong>.
      </p>
      <p className="font-khmer text-slate-300 leading-loose mt-2">
        អ្នកមិនបាច់បោះវាចោលទេ។ អ្នកគ្រាន់តែ{" "}
        <strong className="text-emerald-300">រកមើលអ្វីដែលបណ្តាលឱ្យមានការផ្ទុកលើស</strong>{" "}
        ដោតវាចេញ ហើយបិទបើកកុងតាក់មកត្រឡប់ទៅ{" "}
        <strong className="text-emerald-300">ON (បើក)</strong> វិញ។
      </p>

      {/* Visual: breaker mechanism */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <BreakerSvg state="on" />
        <BreakerSvg state="tripped" />
      </div>
    </article>
  );
}

/* ── Comparison footer ─────────────────────────────────────────────────── */
function ComparisonStrip() {
  return (
    <div
      className="mt-6 rounded-2xl bg-slate-950 border-2 border-dashed border-amber-400/40 p-4 sm:p-5"
      data-testid="gatekeeper-comparison"
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300 mb-3 flex flex-wrap items-baseline gap-2">
        <span>Side by Side</span>
        <span className="font-khmer text-[11px] text-amber-200 normal-case tracking-normal">ប្រៀបធៀបជិតគ្នា</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CompareCol
          headEn="Fuse · ហ្វុយស៊ីប"
          tone="orange"
          rows={[
            { en: "Melts permanently", kh: "រលាយជាអចិន្ត្រៃយ៍" },
            { en: "Single-use · throw away", kh: "ប្រើបានតែម្ដង · បោះចោល" },
            { en: "Cheap & very fast", kh: "ថោក និងលឿនណាស់" },
            { en: "Found in older homes & cars", kh: "មាននៅផ្ទះចាស់ៗ និងឡាន" },
          ]}
        />
        <CompareCol
          headEn="Circuit Breaker · ឌីស្យុងទ័រ"
          tone="emerald"
          rows={[
            { en: "Trips a switch", kh: "រំសាយកុងតាក់" },
            { en: "Reusable · just flip back ON", kh: "ប្រើឡើងវិញបាន · គ្រាន់តែបើកវិញ" },
            { en: "Slightly slower than fuse", kh: "យឺតបន្តិចជាង ហ្វុយស៊ីប" },
            { en: "Standard in modern wiring", kh: "ស្ដង់ដារក្នុងខ្សែភ្លើងទំនើប" },
          ]}
        />
      </div>
      <p className="mt-4 text-xs sm:text-sm text-slate-400 italic leading-relaxed">
        Both do the same heroic job: they break before the wall wire does.
      </p>
      <p className="mt-1 font-khmer text-xs sm:text-sm text-slate-400 italic leading-loose">
        ទាំងពីរធ្វើការងារវីរបុរសដូចគ្នា៖ ពួកវាដាច់ មុនពេលខ្សែជញ្ជាំងដាច់។
      </p>
    </div>
  );
}

/* ── Tiny bilingual stat column ────────────────────────────────────────── */
function CompareCol({
  headEn,
  tone,
  rows,
}: {
  headEn: string;
  tone: "orange" | "emerald";
  rows: { en: string; kh: string }[];
}) {
  const styles =
    tone === "orange"
      ? "border-orange-400/50 bg-orange-500/5"
      : "border-emerald-400/50 bg-emerald-500/5";
  const headColor = tone === "orange" ? "text-orange-300" : "text-emerald-300";
  return (
    <div className={`rounded-xl border ${styles} p-3 sm:p-4`}>
      <div className={`text-sm font-display font-bold mb-2 ${headColor}`}>
        {headEn}
      </div>
      <ul className="space-y-1.5">
        {rows.map((r, i) => (
          <li key={i} className="text-xs sm:text-sm">
            <div className="text-slate-200">{r.en}</div>
            <div className="font-khmer text-slate-400 leading-relaxed mt-0.5">
              {r.kh}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Tiny pill for the danger flow ─────────────────────────────────────── */
function Pill({
  icon: Icon,
  label,
  sub,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  tone: "slate" | "yellow" | "orange" | "red";
}) {
  const styles = {
    slate: "bg-slate-800 border-slate-600 text-slate-200",
    yellow: "bg-yellow-500/15 border-yellow-400/60 text-yellow-200",
    orange: "bg-orange-500/15 border-orange-400/60 text-orange-200",
    red: "bg-red-500/20 border-red-400/70 text-red-200",
  }[tone];
  return (
    <div
      className={`flex flex-col items-center gap-1 rounded-lg border ${styles} px-3 py-2 min-w-[88px]`}
    >
      <Icon className="w-4 h-4" />
      <div className="text-[11px] font-bold leading-tight text-center">
        {label}
      </div>
      <div className="font-khmer text-[10px] opacity-80 leading-tight text-center">
        {sub}
      </div>
    </div>
  );
}

function ChevronArrow() {
  return (
    <span className="text-amber-400 text-lg leading-none" aria-hidden>
      ▸
    </span>
  );
}

/* ── Inline fuse SVG (intact vs blown) ─────────────────────────────────── */
function FuseSvg({ state }: { state: "ok" | "blown" }) {
  const blown = state === "blown";
  return (
    <div
      data-testid={`fuse-svg-${state}`}
      className={`rounded-xl border ${
        blown
          ? "border-red-400/60 bg-red-950/30"
          : "border-emerald-400/40 bg-emerald-950/20"
      } p-3`}
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
        <span className={blown ? "text-red-300" : "text-emerald-300"}>
          {blown ? "Blown · ដាច់ហើយ" : "Intact · នៅល្អ"}
        </span>
      </div>
      <svg viewBox="0 0 240 60" className="w-full h-auto">
        {/* End caps */}
        <rect x="2" y="18" width="22" height="24" fill="#94a3b8" rx="2" />
        <rect x="216" y="18" width="22" height="24" fill="#94a3b8" rx="2" />
        {/* Glass tube */}
        <rect
          x="24"
          y="14"
          width="192"
          height="32"
          rx="6"
          fill="rgba(148,163,184,0.08)"
          stroke="rgba(148,163,184,0.4)"
        />
        {/* Thin filament wire */}
        {blown ? (
          <>
            <line x1="24" y1="30" x2="108" y2="30" stroke="#f97316" strokeWidth="1.6" />
            <line x1="132" y1="30" x2="216" y2="30" stroke="#f97316" strokeWidth="1.6" />
            {/* Melted gap */}
            <circle cx="118" cy="30" r="3" fill="#fbbf24" />
            <circle cx="122" cy="30" r="3" fill="#fbbf24" />
            <text x="120" y="11" textAnchor="middle" fontSize="9" fill="#fca5a5" fontWeight="700">
              MELTED ✕
            </text>
          </>
        ) : (
          <>
            <line x1="24" y1="30" x2="216" y2="30" stroke="#34d399" strokeWidth="1.6" />
            <text x="120" y="11" textAnchor="middle" fontSize="9" fill="#86efac" fontWeight="700">
              current flowing →
            </text>
          </>
        )}
      </svg>
      <div className="text-[11px] text-slate-400 mt-1">
        {blown
          ? "Throw away & replace · បោះចោល និងជំនួស"
          : "Fuse OK · ហ្វុយស៊ីបនៅល្អ"}
      </div>
    </div>
  );
}

/* ── Inline breaker SVG (ON vs tripped) ────────────────────────────────── */
function BreakerSvg({ state }: { state: "on" | "tripped" }) {
  const tripped = state === "tripped";
  return (
    <div
      data-testid={`breaker-svg-${state}`}
      className={`rounded-xl border ${
        tripped
          ? "border-red-400/60 bg-red-950/30"
          : "border-emerald-400/50 bg-emerald-950/20"
      } p-3`}
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
        <span className={tripped ? "text-red-300" : "text-emerald-300"}>
          {tripped ? "Tripped · OFF · បិទ" : "Closed · ON · បើក"}
        </span>
      </div>
      <svg viewBox="0 0 200 110" className="w-full h-auto">
        {/* Body */}
        <rect x="20" y="10" width="160" height="90" rx="8" fill="#0f172a" stroke="#475569" />
        {/* Wires in/out */}
        <line x1="0" y1="55" x2="20" y2="55" stroke="#94a3b8" strokeWidth="3" />
        <line x1="180" y1="55" x2="200" y2="55" stroke="#94a3b8" strokeWidth="3" />

        {/* Lever / switch */}
        <g transform={tripped ? "rotate(35 100 60)" : "rotate(-25 100 60)"}>
          <rect x="92" y="22" width="16" height="40" rx="3" fill={tripped ? "#fb7185" : "#34d399"} />
          <text x="100" y="18" textAnchor="middle" fontSize="9" fontWeight="800" fill={tripped ? "#fda4af" : "#86efac"}>
            {tripped ? "OFF" : "ON"}
          </text>
        </g>
        {/* Pivot */}
        <circle cx="100" cy="60" r="4" fill="#fbbf24" />

        {/* Bimetal strip + magnet hint */}
        <g>
          <text x="30" y="92" fontSize="8" fill="#fbbf24" fontWeight="700">
            ⌇ bimetal
          </text>
          <text x="120" y="92" fontSize="8" fill="#fbbf24" fontWeight="700">
            ◉ magnet
          </text>
        </g>
        {/* Spark when tripped */}
        {tripped && (
          <text x="100" y="8" textAnchor="middle" fontSize="11" fill="#fbbf24" fontWeight="800">
            ⚡ SNAP!
          </text>
        )}
      </svg>
      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
        {tripped ? (
          <>
            <Magnet className="w-3 h-3 text-amber-400" />
            <span>Spring tripped — flip back to ON</span>
          </>
        ) : (
          <>
            <Power className="w-3 h-3 text-emerald-400" />
            <span>Power flowing safely · ចរន្តហូរ​ដោយសុវត្ថិភាព</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Bilingual Lab Glossary ──────────────────────────────────────────── */
type GlossaryT = (en: string, kh: string | null | undefined) => string;

function LabGlossary({ t, kh }: { t: GlossaryT; kh: boolean }) {
  const items: Array<{
    en: string;
    khName: string;
    descEn: string;
    descKh: string;
    icon: React.ReactNode;
    ring: string;
    chip: string;
  }> = [
    {
      en: "Wire",
      khName: "ខ្សែភ្លើង",
      descEn: "The path for electrons",
      descKh: "ផ្លូវសម្រាប់អេឡិចត្រុង",
      ring: "border-orange-300 bg-orange-50/60",
      chip: "bg-orange-100 text-orange-900",
      icon: <WireIcon />,
    },
    {
      en: "Battery",
      khName: "ថ្ម / អាគុយ",
      descEn: "The energy source",
      descKh: "ប្រភពថាមពល",
      ring: "border-sky-300 bg-sky-50/60",
      chip: "bg-sky-100 text-sky-900",
      icon: <BatteryIcon />,
    },
    {
      en: "Light Bulb",
      khName: "អំពូលភ្លើង",
      descEn: "Turns energy into light",
      descKh: "បំប្លែងថាមពលទៅជាពន្លឺ",
      ring: "border-amber-300 bg-amber-50/70",
      chip: "bg-amber-100 text-amber-900",
      icon: <BulbIcon />,
    },
    {
      en: "Resistor",
      khName: "រេស៊ីស្តង់",
      descEn: "Slows down the flow",
      descKh: "ពន្យឺតល្បឿនចរន្ត",
      ring: "border-yellow-400 bg-yellow-50/70",
      chip: "bg-yellow-100 text-yellow-900",
      icon: <ResistorIcon />,
    },
    {
      en: "Switch",
      khName: "កុងតាក់",
      descEn: "Opens or closes the loop",
      descKh: "បើក ឬបិទសៀគ្វី",
      ring: "border-slate-300 bg-slate-50",
      chip: "bg-slate-200 text-slate-900",
      icon: <SwitchIcon />,
    },
  ];

  return (
    <section
      aria-label={t("Bilingual Lab Glossary", "វចនានុក្រមមន្ទីរពិសោធន៍")}
      className="mt-5 rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50/60 via-white to-cyan-50/60 p-4 sm:p-5 shadow-sm"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-teal-700 text-white flex items-center justify-center flex-shrink-0">
          <BookIcon />
        </div>
        <div className="min-w-0">
          <div
            className={`text-[10px] font-bold tracking-widest uppercase text-teal-800 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Bilingual Lab Glossary", "វចនានុក្រមមន្ទីរពិសោធន៍")}
          </div>
          <div
            className={`text-sm text-slate-700 leading-snug ${
              kh ? "font-khmer leading-relaxed" : ""
            }`}
          >
            {t(
              "Identify the components you see in the simulator above.",
              "កំណត់សមាសភាគដែលអ្នកឃើញក្នុងការសាកល្បងខាងលើ។",
            )}
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((it) => (
          <li
            key={it.en}
            className={`rounded-2xl border-2 ${it.ring} p-3 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="h-12 w-full flex items-center justify-center mb-2">
              {it.icon}
            </div>
            <div
              className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${it.chip} mb-1`}
            >
              {t(it.en, it.khName)}
            </div>
            <div
              className={`text-[11px] font-semibold text-slate-700 leading-snug ${
                kh ? "font-khmer leading-relaxed" : ""
              }`}
            >
              {t(it.descEn, it.descKh)}
            </div>
            {/* Show the "other" language name as a small subtitle for learning */}
            <div
              className={`mt-1 text-[10px] text-slate-500 ${
                kh ? "" : "font-khmer"
              }`}
            >
              {kh ? it.en : it.khName}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Inline PhET-style component icons ───────────────────────────────── */
function WireIcon() {
  return (
    <svg viewBox="0 0 64 32" className="w-14 h-8" aria-hidden="true">
      <path
        d="M2 16 C 14 2, 26 30, 38 16 S 60 2, 62 16"
        stroke="#c2410c"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M2 16 C 14 2, 26 30, 38 16 S 60 2, 62 16"
        stroke="#fb923c"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 64 32" className="w-14 h-8" aria-hidden="true">
      <rect x="6" y="8" width="48" height="16" rx="2" fill="#1e3a8a" stroke="#0f172a" strokeWidth="1.5" />
      <rect x="54" y="12" width="5" height="8" rx="1" fill="#0f172a" />
      <line x1="20" y1="8" x2="20" y2="24" stroke="#facc15" strokeWidth="1.5" />
      <text x="14" y="20" fontSize="10" fontWeight="700" fill="#fff">+</text>
      <text x="44" y="20" fontSize="10" fontWeight="700" fill="#fff">−</text>
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 32 40" className="w-8 h-10" aria-hidden="true">
      <circle cx="16" cy="16" r="11" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
      <path d="M11 24 h10 v3 h-10 z" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
      <path d="M12 27 h8 v2 h-8 z M13 29 h6 v2 h-6 z" fill="#64748b" />
      <path d="M11 13 q5 6 10 0" stroke="#b45309" strokeWidth="1.2" fill="none" />
      {/* glow rays */}
      <g stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round">
        <line x1="16" y1="1" x2="16" y2="4" />
        <line x1="3" y1="14" x2="6" y2="14" />
        <line x1="26" y1="14" x2="29" y2="14" />
        <line x1="6" y1="4" x2="8" y2="6" />
        <line x1="26" y1="4" x2="24" y2="6" />
      </g>
    </svg>
  );
}

function ResistorIcon() {
  return (
    <svg viewBox="0 0 64 32" className="w-14 h-8" aria-hidden="true">
      <line x1="2" y1="16" x2="14" y2="16" stroke="#475569" strokeWidth="2" />
      <line x1="50" y1="16" x2="62" y2="16" stroke="#475569" strokeWidth="2" />
      <rect x="14" y="9" width="36" height="14" rx="3" fill="#d4a373" stroke="#7c2d12" strokeWidth="1.5" />
      {/* color bands */}
      <rect x="20" y="9" width="3" height="14" fill="#7f1d1d" />
      <rect x="27" y="9" width="3" height="14" fill="#fde047" />
      <rect x="34" y="9" width="3" height="14" fill="#16a34a" />
      <rect x="41" y="9" width="3" height="14" fill="#1e40af" />
    </svg>
  );
}

function SwitchIcon() {
  return (
    <svg viewBox="0 0 64 32" className="w-14 h-8" aria-hidden="true">
      <line x1="2" y1="22" x2="16" y2="22" stroke="#475569" strokeWidth="2" />
      <line x1="48" y1="22" x2="62" y2="22" stroke="#475569" strokeWidth="2" />
      <circle cx="16" cy="22" r="3" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
      <circle cx="48" cy="22" r="3" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
      <line x1="16" y1="22" x2="46" y2="6" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Section 7: Invisible Wires — How Radios Work
// Retro-futuristic broadcast aesthetic — oscilloscope glow on dark slate.
// ─────────────────────────────────────────────────────────────────────────
const SCOPE_BG: React.CSSProperties = {
  backgroundColor: "#020617",
  backgroundImage:
    "linear-gradient(rgba(34, 197, 94, 0.06) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(34, 197, 94, 0.06) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const SCOPE_GREEN = "#22d3ee"; // cyan-cyan, oscilloscope cathode
const BROADCAST_AMBER = "#fbbf24";

function RadioSection({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section
      className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14 my-8 rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl"
      style={SCOPE_BG}
    >
      {/* Scanline overlay for retro CRT feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(34,211,238,1) 0, rgba(34,211,238,1) 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* Header */}
      <header className="relative text-center mb-10">
        <div className={`inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-cyan-400/80 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>{t("ON AIR · Section 07", "កំពុងផ្សាយ · ផ្នែក ០៧")}</span>
        </div>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/15 border-2 border-cyan-400/60 text-cyan-300 mb-4 shadow-[0_0_24px_rgba(34,211,238,0.4)]">
          <Radio className="w-8 h-8" />
        </div>
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-50 ${kh ? "font-khmer leading-snug" : "font-display"}`}>
          {t("Invisible Wires — How Radios Work", "ខ្សែដែលមើលមិនឃើញ — របៀបដែលវិទ្យុដំណើរការ")}
        </h2>
        <p className={`mt-3 text-sm sm:text-base text-cyan-100/70 max-w-2xl mx-auto leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
          {t(
            "There is no cable between the radio in your kitchen and the studio in Phnom Penh. So how does the music get there? Follow a single song from a microphone, into the air as an invisible wave, and back out of a speaker — at the speed of light.",
            "គ្មានខ្សែភ្ជាប់រវាងវិទ្យុក្នុងផ្ទះបាយរបស់អ្នកនិងស្ទូឌីយ៉ូក្នុងភ្នំពេញឡើយ។ ដូច្នេះតើបទចម្រៀងធ្វើដំណើរទៅទីនោះយ៉ាងដូចម្តេច? តាមដានបទតែមួយពីមីក្រូហ្វូន ចូលទៅក្នុងខ្យល់ជារលកមើលមិនឃើញ ហើយចេញពីឧបករណ៍បំពងសំឡេងវិញ — ល្បឿនពន្លឺ។"
          )}
        </p>
      </header>

      {/* 7.1 — Anatomy of a Broadcast */}
      <BroadcastChain kh={kh} t={t} />

      {/* 7.2 — AM vs FM */}
      <ModulationCompare kh={kh} t={t} />

      {/* 7.3 — Channels & tuning */}
      <ChannelsCard kh={kh} t={t} />
    </section>
  );
}

// ── 7.1 The Anatomy of a Broadcast ───────────────────────────────────────
function BroadcastChain({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  const steps: {
    n: string;
    nameEn: string; nameKh: string;
    roleEn: string; roleKh: string;
    descEn: string; descKh: string;
    icon: React.ComponentType<{ className?: string }>;
    diagram: React.ReactNode;
  }[] = [
    {
      n: "01",
      nameEn: "Microphone",
      nameKh: "មីក្រូហ្វូន",
      roleEn: "Sound → Electrical signal",
      roleKh: "សំឡេង → សញ្ញាអគ្គិសនី",
      descEn: "Your voice pushes air. The air pushes a tiny diaphragm in the microphone, and a coil and magnet inside turn that motion into a wobbly electrical voltage — a perfect electrical copy of your voice.",
      descKh: "សំឡេងរបស់អ្នករុញខ្យល់។ ខ្យល់រុញសន្លឹកតូចមួយក្នុងមីក្រូហ្វូន ហើយរង្វិលនិងមេដែកខាងក្នុងបំលែងចលនានោះទៅជាវ៉ុលអគ្គិសនីញ័រៗ — ច្បាប់ចម្លងអគ្គិសនីដ៏ល្អឥតខ្ចោះនៃសំឡេងរបស់អ្នក។",
      icon: Mic,
      diagram: <SoundToSignalSvg kh={kh} />,
    },
    {
      n: "02",
      nameEn: "Transmitter & Carrier Wave",
      nameKh: "ឧបករណ៍បញ្ជូននិងរលកដឹកជញ្ជូន",
      roleEn: "Audio signal × high-frequency wave",
      roleKh: "សញ្ញាសំឡេង × រលកប្រេកង់ខ្ពស់",
      descEn: "The slow audio voltage is too weak to travel far on its own. The transmitter mixes it with a steady, very fast 'carrier wave' (millions of vibrations per second). The audio rides on the carrier — like a passenger on a fast bus.",
      descKh: "វ៉ុលសំឡេងយឺតខ្សោយពេកមិនអាចធ្វើដំណើរឆ្ងាយដោយខ្លួនឯងបានទេ។ ឧបករណ៍បញ្ជូនលាយវាជាមួយ 'រលកដឹកជញ្ជូន' លឿនៗថេរ (រាប់លានដងក្នុងមួយវិនាទី)។ សំឡេងជិះលើរលកដឹកជញ្ជូន — ដូចជាអ្នកដំណើរលើឡានក្រុងលឿន។",
      icon: AudioLines,
      diagram: <CarrierMixSvg kh={kh} />,
    },
    {
      n: "03",
      nameEn: "Antenna — Broadcast",
      nameKh: "អង់តែន — ផ្សាយ",
      roleEn: "Electricity → Electromagnetic wave",
      roleKh: "អគ្គិសនី → រលកអេឡិចត្រូម៉ាញេទិច",
      descEn: "The mixed signal is sent up a tall metal antenna. As the current wiggles up and down, it launches an invisible electromagnetic wave outward in every direction — travelling at the speed of light, ~300,000 km/s.",
      descKh: "សញ្ញាដែលបានលាយត្រូវបានបញ្ជូនឡើងលើអង់តែនលោហៈខ្ពស់។ នៅពេលដែលចរន្តញ័រឡើងចុះ វាបាញ់រលកអេឡិចត្រូម៉ាញេទិចមើលមិនឃើញចេញគ្រប់ទិសដៅ — ធ្វើដំណើរល្បឿនពន្លឺ ~៣០០,០០០ គ.ម/វិនាទី។",
      icon: RadioTower,
      diagram: <AntennaBroadcastSvg kh={kh} />,
    },
    {
      n: "04",
      nameEn: "Receiver",
      nameKh: "អ្នកទទួល",
      roleEn: "Wave → Speaker → Sound",
      roleKh: "រលក → ឧបករណ៍បំពង → សំឡេង",
      descEn: "Your radio's antenna catches the wave. Inside, a circuit removes the carrier and keeps only the original audio voltage. That voltage drives a speaker — pushing air, recreating the song.",
      descKh: "អង់តែននៃវិទ្យុរបស់អ្នកចាប់រលក។ ខាងក្នុង សៀគ្វីដកចេញរលកដឹកជញ្ជូន ហើយរក្សាទុកតែវ៉ុលសំឡេងដើម។ វ៉ុលនោះបញ្ជាឧបករណ៍បំពងសំឡេង — រុញខ្យល់ បង្កើតបទចម្រៀងឡើងវិញ។",
      icon: Speaker,
      diagram: <ReceiverSvg kh={kh} />,
    },
  ];

  return (
    <div className="relative mb-12">
      <div className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-amber-300/80 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {t("Step-by-step · The anatomy of a broadcast", "មួយជំហាន-ម្តងៗ · កាយវិភាគនៃការផ្សាយ")}
      </div>

      <ol className="relative space-y-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isLast = i === steps.length - 1;
          return (
            <li key={s.n} className="relative">
              <article className="relative rounded-2xl border border-cyan-400/30 bg-slate-950/70 shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-[80px_minmax(0,1fr)_280px] gap-4 p-4 sm:p-5 items-center">
                  {/* Step badge */}
                  <div className="flex md:flex-col items-center gap-2 md:gap-1">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border-2 border-cyan-400/70 text-cyan-300 flex items-center justify-center shadow-[0_0_14px_rgba(34,211,238,0.35)] flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-[10px] font-mono font-bold tracking-[0.25em] text-cyan-400/80">{s.n}</div>
                  </div>
                  {/* Text */}
                  <div className="min-w-0">
                    <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-amber-300/80 mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                      {kh ? s.roleKh : s.roleEn}
                    </div>
                    <h3 className={`text-lg font-bold text-cyan-50 mb-1.5 ${kh ? "font-khmer" : ""}`}>
                      {kh ? s.nameKh : s.nameEn}
                    </h3>
                    <p className={`text-sm text-cyan-100/80 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                      {kh ? s.descKh : s.descEn}
                    </p>
                  </div>
                  {/* Mini-scope diagram */}
                  <div className="rounded-lg border border-cyan-500/30 bg-black/60 p-2.5 flex items-center justify-center min-h-[120px]">
                    {s.diagram}
                  </div>
                </div>
              </article>
              {/* arrow connector */}
              {!isLast && (
                <div aria-hidden="true" className="flex justify-center py-1">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-400/80 to-cyan-400/20" />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ── 7.2 AM vs FM ─────────────────────────────────────────────────────────
function ModulationCompare({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <div className="mb-12">
      <div className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-amber-300/80 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {t("Two modulation methods · how we hide sound in a wave", "វិធីម៉ូឌុយឡេស៊ីយុងពីរ · របៀបយើងលាក់សំឡេងក្នុងរលក")}
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
        {/* AM */}
        <article className="relative rounded-2xl border border-rose-400/40 bg-slate-950/70 shadow-lg overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-xl bg-rose-500/15 border-2 border-rose-400/60 text-rose-300 flex items-center justify-center flex-shrink-0 shadow-[0_0_14px_rgba(244,63,94,0.4)]">
                <Waves className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-rose-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  {t("Amplitude Modulation", "ម៉ូឌុយឡាស៊ីយុងអាំភ្លីទុត")}
                </div>
                <h4 className={`text-lg font-bold text-cyan-50 ${kh ? "font-khmer" : ""}`}>AM</h4>
              </div>
            </div>
            <div className="rounded-lg border border-cyan-500/30 bg-black/60 p-3 mb-3 min-h-[150px] flex items-center justify-center">
              <AmWaveSvg kh={kh} />
            </div>
            <p className={`text-sm text-cyan-100/85 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "The HEIGHT (amplitude) of the carrier wave changes to copy the audio. Tall peaks = loud, small peaks = quiet. The shape of the audio is traced along the top of the carrier.",
                "កម្ពស់ (អាំភ្លីទុត) នៃរលកដឹកជញ្ជូនផ្លាស់ប្តូរដើម្បីចម្លងសំឡេង។ កំពូលខ្ពស់ = ខ្លាំង, កំពូលតូច = ស្ងាត់។ រូបរាងសំឡេងត្រូវបានគូរនៅខាងលើរលកដឹកជញ្ជូន។"
              )}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-2">
                <div className={`font-mono font-bold text-emerald-300 mb-0.5 ${kh ? "font-khmer text-[11px]" : ""}`}>{t("PRO · Long range", "ល្អ · ចំងាយឆ្ងាយ")}</div>
                <div className={`text-cyan-100/75 ${kh ? "font-khmer" : ""}`}>{t("Bounces off the upper atmosphere — reaches across provinces.", "លោតពីបរិយាកាសខាងលើ — ឈានដល់ឆ្លងខេត្ត។")}</div>
              </div>
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-2">
                <div className={`font-mono font-bold text-rose-300 mb-0.5 ${kh ? "font-khmer text-[11px]" : ""}`}>{t("CON · Static", "មិនល្អ · សំឡេងរំខាន")}</div>
                <div className={`text-cyan-100/75 ${kh ? "font-khmer" : ""}`}>{t("Lightning, motors and storms add noise to the height — you hear crackles.", "រន្ទះ ម៉ាស៊ីន និងព្យុះបន្ថែមសំឡេងរំខានដល់កម្ពស់ — អ្នកឮសំឡេងប្រេះៗ។")}</div>
              </div>
            </div>
          </div>
        </article>

        {/* FM */}
        <article className="relative rounded-2xl border border-cyan-400/40 bg-slate-950/70 shadow-lg overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border-2 border-cyan-400/60 text-cyan-300 flex items-center justify-center flex-shrink-0 shadow-[0_0_14px_rgba(34,211,238,0.4)]">
                <AudioLines className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-cyan-300 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  {t("Frequency Modulation", "ម៉ូឌុយឡាស៊ីយុងប្រេកង់")}
                </div>
                <h4 className={`text-lg font-bold text-cyan-50 ${kh ? "font-khmer" : ""}`}>FM</h4>
              </div>
            </div>
            <div className="rounded-lg border border-cyan-500/30 bg-black/60 p-3 mb-3 min-h-[150px] flex items-center justify-center">
              <FmWaveSvg kh={kh} />
            </div>
            <p className={`text-sm text-cyan-100/85 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "The HEIGHT stays constant. Instead, the SPACING between the waves changes — squeezed close together for loud, spread far apart for quiet. The wave 'breathes' in time with the audio.",
                "កម្ពស់នៅថេរ។ ផ្ទុយទៅវិញ ចំងាយរវាងរលកផ្លាស់ប្តូរ — បង្រួមជិតពេលខ្លាំង រាលឆ្ងាយពេលស្ងាត់។ រលក 'ដកដង្ហើម' តាមចង្វាក់សំឡេង។"
              )}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-2">
                <div className={`font-mono font-bold text-emerald-300 mb-0.5 ${kh ? "font-khmer text-[11px]" : ""}`}>{t("PRO · Hi-fi sound", "ល្អ · សំឡេងច្បាស់")}</div>
                <div className={`text-cyan-100/75 ${kh ? "font-khmer" : ""}`}>{t("Storms can't change spacing — music stays clean and full.", "ព្យុះមិនអាចផ្លាស់ប្តូរចំងាយ — តន្ត្រីនៅស្អាតពេញលេញ។")}</div>
              </div>
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-2">
                <div className={`font-mono font-bold text-rose-300 mb-0.5 ${kh ? "font-khmer text-[11px]" : ""}`}>{t("CON · Short range", "មិនល្អ · ចំងាយខ្លី")}</div>
                <div className={`text-cyan-100/75 ${kh ? "font-khmer" : ""}`}>{t("Travels in straight lines, blocked by hills — typically only 50–80 km.", "ធ្វើដំណើរជាបន្ទាត់ត្រង់ ត្រូវបានទប់ដោយភ្នំ — ជាធម្មតាត្រឹម ៥០–៨០ គ.ម។")}</div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

// ── 7.3 Channels & Tuning ────────────────────────────────────────────────
function ChannelsCard({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  const stations: { label: string; freq: number; nameEn: string; nameKh: string }[] = [
    { label: "92.5", freq: 92.5, nameEn: "Khmer Pop", nameKh: "ប៉ុបខ្មែរ" },
    { label: "95.5", freq: 95.5, nameEn: "News", nameKh: "ព័ត៌មាន" },
    { label: "97.5", freq: 97.5, nameEn: "Classical", nameKh: "ក្លាស៊ិច" },
    { label: "99.5", freq: 99.5, nameEn: "Sports", nameKh: "កីឡា" },
    { label: "102.5", freq: 102.5, nameEn: "Talk", nameKh: "សំណើ" },
    { label: "105.5", freq: 105.5, nameEn: "Hits", nameKh: "បទពេញនិយម" },
  ];
  const [tuned, setTuned] = useState(1); // index of stations[]

  return (
    <div>
      <div className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-amber-300/80 mb-3 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {t("What is a 'channel'? · Frequencies & tuning", "តើ 'ឆានែល' ជាអ្វី? · ប្រេកង់ និងការបន្តុំ")}
      </div>

      <article className="relative rounded-2xl border border-amber-400/40 bg-slate-950/80 shadow-lg overflow-hidden">
        <div className="p-5 sm:p-6 grid lg:grid-cols-[minmax(0,1fr)_360px] gap-5 items-center">
          {/* Text */}
          <div>
            <h3 className={`text-xl font-bold text-amber-100 mb-2 ${kh ? "font-khmer" : ""}`}>
              {t("'95.5 FM' is a math instruction", "'95.5 FM' គឺជាការណែនាំគណិតវិទ្យា")}
            </h3>
            <p className={`text-sm sm:text-base text-cyan-100/85 leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "When a station calls itself 95.5 FM, that number is its carrier-wave frequency: 95,500,000 vibrations per second — 95.5 megahertz (MHz). Every station in the world has its own number. Two stations sharing one number would crash into each other and you'd hear noise.",
                "នៅពេលស្ថានីយមួយហៅខ្លួនឯងថា 95.5 FM លេខនោះគឺជាប្រេកង់រលកដឹកជញ្ជូនរបស់វា ៖ ៩៥,៥០០,០០០ ការញ័រក្នុងមួយវិនាទី — ៩៥.៥ មេហ្គាហឺត (MHz)។ រាល់ស្ថានីយក្នុងពិភពលោកមានលេខផ្ទាល់ខ្លួន។ ស្ថានីយពីរដែលប្រើលេខតែមួយនឹងបុកគ្នា ហើយអ្នកនឹងឮសំឡេងរំខាន។"
              )}
            </p>
            <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-3 mb-3">
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-amber-300 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Tuning · the magic of resonance", "ការបន្តុំ · មន្តស្នេហ៍នៃរេសូណង់")}
              </div>
              <p className={`text-sm text-cyan-100/85 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Hundreds of waves are crossing your kitchen right now — pop, news, taxi dispatch, military. When you 'tune' the dial, you adjust a tiny capacitor in your radio so its own circuit vibrates at exactly 95.5 MHz. It then resonates with that one wave and ignores all the others — like a glass that shatters only at the singer's exact note.",
                  "រលករាប់រយកំពុងឆ្លងកាត់ផ្ទះបាយរបស់អ្នកនៅពេលនេះ — ប៉ុប ព័ត៌មាន ការបញ្ជូនតាក់ស៊ី យោធា។ នៅពេលអ្នក 'បន្តុំ' វិទ្យុ អ្នកកែឧបករណ៍ផ្ទុកអគ្គិសនីតូចមួយ ដើម្បីឱ្យសៀគ្វីរបស់វាញ័រនៅ ៩៥.៥ MHz ច្បាស់។ វារ៉េសូណង់ជាមួយរលកនោះតែមួយ ហើយមិនអើពើនឹងរលកដទៃទាំងអស់ — ដូចជាកែវដែលបែកនៅពេលចង្វាក់ច្បាស់របស់អ្នកចម្រៀងតែមួយ។"
                )}
              </p>
            </div>
            <div className={`text-xs text-cyan-300/70 font-mono ${kh ? "font-khmer text-sm" : ""}`}>
              {t("Try it ↓ tap a station to retune the dial", "សាកល្បង ↓ ចុចលើស្ថានីយដើម្បីបន្តុំឡើងវិញ")}
            </div>
          </div>

          {/* Tuner widget */}
          <RadioTuner stations={stations} tuned={tuned} onTune={setTuned} kh={kh} t={t} />
        </div>
      </article>
    </div>
  );
}

function RadioTuner({
  stations, tuned, onTune, kh, t,
}: {
  stations: { label: string; freq: number; nameEn: string; nameKh: string }[];
  tuned: number;
  onTune: (i: number) => void;
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  const current = stations[tuned];
  // Map frequency 90–108 MHz to 0–100% on the dial
  const minF = 90, maxF = 108;
  const pct = ((current.freq - minF) / (maxF - minF)) * 100;

  return (
    <div className="rounded-2xl border-2 border-amber-500/50 bg-gradient-to-b from-slate-900 to-black p-4 shadow-[0_0_24px_rgba(251,191,36,0.15)]">
      {/* Display */}
      <div className="rounded-lg bg-black border border-amber-500/40 p-3 mb-3 shadow-inner">
        <div className={`text-[9px] font-mono tracking-[0.3em] uppercase text-amber-500/80 ${kh ? "font-khmer normal-case tracking-normal text-[11px]" : ""}`}>
          {t("FM TUNER · NOW TUNED TO", "ឧបករណ៍បន្តុំ FM · បន្តុំទៅ")}
        </div>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="font-mono text-3xl sm:text-4xl font-bold text-amber-300 tabular-nums" style={{ textShadow: "0 0 12px rgba(252,211,77,0.7)" }}>
            {current.label}
          </span>
          <span className="text-amber-300/80 font-mono text-sm">MHz</span>
        </div>
        <div className={`text-xs text-amber-200/80 mt-0.5 ${kh ? "font-khmer text-sm" : ""}`}>
          {kh ? current.nameKh : current.nameEn}
        </div>
      </div>

      {/* Dial */}
      <div className="relative h-10 rounded-md bg-slate-950 border border-amber-500/30 overflow-hidden mb-3">
        {/* tick marks */}
        {Array.from({ length: 19 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-amber-500/25"
            style={{ left: `${(i / 18) * 100}%` }}
          />
        ))}
        {/* range labels */}
        <div className="absolute left-1.5 bottom-0.5 text-[9px] font-mono text-amber-500/70">90</div>
        <div className="absolute right-1.5 bottom-0.5 text-[9px] font-mono text-amber-500/70">108</div>
        {/* needle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-rose-400 transition-all duration-300"
          style={{ left: `${pct}%`, boxShadow: "0 0 8px rgba(251,113,133,0.9)" }}
        />
      </div>

      {/* Station buttons */}
      <div className="grid grid-cols-3 gap-1.5">
        {stations.map((s, i) => {
          const isOn = i === tuned;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => onTune(i)}
              aria-pressed={isOn}
              className={`px-2 py-1.5 rounded-md text-xs font-mono font-bold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                isOn
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                  : "bg-slate-900 text-amber-300/70 border-amber-500/30 hover:border-amber-400 hover:text-amber-200"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Mini-scope SVGs (oscilloscope style — glowing cyan on black)
// ─────────────────────────────────────────────────────────────────────────
function ScopeGrid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </>
  );
}

function GlowPath({ d, color = SCOPE_GREEN, w = 1.8 }: { d: string; color?: string; w?: number }) {
  return (
    <g style={{ filter: `drop-shadow(0 0 3px ${color})` }}>
      <path d={d} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

// 7.1 step 01 — speech bubble + electrical wobble
function SoundToSignalSvg({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 240 110" className="w-full h-auto" role="img" aria-label={kh ? "សំឡេងទៅសញ្ញាអគ្គិសនី" : "Sound to electrical signal"}>
      <ScopeGrid id="scope-mic" />
      {/* mic body */}
      <rect x="14" y="35" width="22" height="40" rx="11" fill="#1e293b" stroke={SCOPE_GREEN} strokeWidth="1.2" />
      <rect x="22" y="75" width="6" height="14" fill="#1e293b" stroke={SCOPE_GREEN} strokeWidth="1" />
      {/* sound waves entering */}
      <GlowPath d="M 4 50 Q 8 55 4 60" color={BROADCAST_AMBER} w={1.2} />
      <GlowPath d="M 0 45 Q 6 55 0 65" color={BROADCAST_AMBER} w={1.2} />
      {/* arrow */}
      <line x1="40" y1="55" x2="80" y2="55" stroke={SCOPE_GREEN} strokeWidth="1" strokeDasharray="2 2" />
      {/* output: a low-frequency wobble representing audio voltage */}
      <GlowPath d="M 84 55 C 92 30, 104 80, 116 50 S 140 25, 152 55 S 180 80, 196 50 S 220 35, 232 55" />
      <text x="125" y="100" fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill={SCOPE_GREEN} textAnchor="middle">
        {kh ? "សញ្ញាសំឡេងអគ្គិសនី" : "AUDIO VOLTAGE"}
      </text>
    </svg>
  );
}

// 7.1 step 02 — slow audio + fast carrier → mixed
function CarrierMixSvg({ kh }: { kh: boolean }) {
  // Build a fast carrier whose amplitude follows a slow envelope (AM-style "mixed")
  let mixed = "M 0 55 ";
  for (let x = 0; x <= 240; x += 3) {
    const env = 22 * Math.sin((x / 240) * Math.PI * 2);
    const carrier = Math.sin(x * 0.55) * env;
    mixed += `L ${x} ${55 - carrier} `;
  }
  return (
    <svg viewBox="0 0 240 110" className="w-full h-auto" role="img" aria-label={kh ? "ការលាយរលក" : "Audio mixed onto carrier"}>
      <ScopeGrid id="scope-mix" />
      {/* slow audio (dim) */}
      <GlowPath d="M 0 25 C 60 5, 120 45, 240 25" color={BROADCAST_AMBER} w={1} />
      <text x="6" y="14" fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill={BROADCAST_AMBER}>
        {kh ? "សំឡេង (យឺត)" : "AUDIO (slow)"}
      </text>
      {/* mixed (bright) */}
      <GlowPath d={mixed} />
      <text x="6" y="100" fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill={SCOPE_GREEN}>
        {kh ? "ការលាយរួច" : "MIXED OUTPUT"}
      </text>
    </svg>
  );
}

// 7.1 step 03 — antenna with concentric waves
function AntennaBroadcastSvg({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 240 130" className="w-full h-auto" role="img" aria-label={kh ? "អង់តែនផ្សាយ" : "Antenna broadcasting"}>
      <ScopeGrid id="scope-ant" />
      {/* ground */}
      <line x1="0" y1="115" x2="240" y2="115" stroke={SCOPE_GREEN} strokeWidth="1" opacity="0.6" />
      {/* antenna mast */}
      <line x1="120" y1="115" x2="120" y2="35" stroke={SCOPE_GREEN} strokeWidth="2" />
      {/* lattice */}
      <path d="M 110 105 L 130 95 M 130 105 L 110 95 M 112 90 L 128 80 M 128 90 L 112 80 M 114 75 L 126 65 M 126 75 L 114 65 M 116 60 L 124 50 M 124 60 L 116 50" stroke={SCOPE_GREEN} strokeWidth="0.8" />
      {/* tip light */}
      <circle cx="120" cy="33" r="2.5" fill={BROADCAST_AMBER}>
        <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
      {/* radiating concentric arcs (animated) */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx="120"
          cy="50"
          r="20"
          fill="none"
          stroke={SCOPE_GREEN}
          strokeWidth="1.2"
          opacity="0.6"
          style={{ filter: `drop-shadow(0 0 3px ${SCOPE_GREEN})` }}
        >
          <animate attributeName="r" values="20;90;20" dur="3.6s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="3.6s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <text x="120" y="128" fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill={SCOPE_GREEN} textAnchor="middle">
        {kh ? "រលកអេឡិចត្រូម៉ាញេទិច" : "EM WAVE OUT"}
      </text>
    </svg>
  );
}

// 7.1 step 04 — receiver: wave → speaker
function ReceiverSvg({ kh }: { kh: boolean }) {
  return (
    <svg viewBox="0 0 240 110" className="w-full h-auto" role="img" aria-label={kh ? "អ្នកទទួល" : "Receiver: wave → speaker"}>
      <ScopeGrid id="scope-rx" />
      {/* incoming mixed wave */}
      <GlowPath d="M 0 55 C 12 30, 24 80, 36 55 S 60 25, 72 55 S 96 80, 108 55" w={1.4} />
      {/* funnel shape (filter) */}
      <path d="M 110 30 L 150 45 L 150 65 L 110 80 Z" fill="rgba(34,211,238,0.08)" stroke={SCOPE_GREEN} strokeWidth="1" />
      <text x="130" y="55" fontSize="7" fontFamily={kh ? "inherit" : "monospace"} fill={SCOPE_GREEN} textAnchor="middle">{kh ? "តម្រង" : "FILTER"}</text>
      {/* recovered audio (slow) */}
      <GlowPath d="M 152 55 C 168 30, 184 80, 200 55" color={BROADCAST_AMBER} w={1.6} />
      {/* speaker */}
      <path d="M 204 40 L 214 40 L 226 28 L 226 82 L 214 70 L 204 70 Z" fill="#1e293b" stroke={BROADCAST_AMBER} strokeWidth="1.2" />
      {/* sound out */}
      <GlowPath d="M 230 45 Q 234 55 230 65" color={BROADCAST_AMBER} w={1.2} />
      <GlowPath d="M 234 40 Q 240 55 234 70" color={BROADCAST_AMBER} w={1.2} />
      <text x="60" y="100" fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill={SCOPE_GREEN}>
        {kh ? "រលកមកដល់" : "INCOMING"}
      </text>
      <text x="178" y="100" fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill={BROADCAST_AMBER}>
        {kh ? "សំឡេង!" : "SOUND!"}
      </text>
    </svg>
  );
}

// 7.2 AM wave — constant frequency, varying amplitude
function AmWaveSvg({ kh }: { kh: boolean }) {
  // Carrier of constant high frequency, with envelope = amplitude varying along x
  let path = "M 0 70 ";
  let envTop = "M 0 70 ";
  let envBot = "M 0 70 ";
  for (let x = 0; x <= 320; x += 2) {
    // Envelope stays strictly positive (5.6 → 28) so the carrier is never
    // phase-inverted — pedagogically correct AM where only height changes.
    const env = 28 * (0.2 + 0.8 * (0.5 + 0.5 * Math.sin((x / 320) * Math.PI * 2.2)));
    const carrier = Math.sin(x * 0.6) * env;
    path += `L ${x} ${70 - carrier} `;
    envTop += `L ${x} ${70 - env} `;
    envBot += `L ${x} ${70 + env} `;
  }
  return (
    <svg viewBox="0 0 320 140" className="w-full h-auto" role="img" aria-label={kh ? "រលក AM" : "AM wave — varying amplitude"}>
      <ScopeGrid id="scope-am" />
      {/* envelope (audio shape) */}
      <GlowPath d={envTop} color={BROADCAST_AMBER} w={1} />
      <GlowPath d={envBot} color={BROADCAST_AMBER} w={1} />
      {/* AM-modulated carrier */}
      <GlowPath d={path} color="#f87171" w={1.6} />
      {/* axis */}
      <line x1="0" y1="70" x2="320" y2="70" stroke="rgba(34,211,238,0.4)" strokeWidth="0.6" strokeDasharray="2 3" />
      <text x="6" y="14" fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill={BROADCAST_AMBER}>
        {kh ? "ទម្រង់សំឡេង (កម្ពស់)" : "AUDIO ENVELOPE (HEIGHT)"}
      </text>
      <text x="6" y="132" fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill="#f87171">
        {kh ? "AM · កម្ពស់ផ្លាស់ប្តូរ" : "AM · amplitude varies"}
      </text>
    </svg>
  );
}

// 7.2 FM wave — constant amplitude, varying frequency
function FmWaveSvg({ kh }: { kh: boolean }) {
  // FM: phase is integral of (carrier_freq + audio*sensitivity)
  const A = 26;
  let path = "M 0 70 ";
  let phase = 0;
  for (let x = 0; x <= 320; x += 1.5) {
    // audio modulation signal — a slow sine
    const audio = Math.sin((x / 320) * Math.PI * 2.2);
    // Carrier baseline f_c stays safely above deviation k, so instantaneous
    // frequency never approaches zero (range ≈ 0.30 → 0.80).
    const instFreq = 0.55 + 0.25 * audio;
    phase += instFreq * 1.5;
    const y = 70 - A * Math.sin(phase);
    path += `L ${x} ${y} `;
  }
  // The audio reference (so students see what's driving the squeezing)
  let aud = "M 0 16 ";
  for (let x = 0; x <= 320; x += 4) {
    const audio = Math.sin((x / 320) * Math.PI * 2.2);
    aud += `L ${x} ${16 - 8 * audio} `;
  }
  return (
    <svg viewBox="0 0 320 140" className="w-full h-auto" role="img" aria-label={kh ? "រលក FM" : "FM wave — varying frequency"}>
      <ScopeGrid id="scope-fm" />
      {/* small audio reference at top */}
      <GlowPath d={aud} color={BROADCAST_AMBER} w={1} />
      {/* FM carrier */}
      <GlowPath d={path} color={SCOPE_GREEN} w={1.6} />
      <line x1="0" y1="70" x2="320" y2="70" stroke="rgba(34,211,238,0.4)" strokeWidth="0.6" strokeDasharray="2 3" />
      <text x="6" y="34" fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill={BROADCAST_AMBER}>
        {kh ? "ទម្រង់សំឡេង" : "AUDIO SHAPE"}
      </text>
      <text x="6" y="132" fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill={SCOPE_GREEN}>
        {kh ? "FM · ចំងាយរវាងរលកផ្លាស់ប្តូរ" : "FM · spacing varies"}
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
 * SECTION 9 · The Holy Grail — Room-Temperature Superconductors
 *   ▸ Sub 1: The Problem with Copper      (rust-orange friction)
 *   ▸ Sub 2: The Magic of Zero Resistance (cyan glow + Meissner)
 *   ▸ Sub 3: The Cold Catch              (ice-blue / frost)
 *   ▸ Sub 4: A Post-Scarcity World       (silver + cyan applications)
 * ══════════════════════════════════════════════════════════════════════════ */

function SuperconductorsSection({
  kh,
  t,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
}) {
  return (
    <section
      className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 my-8 rounded-3xl overflow-hidden border border-cyan-400/20 shadow-2xl"
      style={{
        backgroundColor: "#02030a",
        backgroundImage:
          "radial-gradient(ellipse at top, rgba(34,211,238,0.10), transparent 60%), " +
          "radial-gradient(ellipse at bottom, rgba(148,163,184,0.08), transparent 55%), " +
          "linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), " +
          "linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)",
        backgroundSize: "auto, auto, 32px 32px, 32px 32px",
      }}
    >
      {/* Subtle scanline overlay — same retro CRT feel as the radio section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(226,232,240,1) 0, rgba(226,232,240,1) 1px, transparent 1px, transparent 4px)",
        }}
      />
      {/* Floating "atoms" — pure decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-[8%] left-[6%] w-2 h-2 rounded-full bg-cyan-300/60 shadow-[0_0_12px_rgba(34,211,238,0.7)] animate-pulse" />
        <div className="absolute top-[18%] right-[10%] w-1.5 h-1.5 rounded-full bg-slate-200/70 shadow-[0_0_10px_rgba(226,232,240,0.7)] animate-pulse [animation-delay:600ms]" />
        <div className="absolute bottom-[14%] left-[12%] w-1.5 h-1.5 rounded-full bg-cyan-200/60 shadow-[0_0_10px_rgba(165,243,252,0.7)] animate-pulse [animation-delay:1200ms]" />
        <div className="absolute bottom-[8%] right-[8%] w-2 h-2 rounded-full bg-slate-300/50 shadow-[0_0_14px_rgba(203,213,225,0.6)] animate-pulse [animation-delay:300ms]" />
      </div>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="relative text-center mb-12">
        <div
          className={`inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] uppercase text-cyan-300/80 mb-3 ${
            kh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
          <span>{t("FRONTIER · Section 09", "ព្រំដែន · ផ្នែក ០៩")}</span>
        </div>
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyan-500/10 border-2 border-cyan-300/50 text-cyan-200 mb-5 shadow-[0_0_36px_rgba(34,211,238,0.45)]">
          <Atom className="w-10 h-10 animate-[spin_8s_linear_infinite]" />
        </div>
        <h2
          data-testid="superconductors-heading"
          className="mb-3"
        >
          {/* Strictly bilingual heading: BOTH languages always render */}
          <span
            className={`block text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-200 via-slate-100 to-cyan-300 bg-clip-text text-transparent ${
              kh ? "font-khmer leading-snug" : "font-display"
            }`}
          >
            {kh
              ? "ផ្តិលសក្ការៈ៖ អង្គធាតុចម្លងកំពូលនៅសីតុណ្ហភាពបន្ទប់"
              : "The Holy Grail: Room-Temperature Superconductors"}
          </span>
          <span
            className={`block text-base md:text-lg font-semibold text-slate-300/80 mt-2 ${
              kh ? "font-display" : "font-khmer leading-snug"
            }`}
          >
            {kh
              ? "The Holy Grail: Room-Temperature Superconductors"
              : "ផ្តិលសក្ការៈ៖ អង្គធាតុចម្លងកំពូលនៅសីតុណ្ហភាពបន្ទប់"}
          </span>
        </h2>
        <p
          className={`mt-4 text-sm sm:text-base text-cyan-100/70 max-w-2xl mx-auto leading-relaxed ${
            kh ? "font-khmer leading-loose" : ""
          }`}
        >
          {t(
            "Every wire we have ever built loses power as heat. The single biggest unsolved problem in electricity is also the door to a future of unlimited clean energy. Let's look at what's standing in the way.",
            "ខ្សែភ្លើងគ្រប់ខ្សែដែលយើងធ្លាប់បានសាងសង់ បាត់បង់ថាមពលជាកម្ដៅ។ បញ្ហាដ៏ធំបំផុតមួយដែលមិនទាន់ដោះស្រាយបាននៅក្នុងវិស័យអគ្គិសនី គឺជាទ្វារទៅកាន់អនាគតនៃថាមពលស្អាតគ្មានដែនកំណត់។ ចូរយើងមើលថាតើអ្វីដែលកំពុងរារាំងវា។",
          )}
        </p>
      </header>

      {/* ── Sub 1: The Problem with Copper ──────────────────────────────── */}
      <article
        data-testid="superconductors-problem"
        className="relative rounded-2xl border border-orange-400/30 bg-slate-950/70 shadow-lg overflow-hidden mb-6"
      >
        <div className="grid md:grid-cols-[280px_minmax(0,1fr)] gap-0">
          <div className="relative bg-gradient-to-br from-orange-950/60 via-amber-950/40 to-slate-950 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-orange-400/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/15 border-2 border-orange-400/60 text-orange-300 mb-3 shadow-[0_0_20px_rgba(251,146,60,0.4)]">
              <Flame className="w-8 h-8" />
            </div>
            <div
              className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-orange-300/80 ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {t("Sub 1 · The friction problem", "ផ្នែក ១ · បញ្ហាកកិត")}
            </div>
            {/* Bumpy "dirt road" SVG */}
            <BumpyRoadSvg />
            <div
              className={`text-[10px] text-orange-200/70 mt-1 text-center ${
                kh ? "font-khmer text-xs" : "font-mono"
              }`}
            >
              {t("Electrons hit atoms → heat", "អេឡិចត្រុងប៉ះអាតូម → កម្ដៅ")}
            </div>
          </div>
          <div className="p-6 sm:p-7">
            <h3
              className={`text-xl sm:text-2xl font-bold mb-1 text-orange-100 ${
                kh ? "font-khmer leading-snug" : "font-display"
              }`}
            >
              {kh ? "បញ្ហានៃទង់ដែង" : "The Problem with Copper"}
            </h3>
            <div
              className={`text-sm text-orange-200/70 mb-4 ${
                kh ? "font-display" : "font-khmer"
              }`}
            >
              {kh ? "The Problem with Copper" : "បញ្ហានៃទង់ដែង"}
            </div>
            <p
              className={`text-sm sm:text-base text-slate-200/90 leading-relaxed mb-3 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Remember the safety lessons — every wire in your home gets a little warm when current flows through it. That warmth is wasted energy.",
                "ចងចាំមេរៀនសុវត្ថិភាព — ខ្សែភ្លើងគ្រប់ខ្សែក្នុងផ្ទះរបស់អ្នកតែងតែក្ដៅបន្តិចបន្តួចនៅពេលដែលចរន្តហូរកាត់។ កំដៅនោះគឺជាថាមពលដែលបានខ្ជះខ្ជាយ។",
              )}
            </p>
            <p
              className={`text-sm sm:text-base text-slate-200/90 leading-relaxed mb-3 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Imagine a normal copper wire as a bumpy dirt road. As electrons try to push through, they keep bumping into the copper atoms — over and over, billions of times per second. That bumping is friction, and friction creates heat.",
                "ស្រមៃថាខ្សែទង់ដែងធម្មតាគឺដូចជាផ្លូវដីមិនរលោង។ នៅពេលដែលអេឡិចត្រុងព្យាយាមរុញឆ្លងកាត់ ពួកវាបន្តប៉ះអាតូមទង់ដែង — ម្ដងហើយម្ដងទៀត រាប់ពាន់លានដងក្នុងមួយវិនាទី។ ការប៉ះនោះគឺជាកម្លាំងកកិត ហើយកម្លាំងកកិតបង្កើតកម្ដៅ។",
              )}
            </p>
            <div className="rounded-lg border border-orange-400/30 bg-orange-950/30 p-3 mt-4">
              <p
                className={`text-xs sm:text-sm text-orange-100/90 leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                <strong className="text-orange-200">
                  {t("The cost: ", "តម្លៃ៖ ")}
                </strong>
                {t(
                  "this friction-heat is what trips our circuit breakers, and on the long-distance power grid it wastes a massive 5–10% of every kilowatt-hour generated — lost to the air before it ever reaches a single home.",
                  "កម្ដៅកកិតនេះគឺជាអ្វីដែលកាត់ប្រអប់ផ្ដាច់ ហើយនៅលើបណ្ដាញចម្ងាយឆ្ងាយ វាខ្ជះខ្ជាយប្រហែល ៥–១០% នៃគីឡូវ៉ាត់ម៉ោងគ្រប់ឯកតាដែលបានផលិត — បាត់បង់ទៅក្នុងខ្យល់មុនពេលវាទៅដល់ផ្ទះណាមួយ។",
                )}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* ── Sub 2: The Magic of Zero Resistance ─────────────────────────── */}
      <article
        data-testid="superconductors-magic"
        className="relative rounded-2xl border border-cyan-400/40 bg-slate-950/70 shadow-[0_0_28px_rgba(34,211,238,0.15)] overflow-hidden mb-6"
      >
        <div className="grid md:grid-cols-[280px_minmax(0,1fr)] gap-0">
          <div className="relative bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-950 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-cyan-400/30">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-400/15 border-2 border-cyan-300/70 text-cyan-200 mb-3 shadow-[0_0_24px_rgba(34,211,238,0.55)]">
              <Magnet className="w-8 h-8" />
            </div>
            <div
              className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-cyan-300/80 ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {t("Sub 2 · Zero resistance", "ផ្នែក ២ · គ្មានរេស៊ីស្តង់")}
            </div>
            {/* Smooth highway SVG */}
            <SmoothHighwaySvg />
            <div
              className={`text-[10px] text-cyan-200/80 mt-1 text-center ${
                kh ? "font-khmer text-xs" : "font-mono"
              }`}
            >
              {t("Electrons glide → no heat", "អេឡិចត្រុងហោះ → គ្មានកម្ដៅ")}
            </div>
          </div>
          <div className="p-6 sm:p-7">
            <h3
              className={`text-xl sm:text-2xl font-bold mb-1 text-cyan-100 ${
                kh ? "font-khmer leading-snug" : "font-display"
              }`}
            >
              {kh ? "វេទមន្តនៃភាពគ្មានរេស៊ីស្តង់" : "The Magic of Zero Resistance"}
            </h3>
            <div
              className={`text-sm text-cyan-200/70 mb-4 ${
                kh ? "font-display" : "font-khmer"
              }`}
            >
              {kh ? "The Magic of Zero Resistance" : "វេទមន្តនៃភាពគ្មានរេស៊ីស្តង់"}
            </div>
            <p
              className={`text-sm sm:text-base text-slate-200/90 leading-relaxed mb-3 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "A superconductor is a special material where, under the right conditions, the electrons pair up and glide through the atomic structure without hitting anything at all. It is, in effect, a perfectly smooth highway for electricity.",
                "អង្គធាតុចម្លងកំពូល គឺជាសម្ភារៈពិសេសមួយ ដែលក្រោមលក្ខខណ្ឌត្រឹមត្រូវ អេឡិចត្រុងផ្គូផ្គងគ្នា និងហោះឆ្លងកាត់រចនាសម្ព័ន្ធអាតូម ដោយមិនប៉ះអ្វីសោះឡើយ។ វាជាផ្លូវហាយវេយរលោងឥតខ្ចោះសម្រាប់អគ្គិសនី។",
              )}
            </p>
            <p
              className={`text-sm sm:text-base text-slate-200/90 leading-relaxed mb-4 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Because there is no friction, there is no heat. A superconducting wire never gets hot, no matter how much power you push through it. A current started in a closed superconducting loop will, in theory, flow forever — without a battery, without a source.",
                "ដោយសារតែគ្មានកម្លាំងកកិត ដូច្នេះគ្មានកម្ដៅ។ ខ្សែអង្គធាតុចម្លងកំពូលមិនដែលក្ដៅឡើយ មិនថាអ្នករុញថាមពលច្រើនប៉ុណ្ណាក៏ដោយ។ ចរន្តដែលបានចាប់ផ្ដើមនៅក្នុងរង្វិលអង្គធាតុចម្លងកំពូលបិទជិតមួយ តាមទ្រឹស្ដីនឹងហូរជារៀងរហូត — ដោយគ្មានថ្ម គ្មានប្រភព។",
              )}
            </p>
            <div className="rounded-lg border border-cyan-400/40 bg-cyan-950/30 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-400/20 border border-cyan-300/50 text-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.5)]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4
                    className={`text-sm sm:text-base font-bold text-cyan-100 mb-1 ${
                      kh ? "font-khmer leading-snug" : "font-display"
                    }`}
                  >
                    {kh
                      ? "ឥទ្ធិពល Meissner — ការអណ្ដែតទេពកោសល្យ"
                      : "The Meissner Effect — Magic Levitation"}
                  </h4>
                  <p
                    className={`text-xs sm:text-sm text-cyan-100/80 leading-relaxed ${
                      kh ? "font-khmer leading-loose" : ""
                    }`}
                  >
                    {t(
                      "Superconductors don't just carry current perfectly — they also push magnetic fields away with perfect strength. Place a magnet above a superconductor and the magnet will float in mid-air, perfectly still. This is called the Meissner Effect, and it is the secret behind the maglev trains we'll meet below.",
                      "អង្គធាតុចម្លងកំពូលមិនត្រឹមតែដឹកនាំចរន្តបានឥតខ្ចោះប៉ុណ្ណោះទេ — ពួកវាក៏ច្រានវាលម៉ាញេទិចចេញដោយកម្លាំងឥតខ្ចោះផងដែរ។ ដាក់មេដែកនៅពីលើអង្គធាតុចម្លងកំពូល នោះមេដែកនឹងអណ្ដែតក្នុងអាកាស នឹងធឹង។ វាត្រូវបានគេហៅថាឥទ្ធិពល Meissner ហើយវាគឺជាអាថ៌កំបាំងនៅពីក្រោយរថភ្លើងម៉ាហ្គ្លេវដែលយើងនឹងជួបនៅខាងក្រោម។",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ── Sub 3: The Cold Catch ───────────────────────────────────────── */}
      <article
        data-testid="superconductors-cold"
        className="relative rounded-2xl border border-sky-400/30 bg-slate-950/70 shadow-lg overflow-hidden mb-6"
      >
        <div className="grid md:grid-cols-[280px_minmax(0,1fr)] gap-0">
          <div className="relative bg-gradient-to-br from-sky-950/60 via-indigo-950/40 to-slate-950 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-sky-400/30">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-400/15 border-2 border-sky-300/60 text-sky-200 mb-3 shadow-[0_0_22px_rgba(125,211,252,0.45)]">
              <Snowflake className="w-8 h-8 animate-[spin_12s_linear_infinite]" />
            </div>
            <div
              className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-sky-300/80 ${
                kh ? "font-khmer normal-case tracking-normal text-xs" : ""
              }`}
            >
              {t("Sub 3 · The cold catch", "ផ្នែក ៣ · ឧបសគ្គត្រជាក់")}
            </div>
            {/* Cold thermometer */}
            <ColdThermometerSvg kh={kh} />
            <div
              className={`text-[10px] text-sky-200/80 mt-1 text-center ${
                kh ? "font-khmer text-xs" : "font-mono"
              }`}
            >
              {t("−196 °C · liquid nitrogen", "−១៩៦°C · អាសូតរាវ")}
            </div>
          </div>
          <div className="p-6 sm:p-7">
            <h3
              className={`text-xl sm:text-2xl font-bold mb-1 text-sky-100 ${
                kh ? "font-khmer leading-snug" : "font-display"
              }`}
            >
              {kh ? "ហេតុអ្វីបានជាវាពិបាកម្ល៉េះ?" : "The Cold Catch — Why is it so hard?"}
            </h3>
            <div
              className={`text-sm text-sky-200/70 mb-4 ${
                kh ? "font-display" : "font-khmer"
              }`}
            >
              {kh ? "The Cold Catch — Why is it so hard?" : "ហេតុអ្វីបានជាវាពិបាកម្ល៉េះ?"}
            </div>
            <p
              className={`text-sm sm:text-base text-slate-200/90 leading-relaxed mb-3 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "Here's the catch: we already have superconductors. We have had them since 1911. The problem is that every single one we have ever discovered only works when you cool it down to unimaginably cold temperatures — colder than anywhere in the natural universe outside a laboratory.",
                "នេះគឺជាឧបសគ្គ៖ យើងមានអង្គធាតុចម្លងកំពូលរួចហើយ។ យើងមានវាតាំងពីឆ្នាំ ១៩១១។ បញ្ហាគឺថាគ្រប់អង្គធាតុចម្លងកំពូលទាំងអស់ដែលយើងបានរកឃើញ ដំណើរការតែនៅពេលដែលអ្នកធ្វើឲ្យវាត្រជាក់ដល់សីតុណ្ហភាពដែលមិនអាចស្រមៃបាន — ត្រជាក់ជាងគ្រប់ទីកន្លែងនៅក្នុងសកលលោកធម្មជាតិក្រៅពីមន្ទីរពិសោធន៍។",
              )}
            </p>
            <p
              className={`text-sm sm:text-base text-slate-200/90 leading-relaxed mb-4 ${
                kh ? "font-khmer leading-loose" : ""
              }`}
            >
              {t(
                "We achieve those temperatures by bathing the wire in liquid nitrogen (−196 °C) or liquid helium (−269 °C). A few exotic materials work at slightly warmer temperatures, but only when crushed under pressures hundreds of thousands of times stronger than the air around you. Either way, the cooling and pressure equipment costs more than the energy you save.",
                "យើងសម្រេចបាននូវសីតុណ្ហភាពទាំងនោះដោយការត្រាំខ្សែភ្លើងក្នុងអាសូតរាវ (−១៩៦°C) ឬហេលីញ៉ូមរាវ (−២៦៩°C)។ សម្ភារៈពិសេសមួយចំនួនដំណើរការនៅសីតុណ្ហភាពកក់ក្ដៅជាងបន្តិច ប៉ុន្តែមានតែនៅពេលដែលត្រូវបានកំទេចក្រោមសម្ពាធខ្លាំងជាងខ្យល់ជុំវិញអ្នករាប់សែនដង។ យ៉ាងណាមិញ ឧបករណ៍ត្រជាក់និងសម្ពាធមានតម្លៃថ្លៃជាងថាមពលដែលអ្នកសន្សំ។",
              )}
            </p>
            <div className="rounded-lg border border-sky-400/30 bg-sky-950/30 p-3">
              <p
                className={`text-xs sm:text-sm text-sky-100/90 leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                <strong className="text-sky-200">
                  {t("The global race: ", "ការប្រណាំងពិភពលោក៖ ")}
                </strong>
                {t(
                  "thousands of physicists and material scientists in every country — including teams in Cambodia's neighbors — are racing to find a single material that superconducts at normal, everyday 'room temperature' (≈ 25 °C) and at normal air pressure. Whoever finds it will change the world overnight.",
                  "រូបវិទូ និងអ្នកវិទ្យាសាស្ត្រសម្ភារៈរាប់ពាន់នាក់នៅគ្រប់ប្រទេស — រួមទាំងក្រុមនៅប្រទេសជិតខាងកម្ពុជា — កំពុងប្រណាំងគ្នាស្វែងរកសម្ភារៈតែមួយដែលដឹកនាំកំពូលនៅសីតុណ្ហភាព 'បន្ទប់' ធម្មតាប្រចាំថ្ងៃ (≈ ២៥°C) និងនៅសម្ពាធខ្យល់ធម្មតា។ អ្នកដែលរកឃើញវានឹងផ្លាស់ប្ដូរពិភពលោកក្នុងមួយយប់។",
                )}
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* ── Sub 4: A Post-Scarcity World ────────────────────────────────── */}
      <article
        data-testid="superconductors-future"
        className="relative rounded-2xl border border-slate-300/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_0_36px_rgba(34,211,238,0.18)] overflow-hidden"
      >
        <div className="p-6 sm:p-7 border-b border-slate-300/15">
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-200/10 border-2 border-slate-200/50 text-slate-100 shadow-[0_0_18px_rgba(226,232,240,0.4)]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div
                className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-slate-300/80 ${
                  kh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                {t("Sub 4 · If we crack it…", "ផ្នែក ៤ · ប្រសិនបើយើងដោះស្រាយវាបាន…")}
              </div>
              <h3
                className={`text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-100 via-cyan-200 to-slate-100 bg-clip-text text-transparent ${
                  kh ? "font-khmer leading-snug" : "font-display"
                }`}
              >
                {kh ? "ពិភពលោកក្រោយភាពខ្វះខាត" : "A Post-Scarcity World"}
              </h3>
              <div
                className={`text-sm text-slate-300/70 ${
                  kh ? "font-display" : "font-khmer"
                }`}
              >
                {kh ? "A Post-Scarcity World" : "ពិភពលោកក្រោយភាពខ្វះខាត"}
              </div>
            </div>
          </div>
          <p
            className={`text-sm sm:text-base text-slate-200/85 leading-relaxed ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Solve the puzzle of room-temperature superconductivity, and three industries flip overnight. None of these are science fiction — they all already exist as small lab demonstrations. Room temperature is the only thing standing between us and a world where electricity is functionally free.",
              "ដោះស្រាយល្បែងផ្ដុំរូបនៃអង្គធាតុចម្លងកំពូលនៅសីតុណ្ហភាពបន្ទប់ ហើយឧស្សាហកម្មបីនឹងបង្វិលក្នុងមួយយប់។ គ្មានឧស្សាហកម្មណាមួយជាប្រឌិតវិទ្យាសាស្ត្រឡើយ — ពួកវាសុទ្ធតែមានរួចហើយជាការបង្ហាញតូចៗក្នុងមន្ទីរពិសោធន៍។ សីតុណ្ហភាពបន្ទប់គឺជារឿងតែមួយគត់ដែលឈរនៅចន្លោះពួកយើង និងពិភពលោកមួយដែលអគ្គិសនីគឺឥតគិតថ្លៃ។",
            )}
          </p>
        </div>

        {/* Three application cards */}
        <div className="grid sm:grid-cols-3 gap-0">
          <FutureAppCard
            kh={kh}
            t={t}
            icon={Globe}
            titleEn="Lossless Power Grids"
            titleKh="បណ្ដាញថាមពលគ្មានការបាត់បង់"
            bodyEn="Solar farms in the Sahara desert could power factories in Cambodia, Tokyo, or Mumbai with zero energy lost in the cables. Sunlight from where the sun shines, delivered to where the people live — free of charge."
            bodyKh="កសិដ្ឋានសូឡានៅវាលខ្សាច់សាហារ៉ា អាចផ្គត់ផ្គង់រោងចក្រនៅកម្ពុជា តូក្យូ ឬមុមបៃ ដោយមិនបាត់បង់ថាមពលក្នុងខ្សែភ្លើង។ ពន្លឺថ្ងៃពីកន្លែងដែលថ្ងៃរះ ដឹកជូនទៅកន្លែងដែលមនុស្សរស់នៅ — ឥតគិតថ្លៃ។"
            accent="cyan"
          />
          <FutureAppCard
            kh={kh}
            t={t}
            icon={Train}
            titleEn="Maglev Trains"
            titleKh="រថភ្លើងម៉ាហ្គ្លេវ"
            bodyEn="Trains that float on magnetic tracks (the Meissner Effect again!), traveling at airplane speeds — Phnom Penh to Bangkok in under an hour — with almost no energy cost and no friction wear on the rails."
            bodyKh="រថភ្លើងដែលអណ្ដែតលើផ្លូវដែកម៉ាញេទិច (ឥទ្ធិពល Meissner ម្ដងទៀត!) ធ្វើដំណើរល្បឿនយន្ដហោះ — ភ្នំពេញទៅបាងកកក្នុងរយៈពេលមិនដល់មួយម៉ោង — ដោយតម្លៃថាមពលស្ទើរតែគ្មាន និងគ្មានការសឹករចន្ទាស់លើផ្លូវដែក។"
            accent="slate"
          />
          <FutureAppCard
            kh={kh}
            t={t}
            icon={Cpu}
            titleEn="Limitless Computing"
            titleKh="ការគណនាគ្មានដែនកំណត់"
            bodyEn="Supercomputers and AI systems that process unimaginable amounts of data without ever overheating, without needing cooling fans, and without burning a single extra watt as waste heat. Every classroom on Earth could afford its own AI tutor."
            bodyKh="អុបវកុំព្យូទ័រ និងប្រព័ន្ធ AI ដែលដំណើរការទិន្នន័យដ៏ច្រើនមិនអាចស្រមៃបាន ដោយមិនកក្ដៅឡើង មិនត្រូវការកង្ហារត្រជាក់ និងមិនដុតវ៉ាត់បន្ថែមណាមួយជាកម្ដៅខ្ជះខ្ជាយ។ ថ្នាក់រៀនគ្រប់ទីកន្លែងលើផែនដី អាចមានគ្រូបង្ហាត់ AI ផ្ទាល់ខ្លួនរបស់ខ្លួន។"
            accent="cyan"
          />
        </div>

        {/* Closing */}
        <div className="px-6 sm:px-7 py-5 border-t border-slate-300/15 text-center">
          <p
            className={`text-sm text-cyan-100/80 italic max-w-2xl mx-auto ${
              kh ? "font-khmer not-italic leading-loose" : ""
            }`}
          >
            {t(
              "From a copper wire that loses its energy as heat, to a silver thread that loses nothing at all. The journey from this safety lesson to the holy grail is the same journey humanity has been on for over 100 years — and it might be your generation that finishes it.",
              "ពីខ្សែទង់ដែងដែលបាត់បង់ថាមពលជាកម្ដៅ ទៅជាខ្សែប្រាក់ដែលមិនបាត់បង់អ្វីសោះឡើយ។ ដំណើរពីមេរៀនសុវត្ថិភាពនេះទៅកាន់ផ្តិលសក្ការៈ គឺជាដំណើរតែមួយដែលមនុស្សជាតិបានធ្វើអស់រយៈពេលជាង ១០០ ឆ្នាំ — ហើយវាប្រហែលជាមានជំនាន់របស់អ្នកដែលនឹងបញ្ចប់វា។",
            )}
          </p>
        </div>
      </article>
    </section>
  );
}

// ── Sub 4 helper · One application card ─────────────────────────────────
function FutureAppCard({
  kh,
  t: _t,
  icon: Icon,
  titleEn,
  titleKh,
  bodyEn,
  bodyKh,
  accent,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
  icon: React.ComponentType<{ className?: string }>;
  titleEn: string;
  titleKh: string;
  bodyEn: string;
  bodyKh: string;
  accent: "cyan" | "slate";
}) {
  const a =
    accent === "cyan"
      ? {
          ring: "border-cyan-400/30",
          chipBg: "bg-cyan-400/10",
          chipBorder: "border-cyan-300/60",
          chipText: "text-cyan-200",
          chipGlow: "shadow-[0_0_18px_rgba(34,211,238,0.45)]",
          title: "text-cyan-100",
          sub: "text-cyan-200/70",
        }
      : {
          ring: "border-slate-300/30",
          chipBg: "bg-slate-200/10",
          chipBorder: "border-slate-200/60",
          chipText: "text-slate-100",
          chipGlow: "shadow-[0_0_18px_rgba(226,232,240,0.4)]",
          title: "text-slate-100",
          sub: "text-slate-200/70",
        };
  return (
    <div className={`p-5 sm:p-6 border-r last:border-r-0 ${a.ring} border-b sm:border-b-0`}>
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 mb-3 ${a.chipBg} ${a.chipBorder} ${a.chipText} ${a.chipGlow}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h4
        className={`text-base sm:text-lg font-bold mb-1 ${a.title} ${
          kh ? "font-khmer leading-snug" : "font-display"
        }`}
      >
        {kh ? titleKh : titleEn}
      </h4>
      <div
        className={`text-xs ${a.sub} mb-3 ${
          kh ? "font-display" : "font-khmer"
        }`}
      >
        {kh ? titleEn : titleKh}
      </div>
      <p
        className={`text-xs sm:text-sm text-slate-200/85 leading-relaxed ${
          kh ? "font-khmer leading-loose" : ""
        }`}
      >
        {kh ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

// ── Decorative SVG · The "bumpy dirt road" (copper) ─────────────────────
function BumpyRoadSvg() {
  return (
    <svg
      viewBox="0 0 220 60"
      className="w-full h-auto mt-3 mb-2"
      role="img"
      aria-hidden="true"
    >
      {/* dirt road */}
      <path
        d="M 0 40 Q 20 30 30 40 T 60 40 T 90 40 T 120 40 T 150 40 T 180 40 T 220 40 L 220 60 L 0 60 Z"
        fill="#7c2d12"
        opacity="0.55"
      />
      {/* atom bumps */}
      {[20, 50, 80, 110, 140, 170, 200].map((cx) => (
        <circle key={cx} cx={cx} cy="38" r="4" fill="#fb923c" opacity="0.85" />
      ))}
      {/* electron path bouncing */}
      <path
        d="M 5 22 L 18 14 L 32 26 L 48 14 L 62 28 L 78 14 L 92 26 L 108 14 L 122 28 L 138 14 L 152 26 L 168 14 L 182 28 L 198 14 L 215 22"
        stroke="#fde68a"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 3px rgba(253,230,138,0.8))" }}
      />
      <circle cx="215" cy="22" r="2.4" fill="#fde68a">
        <animate
          attributeName="cx"
          values="5; 215"
          dur="2.4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="22;14;26;14;28;14;26;14;28;14;26;14;28;14;22"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

// ── Decorative SVG · The "smooth highway" (superconductor) ──────────────
function SmoothHighwaySvg() {
  return (
    <svg
      viewBox="0 0 220 60"
      className="w-full h-auto mt-3 mb-2"
      role="img"
      aria-hidden="true"
    >
      {/* mirror-smooth highway */}
      <rect x="0" y="38" width="220" height="14" fill="#0c4a6e" opacity="0.55" />
      <line
        x1="0"
        y1="45"
        x2="220"
        y2="45"
        stroke="#22d3ee"
        strokeWidth="0.8"
        strokeDasharray="8 6"
        opacity="0.7"
      />
      {/* paired electrons (Cooper pairs) gliding */}
      <g style={{ filter: "drop-shadow(0 0 4px rgba(34,211,238,0.9))" }}>
        <circle cx="40" cy="22" r="2.6" fill="#22d3ee">
          <animate
            attributeName="cx"
            values="-10; 230"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="48" cy="22" r="2.6" fill="#67e8f9">
          <animate
            attributeName="cx"
            values="-2; 238"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="120" cy="22" r="2.6" fill="#22d3ee">
          <animate
            attributeName="cx"
            values="-50; 190"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="128" cy="22" r="2.6" fill="#67e8f9">
          <animate
            attributeName="cx"
            values="-42; 198"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      {/* trail line */}
      <line
        x1="0"
        y1="22"
        x2="220"
        y2="22"
        stroke="#22d3ee"
        strokeWidth="0.5"
        opacity="0.4"
      />
    </svg>
  );
}

// ── Decorative SVG · Cold thermometer ───────────────────────────────────
function ColdThermometerSvg({ kh }: { kh: boolean }) {
  return (
    <svg
      viewBox="0 0 220 60"
      className="w-full h-auto mt-3 mb-2"
      role="img"
      aria-hidden="true"
    >
      {/* scale */}
      <line x1="10" y1="32" x2="210" y2="32" stroke="#7dd3fc" strokeWidth="1" opacity="0.6" />
      {/* tick marks */}
      {[
        { x: 30, label: "−269" },
        { x: 70, label: "−196" },
        { x: 130, label: "0" },
        { x: 180, label: "+25" },
      ].map((tk) => (
        <g key={tk.x}>
          <line x1={tk.x} y1="28" x2={tk.x} y2="36" stroke="#7dd3fc" strokeWidth="1" />
          <text
            x={tk.x}
            y="48"
            fontSize="7"
            fontFamily={kh ? "inherit" : "monospace"}
            fill="#bae6fd"
            textAnchor="middle"
          >
            {tk.label}
          </text>
        </g>
      ))}
      {/* current achievable zone (cold) */}
      <rect x="10" y="14" width="60" height="14" fill="#0ea5e9" opacity="0.45" rx="2" />
      <text x="40" y="11" fontSize="7" fontFamily={kh ? "inherit" : "monospace"} fill="#7dd3fc" textAnchor="middle">
        {kh ? "ដំណើរការ" : "WORKS"}
      </text>
      {/* room temp goal (warm) */}
      <rect x="170" y="14" width="22" height="14" fill="#f87171" opacity="0.45" rx="2" />
      <text x="181" y="11" fontSize="7" fontFamily={kh ? "inherit" : "monospace"} fill="#fca5a5" textAnchor="middle">
        {kh ? "គោលដៅ" : "GOAL"}
      </text>
    </svg>
  );
}
