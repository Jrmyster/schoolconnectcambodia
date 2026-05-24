import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Play,
  Pause,
  Sliders,
  RotateCcw,
  Zap,
  HelpCircle,
  BookOpen,
  Activity,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";
import { useTranslation, useLanguageStore } from "@/store/use-language";

// ── Background and CSS Styles ──────────────────────────────────────────────
const PAGE_BG: React.CSSProperties = {
  backgroundColor: "#02120b", // Deep forest green black
  backgroundImage:
    "linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px), " +
    "linear-gradient(rgba(148, 163, 184, 0.02) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(148, 163, 184, 0.02) 1px, transparent 1px)",
  backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
};

const CARD_BG: React.CSSProperties = {
  backgroundColor: "rgba(6, 25, 17, 0.85)", // dark emerald-slate
  backgroundImage:
    "linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), " +
    "linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

function CornerMarks({ tone = "emerald" }: { tone?: "emerald" | "gold" }) {
  const cls = tone === "gold" ? "border-amber-500/60" : "border-emerald-500/60";
  return (
    <div className="contents">
      <span aria-hidden className={`pointer-events-none absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${cls}`} />
      <span aria-hidden className={`pointer-events-none absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${cls}`} />
      <span aria-hidden className={`pointer-events-none absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 ${cls}`} />
      <span aria-hidden className={`pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 ${cls}`} />
    </div>
  );
}

// ── Types for Spark Plug Part ───────────────────────────────────────────────
type PartKey = "terminal" | "insulator" | "shell" | "center" | "ground" | "gap";

interface PartDescription {
  nameEn: string;
  nameKh: string;
  descEn: string;
  descKh: string;
}

const SPARK_PLUG_PARTS: Record<PartKey, PartDescription> = {
  terminal: {
    nameEn: "Terminal",
    nameKh: "ក្បាលតំណភ្ជាប់ (Terminal)",
    descEn: "The top connector where the high-voltage wire from the ignition coil attaches. It receives the 20,000V+ electrical pulse.",
    descKh: "ក្បាលតំណភ្ជាប់ផ្នែកខាងលើដែលខ្សែវ៉ុលខ្ពស់ពីប៊ូប៊ីនបញ្ឆេះមកភ្ជាប់។ វាទទួលចរន្តអគ្គិសនីកម្រិត ២០,០០០ វ៉ុលឡើងទៅ។",
  },
  insulator: {
    nameEn: "Ceramic Insulator",
    nameKh: "អាំងស៊ុយឡង់សេរ៉ាមិច (Insulator)",
    descEn: "Made of aluminum oxide ceramic, it prevents the high voltage from shorting to the engine block, shielding the center electrode and guiding current safely down.",
    descKh: "ធ្វើពីសេរ៉ាមិចអាលុយមីញ៉ូមអុកស៊ីត ការពារកុំឱ្យចរន្តវ៉ុលខ្ពស់ឆ្លងទៅតួម៉ាស៊ីន ដោយរុំព័ទ្ធអេឡិចត្រូតកណ្ដាល និងនាំចរន្តចុះក្រោមដោយសុវត្ថិភាព។",
  },
  shell: {
    nameEn: "Hex Nut & Metal Shell",
    nameKh: "សំបកដែក និងក្បាលមូល (Hex Shell)",
    descEn: "The steel threaded body screwed into the cylinder head. It provides a tight gas seal and grounds the plug to the engine block.",
    descKh: "តួដែកមានធ្មេញរមួលសម្រាប់ខ្ចៅភ្ជាប់ទៅក្បាលស៊ីឡាំង។ វាផ្ដល់នូវភាពហាប់ណែនការពារការលេចធ្លាយហ្គាស និងភ្ជាប់ម៉ាសរបស់ប៊ូហ្គីទៅនឹងតួម៉ាស៊ីន។",
  },
  center: {
    nameEn: "Center Electrode",
    nameKh: "អេឡិចត្រូតកណ្ដាល (Center Electrode)",
    descEn: "The inner copper-alloy core insulated in the middle. It carries the high-voltage electrical pulse straight down to the spark gap.",
    descKh: "ស្នូលលោហៈចម្លងចរន្តខាងក្នុងដែលត្រូវបានការពារកណ្តាល។ វានាំចរន្តវ៉ុលខ្ពស់ចុះទៅក្រោមត្រង់ទៅកាន់ចន្លោះផ្កាភ្លើង។",
  },
  ground: {
    nameEn: "Ground Electrode",
    nameKh: "អេឡិចត្រូតម៉ាស (Ground Electrode)",
    descEn: "The curved steel arm welded to the metal shell bottom. It forms the return path for the spark, bent exactly over the center electrode.",
    descKh: "ដៃដែកកោងដែលផ្សារភ្ជាប់ទៅនឹងសំបកដែកខាងក្រោម។ វាបង្កើតជាផ្លូវចរន្តត្រឡប់សម្រាប់ផ្កាភ្លើង ដោយកោងពីលើអេឡិចត្រូតកណ្ដាលច្បាស់លាស់។",
  },
  gap: {
    nameEn: "Spark Gap",
    nameKh: "ចន្លោះផ្កាភ្លើង (Spark Gap)",
    descEn: "The air gap (typically 0.8mm - 1.2mm) between electrodes. Voltage builds up here until it breaches air insulation, firing the spark.",
    descKh: "ចន្លោះខ្យល់ (ជាទូទៅ ០.៨ - ១.២ មីលីម៉ែត្រ) រវាងអេឡិចត្រូតទាំងពីរ។ វ៉ុលអគ្គិសនីកើនឡើងនៅទីនេះរហូតដល់វាទម្លាយរបាំងខ្យល់ បង្កើតជាផ្កាភ្លើង។",
  },
};

export default function SparkPlugsPage() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  // Animation States
  const [isPlaying, setIsPlaying] = useState(true);
  const [rpm, setRpm] = useState(120); // range 60 to 1200 RPM
  const [theta, setTheta] = useState(0); // 0 to 4*pi (represents 720 degrees)
  const [activePart, setActivePart] = useState<PartKey>("terminal");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const anatomyCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const thetaRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const animationFrameIdRef = useRef<number | null>(null);

  // Stroke math details
  const deg = (theta * 180 / Math.PI) % 720;
  
  // Determine current stroke index (0: Intake, 1: Compression, 2: Power, 3: Exhaust)
  let currentStroke = 0;
  if (theta >= 0 && theta < Math.PI) currentStroke = 0;
  else if (theta >= Math.PI && theta < 2 * Math.PI) currentStroke = 1;
  else if (theta >= 2 * Math.PI && theta < 3 * Math.PI) currentStroke = 2;
  else currentStroke = 3;

  const isSparkActive = theta >= 2 * Math.PI && theta < 2 * Math.PI + 0.15;

  // Handle Play/Pause
  useEffect(() => {
    lastTimeRef.current = performance.now();
    
    const loop = (time: number) => {
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (isPlaying) {
        // RPS = RPM / 60
        // Radians per second = RPS * 2 * pi
        const radPerSec = (rpm / 60) * 2 * Math.PI;
        thetaRef.current = (thetaRef.current + radPerSec * dt) % (4 * Math.PI);
        setTheta(thetaRef.current);
      }
      
      drawCylinder();
      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPlaying, rpm]);

  // Redraw when theta or dimensions change (for manual adjustment)
  useEffect(() => {
    drawCylinder();
  }, [theta]);

  // Drawing the 2D Engine Cylinder
  const drawCylinder = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // 1. Clear & draw blueprint dark background
    ctx.fillStyle = "#011f12"; // Deep green blackboard
    ctx.fillRect(0, 0, width, height);

    // Faint grid lines
    ctx.strokeStyle = "rgba(16, 185, 129, 0.05)";
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Geometry parameters
    const centerX = width / 2;
    const boreWidth = 140;
    const tdc = 90;
    const leftWall = centerX - boreWidth / 2;
    const rightWall = centerX + boreWidth / 2;

    const crankX = centerX;
    const crankY = 325;
    const crankRadius = 38;
    const conRodLength = 110;

    // Crank calculations
    // Use negative cos so it starts at TDC (top) at theta = 0
    const pinX = crankX + crankRadius * Math.sin(theta);
    const pinY = crankY - crankRadius * Math.cos(theta);

    // Piston wrist pin coordinates
    const conRodX = centerX;
    const dx = pinX - conRodX;
    const conRodY = pinY - Math.sqrt(conRodLength * conRodLength - dx * dx);

    const pistonHeight = 45;
    const pistonWidth = boreWidth - 4;
    const pistonTopY = conRodY - 20;

    // 2. Draw fuel-air mixture or fire gradients inside chamber (Y: 60 to pistonTopY)
    if (pistonTopY > 60) {
      if (currentStroke === 0) {
        // Intake stroke (Drawing blue gas mist)
        const intakeGrad = ctx.createLinearGradient(centerX - 35, 60, centerX, pistonTopY);
        intakeGrad.addColorStop(0, "rgba(56, 189, 248, 0.5)"); // Sky blue
        intakeGrad.addColorStop(1, "rgba(56, 189, 248, 0.05)");
        ctx.fillStyle = intakeGrad;
        ctx.fillRect(leftWall + 2, 60, boreWidth - 4, pistonTopY - 60);

        // Spray particles from intake valve
        ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
        ctx.lineWidth = 2;
        const sprayProgress = Math.sin(theta); // smoothly fluctuates
        for (let angle = 0.1; angle < 1.1; angle += 0.3) {
          ctx.beginPath();
          ctx.moveTo(centerX - 35, 60);
          ctx.lineTo(
            centerX - 35 + Math.cos(angle + Math.PI / 4) * 55 * sprayProgress,
            60 + Math.sin(angle + Math.PI / 4) * 55 * sprayProgress
          );
          ctx.stroke();
        }
      } else if (currentStroke === 1) {
        // Compression stroke (Dense compressed gas)
        const compProgress = (pistonTopY - 70) / (200 - 70); // 0 at top, 1 at bottom
        const density = 0.15 + (1 - compProgress) * 0.5; // denser as piston climbs
        ctx.fillStyle = `rgba(56, 189, 248, ${density})`;
        ctx.fillRect(leftWall + 2, 60, boreWidth - 4, pistonTopY - 60);
      } else if (currentStroke === 2) {
        // Power Stroke (Combustion flame)
        const progress = (theta - 2 * Math.PI) / Math.PI; // 0 to 1
        const flameOpacity = 0.95 * (1 - progress);
        const flameHeight = (pistonTopY - 60) * Math.min(1.0, progress * 2.0);

        const flameGrad = ctx.createLinearGradient(centerX, 60, centerX, 60 + flameHeight);
        flameGrad.addColorStop(0, `rgba(239, 68, 68, ${flameOpacity})`); // Red-orange at plug
        flameGrad.addColorStop(0.3, `rgba(249, 115, 22, ${flameOpacity * 0.95})`); // Orange
        flameGrad.addColorStop(0.75, `rgba(234, 179, 8, ${flameOpacity * 0.8})`); // Yellow
        flameGrad.addColorStop(1.0, "rgba(234, 179, 8, 0)");

        ctx.fillStyle = flameGrad;
        ctx.fillRect(leftWall + 2, 60, boreWidth - 4, pistonTopY - 60);

        // Scattered combustion sparkles
        ctx.fillStyle = `rgba(255, 245, 158, ${flameOpacity})`;
        for (let i = 0; i < 6; i++) {
          const sparkX = leftWall + 10 + Math.random() * (boreWidth - 20);
          const sparkY = 65 + Math.random() * (pistonTopY - 80) * Math.min(1, progress * 1.5);
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 2 + Math.random() * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (currentStroke === 3) {
        // Exhaust stroke (Exhaust smoke)
        const progress = (theta - 3 * Math.PI) / Math.PI; // 0 to 1
        const smokeOpacity = 0.5 * (1 - progress);
        ctx.fillStyle = `rgba(115, 115, 115, ${smokeOpacity})`; // gray smoke
        ctx.fillRect(leftWall + 2, 60, boreWidth - 4, pistonTopY - 60);

        // Exhaust exit path drawing
        ctx.strokeStyle = `rgba(140, 140, 140, ${smokeOpacity * 0.9})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX + 35, 60);
        // Curve out towards top right
        ctx.bezierCurveTo(centerX + 40, 30, centerX + 55, 20, centerX + 70 + progress * 20, 10);
        ctx.stroke();
      }
    }

    // 3. Draw Cylinder Sleeve/Block walls
    ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    // Left sleeve
    ctx.moveTo(leftWall, 45);
    ctx.lineTo(leftWall, 265);
    // Right sleeve
    ctx.moveTo(rightWall, 45);
    ctx.lineTo(rightWall, 265);
    // Flat top head
    ctx.moveTo(leftWall, 60);
    ctx.lineTo(rightWall, 60);
    ctx.stroke();

    // 4. Draw valves
    // Intake valve opens during Intake (0 to pi), Exhaust opens during Exhaust (3*pi to 4*pi)
    let intakeOffset = 0;
    if (currentStroke === 0) {
      intakeOffset = Math.sin(theta) * 12; // slides down up to 12px
    }
    let exhaustOffset = 0;
    if (currentStroke === 3) {
      exhaustOffset = Math.sin(theta - 3 * Math.PI) * 12;
    }

    const intakeValY = 60 + intakeOffset;
    const exhaustValY = 60 + exhaustOffset;

    // Draw Intake Valve (left, X: centerX - 35)
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX - 35, 20);
    ctx.lineTo(centerX - 35, intakeValY);
    ctx.moveTo(centerX - 50, intakeValY);
    ctx.lineTo(centerX - 20, intakeValY);
    ctx.stroke();

    // Draw Exhaust Valve (right, X: centerX + 35)
    ctx.strokeStyle = "#ef4444"; // red accent for hot exhaust
    ctx.beginPath();
    ctx.moveTo(centerX + 35, 20);
    ctx.lineTo(centerX + 35, exhaustValY);
    ctx.moveTo(centerX + 20, exhaustValY);
    ctx.lineTo(centerX + 50, exhaustValY);
    ctx.stroke();

    // 5. Draw Spark Plug at top center
    const plugX = centerX;
    const plugY = 60;

    // Metal body threads Y: 40 to 60
    ctx.fillStyle = "#374151";
    ctx.fillRect(plugX - 6, plugY - 20, 12, 20);
    ctx.strokeStyle = "#4b5563";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(plugX - 6, plugY - 16 + i * 4);
      ctx.lineTo(plugX + 6, plugY - 16 + i * 4);
      ctx.stroke();
    }

    // White ceramic body Y: 15 to 40
    ctx.fillStyle = "#f3f4f6";
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(plugX - 8, plugY - 45, 16, 25, 2);
    ctx.fill();
    ctx.stroke();

    // Insulator ribs
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(plugX - 9, plugY - 40 + i * 6);
      ctx.lineTo(plugX + 9, plugY - 40 + i * 6);
      ctx.stroke();
    }

    // Gold brass terminal cap
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.arc(plugX, plugY - 47, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Center Electrode rod
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(plugX, plugY);
    ctx.lineTo(plugX, plugY + 3);
    ctx.stroke();

    // Ground Electrode prong
    ctx.strokeStyle = "#6b7280";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(plugX - 5, plugY);
    ctx.lineTo(plugX - 5, plugY + 5.5);
    ctx.lineTo(plugX - 2, plugY + 5.5);
    ctx.stroke();

    // 6. Draw Spark Plug Ignition Flash (Spark active at start of power stroke)
    if (isSparkActive) {
      // Draw 2-3 jagged blue/white sparks in gap
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 8;
      
      ctx.beginPath();
      ctx.moveTo(plugX, plugY + 3);
      // Random wiggle
      const midX = plugX - 2.5 + Math.random() * 2;
      const midY = plugY + 4.5;
      ctx.lineTo(midX, midY);
      ctx.lineTo(plugX - 3, plugY + 5.5);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // White flash halo
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.arc(plugX - 2.5, plugY + 4.5, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    // 7. Draw Crankcase axle and Counterweight
    ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(crankX, crankY, 65, 0, Math.PI * 2);
    ctx.stroke();

    // Rotating crankshaft counterweight
    ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const backX = crankX - crankRadius * Math.sin(theta);
    const backY = crankY + crankRadius * Math.cos(theta);
    // Draw counterweight lobe opposite the pin
    ctx.arc(backX, backY, 22, theta + Math.PI / 2, theta - Math.PI / 2);
    ctx.lineTo(pinX, pinY);
    ctx.arc(pinX, pinY, 9, theta - Math.PI / 2, theta + Math.PI / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Center Main Journal
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(crankX, crankY, 12, 0, Math.PI * 2);
    ctx.fill();

    // 8. Draw Connecting Rod
    ctx.strokeStyle = "#a7f3d0";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(conRodX, conRodY);
    ctx.lineTo(pinX, pinY);
    ctx.stroke();

    // Bearings / Pin caps
    ctx.fillStyle = "#34d399";
    ctx.beginPath();
    ctx.arc(conRodX, conRodY, 4.5, 0, Math.PI * 2);
    ctx.arc(pinX, pinY, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // 9. Draw Piston Head
    ctx.fillStyle = "#064e3b"; // dark forest green
    ctx.strokeStyle = "#34d399";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(centerX - pistonWidth / 2, pistonTopY, pistonWidth, pistonHeight, [5, 5, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // Draw Piston Pin boss
    ctx.fillStyle = "rgba(16, 185, 129, 0.5)";
    ctx.beginPath();
    ctx.arc(conRodX, conRodY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Piston ring grooves
    ctx.strokeStyle = "rgba(2, 44, 34, 0.9)";
    ctx.lineWidth = 1.5;
    for (let i = 1; i <= 3; i++) {
      const ringY = pistonTopY + 8 + i * 5;
      ctx.beginPath();
      ctx.moveTo(centerX - pistonWidth / 2, ringY);
      ctx.lineTo(centerX - pistonWidth / 2 + 8, ringY);
      ctx.moveTo(centerX + pistonWidth / 2, ringY);
      ctx.lineTo(centerX + pistonWidth / 2 - 8, ringY);
      ctx.stroke();
    }
  };

  // Drawing the Spark Plug Anatomy Diagram
  useEffect(() => {
    drawAnatomy();
  }, [activePart]);

  const drawAnatomy = () => {
    const canvas = anatomyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.fillStyle = "#02120b";
    ctx.fillRect(0, 0, width, height);

    // Blueprint grids (very faint)
    ctx.strokeStyle = "rgba(16, 185, 129, 0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 15) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const cx = width / 2;
    const startY = 40;

    // Map Y ranges for drawing highlights
    // 1. Terminal: Y: 25 to 45
    // 2. Insulator: Y: 45 to 155
    // 3. Hex/Shell: Y: 155 to 240
    // 4. Thread: Y: 240 to 300
    // 5. Center Electrode: Y: 300 to 335
    // 6. Ground & Gap: Y: 330 to 350

    // Drawing Glow Halo if hovered
    const drawGlow = (yMin: number, yMax: number, r: number) => {
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.roundRect(cx - r - 4, yMin - 4, (r + 4) * 2, yMax - yMin + 8, 4);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    };

    if (activePart === "terminal") drawGlow(15, 45, 10);
    if (activePart === "insulator") drawGlow(45, 155, 18);
    if (activePart === "shell") drawGlow(155, 235, 22);
    if (activePart === "center") drawGlow(298, 335, 6);
    if (activePart === "ground") drawGlow(330, 350, 12);
    if (activePart === "gap") drawGlow(332, 339, 8);

    // ── DRAW SPARK PLUG ──

    // Center Electrode line (internal, drawn behind shell but visible at bottom)
    ctx.strokeStyle = "#fca5a5"; // red center core
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, 30);
    ctx.lineTo(cx, 332);
    ctx.stroke();

    // Gold brass terminal cap (Y: 20-30)
    ctx.fillStyle = "#d97706";
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx - 5, 20, 10, 12, 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, 20, 3, 0, Math.PI * 2);
    ctx.fill();

    // Ceramic Insulator (Y: 32-155)
    ctx.fillStyle = "#f9fafb";
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // main body
    ctx.roundRect(cx - 12, 45, 24, 110, 2);
    ctx.fill();
    ctx.stroke();

    // Insulator ribbed teeth
    const ribY = [55, 67, 79, 91, 103];
    ctx.fillStyle = "#f3f4f6";
    ribY.forEach((ry) => {
      ctx.beginPath();
      ctx.roundRect(cx - 15, ry, 30, 6, 2);
      ctx.fill();
      ctx.stroke();
    });

    // Shell hex nut block (Y: 155-195)
    ctx.fillStyle = "#4b5563";
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cx - 20, 155, 40, 25, 3);
    ctx.fill();
    ctx.stroke();
    // Hex nut lines
    ctx.strokeStyle = "#374151";
    ctx.beginPath();
    ctx.moveTo(cx - 7, 155);
    ctx.lineTo(cx - 7, 180);
    ctx.moveTo(cx + 7, 155);
    ctx.lineTo(cx + 7, 180);
    ctx.stroke();

    // Metal shell body extending down (Y: 180-235)
    ctx.fillStyle = "#374151";
    ctx.strokeStyle = "#1f2937";
    ctx.beginPath();
    ctx.roundRect(cx - 14, 180, 28, 55, 2);
    ctx.fill();
    ctx.stroke();

    // Thread sections (Y: 235-298)
    ctx.fillStyle = "#4b5563";
    ctx.fillRect(cx - 12, 235, 24, 63);
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      ctx.moveTo(cx - 12, 241 + i * 6);
      ctx.lineTo(cx + 12, 241 + i * 6);
      ctx.stroke();
    }

    // Lower ceramic sheath protruding (Y: 298-325)
    ctx.fillStyle = "#e5e7eb";
    ctx.strokeStyle = "#9ca3af";
    ctx.beginPath();
    ctx.roundRect(cx - 6, 298, 12, 27, [0, 0, 3, 3]);
    ctx.fill();
    ctx.stroke();

    // Center Electrode Tip protruding (Y: 325-332)
    ctx.fillStyle = "#fca5a5"; // center electrode material
    ctx.strokeStyle = "#ef4444";
    ctx.beginPath();
    ctx.fillRect(cx - 2, 325, 4, 7);
    ctx.stroke();

    // Ground electrode curved prong (Y: 298 to 337, bent to cx)
    ctx.strokeStyle = "#1f2937";
    ctx.lineWidth = 3;
    ctx.lineCap = "square";
    ctx.beginPath();
    // starts at shell corner
    ctx.moveTo(cx - 12, 298);
    ctx.lineTo(cx - 12, 337);
    ctx.lineTo(cx - 1, 337);
    ctx.stroke();

    // Labeled overlay text directly on Canvas
    ctx.fillStyle = "rgba(16, 185, 129, 0.4)";
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 1;
    
    // Draw indicator dotted lines from components to sides
    const drawLabelLine = (xStart: number, yVal: number, isLeft: boolean, text: string) => {
      ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(xStart, yVal);
      const xEnd = isLeft ? 15 : width - 15;
      ctx.lineTo(xEnd, yVal);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      ctx.fillStyle = "rgba(16, 185, 129, 0.85)";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = isLeft ? "left" : "right";
      ctx.fillText(text.toUpperCase(), isLeft ? 18 : width - 18, yVal + 3);
    };

    drawLabelLine(cx - 6, 27, true, "12V/20KV+ In");
    drawLabelLine(cx + 12, 90, false, "INSULATOR");
    drawLabelLine(cx - 20, 168, true, "HEX BODY");
    drawLabelLine(cx + 12, 260, false, "THREADS");
    drawLabelLine(cx - 6, 328, true, "CENTER (-) ");
    drawLabelLine(cx - 1, 337, false, "GROUND (+)");
  };

  // Step-by-step trigger clicks
  const triggerStep = (strokeIndex: number) => {
    setIsPlaying(false);
    
    // Exact starting crank angles for the 4 strokes:
    // Intake: 0, Compression: pi, Power: 2*pi, Exhaust: 3*pi
    if (strokeIndex === 0) {
      thetaRef.current = 0.5 * Math.PI; // Mid-intake
    } else if (strokeIndex === 1) {
      thetaRef.current = 1.5 * Math.PI; // Mid-compression
    } else if (strokeIndex === 2) {
      thetaRef.current = 2.0 * Math.PI; // Start-power (fires spark instantly!)
    } else {
      thetaRef.current = 3.5 * Math.PI; // Mid-exhaust
    }
    setTheta(thetaRef.current);
  };

  return (
    <div className="min-h-screen text-slate-100 py-10 sm:py-12 px-4 sm:px-6" style={PAGE_BG} data-testid="spark-plugs-module">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <Link
          href="/technology/automotive"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-100 transition-colors mb-6 ${
            isKh ? "font-khmer" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Back to How Cars Work", "ត្រឡប់ទៅ របៀបដែលឡានដំណើរការ")}
        </Link>

        {/* ─── Hero Header ─────────────────────────────────────────────────── */}
        <header
          className="relative overflow-hidden rounded-3xl px-6 sm:px-10 py-9 sm:py-11 mb-10 shadow-2xl border border-emerald-800/40"
          style={CARD_BG}
        >
          <CornerMarks />
          <div className="relative flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border-2 border-emerald-400/60 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Zap className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-400 mb-2 ${
                  isKh ? "font-khmer normal-case tracking-normal text-xs" : ""
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>{t("Technology", "បច្ចេកវិទ្យា")}</span>
                <span className="opacity-40">/</span>
                <span className="text-emerald-300">TEC-SPARK</span>
                <span className="opacity-40">/</span>
                <span className="text-slate-400">20,000V {t("ignition", "បញ្ឆេះ")}</span>
              </div>
              
              <h1
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-slate-50 ${
                  isKh ? "font-khmer leading-snug" : ""
                }`}
              >
                {t("How Spark Plugs Work", "របៀបដែលប៊ូហ្គីដំណើរការ")}
              </h1>
              
              <p
                className={`mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed ${
                  isKh ? "font-khmer leading-loose" : ""
                }`}
              >
                {t(
                  "Deep inside a gasoline engine, a tiny component creates a bolt of lightning up to 50 times a second to ignite compressed fuel. Explore the interactive 4-stroke cycle and learn the physics behind the spark plug anatomy.",
                  "នៅផ្នែកខាងក្នុងបំផុតនៃម៉ាស៊ីនសាំង គ្រឿងបង្គុំតូចមួយបង្កើតផ្កាភ្លើងអគ្គិសនីរហូតដល់ ៥០ ដងក្នុងមួយវិនាទី ដើម្បីដុតបញ្ឆេះឥន្ធនៈដែលបានច្របាច់។ រុករកវដ្ត ៤ ជំហានអន្តរកម្ម និងស្វែងយល់ពីរូបវិទ្យានៅពីក្រោយកាយវិភាគសាស្ត្រនៃប៊ូហ្គី។"
                )}
              </p>
            </div>
          </div>
        </header>

        {/* ─── Main Section: Simulation & Status Scoreboard ─────────────────── */}
        <section className="grid lg:grid-cols-5 gap-6 mb-8">
          
          {/* Left Column: Canvas + Controls */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* 2D Canvas Container */}
            <div className="relative rounded-3xl overflow-hidden border border-emerald-800/40 shadow-inner bg-slate-950 flex justify-center items-center">
              <canvas
                ref={canvasRef}
                width={380}
                height={400}
                className="w-full max-w-[380px] block"
              />
              
              {/* Overlay active stroke badge */}
              <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-400 select-none">
                {currentStroke === 0 && t("1. Intake Stroke", "១. វគ្គស្រូបចូល")}
                {currentStroke === 1 && t("2. Compression Stroke", "២. វគ្គច្របាច់")}
                {currentStroke === 2 && t("3. Power Stroke", "៣. វគ្គផ្ទុះ")}
                {currentStroke === 3 && t("4. Exhaust Stroke", "៤. វគ្គបញ្ចេញ")}
              </div>

              {/* Spark Plug active flash alert overlay */}
              {isSparkActive && (
                <div className="absolute top-4 right-4 bg-amber-500/20 backdrop-blur-md border border-amber-500/60 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-amber-300 animate-pulse">
                  ⚡ {t("Spark Fired!", "បាញ់ផ្កាភ្លើង!")}
                </div>
              )}
            </div>

            {/* Simulation Controls Panel */}
            <div
              className="relative rounded-3xl p-5 border border-emerald-800/30 shadow-lg"
              style={CARD_BG}
            >
              <CornerMarks />
              
              {/* Play / Pause row */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
                  </button>
                  <div>
                    <h3 className={`text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase ${isKh ? "font-khmer tracking-normal" : ""}`}>
                      {isPlaying ? t("Simulation Active", "ការក្លែងសាកល្បងសកម្ម") : t("Simulation Paused", "ការក្លែងសាកល្បងផ្អាក")}
                    </h3>
                    <p className={`text-[10px] text-slate-400 ${isKh ? "font-khmer" : ""}`}>
                      {isPlaying ? t("Engine cycling continuously", "ម៉ាស៊ីនដំណើរការបន្តបន្ទាប់") : t("Adjust crankshaft position manually", "កែតម្រូវចលនាដោយដៃ")}
                    </p>
                  </div>
                </div>

                {/* Step-by-Step label */}
                <div className={`text-[11px] font-mono uppercase bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg ${isKh ? "font-khmer normal-case tracking-normal text-xs" : ""}`}>
                  {t("Step Mode Available", "របៀបសិក្សាមួយជំហានម្ដងៗ")}
                </div>
              </div>

              {/* Dynamic sliders (RPM if playing, Manual Crank Angle if paused) */}
              <div className="space-y-4">
                {isPlaying ? (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="rpm-slider" className={`text-xs font-bold text-slate-300 flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
                        <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                        {t("Engine RPM (Speed)", "ល្បឿនម៉ាស៊ីន (RPM)")}
                      </label>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-emerald-800/30">
                        {rpm} RPM
                      </span>
                    </div>
                    <input
                      id="rpm-slider"
                      type="range"
                      min="60"
                      max="1200"
                      step="60"
                      value={rpm}
                      onChange={(e) => setRpm(parseInt(e.target.value))}
                      className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-colors"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                      <span>60 RPM (Slow)</span>
                      <span>1200 RPM (Fast)</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="crank-slider" className={`text-xs font-bold text-slate-300 flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
                        <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                        {t("Manual Crank Angle", "មុំវិលចង្កឹះក្បាល (Crank Angle)")}
                      </label>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-emerald-800/30">
                        {Math.round(deg)}° / 720°
                      </span>
                    </div>
                    <input
                      id="crank-slider"
                      type="range"
                      min="0"
                      max="719"
                      step="1"
                      value={Math.round(deg)}
                      onChange={(e) => {
                        const degVal = parseInt(e.target.value);
                        thetaRef.current = (degVal * Math.PI) / 180;
                        setTheta(thetaRef.current);
                      }}
                      className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 transition-colors"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                      <span>0° (TDC - Intake)</span>
                      <span>360° (TDC - Ignition)</span>
                      <span>720° (Cycle End)</span>
                    </div>
                  </div>
                )}

                {/* Step-by-Step buttons */}
                <div className="pt-3 border-t border-emerald-800/20">
                  <span className={`block text-[10px] font-mono uppercase text-emerald-500/80 mb-2 ${isKh ? "font-khmer normal-case tracking-normal" : ""}`}>
                    {t("Ignition Step Selector:", "ជ្រើសរើសវគ្គបញ្ឆេះមួយជំហានម្ដងៗ៖")}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { idx: 0, en: "1. Intake", kh: "១. ស្រូបចូល" },
                      { idx: 1, en: "2. Compress", kh: "២. ច្របាច់" },
                      { idx: 2, en: "3. Power (Spark)", kh: "៣. ផ្ទុះ (បាញ់ផ្កាភ្លើង)" },
                      { idx: 3, en: "4. Exhaust", kh: "៤. បញ្ចេញ" },
                    ].map((step) => (
                      <button
                        key={step.idx}
                        type="button"
                        onClick={() => triggerStep(step.idx)}
                        className={`text-xs font-semibold px-2 py-2 rounded-lg border text-center transition-all focus:outline-none ${
                          currentStroke === step.idx
                            ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow shadow-emerald-500/30 font-bold"
                            : "bg-slate-950/60 text-slate-300 border-emerald-800/30 hover:border-emerald-600/40 hover:bg-slate-900/60"
                        } ${isKh ? "font-khmer text-[11px]" : ""}`}
                      >
                        {isKh ? step.kh : step.en}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Status Dashboard & Explanation */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            
            {/* Live Stats Scoreboard */}
            <div
              className="relative rounded-3xl p-5 border border-emerald-800/30 shadow-lg flex-grow flex flex-col justify-between"
              style={CARD_BG}
            >
              <CornerMarks />
              
              <div>
                <h3 className={`text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase mb-4 ${isKh ? "font-khmer tracking-normal" : ""}`}>
                  {t("Live Engine Status", "ស្ថានភាពម៉ាស៊ីនផ្ទាល់")}
                </h3>
                
                {/* SVG Dial and text info */}
                <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-emerald-800/20 mb-4">
                  {/* Circular Dial SVG */}
                  <svg className="w-24 h-24 flex-shrink-0" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="6" />
                    
                    {/* Stroke Arc Sectors (90deg / pi/2 sectors representing each stroke) */}
                    {/* Intake: 0 to 90deg (in SVG rotation) */}
                    <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="8"
                            strokeDasharray="72 288" strokeDashoffset="72" />
                    {/* Compression: 90 to 180deg */}
                    <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="8"
                            strokeDasharray="72 288" strokeDashoffset="0" />
                    {/* Power: 180 to 270deg */}
                    <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="8"
                            strokeDasharray="72 288" strokeDashoffset="288" />
                    {/* Exhaust: 270 to 360deg */}
                    <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(115, 115, 115, 0.5)" strokeWidth="8"
                            strokeDasharray="72 288" strokeDashoffset="216" />

                    {/* Labeled Degree in Center */}
                    <text x="60" y="58" fill="#a7f3d0" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      {Math.round(deg)}°
                    </text>
                    <text x="60" y="70" fill="rgba(167, 243, 208, 0.6)" fontSize="7" fontFamily="monospace" textAnchor="middle">
                      CYC-POS
                    </text>

                    {/* Rotating Indicator Arrow */}
                    {/* Vector pointer rotated by current angle */}
                    <g transform={`rotate(${deg}, 60, 60)`}>
                      <line x1="60" y1="60" x2="60" y2="12" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                      <polygon points="60,8 57,14 63,14" fill="#fbbf24" />
                    </g>
                  </svg>
                  
                  {/* Quick readout specs */}
                  <div className="flex-1 space-y-2 text-xs font-mono">
                    <div className="flex justify-between border-b border-emerald-900/30 pb-1">
                      <span className="text-slate-400">{t("Piston:", "ពីស្តុង៖")}</span>
                      <span className="text-white font-bold">
                        {currentStroke === 0 || currentStroke === 2 ? (
                          <span className="text-emerald-400">↓ {t("Downward", "ចុះក្រោម")}</span>
                        ) : (
                          <span className="text-emerald-400">↑ {t("Upward", "ឡើងលើ")}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-emerald-900/30 pb-1">
                      <span className="text-slate-400">{t("Intake Valve:", "សន្ទះស្រូប៖")}</span>
                      <span className={currentStroke === 0 ? "text-emerald-400 font-bold" : "text-slate-400"}>
                        {currentStroke === 0 ? t("OPEN", "បើក") : t("CLOSED", "បិទ")}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-emerald-900/30 pb-1">
                      <span className="text-slate-400">{t("Exhaust Valve:", "សន្ទះបញ្ចេញ៖")}</span>
                      <span className={currentStroke === 3 ? "text-red-400 font-bold" : "text-slate-400"}>
                        {currentStroke === 3 ? t("OPEN", "បើក") : t("CLOSED", "បិទ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t("Spark Plug:", "ប៊ូហ្គី៖")}</span>
                      <span className={isSparkActive ? "text-amber-400 font-bold animate-pulse" : "text-slate-400"}>
                        {isSparkActive ? t("SPARKING", "បាញ់ផ្កាភ្លើង") : (currentStroke === 2 && theta < 2.5 * Math.PI ? t("COMBUSTION", "កំពុងឆេះ") : t("STANDBY", "រង់ចាំ"))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Educational text explanation card */}
                <div className="bg-emerald-950/40 rounded-2xl p-4 border border-emerald-800/25">
                  <h4 className={`text-sm font-bold text-slate-200 mb-1 flex items-center gap-1.5 ${isKh ? "font-khmer" : ""}`}>
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    {currentStroke === 0 && t("1. Intake Stroke (Suck)", "១. វគ្គស្រូបចូល (ស្រូប)")}
                    {currentStroke === 1 && t("2. Compression Stroke (Squeeze)", "២. វគ្គច្របាច់ (ច្របាច់)")}
                    {currentStroke === 2 && t("3. Power Stroke (Bang)", "៣. វគ្គផ្ទុះ (ផ្ទុះ)")}
                    {currentStroke === 3 && t("4. Exhaust Stroke (Blow)", "៤. វគ្គបញ្ចេញ (ផ្លុំ)")}
                  </h4>
                  <p className={`text-xs text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {currentStroke === 0 && t(
                      "The piston moves down, creating a vacuum inside the cylinder. The intake valve opens, drawing in a fresh mixture of vaporized gasoline and air from the intake manifold.",
                      "ពីស្តុងរំកិលចុះក្រោម បង្កើតកម្លាំងបឺតខ្វះខ្យល់ក្នុងស៊ីឡាំង។ សន្ទះស្រូបបើក ដើម្បីនាំល្បាយសាំងផ្សំខ្យល់ថ្មី ចូលមកក្នុងបន្ទប់ចំហេះ។"
                    )}
                    {currentStroke === 1 && t(
                      "The intake valve closes, sealing the cylinder. The piston moves upward, compressing the fuel-air mixture. Squeezing these molecules closer together increases fuel density, making the combustion far more violent and efficient.",
                      "សន្ទះស្រូបបិទវិញដើម្បីការពារបន្ទប់ចំហេះឱ្យជិត។ ពីស្តុងរំកិលឡើងលើដើម្បីច្របាច់ល្បាយសាំង-ខ្យល់។ ការច្របាច់ម៉ូលេគុលឱ្យគៀកគ្នាបង្កើនកំហាប់ឥន្ធនៈ ធ្វើឱ្យការឆេះផ្ទុះខ្លាំង និងមានប្រសិទ្ធភាពខ្ពស់។"
                    )}
                    {currentStroke === 2 && t(
                      "Exactly when the piston reaches the top of the compression stroke, the spark plug releases a high-voltage spark. This ignites the compressed gas. The fuel explodes, expanding rapidly and driving the piston down to spin the crankshaft.",
                      "ចំពេលពីស្តុងរំកិលដល់ចំណុចកំពូលនៃការច្របាច់ ប៊ូហ្គីបាញ់ផ្កាភ្លើងអគ្គិសនីវ៉ុលខ្ពស់។ ផ្កាភ្លើងដុតល្បាយសាំង-ខ្យល់ឱ្យឆេះផ្ទុះរីកមាឌយ៉ាងលឿន រុញពីស្តុងចុះក្រោមដើម្បីបង្វិលចង្កឹះក្បាលម៉ាស៊ីន។"
                    )}
                    {currentStroke === 3 && t(
                      "The exhaust valve opens. The piston moves upward once more, sweeping the burned, spent exhaust gases out of the cylinder into the exhaust pipe, preparing the chamber for a new cycle.",
                      "សន្ទះបញ្ចេញបើក។ ពីស្តុងរំកិលឡើងលើម្តងទៀត ដើម្បីកៀររុញកាកសំណល់ឧស្ម័នឆេះរួច (ផ្សែងសាំង) ចេញពីស៊ីឡាំងទៅកាន់បំពង់ស៊ីម៉ាំង ដើម្បីរៀបចំបន្ទប់សម្រាប់វគ្គថ្មីឡើងវិញ។"
                    )}
                  </p>
                </div>
              </div>

              {/* Technical Spec callout */}
              <div className="mt-4 pt-3 border-t border-emerald-950 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                <span>{t("Ignition Timing:", "ពេលបញ្ឆេះ៖")}</span>
                <span className="text-emerald-400 font-bold">{t("0° Before TDC (360° position)", "0° មុនចំណុចកំពូល (ទីតាំង 360°)")}</span>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Interactive Spark Plug Anatomy Section ────────────────────── */}
        <section className="grid lg:grid-cols-5 gap-6 mb-8">
          
          {/* Left Column: Labeled Interactive Schematic Canvas */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-800/40 shadow-inner bg-slate-950 flex flex-col items-center justify-center p-4">
              
              <h4 className={`text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase self-start mb-2 ${isKh ? "font-khmer tracking-normal" : ""}`}>
                {t("Schematic Diagram", "ដ្យាក្រាមកាយវិភាគសាស្ត្រ")}
              </h4>
              
              <canvas
                ref={anatomyCanvasRef}
                width={200}
                height={370}
                className="w-full max-w-[200px] block"
              />
              
              {/* Highlight Overlay text for visual accessibility */}
              <div className="w-full text-center mt-2 font-mono text-[10px] text-slate-400">
                {t("Click parts on the right to examine", "ចុចលើផ្នែកខាងស្តាំដើម្បីពិនិត្យ")}
              </div>
            </div>
          </div>

          {/* Right Column: Clickable Parts Description list */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div
              className="relative rounded-3xl p-5 sm:p-6 border border-emerald-800/30 shadow-lg flex-grow flex flex-col justify-between"
              style={CARD_BG}
            >
              <CornerMarks />
              
              <div>
                <h3 className={`text-lg font-bold text-slate-50 mb-1.5 flex items-center gap-2 ${isKh ? "font-khmer" : ""}`}>
                  <Layers className="w-5 h-5 text-emerald-400" />
                  {t("Spark Plug Anatomy Breakdown", "ការវិភាគគ្រឿងបង្គុំរបស់ប៊ូហ្គី")}
                </h3>
                <p className={`text-xs text-slate-400 mb-4 ${isKh ? "font-khmer leading-loose" : ""}`}>
                  {t(
                    "A spark plug consists of several high-engineering components designed to withstand extreme thermal expansion, massive combustion pressure, and high electrical voltage. Hover or select a part below to see its structure:",
                    "ប៊ូហ្គីត្រូវបានសាងសង់ឡើងពីផ្នែកបច្ចេកវិទ្យាខ្ពស់ជាច្រើនដើម្បីធន់នឹងកម្តៅខ្លាំង សម្ពាធចំហេះដ៏មហិមា និងវ៉ុលអគ្គិសនីខ្ពស់។ ចុចជ្រើសរើសផ្នែកខាងក្រោម ដើម្បីមើលព័ត៌មានលម្អិត៖"
                  )}
                </p>

                {/* Hotspot grid list */}
                <div className="grid sm:grid-cols-2 gap-2 mb-4">
                  {(Object.keys(SPARK_PLUG_PARTS) as PartKey[]).map((key) => {
                    const part = SPARK_PLUG_PARTS[key];
                    const isActive = activePart === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActivePart(key)}
                        className={`text-left text-xs px-3 py-2 rounded-xl border transition-all focus:outline-none flex items-center justify-between ${
                          isActive
                            ? "bg-emerald-500/10 text-emerald-300 border-emerald-400 shadow shadow-emerald-500/10"
                            : "bg-slate-950/40 text-slate-300 border-emerald-900/30 hover:border-emerald-700/40"
                        }`}
                      >
                        <span className={`font-semibold ${isKh ? "font-khmer" : ""}`}>
                          {isKh ? part.nameKh : part.nameEn}
                        </span>
                        <span className="text-[9px] text-emerald-500 font-mono">
                          {isActive ? "● Active" : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Part Details Board */}
                <div className="bg-slate-950/70 border border-emerald-800/30 rounded-2xl p-4 min-h-[100px] flex flex-col justify-center">
                  <h4 className={`text-sm font-bold text-amber-300 mb-1 flex items-center gap-1 ${isKh ? "font-khmer" : ""}`}>
                    <Zap className="w-3.5 h-3.5" />
                    {isKh ? SPARK_PLUG_PARTS[activePart].nameKh : SPARK_PLUG_PARTS[activePart].nameEn}
                  </h4>
                  <p className={`text-xs text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                    {isKh ? SPARK_PLUG_PARTS[activePart].descKh : SPARK_PLUG_PARTS[activePart].descEn}
                  </p>
                </div>
              </div>

              {/* Quick Summary status */}
              <div className="mt-4 pt-3 border-t border-emerald-950 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                <span>{t("Selected Component ID:", "លេខសម្គាល់គ្រឿងបង្គុំដែលបានជ្រើសរើស៖")}</span>
                <span className="text-emerald-400 font-bold">PLUG-{activePart.toUpperCase()}</span>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Educational Details Section: Spark Physics ────────────────────── */}
        <section className="grid md:grid-cols-2 gap-6">
          
          {/* Card 1: How high voltage is created */}
          <article
            className="relative rounded-3xl p-6 border border-emerald-800/30 shadow-lg flex flex-col justify-between"
            style={CARD_BG}
          >
            <CornerMarks />
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold text-slate-50 ${isKh ? "font-khmer" : ""}`}>
                    {t("Ignition Coil: 12V to 20,000V", "ប៊ូប៊ីនបញ្ឆេះ៖ បង្កើនពី ១២ វ៉ុល ទៅ ២០,០០០ វ៉ុល")}
                  </h3>
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                    STEP-UP ELECTROMAGNETIC TRANSFORMER
                  </span>
                </div>
              </div>

              <div className={`text-xs text-slate-300 space-y-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                <p>
                  {t(
                    "Your car battery supplies only 12 volts of direct current (DC). This voltage is far too low to jump the air gap of a spark plug, which acts as a strong electrical resistor.",
                    "អាគុយឡានរបស់អ្នកអាចផ្គត់ផ្គង់ចរន្តត្រឹមតែ ១២ វ៉ុលប៉ុណ្ណោះ។ កម្រិតវ៉ុលនេះទាបពេក មិនអាចបាញ់ឆ្លងកាត់ចន្លោះខ្យល់របស់ប៊ូហ្គីបានឡើយ ព្រោះខ្យល់ដើរតួជាអាំងស៊ុយឡង់ទប់ចរន្តយ៉ាងខ្លាំង។"
                  )}
                </p>
                <p>
                  {t(
                    "To solve this, the battery current flows into the ignition coil. The coil contains two windings of copper wire wrapped around an iron core: a primary coil with a few hundred thick turns, and a secondary coil with tens of thousands of thin turns.",
                    "ដើម្បីដោះស្រាយបញ្ហានេះ ចរន្តអាគុយត្រូវរត់ចូលទៅក្នុងប៊ូប៊ីនបញ្ឆេះ (Ignition Coil)។ ប៊ូប៊ីនមានរបុំខ្សែទង់ដែងពីរជាន់រុំព័ទ្ធស្នូលដែក៖ របុំទីមួយ (Primary) មានខ្សែធំក្រាស់ពីរបីរយជុំ និងរបុំទីពីរ (Secondary) មានខ្សែតូចល្អិតរាប់ម៉ឺនជុំ។"
                  )}
                </p>
                <p>
                  {t(
                    "When the engine computer cuts current to the primary coil, its magnetic field collapses instantly. This rapid magnetic change induces an enormous electrical surge in the secondary coil, multiplying the voltage to over 20,000V. This high-voltage pulse is sent directly down the spark plug electrode.",
                    "នៅពេលកុំព្យូទ័រម៉ាស៊ីនកាត់ផ្តាច់ចរន្តនៅក្នុងរបុំទីមួយ ដែនម៉ាញ៉េទិចរបស់វានឹងរលាយបាត់ភ្លាមៗ។ ការប្រែប្រួលដែនម៉ាញ៉េទិចយ៉ាងលឿននេះ បង្កើតឱ្យមានការកើនឡើងចរន្តអគ្គិសនីដ៏មហិមានៅក្នុងរបុំទីពីរ ដោយបង្កើនវ៉ុលឱ្យឡើងដល់ជាង ២០,០០០ វ៉ុល។ វ៉ុលខ្ពស់ខ្លាំងនេះត្រូវបានបញ្ជូនត្រង់ទៅអេឡិចត្រូតប៊ូហ្គី។"
                  )}
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-emerald-950 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono border border-emerald-800/40 text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded">
                Primary Turns: ~200
              </span>
              <span className="text-[10px] font-mono border border-emerald-800/40 text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded">
                Secondary Turns: ~20,000+
              </span>
            </div>
          </article>

          {/* Card 2: Dielectric breakdown of compressed air */}
          <article
            className="relative rounded-3xl p-6 border border-emerald-800/30 shadow-lg flex flex-col justify-between"
            style={CARD_BG}
          >
            <CornerMarks />
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold text-slate-50 ${isKh ? "font-khmer" : ""}`}>
                    {t("Dielectric Breakdown of Air", "ការបែកធ្លាយអគ្គិសនីនៃខ្យល់ (Dielectric Breakdown)")}
                  </h3>
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                    PHYSICS OF PLASMA ARC GENERATION
                  </span>
                </div>
              </div>

              <div className={`text-xs text-slate-300 space-y-3 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
                <p>
                  {t(
                    "Normally, air is a great insulator (dielectric). It requires about 3,000V of electricity to jump a tiny 1mm gap in open air. However, inside an engine, the physics changes due to compression.",
                    "តាមធម្មតា ខ្យល់គឺជាអាំងស៊ុយឡង់ដ៏ល្អមួយ។ វាត្រូវការវ៉ុលប្រហែល ៣,០០០ វ៉ុល ដើម្បីបាញ់ផ្កាភ្លើងឆ្លងកាត់ចន្លោះ ១មីលីម៉ែត្រ នៅក្នុងខ្យល់ធម្មតា។ ប៉ុន្តែនៅខាងក្នុងម៉ាស៊ីន គោលការណ៍រូបវិទ្យាប្រែប្រួលដោយសារកម្លាំងច្របាច់សង្កត់។"
                  )}
                </p>
                <p>
                  {t(
                    "During the compression stroke, the fuel-air mix is squeezed to about 1/10th of its original volume, raising cylinder pressure to around 10-15 atmospheres. According to Paschen's Law, the breakdown voltage of a gas gap is proportional to pressure and distance.",
                    "នៅក្នុងវគ្គច្របាច់ ល្បាយសាំង-ខ្យល់ត្រូវបានច្របាច់សង្កត់រហូតសល់ត្រឹម ១/១០ នៃមាឌដើម ធ្វើឱ្យសម្ពាធក្នុងស៊ីឡាំងកើនឡើងដល់ ១០-១៥ ដងនៃសម្ពាធបរិយាកាស។ យោងតាមច្បាប់ Paschen វ៉ុលដែលត្រូវការដើម្បីទម្លាយចន្លោះផ្កាភ្លើងគឺសមាមាត្រទៅនឹងសម្ពាធ និងចម្ងាយ។"
                  )}
                </p>
                <p>
                  {t(
                    "Because of the dense, compressed air molecules, the electrical resistance increases dramatically. This is why it requires a massive 15,000V to 20,000V to rip electrons away from the gas atoms inside the cylinder. Once dielectric breakdown occurs, the air becomes ionized into a hot plasma channel (the spark) which starts the fire.",
                    "ដោយសារម៉ូលេគុលខ្យល់កាន់តែណែនកកិតគ្នា របាំងអគ្គិសនីក៏កើនឡើងខ្លាំងដែរ។ ហេតុនេះហើយទើបត្រូវការចរន្តវ៉ុលរហូតដល់ ១៥,០០០ ទៅ ២០,០០០ វ៉ុល ដើម្បីបង្ខំឱ្យអេឡិចត្រុងរត់ទម្លាយអាតូមឧស្ម័នក្នុងស៊ីឡាំង។ ពេលដែលការទម្លាយរបាំងអគ្គិសនី (Dielectric Breakdown) កើតឡើង ខ្យល់នឹងក្លាយជាប្លាស្មាក្តៅខ្លាំង (ផ្កាភ្លើង) ដែលចាប់ផ្តើមបញ្ឆេះភ្លើង។"
                  )}
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-emerald-950 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono border border-emerald-800/40 text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded">
                Breakdown (Open Air): ~3,000 V/mm
              </span>
              <span className="text-[10px] font-mono border border-emerald-800/40 text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded">
                Breakdown (Compressed): ~18,000 V/mm
              </span>
            </div>
          </article>

        </section>

        {/* ─── Bottom Navigation Link ───────────────────────────────────────── */}
        <footer className="mt-12 flex justify-center border-t border-emerald-800/20 pt-6">
          <Link
            href="/technology/automotive"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 ${
              isKh ? "font-khmer text-sm" : "text-sm"
            }`}
          >
            {t("Return to How Cars Work Hub", "ត្រឡប់ទៅមជ្ឈមណ្ឌល របៀបដែលឡានដំណើរការ")}
            <ArrowRight className="w-4 h-4 fill-slate-950" />
          </Link>
        </footer>

      </div>
    </div>
  );
}
