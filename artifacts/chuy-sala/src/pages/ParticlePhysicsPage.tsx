import { useState, useEffect, useRef } from "react";
import { useLanguageStore } from "@/store/use-language";
import { Atom, Zap, Shield, Play } from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════
 * Types & Constants
 * ════════════════════════════════════════════════════════════════════════ */
type ParticleType = "Proton" | "Electron" | "Positron";

const PARTICLE_COLORS: Record<ParticleType, string> = {
  Proton: "#ef4444",   // Red
  Electron: "#3b82f6", // Blue
  Positron: "#eab308", // Yellow
};

const PARTICLE_MASS: Record<ParticleType, number> = {
  Proton: 938.27,      // MeV/c^2
  Electron: 0.511,     // MeV/c^2
  Positron: 0.511,     // MeV/c^2
};

/* ════════════════════════════════════════════════════════════════════════
 * Physics Math / Models
 * ════════════════════════════════════════════════════════════════════════ */
interface DrawableParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  label: string;
  life?: number; // for decaying or fading particles
  maxLife?: number;
}

/* ════════════════════════════════════════════════════════════════════════
 * Main Component
 * ════════════════════════════════════════════════════════════════════════ */
export default function ParticlePhysicsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // UI State
  const [particleA, setParticleA] = useState<ParticleType>("Proton");
  const [particleB, setParticleB] = useState<ParticleType>("Proton");
  const [status, setStatus] = useState<"idle" | "accelerating" | "collided">("idle");
  const [energyReadout, setEnergyReadout] = useState<string | null>(null);
  const [energyReadoutKh, setEnergyReadoutKh] = useState<string | null>(null);

  // Animation Refs
  const reqRef = useRef<number | undefined>(undefined);
  const stateRef = useRef<{
    pA: DrawableParticle | null;
    pB: DrawableParticle | null;
    scatter: DrawableParticle[];
  }>({
    pA: null,
    pB: null,
    scatter: [],
  });

  /* ════════════════════════════════════════════════════════════════════════
   * Collision Logic
   * ════════════════════════════════════════════════════════════════════════ */
  const triggerCollision = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;
    const newScatter: DrawableParticle[] = [];

    // Calculate total energy
    const totalMass = PARTICLE_MASS[particleA] + PARTICLE_MASS[particleB];
    // E = mc^2 + Kinetic. Let's invent a high kinetic energy for the collider.
    const kineticEnergy = 13000000; // e.g. LHC scale ~13 TeV = 13,000,000 MeV
    const totalEnergy = totalMass + kineticEnergy;

    if (particleA === "Proton" && particleB === "Proton") {
      setEnergyReadout(`Proton-Proton Collision! Total Energy: ~13 TeV. Protons shattered into Quarks and Gluons.`);
      setEnergyReadoutKh(`ការបុកគ្នាប្រូតុង-ប្រូតុង! ថាមពលសរុប៖ ~១៣ TeV។ ប្រូតុងបែកខ្ចាត់ខ្ចាយទៅជា Quarks និង Gluons។`);
      
      // Scatter Quarks (up/down) and Gluons
      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 8;
        const isGluon = Math.random() > 0.6;
        newScatter.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: isGluon ? 2 : 4,
          color: isGluon ? "#22c55e" : (Math.random() > 0.5 ? "#a855f7" : "#ec4899"), // Green gluons, purple/pink quarks
          label: isGluon ? "g" : (Math.random() > 0.5 ? "u" : "d"),
          life: 100 + Math.random() * 50,
          maxLife: 150
        });
      }
    } else if (
      (particleA === "Electron" && particleB === "Positron") ||
      (particleA === "Positron" && particleB === "Electron")
    ) {
      setEnergyReadout(`Matter-Antimatter Annihilation! E = mc². 100% of mass converted to energetic Photons (Gamma rays).`);
      setEnergyReadoutKh(`ការបំផ្លាញរូបធាតុ-អង្គធាតុផ្ទុយ! E = mc²។ ម៉ាស ១០០% ត្រូវបានបំប្លែងទៅជាថាមពលផូតុន (កាំរស្មីហ្គាម៉ា)។`);

      // 2 High energy back-to-back photons, plus maybe some lower energy scatter
      const angle = Math.random() * Math.PI;
      newScatter.push({
        x: cx, y: cy, vx: Math.cos(angle) * 12, vy: Math.sin(angle) * 12,
        radius: 3, color: "#fbbf24", label: "γ", life: 200, maxLife: 200
      });
      newScatter.push({
        x: cx, y: cy, vx: -Math.cos(angle) * 12, vy: -Math.sin(angle) * 12,
        radius: 3, color: "#fbbf24", label: "γ", life: 200, maxLife: 200
      });
      
      // Flash effect particle
      newScatter.push({
        x: cx, y: cy, vx: 0, vy: 0, radius: 50, color: "rgba(255,255,255,0.8)", label: "", life: 20, maxLife: 20
      });

    } else {
      setEnergyReadout(`Elastic Scattering. Particles repelled or deflected each other.`);
      setEnergyReadoutKh(`ការខ្ចាត់ខ្ចាយអេឡាស្ទិច។ ភាគល្អិតរុញច្រាន ឬងាកចេញពីគ្នា។`);
      
      // Bounce off each other
      const angle = (Math.random() * Math.PI) / 4;
      newScatter.push({
        x: cx, y: cy, vx: -Math.cos(angle) * 5, vy: -Math.sin(angle) * 5,
        radius: particleA === "Proton" ? 12 : 6, color: PARTICLE_COLORS[particleA], label: particleA[0], life: 300, maxLife: 300
      });
      newScatter.push({
        x: cx, y: cy, vx: Math.cos(angle) * 5, vy: Math.sin(angle) * 5,
        radius: particleB === "Proton" ? 12 : 6, color: PARTICLE_COLORS[particleB], label: particleB[0], life: 300, maxLife: 300
      });
    }

    stateRef.current.pA = null;
    stateRef.current.pB = null;
    stateRef.current.scatter = newScatter;
    setStatus("collided");
  };

  /* ════════════════════════════════════════════════════════════════════════
   * Animation Loop
   * ════════════════════════════════════════════════════════════════════════ */
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = "#0f172a"; // slate-900
    ctx.fillRect(0, 0, width, height);

    // Draw chamber rings
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) / 2 - 20, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) / 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    const state = stateRef.current;

    // Draw particles A and B
    [state.pA, state.pB].forEach(p => {
      if (!p) return;
      
      // Motion blur trail
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 10, p.y - p.vy * 10);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.radius;
      ctx.lineCap = "round";
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // Draw body
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // Label
      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(p.label, p.x, p.y);

      // Update position
      p.x += p.vx;
      p.y += p.vy;
    });

    // Collision Check
    if (status === "accelerating" && state.pA && state.pB) {
      const dx = state.pA.x - state.pB.x;
      const dy = state.pA.y - state.pB.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < state.pA.radius + state.pB.radius) {
        triggerCollision(ctx, width, height);
      }
    }

    // Draw Scatter
    for (let i = state.scatter.length - 1; i >= 0; i--) {
      const p = state.scatter[i];
      if (p.life !== undefined) {
        p.life--;
        if (p.life <= 0) {
          state.scatter.splice(i, 1);
          continue;
        }
      }

      ctx.globalAlpha = p.life && p.maxLife ? p.life / p.maxLife : 1.0;

      // Special handling for the flash
      if (p.label === "") {
        p.radius += 10;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      if (p.label) {
        ctx.fillStyle = "#fff";
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.label, p.x, p.y);
      }

      p.x += p.vx;
      p.y += p.vy;
    }
    ctx.globalAlpha = 1.0;

    reqRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    reqRef.current = requestAnimationFrame(draw);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [status]); // re-bind closure if needed

  /* ════════════════════════════════════════════════════════════════════════
   * Controls
   * ════════════════════════════════════════════════════════════════════════ */
  const handleCollide = () => {
    if (!canvasRef.current) return;
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    setEnergyReadout(null);
    setEnergyReadoutKh(null);
    setStatus("accelerating");

    stateRef.current.scatter = [];
    stateRef.current.pA = {
      x: 50,
      y: height / 2,
      vx: 15,
      vy: 0,
      radius: particleA === "Proton" ? 12 : 6,
      color: PARTICLE_COLORS[particleA],
      label: particleA[0],
    };
    stateRef.current.pB = {
      x: width - 50,
      y: height / 2,
      vx: -15,
      vy: 0,
      radius: particleB === "Proton" ? 12 : 6,
      color: PARTICLE_COLORS[particleB],
      label: particleB[0] + (particleB === "Positron" ? "+" : particleB === "Electron" ? "-" : "+"),
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-2">
            <Atom className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className={`text-4xl font-extrabold text-slate-900 tracking-tight ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ម៉ាស៊ីនបុកភាគល្អិត" : "Particle Collider"}
          </h1>
          <p className={`text-xl text-slate-600 max-w-2xl mx-auto ${isKh ? "font-khmer" : ""}`}>
            {isKh 
              ? "បុកភាគល្អិតអនុអាតូមក្នុងល្បឿនពន្លឺ។ សង្កេតមើលរូបធាតុ អង្គធាតុផ្ទុយ និងថាមពល E=mc²។"
              : "Smash subatomic particles at the speed of light. Observe matter, antimatter, and E=mc² in action."}
          </p>
        </div>

        {/* Main Interface */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          
          {/* Controls Bar */}
          <div className="bg-slate-800 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-col w-full sm:w-1/3">
              <label className={`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ភាគល្អិត ក" : "Particle A"}
              </label>
              <select 
                className="bg-slate-700 text-white border-none rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                value={particleA}
                onChange={(e) => setParticleA(e.target.value as ParticleType)}
                disabled={status === "accelerating"}
              >
                <option value="Proton">Proton (p+)</option>
                <option value="Electron">Electron (e-)</option>
                <option value="Positron">Positron (e+)</option>
              </select>
            </div>

            <button 
              onClick={handleCollide}
              disabled={status === "accelerating"}
              className="group relative flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white w-full sm:w-auto px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95 overflow-hidden"
            >
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className={isKh ? "font-khmer tracking-wider" : "tracking-wider"}>
                {isKh ? "បុក!" : "COLLIDE!"}
              </span>
            </button>

            <div className="flex flex-col w-full sm:w-1/3">
              <label className={`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ភាគល្អិត ខ" : "Particle B"}
              </label>
              <select 
                className="bg-slate-700 text-white border-none rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                value={particleB}
                onChange={(e) => setParticleB(e.target.value as ParticleType)}
                disabled={status === "accelerating"}
              >
                <option value="Proton">Proton (p+)</option>
                <option value="Electron">Electron (e-)</option>
                <option value="Positron">Positron (e+)</option>
              </select>
            </div>
            
          </div>

          {/* Canvas Container */}
          <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
            <canvas 
              ref={canvasRef}
              width={800}
              height={450}
              className="w-full h-full block"
            />
            {/* Overlay scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
          </div>

          {/* Readout Area */}
          <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200 min-h-[120px] flex items-center justify-center">
            {energyReadout ? (
              <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 text-center space-y-2">
                <p className="text-xl font-mono text-slate-800">
                  {isKh && energyReadoutKh ? energyReadoutKh : energyReadout}
                </p>
              </div>
            ) : (
              <div className="text-center text-slate-400 flex flex-col items-center gap-2">
                <Shield className="w-6 h-6" />
                <p className={`text-sm ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? "រង់ចាំការបុក..." : "Awaiting collision..."}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
