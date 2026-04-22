import { Link } from "wouter";
import {
  ArrowLeft,
  Atom,
  Camera,
  Sigma,
  Info,
  Sparkles,
  ScaleIcon,
  Move3d,
  Gauge,
  CircleDot,
} from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  CHEM-09 · The Heisenberg Uncertainty Principle: The Blurry Universe
//            គោលការណ៍ភាពមិនប្រាកដប្រជារបស់ហៃសិនបឺគ
//
//  1. The Camera Analogy
//  2. The Mathematical Limit  (KaTeX)
//  3. Why we don't see this in daily life
//
//  Aesthetic: Quantum dark — black/indigo background with neon green
//  electron-cloud accents and cyan wave glow.
// ════════════════════════════════════════════════════════════════════════════

const NEON = "#22ffaa";
const CYAN = "#22d3ee";

export default function HeisenbergPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── Header / Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-black via-slate-950 to-indigo-950 border-b-2 border-emerald-400/40">
        <ElectronCloudBg />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-slate-400 hover:text-emerald-300 text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-emerald-400/5 border border-emerald-400/40 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-emerald-300">
            <Atom className="w-3.5 h-3.5" />
            CHEM-09 · QUANTUM UNCERTAINTY
          </div>

          <h1
            className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl ${isKh ? "font-khmer leading-snug" : ""}`}
            style={{ textShadow: `0 0 24px ${NEON}33` }}
          >
            {isKh ? (
              "គោលការណ៍ភាពមិនប្រាកដប្រជារបស់ហៃសិនបឺគ — សកលលោកមិនច្បាស់"
            ) : (
              <>
                The Heisenberg Uncertainty Principle —{" "}
                <span className="text-emerald-300">The Blurry Universe</span>
              </>
            )}
          </h1>

          <p className={`mt-4 max-w-2xl text-slate-300 text-sm sm:text-base ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "នៅជម្រៅជ្រៅបំផុតនៃធម្មជាតិ ភាពច្បាស់លាស់ដាច់ខាតគឺត្រូវហាមឃាត់។ មិនមែនដោយសារឧបករណ៍របស់យើងខ្សោយទេ — ប៉ុន្តែដោយសារតែសកលលោកខ្លួនឯងបដិសេធមិនអនុញ្ញាត។"
              : "At nature's deepest level, perfect clarity is forbidden. Not because our instruments are weak — but because the universe itself refuses to allow it."}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Werner Heisenberg · 1927
          </div>
        </div>
      </header>

      {/* ── Section 1: Camera Analogy ─────────────────────────────────── */}
      <Section
        spec="01"
        Icon={Camera}
        eyebrowEn="The Core Concept"
        eyebrowKh="គំនិតចម្បង"
        titleEn="The camera analogy — sharp position, or sharp speed, never both"
        titleKh="ការប្រៀបធៀបនឹងម៉ាស៊ីនថត — ច្បាស់ទីតាំង ឬច្បាស់ល្បឿន មិនមែនទាំងពីរ"
        descEn="Imagine you are photographing a Formula 1 race car flying past you. You only have two camera settings, and the universe will never let you escape choosing between them."
        descKh="ស្រមៃថាអ្នកកំពុងថតរូបឡាន Formula 1 ហោះកាត់មុខអ្នក។ អ្នកមានការកំណត់ម៉ាស៊ីនថតតែពីរ ហើយសកលលោកនឹងមិនអនុញ្ញាតឱ្យអ្នករួចផុតពីការជ្រើសរើសរវាងវាឡើយ។"
        isKh={isKh}
      >
        <CameraAnalogy isKh={isKh} />
        <NotJustACamera isKh={isKh} />
      </Section>

      {/* ── Section 2: Mathematical Limit ─────────────────────────────── */}
      <Section
        spec="02"
        Icon={Sigma}
        eyebrowEn="The Mathematical Limit"
        eyebrowKh="ដែនកំណត់គណិតវិទ្យា"
        titleEn="The famous inequality — the universe's hard floor"
        titleKh="វិសមភាពដ៏ល្បីល្បាញ — ដែនកំណត់រឹងមាំរបស់សកលលោក"
        descEn="Heisenberg compressed the entire idea into a single short equation. Multiply the two uncertainties together, and the answer can never be smaller than this number."
        descKh="ហៃសិនបឺគបានបង្ហាប់គំនិតទាំងមូលចូលក្នុងសមីការខ្លីតែមួយ។ គុណភាពមិនប្រាកដប្រជាទាំងពីររួមគ្នា ចម្លើយមិនអាចតូចជាងលេខនេះបាននោះទេ។"
        isKh={isKh}
      >
        <UncertaintyFormula isKh={isKh} />
        <SeesawDiagram isKh={isKh} />
      </Section>

      {/* ── Section 3: Why we don't see it ────────────────────────────── */}
      <Section
        spec="03"
        Icon={ScaleIcon}
        eyebrowEn="Why we don't see this in daily life"
        eyebrowKh="ហេតុអ្វីបានជាយើងមិនឃើញវានៅក្នុងជីវិតប្រចាំថ្ងៃ?"
        titleEn="A water buffalo is too heavy for the universe to be unsure of"
        titleKh="ក្របីធំធំធុនធ្ងន់ពេក មិនអាចឱ្យសកលលោកមិនច្បាស់បានទេ"
        descEn="Planck's constant is staggeringly tiny. Divide it among the trillions of trillions of atoms inside a baseball, and the blurriness shrinks to a number so small it has no measurable effect."
        descKh="ថេររបស់ផ្លង់គឺតូចគួរឱ្យភ្ញាក់ផ្អើល។ បែងចែកវាទៅលើអាតូមរាប់លានពាន់លាននៅក្នុងបាល់បេសបល ភាពមិនច្បាស់ត្រូវបានបង្រួមមកទៅលេខតូចមួយដែលគ្មានឥទ្ធិពលអាចវាស់បាន។"
        isKh={isKh}
      >
        <ScaleComparison isKh={isKh} />
        <ClassicalCallout isKh={isKh} />
      </Section>

      {/* ── Footer breadcrumb ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-slate-400 hover:text-emerald-300 text-sm ${isKh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper (dark variant)
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
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-emerald-400/10 text-emerald-300 rounded-sm px-2.5 py-0.5 border border-emerald-400/30">
          SEC-{spec}
        </span>
        <Icon className="w-5 h-5 text-emerald-300" />
        <span className={`text-xs font-bold uppercase tracking-widest text-emerald-300/90 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? eyebrowKh : eyebrowEn}
        </span>
      </div>
      <h2
        className={`font-display font-bold text-2xl sm:text-3xl text-slate-100 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}
        style={{ textShadow: `0 0 14px ${NEON}22` }}
      >
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-slate-400 text-sm sm:text-base mb-6 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 1 · Camera analogy + "not just a camera problem" callout
// ════════════════════════════════════════════════════════════════════════════

function CameraAnalogy({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Fast shutter */}
      <CameraCard
        labelEn="FAST SHUTTER · 1/4000 s"
        labelKh="ល្បឿនបិទរហ័ស · ១/៤០០០ វិ"
        titleEn="Sharp position, no speed"
        titleKh="ច្បាស់ទីតាំង គ្មានល្បឿន"
        bodyEn="The race car is frozen mid-air. You can read the number on its side and point to the exact pixel where it sits. But the photo gives no hint of motion — the car looks like it is parked."
        bodyKh="ឡានប្រណាំងកក់នៅកណ្ដាលអាកាស។ អ្នកអាចអានលេខនៅខាងវា ហើយចង្អុលបានពិតប្រាកដទៅភីកសែលដែលវាស្ថិតនៅ។ ប៉ុន្តែរូបភាពមិនផ្ដល់ការសម្គាល់នៃចលនាទេ — ឡានមើលទៅដូចជាចត។"
        knowEn="Position = exact"
        knowKh="ទីតាំង = ច្បាស់"
        loseEn="Speed = unknown"
        loseKh="ល្បឿន = មិនដឹង"
        accent="emerald"
        isKh={isKh}
        diagram={<FastShutterSVG />}
      />
      {/* Slow shutter */}
      <CameraCard
        labelEn="SLOW SHUTTER · 1 s"
        labelKh="ល្បឿនបិទយឺត · ១ វិ"
        titleEn="Sharp speed, no position"
        titleKh="ច្បាស់ល្បឿន គ្មានទីតាំង"
        bodyEn="The car becomes a long streak of light across the frame. From the length of the blur, you can calculate exactly how fast it was going — but you cannot say where in that streak the car actually is."
        bodyKh="ឡានក្លាយជាបន្ទាត់ពន្លឺវែងកាត់រូបភាព។ ពីប្រវែងនៃបន្ទាត់នេះ អ្នកអាចគណនាបានច្បាស់ថាតើវាបានទៅលឿនប៉ុនណា — ប៉ុន្តែអ្នកមិនអាចនិយាយបានថាឡាននៅចំណុចណាក្នុងបន្ទាត់នោះទេ។"
        knowEn="Speed = exact"
        knowKh="ល្បឿន = ច្បាស់"
        loseEn="Position = blurred"
        loseKh="ទីតាំង = មិនច្បាស់"
        accent="cyan"
        isKh={isKh}
        diagram={<SlowShutterSVG />}
      />
    </div>
  );
}

function CameraCard({
  labelEn, labelKh, titleEn, titleKh, bodyEn, bodyKh,
  knowEn, knowKh, loseEn, loseKh, accent, isKh, diagram,
}: {
  labelEn: string; labelKh: string;
  titleEn: string; titleKh: string;
  bodyEn: string; bodyKh: string;
  knowEn: string; knowKh: string;
  loseEn: string; loseKh: string;
  accent: "emerald" | "cyan";
  isKh: boolean;
  diagram: React.ReactNode;
}) {
  const accentClasses =
    accent === "emerald"
      ? { ring: "ring-emerald-400/30", text: "text-emerald-300", bg: "bg-emerald-400/10", border: "border-emerald-400/40" }
      : { ring: "ring-cyan-400/30", text: "text-cyan-300", bg: "bg-cyan-400/10", border: "border-cyan-400/40" };

  return (
    <div className={`rounded-2xl bg-slate-900/70 border border-slate-700 ring-1 ${accentClasses.ring} overflow-hidden flex flex-col`}>
      <div className={`px-4 py-2 ${accentClasses.bg} border-b ${accentClasses.border} flex items-center justify-between gap-3`}>
        <div className={`font-mono text-[10px] tracking-widest ${accentClasses.text} ${isKh ? "font-khmer normal-case tracking-normal" : "uppercase"}`}>
          {isKh ? labelKh : labelEn}
        </div>
        <Camera className={`w-4 h-4 ${accentClasses.text}`} />
      </div>
      <div className="bg-black aspect-[16/9] flex items-center justify-center overflow-hidden">
        {diagram}
      </div>
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <h3 className={`font-display font-bold text-lg text-slate-100 ${isKh ? "font-khmer leading-snug" : "leading-tight"}`}>
          {isKh ? titleKh : titleEn}
        </h3>
        <p className={`text-sm text-slate-300 flex-1 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? bodyKh : bodyEn}
        </p>
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
          <div className="rounded-md bg-emerald-400/10 border border-emerald-400/30 px-2 py-1.5 text-[11px]">
            <div className="font-mono text-[9px] uppercase tracking-widest text-emerald-300/70">✓ KNOW</div>
            <div className={`text-emerald-200 ${isKh ? "font-khmer" : ""}`}>{isKh ? knowKh : knowEn}</div>
          </div>
          <div className="rounded-md bg-rose-400/10 border border-rose-400/30 px-2 py-1.5 text-[11px]">
            <div className="font-mono text-[9px] uppercase tracking-widest text-rose-300/70">✗ LOSE</div>
            <div className={`text-rose-200 ${isKh ? "font-khmer" : ""}`}>{isKh ? loseKh : loseEn}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FastShutterSVG() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" aria-hidden>
      {/* Track grid */}
      <defs>
        <pattern id="hzgrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke={NEON} strokeOpacity="0.08" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill="url(#hzgrid)" />
      <line x1="0" y1="130" x2="320" y2="130" stroke={NEON} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 4" />

      {/* Sharp car */}
      <g transform="translate(140,110)">
        {/* body */}
        <rect x="0" y="0" width="60" height="18" rx="4" fill={NEON} />
        <rect x="12" y="-10" width="30" height="12" rx="3" fill="#064e3b" />
        {/* wheels */}
        <circle cx="14" cy="20" r="6" fill="#0f172a" stroke={NEON} strokeWidth="1.5" />
        <circle cx="46" cy="20" r="6" fill="#0f172a" stroke={NEON} strokeWidth="1.5" />
        {/* number */}
        <text x="30" y="13" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#064e3b">F1</text>
      </g>

      {/* Crosshair */}
      <g stroke={NEON} strokeOpacity="0.6" strokeWidth="1">
        <line x1="170" y1="60" x2="170" y2="100" />
        <line x1="150" y1="80" x2="190" y2="80" />
      </g>

      <text x="160" y="40" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={NEON} opacity="0.85">
        EXACT POSITION
      </text>
    </svg>
  );
}

function SlowShutterSVG() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" aria-hidden>
      <defs>
        <pattern id="hzgrid2" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke={CYAN} strokeOpacity="0.08" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="streak" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={CYAN} stopOpacity="0" />
          <stop offset="0.2" stopColor={CYAN} stopOpacity="0.5" />
          <stop offset="0.8" stopColor={CYAN} stopOpacity="0.9" />
          <stop offset="1" stopColor={CYAN} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#hzgrid2)" />
      <line x1="0" y1="130" x2="320" y2="130" stroke={CYAN} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 4" />

      {/* Long blur */}
      <rect x="40" y="103" width="240" height="22" rx="11" fill="url(#streak)" />
      {/* Faint car ghost in middle */}
      <g transform="translate(160,108)" opacity="0.45">
        <rect x="-26" y="0" width="52" height="14" rx="3" fill={CYAN} />
        <rect x="-16" y="-8" width="26" height="10" rx="2" fill="#0e7490" />
      </g>

      <text x="160" y="40" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={CYAN} opacity="0.85">
        EXACT SPEED — BLURRED POSITION
      </text>

      {/* speed brackets */}
      <g stroke={CYAN} strokeWidth="1" opacity="0.7">
        <line x1="40" y1="150" x2="280" y2="150" />
        <line x1="40" y1="146" x2="40" y2="154" />
        <line x1="280" y1="146" x2="280" y2="154" />
      </g>
      <text x="160" y="165" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={CYAN}>
        Δx (BLUR LENGTH = SPEED)
      </text>
    </svg>
  );
}

function NotJustACamera({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-emerald-400/30 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
        <div className="space-y-2">
          <div className={`font-display font-bold text-emerald-200 text-lg ${isKh ? "font-khmer" : ""}`}>
            {isKh
              ? "នេះមិនមែនជាបញ្ហារបស់ម៉ាស៊ីនថតទេ — វាគឺជាច្បាប់នៃធម្មជាតិ"
              : "This is not a camera problem — it is a law of nature"}
          </div>
          <p className={`text-sm text-slate-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ក្នុងពិភពកង់ទិច (quantum world) នេះមិនមែនជាបញ្ហារបស់ម៉ាស៊ីនថតរបស់អ្នកទេ ឬឧបករណ៍របស់អ្នកមិនល្អទេ — វាគឺជាច្បាប់ដ៏សំខាន់របស់ធម្មជាតិ។ អ្នក "
              : "In the quantum world this is not a camera problem and not a problem with your instruments — it is a fundamental law of nature. You "}
            <span className="text-emerald-300 font-semibold">
              {isKh ? "មិនអាច" : "cannot"}
            </span>
            {isKh
              ? " ដឹងទាំងទីតាំងពិតប្រាកដ និងសន្ទុះពិតប្រាកដនៃភាគល្អិតមួយក្នុងពេលដំណាលគ្នា។ ភាគល្អិតខ្លួនឯងគ្រាន់តែ "
              : " know both the exact position AND the exact momentum of a particle at the same time. The particle itself simply "}
            <span className="text-emerald-300 italic">
              {isKh ? "មិនមាន" : "does not have"}
            </span>
            {isKh
              ? " តម្លៃច្បាស់ៗទាំងពីរក្នុងពេលតែមួយ។"
              : " both exact values at once."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · Formula + seesaw inverse-relationship diagram
// ════════════════════════════════════════════════════════════════════════════

function UncertaintyFormula({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-black border-2 border-emerald-400/40 p-5 sm:p-7 overflow-hidden relative">
      <ElectronCloudBg muted />

      <div className="relative">
        <div className={`text-[10px] font-mono uppercase tracking-widest text-emerald-300 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "សមីការរបស់ហៃសិនបឺគ" : "Heisenberg's Inequality"}
        </div>
        <h3 className={`font-display font-bold text-xl text-slate-100 mb-4 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "សមីការតែមួយដែលគ្រប់គ្រងភាពមិនច្បាស់" : "The single equation that bounds the blur"}
        </h3>

        <div
          className="rounded-xl bg-emerald-400/5 border border-emerald-400/20 p-5 sm:p-7 my-3 overflow-x-auto"
          style={{ boxShadow: `inset 0 0 32px ${NEON}11` }}
        >
          <div className="text-emerald-100 text-2xl sm:text-3xl text-center" style={{ textShadow: `0 0 12px ${NEON}` }}>
            <BlockMath math={String.raw`\Delta x \cdot \Delta p \;\geq\; \dfrac{h}{4\pi}`} />
          </div>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mt-5">
          <SymRow
            sym={String.raw`\Delta x`}
            Icon={Move3d}
            en="Uncertainty in Position — how big the 'blur' is in space."
            kh="ភាពមិនប្រាកដប្រជានៃទីតាំង — តើ 'ភាពមិនច្បាស់' មានទំហំប៉ុណ្ណានៅក្នុងលំហ។"
            isKh={isKh}
          />
          <SymRow
            sym={String.raw`\Delta p`}
            Icon={Gauge}
            en="Uncertainty in Momentum (mass × speed) — how unsure we are of motion."
            kh="ភាពមិនប្រាកដប្រជានៃសន្ទុះ (ម៉ាស់ × ល្បឿន) — តើយើងមិនច្បាស់ប៉ុណ្ណាអំពីចលនា។"
            isKh={isKh}
          />
          <SymRow
            sym={String.raw`h`}
            Icon={CircleDot}
            en="Planck's constant ≈ 6.626 × 10⁻³⁴ J·s — the fundamental 'pixel size' of the universe."
            kh="ថេររបស់ផ្លង់ ≈ ៦.៦២៦ × ១០⁻³⁴ J·s — 'ទំហំភីកសែល' ជាមូលដ្ឋាននៃសកលលោក។"
            isKh={isKh}
          />
        </dl>
      </div>
    </div>
  );
}

function SymRow({
  sym, Icon, en, kh, isKh,
}: { sym: string; Icon: React.ComponentType<{ className?: string }>; en: string; kh: string; isKh: boolean }) {
  return (
    <div className="rounded-lg bg-slate-900/70 border border-slate-700 p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="text-emerald-300 text-lg">
          <InlineMath math={sym} />
        </div>
        <Icon className="w-3.5 h-3.5 text-slate-500" />
      </div>
      <div className={`text-slate-300 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? kh : en}
      </div>
    </div>
  );
}

function SeesawDiagram({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-700 p-5 sm:p-6">
      <div className={`font-display font-bold text-slate-100 text-lg mb-1 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? "ការប្តូរផ្លាស់ — ដឹងមួយ បាត់មួយ" : "The trade-off — know one, lose the other"}
      </div>
      <div className={`text-xs text-slate-400 mb-4 ${isKh ? "font-sans" : "font-khmer"}`}>
        {isKh ? "The trade-off — know one, lose the other" : "ការប្តូរផ្លាស់ — ដឹងមួយ បាត់មួយ"}
      </div>

      <p className={`text-sm text-slate-300 mb-5 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? (
          <>
            នៅពេល <InlineMath math="\Delta x" /> ធ្លាក់តូចជាង (យើងចាប់ដឹងទីតាំងកាន់តែច្បាស់) <InlineMath math="\Delta p" /> ត្រូវតែឡើងធំជាង (យើងបាត់បង់ល្បឿន) ដើម្បីឱ្យផលគុណរបស់វានៅតែធំជាង <InlineMath math="h/4\pi" /> ជានិច្ច។ វាជាជញ្ជីងដែលសកលលោកមិនអនុញ្ញាតឱ្យជ្រេទាំងពីរខាងបានឡើយ។
          </>
        ) : (
          <>
            As <InlineMath math="\Delta x" /> gets smaller (we pin down the position), <InlineMath math="\Delta p" /> must get larger (we lose the speed) so that the product stays above <InlineMath math="h/4\pi" /> forever. It is a seesaw the universe will not let you tip flat on either side.
          </>
        )}
      </p>

      <div className="rounded-xl bg-black p-5">
        <svg viewBox="0 0 600 220" className="w-full h-auto" aria-hidden>
          <defs>
            <linearGradient id="rail" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor={NEON} />
              <stop offset="1" stopColor={CYAN} />
            </linearGradient>
          </defs>

          {/* Pivot */}
          <polygon points="300,170 270,210 330,210" fill="#0f172a" stroke={NEON} strokeWidth="1.5" />
          <line x1="200" y1="210" x2="400" y2="210" stroke="#475569" strokeWidth="2" />

          {/* Tilted beam */}
          <g transform="translate(300,170) rotate(-15)">
            <line x1="-220" y1="0" x2="220" y2="0" stroke="url(#rail)" strokeWidth="3" />
            {/* Left bucket — small */}
            <g transform="translate(-200,0)">
              <line x1="0" y1="0" x2="0" y2="-20" stroke="#475569" strokeWidth="1" />
              <circle cx="0" cy="-32" r="14" fill={NEON} fillOpacity="0.2" stroke={NEON} strokeWidth="2" />
              <text x="0" y="-28" textAnchor="middle" fontSize="11" fontFamily="serif" fontStyle="italic" fill={NEON} fontWeight="700">Δx</text>
              <text x="0" y="-50" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={NEON} opacity="0.85">SMALL</text>
            </g>
            {/* Right bucket — large */}
            <g transform="translate(200,0)">
              <line x1="0" y1="0" x2="0" y2="-30" stroke="#475569" strokeWidth="1" />
              <circle cx="0" cy="-58" r="28" fill={CYAN} fillOpacity="0.2" stroke={CYAN} strokeWidth="2" />
              <text x="0" y="-53" textAnchor="middle" fontSize="14" fontFamily="serif" fontStyle="italic" fill={CYAN} fontWeight="700">Δp</text>
              <text x="0" y="-95" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={CYAN} opacity="0.85">LARGE</text>
            </g>
          </g>

          {/* Floor inequality */}
          <text x="300" y="30" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#fbbf24" opacity="0.9">
            Δx · Δp  ≥  h / 4π   (the floor never moves)
          </text>
        </svg>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · Scale comparison + classical-world callout
// ════════════════════════════════════════════════════════════════════════════

type ScaleObj = {
  id: string;
  emoji: string;
  nameEn: string;
  nameKh: string;
  massEn: string;
  massKh: string;
  blurEn: string;
  blurKh: string;
  bar: number; // 0–100 visual scale
  tone: "emerald" | "cyan" | "amber" | "rose";
};

const OBJECTS: ScaleObj[] = [
  {
    id: "electron",
    emoji: "⚛",
    nameEn: "Electron",
    nameKh: "អេឡិចត្រុង",
    massEn: "9.1 × 10⁻³¹ kg",
    massKh: "៩.១ × ១០⁻³១ គ.ក.",
    blurEn: "Bigger than the atom that holds it",
    blurKh: "ធំជាងអាតូមដែលផ្ទុកវា",
    bar: 100,
    tone: "emerald",
  },
  {
    id: "dustspeck",
    emoji: "·",
    nameEn: "Speck of dust",
    nameKh: "ម្ចូលធូលី",
    massEn: "10⁻⁹ kg",
    massKh: "១០⁻៩ គ.ក.",
    blurEn: "Smaller than 1 atom — invisible",
    blurKh: "តូចជាង ១ អាតូម — មើលមិនឃើញ",
    bar: 30,
    tone: "cyan",
  },
  {
    id: "baseball",
    emoji: "⚾",
    nameEn: "Baseball",
    nameKh: "បាល់បេសបល",
    massEn: "0.145 kg",
    massKh: "០.១៤៥ គ.ក.",
    blurEn: "Roughly 10⁻³³ m — there are no rulers that small",
    blurKh: "ប្រហែល ១០⁻³³ ម៉ែ៉ត — គ្មានបន្ទាត់តូចបែបនេះទេ",
    bar: 6,
    tone: "amber",
  },
  {
    id: "buffalo",
    emoji: "🐃",
    nameEn: "Water buffalo",
    nameKh: "ក្របី",
    massEn: "≈ 800 kg",
    massKh: "≈ ៨០០ គ.ក.",
    blurEn: "Effectively zero — the universe is sure",
    blurKh: "ស្ទើរតែសូន្យ — សកលលោកប្រាកដ",
    bar: 1,
    tone: "rose",
  },
];

function ScaleComparison({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-700 p-5 sm:p-6">
      <div className={`text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-3 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
        {isKh ? "ភាពមិនច្បាស់ ធៀបនឹងម៉ាស់" : "Blurriness vs. mass"}
      </div>

      <div className="space-y-3">
        {OBJECTS.map((o) => {
          const toneRing = {
            emerald: "ring-emerald-400/30 bg-emerald-400/5",
            cyan: "ring-cyan-400/30 bg-cyan-400/5",
            amber: "ring-amber-400/20 bg-amber-400/5",
            rose: "ring-rose-400/20 bg-rose-400/5",
          }[o.tone];
          const toneFill = {
            emerald: "from-emerald-400 to-emerald-600",
            cyan: "from-cyan-400 to-cyan-600",
            amber: "from-amber-400 to-amber-600",
            rose: "from-rose-400 to-rose-600",
          }[o.tone];

          return (
            <div
              key={o.id}
              className={`rounded-xl border border-slate-700 ring-1 ${toneRing} p-3 grid grid-cols-12 gap-3 items-center`}
              data-testid={`scale-${o.id}`}
            >
              <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-center text-2xl">
                  {o.emoji}
                </div>
                <div className="min-w-0">
                  <div className={`font-display font-bold text-slate-100 text-sm ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? o.nameKh : o.nameEn}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    m = {isKh ? o.massKh : o.massEn}
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6">
                <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${toneFill}`}
                    style={{ width: `${Math.max(o.bar, 2)}%` }}
                  />
                </div>
              </div>

              <div className={`col-span-12 md:col-span-3 text-[11px] text-slate-300 ${isKh ? "font-khmer leading-loose" : "leading-snug"}`}>
                {isKh ? o.blurKh : o.blurEn}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-4 flex items-start gap-2 text-xs text-slate-400 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <p>
          {isKh
            ? "របារខាងលើបង្ហាញទំហំទាក់ទងនៃ 'ភាពមិនច្បាស់' ខ្នាតគុណបី — វាធ្លាក់យ៉ាងលឿនពេលម៉ាស់កើនឡើង។"
            : "The bars above show the relative size of the 'blur' on a relative scale — it falls off astonishingly fast as mass grows."}
        </p>
      </div>
    </div>
  );
}

function ClassicalCallout({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-900/60 to-cyan-500/10 border-l-4 border-emerald-400 p-5 sm:p-6">
      <div className="flex items-start gap-3 max-w-3xl">
        <Sparkles className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
        <div className="space-y-2">
          <div className={`font-display font-bold text-emerald-200 text-lg ${isKh ? "font-khmer" : ""}`}>
            {isKh
              ? "ផ្លង់តូចពេក — ពិភពធំៗដូចជាប្រាកដ"
              : "Planck is too small — the big world looks certain"}
          </div>
          <p className={`text-sm text-slate-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? (
              <>
                ថេររបស់ផ្លង់ <InlineMath math="h" /> គឺតូចមិនអាចជឿបាន (~១០⁻³⁴) ដូច្នេះ 'ភាពមិនច្បាស់' នេះមានឥទ្ធិពលតែលើវត្ថុមីក្រូទស្សន៍ដូចជាអេឡិចត្រុង។ បាល់បេសបល ឬក្របីមួយ មានម៉ាស់ច្រើនពេក ដែលធ្វើឱ្យភាពមិនច្បាស់របស់វាស្ទើរតែសូន្យសម្រាប់គោលបំណងជាក់ស្តែងទាំងអស់។ នេះហើយជាមូលហេតុដែលច្បាប់ Newton នៅតែដំណើរការសម្រាប់ស្ពាន ឡាន និងផ្កាយរណបទាំងអស់របស់យើង។
              </>
            ) : (
              <>
                Planck's constant <InlineMath math="h" /> is so unbelievably tiny (~10⁻³⁴) that this 'blurriness' only affects microscopic things like electrons. A baseball or a water buffalo has so much mass that its uncertainty is zero for all practical purposes. That is why Newton's laws still work perfectly for our bridges, cars, and satellites.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative — neon electron-cloud background
// ════════════════════════════════════════════════════════════════════════════

function ElectronCloudBg({ muted = false }: { muted?: boolean }) {
  const opacity = muted ? 0.06 : 0.18;
  return (
    <>
      {/* Gradient haze */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 30%, ${NEON}${muted ? "10" : "33"}, transparent 50%), radial-gradient(circle at 80% 70%, ${CYAN}${muted ? "10" : "30"}, transparent 50%)`,
        }}
        aria-hidden
      />
      {/* Faint orbital rings */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden style={{ opacity }}>
        <defs>
          <pattern id="dotgrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={NEON} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>
    </>
  );
}
