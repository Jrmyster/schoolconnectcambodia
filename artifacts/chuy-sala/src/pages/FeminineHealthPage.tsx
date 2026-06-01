import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import {
  ShieldAlert,
  HeartPulse,
  Droplets,
  Sun,
  Activity,
  Check,
  Lock,
  XCircle,
  Sparkles,
  Maximize2,
  RefreshCw,
  Info,
  Calendar,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { useLanguageStore, useTranslation } from "@/store/use-language";

// ── Types ─────────────────────────────────────────────────────────────────────
interface FabricLayer {
  id: number;
  nameEn: string;
  nameKh: string;
  materialEn: string;
  materialKh: string;
  whyEn: string;
  whyKh: string;
  upcycledEn: string;
  upcycledKh: string;
  color: string;
  borderColor: string;
}

interface Particle {
  x: number;
  y: number;
  speed: number;
  absorbed: boolean;
}

export default function FeminineHealthPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  // Classroom zoom level state
  const [zoom, setZoom] = useState<number>(1.0);
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const coreWetnessRef = useRef<number>(0); // 0 to 1 representing fluid absorption

  // ── Quick Exit ─────────────────────────────────────────────────────────────
  const quickExit = () => {
    window.location.replace("/");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") quickExit();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ── Fabric Layers Data ─────────────────────────────────────────────────────
  const layers: FabricLayer[] = [
    {
      id: 1,
      nameEn: "Layer 1: Soft Top Layer (Wicking & Comfort)",
      nameKh: "ស្រទាប់ទី ១៖ ផ្នែកខាងលើ (ស្រូបសំណើម និងផាសុកភាព)",
      materialEn: "100% Cotton Flannel or Soft Upcycled Cotton T-shirt",
      materialKh: "ក្រណាត់កប្បាស Flannel ១០០% ឬអាវយឺតកប្បាសចាស់ស្អាត",
      whyEn: "Moisture-Wicking & Comfort: This layer sits directly against the skin. Natural, breathable cotton fibers pull fluid away quickly from the body to keep the surface dry and comfortable, preventing heat rashes or irritation in tropical climates.",
      whyKh: "ការស្រូបសំណើម និងផាសុកភាព៖ ស្រទាប់នេះប៉ះផ្ទាល់នឹងស្បែក។ សរសៃកប្បាសធម្មជាតិដែលអាចដកដង្ហើមបាន ជួយស្រូបទាញទឹកចេញបានលឿនពីរាងកាយ ដើម្បីរក្សាផ្ទៃខាងលើឱ្យស្ងួត និងមានផាសុកភាព ការពារការរលាកស្បែកក្នុងអាកាសធាតុក្តៅសើម។",
      upcycledEn: "A soft, clean upcycled cotton t-shirt is an excellent, free source of wicking fabric. Tip: Using brightly colored or patterned fabric increases confidence and hides stains.",
      upcycledKh: "អាវយឺតកប្បាសចាស់ដែលបោកស្អាត និងទន់ គឺជាប្រភពក្រណាត់ស្រូបសំណើមដ៏ល្អ និងឥតគិតថ្លៃ។ គន្លឹះ៖ ការប្រើប្រាស់ក្រណាត់ដែលមានពណ៌ភ្លឺៗ ឬមានផ្ការចនាជួយបង្កើនទំនុកចិត្ត និងបិទបាំងស្នាមប្រឡាក់។",
      color: "rgba(56, 189, 248, 0.7)", // sky-400
      borderColor: "#38bdf8",
    },
    {
      id: 2,
      nameEn: "Layer 2: Absorbent Core (Absorbency)",
      nameKh: "ស្រទាប់ទី ២៖ ស្នូលស្រូបទឹក (ការស្រូបទឹក)",
      materialEn: "Terrycloth, Microfiber, or 3-4 layers of folded Cotton Flannel",
      materialKh: "ក្រណាត់ Terrycloth, Microfiber ឬក្រណាត់កប្បាស Flannel ៣-៤ ស្រទាប់បត់បញ្ចូលគ្នា",
      whyEn: "Water Absorption & Fluid Retention: The core captures and stores the fluid. Densely layered natural fibers offer high water retention capacity, trapping fluid securely while keeping the pad flat and comfortable.",
      whyKh: "ការស្រូបយក និងរក្សាទឹក៖ ផ្នែកស្នូលចាប់យក និងរក្សាទុកវត្ថុរាវ។ ក្រណាត់សរសៃធម្មជាតិច្រើនស្រទាប់បង្រួមដង់ស៊ីតេជួយរក្សាទឹកបានល្អបំផុត ខណៈរក្សាសំឡីអនាម័យឱ្យនៅសំប៉ែត និងមានផាសុកភាព។",
      upcycledEn: "Clean, old bath towels are excellent, highly absorbent cores. Features a central 'hot zone' strip sewn down the middle for extra absorption without bulk.",
      upcycledKh: "កន្សែងពោះគោចាស់ៗដែលស្អាត គឺជាជម្រើសស្នូលស្រូបទឹកដ៏ល្អ និងស្រូបទឹកបានខ្ពស់។ រចនាឡើងដោយមានបន្ទះ 'តំបន់ស្រូបទឹកពិសេស (hot zone)' ដេរភ្ជាប់ចំកណ្តាលដើម្បីបន្ថែមការស្រូបទឹកដោយមិនធ្វើឱ្យប៉ោងក្រាស់ពេក។",
      color: "rgba(251, 191, 36, 0.7)", // amber-400
      borderColor: "#f59e0b",
    },
    {
      id: 3,
      nameEn: "Layer 3: Leak-Proof Shield (Waterproofing)",
      nameKh: "ស្រទាប់ទី ៣៖ ស្រទាប់ការពារការលេចធ្លាយ (ការជ្រាបទឹក)",
      materialEn: "PUL (Polyurethane Laminate) fabric",
      materialKh: "ក្រណាត់ PUL (Polyurethane Laminate)",
      whyEn: "Waterproofing & Leak Prevention: Acts as a moisture barrier to prevent fluid from leaking onto outer clothing, while remaining breathable at a microscopic level to prevent sweat buildup.",
      whyKh: "ការការពារជម្រាប និងការលេចធ្លាយ៖ ដើរតួជារបាំងសំណើមដើម្បីការពារកុំឱ្យវត្ថុរាវជ្រាបទៅសម្លៀកបំពាក់ខាងក្រៅ ខណៈពេលនៅតែរក្សារន្ធខ្យល់មីក្រូទស្សន៍ដើម្បីកាត់បន្ថយញើស។",
      upcycledEn: "If PUL is unavailable, tightly woven nylon from an old umbrella or even dense fleece can act as a highly effective, breathable moisture barrier to prevent leaks.",
      upcycledKh: "ប្រសិនបើគ្មានក្រណាត់ PUL ទេ ក្រណាត់នីឡុងត្បាញក្រាស់ពីឆ័ត្រចាស់ ឬសូម្បីតែក្រណាត់រោមចៀមក្រាស់ (dense fleece) អាចដើរតួជារបាំងសំណើមដ៏មានប្រសិទ្ធភាព និងមានរន្ធខ្យល់ចេញចូលដើម្បីការពារការលេចធ្លាយ។",
      color: "rgba(16, 185, 129, 0.7)", // emerald-500
      borderColor: "#10b981",
    },
    {
      id: 4,
      nameEn: "Layer 4: Security Wings (Fastening)",
      nameKh: "ស្រទាប់ទី ៤៖ ស្លាបការពារ (ការភ្ជាប់ភ្ជាប់)",
      materialEn: "Flaps with Rust-proof KAM Snaps or Simple Buttons",
      materialKh: "ស្លាបក្រណាត់ជាមួយឡេវចុច KAM មិនច្រេះ ឬឡេវអាវសាមញ្ញ",
      whyEn: "Stabilization & Mechanical Fastening: Anchors the pad securely around the underwear, preventing it from twisting, slipping, or moving during physical active movement (like walking or cycling).",
      whyKh: "លំនឹង និងការភ្ជាប់មេកានិច៖ ភ្ជាប់សំឡីអនាម័យឱ្យជាប់ជុំវិញខោក្នុង ដើម្បីការពារការរអិល រមួល ឬរំកិលចុះឡើងក្នុងពេលធ្វើចលនាសកម្ម (ដូចជាដើរ ឬជិះកង់)។",
      upcycledEn: "Show flaps with rust-proof plastic KAM snaps or clean, recycled clothing buttons to secure the pad around the underwear.",
      upcycledKh: "ស្លាបក្រណាត់ដែលមានឡេវចុចជ័រ KAM មិនច្រេះ ឬឡេវអាវធម្មតាកែច្នៃឡើងវិញ ដើម្បីភ្ជាប់សំឡីអនាម័យឱ្យជាប់ល្អជុំវិញខោក្នុង។",
      color: "rgba(236, 72, 153, 0.7)", // pink-500
      borderColor: "#ec4899",
    },
  ];

  // ── HTML5 Canvas Animation Loop ───────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize particles array if simulating
    if (isSimulating && particlesRef.current.length < 15) {
      for (let i = 0; i < 15; i++) {
        particlesRef.current.push({
          x: 100 + Math.random() * 80, // fall near the center-left body of the pad
          y: -10 - Math.random() * 100,
          speed: 1.5 + Math.random() * 2,
          absorbed: false,
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // Draw grid helper background (dark projector aesthetic)
      ctx.strokeStyle = "rgba(30, 41, 59, 0.5)";
      ctx.lineWidth = 1;
      for (let i = 25; i < canvas.width; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw Title Overlay inside Canvas
      ctx.fillStyle = "rgba(148, 163, 184, 0.15)";
      ctx.font = "bold 10px monospace";
      ctx.fillText("2D SANITARY SCHEMATIC VIEW", 15, 25);

      // Center values for rendering views
      const padX = 140;
      const padY = 225;

      const stackX = 350;
      const stackY = 225;

      // ───────────────────────────────────────────────────────────────────
      //  VIEW A: Top-Down Visualizer (Left side of Canvas)
      // ───────────────────────────────────────────────────────────────────

      // 1. Draw Layer 4 (Wings) first because it is underneath
      ctx.save();
      ctx.translate(padX, padY);

      // Wing outline & shape
      ctx.fillStyle = activeLayer === 4 ? "rgba(236, 72, 153, 0.35)" : "rgba(30, 41, 59, 0.4)";
      ctx.strokeStyle = activeLayer === 4 ? "#ec4899" : "rgba(236, 72, 153, 0.15)";
      ctx.lineWidth = activeLayer === 4 ? 3 : 1;
      
      ctx.beginPath();
      // Hourglass main body outline (very soft background)
      ctx.moveTo(-45, -140);
      ctx.bezierCurveTo(-45, -165, 45, -165, 45, -140);
      ctx.lineTo(45, -40);
      // Wing Right
      ctx.bezierCurveTo(95, -40, 95, 40, 45, 40);
      ctx.lineTo(45, 140);
      ctx.bezierCurveTo(45, 165, -45, 165, -45, 140);
      ctx.lineTo(-45, 40);
      // Wing Left
      ctx.bezierCurveTo(-95, 40, -95, -40, -45, -40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Wing snap button dots
      ctx.fillStyle = activeLayer === 4 ? "#ffffff" : "#475569";
      ctx.beginPath();
      ctx.arc(75, 0, 6, 0, Math.PI * 2);
      ctx.arc(-75, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Draw Layer 3 (Shield / Moisture barrier backing)
      ctx.save();
      ctx.translate(padX, padY);
      ctx.fillStyle = activeLayer === 3 ? "rgba(16, 185, 129, 0.3)" : "rgba(30, 41, 59, 0.5)";
      ctx.strokeStyle = activeLayer === 3 ? "#10b981" : "rgba(16, 185, 129, 0.15)";
      ctx.lineWidth = activeLayer === 3 ? 3 : 1;
      ctx.beginPath();
      ctx.moveTo(-45, -140);
      ctx.bezierCurveTo(-45, -165, 45, -165, 45, -140);
      ctx.lineTo(45, 140);
      ctx.bezierCurveTo(45, 165, -45, 165, -45, 140);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // 3. Draw Layer 2 (Absorbent Core)
      ctx.save();
      ctx.translate(padX, padY);
      
      // Calculate dynamic wetness color mapping
      const wetGlow = Math.floor(coreWetnessRef.current * 100);
      ctx.fillStyle = activeLayer === 2 
        ? `rgba(251, 191, 36, ${0.25 + coreWetnessRef.current * 0.15})` 
        : `rgba(251, 191, 36, ${0.05 + coreWetnessRef.current * 0.1})`;
      ctx.strokeStyle = activeLayer === 2 ? "#f59e0b" : "rgba(251, 191, 36, 0.15)";
      ctx.lineWidth = activeLayer === 2 ? 3 : 1;
      ctx.beginPath();
      ctx.moveTo(-30, -120);
      ctx.bezierCurveTo(-30, -135, 30, -135, 30, -120);
      ctx.lineTo(30, 120);
      ctx.bezierCurveTo(30, 135, -30, 135, -30, 120);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Frugal visual element: "hot zone" (a strip sewn down the middle for extra absorption)
      ctx.strokeStyle = activeLayer === 2 ? "rgba(239, 68, 68, 0.85)" : "rgba(239, 68, 68, 0.35)"; // red/rose highlight
      ctx.lineWidth = activeLayer === 2 ? 2.5 : 1;
      ctx.setLineDash([4, 4]);
      // Draw sewing rectangle strip down the middle
      ctx.strokeRect(-10, -95, 20, 190);
      ctx.setLineDash([]);
      
      // Draw mini indicator text inside canvas for Sewn Hot Zone
      if (activeLayer === 2) {
        ctx.fillStyle = "#f43f5e"; // rose-500
        ctx.font = "bold 9px monospace";
        ctx.fillText(isKh ? "តំបន់ដេរស្រូបពិសេស" : "SEWN HOT ZONE", -45, -100);
      }

      // Draw wet absorption zone indicator in core
      if (coreWetnessRef.current > 0.05) {
        ctx.fillStyle = `rgba(56, 189, 248, ${coreWetnessRef.current * 0.5})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, 15 + coreWetnessRef.current * 10, 50 + coreWetnessRef.current * 40, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 4. Draw Layer 1 (Top Breathable Cotton)
      ctx.save();
      ctx.translate(padX, padY);
      ctx.fillStyle = activeLayer === 1 ? "rgba(56, 189, 248, 0.25)" : "rgba(15, 23, 42, 0.6)";
      ctx.strokeStyle = activeLayer === 1 ? "#38bdf8" : "rgba(56, 189, 248, 0.15)";
      ctx.lineWidth = activeLayer === 1 ? 3 : 1;
      
      // Fine mesh style patterns for cotton top sheet
      ctx.beginPath();
      ctx.moveTo(-40, -130);
      ctx.bezierCurveTo(-40, -150, 40, -150, 40, -130);
      ctx.lineTo(40, 130);
      ctx.bezierCurveTo(40, 150, -40, 150, -40, 130);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Mesh stitching grid lines when highlighted
      if (activeLayer === 1) {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
        ctx.lineWidth = 1;
        for (let x = -30; x <= 30; x += 15) {
          ctx.beginPath();
          ctx.moveTo(x, -120);
          ctx.lineTo(x, 120);
          ctx.stroke();
        }
      }
      ctx.restore();


      // ───────────────────────────────────────────────────────────────────
      //  VIEW B: Exploded Stack / Cross-Section (Right side of Canvas)
      // ───────────────────────────────────────────────────────────────────
      
      // We will draw the 4 layers horizontally stacked or inclined
      const drawStackedLayer = (lyrId: number, offsetHeight: number, label: string) => {
        ctx.save();
        ctx.translate(stackX, stackY + offsetHeight);
        
        const info = layers.find(l => l.id === lyrId)!;
        const isSelected = activeLayer === lyrId;

        // Draw 3D-like inclined rectangular prism representational shape
        ctx.fillStyle = isSelected ? info.color : "rgba(30, 41, 59, 0.4)";
        ctx.strokeStyle = isSelected ? info.borderColor : "rgba(71, 85, 105, 0.4)";
        ctx.lineWidth = isSelected ? 2.5 : 1;

        // Draw isometric projection skew
        ctx.beginPath();
        ctx.moveTo(-50, -10);
        ctx.lineTo(35, -25);
        ctx.lineTo(50, 10);
        ctx.lineTo(-35, 25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Label details on the side of the stack
        ctx.fillStyle = isSelected ? "#ffffff" : "#94a3b8";
        ctx.font = isSelected ? "bold 11px font-sans" : "9px font-sans";
        ctx.fillText(label, 65, 5);

        // Link connectors between top-down active layer and stack
        if (isSelected) {
          ctx.strokeStyle = info.borderColor;
          ctx.setLineDash([2, 4]);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-180, -offsetHeight); // Pad center
          ctx.bezierCurveTo(-90, -offsetHeight, -90, 0, -45, 0);
          ctx.stroke();
        }

        ctx.restore();
      };

      // Draw from back (Layer 4) to top (Layer 1)
      drawStackedLayer(4, 90, isKh ? "ស្រទាប់ ៤: ស្លាប" : "Layer 4: Wings");
      drawStackedLayer(3, 30, isKh ? "ស្រទាប់ ៣: របាំងទឹក" : "Layer 3: Shield");
      drawStackedLayer(2, -30, isKh ? "ស្រទាប់ ២: ស្នូលស្រូប" : "Layer 2: Core");
      drawStackedLayer(1, -90, isKh ? "ស្រទាប់ ១: ផ្ទៃកប្បាស" : "Layer 1: Top Sheet");


      // ───────────────────────────────────────────────────────────────────
      //  VIEW C: Fluid Simulation Micro-Animation
      // ───────────────────────────────────────────────────────────────────
      if (isSimulating) {
        particlesRef.current.forEach((p) => {
          // Reset when particle falls off the page or gets fully absorbed
          if (p.y > 140) {
            p.y = -10 - Math.random() * 50;
            p.x = padX - 30 + Math.random() * 60;
            p.absorbed = false;
          }

          p.y += p.speed;

          // Render fluid droplet
          ctx.save();
          ctx.translate(padX, padY);

          // Position matching active layers
          // Layer 1 (Top Sheet): y range -140 to 140
          const localY = p.y;
          
          if (localY > -130 && localY < 130) {
            // Draw falling waterdrop shape
            ctx.fillStyle = "rgba(56, 189, 248, 0.85)"; // sky-400
            ctx.beginPath();
            ctx.arc(p.x - padX, localY, 3, 0, Math.PI);
            ctx.lineTo(p.x - padX, localY - 6);
            ctx.closePath();
            ctx.fill();

            // Perform absorption behavior
            // As drops pass through Layer 1 and hit Layer 2 (Core),
            // they trigger the core wetness index.
            if (localY > -100 && localY < 80 && !p.absorbed) {
              p.absorbed = true;
              coreWetnessRef.current = Math.min(1.0, coreWetnessRef.current + 0.008);
            }

            // Layer 3 (Shield) blocks further downward leaking, so droplets slow down or spread outward
            if (localY > 90) {
              // Stopped! Draw deflection splash
              ctx.strokeStyle = "#10b981"; // shield color
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(p.x - padX, localY, 6, Math.PI, 0);
              ctx.stroke();
            }
          }
          ctx.restore();
        });

        // Slow dry-off over time to keep simulation loops infinite
        coreWetnessRef.current = Math.max(0.0, coreWetnessRef.current - 0.001);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [activeLayer, isSimulating, isKh]);

  // Handle layer click from visualizer
  const handleLayerClick = (id: number) => {
    setActiveLayer(id);
  };

  const activeLayerData = layers.find((l) => l.id === activeLayer) || layers[0];

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Background stars / space grid aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/15 via-[#050b18] to-black pointer-events-none" />

      {/* ── Privacy reassurance bar ───────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-slate-950/90 border-b border-slate-800 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 min-w-0">
            <Lock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className={`truncate ${isKh ? "font-khmer" : ""}`}>
              {isKh
                ? "ឯកជនភាពសាលា — Chouy Sala មិនរក្សាទុក ឬចែករំលែកទិន្នន័យនៃការអានឡើយ។"
                : "Privacy Reassurance — Chouy Sala does not track or share what you read here."}
            </span>
          </div>
          
          <button
            onClick={quickExit}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-md transition-colors ${
              isKh ? "font-khmer" : ""
            }`}
            data-testid="quick-exit-button"
            aria-label={isKh ? "ចេញលឿន — ត្រឡប់ទៅទំព័រដើម" : "Quick Exit — return to home page"}
          >
            <XCircle className="w-3.5 h-3.5" />
            {isKh ? "ចេញលឿន" : "Quick Exit"}
            <kbd className="hidden sm:inline-block ml-1 px-1 py-0.5 text-[9px] bg-white/20 rounded font-mono">Esc</kbd>
          </button>
        </div>
      </div>

      {/* ── Main Header / Back bar ────────────────────────────────────────── */}
      <header className="border-b border-slate-900 bg-slate-950/40 relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link href="/science" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>
              {t("Back to Science Hub", "ត្រឡប់ទៅវិទ្យាសាស្ត្រ")}
            </span>
          </Link>

          <div className="flex items-center gap-2.5">
            <HeartPulse className="w-6 h-6 text-pink-500" />
            <h1
              className={`font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-pink-400 uppercase ${
                isKh ? "font-khmer" : ""
              }`}
              style={{ fontSize: `clamp(18px, ${2.2 * zoom}vw, 40px)` }}
            >
              {t("Feminine Health & Menstrual Hygiene", "សុខភាពនារី និងអនាម័យមករដូវ")}
            </h1>
          </div>

          {/* ── Classroom Zoom Control Slider ────────────────────────────── */}
          <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-2xl">
            <Maximize2 className="w-4 h-4 text-cyan-400" />
            <div className="flex flex-col">
              <label htmlFor="zoom-slider" className={`text-[10px] text-slate-400 font-bold uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
                {t("Classroom Font Size", "ទំហំអក្សរក្នុងថ្នាក់")}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="zoom-slider"
                  type="range"
                  min="0.8"
                  max="1.8"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-24 sm:w-32 accent-cyan-400 cursor-ew-resize h-1 bg-slate-800 rounded-lg appearance-none"
                />
                <span className="text-xs font-mono font-bold text-cyan-400">{Math.round(zoom * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Viewport Content ─────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 flex flex-col gap-8">
        
        {/* 1. The 'Safety First' Medical Disclaimer Banner */}
        <section
          aria-labelledby="disclaimer-title"
          className="w-full bg-gradient-to-r from-rose-950/60 to-rose-900/30 border-2 border-rose-600 rounded-3xl p-5 sm:p-6 flex gap-4 items-start shadow-[0_0_30px_rgba(220,38,38,0.15)] relative overflow-hidden"
        >
          {/* Animated decorative glow pulse behind icon */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0 shadow-inner">
            <ShieldAlert className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse" />
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <h2
              id="disclaimer-title"
              className={`font-black text-rose-400 tracking-wide uppercase ${isKh ? "font-khmer leading-snug" : ""}`}
              style={{ fontSize: `clamp(16px, ${2.0 * zoom}vw, 36px)` }}
            >
              {t("HEALTH WARNING: SAFETY FIRST", "ការព្រមានអំពីសុខភាព៖ សុវត្ថិភាពជាចម្បង")}
            </h2>
            
            <p
              className={`text-rose-100 leading-relaxed font-semibold ${isKh ? "font-khmer leading-loose" : ""}`}
              style={{ fontSize: `clamp(14px, ${1.5 * zoom}vw, 26px)` }}
            >
              {t(
                "Reusable cloth pads are safe and hygienic when washed properly. However, NEVER attempt to make homemade tampons or internal products. Non-sterile internal products carry a severe risk of dangerous infections and Toxic Shock Syndrome (TSS).",
                "សំឡីអនាម័យក្រណាត់ដែលអាចប្រើឡើងវិញបាន គឺមានសុវត្ថិភាព និងអនាម័យល្អនៅពេលបោកគក់បានត្រឹមត្រូវ។ ទោះជាយ៉ាងណាក៏ដោយ សូមកុំព្យាយាមធ្វើតំប៉ុង (tampons) ឬផលិតផលបញ្ចូលក្នុងខ្លួនដោយខ្លួនឯងឡើយ។ ផលិតផលបញ្ចូលក្នុងខ្លួនដែលមិនស្អាតគ្មានមេរោគ អាចបង្កជាហានិភ័យធ្ងន់ធ្ងរនៃជំងឺឆ្លងដ៏គ្រោះថ្នាក់ និងរោគសញ្ញាឆក់ដោយសារជាតិពុល (TSS)។"
              )}
            </p>
          </div>
        </section>

        {/* 2. Interactive 'Reusable Pad Builder' (Visualizer Section) */}
        <section
          aria-labelledby="builder-title"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Visualizer Canvas Block (Col-span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="bg-slate-950/90 border-2 border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl min-h-[490px]">
              
              {/* Canvas element */}
              <canvas
                ref={canvasRef}
                width={480}
                height={450}
                className="w-full max-w-[480px] h-[450px] block cursor-pointer"
                onClick={() => {
                  // Cycle layer on canvas tap as a fun interactivity
                  setActiveLayer((prev) => (prev % 4) + 1);
                }}
              />

              {/* Simulation status controls overlay */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSimulating(!isSimulating);
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                    isSimulating
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
                  {isSimulating ? t("Fluid Simulation Active", "ការហូរទឹកដំណើរការ") : t("Fluid Simulation Paused", "ការហូរទឹកបានផ្អាក")}
                </button>
              </div>
            </div>

            {/* Segmented Layer Toggles list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {layers.map((lyr) => (
                <button
                  key={lyr.id}
                  onClick={() => handleLayerClick(lyr.id)}
                  className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] ${
                    activeLayer === lyr.id
                      ? "bg-slate-900 border-2 text-white"
                      : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                  style={{ borderColor: activeLayer === lyr.id ? lyr.borderColor : "" }}
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold" style={{ backgroundColor: lyr.color, color: "#000" }}>
                    {lyr.id}
                  </span>
                  <span className={`text-[12px] font-bold text-center leading-tight ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? `ស្រទាប់ ${lyr.id}` : `Layer ${lyr.id}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Educational Sidebar Description Panel (Col-span 5) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col justify-between h-full gap-6">
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black font-mono shadow-inner"
                    style={{ backgroundColor: activeLayerData.color, color: "#050b18" }}
                  >
                    {activeLayerData.id}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 font-mono tracking-widest uppercase block">
                      {t("PAD LAYER DETAILS", "ព័ត៌មានលម្អិតស្រទាប់")}
                    </span>
                    <h3
                      className={`font-black text-white leading-snug ${isKh ? "font-khmer" : ""}`}
                      style={{ fontSize: `clamp(16px, ${1.8 * zoom}vw, 32px)` }}
                    >
                      {isKh ? activeLayerData.nameKh : activeLayerEnClean(activeLayerData.nameEn)}
                    </h3>
                  </div>
                </div>

                {/* Material highlight Box */}
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex flex-col gap-1">
                  <span className={`text-[10px] text-slate-500 uppercase tracking-widest block font-bold ${isKh ? "font-khmer" : ""}`}>
                    {t("RECOMMENDED MATERIAL", "សម្ភារៈណែនាំ")}
                  </span>
                  <span
                    className={`font-bold text-cyan-400 block leading-tight ${isKh ? "font-khmer" : ""}`}
                    style={{ fontSize: `clamp(14px, ${1.4 * zoom}vw, 24px)` }}
                  >
                    {isKh ? activeLayerData.materialKh : activeLayerData.materialEn}
                  </span>
                </div>

                {/* Scientific Purpose (e.g. moisture-wicking vs. moisture-blocking) */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className={`text-[10px] text-slate-400 uppercase tracking-widest block font-bold ${isKh ? "font-khmer" : ""}`}>
                    {t("SCIENTIFIC PURPOSE", "គោលបំណងវិទ្យាសាស្ត្រ")}
                  </span>
                  <p
                    className={`text-slate-200 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}
                    style={{ fontSize: `clamp(14px, ${1.35 * zoom}vw, 22px)` }}
                  >
                    {isKh ? activeLayerData.whyKh : activeLayerData.whyEn}
                  </p>
                </div>

                {/* Upcycled & Frugal Alternative */}
                <div className="flex flex-col gap-2 pt-3 border-t border-slate-800/80 mt-2">
                  <span className={`text-[10px] text-pink-400 uppercase tracking-widest block font-bold ${isKh ? "font-khmer" : ""}`}>
                    {t("UPCYCLED & FRUGAL ALTERNATIVE", "ជម្រើសកែច្នៃឡើងវិញ & ត្បិតត្បៀត")}
                  </span>
                  <p
                    className={`text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}
                    style={{ fontSize: `clamp(14px, ${1.35 * zoom}vw, 22px)` }}
                  >
                    {isKh ? activeLayerData.upcycledKh : activeLayerData.upcycledEn}
                  </p>
                </div>
              </div>

              {/* Pad construction tip indicator */}
              <div className="bg-cyan-950/20 border border-cyan-800/40 rounded-2xl p-4 flex gap-3 items-start">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p
                  className={`text-cyan-300 leading-normal ${isKh ? "font-khmer leading-loose" : ""}`}
                  style={{ fontSize: `clamp(12px, ${1.15 * zoom}vw, 18px)` }}
                >
                  {t(
                    "Tip: Using colorful backing fabrics (Layer 3) makes pads look pleasant, reducing any stigma or embarrassment during washing and drying.",
                    "គន្លឹះ៖ ការប្រើប្រាស់ក្រណាត់លំនាំពណ៌ស្រស់ស្អាតនៅខាងក្រោយ (ស្រទាប់ទី ៣) ជួយធ្វើឱ្យសំឡីក្រណាត់មើលទៅគួរឱ្យចង់ប្រើ និងកាត់បន្ថយភាពអៀនខ្មាសនៅពេលបោកគក់ និងហាល។"
                  )}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Menstrual Hygiene Management (MHM) Dashboard Grid */}
        <section aria-labelledby="dashboard-title" className="flex flex-col gap-5 mt-4">
          <h2
            id="dashboard-title"
            className={`font-black text-white uppercase tracking-wider ${isKh ? "font-khmer leading-snug" : ""}`}
            style={{ fontSize: `clamp(18px, ${2.4 * zoom}vw, 48px)` }}
          >
            {t("Menstrual Hygiene & Health Dashboard", "ផ្ទាំងព័ត៌មានអនាម័យ និងសុខភាពមករដូវ")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Washing */}
            <article className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3
                  className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                  style={{ fontSize: `clamp(16px, ${1.6 * zoom}vw, 30px)` }}
                >
                  {t("Proper Washing", "ការបោកគក់ត្រឹមត្រូវ")}
                </h3>
              </div>
              
              <p
                className={`text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}
                style={{ fontSize: `clamp(13px, ${1.3 * zoom}vw, 20px)` }}
              >
                {t(
                  "Soak pads in cold water first (hot water sets blood stains). Wash thoroughly with clean water and gentle soap. Avoid bleach or fabric softeners, which can reduce absorbency and irritate sensitive skin.",
                  "ត្រាំសំឡីក្រណាត់ក្នុងទឹកត្រជាក់ជាមុនសិន (ទឹកក្តៅធ្វើឱ្យប្រឡាក់ឈាមជាប់)។ បោកគក់ឱ្យបានស្អាតល្អជាមួយទឹកស្អាត និងសាប៊ូស្រាល។ ជៀសវាងសារធាតុខាត់ពណ៌ ឬទឹកក្រអូប ព្រោះវាអាចកាត់បន្ថយសមត្ថភាពស្រូបទឹក និងធ្វើឱ្យរលាកស្បែកដែលងាយរងគ្រោះ។"
                )}
              </p>
            </article>

            {/* Card 2: Drying (Crucial Sunlight Effect) */}
            <article className="bg-gradient-to-b from-amber-950/20 to-slate-900/60 border border-amber-500/30 rounded-3xl p-6 flex flex-col gap-4 shadow-lg backdrop-blur-sm relative overflow-hidden">
              {/* Sun graphic glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sun className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
                </div>
                <h3
                  className={`font-black text-amber-400 ${isKh ? "font-khmer" : ""}`}
                  style={{ fontSize: `clamp(16px, ${1.6 * zoom}vw, 30px)` }}
                >
                  {t("Sunlight Drying (Crucial)", "ការហាលថ្ងៃ (សំខាន់បំផុត)")}
                </h3>
              </div>

              <p
                className={`text-amber-100 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}
                style={{ fontSize: `clamp(13px, ${1.3 * zoom}vw, 20px)` }}
              >
                {t(
                  "Always dry reusable pads in direct sunlight. The sun's ultraviolet (UV) rays act as a powerful, natural disinfectant that kills remaining microscopic bacteria. Ensure pads are 100% dry before storing to prevent mold.",
                  "ត្រូវហាលសំឡីអនាម័យក្រណាត់ក្នុងពន្លឺព្រះអាទិត្យផ្ទាល់ជានិច្ច។ កាំរស្មីស្វាយអ៊ុលត្រា (UV) របស់ព្រះអាទិត្យដើរតួជាភ្នាក់ងារសម្លាប់មេរោគធម្មជាតិដ៏មានឥទ្ធិពល ដែលកម្ចាត់បាក់តេរីមីក្រូទស្សន៍ដែលនៅសេសសល់។ ត្រូវប្រាកដថាពួកវាស្ងួត ១០០% មុនពេលរក្សាទុកដើម្បីការពារផ្សិត។"
                )}
              </p>
            </article>

            {/* Card 3: Biology Basics (Normalizing 28-day cycle) */}
            <article className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3
                  className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                  style={{ fontSize: `clamp(16px, ${1.6 * zoom}vw, 30px)` }}
                >
                  {t("Biology Basics", "មូលដ្ឋានគ្រឹះជីវវិទ្យា")}
                </h3>
              </div>

              <p
                className={`text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}
                style={{ fontSize: `clamp(13px, ${1.3 * zoom}vw, 20px)` }}
              >
                {t(
                  "The menstrual cycle is a normal, healthy biological process that averages 28 days (ranging from 21 to 35 days). It involves the body preparing for potential pregnancy, and shedding the uterine lining when pregnancy does not occur. Normalizing this process removes social stigma.",
                  "វដ្តរដូវគឺជាដំណើរការជីវសាស្ត្រធម្មតា និងមានសុខភាពល្អ ដែលជាមធ្យមមានរយៈពេល ២៨ ថ្ងៃ (ចន្លោះពី ២១ ទៅ ៣៥ ថ្ងៃ)។ វាទាក់ទងនឹងរាងកាយរៀបចំសម្រាប់ការមានផ្ទៃពោះដែលអាចកើតមាន និងការជម្រុះស្រទាប់ស្បូននៅពេលដែលមិនមានការមានគភ៌។ ការយល់ដឹងពីដំណើរការនេះជួយលុបបំបាត់ការអៀនខ្មាស។"
                )}
              </p>
            </article>

          </div>
        </section>

        {/* ── Closing Support Section ──────────────────────────────────────── */}
        <footer className="mt-8 mb-16 bg-gradient-to-br from-indigo-950/40 to-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-1">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: `clamp(16px, ${1.6 * zoom}vw, 30px)` }}
              >
                {t("Bilingual Education Resources", "ធនធានអប់រំពីរភាសា")}
              </h4>
              <p
                className={`text-slate-400 mt-1 ${isKh ? "font-khmer leading-loose" : "text-sm leading-relaxed"}`}
                style={{ fontSize: `clamp(12px, ${1.2 * zoom}vw, 18px)` }}
              >
                {t(
                  "This resource is developed for schools and community workshops across Cambodia. Teachers can adjust the font size controls at the top to optimize visibility for digital projectors.",
                  "ធនធាននេះត្រូវបានបង្កើតឡើងសម្រាប់សាលារៀន និងសិក្ខាសាលាសហគមន៍ទូទាំងប្រទេសកម្ពុជា។ គ្រូបង្រៀនអាចកែតម្រូវទំហំអក្សរនៅផ្នែកខាងលើ ដើម្បីងាយស្រួលមើលតាមរយៈម៉ាស៊ីនបញ្ចាំងស្លាយឌីជីថល។"
                )}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              // Quick reset wetness
              coreWetnessRef.current = 0;
            }}
            className={`px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shrink-0 flex items-center gap-2 active:scale-95 ${
              isKh ? "font-khmer" : ""
            }`}
            style={{ fontSize: `clamp(13px, ${1.3 * zoom}vw, 20px)` }}
          >
            <RefreshCw className="w-4 h-4" />
            {t("Reset Pad Wetness", "សម្អាតកម្រិតជោគទឹក")}
          </button>
        </footer>
      </main>
    </div>
  );
}

// Clean names helper for active layer header title in sidebar
function activeLayerEnClean(name: string): string {
  // Strip "Layer X: " prefix for cleaner display
  return name.replace(/^Layer \d+: /, "");
}
