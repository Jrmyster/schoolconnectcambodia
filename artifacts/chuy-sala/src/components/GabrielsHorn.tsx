import React, { useState, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { BlockMath, InlineMath } from "react-katex";
import { Info, Paintbrush, Sliders } from "lucide-react";
import { useLanguageStore } from "@/store/use-language";
import "katex/dist/katex.min.css";

// Helper to generate Gabriel's Horn parametric geometry
function createHornGeometry(a: number, slices: number = 100, stacks: number = 80) {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];

  const scaleX = 0.8;
  const scaleYZ = 1.8;

  for (let i = 0; i <= stacks; i++) {
    // u goes from 0 to 1
    const u = i / stacks;
    // Map u to x from 1 to a
    const x = 1 + u * (a - 1);
    const r = 1 / x;

    for (let j = 0; j <= slices; j++) {
      // v goes from 0 to 1
      const v = j / slices;
      const theta = v * Math.PI * 2;

      // Rotate around x-axis
      const y = r * Math.cos(theta);
      const z = r * Math.sin(theta);

      // Center the horn on the X-axis by shifting it by -(1 + a)/2
      const xCentered = x - (1 + a) / 2;

      // Push vertices scaled for beautiful presentation
      vertices.push(xCentered * scaleX, y * scaleYZ, z * scaleYZ);
    }
  }

  for (let i = 0; i < stacks; i++) {
    for (let j = 0; j < slices; j++) {
      const aIdx = i * (slices + 1) + j;
      const bIdx = (i + 1) * (slices + 1) + j;
      const cIdx = i * (slices + 1) + (j + 1);
      const dIdx = (i + 1) * (slices + 1) + (j + 1);

      // Map two triangles for each quad
      indices.push(aIdx, bIdx, dIdx);
      indices.push(aIdx, dIdx, cIdx);
    }
  }

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function HornMesh({ a }: { a: number }) {
  const geometry = useMemo(() => createHornGeometry(a), [a]);

  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      {/* Dynamic Emerald Glass Surface */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#10b981"
          transmission={0.85}
          opacity={1}
          metalness={0.2}
          roughness={0.15}
          ior={1.45}
          thickness={0.4}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>

      {/* Subtle glowing wireframe */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#34d399"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

export default function GabrielsHorn() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  const [a, setA] = useState(2.0);
  const [showVolumeProof, setShowVolumeProof] = useState(false);
  const [showAreaProof, setShowAreaProof] = useState(false);

  // Math Calculations
  const volumeVal = Math.PI * (1 - 1 / a);
  // Analytical lower bound for surface area A >= 2 * pi * ln(a)
  const saBoundVal = 2 * Math.PI * Math.log(a);

  return (
    <div className="w-full max-w-6xl mx-auto" data-testid="gabriels-horn-module">
      <div className="grid lg:grid-cols-5 gap-6">
        
        {/* Left: 3D Visualization */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="relative h-[420px] bg-slate-950 rounded-3xl overflow-hidden border border-emerald-800/40 shadow-inner group">
            
            {/* 3D Canvas */}
            <Canvas camera={{ position: [0, 2.5, 4.5], fov: 45 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 8, 5]} intensity={1.5} />
              <directionalLight position={[-5, -8, -5]} intensity={0.5} color="#34d399" />
              <pointLight position={[0, 0, 2]} intensity={0.8} color="#a7f3d0" />
              <HornMesh a={a} />
              <ContactShadows position={[0, -1.8, 0]} opacity={0.3} scale={8} blur={2} />
              <OrbitControls enableZoom={true} minDistance={2} maxDistance={10} />
              <Environment preset="city" />
            </Canvas>

            {/* Instruction Overlay */}
            <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-full text-[11px] font-mono text-emerald-300 pointer-events-none select-none">
              {isKh ? "អូសដើម្បីបង្វិល · រមូរដើម្បីពង្រីក/បង្រួម" : "Drag to rotate · Scroll to zoom"}
            </div>
            
            {/* Length Badge */}
            <div className="absolute bottom-4 right-4 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-300">
              a = {a.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Right: Scoreboard & Controls */}
        <div className="lg:col-span-2 flex flex-col gap-5 justify-between">
          
          {/* Controls & Slider */}
          <div className="bg-gradient-to-br from-emerald-950/90 via-slate-900 to-emerald-950/90 rounded-3xl p-5 border border-emerald-800/30 shadow-[0_12px_24px_-12px_rgba(6,78,59,0.3)]">
            <div className="flex items-center gap-2 mb-4 text-emerald-400">
              <Sliders className="w-4 h-4" />
              <span className={`text-[11px] font-mono uppercase tracking-widest ${isKh ? "font-khmer tracking-normal" : ""}`}>
                {isKh ? "ឧបករណ៍បញ្ជាលីមីត" : "Limit Controls"}
              </span>
            </div>
            
            <label htmlFor="length-slider" className={`block text-sm font-semibold text-slate-200 mb-2 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? (
                <>ប្រវែងត្រែ (<InlineMath math="a" />)</>
              ) : (
                <>Length of the Horn (<InlineMath math="a" />)</>
              )}
            </label>
            
            <input
              id="length-slider"
              type="range"
              min="1.1"
              max="10.0"
              step="0.1"
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value))}
              className="w-full h-2 bg-emerald-900/60 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-colors"
            />
            
            <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400 font-mono">
              <span>a = 1.1</span>
              <span>a = 10.0 (→ ∞)</span>
            </div>
          </div>

          {/* Math Scoreboard */}
          <div className="bg-gradient-to-br from-emerald-950/90 via-slate-900 to-emerald-950/90 rounded-3xl p-5 border border-emerald-800/30 shadow-[0_12px_24px_-12px_rgba(6,78,59,0.3)] flex-grow flex flex-col justify-center">
            <h4 className={`text-xs font-bold text-emerald-400 uppercase font-mono tracking-widest mb-3 ${isKh ? "font-khmer tracking-normal" : ""}`}>
              {isKh ? "ក្ដារពិន្ទុគណិតវិទ្យាផ្ទាល់" : "Live Math Scoreboard"}
            </h4>

            <div className="space-y-4">
              {/* Volume */}
              <div className="bg-slate-950/60 rounded-2xl p-4 border border-emerald-800/20">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? "មាឌ (Volume)" : "Volume (V)"}
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                    {isKh ? "លីមីតកំណត់" : "Finite Limit"}
                  </span>
                </div>
                <div className="text-sm font-mono text-emerald-300 mb-2">
                  <BlockMath math={String.raw`V = \pi \left(1 - \frac{1}{a}\right)`} />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono bg-slate-900/80 p-2 rounded-lg">
                  <span>{isKh ? "គណនា៖" : "Current:"}</span>
                  <span className="font-bold text-white">
                    {Math.PI.toFixed(5)} × (1 - 1/{a.toFixed(1)}) = {volumeVal.toFixed(5)}
                  </span>
                </div>
                <div className={`mt-2 text-[10px] text-emerald-400/80 flex items-center gap-1 ${isKh ? "font-khmer" : ""}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {isKh ? (
                    <>មាឌរួមតូចទៅរកតម្លៃកៀក <InlineMath math="\pi \approx 3.14159" /></>
                  ) : (
                    <>Converging strictly to <InlineMath math="\pi \approx 3.14159" /></>
                  )}
                </div>
              </div>

              {/* Surface Area */}
              <div className="bg-slate-950/60 rounded-2xl p-4 border border-emerald-800/20">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold text-slate-300 ${isKh ? "font-khmer" : ""}`}>
                    {isKh ? "ផ្ទៃក្រឡា (Surface Area)" : "Surface Area (A)"}
                  </span>
                  <span className="text-[10px] font-mono bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded border border-rose-500/20">
                    {isKh ? "អនន្ត" : "Diverging (∞)"}
                  </span>
                </div>
                <div className="text-sm font-mono text-emerald-300 mb-2">
                  <BlockMath math={String.raw`A \ge 2\pi \ln(a)`} />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono bg-slate-900/80 p-2 rounded-lg">
                  <span>{isKh ? "គណនា៖" : "Current Bound:"}</span>
                  <span className="font-bold text-white">
                    2\pi \times \ln({a.toFixed(1)}) \ge {saBoundVal.toFixed(5)}
                  </span>
                </div>
                <div className={`mt-2 text-[10px] text-rose-400/80 flex items-center gap-1 ${isKh ? "font-khmer" : ""}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" />
                  {isKh ? (
                    <>ផ្ទៃក្រឡាកើនឡើងឥតឈប់ឈរ និងរីកធំទៅរក <InlineMath math="\infty" /></>
                  ) : (
                    <>Growing without bounds to <InlineMath math="\infty" /></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Mathematical Proofs */}
      <div className="mt-6 space-y-4">
        {/* Finite Volume Proof */}
        <div className="border border-emerald-800/30 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950/90 via-slate-900 to-emerald-950/90 shadow-[0_12px_24px_-12px_rgba(6,78,59,0.3)]">
          <button
            type="button"
            onClick={() => setShowVolumeProof(!showVolumeProof)}
            className="w-full flex justify-between items-center px-6 py-4 bg-slate-950/50 hover:bg-slate-950/80 text-emerald-400 font-bold text-sm transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <span className={isKh ? "font-khmer text-xs sm:text-sm" : "font-display text-xs sm:text-sm"}>
              {isKh ? "ការសម្រាយបញ្ជាក់គណិតវិទ្យា៖ មាឌកំណត់" : "Mathematical Proof: Finite Volume"}
            </span>
            <span className="text-emerald-400 font-mono text-xs">{showVolumeProof ? "▲" : "▼"}</span>
          </button>
          
          {showVolumeProof && (
            <div className="px-6 py-5 border-t border-emerald-800/20 text-slate-300 text-sm leading-relaxed bg-slate-950/20">
              <p className={`mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? (
                  <>មាឌ <InlineMath math="V" /> នៃសូលីតដែលបានមកពីការបង្វិលខ្សែកោង <InlineMath math={String.raw`y = \frac{1}{x}`} /> ពី <InlineMath math="x = 1" /> ដល់ <InlineMath math="x = a" /> ត្រូវបានគណនាដោយប្រើវិធីសាស្ត្រថាស៖</>
                ) : (
                  <>The volume <InlineMath math="V" /> of the solid formed by rotating <InlineMath math={String.raw`y = \frac{1}{x}`} /> from <InlineMath math="x = 1" /> to <InlineMath math="x = a" /> is calculated using the disk method:</>
                )}
              </p>
              <div className="my-3 overflow-x-auto bg-slate-950/60 p-3 rounded-xl border border-emerald-800/10">
                <BlockMath math={String.raw`V = \pi \int_{1}^{a} \left(\frac{1}{x}\right)^2 dx = \pi \int_{1}^{a} x^{-2} dx`} />
              </div>
              <p className={`my-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? "គណនាអាំងតេក្រាល៖" : "Evaluating the integral:"}
              </p>
              <div className="my-3 overflow-x-auto bg-slate-950/60 p-3 rounded-xl border border-emerald-800/10">
                <BlockMath math={String.raw`V = \pi \left[ -\frac{1}{x} \right]_{1}^{a} = \pi \left( -\frac{1}{a} - (-1) \right) = \pi \left( 1 - \frac{1}{a} \right)`} />
              </div>
              <p className={`my-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? (
                  <>រកលីមីតកាលណា <InlineMath math="a" /> ខិតជិតអនន្ត៖</>
                ) : (
                  <>Taking the limit as <InlineMath math="a" /> approaches infinity:</>
                )}
              </p>
              <div className="my-3 overflow-x-auto bg-slate-950/60 p-3 rounded-xl border border-emerald-800/10">
                <BlockMath math={String.raw`\lim_{a \to \infty} V = \lim_{a \to \infty} \pi \left( 1 - \frac{1}{a} \right) = \pi (1 - 0) = \pi`} />
              </div>
            </div>
          )}
        </div>

        {/* Infinite Surface Area Proof */}
        <div className="border border-emerald-800/30 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950/90 via-slate-900 to-emerald-950/90 shadow-[0_12px_24px_-12px_rgba(6,78,59,0.3)]">
          <button
            type="button"
            onClick={() => setShowAreaProof(!showAreaProof)}
            className="w-full flex justify-between items-center px-6 py-4 bg-slate-950/50 hover:bg-slate-950/80 text-emerald-400 font-bold text-sm transition-colors text-left focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <span className={isKh ? "font-khmer text-xs sm:text-sm" : "font-display text-xs sm:text-sm"}>
              {isKh ? "ការសម្រាយបញ្ជាក់គណិតវិទ្យា៖ ផ្ទៃក្រឡាអនន្ត" : "Mathematical Proof: Infinite Surface Area"}
            </span>
            <span className="text-emerald-400 font-mono text-xs">{showAreaProof ? "▲" : "▼"}</span>
          </button>
          
          {showAreaProof && (
            <div className="px-6 py-5 border-t border-emerald-800/20 text-slate-300 text-sm leading-relaxed bg-slate-950/20">
              <p className={`mb-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? (
                  <>ផ្ទៃក្រឡា <InlineMath math="A" /> ត្រូវបានគណនាដោយប្រើរូបមន្តផ្ទៃបង្វិល៖</>
                ) : (
                  <>The surface area <InlineMath math="A" /> is calculated using the surface of revolution formula:</>
                )}
              </p>
              <div className="my-3 overflow-x-auto bg-slate-950/60 p-3 rounded-xl border border-emerald-800/10">
                <BlockMath math={String.raw`A = 2\pi \int_{1}^{a} f(x) \sqrt{1 + (f'(x))^2} dx`} />
              </div>
              <p className={`my-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? (
                  <>ជំនួស <InlineMath math={String.raw`f(x) = \frac{1}{x}`} /> និង <InlineMath math={String.raw`f'(x) = -\frac{1}{x^2}`} /> ចូល៖</>
                ) : (
                  <>Substituting <InlineMath math={String.raw`f(x) = \frac{1}{x}`} /> and <InlineMath math={String.raw`f'(x) = -\frac{1}{x^2}`} />:</>
                )}
              </p>
              <div className="my-3 overflow-x-auto bg-slate-950/60 p-3 rounded-xl border border-emerald-800/10">
                <BlockMath math={String.raw`A = 2\pi \int_{1}^{a} \frac{1}{x} \sqrt{1 + \left(-\frac{1}{x^2}\right)^2} dx = 2\pi \int_{1}^{a} \frac{1}{x} \sqrt{1 + \frac{1}{x^4}} dx`} />
              </div>
              <p className={`my-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? (
                  <>ដោយសារ <InlineMath math={String.raw`\sqrt{1 + \frac{1}{x^4}} > 1`} /> ចំពោះគ្រប់ <InlineMath math={String.raw`x \ge 1`} /> យើងអាចប្រើប្រាស់វិធីប្រៀបធៀបផ្ទាល់៖</>
                ) : (
                  <>Since <InlineMath math={String.raw`\sqrt{1 + \frac{1}{x^4}} > 1`} /> for all <InlineMath math={String.raw`x \ge 1`} />, we can use a direct comparison:</>
                )}
              </p>
              <div className="my-3 overflow-x-auto bg-slate-950/60 p-3 rounded-xl border border-emerald-800/10">
                <BlockMath math={String.raw`A > 2\pi \int_{1}^{a} \frac{1}{x} dx`} />
              </div>
              <p className={`my-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? "គណនាអាំងតេក្រាលសាមញ្ញនេះ៖" : "Evaluating this simpler integral:"}
              </p>
              <div className="my-3 overflow-x-auto bg-slate-950/60 p-3 rounded-xl border border-emerald-800/10">
                <BlockMath math={String.raw`2\pi \int_{1}^{a} \frac{1}{x} dx = 2\pi [\ln(x)]_{1}^{a} = 2\pi (\ln(a) - \ln(1)) = 2\pi \ln(a)`} />
              </div>
              <p className={`my-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? (
                  <>រកលីមីតកាលណា <InlineMath math="a" /> ខិតជិតអនន្ត៖</>
                ) : (
                  <>Taking the limit as <InlineMath math="a" /> approaches infinity:</>
                )}
              </p>
              <div className="my-3 overflow-x-auto bg-slate-950/60 p-3 rounded-xl border border-emerald-800/10">
                <BlockMath math={String.raw`\lim_{a \to \infty} 2\pi \ln(a) = \infty`} />
              </div>
              <p className={`mt-3 ${isKh ? "font-khmer leading-loose" : ""}`}>
                {isKh ? "ដោយសារអនុគមន៍ដែលតូចជាងវិវត្តទៅរកអនន្ត ផ្ទៃក្រឡាពិតប្រាកដក៏ត្រូវតែមានតម្លៃអនន្តដែរ។" : "Because the smaller function diverges to infinity, the actual surface area must also be infinite."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Paint Analogy Callout (Painter's Paradox) */}
      <div className="mt-6 bg-gradient-to-br from-emerald-950/90 via-slate-900 to-emerald-950/90 rounded-3xl p-5 border border-emerald-800/30 shadow-[0_12px_24px_-12px_rgba(6,78,59,0.3)]">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-800/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-400">
            <Paintbrush className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-[10px] font-mono uppercase tracking-widest text-emerald-400 ${isKh ? "font-khmer tracking-normal" : ""}`}>
                {isKh ? "ភាពផ្ទុយគ្នារបស់ជាងគំនូរ" : "The Painter's Paradox"}
              </span>
              <Info className="w-3.5 h-3.5 text-emerald-400/70" />
            </div>
            <h4 className={`text-base font-bold text-slate-200 mb-2 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "បំពេញត្រែដោយថ្នាំលាប ប៉ុន្តែមិនអាចលាបលើផ្ទៃវាឡើយ" : "Filling the Horn vs Painting the Surface"}
            </h4>
            <p className={`text-sm text-slate-300 leading-relaxed ${isKh ? "font-khmer leading-loose" : ""}`}>
              {isKh ? (
                <>
                  ត្រែ Gabriel បង្ហាញភាពផ្ទុយគ្នាមួយ៖ វាមាន <strong>មាឌកំណត់</strong> (ស្មើនឹង <InlineMath math="\pi" />) ប៉ុន្តែមាន <strong>ផ្ទៃក្រឡាអនន្ត</strong>។ នេះមានន័យថា ប្រសិនបើអ្នកចាក់ថ្នាំលាបបំពេញផ្នែកខាងក្នុងត្រែ អ្នកត្រូវការថ្នាំលាបតែ <InlineMath math="\pi" /> ឯកតាមាឌប៉ុណ្ណោះ។ ពេលចាក់បំពេញរួច ថ្នាំលាបនឹងគ្របដណ្ដប់ផ្ទៃខាងក្នុងទាំងអស់។ ប៉ុន្តែ ប្រសិនបើអ្នកចង់លាបថ្នាំលើផ្ទៃដដែលនេះដោយកម្រាស់ថេរពីខាងក្រៅវិញ នោះអ្នកនឹងត្រូវការថ្នាំលាប <strong>ច្រើនរាប់មិនអស់ (អនន្ត)</strong>! នេះគឺដោយសារតែផ្ទៃក្រឡាមានទំហំធំអនន្ត ខណៈពេលដែលមាឌរបស់វានៅតែតូចចង្អៀត។
                </>
              ) : (
                <>
                  Gabriel's Horn presents a famous mathematical paradox: it has a <strong>finite volume</strong> (exactly <InlineMath math="\pi" />) but an <strong>infinite surface area</strong>. This means you could completely fill the interior of the horn using a finite amount of paint (exactly <InlineMath math="\pi" /> cubic units), which by definition coats the entire infinite inner surface. However, you could never coat that same surface by painting it from the outside with a layer of constant thickness, as that would require an <strong>infinite amount of paint</strong>!
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
