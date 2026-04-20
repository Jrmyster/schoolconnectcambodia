import { useMemo, useState } from "react";
import {
  Camera,
  Aperture as ApertureIcon,
  Timer,
  Gauge,
  Film,
  Lightbulb,
  Maximize,
  Square,
  CircleDot,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Cameras & Cinematography: The Science of Light
//  កាមេរ៉ា និងសិល្បៈភាពយន្ត
//
//  Self-contained page (under the Technology dropdown), modelled on
//  OceanographyPage / SolarPowerModule. Three interactive tools:
//
//   1. Physics of the Lens — aperture slider + ray-tracing through a lens
//      that flips the image upside down onto the sensor.
//   2. Exposure Triangle Game — ISO / Aperture / Shutter sliders driving a
//      live preview of a moving motorbike (motion blur + grain + bokeh).
//   3. The Art of the Frame — Wide / Medium / Close-up shots of the
//      Kouprey mascot to teach visual storytelling.
//
//  Visual: a darkroom — neutral blacks/charcoals with a focused yellow
//  spotlight glow on the active tool. Scoped CSS keyframes prefixed `cine-*`.
// ════════════════════════════════════════════════════════════════════════════

export default function CinematographyPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div
      className="min-h-screen relative overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(ellipse 60% 45% at 50% 12%, rgba(250, 204, 21, 0.08) 0%, transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #131313 50%, #050505 100%)",
      }}
    >
      {/* Faint film-grain overlay (page-wide, behind content) */}
      <FilmGrainOverlay />

      <div className="relative z-10">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <header className="relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center relative">
            <div className="inline-flex items-center gap-2 border border-yellow-300/25 bg-yellow-400/8 rounded-full px-5 py-2 mb-6 text-sm font-semibold text-yellow-200/85 backdrop-blur-sm">
              <Camera className="w-4 h-4" />
              {isKh ? "បច្ចេកវិទ្យាកាមេរ៉ា និងភាពយន្ត" : "Camera & Film Technology"}
            </div>

            <h1
              className={`font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight ${
                isKh ? "font-khmer leading-loose" : ""
              }`}
            >
              {isKh ? (
                <>
                  កាមេរ៉ា និងសិល្បៈភាពយន្ត៖{" "}
                  <span className="text-yellow-300">វិទ្យាសាស្ត្រនៃពន្លឺ</span>
                </>
              ) : (
                <>
                  Cameras & Cinematography:{" "}
                  <span className="text-yellow-300">The Science of Light</span>
                </>
              )}
            </h1>
            <p
              className={`text-white/80 max-w-2xl mx-auto leading-relaxed ${
                isKh ? "font-khmer text-base leading-loose" : "text-base"
              }`}
            >
              {isKh
                ? "កាមេរ៉ាគ្រាន់តែជាប្រអប់ដែលរកប្រាក់បានពីពន្លឺ។ យល់ដឹងពីរបៀបដែលពន្លឺឆ្លងកាត់កែវ និងរបៀបដែលអ្នកថតភាពយន្តប្រើស៊ុមរូបភាពដើម្បីនិយាយរឿង — ដោយមិនប្រើពាក្យតែមួយ។"
                : "A camera is just a box that does business with light. Learn how light passes through glass, and how filmmakers use the frame to tell whole stories — without saying a word."}
            </p>
          </div>
        </header>

        {/* ── Tool 1 ───────────────────────────────────────────────── */}
        <Section
          icon={<ApertureIcon className="w-3.5 h-3.5" />}
          en="Physics of the Lens"
          kh="រូបវិទ្យានៃកែវកាមេរ៉ា"
          descEn="A camera lens bends light. Move the aperture slider — the round hole inside the lens — and watch how it controls the amount of light reaching the sensor, and how sharp or blurry the background looks."
          descKh="កែវកាមេរ៉ាបង្វែរផ្លូវនៃពន្លឺ។ ផ្លាស់ប្តូរប្រហោងពន្លឺ (Aperture) — រន្ធរង្វង់ខាងក្នុងកែវ — ហើយមើលការគ្រប់គ្រងបរិមាណពន្លឺដែលឆ្លងទៅសេនស័រ និងភាពច្បាស់ ឬព្រិលនៃផ្ទៃខាងក្រោយ។"
          isKh={isKh}
        >
          <LensPhysicsSimulator isKh={isKh} />
        </Section>

        {/* ── Tool 2 ───────────────────────────────────────────────── */}
        <Section
          icon={<Gauge className="w-3.5 h-3.5" />}
          en="The Exposure Triangle"
          kh="ត្រីកោណការថត (Exposure Triangle)"
          descEn="Three sliders. One photo. Get them in balance and you get a sharp, well-lit shot of a moving motorbike. Get them wrong and you get blur, grain, or pitch black."
          descKh="បីស្លាយ។ រូបមួយ។ ផ្គុំវាឱ្យមានតុល្យភាព អ្នកនឹងទទួលបានរូបថតច្បាស់ ភ្លឺស្អាត នៃម៉ូតូកំពុងដំណើរការ។ ផ្គុំខុស — អ្នកនឹងបានរូបព្រិល គ្រេន ឬងងឹតស្រឡះ។"
          isKh={isKh}
        >
          <ExposureTriangleGame isKh={isKh} />
        </Section>

        {/* ── Tool 3 ───────────────────────────────────────────────── */}
        <Section
          icon={<Film className="w-3.5 h-3.5" />}
          en="The Art of the Frame"
          kh="សិល្បៈនៃស៊ុមភាពយន្ត"
          descEn="A cinematographer chooses what fits inside the frame — and what to leave out. Click each shot size to see how the same character tells a different part of the story."
          descKh="អ្នកថតភាពយន្តជ្រើសរើសអ្វីដែលនៅក្នុងស៊ុម — និងអ្វីដែលត្រូវដកចេញ។ ចុចលើទំហំស៊ុមនីមួយៗ ដើម្បីមើលរបៀបដែលតួអង្គដដែលនិយាយផ្នែកផ្សេងគ្នានៃរឿង។"
          isKh={isKh}
        >
          <ShotSizesGallery isKh={isKh} />
        </Section>

        {/* ── Closing strip ───────────────────────────────────────── */}
        <div className="border-t border-white/10 bg-white/3 mt-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
            <Lightbulb className="w-8 h-8 text-yellow-300/60 mx-auto mb-3" />
            <p
              className={`text-white/75 text-sm max-w-md mx-auto ${
                isKh ? "font-khmer leading-loose" : ""
              }`}
            >
              {isKh
                ? "កាមេរ៉ាល្អបំផុតគឺមួយដែលអ្នកមានជាប់ខ្លួន។ កាមេរ៉ានៅក្នុងទូរស័ព្ទរបស់អ្នក គឺគ្រប់គ្រាន់ដើម្បីចាប់ផ្តើមនិទានរឿងថ្ងៃនេះ។"
                : "The best camera is the one you have with you. The one in your phone is enough to start telling stories today."}
            </p>
          </div>
        </div>
      </div>

      {/* Page-scoped CSS keyframes — all prefixed `cine-` */}
      <style>{`
        @keyframes cine-photon-fall-top {
          0%   { offset-distance: 0%; opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes cine-photon-fall-bot {
          0%   { offset-distance: 0%; opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes cine-bike-drive {
          0%   { transform: translateX(-12%); }
          100% { transform: translateX(112%); }
        }
        @keyframes cine-spotlight-pulse {
          0%, 100% { opacity: 0.65; }
          50%      { opacity: 1; }
        }
        @keyframes cine-grain-shift {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(-3px, 1px); }
          50%      { transform: translate(2px, -2px); }
          75%      { transform: translate(-1px, 2px); }
        }

        .cine-photon-top  { offset-path: path('M 30 70 Q 200 70 250 150 Q 300 230 470 230'); animation: cine-photon-fall-top 2.6s linear infinite; }
        .cine-photon-bot  { offset-path: path('M 30 230 Q 200 230 250 150 Q 300 70 470 70'); animation: cine-photon-fall-bot 2.6s linear infinite; }
        .cine-bike-drive  { animation: cine-bike-drive var(--cine-bike-dur, 1.6s) linear infinite; }
        .cine-spotlight   { animation: cine-spotlight-pulse 3.2s ease-in-out infinite; }
        .cine-grain-anim  { animation: cine-grain-shift 0.18s steps(2) infinite; }

        .cine-svg-button:focus { outline: none; }
        .cine-svg-button:focus-visible > :first-child {
          stroke: #facc15;
          stroke-width: 3;
          filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.8));
        }

        /* Native range slider — darkroom finish */
        .cine-range {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: linear-gradient(90deg, #1f2937, #374151);
          border-radius: 9999px;
          outline: none;
          width: 100%;
        }
        .cine-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #facc15;
          border: 2px solid #fef3c7;
          box-shadow: 0 0 8px rgba(250, 204, 21, 0.7);
          cursor: pointer;
        }
        .cine-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #facc15;
          border: 2px solid #fef3c7;
          box-shadow: 0 0 8px rgba(250, 204, 21, 0.7);
          cursor: pointer;
        }
        .cine-range:focus-visible {
          box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.35);
        }

        @media (prefers-reduced-motion: reduce) {
          .cine-photon-top, .cine-photon-bot, .cine-bike-drive,
          .cine-spotlight, .cine-grain-anim { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Section wrapper — darkroom card with a faint top spotlight
// ════════════════════════════════════════════════════════════════════════════

function Section({
  icon,
  en,
  kh,
  descEn,
  descKh,
  isKh,
  children,
}: {
  icon: React.ReactNode;
  en: string;
  kh: string;
  descEn: string;
  descKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-lg bg-yellow-400/12 border border-yellow-400/30 flex items-center justify-center text-yellow-300">
          {icon}
        </div>
        <span
          className={`text-xs font-bold tracking-widest text-yellow-300 uppercase ${
            isKh ? "font-khmer tracking-normal" : ""
          }`}
        >
          {isKh ? kh : en}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/30 to-transparent" />
      </div>

      <p
        className={`text-white/80 text-sm mb-5 max-w-3xl ${
          isKh ? "font-khmer leading-loose" : "leading-relaxed"
        }`}
      >
        {isKh ? descKh : descEn}
      </p>

      <div
        className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0c0c0c]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 35% at 50% -10%, rgba(250, 204, 21, 0.08), transparent 70%)",
        }}
      >
        {children}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 1: Lens Physics Simulator
// ════════════════════════════════════════════════════════════════════════════

function LensPhysicsSimulator({ isKh }: { isKh: boolean }) {
  // Aperture stop index. 0 = tiny pinhole (f/22), 4 = wide open (f/1.4)
  const [stop, setStop] = useState(2);
  const F_STOPS = ["f/22", "f/11", "f/5.6", "f/2.8", "f/1.4"];
  const fStop = F_STOPS[stop];

  // Visual mappings
  const apertureRadius = 8 + stop * 7; // 8 → 36 px
  const lightStrength = 0.12 + stop * 0.18; // 0.12 → 0.84 (sensor brightness)
  const bgBlurPx = stop * 1.3; // 0 → 5.2 px (depth of field)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] gap-0">
      {/* SVG: cross-section of camera */}
      <div className="bg-gradient-to-b from-[#0a0a0a] to-[#000] p-4">
        <svg viewBox="0 0 500 300" className="w-full h-auto" role="img"
          aria-label={isKh ? "ផ្ទាំងបំបែកនៃកាមេរ៉ា" : "Camera cross-section"}>
          <defs>
            <radialGradient id="cine-lens-grad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="rgba(186,230,253,0.4)" />
              <stop offset="1" stopColor="rgba(56,189,248,0.15)" />
            </radialGradient>
            <linearGradient id="cine-sensor-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1e293b" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
            <filter id="cine-bg-blur">
              <feGaussianBlur stdDeviation={bgBlurPx} />
            </filter>
          </defs>

          {/* Background subject (a tree) — blurs based on aperture */}
          <g filter="url(#cine-bg-blur)" opacity="0.55">
            <rect x="20" y="40" width="100" height="220" fill="#1f2937" rx="6" />
            <text x="70" y="160" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">
              {isKh ? "ផ្ទៃខាងក្រោយ" : "Background"}
            </text>
          </g>

          {/* Foreground subject — small "photon source" arrow on the left */}
          <g>
            <polygon points="20,150 30,140 30,160" fill="#facc15" />
            <text x="6" y="165" fill="#facc15" fontSize="8" fontFamily="monospace">
              {isKh ? "ពន្លឺ" : "Light"}
            </text>
          </g>

          {/* Light rays converging through the lens — top + bottom rays cross,
              demonstrating refraction & flipping the image. */}
          <path d="M 30 70  Q 200 70  250 150  Q 300 230  470 230"
            fill="none" stroke="#fde68a" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
          <path d="M 30 230 Q 200 230 250 150  Q 300 70   470 70"
            fill="none" stroke="#fde68a" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />

          {/* Animated photons riding those paths */}
          {[0, 0.65, 1.3, 1.95].map((d, i) => (
            <g key={`pt-${i}`}>
              <circle r="3.5" fill="#facc15" className="cine-photon-top"
                style={{ animationDelay: `${d}s` }} />
            </g>
          ))}
          {[0.3, 0.95, 1.6, 2.25].map((d, i) => (
            <g key={`pb-${i}`}>
              <circle r="3.5" fill="#facc15" className="cine-photon-bot"
                style={{ animationDelay: `${d}s` }} />
            </g>
          ))}

          {/* Lens — convex glass element */}
          <g>
            <ellipse cx="250" cy="150" rx="22" ry="80" fill="url(#cine-lens-grad)"
              stroke="#7dd3fc" strokeWidth="1.5" />
            <text x="250" y="78" textAnchor="middle" fill="#bae6fd" fontSize="9" fontFamily="monospace">
              {isKh ? "កែវ" : "Lens"}
            </text>
          </g>

          {/* Aperture diaphragm just behind the lens */}
          <g>
            {/* Two opaque blades that close in around the centre */}
            <rect x="270" y="65" width="22" height={85 - apertureRadius} fill="#0a0a0a" stroke="#52525b" />
            <rect x="270" y={150 + apertureRadius} width="22" height={85 - apertureRadius} fill="#0a0a0a" stroke="#52525b" />
            {/* Aperture circle visualised */}
            <circle cx="281" cy="150" r={apertureRadius} fill="none" stroke="#facc15"
              strokeWidth="1.5" strokeDasharray="2 2" opacity="0.85" />
            <text x="281" y="252" textAnchor="middle" fill="#facc15" fontSize="9" fontFamily="monospace">
              {isKh ? `ប្រហោងពន្លឺ ${fStop}` : `Aperture ${fStop}`}
            </text>
          </g>

          {/* Camera body (boxy outline) */}
          <rect x="295" y="30" width="180" height="240" rx="8" fill="none" stroke="#52525b" strokeWidth="2" />

          {/* Sensor — flips brightness based on aperture */}
          <rect x="450" y="65" width="18" height="170" fill="url(#cine-sensor-grad)" stroke="#a3e635" strokeWidth="1.5" />
          {/* Photoreceptor cells */}
          {Array.from({ length: 14 }).map((_, i) => (
            <rect key={i} x="452" y={68 + i * 12} width="14" height="9"
              fill={`rgba(250, 204, 21, ${lightStrength})`} />
          ))}
          <text x="459" y="252" textAnchor="middle" fill="#a3e635" fontSize="9" fontFamily="monospace">
            {isKh ? "សេនស័រ" : "Sensor"}
          </text>

          {/* Inverted image hint on sensor — small flipped arrow */}
          <g transform="translate(459 130) rotate(180)">
            <polygon points="0,-12 6,0 -6,0" fill="#a3e635" opacity={0.4 + stop * 0.1} />
            <line x1="0" y1="0" x2="0" y2="14" stroke="#a3e635" strokeWidth="1.5" opacity={0.4 + stop * 0.1} />
          </g>
          <text x="459" y="180" textAnchor="middle" fill="#86efac" fontSize="7" opacity="0.85">
            {isKh ? "(បញ្ច្រាស)" : "(flipped)"}
          </text>
        </svg>
      </div>

      {/* Side controls + explanation */}
      <div className="p-6 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#080808]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="cine-aperture" className={`text-sm font-semibold text-white/85 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ប្រហោងពន្លឺ (Aperture)" : "Aperture"}
            </label>
            <span className="text-yellow-300 font-mono text-sm font-bold">{fStop}</span>
          </div>
          <input
            id="cine-aperture"
            type="range"
            min={0}
            max={4}
            step={1}
            value={stop}
            onChange={(e) => setStop(Number(e.target.value))}
            className="cine-range"
            aria-valuemin={0}
            aria-valuemax={4}
            aria-valuenow={stop}
            aria-valuetext={fStop}
            data-testid="lens-aperture-slider"
          />
          <div className="flex justify-between mt-1 text-[10px] font-mono text-white/75">
            <span>f/22</span>
            <span>f/11</span>
            <span>f/5.6</span>
            <span>f/2.8</span>
            <span>f/1.4</span>
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-white/40">
            <span>{isKh ? "តូច" : "small"}</span>
            <span className="text-right">{isKh ? "ធំ" : "wide"}</span>
          </div>
        </div>

        <div
          aria-live="polite"
          className="rounded-2xl border border-white/10 bg-black/40 p-4"
        >
          <h4 className={`font-display font-bold text-white text-sm mb-2 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
            <ApertureIcon className="w-4 h-4 text-yellow-300" />
            {stop >= 3
              ? (isKh ? "ប្រហោងធំ" : "Large Aperture")
              : stop <= 1
                ? (isKh ? "ប្រហោងតូច" : "Small Aperture")
                : (isKh ? "ប្រហោងមធ្យម" : "Medium Aperture")}
          </h4>
          <p className={`text-white/70 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {stop >= 3
              ? (isKh
                  ? "ប្រហោងធំ = ពន្លឺច្រើនបញ្ចូលទៅសេនស័រ ហើយផ្ទៃខាងក្រោយព្រិល (ល្អសម្រាប់រូបថតមុខ)។"
                  : "Large aperture = more light hits the sensor, and the background goes soft and blurry. Great for portraits.")
              : stop <= 1
                ? (isKh
                    ? "ប្រហោងតូច = ពន្លឺតិច ប៉ុន្តែគ្រប់យ៉ាងពីខាងមុខទៅខាងក្រោយ មានភាពច្បាស់ (ល្អសម្រាប់ទេសភាព)។"
                    : "Small aperture = less light, but everything from front to back stays sharp. Great for landscapes.")
                : (isKh
                    ? "ប្រហោងមធ្យម = តុល្យភាពរវាងពន្លឺ និងភាពច្បាស់នៃផ្ទៃខាងក្រោយ។"
                    : "Medium aperture = a balance between brightness and how much of the scene is sharp.")}
          </p>
        </div>

        <div className="rounded-xl bg-yellow-400/8 border border-yellow-300/25 p-3">
          <p className={`text-yellow-100/85 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "🔬 ពេលពន្លឺឆ្លងកាត់កែវ វាបត់បែន (Refraction) និងបញ្ច្រាសរូបភាពក្បាលចុះក្រោម — បន្ទាប់មកសេនស័រ ឬខួរក្បាលរបស់យើងបង្វិលវាត្រឡប់វិញ។"
              : "🔬 As light passes through curved glass, it refracts (bends) and lands upside-down on the sensor — the sensor or our brain flips it back the right way."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 2: Exposure Triangle Game
// ════════════════════════════════════════════════════════════════════════════

const ISO_VALUES = [100, 400, 1600, 6400];
const APERTURE_VALUES = ["f/11", "f/5.6", "f/2.8", "f/1.4"]; // index = "more light"
const SHUTTER_LABELS = ["1/2000", "1/500", "1/125", "1/30"];   // index = "more light, more blur"

function ExposureTriangleGame({ isKh }: { isKh: boolean }) {
  const [iso, setIso] = useState(1);       // ISO 400
  const [aperture, setAperture] = useState(2); // f/2.8
  const [shutter, setShutter] = useState(1);   // 1/500

  // Total exposure: 0..9 (3 stops each * 3 sliders)
  const exposureSum = iso + aperture + shutter;

  // Brightness 0.2..1.6 mapped from 0..9
  const brightness = useMemo(() => {
    return 0.25 + (exposureSum / 9) * 1.4;
  }, [exposureSum]);

  // Motion blur on the bike (px). Slow shutter (high shutter index) = more blur.
  // Note: in real photography, the bike's actual speed is unchanged — only the
  // amount of blur on the captured frame changes. So bikeDur stays constant.
  const motionBlur = useMemo(() => Math.max(0, shutter * 2.5 - 1), [shutter]);
  const bikeDur = "1.6s";

  // Background defocus — wider aperture = more bokeh blur
  const bgBlur = useMemo(() => aperture * 1.6, [aperture]);

  // Grain intensity 0..1 from ISO
  const grain = iso / 3;

  // "Perfect photo" criteria
  const goodExposure = exposureSum >= 4 && exposureSum <= 6;
  const goodFreeze = shutter <= 1;     // sharp motion
  const goodGrain = iso <= 1;          // clean
  const isPerfect = goodExposure && goodFreeze && goodGrain;

  // Diagnostic message
  const issues: { en: string; kh: string }[] = [];
  if (exposureSum > 6) issues.push({ en: "Too bright (overexposed)", kh: "ភ្លឺពេក (Overexposed)" });
  if (exposureSum < 4) issues.push({ en: "Too dark (underexposed)", kh: "ងងឹតពេក (Underexposed)" });
  if (shutter > 1) issues.push({ en: "Shutter too slow → motion blur", kh: "ល្បឿនឈុតយឺតពេក → រូបព្រិលដោយចលនា" });
  if (iso > 1) issues.push({ en: "ISO too high → grainy noise", kh: "ISO ខ្ពស់ពេក → គ្រេន" });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] gap-0">
      {/* LIVE PREVIEW */}
      <div className="bg-black p-4">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
          {/* Sky / scene background */}
          <div
            className="absolute inset-0"
            style={{
              filter: `brightness(${brightness}) blur(${bgBlur}px)`,
              background:
                "linear-gradient(180deg,#7dd3fc 0%,#fbbf24 65%,#f97316 100%)",
            }}
            aria-hidden
          />

          {/* Distant mountains (also defocus) */}
          <svg
            viewBox="0 0 400 225"
            className="absolute inset-0 w-full h-full"
            style={{ filter: `brightness(${brightness}) blur(${bgBlur}px)` }}
            preserveAspectRatio="none"
            aria-hidden
          >
            <polygon points="0,225 0,150 80,90 160,140 240,80 330,150 400,110 400,225" fill="#1e3a8a" />
            <polygon points="0,225 0,180 100,150 200,180 320,160 400,190 400,225" fill="#0f172a" />
          </svg>

          {/* Road */}
          <div
            className="absolute left-0 right-0 bottom-0 h-1/4"
            style={{
              filter: `brightness(${brightness})`,
              background:
                "linear-gradient(180deg,#1c1917 0%,#0a0a0a 100%)",
            }}
            aria-hidden
          />
          {/* Road dashes */}
          <div className="absolute left-0 right-0 bottom-[12%] flex justify-between px-2 opacity-70 pointer-events-none" aria-hidden>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-6 h-0.5 bg-yellow-300/70" />
            ))}
          </div>

          {/* MOTORBIKE — drives across, with motion blur from slow shutter */}
          <div
            className="absolute bottom-[14%] left-0 right-0 cine-bike-drive"
            style={{
              ["--cine-bike-dur" as string]: bikeDur,
              filter: `brightness(${brightness}) blur(${motionBlur}px)`,
              willChange: "transform",
            }}
            aria-hidden
          >
            <MotorbikeGlyph />
          </div>

          {/* Grain overlay (grows with ISO) */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay cine-grain-anim"
            style={{
              opacity: grain * 0.85,
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
              backgroundSize: "240px 240px",
            }}
            aria-hidden
          />

          {/* Status badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 bg-black/60 text-white/80 border border-white/15 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ការមើលផ្ទាល់" : "Live Preview"}
            </span>
            <span className={`text-[11px] font-semibold rounded-full px-2.5 py-1 backdrop-blur-sm flex items-center gap-1 ${
              isPerfect
                ? "bg-emerald-500/25 text-emerald-100 border border-emerald-300/40"
                : "bg-rose-500/15 text-rose-100 border border-rose-300/30"
            } ${isKh ? "font-khmer" : ""}`}
            data-testid="exposure-status">
              {isPerfect
                ? <><CheckCircle2 className="w-3 h-3" />{isKh ? "រូបថតល្អឥតខ្ចោះ!" : "Perfect Shot!"}</>
                : <><AlertCircle className="w-3 h-3" />{isKh ? "តម្រូវកែតម្រូវ" : "Needs Adjustment"}</>}
            </span>
          </div>
        </div>

        {/* Read-out card under the preview */}
        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-mono">
          <ReadOut label="ISO" value={String(ISO_VALUES[iso])} hot={iso > 1} />
          <ReadOut label={isKh ? "ប្រហោង" : "Aperture"} value={APERTURE_VALUES[aperture]} hot={false} />
          <ReadOut label={isKh ? "ឈុត" : "Shutter"} value={SHUTTER_LABELS[shutter]} hot={shutter > 1} />
        </div>
      </div>

      {/* SLIDERS + DIAGNOSIS */}
      <div className="p-6 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#080808]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="cine-iso" className={`text-sm font-semibold text-white/85 flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              ISO {isKh ? "(ភាពងាយរំញោច)" : "(Sensitivity)"}
            </label>
            <span className="text-yellow-300 font-mono text-sm font-bold">{ISO_VALUES[iso]}</span>
          </div>
          <input
            id="cine-iso" type="range" min={0} max={3} step={1}
            value={iso} onChange={(e) => setIso(Number(e.target.value))}
            className="cine-range"
            aria-valuetext={String(ISO_VALUES[iso])}
            data-testid="exposure-iso"
          />
          <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
            {ISO_VALUES.map((v) => <span key={v}>{v}</span>)}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="cine-ap" className={`text-sm font-semibold text-white/85 flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
              <ApertureIcon className="w-3.5 h-3.5 text-yellow-300" />
              {isKh ? "ប្រហោងពន្លឺ (ទំហំ)" : "Aperture (Size)"}
            </label>
            <span className="text-yellow-300 font-mono text-sm font-bold">{APERTURE_VALUES[aperture]}</span>
          </div>
          <input
            id="cine-ap" type="range" min={0} max={3} step={1}
            value={aperture} onChange={(e) => setAperture(Number(e.target.value))}
            className="cine-range"
            aria-valuetext={APERTURE_VALUES[aperture]}
            data-testid="exposure-aperture"
          />
          <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
            {APERTURE_VALUES.map((v) => <span key={v}>{v}</span>)}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="cine-sh" className={`text-sm font-semibold text-white/85 flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
              <Timer className="w-3.5 h-3.5 text-yellow-300" />
              {isKh ? "ល្បឿនឈុត (ពេលវេលា)" : "Shutter Speed (Time)"}
            </label>
            <span className="text-yellow-300 font-mono text-sm font-bold">{SHUTTER_LABELS[shutter]}</span>
          </div>
          <input
            id="cine-sh" type="range" min={0} max={3} step={1}
            value={shutter} onChange={(e) => setShutter(Number(e.target.value))}
            className="cine-range"
            aria-valuetext={SHUTTER_LABELS[shutter]}
            data-testid="exposure-shutter"
          />
          <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
            {SHUTTER_LABELS.map((v) => <span key={v}>{v}</span>)}
          </div>
        </div>

        {/* Challenge / diagnosis */}
        <div
          aria-live="polite"
          className={`rounded-2xl border p-4 ${
            isPerfect
              ? "bg-emerald-500/10 border-emerald-300/30"
              : "bg-rose-500/8 border-rose-300/25"
          }`}
          data-testid="exposure-feedback"
        >
          {isPerfect ? (
            <>
              <h5 className={`font-display font-bold text-emerald-100 text-sm mb-1 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
                <CheckCircle2 className="w-4 h-4" />
                {isKh ? "បានហើយ! រូបថតច្បាស់ល្អ!" : "Got it! Perfect, sharp shot!"}
              </h5>
              <p className={`text-emerald-100/80 text-xs ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "ឈុតលឿនបង្ហាប់ចលនា ISO ទាបធ្វើឱ្យរូបសុទ្ធ ហើយប្រហោងធំទុកពន្លឺគ្រប់គ្រាន់។ នេះគឺជាត្រីកោណការថត!"
                  : "Fast shutter froze the motion, low ISO kept the picture clean, and the wide aperture let in plenty of light. That's the exposure triangle in balance!"}
              </p>
            </>
          ) : (
            <>
              <h5 className={`font-display font-bold text-rose-100 text-sm mb-2 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
                <AlertCircle className="w-4 h-4" />
                {isKh ? "បញ្ហា៖" : "Issues:"}
              </h5>
              <ul className={`text-rose-100/80 text-xs space-y-1 list-disc pl-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {issues.map((it, i) => (
                  <li key={i}>{isKh ? it.kh : it.en}</li>
                ))}
              </ul>
              <p className={`text-rose-100/65 text-[11px] mt-2 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                {isKh
                  ? "🎯 បញ្ហា៖ កែតម្រូវស្លាយដើម្បីទទួលបានរូបថតច្បាស់ល្អឥតខ្ចោះ!"
                  : "🎯 Challenge: Adjust the sliders to get a perfect, sharp photo!"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ReadOut({ label, value, hot }: { label: string; value: string; hot: boolean }) {
  return (
    <div
      className={`rounded-lg border px-2 py-1.5 text-center ${
        hot
          ? "border-rose-400/40 bg-rose-500/10 text-rose-200"
          : "border-white/10 bg-white/5 text-white/70"
      }`}
    >
      <div className="text-[9px] uppercase tracking-wider opacity-70">{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
}

function MotorbikeGlyph() {
  // Simple SVG motorbike + rider — stylised, not anatomical
  return (
    <svg viewBox="0 0 110 60" width="110" height="60">
      {/* Wheels */}
      <circle cx="22" cy="46" r="11" fill="#0a0a0a" stroke="#71717a" strokeWidth="2" />
      <circle cx="22" cy="46" r="3" fill="#71717a" />
      <circle cx="86" cy="46" r="11" fill="#0a0a0a" stroke="#71717a" strokeWidth="2" />
      <circle cx="86" cy="46" r="3" fill="#71717a" />
      {/* Frame */}
      <path d="M 22 46 L 50 30 L 70 30 L 86 46 Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
      {/* Seat */}
      <rect x="46" y="26" width="22" height="6" rx="3" fill="#1c1917" />
      {/* Handlebars */}
      <line x1="50" y1="30" x2="40" y2="20" stroke="#71717a" strokeWidth="2.5" />
      <line x1="36" y1="18" x2="44" y2="22" stroke="#71717a" strokeWidth="2" />
      {/* Headlight */}
      <circle cx="36" cy="22" r="3" fill="#fde047" />
      {/* Rider */}
      <circle cx="58" cy="14" r="6" fill="#fbbf24" stroke="#92400e" strokeWidth="1" />
      <rect x="52" y="18" width="12" height="14" rx="3" fill="#1d4ed8" />
      <line x1="58" y1="22" x2="48" y2="26" stroke="#1d4ed8" strokeWidth="3" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Tool 3: Shot Sizes Gallery (Wide / Medium / Close-up)
// ════════════════════════════════════════════════════════════════════════════

type ShotSize = "wide" | "medium" | "closeup";

const SHOTS: Record<
  ShotSize,
  {
    en: string;
    kh: string;
    pillEn: string;
    pillKh: string;
    bodyEn: string;
    bodyKh: string;
    storyEn: string;
    storyKh: string;
  }
> = {
  wide: {
    en: "Wide Shot",
    kh: "ស៊ុមធំ",
    pillEn: "Establishes the world",
    pillKh: "បង្ហាញពិភពលោក",
    bodyEn:
      "Shows the whole environment — where we are, what time of day it is, how big or small the character feels in the scene.",
    bodyKh:
      "បង្ហាញបរិយាកាសទាំងមូល — យើងនៅទីណា ម៉ោងណានៃថ្ងៃ តួអង្គមើលទៅធំ ឬតូចប៉ុនណានៅក្នុងឆាក។",
    storyEn:
      '"Once upon a time, in a quiet rice field at sunset, a small Kouprey stood alone…"',
    storyKh:
      '«កាលពីព្រេងនាយ នៅកណ្តាលស្រែដ៏ស្ងាត់ស្ងៀមនៅពេលព្រះអាទិត្យលិច មានកូនគោព្រៃ Kouprey តូចមួយឈរម្នាក់ឯង…»',
  },
  medium: {
    en: "Medium Shot",
    kh: "ស៊ុមមធ្យម",
    pillEn: "Shows action",
    pillKh: "បង្ហាញសកម្មភាព",
    bodyEn:
      "Frames the character from about the waist up. Close enough to see what they're doing with their hands or body, but still showing some surroundings.",
    bodyKh:
      "កាត់តួអង្គពីចង្កេះឡើងលើ។ ជិតគ្រប់គ្រាន់ ដើម្បីមើលឃើញអ្វីដែលគាត់កំពុងធ្វើ ប៉ុន្តែនៅតែមើលឃើញបរិយាកាសខ្លះ។",
    storyEn:
      '"…it lifted its head and looked into the distance, listening for something…"',
    storyKh:
      '«…វាងើបក្បាល ហើយសម្លឹងទៅឆ្ងាយ កំពុងស្តាប់សំឡេងអ្វីមួយ…»',
  },
  closeup: {
    en: "Close-Up",
    kh: "ស៊ុមជិត",
    pillEn: "Shows emotion",
    pillKh: "បង្ហាញអារម្មណ៍",
    bodyEn:
      "Fills the frame with the character's face. We see every blink and every flicker of feeling — fear, joy, worry, hope. This is where the audience feels with the character.",
    bodyKh:
      "ដាក់មុខតួអង្គឱ្យពេញស៊ុម។ យើងឃើញរាល់ការព្រិចភ្នែក រាល់អារម្មណ៍ — ការភ័យខ្លាច សេចក្តីសុខ ការព្រួយបារម្ភ ឬសេចក្តីសង្ឃឹម។ នៅទីនេះ ទស្សនិកជននឹងមានអារម្មណ៍ដូចតួអង្គ។",
    storyEn:
      '"…and in its eyes, you could see the whole story — courage, finally."',
    storyKh:
      '«…ហើយនៅក្នុងភ្នែករបស់វា អ្នកអាចមើលឃើញរឿងទាំងមូល — ភាពក្លាហាន ទីបំផុត។»',
  },
};

function ShotSizesGallery({ isKh }: { isKh: boolean }) {
  const [active, setActive] = useState<ShotSize>("wide");
  const s = SHOTS[active];
  const ids: ShotSize[] = ["wide", "medium", "closeup"];

  // Roving-tabindex + arrow-key navigation (WAI-ARIA tabs pattern)
  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const idx = ids.indexOf(active);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = ids[(idx + 1) % ids.length];
      setActive(next);
      document.getElementById(`cine-shot-tab-${next}`)?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = ids[(idx - 1 + ids.length) % ids.length];
      setActive(prev);
      document.getElementById(`cine-shot-tab-${prev}`)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(ids[0]);
      document.getElementById(`cine-shot-tab-${ids[0]}`)?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(ids[ids.length - 1]);
      document.getElementById(`cine-shot-tab-${ids[ids.length - 1]}`)?.focus();
    }
  };

  return (
    <div className="p-5">
      {/* Tabs */}
      <div
        className="flex flex-wrap gap-2 mb-4"
        role="tablist"
        aria-label={isKh ? "ទំហំស៊ុមភាពយន្ត" : "Shot sizes"}
      >
        {ids.map((id) => (
          <button
            key={id}
            id={`cine-shot-tab-${id}`}
            role="tab"
            aria-selected={active === id}
            aria-controls={`cine-shot-panel-${id}`}
            tabIndex={active === id ? 0 : -1}
            onClick={() => setActive(id)}
            onKeyDown={onTabKeyDown}
            className={`text-xs font-semibold rounded-full px-3 py-1.5 border transition-colors flex items-center gap-1.5 ${
              active === id
                ? "bg-yellow-300/15 border-yellow-300/50 text-yellow-100"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
            } ${isKh ? "font-khmer" : ""}`}
            data-testid={`shot-tab-${id}`}
          >
            {id === "wide" && <Maximize className="w-3 h-3" />}
            {id === "medium" && <Square className="w-3 h-3" />}
            {id === "closeup" && <CircleDot className="w-3 h-3" />}
            {isKh ? SHOTS[id].kh : SHOTS[id].en}
          </button>
        ))}
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-5 items-start"
        role="tabpanel"
        id={`cine-shot-panel-${active}`}
        aria-labelledby={`cine-shot-tab-${active}`}
      >
        {/* The "frame" — black border, scene with Kouprey at the chosen size */}
        <div
          className="relative rounded-xl overflow-hidden border-2 border-yellow-300/30 bg-black aspect-video"
          aria-live="polite"
        >
          {/* Letterbox bars for cinematic feel */}
          <div className="absolute inset-x-0 top-0 h-3 bg-black z-10" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-3 bg-black z-10" aria-hidden />

          <KoupreyScene shot={active} />

          {/* Frame label corner */}
          <div className="absolute top-4 left-4 z-20">
            <span className={`text-[10px] font-mono uppercase tracking-widest text-yellow-300/80 bg-black/60 px-2 py-0.5 rounded ${isKh ? "font-khmer tracking-normal" : ""}`}>
              {isKh ? s.kh : s.en}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={`font-display font-bold text-white text-base ${isKh ? "font-khmer" : ""}`}>
              {isKh ? s.kh : s.en}
            </h4>
            <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 bg-yellow-300/15 text-yellow-200 border border-yellow-300/30 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? s.pillKh : s.pillEn}
            </span>
          </div>
          <p className={`text-white/70 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh ? s.bodyKh : s.bodyEn}
          </p>
          <div className="rounded-xl bg-yellow-400/8 border border-yellow-300/20 px-3 py-2.5">
            <p className={`text-yellow-100/85 text-xs italic ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? s.storyKh : s.storyEn}
            </p>
          </div>
        </div>
      </div>

      {/* Closing teaching line */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-r from-yellow-400/8 via-transparent to-transparent p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-yellow-300/15 border border-yellow-300/30 flex items-center justify-center text-yellow-300 flex-shrink-0">
          <Film className="w-5 h-5" />
        </div>
        <p className={`text-white/75 text-sm ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh
            ? "អ្នកថតភាពយន្តប្រើស៊ុមទាំងបីនេះដើម្បីនិទានរឿង — ដោយមិននិយាយពាក្យតែមួយ។ ស៊ុមធំប្រាប់យើងនៅទីណា ស៊ុមមធ្យមប្រាប់យើងពីអ្វីដែលកំពុងកើតឡើង ស៊ុមជិតប្រាប់យើងពីអ្វីដែលត្រូវមានអារម្មណ៍។"
            : "A cinematographer uses these three shots to tell a story — without using a single word. The wide tells us where, the medium tells us what, and the close-up tells us how to feel."}
        </p>
      </div>
    </div>
  );
}

// ── Kouprey scene at the chosen framing ───────────────────────────────────
function KoupreyScene({ shot }: { shot: ShotSize }) {
  // The same Kouprey lives at world-space coordinates, but we render a
  // cropped viewBox to simulate zooming in to a Wide / Medium / Close-up.
  // viewBox: x y w h
  const viewBox =
    shot === "wide"
      ? "0 0 400 225"
      : shot === "medium"
        ? "150 60 140 80"
        : "192 72 50 28"; // close-up of the head

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="cine-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3b0764" />
          <stop offset="0.5" stopColor="#c2410c" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="cine-field" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#365314" />
          <stop offset="1" stopColor="#1a2e05" />
        </linearGradient>
      </defs>
      {/* Sky (sunset) */}
      <rect x="0" y="0" width="400" height="155" fill="url(#cine-sky)" />
      {/* Sun */}
      <circle cx="320" cy="120" r="22" fill="#fef3c7" opacity="0.9" />
      {/* Distant mountains */}
      <polygon points="0,155 60,110 130,140 200,95 280,135 360,105 400,140 400,155" fill="#1c1917" opacity="0.85" />
      {/* Rice field with horizon */}
      <rect x="0" y="155" width="400" height="70" fill="url(#cine-field)" />
      {/* Field rows */}
      {[170, 185, 200, 215].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="400" y2={y} stroke="#854d0e" strokeWidth="0.6" opacity={0.55 - i * 0.1} />
      ))}
      {/* A palm tree off to the side for atmosphere */}
      <g>
        <line x1="60" y1="155" x2="58" y2="125" stroke="#451a03" strokeWidth="2.5" />
        <path d="M 58 125 Q 40 115 35 100" stroke="#16a34a" strokeWidth="3" fill="none" />
        <path d="M 58 125 Q 78 115 85 100" stroke="#16a34a" strokeWidth="3" fill="none" />
        <path d="M 58 125 Q 60 105 50 95" stroke="#16a34a" strokeWidth="3" fill="none" />
        <path d="M 58 125 Q 65 105 70 92" stroke="#16a34a" strokeWidth="3" fill="none" />
      </g>

      {/* THE KOUPREY — body around (200, 130), head at (217, 88) */}
      <Kouprey />
    </svg>
  );
}

function Kouprey() {
  // Stylised friendly Cambodian wild ox. Anchored so head sits roughly at
  // (217, 88) in the world-space viewBox, body around (200, 130).
  return (
    <g>
      {/* Body — chunky oval */}
      <ellipse cx="205" cy="140" rx="32" ry="14" fill="#3f2611" />
      {/* Back hump */}
      <path d="M 185 130 Q 205 115 225 130" fill="#3f2611" />
      {/* Legs */}
      <rect x="183" y="148" width="4.5" height="14" fill="#1c1004" />
      <rect x="195" y="150" width="4.5" height="12" fill="#1c1004" />
      <rect x="215" y="150" width="4.5" height="12" fill="#1c1004" />
      <rect x="227" y="148" width="4.5" height="14" fill="#1c1004" />
      {/* Tail */}
      <line x1="174" y1="135" x2="166" y2="142" stroke="#1c1004" strokeWidth="1.6" />
      <circle cx="165" cy="143" r="1.4" fill="#1c1004" />

      {/* Neck */}
      <path d="M 228 132 Q 230 110 218 100 Q 215 96 217 92 L 220 92 Q 224 100 232 110 Q 234 122 232 132 Z"
        fill="#3f2611" />

      {/* HEAD — at ~ (217, 88) */}
      <ellipse cx="217" cy="88" rx="13" ry="9" fill="#4a2d15" />
      {/* Snout */}
      <ellipse cx="207" cy="93" rx="6" ry="4" fill="#5a3a1f" />
      <circle cx="204" cy="92" r="0.8" fill="#1c1004" />
      <circle cx="206" cy="94" r="0.8" fill="#1c1004" />
      {/* Eye */}
      <circle cx="218" cy="86" r="1.6" fill="#fef3c7" />
      <circle cx="217.6" cy="86" r="0.9" fill="#1c1004" />
      {/* Ear */}
      <path d="M 224 82 Q 230 78 228 86 Z" fill="#3f2611" />
      {/* HORNS — the iconic curved Kouprey horns */}
      <path d="M 215 80 Q 210 70 206 64 Q 204 60 207 58" stroke="#facc15" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 222 80 Q 226 70 230 64 Q 232 60 229 58" stroke="#facc15" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* tiny shading under the horn base */}
      <ellipse cx="218" cy="80" rx="6" ry="1.2" fill="#1c1004" opacity="0.55" />
    </g>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Page-wide ambient: faint film grain
// ════════════════════════════════════════════════════════════════════════════

function FilmGrainOverlay() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: 0.07,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: "300px 300px",
      }}
    />
  );
}
