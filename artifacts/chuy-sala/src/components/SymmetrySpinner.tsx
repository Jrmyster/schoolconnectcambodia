import {
  useRef,
  useState,
  useEffect,
  useMemo,
  Suspense,
  Component,
  type ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  RotateCw,
  FlipHorizontal,
  Crosshair,
  RefreshCw,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { InlineMath } from "react-katex";
import { useTranslation, useLanguageStore } from "@/store/use-language";

/* ─── tiny error boundary that traps WebGL/Three errors so the rest of the
 *     page still renders; shows a graceful 2-D fallback instead. */
class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: unknown) {
    // eslint-disable-next-line no-console
    console.warn("[SymmetrySpinner] WebGL canvas failed:", err);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/** Detect WebGL availability before mounting the heavy R3F Canvas. */
function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

/* ══════════════════════════════════════════════════════════════════════════
 * SymmetrySpinner — interactive 3D demonstrator for the three basic
 * symmetry operations on a Square Planar molecule (1 central atom,
 * 4 identical surrounding atoms in a flat square).
 *
 *   Op A · C₄ rotation     : spin the whole molecule 90° about the y-axis,
 *                             showing a temporary vertical axis line.
 *   Op B · Mirror plane σ  : flash a translucent vertical plane through the
 *                             centre, then physically swap the LEFT/RIGHT
 *                             atoms across that plane.
 *   Op C · Inversion (i)   : send each outer atom on a straight-line path
 *                             through the centre to the opposite vertex.
 *
 * Soft pink/purple aesthetic to match Module 3.
 * ══════════════════════════════════════════════════════════════════════════ */

type Op = "rotate" | "mirror" | "invert" | null;

// initial "anchor" positions of the 4 outer atoms (square in the XZ plane)
const ANCHORS: ReadonlyArray<readonly [number, number, number]> = [
  [1.6, 0, 0], //  +X  (right)
  [-1.6, 0, 0], // -X  (left)
  [0, 0, 1.6], //  +Z  (front)
  [0, 0, -1.6], // -Z  (back)
];

// pretty pastel colours for the outer atoms — distinct so swaps are obvious
const ATOM_COLORS = ["#ec4899", "#a855f7", "#f472b6", "#c084fc"];

interface MoleculeProps {
  op: Op;
  /** monotonically-increases each time the same button is hit so the
      effect re-runs even if the op label is unchanged */
  triggerKey: number;
}

function Molecule({ op, triggerKey }: MoleculeProps) {
  // a single group we will rotate as a whole for C₄
  const groupRef = useRef<THREE.Group>(null!);
  // refs for each outer atom so we can animate them individually for σ and i
  const atomRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null]);

  // animation state
  const startTimeRef = useRef<number | null>(null);
  /** one-shot guard so useFrame stops doing work after a single completion
      (without it, useFrame would keep scheduling setTimeouts every frame). */
  const completedRef = useRef(false);
  const fromRef = useRef<THREE.Vector3[]>(ANCHORS.map((a) => new THREE.Vector3(...a)));
  const toRef = useRef<THREE.Vector3[]>(ANCHORS.map((a) => new THREE.Vector3(...a)));
  const baseRotationY = useRef(0);
  const targetRotationY = useRef(0);
  /** stored overlay-hide timeout so we can cancel it on unmount / new op */
  const overlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // visual overlays
  const [showRotationAxis, setShowRotationAxis] = useState(false);
  const [showMirrorPlane, setShowMirrorPlane] = useState(false);
  const [showInversionPulse, setShowInversionPulse] = useState(false);

  const DURATION = 1.2; // seconds

  // clear any lingering overlay timer when this molecule unmounts
  useEffect(
    () => () => {
      if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    },
    [],
  );

  // when the parent triggers a new op, kick off the appropriate animation
  useEffect(() => {
    if (!op) return;
    startTimeRef.current = null;
    completedRef.current = false;

    // capture current positions as "from" — this lets the user chain ops
    if (atomRefs.current.every(Boolean)) {
      fromRef.current = atomRefs.current.map((m) => m!.position.clone());
    }

    if (op === "rotate") {
      // group rotation: 90° about Y, using current rotation as base
      baseRotationY.current = groupRef.current.rotation.y;
      targetRotationY.current = baseRotationY.current + Math.PI / 2;
      // outer atoms stay at their current local positions
      toRef.current = fromRef.current.map((v) => v.clone());
      setShowRotationAxis(true);
      setShowMirrorPlane(false);
      setShowInversionPulse(false);
    } else if (op === "mirror") {
      // reflect each atom through the YZ-plane (flip x → -x), in LOCAL space
      const local = atomRefs.current.map((m) => m!.position.clone());
      fromRef.current = local;
      toRef.current = local.map((v) => new THREE.Vector3(-v.x, v.y, v.z));
      baseRotationY.current = groupRef.current.rotation.y;
      targetRotationY.current = baseRotationY.current;
      setShowMirrorPlane(true);
      setShowRotationAxis(false);
      setShowInversionPulse(false);
    } else if (op === "invert") {
      // send each atom through the centre to (-x, -y, -z) — straight line
      const local = atomRefs.current.map((m) => m!.position.clone());
      fromRef.current = local;
      toRef.current = local.map((v) => v.clone().multiplyScalar(-1));
      baseRotationY.current = groupRef.current.rotation.y;
      targetRotationY.current = baseRotationY.current;
      setShowInversionPulse(true);
      setShowRotationAxis(false);
      setShowMirrorPlane(false);
    }
  }, [op, triggerKey]);

  useFrame((state) => {
    if (!op || completedRef.current) return;
    if (startTimeRef.current === null) startTimeRef.current = state.clock.elapsedTime;
    const t = Math.min(1, (state.clock.elapsedTime - startTimeRef.current) / DURATION);
    // ease-in-out cubic
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    if (op === "rotate") {
      groupRef.current.rotation.y =
        baseRotationY.current + (targetRotationY.current - baseRotationY.current) * eased;
    } else if (op === "mirror" || op === "invert") {
      atomRefs.current.forEach((m, i) => {
        if (!m) return;
        const from = fromRef.current[i];
        const to = toRef.current[i];
        m.position.lerpVectors(from, to, eased);
      });
    }

    if (t >= 1) {
      completedRef.current = true; // guard so this branch only fires once
      // hide overlays a beat after the animation finishes
      if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
      overlayTimerRef.current = setTimeout(() => {
        setShowRotationAxis(false);
        setShowMirrorPlane(false);
        setShowInversionPulse(false);
      }, 350);
    }
  });

  // pre-compute geometries / materials so they aren't recreated each frame
  const centerMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#7e22ce", // purple-700
        metalness: 0.4,
        roughness: 0.25,
        emissive: "#a855f7",
        emissiveIntensity: 0.15,
      }),
    [],
  );

  const outerMaterials = useMemo(
    () =>
      ATOM_COLORS.map(
        (c) =>
          new THREE.MeshStandardMaterial({
            color: c,
            metalness: 0.3,
            roughness: 0.35,
            emissive: c,
            emissiveIntensity: 0.1,
          }),
      ),
    [],
  );

  const bondMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e9d5ff", // purple-200
        metalness: 0.1,
        roughness: 0.6,
        transparent: true,
        opacity: 0.55,
      }),
    [],
  );

  return (
    <>
      <group ref={groupRef}>
        {/* central atom */}
        <mesh material={centerMaterial}>
          <sphereGeometry args={[0.55, 48, 48]} />
        </mesh>

        {/* 4 outer atoms — animated individually for σ and i */}
        {ANCHORS.map((pos, i) => (
          <mesh
            key={i}
            ref={(el) => {
              atomRefs.current[i] = el;
            }}
            position={pos as unknown as [number, number, number]}
            material={outerMaterials[i]}
          >
            <sphereGeometry args={[0.36, 32, 32]} />
          </mesh>
        ))}

        {/* dynamic bonds — re-aligned every frame to follow atom positions */}
        <DynamicBonds atomRefs={atomRefs} material={bondMaterial} />
      </group>

      {/* C₄ rotation axis · vertical line through the centre */}
      {showRotationAxis && (
        <group>
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 4.4, 16]} />
            <meshStandardMaterial
              color="#db2777"
              emissive="#db2777"
              emissiveIntensity={0.7}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* a small ring on top to mark the axis */}
          <mesh position={[0, 2.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.18, 0.04, 12, 28]} />
            <meshStandardMaterial
              color="#db2777"
              emissive="#db2777"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      )}

      {/* σ vertical mirror plane · YZ-plane (x = 0) */}
      {showMirrorPlane && (
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[4.2, 4.2]} />
          <meshStandardMaterial
            color="#f9a8d4"
            transparent
            opacity={0.32}
            side={THREE.DoubleSide}
            metalness={0.6}
            roughness={0.15}
            emissive="#f9a8d4"
            emissiveIntensity={0.18}
          />
        </mesh>
      )}

      {/* inversion centre · pulsing dot at origin */}
      {showInversionPulse && (
        <mesh>
          <sphereGeometry args={[0.7, 24, 24]} />
          <meshStandardMaterial
            color="#fbcfe8"
            transparent
            opacity={0.35}
            emissive="#ec4899"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </>
  );
}

/* Dynamic bonds that re-align each frame to the live atom positions, so the
   molecule stays visually connected during mirror / inversion animations. */
function DynamicBonds({
  atomRefs,
  material,
}: {
  atomRefs: React.RefObject<(THREE.Mesh | null)[]>;
  material: THREE.Material;
}) {
  const bondRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null]);
  // pre-allocated scratch objects — reused every frame to avoid GC churn
  const upY = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const dirNorm = useMemo(() => new THREE.Vector3(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);

  useFrame(() => {
    const atoms = atomRefs.current;
    if (!atoms) return;
    for (let i = 0; i < 4; i++) {
      const atom = atoms[i];
      const bond = bondRefs.current[i];
      if (!atom || !bond) continue;
      const b = atom.position;
      dir.copy(b); // central atom is at origin, so dir = b
      const len = dir.length();
      if (len < 1e-4) {
        bond.visible = false;
        continue;
      }
      bond.visible = true;
      bond.position.set(b.x * 0.5, b.y * 0.5, b.z * 0.5);
      dirNorm.copy(dir).divideScalar(len);
      q.setFromUnitVectors(upY, dirNorm);
      bond.quaternion.copy(q);
      bond.scale.set(1, len, 1);
    }
  });

  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            bondRefs.current[i] = el;
          }}
          material={material}
          // base length 1; we scale on Y each frame to match the current bond length
          scale={[1, 1, 1]}
        >
          <cylinderGeometry args={[0.06, 0.06, 1, 12]} />
        </mesh>
      ))}
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

/* ─── 2-D fallback shown when WebGL is unavailable ────────────────────── */
function SpinnerFallback({
  kh,
  reason,
  highlight,
}: {
  kh: boolean;
  reason: string;
  highlight: Op;
}) {
  return (
    <div
      data-testid="symmetry-spinner-fallback"
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-3"
    >
      {/* simple SVG square-planar diagram */}
      <svg
        viewBox="0 0 160 160"
        className="w-32 h-32"
        aria-hidden="true"
      >
        {/* bonds */}
        <line x1="80" y1="80" x2="80" y2="20" stroke="#e9d5ff" strokeWidth="4" />
        <line x1="80" y1="80" x2="80" y2="140" stroke="#e9d5ff" strokeWidth="4" />
        <line x1="80" y1="80" x2="20" y2="80" stroke="#e9d5ff" strokeWidth="4" />
        <line x1="80" y1="80" x2="140" y2="80" stroke="#e9d5ff" strokeWidth="4" />
        {/* central atom */}
        <circle cx="80" cy="80" r="16" fill="#7e22ce" />
        {/* outer atoms */}
        <circle cx="80" cy="20" r="11" fill={ATOM_COLORS[2]} />
        <circle cx="80" cy="140" r="11" fill={ATOM_COLORS[3]} />
        <circle cx="20" cy="80" r="11" fill={ATOM_COLORS[1]} />
        <circle cx="140" cy="80" r="11" fill={ATOM_COLORS[0]} />
        {/* highlight overlay based on most recent op */}
        {highlight === "rotate" && (
          <line x1="80" y1="0" x2="80" y2="160" stroke="#db2777" strokeWidth="2" strokeDasharray="4 3" />
        )}
        {highlight === "mirror" && (
          <rect x="76" y="0" width="8" height="160" fill="#f9a8d4" opacity="0.55" />
        )}
        {highlight === "invert" && (
          <circle cx="80" cy="80" r="34" fill="#ec4899" opacity="0.18" />
        )}
      </svg>
      <div className="flex items-center gap-1.5 text-amber-700">
        <AlertTriangle className="w-4 h-4" aria-hidden="true" />
        <span className={`text-xs font-bold ${kh ? "font-khmer" : ""}`}>
          {kh ? "ការបើកដំណើរការ ៣ វិមាត្រត្រូវការ WebGL" : "3D mode requires WebGL"}
        </span>
      </div>
      <p className={`text-[11px] text-pink-700/80 max-w-xs ${kh ? "font-khmer leading-loose" : ""}`}>
        {reason}
      </p>
    </div>
  );
}

interface FeedbackMessage {
  en: string;
  kh: string;
}

const FEEDBACK: Record<Exclude<Op, null>, FeedbackMessage> = {
  rotate: {
    en: "Notice how the molecule looks exactly the same as before? That means it has rotational symmetry! The C₄ axis is a true symmetry axis for a square-planar molecule.",
    kh: "តើអ្នកសង្កេតឃើញថាម៉ូលេគុលមើលទៅដូចដើមបេះបិទទេ? នោះមានន័យថាវាមានស៊ីមេទ្រីរង្វិល! អ័ក្ស C₄ គឺជាអ័ក្សស៊ីមេទ្រីពិតប្រាកដសម្រាប់ម៉ូលេគុលការ៉េផ្លាណា។",
  },
  mirror: {
    en: "The left and right atoms swapped — but the molecule still looks identical! That vertical plane through the centre is a real mirror plane (σᵥ).",
    kh: "អាតូមឆ្វេង និងស្តាំបានប្តូរទីតាំងគ្នា — ប៉ុន្តែម៉ូលេគុលនៅតែមើលទៅដូចគ្នាបេះបិទ! ប្លង់បញ្ឈរឆ្លងកាត់ចំណុចកណ្តាលនោះគឺជាប្លង់ឆ្លុះពិត (σᵥ)។",
  },
  invert: {
    en: "Each outer atom flew through the centre to the opposite side — and the molecule is unchanged. Square-planar molecules have a true inversion centre (i).",
    kh: "អាតូមខាងក្រៅនីមួយៗបានហោះឆ្លងកាត់កណ្តាលទៅផ្នែកម្ខាងទៀត — ហើយម៉ូលេគុលមិនផ្លាស់ប្តូរ។ ម៉ូលេគុលការ៉េផ្លាណាមានចំណុចបញ្ច្រាសពិត (i)។",
  },
};

const IDLE_MESSAGE: FeedbackMessage = {
  en: "Drag the molecule to rotate the camera, then press a symmetry button to watch the operation play out in real time.",
  kh: "អូសម៉ូលេគុលដើម្បីបង្វិលកាមេរ៉ា បន្ទាប់មកចុចប៊ូតុងស៊ីមេទ្រីដើម្បីមើលប្រតិបត្តិការដំណើរការក្នុងពេលវេលាជាក់ស្តែង។",
};

export function SymmetrySpinner() {
  const t = useTranslation();
  const { language } = useLanguageStore();
  const kh = language === "kh";

  const [op, setOp] = useState<Op>(null);
  const [triggerKey, setTriggerKey] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackMessage>(IDLE_MESSAGE);
  const [busy, setBusy] = useState(false);
  // forces re-mount of the Canvas/molecule subtree to fully reset positions
  const [resetKey, setResetKey] = useState(0);
  // WebGL availability — checked once on mount
  const [webglOk, setWebglOk] = useState(true);
  useEffect(() => {
    setWebglOk(hasWebGL());
  }, []);

  // Timer that releases the "busy" state — kept as a ref so we can clear it
  // on unmount or when a new op is triggered.
  const busyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (busyTimerRef.current) clearTimeout(busyTimerRef.current);
    },
    [],
  );

  function trigger(next: Exclude<Op, null>) {
    if (busy) return;
    setBusy(true);
    setOp(next);
    setTriggerKey((k) => k + 1);
    setFeedback(FEEDBACK[next]);
    // Release "busy" on a fixed timer (animation duration + 250ms breathing
    // room). This is independent of the 3D canvas, so the buttons stay
    // usable even if WebGL is unavailable or the canvas errored out.
    if (busyTimerRef.current) clearTimeout(busyTimerRef.current);
    busyTimerRef.current = setTimeout(() => setBusy(false), 1450);
  }

  function handleReset() {
    if (busyTimerRef.current) clearTimeout(busyTimerRef.current);
    setOp(null);
    setBusy(false);
    setFeedback(IDLE_MESSAGE);
    setResetKey((k) => k + 1);
  }

  return (
    <section
      data-testid="symmetry-spinner"
      aria-labelledby="symmetry-spinner-title"
      className="rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-pink-50/90 via-white to-purple-50/80 p-5 sm:p-6 shadow-sm"
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 text-white shadow ring-2 ring-pink-200"
          aria-hidden="true"
        >
          <Sparkles className="w-5 h-5" strokeWidth={2.25} />
        </span>
        <div className="flex-1 min-w-0">
          <h3
            id="symmetry-spinner-title"
            className={`text-lg sm:text-xl font-bold leading-tight text-pink-900 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t("The Symmetry Spinner", "ម៉ាស៊ីនបង្វិលស៊ីមេទ្រី")}
          </h3>
          <p
            className={`text-xs font-semibold text-pink-700/80 mt-0.5 ${
              kh ? "font-khmer" : ""
            }`}
          >
            {t(
              "Try the three operations on a square-planar molecule",
              "សាកល្បងប្រតិបត្តិការទាំងបីលើម៉ូលេគុលការ៉េផ្លាណា",
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
        {/* ── 3D viewport ────────────────────────────────────── */}
        <div
          data-testid="symmetry-spinner-viewport"
          className="lg:col-span-3 relative h-72 sm:h-80 rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-100/70 via-rose-50 to-purple-100/70 overflow-hidden cursor-grab active:cursor-grabbing"
          aria-label={
            kh
              ? "ផ្ទាំងបង្ហាញ ៣ វិមាត្រនៃម៉ូលេគុលការ៉េផ្លាណា · អូសដើម្បីបង្វិលកាមេរ៉ា"
              : "3D viewport of a square-planar molecule · drag to rotate the camera"
          }
        >
          {webglOk ? (
            <CanvasErrorBoundary
              fallback={
                <SpinnerFallback
                  kh={kh}
                  reason={t(
                    "3D rendering failed to start in this browser.",
                    "ការបង្ហាញ ៣ វិមាត្រមិនអាចចាប់ផ្តើមនៅក្នុងកម្មវិធីរុករកនេះ។",
                  )}
                  highlight={op}
                />
              }
            >
              <Canvas
                key={resetKey}
                camera={{ position: [3.6, 2.6, 4.2], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
                onCreated={({ gl }) => {
                  gl.setClearColor(0x000000, 0);
                }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.65} />
                  <directionalLight position={[5, 6, 4]} intensity={1.05} />
                  <directionalLight
                    position={[-4, -2, -3]}
                    intensity={0.35}
                    color="#f0abfc"
                  />
                  <Molecule op={op} triggerKey={triggerKey} />
                  <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3.5}
                    maxDistance={9}
                    makeDefault
                  />
                </Suspense>
              </Canvas>
            </CanvasErrorBoundary>
          ) : (
            <SpinnerFallback
              kh={kh}
              reason={t(
                "Your browser does not support 3D rendering (WebGL).",
                "កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រការបង្ហាញ ៣ វិមាត្រ (WebGL) ទេ។",
              )}
              highlight={op}
            />
          )}

          {/* hint badge — only meaningful when 3D is alive */}
          {webglOk && (
            <div
              className={`pointer-events-none absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-white/85 backdrop-blur text-[10px] font-bold text-pink-700 border border-pink-200 ${
                kh ? "font-khmer" : ""
              }`}
            >
              {t("Drag to rotate camera", "អូសដើម្បីបង្វិលកាមេរ៉ា")}
            </div>
          )}
        </div>

        {/* ── Control panel ──────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <span
            className={`text-[10px] font-bold tracking-widest uppercase text-pink-700 opacity-80 ${
              kh ? "font-khmer normal-case tracking-normal text-xs" : ""
            }`}
          >
            {t("Control Panel", "ផ្ទាំងគ្រប់គ្រង")}
          </span>

          <button
            type="button"
            data-testid="btn-spin-rotate"
            onClick={() => trigger("rotate")}
            disabled={busy}
            aria-label="Rotate 90° (C₄ axis) · បង្វិល ៩០° (អ័ក្ស C₄)"
            className="group flex items-start gap-3 px-4 py-3 rounded-xl border-2 border-pink-300 bg-white hover:bg-pink-50 hover:border-pink-400 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-left"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow group-hover:shadow-md flex-shrink-0 mt-0.5">
              <RotateCw className="w-4 h-4" strokeWidth={2.5} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-bold text-pink-900">
                Rotate 90°{" "}
                <span className="ml-0.5 text-pink-600 font-semibold text-xs">
                  (<InlineMath math={"C_{4}"} /> axis)
                </span>
              </span>
              <span className="block text-sm font-bold text-pink-900 font-khmer leading-loose">
                បង្វិល ៩០°{" "}
                <span className="text-pink-600 font-semibold text-xs">
                  (អ័ក្ស <InlineMath math={"C_{4}"} />)
                </span>
              </span>
            </span>
          </button>

          <button
            type="button"
            data-testid="btn-spin-mirror"
            onClick={() => trigger("mirror")}
            disabled={busy}
            aria-label="Mirror Plane (σ) · ប្លង់ចំណាំងផ្លាត (σ)"
            className="group flex items-start gap-3 px-4 py-3 rounded-xl border-2 border-purple-300 bg-white hover:bg-purple-50 hover:border-purple-400 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-left"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow group-hover:shadow-md flex-shrink-0 mt-0.5">
              <FlipHorizontal className="w-4 h-4" strokeWidth={2.5} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-bold text-purple-900">
                Mirror Plane{" "}
                <span className="ml-0.5 text-purple-600 font-semibold text-xs">
                  (<InlineMath math={"\\sigma"} />)
                </span>
              </span>
              <span className="block text-sm font-bold text-purple-900 font-khmer leading-loose">
                ប្លង់ចំណាំងផ្លាត{" "}
                <span className="text-purple-600 font-semibold text-xs">
                  (<InlineMath math={"\\sigma"} />)
                </span>
              </span>
            </span>
          </button>

          <button
            type="button"
            data-testid="btn-spin-invert"
            onClick={() => trigger("invert")}
            disabled={busy}
            aria-label="Inversion Center (i) · មជ្ឈមណ្ឌលបញ្ច្រាស (i)"
            className="group flex items-start gap-3 px-4 py-3 rounded-xl border-2 border-fuchsia-300 bg-white hover:bg-fuchsia-50 hover:border-fuchsia-400 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-left"
          >
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow group-hover:shadow-md flex-shrink-0 mt-0.5">
              <Crosshair className="w-4 h-4" strokeWidth={2.5} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-bold text-fuchsia-900">
                Inversion Center{" "}
                <span className="ml-0.5 text-fuchsia-600 font-semibold text-xs">
                  (<InlineMath math={"i"} />)
                </span>
              </span>
              <span className="block text-sm font-bold text-fuchsia-900 font-khmer leading-loose">
                មជ្ឈមណ្ឌលបញ្ច្រាស{" "}
                <span className="text-fuchsia-600 font-semibold text-xs">
                  (<InlineMath math={"i"} />)
                </span>
              </span>
            </span>
          </button>

          <button
            type="button"
            data-testid="btn-spin-reset"
            onClick={handleReset}
            className="mt-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-pink-700 hover:text-pink-900 hover:bg-pink-100 transition-colors self-start"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className={kh ? "font-khmer" : ""}>
              {t("Reset molecule", "កំណត់ម៉ូលេគុលឡើងវិញ")}
            </span>
          </button>
        </div>
      </div>

      {/* ── Feedback box ─────────────────────────────────────── */}
      <div
        data-testid="symmetry-spinner-feedback"
        role="status"
        aria-live="polite"
        className="mt-4 rounded-xl border-2 border-pink-200 bg-white p-4 shadow-sm"
      >
        <div className="flex items-start gap-2.5">
          <span
            className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow flex-shrink-0"
            aria-hidden="true"
          >
            <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
          </span>
          <div className="flex-1 min-w-0">
            <p
              data-testid="symmetry-spinner-feedback-en"
              className="text-sm leading-relaxed text-foreground/90"
            >
              {feedback.en}
            </p>
            <p
              data-testid="symmetry-spinner-feedback-kh"
              className="mt-1.5 text-sm font-khmer leading-loose text-foreground/80 border-t border-pink-100 pt-1.5"
            >
              {feedback.kh}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
