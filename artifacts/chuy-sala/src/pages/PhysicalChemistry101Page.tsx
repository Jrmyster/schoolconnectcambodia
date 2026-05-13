import { useState, useMemo } from "react";
import { ComposedChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
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
  TrendingUp,
  Scale,
  Wind,
  Activity,
  Layers,
  Binary,
  Gauge,
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

        {/* ── Section 2: Quantum Mechanics: Particle in a Box ──── */}
        <ParticleInBoxSection />

        {/* ── Section 3: P-Chem I Curriculum Syllabus ──────────── */}
        <SyllabusPChemISection />

        {/* ── Section 4: P-Chem II Curriculum Syllabus ─────────── */}
        <SyllabusPChemIISection />

        {/* ── Section 5: The Quantum Revolution ────────────────── */}
        <QuantumRevolutionSection />

        {/* ── Section 6: Macroscopic Deep-Dive ─────────────────── */}
        <MacroSection />

        {/* ── Section 7: Microscopic Deep-Dive ─────────────────── */}
        <MicroSection />

        {/* ── Section 8: Careers & Impact ──────────────────────── */}
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
  accent?: "emerald" | "amber" | "sky" | "violet" | "rose" | "cyan";
  children: React.ReactNode;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const colors: Record<
    string,
    { ring: string; text: string; bg: string; chip: string; glow: string; hoverRing: string }
  > = {
    emerald: {
      ring: "ring-emerald-400/30",
      text: "text-emerald-200",
      bg: "bg-emerald-900/40",
      chip: "bg-emerald-800/70 text-emerald-100",
      glow: "hover:shadow-[0_0_28px_-4px_rgba(52,211,153,0.55)]",
      hoverRing: "hover:ring-emerald-300/70",
    },
    amber: {
      ring: "ring-amber-300/30",
      text: "text-amber-200",
      bg: "bg-amber-900/20",
      chip: "bg-amber-800/60 text-amber-100",
      glow: "hover:shadow-[0_0_28px_-4px_rgba(251,191,36,0.55)]",
      hoverRing: "hover:ring-amber-300/70",
    },
    sky: {
      ring: "ring-sky-300/30",
      text: "text-sky-200",
      bg: "bg-sky-900/25",
      chip: "bg-sky-800/60 text-sky-100",
      glow: "hover:shadow-[0_0_28px_-4px_rgba(56,189,248,0.55)]",
      hoverRing: "hover:ring-sky-300/70",
    },
    violet: {
      ring: "ring-violet-300/30",
      text: "text-violet-200",
      bg: "bg-violet-900/25",
      chip: "bg-violet-800/60 text-violet-100",
      glow: "hover:shadow-[0_0_28px_-4px_rgba(167,139,250,0.55)]",
      hoverRing: "hover:ring-violet-300/70",
    },
    rose: {
      ring: "ring-rose-300/30",
      text: "text-rose-200",
      bg: "bg-rose-900/25",
      chip: "bg-rose-800/60 text-rose-100",
      glow: "hover:shadow-[0_0_28px_-4px_rgba(251,113,133,0.55)]",
      hoverRing: "hover:ring-rose-300/70",
    },
    cyan: {
      ring: "ring-cyan-300/30",
      text: "text-cyan-200",
      bg: "bg-cyan-900/25",
      chip: "bg-cyan-800/60 text-cyan-100",
      glow: "hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.55)]",
      hoverRing: "hover:ring-cyan-300/70",
    },
  };
  const c = colors[accent];

  return (
    <article
      className={`rounded-2xl border border-emerald-700/40 ring-1 ${c.ring} ${c.bg} p-5 transition duration-300 hover:-translate-y-0.5 hover:ring-2 ${c.hoverRing} ${c.glow}`}
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
/*  Section 2 — Quantum Mechanics: Particle in a Box (interactive)         */
/* ──────────────────────────────────────────────────────────────────────── */

function ParticleInBoxSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const [n, setN] = useState(1);
  const [Lnm, setLnm] = useState(1.0);

  // ψₙ(x) = √(2/L)·sin(nπx/L),  |ψ|² = (2/L)·sin²(nπx/L)
  const chartData = useMemo(() => {
    const pts = 300;
    return Array.from({ length: pts + 1 }, (_, i) => {
      const x = (i / pts) * Lnm;
      const s = Math.sin((n * Math.PI * x) / Lnm);
      return {
        x: parseFloat(x.toFixed(3)),
        psi: parseFloat((Math.sqrt(2 / Lnm) * s).toFixed(4)),
        prob: parseFloat(((2 / Lnm) * s * s).toFixed(4)),
      };
    });
  }, [n, Lnm]);

  // Eₙ = n²h²/(8mL²)  in eV
  const energyEv = useMemo(() => {
    const Lm = Lnm * 1e-9;
    return (n * n * 6.626e-34 * 6.626e-34) / (8 * 9.109e-31 * Lm * Lm * 1.602e-19);
  }, [n, Lnm]);

  const nodes = n - 1;
  const lambdaNm = ((2 * Lnm) / n).toFixed(2);

  return (
    <Panel
      id="particle-in-box"
      icon={Box}
      title={{ en: "2. Quantum Mechanics: Particle in a Box", kh: "២. មេកានិចកង់ទិច៖ ភាគល្អិតក្នុងប្រអប់" }}
      subtitle={{
        en: "Drag the sliders to see how the wave function ψ and probability density |ψ|² respond to energy level and box size.",
        kh: "អូសសន្ទុះ ដើម្បីមើលរបៀបដែល ψ និង |ψ|² ឆ្លើយតបទៅនឹងកម្រិតថាមពល និងទំហំប្រអប់។",
      }}
    >
      <div className="space-y-5">
        {/* Sliders */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-emerald-900/50 border border-emerald-700/40 p-4">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="pib-n" className={`text-xs font-bold uppercase tracking-widest text-violet-300 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {t("Quantum Number", "ចំនួនកង់ទិច")}
              </label>
              <span className="font-mono text-2xl font-black text-white">n = {n}</span>
            </div>
            <input id="pib-n" type="range" min={1} max={5} step={1} value={n} onChange={(e) => setN(+e.target.value)} className="w-full accent-violet-400 cursor-pointer" />
            <div className="flex justify-between text-[11px] text-emerald-400/70 mt-1 font-mono"><span>n=1</span><span>n=5</span></div>
            <p className={`text-[11px] text-emerald-200/70 mt-2 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t("Sets the energy level. n−1 interior zero-crossings (nodes) appear on the curve.", "កំណត់កម្រិតថាមពល។ ចំណុចទទេ n−1 លេចឡើងនៅលើខ្សែកោង។")}
            </p>
          </div>
          <div className="rounded-xl bg-emerald-900/50 border border-emerald-700/40 p-4">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="pib-L" className={`text-xs font-bold uppercase tracking-widest text-amber-300 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
                {t("Box Length", "ប្រវែងប្រអប់")}
              </label>
              <span className="font-mono text-2xl font-black text-white">{Lnm.toFixed(1)} nm</span>
            </div>
            <input id="pib-L" type="range" min={0.5} max={3.0} step={0.1} value={Lnm} onChange={(e) => setLnm(+e.target.value)} className="w-full accent-amber-400 cursor-pointer" />
            <div className="flex justify-between text-[11px] text-emerald-400/70 mt-1 font-mono"><span>0.5 nm</span><span>3.0 nm</span></div>
            <p className={`text-[11px] text-emerald-200/70 mt-2 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t("A larger box stretches the waveform and sharply lowers the energy levels.", "ប្រអប់ធំជាងនេះ ពង្រីករូបតំណាង ហើយបន្ថយកម្រិតថាមពលយ៉ាងខ្លាំង។")}
            </p>
          </div>
        </div>

        {/* Readout bar */}
        <div className="rounded-xl bg-emerald-950/70 border border-emerald-700/40 px-4 py-3 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className={`text-[10px] font-mono uppercase tracking-widest text-emerald-400/80 mb-0.5 ${kh ? "font-khmer normal-case" : ""}`}>{t("Energy", "ថាមពល")}</div>
            <div className="text-white font-mono font-bold text-sm">E<sub>{n}</sub> = {energyEv.toFixed(3)} eV</div>
            <div className="text-[10px] text-emerald-300/60 font-mono">= {n}²·E₁</div>
          </div>
          <div>
            <div className={`text-[10px] font-mono uppercase tracking-widest text-emerald-400/80 mb-0.5 ${kh ? "font-khmer normal-case" : ""}`}>{t("Interior Nodes", "ចំណុចទទេ")}</div>
            <div className="text-violet-300 font-mono font-bold text-sm">{nodes}</div>
            <div className="text-[10px] text-emerald-300/60 font-mono">n − 1 = {n} − 1</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/80 mb-0.5">λ de Broglie</div>
            <div className="text-amber-300 font-mono font-bold text-sm">{lambdaNm} nm</div>
            <div className="text-[10px] text-emerald-300/60 font-mono">2L / n</div>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-2xl bg-emerald-950/80 border border-emerald-700/40 px-2 pt-5 pb-3">
          <div className="flex items-center justify-center gap-6 mb-3 text-xs font-mono">
            <span className="flex items-center gap-1.5"><span className="inline-block w-5 h-0.5 bg-emerald-400 rounded" /><span className="text-emerald-300">ψ(x) — {t("wave function", "មុខងាររលក")}</span></span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-5 h-0.5 bg-amber-400 rounded" /><span className="text-amber-300">|ψ|²(x) — {t("probability density", "ដង់ស៊ីតេប្រូបាប")}</span></span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={chartData} margin={{ top: 4, right: 16, left: 4, bottom: 4 }}>
              <XAxis dataKey="x" type="number" domain={[0, Lnm]} tickCount={5} tickFormatter={(v: number) => v.toFixed(1)} tick={{ fill: "#6ee7b7", fontSize: 10, fontFamily: "monospace" }} axisLine={{ stroke: "#064e3b" }} tickLine={{ stroke: "#064e3b" }} label={{ value: "x (nm)", position: "insideBottomRight", offset: -4, fill: "#6ee7b7", fontSize: 10 }} />
              <YAxis tick={{ fill: "#6ee7b7", fontSize: 10, fontFamily: "monospace" }} tickFormatter={(v: number) => v.toFixed(1)} axisLine={{ stroke: "#064e3b" }} tickLine={{ stroke: "#064e3b" }} />
              <Line type="monotone" dataKey="psi" stroke="#34d399" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="prob" stroke="#fbbf24" strokeWidth={2} dot={false} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Explanations */}
        <div className="space-y-3">
          <ChalkCard title="What does ψ(x) mean?" khTitle="ψ(x) មានន័យថាអ្វី?" termEn="The Wave Function" termKh="មុខងាររលក" icon={Waves} accent="emerald">
            <p>{t("The green curve ψ(x) is the electron's wave function — not its exact position, but a mathematical object encoding all quantum information. ψ can be negative (phase of the wave), which is perfectly valid physics.", "ខ្សែកោងបៃតង ψ(x) គឺជាមុខងាររលករបស់អេឡិចត្រុង — មិនមែនជាទីតាំងពិតប្រាកដរបស់វា ប៉ុន្តែជាវត្ថុគណិតវិទ្យា ដែលរក្សាព័ត៌មានកង់ទិចទាំងអស់។ ψ អាចជាអវិជ្ជមានបាន ដែលនេះ​ជារូបវិទ្យា​ត្រឹមត្រូវ​ល្អ​ណាស់​។")}</p>
          </ChalkCard>
          <ChalkCard title="What does |ψ|²(x) mean?" khTitle="|ψ|²(x) មានន័យថាអ្វី?" termEn="Probability Density" termKh="ដង់ស៊ីតេប្រូបាប" icon={Activity} accent="amber">
            <p>{t("Squaring ψ removes all negative values, giving the amber |ψ|² curve — always ≥ 0. A peak on this curve means the electron is most likely to be found at that position if you measure it. The nodes (zero points) are positions where the electron is never detected.", "ការការ ψ ដកតម្លៃអវិជ្ជមានចេញ ផ្តល់ |ψ|² — ≥ 0 ជានិច្ច។ ចំណុចខ្ពស់មួយ មានន័យថាអេឡិចត្រុងទំនងជាត្រូវបានរកឃើញទីនោះ។ ចំណុចទទេ (ចំណុចសូន្យ) គឺជាទីតាំងដែលអេឡិចត្រុងមិនដែលត្រូវបានរកឃើញ។")}</p>
          </ChalkCard>
          <ChalkCard title="Why must n be an integer?" khTitle="ហេតុអ្វីបានជា n ជាចំនួនគត់?" termEn="Quantization from Boundary Conditions" termKh="ការកំណត់ចំនួនពីលក្ខខណ្ឌព្រំដែន" icon={Binary} accent="violet">
            <p>{t("ψ must be zero at both walls (x=0 and x=L) because the electron cannot exist outside the box. This forces only whole half-wavelengths to fit: λ = 2L/n. Only integer n satisfies this, so energy is automatically quantized — this is the origin of energy levels in atoms.", "ψ ត្រូវតែស្មើសូន្យនៅជញ្ជាំងទាំងពីរ ពីព្រោះអេឡិចត្រុងមិនអាចមាននៅខាងក្រៅប្រអប់។ នេះបង្ខំឱ្យតែពាក់កណ្ដាលរលកនៃចំនួនគត់ ចូល: λ=2L/n។ n ដែលជាចំនួនគត់ប៉ុណ្ណោះ បំពេញលក្ខខណ្ឌនេះ ដូច្នេះថាមពលត្រូវបានកំណត់ ─ នេះ​ជា​ប្រភព​នៃ​កម្រិតថាមពល​ក្នុង​អាតូម​។")}</p>
            <div className="rounded-lg bg-emerald-950/60 border border-violet-400/30 px-3 py-2 text-center mt-2">
              <InlineMath math={String.raw`E_n = n^2 \cdot \frac{h^2}{8mL^2}`} />
            </div>
          </ChalkCard>
        </div>
      </div>
    </Panel>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Sections 3 & 4 — University Syllabus (P-Chem I & II)                   */
/* ──────────────────────────────────────────────────────────────────────── */

/* Inline accent helper. The user asked for "subtle accent colors (like a soft
   neon green or pale yellow)" on key terms. We expose a small <K> helper that
   wraps a phrase in one of the chalkboard-friendly accents. We use lime for
   chemistry/physics terms and amber for laws / equations / numbered concepts.
   Bilingual labels stay paired (EN + KH side-by-side) per the user's
   "strictly bilingual" rule for headings. */
function K({
  children,
  tone = "lime",
}: {
  children: React.ReactNode;
  tone?: "lime" | "amber";
}) {
  const cls =
    tone === "amber"
      ? "text-amber-200 font-semibold"
      : "text-lime-300 font-semibold";
  return <span className={cls}>{children}</span>;
}

type SyllabusItem = {
  key: string;
  Icon: typeof Atom;
  titleEn: string;
  titleKh: string;
  bodyEn: React.ReactNode;
  bodyKh: React.ReactNode;
  accent: "amber" | "sky" | "violet" | "rose" | "cyan" | "emerald";
};

/* A bilingual full-width syllabus panel. Headings & subtitle are paired
   EN+KH simultaneously (no toggle); body description follows the page's
   established t(en, kh) language-switch pattern, which is consistent with
   every other panel on this page. */
function SyllabusPanel({
  id,
  numberEn,
  numberKh,
  Icon,
  titleEn,
  titleKh,
  subtitleEn,
  subtitleKh,
  items,
  testId,
}: {
  id: string;
  numberEn: string;
  numberKh: string;
  Icon: typeof Atom;
  titleEn: string;
  titleKh: string;
  subtitleEn: string;
  subtitleKh: string;
  items: SyllabusItem[];
  testId: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const accentText: Record<SyllabusItem["accent"], string> = {
    emerald: "text-emerald-300",
    amber: "text-amber-300",
    sky: "text-sky-300",
    violet: "text-violet-300",
    rose: "text-rose-300",
    cyan: "text-cyan-300",
  };
  const accentBg: Record<SyllabusItem["accent"], string> = {
    emerald: "bg-emerald-800/70 ring-emerald-300/30",
    amber: "bg-amber-800/60 ring-amber-300/30",
    sky: "bg-sky-800/60 ring-sky-300/30",
    violet: "bg-violet-800/60 ring-violet-300/30",
    rose: "bg-rose-800/60 ring-rose-300/30",
    cyan: "bg-cyan-800/60 ring-cyan-300/30",
  };

  return (
    <section
      data-testid={testId}
      aria-labelledby={`${id}-heading`}
      className="mb-12 rounded-3xl bg-emerald-950/60 border-2 border-emerald-700/50 shadow-[0_0_40px_rgba(16,185,129,0.08)] overflow-hidden backdrop-blur-sm"
    >
      <header className="px-5 sm:px-7 pt-6 pb-4 border-b border-emerald-700/40 bg-gradient-to-r from-emerald-900/60 to-emerald-950/30">
        <div className="flex items-start gap-3 mb-2">
          <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-800 text-emerald-100 ring-1 ring-emerald-300/30 shadow-sm">
            <Icon className="w-5 h-5" />
          </span>
          <h2
            id={`${id}-heading`}
            className="text-xl sm:text-2xl font-bold text-white leading-snug"
            style={{ textShadow: "0 0 10px rgba(255,255,255,0.12)" }}
          >
            <span className="block">
              <span className="text-lime-300 mr-1">{numberEn}</span>
              {titleEn}
            </span>
            <span className="block font-khmer text-base sm:text-lg font-semibold text-emerald-100/95 mt-1 leading-relaxed">
              <span className="text-lime-300 mr-1">{numberKh}</span>
              {titleKh}
            </span>
          </h2>
        </div>
        <p className="text-sm text-emerald-100/80 leading-relaxed">
          <span className="block italic">{subtitleEn}</span>
          <span className="block font-khmer not-italic mt-1 leading-loose">
            {subtitleKh}
          </span>
        </p>
      </header>

      <div className="p-5 sm:p-7">
        <ul role="list" className="grid grid-cols-1 gap-4 sm:gap-5">
          {items.map((it) => (
            <li
              key={it.key}
              data-testid={`${testId}-item-${it.key}`}
              className="rounded-2xl border border-emerald-700/40 ring-1 ring-emerald-400/20 bg-emerald-900/40 p-5 transition duration-300 hover:-translate-y-0.5 hover:ring-2 hover:ring-emerald-300/60 hover:shadow-[0_0_28px_-4px_rgba(52,211,153,0.45)]"
            >
              <header className="flex items-start gap-3 mb-3">
                <span
                  className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl text-white ring-1 shadow-sm ${accentBg[it.accent]}`}
                  aria-hidden="true"
                >
                  <it.Icon className="w-4 h-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white leading-snug">
                    <span className="block">{it.titleEn}</span>
                    <span
                      className={`block font-khmer text-sm font-semibold mt-0.5 leading-relaxed ${accentText[it.accent]}`}
                    >
                      {it.titleKh}
                    </span>
                  </h3>
                </div>
              </header>
              <div
                className={`text-sm text-emerald-50/90 leading-relaxed ${
                  kh ? "font-khmer leading-loose" : ""
                }`}
              >
                {kh ? it.bodyKh : it.bodyEn}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Section 2 — P-Chem I: Thermodynamics & Kinetics ─────────────────── */
function SyllabusPChemISection() {
  const items: SyllabusItem[] = [
    {
      key: "laws-thermo",
      Icon: Flame,
      titleEn: "Laws of Thermodynamics",
      titleKh: "ច្បាប់ទែម៉ូឌីណាមិច",
      accent: "amber",
      bodyEn: (
        <>
          The <K tone="amber">First Law</K> (conservation of energy:{" "}
          <K>internal energy</K> and <K>enthalpy</K>), the{" "}
          <K tone="amber">Second Law</K> (<K>entropy</K> always increases —{" "}
          <K>Gibbs free energy</K> tells us if a reaction is spontaneous), and
          the <K tone="amber">Third Law</K> (entropy of a perfect crystal
          approaches zero as temperature approaches absolute zero).
        </>
      ),
      bodyKh: (
        <>
          <K tone="amber">ច្បាប់ទីមួយ</K> (ការអភិរក្សថាមពល៖ <K>ថាមពលផ្ទៃក្នុង</K>{" "}
          និង <K>អង់ថាល់ពី</K>), <K tone="amber">ច្បាប់ទីពីរ</K> (
          <K>អង់ត្រូពី</K> កើនឡើងជានិច្ច — <K>ថាមពលសេរីហ្គីប</K>{" "}
          ប្រាប់យើងថាប្រតិកម្មកើតឡើងដោយខ្លួនឯងឬអត់), និង{" "}
          <K tone="amber">ច្បាប់ទីបី</K>{" "}
          (អង់ត្រូពីនៃគ្រីស្តាល់ល្អឥតខ្ចោះខិតជិតសូន្យ
          ពេលសីតុណ្ហភាពខិតជិតសូន្យដាច់ខាត)។
        </>
      ),
    },
    {
      key: "equilibrium",
      Icon: Scale,
      titleEn: "Equilibrium",
      titleKh: "ឌុលលីប្រ៊ីយ៉ូម",
      accent: "emerald",
      bodyEn: (
        <>
          <K>Phase changes</K> (solid → liquid → gas), <K>phase diagrams</K>{" "}
          mapping pressure vs. temperature, and{" "}
          <K tone="amber">chemical equilibrium</K> — the elegant balance point
          where forward and reverse reactions cancel out.
        </>
      ),
      bodyKh: (
        <>
          <K>ការប្រែប្រួលដំណាក់កាល</K> (រឹង → រាវ → ឧស្ម័ន),{" "}
          <K>ដ្យាក្រាមដំណាក់កាល</K>{" "}
          ដែលគូសផែនទីសម្ពាធធៀបនឹងសីតុណ្ហភាព និង{" "}
          <K tone="amber">ឌុលលីប្រ៊ីយ៉ូមគីមី</K> — ចំណុចតុល្យភាពដ៏ឆើតឆាយ
          ដែលប្រតិកម្មទៅមុខនិងទៅក្រោយលុបបំបាត់គ្នា។
        </>
      ),
    },
    {
      key: "real-gases",
      Icon: Wind,
      titleEn: "Real Gases and Solutions",
      titleKh: "ឧស្ម័ននិងសូលុយស្យុងពិត",
      accent: "sky",
      bodyEn: (
        <>
          Deviations from <K>ideal behavior</K> when gases get crowded or cold,
          and the <K tone="amber">van der Waals equation</K> — a beautiful
          correction that finally explains why a real tank of gas isn't a
          cartoon of bouncing points.
        </>
      ),
      bodyKh: (
        <>
          ការងាករចេញពី <K>ឥរិយាបថឧត្តម</K> ពេលឧស្ម័នកក្រោល​ ឬត្រជាក់, និង{" "}
          <K tone="amber">សមីការ van der Waals</K> — ការកែតម្រូវដ៏ស្រស់ស្អាត
          ដែលពន្យល់ចុងក្រោយពីមូលហេតុដែលធុងឧស្ម័នពិត
          មិនមែនជារូបគំនូរនៃចំណុចលោតនោះទេ។
        </>
      ),
    },
    {
      key: "kinetics",
      Icon: Timer,
      titleEn: "Chemical Kinetics",
      titleKh: "គីនេទិចគីមី",
      accent: "rose",
      bodyEn: (
        <>
          <K tone="amber">Rate laws</K> (how fast reactions go),{" "}
          <K>reaction mechanisms</K> (the invisible step-by-step path from
          reactants to products), and <K tone="amber">activation energy</K> —
          the energy barrier every reaction must climb to happen.
        </>
      ),
      bodyKh: (
        <>
          <K tone="amber">ច្បាប់អត្រា</K> (ល្បឿនប្រតិកម្មកើតឡើង),{" "}
          <K>យន្តការប្រតិកម្ម</K>{" "}
          (ផ្លូវដែលមើលមិនឃើញជំហានម្តងពីរ៉េអាក់ទីហ្វទៅផលិតផល), និង{" "}
          <K tone="amber">ថាមពលឆ្លើយតប</K> — រនាំងថាមពលដែលរាល់ប្រតិកម្ម
          ត្រូវឡើងឆ្លងកាត់ ដើម្បីកើតឡើង។
        </>
      ),
    },
    {
      key: "electrochem",
      Icon: BatteryCharging,
      titleEn: "Electrochemistry",
      titleKh: "អេឡិចត្រូគីមី",
      accent: "violet",
      bodyEn: (
        <>
          <K>Ions</K>, <K>electrodes</K>, and <K tone="amber">
            electrochemical cells
          </K>{" "}
          — the chemistry behind every battery, every electroplated metal, and
          every fuel cell powering the energy transition.
        </>
      ),
      bodyKh: (
        <>
          <K>អ៊ីយ៉ុង</K>, <K>អេឡិចត្រូត</K>, និង <K tone="amber">កោសិកាអេឡិចត្រូគីមី</K>{" "}
          — គីមីវិទ្យានៅពីក្រោយរាល់ថ្ម រាល់លោហៈចំណាប់អគ្គិសនី
          និងរាល់កោសិកាឥន្ធនៈដែលបញ្ចេញថាមពលអន្តរកាល។
        </>
      ),
    },
  ];

  return (
    <SyllabusPanel
      id="syllabus-pchem-1"
      testId="section-pchem-1-syllabus"
      Icon={Flame}
      numberEn="3."
      numberKh="៣."
      titleEn="Physical Chemistry I: Thermodynamics & Kinetics"
      titleKh="គីមីវិទ្យារូបវន្ត ១៖ ទែម៉ូឌីណាមិច និងគីនេទិច"
      subtitleEn="Focused on macroscopic behaviors, energy, and reaction rates."
      subtitleKh="ផ្តោតលើឥរិយាបថម៉ាក្រូស្កូប ថាមពល និងអត្រាប្រតិកម្ម។"
      items={items}
    />
  );
}

/* ─── Section 3 — P-Chem II: Quantum Chemistry & Spectroscopy ──────────── */
function SyllabusPChemIISection() {
  const items: SyllabusItem[] = [
    {
      key: "qm-fundamentals",
      Icon: Waves,
      titleEn: "Quantum Mechanics Fundamentals",
      titleKh: "មូលដ្ឋានយន្តវិទ្យាម្កង់តូម",
      accent: "violet",
      bodyEn: (
        <>
          <K>Wave-particle duality</K> (light is both, electrons are both!),
          the <K tone="amber">Schrödinger equation</K> (the master equation of
          the quantum world), and <K>wavefunctions</K> — the strange
          probability clouds that replace classical orbits.
        </>
      ),
      bodyKh: (
        <>
          <K>ភាពទ្វេនិយមរលក-ភាគល្អិត</K>{" "}
          (ពន្លឺគឺទាំងពីរ អេឡិចត្រុងគឺទាំងពីរ!),{" "}
          <K tone="amber">សមីការ Schrödinger</K>{" "}
          (សមីការមេនៃពិភពកង់ទិច), និង <K>មុខងាររលក</K> —
          ពពកប្រូបាប៊ីលីតេចម្លែកដែលជំនួសគន្លងបុរាណ។
        </>
      ),
    },
    {
      key: "qm-systems",
      Icon: Box,
      titleEn: "Quantum Systems",
      titleKh: "ប្រព័ន្ធកង់ទិច",
      accent: "sky",
      bodyEn: (
        <>
          The classic teaching toys: <K>particle-in-a-box</K> (electrons trapped
          between walls), the <K>harmonic oscillator</K> (a quantum spring), and{" "}
          <K tone="amber">angular momentum</K> — the rotational rules that
          determine atomic shapes.
        </>
      ),
      bodyKh: (
        <>
          ឧបករណ៍បង្រៀនបុរាណ៖ <K>ភាគល្អិតក្នុងប្រអប់</K>{" "}
          (អេឡិចត្រុងជាប់ចន្លោះជញ្ជាំង), <K>ឌួររំញ័រអាម៉ូនិច</K>{" "}
          (រ៉េស័រកង់ទិច), និង <K tone="amber">មុំចលនា</K> — ច្បាប់នៃការវិល
          ដែលកំណត់រូបរាងអាតូម។
        </>
      ),
    },
    {
      key: "atomic-molecular",
      Icon: Atom,
      titleEn: "Atomic and Molecular Structure",
      titleKh: "រចនាសម្ព័ន្ធអាតូម និងម៉ូលេគុល",
      accent: "emerald",
      bodyEn: (
        <>
          <K>Atomic orbitals</K> (s, p, d, f — the famous shapes from chemistry
          class), <K tone="amber">molecular orbital theory</K> (how orbitals
          combine into bonds), and <K>chemical bonding</K> from a quantum
          first-principles perspective.
        </>
      ),
      bodyKh: (
        <>
          <K>គន្លងអាតូម</K> (s, p, d, f — រូបរាងល្បីៗពីថ្នាក់គីមី),{" "}
          <K tone="amber">ទ្រឹស្តីគន្លងម៉ូលេគុល</K> (របៀបដែលគន្លងផ្សំគ្នា
          ទៅជាចំណង), និង <K>ចំណងគីមី</K>{" "}
          ពីទស្សនៈគោលការណ៍កង់ទិច។
        </>
      ),
    },
    {
      key: "spectroscopy-syllabus",
      Icon: Rainbow,
      titleEn: "Spectroscopy",
      titleKh: "វិសាលគមវិទ្យា",
      accent: "rose",
      bodyEn: (
        <>
          The <K>interaction of radiation with matter</K> — and how every
          atom's <K tone="amber">absorption / emission spectrum</K> is its
          unique fingerprint, letting us identify chemicals across the lab,
          across the planet, even across the galaxy.
        </>
      ),
      bodyKh: (
        <>
          <K>អន្តរកម្មរវាងវិទ្យុសកម្ម និងសារធាតុ</K> — និងរបៀបដែល{" "}
          <K tone="amber">វិសាលគមស្រូប/បញ្ចេញ</K> របស់រាល់អាតូម
          ជាស្នាមម្រាមដៃតែមួយគត់ ដែលអនុញ្ញាតឱ្យយើងសម្គាល់សារធាតុគីមី
          នៅទូទាំងមន្ទីរពិសោធន៍ ពិភពលោក និងសូម្បីតែទូទាំងហ្គាឡាក់ស៊ី។
        </>
      ),
    },
    {
      key: "stat-mech",
      Icon: Layers,
      titleEn: "Statistical Mechanics",
      titleKh: "មេកានិចស្ថិតិ",
      accent: "cyan",
      bodyEn: (
        <>
          <K tone="amber">Partition functions</K> — the elegant mathematical
          bridge that connects the chaos of <K>microscopic states</K>{" "}
          (quadrillions of jiggling atoms) to the smooth, predictable{" "}
          <K>macroscopic properties</K> we measure with thermometers and
          pressure gauges.
        </>
      ),
      bodyKh: (
        <>
          <K tone="amber">មុខងារផេតិសិន</K> — ស្ពានគណិតវិទ្យាដ៏ឆើតឆាយ
          ដែលភ្ជាប់ភាពច្របូកច្របល់នៃ <K>ស្ថានភាពមីក្រូស្កូប</K>{" "}
          (អាតូមរញ្ជួយរាប់ពាន់ពាន់ពាន់) ទៅនឹង <K>លក្ខណៈសម្បត្តិម៉ាក្រូស្កូប</K>{" "}
          ដែលរលូននិងអាចព្យាករណ៍បាន ដែលយើងវាស់ដោយទែម៉ូម៉ែត្រ និងម៉ាត់សម្ពាធ។
        </>
      ),
    },
  ];

  return (
    <SyllabusPanel
      id="syllabus-pchem-2"
      testId="section-pchem-2-syllabus"
      Icon={Atom}
      numberEn="4."
      numberKh="៤."
      titleEn="Physical Chemistry II: Quantum Chemistry & Spectroscopy"
      titleKh="គីមីវិទ្យារូបវន្ត ២៖ គីមីវិទ្យាម្កង់តូម និងវិសាលគមវិទ្យា"
      subtitleEn="Focused on microscopic phenomena, molecular structure, and quantum mechanics."
      subtitleKh="ផ្តោតលើបាតុភូតមីក្រូស្កូប រចនាសម្ព័ន្ធម៉ូលេគុល និងយន្តវិទ្យាម្កង់តូម។"
      items={items}
    />
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 4 — The Quantum Revolution                                     */
/* ──────────────────────────────────────────────────────────────────────── */

function QuantumRevolutionSection() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <Panel
      id="quantum-revolution"
      icon={Sparkles}
      title={{ en: "5. The Quantum Revolution", kh: "៥. បដិវត្តន៍កង់ទិច" }}
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
/*  Section 5 — Macroscopic: Thermo & Kinetics (deep-dive)                 */
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
        en: "6. The Macroscopic World — Deep Dive",
        kh: "៦. ពិភពម៉ាក្រូ — ការសិក្សាស៊ីជម្រៅ",
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

      {/* Reaction Orders — sub-section beneath the Kinetics intro */}
      <ReactionOrders />
    </Panel>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 6 — Microscopic: Quantum & Spectroscopy (deep-dive)            */
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
        en: "7. The Microscopic World — Deep Dive",
        kh: "៧. ពិភពមីក្រូ — ការសិក្សាស៊ីជម្រៅ",
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

        {/* Card 3 — Advanced Thermodynamics */}
        <ChalkCard
          title="Advanced Thermodynamics"
          khTitle="ទែរម៉ូឌីណាមិកកម្រិតខ្ពស់"
          termEn="Δ — Energy & Spontaneity"
          termKh="Δ — ថាមពល និងភាពឯកឯង"
          icon={Flame}
          accent="amber"
        >
          <p>
            {t(
              "The study of energy flow and chemical equilibrium — what makes a process actually want to happen.",
              "ការសិក្សាអំពីលំហូរថាមពល និងសមតុល្យគីមី — អ្វីដែលធ្វើឱ្យដំណើរការមួយចង់កើតឡើងពិតប្រាកដ។",
            )}
          </p>
          <p>
            {t(
              "Three variables run the show: Enthalpy (H, heat content), Entropy (S, disorder), and Gibbs Free Energy (G, the deciding referee).",
              "អថេរបីគ្រប់គ្រងរឿងទាំងអស់៖ អង់តាល់ពី (H ខ្លឹមសារកំដៅ) អង់ត្រូពី (S វឹកវរ) និងថាមពលសេរីហ្ស៊ីប (G ជាអាជ្ញាកណ្តាលសម្រេច)។",
            )}
          </p>
          <div
            className="rounded-lg bg-amber-950/40 border border-amber-300/30 p-3 text-xs"
            data-testid="micro-thermo-formula"
          >
            <div className="font-bold text-amber-200 mb-1">
              {t("The deciding equation:", "សមីការសម្រេច៖")}
            </div>
            <div className="text-center my-1">
              <InlineMath math="\Delta G = \Delta H - T\Delta S" />
            </div>
            <div className="opacity-90">
              {t(
                "If ΔG is negative, ice melts on its own. If positive, it stays frozen. One sign tells you whether anything in the universe will spontaneously happen.",
                "បើ ΔG អវិជ្ជមាន ទឹកកករលាយដោយខ្លួនឯង។ បើវិជ្ជមាន វានៅកក។ សញ្ញាមួយនេះប្រាប់ថាតើអ្វីៗក្នុងសកលលោកនឹងកើតឡើងដោយឯកឯងឬទេ។",
              )}
            </div>
          </div>
        </ChalkCard>

        {/* Card 4 — Chemical Kinetics */}
        <ChalkCard
          title="Chemical Kinetics"
          khTitle="គីណេទិកគីមី"
          termEn="⏱ — How Fast?"
          termKh="⏱ — លឿនប៉ុណ្ណា?"
          icon={Timer}
          accent="rose"
        >
          <p>
            {t(
              "Thermodynamics tells you IF a reaction will happen. Kinetics tells you HOW FAST.",
              "ទែរម៉ូឌីណាមិកប្រាប់ថាប្រតិកម្ម នឹងកើតឬទេ។ គីណេទិកប្រាប់ថាវា លឿនប៉ុណ្ណា។",
            )}
          </p>
          <p>
            {t(
              "Rate Laws, Reaction Mechanisms, and Transition State Theory describe the climb molecules must make over an activation-energy barrier.",
              "ច្បាប់អត្រា យន្តការប្រតិកម្ម និងទ្រឹស្តីស្ថានភាពអន្តរកាលពណ៌នាការឡើងភ្នំដែលម៉ូលេគុលត្រូវឆ្លងកាត់ឧបសគ្គថាមពលធ្វើសកម្មភាព។",
            )}
          </p>
          <div className="rounded-lg bg-rose-950/40 border border-rose-300/30 p-3 text-xs">
            <div className="font-bold text-rose-200 mb-1">
              {t("Arrhenius equation:", "សមីការអារ៉េនីយ៉ូស៖")}
            </div>
            <div className="text-center my-1">
              <InlineMath math="k = A e^{-E_a / RT}" />
            </div>
            <div className="opacity-90">
              {t(
                "Heat the reaction (raise T) or use a catalyst (lower Eₐ) and the rate jumps. Catalysts come in two flavors: homogeneous (same phase) and heterogeneous (different phase, like a solid surface).",
                "កំដៅប្រតិកម្ម (បង្កើន T) ឬប្រើកាតាលីស (បន្ថយ Eₐ) នោះអត្រាកើនឡើង។ កាតាលីសមានពីរប្រភេទ៖ ដូចគ្នា (ដំណាក់កាលដូចគ្នា) និងផ្សេងគ្នា (ដំណាក់កាលផ្សេងគ្នា ដូចជាផ្ទៃរឹង)។",
              )}
            </div>
          </div>
        </ChalkCard>

        {/* Card 5 — Statistical Thermodynamics */}
        <ChalkCard
          title="Statistical Thermodynamics"
          khTitle="ទែរម៉ូឌីណាមិកស្ថិតិ"
          termEn="∑ — Micro → Macro"
          termKh="∑ — មីក្រូ → ម៉ាក្រូ"
          icon={Sigma}
          accent="emerald"
        >
          <p>
            {t(
              "The bridge between the random dance of single molecules and the steady numbers we read on a thermometer or pressure gauge.",
              "ស្ពានរវាងការរាំចៃដន្យនៃម៉ូលេគុលតែមួយ និងលេខស្ថិរនៅលើទែម៉ូម៉ែត្រ ឬម៉ាស៊ីនវាស់សម្ពាធ។",
            )}
          </p>
          <p>
            {t(
              "Ensembles, Partition Functions, and Molecular Degrees of Freedom translate billions of microscopic states into one macroscopic temperature, pressure, or heat capacity.",
              "ប្រមូល មុខងារបែងចែក និងសញ្ញាស្វ័យភាពម៉ូលេគុល បកប្រែស្ថានភាពមីក្រូរាប់ពាន់លានទៅជាសីតុណ្ហភាព សម្ពាធ ឬសមត្ថភាពកំដៅម៉ាក្រូតែមួយ។",
            )}
          </p>
          {/* Mini bell-curve / particle-cluster visual */}
          <div
            className="rounded-lg border border-emerald-300/30 bg-emerald-950/40 p-3"
            role="img"
            aria-label={
              kh
                ? "ខ្សែកោងនៃល្បឿនម៉ូលេគុលប្រើគំរូ Maxwell–Boltzmann"
                : "Bell-curve approximation of a Maxwell–Boltzmann molecular speed distribution"
            }
          >
            <svg viewBox="0 0 200 60" className="w-full h-12">
              <path
                d="M0,55 Q50,55 75,40 T100,12 T125,40 Q150,55 200,55"
                fill="none"
                stroke="rgb(110, 231, 183)"
                strokeWidth="2"
              />
              <line x1="0" y1="55" x2="200" y2="55" stroke="rgb(110, 231, 183)" strokeOpacity="0.4" />
              {/* Particle cluster dots beneath the curve */}
              {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy={50 - Math.abs(i - 4) * 2}
                  r="1.5"
                  fill="rgb(167, 243, 208)"
                  opacity={0.5 + (4 - Math.abs(i - 4)) * 0.1}
                />
              ))}
            </svg>
            <div className="text-[11px] text-emerald-200/85 mt-1 text-center">
              {t(
                "Molecular speeds (Maxwell–Boltzmann) → temperature you measure",
                "ល្បឿនម៉ូលេគុល (Maxwell–Boltzmann) → សីតុណ្ហភាពដែលអ្នកវាស់",
              )}
            </div>
          </div>
        </ChalkCard>

        {/* Card 6 — Electro & Surface Chemistry */}
        <ChalkCard
          title="Electro & Surface Chemistry"
          khTitle="គីមីអគ្គិសនី និងផ្ទៃមុខ"
          termEn="⚡ — Electrons & Interfaces"
          termKh="⚡ — អេឡិចត្រុង និងផ្ទៃអន្តរកម្ម"
          icon={BatteryCharging}
          accent="cyan"
        >
          <p>
            {t(
              "Electrochemistry: redox reactions, the Nernst equation, and electrons flowing through wires from one electrode to the other — the science of every battery and fuel cell.",
              "អេឡិចត្រូគីមី៖ ប្រតិកម្មអុកស៊ីដូ-រេឌុក សមីការ Nernst និងអេឡិចត្រុងហូរឆ្លងកាត់ខ្សែពីអេឡិចត្រូដមួយទៅមួយ — វិទ្យាសាស្ត្រនៃថ្ម និងកោសិកាឥន្ធនៈ។",
            )}
          </p>
          <p>
            {t(
              "Surface & Polymer Chemistry: the meeting line where two phases touch — surface tension, adsorption, and how long-chain molecules behave at interfaces.",
              "គីមីផ្ទៃ និងប៉ូលីមែរ៖ ខ្សែជួបនៃដំណាក់កាលពីរ — ភាពតានតឹងផ្ទៃ ការស្រូប និងរបៀបដែលម៉ូលេគុលខ្សែវែងមានឥរិយាបថនៅផ្ទៃអន្តរកម្ម។",
            )}
          </p>
          <div className="rounded-lg bg-cyan-950/40 border border-cyan-300/30 p-3 text-xs">
            <div className="font-bold text-cyan-200 mb-1">
              {t("Nernst equation:", "សមីការ Nernst៖")}
            </div>
            <div className="text-center my-1">
              <InlineMath math="E = E^\circ - \frac{RT}{nF}\,\ln Q" />
            </div>
            <div className="opacity-90">
              {t(
                "From a phone battery to a paint coating to a soap bubble — interfacial phenomena decide how the everyday world actually works.",
                "ចាប់ពីថ្មទូរស័ព្ទ ដល់ស្រទាប់ថ្នាំលាប ដល់ពពុះសាប៊ូ — បាតុភូតផ្ទៃអន្តរកម្មសម្រេចថាតើពិភពប្រចាំថ្ងៃដំណើរការដូចម្តេច។",
              )}
            </div>
          </div>
        </ChalkCard>
      </div>
    </Panel>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */
/*  Section 7 — Careers & Real-World Impact                                */
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
        en: "8. Careers & Impact",
        kh: "៨. អាជីព និងផលប៉ះពាល់",
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

/* ──────────────────────────────────────────────────────────────────────── */
/*  Reaction Orders sub-section (lives inside Section 5 · Macro)           */
/*    លំដាប់ប្រតិកម្ម៖ ល្បឿនកំណត់នៃគីមីសាស្ត្រ                                      */
/* ──────────────────────────────────────────────────────────────────────── */

type OrderAccent = "slate" | "sky" | "amber";

const ORDER_ACCENTS: Record<
  OrderAccent,
  {
    border: string;
    badge: string;
    badgeText: string;
    chipBg: string;
    chipText: string;
    glow: string;
    plot: string;
  }
> = {
  slate: {
    border: "border-slate-400/40",
    badge: "bg-slate-700/60 ring-1 ring-slate-300/40",
    badgeText: "text-slate-100",
    chipBg: "bg-slate-800/60",
    chipText: "text-slate-200",
    glow: "shadow-[0_0_24px_-6px_rgba(148,163,184,0.45)]",
    plot: "stroke-slate-200",
  },
  sky: {
    border: "border-sky-400/40",
    badge: "bg-sky-700/60 ring-1 ring-sky-300/40",
    badgeText: "text-sky-100",
    chipBg: "bg-sky-900/40",
    chipText: "text-sky-200",
    glow: "shadow-[0_0_24px_-6px_rgba(56,189,248,0.45)]",
    plot: "stroke-sky-200",
  },
  amber: {
    border: "border-amber-400/40",
    badge: "bg-amber-700/60 ring-1 ring-amber-300/40",
    badgeText: "text-amber-100",
    chipBg: "bg-amber-900/40",
    chipText: "text-amber-200",
    glow: "shadow-[0_0_24px_-6px_rgba(251,191,36,0.45)]",
    plot: "stroke-amber-200",
  },
};

/* Tiny chalk-style mini-graph of [A] vs t for each order. */
function OrderPlot({
  shape,
  className,
  label,
}: {
  shape: "linear-down" | "exp-decay" | "second-decay";
  className: string;
  label: string;
}) {
  const path =
    shape === "linear-down"
      ? "M 12 12 L 116 56"
      : shape === "exp-decay"
      ? "M 12 12 C 32 22, 56 46, 116 56"
      : "M 12 12 C 22 18, 30 50, 116 56";
  return (
    <svg
      viewBox="0 0 128 64"
      role="img"
      aria-label={label}
      className="w-full h-14"
    >
      {/* dashed axes */}
      <line x1="12" y1="56" x2="120" y2="56" className="stroke-emerald-100/30" strokeDasharray="2 3" strokeWidth="1" />
      <line x1="12" y1="8" x2="12" y2="56" className="stroke-emerald-100/30" strokeDasharray="2 3" strokeWidth="1" />
      {/* axis labels */}
      <text x="6" y="11" className="fill-emerald-100/60" fontSize="6" fontFamily="monospace">[A]</text>
      <text x="118" y="62" className="fill-emerald-100/60" fontSize="6" fontFamily="monospace">t</text>
      {/* curve */}
      <path d={path} fill="none" strokeWidth="2" className={className} strokeLinecap="round" />
    </svg>
  );
}

function OrderCard({
  n,
  accent,
  enTitle,
  khTitle,
  enExplain,
  khExplain,
  rateLaw,
  enHalf,
  khHalf,
  enGraph,
  khGraph,
  plotShape,
  plotLabelEn,
  plotLabelKh,
}: {
  n: 0 | 1 | 2;
  accent: OrderAccent;
  enTitle: string;
  khTitle: string;
  enExplain: string;
  khExplain: string;
  rateLaw: string;
  enHalf: string;
  khHalf: string;
  enGraph: string;
  khGraph: string;
  plotShape: "linear-down" | "exp-decay" | "second-decay";
  plotLabelEn: string;
  plotLabelKh: string;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  const a = ORDER_ACCENTS[accent];
  return (
    <article
      className={`relative rounded-2xl border ${a.border} bg-emerald-950/55 ring-1 ring-emerald-700/30 p-5 ${a.glow} flex flex-col`}
      data-testid={`order-card-${n}`}
    >
      {/* Header: numeric badge + bilingual title */}
      <header className="flex items-start gap-3 mb-3">
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-mono font-bold text-lg ${a.badge} ${a.badgeText}`}
          aria-hidden="true"
        >
          {n}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className={`font-bold text-white text-[15px] leading-tight ${kh ? "font-khmer" : ""}`}>
            {kh ? khTitle : enTitle}
          </h4>
          <p className={`text-[11px] mt-0.5 font-mono ${a.chipText} opacity-90`}>
            {kh ? enTitle : khTitle}
          </p>
        </div>
      </header>

      {/* Explanation */}
      <p className={`text-sm text-emerald-50/90 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {kh ? khExplain : enExplain}
      </p>

      {/* Rate Law */}
      <section className={`mt-3 rounded-lg ${a.chipBg} border border-emerald-700/40 p-3`}>
        <p className={`text-[10.5px] font-mono uppercase tracking-[0.2em] mb-1.5 ${a.chipText} ${kh ? "font-khmer normal-case tracking-normal text-[11.5px]" : ""}`}>
          {kh ? "ច្បាប់ល្បឿន" : "Rate Law"}
        </p>
        <div className="text-center bg-black/30 rounded-md py-2 px-2 overflow-x-auto" data-testid={`order-card-${n}-rate`}>
          <BlockMath math={rateLaw} />
        </div>
      </section>

      {/* Half-Life */}
      <section className={`mt-3 rounded-lg ${a.chipBg} border border-emerald-700/40 p-3`}>
        <p className={`text-[10.5px] font-mono uppercase tracking-[0.2em] mb-1.5 inline-flex items-center gap-1.5 ${a.chipText} ${kh ? "font-khmer normal-case tracking-normal text-[11.5px]" : ""}`}>
          <Timer className="w-3 h-3" aria-hidden="true" />
          {kh ? "ពាក់កណ្ដាលជីវិត" : "Half-Life"}
        </p>
        <p className={`text-sm text-emerald-50/90 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {kh ? khHalf : enHalf}
        </p>
      </section>

      {/* Graph Shape with mini-plot */}
      <section className={`mt-3 rounded-lg ${a.chipBg} border border-emerald-700/40 p-3 mt-auto`}>
        <p className={`text-[10.5px] font-mono uppercase tracking-[0.2em] mb-1.5 inline-flex items-center gap-1.5 ${a.chipText} ${kh ? "font-khmer normal-case tracking-normal text-[11.5px]" : ""}`}>
          <Activity className="w-3 h-3" aria-hidden="true" />
          {kh ? "រូបរាងក្រាហ្វ" : "Graph Shape"}
        </p>
        <div className="rounded-md bg-black/30 px-2 py-1.5 mb-2">
          <OrderPlot shape={plotShape} className={a.plot} label={kh ? plotLabelKh : plotLabelEn} />
        </div>
        <p className={`text-[12.5px] text-emerald-50/85 ${kh ? "font-khmer leading-loose" : "leading-snug"}`}>
          {kh ? khGraph : enGraph}
        </p>
      </section>
    </article>
  );
}

function ReactionOrders() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const orders = [
    {
      n: 0 as const,
      accent: "slate" as const,
      enTitle: "Zero-Order",
      khTitle: "លំដាប់សូន្យ",
      enExplain:
        "The rate is completely independent of the concentration. Adding more reactant does not speed it up.",
      khExplain:
        "ល្បឿនមិនអាស្រ័យលើកំហាប់ទាល់តែសោះ។ ការបន្ថែមសារធាតុប្រតិកម្មច្រើនទៀត មិនធ្វើឱ្យវាលឿនឡើងឡើយ។",
      rateLaw: "\\text{Rate} = k",
      enHalf: "Decreases as the concentration drops.",
      khHalf: "ថយចុះនៅពេលកំហាប់ធ្លាក់ចុះ។",
      enGraph: "A straight line sloping down ([A] vs. Time).",
      khGraph: "បន្ទាត់ត្រង់ទេរចុះ ([A] ធៀបនឹងពេលវេលា)។",
      plotShape: "linear-down" as const,
      plotLabelEn: "Zero-order: [A] decreases linearly with time.",
      plotLabelKh: "លំដាប់សូន្យ៖ [A] ធ្លាក់ចុះតាមបន្ទាត់ត្រង់។",
    },
    {
      n: 1 as const,
      accent: "sky" as const,
      enTitle: "First-Order",
      khTitle: "លំដាប់ទីមួយ",
      enExplain:
        "The rate depends linearly on one reactant. If you double the reactant, the rate doubles.",
      khExplain:
        "ល្បឿនអាស្រ័យតាមបន្ទាត់ត្រង់លើសារធាតុប្រតិកម្មមួយ។ បើអ្នកបង្កើនកំហាប់ទ្វេដង ល្បឿនក៏ទ្វេដងដែរ។",
      rateLaw: "\\text{Rate} = k[A]",
      enHalf:
        "Constant. It takes the exact same time to go from 100% to 50% as it does to go from 50% to 25%. Radioactive decay works this way.",
      khHalf:
        "ថេរ។ ត្រូវការពេលដូចគ្នាបេះបិទដើម្បីធ្លាក់ពី 100% ទៅ 50% ដូចពី 50% ទៅ 25%។ ការពុកផុយវិទ្យុសកម្មកើតឡើងបែបនេះ។",
      enGraph: "A curve that flattens out ([A] vs. Time), but a straight line for ln[A] vs. Time.",
      khGraph: "ខ្សែកោងដែលរលូនចេញ ([A] ធៀបនឹងពេលវេលា) ប៉ុន្តែបន្ទាត់ត្រង់សម្រាប់ ln[A] ធៀបនឹងពេលវេលា។",
      plotShape: "exp-decay" as const,
      plotLabelEn: "First-order: [A] decays exponentially.",
      plotLabelKh: "លំដាប់ទីមួយ៖ [A] ពុកផុយតាមអ៊ិចស្ប៉ូណង់ស្យែល។",
    },
    {
      n: 2 as const,
      accent: "amber" as const,
      enTitle: "Second-Order",
      khTitle: "លំដាប់ទីពីរ",
      enExplain:
        "The rate depends on the square of one reactant, or the product of two. Doubling the reactant quadruples the speed!",
      khExplain:
        "ល្បឿនអាស្រ័យលើការេនៃសារធាតុប្រតិកម្មមួយ ឬផលគុណនៃពីរ។ ការទ្វេដងសារធាតុ បង្កើនល្បឿនបួនដង!",
      rateLaw: "\\text{Rate} = k[A]^{2}",
      enHalf:
        "Increases as the concentration drops. The reaction slows down drastically over time.",
      khHalf:
        "កើនឡើងនៅពេលកំហាប់ធ្លាក់ចុះ។ ប្រតិកម្មនឹងយឺតយ៉ាងខ្លាំងតាមពេលវេលា។",
      enGraph:
        "A steep curve ([A] vs. Time), but a straight line for 1/[A] vs. Time.",
      khGraph:
        "ខ្សែកោងចោតខ្លាំង ([A] ធៀបនឹងពេលវេលា) ប៉ុន្តែបន្ទាត់ត្រង់សម្រាប់ 1/[A] ធៀបនឹងពេលវេលា។",
      plotShape: "second-decay" as const,
      plotLabelEn: "Second-order: [A] drops fast, then crawls.",
      plotLabelKh: "លំដាប់ទីពីរ៖ [A] ធ្លាក់លឿន រួចវារយឺត។",
    },
  ];

  return (
    <section
      className="mt-7 rounded-2xl border border-emerald-700/40 bg-emerald-950/40 p-5 sm:p-6"
      data-testid="reaction-orders"
      aria-labelledby="reaction-orders-heading"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-rose-800/60 text-rose-100 ring-1 ring-rose-300/30 flex-shrink-0"
          aria-hidden="true"
        >
          <Gauge className="w-5 h-5" />
        </span>
        <div className="min-w-0">
          <p className={`text-[10px] font-mono uppercase tracking-[0.22em] text-rose-200/80 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-[11.5px]" : ""}`}>
            {kh ? "ការសិក្សាស៊ីជម្រៅគីនេទិច" : "Kinetics deep-dive"}
          </p>
          <h3
            id="reaction-orders-heading"
            className={`font-bold text-white text-lg sm:text-xl leading-tight ${kh ? "font-khmer" : ""}`}
            style={{ textShadow: "0 0 10px rgba(255,255,255,0.10)" }}
          >
            {kh
              ? "លំដាប់ប្រតិកម្ម៖ ល្បឿនកំណត់នៃគីមីសាស្ត្រ"
              : "Reaction Orders: The Speed Limit of Chemistry"}
          </h3>
          <p className={`text-[12px] text-emerald-100/70 mt-0.5 ${kh ? "font-khmer" : "font-mono"}`}>
            {kh
              ? "Reaction Orders: The Speed Limit of Chemistry"
              : "លំដាប់ប្រតិកម្ម៖ ល្បឿនកំណត់នៃគីមីសាស្ត្រ"}
          </p>
        </div>
      </div>

      {/* Intro */}
      <p
        className={`text-sm text-emerald-50/85 max-w-3xl mb-5 ${kh ? "font-khmer leading-loose" : "leading-relaxed"}`}
        data-testid="reaction-orders-intro"
      >
        {t(
          "A reaction order tells us exactly how the concentration of our ingredients affects the speed of the reaction. Sometimes adding more chemicals speeds things up, and sometimes it does nothing at all.",
          "លំដាប់ប្រតិកម្មប្រាប់យើងយ៉ាងច្បាស់ថា កំហាប់នៃគ្រឿងផ្សំរបស់យើងប៉ះពាល់ដល់ល្បឿននៃប្រតិកម្មយ៉ាងណា។ ពេលខ្លះការបន្ថែមសារធាតុគីមីច្រើនធ្វើឱ្យវាលឿនឡើង ហើយពេលខ្លះវាមិនធ្វើអ្វីសោះ។",
        )}
      </p>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="reaction-orders-grid">
        {orders.map((o) => (
          <OrderCard key={o.n} {...o} />
        ))}
      </div>
    </section>
  );
}

export default PhysicalChemistry101Page;
