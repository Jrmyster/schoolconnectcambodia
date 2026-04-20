import { useState, useEffect, useRef, useMemo } from "react";
import {
  Bike,
  Gauge,
  RotateCw,
  Compass,
  Anchor,
  Settings2,
  Cog,
  Wrench,
  Sparkles,
  Play,
  Pause,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Ruler,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  The Physics of the Bicycle — រូបវិទ្យានៃកង់
//
//    1. Mystery of balance       — front-view bike, gyroscope + caster trail
//    2. Four pillars              — clickable info panels
//    3. Balance Lab simulator     — wobble inversely proportional to speed
//
//  Aesthetic: blueprint — deep navy (#0b1733) base, cyan (#67e8f9) line art,
//  pale-blue grid, white annotations. Mechanical, drafting-board feel.
// ════════════════════════════════════════════════════════════════════════════

export default function BicyclePhysicsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-[#0b1733] text-cyan-50 relative overflow-hidden">
      <ScopedStyles />
      <BlueprintBg />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/40 text-cyan-300 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest">
          <Wrench className="w-3.5 h-3.5" />
          {isKh ? "មេរៀនរូបវិទ្យា · ឯកសារបច្ចេកទេស" : "Physics Lesson · Technical Drawing"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-cyan-50 mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>រូបវិទ្យានៃ <span className="bp-text-shine">កង់</span></>
          ) : (
            <>The Physics of the <span className="bp-text-shine">Bicycle</span></>
          )}
        </h1>
        <p
          className={`text-cyan-100/80 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ហេតុអ្វីបានជាកង់មួយដែលបើករហ័សដឹងថាត្រូវបញ្ឈរខ្លួនឯង ខណៈដែលកង់មួយដែលឈប់ត្រូវដួល? ខាងក្នុងគ្រប់ឧបករណ៍ដឹកជញ្ជូនយ៉ាងធំទូលាយបំផុតរបស់ពិភពលោក គឺមានការបង្ហាញពីស្ថិរភាព ការប្រគ្រាន់ និងបេក្ខភាពដ៏ស្រស់ស្អាតមួយ។"
            : "Why does a moving bicycle know how to keep itself upright while a parked one falls over? Inside the world's most popular vehicle is a beautiful demonstration of stability, leverage, and grip."}
        </p>
        <div className="hidden sm:flex absolute top-12 right-8 items-center gap-3 text-cyan-400/30 select-none">
          <Cog className="w-7 h-7 bp-spin-slow" />
          <Bike className="w-7 h-7 bp-float" style={{ animationDelay: "0.3s" }} />
          <Compass className="w-7 h-7 bp-float" style={{ animationDelay: "0.7s" }} />
        </div>
      </header>

      <Section
        eyebrowEn="01 · Stability"
        eyebrowKh="០១ · ស្ថិរភាព"
        titleEn="The mystery of balance"
        titleKh="អាថ៌កំបាំងនៃតុល្យភាព"
        descEn="A stationary bike is a tall, narrow tower with two thin wheels — gravity should knock it over instantly. The moment you start pedalling, it stays up. Engineers debated WHY for over a century. Today we know it's not one cause but several working together — the two big contributors are below."
        descKh="កង់ដែលនៅនឹងនោះគឺដូចជាប៉មខ្ពស់តូចមួយដែលមានកង់ស្ដើងពីរ — ទំនាញផែនដីគួរតែទម្លាក់វាភ្លាមៗ។ នៅពេលដែលអ្នកចាប់ផ្ដើមជាន់ វារក្សាបាន។ វិស្វករបានជជែកដេញដោលគ្នាអំពីហេតុអ្វីជាងមួយសតវត្ស។ សព្វថ្ងៃយើងដឹងថាវាមិនមែនជាមូលហេតុមួយទេ ប៉ុន្តែជាច្រើនរួមគ្នា — អ្នកចូលរួមធំពីរនៅខាងក្រោម។"
        isKh={isKh}
      >
        <BalanceDiagram isKh={isKh} />
      </Section>

      <Section
        eyebrowEn="02 · Concepts"
        eyebrowKh="០២ · គំនិត"
        titleEn="The four pillars of bike physics"
        titleKh="សសរស្តម្ភបួននៃរូបវិទ្យាកង់"
        descEn="Click any pillar to expand. Each one applies far beyond bicycles — to motorbikes, planes, satellites, and even spinning coins."
        descKh="ចុចលើសសរណាមួយដើម្បីពង្រីក។ នីមួយៗត្រូវបានអនុវត្តជាងកង់ — ម៉ូតូ យន្តហោះ ផ្កាយរណប និងសូម្បីតែកាក់រង្វិល។"
        isKh={isKh}
      >
        <FourPillars isKh={isKh} />
      </Section>

      <Section
        eyebrowEn="03 · Try it yourself"
        eyebrowKh="០៣ · សាកល្បងដោយខ្លួនឯង"
        titleEn="The Balance Lab"
        titleKh="មន្ទីរពិសោធន៍តុល្យភាព"
        descEn="Move the speed slider. At high speed the bike snaps upright by itself. At low speed it wobbles — and below ~3 km/h, it falls. Speed creates stability. This is why it's easier to balance a moving bike than a stationary one."
        descKh="អូសល្បឿន។ នៅល្បឿនលឿន កង់នឹងបញ្ឈរដោយខ្លួនឯង។ នៅល្បឿនយឺត វារញ្ជួយ — ហើយក្រោម ~៣ គីឡូ/ម៉ោង វាដួល។ ល្បឿនបង្កើតស្ថិរភាព។ នេះជាមូលហេតុដែលងាយស្រួលជាងក្នុងការទ្រកង់ដែលកំពុងធ្វើដំណើរ ជាងកង់ដែលនៅនឹង។"
        isKh={isKh}
      >
        <BalanceLab isKh={isKh} />
      </Section>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-cyan-200/60 text-sm italic">
        <span className={isKh ? "font-khmer not-italic" : ""}>
          {isKh
            ? "“ជីវិតគឺដូចជាការជិះកង់។ ដើម្បីរក្សាតុល្យភាព អ្នកត្រូវតែបន្តធ្វើដំណើរ។” — Albert Einstein"
            : "“Life is like riding a bicycle. To keep your balance, you must keep moving.” — Albert Einstein"}
        </span>
      </footer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Layout helpers
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
      <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-300/90 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        <Sparkles className="w-3 h-3" />
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-cyan-50 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-cyan-100/75 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function BlueprintCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#0e1f44]/85 backdrop-blur-sm rounded-xl border border-cyan-400/30 shadow-[0_2px_24px_-12px_rgba(34,211,238,0.25)] ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({
  icon: Icon, titleEn, titleKh, isKh,
}: {
  icon: typeof Bike;
  titleEn: string; titleKh: string; isKh: boolean;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-cyan-400/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className={`font-display font-bold text-xl text-cyan-50 mt-1 ${isKh ? "font-khmer" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h3>
    </div>
  );
}

function BlueprintBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <svg width="100%" height="100%" className="opacity-[0.18]">
        <defs>
          <pattern id="bp-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#67e8f9" strokeWidth="0.3" />
          </pattern>
          <pattern id="bp-grid-coarse" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#bp-grid-fine)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#67e8f9" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid-coarse)" />
      </svg>
      <div className="absolute top-32 -left-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1. Balance diagram — front view + caster trail
// ════════════════════════════════════════════════════════════════════════════

function BalanceDiagram({ isKh }: { isKh: boolean }) {
  const [showTrail, setShowTrail] = useState(false);
  const [spinning, setSpinning] = useState(true);

  const W = 720, H = 360;

  return (
    <BlueprintCard className="p-5 sm:p-6">
      <CardHeader
        icon={Bike}
        titleEn="Front-view technical drawing"
        titleKh="គំនូរបច្ចេកទេសផ្នែកមុខ"
        isKh={isKh}
      />

      <div className="bg-[#081229] rounded-lg border border-cyan-400/20 p-3 mb-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-labelledby="bp-bal-title bp-bal-desc">
          <title id="bp-bal-title">{isKh ? "កង់មើលពីខាងមុខ និងការសិក្សា ទ្រ" : "Bicycle front view and caster-trail study"}</title>
          <desc id="bp-bal-desc">{isKh ? "គំនូរបច្ចេកទេសស្ទីលប្លូព្រីនបង្ហាញកង់មុខដែលបង្វិល លំអៀង បង្ហាញឥទ្ធិពលជីរ៉ូស្កុប និងមើលពីចំហៀងបង្ហាញ ទ្រ — ចម្ងាយរវាងអ័ក្សដឹកនាំ និងចំណុចប៉ះដី។" : "Blueprint-style technical drawing showing the front wheel spinning and tilted to demonstrate the gyroscopic effect, plus a side view showing the trail — the distance between the steering axis and the tire contact point."}</desc>

          {/* Coordinate ticks (top) */}
          <g stroke="#67e8f9" strokeWidth="0.5" opacity="0.4">
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={`tk-${i}`} x1={i * 60} y1={0} x2={i * 60} y2={6} />
            ))}
          </g>

          {/* ─── LEFT half: front view ─── */}
          <g transform="translate(60, 30)">
            <text x="0" y="0" fontSize="11" fontWeight="700" fill="#67e8f9" letterSpacing="2">
              FIG. 1 · {isKh ? "មុខ" : "FRONT VIEW"}
            </text>

            {/* Ground line — placed at wheel-bottom so the tire visibly touches */}
            <line x1="0" y1="276" x2="280" y2="276" stroke="#67e8f9" strokeWidth="1.2" />
            {[...Array(15)].map((_, i) => (
              <line key={`gnd-${i}`} x1={i * 20} y1="276" x2={i * 20 - 8} y2="286" stroke="#67e8f9" strokeWidth="0.6" />
            ))}

            {/* Wheel — disk (radius 76, centre y=200, bottom at y=276 → on the ground) */}
            <g transform="translate(140, 200)">
              <circle r="76" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
              <circle r="76" fill="#22d3ee" opacity="0.06" />
              {/* Spokes — rotated by rotation animation */}
              <g className={spinning ? "bp-spin-fast" : ""} style={{ transformOrigin: "0 0" }}>
                {[0, 30, 60, 90, 120, 150].map((a) => (
                  <line key={a} x1="0" y1="0" x2={Math.cos((a * Math.PI) / 180) * 72} y2={Math.sin((a * Math.PI) / 180) * 72} stroke="#67e8f9" strokeWidth="1" opacity="0.7" />
                ))}
                {[0, 30, 60, 90, 120, 150].map((a) => (
                  <line key={`mr-${a}`} x1="0" y1="0" x2={-Math.cos((a * Math.PI) / 180) * 72} y2={-Math.sin((a * Math.PI) / 180) * 72} stroke="#67e8f9" strokeWidth="1" opacity="0.7" />
                ))}
              </g>
              {/* Hub */}
              <circle r="6" fill="#0b1733" stroke="#facc15" strokeWidth="1.5" />
              {/* Spin direction arrow */}
              {spinning && (
                <g>
                  <path d="M 0 -88 A 88 88 0 0 1 60 -65" fill="none" stroke="#facc15" strokeWidth="1.5" />
                  <polygon points="60,-65 53,-72 53,-58" fill="#facc15" />
                </g>
              )}
            </g>

            {/* Frame (front view: just the seat tube) */}
            <line x1="140" y1="200" x2="140" y2="60" stroke="#22d3ee" strokeWidth="2" />
            {/* Handlebars */}
            <line x1="100" y1="80" x2="180" y2="80" stroke="#22d3ee" strokeWidth="2.5" />
            <line x1="140" y1="80" x2="140" y2="60" stroke="#22d3ee" strokeWidth="2" />
            {/* Seat */}
            <ellipse cx="140" cy="55" rx="14" ry="4" fill="#22d3ee" opacity="0.6" />

            {/* Centre-of-mass marker */}
            <g transform="translate(140, 130)">
              <circle r="9" fill="none" stroke="#facc15" strokeWidth="1.5" />
              <line x1="-9" y1="0" x2="9" y2="0" stroke="#facc15" strokeWidth="1" />
              <line x1="0" y1="-9" x2="0" y2="9" stroke="#facc15" strokeWidth="1" />
              <text x="14" y="-12" fontSize="9" fill="#facc15" fontWeight="700">CoM</text>
            </g>

            {/* Vertical reference line (gravity) */}
            <line x1="140" y1="0" x2="140" y2="276" stroke="#facc15" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />
            <text x="146" y="14" fontSize="9" fill="#facc15" opacity="0.8">g ↓</text>

            {/* Tilt angle arc demonstrating gyroscopic precession */}
            <g opacity="0.85">
              <path d="M 140 200 L 162 240" stroke="#67e8f9" strokeWidth="1.2" strokeDasharray="2 2" />
              <path d="M 153 220 A 18 18 0 0 0 156 233" fill="none" stroke="#67e8f9" strokeWidth="0.8" />
              <text x="165" y="232" fontSize="8" fill="#67e8f9">θ</text>
            </g>

            {/* Caption */}
            <text x="0" y="320" fontSize="10" fill="#bae6fd" fontStyle="italic">
              {isKh ? "កង់រង្វិល ⇒ ជីរ៉ូស្កុប ⇒ ទប់ទល់ការដួល" : "Spinning wheel ⇒ gyroscope ⇒ resists tipping"}
            </text>
          </g>

          {/* Divider */}
          <line x1={W / 2} y1="20" x2={W / 2} y2={H - 20} stroke="#67e8f9" strokeWidth="0.4" strokeDasharray="4 4" opacity="0.5" />

          {/* ─── RIGHT half: caster / trail ─── */}
          <g transform="translate(390, 30)">
            <text x="0" y="0" fontSize="11" fontWeight="700" fill="#67e8f9" letterSpacing="2">
              FIG. 2 · {isKh ? "ចំហៀង · ទ្រ" : "SIDE · TRAIL"}
            </text>

            {/* Ground (wheel radius 60, centre y=196 → bottom at 256) */}
            <line x1="0" y1="256" x2="280" y2="256" stroke="#67e8f9" strokeWidth="1.2" />
            {[...Array(15)].map((_, i) => (
              <line key={`gn2-${i}`} x1={i * 20} y1="256" x2={i * 20 - 8} y2="266" stroke="#67e8f9" strokeWidth="0.6" />
            ))}

            {/* Wheel */}
            <g transform="translate(180, 196)">
              <circle r="60" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
              <circle r="6"  fill="#0b1733" stroke="#facc15" strokeWidth="1.5" />
            </g>

            {/* Steering / fork tube — head tube angle ~73° */}
            {(() => {
              const hx = 180, hy = 196;
              const groundY = 256;
              const angleDeg = 73;
              const a = ((90 - angleDeg) * Math.PI) / 180; // measured from vertical
              const topX = hx - Math.sin(a) * 130;
              const topY = hy - Math.cos(a) * 130;
              // Steering axis extended to the ground for trail
              const tGround = (groundY - hy) / Math.cos(a);
              const groundX = hx + Math.sin(a) * tGround;
              const tireContactX = hx;
              const tireContactY = groundY;
              return (
                <g>
                  {/* Fork (down to wheel hub, but offset forward) */}
                  <line x1={hx + 8} y1={hy} x2={topX + 8} y2={topY} stroke="#22d3ee" strokeWidth="2.5" />
                  <line x1={hx - 8} y1={hy} x2={topX - 8} y2={topY} stroke="#22d3ee" strokeWidth="2.5" />
                  {/* Crown */}
                  <line x1={topX - 12} y1={topY} x2={topX + 12} y2={topY} stroke="#22d3ee" strokeWidth="2" />
                  {/* Steering axis (extended through to ground) */}
                  <line x1={topX} y1={topY - 30} x2={groundX} y2={groundY} stroke="#facc15" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.9" />
                  <text x={topX - 80} y={topY - 18} fontSize="9" fill="#facc15" fontWeight="700">
                    {isKh ? "អ័ក្សដឹកនាំ" : "STEERING AXIS"}
                  </text>

                  {/* Tire contact point */}
                  <circle cx={tireContactX} cy={tireContactY} r="3" fill="#facc15" />

                  {/* Trail measurement */}
                  {showTrail && (
                    <g>
                      <line x1={tireContactX} y1={groundY + 12} x2={groundX} y2={groundY + 12} stroke="#f43f5e" strokeWidth="1.6" />
                      <line x1={tireContactX} y1={groundY + 6}  x2={tireContactX} y2={groundY + 18} stroke="#f43f5e" strokeWidth="1.2" />
                      <line x1={groundX}      y1={groundY + 6}  x2={groundX}      y2={groundY + 18} stroke="#f43f5e" strokeWidth="1.2" />
                      <text x={(tireContactX + groundX) / 2} y={groundY + 30} fontSize="11" fill="#f43f5e" textAnchor="middle" fontWeight="700">
                        {isKh ? "ទ្រ" : "TRAIL"}
                      </text>
                      {/* Self-steer arrow */}
                      <path d={`M ${tireContactX} ${tireContactY + 6} Q ${(tireContactX + groundX) / 2} ${tireContactY + 30}, ${groundX - 6} ${tireContactY + 4}`} fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                      <polygon points={`${groundX - 6},${tireContactY + 4} ${groundX - 14},${tireContactY + 10} ${groundX - 4},${tireContactY + 12}`} fill="#f43f5e" />
                    </g>
                  )}
                </g>
              );
            })()}

            <text x="0" y="320" fontSize="10" fill="#bae6fd" fontStyle="italic">
              {isKh ? "ចំណុចប៉ះកង់នៅខាងក្រោយអ័ក្ស ⇒ កង់ដឹកនាំខ្លួនឯង" : "Contact point trails the steering axis ⇒ wheel self-steers"}
            </text>
          </g>
        </svg>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0b1733]/70 border border-cyan-400/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <RotateCw className="w-4 h-4 text-cyan-300" />
            <h4 className={`font-display font-bold text-cyan-50 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "បែបផែនជីរ៉ូស្កុប" : "Gyroscopic effect"}
            </h4>
          </div>
          <p className={`text-sm text-cyan-100/80 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "កង់ដែលរង្វិលប្រព្រឹត្តដូចជាក្បាលរង្វិល (ភ្នាក់ងារកំពូលតូច)។ នៅពេលដែលមានកម្លាំងព្យាយាមផ្អៀងពួកវា ពួកវាបញ្ចេញកម្លាំងស្មើគ្នាទប់ទល់វិញ — ហៅថា 'ការប៉ះទង្គិចជីរ៉ូស្កុបិច'។ បែបផែននេះតូច ប៉ុន្តែពិត — វាជាអ្នកចូលរួមមួយ មិនមែនជាមូលហេតុទាំងមូលនៃតុល្យភាពទេ។"
              : "Spinning wheels behave like little tops. When something tries to tilt them, they push back at right angles — called 'gyroscopic precession.' The effect is small but real. It's one contributor — not the whole story."}
          </p>
          <button
            onClick={() => setSpinning((s) => !s)}
            aria-pressed={spinning}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors ${
              spinning ? "bg-cyan-400 text-[#0b1733] hover:bg-cyan-300" : "bg-cyan-400/20 text-cyan-100 hover:bg-cyan-400/30"
            } ${isKh ? "font-khmer" : ""}`}
          >
            {spinning ? <><Pause className="w-4 h-4" />{isKh ? "ឈប់រង្វិល" : "Stop spinning"}</> : <><Play className="w-4 h-4" />{isKh ? "ចាប់ផ្ដើមរង្វិល" : "Start spinning"}</>}
          </button>
        </div>

        <div className="bg-[#0b1733]/70 border border-cyan-400/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-cyan-300" />
            <h4 className={`font-display font-bold text-cyan-50 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ឥទ្ធិពលសាស់ទ័រ (ទ្រ)" : "Caster effect (trail)"}
            </h4>
          </div>
          <p className={`text-sm text-cyan-100/80 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            {isKh
              ? "សន្លាក់ដឹកនាំក្បាលនៃកង់មាននៅខាងមុខបន្តិចនៃចំណុចដែលកង់ប៉ះដី។ ដូចជាកង់រទេះក្នុងហាងទំនិញ — នៅពេលកង់ផ្អៀង ការខុសគ្នានោះបង្កើតកម្លាំងបង្វិលដែលទាញកង់ត្រឡប់ក្រោមចំណុចកណ្ដាលនៃម៉ាសវិញ។ អ្នកស្រាវជ្រាវពីឆ្នាំ ២០១១ បានបង្ហាញថាសូម្បីតែគ្មានបែបផែននេះ ឬជីរ៉ូក៏កង់អាចមានស្ថិរភាពដោយខ្លួនឯងបាន — ដូច្នេះវាជាការរួមបញ្ចូលគ្នានៃកត្តាជាច្រើន។"
              : "The bike's steering axis points to the ground a few cm in FRONT of where the tire actually touches. Like a shopping-cart wheel — when the bike leans, that offset creates a torque that pulls the wheel back under the centre of mass. (A 2011 study showed bikes can self-stabilise even without trail or gyroscope — so it's a combination of effects, not a single magic ingredient.)"}
          </p>
          <button
            onClick={() => setShowTrail((t) => !t)}
            aria-pressed={showTrail}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors ${
              showTrail ? "bg-rose-500 text-white hover:bg-rose-400" : "bg-cyan-400/20 text-cyan-100 hover:bg-cyan-400/30"
            } ${isKh ? "font-khmer" : ""}`}
          >
            <Ruler className="w-4 h-4" />
            {showTrail ? (isKh ? "លាក់ការវាស់ទ្រ" : "Hide trail measurement") : (isKh ? "បង្ហាញការវាស់ទ្រ" : "Show trail measurement")}
          </button>
        </div>
      </div>
    </BlueprintCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. Four pillars
// ════════════════════════════════════════════════════════════════════════════

function FourPillars({ isKh }: { isKh: boolean }) {
  const PILLARS = [
    {
      key: "angular",
      icon: RotateCw,
      titleEn: "Angular Momentum",
      titleKh: "កម្លាំងរង្វិល",
      formula: "L = I · ω",
      bodyEn: "A spinning object stores rotational momentum L equal to its moment of inertia I times its angular velocity ω. Changing the direction of L requires a torque — so a fast wheel actively resists falling sideways.",
      bodyKh: "វត្ថុរង្វិលរក្សាទុកកម្លាំងរង្វិល L ដែលស្មើនឹងម៉ូម៉ង់ I គុណល្បឿនមុំ ω។ ការផ្លាស់ប្ដូរទិសរបស់ L ត្រូវការកម្លាំងបង្វិល — ដូច្នេះកង់លឿនទប់ទល់ការដួលចំហៀង។",
      examples: [
        { en: "Spinning top stays upright", kh: "កំពូលរង្វិលឈរត្រង់" },
        { en: "Helicopter rotor stabilises body", kh: "ឧទ្ធម្ភាគចក្រស្ថាបនាតួ" },
        { en: "Frisbee flies straight", kh: "ហ្វ្រីសប៊ីហោះត្រង់" },
      ],
    },
    {
      key: "com",
      icon: Anchor,
      titleEn: "Centre of Mass",
      titleKh: "ចំណុចកណ្តាលនៃម៉ាស",
      formula: "Σ(m·r) / Σm",
      bodyEn: "The 'balance point' of you + bike combined. To turn left, you actually lean LEFT first — that moves the CoM off-line, gravity tries to pull you down, and you steer into the lean to catch yourself. Steering is balancing.",
      bodyKh: "'ចំណុចតុល្យភាព' នៃអ្នក + កង់រួមគ្នា។ ដើម្បីបត់ឆ្វេង អ្នកពិតជាផ្អៀងទៅឆ្វេងជាមុន — នោះធ្វើឲ្យចំណុចកណ្ដាលនៃម៉ាសផ្លាស់ ទំនាញព្យាយាមទាញអ្នកចុះ ហើយអ្នកដឹកនាំចូលក្នុងការផ្អៀងដើម្បីចាប់ខ្លួនឯង។ ការដឹកនាំ = ការតុល្យភាព។",
      examples: [
        { en: "Tightrope walker uses a pole to lower CoM", kh: "អ្នកដើរលើខ្សែ ប្រើបង្គោលដើម្បីបន្ទាបចំណុចកណ្ដាល" },
        { en: "Motorcycle racers hang off the seat", kh: "អ្នកជិះម៉ូតូប្រណាំងព្យួរខ្លួនពីកៅអី" },
        { en: "A loaded basket on the head — keep it directly above you", kh: "កន្ត្រកពេញលើក្បាល — រក្សាវានៅផ្ទាល់លើខ្លួន" },
      ],
    },
    {
      key: "friction",
      icon: Gauge,
      titleEn: "Friction",
      titleKh: "កម្លាំងកកិត",
      formula: "f = μ · N",
      bodyEn: "Forward force comes from STATIC friction between the rear tire and the road — the rubber 'grabs' the surface as the wheel turns, never sliding. If friction were zero (ice), pedalling would just spin the wheel uselessly.",
      bodyKh: "កម្លាំងទៅមុខមកពីកម្លាំងកកិតស្ថិត រវាងកង់ក្រោយ និងផ្លូវ — កៅស៊ូ 'ចាប់' ផ្ទៃពេលកង់ងាករបស់វា ដោយមិនរអិល។ បើកកិតគឺសូន្យ (ទឹកកក) ការជាន់នឹងគ្រាន់តែបង្វិលកង់ដោយឥតប្រយោជន៍។",
      examples: [
        { en: "Tread pattern channels away water (rain)", kh: "លំនាំផ្ទៃបង្ហូរទឹកចេញ (ភ្លៀង)" },
        { en: "Wider tires = more contact area = more grip", kh: "កង់ធំ = ផ្ទៃច្រើន = ការចាប់ច្រើន" },
        { en: "Brakes turn motion into HEAT via friction", kh: "ហ្វ្រាំងបំប្លែងចលនាជាកំដៅតាមរយៈកកិត" },
      ],
    },
    {
      key: "gear",
      icon: Settings2,
      titleEn: "Gearing & Torque",
      titleKh: "កង់ស្នូល និងកម្លាំងបង្វិល",
      formula: "τ_out / τ_in = r_out / r_in",
      bodyEn: "Your legs make TORQUE (twisting force). The chain connects a big front sprocket to a smaller rear cog. A bigger ratio means LESS torque at the wheel but MORE wheel-revolutions per pedal-stroke — fast on flat ground. A smaller ratio is the opposite — slow, but powerful for climbing hills.",
      bodyKh: "ជើងរបស់អ្នកបង្កើតកម្លាំងបង្វិល τ។ ខ្សែភ្ជាប់សៀកមុខធំទៅសៀកក្រោយតូច។ សមាមាត្រធំ = កម្លាំងបង្វិលនៅកង់តិច ប៉ុន្តែបង្វិលច្រើនក្នុងមួយការជាន់ — លឿននៅផ្ទៃរាប។ សមាមាត្រតូច = ផ្ទុយ — យឺត ប៉ុន្តែខ្លាំងសម្រាប់ឡើងភ្នំ។",
      examples: [
        { en: "Climbing: shift to LOW gear (small front, big rear)", kh: "ឡើង: ប្ដូរទៅលេខទាប (មុខតូច ក្រោយធំ)" },
        { en: "Sprinting: shift to HIGH gear (big front, small rear)", kh: "ប្រណាំង: ប្ដូរទៅលេខខ្ពស់ (មុខធំ ក្រោយតូច)" },
        { en: "A car gearbox does the exact same trick", kh: "ប្រអប់លេខឡានធ្វើល្បិចដូចគ្នា" },
      ],
    },
  ] as const;

  const [active, setActive] = useState<string>(PILLARS[0].key);
  const cur = PILLARS.find((p) => p.key === active)!;
  const Icon = cur.icon;

  return (
    <BlueprintCard className="p-5 sm:p-6">
      {/* Pillar grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {PILLARS.map((p) => {
          const PIcon = p.icon;
          const isActive = p.key === active;
          return (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              aria-pressed={isActive}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isActive
                  ? "bg-cyan-400/15 border-cyan-300 shadow-[0_0_20px_-6px_rgba(34,211,238,0.6)]"
                  : "bg-[#0b1733]/60 border-cyan-400/20 hover:border-cyan-400/50 hover:bg-[#0b1733]"
              }`}
            >
              <div className={`w-9 h-9 rounded-md flex items-center justify-center mb-2 ${isActive ? "bg-cyan-300 text-[#0b1733]" : "bg-cyan-400/20 text-cyan-300"}`}>
                <PIcon className="w-5 h-5" />
              </div>
              <div className={`font-display font-bold text-sm text-cyan-50 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? p.titleKh : p.titleEn}
              </div>
              <div className="font-mono text-[10px] text-cyan-300/80 mt-0.5">{p.formula}</div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="bg-[#081229] border border-cyan-400/30 rounded-lg p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-md bg-cyan-300 text-[#0b1733] flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className={`font-display font-bold text-xl text-cyan-50 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? cur.titleKh : cur.titleEn}
            </h4>
            <div className="font-mono text-xs text-cyan-300 mt-0.5">{cur.formula}</div>
          </div>
        </div>
        <p className={`text-sm text-cyan-100/85 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
          {isKh ? cur.bodyKh : cur.bodyEn}
        </p>
        <div className={`text-[10px] font-bold uppercase tracking-widest text-cyan-300/80 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
          {isKh ? "មើលនៅទីណាខ្លះ" : "Where you see it"}
        </div>
        <ul className="space-y-1.5">
          {cur.examples.map((ex, i) => (
            <li key={i} className={`flex items-start gap-2 text-sm text-cyan-100/80 ${isKh ? "font-khmer leading-loose" : ""}`}>
              <CheckCircle2 className="w-4 h-4 text-cyan-300 flex-shrink-0 mt-0.5" />
              <span>{isKh ? ex.kh : ex.en}</span>
            </li>
          ))}
        </ul>
      </div>
    </BlueprintCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. Balance Lab simulator
// ════════════════════════════════════════════════════════════════════════════

function BalanceLab({ isKh }: { isKh: boolean }) {
  const [speed, setSpeed] = useState(15);          // km/h
  const [running, setRunning] = useState(false);
  const [angle, setAngle] = useState(0);           // tilt angle in radians (-fall=neg)
  const [omega, setOmega] = useState(0);           // angular velocity
  const [fallen, setFallen] = useState(false);
  const [survival, setSurvival] = useState(0);     // seconds upright

  const lastTimeRef = useRef<number>(performance.now());
  const rafRef = useRef<number | null>(null);
  const survivalStartRef = useRef<number>(0);

  // Mount the latest values on a ref so the rAF loop sees them without restarting
  const stateRef = useRef({ speed, angle, omega, running, fallen });
  useEffect(() => {
    stateRef.current = { speed, angle, omega, running, fallen };
  });

  // Pause the rAF loop when the tab is hidden (visibility API).
  const visibleRef = useRef<boolean>(typeof document === "undefined" ? true : !document.hidden);
  useEffect(() => {
    const onVis = () => { visibleRef.current = !document.hidden; lastTimeRef.current = performance.now(); };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const tick = (t: number) => {
      const dt = Math.min(0.04, (t - lastTimeRef.current) / 1000);
      lastTimeRef.current = t;
      const s = stateRef.current;

      if (s.running && !s.fallen && visibleRef.current) {
        // Physics: inverted pendulum auto-stabilised by speed.
        //   d²θ/dt² = (g/L)·sin θ  − k·v²·sin θ  − c·v·dθ/dt  + ξ(v)
        // Pedagogical toy model — tuned for visual feel, NOT a real engineering
        // simulation. Real bicycle self-stability is a multi-mechanism story
        // (Kooijman et al., Science 2011).
        const g_over_L = 9;            // gravity/length term — strength of falling
        const stabilise = 0.35 * s.speed * s.speed;  // restoring (∝ v²) — gyro + steer-into-lean
        const damp      = 0.6  * s.speed;            // damping (∝ v)
        const noise     = (Math.random() - 0.5) * (1.6 / Math.max(0.5, s.speed));

        const a = (g_over_L - stabilise) * Math.sin(s.angle) - damp * s.omega + noise;
        let newOmega = s.omega + a * dt;
        let newAngle = s.angle + newOmega * dt;

        if (Math.abs(newAngle) > Math.PI / 4) {
          // Fell over!
          newAngle = Math.sign(newAngle) * Math.PI / 4;
          newOmega = 0;
          setFallen(true);
          setSurvival((performance.now() - survivalStartRef.current) / 1000);
        }
        setAngle(newAngle);
        setOmega(newOmega);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const reset = () => {
    // Pause the simulation on reset — otherwise at low speed the noise term
    // tips the bike over again before the user can react.
    setRunning(false);
    setAngle(0);
    setOmega(0);
    setFallen(false);
    setSurvival(0);
    survivalStartRef.current = performance.now();
  };
  const start = () => {
    if (fallen) reset();
    setRunning(true);
    survivalStartRef.current = performance.now();
  };

  // Stability indicator — green > 8 km/h, amber 4-8, red < 4
  const stability = speed > 8 ? "stable" : speed > 4 ? "wobbly" : "unstable";
  const stabColor = stability === "stable" ? "#22c55e" : stability === "wobbly" ? "#facc15" : "#f43f5e";
  const stabEn = stability === "stable" ? "STABLE" : stability === "wobbly" ? "WOBBLY" : "UNSTABLE";
  const stabKh = stability === "stable" ? "មានស្ថិរភាព" : stability === "wobbly" ? "រញ្ជួយ" : "គ្មានស្ថិរភាព";

  // SVG layout — wheel radius 60, centre at -66 inside the rotating group, so
  // its bottom is at the group origin (which sits exactly on `groundY`).
  const W = 720, H = 360;
  const groundY = 286;
  const tiltDeg = (angle * 180) / Math.PI;

  return (
    <BlueprintCard className="p-5 sm:p-6">
      <CardHeader
        icon={Bike}
        titleEn="Balance Lab — feel the speed-stability link"
        titleKh="មន្ទីរពិសោធន៍តុល្យភាព — អារម្មណ៍តំណល្បឿន-ស្ថិរភាព"
        isKh={isKh}
      />

      {/* SVG */}
      <div className="bg-[#081229] rounded-lg border border-cyan-400/20 p-3 mb-4 relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-labelledby="bp-lab-title bp-lab-desc">
          <title id="bp-lab-title">{isKh ? "ការក្លែងបន្លំតុល្យភាពកង់" : "Bicycle balance simulator"}</title>
          <desc id="bp-lab-desc">{isKh ? "កង់ផ្នែកមុខផ្អៀងតាមការក្លែងបន្លំ — ផ្អៀងច្រើននៅពេលល្បឿនតិច និងតឹងជាងនៅពេលល្បឿនលឿន" : "A front-view bike that tilts according to a simulated inverted-pendulum model — wobbles more at low speed and stabilises at high speed"}</desc>

          {/* Ground hatched */}
          <line x1="0" y1={groundY} x2={W} y2={groundY} stroke="#67e8f9" strokeWidth="1.4" />
          {[...Array(36)].map((_, i) => (
            <line key={`gh-${i}`} x1={i * 20} y1={groundY} x2={i * 20 - 8} y2={groundY + 12} stroke="#67e8f9" strokeWidth="0.6" />
          ))}

          {/* Vertical reference */}
          <line x1={W / 2} y1="20" x2={W / 2} y2={groundY} stroke="#facc15" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />

          {/* Bike pivots about the contact point on ground */}
          <g transform={`translate(${W / 2}, ${groundY}) rotate(${tiltDeg})`}>
            {/* Wheel */}
            <circle cx="0" cy="-66" r="60" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
            <circle cx="0" cy="-66" r="60" fill="#22d3ee" opacity="0.05" />
            <g style={{ transformOrigin: `0px -66px` }} className={running && !fallen && speed > 0 ? "bp-spin-fast" : ""}>
              {[0, 30, 60, 90, 120, 150].map((a) => (
                <line key={a} x1="0" y1="-66" x2={Math.cos((a * Math.PI) / 180) * 56} y2={-66 + Math.sin((a * Math.PI) / 180) * 56} stroke="#67e8f9" strokeWidth="1" opacity="0.7" />
              ))}
              {[0, 30, 60, 90, 120, 150].map((a) => (
                <line key={`mr-${a}`} x1="0" y1="-66" x2={-Math.cos((a * Math.PI) / 180) * 56} y2={-66 - Math.sin((a * Math.PI) / 180) * 56} stroke="#67e8f9" strokeWidth="1" opacity="0.7" />
              ))}
            </g>
            <circle cx="0" cy="-66" r="5" fill="#0b1733" stroke="#facc15" strokeWidth="1.4" />

            {/* Frame post */}
            <line x1="0" y1="-66" x2="0" y2="-180" stroke="#22d3ee" strokeWidth="2.2" />
            {/* Handlebars */}
            <line x1="-30" y1="-170" x2="30" y2="-170" stroke="#22d3ee" strokeWidth="2.2" />
            <line x1="0"   y1="-170" x2="0"  y2="-180" stroke="#22d3ee" strokeWidth="2" />
            {/* Seat */}
            <ellipse cx="0" cy="-185" rx="11" ry="3" fill="#22d3ee" opacity="0.6" />

            {/* Stick rider */}
            <circle cx="0" cy="-200" r="10" fill="none" stroke="#bae6fd" strokeWidth="1.6" />
            <line x1="0" y1="-190" x2="0" y2="-160" stroke="#bae6fd" strokeWidth="1.6" />
            <line x1="0" y1="-178" x2="-18" y2="-170" stroke="#bae6fd" strokeWidth="1.4" />
            <line x1="0" y1="-178" x2="18"  y2="-170" stroke="#bae6fd" strokeWidth="1.4" />
            {/* Legs to pedals */}
            <line x1="0" y1="-160" x2="-12" y2="-130" stroke="#bae6fd" strokeWidth="1.4" />
            <line x1="0" y1="-160" x2="12"  y2="-135" stroke="#bae6fd" strokeWidth="1.4" />

            {/* Tilt arc */}
            <path d="M 0 -10 A 50 50 0 0 1 35 -36" fill="none" stroke={stabColor} strokeWidth="1" opacity="0.7" />
          </g>

          {/* Speed readout (top right) */}
          <g>
            <rect x={W - 144} y={14} width="130" height="30" rx="4" fill="#081229" stroke="#67e8f9" strokeWidth="1" />
            <text x={W - 134} y="34" fontSize="13" fontFamily="monospace" fill="#67e8f9" fontWeight="700">
              v = {speed.toFixed(1)} km/h
            </text>
          </g>
          {/* Angle readout */}
          <g>
            <rect x={W - 144} y={50} width="130" height="30" rx="4" fill="#081229" stroke={stabColor} strokeWidth="1" />
            <text x={W - 134} y="70" fontSize="13" fontFamily="monospace" fill={stabColor} fontWeight="700">
              θ = {tiltDeg.toFixed(1)}°
            </text>
          </g>

          {/* Fallen overlay */}
          {fallen && (
            <g>
              <rect x={W / 2 - 110} y={groundY - 240} width="220" height="40" rx="6" fill="#0b1733" stroke="#f43f5e" strokeWidth="1.5" />
              <text x={W / 2} y={groundY - 214} fontSize="14" fontWeight="700" fill="#f43f5e" textAnchor="middle">
                {isKh ? `ដួល! ឈរបាន ${survival.toFixed(1)} វិ.` : `CRASH! Stayed up for ${survival.toFixed(1)} s`}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Speed slider + status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2 bg-[#0b1733]/70 border border-cyan-400/20 rounded-lg p-4">
          <label className={`flex items-center justify-between text-sm text-cyan-100/90 mb-2 ${isKh ? "font-khmer" : ""}`}>
            <span>{isKh ? "ល្បឿន" : "Speed"}</span>
            <span className="font-mono text-cyan-300">{speed.toFixed(1)} km/h</span>
          </label>
          <input
            type="range"
            min={0}
            max={30}
            step={0.5}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full accent-cyan-400"
            aria-label={isKh ? "ល្បឿនកង់" : "Bicycle speed"}
          />
          <div className="flex justify-between text-[10px] text-cyan-300/60 mt-1 font-mono">
            <span>0</span><span>10</span><span>20</span><span>30 km/h</span>
          </div>
        </div>

        <div className="rounded-lg p-4 border-2 flex flex-col justify-center" style={{ backgroundColor: `${stabColor}15`, borderColor: `${stabColor}80` }}>
          <div className={`text-[10px] font-bold uppercase tracking-widest ${isKh ? "font-khmer tracking-normal normal-case" : ""}`} style={{ color: stabColor }}>
            {isKh ? "ស្ថានភាព" : "Status"}
          </div>
          <div className={`font-display font-bold text-xl ${isKh ? "font-khmer" : ""}`} style={{ color: stabColor }}>
            {isKh ? stabKh : stabEn}
          </div>
          <div className={`text-xs mt-1 ${isKh ? "font-khmer" : ""}`} style={{ color: stabColor + "cc" }}>
            {stability === "stable"
              ? (isKh ? "ឆ្ងាយជាងល្បឿនរបាំង" : "Above the wobble threshold")
              : stability === "wobbly"
                ? (isKh ? "ក្បែរល្បឿនរបាំង" : "Near the wobble threshold")
                : (isKh ? "នឹងដួលឆាប់ៗ" : "Will fall soon")}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={() => running ? setRunning(false) : start()}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors ${
            running ? "bg-cyan-400/20 text-cyan-100 hover:bg-cyan-400/30" : "bg-cyan-400 text-[#0b1733] hover:bg-cyan-300"
          } ${isKh ? "font-khmer" : ""}`}
        >
          {running ? <><Pause className="w-4 h-4" />{isKh ? "ឈប់" : "Pause"}</> : <><Play className="w-4 h-4" />{isKh ? "ចាប់ផ្ដើម" : "Start ride"}</>}
        </button>
        <button
          onClick={reset}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm bg-cyan-400/20 text-cyan-100 hover:bg-cyan-400/30 ${isKh ? "font-khmer" : ""}`}
        >
          <RefreshCw className="w-4 h-4" />
          {isKh ? "ដាក់ឡើងវិញ" : "Reset"}
        </button>
        <button
          onClick={() => setSpeed(2)}
          className={`px-3 py-2 rounded-full font-bold text-xs bg-rose-500/15 text-rose-300 border border-rose-400/40 hover:bg-rose-500/25 ${isKh ? "font-khmer" : ""}`}
        >
          {isKh ? "ល្បឿនយឺត ២" : "Slow: 2 km/h"}
        </button>
        <button
          onClick={() => setSpeed(20)}
          className={`px-3 py-2 rounded-full font-bold text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 hover:bg-emerald-500/25 ${isKh ? "font-khmer" : ""}`}
        >
          {isKh ? "ល្បឿនលឿន ២០" : "Fast: 20 km/h"}
        </button>
      </div>

      <div className={`flex items-start gap-2 text-sm text-cyan-100/85 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-300" />
        <span>
          {isKh
            ? "នេះគឺគំរូកាយវិទ្យាសម្រាប់ការអប់រំ — ការក្លែងបន្លំការលំអៀង។ កម្លាំងស្ថាបនាកើនឡើងជាមួយ v² ដូច្នេះការទ្វេដងល្បឿនបង្កើនការទប់ទល់ការដួលបួនដង — នេះជាមូលហេតុដែលមាន 'ចំណុច' ច្បាស់នៅប្រហែល ៣–៥ គីឡូ/ម៉ោង។"
            : "This is an educational physics model — an inverted-pendulum simulation. The restoring effect grows with v², so doubling the speed quadruples the bike's resistance to falling — which is why there's a sharp threshold around 3–5 km/h."}
        </span>
      </div>
    </BlueprintCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Scoped styles
// ════════════════════════════════════════════════════════════════════════════

function ScopedStyles() {
  return (
    <style>{`
      .bp-text-shine {
        background: linear-gradient(90deg, #67e8f9 0%, #ffffff 50%, #67e8f9 100%);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: bp-shine-kf 4s linear infinite;
      }
      @keyframes bp-shine-kf {
        0%   { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }

      @keyframes bp-float-kf {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-6px); }
      }
      .bp-float { animation: bp-float-kf 3.6s ease-in-out infinite; }

      @keyframes bp-spin-slow-kf {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      .bp-spin-slow { animation: bp-spin-slow-kf 10s linear infinite; transform-origin: 50% 50%; }

      @keyframes bp-spin-fast-kf {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      .bp-spin-fast { animation: bp-spin-fast-kf 0.7s linear infinite; }

      @media (prefers-reduced-motion: reduce) {
        .bp-text-shine { animation: none; }
        .bp-float, .bp-spin-slow, .bp-spin-fast { animation: none !important; }
      }
    `}</style>
  );
}
