import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, Wind, Lock, Unlock, ShieldAlert, Activity, RefreshCw } from "lucide-react";
import { InlineMath, BlockMath } from "react-katex";
import { useLanguageStore, useTranslation } from "@/store/use-language";

// ── Types & Constants ────────────────────────────────────────────────────────
interface FormulaCard {
  titleEn: string;
  titleKh: string;
  math: string;
  descEn: string;
  descKh: string;
  lockType?: "T" | "P" | "V";
}

const FORMULAS: FormulaCard[] = [
  {
    titleEn: "Boyle's Law",
    titleKh: "ច្បាប់បូយម៉ារីយ៉ុត (Boyle's Law)",
    math: "P_1V_1 = P_2V_2",
    descEn: "At constant temperature (T), volume is inversely proportional to pressure.",
    descKh: "នៅសីតុណ្ហភាពថេរ (T) មាឌរបស់ឧស្ម័នសមាមាត្រច្រាសទៅនឹងសម្ពាធ។",
    lockType: "T"
  },
  {
    titleEn: "Charles's Law",
    titleKh: "ច្បាប់សាល (Charles's Law)",
    math: "\\frac{V_1}{T_1} = \\frac{V_2}{T_2}",
    descEn: "At constant pressure (P), volume is directly proportional to absolute temperature.",
    descKh: "នៅសម្ពាធថេរ (P) មាឌរបស់ឧស្ម័នសមាមាត្រផ្ទាល់ទៅនឹងសីតុណ្ហភាពដាច់ខាត។",
    lockType: "P"
  },
  {
    titleEn: "Gay-Lussac's Law",
    titleKh: "ច្បាប់កេលូសាក់ (Gay-Lussac's Law)",
    math: "\\frac{P_1}{T_1} = \\frac{P_2}{T_2}",
    descEn: "At constant volume (V), pressure is directly proportional to absolute temperature.",
    descKh: "នៅមាឌថេរ (V) សម្ពាធរបស់ឧស្ម័នសមាមាត្រផ្ទាល់ទៅនឹងសីតុណ្ហភាពដាច់ខាត។",
    lockType: "V"
  },
  {
    titleEn: "Avogadro's Law",
    titleKh: "ច្បាប់អាវ៉ូកាដ្រូ (Avogadro's Law)",
    math: "\\frac{V_1}{n_1} = \\frac{V_2}{n_2}",
    descEn: "At constant temperature and pressure, volume is directly proportional to moles of gas.",
    descKh: "នៅសីតុណ្ហភាព និងសម្ពាធថេរ មាឌរបស់ឧស្ម័នសមាមាត្រផ្ទាល់ទៅនឹងចំនួនម៉ូល។",
  },
  {
    titleEn: "Combined Gas Law",
    titleKh: "ច្បាប់ឧស្ម័នចម្រុះ (Combined Gas Law)",
    math: "\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}",
    descEn: "Combines Boyle's, Charles's, and Gay-Lussac's laws for a fixed mass of gas.",
    descKh: "រួមបញ្ចូលគ្នានូវច្បាប់បូយម៉ារីយ៉ុត ច្បាប់សាល និងច្បាប់កេលូសាក់ សម្រាប់ម៉ាស់ឧស្ម័នថេរ។",
  },
  {
    titleEn: "Ideal Gas Law",
    titleKh: "ច្បាប់ឧស្ម័នល្អ (Ideal Gas Law)",
    math: "PV = nRT",
    descEn: "Relates Pressure (P), Volume (V), Moles (n), Constant (R), and Absolute Temp (T).",
    descKh: "បង្ហាញទំនាក់ទំនងរវាងសម្ពាធ (P) មាឌ (V) ចំនួនម៉ូល (n) ថេរឧស្ម័ន (R) និងសីតុណ្ហភាព (T)។",
  },
  {
    titleEn: "Dalton's Partial Pressures",
    titleKh: "ច្បាប់ដាល់តុន (Dalton's Partial Pressures)",
    math: "P_{\\text{total}} = \\sum P_i = P_1 + P_2 + P_3 + \\dots",
    descEn: "The total pressure of a gas mixture is the sum of the partial pressures of individual gases.",
    descKh: "សម្ពាធសរុបនៃល្បាយឧស្ម័ន ស្មើនឹងផលបូកសម្ពាធដោយផ្នែកនៃឧស្ម័ននីមួយៗក្នុងល្បាយ។",
  },
  {
    titleEn: "Root Mean Square Speed",
    titleKh: "ល្បឿនមធ្យមគ្រឹះ (Root Mean Square Speed)",
    math: "u_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}",
    descEn: "Measures average velocity of gas molecules as a function of temperature and molar mass.",
    descKh: "វាស់វែងល្បឿនមធ្យមនៃម៉ូលេគុលឧស្ម័ន ជាអនុគមន៍នៃសីតុណ្ហភាព និងម៉ាស់ម៉ូល។",
  },
  {
    titleEn: "Graham's Diffusion Law",
    titleKh: "ច្បាប់សាយភាយក្រាហាម (Graham's Law)",
    math: "\\frac{r_1}{r_2} = \\sqrt{\\frac{M_2}{M_1}}",
    descEn: "The rate of effusion/diffusion is inversely proportional to the square root of molar mass.",
    descKh: "ល្បឿនសាយភាយរបស់ឧស្ម័ន សមាមាត្រច្រាសទៅនឹងឫសការ៉េនៃម៉ាស់ម៉ូលរបស់វា។",
  }
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function GasLawsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // ── State variables ────────────────────────────────────────────────────────
  const [temp, setTemp] = useState<number>(300);     // 100K -> 600K
  const [vol, setVol] = useState<number>(5.0);       // 2.0L -> 10.0L
  const [press, setPress] = useState<number>(2.4);    // 0.5atm -> 12.0atm
  const [locked, setLocked] = useState<"T" | "P" | "V">("T");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // ── Physics constants ──────────────────────────────────────────────────────
  // Ideal Gas Law: P * V = n * R * T. Set n * R = 0.04.
  const NR = 0.04;

  // Initialize particles once
  useEffect(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < 28; i++) {
      // Pick random initial velocities
      const angle = Math.random() * Math.PI * 2;
      particles.push({
        x: 40 + Math.random() * 210,
        y: 100 + Math.random() * 150,
        vx: Math.cos(angle) * 1.5,
        vy: Math.sin(angle) * 1.5,
      });
    }
    particlesRef.current = particles;
  }, []);

  // ── Particle simulation loop ───────────────────────────────────────────────
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Molecular speed increases with temperature
    // Base speed scales with square root of absolute temperature
    const speedMultiplier = Math.sqrt(temp) * 0.16 + 0.3;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Box metrics
      const boxWidth = 240;
      const leftBound = 30;
      const rightBound = leftBound + boxWidth;
      const bottomBound = 295;

      // Piston height dynamically updates based on volume
      // V=2.0L => pistonY=250px (small volume)
      // V=10.0L => pistonY=50px (large volume)
      const pistonY = 300 - vol * 25;

      // Update & render particles inside the chamber bounds
      particlesRef.current.forEach((p) => {
        // Apply velocity scaled by temperature speedMultiplier
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Collision: Left Wall
        if (p.x < leftBound + 6) {
          p.x = leftBound + 6;
          p.vx = -p.vx;
        }
        // Collision: Right Wall
        if (p.x > rightBound - 6) {
          p.x = rightBound - 6;
          p.vx = -p.vx;
        }
        // Collision: Bottom Wall
        if (p.y > bottomBound - 6) {
          p.y = bottomBound - 6;
          p.vy = -p.vy;
        }
        // Collision: Piston Wall
        if (p.y < pistonY + 12) {
          p.y = pistonY + 12;
          p.vy = Math.abs(p.vy); // bounce downward
        }

        // Draw particle (glowing molecule sphere)
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        // Color becomes hotter (redder) as temperature rises
        const red = Math.floor(50 + (temp / 600) * 205);
        const blue = Math.floor(255 - (temp / 600) * 200);
        ctx.fillStyle = `rgb(${red}, 100, ${blue})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${red}, 100, ${blue}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // ── Draw Chamber Outline ──
      ctx.strokeStyle = "#475569"; // slate-600
      ctx.lineWidth = 6;
      ctx.lineCap = "round";

      // Left Wall, Bottom, Right Wall
      ctx.beginPath();
      ctx.moveTo(leftBound, 30);
      ctx.lineTo(leftBound, bottomBound);
      ctx.lineTo(rightBound, bottomBound);
      ctx.lineTo(rightBound, 30);
      ctx.stroke();

      // ── Draw Movable Piston ──
      // Piston horizontal block
      ctx.fillStyle = "#1e293b"; // slate-800
      ctx.fillRect(leftBound + 2, pistonY, boxWidth - 4, 12);
      ctx.strokeStyle = "#94a3b8"; // slate-400
      ctx.lineWidth = 3;
      ctx.strokeRect(leftBound + 2, pistonY, boxWidth - 4, 12);

      // Piston central shaft rod extending upward
      ctx.fillStyle = "#64748b"; // slate-500
      ctx.fillRect(146, pistonY - 45, 8, 45);
      // Piston handle at top
      ctx.fillStyle = "#334155"; // slate-700
      ctx.fillRect(130, pistonY - 50, 40, 5);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [temp, vol]);

  // ── Physics Sliders Update Handlers ────────────────────────────────────────
  const handleTempChange = (newTemp: number) => {
    setTemp(newTemp);
    if (locked === "P") {
      // Charles's Law: V = (nR * T) / P
      const newVol = (NR * newTemp) / press;
      setVol(Math.max(2.0, Math.min(10.0, Number(newVol.toFixed(2)))));
    } else if (locked === "V") {
      // Gay-Lussac's Law: P = (nR * T) / V
      const newPress = (NR * newTemp) / vol;
      setPress(Math.max(0.5, Math.min(12.0, Number(newPress.toFixed(2)))));
    }
  };

  const handleVolChange = (newVol: number) => {
    setVol(newVol);
    if (locked === "T") {
      // Boyle's Law: P = (nR * T) / V
      const newPress = (NR * temp) / newVol;
      setPress(Math.max(0.5, Math.min(12.0, Number(newPress.toFixed(2)))));
    } else if (locked === "P") {
      // Charles's Law: T = (P * V) / nR
      const newTemp = (press * newVol) / NR;
      setTemp(Math.max(100, Math.min(600, Number(newTemp.toFixed(0)))));
    }
  };

  const handlePressChange = (newPress: number) => {
    setPress(newPress);
    if (locked === "T") {
      // Boyle's Law: V = (nR * T) / P
      const newVol = (NR * temp) / newPress;
      setVol(Math.max(2.0, Math.min(10.0, Number(newVol.toFixed(2)))));
    } else if (locked === "V") {
      // Gay-Lussac's Law: T = (P * V) / nR
      const newTemp = (newPress * vol) / NR;
      setTemp(Math.max(100, Math.min(600, Number(newTemp.toFixed(0)))));
    }
  };

  const handleReset = () => {
    setTemp(300);
    setVol(5.0);
    setPress(2.4);
  };

  // Dial needle angle from -90 deg to 90 deg based on pressure range [0.5, 12.0]
  const pressAngle = -90 + ((press - 0.5) / (12.0 - 0.5)) * 180;

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background space matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/chemistry" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>{t("Back to Chemistry", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមី")}</span>
          </Link>

          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-400 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Gas Laws & Thermodynamics", "ច្បាប់ឧស្ម័ន & ទែម៉ូឌីណាមិច")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block">
            <span>CHEM-THERM-101</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-8">
        
        {/* Upper Visualizer / Interactive Piston Row */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Visualizer Canvas Card (Span 7) */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block">
                  {t("LABORATORY SIMULATOR", "បន្ទប់ពិសោធន៍និម្មិត")}
                </span>
                <h2
                  className={`text-2xl font-black text-white ${isKh ? "font-khmer mt-1" : ""}`}
                  style={{ fontSize: "max(1.4rem, 2.5vw)" }}
                >
                  {t("Gas Cylinder & Movable Piston", "ស៊ីឡាំងឧស្ម័ន និងពីស្តុងចល័ត")}
                </h2>
              </div>
              <button
                onClick={handleReset}
                className="bg-slate-950/80 hover:bg-slate-800 border border-slate-800 p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 text-slate-400 hover:text-white"
                title={t("Reset Simulation", "កំណត់ឡើងវិញ")}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              {/* Cylinder 2D Canvas viewport */}
              <div className="relative w-[300px] h-[320px] bg-slate-950/80 border border-slate-800/50 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                <canvas ref={canvasRef} width={300} height={320} className="w-[300px] h-[320px] block" />
              </div>

              {/* Dynamic Readouts & Indicators Column */}
              <div className="flex flex-col gap-6 w-full max-w-[280px]">
                
                {/* SVG Dial Pressure Gauge */}
                <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl flex flex-col items-center">
                  <span className={`text-[10px] text-slate-500 mb-2 uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                    {t("PRESSURE GAUGE", "នាឡិកាសម្ពាធ")}
                  </span>
                  
                  {/* Gauge dial circle */}
                  <div className="relative w-28 h-16 overflow-hidden">
                    {/* Dial Arc */}
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#gauge-grad)" strokeWidth="8" strokeDasharray="125" strokeDashoffset={125 - ((press - 0.5) / 11.5) * 125} strokeLinecap="round" />
                      <defs>
                        <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="50%" stopColor="#d97706" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Dial needle pointer */}
                    <div
                      className="absolute bottom-0 left-[53px] w-1.5 h-12 bg-rose-500 origin-bottom rounded-full transition-transform duration-150"
                      style={{ transform: `translateX(-50%) rotate(${pressAngle}deg)` }}
                    />
                    {/* Dial center pin */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-700 shadow-md" />
                  </div>
                  {/* Digital value */}
                  <span className="text-xl font-black text-cyan-300 block font-mono mt-1">
                    {press.toFixed(2)} atm
                  </span>
                </div>

                {/* Lock Controls (Radio Buttons) */}
                <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl flex flex-col gap-3">
                  <span className={`text-[10px] text-slate-500 uppercase tracking-wider block ${isKh ? "font-khmer" : ""}`}>
                    {t("SELECT CONSTANT (LOCK)", "ចាក់សោអថេរថេរ (ច្បាប់)")}
                  </span>
                  
                  <div className="flex flex-col gap-2">
                    {/* Lock Temperature */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800/60 cursor-pointer hover:border-cyan-500/40 select-none">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="lockVar"
                          checked={locked === "T"}
                          onChange={() => setLocked("T")}
                          className="w-4 h-4 accent-cyan-500"
                        />
                        <span className={`text-xs font-bold text-slate-200 ${isKh ? "font-khmer" : ""}`}>
                          {t("Lock Temperature (Boyle)", "ចាក់សោសីតុណ្ហភាព (បូយ)")}
                        </span>
                      </div>
                      {locked === "T" ? <Lock className="w-3.5 h-3.5 text-cyan-400" /> : <Unlock className="w-3.5 h-3.5 text-slate-600" />}
                    </label>

                    {/* Lock Pressure */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800/60 cursor-pointer hover:border-cyan-500/40 select-none">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="lockVar"
                          checked={locked === "P"}
                          onChange={() => setLocked("P")}
                          className="w-4 h-4 accent-cyan-500"
                        />
                        <span className={`text-xs font-bold text-slate-200 ${isKh ? "font-khmer" : ""}`}>
                          {t("Lock Pressure (Charles)", "ចាក់សោសម្ពាធ (សាល)")}
                        </span>
                      </div>
                      {locked === "P" ? <Lock className="w-3.5 h-3.5 text-cyan-400" /> : <Unlock className="w-3.5 h-3.5 text-slate-600" />}
                    </label>

                    {/* Lock Volume */}
                    <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800/60 cursor-pointer hover:border-cyan-500/40 select-none">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="lockVar"
                          checked={locked === "V"}
                          onChange={() => setLocked("V")}
                          className="w-4 h-4 accent-cyan-500"
                        />
                        <span className={`text-xs font-bold text-slate-200 ${isKh ? "font-khmer" : ""}`}>
                          {t("Lock Volume (Gay-Lussac)", "ចាក់សោមាឌ (កេលូសាក់)")}
                        </span>
                      </div>
                      {locked === "V" ? <Lock className="w-3.5 h-3.5 text-cyan-400" /> : <Unlock className="w-3.5 h-3.5 text-slate-600" />}
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* Slider Controls Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-800/80 pt-6">
              
              {/* Temperature Slider */}
              <div className={`p-4 rounded-2xl bg-slate-950/60 border ${locked === "T" ? "border-slate-800 opacity-50" : "border-slate-800/80"}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold text-slate-400 ${isKh ? "font-khmer" : ""}`}>
                    {t("Temperature (T)", "សីតុណ្ហភាព (T)")}
                  </span>
                  <span className="text-sm font-black text-rose-400 font-mono">{temp} K</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="600"
                  step="5"
                  value={temp}
                  disabled={locked === "T"}
                  onChange={(e) => handleTempChange(Number(e.target.value))}
                  className="w-full h-2 rounded-lg accent-rose-500 bg-slate-800 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

              {/* Volume Slider */}
              <div className={`p-4 rounded-2xl bg-slate-950/60 border ${locked === "V" ? "border-slate-800 opacity-50" : "border-slate-800/80"}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold text-slate-400 ${isKh ? "font-khmer" : ""}`}>
                    {t("Volume (V)", "មាឌ (V)")}
                  </span>
                  <span className="text-sm font-black text-emerald-400 font-mono">{vol.toFixed(1)} L</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="10.0"
                  step="0.1"
                  value={vol}
                  disabled={locked === "V"}
                  onChange={(e) => handleVolChange(Number(e.target.value))}
                  className="w-full h-2 rounded-lg accent-emerald-500 bg-slate-800 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

              {/* Pressure Slider */}
              <div className={`p-4 rounded-2xl bg-slate-950/60 border ${locked === "P" ? "border-slate-800 opacity-50" : "border-slate-800/80"}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold text-slate-400 ${isKh ? "font-khmer" : ""}`}>
                    {t("Pressure (P)", "សម្ពាធ (P)")}
                  </span>
                  <span className="text-sm font-black text-cyan-400 font-mono">{press.toFixed(2)} atm</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="12.0"
                  step="0.05"
                  value={press}
                  disabled={locked === "P"}
                  onChange={(e) => handlePressChange(Number(e.target.value))}
                  className="w-full h-2 rounded-lg accent-cyan-500 bg-slate-800 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

            </div>
          </div>

          {/* Right Explanation & Gas Constant Card (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Dynamic Educational Readout Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-1">
                  {t("SIMULATED LAW DETAILS", "ព័ត៌មានលម្អិតអំពីច្បាប់")}
                </span>
                <h3
                  className={`text-xl font-black text-white ${isKh ? "font-khmer" : ""}`}
                >
                  {locked === "T" && t("Boyle's Law Simulation", "ការពិសោធន៍ច្បាប់បូយម៉ារីយ៉ុត")}
                  {locked === "P" && t("Charles's Law Simulation", "ការពិសោធន៍ច្បាប់សាល (Charles)")}
                  {locked === "V" && t("Gay-Lussac's Law Simulation", "ការពិសោធន៍ច្បាប់កេលូសាក់")}
                </h3>
              </div>

              {/* Mathematical context formula */}
              <div className="bg-gradient-to-r from-cyan-950/30 to-indigo-950/20 border-l-4 border-cyan-500 p-4 rounded-r-2xl my-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-1">
                    {t("MATHEMATICAL RELATION", "ទំនាក់ទំនងរូបមន្ត")}
                  </span>
                  <div className="text-white text-base sm:text-lg font-bold font-mono">
                    {locked === "T" && <BlockMath math="P \propto \frac{1}{V} \implies P_1V_1 = P_2V_2" />}
                    {locked === "P" && <BlockMath math="V \propto T \implies \frac{V_1}{T_1} = \frac{V_2}{T_2}" />}
                    {locked === "V" && <BlockMath math="P \propto T \implies \frac{P_1}{T_1} = \frac{P_2}{T_2}" />}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 animate-pulse">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              <p
                className={`text-slate-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed text-sm"}`}
                style={{ fontSize: "max(0.95rem, 1.6vw)" }}
              >
                {locked === "T" &&
                  t(
                    "With Temperature locked at a constant value, notice that decreasing the volume pushes the piston down, forcing gas molecules to collide with the chamber walls more frequently, resulting in an increased pressure reading.",
                    "នៅពេលសីតុណ្ហភាពត្រូវបានចាក់សោថេរ ការបន្ថយមាឌដោយរុញពីស្តុងចុះក្រោម នឹងបង្ខំឱ្យម៉ូលេគុលឧស្ម័នប៉ះទង្គិចគ្នា និងប៉ះនឹងជញ្ជាំងស៊ីឡាំងកាន់តែញឹកញាប់ ដែលបណ្តាលឱ្យសម្ពាធកើនឡើងយ៉ាងច្បាស់។"
                  )}
                {locked === "P" &&
                  t(
                    "With Pressure locked, raising the temperature adds thermal kinetic energy, causing molecules to move faster. To maintain constant pressure inside, the gas must expand, pushing the piston up and increasing the volume.",
                    "នៅពេលសម្ពាធត្រូវបានចាក់សោថេរ ការបង្កើនសីតុណ្ហភាពបន្ថែមថាមពលស៊ីនេទិចកម្ដៅ ធ្វើឱ្យម៉ូលេគុលផ្លាស់ទីលឿនជាងមុន។ ដើម្បីរក្សាសម្ពាធឱ្យនៅដដែល មាឌឧស្ម័នត្រូវតែកើនឡើងដោយរុញពីស្តុងឡើងលើ។"
                  )}
                {locked === "V" &&
                  t(
                    "With Volume locked (piston held completely static), heating the gas forces molecules to move faster and hit walls with greater speed. Because the space cannot expand, the pressure inside the cylinder spikes directly.",
                    "នៅពេលមាឌត្រូវបានចាក់សោថេរ (ពីស្តុងមិនអាចកម្រើកបាន) ការកំដៅឧស្ម័នបង្ខំឱ្យម៉ូលេគុលផ្លាស់ទីកាន់តែលឿន និងបុកជញ្ជាំងស៊ីឡាំងខ្លាំងជាងមុន។ ដោយសារទំហំស៊ីឡាំងមិនអាចប្រែប្រួល សម្ពាធខាងក្នុងកើនឡើងសមាមាត្រផ្ទាល់។"
                  )}
              </p>
            </div>

            {/* Universal Gas Constant (R) Card */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 font-mono tracking-widest uppercase block mb-1">
                  {t("PHYSICAL CONSTANT", "ថេររូបវិទ្យា")}
                </span>
                <h3
                  className={`text-xl font-black text-white ${isKh ? "font-khmer" : ""}`}
                >
                  {t("Universal Gas Constant (R)", "ថេរឧស្ម័នសកល (R)")}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 font-mono text-xs border-t border-slate-800/80 pt-4">
                <div className="bg-slate-950/50 border border-slate-800/60 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">{t("Litre-Atmospheres", "លីត្រ-បរិយាកាស")}</span>
                  <span className="text-white font-bold text-sm block mt-0.5">0.0821 L·atm/(mol·K)</span>
                </div>
                <div className="bg-slate-950/50 border border-slate-800/60 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">{t("SI Metric Units", "ប្រព័ន្ធខ្នាត SI")}</span>
                  <span className="text-amber-400 font-bold text-sm block mt-0.5">8.314 J/(mol·K)</span>
                </div>
                <div className="bg-slate-950/50 border border-slate-800/60 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">{t("Litre-Bars", "លីត្រ-បារ")}</span>
                  <span className="text-white font-bold text-sm block mt-0.5">0.08314 L·bar/(mol·K)</span>
                </div>
                <div className="bg-slate-950/50 border border-slate-800/60 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">{t("Torr / mmHg Units", "ខ្នាត តរ / មីលីម៉ែត្របារត")}</span>
                  <span className="text-white font-bold text-sm block mt-0.5">62.36 L·mmHg/(mol·K)</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Lower Formulas Grid Section */}
        <section className="flex flex-col gap-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-1">
              {t("FORMULA DATABASE", "ទិន្នន័យរូបមន្ត")}
            </span>
            <h2
              className={`text-2xl font-black text-white ${isKh ? "font-khmer" : ""}`}
              style={{ fontSize: "max(1.4rem, 2.5vw)" }}
            >
              {t("Reference Library of Gas Laws", "បណ្ណាល័យច្បាប់ឧស្ម័នគ្រឹះ")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FORMULAS.map((f, idx) => {
              const isActive = f.lockType === locked;
              return (
                <div
                  key={`formula-${idx}`}
                  className={`bg-slate-900/50 border rounded-3xl p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between gap-4 ${
                    isActive
                      ? "border-cyan-500 shadow-[0_0_25px_rgba(34,211,238,0.18)] bg-cyan-950/5"
                      : "border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3
                      className={`font-black text-white text-base sm:text-lg ${isKh ? "font-khmer leading-snug" : ""}`}
                    >
                      {isKh ? f.titleKh : f.titleEn}
                    </h3>
                    {isActive && (
                      <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
                        {t("Active Lock", "ចាក់សោសកម្ម")}
                      </span>
                    )}
                  </div>

                  {/* Math block */}
                  <div className="bg-slate-950/80 border border-slate-900 p-4 rounded-2xl flex items-center justify-center font-mono my-2 overflow-x-auto">
                    <span className="text-white text-lg">
                      <BlockMath math={f.math} />
                    </span>
                  </div>

                  <p
                    className={`text-slate-400 ${isKh ? "font-khmer leading-loose" : "text-sm leading-relaxed"}`}
                    style={{ fontSize: "max(0.9rem, 1.4vw)" }}
                  >
                    {isKh ? f.descKh : f.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* stylized Kelvin Warning Banner */}
        <section className="bg-gradient-to-r from-red-950/50 via-slate-950/80 to-red-950/50 border-2 border-red-500/30 p-6 rounded-3xl flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-red-400 font-mono tracking-widest uppercase block mb-1">
              {t("CRITICAL TEMPERATURE CONVERSION WARNING", "ការព្រមានសំខាន់អំពីខ្នាតសីតុណ្ហភាព")}
            </span>
            <p
              className={`text-slate-200 font-bold ${isKh ? "font-khmer leading-loose" : "leading-relaxed"}`}
              style={{ fontSize: "max(1.05rem, 1.8vw)" }}
            >
              {t(
                "Temperature (T) must always be in Kelvin (K) for all gas laws. Do not use Celsius (°C) or Fahrenheit (°F) in equations.",
                "សីតុណ្ហភាព (T) ត្រូវតែគិតជាគីលវិន (K) ជានិច្ចសម្រាប់ច្បាប់ឧស្ម័នទាំងអស់។ មិនត្រូវប្រើអង្សាសេ (°C) ឬហ្វារិនហៃ (°F) ក្នុងសមីការឡើយ។"
              )}
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
