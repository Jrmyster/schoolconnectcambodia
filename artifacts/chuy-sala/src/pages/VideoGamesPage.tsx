import { useState, useEffect, useRef } from "react";
import {
  Gamepad2,
  Cpu,
  Zap,
  Box,
  Image as ImageIcon,
  Sun,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Activity,
  Triangle,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Video Games: The Science of Play
//  បច្ចេកវិទ្យាហ្គេម និងការបង្ហាញរូបភាព
//
//    1. Game engine — Input → Update → Render loop
//    2. CPU vs GPU — parallel processing race
//    3. Rendering pipeline — Mesh → Texture → Light
//
//  Aesthetic: gamer / arcade — pure black base, neon green #22ff88 +
//  neon purple #b266ff accents, scan-lines, wireframe triangle animations.
// ════════════════════════════════════════════════════════════════════════════

const NEON_G = "#22ff88";
const NEON_P = "#b266ff";
const NEON_C = "#22d3ee";

export default function VideoGamesPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-black text-zinc-100 relative overflow-hidden">
      <ScopedStyles />
      <ArcadeBg />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-widest border"
          style={{ color: NEON_G, borderColor: NEON_G + "70", backgroundColor: NEON_G + "12" }}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          {isKh ? "បច្ចេកវិទ្យា · មេរៀនអន្តរកម្ម" : "Technology · Interactive Lesson"}
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 leading-tight ${
            isKh ? "font-khmer leading-loose" : ""
          }`}
        >
          {isKh ? (
            <>បច្ចេកវិទ្យាហ្គេម៖ <span className="vg-neon-glow">វិទ្យាសាស្ត្រនៃការលេង</span></>
          ) : (
            <>Video Games: <span className="vg-neon-glow">The Science of Play</span></>
          )}
        </h1>
        <p
          className={`text-zinc-300 max-w-2xl text-base ${
            isKh ? "font-khmer leading-loose" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ហ្គេមវីដេអូដំណើរការ ៦០ ដងក្នុងមួយវិនាទី — រាល់ពេល វាស្ដាប់ឲ្យអ្នកលេង គណនារូបវិទ្យា និងគូររូបភាព ៣វិមាត្រ ៨ លានភីកសែលឡើងវិញ។ មេរៀននេះបង្ហាញពីរបៀបដែលគ្រឿងដ៏អស្ចារ្យនេះដំណើរការ — ពីវដ្តហ្គេម ដល់ GPU ដែលធ្វើគណនាប៉ារ៉ាឡែលរាប់លាន។"
            : "A video game runs 60 times every second — listening to the player, computing physics, and redrawing 8 million pixels of 3D imagery from scratch. This lesson reveals how that miracle works — from the game loop, to the parallel-math monster called the GPU."}
        </p>
        <div className="hidden sm:flex absolute top-12 right-8 items-center gap-3 select-none">
          <Triangle className="w-7 h-7 vg-spin-slow" style={{ color: NEON_G }} />
          <Cpu className="w-7 h-7 vg-pulse" style={{ color: NEON_P }} />
          <Zap className="w-7 h-7 vg-pulse" style={{ color: NEON_C, animationDelay: "0.4s" }} />
        </div>
      </header>

      <Section
        eyebrowEn="01 · The brain"
        eyebrowKh="០១ · ខួរក្បាល"
        titleEn="What is a game engine? The Game Loop"
        titleKh="តើ Game Engine ជាអ្វី? វដ្តហ្គេម"
        descEn="A game is not a movie — frames are generated live, 60 times every second. The engine repeats three steps forever: read your input, update the world, and draw the next frame to the screen."
        descKh="ហ្គេមមិនមែនជាខ្សែភាពយន្តទេ — រូបភាពនីមួយៗត្រូវបានបង្កើតផ្ទាល់ ៦០ ដងក្នុងមួយវិនាទី។ ម៉ាស៊ីនធ្វើជំហានបីដដែលៗ៖ អានការបញ្ចូលរបស់អ្នក ធ្វើបច្ចុប្បន្នភាពពិភពលោក និងគូររូបបន្ទាប់ទៅអេក្រង់។"
        isKh={isKh}
      >
        <GameLoop isKh={isKh} />
      </Section>

      <Section
        eyebrowEn="02 · The hardware"
        eyebrowKh="០២ · ផ្នែករឹង"
        titleEn="How a GPU works — parallel processing"
        titleKh="របៀបដែល GPU ដំណើរការ — ដំណើរការប៉ារ៉ាឡែល"
        descEn="Why does a gaming PC need a special chip? Because painting 8 million pixels in 16 ms is not one big problem — it's 8 million tiny ones. The CPU is one genius; the GPU is an army."
        descKh="ហេតុអ្វី PC សម្រាប់លេងហ្គេមត្រូវការ chip ពិសេស? ដោយសារការគូរ ៨ លានភីកសែលក្នុង ១៦ មិល្លីវិនាទីមិនមែនជាបញ្ហាធំមួយទេ — វាគឺ ៨ លានបញ្ហាតូច។ CPU គឺជាឆ្នើមម្នាក់; GPU គឺជាកងទ័ព។"
        isKh={isKh}
      >
        <CpuVsGpu isKh={isKh} />
      </Section>

      <Section
        eyebrowEn="03 · The pipeline"
        eyebrowKh="០៣ · បំពង់"
        titleEn="The rendering pipeline — 3D to 2D"
        titleKh="បំពង់បំប្លែងរូប — ៣វិមាត្រទៅ ២វិមាត្រ"
        descEn="Every character on your screen begins as a few hundred triangles. Three steps turn that bare skeleton into the photoreal hero you control."
        descKh="តួអង្គគ្រប់រូបនៅលើអេក្រង់របស់អ្នកចាប់ផ្ដើមជាត្រីកោណរាប់រយ។ បីជំហានបំប្លែងគ្រោងឆ្អឹងទទេនោះទៅជាវីរបុរសរូបភាពពិតដែលអ្នកគ្រប់គ្រង។"
        isKh={isKh}
      >
        <RenderPipeline isKh={isKh} />
      </Section>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 text-center text-zinc-400 text-sm italic">
        <span className={isKh ? "font-khmer not-italic" : ""}>
          {isKh
            ? "“ហ្គេមដ៏ល្អបំផុតគឺមួយដែលលាក់គណិតវិទ្យាទាំងអស់របស់វា ហើយបង្ហាញតែមនោសញ្ចេតនា។” — ទស្សនវិជ្ជាការរចនាហ្គេម"
            : "“The best game is one that hides all of its math and shows only the feeling.” — Game-design philosophy"}
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
      <div
        className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-2 ${isKh ? "font-khmer tracking-normal normal-case" : ""}`}
        style={{ color: NEON_G }}
      >
        <Sparkles className="w-3 h-3" />
        {isKh ? eyebrowKh : eyebrowEn}
      </div>
      <h2 className={`font-display font-bold text-2xl sm:text-3xl text-zinc-50 mb-2 ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh ? titleKh : titleEn}
      </h2>
      <p className={`text-zinc-300/80 text-sm max-w-3xl mb-6 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function ArcadePanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-gradient-to-br from-[#0a0a0f] to-[#050507] rounded-xl border border-zinc-800 shadow-[0_0_36px_-14px_rgba(178,102,255,0.45)] ${className}`}>
      <span className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l" style={{ borderColor: NEON_G + "AA" }} />
      <span className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r" style={{ borderColor: NEON_P + "AA" }} />
      <span className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l" style={{ borderColor: NEON_P + "AA" }} />
      <span className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r" style={{ borderColor: NEON_G + "AA" }} />
      {children}
    </div>
  );
}

function ArcadeBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {/* Faint grid */}
      <svg width="100%" height="100%" className="opacity-[0.07]">
        <defs>
          <pattern id="vg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={NEON_G} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vg-grid)" />
      </svg>
      {/* Glow blooms */}
      <div className="absolute top-32 -left-20 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: NEON_P + "1A" }} />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: NEON_G + "14" }} />
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 3px)" }}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1. The Game Loop
// ════════════════════════════════════════════════════════════════════════════

function GameLoop({ isKh }: { isKh: boolean }) {
  const STAGES = [
    {
      key: "input",
      icon: Gamepad2,
      tEn: "Input",  tKh: "ការបញ្ចូល",
      hEn: "Read the controller", hKh: "អានឧបករណ៍លេង",
      bEn: "The engine asks the keyboard, mouse, controller, or touchscreen: which buttons are pressed right now? It captures the player's intent for this single frame.",
      bKh: "ម៉ាស៊ីនសួរក្ដារចុច កណ្ដុរ ឧបករណ៍លេង ឬអេក្រង់ប៉ះថា៖ ប៊ូតុងណាខ្លះកំពុងចុចឥឡូវនេះ? វាចាប់យកចេតនារបស់អ្នកលេងសម្រាប់រូបភាពតែមួយនេះ។",
      color: NEON_C,
    },
    {
      key: "update",
      icon: Cpu,
      tEn: "Update", tKh: "ធ្វើបច្ចុប្បន្នភាព",
      hEn: "Physics + game logic", hKh: "រូបវិទ្យា + តក្កវិជ្ជាហ្គេម",
      bEn: "Move every character, apply gravity, check if a bullet hit a wall, deduct health, advance the AI's plan. The world is recomputed for the next ~16 ms slice of time.",
      bKh: "ផ្លាស់ទីតួអង្គគ្រប់រូប អនុវត្តទំនាញ ពិនិត្យថាគ្រាប់ប៉ះជញ្ជាំងឬអត់ កាត់សុខភាព បន្តផែនការ AI។ ពិភពលោកត្រូវបានគណនាឡើងវិញសម្រាប់ ១៦ មិល្លីវិនាទីបន្ទាប់។",
      color: NEON_P,
    },
    {
      key: "render",
      icon: ImageIcon,
      tEn: "Render", tKh: "គូររូប",
      hEn: "Draw to the screen",  hKh: "គូរលើអេក្រង់",
      bEn: "The GPU paints all 8 million pixels of a 4K frame using triangles, textures, and lights. The completed frame is sent to your monitor — and the loop instantly restarts.",
      bKh: "GPU គូរភីកសែលទាំង ៨ លាននៃរូបភាព 4K ដោយប្រើត្រីកោណ វាយនភាព និងពន្លឺ។ រូបភាពបានបញ្ចប់ត្រូវផ្ញើទៅកាន់អេក្រង់របស់អ្នក — ហើយវដ្តចាប់ផ្ដើមឡើងវិញភ្លាមៗ។",
      color: NEON_G,
    },
  ] as const;

  const [active, setActive] = useState<string>("input");
  const [running, setRunning] = useState(true);
  const [tick, setTick] = useState(0);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000 / fps * 6); // 6 frames per visible step
    return () => clearInterval(id);
  }, [running, fps]);
  useEffect(() => {
    if (!running) return;
    const order = ["input", "update", "render"];
    setActive(order[tick % 3]);
  }, [tick, running]);

  const cur = STAGES.find((s) => s.key === active)!;
  const Icon = cur.icon;

  return (
    <ArcadePanel className="p-5 sm:p-6">
      <div className="grid lg:grid-cols-5 gap-6 items-start">
        {/* Loop diagram */}
        <div className="lg:col-span-3 bg-black rounded-lg border border-zinc-800 p-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            {STAGES.map((s, i) => {
              const SIcon = s.icon;
              const isActive = s.key === active;
              return (
                <div key={s.key} className="flex flex-col items-center">
                  <button
                    onClick={() => { setActive(s.key); setRunning(false); }}
                    aria-pressed={isActive}
                    aria-label={isKh ? s.tKh : s.tEn}
                    className="relative w-full aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    style={{
                      borderColor: s.color + (isActive ? "" : "55"),
                      backgroundColor: isActive ? s.color + "18" : "#070709",
                      boxShadow: isActive ? `0 0 24px -4px ${s.color}` : "none",
                      ["--tw-ring-color" as any]: s.color,
                    }}
                  >
                    <div
                      className="absolute top-1.5 left-2 text-[10px] font-mono font-bold opacity-80"
                      style={{ color: s.color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <SIcon className="w-7 h-7 sm:w-9 sm:h-9" style={{ color: s.color }} />
                    <div
                      className={`text-xs sm:text-sm font-bold tracking-wide ${isKh ? "font-khmer" : "uppercase"}`}
                      style={{ color: s.color }}
                    >
                      {isKh ? s.tKh : s.tEn}
                    </div>
                  </button>
                  {i < STAGES.length - 1 && (
                    <ArrowRight
                      className="hidden sm:block w-5 h-5 mt-1"
                      style={{
                        color: (running && (tick % 3) === i) ? STAGES[i + 1].color : "#3f3f46",
                        filter: (running && (tick % 3) === i) ? `drop-shadow(0 0 6px ${STAGES[i + 1].color})` : "none",
                        transform: "translateX(50%)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Loop-back arrow + frame counter */}
          <div className="flex items-center justify-between text-xs font-mono px-1">
            <div className="flex items-center gap-2 text-zinc-500">
              <RotateCcw className="w-3.5 h-3.5" style={{ color: NEON_P }} />
              <span>{isKh ? "ធ្វើម្ដងទៀត..." : "loop forever"}</span>
            </div>
            <div className="text-zinc-500">
              <span style={{ color: NEON_G }}>frame</span> #{tick.toString().padStart(5, "0")} · {fps} <span style={{ color: NEON_G }}>fps</span>
            </div>
          </div>

          {/* FPS slider + pause */}
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-zinc-800">
            <button
              onClick={() => setRunning((r) => !r)}
              aria-pressed={running}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-bold text-sm transition-colors ${isKh ? "font-khmer" : ""}`}
              style={{
                backgroundColor: running ? "transparent" : NEON_G,
                color: running ? NEON_G : "#000",
                border: `1px solid ${NEON_G}`,
              }}
            >
              {running ? <><Pause className="w-4 h-4" />{isKh ? "ផ្អាក" : "Pause"}</> : <><Play className="w-4 h-4" />{isKh ? "លេង" : "Run"}</>}
            </button>
            <label className={`flex items-center gap-2 text-xs font-mono text-zinc-400 ${isKh ? "font-khmer" : ""}`}>
              <span style={{ color: NEON_C }}>{isKh ? "ល្បឿន" : "speed"}</span>
              <input
                type="range" min={5} max={60} step={5} value={fps}
                onChange={(e) => setFps(Number(e.target.value))}
                className="w-32 accent-emerald-400"
                aria-label="speed"
              />
              <span className="text-zinc-300 w-12">{fps} fps</span>
            </label>
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          <div className="bg-black border-2 rounded-lg p-5" style={{ borderColor: cur.color + "70" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ backgroundColor: cur.color + "20", color: cur.color }}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className={`text-[10px] font-mono font-bold uppercase tracking-widest ${isKh ? "font-khmer tracking-normal normal-case" : ""}`} style={{ color: cur.color }}>
                  {isKh ? "ដំណាក់កាល" : "Stage"}
                </div>
                <div className={`font-display font-bold text-2xl text-zinc-50 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? cur.tKh : cur.tEn}
                </div>
              </div>
            </div>
            <div className={`font-bold text-base mb-2 ${isKh ? "font-khmer" : ""}`} style={{ color: cur.color }}>
              {isKh ? cur.hKh : cur.hEn}
            </div>
            <p className={`text-sm text-zinc-200/90 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? cur.bKh : cur.bEn}
            </p>
          </div>

          {/* Sub-engines */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-black border border-zinc-800 rounded-md p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Activity className="w-3.5 h-3.5" style={{ color: NEON_P }} />
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isKh ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: NEON_P }}>
                  {isKh ? "Physics Engine" : "Physics Engine"}
                </span>
              </div>
              <p className={`text-[11px] text-zinc-400 ${isKh ? "font-khmer leading-loose" : "leading-snug"}`}>
                {isKh
                  ? "គណិតវិទ្យានៃទំនាញ ការប៉ះទង្គិច និងការដួល។ ឧ. Havok, Box2D, PhysX។"
                  : "The math of gravity, collisions, and falling. e.g. Havok, Box2D, PhysX."}
              </p>
            </div>
            <div className="bg-black border border-zinc-800 rounded-md p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sun className="w-3.5 h-3.5" style={{ color: NEON_G }} />
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isKh ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: NEON_G }}>
                  {isKh ? "Rendering Engine" : "Rendering Engine"}
                </span>
              </div>
              <p className={`text-[11px] text-zinc-400 ${isKh ? "font-khmer leading-loose" : "leading-snug"}`}>
                {isKh
                  ? "គណិតវិទ្យានៃពន្លឺ ស្រមោល និងពណ៌។ ឧ. Unreal, Unity, Godot។"
                  : "The math of light, shadow, and colour. e.g. Unreal, Unity, Godot."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ArcadePanel>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. CPU vs GPU — parallel processing race
// ════════════════════════════════════════════════════════════════════════════

function CpuVsGpu({ isKh }: { isKh: boolean }) {
  const TOTAL = 64; // pixels per side of the 8x8 grid
  const [running, setRunning] = useState(false);
  const [cpuDone, setCpuDone] = useState(0);
  const [gpuDone, setGpuDone] = useState(0);
  const cpuRef = useRef<number | null>(null);
  const gpuRef = useRef<number | null>(null);

  const start = () => {
    // Hard re-entry guard: if either timer ref is still live, ignore the click.
    // (state updates are async, so checking `running` alone can race a double-click.)
    if (running || cpuRef.current !== null || gpuRef.current !== null) return;
    setCpuDone(0); setGpuDone(0); setRunning(true);

    // CPU: paints one pixel every ~80ms (one professor, one task at a time)
    let c = 0;
    cpuRef.current = window.setInterval(() => {
      c += 1;
      setCpuDone(c);
      if (c >= TOTAL && cpuRef.current !== null) {
        clearInterval(cpuRef.current);
        cpuRef.current = null;
      }
    }, 80);

    // GPU: paints 8 pixels every ~80ms (army of 8 students working in parallel)
    let g = 0;
    gpuRef.current = window.setInterval(() => {
      g = Math.min(TOTAL, g + 8);
      setGpuDone(g);
      if (g >= TOTAL && gpuRef.current !== null) {
        clearInterval(gpuRef.current);
        gpuRef.current = null;
      }
    }, 80);
  };

  // Stop running flag once both finish
  useEffect(() => {
    if (running && cpuDone >= TOTAL && gpuDone >= TOTAL) setRunning(false);
  }, [cpuDone, gpuDone, running]);

  // Cleanup intervals on unmount
  useEffect(() => () => {
    if (cpuRef.current !== null) clearInterval(cpuRef.current);
    if (gpuRef.current !== null) clearInterval(gpuRef.current);
  }, []);

  const reset = () => {
    if (cpuRef.current !== null) { clearInterval(cpuRef.current); cpuRef.current = null; }
    if (gpuRef.current !== null) { clearInterval(gpuRef.current); gpuRef.current = null; }
    setRunning(false); setCpuDone(0); setGpuDone(0);
  };

  return (
    <ArcadePanel className="p-5 sm:p-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <button
          onClick={start}
          disabled={running}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: NEON_G, color: "#000" }}
        >
          <Play className="w-4 h-4" />
          {isKh ? "ចាប់ផ្ដើមការប្រណាំង" : "Start the race"}
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-bold text-sm border"
          style={{ color: NEON_P, borderColor: NEON_P }}
        >
          <RotateCcw className="w-4 h-4" />
          {isKh ? "កំណត់ឡើងវិញ" : "Reset"}
        </button>
        <span className={`text-xs text-zinc-400 font-mono ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "គូរ ៦៤ ភីកសែល..." : "Painting 64 pixels..."}
        </span>
      </div>

      {/* Race */}
      <div className="grid md:grid-cols-2 gap-5">
        <ChipPanel
          isKh={isKh}
          color={NEON_C}
          icon={Cpu}
          titleEn="CPU"
          titleKh="CPU"
          subEn="The Smart Professor"
          subKh="សាស្ត្រាចារ្យឆ្នើម"
          descEn="A few super-fast cores (4–16). Excellent at one complex task at a time — running the OS, AI, game logic. But it paints pixels one by one."
          descKh="ខ្នាតស្នូលលឿន (៤–១៦)។ ល្អបំផុតលើការងារស្មុគស្មាញម្ដងមួយ — ដំណើរការ OS, AI, តក្កវិជ្ជាហ្គេម។ ប៉ុន្តែវាគូរភីកសែលម្ដងមួយៗ។"
          coresLabel="cores"
          coresValue="4 – 16"
          gridDone={cpuDone}
          gridTotal={TOTAL}
          parallelLanes={1}
        />
        <ChipPanel
          isKh={isKh}
          color={NEON_G}
          icon={Zap}
          titleEn="GPU"
          titleKh="GPU"
          subEn="The Army of Students"
          subKh="កងទ័ពនិស្សិត"
          descEn="Thousands of small cores doing identical math at the same time. Perfect for one job: compute the colour of every pixel. An RTX 4090 has 16,384 cores."
          descKh="ខ្នាតតូចរាប់ពាន់ ធ្វើគណិតវិទ្យាដូចគ្នាក្នុងពេលតែមួយ។ ល្អបំផុតសម្រាប់ការងារតែមួយ៖ គណនាពណ៌នៃភីកសែលនីមួយៗ។ RTX 4090 មាន ១៦,៣៨៤ ខ្នាត។"
          coresLabel="cores"
          coresValue="1,000 – 16,000+"
          gridDone={gpuDone}
          gridTotal={TOTAL}
          parallelLanes={8}
        />
      </div>

      {/* Verdict */}
      {(cpuDone >= TOTAL && gpuDone >= TOTAL) && (
        <div className="mt-5 p-4 rounded-md border bg-black/60" style={{ borderColor: NEON_G + "70" }}>
          <p className={`text-sm text-zinc-200 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
            <span style={{ color: NEON_G }}>★</span>{" "}
            {isKh
              ? "GPU បានបញ្ចប់ច្រើនជាង ៨ ដងលឿនជាង CPU នៅលើការងារនេះ — មិនមែនព្រោះវាឆ្លាតជាងទេ ប៉ុន្តែដោយសារវាធ្វើការ ៨ ភីកសែលក្នុងពេលតែមួយ។ នេះគឺជាមូលហេតុដែលហ្គេម 4K ត្រូវការ GPU។"
              : "GPU finished ~8× faster than the CPU on this task — not because it's smarter, but because it works on 8 pixels at once. That's why a 4K game needs a GPU."}
          </p>
        </div>
      )}
    </ArcadePanel>
  );
}

function ChipPanel({
  isKh, color, icon: Icon,
  titleEn, titleKh, subEn, subKh, descEn, descKh,
  coresLabel, coresValue,
  gridDone, gridTotal, parallelLanes,
}: {
  isKh: boolean; color: string; icon: any;
  titleEn: string; titleKh: string;
  subEn: string; subKh: string;
  descEn: string; descKh: string;
  coresLabel: string; coresValue: string;
  gridDone: number; gridTotal: number; parallelLanes: number;
}) {
  const pct = Math.round((gridDone / gridTotal) * 100);
  const cells = Array.from({ length: gridTotal });
  return (
    <div className="bg-black border-2 rounded-lg p-4" style={{ borderColor: color + "70" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: color + "20", color }}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display font-bold text-2xl" style={{ color }}>{isKh ? titleKh : titleEn}</div>
            <div className={`text-xs font-bold ${isKh ? "font-khmer" : ""}`} style={{ color }}>
              {isKh ? subKh : subEn}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">{coresLabel}</div>
          <div className="text-sm font-mono font-bold text-zinc-200">{coresValue}</div>
        </div>
      </div>

      <p className={`text-xs text-zinc-400 mb-3 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
        {isKh ? descKh : descEn}
      </p>

      {/* Pixel grid 8x8 */}
      <div className="grid grid-cols-8 gap-0.5 p-2 bg-zinc-950 border border-zinc-800 rounded-md mb-2 aspect-square">
        {cells.map((_, i) => {
          const isDone = i < gridDone;
          const isWorking = !isDone && i < gridDone + parallelLanes;
          return (
            <div
              key={i}
              className="rounded-[1px] transition-colors"
              style={{
                backgroundColor: isDone ? color : isWorking ? color + "55" : "#0a0a0c",
                boxShadow: isWorking ? `inset 0 0 4px ${color}` : "none",
              }}
            />
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
          <div
            className="h-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          />
        </div>
        <div className="text-xs font-mono text-zinc-300 w-12 text-right">{pct}%</div>
      </div>
      <div className="flex justify-between mt-1 text-[10px] font-mono text-zinc-500">
        <span>{gridDone} / {gridTotal} px</span>
        <span style={{ color }}>{parallelLanes}× {isKh ? "ប៉ារ៉ាឡែល" : "parallel"}</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. Rendering pipeline — Mesh → Texture → Light
// ════════════════════════════════════════════════════════════════════════════

function RenderPipeline({ isKh }: { isKh: boolean }) {
  const STEPS = [
    { key: "mesh", color: NEON_G, icon: Triangle,
      tEn: "1 · Mesh / Geometry", tKh: "១ · សាច់ដុំ / ធរណីមាត្រ",
      hEn: "Build the skeleton from triangles", hKh: "សាងសង់គ្រោងឆ្អឹងពីត្រីកោណ",
      bEn: "Every 3D model — character, car, mountain — is millions of flat triangles glued at the edges. The triangle is the simplest flat surface, and the GPU is hyper-optimised to draw billions of them per second.",
      bKh: "គំរូ ៣វិមាត្រគ្រប់រូប — តួអង្គ ឡាន ភ្នំ — គឺជាត្រីកោណរាប់លានដែលភ្ជាប់នៅគែម។ ត្រីកោណគឺជាផ្ទៃរាបសាមញ្ញបំផុត ហើយ GPU ត្រូវបានបង្កើនប្រសិទ្ធភាពយ៉ាងខ្លាំងដើម្បីគូររាប់ប៊ីលានក្នុងមួយវិនាទី។",
    },
    { key: "texture", color: NEON_C, icon: ImageIcon,
      tEn: "2 · Texturing", tKh: "២ · វាយនភាព",
      hEn: "Wrap the skeleton in skin", hKh: "ខ្ទប់គ្រោងឆ្អឹងជាមួយស្បែក",
      bEn: "A flat 2D image (the texture, like wallpaper) is stretched onto the triangles using UV coordinates — telling each triangle corner exactly where on the image to look up its colour.",
      bKh: "រូបភាព ២វិមាត្រ (វាយនភាព ដូច wallpaper) ត្រូវបានទាញលើត្រីកោណដោយប្រើកូអរដោនេ UV — ប្រាប់ជ្រុងត្រីកោណនីមួយៗឲ្យដឹងថាត្រូវរកពណ៌នៅទីណានៃរូបភាពនោះ។",
    },
    { key: "light", color: NEON_P, icon: Sun,
      tEn: "3 · Lighting & Shaders", tKh: "៣ · ពន្លឺ និង Shaders",
      hEn: "Calculate how light bounces", hKh: "គណនារបៀបដែលពន្លឺលោត",
      bEn: "Tiny GPU programs called shaders compute, for every pixel: which lights see it, what angle it faces, what colour the texture is, how shiny the surface is. The result is the photoreal pixel that lands on your screen.",
      bKh: "កម្មវិធី GPU តូចៗហៅថា shaders គណនាសម្រាប់រាល់ភីកសែល៖ ពន្លឺណាដែលឃើញវា មុំណាដែលវាបែរ ពណ៌អ្វីនៃវាយនភាព ផ្ទៃវារលោងប៉ុនណា។ លទ្ធផលគឺជាភីកសែលរូបភាពពិតដែលធ្លាក់លើអេក្រង់របស់អ្នក។",
    },
  ] as const;

  const [step, setStep] = useState<0 | 1 | 2>(0);

  return (
    <ArcadePanel className="p-5 sm:p-6">
      {/* Step bar */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-2">
        {STEPS.map((s, i) => {
          const SIcon = s.icon;
          const isActive = step === i;
          return (
            <div key={s.key} className="flex items-center flex-shrink-0">
              <button
                onClick={() => setStep(i as 0 | 1 | 2)}
                aria-pressed={isActive}
                aria-label={isKh ? s.tKh : s.tEn}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-bold border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                style={{
                  borderColor: s.color,
                  backgroundColor: isActive ? s.color + "20" : "transparent",
                  color: s.color,
                  boxShadow: isActive ? `0 0 14px -2px ${s.color}` : "none",
                  ["--tw-ring-color" as any]: s.color,
                }}
              >
                <SIcon className="w-4 h-4" />
                <span className={isKh ? "font-khmer" : ""}>{isKh ? s.tKh : s.tEn}</span>
              </button>
              {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-zinc-600 mx-1" />}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-5 items-start">
        {/* Visualization */}
        <div className="lg:col-span-3 bg-black rounded-lg border border-zinc-800 p-4">
          <RenderViz step={step} isKh={isKh} />
          <div className={`mt-3 text-[10px] font-mono uppercase tracking-widest text-center ${isKh ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: STEPS[step].color }}>
            {isKh ? "ការមើលឃើញជំហានទី " : "Stage "}{step + 1} / 3
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          <div className="bg-black border-2 rounded-lg p-5" style={{ borderColor: STEPS[step].color + "70" }}>
            <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`} style={{ color: STEPS[step].color }}>
              {isKh ? STEPS[step].hKh : STEPS[step].hEn}
            </div>
            <div className={`font-display font-bold text-xl text-zinc-50 mb-3 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? STEPS[step].tKh : STEPS[step].tEn}
            </div>
            <p className={`text-sm text-zinc-200/90 ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}>
              {isKh ? STEPS[step].bKh : STEPS[step].bEn}
            </p>
          </div>

          <div className="flex justify-between mt-3">
            <button
              onClick={() => setStep((s) => (s > 0 ? (s - 1) as 0 | 1 | 2 : s))}
              disabled={step === 0}
              className="px-3 py-1.5 rounded-md text-xs font-bold border border-zinc-700 text-zinc-300 disabled:opacity-30"
            >
              ← {isKh ? "ថយក្រោយ" : "Prev"}
            </button>
            <button
              onClick={() => setStep((s) => (s < 2 ? (s + 1) as 0 | 1 | 2 : s))}
              disabled={step === 2}
              className="px-3 py-1.5 rounded-md text-xs font-bold"
              style={{ backgroundColor: NEON_G, color: "#000", opacity: step === 2 ? 0.3 : 1 }}
            >
              {isKh ? "បន្ទាប់" : "Next"} →
            </button>
          </div>

          <p className={`text-xs text-zinc-500 mt-4 italic ${isKh ? "font-khmer not-italic leading-loose" : ""}`}>
            <Layers className="w-3 h-3 inline mr-1" />
            {isKh
              ? "ដំណើរការទាំងបីនេះប្រព្រឹត្តទៅ ៦០ ដងក្នុងមួយវិនាទីលើ GPU របស់អ្នក — ជាទូទៅសម្រាប់រូបភាពនីមួយៗដែលអ្នកបានឃើញ។"
              : "All three stages run 60 times every second on your GPU — once for every frame you have ever seen."}
          </p>
        </div>
      </div>
    </ArcadePanel>
  );
}

function RenderViz({ step, isKh }: { step: 0 | 1 | 2; isKh: boolean }) {
  // A simple low-poly head: a hexagonal silhouette built from triangles
  // Triangles share vertices so the wireframe looks like a real mesh.
  const cx = 200, cy = 180;
  const verts: [number, number][] = [
    [cx, cy - 110],          // 0 top
    [cx - 90, cy - 50],      // 1 top-left
    [cx + 90, cy - 50],      // 2 top-right
    [cx - 110, cy + 30],     // 3 mid-left (cheek)
    [cx + 110, cy + 30],     // 4 mid-right
    [cx - 70, cy + 100],     // 5 jaw-left
    [cx + 70, cy + 100],     // 6 jaw-right
    [cx, cy + 130],          // 7 chin
    [cx, cy - 30],           // 8 nose-bridge
    [cx - 30, cy + 40],      // 9 nose-tip-left
    [cx + 30, cy + 40],      // 10 nose-tip-right
  ];
  const tris = [
    [0, 1, 8], [0, 8, 2], [1, 3, 8], [2, 8, 4],
    [8, 9, 10], [8, 3, 9], [8, 10, 4],
    [3, 5, 9], [4, 10, 6], [9, 5, 7], [10, 7, 6], [9, 7, 10],
  ];
  // A few "lights" for step 3 — assign brightness 0..1 per triangle
  const litShade = (i: number) => {
    const map = [0.95, 0.9, 0.7, 0.85, 0.55, 0.6, 0.5, 0.4, 0.45, 0.3, 0.25, 0.35];
    return map[i] ?? 0.5;
  };
  // For texturing step, alternate skin-toned fills for visual "wallpaper" effect
  const texShade = (i: number) => {
    const tones = ["#d4a373", "#c98e63", "#b97a4d", "#8a5b3b", "#a7704a"];
    return tones[i % tones.length];
  };

  return (
    <svg viewBox="0 0 400 360" className="w-full max-w-[440px] mx-auto h-auto block" role="img" aria-labelledby="vg-pipe-title vg-pipe-desc">
      <title id="vg-pipe-title">{isKh ? "បំពង់បំប្លែងរូប 3D" : "3D rendering pipeline"}</title>
      <desc id="vg-pipe-desc">{isKh ? "តួអង្គមួយក្នុងបីដំណាក់កាល៖ មូលដ្ឋានត្រីកោណ វាយនភាពស្បែក និងពន្លឺ" : "A character head shown in three rendering stages: triangle mesh, textured skin, and lit shaded surface."}</desc>

      {/* Backdrop grid for context */}
      <defs>
        <linearGradient id="vg-light-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stopColor={NEON_P} stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      {step === 2 && (
        <>
          {/* Key light from upper-left */}
          <circle cx="60" cy="50" r="120" fill="url(#vg-light-grad)" />
          <circle cx="60" cy="50" r="6" fill={NEON_P} className="vg-pulse" />
          <text x="76" y="52" fontSize="9" fill={NEON_P} fontFamily="monospace">light source</text>
        </>
      )}

      {/* Triangles */}
      {tris.map((t, i) => {
        const pts = `${verts[t[0]][0]},${verts[t[0]][1]} ${verts[t[1]][0]},${verts[t[1]][1]} ${verts[t[2]][0]},${verts[t[2]][1]}`;
        if (step === 0) {
          // Mesh: wireframe only, slow draw-on
          return (
            <polygon
              key={i}
              points={pts}
              fill="none"
              stroke={NEON_G}
              strokeWidth="1.2"
              strokeLinejoin="round"
              className="vg-tri-draw"
              style={{ animationDelay: `${i * 0.08}s`, filter: `drop-shadow(0 0 2px ${NEON_G})` }}
            />
          );
        }
        if (step === 1) {
          // Texture: filled with skin tones, light wireframe overlay
          return (
            <polygon
              key={i}
              points={pts}
              fill={texShade(i)}
              stroke={NEON_C + "80"}
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          );
        }
        // Step 2: lit + shaded — fill brightness depends on lit level
        const sh = litShade(i);
        const r = Math.round(212 * sh + 30);
        const g = Math.round(163 * sh + 20);
        const b = Math.round(115 * sh + 20);
        return (
          <polygon
            key={i}
            points={pts}
            fill={`rgb(${r},${g},${b})`}
            stroke="none"
          />
        );
      })}

      {/* UV grid overlay for texture step */}
      {step === 1 && (
        <g opacity="0.45" pointerEvents="none">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={`h${f}`} x1="100" y1={70 + f * 200} x2="310" y2={70 + f * 200} stroke={NEON_C} strokeWidth="0.5" strokeDasharray="2 2" />
          ))}
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={`v${f}`} x1={100 + f * 210} y1="70" x2={100 + f * 210} y2="270" stroke={NEON_C} strokeWidth="0.5" strokeDasharray="2 2" />
          ))}
          <text x="106" y="80" fontSize="8" fill={NEON_C} fontFamily="monospace">UV</text>
        </g>
      )}

      {/* Vertex dots (always shown for context) */}
      {verts.map((v, i) => (
        <circle key={i} cx={v[0]} cy={v[1]} r={step === 0 ? 2.5 : 1.5} fill={step === 0 ? NEON_G : "#ffffff80"} />
      ))}

      {/* Eye dots in step 2 + 1 only (after texturing) */}
      {step >= 1 && (
        <>
          <circle cx={cx - 35} cy={cy - 5} r="5" fill="#0a0a0a" />
          <circle cx={cx + 35} cy={cy - 5} r="5" fill="#0a0a0a" />
          <circle cx={cx - 35} cy={cy - 5} r="1.5" fill="#fff" />
          <circle cx={cx + 35} cy={cy - 5} r="1.5" fill="#fff" />
        </>
      )}

      {/* Stage label */}
      <g>
        <rect x="14" y="320" width="100" height="22" rx="4" fill="#000" stroke="#27272a" />
        <text x="64" y="335" fontSize="10" fontFamily="monospace" textAnchor="middle" fill={step === 0 ? NEON_G : step === 1 ? NEON_C : NEON_P}>
          {step === 0 ? "MESH · 12 tris" : step === 1 ? "TEXTURED" : "LIT + SHADED"}
        </text>
      </g>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  Scoped styles
// ════════════════════════════════════════════════════════════════════════════

function ScopedStyles() {
  return (
    <style>{`
      .vg-neon-glow {
        background: linear-gradient(90deg, ${NEON_G} 0%, ${NEON_P} 50%, ${NEON_G} 100%);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: vg-shine-kf 5s linear infinite;
        text-shadow: 0 0 26px rgba(34,255,136,0.35);
      }
      @keyframes vg-shine-kf {
        0%   { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }

      @keyframes vg-pulse-kf {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.55; transform: scale(1.18); }
      }
      .vg-pulse { animation: vg-pulse-kf 1.6s ease-in-out infinite; }

      @keyframes vg-spin-slow-kf {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      .vg-spin-slow { animation: vg-spin-slow-kf 16s linear infinite; transform-origin: center; }

      /* Wireframe triangle draw-on */
      @keyframes vg-tri-draw-kf {
        0%   { stroke-dasharray: 200; stroke-dashoffset: 200; opacity: 0; }
        15%  { opacity: 1; }
        100% { stroke-dasharray: 200; stroke-dashoffset: 0; opacity: 1; }
      }
      .vg-tri-draw { animation: vg-tri-draw-kf 1.6s ease-out forwards; }

      @media (prefers-reduced-motion: reduce) {
        .vg-neon-glow, .vg-pulse, .vg-spin-slow, .vg-tri-draw {
          animation: none !important;
          stroke-dashoffset: 0 !important;
          opacity: 1 !important;
        }
      }
    `}</style>
  );
}
