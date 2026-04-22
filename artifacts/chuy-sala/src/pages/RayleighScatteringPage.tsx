import { Link } from "wouter";
import {
  ArrowLeft,
  Sun,
  Sunrise,
  Waves,
  Wind,
  Zap,
  ArrowRight,
  Info,
} from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  SCI-SKY · Rayleigh Scattering: Why is the Sky Blue?
//            ការបែកខ្ចាត់ខ្ចាយរ៉េឡេ៖ ហេតុអ្វីបានជាមេឃមានពណ៌ខៀវ?
//
//  1. The Rainbow in the Sun     (white = all colors, wavelength)
//  2. The Obstacle Course        (Rayleigh, I ∝ 1/λ⁴)
//  3. The Sunset Effect          (long path, blue scattered away)
//
//  Aesthetic: airy, gradient sky-blue → sunset-orange.
// ════════════════════════════════════════════════════════════════════════════

const SPECTRUM = [
  { name: "Red",    nameKh: "ក្រហម",      hex: "#ef4444", lambda: 700 },
  { name: "Orange", nameKh: "ទឹកក្រូច",   hex: "#f97316", lambda: 620 },
  { name: "Yellow", nameKh: "លឿង",        hex: "#facc15", lambda: 580 },
  { name: "Green",  nameKh: "បៃតង",       hex: "#22c55e", lambda: 530 },
  { name: "Blue",   nameKh: "ខៀវ",        hex: "#3b82f6", lambda: 470 },
  { name: "Violet", nameKh: "ស្វាយ",      hex: "#8b5cf6", lambda: 410 },
];

export default function RayleighScatteringPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-orange-50 text-slate-900">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-sky-400 via-sky-300 to-orange-200 border-b border-white/40">
        <SunRays />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-white/90 hover:text-white text-sm mb-5 ${isKh ? "font-khmer" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur border border-white/60 rounded-full px-4 py-1.5 mb-4 text-xs font-mono uppercase tracking-widest text-sky-900 shadow-sm">
            <Sun className="w-3.5 h-3.5" />
            SCI-SKY · OPTICS OF THE ATMOSPHERE
          </div>

          <h1 className={`font-display font-bold text-3xl sm:text-5xl leading-tight max-w-3xl text-white drop-shadow ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? (
              <>
                ការបែកខ្ចាត់ខ្ចាយរ៉េឡេ —{" "}
                <span className="text-sky-950">ហេតុអ្វីបានជាមេឃមានពណ៌ខៀវ?</span>
              </>
            ) : (
              <>
                Rayleigh Scattering —{" "}
                <span className="text-sky-950">Why is the Sky Blue?</span>
              </>
            )}
          </h1>

          <p className={`mt-4 max-w-2xl text-sky-50 text-sm sm:text-base drop-shadow-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ពន្លឺព្រះអាទិត្យពណ៌សពិតជាឥន្ធនូ។ ម៉ូលេគុលក្នុងខ្យល់ប្រែវាជា «ចានកញ្ចក់បែកខ្ចាត់ខ្ចាយ» ដ៏ធំ — ហើយរូបមន្តមួយដ៏សាមញ្ញពន្យល់មេឃខៀវនៅពេលថ្ងៃ និងមេឃក្រហមនៅពេលថ្ងៃលិច។"
              : "White sunlight is secretly a rainbow. The molecules in our air turn it into a giant scattering plate — and one elegant formula explains both the blue daytime sky and the red sunset."}
          </p>
        </div>
      </header>

      {/* ── Section 1: Rainbow in the Sun ─────────────────────────────── */}
      <Section
        spec="01"
        eyebrowEn="Light is a mix"
        eyebrowKh="ពន្លឺគឺជាល្បាយ"
        titleEn="The Rainbow Inside the Sun"
        titleKh="ឥន្ធនូនៅក្នុងព្រះអាទិត្យ"
        descEn="Sunlight looks plain white to your eye, but a glass prism reveals the truth: it is a smoothly mixed bouquet of every visible color. Each color travels as a tiny wave, and the distance between two crests is its wavelength (λ)."
        descKh="ពន្លឺព្រះអាទិត្យមើលទៅពណ៌សធម្មតា ប៉ុន្តែ ព្រីសខ្មែ​ក​ញ្ច​ក់​មួយ បង្ហាញការពិត៖ វាគឺជាល្បាយលម្អិតនៃពណ៌ដែលអាចមើលឃើញគ្រប់ពណ៌។ ពណ៌នីមួយៗធ្វើដំណើរជារលកតូចមួយ ហើយចម្ងាយរវាងកំពូលរលកពីរ គឺ ជំហានរលក (λ) របស់វា។"
        isKh={isKh}
      >
        <PrismCard isKh={isKh} />
        <WavelengthCompare isKh={isKh} />
      </Section>

      {/* ── Section 2: The Obstacle Course ────────────────────────────── */}
      <Section
        spec="02"
        eyebrowEn="Inside the air"
        eyebrowKh="នៅក្នុងខ្យល់"
        titleEn="The Obstacle Course"
        titleKh="ទីលានឧបសគ្គ"
        descEn="Earth's atmosphere is a crowded sea of nitrogen (N₂) and oxygen (O₂) molecules. When a beam of white sunlight enters, every color must run this obstacle course — but they don't all suffer equally."
        descKh="បរិយាកាសផែនដីគឺជាសមុទ្រចង្អៀតនៃម៉ូលេគុលអាសូត (N₂) និងអុកស៊ីសែន (O₂)។ នៅពេលដែលធ្នឹមពន្លឺព្រះអាទិត្យពណ៌សចូលមក ពណ៌នីមួយៗត្រូវរត់ឆ្លងកាត់ទីលានឧបសគ្គនេះ — ប៉ុន្តែពួកវាមិនរងគ្រោះស្មើគ្នាទេ។"
        isKh={isKh}
      >
        <ObstacleDiagram isKh={isKh} />
        <RayleighFormula isKh={isKh} />
      </Section>

      {/* ── Section 3: Sunset Effect ──────────────────────────────────── */}
      <Section
        spec="03"
        eyebrowEn="At the end of the day"
        eyebrowKh="នៅចុងបញ្ចប់នៃថ្ងៃ"
        titleEn="The Sunset Effect"
        titleKh="បាតុភូតថ្ងៃលិច"
        descEn="The same physics explains the most beautiful five minutes of every day. When the sun is low on the horizon, its light has to push through far more atmosphere to reach your eyes — and the longer the road, the more blue gets stripped away."
        descKh="រូបវិទ្យាដូចគ្នានេះពន្យល់អំពីប្រាំនាទីដ៏ស្រស់ស្អាតបំផុតនៃរាល់ថ្ងៃ។ នៅពេលដែលព្រះអាទិត្យទាបនៅជើងមេឃ ពន្លឺរបស់វាត្រូវរុញកាត់បរិយាកាសច្រើនជាងមុនដើម្បីទៅដល់ភ្នែករបស់អ្នក — ហើយផ្លូវកាន់តែវែង ពណ៌ខៀវកាន់តែត្រូវដកចេញ។"
        isKh={isKh}
      >
        <SunsetDiagram isKh={isKh} />
        <SurvivorNote isKh={isKh} />
      </Section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-slate-500 hover:text-sky-700 text-sm ${isKh ? "font-khmer" : ""}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {isKh ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        </Link>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout shell
// ════════════════════════════════════════════════════════════════════════════

function Section({
  spec, eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  spec: string;
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase bg-sky-100 text-sky-800 rounded-sm px-2.5 py-0.5 border border-sky-200">
          SEC-{spec}
        </span>
        <span className={`text-xs font-bold uppercase tracking-widest text-sky-800 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
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
//  Section 1 · Prism + wavelength comparison
// ════════════════════════════════════════════════════════════════════════════

function PrismCard({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-5 items-center">
        <div className="bg-gradient-to-b from-slate-50 to-sky-50 rounded-xl p-4 border border-slate-200">
          <PrismSVG />
        </div>
        <div>
          <div className={`font-mono text-[10px] uppercase tracking-widest text-sky-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "ការរកឃើញរបស់ Newton (1666)" : "Newton's Discovery (1666)"}
          </div>
          <h3 className={`font-display font-bold text-lg text-slate-900 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh ? "ពន្លឺពណ៌ស = ពណ៌ទាំងអស់ លាយបញ្ចូលគ្នា" : "White light = every color, mixed together"}
          </h3>
          <p className={`text-sm text-slate-700 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "នៅឆ្នាំ ១៦៦៦ Isaac Newton បានបញ្ចូលពន្លឺព្រះអាទិត្យតាមរយៈព្រីសខ្មែ​ក​ញ្ច​ក់​មួយ ហើយបានឃើញពន្លឺពណ៌សបំបែកទៅជាឥន្ធនូពេញលេញ។ ពណ៌មិនមែនមកពីព្រីសទេ ពួកវាបានស្ងៀមនៅខាងក្នុងពន្លឺរួចហើយ។"
              : "In 1666 Isaac Newton sent sunlight through a glass prism and watched the white beam fan out into a full rainbow. The colors did not come from the prism — they were already hidden inside the light."}
          </p>
          <div className="grid grid-cols-6 gap-1">
            {SPECTRUM.map((c) => (
              <div key={c.name} className="flex flex-col items-center">
                <div className="w-full h-8 rounded-t" style={{ background: c.hex }} />
                <div className={`text-[10px] mt-1 text-slate-600 ${isKh ? "font-khmer" : "font-mono"}`}>
                  {isKh ? c.nameKh : c.name}
                </div>
                <div className="text-[9px] text-slate-400 font-mono">{c.lambda}</div>
              </div>
            ))}
          </div>
          <div className={`text-[10px] text-slate-500 mt-1 text-center ${isKh ? "font-khmer" : "font-mono uppercase tracking-widest"}`}>
            {isKh ? "ជំហានរលក (nm)" : "wavelength (nm)"}
          </div>
        </div>
      </div>
    </div>
  );
}

function PrismSVG() {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto" aria-hidden>
      {/* incoming white beam */}
      <line x1="0" y1="100" x2="120" y2="100" stroke="#e2e8f0" strokeWidth="6" />
      <text x="6" y="93" fontSize="9" fontFamily="monospace" fill="#64748b">WHITE LIGHT →</text>

      {/* prism triangle */}
      <polygon points="120,40 200,160 120,160" fill="#cbd5e1" fillOpacity="0.4" stroke="#475569" strokeWidth="1.5" />

      {/* dispersed rays */}
      {SPECTRUM.map((c, i) => {
        const y = 80 + i * 8;
        return <line key={c.name} x1="170" y1="118" x2="320" y2={y} stroke={c.hex} strokeWidth="2.5" />;
      })}
      <text x="270" y="60" fontSize="9" fontFamily="monospace" fill="#475569">RAINBOW →</text>
    </svg>
  );
}

function WavelengthCompare({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <WaveCard
        Icon={Waves}
        labelEn="LONG λ · LAZY WAVES"
        labelKh="λ វែង · រលកខ្ជិល"
        titleEn="Red light"
        titleKh="ពន្លឺក្រហម"
        bodyEn="Red waves stretch out lazily — about 700 nanometres from one crest to the next. They carry less energy and don't get bumped around easily."
        bodyKh="រលកក្រហមលាតសន្ធឹងយ៉ាងខ្ជិល — ប្រហែល ៧០០ ណាណូម៉ែត្រ ពីកំពូលមួយទៅកំពូលបន្ទាប់។ ពួកវាផ្ទុកថាមពលតិច និងមិនងាយរង្គើ។"
        color="#ef4444"
        wavelength={700}
        amplitude={18}
        isKh={isKh}
      />
      <WaveCard
        Icon={Zap}
        labelEn="SHORT λ · ENERGETIC WAVES"
        labelKh="λ ខ្លី · រលកមានថាមពល"
        titleEn="Blue & violet light"
        titleKh="ពន្លឺខៀវ និងស្វាយ"
        bodyEn="Blue and violet waves are tightly packed — only about 470 nm apart. They wiggle quickly, carry more energy, and bounce off small things much more easily."
        bodyKh="រលកខៀវ និងស្វាយត្រូវបានដាក់បញ្ចូលគ្នាយ៉ាងតឹង — ប្រហែលត្រឹម ៤៧០ ណាណូម៉ែត្រ។ ពួកវារញ្ជួយលឿន ផ្ទុកថាមពលច្រើនជាង និងលោតពីវត្ថុតូចៗយ៉ាងងាយ។"
        color="#3b82f6"
        wavelength={470}
        amplitude={18}
        isKh={isKh}
      />
    </div>
  );
}

function WaveCard({
  Icon, labelEn, labelKh, titleEn, titleKh, bodyEn, bodyKh, color, wavelength, amplitude, isKh,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  labelEn: string; labelKh: string;
  titleEn: string; titleKh: string;
  bodyEn: string; bodyKh: string;
  color: string;
  wavelength: number;
  amplitude: number;
  isKh: boolean;
}) {
  // visual wave: longer wavelength → fewer cycles in 280px
  const cycles = wavelength === 700 ? 2 : 4;
  const w = 280;
  const h = 60;
  const path = (() => {
    const points: string[] = [];
    for (let i = 0; i <= w; i += 2) {
      const t = (i / w) * cycles * 2 * Math.PI;
      const y = h / 2 - Math.sin(t) * amplitude;
      points.push(`${i === 0 ? "M" : "L"} ${i} ${y.toFixed(1)}`);
    }
    return points.join(" ");
  })();

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: color }}>
          <Icon className="w-4 h-4" />
        </div>
        <div className={`font-mono text-[10px] uppercase tracking-widest ${isKh ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color }}>
          {isKh ? labelKh : labelEn}
        </div>
      </div>
      <h4 className={`font-display font-bold text-slate-900 mb-2 ${isKh ? "font-khmer leading-snug" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h4>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto mb-2 rounded bg-slate-50" aria-hidden>
        <line x1="0" y1={h / 2} x2={w} y2={h / 2} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 3" />
        <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? bodyKh : bodyEn}
      </p>
      <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
        λ ≈ <span style={{ color }}>{wavelength} nm</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 2 · Obstacle course + Rayleigh formula
// ════════════════════════════════════════════════════════════════════════════

function ObstacleDiagram({ isKh }: { isKh: boolean }) {
  // simple deterministic molecule positions
  const molecules = Array.from({ length: 26 }, (_, i) => ({
    cx: 60 + (i * 53) % 460,
    cy: 30 + ((i * 71) % 130),
    r: 3 + (i % 3),
  }));

  return (
    <div className="rounded-2xl bg-gradient-to-br from-sky-100 via-sky-50 to-white border border-sky-200 shadow-sm p-5 sm:p-6">
      <div className={`font-mono text-[10px] uppercase tracking-widest text-sky-800 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
        {isKh ? "សកម្មភាពនៅក្នុងបរិយាកាស" : "Action inside the atmosphere"}
      </div>
      <svg viewBox="0 0 540 200" className="w-full h-auto rounded-lg bg-white/40" aria-hidden>
        {/* molecules */}
        {molecules.map((m, i) => (
          <circle key={i} cx={m.cx} cy={m.cy} r={m.r} fill="#0284c7" fillOpacity="0.18" stroke="#0284c7" strokeOpacity="0.5" strokeWidth="0.6" />
        ))}

        {/* incoming white sunlight */}
        <line x1="0" y1="100" x2="120" y2="100" stroke="#475569" strokeWidth="3" strokeDasharray="4 3" />
        <text x="6" y="92" fontSize="10" fontFamily="monospace" fill="#475569">SUNLIGHT</text>

        {/* red ray passes straight through */}
        <line x1="120" y1="100" x2="540" y2="100" stroke="#ef4444" strokeWidth="3" />
        <text x="450" y="92" fontSize="10" fontFamily="monospace" fill="#ef4444">RED · STRAIGHT</text>

        {/* blue rays scatter in many directions from a couple molecules */}
        {[
          { ox: 200, oy: 100, dx: 280, dy: 30 },
          { ox: 200, oy: 100, dx: 250, dy: 170 },
          { ox: 320, oy: 100, dx: 420, dy: 20 },
          { ox: 320, oy: 100, dx: 380, dy: 180 },
          { ox: 320, oy: 100, dx: 420, dy: 100 },
          { ox: 200, oy: 100, dx: 100, dy: 30 },
        ].map((b, i) => (
          <line key={i} x1={b.ox} y1={b.oy} x2={b.dx} y2={b.dy} stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.85" />
        ))}
        <text x="350" y="40" fontSize="10" fontFamily="monospace" fill="#1d4ed8">BLUE · SCATTERED</text>

        {/* highlight the two scattering molecules */}
        {[{ x: 200, y: 100 }, { x: 320, y: 100 }].map((m, i) => (
          <circle key={i} cx={m.x} cy={m.y} r="6" fill="none" stroke="#1d4ed8" strokeWidth="1.5" />
        ))}
      </svg>
      <p className={`text-sm text-slate-700 mt-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? (
          <>
            រលក <span className="text-red-600 font-semibold">ក្រហម</span> ដ៏វែងមិនកត់សម្គាល់ម៉ូលេគុលតូចៗ ហើយឆ្លងកាត់ដោយផ្ទាល់ទៅភ្នែករបស់អ្នក។ រលក{" "}
            <span className="text-blue-600 font-semibold">ខៀវ</span> ដ៏ខ្លីបុករកម៉ូលេគុលនីមួយៗ និងបោះវាឡើងវិញតាមគ្រប់ទិសនៅទូទាំងផ្ទៃមេឃ — ដូច្នេះទោះបីអ្នកមើលឡើងលើទីណាក៏ដោយ មេឃតែងតែ <em>មើលឃើញ</em> ខៀវ។
          </>
        ) : (
          <>
            The long <span className="text-red-600 font-semibold">red</span> waves don't notice the tiny molecules and shoot straight through to your eye. The short{" "}
            <span className="text-blue-600 font-semibold">blue</span> waves crash into each molecule and bounce off in every direction across the whole sky — so wherever you look up, the sky <em>looks</em> blue.
          </>
        )}
      </p>
    </div>
  );
}

function RayleighFormula({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-white border border-sky-200 shadow-sm p-5 sm:p-6">
      <div className={`font-mono text-[10px] uppercase tracking-widest text-sky-700 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
        {isKh ? "ច្បាប់របស់ Lord Rayleigh (1871)" : "Lord Rayleigh's Law (1871)"}
      </div>
      <h3 className={`font-display font-bold text-lg text-slate-900 mb-3 ${isKh ? "font-khmer leading-snug" : ""}`}>
        {isKh ? "ច្បាប់ឬសទីបួន — ហេតុអ្វីខៀវឈ្នះបានច្រើន" : "The fourth-power law — why blue wins so big"}
      </h3>

      <div className="rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 p-4 mb-4 flex items-center justify-center">
        <BlockMath math={"I \\;\\propto\\; \\dfrac{1}{\\lambda^{4}}"} />
      </div>

      <p className={`text-sm text-slate-700 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? (
          <>
            អានជាសំឡេង៖ <em>«អាំងតង់ស៊ីតេនៃការបែកខ្ចាត់ខ្ចាយ <InlineMath math={"I"} /> គឺផ្ទុយនឹងជំហានរលក <InlineMath math={"\\lambda"} /> លើកឡើងស្វ័យគុណបួន»</em>។ កាត់ <InlineMath math={"\\lambda"} /> ឱ្យទៅពាក់កណ្តាល ការបែកខ្ចាត់ខ្ចាយ កើនឡើង <strong>១៦ ដង</strong>!
          </>
        ) : (
          <>
            Read out loud: <em>"the scattering intensity <InlineMath math={"I"} /> is inversely proportional to the wavelength <InlineMath math={"\\lambda"} /> raised to the fourth power."</em> Halve <InlineMath math={"\\lambda"} /> and you multiply scattering by <strong>16</strong>!
          </>
        )}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <RatioBox color="#ef4444" labelEn="Red" labelKh="ក្រហម" lambda={700} ratio={1} isKh={isKh} />
        <RatioBox color="#22c55e" labelEn="Green" labelKh="បៃតង" lambda={530} ratio={3.0} isKh={isKh} />
        <RatioBox color="#3b82f6" labelEn="Blue" labelKh="ខៀវ" lambda={470} ratio={4.9} isKh={isKh} />
      </div>
      <p className={`text-xs text-slate-500 mt-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh
          ? "ពន្លឺខៀវត្រូវបានបែកខ្ចាត់ខ្ចាយ ប្រហែលជា ៥ ដងច្រើនជាងពន្លឺក្រហម។ ហ្នឹងហើយជាមូលហេតុ ដែលមេឃទាំងមូលលើក្បាលអ្នកមានពណ៌ខៀវ មិនមែនពណ៌ក្រហម។"
          : "Blue light is scattered roughly 5× more than red light. That's why the entire sky overhead glows blue, not red."}
      </p>
    </div>
  );
}

function RatioBox({ color, labelEn, labelKh, lambda, ratio, isKh }: { color: string; labelEn: string; labelKh: string; lambda: number; ratio: number; isKh: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 bg-white">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
        <div className={`text-xs ${isKh ? "font-khmer" : "font-mono uppercase tracking-widest"}`} style={{ color }}>
          {isKh ? labelKh : labelEn}
        </div>
      </div>
      <div className="text-[10px] font-mono text-slate-500">λ = {lambda} nm</div>
      <div className="font-display font-bold text-2xl text-slate-900 mt-1">
        ×{ratio.toFixed(1)}
      </div>
      <div className={`text-[10px] text-slate-500 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? "ការបែកខ្ចាត់ខ្ចាយ ធៀបនឹងក្រហម" : "scattering vs. red"}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section 3 · Sunset diagram + survivor note
// ════════════════════════════════════════════════════════════════════════════

function SunsetDiagram({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-orange-200 shadow-sm">
      <div className="bg-gradient-to-b from-sky-200 via-amber-200 to-orange-400 p-5 sm:p-6">
        <div className={`font-mono text-[10px] uppercase tracking-widest text-orange-900 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? "ផ្លូវដែលពន្លឺត្រូវធ្វើដំណើរ" : "The road the light has to travel"}
        </div>
        <svg viewBox="0 0 540 240" className="w-full h-auto" aria-hidden>
          {/* atmosphere arc */}
          <path d="M 30 200 Q 270 30 510 200" fill="none" stroke="#fdba74" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 30 200 Q 270 60 510 200" fill="none" stroke="#fb923c" strokeWidth="1.5" strokeOpacity="0.6" />

          {/* ground */}
          <line x1="0" y1="200" x2="540" y2="200" stroke="#78350f" strokeWidth="2" />
          <text x="6" y="215" fontSize="9" fontFamily="monospace" fill="#78350f">EARTH</text>

          {/* observer */}
          <circle cx="270" cy="200" r="5" fill="#0f172a" />
          <text x="260" y="225" fontSize="9" fontFamily="monospace" fill="#0f172a">YOU</text>

          {/* NOON: sun overhead, short path */}
          <circle cx="270" cy="50" r="14" fill="#fde047" stroke="#facc15" strokeWidth="2" />
          <text x="290" y="44" fontSize="10" fontFamily="monospace" fill="#854d0e">NOON SUN</text>
          <line x1="270" y1="65" x2="270" y2="195" stroke="#3b82f6" strokeWidth="3" />
          <text x="278" y="135" fontSize="9" fontFamily="monospace" fill="#1d4ed8">SHORT PATH → BLUE WINS</text>

          {/* SUNSET: sun on horizon, long slanted path */}
          <circle cx="495" cy="195" r="14" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
          <text x="430" y="183" fontSize="10" fontFamily="monospace" fill="#9a3412">SUNSET SUN</text>
          {/* long path from sunset sun to observer through atmosphere */}
          <line x1="490" y1="195" x2="270" y2="200" stroke="#ea580c" strokeWidth="3" />
          {/* scattered blue dots along the long path */}
          {[
            { x: 460, y: 188 }, { x: 430, y: 198 }, { x: 400, y: 188 },
            { x: 370, y: 198 }, { x: 340, y: 188 }, { x: 310, y: 198 },
          ].map((d, i) => (
            <g key={i}>
              <circle cx={d.x} cy={d.y - 12} r="2" fill="#3b82f6" opacity="0.7" />
              <circle cx={d.x + 5} cy={d.y + 10} r="2" fill="#3b82f6" opacity="0.5" />
            </g>
          ))}
          <text x="290" y="180" fontSize="9" fontFamily="monospace" fill="#9a3412">LONG PATH · BLUE LOST · RED SURVIVES</text>
        </svg>
      </div>

      <div className="bg-white p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SunsetRow
          color="bg-sky-500"
          labelEn="At noon"
          labelKh="ពេលថ្ងៃត្រង់"
          bodyEn="The sun is overhead. Light travels through the thinnest slice of atmosphere. Blue scatters everywhere → the whole sky looks blue."
          bodyKh="ព្រះអាទិត្យនៅលើក្បាលត្រង់។ ពន្លឺធ្វើដំណើរកាត់បរិយាកាសស្តើងបំផុត។ ខៀវបែកខ្ចាត់ខ្ចាយគ្រប់ទីកន្លែង → មេឃទាំងមូលមើលទៅខៀវ។"
          isKh={isKh}
        />
        <SunsetRow
          color="bg-orange-500"
          labelEn="At sunset"
          labelKh="ពេលថ្ងៃលិច"
          bodyEn="The sun grazes the horizon. Light now slices sideways through hundreds of kilometres of air. Almost all the blue gets scattered away long before the light reaches you. Only the long red and orange waves are left."
          bodyKh="ព្រះអាទិត្យប៉ះជើងមេឃ។ ពន្លឺឥឡូវនេះកាត់ចំហៀងតាមរយៈរាប់រយគីឡូម៉ែត្រនៃខ្យល់។ ស្ទើរតែទាំងអស់នៃខៀវត្រូវបានបែកខ្ចាត់ខ្ចាយចេញ មុនពេលពន្លឺទៅដល់អ្នក។ មានតែរលកវែងពណ៌ក្រហម និងទឹកក្រូចប៉ុណ្ណោះដែលនៅសល់។"
          isKh={isKh}
        />
      </div>
    </div>
  );
}

function SunsetRow({ color, labelEn, labelKh, bodyEn, bodyKh, isKh }: { color: string; labelEn: string; labelKh: string; bodyEn: string; bodyKh: string; isKh: boolean }) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`w-3 h-3 rounded-full ${color}`} />
        <span className={`font-mono text-[10px] uppercase tracking-widest text-slate-700 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
          {isKh ? labelKh : labelEn}
        </span>
      </div>
      <p className={`text-xs text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? bodyKh : bodyEn}
      </p>
    </div>
  );
}

function SurvivorNote({ isKh }: { isKh: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-rose-500 text-white p-5 sm:p-6 shadow">
      <div className="flex items-start gap-3">
        <Sunrise className="w-6 h-6 text-amber-100 flex-shrink-0 mt-0.5" />
        <div>
          <div className={`font-mono text-[10px] uppercase tracking-widest text-amber-100 mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
            {isKh ? "កំណត់ត្រាសម្រាប់ចងចាំ" : "A note worth remembering"}
          </div>
          <p className={`font-display font-semibold text-lg sm:text-xl leading-snug ${isKh ? "font-khmer leading-snug" : ""}`}>
            {isKh
              ? "នៅពេលថ្ងៃលិច អ្នកកំពុងសម្លឹងមើលពន្លឺ ដែលនៅសេសសល់ពីការធ្វើដំណើរ។"
              : "At sunset, you are looking at the light that survived the journey."}
          </p>
          <p className={`text-sm text-orange-50/90 mt-2 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "ពណ៌ក្រហម និងទឹកក្រូចមិនមែនត្រូវបាន «បន្ថែម» នៅពេលថ្ងៃលិចទេ — ពួកវាគ្រាន់តែជាសមាជិកចុងក្រោយនៃឥន្ធនូ ដែលរស់រានមានជីវិតពីការដំណើរវែងដ៏ខ្លាំងកាត់បរិយាកាស។"
              : "Red and orange were not 'added' to the sunset — they are simply the last members of the rainbow that lived through the long, brutal walk across the atmosphere."}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs">
            <Wind className="w-3.5 h-3.5" />
            <span className={`${isKh ? "font-khmer" : "font-mono"}`}>
              {isKh ? "ផ្លូវវែង" : "long path"}
            </span>
            <ArrowRight className="w-3 h-3" />
            <span className={`${isKh ? "font-khmer" : "font-mono"}`}>
              {isKh ? "ខៀវត្រូវដកចេញ" : "blue stripped"}
            </span>
            <ArrowRight className="w-3 h-3" />
            <span className={`${isKh ? "font-khmer" : "font-mono"}`}>
              {isKh ? "ក្រហមរស់" : "red survives"}
            </span>
          </div>
          <div className={`mt-3 flex items-start gap-2 text-[11px] text-orange-50/80 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <p>
              {isKh
                ? "មូលហេតុដូចគ្នានេះពន្យល់ហេតុអ្វីព្រះច័ន្ទមើលទៅពណ៌ទង់ដែងនៅពេលមានព្រះច័ន្ទសុរិយគ្រាស — ពន្លឺព្រះអាទិត្យដែលឆ្លងកាត់ផ្ទៃខាងគែមរបស់ផែនដី ត្រូវបានច្រោះនៅតែពណ៌ក្រហម។"
                : "The same effect explains why the Moon turns coppery during a lunar eclipse — sunlight bending around Earth's edge has been filtered down to just the reds."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Decorative
// ════════════════════════════════════════════════════════════════════════════

function SunRays() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" aria-hidden>
      <defs>
        <radialGradient id="sunRays" cx="80%" cy="20%" r="60%">
          <stop offset="0" stopColor="#fef3c7" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fef3c7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#sunRays)" />
    </svg>
  );
}
