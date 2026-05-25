import React, { useRef, useState, useEffect, useMemo, Suspense, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useLanguageStore, useTranslation } from "@/store/use-language";
import { ArrowLeft, Sparkles, HelpCircle, Activity, ShieldAlert, Award, RefreshCw, Hexagon } from "lucide-react";
import { Link } from "wouter";

// ── WebGL Compatibility Checker ──────────────────────────────────────────────
function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

// ── WebGL Error Boundary ─────────────────────────────────────────────────────
class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: unknown) {
    console.warn("[VSEPR Canvas] WebGL canvas failed:", err);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ── Types for Molecule Coordinates ──────────────────────────────────────────
interface AtomData {
  pos: [number, number, number];
  color: string;
  size: number;
  label: string;
}

interface BondData {
  from: [number, number, number];
  to: [number, number, number];
}

interface LonePairData {
  rotation: [number, number, number];
}

interface MoleculeConfig {
  id: string;
  formula: string;
  nameEn: string;
  nameKh: string;
  shapeEn: string;
  shapeKh: string;
  angle: string;
  lonePairsCount: number;
  polarityEn: string;
  polarityKh: string;
  descEn: string;
  descKh: string;
  atoms: AtomData[];
  bonds: BondData[];
  lonePairs: LonePairData[];
}

// ── Molecule Database (Bond lengths normalized to 1.5) ──────────────────────
const MOLECULES: MoleculeConfig[] = [
  {
    id: "CH4",
    formula: "CH₄",
    nameEn: "Methane",
    nameKh: "មេតាន",
    shapeEn: "Tetrahedral",
    shapeKh: "ចតុកោណមុខបួន (Tetrahedral)",
    angle: "109.5°",
    lonePairsCount: 0,
    polarityEn: "Non-polar / Symmetrical",
    polarityKh: "គ្មានប៉ូល / ស៊ីមេទ្រី",
    descEn: "Methane has 4 bond pairs and 0 lone pairs. The four C-H bonds repel each other equally, creating a perfectly symmetrical tetrahedral shape with a bond angle of 109.5°.",
    descKh: "មេតានមានគូអេឡិចត្រុងចងសម្ព័ន្ធ ៤ និងគូសេរី ០។ ចំណង C-H ទាំងបួនច្រានគ្នាស្មើគ្នា បង្កើតជាទម្រង់ចតុកោណមុខបួនដ៏ល្អឥតខ្ចោះដែលមានមុំចំណង ១០៩.៥°។",
    atoms: [
      { pos: [0, 0, 0], color: "#1f2937", size: 0.5, label: "C" }, // Carbon (slate-800)
      { pos: [0, 1.5, 0], color: "#f1f5f9", size: 0.35, label: "H" }, // Hydrogen 1 (slate-100)
      { pos: [1.414, -0.5, 0], color: "#f1f5f9", size: 0.35, label: "H" }, // Hydrogen 2
      { pos: [-0.707, -0.5, 1.2247], color: "#f1f5f9", size: 0.35, label: "H" }, // Hydrogen 3
      { pos: [-0.707, -0.5, -1.2247], color: "#f1f5f9", size: 0.35, label: "H" } // Hydrogen 4
    ],
    bonds: [
      { from: [0, 0, 0], to: [0, 1.5, 0] },
      { from: [0, 0, 0], to: [1.414, -0.5, 0] },
      { from: [0, 0, 0], to: [-0.707, -0.5, 1.2247] },
      { from: [0, 0, 0], to: [-0.707, -0.5, -1.2247] }
    ],
    lonePairs: []
  },
  {
    id: "NH3",
    formula: "NH₃",
    nameEn: "Ammonia",
    nameKh: "អាម៉ូញាក់",
    shapeEn: "Trigonal pyramidal",
    shapeKh: "ពីរ៉ាមីតត្រីកោណ (Trigonal pyramidal)",
    angle: "107°",
    lonePairsCount: 1,
    polarityEn: "Polar / Asymmetrical",
    polarityKh: "មានប៉ូល / អសស៊ីមេទ្រី",
    descEn: "Ammonia has 3 bond pairs and 1 lone pair. The lone pair on Nitrogen exerts stronger repulsion than the N-H bonds, pushing the bonds downward and reducing the angle to 107°.",
    descKh: "អាម៉ូញាក់មានគូអេឡិចត្រុងចងសម្ព័ន្ធ ៣ និងគូសេរី ១។ គូអេឡិចត្រុងសេរីនៅលើអាសូតបង្កកម្លាំងច្រានខ្លាំងជាងចំណង N-H ដោយរុញច្រានចំណងចុះក្រោម និងបង្រួមមុំឲ្យសល់ត្រឹម ១០៧°។",
    atoms: [
      { pos: [0, 0, 0], color: "#2563eb", size: 0.55, label: "N" }, // Nitrogen (blue-600)
      { pos: [1.392, -0.558, 0], color: "#f1f5f9", size: 0.35, label: "H" },
      { pos: [-0.696, -0.558, 1.206], color: "#f1f5f9", size: 0.35, label: "H" },
      { pos: [-0.696, -0.558, -1.206], color: "#f1f5f9", size: 0.35, label: "H" }
    ],
    bonds: [
      { from: [0, 0, 0], to: [1.392, -0.558, 0] },
      { from: [0, 0, 0], to: [-0.696, -0.558, 1.206] },
      { from: [0, 0, 0], to: [-0.696, -0.558, -1.206] }
    ],
    lonePairs: [
      { rotation: [0, 0, 0] } // 1 lone pair pointing straight up along +Y
    ]
  },
  {
    id: "H2O",
    formula: "H₂O",
    nameEn: "Water",
    nameKh: "ទឹក",
    shapeEn: "Bent (V-shaped)",
    shapeKh: "កោង ឬរាងអក្សរ V (Bent)",
    angle: "104.5°",
    lonePairsCount: 2,
    polarityEn: "Strongly Polar / Asymmetrical",
    polarityKh: "មានប៉ូលខ្លាំង / ខ្លាំងអសស៊ីមេទ្រី",
    descEn: "Water has 2 bond pairs and 2 lone pairs. The strong repulsion between the two lone pairs (LP-LP) pushes the O-H bonds even closer together, decreasing the angle to 104.5°.",
    descKh: "ទឹកមានគូអេឡិចត្រុងចងសម្ព័ន្ធ ២ និងគូសេរី ២។ កម្លាំងច្រានដ៏ខ្លាំងក្លារវាងគូសេរីទាំងពីរ (LP-LP) រុញច្រានចំណង O-H ឲ្យកាន់តែខិតជិតគ្នា ដោយបង្រួញមុំឱ្យសល់ត្រឹម ១០៤.៥°។",
    atoms: [
      { pos: [0, 0, 0], color: "#dc2626", size: 0.55, label: "O" }, // Oxygen (red-600)
      { pos: [1.186, -0.918, 0], color: "#f1f5f9", size: 0.35, label: "H" },
      { pos: [-1.186, -0.918, 0], color: "#f1f5f9", size: 0.35, label: "H" }
    ],
    bonds: [
      { from: [0, 0, 0], to: [1.186, -0.918, 0] },
      { from: [0, 0, 0], to: [-1.186, -0.918, 0] }
    ],
    lonePairs: [
      // 2 lone pairs in YZ plane rotated by 57.5° and -57.5° around X-axis
      { rotation: [0.9948, 0, 0] }, // 57.5° in radians
      { rotation: [-0.9948, 0, 0] } // -57.5° in radians
    ]
  }
];

// ── 3D Render Cylinder Bond Component ──────────────────────────────────────
function CylinderBond({ from, to, color = "#64748b" }: { from: [number, number, number]; to: [number, number, number]; color?: string }) {
  const pFrom = useMemo(() => new THREE.Vector3(...from), [from]);
  const pTo = useMemo(() => new THREE.Vector3(...to), [to]);
  const dir = useMemo(() => new THREE.Vector3().subVectors(pTo, pFrom), [pFrom, pTo]);
  const length = useMemo(() => dir.length(), [dir]);
  const midpoint = useMemo(() => new THREE.Vector3().addVectors(pFrom, pTo).multiplyScalar(0.5), [pFrom, pTo]);

  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const q = useMemo(() => new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize()), [dir, up]);

  return (
    <mesh position={midpoint} quaternion={q}>
      <cylinderGeometry args={[0.07, 0.07, length, 16]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

// ── 3D Render Lone Pair Lobe Component ──────────────────────────────────────
function LonePairLobe({ rotation }: { rotation: [number, number, number] }) {
  return (
    <group rotation={rotation}>
      {/* Translucent Electron Cloud Lobe */}
      <mesh position={[0, 0.9, 0]} scale={[0.42, 0.85, 0.42]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#22d3ee" // Neon Cyan
          emissive="#0891b2"
          emissiveIntensity={0.5}
          transparent={true}
          opacity={0.35}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Two Tiny Glowing Electrons inside the cloud */}
      <mesh position={[-0.15, 0.9, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.15, 0.9, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// ── 3D Model Renderer ────────────────────────────────────────────────────────
function Molecule3D({ config }: { config: MoleculeConfig }) {
  return (
    <group>
      {/* Atoms */}
      {config.atoms.map((atom, idx) => (
        <mesh key={`atom-${idx}`} position={atom.pos}>
          <sphereGeometry args={[atom.size, 32, 32]} />
          <meshStandardMaterial
            color={atom.color}
            roughness={0.2}
            metalness={0.15}
            emissive={atom.color}
            emissiveIntensity={0.06}
          />
        </mesh>
      ))}

      {/* Bonds */}
      {config.bonds.map((bond, idx) => (
        <CylinderBond key={`bond-${idx}`} from={bond.from} to={bond.to} />
      ))}

      {/* Lone Pairs */}
      {config.lonePairs.map((lp, idx) => (
        <LonePairLobe key={`lp-${idx}`} rotation={lp.rotation} />
      ))}
    </group>
  );
}

// ── 2D SVG Fallback Component ────────────────────────────────────────────────
function Molecule2D({ config, isKh }: { config: MoleculeConfig; isKh: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 gap-4">
      {config.id === "CH4" && (
        <svg viewBox="0 0 200 200" className="w-48 h-48" aria-hidden="true">
          {/* Bonds */}
          <line x1="100" y1="100" x2="100" y2="40" stroke="#64748b" strokeWidth="6" />
          <line x1="100" y1="100" x2="155" y2="120" stroke="#64748b" strokeWidth="6" />
          {/* Wedged bond */}
          <polygon points="100,100 60,135 70,140" fill="#38bdf8" />
          {/* Dashed bond */}
          <line x1="100" y1="100" x2="115" y2="140" stroke="#64748b" strokeWidth="4" strokeDasharray="6,4" />
          {/* Central Atom */}
          <circle cx="100" cy="100" r="20" fill="#374151" />
          <text x="100" y="106" fill="#fff" fontSize="18" fontWeight="bold" textAnchor="middle">C</text>
          {/* Hydrogens */}
          <circle cx="100" cy="40" r="14" fill="#cbd5e1" />
          <text x="100" y="45" fill="#000" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
          <circle cx="155" cy="120" r="14" fill="#cbd5e1" />
          <text x="155" y="125" fill="#000" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
          <circle cx="65" cy="137" r="14" fill="#cbd5e1" />
          <text x="65" y="142" fill="#000" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
          <circle cx="115" cy="140" r="14" fill="#cbd5e1" />
          <text x="115" y="145" fill="#000" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
        </svg>
      )}

      {config.id === "NH3" && (
        <svg viewBox="0 0 200 200" className="w-48 h-48" aria-hidden="true">
          {/* Lone pair cloud lobe */}
          <path d="M100,90 C80,50 85,25 100,25 C115,25 120,50 100,90 Z" fill="#22d3ee" fillOpacity="0.3" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="95" cy="45" r="3" fill="#fbbf24" />
          <circle cx="105" cy="45" r="3" fill="#fbbf24" />
          {/* Bonds */}
          <line x1="100" y1="90" x2="155" y2="115" stroke="#64748b" strokeWidth="6" />
          <polygon points="100,90 60,125 70,130" fill="#38bdf8" />
          <line x1="100" y1="90" x2="115" y2="135" stroke="#64748b" strokeWidth="4" strokeDasharray="6,4" />
          {/* Central Atom */}
          <circle cx="100" cy="90" r="20" fill="#2563eb" />
          <text x="100" y="96" fill="#fff" fontSize="18" fontWeight="bold" textAnchor="middle">N</text>
          {/* Hydrogens */}
          <circle cx="155" cy="115" r="14" fill="#cbd5e1" />
          <text x="155" y="120" fill="#000" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
          <circle cx="65" cy="127" r="14" fill="#cbd5e1" />
          <text x="65" y="132" fill="#000" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
          <circle cx="115" cy="135" r="14" fill="#cbd5e1" />
          <text x="115" y="140" fill="#000" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
        </svg>
      )}

      {config.id === "H2O" && (
        <svg viewBox="0 0 200 200" className="w-48 h-48" aria-hidden="true">
          {/* 2 Lone pair lobes */}
          <g transform="rotate(-30 100 90)">
            <path d="M100,90 C85,55 90,30 100,30 C110,30 115,55 100,90 Z" fill="#22d3ee" fillOpacity="0.3" stroke="#22d3ee" strokeWidth="2" />
            <circle cx="96" cy="48" r="3" fill="#fbbf24" />
            <circle cx="104" cy="48" r="3" fill="#fbbf24" />
          </g>
          <g transform="rotate(30 100 90)">
            <path d="M100,90 C85,55 90,30 100,30 C110,30 115,55 100,90 Z" fill="#22d3ee" fillOpacity="0.3" stroke="#22d3ee" strokeWidth="2" />
            <circle cx="96" cy="48" r="3" fill="#fbbf24" />
            <circle cx="104" cy="48" r="3" fill="#fbbf24" />
          </g>
          {/* Bonds */}
          <line x1="100" y1="90" x2="50" y2="135" stroke="#64748b" strokeWidth="6" />
          <line x1="100" y1="90" x2="150" y2="135" stroke="#64748b" strokeWidth="6" />
          {/* Central Atom */}
          <circle cx="100" cy="90" r="20" fill="#dc2626" />
          <text x="100" y="96" fill="#fff" fontSize="18" fontWeight="bold" textAnchor="middle">O</text>
          {/* Hydrogens */}
          <circle cx="50" cy="135" r="14" fill="#cbd5e1" />
          <text x="50" y="140" fill="#000" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
          <circle cx="150" cy="135" r="14" fill="#cbd5e1" />
          <text x="150" y="140" fill="#000" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
        </svg>
      )}

      <div className="flex items-center gap-1.5 text-amber-500">
        <ShieldAlert className="w-5 h-5" aria-hidden="true" />
        <span className={`text-xs font-bold ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "ការបើកដំណើរការ ៣ វិមាត្រត្រូវការ WebGL" : "3D Mode Requires WebGL"}
        </span>
      </div>
      <p className={`text-[11px] text-slate-400 max-w-xs ${isKh ? "font-khmer leading-loose" : ""}`}>
        {isKh
          ? "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រ WebGL ទេ។ បង្ហាញដ្យាក្រាម ២ វិមាត្រជំនួសវិញ។"
          : "Your browser does not support WebGL. Displaying 2D diagram fallback."}
      </p>
    </div>
  );
}

// ── Main Page Component ──────────────────────────────────────────────────────
export default function VseprTheoryPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  const t = useTranslation();

  const [activeId, setActiveId] = useState<string>("CH4");
  const [webglOk, setWebglOk] = useState<boolean>(true);
  const [resetKey, setResetKey] = useState<number>(0);

  // Check WebGL availability on mount
  useEffect(() => {
    setWebglOk(hasWebGL());
  }, []);

  const activeMolecule = useMemo(() => {
    return MOLECULES.find((m) => m.id === activeId) || MOLECULES[0];
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans flex flex-col relative overflow-x-hidden">
      {/* Space matrix radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-[#050b18] to-black pointer-events-none" />

      {/* Top Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/chemistry" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className={isKh ? "font-khmer" : "font-semibold"}>{t("Back to Chemistry", "ត្រឡប់ទៅមជ្ឈមណ្ឌលគីមី")}</span>
          </Link>

          <div className="flex items-center gap-2">
            <Hexagon className="w-5 h-5 text-cyan-400" />
            <span
              className={`font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-400 text-lg sm:text-xl uppercase ${
                isKh ? "font-khmer" : ""
              }`}
            >
              {t("VSEPR Theory & Shapes", "ទ្រឹស្តី VSEPR & ទម្រង់ម៉ូលេគុល")}
            </span>
          </div>

          <div className="text-slate-500 text-xs hidden sm:block">
            <span>CHEM-ORGC-102</span>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 3D Molecule Viewport (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div
            className="w-full relative h-[450px] sm:h-[500px] rounded-3xl border-2 border-slate-800 bg-slate-950/80 shadow-[inset_0_0_40px_rgba(34,211,238,0.05),_0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden cursor-grab active:cursor-grabbing"
            aria-label={t("Interactive 3D molecule viewer", "កម្មវិធីបង្ហាញម៉ូលេគុល ៣ វិមាត្រ")}
          >
            {/* Title overlay */}
            <div className="absolute top-4 left-6 z-10 pointer-events-none">
              <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block">
                {t("3D Interactive Stage", "ឆាកបង្ហាញ ៣ វិមាត្រ")}
              </span>
              <h2
                className={`text-2xl sm:text-3xl font-black text-white ${isKh ? "font-khmer mt-1" : ""}`}
                style={{ fontSize: "max(1.5rem, 2.5vw)" }}
              >
                {isKh ? activeMolecule.nameKh : activeMolecule.nameEn} ({activeMolecule.formula})
              </h2>
            </div>

            {/* Canvas / fallback view */}
            {webglOk ? (
              <CanvasErrorBoundary
                fallback={<Molecule2D config={activeMolecule} isKh={isKh} />}
              >
                <Canvas
                  key={`${activeId}-${resetKey}`}
                  camera={{ position: [3, 2, 4], fov: 45 }}
                  dpr={[1, 2]}
                  gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
                  onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                  }}
                >
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[6, 8, 4]} intensity={1.2} />
                    <directionalLight position={[-6, -4, -3]} intensity={0.4} color="#0891b2" />
                    <Molecule3D config={activeMolecule} />
                    <OrbitControls
                      enablePan={false}
                      enableZoom={true}
                      minDistance={2.5}
                      maxDistance={7}
                      makeDefault
                    />
                  </Suspense>
                </Canvas>
              </CanvasErrorBoundary>
            ) : (
              <Molecule2D config={activeMolecule} isKh={isKh} />
            )}

            {/* Instruction helper */}
            {webglOk && (
              <div className="absolute bottom-4 left-6 pointer-events-none flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl backdrop-blur-md">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className={`text-[11px] font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                  {t("Click & drag to rotate molecule", "ចុច និងអូសដើម្បីបង្វិលម៉ូលេគុល")}
                </span>
              </div>
            )}

            {/* Reset angle button */}
            <button
              onClick={() => setResetKey((k) => k + 1)}
              className="absolute bottom-4 right-6 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 text-slate-400 hover:text-white"
              title={t("Reset view", "កំណត់មុំឡើងវិញ")}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Molecule Selection Toggle Row */}
          <div className="w-full grid grid-cols-3 gap-4">
            {MOLECULES.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveId(m.id);
                  setResetKey((k) => k + 1);
                }}
                className={`py-4 rounded-2xl border-2 transition-all font-black text-center shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
                  activeId === m.id
                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                    : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-white"
                }`}
                style={{ fontSize: "max(1.1rem, 2vw)" }}
              >
                <span className="block font-mono">{m.id}</span>
                <span className={`block font-normal mt-0.5 text-xs opacity-75 ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? m.nameKh : m.nameEn}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Data & Theory Panels (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Dynamic educational statistics panel */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase block mb-1">
                {t("Properties", "លក្ខណៈសម្បត្តិ")}
              </span>
              <h3
                className={`text-2xl font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.3rem, 2.2vw)" }}
              >
                {t("Molecular Geometry", "ធរណីមាត្រម៉ូលេគុល")}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Shape */}
              <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl">
                <span className={`block text-[10px] text-slate-500 mb-1 ${isKh ? "font-khmer" : "tracking-widest uppercase"}`}>
                  {t("Molecular Shape", "ទម្រង់ម៉ូលេគុល")}
                </span>
                <span className={`text-base font-bold text-white block ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? activeMolecule.shapeKh : activeMolecule.shapeEn}
                </span>
              </div>

              {/* Bond Angle */}
              <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl">
                <span className={`block text-[10px] text-slate-500 mb-1 ${isKh ? "font-khmer" : "tracking-widest uppercase"}`}>
                  {t("Bond Angle", "មុំចំណង")}
                </span>
                <span className="text-xl font-black text-cyan-300 block font-mono">
                  {activeMolecule.angle}
                </span>
              </div>

              {/* Lone Pairs */}
              <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl">
                <span className={`block text-[10px] text-slate-500 mb-1 ${isKh ? "font-khmer" : "tracking-widest uppercase"}`}>
                  {t("Lone Pairs count", "គូអេឡិចត្រុងសេរី")}
                </span>
                <span className="text-xl font-black text-amber-400 block font-mono">
                  {activeMolecule.lonePairsCount}
                </span>
              </div>

              {/* Polarity */}
              <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl">
                <span className={`block text-[10px] text-slate-500 mb-1 ${isKh ? "font-khmer" : "tracking-widest uppercase"}`}>
                  {t("Polarity", "ប៉ូលម៉ូលេគុល")}
                </span>
                <span className={`text-base font-bold text-white block ${isKh ? "font-khmer" : ""}`}>
                  {isKh ? activeMolecule.polarityKh : activeMolecule.polarityEn}
                </span>
              </div>
            </div>

            {/* Description Text */}
            <p
              className={`text-slate-300 border-t border-slate-800 pt-4 ${isKh ? "font-khmer leading-loose" : "leading-relaxed text-sm"}`}
              style={{ fontSize: "max(0.95rem, 1.8vw)" }}
            >
              {isKh ? activeMolecule.descKh : activeMolecule.descEn}
            </p>
          </div>

          {/* VSEPR Core Theory static card */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <HelpCircle className="w-5 h-5" />
              </span>
              <h3
                className={`font-black text-white ${isKh ? "font-khmer" : ""}`}
                style={{ fontSize: "max(1.3rem, 2.2vw)" }}
              >
                {t("VSEPR Repulsion Rule", "ច្បាប់ច្រានគ្នានៃ VSEPR")}
              </h3>
            </div>

            {/* Highlighted core hierarchy block */}
            <div className="bg-gradient-to-r from-indigo-950/50 to-slate-950/50 border-l-4 border-indigo-500 p-4 rounded-r-2xl">
              <span className="text-[10px] font-bold text-indigo-400 font-mono tracking-widest uppercase block mb-1">
                {t("CORE REPULSION ORDER", "លំដាប់កម្លាំងច្រាន")}
              </span>
              <span className="font-mono font-bold text-white text-xs sm:text-sm block leading-relaxed">
                LP-LP Repulsion &gt; LP-BP Repulsion &gt; BP-BP Repulsion
              </span>
              <span className="font-khmer text-slate-400 text-xs block leading-relaxed mt-1">
                (គូសេរី-គូសេរី &gt; គូសេរី-គូចង &gt; គូចង-គូចង)
              </span>
            </div>

            {/* Static Explanatory details */}
            <p
              className={`text-slate-300 ${isKh ? "font-khmer leading-loose" : "leading-relaxed text-sm"}`}
              style={{ fontSize: "max(0.95rem, 1.8vw)" }}
            >
              {t(
                "Valence shell electron pairs (both bonding and non-bonding) surround the central atom and repel each other to get as far apart as possible. Because Lone Pairs (LP) are closer to the central nucleus than Bond Pairs (BP), they occupy more spatial volume. As the count of lone pairs increases, they push the bonding atoms closer together, reducing the default tetrahedral angle (109.5°) to 107° in Ammonia and 104.5° in Water.",
                "គូអេឡិចត្រុងស្រទាប់ក្រៅ (ទាំងគូចងសម្ព័ន្ធ និងគូសេរី) នៅជុំវិញអាតូមកណ្តាល ច្រានគ្នាទៅវិញទៅមកដើម្បីនៅឆ្ងាយពីគ្នាបំផុតតាមដែលអាចធ្វើទៅបាន។ ដោយសារតែគូសេរី (LP) ស្ថិតនៅជិតស្នូលអាតូមកណ្តាលជាងគូចង (BP) ពួកវាត្រូវការលំហធំជាង។ នៅពេលគូសេរីកើនឡើង ពួកវារុញច្រានអាតូមចងសម្ព័ន្ធឱ្យខិតជិតគ្នា ដោយកាត់បន្ថយមុំចតុកោណមុខបួនពីដើម (១០៩.៥°) មកត្រឹម ១០៧° ក្នុងអាម៉ូញាក់ និង ១០៤.៥° ក្នុងទឹក។"
              )}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
