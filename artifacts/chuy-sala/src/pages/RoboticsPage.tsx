import { useState, useEffect, useMemo } from "react";
import {
  Bot,
  Cpu,
  Radar,
  Cog,
  Battery,
  Box,
  Eye,
  Zap,
  Code2,
  Wrench,
  Target,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Play,
  Pause,
  Lightbulb,
  Activity,
  Layers,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Robotics: Machines That Think — រ៉ូបូតវិទ្យា៖ ម៉ាស៊ីនដែលចេះគិត
//
//    1. The Sense → Think → Act loop (animated circular diagram)
//    2. Build-a-Bot interactive (clickable SVG robot)
//    3. How to build a robot — 4-step guide
//
//  Aesthetic: high-tech — near-black base #04070d, glowing electric-blue
//  #38bdf8 accents, faint circuit-trace pattern, subtle scan-lines, metallic
//  panel gradients.
// ════════════════════════════════════════════════════════════════════════════

export default function RoboticsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-[#04070d] text-sky-50 relative overflow-hidden">
      <ScopedStyles />
      <CircuitBg />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-sky-400/10 border border-sky-400/40 text-sky-300 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest">
          <Bot className="w-3.5 h-3.5" />
          {isKh ? "បច្ចេកវិទ្យា · មេរៀនអន្តរកម្ម" : "Technology · Interactive Lesson"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-sky-50 mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>រ៉ូបូតវិទ្យា៖ <span className="rb-text-glow">ម៉ាស៊ីនដែលចេះគិត</span></>
          ) : (
            <>Robotics: <span className="rb-text-glow">Machines That Think</span></>
          )}
        </h1>
        <p
          className={`text-sky-100/80 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "រ៉ូបូតមិនមែនជាវេទមន្តទេ — វាគឺជាការ‌ភ្ជាប់‌រវាង‌សេនស័រ ខួរក្បាល និងម៉ូទ័រដែលអនុវត្តតាមកូដ។ មេរៀននេះបង្ហាញពីរបៀបដែលរ៉ូបូតយល់ឃើញ គិត និងធ្វើសកម្មភាព ក៏ដូចជារបៀបដែលអ្នកអាចចាប់ផ្តើមសាងសង់មួយ។"
            : "Robots are not magic — they are loops of sensors, processors, and motors that follow code. This lesson shows how a robot perceives, decides, and acts, and how you can begin to build one yourself."}
        </p>
        <div className="hidden sm:flex absolute top-12 right-8 items-center gap-3 text-sky-400/30 select-none">
          <Cpu className="w-7 h-7 rb-pulse" />
          <Radar className="w-7 h-7 rb-pulse" style={{ animationDelay: "0.4s" }} />
          <Cog className="w-7 h-7 rb-spin-slow" />
        </div>
      </header>

      <Section
        eyebrowEn="01 · The loop"
        eyebrowKh="០១ · វដ្ត"
        titleEn="What is a robot? The Sense → Think → Act loop"
        titleKh="តើរ៉ូបូតគឺជាអ្វី? វដ្ត ​យល់ឃើញ → គិត → ធ្វើសកម្មភាព"
        descEn="Every robot — from a Roomba vacuum to a Mars rover — runs the same three-step loop, repeating it many times per second. Take any of the three away, and you no longer have a robot."
        descKh="រ៉ូបូតគ្រប់រូប — ពីម៉ាស៊ីនបូមធូលី Roomba ដល់រ៉ូវឺរលើភពព្រះអង្គារ — ដំណើរការវដ្តបីជំហានដូចគ្នា ហើយបិទរោងវាច្រើនដងក្នុងមួយវិនាទី។ ដកមួយចេញនោះវាលែងជារ៉ូបូតទៀតហើយ។"
        isKh={isKh}
      >
        <SenseThinkActLoop isKh={isKh} />
      </Section>

      <Section
        eyebrowEn="02 · Anatomy"
        eyebrowKh="០២ · កាយវិភាគ"
        titleEn="Anatomy of a robot — Build-a-Bot"
        titleKh="កាយវិភាគនៃរ៉ូបូត — សាងសង់រ៉ូបូត"
        descEn="Click any glowing hotspot on the robot to learn what each component does. The same five parts appear in almost every robot, big or small."
        descKh="ចុចលើចំណុចភ្លឺណាមួយលើរ៉ូបូតដើម្បីរៀនពីផ្នែកនីមួយៗ។ ផ្នែកប្រាំដូចគ្នានេះមាននៅក្នុងស្ទើរតែគ្រប់រ៉ូបូត ទាំងធំទាំងតូច។"
        isKh={isKh}
      >
        <BuildABot isKh={isKh} />
      </Section>

      <Section
        eyebrowEn="03 · Practice"
        eyebrowKh="០៣ · ការអនុវត្ត"
        titleEn="How to build a robot — a beginner's path"
        titleKh="របៀបសាងសង់រ៉ូបូត — ផ្លូវសម្រាប់អ្នកចាប់ផ្ដើម"
        descEn="Every robot project — from a $20 line-follower to a $200,000 industrial arm — follows the same four-step engineering cycle."
        descKh="គម្រោងរ៉ូបូតគ្រប់រូប — ពីរ៉ូបូតដើរតាមខ្សែ ២០ ដុល្លារ ដល់ដៃឧស្សាហកម្ម ២០០,០០០ ដុល្លារ — អនុវត្តតាមវដ្តវិស្វកម្មបួនជំហានដូចគ្នា។"
        isKh={isKh}
      >
        <BuildSteps isKh={isKh} />
      </Section>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-sky-200/60 text-sm italic">
        <span className={isKh ? "font-khmer not-italic" : ""}>
          {isKh
            ? "“រ៉ូបូតនឹងមិនយកការងារអ្នកទេ — មនុស្សម្នាក់ដែលដឹងពីរបៀបប្រើរ៉ូបូតនឹងយក។” — ការយល់ដឹងជាងសតវត្សទី ២១"
            : "“The robot won't take your job — a person who knows how to use robots will.” — 21st-century wisdom"}
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
      <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-sky-300/90 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
        <Sparkles className="w-3 h-3" />
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-sky-50 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-sky-100/75 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function TechCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-gradient-to-br from-[#0a1320] to-[#070b14] rounded-xl border border-sky-400/30 shadow-[0_0_32px_-12px_rgba(56,189,248,0.35)] ${className}`}>
      {/* Corner brackets */}
      <span className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-sky-300/70" />
      <span className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-sky-300/70" />
      <span className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-sky-300/70" />
      <span className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-sky-300/70" />
      {children}
    </div>
  );
}

function CircuitBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <svg width="100%" height="100%" className="opacity-[0.13]">
        <defs>
          <pattern id="rb-circuit" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 0 60 L 35 60 L 40 55 L 60 55 L 65 60 L 120 60" fill="none" stroke="#38bdf8" strokeWidth="0.7" />
            <path d="M 60 0 L 60 22 L 65 27 L 65 50" fill="none" stroke="#38bdf8" strokeWidth="0.7" />
            <path d="M 60 120 L 60 95 L 55 90 L 55 70" fill="none" stroke="#38bdf8" strokeWidth="0.7" />
            <circle cx="40" cy="55" r="1.5" fill="#38bdf8" />
            <circle cx="65" cy="60" r="1.5" fill="#38bdf8" />
            <circle cx="65" cy="27" r="1.5" fill="#38bdf8" />
            <rect x="20" y="80" width="14" height="6" fill="none" stroke="#38bdf8" strokeWidth="0.7" />
            <rect x="86" y="20" width="20" height="10" rx="1" fill="none" stroke="#38bdf8" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rb-circuit)" />
      </svg>
      <div className="absolute top-32 -left-20 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
      {/* Subtle scanlines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #38bdf8 0px, #38bdf8 1px, transparent 1px, transparent 4px)" }}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1. Sense → Think → Act loop
// ════════════════════════════════════════════════════════════════════════════

function SenseThinkActLoop({ isKh }: { isKh: boolean }) {
  const NODES = [
    {
      key: "sense",
      icon: Radar,
      tEn: "Sense",     tKh: "យល់ឃើញ",
      hEn: "Sensors gather data", hKh: "សេនស័រប្រមូលទិន្នន័យ",
      bEn: "Ultrasonic distance, light, temperature, gyroscope, camera, microphone — anything the robot can measure about the world.",
      bKh: "រលកសំឡេងវាស់ចម្ងាយ ពន្លឺ សីតុណ្ហភាព ជីរ៉ូស្កុប កាមេរ៉ា មីក្រូហ្វូន — អ្វីដែលរ៉ូបូតអាចវាស់បានពីពិភពលោក។",
      color: "#38bdf8", angle: -90,
    },
    {
      key: "think",
      icon: Cpu,
      tEn: "Think",     tKh: "គិត",
      hEn: "Controller decides", hKh: "ឧបករណ៍បញ្ជាសម្រេចចិត្ត",
      bEn: "An Arduino, Raspberry Pi, or microcontroller runs the program — it reads the sensor values and decides what to do next, often using if/else rules or AI models.",
      bKh: "Arduino, Raspberry Pi, ឬមីក្រូឧបករណ៍បញ្ជាដំណើរការកម្មវិធី — វាអានតម្លៃសេនស័រ ហើយសម្រេចថាត្រូវធ្វើអ្វីបន្ទាប់ ដោយតែងតែប្រើច្បាប់ if/else ឬគំរូ AI។",
      color: "#a78bfa", angle: 30,
    },
    {
      key: "act",
      icon: Cog,
      tEn: "Act",       tKh: "ធ្វើសកម្មភាព",
      hEn: "Motors and actuators move", hKh: "ម៉ូទ័រ និង​ផ្នែក​ចលនា​ផ្លាស់ទី",
      bEn: "DC motors, servo arms, grippers, speakers, displays — anything that lets the robot change the world. After acting, the loop starts over.",
      bKh: "ម៉ូទ័រ DC, ដៃ servo, ដង្កៀប, ឧបករណ៍បំពងសំឡេង, អេក្រង់ — អ្វីដែលអនុញ្ញាតឱ្យរ៉ូបូតផ្លាស់ប្ដូរពិភពលោក។ បន្ទាប់ពីធ្វើសកម្មភាព វដ្តចាប់ផ្ដើមឡើងវិញ។",
      color: "#34d399", angle: 150,
    },
  ];

  const [active, setActive] = useState<string>("sense");
  const [running, setRunning] = useState(true);
  const [tick, setTick] = useState(0);

  // Auto-advance the highlight ~once every 2s
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, [running]);
  useEffect(() => {
    if (!running) return;
    const order = ["sense", "think", "act"];
    setActive(order[tick % 3]);
  }, [tick, running]);

  const cur = NODES.find((n) => n.key === active)!;
  const Icon = cur.icon;

  // SVG geometry — 360x360 with three nodes at 120° apart on a 110-radius ring
  const cx = 180, cy = 180, R = 110;
  const polar = (deg: number, r: number) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)] as const;

  // Build an arrowhead triangle whose tip sits at the arc endpoint and whose
  // back edge is perpendicular to the (clockwise) tangent of the ring there.
  // Tangent at angle θ (going clockwise in SVG y-down coords) = (−sin θ, cos θ).
  const arrowhead = (deg: number) => {
    const θ = (deg * Math.PI) / 180;
    const [tx, ty] = polar(deg, R);
    const fx = -Math.sin(θ), fy = Math.cos(θ);   // forward tangent (unit)
    const px =  Math.cos(θ), py = Math.sin(θ);   // outward radial (perpendicular)
    const len = 10, half = 5;
    const bx = tx - fx * len, by = ty - fy * len; // back-centre
    return `${tx},${ty} ${bx + px * half},${by + py * half} ${bx - px * half},${by - py * half}`;
  };

  return (
    <TechCard className="p-5 sm:p-6">
      <div className="grid lg:grid-cols-5 gap-6 items-center">
        {/* Diagram */}
        <div className="lg:col-span-3 bg-[#020509] rounded-lg border border-sky-400/20 p-4">
          <svg viewBox="0 0 360 360" className="w-full max-w-[440px] mx-auto h-auto block" role="img" aria-labelledby="rb-loop-title rb-loop-desc">
            <title id="rb-loop-title">{isKh ? "វដ្ត យល់ឃើញ គិត ធ្វើសកម្មភាព" : "Sense, Think, Act loop"}</title>
            <desc id="rb-loop-desc">{isKh ? "តារាងរង្វង់បង្ហាញវដ្តបីជំហានរបស់រ៉ូបូត" : "A circular diagram showing the three-step robot loop with arrows flowing clockwise from Sense to Think to Act and back to Sense."}</desc>

            {/* Outer dashed ring */}
            <circle cx={cx} cy={cy} r={R + 28} fill="none" stroke="#38bdf8" strokeWidth="0.7" strokeDasharray="3 4" opacity="0.5" />
            <circle cx={cx} cy={cy} r={R - 28} fill="none" stroke="#38bdf8" strokeWidth="0.4" opacity="0.4" />

            {/* Centre badge */}
            <g>
              <circle cx={cx} cy={cy} r="44" fill="#04070d" stroke="#38bdf8" strokeWidth="1" />
              <circle cx={cx} cy={cy} r="44" fill="none" stroke="#38bdf8" strokeWidth="0.4" strokeDasharray="2 3" className="rb-spin-slow" style={{ transformOrigin: `${cx}px ${cy}px` }} />
              <text x={cx} y={cy - 6} fontSize="10" fill="#7dd3fc" textAnchor="middle" fontWeight="700" letterSpacing="2">ROBOT</text>
              <text x={cx} y={cy + 8} fontSize="9" fill="#7dd3fc" textAnchor="middle" opacity="0.8">LIFECYCLE</text>
              <text x={cx} y={cy + 22} fontSize="8" fill="#38bdf8" textAnchor="middle" opacity="0.7" fontFamily="monospace">∞ loop</text>
            </g>

            {/* Curved arrows between nodes (clockwise) */}
            {[
              [-90, 30],
              [30, 150],
              [150, 270],
            ].map(([a1, a2], i) => {
              const [x1, y1] = polar(a1 + 22, R);
              const [x2, y2] = polar(a2 - 22, R);
              const isActive = (running && (tick % 3) === i);
              return (
                <g key={i}>
                  <path
                    d={`M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`}
                    fill="none"
                    stroke={isActive ? "#38bdf8" : "#1e3a5f"}
                    strokeWidth={isActive ? "2.5" : "1.2"}
                    strokeLinecap="round"
                    style={{ filter: isActive ? "drop-shadow(0 0 6px #38bdf8)" : "none", transition: "stroke 0.4s, stroke-width 0.4s" }}
                  />
                  {/* Arrowhead — tip on ring, base perpendicular to the tangent */}
                  <polygon
                    points={arrowhead(a2 - 22)}
                    fill={isActive ? "#38bdf8" : "#1e3a5f"}
                    style={{ filter: isActive ? "drop-shadow(0 0 4px #38bdf8)" : "none" }}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((n) => {
              const [nx, ny] = polar(n.angle, R);
              const isActive = n.key === active;
              const NIcon = n.icon;
              const labelOffsetY = n.angle === -90 ? -56 : 56;
              const onPick = () => { setActive(n.key); setRunning(false); };
              return (
                <g
                  key={n.key}
                  style={{ cursor: "pointer", outline: "none" }}
                  onClick={onPick}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick(); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={isKh ? n.tKh : n.tEn}
                  aria-pressed={isActive}
                  className="rb-focus-ring"
                >
                  {/* Glow */}
                  {isActive && <circle cx={nx} cy={ny} r="40" fill={n.color} opacity="0.15" />}
                  <circle cx={nx} cy={ny} r="32" fill="#04070d" stroke={n.color} strokeWidth={isActive ? "2.5" : "1.5"} style={{ transition: "stroke-width 0.3s" }} />
                  <foreignObject x={nx - 12} y={ny - 12} width="24" height="24" style={{ pointerEvents: "none" }}>
                    <div style={{ width: 24, height: 24, color: n.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <NIcon size={20} />
                    </div>
                  </foreignObject>
                  <text x={nx} y={ny + labelOffsetY} fontSize="13" fill={n.color} textAnchor="middle" fontWeight="700" letterSpacing="1">
                    {(isKh ? n.tKh : n.tEn).toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Loop control */}
          <div className="flex justify-center mt-2">
            <button
              onClick={() => setRunning((r) => !r)}
              aria-pressed={running}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors ${
                running ? "bg-sky-400/15 text-sky-200 border border-sky-400/40 hover:bg-sky-400/25" : "bg-sky-400 text-[#04070d] hover:bg-sky-300"
              } ${isKh ? "font-khmer" : ""}`}
            >
              {running ? <><Pause className="w-4 h-4" />{isKh ? "ផ្អាកវដ្ត" : "Pause loop"}</> : <><Play className="w-4 h-4" />{isKh ? "ដំណើរការវដ្ត" : "Run loop"}</>}
            </button>
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          <div className="bg-[#020509] border-2 rounded-lg p-5" style={{ borderColor: cur.color + "80" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ backgroundColor: cur.color + "20", color: cur.color }}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${isKh ? "font-khmer tracking-normal normal-case" : ""}`} style={{ color: cur.color }}>
                  {isKh ? "ដំណាក់កាល" : "Stage"}
                </div>
                <div className={`font-display font-bold text-2xl text-sky-50 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? cur.tKh : cur.tEn}
                </div>
              </div>
            </div>
            <div className={`font-bold text-base mb-2 ${isKh ? "font-khmer" : ""}`} style={{ color: cur.color }}>
              {isKh ? cur.hKh : cur.hEn}
            </div>
            <p className={`text-sm text-sky-100/85 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? cur.bKh : cur.bEn}
            </p>
          </div>
          <p className={`text-xs text-sky-300/60 mt-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <Activity className="w-3 h-3 inline mr-1" />
            {isKh
              ? "ឧទាហរណ៍៖ ម៉ាស៊ីនបូមធូលី Roomba រត់វដ្តនេះច្រើនដងក្នុងមួយវិនាទី — សេនស័រវាស់ជញ្ជាំង → ខួរសម្រេចបត់ → ម៉ូទ័រងាក។"
              : "Example: A Roomba runs this loop many times every second — sensor reads a wall → brain decides to turn → motors steer."}
          </p>
        </div>
      </div>
    </TechCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. Build-a-Bot
// ════════════════════════════════════════════════════════════════════════════

function BuildABot({ isKh }: { isKh: boolean }) {
  const PARTS = [
    {
      key: "controller",
      icon: Cpu,
      // Position on the 400x440 SVG (in robot's chest)
      x: 200, y: 200, r: 16,
      tEn: "Microcontroller", tKh: "ខួរក្បាលបញ្ជា",
      shortEn: "The computer brain", shortKh: "ខួរកុំព្យូទ័រ",
      bodyEn: "A tiny computer (Arduino, Raspberry Pi, ESP32) that runs the code. It reads the sensors many times per second and decides what to do, sending commands to the motors.",
      bodyKh: "កុំព្យូទ័រតូចមួយ (Arduino, Raspberry Pi, ESP32) ដែលដំណើរការកូដ។ វាអានសេនស័រច្រើនដងក្នុងមួយវិនាទី សម្រេចថាត្រូវធ្វើអ្វី និងផ្ញើពាក្យបញ្ជាទៅម៉ូទ័រ។",
      facts: [
        { en: "Arduino Uno: ~$10, perfect to start", kh: "Arduino Uno: ~១០$ ល្អបំផុតសម្រាប់ចាប់ផ្ដើម" },
        { en: "Raspberry Pi: full Linux computer, can run AI", kh: "Raspberry Pi: កុំព្យូទ័រ Linux ពេញលេញ អាចដំណើរការ AI" },
      ],
      color: "#38bdf8",
    },
    {
      key: "sensors",
      icon: Eye,
      x: 200, y: 90, r: 14,
      tEn: "Sensors", tKh: "សេនស័រ",
      shortEn: "The eyes and ears", shortKh: "ភ្នែក និងត្រចៀក",
      bodyEn: "The robot's senses. Ultrasonic sensors measure distance with sound waves (like a bat). LDRs detect light. Cameras give vision. Without sensors, a robot is blind and deaf.",
      bodyKh: "សម្បទាញនៃរ៉ូបូត។ សេនស័រ Ultrasonic វាស់ចម្ងាយដោយរលកសំឡេង (ដូចប្រចៀវ)។ LDR រកពន្លឺ។ កាមេរ៉ាផ្ដល់ការមើលឃើញ។ បើគ្មានសេនស័រ រ៉ូបូតគ្មានភ្នែក និងត្រចៀក។",
      facts: [
        { en: "HC-SR04 ultrasonic: ~$2, sees up to 4 m", kh: "HC-SR04 ultrasonic: ~២$ មើលឃើញរហូត ៤ម" },
        { en: "MPU-6050: gyro + accelerometer for balance", kh: "MPU-6050: ជីរ៉ូ + ឧបករណ៍វាស់ការបង្កើនល្បឿនសម្រាប់តុល្យភាព" },
      ],
      color: "#a78bfa",
    },
    {
      key: "motors",
      icon: Cog,
      x: 110, y: 280, r: 14,
      tEn: "Actuators / Motors", tKh: "ម៉ូទ័រ",
      shortEn: "The muscles", shortKh: "សាច់ដុំ",
      bodyEn: "DC motors spin wheels, servo motors precisely angle a robotic arm, stepper motors move 3D-printer heads exactly. They turn electrical commands into physical motion.",
      bodyKh: "ម៉ូទ័រ DC វិលកង់ ម៉ូទ័រ servo បង្វិលដៃរ៉ូបូតយ៉ាងជាក់លាក់ ម៉ូទ័រ stepper ផ្លាស់ទីក្បាលម៉ាស៊ីនបោះពុម្ព 3D យ៉ាងពិតប្រាកដ។ ពួកវាបំប្លែងពាក្យបញ្ជាអគ្គិសនីទៅជាចលនារូបវន្ត។",
      facts: [
        { en: "DC gear motor: cheap, great for wheels", kh: "ម៉ូទ័រ DC ស៊ុនប្រុង: ថោក ល្អសម្រាប់កង់" },
        { en: "Servo SG90: ~$2, rotates 0–180° on command", kh: "Servo SG90: ~២$ វិល ០–១៨០° តាមបញ្ជា" },
      ],
      color: "#34d399",
    },
    {
      key: "chassis",
      icon: Box,
      x: 290, y: 320, r: 14,
      tEn: "Chassis", tKh: "តួខ្លួន",
      shortEn: "The skeleton / frame", shortKh: "គ្រោងឆ្អឹង",
      bodyEn: "The body that holds everything together. Can be 3D-printed plastic, laser-cut acrylic, aluminium, or simply cardboard for a school project. Keep it stiff so motors and sensors don't shake.",
      bodyKh: "តួដែលកាន់អ្វីៗទាំងអស់ជាមួយគ្នា។ អាចជាប្លាស្ទិកបោះពុម្ព 3D, អាគ្រីលីកកាត់ឡាស៊ែរ, អាលុយមីញ៉ូម ឬគ្រាន់តែក្រដាសក្រាសម្រាប់គម្រោងសាលា។ រក្សាវាឱ្យរឹង ដើម្បីកុំឱ្យម៉ូទ័រនិងសេនស័ររញ្ជួយ។",
      facts: [
        { en: "Cardboard + hot glue is fine to start", kh: "ក្រដាសក្រាស + កាវក្ដៅគឺល្អដើម្បីចាប់ផ្ដើម" },
        { en: "Industrial robots use steel for stiffness", kh: "រ៉ូបូតឧស្សាហកម្មប្រើដែកថែបសម្រាប់ភាពរឹង" },
      ],
      color: "#facc15",
    },
    {
      key: "power",
      icon: Battery,
      x: 200, y: 320, r: 14,
      tEn: "Power Source", tKh: "ប្រភពថាមពល",
      shortEn: "The battery", shortKh: "ថ្ម",
      bodyEn: "Most robots run on 5–12 V batteries — Li-ion packs for capacity, AA for simplicity, LiPo for high-current motors. Bigger or faster motors need bigger batteries; runtime = capacity ÷ current draw.",
      bodyKh: "រ៉ូបូតភាគច្រើនដំណើរការលើថ្ម ៥–១២ វ៉ុល — កញ្ចប់ Li-ion សម្រាប់ចំណុះ, AA សម្រាប់ភាពងាយស្រួល, LiPo សម្រាប់ម៉ូទ័រចរន្តខ្ពស់។ ម៉ូទ័រធំ ឬលឿនត្រូវការថ្មធំ; ពេលដំណើរការ = ចំណុះ ÷ ចរន្តទាញ។",
      facts: [
        { en: "4 × AA = 6 V — fine for small robots", kh: "៤ × AA = ៦ វ៉ុល — ល្អសម្រាប់រ៉ូបូតតូច" },
        { en: "Mars Curiosity rover: nuclear (RTG)", kh: "Mars Curiosity rover: នុយក្លេអ៊ែរ (RTG)" },
      ],
      color: "#fb923c",
    },
  ] as const;

  const [active, setActive] = useState<string>("controller");
  const cur = PARTS.find((p) => p.key === active)!;
  const Icon = cur.icon;

  return (
    <TechCard className="p-5 sm:p-6">
      <div className="grid lg:grid-cols-5 gap-6 items-start">
        {/* Robot SVG */}
        <div className="lg:col-span-3 bg-[#020509] rounded-lg border border-sky-400/20 p-4">
          <svg viewBox="0 0 400 440" className="w-full max-w-[420px] mx-auto h-auto block" role="img" aria-labelledby="rb-bot-title rb-bot-desc">
            <title id="rb-bot-title">{isKh ? "តួរ៉ូបូតអន្តរកម្ម" : "Interactive robot diagram"}</title>
            <desc id="rb-bot-desc">{isKh ? "តួរ៉ូបូតមួយដែលមានចំណុចភ្លឺប្រាំសម្រាប់ផ្នែកសំខាន់ៗ" : "A friendly robot illustration with five glowing hotspots labelling the microcontroller, sensors, motors, chassis, and power source."}</desc>

            <defs>
              <linearGradient id="rb-metal-head" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="rb-metal-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0b1424" />
              </linearGradient>
              <radialGradient id="rb-eye" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="60%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#082f49" />
              </radialGradient>
            </defs>

            {/* Floor shadow */}
            <ellipse cx="200" cy="420" rx="120" ry="8" fill="#38bdf8" opacity="0.12" />

            {/* Antenna with pulsing tip */}
            <line x1="200" y1="40" x2="200" y2="65" stroke="#475569" strokeWidth="2" />
            <circle cx="200" cy="38" r="5" fill="#38bdf8" className="rb-pulse" style={{ transformOrigin: "200px 38px" }} />
            <circle cx="200" cy="38" r="9" fill="none" stroke="#38bdf8" strokeWidth="0.7" opacity="0.5" className="rb-pulse" />

            {/* Head */}
            <rect x="155" y="65" width="90" height="80" rx="14" fill="url(#rb-metal-head)" stroke="#475569" strokeWidth="1.5" />
            {/* Eyes */}
            <circle cx="180" cy="100" r="11" fill="url(#rb-eye)" />
            <circle cx="220" cy="100" r="11" fill="url(#rb-eye)" />
            <circle cx="180" cy="100" r="3" fill="#bae6fd" className="rb-blink" />
            <circle cx="220" cy="100" r="3" fill="#bae6fd" className="rb-blink" />
            {/* Mouth grille */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1={172 + i * 14} y1="125" x2={172 + i * 14} y2="135" stroke="#0ea5e9" strokeWidth="1.4" />
            ))}

            {/* Neck */}
            <rect x="186" y="145" width="28" height="14" fill="#334155" stroke="#475569" />

            {/* Torso */}
            <rect x="125" y="159" width="150" height="140" rx="10" fill="url(#rb-metal-body)" stroke="#475569" strokeWidth="1.5" />
            {/* Chest panel showing controller */}
            <rect x="170" y="180" width="60" height="50" rx="3" fill="#0a1320" stroke="#38bdf8" strokeWidth="0.8" />
            {/* PCB traces */}
            <line x1="175" y1="195" x2="225" y2="195" stroke="#38bdf8" strokeWidth="0.5" opacity="0.7" />
            <line x1="175" y1="210" x2="200" y2="210" stroke="#38bdf8" strokeWidth="0.5" opacity="0.7" />
            <line x1="200" y1="210" x2="200" y2="220" stroke="#38bdf8" strokeWidth="0.5" opacity="0.7" />
            <rect x="190" y="195" width="20" height="14" fill="#020509" stroke="#38bdf8" strokeWidth="0.6" />
            <text x="200" y="205" fontSize="6" fill="#38bdf8" textAnchor="middle" fontFamily="monospace">MCU</text>

            {/* Power indicator */}
            <rect x="170" y="245" width="60" height="14" rx="2" fill="#0a1320" stroke="#fb923c" strokeWidth="0.8" />
            <rect x="172" y="247" width={48} height={10} fill="#fb923c" opacity="0.6" />
            <text x="200" y="256" fontSize="7" fill="#fb923c" textAnchor="middle" fontFamily="monospace">PWR 80%</text>

            {/* Status LEDs */}
            <circle cx="140" cy="172" r="3" fill="#34d399" className="rb-pulse" />
            <circle cx="148" cy="172" r="3" fill="#facc15" />
            <circle cx="156" cy="172" r="3" fill="#f43f5e" />

            {/* Arms */}
            <rect x="100" y="170" width="22" height="80" rx="6" fill="#334155" stroke="#475569" />
            <rect x="278" y="170" width="22" height="80" rx="6" fill="#334155" stroke="#475569" />
            {/* Hands */}
            <circle cx="111" cy="260" r="11" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <circle cx="289" cy="260" r="11" fill="#1e293b" stroke="#64748b" strokeWidth="1" />

            {/* Wheels (motors) */}
            <g>
              <circle cx="155" cy="320" r="22" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <circle cx="155" cy="320" r="9"  fill="#0a1320" stroke="#94a3b8" strokeWidth="0.8" />
              {[0, 60, 120].map((a) => (
                <line key={a} x1="155" y1="320" x2={155 + Math.cos((a * Math.PI) / 180) * 20} y2={320 + Math.sin((a * Math.PI) / 180) * 20} stroke="#64748b" strokeWidth="0.6" />
              ))}
            </g>
            <g>
              <circle cx="245" cy="320" r="22" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <circle cx="245" cy="320" r="9"  fill="#0a1320" stroke="#94a3b8" strokeWidth="0.8" />
              {[0, 60, 120].map((a) => (
                <line key={a} x1="245" y1="320" x2={245 + Math.cos((a * Math.PI) / 180) * 20} y2={320 + Math.sin((a * Math.PI) / 180) * 20} stroke="#64748b" strokeWidth="0.6" />
              ))}
            </g>

            {/* Hotspots — pulsing rings */}
            {PARTS.map((p) => {
              const isActive = p.key === active;
              return (
                <g
                  key={p.key}
                  style={{ cursor: "pointer", outline: "none" }}
                  onClick={() => setActive(p.key)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(p.key); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={isKh ? p.tKh : p.tEn}
                  aria-pressed={isActive}
                  className="rb-focus-ring"
                >
                  <circle cx={p.x} cy={p.y} r={p.r + 6} fill="none" stroke={p.color} strokeWidth={isActive ? "2" : "1"} opacity={isActive ? "0.9" : "0.5"} className="rb-ring-pulse" style={{ transformOrigin: `${p.x}px ${p.y}px` }} />
                  <circle cx={p.x} cy={p.y} r={p.r} fill={p.color + "30"} stroke={p.color} strokeWidth={isActive ? "2.4" : "1.4"} style={{ filter: isActive ? `drop-shadow(0 0 8px ${p.color})` : "none", transition: "all 0.25s" }} />
                  <text x={p.x} y={p.y + 4} fontSize="11" fill={p.color} textAnchor="middle" fontWeight="700" fontFamily="monospace" style={{ pointerEvents: "none" }}>
                    {p.key === "controller" ? "1" : p.key === "sensors" ? "2" : p.key === "motors" ? "3" : p.key === "chassis" ? "4" : "5"}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {PARTS.map((p) => {
              const PIcon = p.icon;
              const isActive = p.key === active;
              return (
                <button
                  key={p.key}
                  onClick={() => setActive(p.key)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${isKh ? "font-khmer" : ""}`}
                  style={{
                    backgroundColor: isActive ? p.color + "25" : "transparent",
                    borderColor: p.color + (isActive ? "" : "60"),
                    color: p.color,
                    boxShadow: isActive ? `0 0 12px -2px ${p.color}` : "none",
                  }}
                >
                  <PIcon className="w-3.5 h-3.5" />
                  {isKh ? p.tKh : p.tEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          <div className="bg-[#020509] border-2 rounded-lg p-5" style={{ borderColor: cur.color + "70" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ backgroundColor: cur.color + "20", color: cur.color }}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${isKh ? "font-khmer tracking-normal normal-case" : ""}`} style={{ color: cur.color }}>
                  {isKh ? "ផ្នែក" : "Component"}
                </div>
                <div className={`font-display font-bold text-xl text-sky-50 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? cur.tKh : cur.tEn}
                </div>
              </div>
            </div>
            <div className={`font-bold text-sm mb-2 ${isKh ? "font-khmer" : ""}`} style={{ color: cur.color }}>
              {isKh ? cur.shortKh : cur.shortEn}
            </div>
            <p className={`text-sm text-sky-100/85 mb-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? cur.bodyKh : cur.bodyEn}
            </p>
            <div className={`text-[10px] font-bold uppercase tracking-widest text-sky-300/80 mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}>
              {isKh ? "ឧទាហរណ៍ជាក់ស្តែង" : "Real examples"}
            </div>
            <ul className="space-y-1.5">
              {cur.facts.map((f, i) => (
                <li key={i} className={`flex items-start gap-2 text-sm text-sky-100/80 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: cur.color }} />
                  <span>{isKh ? f.kh : f.en}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </TechCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. How to build a robot — 4-step guide
// ════════════════════════════════════════════════════════════════════════════

function BuildSteps({ isKh }: { isKh: boolean }) {
  const STEPS = [
    {
      n: 1,
      icon: Target,
      tEn: "Define the task", tKh: "កំណត់ភារកិច្ច",
      qEn: "What should it do?", qKh: "តើវាគួរធ្វើអ្វី?",
      bEn: "Be very specific. 'A useful robot' is too vague. 'A robot that follows a black line on white paper at 30 cm/s' is buildable. Write down inputs (line position) and outputs (motor speeds) clearly.",
      bKh: "ត្រូវជាក់លាក់ខ្លាំង។ 'រ៉ូបូតមានប្រយោជន៍' មិនច្បាស់លាស់ទេ។ 'រ៉ូបូតដើរតាមខ្សែខ្មៅលើក្រដាសសនៅ ៣០ ស.ម/វិ' អាចសាងសង់បាន។ កត់ត្រាការបញ្ចូល (ទីតាំងខ្សែ) និងការបញ្ចេញ (ល្បឿនម៉ូទ័រ) ឱ្យច្បាស់។",
      tipEn: "Tip: draw the robot's behaviour as a simple flowchart before buying anything.",
      tipKh: "គន្លឹះ៖ គូរឥរិយាបថរបស់រ៉ូបូតជាតារាងហូរសាមញ្ញមុនពេលទិញអ្វី។",
      color: "#38bdf8",
    },
    {
      n: 2,
      icon: Layers,
      tEn: "Choose the hardware", tKh: "ជ្រើសរើសផ្នែករឹង",
      qEn: "Which parts will you use?", qKh: "តើផ្នែកមួយណាដែលអ្នកនឹងប្រើ?",
      bEn: "Match the parts to the task. Line follower? Two IR sensors + Arduino + 2 DC motors + 4 AA batteries — about $15 total. Vision robot? Raspberry Pi + USB camera + servos. Always check voltages match before connecting.",
      bKh: "ផ្គូផ្គងផ្នែកជាមួយភារកិច្ច។ រ៉ូបូតដើរតាមខ្សែ? សេនស័រ IR ពីរ + Arduino + ម៉ូទ័រ DC ២ + ថ្ម AA ៤ — ប្រហែល ១៥$ សរុប។ រ៉ូបូតមើលឃើញ? Raspberry Pi + កាមេរ៉ា USB + servos។ តែងតែពិនិត្យថាវ៉ុលត្រូវគ្នាមុនភ្ជាប់។",
      tipEn: "Tip: start with the cheapest parts that could work. Upgrade only when needed.",
      tipKh: "គន្លឹះ៖ ចាប់ផ្ដើមជាមួយផ្នែកថោកបំផុតដែលអាចដំណើរការបាន។ ដំឡើងកម្រិតតែនៅពេលត្រូវការ។",
      color: "#a78bfa",
    },
    {
      n: 3,
      icon: Code2,
      tEn: "Write the code (the logic)", tKh: "សរសេរកូដ (តក្កវិជ្ជា)",
      qEn: "How does it think?", qKh: "តើវាគិតយ៉ាងណា?",
      bEn: "The code IS the robot's brain. Read the sensor → decide → drive the motor → repeat (the Sense-Think-Act loop from Section 1). Start with simple if/else; only add AI when simple rules genuinely cannot solve the task.",
      bKh: "កូដគឺជាខួរក្បាលរបស់រ៉ូបូត។ អានសេនស័រ → សម្រេច → បើកម៉ូទ័រ → ធ្វើឡើងវិញ (វដ្តយល់ឃើញ-គិត-ធ្វើសកម្មភាពពីផ្នែកទី១)។ ចាប់ផ្ដើមជាមួយ if/else សាមញ្ញ; បន្ថែម AI តែនៅពេលច្បាប់សាមញ្ញពិតជាមិនអាចដោះស្រាយភារកិច្ច។",
      tipEn: "Tip: start in a simulator (e.g. Tinkercad Circuits) before powering real hardware.",
      tipKh: "គន្លឹះ៖ ចាប់ផ្ដើមនៅក្នុងម៉ាស៊ីនក្លែងបន្លំ (ឧ. Tinkercad Circuits) មុនពេលបើកថាមពលផ្នែករឹងពិត។",
      sampleCode: `// Pseudo-code: line follower
loop {
  left  = readIR(LEFT_PIN);
  right = readIR(RIGHT_PIN);
  if (left && !right)      turn("left");
  else if (right && !left) turn("right");
  else                     forward();
}`,
      color: "#34d399",
    },
    {
      n: 4,
      icon: RotateCcw,
      tEn: "Test and iterate", tKh: "សាកល្បង និងធ្វើឡើងវិញ",
      qEn: "What broke? Fix it. Repeat.", qKh: "តើអ្វីខូច? ជួសជុលវា។ ធ្វើឡើងវិញ។",
      bEn: "Your first version will fail — that's normal and expected. Test on real surfaces, in real light. Watch what goes wrong. Adjust the code, the wiring, or even the chassis. Real engineers iterate dozens of times.",
      bKh: "កំណែដំបូងរបស់អ្នកនឹងបរាជ័យ — វាជារឿងធម្មតា និងត្រូវបានរំពឹងទុក។ សាកល្បងលើផ្ទៃពិត ពន្លឺពិត។ មើលអ្វីដែលខុស។ កែតម្រូវកូដ ខ្សែភ្ជាប់ ឬសូម្បីតួ។ វិស្វករពិតធ្វើឡើងវិញរាប់សិបដង។",
      tipEn: "Tip: write down every change you try. Failed experiments teach more than working ones.",
      tipKh: "គន្លឹះ៖ កត់ត្រារាល់ការផ្លាស់ប្ដូរដែលអ្នកសាកល្បង។ ការពិសោធន៍បរាជ័យបង្រៀនច្រើនជាងជោគជ័យ។",
      color: "#fb923c",
    },
  ] as const;

  const [openStep, setOpenStep] = useState<number>(1);

  return (
    <TechCard className="p-5 sm:p-6">
      {/* Step indicator bar */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex items-center flex-shrink-0">
            <button
              onClick={() => setOpenStep(s.n)}
              aria-pressed={openStep === s.n}
              className={`w-9 h-9 rounded-full font-mono font-bold text-sm transition-all flex items-center justify-center border-2`}
              style={{
                backgroundColor: openStep === s.n ? s.color : "transparent",
                color: openStep === s.n ? "#04070d" : s.color,
                borderColor: s.color,
                boxShadow: openStep === s.n ? `0 0 14px -2px ${s.color}` : "none",
              }}
              aria-label={`Step ${s.n}`}
            >
              {s.n}
            </button>
            {i < STEPS.length - 1 && (
              <ChevronRight className="w-4 h-4 text-sky-400/40 mx-1" />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {STEPS.map((s) => {
          const SIcon = s.icon;
          const isOpen = openStep === s.n;
          return (
            <div
              key={s.n}
              className="bg-[#020509] border rounded-lg overflow-hidden transition-all"
              style={{ borderColor: isOpen ? s.color + "90" : "#1e3a5f" }}
            >
              <button
                onClick={() => setOpenStep(isOpen ? -1 : s.n)}
                className="w-full p-4 flex items-center gap-4 text-left hover:bg-sky-400/5"
                aria-expanded={isOpen}
              >
                <div
                  className="w-11 h-11 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: s.color + "20", color: s.color }}
                >
                  <SIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${isKh ? "font-khmer tracking-normal normal-case" : ""}`} style={{ color: s.color }}>
                    {isKh ? `ជំហានទី ${s.n}` : `Step ${s.n}`}
                  </div>
                  <div className={`font-display font-bold text-base sm:text-lg text-sky-50 ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? s.tKh : s.tEn}
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 text-sky-300 transition-transform flex-shrink-0 ${isOpen ? "rotate-90" : ""}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-5 pt-1">
                  <div className={`font-bold mb-2 ${isKh ? "font-khmer" : ""}`} style={{ color: s.color }}>
                    {isKh ? s.qKh : s.qEn}
                  </div>
                  <p className={`text-sm text-sky-100/85 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
                    {isKh ? s.bKh : s.bEn}
                  </p>
                  {"sampleCode" in s && s.sampleCode && (
                    <pre className="bg-[#04070d] border border-sky-400/30 rounded-md p-3 text-xs font-mono text-sky-100/90 overflow-x-auto mb-3">
                      <code>{s.sampleCode}</code>
                    </pre>
                  )}
                  <div className="bg-sky-400/10 border-l-4 rounded p-3 flex items-start gap-2" style={{ borderColor: s.color }}>
                    <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: s.color }} />
                    <span className={`text-xs text-sky-100/85 ${isKh ? "font-khmer leading-loose" : ""}`}>
                      {isKh ? s.tipKh : s.tipEn}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={`mt-5 flex items-start gap-2 text-sm text-sky-100/85 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        <Wrench className="w-4 h-4 mt-0.5 flex-shrink-0 text-sky-300" />
        <span>
          {isKh
            ? "ចំណាំ៖ វិស្វកម្មរ៉ូបូតគឺជាវដ្ត — បន្ទាប់ពីសាកល្បង អ្នកវិលត្រឡប់ទៅជំហានទី ១ ដោយការយល់ដឹងថ្មី និងកំណត់ភារកិច្ចបន្ថែម។ កុំខកចិត្តប្រសិនបើវាមិនដំណើរការលើកដំបូង — សូម្បីតែអ្នកវិទ្យាសាស្ត្រ NASA ក៏ត្រូវបង្ខំឱ្យសាកល្បងម្តងហើយម្តងទៀតដែរ។"
            : "Note: robotics engineering is a CYCLE — after testing, you loop back to Step 1 with new understanding and refine the task. Don't be discouraged when version 1 fails — even NASA scientists iterate dozens of times before launch."}
        </span>
      </div>
    </TechCard>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Scoped styles
// ════════════════════════════════════════════════════════════════════════════

function ScopedStyles() {
  return (
    <style>{`
      .rb-text-glow {
        background: linear-gradient(90deg, #38bdf8 0%, #ffffff 50%, #38bdf8 100%);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: rb-shine-kf 4s linear infinite;
        text-shadow: 0 0 24px rgba(56,189,248,0.35);
      }
      @keyframes rb-shine-kf {
        0%   { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }

      @keyframes rb-pulse-kf {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.5; transform: scale(1.18); }
      }
      .rb-pulse { animation: rb-pulse-kf 1.6s ease-in-out infinite; }

      @keyframes rb-blink-kf {
        0%, 92%, 100% { opacity: 1; }
        94%, 98%      { opacity: 0; }
      }
      .rb-blink { animation: rb-blink-kf 4s ease-in-out infinite; }

      @keyframes rb-spin-slow-kf {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      .rb-spin-slow { animation: rb-spin-slow-kf 12s linear infinite; }

      @keyframes rb-ring-pulse-kf {
        0%, 100% { transform: scale(1); opacity: 0.65; }
        50%      { transform: scale(1.2); opacity: 0.25; }
      }
      .rb-ring-pulse { animation: rb-ring-pulse-kf 2.4s ease-in-out infinite; }

      .rb-focus-ring:focus-visible > circle:nth-of-type(1) {
        stroke: #ffffff;
        stroke-width: 3;
      }
      .rb-focus-ring:focus { outline: none; }

      @media (prefers-reduced-motion: reduce) {
        .rb-text-glow, .rb-pulse, .rb-blink, .rb-spin-slow, .rb-ring-pulse {
          animation: none !important;
        }
      }
    `}</style>
  );
}
