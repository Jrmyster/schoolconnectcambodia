import { Link } from "wouter";
import {
  ArrowLeft,
  Zap,
  Magnet,
  BookOpen,
  Lightbulb,
  Quote,
  Cog,
  Plug,
  HeartPulse,
  Sparkles,
  Info,
  CircleDot,
} from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  SCI-XX · Electromagnetism: The Power of Fields
//           អគ្គិសនីម៉ាញ៉េទិច៖ ថាមពលនៃដែន
//
//  1. Michael Faraday — The Father of Induction
//  2. Gauss's Law — The Invisible Net (with KaTeX)
//  3. Applications: Motors, Transformers, MRI
//
//  Aesthetic: Scientific Lab — clean off-white, slate text,
//  indigo+amber accents, blueprint grid, vector field diagrams.
// ════════════════════════════════════════════════════════════════════════════

export default function ElectromagnetismPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ── Header / Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white border-b-4 border-amber-500/60">
        <LabGrid />
        {/* Faint field-line glow */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(ellipse 60% 80% at 20% 50%, rgba(245,158,11,0.25), transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/5 border border-amber-400/40 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-amber-300">
            <Zap className="w-3.5 h-3.5" />
            SCIENCE · Electromagnetism
          </div>

          <h1 className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh
              ? "អគ្គិសនីម៉ាញ៉េទិច៖ ថាមពលនៃដែន"
              : <>Electromagnetism — <span className="text-amber-400">The Power of Fields</span></>}
          </h1>
          <p className={`mt-4 max-w-2xl text-slate-300 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "សញ្ញាមេដែក និងសញ្ញាអគ្គិសនី គឺមិនមែនជាពីររឿងផ្សេងគ្នាទេ — ពួកវាគឺជាមុខពីរនៃកម្លាំងតែមួយ។ ដែនអរូបិយនេះ បំភ្លឺផ្ទះរបស់អ្នក បង្វិលឡានរបស់អ្នក ហើយលាតដូចគេមើលឃើញខាងក្នុងខ្លួនមនុស្ស។"
              : "Magnets and electricity are not two different things — they are two faces of one force. The invisible field they share lights your home, spins your car, and lets us peek inside the human body."}
          </p>
        </div>
      </header>

      {/* ── Section 1: Faraday ────────────────────────────────────────── */}
      <Section
        spec="01"
        Icon={BookOpen}
        eyebrowEn="Michael Faraday — The Father of Induction"
        eyebrowKh="ម៉ៃឃើល ហ្វារ៉ាដេយ — បិតានៃការបណ្ដាល"
        titleEn="A bookbinder's apprentice who turned motion into light"
        titleKh="សិស្សហ្វឹកហាត់រៀបសៀវភៅ ដែលប្ដូរចលនាឱ្យទៅជាពន្លឺ"
        descEn="Faraday left school at 13 and learned physics by reading every book that crossed his bookbinding bench. With almost no math, he ran the experiment that powers our entire civilization."
        descKh="ហ្វារ៉ាដេយចេញពីសាលានៅអាយុ ១៣ ឆ្នាំ ហើយរៀនរូបវិទ្យាដោយអានរាល់សៀវភៅដែលឆ្លងកាត់តុរៀបសៀវភៅរបស់គាត់។ ស្ទើរតែគ្មានគណិតវិទ្យាសោះ គាត់បានធ្វើពិសោធន៍ដែលផ្តល់ថាមពលដល់អរិយធម៌ទាំងមូលរបស់យើង។"
        isKh={isKh}
      >
        <FaradayProfile isKh={isKh} />
        <InductionDiagram isKh={isKh} />
        <BilingualQuote isKh={isKh} />
      </Section>

      {/* ── Section 2: Gauss's Law ────────────────────────────────────── */}
      <Section
        spec="02"
        Icon={CircleDot}
        eyebrowEn="Gauss's Law — The Invisible Net"
        eyebrowKh="ច្បាប់ហ្គោស — សំណាញ់អរូបិយ"
        titleEn="Counting the field lines that flow out of a charge"
        titleKh="ការរាប់ខ្សែដែនដែលហូរចេញពីបន្ទុក"
        descEn="If you could throw a fishing net around an electric charge and count the invisible 'water' flowing out through the mesh, you would know exactly how strong the charge is. That is Gauss's Law in one sentence."
        descKh="ប្រសិនបើអ្នកអាចបោះសំណាញ់ត្រីពទ្ធជុំវិញបន្ទុកអគ្គិសនីមួយ ហើយរាប់ 'ទឹក' អរូបិយដែលហូរចេញតាមភ្នែកសំណាញ់ អ្នកនឹងដឹងច្បាស់ថាបន្ទុកនោះខ្លាំងប៉ុនណា។ នេះហើយគឺច្បាប់ហ្គោសក្នុងប្រយោគមួយ។"
        isKh={isKh}
      >
        <GaussNet isKh={isKh} />
        <GaussFormula isKh={isKh} />
      </Section>

      {/* ── Section 3: Applications ───────────────────────────────────── */}
      <Section
        spec="03"
        Icon={Cog}
        eyebrowEn="Applications"
        eyebrowKh="ការអនុវត្តជាក់ស្តែង"
        titleEn="From a coil of wire to your daily life"
        titleKh="ពីរង្វិលខ្សែភ្លើង ទៅជីវភាពប្រចាំថ្ងៃ"
        descEn="Once we understood that electricity and magnetism could swap into each other, we started building machines that exploit the trade in every direction."
        descKh="នៅពេលយើងយល់ថាអគ្គិសនី និងម៉ាញ៉េទិច អាចបំលែងគ្នាទៅវិញទៅមកបាន យើងចាប់ផ្ដើមសាងសង់ម៉ាស៊ីនដែលប្រើប្រាស់ការផ្លាស់ប្តូរនោះគ្រប់ទិសដៅ។"
        isKh={isKh}
      >
        <ApplicationsGrid isKh={isKh} />
      </Section>

      {/* ── Footer breadcrumb ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 text-sm ${isKh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec, Icon, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  spec: string;
  Icon: React.ComponentType<{ className?: string }>;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-indigo-950 text-amber-300 rounded-sm px-2.5 py-0.5 border border-amber-500/40">
          SEC-{spec}
        </span>
        <Icon className="w-5 h-5 text-indigo-700" />
        <span className={`text-xs font-bold uppercase tracking-widest text-indigo-900 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-slate-600 text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · Faraday Profile + Induction Diagram + Quote
// ════════════════════════════════════════════════════════════════════════════

function FaradayProfile({ isKh }: { isKh: boolean }) {
  const facts = [
    {
      labelEn: "Born", labelKh: "ឆ្នាំកំណើត",
      valueEn: "1791, London", valueKh: "១៧៩១ ទីក្រុងឡុងដ៍",
    },
    {
      labelEn: "School", labelKh: "ការសិក្សា",
      valueEn: "Self-taught from age 13", valueKh: "រៀនដោយខ្លួនឯងពីអាយុ ១៣",
    },
    {
      labelEn: "Big idea", labelKh: "គំនិតធំ",
      valueEn: "Electromagnetic Induction (1831)",
      valueKh: "ការបណ្ដាលអគ្គិសនីម៉ាញ៉េទិច (១៨៣១)",
    },
    {
      labelEn: "Math used", labelKh: "គណិតវិទ្យាប្រើ",
      valueEn: "Almost none — pure intuition",
      valueKh: "ស្ទើរតែគ្មាន — វិចារណញ្ញាណសុទ្ធ",
    },
  ];

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Portrait card */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-amber-400/15 border-2 border-amber-400/60 flex items-center justify-center mb-3">
            <span className="font-display font-extrabold text-amber-300 text-3xl tracking-tight">MF</span>
          </div>
          <h3 className={`font-display font-bold text-xl ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ម៉ៃឃើល ហ្វារ៉ាដេយ" : "Michael Faraday"}
          </h3>
          <div className={`text-xs text-slate-300 mt-1 ${isKh ? "font-sans" : "font-khmer"}`}>
            {isKh ? "Michael Faraday" : "ម៉ៃឃើល ហ្វារ៉ាដេយ"}
          </div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-300 mt-3">
            1791 — 1867
          </div>
          <div className={`mt-4 text-[11px] px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-200 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ស្វ័យអប់រំ" : "Self-taught"}
          </div>
        </div>

        {/* Body */}
        <div className="md:col-span-2 p-6">
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ហ្វារ៉ាដេយបានលុបចោលរវាងពិភពមេដែក និងពិភពអគ្គិសនី។ មុនគាត់ វិទ្យាសាស្ត្រមើលឃើញវាជាពីររឿងផ្សេងគ្នា — បន្ទាប់ពីគាត់ យើងដឹងថាវាគ្រាន់តែជាមុខពីរនៃកម្លាំងតែមួយ។ ការរកឃើញរបស់គាត់ ក្នុងឆ្នាំ ១៨៣១ ហៅថា ការបណ្ដាលអគ្គិសនីម៉ាញ៉េទិច (Electromagnetic Induction)។"
              : "Faraday erased the wall between the world of magnets and the world of electricity. Before him, science treated them as two unrelated things — after him, we knew they were just two faces of one force. His 1831 discovery is called Electromagnetic Induction."}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {facts.map((f) => (
              <div key={f.labelEn} className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                <dt className={`text-[10px] font-mono uppercase tracking-widest text-indigo-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                  {isKh ? f.labelKh : f.labelEn}
                </dt>
                <dd className={`text-slate-800 font-semibold mt-0.5 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? f.valueKh : f.valueEn}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function InductionDiagram({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6">
      <div className="flex items-start gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <div className={`font-display font-bold text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ការពិសោធន៍ដ៏សាមញ្ញដែលបានផ្លាស់ប្តូរពិភពលោក" : "The simple experiment that changed the world"}
          </div>
          <div className={`text-xs text-slate-500 ${isKh ? "font-sans" : "font-khmer"}`}>
            {isKh ? "The simple experiment that changed the world" : "ការពិសោធន៍ដ៏សាមញ្ញដែលបានផ្លាស់ប្តូរពិភពលោក"}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-slate-950 p-4 sm:p-6">
        <svg viewBox="0 0 600 240" className="w-full h-auto" aria-hidden>
          <defs>
            <linearGradient id="magGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#dc2626" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
            <marker id="arrEM" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
            </marker>
          </defs>

          {/* Coil — drawn as overlapping ellipses to look like a solenoid */}
          <g transform="translate(360,120)">
            {[-60, -40, -20, 0, 20, 40, 60].map((x) => (
              <ellipse key={x} cx={x} cy="0" rx="14" ry="44" fill="none" stroke="#e2e8f0" strokeWidth="2" />
            ))}
            {/* Wire to bulb */}
            <path d="M 70 -30 L 130 -30 L 130 -70" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 70 30 L 100 30 L 100 -70" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            {/* Bulb */}
            <circle cx="115" cy="-80" r="14" fill="#fde68a" stroke="#f59e0b" strokeWidth="2">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <line x1="105" y1="-80" x2="125" y2="-80" stroke="#b45309" strokeWidth="1.5" />
            {/* Bulb glow */}
            <circle cx="115" cy="-80" r="22" fill="#fde68a" opacity="0.25">
              <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Magnet (sliding into coil) */}
          <g>
            <rect x="120" y="100" width="120" height="40" rx="3" fill="url(#magGrad)" stroke="#0f172a" strokeWidth="1.5" />
            <text x="145" y="125" textAnchor="middle" fontSize="14" fontFamily="monospace" fill="#fff" fontWeight="700">N</text>
            <text x="215" y="125" textAnchor="middle" fontSize="14" fontFamily="monospace" fill="#fff" fontWeight="700">S</text>
            {/* Motion arrow */}
            <path d="M 250 120 L 320 120" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrEM)">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
            </path>
            <text x="285" y="105" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#fbbf24" fontWeight="700">MOTION</text>
          </g>

          {/* Field lines from magnet */}
          {[80, 100, 140, 160].map((y) => (
            <path
              key={y}
              d={`M 240 ${y} Q 300 ${y - 30} 360 ${y - 10}`}
              stroke="#60a5fa" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="3 3"
            />
          ))}

          {/* Labels */}
          <text x="180" y="180" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#94a3b8">MAGNET</text>
          <text x="430" y="180" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#94a3b8">COIL OF WIRE</text>
          <text x="475" y="40" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#fbbf24">⚡ INDUCED CURRENT</text>
        </svg>
      </div>

      <ol className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        {[
          { en: "Move a magnet through a coil of wire.", kh: "ផ្លាស់ទីមេដែកឆ្លងកាត់រង្វិលខ្សែភ្លើង។" },
          { en: "The changing magnetic field pushes electrons in the wire.", kh: "ដែនមេដែកដែលផ្លាស់ប្តូរ រុញអេឡិចត្រុងក្នុងខ្សែភ្លើង។" },
          { en: "Electricity flows. The bulb lights up — from motion alone.", kh: "អគ្គិសនីហូរ។ អំពូលភ្លឺ — តែពីចលនាប៉ុណ្ណោះ។" },
        ].map((step, i) => (
          <li key={i} className="rounded-lg bg-indigo-50 border border-indigo-200 p-3">
            <div className="font-mono text-[10px] text-indigo-700 mb-1">STEP {i + 1}</div>
            <div className={`text-slate-700 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? step.kh : step.en}
            </div>
          </li>
        ))}
      </ol>

      <div className={`mt-4 text-xs text-slate-600 flex items-start gap-2 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <p>
          {isKh
            ? "ស្ទើរតែគ្រប់រោងចក្រអគ្គិសនីនៅលើពិភពលោកសព្វថ្ងៃ — រោងចក្រធ្យូងថ្ម ហ្គាស ខ្យល់ ទឹក និងនុយក្លេអ៊ែរ — ប្រើ​គ្រាន់តែជារឿងតែមួយ៖ បង្វិលមេដែកធំៗឆ្លងកាត់រង្វិលភ្លើងធំៗ។ ហ្វារ៉ាដេយចាប់ផ្ដើមវាទាំងអស់។"
            : "Almost every power plant in the world today — coal, gas, wind, hydro, nuclear — does just one thing: spin huge magnets through huge coils of wire. Faraday started it all."}
        </p>
      </div>
    </div>
  );
}

function BilingualQuote({ isKh: _isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 border-l-4 border-amber-500 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Quote className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
        <div className="space-y-2">
          <p className="font-display font-bold text-lg sm:text-xl text-amber-900 leading-snug italic">
            "Faraday's discovery turned motion into light."
          </p>
          <p className="font-khmer text-base sm:text-lg text-amber-900 leading-loose">
            «ការរកឃើញរបស់ហ្វារ៉ាដេយ បានផ្លាស់ប្តូរចលនាឱ្យទៅជាពន្លឺ។»
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · Gauss's Law — Net diagram + Formula
// ════════════════════════════════════════════════════════════════════════════

function GaussNet({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Diagram */}
        <div className="rounded-xl bg-slate-950 p-4">
          <svg viewBox="0 0 360 320" className="w-full h-auto" aria-hidden>
            <defs>
              <radialGradient id="chargeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#fde68a" stopOpacity="0.7" />
                <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
              </radialGradient>
              <marker id="arrG" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
              </marker>
            </defs>

            {/* The "fishing net" — Gaussian sphere */}
            <circle cx="180" cy="160" r="120" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 4" />
            {/* Mesh */}
            {[0, 30, 60, 90, 120, 150].map((a) => {
              const rad = (a * Math.PI) / 180;
              const x1 = 180 + 120 * Math.cos(rad);
              const y1 = 160 + 120 * Math.sin(rad);
              const x2 = 180 - 120 * Math.cos(rad);
              const y2 = 160 - 120 * Math.sin(rad);
              return <line key={`m1-${a}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0e7490" strokeWidth="0.5" opacity="0.7" />;
            })}
            {[40, 70, 100, 130].map((r) => (
              <ellipse key={r} cx="180" cy="160" rx="120" ry={r} fill="none" stroke="#0e7490" strokeWidth="0.5" opacity="0.5" />
            ))}

            {/* Glow */}
            <circle cx="180" cy="160" r="60" fill="url(#chargeGlow)" />
            {/* Central charge */}
            <circle cx="180" cy="160" r="14" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
            <text x="180" y="165" textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="700" fill="#7c2d12">+Q</text>

            {/* Field lines (E) radiating outward through the net */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 30 * Math.PI) / 180;
              const x1 = 180 + 18 * Math.cos(a);
              const y1 = 160 + 18 * Math.sin(a);
              const x2 = 180 + 145 * Math.cos(a);
              const y2 = 160 + 145 * Math.sin(a);
              return (
                <line
                  key={`e-${i}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#fbbf24" strokeWidth="1.5"
                  markerEnd="url(#arrG)"
                  opacity="0.85"
                />
              );
            })}

            {/* Labels */}
            <text x="180" y="20" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#22d3ee">GAUSSIAN SURFACE (THE NET)</text>
            <text x="180" y="305" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#fbbf24">⚡ ELECTRIC FIELD LINES (THE FLUX)</text>
          </svg>
        </div>

        {/* Analogy text */}
        <div className="space-y-4">
          <div>
            <div className={`text-[10px] font-mono uppercase tracking-widest text-cyan-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
              {isKh ? "ការប្រៀបធៀប" : "The analogy"}
            </div>
            <h3 className={`font-display font-bold text-xl text-slate-900 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "សំណាញ់ត្រី និងទឹកអរូបិយ" : "A fishing net and invisible water"}
            </h3>
          </div>
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ស្រមៃថាបន្ទុកអគ្គិសនី ហូរ 'ទឹកអរូបិយ' (ដែនអគ្គិសនី) ចេញគ្រប់ទិសដៅ។ ឥឡូវនេះ បោះសំណាញ់ត្រី (ឈ្មោះវិទ្យាសាស្ត្រ៖ ផ្ទៃហ្គោស) ពទ្ធជុំវិញបន្ទុកនោះ។"
              : "Imagine an electric charge pours 'invisible water' (the electric field) outward in every direction. Now throw a fishing net (its scientific name: a Gaussian surface) all the way around the charge."}
          </p>
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "បរិមាណ 'ទឹក' សរុបដែលហូរចេញតាមសំណាញ់ មានឈ្មោះវិទ្យាសាស្ត្រថា 'ភ្លុចអគ្គិសនី' (electric flux)។ ហ្គោសបានបង្ហាញថា វាគ្រាន់តែស្មើនឹងបន្ទុកដែលនៅក្នុងសំណាញ់ ចែកនឹងថេរធម្មជាតិមួយ។ មិនច្រើនមិនតិចជាងនេះទេ។"
              : "The total amount of 'water' flowing out through the net is called the electric flux. Gauss showed it is exactly equal to the charge inside the net divided by one constant of nature. Not a drop more, not a drop less."}
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-lg bg-cyan-50 border border-cyan-200 px-3 py-2 text-center">
              <div className="font-mono text-[10px] text-cyan-700">NET</div>
              <div className={`text-cyan-900 font-semibold ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ផ្ទៃហ្គោស" : "Surface"}
              </div>
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-center">
              <div className="font-mono text-[10px] text-amber-700">WATER</div>
              <div className={`text-amber-900 font-semibold ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ភ្លុច E·dA" : "Flux E·dA"}
              </div>
            </div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-center">
              <div className="font-mono text-[10px] text-rose-700">SOURCE</div>
              <div className={`text-rose-900 font-semibold ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "បន្ទុក Q" : "Charge Q"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GaussFormula({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-slate-950 text-white border-2 border-amber-500/40 p-5 sm:p-7 overflow-hidden relative">
      <LabGrid muted />

      <div className="relative">
        <div className={`text-[10px] font-mono uppercase tracking-widest text-amber-300 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ច្បាប់ហ្គោស សម្រាប់អគ្គិសនី" : "Gauss's Law for Electricity"}
        </div>
        <h3 className={`font-display font-bold text-xl mb-4 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "សមីការក្នុងភាសាគណិតវិទ្យា" : "The equation in mathematical language"}
        </h3>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 sm:p-6 my-3 overflow-x-auto">
          <div className="text-white text-2xl sm:text-3xl text-center">
            <BlockMath math={String.raw`\oint \mathbf{E} \cdot d\mathbf{A} \;=\; \dfrac{Q_{\mathrm{enc}}}{\varepsilon_0}`} />
          </div>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mt-5">
          <SymRow
            sym={String.raw`\oint \mathbf{E} \cdot d\mathbf{A}`}
            en="Total electric flux through the closed surface — every field line poking through the net, summed."
            kh="ភ្លុចអគ្គិសនីសរុបឆ្លងផ្ទៃបិទ — រាល់ខ្សែដែនដែលឆ្លងសំណាញ់ បូករួមបញ្ចូលគ្នា។"
            isKh={isKh}
          />
          <SymRow
            sym={String.raw`Q_{\mathrm{enc}}`}
            en="The total charge enclosed inside the surface."
            kh="បន្ទុកសរុបដែលនៅក្នុងផ្ទៃ។"
            isKh={isKh}
          />
          <SymRow
            sym={String.raw`\varepsilon_0`}
            en="Permittivity of free space — a constant of nature, ≈ 8.854 × 10⁻¹² F/m."
            kh="ភេមីតិវីតេនៃលំហទទេ — ថេរធម្មជាតិ ≈ ៨.៨៥៤ × ១០⁻¹² F/m។"
            isKh={isKh}
          />
          <SymRow
            sym={String.raw`\mathbf{E}`}
            en="The electric field on the surface — the answer we usually want."
            kh="ដែនអគ្គិសនីលើផ្ទៃ — ចម្លើយដែលយើងចង់បានជាធម្មតា។"
            isKh={isKh}
          />
        </dl>

        <div className={`mt-5 rounded-xl bg-amber-500/10 border border-amber-500/40 p-4 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <span className="font-display font-bold text-amber-300">
            {isKh ? "ចំណុចសំខាន់៖ " : "The punch line: "}
          </span>
          <span className="text-slate-200">
            {isKh
              ? "ប្រសិនបើអ្នកស្គាល់បន្ទុក "
              : "If you know the charge "}
          </span>
          <span className="inline-block align-middle"><InlineMath math="Q" /></span>
          <span className="text-slate-200">
            {isKh
              ? " នៅក្នុងសំណាញ់ អ្នកអាចគណនាដែនអគ្គិសនី "
              : " inside the net, you can perfectly calculate the electric field "}
          </span>
          <span className="inline-block align-middle"><InlineMath math="\mathbf{E}" /></span>
          <span className="text-slate-200">
            {isKh
              ? " លើផ្ទៃនៃសំណាញ់នោះបានយ៉ាងពិតប្រាកដ។"
              : " on the surface of the net."}
          </span>
        </div>
      </div>
    </div>
  );
}

function SymRow({ sym, en, kh, isKh }: { sym: string; en: string; kh: string; isKh: boolean }) {
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 p-3 flex items-start gap-3">
      <div className="flex-shrink-0 min-w-[60px] text-amber-300 text-lg">
        <InlineMath math={sym} />
      </div>
      <dd className={`text-slate-300 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? kh : en}
      </dd>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · Applications
// ════════════════════════════════════════════════════════════════════════════

type App = {
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  nameEn: string;
  nameKh: string;
  taglineEn: string;
  taglineKh: string;
  bodyEn: string;
  bodyKh: string;
  exampleEn: string;
  exampleKh: string;
  tone: { from: string; to: string; chip: string; ring: string };
};

const APPS: App[] = [
  {
    id: "motors",
    Icon: Cog,
    nameEn: "Electric Motors",
    nameKh: "ម៉ូទ័រអគ្គិសនី",
    taglineEn: "Turning electricity back into motion.",
    taglineKh: "ប្រែប្រួលអគ្គិសនីត្រលប់ទៅជាចលនា។",
    bodyEn: "Faraday's experiment in reverse: push electricity through a coil placed inside a magnetic field, and the coil spins. Every fan, every electric scooter in Phnom Penh, every washing machine drum is one of these.",
    bodyKh: "ការពិសោធន៍របស់ហ្វារ៉ាដេយដាក់ច្រាស៖ រុញអគ្គិសនីឆ្លងរង្វិលដែលដាក់ក្នុងដែនមេដែក នោះរង្វិលនឹងវិល។ កង្ហារនីមួយៗ ម៉ូតូអគ្គិសនីនៅភ្នំពេញ ផតបោកគក់ — សុទ្ធតែជានេះ។",
    exampleEn: "Tuk-tuk, EV, blender, drone propeller.",
    exampleKh: "តុក-តុក រថយន្តអគ្គិសនី ម៉ាស៊ីនកិន ឧបករណ៍ហោះ។",
    tone: { from: "from-indigo-600", to: "to-indigo-700", chip: "text-indigo-700", ring: "ring-indigo-200" },
  },
  {
    id: "transformers",
    Icon: Plug,
    nameEn: "Transformers",
    nameKh: "បំលែងតង់ស្យុង",
    taglineEn: "Changing the 'pressure' of electricity to travel across the country.",
    taglineKh: "ប្តូរ 'សម្ពាធ' អគ្គិសនីដើម្បីធ្វើដំណើរទូទាំងប្រទេស។",
    bodyEn: "Two coils of wire share one magnetic field. Spin lots of turns on one side and few on the other, and you can step voltage up to 500,000 V to travel hundreds of kilometres on a thin wire — then step it back down to 220 V at your house.",
    bodyKh: "រង្វិលខ្សែភ្លើងពីរ ចែករំលែកដែនមេដែកតែមួយ។ ដាក់រង្វិលច្រើននៅខាងមួយ និងតិចនៅខាងមួយ អ្នកអាចបង្កើនតង់ស្យុងដល់ ៥០០.០០០ V ដើម្បីធ្វើដំណើររាប់រយគីឡូម៉ែត្រលើខ្សែស្តើង — រួចបន្ថយវិញមកត្រឹម ២២០ V នៅផ្ទះអ្នក។",
    exampleEn: "Power lines, phone chargers, doorbells.",
    exampleKh: "ខ្សែបណ្ដាញអគ្គិសនី ឧបករណ៍សាកថ្ម កណ្ដឹងទ្វារ។",
    tone: { from: "from-amber-600", to: "to-amber-700", chip: "text-amber-700", ring: "ring-amber-200" },
  },
  {
    id: "mri",
    Icon: HeartPulse,
    nameEn: "MRI Machines",
    nameKh: "ម៉ាស៊ីន MRI",
    taglineEn: "Using magnetic fields to see inside the human body.",
    taglineKh: "ប្រើដែនមេដែកដើម្បីមើលខាងក្នុងរូបកាយមនុស្ស។",
    bodyEn: "An MRI surrounds you with a magnetic field 60,000× stronger than Earth's. The hydrogen atoms in your body line up like tiny compass needles — then a radio pulse knocks them sideways, and the way they snap back paints a picture of every soft tissue, with no X-rays at all.",
    bodyKh: "MRI ពទ្ធជុំវិញអ្នកដោយដែនមេដែកខ្លាំងជាងផែនដី ៦០.០០០ ដង។ អាតូមអ៊ីដ្រូសែនក្នុងរូបកាយរបស់អ្នក តម្រឹមដូចម្ជុលត្រីវិស័យតូចៗ — បន្ទាប់មកជីពចរវិទ្យុ វាយវាទៅចំហៀង ហើយវិធីដែលវាខ្ទាស់ត្រលប់មកវិញ គូររូបភាពនៃជាលិកាទន់ ដោយគ្មានកាំរស្មីអ៊ិច។",
    exampleEn: "Brain scans, joint injuries, tumour detection.",
    exampleKh: "ស្កេនខួរក្បាល របួសសន្លាក់ ការរកឃើញដុំសាច់។",
    tone: { from: "from-rose-600", to: "to-rose-700", chip: "text-rose-700", ring: "ring-rose-200" },
  },
];

function ApplicationsGrid({ isKh }: { isKh: boolean }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {APPS.map((a) => (
          <div
            key={a.id}
            className={`rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden ring-1 ${a.tone.ring}`}
            data-testid={`app-${a.id}`}
          >
            <div className={`bg-gradient-to-br ${a.tone.from} ${a.tone.to} text-white p-4 flex items-center gap-3`}>
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <a.Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className={`font-display font-bold text-lg leading-tight ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? a.nameKh : a.nameEn}
                </div>
                <div className={`text-[11px] opacity-90 ${isKh ? "font-sans" : "font-khmer"}`}>
                  {isKh ? a.nameEn : a.nameKh}
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className={`text-sm font-semibold text-slate-900 ${isKh ? "font-khmer leading-loose" : "leading-snug"}`}>
                {isKh ? a.taglineKh : a.taglineEn}
              </div>
              <p className={`text-xs text-slate-600 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh ? a.bodyKh : a.bodyEn}
              </p>
              <div className={`text-[11px] font-mono pt-3 border-t border-dashed border-slate-200 ${a.tone.chip} ${isKh ? "font-khmer" : ""}`}>
                ▸ {isKh ? a.exampleKh : a.exampleEn}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Closing thought */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-amber-50 border border-slate-200 p-5 sm:p-6 mt-2">
        <div className="flex items-start gap-3 max-w-3xl">
          <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <span className="font-display font-bold text-slate-900">
              {isKh ? "ដែនមួយ ប្រើបានច្រើនរបៀប។ " : "One field, many uses. "}
            </span>
            {isKh
              ? "មេដែករបស់ម៉ាស៊ីនបោកគក់ មេដែករបស់ម៉ាស៊ីន MRI និងមេដែករបស់រោងចក្រអគ្គិសនី — ទាំងអស់គឺជាគំនិតតែមួយរបស់ហ្វារ៉ាដេយ និងហ្គោស ដែលត្រូវបានពង្រីកទៅខ្នាតផ្សេងៗគ្នា។"
              : "The magnet in a washing machine, the magnet in an MRI scanner, and the magnet in a power plant are all the same idea from Faraday and Gauss — just scaled to different sizes."}
          </p>
        </div>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative lab-grid (used in hero + formula card)
// ════════════════════════════════════════════════════════════════════════════

function LabGrid({ muted = false }: { muted?: boolean }) {
  const stroke = muted ? "#fbbf24" : "#cbd5e1";
  const strokeAlt = muted ? "#22d3ee" : "#a5b4fc";
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${muted ? "opacity-[0.06]" : "opacity-[0.18]"}`}
      aria-hidden
    >
      <defs>
        <pattern id="lab-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke={stroke} strokeWidth="0.5" />
        </pattern>
        <pattern id="lab-grid-major" width="160" height="160" patternUnits="userSpaceOnUse">
          <path d="M 160 0 L 0 0 0 160" fill="none" stroke={strokeAlt} strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lab-grid)" />
      <rect width="100%" height="100%" fill="url(#lab-grid-major)" />
    </svg>
  );
}

// Silence "unused" warnings for icons reserved for future expansion
void Magnet;
