import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Telescope, Rocket, RotateCcw, Info, ArrowLeft, Orbit } from "lucide-react";
import { Link } from "wouter";
import { useLanguageStore } from "@/store/use-language";

// ── Physics constants ─────────────────────────────────────────
const GM = 5000;              // gravitational parameter (px³/frame²)
const DT = 0.9;               // time step per frame
const PLANET_R = 50;          // planet radius in px
const SAT_R = 7;              // satellite radius in px
const TRAIL_LEN = 300;        // trail history length
const ESCAPE_DIST = 1300;     // satellite is "escaped" beyond this
const STABLE_FRAMES = 900;    // frames before declaring stable orbit
const CW = 600;               // canvas width
const CH = 500;               // canvas height
const CX = CW / 2;           // centre x
const CY = CH / 2;           // centre y

type Outcome = "none" | "crash" | "escaped" | "orbit";
type V2 = { x: number; y: number };

// Stars generated once at module load (avoids per-frame randomness flicker)
const STARS: Array<{ x: number; y: number; r: number; a: number }> = Array.from(
  { length: 130 },
  () => ({
    x: Math.random() * CW,
    y: Math.random() * CH,
    r: Math.random() * 0.9 + 0.2,
    a: Math.random() * 0.6 + 0.3,
  })
);

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  sat: V2,
  trail: V2[],
  outcome: Outcome,
  showSat: boolean,
  guideR: number,
  lang: string
) {
  // Background
  ctx.fillStyle = "#080c1a";
  ctx.fillRect(0, 0, CW, CH);

  // Stars
  STARS.forEach((s) => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.fill();
  });

  // Guide circle (starting distance ring)
  if (guideR > 0) {
    ctx.beginPath();
    ctx.setLineDash([4, 8]);
    ctx.arc(CX, CY, guideR, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(100,200,255,0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Planet glow
  const glow = ctx.createRadialGradient(CX, CY, PLANET_R * 0.5, CX, CY, PLANET_R * 2.4);
  glow.addColorStop(0, "rgba(56,189,248,0.14)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.beginPath();
  ctx.arc(CX, CY, PLANET_R * 2.4, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  // Planet body
  const pg = ctx.createRadialGradient(CX - 14, CY - 14, 6, CX, CY, PLANET_R);
  pg.addColorStop(0, "#bae6fd");
  pg.addColorStop(0.45, "#2563eb");
  pg.addColorStop(1, "#0f2a52");
  ctx.beginPath();
  ctx.arc(CX, CY, PLANET_R, 0, Math.PI * 2);
  ctx.fillStyle = pg;
  ctx.fill();

  // Trail
  for (let i = 1; i < trail.length; i++) {
    const alpha = (i / trail.length) * 0.75;
    ctx.beginPath();
    ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
    ctx.lineTo(trail[i].x, trail[i].y);
    ctx.strokeStyle = `rgba(251,191,36,${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Satellite
  if (showSat && outcome !== "crash") {
    const sg = ctx.createRadialGradient(sat.x - 2, sat.y - 2, 1, sat.x, sat.y, SAT_R);
    sg.addColorStop(0, "#fef9c3");
    sg.addColorStop(1, "#f59e0b");
    ctx.beginPath();
    ctx.arc(sat.x, sat.y, SAT_R, 0, Math.PI * 2);
    ctx.fillStyle = sg;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Outcome overlay banner
  if (outcome !== "none") {
    const cfg = {
      crash:   { bg: "rgba(185,28,28,0.92)",  icon: "💥", en: "Crashed into the planet!",  kh: "ផ្ទុះទៅលើភព!" },
      escaped: { bg: "rgba(180,83,9,0.92)",   icon: "🚀", en: "Escaped into deep space!",  kh: "រត់ចេញទៅអវកាស!" },
      orbit:   { bg: "rgba(21,128,61,0.92)",  icon: "🌕", en: "Stable orbit achieved!",    kh: "ទ្រនាប់ស្ថិតស្ថេរ!" },
    }[outcome];
    const bw = 320, bh = 64, bx = (CW - bw) / 2, by = 18;
    ctx.fillStyle = cfg.bg;
    roundRect(ctx, bx, by, bw, bh, 14);
    ctx.fill();
    ctx.font = "bold 17px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${cfg.icon}  ${lang === "kh" ? cfg.kh : cfg.en}`, CW / 2, by + bh / 2);
    ctx.textBaseline = "alphabetic";
  }
}

export default function OrbitalMechanics() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const simRef = useRef({
    pos: { x: 0, y: 0 } as V2,
    vel: { x: 0, y: 0 } as V2,
    trail: [] as V2[],
    frames: 0,
    running: false,
    outcome: "none" as Outcome,
  });

  const [velocity, setVelocity] = useState(5);
  const [distance, setDistance] = useState(4);
  const [outcome, setOutcome] = useState<Outcome>("none");
  const [simRunning, setSimRunning] = useState(false);

  // Circular orbit velocity hint
  const circularV = Math.sqrt(GM / (distance * PLANET_R)).toFixed(1);

  const getCtx = () => canvasRef.current?.getContext("2d") ?? null;

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    simRef.current.running = false;
  }, []);

  // ── Idle render ──────────────────────────────────────────────
  const renderIdle = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const startX = CX + distance * PLANET_R;
    drawFrame(ctx, { x: startX, y: CY }, [], "none", true, distance * PLANET_R, language);
  }, [distance, language]);

  useEffect(() => { renderIdle(); }, [renderIdle]);

  // ── Animation loop ───────────────────────────────────────────
  const startLoop = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const tick = () => {
      const s = simRef.current;
      if (!s.running) return;

      const dx = CX - s.pos.x;
      const dy = CY - s.pos.y;
      const r2 = dx * dx + dy * dy;
      const r  = Math.sqrt(r2);
      const acc = GM / r2;

      s.vel.x += acc * (dx / r) * DT;
      s.vel.y += acc * (dy / r) * DT;
      s.pos.x += s.vel.x * DT;
      s.pos.y += s.vel.y * DT;

      s.trail.push({ x: s.pos.x, y: s.pos.y });
      if (s.trail.length > TRAIL_LEN) s.trail.shift();
      s.frames++;

      let out: Outcome = "none";
      if (r < PLANET_R + SAT_R)  out = "crash";
      else if (r > ESCAPE_DIST)   out = "escaped";
      else if (s.frames > STABLE_FRAMES) out = "orbit";

      drawFrame(ctx, s.pos, s.trail, out, true, 0, language);

      if (out !== "none") {
        s.running = false;
        s.outcome = out;
        setOutcome(out);
        setSimRunning(false);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [language]);

  const handleLaunch = useCallback(() => {
    stopLoop();
    const startX = CX + distance * PLANET_R;
    simRef.current = {
      pos: { x: startX, y: CY },
      vel: { x: 0, y: -velocity },
      trail: [],
      frames: 0,
      running: true,
      outcome: "none",
    };
    setOutcome("none");
    setSimRunning(true);
    startLoop();
  }, [distance, velocity, stopLoop, startLoop]);

  const handleReset = useCallback(() => {
    stopLoop();
    setOutcome("none");
    setSimRunning(false);
    renderIdle();
  }, [stopLoop, renderIdle]);

  useEffect(() => () => stopLoop(), [stopLoop]);

  // Outcome card data
  const cards = [
    {
      icon: "💥",
      border: "border-red-500/30 bg-red-950/30",
      titleEn: "Too Slow → Crash",
      titleKh: "យឺតពេក → ផ្ទុះ",
      descEn: "Gravity overpowers velocity. The satellite spirals inward and strikes the planet.",
      descKh: "ទំនាញឈ្នះល្បឿន។ ផ្កាប់រុញចូលខាងក្នុង ហើយផ្ទុះទៅភព។",
    },
    {
      icon: "🌕",
      border: "border-emerald-500/30 bg-emerald-950/30",
      titleEn: "Just Right → Orbit",
      titleKh: "ល្មមត្រូវ → ទ្រនាប់",
      descEn: "Velocity and gravity balance perfectly. A stable elliptical orbit forms.",
      descKh: "ល្បឿន និងទំនាញមានតុល្យភាព។ ទ្រនាប់ ellipse ស្ថិតស្ថេរ។",
    },
    {
      icon: "🚀",
      border: "border-amber-500/30 bg-amber-950/30",
      titleEn: "Too Fast → Escape",
      titleKh: "លឿនពេក → រត់ចេញ",
      descEn: "Velocity exceeds escape speed (√2 × circular). The satellite breaks free.",
      descKh: "ល្បឿនលើស √2 × ល្បឿនស្ថិតស្ថេរ។ ផ្កាប់ភៀសចេញ។",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080c1a] text-white pb-24 overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#080c1a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">{kh ? "ត្រឡប់ក្រោយ" : "Back"}</span>
          </Link>
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Telescope className="w-5 h-5" />
            {kh ? "មេកានិចអង្កាស" : "Orbital Mechanics"}
          </div>
          <div className="w-20" />
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="max-w-7xl mx-auto px-4 pt-12 pb-10 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-900/40 border border-sky-500/20 text-sky-300 text-xs font-bold tracking-widest mb-6 uppercase">
            <Telescope className="w-4 h-4" />
            {kh ? "តារាវិទ្យា" : "Astronomy"}
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
            {kh
              ? <><span className="text-sky-400">មេកានិច</span>អង្កាស</>
              : <><span className="text-sky-400">Orbital</span> Mechanics</>}
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
            {kh
              ? "លៃតម្រូវល្បឿន និងចម្ងាយ ហើយបាញ់ផ្កាប់ ដើម្បីមើលច្បាប់ទំនាញស្ករ — ផ្ទុះ? ទ្រនាប់? ឬរត់ចេញ?"
              : "Adjust the velocity and distance, then launch your satellite to see gravity in action — will it crash, orbit, or escape?"}
          </p>
        </motion.div>
      </header>

      {/* ── Simulation + Controls ── */}
      <main className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full lg:flex-1 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-sky-900/30"
          >
            <canvas
              ref={canvasRef}
              width={CW}
              height={CH}
              className="w-full h-auto block"
            />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full lg:w-80 space-y-4 shrink-0"
          >
            {/* Velocity */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold text-sky-300 uppercase tracking-widest">
                  {kh ? "ល្បឿនដំបូង" : "Initial Velocity"}
                </label>
                <span className="text-2xl font-black">{velocity.toFixed(1)}</span>
              </div>
              <input
                id="velocity-slider"
                type="range" min={1} max={15} step={0.1}
                value={velocity}
                onChange={(e) => setVelocity(parseFloat(e.target.value))}
                disabled={simRunning}
                className="w-full accent-sky-400 cursor-pointer disabled:opacity-50"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>{kh ? "យឺត" : "Slow"}</span>
                <span className="text-sky-600">{kh ? "ស្ថិតស្ថេរ ≈" : "Circular ≈"} {circularV}</span>
                <span>{kh ? "លឿន" : "Fast"}</span>
              </div>
            </div>

            {/* Distance */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                  {kh ? "ចម្ងាយដំបូង" : "Starting Distance"}
                </label>
                <span className="text-2xl font-black">{distance.toFixed(1)}<span className="text-sm text-slate-400">× R</span></span>
              </div>
              <input
                id="distance-slider"
                type="range" min={2} max={9} step={0.1}
                value={distance}
                onChange={(e) => { setDistance(parseFloat(e.target.value)); }}
                disabled={simRunning}
                className="w-full accent-amber-400 cursor-pointer disabled:opacity-50"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>{kh ? "ជិត" : "Close"}</span>
                <span>{kh ? "ឆ្ងាយ" : "Far"}</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2">R = {kh ? "កាំភពដើម" : "planet radius"}</p>
            </div>

            {/* Launch */}
            <button
              id="launch-btn"
              onClick={handleLaunch}
              disabled={simRunning}
              className="w-full h-14 bg-sky-600 hover:bg-sky-500 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-sky-900/50"
            >
              <Rocket className="w-5 h-5" />
              {simRunning ? (kh ? "កំពុងបាញ់..." : "Launching…") : (kh ? "បាញ់!" : "Launch!")}
            </button>

            {/* Reset */}
            <button
              id="reset-btn"
              onClick={handleReset}
              className="w-full h-11 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-slate-300 font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              {kh ? "កំណត់ឡើងវិញ" : "Reset"}
            </button>

            {/* How it works */}
            <div className="bg-sky-950/50 border border-sky-500/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
                  {kh ? "របៀបដំណើរការ" : "How It Works"}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {kh
                  ? "ទំនាញភពដើមទាញផ្កាប់ដោយ F = GM/r²។ ប្រសិនបើល្បឿនទាបពេក — ផ្ទុះ! ពេកនៅ — រត់ចេញ! ល្មមត្រូវ — ទ្រនាប់!"
                  : "The planet pulls the satellite inward with F = GM/r². Too slow → crash. Too fast → escape. Just right → orbit!"}
              </p>
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-[11px] text-slate-500">
                  {kh ? "ល្បឿនស្ថិតស្ថេរ" : "Circular velocity"} = √(GM/r)
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {kh ? "ល្បឿនរត់ចេញ" : "Escape velocity"} = √2 × v<sub>circular</sub>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Outcome Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12"
        >
          {cards.map((c) => (
            <div key={c.icon} className={`rounded-2xl border p-6 ${c.border}`}>
              <div className="text-4xl mb-4">{c.icon}</div>
              <h3 className="font-black text-lg mb-2">{kh ? c.titleKh : c.titleEn}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{kh ? c.descKh : c.descEn}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Fun Fact ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex gap-4 items-start"
        >
          <Orbit className="w-8 h-8 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sky-300 mb-1 text-sm uppercase tracking-wide">
              {kh ? "ពិតជាពិត!" : "Real-World Fact"}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              {kh
                ? "ស្ថានីយ៍អវកាសសន្តរជាតិ (ISS) ជ្រុំជុំផែនដីក្នុង ៩០ នាទី ដោយធ្វើដំណើរ ២៨,០០០ គីឡូម៉ែត្រ/ម៉ោង — ប្រហែល ២២ ដងល្បឿននៃយន្តហោះ! ប្រសិនបើអ្នកបង្ការ ISS ឱ្យថយ — វានឹងធ្លាក់ព្រៃលើផែនដី ក្នុងពេលតិចជាង ១ ម៉ោង។"
                : "The International Space Station (ISS) orbits Earth every 90 minutes at 28,000 km/h — about 22× the speed of a jetliner! If you slowed the ISS down even slightly, it would fall back to Earth in under an hour."}
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
