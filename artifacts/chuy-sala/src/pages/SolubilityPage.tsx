import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, Droplet, Flame, Gauge, Info, BookOpen, HelpCircle, Activity, RotateCcw } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

interface DissolvedParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface GasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isDissolved: boolean;
}

export default function SolubilityPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  const [soluteType, setSoluteType] = useState<"solid" | "gas">("solid");
  const [temperature, setTemperature] = useState<number>(30); // 0 to 100 °C
  const [pressure, setPressure] = useState<number>(1); // 1 to 5 atm

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>(0);

  // References for particles to maintain state across loop renders
  const solidParticlesRef = useRef<DissolvedParticle[]>([]);
  const gasParticlesRef = useRef<GasParticle[]>([]);

  // Localized string translation helper
  const translate = (en: string, kh: string) => (isKh ? kh : en);

  // Initialize solid particles once
  useEffect(() => {
    const list: DissolvedParticle[] = [];
    for (let i = 0; i < 120; i++) {
      list.push({
        x: 85 + Math.random() * 230,
        y: 185 + Math.random() * 170,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 3.5 + Math.random() * 2.5,
        color: `rgba(${251 + Math.random() * 4}, ${191 + Math.random() * 40}, 36, ${0.75 + Math.random() * 0.25})`, // Amber-yellow tones
      });
    }
    solidParticlesRef.current = list;
  }, []);

  // Initialize gas particles once
  useEffect(() => {
    const list: GasParticle[] = [];
    for (let i = 0; i < 70; i++) {
      const isInitialDissolved = i < 35; // Start half-half
      list.push({
        x: 85 + Math.random() * 230,
        y: isInitialDissolved ? 185 + Math.random() * 170 : 80 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 2.5,
        vy: isInitialDissolved ? (Math.random() - 0.7) * 1.5 : (Math.random() - 0.5) * 2.5,
        radius: 3 + Math.random() * 2.5,
        isDissolved: isInitialDissolved,
      });
    }
    gasParticlesRef.current = list;
  }, []);

  // Reset simulator values
  const handleReset = () => {
    setTemperature(30);
    setPressure(1);
  };

  // ── 2D Beaker Simulator Canvas Render Loop ──────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const beakerX = 75;
      const beakerY = 70;
      const beakerWidth = 250;
      const beakerHeight = 290;
      const liquidLevelY = 190;
      const bottomY = beakerY + beakerHeight;

      // Draw liquid (Water) background
      ctx.fillStyle = "rgba(14, 165, 233, 0.15)";
      ctx.fillRect(beakerX + 5, liquidLevelY, beakerWidth - 10, bottomY - liquidLevelY - 5);

      // Draw Liquid waves top decoration
      ctx.fillStyle = "rgba(14, 165, 233, 0.25)";
      ctx.beginPath();
      ctx.moveTo(beakerX + 5, liquidLevelY);
      const time = Date.now() * 0.003;
      for (let x = beakerX + 5; x <= beakerX + beakerWidth - 5; x++) {
        const y = liquidLevelY + Math.sin(x * 0.05 + time) * 3;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(beakerX + beakerWidth - 5, liquidLevelY + 15);
      ctx.lineTo(beakerX + 5, liquidLevelY + 15);
      ctx.fill();

      // Render Solutes
      if (soluteType === "solid") {
        // Temperature-dependent solid solubility physics
        // Solid capacity scales from ~12 particles (at 0°C) up to ~100 particles (at 100°C)
        const targetDissolvedCount = Math.floor(12 + (temperature / 100) * 88);
        const particles = solidParticlesRef.current;

        // Draw undissolved solute pile at the bottom
        // Maximum pile height at 0°C is 32px, shrinking to 0px at 100°C (fully dissolved)
        const pileHeight = Math.max(0, 32 - (temperature / 100) * 32);
        if (pileHeight > 0) {
          const pileGrad = ctx.createLinearGradient(beakerX + 20, bottomY - pileHeight, beakerX + beakerWidth - 20, bottomY);
          pileGrad.addColorStop(0, "#d97706"); // Amber-600
          pileGrad.addColorStop(0.5, "#f59e0b"); // Amber-500
          pileGrad.addColorStop(1, "#b45309"); // Amber-700
          
          ctx.beginPath();
          ctx.moveTo(beakerX + 5, bottomY - 5);
          ctx.quadraticCurveTo(beakerX + beakerWidth / 2, bottomY - 5 - pileHeight * 2, beakerX + beakerWidth - 5, bottomY - 5);
          ctx.lineTo(beakerX + beakerWidth - 5, bottomY);
          ctx.lineTo(beakerX + 5, bottomY);
          ctx.closePath();
          ctx.fillStyle = pileGrad;
          ctx.fill();

          // Render some micro undissolved crystals dots
          ctx.fillStyle = "#fef08a"; // Yellow-200
          for (let i = 0; i < pileHeight * 1.5; i++) {
            const dotX = beakerX + 15 + Math.random() * (beakerWidth - 30);
            const dotY = bottomY - 5 - Math.random() * (pileHeight * 0.8);
            ctx.fillRect(dotX, dotY, 1.5, 1.5);
          }
        }

        // Speed multiplier scales with temperature (simulates kinetic energy)
        const speedMultiplier = 0.4 + (temperature / 100) * 1.5;

        // Render and update active dissolved particles
        for (let i = 0; i < targetDissolvedCount; i++) {
          const p = particles[i];
          if (!p) continue;

          // Update position
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;

          // Bounce boundaries (inside beaker liquid)
          const leftBound = beakerX + 10 + p.radius;
          const rightBound = beakerX + beakerWidth - 10 - p.radius;
          const topBound = liquidLevelY + 8 + p.radius;
          const bottomBound = bottomY - 8 - pileHeight - p.radius;

          if (p.x < leftBound) {
            p.x = leftBound;
            p.vx *= -1;
          } else if (p.x > rightBound) {
            p.x = rightBound;
            p.vx *= -1;
          }

          if (p.y < topBound) {
            p.y = topBound;
            p.vy *= -1;
          } else if (p.y > bottomBound) {
            p.y = bottomBound;
            p.vy *= -1;
          }

          // Draw dissolved particle (hydrated ion/solute sphere)
          ctx.shadowBlur = 4;
          ctx.shadowColor = "#f59e0b";
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      } else {
        // GAS Solute physics (Henry's Law & Temperature effects)
        // High pressure forces gas into liquid. High temp drives gas out.
        // target dissolved fraction is high when pressure is high and temp is low.
        const dissolvedRatio = Math.max(0.08, Math.min(0.92, (pressure / 5) * 0.85 * (1 - (temperature / 130)) + 0.12));
        const targetDissolvedCount = Math.floor(70 * dissolvedRatio);
        const particles = gasParticlesRef.current;

        // Compute piston position (pressure indicator)
        // Piston Y ranges from 160 (low pressure, high headspace volume) down to 90 (high pressure)
        const pistonY = 165 - (pressure - 1) * 18;

        // Draw physical piston
        ctx.fillStyle = "#475569"; // Slate-600
        ctx.fillRect(beakerX + 5, pistonY, beakerWidth - 10, 10); // piston bar
        ctx.fillStyle = "#64748b"; // Slate-500
        ctx.fillRect(beakerX + beakerWidth / 2 - 10, beakerY - 10, 20, pistonY - beakerY + 10); // piston shaft
        
        // Piston handle/head line
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(beakerX + 2, pistonY);
        ctx.lineTo(beakerX + beakerWidth - 2, pistonY);
        ctx.stroke();

        // Speed coefficients
        const speedLiquid = 0.35 + (temperature / 100) * 0.8;
        const speedGas = 1.0 + (temperature / 100) * 2.2;

        // Manage gas particle states (exchange between liquid and headspace)
        let currentlyDissolvedCount = particles.filter(p => p.isDissolved).length;

        // Update, bounce, and draw all gas particles
        particles.forEach((p) => {
          // Slow upward drift for bubbles in liquid, standard bounce for gas headspace
          if (p.isDissolved) {
            p.x += p.vx * speedLiquid;
            p.y += (p.vy * speedLiquid) - (0.15 + (temperature / 100) * 0.45); // slight upward float (buoyancy)

            const leftBound = beakerX + 8 + p.radius;
            const rightBound = beakerX + beakerWidth - 8 - p.radius;
            const topBound = liquidLevelY + 4;
            const bottomBound = bottomY - 8 - p.radius;

            // Bounce side/bottom walls
            if (p.x < leftBound) { p.x = leftBound; p.vx *= -1; }
            if (p.x > rightBound) { p.x = rightBound; p.vx *= -1; }
            if (p.y > bottomBound) { p.y = bottomBound; p.vy *= -1; }

            // Reached surface? Decide if it pops/escapes
            if (p.y < topBound) {
              if (currentlyDissolvedCount > targetDissolvedCount || Math.random() < 0.15) {
                // Escape into headspace
                p.isDissolved = false;
                p.y = liquidLevelY - 6;
                p.vy = -Math.abs(p.vy) * 1.5; // fly upwards
                currentlyDissolvedCount--;
              } else {
                // Bounce back down
                p.y = topBound;
                p.vy = Math.abs(p.vy);
              }
            }

            // Draw dissolved gas bubble (cyan circle with white core outline)
            ctx.strokeStyle = "rgba(34, 211, 238, 0.75)"; // Cyan-400
            ctx.lineWidth = 1.5;
            ctx.fillStyle = "rgba(224, 242, 254, 0.2)"; // Sky-100
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Inner shine dot
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(p.x - p.radius/3, p.y - p.radius/3, 0.8, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Particle is free gas in the headspace
            p.x += p.vx * speedGas;
            p.y += p.vy * speedGas;

            const leftBound = beakerX + 8 + p.radius;
            const rightBound = beakerX + beakerWidth - 8 - p.radius;
            const topBound = pistonY + 12 + p.radius;
            const bottomBound = liquidLevelY - 2;

            if (p.x < leftBound) { p.x = leftBound; p.vx *= -1; }
            if (p.x > rightBound) { p.x = rightBound; p.vx *= -1; }
            if (p.y < topBound) { p.y = topBound; p.vy *= -1; } // Bounce off piston

            // Reached liquid surface? Decide if forced back (Henry's Law)
            if (p.y > bottomBound) {
              if (currentlyDissolvedCount < targetDissolvedCount) {
                // Dissolve back
                p.isDissolved = true;
                p.y = liquidLevelY + 8;
                p.vy = Math.abs(p.vy) * 0.5; // slow down in water
                currentlyDissolvedCount++;
              } else {
                // Bounce back up
                p.y = bottomBound;
                p.vy = -Math.abs(p.vy);
              }
            }

            // Draw gas particle in headspace (faint, fast cyan dot)
            ctx.fillStyle = "rgba(34, 211, 238, 0.55)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // Draw Beaker Glass Container
      ctx.strokeStyle = "rgba(226, 232, 240, 0.8)"; // Slate-200
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      // Left rim flange
      ctx.moveTo(beakerX - 10, beakerY);
      ctx.lineTo(beakerX, beakerY);
      // Down left wall
      ctx.lineTo(beakerX, bottomY);
      // Bottom beaker wall
      ctx.lineTo(beakerX + beakerWidth, bottomY);
      // Up right wall
      ctx.lineTo(beakerX + beakerWidth, beakerY);
      // Right rim flange
      ctx.lineTo(beakerX + beakerWidth + 10, beakerY);
      ctx.stroke();

      // Measurement tick lines on the side of beaker
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 2.5;
      for (let i = 1; i <= 4; i++) {
        const tickY = bottomY - (beakerHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(beakerX, tickY);
        ctx.lineTo(beakerX + 18, tickY);
        ctx.stroke();
        
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.font = "10px monospace";
        ctx.fillText(`${i * 100} mL`, beakerX + 24, tickY + 3);
      }

      // Render physical condition text markers inside the canvas
      ctx.fillStyle = "#94a3b8"; // Slate-400
      ctx.font = isKh ? "12px khmer" : "bold 11px monospace";
      ctx.fillText(`${translate("Solvent: Water", "សារធាតុរំលាយ៖ ទឹក")}`, beakerX + 60, bottomY + 20);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [soluteType, temperature, pressure, isKh]);

  // ── Solubility Curves Interactive Graph Calculations ─────────────────────
  const [hoveredTemp, setHoveredTemp] = useState<number | null>(null);
  const chartWidth = 440;
  const chartHeight = 240;
  const chartPadding = { left: 45, right: 20, top: 20, bottom: 40 };

  // Analytical models for the solubility curves
  // KNO3: steep rise: 13g at 0C to 240g at 100C. (Mapped to visual range 0 to 250 g/100g)
  const getKNO3 = (temp: number) => {
    return 13.3 + 0.57 * temp + 0.016 * temp * temp;
  };
  // NaCl: flat line: ~35.7g at 0C to ~39.8g at 100C.
  const getNaCl = (temp: number) => {
    return 35.7 + 0.038 * temp;
  };
  // O2 Gas: decreases with temperature: ~14.6 mg/L at 0C down to ~5.0 mg/L at 60C.
  // scaled for visual layout by multiplying by 10 so it's clearly visible (146 down to 50 visual scale)
  const getO2Val = (temp: number) => {
    return 14.6 / (1 + 0.033 * temp);
  };

  // Convert real values to Y-coordinates in SVG viewbox (Y scale 0 to 250)
  const getVisualY = (realVal: number, isGas: boolean) => {
    // If gas, scale physical mg/L value to look visible on Y-axis (scale by 13 to make it look like a nice curve)
    const normalizedVal = isGas ? realVal * 12 : realVal;
    return chartPadding.top + chartHeight - (normalizedVal / 250) * chartHeight;
  };

  // Generate SVG path for a curve
  const generatePath = (curveType: "kno3" | "nacl" | "o2") => {
    let points = "";
    for (let t = 0; t <= 100; t += 2) {
      const x = chartPadding.left + (t / 100) * chartWidth;
      let yVal = 0;
      if (curveType === "kno3") yVal = getKNO3(t);
      else if (curveType === "nacl") yVal = getNaCl(t);
      else yVal = getO2Val(t);

      const y = getVisualY(yVal, curveType === "o2");
      points += `${t === 0 ? "M" : "L"} ${x} ${y} `;
    }
    return points;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left - chartPadding.left;
    const tempPercent = x / chartWidth;
    const temp = Math.round(tempPercent * 100);

    if (temp >= 0 && temp <= 100) {
      setHoveredTemp(temp);
    } else {
      setHoveredTemp(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredTemp(null);
  };

  // Currently displayed hover data values
  const activeHoverTemp = hoveredTemp !== null ? hoveredTemp : Math.round(temperature);
  const hoverKNO3 = getKNO3(activeHoverTemp).toFixed(1);
  const hoverNaCl = getNaCl(activeHoverTemp).toFixed(1);
  const hoverO2 = getO2Val(activeHoverTemp).toFixed(2);

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Dark background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/science" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>{t("Back to Science Hub", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}</span>
          </Link>

          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-cyan-400" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-400 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Factors Affecting Solubility", "កត្តាជះឥទ្ធិពលលើភាពរលាយ")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block">
            <span>CHEM-LAB-102</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-grow w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-8">
        
        {/* Top Section: Simulator (Left) and Graphical Line Chart (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. Interactive Solubility Simulator (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-6 relative">
              
              <div>
                <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-1">
                  {t("LABORATORY SIMULATOR", "ឧបករណ៍ពិសោធន៍មន្ទីរពិសោធន៍")}
                </span>
                <h2 className={`text-xl sm:text-2xl font-black text-white ${isKh ? "font-khmer" : ""}`}>
                  {t("Solubility & Physical States", "ភាពរលាយ និងលក្ខណៈរូបធាតុ")}
                </h2>
              </div>

              {/* Solute Selector Toggle */}
              <div className="flex flex-col gap-2">
                <span className={`text-[10px] text-slate-400 font-bold uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                  {t("1. Select Solute Type", "១. ជ្រើសរើសប្រភេទសារធាតុរលាយ")}
                </span>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-900">
                  <button
                    onClick={() => {
                      setSoluteType("solid");
                      setPressure(1); // Solid pressure has no effect, reset
                    }}
                    className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                      soluteType === "solid"
                        ? "bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                        : "bg-transparent border border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 shrink-0" />
                    <span>{t("Solid Solute (Salt/Sugar)", "សារធាតុរឹង (អំបិល/ស្ករ)")}</span>
                  </button>
                  
                  <button
                    onClick={() => setSoluteType("gas")}
                    className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                      soluteType === "gas"
                        ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                        : "bg-transparent border border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0 animate-ping" />
                    <span>{t("Gas Solute (Carbon Dioxide)", "ឧស្ម័ន (កាបូនឌីអុកស៊ីត)")}</span>
                  </button>
                </div>
              </div>

              {/* Beaker Canvas Screen */}
              <div className="flex justify-center bg-slate-950/80 rounded-2xl border border-slate-800/80 p-2 relative overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={380}
                  className="w-full max-w-[360px] h-[340px] block"
                />

                {/* State Tag Overlay */}
                <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl backdrop-blur-md flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className={`text-[10px] font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                    {soluteType === "solid" 
                      ? t("SOLID SYSTEM ACTIVE", "ប្រព័ន្ធសារធាតុរឹង") 
                      : t("GAS SYSTEM (SEALED)", "ប្រព័ន្ធឧស្ម័នបិទជិត")}
                  </span>
                </div>
              </div>

              {/* Environment Sliders */}
              <div className="flex flex-col gap-4 bg-slate-950/40 border border-slate-900 p-4 rounded-2xl">
                
                {/* Temperature Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className={`flex items-center gap-1 font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                      <Flame className="w-3.5 h-3.5 text-red-400" />
                      {t("System Temperature", "សីតុណ្ហភាពប្រព័ន្ធ")}
                    </span>
                    <span className="font-mono text-cyan-400 text-sm font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {temperature}°C
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={temperature}
                    onChange={(e) => setTemperature(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-slate-500">
                    <span>0°C ({t("Freezing", "ត្រជាក់ខ្លាំង")})</span>
                    <span>100°C ({t("Boiling", "ពុះ")})</span>
                  </div>
                </div>

                {/* Pressure Slider */}
                <div className="flex flex-col gap-2 relative">
                  {/* Disabled overlay for Solid solute */}
                  {soluteType === "solid" && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px] rounded-xl flex items-center justify-center z-10 border border-slate-900/50">
                      <span className={`text-xs font-semibold text-slate-400 flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
                        <Info className="w-3.5 h-3.5 text-amber-500" />
                        {t("Pressure has zero effect on solids", "សម្ពាធគ្មានឥទ្ធិពលលើសារធាតុរឹងទេ")}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs">
                    <span className={`flex items-center gap-1 font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                      <Gauge className="w-3.5 h-3.5 text-indigo-400" />
                      {t("Gas Partial Pressure", "សម្ពាធផ្នែកនៃឧស្ម័ន")}
                    </span>
                    <span className="font-mono text-indigo-400 text-sm font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {pressure} atm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={pressure}
                    onChange={(e) => setPressure(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-slate-500">
                    <span>1 atm ({t("Standard", "ធម្មតា")})</span>
                    <span>5 atm ({t("High Pressure", "សម្ពាធខ្ពស់")})</span>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t("Reset Environment Controls", "កំណត់បរិស្ថានឡើងវិញ")}</span>
              </button>

            </div>
          </div>

          {/* 2. Graphical Understanding Panel (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl flex flex-col gap-6 h-full justify-between">
              
              <div>
                <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-1">
                  {t("GRAPHICAL UNDERSTANDING", "ការស្វែងយល់តាមរយៈក្រាហ្វ")}
                </span>
                <h2 className={`text-xl sm:text-2xl font-black text-white ${isKh ? "font-khmer" : ""}`}>
                  {t("Solubility Curves Graph", "ក្រាហ្វខ្សែគោងភាពរលាយ")}
                </h2>
              </div>

              {/* Interactive SVG Chart */}
              <div className="bg-slate-950/80 rounded-2xl border border-slate-800/80 p-4 flex flex-col gap-4 relative">
                
                <svg
                  viewBox={`0 0 ${chartWidth + chartPadding.left + chartPadding.right} ${chartHeight + chartPadding.top + chartPadding.bottom}`}
                  className="w-full h-auto cursor-crosshair select-none"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Grid Lines */}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const yVal = i * 50;
                    const y = getVisualY(yVal, false);
                    return (
                      <g key={`grid-y-${i}`}>
                        <line
                          x1={chartPadding.left}
                          y1={y}
                          x2={chartPadding.left + chartWidth}
                          y2={y}
                          stroke="#1e293b"
                          strokeWidth="1"
                        />
                        <text
                          x={chartPadding.left - 10}
                          y={y + 4}
                          fill="#64748b"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="end"
                        >
                          {yVal}
                        </text>
                      </g>
                    );
                  })}

                  {/* X-Axis divisions */}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const tempVal = i * 20;
                    const x = chartPadding.left + (tempVal / 100) * chartWidth;
                    return (
                      <g key={`grid-x-${i}`}>
                        <line
                          x1={x}
                          y1={chartPadding.top}
                          x2={x}
                          y2={chartPadding.top + chartHeight}
                          stroke="#1e293b"
                          strokeWidth="1"
                        />
                        <text
                          x={x}
                          y={chartPadding.top + chartHeight + 16}
                          fill="#64748b"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {tempVal}°C
                        </text>
                      </g>
                    );
                  })}

                  {/* Axes lines */}
                  <line
                    x1={chartPadding.left}
                    y1={chartPadding.top}
                    x2={chartPadding.left}
                    y2={chartPadding.top + chartHeight}
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={chartPadding.left}
                    y1={chartPadding.top + chartHeight}
                    x2={chartPadding.left + chartWidth}
                    y2={chartPadding.top + chartHeight}
                    stroke="#475569"
                    strokeWidth="1.5"
                  />

                  {/* Y Axis Label (Solid) */}
                  <text
                    transform={`rotate(-90 ${chartPadding.left - 30} ${chartPadding.top + chartHeight/2})`}
                    x={chartPadding.left - 32}
                    y={chartPadding.top + chartHeight/2}
                    fill="#94a3b8"
                    fontSize="9"
                    className={isKh ? "font-khmer" : ""}
                    textAnchor="middle"
                  >
                    {t("Solubility (g/100g H₂O)", "ភាពរលាយ (g/100g ទឹក)")}
                  </text>

                  {/* Plot curves */}
                  {/* KNO3 (Rose - Steep upward) */}
                  <path
                    d={generatePath("kno3")}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                  />
                  {/* NaCl (Amber - Flat) */}
                  <path
                    d={generatePath("nacl")}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />
                  {/* O2 Gas (Cyan - downward) */}
                  <path
                    d={generatePath("o2")}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                  />

                  {/* Interactive Tracker Line */}
                  {activeHoverTemp !== null && (
                    <g>
                      {/* Vertical line tracker */}
                      <line
                        x1={chartPadding.left + (activeHoverTemp / 100) * chartWidth}
                        y1={chartPadding.top}
                        x2={chartPadding.left + (activeHoverTemp / 100) * chartWidth}
                        y2={chartPadding.top + chartHeight}
                        stroke="#475569"
                        strokeDasharray="4 3"
                        strokeWidth="1.5"
                      />

                      {/* KNO3 active dot */}
                      <circle
                        cx={chartPadding.left + (activeHoverTemp / 100) * chartWidth}
                        cy={getVisualY(getKNO3(activeHoverTemp), false)}
                        r="5"
                        fill="#f43f5e"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />

                      {/* NaCl active dot */}
                      <circle
                        cx={chartPadding.left + (activeHoverTemp / 100) * chartWidth}
                        cy={getVisualY(getNaCl(activeHoverTemp), false)}
                        r="5"
                        fill="#f59e0b"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />

                      {/* O2 active dot */}
                      <circle
                        cx={chartPadding.left + (activeHoverTemp / 100) * chartWidth}
                        cy={getVisualY(getO2Val(activeHoverTemp), true)}
                        r="5"
                        fill="#06b6d4"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </g>
                  )}
                </svg>

                {/* Graph Legends */}
                <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-1 bg-[#f43f5e] rounded" />
                    <span>{t("KNO₃ (Solid - Steep Rise)", "KNO₃ (រឹង - កើនខ្លាំង)")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-1 bg-[#f59e0b] rounded" />
                    <span>{t("NaCl (Solid - Flat)", "NaCl (រឹង - ស្ទើរតែថេរ)")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-1 bg-[#06b6d4] rounded" />
                    <span>{t("O₂ (Gas - Decreases)", "O₂ (ឧស្ម័ន - ថយចុះ)")}</span>
                  </div>
                </div>

              </div>

              {/* Dynamic Interactive Readouts Display */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span className={isKh ? "font-khmer" : "font-mono font-bold"}>
                    {t("INTERACTIVE TEMP READER", "សន្ទស្សន៍សីតុណ្ហភាពអន្តរកម្ម")}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-cyan-400 font-bold font-mono">
                    {activeHoverTemp}°C
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* KNO3 readout card */}
                  <div className="bg-[#f43f5e]/5 border border-[#f43f5e]/25 rounded-xl p-3 flex flex-col gap-1.5">
                    <span className="text-[10px] text-red-300 font-bold">KNO₃</span>
                    <span className="text-sm sm:text-base font-black text-white font-mono">{hoverKNO3}</span>
                    <span className="text-[9px] text-slate-500">g/100g H₂O</span>
                  </div>

                  {/* NaCl readout card */}
                  <div className="bg-[#f59e0b]/5 border border-[#f59e0b]/25 rounded-xl p-3 flex flex-col gap-1.5">
                    <span className="text-[10px] text-amber-300 font-bold">NaCl</span>
                    <span className="text-sm sm:text-base font-black text-white font-mono">{hoverNaCl}</span>
                    <span className="text-[9px] text-slate-500">g/100g H₂O</span>
                  </div>

                  {/* O2 readout card */}
                  <div className="bg-[#06b6d4]/5 border border-[#06b6d4]/25 rounded-xl p-3 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-cyan-300 font-bold">O₂ Gas</span>
                      <span className="text-[8px] bg-cyan-950 text-cyan-400 px-1 rounded uppercase font-mono scale-90">Gas</span>
                    </div>
                    <span className="text-sm sm:text-base font-black text-white font-mono">{hoverO2}</span>
                    <span className="text-[9px] text-slate-500">mg/L</span>
                  </div>

                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-1">
                  <Info className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span className={isKh ? "font-khmer leading-loose" : "leading-relaxed"}>
                    {t(
                      "Hover your cursor over the chart to trace precise solubility values across temperatures in real-time.",
                      "អូសកណ្តុរពីលើក្រាហ្វដើម្បីតាមដានតម្លៃភាពរលាយលម្អិតតាមសីតុណ្ហភាពនីមួយៗ។"
                    )}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Section: 5 Factors Reference Grid (Span Full) */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
          
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-0.5">
                {t("CURRICULUM SYLLABUS REFERENCE", "ឯកសារយោងកម្មវិធីសិក្សា")}
              </span>
              <h2 className={`text-xl sm:text-2xl font-black text-white ${isKh ? "font-khmer" : ""}`}>
                {t("5 Main Factors Affecting Solubility", "កត្តាសំខាន់ទាំង ៥ ជះឥទ្ធិពលលើភាពរលាយ")}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Factor 1: Nature of solute and solvent */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">1</span>
                <h3 className={`font-bold text-white text-sm ${isKh ? "font-khmer" : ""}`}>
                  {t("Nature of Solute & Solvent", "លក្ខណៈនៃសារធាតុ")}
                </h3>
              </div>
              <p className={`text-slate-400 leading-relaxed text-xs ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "\"Like dissolves like.\" Polar or ionic compounds (e.g. salt) dissolve in polar solvents (water). Non-polar compounds (e.g. benzene) dissolve in non-polar solvents (kerosene).",
                  "«ដូចគ្នារលាយក្នុងដូចគ្នា»។ សារធាតុប៉ូលែរ ឬអ៊ីយ៉ុង (ឧ. អំបិល) រលាយក្នុងសារធាតុរំលាយប៉ូលែរ (ទឹក)។ សារធាតុមិនប៉ូលែរ (ឧ. បង់សែន) រលាយក្នុងសារធាតុរំលាយមិនប៉ូលែរ (ប្រេងកាត)។"
                )}
              </p>
            </div>

            {/* Factor 2: Temperature */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">2</span>
                <h3 className={`font-bold text-white text-sm ${isKh ? "font-khmer" : ""}`}>
                  {t("Temperature", "សីតុណ្ហភាព")}
                </h3>
              </div>
              <p className={`text-slate-400 leading-relaxed text-xs ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Solubility of most solids increases with temperature (thermal energy breaks solute bonds). Conversely, gas solubility decreases with temperature as gas molecules gain kinetic energy and escape the liquid.",
                  "ភាពរលាយសារធាតុរឹងភាគច្រើនកើនឡើងតាមសីតុណ្ហភាព (ថាមពលកម្ដៅបំបែកសម្ព័ន្ធភាគល្អិត)។ ផ្ទុយទៅវិញ ភាពរលាយឧស្ម័នថយចុះនៅពេលសីតុណ្ហភាពកើនឡើង ព្រោះម៉ូលេគុលឧស្ម័នទទួលបានថាមពលរួចភាយចេញ។"
                )}
              </p>
            </div>

            {/* Factor 3: Pressure */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">3</span>
                <h3 className={`font-bold text-white text-sm ${isKh ? "font-khmer" : ""}`}>
                  {t("Pressure", "សម្ពាធ")}
                </h3>
              </div>
              <p className={`text-slate-400 leading-relaxed text-xs ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Mainly affects gases (Henry's Law). Higher gas partial pressure above the liquid compresses the gas headspace and drives more gas molecules to dissolve. Pressure has no meaningful effect on solid/liquid solubility.",
                  "ជះឥទ្ធិពលលើឧស្ម័នរលាយ (ច្បាប់ហង់រី)។ សម្ពាធឧស្ម័នកាន់តែខ្ពស់នៅពីលើអង្គធាតុរាវ បង្ខំឲ្យម៉ូលេគុលឧស្ម័នរលាយចូលក្នុងទឹកកាន់តែច្រើន។ សម្ពាធគ្មានឥទ្ធិពលលើភាពរលាយនៃសារធាតុរឹង ឬរាវឡើយ។"
                )}
              </p>
            </div>

            {/* Factor 4: Stirring (Agitation) */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">4</span>
                <h3 className={`font-bold text-white text-sm ${isKh ? "font-khmer" : ""}`}>
                  {t("Stirring (Agitation)", "ការកូរ (ល្បឿនរលាយ)")}
                </h3>
              </div>
              <p className={`text-slate-400 leading-relaxed text-xs ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Stirring or shaking increases the rate of dissolution by bringing fresh solvent in contact with the solute surface. However, it does not change the final maximum solubility limit.",
                  "ការកូរ ឬការក្រឡុក បង្កើនល្បឿននៃការរលាយដោយនាំសារធាតុរំលាយថ្មីទៅប៉ះនឹងផ្ទៃសារធាតុរលាយ។ ទោះជាយ៉ាងណា វាមិនផ្លាស់ប្ដូរដែនកំណត់អតិបរមានៃភាពរលាយចុងក្រោយឡើយ។"
                )}
              </p>
            </div>

            {/* Factor 5: Particle Size */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold">5</span>
                <h3 className={`font-bold text-white text-sm ${isKh ? "font-khmer" : ""}`}>
                  {t("Particle Size", "ទំហំភាគល្អិត")}
                </h3>
              </div>
              <p className={`text-slate-400 leading-relaxed text-xs ${isKh ? "font-khmer leading-loose" : ""}`}>
                {t(
                  "Smaller particles expose a much greater surface area to the solvent, which increases the rate of dissolution. However, the final maximum solubility threshold remains unchanged.",
                  "ភាគល្អិតរលាយកាន់តែតូច មានផ្ទៃប៉ះសរុបកាន់តែធំជាមួយសារធាតុរំលាយ ដែលធ្វើឲ្យល្បឿនរលាយកាន់តែកើនឡើង។ ទោះជាយ៉ាងណា ដែនកំណត់ភាពរលាយចុងក្រោយគឺនៅដដែល។"
                )}
              </p>
            </div>

          </div>

          {/* Mass vs Rate Clarification Warning Panel */}
          <div className="bg-gradient-to-r from-amber-950/40 to-slate-950/50 border-l-4 border-amber-500 p-5 rounded-r-2xl mt-2 flex flex-col gap-2">
            <span className="text-[10px] font-bold text-amber-400 font-mono tracking-widest uppercase block">
              {t("CRITICAL CONCEPTS: SOLUBILITY CAPACITY VS. RATE OF DISSOLVING", "គំនិតគន្លឹះ៖ សមត្ថភាពរលាយ ធៀបនឹង ល្បឿនរលាយ")}
            </span>
            <p className={`text-slate-300 font-bold text-xs leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {t(
                "Stirring and smaller particle sizes ONLY increase the RATE of dissolving (how fast it dissolves). They do NOT change the final solubility limit (how much can dissolve). Temperature and chemical nature are the primary factors that determine the actual maximum solubility capacity for solids; Pressure determines solubility for gases.",
                "ការកូរ និងទំហំភាគល្អិតតូច គឺគ្រាន់តែបង្កើន ល្បឿនរលាយ (រលាយលឿនប៉ុនណា) ប៉ុណ្ណោះ។ វាមិនផ្លាស់ប្ដូរដែនកំណត់នៃភាពរលាយចុងក្រោយឡើយ (រលាយបានបរិមាណប៉ុនណា)។ សីតុណ្ហភាព និងលក្ខណៈគីមីជាកត្តាចម្បងកំណត់សមត្ថភាពរលាយអតិបរមានៃសារធាតុរឹង ចំណែកឯ សម្ពាធ កំណត់ភាពរលាយនៃឧស្ម័ន។"
              )}
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}
