import React, { useState } from 'react';
import { SVGMap } from 'react-svg-map';
import cambodiaMap from '@svg-maps/cambodia';
import { motion } from 'framer-motion';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { useLanguageStore } from '@/store/use-language';

// Ensure symmetry in the adjacency graph
const rawAdjacency: Record<string, string[]> = {
  'banteay-meanchey': ['battambang', 'siem-reap', 'oddar-meanchey'],
  'battambang': ['banteay-meanchey', 'siem-reap', 'pursat', 'pailin'],
  'pailin': ['battambang'],
  'pursat': ['battambang', 'siem-reap', 'kampong-thom', 'kampong-chhnang', 'kampong-speu', 'koh-kong'],
  'siem-reap': ['banteay-meanchey', 'oddar-meanchey', 'preah-vihear', 'kampong-thom', 'pursat', 'battambang'],
  'oddar-meanchey': ['banteay-meanchey', 'siem-reap', 'preah-vihear'],
  'preah-vihear': ['oddar-meanchey', 'siem-reap', 'kampong-thom', 'stung-treng'],
  'stung-treng': ['preah-vihear', 'kampong-thom', 'kratie', 'rattanakkiri', 'mondulkiri'],
  'rattanakkiri': ['stung-treng', 'mondulkiri'],
  'mondulkiri': ['rattanakkiri', 'stung-treng', 'kratie'],
  'kratie': ['stung-treng', 'mondulkiri', 'kampong-thom', 'kampong-cham', 'tboung-khmum'],
  'kampong-thom': ['siem-reap', 'preah-vihear', 'stung-treng', 'kratie', 'kampong-cham', 'kampong-chhnang', 'pursat'],
  'kampong-chhnang': ['pursat', 'kampong-thom', 'kampong-cham', 'kandal', 'kampong-speu'],
  'kampong-cham': ['kampong-thom', 'kratie', 'tboung-khmum', 'prey-veng', 'kandal', 'kampong-chhnang'],
  'tboung-khmum': ['kampong-cham', 'kratie', 'prey-veng'],
  'prey-veng': ['tboung-khmum', 'kampong-cham', 'kandal', 'svay-rieng'],
  'svay-rieng': ['prey-veng'],
  'kandal': ['kampong-chhnang', 'kampong-cham', 'prey-veng', 'takeo', 'kampong-speu', 'phnom-penh'],
  'phnom-penh': ['kandal'],
  'kampong-speu': ['pursat', 'kampong-chhnang', 'kandal', 'takeo', 'kampot', 'preah-Sihanouk', 'koh-kong'],
  'koh-kong': ['pursat', 'kampong-speu', 'preah-Sihanouk'],
  'preah-Sihanouk': ['koh-kong', 'kampong-speu', 'kampot'],
  'kampot': ['preah-Sihanouk', 'kampong-speu', 'takeo', 'kep'],
  'kep': ['kampot'],
  'takeo': ['kampot', 'kampong-speu', 'kandal']
};

// Make it symmetrical just in case we missed a connection
const adjacencyGraph: Record<string, string[]> = {};
for (const [node, neighbors] of Object.entries(rawAdjacency)) {
  if (!adjacencyGraph[node]) adjacencyGraph[node] = [];
  neighbors.forEach(n => {
    if (!adjacencyGraph[node].includes(n)) adjacencyGraph[node].push(n);
    if (!adjacencyGraph[n]) adjacencyGraph[n] = [];
    if (!adjacencyGraph[n].includes(node)) adjacencyGraph[n].push(node);
  });
}

const COLORS = [
  { id: 'color1', value: '#f43f5e' }, // Rose
  { id: 'color2', value: '#3b82f6' }, // Blue
  { id: 'color3', value: '#10b981' }, // Emerald
  { id: 'color4', value: '#f59e0b' }, // Amber
];

export default function FourColorMap() {
  const { language } = useLanguageStore();
  const isKh = language === 'kh';

  const [provinceColors, setProvinceColors] = useState<Record<string, string>>({});
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0].value);
  const [errorProvince, setErrorProvince] = useState<string | null>(null);

  const handleLocationClick = (event: React.MouseEvent<SVGElement>) => {
    const provinceId = event.currentTarget.getAttribute('id');
    if (!provinceId) return;

    // Check neighbors
    const neighbors = adjacencyGraph[provinceId] || [];
    const hasConflict = neighbors.some(n => provinceColors[n] === selectedColor);

    if (hasConflict) {
      setErrorProvince(provinceId);
      setTimeout(() => setErrorProvince(null), 500); // Clear error after animation
      return;
    }

    setProvinceColors(prev => ({
      ...prev,
      [provinceId]: selectedColor
    }));
  };

  const resetMap = () => {
    setProvinceColors({});
  };

  const allColored = Object.keys(provinceColors).length === cambodiaMap.locations.length;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Palette Selection */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-8 bg-white/80 p-4 rounded-2xl border border-indigo-100 shadow-sm">
        <div className="flex gap-3">
          {COLORS.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedColor(c.value)}
              className={`w-12 h-12 rounded-full shadow-md transition-transform border-4 ${
                selectedColor === c.value ? 'scale-110 border-indigo-400' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: c.value }}
              aria-label={`Select color ${c.value}`}
            />
          ))}
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <button
          onClick={resetMap}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span className={isKh ? 'font-khmer' : ''}>{isKh ? 'ចាប់ផ្តើមឡើងវិញ' : 'Reset Map'}</span>
        </button>
      </div>

      {allColored && (
        <div className="mb-6 px-6 py-3 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200 shadow-sm animate-pulse">
          <p className={`font-bold ${isKh ? 'font-khmer' : ''}`}>
            {isKh ? 'អបអរសាទរ! អ្នកបានផាត់ពណ៌ផែនទីទាំងមូលដោយជោគជ័យ។' : 'Congratulations! You colored the entire map successfully.'}
          </p>
        </div>
      )}

      {/* SVG Map Container */}
      <div className="w-full relative bg-blue-50/50 rounded-3xl border-2 border-indigo-100 p-4 md:p-8 shadow-inner overflow-hidden flex justify-center">
        <motion.div
          animate={errorProvince ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl svg-map-container"
        >
          <SVGMap
            map={cambodiaMap}
            onLocationClick={handleLocationClick}
            locationClassName={(location) => {
              const isError = errorProvince === location.id;
              const hasColor = !!provinceColors[location.id];
              return `outline-none stroke-white stroke-[2px] transition-colors cursor-pointer ${
                isError ? 'fill-red-500 animate-pulse' : (hasColor ? '' : 'fill-slate-200 hover:fill-slate-300')
              }`;
            }}
          />
          {/* Inject dynamic styles for colors since react-svg-map doesn't easily let us pass arbitrary style props to individual locations without breaking abstraction, we can use a style tag */}
          <style>{`
            ${Object.entries(provinceColors)
              .map(([id, color]) => `#${id} { fill: ${color} !important; }`)
              .join('\n')}
          `}</style>
        </motion.div>
      </div>

      {/* Instructions below map */}
      <div className="mt-6 text-center max-w-xl text-slate-600 text-sm flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <p className={`text-left leading-relaxed ${isKh ? 'font-khmer' : ''}`}>
          {isKh 
            ? 'ទ្រឹស្តីបទពណ៌បួនចែងថា ផែនទីណាមួយអាចត្រូវបានផាត់ដោយប្រើត្រឹមតែ ៤ ពណ៌ប៉ុណ្ណោះ ដោយមិនមានខេត្តពីរជាប់គ្នាមានពណ៌ដូចគ្នាឡើយ។ សាកល្បងដោយខ្លួនឯង!'
            : 'The Four Color Theorem states that any map can be colored using only 4 colors such that no two adjacent regions share the same color. Try it yourself!'}
        </p>
      </div>
    </div>
  );
}
