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
} from "lucide-react";
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
    <section className="relative rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden mb-10" style={CARD_BG}>
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
    <section className="relative rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden mb-10" style={CARD_BG}>
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
    <section className="relative rounded-2xl border-2 border-indigo-300 shadow-sm overflow-hidden mb-10" style={CARD_BG}>
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
