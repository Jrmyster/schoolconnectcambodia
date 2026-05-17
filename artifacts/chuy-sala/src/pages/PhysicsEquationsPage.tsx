import { useState } from "react";
import { useLanguageStore } from "@/store/use-language";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Ruler, Rocket, ArrowRight, ShieldAlert, Navigation, CircleDot, Sigma } from "lucide-react";

export default function PhysicsEquationsPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-2">
            <Sigma className="w-8 h-8 text-emerald-700" />
          </div>
          <h1 className={`text-4xl font-extrabold text-slate-900 tracking-tight ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "សន្លឹកជួយចងចាំរូបវិទ្យា" : "Physics Cheat Sheet"}
          </h1>
          <p className={`text-xl text-slate-600 max-w-2xl mx-auto ${isKh ? "font-khmer" : ""}`}>
            {isKh 
              ? "សមីការសំខាន់ៗដែលអ្នកត្រូវការសម្រាប់ការវាស់វែង គីណេម៉ាទិច ឌីណាមិច សន្ទុះ និងចលនារង្វង់។"
              : "The essential equations you need for measurement, kinematics, dynamics, momentum, and circular motion."}
          </p>
        </div>

        <div className="grid gap-8">
          <MeasurementSection isKh={isKh} />
          <KinematicsSection isKh={isKh} />
          <DynamicsSection isKh={isKh} />
          <MomentumSection isKh={isKh} />
          <CircularMotionSection isKh={isKh} />
        </div>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * 1. Measurement
 * ════════════════════════════════════════════════════════════════════════ */
function MeasurementSection({ isKh }: { isKh: boolean }) {
  const [mass, setMass] = useState("");
  const [volume, setVolume] = useState("");

  const m = parseFloat(mass);
  const v = parseFloat(volume);
  const density = !isNaN(m) && !isNaN(v) && v !== 0 ? (m / v).toFixed(2) : "—";

  return (
    <section className="bg-slate-900 text-slate-200 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
      <div className="bg-emerald-900/40 border-b border-slate-700 p-4 sm:p-6 flex items-center gap-3">
        <Ruler className="w-6 h-6 text-emerald-400" />
        <h2 className={`text-2xl font-bold text-emerald-50 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "១. ការវាស់វែង" : "1. Measurement"}
        </h2>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h3 className={`text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "សីតុណ្ហភាព" : "Temperature"}
            </h3>
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <BlockMath math="K = C + 273" />
            </div>
          </div>
          <div>
            <h3 className={`text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ភាគរយលម្អៀង" : "Percentage Error"}
            </h3>
            <div className="bg-slate-800 rounded-xl p-4 text-center overflow-x-auto">
              <BlockMath math="\% \text{Error} = \frac{|\text{Experimental} - \text{Accepted}|}{\text{Accepted}} \times 100\%" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className={`text-lg font-bold text-white mb-4 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ម៉ាស៊ីនគិតលេខដង់ស៊ីតេ" : "Density Calculator"}
          </h3>
          <div className="text-center mb-6 text-emerald-300">
            <BlockMath math="D = \frac{m}{v}" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-24 text-slate-400 font-mono">m (kg):</label>
              <input 
                type="number" 
                value={mass} onChange={(e) => setMass(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-24 text-slate-400 font-mono">v (m³):</label>
              <input 
                type="number" 
                value={volume} onChange={(e) => setVolume(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>
            <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
              <span className={`text-emerald-400 font-bold ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "ដង់ស៊ីតេ D =" : "Density D ="}
              </span>
              <span className="text-2xl font-mono text-white">{density} kg/m³</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * 2. Kinematics
 * ════════════════════════════════════════════════════════════════════════ */
function KinematicsSection({ isKh }: { isKh: boolean }) {
  const [vi, setVi] = useState("0");
  const [a, setA] = useState("9.8");
  const [t, setT] = useState("2");

  const v_i = parseFloat(vi);
  const acc = parseFloat(a);
  const time = parseFloat(t);

  const finalV = !isNaN(v_i) && !isNaN(acc) && !isNaN(time) ? (v_i + acc * time).toFixed(2) : "—";
  const dispX = !isNaN(v_i) && !isNaN(acc) && !isNaN(time) ? (v_i * time + 0.5 * acc * time * time).toFixed(2) : "—";

  return (
    <section className="bg-slate-900 text-slate-200 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
      <div className="bg-emerald-900/40 border-b border-slate-700 p-4 sm:p-6 flex items-center gap-3">
        <Rocket className="w-6 h-6 text-emerald-400" />
        <h2 className={`text-2xl font-bold text-emerald-50 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "២. គីណេម៉ាទិច" : "2. Kinematics (1D Motion)"}
        </h2>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl p-4 text-center overflow-x-auto space-y-4">
            <BlockMath math="v_f = v_i + at" />
            <BlockMath math="x = v_it + \frac{1}{2}at^2" />
            <BlockMath math="v_f^2 = v_i^2 + 2ax" />
            <BlockMath math="x = \frac{1}{2}(v_i + v_f)t" />
          </div>
          <p className="text-slate-400 text-sm">
            * Note: These equations apply to both x (horizontal) and y (vertical) axes individually. For vertical motion, acceleration <InlineMath math="a = g = -9.8 \text{ m/s}^2" />.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className={`text-lg font-bold text-white mb-6 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ម៉ាស៊ីនគិតលេខចលនា (v & x)" : "Motion Calculator (v & x)"}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-24 text-slate-400 font-mono">v_i (m/s):</label>
              <input 
                type="number" 
                value={vi} onChange={(e) => setVi(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-24 text-slate-400 font-mono">a (m/s²):</label>
              <input 
                type="number" 
                value={a} onChange={(e) => setA(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-24 text-slate-400 font-mono">t (s):</label>
              <input 
                type="number" 
                value={t} onChange={(e) => setT(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-4 border-t border-slate-700 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-emerald-400 font-mono">v_f =</span>
                <span className="text-xl font-mono text-white">{finalV} m/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-emerald-400 font-mono">x =</span>
                <span className="text-xl font-mono text-white">{dispX} m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * 3. Dynamics & Forces
 * ════════════════════════════════════════════════════════════════════════ */
function DynamicsSection({ isKh }: { isKh: boolean }) {
  const [m, setM] = useState("10");
  const [a, setA] = useState("2.5");

  const mass = parseFloat(m);
  const acc = parseFloat(a);
  const force = !isNaN(mass) && !isNaN(acc) ? (mass * acc).toFixed(2) : "—";

  return (
    <section className="bg-slate-900 text-slate-200 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
      <div className="bg-emerald-900/40 border-b border-slate-700 p-4 sm:p-6 flex items-center gap-3">
        <Navigation className="w-6 h-6 text-emerald-400" />
        <h2 className={`text-2xl font-bold text-emerald-50 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "៣. ឌីណាមិច និងកម្លាំង" : "3. Dynamics & Forces"}
        </h2>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h3 className={`text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ច្បាប់ទី ២ របស់ញូតុន និងទម្ងន់" : "Newton's 2nd Law & Weight"}
            </h3>
            <div className="bg-slate-800 rounded-xl p-4 text-center space-y-4 overflow-x-auto">
              <BlockMath math="F_{net} = ma" />
              <BlockMath math="W = mg" />
            </div>
          </div>
          <div>
            <h3 className={`text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ប្លង់ទេរ" : "Inclined Plane"}
            </h3>
            <div className="bg-slate-800 rounded-xl p-4 text-center overflow-x-auto space-y-4">
              <BlockMath math="F_{\parallel} = mg \sin\theta" />
              <BlockMath math="F_{\perp} = F_N = mg \cos\theta" />
              <BlockMath math="F_f = \mu F_N" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 h-fit">
          <h3 className={`text-lg font-bold text-white mb-6 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ម៉ាស៊ីនគិតលេខកម្លាំង" : "Force Calculator (F=ma)"}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-24 text-slate-400 font-mono">m (kg):</label>
              <input 
                type="number" 
                value={m} onChange={(e) => setM(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-24 text-slate-400 font-mono">a (m/s²):</label>
              <input 
                type="number" 
                value={a} onChange={(e) => setA(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>
            
            <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
              <span className={`text-emerald-400 font-bold ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "កម្លាំង F =" : "Force F ="}
              </span>
              <span className="text-2xl font-mono text-white">{force} N</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * 4. Momentum & Collisions
 * ════════════════════════════════════════════════════════════════════════ */
function MomentumSection({ isKh }: { isKh: boolean }) {
  const [f, setF] = useState("50");
  const [t, setT] = useState("0.1");

  const force = parseFloat(f);
  const time = parseFloat(t);
  const impulse = !isNaN(force) && !isNaN(time) ? (force * time).toFixed(2) : "—";

  return (
    <section className="bg-slate-900 text-slate-200 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
      <div className="bg-emerald-900/40 border-b border-slate-700 p-4 sm:p-6 flex items-center gap-3">
        <ArrowRight className="w-6 h-6 text-emerald-400" />
        <h2 className={`text-2xl font-bold text-emerald-50 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "៤. សន្ទុះ និងការទង្គិច" : "4. Momentum & Collisions"}
        </h2>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h3 className={`text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "សន្ទុះ និងអាំងពាល់" : "Momentum & Impulse"}
            </h3>
            <div className="bg-slate-800 rounded-xl p-4 text-center overflow-x-auto space-y-4">
              <BlockMath math="p = mv" />
              <BlockMath math="J = F \Delta t = \Delta p" />
            </div>
          </div>
          <div>
            <h3 className={`text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ការទង្គិច (អេឡាស្ទិច និងអនេឡាស្ទិច)" : "Collisions (Elastic vs Inelastic)"}
            </h3>
            <div className="bg-slate-800 rounded-xl p-4 text-center overflow-x-auto space-y-4">
              <BlockMath math="m_1v_{1i} + m_2v_{2i} = m_1v_{1f} + m_2v_{2f}" />
              <BlockMath math="m_1v_{1i} + m_2v_{2i} = (m_1 + m_2)v_f" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 h-fit">
          <h3 className={`text-lg font-bold text-white mb-6 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ម៉ាស៊ីនគិតលេខអាំងពាល់" : "Impulse Calculator"}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-24 text-slate-400 font-mono">F (N):</label>
              <input 
                type="number" 
                value={f} onChange={(e) => setF(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-24 text-slate-400 font-mono">Δt (s):</label>
              <input 
                type="number" 
                value={t} onChange={(e) => setT(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>
            
            <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
              <span className={`text-emerald-400 font-bold ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "អាំងពាល់ J =" : "Impulse J ="}
              </span>
              <span className="text-2xl font-mono text-white">{impulse} N·s</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * 5. Circular Motion
 * ════════════════════════════════════════════════════════════════════════ */
function CircularMotionSection({ isKh }: { isKh: boolean }) {
  const [v, setV] = useState("10");
  const [r, setR] = useState("2");

  const vel = parseFloat(v);
  const radius = parseFloat(r);
  const ac = !isNaN(vel) && !isNaN(radius) && radius !== 0 ? ((vel * vel) / radius).toFixed(2) : "—";

  return (
    <section className="bg-slate-900 text-slate-200 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
      <div className="bg-emerald-900/40 border-b border-slate-700 p-4 sm:p-6 flex items-center gap-3">
        <CircleDot className="w-6 h-6 text-emerald-400" />
        <h2 className={`text-2xl font-bold text-emerald-50 ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "៥. ចលនារង្វង់" : "5. Circular Motion"}
        </h2>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h3 className={`text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "ខួប និងល្បឿន" : "Period & Velocity"}
            </h3>
            <div className="bg-slate-800 rounded-xl p-4 text-center overflow-x-auto space-y-4">
              <BlockMath math="T = \frac{1}{f}" />
              <BlockMath math="v = \frac{2\pi r}{T} = 2\pi rf" />
            </div>
          </div>
          <div>
            <h3 className={`text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "សំទុះចូលផ្ចិត" : "Centripetal Acceleration"}
            </h3>
            <div className="bg-slate-800 rounded-xl p-4 text-center overflow-x-auto space-y-4">
              <BlockMath math="a_c = \frac{v^2}{r} = \frac{4\pi^2 r}{T^2}" />
              <BlockMath math="F_c = ma_c = \frac{mv^2}{r}" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 h-fit">
          <h3 className={`text-lg font-bold text-white mb-6 ${isKh ? "font-khmer" : ""}`}>
            {isKh ? "ម៉ាស៊ីនគិតលេខសំទុះចូលផ្ចិត" : "Centripetal Acceleration"}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-24 text-slate-400 font-mono">v (m/s):</label>
              <input 
                type="number" 
                value={v} onChange={(e) => setV(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-24 text-slate-400 font-mono">r (m):</label>
              <input 
                type="number" 
                value={r} onChange={(e) => setR(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
              />
            </div>
            
            <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
              <span className={`text-emerald-400 font-bold ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "សំទុះ a_c =" : "Acc a_c ="}
              </span>
              <span className="text-2xl font-mono text-white">{ac} m/s²</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
