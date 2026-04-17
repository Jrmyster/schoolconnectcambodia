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
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

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

export function ElectricalSafetyPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

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
    </div>
  );
}
