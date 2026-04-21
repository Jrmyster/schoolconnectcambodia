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
  Glasses,
  Layers,
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

        {/* ── Tool 4 ───────────────────────────────────────────────── */}
        <Section
          icon={<Glasses className="w-3.5 h-3.5" />}
          en="3D Cinema: The Illusion of Depth"
          kh="ភាពយន្ត 3D៖ ការបំភាន់ជម្រៅ"
          descEn="A flat screen has no depth. So how does an alien spaceship seem to fly out at your face? It's a beautiful trick — half biology, half physics — that fools your brain into building a third dimension out of two pictures."
          descKh="អេក្រង់រាបស្មើគ្មានជម្រៅឡើយ។ ដូច្នេះតើយានអវកាសហោះហើរចេញមករកមុខអ្នកយ៉ាងដូចម្តេច? វាជាការបំភាន់យ៉ាងស្រស់ស្អាត — ពាក់កណ្តាលជីវវិទ្យា ពាក់កណ្តាលរូបវិទ្យា — ដែលបញ្ឆោតខួរក្បាលរបស់អ្នកឱ្យបង្កើតវិមាត្រទីបីពីរូបពីរ។"
          isKh={isKh}
        >
          <ThreeDCinemaModule isKh={isKh} />
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

// ─── Continuous range definitions ───────────────────────────────────────────
// Sliders are linear 0..1000 (step=1) for fluid control. We then map each
// position to its real-world photographic value using the correct math:
//   • ISO is linear (100 → 6400)
//   • Aperture follows a geometric (exponential) sequence (f/1.4 → f/22)
//   • Shutter denominator is also geometric (1/30 → 1/2000)
const ISO_MIN = 100, ISO_MAX = 6400;
const AP_MIN = 1.4, AP_MAX = 22;
const SH_DENOM_MIN = 30, SH_DENOM_MAX = 2000;
const SLIDER_MAX = 1000;

// Visual tick guides on the track. They are positioned at each value's true
// mathematical position (not evenly spaced), so the slider thumb passes
// directly under each marker as you scrub.
const ISO_TICKS = [100, 400, 1600, 6400];
const AP_TICKS = [1.4, 2.8, 5.6, 11, 22];
const SH_DENOM_TICKS = [30, 125, 500, 2000];

function isoFromPos(p: number): number {
  return ISO_MIN + (p / SLIDER_MAX) * (ISO_MAX - ISO_MIN);
}
function fStopFromPos(p: number): number {
  return AP_MIN * Math.pow(AP_MAX / AP_MIN, p / SLIDER_MAX);
}
function shutterDenomFromPos(p: number): number {
  return SH_DENOM_MIN * Math.pow(SH_DENOM_MAX / SH_DENOM_MIN, p / SLIDER_MAX);
}

// Tick → slider-position percentage (0..100) for absolute-positioned guides.
const isoTickPct = (v: number) => ((v - ISO_MIN) / (ISO_MAX - ISO_MIN)) * 100;
const apTickPct = (v: number) =>
  (Math.log(v / AP_MIN) / Math.log(AP_MAX / AP_MIN)) * 100;
const shTickPct = (denom: number) =>
  (Math.log(denom / SH_DENOM_MIN) / Math.log(SH_DENOM_MAX / SH_DENOM_MIN)) * 100;

function ExposureTriangleGame({ isKh }: { isKh: boolean }) {
  // Default positions equivalent to ISO 400, f/2.8, 1/500 — the same defaults
  // as the previous "good shot" starting point, just expressed as continuous
  // slider positions on a 0..1000 scale.
  const [isoPos, setIsoPos] = useState(48);   // → ISO 400
  const [apPos, setApPos] = useState(252);    // → f/2.8
  const [shPos, setShPos] = useState(670);    // → 1/500

  // Derive real photographic values from slider positions (continuous).
  const iso = isoFromPos(isoPos);
  const fStop = fStopFromPos(apPos);
  const denom = shutterDenomFromPos(shPos);

  // Display strings — round only at the moment of rendering, never the math.
  const isoDisplay = Math.round(iso);
  const apDisplay = `f/${fStop.toFixed(1)}`;
  const shDisplay = `1/${Math.round(denom)}`;

  // ─── Continuous exposure math (in EV stops above the "correct" baseline) ──
  // Light reaching the sensor ∝ ISO · t · (1/fStop²). In log2 (stops):
  //   stops = log2(ISO/400) + log2((1/denom)/(1/500)) + 2·log2(2.8/fStop)
  // Baseline (ISO 400, f/2.8, 1/500) = 0 stops = perfect exposure.
  const exposureStops = useMemo(
    () =>
      Math.log2(iso / 400) +
      Math.log2(500 / denom) +
      2 * Math.log2(2.8 / fStop),
    [iso, fStop, denom],
  );

  // Map stops → preview brightness. Each ±2 stops doubles/halves brightness.
  // Clamped to keep extreme values visible without crashing the CSS filter.
  const brightness = useMemo(() => {
    const raw = 0.85 * Math.pow(2, exposureStops / 3);
    return Math.max(0.18, Math.min(1.7, raw));
  }, [exposureStops]);

  // Motion blur on the bike (px). Slower shutter (lower denom) = more blur.
  // 0 px at 1/500 or faster, scaling logarithmically as it slows.
  const motionBlur = useMemo(
    () => Math.max(0, Math.log2(500 / denom) * 2),
    [denom],
  );
  const bikeDur = "1.6s";

  // Background defocus — wider aperture (smaller f-number) = more bokeh.
  const bgBlur = useMemo(
    () => Math.max(0, Math.log2(2.8 / fStop) * 3),
    [fStop],
  );

  // Grain intensity 0..1 from ISO — log scaled across the full range.
  const grain = useMemo(
    () => Math.log2(iso / ISO_MIN) / Math.log2(ISO_MAX / ISO_MIN),
    [iso],
  );

  // "Perfect photo" criteria — generous bands so continuous sliders are still
  // achievable without pixel-perfect placement.
  const goodExposure = Math.abs(exposureStops) <= 1; // within ±1 EV
  const goodFreeze = denom >= 500;                    // shutter ≥ 1/500
  const goodGrain = iso <= 500;                       // up to ~ISO 500
  const isPerfect = goodExposure && goodFreeze && goodGrain;

  // Diagnostic message
  const issues: { en: string; kh: string }[] = [];
  if (exposureStops > 1) issues.push({ en: "Too bright (overexposed)", kh: "ភ្លឺពេក (Overexposed)" });
  if (exposureStops < -1) issues.push({ en: "Too dark (underexposed)", kh: "ងងឹតពេក (Underexposed)" });
  if (denom < 500) issues.push({ en: "Shutter too slow → motion blur", kh: "ល្បឿនឈុតយឺតពេក → រូបព្រិលដោយចលនា" });
  if (iso > 500) issues.push({ en: "ISO too high → grainy noise", kh: "ISO ខ្ពស់ពេក → គ្រេន" });

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
          <ReadOut label="ISO" value={String(isoDisplay)} hot={iso > 500} />
          <ReadOut label={isKh ? "ប្រហោង" : "Aperture"} value={apDisplay} hot={false} />
          <ReadOut label={isKh ? "ឈុត" : "Shutter"} value={shDisplay} hot={denom < 500} />
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
            <span className="text-yellow-300 font-mono text-sm font-bold tabular-nums" data-testid="exposure-iso-value">{isoDisplay}</span>
          </div>
          <input
            id="cine-iso" type="range" min={0} max={SLIDER_MAX} step={1}
            value={isoPos} onChange={(e) => setIsoPos(Number(e.target.value))}
            className="cine-range w-full"
            aria-valuetext={String(isoDisplay)}
            data-testid="exposure-iso"
          />
          <div className="relative h-3 mt-1 text-[10px] font-mono text-white/40" aria-hidden="true">
            {ISO_TICKS.map((v) => (
              <span
                key={v}
                className="absolute -translate-x-1/2"
                style={{ left: `${isoTickPct(v)}%` }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="cine-ap" className={`text-sm font-semibold text-white/85 flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
              <ApertureIcon className="w-3.5 h-3.5 text-yellow-300" />
              {isKh ? "ប្រហោងពន្លឺ (ទំហំ)" : "Aperture (Size)"}
            </label>
            <span className="text-yellow-300 font-mono text-sm font-bold tabular-nums" data-testid="exposure-aperture-value">{apDisplay}</span>
          </div>
          <input
            id="cine-ap" type="range" min={0} max={SLIDER_MAX} step={1}
            value={apPos} onChange={(e) => setApPos(Number(e.target.value))}
            className="cine-range w-full"
            aria-valuetext={apDisplay}
            data-testid="exposure-aperture"
          />
          <div className="relative h-3 mt-1 text-[10px] font-mono text-white/40" aria-hidden="true">
            {AP_TICKS.map((v) => (
              <span
                key={v}
                className="absolute -translate-x-1/2"
                style={{ left: `${apTickPct(v)}%` }}
              >
                f/{v}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="cine-sh" className={`text-sm font-semibold text-white/85 flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
              <Timer className="w-3.5 h-3.5 text-yellow-300" />
              {isKh ? "ល្បឿនឈុត (ពេលវេលា)" : "Shutter Speed (Time)"}
            </label>
            <span className="text-yellow-300 font-mono text-sm font-bold tabular-nums" data-testid="exposure-shutter-value">{shDisplay}</span>
          </div>
          <input
            id="cine-sh" type="range" min={0} max={SLIDER_MAX} step={1}
            value={shPos} onChange={(e) => setShPos(Number(e.target.value))}
            className="cine-range w-full"
            aria-valuetext={shDisplay}
            data-testid="exposure-shutter"
          />
          <div className="relative h-3 mt-1 text-[10px] font-mono text-white/40" aria-hidden="true">
            {SH_DENOM_TICKS.map((d) => (
              <span
                key={d}
                className="absolute -translate-x-1/2"
                style={{ left: `${shTickPct(d)}%` }}
              >
                1/{d}
              </span>
            ))}
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

// ════════════════════════════════════════════════════════════════════════════
//  Tool 4: 3D Cinema — The Illusion of Depth / ភាពយន្ត 3D
//  Four cards in a dark-cinema aesthetic: stereopsis, dual-camera rig + the
//  "two movies overlapping" projector trick, and the two glasses technologies
//  (anaglyph red/cyan vs polarised RealD 3D).
// ════════════════════════════════════════════════════════════════════════════

const T = (en: string, kh: string, isKh: boolean) =>
  isKh ? kh : en;

function ThreeDCinemaModule({ isKh }: { isKh: boolean }) {
  return (
    <div className="space-y-6">
      <StereopsisCard isKh={isKh} />
      <DualCameraCard isKh={isKh} />
      <GlassesComparisonCard isKh={isKh} />
    </div>
  );
}

// ── Sub-card wrapper — black panel with a subtle projector glow ────────────
function CinemaPanel({
  step,
  titleEn,
  titleKh,
  isKh,
  children,
}: {
  step: string;
  titleEn: string;
  titleKh: string;
  isKh: boolean;
  children: React.ReactNode;
}) {
  return (
    <article
      className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(250,204,21,0.07) 0%, transparent 65%), linear-gradient(180deg, #050505 0%, #0a0a0a 100%)",
      }}
    >
      <header className="px-5 sm:px-6 pt-5 pb-3 border-b border-white/10">
        <div
          className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-yellow-300/80 mb-1 ${
            isKh ? "font-khmer normal-case tracking-normal text-xs" : ""
          }`}
        >
          {step}
        </div>
        <h3
          className={`text-lg sm:text-xl font-bold text-white ${
            isKh ? "font-khmer leading-snug" : "font-display"
          }`}
        >
          {isKh ? titleKh : titleEn}
        </h3>
      </header>
      <div className="px-5 sm:px-6 py-5">{children}</div>
    </article>
  );
}

// ── 4.1 The Biology of Depth (Stereopsis) ─────────────────────────────────
function StereopsisCard({ isKh }: { isKh: boolean }) {
  const [view, setView] = useState<"left" | "right" | "both">("both");
  return (
    <CinemaPanel
      step={T("01 · The Biology of Depth", "០១ · ជីវវិទ្យានៃជម្រៅ", isKh)}
      titleEn="Stereopsis — Why two eyes see one world"
      titleKh="ស្តេរ៉េអុបស៊ីស — ហេតុអ្វីភ្នែកពីរឃើញពិភពតែមួយ"
      isKh={isKh}
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-5 items-center">
        <div>
          <p className={`text-white/80 text-sm sm:text-base leading-relaxed mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {T(
              "Hold up a finger and close one eye, then the other. Your finger jumps sideways. That's because your eyes are about 6.5 cm apart, so each one sees the world from a slightly different angle. Your brain compares the two pictures and uses the difference to calculate how far away things are. This is called stereopsis — the biology that 3D movies hijack.",
              "លើកម្រាមដៃមួយឡើង រួចបិទភ្នែកម្ខាងម្តងៗ។ ម្រាមដៃរបស់អ្នកលោតទៅខាង។ នោះដោយព្រោះភ្នែករបស់អ្នកនៅឆ្ងាយគ្នាប្រហែល ៦.៥ ស.ម ដូច្នេះម្នាក់ៗមើលឃើញពិភពលោកពីមុំខុសគ្នាបន្តិច។ ខួរក្បាលរបស់អ្នកប្រៀបធៀបរូបទាំងពីរ ហើយប្រើភាពខុសគ្នានោះដើម្បីគណនាថាវត្ថុនៅឆ្ងាយប៉ុណ្ណា។ នេះត្រូវបានគេហៅថា ស្តេរ៉េអុបស៊ីស — ជីវវិទ្យាដែលភាពយន្ត 3D ប្រើ។",
              isKh,
            )}
          </p>
          <div className="rounded-xl border border-yellow-300/20 bg-yellow-300/5 p-3">
            <div
              id="cine-stereopsis-toggle-label"
              className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-yellow-300 mb-1 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}
            >
              {T("Try it →", "សាកល្បង →", isKh)}
            </div>
            <div role="group" aria-labelledby="cine-stereopsis-toggle-label" className="flex flex-wrap gap-2">
              {([
                ["left", T("Left eye only", "ភ្នែកឆ្វេងតែប៉ុណ្ណោះ", isKh)],
                ["right", T("Right eye only", "ភ្នែកស្តាំតែប៉ុណ្ណោះ", isKh)],
                ["both", T("Both → brain combines", "ទាំងពីរ → ខួរក្បាលផ្សំ", isKh)],
              ] as const).map(([v, label]) => {
                const active = view === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      active
                        ? "bg-yellow-400 text-black border-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                        : "bg-white/5 text-white/75 border-white/15 hover:border-yellow-300/60 hover:text-white"
                    } ${isKh ? "font-khmer" : ""}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <StereopsisSvg view={view} isKh={isKh} />
      </div>
    </CinemaPanel>
  );
}

function StereopsisSvg({ view, isKh }: { view: "left" | "right" | "both"; isKh: boolean }) {
  const showL = view === "left" || view === "both";
  const showR = view === "right" || view === "both";
  // Object position
  const obj = { x: 240, y: 60 };
  const leftEye = { x: 200, y: 200 };
  const rightEye = { x: 280, y: 200 };
  return (
    <div className="rounded-xl border border-white/10 bg-black p-3">
      <svg viewBox="0 0 480 260" className="w-full h-auto" role="img" aria-label={T("Stereopsis diagram", "ដ្យាក្រាមស្តេរ៉េអុបស៊ីស", isKh)}>
        {/* faint grid */}
        <defs>
          <pattern id="cine-3d-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(250,204,21,0.06)" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cine-3d-grid)" />

        {/* Object — a glowing 3D-ish cube */}
        <g style={{ filter: "drop-shadow(0 0 6px rgba(250,204,21,0.5))" }}>
          <polygon points="240,30 280,50 280,90 240,110 200,90 200,50" fill="#1a1a1a" stroke="#facc15" strokeWidth="1.5" />
          <polygon points="240,30 280,50 240,70 200,50" fill="rgba(250,204,21,0.18)" stroke="#facc15" strokeWidth="1" />
          <line x1="240" y1="70" x2="240" y2="110" stroke="#facc15" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Sight lines */}
        {showL && (
          <line x1={leftEye.x} y1={leftEye.y} x2={obj.x} y2={obj.y + 40} stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 3" style={{ filter: "drop-shadow(0 0 3px #22d3ee)" }} />
        )}
        {showR && (
          <line x1={rightEye.x} y1={rightEye.y} x2={obj.x} y2={obj.y + 40} stroke="#f472b6" strokeWidth="1.5" strokeDasharray="3 3" style={{ filter: "drop-shadow(0 0 3px #f472b6)" }} />
        )}

        {/* Eyes */}
        <g>
          {/* Left eye */}
          <ellipse cx={leftEye.x} cy={leftEye.y} rx="22" ry="14" fill="#0f172a" stroke={showL ? "#22d3ee" : "rgba(255,255,255,0.25)"} strokeWidth="1.5" />
          <circle cx={leftEye.x + 4} cy={leftEye.y} r="6" fill={showL ? "#22d3ee" : "rgba(255,255,255,0.2)"} />
          <text x={leftEye.x} y={leftEye.y + 32} fontSize="10" fontFamily={isKh ? "inherit" : "monospace"} fill="#22d3ee" textAnchor="middle">
            {T("LEFT EYE", "ភ្នែកឆ្វេង", isKh)}
          </text>
          {/* Right eye */}
          <ellipse cx={rightEye.x} cy={rightEye.y} rx="22" ry="14" fill="#0f172a" stroke={showR ? "#f472b6" : "rgba(255,255,255,0.25)"} strokeWidth="1.5" />
          <circle cx={rightEye.x - 4} cy={rightEye.y} r="6" fill={showR ? "#f472b6" : "rgba(255,255,255,0.2)"} />
          <text x={rightEye.x} y={rightEye.y + 32} fontSize="10" fontFamily={isKh ? "inherit" : "monospace"} fill="#f472b6" textAnchor="middle">
            {T("RIGHT EYE", "ភ្នែកស្តាំ", isKh)}
          </text>
        </g>

        {/* Brain combination indicator */}
        {view === "both" && (
          <g>
            <rect x="195" y="232" width="90" height="20" rx="10" fill="rgba(250,204,21,0.12)" stroke="#facc15" strokeWidth="1" />
            <text x="240" y="246" fontSize="10" fontFamily={isKh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle" fontWeight="bold">
              {T("→ DEPTH!", "→ ជម្រៅ!", isKh)}
            </text>
          </g>
        )}

        {/* Object label */}
        <text x="240" y="20" fontSize="10" fontFamily={isKh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle">
          {T("OBJECT", "វត្ថុ", isKh)}
        </text>
      </svg>
    </div>
  );
}

// ── 4.2 The Camera Trick (filming + projecting in 3D) ──────────────────────
function DualCameraCard({ isKh }: { isKh: boolean }) {
  const [glassesOn, setGlassesOn] = useState(true);
  return (
    <CinemaPanel
      step={T("02 · The Camera Trick", "០២ · ល្បិចកាមេរ៉ា", isKh)}
      titleEn="Two lenses on set, two films on screen"
      titleKh="កែវពីរនៅទីកន្លែងថត រូបពីរនៅលើអេក្រង់"
      isKh={isKh}
    >
      <div className="grid md:grid-cols-2 gap-5">
        {/* Left: dual camera rig */}
        <div>
          <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-yellow-300/80 mb-2 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {T("On the film set", "នៅទីកន្លែងថតភាពយន្ត", isKh)}
          </div>
          <div className="rounded-xl border border-white/10 bg-black p-3 mb-3">
            <DualCameraSvg isKh={isKh} />
          </div>
          <p className={`text-white/80 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {T(
              "A 3D rig holds two matching cameras a few inches apart — exactly mimicking the spacing of human eyes. Both cameras roll at the same time, capturing the same scene from two slightly different angles. The director now has TWO movies — one for the left eye, one for the right.",
              "ឧបករណ៍តម្រឹម 3D ផ្ទុកកាមេរ៉ាដូចគ្នាពីរ ឆ្ងាយគ្នាពីរបីអ៊ីញ — ធ្វើត្រាប់តាមចំងាយរបស់ភ្នែកមនុស្សយ៉ាងពិតប្រាកដ។ កាមេរ៉ាទាំងពីរបញ្ចូលទាន់ពេលដូចគ្នា ថតឆាកដដែលពីមុំខុសគ្នាបន្តិច។ ឥឡូវនេះអ្នកដឹកនាំមានភាពយន្តពីរ — មួយសម្រាប់ភ្នែកឆ្វេង មួយសម្រាប់ភ្នែកស្តាំ។",
              isKh,
            )}
          </p>
        </div>

        {/* Right: projector + screen with overlap */}
        <div>
          <div className="flex items-center justify-between mb-2 gap-2">
            <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-yellow-300/80 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
              {T("In the cinema", "នៅរោងភាពយន្ត", isKh)}
            </div>
            <button
              type="button"
              onClick={() => setGlassesOn((v) => !v)}
              aria-pressed={glassesOn}
              aria-label={T("Toggle 3D glasses on or off", "បិទបើកវ៉ែនតា 3D", isKh)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                glassesOn
                  ? "bg-yellow-400 text-black border-yellow-300"
                  : "bg-white/5 text-white/70 border-white/15 hover:border-yellow-300/60"
              } ${isKh ? "font-khmer" : ""}`}
            >
              {glassesOn ? T("Glasses ON", "ពាក់វ៉ែនតា", isKh) : T("Glasses OFF", "ដោះវ៉ែនតា", isKh)}
            </button>
          </div>
          <div className="rounded-xl border border-white/10 bg-black p-3 mb-3">
            <ProjectorScreenSvg glassesOn={glassesOn} isKh={isKh} />
          </div>
          <p className={`text-white/80 text-sm leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
            {T(
              "The cinema's projector plays BOTH movies on the same screen at the exact same time. With glasses off, you see two ghostly overlapping images — that's why the screen looks blurry and out of focus. The glasses are not magic windows; they are filters that hand each eye only its own picture.",
              "ម៉ាស៊ីនបញ្ចាំងរូបនៃរោងភាពយន្តចាក់ភាពយន្តទាំងពីរលើអេក្រង់ដដែលនៅពេលដូចគ្នាបេះបិទ។ ពេលដោះវ៉ែនតា អ្នកឃើញរូបពីរត្រួតគ្នាដូចខ្មោច — នោះហើយជាហេតុដែលអេក្រង់ឃើញព្រិលខ្មៅ។ វ៉ែនតាមិនមែនជាបង្អួចមន្តអាគមទេ វាគ្រាន់តែជាតម្រងដែលប្រគល់ឱ្យភ្នែកនីមួយៗនូវរូបរបស់វាផ្ទាល់។",
              isKh,
            )}
          </p>
        </div>
      </div>
    </CinemaPanel>
  );
}

function DualCameraSvg({ isKh }: { isKh: boolean }) {
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label={T("3D camera rig", "ឧបករណ៍កាមេរ៉ា 3D", isKh)}>
      {/* Tripod */}
      <line x1="180" y1="140" x2="180" y2="190" stroke="#facc15" strokeWidth="2" />
      <line x1="180" y1="190" x2="150" y2="200" stroke="#facc15" strokeWidth="2" />
      <line x1="180" y1="190" x2="210" y2="200" stroke="#facc15" strokeWidth="2" />
      <line x1="180" y1="190" x2="180" y2="200" stroke="#facc15" strokeWidth="2" />
      {/* Rig bar */}
      <rect x="100" y="135" width="160" height="10" rx="2" fill="#1a1a1a" stroke="#facc15" strokeWidth="1.2" />

      {/* Two cameras */}
      {[
        { x: 122, color: "#22d3ee", label: T("LEFT CAM", "កាមេរ៉ាឆ្វេង", isKh) },
        { x: 218, color: "#f472b6", label: T("RIGHT CAM", "កាមេរ៉ាស្តាំ", isKh) },
      ].map((c) => (
        <g key={c.label} style={{ filter: `drop-shadow(0 0 3px ${c.color})` }}>
          <rect x={c.x} y="80" width="40" height="55" rx="4" fill="#0a0a0a" stroke={c.color} strokeWidth="1.5" />
          <circle cx={c.x + 20} cy="108" r="13" fill="#000" stroke={c.color} strokeWidth="1.5" />
          <circle cx={c.x + 20} cy="108" r="6" fill={c.color} opacity="0.4" />
          {/* Sight beam */}
          <line x1={c.x + 20} y1="95" x2={c.x + 20 + (c.color === "#22d3ee" ? -50 : 50) * 0.4} y2="20" stroke={c.color} strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
          <text x={c.x + 20} y="76" fontSize="9" fontFamily={isKh ? "inherit" : "monospace"} fill={c.color} textAnchor="middle" fontWeight="bold">{c.label}</text>
        </g>
      ))}

      {/* Subject */}
      <circle cx="180" cy="20" r="10" fill="#facc15" opacity="0.85" />
      <text x="180" y="14" fontSize="9" fontFamily={isKh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle">
        {T("ACTOR", "តួសម្តែង", isKh)}
      </text>

      {/* Spacing label */}
      <defs>
        <marker id="cine-arr-l" viewBox="0 0 8 8" refX="2" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 6 4 L 0 8 z" fill="#facc15" />
        </marker>
      </defs>
      <line x1="142" y1="158" x2="218" y2="158" stroke="#facc15" strokeWidth="0.8" markerStart="url(#cine-arr-l)" markerEnd="url(#cine-arr-l)" />
      <text x="180" y="172" fontSize="9" fontFamily={isKh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle">
        {T("~6.5 cm — eye spacing", "~៦.៥ ស.ម — ចំងាយភ្នែក", isKh)}
      </text>
    </svg>
  );
}

function ProjectorScreenSvg({ glassesOn, isKh }: { glassesOn: boolean; isKh: boolean }) {
  // Two ghost copies of a simple shape (a triangle "spaceship") — overlap when off
  return (
    <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label={T("Projector and screen", "ម៉ាស៊ីនបញ្ចាំង និងអេក្រង់", isKh)}>
      {/* Projector */}
      <g style={{ filter: "drop-shadow(0 0 4px rgba(250,204,21,0.5))" }}>
        <rect x="10" y="100" width="50" height="35" rx="4" fill="#0a0a0a" stroke="#facc15" strokeWidth="1.5" />
        <circle cx="60" cy="117" r="6" fill="#facc15" opacity="0.5" />
      </g>
      {/* Two beam cones */}
      <polygon points="60,113 320,40 320,90" fill="rgba(34,211,238,0.10)" stroke="rgba(34,211,238,0.35)" strokeWidth="1" />
      <polygon points="60,121 320,110 320,160" fill="rgba(244,114,182,0.10)" stroke="rgba(244,114,182,0.35)" strokeWidth="1" />

      {/* Screen */}
      <rect x="320" y="20" width="34" height="160" fill="#1a1a1a" stroke="#facc15" strokeWidth="1.5" rx="2" />

      {/* Two projected spaceships overlapping on the screen */}
      {/* Left-eye image (cyan) */}
      <g opacity={glassesOn ? 0.95 : 0.7}>
        <polygon points="332,90 348,100 332,110" fill={glassesOn ? "#22d3ee" : "rgba(34,211,238,0.7)"} stroke="#22d3ee" strokeWidth="1" />
      </g>
      {/* Right-eye image (pink), offset slightly */}
      <g opacity={glassesOn ? 0.95 : 0.7} transform={glassesOn ? "translate(0,0)" : "translate(-4,2)"}>
        <polygon points="332,90 348,100 332,110" fill={glassesOn ? "#f472b6" : "rgba(244,114,182,0.7)"} stroke="#f472b6" strokeWidth="1" />
      </g>

      {/* Audience eye */}
      <g>
        <ellipse cx="190" cy="180" rx="18" ry="11" fill="#0a0a0a" stroke="#facc15" strokeWidth="1.2" />
        <circle cx="190" cy="180" r="5" fill="#facc15" opacity="0.7" />
        <text x="190" y="160" fontSize="9" fontFamily={isKh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle">
          {glassesOn ? T("With glasses", "ពាក់វ៉ែនតា", isKh) : T("Naked eye", "ភ្នែកទទេ", isKh)}
        </text>
      </g>

      {/* Result caption */}
      <text x="180" y="16" fontSize="10" fontFamily={isKh ? "inherit" : "monospace"} fill={glassesOn ? "#facc15" : "#f472b6"} textAnchor="middle" fontWeight="bold">
        {glassesOn
          ? T("Each eye sees ONE crisp image → 3D depth", "ភ្នែកនីមួយៗឃើញរូបច្បាស់មួយ → ជម្រៅ 3D", isKh)
          : T("Two images overlap → looks blurry", "រូបពីរត្រួតគ្នា → ឃើញព្រិល", isKh)}
      </text>
    </svg>
  );
}

// ── 4.3 How the Glasses Work — Anaglyph vs Polarisation ────────────────────
function GlassesComparisonCard({ isKh }: { isKh: boolean }) {
  return (
    <CinemaPanel
      step={T("03 · How the Glasses Filter Light", "០៣ · របៀបវ៉ែនតាតម្រងពន្លឺ", isKh)}
      titleEn="Two filters, two technologies"
      titleKh="តម្រងពីរ បច្ចេកវិទ្យាពីរ"
      isKh={isKh}
    >
      <div className="grid md:grid-cols-2 gap-5">
        {/* Anaglyph */}
        <div className="rounded-xl border border-white/15 bg-black p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white/80" />
            </div>
            <div className="min-w-0">
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-white/60 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {T("Classic — the old method", "បុរាណ — វិធីចាស់", isKh)}
              </div>
              <h4 className={`text-base font-bold text-white ${isKh ? "font-khmer" : ""}`}>
                {T("Anaglyph (Red/Cyan) — តម្រងពណ៌", "អាណាគ្លីហ្វ (ក្រហម/ស៊ីយ៉ាន់) — Anaglyph", isKh)}
              </h4>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black p-2 mb-3">
            <AnaglyphSvg isKh={isKh} />
          </div>
          <p className={`text-white/80 text-sm leading-relaxed mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {T(
              "The two films are tinted: the left-eye film is printed in red and the right-eye film in cyan, then overlapped. Your glasses have one RED lens and one CYAN lens. The red lens BLOCKS cyan light (only the red image passes). The cyan lens BLOCKS red light (only the cyan image passes). Each eye gets just one picture.",
              "រូបទាំងពីរត្រូវបានជ្រលក់ពណ៌ ៖ រូបភ្នែកឆ្វេងបោះពុម្ពពណ៌ក្រហម រូបភ្នែកស្តាំពណ៌ស៊ីយ៉ាន់ រួចត្រួតគ្នា។ វ៉ែនតារបស់អ្នកមានកញ្ចក់ក្រហមមួយ និងកញ្ចក់ស៊ីយ៉ាន់មួយ។ កញ្ចក់ក្រហមរារាំងពន្លឺស៊ីយ៉ាន់ (តែរូបក្រហមទេដែលឆ្លងកាត់)។ កញ្ចក់ស៊ីយ៉ាន់រារាំងពន្លឺក្រហម (តែរូបស៊ីយ៉ាន់ទេដែលឆ្លងកាត់)។ ភ្នែកនីមួយៗទទួលបានតែរូបមួយ។",
              isKh,
            )}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded border border-emerald-400/30 bg-emerald-400/5 p-2">
              <div className={`font-mono font-bold text-emerald-300 mb-0.5 ${isKh ? "font-khmer text-[11px]" : ""}`}>{T("PRO", "ល្អ", isKh)}</div>
              <div className={`text-white/70 ${isKh ? "font-khmer" : ""}`}>{T("Cheap, works on any TV or printed page.", "ថោក ដំណើរការលើទូរទស្សន៍ ឬក្រដាសបោះពុម្ព។", isKh)}</div>
            </div>
            <div className="rounded border border-rose-400/30 bg-rose-400/5 p-2">
              <div className={`font-mono font-bold text-rose-300 mb-0.5 ${isKh ? "font-khmer text-[11px]" : ""}`}>{T("CON", "មិនល្អ", isKh)}</div>
              <div className={`text-white/70 ${isKh ? "font-khmer" : ""}`}>{T("Colours look strange — half the palette is gone.", "ពណ៌ឃើញចម្លែក — បាត់ពាក់កណ្តាលសំណុំពណ៌។", isKh)}</div>
            </div>
          </div>
        </div>

        {/* Polarisation */}
        <div className="rounded-xl border border-yellow-300/30 bg-black p-4 shadow-[0_0_18px_rgba(250,204,21,0.08)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-lg bg-yellow-400/10 border border-yellow-300/40 flex items-center justify-center">
              <Glasses className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="min-w-0">
              <div className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-yellow-300/80 ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                {T("Modern — the cinema method", "ទំនើប — វិធីរោងភាពយន្ត", isKh)}
              </div>
              <h4 className={`text-base font-bold text-white ${isKh ? "font-khmer" : ""}`}>
                {T("Polarisation (RealD 3D) — ប្លែងកម្មពន្លឺ", "ប្លែងកម្មពន្លឺ (RealD 3D) — Polarisation", isKh)}
              </h4>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black p-2 mb-3">
            <PolarisationSvg isKh={isKh} />
          </div>
          <p className={`text-white/80 text-sm leading-relaxed mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
            {T(
              "Light is a wave that normally vibrates in every direction at once. The cinema projector adds a special filter that gives it a 'handedness' — like a spiral staircase. The left-eye image goes out as a left-handed spiral, the right-eye image as a right-handed spiral. Each lens of your glasses is a matching spiral filter that only lets light of its own handedness pass through. Full colour. No headache.",
              "ពន្លឺជារលកដែលជាធម្មតាញ័រគ្រប់ទិសដៅក្នុងពេលតែមួយ។ ម៉ាស៊ីនបញ្ចាំងភាពយន្តបន្ថែមតម្រងពិសេសដែលផ្តល់ឱ្យវានូវ 'ទិសបង្វិល' — ដូចជាជណ្តើរវង់។ រូបភ្នែកឆ្វេងចេញជាខ្សែវង់បង្វិលឆ្វេង រូបភ្នែកស្តាំជាខ្សែវង់បង្វិលស្តាំ។ កញ្ចក់នីមួយៗនៃវ៉ែនតារបស់អ្នកគឺជាតម្រងវង់ត្រូវគ្នា ដែលអនុញ្ញាតឱ្យតែពន្លឺនៃទិសបង្វិលផ្ទាល់ខ្លួនឆ្លងកាត់។ ពណ៌ពេញ។ គ្មានឈឺក្បាល។",
              isKh,
            )}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded border border-emerald-400/30 bg-emerald-400/5 p-2">
              <div className={`font-mono font-bold text-emerald-300 mb-0.5 ${isKh ? "font-khmer text-[11px]" : ""}`}>{T("PRO", "ល្អ", isKh)}</div>
              <div className={`text-white/70 ${isKh ? "font-khmer" : ""}`}>{T("Full colour, can tilt your head a little.", "ពណ៌ពេញ អាចផ្អៀងក្បាលបន្តិចបាន។", isKh)}</div>
            </div>
            <div className="rounded border border-rose-400/30 bg-rose-400/5 p-2">
              <div className={`font-mono font-bold text-rose-300 mb-0.5 ${isKh ? "font-khmer text-[11px]" : ""}`}>{T("CON", "មិនល្អ", isKh)}</div>
              <div className={`text-white/70 ${isKh ? "font-khmer" : ""}`}>{T("Needs a special silver screen — only works at the cinema.", "ត្រូវការអេក្រង់ប្រាក់ពិសេស — ដំណើរការតែនៅរោងភាពយន្ត។", isKh)}</div>
            </div>
          </div>
        </div>
      </div>
    </CinemaPanel>
  );
}

function AnaglyphSvg({ isKh }: { isKh: boolean }) {
  return (
    <svg viewBox="0 0 360 170" className="w-full h-auto" role="img" aria-label={T("Anaglyph red/cyan filtering", "តម្រងអាណាគ្លីហ្វក្រហម/ស៊ីយ៉ាន់", isKh)}>
      {/* Screen with two overlapping coloured copies */}
      <rect x="20" y="20" width="120" height="100" rx="4" fill="#0a0a0a" stroke="#facc15" strokeWidth="1" />
      <text x="80" y="14" fontSize="9" fontFamily={isKh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle">{T("SCREEN", "អេក្រង់", isKh)}</text>
      {/* Red shape */}
      <polygon points="50,50 110,55 100,95 55,90" fill="#ef4444" opacity="0.85" style={{ filter: "drop-shadow(0 0 4px #ef4444)" }} />
      {/* Cyan shape, offset */}
      <polygon points="55,53 115,58 105,98 60,93" fill="#22d3ee" opacity="0.7" style={{ filter: "drop-shadow(0 0 4px #22d3ee)" }} />

      {/* Light rays out */}
      <line x1="140" y1="60" x2="220" y2="50" stroke="#ef4444" strokeWidth="1.5" />
      <line x1="140" y1="80" x2="220" y2="100" stroke="#22d3ee" strokeWidth="1.5" />

      {/* Glasses */}
      <g>
        {/* Left lens (red) — passes red, blocks cyan */}
        <circle cx="240" cy="60" r="22" fill="rgba(239,68,68,0.5)" stroke="#ef4444" strokeWidth="1.5" />
        <text x="240" y="36" fontSize="8" fontFamily={isKh ? "inherit" : "monospace"} fill="#ef4444" textAnchor="middle">{T("RED LENS", "កញ្ចក់ក្រហម", isKh)}</text>
        {/* Right lens (cyan) */}
        <circle cx="240" cy="110" r="22" fill="rgba(34,211,238,0.5)" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="240" y="148" fontSize="8" fontFamily={isKh ? "inherit" : "monospace"} fill="#22d3ee" textAnchor="middle">{T("CYAN LENS", "កញ្ចក់ស៊ីយ៉ាន់", isKh)}</text>
      </g>

      {/* After-filter rays */}
      <line x1="262" y1="60" x2="320" y2="60" stroke="#ef4444" strokeWidth="1.5" />
      <line x1="262" y1="110" x2="320" y2="110" stroke="#22d3ee" strokeWidth="1.5" />

      {/* Eyes */}
      <ellipse cx="335" cy="60" rx="14" ry="8" fill="#0a0a0a" stroke="#ef4444" strokeWidth="1.2" />
      <ellipse cx="335" cy="110" rx="14" ry="8" fill="#0a0a0a" stroke="#22d3ee" strokeWidth="1.2" />
      <text x="340" y="86" fontSize="8" fontFamily={isKh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle">{T("EYES", "ភ្នែក", isKh)}</text>

      {/* Caption */}
      <text x="180" y="166" fontSize="9" fontFamily={isKh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle">
        {T("Each colour passes through only one lens", "ពណ៌នីមួយៗឆ្លងកាត់តែកញ្ចក់មួយ", isKh)}
      </text>
    </svg>
  );
}

function PolarisationSvg({ isKh }: { isKh: boolean }) {
  // Build a left-handed (LHC) and right-handed (RHC) helix as a 3D-ish projection
  // travelling along x. We trace three "wraps" so the spiralling sense reads clearly.
  const buildHelix = (
    x0: number, y0: number, length: number, amp: number, turns: number, sense: 1 | -1,
  ) => {
    const N = 60;
    let d = "";
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const x = x0 + t * length;
      const phase = t * turns * Math.PI * 2;
      // The "sense" controls whether the depth (z) leads or lags the vertical
      // wobble (y), giving an opposite handedness when projected to 2D.
      const y = y0 + amp * Math.sin(phase);
      // simulate depth with a subtle x offset that follows cosine — sign flips
      // for opposite handedness so the visible curl reverses.
      const z = sense * amp * 0.55 * Math.cos(phase);
      d += `${i === 0 ? "M" : "L"} ${x + z} ${y} `;
    }
    return d;
  };

  const lhPath = buildHelix(50, 70, 170, 8, 3, 1);   // left-handed (left eye, cyan)
  const rhPath = buildHelix(50, 100, 170, 8, 3, -1); // right-handed (right eye, pink)

  return (
    <svg viewBox="0 0 360 180" className="w-full h-auto" role="img" aria-label={T("Circular polarisation filtering", "តម្រងប្លែងកម្មពន្លឺវង់", isKh)}>
      {/* Projector */}
      <rect x="10" y="60" width="40" height="50" rx="3" fill="#0a0a0a" stroke="#facc15" strokeWidth="1.2" />
      <text x="30" y="54" fontSize="8" fontFamily={isKh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle">{T("PROJ.", "បញ្ចាំង", isKh)}</text>

      {/* Top beam — left-handed circular polarisation (LHC) */}
      <g style={{ filter: "drop-shadow(0 0 3px #22d3ee)" }}>
        <path d={lhPath} stroke="#22d3ee" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <text x="135" y="48" fontSize="9" fontFamily={isKh ? "inherit" : "monospace"} fill="#22d3ee" textAnchor="middle">
          {T("Left-handed spiral ↺ (left eye)", "វង់បង្វិលឆ្វេង ↺ (ភ្នែកឆ្វេង)", isKh)}
        </text>
      </g>
      {/* Bottom beam — right-handed circular polarisation (RHC) */}
      <g style={{ filter: "drop-shadow(0 0 3px #f472b6)" }}>
        <path d={rhPath} stroke="#f472b6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <text x="135" y="138" fontSize="9" fontFamily={isKh ? "inherit" : "monospace"} fill="#f472b6" textAnchor="middle">
          {T("Right-handed spiral ↻ (right eye)", "វង់បង្វិលស្តាំ ↻ (ភ្នែកស្តាំ)", isKh)}
        </text>
      </g>

      {/* Glasses with matching spiral filters embossed in each lens */}
      <g>
        {/* Left lens — accepts left-handed light. A small ↺ spiral inside. */}
        <circle cx="245" cy="70" r="22" fill="rgba(34,211,238,0.18)" stroke="#22d3ee" strokeWidth="1.5" />
        <path
          d="M 245 70 m -10 0 a 10 10 0 1 0 10 -10 a 7 7 0 1 1 -7 7 a 4 4 0 1 0 4 -4"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Right lens — accepts right-handed light. A small ↻ spiral (mirrored). */}
        <circle cx="245" cy="110" r="22" fill="rgba(244,114,182,0.18)" stroke="#f472b6" strokeWidth="1.5" />
        <path
          d="M 245 110 m 10 0 a 10 10 0 1 1 -10 -10 a 7 7 0 1 0 7 7 a 4 4 0 1 1 -4 -4"
          fill="none"
          stroke="#f472b6"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>

      {/* After lenses — single clean ray to each eye */}
      <line x1="267" y1="70" x2="320" y2="70" stroke="#22d3ee" strokeWidth="1.5" />
      <line x1="267" y1="110" x2="320" y2="110" stroke="#f472b6" strokeWidth="1.5" />

      {/* Eyes */}
      <ellipse cx="335" cy="70" rx="14" ry="8" fill="#0a0a0a" stroke="#22d3ee" strokeWidth="1.2" />
      <ellipse cx="335" cy="110" rx="14" ry="8" fill="#0a0a0a" stroke="#f472b6" strokeWidth="1.2" />

      {/* Caption */}
      <text x="180" y="174" fontSize="9" fontFamily={isKh ? "inherit" : "monospace"} fill="#facc15" textAnchor="middle">
        {T("Each lens is a spiral filter — only matching handedness passes", "កញ្ចក់នីមួយៗជាតម្រងវង់ — តែទិសបង្វិលត្រូវគ្នាឆ្លងកាត់", isKh)}
      </text>
    </svg>
  );
}
