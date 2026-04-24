import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sprout, CloudRain, CloudSun, Droplets, Power, Play, RefreshCw,
  CarFront, AlertTriangle, Hand, Signal, SignalHigh,
  Watch, Lightbulb, MapPin, Wifi, Heart, Zap,
} from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

/* ──────────────────────────────────────────────────────────────────────────────
 * Module wrapper — ties the three sub-experiences together with shared styling
 * (dashed-line "data in the air" animation, bilingual copy, blueprint theme).
 * ────────────────────────────────────────────────────────────────────────────── */

export function IoT5GModule() {
  const { language } = useLanguageStore();
  const kh = language === "kh";

  return (
    <div className="space-y-6">
      {/* Local CSS for the "data in the air" dashed-line animation. Scoped by class. */}
      <style>{`
        @keyframes iotDashFlow {
          to { stroke-dashoffset: -32; }
        }
        .iot-dash-flow {
          stroke-dasharray: 6 6;
          animation: iotDashFlow 1.2s linear infinite;
        }
        @keyframes iotPacket {
          0%   { offset-distance: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .iot-pulse {
          animation: iotPulse 1.6s ease-in-out infinite;
        }
        @keyframes iotPulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.12); }
        }
      `}</style>

      <SmartFarmSimulator kh={kh} />
      <FiveGReflexGame kh={kh} />
      <EverydayIoTGrid kh={kh} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * 1) SMART FARM SIMULATOR
 * ──────────────────────────────────────────────────────────────────────────── */

type SoilState = "dry" | "wet";
type RainState = "rain" | "clear";
type FarmPhase = "idle" | "sensing" | "deciding" | "result";

function SmartFarmSimulator({ kh }: { kh: boolean }) {
  const t = useTranslation();

  // Day number lets us deterministically pick scenarios so users see all 4
  // truth-table combinations within a few clicks (instead of randomly stalling
  // on the same outcome over and over).
  const [day, setDay] = useState(0);
  const [phase, setPhase] = useState<FarmPhase>("idle");
  const [soil, setSoil] = useState<SoilState>("dry");
  const [rain, setRain] = useState<RainState>("clear");

  // Cycle: dry+clear (pump on), dry+rain (off — rain coming!), wet+clear (off — already wet), wet+rain (off).
  const SCENARIOS: Array<{ soil: SoilState; rain: RainState }> = [
    { soil: "dry", rain: "clear" },
    { soil: "wet", rain: "clear" },
    { soil: "dry", rain: "rain"  },
    { soil: "wet", rain: "rain"  },
  ];

  const pumpOn = phase === "result" && soil === "dry" && rain === "clear";

  // Track the phase-transition timers so we can cancel them on reset/unmount,
  // otherwise stale callbacks could push the farm back into "deciding/result"
  // after the user has already pressed Reset (or navigated away).
  const phaseTimersRef = useRef<number[]>([]);
  function clearPhaseTimers() {
    for (const id of phaseTimersRef.current) window.clearTimeout(id);
    phaseTimersRef.current = [];
  }
  useEffect(() => () => clearPhaseTimers(), []);

  function startDay() {
    clearPhaseTimers();
    const next = SCENARIOS[day % SCENARIOS.length];
    setSoil(next.soil);
    setRain(next.rain);
    setDay((d) => d + 1);
    setPhase("sensing");
    // Sequence: sensors transmit → pump decides → result settles.
    phaseTimersRef.current.push(window.setTimeout(() => setPhase("deciding"), 1300));
    phaseTimersRef.current.push(window.setTimeout(() => setPhase("result"),   2200));
  }

  function reset() {
    clearPhaseTimers();
    setPhase("idle");
    setDay(0);
  }

  // Layout coordinates inside the SVG viewBox (640×360). Keeping these
  // constants near the JSX makes it easier to nudge node positions later.
  const SOIL    = { x: 110, y: 270 };
  const WEATHER = { x: 320, y:  70 };
  const PUMP    = { x: 530, y: 270 };

  const sensingActive  = phase === "sensing";
  const decidingActive = phase === "deciding" || phase === "result";

  return (
    <div className="rounded-2xl border-2 border-cyan-500/30 bg-slate-950/70 p-5 sm:p-6 shadow-xl">
      <header className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-300/90 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Interactive · IoT in action", "អន្តរកម្ម · IoT នៅក្នុងសកម្មភាព")}
          </div>
          <h3 className={`mt-1 text-xl sm:text-2xl font-bold text-white ${kh ? "font-khmer" : "font-display"}`}>
            {t("The Smart Farm Simulator", "ម៉ាស៊ីនបណ្តុះកសិដ្ឋានឆ្លាតវៃ")}
          </h3>
          <p className={`mt-1 text-sm text-slate-300 max-w-xl ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Three machines on a Cambodian farm — a soil sensor, a weather check, and a water pump — quietly talk to each other to water the crops only when needed.",
              "ម៉ាស៊ីនបីនៅលើកសិដ្ឋានកម្ពុជា — សេនស័រដី ការត្រួតពិនិត្យអាកាសធាតុ និងម៉ាស៊ីនបូមទឹក — និយាយគ្នាស្ងៀមៗដើម្បីស្រោចស្រពដំណាំតែពេលដែលត្រូវការ។",
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={startDay}
            data-testid="button-start-day"
            disabled={phase !== "idle" && phase !== "result"}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
              phase !== "idle" && phase !== "result"
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400 text-emerald-950"
            } ${kh ? "font-khmer" : ""}`}
          >
            <Play className="w-4 h-4" />
            {t("Start Day", "ចាប់ផ្តើមថ្ងៃ")}
            {day > 0 && <span className="ml-1 opacity-70">#{day + (phase === "idle" ? 0 : 0)}</span>}
          </button>
          {day > 0 && (
            <button
              type="button"
              onClick={reset}
              data-testid="button-reset-farm"
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              aria-label={t("Reset farm", "កំណត់កសិដ្ឋានឡើងវិញ")}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Farm canvas — SVG so the dashed-line "data in the air" animation
          can be exact and the layout scales cleanly on mobile. */}
      <div
        className="relative w-full rounded-xl overflow-hidden border border-cyan-500/20 bg-gradient-to-b from-sky-900/40 via-emerald-900/30 to-amber-900/30"
        data-testid="farm-canvas"
      >
        <svg
          viewBox="0 0 640 360"
          className="w-full h-auto block"
          role="img"
          aria-label={t("Smart farm diagram", "ដ្យាក្រាមកសិដ្ឋានឆ្លាតវៃ")}
        >
          {/* Distant hills / horizon — purely decorative */}
          <path d="M0,210 Q160,160 320,200 T640,200 L640,360 L0,360 Z" fill="#064e3b" opacity="0.55" />
          <path d="M0,250 Q200,210 380,240 T640,240 L640,360 L0,360 Z" fill="#065f46" opacity="0.55" />
          {/* Tilled rows (sketch) */}
          {[290, 305, 320, 335].map((y) => (
            <line key={y} x1="40" x2="600" y1={y} y2={y} stroke="#854d0e" strokeOpacity="0.35" strokeWidth="2" />
          ))}

          {/* ── Connection lines (dashed = "data in the air") ─────────────────── */}
          {/* Sensor → Pump */}
          <line
            x1={SOIL.x} y1={SOIL.y} x2={PUMP.x} y2={PUMP.y}
            stroke={sensingActive || decidingActive ? "#22d3ee" : "#0e7490"}
            strokeWidth="2"
            className={sensingActive ? "iot-dash-flow" : ""}
            strokeDasharray="6 6"
            opacity={sensingActive || decidingActive ? 1 : 0.45}
          />
          {/* Weather → Pump */}
          <line
            x1={WEATHER.x} y1={WEATHER.y} x2={PUMP.x} y2={PUMP.y}
            stroke={sensingActive || decidingActive ? "#a78bfa" : "#5b21b6"}
            strokeWidth="2"
            className={sensingActive ? "iot-dash-flow" : ""}
            strokeDasharray="6 6"
            opacity={sensingActive || decidingActive ? 1 : 0.45}
          />

          {/* Data packets travelling along the wires while sensing */}
          {sensingActive && (
            <>
              <FlowPacket from={SOIL}    to={PUMP}    color="#22d3ee" delay={0} />
              <FlowPacket from={WEATHER} to={PUMP}    color="#a78bfa" delay={0.35} />
            </>
          )}

          {/* ── Nodes ─────────────────────────────────────────────────────────── */}
          <FarmNode
            cx={SOIL.x} cy={SOIL.y}
            color="#22d3ee"
            ring={sensingActive}
            testId="node-soil"
            label={kh ? "សេនស័រដី" : "Soil Sensor"}
            sub={
              phase === "idle"
                ? (kh ? "មិនទាន់អាន" : "Standby")
                : soil === "dry"
                  ? (kh ? "ស្ងួត" : "Dry")
                  : (kh ? "សើម" : "Wet")
            }
            statusColor={
              phase === "idle" ? "#94a3b8"
              : soil === "dry" ? "#f59e0b"
              : "#22d3ee"
            }
            kh={kh}
          />

          <FarmNode
            cx={WEATHER.x} cy={WEATHER.y}
            color="#a78bfa"
            ring={sensingActive}
            testId="node-weather"
            label={kh ? "ទិន្នន័យអាកាសធាតុ" : "Weather API"}
            sub={
              phase === "idle"
                ? (kh ? "មិនទាន់ពិនិត្យ" : "Standby")
                : rain === "rain"
                  ? (kh ? "ភ្លៀងនឹងធ្លាក់" : "Rain coming")
                  : (kh ? "ថ្ងៃច្រាល" : "Clear sky")
            }
            statusColor={
              phase === "idle" ? "#94a3b8"
              : rain === "rain" ? "#60a5fa"
              : "#fcd34d"
            }
            kh={kh}
          />

          <FarmNode
            cx={PUMP.x} cy={PUMP.y}
            color={pumpOn ? "#10b981" : "#64748b"}
            ring={decidingActive && phase === "deciding"}
            testId="node-pump"
            label={kh ? "ម៉ាស៊ីនបូមទឹកឆ្លាតវៃ" : "Smart Pump"}
            sub={
              phase === "idle"          ? (kh ? "បិទ" : "Off")
              : phase === "sensing"     ? (kh ? "កំពុងស្តាប់…" : "Listening…")
              : phase === "deciding"    ? (kh ? "កំពុងសម្រេចចិត្ត…" : "Deciding…")
              : pumpOn                  ? (kh ? "បើកដោយខ្លួនឯង" : "Pump ON")
                                        : (kh ? "នៅបិទ" : "Pump OFF")
            }
            statusColor={pumpOn ? "#10b981" : "#94a3b8"}
            kh={kh}
            extraIcon={pumpOn ? "drop" : undefined}
          />
        </svg>

        {/* Result banner overlays the canvas so the explanation reads near the action.
            aria-live so screen readers announce the outcome without scrolling. */}
        {phase === "result" && (
          <div
            data-testid="farm-result"
            role="status"
            aria-live="polite"
            className={`absolute left-3 right-3 sm:left-4 sm:right-4 bottom-3 sm:bottom-4 rounded-lg px-3.5 py-2.5 text-sm shadow-lg backdrop-blur-sm border ${
              pumpOn
                ? "bg-emerald-500/90 border-emerald-300 text-emerald-950"
                : "bg-slate-900/85 border-slate-600 text-slate-100"
            } ${kh ? "font-khmer leading-loose" : ""}`}
          >
            {pumpOn ? (
              <>
                <strong>{t("Pump turned ON automatically.", "ម៉ាស៊ីនបូមទឹកបានបើកដោយស្វ័យប្រវត្តិ។")}</strong>{" "}
                {t(
                  "Soil is dry AND no rain is coming, so the pump waters the field — without the farmer touching anything.",
                  "ដីស្ងួត ហើយគ្មានភ្លៀងទេ ដូច្នេះម៉ាស៊ីនបូមទឹកស្រោចស្រពចំការ — ដោយកសិករមិនបាច់ប៉ះអ្វីសោះ។",
                )}
              </>
            ) : (
              <>
                <strong>{t("Pump stayed OFF.", "ម៉ាស៊ីនបូមទឹកនៅបិទ។")}</strong>{" "}
                {soil === "wet" && rain === "clear" && t(
                  "The soil is already wet — no need to water and waste electricity.",
                  "ដីសើមហើយ — មិនបាច់ស្រោច និងខ្ជះខ្ជាយអគ្គិសនី។",
                )}
                {soil === "dry" && rain === "rain" && t(
                  "Even though the soil is dry, rain is coming. The pump waits and saves water.",
                  "ទោះបីដីស្ងួតក៏ដោយ ភ្លៀងនឹងធ្លាក់។ ម៉ាស៊ីនរង់ចាំ និងសន្សំទឹក។",
                )}
                {soil === "wet" && rain === "rain" && t(
                  "Wet soil and rain on the way — definitely no pumping today.",
                  "ដីសើម ហើយភ្លៀងនឹងធ្លាក់ — ប្រាកដជាមិនបូមថ្ងៃនេះ។",
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Big pull-quote — the lesson */}
      <p className={`mt-4 text-center text-base sm:text-lg italic text-emerald-200 ${kh ? "font-khmer leading-loose not-italic" : ""}`}>
        {t(
          "“The machines talk to each other so the farmer can rest!”",
          "«ម៉ាស៊ីននិយាយគ្នាដោយខ្លួនឯង ដូច្នេះកសិករអាចសម្រាកបាន!»",
        )}
      </p>

      {/* Truth table mini-legend — the underlying logic, plainly */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] sm:text-xs">
        <LegendCell kh={kh} dry rainComing={false} on  />
        <LegendCell kh={kh} dry={false} rainComing={false} />
        <LegendCell kh={kh} dry rainComing />
        <LegendCell kh={kh} dry={false} rainComing />
      </div>
    </div>
  );
}

function FarmNode({
  cx, cy, color, ring, label, sub, statusColor, kh, testId, extraIcon,
}: {
  cx: number; cy: number; color: string;
  ring: boolean; label: string; sub: string; statusColor: string;
  kh: boolean; testId: string; extraIcon?: "drop";
}) {
  return (
    <g data-testid={testId}>
      {ring && (
        <circle cx={cx} cy={cy} r={42} fill="none" stroke={color} strokeWidth="2" className="iot-pulse" />
      )}
      <circle cx={cx} cy={cy} r={32} fill="#0f172a" stroke={color} strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r={26} fill={`${color}22`} />
      {/* Label box (foreignObject lets us use real Khmer/English text) */}
      <foreignObject x={cx - 70} y={cy + 38} width={140} height={56}>
        <div className={`text-center text-white ${kh ? "font-khmer" : ""}`}>
          <div className="text-[11px] font-bold leading-tight">{label}</div>
          <div className="text-[10px] mt-0.5" style={{ color: statusColor }}>● {sub}</div>
        </div>
      </foreignObject>
      {extraIcon === "drop" && (
        <g transform={`translate(${cx - 8}, ${cy - 8})`}>
          <Droplets x={0} y={0} width={16} height={16} stroke="#10b981" />
        </g>
      )}
    </g>
  );
}

function FlowPacket({
  from, to, color, delay,
}: { from: { x: number; y: number }; to: { x: number; y: number }; color: string; delay: number }) {
  const path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  return (
    <circle
      r="5"
      fill={color}
      style={{
        offsetPath: `path("${path}")`,
        WebkitOffsetPath: `path("${path}")`,
        animation: `iotPacket 1.2s ease-in ${delay}s infinite`,
        filter: `drop-shadow(0 0 6px ${color})`,
      } as React.CSSProperties}
    />
  );
}

function LegendCell({
  dry, rainComing, on, kh,
}: { dry: boolean; rainComing: boolean; on?: boolean; kh: boolean }) {
  const t = useTranslation();
  return (
    <div className={`rounded-md border px-2 py-2 ${
      on ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-100"
         : "border-slate-700 bg-slate-900/60 text-slate-300"
    }`}>
      <div className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider opacity-80 ${kh ? "font-khmer normal-case tracking-normal" : ""}`}>
        {dry ? <Sprout className="w-3 h-3" /> : <Droplets className="w-3 h-3" />}
        <span>{dry ? t("Dry", "ស្ងួត") : t("Wet", "សើម")}</span>
        <span className="opacity-50">+</span>
        {rainComing ? <CloudRain className="w-3 h-3" /> : <CloudSun className="w-3 h-3" />}
        <span>{rainComing ? t("Rain", "ភ្លៀង") : t("Clear", "ច្រាល")}</span>
      </div>
      <div className={`mt-1 font-bold text-xs ${kh ? "font-khmer" : ""}`}>
        {on
          ? t("→ Pump ON", "→ បូមទឹក")
          : t("→ Pump OFF", "→ មិនបូម")}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * 2) 5G REFLEX GAME
 * ──────────────────────────────────────────────────────────────────────────── */

type CarPhase = "ready" | "running" | "stopped" | "crashed";

const TRACK_LEN_PX     = 100; // we use percentages; this is the visual length scale
const OBSTACLE_AT_PCT  = 86;  // where the obstacle sits (%)
const CAR_WIDTH_PCT    = 8;   // car visual width (%) — used to detect collision
// Realistic-ish "nose hits obstacle" threshold:
const COLLISION_AT_PCT = OBSTACLE_AT_PCT - CAR_WIDTH_PCT; // 78

// Latency (ms): the time between "STOP pressed" and the car actually starting to brake.
const LATENCY_4G_MS = 1100; // user-perceptible long delay
const LATENCY_5G_MS = 60;   // effectively instant

// Car movement: simple linear in % per second. Brake is instant once latency elapses.
const SPEED_PCT_PER_S = 35;

function FiveGReflexGame({ kh }: { kh: boolean }) {
  const t = useTranslation();

  const [phase, setPhase] = useState<CarPhase>("ready");
  // Car positions in % (from left). Start a bit apart so users can see both clearly.
  const [posA, setPosA] = useState(5);
  const [posB, setPosB] = useState(5);
  // Did each car start braking yet? (set true after their network latency elapses)
  const brakingARef = useRef(false);
  const brakingBRef = useRef(false);
  // Final outcomes once stopped/crashed
  const [outcomeA, setOutcomeA] = useState<"safe" | "crash" | null>(null);
  const [outcomeB, setOutcomeB] = useState<"safe" | "crash" | null>(null);

  // Drive the simulation with rAF. Restart when phase switches to "running".
  const rafRef    = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const stopTsRef = useRef<number | null>(null); // ms timestamp when STOP was pressed
  // Outstanding brake/forced-stop timers — cancelled on reset/new run/unmount
  // so a previous run can't end a brand-new one prematurely.
  const stopTimersRef = useRef<number[]>([]);
  function clearStopTimers() {
    for (const id of stopTimersRef.current) window.clearTimeout(id);
    stopTimersRef.current = [];
  }
  useEffect(() => () => clearStopTimers(), []);

  useEffect(() => {
    if (phase !== "running") {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    function tick(ts: number) {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      setPosA((prev) => brakingARef.current ? prev : prev + SPEED_PCT_PER_S * dt);
      setPosB((prev) => brakingBRef.current ? prev : prev + SPEED_PCT_PER_S * dt);

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  // When both cars have either stopped (braking + still safe) or crashed, end.
  useEffect(() => {
    if (phase !== "running") return;
    // Crash detection
    if (!outcomeA && posA >= COLLISION_AT_PCT) {
      setOutcomeA("crash");
      brakingARef.current = true;
      setPosA(COLLISION_AT_PCT);
    }
    if (!outcomeB && posB >= COLLISION_AT_PCT) {
      setOutcomeB("crash");
      brakingBRef.current = true;
      setPosB(COLLISION_AT_PCT);
    }
    if (outcomeA && outcomeB) setPhase("stopped");
  }, [posA, posB, phase, outcomeA, outcomeB]);

  function go() {
    if (phase === "running") return;
    clearStopTimers();
    setPosA(5); setPosB(5);
    brakingARef.current = false;
    brakingBRef.current = false;
    setOutcomeA(null); setOutcomeB(null);
    stopTsRef.current = null;
    setPhase("running");
  }

  function pressStop() {
    if (phase !== "running" || stopTsRef.current !== null) return;
    stopTsRef.current = performance.now();

    // 5G car reacts almost immediately
    stopTimersRef.current.push(window.setTimeout(() => {
      brakingBRef.current = true;
      setOutcomeB((prev) => prev ?? "safe");
    }, LATENCY_5G_MS));

    // 4G car reacts later — by then it has rolled further.
    stopTimersRef.current.push(window.setTimeout(() => {
      brakingARef.current = true;
      // Real outcome (safe vs crash) is settled by the collision detection
      // effect — this fallback only covers the rare case where the car
      // somehow brakes before collision detection runs.
      setOutcomeA((prev) => prev ?? "safe");
    }, LATENCY_4G_MS));

    // Force end after a generous timeout in case both somehow brake before
    // collision detection wraps things up.
    stopTimersRef.current.push(
      window.setTimeout(() => setPhase((p) => (p === "running" ? "stopped" : p)), LATENCY_4G_MS + 600),
    );
  }

  function reset() {
    clearStopTimers();
    setPhase("ready");
    setPosA(5); setPosB(5);
    setOutcomeA(null); setOutcomeB(null);
    brakingARef.current = false;
    brakingBRef.current = false;
    stopTsRef.current = null;
  }

  return (
    <div className="rounded-2xl border-2 border-cyan-500/30 bg-slate-950/70 p-5 sm:p-6 shadow-xl">
      <header className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-fuchsia-300/90 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
            {t("Mini-game · Network latency", "ល្បែង · ការពន្យារពេលបណ្តាញ")}
          </div>
          <h3 className={`mt-1 text-xl sm:text-2xl font-bold text-white ${kh ? "font-khmer" : "font-display"}`}>
            {t("The 5G Reflex Test", "ការសាកល្បងប្រតិកម្ម 5G")}
          </h3>
          <p className={`mt-1 text-sm text-slate-300 max-w-xl ${kh ? "font-khmer leading-loose" : ""}`}>
            {t(
              "Two self-driving cars race toward an obstacle. One is on a slow 4G link; one is on 5G. Press STOP — see which car hears you first.",
              "រថយន្តគ្មានអ្នកបើកពីរ កំពុងធ្វើដំណើរទៅរកវត្ថុរារាំង។ មួយគ្រឿងភ្ជាប់នឹង 4G យឺត; មួយទៀតភ្ជាប់នឹង 5G។ ចុច STOP — មើលថារថយន្តណាមួយឮអ្នកមុនគេ។",
            )}
          </p>
        </div>
        <div className="flex gap-2">
          {phase === "ready" && (
            <button
              type="button"
              onClick={go}
              data-testid="button-go"
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-cyan-950 transition-colors ${kh ? "font-khmer" : ""}`}
            >
              <Play className="w-4 h-4" />
              {t("Drive!", "ចាប់ផ្តើមបើក!")}
            </button>
          )}
          {phase === "running" && (
            <button
              type="button"
              onClick={pressStop}
              disabled={stopTsRef.current !== null}
              data-testid="button-stop"
              className={`inline-flex items-center gap-1.5 rounded-xl px-5 py-2 text-sm font-bold transition-colors ${
                stopTsRef.current !== null
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-400 text-white animate-pulse"
              } ${kh ? "font-khmer" : ""}`}
            >
              <Hand className="w-4 h-4" />
              {t("STOP!", "ឈប់!")}
            </button>
          )}
          {phase === "stopped" && (
            <button
              type="button"
              onClick={reset}
              data-testid="button-reset-5g"
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold bg-slate-700 hover:bg-slate-600 text-white transition-colors ${kh ? "font-khmer" : ""}`}
            >
              <RefreshCw className="w-4 h-4" />
              {t("Try again", "ព្យាយាមម្ដងទៀត")}
            </button>
          )}
        </div>
      </header>

      <div className="space-y-3">
        <Lane
          label={kh ? "រថយន្ត A — 4G (ពន្យារពេលច្រើន)" : "Car A — 4G (high latency)"}
          subLabel={kh ? "ការពន្យារ ~១,១០០ មិល្លីវិនាទី" : "~1,100 ms delay"}
          accent="#ef4444"
          icon={Signal}
          pos={posA}
          braking={brakingARef.current}
          outcome={outcomeA}
          phase={phase}
          kh={kh}
          testId="lane-4g"
        />
        <Lane
          label={kh ? "រថយន្ត B — 5G (គ្មានការពន្យារ)" : "Car B — 5G (low latency)"}
          subLabel={kh ? "ការពន្យារ ~៦០ មិល្លីវិនាទី" : "~60 ms delay"}
          accent="#10b981"
          icon={SignalHigh}
          pos={posB}
          braking={brakingBRef.current}
          outcome={outcomeB}
          phase={phase}
          kh={kh}
          testId="lane-5g"
        />
      </div>

      {/* Result + lesson */}
      {phase === "stopped" && (
        <div
          data-testid="reflex-result"
          role="status"
          aria-live="polite"
          className={`mt-4 rounded-xl border p-4 ${
            outcomeB === "safe" && outcomeA === "crash"
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-100"
              : "border-slate-700 bg-slate-900/60 text-slate-200"
          } ${kh ? "font-khmer leading-loose" : ""}`}
        >
          <div className="font-bold text-sm">
            {outcomeB === "safe" && outcomeA === "crash"
              ? t("Car B (5G) stopped safely. Car A (4G) couldn't react in time.",
                  "រថយន្ត B (5G) ឈប់បានដោយសុវត្ថិភាព។ រថយន្ត A (4G) មិនអាចប្រតិកម្មទាន់ពេលទេ។")
              : t("Both cars finished — try pressing STOP a little later to see the gap clearly.",
                  "រថយន្តទាំងពីរបានបញ្ចប់ — សូមព្យាយាមចុច STOP បន្តិចក្រោយ ដើម្បីឃើញគម្លាតច្បាស់ៗ។")}
          </div>
          <p className="mt-2 text-sm">
            {t(
              "5G isn't only about downloading movies faster — its very low latency is one important ingredient that helps machines react quickly when split-second timing matters.",
              "5G មិនមែនគ្រាន់តែទាញយកវីដេអូលឿនជាងទេ — ការពន្យារពេលទាបបំផុតរបស់វា គឺជាគ្រឿងផ្សំសំខាន់មួយ ដែលជួយឲ្យម៉ាស៊ីនប្រតិកម្មបានឆាប់រហ័ស ពេលដែលពេលវេលាខ្លីៗមានសារៈសំខាន់។",
            )}
          </p>
        </div>
      )}
    </div>
  );
}

function Lane({
  label, subLabel, accent, icon: Icon, pos, braking, outcome, phase, kh, testId,
}: {
  label: string;
  subLabel: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  pos: number;
  braking: boolean;
  outcome: "safe" | "crash" | null;
  phase: CarPhase;
  kh: boolean;
  testId: string;
}) {
  const t = useTranslation();
  const moving = phase === "running" && !braking;
  return (
    <div data-testid={testId}>
      <div className="flex items-center justify-between text-xs mb-1">
        <div className="flex items-center gap-1.5 text-white">
          <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
          <span className={`font-bold ${kh ? "font-khmer" : ""}`}>{label}</span>
          <span className={`opacity-60 ${kh ? "font-khmer" : ""}`}>· {subLabel}</span>
        </div>
        <div className={`text-[11px] font-bold ${kh ? "font-khmer" : ""}`}>
          {outcome === "safe"  && <span className="text-emerald-300">{t("STOPPED SAFELY", "ឈប់ដោយសុវត្ថិភាព")}</span>}
          {outcome === "crash" && <span className="text-red-300">{t("CRASHED", "បុក")}</span>}
          {outcome === null && phase === "running" &&
            <span className="text-slate-300">{moving ? t("driving…", "កំពុងបើក…") : t("braking…", "កំពុងហ្វ្រាំង…")}</span>}
        </div>
      </div>

      <div
        className="relative h-14 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden"
        // The road has a subtle dashed centre line for vibe.
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 12px, transparent 12px 28px)",
          backgroundSize: "100% 2px",
          backgroundPosition: "0 50%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Obstacle */}
        <div
          className="absolute top-1 bottom-1 flex items-center justify-center"
          style={{ left: `${OBSTACLE_AT_PCT}%`, width: "8%" }}
        >
          <div className="w-full h-full rounded bg-amber-500/30 border-2 border-amber-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-300" />
          </div>
        </div>

        {/* Car */}
        <div
          className="absolute top-1.5 transition-transform"
          style={{
            left: 0,
            transform: `translateX(${pos}%)`,
            width: "8%",
            transition: braking || phase === "ready" ? "none" : "transform 80ms linear",
          }}
        >
          <div
            className="w-full h-11 rounded-md flex items-center justify-center shadow-lg"
            style={{
              backgroundColor: accent,
              boxShadow: outcome === "crash"
                ? `0 0 0 3px #fff, 0 0 20px ${accent}`
                : `0 0 12px ${accent}99`,
            }}
          >
            <CarFront className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * 3) EVERYDAY IoT GRID
 * ──────────────────────────────────────────────────────────────────────────── */

function EverydayIoTGrid({ kh }: { kh: boolean }) {
  const t = useTranslation();

  const items = [
    {
      id: "watch",
      icon: Watch,
      pulseIcon: Heart,
      pulseColor: "#ef4444",
      titleEn: "Smart Watches",
      titleKh: "នាឡិកាឆ្លាតវៃ",
      bodyEn: "Track your heart rate every few seconds. They can warn the wearer about an irregular rhythm long before symptoms appear.",
      bodyKh: "តាមដានចង្វាក់បេះដូងរបស់អ្នករៀងរាល់វិនាទី។ វាអាចព្រមានអ្នកប្រើពីចង្វាក់មិនធម្មតា មុនពេលអាការៈលេចចេញ។",
    },
    {
      id: "bulb",
      icon: Lightbulb,
      pulseIcon: Zap,
      pulseColor: "#facc15",
      titleEn: "Smart Bulbs",
      titleKh: "អំពូលឆ្លាតវៃ",
      bodyEn: "Turn off automatically when no one is in the room. Across a school or village, that easily saves 30–40% on the electricity bill.",
      bodyKh: "បិទដោយស្វ័យប្រវត្តិពេលគ្មានមនុស្សនៅក្នុងបន្ទប់។ នៅទូទាំងសាលា ឬភូមិ វាសន្សំបាន ៣០–៤០% នៃវិក្កយបត្រអគ្គិសនី។",
    },
    {
      id: "gps",
      icon: MapPin,
      pulseIcon: Wifi,
      pulseColor: "#22d3ee",
      titleEn: "Motorbike GPS Trackers",
      titleKh: "ឧបករណ៍តាមដាន GPS ម៉ូតូ",
      bodyEn: "If the moto is moved or stolen, a small device sends its real-time location to the owner's phone — common in Cambodian cities now.",
      bodyKh: "បើម៉ូតូត្រូវផ្លាស់ទី ឬចោរលួច ឧបករណ៍តូចមួយផ្ញើទីតាំងពេលជាក់ស្តែងទៅទូរស័ព្ទម្ចាស់ — ជាទូទៅនៅទីក្រុងកម្ពុជាសព្វថ្ងៃ។",
    },
  ];

  return (
    <div className="rounded-2xl border-2 border-cyan-500/30 bg-slate-950/70 p-5 sm:p-6 shadow-xl">
      <header className="mb-4">
        <div className={`text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-300/90 ${kh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
          {t("Already in your pocket", "មាននៅក្នុងហោប៉ៅអ្នករួចហើយ")}
        </div>
        <h3 className={`mt-1 text-xl sm:text-2xl font-bold text-white ${kh ? "font-khmer" : "font-display"}`}>
          {t("Everyday IoT Devices", "ឧបករណ៍ IoT ប្រចាំថ្ងៃ")}
        </h3>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {items.map((it) => (
          <article
            key={it.id}
            data-testid={`iot-card-${it.id}`}
            className="group relative rounded-xl border border-cyan-500/30 bg-slate-900/70 p-4 hover:border-cyan-400/60 hover:bg-slate-900 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center">
                <it.icon className="w-5 h-5" />
              </div>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center iot-pulse"
                style={{ backgroundColor: `${it.pulseColor}22`, color: it.pulseColor }}
                aria-hidden
                title="connected"
              >
                <it.pulseIcon className="w-3.5 h-3.5" />
              </div>
            </div>
            <h4 className={`font-bold text-white text-base ${kh ? "font-khmer" : ""}`}>
              {kh ? it.titleKh : it.titleEn}
            </h4>
            <p className={`mt-1.5 text-[13px] leading-relaxed text-slate-300 ${kh ? "font-khmer leading-loose" : ""}`}>
              {kh ? it.bodyKh : it.bodyEn}
            </p>
          </article>
        ))}
      </div>

      <p className={`mt-4 text-center text-sm text-cyan-200/80 ${kh ? "font-khmer leading-loose" : ""}`}>
        {t(
          "Every one of these devices is really just a small computer with a sensor and a wireless chip — Wi-Fi, 4G/5G, Bluetooth, or others — quietly sending tiny messages all day.",
          "ឧបករណ៍នីមួយៗគឺពិតជាគ្រាន់តែជាកុំព្យូទ័រតូចមួយ ដែលមានសេនស័រ និងឈីបឥតខ្សែ — Wi-Fi, 4G/5G, Bluetooth ឬផ្សេងទៀត — ផ្ញើសារតូចៗស្ងៀមៗពេញមួយថ្ងៃ។",
        )}
      </p>
    </div>
  );
}

export default IoT5GModule;
