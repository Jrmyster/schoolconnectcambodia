import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense, useCallback, Component, type ReactNode } from "react";
import * as THREE from "three";
import { X, AlertCircle } from "lucide-react";

// ── WebGL error boundary ──────────────────────────────────────────────────────

interface EBState { hasError: boolean }
class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ── Planet data ──────────────────────────────────────────────────────────────

interface PlanetConfig {
  name: string;
  nameKh: string;
  radius: number;
  distance: number;
  speed: number;
  color: string;
  emissive?: string;
  roughness?: number;
  metalness?: number;
  hasRings?: boolean;
  ringColor?: string;
  startAngle: number;
  factEn: string;
  factKh: string;
  labelColor: string;
}

const PLANETS: PlanetConfig[] = [
  {
    name: "Mercury",
    nameKh: "ភពស្វ",
    radius: 0.22,
    distance: 3.0,
    speed: 1.60,
    color: "#A89E96",
    roughness: 0.9,
    metalness: 0.1,
    startAngle: 0.7,
    factEn: "A year on Mercury lasts just 88 Earth days — the fastest orbit in the Solar System.",
    factKh: "មួយឆ្នាំនៅភពស្វ មានត្រឹមតែ ៨៨ ថ្ងៃផែនដី — ការផ្លូវវៀចលឿនបំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ។",
    labelColor: "#D1C4BE",
  },
  {
    name: "Venus",
    nameKh: "ភពសុក្រ",
    radius: 0.38,
    distance: 4.6,
    speed: 1.17,
    color: "#E6C94B",
    emissive: "#8B5E00",
    roughness: 0.7,
    metalness: 0.05,
    startAngle: 2.1,
    factEn: "Venus is hotter than Mercury at 465 °C — its thick CO₂ atmosphere traps heat like a furnace.",
    factKh: "ភពសុក្រក្ដៅ ៤៦៥ °C — បរិយាកាស CO₂ ក្រាស់ធ្ងន់ of it traps heat like a furnace.",
    labelColor: "#F0DC82",
  },
  {
    name: "Earth",
    nameKh: "ភពផែនដី",
    radius: 0.40,
    distance: 6.2,
    speed: 1.00,
    color: "#2B77A8",
    emissive: "#003A5A",
    roughness: 0.6,
    metalness: 0.1,
    startAngle: 4.5,
    factEn: "Earth is the only planet known to harbour life — protected by a magnetic field and liquid water oceans.",
    factKh: "ផែនដីជាភពតែមួយ ដែលស្គាល់ថាមានជីវិត — ការពារដោយសង្វាក់ម៉ាញ៉េទិក និងទឹកសមុទ្ររាវ។",
    labelColor: "#7EC8E3",
  },
  {
    name: "Mars",
    nameKh: "ភពដែក",
    radius: 0.30,
    distance: 8.0,
    speed: 0.80,
    color: "#C1440E",
    emissive: "#5A1A00",
    roughness: 0.9,
    metalness: 0.05,
    startAngle: 1.2,
    factEn: "Olympus Mons on Mars is the tallest volcano in the Solar System — nearly 3× the height of Everest.",
    factKh: "Olympus Mons នៅភពដែក ជាភ្នំភ្លើងខ្ពស់បំផុតក្នុងប្រព័ន្ធព្រះអាទិត្យ — ខ្ពស់ជិត ៣ ដងភ្នំ Everest។",
    labelColor: "#FF7043",
  },
  {
    name: "Jupiter",
    nameKh: "ភពព្រហស្បតិ",
    radius: 0.80,
    distance: 11.0,
    speed: 0.43,
    color: "#C88B3A",
    emissive: "#5A3800",
    roughness: 0.5,
    metalness: 0.15,
    startAngle: 3.3,
    factEn: "Jupiter's Great Red Spot is a storm that has raged for over 350 years — wider than Earth itself.",
    factKh: "ចំណុចក្រហមមហាភព Jupiter គឺជាព្យុះបក់ជាង ៣៥០ ឆ្នាំ — ធំជាងផែនដីទាំងមូល។",
    labelColor: "#FFCC80",
  },
  {
    name: "Saturn",
    nameKh: "ភពសៅរ",
    radius: 0.68,
    distance: 14.5,
    speed: 0.32,
    color: "#D4B483",
    emissive: "#6B5020",
    roughness: 0.6,
    metalness: 0.1,
    hasRings: true,
    ringColor: "#C9A84C",
    startAngle: 5.1,
    factEn: "Saturn's rings are mostly ice — from tiny grains to chunks the size of a house. It could float on water!",
    factKh: "ចិញ្ចៀនភពសៅរភាគច្រើនជាទឹកកក — ពីគ្រាប់ខ្សាច់ រហូតដល់ដុំប្រហែលជាផ្ទះ។ ភពនេះអាចអណ្តែតនៅលើទឹកបាន!",
    labelColor: "#FFE082",
  },
  {
    name: "Uranus",
    nameKh: "ភពអ៊ុយរ៉ានុស",
    radius: 0.52,
    distance: 18.0,
    speed: 0.22,
    color: "#7DE8E8",
    emissive: "#006666",
    roughness: 0.5,
    metalness: 0.2,
    startAngle: 0.4,
    factEn: "Uranus rotates on its side with a 98° axial tilt — it essentially rolls around the Sun like a bowling ball.",
    factKh: "ភពអ៊ុយរ៉ានុស វិលម្ខាង ជាមួយ axial tilt ៩៨° — វាពិតជា lek ជុំព្រះអាទិត្យដូចបាល់ bowling។",
    labelColor: "#80DEEA",
  },
  {
    name: "Neptune",
    nameKh: "ភពណែបទូន",
    radius: 0.50,
    distance: 21.5,
    speed: 0.14,
    color: "#3F51B5",
    emissive: "#1A237E",
    roughness: 0.5,
    metalness: 0.2,
    startAngle: 2.8,
    factEn: "Neptune has the strongest winds in the Solar System — gusts reach 2,100 km/h, faster than sound!",
    factKh: "ភពណែបទូនមានខ្យល់ខ្លាំងបំផុត — ដល់ ២.១០០ គ.ម./ម៉ោង លឿនជាងសំឡេង!",
    labelColor: "#9FA8DA",
  },
];

// ── Orbit ring (static, centered on Sun) ─────────────────────────────────────

function OrbitRing({ distance }: { distance: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[distance - 0.03, distance + 0.03, 128]} />
      <meshBasicMaterial
        color="#FFFFFF"
        opacity={0.07}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── The Sun ───────────────────────────────────────────────────────────────────

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (sunRef.current) sunRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group>
      <pointLight intensity={4} distance={120} decay={1.2} color="#FFA040" />
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.82, 32, 32]} />
        <meshBasicMaterial color="#FF8C00" opacity={0.18} transparent depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial color="#FF5500" opacity={0.07} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

// ── Individual planet ─────────────────────────────────────────────────────────

interface PlanetMeshProps {
  config: PlanetConfig;
  onSelect: (c: PlanetConfig) => void;
  isSelected: boolean;
}

function PlanetMesh({ config, onSelect, isSelected }: PlanetMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * config.speed * 0.18;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <>
      <OrbitRing distance={config.distance} />
      <group ref={groupRef} rotation={[0, config.startAngle, 0]}>
        <mesh
          ref={meshRef}
          position={[config.distance, 0, 0]}
          onClick={(e) => { e.stopPropagation(); onSelect(config); }}
          onPointerOver={() => { document.body.style.cursor = "pointer"; }}
          onPointerOut={() => { document.body.style.cursor = "default"; }}
        >
          <sphereGeometry args={[config.radius, 40, 40]} />
          <meshStandardMaterial
            color={config.color}
            emissive={isSelected ? (config.emissive ?? "#222222") : "#000000"}
            emissiveIntensity={isSelected ? 0.6 : 0}
            roughness={config.roughness ?? 0.8}
            metalness={config.metalness ?? 0.1}
          />
        </mesh>

        {config.hasRings && (
          <mesh
            position={[config.distance, 0, 0]}
            rotation={[Math.PI / 2.2, 0.15, 0]}
          >
            <ringGeometry args={[config.radius * 1.45, config.radius * 2.5, 80]} />
            <meshBasicMaterial
              color={config.ringColor ?? "#C9A84C"}
              opacity={0.65}
              transparent
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}

        {isSelected && (
          <mesh position={[config.distance, 0, 0]}>
            <sphereGeometry args={[config.radius * 1.35, 32, 32]} />
            <meshBasicMaterial
              color={config.labelColor}
              opacity={0.18}
              transparent
              depthWrite={false}
            />
          </mesh>
        )}
      </group>
    </>
  );
}

// ── Scene (inside Canvas) ─────────────────────────────────────────────────────

interface SceneProps {
  onPlanetSelect: (c: PlanetConfig | null) => void;
  selectedName: string | null;
}

function Scene({ onPlanetSelect, selectedName }: SceneProps) {
  const handleSelect = useCallback(
    (config: PlanetConfig) => {
      onPlanetSelect(selectedName === config.name ? null : config);
    },
    [onPlanetSelect, selectedName],
  );

  const handleMiss = useCallback(() => {
    onPlanetSelect(null);
  }, [onPlanetSelect]);

  return (
    <>
      <ambientLight intensity={0.12} />
      <Stars radius={100} depth={60} count={3000} factor={4} saturation={0} fade speed={0.3} />
      <Sun />
      {PLANETS.map((p) => (
        <PlanetMesh
          key={p.name}
          config={p}
          onSelect={handleSelect}
          isSelected={selectedName === p.name}
        />
      ))}
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={55}
        dampingFactor={0.1}
        enableDamping
        makeDefault
      />
      <mesh visible={false} onPointerDown={handleMiss}>
        <sphereGeometry args={[100, 8, 8]} />
        <meshBasicMaterial side={THREE.BackSide} />
      </mesh>
    </>
  );
}

// ── Planet info panel (2D overlay) ────────────────────────────────────────────

function PlanetPanel({
  planet,
  kh,
  onClose,
}: {
  planet: PlanetConfig;
  kh: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 rounded-2xl border border-white/20 backdrop-blur-md p-4 animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{ background: "rgba(5,15,35,0.92)", boxShadow: `0 0 40px ${planet.labelColor}30, 0 8px 32px rgba(0,0,0,0.6)` }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3
            className={`font-bold text-lg leading-tight ${kh ? "font-khmer" : "font-display"}`}
            style={{ color: planet.labelColor }}
          >
            {kh ? planet.nameKh : planet.name}
          </h3>
          {kh && (
            <p className="text-white/40 text-xs font-mono mt-0.5">{planet.name}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors mt-0.5"
          aria-label="Close"
        >
          <X size={15} />
        </button>
      </div>

      <div
        className="rounded-xl border border-white/10 p-3 text-sm leading-relaxed"
        style={{ background: `${planet.labelColor}10` }}
      >
        <p className="text-white/80 mb-2 leading-relaxed">{planet.factEn}</p>
        <div className="border-t border-white/10 pt-2 mt-2">
          <p className={`text-white/60 text-sm leading-loose font-khmer`}>{planet.factKh}</p>
        </div>
      </div>
    </div>
  );
}

// ── Sun label (shown at start) ────────────────────────────────────────────────

function Hint({ kh }: { kh: boolean }) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 backdrop-blur-sm text-white/45 text-xs font-semibold pointer-events-none whitespace-nowrap"
      style={{ background: "rgba(0,0,0,0.45)" }}>
      <span>{kh ? "ចុចលើភពណាមួយ ✦ អូសដើម្បីបង្វិល" : "Click a planet · Drag to rotate · Scroll to zoom"}</span>
    </div>
  );
}

// ── Public component ──────────────────────────────────────────────────────────

function WebGLFallback({ kh }: { kh: boolean }) {
  return (
    <div className="w-full rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-3 text-white/50 px-6 text-center"
      style={{ height: "520px", background: "#000810" }}>
      <AlertCircle className="w-8 h-8 text-amber-400" />
      <p className={`text-sm max-w-xs ${kh ? "font-khmer leading-loose" : ""}`}>
        {kh
          ? "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រ WebGL ទេ។ សូមប្រើ Chrome ឬ Firefox ដើម្បីមើលប្រព័ន្ធព្រះអាទិត្យ 3D។"
          : "Your browser does not support WebGL. Try Chrome or Firefox to view the 3D Solar System."}
      </p>
    </div>
  );
}

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export function SolarSystem3D({ kh }: { kh: boolean }) {
  const [selected, setSelected] = useState<PlanetConfig | null>(null);
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglOk(checkWebGL());
  }, []);

  const handleSelect = useCallback((c: PlanetConfig | null) => {
    setSelected(c);
  }, []);

  if (webglOk === null) {
    return (
      <div className="w-full rounded-3xl border border-white/10 flex items-center justify-center"
        style={{ height: "520px", background: "#000810" }} />
    );
  }

  if (!webglOk) {
    return <WebGLFallback kh={kh} />;
  }

  return (
    <WebGLErrorBoundary fallback={<WebGLFallback kh={kh} />}>
    <div
      className="relative w-full rounded-3xl overflow-hidden border border-white/10"
      style={{ height: "520px", background: "#000810" }}
      aria-label={kh ? "ប្រព័ន្ធព្រះអាទិត្យ 3D" : "Interactive 3D Solar System"}
    >
      <Canvas
        camera={{ position: [0, 16, 26], fov: 52 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene onPlanetSelect={handleSelect} selectedName={selected?.name ?? null} />
        </Suspense>
      </Canvas>

      {selected ? (
        <PlanetPanel planet={selected} kh={kh} onClose={() => setSelected(null)} />
      ) : (
        <Hint kh={kh} />
      )}

      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-sm text-white/50 text-xs pointer-events-none"
        style={{ background: "rgba(0,0,0,0.5)" }}>
        <span className="w-2 h-2 rounded-full bg-[#FDB813]" />
        <span className={kh ? "font-khmer" : ""}>{kh ? "ប្រព័ន្ធព្រះអាទិត្យ" : "Solar System"}</span>
      </div>
    </div>
    </WebGLErrorBoundary>
  );
}
