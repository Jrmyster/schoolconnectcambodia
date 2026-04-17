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

        {/* Closing reminder */}
        <div className="mt-8 text-center">
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
