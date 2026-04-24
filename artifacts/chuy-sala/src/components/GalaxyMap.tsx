import { useRef, useMemo, Suspense, Component, ReactNode, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useLanguageStore } from "@/store/use-language";
import { Orbit } from "lucide-react";

// ── Error Boundary (catches WebGL unavailability gracefully) ─────────────────

class GalaxyErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ── Static CSS fallback (shown when WebGL is unavailable) ────────────────────

function GalaxyFallback({ kh }: { kh: boolean }) {
  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden border border-white/10 flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at center, #06091a 0%, #020614 60%, #010310 100%)",
        height: "clamp(340px, 52vw, 520px)",
      }}
    >
      {/* CSS radial galaxy */}
      <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
        {/* Outer glow */}
        <div className="absolute rounded-full opacity-10" style={{ width: 260, height: 130, background: "radial-gradient(ellipse, #8060ff 0%, transparent 70%)", top: 65 }} />
        <div className="absolute rounded-full opacity-15" style={{ width: 200, height: 100, background: "radial-gradient(ellipse, #6080ff 0%, transparent 70%)", top: 80 }} />
        {/* Disc */}
        <div className="absolute rounded-full opacity-20" style={{ width: 240, height: 90, background: "radial-gradient(ellipse, #4466ff 0%, transparent 80%)", top: 85 }} />
        {/* Core */}
        <div className="absolute rounded-full" style={{ width: 60, height: 30, background: "radial-gradient(ellipse, #fffde8 0%, #ffe870 40%, transparent 100%)", top: 115 }} />
        {/* Earth dot */}
        <div className="absolute rounded-full animate-pulse" style={{ width: 8, height: 8, background: "#22ffcc", boxShadow: "0 0 8px #22ffcc", top: 128, left: 178 }} />
        {/* Stars scattered */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top:  `${10 + Math.random() * 80}%`,
              left: `${5  + Math.random() * 90}%`,
              opacity: 0.2 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>
      <p className={`mt-2 text-xs text-white/30 text-center px-6 ${kh ? "font-khmer" : ""}`}>
        {kh ? "3D ត្រូវការ WebGL — បង្ហាញតំណាង" : "3D view requires WebGL · Showing illustration"}
      </p>
      {/* You are here overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4" style={{ background: "linear-gradient(to top, rgba(1,3,16,0.92) 0%, transparent 100%)" }}>
        <div className="flex items-start gap-2.5 max-w-xl">
          <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full mt-1 animate-pulse" style={{ background: "#22ffcc", boxShadow: "0 0 8px #22ffcc" }} />
          <div>
            <p className={`text-xs font-semibold text-[#22ffcc] mb-0.5 ${kh ? "font-khmer" : ""}`}>
              {kh ? "អ្នកនៅទីនេះ" : "You are here"}
            </p>
            <p className={`text-xs leading-relaxed ${kh ? "font-khmer" : ""}`} style={{ color: "rgba(255,255,255,0.55)" }}>
              {kh
                ? "ផែនដីស្ថិតនៅក្នុងដៃអូរីយ៉ុង (Orion Arm) ប្រហែល ២៦,០០០ ឆ្នាំពន្លឺពីចំណុចកណ្ដាល។"
                : "Earth is located in the Orion Arm, about 26,000 light-years from the galactic centre."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Constants ────────────────────────────────────────────────────────────────

const PARTICLE_COUNT  = 8000;
const MAX_RADIUS      = 5.0;
const NUM_ARMS        = 2;
// spinAngle = radius * SPIN_FACTOR
// → particles further from centre lag further behind in rotation,
//   creating open trailing arms that never close back on themselves.
const SPIN_FACTOR     = 1.5;
// Organic star scatter: scales with radius so arms are tight at the core
// and fan out into loose stellar clouds at the edges.
const SCATTER         = 0.38;
const SCATTER_POWER   = 3;     // higher = scatter stays closer to arm spine

// ── Galaxy geometry (Logarithmic Spin Spiral) ─────────────────────────────────
//
//  For each of the 8 000 particles:
//    radius      = biased-random (0 → MAX_RADIUS), more particles near centre
//    branchAngle = (i % NUM_ARMS) × (2π / NUM_ARMS)  →  alternates arms by index
//    spinAngle   = radius × SPIN_FACTOR               →  rotation lag grows with r
//    scatter     = random offset (grows with radius)  →  organic cloud, not a line
//    x = cos(branchAngle + spinAngle) × radius + randomX
//    z = sin(branchAngle + spinAngle) × radius + randomZ
//    y = randomY   (thin galactic disc)
//
//  Arms are OPEN — they trail off into space and never loop back.
//
function useGalaxyGeometry() {
  return useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);

    const coreColor = new THREE.Color(1.0,  0.95, 0.65); // warm yellow-white
    const midColor  = new THREE.Color(0.65, 0.80, 1.0);  // sky blue
    const edgeColor = new THREE.Color(0.35, 0.25, 0.85); // deep violet

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // ── Radius: power-bias toward centre for dense galactic core ──
      const radius = Math.pow(Math.random(), 1.4) * MAX_RADIUS;

      // ── Which arm: alternates by particle index for balanced arm density ──
      const branchAngle = (i % NUM_ARMS) * (Math.PI * 2 / NUM_ARMS);

      // ── Spin angle: the further out, the more the star trails behind ──
      const spinAngle = radius * SPIN_FACTOR;

      // ── Organic scatter: Math.pow keeps it tight near the spine ──
      const spread = SCATTER * radius;
      const rnd = () =>
        Math.pow(Math.random(), SCATTER_POWER) * (Math.random() < 0.5 ? 1 : -1);
      const randomX = rnd() * spread;
      const randomZ = rnd() * spread;
      const randomY = rnd() * spread * 0.28; // much flatter in Y (galactic disc)

      // ── Final position ──
      const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
      const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      const y = randomY;

      positions[i3]     = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // ── Per-particle colour driven by raw radius (smooth gradient) ──
      const dist  = radius / MAX_RADIUS; // 0 at centre, 1 at edge
      const color = new THREE.Color();
      if (dist < 0.3) {
        color.lerpColors(coreColor, midColor, dist / 0.3);
      } else {
        color.lerpColors(midColor, edgeColor, (dist - 0.3) / 0.7);
      }
      const brightness = 0.75 + Math.random() * 0.25;
      colors[i3]     = Math.min(color.r * brightness, 1);
      colors[i3 + 1] = Math.min(color.g * brightness, 1);
      colors[i3 + 2] = Math.min(color.b * brightness, 1);
    }

    return { positions, colors };
  }, []);
}

// ── Star sprite texture (soft radial glow circle) ────────────────────────────

function createStarTexture(): THREE.CanvasTexture {
  const SIZE = 64;
  const canvas = document.createElement("canvas");
  canvas.width  = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;
  const half = SIZE / 2;

  // Radial gradient: opaque white centre → fully transparent at the edge
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0.0,  "rgba(255,255,255,1.0)");
  grad.addColorStop(0.2,  "rgba(255,255,255,0.85)");
  grad.addColorStop(0.5,  "rgba(255,255,255,0.3)");
  grad.addColorStop(0.85, "rgba(255,255,255,0.05)");
  grad.addColorStop(1.0,  "rgba(255,255,255,0.0)");

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(half, half, half, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

// ── Galaxy mesh ──────────────────────────────────────────────────────────────

function GalaxyParticles() {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useGalaxyGeometry();
  const starTexture = useMemo(() => createStarTexture(), []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.035;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}
        size={0.048}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.92}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── "You are here" Earth marker ──────────────────────────────────────────────

function EarthMarker() {
  const dotRef  = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (dotRef.current)  dotRef.current.scale.setScalar(0.8 + 0.35 * Math.sin(t * 2.2));
    if (ringRef.current) {
      // ringRef is a <mesh> with a single <meshBasicMaterial> (not an array),
      // so we narrow Mesh.material (Material | Material[]) to a single Material.
      (ringRef.current.material as THREE.Material).opacity = 0.35 + 0.35 * Math.sin(t * 2.2 + 1);
    }
  });

  // Orion Spur — arm 0 (branchAngle=0), radius=2.6, SPIN_FACTOR=1.5:
  //   spinAngle = 2.6 × 1.5 = 3.9 rad
  //   x = cos(3.9) × 2.6 ≈ −1.89,  z = sin(3.9) × 2.6 ≈ −1.79
  //   dist from centre ≈ 2.60 units ≈ 26,000 light-years ✓
  return (
    <group position={[-1.89, 0.03, -1.79]}>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.065, 10, 10]} />
        <meshBasicMaterial color="#22ffcc" />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.11, 0.16, 20]} />
        <meshBasicMaterial
          color="#22ffcc"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ── Background scatter stars ─────────────────────────────────────────────────

function BackgroundStars() {
  const { positions } = useMemo(() => {
    const count     = 1200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 28;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 28;
    }
    return { positions };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#aaccff" transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

// ── 3D scene ─────────────────────────────────────────────────────────────────

function GalaxyScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <BackgroundStars />
      <GalaxyParticles />
      <EarthMarker />
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={18}
        autoRotate={false}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.65}
        // ONE = 2 = THREE.TOUCH.DOLLY_ROTATE (one-finger dolly+rotate);
        // TWO = 512 is intentionally outside the THREE.TOUCH enum range to
        // disable the default two-finger gesture for this viewer.
        touches={{ ONE: 2, TWO: 512 } as unknown as { ONE: import("three").TOUCH; TWO: import("three").TOUCH }}
      />
    </>
  );
}

// ── Main exported component ───────────────────────────────────────────────────

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function GalaxyMap() {
  const { language } = useLanguageStore();
  const kh = language === "kh";
  // Detect WebGL before mounting Three.js to prevent dev-overlay errors on GPU-less hosts
  const [webglOk] = useState<boolean>(() => detectWebGL());

  return (
    <section
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      aria-labelledby="galaxy-title"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-sky-400/15 border border-sky-400/25 flex items-center justify-center text-sky-400">
          <Orbit className="w-3.5 h-3.5" />
        </div>
        <span className={`text-xs font-bold tracking-widest text-sky-400 uppercase ${kh ? "font-khmer tracking-normal" : ""}`}>
          {kh ? "កាឡាក់ស៊ីផ្លូវទឹកដោះគោ" : "The Milky Way Galaxy"}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-sky-400/20 to-transparent" />
      </div>

      {/* Canvas container — skip Three.js entirely when WebGL is unavailable */}
      {!webglOk ? <GalaxyFallback kh={kh} /> : (
      <GalaxyErrorBoundary fallback={<GalaxyFallback kh={kh} />}>
        <div
          className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{
            background: "radial-gradient(ellipse at center, #06091a 0%, #020614 60%, #010310 100%)",
            height: "clamp(340px, 52vw, 520px)",
          }}
        >
          {/* 3-D canvas */}
          <Suspense
            fallback={
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/40">
                <div className="w-8 h-8 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
                <span className={`text-sm ${kh ? "font-khmer" : ""}`}>
                  {kh ? "កំពុងបង្ហាញ 3D..." : "Rendering galaxy…"}
                </span>
              </div>
            }
          >
            <Canvas
              camera={{ position: [0.5, 7, 5.5], fov: 58 }}
              dpr={[1, 1.5]}
              gl={{ antialias: false, powerPreference: "low-power", failIfMajorPerformanceCaveat: false }}
              style={{ width: "100%", height: "100%" }}
            >
              <GalaxyScene />
            </Canvas>
          </Suspense>

          {/* Top-right controls hint */}
          <div
            className="absolute top-3 right-3 rounded-xl px-3 py-2 text-[10px] text-white/40 border border-white/8 leading-snug text-right pointer-events-none"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
          >
            <p>{kh ? "ប្រើម្រាមដៃ​ដើម្បី​វិល" : "Drag to rotate"}</p>
            <p>{kh ? "ញញួរ​ ២ ម្រាម​ ពង្រីក/បង្រួម" : "Pinch to zoom"}</p>
          </div>

          {/* "You are here" overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 px-5 py-4 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(1,3,16,0.92) 0%, rgba(1,3,16,0.6) 60%, transparent 100%)",
            }}
          >
            <div className="flex items-start gap-2.5 max-w-xl">
              <span
                className="flex-shrink-0 w-2.5 h-2.5 rounded-full mt-1 animate-pulse"
                style={{ background: "#22ffcc", boxShadow: "0 0 8px #22ffcc" }}
              />
              <div>
                <p
                  id="galaxy-title"
                  className={`text-xs font-semibold text-[#22ffcc] mb-0.5 ${kh ? "font-khmer" : ""}`}
                >
                  {kh ? "អ្នកនៅទីនេះ" : "You are here"}
                </p>
                <p className={`text-xs leading-relaxed ${kh ? "font-khmer" : ""}`} style={{ color: "rgba(255,255,255,0.55)" }}>
                  {kh
                    ? "ផែនដីស្ថិតនៅក្នុងដៃអូរីយ៉ុង (Orion Arm) ប្រហែល ២៦,០០០ ឆ្នាំពន្លឺពីចំណុចកណ្ដាល។"
                    : "Earth is located in the Orion Arm, about 26,000 light-years from the galactic centre."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </GalaxyErrorBoundary>
      )}

      {/* Caption */}
      <p className={`mt-3 text-xs text-center text-white/25 ${kh ? "font-khmer" : ""}`}>
        {kh
          ? "ចំណុចបៃតង = ផែនដី · ណែនាំ: ដោយ Three.js — មើល​ស្ទើ​តែ ​8,000 ​ STAR ​PARTICLES"
          : "Teal dot = Earth · Powered by Three.js · ~8,000 star particles · Simulated spiral arms"}
      </p>
    </section>
  );
}
