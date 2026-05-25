import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, Telescope, Sparkles, HelpCircle, Activity } from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import starData from "@/data/star-types.json";

interface StarType {
  id: string;
  nameEn: string;
  nameKh: string;
  descEn: string;
  descKh: string;
  traitsEn: string[];
  traitsKh: string[];
}

interface Particle {
  x: number;
  y: number;
  r: number;
  angle: number;
  speed: number;
  color: string;
}

export default function StarEvolutionPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  const stars = starData as StarType[];
  const [activeId, setActiveId] = useState<string>("yellow-dwarf");

  const activeStar = stars.find((s) => s.id === activeId) || stars[0];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Accretion disk/nebula particles for Protostar & Supergiant ejecta
  const particlesRef = useRef<Particle[]>([]);

  // Re-initialize particles when activeId changes
  useEffect(() => {
    const list: Particle[] = [];
    if (activeId === "protostar") {
      // 60 particles spiraling in towards core
      for (let i = 0; i < 60; i++) {
        const dist = 60 + Math.random() * 120;
        const angle = Math.random() * Math.PI * 2;
        list.push({
          x: dist * Math.cos(angle),
          y: dist * Math.sin(angle),
          r: 1.5 + Math.random() * 2,
          angle: angle,
          speed: 0.015 + Math.random() * 0.02,
          color: `rgba(${220 + Math.random() * 35}, ${100 + Math.random() * 80}, 50, ${0.4 + Math.random() * 0.4})`
        });
      }
    } else if (activeId === "supergiant") {
      // Solar wind ejecta particles flying outwards
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 100;
        list.push({
          x: dist * Math.cos(angle),
          y: dist * Math.sin(angle),
          r: 2 + Math.random() * 3,
          angle: angle,
          speed: 1.5 + Math.random() * 2.5,
          color: `rgba(239, 68, 68, ${0.3 + Math.random() * 0.5})` // red-rose
        });
      }
    }
    particlesRef.current = list;
  }, [activeId]);

  // ── HTML5 Canvas Animation Render Loop ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      timeRef.current += 1;
      const time = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw faint space background stars inside the viewport
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      for (let i = 0; i < 15; i++) {
        const starX = (Math.sin(i * 999) * 0.5 + 0.5) * canvas.width;
        const starY = (Math.cos(i * 123) * 0.5 + 0.5) * canvas.height;
        ctx.fillRect(starX, starY, 1.5, 1.5);
      }

      ctx.save();
      ctx.translate(cx, cy);

      // Render based on active star type
      switch (activeId) {
        case "red-dwarf": {
          // Small, cooler orange-red pulsating orb
          const pulse = Math.sin(time * 0.03) * 2;
          const radius = 55 + pulse;

          const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, radius);
          grad.addColorStop(0, "#fecdd3"); // pink-200
          grad.addColorStop(0.3, "#f43f5e"); // rose-500
          grad.addColorStop(0.8, "#9f1239"); // rose-800
          grad.addColorStop(1, "rgba(159, 18, 57, 0)");

          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Surface flare flares
          ctx.strokeStyle = "rgba(244, 63, 94, 0.25)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, radius + 4 + Math.sin(time * 0.05) * 1.5, 0, Math.PI * 2);
          ctx.stroke();
          break;
        }

        case "yellow-dwarf": {
          // Medium yellow-orange pulsating orb with flares
          const pulse = Math.sin(time * 0.03) * 3;
          const radius = 75 + pulse;

          const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, radius);
          grad.addColorStop(0, "#fef08a"); // yellow-200
          grad.addColorStop(0.3, "#f59e0b"); // amber-500
          grad.addColorStop(0.8, "#b45309"); // amber-700
          grad.addColorStop(1, "rgba(180, 83, 9, 0)");

          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Outer corona lines
          ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, radius + 6 + Math.sin(time * 0.04) * 2, 0, Math.PI * 2);
          ctx.stroke();
          break;
        }

        case "blue-giant": {
          // Massive, hot blue-white giant
          const radius = 120 + Math.sin(time * 0.04) * 3;

          // Outer blue intense corona glow
          const glowGrad = ctx.createRadialGradient(0, 0, radius - 20, 0, 0, radius + 30);
          glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.4)"); // sky-400
          glowGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
          ctx.beginPath();
          ctx.arc(0, 0, radius + 30, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();

          // Core
          const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, radius);
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.3, "#e0f2fe"); // sky-100
          grad.addColorStop(0.7, "#0284c7"); // sky-600
          grad.addColorStop(1, "rgba(2, 132, 199, 0)");

          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          break;
        }

        case "red-giant": {
          // Huge red-orange expanding gas bag
          const pulse = Math.sin(time * 0.015) * 5;
          const radius = 135 + pulse;

          // Double layered fuzzy shell
          const outerGrad = ctx.createRadialGradient(0, 0, radius - 30, 0, 0, radius + 20);
          outerGrad.addColorStop(0, "rgba(234, 88, 12, 0.5)"); // orange-600
          outerGrad.addColorStop(1, "rgba(220, 38, 38, 0)"); // red-600
          ctx.beginPath();
          ctx.arc(0, 0, radius + 20, 0, Math.PI * 2);
          ctx.fillStyle = outerGrad;
          ctx.fill();

          const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, radius);
          grad.addColorStop(0, "#ffedd5"); // orange-100
          grad.addColorStop(0.4, "#ea580c"); // orange-600
          grad.addColorStop(0.9, "#7f1d1d"); // red-900
          grad.addColorStop(1, "rgba(127, 29, 29, 0)");

          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          break;
        }

        case "white-dwarf": {
          // Tiny, highly compact core
          const radius = 16;

          // Halo glow
          ctx.shadowBlur = 35;
          ctx.shadowColor = "#38bdf8";

          const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, radius);
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.6, "#e0f2fe"); // sky-100
          grad.addColorStop(1, "rgba(224, 242, 254, 0)");

          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.shadowBlur = 0; // reset
          break;
        }

        case "neutron-star": {
          // Miniature core with pulsing high frequency & rotating jets
          const highPulse = Math.sin(time * 0.25) * 2;
          const radius = 10 + highPulse;

          // Rotate coordinate system for the pulsar beam jets
          const angle = time * 0.04;
          ctx.rotate(angle);

          // Draw double pulsar beam jets (translucent cyan cones)
          const beamLength = 210;
          const beamWidth = 24;

          const beamGrad = ctx.createLinearGradient(0, -radius, 0, -beamLength);
          beamGrad.addColorStop(0, "rgba(34, 211, 238, 0.7)"); // cyan-400
          beamGrad.addColorStop(0.5, "rgba(34, 211, 238, 0.3)");
          beamGrad.addColorStop(1, "rgba(34, 211, 238, 0)");

          // Upper beam
          ctx.beginPath();
          ctx.moveTo(-beamWidth / 4, 0);
          ctx.lineTo(-beamWidth, -beamLength);
          ctx.lineTo(beamWidth, -beamLength);
          ctx.lineTo(beamWidth / 4, 0);
          ctx.fillStyle = beamGrad;
          ctx.fill();

          // Lower beam
          ctx.beginPath();
          ctx.moveTo(-beamWidth / 4, 0);
          ctx.lineTo(-beamWidth, beamLength);
          ctx.lineTo(beamWidth, beamLength);
          ctx.lineTo(beamWidth / 4, 0);
          ctx.fillStyle = beamGrad;
          ctx.fill();

          // Core (highly glowing cyan)
          ctx.shadowBlur = 25;
          ctx.shadowColor = "#22d3ee";
          const coreGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, radius);
          coreGrad.addColorStop(0, "#ffffff");
          coreGrad.addColorStop(0.7, "#22d3ee");
          coreGrad.addColorStop(1, "rgba(34, 211, 238, 0)");

          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fillStyle = coreGrad;
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        case "supergiant": {
          // Monstrous star with outward floating particles (solar wind)
          const pulse = Math.sin(time * 0.015) * 6;
          const radius = 150 + pulse;

          // Draw floating ejecta particles
          particlesRef.current.forEach((p) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;

            // Reset particle if it drifts too far
            const d = Math.sqrt(p.x * p.x + p.y * p.y);
            if (d > 195) {
              p.x = Math.cos(p.angle) * radius;
              p.y = Math.sin(p.angle) * radius;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
          });

          // Draw central star
          const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, radius);
          grad.addColorStop(0, "#fef2f2"); // red-50
          grad.addColorStop(0.4, "#ef4444"); // red-500
          grad.addColorStop(0.8, "#7f1d1d"); // red-900
          grad.addColorStop(1, "rgba(127, 29, 29, 0)");

          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          break;
        }

        case "binary-stars": {
          // Two stars orbiting a common center
          const angle = time * 0.015;
          const orbitRadius = 90;

          // Draw orbital path circle
          ctx.strokeStyle = "rgba(71, 85, 105, 0.2)";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(0, 0, orbitRadius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]); // reset

          // Star A: Yellow Dwarf
          const xa = orbitRadius * Math.cos(angle);
          const ya = orbitRadius * Math.sin(angle);
          const radA = 32 + Math.sin(time * 0.05) * 1.5;

          const gradA = ctx.createRadialGradient(xa, ya, 1, xa, ya, radA);
          gradA.addColorStop(0, "#fef08a");
          gradA.addColorStop(0.4, "#f59e0b");
          gradA.addColorStop(1, "rgba(245, 158, 11, 0)");

          ctx.beginPath();
          ctx.arc(xa, ya, radA, 0, Math.PI * 2);
          ctx.fillStyle = gradA;
          ctx.fill();

          // Star B: Blue Dwarf
          const xb = -orbitRadius * Math.cos(angle);
          const yb = -orbitRadius * Math.sin(angle);
          const radB = 22 + Math.sin(time * 0.05 + Math.PI) * 1;

          const gradB = ctx.createRadialGradient(xb, yb, 1, xb, yb, radB);
          gradB.addColorStop(0, "#ffffff");
          gradB.addColorStop(0.4, "#38bdf8");
          gradB.addColorStop(1, "rgba(56, 189, 248, 0)");

          ctx.beginPath();
          ctx.arc(xb, yb, radB, 0, Math.PI * 2);
          ctx.fillStyle = gradB;
          ctx.fill();
          break;
        }

        case "protostar": {
          // Collapsing nebula gas and dust spiraling towards a core
          const coreRadius = 45 + Math.sin(time * 0.02) * 2;

          // Accretion disk dust particles
          particlesRef.current.forEach((p) => {
            // Spiral inwards
            p.angle += p.speed;
            const radiusScale = 120 + 30 * Math.sin(p.angle * 2);
            // Move slowly towards core
            p.x = (radiusScale - time * 0.06 % 90) * Math.cos(p.angle);
            p.y = (radiusScale - time * 0.06 % 90) * Math.sin(p.angle) * 0.4; // flat ellipse view

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
          });

          // Glowing pre-fusion core (warm orange-red)
          const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, coreRadius);
          grad.addColorStop(0, "#ffedd5"); // orange-100
          grad.addColorStop(0.5, "#ea580c"); // orange-600
          grad.addColorStop(0.9, "#7c2d12"); // orange-900
          grad.addColorStop(1, "rgba(124, 45, 18, 0)");

          ctx.beginPath();
          ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          break;
        }
      }

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background space elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#050b18] to-black pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/science" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>{t("Back to Science Hub", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}</span>
          </Link>

          <div className="flex items-center gap-2">
            <Telescope className="w-5 h-5 text-cyan-400" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-400 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("Stellar Evolution", "ប្រភេទតារា & ការវិវត្តផ្កាយ")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block">
            <span>ASTRO-PHYS-101</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Stellar Visualizer Stage (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div
            className="w-full relative h-[450px] sm:h-[500px] rounded-3xl border-2 border-slate-800/80 bg-slate-950/95 shadow-[inset_0_0_50px_rgba(34,211,238,0.03),_0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex items-center justify-center"
            aria-label={t("Interactive 3D star visualizer", "កម្មវិធីបង្ហាញរូបរាងផ្កាយអន្តរកម្ម")}
          >
            {/* Title Overlay */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
              <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block">
                {t("STELLAR ENGINE VIEWPORT", "ម៉ាស៊ីនបង្ហាញរូបរាងផ្កាយ")}
              </span>
              <h2
                className={`text-2xl sm:text-3xl font-black text-white ${isKh ? "font-khmer mt-1" : ""}`}
                style={{ fontSize: "max(1.5rem, 2.5vw)" }}
              >
                {isKh ? activeStar.nameKh : activeStar.nameEn}
              </h2>
            </div>

            {/* Animation Canvas */}
            <canvas
              ref={canvasRef}
              width={450}
              height={450}
              className="w-[400px] h-[400px] sm:w-[450px] sm:h-[450px] block"
            />

            {/* Indicator details */}
            <div className="absolute bottom-6 left-6 pointer-events-none flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className={`text-[10px] font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                {t("Real-time HTML5 Physics Simulation Active", "ការសាកល្បងចលនាផ្កាយកំពុងដំណើរការ")}
              </span>
            </div>
          </div>

          {/* Segmented Button Selection Gallery (Grid) */}
          <div className="w-full grid grid-cols-3 gap-3">
            {stars.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`p-3 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                  activeId === s.id
                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-white"
                }`}
              >
                <span className="font-bold text-xs sm:text-sm">{isKh ? s.nameKh : s.nameEn}</span>
                <Sparkles className={`w-3.5 h-3.5 ${activeId === s.id ? "text-cyan-400" : "text-slate-600"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Educational Traits Panels (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Dynamic star details card */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-1">
                {t("STELLAR DETAILS", "លក្ខណៈលម្អិតរបស់ផ្កាយ")}
              </span>
              <h3
                className={`text-2xl font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.3rem, 2.2vw)" }}
              >
                {t("Stellar Properties & Traits", "លក្ខណៈសម្បត្តិ និងការវិវត្ត")}
              </h3>
            </div>

            {/* Description quote */}
            <p
              className={`text-slate-300 italic border-l-4 border-cyan-500 pl-4 py-1 leading-relaxed ${
                isKh ? "font-khmer leading-loose text-sm" : "text-sm"
              }`}
            >
              {isKh ? activeStar.descKh : activeStar.descEn}
            </p>

            {/* Bulleted traits grid */}
            <div className="flex flex-col gap-4 border-t border-slate-800/80 pt-6">
              <span className={`text-[10px] text-slate-500 uppercase tracking-wider block ${isKh ? "font-khmer" : ""}`}>
                {t("KEY EVOLUTIONARY CHARACTERISTICS", "លក្ខណៈវិវត្តន៍គន្លឹះ")}
              </span>

              <ul className="flex flex-col gap-3">
                {(isKh ? activeStar.traitsKh : activeStar.traitsEn).map((trait, idx) => (
                  <li key={`trait-${idx}`} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 text-xs font-bold font-mono">
                      {idx + 1}
                    </span>
                    <span
                      className={`text-slate-200 leading-relaxed ${isKh ? "font-khmer leading-loose" : "text-sm"}`}
                      style={{ fontSize: "max(0.95rem, 1.6vw)" }}
                    >
                      {trait}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Static Stellar Evolution details card */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <HelpCircle className="w-5 h-5" />
              </span>
              <h3
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.3rem, 2.2vw)" }}
              >
                {t("The Lifespan Rule of Stars", "ច្បាប់អាយុកាលរបស់ផ្កាយ")}
              </h3>
            </div>

            {/* Core rule highlight box */}
            <div className="bg-gradient-to-r from-indigo-950/40 to-slate-950/50 border-l-4 border-indigo-500 p-4 rounded-r-2xl">
              <span className="text-[10px] font-bold text-indigo-400 font-mono tracking-widest uppercase block mb-1">
                {t("MASS VS LIFESPAN RULE", "ទំនាក់ទំនងម៉ាស់ និងអាយុកាល")}
              </span>
              <span className="font-sans font-bold text-white text-xs sm:text-sm block leading-relaxed">
                {t("Higher Mass = Higher Core Temperature = Exponentially Faster Fuel Burn = Shorter Lifespan", "ម៉ាស់កាន់តែធំ = សីតុណ្ហភាពស្នូលកាន់តែខ្ពស់ = ដុតបំផ្លាញឥន្ធនៈលឿន = អាយុកាលខ្លីខ្លាំង")}
              </span>
            </div>

            {/* Static explanatory text */}
            <p
              className={`text-slate-400 ${isKh ? "font-khmer leading-loose" : "leading-relaxed text-sm"}`}
              style={{ fontSize: "max(0.95rem, 1.6vw)" }}
            >
              {t(
                "A star's life is a constant battle between gravity pulling inward and fusion energy pushing outward. Low-mass Red Dwarfs burn their hydrogen fuel so slowly that they can shine for trillions of years. In contrast, massive Blue Giants and Supergiants consume their core fuel in a furious rush, ending their volatile lives in just millions of years with catastrophic supernova blasts.",
                "ជីវិតរបស់ផ្កាយគឺជាសមរភូមិបន្តគ្នារវាងកម្លាំងទំនាញអូសចូលក្នុង និងថាមពលនុយក្លេអ៊ែរច្រានចេញក្រៅ។ ផ្កាយតឿក្រហមដែលមានម៉ាស់តូចបំផុតដុតអ៊ីដ្រូសែនយឺតខ្លាំង រហូតអាចបញ្ចេញពន្លឺបានរាប់លានលានឆ្នាំ។ ផ្ទុយទៅវិញ ផ្កាយយក្សខៀវ និងមហាយក្សដែលមានម៉ាស់ធំសម្បើម ដុតបំផ្លាញឥន្ធនៈស្នូលលឿនខ្លាំង ដែលធ្វើឲ្យពួកវាវិវត្តស្លាប់ក្នុងរយៈពេលតែប៉ុន្មានលានឆ្នាំប៉ុណ្ណោះ តាមរយៈការផ្ទុះស៊ុបពើណូវ៉ា។"
              )}
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
