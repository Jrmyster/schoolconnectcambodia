import { useState } from "react";
import { useLanguageStore } from "@/store/use-language";
import { Lock, Unlock, ArrowRight, ShieldAlert, Dna, FlaskConical, Beaker, CheckCircle2 } from "lucide-react";

// Audio effects
function playBuzzer() {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(120, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

function playUnlock() {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.2);
}

/* ════════════════════════════════════════════════════════════════════════
 * Room 1: Organelles
 * ════════════════════════════════════════════════════════════════════════ */
function Room1({ isKh, onUnlock }: { isKh: boolean; onUnlock: () => void }) {
  // Passcode based on matching definitions.
  // 1. Mitochondria (Powerhouse)
  // 2. Nucleus (Control Center)
  // 3. Ribosome (Protein Synthesis)
  // 4. Cell Membrane (Gatekeeper)
  
  // Let's make it a 4-digit code.
  // We'll give them 4 clues and they have to enter the code.
  // Clue 1: Mitochondria -> e.g., 9
  // Clue 2: Nucleus -> e.g., 2
  // Clue 3: Ribosome -> e.g., 5
  // Clue 4: Cell Membrane -> e.g., 1
  // Code: 9251

  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);

  const checkCode = () => {
    if (code.join("") === "9251") {
      playUnlock();
      onUnlock();
    } else {
      setError(true);
      playBuzzer();
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
        <Beaker className="w-8 h-8 text-emerald-400" />
        <h2 className={`text-2xl font-bold text-white ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "បន្ទប់ទី ១៖ មន្ទីរពិសោធន៍កោសិកា" : "Room 1: The Cell Lab"}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <p className={`text-slate-300 mb-6 ${isKh ? "font-khmer text-lg leading-relaxed" : "text-lg"}`}>
          {isKh
            ? "សោទ្វារត្រូវបានចាក់ដោយលេខកូដ ៤ ខ្ទង់។ កំណត់អត្តសញ្ញាណសរីរាង្គកោសិកា ដើម្បីស្វែងរកលេខកូដ៖"
            : "The door is locked with a 4-digit code. Identify the cell organelles to reveal the passcode:"}
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <span className={`text-slate-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "១. រោងចក្រផលិតថាមពល (Powerhouse)" : "1. The Powerhouse of the cell"}
            </span>
            <span className="text-emerald-400 font-mono font-bold bg-slate-900 px-3 py-1 rounded">Mito = 9</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <span className={`text-slate-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "២. មជ្ឈមណ្ឌលបញ្ជា (Control Center)" : "2. The Control Center containing DNA"}
            </span>
            <span className="text-emerald-400 font-mono font-bold bg-slate-900 px-3 py-1 rounded">Nucl = 2</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <span className={`text-slate-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "៣. រោងចក្រផលិតប្រូតេអ៊ីន (Protein Factory)" : "3. The Protein Factory"}
            </span>
            <span className="text-emerald-400 font-mono font-bold bg-slate-900 px-3 py-1 rounded">Ribo = 5</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <span className={`text-slate-200 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "៤. អ្នកយាមទ្វារ (Gatekeeper)" : "4. The Gatekeeper"}
            </span>
            <span className="text-emerald-400 font-mono font-bold bg-slate-900 px-3 py-1 rounded">Memb = 1</span>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border-2 border-slate-700 max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-6 text-slate-400">
            <Lock className="w-5 h-5" />
            <span className={`text-sm uppercase tracking-wider ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "បញ្ចូលលេខកូដ" : "ENTER PASSCODE"}
            </span>
            <ShieldAlert className="w-5 h-5" />
          </div>

          <div className={`flex gap-3 justify-center mb-6 ${error ? "animate-[shake_0.2s_ease-in-out_2]" : ""}`}>
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={code[i]}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  const newCode = [...code];
                  newCode[i] = val;
                  setCode(newCode);
                  // Auto-advance
                  if (val && i < 3) {
                    const nextInput = document.getElementById(`digit-${i + 1}`);
                    nextInput?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !code[i] && i > 0) {
                    const prevInput = document.getElementById(`digit-${i - 1}`);
                    prevInput?.focus();
                  }
                  if (e.key === "Enter") {
                    checkCode();
                  }
                }}
                id={`digit-${i}`}
                className={`w-14 h-16 bg-slate-800 border-2 rounded-xl text-center text-3xl font-mono text-white focus:outline-none transition-colors
                  ${error ? "border-rose-500 text-rose-500" : "border-slate-600 focus:border-emerald-500"}
                `}
              />
            ))}
          </div>

          <button
            onClick={checkCode}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
              ${code.join("").length === 4 
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
                : "bg-slate-800 text-slate-500 cursor-not-allowed"}
            `}
          >
            {isKh ? "ដោះសោទ្វារ" : "UNLOCK DOOR"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Room 2: DNA Base Pairing
 * ════════════════════════════════════════════════════════════════════════ */
function Room2({ isKh, onUnlock }: { isKh: boolean; onUnlock: () => void }) {
  // DNA Sequence: A T G C C
  // Complement:   T A C G G
  
  const target = ["T", "A", "C", "G", "G"];
  const original = ["A", "T", "G", "C", "C"];
  
  const [strand, setStrand] = useState(["", "", "", "", ""]);
  const [error, setError] = useState(false);

  const checkSequence = () => {
    if (strand.join("") === target.join("")) {
      playUnlock();
      onUnlock();
    } else {
      setError(true);
      playBuzzer();
      setTimeout(() => setError(false), 500);
    }
  };

  const handleInput = (index: number, letter: string) => {
    const valid = ["A", "T", "C", "G"];
    const upper = letter.toUpperCase();
    if (!valid.includes(upper) && upper !== "") return;
    
    const newStrand = [...strand];
    newStrand[index] = upper;
    setStrand(newStrand);
    
    if (upper && index < 4) {
      document.getElementById(`dna-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-8 duration-500">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
        <Dna className="w-8 h-8 text-blue-400" />
        <h2 className={`text-2xl font-bold text-white ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "បន្ទប់ទី ២៖ បណ្ណាល័យហ្សែន" : "Room 2: The Genetic Vault"}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <p className={`text-slate-300 mb-8 ${isKh ? "font-khmer text-lg leading-relaxed" : "text-lg"}`}>
          {isKh
            ? "ម៉ាស៊ីនស្កេនទាមទារខ្សែ DNA បំពេញបន្ថែម។ បញ្ចូលអក្សរ (A, T, C, G) ឱ្យត្រូវគ្នានឹងខ្សែខាងលើ ដើម្បីដំណើរការម៉ាស៊ីនឡើងវិញ។"
            : "The scanner requires a complementary DNA strand. Enter the correct base pairs (A, T, C, G) to repair the sequence and unlock the next door."}
        </p>

        <div className={`bg-slate-900 p-8 rounded-3xl border border-slate-700 mx-auto max-w-lg shadow-2xl relative ${error ? "animate-[shake_0.2s_ease-in-out_2] border-rose-500" : ""}`}>
          
          <div className="absolute inset-0 bg-blue-500/5 rounded-3xl pointer-events-none" />

          {/* Original Strand */}
          <div className="flex justify-between items-center mb-8 relative z-10 px-4">
            {original.map((base, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold font-mono shadow-lg border-2 border-slate-600
                  ${base === "A" ? "bg-amber-500/20 text-amber-400" : ""}
                  ${base === "T" ? "bg-purple-500/20 text-purple-400" : ""}
                  ${base === "C" ? "bg-emerald-500/20 text-emerald-400" : ""}
                  ${base === "G" ? "bg-rose-500/20 text-rose-400" : ""}
                `}>
                  {base}
                </div>
                <div className="h-8 w-1 bg-slate-600 my-2 rounded-full" />
              </div>
            ))}
          </div>

          {/* User Input Strand */}
          <div className="flex justify-between items-center mb-10 relative z-10 px-4">
            {strand.map((base, i) => (
              <div key={i} className="flex flex-col items-center">
                <input
                  id={`dna-${i}`}
                  type="text"
                  maxLength={1}
                  value={base}
                  onChange={(e) => handleInput(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !base && i > 0) {
                      document.getElementById(`dna-${i - 1}`)?.focus();
                    }
                    if (e.key === "Enter") checkSequence();
                  }}
                  className={`w-12 h-12 rounded-full text-center text-xl font-bold font-mono bg-slate-800 border-2 focus:outline-none transition-colors
                    ${error ? "border-rose-500 text-rose-500" : "border-blue-500 text-white"}
                  `}
                />
              </div>
            ))}
          </div>

          <button
            onClick={checkSequence}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all relative z-10
              ${strand.join("").length === 5 
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                : "bg-slate-800 text-slate-500 cursor-not-allowed"}
            `}
          >
            {isKh ? "ដំណើរការស្កេន" : "INITIALIZE SCAN"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Room 3: Photosynthesis
 * ════════════════════════════════════════════════════════════════════════ */
function Room3({ isKh, onUnlock }: { isKh: boolean; onUnlock: () => void }) {
  // Equation: 6CO2 + 6H2O + Light -> C6H12O6 + 6O2
  const [answers, setAnswers] = useState({
    input1: "",
    input2: "",
    output1: "",
    output2: ""
  });
  const [error, setError] = useState(false);

  const checkAnswers = () => {
    // Tolerant checking
    const i1 = answers.input1.toLowerCase().replace(/\s/g, "");
    const i2 = answers.input2.toLowerCase().replace(/\s/g, "");
    const o1 = answers.output1.toLowerCase().replace(/\s/g, "");
    const o2 = answers.output2.toLowerCase().replace(/\s/g, "");

    const hasInputs = (i1 === "co2" && i2 === "h2o") || (i1 === "h2o" && i2 === "co2");
    const hasOutputs = (o1 === "c6h12o6" && o2 === "o2") || (o1 === "o2" && o2 === "c6h12o6");

    if (hasInputs && hasOutputs) {
      playUnlock();
      onUnlock();
    } else {
      setError(true);
      playBuzzer();
      setTimeout(() => setError(false), 500);
    }
  };

  const isComplete = answers.input1 && answers.input2 && answers.output1 && answers.output2;

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-8 duration-500">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
        <FlaskConical className="w-8 h-8 text-amber-400" />
        <h2 className={`text-2xl font-bold text-white ${isKh ? "font-khmer" : ""}`}>
          {isKh ? "បន្ទប់ទី ៣៖ ទ្វារចុងក្រោយ" : "Room 3: The Final Door"}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <p className={`text-slate-300 mb-8 ${isKh ? "font-khmer text-lg leading-relaxed" : "text-lg"}`}>
          {isKh
            ? "ដើម្បីបើកទ្វារចុងក្រោយនេះ អ្នកត្រូវបំពេញសមីការរស្មីសំយោគ។ តើរុក្ខជាតិត្រូវការអ្វីខ្លះ? តើវាបង្កើតអ្វីខ្លះ?"
            : "To open the final door, you must power the system using the equation for photosynthesis. Fill in the chemical formulas (CO2, H2O, C6H12O6, O2)."}
        </p>

        <div className={`bg-slate-900 p-8 rounded-3xl border border-slate-700 mx-auto max-w-2xl shadow-2xl relative ${error ? "animate-[shake_0.2s_ease-in-out_2] border-rose-500" : ""}`}>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
            {/* Inputs */}
            <div className="flex flex-col items-center gap-3 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-full md:w-auto">
              <span className={`text-slate-400 text-sm font-bold tracking-widest uppercase ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "អ្វីដែលចូល" : "Inputs"}
              </span>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="CO2"
                  value={answers.input1}
                  onChange={e => setAnswers({...answers, input1: e.target.value})}
                  className="w-24 h-12 bg-slate-800 border-2 border-slate-600 rounded-lg text-center font-mono font-bold text-white uppercase focus:border-amber-400 focus:outline-none"
                />
                <span className="text-slate-500 font-bold">+</span>
                <input 
                  type="text" 
                  placeholder="H2O"
                  value={answers.input2}
                  onChange={e => setAnswers({...answers, input2: e.target.value})}
                  className="w-24 h-12 bg-slate-800 border-2 border-slate-600 rounded-lg text-center font-mono font-bold text-white uppercase focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div className="text-amber-400 font-bold text-sm">+ Light Energy</div>
            </div>

            <ArrowRight className="w-8 h-8 text-slate-500 hidden md:block" />
            <div className="md:hidden text-slate-500 font-bold text-xl">⬇</div>

            {/* Outputs */}
            <div className="flex flex-col items-center gap-3 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-full md:w-auto">
              <span className={`text-slate-400 text-sm font-bold tracking-widest uppercase ${isKh ? "font-khmer" : ""}`}>
                {isKh ? "អ្វីដែលចេញ" : "Outputs"}
              </span>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="C6H12O6"
                  value={answers.output1}
                  onChange={e => setAnswers({...answers, output1: e.target.value})}
                  className="w-28 h-12 bg-slate-800 border-2 border-slate-600 rounded-lg text-center font-mono font-bold text-white uppercase focus:border-amber-400 focus:outline-none"
                />
                <span className="text-slate-500 font-bold">+</span>
                <input 
                  type="text" 
                  placeholder="O2"
                  value={answers.output2}
                  onChange={e => setAnswers({...answers, output2: e.target.value})}
                  onKeyDown={e => e.key === 'Enter' && checkAnswers()}
                  className="w-20 h-12 bg-slate-800 border-2 border-slate-600 rounded-lg text-center font-mono font-bold text-white uppercase focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div className="text-emerald-400 font-bold text-sm">Glucose + Oxygen</div>
            </div>
          </div>

          <button
            onClick={checkAnswers}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
              ${isComplete 
                ? "bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_20px_rgba(217,119,6,0.4)]" 
                : "bg-slate-800 text-slate-500 cursor-not-allowed"}
            `}
          >
            <Unlock className="w-5 h-5" />
            {isKh ? "រត់គេច" : "ESCAPE FACILITY"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Main Wrapper
 * ════════════════════════════════════════════════════════════════════════ */
export default function EscapeRoomPage() {
  const { language } = useLanguageStore();
  const isKh = language === "kh";
  
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  const rooms = [
    <Room1 isKh={isKh} onUnlock={() => setCurrentRoomIndex(1)} />,
    <Room2 isKh={isKh} onUnlock={() => setCurrentRoomIndex(2)} />,
    <Room3 isKh={isKh} onUnlock={() => setCurrentRoomIndex(3)} />,
  ];

  const progress = (currentRoomIndex / 3) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 flex flex-col font-sans">
      
      {/* Immersive Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-emerald-500" />
            <h1 className={`text-xl font-bold tracking-wider text-white ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "បន្ទប់រត់គេចជីវវិទ្យា" : "BIOLOGY ESCAPE ROOM"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-xs font-mono font-bold text-slate-500 tracking-widest">
              ROOM {Math.min(currentRoomIndex + 1, 3)} / 3
            </span>
            <div className="h-2 flex-1 sm:w-48 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8 md:py-12 flex flex-col">
        {currentRoomIndex < 3 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl flex-1 flex flex-col relative overflow-hidden">
            {/* Ambient scanlines effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px]" />
            
            <div className="relative z-10 flex-1 flex flex-col">
              {rooms[currentRoomIndex]}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="w-32 h-32 bg-emerald-500/20 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-20 h-20 text-emerald-400" />
            </div>
            <h2 className={`text-4xl md:text-6xl font-bold text-white mb-6 ${isKh ? "font-khmer" : ""}`}>
              {isKh ? "អ្នកបានរត់គេចរួចហើយ!" : "FACILITY ESCAPED!"}
            </h2>
            <p className={`text-xl text-slate-400 max-w-lg mx-auto leading-relaxed ${isKh ? "font-khmer" : ""}`}>
              {isKh 
                ? "អបអរសាទរ! អ្នកបានប្រើប្រាស់ចំណេះដឹងជីវវិទ្យារបស់អ្នក ដើម្បីដោះស្រាយបញ្ហាទាំងអស់។"
                : "Congratulations! You successfully applied your knowledge of biology to bypass all security systems."}
            </p>
            <button 
              onClick={() => setCurrentRoomIndex(0)}
              className="mt-12 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold transition-colors"
            >
              {isKh ? "លេងម្តងទៀត" : "PLAY AGAIN"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
