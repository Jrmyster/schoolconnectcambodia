import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Waves,
  Compass,
  Sigma,
  Volume2,
  Eye,
  Radio,
  AudioLines,
  Lightbulb,
  Sparkles,
  Glasses,
  Minus,
  Plus,
  Gauge,
  FunctionSquare,
  Diamond,
  Droplet,
  Wind,
} from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Cool blueprint surface ────────────────────────────────────────────────
const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#f5f3ff",
  backgroundImage:
    "linear-gradient(rgba(79, 70, 229, 0.07) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(79, 70, 229, 0.07) 1px, transparent 1px), " +
    "linear-gradient(rgba(79, 70, 229, 0.04) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(79, 70, 229, 0.04) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};
const CARD_BG: React.CSSProperties = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(rgba(49, 46, 129, 0.035) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(49, 46, 129, 0.035) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

function CornerMarks({ subtle = false }: { subtle?: boolean }) {
  const stroke = subtle ? "border-indigo-300/70" : "border-violet-400/60";
  const size = subtle ? "w-3 h-3" : "w-4 h-4";
  return (
    <>
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 left-2 ${size} border-t-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute top-2 right-2 ${size} border-t-2 border-r-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 left-2 ${size} border-b-2 border-l-2 ${stroke}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute bottom-2 right-2 ${size} border-b-2 border-r-2 ${stroke}`} />
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────
export function PhysicsWavesPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="min-h-screen py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/physics"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 ${kh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to Physics Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}
        </Link>

        {/* ── Header ────────────────────────────────────────────── */}
        <header
          className="relative overflow-hidden rounded-3xl px-6 sm:px-10 py-8 sm:py-10 mb-8 shadow-lg text-white"
          style={{
            backgroundImage: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #6d28d9 100%)",
            backgroundColor: "#1e1b4b",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(rgba(196, 181, 253, 0.16) 1px, transparent 1px), " +
                "linear-gradient(90deg, rgba(196, 181, 253, 0.16) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-violet-300/15 border-2 border-violet-300/70 text-violet-200 flex items-center justify-center flex-shrink-0">
              <Waves className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-violet-200/90 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{t("Physics Hub", "មជ្ឈមណ្ឌលរូបវិទ្យា")}</span>
                <span className="opacity-50">/</span>
                <span className="text-violet-100">M-04</span>
              </div>
              <h1
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${kh ? "font-khmer leading-snug" : ""}`}
              >
                {t("Module 4: Waves, Sound & Light", "ម៉ូឌុលទី៤៖ រលក សំឡេង និងពន្លឺ")}
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base text-violet-100/90 max-w-2xl leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}
              >
                {t(
                  "Everything you hear, everything you see — it all arrives as waves. Discover the hidden ripples that connect your world.",
                  "អ្វីៗដែលអ្នកឮ អ្វីៗដែលអ្នកឃើញ — ទាំងអស់នោះមកដល់ជារលក។ ស្វែងយល់ពីរលកដែលលាក់កំបាំង ដែលភ្ជាប់ពិភពលោករបស់អ្នក។",
                )}
              </p>
            </div>
          </div>
        </header>

        {/* ── 1. Wave Basics ───────────────────────────────────── */}
        <SectionTitle
          en="Wave basics — two ways to wiggle"
          kh="មូលដ្ឋានគ្រឹះនៃរលក — ពីរវិធីញ័រ"
          numberLabel="01"
          icon={Sigma}
        />
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-6">
          <WaveTypeCard
            kh={kh}
            t={t}
            tagEn="Up & down"
            tagKh="ឡើង & ចុះ"
            titleEn="Transverse Wave"
            titleKh="រលកឆ្លងកាត់"
            metaphorEn="Like a rope flicked up and down"
            metaphorKh="ដូចជាខ្សែពួរដែលយើងវាយឡើង-ចុះ"
            descEn="Particles move up and down, while the wave travels sideways. Light and water ripples are transverse waves."
            descKh="ភាគល្អិតកំរើកឡើង-ចុះ ខណៈពេលដែលរលកធ្វើដំណើរទៅជាមួយ។ ពន្លឺ និងរលកទឹក គឺជារលកឆ្លងកាត់។"
            visual={<TransverseAnim />}
          />
          <WaveTypeCard
            kh={kh}
            t={t}
            tagEn="Push & pull"
            tagKh="រុញ & ទាញ"
            titleEn="Longitudinal Wave"
            titleKh="រលកបណ្ដោយ"
            metaphorEn="Like a slinky pushed back and forth"
            metaphorKh="ដូចជាស្ប្រីងស្លីងគី ដែលត្រូវបានរុញទៅមុខ-ក្រោយ"
            descEn="Particles move back and forth in the same direction the wave travels — alternating compressions and rarefactions. Sound is a longitudinal wave."
            descKh="ភាគល្អិតកំរើកទៅមុខ-ក្រោយ តាមទិសដៅដែលរលកធ្វើដំណើរ — ស្ថានភាពបង្ហាប់ និងស្ដើងឆ្លាស់គ្នា។ សំឡេង គឺជារលកបណ្ដោយ។"
            visual={<LongitudinalAnim />}
          />
        </div>

        {/* Frequency & Wavelength */}
        <FrequencyWavelengthCard kh={kh} t={t} />

        {/* ── 2. Nature of Sound ───────────────────────────────── */}
        <SectionTitle
          en="The nature of sound"
          kh="ធម្មជាតិនៃសំឡេង"
          numberLabel="02"
          icon={Volume2}
        />
        <SoundCard kh={kh} t={t} />

        {/* ── 3. EM Spectrum ───────────────────────────────────── */}
        <SectionTitle
          en="The electromagnetic spectrum"
          kh="វិសាលគមអេឡិចត្រូម៉ាញ៉េទិច"
          numberLabel="03"
          icon={Radio}
        />
        <EMSpectrumCard kh={kh} t={t} />

        {/* ── 4. Optics ────────────────────────────────────────── */}
        <SectionTitle
          en="Optics — reflection & refraction"
          kh="អុបទិក — ការជះត្រឡប់ និងការចំណាំងបែរ"
          numberLabel="04"
          icon={Eye}
        />
        <OpticsCards kh={kh} t={t} />

        {/* ── 4b. The mathematics of refraction ─────────────────── */}
        <RefractionMathSubsection />

        {/* ── 5. Physics of Glasses ────────────────────────────── */}
        <div className="mt-10">
          <SectionTitle
            en="The Physics of Glasses — correcting vision"
            kh="រូបវិទ្យានៃវ៉ែនតា — កែសម្រួលការមើលឃើញ"
            numberLabel="05"
            icon={Glasses}
          />
          <GlassesSubsection kh={kh} t={t} />
        </div>

        {/* Back to hub */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/physics"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-700 text-white text-sm font-bold shadow hover:bg-indigo-800 transition-colors"
          >
            <span>{t("Finish — back to Physics Hub", "បញ្ចប់ — ត្រឡប់ទៅមជ្ឈមណ្ឌលរូបវិទ្យា")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Section title bar (cool indigo for waves) ─────────────────────────────
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
      <div className="w-10 h-10 rounded-xl bg-indigo-700 text-white flex items-center justify-center shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {language === "kh" ? `ផ្នែក ${numberLabel}` : `Section ${numberLabel}`}
        </div>
        <h2 className={`text-lg sm:text-xl md:text-2xl font-bold text-indigo-950 leading-tight ${isKh ? "font-khmer" : ""}`}>
          {isKh ? kh : en}
        </h2>
      </div>
    </div>
  );
}

// ── Wave type card (Transverse / Longitudinal) ────────────────────────────
function WaveTypeCard({
  kh,
  t,
  tagEn,
  tagKh,
  titleEn,
  titleKh,
  metaphorEn,
  metaphorKh,
  descEn,
  descKh,
  visual,
}: {
  kh: boolean;
  t: (en: string, kh: string) => string;
  tagEn: string;
  tagKh: string;
  titleEn: string;
  titleKh: string;
  metaphorEn: string;
  metaphorKh: string;
  descEn: string;
  descKh: string;
  visual: React.ReactNode;
}) {
  return (
    <article className="relative rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden flex flex-col" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Waves className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {kh ? tagKh : tagEn}
            </div>
            <h3 className={`text-lg sm:text-xl font-bold text-indigo-950 leading-tight ${kh ? "font-khmer" : ""}`}>
              {kh ? titleKh : titleEn}
            </h3>
          </div>
        </div>

        <div className="rounded-lg bg-indigo-50/60 border border-indigo-200 p-3 mb-3 flex items-center justify-center min-h-[110px]">
          {visual}
        </div>

        <div className={`text-[11px] font-mono uppercase tracking-widest text-indigo-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {t("Think of it as", "គិតពីវាដូចជា")}
        </div>
        <p className={`text-sm font-semibold text-indigo-900 mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? metaphorKh : metaphorEn}
        </p>

        <p className={`text-sm text-foreground/80 leading-relaxed mt-auto ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? descKh : descEn}
        </p>
      </div>
    </article>
  );
}

// ── Animated transverse wave (rope) ───────────────────────────────────────
function TransverseAnim() {
  // Long sine path translated horizontally to look like the wave is travelling
  const w = 220;
  const h = 100;
  const baseY = 50;
  const amp = 14;
  const lambda = 60;
  // Build a path that's 2x as wide so we can translate left by lambda for a seamless loop
  const points: string[] = [];
  for (let x = 0; x <= w * 2; x += 4) {
    const y = baseY + amp * Math.sin((x / lambda) * 2 * Math.PI);
    points.push(`${x === 0 ? "M" : "L"}${x},${y.toFixed(2)}`);
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24" aria-hidden="true">
      {/* hand at left */}
      <circle cx="14" cy={baseY} r="6" fill="#4338ca" />
      <line x1="14" y1={baseY} x2="14" y2={baseY - 14} stroke="#4338ca" strokeWidth="2">
        <animate attributeName="y2" values={`${baseY - 14};${baseY + 14};${baseY - 14}`} dur="1.4s" repeatCount="indefinite" />
      </line>
      {/* clip box */}
      <defs>
        <clipPath id="trans-clip">
          <rect x="20" y="10" width={w - 30} height={h - 20} rx="4" />
        </clipPath>
      </defs>
      <g clipPath="url(#trans-clip)">
        <g>
          <path d={points.join(" ")} stroke="#6d28d9" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <animateTransform attributeName="transform" type="translate" from="0,0" to={`-${lambda},0`} dur="1.4s" repeatCount="indefinite" />
          </path>
        </g>
      </g>
      {/* particles bobbing in place to show motion direction */}
      {[60, 100, 140, 180].map((px, i) => (
        <circle key={i} cx={px} cy={baseY} r="3" fill="#dc2626">
          <animate
            attributeName="cy"
            values={`${baseY - amp};${baseY + amp};${baseY - amp}`}
            dur="1.4s"
            repeatCount="indefinite"
            begin={`${i * 0.1}s`}
          />
        </circle>
      ))}
      {/* perpendicular motion arrow */}
      <line x1="200" y1="22" x2="200" y2="78" stroke="#dc2626" strokeWidth="1.5" markerStart="url(#tu-arr)" markerEnd="url(#td-arr)" />
      <defs>
        <marker id="tu-arr" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto-start-reverse"><path d="M0,6 L3,0 L6,6 Z" fill="#dc2626" /></marker>
        <marker id="td-arr" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto"><path d="M0,0 L3,6 L6,0 Z" fill="#dc2626" /></marker>
      </defs>
      <text x="184" y={baseY + 4} fontSize="8" fill="#dc2626" fontFamily="monospace" textAnchor="end" fontWeight="bold">⊥</text>
    </svg>
  );
}

// ── Animated longitudinal wave (slinky) ───────────────────────────────────
function LongitudinalAnim() {
  // A row of dots whose x-positions oscillate with a phase based on index — creates compressions
  const w = 220;
  const h = 100;
  const baseY = 50;
  const N = 18;
  const spacing = (w - 30) / (N - 1);
  const amp = 6;
  const period = 1.6;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24" aria-hidden="true">
      {/* hand on left, pushing left/right */}
      <g>
        <circle r="6" fill="#4338ca" cy={baseY}>
          <animate attributeName="cx" values="10;22;10" dur={`${period}s`} repeatCount="indefinite" />
        </circle>
      </g>
      {/* baseline */}
      <line x1="20" y1={baseY} x2={w - 10} y2={baseY} stroke="#c7d2fe" strokeWidth="1" strokeDasharray="2 3" />
      {Array.from({ length: N }).map((_, i) => {
        const cx = 22 + i * spacing;
        const phase = (i / N) * period; // each dot delayed by index
        return (
          <circle key={i} cy={baseY} r="3.5" fill="#6d28d9">
            <animate
              attributeName="cx"
              values={`${cx - amp};${cx + amp};${cx - amp}`}
              dur={`${period}s`}
              repeatCount="indefinite"
              begin={`-${phase}s`}
            />
          </circle>
        );
      })}
      {/* horizontal motion arrow */}
      <line x1={w - 60} y1={baseY + 22} x2={w - 20} y2={baseY + 22} stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#lh-arr-r)" markerStart="url(#lh-arr-l)" />
      <defs>
        <marker id="lh-arr-r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6 Z" fill="#dc2626" /></marker>
        <marker id="lh-arr-l" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse"><path d="M0,0 L5,3 L0,6 Z" fill="#dc2626" /></marker>
      </defs>
      <text x={w - 40} y={baseY + 36} fontSize="8" fill="#dc2626" fontFamily="monospace" textAnchor="middle" fontWeight="bold">∥</text>
      {/* labels */}
      <text x="36" y="20" fontSize="8" fill="#475569" fontFamily="monospace">COMPRESSION</text>
      <text x={w - 14} y="20" fontSize="8" fill="#475569" fontFamily="monospace" textAnchor="end">RAREFACTION</text>
    </svg>
  );
}

// ── Frequency & wavelength card ───────────────────────────────────────────
function FrequencyWavelengthCard({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section id="frequency-pitch" className="relative rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden mb-10 scroll-mt-24" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6 grid md:grid-cols-[1fr_280px] gap-5 items-start">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <AudioLines className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Frequency × wavelength", "ប្រេកង់ × រលកប្រវែង")}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold text-indigo-950 leading-tight ${kh ? "font-khmer" : ""}`}>
                {t("Higher frequency = more energy = higher pitch", "ប្រេកង់ខ្ពស់ = ថាមពលច្រើន = សំឡេងស្រួច")}
              </h3>
            </div>
          </div>

          <p className={`text-sm sm:text-base text-foreground leading-relaxed mb-3 ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Wavelength (λ) is the distance between two crests. Frequency (f) is how many waves pass a point each second. Squeeze the waves closer together and the frequency goes up — and so does the energy.",
              "រលកប្រវែង (λ) គឺជាចម្ងាយរវាងកំពូលរលកពីរ។ ប្រេកង់ (f) គឺជាចំនួនរលកដែលឆ្លងកាត់ចំណុចមួយក្នុងមួយវិនាទី។ ច្របាច់រលកឱ្យជិតគ្នា ប្រេកង់នឹងឡើងខ្ពស់ — ហើយថាមពលក៏ឡើងដែរ។",
            )}
          </p>

          {/* Comparison grid */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="rounded-lg bg-indigo-50/60 border border-indigo-200 p-3">
              <div className={`text-[10px] font-mono uppercase tracking-widest text-indigo-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Low frequency", "ប្រេកង់ទាប")}
              </div>
              <div className={`text-sm font-bold text-indigo-900 ${kh ? "font-khmer" : ""}`}>{t("Long λ · Deep voice", "λ វែង · សំឡេងធំ")}</div>
              <div className={`text-xs text-slate-600 mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
                {t("Like the sound of a temple drum.", "ដូចជាសំឡេងស្គរវត្ត។")}
              </div>
            </div>
            <div className="rounded-lg bg-violet-50/60 border border-violet-200 p-3">
              <div className={`text-[10px] font-mono uppercase tracking-widest text-violet-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("High frequency", "ប្រេកង់ខ្ពស់")}
              </div>
              <div className={`text-sm font-bold text-violet-900 ${kh ? "font-khmer" : ""}`}>{t("Short λ · Squeaky pitch", "λ ខ្លី · សំឡេងស្រួច")}</div>
              <div className={`text-xs text-slate-600 mt-1 ${kh ? "font-khmer leading-loose" : ""}`}>
                {t("Like a whistle or a small bird.", "ដូចជាស៊ីសុង ឬសត្វស្លាបតូច។")}
              </div>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900 text-white">
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-200">{t("Wave equation", "សមីការរលក")}</span>
            <span className="font-serif italic text-base font-bold text-violet-200">v = f · λ</span>
          </div>
        </div>

        {/* Two waves side-by-side: low vs high frequency */}
        <div className="rounded-xl bg-indigo-50/60 border border-indigo-200 p-3 flex flex-col items-center justify-center min-h-[200px]">
          <FrequencyCompareSvg />
        </div>
      </div>
    </section>
  );
}

function FrequencyCompareSvg() {
  // Two stacked sine waves: top = low freq (long λ), bottom = high freq (short λ)
  const w = 240;
  const h = 180;
  const buildSine = (yc: number, lambda: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= w; x += 3) {
      const y = yc + 18 * Math.sin((x / lambda) * 2 * Math.PI);
      pts.push(`${x === 0 ? "M" : "L"}${x},${y.toFixed(2)}`);
    }
    return pts.join(" ");
  };
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-44" aria-hidden="true">
      {/* low freq */}
      <text x="0" y="14" fontSize="10" fill="#4338ca" fontFamily="monospace" fontWeight="bold">LOW · LONG λ</text>
      <line x1="0" y1="50" x2={w} y2="50" stroke="#c7d2fe" strokeWidth="1" strokeDasharray="2 3" />
      <path d={buildSine(50, 80)} stroke="#4338ca" strokeWidth="2.5" fill="none" />
      {/* λ marker */}
      <line x1="20" y1="78" x2="100" y2="78" stroke="#0f172a" strokeWidth="1" markerStart="url(#fc-arr-l)" markerEnd="url(#fc-arr-r)" />
      <text x="60" y="92" fontSize="10" fill="#0f172a" fontFamily="serif" fontStyle="italic" textAnchor="middle">λ</text>

      {/* high freq */}
      <text x="0" y="116" fontSize="10" fill="#7c3aed" fontFamily="monospace" fontWeight="bold">HIGH · SHORT λ</text>
      <line x1="0" y1="148" x2={w} y2="148" stroke="#ddd6fe" strokeWidth="1" strokeDasharray="2 3" />
      <path d={buildSine(148, 28)} stroke="#7c3aed" strokeWidth="2.5" fill="none" />
      <line x1="20" y1="172" x2="48" y2="172" stroke="#0f172a" strokeWidth="1" markerStart="url(#fc-arr-l)" markerEnd="url(#fc-arr-r)" />
      <defs>
        <marker id="fc-arr-r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6 Z" fill="#0f172a" /></marker>
        <marker id="fc-arr-l" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse"><path d="M0,0 L5,3 L0,6 Z" fill="#0f172a" /></marker>
      </defs>
    </svg>
  );
}

// ── Sound card ────────────────────────────────────────────────────────────
function SoundCard({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section id="sound" className="relative rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden mb-10 scroll-mt-24" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6 grid md:grid-cols-[1fr_260px] gap-5 items-start">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Sound needs a medium", "សំឡេងត្រូវការមជ្ឈដ្ឋាន")}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold text-indigo-950 leading-tight ${kh ? "font-khmer" : ""}`}>
                {t("In space, no one can hear you scream", "នៅក្នុងលំហអាកាស គ្មាននរណាម្នាក់អាចឮអ្នកស្រែកបានទេ")}
              </h3>
            </div>
          </div>

          <p className={`text-sm sm:text-base text-foreground leading-relaxed mb-4 ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "សំឡេងត្រូវការមជ្ឈដ្ឋាន (ដូចជាខ្យល់ ឬទឹក) ដើម្បីធ្វើដំណើរ។ នៅក្នុងលំហអាកាស គឺស្ងាត់ជ្រងំ!"
              : "Sound needs a medium (like air or water) to travel. In space, it is silent!"}
          </p>

          {/* speed comparison */}
          <div className="rounded-xl bg-indigo-50/60 border border-indigo-200 p-3">
            <div className={`text-[10px] font-mono uppercase tracking-widest text-indigo-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Speed of sound in different media", "ល្បឿនសំឡេងក្នុងមជ្ឈដ្ឋានផ្សេងគ្នា")}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <SpeedPill labelEn="Air" labelKh="ខ្យល់" value="343 m/s" kh={kh} />
              <SpeedPill labelEn="Water" labelKh="ទឹក" value="1,480 m/s" kh={kh} />
              <SpeedPill labelEn="Steel" labelKh="ដែកថែប" value="5,960 m/s" kh={kh} />
              <SpeedPill labelEn="Vacuum" labelKh="ភាពទទេ" value="—" kh={kh} highlight />
            </div>
            <p className={`text-xs text-slate-600 mt-2 ${kh ? "font-khmer leading-loose" : ""}`}>
              {t("Sound travels faster through denser materials, where particles can pass the vibration along quickly.", "សំឡេងធ្វើដំណើរលឿនជាងតាមរយៈសម្ភារៈដែលក្រាស់ ដែលភាគល្អិតអាចបញ្ជូនការញ័របានយ៉ាងលឿន។")}
            </p>
          </div>
        </div>

        {/* Astronaut visual */}
        <div className="rounded-xl bg-slate-900 border border-indigo-300 p-3 flex items-center justify-center min-h-[180px] relative overflow-hidden">
          {/* stars */}
          {[
            [20, 30], [60, 18], [120, 40], [180, 22], [220, 60], [40, 90], [200, 110], [100, 130], [180, 150], [30, 150]
          ].map(([x, y], i) => (
            <span key={i} aria-hidden="true" className="absolute w-1 h-1 bg-violet-200 rounded-full opacity-80" style={{ left: x, top: y }} />
          ))}
          <SilentSpaceSvg />
        </div>
      </div>
    </section>
  );
}

function SpeedPill({ labelEn, labelKh, value, kh, highlight = false }: { labelEn: string; labelKh: string; value: string; kh: boolean; highlight?: boolean }) {
  return (
    <div className={`rounded-md px-2.5 py-1.5 ${highlight ? "bg-slate-900 text-white border border-violet-400" : "bg-white border border-indigo-200"}`}>
      <div className={`text-[10px] font-mono uppercase tracking-widest ${highlight ? "text-violet-200" : "text-indigo-700"} ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
        {kh ? labelKh : labelEn}
      </div>
      <div className={`font-mono text-sm font-bold ${highlight ? "text-white" : "text-slate-900"}`}>{value}</div>
    </div>
  );
}

function SilentSpaceSvg() {
  return (
    <svg viewBox="0 0 240 180" className="relative w-full h-44" aria-hidden="true">
      {/* astronaut helmet */}
      <circle cx="120" cy="90" r="34" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <ellipse cx="120" cy="86" rx="22" ry="20" fill="#1e293b" />
      <ellipse cx="113" cy="78" rx="6" ry="4" fill="#94a3b8" opacity="0.7" />
      {/* body */}
      <rect x="100" y="118" width="40" height="32" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      {/* mouth (screaming) */}
      <ellipse cx="120" cy="98" rx="4" ry="6" fill="#7f1d1d" />
      {/* sound waves with X cross-out */}
      <g stroke="#7c3aed" strokeWidth="1.5" fill="none" opacity="0.65">
        <path d="M 165 80 Q 180 95, 165 110" />
        <path d="M 175 70 Q 195 95, 175 120" />
        <path d="M 185 60 Q 210 95, 185 130" />
      </g>
      {/* big red X */}
      <g stroke="#dc2626" strokeWidth="3" strokeLinecap="round">
        <line x1="170" y1="72" x2="208" y2="118" />
        <line x1="208" y1="72" x2="170" y2="118" />
      </g>
      <RocketDoodle x="32" y="32" />
      <text x="120" y="172" fontSize="10" fill="#a78bfa" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NO MEDIUM = NO SOUND</text>
    </svg>
  );
}

function RocketDoodle({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(-20)`}>
      <path d="M 0 0 L 14 4 L 0 8 Z" fill="#a78bfa" />
      <rect x="-10" y="2" width="10" height="4" fill="#c4b5fd" />
      <circle cx="-3" cy="4" r="1.5" fill="#1e1b4b" />
    </g>
  );
}

// ── EM Spectrum card ──────────────────────────────────────────────────────
type SpectrumBand = {
  keyId: string;
  en: string;
  kh: string;
  fill: string;
  text: string;
  flex: number;
  example: { en: string; kh: string };
};

const BANDS: SpectrumBand[] = [
  { keyId: "radio", en: "Radio", kh: "វិទ្យុ", fill: "#7c2d12", text: "#fed7aa", flex: 1.2, example: { en: "FM stations & TV", kh: "ស្ថានីយ៍ FM និងទូរទស្សន៍" } },
  { keyId: "micro", en: "Microwave", kh: "មីក្រូវ៉េវ", fill: "#b45309", text: "#fde68a", flex: 1.0, example: { en: "Wi-Fi & ovens", kh: "វ៉ាយហ្វាយ និងឡដុត" } },
  { keyId: "ir", en: "Infrared", kh: "អ៊ីនហ្វ្រារ៉េដ", fill: "#dc2626", text: "#fee2e2", flex: 1.0, example: { en: "Heat & remotes", kh: "កម្ដៅ និងរីម៉ូត" } },
  { keyId: "visible", en: "Visible Light", kh: "ពន្លឺមើលឃើញ", fill: "#visible-grad", text: "#0f172a", flex: 0.8, example: { en: "What our eyes see", kh: "អ្វីដែលភ្នែកយើងឃើញ" } },
  { keyId: "uv", en: "UV", kh: "យូវី", fill: "#6d28d9", text: "#ede9fe", flex: 0.8, example: { en: "Sunburn", kh: "ការដុតពីព្រះអាទិត្យ" } },
  { keyId: "xray", en: "X-rays", kh: "កាំរស្មីអ៊ិច", fill: "#3730a3", text: "#c7d2fe", flex: 0.9, example: { en: "Hospital scans", kh: "ការស្កេនមន្ទីរពេទ្យ" } },
  { keyId: "gamma", en: "Gamma", kh: "ហ្គាម៉ា", fill: "#1e1b4b", text: "#a5b4fc", flex: 0.9, example: { en: "From outer space", kh: "មកពីលំហអាកាសខាងក្រៅ" } },
];

function EMSpectrumCard({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <section id="optics" className="relative rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden mb-10 scroll-mt-24" style={CARD_BG}>
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Radio className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("Spectrum map", "ផែនទីវិសាលគម")}
            </div>
            <h3 className={`text-lg sm:text-xl font-bold text-indigo-950 leading-tight ${kh ? "font-khmer" : ""}`}>
              {t("All light is the same — only the wavelength changes", "ពន្លឺទាំងអស់គឺដូចគ្នា — មានតែរលកប្រវែងផ្លាស់ប្ដូរ")}
            </h3>
          </div>
        </div>

        {/* axis labels */}
        <div className="flex items-center justify-between mb-1 px-1">
          <div className={`text-[10px] font-mono uppercase tracking-widest text-indigo-700 flex items-center gap-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            <span>← {t("Long λ · low energy", "λ វែង · ថាមពលទាប")}</span>
          </div>
          <div className={`text-[10px] font-mono uppercase tracking-widest text-indigo-700 flex items-center gap-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            <span>{t("Short λ · high energy", "λ ខ្លី · ថាមពលខ្ពស់")} →</span>
          </div>
        </div>

        {/* The spectrum bar */}
        <div className="rounded-xl overflow-hidden border-2 border-slate-300 shadow-inner">
          <svg viewBox="0 0 600 60" className="w-full h-12 sm:h-14 block" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="visible-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="20%" stopColor="#f97316" />
                <stop offset="40%" stopColor="#eab308" />
                <stop offset="55%" stopColor="#16a34a" />
                <stop offset="75%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            {(() => {
              const totalFlex = BANDS.reduce((s, b) => s + b.flex, 0);
              let cursor = 0;
              return BANDS.map((b) => {
                const w = (b.flex / totalFlex) * 600;
                const x = cursor;
                cursor += w;
                const fill = b.fill === "#visible-grad" ? "url(#visible-grad)" : b.fill;
                return <rect key={b.keyId} x={x} y={0} width={w} height={60} fill={fill} />;
              });
            })()}
          </svg>
        </div>

        {/* Band labels under */}
        <div className="grid grid-cols-7 gap-0.5 mt-1.5">
          {BANDS.map((b) => (
            <div key={b.keyId} className="text-center min-w-0">
              <div className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-tight text-slate-700 truncate ${b.keyId === "visible" ? "text-violet-700" : ""} ${kh ? "font-khmer normal-case tracking-normal" : ""}`} title={kh ? b.kh : b.en}>
                {kh ? b.kh : b.en}
              </div>
            </div>
          ))}
        </div>

        {/* Visible light highlight */}
        <div className="mt-5 rounded-xl border-2 border-violet-400 bg-gradient-to-br from-violet-50 to-indigo-50 p-4 grid sm:grid-cols-[auto_1fr] gap-4 items-center">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 via-yellow-400 to-cyan-500 flex items-center justify-center">
            <Eye className="w-6 h-6 text-white drop-shadow" />
          </div>
          <div>
            <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-violet-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {t("The visible window", "បង្អួចមើលឃើញ")}
            </div>
            <h4 className={`text-base sm:text-lg font-bold text-violet-900 leading-tight mb-1 ${kh ? "font-khmer" : ""}`}>
              {t("Only this thin slice is visible to our eyes", "មានតែបន្ទះស្ដើងនេះប៉ុណ្ណោះ ដែលភ្នែកយើងអាចមើលឃើញ")}
            </h4>
            <p className={`text-sm text-slate-700 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Our eyes detect wavelengths from about 400 nm (violet) to 700 nm — a tiny window in a vast spectrum that bees, snakes and astronomers see far beyond.",
                "ភ្នែករបស់យើងមើលឃើញរលកប្រវែងពីប្រហែល ៤០០ ណាណូម៉ែត្រ (ស្វាយ) ដល់ ៧០០ — បង្អួចតូចមួយ ក្នុងវិសាលគមធំធេង ដែលឃ្មុំ ពស់ និងតារាវិទូ មើលឃើញឆ្ងាយជាងនេះ។",
              )}
            </p>
          </div>
        </div>

        {/* Examples row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-4">
          {BANDS.map((b) => (
            <div key={b.keyId} className="rounded-md bg-slate-50 border border-slate-200 px-2 py-1.5">
              <div className={`text-[9px] font-mono uppercase tracking-widest text-slate-500 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>{kh ? b.kh : b.en}</div>
              <div className={`text-xs font-semibold text-slate-800 ${kh ? "font-khmer leading-loose" : ""}`}>{kh ? b.example.kh : b.example.en}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Optics: Reflection & Refraction ───────────────────────────────────────
function OpticsCards({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-2">
      {/* Reflection */}
      <article className="relative rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden flex flex-col" style={CARD_BG}>
        <CornerMarks subtle />
        <div className="relative p-5 sm:p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Reflection", "ការជះត្រឡប់")}
              </div>
              <h3 className={`text-lg font-bold text-indigo-950 ${kh ? "font-khmer" : ""}`}>
                {t("Light bounces off — angle in = angle out", "ពន្លឺលោតត្រឡប់ — មុំចូល = មុំចេញ")}
              </h3>
            </div>
          </div>
          <div className="rounded-lg bg-indigo-50/60 border border-indigo-200 p-3 mb-3 flex items-center justify-center min-h-[140px]">
            <ReflectionSvg />
          </div>
          <p className={`text-sm text-foreground/80 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "When light hits a smooth surface like a mirror or still water, it bounces off at the same angle. That's why you can see your face in a polished spoon.",
              "នៅពេលពន្លឺប៉ះផ្ទៃរលោងដូចជាកញ្ចក់ ឬទឹកស្ងប់ វាលោតត្រឡប់នៅមុំដូចគ្នា។ នោះហើយជាហេតុដែលអ្នកអាចមើលឃើញមុខរបស់អ្នកក្នុងស្លាបព្រាដែលរលោង។",
            )}
          </p>
        </div>
      </article>

      {/* Refraction */}
      <article className="relative rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden flex flex-col" style={CARD_BG}>
        <CornerMarks subtle />
        <div className="relative p-5 sm:p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {t("Refraction", "ការចំណាំងបែរ")}
              </div>
              <h3 className={`text-lg font-bold text-indigo-950 ${kh ? "font-khmer" : ""}`}>
                {t("Light bends when it changes medium", "ពន្លឺបត់ បែននៅពេលផ្លាស់ប្ដូរមជ្ឈដ្ឋាន")}
              </h3>
            </div>
          </div>
          <div className="rounded-lg bg-indigo-50/60 border border-indigo-200 p-3 mb-3 flex items-center justify-center min-h-[140px]">
            <RefractionSvg />
          </div>
          <p className={`text-sm text-foreground/80 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh
              ? "ការចំណាំងបែរ គឺជាមូលហេតុដែលទុយោបឺតមើលទៅដូចជា 'បាក់' នៅក្នុងកែវទឹក។ ពន្លឺធ្វើដំណើរយឺត និងបត់បែននៅពេលវាចូលទៅក្នុងមជ្ឈដ្ឋានថ្មី។"
              : "Refraction is why a straw looks 'broken' in a glass of water. Light slows down and bends when it enters a new material."}
          </p>
        </div>
      </article>
    </div>
  );
}

function ReflectionSvg() {
  return (
    <svg viewBox="0 0 220 130" className="w-full h-32" aria-hidden="true">
      {/* mirror surface */}
      <line x1="10" y1="100" x2="210" y2="100" stroke="#475569" strokeWidth="2" />
      <pattern id="mirror-hatch" patternUnits="userSpaceOnUse" width="6" height="6"><path d="M0,6 L6,0" stroke="#94a3b8" strokeWidth="0.6" /></pattern>
      <rect x="10" y="100" width="200" height="14" fill="url(#mirror-hatch)" />
      {/* normal */}
      <line x1="110" y1="100" x2="110" y2="20" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
      {/* incoming ray */}
      <line x1="40" y1="20" x2="110" y2="100" stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#refl-arr-i)" />
      {/* reflected ray */}
      <line x1="110" y1="100" x2="180" y2="20" stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#refl-arr-r)" />
      <defs>
        <marker id="refl-arr-i" markerWidth="7" markerHeight="7" refX="3" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#7c3aed" /></marker>
        <marker id="refl-arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#7c3aed" /></marker>
      </defs>
      <text x="58" y="52" fontSize="9" fill="#7c3aed" fontFamily="monospace" fontWeight="bold">θ₁</text>
      <text x="148" y="52" fontSize="9" fill="#7c3aed" fontFamily="monospace" fontWeight="bold">θ₂</text>
      <text x="110" y="14" fontSize="8" fill="#475569" fontFamily="monospace" textAnchor="middle">NORMAL</text>
      <text x="110" y="126" fontSize="9" fill="#0f172a" fontFamily="monospace" textAnchor="middle" fontWeight="bold">θ₁ = θ₂</text>
    </svg>
  );
}

function RefractionSvg() {
  // Glass with water + straw bent at the surface
  return (
    <svg viewBox="0 0 220 140" className="w-full h-32" aria-hidden="true">
      {/* glass body */}
      <path d="M 70 22 L 80 122 L 160 122 L 170 22 Z" fill="none" stroke="#475569" strokeWidth="2" />
      {/* water */}
      <path d="M 75 60 L 165 60 L 158 122 L 82 122 Z" fill="#bae6fd" opacity="0.55" />
      <line x1="75" y1="60" x2="165" y2="60" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="56" fontSize="8" fill="#0ea5e9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">WATER LINE</text>
      {/* straw — top piece (above water) */}
      <line x1="100" y1="8" x2="120" y2="60" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
      {/* straw — bottom piece (in water) — shifted to the right to look 'broken' */}
      <line x1="135" y1="60" x2="148" y2="115" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      {/* light bending arrows */}
      <line x1="178" y1="40" x2="200" y2="50" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#refr-arr)" />
      <text x="194" y="36" fontSize="9" fill="#7c3aed" fontFamily="monospace" fontWeight="bold">light</text>
      <defs>
        <marker id="refr-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#7c3aed" /></marker>
      </defs>
      {/* "broken" caption */}
      <text x="172" y="92" fontSize="9" fill="#dc2626" fontFamily="monospace" fontWeight="bold">"BROKEN"</text>
      <line x1="170" y1="86" x2="148" y2="86" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 5. The Physics of Glasses — clinical optometrist sub-section
// ─────────────────────────────────────────────────────────────────────────
// Aesthetic: clean clinical white-on-soft cards, light-blue tinted glass
// lens shapes, glowing yellow/green neon light rays.
// Reusable colours
const RAY = "#facc15";          // glowing yellow light
const RAY_FIX = "#22c55e";      // green ray after correction
const LENS_FILL = "rgba(56, 189, 248, 0.18)";
const LENS_STROKE = "#0ea5e9";
const RETINA = "#be185d";

function GlassesSubsection({ kh, t }: { kh: boolean; t: (en: string, kh: string) => string }) {
  return (
    <div className="space-y-5">
      {/* Intro */}
      <p className={`text-sm sm:text-base text-foreground/80 leading-relaxed max-w-3xl ${kh ? "font-khmer leading-loose" : ""}`}>
        {t(
          "Your eye is a tiny camera. Light bends through the cornea and lens, and a clear image lands on the retina at the back. When the focus point is even slightly off, the world looks blurry — and a pair of glasses, just two carefully-shaped pieces of glass, can put it back in place.",
          "ភ្នែករបស់អ្នកគឺជាកាមេរ៉ាតូចមួយ។ ពន្លឺបត់ឆ្លងកាត់ភ្នែកស (cornea) និងកញ្ចក់ភ្នែក (lens) ហើយរូបភាពច្បាស់លាស់ចុះនៅលើភ្នាសភ្នែក (retina) នៅខាងក្រោយ។ ពេលចំណុចផ្តោតបែកបន្តិច ពិភពលោកមើលទៅព្រិលៗ — ហើយវ៉ែនតាមួយគូ ដែលគ្រាន់តែជាកញ្ចក់រូបរាងសមរម្យពីរ អាចដាក់វាត្រឡប់មកវិញ។"
        )}
      </p>

      {/* 5.1 Anatomy of focus — Normal eye */}
      <ClinicalCard
        tagEn="Step 1 · Anatomy"
        tagKh="ជំហាន ១ · កាយវិភាគ"
        titleEn="The anatomy of focus — a healthy eye"
        titleKh="កាយវិភាគនៃការផ្តោត — ភ្នែកធម្មតា"
        bodyEn="In a healthy eye, parallel light rays from a distant object pass through the cornea and the lens, which bend them inward. They meet at exactly one point — the fovea on the retina — and the brain reads a sharp image."
        bodyKh="នៅក្នុងភ្នែកធម្មតា ពន្លឺពីវត្ថុឆ្ងាយឆ្លងកាត់ភ្នែកស និងកញ្ចក់ភ្នែក ដែលបត់វាចូលក្នុង។ ពន្លឺជួបគ្នានៅចំណុចតែមួយ — fovea នៅលើភ្នាសភ្នែក — ហើយខួរក្បាលអានរូបភាពច្បាស់។"
      >
        <NormalEyeSvg kh={kh} />
      </ClinicalCard>

      {/* 5.2 Two errors side-by-side */}
      <div>
        <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {t("Step 2 · The two common errors", "ជំហាន ២ · កំហុសទូទៅទាំងពីរ")}
        </div>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          <ErrorCard
            colour="#2563eb"
            tagEn="Refractive error · Myopia"
            tagKh="កំហុសចំណាំងបែរ · ភ្នែកមីញ៉ូប"
            titleEn="Myopia — Nearsightedness"
            titleKh="ភ្នែកមីញ៉ូប — មើលឆ្ងាយមិនច្បាស់"
            problemEn="The eyeball is slightly too long. Light from far-away objects converges before it reaches the retina, so the image lands short."
            problemKh="ដួងភ្នែកវែងបន្តិច។ ពន្លឺពីវត្ថុឆ្ងាយជួបគ្នាមុនពេលឆ្ពោះដល់ភ្នាសភ្នែក ដូច្នេះរូបភាពធ្លាក់ខ្លី។"
            tellEn="Distant boards look blurry; reading up close is fine."
            tellKh="ក្តារនៅឆ្ងាយមើលទៅព្រិលៗ; អានជិតមើលឃើញធម្មតា។"
          >
            <MyopiaSvg kh={kh} />
          </ErrorCard>

          <ErrorCard
            colour="#c026d3"
            tagEn="Refractive error · Hyperopia"
            tagKh="កំហុសចំណាំងបែរ · ភ្នែកឆ្ងាយ"
            titleEn="Hyperopia — Farsightedness"
            titleKh="ភ្នែកឆ្ងាយ — មើលជិតមិនច្បាស់"
            problemEn="The eyeball is slightly too short. Light has not yet finished converging when it hits the retina, so the focus point falls behind it."
            problemKh="ដួងភ្នែកខ្លីបន្តិច។ ពន្លឺមិនទាន់បានជួបគ្នាពេញលេញនៅពេលប៉ះភ្នាសភ្នែក ដូច្នេះចំណុចផ្តោតធ្លាក់នៅខាងក្រោយវា។"
            tellEn="Reading a book up close looks blurry; far objects are easier."
            tellKh="អានសៀវភៅជិតមើលទៅព្រិលៗ; វត្ថុឆ្ងាយមើលងាយជាង។"
          >
            <HyperopiaSvg kh={kh} />
          </ErrorCard>
        </div>
      </div>

      {/* 5.3 The lens solution */}
      <div>
        <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {t("Step 3 · The refraction solution", "ជំហាន ៣ · ដំណោះស្រាយដោយការចំណាំងបែរ")}
        </div>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          <SolutionCard
            icon={Minus}
            tagEn="Concave lens · diverging"
            tagKh="ឡង់ទីផត · ផ្តាច់ពន្លឺ"
            titleEn="Concave lens fixes Myopia"
            titleKh="ឡង់ទីផតកែភ្នែកមីញ៉ូប"
            bodyEn="A concave lens is thinner in the middle than at the edges. It spreads light rays outward before they enter the eye. By 'pre-diverging' the light, the eye's own lens then focuses it slightly later — exactly onto the retina."
            bodyKh="ឡង់ទីផតគឺស្តើងនៅកណ្តាលជាងគែម។ វាផ្តាច់ពន្លឺឱ្យរាលចេញមុនពេលចូលភ្នែក។ ដោយ 'ផ្តាច់មុន' ពន្លឺ កញ្ចក់ភ្នែករបស់អ្នកផ្តោតវាបន្តិចក្រោយ — ត្រឹមត្រូវនៅលើភ្នាសភ្នែក។"
          >
            <ConcaveSvg kh={kh} />
          </SolutionCard>

          <SolutionCard
            icon={Plus}
            tagEn="Convex lens · converging"
            tagKh="ឡង់ទីប៉ោង · បង្រួមពន្លឺ"
            titleEn="Convex lens fixes Hyperopia"
            titleKh="ឡង់ទីប៉ោងកែភ្នែកឆ្ងាយ"
            bodyEn="A convex lens is thicker in the middle. It bends light rays inward, helping them start to converge before they reach the eye. The eye's own lens then completes the job — pulling the focal point forward onto the retina."
            bodyKh="ឡង់ទីប៉ោងគឺក្រាស់នៅកណ្តាល។ វាបត់ពន្លឺចូលក្នុង ជួយឱ្យពួកវាចាប់ផ្តើមជួបគ្នាមុនឆ្ពោះដល់ភ្នែក។ កញ្ចក់ភ្នែកបញ្ចប់ការងារ — ទាញចំណុចផ្តោតមកមុខលើភ្នាសភ្នែក។"
          >
            <ConvexSvg kh={kh} />
          </SolutionCard>
        </div>
      </div>

      {/* Summary mini key */}
      <article className="relative rounded-2xl border-2 border-indigo-300 bg-white/95 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 mb-2 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Optometrist's quick key", "សោរខ្លីរបស់អ្នកវែកតាភ្នែក")}
          </div>
          <ul className={`text-sm text-foreground/80 leading-relaxed space-y-1 ${kh ? "font-khmer leading-loose" : ""}`}>
            <li className="flex items-start gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0 shadow-[0_0_6px_rgba(250,204,21,0.9)]" />
              <span>{t("Yellow rays = light from the world entering your eye.", "ពន្លឺពណ៌លឿង = ពន្លឺពីពិភពលោកចូលភ្នែក។")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0 shadow-[0_0_6px_rgba(34,197,94,0.9)]" />
              <span>{t("Green rays = light after a corrective lens has bent it.", "ពន្លឺពណ៌បៃតង = ពន្លឺក្រោយពេលឡង់កែបានបត់វា។")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-pink-700 mt-1.5 flex-shrink-0" />
              <span>{t("Pink line = the retina, the 'screen' rays must hit exactly.", "ខ្សែពណ៌ផ្កាឈូក = ភ្នាសភ្នែក 'អេក្រង់' ដែលពន្លឺត្រូវប៉ះត្រឹមត្រូវ។")}</span>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}

// ── Card shells ──────────────────────────────────────────────────────────
function ClinicalCard({
  tagEn, tagKh, titleEn, titleKh, bodyEn, bodyKh, children,
}: {
  tagEn: string; tagKh: string; titleEn: string; titleKh: string;
  bodyEn: string; bodyKh: string; children: React.ReactNode;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <article className="relative rounded-2xl border-2 border-indigo-300 bg-white/95 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 grid md:grid-cols-[minmax(0,1fr)_280px] gap-4 items-center">
        <div>
          <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? tagKh : tagEn}
          </div>
          <h3 className={`text-lg font-bold text-indigo-950 mb-2 ${kh ? "font-khmer" : ""}`}>
            {kh ? titleKh : titleEn}
          </h3>
          <p className={`text-sm text-foreground/80 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
            {kh ? bodyKh : bodyEn}
          </p>
        </div>
        <div className="rounded-lg bg-slate-900 border border-indigo-200 p-3 flex items-center justify-center">
          {children}
        </div>
      </div>
    </article>
  );
}

function ErrorCard({
  colour, tagEn, tagKh, titleEn, titleKh, problemEn, problemKh, tellEn, tellKh, children,
}: {
  colour: string;
  tagEn: string; tagKh: string; titleEn: string; titleKh: string;
  problemEn: string; problemKh: string; tellEn: string; tellKh: string;
  children: React.ReactNode;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <article className="relative rounded-2xl border-2 bg-white/95 shadow-sm overflow-hidden flex flex-col" style={{ borderColor: colour }}>
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-1 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`} style={{ color: colour }}>
          {kh ? tagKh : tagEn}
        </div>
        <h4 className={`text-lg font-bold text-indigo-950 mb-2 ${kh ? "font-khmer" : ""}`}>
          {kh ? titleKh : titleEn}
        </h4>
        <div className="rounded-lg bg-slate-900 border border-indigo-200 p-3 mb-3 flex items-center justify-center min-h-[150px]">
          {children}
        </div>
        <p className={`text-sm text-foreground/80 leading-relaxed mb-2 ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? problemKh : problemEn}
        </p>
        <div className="mt-auto pt-2 border-t border-dashed border-slate-200">
          <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-slate-500 mb-0.5 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {kh ? "សញ្ញាប្រាប់" : "Tell-tale sign"}
          </div>
          <p className={`text-sm text-foreground/75 italic ${kh ? "font-khmer not-italic" : ""}`}>
            {kh ? tellKh : tellEn}
          </p>
        </div>
      </div>
    </article>
  );
}

function SolutionCard({
  icon: Icon, tagEn, tagKh, titleEn, titleKh, bodyEn, bodyKh, children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tagEn: string; tagKh: string; titleEn: string; titleKh: string;
  bodyEn: string; bodyKh: string; children: React.ReactNode;
}) {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  return (
    <article className="relative rounded-2xl border-2 border-emerald-400 bg-white/95 shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-emerald-700 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {kh ? tagKh : tagEn}
            </div>
            <h4 className={`text-base sm:text-lg font-bold text-indigo-950 ${kh ? "font-khmer" : ""}`}>
              {kh ? titleKh : titleEn}
            </h4>
          </div>
        </div>
        <div className="rounded-lg bg-slate-900 border border-indigo-200 p-3 mb-3 flex items-center justify-center min-h-[160px]">
          {children}
        </div>
        <p className={`text-sm text-foreground/80 leading-relaxed ${kh ? "font-khmer leading-loose" : ""}`}>
          {kh ? bodyKh : bodyEn}
        </p>
      </div>
    </article>
  );
}

// ── SVG diagrams ─────────────────────────────────────────────────────────
// Bilingual SVG label helper
function L(en: string, kh: string, isKh: boolean): string {
  return isKh ? kh : en;
}

function EyeShape({
  cx, cy, rx, ry, retinaShift = 0,
}: {
  cx: number; cy: number; rx: number; ry: number; retinaShift?: number;
}) {
  return (
    <g>
      {/* eyeball */}
      <ellipse cx={cx + retinaShift / 2} cy={cy} rx={rx + retinaShift / 2} ry={ry} fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.2" />
      {/* cornea bulge */}
      <path d={`M ${cx - rx - 4} ${cy - 10} Q ${cx - rx - 12} ${cy} ${cx - rx - 4} ${cy + 10}`} fill="rgba(56,189,248,0.25)" stroke="#7dd3fc" strokeWidth="1.2" />
      {/* lens (inner) */}
      <ellipse cx={cx - rx + 8} cy={cy} rx="5" ry={ry * 0.55} fill="rgba(125,211,252,0.45)" stroke="#7dd3fc" strokeWidth="1" />
      {/* retina arc on the back */}
      <path
        d={`M ${cx + rx + retinaShift - 2} ${cy - ry + 6} Q ${cx + rx + retinaShift + 4} ${cy} ${cx + rx + retinaShift - 2} ${cy + ry - 6}`}
        fill="none"
        stroke={RETINA}
        strokeWidth="2.5"
      />
      {/* optic nerve stub */}
      <path d={`M ${cx + rx + retinaShift - 2} ${cy + ry - 4} L ${cx + rx + retinaShift + 8} ${cy + ry + 6}`} stroke="#94a3b8" strokeWidth="1.5" />
    </g>
  );
}

function GlowingRay({
  d, color = RAY, dashed = false,
}: { d: string; color?: string; dashed?: boolean }) {
  return (
    <g style={{ filter: `drop-shadow(0 0 3px ${color})` }}>
      <path d={d} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray={dashed ? "3 3" : undefined} />
    </g>
  );
}

function NormalEyeSvg({ kh }: { kh: boolean }) {
  // viewBox: 280 wide, 170 tall. Eye centre (170, 85), rx 50, ry 38.
  const cx = 170, cy = 85, rx = 50, ry = 38;
  const focusX = cx + rx - 4; // exactly on retina
  return (
    <svg viewBox="0 0 280 170" className="w-full h-auto" role="img" aria-label={kh ? "ភ្នែកធម្មតា" : "Healthy eye focusing light on the retina"}>
      <defs>
        <pattern id="eye-grid-1" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(125,211,252,0.07)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="280" height="170" fill="url(#eye-grid-1)" />
      {/* incoming parallel rays from far left */}
      <GlowingRay d={`M 10 50 L ${cx - rx - 6} 50`} />
      <GlowingRay d={`M 10 85 L ${cx - rx - 6} 85`} />
      <GlowingRay d={`M 10 120 L ${cx - rx - 6} 120`} />
      {/* converging rays inside the eye → all meet at focusX, cy on retina */}
      <GlowingRay d={`M ${cx - rx - 6} 50 L ${focusX} ${cy}`} />
      <GlowingRay d={`M ${cx - rx - 6} 85 L ${focusX} ${cy}`} />
      <GlowingRay d={`M ${cx - rx - 6} 120 L ${focusX} ${cy}`} />
      <EyeShape cx={cx} cy={cy} rx={rx} ry={ry} />
      {/* focus point */}
      <circle cx={focusX} cy={cy} r="3.5" fill={RAY} style={{ filter: `drop-shadow(0 0 5px ${RAY})` }} />
      {/* labels */}
      <text x={cx - rx - 14} y={20} fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill="#7dd3fc" fontWeight="bold">{L("CORNEA", "ភ្នែកស", kh)}</text>
      <text x={cx - rx + 8} y={155} fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill="#7dd3fc" textAnchor="middle" fontWeight="bold">{L("LENS", "កញ្ចក់ភ្នែក", kh)}</text>
      <text x={cx + rx + 6} y={20} fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill={RETINA} fontWeight="bold">{L("RETINA", "ភ្នាសភ្នែក", kh)}</text>
      <text x={focusX + 6} y={cy + 3} fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill={RAY} fontWeight="bold">{L("SHARP FOCUS", "ផ្តោតច្បាស់", kh)}</text>
    </svg>
  );
}

function MyopiaSvg({ kh }: { kh: boolean }) {
  // Eyeball is too long → focus point falls in front of retina.
  const cx = 160, cy = 85, rx = 50, ry = 38;
  const stretched = 14;            // extra length backwards
  const focusX = cx + rx - 16;     // before retina
  return (
    <svg viewBox="0 0 290 170" className="w-full h-auto" role="img" aria-label={kh ? "ភ្នែកមីញ៉ូប" : "Myopic eye — focus falls in front of the retina"}>
      <defs>
        <pattern id="eye-grid-2" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(125,211,252,0.07)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="290" height="170" fill="url(#eye-grid-2)" />
      <GlowingRay d={`M 10 55 L ${cx - rx - 6} 55`} />
      <GlowingRay d={`M 10 85 L ${cx - rx - 6} 85`} />
      <GlowingRay d={`M 10 115 L ${cx - rx - 6} 115`} />
      {/* converge early */}
      <GlowingRay d={`M ${cx - rx - 6} 55 L ${focusX} ${cy}`} />
      <GlowingRay d={`M ${cx - rx - 6} 85 L ${focusX} ${cy}`} />
      <GlowingRay d={`M ${cx - rx - 6} 115 L ${focusX} ${cy}`} />
      {/* and then diverge back out toward (and past) retina */}
      <GlowingRay d={`M ${focusX} ${cy} L ${cx + rx + stretched - 2} ${cy - 14}`} dashed />
      <GlowingRay d={`M ${focusX} ${cy} L ${cx + rx + stretched - 2} ${cy + 14}`} dashed />
      <EyeShape cx={cx} cy={cy} rx={rx} ry={ry} retinaShift={stretched} />
      {/* focus marker */}
      <circle cx={focusX} cy={cy} r="3.5" fill={RAY} style={{ filter: `drop-shadow(0 0 5px ${RAY})` }} />
      {/* problem caption */}
      <text x={focusX} y={cy - 8} fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle" fontWeight="bold">{L("FOCUS TOO EARLY", "ផ្តោតមុនពេល", kh)}</text>
      <text x={cx + rx + stretched + 4} y={20} fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill={RETINA} fontWeight="bold">{L("RETINA", "ភ្នាសភ្នែក", kh)}</text>
      <text x={20} y={155} fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill="#94a3b8">{L("Eyeball too long", "ដួងភ្នែកវែងពេក", kh)}</text>
    </svg>
  );
}

function HyperopiaSvg({ kh }: { kh: boolean }) {
  // Eyeball is too short → focus point would land behind retina.
  const cx = 160, cy = 85, rx = 50, ry = 38;
  const shortened = -10;   // shorter back
  const retinaX = cx + rx + shortened - 2;
  const focusX = cx + rx + 14; // would-be focus point past the back wall
  return (
    <svg viewBox="0 0 290 170" className="w-full h-auto" role="img" aria-label={kh ? "ភ្នែកឆ្ងាយ" : "Hyperopic eye — focus would fall behind the retina"}>
      <defs>
        <pattern id="eye-grid-3" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(125,211,252,0.07)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="290" height="170" fill="url(#eye-grid-3)" />
      <GlowingRay d={`M 10 60 L ${cx - rx - 6} 60`} />
      <GlowingRay d={`M 10 85 L ${cx - rx - 6} 85`} />
      <GlowingRay d={`M 10 110 L ${cx - rx - 6} 110`} />
      {/* converging slowly — at the retina they're still well above/below the centre */}
      <GlowingRay d={`M ${cx - rx - 6} 60 L ${retinaX} ${cy - 8}`} />
      <GlowingRay d={`M ${cx - rx - 6} 85 L ${retinaX} ${cy}`} />
      <GlowingRay d={`M ${cx - rx - 6} 110 L ${retinaX} ${cy + 8}`} />
      {/* dashed continuation past the eye showing where they would meet */}
      <GlowingRay d={`M ${retinaX} ${cy - 8} L ${focusX} ${cy}`} dashed />
      <GlowingRay d={`M ${retinaX} ${cy + 8} L ${focusX} ${cy}`} dashed />
      <EyeShape cx={cx} cy={cy} rx={rx} ry={ry} retinaShift={shortened} />
      {/* would-be focus point */}
      <circle cx={focusX} cy={cy} r="3.5" fill="none" stroke={RAY} strokeWidth="1.5" strokeDasharray="2 2" />
      <text x={focusX} y={cy - 8} fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle" fontWeight="bold">{L("FOCUS TOO LATE", "ផ្តោតយឺតពេល", kh)}</text>
      <text x={retinaX + 4} y={20} fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill={RETINA} fontWeight="bold">{L("RETINA", "ភ្នាសភ្នែក", kh)}</text>
      <text x={20} y={155} fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill="#94a3b8">{L("Eyeball too short", "ដួងភ្នែកខ្លីពេក", kh)}</text>
    </svg>
  );
}

// Concave lens (biconcave) — thin in the middle. Diverges parallel rays.
function ConcaveSvg({ kh }: { kh: boolean }) {
  const lensCx = 110, lensCy = 95;
  // Lens path: two arcs curving inward
  const lensPath = `M ${lensCx - 8} ${lensCy - 38} Q ${lensCx + 4} ${lensCy} ${lensCx - 8} ${lensCy + 38} L ${lensCx + 8} ${lensCy + 38} Q ${lensCx - 4} ${lensCy} ${lensCx + 8} ${lensCy - 38} Z`;
  // Eye behind lens (myopic — elongated)
  const cx = 240, cy = 95, rx = 40, ry = 32;
  const stretched = 12;
  // Retina is at cx + rx + stretched - 2 = 290.
  // Pre-divergence pushes focus back so it lands EXACTLY on the retina.
  const focusX = cx + rx + stretched - 2;
  return (
    <svg viewBox="0 0 360 190" className="w-full h-auto" role="img" aria-label={kh ? "ឡង់ទីផតកែភ្នែកមីញ៉ូប" : "Concave lens correcting myopia"}>
      <defs>
        <pattern id="eye-grid-4" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(125,211,252,0.07)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="360" height="190" fill="url(#eye-grid-4)" />

      {/* Incoming parallel yellow rays */}
      <GlowingRay d={`M 6 60 L ${lensCx - 4} 60`} />
      <GlowingRay d={`M 6 95 L ${lensCx - 4} 95`} />
      <GlowingRay d={`M 6 130 L ${lensCx - 4} 130`} />

      {/* Lens (light blue glass) */}
      <path d={lensPath} fill={LENS_FILL} stroke={LENS_STROKE} strokeWidth="1.5" />
      <text x={lensCx} y={lensCy + 56} fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill={LENS_STROKE} textAnchor="middle" fontWeight="bold">{L("CONCAVE", "ឡង់ទីផត", kh)}</text>

      {/* Diverging green rays after the lens (spread further apart) */}
      <GlowingRay color={RAY_FIX} d={`M ${lensCx + 4} 60 L ${cx - rx - 6} 45`} />
      <GlowingRay color={RAY_FIX} d={`M ${lensCx + 4} 95 L ${cx - rx - 6} 95`} />
      <GlowingRay color={RAY_FIX} d={`M ${lensCx + 4} 130 L ${cx - rx - 6} 145`} />

      {/* Inside the eye — eye's lens converges them, focus lands on retina */}
      <GlowingRay color={RAY_FIX} d={`M ${cx - rx - 6} 45 L ${focusX} ${cy}`} />
      <GlowingRay color={RAY_FIX} d={`M ${cx - rx - 6} 95 L ${focusX} ${cy}`} />
      <GlowingRay color={RAY_FIX} d={`M ${cx - rx - 6} 145 L ${focusX} ${cy}`} />

      <EyeShape cx={cx} cy={cy} rx={rx} ry={ry} retinaShift={stretched} />
      {/* corrected focus — exactly on retina */}
      <circle cx={focusX} cy={cy} r="3.5" fill={RAY_FIX} style={{ filter: `drop-shadow(0 0 6px ${RAY_FIX})` }} />
      <text x={focusX - 4} y={cy - 8} fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill={RAY_FIX} textAnchor="end" fontWeight="bold">{L("ON RETINA", "នៅលើភ្នាសភ្នែក", kh)}</text>
    </svg>
  );
}

// Convex lens (biconvex) — thick in the middle. Converges parallel rays.
function ConvexSvg({ kh }: { kh: boolean }) {
  const lensCx = 110, lensCy = 95;
  const lensPath = `M ${lensCx} ${lensCy - 40} Q ${lensCx + 14} ${lensCy} ${lensCx} ${lensCy + 40} Q ${lensCx - 14} ${lensCy} ${lensCx} ${lensCy - 40} Z`;
  const cx = 240, cy = 95, rx = 40, ry = 32;
  const shortened = -8;
  const retinaX = cx + rx + shortened - 2;
  return (
    <svg viewBox="0 0 360 190" className="w-full h-auto" role="img" aria-label={kh ? "ឡង់ទីប៉ោងកែភ្នែកឆ្ងាយ" : "Convex lens correcting hyperopia"}>
      <defs>
        <pattern id="eye-grid-5" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(125,211,252,0.07)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="360" height="190" fill="url(#eye-grid-5)" />

      {/* Incoming parallel yellow rays */}
      <GlowingRay d={`M 6 60 L ${lensCx - 6} 60`} />
      <GlowingRay d={`M 6 95 L ${lensCx - 6} 95`} />
      <GlowingRay d={`M 6 130 L ${lensCx - 6} 130`} />

      {/* Lens */}
      <path d={lensPath} fill={LENS_FILL} stroke={LENS_STROKE} strokeWidth="1.5" />
      <text x={lensCx} y={lensCy + 58} fontSize="9" fontFamily={kh ? "inherit" : "monospace"} fill={LENS_STROKE} textAnchor="middle" fontWeight="bold">{L("CONVEX", "ឡង់ទីប៉ោង", kh)}</text>

      {/* Pre-converging green rays */}
      <GlowingRay color={RAY_FIX} d={`M ${lensCx + 6} 60 L ${cx - rx - 6} 78`} />
      <GlowingRay color={RAY_FIX} d={`M ${lensCx + 6} 95 L ${cx - rx - 6} 95`} />
      <GlowingRay color={RAY_FIX} d={`M ${lensCx + 6} 130 L ${cx - rx - 6} 112`} />

      {/* Inside eye — now finishes converging exactly on retina */}
      <GlowingRay color={RAY_FIX} d={`M ${cx - rx - 6} 78 L ${retinaX} ${cy}`} />
      <GlowingRay color={RAY_FIX} d={`M ${cx - rx - 6} 95 L ${retinaX} ${cy}`} />
      <GlowingRay color={RAY_FIX} d={`M ${cx - rx - 6} 112 L ${retinaX} ${cy}`} />

      <EyeShape cx={cx} cy={cy} rx={rx} ry={ry} retinaShift={shortened} />
      <circle cx={retinaX} cy={cy} r="3.5" fill={RAY_FIX} style={{ filter: `drop-shadow(0 0 6px ${RAY_FIX})` }} />
      <text x={retinaX - 4} y={cy - 8} fontSize="8" fontFamily={kh ? "inherit" : "monospace"} fill={RAY_FIX} textAnchor="end" fontWeight="bold">{L("ON RETINA", "នៅលើភ្នាសភ្នែក", kh)}</text>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 4b · The Mathematics of Refraction · គណិតវិទ្យានៃការចំណាំងបែរ
//
//   Two strictly-bilingual cards in a 2-col grid, placed directly below the
//   reflection / refraction visual cards. Matches the existing blueprint
//   aesthetic exactly (white CARD_BG, indigo-300 borders, CornerMarks subtle,
//   indigo→violet gradient icon chips, indigo-700 mono labels).
//
//   Card 1 — The Speed Limit of Light: introduces the index of refraction n
//            with three example materials (air, water, diamond).
//   Card 2 — Snell's Law: KaTeX block formula + bilingual symbol key.
// ════════════════════════════════════════════════════════════════════════════

function RefractionMathSubsection() {
  return (
    <div id="refraction-math" className="mt-6 mb-2 scroll-mt-24">
      {/* Sub-heading bar — same blueprint look but smaller / "·" continuation marker */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg bg-indigo-100 border-2 border-indigo-300 px-3 py-1.5 text-[10px] font-mono font-bold tracking-[0.25em] text-indigo-700">
          <span>04 · MATH</span>
          <span className="font-khmer normal-case tracking-normal text-[0.7rem]">បន្ថែម · គណិត</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-950 leading-tight">
            The Mathematics of Refraction
          </h2>
          <h3 className="font-khmer text-base sm:text-lg font-bold text-indigo-900 leading-loose">
            គណិតវិទ្យានៃការចំណាំងបែរ
          </h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
        <SpeedLimitOfLightCard />
        <SnellsLawCard />
      </div>
    </div>
  );
}

// ── Card 1 · The Speed Limit of Light ─────────────────────────────────────
function SpeedLimitOfLightCard() {
  return (
    <article
      data-testid="card-speed-limit-light"
      className="relative rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden flex flex-col"
      style={CARD_BG}
    >
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6 flex-1 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Gauge className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 flex flex-wrap gap-x-2">
              <span>Card 01 · The Concept</span>
              <span className="font-khmer normal-case tracking-normal text-xs text-indigo-800">កាត ០១ · គំនិត</span>
            </div>
            <h3 className="text-lg font-bold text-indigo-950 leading-tight">
              The Speed Limit of Light
            </h3>
            <h4 className="font-khmer text-base font-bold text-indigo-900 leading-loose">
              ល្បឿនកំណត់នៃពន្លឺ
            </h4>
          </div>
        </div>

        {/* Why light bends */}
        <div className="space-y-2">
          <p className="text-sm text-foreground/85 leading-relaxed">
            <strong>Why does light bend?</strong> Light travels at <strong>300,000&nbsp;km/s</strong> in a vacuum — but it <strong>slows down</strong> when it hits physical matter like water or glass. That change in speed is what makes it bend.
          </p>
          <p className="text-sm font-khmer text-foreground/85 leading-loose">
            <strong>ហេតុ​អ្វី​ពន្លឺ​បត់​បែន ?</strong> ពន្លឺ​ធ្វើ​ដំណើរ​ដោយ​ល្បឿន <strong>៣០០,០០០ គម/វិនាទី</strong> ក្នុង​សុញ្ញកាស — ប៉ុន្តែ​វា <strong>ដំណើរ​ការ​យឺត​ចុះ</strong> នៅ​ពេល​ប៉ះ​នឹង​វត្ថុ​ដូច​ជា​ទឹក ឬ​កែវ។ ការ​ផ្លាស់​ប្ដូរ​ល្បឿន​នេះ​ហើយ​ដែល​ធ្វើ​ឲ្យ​វា​បត់​បែន។
          </p>
        </div>

        {/* Index of refraction definition */}
        <div className="rounded-xl border-2 border-indigo-300 bg-indigo-50/80 p-3.5 space-y-2">
          <div className="flex items-center gap-2">
            <FunctionSquare className="w-5 h-5 text-indigo-700" aria-hidden="true" />
            <div className="leading-tight">
              <div className="text-sm font-bold text-indigo-950 flex flex-wrap items-baseline gap-x-1.5">
                <span>Index of Refraction</span>
                <span className="text-base"><InlineMath math="n" /></span>
              </div>
              <div className="font-khmer text-sm font-bold text-indigo-900 leading-loose">
                សន្ទស្សន៍​នៃ​ការ​ចំណាំង​បែរ <InlineMath math="n" />
              </div>
            </div>
          </div>
          <p className="text-sm text-foreground/85 leading-relaxed">
            A simple number that tells you <strong>how much a material slows light down</strong> compared to a vacuum.
          </p>
          <p className="text-sm font-khmer text-foreground/85 leading-loose">
            ជា​លេខ​ងាយ​ៗ​មួយ​ដែល​ប្រាប់​អ្នក​ថា <strong>វត្ថុ​ធាតុ​មួយ​ធ្វើ​ឲ្យ​ពន្លឺ​ដំណើរ​ការ​យឺត​ប៉ុណ្ណា</strong> ធៀប​នឹង​សុញ្ញកាស។
          </p>
        </div>

        {/* Three example materials */}
        <div className="grid grid-cols-3 gap-2.5">
          <NTile
            Icon={Wind}
            tone="sky"
            nameEn="Air"
            nameKh="ខ្យល់"
            value="1.0"
          />
          <NTile
            Icon={Droplet}
            tone="cyan"
            nameEn="Water"
            nameKh="ទឹក"
            value="1.33"
          />
          <NTile
            Icon={Diamond}
            tone="violet"
            nameEn="Diamond"
            nameKh="ពេជ្រ"
            value="2.42"
          />
        </div>

        {/* Punchline */}
        <div className="rounded-md border-l-4 border-l-indigo-600 bg-indigo-50/60 border border-indigo-200 p-2.5 text-xs text-foreground/90 leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-700" aria-hidden="true" />
          <span>
            <strong>The higher the number, the slower the light — and the sharper the bend!</strong>
            <br />
            <span className="font-khmer leading-loose">
              <strong>លេខ​កាន់​តែ​ខ្ពស់ ពន្លឺ​កាន់​តែ​យឺត — ហើយ​ការ​បត់​បែន​កាន់​តែ​ខ្លាំង !</strong>
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

function NTile({
  Icon,
  tone,
  nameEn,
  nameKh,
  value,
}: {
  Icon: typeof Gauge;
  tone: "sky" | "cyan" | "violet";
  nameEn: string;
  nameKh: string;
  value: string;
}) {
  const palette =
    tone === "sky"
      ? "border-sky-300 bg-sky-50 text-sky-900"
      : tone === "cyan"
        ? "border-cyan-300 bg-cyan-50 text-cyan-900"
        : "border-violet-300 bg-violet-50 text-violet-900";
  return (
    <div className={`rounded-lg border-2 ${palette} p-2 flex flex-col items-center text-center gap-1`}>
      <Icon className="w-4 h-4" aria-hidden="true" />
      <div className="text-xs font-bold leading-tight">{nameEn}</div>
      <div className="font-khmer text-xs font-bold leading-loose">{nameKh}</div>
      <div className="font-mono text-sm font-bold mt-0.5 flex items-baseline gap-1">
        <InlineMath math="n \\approx" />
        <span>{value}</span>
      </div>
    </div>
  );
}

// ── Card 2 · Snell's Law ──────────────────────────────────────────────────
function SnellsLawCard() {
  return (
    <article
      data-testid="card-snells-law"
      className="relative rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden flex flex-col"
      style={CARD_BG}
    >
      <CornerMarks subtle />
      <div className="relative p-5 sm:p-6 flex-1 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Sigma className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 flex flex-wrap gap-x-2">
              <span>Card 02 · The Formula</span>
              <span className="font-khmer normal-case tracking-normal text-xs text-indigo-800">កាត ០២ · រូបមន្ត</span>
            </div>
            <h3 className="text-lg font-bold text-indigo-950 leading-tight">
              Snell's Law
            </h3>
            <h4 className="font-khmer text-base font-bold text-indigo-900 leading-loose">
              ច្បាប់​ស្នែល
            </h4>
          </div>
        </div>

        {/* Historical hook */}
        <div className="space-y-2">
          <p className="text-sm text-foreground/85 leading-relaxed">
            In <strong>1621</strong>, the Dutch astronomer <strong>Willebrord Snellius</strong> figured out the exact mathematical equation that predicts how much light will bend when crossing from one material into another.
          </p>
          <p className="text-sm font-khmer text-foreground/85 leading-loose">
            នៅ​ឆ្នាំ <strong>១៦២១</strong> តារាសាស្ត្រ​ហូឡង់​ឈ្មោះ <strong>Willebrord Snellius</strong> បាន​រក​ឃើញ​សមីការ​គណិត​វិទ្យា​ដ៏​ច្បាស់​លាស់ ដែល​ទស្សន៍​ទាយ​ថា​ពន្លឺ​នឹង​បត់​បែន​ប៉ុណ្ណា​នៅ​ពេល​ឆ្លង​កាត់​ពី​វត្ថុ​ធាតុ​មួយ​ទៅ​មួយ​ទៀត។
          </p>
        </div>

        {/* The formula — KaTeX block */}
        <div className="rounded-xl border-2 border-indigo-400 bg-white p-4 shadow-inner relative">
          <div className="absolute top-2 left-2 text-[9px] font-mono font-bold tracking-widest text-indigo-500/80">
            FORMULA · រូបមន្ត
          </div>
          <div className="flex items-center justify-center min-h-[64px] py-3 text-indigo-950 text-xl">
            <BlockMath math={String.raw`n_{1} \, \sin(\theta_{1}) \;=\; n_{2} \, \sin(\theta_{2})`} />
          </div>
        </div>

        {/* Bilingual symbol key */}
        <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/40 p-3.5">
          <div className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-indigo-700 mb-2 flex flex-wrap gap-x-2">
            <span>Key — what each symbol means</span>
            <span className="font-khmer normal-case tracking-normal text-xs text-indigo-800">សោ — អត្ថន័យនៃនិមិត្តសញ្ញានីមួយៗ</span>
          </div>
          <ul className="space-y-2.5">
            <SnellKeyRow
              symbol="n_{1}"
              en="Index of refraction of the first material"
              kh="សន្ទស្សន៍​នៃ​វត្ថុ​ធាតុ​ទី​១"
            />
            <SnellKeyRow
              symbol={String.raw`\theta_{1}`}
              en="Angle in · the angle of incidence"
              kh="មុំ​ធ្លាក់ · មុំ​ដែល​ពន្លឺ​ចូល"
            />
            <SnellKeyRow
              symbol="n_{2}"
              en="Index of refraction of the second material"
              kh="សន្ទស្សន៍​នៃ​វត្ថុ​ធាតុ​ទី​២"
            />
            <SnellKeyRow
              symbol={String.raw`\theta_{2}`}
              en="Angle out · the angle of refraction"
              kh="មុំ​ចំណាំង​បែរ · មុំ​ដែល​ពន្លឺ​ចេញ"
            />
          </ul>
        </div>

        {/* Tiny worked-example hint */}
        <div className="rounded-md border-l-4 border-l-violet-600 bg-violet-50/60 border border-violet-200 p-2.5 text-xs text-foreground/90 leading-relaxed flex items-start gap-2">
          <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 text-violet-700" aria-hidden="true" />
          <span>
            Plug in the four numbers and Snell's Law tells you the <strong>exact</strong> angle the ray bends — the same equation that lets engineers design <strong>camera lenses</strong>, <strong>fibre-optic cables</strong>, and your own <strong>eyeglasses</strong>.
            <br />
            <span className="font-khmer leading-loose">
              ដាក់​លេខ​ទាំង​បួន​នេះ​ចូល ច្បាប់​ស្នែល​នឹង​ប្រាប់​អ្នក​នូវ​មុំ <strong>ច្បាស់​លាស់</strong> ដែល​ពន្លឺ​បត់ — សមីការ​ដដែល​នេះ​ហើយ​ដែល​អនុញ្ញាត​ឲ្យ​វិស្វករ​រចនា <strong>កែវ​ថត​រូប</strong> <strong>ខ្សែ​អុបទិក​ហ្វាយប័រ</strong> និង <strong>វ៉ែនតា</strong> របស់​អ្នក​ផ្ទាល់។
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

function SnellKeyRow({
  symbol,
  en,
  kh,
}: {
  symbol: string;
  en: string;
  kh: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex-shrink-0 w-12 h-12 rounded-md bg-white border-2 border-indigo-300 flex items-center justify-center text-indigo-950 text-lg shadow-sm">
        <InlineMath math={symbol} />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="text-sm text-foreground/90 leading-snug">
          <span className="text-indigo-700 font-mono mr-1.5">=</span>
          {en}
        </div>
        <div className="text-sm font-khmer text-foreground/90 leading-loose">
          <span className="text-indigo-700 font-mono mr-1.5">=</span>
          {kh}
        </div>
      </div>
    </li>
  );
}
