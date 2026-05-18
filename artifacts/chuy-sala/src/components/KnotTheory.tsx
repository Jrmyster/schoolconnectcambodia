import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Anchor, RefreshCw } from 'lucide-react';
import { useLanguageStore } from '@/store/use-language';

// -------------------------------------------------------------
// PHYSICS SETTINGS
// -------------------------------------------------------------
const NUM_PARTICLES = 80;
const RADIUS = 0.3; // radius of the rope segments
const COLLISION_DIST = RADIUS * 2.0; 
const LINK_DIST = RADIUS * 0.8; // overlap to make it look like a continuous tube
const ITERATIONS = 10; // solver iterations per frame

// -------------------------------------------------------------
// INITIALIZATIONS
// -------------------------------------------------------------
function getUnknotPositions() {
  const pos = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const t = (i / NUM_PARTICLES) * Math.PI * 2;
    // A tangled-looking unknot (folded circle)
    const x = 3 * Math.cos(t);
    const z = 3 * Math.sin(t);
    const y = 2 * Math.sin(2 * t);
    pos.push(new THREE.Vector3(x, y, z));
  }
  return pos;
}

function getTrefoilPositions() {
  const pos = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    const t = (i / NUM_PARTICLES) * Math.PI * 2;
    const x = Math.sin(t) + 2 * Math.sin(2 * t);
    const y = Math.cos(t) - 2 * Math.cos(2 * t);
    const z = -Math.sin(3 * t);
    pos.push(new THREE.Vector3(x * 1.5, y * 1.5, z * 1.5));
  }
  return pos;
}

// -------------------------------------------------------------
// ROPE PHYSICS COMPONENT
// -------------------------------------------------------------
function RopePhysics({ knotType }: { knotType: 'unknot' | 'trefoil' }) {
  const { camera, size, raycaster } = useThree();
  
  // Physics state
  const positions = useRef<THREE.Vector3[]>([]);
  const oldPositions = useRef<THREE.Vector3[]>([]);
  
  // Dragging state
  const draggedIndex = useRef<number | null>(null);
  const dragPlaneNormal = useRef(new THREE.Vector3(0, 0, 1));
  const dragPlaneOffset = useRef(0);
  const dragTarget = useRef(new THREE.Vector3());

  // Visuals
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize
  useEffect(() => {
    const initialPos = knotType === 'unknot' ? getUnknotPositions() : getTrefoilPositions();
    positions.current = initialPos.map(p => p.clone());
    oldPositions.current = initialPos.map(p => p.clone());
  }, [knotType]);

  // Main Integration & Constraint Loop
  useFrame(() => {
    if (positions.current.length === 0 || !meshRef.current) return;

    const pos = positions.current;
    const old = oldPositions.current;

    // 1. Integration
    for (let i = 0; i < NUM_PARTICLES; i++) {
      if (draggedIndex.current === i) {
        // Dragged particle follows mouse strictly
        pos[i].lerp(dragTarget.current, 0.5);
        old[i].copy(pos[i]);
        continue;
      }

      // Simple Verlet (damping applied)
      const velocity = pos[i].clone().sub(old[i]).multiplyScalar(0.95);
      old[i].copy(pos[i]);
      pos[i].add(velocity);

      // Mild centering force to keep it on screen
      pos[i].x += (0 - pos[i].x) * 0.001;
      pos[i].y += (0 - pos[i].y) * 0.001;
      pos[i].z += (0 - pos[i].z) * 0.001;
    }

    // 2. Constraints relaxation
    for (let iter = 0; iter < ITERATIONS; iter++) {
      // Distance constraints (adjacent links)
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const next = (i + 1) % NUM_PARTICLES;
        const p1 = pos[i];
        const p2 = pos[next];
        const dir = p2.clone().sub(p1);
        const dist = dir.length();
        if (dist === 0) continue;
        
        const diff = (dist - LINK_DIST) / dist;
        const offset = dir.multiplyScalar(0.5 * diff);

        if (draggedIndex.current !== i) p1.add(offset);
        if (draggedIndex.current !== next) p2.sub(offset);
      }

      // Self-collision (prevent ghosting)
      for (let i = 0; i < NUM_PARTICLES; i++) {
        for (let j = i + 2; j < NUM_PARTICLES; j++) {
          // Skip if they are actually adjacent (wrap-around case)
          if (i === 0 && j === NUM_PARTICLES - 1) continue;

          const p1 = pos[i];
          const p2 = pos[j];
          const dir = p2.clone().sub(p1);
          const dist = dir.length();

          if (dist < COLLISION_DIST && dist > 0) {
            // Push apart
            const diff = (dist - COLLISION_DIST) / dist;
            const offset = dir.multiplyScalar(0.5 * diff);

            if (draggedIndex.current !== i) p1.add(offset);
            if (draggedIndex.current !== j) p2.sub(offset);
          }
        }
      }
    }

    // 3. Update Instances
    for (let i = 0; i < NUM_PARTICLES; i++) {
      dummy.position.copy(pos[i]);
      // Give it a tiny rotation noise or just uniform scale
      dummy.scale.set(1, 1, 1);
      if (draggedIndex.current === i) {
        dummy.scale.set(1.3, 1.3, 1.3); // Highlight dragged segment
      }
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Pointer Interactions
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    if (e.instanceId === undefined) return;
    
    draggedIndex.current = e.instanceId;
    
    // Create a drag plane facing camera at the depth of the particle
    const p = positions.current[e.instanceId];
    camera.getWorldDirection(dragPlaneNormal.current);
    dragPlaneNormal.current.negate();
    
    // distance from origin to plane along normal
    dragPlaneOffset.current = dragPlaneNormal.current.dot(p);
    
    // Initial target
    dragTarget.current.copy(p);
  };

  const handlePointerMove = (e: any) => {
    if (draggedIndex.current === null) return;
    
    // Calculate intersection of mouse ray with the drag plane
    const plane = new THREE.Plane(dragPlaneNormal.current, -dragPlaneOffset.current);
    raycaster.setFromCamera(e.pointer, camera);
    const intersect = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersect);
    
    if (intersect) {
      dragTarget.current.copy(intersect);
    }
  };

  const handlePointerUp = () => {
    draggedIndex.current = null;
  };

  return (
    <group 
      onPointerMove={handlePointerMove} 
      onPointerUp={handlePointerUp} 
      onPointerLeave={handlePointerUp}
    >
      {/* Invisible plane to catch mouse moves anywhere */}
      <mesh visible={false} position={[0, 0, -10]}>
        <planeGeometry args={[100, 100]} />
      </mesh>

      <instancedMesh 
        ref={meshRef} 
        args={[undefined, undefined, NUM_PARTICLES]}
        onPointerDown={handlePointerDown}
      >
        <sphereGeometry args={[RADIUS, 16, 16]} />
        <meshStandardMaterial 
          color={knotType === 'unknot' ? '#10b981' : '#f43f5e'} 
          roughness={0.4}
          metalness={0.2}
        />
      </instancedMesh>
    </group>
  );
}

export default function KnotTheory() {
  const { language } = useLanguageStore();
  const isKh = language === 'kh';

  const [knotType, setKnotType] = useState<'unknot' | 'trefoil'>('unknot');
  const [resetKey, setResetKey] = useState(0); // to force re-mount and reset

  const loadUnknot = () => {
    setKnotType('unknot');
    setResetKey(prev => prev + 1);
  };

  const loadTrefoil = () => {
    setKnotType('trefoil');
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row gap-6 mb-8">
        
        {/* Left Side: Context & Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 flex flex-col h-full">
            <h3 className={`text-xl font-bold text-slate-800 mb-3 ${isKh ? 'font-khmer' : ''}`}>
              {isKh ? 'ការសិក្សាអំពីចំណង (Knot Theory)' : 'Knot Theory'}
            </h3>
            <p className={`text-sm text-slate-700 leading-relaxed mb-6 flex-grow ${isKh ? 'font-khmer' : ''}`}>
              {isKh 
                ? 'ចំណង Trefoil (Trefoil Knot) មិនអាចបន្ធូរចេញទៅជារង្វង់ធម្មតាបានទេដោយមិនកាត់វា ខុសពី Unknot (រង្វង់ធម្មតា) ដែលគ្រាន់តែមើលទៅរញ៉េរញ៉ៃ។ សាកល្បងអូសខ្សែដើម្បីស្រាយវា!'
                : 'A Trefoil Knot is mathematically knotted and cannot be untangled into a plain circle without cutting it, unlike the tangled Unknot. Try dragging the rope segments to untangle them!'}
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={loadUnknot}
                className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold transition-all shadow-sm ${
                  knotType === 'unknot' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                } ${isKh ? 'font-khmer' : ''}`}
              >
                <RefreshCw className={`w-4 h-4 ${knotType === 'unknot' ? 'text-emerald-100' : 'text-slate-400'}`} />
                {isKh ? 'ផ្ទុក Unknot (អាចស្រាយបាន)' : 'Load Unknot (Tangled)'}
              </button>
              
              <button
                onClick={loadTrefoil}
                className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold transition-all shadow-sm ${
                  knotType === 'trefoil' 
                    ? 'bg-rose-600 text-white shadow-md' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                } ${isKh ? 'font-khmer' : ''}`}
              >
                <Anchor className={`w-4 h-4 ${knotType === 'trefoil' ? 'text-rose-100' : 'text-slate-400'}`} />
                {isKh ? 'ផ្ទុក Trefoil (មិនអាចស្រាយបាន)' : 'Load Trefoil Knot'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: 3D Canvas */}
        <div className="w-full lg:w-2/3 h-[450px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-inner border-[4px] border-slate-800 touch-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <directionalLight position={[-10, -5, -5]} intensity={0.5} color="#818cf8" />
            <RopePhysics key={resetKey} knotType={knotType} />
            <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} />
            {/* We disable OrbitControls so dragging the rope doesn't rotate the camera unexpectedly, 
                or we can just let OrbitControls handle rotation when not clicking the rope. */}
            <OrbitControls makeDefault enableZoom={true} enablePan={false} />
            <Environment preset="city" />
          </Canvas>
          
          <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
            <div className={`bg-slate-800/60 backdrop-blur-md border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold ${isKh ? 'font-khmer' : ''}`}>
              {isKh ? 'ចុច និងអូសលើខ្សែដើម្បីស្រាយចំណង' : 'Click & drag the rope to untangle'}
            </div>
            {knotType === 'trefoil' && (
              <div className={`bg-rose-500/20 backdrop-blur-md border border-rose-500 text-rose-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 ${isKh ? 'font-khmer' : ''}`}>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                {isKh ? 'មិនអាចស្រាយបានទេ' : 'Mathematically Knotted'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
