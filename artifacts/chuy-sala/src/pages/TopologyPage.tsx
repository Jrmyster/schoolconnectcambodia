import { useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Sigma, RotateCw, Fingerprint, BoxSelect } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";

// ════════════════════════════════════════════════════════════════════════════
//  Topology: The Mathematics of Shape
// ════════════════════════════════════════════════════════════════════════════

export default function TopologyPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen relative text-slate-900 overflow-hidden">
      <ScopedStyles />
      <GraphPaperBg />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 bg-white border border-indigo-200 text-indigo-700 rounded-full px-4 py-1.5 mb-5 text-xs font-bold shadow-sm">
          <Sigma className="w-3.5 h-3.5" />
          {isKh ? "មេរៀន · គណិតវិទ្យា" : "Lesson · Mathematics"}
          <span className="text-slate-400">·</span>
          <span className="font-mono text-[10px] text-slate-500">MTH-TOP</span>
        </div>
        <h1
          className={`font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-4 leading-tight ${
            isKh ? "font-khmer" : ""
          }`}
        >
          {isKh ? (
            <>
              ថតវិទ្យា៖{" "}
              <span className="math-text-ink text-indigo-800">គណិតវិទ្យានៃរូបរាង</span>
            </>
          ) : (
            <>
              Topology:{" "}
              <span className="math-text-ink text-indigo-800">The Mathematics of Shape</span>
            </>
          )}
        </h1>
        <p
          className={`text-slate-700 max-w-2xl text-base ${
            isKh ? "font-khmer" : "leading-relaxed"
          }`}
        >
          {isKh
            ? "ថតវិទ្យា គឺជា «ធរណីមាត្រសន្លឹកកៅស៊ូ»។ វាសិក្សាអំពីលក្ខណៈសម្បត្តិនៃលំហ ដែលត្រូវបានរក្សាទុកនៅពេលផ្លាស់ប្តូររូបរាងជាបន្តបន្ទាប់។ ច្បាប់តែមួយគត់៖ អ្នកអាចទាញពន្លាត រមួល ឬបត់បាន ប៉ុន្តែអ្នកមិនអាចហែក ឬបិទភ្ជាប់វាឡើយ។"
            : "Topology is “rubber-sheet geometry”. It studies properties of space that are preserved under continuous deformations. The only rule: you can stretch, twist, or bend, but you cannot tear or glue."}
        </p>

        <nav className="mt-6 flex flex-wrap gap-2 text-xs">
          {[
            ["#mobius", isKh ? "បន្ទះ Möbius" : "Möbius Strip"],
            ["#homeomorphism", isKh ? "ការបំប្លែងពែង-ដូណាត់" : "Torus-Mug Homeomorphism"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-full border border-indigo-200 bg-white/80 text-indigo-800 hover:bg-indigo-50 transition tap-target ${
                isKh ? "font-khmer" : "font-medium"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* ── 1. MOBIUS STRIP ───────────────────────────────────────────── */}
      <section
        id="mobius"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ១" : "Section 01"}
          en="The Möbius Strip"
          kh="បន្ទះ Möbius"
          isKh={isKh}
          subEn="A surface with only one side and one edge."
          subKh="ផ្ទៃដែលមានតែមួយចំហៀង និងគែមតែមួយ។"
        />

        <div className="grid lg:grid-cols-5 gap-6 mt-6">
          <div className="lg:col-span-3">
            <article className="blueprint-card h-[400px] w-full relative overflow-hidden rounded-xl border border-indigo-200 bg-gradient-to-b from-white to-indigo-50/50 shadow-inner">
              <CardCorners />
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm">
                <RotateCw className="w-4 h-4 text-indigo-600 animate-[spin_4s_linear_infinite]" />
                <span className={`text-xs text-indigo-800 ${isKh ? "font-khmer" : "font-medium"}`}>
                  {isKh ? "អូសដើម្បីបង្វិល" : "Drag to rotate"}
                </span>
              </div>
              <Canvas camera={{ position: [0, 3, 5], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#818cf8" />
                <MobiusMesh />
                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1.5} />
                <Environment preset="city" />
              </Canvas>
            </article>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center">
            <article className="blueprint-card p-6 h-full flex flex-col justify-center">
              <CardCorners />
              <div className="flex items-center gap-2 mb-4">
                <Fingerprint className="w-5 h-5 text-indigo-700" />
                <span className="font-mono text-[11px] tracking-widest text-indigo-700">
                  TOP-01 · MÖBIUS
                </span>
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 mb-3 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "សកលលោកមួយចំហៀង" : "A One-Sided Universe"}
              </h3>
              <div className={`space-y-4 text-sm text-slate-700 ${isKh ? "font-khmer leading-relaxed" : "leading-relaxed"}`}>
                <p>
                  {isKh
                    ? "ប្រសិនបើអ្នកយកបន្ទះក្រដាសមួយ បង្វិលវាពាក់កណ្តាលជុំ រួចបិទចុងទាំងពីរចូលគ្នា អ្នកនឹងទទួលបានបន្ទះ Möbius។"
                    : "If you take a strip of paper, give it a half-twist, and glue the ends together, you get a Möbius strip."}
                </p>
                <p>
                  {isKh
                    ? "វាជារបស់ពិសេស ព្រោះវាមាន «តែមួយចំហៀង» ប៉ុណ្ណោះ។ បើអ្នកយកប៊ិចគូសតាមបណ្តោយបន្ទះនេះ អ្នកនឹងត្រលប់មកកន្លែងដើមវិញដោយបានគូសលើផ្ទៃទាំងមូល ដោយមិនបាច់លើកប៊ិចសោះ!"
                    : "It is mathematically fascinating because it only has one side. If you draw a line along the center, you will eventually cover both 'sides' of the paper and return to your starting point without ever lifting your pen!"}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── 2. HOMEOMORPHISM (TORUS TO MUG) ───────────────────────────── */}
      <section
        id="homeomorphism"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24"
      >
        <SectionHeader
          eyebrow={isKh ? "ផ្នែកទី ២" : "Section 02"}
          en="Continuous Deformation"
          kh="ការបំប្លែងរូបរាងជាបន្តបន្ទាប់"
          isKh={isKh}
          subEn="Why a coffee mug is mathematically identical to a donut."
          subKh="ហេតុអ្វីបានជាពែងកាហ្វេមានលក្ខណៈគណិតវិទ្យាដូចគ្នាបេះបិទនឹងនំដូណាត់។"
        />

        <div className="grid lg:grid-cols-5 gap-6 mt-6">
          <div className="lg:col-span-2 order-2 lg:order-1 flex flex-col justify-center">
            <article className="blueprint-card p-6 h-full flex flex-col justify-center">
              <CardCorners />
              <div className="flex items-center gap-2 mb-4">
                <BoxSelect className="w-5 h-5 text-amber-600" />
                <span className="font-mono text-[11px] tracking-widest text-amber-600">
                  TOP-02 · HOMEOMORPHISM
                </span>
              </div>
              <h3 className={`text-2xl font-bold text-slate-900 mb-3 ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ពែងកាហ្វេ និង នំដូណាត់" : "The Coffee Mug & The Donut"}
              </h3>
              <div className={`space-y-4 text-sm text-slate-700 ${isKh ? "font-khmer leading-relaxed" : "leading-relaxed"}`}>
                <p>
                  {isKh
                    ? "ក្នុងថតវិទ្យា វត្ថុពីរត្រូវបានចាត់ទុកថា «ដូចគ្នា» (Homeomorphic) ប្រសិនបើអ្នកអាចបំប្លែងវត្ថុមួយទៅជាមួយទៀតដោយការទាញ ឬបត់ ដោយមិនហែក។"
                    : "In topology, two objects are considered the 'same' (homeomorphic) if you can deform one into the other by stretching and bending, without tearing."}
                </p>
                <p>
                  {isKh
                    ? "ពែងកាហ្វេ និងនំដូណាត់ (Torus) គឺជារបស់តែមួយ ព្រោះវាទាំងពីរមានប្រហោងមួយគត់។ ប្រហោងរបស់នំដូណាត់ ក្លាយជាប្រហោងនៃដៃកាន់ពែងកាហ្វេ។"
                    : "A coffee mug and a donut (torus) are topologically identical because they both have exactly one hole. The hole of the donut becomes the hole of the mug's handle."}
                </p>
              </div>
            </article>
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2">
            <article className="blueprint-card p-5 w-full relative rounded-xl border border-amber-200 bg-white">
              <CardCorners />
              <div className="h-[360px] w-full rounded-lg overflow-hidden bg-gradient-to-b from-slate-50 to-amber-50/40 relative">
                <TorusMugScene isKh={isKh} />
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Subcomponents
 * ════════════════════════════════════════════════════════════════════════ */

function SectionHeader({ eyebrow, en, kh, subEn, subKh, isKh }: any) {
  return (
    <div className="max-w-3xl">
      <div className="font-mono text-[10px] tracking-widest text-indigo-600 mb-1">
        {eyebrow}
      </div>
      <h2
        className={`text-2xl sm:text-3xl font-bold text-slate-900 ${
          isKh ? "font-khmer" : ""
        }`}
      >
        {isKh ? kh : en}
      </h2>
      <p
        className={`mt-2 text-sm text-slate-600 ${
          isKh ? "font-khmer" : "leading-relaxed"
        }`}
      >
        {isKh ? subKh : subEn}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * 3D Möbius Strip
 * ════════════════════════════════════════════════════════════════════════ */

function MobiusMesh() {
  const geometry = useMemo(() => {
    const segmentsU = 150;
    const segmentsV = 30;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array((segmentsU + 1) * (segmentsV + 1) * 3);
    const indices = [];

    let idx = 0;
    for (let i = 0; i <= segmentsU; i++) {
      const u = (i / segmentsU) * Math.PI * 2;
      for (let j = 0; j <= segmentsV; j++) {
        // v from -1 to 1
        const v = (j / segmentsV) * 2 - 1;
        const R = 1.8;
        const w = 0.6; // half-width

        const x = (R + v * w * Math.cos(u / 2)) * Math.cos(u);
        const z = (R + v * w * Math.cos(u / 2)) * Math.sin(u);
        const y = v * w * Math.sin(u / 2);

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;
        idx++;
      }
    }

    for (let i = 0; i < segmentsU; i++) {
      for (let j = 0; j < segmentsV; j++) {
        const a = i * (segmentsV + 1) + j;
        const b = (i + 1) * (segmentsV + 1) + j;
        const c = i * (segmentsV + 1) + (j + 1);
        const d = (i + 1) * (segmentsV + 1) + (j + 1);
        indices.push(a, b, d);
        indices.push(a, d, c);
      }
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#4f46e5"
        side={THREE.DoubleSide}
        roughness={0.2}
        metalness={0.1}
      />
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#ffffff" wireframe={true} transparent opacity={0.15} />
      </mesh>
    </mesh>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * 3D Torus to Mug Homeomorphism
 * ════════════════════════════════════════════════════════════════════════ */

function TorusMugScene({ isKh }: { isKh: boolean }) {
  const [morphValue, setMorphValue] = useState(0);

  return (
    <>
      <div className="absolute inset-0">
        <Canvas camera={{ position: [4, 4, 4], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#fef3c7" />
          <TorusMugMesh morphValue={morphValue} />
          <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={10} blur={2} />
          <OrbitControls enableZoom={false} autoRotate={false} />
          <Environment preset="city" />
        </Canvas>
      </div>
      
      {/* Interactive UI Overlay */}
      <div className="absolute bottom-4 left-0 right-0 px-6 flex flex-col items-center z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-xl border border-amber-200 shadow-lg w-full max-w-sm pointer-events-auto">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-bold text-amber-700 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "នំដូណាត់ (Torus)" : "Donut (Torus)"}
            </span>
            <span className={`text-xs font-bold text-indigo-700 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ពែងកាហ្វេ (Mug)" : "Coffee Mug"}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={morphValue}
            onChange={(e) => setMorphValue(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="mt-2 text-center text-[10px] text-slate-500 font-mono tracking-wider">
            MORPH: {(morphValue * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </>
  );
}

function TorusMugMesh({ morphValue }: { morphValue: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const segmentsU = 100;
    const segmentsV = 60;
    const geo = new THREE.BufferGeometry();
    const posArray = new Float32Array((segmentsU + 1) * (segmentsV + 1) * 3);
    const mugArray = new Float32Array((segmentsU + 1) * (segmentsV + 1) * 3);
    const indexArray = [];

    let idx = 0;
    for (let i = 0; i <= segmentsU; i++) {
      const u = (i / segmentsU) * Math.PI * 2;
      for (let j = 0; j <= segmentsV; j++) {
        const v = (j / segmentsV) * Math.PI * 2;
        
        // --- TORUS (Base Shape) ---
        const R = 1.2;
        const r = 0.5;
        const tx = (R + r * Math.cos(v)) * Math.cos(u);
        const ty = r * Math.sin(v);
        const tz = (R + r * Math.cos(v)) * Math.sin(u);
        posArray[idx * 3] = tx;
        posArray[idx * 3 + 1] = ty;
        posArray[idx * 3 + 2] = tz;
        
        // --- MUG (Morphed Shape) ---
        // bodyWeight determines how much of the cylinder body this vertex is (u near PI is body, u near 0 is handle)
        const bodyWeight = (1 - Math.cos(u)) / 2; 
        
        const mR = R - 0.7 * bodyWeight; // hole shrinks for body
        const mr = r + 0.8 * bodyWeight; // tube thickens for body
        
        let mx = (mR + mr * Math.cos(v)) * Math.cos(u);
        let my = mr * Math.sin(v);
        let mz = (mR + mr * Math.cos(v)) * Math.sin(u);
        
        // Make body taller
        my *= 1 + 1.2 * bodyWeight;
        
        if (bodyWeight > 0.0) {
          const topness = Math.max(0, Math.sin(v));
          const innerness = Math.max(0, -Math.cos(v));
          // Create cup well (indent inner top)
          const indent = topness * innerness * bodyWeight;
          my -= 3.5 * indent;
          
          // Flatten bottom
          const bottomness = Math.max(0, -Math.sin(v));
          if (bottomness > 0.5) {
             my += 1.5 * (bottomness - 0.5) * bodyWeight; 
          }
        }
        
        // Center the mug vertically and horizontally a bit
        mugArray[idx * 3] = mx + 0.5 * bodyWeight;
        mugArray[idx * 3 + 1] = my + 0.2 * bodyWeight;
        mugArray[idx * 3 + 2] = mz;
        
        idx++;
      }
    }

    for (let i = 0; i < segmentsU; i++) {
      for (let j = 0; j < segmentsV; j++) {
        const a = i * (segmentsV + 1) + j;
        const b = (i + 1) * (segmentsV + 1) + j;
        const c = i * (segmentsV + 1) + (j + 1);
        const d = (i + 1) * (segmentsV + 1) + (j + 1);
        indexArray.push(a, b, d);
        indexArray.push(a, d, c);
      }
    }

    geo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    geo.setIndex(indexArray);
    geo.computeVertexNormals();

    // Prepare Morph Target for Mug
    geo.morphAttributes.position = [];
    geo.morphAttributes.position[0] = new THREE.BufferAttribute(mugArray, 3);
    
    // Create temp geo to compute morph normals for smooth shading
    const tempMugGeo = new THREE.BufferGeometry();
    tempMugGeo.setAttribute("position", new THREE.BufferAttribute(mugArray, 3));
    tempMugGeo.setIndex(indexArray);
    tempMugGeo.computeVertexNormals();
    geo.morphAttributes.normal = [];
    geo.morphAttributes.normal[0] = tempMugGeo.attributes.normal;

    return geo;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.morphTargetInfluences![0] = morphValue;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} morphTargetInfluences={[0]} position={[0, -0.2, 0]}>
      <meshStandardMaterial
        color="#f59e0b"
        roughness={0.2}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Shared Aesthetic Chrome
 * ════════════════════════════════════════════════════════════════════════ */

function CardCorners() {
  return (
    <>
      <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-indigo-400" aria-hidden />
      <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-indigo-400" aria-hidden />
      <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-indigo-400" aria-hidden />
      <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-indigo-400" aria-hidden />
    </>
  );
}

function GraphPaperBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 60%, #e0e7ff 100%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="geo-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#c7d2fe" strokeWidth="0.5" opacity="0.55" />
          </pattern>
          <pattern id="geo-grid-bold" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#geo-grid-fine)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#a5b4fc" strokeWidth="0.9" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geo-grid-bold)" />
      </svg>
    </div>
  );
}

function ScopedStyles() {
  return (
    <style>{`
      .blueprint-card {
        position: relative;
        background: rgba(255,255,255,0.92);
        box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 6px 18px -8px rgba(49,46,129,0.15);
      }
      .math-text-ink {
        font-family: ui-serif, Georgia, "Times New Roman", serif;
        font-style: italic;
      }
    `}</style>
  );
}
