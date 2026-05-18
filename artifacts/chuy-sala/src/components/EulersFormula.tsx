import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import { BoxSelect, MousePointerClick } from 'lucide-react';
import { useLanguageStore } from '@/store/use-language';

type ShapeType = 'tetrahedron' | 'cube' | 'octahedron' | 'icosahedron';
type HoverElement = 'none' | 'vertices' | 'edges' | 'faces';

const SHAPE_DATA = {
  tetrahedron: { v: 4, e: 6, f: 4, labelEn: 'Tetrahedron', labelKh: 'ចតុត្ថមុខ (Tetrahedron)' },
  cube: { v: 8, e: 12, f: 6, labelEn: 'Cube', labelKh: 'គូប (Cube)' },
  octahedron: { v: 6, e: 12, f: 8, labelEn: 'Octahedron', labelKh: 'អដ្ឋមុខ (Octahedron)' },
  icosahedron: { v: 12, e: 30, f: 20, labelEn: 'Icosahedron', labelKh: 'វីសមមុខ (Icosahedron)' },
};

function Polyhedron({ shape, hovered }: { shape: ShapeType; hovered: HoverElement }) {
  // Create geometry dynamically based on selected shape
  const geometry = useMemo(() => {
    switch (shape) {
      case 'tetrahedron': return new THREE.TetrahedronGeometry(1.5);
      case 'cube': return new THREE.BoxGeometry(2, 2, 2);
      case 'octahedron': return new THREE.OctahedronGeometry(1.5);
      case 'icosahedron': return new THREE.IcosahedronGeometry(1.5);
      default: return new THREE.BoxGeometry(2, 2, 2);
    }
  }, [shape]);

  // Edges geometry
  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(geometry);
  }, [geometry]);

  // Extract unique vertices for points rendering (to avoid drawing overlapping points from face normals)
  const pointsGeometry = useMemo(() => {
    const positions = geometry.attributes.position;
    const uniquePositions = [];
    const seen = new Set<string>();

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      // Round slightly to catch floating point duplicates
      const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniquePositions.push(x, y, z);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(uniquePositions, 3));
    return geo;
  }, [geometry]);

  return (
    <group>
      {/* Faces */}
      <mesh geometry={geometry}>
        <meshStandardMaterial 
          color={hovered === 'faces' ? '#f59e0b' : '#3b82f6'} 
          transparent 
          opacity={hovered === 'faces' ? 0.9 : 0.2} 
          roughness={0.2}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Edges */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial 
          color={hovered === 'edges' ? '#ef4444' : '#1e3a8a'} 
          linewidth={1} // Note: linewidth > 1 is not supported by WebGL in most modern browsers, but changing color works well
          transparent
          opacity={hovered === 'edges' ? 1 : 0.4}
        />
      </lineSegments>

      {/* Vertices */}
      <points geometry={pointsGeometry}>
        <pointsMaterial 
          color={hovered === 'vertices' ? '#10b981' : '#1e3a8a'} 
          size={hovered === 'vertices' ? 0.4 : 0.15} 
          sizeAttenuation={true}
          transparent
          opacity={hovered === 'vertices' ? 1 : 0.6}
        />
      </points>
    </group>
  );
}

export default function EulersFormula() {
  const { language } = useLanguageStore();
  const isKh = language === 'kh';

  const [shape, setShape] = useState<ShapeType>('cube');
  const [hoveredElement, setHoveredElement] = useState<HoverElement>('none');

  const { v, e, f } = SHAPE_DATA[shape];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      
      {/* Controls & Map */}
      <div className="w-full flex flex-col lg:flex-row gap-6 mb-8">
        
        {/* Left Side: Context & Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100">
            <label className={`block text-sm font-semibold text-indigo-900 mb-2 ${isKh ? 'font-khmer' : ''}`}>
              {isKh ? 'ជ្រើសរើសរូបរាង៣វិមាត្រ៖' : 'Select a 3D Shape:'}
            </label>
            <select 
              value={shape}
              onChange={(e) => setShape(e.target.value as ShapeType)}
              className={`w-full bg-white border border-indigo-200 text-slate-800 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 shadow-sm ${isKh ? 'font-khmer' : ''}`}
            >
              {(Object.keys(SHAPE_DATA) as ShapeType[]).map((s) => (
                <option key={s} value={s}>
                  {isKh ? SHAPE_DATA[s].labelKh : SHAPE_DATA[s].labelEn}
                </option>
              ))}
            </select>
            
            <div className="mt-4 text-xs text-indigo-700/80 flex items-start gap-2">
              <MousePointerClick className="w-4 h-4 shrink-0 mt-0.5" />
              <p className={isKh ? 'font-khmer' : ''}>
                {isKh 
                  ? 'បង្វិលរូបភាព 3D ដោយប្រើកណ្តុរ។ ដាក់ទស្សន៍ទ្រនិចលើកាតពិន្ទុខាងក្រោម ដើម្បីរំលេចផ្នែកនីមួយៗ។' 
                  : 'Drag to rotate the 3D model. Hover over the scoreboard below to highlight specific parts.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: 3D Canvas */}
        <div className="w-full lg:w-2/3 h-[350px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-inner border-[4px] border-slate-800">
          <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#818cf8" />
            <Polyhedron shape={shape} hovered={hoveredElement} />
            <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={10} blur={2} />
            <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1.0} />
            <Environment preset="city" />
          </Canvas>
        </div>
      </div>

      {/* Interactive Scoreboard */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-3">
          <BoxSelect className="w-5 h-5 text-indigo-600" />
          <h3 className={`text-lg font-bold text-slate-800 ${isKh ? 'font-khmer' : 'font-display'}`}>
            {isKh ? 'សមីការរូបមន្ត Euler' : "Euler's Equation"}
          </h3>
        </div>
        
        <div className="p-6 md:p-8 flex flex-wrap items-center justify-center gap-4 md:gap-8 bg-gradient-to-br from-white to-slate-50">
          
          {/* Vertices */}
          <div 
            className={`group flex flex-col items-center p-4 rounded-xl border-2 transition-all cursor-crosshair ${
              hoveredElement === 'vertices' ? 'bg-emerald-50 border-emerald-400 scale-105 shadow-md' : 'bg-white border-slate-100 hover:border-emerald-200 shadow-sm'
            }`}
            onMouseEnter={() => setHoveredElement('vertices')}
            onMouseLeave={() => setHoveredElement('none')}
          >
            <span className="text-4xl font-bold font-mono text-slate-800 group-hover:text-emerald-600 transition-colors">{v}</span>
            <span className={`text-xs font-bold uppercase tracking-wider mt-2 ${hoveredElement === 'vertices' ? 'text-emerald-600' : 'text-slate-400'}`}>
              {isKh ? 'កំពូល (V)' : 'Vertices (V)'}
            </span>
          </div>

          <span className="text-3xl font-bold text-slate-300">-</span>

          {/* Edges */}
          <div 
            className={`group flex flex-col items-center p-4 rounded-xl border-2 transition-all cursor-crosshair ${
              hoveredElement === 'edges' ? 'bg-red-50 border-red-400 scale-105 shadow-md' : 'bg-white border-slate-100 hover:border-red-200 shadow-sm'
            }`}
            onMouseEnter={() => setHoveredElement('edges')}
            onMouseLeave={() => setHoveredElement('none')}
          >
            <span className="text-4xl font-bold font-mono text-slate-800 group-hover:text-red-600 transition-colors">{e}</span>
            <span className={`text-xs font-bold uppercase tracking-wider mt-2 ${hoveredElement === 'edges' ? 'text-red-600' : 'text-slate-400'}`}>
              {isKh ? 'គែម (E)' : 'Edges (E)'}
            </span>
          </div>

          <span className="text-3xl font-bold text-slate-300">+</span>

          {/* Faces */}
          <div 
            className={`group flex flex-col items-center p-4 rounded-xl border-2 transition-all cursor-crosshair ${
              hoveredElement === 'faces' ? 'bg-amber-50 border-amber-400 scale-105 shadow-md' : 'bg-white border-slate-100 hover:border-amber-200 shadow-sm'
            }`}
            onMouseEnter={() => setHoveredElement('faces')}
            onMouseLeave={() => setHoveredElement('none')}
          >
            <span className="text-4xl font-bold font-mono text-slate-800 group-hover:text-amber-600 transition-colors">{f}</span>
            <span className={`text-xs font-bold uppercase tracking-wider mt-2 ${hoveredElement === 'faces' ? 'text-amber-600' : 'text-slate-400'}`}>
              {isKh ? 'ផ្ទៃមុខ (F)' : 'Faces (F)'}
            </span>
          </div>

          <span className="text-3xl font-bold text-slate-300">=</span>

          {/* Result */}
          <div className="flex flex-col items-center p-4 rounded-xl border-2 border-indigo-500 bg-indigo-50 shadow-md">
            <span className="text-4xl font-bold font-mono text-indigo-700">2</span>
            <span className="text-xs font-bold uppercase tracking-wider mt-2 text-indigo-500">
              {isKh ? 'ថេរ' : 'Constant'}
            </span>
          </div>

        </div>
      </div>
      
    </div>
  );
}
