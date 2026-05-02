import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Component, ReactNode, useRef, useState } from "react";
import * as THREE from "three";

const NEON_ORANGE = "#ff8c00";
const NEON_AMBER = "#ffa040";
const STEEL = "#cbd5e1";

// ─── Firing order 1-3-4-2 ────────────────────────────────────────────────
// Power-stroke offset (in 720° cycle degrees) per cylinder index 0..3.
//   Cyl 1 fires at   0°
//   Cyl 3 fires at 180°
//   Cyl 4 fires at 360°
//   Cyl 2 fires at 540°
// Mechanical pairing falls out modulo 360°: cyls 1+4 share phase, 2+3 share opposite phase.
const POWER_OFFSETS_DEG: [number, number, number, number] = [0, 540, 180, 360];

const CYL_X = [-2.4, -0.8, 0.8, 2.4]; // cylinder x-positions in the block
const STROKE = 0.9;
const PISTON_BASE_Y = 0.0;

// ────────────────────────────────────────────────────────────────────────────
// Detect whether WebGL is available — headless test runners and very old
// browsers may have no WebGL context, in which case we render a graceful
// bilingual fallback instead of crashing react-three-fiber.
// ────────────────────────────────────────────────────────────────────────────
function detectWebGL(): boolean {
  if (typeof document === "undefined") return false;
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

class WebGLBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: unknown) {
    // Surface as warning so tests don't see an uncaught error overlay.
    // eslint-disable-next-line no-console
    console.warn("[Engine3DViewer] 3D init failed, falling back:", err);
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Animated engine core (runs only when WebGL works)
// ────────────────────────────────────────────────────────────────────────────
function EngineCore({ rpm }: { rpm: number }) {
  const pistonRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null]);
  const flashRefs = useRef<(THREE.PointLight | null)[]>([null, null, null, null]);
  const flameRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null]);
  const crankAngleRef = useRef(0); // crankshaft angle in degrees (accumulating)

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05); // clamp huge frame skips
    if (rpm > 0) {
      // Slider 0..100 → crank speed 0..36 rad/s for a satisfying visual range.
      const radPerSec = rpm * 0.36;
      crankAngleRef.current += (radPerSec * dt * 180) / Math.PI;
    }
    const crankDeg = crankAngleRef.current;

    for (let i = 0; i < 4; i++) {
      const offset = POWER_OFFSETS_DEG[i];

      // Piston position: cosine wave once per crankshaft revolution (360°).
      const mechRad = ((crankDeg - offset) * Math.PI) / 180;
      const y = PISTON_BASE_Y + (Math.cos(mechRad) * STROKE) / 2;
      const piston = pistonRefs.current[i];
      if (piston) piston.position.y = y;

      // Power-stroke flash: brief orange burst when (crank - offset) wraps the 720° cycle.
      const cyc = (((crankDeg - offset) % 720) + 720) % 720;
      const flashWindow = 35;
      const flashStrength =
        rpm > 0 && cyc < flashWindow
          ? (1 - cyc / flashWindow) * (1.5 + rpm / 25)
          : 0;
      const light = flashRefs.current[i];
      if (light) light.intensity = flashStrength * 4;
      const flame = flameRefs.current[i];
      if (flame) {
        const mat = flame.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.min(0.85, flashStrength * 0.7);
        const s = 0.6 + flashStrength * 0.4;
        flame.scale.set(s, s, s);
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Floor / shop pad */}
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.4} roughness={0.85} />
      </mesh>

      {/* Crankcase / oil pan */}
      <mesh position={[0, -1.05, 0]}>
        <boxGeometry args={[6.2, 0.55, 1.7]} />
        <meshStandardMaterial color="#1a1a1d" metalness={0.85} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[6.4, 0.18, 1.85]} />
        <meshStandardMaterial color="#2a2a2d" metalness={0.85} roughness={0.35} />
      </mesh>

      {/* Glass-like engine block (semi-transparent so pistons are visible) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6.0, 1.6, 1.55]} />
        <meshStandardMaterial
          color="#0d1014"
          metalness={0.15}
          roughness={0.05}
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Wireframe overlay so the block reads as engineering blueprint glass */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6.01, 1.61, 1.56]} />
        <meshBasicMaterial color={NEON_ORANGE} wireframe transparent opacity={0.32} />
      </mesh>

      {/* Cylinder head */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[6.0, 0.3, 1.55]} />
        <meshStandardMaterial color="#16181c" metalness={0.9} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.18, 0]}>
        <boxGeometry args={[5.6, 0.18, 1.0]} />
        <meshStandardMaterial color="#1f2126" metalness={0.7} roughness={0.45} />
      </mesh>

      {/* 4 cylinders */}
      {CYL_X.map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Hollow cylinder tube — open both ends so we can see the piston */}
          <mesh>
            <cylinderGeometry args={[0.46, 0.46, 1.55, 32, 1, true]} />
            <meshStandardMaterial
              color="#3b3f47"
              metalness={0.85}
              roughness={0.28}
              side={THREE.DoubleSide}
              transparent
              opacity={0.65}
            />
          </mesh>
          {/* Inner bore wireframe ring */}
          <mesh>
            <cylinderGeometry args={[0.461, 0.461, 1.55, 24, 1, true]} />
            <meshBasicMaterial color={NEON_AMBER} wireframe transparent opacity={0.18} />
          </mesh>

          {/* Piston */}
          <mesh
            ref={(el) => {
              pistonRefs.current[i] = el;
            }}
            position={[0, PISTON_BASE_Y, 0]}
          >
            <cylinderGeometry args={[0.42, 0.42, 0.42, 32]} />
            <meshStandardMaterial color={STEEL} metalness={0.95} roughness={0.18} />
          </mesh>

          {/* Combustion flash light, anchored at top of cylinder */}
          <pointLight
            ref={(el) => {
              flashRefs.current[i] = el;
            }}
            color={NEON_ORANGE}
            intensity={0}
            distance={3.2}
            decay={2}
            position={[0, 0.55, 0]}
          />
          {/* Visible flame disk inside the combustion chamber */}
          <mesh
            ref={(el) => {
              flameRefs.current[i] = el;
            }}
            position={[0, 0.55, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.36, 24]} />
            <meshBasicMaterial
              color={NEON_ORANGE}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Spark plug poking out of the head */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.28, 12]} />
            <meshStandardMaterial color="#9ca3af" metalness={0.95} roughness={0.2} />
          </mesh>

          {/* Cylinder number tag */}
          <Text
            position={[0, -1.45, 0.85]}
            fontSize={0.28}
            color={NEON_AMBER}
            anchorX="center"
            anchorY="middle"
          >
            {String(i + 1)}
          </Text>
        </group>
      ))}

      {/* Soft warm rim so the block doesn't look flat */}
      <pointLight position={[0, 2.2, 3.2]} intensity={0.7} color={NEON_AMBER} distance={14} />
    </group>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 3D scene wrapper
// ────────────────────────────────────────────────────────────────────────────
function EngineScene({ rpm, onError }: { rpm: number; onError: () => void }) {
  return (
    <WebGLBoundary onError={onError}>
      <Canvas
        camera={{ position: [5.2, 2.6, 6.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, failIfMajorPerformanceCaveat: false }}
        onCreated={({ gl }) => {
          // Belt-and-braces: react if the underlying context is lost in the
          // first place so we can fall back without a Vite error overlay.
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            onError();
          });
        }}
      >
        <color attach="background" args={["#06070a"]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[6, 9, 6]} intensity={1.0} color="#ffe4c2" />
        <directionalLight position={[-6, 4, -4]} intensity={0.45} color="#7aa0d8" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color={NEON_AMBER} distance={16} />

        <EngineCore rpm={rpm} />

        <OrbitControls
          enablePan={false}
          minDistance={4.5}
          maxDistance={16}
          minPolarAngle={0.25}
          maxPolarAngle={Math.PI / 2 + 0.15}
          target={[0, 0, 0]}
        />
      </Canvas>
    </WebGLBoundary>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Static fallback for environments without WebGL (e.g. headless test runners)
// ────────────────────────────────────────────────────────────────────────────
function EngineFallback({ rpm }: { rpm: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 bg-[#06070a]">
      <div className="text-4xl mb-3">⚙️</div>
      <div className="text-orange-300 font-mono uppercase tracking-widest text-xs mb-1">
        3D Preview Unavailable
        <span className="font-khmer normal-case tracking-normal text-sm text-orange-200 ml-2">
          / មិនអាចបង្ហាញ 3D
        </span>
      </div>
      <p className="text-slate-400 text-xs max-w-md leading-relaxed">
        Your browser cannot create a WebGL context. The animated 3D engine
        needs hardware-accelerated graphics.
      </p>
      <p className="font-khmer text-slate-400 text-xs max-w-md leading-loose mt-1">
        កម្មវិធីអ៊ីនធឺណិតរបស់អ្នកមិនអាចបង្កើតបរិបទ WebGL បានទេ។
        ម៉ាស៊ីន 3D ត្រូវការការគូររូបតាមផ្នែករឹង។
      </p>
      <div className="mt-4 text-xs font-mono text-orange-200/80">
        Throttle now
        <span className="font-khmer normal-case text-sm text-orange-200/90 ml-1">
          / ល្បឿនឥឡូវនេះ
        </span>
        :{" "}
        {rpm > 0 ? (
          `${rpm * 60} rpm`
        ) : (
          <>
            OFF{" "}
            <span className="font-khmer text-orange-200/90 ml-1">/ ឈប់</span>
          </>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Public component
// ────────────────────────────────────────────────────────────────────────────
export default function Engine3DViewer({ kh: _kh }: { kh: boolean }) {
  // _kh is accepted for API parity with sibling diagram components, but the
  // viewer's UI strings are intentionally bilingual (EN / KH) regardless of
  // toggle state — matching the user's "strictly bilingual" requirement.
  void _kh;

  const [rpm, setRpm] = useState(35);
  const [webglOk, setWebglOk] = useState<boolean>(() => detectWebGL());
  const displayedRpm = Math.round(rpm * 60); // 0..6000 RPM scale
  const isOff = rpm === 0;

  return (
    <div
      className="rounded-lg bg-black/70 border border-orange-500/40 overflow-hidden"
      data-testid="engine-3d-viewer"
    >
      {/* Header bar — bilingual */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-gradient-to-r from-orange-950/40 via-zinc-950 to-zinc-950 border-b border-orange-500/30">
        <div className="text-[10px] font-mono uppercase tracking-widest text-orange-300">
          Inline-4 Engine · Live 3D
          <span className="font-khmer normal-case tracking-normal text-xs text-orange-200/90 ml-2">
            / ម៉ាស៊ីន ៤ ស៊ីឡាំង (3D)
          </span>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
          Drag to rotate · scroll to zoom
          <span className="font-khmer normal-case tracking-normal text-xs text-slate-300 ml-2">
            / អូសដើម្បីបង្វិល · មូលដើម្បីពង្រីក
          </span>
        </div>
      </div>

      {/* 3D Canvas (or fallback) */}
      <div className="h-[340px] sm:h-[400px] bg-gradient-to-b from-stone-950 via-black to-black">
        {webglOk ? (
          <EngineScene rpm={rpm} onError={() => setWebglOk(false)} />
        ) : (
          <EngineFallback rpm={rpm} />
        )}
      </div>

      {/* Throttle controls — strictly bilingual */}
      <div className="px-4 py-4 bg-gradient-to-b from-zinc-950 to-black border-t border-orange-500/30">
        <div className="flex items-center justify-between mb-2 gap-3">
          <label
            htmlFor="engine-throttle"
            className="text-xs font-mono uppercase tracking-widest text-orange-300"
          >
            Throttle{" "}
            <span className="font-khmer normal-case tracking-normal text-sm text-orange-200">
              / ល្បឿនម៉ាស៊ីន
            </span>{" "}
            <span className="text-amber-200">(RPM)</span>
          </label>
          <span
            className="text-orange-200 tabular-nums font-bold text-sm font-mono whitespace-nowrap"
            data-testid="engine-rpm-readout"
          >
            {isOff ? (
              <>
                OFF{" "}
                <span className="font-khmer text-orange-300/90 ml-1">/ ឈប់</span>
              </>
            ) : (
              `${displayedRpm.toLocaleString()} rpm`
            )}
          </span>
        </div>

        <input
          id="engine-throttle"
          type="range"
          min={0}
          max={100}
          step={1}
          value={rpm}
          onChange={(e) => setRpm(Number(e.target.value))}
          data-testid="engine-throttle-slider"
          aria-label="Throttle / ល្បឿនម៉ាស៊ីន (RPM)"
          className="w-full h-2 cursor-pointer appearance-none rounded-full bg-zinc-800 accent-orange-500"
          style={{
            backgroundImage: `linear-gradient(to right, #ff8c00 0%, #ff8c00 ${rpm}%, #27272a ${rpm}%, #27272a 100%)`,
          }}
        />

        <div className="mt-2 flex justify-between text-[10px] font-mono uppercase tracking-widest text-slate-400">
          <span>
            Off <span className="font-khmer normal-case text-xs text-slate-300">/ ឈប់</span>
          </span>
          <span>
            Idle <span className="font-khmer normal-case text-xs text-slate-300">/ ដើរទំនេរ</span>
          </span>
          <span>
            Cruise <span className="font-khmer normal-case text-xs text-slate-300">/ បើកធម្មតា</span>
          </span>
          <span className="text-orange-300">
            Redline <span className="font-khmer normal-case text-xs text-orange-200">/ ខ្លាំងបំផុត</span>
          </span>
        </div>

        <p className="mt-3 text-[11px] text-slate-300 leading-relaxed">
          Cylinders fire in <strong className="text-orange-300">1 → 3 → 4 → 2</strong> order, just
          like a real inline-4. Watch the orange flash light up at the top of each cylinder — that's
          the "Power" stroke firing.
        </p>
        <p className="mt-1 font-khmer text-[12px] text-slate-300 leading-loose">
          ស៊ីឡាំងបាញ់តាមលំដាប់ <strong className="text-orange-300">១ → ៣ → ៤ → ២</strong>{" "}
          ដូចម៉ាស៊ីនពិត។ មើលពន្លឺពណ៌ទឹកក្រូចភ្លឺឡើងនៅខាងលើស៊ីឡាំងនីមួយៗ — នោះគឺជាជំហាន
          'ផ្ទុះ' (Power)។
        </p>
      </div>
    </div>
  );
}
