import { useState, useMemo, useRef } from "react";
import {
  Plane,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Globe2,
  Mountain,
  Info,
  Play,
  Pause,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Aviation: How We Fly — អាកាសចរណ៍៖ របៀបដែលយើងហោះហើរ
//
//  Modules:
//    1. Bernoulli's Principle & Lift — airfoil with animated air particles
//    2. The Wright Brothers history card
//    3. The 4 Forces of Flight — interactive plane with clickable arrows
//    4. Interesting Global Facts (flight volume, cruising altitude)
//
//  Aesthetic: sky-blue → cloud-white gradient, soft cumulus clouds floating
//  in the background, crisp white cards.
// ════════════════════════════════════════════════════════════════════════════

export default function AviationPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-800 overflow-hidden">
      <ScopedStyles />

      {/* Sky background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #7dd3fc 0%, #bae6fd 25%, #e0f2fe 60%, #f8fafc 100%)",
        }}
      />

      {/* Cloud blobs */}
      <Clouds />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-full px-4 py-1.5 mb-5 text-xs font-bold text-sky-700 shadow-sm">
          <Plane className="w-3.5 h-3.5" />
          {isKh ? "មេរៀនបច្ចេកវិទ្យា" : "Technology Lesson"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>អាកាសចរណ៍៖ <span className="text-sky-600">របៀបដែលយើងហោះហើរ</span></>
          ) : (
            <>Aviation: <span className="text-sky-600">How We Fly</span></>
          )}
        </h1>
        <p
          className={`text-slate-700 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "យន្តហោះមួយធ្ងន់រាប់រយតោន — ប៉ុន្តែវាហោះបាន។ យើងនឹងមើលរូបវិទ្យាដែលលើកវាឡើង មនុស្សដែលរកឃើញវា និងកម្លាំងបួនដែលធ្វើឲ្យវាដំណើរការ។"
            : "An aeroplane weighs hundreds of tonnes — and yet it flies. Let's see the physics that lifts it, the people who discovered it, and the four forces that keep it in the sky."}
        </p>

        {/* Decorative tiny plane */}
        <div className="hidden sm:block absolute top-12 right-8 text-sky-600 plane-bob">
          <Plane className="w-12 h-12 -rotate-12 drop-shadow-md" />
        </div>
      </header>

      {/* ── Tool 1: Bernoulli & Lift ─────────────────────────────────── */}
      <Section
        eyebrowEn="The Physics"
        eyebrowKh="រូបវិទ្យា"
        titleEn="Bernoulli's Principle & Lift"
        titleKh="គោលការណ៍ Bernoulli និងកម្លាំងលើក"
        descEn="An aeroplane wing isn't flat — it's curved on top and flatter underneath. That little curve changes everything. Watch the air particles as they race across both sides."
        descKh="ស្លាបយន្តហោះមិនមែនរាបស្មើរទេ — វាកោងនៅផ្នែកខាងលើ ហើយរាបជាងនៅផ្នែកខាងក្រោម។ ការកោងតូចនោះផ្លាស់ប្ដូរអ្វីៗទាំងអស់។ មើលភាគល្អិតខ្យល់ខណៈដែលវារត់ឆ្លងកាត់ទាំងសងខាង។"
        isKh={isKh}
      >
        <AirfoilDiagram isKh={isKh} />
      </Section>

      {/* ── Tool 2: Wright Brothers History Card ─────────────────────── */}
      <Section
        eyebrowEn="History"
        eyebrowKh="ប្រវត្តិសាស្ត្រ"
        titleEn="The Wright Brothers"
        titleKh="បងប្អូន Wright"
        descEn="For thousands of years humans dreamed of flying. Two American bicycle mechanics finally cracked it — not with magic, but with patience, science, and a lot of broken propellers."
        descKh="អស់រយៈពេលរាប់ពាន់ឆ្នាំ មនុស្សសុបិនតែចង់ហោះ។ បងប្អូនជាងជួសជុលកង់ជនជាតិអាមេរិកពីរនាក់ ទីបំផុតរកឃើញវា — មិនមែនដោយវេទមន្ត ប៉ុន្តែដោយការអត់ធ្មត់ វិទ្យាសាស្ត្រ និងជើងផ្លុំជាច្រើនបែក។"
        isKh={isKh}
      >
        <WrightHistoryCard isKh={isKh} />
      </Section>

      {/* ── Tool 3: 4 Forces of Flight ───────────────────────────────── */}
      <Section
        eyebrowEn="Forces"
        eyebrowKh="កម្លាំង"
        titleEn="The 4 Forces of Flight"
        titleKh="កម្លាំងបួននៃការហោះហើរ"
        descEn="Every aircraft in flight is a quiet tug-of-war between four forces. When all four are in balance, the plane cruises smoothly. Click any arrow to learn what it does."
        descKh="យន្តហោះនីមួយៗកំពុងហោះ គឺជាការទាញតវ៉ាស្ងាត់ៗ រវាងកម្លាំងបួន។ នៅពេលកម្លាំងទាំងបួនមានតុល្យភាព យន្តហោះហោះយ៉ាងរលូន។ ចុចព្រួញណាមួយដើម្បីរៀនថាវាធ្វើអ្វី។"
        isKh={isKh}
      >
        <FourForces isKh={isKh} />
      </Section>

      {/* ── Tool 4: Global Facts ─────────────────────────────────────── */}
      <Section
        eyebrowEn="Did you know?"
        eyebrowKh="តើអ្នកដឹងទេ?"
        titleEn="Aviation, in numbers"
        titleKh="អាកាសចរណ៍ ក្នុងលេខ"
        descEn="A few facts about how busy and how high the world's skies have become."
        descKh="ការពិតមួយចំនួនអំពីភាពមមាញឹក និងកម្ពស់នៃមេឃពិភពលោកសព្វថ្ងៃ។"
        isKh={isKh}
      >
        <FactsRow isKh={isKh} />
      </Section>

      {/* ── Closing ──────────────────────────────────────────────────── */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-slate-600 text-sm">
        <span className={isKh ? "font-khmer" : ""}>
          {isKh
            ? "រាល់ពេលដែលអ្នកមើលឃើញយន្តហោះមួយនៅលើមេឃ — ចងចាំថា វាជាការច្បាស់ដឹងពីខ្យល់ កម្លាំង និងសុបិនរបស់មនុស្ស ដែលរួមគ្នាមួយ។"
            : "Every time you see a plane in the sky — remember it is air, force, and human dreams, all working together."}
        </span>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper
// ════════════════════════════════════════════════════════════════════════════

function Section({
  eyebrowEn, eyebrowKh, titleEn, titleKh, descEn, descKh, isKh, children,
}: {
  eyebrowEn: string; eyebrowKh: string;
  titleEn: string; titleKh: string;
  descEn: string; descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className={`text-xs font-bold tracking-widest uppercase text-sky-700 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-slate-700 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      {children}
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Floating cumulus clouds (decorative, behind everything)
// ════════════════════════════════════════════════════════════════════════════

function Clouds() {
  const clouds = useMemo(
    () => [
      { top: "8%",  left: "5%",  size: 180, dur: 60, delay: 0 },
      { top: "22%", left: "70%", size: 220, dur: 75, delay: 8 },
      { top: "55%", left: "12%", size: 160, dur: 70, delay: 18 },
      { top: "70%", left: "78%", size: 200, dur: 80, delay: 5 },
      { top: "40%", left: "45%", size: 140, dur: 65, delay: 25 },
    ],
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {clouds.map((c, i) => (
        <svg
          key={i}
          width={c.size}
          height={c.size * 0.5}
          viewBox="0 0 200 100"
          className="absolute cloud-drift opacity-70"
          style={{
            top: c.top,
            left: c.left,
            animationDuration: `${c.dur}s`,
            animationDelay: `-${c.delay}s`,
          }}
          aria-hidden="true"
        >
          <g fill="#ffffff">
            <ellipse cx="50"  cy="60" rx="40" ry="28" />
            <ellipse cx="100" cy="50" rx="55" ry="38" />
            <ellipse cx="150" cy="62" rx="42" ry="30" />
            <ellipse cx="80"  cy="70" rx="35" ry="24" />
            <ellipse cx="125" cy="72" rx="38" ry="26" />
          </g>
        </svg>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 1: Airfoil with animated air particles
// ════════════════════════════════════════════════════════════════════════════

function AirfoilDiagram({ isKh }: { isKh: boolean }) {
  const [playing, setPlaying] = useState(true);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Stream of small dot particles. Top stream is "fast" (shorter dur),
  // bottom stream is "slow" (longer dur).
  const TOP_PARTICLES = 14;
  const BOT_PARTICLES = 14;

  // Real SMIL pause/resume — these methods freeze the entire SVG timeline
  // in place rather than just hiding the dots.
  const togglePlay = () => {
    const svg = svgRef.current;
    if (svg) {
      // Some browsers expose these on SVGSVGElement; guard for safety.
      const anySvg = svg as SVGSVGElement & {
        pauseAnimations?: () => void;
        unpauseAnimations?: () => void;
      };
      try {
        if (playing) anySvg.pauseAnimations?.();
        else anySvg.unpauseAnimations?.();
      } catch {
        /* ignore — fallback below still works */
      }
    }
    setPlaying((p) => !p);
  };

  return (
    <div className="bg-white rounded-2xl border border-sky-200 shadow-lg overflow-hidden">
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox="0 0 800 360"
          className="w-full h-auto block"
          aria-label={isKh ? "ស្លាបយន្តហោះ និងលំហូរខ្យល់" : "Airfoil with air flow"}
        >
          <defs>
            {/* Airfoil path — a teardrop with a flat-ish underside */}
            <path
              id="aviation-airfoil"
              d="M 150 200
                 C 250 130, 500 130, 700 195
                 C 600 215, 350 220, 150 200 Z"
              fill="#0f172a"
            />

            {/* Top flow path (fast) — particles slip across the curved upper surface */}
            <path
              id="aviation-top-path"
              d="M 60 180 C 200 110, 500 110, 760 175"
              fill="none"
            />
            {/* Bottom flow path (slow) — particles travel along the flatter underside */}
            <path
              id="aviation-bot-path"
              d="M 60 240 C 250 245, 500 250, 760 240"
              fill="none"
            />

            <linearGradient id="aviation-low-pressure" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="aviation-high-pressure" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fda4af" stopOpacity="0" />
              <stop offset="100%" stopColor="#fda4af" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          {/* Pressure tint zones */}
          <rect x="60"  y="60"  width="700" height="120" fill="url(#aviation-low-pressure)" />
          <rect x="60"  y="220" width="700" height="120" fill="url(#aviation-high-pressure)" />

          {/* Reference flow paths — faintly drawn so people can see the route */}
          <use href="#aviation-top-path" stroke="#7dd3fc" strokeWidth="1.5" strokeDasharray="5 6" />
          <use href="#aviation-bot-path" stroke="#7dd3fc" strokeWidth="1.5" strokeDasharray="5 6" />

          {/* Airfoil shape with subtle gradient by stacking */}
          <use href="#aviation-airfoil" />
          <use
            href="#aviation-airfoil"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1"
          />

          {/* Top (FAST) particles. Frozen in place via SMIL pauseAnimations()
              when the user pauses — see togglePlay above. */}
          <g>
            {Array.from({ length: TOP_PARTICLES }).map((_, i) => (
              <circle key={`t-${i}`} r="3.4" fill="#0284c7">
                <animateMotion
                  dur="2.4s"
                  repeatCount="indefinite"
                  begin={`-${(i / TOP_PARTICLES) * 2.4}s`}
                  rotate="auto"
                >
                  <mpath href="#aviation-top-path" />
                </animateMotion>
              </circle>
            ))}
          </g>

          {/* Bottom (SLOW) particles */}
          <g>
            {Array.from({ length: BOT_PARTICLES }).map((_, i) => (
              <circle key={`b-${i}`} r="3.4" fill="#fb7185">
                <animateMotion
                  dur="4.2s"
                  repeatCount="indefinite"
                  begin={`-${(i / BOT_PARTICLES) * 4.2}s`}
                  rotate="auto"
                >
                  <mpath href="#aviation-bot-path" />
                </animateMotion>
              </circle>
            ))}
          </g>

          {/* Lift arrow (yellow → sky, large) */}
          <g className="aviation-lift-pulse">
            <line x1="425" y1="190" x2="425" y2="80" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <polygon points="425,55 410,90 440,90" fill="#0284c7" />
            <text x="450" y="80" fontSize="18" fontWeight="800" fill="#0c4a6e" fontFamily="ui-sans-serif, system-ui">
              LIFT
            </text>
            <text x="450" y="100" fontSize="11" fontWeight="700" fill="#0369a1" fontFamily="ui-sans-serif, system-ui">
              {isKh ? "កម្លាំងលើក" : "(upward force)"}
            </text>
          </g>

          {/* Pressure labels */}
          <g>
            <text x="80" y="90" fontSize="13" fontWeight="800" fill="#a16207" fontFamily="ui-sans-serif, system-ui" letterSpacing="1">
              LOW PRESSURE · {isKh ? "សម្ពាធទាប" : "fast air"}
            </text>
            <text x="80" y="320" fontSize="13" fontWeight="800" fill="#9f1239" fontFamily="ui-sans-serif, system-ui" letterSpacing="1">
              HIGH PRESSURE · {isKh ? "សម្ពាធខ្ពស់" : "slower air"}
            </text>
          </g>

          {/* Airflow direction hint at the leading edge */}
          <g>
            <line x1="20" y1="210" x2="60" y2="210" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="60,210 50,205 50,215" fill="#94a3b8" />
            <text x="6" y="200" fontSize="11" fontWeight="700" fill="#475569" fontFamily="ui-sans-serif, system-ui">
              {isKh ? "ខ្យល់" : "Airflow"}
            </text>
          </g>
        </svg>
      </div>

      {/* Caption + control */}
      <div className="border-t border-sky-100 bg-sky-50/60 p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className={`flex items-start gap-2 text-[13px] text-slate-700 max-w-3xl ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-sky-600" />
          <span>
            {isKh ? (
              <>
                <strong className="text-sky-800">ខ្យល់ពណ៌ខៀវ</strong> ផ្នែកខាងលើដើរលឿនជាង ហើយ <strong className="text-rose-700">ខ្យល់ពណ៌ផ្កាឈូក</strong> ផ្នែកខាងក្រោមដើរយឺត — ភាពខុសគ្នានៃសម្ពាធនេះបង្កើតផ្នែកនៃ <strong>កម្លាំងលើក</strong>។ ប៉ុន្តែការពន្យល់ពេញលេញត្រូវការច្រើនជាងនេះ៖ ស្លាបក៏ផ្អៀងបន្តិចទៅរកខ្យល់ (មុំវាយ) រុញខ្យល់ចុះក្រោម — ហើយខ្យល់ដែលត្រូវបានរុញចុះ ក៏រុញស្លាបឡើងវិញដែរ (ច្បាប់ទីបី Newton)។
              </>
            ) : (
              <>
                The <strong className="text-sky-800">blue particles</strong> travel faster across the curved top and the <strong className="text-rose-700">pink particles</strong> below travel slower — that pressure difference is one piece of <strong>Lift</strong>. (A common myth says the two streams must "meet up" at the back — they don't.) The full story also needs <strong>angle of attack</strong>: the wing tilts slightly into the wind and pushes air down, so by Newton's third law the air pushes the wing up.
              </>
            )}
          </span>
        </div>
        <button
          onClick={togglePlay}
          aria-pressed={!playing}
          data-testid="airflow-toggle"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 self-start sm:self-auto"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className={isKh ? "font-khmer" : ""}>
            {playing
              ? isKh ? "ផ្អាកខ្យល់" : "Pause airflow"
              : isKh ? "ដើរវិញ" : "Resume airflow"}
          </span>
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 2: Wright Brothers History Card
// ════════════════════════════════════════════════════════════════════════════

function WrightHistoryCard({ isKh }: { isKh: boolean }) {
  return (
    <article
      className="bg-white rounded-2xl border-2 border-sky-200 shadow-lg overflow-hidden"
      data-testid="wright-card"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">
        {/* Portrait / illustration side */}
        <div className="bg-gradient-to-br from-sky-100 via-sky-50 to-white p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-sky-200 relative">
          {/* Stylised illustration of the Wright Flyer (simple SVG) */}
          <svg viewBox="0 0 220 120" className="w-full max-w-[260px] h-auto mb-3" aria-hidden="true">
            <defs>
              <linearGradient id="aviation-wf-cream" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%"   stopColor="#fefce8" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
            </defs>
            {/* Lower wing */}
            <rect x="20" y="78" width="180" height="9" rx="2" fill="url(#aviation-wf-cream)" stroke="#92400e" strokeWidth="1" />
            {/* Upper wing */}
            <rect x="20" y="40" width="180" height="9" rx="2" fill="url(#aviation-wf-cream)" stroke="#92400e" strokeWidth="1" />
            {/* Vertical struts */}
            {[35, 65, 95, 125, 155, 185].map((x) => (
              <line key={x} x1={x} y1="49" x2={x} y2="78" stroke="#92400e" strokeWidth="1.2" />
            ))}
            {/* Pilot platform / fuselage box */}
            <rect x="95" y="59" width="35" height="20" fill="#fde68a" stroke="#92400e" strokeWidth="1" />
            {/* Tail elevator (front canard, since Wright Flyer had it) */}
            <rect x="0" y="55" width="20" height="8" fill="url(#aviation-wf-cream)" stroke="#92400e" strokeWidth="1" />
            {/* Rear rudder */}
            <rect x="200" y="62" width="12" height="6" fill="url(#aviation-wf-cream)" stroke="#92400e" strokeWidth="1" />
            {/* Skids */}
            <line x1="40" y1="100" x2="180" y2="100" stroke="#92400e" strokeWidth="2" />
            <line x1="40" y1="87"  x2="40" y2="100" stroke="#92400e" strokeWidth="1.5" />
            <line x1="180" y1="87" x2="180" y2="100" stroke="#92400e" strokeWidth="1.5" />
          </svg>
          <div className={`font-display font-bold text-lg text-slate-900 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "Wright Flyer (១៩០៣)" : "The Wright Flyer (1903)"}
          </div>
          <div className={`text-xs text-slate-600 mt-1 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? "យន្តហោះប្រើម៉ាស៊ីនដំបូង ទម្ងន់រាប់ពីរោងសិប្បកម្មកង់" : "First powered aircraft, built in a bicycle workshop"}
          </div>
        </div>

        {/* Text side */}
        <div className="p-6 sm:p-8">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-sky-700 mb-2">
            <Calendar className="w-3 h-3" />
            {isKh ? "១៧ ធ្នូ ១៩០៣" : "December 17, 1903"}
          </div>
          <h3 className={`font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? "Orville និង Wilbur Wright" : "Orville & Wilbur Wright"}
          </h3>
          <div className={`inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-4 ${isKh ? "font-khmer" : ""}`}>
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            {isKh ? "Kitty Hawk, North Carolina, សហរដ្ឋអាមេរិក" : "Kitty Hawk, North Carolina, USA"}
          </div>

          <p className={`text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "នៅព្រឹកថ្ងៃត្រជាក់មួយក្នុងខែធ្នូ ១៩០៣ បងប្អូន Wright បានធ្វើ ការហោះហើរដែលអាចគ្រប់គ្រងបាន មានអាយុកាល និងប្រើម៉ាស៊ីនដំបូងបង្អស់ នៃយន្តហោះធ្ងន់ជាងខ្យល់។ ការហោះហើរលើកដំបូងមានរយៈពេលត្រឹមតែ ១២ វិនាទី និងធ្វើដំណើរបានចម្ងាយ ៣៧ ម៉ែត្រ — ខ្លីជាងបន្ទប់ហ្វីតបាល់ — ប៉ុន្តែវាបានផ្លាស់ប្ដូរពិភពលោកជារៀងរហូត។"
              : "On a cold December morning in 1903, the Wright brothers made the first controlled, sustained, powered flight of a heavier-than-air aircraft. The first hop lasted just 12 seconds and covered 37 metres — shorter than a football field — but it changed the world forever."}
          </p>

          {/* Quick stats */}
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <Stat valueEn="12s"   valueKh="១២ វិ" labelEn="First flight" labelKh="ហោះដំបូង" isKh={isKh} />
            <Stat valueEn="37m"   valueKh="៣៧ម៉" labelEn="Distance"     labelKh="ចម្ងាយ"     isKh={isKh} />
            <Stat valueEn="~48km/h" valueKh="៤៨គម/ម៉" labelEn="Top speed"   labelKh="ល្បឿនកំពូល"   isKh={isKh} />
          </div>
        </div>
      </div>
    </article>
  );
}

function Stat({
  valueEn, valueKh, labelEn, labelKh, isKh,
}: { valueEn: string; valueKh: string; labelEn: string; labelKh: string; isKh: boolean }) {
  return (
    <div className="bg-sky-50 border border-sky-200 rounded-lg p-2">
      <div className={`font-display font-bold text-lg text-sky-800 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? valueKh : valueEn}
      </div>
      <div className={`text-[10px] uppercase tracking-wider font-bold text-slate-500 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        {isKh ? labelKh : labelEn}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 3: Four Forces of Flight
// ════════════════════════════════════════════════════════════════════════════

type ForceId = "lift" | "weight" | "thrust" | "drag";

type ForceDef = {
  id: ForceId;
  nameEn: string; nameKh: string;
  shortEn: string; shortKh: string;
  longEn: string; longKh: string;
  Icon: typeof ArrowUp;
  color: string;       // hex
  bg: string;          // tailwind
  border: string;      // tailwind
  text: string;        // tailwind
};

const FORCES: ForceDef[] = [
  {
    id: "lift",
    nameEn: "Lift",
    nameKh: "កម្លាំងលើក (Lift)",
    shortEn: "Pushes the plane UP",
    shortKh: "រុញយន្តហោះឡើងលើ",
    longEn: "Created by the wings as air rushes over them. Lift opposes Gravity. Without enough Lift, the plane cannot stay in the air — which is why aircraft need a long runway and high speed before they can take off.",
    longKh: "បង្កើតដោយស្លាប នៅពេលខ្យល់រត់កាត់វា។ កម្លាំងលើក ប្រឆាំងនឹងទំនាញផែនដី។ បើកម្លាំងលើកមិនគ្រប់គ្រាន់ យន្តហោះមិនអាចនៅលើអាកាសបានទេ — ជាមូលហេតុដែលយន្តហោះត្រូវការផ្លូវរត់វែង និងល្បឿនលឿន មុនពេលហោះឡើង។",
    Icon: ArrowUp,
    color: "#0284c7",
    bg: "bg-sky-50",
    border: "border-sky-300",
    text: "text-sky-700",
  },
  {
    id: "weight",
    nameEn: "Weight",
    nameKh: "ទំនាញផែនដី (Weight)",
    shortEn: "Pulls the plane DOWN",
    shortKh: "ទាញយន្តហោះចុះក្រោម",
    longEn: "Earth's gravity pulls everything towards the ground — including 400-tonne jumbo jets. Weight always pulls straight down, towards the centre of the Earth. To stay level, an aircraft's Lift must equal its Weight.",
    longKh: "ទំនាញផែនដី ទាញអ្វីៗទាំងអស់ទៅដី — រាប់បញ្ចូលទាំងយន្តហោះធំៗធ្ងន់ ៤០០ តោន។ ទំនាញតែងតែទាញត្រង់ចុះក្រោម ទៅរកចំណុចកណ្ដាលនៃផែនដី។ ដើម្បីរក្សារាបស្មើ កម្លាំងលើករបស់យន្តហោះត្រូវស្មើនឹងទម្ងន់របស់វា។",
    Icon: ArrowDown,
    color: "#b45309",
    bg: "bg-amber-50",
    border: "border-amber-300",
    text: "text-amber-700",
  },
  {
    id: "thrust",
    nameEn: "Thrust",
    nameKh: "កម្លាំងរុញ (Thrust)",
    shortEn: "Pushes the plane FORWARD",
    shortKh: "រុញយន្តហោះទៅមុខ",
    longEn: "Created by jet engines or propellers. Thrust pushes the plane forward through the air — and that forward motion is what makes the wings produce Lift. More Thrust = more speed = more Lift.",
    longKh: "បង្កើតដោយម៉ាស៊ីនចាក (jet) ឬជើងផ្លុំ។ កម្លាំងរុញ រុញយន្តហោះទៅមុខឆ្លងកាត់ខ្យល់ — ការដឹកនាំទៅមុខនោះ ធ្វើឲ្យស្លាបបង្កើតកម្លាំងលើក។ កម្លាំងរុញកាន់តែច្រើន = ល្បឿនកាន់តែលឿន = កម្លាំងលើកកាន់តែខ្លាំង។",
    Icon: ArrowRight,
    color: "#16a34a",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    text: "text-emerald-700",
  },
  {
    id: "drag",
    nameEn: "Drag",
    nameKh: "កម្លាំងទប់ (Drag)",
    shortEn: "Slows the plane DOWN",
    shortKh: "បន្ថយល្បឿនយន្តហោះ",
    longEn: "Air pushes back on anything moving through it — and aeroplanes move very fast. Drag is air resistance, pulling the plane backward. Engineers shape every part of an aircraft to be smooth and 'aerodynamic' so Drag is as small as possible.",
    longKh: "ខ្យល់រុញត្រឡប់នូវអ្វីៗដែលផ្លាស់ទីឆ្លងកាត់វា — ហើយយន្តហោះផ្លាស់ទីលឿនណាស់។ កម្លាំងទប់ គឺជាការទប់ទល់របស់ខ្យល់ ដែលទាញយន្តហោះត្រឡប់ក្រោយ។ វិស្វករបង្កើតរូបរាងគ្រប់ផ្នែកនៃយន្តហោះឲ្យរលោង និង 'aerodynamic' ដើម្បីឲ្យកម្លាំងទប់តូចបំផុតតាមដែលអាចធ្វើបាន។",
    Icon: ArrowLeft,
    color: "#be123c",
    bg: "bg-rose-50",
    border: "border-rose-300",
    text: "text-rose-700",
  },
];

function FourForces({ isKh }: { isKh: boolean }) {
  const [selected, setSelected] = useState<ForceId>("lift");
  const cur = FORCES.find((f) => f.id === selected)!;

  return (
    <div className="bg-white rounded-2xl border border-sky-200 shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
        {/* Diagram */}
        <div className="relative bg-gradient-to-b from-sky-100 to-sky-50 p-4 sm:p-8">
          <svg
            viewBox="0 0 600 480"
            className="w-full h-auto block"
            aria-label={isKh ? "កម្លាំងបួននៃការហោះហើរ" : "Four forces of flight diagram"}
          >
            {/* Plane silhouette in the centre */}
            <g transform="translate(300, 240)">
              {/* Fuselage */}
              <ellipse cx="0" cy="0" rx="120" ry="22" fill="#1e293b" />
              {/* Cockpit window */}
              <ellipse cx="-70" cy="-4" rx="20" ry="8" fill="#7dd3fc" />
              {/* Wings (main) */}
              <polygon points="-30,-8 -10,-65 25,-65 50,-8" fill="#334155" />
              <polygon points="-30,8 -10,65 25,65 50,8" fill="#334155" />
              {/* Tail */}
              <polygon points="100,-6 120,-32 130,-32 118,-6" fill="#334155" />
              <polygon points="100,6 120,32 130,32 118,6" fill="#334155" />
              {/* Engine */}
              <ellipse cx="-15" cy="38" rx="14" ry="6" fill="#475569" />
              <ellipse cx="-15" cy="-38" rx="14" ry="6" fill="#475569" />
              {/* Nose tip */}
              <polygon points="-120,-10 -150,0 -120,10" fill="#1e293b" />
            </g>

            {/* Force arrows — clickable */}
            <ForceArrow
              id="lift"
              x1={300} y1={210}
              x2={300} y2={80}
              labelX={325} labelY={90}
              labelText="LIFT"
              labelKh="ឡើងលើ"
              color={FORCES[0].color}
              isSelected={selected === "lift"}
              onSelect={setSelected}
              isKh={isKh}
            />
            <ForceArrow
              id="weight"
              x1={300} y1={270}
              x2={300} y2={400}
              labelX={325} labelY={400}
              labelText="WEIGHT"
              labelKh="ទំនាញ"
              color={FORCES[1].color}
              isSelected={selected === "weight"}
              onSelect={setSelected}
              isKh={isKh}
            />
            <ForceArrow
              id="thrust"
              x1={355} y1={240}
              x2={510} y2={240}
              labelX={420} labelY={228}
              labelText="THRUST"
              labelKh="រុញ"
              color={FORCES[2].color}
              isSelected={selected === "thrust"}
              onSelect={setSelected}
              isKh={isKh}
            />
            <ForceArrow
              id="drag"
              x1={245} y1={240}
              x2={90} y2={240}
              labelX={130} labelY={228}
              labelText="DRAG"
              labelKh="ទប់"
              color={FORCES[3].color}
              isSelected={selected === "drag"}
              onSelect={setSelected}
              isKh={isKh}
            />
          </svg>

          <p className={`text-center text-xs text-slate-600 mt-2 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ចុចព្រួញណាមួយដើម្បីរៀន" : "Click any arrow to learn more"}
          </p>
        </div>

        {/* Selected force detail */}
        <div className={`p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-sky-200 ${cur.bg}`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${cur.bg} border ${cur.border} ${cur.text} text-xs font-bold mb-3`}>
            <cur.Icon className="w-3.5 h-3.5" />
            {isKh ? cur.shortKh : cur.shortEn}
          </div>
          <h3 className={`font-display font-bold text-2xl text-slate-900 mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {isKh ? cur.nameKh : cur.nameEn}
          </h3>
          <p className={`text-slate-700 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? cur.longKh : cur.longEn}
          </p>

          {/* Quick switcher */}
          <div className="mt-5 flex flex-wrap gap-2">
            {FORCES.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelected(f.id)}
                aria-pressed={selected === f.id}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  selected === f.id
                    ? `${f.bg} ${f.border} ${f.text}`
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
                data-testid={`force-chip-${f.id}`}
              >
                <f.Icon className="w-3.5 h-3.5" />
                <span className={isKh ? "font-khmer" : ""}>{isKh ? f.nameKh.split(" ")[0] : f.nameEn}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ForceArrow({
  id, x1, y1, x2, y2, labelX, labelY, labelText, labelKh,
  color, isSelected, onSelect, isKh,
}: {
  id: ForceId;
  x1: number; y1: number; x2: number; y2: number;
  labelX: number; labelY: number;
  labelText: string;
  labelKh: string;
  color: string;
  isSelected: boolean;
  onSelect: (id: ForceId) => void;
  isKh: boolean;
}) {
  // arrowhead points
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len, uy = dy / len;       // unit
  const px = -uy, py = ux;                  // perpendicular
  const HEAD = 14;
  const tipX = x2;
  const tipY = y2;
  const baseX = x2 - ux * HEAD;
  const baseY = y2 - uy * HEAD;
  const leftX = baseX + px * (HEAD * 0.6);
  const leftY = baseY + py * (HEAD * 0.6);
  const rightX = baseX - px * (HEAD * 0.6);
  const rightY = baseY - py * (HEAD * 0.6);

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${labelText} force`}
      aria-pressed={isSelected}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(id);
        }
      }}
      className="aviation-force-arrow cursor-pointer focus:outline-none"
      data-testid={`force-arrow-${id}`}
      style={{
        opacity: isSelected ? 1 : 0.7,
      }}
    >
      {/* invisible thicker hit area */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="transparent"
        strokeWidth="22"
      />
      <line
        x1={x1} y1={y1} x2={baseX} y2={baseY}
        stroke={color}
        strokeWidth={isSelected ? 7 : 5}
        strokeLinecap="round"
        style={{ transition: "stroke-width 200ms" }}
      />
      <polygon
        points={`${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
      <text
        x={labelX}
        y={labelY}
        fontSize="14"
        fontWeight="900"
        fill={color}
        fontFamily="ui-sans-serif, system-ui"
        style={{ pointerEvents: "none", letterSpacing: "1px" }}
      >
        {labelText}
      </text>
      <text
        x={labelX}
        y={labelY + 14}
        fontSize="10"
        fontWeight="700"
        fill={color}
        opacity="0.85"
        fontFamily="ui-sans-serif, system-ui"
        style={{ pointerEvents: "none" }}
      >
        {isKh ? labelKh : ""}
      </text>
    </g>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 4: Global Facts
// ════════════════════════════════════════════════════════════════════════════

function FactsRow({ isKh }: { isKh: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Fact 1: Flight volume */}
      <FactCard
        accent="sky"
        Icon={Globe2}
        eyebrowEn="Flight Volume"
        eyebrowKh="ចំនួនការហោះហើរ"
        bigEn="~100,000"
        bigKh="~១០០,០០០"
        unitEn="flights / day"
        unitKh="ការហោះហើរ / ថ្ងៃ"
        bodyEn="At any given moment, around 10,000 aircraft are in the sky carrying roughly 1.3 million passengers — together travelling more kilometres each day than the distance to the Sun."
        bodyKh="នៅពេលណាមួយ មានយន្តហោះប្រហែល ១០.០០០ គ្រឿងនៅលើមេឃ ដឹកអ្នកដំណើរប្រហែល ១,៣ លាននាក់ — ធ្វើដំណើរសរុបក្នុងមួយថ្ងៃ មានចម្ងាយឆ្ងាយជាងពីផែនដីទៅព្រះអាទិត្យ។"
        isKh={isKh}
      />

      {/* Fact 2: Cruising altitude */}
      <FactCard
        accent="indigo"
        Icon={Mountain}
        eyebrowEn="Cruising Altitude"
        eyebrowKh="កម្ពស់ហោះហើរ"
        bigEn="35,000 ft"
        bigKh="៣៥,០០០ ហ្វីត"
        unitEn="(~10.7 km up)"
        unitKh="(~១០,៧ គ.ម. ឡើងលើ)"
        bodyEn="Most commercial planes fly at this height because the air is thin — there is much less drag, so the plane uses less fuel. It is also above most weather, which gives a smoother ride. Outside, the temperature is about −55 °C."
        bodyKh="យន្តហោះពាណិជ្ជកម្មភាគច្រើនហោះនៅកម្ពស់នេះ ព្រោះខ្យល់ស្ដើង — មានកម្លាំងទប់តិចជាងមុន ហើយយន្តហោះប្រើប្រេងតិចជាង។ វាក៏ខ្ពស់ជាងអាកាសធាតុភាគច្រើនដែរ ដែលធ្វើឲ្យដំណើររលូន។ នៅខាងក្រៅ សីតុណ្ហភាពមានប្រហែល −៥៥ °សេ."
        isKh={isKh}
      />
    </div>
  );
}

function FactCard({
  accent, Icon,
  eyebrowEn, eyebrowKh,
  bigEn, bigKh,
  unitEn, unitKh,
  bodyEn, bodyKh,
  isKh,
}: {
  accent: "sky" | "indigo";
  Icon: typeof Globe2;
  eyebrowEn: string; eyebrowKh: string;
  bigEn: string; bigKh: string;
  unitEn: string; unitKh: string;
  bodyEn: string; bodyKh: string;
  isKh: boolean;
}) {
  const map = {
    sky:    { bg: "from-sky-50 to-white",       border: "border-sky-200",   text: "text-sky-700",   icon: "bg-sky-100 text-sky-700" },
    indigo: { bg: "from-indigo-50 to-white",    border: "border-indigo-200",text: "text-indigo-700",icon: "bg-indigo-100 text-indigo-700" },
  } as const;
  const a = map[accent];
  return (
    <article className={`bg-gradient-to-br ${a.bg} border-2 ${a.border} rounded-2xl p-6 shadow-sm`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${a.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-[10px] font-bold tracking-widest uppercase ${a.text} mb-1 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
            {isKh ? eyebrowKh : eyebrowEn}
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className={`font-display font-bold text-3xl text-slate-900 tabular-nums ${isKh ? "font-khmer" : ""}`}>
              {isKh ? bigKh : bigEn}
            </div>
            <div className={`text-xs text-slate-500 font-semibold ${isKh ? "font-khmer" : ""}`}>
              {isKh ? unitKh : unitEn}
            </div>
          </div>
          <p className={`text-sm text-slate-700 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? bodyKh : bodyEn}
          </p>
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Scoped styles
// ════════════════════════════════════════════════════════════════════════════

function ScopedStyles() {
  return (
    <style>{`
      @keyframes aviation-cloud-drift {
        from { transform: translateX(-12vw); }
        to   { transform: translateX(12vw); }
      }
      .cloud-drift {
        animation-name: aviation-cloud-drift;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: alternate;
      }

      @keyframes aviation-plane-bob {
        0%, 100% { transform: translateY(0) rotate(-12deg); }
        50%      { transform: translateY(-6px) rotate(-10deg); }
      }
      .plane-bob {
        animation: aviation-plane-bob 3s ease-in-out infinite;
      }

      @keyframes aviation-lift-pulse {
        0%, 100% { opacity: 0.85; }
        50%      { opacity: 1; }
      }
      .aviation-lift-pulse {
        animation: aviation-lift-pulse 2.4s ease-in-out infinite;
      }

      .aviation-force-arrow:hover {
        opacity: 1 !important;
      }
      .aviation-force-arrow:focus-visible {
        outline: 2px solid #0284c7;
        outline-offset: 2px;
        border-radius: 4px;
      }

      @media (prefers-reduced-motion: reduce) {
        .cloud-drift,
        .plane-bob,
        .aviation-lift-pulse {
          animation: none !important;
        }
      }
    `}</style>
  );
}
