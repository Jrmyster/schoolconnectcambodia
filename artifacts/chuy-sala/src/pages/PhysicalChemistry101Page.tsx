import { Link } from "wouter";
import {
  ArrowLeft,
  Sigma,
  Flame,
  Timer,
  Atom,
  Rainbow,
  Sun,
  BatteryCharging,
  CloudFog,
  Calculator,
  GraduationCap,
  Zap,
  Waves,
  Box,
  Sparkles,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ══════════════════════════════════════════════════════════════════════════
 * Physical Chemistry 101 — គីមីរូបវិទ្យា ១០១
 * "Undergraduate Preview" for high-school students.
 * Aesthetic: chalkboard greens · chalk-white text · grid backdrop.
 * Self-contained, no new dependencies.
 * ══════════════════════════════════════════════════════════════════════════ */

export function PhysicalChemistry101Page() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-950 text-emerald-50 py-8 sm:py-10 px-4 sm:px-6 relative overflow-hidden">
      {/* Chalkboard grid backdrop */}
      <ChalkboardBackdrop />

      <div className="relative max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/chemistry"
          data-testid="link-back-to-chemistry"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-200/80 hover:text-white transition-colors mb-6 ${
            kh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Chemistry Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមីវិទ្យា")}
        </Link>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-800/70 text-white shadow-lg mb-4 ring-1 ring-emerald-300/30 backdrop-blur-sm">
            <Sigma className="w-9 h-9" strokeWidth={2.25} />
          </div>
          <div
            className={`text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-300/90 mb-1 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t(
              "Module 07 · Undergraduate Preview",
              "មុខវិជ្ជា ០៧ · ការមើលជាមុនថ្នាក់បរិញ្ញាបត្រ",
            )}
          </div>
          <h1
            className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 chalk-text ${
              kh ? "font-khmer leading-snug" : ""
            }`}
            style={{ textShadow: "0 0 18px rgba(255,255,255,0.18)" }}
          >
            {t("Physical Chemistry", "គីមីរូបវិទ្យា")}
          </h1>
          <p
            className={`text-base sm:text-lg text-emerald-100/85 max-w-2xl mx-auto ${
              kh ? "font-khmer leading-loose" : ""
            }`}
          >
            {t(
              "Where Physics and Calculus walk into the chemistry lab — and explain why every reaction in the universe behaves the way it does.",
              "កន្លែងដែលរូបវិទ្យា និងកាល់គុល ចូលមកក្នុងមន្ទីរពិសោធន៍គីមី — និងពន្យល់ហេតុអ្វីបានជារាល់ប្រតិកម្មគ្រប់ទីកន្លែងក្នុងសកលលោក ប្រព្រឹត្តដូចនេះ។",
            )}
          </p>
        </header>

        {/* ── Section 1: Math Meets Matter (Intro) ─────────────── */}
        <IntroSection />

        {/* ── Section 2: The Quantum Revolution ────────────────── */}
        <QuantumRevolutionSection />

        {/* ── Section 3: P-Chem 1 — Macroscopic ────────────────── */}
        <MacroSection />

        {/* ── Section 4: P-Chem 2 — Microscopic ────────────────── */}
        <MicroSection />

        {/* ── Section 5: Careers & Impact ──────────────────────── */}
        <CareersSection />

        <p
          className={`mt-12 text-center text-xs sm:text-sm text-emerald-200/70 italic ${
            kh ? "font-khmer not-italic leading-loose" : ""
          }`}
        >
          {t(
            "Physical chemistry is the bridge between high-school chemistry and modern science research.",
            "គីមីរូបវិទ្យាគឺជាស្ពានរវាងគីមីវិទ្យាវិទ្យាល័យ និងការស្រាវជ្រាវវិទ្យាសាស្ត្រទំនើប។",
          )}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Reusable chalkboard panel                                              */
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
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="mb-12 rounded-3xl bg-emerald-950/60 border-2 border-emerald-700/50 shadow-[0_0_40px_rgba(16,185,129,0.08)] overflow-hidden backdrop-blur-sm"
    >
      <header className="px-5 sm:px-7 pt-6 pb-4 border-b border-emerald-700/40 bg-gradient-to-r from-emerald-900/60 to-emerald-950/30">
        <div className="flex items-center gap-3 mb-1">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-800 text-emerald-100 ring-1 ring-emerald-300/30 shadow-sm">
            <Icon className="w-5 h-5" />
          </span>
          <h2
            id={`${id}-heading`}
            className={`text-xl sm:text-2xl font-bold text-white ${kh ? "font-khmer" : ""}`}
            style={{ textShadow: "0 0 10px rgba(255,255,255,0.12)" }}
          >
            {kh ? title.kh : title.en}
          </h2>
        </div>
        {subtitle && (
          <p className={`text-sm text-emerald-100/80 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? subtitle.kh : subtitle.en}
          </p>
        )}
      </header>
      <div className="p-5 sm:p-7">{children}</div>
    </section>
  );
}

/* Sub-card on the chalkboard */
function ChalkCard({
  title,
  khTitle,
  termEn,
  termKh,
  icon: Icon,
  accent = "emerald",
  children,
}: {
  title: string;
  khTitle: string;
  termEn?: string;
  termKh?: string;
  icon?: React.ComponentType<{ className?: string }>;
  accent?: "emerald" | "amber" | "sky" | "violet" | "rose";
  children: React.ReactNode;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const colors: Record<string, { ring: string; text: string; bg: string; chip: string }> = {
    emerald: {
      ring: "ring-emerald-400/30",
      text: "text-emerald-200",
      bg: "bg-emerald-900/40",
      chip: "bg-emerald-800/70 text-emerald-100",
    },
    amber: {
      ring: "ring-amber-300/30",
      text: "text-amber-200",
      bg: "bg-amber-900/20",
      chip: "bg-amber-800/60 text-amber-100",
    },
    sky: {
      ring: "ring-sky-300/30",
      text: "text-sky-200",
      bg: "bg-sky-900/25",
      chip: "bg-sky-800/60 text-sky-100",
    },
    violet: {
      ring: "ring-violet-300/30",
      text: "text-violet-200",
      bg: "bg-violet-900/25",
      chip: "bg-violet-800/60 text-violet-100",
    },
    rose: {
      ring: "ring-rose-300/30",
      text: "text-rose-200",
      bg: "bg-rose-900/25",
      chip: "bg-rose-800/60 text-rose-100",
    },
  };
  const c = colors[accent];

  return (
    <article
      className={`rounded-2xl border border-emerald-700/40 ring-1 ${c.ring} ${c.bg} p-5`}
    >
      <header className="flex items-center gap-2 mb-3">
        {Icon && (
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${c.chip}`}
          >
            <Icon className="w-4 h-4" />
          </span>
        )}
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-white ${kh ? "font-khmer" : ""}`}>
            {kh ? khTitle : title}
          </h3>
          {(termEn || termKh) && (
            <p className={`text-[11px] ${c.text} font-mono opacity-90`}>
              {kh ? termKh : termEn}
            </p>
          )}
        </div>
      </header>
      <div
        className={`text-sm text-emerald-50/90 space-y-3 ${
          kh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {children}
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 1 — Intro: Math Meets Matter                                   */
/* ──────────────────────────────────────────────────────────────────────── */

function IntroSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <Panel
      id="intro"
      icon={Calculator}
      title={{ en: "1. Math Meets Matter", kh: "១. គណិតវិទ្យាជួបនឹងសារធាតុ" }}
      subtitle={{
        en: "What is physical chemistry, and why is it different from regular chemistry?",
        kh: "តើគីមីរូបវិទ្យាជាអ្វី ហើយហេតុអ្វីបានជាខុសពីគីមីវិទ្យាធម្មតា?",
      }}
    >
      <p className={`text-base text-emerald-50/95 mb-5 ${kh ? "font-khmer leading-loose" : ""}`}>
        {t(
          "Physical Chemistry is what happens when scientists use the tools of physics and calculus to explain WHY chemical reactions happen the way they do — not just WHAT happens.",
          "គីមីរូបវិទ្យាគឺជាអ្វីដែលកើតឡើង ពេលអ្នកវិទ្យាសាស្ត្រប្រើឧបករណ៍នៃរូបវិទ្យា និងកាល់គុល ដើម្បីពន្យល់ ហេតុអ្វី ប្រតិកម្មគីមីកើតឡើងបែបនេះ — មិនមែនត្រឹមតែ អ្វី កើតឡើងទេ។",
        )}
      </p>

      <div
        className="rounded-2xl border-2 border-dashed border-emerald-300/40 bg-emerald-900/40 p-5 text-center font-mono"
        aria-label={kh ? "សមីការគំនិត" : "Concept equation"}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base sm:text-lg text-white">
          <span className="px-3 py-1 rounded-lg bg-sky-900/60 border border-sky-300/40">
            {t("Physics", "រូបវិទ្យា")}
          </span>
          <span className="text-emerald-200">+</span>
          <span className="px-3 py-1 rounded-lg bg-violet-900/60 border border-violet-300/40">
            {t("Calculus", "កាល់គុល")}
          </span>
          <span className="text-emerald-200">+</span>
          <span className="px-3 py-1 rounded-lg bg-amber-900/60 border border-amber-300/40">
            {t("Chemistry", "គីមីវិទ្យា")}
          </span>
          <span className="text-emerald-200">=</span>
          <span className="px-3 py-1 rounded-lg bg-emerald-700 border border-emerald-300 text-white">
            {t("Physical Chemistry", "គីមីរូបវិទ្យា")}
          </span>
        </div>
      </div>

      <p
        className={`text-sm text-emerald-200/80 mt-4 italic ${
          kh ? "font-khmer not-italic leading-loose" : ""
        }`}
      >
        {t(
          "P-Chem is what most chemistry students study in their second or third year of university.",
          "គីមីរូបវិទ្យាជាអ្វីដែលនិស្សិតគីមីវិទ្យាភាគច្រើនរៀននៅឆ្នាំទីពីរ ឬទីបីនៃសាកលវិទ្យាល័យ។",
        )}
      </p>
    </Panel>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 2 — The Quantum Revolution                                     */
/* ──────────────────────────────────────────────────────────────────────── */

function QuantumRevolutionSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <Panel
      id="quantum-revolution"
      icon={Sparkles}
      title={{ en: "2. The Quantum Revolution", kh: "២. បដិវត្តន៍កង់ទិច" }}
      subtitle={{
        en: "Around 1900, classical physics broke. Four discoveries rewrote the rulebook of the universe — and gave birth to quantum mechanics.",
        kh: "ប្រហែលឆ្នាំ ១៩០០ រូបវិទ្យាបុរាណបានបាក់បែក។ ការរកឃើញទាំង ៤ បានសរសេរច្បាប់នៃសកលលោកឡើងវិញ — ហើយផ្តល់កំណើតដល់មេកានិចកង់ទិច។",
      }}
    >
      <div className="space-y-4 sm:space-y-5">
        {/* ── Card 1 — The Map Breaks (UV Catastrophe) ────────────── */}
        <ChalkCard
          title="The Map Breaks"
          khTitle="ផែនទីបាក់បែក"
          termEn="Black-Body Radiation · Ultraviolet Catastrophe"
          termKh="វិទ្យុសកម្មអង្គធាតុខ្មៅ · មហន្តរាយអ៊ុលត្រាវីយូឡេ"
          icon={Flame}
          accent="amber"
        >
          <p>
            {t(
              "Classical physics predicted that any heated object — a stove, a star — should pour out an infinite amount of invisible, high-energy ultraviolet light as it got hotter. Reality refused to play along. Real stoves and real stars do not unleash an infinite UV death-ray.",
              "រូបវិទ្យាបុរាណបានព្យាករថា វត្ថុដែលត្រូវបានកម្តៅ — ចង្ក្រាន ឬផ្កាយ — គួរតែបញ្ចេញពន្លឺអ៊ុលត្រាវីយូឡេថាមពលខ្ពស់ដែលមើលមិនឃើញគ្មានកំណត់ ខណៈពេលដែលវាកាន់តែក្តៅ។ ប៉ុន្តែតាមការពិត វាមិនដូច្នោះទេ។ ចង្ក្រាន និងផ្កាយពិតមិនបញ្ចេញកាំរស្មីអ៊ុលត្រាវីយូឡេគ្មានកំណត់ដូចព្យាករនោះឡើយ។",
            )}
          </p>
          <p>
            <strong className="text-amber-200">
              {t("Max Planck's solution", "ដំណោះស្រាយរបស់ ម៉ាក់ ប្លែង")}:
            </strong>{" "}
            {t(
              "Energy is not a smooth continuous wave. It comes in tiny indivisible chunks — physical packets called Quanta. This single idea shattered classical physics.",
              "ថាមពលមិនមែនជារលករលូនបន្តបន្ទាប់ទេ។ វាមកជាបំណែកតូចៗមិនអាចបំបែកបាន — កញ្ចប់រូបវន្តហៅថា កង់តា (Quanta)។ គំនិតមួយនេះបានបំបែករូបវិទ្យាបុរាណ។",
            )}
          </p>
        </ChalkCard>

        {/* ── Card 2 — Light is a Bullet (Photoelectric Effect) ──── */}
        <ChalkCard
          title="Light is a Bullet"
          khTitle="ពន្លឺគឺជាគ្រាប់កាំភ្លើង"
          termEn="The Photoelectric Effect"
          termKh="បាតុភូតហ្វូតូអគ្គិសនី"
          icon={Zap}
          accent="sky"
        >
          <p>
            {t(
              "Shine a brilliant red lamp on a metal plate — nothing happens, no matter how bright you turn it up. Now shine a faint blue or ultraviolet beam on the same plate, and electrons come flying off it!",
              "បំភ្លឺពន្លឺក្រហមភ្លឺៗទៅលើបន្ទះលោហៈ — គ្មានអ្វីកើតឡើងទេ មិនថាអ្នកបញ្ចេញពន្លឺខ្លាំងប៉ុណ្ណាក៏ដោយ។ ឥឡូវបំភ្លឺកាំរស្មីខៀវ ឬអ៊ុលត្រាវីយូឡេខ្សោយទៅលើបន្ទះតែមួយនោះ — អេឡិចត្រុងហោះចេញ!",
            )}
          </p>
          <p>
            <strong className="text-sky-200">
              {t("Einstein's Nobel-prize insight", "ការយល់ឃើញឈ្នះពានរង្វាន់ណូបែលរបស់ Einstein")}:
            </strong>{" "}
            {t(
              "Light is not just a wave. It also acts like a stream of particles — photons — that hit the metal like microscopic bullets. The energy of each bullet depends on its frequency, not the brightness.",
              "ពន្លឺមិនមែនត្រឹមតែជារលកទេ។ វាក៏ប្រព្រឹត្តដូចជាកំណាត់នៃភាគល្អិត — ហ្វូតុង — ដែលបុកលោហៈដូចជាគ្រាប់កាំភ្លើងតូចៗ។ ថាមពលនៃគ្រាប់នីមួយៗអាស្រ័យលើប្រេកង់របស់វា មិនមែនលើភាពភ្លឺ។",
            )}
          </p>
          <div className="rounded-xl bg-emerald-950/60 border border-sky-400/30 px-4 py-3 not-prose flex items-center justify-center">
            <div className="text-sky-100 text-lg sm:text-xl">
              <BlockMath math={String.raw`E = h\nu`} />
            </div>
          </div>
          <p className="text-xs text-emerald-100/75 font-mono">
            <InlineMath math="E" /> ={" "}
            {t("photon energy", "ថាមពលហ្វូតុង")} ·{" "}
            <InlineMath math="h" /> ={" "}
            {t("Planck's constant", "ថេររបស់ ប្លែង")} ·{" "}
            <InlineMath math={String.raw`\nu`} /> ={" "}
            {t("frequency of the light", "ប្រេកង់នៃពន្លឺ")}
          </p>
        </ChalkCard>

        {/* ── Card 3 — Matter is a Wave (de Broglie) ─────────────── */}
        <ChalkCard
          title="Matter is a Wave"
          khTitle="សារធាតុគឺជារលក"
          termEn="Wave–Particle Duality · de Broglie"
          termKh="ភាពជាទ្វេរនៃរលក-ភាគល្អិត"
          icon={Waves}
          accent="violet"
        >
          <p>
            {t(
              "If light (a wave) can also act like a solid particle, Louis de Broglie asked the daring reverse question: can a solid particle — an electron, a baseball, you — also act like a wave?",
              "បើពន្លឺ (រលក) អាចប្រព្រឹត្តដូចជាភាគល្អិតរឹង តើ Louis de Broglie បានសួរសំណួរបញ្ច្រាសដ៏ក្លាហាន៖ តើភាគល្អិតរឹង — អេឡិចត្រុង បាល់ ឬអ្នក — អាចប្រព្រឹត្តដូចជារលកដែរទេ?",
            )}
          </p>
          <p>
            <strong className="text-violet-200">
              {t("The math said yes", "គណិតវិទ្យាបានឆ្លើយថា បាទ")}.
            </strong>{" "}
            {t(
              "Every piece of matter has a wavelength. For a baseball, the wavelength is impossibly small — that's why we never notice. For an electron, it is enormous compared to its size — which is exactly why atoms work the way they do.",
              "សារធាតុគ្រប់បំណែកមានរលកប្រវែង។ សម្រាប់បាល់មួយ រលកប្រវែងគឺតូចណាស់ដែលមិនអាចមើលឃើញ — នោះហើយជាហេតុដែលយើងមិនដឹង។ សម្រាប់អេឡិចត្រុង វាធំធេងបើធៀបនឹងទំហំរបស់វា — ជាមូលហេតុដែលអាតូមដំណើរការបែបនេះ។",
            )}
          </p>
          <div className="rounded-xl bg-emerald-950/60 border border-violet-400/30 px-4 py-3 not-prose flex items-center justify-center">
            <div className="text-violet-100 text-lg sm:text-xl">
              <BlockMath math={String.raw`\lambda = \frac{h}{p}`} />
            </div>
          </div>
          <p className="text-xs text-emerald-100/75 font-mono">
            <InlineMath math={String.raw`\lambda`} /> ={" "}
            {t("wavelength of matter", "រលកប្រវែងនៃសារធាតុ")} ·{" "}
            <InlineMath math="h" /> ={" "}
            {t("Planck's constant", "ថេររបស់ ប្លែង")} ·{" "}
            <InlineMath math="p" /> ={" "}
            {t("momentum (mass × velocity)", "ម៉ូម៉ង់ (ម៉ាស × ល្បឿន)")}
          </p>
        </ChalkCard>

        {/* ── Card 4 — Particle in a Box (Quantization) ─────────── */}
        <ChalkCard
          title="The Ultimate Math Model"
          khTitle="គំរូគណិតវិទ្យាដ៏ចុងក្រោយ"
          termEn="Particle in a Box"
          termKh="ភាគល្អិតក្នុងប្រអប់"
          icon={Box}
          accent="rose"
        >
          <p>
            {t(
              "This is the founding thought-experiment of physical chemistry. Trap a wavy electron inside a tiny box and let the math run.",
              "នេះគឺជាការពិសោធន៍គំនិតស្ថាបនានៃគីមីរូបវិទ្យា។ ចាក់សោអេឡិចត្រុងរលករលៃក្នុងប្រអប់តូចមួយ ហើយឲ្យគណិតវិទ្យាដំណើរការ។",
            )}
          </p>
          <p>
            <strong className="text-rose-200">
              {t("The shocking result", "លទ្ធផលគួរឱ្យភ្ញាក់ផ្អើល")}:
            </strong>{" "}
            {t(
              "The electron cannot just sit still, and it cannot have any energy it likes. It is allowed only highly specific 'quantized' energy levels — like standing on the rungs of a ladder, but never anywhere in between.",
              "អេឡិចត្រុងមិនអាចគ្រាន់តែអង្គុយស្ងៀមបានទេ ហើយក៏មិនអាចមានថាមពលណាមួយតាមចិត្តដែរ។ វាត្រូវបានអនុញ្ញាតឲ្យមានតែកម្រិតថាមពលជាក់លាក់ខ្ពស់ដែលហៅថា 'កង់តានីហ្ស៍' (quantized) — ដូចជាឈរនៅលើជណ្តើរ ប៉ុន្តែមិនអាចឈរនៅចន្លោះណាមួយបានទេ។",
            )}
          </p>

          {/* Mini "energy ladder" visual */}
          <div
            className="rounded-xl bg-emerald-950/60 border border-rose-400/30 p-4 not-prose"
            role="img"
            aria-label={t(
              "Quantized energy levels diagram",
              "ដ្យាក្រាមកម្រិតថាមពលកង់តានីហ្ស៍",
            )}
          >
            <div className="space-y-1.5">
              {[
                { label: "n = 4", energy: "16 E₁", width: "100%" },
                { label: "n = 3", energy: "9 E₁", width: "78%" },
                { label: "n = 2", energy: "4 E₁", width: "55%" },
                { label: "n = 1", energy: "1 E₁", width: "32%" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3"
                >
                  <span className="font-mono text-[11px] text-rose-200/80 w-12 flex-shrink-0">
                    {row.label}
                  </span>
                  <span
                    className="h-1.5 rounded-full bg-gradient-to-r from-rose-400 to-rose-200 shadow-[0_0_8px_rgba(251,113,133,0.5)]"
                    style={{ width: row.width }}
                  />
                  <span className="font-mono text-[11px] text-rose-100/70 ml-auto">
                    {row.energy}
                  </span>
                </div>
              ))}
            </div>
            <p
              className={`text-[11px] text-emerald-100/65 mt-3 italic ${
                kh ? "font-khmer not-italic leading-loose" : ""
              }`}
            >
              {t(
                "Energy can sit on rung 1, 2, 3 … but never between rungs.",
                "ថាមពលអាចឈរនៅកម្រិត ១ ២ ៣ … ប៉ុន្តែមិនដែលនៅចន្លោះកម្រិតទេ។",
              )}
            </p>
          </div>
        </ChalkCard>
      </div>
    </Panel>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 3 — Macroscopic: Thermo & Kinetics                             */
/* ──────────────────────────────────────────────────────────────────────── */

function MacroSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <Panel
      id="macro"
      icon={Flame}
      title={{
        en: "3. P-Chem 1 — The Macroscopic World",
        kh: "៣. គីមីរូបវិទ្យា ១ — ពិភពម៉ាក្រូ",
      }}
      subtitle={{
        en: "Heat, energy, and speed — the rules that govern any reaction big enough to see.",
        kh: "កំដៅ ថាមពល និងល្បឿន — ច្បាប់ដែលគ្រប់គ្រងរាល់ប្រតិកម្មធំល្មមមើលឃើញ។",
      }}
    >
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Thermodynamics */}
        <ChalkCard
          title="Thermodynamics"
          khTitle="ទែម៉ូឌីណាមិច"
          termEn="Thermodynamics"
          termKh="ទែម៉ូឌីណាមិច"
          icon={Flame}
          accent="amber"
        >
          <p>
            {t(
              "The study of heat and energy. It answers: how much energy will this reaction give off, or how much will it need?",
              "ការសិក្សាអំពីកំដៅ និងថាមពល។ វាឆ្លើយថា៖ តើប្រតិកម្មនេះនឹងបញ្ចេញថាមពលប៉ុន្មាន ឬត្រូវការប៉ុន្មាន?",
            )}
          </p>

          <div className="rounded-xl bg-emerald-950/60 border border-emerald-700/40 p-3">
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-bold text-white">{t("Entropy", "អង់ត្រូពី")}</span>
              <span className="text-[11px] font-mono text-emerald-300/80">(S)</span>
            </div>
            <p className="text-xs mt-1">
              {t(
                "The universe's natural pull toward disorder. A smashed glass never re-assembles itself — that's entropy at work.",
                "ការទាក់ទាញធម្មជាតិនៃសកលលោកទៅកាន់ភាពច្របូកច្របល់។ កែវដែលបាក់មិនដែលផ្គុំខ្លួនវាឡើងវិញទេ — នោះគឺអង់ត្រូពីដំណើរការ។",
              )}
            </p>
          </div>

          <div className="rounded-xl bg-emerald-950/60 border border-emerald-700/40 p-3">
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-bold text-white">{t("Enthalpy", "អង់តាល់ពី")}</span>
              <span className="text-[11px] font-mono text-emerald-300/80">(H)</span>
            </div>
            <p className="text-xs mt-1">
              {t(
                "The heat exchanged when a reaction happens. Burning fuel releases enthalpy as heat we can use.",
                "កំដៅផ្លាស់ប្តូរពេលប្រតិកម្មកើតឡើង។ ការដុតឥន្ធនៈបញ្ចេញអង់តាល់ពីជាកំដៅដែលយើងអាចប្រើបាន។",
              )}
            </p>
          </div>

          <div className="rounded-lg bg-amber-950/40 border border-amber-300/30 p-3 text-xs">
            <span className="font-bold text-amber-200">
              {t("Real world: ", "ក្នុងពិភពពិត៖ ")}
            </span>
            {t(
              "How much energy can an engine extract from one liter of petrol? Thermodynamics gives the upper limit.",
              "តើម៉ាស៊ីនអាចទាញយកថាមពលប៉ុន្មានពីសាំងមួយលីត្រ? ទែម៉ូឌីណាមិចផ្តល់នូវកម្រិតខ្ពស់បំផុត។",
            )}
          </div>
        </ChalkCard>

        {/* Kinetics */}
        <ChalkCard
          title="Kinetics"
          khTitle="គីនេទិច"
          termEn="Kinetics"
          termKh="គីនេទិច"
          icon={Timer}
          accent="rose"
        >
          <p>
            {t(
              "The study of speed. Thermodynamics tells you IF a reaction can happen — kinetics tells you HOW FAST.",
              "ការសិក្សាអំពីល្បឿន។ ទែម៉ូឌីណាមិចប្រាប់អ្នកថា ប្រតិកម្មនេះអាចកើតឡើងឬទេ — គីនេទិចប្រាប់ថាវាកើតឡើងលឿនប៉ុនណា។",
            )}
          </p>

          <ul className="grid grid-cols-2 gap-2 text-center text-xs">
            <li className="rounded-xl bg-rose-900/40 border border-rose-300/30 p-2.5">
              <div className="text-2xl mb-1" aria-hidden="true">💥</div>
              <div className="font-bold text-white">{t("Explosion", "ការផ្ទុះ")}</div>
              <div className="text-rose-200/80 text-[11px]">
                {t("milliseconds", "មិល្លីវិនាទី")}
              </div>
            </li>
            <li className="rounded-xl bg-emerald-900/40 border border-emerald-300/30 p-2.5">
              <div className="text-2xl mb-1" aria-hidden="true">🪨</div>
              <div className="font-bold text-white">{t("Rusting", "ច្រែះ")}</div>
              <div className="text-emerald-200/80 text-[11px]">{t("years", "ឆ្នាំ")}</div>
            </li>
          </ul>

          <div className="rounded-lg bg-rose-950/40 border border-rose-300/30 p-3 text-xs">
            <span className="font-bold text-rose-200">
              {t("Two speed-up tricks: ", "មធ្យោបាយបង្កើនល្បឿនពីរ៖ ")}
            </span>
            {t(
              "Add HEAT (more molecules move fast enough to react) or add a CATALYST (a helper molecule that lowers the energy barrier).",
              "បន្ថែមកំដៅ (ម៉ូលេគុលច្រើនជាងនេះផ្លាស់ទីលឿនល្មមអាចប្រតិកម្ម) ឬបន្ថែមកាតាលីករ (ម៉ូលេគុលជំនួយដែលបន្ថយរបាំងថាមពល)។",
            )}
          </div>
        </ChalkCard>
      </div>
    </Panel>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 4 — Microscopic: Quantum & Spectroscopy                        */
/* ──────────────────────────────────────────────────────────────────────── */

function MicroSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <Panel
      id="micro"
      icon={Atom}
      title={{
        en: "4. P-Chem 2 — The Microscopic World",
        kh: "៤. គីមីរូបវិទ្យា ២ — ពិភពមីក្រូ",
      }}
      subtitle={{
        en: "Zoom into a single atom and the rules of everyday physics break down. Welcome to the quantum world.",
        kh: "ពង្រីកមើលក្នុងអាតូមមួយ ហើយច្បាប់រូបវិទ្យាប្រចាំថ្ងៃ លែងដំណើរការ។ សូមស្វាគមន៍មកកាន់ពិភពកង់ទិច។",
      }}
    >
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Quantum Mechanics */}
        <ChalkCard
          title="Quantum Mechanics"
          khTitle="មេកានិចកង់ទិច"
          termEn="Quantum Mechanics"
          termKh="មេកានិចកង់ទិច"
          icon={Atom}
          accent="violet"
        >
          <p>
            {t(
              "At the size of an atom, an electron is NOT a tiny ball orbiting the nucleus like a planet around the sun.",
              "នៅទំហំអាតូម អេឡិចត្រុងមិនមែនជាបាល់តូចមួយវិលជុំវិញស្នូលដូចភពវិលជុំវិញព្រះអាទិត្យទេ។",
            )}
          </p>
          <p>
            {t(
              "Instead, the electron behaves like a fuzzy WAVE OF PROBABILITY — a cloud showing where the electron is most likely to be found.",
              "ផ្ទុយទៅវិញ អេឡិចត្រុងមានឥរិយាបថដូចជា រលកនៃប្រូបាប៊ីលីតេ ស្រអាប់ — ពពកមួយបង្ហាញកន្លែងដែលអេឡិចត្រុងទំនងជាមាន។",
            )}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="rounded-lg bg-violet-950/40 border border-violet-300/30 p-3 text-center">
              <div className="text-3xl mb-1" aria-hidden="true">🪐</div>
              <div className="text-[11px] font-bold text-violet-200">
                {t("Old (wrong) model", "គំរូចាស់ (ខុស)")}
              </div>
              <div className="text-[10px] mt-0.5">
                {t("Electrons orbit", "អេឡិចត្រុងវិលជុំ")}
              </div>
            </div>
            <div className="rounded-lg bg-violet-700/40 border border-violet-200/40 p-3 text-center ring-1 ring-violet-200/30">
              <div className="text-3xl mb-1" aria-hidden="true">☁️</div>
              <div className="text-[11px] font-bold text-white">
                {t("Quantum model", "គំរូកង់ទិច")}
              </div>
              <div className="text-[10px] mt-0.5">
                {t("Probability cloud", "ពពកប្រូបាប៊ីលីតេ")}
              </div>
            </div>
          </div>
        </ChalkCard>

        {/* Spectroscopy */}
        <ChalkCard
          title="Spectroscopy"
          khTitle="វិសាលគមវិទ្យា"
          termEn="Spectroscopy"
          termKh="វិសាលគមវិទ្យា"
          icon={Rainbow}
          accent="sky"
        >
          <p>
            {t(
              "The study of how matter absorbs and emits light. Every element has its own unique 'fingerprint' of colors.",
              "ការសិក្សាអំពីរបៀបដែលសារធាតុស្រូប និងបញ្ចេញពន្លឺ។ ធាតុនីមួយៗមានស្នាមម្រាមដៃពណ៌ផ្ទាល់ខ្លួនរបស់វា។",
            )}
          </p>
          {/* Mini absorption-line visual */}
          <div
            className="rounded-lg border border-sky-300/30 overflow-hidden"
            role="img"
            aria-label={
              kh
                ? "បន្ទាត់ស្រូបស្រដៀងវិសាលគម"
                : "Spectroscopy absorption-line illustration"
            }
          >
            <div className="h-6 bg-gradient-to-r from-violet-500 via-sky-400 via-emerald-400 via-yellow-300 via-orange-400 to-rose-500 relative">
              {/* Absorption lines */}
              <div className="absolute top-0 bottom-0 w-px bg-black" style={{ left: "18%" }} />
              <div className="absolute top-0 bottom-0 w-px bg-black" style={{ left: "44%" }} />
              <div className="absolute top-0 bottom-0 w-px bg-black" style={{ left: "62%" }} />
              <div className="absolute top-0 bottom-0 w-px bg-black" style={{ left: "81%" }} />
            </div>
          </div>
          <p className="text-xs text-sky-200/85">
            {t(
              "Those black lines are wavelengths absorbed by an element — like a barcode that identifies it.",
              "បន្ទាត់ខ្មៅទាំងនោះគឺជារលកដែលធាតុមួយស្រូបយក — ដូចជាបាកូដដែលកំណត់អត្តសញ្ញាណវា។",
            )}
          </p>
          <div className="rounded-lg bg-sky-950/40 border border-sky-300/30 p-3 text-xs">
            <span className="font-bold text-sky-200">
              {t("How we know what stars are made of: ", "របៀបយើងដឹងអ្វីដែលផ្កាយផ្សំឡើង៖ ")}
            </span>
            {t(
              "Astronomers point a telescope at a distant star, split its light through a prism, and read the dark lines. Hydrogen, helium, iron — all reveal themselves.",
              "តារាវិទូតម្រង់ទូរទស្សន៍មួយទៅលើផ្កាយឆ្ងាយ បំបែកពន្លឺវាឆ្លងកាត់ព្រីសម៍ ហើយអានបន្ទាត់ខ្មៅ។ អ៊ីដ្រូសែន អេលីយ៉ូម ដែក — សុទ្ធតែបង្ហាញខ្លួន។",
            )}
          </div>
        </ChalkCard>
      </div>
    </Panel>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 5 — Careers & Real-World Impact                                */
/* ──────────────────────────────────────────────────────────────────────── */

function CareersSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  type Career = {
    icon: React.ComponentType<{ className?: string }>;
    titleEn: string;
    titleKh: string;
    fieldEn: string;
    fieldKh: string;
    descEn: string;
    descKh: string;
    accent: string;
  };

  const careers: Career[] = [
    {
      icon: Sun,
      titleEn: "Better Solar Panels",
      titleKh: "បន្ទះព្រះអាទិត្យល្អជាង",
      fieldEn: "Quantum mechanics of silicon",
      fieldKh: "មេកានិចកង់ទិចនៃស៊ីលីកុន",
      descEn:
        "Solar cells work because of how electrons absorb photons of light. Quantum chemistry helps engineers design materials that capture more sunlight.",
      descKh:
        "កោសិកាព្រះអាទិត្យដំណើរការដោយសារ វិធីដែលអេឡិចត្រុងស្រូបយកផូតុងពន្លឺ។ គីមីវិទ្យាកង់ទិចជួយវិស្វកររចនាសម្ភារៈដែលចាប់យកពន្លឺថ្ងៃកាន់តែច្រើន។",
      accent: "amber",
    },
    {
      icon: BatteryCharging,
      titleEn: "Longer-Lasting Batteries",
      titleKh: "ថ្មប្រើបានយូរ",
      fieldEn: "Electrochemistry",
      fieldKh: "អេឡិចត្រូគីមីវិទ្យា",
      descEn:
        "Lithium-ion phone batteries, electric-bike batteries — all designed by physical chemists studying how ions move through electrolytes.",
      descKh:
        "ថ្មលីចូម-អ៊ីយ៉ុងទូរស័ព្ទ ថ្មកង់អគ្គិសនី — សុទ្ធតែរចនាដោយអ្នកគីមីរូបវិទ្យាដែលសិក្សារបៀបអ៊ីយ៉ុងផ្លាស់ទីឆ្លងកាត់អេឡិចត្រូលីត។",
      accent: "violet",
    },
    {
      icon: CloudFog,
      titleEn: "Climate Science",
      titleKh: "វិទ្យាសាស្ត្រអាកាសធាតុ",
      fieldEn: "Spectroscopy of CO₂",
      fieldKh: "វិសាលគមនៃ CO₂",
      descEn:
        "CO₂ molecules absorb infrared heat from the Earth — exactly the wavelengths spectroscopists measured in the lab. P-Chem is the foundation of climate models.",
      descKh:
        "ម៉ូលេគុល CO₂ ស្រូបយកកំដៅឥនហ្វ្រារ៉េដពីផែនដី — ត្រឹមត្រូវនឹងរលកដែលអ្នកវិសាលគមវិទ្យាបានវាស់ក្នុងមន្ទីរពិសោធន៍។ គីមីរូបវិទ្យាគឺជាមូលដ្ឋាននៃគំរូអាកាសធាតុ។",
      accent: "sky",
    },
  ];

  const accentMap: Record<string, string> = {
    amber: "border-amber-300/40 bg-amber-900/20 text-amber-200",
    violet: "border-violet-300/40 bg-violet-900/25 text-violet-200",
    sky: "border-sky-300/40 bg-sky-900/25 text-sky-200",
  };

  return (
    <Panel
      id="careers"
      icon={GraduationCap}
      title={{
        en: "5. Careers & Impact",
        kh: "៥. អាជីព និងផលប៉ះពាល់",
      }}
      subtitle={{
        en: "Why study P-Chem? Because it powers some of the most important technology of our century.",
        kh: "ហេតុអ្វីត្រូវរៀនគីមីរូបវិទ្យា? ដោយសារវាដំណើរការបច្ចេកវិទ្យាសំខាន់បំផុតមួយចំនួននៃសតវត្សយើង។",
      }}
    >
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {careers.map((c) => {
          const Icon = c.icon;
          return (
            <li key={c.titleEn}>
              <article
                className={`h-full rounded-2xl border ${accentMap[c.accent]} p-5`}
                data-testid={`career-card-${c.accent}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-950/60 text-white ring-1 ring-emerald-300/20">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className={`font-bold text-white ${kh ? "font-khmer" : ""}`}>
                    {kh ? c.titleKh : c.titleEn}
                  </h3>
                </div>
                <p className={`text-[11px] font-mono mb-3 opacity-90`}>
                  {kh ? c.fieldKh : c.fieldEn}
                </p>
                <p
                  className={`text-sm text-emerald-50/90 ${
                    kh ? "font-khmer leading-loose" : "leading-relaxed"
                  }`}
                >
                  {kh ? c.descKh : c.descEn}
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Decorative chalkboard backdrop                                         */
/* ──────────────────────────────────────────────────────────────────────── */

function ChalkboardBackdrop() {
  return (
    <>
      {/* Mathematical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Chalk dust glow at the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(167,243,208,0.45), transparent 65%)",
        }}
      />
    </>
  );
}

export default PhysicalChemistry101Page;
