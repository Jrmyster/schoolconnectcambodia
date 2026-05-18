import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Activity } from 'lucide-react';
import { useLanguageStore } from '@/store/use-language';

/* 
  Custom implementation of ParametricGeometry to avoid external imports.
  u and v will range from 0 to 1, then mapped to 0 to 2PI in the function.
*/
function createParametricGeometry(
  func: (u: number, v: number, target: THREE.Vector3) => void,
  slices: number,
  stacks: number
) {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];
  const p = new THREE.Vector3();

  for (let i = 0; i <= stacks; i++) {
    const v = i / stacks;
    for (let j = 0; j <= slices; j++) {
      const u = j / slices;
      func(u * Math.PI * 2, v * Math.PI * 2, p);
      vertices.push(p.x, p.y, p.z);
    }
  }

  for (let i = 0; i < stacks; i++) {
    for (let j = 0; j < slices; j++) {
      const a = i * (slices + 1) + j;
      const b = (i + 1) * (slices + 1) + j;
      const c = i * (slices + 1) + (j + 1);
      const d = (i + 1) * (slices + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(a, d, c);
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

// Figure-8 Klein Bottle parametric function
const kleinFunction = (u: number, v: number, target: THREE.Vector3) => {
  const r = 2; // Tube radius base factor
  
  // To avoid sharp artifacts and maintain the figure-8 structure:
  const x = (r + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.cos(u);
  const y = (r + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.sin(u);
  const z = Math.sin(u / 2) * Math.sin(v) + Math.cos(u / 2) * Math.sin(2 * v);

  // Scale it up
  target.set(x, y, z).multiplyScalar(1.2);
};

function KleinMesh({ isTracing }: { isTracing: boolean }) {
  const geometry = useMemo(() => createParametricGeometry(kleinFunction, 100, 60), []);
  const particleRef = useRef<THREE.Mesh>(null);
  
  // Track position in parametric space (u, v)
  const tracePos = useRef({ u: 0, v: 0 });

  useFrame((state, delta) => {
    if (!isTracing || !particleRef.current) return;
    
    // Animate u and v to trace the continuous surface
    // Traveling faster along u (the main tube) and slowly drifting along v
    tracePos.current.u += delta * 0.8;
    tracePos.current.v += delta * 0.2;

    const u = (tracePos.current.u % 1.0) * Math.PI * 2;
    const v = (tracePos.current.v % 1.0) * Math.PI * 2;

    const target = new THREE.Vector3();
    kleinFunction(u, v, target);

    particleRef.current.position.copy(target);
  });

  return (
    <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Translucent Glass Surface */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial 
          color="#3b82f6" 
          transmission={0.85} // Glass-like
          opacity={1}
          metalness={0.1}
          roughness={0.2}
          ior={1.5}
          thickness={0.5}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
      
      {/* Wireframe for structural clarity */}
      <mesh geometry={geometry}>
        <meshBasicMaterial 
          color="#1e3a8a" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>

      {/* Tracing Particle */}
      <mesh ref={particleRef} visible={isTracing}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#fbbf24" />
        {/* Glow effect */}
        <pointLight color="#fbbf24" intensity={2} distance={3} />
      </mesh>
    </group>
  );
}

export default function KleinBottle() {
  const { language } = useLanguageStore();
  const isKh = language === 'kh';

  const [isTracing, setIsTracing] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row gap-6 mb-8">
        
        {/* Left Side: Context & Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100 flex flex-col justify-center h-full">
            <h3 className={`text-xl font-bold text-slate-800 mb-3 ${isKh ? 'font-khmer' : ''}`}>
              {isKh ? 'ផ្ទៃមិនអាចកំណត់ទិសដៅបាន' : 'A Non-Orientable Surface'}
            </h3>
            <p className={`text-sm text-slate-700 leading-relaxed mb-6 ${isKh ? 'font-khmer' : ''}`}>
              {isKh 
                ? 'ដប Klein គឺជារូបរាងប្លែកដែល "ខាងក្នុង" និង "ខាងក្រៅ" គឺជាផ្ទៃតែមួយ។ ប្រសិនបើអ្នកដើរតាមបណ្តោយផ្ទៃរបស់វា អ្នកនឹងត្រឡប់មកកន្លែងដើមវិញ ប៉ុន្តែស្ថិតនៅម្ខាងទៀតនៃផ្ទៃនោះ ដោយមិនចាំបាច់ឆ្លងកាត់គែមឡើយ!'
                : 'The Klein Bottle is a 3D manifold where the "inside" and "outside" are the exact same surface. If you travel along it, you will eventually return to your starting point, but flipped upside down, without ever crossing an edge!'}
            </p>
            
            <button
              onClick={() => setIsTracing(!isTracing)}
              className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold transition-all shadow-sm ${
                isTracing 
                  ? 'bg-amber-100 text-amber-700 border-2 border-amber-300 hover:bg-amber-200' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'
              } ${isKh ? 'font-khmer' : ''}`}
            >
              <Activity className={`w-5 h-5 ${isTracing ? 'animate-pulse' : ''}`} />
              {isTracing 
                ? (isKh ? 'បញ្ឈប់ការបញ្ចាំង' : 'Stop Tracing') 
                : (isKh ? 'បញ្ចាំងផ្ទៃ' : 'Trace Surface')}
            </button>
          </div>
        </div>

        {/* Right Side: 3D Canvas */}
        <div className="w-full lg:w-2/3 h-[400px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-inner border-[4px] border-slate-800">
          <Canvas camera={{ position: [0, 6, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -5, -5]} intensity={0.5} color="#818cf8" />
            <KleinMesh isTracing={isTracing} />
            <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={15} blur={2.5} />
            <OrbitControls enableZoom={true} autoRotate={!isTracing} autoRotateSpeed={1.0} />
            <Environment preset="city" />
          </Canvas>
          {isTracing && (
            <div className="absolute top-4 left-4 bg-amber-500/20 backdrop-blur-md border border-amber-400 text-amber-100 px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {isKh ? 'កំពុងតាមដានផ្ទៃ (u, v)...' : 'Tracing coordinates (u, v)...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
